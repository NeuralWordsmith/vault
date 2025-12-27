---
tags:
  - "#cheatsheet"
tool:
  - "Git"
---
# Cheatsheet: Git - Diff Commands Cheatsheet

> A quick reference guide for common commands and syntax for **Git**.

---

### Git Diff Cheatsheet

#### Comparing Working Directory, Index (Staging), and HEAD

| Command | Description |
|---|---|
| `git diff` | Show changes between the **working directory** and the **index** (all unstaged changes). |
| `git diff <file>` | Show unstaged changes for a specific file (e.g., `git diff report.md`). |
| `git diff --staged` | Show changes between the **index** and **HEAD** (all staged changes). |
| `git diff --staged <file>` | Show staged changes for a specific file. |
| `git diff HEAD` | Show all changes (staged and unstaged) since the last commit. |

#### Comparing Commits and Branches

| Command | Description |
|---|---|
| `git diff <commit1> <commit2>` | Show changes between two arbitrary commits. |
| `git diff 35f4b4d 186398f` | Example: Compare two commits using their hashes. |
| `git diff HEAD~2 HEAD~1` | Example: Compare two commits relative to `HEAD`. |
| `git diff <branch1>..<branch2>` | Show changes between the tips of two branches. |
| `git diff HEAD~1` | Show changes from the most recent commit (compares `HEAD~1` with the working directory). |