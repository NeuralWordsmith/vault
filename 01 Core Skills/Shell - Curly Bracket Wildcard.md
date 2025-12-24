---
tags: 
  - core
  - shell
  - brace_expansion
  - string_generation
  - shell_scripting
  - command_line
  - pattern_matching
  - concept
source: 
  - "[[Introduction to shell]]"
related: 
  - "[[Shell - Wildcards]]"
  - "[[Shell - Asterisk Wildcard]]"
  - "[[Shell - Question Mark Wildcard]]"
  - "[[Shell - Square Bracket Wildcard]]"
  - "[[Shell - Pipelines]]"
  - "[[Shell - Redirection]]"
  - "[[Shell - sort Command]]"
  - "[[Shell - uniq Command]]"
  - "[[Shell - wc Command]]"
  - "[[Fundamental - Programming]]"
  - "[[Shell - Common Commands Cheatsheet 3]]"
  - "[[Shell - For Loops]]"
  - "[[Shell - xargs Command]]"
  - "[[Shell - Command Substitution]]"
---
# Core: Shell - Curly Brackets Wildcard

## Summary

>The curly brackets (`{...}`) wildcard, also known as brace expansion, is a shell mechanism that generates arbitrary strings from a comma-separated list. Unlike other [[Shell - Wildcards|wildcards]] like the [[Shell - Asterisk Wildcard|asterisk (`*`)]] or [[Shell - Question Mark Wildcard|question mark (`?`)]] which match existing files, brace expansion creates strings *before* the command is executed, whether the corresponding files exist or not.

**Why This Matters:** It allows you to generate multiple strings from a single compact expression, drastically reducing repetitive typing for commands that operate on several related files or directories.

_Analogy:_ _Think of brace expansion as a "Choose Your Own Adventure" book's instruction page. The instruction might say: "To see what happens next, turn to page {50, 75, 102}." The book doesn't care which page you choose first; it simply presents you with a list of specific, pre-defined options to explore._

{
  "content": "",
  "children": [
    {
      "content": "**The Instruction:** The shell command (e.g., `echo report_{...}.txt`)."
    },
    {
      "content": "**The Curly Braces `{...}`:** The part of the instruction telling you there are multiple, specific options."
    },
    {
      "content": "**The Comma-Separated List `50, 75, 102`:** The explicit patterns you want to generate (`report_50.txt`, `report_75.txt`, `report_102.txt`)."
    },
    {
      "content": "**Where it breaks down:** The book analogy implies choosing one path. Brace expansion is more like a photocopier that instantly creates *all* the specified versions of the page at once for you to use. It doesn't choose one; it generates all of them."
    }
  ]
}

```
```
Shell sees:
echo report_{jan,feb,mar}.csv
      │
      │ Brace Expansion
      ▼
Shell executes:
echo report_jan.csv report_feb.csv report_mar.csv
```
```

## Details

The curly brackets (`{...}`) wildcard, technically called "brace expansion," is a powerful feature in the shell for generating multiple strings from a compact pattern. It takes a comma-separated list of strings inside the braces and expands them into a full list of all possible combinations with any surrounding text (prefixes or suffixes). This is fundamentally different from file-matching wildcards like the [[Shell - Asterisk Wildcard|asterisk (`*`)]] because it generates strings *before* the command is executed, regardless of whether files with those names actually exist.

#### Primary Goal

To provide a concise way to generate multiple, specific string variations in a single command, avoiding repetitive typing.

#### Mechanism


- **Step 1: Define the Pattern**
    - Create a string with a prefix and/or suffix around a pair of curly braces. For example, to create directories for three years, the pattern would be `year_{...}`.
- **Step 2: List the Variations**
    - Inside the braces, provide a comma-separated list of the strings you want to substitute. It's critical that there are no spaces around the commas. For our example, this would be `{2023,2024,2025}`.
- **Step 3: Execute the Command**
    - The shell performs the brace expansion first, generating a separate argument for each item in the list. It transforms `mkdir year_{2023,2024,2025}` into `mkdir year_2023 year_2024 year_2025` *before* the `mkdir` command is run.

##### Code Translation

