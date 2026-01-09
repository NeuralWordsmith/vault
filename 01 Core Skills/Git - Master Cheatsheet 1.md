This master cheatsheet compiles all the core concepts and commands covered in the "Introduction to Git" course, from basic setup to restoring lost work.

---

## **1. Core Concepts & Architecture**

Understanding how Git views your project is essential for mastering the workflow.

- **Repository (Repo):** A directory consisting of your project files/sub-directories and the `.git` directory which records project history1111.
    
- **Version Control:** A system to manage changes to documents and programs, allowing you to track states and revert changes2222.
    
- **The Three Components of Data:**
    
    - **Commit:** Contains metadata like author, log message, and time3.
        
    - **Tree:** Tracks names and locations of files and directories4.
        
    - **Blob (Binary Large Object):** Compressed snapshots of a file's contents at a specific time5555.
        
- **The Hash:** A unique 40-character identifier for every commit, used by Git to share and compare data efficiently6666.
    

---

## **2. The Git Workflow**

The standard cycle for saving changes involves three distinct areas.

|**Step**|**Action**|**Description**|
|---|---|---|
|**1. Workspace**|Edit Files|You modify files on your computer as usual7.|
|**2. Staging Area**|`git add`|Like placing a letter in an envelope; it tracks what has been modified but not yet saved8888.|
|**3. Repository**|`git commit`|Like putting the envelope in a mailbox; Git takes a permanent snapshot (hash)9999.|

---

## **3. Essential Command Reference**

### **Setup & Status**

- `git --version`: Check the installed Git version10.
    
- `git init [project-name]`: Create a new repository from scratch11.
    
- `git init`: Convert an existing directory into a Git repository12.
    
- `git status`: See which files are modified, staged, or untracked13131313.
    

### **Basic Operations**

- `git add [file]`: Add a specific file to the staging area14.
    
- `git add .`: Add all modified files in the current directory and sub-directories to staging15.
    
- `git commit -m "[message]"`: Save staged changes with a concise log message16.
    

### **Viewing History**

- `git log`: View the commit history in reverse chronological order17.
    
- `git log -n [number]`: Limit the log to the _n_ most recent commits18.
    
- `git log [file]`: View the history of changes for a specific file19.
    
- `git log --since="[date]"`: Show commits made after a specific date (e.g., "April 2, 2024" or "2 weeks ago")202020202020202020.
    
- `git show [hash]`: View the log entry and a "diff" of changes for a specific commit21.
    

### **Comparing Versions (Diffs)**

- `git diff [file]`: Compare your workspace (unstaged changes) with the last commit22.
    
- `git diff --staged`: Compare staged changes with the last commit23.
    
- `git diff [hash1] [hash2]`: Compare differences between two specific commits24.
    
- `HEAD`: A shortcut referring to the most recent commit25.
    
- `HEAD~1`: Refers to one commit prior to the most recent one26.
    

---

## **4. Restoring & Reverting**

Tools for fixing mistakes and undoing changes.

- **Revert an entire commit:**
    
    - `git revert [hash]`: Creates a _new_ commit that undoes all changes from the specified commit27.
        
    - `--no-edit`: Revert without opening the text editor for a message28.
        
    - `-n`: Revert changes in the workspace but do not create the commit automatically29.
        
- **Restore a specific file:**
    
    - `git checkout [hash] -- [file]`: Restore a single file to its state from a specific commit30.
        
- **Unstage files:**
    
    - `git restore --staged [file]`: Move a file from the staging area back to the working directory (unstage)31.
        

---