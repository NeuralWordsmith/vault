---
tags: 
  - major_core
  - shell
  - globbing
  - pattern_matching
  - command_line
  - filename_expansion
  - concept
source: 
  - "[[Introduction to shell]]"
related: 
  - "[[Fundamental - Shell Scripting]]"
  - "[[Shell - Asterisk Wildcard]]"
  - "[[Shell - Question Mark Wildcard]]"
  - "[[Shell - Square Bracket Wildcard]]"
  - "[[Shell - Curly Bracket Wildcard]]"
  - "[[Shell - Pipelines]]"
  - "[[Shell - Redirection]]"
  - "[[Shell - sort Command]]"
  - "[[Shell - uniq Command]]"
  - "[[Shell - wc Command]]"
  - "[[Shell - Common Commands Cheatsheet 3]]"
  - "[[Fundamental - Programming]]"
  - "[[Fundamental - Computer Science]]"
---
# Major Core: Shell Wildcards

## Summary

> In shell environments, wildcards are special characters that the shell interprets to match multiple filenames based on a pattern. Instead of typing each file individually, you can use a wildcard pattern to create a list of files for a command to act upon. This process, known as 'globbing' or 'filename expansion', is a fundamental tool for efficient file management. The most common types are the [[Shell - Asterisk Wildcard|asterisk (*)]] for matching any number of characters, the [[Shell - Question Mark Wildcard|question mark (?)]] for a single character, [[Shell - Square Bracket Wildcard|square brackets ([...])]] for a range of characters, and [[Shell - Curly Bracket Wildcard|curly brackets ({...})]] for generating arbitrary strings.

**Why This Matters:** Shell wildcards dramatically increase command-line efficiency and reduce human error by allowing you to manage, move, or process thousands of files with a single, concise command.

_Analogy:_ _Using shell wildcards is like using a Joker in a card game. Instead of needing the exact '10 of Spades' to complete your hand, you can use a Joker as a stand-in for any card you need. If you want all the 'seasonal' cards, you might say 'give me all cards from the seasonal suit', and the Joker helps you gather them without naming each one._

In this analogy:
- **The Joker:** Represents a wildcard character like `*` or `?`.
- **The Deck of Cards:** Represents all the files in a directory.
- **The Hand You Want to Build:** Represents the specific set of files you want to select (e.g., all `.csv` files).
- **The Rule 'Any Seasonal Card':** Represents the wildcard pattern (e.g., `seasonal/*.csv`).

- **Where it breaks down:** A Joker is usually a single, special card. In the shell, you can use multiple different wildcards in a single pattern, making them far more flexible and specific than a simple Joker.

```
User Input:   ls seasonal/*.csv
                  │
                  ▼
+-----------------+
| Shell Expansion |
|   (Globbing)    |
+-----------------+
                  │
                  ▼
Expanded Cmd: ls seasonal/autumn.csv seasonal/spring.csv ...
```

## Details

Typing every single filename (e.g., `seasonal/winter.csv seasonal/spring.csv...`) is tedious and error-prone. The shell uses wildcards to solve this problem through a process called **globbing**. Before a command like `ls` or `cp` is even executed, the shell scans the command for wildcard characters. If it finds any, it replaces the wildcard pattern with a space-separated list of all filenames that match the pattern. Only after this expansion does the shell execute the command with the generated list of files. This makes it possible to work with large numbers of files efficiently.

#### Primary Goal

To select and operate on multiple files using a single pattern, avoiding the need to manually type each individual filename.

#### Mechanism

- **How it Works: The Globbing Process**
    1. **User Input:** You type a command containing a wildcard pattern, like `ls seasonal/*.csv`.
    2. **Shell Expansion:** Before running `ls`, the shell itself looks at the pattern `seasonal/*.csv`. It searches the `seasonal/` directory for all files ending in `.csv`.
    3. **Command Substitution:** The shell finds `seasonal/winter.csv`, `seasonal/spring.csv`, `seasonal/summer.csv`, and `seasonal/autumn.csv`. It replaces the original pattern with this list.
    4. **Execution:** The shell finally executes the command, which now looks like this: `ls seasonal/winter.csv seasonal/spring.csv seasonal/summer.csv seasonal/autumn.csv`.
- **The Asterisk (`*`)**
    - The [[Shell - Asterisk Wildcard|asterisk wildcard]] matches any number of characters (including zero). It's the most common and powerful wildcard.
    - *Example:* `*.txt` matches `report.txt`, `data.txt`, and even just `.txt`.
- **The Question Mark (`?`)**
    - The [[Shell - Question Mark Wildcard|question mark wildcard]] matches exactly one of any character.
    - *Example:* `data?.csv` matches `data1.csv` and `data2.csv`, but not `data10.csv`.
