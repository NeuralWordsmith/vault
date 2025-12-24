---
tags: 
  - core
  - shell
  - batch_processing
  - wildcards
  - globbing
  - shell_scripting
  - automation
  - concept
source: 
  - "[[Introduction to shell]]"
related: 
  - "[[Shell - Loops]]"
  - "[[Shell - For Loop Syntax]]"
  - "[[Shell - Variables]]"
  - "[[Shell - Accessing Variable Values]]"
  - "[[Shell - Batch Processing Cheatsheet]]"
  - "[[Shell - Handling Filenames with Spaces]]"
  - "[[Shell - Running Multiple Commands in a Loop]]"
  - "[[Fundamental - Programming]]"
  - "[[Shell - Shell Variables]]"
  - "[[Shell - Environment Variables]]"
  - "[[Shell - Wildcards]]"
  - "[[Shell - find Command]]"
  - "[[Shell - xargs Command]]"
---
# Core: Combining Wildcards with Loops

## Summary

>Combining wildcards with loops is a fundamental shell scripting technique where a pattern-matching wildcard (like `*` or `?`) generates a list of files, and a `for` loop iterates through that list, executing one or more commands for each file. This is a powerful way to automate repetitive tasks, building directly on the concepts of [[Shell - Loops|loops]] and the [[Shell - For Loop Syntax|for loop syntax]].

**Why This Matters:** This technique is the cornerstone of shell automation, enabling you to perform an operation on hundreds or thousands of files with a single, concise command.

_Analogy:_ _Imagine you're a librarian who needs to stamp "OVERDUE" on every book in the 'Fantasy' section. Instead of looking up each book's title individually, you just go to the 'Fantasy' shelf (the wildcard pattern, e.g., `fantasy/*`) and grab every book one by one (the loop), stamping each one (the command) before moving to the next._

{
    "Librarian": "The shell script or user.",
    "'Fantasy' Shelf": "The directory or path pattern (`seasonal/`).",
    "Every Book on the Shelf": "The files matched by the wildcard (`*`).",
    "Grabbing One Book at a Time": "The `for` loop assigning a filename to a variable.",
    "Stamping \"OVERDUE\"": "The command(s) executed inside the loop (`echo`, `mv`, `grep`, etc.).",
    "Where it breaks down": "The analogy doesn't capture the complexity of different wildcards (`?`, `[]`) or the potential issues that arise, such as what happens if a book title has a weird character or if the shelf is so long it's impossible to grab all the books at once (argument list too long error)."
}

