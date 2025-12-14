import { App, Notice, TFile } from 'obsidian';
import { FileService } from './FileService';
import { createNotePlanPrompt, generateNoteContentPrompt, createAnswerReviewPrompt, createKeywordExtractionPrompt } from './PromptFactory';

// We can define constants here for clarity
const LOG_FILE_NAME = "_Gemini Logs.md";

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
        
        // This includes our consistency setting from before
        const model = this.genAI.getGenerativeModel({
            model: this.settings.model,
            generationConfig: {
                temperature: 0.0,
            },
        });
        const prompt = createNotePlanPrompt(rawContent);

        try {
            progressCallback("Sending content to Gemini for analysis...");
            const result = await model.generateContent(prompt);
            
            progressCallback("Received plan from Gemini. Parsing response...");
            const jsonText = result.response.text().replace(/```json/g, "").replace(/```/g, "").trim();
            const planData = JSON.parse(jsonText);



            // --- NEW CONTENT ASSEMBLY LOGIC ---

            // 1. Build the Feedback & Synthesis Section
            let feedbackSection = `## Feedback & Synthesis\n---\n\n${planData.overall_feedback}\n\n`;
            planData.review_points.forEach((point: any) => {
                feedbackSection += `- **${point.concept}:** ${point.suggestion}\n`;
            });

            // 2. Build the Missing Connections Section
            let missingConnectionsSection = '';
            if (planData.missing_connections && planData.missing_connections.length > 0) {
                missingConnectionsSection = `\n\n---\n### Missing Connections\n\n_To build a deeper understanding, consider exploring these related topics:_\n\n`;
                planData.missing_connections.forEach((conn: string) => {
                    missingConnectionsSection += `- ${conn}\n`;
                });
            }

            // 3. Build the Proposed Atomic Notes Section (with Wikilinks)
            let proposalSection = `\n\n---\n### Proposed Atomic Notes\n\n`;
            planData.note_categories.forEach((cat: any) => {
                proposalSection += `**${cat.category_title}**\n${cat.category_description}\n`;
                cat.notes.forEach((note: any) => {
                    proposalSection += `\t- [[${note.title}]]\n`;
                });
                proposalSection += `\n`;
            });

            // 4. Build the Notes Plan Section (replaces checklist)
            let notesPlanSection = `\n---\n### Notes Plan\n\n`;
            planData.checklist_notes.forEach((note: any) => {
                notesPlanSection += `- **${note.title}** \`(${note.type})\`\n`;
                notesPlanSection += `\t- *${note.description}*\n`;
            });

            // 5. Build the Provocative Questions section (to be placed later)
            let questionsSection = '';
            if (planData.provocative_questions && planData.provocative_questions.length > 0) {
                questionsSection = `\n\n---\n### Provocative Questions\n\n_Ponder these questions to challenge your assumptions and synthesize the material:_\n\n`;
                planData.provocative_questions.forEach((q: string) => {
                    questionsSection += `- ? ${q}\n`;
                });
            }

            // 6. Define the new, static Synthesis Section
            const synthesisSection = `\n\n---\n\n## My Synthesis & Answers\n\n1. `;

            // 7. Assemble the final note in the correct order
            const finalPlanContent = 
                feedbackSection + 
                missingConnectionsSection + 
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
            
            const logMessage = `Created note plan for "[[${targetFile.path}|${targetFile.basename}]]". New plan is at "[[${planFilePath}|${planFileName}]]".`;
            await this.logActivity(logMessage);

            return `Plan created successfully! I've created a plan for you at: [[${planFilePath}|${planFileName}]]`;
        } catch (e) {
            console.error("Error creating note plan:", e);
            await this.logActivity(`ERROR: Failed to create note plan for "[[${targetFile.path}|${targetFile.basename}]]".`);
            return "Sorry, I encountered an error while analyzing the note. Please check the console.";
        }
    }

    async generateNotesFromPlan(plan_file_path: string | undefined, progressCallback: (update: string) => void): Promise<string> {
        let planFile: TFile | null = null;

        // The logic is now much simpler and safer.
        if (plan_file_path) {
            const file = this.fileService.getAbstractFileByPath(plan_file_path);
            if (file instanceof TFile) {
                planFile = file;
            } else {
                return `Error: Plan file not found at path "${plan_file_path}".`;
            }
        } else {
            // This is now the safe error message if no path could be determined.
            return "Error: No plan file was specified or active when the command was run.";
        }
        
        // ... the rest of the function remains exactly the same
        
        const planContent = await this.fileService.readFile(planFile);
        const taskRegex = /^- \*\*(.*?)\*\* \`\((.*?)\)\`\n\s+-\s*\*(.*?)\*/gm;
        const proposals = [...planContent.matchAll(taskRegex)];

        if (proposals.length === 0) return "No pending notes with descriptions found in the plan file.";
        
        progressCallback(`Found ${proposals.length} notes to generate...`);
        
        let generatedCount = 0;
        let generatedNoteLinks: string[] = [];
        let noteIndex = 0;

        for (const proposal of proposals) {
            noteIndex++;
            const title = proposal[1];
            const type = proposal[2].trim();
            const context = proposal[3];

            progressCallback(`[${noteIndex}/${proposals.length}] Generating: ${title}...`);

            let templatePath = "";
            const lowerCaseType = type.toLowerCase();
            if (lowerCaseType.includes("major core")) templatePath = `${this.settings.templatesFolderPath}/02 Major Core Concept Template.md`;
            else if (lowerCaseType.includes("core")) templatePath = `${this.settings.templatesFolderPath}/03 Core Concept Template.md`;
            else if (lowerCaseType.includes("process")) templatePath = `${this.settings.templatesFolderPath}/03 Core Concept Template.md`;
            else if (lowerCaseType.includes("fundamental")) templatePath = `${this.settings.templatesFolderPath}/01 Fundamental Concept Template.md`;
            else if (lowerCaseType.includes("question")) templatePath = `${this.settings.templatesFolderPath}/04 Question Note Template.md`;
            else {
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
                generatedNoteLinks.push(`[[${noteFilePath}|${noteFileName}]]`);

            } catch (e) {
                console.error(`Failed to generate note for "${title}":`, e);
                new Notice(`Error generating note: ${title}. Check console.`);
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