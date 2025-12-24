---
tags: 
  - core
  - shell
  - globbing
  - pattern_matching
  - wildcard
  - filename_expansion
  - concept
source: 
  - "[[Introduction to shell]]"
related: 
  - "[[Shell - Wildcards]]"
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
# Core: Asterisk Wildcard

## Summary

>The asterisk (`*`) is a wildcard character used in shell environments to represent zero or more characters in a filename. It's the most common and powerful tool for pattern matching, allowing commands to operate on groups of files. It's a fundamental concept within the broader topic of [[Shell - Wildcards]], contrasting with the [[Shell - Question Mark Wildcard|question mark (`?`)]] which matches exactly one character, and the [[Shell - Square Bracket Wildcard|square brackets (`[]`)]] which match a single character from a specified set.

**Why This Matters:** The asterisk wildcard dramatically speeds up file management by allowing you to select and act on multiple files at once based on a pattern, eliminating tedious one-by-one operations.

_Analogy:_ _Think of the asterisk wildcard as a "universal key" for a set of hotel rooms. While a specific key (`room_101.txt`) opens only one door, and a keycard for a specific floor (`floor_1??.txt`) opens any room on that floor, the universal key (`*.txt`) can open any room on any floor, as long as it has a door (i.e., exists as a file with a `.txt` extension)._

**Where it breaks down:** A universal key is a single object that opens many locks. The asterisk isn't an object itself; it's a pattern that the shell *expands* into a list of matching filenames *before* the command is even run. The command (`ls`, `rm`, etc.) never sees the asterisk, only the list of files.

```
Pattern:  report_*.csv

Directory Files:
- report_2023_01.csv  --> MATCH
- report_2023_02.csv  --> MATCH
- summary_2023.csv    --> NO MATCH
- report_final.txt    --> NO MATCH
- report_.csv         --> MATCH (matches zero characters after '_')

Shell Expansion:
`rm report_*.csv` becomes `rm report_2023_01.csv report_2023_02.csv report_.csv`
```

## Details

The asterisk (`*`) is arguably the most frequently used wildcard in the command line. It acts as a placeholder that matches any sequence of characters, including no characters at all. This makes it incredibly flexible for selecting files. For example, if you want to list all Python files, you'd use `*.py`. If you wanted to find all files that start with 'report', you'd use `report*`. This is a core concept in shell scripting and file manipulation, part of the family of [[Shell - Wildcards]].

#### Primary Goal

To provide a flexible and powerful way to match and select multiple files or directories based on patterns containing any number of characters.

#### Mechanism


- **How it Works (Filename Expansion/Globbing):**
    1. You type a command with an asterisk, like `ls *.txt`.
    2. Before the `ls` command is executed, the shell itself looks at the pattern `*.txt`.
    3. The shell scans the current directory for all filenames that end with `.txt`.
    4. It replaces the `*.txt` pattern with a space-separated list of all the matching filenames it found (e.g., `report.txt notes.txt summary.txt`).
    5. Finally, the shell executes the command with this expanded list, as if you had typed `ls report.txt notes.txt summary.txt` yourself.
- **Common Patterns:**
    - `*.log`: Matches any file ending with `.log`.
        - *Example: `access.log`, `error.log`, `system.log`*
    - `data_*`: Matches any file starting with `data_`.
        - *Example: `data_2023.csv`, `data_final.json`*
    - `*report*`: Matches any file containing the word "report".
        - *Example: `final_report.docx`, `report_summary.pdf`, `preliminary_report_data`*
    - `*`: Matches every single file and directory in the current location (use with caution!).

#### Key Parameters

- **Placement:** The position of the `*` determines the pattern.
    - `prefix*`: Matches everything starting with "prefix".
    - `*suffix`: Matches everything ending with "suffix".
    - `*infix*`: Matches everything containing "infix".

#### Core Trade-offs

- **Power vs. Danger:** The `*` is powerful but can be destructive. A command like `rm * .txt` (with an accidental space) could delete all files in the directory before failing on `.txt`. Always double-check `*` usage with `rm` by running `ls` with the same pattern first.
- **Greediness:** The asterisk is "greedy," meaning it will match the longest possible string of characters. This is usually what you want, but can sometimes lead to unexpected matches if not used carefully.
- **Hidden Files:** By default, `*` does not match files or directories that start with a dot (`.`), known as hidden files. This is a safety feature to prevent accidental modification of configuration files (e.g., `.bashrc`).

## Connections

```
                  (Parent)
                Shell Wildcards
                       ▲
                       │
       ┌───────────────┼────────────────────────────┐
       │               │                            │
(More Specific)   ┌───────────────────────────┐   (More Specific)
Question Mark (?) │     Asterisk Wildcard     │   Square Brackets []
                  └───────────────────────────┘
		                       │
		             ┌─────────┴──────────┐
		             │                    │
		       (Used With)          (Used With)
		       ls Command           rm Command
```

### Parent Concept

The asterisk is a specific type of wildcard, falling under the general category of [[Shell - Wildcards]], which are special characters used for pattern matching.

### Related Concepts 

- The asterisk `*` contrasts with the [[Shell - Question Mark Wildcard|question mark wildcard (`?`)]], which matches exactly one character instead of zero or more.
- It also differs from [[Shell - Square Bracket Wildcard|square bracket wildcards (`[]`)]], which match a single character from a specific set of options.
- The asterisk is frequently combined with commands like `ls`, `cp`, `mv`, and `rm` to manage groups of files efficiently.
- Its output can be sent through [[Shell - Pipelines|pipelines]] to other commands like [[Shell - wc Command|wc]] to count the matching files.
## Questions

- You have a directory with thousands of log files from different services (`auth_2023.log`, `api_2023.log`, `auth_2024.log`, etc.). You need to archive all logs from 2023. Using `rm *2023*` seems fast, but what is the business risk of this command, and what safer, slightly more complex pattern could you use to mitigate that risk?
- Imagine a script that runs `tar -czf backup.tar.gz /var/log/*`. If this directory contains millions of files, what performance bottleneck will the shell encounter *before* the `tar` command even starts, and how would this impact system resources?
- What if the asterisk wildcard was "non-greedy" by default, matching the *shortest* possible string of characters? How would that fundamentally change the way you write common commands for file management, and what new wildcard might you need to invent to get the current "greedy" behavior back?