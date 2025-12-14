---
tags: 
  - core
  - shell
  - file_inspection
  - command_line
  - data_preview
  - cli
  - bash
  - concept
source: 
  - "[[Introduction to shell]]"
related: 
  - "[[Shell - File & Content Inspection]]"
  - "[[Shell - tail Command]]"
  - "[[Shell - less Command]]"
  - "[[Shell - cat Command]]"
  - "[[Shell - cut Command]]"
  - "[[Shell - grep Command]]"
  - "[[Shell - Command Flags]]"
  - "[[Shell - head vs cut]]"
  - "[[Shell - Data Manipulation]]"
  - "[[Shell - Productivity Tools]]"
  - "[[Shell - File Inspection & Manipulation Cheatsheet]]"
  - "[[Fundamental - Data Engineering]]"
---
# Core: head Command

## Summary

>The `head` command is a core command-line utility used for [[Shell - File & Content Inspection|file and content inspection]]. It prints the first part of files to standard output, which by default is the first 10 lines. This provides a quick and efficient way to preview a file's structure, such as checking for a header row or observing the delimiter, without needing to open the entire file with a tool like [[Shell - cat Command|cat]] (which displays everything) or [[Shell - less Command|less]] (which is for interactive viewing).

**Why This Matters:** It allows data scientists to instantly verify a dataset's format and content without loading the entire, potentially massive, file into memory.

_Analogy:_ _The `head` command is like skimming the first page of a book before deciding to buy it. The first page gives you the title, the author, the first few paragraphs of the story, and a feel for the writing style. This small sample is often enough to understand the book's genre and basic premise, helping you decide if it's worth reading the whole thing._

**Where it breaks down**: A book's first page is intentionally crafted to be a representative introduction. A file's first 10 lines are simply the first 10 lines; they might not be representative of patterns, errors, or formatting changes that occur deeper within the file.

```
[inventory.csv]
item_id,product_name,stock_count,price  <──┐
A001,Quantum Widget,150,99.99           <──┤
A002,Hyper Sprocket,200,14.50           <──┤
B001,Nano Gear,5000,1.25                <──┤
B002,Omega Spring,250,5.00              <──┤  head inventory.csv
C001,Photon Bolt,0,19.75                <──┤  (Shows first 10 lines)
Z007,Filler Item,10,1.00                <──┤
Z008,Filler Item,10,1.00                <──┤
Z009,Filler Item,10,1.00                <──┤
Z010,Filler Item,10,1.00                <──┘
Z011,Filler Item,10,1.00
...
(Rest of file is ignored)

```

## Details

In data science and software development, you often work with enormous files, like logs or datasets, that can be gigabytes in size. Loading such a file just to see its column headers is incredibly inefficient. The `head` command solves this by providing a lightweight way to peek at the beginning of a file directly in the terminal. It's a fundamental tool for initial data exploration, allowing you to quickly confirm you have the right file and understand its basic layout before committing to more resource-intensive processing.

#### Primary Goal

To display the first few lines of a file to quickly understand its structure and content without processing the entire file.

#### Mechanism


- **Step 1: Target a File**
    - First, identify the file you want to inspect. For this example, we'll create a simple CSV file named `inventory.csv`.
- **Step 2: Execute the Default Command**
    - Run `head` followed by the filename. By default, this will print the first 10 lines to your terminal.
- **Step 3: Specify a Line Count (Optional)**
    - To see a different number of lines, use the `-n` flag, which is a common example of [[Shell - Command Flags|command flags]]. For instance, `head -n 3` will show only the first three lines, which is perfect for checking just the header and the first row of data.

##### Code Translation

```bash
# --- Step 1: Create a sample CSV file for our example ---
echo "item_id,product_name,stock_count,price" > inventory.csv
echo "A001,Quantum Widget,150,99.99" >> inventory.csv
echo "A002,Hyper Sprocket,200,14.50" >> inventory.csv
echo "B001,Nano Gear,5000,1.25" >> inventory.csv
echo "B002,Omega Spring,250,5.00" >> inventory.csv
echo "C001,Photon Bolt,0,19.75" >> inventory.csv
# Add more lines to ensure the file is longer than 10 lines
for i in {7..15}; do echo "Z00$i,Filler Item,10,1.00" >> inventory.csv; done

# --- Step 2: Execute the default command to see the first 10 lines ---
# This gives a good overview of the file's beginning.
head inventory.csv

# --- Step 3: Use the -n flag to see just the header and first data row ---
# This is a very common and efficient check.
head -n 2 inventory.csv
```

#### Key Parameters

- **`-n <number>` (Lines)**
    - This is the most common parameter. It specifies the exact number of lines to display from the top of the file. For example, `head -n 5 data.csv` shows the first five lines.
- **`-c <bytes>` (Bytes)**
    - Instead of lines, this displays the first specified number of bytes. This can be useful for inspecting binary files or data with no newline characters.

#### Core Trade-offs

- **Pro: Speed and Efficiency**
    - It is extremely fast and uses minimal memory because it reads only the beginning of a file, making it ideal for inspecting massive files.
- **Con: Limited View**
    - The beginning of a file may not be representative of the whole. Data corruption, formatting errors, or different patterns could exist later in the file that `head` will not reveal.
- **Con: Row-Oriented**
    - `head` operates on lines (rows). It cannot select or inspect specific columns. For column-based operations, you must use a different tool like [[Shell - cut Command|cut]], a distinction further explained in [[Shell - head vs cut|head vs cut]].

## Connections

```
```
                      (Parent)
            File & Content Inspection
	                     ▲
	                     │
	       ┌───────────────┼────────────────┐
	       │               │                │
(Interactive View)     ┌────────────────┐ (Selects Columns)
           less         │   head Command            │      cut
                 └────────────────┘
                       │
                       ▼
                   (Opposite)
                     tail
```
```

### Parent Concept

It is a fundamental tool within the broader practice of [[Shell - File & Content Inspection|file and content inspection]] in the command line.
### Related Concepts 

- It is the direct opposite of the `tail` command, which shows the *last* few lines of a file.
- While `head` provides a non-interactive glimpse, [[Shell - less Command|less]] is used for interactively navigating and searching through large files.
- Its function of selecting rows is fundamentally different from [[Shell - cut Command|cut]], which is designed to select data by columns.
- The `-n` option is a specific implementation of the general concept of [[Shell - Command Flags|command flags]], which modify a command's behavior.
- The core difference between `head` and `cut` is explored in more detail in [[Shell - head vs cut|head vs cut]].
## Questions

- You're given a 500GB log file from a production server that has crashed, and stakeholders need a root cause analysis ASAP. How would you use `head` in combination with other shell tools as your *first step*, and how would you explain to a non-technical manager why looking at just the 'head' of the file isn't enough to solve the problem?
- Imagine you're building an automated data ingestion pipeline that validates incoming CSV files. How could you incorporate the `head` command to perform a quick, low-cost sanity check on the file's header before committing to a full, resource-intensive parsing job? What specific failure condition would this check prevent?
- What if you were working on a system with extremely limited memory where even loading 10 lines of a file could be too much? How could you replicate the *spirit* of the `head` command (i.e., inspect the start of a file) using byte-level commands instead of line-level commands?