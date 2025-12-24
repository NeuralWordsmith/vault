---
tags:
  - "#cheatsheet"
tool:
  - "Shell Command Basics"
---
# Cheatsheet: Shell - Common Commands Cheatsheet 3

> A quick reference guide for common commands and syntax for **Shell Command Basics**.

---

| **Symbol/Command** | **Name**   | **Function**                                   |
| ------------------ | ---------- | ---------------------------------------------- |
| `*`                | Wildcard   | Matches zero or more characters in a filename. |
| `?`                | Wildcard   | Matches exactly one character.                 |
| `sort`             | Sort       | Sorts lines of text (alphabetical by default). |
| `uniq`             | Unique     | Removes **adjacent** duplicate lines.          |
| `wc`               | Word Count | Counts lines, words, or characters.            |
| `>`                | Redirect   | Saves command output to a file.                |
| `                  | `          | Pipe                                           |
| `Ctrl + C`         | Cancel     | Stops a running or frozen program.             |

### Wildcards

Used for filename expansion and pattern matching in commands like `ls`, `cp`, `mv`.

| Wildcard | Description                      | Example Usage                 |
| :------- | :------------------------------- | :---------------------------- |
| `*`      | Matches zero or more characters. | `ls *.txt` (lists all `.txt` files) |
| `?`      | Matches exactly one character.   | `ls report?.log` (matches `report1.log`, `reportA.log`, etc.) |

### Core Text Utilities

| Command | Description                               | Common Flags & Usage                                                              |
| :------ | :---------------------------------------- | :-------------------------------------------------------------------------------- |
| `sort`  | Sorts lines of text.                      | `sort file.txt` (alphabetical)<br>`sort -r file.txt` (reverse)<br>`sort -n data.txt` (numeric) |
| `uniq`  | Removes **adjacent** duplicate lines.     | `uniq sorted.txt`<br>`uniq -c sorted.txt` (count occurrences)<br>`uniq -d sorted.txt` (show only duplicates) |
| `wc`    | Counts lines, words, and characters.      | `wc file.txt` (lines, words, chars)<br>`wc -l file.txt` (lines only)<br>`wc -w file.txt` (words only)<br>`wc -c file.txt` (bytes only) |

### Input/Output (I/O)

| Operator | Name       | Description                                        | Example Usage                               |
| :------- | :--------- | :------------------------------------------------- | :------------------------------------------ |
| `>`      | Redirect   | Sends command output to a file (overwrites).       | `ls -l > file_list.txt`                     |
| `>>`     | Append     | Appends command output to a file.                  | `echo "New log entry" >> app.log`           |
| `|`      | Pipe       | Sends output of one command to the input of another. | `cat data.txt | sort`                      |

### Process Control

| Shortcut  | Action  | Description                               |
| :-------- | :------ | :---------------------------------------- |
| `Ctrl + C`| Cancel  | Sends a `SIGINT` signal to the foreground process, usually terminating it. |

### Common Command Pipelines

Combining utilities with pipes (`|`) is a core shell skill.

```bash
# List all .log files, sort them, remove duplicates, and save to a new file
ls *.log | sort | uniq > unique_logs.txt

# Count the number of unique lines in a file
# Note: 'uniq' requires sorted input to work on all duplicates
cat access.log | sort | uniq | wc -l

# Find the 10 most frequent lines in a file
cat access.log | sort | uniq -c | sort -nr | head -n 10
```