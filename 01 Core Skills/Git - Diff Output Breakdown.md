---
tags:
  - visual-analysis
---

# Git - Diff Output Breakdown

**Why This Matters:** Understanding `git diff` output is crucial for reviewing your code changes, catching errors, and writing clear, meaningful commit messages.


> [!info] Info
> In this example, we are using the `git diff` command to inspect changes made to a Markdown file named `report.md`. The command compares the last committed version of the file (version 'a') with the current, modified version in our working directory that has not yet been staged (version 'b').

---

## The Example
![[Pasted image 20251227165405.png]]

**Visual Evidence Identified:**
- The header indicates a comparison between `a/report.md` (the old version) and `b/report.md` (the new version).
- The 'hunk' header `@@ -1,5 +1,5 @@` specifies the location and range of the changes in both files.
- A line in red, prefixed with a minus sign (`-`), shows content that was removed from the old version.
- A line in green, prefixed with a plus sign (`+`), shows content that was added in the new version.
- Lines in plain text are unchanged and provide context for the modifications.

---

## Deconstruction & Analysis
*How this example demonstrates the concept:*

### 1. Identifying the Files
The first few lines, specifically `--- a/report.md` and `+++ b/report.md`, establish the two versions being compared. By convention, `a` represents the source or 'before' state (the last commit), and `b` represents the destination or 'after' state (your current working file).

### 2. Locating the Changes (The 'Hunk')
The line `@@ -1,5 +1,5 @@` is called the hunk header. It pinpoints where the changes occur. `-1,5` means this section in file 'a' starts at line 1 and is 5 lines long. `+1,5` means the corresponding section in file 'b' also starts at line 1 and is 5 lines long. This tells us a line was replaced rather than simply added or deleted, keeping the total line count the same.

### 3. Analyzing a Deletion
The red line `-TODO: write executive summary.` indicates a line that exists in `a/report.md` but has been removed from `b/report.md`. The `-` prefix marks a deletion. In this scenario, we've completed the executive summary, so we removed that task from our to-do list.

### 4. Analyzing an Addition
The green line `+TODO: cite funding sources.` shows a line that was added to `b/report.md` and was not present in `a/report.md`. The `+` prefix marks an addition. Here, we've identified a new task that needs to be completed for the report.

---

## Core Takeaway
*The general principle proved by this example:*

This example demonstrates that `git diff` provides a precise, line-by-line summary of modifications between two versions of a file. It uses a simple and intuitive color-coded syntax (`-` for deletions, `+` for additions) to make it easy to track the evolution of a project, review work, and collaborate effectively.