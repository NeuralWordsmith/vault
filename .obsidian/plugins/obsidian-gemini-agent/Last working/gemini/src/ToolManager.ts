import { App, Notice, TFile, TFolder } from 'obsidian';
import { FileService } from './FileService';
import { z } from 'zod';
import { 
    createSegmentationPrompt,
    createNotePlanPrompt, 
    // generateNoteContentPrompt, // DEPRECATED: We will build prompts dynamically now
    createCategorizationPrompt,
    createAnalysisPrompt,
    createAnswerReviewPrompt, 
    createKeywordExtractionPrompt,
    createTemplateMatchingPrompt,
    createTemplateDraftPrompt,
    createMathExplanationPrompt,
    createVisualAnalysisPrompt,
    createMathContextPrompt,
    createAtomicMathNotePrompt,
    createCodeLabPrompt,
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
});

const connectionsSchema = z.object({
    parent: z.string().optional(),
    children: z.array(z.string()).optional(),
    related: z.array(z.string()).optional(),
    other_fundamentals: z.array(z.string()).optional()
});

// The final, complete schema for AI response validation
const noteSchema = z.object({
    concept_name: z.string().min(1, "concept_name is required."),
    summary: summarySchema,
    fundamental: fundamentalSchema.optional(),
    details: detailsSchema,
    connections: connectionsSchema,
    questions: z.array(z.string()).optional(),
    tags_keywords: z.array(z.string()).describe("Array of 3-5 lowercase, snake_case technical keywords."),
    related_links_for_yaml: z.array(z.string()).describe("Array of 10-15 wikilinks for the YAML frontmatter.")
});

