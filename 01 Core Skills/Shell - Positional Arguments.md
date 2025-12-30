---
tags: 
  - core
  - shell
  - positional_parameters
  - shell_scripting
  - bash_arguments
  - command_line_input
  - special_variables
  - concept
source: 
  - "[[Introduction to shell]]"
related: 
  - "[[Shell - Shell Scripts]]"
  - "[[Shell - Executing Scripts]]"
  - "[[Shell - The Special Variable]]"
  - "[[Shell - Scripting Fundamentals Cheatsheet]]"
  - "[[Shell - Nano Editor]]"
  - "[[Shell - Script Comments]]"
  - "[[Shell - Troubleshooting Hanging Scripts]]"
  - "[[Shell - Saving Command History to a Script]]"
  - "[[Fundamental - Programming]]"
  - "[[Fundamental - Computer Science]]"
---
# Core: Script Arguments

## Summary

>In shell scripting, arguments (also known as positional parameters) are values passed to a script when it is executed from the command line. The shell automatically assigns these values to special variables inside the script, such as `$1` for the first argument, `$2` for the second, and so on. This allows a single script to operate on different files, use different settings, or perform varied tasks based on the input provided at runtime.

**Why This Matters:** Using script arguments transforms a static, single-purpose script into a flexible and reusable tool that can adapt to different inputs without changing its code.

_Analogy:_ _Think of a shell script as a recipe for making a smoothie. The recipe itself (`the script`) has fixed instructions: 'Blend fruit, liquid, and a thickener.' However, the recipe is designed to be flexible. The specific ingredients you use each time you make it are the 'arguments'. One day you might run the 'recipe' with `banana` (`$1`), `milk` (`$2`), and `yogurt` (`$3`). The next day, you might use `strawberry` (`$1`), `orange_juice` (`$2`), and `ice` (`$3`). The core instructions (the script) don't change, but the inputs (the arguments) do, resulting in a different smoothie each time._

The recipe instructions map to the commands within the script. The specific ingredients you choose (banana, milk) map to the argument values (`seasonal/autumn.csv`, `1`). The placeholders in the recipe ('fruit', 'liquid') map to the special variables (`$1`, `$2`).

*   **Where it breaks down:** Unlike a recipe where you might intuitively know what 'fruit' means, a shell script doesn't inherently know the *type* or *meaning* of an argument. It just sees a string of text. If you pass the arguments in the wrong order (e.g., `milk`, `banana` instead of `banana`, `milk`), the script will likely fail or produce incorrect results, whereas a person might be able to figure it out.

```
Command Line:
+----------------------------------------------------+
| > bash column.sh  seasonal/autumn.csv  1           |
+-------------------|--------------------|-----------+
                    |                    |
                    |                    | Mapped to $2
                    |                    |
                    | Mapped to $1       |
                    |                    |
                    v                    v
Inside `column.sh`:
+----------------------------------------------------+
|                                                    |
|   cut -d , -f $2 $1                                |
|                                                    |
+----------------------------------------------------+
```

## Details

The core idea behind script arguments is to make [[Shell - Shell Scripts|shell scripts]] dynamic and interactive. Instead of hard-coding filenames or configuration values directly into the script, you can supply them on the command line when you run it. The shell provides a simple mechanism to access these values using positional parameters: special variables denoted by a dollar sign followed by a number (`$1`, `$2`, `$3`, ...). This allows the same script to be reused in many different contexts, forming a fundamental building block for automation.

#### Primary Goal

To allow a user to pass data into a script from the command line, making the script flexible and reusable without needing to edit its source code for every new task.

#### Mechanism


- **Step 1: Create the Script File**
    - First, create a new script file using an editor like [[Shell - Nano Editor|Nano]]. For this example, we'll name it `column.sh`.
- **Step 2: Write the Script with Positional Parameters**
    - Inside the script, write the command you want to execute, but use `$1`, `$2`, etc., as placeholders for the values that will be provided later. Here, `$1` will be the filename and `$2` will be the column number for the `cut` command.
