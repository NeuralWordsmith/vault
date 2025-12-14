---
tags: 
  - core
  - shell
  - column_selection
  - field_extraction
  - delimiter
  - data_munging
  - shell_scripting
  - concept
source: 
  - "[[Introduction to shell]]"
related: 
  - "[[Shell - Data Manipulation]]"
  - "[[Shell - paste Command]]"
  - "[[Shell - head Command]]"
  - "[[Shell - grep Command]]"
  - "[[Shell - Command Flags]]"
  - "[[Shell - head vs cut]]"
  - "[[Shell - cut & paste Relationship]]"
  - "[[Shell - File & Content Inspection]]"
  - "[[Shell - awk Command]]"
  - "[[Shell - sed Command]]"
  - "[[Shell - sort Command]]"
  - "[[Shell - uniq Command]]"
  - "[[Shell - File Inspection & Manipulation Cheatsheet]]"
  - "[[Shell - Productivity Tools]]"
---
# Core: cut Command

## Summary

>The `cut` command is a command-line utility that extracts sections (columns or "fields") from each line of a file. Unlike tools like [[Shell - head Command|head]] or `tail` that select rows horizontally, `cut` slices data vertically. Its operation depends on specifying which fields to keep with the `-f` flag and what character separates those fields with the `-d` flag.

**Why This Matters:** The `cut` command is a cornerstone of shell scripting for data processing, enabling the precise extraction of columnar data from files, which is a critical first step in any data cleaning or analysis pipeline.

_Analogy:_ _Think of the `cut` command as a specialized slicer at a bakery. A text file is a whole loaf of bread. The `-d` flag sets the slicer to recognize the natural gaps between pre-sliced pieces (the delimiter, like a comma). The `-f` flag is the instruction you give the baker, like 'I only want the 1st and 3rd slices from this loaf.' The baker then pulls out just those specific slices for you, leaving the rest of the loaf untouched._

**Where it breaks down:** The bakery slicer analogy falters because `cut` is 'simple-minded'. If a raisin inside a slice happens to look like a gap (a delimiter inside a quoted string), `cut` will mistakenly slice the bread right there, ruining the slice. A real baker would know to ignore the raisin and keep the slice whole.

```
Input File (employees.csv)
+-----+---------+-------------+----------------+
| id  | name    | department  | location       |
+-----+---------+-------------+----------------+
| 101 | Alice   | Engineering | "New York, NY" |
| 102 | Bob     | Sales       | Chicago        |
| 103 | Charlie | Engineering | London         |
+-----+---------+-------------+----------------+
                 |
                 ▼
        cut -d',' -f 1,3
                 |
                 ▼
Output
+-----+-------------+
| id  | department  |
+-----+-------------+
| 101 | Engineering |
| 102 | Sales       |
| 103 | Engineering |
+-----+-------------+
```

## Details

While many shell utilities like [[Shell - head Command|head]] and `tail` perform horizontal selection (choosing rows), the `cut` command is designed for vertical selection. Its core idea is to treat each line of a file as a series of fields separated by a specific delimiter. You instruct `cut` which fields you want to extract, and it processes the file line by line, printing only the specified columns. This makes it an incredibly fast and efficient tool for reshaping simple, structured text data directly from the command line.

#### Primary Goal

To extract specific columns (fields) of data from delimited text files or streams.

#### Mechanism


- **Step 1: Identify the Data Structure**
    - First, inspect your file to determine the delimiter character that separates the columns. Common delimiters are commas (`,`), tabs (`\t`), or pipes (`|`).
- **Step 2: Specify the Delimiter**
    - Use the `-d` [[Shell - Command Flags|flag]] to tell `cut` which character to treat as the field separator. For example, `-d ','` for a comma-separated file.
- **Step 3: Select the Fields**
    - Use the `-f` flag to specify which columns you want to keep. You can provide a single number (`-f 1`), a comma-separated list (`-f 1,3`), or a range (`-f 2-4`).
- **Step 4: Execute the Command**
    - Run the command on a file or pipe data into it from another command. The output will be only the columns you selected.

##### Code Translation

