import { 
    App, 
    Plugin, 
    PluginSettingTab, 
    Setting, 
    ItemView, 
    WorkspaceLeaf, 
    MarkdownRenderer, 
    TFolder,
    TFile, 
    Notice,
    Editor,
    Menu,
    MarkdownView,
    FuzzySuggestModal
} from 'obsidian';
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
        viewHeader.createEl("h4", { text: "Rehoboam" });
        
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
    lastAutoOpenAt: number;
    autoOpenAbsorption: boolean;

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

        this.lastAutoOpenAt = 0; // number (ms)
        this.autoOpenAbsorption = true; // optional: make this configurable via settings

        this.registerView(
            AGENT_VIEW_TYPE,
            (leaf) => new AgentChatView(leaf, this)
        );

        this.addRibbonIcon("brain-circuit", "Open Rehoboam Agent", () => {
            this.activateView();
        });

        // ===================================================================
        // --- COMMAND 1: CREATE NOTE PLAN ---
        // ===================================================================
        this.addCommand({
            id: 'rehoboam-create-plan',
            name: 'Create - Note Plan from Active File',
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
                    const notice = new Notice('Sending to Rehoboam for planning...', 0);
                    const progressCallback = (update: string) => notice.setMessage(update);
                    const result = await this.agent.toolManager.createNotePlan(file.path, progressCallback);
                    notice.setMessage(result);
                    setTimeout(() => notice.hide(), 7000);
                }
            }
        });

        // ===================================================================
        // --- COMMAND 2: GENERATE ATOMIC NOTES ---
        // ===================================================================
        this.addCommand({
            id: 'rehoboam-generate-atomic-notes',
            name: 'Generate - Atomic Notes from Active Plan',
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

        // ===================================================================
        // --- COMMAND 3: REVIEW 'MY TAKE' ---
        // ===================================================================
        this.addCommand({
            id: 'rehoboam-review-my-take',
            name: "Review - 'My Take' in Active File",
            editorCallback: async (editor, view) => {
                const file = view.file;
                if (!file) { new Notice("Error: No active file."); return; }

                const notice = new Notice("Rehoboam is reviewing 'your Take'...", 0);
                try {
                    // This calls our new function in ToolManager
                    const result = await this.agent.toolManager.reviewMyTake(file);
                    notice.setMessage(result);
                    setTimeout(() => notice.hide(), 7000);

                } catch (e) {
                    console.error(e);
                    notice.setMessage(`Error: ${e.message}`);
                    setTimeout(() => notice.hide(), 7000);
                }
            }
        });

        // ===================================================================
        // --- COMMAND 4: REVIEW SYNTHESIS ---
        // ===================================================================

        this.addCommand({
            id: 'rehoboam-review-synthesis',
            name: 'Review - Synthesis in Active File',
            editorCallback: async (editor, view) => {
                const file = view.file;
                if (this.agent && file) {
                    new Notice("Rehoboam is reviewing your synthesis...");
                    // This directly calls the smart function in your ToolManager
                    const result = await this.agent.toolManager.reviewAnswersInPlan(file);
                    new Notice(result); // Shows a final "Success!" or error message
                }
            }
        });

        // ===================================================================
        // --- COMMAND 5: UPDATE HIERARCHY MAP ---
        // ===================================================================

        this.addCommand({
            id: 'rehoboam-update-hierarchy-map',
            name: 'Update - Knowledge Hierarchy Map',
            callback: async () => {
                if (this.agent) {
                    // We need to access the function through the agent's toolManager instance
                    const result = await this.agent.toolManager.updateHierarchyMap();
                    new Notice(result);
                }
            }
        });

        // ===================================================================
        // --- COMMAND 6: UPDATE LINKS LOG ---
        // ===================================================================

        this.addCommand({
            id: 'rehoboam-update-links-log',
            name: "Update - Related Links Log",
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

        // ===================================================================
        // --- COMMAND 7: CREATE LINKS VIEW ---
        // ===================================================================
        this.addCommand({
            id: 'rehoboam-create-links-view',
            name: "Create - Categorized Links View",
            callback: async () => {
                if (this.agent) {
                    new Notice("Generating categorized view from log...");
                    const result = await this.agent.toolManager.createCategorizedLinksView();
                    new Notice(result, 7000);
                }
            }
        });

        // ===================================================================
        // --- COMMAND 8: EXTRACT MATH MECHANISMS ---
        // ===================================================================
        this.addCommand({
            id: 'rehoboam-extract-math-mechanisms',
            name: "Extract - Math Mechanisms from Drafts",
            callback: async () => {
                if (!this.agent) return;
                const notice = new Notice('Scanning drafts for math mechanisms...', 0);
                const progressCallback = (update: string) => notice.setMessage(update);
                try {
                    const draftsFolder = this.settings.draftsFolderPath;
                    const result = await this.agent.toolManager.extractMechanismsForPlan(draftsFolder, progressCallback);
                    notice.setMessage(result);
                    setTimeout(() => notice.hide(), 7000);
                } catch (err) {
                    notice.setMessage(`Error: ${err.message}`);
                    setTimeout(() => notice.hide(), 7000);
                }
            }
        });

        // ===================================================================
        // --- COMMAND 9: CREATE MATH PLAN ---
        // ===================================================================
        this.addCommand({
            id: 'rehoboam-create-math-plan',
            name: "Create - Math Plan from Active Draft",
            editorCallback: async (editor, view) => {
                const file = view.file;
                if (!file) { new Notice("Error: No active draft file."); return; }
                if (!this.agent) return;

                const notice = new Notice('🤖 Rehoboam is creating a math plan...', 0);
                const progressCallback = (update: string) => notice.setMessage(update);
                try {
                    const result = await this.agent.toolManager.createMathPlanFromDraft(file.path, progressCallback);
                    notice.setMessage(result);
                    setTimeout(() => notice.hide(), 7000);
                } catch (err) {
                    notice.setMessage(`Error: ${err.message}`);
                    setTimeout(() => notice.hide(), 7000);
                }
            }
        });

        // ===================================================================
        // --- COMMAND 10: GENERATE MATH NOTES ---
        // ===================================================================
        this.addCommand({
            id: 'rehoboam-generate-math-notes',
            name: "Generate - Math Notes from Active Plan",
            editorCallback: async (editor, view) => {
                const file = view.file;
                if (!file) { new Notice("Error: No active plan file."); return; }
                if (!this.agent) return;

                const notice = new Notice('🤖 Rehoboam is generating math notes...', 0);
                const progressCallback = (update: string) => notice.setMessage(update);
                try {
                    const result = await this.agent.toolManager.generateMathNotesFromPlan(file.path, progressCallback);
                    notice.setMessage(result);
                    setTimeout(() => notice.hide(), 7000);
                } catch (err) {
                    notice.setMessage(`Error: ${err.message}`);
                    setTimeout(() => notice.hide(), 7000);
                }
            }
        });

        // ===================================================================
        // --- COMMAND 11: GENERATE CODE LABS ---
        // ===================================================================
        this.addCommand({
            id: 'rehoboam-generate-code-labs',
            name: "Generate - Code Labs from Drafts",
            callback: async () => {
                if (!this.agent) return;
                const notice = new Notice('🤖 Rehoboam is generating code labs...', 0);
                const progressCallback = (update: string) => notice.setMessage(update);
                try {
                    const draftsFolder = this.settings.draftsFolderPath;
                    const result = await this.agent.toolManager.generateCodeLabNotes(draftsFolder, progressCallback);
                    notice.setMessage(result);
                    setTimeout(() => notice.hide(), 7000);
                } catch (err) {
                    notice.setMessage(`Error: ${err.message}`);
                    setTimeout(() => notice.hide(), 7000);
                }
            }
        });

        // ===================================================================
        // --- COMMAND 12: RESUME FAILED NOTES ---
        // ===================================================================
        this.addCommand({
            id: 'rehoboam-resume-failed',
            name: 'Resume - Failed Notes from Last Log',
            callback: async () => {
                if (!this.agent) return;

                // Check if the Agent Panel is open
                const agentView = this.app.workspace.getLeavesOfType(AGENT_VIEW_TYPE)[0]?.view;

                if (agentView instanceof AgentChatView) {
                    // If Panel is open, use it for detailed logs
                    agentView.switchToLogMode();
                    const progressCallback = (update: string) => agentView.addMessage('log', update);

                    try {
                        const result = await this.agent.toolManager.resumeFailedNotes(progressCallback);
                        agentView.addMessage('log', result);
                    } catch (e) {
                        agentView.addMessage('log', `❌ Error: ${e.message}`);
                    }

                } else {
                    // Fallback to Notices if Panel is closed
                    const notice = new Notice('Resuming failed notes...', 0);
                    const progressCallback = (update: string) => notice.setMessage(update);
                    
                    try {
                        const result = await this.agent.toolManager.resumeFailedNotes(progressCallback);
                        notice.setMessage(result);
                        setTimeout(() => notice.hide(), 7000);
                    } catch (e) {
                        notice.setMessage(`Error: ${e.message}`);
                        setTimeout(() => notice.hide(), 7000);
                    }
                }
            }
        });

        // ===================================================================
        // --- COMMAND 13: EXTRACT REFERENCE LIST ---
        // ===================================================================
        this.addCommand({
            id: 'rehoboam-extract-reference-list',
            name: "Extract - Reference List from Plan",
            editorCallback: async (editor, view) => {
                const file = view.file;
                if (!file) { new Notice("Error: No active file."); return; }
                if (!this.agent) return;

                const notice = new Notice('Extracting links from plan...', 0);
                
                try {
                    const result = await this.agent.toolManager.extractReferenceListFromPlan(file);
                    notice.setMessage(result);
                    setTimeout(() => notice.hide(), 5000);
                } catch (err) {
                    notice.setMessage(`Error: ${err.message}`);
                    setTimeout(() => notice.hide(), 7000);
                }
            }
        });

        // ------------------------------------------------------------------
        // Editor right-click: Create Absorption Notes from Selected Links
        // ------------------------------------------------------------------
        this.registerEvent(
            this.app.workspace.on("file-open", async (file) => {
                try {
                    // 1) must be a TFile and a markdown file (skip Canvas, attachments, etc.)
                    if (!file || !(file instanceof TFile)) return;
                    const ext = file.extension ?? "";
                    if (ext.toLowerCase() !== "md") return; // only react to .md files

                    // 2) skip if this is already an absorption note
                    if (file.path.startsWith("00 Absorption/")) return;

                    // 3) optional toggle
                    if (!this.autoOpenAbsorption) return;

                    // 4) only proceed if the active view is a Markdown view (user really opened the note)
                    // --- FIX: Use strict import checks instead of the unstable .require hack ---
                    const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
                    
                    if (!activeView) return; // Not a markdown view

                    // Simpler guard: ensure the active leaf's file is the same file (user opened it)
                    const activeFile = activeView.file; // Use .file from the view directly
                    if (!activeFile || activeFile.path !== file.path) {
                        // not yet the active content -- skip
                        return;
                    }

                    // 5) debounce
                    const now = Date.now();
                    if (now - (this.lastAutoOpenAt || 0) < 1000) return;
                    this.lastAutoOpenAt = now;

                    // 6) compute expected absorption path and ensure file exists
                    const absorptionFolder = '00 Absorption';
                    const absorptionFilename = `${file.basename} - Absorption.md`;
                    const absorptionPath = `${absorptionFolder}/${absorptionFilename}`;

                    const absAbstract = this.app.vault.getAbstractFileByPath(absorptionPath);
                    if (!absAbstract) return;

                    // 7) avoid calling if already open
                    const leaves = this.app.workspace.getLeavesOfType("markdown");
                    const alreadyOpen = leaves.some(l => {
                        const lf = (l.view as any)?.file as TFile | null;
                        return lf?.path === absorptionPath;
                    });
                    if (alreadyOpen) return;

                    // 8) finally open absorption (do not steal focus)
                    await this.agent.toolManager.openAbsorptionForSource(file, { focus: false });

                } catch (e) {
                    console.error("auto-open absorption error", e);
                }
            })
        );



        this.addCommand({
            id: 'absorption-apply-tier1',
            name: 'Absorption: Apply Tier 1 schedule to current note',
            callback: async () => {
                const file = this.app.workspace.getActiveFile();
                if (!file) {
                    new Notice('No active file.');
                    return;
                }
                if (!this.agent) {
                    new Notice('Agent not ready.');
                    return;
                }

                const msg = await this.agent.toolManager.applyTierToAbsorptionNote(file, 'tier1');
                new Notice(msg);
            }
        });

        this.addCommand({
            id: 'absorption-apply-tier2',
            name: 'Absorption: Apply Tier 2 schedule to current note',
            callback: async () => {
                const file = this.app.workspace.getActiveFile();
                if (!file) {
                    new Notice('No active file.');
                    return;
                }
                if (!this.agent) {
                    new Notice('Agent not ready.');
                    return;
                }

                const msg = await this.agent.toolManager.applyTierToAbsorptionNote(file, 'tier2');
                new Notice(msg);
            }
        });

        this.addCommand({
            id: 'absorption-apply-tier3',
            name: 'Absorption: Apply Tier 3 schedule to current note',
            callback: async () => {
                const file = this.app.workspace.getActiveFile();
                if (!file) {
                    new Notice('No active file.');
                    return;
                }
                if (!this.agent) {
                    new Notice('Agent not ready.');
                    return;
                }

                const msg = await this.agent.toolManager.applyTierToAbsorptionNote(file, 'tier3');
                new Notice(msg);
            }
        });

        this.addCommand({
            id: 'open-absorption-for-current-note',
            name: 'Open Absorption Note (Side panel)',
            callback: async () => {
                const file = this.app.workspace.getActiveFile();
                if (!file) {
                    new Notice('No active file to open absorption for.');
                    return;
                }
                const result = await this.agent.toolManager.openAbsorptionForSource(file, { focus: true });
                new Notice(result, 2000);
            }
        });

        // ------------------------------------------------------------------
        // Editor right-click: Create Absorption Notes from Selected Links
        // ------------------------------------------------------------------
        this.registerEvent(
            this.app.workspace.on('editor-menu', (menu: Menu, editor: Editor, view) => {
                const selection = editor.getSelection();
                if (!selection || !selection.match(/\[\[[^\]]+\]\]/)) {
                    return; // no wikilinks in selection
                }

                menu.addItem((item) => {
                    item
                        .setTitle('Create Absorption Notes from Selection')
                        .setIcon('book-open')
                        .onClick(async () => {
                            if (!this.agent) {
                                new Notice('Rehoboam Agent is not ready yet.');
                                return;
                            }

                            const freshSelection = editor.getSelection();
                            if (!freshSelection) {
                                new Notice('No selection found.');
                                return;
                            }

                            const file = view.file;
                            const contextPath = file ? file.path : null;

                            const notice = new Notice('Creating absorption notes...', 0);
                            try {
                                const result = await this.agent.toolManager.createAbsorptionNotesFromSelection(
                                    freshSelection,
                                    contextPath
                                );
                                notice.setMessage(result);
                            } catch (e: any) {
                                console.error(e);
                                notice.setMessage(`Error: ${e.message ?? e}`);
                            }
                            setTimeout(() => notice.hide(), 7000);
                        });
                });
            })
        );

        /*
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
        */

       this.addSettingTab(new RehoboamSettingTab(this.app, this));
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
                
                new Notice("Rehoboam Agent updated with new API key.");
            } catch(e) {
                console.error("Failed to re-initialize Google Generative AI module", e);
                new Notice("Failed to update agent. Check console for errors.");
            }
        }
    }

}

class RehoboamSettingTab extends PluginSettingTab {
    // This class is also unchanged
    plugin: MyPlugin;
    constructor(app: App, plugin: MyPlugin) { super(app, plugin); this.plugin = plugin; }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();
        containerEl.createEl("h2", { text: "Rehoboam Agent Settings" });

        new Setting(containerEl)
            .setName('Gemini API Key')
            .setDesc('Your API key for the Gemini API.')
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