import { App, Notice, TFile } from 'obsidian';
import { FileService } from './FileService';
import { createNotePlanPrompt, generateNoteContentPrompt } from './PromptFactory';

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

    // In ToolManager.ts

    async createNotePlan(targetFilePath: string | null, progressCallback: (update: string) => void): Promise<string> {
        // 1. Check if a valid file path was provided.
        if (!targetFilePath) {
            return "Error: Could not determine the target file when the command was run.";
        }

        const file = this.app.vault.getAbstractFileByPath(targetFilePath);
        if (!(file instanceof TFile)) {
            return `Error: Target file not found at path "${targetFilePath}".`;
        }
        const targetFile = file;

        // Report Progress 1
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
        
        const model = this.genAI.getGenerativeModel({ model: this.settings.model });
        const prompt = createNotePlanPrompt(rawContent);

        try {
            // Report Progress 2 (The longest step)
            progressCallback("Sending content to Gemini for analysis...");
            const result = await model.generateContent(prompt);
            
            // Report Progress 3
            progressCallback("Received plan from Gemini. Parsing response...");
            const jsonText = result.response.text().replace(/```json/g, "").replace(/```/g, "").trim();
            const planData = JSON.parse(jsonText);

            // ... (rest of the content generation logic is unchanged)
            let reviewContent = `### Review of Your Raw Note\n\n${planData.review_intro}\n\n`;
            planData.review_points.forEach((point: any) => {
                reviewContent += `- **${point.concept}:** ${point.suggestion}\n`;
            });
            reviewContent += `\n---\n\n### Proposed Atomic Notes\n\n${planData.proposal_intro}\n\n`;
            planData.note_categories.forEach((cat: any) => {
                reviewContent += `#### ${cat.category_title}\n${cat.category_description}\n`;
                cat.notes.forEach((note: any) => {
                    reviewContent += `- \`${note.title}\`\n`;
                    if (note.description) {
                        reviewContent += `    - _${note.description}_\n`;
                    }
                });
                reviewContent += `\n`;
            });
            let checklistContent = `\n---\n\n### Actionable Checklist for Generation\n\n`;
            planData.checklist_notes.forEach((note: any) => {
                checklistContent += `- [ ] **${note.title}** \`(${note.type})\`\n`;
                checklistContent += `  - *${note.description}*\n`;
            });
            
            const finalPlanContent = reviewContent + checklistContent;
            const mainTopic = planData.plan_details.main_topic.replace(/[\\/:?*\"<>|]/g, "");
            const uniquePhrase = planData.plan_details.unique_phrase;
            const planFileName = `${mainTopic} - ${uniquePhrase}.md`;
            const planFilePath = `${this.settings.plansFolderPath}/${planFileName}`;

            // Report Progress 4
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

    // In ToolManager.ts

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
        const taskRegex = /^- \[ \] \*\*(.*?)\*\* \`\((.*?)\)\`\n\s+-\s*\*(.*?)\*/gm;
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
}