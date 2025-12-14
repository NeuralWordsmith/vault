import { App, Notice, TFile, TFolder } from 'obsidian';
import { FileService } from './FileService';
import { 
    createNotePlanPrompt, 
    generateNoteContentPrompt, 
    createAnswerReviewPrompt, 
    createKeywordExtractionPrompt,
    createTemplateMatchingPrompt,
    createTemplateDraftPrompt
} from './PromptFactory';

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

    async logActivity(message: string): Promise<string> {
        const logFilePath = `${this.settings.draftsFolderPath}/${LOG_FILE_NAME}`;
        const timestamp = new Date().toLocaleString("en-IN", {
            year: "numeric", month: "2-digit", day: "2-digit",
            hour: "2-digit", minute: "2-digit", second: "2-digit",
            hour12: true, timeZone: "Asia/Kolkata"
        });
        const logEntry = `- ${timestamp}: ${message}\n`;

        let logFile = this.fileService.getAbstractFileByPath(logFilePath);

        if (!logFile) {
            await this.fileService.createFile(logFilePath, `# Gemini Agent Logs\n\n${logEntry}`);
        } else if (logFile instanceof TFile) {
            const currentContent = await this.fileService.readFile(logFile);
            const newContent = currentContent.replace("# Gemini Agent Logs\n\n", `# Gemini Agent Logs\n\n${logEntry}`);
            await this.fileService.modifyFile(logFile, newContent);
        }
        return `Logged: "${message}"`;
    }

    async updateHierarchyMap(): Promise<string> {
        new Notice("Scanning vault for structural notes...", 3000);

        const structuralNotes: string[] = [];
        const files = this.app.vault.getMarkdownFiles();
        const structuralTagNames = ["fundamental", "major-core", "moc"];

        for (const file of files) {
            const fileCache = this.app.metadataCache.getFileCache(file);
            if (!fileCache) continue;

            // Use a Set to store unique tags and prevent duplicates
            const allTags = new Set<string>();

            // 1. Explicitly process tags from the frontmatter (YAML)
            const frontmatterTags = fileCache.frontmatter?.tags;
            if (frontmatterTags) {
                // Handle both array format (tags: [one, two]) and string format (tags: one, two)
                const tagsToAdd = Array.isArray(frontmatterTags) ? frontmatterTags : String(frontmatterTags).split(',').map(t => t.trim());
                tagsToAdd.forEach(tag => {
                    // Clean the tag by removing any leading '#'
                    const cleanedTag = tag.startsWith('#') ? tag.slice(1) : tag;
                    allTags.add(cleanedTag.toLowerCase());
                });
            }

            // 2. Process inline tags (e.g., #my-tag in the note body)
            if (fileCache.tags) {
                fileCache.tags.forEach(tagCache => {
                    // The tag property includes the '#', so we slice it off
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

async createNotePlan(targetFilePath: string | null, progressCallback: (update: string) => void): Promise<string> {
    if (!targetFilePath) {
        return "Error: Could not determine the target file when the command was run.";
    }

    const file = this.app.vault.getAbstractFileByPath(targetFilePath);
    if (!(file instanceof TFile)) {
        return `Error: Target file not found at path "${targetFilePath}".`;
    }
    const targetFile = file;

    progressCallback("Reading your note...");
    const fullContent = await this.fileService.readFile(targetFile);

    const regex = /```gemini-note\n([\s\S]*?)\n```/;
    const match = fullContent.match(regex);

    let rawContent = "";
    if (match && match[1]) {
        rawContent = match[1];
    } else {
        rawContent = fullContent;
        new Notice("No 'gemini-note' block found. Processing the entire note as a fallback.");
    }

    if (!rawContent.trim()) {
        return "Error: The note or 'gemini-note' block is empty.";
    }
    
    let vaultContext = '';
    const mapFilePath = `${this.settings.draftsFolderPath}/${HIERARCHY_MAP_FILE_NAME}`;
    const mapFile = this.fileService.getAbstractFileByPath(mapFilePath);

    if (mapFile && mapFile instanceof TFile) {
        vaultContext = await this.fileService.readFile(mapFile);
    }

    const model = this.genAI.getGenerativeModel({
        model: this.settings.model,
        generationConfig: {
            temperature: 0.0,
        },
    });

    const prompt = createNotePlanPrompt(rawContent, vaultContext);

    let templateDraftNotification = '';

    try {
        progressCallback("Sending content to Gemini for analysis...");
        const result = await model.generateContent(prompt);
        
        progressCallback("Received plan from Gemini. Parsing response...");
        const jsonText = result.response.text().replace(/```json/g, "").replace(/```/g, "").trim();
        const planData = JSON.parse(jsonText);
        const suggestedType = planData.note_identity?.suggested_type || "Unknown";
        const justification = planData.note_identity?.justification || "No justification provided.";

        console.log(`AI Suggested Note Type: ${suggestedType}`);
        console.log(`Justification: ${justification}`);

        let matchedTemplatePath: string | null = null;
        
        const templatesFolder = this.app.vault.getAbstractFileByPath(this.settings.templatesFolderPath);
        let templateFileNames: string[] = [];
        if (templatesFolder instanceof TFolder) {
            templateFileNames = templatesFolder.children
                .filter(file => file instanceof TFile && file.extension === 'md')
                .map(file => file.name);
        }

        if (templateFileNames.length > 0) {
            const matchingPrompt = createTemplateMatchingPrompt(suggestedType, templateFileNames);
            const matchingModel = this.genAI.getGenerativeModel({ model: this.settings.model });
            const matchingResult = await matchingModel.generateContent(matchingPrompt);
            const bestMatch = matchingResult.response.text().trim();

            if (bestMatch && bestMatch !== "null" && templateFileNames.includes(bestMatch)) {
                matchedTemplatePath = `${this.settings.templatesFolderPath}/${bestMatch}`;
                console.log(`AI matched to template: ${matchedTemplatePath}`);
            } else {
                console.log("AI reported no suitable template found. Initiating Phase 3.");

                // --- PHASE 3: AUTOMATED TEMPLATE DRAFTING ---
                const exampleFileNames = ['03 Core Concept Template.md', 'Project Note Template.md'];
                const fewShotExamples = [];

                for (const fileName of exampleFileNames) {
                    try {
                        const examplePath = `${this.settings.templatesFolderPath}/${fileName}`;
                        const exampleContent = await this.app.vault.adapter.read(examplePath);
                        fewShotExamples.push({ fileName, content: exampleContent });
                    } catch (e) {
                        console.warn(`Could not load example template: ${fileName}`);
                    }
                }

                if (fewShotExamples.length > 0) {
                    const draftPrompt = createTemplateDraftPrompt(suggestedType, rawContent, fewShotExamples);
                    const draftModel = this.genAI.getGenerativeModel({ model: this.settings.model });
                    const draftResult = await draftModel.generateContent(draftPrompt);
                    const newTemplateContent = draftResult.response.text();

                    const draftsSubfolderPath = `${this.settings.templatesFolderPath}/Drafts`;
                    await this.fileService.createFolder(draftsSubfolderPath);
                    const newTemplateFileName = `${suggestedType} Template.md`;
                    const newTemplateFilePath = `${draftsSubfolderPath}/${newTemplateFileName}`;
                    await this.fileService.createFile(newTemplateFilePath, newTemplateContent);

                    templateDraftNotification = `
---
### 📝 New Template Drafted

I've identified a new note type: **"${suggestedType}"** and drafted a new template for it.

Please review the draft at [[${newTemplateFilePath}]]. Once you approve it, move it to your main templates folder before running the note generation command.
---
`;
                } else {
                    return "Sorry, I couldn't find any example templates to learn from. Please add some templates to your templates folder.";
                }
            }
        }

        // --- CONTENT ASSEMBLY LOGIC ---
        let feedbackSection = `## Feedback & Synthesis\n---\n\n${planData.overall_feedback}\n\n`;
        planData.review_points.forEach((point: any) => {
            feedbackSection += `- **${point.concept}:** ${point.suggestion}\n`;
        });

        let missingConnectionsSection = '';
        if (planData.missing_connections && planData.missing_connections.length > 0) {
            missingConnectionsSection = `\n\n---\n### Missing Connections\n\n_To build a deeper understanding, consider exploring these related topics:_\n\n`;
            planData.missing_connections.forEach((conn: string) => {
                missingConnectionsSection += `- ${conn}\n`;
            });
        }

        let proposalSection = `\n\n---\n### Proposed Atomic Notes\n\n`;
        planData.note_categories.forEach((cat: any) => {
            proposalSection += `**${cat.category_title}**\n${cat.category_description}\n`;
            cat.notes.forEach((note: any) => {
                proposalSection += `\t- [[${note.title}]]\n`;
            });
            proposalSection += `\n`;
        });

        let notesPlanSection = `\n---\n### Notes Plan\n\n`;
        planData.checklist_notes.forEach((note: any) => {
            notesPlanSection += `- **${note.title}** \`(${note.type})\`\n`;
            notesPlanSection += `\t- *${note.description}*\n`;
        });

        let questionsSection = '';
        if (planData.provocative_questions && planData.provocative_questions.length > 0) {
            questionsSection = `\n\n---\n### Provocative Questions\n\n_Ponder these questions to challenge your assumptions and synthesize the material:_\n\n`;
            planData.provocative_questions.forEach((q: string) => {
                questionsSection += `- ? ${q}\n`;
            });
        }

        const synthesisSection = `\n\n---\n\n## My Synthesis & Answers\n\n1. `;

        const finalPlanContent = 
            feedbackSection + 
            missingConnectionsSection +
            templateDraftNotification + 
            proposalSection + 
            notesPlanSection + 
            questionsSection + 
            synthesisSection;
        
        const mainTopic = planData.plan_details.main_topic.replace(/[\\/:?*\"<>|]/g, "");
        const uniquePhrase = planData.plan_details.unique_phrase;
        const planFileName = `${mainTopic} - ${uniquePhrase}.md`;
        const planFilePath = `${this.settings.plansFolderPath}/${planFileName}`;

        progressCallback("Creating the plan file in your vault...");
        await this.fileService.createFolder(this.settings.plansFolderPath);
        await this.fileService.createFile(planFilePath, finalPlanContent);
        
        const logMessage = `Created note plan for "[[${targetFile.path}|${targetFile.basename}]]". AI suggested type: ${suggestedType}. New plan is at "[[${planFilePath}|${planFileName}]]".`;
        await this.logActivity(logMessage);

        let successMessage = `Plan created successfully! I've created a plan for you at: [[${planFilePath}|${planFileName}]]`;
        if (templateDraftNotification) {
            successMessage += `\n\nI also drafted a new template for the '${suggestedType}' note type. You can review it in the plan note.`;
        }
        return successMessage;
    // FIX: Removed the extra '}' before this catch block
    } catch (e) {
        console.error("Error creating note plan:", e);
        await this.logActivity(`ERROR: Failed to create note plan for "[[${targetFile.path}|${targetFile.basename}]]".`);
        return "Sorry, I encountered an error while analyzing the note. Please check the console.";
    }
}

    async generateNotesFromPlan(plan_file_path: string | undefined, progressCallback: (update: string) => void): Promise<string> {
        let planFile: TFile | null = null;

        if (plan_file_path) {
            const file = this.fileService.getAbstractFileByPath(plan_file_path);
            if (file instanceof TFile) {
                planFile = file;
            } else {
                return `Error: Plan file not found at path "${plan_file_path}".`;
            }
        } else {
            return "Error: No plan file was specified or active when the command was run.";
        }
        
        const planContent = await this.fileService.readFile(planFile);
        const taskRegex = /^- \*\*(.*?)\*\* \`\((.*?)\)\`\n\s+-\s*\*(.*?)\*/gm;
        const proposals = [...planContent.matchAll(taskRegex)];

        if (proposals.length === 0) return "No pending notes with descriptions found in the plan file.";
        
        progressCallback(`Found ${proposals.length} notes to generate...`);
        
        let generatedCount = 0;
        let generatedNoteLinks: string[] = [];
        let noteIndex = 0;
        
        // --- NEW: Initialize an array to track new structural notes ---
        const newStructuralNotes: string[] = [];

        for (const proposal of proposals) {
            noteIndex++;
            const title = proposal[1];
            const type = proposal[2].trim();
            const context = proposal[3];

            progressCallback(`[${noteIndex}/${proposals.length}] Generating: ${title}...`);

            let templatePath = "";
            const expectedFileName = `${type} Template.md`;
            const potentialPath = `${this.settings.templatesFolderPath}/${expectedFileName}`;

            if (this.fileService.getAbstractFileByPath(potentialPath)) {
                templatePath = potentialPath;
                console.log(`Found dynamic template for type '${type}': ${templatePath}`);
            } 
            else {
                const lowerCaseType = type.toLowerCase();
                if (lowerCaseType.includes("major core")) templatePath = `${this.settings.templatesFolderPath}/02 Major Core Concept Template.md`;
                else if (lowerCaseType.includes("core")) templatePath = `${this.settings.templatesFolderPath}/03 Core Concept Template.md`;
                else if (lowerCaseType.includes("process")) templatePath = `${this.settings.templatesFolderPath}/03 Core Concept Template.md`;
                else if (lowerCaseType.includes("fundamental")) templatePath = `${this.settings.templatesFolderPath}/01 Fundamental Concept Template.md`;
                else if (lowerCaseType.includes("question")) templatePath = `${this.settings.templatesFolderPath}/04 Question Note Template.md`;
            }

            if (!templatePath) {
                console.warn(`No template found for type: ${type}. Skipping note: ${title}`);
                continue;
            }

            const noteGenPrompt = generateNoteContentPrompt(title, type, context);
            const model = this.genAI.getGenerativeModel({ model: this.settings.model });

            try {
                const result = await model.generateContent(noteGenPrompt);
                const jsonText = result.response.text().replace(/```json/g, "").replace(/```/g, "").trim();
                const aiJson = JSON.parse(jsonText);

                const templateContent = await this.app.vault.adapter.read(templatePath);
                
                const formatYamlList = (items: string[] | undefined): string => {
                    if (!items || items.length === 0) return "";
                    return "\n" + items.map((item) => `  - "[[${item}]]"`).join("\n");
                };
                let finalContent = templateContent
                    // ... (all your .replace() calls remain the same)
                    .replace(/{{\s*title\s*}}/gi, title)
                    .replace(/> _A simple, one-sentence summary.*_/i, `> ${aiJson.summary_definition || ""}`)
                    .replace(/_Analogy: A helpful, real-world analogy.*_/i, `_${aiJson.summary_analogy || ""}_`)
                    .replace(/_The essential facts, characteristics, or steps.*_/i, (aiJson.details_bullets || []).map((item: string) => `- ${item}`).join("\n"))
                    .replace(/This is a major component of.*/i, `This is a major component of ${aiJson.connections_parent || ""}`)
                    .replace(/-\s*\[\[Name of a child Core Idea note\]\]\s*-\s*\[\[Another child Core Idea note\]\]/i, (aiJson.connections_children || []).map((item: string) => `- ${item}`).join("\n"))
                    .replace(/-\s*\[\[\s*\]\]/i, (aiJson.connections_related || []).map((item: string) => `- ${item}`).join("\n"))
                    .replace(/-\s*\?\s*-\s*\?/i, (aiJson.questions || []).map((item: string) => `- ${item}`).join("\n"))
                    .replace(/related:/i, `related:${formatYamlList(aiJson.related_links_for_yaml)}`);


                const sanitizedTitle = title.replace(/[\\/:?*\"<>|]/g, "");
                const noteFileName = `${sanitizedTitle}.md`;
                const noteFilePath = `${this.settings.draftsFolderPath}/${noteFileName}`;

                await this.fileService.createFile(noteFilePath, finalContent);
                generatedCount++;
                const newNoteLink = `[[${noteFilePath}|${noteFileName}]]`;
                generatedNoteLinks.push(newNoteLink);

                // --- NEW: Check if the new note is structural and track it ---
                const lowerCaseType = type.toLowerCase();
                if (lowerCaseType.includes('fundamental') || lowerCaseType.includes('major-core')) {
                    newStructuralNotes.push(newNoteLink);
                }

            } catch (e) {
                console.error(`Failed to generate note for "${title}":`, e);
                new Notice(`Error generating note: ${title}. Check console.`);
            }
        }
        
        if (newStructuralNotes.length > 0) {
            const mapFilePath = `${this.settings.draftsFolderPath}/${HIERARCHY_MAP_FILE_NAME}`;
            const mapFile = this.fileService.getAbstractFileByPath(mapFilePath);

            if (mapFile && mapFile instanceof TFile) {
                const contentToAppend = '\n' + newStructuralNotes.join('\n');
                await this.app.vault.append(mapFile, contentToAppend);
                await this.logActivity(`Auto-updated Hierarchy Map with ${newStructuralNotes.length} new notes.`);
                new Notice("Hierarchy Map auto-updated!");
            }
        }
        
        progressCallback('Finalizing generation...');
        const indentedList = generatedNoteLinks.map((link) => `\n\t- ${link}`).join("");
        const logMessage = `Generated ${generatedCount} notes from plan "[[${planFile.path}|${planFile.basename}]]":${indentedList}`;
        await this.logActivity(logMessage);

        return `Successfully generated ${generatedCount} new notes in the drafts folder.`;
    }

    async reviewAnswersInPlan(fileToUpdate: TFile): Promise<string> {
        // 1. Read the full content of the file.
        const fullContent = await this.fileService.readFile(fileToUpdate);

        // 2. Scan for our "digital breadcrumb" to see if this is a follow-up review.
        // --- THIS IS THE CORRECTED LINE ---
        const breadcrumbRegex = /<!-- gemini-context: (.*?) -->/g;
        const matches = [...fullContent.matchAll(breadcrumbRegex)];

        let contentForReview: string;

        // 3. Determine the context to send based on whether breadcrumbs were found.
        if (matches.length === 0) {
            // --- SCENARIO 1: FIRST REVIEW ---
            contentForReview = fullContent;

        } else {
            // --- SCENARIO 2: SUBSEQUENT REVIEW ---
            const lastMatch = matches[matches.length - 1];
            const lastKeywords = lastMatch[1].trim();
            const lastMatchEndIndex = lastMatch.index + lastMatch[0].length;

            const questionsRegex = /#### Provocative Questions([\s\S]*?)---/m;
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

        // 4. Get the main feedback from the AI
        const reviewPrompt = createAnswerReviewPrompt(contentForReview);
        const reviewModel = this.genAI.getGenerativeModel({
            model: this.settings.model,
            generationConfig: { temperature: 0.4 },
        });
        const reviewResult = await reviewModel.generateContent(reviewPrompt);
        const feedbackText = reviewResult.response.text();

        // 5. DISTILLATION: Get the keywords from the feedback we just received
        const keywordPrompt = createKeywordExtractionPrompt(feedbackText);
        const keywordModel = this.genAI.getGenerativeModel({
            model: this.settings.model,
            generationConfig: { temperature: 0.0 },
        });
        const keywordResult = await keywordModel.generateContent(keywordPrompt);
        const keywordText = keywordResult.response.text().trim();

        // 6. Append the new feedback and the hidden keyword breadcrumb to the file
        const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
        const contentToAppend = `\n\n---\n### Feedback on Your Synthesis (${timestamp})\n\n${feedbackText}\n<!-- gemini-context: ${keywordText} -->`;
        
        await this.fileService.modifyFile(fileToUpdate, fullContent + contentToAppend);

        const logMessage = `Appended synthesis feedback to "[[${fileToUpdate.path}|${fileToUpdate.basename}]]".`;
        await this.logActivity(logMessage);

        return `Feedback has been successfully added to your note!`;
    }
}