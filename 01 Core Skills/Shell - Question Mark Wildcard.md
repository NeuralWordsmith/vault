---
tags: 
  - core
  - shell
  - globbing
  - pattern_matching
  - command_line
  - single_character
  - concept
source: 
  - "[[Introduction to shell]]"
related: 
  - "[[Shell - Wildcards]]"
  - "[[Shell - Asterisk Wildcard]]"
  - "[[Shell - Square Bracket Wildcard]]"
  - "[[Shell - Curly Bracket Wildcard]]"
  - "[[Shell - Pipelines]]"
  - "[[Shell - Redirection]]"
  - "[[Shell - sort Command]]"
  - "[[Shell - uniq Command]]"
  - "[[Shell - wc Command]]"
  - "[[Shell - Stopping Programs]]"
  - "[[Fundamental - Programming]]"
  - "[[Shell - Common Commands Cheatsheet 3]]"
---
# Core: Question Mark Wildcard

## Summary

>The Question Mark (`?`) is a wildcard character used in shell environments to represent exactly one of any character. It offers more precision than the broader [[Shell - Asterisk Wildcard|asterisk (`*`)]] by enforcing a strict one-character substitution, making it ideal for matching patterns with a known length but a single variable character.

**Why This Matters:** It enables precise, single-character pattern matching in file operations, preventing the accidental selection of unintended files that more general wildcards might include.

_Analogy:_ _Think of the `?` wildcard as a single blank space on a crossword puzzle. You know a letter must go there, and you know it's only one letter, but you might not know which specific letter it is. The `?` holds the place for that single, unknown character._

The `?` in a shell command is a placeholder for exactly one character, just as the crossword blank is a placeholder for exactly one letter. 
* **Where it breaks down:** A crossword blank is eventually filled with a specific letter to form a meaningful word. The `?` wildcard doesn't care about meaning; it will match *any* character (a letter, a number, a symbol) that fits the single-character slot, without any constraints.

```
Pattern:  data?.log

Matches:
[ data1.log ]  --> YES (The '?' matches '1')
[ dataA.log ]  --> YES (The '?' matches 'A')
[ data-.log ]  --> YES (The '?' matches '-')

Does NOT Match:
[ data.log  ]  --> NO  (The '?' requires one character, found zero)
[ data10.log]  --> NO  (The '?' requires one character, found two: '10')
```

## Details

In shell scripting and command-line operations, the question mark (`?`) is a fundamental tool within the broader category of [[Shell - Wildcards|shell wildcards]]. Its specific job is to match any single character in a filename or string. This makes it distinct from the [[Shell - Asterisk Wildcard|asterisk (`*`)]], which matches zero or more characters, and more general than [[Shell - Square Bracket Wildcard|square brackets (`[]`)]], which match a single character from a specified set. The `?` is used when you know the exact length of the part of the name you're matching but need to allow for variability in one of the character positions.

#### Primary Goal

To provide a precise method for matching filenames or strings that differ by exactly one character at a specific position.

#### Mechanism


- **How it Works:** The shell, not the command itself (like `ls` or `cp`), expands the wildcard pattern into a list of matching filenames before the command is ever executed. This process is called 'globbing'.
    1. **Pattern Recognition:** The user types a command containing a `?`, for example, `ls report-201?.md`.
    2. **Shell Expansion (Globbing):** Before running `ls`, the shell scans the current directory for files that match this pattern. It finds `report-2018.md` and `report-2019.md` but ignores `report-2018-final.md` because the `?` only matches one character.
    3. **Command Execution:** The shell replaces the original pattern with the list of matches, effectively running the command `ls report-2018.md report-2019.md`.

##### Code Translation

```python
```bash
# --- Setup: Create some sample files to demonstrate the concept ---
touch log_2021.txt log_2022.txt log_2023.txt log_final.txt log_2022-01.txt

# --- Goal: List only the primary annual log files from the 2020s ---