```python
```bash
# Brace expansion generates strings. Let's see it directly with `echo`.
# This command will be expanded by the shell *before* echo is run.
# The shell sees `echo file_{a,b,c}.txt` and turns it into `echo file_a.txt file_b.txt file_c.txt`

echo file_{a,b,c}.txt
# Output: file_a.txt file_b.txt file_c.txt

# --- Steps 1, 2, & 3 in action --- 
# This is extremely useful for creating multiple directories at once.
# The shell expands this to `mkdir year_2023 year_2024 year_2025`
mkdir year_{2023,2024,2025}

# Let's verify the directories were created
ls -d year_*
# Output: year_2023  year_2024  year_2025
```
```

 [[Code - Shell - Curly Brackets Wildcard Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Comma-Separated List**
    - The core of the expansion. The items inside `{...}` are separated by commas with no spaces. *Example: `{txt,csv,md}`*.
- **Prefix/Suffix**
    - Text immediately before or after the braces is prepended or appended to each generated item. *Example: `backup_` + `{a,b}` + `.zip` becomes `backup_a.zip` and `backup_b.zip`*.
- **Sequence Expression**
    - Many modern shells also support numeric or character sequences using two dots. *Example: `{1..5}` expands to `1 2 3 4 5`, and `{a..e}` expands to `a b c d e`*.

#### Core Trade-offs

- **Pro: Conciseness**
    - Drastically reduces typing for repetitive commands on a known set of targets.
- **Pro: Pre-execution Generation**
    - Because it generates strings before the command runs, it can be used to create files and directories that don't exist yet, something file-matching wildcards cannot do.
- **Con: No File Matching**
    - It does *not* check if files with the generated names exist. If you use `rm file_{a,b,c}.txt` and `file_b.txt` doesn't exist, you will get an error for that specific argument. This contrasts with the [[Shell - Asterisk Wildcard|asterisk (`*`)]] which would simply not match non-existent files.
- **Con: Potential for Errors**
    - A typo in the list (e.g., a space after a comma) can lead to unexpected behavior or errors, as shells might interpret the parts differently.

## Connections

```
```
                  (Parent)
                Shell Wildcards
                      ▲
                      │
      ┌───────────────┼────────────────┐
      │               │                │
(File Matching)  ┌──────────────────┐  (File Matching)
   Asterisk      │  Curly Brackets  │    Question Mark
                 └──────────────────┘
                      │
                      │ (Generates strings for commands like...)
                      ▼
                   Pipelines
```
```

### Parent Concept

Brace expansion is a specific type of [[Shell - Wildcards|shell wildcard]] used for generating arbitrary strings rather than matching existing file paths.

### Child Concepts



### Related Concepts 

- It fundamentally differs from the [[Shell - Asterisk Wildcard|asterisk wildcard]], which matches any number of characters in *existing* filenames.
- While the [[Shell - Square Bracket Wildcard|square bracket wildcard]] matches a single character from a set within existing filenames, brace expansion generates whole strings from a set.
- The list of strings generated by brace expansion can be sent through [[Shell - Pipelines|pipelines]] to be processed by other commands like [[Shell - sort Command|sort]] or [[Shell - wc Command|wc]].
## Questions

- You need to archive log files from last month, named `app-2024-05-01.log` through `app-2024-05-31.log`. You could use brace expansion (`app-2024-05-{01..31}.log`) or an asterisk wildcard (`app-2024-05-*.log`). The brace expansion is more explicit but will fail if a day's log is missing. The asterisk is more robust to missing files but could accidentally grab an unrelated file like `app-2024-05-summary.log`. Which approach do you choose for an automated archival script, and how do you justify the risk of either failing or over-grabbing data to your team lead?
- Imagine you're writing a script to provision 1,000 new user home directories on a server, named `user0001` to `user1000`. Using brace expansion (`mkdir /home/user{0001..1000}`) seems simple, but what are the potential failure points at this scale? How would you modify the command or wrap it in a script to handle potential errors (like disk space running out halfway) and provide idempotent, restartable execution?
- What if your shell completely lacked brace expansion? Describe two alternative, one-line shell commands or constructs you could use to achieve the same result as `touch report_{2022,2023,2024}.{txt,csv}` without manually typing out all six filenames.