import { App, Plugin, PluginSettingTab, Setting, ItemView, WorkspaceLeaf, MarkdownRenderer, TFolder, Notice } from 'obsidian';
import { Agent } from './Agent';
import { FileService } from './FileService';

const DEFAULT_SETTINGS = {
    geminiApiKey: '',
    model: 'gemini-2.5-pro',
    draftsFolderPath: 'Gemini Drafts',
    plansFolderPath: 'Gemini Drafts/Plans',
    templatesFolderPath: '00 Inbox/00 Templates',
};

const AGENT_VIEW_TYPE = "gemini-agent-chat-view";

export class AgentChatView extends ItemView {
    private chatContainer: HTMLElement;
    private inputEl: HTMLInputElement;
    private plugin: MyPlugin;
    private modeToggleButton: HTMLElement;
    private mode: 'command' | 'log' = 'command'; // Default to command mode
    private inputContainer: HTMLElement;

    constructor(leaf: WorkspaceLeaf, plugin: MyPlugin) {
        super(leaf);
        this.plugin = plugin;
    }

    getViewType() { return AGENT_VIEW_TYPE; }
    getDisplayText() { return "what's happening? 📜"; }

    private _updateUIForMode() {
        if (this.mode === 'log') {
            this.containerEl.addClass('is-log-mode');
            this.modeToggleButton.setText('🧠');
            this.modeToggleButton.setAttribute('aria-label', 'Switch to Command Mode');
            this.inputContainer.style.display = 'none'; // Hide input
        } else { // command mode
            this.containerEl.removeClass('is-log-mode');
            this.modeToggleButton.setText('📜');
            this.modeToggleButton.setAttribute('aria-label', 'Switch to Log Mode');
            this.inputContainer.style.display = ''; // Show input
            this.inputEl.focus();
        }
    }

    // Public method for the Super-Command to call
    public switchToLogMode() {
        this.mode = 'log';
        this.chatContainer.empty(); // Clear previous logs
        this.addMessage('system', 'Starting full workflow...');
        this._updateUIForMode();
    }

    async onOpen() {
        const container = this.containerEl.children[1];
        container.empty();
        container.addClass("gemini-agent-container");

        const viewHeader = container.createEl("div", { cls: "gemini-agent-header" });
        viewHeader.createEl("h4", { text: "Gemini Agent" });
        
        this.chatContainer = container.createEl("div", { cls: "gemini-agent-messages" });

        this.inputContainer = container.createEl("div", { cls: "gemini-agent-input-container" });

        this.modeToggleButton = this.inputContainer.createEl('button', { cls: 'gemini-agent-mode-toggle' });
        this.modeToggleButton.addEventListener('click', () => {
            this.mode = this.mode === 'command' ? 'log' : 'command';
            this._updateUIForMode();
        });

        this.inputEl = this.inputContainer.createEl("input", {
            type: "text",
            placeholder: "Run a command on your vault...",
            cls: "gemini-agent-input"
        });

        // This is the original input handler for command mode
        this.inputEl.addEventListener("keydown", async (event) => {
            if (event.key === "Enter" && this.inputEl.value.trim() !== "") {
                const userMessage = this.inputEl.value.trim();
                this.inputEl.value = "";
                this.addMessage("user", userMessage);

                if (this.plugin.agent) {
                    const activeFile = this.plugin.app.workspace.getActiveFile();
                    const activeFilePath = activeFile ? activeFile.path : null;
                    await this.plugin.agent.run(userMessage, this, 'command', activeFilePath);
                }
            }
        });

        this._updateUIForMode(); // Set initial state
        this.addMessage("system", "Ready for commands.");
    }
    
