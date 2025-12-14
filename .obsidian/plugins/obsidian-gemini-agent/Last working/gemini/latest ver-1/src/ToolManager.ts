import { App, Notice, TFile, TFolder } from 'obsidian';
import { FileService } from './FileService';
import { z } from 'zod';
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

        const sourceRegex = /^source\s*-\s*(.*)/im;
        const sourceMatch = rawContent.match(sourceRegex);
        let extractedSource = sourceMatch ? sourceMatch[1].trim() : '';
        if (extractedSource.startsWith('- ')) {
            extractedSource = extractedSource.substring(2);
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
            const result = await this.makeApiCallWithRetry(() => model.generateContent(prompt));
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
                const matchingResult = await this.makeApiCallWithRetry(() => matchingModel.generateContent(matchingPrompt));
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
                        const draftResult = await this.makeApiCallWithRetry(() => draftModel.generateContent(draftPrompt));
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
            const mainTopic = planData.plan_details.main_topic.replace(/[\\/:?*\"<>|]/g, "");
    
            const planFrontmatter = `---
main_topic: ${mainTopic}
source: "${extractedSource}"
---

`;
            const finalPlanContent =
                planFrontmatter +
                feedbackSection + 
                missingConnectionsSection +
                templateDraftNotification + 
                proposalSection + 
                notesPlanSection + 
                questionsSection + 
                synthesisSection;

            const uniquePhrase = planData.plan_details.unique_phrase;
            const planFileName = `${mainTopic} - ${uniquePhrase}.md`;
            const planFilePath = `${this.settings.plansFolderPath}/${planFileName}`;
    
            progressCallback("Creating the plan file in your vault...");
            await this.fileService.createFolder(this.settings.plansFolderPath);
            await this.fileService.createFile(planFilePath, finalPlanContent);
            
            const logMessage = `Created note plan for "[[${targetFile.path}|${targetFile.basename}]]". AI suggested type: ${planData.note_identity?.suggested_type}. New plan is at "[[${planFilePath}|${planFileName}]]".`;
            await this.logActivity(logMessage);
    
            let successMessage = `Plan created successfully! I've created a plan for you at: [[${planFilePath}|${planFileName}]]`;
            if (templateDraftNotification) {
                successMessage += `\n\nI also drafted a new template. You can review it in the plan note.`;
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
        const keywordInstruction = `\n- For the "tags_keywords" key, you MUST generate an array of 3-5 relevant lowercase, snake_case technical keywords for this specific concept. This is a mandatory field. Do not include the main topic or the note type.`;
        const relatedFieldInstruction = placeholders.includes('related') 
            ? `- For the "related_links_for_yaml" key, you MUST generate a comprehensive list of 10-15 wikilinks to closely related concepts. Think broadly: include parent concepts, child concepts, contrasting ideas, practical applications, and foundational prerequisites.`
            : '';

        const namingConventionInstruction = `\n- **Naming Convention**: All wikilinks you generate MUST strictly follow the user's established naming convention. For most topics, this is "Subject - Concept" (e.g., "ML - Logistic Regression"). For fundamental topics, it is "Fundamental - Concept" (e.g., "Fundamental - Machine Learning"). Do NOT invent new formats.`;
        const newFieldInstructions = `
- For the "concept_name" key, provide the clean concept name without the "Subject - " prefix. (e.g., if the note title is "ML - Logistic Regression", this should be "Logistic Regression").
- For the "summary_analogy" key, you MUST provide two things in a single string:
    1. A concise, powerful, real-world analogy to make the concept easier to understand.
    2. Immediately after, include a bullet point labeled "**Where it breaks down:**" that briefly explains the key limitations of the analogy. This is vital for preventing misconceptions.
- For the "details_paragraph" key, provide a brief, one-or-two-sentence introductory paragraph for the 'Details' section, before the bullet points.`;

        const detailedContentInstructions = `
- **Detailed Breakdown Logic**: You MUST structure the detailed explanation of the concept using the following five JSON keys. Each key must be populated with clear, concise information.
- For the "details_core_idea" key, provide a single, powerful sentence defining the concept's fundamental mechanism.
- For the "details_primary_goal" key, explain the specific problem the concept is designed to solve (e.g., its impact on generalization error vs. training error).
- For the "details_mechanism_bullets" key, you MUST provide a numbered, step-by-step explanation of how the concept works. This is the most important instruction. Each step in the process must have a clear, bolded title (e.g., "**Step 1: Linear Combination**", "**Step 2: Sigmoid Transformation**"). Within each step, provide a concise explanation of what occurs and include any relevant core formulas (using correct LaTeX) that apply to that specific stage.
- For the "details_parameters_bullets" key, identify the most important hyperparameters that control the concept. Try to cover a good number of parameters, the ones that are used in most cases and the ones that are good to know too. For each one, explain its purpose and the effect of setting it to high vs. low values.
- For the "details_tradeoffs_bullets" key, explain the direct consequences of using this concept, especially its impact on fundamental tradeoffs like the Bias-Variance Tradeoff.
`;

        const questionsInstruction = `\n- For any JSON key that includes the word "questions", you MUST return an array of simple strings. Each string should be a deep, thought-provoking question. Do NOT return an array of objects.`;

        const mathFormattingInstruction = `
        - **LaTeX Formatting for Formulas**: You MUST adhere to the following strict rules for all mathematical notation:
            1.  **Mandatory LaTeX**: You MUST format ANY and ALL mathematical variables (e.g., J, θ, λ), symbols, and equations using LaTeX. There are no exceptions.
            2.  **Proper Commands**: You MUST use proper LaTeX commands (e.g., \`\\theta\`, \`\\lambda\`, \`\\cdot\`). Do NOT use raw unicode characters (like θ, λ, ·).
            3.  **CRITICAL - NO PLAIN TEXT SYMBOLS**: You MUST NEVER write the names of Greek letters or other symbols as plain text inside a math block. For example, ALWAYS write \`$\lambda$\`. This is the most common mistake and you must avoid it.
            4.  **Correct Delimiters**: ALWAYS use dollar signs for math. NEVER use backticks (\`...\`) for mathematical content.
                - For **inline math** within a sentence (e.g., mentioning a variable like $J_{reg}$), you MUST wrap it in single dollar signs (\`$...\`).
                - For **defining equations** that are central to a concept's mechanism, you MUST display them as a block on their own line using double dollar signs (\`$$...$$\`).
            5.  **No Spaces Around Delimiters**: There MUST NOT be any space between the dollar sign delimiters and the start or end of the LaTeX content. For example, write \`$E=mc^2$\` instead of \`$ E=mc^2 $\`.
            6.  **Separate Text**: Keep explanatory text (e.g., "New Loss =", "Where:") **outside** of the dollar sign delimiters.
        `;

        // --- NEW: INSTRUCTION FOR RICH MARKDOWN FORMATTING ---
        const markdownFormattingInstruction = `\n- **Markdown Formatting**: Within the content for keys like "details_bullets", you MUST use Markdown to improve readability and structure. Use **bolding** to emphasize key terms that introduce a concept. When a bullet point has sub-points or examples, you MUST indent them to create a clear visual hierarchy.`;
        
        const bulletPointInstruction = `
        - **Bulleted List Logic**: For any JSON key that ends in '_bullets', you MUST return an array of objects. Each object must have a "content" key. For nested items, the parent object should also have a "children" key, which contains another array of these objects.
        - Example Structure:
        \`\`\`json
        [
            {
                "content": "The new regularized cost function, $J_{reg}(\\theta)$, is defined as:",
                "children": [
                {
                    "content": "$$J_{reg}(\\theta) = J(\\theta) + \\lambda \\sum_{j=1}^{n} |\\theta_j|$$"
                },
                {
                    "content": "Where:",
                    "children": [
                    {
                        "content": "$J(\\theta)$ is the original cost function (e.g., Mean Squared Error)."
                    },
                    {
                        "content": "$\\lambda$ is the regularization parameter that controls the strength of the penalty."
                    },
                    {
                        "content": "$\\sum_{j=1}^{n} |\\theta_j|$ is the L1 penalty, which is the sum of the absolute values of the coefficients (the L1 norm of the coefficient vector)."
                    }
                    ]
                }
                ]
            }
        ]
        \`\`\`
        `;


        const connectionInstructions = `
- **Connection Logic**: Your most important task is to create a rich, interconnected knowledge graph. For any "connection" field, do not just list the links. Instead, you MUST write a descriptive sentence that explains the relationship between the concepts, embedding the wikilink within that sentence.
    - Use bolded labels to categorize the relationship where appropriate (e.g., "**Part Of:**", "**Prerequisite For:**", "**Solves Problem:**" , "**Impacts:**", "**Example Of:**", "**Contrasts With:**", "**Built Upon:**", "**Alternative To:**").  This is the most important part of your task.
    - After the label, you MUST write a concise explanation of the relationship and embed the relevant [[wikilink]] within that explanation.
- **Use Aliased Wikilinks**: To ensure the sentences read naturally, you MUST use aliased wikilinks with the format \`[[Full Note Name|Display Text]]\`. The display text should be the simple concept name in lowercase.
    - **Example**: Instead of writing "...combats [[ML - Overfitting]]", you MUST write "...combats [[ML - Overfitting|overfitting]]".
- **Hierarchical Context**
    - If filling "connections_parent", use the parent from the Hierarchical Context.
    - If filling "connections_children", use the children from the Hierarchical Context.
    - If filling "connections_related" or "connections_other_fundamentals", you must intelligently identify and link to other relevant concepts, describing the nature of the relationship (e.g., "Contrasts With:", "Built Upon:"). This is the most important part of your task.
- For the "related_links_for_yaml" key, you MUST provide a simple array of 10-15 note titles that strictly follow the user's naming convention ("Subject - Concept" e.g., "ML - Logistic Regression", "Fundamental - Statistics")`;

        // --- FIX: The main preamble has been clarified to be more specific about data types. ---
        
        return `You are an expert knowledge architect. Your task is to generate the structured content for a note of type "${noteType}".
You MUST return a single, valid JSON object with the exact keys listed below.

Essential Context: This note must be based on the following summary: "${context}".
${hierarchicalContext ? `\nHierarchical Context: You MUST use the following information to form the connections.${hierarchicalContext}` : ''}

CRITICAL INSTRUCTIONS FOR JSON STRUCTURE:
- **All keys listed below are mandatory**. If you do not have relevant information for a key, return an empty string "" or an empty array []. DO NOT omit keys.
- **Data Types are Strict**:
    - For any key ending in '_bullets', you MUST follow the nested object structure defined in the 'Bulleted List Logic'.
    - For any key containing 'connection' or 'questions', the value MUST be an array of simple strings.
- **VALID JSON IS REQUIRED**: All backslashes (\\) in your response, especially in LaTeX, MUST be properly escaped (e.g., "$\\lambda$").

--- PROMPT DETAILS ---
${relatedFieldInstruction}
${namingConventionInstruction}
${newFieldInstructions}
${keywordInstruction}
${markdownFormattingInstruction}
${connectionInstructions}
${detailedContentInstructions}
${bulletPointInstruction}
${mathFormattingInstruction}
${questionsInstruction}

The required JSON keys are:
${fieldsList}
`;
    }

    /**
     * A universal template populator. It takes a template string and a data object,
     * and replaces any {{key}} with the corresponding data[key] value.
     */

    private formatNestedList(items: any[], level = 0): string {
        let result = [];
        const indent = '  '.repeat(level); // Two spaces for each level of indentation
        for (const item of items) {
            if (typeof item === 'object' && item !== null && item.content) {
                result.push(`${indent}- ${item.content}`);
                if (Array.isArray(item.children) && item.children.length > 0) {
                    // Recursively call for children with an increased indent level
                    result.push(this.formatNestedList(item.children, level + 1));
                }
            } else {
                // Fallback for simple string arrays
                result.push(`${indent}- ${String(item)}`);
            }
        }
        return result.join('\n');
    }
    
    private populateTemplate(templateContent: string, data: Record<string, any>): string {
        let populatedContent = templateContent;
        for (const key in data) {
            const placeholder = `{{${key}}}`;
            const placeholderRegex = new RegExp(placeholder, 'gi');
            let replacement = data[key];

            if (replacement === null || replacement === undefined) {
                replacement = '';
            }

            const keyLower = key.toLowerCase();

            if (Array.isArray(replacement)) {
                // FIX: This logic is now clearer and correctly handles all cases.
                if (keyLower === 'tags_yaml') {
                    // Format simple YAML lists (like tags)
                    replacement = "\n" + replacement.map(item => `  - ${String(item)}`).join("\n");
                } else if (keyLower === 'source' || keyLower === 'related') {
                    // Format YAML lists of wikilinks
                    if (replacement.length === 0) {
                        replacement = ''; // Ensure empty arrays result in an empty value
                    } else {
                        replacement = "\n" + replacement.map(item => {
                            const cleanedLink = String(item).replace(/["\[\]]/g, '');
                            return `  - "[[${cleanedLink}]]"`;
                        }).join("\n");
                    }

                // Logic for nested Markdown lists in the note body
                } else if (keyLower.includes('_bullets')) {
                    replacement = this.formatNestedList(replacement);
                
                // Fallback for simple Markdown lists in the note body
                } else { 
                    replacement = replacement.map(item => {
                        let lineContent = '';
                        if (typeof item === 'object' && item !== null) {
                            const firstValue = Object.values(item).find(val => typeof val === 'string');
                            lineContent = firstValue || String(item);
                        } else {
                            lineContent = String(item);
                        }
                        return `- ${lineContent}`;
                    }).join('\n');
                }
            }

            populatedContent = populatedContent.replace(new RegExp(placeholder, 'gi'), String(replacement));
        }
        return populatedContent.replace(/\{\{.*?\}\}/g, '');
    }

    async generateNotesFromPlan(plan_file_path: string | undefined, progressCallback: (update: string) => void): Promise<string> {
        
        const startTime = Date.now();
        let planFile: TFile | null = null;

        if (plan_file_path) {
            const file = this.fileService.getAbstractFileByPath(plan_file_path);
            if (file instanceof TFile) {
                planFile = file;
            } else { return `Error: Plan file not found at path "${plan_file_path}".`; }
        } else { return "Error: No plan file was specified or active."; }
        
        const planContent = await this.fileService.readFile(planFile);
        const fileCache = this.app.metadataCache.getFileCache(planFile);
        const mainTopic = fileCache?.frontmatter?.main_topic?.toLowerCase().replace(/\s+/g, '-') || 'general';
        
        let sourceFromPlan: string[] = [];
        const sourceFromFile = fileCache?.frontmatter?.source;
        if (Array.isArray(sourceFromFile)) {
            sourceFromPlan = sourceFromFile;
        } else if (sourceFromFile) {
            // Clean up the source string to be a clean value
            sourceFromPlan = [String(sourceFromFile).replace(/["\[\]]/g, '')];
        }

        const taskRegex = /^- \*\*(.*?)\*\* \`\((.*?)\)\`\n\s+-\s*\*(.*?)\*/gm;
        const proposals = [...planContent.matchAll(taskRegex)];

        if (proposals.length === 0) return "No pending notes with descriptions found.";
        
        progressCallback(`Found ${proposals.length} notes to generate...`);
        
        let generatedCount = 0;
        const generatedNoteLinks: string[] = [];
        let noteIndex = 0;
        const newStructuralNotes: string[] = [];

        for (const proposal of proposals) {
            noteIndex++;
            const title = proposal[1];
            const type = proposal[2].trim();
            const context = proposal[3];
            
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
                new Notice(`Skipping "${title}": Template not found for type "${type}".`);
                continue;
            }

            try {
                const templateContent = await this.fileService.readFile(templateFile);
                const placeholders = this.extractPlaceholders(templateContent);
                const aiPlaceholders = placeholders.filter(p => !['title', 'source', 'tags_yaml'].includes(p.toLowerCase()));
                const dynamicPrompt = this.createDynamicNotePrompt(type, context, aiPlaceholders, parent, children);
                
                const model = this.genAI.getGenerativeModel({ model: this.settings.model, generationConfig: { temperature: 0.05 } });
                const result = await this.makeApiCallWithRetry(() => model.generateContent(dynamicPrompt));
                const rawResponse = result.response.text();
                let jsonText = rawResponse;
                const jsonMatch = rawResponse.match(/```json\n([\s\S]*?)\n```/);
                if (jsonMatch && jsonMatch[1]) { jsonText = jsonMatch[1]; } 
                else { jsonText = rawResponse.replace(/```/g, "").trim(); }
                jsonText = jsonText.replace(/(?<!\\)\\(?!["\\/bfnrt])/g, "\\\\");
                const aiJson = JSON.parse(jsonText);
                const validatedData = noteSchema.parse(aiJson); // This will throw an error if data is invalid
                
                // --- THIS IS THE NEW, CLEAN DATA PREPARATION ---
                // We only prepare raw data arrays and strings here. No formatting.
                aiJson.title = title;
                aiJson.source = sourceFromPlan;
                aiJson.related = aiJson.related_links_for_yaml || [];
                const structuralTag = type.toLowerCase().replace(/\s+/g, '-');
                const keywordTags = aiJson.tags_keywords || [];
                aiJson.tags_yaml = [...new Set([structuralTag, mainTopic, ...keywordTags, 'concept'])];

                // Let populateTemplate do all the formatting work.
                const finalContent = this.populateTemplate(templateContent, aiJson);

                const sanitizedTitle = title.replace(/[\\/:?*\"<>|]/g, "");
                const noteFileName = `${sanitizedTitle}.md`;
                const noteFilePath = `${this.settings.draftsFolderPath}/${noteFileName}`;
                await this.fileService.createFile(noteFilePath, finalContent);

                generatedCount++;
                generatedNoteLinks.push(`[[${noteFilePath}|${sanitizedTitle}]]`);
                const lowerCaseType = type.toLowerCase();
                if (lowerCaseType === 'fundamental' || lowerCaseType === 'major-core') {
                    newStructuralNotes.push(`[[${noteFilePath}|${title}]]`);
                }

            } catch (e) {
                if (e instanceof z.ZodError) {
                    console.error("AI response failed schema validation:", e.errors);
                    new Notice(`Error for "${title}": AI response was missing required data. Skipping.`);
                } else {
                    console.error(`Failed to generate note for "${title}":`, e);
                    new Notice(`Error generating note: ${title}. Check console.`);
                }
                continue; // Skip to the next note in the loop
            }
        }
        
        if (newStructuralNotes.length > 0) {
            const mapFilePath = `${this.settings.draftsFolderPath}/${HIERARCHY_MAP_FILE_NAME}`;
            const mapFile = this.fileService.getAbstractFileByPath(mapFilePath);
            if (mapFile && mapFile instanceof TFile) {
                await this.app.vault.append(mapFile, '\n' + newStructuralNotes.join('\n'));
                await this.logActivity(`Auto-updated Hierarchy Map with ${newStructuralNotes.length} new notes.`);
                new Notice("Hierarchy Map auto-updated!");
            }
        }
        
        const endTime = Date.now();
        const durationInSeconds = ((endTime - startTime) / 1000).toFixed(1);
        const logMessage = `Generated ${generatedCount} notes in ${durationInSeconds}s from plan "[[${planFile.path}]]":${generatedNoteLinks.map(l => `\n\t- ${l}`).join("")}`;
        await this.logActivity(logMessage);

        const noteSchema = z.object({
            concept_name: z.string().min(1),
            summary_analogy: z.string().min(1),
            details_mechanism_bullets: z.array(z.object({
                content: z.string(),
                children: z.array(z.any()).optional()
            })).min(1),
            // ... add other essential fields
        });

        return `Successfully generated ${generatedCount} notes in ${durationInSeconds} seconds.`;
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
