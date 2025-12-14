import { App, Notice, TFile, TFolder } from 'obsidian';
import { FileService } from './FileService';
import { z } from 'zod';
import { 
    createNotePlanPrompt,
    constructDynamicPrompt, 
    // generateNoteContentPrompt, // DEPRECATED: We will build prompts dynamically now
    createAnswerReviewPrompt, 
    createKeywordExtractionPrompt,
    createTemplateMatchingPrompt,
    createTemplateDraftPrompt,
    createMathExplanationPrompt,
    createVisualAnalysisPrompt,
    createMathContextPrompt,
    createMathPlanFromDraftPrompt,
    createAtomicMathNotePrompt,
    createHybridMathNotePrompt,
    createCodeLabPrompt,
    createMyTakeReviewPrompt,
} from './PromptFactory';

// Reusable schema for nested bullet points
const bulletSchema = z.object({
    content: z.string(),
    children: z.array(z.lazy(() => bulletSchema)).optional(),
});

// Schema for each major section of the note
const summarySchema = z.object({
    definition: z.string().optional(),
    analogy_text: z.string().optional(),
    analogy_breakdown: z.string().optional()
});

const fundamentalSchema = z.object({
    justification: z.string().optional()
});

const detailsSchema = z.object({
    core_idea: z.string().optional(),
    primary_goal: z.string().optional(),
    mechanism_bullets: z.array(bulletSchema).optional(),
    mechanism_code_snippet: z.string().optional().describe("An optional Python code snippet to illustrate the mechanism. Should be an empty string if no code is needed."),
    parameters_bullets: z.array(bulletSchema).optional(),
    tradeoffs_bullets: z.array(bulletSchema).optional(),
    mechanism_ascii_diagram: z.string().describe("The ASCII diagram for the mechanism. Can be an empty string if not applicable."),
});

const connectionsSchema = z.object({
    parent: z.string().optional(),
    children: z.array(z.string()).optional(),
    related: z.array(z.string()).optional(),
    other_fundamentals: z.array(z.string()).optional(),
    ascii_map: z.string().optional().describe("The ASCII connections map. Can be an empty string if not applicable."),
});

const comparisonSchema = z.object({
    item_a: z.string().optional().describe("The name of the first item being compared."),
    item_b: z.string().optional().describe("The name of the second item being compared."),
    side_by_side_bullets: z.array(bulletSchema).describe("A nested bulleted list comparing the concepts. Top level is the concept name, children are the characteristics."),
    key_similarities: z.string().describe("A paragraph explaining what these two items have in common."),
    verdict: z.string().describe("A concise decision rule on when to use one over the other."),
    comparison_table: z.string().optional().describe("A markdown table comparing the two items side-by-side.")
});

const relationshipSchema = z.object({
    connection_type: z.string().describe("The specific type of relationship (e.g., 'Inverse Correlation', 'Prerequisite', 'Component of')."),
    mechanism_of_interaction: z.string().describe("How exactly do these two concepts interact?"),
    impact: z.string().describe("What is the consequence of this relationship?")
});

const cheatsheetSchema = z.object({
    cheatsheet_content: z.string().describe("The markdown content of the cheatsheet."),
    tool: z.string().optional(),
    title: z.string().optional(),
}).passthrough();

// The final, complete schema for AI response validation
const noteSchema = z.object({
    concept_name: z.string().min(1, "concept_name is required."),
    why_this_matters: z.string().optional().describe("A single sentence on the concept's real-world significance."),
    summary: summarySchema.optional(),
    fundamental: fundamentalSchema.optional(),
    details: detailsSchema.optional(),
    
    comparison: comparisonSchema.optional(),
    relationship: relationshipSchema.optional(),
    connections: connectionsSchema.optional(),

    questions: z.array(z.string()).optional(),
    tags_keywords: z.array(z.string()).describe("Array of 3-5 lowercase, snake_case technical keywords."),
    related_links_for_yaml: z.array(z.string()).describe("Array of 10-15 wikilinks for the YAML frontmatter.")
}).passthrough();

// We can define constants here for clarity
const LOG_FILE_NAME = "_Gemini Logs.md";
const HIERARCHY_MAP_FILE_NAME = "_Gemini Hierarchy Map.md";
const PREFIX_MAP_FILE_NAME = "_Gemini Subject Prefix Map.md";

const PLAN_PROMPT_LOG_NAME = "_Gemini Plan Prompts.md";
const NOTE_PROMPT_LOG_NAME = "_Gemini Note Prompts.md";

export class ToolManager {
    private app: App;
    private genAI: any; // The GoogleGenerativeAI instance
    private settings: any; // Plugin settings
    private fileService: FileService;

    constructor(app: App, genAI: any, settings: any, fileService: FileService) {
        this.app = app;
        this.genAI = genAI;
        this.settings = settings;
        this.fileService = fileService;
    }

    private async _writeDebugLog(fileName: string, content: string, mode: 'overwrite' | 'append'): Promise<void> {
        const debugFilePath = `${this.settings.draftsFolderPath}/${fileName}`;
        
        try {
            // Use the low-level adapter to bypass cache latency issues
            const exists = await this.app.vault.adapter.exists(debugFilePath);

            if (mode === 'overwrite') {
                const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
                const header = `# Gemini Prompt Log: ${fileName.replace('.md', '')}\n### 🚀 Session Start: ${timestamp}\n\n${content}`;
                
                // Write (overwrite) directly
                await this.app.vault.adapter.write(debugFilePath, header);
                
            } else {
                // Append mode
                if (exists) {
                    const appendContent = `\n\n---\n${content}`;
                    await this.app.vault.adapter.append(debugFilePath, appendContent);
                } else {
                    // Fallback: create if it strangely doesn't exist
                    await this.app.vault.adapter.write(debugFilePath, content);
                }
            }
        } catch (e) {
            console.error(`Failed to write to debug log "${fileName}":`, e);
        }
    }

    // No changes to logActivity or updateHierarchyMap
    async logActivity(message: string): Promise<string> {
        const logFilePath = `${this.settings.draftsFolderPath}/${LOG_FILE_NAME}`;
        const timestamp = new Date().toLocaleString("en-IN", {
            year: "numeric", month: "2-digit", day: "2-digit",
            hour: "2-digit", minute: "2-digit", second: "2-digit",
            hour12: true, timeZone: "Asia/Kolkata"
        });
        const logEntry = `- ${timestamp}: ${message}`;

        let logFile = this.fileService.getAbstractFileByPath(logFilePath);
        const header = "# Gemini Agent Logs\n";

        if (logFile instanceof TFile) {
            // If the file exists, read its content.
            const currentContent = await this.fileService.readFile(logFile);
            let newContent;

            if (currentContent.startsWith(header)) {
                // If header exists, insert the new log entry right after it.
                const contentWithoutHeader = currentContent.substring(header.length);
                newContent = header + logEntry + '\n' + contentWithoutHeader;
            } else {
                // If file is empty or has no header, create the content from scratch.
                newContent = header + logEntry + '\n' + currentContent;
            }
            await this.fileService.modifyFile(logFile, newContent.trim());
            
        } else {
            // If the file doesn't exist, create it with the header and the first entry.
            const initialContent = header + logEntry;
            await this.fileService.createFile(logFilePath, initialContent);
        }
        return `Logged: "${message}"`;
    }

    private async _logDebug(content: string): Promise<void> {
        const debugFileName = "_GeminiDebugLog.md";
        const debugFilePath = `${this.settings.draftsFolderPath}/${debugFileName}`;
        const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
        
        // Create the complete new content for the file
        const fullContent = `# Gemini Prompt Debug Log\n\n### 🐞 Last Run: ${timestamp}\n\n${content}`;

        const file = this.fileService.getAbstractFileByPath(debugFilePath);

        try {
            if (file instanceof TFile) {
                // Overwrite the existing file completely
                await this.fileService.modifyFile(file, fullContent);
            } else {
                // Create a new file if it doesn't exist
                await this.fileService.createFile(debugFilePath, fullContent);
            }
        } catch (e) {
            console.error("Failed to write to debug log:", e);
        }
    }

    /**
     * Recursively gets all markdown files within a given folder.
     * @param folder The TFolder to start scanning from.
     * @returns An array of TFile objects.
     */
    private _getAllNotesInFolder(folder: TFolder): TFile[] {
        const notes: TFile[] = [];
        for (const fileOrFolder of folder.children) {
            // console.log('Scanner is looking at:', fileOrFolder.path); 
            if (fileOrFolder instanceof TFolder) {
                // If it's a folder, call this function again and add its notes
                notes.push(...this._getAllNotesInFolder(fileOrFolder));
            } else if (fileOrFolder instanceof TFile && fileOrFolder.extension === 'md') {
                // If it's a markdown file, add it to our list
                notes.push(fileOrFolder);
            }
        }
        return notes;
    }

    async updateHierarchyMap(): Promise<string> {
        new Notice("Scanning vault for structural notes...", 3000);

        const structuralNotes: string[] = [];
        const files = this.app.vault.getMarkdownFiles();
        const structuralTagNames = ["fundamental", "major_core", "moc"];

        for (const file of files) {
            const fileCache = this.app.metadataCache.getFileCache(file);
            if (!fileCache) continue;

            const allTags = new Set<string>();

            const frontmatterTags = fileCache.frontmatter?.tags;
            if (frontmatterTags) {
                const tagsToAdd = Array.isArray(frontmatterTags) ? frontmatterTags : String(frontmatterTags).split(',').map(t => t.trim());
                tagsToAdd.forEach(tag => {
                    // This 'if' statement is the new, protective line
                    if (tag && typeof tag === 'string') { 
                        const cleanedTag = tag.startsWith('#') ? tag.slice(1) : tag;
                        allTags.add(cleanedTag.toLowerCase());
                    }
                });
            }

            if (fileCache.tags) {
                fileCache.tags.forEach(tagCache => {
                    allTags.add(tagCache.tag.slice(1).toLowerCase());
                });
            }
            
            const fileTags = Array.from(allTags);
            const hasStructuralTag = fileTags.some(tag => structuralTagNames.includes(tag));

            if (hasStructuralTag) {
                const wikilink = `[[${file.path}|${file.basename}]]`;
                structuralNotes.push(wikilink);
            }
        }

        const mapFilePath = `${this.settings.draftsFolderPath}/${HIERARCHY_MAP_FILE_NAME}`;
        const header = `# Gemini Agent: Knowledge Hierarchy Map\n\nThis file is an auto-generated map of the structural notes in your vault. It is used as context by the Gemini agent to make better planning decisions.\n\nLast updated: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}\n\n---\n\n`;
        const mapContent = header + structuralNotes.join('\n');

        const existingMapFile = this.fileService.getAbstractFileByPath(mapFilePath);

        if (existingMapFile && existingMapFile instanceof TFile) {
            await this.fileService.modifyFile(existingMapFile, mapContent);
        } else {
            await this.fileService.createFile(mapFilePath, mapContent);
        }
        
        await this.logActivity(`Updated the Hierarchy Map with ${structuralNotes.length} structural notes.`);
        return `Hierarchy Map updated with ${structuralNotes.length} notes!`;
    }

