---
tags: 
  - core
  - shell
  - shell_scripting
  - bash
  - assignment
  - scope
  - zsh
  - concept
source: 
  - "[[Introduction to shell]]"
related: 
  - "[[Shell - Variables]]"
  - "[[Shell - Environment Variables]]"
  - "[[Shell - Accessing Variable Values]]"
  - "[[Shell - For Loop Syntax]]"
  - "[[Shell - Loops]]"
  - "[[Shell - Running Multiple Commands in a Loop]]"
  - "[[Shell - Handling Filenames with Spaces]]"
  - "[[Shell - Batch Processing Cheatsheet]]"
  - "[[Fundamental - Programming]]"
  - "[[Shell - Quoting]]"
  - "[[Shell - Command Substitution]]"
  - "[[Shell - Arithmetic Expansion]]"
---
# Core: Shell - Local Variables

## Summary

>A local variable in a shell script is a user-defined placeholder that stores a piece of information, like a filename or a configuration setting, which exists only within the current shell session or script. It's created by assigning a value to a name and is fundamental for writing non-trivial scripts. This contrasts with [[Shell - Environment Variables|environment variables]], which are available to child processes.

**Why This Matters:** Local variables are essential for making shell scripts dynamic and reusable by allowing you to store and manipulate temporary data within the script's execution.

_Analogy:_ _Think of a local shell variable as a sticky note you write for yourself while working on a specific task at your desk. You might write "Project File: report_v3.docx" on it and stick it to your monitor. It's a temporary reminder, visible only to you at your desk, and you'll throw it away once the task is done._

In this analogy:
- **The Sticky Note:** Represents the variable's name (e.g., `PROJECT_FILE`).
- **The Text on the Note:** Represents the value stored in the variable (e.g., `"report_v3.docx"`).
- **Your Desk:** Represents the current shell session or script where the variable is defined.
- **You:** Represents the script or user who can see and use the variable.
- **Throwing it Away:** Represents the variable disappearing when the script finishes or the shell session closes.
- **Where it breaks down:** Unlike a physical sticky note, a shell variable's value can be programmatically changed, updated, and used in logic (like in a [[Shell - Loops|loop]]) instantly. The analogy doesn't capture this dynamic, computational aspect.

```
```
Variable Name      Assignment Operator      Value
   │                    │                     │
   ▼                    ▼                     ▼
training       =       seasonal/summer.csv

[CRITICAL: NO SPACES AROUND =]
```
```

## Details

In shell scripting, local variables are temporary containers you create to hold data. The fundamental action is assigning a value to a name using the equals sign (`=`). The most critical syntax rule, and a common source of errors for beginners, is that there must be absolutely no spaces around the equals sign. For example, `FILENAME="report.txt"` is correct, while `FILENAME = "report.txt"` will fail. These variables are distinct from [[Shell - Environment Variables|environment variables]], which are inherited by child processes. Understanding how to create and then use these variables by [[Shell - Accessing Variable Values|accessing their values]] is the first step towards writing powerful and flexible scripts.

#### Primary Goal

To temporarily store and reference data within a single script or shell session, making the script more readable, maintainable, and dynamic.

#### Mechanism


- **Step 1: Choose a Name**
    - Decide on a descriptive name for your variable. By convention, variable names are often in `UPPERCASE_SNAKE_CASE` to distinguish them from commands, especially for variables that hold important, constant-like values.
- **Step 2: Assign a Value**
    - Use the equals sign (`=`) to assign a value to the name. Remember the crucial rule: no spaces around the `=`.
- **Step 3: Handle Spaces in Values**
    - If the value you are assigning contains spaces, you must enclose it in quotes (either single `'` or double `"`). Double quotes allow for variable expansion within them, while single quotes treat everything literally.

##### Code Translation

```python
```bash
# --- Step 1 & 2: Define variables (no spaces around =) ---
# A simple variable holding a file path
TRAINING_DATA=seasonal/summer.csv

# A variable holding a number
EPOCHS=100

# --- Step 3: Use quotes for values with spaces ---
MODEL_NAME="Seasonal Sales Predictor"

# --- Accessing the variables (see [[Shell - Accessing Variable Values]]) ---
echo "Training data is located at: $TRAINING_DATA"
echo "Model name: $MODEL_NAME"
echo "Training for $EPOCHS epochs."
```
```

 [[Code - Shell - Local Variables Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Naming Conventions**
    - While you can use lowercase, the common convention is `ALL_CAPS_WITH_UNDERSCORES` for shell variables to avoid conflicts with system commands. Names must start with a letter or underscore.
- **Quoting**
    - The choice between single (`'`) and double (`"`) quotes is significant. Double quotes allow the shell to interpret special characters like `$` (for variable expansion), while single quotes treat every character literally.

#### Core Trade-offs

- **Scope Limitation**
    - The primary characteristic of a local variable is its limited scope. It exists only in the current shell process and is not automatically passed down to any scripts or commands that your script calls. This is a feature for preventing pollution, but a limitation if you need to pass information to sub-processes.
- **Contrast with Environment Variables**
    - To make a variable available to child processes, you must explicitly `export` it, which promotes it to an [[Shell - Environment Variables|environment variable]]. This is a key design choice when writing complex scripts that call other scripts.
- **Typeless Nature**
    - Shell variables are fundamentally strings. While you can perform arithmetic operations, the shell might require explicit commands (like `let` or `((...))`) to treat them as numbers, which can be less intuitive than in typed programming languages.

## Connections

```
```
                  (Parent)
               Shell Variables
                       ▲
                       │
       ┌───────────────┼────────────────────────────┐
       │               │                            │
(Contrast)    ┌───────────────────────────┐      (Next Step)
Environment   │   Shell - Local Variables   │      Accessing Values
Variables     └───────────────────────────┘
                       │
                       │
                   (Used In)
                  For Loops
```
```

### Parent Concept

This concept is a specific type of [[Shell - Variables|shell variable]], which is the general term for named data storage in shell scripting.

### Child Concepts



### Related Concepts 

- It directly contrasts with [[Shell - Environment Variables|environment variables]], which are designed to be inherited by child processes.
- Once created, the next logical step is [[Shell - Accessing Variable Values|accessing the variable's value]] to use it in a command.
- Local variables are fundamental building blocks for control structures like the [[Shell - For Loop Syntax|for loop]], where they often serve as counters or iterators.
## Questions

- You're writing a script to process sensitive data, like API keys. Would you store these keys in local or environment variables? Justify your choice in terms of security and script portability for other team members.
- Imagine a complex batch processing script that calls several helper scripts. If the main script calculates a temporary filename that all helper scripts need to use, how would you design the variable passing mechanism to be both efficient and maintainable, and what are the risks of your chosen approach?
- What if the shell had strict data types like Python (e.g., integer, string, boolean)? How would this fundamentally change the way you write scripts, especially concerning command-line argument parsing and arithmetic operations?