---
tags: 
  - major_core
  - shell
  - iteration
  - automation
  - control_flow
  - scripting
  - batch_processing
  - concept
source: 
  - "[[Introduction to shell]]"
related: 
  - "[[Fundamental - Programming]]"
  - "[[Shell - For Loop Syntax]]"
  - "[[Shell - Variables]]"
  - "[[Shell - Accessing Variable Values]]"
  - "[[Shell - Looping Over Files with Wildcards]]"
  - "[[Shell - Running Multiple Commands in a Loop]]"
  - "[[Shell - Handling Filenames with Spaces]]"
  - "[[Shell - Batch Processing Cheatsheet]]"
  - "[[Fundamental - Computer Science]]"
  - "[[Shell - Shell Variables]]"
  - "[[Shell - Environment Variables]]"
  - "[[Shell - Conditionals]]"
  - "[[Shell - Functions]]"
  - "[[Shell - Command Substitution]]"
---
# Major Core: Loops

## Summary

> A loop is a fundamental control flow structure in programming that allows a block of code or a command to be executed repeatedly. In shell scripting, this is most often used to iterate over a list of items, such as filenames, lines in a file, or a sequence of numbers, performing the same operation on each item in turn. This process relies on a [[Shell - Variables|loop variable]] to hold the value of the current item during each iteration.

**Why This Matters:** Loops are the cornerstone of automation in scripting, enabling you to perform an action on hundreds or thousands of files with a single command, saving immense time and preventing manual error.

_Analogy:_ _Imagine you're a baker who needs to put sprinkles on a tray of 100 identical cookies. A loop is like your automated sprinkle machine. You don't manually pick up sprinkles for each cookie. Instead, you set up the machine once (the loop command), tell it which cookies to process (the list of items), and it automatically moves from one cookie to the next, applying sprinkles (the repeated command) until the entire tray is done._

-
**The Sprinkle Machine:** The `for...do...done` structure of the loop.
- **The Tray of Cookies:** The list of items you are iterating over (e.g., a list of filenames).
- **The Current Cookie Being Decorated:** The value held by the [[Shell - Variables|loop variable]] (e.g., `filename`) in each iteration.
- **Applying Sprinkles:** The command or set of commands inside the loop that gets executed for each item.
- **Where it breaks down:** The analogy implies a simple, identical action. Real-world loops can contain complex logic, conditional statements, and commands that change their behavior based on the specific item being processed.

```
    [ Start ]
        │
        ▼
    ┌───────────────────┐
    │  List of Items:   │
    │ [item1, item2, …] │
    └───────────────────┘
        │
        ▼
    ┌───────────────────┐
    │ Any items left?   ├─(No)──> [ End ]
    └─────────┬─────────┘
              │ (Yes)
              ▼
    ┌───────────────────┐
    │ Get next item     │
    │ (e.g., item = item1)│
    └───────────────────┘
              │
              ▼
    ┌───────────────────┐
    │ Execute Command(s)│
    │ on current item   │
    └───────────────────┘
              │
              └─────────┘ (Loop back)
```

## Details

At its heart, a loop is a mechanism for automation. It's a core concept in [[10 Utility Notes/Fundamental - Programming.md|Fundamental - Programming]] that allows you to avoid writing the same command over and over again. Instead of manually running `command file1.txt`, `command file2.txt`, and so on, you define a loop that says, "For every file in this list, run this command on it." This is incredibly powerful for batch processing tasks, like renaming files, converting formats, or analyzing data. The two most common types of loops are **for loops** and **while loops**.

#### Primary Goal

To automate the execution of repetitive tasks over a collection of items, making scripts more efficient, scalable, and maintainable.

#### Mechanism

- **Step 1: Define the List**
    - First, you specify the collection of items the loop will iterate over. This can be an explicit list of strings, a sequence of numbers, or, very commonly, a list of files generated using wildcards (e.g., `*.txt`).
- **Step 2: Initialize the Loop**
    - You use a keyword (like `for`) and declare a [[Shell - Variables|loop variable]] that will hold the value of one item from the list during each pass. For example, `for file in *.txt`.
- **Step 3: Execute the Command Block**
    - Inside the loop (between `do` and `done`), you write the command(s) you want to repeat. Within these commands, you can [[Shell - Accessing Variable Values|access the value of the current item]] by referencing the loop variable (e.g., `echo $file`).
