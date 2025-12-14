import { App, Notice, TFile, TFolder } from 'obsidian';
import { FileService } from './FileService';
import { 
    createNotePlanPrompt, 
    // generateNoteContentPrompt, // DEPRECATED: We will build prompts dynamically now
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

    // No changes to logActivity or updateHierarchyMap
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

            const allTags = new Set<string>();

            const frontmatterTags = fileCache.frontmatter?.tags;
            if (frontmatterTags) {
                const tagsToAdd = Array.isArray(frontmatterTags) ? frontmatterTags : String(frontmatterTags).split(',').map(t => t.trim());
                tagsToAdd.forEach(tag => {
                    const cleanedTag = tag.startsWith('#') ? tag.slice(1) : tag;
                    allTags.add(cleanedTag.toLowerCase());
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
    
    // No changes to the overall structure of createNotePlan
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
            const rawResponse = result.response.text();
            progressCallback("Received plan from Gemini. Parsing response...");

            // --- ROBUST JSON PARSING BLOCK ---
            let jsonText = rawResponse;
            const jsonMatch = rawResponse.match(/```json\n([\s\S]*?)\n```/);
            if (jsonMatch && jsonMatch[1]) {
                jsonText = jsonMatch[1];
            } else {
                jsonText = rawResponse.replace(/```/g, "").trim();
            }

            let planData;
            try {
                planData = JSON.parse(jsonText);
            } catch (parseError) {
                console.error("Failed to parse JSON from Gemini response.", parseError);
                console.error("--- Raw Response from Gemini ---");
                console.error(rawResponse);
                return `Sorry, the AI returned an invalid response that I couldn't understand. Please check the developer console (Ctrl+Shift+I) for the full error, or try again. \n\n**Raw AI Response:**\n\`\`\`\n${rawResponse}\n\`\`\``;
            }
            
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
        } catch (e) {
            console.error("Error creating note plan:", e);
            await this.logActivity(`ERROR: Failed to create note plan for "[[${targetFile.path}|${targetFile.basename}]]".`);
            return "Sorry, I encountered an error while analyzing the note. Please check the console.";
        }
    }


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
    private createDynamicNotePrompt(noteType: string, context: string, placeholders: string[], parent: string | null, children: string[]): string {
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
        const relatedFieldInstruction = placeholders.includes('related_links_for_yaml') 
            ? `- For the "related_links_for_yaml" key, you MUST generate a comprehensive list of 10-15 wikilinks to closely related concepts. Think broadly: include parent concepts, child concepts, contrasting ideas, practical applications, and foundational prerequisites.`
            : '';

        const namingConventionInstruction = `\n- **Naming Convention**: All wikilinks you generate MUST strictly follow the user's established naming convention. For most topics, this is "Subject - Concept" (e.g., "ML - Logistic Regression"). For fundamental topics, it is "Fundamental - Concept" (e.g., "Fundamental - Machine Learning"). Do NOT invent new formats.`;
        const newFieldInstructions = `
- For the "concept_name" key, provide the clean concept name without the "Subject - " prefix. (e.g., if the note title is "ML - Logistic Regression", this should be "Logistic Regression").
- For the "summary_analogy" key, provide a concise, powerful, real-world analogy to make the concept easier to understand.
- For the "details_paragraph" key, provide a brief, one-or-two-sentence introductory paragraph for the 'Details' section, before the bullet points.`;

        // --- NEW: INSTRUCTION FOR RICH MARKDOWN FORMATTING ---
        const markdownFormattingInstruction = `\n- **Markdown Formatting**: Within the content for keys like "details_bullets", you MUST use Markdown to improve readability and structure. Use **bolding** to emphasize key terms that introduce a concept. When a bullet point has sub-points or examples, you MUST indent them to create a clear visual hierarchy.`;
        
        const connectionInstructions = `
- **Connection Logic**: Your most important task is to create a rich, interconnected knowledge graph. For any "connection" field, do not just list the links. Instead, you MUST write a descriptive sentence that explains the relationship between the concepts, embedding the wikilink within that sentence. Use bolded labels to categorize the relationship where appropriate (e.g., "**Contrasts With:**", "**Built Upon:**", "**Alternative To:**").
- For the "related_links_for_yaml" key, you MUST provide a simple array of 10-15 note titles that strictly follow the user's naming convention ("Subject - Concept" e.g., "ML - Logistic Regression", "Fundamental - Statistics").
- If filling "connections_parent", use the parent from the Hierarchical Context.
  - If filling "connections_children", use the children from the Hierarchical Context.
  - If filling "connections_related" or "connections_other_fundamentals", you must intelligently identify and link to other relevant concepts, describing the nature of the relationship (e.g., "Contrasts With:", "Built Upon:"). This is the most important part of your task.`;

        return `You are an expert knowledge architect. Your task is to generate the structured content for a note of type "${noteType}".

Essential Context: This note must be based on the following summary: "${context}".
${hierarchicalContext ? `\nHierarchical Context: You MUST use the following information to form the connections.${hierarchicalContext}` : ''}

Please return a single, valid JSON object with the following exact keys.
CRITICAL INSTRUCTIONS:
- For any key that includes the word 'connection' (e.g., "connections_related"), each item in the array MUST be a string formatted as a [[wikilink]].
- For any key that includes the word 'bullets' (e.g., "details_bullets"), each item in the array should be a string or an object with a single key-value pair (e.g., {"point": "This is a bullet."}).
${relatedFieldInstruction}
${namingConventionInstruction}
${newFieldInstructions}
${markdownFormattingInstruction}
${connectionInstructions}

The required JSON keys are:
${fieldsList}
`;
    }

    /**
     * A universal template populator. It takes a template string and a data object,
     * and replaces any {{key}} with the corresponding data[key] value.
     */
    private populateTemplate(templateContent: string, data: Record<string, any>): string {
        let populatedContent = templateContent;
        for (const key in data) {
            const placeholder = `{{${key}}}`;
            let replacement = data[key];

            if (replacement === null || replacement === undefined) {
                replacement = '';
            }

            if (Array.isArray(replacement)) {
                if (key.toLowerCase() === 'related') {
                    replacement = "\n" + replacement.map(item => `  - "[[${String(item).replace(/\[|\]/g, '')}]]"`).join("\n");
                } else { 
                    replacement = replacement.map(item => {
                        let line = String(item);
                        // If the item is an object, get its value
                        if (typeof item === 'object' && item !== null) {
                            line = String(Object.values(item)[0]);
                        }
                        
                        // --- CORRECTED LOGIC ---
                        // Only add a bullet point if the line doesn't already have one.
                        if (!line.trim().startsWith('-')) {
                            return `- ${line}`;
                        }
                        return line; // Return the line as-is if it's already formatted
                    }).join('\n');
                }
            }

            populatedContent = populatedContent.replace(new RegExp(placeholder, 'gi'), String(replacement));
        }
        return populatedContent.replace(/\{\{.*?\}\}/g, '');
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
        const newStructuralNotes: string[] = [];

        // --- CORRECTED CODE: Define the helper function ONCE, outside the loop ---
        const formatYamlList = (items: string[] | undefined): string => {
            if (!items || items.length === 0) return "";
            return "\n" + items.map((item) => `  - "[[${item}]]"`).join("\n");
        };

        for (const proposal of proposals) {
            noteIndex++;
            const title = proposal[1];
            const type = proposal[2].trim();
            const context = proposal[3];
            
            // ... (The rest of the hierarchical context extraction is the same)
            const parentMatch = planContent.match(new RegExp(`- \\*\\*${title}\\*\\*.*\\n\\s+- \\*Parent:\\*\\s+\\[\\[(.*?)\\]\\]`));
            const parent = parentMatch ? parentMatch[1] : null;
            const childrenRegex = new RegExp(`- \\*\\*${title}\\*\\*.*\\n(?:\\s+- \\*.*?\\*.*\\n)*?\\s+- \\*Children:\\*\\s+((?:\\n\\s+-\\s+\\[\\[.*?\\]\\])+)`);
            const childrenMatch = planContent.match(childrenRegex);
            const children = childrenMatch ? childrenMatch[1].match(/\[\[(.*?)\]\]/g).map(m => m.slice(2, -2)) : [];

            progressCallback(`[${noteIndex}/${proposals.length}] Generating: ${title}...`);
            
            const expectedTemplateName = `${type} Template.md`;
            const templatePath = `${this.settings.templatesFolderPath}/${expectedTemplateName}`;
            const templateFile = this.fileService.getAbstractFileByPath(templatePath);

            if (!(templateFile instanceof TFile)) {
                console.warn(`No template found for type: ${type} at path ${templatePath}. Skipping note: ${title}`);
                new Notice(`Skipping "${title}": Template not found for type "${type}".`);
                continue;
            }

            try {
                const templateContent = await this.fileService.readFile(templateFile);
                const placeholders = this.extractPlaceholders(templateContent);
                const aiPlaceholders = placeholders.filter(p => p.toLowerCase() !== 'title' && p.toLowerCase() !== 'related_links_for_yaml');
                const dynamicPrompt = this.createDynamicNotePrompt(type, context, aiPlaceholders, parent, children);
                
                const model = this.genAI.getGenerativeModel({ model: this.settings.model, generationConfig: { temperature: 0.1 } });
                const result = await model.generateContent(dynamicPrompt);
                const jsonText = result.response.text().replace(/```json/g, "").replace(/```/g, "").trim();
                const aiJson = JSON.parse(jsonText);
                aiJson.title = title;

                // --- TWO-STAGE POPULATION ---
                // STAGE 1: Populate the main note body.
                let finalContent = this.populateTemplate(templateContent, aiJson);
                // STAGE 2: Populate the special frontmatter case.
                finalContent = finalContent.replace(/related:/i, `related:${formatYamlList(aiJson.related_links_for_yaml)}`);

                const sanitizedTitle = title.replace(/[\\/:?*\"<>|]/g, "");
                const noteFileName = `${sanitizedTitle}.md`;
                const noteFilePath = `${this.settings.draftsFolderPath}/${noteFileName}`;

                await this.fileService.createFile(noteFilePath, finalContent);
                generatedCount++;
                const newNoteLink = `[[${noteFilePath}|${noteFileName}]]`;
                generatedNoteLinks.push(newNoteLink);

                const lowerCaseType = type.toLowerCase();
                if (lowerCaseType === 'fundamental' || lowerCaseType === 'major-core') {
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
        const reviewResult = await reviewModel.generateContent(reviewPrompt);
        const feedbackText = reviewResult.response.text();

        const keywordPrompt = createKeywordExtractionPrompt(feedbackText);
        const keywordModel = this.genAI.getGenerativeModel({
            model: this.settings.model,
            generationConfig: { temperature: 0.0 },
        });
        const keywordResult = await keywordModel.generateContent(keywordPrompt);
        const keywordText = keywordResult.response.text().trim();

        const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
        const contentToAppend = `\n\n---\n### Feedback on Your Synthesis (${timestamp})\n\n${feedbackText}\n<!-- gemini-context: ${keywordText} -->`;
        
        await this.fileService.modifyFile(fileToUpdate, fullContent + contentToAppend);

        const logMessage = `Appended synthesis feedback to "[[${fileToUpdate.path}|${fileToUpdate.basename}]]".`;
        await this.logActivity(logMessage);

        return `Feedback has been successfully added to your note!`;
    }
}