- **Step 3: Execute the Script with Arguments**
    - Run the script using `bash`. After the script's name, list the arguments you want to pass to it, separated by spaces. The shell will automatically map `seasonal/autumn.csv` to `$1` and `1` to `$2` inside the script.

##### Code Translation

```python
#!/bin/bash

# This script extracts a specific column from a CSV file.
# It expects the filename as the first argument ($1) and the column number as the second ($2).

# --- Step 1 & 2: The script content of column.sh ---
# The script uses the arguments to construct the final command.
# $1 will be replaced by the first argument passed on the command line.
# $2 will be replaced by the second argument.
cut -d , -f $2 $1

# --- Step 3: How to execute this script from the terminal ---
# > bash column.sh seasonal/autumn.csv 1
#
# In this execution:
# 'seasonal/autumn.csv' becomes $1
# '1' becomes $2
# The command that actually runs is: cut -d , -f 1 seasonal/autumn.csv
```

 [[Code - Script Arguments Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Positional Parameters (`$1`, `$2`, ...)**
    - These variables hold the individual arguments passed to the script. `$1` holds the first, `$2` the second, and so on. You can access up to `$9` this way; for arguments beyond the ninth, you must use curly braces, e.g., `${10}`.
- **Special Variables**
    - The shell also provides other [[Shell - The Special Variable|special variables]] to work with all arguments at once.
    - **`$#`**: Contains the total number of arguments passed to the script. Useful for checking if the user provided the correct amount of input.
    - **`$@`**: Expands to a list of all arguments as separate, quoted strings (`"$1" "$2" ...`). This is the safest and most common way to pass all arguments to another command.
    - **`$*`**: Expands to a single string containing all arguments joined by the first character of the IFS (Internal Field Separator) variable, which is typically a space (`"$1 $2 ..."`).
    - **`$0`**: Contains the name of the script itself.

#### Core Trade-offs

- **Pro: Simplicity and Flexibility**
    - Positional parameters are extremely easy to use for simple scripts and provide a powerful way to make a single script perform many different tasks.
- **Con: Order Dependency and Ambiguity**
    - The meaning of each argument is determined solely by its position. If a user provides arguments in the wrong order, the script will fail or produce incorrect results. This can make scripts with many arguments confusing to use.
- **Con: Lack of Self-Documentation**
    - Unlike named flags (e.g., `--file <filename>`), positional parameters don't describe what they are for. A user might have to read the script's code or documentation (if any exists) to understand what each argument does. Using [[Shell - Script Comments|script comments]] becomes crucial to mitigate this.

## Connections

```
             (Parent)
        Shell Scripts
               ▲
               │
┌──────────────┼──────────────┐
│              │              │
       ┌───────────────┐
       │Script Arguments │
       └───────────────┘
               │
               ▼
        (Mechanism)
      Special Variables
```

### Parent Concept

This concept is a fundamental technique within [[Shell - Shell Scripts|shell scripting]], providing the primary mechanism for passing external data into a script.

### Child Concepts



### Related Concepts 

- The process of providing arguments happens at the moment of [[Shell - Executing Scripts|executing a script]].
- Positional parameters like `$1` and `$2` are specific instances of a broader category of variables known as the [[Shell - The Special Variable|special variables]] in shell.
- Understanding how to use arguments is a key skill summarized in the [[Shell - Scripting Fundamentals Cheatsheet|scripting fundamentals cheatsheet]].
## Questions

- For a script that will be used by a non-technical team, when would you choose the simplicity of positional arguments over a more complex but self-documenting system with named flags (e.g., using `getopts`)? How would you justify the potential for user error to a project manager?
- Imagine a production script that takes a filename as `$1` and a date string as `$2`. How would you design the first 10 lines of this script to validate the arguments, ensuring the file actually exists and the date is in the correct 'YYYY-MM-DD' format before any processing begins?
- What if the shell did not provide positional parameters like `$1` and `$2`? How could you design an alternative system for passing data into a script using only standard shell commands like `echo` and pipes?