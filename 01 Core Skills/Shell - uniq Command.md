---
tags: 
  - core
  - shell
  - deduplication
  - text_processing
  - command_line
  - filter
  - adjacent_lines
  - concept
source: 
  - "[[Introduction to shell]]"
related: 
  - "[[Shell - sort Command]]"
  - "[[Shell - sort & uniq Relationship]]"
  - "[[Shell - Pipelines]]"
  - "[[Shell - Redirection]]"
  - "[[Shell - wc Command]]"
  - "[[Shell - grep Command]]"
  - "[[Shell - awk Command]]"
  - "[[Shell - sed Command]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[Shell - Command Line Utilities]]"
  - "[[Shell - Wildcards]]"
  - "[[Shell - Common Commands Cheatsheet 3]]"
  - "[[Shell - Redirection & Pipelines Relationship]]"
  - "[[Shell - Stopping Programs]]"
---
# Core: uniq Command

## Summary

>The `uniq` command is a core command-line utility in Unix-like systems used for text processing. Its specific function is to filter and remove adjacent, duplicate lines from a file or an input stream. The key word is *adjacent*; it only compares a line to the one immediately preceding it. To find and remove all duplicate lines regardless of their position, the data must first be processed by the [[Shell - sort Command|sort command]], a crucial partnership detailed in [[Shell - sort & uniq Relationship]].

**Why This Matters:** It provides a highly efficient way to filter out redundant, consecutive entries from text streams, a fundamental task in data cleaning and log analysis.

_Analogy:_ _Imagine a quality control inspector on a fast-moving assembly line. Their job is to remove any item that is an exact duplicate of the one that just came before it. They pick up an item, glance at the one that just passed, and if they're identical, they discard the current one. If they're different, they let it pass. The inspector has no memory of items that passed a minute ago, only the immediately preceding one._

**Where it breaks down:** The analogy holds perfectly for `uniq`'s limitation. If a blue widget comes down the line, followed by a red one, and then another blue one, our inspector won't flag the second blue widget as a duplicate because it wasn't adjacent to the first. To catch all duplicate blue widgets, someone would first need to sort all the items by color, grouping them together for the inspector.

```
Unsorted Input      uniq       Output
+-----------+                +-----------+
| eggs      | ───────────>   | eggs      |
| milk      | ─┐             | milk      |
| milk      | ─┘(adjacent)   +-----------+
| bread     |   (removed)    | bread     |
| eggs      | ───────────>   | eggs      |
+-----------+                +-----------+

Sorted Input        uniq       Final Output
+-----------+                +-----------+
| bread     | ───────────>   | bread     |
| eggs      | ─┐             | eggs      |
| eggs      | ─┘(adjacent)   +-----------+
| milk      | ─┐ (removed)   | milk      |
| milk      | ─┘(adjacent)   +-----------+
+-----------+   (removed)
```

## Details

The `uniq` command is a fundamental filter in shell scripting, designed for efficiency. It operates by reading an input, comparing each line only with the previous line it read, and then writing the unique lines to its output. This localized comparison makes it extremely fast and light on memory, as it never needs to hold more than two lines in memory. However, this design choice means it is not a global deduplication tool on its own. Its true power is unlocked when it is combined with other commands, most notably using [[Shell - Pipelines|pipelines]] to receive sorted input from the `[[Shell - sort Command|sort]]` command, enabling it to identify and remove all duplicate lines within a dataset.

#### Primary Goal

To filter and report on repeated adjacent lines in a text file or data stream.

#### Mechanism


- **Step 1: Prepare the Input Data**
    - First, we create a simple text file named `shopping.txt` that contains duplicate items. Notice that some duplicates are adjacent (`milk`) while others are not (`eggs`).
- **Step 2: Run `uniq` on Unsorted Data**
    - When we run `uniq` directly on the file, it only removes the second `milk` because it was adjacent to the first. The second `eggs` line remains because it was separated by `bread`.
- **Step 3: Sort the Data and Pipe to `uniq`**
    - This is the canonical use case. We first use the `sort` command to group all identical lines together. Then, we use a pipe (`|`) to send that sorted output directly into the `uniq` command. Now, `uniq` can see all identical lines as adjacent and correctly removes all duplicates.

##### Code Translation