    async analyzeVisualsInNote(blockContent: string, plannedTitle?: string): Promise<string> {
        // 1. Extract image links
        const imageNames = [...blockContent.matchAll(/!\[\[(.*?)\]\]/g)].map(m => m[1]);

        // Note: We removed the check that returns "Error" if length is 0. 
        // The code now proceeds to text-only analysis.

        // 2. Determine the internal title for the analysis note
        const analysisTitle = plannedTitle || (imageNames.length > 0
            ? (imageNames.length === 1 ? `Example - Analysis of ${imageNames[0]}` : `Example - Visual Sequence`)
            : `Example - Walkthrough`); // Fallback for text-only

        try {
            const imageParts = [];
            for (const imageName of imageNames) {
                const imageFile = this.app.metadataCache.getFirstLinkpathDest(imageName, ""); 
                if (!(imageFile instanceof TFile)) {
                    console.warn(`Image file "${imageName}" not found, skipping.`);
                    continue;
                }

                const imageBuffer = await this.app.vault.readBinary(imageFile);
                const imageBase64 = Buffer.from(imageBuffer).toString('base64');
                const imageMimeType = `image/${imageFile.extension}`;
                
                imageParts.push({
                    inlineData: { data: imageBase64, mimeType: imageMimeType },
                });
            }
            
            // Only error if we EXPECTED images but couldn't load them
            if (imageNames.length > 0 && imageParts.length === 0) {
                return "Error: Image links were found but could not be read.";
            }
            
            // 3. Generate Prompt (ensure PromptFactory is updated to handle 0 images!)
            const promptText = createVisualAnalysisPrompt(blockContent, imageParts.length);
            
            // Use settings model instead of hardcoded string for flexibility
            const model = this.genAI.getGenerativeModel({ model: this.settings.model });
            
            // 4. API Call - passing empty imageParts is valid for text-only
            const result = await this.makeApiCallWithRetry(() => model.generateContent([promptText, ...imageParts]));
            
            const rawResponse = result.response.text();
            const jsonText = rawResponse.match(/```json\n([\s\S]*?)\n```/)?.[1] || rawResponse.replace(/```/g, "").trim();
            const aiJson = JSON.parse(jsonText);

            // Read the template
            const templateContent = await this.app.vault.adapter.read(
                `${this.settings.templatesFolderPath}/Example Walkthrough Template.md`
            );
            
            // Formatters
            const formattedBreakdown = aiJson.step_by_step_breakdown
                ? aiJson.step_by_step_breakdown.map((item: any) => `### ${item.step}\n${item.details}`).join('\n\n')
                : "";

            const formattedEvidence = aiJson.visual_evidence_list
                ? aiJson.visual_evidence_list.map((item: string) => `- ${item}`).join('\n')
                : "";

            const formattedRelated = aiJson.related_concepts
                ? "\n" + aiJson.related_concepts.map((item: string) => `  - "${item}"`).join('\n')
                : "";

            const dataForTemplate = {
                analysis_title: analysisTitle,
                source_images_embeds: imageNames.map(name => `![[${name}]]`).join("\n"),
                scenario_context: aiJson.scenario_context,
                visual_evidence_list: formattedEvidence,
                step_by_step_breakdown: formattedBreakdown,
                core_concept_takeaway: aiJson.core_concept_takeaway,
                related: formattedRelated,
                analysis_date: new Date().toISOString().slice(0, 10)
            };
            
            const finalContent = this.populateTemplate(templateContent, dataForTemplate);
            
            const analysisFileName = `${analysisTitle.replace(/[\\/:?*\"<>|]/g, "")}.md`;
            const analysisFilePath = `${this.settings.draftsFolderPath}/${analysisFileName}`;
            await this.fileService.createFile(analysisFilePath, finalContent);

            return `Example Walkthrough created successfully at: [[${analysisFilePath}]]`;

        } catch (e) {
            console.error("Error analyzing visual sequence:", e);
            return "Sorry, an error occurred during analysis. Check the console.";
        }
    }
    
    public async createNotePlan(targetFilePath: string | null, progressCallback: (update: string) => void): Promise<string> {
        try {
            // Step 1: Get the file and its essential content
            const targetFile = this._getTargetFile(targetFilePath);
            if (!targetFile) return "Error: Could not determine the target file.";

            const { rawContent, extractedSource } = await this._extractNoteContent(targetFile);
            if (!rawContent) return "Error: Could not find a '# Source' heading in the active file.";

            // await this.logActivity(`Extracted raw content for planning:\n---\n${rawContent}\n---`);

            // Step 2: Get context and analyze with AI
            progressCallback("Sending content to Gemini for analysis...");
            const vaultContext = await this._getVaultContext();
            const planData = await this._fetchAndParsePlanFromAI(rawContent, vaultContext);

            // Step 3: Handle the template logic (a very smart feature of your plugin)
            const { templateDraftNotification } = await this._matchOrCreateTemplate(planData, rawContent);

            // Step 4: Assemble the final plan content and create the file
            progressCallback("Creating the plan file in your vault...");
            const finalPlanContent = this._assemblePlanContent(planData, extractedSource, templateDraftNotification);
            const planFilePath = await this._createPlanFile(planData, finalPlanContent);
            
            // Step 5: Log and report success
            const logMessage = `Created note plan for "[[${targetFile.path}|${targetFile.basename}]]". AI suggested type: ${planData.note_identity?.suggested_type}. New plan is at "[[${planFilePath}]]".`;
            await this.logActivity(logMessage);

            let successMessage = `Plan created successfully! You can find it at: [[${planFilePath}]]`;
            if (templateDraftNotification) {
                successMessage += `\n\nI also drafted a new template for you. Please review it before generating the notes.`;
            }
            return successMessage;

        } catch (e) {
            console.error("Error creating note plan:", e);
            await this.logActivity(`ERROR: Failed to create note plan. Reason: ${e.message}`);
            return `Sorry, I encountered an error: ${e.message}. Please check the console.`;
        }
    }

    /**
     * Reviews the user's '# My Take' section against the '# Origin' section.
     * Uses robust split-based extraction logic.
     */
    public async reviewMyTake(targetFile: TFile): Promise<string> {
        try {
            const fullContent = await this.fileService.readFile(targetFile);

            // --- EXTRACT # ORIGIN ---
            // Split content by # Origin (case insensitive, flexible whitespace)
            const originParts = fullContent.split(/^#\s*Origin\s*\n/im);
            
            if (originParts.length < 2) {
                return "Error: Could not find a '# Origin' heading.";
            }

            // Take everything after the heading
            let originContent = originParts.slice(1).join('');

            // Stop at the next top-level heading (newline followed by #)
            const nextHeadingRegex = /\n^#\s/m;
            const nextHeadingMatchOrigin = originContent.match(nextHeadingRegex);

            if (nextHeadingMatchOrigin && nextHeadingMatchOrigin.index !== undefined) {
                originContent = originContent.substring(0, nextHeadingMatchOrigin.index);
            }
            
            originContent = originContent.trim();
            if (!originContent) return "Error: '# Origin' section appears to be empty.";


            // --- EXTRACT # MY TAKE ---
            // Split content by # My Take
            const myTakeParts = fullContent.split(/^#\s*My Take\s*\n/im);

            if (myTakeParts.length < 2) {
                return "Error: Could not find a '# My Take' heading.";
            }

            let myTakeContent = myTakeParts.slice(1).join('');
            
            // Stop at the next top-level heading
            const nextHeadingMatchTake = myTakeContent.match(nextHeadingRegex);

            if (nextHeadingMatchTake && nextHeadingMatchTake.index !== undefined) {
                myTakeContent = myTakeContent.substring(0, nextHeadingMatchTake.index);
            }

            myTakeContent = myTakeContent.trim();
            if (!myTakeContent) return "Error: '# My Take' section appears to be empty.";


            // --- CALL AI ---
            const prompt = createMyTakeReviewPrompt(originContent, myTakeContent);
            const model = this.genAI.getGenerativeModel({
                model: this.settings.model,
                generationConfig: { temperature: 0.4 },
            });
            const result = await this.makeApiCallWithRetry(() => model.generateContent(prompt));
            const feedbackText = result.response.text();

            // --- APPEND FEEDBACK ---
            const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
            const contentToAppend = `\n\n---\n### Gemini's Feedback on 'My Take' (${timestamp})\n\n${feedbackText}`;
            
            await this.fileService.modifyFile(targetFile, fullContent + contentToAppend);
            await this.logActivity(`Appended 'My Take' feedback to "[[${targetFile.path}|${targetFile.basename}]]".`);

            return "Feedback has been successfully added to your note!";

        } catch (e) {
            console.error("Error reviewing 'My Take':", e);
            await this.logActivity(`ERROR: Failed to review 'My Take'. Reason: ${e.message}`);
            return `Sorry, an error occurred: ${e.message}`;
        }
    }

    public async extractReferenceListFromPlan(file: TFile): Promise<string> {
        // 1. Read the file
        const content = await this.fileService.readFile(file);

        // 2. Isolate the "Notes Plan" section
        // Matches everything from "### Notes Plan" up to the next "###" header or end of string
        const planSectionMatch = content.match(/### Notes Plan([\s\S]*?)($|###)/);

        if (!planSectionMatch) {
            return "Error: Could not find a '### Notes Plan' section in this file.";
        }

        const planSectionText = planSectionMatch[1];

        // 3. Extract Titles
        // Regex looks for: Start of line -> hyphen -> space -> bold start -> (capture title) -> bold end
        const titleRegex = /^- \*\*(.*?)\*\*/gm;
        const matches = [...planSectionText.matchAll(titleRegex)];

        if (matches.length === 0) {
            return "Error: Found the plan section, but couldn't find any bolded note titles.";
        }

        // 4. Format the list
        const linkList = matches.map(m => `- [[${m[1]}]]`).join('\n');

        // 5. Append to file
        // We check if a list already exists to avoid duplication, strictly optional but nice to have
        if (content.includes("## Plan Reference List")) {
            return "Reference list already exists in this file.";
        }

        const contentToAppend = `\n\n---\n## Plan Reference List\n\n${linkList}`;
        
        await this.fileService.modifyFile(file, content + contentToAppend);

        return `Success! Appended ${matches.length} links to the bottom of the note.`;
    }
    
    /**
     * Retrieves the target TFile object from a given path.
     */
    private _getTargetFile(filePath: string | null): TFile | null {
        if (!filePath) return null;
        const file = this.app.vault.getAbstractFileByPath(filePath);
        return file instanceof TFile ? file : null;
    }

    /**
     * Reads a file and extracts the raw content from under the "# Origin" heading.
     * This new logic replaces the search for a 'gemini-note' block.
     */
    private async _extractNoteContent(targetFile: TFile): Promise<{ rawContent: string | null, extractedSource: string }> {
        const fullContent = await this.fileService.readFile(targetFile);

        // --- NEW ROBUST LOGIC ---
        
        // 1. Split the content by the "# Origin" heading.
        // We use a regex to handle variations in whitespace and case.
        const parts = fullContent.split(/^#\s*Origin\s*\n/im);

        if (parts.length < 2) {
            // The heading wasn't found
            return { rawContent: null, extractedSource: '' };
        }

        // 2. The content we want is everything *after* the first split.
        // We re-join in case the heading text appeared multiple times,
        // though we only care about the content after the first one.
        let rawContent = parts.slice(1).join('# Origin\n');

        // 3. Now, find the *next* heading to stop.
        // This regex looks for a newline, followed by a # at the start of a line.
        /*
        const nextHeadingRegex = /\n^#\s/m;
        const nextHeadingMatch = rawContent.match(nextHeadingRegex);

        if (nextHeadingMatch && nextHeadingMatch.index !== undefined) {
            // If we found a new heading, truncate the content at that point.
            rawContent = rawContent.substring(0, nextHeadingMatch.index);
        }
        */
        
        // At this point, rawContent is everything from "# Origin" to the next "# Heading" or file end.
        rawContent = rawContent.trim();
        
        if (!rawContent) {
            return { rawContent: null, extractedSource: '' };
        }
        // --- END NEW LOGIC ---

        const sourceRegex = /^source\s*-\s*(.*)/im;
        const sourceMatch = rawContent.match(sourceRegex);
        let extractedSource = (sourceMatch && sourceMatch[1]) 
            ? sourceMatch[1].trim().replace(/^- /, '') 
            : '';

        // We also want to remove the 'source: ...' line from the content
        // that the AI sees, so it doesn't get confused.
        rawContent = rawContent.replace(sourceRegex, '').trim();

        return { rawContent, extractedSource };
    }

    public async updateRelatedLinksLog(progressCallback: (update: string) => void): Promise<string> {
        const logFileName = "_Gemini Related Links Log.md";
        const logFilePath = `${this.settings.draftsFolderPath}/${logFileName}`;

        progressCallback("Reading existing links from the log...");
        const existingLogFile = this.fileService.getAbstractFileByPath(logFilePath);
        const loggedLinks = new Set<string>();

        if (existingLogFile && existingLogFile instanceof TFile) {
            const logContent = await this.fileService.readFile(existingLogFile);
            const linksInFile = logContent.match(/\[\[.*?\]\]/g) || [];
            linksInFile.forEach(link => loggedLinks.add(link));
        } else {
            // If the log doesn't exist, create it with a header
            const header = `# Gemini Agent: Related Links Log\n\nThis is an append-only log of all links found in the 'related' section of your notes' frontmatter.\n\n---\n`;
            await this.fileService.createFile(logFilePath, header);
        }

        progressCallback("Scanning vault for all 'related' links...");
        const allMarkdownFiles = this.app.vault.getMarkdownFiles();
        const linksInVault = new Set<string>();

        for (const file of allMarkdownFiles) {
            const fileCache = this.app.metadataCache.getFileCache(file);
            const relatedLinks = fileCache?.frontmatter?.related;

            if (relatedLinks && Array.isArray(relatedLinks)) {
                for (const link of relatedLinks) {
                    if (typeof link === 'string' && link.trim() !== '') {
                        const cleanedLink = link.replace(/["\[\]]/g, '').trim();
                        linksInVault.add(`[[${cleanedLink}]]`);
                    }
                }
            }
        }
        
        const newLinksToAppend: string[] = [];
        for (const vaultLink of linksInVault) {
            if (!loggedLinks.has(vaultLink)) {
                newLinksToAppend.push(vaultLink);
            }
        }

        if (newLinksToAppend.length === 0) {
            await this.logActivity("Checked for related links. No new links found.");
            return "Scan complete. No new links to add to the log.";
        }
        
        // Append only the new links, sorted for cleanliness
        const contentToAppend = '\n' + newLinksToAppend.sort().join('\n');
        if (existingLogFile instanceof TFile) {
            await this.app.vault.append(existingLogFile, contentToAppend);
        } else {
            // This case handles if the file was just created
            const newLogFile = this.fileService.getAbstractFileByPath(logFilePath) as TFile;
            await this.app.vault.append(newLogFile, contentToAppend.trim());
        }

        await this.logActivity(`Appended ${newLinksToAppend.length} new links to the 'Related Links Log'.`);
        return `Success! Appended ${newLinksToAppend.length} new links to the log file.`;
    }

    // --- NEW METHOD 2: CREATE THE SORTED VIEW FROM THE LOG ---
    public async createCategorizedLinksView(): Promise<string> {
        const logFileName = "_Gemini Related Links Log.md";
        const logFilePath = `${this.settings.draftsFolderPath}/${logFileName}`;
        
        const viewFileName = "_Gemini Related Links - By Category.md";
        const viewFilePath = `${this.settings.draftsFolderPath}/${viewFileName}`;

        const logFile = this.fileService.getAbstractFileByPath(logFilePath);
        if (!(logFile instanceof TFile)) {
            return `Error: The log file "${logFileName}" was not found. Please run the 'Update log' command first.`;
        }

        const logContent = await this.fileService.readFile(logFile);
        const links = logContent.match(/\[\[.*?\]\]/g) || [];

        if (links.length === 0) {
            return "The log file contains no links to categorize.";
        }

        const categorizedLinks: Record<string, string[]> = {};

        for (const link of links) {
            const linkText = link.slice(2, -2);
            const category = linkText.includes(' - ') ? linkText.split(' - ')[0] : 'Uncategorized';
            
            if (!categorizedLinks[category]) {
                categorizedLinks[category] = [];
            }
            categorizedLinks[category].push(link);
        }

        const header = `# Gemini Agent: Related Links by Category\n\nThis note is an auto-generated, sorted view of the links in your log file. This file will be completely rewritten each time the command is run.\n\nLast updated: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}\n\n---\n`;
        let newContent = header;
        const sortedCategories = Object.keys(categorizedLinks).sort();

        for (const category of sortedCategories) {
            newContent += `\n## ${category}\n\n`;
            const sortedLinksInCategory = categorizedLinks[category].sort();
            newContent += sortedLinksInCategory.join('\n') + '\n';
        }

        // Use createFile which handles both creation and overwriting
        await this.fileService.createFile(viewFilePath, newContent.trim());

        await this.logActivity(`Created/Updated the categorized view with ${links.length} links from the log.`);
        return `Successfully created the categorized view at: [[${viewFilePath}]]`;
    }

    private async _readFullNoteForMath(targetFile: TFile): Promise<string> {
        const fullContent = await this.fileService.readFile(targetFile);
        // Remove YAML frontmatter and trim whitespace
        return fullContent.replace(/---[\s\S]*?---/, '').trim();
    }

    /**
     * Reads the knowledge hierarchy map AND the subject prefix map to provide vault context to the AI.
     */
    private async _getVaultContext(): Promise<string> {
        const mapFilePath = `${this.settings.draftsFolderPath}/${HIERARCHY_MAP_FILE_NAME}`;
        const prefixMapFilePath = `${this.settings.draftsFolderPath}/${PREFIX_MAP_FILE_NAME}`;
        
        let context = '';
        
        // Read Hierarchy Map
        const mapFile = this.fileService.getAbstractFileByPath(mapFilePath);
        if (mapFile instanceof TFile) {
            context += `---
### EXISTING KNOWLEDGE HIERARCHY
Here is a map of the user's existing high-level notes. You MUST use this as ground truth for all hierarchical decisions.
${await this.fileService.readFile(mapFile)}
---
`;
        }

        // Read Prefix Map
        const prefixFile = this.fileService.getAbstractFileByPath(prefixMapFilePath);
        if (prefixFile instanceof TFile) {
            context += `---
### MASTER SUBJECT PREFIX MAP
This is the most important instruction for naming. You MUST use this table to determine the correct "Main Topic" prefix for all note titles.
${await this.fileService.readFile(prefixFile)}
---
`;
        }

        return context;
    }

    /**
     * Helper to extract binary image data from wikilinks in a text string.
     */
    private async _extractImagesFromContext(context: string): Promise<any[]> {
        const imageNames = [...context.matchAll(/!\[\[(.*?)\]\]/g)].map(m => m[1]);
        const imageParts: any[] = [];

        for (const imageName of imageNames) {
            // Resolve the link to a concrete TFile
            const imageFile = this.app.metadataCache.getFirstLinkpathDest(imageName, "");
            
            if (imageFile instanceof TFile) {
                // Read the binary data
                const imageBuffer = await this.app.vault.readBinary(imageFile);
                // Convert to Base64
                const imageBase64 = Buffer.from(imageBuffer).toString('base64');
                const imageMimeType = `image/${imageFile.extension}`;
                
                // Push to the array in the format Gemini expects
                imageParts.push({
                    inlineData: { data: imageBase64, mimeType: imageMimeType },
                });
            }
        }
        return imageParts;
    }

    /**
     * Calls the Gemini API with the note content and context, and parses the JSON response.
     */
    private async _fetchAndParsePlanFromAI(rawContent: string, vaultContext: string): Promise<any> {
        const model = this.genAI.getGenerativeModel({
            model: this.settings.model,
            generationConfig: { temperature: 0.0, top_k: 1, top_p: 1 },
        });
        
        // 1. Generate the text prompt
        const prompt = createNotePlanPrompt(rawContent, vaultContext);

        // 2. NEW: Extract images from the raw source content
        // This ensures Gemini sees the book pages during the planning phase
        const imageParts = await this._extractImagesFromContext(rawContent);

        // 3. Log debug info (if you added the logger)
        const logContent = `### PROMPT:\n\`\`\`\n${prompt}\n\`\`\`\n\n### IMAGE COUNT: ${imageParts.length}`;
        await this._writeDebugLog(PLAN_PROMPT_LOG_NAME, logContent, 'overwrite');

        // 4. MODIFIED: Send BOTH the prompt AND the images to the API
        const result = await this.makeApiCallWithRetry(() => model.generateContent([prompt, ...imageParts]));
        
        const rawResponse = result.response.text();

        // Robust JSON parsing
        const jsonMatch = rawResponse.match(/```json\n([\s\S]*?)\n```/);
        const jsonText = jsonMatch ? jsonMatch[1] : rawResponse.replace(/```/g, "").trim();

        try {
            return JSON.parse(jsonText);
        } catch (parseError) {
            console.error("Failed to parse JSON from Gemini:", rawResponse);
            throw new Error("The AI returned an invalid response that I couldn't understand.");
        }
    }

    /**
     * Matches the AI's suggested note type to an existing template or drafts a new one.
     */
    private async _matchOrCreateTemplate(planData: any, rawContent: string): Promise<{ templateDraftNotification: string }> {
        const suggestedType = planData.note_identity?.suggested_type || "StandardModel";
        if (suggestedType === "StandardModel") return { templateDraftNotification: '' };

        const templatesFolder = this.app.vault.getAbstractFileByPath(this.settings.templatesFolderPath);
        if (!(templatesFolder instanceof TFolder)) {
            new Notice("Templates folder not found. Skipping template matching.", 3000);
            return { templateDraftNotification: '' };
        }

        const templateFileNames = templatesFolder.children
            .filter(file => file instanceof TFile && file.extension === 'md')
            .map(file => file.name);

        const matchingPrompt = createTemplateMatchingPrompt(suggestedType, templateFileNames);
        const matchingModel = this.genAI.getGenerativeModel({ 
            model: this.settings.model,generationConfig: { temperature: 0.0, top_k: 1, top_p: 1 }});
        const matchingResult = await this.makeApiCallWithRetry(() => matchingModel.generateContent(matchingPrompt));
        const bestMatch = matchingResult.response.text().trim();

        if (bestMatch && bestMatch !== "null" && templateFileNames.includes(bestMatch)) {
            // console.log(`AI matched to existing template: ${bestMatch}`);
            return { templateDraftNotification: '' };
        }

        // If no match, draft a new template
        return { templateDraftNotification: await this._draftNewTemplate(suggestedType, rawContent) };
    }

    /**
     * Helper for drafting a new template when no suitable one is found.
     */
    private async _draftNewTemplate(suggestedType: string, rawContent: string): Promise<string> {
        console.log("No suitable template found. Attempting to draft a new one.");
        const exampleFileNames = ['03 Core Concept Template.md', 'Project Note Template.md']; // Or get these dynamically
        const fewShotExamples = [];

        for (const fileName of exampleFileNames) {
            try {
                const examplePath = `${this.settings.templatesFolderPath}/${fileName}`;
                const exampleContent = await this.app.vault.adapter.read(examplePath);
                fewShotExamples.push({ fileName, content: exampleContent });
            } catch (e) {
                console.warn(`Could not load example template for few-shot learning: ${fileName}`);
            }
        }

        if (fewShotExamples.length === 0) {
            new Notice("Could not draft template: No example templates found to learn from.");
            return '';
        }

        const draftPrompt = createTemplateDraftPrompt(suggestedType, rawContent, fewShotExamples);
        const draftModel = this.genAI.getGenerativeModel({ model: this.settings.model });
        const draftResult = await this.makeApiCallWithRetry(() => draftModel.generateContent(draftPrompt));
        const newTemplateContent = draftResult.response.text();

        const draftsSubfolderPath = `${this.settings.templatesFolderPath}/Drafts`;
        await this.fileService.createFolder(draftsSubfolderPath);
        const newTemplateFileName = `${suggestedType} Template.md`;
        const newTemplateFilePath = `${draftsSubfolderPath}/${newTemplateFileName}`;
        await this.fileService.createFile(newTemplateFilePath, newTemplateContent);

        return `
---
### 📝 New Template Drafted
    
I've identified a new note type: **"${suggestedType}"** and drafted a new template for it.
    
Please review the draft at [[${newTemplateFilePath}]]. Once you approve it, move it to your main templates folder before running the note generation command.
---
`;
    }

    /**
     * Assembles all the pieces of the plan (analysis, proposals, questions) into a single string.
     * This version is updated to reflect the "Source Analysis" workflow.
     */
    private _assemblePlanContent(planData: any, extractedSource: string, templateDraftNotification: string): string {
        
        // NEW: "AI Analysis of Source" section
        const analysisSection = `## AI Analysis of Source\n---\n\n${planData.source_analysis}\n\n` +
            planData.key_concepts.map((p: any) => `- **${p.concept}:** ${p.suggestion}`).join('\n');

        const relatedConnectionsSection = planData.missing_connections?.length > 0
            ? `\n\n---\n### Related Connections\n\n_To build a deeper understanding, consider exploring these related topics:_\n\n` +
            planData.missing_connections.map((conn: string) => `- ${conn}`).join('\n')
            : '';
        
        // NEW: "Proposed Knowledge Structure" heading
        const proposalSection = `\n\n---\n### Proposed Atomic Notes\n\n` +
            planData.note_categories.map((cat: any) =>
                `**${cat.category_title}**\n- ${cat.category_description}\n` +
                cat.notes.map((note: any) => `\t- [[${note.title}]]`).join('\n')
            ).join('\n\n');

        // NEW: "Detailed Lesson Plan" heading
        const notesPlanSection = `\n---\n### Notes Plan\n\n` +
            planData.checklist_notes.map((note: any) => `- **${note.title}** \`(${note.type})\`\n\t- *${note.description}*`).join('\n');

        const questionsSection = planData.provocative_questions?.length > 0
            ? `\n\n---\n### Provocative Questions\n\n_Ponder these questions to challenge your assumptions and synthesize the material:_\n\n` +
            planData.provocative_questions.map((q: string) => `- ? ${q}`).join('\n')
            : '';

        // This section is now hard-coded as the place for the user to write.
        // const synthesisSection = `\n\n---\n\n## My Synthesis & Answers\n\n_This is my understanding of the lesson..._\n\n1. `;

        const frontmatter = `---
main_topic: ${planData.plan_details.main_topic.replace(/[\\/:?*\"<>|]/g, "")}
source: "${extractedSource}"
---

`;
        // Assemble all the new sections
        return [frontmatter, analysisSection, relatedConnectionsSection, templateDraftNotification, proposalSection, notesPlanSection, questionsSection,].join('');
    }

    /**
     * Creates the final plan note file in the vault.
     */
    private async _createPlanFile(planData: any, finalPlanContent: string): Promise<string> {
        const mainTopic = planData.plan_details.main_topic.replace(/[\\/:?*\"<>|]/g, "");
        const uniquePhrase = planData.plan_details.unique_phrase;
        const planFileName = `${mainTopic} - ${uniquePhrase}.md`;
        const planFilePath = `${this.settings.plansFolderPath}/${planFileName}`;

        await this.fileService.createFolder(this.settings.plansFolderPath);
        await this.fileService.createFile(planFilePath, finalPlanContent);
        return planFilePath;
    }
    
    public async sanitizeDraftNotes(folderPath: string, progressCallback: (update: string) => void): Promise<string> {
        await this.logActivity(`Starting note sanitization for folder: "${folderPath}".`);
        progressCallback("Scanning for notes to clean...");

        const notesFolder = this.app.vault.getAbstractFileByPath(folderPath);
        if (!(notesFolder instanceof TFolder)) {
            return `Error: The folder "${folderPath}" was not found.`;
        }

        const allNotes = this._getAllNotesInFolder(notesFolder);
        let cleanedCount = 0;

        // This regex is designed to find the entire block you want to remove.
        const cleanupRegex = /\n##### Code Translation\n\n```python\nnothing to fill here\n```\n\n\s*\[\[.*?\|View Full Implementation & Analysis\]\]/gm;

        for (const [index, note] of allNotes.entries()) {
            progressCallback(`[${index + 1}/${allNotes.length}] Checking: ${note.basename}`);
            const originalContent = await this.fileService.readFile(note);

            if (cleanupRegex.test(originalContent)) {
                const newContent = originalContent.replace(cleanupRegex, '');
                await this.fileService.modifyFile(note, newContent);
                cleanedCount++;
            }
        }

        if (cleanedCount === 0) {
            await this.logActivity("Sanitization scan complete. No notes needed cleaning.");
            return "Scan complete. No notes needed cleaning.";
        }

        const message = `Sanitization complete. Cleaned ${cleanedCount} notes in "${folderPath}".`;
        await this.logActivity(message);
        return message;
    }

    public async extractMechanismsForPlan(folderPath: string, progressCallback: (update: string) => void): Promise<string> {
        await this.logActivity(`Starting Mechanism Draft creation for folder: "${folderPath}".`);
        progressCallback("Scanning folder for mechanism sections...");

        const notesFolder = this.app.vault.getAbstractFileByPath(folderPath);
        if (!(notesFolder instanceof TFolder)) return `Error: The folder "${folderPath}" was not found.`;

        const allNotes = this._getAllNotesInFolder(notesFolder);

        let draftContent = `# Mechanism Draft\n\n- **Source Folder:** "${folderPath}"\n\n---\n\n`;
        let extractedCount = 0;

        for (const [index, note] of allNotes.entries()) {
            progressCallback(`[${index + 1}/${allNotes.length}] Scanning: ${note.basename}`);

            const contentRaw = await this._readFullNoteForMath(note);
            const content = contentRaw || "";

            // --- THIS IS THE FINAL, CORRECTED REGEX ---
            // We removed the 'm' (multiline) flag to fix the '$' anchor.
            // We replaced all `^` anchors with `(?:^|\\n)` to manually
            // find the start of a line.
            const mechanismRegex = new RegExp(
                '####\\s*Mechanism\\s*[\\r\\n]+([\\s\\S]*?)(?=(?:^|\\n)[ \\t]*#{1,5}\\s+|(?:^|\\n)[ \\t]*-{3,}\\s*$|(?:^|\\n)[ \\t]*\\*{3,}\\s*$|$)',
                'gi' // global, case-insensitive. NO 'm' flag.
            );
            // --- END OF FIX ---

            // The rest of the function is the same
            if ((content as any).matchAll) {
                for (const m of content.matchAll(mechanismRegex)) {
                    const mechanismContent = (m[1] || "").trim();
                    if (!mechanismContent) continue;

                    draftContent += `### From: [[${note.path}]]\n\n${mechanismContent}\n\n---\n\n`;
                    extractedCount++;
                }
            } else {
                let m: RegExpExecArray | null;
                while ((m = mechanismRegex.exec(content)) !== null) {
                    const mechanismContent = (m[1] || "").trim();
                    if (!mechanismContent) continue;

                    draftContent += `### From: [[${note.path}|${note.basename}]]\n\n${mechanismContent}\n\n---\n\n`;
                    extractedCount++;
                    if (m.index === mechanismRegex.lastIndex) mechanismRegex.lastIndex++;
                }
            }
        }

        if (extractedCount === 0) {
            return "Scan complete. No notes with a '#### Mechanism' section were found.";
        }

        const timestamp = new Date().toLocaleString('sv').replace(/ /g, '_').replace(/:/g, '-');
        const draftFileName = `Mechanism Draft - ${notesFolder.name} - ${timestamp}.md`;
        const draftFilePath = `${this.settings.plansFolderPath}/${draftFileName}`;

        await this.fileService.createFile(draftFilePath, draftContent);

        await this.logActivity(`Created Mechanism Draft with ${extractedCount} sections from "${folderPath}".`);
        return `Successfully created draft with ${extractedCount} mechanism sections! Find it at: [[${draftFilePath}]]`;
    }

    /**
     * PLAN PHASE: Reads the draft file, uses AI to analyze all equations
     * and choose templates, and generates a structured plan.
     * This version makes a single API call for the entire draft.
     */
    public async createMathPlanFromDraft(draftFilePath: string, progressCallback: (update: string) => void): Promise<string> {
        progressCallback("Reading mechanism draft file...");
        
        const draftFile = this._getTargetFile(draftFilePath);
        if (!draftFile) return "Error: Could not find the specified draft file.";

        const draftContent = await this.fileService.readFile(draftFile);
        
        const sectionRegex = /### From: \[\[(.*?)\]\]/g;
        const sections = [...draftContent.matchAll(sectionRegex)];
        if (sections.length === 0) return "No 'From: [[...]]' sections found in the draft file.";
        
        progressCallback("Sending draft to Gemini for analysis...");
        
        try {
            const model = this.genAI.getGenerativeModel({ model: this.settings.model, generationConfig: { temperature: 0.1 } });
            const prompt = createMathPlanFromDraftPrompt(draftContent); // Use our new prompt
            
            const result = await this.makeApiCallWithRetry(() => model.generateContent(prompt));
            const rawResponse = result.response.text();

            // --- ROBUST JSON PARSING ---
            let jsonText = rawResponse;

            // 1. Try to find the ```json ... ``` block
            const jsonMatch = jsonText.match(/```json\n([\s\S]*?)\n```/);
            if (jsonMatch && jsonMatch[1]) {
                jsonText = jsonMatch[1];
            } else {
                // 2. If no block, strip any 'json' prefix and find the first { and last }
                jsonText = jsonText.replace(/^json\s*/i, '').trim(); // Remove 'json ' prefix
                const firstBrace = jsonText.indexOf('{');
                const lastBrace = jsonText.lastIndexOf('}');
                
                if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
                    jsonText = jsonText.substring(firstBrace, lastBrace + 1);
                } else {
                    // 3. If it's still not valid, throw a clear error
                    console.error("Failed to parse AI response:", rawResponse);
                    throw new Error("AI response did not contain a valid JSON block.");
                }
            }
            // --- END ROBUST JSON PARSING ---
            
            const aiResponse = JSON.parse(jsonText);
            const analyzedEquations = aiResponse.equations;

            if (!analyzedEquations || analyzedEquations.length === 0) {
                return "AI analysis complete, but no equations were found in the draft.";
            }

            // --- Build the new plan structure ---
            let planHeader = `# Math Equation Plan\n\n`;
            planHeader += `- **Created:** ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}\n`;
            planHeader += `- **Source Draft:** [[${draftFilePath}]]\n\n---\n\n`;
            
            let planEntries = '';
            let currentSourceNote = '';

            // Group the equations by their source note for better readability
            const sortedEquations = analyzedEquations.sort((a:any, b:any) => 
                a.source_note_path.localeCompare(b.source_note_path)
            );

            for (const eq of sortedEquations) {
                
                if (eq.source_note_path !== currentSourceNote) {
                    planEntries += `### From: [[${eq.source_note_path}]]\n\n`;
                    currentSourceNote = eq.source_note_path;
                }

                // --- This is the new, "no checklist" format ---
                planEntries += `**Title:** ${eq.title}\n`;
                planEntries += `**Template:** ${eq.template_choice}\n`;
                planEntries += `**Equation:** \`${eq.equation}\`\n`;
                planEntries += `  > **Type:** *${eq.classification || 'N/A'}*\n`;
                planEntries += `  > **Description:** *${eq.description}*\n`;

                if (eq.key_variables && eq.key_variables.length > 0) {
                    planEntries += `  > **Key Variables:**\n`;
                    for (const v of eq.key_variables) {
                        planEntries += `  >   - ${v.variable}: ${v.meaning}\n`;
                    }
                }
                planEntries += `\n---\n\n`; // Add separation
            }

            const finalPlanContent = planHeader + planEntries.trim();
            const planFileName = `Math Plan - ${draftFile.basename.replace('Mechanism Draft - ', '')}.md`;
            const planFilePath = `${this.settings.plansFolderPath}/${planFileName}`;
            
            await this.fileService.createFile(planFilePath, finalPlanContent);
            
            await this.logActivity(`Created Math Plan with ${analyzedEquations.length} equations from draft "[[${draftFilePath}]]" in a single API call.`);
            return `Successfully created plan with ${analyzedEquations.length} equations! Find it at: [[${planFilePath}]]`;

        } catch (e) {
            console.error("Failed to create math plan:", e);
            await this.logActivity(`ERROR: Failed to create math plan. Reason: ${e.message}`);
            return `Sorry, an error occurred during AI analysis: ${e.message}`;
        }
    }

    // ... all the existing methods from DYNAMIC NOTE GENERATION LOGIC onwards...


    // =================================================================
    // NEW: DYNAMIC NOTE GENERATION LOGIC
    // =================================================================

    /**
     * Extracts all unique placeholders from a template string.
     * e.g., "Hello {{name}}, welcome to {{location}}!" -> ['name', 'location']
     */

    private extractPlaceholders(templateContent: string): string[] {
        const regex = /\{\{(.*?)\}\}/g;
        const matches = new Set<string>();
        let match;
        while ((match = regex.exec(templateContent)) !== null) {
            matches.add(match[1].trim());
        }
        return Array.from(matches);
    }    

    /**
     * Builds a prompt on-the-fly to ask the AI for the specific fields
     * needed by a template.
     */
    private createDynamicNotePrompt(noteType: string, context: string, placeholders: string[], parent: string | null, children: string[], vaultContext: string, siblingNotes: string[]): string {
        const fieldsList = placeholders.map(p => `- "${p}"`).join('\n');
        
        let hierarchicalContext = '';
        if (parent) {
            hierarchicalContext += `\nThe direct parent note for this concept is "[[${parent}]]".`;
        }
        if (children.length > 0) {
            const childrenList = children.map(c => `"[[${c}]]"`).join(', ');
            hierarchicalContext += `\nThe direct children notes for this concept are: ${childrenList}.`;
        }

        // --- NEW, MORE SPECIFIC INSTRUCTION BLOCK ---

        // 1. NEW: Create the Sibling Context Block
        let siblingContextInstruction = '';
        if (siblingNotes.length > 0) {
            const siblingsList = siblingNotes.map(s => `- [[${s}]]`).join('\n');
            siblingContextInstruction = `
    ### COHESION & INTERCONNECTIVITY (CRITICAL)
    You are generating one note as part of a larger batch of notes. To make the knowledge graph feel cohesive, you MUST mention and link to the other notes in this batch where contextually relevant.

    **The Sibling Notes being generated alongside this one are:**
    ${siblingsList}

    **Instructions for Linking:**
    1. **Narrative Weaving:** In the 'summary.definition', 'details.core_idea', or 'details.mechanism_bullets', try to weave in comparisons or connections to the siblings.
    2. **Related Field:** You MUST include at least 2-3 relevant Sibling Notes in the "connections.related" array.
    2. **Visual Examples:** If any sibling note title starts with **'Example -'**, this is a visual case study provided by the user. 
       - You MUST reference and naturally integrate a wikilink to this example inside your **'details.mechanism_bullets'** to illustrate a specific step.
    `;
        }


        const keywordInstruction = `\n- For the "tags_keywords" key, you MUST generate an array of 3-5 relevant lowercase, snake_case technical keywords for this specific concept. This is a mandatory field. Do not include the main topic or the note type.`;
        const relatedFieldInstruction = placeholders.includes('related') 
            ? `- For the "related_links_for_yaml" key, you MUST generate a comprehensive list of 10-15 wikilinks to closely related concepts. Think broadly: include parent concepts, child concepts, contrasting ideas, practical applications, and foundational prerequisites.`
            : '';

        const fundamentalInstruction = `
- **Fundamental Object Logic**: You MUST structure the justification within a JSON key called "fundamental". This key must contain an object with a single sub-key: "justification".
    - "justification": A clear, concise sentence explaining why this concept is a cornerstone of the broader subject, essential for anyone to learn.`;

        const namingConventionInstruction = `\n- **Naming Convention**: All wikilinks you generate MUST strictly follow the user's established naming convention. For most topics, this is "Subject - Concept" (e.g., "ML - Logistic Regression"). For fundamental topics, it is "Fundamental - Concept" (e.g., "Fundamental - Machine Learning"). Use the exact naming convention: "Subject - Concept" (e.g., "ML - Logistic Regression"). Do NOT invent new formats. If a concept exists in the existing hierarchy, use the exact full name listed there. When creating a wikilink, if the target concept is listed in the EXISTING STRUCTURAL NOTES, you MUST use its exact full name (e.g., "Fundamental - Machine Learning").`;
        const newFieldInstructions = `
- For the "concept_name" key, provide the clean concept name without the "Subject - " prefix. (e.g., if the note title is "ML - Logistic Regression", this should be "Logistic Regression").
- For the "summary.analogy_text" key, you MUST provide a powerful, real-world analogy and then **explicitly map its components to the concept's components**.
- For the "summary.analogy_breakdown" key, you MUST provide a bullet point that starts with '**Where it breaks down:**' and explains the analogy's limitations. This is vital for preventing misconceptions.`;

        const detailedContentInstructions = `
- **Details Object Logic (The 'Why, How, Where' Narrative)**: Your most important task is to structure the detailed explanation as a compelling story instead of a flat, unrelated list of details, using the simplest language possible. Use the sub-keys within the "details" JSON object to build this 'Why, How, Where' narrative. You should only include math where it is essential for understanding a real-world use case.

---
### **Part 0: The 'Significance' (New Top-Level Field)**
- For "**why_this_matters**": Write a single, concise, and compelling sentence that explains the real-world or technical significance of this concept. This sentence MUST connect the concept to a critical outcome.

---
### **Part 1: The 'Why' (The Introduction)**
- For "**core_idea**": Your task is to write a clear, multi-sentence introductory hook that paraphrases and synthesizes the main idea from the provided source material. The paragraph should mirror the original tone in a natural, human-like, and conversational way—similar to how a tutor would introduce the concept after that (Important), again explain what the concept is accurately, identify the field it belongs to (based on the context), mention any important or helpful background points, you can also use same or similar examples, and if not already mentioned in provided source material, end with a sentence that introduces its main categories or types in bold, if any.
- For "**primary_goal**": Write a single string explaining the easy-to-understand main reason behind the existence of this concept.

---
### **Part 2: The 'How' (The Mechanism - CHOOSE A PATH)**
Your next task is to determine if the concept is primarily **Practical (Codeable)** or **Conceptual (Theoretical)** and follow the appropriate path for the mechanism.

#### **PATH 1: If the Concept is Practical/Codeable...**
- For "**mechanism_bullets**": Outline a standard, practical workflow in a numbered, step-by-step format. These steps MUST directly correspond to the code you will provide in "mechanism_code_snippet". Each step must start with a bolded title like '**Step 1: Prepare the Data**'.
- For "**mechanism_code_snippet**": You MUST provide a Python code block that is a direct implementation of the steps from "mechanism_bullets". Use comments to explicitly label each step (e.g., \`# --- Step 1 ---\`).

#### **PATH 2: If the Concept is primarily Conceptual...**
- For "**mechanism_bullets**": Use this array to elaborate on the details of the core process and its key components, which you introduced in the core_idea paragraph.
    - The **first item** should explain the high-level process, starting with a bolded label like '**How it Works:**' and havings numbered points labeled with 1. , 2. , 3. , and so on if relevant.
    - **Subsequent items** should detail the key components or types of the main concept. Start each with a bolded title (e.g., '**Component A:**') (Don't use the word component itself).
    - Each component item MUST have **'children' bullets** that provide simple, concrete examples to illustrate it. Examples can be italicised for beautiful rendering. if examples have multiple points, write them in sperate indented points under Example:
- For "**mechanism_code_snippet**": If any mathematical expressions in mechanism_bullets are applicable in real-world use, translate them into Python code in the same sequence and explain the translation. If no expressions are applicable, You MUST return a message **nothing to fill here**.

---
### **Part 3: The 'Where' (The Broader Context)**
- For "**parameters_bullets**": Continue the 'how' by identifying the key 'levers' or hyperparameters that control the mechanism, explaining their impact.
- For "**tradeoffs_bullets**": Conclude the story by explaining 'where' this concept fits and its consequences. What are the tradeoffs of using it? What are its limitations? This connects the concept to the broader landscape.
`;

        const comparisonInstructions = `
        - **Comparison Logic**:
            - For "comparison.item_a" and "comparison.item_b", explicitly state the names of the two concepts being compared (e.g., "Linear Regression" and "Logistic Regression").
            - For "comparison.side_by_side_bullets", you must generate a nested list structure:
                - The **Top-Level Bullets** must be the names of the concepts being compared (e.g., "**Concept name**").
                - The **Child Bullets** must be the specific characteristics, pros, cons, or features of that concept, distinct from the other.
            - For "comparison.key_similarities", write a paragraph identifying the shared attributes or common ground between the two concepts.
            - For "comparison.verdict", provide a pragmatic "Decision Rule". (e.g., "Use X when speed is critical; use Y when accuracy is paramount.")
            - For "comparison.comparison_table", generate a Markdown table with three columns: "Feature", "Concept A", and "Concept B". Compare them across 3-5 critical dimensions.
        `;

        const relationshipInstructions = `
        - **Relationship Logic**:
            - For "relationship.connection_type", strictly define the nature of the link (e.g., "Causal", "Sequential", "Inverse").
            - For "relationship.mechanism_of_interaction", explain the *process* by which one concept affects the other.
            - For "relationship.impact", explain the practical upshot. Why should the user care about this link?
        `;

        const questionsInstruction = `
        - For the "questions" key, your task is to generate questions from the perspective of a senior machine learning engineer, focusing on practical trade-offs, system-level thinking, and business impact. You MUST generate one question from each of the following categories:
             1.  **Trade-off & Business Impact Question:** A question that forces the user to analyze a difficult trade-off (e.g., accuracy vs. cost, interpretability vs. performance) and connect it to a real-world business goal. (e.g., "When would you choose a less accurate but highly interpretable model over a black box model, and how would you justify the business value of this choice to a non-technical stakeholder?").
             2.  **System & Scalability Question:** A question about how this concept would be implemented and maintained within a larger production system, focusing on potential bottlenecks, data dependencies, or failure modes. (e.g., "How would you design a monitoring system to detect data drift for this model in production, and what would be your automated response?").
             3.  **Provocative 'What If' Question:** A provocative thought-experiment that challenges a core assumption of the concept or explores its absolute limits. (e.g., "What if you were forbidden from using gradient descent? How else could you find the optimal parameters for this model?").`;

        const mathFormattingInstruction = `
        - **LaTeX Formatting for Formulas**: You MUST adhere to the following strict rules for all mathematical notation:
            1.  **Mandatory LaTeX**: You MUST format ANY and ALL mathematical variables (e.g., J, θ, λ), symbols, and equations using LaTeX. There are no exceptions.
            2.  **Proper Commands**: You MUST use proper LaTeX commands (e.g., \`\\theta\`, \`\\lambda\`, \`\\cdot\`). Do NOT use raw unicode characters (like θ, λ, ·).
            3.  **CRITICAL - NO PLAIN TEXT SYMBOLS**: You MUST NEVER write the names of Greek letters or other symbols as plain text inside a math block. For example, ALWAYS write \`$\lambda$\`. This is the most common mistake and you must avoid it.
            4.  **Formatting Guideline for Delimiters**: You MUST use **double dollar signs (\`\$\$...\$\$\`)** for standalone equations (e.g., any expression containing an equals sign like \`\$\$E=mc^2\$\$ \`). You MUST use **single dollar signs (\`\$...\$\`)** for all inline variables or symbols (e.g., \`\$\\lambda\$\`, \`\$\\theta\$\`).
            5.  **No Spaces Around Delimiters**: There MUST NOT be any space between the dollar sign delimiters and the start or end of the LaTeX content. For example, write \`$E=mc^2$\` instead of \`$ E=mc^2 $\`.
            6.  **Separate Text**: Keep explanatory text (e.g., "New Loss =", "Where:") **outside** of the dollar sign delimiters.
            7.  **CRITICAL - Omit Detailed Breakdowns**: Your goal is to present the core formulas that define the process. Detailed deconstructions of each variable (e.g., using a "Where:" list) should be omitted from this section.`;

        // Add this with your other instruction constants
        const mechanismAsciiInstruction = `
        - **ASCII Mechanism Diagram**: For the "details.mechanism_ascii_diagram" key (if requested by the template), you MUST generate a very simple ASCII visual aid on what this concept is about depending on the context based on the following guide. Keep it clean and simple.
            - **Flow Diagram**: Show execution flow or sequential steps.
            - **Block Diagram**: Show ML pipelines, data flow, or system architecture.
            - **Table**: Compare groups, encodings, or trade-offs.
            - **Hierarchy Tree**: Show parent/child relationships.
            - **Numeric Example**: Make abstract equations concrete.`;

        const connectionsAsciiInstruction = `
        - **ASCII Connections Map**: For the "connections.ascii_map" key, you MUST generate a clean, spacious, minimalist ASCII diagram with the note's concept as centered while matching the user's preferred style, as shown in the example, let the diagram use space horizontally to accomodate text with breathing room for each by using just enough ──── dashes.
            
            - **HIERARCHY:**
                - Use only subject/concept names, do not use note titles from vault in diagrams.
                - \`connections.parent\` at top, labeled \`(Parent)\`, with \`▲\`.
                - Current note ("${noteType}") as the central node and enclose it in a box.
                - \`connections.children\` below.
                - \`connections.related\` on horizontal branches but don't connect them.

            - **EXAMPLE OF PREFERRED STYLE try to replicate the structure exactly:**
            \`\`\`
                          (Parent)
                   Linear Regression
                           ▲
                           │
           ┌───────────────┼────────────────────────────┐
           │               │                            │
 (Alternative)    ┌───────────────────────────┐     (Equivalent)
Kruskal-Wallis    │   Categorical Predictor   │     T-Test
                  └───────────────────────────┘
                             │
                  ┌──────────┴──────────┐
                  │                     │
                ANOVA                 ANCOVA
                                   (Used In)
                                      │
                                     GLMs
            \`\`\`
        `;

        // --- NEW: INSTRUCTION FOR RICH MARKDOWN FORMATTING ---
        const markdownFormattingInstruction = `\n- **Hierarchical Bullet Points for Clarity**: To create the intelligent, nested indentation you see in the examples, you MUST use the \`children\` key for any sub-points, clarifications, or examples. The main idea should always be in the parent's \`content\` field, while supporting details or examples go into a \`children\` array. This is the primary way to break down complex topics visually.`;

        const jsonEscapingInstruction = `
- **JSON Backslash Escaping**: This is the MOST CRITICAL instruction. All backslashes (\\) in your response, especially within LaTeX code, MUST be properly escaped with a double backslash (\\\\).
    - **Example**: To represent the LaTeX \`$\\theta$\`, the JSON value MUST be \`"$\\\\theta$"\`.
    - **Example**: To represent \`$\\nabla J(\\theta)$\`, the JSON value MUST be \`"$\\\\nabla J(\\\\theta)$"\`.
    - Failure to do this will result in invalid JSON. This rule is non-negotiable.`;
        
        const bulletPointInstruction = `
        - **Bulleted List Logic**: For any JSON key that ends in '_bullets', you MUST return an array of objects. Each object must have a "content" key. For nested items, the parent object should also have a "children" key, which contains another array of these objects.
        - Example Structure:
+        \`\`\`json
+        [
+        {
+            "content": "**Step 1: Calculate the Error**",
+            "children": [
+            { "content": "First, the model calculates the error using a standard loss function like Mean Squared Error (MSE), defined as $$J(\\\\theta) = \\\\frac{1}{m} \\\\sum_{i=1}^{m} (h_\\\\theta(x^{(i)}) - y^{(i)})^2$$." }
+            ]
+        },
+        {
+            "content": "**Step 2: Add the Complexity Penalty**",
+            "children": [
+            { "content": "Next, the loss is augmented with a penalty term, scaled by the hyperparameter $\\\\lambda$, creating the regularized objective: $$J_{reg}(\\\\theta) = J(\\\\theta) + \\\\lambda \\\\Omega(\\\\theta)$$." }
+            ]
+        }
+        ]
+        \`\`\`
        `;


        const connectionInstructions = `
- **Connection Logic (Narrative Style)**: Your task is to weave the connections into a seamless narrative. For the "connections.related" and "connections.other_fundamentals" fields, each item in the array MUST be a complete sentence.
- **CRITICAL RULE**: Each sentence MUST naturally integrate a relationship type (like **contrasts with**, **is an example of**, **is built upon**). You are strictly forbidden from starting the sentence with a bolded label.
- **Use Aliased Wikilinks**: To ensure sentences read naturally, you MUST use aliased wikilinks like \`[[Full Note Name|display text]]\`.

- **Hierarchical Context**: 
    - For "**connections.parent**", write a sentence describing the parent concept.
    - For "**connections.children**", you MUST create a sentence for each conceptual sub-type and for each specific algorithm. **The main subject of the sentence MUST be the wikilink.**
        - **Correct Example for a Sub-Type**: "A key sub-type is [[ML - Binary Classification|binary classification]], which addresses problems with two possible outcomes and is often implemented using algorithms like logistic regression."
        - **Correct Example for an Algorithm**: "Specific algorithms include [[ML - Support Vector Machines|support vector machines]], which are powerful models that find an optimal hyperplane to separate classes."
- **YAML Links**: For the "related_links_for_yaml" key, you MUST provide a simple array of 10-15 full note titles (e.g., "ML - Logistic Regression").`;

        return `You are an expert knowledge architect. Your task is to generate the structured content for a note based on the following source material: "${context}".

You MUST return a single, valid JSON object that strictly adheres to the following nested structure. All fields are mandatory.  Formatting and structure are more important than the prose. Any deviation from the schema will result in a failed output.

{
  "why_this_matters": "A single, compelling sentence explaining the concept's real-world or technical significance.",
  "concept_name": "The clean name of the concept (e.g., Logistic Regression).",
  "summary": {
    "definition": "A concise, one-sentence definition.",
    "analogy_text": "A concise, powerful, real-world analogy to make the concept easier to understand.",
    "analogy_breakdown": "A bullet point that MUST start with '**Where it breaks down:**' and briefly explains the key limitations of the analogy."
  },
  "details": {
    "core_idea": "A one or two-sentence introductory paragraph for the 'Details' section.",
    "primary_goal": "Explain the specific problem the concept solves.",
    "mechanism_bullets": "A step-by-step numbered explanation using the nested bullet point structure. Use bolded titles for each step and include LaTeX formulas. CRITICAL: Any defining equation MUST be in its own separate bullet point and use double dollar signs ("$$...$$").",
    "mechanism_code_snippet": "Optional Python code to demonstrate the mechanism, e.g., a loss function implementation. Provide an empty string if not applicable.",
    "mechanism_ascii_diagram": "The ASCII diagram for the mechanism. MUST be a string, even if empty.",
    "parameters_bullets": "Identify key hyperparameters and their effects using the nested bullet point structure.",
    "tradeoffs_bullets": "Explain the consequences and impact on tradeoffs using the nested bullet point structure."
  },
  "connections": {
    "ascii_map": "The ASCII connections map. MUST be a string, even if empty."
    "parent": "A sentence describing the parent concept, embedding an aliased [[wikilink|like this]].",
    "children": ["An array of sentences", "each describing a child concept with an aliased [[wikilink]]."],
    "related": ["An array of sentences", "each describing a related concept with a categorized, bolded label like '**Contrasts With:**' and an aliased [[wikilink]]."],
    "other_fundamentals": ["An array of sentences", "describing connections to other broad, fundamental topics with aliased wikilinks."]
  },
  "questions": ["An array of thought-provoking questions as simple strings."],
  "tags_keywords": ["An array of 3-5 relevant, lowercase, snake_case technical keywords."],
  "related_links_for_yaml": ["An array of 10-15 wikilinks to related notes for the YAML frontmatter. Follow the 'Subject - Concept' naming convention strictly."]
}

CRITICAL INSTRUCTIONS:
- **Contextual Adherence**: Your absolute primary goal is to generate content that explains and elaborates on the details provided in the source material. Prioritize a clear narrative flow that *strictly follows the curriculum* from the context. Do not provide generic information. All subsequent instructions are about how to format your explanation of THIS topic.
- **LaTeX**: You MUST use properly escaped LaTeX for all math (e.g., "$\\\\theta$").
- **JSON Escaping**: All backslashes MUST be double-escaped (e.g., \\\\).
- **Nested Bullets**: For any key ending in '_bullets', you MUST use the format: [{"content": "...", "children": [...]}].

--- PROMPT DETAILS ---
${siblingContextInstruction}
${relatedFieldInstruction}
${namingConventionInstruction}
${newFieldInstructions}
${keywordInstruction}
${fundamentalInstruction}
${comparisonInstructions}
${relationshipInstructions}
${markdownFormattingInstruction}
${connectionInstructions}
${detailedContentInstructions}
${bulletPointInstruction}
${mathFormattingInstruction}
${questionsInstruction}
${mechanismAsciiInstruction}
${connectionsAsciiInstruction}
${jsonEscapingInstruction}

${vaultContext ? `
### EXISTING STRUCTURAL NOTES
Here is a map of the user's existing high-level notes. You MUST use this as a source of truth.
${vaultContext}
---` : ''}

The required JSON keys are:
${fieldsList}
`;
    }

    /**
     * A universal template populator. It takes a template string and a data object,
     * and replaces any {{key}} with the corresponding data[key] value.
     */

    private formatNestedList(items: any[], level = 0): string {
        const result: string[] = [];
        const indent = '    '.repeat(level);

        for (const item of items) {
            // Skip any malformed items in the array
            if (typeof item !== 'object' || item === null || !item.content) {
                continue;
            }

            const isFormula = item.content.startsWith('$$') && item.content.endsWith('$$');

            if (isFormula && result.length > 0) {
                // If the current item is a formula, append it to the PREVIOUS item.
                const lastItemIndex = result.length - 1;
                
                // The two extra spaces have been removed from this line for perfect alignment.
                result[lastItemIndex] += ` ${indent}${item.content}`;
                
            } else {
                // Check if the content is already a numbered list item (e.g., "1. ...")
                const isNumberedListItem = /^\d+\.\s/.test(item.content);

                if (isNumberedListItem) {
                    // If it is, just add the indentation without an extra hyphen.
                    result.push(`${indent}${item.content}`);
                } else {
                    // Otherwise, treat it as a regular bullet point.
                    result.push(`${indent}- ${item.content}`);
                }
            }

            // Handle any children the current item might have.
            if (Array.isArray(item.children) && item.children.length > 0) {
                result.push(this.formatNestedList(item.children, level + 1));
            }
        }
        return result.join('\n');
    }

    private getValueFromPath(obj: any, path: string): any {
        // This version is a bit cleaner as `o[k]` will evaluate to undefined if `o` is nullish.
        return path.split('.').reduce((o, k) => o?.[k], obj);
    }
    
    private populateTemplate(templateContent: string, data: Record<string, any>): string {
        let populatedContent = templateContent;
        const placeholders = this.extractPlaceholders(templateContent); // Use your existing function

        for (const key of placeholders) {
            const placeholderRegex = new RegExp(`\\{\\{${key}\\}\\}`, 'gi');
            let replacement = this.getValueFromPath(data, key); // Use the helper to get nested data

            if (replacement === null || replacement === undefined) {
                replacement = '';
            }

            const keyLower = key.toLowerCase();

            if (Array.isArray(replacement)) {
                if (keyLower === 'tags_yaml') {
                    replacement = "\n" + replacement.map(item => `  - ${String(item)}`).join("\n");
                } else if (keyLower === 'source' || keyLower === 'related') {
                    if (replacement.length === 0) {
                        replacement = '';
                    } else {
                        replacement = "\n" + replacement.map(item => {
                            const cleanedLink = String(item).replace(/["\[\]]/g, '');
                            return `  - "[[${cleanedLink}]]"`;
                        }).join("\n");
                    }
                } else if (keyLower.includes('_bullets')) {
                    replacement = this.formatNestedList(replacement);
                } else { 
                    replacement = replacement.map(item => `- ${String(item)}`).join('\n');
                }
            }

            populatedContent = populatedContent.replace(placeholderRegex, () => String(replacement));
        }

        // Clean up any remaining placeholders that didn't have data
        return populatedContent.replace(/\{\{.*?\}\}/g, '');
    }

    public async generateNotesFromPlan(plan_file_path: string | undefined, progressCallback: (update: string) => void): Promise<string> {
        const startTime = Date.now();
        
        try {
            // Step 1: Parse the plan file to get proposals and context
            const { proposals, mainTopic, sourceFromPlan } = await this._parsePlanFile(plan_file_path);
            if (proposals.length === 0) return "No pending notes with descriptions found in the plan.";
            
            progressCallback(`Found ${proposals.length} notes to generate...`);

            await this._writeDebugLog(
                NOTE_PROMPT_LOG_NAME, 
                `*Batch generation started for plan: [[${plan_file_path}]]*\n*Target Count: ${proposals.length} notes*`, 
                'overwrite'
            );

            // Step 2: Loop through each proposal and generate the note
            const generationResults = await this._processProposals(proposals, proposals, mainTopic, sourceFromPlan, progressCallback);

            // Step 3: Update hierarchy map if needed
            const newStructuralNotes = generationResults.filter(r => r.isStructural).map(r => r.link);
            if (newStructuralNotes.length > 0) {
                await this._appendToHierarchyMap(newStructuralNotes);
            }

            // Step 4: Log the activity and return a summary
            const durationInSeconds = ((Date.now() - startTime) / 1000).toFixed(1);
            
            const successfulNotes = generationResults.filter(r => r.success);
            const failedNotes = generationResults.filter(r => !r.success);
            const generatedCount = successfulNotes.length;

            // --- MODIFIED SECTION ---
            
            // Build the simple text summary
            let summaryMessage = `Generated ${generatedCount} of ${proposals.length} notes in ${durationInSeconds} seconds.`;
            if (failedNotes.length > 0) {
                summaryMessage += ` (${failedNotes.length} failed).`;
            }

            // Build the DETAILED panel summary with links
            let panelSummary = `✅ ${summaryMessage}\n\n---\n### CREATED FILES\n`;
            if (successfulNotes.length > 0) {
                panelSummary += successfulNotes.map(r => `- ${r.link}`).join("\n");
            } else {
                panelSummary += "_No new files were created._";
            }
            // Send the new, detailed summary to the panel
            progressCallback(panelSummary);
            
            // Build the message for the _Gemini Logs.md file (this can stay detailed)
            let logMessage = `Generated ${generatedCount} of ${proposals.length} notes in ${durationInSeconds}s from plan "[[${plan_file_path}]]".`;

            if (successfulNotes.length > 0) {
                logMessage += `\n- **Success:**` + successfulNotes.map(r => `\n\t- ${r.link}`).join("");
            }
            if (failedNotes.length > 0) {
                logMessage += `\n- **Failed:**` + failedNotes.map(r => `\n\t- ${r.link.replace(' (failed)', '')}`).join("");
            }

            await this.logActivity(logMessage);

            // We removed the `runFullEnhancementWorkflow` call in the previous step
            
            // Return the simple summary text
            return summaryMessage;
            
            // --- END MODIFIED SECTION ---

        } catch (e) {
            console.error("Fatal error during note generation:", e);
            await this.logActivity(`FATAL ERROR: Note generation failed. Reason: ${e.message}`);
            return `A critical error occurred: ${e.message}. Please check the console.`;
        }
    }

    public async generateCodeLabNotes(folderPath: string, progressCallback: (update: string) => void): Promise<string> {
        await this.logActivity(`Starting Code Lab note generation for folder: "${folderPath}".`);
        progressCallback("Scanning folder for notes with code snippets...");

        const notesFolder = this.app.vault.getAbstractFileByPath(folderPath);
        if (!(notesFolder instanceof TFolder)) {
            return `Error: The folder "${folderPath}" was not found.`;
        }

        const allNotes = this._getAllNotesInFolder(notesFolder);
        let generatedCount = 0;
        const failedNotes: string[] = [];
        const implementationLinkRegex = /\[\[(.*?)\|View Full Implementation & Analysis\]\]/;
        
        // This array will now hold objects
        const notesToProcess: { note: TFile, fileName: string, content: string }[] = [];

        // First, pre-filter notes, extract filename, AND store content
        for (const note of allNotes) {
            const content = await this.fileService.readFile(note);
            const match = content.match(implementationLinkRegex);
            
            // If we have a match, store the note, the extracted filename, and the content
            if (match && match[1]) {
                notesToProcess.push({ 
                    note: note, 
                    fileName: `${match[1]}.md`, // e.g., "ML - Logistic Regression (Code Lab).md"
                    content: content 
                });
            }
        }
        const totalToGenerate = notesToProcess.length;

        for (const [index, { note, fileName: newNoteFileName, content }] of notesToProcess.entries()) {
            const conceptName = note.basename.replace(/^Core: /, '').trim();
            progressCallback(`[${index + 1}/${totalToGenerate}] Generating: ${conceptName}...`);

            try {
                // --- Extract all the rich context needed for the prompt ---
                const goalRegex = /#### Primary Goal\n\n([\s\S]*?)\n\n#### Mechanism/m;
                const mechanismRegex = /#### Mechanism\n\n([\s\S]*?)\n\n##### Code Translation/m;
                const paramsRegex = /#### Key Parameters\n\n([\s\S]*?)\n\n#### Core Tradeoffs/m;
                const tradeoffsRegex = /#### Core Tradeoffs\n\n([\s\S]*?)\n\n## Connections/m;

                const primaryGoal = content.match(goalRegex)?.[1].trim();
                const mechanism = content.match(mechanismRegex)?.[1].trim();
                const keyParameters = content.match(paramsRegex)?.[1].trim();
                const coreTradeoffs = content.match(tradeoffsRegex)?.[1].trim();

                if (!primaryGoal || !mechanism || !keyParameters || !coreTradeoffs) {
                    new Notice(`Skipping "${conceptName}": Could not extract all required theoretical sections.`);
                    continue;
                }

                // --- Call the AI (the prompt no longer needs the clean_concept_name) ---
                const prompt = createCodeLabPrompt(conceptName, primaryGoal, mechanism, keyParameters, coreTradeoffs);
                const model = this.genAI.getGenerativeModel({ model: this.settings.model, generationConfig: { temperature: 0.1 } });
                const result = await this.makeApiCallWithRetry(() => model.generateContent(prompt));
                
                const rawResponse = result.response.text();
                const jsonMatch = rawResponse.match(/```json\n([\s\S]*?)\n```/);
                const jsonText = jsonMatch ? jsonMatch[1] : rawResponse.replace(/```/g, "").trim();
                const aiJson = JSON.parse(jsonText);

                // --- Populate the "Code Lab" template ---
                const templateContent = await this.app.vault.adapter.read(
                    `${this.settings.templatesFolderPath}/Code Lab Template.md`
                );

                const dataForTemplate = {
                    // 'concept_name' is still useful for the template content
                    concept_name: conceptName,
                    source_concept_note: note.basename,
                    // ... rest of the data ...
                    topic_tag: aiJson.topic_tag,
                    related: aiJson.related_concepts_yaml,
                    goal_statement: aiJson.goal_statement,
                    core_concepts: this._formatObjectList(aiJson.core_concepts, 'concept', 'description'),
                    dependencies_block: aiJson.dependencies_block,
                    implementation_block: aiJson.implementation_block,
                    essence_block: aiJson.essence_block,
                    analysis_observations: aiJson.analysis_observations,
                    analysis_theory_connection: aiJson.analysis_theory_connection,
                    analysis_practical_implications: aiJson.analysis_practical_implications,
                    experimentation_ideas: this._formatObjectList(aiJson.experimentation_ideas, 'idea', 'prompt'),
                    pitfalls_preprocessing: aiJson.pitfalls_preprocessing,
                    pitfalls_assumptions: aiJson.pitfalls_assumptions,
                    pitfalls_failure_modes: aiJson.pitfalls_failure_modes,
                };

                const finalContent = this.populateTemplate(templateContent, dataForTemplate);
                
                // --- Create the final note file using the extracted name ---
                const newNoteFilePath = `${this.settings.draftsFolderPath}/${newNoteFileName}`;
                await this.fileService.createFile(newNoteFilePath, finalContent);
                generatedCount++;

            } catch (e) {
                console.error(`Failed to generate Code Lab note for "${conceptName}":`, e);
                new Notice(`Error processing "${conceptName}". Check the developer console.`);
                failedNotes.push(conceptName);
            }
        }

        let logMessage = `Generated ${generatedCount} of ${totalToGenerate} Code Lab notes from folder "${folderPath}".`;
        if (failedNotes.length > 0) {
            logMessage += `\n- **Failed to generate:**\n\t- ` + failedNotes.join('\n\t- ');
        }
        await this.logActivity(logMessage);

        let finalMessage: string;
        if (totalToGenerate === 0) {
            finalMessage = "Scan complete. No notes with the required implementation link were found.";
        } else {
            finalMessage = `Successfully generated ${generatedCount} of ${totalToGenerate} Code Lab notes!`;
            if (failedNotes.length > 0) {
                finalMessage += ` (${failedNotes.length} failed). Check log for details.`;
            }
        }
        return finalMessage;
    }

    
    /**
     * Formats an array of objects into a Markdown string.
     * @param items - The array of objects to format.
     * @param titleKey - The object key to use for the bolded title.
     * @param descriptionKey - The object key to use for the description.
     * @returns A formatted Markdown string.
     */
    private _formatObjectList(items: any[], titleKey: string, descriptionKey: string): string {
        if (!items || !Array.isArray(items)) {
            return '';
        }

        return items.map(item => {
            const title = item[titleKey] || '';
            const description = item[descriptionKey] || '';
            return `- **${title}:** ${description}`;
        }).join('\n');
    }


    /**
     * Reads and parses the plan file to extract note proposals and metadata.
     */
    private async _parsePlanFile(plan_file_path: string | undefined) {
        if (!plan_file_path) {
            throw new Error("No plan file was specified or active.");
        }
        const planFile = this._getTargetFile(plan_file_path);
        if (!planFile) {
            throw new Error(`Plan file not found at path "${plan_file_path}".`);
        }

        const planContent = await this.fileService.readFile(planFile);
        const fileCache = this.app.metadataCache.getFileCache(planFile);
        const mainTopic = fileCache?.frontmatter?.main_topic?.toLowerCase().replace(/\s+/g, '-') || 'general';

        let sourceFromPlan: string[] = [];
        const sourceFromFile = fileCache?.frontmatter?.source;
        if (sourceFromFile) {
            sourceFromPlan = [String(sourceFromFile).replace(/["\[\]]/g, '')];
        }

        const taskRegex = /^- \*\*(.*?)\*\* \`\((.*?)\)\`\n\s+-\s*\*(.*?)\*/gm;
        const proposals = [...planContent.matchAll(taskRegex)];
        
        return { proposals, mainTopic, sourceFromPlan, planContent };
    }

    public async generateMathNotesFromPlan(planFilePath: string, progressCallback: (update: string) => void): Promise<string> {
        const startTime = Date.now();
        progressCallback("Reading the dynamic math plan file...");

        const planFile = this._getTargetFile(planFilePath);
        if (!planFile) return "Error: Could not find the specified plan file.";
        
        const planContent = await this.fileService.readFile(planFile);

        // Regex to parse our new plan format
        const entryRegex = /^\*\*(Title|Template|Equation):\*\* (.*?)\n/gm;
        
        let tasks = [];
        let currentTask: any = {};
        let lastSource = `[[${planFile.path}]]`; // Default source

        const lines = planContent.split('\n');

        for (const line of lines) {
            if (line.startsWith("### From: ")) {
                lastSource = line.match(/\[\[(.*?)\]\]/)?.[1] || lastSource;
            }
            if (line.startsWith("**Title:**")) {
                if (currentTask.title && currentTask.equation && currentTask.template) {
                    tasks.push(currentTask);
                }
                currentTask = { 
                    title: line.replace("**Title:**", "").trim(),
                    sourceNote: lastSource 
                };
            } else if (line.startsWith("**Template:**")) {
                currentTask.template = line.replace("**Template:**", "").trim();
            } else if (line.startsWith("**Equation:**")) {
                currentTask.equation = line.replace("**Equation:**", "").trim().replace(/`/g, "");
            } else if (line.startsWith("  > **Description:**")) {
                currentTask.description = line.replace("  > **Description:**", "").trim().replace(/\*/g, "");
            }
        }
        if (currentTask.title && currentTask.equation && currentTask.template) {
            tasks.push(currentTask);
        }

        if (tasks.length === 0) return "No equations found in the plan to process.";

        const model = this.genAI.getGenerativeModel({ model: this.settings.model, generationConfig: { temperature: 0.1 } });
        let generatedCount = 0;
        const failedNotes: string[] = [];

        for (const [index, task] of tasks.entries()) {
            const { title, equation, description, template, sourceNote } = task;
            
            if (!title || !equation || !template || !description) {
                console.warn("Skipping incomplete task in plan:", task);
                continue;
            }
            
            progressCallback(`[${index + 1}/${tasks.length}] Generating: ${title} (Template: ${template})...`);
            
            try {
                let prompt: string;
                let templateFileName: string;
                let dataForTemplate: Record<string, any> = {};
                const sourceArray = sourceNote ? [sourceNote.replace(/\.md$/, '')] : [];

                // --- THIS IS THE NEW DYNAMIC LOGIC ---
                if (template === 'Hybrid') {
                    // 1. Set up the "Hybrid" (Depth) path
                    prompt = createHybridMathNotePrompt(title, equation, description);
                    templateFileName = `Math Concept Depth Template.md`; // Use your "depth" template file

                    const result = await this.makeApiCallWithRetry(() => model.generateContent(prompt));
                    const rawResponse = result.response.text();


                    /*
                    // --- ADD THIS LOGGING BLOCK ---
                    if (title === "Negative to Positive Index Conversion") {
                        console.error("RAW AI RESPONSE (Hybrid) for 'Negative to Positive Index Conversion':", rawResponse);
                        await this.logActivity(`--- START RAW RESPONSE for ${title} ---\n${rawResponse}\n--- END RAW RESPONSE ---`);
                    }
                    // --- END LOGGING BLOCK ---
                    */



                    const jsonMatch = rawResponse.match(/```json\n([\s\S]*?)\n```/);
                    const jsonText = jsonMatch ? jsonMatch[1] : rawResponse.replace(/```/g, "").trim();
                    const explanation = JSON.parse(jsonText);

                    // Map the data. populateTemplate can handle nested objects.
                    dataForTemplate = {
                        ...explanation, // Pass the entire JSON response
                        title: title,
                        equation: equation,
                        tags_yaml: ['math', template.toLowerCase(), 'hybrid', ...(explanation.tags_keywords || [])],
                        source: sourceArray,
                        related: (explanation.related_links_for_yaml || [])
                    };

                } else if (template === 'Quick') {
                    // 2. Set up the "Quick" (Concept) path
                    prompt = createAtomicMathNotePrompt(title, equation, description);
                    templateFileName = `Math Concept Template.md`; // Use your "quick" template file

                    const result = await this.makeApiCallWithRetry(() => model.generateContent(prompt));
                    const rawResponse = result.response.text();

                    /* --- ADD THIS LOGGING BLOCK ---
                    if (title === "Negative to Positive Index Conversion") {
                        console.error("RAW AI RESPONSE (Quick) for 'Negative to Positive Index Conversion':", rawResponse);
                        await this.logActivity(`--- START RAW RESPONSE for ${title} ---\n${rawResponse}\n--- END RAW RESPONSE ---`);
                    }
                    // --- END LOGGING BLOCK ---
                    */



                    const jsonMatch = rawResponse.match(/```json\n([\s\S]*?)\n```/);
                    const jsonText = jsonMatch ? jsonMatch[1] : rawResponse.replace(/```/g, "").trim();
                    const explanation = JSON.parse(jsonText);

                    let codeSnippet = explanation.code_snippet || "";
                    if (codeSnippet.trim() !== "") {
                        codeSnippet = `\`\`\`python\n${codeSnippet}\n\`\`\``;
                    }

                    // Map the data for the "quick" template
                    dataForTemplate = {
                        title: title,
                        equation: equation,
                        why_goal: explanation.why_goal,
                        how_deconstructed_bullets: (explanation.how_deconstructed || []),
                        when_application_bullets: (explanation.when_application || []),
                        connections_ascii_map: (explanation.connections_ascii_map || ""),
                        connections_bullets: (explanation.connections_bullets || []),
                        code_snippet: codeSnippet,
                        tags_yaml: ['math', template.toLowerCase(), 'quick', ...(explanation.tags_keywords || [])],
                        source: sourceArray,
                        related: (explanation.related_links_for_yaml || [])
                    };
                } else {
                    new Notice(`Skipping "${title}": Unknown template "${template}" in plan.`);
                    continue;
                }
                // --- END OF DYNAMIC LOGIC ---

                const templateContent = await this.app.vault.adapter.read(
                    `${this.settings.templatesFolderPath}/${templateFileName}`
                );
                
                const finalContent = this.populateTemplate(templateContent, dataForTemplate);
                
                const noteFileName = `Math - ${title.replace(/[\\/:?*\"<>|]/g, "")}.md`;
                const noteFilePath = `${this.settings.draftsFolderPath}/${noteFileName}`;
                await this.fileService.createFile(noteFilePath, finalContent);
                generatedCount++;

            } catch (e) {
                console.error(`Failed to generate note for "${title}":`, e);
                new Notice(`Error generating note for "${title}". Check console.`);
                failedNotes.push(title);
            }
        }
        
        const durationInSeconds = ((Date.now() - startTime) / 1000).toFixed(1);
        let logMessage = `Generated ${generatedCount} of ${tasks.length} atomic math notes in ${durationInSeconds}s from plan "[[${planFilePath}]]".`;
        if (failedNotes.length > 0) {
            logMessage += `\n- **Failed to generate:**\n\t- ` + failedNotes.join('\n\t- ');
        }
        await this.logActivity(logMessage);

        let returnMessage = `Successfully generated ${generatedCount} of ${tasks.length} math notes in ${durationInSeconds} seconds!`;
        if (failedNotes.length > 0) {
            returnMessage += ` (${failedNotes.length} failed). Check log for details.`;
        }
        return returnMessage;
    }

    /**
     * Iterates through proposals, generating one note at a time.
     */
    private async _processProposals(proposals: RegExpMatchArray[], allProposalsContext: RegExpMatchArray[], mainTopic: string, sourceFromPlan: string[], progressCallback: (update: string) => void) {
        const results = [];

        // 1. NEW: Extract all planned titles upfront to create "Sibling Context"
        // We filter out Visual Analysis items from this list as they are usually images, not text concepts
        const allPlannedTitles = allProposalsContext.map(p => p[1]);

        for (const [index, proposal] of proposals.entries()) {
            const title = proposal[1];
            const type = proposal[2].trim();
            const context = proposal[3];

            const sanitizedTitle = title.replace(/[\\/:?*\"<>|]/g, "");
            const expectedFileName = `${sanitizedTitle}.md`;
            const expectedFilePath = `${this.settings.draftsFolderPath}/${expectedFileName}`;
            
            const existingFile = this.app.vault.getAbstractFileByPath(expectedFilePath);

            if (existingFile instanceof TFile) {
                // If it exists, skip it but count it as "Success" so the logs look clean
                progressCallback(`> Skipping "${title}": Note already exists.`);
                results.push({ 
                    success: true, 
                    link: `[[${expectedFilePath}|${title}]] (skipped)`, 
                    isStructural: false 
                });
                continue; // <--- This jumps to the next item in the loop immediately
            }

            // 2. NEW: Create a list of "siblings" (everyone except the current note)
            const siblingNotes = allPlannedTitles.filter(t => t !== title);

            // MODIFIED: Use blockquote markdown for a "command prompt" look
            progressCallback(`Processing [${index + 1}/${proposals.length}]: ${title}...`);

            if (type === 'Example Walkthrough') {
                try {
                    const result = await this.analyzeVisualsInNote(context, title);
                    new Notice(result, 7000); 
                    results.push({
                        success: true,
                        link: `[[${this.settings.draftsFolderPath}/${title}.md|${title}]]`, 
                        isStructural: false
                    });
                    // ADDED: Success message
                    progressCallback(`> Success. Analysis created for ${title}.`);
                } catch (e) {
                    console.error(`Failed to perform visual analysis for "${title}":`, e);
                    new Notice(`Error during visual analysis for ${title}. Check console.`);
                    results.push({ success: false, link: `[[${title}]] (failed)`, isStructural: false });
                    // ADDED: Error message
                    progressCallback(`> ERROR. Task failed for ${title}. See console.`);
                }
                continue; 
            }
            
            try {
                const templateContent = await this._findTemplate(type);
                if (!templateContent) {
                    new Notice(`Skipping "${title}": Template not found for type "${type}".`);
                    // ADDED: Skip message
                    progressCallback(`> SKIPPED. Template not found for type "${type}".`);
                    continue;
                }
                
                const aiJson = await this._generateNoteContentFromAI(type, context, templateContent, proposal, siblingNotes);
                const finalContent = this._prepareAndPopulateTemplate(aiJson, templateContent, title, sourceFromPlan, mainTopic, type);
                
                const noteFilePath = await this._createNoteFile(title, finalContent);

                const lowerCaseType = type.toLowerCase();
                results.push({
                    success: true,
                    link: `[[${noteFilePath}|${title}]]`,
                    isStructural: lowerCaseType === 'fundamental' || lowerCaseType === 'major_core'
                });
                // ADDED: Success message
                progressCallback(`> Success. Note created: ${title}`);

            } catch (e) {
                if (e instanceof z.ZodError) {
                    console.error(`Zod validation error for "${title}":`, e);
                    new Notice(`Error for "${title}": AI response missing data. Skipping.`);
                } else {
                    console.error(`Failed to generate note for "${title}":`, e);
                    new Notice(`Error generating note: ${title}. Check console.`);
                }
                results.push({ success: false, link: `[[${title}]] (failed)`, isStructural: false });
                // ADDED: Error message
                progressCallback(`> ERROR. Task failed for ${title}. See console.`);
            }
        }
        return results;
    }

    /**
     * Finds and reads the content of a template file based on note type.
     */
    private async _findTemplate(type: string): Promise<string | null> {
        const expectedTemplateName = `${type} Template.md`;
        const templatePath = `${this.settings.templatesFolderPath}/${expectedTemplateName}`;
        const templateFile = this.fileService.getAbstractFileByPath(templatePath);
        if (templateFile instanceof TFile) {
            return this.fileService.readFile(templateFile);
        }
        return null;
    }

    private createCheatsheetPrompt(context: string, placeholders: string[]): string {
        return `
        You are a technical documentation expert. Your goal is to create a high-density, practical Cheatsheet for the following topic:
        
        TOPIC / CONTEXT: "${context}"
        
        You must return a valid JSON object that matches the keys required by the user's template.
        
        REQUIRED JSON KEYS:
        ${placeholders.map(p => `- "${p}"`).join('\n')}
        
        INSTRUCTIONS:
        - "cheatsheet_content": This must be a valid Markdown string. It should be a structured list of commands, formulas, or facts. Use headers (###), code blocks, and tables to organize it effectively.
        - "tool": The name of the tool or subject (e.g., "Git", "Calculus").
        - "title": A descriptive title (e.g., "Git Commands", "Derivatives Rules").
        
        Do not include "analogy", "mechanism", or "tradeoffs". Just the raw reference material.
        `;
    }

    private fixControlCharacters(jsonString: string): string {
        // Regex explanation: Match anything inside double quotes, ignoring escaped quotes.
        return jsonString.replace(/"((?:[^"\\]|\\.)*)"/g, (match, content) => {
            // Replace literal newlines (byte 10) and tabs (byte 9) with escaped versions
            const sanitizedContent = content
                .replace(/\n/g, "\\n")
                .replace(/\r/g, "\\r")
                .replace(/\t/g, "\\t");
            return `"${sanitizedContent}"`;
        });
    }

    /**
     * Handles the AI call for generating the structured content of a single note.
     */
    private async _generateNoteContentFromAI(type: string, context: string, templateContent: string, proposal: RegExpMatchArray, siblingNotes: string[]): Promise<any> {
        const placeholders = this.extractPlaceholders(templateContent);
        // --- FIX START ---
        // 1. Check if the template wants the computed 'tags_yaml' field
        const needsYamlTags = placeholders.includes('tags_yaml');

        // 2. Filter out keys we don't send to AI directly
        const aiPlaceholders = placeholders.filter(p => !['title', 'source', 'tags_yaml'].includes(p.toLowerCase()));

        // 3. If 'tags_yaml' was requested, we MUST ask the AI for the raw ingredients
        if (needsYamlTags) {
            if (!aiPlaceholders.includes('tags_keywords')) aiPlaceholders.push('tags_keywords');
            if (!aiPlaceholders.includes('related_links_for_yaml')) aiPlaceholders.push('related_links_for_yaml');
        }
        
        const parent = null; 
        const children: string[] = []; 
        const vaultContext = await this._getVaultContext(); 

        // --- FIX START: Determine the prompt BEFORE the API call ---
        let dynamicPrompt: string;

        if (type.toLowerCase() === 'cheatsheet') {
            // Use the specialized prompt
            dynamicPrompt = this.createCheatsheetPrompt(context, aiPlaceholders);
        } else {
            // Use the standard prompt with ALL required arguments (no "...")
            dynamicPrompt = constructDynamicPrompt(
                context, 
                aiPlaceholders, 
                parent, 
                children, 
                vaultContext, 
                siblingNotes
            );
        }
        // --- FIX END ---

        const imageParts = await this._extractImagesFromContext(context);

        const noteTitle = proposal[1] || "Unknown Note";
        const debugEntry = `## Note: ${noteTitle} (${type})\n\n\`\`\`\n${dynamicPrompt}\n\`\`\`\n\n*Image Count: ${imageParts.length}*`;
        
        // Ensure you are using the 'adapter' version of _writeDebugLog I provided in the previous turn
        await this._writeDebugLog(NOTE_PROMPT_LOG_NAME, debugEntry, 'append');

        const safetySettings = [
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
        ];

        const model = this.genAI.getGenerativeModel({ 
            model: this.settings.model, 
            safetySettings: safetySettings, // <--- ADD THIS
            generationConfig: { 
                temperature: 0.05, 
                maxOutputTokens: 8192 
            } 
        });
        
        // Now send the CORRECT prompt to the AI
        const result = await this.makeApiCallWithRetry(() => model.generateContent([dynamicPrompt, ...imageParts]));
        const rawResponse = result.response.text();

        if (!rawResponse || rawResponse.trim() === "") {
            const msg = `Gemini returned an empty response for note "${proposal[1]}". This often happens if the prompt triggered a safety filter or the context was too large.`;
            console.error(msg);
            throw new Error(msg);
        }

        // Debug logging
        await this.logActivity(`RAW AI RESPONSE for ${type}:\n${rawResponse}`);
        console.log(`Raw AI JSON for ${type}:`, rawResponse);

        
        let jsonText = rawResponse;
        
        // 1. Try extracting from code block
        const jsonMatch = rawResponse.match(/```json\n([\s\S]*?)\n```/);
        if (jsonMatch && jsonMatch[1]) {
            jsonText = jsonMatch[1];
        } else {
            // 2. Fallback: Extract between { and }
            const firstBrace = rawResponse.indexOf('{');
            const lastBrace = rawResponse.lastIndexOf('}');
            if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
                jsonText = rawResponse.substring(firstBrace, lastBrace + 1);
            }
        }

        // 3. Safety Cleanup: Remove "json" prefix if present (Fixes 'Unexpected token j')
        jsonText = jsonText.trim().replace(/^json\s*/i, "");

        jsonText = this.fixControlCharacters(jsonText);

        const sanitizedJson = this.sanitizeJsonResponse(jsonText);

        try {
            const aiJson = JSON.parse(sanitizedJson);
            if (type.toLowerCase() === 'cheatsheet') {
                return cheatsheetSchema.parse(aiJson);
            }
            // This now uses the relaxed schema, so it won't crash if 'details' is missing
            return noteSchema.parse(aiJson);
        } catch (e) {
            console.error(`JSON Parse/Validation Error. Cleaned JSON: ${sanitizedJson}`);
            throw e;
        }
    }

    /**
     * Prepares the final data object and populates the template.
     */
    private _prepareAndPopulateTemplate(aiJson: any, templateContent: string, title: string, source: string[], mainTopic: string, type: string): string {
        aiJson.title = title;
        aiJson.source = source;
        aiJson.related = aiJson.related_links_for_yaml || [];
        
        const structuralTag = type.toLowerCase().replace(/\s+/g, '_');
        const keywordTags = aiJson.tags_keywords || [];
        aiJson.tags_yaml = [...new Set([structuralTag, mainTopic, ...keywordTags, 'concept'])];

        const codeSnippet = aiJson.details?.mechanism_code_snippet;
        if (codeSnippet && codeSnippet.trim() !== "") {
            // If the AI provided code, wrap it in a Python markdown block
            aiJson.details.mechanism_code_snippet = `\`\`\`python\n${codeSnippet}\n\`\`\``;
        } else {
            // Otherwise, ensure the value is an empty string so nothing is rendered
            if (aiJson.details) {
                aiJson.details.mechanism_code_snippet = "";
            }
        }

        return this.populateTemplate(templateContent, aiJson);
    }
    
    /**
     * Creates the final note file in the drafts folder.
     */
    private async _createNoteFile(title: string, content: string): Promise<string> {
        const sanitizedTitle = title.replace(/[\\/:?*\"<>|]/g, "");
        const noteFileName = `${sanitizedTitle}.md`;
        const noteFilePath = `${this.settings.draftsFolderPath}/${noteFileName}`;
        await this.fileService.createFile(noteFilePath, content);
        return noteFilePath;
    }

    /**
     * Appends new structural notes to the hierarchy map.
     */
    private async _appendToHierarchyMap(newStructuralNotes: string[]): Promise<void> {
        const mapFilePath = `${this.settings.draftsFolderPath}/${HIERARCHY_MAP_FILE_NAME}`;
        const mapFile = this.fileService.getAbstractFileByPath(mapFilePath);
        if (mapFile instanceof TFile) {
            await this.app.vault.append(mapFile, '\n' + newStructuralNotes.join('\n'));
            await this.logActivity(`Auto-updated Hierarchy Map with ${newStructuralNotes.length} new notes.`);
            new Notice("Hierarchy Map auto-updated!");
        }
    }

    public async runFullEnhancementWorkflow(progressCallback: (update: string) => void) {
        try {
            const draftsFolderPath = this.settings.draftsFolderPath;
            const plansFolderPath = this.settings.plansFolderPath;

            progressCallback("🚀 Starting Full Post-Processing Workflow...");
            
            // --- STEP 1: Sanitize Notes (Unchanged) ---
            progressCallback("Step 1/5: Sanitizing notes for cleanup...");
            await this.sanitizeDraftNotes(draftsFolderPath, (update) => {});
            progressCallback("✅ Notes sanitized.");

            // --- STEP 2: Attempt to create a Math Plan Draft ---
            progressCallback("Step 2/5: Checking for math content to plan...");
            const draftResult = await this.extractMechanismsForPlan(draftsFolderPath, (update) => {});

            if (draftResult.startsWith("Error:")) {
                progressCallback(`❌ Workflow stopped due to a critical error: ${draftResult}`);
                await this.logActivity(`ERROR: The Full Post-Processing Workflow failed at Step 2. Reason: ${draftResult}`);
                return;
            }

            if (draftResult.includes("No notes with mechanism sections found")) {
                progressCallback("ℹ️ No math mechanism sections found. Skipping math note generation.");
            } else {
                progressCallback("✅ Math Plan Draft created. Now generating the structured plan...");
                
                // --- STEP 3: Generate structured Math Plan from the draft ---
                progressCallback("Step 3/5: Generating structured Math Plan from the draft...");
                const latestDraft = await this.fileService.findLatestFile(plansFolderPath, "Math Draft");

                if (!latestDraft) {
                    progressCallback("⚠️ Could not find the Math Draft file. Skipping math note generation.");
                } else {
                    const planResult = await this.createMathPlanFromDraft(latestDraft.path, (update) => {});
                    
                    if (planResult.startsWith("Error:") || planResult.includes("No valid equations")) {
                        progressCallback(`ℹ️ ${planResult} No equations to process. Skipping math note generation.`);
                    } else {
                        progressCallback("✅ Structured Math Plan created.");
                        
                        // --- STEP 4: Generate atomic notes from the new plan ---
                        progressCallback("Step 4/5: Generating Atomic Math Notes from the new plan...");

                        // FIX IS HERE: The 'latestPlan' variable is now correctly defined before being used.
                        const latestPlan = await this.fileService.findLatestFile(plansFolderPath, "Math Plan");
                        if (!latestPlan) {
                            progressCallback("⚠️ Could not find the new Math Plan file. Skipping atomic math note generation.");
                        } else {
                            const notesResult = await this.generateMathNotesFromPlan(latestPlan.path, (update) => {});
                            progressCallback(`✅ Atomic Math Notes generation finished. ${notesResult}`);
                        }
                    }
                }
            }

            // --- STEP 5: Generate Code Labs ---
            progressCallback("Step 5/5: Generating Code Lab notes...");
            const codeLabResult = await this.generateCodeLabNotes(draftsFolderPath, (update) => {});
            progressCallback(`✅ Code Lab generation finished. ${codeLabResult}`);

            progressCallback("🎉 Workflow Complete! All tasks finished successfully.");
            await this.logActivity("Successfully completed the Full Post-Processing Workflow.");

        } catch (e) {
            console.error("Full workflow failed:", e);
            progressCallback(`❌ CRITICAL ERROR: The workflow failed. Check the console for details. Reason: ${e.message}`);
            await this.logActivity(`ERROR: The Full Post-Processing Workflow failed. Reason: ${e.message}`);
        }
    }


    // No changes to reviewAnswersInPlan
    async reviewAnswersInPlan(fileToUpdate: TFile): Promise<string> {
        // 1. Read the full content of the file.
        const fullContent = await this.fileService.readFile(fileToUpdate);

        // 2. Scan for our "digital breadcrumb" to see if this is a follow-up review.
        const breadcrumbRegex = /<!-- gemini-context: (.*?) -->/g;
        const matches = [...fullContent.matchAll(breadcrumbRegex)];

        let contentForReview: string;

        if (matches.length === 0) {
            contentForReview = fullContent;
        } else {
            const lastMatch = matches[matches.length - 1];
            const lastKeywords = lastMatch[1].trim();
            const lastMatchEndIndex = lastMatch.index + lastMatch[0].length;

            const questionsRegex = /### Provocative Questions([\s\S]*?)---/m;
            const questionsMatch = fullContent.match(questionsRegex);
            const questionsText = questionsMatch ? questionsMatch[0] : "";

            const newAnswerText = fullContent.substring(lastMatchEndIndex).trim();
            
            contentForReview = `This is a follow-up review. Here is a summary of your last feedback, the original questions, and the user's new answer. Focus your new feedback only on the user's new answer in light of the previous context.

    ### Summary of Your Last Feedback:
    ${lastKeywords}

    ---
    ${questionsText}

    ---
    ### User's New Answer:
    ${newAnswerText}`;
        }

        const reviewPrompt = createAnswerReviewPrompt(contentForReview);
        const reviewModel = this.genAI.getGenerativeModel({
            model: this.settings.model,
            generationConfig: { temperature: 0.4 },
        });
        const reviewResult = await this.makeApiCallWithRetry(() => reviewModel.generateContent(reviewPrompt));
        const feedbackText = reviewResult.response.text();

        const keywordPrompt = createKeywordExtractionPrompt(feedbackText);
        const keywordModel = this.genAI.getGenerativeModel({
            model: this.settings.model,
            generationConfig: { temperature: 0.0 },
        });
        const keywordResult = await this.makeApiCallWithRetry(() => keywordModel.generateContent(keywordPrompt));
        const keywordText = keywordResult.response.text().trim();

        const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
        const contentToAppend = `\n\n---\n### Feedback on Your Synthesis (${timestamp})\n\n${feedbackText}\n<!-- gemini-context: ${keywordText} -->`;
        
        await this.fileService.modifyFile(fileToUpdate, fullContent + contentToAppend);

        const logMessage = `Appended synthesis feedback to "[[${fileToUpdate.path}|${fileToUpdate.basename}]]".`;
        await this.logActivity(logMessage);

        return `Feedback has been successfully added to your note!`;
    }

    private sanitizeJsonResponse(jsonText: string): string {
        // This is a robust, multi-pass sanitization strategy that is safer than a single regex.

        // Step 1: Temporarily replace all VALID JSON escape sequences with unique, non-colliding placeholders.
        // This "protects" them from the next, more aggressive step. The order is important: `\\` must be first.
        let sanitized = jsonText
            .replace(/\\\\/g, '__PROTECTED_DOUBLE_SLASH__')
            .replace(/\\"/g, '__PROTECTED_QUOTE__')
            .replace(/\\n/g, '__PROTECTED_NEWLINE__')
            .replace(/\\r/g, '__PROTECTED_CARRIAGE_RETURN__')
            .replace(/\\t/g, '__PROTECTED_TAB__')
            .replace(/\\b/g, '__PROTECTED_BACKSPACE__')
            .replace(/\\f/g, '__PROTECTED_FORM_FEED__')
            .replace(/\\\//g, '__PROTECTED_SLASH__');

        // Step 2: Now, any single backslash that remains is, by definition, an invalid one
        // that needs to be escaped (e.g., from a LaTeX command like `\lambda`).
        // We can now safely replace all remaining single backslashes with double backslashes.
        sanitized = sanitized.replace(/\\/g, '\\\\');

        // Step 3: Restore the original, valid escape sequences from their placeholders.
        sanitized = sanitized
            .replace(/__PROTECTED_DOUBLE_SLASH__/g, '\\\\')
            .replace(/__PROTECTED_QUOTE__/g, '\\"')
            .replace(/__PROTECTED_NEWLINE__/g, '\\n')
            .replace(/__PROTECTED_CARRIAGE_RETURN__/g, '\\r')
            .replace(/__PROTECTED_TAB__/g, '\\t')
            .replace(/__PROTECTED_BACKSPACE__/g, '\\b')
            .replace(/__PROTECTED_FORM_FEED__/g, '\\f')
            .replace(/__PROTECTED_SLASH__/g, '\\/');

        return sanitized;
    }

    /*
    private fixTruncatedJson(json: string): string {
        let inString = false;
        let escaped = false;
        const stack: string[] = [];

        for (let i = 0; i < json.length; i++) {
            const char = json[i];
            if (escaped) { escaped = false; continue; }
            if (char === '\\') { escaped = true; continue; }
            if (char === '"') { inString = !inString; continue; }
            if (inString) continue;

            if (char === '{') stack.push('}');
            else if (char === '[') stack.push(']');
            else if (char === '}' || char === ']') {
                if (stack.length > 0 && stack[stack.length - 1] === char) stack.pop();
            }
        }
        return json + stack.reverse().join('');
    }*/

    private async makeApiCallWithRetry(apiCall: () => Promise<any>, maxRetries = 3, initialDelay = 2000) {
        let retries = 0;
        let delay = initialDelay;

        const isOverload = (e: any) =>
            e?.status === 503 ||
            e?.statusCode === 503 ||
            // common SDK shapes: e.response?.status
            e?.response?.status === 503 ||
            (typeof e?.message === 'string' && /503|Service Unavailable/i.test(e.message));

        while (true) {
            try {
            return await apiCall();
            } catch (error: any) {
            // If not an overload-ish error, rethrow immediately
            if (!isOverload(error)) {
                throw error;
            }

            retries++;
            if (retries > maxRetries) {
                // exhausted attempts
                console.error(`API overloaded and max retries reached (${maxRetries}). Throwing error.`);
                throw error;
            }

            // Exponential backoff with jitter: wait = delay * (1 + random(0..0.5))
            const jitterFactor = 0.5 * Math.random();
            const waitMs = Math.round(delay * (1 + jitterFactor));

            console.warn(
                `Gemini API overloaded. Retrying in ${Math.round(waitMs / 1000)}s... (Attempt ${retries}/${maxRetries})`
            );

            await new Promise((resolve) => setTimeout(resolve, waitMs));

            // increase base delay for next retry
            delay *= 2;
            // loop continues to retry
            }
        }
    }

    public async resumeFailedNotes(progressCallback: (update: string) => void): Promise<string> {
        const logFilePath = `${this.settings.draftsFolderPath}/${LOG_FILE_NAME}`;
        const logFile = this.fileService.getAbstractFileByPath(logFilePath);

        if (!(logFile instanceof TFile)) {
            return "Error: Log file not found. Cannot resume.";
        }

        progressCallback("Reading log file to find last failure...");
        const logContent = await this.fileService.readFile(logFile);

        // 1. Split log into entries.
        // Since logs are in reverse chronology (newest at top), 
        // we split by the standard bullet point start "\n- ".
        // The first element [0] might be the Header, subsequent elements are log entries.
        const entries = logContent.split(/\n- (?=\d{2}\/)/);
        
        // 2. Search FORWARDS (0 -> length) to find the FIRST entry (Newest) with "**Failed:**"
        let lastFailedEntry = "";
        let planPath = "";
        
        for (const entry of entries) {
            if (entry.includes("**Failed:**")) {
                lastFailedEntry = entry;
                break; // Stop at the first match (the most recent failure)
            }
        }

        if (!lastFailedEntry) {
            return "No failed sessions found in the log.";
        }

        // 3. Extract the Plan File Path
        // Looks for: from plan "[[Folder/File.md]]"
        const planMatch = lastFailedEntry.match(/from plan "\[\[(.*?)\]\]"/);
        if (planMatch && planMatch[1]) {
            // If the path has a pipe (aliased), take the first part
            planPath = planMatch[1].split('|')[0]; 
        } else {
            return "Error: Found a failed session, but couldn't identify the source Plan file.";
        }

        // 4. Extract the Failed Note Titles
        // Looks for wikilinks under the **Failed:** section
        const failedSectionParts = lastFailedEntry.split("**Failed:**");
        if (failedSectionParts.length < 2) {
             return "Error: Found 'Failed' block but structure was malformed.";
        }
        const failedSection = failedSectionParts[1];
        
        // Match all [[Title]] or [[Title|Display]]
        const failedLinks = [...failedSection.matchAll(/\[\[(.*?)(?:\|.*?)?\]\]/g)];
        
        if (failedLinks.length === 0) {
            return "Error: Found 'Failed' section but could not parse any note titles.";
        }

        // Clean up titles (remove alias if present)
        const failedTitles = new Set(failedLinks.map(m => m[1]));

        progressCallback(`Found ${failedTitles.size} failed notes from most recent fail in plan: "${planPath}".`);

        // 5. Load the Original Plan
        let proposals: RegExpMatchArray[];
        let mainTopic: string;
        let sourceFromPlan: string[];

        try {
            // Reuse your existing parse method
            const planData = await this._parsePlanFile(planPath);
            proposals = planData.proposals;
            mainTopic = planData.mainTopic; // Ensure this casing matches your return type from _parsePlanFile
            sourceFromPlan = planData.sourceFromPlan;
        } catch (e) {
            return `Error: Could not load original plan file at "${planPath}". It may have been moved or deleted.`;
        }

        // 6. Filter Proposals to ONLY match the failed titles
        // The proposal format is [full_match, title, type, context]
        const notesToRetry = proposals.filter(p => failedTitles.has(p[1]));

        if (notesToRetry.length === 0) {
            return `Error: The failed notes listed in the log (${Array.from(failedTitles).join(', ')}) were not found in the plan file. Titles might not match exactly.`;
        }

        progressCallback(`Resuming generation for ${notesToRetry.length} notes...`);

        // 7. Re-run generation logic
        const generationResults = await this._processProposals(notesToRetry, proposals, mainTopic, sourceFromPlan, progressCallback);

        // 8. Update Hierarchy Map if needed
        const newStructuralNotes = generationResults.filter(r => r.isStructural).map(r => r.link);
        if (newStructuralNotes.length > 0) {
            await this._appendToHierarchyMap(newStructuralNotes);
        }

        // 9. Log Result
        const successfulNotes = generationResults.filter(r => r.success);
        const failedAgain = generationResults.filter(r => !r.success);

        let logMessage = `Resumed ${successfulNotes.length} of ${notesToRetry.length} failed notes from plan "[[${planPath}]]".`;
        if (successfulNotes.length > 0) logMessage += `\n- **Success:**` + successfulNotes.map(r => `\n\t- ${r.link}`).join("");
        if (failedAgain.length > 0) logMessage += `\n- **Still Failed:**` + failedAgain.map(r => `\n\t- ${r.link}`).join("");

        await this.logActivity(logMessage); 

        return `Resume complete. Generated ${successfulNotes.length} notes. Check logs for details.`;
    }

        // ---------------------------------------------------------------------
        // ABSORPTION NOTE HELPERS
        // ---------------------------------------------------------------------

        private getTierForFile(file: TFile): 'tier1' | 'tier2' | 'tier3' | null {
            const cache = this.app.metadataCache.getFileCache(file);
            const rawTags = cache?.frontmatter?.tags;

            let tags: string[] = [];
            if (Array.isArray(rawTags)) {
                tags = rawTags;
            } else if (typeof rawTags === 'string') {
                tags = [rawTags];
            }

            const lower = tags.map(t => t.toLowerCase());

            if (lower.includes('tier1') || lower.includes('tier-1')) return 'tier1';
            if (lower.includes('tier2') || lower.includes('tier-2')) return 'tier2';
            if (lower.includes('tier3') || lower.includes('tier-3')) return 'tier3';

            return null;
        }

        private getOffsetsForTier(tier: 'tier1' | 'tier2' | 'tier3') {
            if (tier === 'tier1') {
                return [
                    { label: "Day 1",  offset: 1 },
                    { label: "Day 3",  offset: 3 },
                    { label: "Day 7",  offset: 7 },
                    { label: "Day 14", offset: 14 },
                    { label: "Day 30", offset: 30 },
                    { label: "Day 90", offset: 90 },
                    { label: "Day 180", offset: 180 }
                ];
            }

            if (tier === 'tier2') {
                return [
                    { label: "Day 3", offset: 3 },
                    { label: "Day 14", offset: 14 },
                    { label: "Day 30", offset: 30 },
                    { label: "Day 90", offset: 90 }
                ];
            }

            // Tier 3 (light)
            return [
                { label: "Day 7", offset: 7 },
                { label: "Day 30", offset: 30 }
            ];
        }

        private buildReviewLines(
            entries: { label: string; offset: number }[]
        ): string {
            const today = new Date();
            const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

            return entries
                .map(({ label, offset }) => {
                    const date = new Date(today.getTime());
                    date.setDate(date.getDate() + offset);

                    const iso = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

                    return `- [ ] **${label}** - [[${iso}]]`;
                })
                .join("\n");
        }

        private buildAbsorptionNoteContent(
            originalLinkName: string
        ): string {
            return `> Note - [[${originalLinkName}]]

---

## 1. Purpose Question  
**Why does this exist?**
→ *answer*

---

## 2. One-Sentence Hook  
**What is the ONE mental anchor for this concept, If I could only remember ONE sentence from this note, what would it be?**  
→ *Scribble*

---

## 3. Teach the Concept 
**Write out a full explanation of the concept as if teaching it to a student with no prior knowledge of the subject, such as a child.**  
→ *Let's do this!*

---

## 4. Identify Gaps and Weak Points
**During the explanation process, pay close attention to any point where the explanation becomes fuzzy, where complex terminology is used as a crutch, or where the logical flow breaks down. These moments of struggle are invaluable, as they precisely identify the boundaries of one's current understanding—the knowledge gaps.**  
→ *link to any concept, analogy, or prior pattern your brain recalls*

---

## 5. Mini-Spaced Repetition  

(no scheduled reviews)

---
`;
    }

            // ---------------------------------------------------------------------
            // PUBLIC: CREATE ABSORPTION NOTES FROM A SELECTION OF LINKS
            // ---------------------------------------------------------------------
            async createAbsorptionNotesFromSelection(
                selection: string,
                contextPath: string | null
            ): Promise<string> {
                const linkRegex = /\[\[([^\]]+)\]\]/g;
                const seen = new Set<string>();

                let created = 0;
                let skippedExisting = 0;
                let unresolved = 0;

                const absorptionFolder = '00 Absorption';

                let match: RegExpExecArray | null;
                while ((match = linkRegex.exec(selection)) !== null) {
                    let linkText = match[1]; // "Cloud - What is Cloud Computing" or "Note|Alias"
                    if (!linkText) continue;

                    const pipeIndex = linkText.indexOf('|');
                    if (pipeIndex !== -1) {
                        linkText = linkText.substring(0, pipeIndex);
                    }

                    linkText = linkText.trim();
                    if (!linkText || seen.has(linkText)) continue;
                    seen.add(linkText);

                    const sourceFile = this.app.metadataCache.getFirstLinkpathDest(
                        linkText,
                        contextPath ?? ''
                    );

                    if (!sourceFile || !(sourceFile instanceof TFile)) {
                        unresolved++;
                        continue;
                    }

                    const baseTitle = sourceFile.basename;
                    const absorptionFileName = `${baseTitle} - Absorption.md`;
                    const absorptionPath = `${absorptionFolder}/${absorptionFileName}`;

                    const existing = this.fileService.getAbstractFileByPath(absorptionPath);
                    if (existing instanceof TFile) {
                        skippedExisting++;
                        continue;
                    }

                    await this.fileService.createFolder(absorptionFolder);

                    const content = this.buildAbsorptionNoteContent(linkText);
                    await this.fileService.createFile(absorptionPath, content);
                    created++;
                }

                return `Absorption: created ${created} note(s), skipped ${skippedExisting} existing, unresolved links: ${unresolved}.`;
            }

            async applyTierToAbsorptionNote(
                file: TFile,
                tier: 'tier1' | 'tier2' | 'tier3'
            ): Promise<string> {
                const offsets = this.getOffsetsForTier(tier);
                const reviewLines = this.buildReviewLines(offsets);

                const content = await this.app.vault.read(file);

                // Try to replace the existing "Mini-Spaced Repetition" section
                const sectionRegex = /(## 5\. Mini-Spaced Repetition[^\n]*\n)([\s\S]*?)(\n---)/m;

                let updated: string;
                if (sectionRegex.test(content)) {
                    updated = content.replace(
                        sectionRegex,
                        `$1*Mark the checkboxes during quick reviews — Only recall **the hook**. Not the entire note.*\n\n${reviewLines}\n$3`
                    );
                } else {
                    // If the heading isn't found, just append a new section
                    updated = content.trimEnd() + `

            ---

            ## 5. Mini-Spaced Repetition 

            ${reviewLines}

            ---
            `;
                }

                await this.app.vault.modify(file, updated);

                return `Applied ${tier} schedule to "${file.basename}".`;
            }

            // Open the absorption note for a given source note in a side split
            async openAbsorptionForSource(sourceFile: TFile, options?: { focus?: boolean }): Promise<string> {
                const focus = options?.focus ?? true;
                const absorptionFolder = '00 Absorption';
                const baseTitle = sourceFile.basename;
                const absorptionFilename = `${baseTitle} - Absorption.md`;
                const absorptionPath = `${absorptionFolder}/${absorptionFilename}`;

                // resolve file (use your FileService)
                const absAbstract = this.fileService.getAbstractFileByPath(absorptionPath);
                const looksLikeTFile = (x: any): x is TFile => !!x && typeof x.path === 'string';
                if (!looksLikeTFile(absAbstract)) {
                    return `No absorption note found for "${baseTitle}". Expected at: ${absorptionPath}`;
                }
                const absFile = absAbstract as TFile;

                // remember current active leaf to restore focus if requested
                const currentLeaf = this.app.workspace.getLeaf(false);

                try {
                    // 1) Try to find any leaf that shows an absorption file (any file under 00 Absorption/)
                    const leaves = this.app.workspace.getLeavesOfType("markdown");
                    const existingAbsLeaf = leaves.find(l => {
                        const lf = (l.view as any)?.file as TFile | null;
                        return lf?.path?.startsWith(`${absorptionFolder}/`);
                    });

                    if (existingAbsLeaf) {
                        // reuse it — open the new absorption file in that pane (replaces old content)
                        await existingAbsLeaf.openFile(absFile);
                        if (focus) {
                            this.app.workspace.setActiveLeaf(existingAbsLeaf);
                        } else if (currentLeaf) {
                            this.app.workspace.setActiveLeaf(currentLeaf);
                        }
                        return `Opened absorption note in existing absorption pane: ${absFile.path}`;
                    }

                    // 2) No absorption pane open — create a split and open there
                    const newLeaf = (this.app.workspace.splitActiveLeaf && this.app.workspace.splitActiveLeaf()) || null;
                    if (!newLeaf) {
                        return `Could not create split leaf to open absorption note: ${absFile.path}`;
                    }

                    await newLeaf.openFile(absFile);
                    if (focus) {
                        this.app.workspace.setActiveLeaf(newLeaf);
                    } else if (currentLeaf) {
                        this.app.workspace.setActiveLeaf(currentLeaf);
                    }
                    return `Opened absorption note in new split: ${absFile.path}`;

                } catch (err: any) {
                    console.error('openAbsorptionForSource error', err);
                    return `Failed to open absorption note: ${err?.message ?? err}`;
                }
            }

}