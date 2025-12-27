---
tags:
  - "#cheatsheet"
tool:
  - "Git"
---
# Cheatsheet: Git - Undoing Changes Cheatsheet

> A quick reference guide for common commands and syntax for **Git**.

---

### Git Undo Cheatsheet: `revert`, `checkout`, & `restore`

This table summarizes the primary use cases for undoing changes in Git. `git restore` is the modern, recommended command for file-level operations, while `git revert` is for commit-level history changes.

| Goal / Scenario                               | Command                                       | Effect on Working Dir | Effect on Staging Area | Effect on History                               | Key Characteristic                                    |
| --------------------------------------------- | --------------------------------------------- | --------------------- | ---------------------- | ----------------------------------------------- | ----------------------------------------------------- |
| **Undo a public/pushed commit**               | `git revert <commit-hash>`                    | Files are changed     | Changes are staged     | **Appends a new commit** that is the inverse.   | Safe for shared history; non-destructive.             |
| **Discard unstaged changes in a file**        | `git restore <file>`                          | File reverts to index | No effect              | No effect                                       | Discards local, un-added changes. **Data is lost.**   |
| **Unstage a file (`undo git add`)**           | `git restore --staged <file>`                 | No effect             | File is removed        | No effect                                       | Moves changes from staging back to working dir.       |
| **Discard all changes to a file (staged & unstaged)** | `git checkout HEAD -- <file>`                 | File reverts to `HEAD`  | File is unstaged       | No effect                                       | Complete reset for a file. **Data is lost.**          |
| **Switch branches or view a past commit**     | `git checkout <branch-or-commit>`             | Files match target    | Index matches target   | **Moves `HEAD` pointer** to a different commit. | Navigates the project's history.                      |
| **Get an old version of a file**              | `git restore --source=<commit> <file>`        | File reverts to commit | Change is unstaged     | No effect                                       | Plucks a file from the past without changing `HEAD`.    |

---

### Command Syntax Summary

#### `git revert` (Commit-level undo)
Creates a new commit that reverses the changes of a previous commit. It's the safest way to undo changes on a public branch.
```bash
# Create a new commit that undoes the specified commit
git revert <commit-hash>

# Revert the most recent commit
git revert HEAD

# Revert the changes but don't create a new commit automatically
git revert --no-commit <commit-hash>
```

#### `git restore` (File-level undo - Modern)
Restores files in the working tree from the index or another commit. It's the dedicated tool for file-level resets.
```bash
# Discard changes in the working directory (un-staged changes)
git restore <file-path>

# Unstage a file (undo `git add`)
git restore --staged <file-path>

# Discard both staged and unstaged changes for a file
git restore --source=HEAD --staged --worktree <file-path>
```

#### `git checkout` (Older, multi-purpose command)
While its primary function is to switch branches, it can also be used to manipulate files. This usage can be confusing, which is why `git restore` was introduced.
```bash
# Switch to a different branch
git checkout <branch-name>

# Discard all changes (staged and unstaged) to a file
# The '--' is a safety measure to separate commit-refs from file paths
git checkout HEAD -- <file-path>

# Get a version of a file from another commit
git checkout <commit-hash> -- <file-path>
```