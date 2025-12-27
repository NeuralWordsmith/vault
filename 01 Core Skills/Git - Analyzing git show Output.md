---
tags:
  - visual-analysis
---

# Git - Analyzing git show Output

**Why This Matters:** The `git show` command is a vital debugging tool that lets you inspect the exact changes of a single commit, making it easy to pinpoint precisely when and where an error was introduced.


> [!info] Info
> In this example, we are examining the output of `git show` for a specific commit. The developer's intention was to add a new row of data for the 50th participant to a CSV file containing mental health survey results. By inspecting the commit, we can verify the change and identify a potential data entry mistake.

---

## The Example
![[Pasted image 20251226193654.png]]

**Visual Evidence Identified:**
- The output is split into two main sections, labeled 'Log' and 'Diff'.
- The 'Log' section contains the commit hash, author, date, and the commit message: 'Adding 50th participant's data'.
- The 'Diff' section shows the changes made to the 'mental_health_survey.csv' file.
- A single line, prefixed with a '+' symbol, indicates the new data row that was added: '+F,56,Yes,Rarely,No,Don't know,Often,No'.
- A green arrow points to this new line, labeling it as a 'Data entry error'.

---

## Deconstruction & Analysis
*How this example demonstrates the concept:*

### **Step 1: Inspect the Commit Log**
The output begins with the commit's metadata (the log entry). It shows the unique commit hash, author, date, and the message 'Adding 50th participant's data'. This tells us the *intent* of the change.

### **Step 2: Analyze the Diff**
The second section is the diff, which details the *actual* changes. The `--- a/data/...` and `+++ b/data/...` lines indicate we're comparing two versions of the `mental_health_survey.csv` file. The line starting with `+` shows what was added in this commit.

### **Step 3: Compare New Data with Existing Structure**
The diff output includes context, showing the CSV header (`age,gender,...`) and previous data rows. We can see that existing rows follow the pattern of age first, then gender (e.g., `29,F,...`).

### **Step 4: Identify the Data Entry Error**
The newly added line is `+F,56,...`. Comparing this to the header, the first column should be 'age' and the second should be 'gender'. The new data has these values reversed ('F' is in the age column, and '56' is in the gender column), confirming the data entry error.

---

## Core Takeaway
*The general principle proved by this example:*

This example demonstrates that `git show` is a powerful, integrated command for reviewing project history. By combining the commit message (the 'why') with the specific line-by-line changes (the 'what'), it provides all the context needed to understand and debug a single, atomic change without having to cross-reference multiple other commands.