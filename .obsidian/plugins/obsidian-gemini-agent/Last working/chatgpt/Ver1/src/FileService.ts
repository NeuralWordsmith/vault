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

    // Create any missing folders in a path like "A/B/C/file.md"
    private async ensureFolder(folderPath: string) {
    if (!folderPath) return;
    const parts = folderPath.split('/').filter(Boolean);
    let current = '';
    for (const part of parts) {
        current = current ? `${current}/${part}` : part;
        const maybe = this.app.vault.getAbstractFileByPath(current);
        if (!maybe) {
        await this.app.vault.createFolder(current);
        }
    }
    }

    // Create or overwrite a file by full path
    async writeFile(path: string, content: string): Promise<TFile> {
    const existing = this.app.vault.getAbstractFileByPath(path);
    if (existing instanceof TFile) {
        await this.app.vault.modify(existing, content);
        return existing;
    }
    const folderPath = path.includes('/') ? path.slice(0, path.lastIndexOf('/')) : '';
    await this.ensureFolder(folderPath);
    return await this.app.vault.create(path, content);
    }

    // Append to a file by full path (create if it doesn't exist)
    async appendToFile(path: string, content: string): Promise<TFile> {
    const existing = this.app.vault.getAbstractFileByPath(path);
    if (existing instanceof TFile) {
        const current = await this.app.vault.read(existing);
        await this.app.vault.modify(existing, current + content);
        return existing;
    }
    const folderPath = path.includes('/') ? path.slice(0, path.lastIndexOf('/')) : '';
    await this.ensureFolder(folderPath);
    return await this.app.vault.create(path, content);
    }
}