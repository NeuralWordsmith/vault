---
tags: 
  - major_core
  - shell
  - shell_scripting
  - bash
  - zsh
  - scope
  - automation
  - concept
source: 
  - "[[Introduction to shell]]"
related: 
  - "[[Shell - Environment Variables]]"
  - "[[Shell - Shell Variables]]"
  - "[[Shell - Accessing Variable Values]]"
  - "[[Shell - Loops]]"
  - "[[Shell - For Loop Syntax]]"
  - "[[Shell - Batch Processing Cheatsheet]]"
  - "[[Fundamental - Programming]]"
  - "[[Shell - Command Substitution]]"
  - "[[Shell - Quoting]]"
  - "[[Shell - Scripting Best Practices]]"
  - "[[Shell - Conditionals]]"
  - "[[Shell - Functions]]"
  - "[[Shell - Handling Filenames with Spaces]]"
---
# Major Core: Shell Variables

## Summary

> In any shell or command-line environment, a variable is a named placeholder used to store data, such as text or numbers. This allows for dynamic operations and makes scripts more readable and flexible. As the context suggests, they come in two primary flavors, distinguished by their scope: local [[Shell - Shell Variables|shell variables]] and global [[Shell - Environment Variables|environment variables]].

**Why This Matters:** Shell variables are the foundation of scripting and automation, allowing you to temporarily store and manipulate data to make command-line operations dynamic, reusable, and powerful.

_Analogy:_ _Think of a busy restaurant kitchen. A chef might jot down a temporary note for a specific, complex order on a small, personal notepad. This is a **shell variable**—it's private, temporary, and only for the task at hand. In contrast, the main recipe book, which contains standard instructions for sauces and preparations used by every cook in the kitchen, is an **environment variable**. It's shared, persistent, and available to any task (or 'sub-task') that needs it._

- **Chef's Notepad** -> A local [[Shell - Shell Variables|shell variable]], used for a single, specific script or session.
- **Main Recipe Book** -> An [[Shell - Environment Variables|environment variable]], available to the main shell and any programs or scripts it launches.
- **Where it breaks down:** Unlike a physical notepad, a shell variable can be 'promoted' or exported to become an environment variable, making it available to other processes. You can't just declare your personal notepad to be a new chapter in the main recipe book.

```
+---------------------------+
|      Parent Shell         |
|                           |
|  MY_SHELL_VAR="local"     |  (Stays here)
|  export MY_ENV_VAR="global" |
+-------------|-------------+
              | Spawns
              ▼
+---------------------------+
|       Child Process       |
|                           |
|  echo $MY_SHELL_VAR  -->  (empty)
|  echo $MY_ENV_VAR    -->  "global"
+---------------------------+
```

## Details

Like any programming environment, the shell needs a way to store and reference information. Shell variables serve this purpose, acting as temporary containers for data. The most critical concept to grasp is that these variables exist in two distinct scopes or 'flavors'. Understanding this distinction is key to writing predictable and effective scripts. The two flavors are:

- **Local Shell Variables**: Confined to the specific shell session in which they were created.
- **Environment Variables**: Available not only to the current shell session but also to any child processes or scripts launched from it.

#### Primary Goal

To store data temporarily within a shell session, enabling the creation of flexible, readable, and powerful scripts that can adapt to different inputs and conditions.

#### Mechanism

- **How it Works:**
    1. **Assignment:** You create a variable and assign it a value using the `VARIABLE_NAME=value` syntax. Note that there are no spaces around the equals sign.
    2. **Access:** You retrieve the stored data by prefixing the variable's name with a dollar sign (`$`), a process known as expansion. This is covered in more detail in [[Shell - Accessing Variable Values|Accessing Variable Values]].
    3. **Scope:** By default, a variable is a local shell variable. To make it an environment variable, you must use the `export` command.
- **Flavor 1: Shell Variables**
    - These are local to the current shell instance. They are like private notes for your current session.
    - *Example:* If you define `my_file="report.txt"` in your terminal, and then run a script from that terminal, the script will have no knowledge of the `my_file` variable.
