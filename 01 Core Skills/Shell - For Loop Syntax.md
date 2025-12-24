---
tags: 
  - core
  - shell
  - for_loop
  - iteration
  - automation
  - bash
  - scripting
  - concept
source: 
  - "[[Introduction to shell]]"
related: 
  - "[[Shell - Variables]]"
  - "[[Shell - Accessing Variable Values]]"
  - "[[Shell - Looping Over Files with Wildcards]]"
  - "[[Shell - Running Multiple Commands in a Loop]]"
  - "[[Shell - Handling Filenames with Spaces]]"
  - "[[Shell - Batch Processing Cheatsheet]]"
  - "[[Fundamental - Programming]]"
  - "[[Shell - Shell Variables]]"
  - "[[Shell - Environment Variables]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Fundamental - Computer Science]]"
---
# Core: Loops

## Summary

>A shell loop is a fundamental control structure that repeatedly executes a set of commands for each item in a given list. It provides a simple yet powerful way to automate repetitive tasks directly from the command line. The core syntax involves defining a list of items to process, a placeholder [[Shell - Variables|variable]] to hold the current item, and a body of commands that are executed in each iteration.

**Why This Matters:** Shell loops are the cornerstone of automation, enabling you to perform the same operation on hundreds or thousands of files with a single, short command.

_Analogy:_ _Imagine a factory assembly line for packaging different types of fruit. The conveyor belt holds a sequence of fruits (apples, oranges, bananas) — this is the **List**. At one station, a worker picks up one fruit at a time; this worker is the **Variable**, temporarily holding the current fruit. The worker's specific task, like putting the fruit in a box and adding a sticker, is the **Body** of the loop. The entire process, from the first fruit to the last, is the loop itself._

*   **List**: The collection of fruits on the conveyor belt (`apple orange banana`).
*   **Variable**: The worker who can only hold one fruit at a time (`current_fruit`).
*   **Body**: The set of actions performed on that fruit (`package $current_fruit`).
*   **Where it breaks down:** A shell loop processes items sequentially, one after the other. Many modern assembly lines can perform tasks in parallel, which is a more advanced concept not captured by a basic `for` loop.

```
Start -> [ Take 'gif' from LIST ] -> [ filetype = 'gif' ] -> [ echo $filetype ] -> (More items?) --Yes--> [ Take 'jpg' from LIST ] -> ...
                                                                                                   |
                                                                                                   No
                                                                                                   |
                                                                                                  End
```

## Details

In shell scripting, a `for` loop provides a structured mechanism to iterate over a series of words, filenames, or other pieces of data. The basic idea is to take a list, and for every single item in that list, execute one or more commands. This avoids the tedious and error-prone process of manually running the same command over and over again. The structure is defined by three key parts: the **List** of items, the placeholder **Variable**, and the command **Body**.

#### Primary Goal

To automate repetitive tasks by executing a block of commands for each item in a specified list.

#### Mechanism


- **How it Works:** The shell reads the loop syntax from left to right.
    1.  **Initialization**: The shell identifies the `for` keyword, the variable name, the `in` keyword, and the list of items.
    2.  **First Iteration**: It takes the first item from the list and assigns its value to the variable.
    3.  **Execution**: It executes all commands between `do` and `done`. Inside this 'body', you can use the variable (e.g., `$filetype`) to refer to the current item's value, which is a process known as [[Shell - Accessing Variable Values|accessing the variable's value]].
    4.  **Subsequent Iterations**: It goes back to the beginning, takes the *next* item from the list, assigns it to the same variable (overwriting the previous value), and executes the body again.
    5.  **Termination**: This process repeats until every item in the list has been processed. Once the list is empty, the loop terminates, and the shell moves on to the next command after `done`.

##### Code Translation

```python
```bash
# This script demonstrates a basic for loop that iterates over a list of file extensions.

# --- The entire loop is typically written on one line or broken up for readability ---

# The List: 'gif' 'jpg' 'png'
# The Variable: 'filetype'
# The Body: 'echo "Found an image type: $filetype"'

for filetype in gif jpg png; do
  echo "Found an image type: $filetype"
done

# Expected Output:
# Found an image type: gif
# Found an image type: jpg
# Found an image type: png
```
```

 [[Code - Loops Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **The List**: This is the most critical parameter. It defines what and how many times the loop will run.
    - It can be a static, space-separated list of strings (e.g., `red green blue`).
    - It can be generated dynamically, for example by using wildcards to create a list of files, as seen in [[Shell - Looping Over Files with Wildcards|looping over files]].
- **The Body**: This defines the action to be performed. It can be a single simple command or a complex series of commands, as explored in [[Shell - Running Multiple Commands in a Loop|running multiple commands in a loop]].

#### Core Trade-offs

- **Simplicity vs. Complexity**: Shell loops are incredibly simple for basic tasks but can become hard to read and maintain as the logic inside the body grows. For complex data manipulation, a dedicated scripting language like Python might be more suitable.
- **Performance**: For a few hundred or thousand items, shell loops are perfectly efficient. However, for millions of items, the overhead of starting a new process for each command in the loop can become a significant bottleneck.
- **Fragility with Special Characters**: By default, shell loops split items by spaces and newlines. This can cause unexpected behavior when [[Shell - Handling Filenames with Spaces|handling filenames with spaces]] or other special characters, requiring more careful syntax to manage correctly.

## Connections

```
                      (Parent)
                   Fundamental - Programming
                           ▲
                           │
    ┌────────────────────┼───────────────────────────┐
    │                    │                           │
(Built Upon)      ┌──────────────┐             (Enables)
Shell - Variables │ Shell - Loops│      Shell - Batch Processing Cheatsheet
                  └──────────────┘
                         │
              ┌──────────┴──────────┐
              │                     │
Shell - Looping Over    Shell - Running Multiple
Files with Wildcards    Commands in a Loop
```

### Parent Concept

Is a fundamental concept within [[10 Utility Notes/Fundamental - Programming.md|Fundamental - Programming]], representing the core idea of iteration.

### Child Concepts

- A common application is [[Shell - Looping Over Files with Wildcards|looping over files with wildcards]], which dynamically generates the list of items from the contents of a directory.
- The concept can be extended by [[Shell - Running Multiple Commands in a Loop|running multiple commands in a loop]], allowing for more complex, multi-step workflows for each item.

### Related Concepts 

- Loops are fundamentally built upon the concept of [[Shell - Variables|shell variables]], which act as the placeholder for the current item in each iteration.
- Inside the loop's body, [[Shell - Accessing Variable Values|accessing variable values]] using the dollar sign (e.g., `$my_var`) is essential to perform actions on the current item.
- The primary purpose of loops is to enable efficient automation, which is summarized in the [[Shell - Batch Processing Cheatsheet|batch processing cheatsheet]].
- A key challenge in writing robust loops involves [[Shell - Handling Filenames with Spaces|handling filenames with spaces]], which requires special quoting.
## Questions

- You have a directory with 10,000 log files that need a specific line removed. You could write a simple shell loop or a more robust Python script. How would you decide which to use, and what business factors (like developer time vs. script runtime) would influence your choice?
- Imagine you need to use a shell loop to process a million small image files on a network-attached storage (NAS) system. What are the potential performance bottlenecks in your system (CPU, I/O, network), and how might you design the loop's body to minimize them?
- What if the `for` keyword was removed from the shell? How could you replicate the functionality of iterating over a list of filenames using other shell commands like `while`, `read`, and command substitution?