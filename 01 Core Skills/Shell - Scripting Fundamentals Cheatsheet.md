---
tags:
  - "#cheatsheet"
tool:
  - "Nano & Basic Bash Scripting"
---
# Cheatsheet: Shell - Scripting Fundamentals Cheatsheet

> A quick reference guide for common commands and syntax for **Nano & Basic Bash Scripting**.

---

| **Concept**    | **Syntax/Key**   | **Function**                                   |
| -------------- | ---------------- | ---------------------------------------------- |
| **Nano: Save** | `Ctrl + O`       | Saves the file (Write **O**utput).             |
| **Nano: Exit** | `Ctrl + X`       | Exits the editor.                              |
| **Run Script** | `bash script.sh` | Executes the commands in the file.             |
| **All Args**   | `$@`             | Represents all filenames passed to the script. |
| **Single Arg** | `$1`, `$2`       | Represents the 1st, 2nd, etc., argument.       |
| **Comment**    | `# text`         | Notes for humans, ignored by the computer.     |
### Nano Editor Commands

| Command     | Keystroke  | Description                                                |
|-------------|------------|------------------------------------------------------------|
| Write Out   | `Ctrl + O` | Saves the current file. You'll be prompted for a filename. |
| Exit        | `Ctrl + X` | Exits the editor. Prompts to save if the file is modified. |

### Basic Bash Scripting

#### Executing a Script

To run a script from the terminal:
```bash
# Executes the commands within the specified file
bash script.sh
```

#### Scripting Elements

| Element            | Syntax        | Description                                                  |
|--------------------|---------------|--------------------------------------------------------------|
| Comment            | `# text`      | A note for humans, ignored by the shell during execution.    |
| First Argument     | `$1`          | The first command-line argument passed to the script.        |
| Second Argument    | `$2`          | The second command-line argument passed to the script.       |
| All Arguments      | `$@`          | Represents all command-line arguments as separate strings.   |

#### Example Script (`process_files.sh`)

```bash
#!/bin/bash

# This script processes files passed as arguments.

echo "Processing main file: $1"
echo "All files to be processed: $@"

# (Add file processing commands here)
```

**Usage:**
```bash
bash process_files.sh report.txt data.csv archive.zip
```