- **Flavor 2: Environment Variables**
    - These are inherited by any child processes spawned from the current shell. They are used for system-wide configurations, like setting the `PATH` for executable programs or storing API keys.
    - *Example:* If you define `export API_KEY="12345"`, any script you run from that terminal can access `$API_KEY` and use its value.

```python
#!/bin/bash

# --- Step 1: Define a local shell variable ---
# This variable is ONLY available within this script.
LOCAL_VAR="I am local to the parent script."

# --- Step 2: Define and export an environment variable ---
# The 'export' command makes it available to child processes.
export ENV_VAR="I am an environment variable, available everywhere."

# --- Step 3: Display variables in the parent script ---
echo "--- Parent Script Output ---"
echo "Local variable: $LOCAL_VAR"
echo "Environment variable: $ENV_VAR"
echo ""

# --- Step 4: Run a child script that tries to access both ---
echo "--- Running Child Script... ---"
bash -c 'echo "Child sees Local: [$LOCAL_VAR]"; echo "Child sees Environment: [$ENV_VAR]"'
```

 [[Code - Shell Variables Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Naming Conventions**
    - By convention, environment variables are written in `UPPER_SNAKE_CASE` (e.g., `DATABASE_URL`) to distinguish them from local variables, which are often `lower_snake_case` (e.g., `file_count`).
- **Assignment Syntax**
    - The syntax `VARIABLE=value` is strict. There can be no spaces around the = operator. `VARIABLE = value` will be interpreted as a command named `VARIABLE` with arguments = and `value`, which will fail.
- **Scope Control (The `export` command)**
    - The `export` command is the key 'lever' that changes a variable's scope from local to environmental, making it accessible to child processes.

#### Core Trade-offs

- **Benefit: Flexibility & Reusability**
    - Variables allow scripts to be written in a general way, operating on data passed into them rather than hardcoded values. This is fundamental to automation and tools like [[Shell - Loops|shell loops]].
- **Limitation: Scope Complexity**
    - Forgetting to `export` a variable that a child script needs is a very common bug. Conversely, polluting the global environment with too many exported variables can lead to naming conflicts and unpredictable behavior.
- **Risk: Security**
    - Storing sensitive data like passwords or API keys in environment variables can be a security risk, as any child process (even unintended ones) can potentially read them.

## Connections

```
                     (Parent)
              Fundamental - Programming
                         ▲
                         │
           ┌─────────────┼─────────────┐
           │             │             │
(Used to access)  ┌──────────────────┐  (Used within)
Accessing Values  │ Shell Variables  │  Loops
                  └──────────────────┘
                         │
              ┌──────────┴──────────┐
              │                     │
      Shell Variables     Environment Variables
       (Flavor 1)            (Flavor 2)
```

### Parent Concept

Shell variables are a practical implementation of the variable concept from [[Fundamental - Programming|fundamental programming]], applied within the context of a command-line interface.

### Child Concepts

- The default, local-only flavor is the [[Shell - Shell Variables|shell variable]], which is confined to the current shell instance.
- The exported, globally-accessible flavor is the [[Shell - Environment Variables|environment variable]], which is inherited by all child processes.

### Related Concepts 

- The value stored in a variable is retrieved using specific syntax, as detailed in [[Shell - Accessing Variable Values|Accessing Variable Values]].
- Variables are the cornerstone of control flow structures like [[Shell - Loops|shell loops]], where they often act as counters or hold the current item in an iteration.
- The logic of when to use a local versus an environment variable is crucial for tasks like [[Shell - Batch Processing Cheatsheet|batch processing]], where one script may call many others.
## Questions

- You're writing a complex deployment script that calls several helper scripts. When would you choose to pass configuration data via local shell variables as arguments versus setting them as environment variables? What are the security and maintainability implications of each choice?
- Imagine a production system where multiple scripts, run by different users, rely on a shared set of environment variables defined in a system-wide file like `/etc/profile`. How would you design a system to manage and version control changes to these variables to prevent breaking existing scripts?
- What if the shell `export` command did not exist? How would you design a system for inter-process communication to pass configuration from a parent script to a child script without using environment variables?