    // Add 'log' to the list of roles
    async addMessage(role: 'user' | 'model' | 'system' | 'log', text: string, isThinking: boolean = false) {
        const messageEl = this.chatContainer.createEl("div", { cls: `gemini-agent-message ${role}` });

        if ((role === 'log' || role === 'model') && !isThinking) {
            // MODIFIED: We now render 'log' messages as Markdown.
            // This lets us use blockquotes (>) for the command-prompt
            // style and also renders our final list of links.
            await MarkdownRenderer.renderMarkdown(text, messageEl, '', this);
        
        } else {
            // This is for 'user', 'system', or 'thinking' messages
            messageEl.setText(text);
        }

        if (isThinking) {
            messageEl.addClass("thinking");
        }
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
        return messageEl;
    }

    removeThinkingMessage() {
        this.chatContainer.querySelector(".thinking")?.remove();
    }

    updateThinkingMessage(text: string) {
        const thinkingEl = this.chatContainer.querySelector(".thinking");
        if (thinkingEl) {
            thinkingEl.setText(text);
        }
    }
}

export default class MyPlugin extends Plugin {
    settings: typeof DEFAULT_SETTINGS;
    agent: Agent;
    genAI: any;

    async onload() {
        await this.loadSettings();

        // Initialize GenAI library
        if (this.settings.geminiApiKey) {
            try {
                const genAIModule = await import("https://esm.sh/@google/generative-ai@0.14.1");
                this.genAI = new genAIModule.GoogleGenerativeAI(this.settings.geminiApiKey);
            } catch(e) {
                console.error("Failed to load Google Generative AI module", e);
            }
        }
        
        // Wire up our refactored classes
        const fileService = new FileService(this.app);
        this.agent = new Agent(this.app, this.settings, this.genAI, fileService);
        await this.agent.initialize();

        this.registerView(
            AGENT_VIEW_TYPE,
            (leaf) => new AgentChatView(leaf, this)
        );

        this.addRibbonIcon("brain-circuit", "Open Gemini Agent", () => {
            this.activateView();
        });

        // ===================================================================
        // --- NEW COMMAND 1: GENERATE PLAN (FINAL VERSION) ---
        // ===================================================================
        this.addCommand({
            id: 'gemini-agent-create-plan',
            name: 'Create note plan from active file',
            editorCallback: async (editor, view) => {
                const file = view.file;
                if (!file) { new Notice("Error: No active file."); return; }

                //this.activateView();
                //await sleep(100);
                const agentView = this.app.workspace.getLeavesOfType(AGENT_VIEW_TYPE)[0]?.view;

                if (agentView instanceof AgentChatView) {
                    agentView.switchToLogMode();
                    const progressCallback = (update: string) => agentView.addMessage('log', update);
                    
                    try {
                        const result = await this.agent.toolManager.createNotePlan(file.path, progressCallback);
                        agentView.addMessage('log', `${result}`);
                    } catch (e) {
                        agentView.addMessage('log', `❌ Error: ${e.message}`);
                    }

                } else {
                    // Fallback to notice if the view isn't open
                    const notice = new Notice('Sending to Gemini for planning...', 0);
                    const progressCallback = (update: string) => notice.setMessage(update);
                    const result = await this.agent.toolManager.createNotePlan(file.path, progressCallback);
                    notice.setMessage(result);
                    setTimeout(() => notice.hide(), 7000);
                }
            }
        });

        // ===================================================================
        // --- NEW COMMAND 2: GENERATE NOTES (FINAL VERSION) ---
        // ===================================================================
        this.addCommand({
            id: 'gemini-agent-generate-notes',
            name: 'Gemini: Generate notes from plan',
            editorCallback: async (editor, view) => {
                const file = view.file;
                if (!file) { new Notice("Error: No active plan file."); return; }
                
                //this.activateView();
                //await sleep(100);
                const agentView = this.app.workspace.getLeavesOfType(AGENT_VIEW_TYPE)[0]?.view;

                if (agentView instanceof AgentChatView) {
                    agentView.switchToLogMode();
                    const progressCallback = (update: string) => agentView.addMessage('log', update);

                    try {
                        // This now triggers the entire combined workflow
                        await this.agent.toolManager.generateNotesFromPlan(file.path, progressCallback);
                    } catch (e) {
                        agentView.addMessage('log', `❌ Error: ${e.message}`);
                    }
                } else {
                    // Fallback to notice if the view isn't open
                    const notice = new Notice('Starting note generation...', 0);
                    const progressCallback = (update: string) => notice.setMessage(update);
                    const result = await this.agent.toolManager.generateNotesFromPlan(file.path, progressCallback);
                    notice.setMessage(result);
                    setTimeout(() => notice.hide(), 7000);
                }
            }
        });

        this.addCommand({
            id: 'gemini-agent-review-synthesis',
            name: 'Review synthesis in active note',
            editorCallback: async (editor, view) => {
                const file = view.file;
                if (this.agent && file) {
                    new Notice("🤖 Gemini is reviewing your synthesis...");
                    // This directly calls the smart function in your ToolManager
                    const result = await this.agent.toolManager.reviewAnswersInPlan(file);
                    new Notice(result); // Shows a final "Success!" or error message
                }
            }
        });

        this.addSettingTab(new GeminiSettingTab(this.app, this));

        this.addCommand({
            id: 'gemini-agent-update-hierarchy-map',
            name: 'Update knowledge hierarchy map',
            callback: async () => {
                if (this.agent) {
                    // We need to access the function through the agent's toolManager instance
                    const result = await this.agent.toolManager.updateHierarchyMap();
                    new Notice(result);
                }
            }
        });

        this.addCommand({
            id: 'gemini-update-related-links-log',
            name: "Update 'related' links log",
            callback: async () => {
                if (this.agent) {
                    const notice = new Notice('Updating links log...', 0);
                    const progressCallback = (update: string) => notice.setMessage(update);
                    try {
                        const result = await this.agent.toolManager.updateRelatedLinksLog(progressCallback);
                        notice.setMessage(result);
                        setTimeout(() => notice.hide(), 7000);
                    } catch (err) {
                        notice.setMessage(`Error: ${err.message}`);
                        setTimeout(() => notice.hide(), 7000);
                    }
                }
            }
        });

        // --- UPDATED COMMAND 2: CREATE/UPDATE SORTED VIEW ---
        this.addCommand({
            id: 'gemini-create-categorized-links-view',
            name: "Create/Update categorized 'related' links view",
            callback: async () => {
                if (this.agent) {
                    new Notice("Generating categorized view from log...");
                    const result = await this.agent.toolManager.createCategorizedLinksView();
                    new Notice(result, 7000);
                }
            }
        });

        this.addCommand({
            id: 'gemini-run-full-workflow',
            name: 'Run Full Post-Processing Workflow',
            callback: async () => {
                // Ensure the agent view is active
                this.activateView();
                
                // A brief delay to allow the view to render if it wasn't open
                await sleep(100); 

                const view = this.app.workspace.getLeavesOfType(AGENT_VIEW_TYPE)[0]?.view;

                if (!(view instanceof AgentChatView)) {
                    new Notice("Error: Could not find the Gemini Agent panel. Please open it and try again.");
                    return;
                }
                
                // Switch the panel to log mode
                view.switchToLogMode();

                const progressCallback = (update: string) => {
                    view.addMessage('log', update);
                };
                
                // This command is a simple wrapper around the ToolManager function.
                this.agent.toolManager.runFullEnhancementWorkflow(progressCallback);
                new Notice("Full workflow started! Check the Gemini Agent panel for progress.");
            }
        });
    }
    