```
```
Shell sees: for file in seasonal/*.csv

     │
     ▼
1. EXPANSION (Globbing)
   "seasonal/spring.csv seasonal/summer.csv ..."
     │
     ▼
2. LOOP START
   ┌──────────────────────────────────────────┐
   │ do                                       │
   │   echo "Processing $file"                │
   │   wc -l "$file"                          │
   │ done                                     │
   └──────────────────────────────────────────┘
     │
     ├─ Iteration 1: file="seasonal/spring.csv"  ──> Executes commands
     ├─ Iteration 2: file="seasonal/summer.csv"  ──> Executes commands
     └─ ...and so on for all matched files.
```
```

## Details

In shell scripting, performing the same action on multiple files is a common requirement. Instead of writing a separate command for each file, you can leverage the power of automation. The core idea is to use a wildcard pattern (a technique also known as "globbing") to dynamically create a list of filenames. This list is then fed directly into a `for` loop, which systematically processes each item in the list. This combination turns a potentially tedious, manual task into an efficient, one-line command or a small script.

#### Primary Goal

To automate repetitive operations on a collection of files that share a common naming pattern or location.

#### Mechanism


- **Step 1: Define the Pattern**
    - Identify the set of files you want to process. The shell expands the wildcard pattern (e.g., `seasonal/*.csv`) into a list of all matching filenames *before* the loop starts.
- **Step 2: Initialize the Loop**
    - Use the `for` loop syntax. The list of filenames generated in Step 1 is assigned to the loop. A [[Shell - Variables|variable]] (e.g., `filename`) is declared to hold the name of the current file being processed in each iteration.
- **Step 3: Execute Commands**
    - Inside the loop (between `do` and `done`), write the command(s) you want to execute. Use the loop variable (e.g., `$filename` as explained in [[Shell - Accessing Variable Values|accessing variable values]]) to refer to the current file. This allows the same command to operate on a different file in each iteration.

##### Code Translation

```python
```bash
# --- Step 1: The pattern 'seasonal/*.csv' is expanded by the shell first.
# Let's say it expands to: seasonal/spring.csv seasonal/summer.csv seasonal/autumn.csv seasonal/winter.csv

# --- Step 2: The loop is initialized with this list.
# The variable 'file' will take on each value in sequence.
for file in seasonal/*.csv
do
  # --- Step 3: Commands are executed for each file.
  echo "Processing file: $file"
  # Example: Count the number of lines in the current file
  wc -l "$file"
done

echo "Batch processing complete."
```
```

 [[Code - Combining Wildcards with Loops Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Wildcard Pattern**
    - This is the primary lever. You can make it more or less specific.
    - `*`: Matches any number of characters. `data/*.txt` matches all text files in the `data` directory.
    - `?`: Matches exactly one character. `data/report_?.csv` matches `report_1.csv` but not `report_10.csv`.
    - `[]`: Matches any single character within the brackets. `data/[abc].log` matches `a.log`, `b.log`, and `c.log`.
- **Loop Variable Name**
    - The name used to store the filename in each iteration (e.g., `file`, `filename`, `f`). This is arbitrary but should be descriptive.

#### Core Trade-offs

- **Risk of Over-matching**
    - A broad wildcard like `*` might accidentally match files you didn't intend to process (e.g., temporary files, backups), potentially leading to data loss or corruption. It's safer to be as specific as possible.
- **Handling Special Characters**
    - Filenames with spaces or other special characters can break simple loops. This requires careful quoting, a topic covered in [[Shell - Handling Filenames with Spaces|handling filenames with spaces]].
- **Performance and Limits**
    - On systems with a very large number of matching files (tens of thousands), the initial wildcard expansion can exceed the command-line argument length limit, causing the command to fail with an "Argument list too long" error. In such cases, `find` with `-exec` or a `while` loop is a better alternative.

## Connections

```
```
                  (Parent)
                 Shell - Loops
                       ▲
                       │
       ┌───────────────┼────────────────────────────┐
       │               │                            │
(Related Concept) ┌───────────────────────────┐ (Related Technique)
For Loop Syntax   │ Combining Wildcards w/Loops │ Batch Processing
                  └───────────────────────────┘
                       │
                       ▼
                (Common Pitfall)
         Handling Filenames with Spaces
```
```

### Parent Concept

This technique is a direct and powerful application of the general concept of [[Shell - Loops|shell loops]].

### Child Concepts



### Related Concepts 

- The structure of the loop itself is defined by the [[Shell - For Loop Syntax|for loop syntax]].
- This combination is the foundation for creating simple, effective scripts for batch processing, as outlined in the [[Shell - Batch Processing Cheatsheet|batch processing cheatsheet]].
- A common challenge when using this method is correctly [[Shell - Handling Filenames with Spaces|handling filenames that contain spaces]] or other special characters.
## Questions

- You need to rename 10,000 `.jpeg` files to `.jpg`. You could use a broad `*.jpeg` pattern, but you notice some files are named like `final_report.jpeg.bak`. How do you construct your loop and pattern to minimize the risk of incorrectly renaming backup files, and how would you justify the extra complexity to your manager in terms of preventing data loss?
- Your script `for file in /logs/*; do ...` fails with an 'Argument list too long' error because the `/logs` directory contains millions of files. How would you re-architect this batch processing job to handle this scale, and what are the performance implications of your new approach?
- What if the shell did not automatically expand wildcards before executing a command? How would you have to change your `for` loop structure to manually find and iterate over all `.csv` files in a directory?