---
tags:
  - "#cheatsheet"
tool:
  - "Shell & Environment Variables"
---
# Cheatsheet: Shell - Batch Processing Cheatsheet

> A quick reference guide for common commands and syntax for **Shell & Environment Variables**.

---

### Core Concepts



| **Concept**         | **Syntax Example**            | **Function**                                    |
| ------------------- | ----------------------------- | ----------------------------------------------- |
| **Env Variable**    | `echo $HOME`                  | Access global system variables (uppercase).     |
| **Shell Variable**  | `data=seasonal/*.csv`         | Store local data (no spaces around `=`).        |
| **Variable Access** | `$variable`                   | Use `$` to get the value.                       |
| **For Loop**        | `for x in list; do cmd; done` | Repeat actions for every item in a list.        |
| **Separators**      | `;`                           | Separates commands inside a loop (or anywhere). |
| **Quotes**          | `'File Name.txt'`             | Handles filenames containing spaces.            |

| Feature             | Shell Variable (`my_var=...`)                               | Environment Variable (`export MY_VAR=...`)                 |
| ------------------- | ----------------------------------------------------------- | ---------------------------------------------------------- |
| **Scope**           | Local to the current shell instance.                        | Global. Available to the shell and any child processes.    |
| **Convention**      | `lowercase_snake_case`                                      | `UPPERCASE_SNAKE_CASE`                                     |
| **Inheritance**     | Not inherited by child processes.                           | Inherited by child processes.                              |
| **Persistence**     | Dies with the current shell session.                        | Dies with the session unless set in a startup file.        |

---

### Shell Variables (Local)

*   **Declare & Assign:** No spaces around `=`. Value with spaces must be quoted.
    ```bash
    # Correct
    my_var="Hello World"
    file_count=$(ls | wc -l)

    # Incorrect (command not found: my_var)
    my_var = "some value"
    ```
*   **Access / Read:** Use `$` prefix. Braces `{}` are good practice to avoid ambiguity.
    ```bash
    echo $my_var
    echo "${my_var} is the message."
    ```
*   **Unset (Delete):**
    ```bash
    unset my_var
    ```

---

### Environment Variables (Global)

*   **List All:**
    ```bash
    env         # Common, lists all env variables
    printenv    # Similar to env, can also take an argument
    declare -x  # Lists all exported variables
    ```
*   **Access a Specific Variable:**
    ```bash
    echo $HOME
    printenv PATH
    ```
*   **Set for a Single Command:** The variable is only set for the duration of that one command.
    ```bash
    MY_API_KEY="secret123" ./run_script.sh
    ```
*   **Set for Current Session (Export):** Makes a shell variable into an environment variable.
    ```bash
    # Method 1: Define and export in two steps
    TEMP_DIR="/tmp/data"
    export TEMP_DIR

    # Method 2: Define and export in one step
    export PERM_DIR="/var/data"
    ```
*   **Set Persistently (Across Reboots):** Add the `export` command to a shell startup file.
    - `~/.bashrc` or `~/.zshrc`: For interactive shells. Most common choice.
    - `~/.bash_profile` or `~/.zprofile`: For login shells. Sources `~/.bashrc` by default on many systems.
    - **Example to add to `~/.bashrc`:**
      ```bash
      export JAVA_HOME="/usr/lib/jvm/java-11-openjdk-amd64"
      export PATH="$JAVA_HOME/bin:$PATH"
      ```
    - **Apply changes immediately:**
      ```bash
      source ~/.bashrc
      ```

---

### Common Environment Variables

| Variable | Description                                                              |
| -------- | ------------------------------------------------------------------------ |
| `PATH`     | A colon-separated list of directories where the shell looks for commands.|
| `HOME`     | The path to the current user's home directory.                           |
| `USER`     | The username of the current user.                                        |
| `SHELL`    | The path to the user's login shell program (e.g., `/bin/bash`).          |
| `PWD`      | The path to the current working directory.                               |
| `EDITOR`   | The default text editor to be used by commands like `crontab -e`.        |
| `LANG`     | Defines the default locale, character encoding, and language settings.   |

---

### Parameter Expansion & Manipulation

Given `filepath="/usr/local/bin/script.sh"`

| Syntax                          | Description                                         | Example                               |
| ------------------------------- | --------------------------------------------------- | ------------------------------------- |
| `${var:-default}`               | Use `default` if `var` is unset or null.            | `echo ${UNDEFINED_VAR:-'fallback'}` → `fallback` |
| `${#var}`                       | Length of the variable's value.                     | `echo ${#filepath}` → `28`             |
| `${var#pattern}`                | Remove shortest match of `pattern` from start.      | `echo ${filepath#*/}` → `usr/local/bin/script.sh` |
| `${var##pattern}`               | Remove longest match of `pattern` from start.       | `echo ${filepath##*/}` → `script.sh` (basename) |
| `${var%pattern}`                | Remove shortest match of `pattern` from end.        | `echo ${filepath%.*}` → `/usr/local/bin/script` |
| `${var%%pattern}`               | Remove longest match of `pattern` from end.         | `echo ${filepath%%/*}` → `` (empty string) |
| `${var/pattern/string}`         | Replace first match of `pattern` with `string`.     | `echo ${filepath/usr/var}` → `/var/local/bin/script.sh` |
| `${var//pattern/string}`        | Replace all matches of `pattern` with `string`.     | `echo ${filepath//\//-}` → `-usr-local-bin-script.sh` |