```bash
# Let's assume we have a file named 'employees.csv'
#
# File content:
# id,name,department,location
# 101,Alice,Engineering,"New York, NY"
# 102,Bob,Sales,Chicago
# 103,Charlie,Engineering,London

# --- Step 1: The delimiter is a comma (,).

# --- Step 2 & 3: We want to extract the 'id' (field 1) and 'department' (field 3).
# We specify the delimiter with -d ',' and the fields with -f 1,3.

# --- Step 4: Execute the command on the file.
cut -d ',' -f 1,3 employees.csv

# --- Expected Output ---
# id,department
# 101,Engineering
# 102,Sales
# 103,Engineering

# Note how the second record for Alice would be problematic if the delimiter was inside the name field.
# For example, if the data was: 101,"Smith, Alice",Engineering,"New York, NY"
# cut -d ',' -f 2 would incorrectly return " Alice"
```

#### Key Parameters

- **`-f, --fields=LIST`**
    - Specifies the selection of fields. The list can be a single number, a comma-separated list of numbers, or a hyphen-separated range.
    - Example: `-f 1` selects the first field.
    - Example: `-f 1,3` selects the first and third fields.
    - Example: `-f 2-` selects from the second field to the end of the line.
- **`-d, --delimiter=DELIM`**
    - Specifies the character that separates fields. By default, the delimiter is a tab character.
    - Example: `-d ','` uses a comma as the delimiter.
    - Example: `-d ';'` uses a semicolon as the delimiter.
- **`-c, --characters=LIST`**
    - An alternative to field-based cutting, this flag selects specific characters by position, similar to how `-f` selects fields.

#### Core Trade-offs

- **Pro: Simplicity and Performance**
    - `cut` is a lightweight, compiled binary that is extremely fast for its specific task. For simple, well-formed delimited files, it's often the most performant option.
- **Con: No Quote or Escape Character Awareness**
    - This is its primary limitation. `cut` treats every delimiter it sees as a separator, even if it's inside a quoted string (e.g., `"New York, NY"`). This can lead to incorrect field splitting and data corruption for complex CSV or text files. More advanced tools like `awk` are needed for such cases.
- **Con: Single-Character Delimiter Only**
    - The `-d` flag can only accept a single character as a delimiter. It cannot handle multi-character separators (e.g., `||` or `-->`).

## Connections

```
                      (Parent)
              Shell - Data Manipulation
                         ▲
                         │
         ┌───────────────┼────────────────┐
         │               │                │
(Row-based)     ┌──────────────────┐     (Column-based)
Shell - head    │   cut Command    │     Shell - paste
                └──────────────────┘
                         │
                         ▼
                (Often combined with)
                   Shell - grep
```

### Parent Concept

The `cut` command is a fundamental utility within the broader topic of [[Shell - Data Manipulation|shell-based data manipulation]], providing the essential capability of column-based extraction.

### Related Concepts 

- The [[Shell - paste Command|paste command]] provides the inverse functionality, merging columns from multiple files or streams, highlighting the [[Shell - cut & paste Relationship|direct relationship between cut and paste]].
- `cut` contrasts directly with row-oriented tools like [[Shell - head Command|head]] and `tail`, a comparison further explored in [[Shell - head vs cut|head vs cut]].
- It is frequently used in pipelines with [[Shell - grep Command|grep]], where `grep` first filters for relevant rows and `cut` then extracts the desired columns from that subset.
- The use of `-f` and `-d` are primary examples of how [[Shell - Command Flags|command flags]] modify the behavior of a base command.
- For more complex parsing that respects quotes and internal delimiters, `awk` is the more powerful alternative to `cut`.
## Questions

- You have a massive, poorly formatted CSV file where some text fields contain commas. Using `cut` is fast but will corrupt these records. Using a more robust parser like `awk` or a Python script is slower. How do you decide which tool to use, and how would you justify the potential data loss or performance hit to your team?
- In a data ingestion pipeline, you're using `cut` to preprocess incoming log files before loading them into a database. What monitoring would you put in place to detect if the upstream log format changes (e.g., a new column is added or the delimiter changes), and how would your pipeline react to prevent data corruption?
- What if you were tasked with recreating the core functionality of `cut -f` for a single-character delimiter, but you were only allowed to use `grep` and `sed`? How would you approach this, and what would be the major performance implications?