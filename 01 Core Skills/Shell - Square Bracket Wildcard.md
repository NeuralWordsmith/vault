---
tags: 
  - core
  - shell
  - pattern_matching
  - globbing
  - character_set
  - file_matching
  - shell_scripting
  - concept
source: 
  - "[[Introduction to shell]]"
related: 
  - "[[Shell - Wildcards]]"
  - "[[Shell - Asterisk Wildcard]]"
  - "[[Shell - Question Mark Wildcard]]"
  - "[[Shell - Curly Bracket Wildcard]]"
  - "[[Shell - Redirection]]"
  - "[[Shell - Pipelines]]"
  - "[[Shell - sort Command]]"
  - "[[Shell - uniq Command]]"
  - "[[Shell - wc Command]]"
  - "[[Shell - Common Commands Cheatsheet 3]]"
  - "[[Fundamental - Programming]]"
  - "[[Regular Expressions]]"
  - "[[Shell - find Command]]"
  - "[[Shell - grep Command]]"
  - "[[Shell - Loops]]"
---
# Core: Square Bracket Wildcard

## Summary

>The Square Bracket (`[...]`) wildcard is a pattern-matching tool used in the shell to match any single character that is a member of the specified set within the brackets. It offers more control than the broad `[[Shell - Asterisk Wildcard|asterisk (*)]]` and is more specific than the `[[Shell - Question Mark Wildcard|question mark (?)]]`, which matches any single character. For example, `log[abc].txt` will match `loga.txt`, `logb.txt`, or `logc.txt`, but not `logd.txt` or `logab.txt`.

**Why This Matters:** This wildcard enables precise file matching by specifying an exact set of allowed characters for a single position, preventing the accidental selection or deletion of unintended files.

_Analogy:_ _Think of the square bracket wildcard as ordering a custom-built sandwich. You tell the sandwich artist you want one type of cheese from a specific list: 'I'll have either Provolone, Cheddar, or Swiss.' The pattern `sandwich_with_[PCS]heese.txt` is your order. The shell looks at all the available sandwiches and will only pick up `sandwich_with_P`heese.txt, `sandwich_with_C`heese.txt, or `sandwich_with_S`heese.txt. It will ignore `sandwich_with_American_cheese.txt` because 'A' wasn't on your list, and it will ignore `sandwich_with_PC_cheese.txt` because you only asked for one slice (one character)._

**Where it breaks down:** The analogy implies a choice being made from a list of options to create something new. The shell wildcard doesn't create files; it only finds existing files whose names already match the pattern you've specified.

```
Pattern:  image_0[13].jpg

Directory Scan:

image_01.jpg  ─> MATCH ('1' is in the set [13])
image_02.jpg  ─> NO MATCH ('2' is not in the set [13])
image_03.jpg  ─> MATCH ('3' is in the set [13])
image_13.jpg  ─> NO MATCH (Pattern requires 'image_0' prefix)
image_013.jpg ─> NO MATCH ([...] matches only a single character)
```

## Details

In shell environments, the square bracket wildcard provides a way to perform more granular file selection, a process known as 'globbing'. Instead of matching anything (`*`) or any one character (`?`), it restricts the match to a single character from a defined set. This is crucial for writing safer and more predictable scripts. This mechanism can be extended to include **character ranges** (e.g., `[a-z]`), **negated sets** (e.g., `[^0-9]`), and **predefined character classes** (e.g., `[[:alpha:]]`).

#### Primary Goal

To match a single character position in a filename against a specific list or range of possible characters.

#### Mechanism


- **How it Works:** The shell interpreter, before executing a command like `ls` or `rm`, scans the command for wildcards. When it encounters `[...]`, it performs a process called 'pathname expansion'.
    1.  **Identify Pattern:** The shell identifies the pattern, for instance, `data-202[13].csv`.
    2.  **Scan Directory:** It looks in the current directory for all filenames.
    3.  **Match and Expand:** It checks each filename against the pattern. A file matches if its name is `data-202`, followed by either a `1` or a `3`, and ends with `.csv`. The shell replaces the pattern `data-202[13].csv` with a space-separated list of all matching filenames (e.g., `data-2021.csv data-2023.csv`).
    4.  **Execute Command:** The command (`ls`) is then executed with this expanded list of filenames as its arguments.

##### Code Translation

