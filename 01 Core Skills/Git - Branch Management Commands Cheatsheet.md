---
tags:
  - "#cheatsheet"
tool:
  - "Git"
---
# Cheatsheet: Git - Branch Management Commands Cheatsheet

> A quick reference guide for common commands and syntax for **Git**.

---

### Listing & Viewing Branches

*   `git branch`
    List all local branches. The current branch is marked with an asterisk (`*`).

*   `git branch -r`
    List all remote-tracking branches.

*   `git branch -a`
    List all branches (local and remote-tracking).

*   `git branch -v` or `git branch -vv`
    List branches with the last commit hash, message, and tracking status.

*   `git branch --merged`
    List branches that have been merged into the current branch (safe to delete).

*   `git branch --no-merged`
    List branches that have not been merged into the current branch.

### Creating Branches

*   `git branch <branch-name>`
    Create a new branch from the current `HEAD` commit. Does not switch to it.

*   `git branch <new-branch> <base>`
    Create a new branch from a specific base (e.g., another branch name, a commit hash, or a tag).

*   `git checkout -b <branch-name>`
    Create a new branch and immediately switch to it. (Legacy command)

*   `git switch -c <branch-name>`
    The modern equivalent of `checkout -b`. Creates and switches to a new branch.

### Switching Branches

*   `git checkout <branch-name>`
    Switch to an existing branch. (Legacy command)

*   `git switch <branch-name>`
    The modern, safer command to switch to an existing branch.

*   `git switch -` or `git checkout -`
    Switch to the previously checked-out branch.

### Deleting Branches

*   `git branch -d <branch-name>`
    Delete a local branch. Fails if the branch has unmerged changes.

*   `git branch -D <branch-name>`
    Force-delete a local branch, even if it has unmerged changes.

*   `git push origin --delete <branch-name>`
    Delete a remote branch. (Also `git push origin :<branch-name>`)

### Renaming Branches

*   `git branch -m <new-name>`
    Rename the current local branch.

*   `git branch -m <old-name> <new-name>`
    Rename a specific local branch, regardless of which branch is currently checked out.

*   **To rename a remote branch:**
    1.  Rename the local branch: `git branch -m <old-name> <new-name>`
    2.  Push the new branch: `git push origin -u <new-name>`
    3.  Delete the old remote branch: `git push origin --delete <old-name>`

### Pushing & Tracking

*   `git push -u origin <branch-name>`
    Push a new local branch to the remote repository (`origin`) and set it to track the remote branch. The `-u` is short for `--set-upstream`.

*   `git branch --set-upstream-to=origin/<remote-branch> <local-branch>`
    Manually link an existing local branch to an existing remote branch.