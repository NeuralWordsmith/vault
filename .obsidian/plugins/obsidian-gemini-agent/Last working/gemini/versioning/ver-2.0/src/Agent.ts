import { App } from 'obsidian';
import { ToolManager } from './ToolManager';
import { FileService } from './FileService';
import { AgentChatView } from './main'; // This is a forward reference to the view class in main.ts

export class Agent {
    private app: App;
    private settings: any;
    private genAI: any;
    private toolManager: ToolManager;
    private chat: any | null = null;
    private HarmCategory: any;
    private HarmBlockThreshold: any;

    constructor(app: App, settings: any, genAI: any, fileService: FileService) {
        this.app = app;
        this.settings = settings;
        this.genAI = genAI;
        // The Agent creates its own ToolManager, passing along the dependencies
        this.toolManager = new ToolManager(app, genAI, settings, fileService);
    }

    async initialize() {
        // The dynamic import logic is now in main.ts
        // We just need to check if genAI was passed in correctly
        if (this.genAI && !this.chat) {
            try {
                // We'll get these from the genAI instance
                const genAIModule = await import("https://esm.sh/@google/generative-ai@0.14.1");
                this.HarmCategory = genAIModule.HarmCategory;
                this.HarmBlockThreshold = genAIModule.HarmBlockThreshold;
                this.startChatSession();
            } catch (e) {
                console.error("Failed to initialize Google Generative AI:", e);
            }
        }
    }

    startChatSession() {
        const model = this.genAI.getGenerativeModel({
            model: this.settings.model,
            systemInstruction: `You are an expert AI assistant for Obsidian. Your primary purpose is to help users process their raw notes into structured, atomic notes. You operate in a two-phase workflow: Plan, then Generate.
            1. **Plan Phase**: When the user asks you to 'review' or 'plan' a note, you MUST use the \`Notes_plan\` tool.
            2. **Generate Phase**: When the user asks you to 'generate' notes from a plan, you MUST use the \`generate_notes_from_plan\` tool.
            Use the \`log_activity\` tool for any other significant actions or errors.`
        });
        
        this.chat = model.startChat({
            tools: this.getToolDeclarations(),
            safetySettings: [
                { category: this.HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: this.HarmBlockThreshold.BLOCK_NONE },
            ]
        });
    }
    
    // This function returns an object of executable functions
    private getTools(activeFilePath: string | null, progressCallback: (update: string) => void) {
        return {
            log_activity: (args: { message: string }) => this.toolManager.logActivity(args.message),
            create_note_plan: () => this.toolManager.createNotePlan(activeFilePath, progressCallback),
            // This now also passes the progress callback to the generation function
            generate_notes_from_plan: (args: { plan_file_path?: string }) => {
                // New Logic: Use the path from the AI's arguments if it exists.
                // If not, fall back to the file that was active when the command was run.
                const targetPlanPath = args.plan_file_path || activeFilePath;
                return this.toolManager.generateNotesFromPlan(targetPlanPath, progressCallback);
            }
        };
    }

    // This function returns the schema for the tools
    private getToolDeclarations() {
        return {
            functionDeclarations: [
                {
                    name: "log_activity",
                    description: "Records a message with a timestamp to a central log file. Use this to report successful actions or errors.",
                    parameters: { type: "OBJECT", properties: { message: { type: "STRING", description: "The message to log." } }, required: ["message"] }
                },
                {
                    name: "create_note_plan",
                    description: "Phase 1: Reads the user's currently active raw note, analyzes the content, and creates a new 'Plan' note containing AI feedback and a checklist for generation.",
                    parameters: { type: "OBJECT", properties: {} }
                },
                {
                    name: "generate_notes_from_plan",
                    description: "Phase 2: Generates atomic notes from a plan file. If a file path is provided, it uses that file. If not, it uses the currently active note as the plan.",
                    parameters: { type: "OBJECT", properties: { plan_file_path: { type: "STRING", description: "The optional full path to the plan note to be executed." } } }
                }
            ]
        };
    }

    // In Agent.ts

    async run(userInput: string, view: AgentChatView, mode: 'command' | 'chat', activeFilePath: string | null) {
        if (!this.chat) {
            await this.initialize();
            if (!this.chat) {
                view.addMessage("system", "Agent not initialized. Please configure your Gemini API key in settings.");
                return;
            }
        }
        
        const thinkingMessage = view.addMessage("model", "Thinking...", true);
        // Create the callback function that will update the UI
        const progressCallback = (update: string) => view.updateThinkingMessage(update);

        try {
            if (mode === 'chat') {
                const model = this.genAI.getGenerativeModel({ model: this.settings.model });
                const result = await model.generateContent(userInput);
                
                view.removeThinkingMessage();
                view.addMessage("model", result.response.text());

            } else { // mode === 'command'
                let result = await this.chat.sendMessage(userInput);

                while (true) {
                    const functionCalls = result.response.functionCalls();
                    if (!functionCalls || functionCalls.length === 0) break;
                    
                    // Pass the callback to get the correctly configured tools
                    const tools = this.getTools(activeFilePath, progressCallback);
                    const toolResults = await Promise.all(functionCalls.map(async (call) => {
                        const toolFunction = tools[call.name as keyof typeof tools];
                        const toolResult = await toolFunction(call.args);
                        return { functionResponse: { name: call.name, response: { content: toolResult } } };
                    }));

                    result = await this.chat.sendMessage(JSON.stringify(toolResults));
                }
                
                view.removeThinkingMessage();
                view.addMessage("model", result.response.text());
            }
        } catch (error) {
            console.error("Gemini Agent Error:", error);
            view.removeThinkingMessage();
            view.addMessage("system", `An error occurred: ${error.message}`);
        }
    }
}