```python
```bash
# --- Setup: Create some files to demonstrate ---
touch report_2021.csv report_2022.csv report_2023.csv report_202A.csv

echo "--- Initial files: ---"
ls

# --- Step 1 & 2: Define a pattern to match reports from 2021 or 2023 ---
# The pattern is 'report_202[13].csv'
# The [...] is at the 12th character position, matching either '1' or '3'.

# --- Step 3 & 4: Execute the command and observe the shell's expansion ---
echo "\n--- Listing files matching report_202[13].csv: ---"
ls report_202[13].csv

# --- Example with a range: Match all numeric years ---
echo "\n--- Listing files matching report_202[0-9].csv: ---"
ls report_202[0-9].csv

# --- Example with negation: Match years NOT ending in 1 or 3 ---
echo "\n--- Listing files matching report_202[^13].csv: ---"
ls report_202[^13].csv
```
```

 [[Code - Square Bracket Wildcard Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Character Sets:** Explicitly list the characters to match.
    - Example: `[aeiou]` matches any single lowercase vowel.
- **Character Ranges:** Use a hyphen to specify a range of characters.
    - Example: `[a-g]` matches any lowercase letter from 'a' through 'g'.
    - Example: `[0-9]` matches any single digit.
- **Negation:** A caret (`^`) as the first character inside the brackets inverts the match.
    - Example: `[^0-9]` matches any single character that is *not* a digit.
- **POSIX Character Classes:** Standardized, named sets for portability.
    - Example: `[[:alpha:]]` matches any letter. `[[:digit:]]` matches any digit. `[[:upper:]]` matches any uppercase letter.

#### Core Trade-offs

- **Precision vs. Brevity:** The square bracket wildcard is more precise than `*` and `?`, which reduces the risk of unintended operations. However, it can be more verbose; matching all files starting with 'a' is simpler with `a*` than `a[a-zA-Z0-9_.-]*`.
- **Matching vs. Generating:** It is used for matching patterns against *existing* files. This contrasts with `[[Shell - Curly Bracket Wildcard|curly bracket expansion]]` (`{...}`), which generates a list of strings regardless of whether corresponding files exist.
- **Single Character Limitation:** Its core function is to match exactly one character. It cannot match a sequence of characters or zero characters, which is the domain of the `[[Shell - Asterisk Wildcard|asterisk wildcard]]`.

## Connections

```
                 (Parent)
               Shell - Wildcards
                   ▲
                   │
    ┌──────────────┼──────────────┐
    │              │              │
(Broad Match)  ┌───────────────────────────┐  (String Generation)
Asterisk (*)   │ Square Bracket Wildcard   │  Curly Brackets ({})
               └───────────────────────────┘
                   │
                   │
             (Similar Scope)
          Question Mark (?)
```

### Parent Concept

The square bracket wildcard is a specific type of pattern matching operator falling under the general category of [[Shell - Wildcards]].

### Child Concepts

- This is a fundamental wildcard and does not have distinct conceptual children; rather, it is a building block used in more complex shell patterns and regular expressions.

### Related Concepts 

- It provides more specificity than the [[Shell - Asterisk Wildcard|asterisk wildcard]], which matches zero or more characters of any kind.
- It is more constrained than the [[Shell - Question Mark Wildcard|question mark wildcard]], which matches any single character without restriction.
- It contrasts with [[Shell - Curly Bracket Wildcard|curly bracket expansion]], which generates strings from a given set rather than matching existing files.
## Questions

- You need to clean up log files, keeping only the logs from the first quarter (Jan, Feb, Mar) of 2023. Would you use `rm 2023-0[1-3]-*.log` or a more explicit `find` command with multiple `-o` (or) conditions? Justify your choice in terms of safety and script readability for your team.
- Imagine a data ingestion pipeline where files are named `sensor-[A-Z]-[0-9][0-9].csv`. How would you design a shell script that reliably moves only the files from sensors 'G' through 'M' with numbers between 30 and 59 to a processing directory, while also logging any files that *don't* match the expected naming convention at all?
- What if the shell's square bracket wildcard suddenly supported matching *multiple* characters from the set (e.g., `file[ab].txt` could match `filea.txt`, `fileb.txt`, `fileaa.txt`, `fileab.txt`, etc.)? How would this change its fundamental utility and potentially create ambiguity with the [[Shell - Asterisk Wildcard|asterisk wildcard]]?