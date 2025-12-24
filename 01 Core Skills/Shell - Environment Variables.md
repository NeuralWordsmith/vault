---
tags: 
  - core
  - shell
  - environment_variables
  - configuration
  - bash
  - global_scope
  - concept
source: 
  - "[[Introduction to shell]]"
related: 
  - "[[Shell - Variables]]"
  - "[[Shell - Shell Variables]]"
  - "[[Shell - Accessing Variable Values]]"
  - "[[Shell - Loops]]"
  - "[[Shell - For Loop Syntax]]"
  - "[[Fundamental - Computer Science]]"
  - "[[Fundamental - Programming]]"
  - "[[Fundamental - Containerization]]"
  - "[[DevOps - CI/CD]]"
  - "[[System Design - Configuration Management]]"
  - "[[Security - Secrets Management]]"
  - "[[Bash Scripting]]"
  - "[[Operating Systems - Processes]]"
---
# Core: Environment Variables

## Summary

>Environment variables are a set of dynamic, named values that are part of the operating environment in which a process runs. They are global, meaning they are available to any program or script running in the shell, and by convention, their names are written in `UPPER_CASE`. Unlike [[Shell - Shell Variables|shell variables]], which are local to the current shell, environment variables are inherited by any child processes spawned from that shell.

**Why This Matters:** Environment variables allow you to configure a program's behavior from outside its code, making applications more portable, flexible, and easier to manage across different machines and deployment stages.

_Analogy:_ _Think of environment variables like a public notice board in an office building. The board contains key pieces of information that are available for any employee or visitor (any program) to see. For example, it might list the 'Building's Main Address' (`HOME`), a 'You Are Here' map (`PWD`), the 'Security Desk's Extension' (`SHELL`), and the 'Current Occupant's Name' (`USER`). Any new person entering the building automatically gets access to this same public information._

In this analogy, the office building is the shell environment, the public notices are the environment variables, and the employees or visitors are the programs or processes. Any program can 'look at the board' to get its bearings and understand its context. 
*   **Where it breaks down:** Unlike a physical notice board which is relatively static, environment variables can be easily changed, added, or removed for the current session and its children, making them a dynamic configuration system.

```
+---------------------+
|   Parent Shell      |
|   (e.g., bash)      |
|---------------------|
| HOME=/home/user     |
| USER=user           |
+---------------------+
         |
         | (Inheritance)
         ▼
+---------------------+
|   Child Process     |
|   (e.g., python)    |
|---------------------|
| Can read:           |
| HOME=/home/user     |
| USER=user           |
+---------------------+
```

## Details

Environment variables are a fundamental mechanism for passing configuration information to software. They are key-value pairs that exist within the shell and are passed down to any commands or scripts that the shell executes. This inheritance is crucial; it means you can set a variable once in your terminal, and every program you run from that terminal will have access to it. This provides a consistent context for applications, telling them about the system, the user, and their preferences without hard-coding this information.

#### Primary Goal

To provide a universal and consistent way for the operating system and user to pass configuration information and context to running processes.

#### Mechanism


- **How it Works: Inheritance**
    1. When you start a shell session (like opening a terminal), a set of environment variables is loaded from configuration files (e.g., `.bashrc`, `.zshrc`).
    2. When you run a command or script from that shell, the shell creates a new 'child' process for that command.
    3. The shell makes a copy of all its environment variables and passes them to this new child process. The child process now 'inherits' the parent's environment.
- **Common Examples:**
    - `HOME`: Specifies the path to the current user's home directory. *Example: `/home/alice`*
    - `PWD`: Stands for 'Print Working Directory' and holds the path of your current location in the filesystem. *Example: `/home/alice/projects/my_app`*
    - `SHELL`: Defines the program path for the user's default shell. *Example: `/bin/bash`*
    - `USER`: Contains the username of the person currently logged in. *Example: `alice`*
    - `PATH`: A colon-separated list of directories where the shell looks for executable programs. This is how you can type `ls` instead of `/bin/ls`.

##### Code Translation

```python
# You can view all environment variables using the 'env' or 'printenv' command.
# 'grep' can be used to filter for a specific variable.

# --- Step 1: List all environment variables --- 
env

# --- Step 2: List a specific variable --- 
printenv HOME
# Output: /home/repl

# --- Step 3: Use a variable in a command (See [[Shell - Accessing Variable Values]]) ---
echo "Welcome, $USER! Your home directory is $HOME."
# Output: Welcome, repl! Your home directory is /home/repl.
```

 [[Code - Environment Variables Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Setting Variables (Exporting):**
    - To create an environment variable or convert a [[Shell - Shell Variables|shell variable]] into one, you use the `export` command. This makes the variable available to all subsequent child processes.
    - *Example: `export API_KEY="12345-abcdef"`*
- **Temporary Setting:**
    - You can set an environment variable for a single command by prefixing the command with the variable assignment. It will not persist in the parent shell.
    - *Example: `LOG_LEVEL=debug ./my_app.sh`*
- **Unsetting Variables:**
    - The `unset` command can be used to remove a variable from the environment.
    - *Example: `unset API_KEY`*

#### Core Trade-offs

- **Pro: Universality & Simplicity**
    - Nearly every programming language and tool can easily read environment variables, making them a universal standard for configuration. They are simple to set and inspect from the command line.
- **Con: Security Risk**
    - Storing sensitive information like passwords or API keys in environment variables can be risky. Any process spawned from the shell can read them, and they may be logged in system logs or exposed in error reports.
- **Con: Global Scope Issues**
    - Because they are global, there's a risk of name collisions where different applications might use the same variable name for different purposes, leading to unexpected behavior.

## Connections

```
                      (Parent)
                  Shell Variables
                         ▲
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                    │
(Contrast)      ┌──────────────────────┐      (Process)
Shell Variables │ Environment Variables│ Accessing Variable Values
                └──────────────────────┘
```

### Parent Concept

Environment variables are a specific type of [[Shell - Variables|shell variable]] that are marked to be passed down to child processes.
### Related Concepts 

- Environment variables contrast with [[Shell - Shell Variables|shell variables]], which are local to the current shell instance and are not inherited by child processes.
- The process of using these values in scripts is detailed in [[Shell - Accessing Variable Values|accessing variable values]].
- The concept of processes and inheritance is a core topic within [[Fundamental - Computer Science|fundamental computer science]].
## Questions

- When deploying an application, you need to provide a database password. What are the security trade-offs of using an environment variable versus a secrets management service (like AWS Secrets Manager or HashiCorp Vault), and how would you justify the added complexity of a secrets manager to a project manager focused on shipping quickly?
- Imagine you are managing a microservices architecture with 50 services, each with its own set of environment variables for configuration. How would you design a system to manage, version, and deploy these configurations consistently across development, staging, and production environments to prevent configuration drift and ensure reproducibility?
- What if the `export` command didn't exist, and shells could only have local variables? What alternative mechanisms would have to be invented to pass configuration from a parent process to a child, and what would be the primary drawbacks of those systems compared to the environment variable model we have today?