- **Square Brackets (`[]`)**
    - The [[Shell - Square Bracket Wildcard|square bracket wildcard]] matches any single character that is a member of the specified set or range.
    - *Example:* `[abc].log` matches `a.log`, `b.log`, and `c.log`. `[1-3].log` matches `1.log`, `2.log`, and `3.log`.
- **Curly Brackets (`{}`)**
    - The [[Shell - Curly Bracket Wildcard|curly bracket expansion]] is not technically a wildcard (it doesn't match existing files) but generates strings from a comma-separated list. It's often used in the same context.
    - *Example:* `mv report.{txt,md}` expands to `mv report.txt report.md`.

```python
# The user types a command with a wildcard
$ ls -l seasonal/*.csv

# Before the 'ls' command is executed, the shell performs globbing.
# It finds all matching files and expands the command to:
$ ls -l seasonal/autumn.csv seasonal/spring.csv seasonal/summer.csv seasonal/winter.csv

# The 'ls' command then runs with the expanded list of arguments, producing the output:
# -rw-r--r-- 1 user user 1024 Nov 25 12:30 seasonal/autumn.csv
# -rw-r--r-- 1 user user 1024 Nov 25 12:30 seasonal/spring.csv
# -rw-r--r-- 1 user user 1024 Nov 25 12:30 seasonal/summer.csv
# -rw-r--r-- 1 user user 1024 Nov 25 12:30 seasonal/winter.csv
```

#### Key Parameters

- **Pattern Specificity:** The main 'lever' is choosing the right wildcard for the job. Using `*` is broad and powerful, while `?` and `[]` allow for much more precise matching.
    - For example, to match `file1.txt` and `file2.txt` but not `file10.txt`, you would use `file?.txt` instead of `file*.txt`.
- **Combining Wildcards:** You can combine wildcards to create highly specific patterns.
    - For example, `[A-C]*.??` would match files that start with A, B, or C, followed by any number of characters, and have a two-letter extension (e.g., `B_report.md`, `Archive.py`).

#### Core Trade-offs

- **Power vs. Risk:** Wildcards are extremely powerful, especially with destructive commands like `rm`. A poorly constructed pattern like `rm * .txt` (with a space) could accidentally delete far more than intended.
    - It's a common practice to first run `ls` with the wildcard pattern to preview which files will be affected before running a command like `rm` or `mv`.
- **Performance:** On file systems with millions of files (like in high-performance computing or big data), wildcard expansion can be slow as the shell must read the entire directory listing to find matches.
- **Shell Differences:** While the basic wildcards (`*`, `?`, `[]`) are fairly standard, more advanced globbing features can differ between shells like Bash, Zsh, and Fish, potentially affecting script portability.

## Connections

```
                     (Parent)
              Shell Scripting
                       ▲
                       │
┌──────────────────────┼──────────────────────┐
│                      │                      │
│            ┌───────────────────┐            │
│            │ Shell Wildcards   │            │
│            └───────────────────┘            │
│                      │                      │
│    ┌─────────────────┴─────────────────┐    │
│    │                 │                 │    │
(Child)           (Child)           (Child) (Child)
Asterisk (*)   Question Mark (?)   Brackets ([]) Braces ({})
```

### Parent Concept

This concept is a fundamental building block of [[Fundamental - Shell Scripting|Shell Scripting]], enabling the creation of flexible and powerful scripts that can operate on dynamic sets of files.

### Child Concepts

- The most common type is the [[Shell - Asterisk Wildcard|asterisk (*)]], which matches any sequence of characters.
- A more specific type is the [[Shell - Question Mark Wildcard|question mark (?)]], which matches exactly one character.
- For matching a single character from a specific set, you use [[Shell - Square Bracket Wildcard|square brackets ([...])]].
- For generating strings from a predefined list, you use [[Shell - Curly Bracket Wildcard|curly bracket expansion ({...})]].

### Related Concepts 

- The list of files generated by wildcards is often fed into [[Shell - Pipelines|pipelines]] for multi-stage processing.
- Wildcards are frequently used to select a group of files whose contents will be combined and sent to a new location using [[Shell - Redirection|redirection]].
- Commands like [[Shell - sort Command|sort]] and [[Shell - wc Command|wc]] can operate on the multiple files selected by a wildcard pattern.
## Questions

- You are about to run `rm /logs/app-2023-0[1-9]-*.log` to clean up old logs in a production environment. What is the primary risk, and what two commands would you run *before* this one to mitigate that risk and justify your actions to your team?
- Imagine a directory on a networked file system (NFS) containing 10 million small log files. Your script uses `cat *.log > combined.log`. Why might this command hang or perform extremely poorly, and what alternative approach using `find` might be more scalable?
- What if shell wildcards were strictly limited to only matching files in the current directory and could not include slashes (e.g., `data/*` was illegal)? How would this fundamentally change the way you structure your projects and write automation scripts?