    onunload() {
        this.app.workspace.detachLeavesOfType(AGENT_VIEW_TYPE);
    }

    async activateView() {
        this.app.workspace.detachLeavesOfType(AGENT_VIEW_TYPE);
        await this.app.workspace.getRightLeaf(false).setViewState({
            type: AGENT_VIEW_TYPE,
            active: true,
        });
        this.app.workspace.revealLeaf(
            this.app.workspace.getLeavesOfType(AGENT_VIEW_TYPE)[0]
        );
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    async reinitializeAgent() {
        if (this.settings.geminiApiKey) {
            try {
                // Re-import the module and re-create the genAI instance
                const genAIModule = await import("https://esm.sh/@google/generative-ai@0.14.1");
                this.genAI = new genAIModule.GoogleGenerativeAI(this.settings.geminiApiKey);
                
                // Re-create the agent with the new genAI instance
                const fileService = new FileService(this.app);
                this.agent = new Agent(this.app, this.settings, this.genAI, fileService);
                await this.agent.initialize();
                
                new Notice("Gemini Agent updated with new API key.");
            } catch(e) {
                console.error("Failed to re-initialize Google Generative AI module", e);
                new Notice("Failed to update agent. Check console for errors.");
            }
        }
    }

}

class GeminiSettingTab extends PluginSettingTab {
    // This class is also unchanged
    plugin: MyPlugin;
    constructor(app: App, plugin: MyPlugin) { super(app, plugin); this.plugin = plugin; }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();
        containerEl.createEl("h2", { text: "Gemini Agent Settings" });

