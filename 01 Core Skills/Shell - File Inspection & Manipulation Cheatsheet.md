---
tags:
  - "#cheatsheet"
tool:
  - "Linux Text & Command Utilities"
---
# Cheatsheet: Shell - File Inspection & Manipulation Cheatsheet

> A quick reference guide for common commands and syntax for **Linux Text & Command Utilities**.

---

| **Command** | **Function**                            | **Key Flags**                                                        |
| ----------- | --------------------------------------- | -------------------------------------------------------------------- |
| `cat`       | Prints entire file contents.            |                                                                      |
| `head`      | Prints the first few lines.             | `-n` (line count)                                                    |
| `less`      | Views file contents page-by-page.       |                                                                      |
| `cut`       | Selects specific columns.               | `-f` (fields), `-d` (delimiter)                                      |
| `grep`      | Selects lines containing specific text. | `-c` (count), `-i` (ignore case), `-v` (invert), `-n` (line numbers) |
| `paste`     | Combines data files side-by-side.       | `-d` (delimiter)                                                     |
| `history`   | Lists recent commands.                  |                                                                      |
| `man`       | Displays the help manual.               |                                                                      |

---
### `cat`: Concatenate and Print Files
Concatenates files and prints them to standard output.

**Syntax:** `cat [OPTIONS] [FILE]...`

| Option | Description | Example |
|---|---|---|
| `-n` | Number all output lines. | `cat -n file.txt` |
| `-b` | Number non-empty output lines. | `cat -b file.txt` |
| `-s` | Squeeze multiple adjacent blank lines. | `cat -s file.txt` |

**Common Use:** `cat file1.txt file2.txt > combined.txt`

---

### `head`: Output First Part of Files
Prints the first 10 lines (by default) of a file.

**Syntax:** `head [OPTIONS] [FILE]...`

| Option | Description | Example |
|---|---|---|
| `-n <NUM>` | Print the first `<NUM>` lines. | `head -n 5 log.txt` |
| `-c <BYTES>` | Print the first `<BYTES>` bytes. | `head -c 1024 data.bin` |

---

### `less`: View Files Page by Page
An interactive pager for viewing file contents. More powerful than `more`.

**Syntax:** `less [FILE]`

**Navigation (inside `less`):**
| Key(s) | Action |
|---|---|
| `q` | Quit |
| `j` / `↓` | Scroll down one line |
| `k` / `↑` | Scroll up one line |
| `Space` / `f` | Forward one screen |
| `b` | Backward one screen |
| `/pattern` | Search forward for `pattern` |
| `?pattern` | Search backward for `pattern` |
| `n` | Repeat last search (next match) |
| `N` | Repeat last search in reverse |
| `G` | Go to the end of the file |
| `g` | Go to the beginning of the file |

---

### `cut`: Select Columns/Fields
Extracts sections from each line of a file.

**Syntax:** `cut [OPTIONS] [FILE]...`

| Option | Description | Example |
|---|---|---|
| `-d <DELIM>` | Use `<DELIM>` as the field delimiter (e.g., `,`, `;`). | `cut -d',' ...` |
| `-f <LIST>` | Select only these fields. `LIST` can be `N`, `N-M`, `N,M`. | `cut -d':' -f1,7 /etc/passwd` |
| `-c <LIST>` | Select only these character positions. | `cut -c1-10 file.txt` |

---

### `grep`: Search for Patterns
Prints lines that match a given pattern.

**Syntax:** `grep [OPTIONS] PATTERN [FILE]...`

| Option | Description | Example |
|---|---|---|
| `-i` | Ignore case distinctions in the pattern. | `grep -i 'error' log.txt` |
| `-v` | Invert match; select non-matching lines. | `grep -v 'debug' log.txt` |
| `-c` | Print only a count of matching lines. | `grep -c 'warning' log.txt` |
| `-n` | Prefix each line of output with its line number. | `grep -n 'root' /etc/passwd` |
| `-r`, `-R` | Search directories recursively. | `grep -r 'API_KEY' /etc/` |

---

### `paste`: Merge Lines of Files
Combines files side-by-side, separating corresponding lines with a tab.

**Syntax:** `paste [OPTIONS] [FILE]...`

| Option | Description | Example |
|---|---|---|
| `-d <DELIM>` | Use `<DELIM>` instead of tab to separate columns. | `paste -d',' names.txt emails.txt` |
| `-s` | Paste one file at a time instead of in parallel (serial). | `paste -s file1.txt file2.txt` |

---

### `history`: View Command History
Displays the shell's command history.

**Syntax:** `history [n]`

| Command | Description |
|---|---|
| `history` | Show the entire command history. |
| `history 20` | Show the last 20 commands. |
| `!!` | Execute the last command. |
| `!n` | Execute command number `n` from history. |
| `!string` | Execute the last command that started with `string`. |
| `Ctrl+R` | Interactively search history backward. |

---

### `man`: Display Manual Pages
Displays the system's reference manuals (man pages).

**Syntax:** `man [SECTION] PAGE`

**Common Sections:**
| Section | Content |
|---|---|
| `1` | Executable programs or shell commands |
| `5` | File formats and conventions (e.g., `/etc/passwd`) |
| `8` | System administration commands (usually for root) |

**Examples:**
```bash
# Get help for the 'ls' command
man ls

# Get help for the 'passwd' file format
man 5 passwd
```