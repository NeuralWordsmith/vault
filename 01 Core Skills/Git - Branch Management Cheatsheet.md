---
tags:
  - "#cheatsheet"
tool:
  - "Git"
---
# Cheatsheet: Git - Branch Management Cheatsheet

> A quick reference guide for common commands and syntax for **Git**.

---

# Git Branch Management

### Listing & Switching Branches

| Command | Description |
|---|---|
| `git branch` | Lists all local branches. The current branch is marked with `*`. |
| `git branch -a` | Lists all local and remote-tracking branches. |
| `git checkout [branch_name]` | Switches to an existing branch. |
| `git checkout -b [new_branch]` | Creates a new branch and switches to it. |

### Comparing Branches

| Command | Description |
|---|---|
| `git diff [branch1]..[branch2]` | Shows the differences between the tips of two branches. |
| `git diff [branch1]...[branch2]` | Shows the changes on `branch2` since it diverged from `branch1`. |
| `git log [branch1]..[branch2]` | Shows commits that are in `branch2` but not in `branch1`. |

### Renaming Branches

| Command | Description |
|---|---|
| `git branch -m [new_name]` | Renames the **current** branch. |
| `git branch -m [old_name] [new_name]` | Renames a specific local branch (can be run from any branch). |

### Deleting Branches

| Command | Description |
|---|---|
| `git branch -d [branch_name]` | **Safely deletes** a local branch. Fails if the branch has unmerged changes. |
| `git branch -D [branch_name]` | **Force deletes** a local branch, regardless of its merge status. Use with caution. |
| `git push origin --delete [branch_name]` | Deletes a remote branch on the `origin` remote. |
