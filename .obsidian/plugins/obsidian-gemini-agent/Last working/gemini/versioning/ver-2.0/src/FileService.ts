import { App, TFile, TAbstractFile } from 'obsidian';

export class FileService {
    private app: App;

    constructor(app: App) {
        this.app = app;
    }

    async readFile(file: TFile): Promise<string> {
        return this.app.vault.read(file);
    }
    
    async getActiveFile(): Promise<TFile | null> {
        return this.app.workspace.getActiveFile();
    }

    async createFile(filePath: string, content: string): Promise<TFile> {
        return this.app.vault.create(filePath, content);
    }

    async modifyFile(file: TFile, newContent: string): Promise<void> {
        await this.app.vault.modify(file, newContent);
    }
    
    async createFolder(folderPath: string): Promise<void> {
        // Check if the folder already exists to avoid errors
        if (!await this.app.vault.adapter.exists(folderPath)) {
            await this.app.vault.createFolder(folderPath);
        }
    }

    getAbstractFileByPath(path: string): TAbstractFile | null {
        return this.app.vault.getAbstractFileByPath(path);
    }
}