- **Step 4: Iterate**
    - The shell automatically takes the next item from the list, assigns it to the loop variable, and re-runs the command block. This process repeats until every item in the list has been processed.

```python
```bash
# A simple shell script to rename .txt files to .md files

# --- Step 1: Define the List ---
# The list is implicitly defined by the wildcard pattern '*.txt',
# which expands to all files in the current directory ending with .txt.

# --- Step 2: Initialize the Loop ---
# 'file' is the loop variable.
for file in *.txt
do
  # --- Step 3: Execute the Command Block ---
  # Access the current item's value using '$file'.
  # We construct the new filename by removing '.txt' and adding '.md'.
  new_name="${file%.txt}.md"
  echo "Renaming $file to $new_name"
  mv "$file" "$new_name"

# --- Step 4: Iterate ---
# The 'done' keyword marks the end of the block. The loop will now
# grab the next .txt file and repeat the process.
done

echo "All .txt files have been renamed."
```
```

 [[Code - Loops Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **The Item List**
    - This is the collection the loop iterates over. Changing this list (e.g., from `*.txt` to `*.csv`) completely changes what the loop operates on. The size of this list directly impacts how many times the loop runs.
- **The Loop Variable**
    - This is the placeholder that holds the current item's value. The name is arbitrary (e.g., `f`, `item`, `filename`) but should be descriptive. How you use this variable (e.g., `echo $file`, `rm $file`) defines the action.
- **The Command Block**
    - This is the core logic of the loop. It can be a single command or a complex script. Modifying these commands changes the operation performed on each item.

#### Core Trade-offs

- **Pro: Efficiency and Scalability**
    - Loops allow you to process an arbitrary number of items with the same few lines of code. It's just as easy to process 10,000 files as it is to process 10.
- **Pro: Consistency and Reduced Error**
    - Automation ensures the exact same operation is applied to every single item, eliminating the risk of typos or missed steps that come with manual repetition.
- **Con: Handling Edge Cases**
    - Simple loops can fail on unexpected inputs. For example, [[Shell - Handling Filenames with Spaces|filenames with spaces]] can break a basic loop if not quoted properly, leading to errors.
- **Con: Performance**
    - For very large lists or computationally expensive commands inside the loop, a shell loop can be slow compared to tools written in compiled languages. Each command inside the loop often starts a new process, which has overhead.

## Connections

```
                  (Parent)
                Programming
                     ▲
                     │
     ┌───────────────┼────────────────┐
     │               │                │
(Relates to)    ┌──────────────────┐    (Relates to)
Variables       │      Loops       │    Wildcards
                └──────────────────┘
                     │
          ┌──────────┴──────────┐
          │                     │
      For Loops            While Loops
```

### Parent Concept

Loops are a fundamental control flow construct inherited from the broader field of [[10 Utility Notes/Fundamental - Programming.md|Fundamental - Programming]], serving as a primary tool for iteration and automation.

### Child Concepts

- The most common implementation is the [[Shell - For Loop Syntax|for loop]], which is designed to iterate over a static list of items.
- Another key type is the `while` loop, which repeats a block of commands as long as a certain condition remains true.

### Related Concepts 

- Loops almost always use [[Shell - Variables|variables]] to keep track of the current item being processed in each iteration.
- A powerful combination is using loops with [[Shell - Looping Over Files with Wildcards|wildcards]], which allows for dynamic batch processing of files matching a certain pattern.
- The primary application of loops in shell scripting is for creating a [[Shell - Batch Processing Cheatsheet|batch processing]] workflow to automate tasks on multiple files.
- Understanding how to [[Shell - Accessing Variable Values|access a variable's value]] is critical for using the item from the list inside the loop's command block.
## Questions

- You have a script that loops through a million log files to extract a specific pattern. It's correct but takes 12 hours to run. Would you optimize the shell script itself, perhaps by running commands in parallel, or rewrite the logic in a more performant language like Python or Go? Justify your decision based on development time, long-term maintainability, and the required execution speed.
- Imagine you've deployed a script with a loop that processes incoming files in a directory. How would you design a robust system around this script to handle potential failure modes, such as malformed filenames, files with incorrect permissions, or the script crashing mid-loop, leaving the directory in a partially processed state?
- What if the shell had no built-in loop constructs (`for`, `while`)? How could you achieve the same result of iterating over a list of files using only other shell commands and concepts like pipes, `xargs`, or recursion?