// We can define constants here for clarity
const LOG_FILE_NAME = "_Gemini Logs.md";
const HIERARCHY_MAP_FILE_NAME = "_Gemini Hierarchy Map.md";

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
        const imageNames = [...blockContent.matchAll(/!\[\[(.*?)\]\]/g)].map(m => m[1]);

        if (imageNames.length === 0) {
            return "Error: No image links found in the provided content block.";
        }

        // Use the title from the plan if provided, otherwise generate a fallback.
        const analysisTitle = plannedTitle || (imageNames.length === 1
            ? `Visual Analysis of ${imageNames[0]}`
            : `Analysis of Visual Sequence`);

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
            
            if (imageParts.length === 0) {
                return "Error: Could not read any of the linked images."
            }
            
            const promptText = createVisualAnalysisPrompt(blockContent, imageParts.length);
            const model = this.genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
            const result = await this.makeApiCallWithRetry(() => model.generateContent([promptText, ...imageParts]));
            
            const rawResponse = result.response.text();
            const jsonText = rawResponse.match(/```json\n([\s\S]*?)\n```/)?.[1] || rawResponse.replace(/```/g, "").trim();
            const aiJson = JSON.parse(jsonText);

            const templateContent = await this.app.vault.adapter.read(
                `${this.settings.templatesFolderPath}/Visual Analysis Template.md`
            );
            
            const dataForTemplate = {
                ...aiJson,
                analysis_title: analysisTitle,
                source_images_list: "\n" + imageNames.map(name => `  - "[[${name}]]"`).join("\n"),
                source_images_embeds: imageNames.map(name => `![[${name}]]`).join("\n"),
                analysis_date: new Date().toISOString().slice(0, 10)
            };
            
            const finalContent = this.populateTemplate(templateContent, dataForTemplate);
            
            const analysisFileName = `${analysisTitle.replace(/[\\/:?*\"<>|]/g, "")}.md`;
            const analysisFilePath = `${this.settings.draftsFolderPath}/${analysisFileName}`;
            await this.fileService.createFile(analysisFilePath, finalContent);

            return `Analysis created successfully at: [[${analysisFilePath}]]`;

        } catch (e) {
            console.error("Error analyzing visual sequence:", e);
            return "Sorry, an error occurred during analysis. Check the console.";
        }
    }
    
    public async createNotePlan(targetFilePath: string | null, progressCallback: (update: string) => void): Promise<string> {
        try {
            // === STEP 1: SETUP ===
            progressCallback("Reading source file...");
            const targetFile = this._getTargetFile(targetFilePath);
            if (!targetFile) return "Error: Could not determine the target file.";

            const { rawContent, extractedSource } = await this._extractNoteContent(targetFile);
            if (!rawContent) return "Error: Could not find a '# Source' heading in the active file.";

            const vaultContext = await this._getVaultContext();
            
            // === PHASE 1: SEGMENT ===
            progressCallback("Phase 1/3: Segmenting text into atomic chunks...");
            
            // --- MODIFICATION: Model is no longer created here ---
            const segmentationJson = await this._fetchAndParseSegments(rawContent); // <-- `model` removed
            const chunks: string[] = segmentationJson.segmentation_chunks;
            
            progressCallback(`Phase 1 Complete. Found ${chunks.length} logical concepts to process.`);

            // === PHASE 2: CATEGORIZE (THE LOOP) ===
            progressCallback("Phase 2/3: Categorizing all chunks...");
            const allChecklistNotes: any[] = [];
            const allNoteTitles: string[] = [];

            for (const [index, chunk] of chunks.entries()) {
                progressCallback(`[${index + 1}/${chunks.length}] Categorizing: ${chunk.substring(0, 40)}...`);
                
                const noteItem = await this._fetchAndParseCategorization(chunk, "TEMP_TOPIC", vaultContext); // <-- `model` removed
                allChecklistNotes.push(noteItem);
                allNoteTitles.push(noteItem.title);
            }
            progressCallback(`Phase 2 Complete. All chunks categorized.`);

            // === PHASE 3: ANALYZE ===
            progressCallback("Phase 3/3: Generating high-level analysis...");
            const analysisJson = await this._fetchAndParseAnalysis(rawContent, allNoteTitles, vaultContext); // <-- `model` removed
            
            // --- Post-processing: Fix mainTopic ---
            const mainTopic = analysisJson.plan_details.main_topic;
            allChecklistNotes.forEach(note => {
                if (!note.title.startsWith("Fundamental -")) {
                     note.title = note.title.replace("TEMP_TOPIC -", `${mainTopic} -`);
                }
            });

            progressCallback(`Phase 3 Complete. Analysis finished.`);
            
            // === STEP 4: TEMPLATE & ASSEMBLY ===
            // (This section is unchanged)
            progressCallback("Assembling the final plan file...");
            const finalPlanData = {
                ...analysisJson, // Contains high-level analysis
                checklist_notes: allChecklistNotes // Contains atomic notes
            };
            const { templateDraftNotification } = await this._matchOrCreateTemplate(finalPlanData, rawContent);
            const finalPlanContent = this._assemblePlanContent(finalPlanData, extractedSource, templateDraftNotification);
            const planFilePath = await this._createPlanFile(finalPlanData, finalPlanContent);
            
            // === STEP 5: LOG AND REPORT ===
            // (This section is unchanged)
            const logMessage = `Created note plan for "[[${targetFile.path}|${targetFile.basename}]]". AI suggested type: ${finalPlanData.note_identity?.suggested_type}. New plan is at "[[${planFilePath}]]".`;
            await this.logActivity(logMessage);
            let successMessage = `Plan created successfully with ${allChecklistNotes.length} atomic notes! Find it at: [[${planFilePath}]]`;
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
    * Retrieves the target TFile object from a given path.
    */
    private _getTargetFile(filePath: string | null): TFile | null {
        if (!filePath) return null;
        const file = this.app.vault.getAbstractFileByPath(filePath);
        return file instanceof TFile ? file : null;
    }

    /**
     * Reads a file and extracts the raw content from under the "# Source" heading.
     * This new logic replaces the search for a 'gemini-note' block.
     */
    private async _extractNoteContent(targetFile: TFile): Promise<{ rawContent: string | null, extractedSource: string }> {
        const fullContent = await this.fileService.readFile(targetFile);

        // This regex looks for a heading "# Source" and captures everything
        // after it until it hits another "# " heading or a horizontal rule "---".
        const sourceBlockRegex = /^#\s*Source\s*\n([\s\S]*?)(?=\n(^# |^---)|$)/m;
        const sourceBlockMatch = fullContent.match(sourceBlockRegex);
        
        // This is the content for the AI to plan from
        let rawContent = sourceBlockMatch ? sourceBlockMatch[1].trim() : null;

        if (!rawContent || !rawContent.trim()) {
            return { rawContent: null, extractedSource: '' };
        }

        // We can still try to find a 'source' key in the extracted block,
        // but it's less critical now. You could also just set this to a default.
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
     * Reads the knowledge hierarchy map to provide vault context to the AI.
     */
    private async _getVaultContext(): Promise<string> {
        const mapFilePath = `${this.settings.draftsFolderPath}/${HIERARCHY_MAP_FILE_NAME}`;
        const mapFile = this.fileService.getAbstractFileByPath(mapFilePath);
        if (mapFile instanceof TFile) {
            return this.fileService.readFile(mapFile);
        }
        return '';
    }

    /**
     * Calls the Gemini API with the note content and context, and parses the JSON response.
     */
    private async _fetchAndParsePlanFromAI(rawContent: string, vaultContext: string): Promise<any> {
        const model = this.genAI.getGenerativeModel({
            model: this.settings.model,
            generationConfig: { temperature: 0.0 },
        });
        const prompt = createNotePlanPrompt(rawContent, vaultContext);
        const result = await this.makeApiCallWithRetry(() => model.generateContent(prompt));
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
     * PHASE 1: Calls the Gemini API to segment the text.
     */
    private async _fetchAndParseSegments(rawContent: string, maxRetries = 3): Promise<any> {
        
        // We create a model object *here* with a high token limit
        const model = this.genAI.getGenerativeModel({
            model: this.settings.model,
            generationConfig: { 
                temperature: 0.0,
                maxOutputTokens: 8192 // Give it "more paper"
            },
        });
        
        const prompt = createSegmentationPrompt(rawContent);

        let retries = 0;
        let lastError: any = null;

        while (retries < maxRetries) {
            let rawResponse = "";
            try {
                // Step 1: Make the API call
                const result = await this.makeApiCallWithRetry(() => model.generateContent(prompt));
                rawResponse = result.response.text();

                await this.logActivity(`--- AI RESPONSE (Segmenter) ---\n${rawResponse}\n--- END RESPONSE ---`);

                // Step 2: Robust JSON parsing
                let jsonText = "";
                const jsonMatch = rawResponse.match(/```json\s*([\s\S]*?)\s*```/);

                if (jsonMatch && jsonMatch[1]) {
                    jsonText = jsonMatch[1].trim();
                } else {
                    const startIndex = rawResponse.indexOf('{');
                    const endIndex = rawResponse.lastIndexOf('}');
                    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
                        jsonText = rawResponse.substring(startIndex, endIndex + 1).trim();
                    } else {
                        throw new Error("No valid JSON object found in response text.");
                    }
                }

                if (!jsonText) throw new Error("Extracted JSON text is empty.");
                
                // Step 3: Success!
                return JSON.parse(jsonText);

            } catch (parseError) {
                // Step 4: Parse error
                console.warn(`Failed to parse JSON (Segmenter) on attempt ${retries + 1}/${maxRetries}. Retrying...`, parseError);
                console.log("--- START OF MALFORMED RESPONSE (SEGMENTER) ---");
                console.log(rawResponse);
                console.log("--- END OF MALFORMED RESPONSE (SEGMENTER) ---");
                
                lastError = parseError;
                retries++;
                if (retries < maxRetries) {
                    await new Promise(resolve => setTimeout(resolve, 2000 * retries));
                }
            }
        }
        // Step 5: All retries failed.
        console.error("Failed to parse JSON from Gemini (Segmenter) after all retries:", lastError);
        throw new Error("The AI returned an invalid response for the segmentation phase.");
    }


    /**
     * PHASE 3: Calls the Gemini API to generate high-level analysis.
     */
    private async _fetchAndParseAnalysis(rawContent: string, noteTitles: string[], vaultContext: string, maxRetries = 3): Promise<any> {
        
        // Create a model with standard settings for this task
        const model = this.genAI.getGenerativeModel({
            model: this.settings.model,
            generationConfig: { 
                temperature: 0.1 // A little creativity is fine here
            },
        });
        
        const prompt = createAnalysisPrompt(rawContent, noteTitles, vaultContext);
        
        let retries = 0;
        let lastError: any = null;

        while (retries < maxRetries) {
            let rawResponse = "";
            try {
                // Step 1: Make the API call
                const result = await this.makeApiCallWithRetry(() => model.generateContent(prompt));
                rawResponse = result.response.text();

                await this.logActivity(`--- AI RESPONSE (Analyzer) ---\n${rawResponse}\n--- END RESPONSE ---`);

                // Step 2: Robust JSON parsing
                let jsonText = "";
                const jsonMatch = rawResponse.match(/```json\s*([\s\S]*?)\s*```/);

                if (jsonMatch && jsonMatch[1]) {
                    jsonText = jsonMatch[1].trim();
                } else {
                    const startIndex = rawResponse.indexOf('{');
                    const endIndex = rawResponse.lastIndexOf('}');
                    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
                        jsonText = rawResponse.substring(startIndex, endIndex + 1).trim();
                    } else {
                        throw new Error("No valid JSON object found in response text.");
                    }
                }

                if (!jsonText) throw new Error("Extracted JSON text is empty.");
                
                // Step 3: Success!
                return JSON.parse(jsonText);

            } catch (parseError) {
                // Step 4: Parse error
                console.warn(`Failed to parse JSON (Analyzer) on attempt ${retries + 1}/${maxRetries}. Retrying...`, parseError);
                console.log("--- START OF MALFORMED RESPONSE (ANALYZER) ---");
                console.log(rawResponse);
                console.log("--- END OF MALFORMED RESPONSE (ANALYZER) ---");
                
                lastError = parseError;
                retries++;
                if (retries < maxRetries) {
                    await new Promise(resolve => setTimeout(resolve, 2000 * retries));
                }
            }
        }
        // Step 5: All retries failed.
        console.error("Failed to parse JSON from Gemini (Analyzer) after all retries:", lastError);
        throw new Error("The AI returned an invalid response for the analysis phase.");
    }

    /**
     * Calls the Gemini API inside a loop to categorize a single text chunk.
     * This version includes a retry loop and robust JSON parsing.
     */
    private async _fetchAndParseCategorization(chunk: string, mainTopic: string, vaultContext: string, maxRetries = 3): Promise<any> {
        
        // Create a model with standard settings for this small, fast task
        const model = this.genAI.getGenerativeModel({
            model: this.settings.model,
            generationConfig: { 
                temperature: 0.0 
            },
        });
        
        const prompt = createCategorizationPrompt(chunk, mainTopic, vaultContext);
        
        let retries = 0;
        let lastError: any = null;

        while (retries < maxRetries) {
            let rawResponse = "";
            try {
                // Step 1: Make the API call
                const result = await this.makeApiCallWithRetry(() => model.generateContent(prompt));
                rawResponse = result.response.text();

                await this.logActivity(`--- AI RESPONSE (Categorizer for chunk: "${chunk.substring(0, 40)}...") ---\n${rawResponse}\n--- END RESPONSE ---`);

                // --- NEW ROBUST PARSING LOGIC ---
                let jsonText = "";
                const jsonMatch = rawResponse.match(/```json\s*([\s\S]*?)\s*```/);

                if (jsonMatch && jsonMatch[1]) {
                    // Case 1: Found ```json ... ```
                    jsonText = jsonMatch[1].trim();
                } else {
                    // Case 2: No markdown. Find the first '{' and last '}'
                    const startIndex = rawResponse.indexOf('{');
                    const endIndex = rawResponse.lastIndexOf('}');
                    
                    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
                        jsonText = rawResponse.substring(startIndex, endIndex + 1).trim();
                    } else {
                        // Case 3: No JSON object found at all.
                        throw new Error("No valid JSON object found in response text.");
                    }
                }

                if (!jsonText) {
                    throw new Error("Extracted JSON text is empty.");
                }
                // --- END NEW LOGIC ---

                const parsedJson = JSON.parse(jsonText);
                
                // Step 3: Success!
                return parsedJson;

            } catch (parseError) {
                // Step 4: Parse error
                console.warn(`Failed to parse JSON for chunk on attempt ${retries + 1}/${maxRetries}. Retrying in ${2 * (retries + 1)}s...`, parseError);
                console.log("--- START OF MALFORMED RESPONSE (CHUNK) ---");
                console.log(rawResponse);
                console.log("--- END OF MALFORMED RESPONSE (CHUNK) ---");

                lastError = parseError;
                retries++;
                if (retries < maxRetries) {
                    await new Promise(resolve => setTimeout(resolve, 2000 * retries));
                }
            }
        }

        // Step 5: All retries failed for this chunk
        console.error(`Failed to parse JSON for chunk after all retries: ${chunk.substring(0, 50)}...`, lastError);
        throw new Error(`The AI returned an invalid response for a chunk. See console for details.`);
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
        const matchingModel = this.genAI.getGenerativeModel({ model: this.settings.model });
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
        
        // --- NEW LOCAL LOGIC ---
        // We build the "Proposed Knowledge Structure" section locally from the checklist.
        const categories: Record<string, any[]> = {};
        const typeDescriptions: Record<string, string> = {
            'Fundamental': 'The foundational pillar upon which everything else is built.',
            'Major Core': 'Primary pillars of this topic. They are the main branches.',
            'Core': 'Essential building blocks that support the Major Core ideas.',
            'Process': 'A step-by-step guide or workflow.',
            'Comparison': 'A side-by-side analysis of two or more concepts.',
            // Add other standard model types here
        };

        for (const note of planData.checklist_notes) {
            const type = note.type || 'Core';
            if (!categories[type]) {
                categories[type] = [];
            }
            categories[type].push(note);
        }

        const proposalSection = `\n\n---\n### Proposed Knowledge Structure\n\n` +
            Object.keys(categories).sort().map(categoryType => {
                const categoryTitle = `${categoryType} Concepts`; // Simple title
                const categoryDesc = typeDescriptions[categoryType] || 'A set of related concepts.';
                const notesList = categories[categoryType].map((note: any) => `\t- [[${note.title}]]`).join('\n');
                
                return `**${categoryTitle}**\n- *${categoryDesc}*\n${notesList}`;
            }).join('\n\n');
        // --- END NEW LOCAL LOGIC ---

        const notesPlanSection = `\n---\n### Detailed Lesson Plan\n\n` +
            planData.checklist_notes.map((note: any) => `- **${note.title}** \`(${note.type})\`\n\t- *${note.description}*`).join('\n');

        const questionsSection = planData.provocative_questions?.length > 0
            ? `\n\n---\n### Provocative Questions\n\n_Ponder these questions to challenge your assumptions and synthesize the material:_\n\n` +
            planData.provocative_questions.map((q: string) => `- ? ${q}`).join('\n')
            : '';

        const synthesisSection = `\n\n---\n\n## My Synthesis & Answers\n\n_This is my understanding of the lesson..._\n\n1. `;

        const frontmatter = `---
main_topic: ${planData.plan_details.main_topic.replace(/[\\/:?*\"<>|]/g, "")}
source: "${extractedSource}"
---

`;
        // Assemble all the new sections
        return [frontmatter, analysisSection, relatedConnectionsSection, templateDraftNotification, proposalSection, notesPlanSection, questionsSection, synthesisSection].join('');
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
        await this.logActivity(`Starting Math Plan Draft creation for folder: "${folderPath}".`);
        progressCallback("Scanning folder for mechanism sections...");

        const notesFolder = this.app.vault.getAbstractFileByPath(folderPath);
        if (!(notesFolder instanceof TFolder)) return `Error: The folder "${folderPath}" was not found.`;

        const allNotes = this._getAllNotesInFolder(notesFolder);
        
        let draftContent = `# Math Mechanism Draft\n\n- **Source Folder:** "${folderPath}"\n\n---\n\n`;
        let extractedCount = 0;

        const mechanismRegex = /^#### Mechanism\n([\s\S]+?)(?=\n^#{1,4}|\n---|$)/m;
        
        for (const [index, note] of allNotes.entries()) {
            progressCallback(`[${index + 1}/${allNotes.length}] Scanning: ${note.basename}`);
            const content = await this._readFullNoteForMath(note);
            const match = mechanismRegex.exec(content);

            if (match && match[1].trim()) {
                const mechanismContent = match[1];
                
                // --- NEW: This is the crucial check for LaTeX symbols ---
                const hasLatex = /\$|\\\[|\\\(/ .test(mechanismContent);

                // Only add the section to the draft if it actually contains math
                if (hasLatex) {
                    draftContent += `### From: [[${note.path}|${note.basename}]]\n\n${mechanismContent.trim()}\n\n---\n\n`;
                    extractedCount++;
                }
            }
        }

        if (extractedCount === 0) {
            // This message is now more accurate. No file will be created.
            return "Scan complete. No notes with math equations in their mechanism sections were found.";
        }

        const timestamp = new Date().toLocaleString('sv').replace(/ /g, '_').replace(/:/g, '-');
        const draftFileName = `Math Draft - ${notesFolder.name} - ${timestamp}.md`;
        const draftFilePath = `${this.settings.plansFolderPath}/${draftFileName}`;
        
        await this.fileService.createFile(draftFilePath, draftContent);
        
        await this.logActivity(`Created Math Plan Draft with ${extractedCount} sections from "${folderPath}".`);
        return `Successfully created draft with ${extractedCount} mechanism sections! Find it at: [[${draftFilePath}]]`;
    }

    /**
     * PLAN PHASE: Reads the draft file from the 'Extract' step, finds equations
     * within their context, and uses AI to generate a structured plan.
     */
    public async createMathPlanFromDraft(draftFilePath: string, progressCallback: (update: string) => void): Promise<string> {
        progressCallback("Reading mechanism draft file...");
        
        const draftFile = this._getTargetFile(draftFilePath);
        if (!draftFile) return "Error: Could not find the specified draft file.";

        const draftContent = await this.fileService.readFile(draftFile);
        
        // This regex captures the source note and the full mechanism content for that note.
        const sectionRegex = /### From: \[\[(.*?)\]\]\n\n([\s\S]*?)(?=\n---\n|$)/g;
        const sections = [...draftContent.matchAll(sectionRegex)];

        if (sections.length === 0) return "No mechanism sections found in the draft file.";
        
        let planHeader = `# Math Equation Plan\n\n- **Created:** ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}\n- **Source Draft:** [[${draftFilePath}]]\n- **Instructions:** Review the AI-generated summaries. When ready, run "Math: Generate atomic notes from active plan".\n\n---\n\n`;
        let planEntries = '';
        let equationCount = 0;
        
        const model = this.genAI.getGenerativeModel({ model: this.settings.model, generationConfig: { temperature: 0.1 } });
        const equationRegex = /(\$\$[\s\S]*?\$\$)/g;

        for (const [index, section] of sections.entries()) {
            const [_, sourcePath, mechanismContent] = section;
            progressCallback(`[${index + 1}/${sections.length}] Analyzing section from: ${sourcePath.split('/').pop()}`);

            const equations = [...mechanismContent.matchAll(equationRegex)];
            if (equations.length === 0) continue;
            
            planEntries += `### From: [[${sourcePath}]]\n\n`;

            for (const match of equations) {
                const equation = match[0].trim();
                try {
                    // We use the entire mechanism block as context for the AI
                    const prompt = createMathContextPrompt(equation, mechanismContent);
                    const result = await this.makeApiCallWithRetry(() => model.generateContent(prompt));
                    const rawResponse = result.response.text();
                    const jsonMatch = rawResponse.match(/```json\n([\s\S]*?)\n```/);
                    const jsonText = jsonMatch ? jsonMatch[1] : rawResponse.replace(/```/g, "").trim();
                    const aiSummary = JSON.parse(jsonText);

                    planEntries += `- [x] **${aiSummary.title}** | \`${equation}\`\n`;
                    planEntries += `  > *${aiSummary.description}*\n\n`;
                    equationCount++;

                } catch (e) {
                    console.error(`Failed to get AI context for equation in "${sourcePath}":`, e);
                    planEntries += `- [ ] **ERROR** | \`${equation}\`\n  > *Could not generate AI summary.*\n\n`;
                }
            }
        }

        if (equationCount === 0) return "No valid equations were found in the mechanism sections.";

        const finalPlanContent = planHeader + planEntries;
        const planFileName = `Math Plan - ${draftFile.basename.replace('Math Draft - ', '')}.md`;
        const planFilePath = `${this.settings.plansFolderPath}/${planFileName}`;
        
        await this.fileService.createFile(planFilePath, finalPlanContent);
        
        await this.logActivity(`Created Math Plan with ${equationCount} equations from draft "[[${draftFilePath}]]".`);
        return `Successfully created plan with ${equationCount} equations! Find it at: [[${planFilePath}]]`;
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
    private createDynamicNotePrompt(noteType: string, context: string, placeholders: string[], parent: string | null, children: string[], vaultContext: string): string {
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
        const keywordInstruction = `\n- For the "tags_keywords" key, you MUST generate an array of 3-5 relevant lowercase, snake_case technical keywords for this specific concept. This is a mandatory field. Do not include the main topic or the note type.`;
        const relatedFieldInstruction = placeholders.includes('related') 
            ? `- For the "related_links_for_yaml" key, you MUST generate a comprehensive list of 10-15 wikilinks to closely related concepts. Think broadly: include parent concepts, child concepts, contrasting ideas, practical applications, and foundational prerequisites.`
            : '';

        const fundamentalInstruction = `
- **Fundamental Object Logic**: You MUST structure the justification within a JSON key called "fundamental". This key must contain an object with a single sub-key: "justification".
    - "justification": A clear, concise sentence explaining why this concept is a cornerstone of the broader subject, essential for anyone to learn.`;

        const namingConventionInstruction = `\n- **Naming Convention**: All wikilinks you generate MUST strictly follow the user's established naming convention. For most topics, this is "Subject - Concept" (e.g., "ML - Logistic Regression"). For fundamental topics, it is "Fundamental - Concept" (e.g., "Fundamental - Machine Learning"). Use abbrevations for subjact names like Machine Learnin turns to ML and so on Do NOT invent new formats. When creating a wikilink, if the target concept is listed in the EXISTING STRUCTURAL NOTES, you MUST use its exact full name (e.g., "Fundamental - Machine Learning").`;
        const newFieldInstructions = `
- For the "concept_name" key, provide the clean concept name without the "Subject - " prefix. (e.g., if the note title is "ML - Logistic Regression", this should be "Logistic Regression").
- For the "summary.analogy_text" key, you MUST provide a powerful, real-world analogy and then **explicitly map its components to the concept's components**.
- For the "summary.analogy_breakdown" key, you MUST provide a bullet point that starts with '**Where it breaks down:**' and explains the analogy's limitations. This is vital for preventing misconceptions.
- For the "details.core_idea" key, provide a brief, one-or-two-sentence introductory paragraph for the 'Details' section, before the bullet points.`;

        const detailedContentInstructions = `
- **Details Object Logic (The 'Why, How, Where' Narrative)**: Your most important task is to structure the detailed explanation as a compelling story instead of a flat, unrelated list of details, using the simplest language possible. Use the sub-keys within the "details" JSON object to build this 'Why, How, Where' narrative. You should only include math where it is essential for understanding a real-world use case.

---
### **Part 1: The 'Why' (The Introduction)**
- For "**core_idea**": Give the most attention to this paragraph. Write a simple, multi-sentence introductory hook. Be clear about what the concept is, what field it belongs to, touch on important, good-to-know areas, and conclude with a sentence that **introduces its main categories or types in bold**, if any.
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
- For "**mechanism_code_snippet**": You MUST return a message **nothing to fill here**.

---
### **Part 3: The 'Where' (The Broader Context)**
- For "**parameters_bullets**": Continue the 'how' by identifying the key 'levers' or hyperparameters that control the mechanism, explaining their impact.
- For "**tradeoffs_bullets**": Conclude the story by explaining 'where' this concept fits and its consequences. What are the tradeoffs of using it? What are its limitations? This connects the concept to the broader landscape.
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
            7.  **CRITICAL - Omit Detailed Breakdowns**: Your goal is to present the core formulas that define the process. Detailed deconstructions of each variable (e.g., using a "Where:" list) should be omitted from this section.
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

        // --- FIX: The main preamble has been clarified to be more specific about data types. ---
        
        return `You are an expert knowledge architect. Your task is to generate the structured content for a note about "${context}".

You MUST return a single, valid JSON object that strictly adheres to the following nested structure. All fields are mandatory.  Formatting and structure are more important than the prose. Any deviation from the schema will result in a failed output.

{
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
    "parameters_bullets": "Identify key hyperparameters and their effects using the nested bullet point structure.",
    "tradeoffs_bullets": "Explain the consequences and impact on tradeoffs using the nested bullet point structure."
  },
  "connections": {
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
- **Contextual Adherence**: Your absolute primary goal is to generate content that specifically explains and elaborates on the details provided in context: "${context}". All subsequent instructions are about how to format your explanation of THIS topic. Do not provide generic information.
- **LaTeX**: You MUST use properly escaped LaTeX for all math (e.g., "$\\\\theta$").
- **JSON Escaping**: All backslashes MUST be double-escaped (e.g., \\\\).
- **Nested Bullets**: For any key ending in '_bullets', you MUST use the format: [{"content": "...", "children": [...]}].

--- PROMPT DETAILS ---
${relatedFieldInstruction}
${namingConventionInstruction}
${newFieldInstructions}
${keywordInstruction}
${fundamentalInstruction}
${markdownFormattingInstruction}
${connectionInstructions}
${detailedContentInstructions}
${bulletPointInstruction}
${mathFormattingInstruction}
${questionsInstruction}
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

            // Step 2: Loop through each proposal and generate the note
            const generationResults = await this._processProposals(proposals, mainTopic, sourceFromPlan, progressCallback);

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
                    visualization_block: aiJson.visualization_block,
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
        progressCallback("Reading the math plan file...");

        const planFile = this._getTargetFile(planFilePath);
        if (!planFile) return "Error: Could not find the specified plan file.";
        
        const planContent = await this.fileService.readFile(planFile);

        // MODIFIED: This regex is designed to parse the new, richer plan format.
        const entryRegex = /-\s\[x\]\s\*\*(.*?)\*\*\s\|\s\`(.*?)\`\n\s+>\s\*(.*?)\*/gm;
        const tasks = [...planContent.matchAll(entryRegex)];

        if (tasks.length === 0) return "No checked equations found in the plan to process.";

        // NEW: We need to get the source note from the plan to pass to the template.
        // We'll look for the "From: [[...]]" lines.
        const sourceNoteRegex = /### From: \[\[(.*?)\|.*?\]\]/g;
        const sourceLinks = [...planContent.matchAll(sourceNoteRegex)].map(match => match[1]);
        
        const model = this.genAI.getGenerativeModel({ model: this.settings.model, generationConfig: { temperature: 0.1 } });
        let generatedCount = 0;
        const failedNotes: string[] = []; // Array to store titles of failed notes

        for (const [index, task] of tasks.entries()) {
            const [_, title, equation, description] = task;
            progressCallback(`[${index + 1}/${tasks.length}] Generating: ${title}...`);
            try {
                // NEW: We need the `createAtomicMathNotePrompt` for this step.
                const prompt = createAtomicMathNotePrompt(title, equation, description);
                const result = await this.makeApiCallWithRetry(() => model.generateContent(prompt));
                const rawResponse = result.response.text();
                const jsonMatch = rawResponse.match(/```json\n([\s\S]*?)\n```/);
                const jsonText = jsonMatch ? jsonMatch[1] : rawResponse.replace(/```/g, "").trim();
                const explanation = JSON.parse(jsonText);

                // console.log(`--- AI JSON for: ${title} ---`, JSON.stringify(explanation, null, 2));

                // NEW: Read the math template file.
                const templateContent = await this.app.vault.adapter.read(
                    `${this.settings.templatesFolderPath}/Math Concept Template.md`
                );

                const sourceNote = sourceLinks.length > 0 ? sourceLinks[0].replace(/\.md$/, '') : null;
                const sourceArray = sourceNote ? [sourceNote] : []; // Create an array for the source

                let codeSnippet = explanation.code_snippet || "";
                if (codeSnippet.trim() !== "") {
                    codeSnippet = `\`\`\`python\n${codeSnippet}\n\`\`\``;
                }

                const dataForTemplate = {
                    // Core Content
                    title: title,
                    equation: equation,
                    why_goal: explanation.why_goal,
                    how_deconstructed_bullets: (explanation.how_deconstructed || []),
                    when_application_bullets: (explanation.when_application || []),
                    related_concepts_bullets: (explanation.related_concepts || []),
                    code_snippet: codeSnippet,
                    
                    // Frontmatter Data (as arrays)
                    tags_yaml: ['math', 'concept', ...(explanation.tags_keywords || [])],
                    source: sourceArray,
                    related: (explanation.related_links_for_yaml || [])
                };
                
                const finalContent = this.populateTemplate(templateContent, dataForTemplate);
                
                // NEW: Create an individual file for each equation.
                const noteFileName = `Math - ${title.replace(/[\\/:?*\"<>|]/g, "")}.md`;
                const noteFilePath = `${this.settings.draftsFolderPath}/${noteFileName}`;
                await this.fileService.createFile(noteFilePath, finalContent);
                generatedCount++;

            } catch (e) {
                console.error(`Failed to generate note for "${title}":`, e);
                new Notice(`Error generating note for "${title}". Check the console.`);
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
    private async _processProposals(proposals: RegExpMatchArray[], mainTopic: string, sourceFromPlan: string[], progressCallback: (update: string) => void) {
        const results = [];
        for (const [index, proposal] of proposals.entries()) {
            const title = proposal[1];
            const type = proposal[2].trim();
            const context = proposal[3];

            // MODIFIED: Use blockquote markdown for a "command prompt" look
            progressCallback(`Processing [${index + 1}/${proposals.length}]: ${title}...`);

            if (type === 'Visual Analysis') {
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
                
                const aiJson = await this._generateNoteContentFromAI(type, context, templateContent, proposal);
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

    /**
     * Handles the AI call for generating the structured content of a single note.
     */
    private async _generateNoteContentFromAI(type: string, context: string, templateContent: string, proposal: RegExpMatchArray): Promise<any> {
        const placeholders = this.extractPlaceholders(templateContent);
        const aiPlaceholders = placeholders.filter(p => !['title', 'source', 'tags_yaml'].includes(p.toLowerCase()));
        
        // This logic can be extracted from the main loop to keep it clean
        const parent = null; // Placeholder for future parent/child logic extraction
        const children: string[] = []; // Placeholder

        const vaultContext = await this._getVaultContext(); 

        const dynamicPrompt = this.createDynamicNotePrompt(type, context, aiPlaceholders, parent, children, vaultContext);
        const model = this.genAI.getGenerativeModel({ model: this.settings.model, generationConfig: { temperature: 0.05 } });
        
        const result = await this.makeApiCallWithRetry(() => model.generateContent(dynamicPrompt));
        const rawResponse = result.response.text();
        
        const jsonMatch = rawResponse.match(/```json\n([\s\S]*?)\n```/);
        const jsonText = jsonMatch ? jsonMatch[1] : rawResponse.replace(/```/g, "").trim();

        const sanitizedJson = this.sanitizeJsonResponse(jsonText);

        const aiJson = JSON.parse(sanitizedJson);

        // console.log("--- FINAL AI JSON ---", JSON.stringify(aiJson, null, 2));

        return noteSchema.parse(aiJson);
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

    private async makeApiCallWithRetry(apiCall: () => Promise<any>, maxRetries = 3, initialDelay = 2000) {
    let retries = 0;
    let delay = initialDelay;
    while (retries < maxRetries) {
        try {
            return await apiCall();
        } catch (error) {
            // Check if the error is a 503 Overloaded error
            if (error.message && error.message.includes('[503')) {
                retries++;
                if (retries >= maxRetries) {
                    // If we've exhausted retries, throw the error
                    throw error;
                }
                console.warn(`Gemini API overloaded. Retrying in ${delay / 1000}s... (Attempt ${retries}/${maxRetries})`);
                await new Promise(resolve => setTimeout(resolve, delay));
                delay *= 2; // Double the delay for the next retry
            } else {
                // If it's a different error, throw it immediately
                throw error;
            }
        }
    }
}
}
