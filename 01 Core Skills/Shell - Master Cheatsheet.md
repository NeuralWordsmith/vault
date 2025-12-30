
### **1. Navigation & File Management**

|**Command**|**Description & Usage**|
|---|---|
|**`pwd`**|**Print Working Directory**. Shows the absolute path of where you are currently located.|
|**`ls`**|**List**. Displays files and directories in the current location.|
|**`ls -R`**|**Recursive List**. Lists files in the current directory _and_ all sub-directories beneath it.|
|**`cd [path]`**|**Change Directory**. Moves you to the specified folder (e.g., `cd seasonal`).|
|**`cd ..`**|**Parent Directory**. Moves you up one level.|
|**`cd ~`**|**Home Directory**. Moves you to your user's home folder.|
|**`cp [old] [new]`**|**Copy**. Creates a copy of a file (e.g., `cp original.txt copy.txt`).|
|**`mv [old] [new]`**|**Move/Rename**. Moves a file to a new folder OR renames it if the destination is a filename.|
|**`rm [file]`**|**Remove**. Permanently deletes a file.|
|**`rm -r [dir]`**|**Recursive Remove**. Deletes a directory and everything inside it (files and subfolders).|
|**`rmdir [dir]`**|**Remove Directory**. Deletes a directory _only if it is completely empty_.|

### **2. Viewing & Manipulating Data**

|**Command**|**Description & Usage**|
|---|---|
|**`cat [file]`**|**Concatenate**. Prints the entire contents of a file to the screen at once.|
|**`less [file]`**|**Pager**. Views a file one page at a time. Use `Space` to scroll down, `q` to quit, `:n` for next file, `:p` for previous.|
|**`head [file]`**|**Head**. Prints the first 10 lines of a file.|
|**`head -n [num]`**|**Line Count**. Prints a specific number of lines from the top (e.g., `head -n 5`).|
|**`tail [file]`**|**Tail**. Prints the last few lines of a file (often used in pipelines with `head`).|
|**`cut`**|**Column Select**. Selects specific columns from a file.|
|**`-d`**|**Delimiter**. Flag for `cut` to specify the separator (e.g., `-d ,` for CSVs).|
|**`-f`**|**Fields**. Flag for `cut` to specify which columns to keep (e.g., `-f 1-3`).|
|**`paste`**|**Paste**. Combines two files side-by-side (merges lines).|
|**`grep [text]`**|**Global Search**. Prints lines containing the specified text.|
|**`grep -c`**|**Count**. Prints the count of matching lines, not the lines themselves.|
|**`grep -i`**|**Ignore Case**. Matches text regardless of capitalization (e.g., "date" matches "Date").|
|**`grep -v`**|**Invert**. Prints only the lines that do **not** contain the search text.|
|**`sort`**|**Sort**. Orders lines alphabetically.|
|**`sort -n`**|**Numeric**. Sorts lines by numerical value.|
|**`sort -r`**|**Reverse**. Sorts in descending order.|
|**`uniq`**|**Unique**. Removes **adjacent** duplicate lines (files must be sorted first).|
|**`wc`**|**Word Count**. Counts elements in a file.|
|**`wc -l`**|**Lines**. Counts the number of lines.|
|**`wc -w`**|**Words**. Counts the number of words.|
|**`wc -c`**|**Characters**. Counts the number of characters.|

### **3. Shell Features & Automation**

|**Command/Symbol**|**Description & Usage**|
|---|---|
|**`man [cmd]`**|**Manual**. Shows the help/instruction page for a command.|
|**`history`**|**History**. Displays a list of recently executed commands.|
|**`![number]`**|**Re-run**. Re-runs a specific command from history (e.g., `!55`).|
|**`![name]`**|**Re-run**. Re-runs the most recent use of a specific command (e.g., `!head`).|
|**`*`**|**Wildcard**. Matches zero or more characters (e.g., `*.csv` matches all CSVs).|
|**`?`**|**Wildcard**. Matches exactly one character (e.g., `201?.txt`).|
|**`[...]`**|**Set Wildcard**. Matches any one character in the brackets (e.g., `201[78].txt`).|
|**`{...}`**|**Group Wildcard**. Matches comma-separated patterns (e.g., `{*.txt, *.csv}`).|
|**`>`**|**Redirect**. Saves the output of a command into a new file (e.g., `head file.txt > snippet.txt`).|
|**`|`**|
|**`Ctrl + C`**|**Cancel**. Stops a running or frozen program immediately.|
|**`Tab`**|**Autofill**. Auto-completes filenames and paths while typing.|

### **4. Variables & Loops**

|**Command/Symbol**|**Description & Usage**|
|---|---|
|**Environment Vars**|System variables like `HOME` (user folder), `PWD` (current folder), `USER` (ID).|
|**`name=value`**|**Assign Variable**. Creates a variable (e.g., `data=seasonal/*.csv`). **No spaces** allowed around `=`.|
|**`$name`**|**Access Variable**. Retrieves a variable's value (e.g., `echo $data`).|
|**`for ... in ...`**|**Loop**. Iterates over a list of files or values.|
|**`;`**|**Separator**. Separates commands, often used inside one-line loops.|
|**`'...'`**|**Quotes**. Wraps filenames with spaces so the shell treats them as a single item.|

### **5. Scripting & Editors**

|**Command/Symbol**|**Description & Usage**|
|---|---|
|**`nano [file]`**|**Nano Editor**. Opens or creates a file in the Nano text editor.|
|**`Ctrl + O`**|**Save**. Saves the file in Nano (mnemonic: "Output").|
|**`Ctrl + X`**|**Exit**. Closes the Nano editor.|
|**`Ctrl + K`**|**Cut**. Deletes a line in Nano.|
|**`Ctrl + U`**|**Uncut**. Pastes (un-deletes) a line in Nano.|
|**`bash [script]`**|**Run Script**. Executes the commands stored in a shell script file.|
|**`$@`**|**All Arguments**. Variable in a script representing _all_ filenames/parameters passed to it.|
|**`$1`, `$2`...**|**Positional Arguments**. Variables representing the 1st, 2nd, etc. parameter passed to a script.|
|**`#`**|**Comment**. Text starting with `#` is ignored by the shell (used for notes).|