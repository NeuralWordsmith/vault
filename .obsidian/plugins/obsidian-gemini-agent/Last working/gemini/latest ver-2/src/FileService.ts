import { App, TFile, TAbstractFile, TFolder  } from 'obsidian';

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

    async findLatestFile(folderPath: string, prefix: string): Promise<TFile | null> {
        const folder = this.app.vault.getAbstractFileByPath(folderPath);
        if (!(folder instanceof TFolder)) {
            return null;
        }

        const files = folder.children.filter(
            (file): file is TFile => 
                file instanceof TFile && file.name.startsWith(prefix)
        );

        if (files.length === 0) {
            return null;
        }

        // Sort by creation time (stat.ctime) in descending order and return the first one
        files.sort((a, b) => b.stat.ctime - a.stat.ctime);
        
        return files[0];
    }
}