        new Setting(containerEl)
            .setName('Gemini API Key')
            .setDesc('Your API key for the Google Gemini API.')
            .addText(text => {
                text.setPlaceholder('Enter API key').setValue(this.plugin.settings.geminiApiKey)
                    .onChange(async (value) => {
                        this.plugin.settings.geminiApiKey = value;
                        await this.plugin.saveSettings();
                        // Re-initialize the agent with the new key
                        await this.plugin.reinitializeAgent();
                    });
                text.inputEl.type = 'password';
            });
        
        new Setting(containerEl)
            .setName('AI Model Name')
            .setDesc('The Gemini model to use for the agent.')
            .addText(text => text
                .setPlaceholder('e.g., gemini-1.5-pro-latest')
                .setValue(this.plugin.settings.model)
                .onChange(async (value) => {
                    this.plugin.settings.model = value.trim();
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Drafts Folder Path')
            .setDesc('Folder for newly generated atomic notes and the log file.')
            .addText(text => text
                .setPlaceholder('Example: Gemini Drafts')
                .setValue(this.plugin.settings.draftsFolderPath)
                .onChange(async (value) => {
                    this.plugin.settings.draftsFolderPath = value.trim();
                    await this.plugin.saveSettings();
                }));
        new Setting(containerEl)
            .setName('Plans Folder Path')
            .setDesc('Folder for the generated review and plan notes.')
            .addText(text => text
                .setPlaceholder('Example: Gemini Plans')
                .setValue(this.plugin.settings.plansFolderPath)
                .onChange(async (value) => {
                    this.plugin.settings.plansFolderPath = value.trim();
                    await this.plugin.saveSettings();
                }));
        new Setting(containerEl)
            .setName('Templates Folder Path')
            .setDesc('Path to the folder containing your note templates.')
            .addText(text => text
                .setPlaceholder('Example: 00 Inbox/00 Templates')
                .setValue(this.plugin.settings.templatesFolderPath)
                .onChange(async (value) => {
                    this.plugin.settings.templatesFolderPath = value.trim();
                    await this.plugin.saveSettings();
                }));
            }
}

import { App, TFolder, FuzzySuggestModal } from 'obsidian';

class FolderSuggestModal extends FuzzySuggestModal<TFolder> {
    folders: TFolder[];
    onChoose: (folder: TFolder) => void;

    constructor(app: App, folders: TFolder[], onChoose: (folder: TFolder) => void) {
        super(app);
        this.folders = folders;
        this.onChoose = onChoose;
    }

    getItems(): TFolder[] {
        return this.folders;
    }

    getItemText(folder: TFolder): string {
        return folder.path;
    }

    onChooseItem(folder: TFolder, evt: MouseEvent | KeyboardEvent): void {
        this.onChoose(folder);
    }
}