```python
```bash
# --- Step 1: Prepare the Input Data ---
# Create a file named 'shopping.txt'
cat > shopping.txt << EOL
eggs
milk
milk
bread
eggs
EOL

echo "--- Original File ---"
cat shopping.txt

# --- Step 2: Run uniq on Unsorted Data ---
# Note: Only the adjacent 'milk' duplicate is removed.
echo -e "\n--- Output of 'uniq shopping.txt' ---"
uniq shopping.txt

# --- Step 3: Sort the Data and Pipe to uniq ---
# Note: All duplicates are now correctly removed.
echo -e "\n--- Output of 'sort shopping.txt | uniq' ---"
sort shopping.txt | uniq
```
```

 [[Code - uniq Command Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`-c` or `--count`**: The most common flag. It prefixes each line with the number of times it occurred consecutively.
    - *Example:* `sort shopping.txt | uniq -c` would output `1 bread`, `2 eggs`, `2 milk`.
- **`-d` or `--repeated`**: Only prints the lines that were duplicated (i.e., appeared more than once consecutively).
    - *Example:* `sort shopping.txt | uniq -d` would output `eggs` and `milk`.
- **`-u` or `--unique`**: The opposite of `-d`. It only prints lines that were not repeated (i.e., appeared only once).
    - *Example:* `sort shopping.txt | uniq -u` would output `bread`.
- **`-i` or `--ignore-case`**: Makes the line comparison case-insensitive.
    - *Example:* With this flag, `Apple` and `apple` would be considered duplicates.

#### Core Trade-offs

- **Pro: Speed and Memory Efficiency**
    - Because `uniq` only needs to store the previous line to perform its comparison, it uses minimal memory and runs extremely quickly, making it ideal for processing very large files or streams.
- **Con: Requires Pre-Sorted Data for Global Uniqueness**
    - Its primary limitation is its inability to find non-adjacent duplicates. This forces a dependency on the `sort` command, which can be memory and CPU intensive for large files, as detailed in [[Shell - sort & uniq Relationship]].
- **Pro: Composability (The Unix Philosophy)**
    - `uniq` is a perfect example of the Unix philosophy: write programs that do one thing and do it well. It is designed to be a building block, easily combined with `sort`, `cat`, `grep`, and [[Shell - wc Command|wc]] using [[Shell - Pipelines|pipelines]] to create powerful and flexible text-processing workflows.

## Connections

```
                               (Parent)
                    Shell - Command Line Utilities
                                  ▲
                                  │
┌─────────────────────────────────┼─────────────────────────────────┐
│                                 │                                 │
(Prerequisite)           ┌──────────────────┐                (Used With)
[[Shell - sort Command|sort Command]]        │   uniq Command   │                [[Shell - Pipelines|Pipelines]]
                         └──────────────────┘
```

### Parent Concept

`uniq` is a fundamental utility within the broader category of [[Shell - Command Line Utilities]], which are programs used to perform tasks from a text-based interface.

### Child Concepts



### Related Concepts 

- The `uniq` command is almost always used in conjunction with the [[Shell - sort Command|sort command]], as sorting is a prerequisite for finding all duplicate lines in a file.
- The relationship between these two commands is so fundamental that it's explored in detail in [[Shell - sort & uniq Relationship]].
- It is a classic example of a filter program that is chained with other commands using [[Shell - Pipelines|pipelines]] to create powerful one-liners.
- After deduplication, one might pipe the output to the [[Shell - wc Command|wc command]] to count the number of unique lines remaining.
## Questions

- You have a 100GB log file with many duplicate error messages, but they are not sorted by timestamp. The business needs a count of unique error types *as quickly as possible*. Would you sort the entire file first then use `uniq -c`, or would you use a different approach like `awk` or a script to count uniques without a full sort? Justify your choice based on the trade-off between development time, memory usage, and execution speed.
- Imagine you're building a data ingestion pipeline that receives a continuous stream of events. How would you design a system to deduplicate events within a 5-minute window in real-time? How does the 'adjacent-only' nature of `uniq` make it both suitable and unsuitable for different parts of this problem?
- What if memory was infinite and free, but CPU cycles were extremely expensive? Would the `sort | uniq` pattern still be the standard approach for deduplication, or would a hash-based in-memory approach become universally dominant? Why?