# The pattern 'log_202?.txt' means:
# 'log_202' : A literal string
# '?'         : Exactly one of any character
# '.txt'      : A literal string

ls log_202?.txt

# --- Expected Output ---
# The command will list:
# log_2021.txt  log_2022.txt  log_2023.txt

# It correctly excludes 'log_final.txt' (doesn't match 'log_202')
# and 'log_2022-01.txt' (has more than one character after 'log_202').
```
```

 [[Code - Question Mark Wildcard Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Single Character Substitution:** The most common use case.
    - *Example:* `file-v?.zip` will match `file-v1.zip` and `file-v2.zip` but not `file-v10.zip`.
- **Multiple Substitutions:** The `?` can be used multiple times within the same pattern to match a fixed number of unknown characters.
    - *Example:* `ls ??.txt` will match `ab.txt`, `12.txt`, and `z9.txt`, but not `a.txt` or `abc.txt`.

#### Core Trade-offs

- **Pro: High Precision:** The `?` is more precise than the [[Shell - Asterisk Wildcard|asterisk (`*`)]]. This strictness prevents accidental matches, which is crucial for destructive operations like `rm` or `mv`.
    - *Example:* `rm data_?.csv` is safer than `rm data_*.csv` if the directory also contains important files like `data_backup.csv`.
- **Con: Inflexible Length:** Its primary strength is also its weakness. It cannot match zero characters or more than one, making it unsuitable for patterns of unknown or variable length where the asterisk (`*`) would be necessary.
- **Con: Character Agnostic:** It matches *any* character, which can sometimes be too broad. For more control, the [[Shell - Square Bracket Wildcard|square bracket wildcard (`[]`)]] is superior as it limits the match to a specific set of characters (e.g., `[0-9]` for a single digit).
    - *Example:* `img_00?.jpg` would match `img_001.jpg` but also `img_00a.jpg`. To match only numbers, `img_00[0-9].jpg` would be a better pattern.

## Connections

```
                 (Parent)
                Wildcards
                    ▲
                    │
    ┌───────────────┼───────────────┐
    │               │               │
(More Flexible) ┌───────────────────┐ (More Specific)
  Asterisk      │ Question Mark (?) │  Square Brackets
                └───────────────────┘
```

### Parent Concept

The question mark is a specific type of [[Shell - Wildcards|shell wildcard]], a set of special characters interpreted by the shell to perform pattern matching, also known as globbing.

### Child Concepts



### Related Concepts 

- It provides more precision and is less greedy than the [[Shell - Asterisk Wildcard|asterisk wildcard]], which matches zero or more characters.
- It is less specific than the [[Shell - Square Bracket Wildcard|square bracket wildcard]], which matches any single character from within a defined set.
- It can be powerfully combined with other shell utilities, such as using it to generate a file list that is then processed by a [[Shell - Pipelines|pipeline]] with commands like [[Shell - wc Command|wc]] or [[Shell - sort Command|sort]].
## Questions

- You have a directory with log files named `log-2023-01.txt`, `log-2023-01-a.txt`, and `log-2023-02.txt`. You need to archive only the primary monthly logs (`log-2023-01.txt`, `log-2023-02.txt`). How would you construct a command using `?` to achieve this without accidentally archiving the sub-log, and why is `log-2023-??.txt` a better choice than `log-2023-*.txt` for this business requirement of precision?
- Imagine a nightly data ingestion script that uses `mv /ingest/data_????-??-??.csv /processed/` to move daily files. One day, a file named `data_2023-12-25_final.csv` is added to the ingest directory. What happens to the script's execution, and how would you modify the system's file naming convention or the script itself to be more robust against such failures?
- What if the `?` wildcard was enhanced to match 'zero or one' character, similar to its usage in some regular expression engines? How would this change its relationship with the `*` wildcard, and could it potentially simplify or complicate common shell scripting tasks?