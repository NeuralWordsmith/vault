---
tags:
  - "#cheatsheet"
tool:
  - "Basic Shell Commands"
---
# Cheatsheet: Shell - Common Commands Cheatsheet

> A quick reference guide for common commands and syntax for **Basic Shell Commands**.

---

# Basic Shell Command Cheatsheet

A high-density reference for fundamental command-line navigation and file manipulation.

| **Command** | **Name**                | **Function**                                                                |
| ----------- | ----------------------- | --------------------------------------------------------------------------- |
| `pwd`       | Print Working Directory | Shows your current absolute path.                                           |
| `ls`        | List                    | Lists files and folders in a directory.                                     |
| `cd`        | Change Directory        | Moves you to a different location.                                          |
| `cp`        | Copy                    | Copies files or directories.                                                |
| `mv`        | Move                    | Moves or renames files **and** directories.                                 |
| `rm`        | Remove                  | Permanently deletes **files**. (Will show an error if used on a directory). |
| `rmdir`     | Remove Directory        | Permanently deletes **empty** directories.                                  |

### `pwd` (Print Working Directory)
Displays the full path of your current location in the filesystem.

**Syntax**
```sh
pwd
```

**Example**
```sh
$ pwd
/home/user/documents
```

---

### `ls` (List)
Lists the contents of a directory.

**Syntax**
```sh
ls [options] [path]
```

**Common Options**
| Flag | Description                                        |
| :--- | :------------------------------------------------- |
| `-l` | **L**ong format (shows permissions, owner, size, date) |
| `-a` | **A**ll files (includes hidden files starting with `.`)  |
| `-h` | **H**uman-readable file sizes (e.g., `1K`, `23M`, `2G`) |
| `-t` | Sor**t** by modification time, newest first        |
| `-R` | **R**ecursive list (includes contents of subdirectories) |

**Examples**
```sh
# List contents of current directory
ls

# List all files in long, human-readable format
ls -alh

# List contents of a different directory
ls /var/log
```

---

### `cd` (Change Directory)
Navigates to a different directory.

**Syntax**
```sh
cd [path]
```

**Common Destinations**
| Path | Destination                               |
| :--- | :---------------------------------------- |
| `cd`   | Go to your home directory (`~`)           |
| `cd ..`| Go up one directory level                 |
| `cd -` | Go to the previous directory you were in  |
| `cd /` | Go to the root directory of the system    |

**Examples**
```sh
# Go to the 'projects' subdirectory
cd projects

# Go up two levels
cd ../..

# Go to your home directory
cd ~
```

---

### `cp` (Copy)
Copies files or directories.

**Syntax**
```sh
# Copy file
cp [options] <source_file> <destination_file>

# Copy directory
cp -r <source_directory> <destination_directory>
```

**Common Options**
| Flag | Description |                                       |
| - | - |
| `-r` | **R**ecursive copy (required for directories)      |
| `-i` | **I**nteractive (prompt before overwriting a file) |
| `-v` | **V**erbose (shows files as they are copied)       |

**Examples**
```sh
# Copy a file in the same directory
cp report.txt report_backup.txt

# Copy a file to another directory
cp image.jpg ./backups/

# Copy an entire directory
cp -r project/ project_archive/
```

---

### `mv` (Move/Rename)
Moves or renames files and directories.

**Syntax**
```sh
mv [options] <source> <destination>
```

**Common Options**
| Flag | Description                                        |
| :--- | :------------------------------------------------- |
| `-i` | **I**nteractive (prompt before overwriting a file) |
| `-v` | **V**erbose (shows files as they are moved)        |
| `-n` | **N**o-clobber (do not overwrite an existing file)   |

**Examples**
```sh
# Rename a file
mv old_name.txt new_name.txt

# Move a file to a different directory
mv data.csv ../processed_data/

# Move all .txt files into the 'docs' folder
mv *.txt docs/
```

---

### `rm` (Remove File)
Deletes files or directories. **Warning: This action is permanent and cannot be undone.**

**Syntax**
```sh
rm [options] <file(s)>
```

**Common Options**
| Flag | Description                                        |
| :--- | :------------------------------------------------- |
| `-i` | **I**nteractive (prompt before every removal)      |
| `-f` | **F**orce (ignore non-existent files, never prompt) |
| `-r` | **R**ecursive (delete directories and their contents) |

**Examples**
```sh
# Delete a single file
rm temp_file.log

# Delete a directory and all its contents (use with extreme caution)
rm -r old_project/

# Force delete a directory and its contents (very dangerous)
rm -rf old_project/
```

---

### `rmdir` (Remove Empty Directory)
Deletes **empty** directories. The command will fail if the directory contains any files or subdirectories.

**Syntax**
```sh
rmdir <directory_name>
```

**Example**
```sh
# Create a directory, then remove it
mkdir temp_folder
rmdir temp_folder
```