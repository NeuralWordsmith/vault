import { App, Plugin, PluginSettingTab, Setting, ItemView, WorkspaceLeaf, MarkdownRenderer } from 'obsidian';
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
    private chatMode: 'command' | 'chat' = 'command'; // Default to command mode

    constructor(leaf: WorkspaceLeaf, plugin: MyPlugin) {
        super(leaf);
        this.plugin = plugin;
    }

    getViewType() { return AGENT_VIEW_TYPE; }
    getDisplayText() { return "Second Brain"; } // Changed the display name

    private setButtonIcon() {
        // Sets the icon and tooltip based on the current mode
        if (this.chatMode === 'command') {
            this.modeToggleButton.setText('🧠');
            this.modeToggleButton.setAttribute('aria-label', 'Switch to Chat Mode');
        } else {
            this.modeToggleButton.setText('💬');
            this.modeToggleButton.setAttribute('aria-label', 'Switch to Command Mode');
        }
    }

    async onOpen() {
        const container = this.containerEl.children[1];
        container.empty();
        container.addClass("gemini-agent-container");

        const viewHeader = container.createEl("div", { cls: "gemini-agent-header" });
        viewHeader.createEl("h4", { text: "Second Brain" }); // Changed the header text
        
        this.chatContainer = container.createEl("div", { cls: "gemini-agent-messages" });

        const inputContainer = container.createEl("div", { cls: "gemini-agent-input-container" });

        // Add the toggle button BEFORE the input field
        this.modeToggleButton = inputContainer.createEl('button', { cls: 'gemini-agent-mode-toggle' });
        this.setButtonIcon(); // Set initial icon

        this.modeToggleButton.addEventListener('click', () => {
            // Toggle the mode and update the button
            this.chatMode = this.chatMode === 'command' ? 'chat' : 'command';
            this.setButtonIcon();
            this.inputEl.focus(); // Keep focus on the input
        });

        this.inputEl = inputContainer.createEl("input", {
            type: "text",
            placeholder: "Chat with your vault...",
            cls: "gemini-agent-input"
        });

        this.inputEl.addEventListener("keydown", async (event) => {
            if (event.key === "Enter" && this.inputEl.value.trim() !== "") {
                const userMessage = this.inputEl.value.trim();
                this.inputEl.value = "";
                this.addMessage("user", userMessage);

                if (this.plugin.agent) {
                    // --- THIS IS THE KEY CHANGE ---
                    // 1. Capture the active file's path at the exact moment of execution.
                    const activeFile = this.plugin.app.workspace.getActiveFile();
                    const activeFilePath = activeFile ? activeFile.path : null;
                    
                    // 2. Pass the captured path to the agent's run method.
                    await this.plugin.agent.run(userMessage, this, this.chatMode, activeFilePath);
                }
            }
        });
        
        this.addMessage("model", "Hello! I'm your Obsidian Agent. How can I help you manage your knowledge base today?");
    }

    // No changes needed for addMessage or removeThinkingMessage
    async addMessage(role: 'user' | 'model' | 'system', text: string, isThinking: boolean = false) {
        const messageEl = this.chatContainer.createEl("div", { cls: `gemini-agent-message ${role}` });
        if (role !== 'model' || isThinking) {
            messageEl.setText(text);
        } else {
            await MarkdownRenderer.renderMarkdown(text, messageEl, '', this.plugin);
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

    // Add this new function below removeThinkingMessage()
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
                        this.plugin.onload(); 
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