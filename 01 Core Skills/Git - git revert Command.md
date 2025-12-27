---
tags: 
  - process
  - git
  - version_control
  - undo
  - commit_history
  - safe_undo
  - concept
source: 
  - "[[Introduction to Git]]"
related: 
  - "[[Fundamental - Version Control]]"
  - "[[Git - Undoing Changes]]"
  - "[[Git - git checkout Command for File Restoration]]"
  - "[[Git - git restore Command for Unstaging]]"
  - "[[Git - git revert vs git checkout for Reverting]]"
  - "[[Git - git reset Command]]"
  - "[[Git - Commit]]"
  - "[[Git - Branching]]"
  - "[[Git - Merging]]"
  - "[[Git - Working Directory]]"
  - "[[Git - Staging Area]]"
  - "[[Git - HEAD]]"
  - "[[Git - Log]]"
  - "[[Git - Cherry-pick]]"
  - "[[Git - Rebase]]"
---
# Process: git revert Command

**Why This Matters:** It provides a safe, history-preserving method to undo mistakes in a shared repository, preventing the chaos that rewriting public history can cause for a team.
## Goal & Analogy

> **Goal:** The `git revert` command is a forward-moving way to undo a past change. Instead of deleting a commit from the project history, it figures out how to reverse the changes introduced by that commit and creates a brand new commit with the resulting inverse content. This makes it a safe method for [[Git - Undoing Changes|undoing changes]] in a public, collaborative branch.

_Analogy:_ _Think of your Git history as an accounting ledger. A faulty transaction (a bad commit) is recorded on Tuesday. Instead of erasing Tuesday's entry, which is forbidden in accounting, the accountant on Wednesday adds a new 'reversing entry' that perfectly cancels out the faulty one. The original mistake is still there for auditing, but a new, corrective transaction has been added, and the final balance is correct._

**Where it breaks down:** An accounting ledger deals with simple debits and credits. A code revert can be more complex. If other 'transactions' (commits) have happened since the faulty one that touch the same 'accounts' (lines of code), Git might not be able to automatically create the reversing entry and will require you to manually resolve the resulting merge conflict.

```
Before Revert:
(f789a1b) <-- (a867b4f) <-- HEAD
   'Feat Y'      'Buggy Feat X'

After `git revert a867b4f`:
(f789a1b) <-- (a867b4f) <-- (e543c2d) <-- HEAD
   'Feat Y'      'Buggy Feat X'    "Revert 'Buggy Feat X'"
```

## The Step-by-Step Process

### Prerequisites / Inputs

- **`<commit>` (Required)**
    - The reference to the commit that needs to be undone. This can be a commit hash, a tag, or a relative reference like `HEAD~1`.
- **`--no-edit`**
    - This flag bypasses the text editor for the commit message, accepting the auto-generated message by default. Useful for scripting or when the default message is sufficient.
- **`-n` or `--no-commit`**
    - This flag applies the inverse changes to your working directory and staging area but does *not* create a new commit. This allows you to inspect the changes, make further modifications, or bundle multiple reverts into a single commit.

### The Steps

- **Step 1: Identify the Target Commit**
    - First, use `git log` or a GUI tool to find the unique hash of the commit you wish to undo.
- **Step 2: Execute the Revert Command**
    - Run the command `git revert <commit-hash>`, replacing `<commit-hash>` with the hash you identified. Git will calculate the inverse changes.
- **Step 3: Manage the Commit Message (Default)**
    - By default, Git opens your configured text editor with a pre-populated commit message (e.g., "Revert 'commit message'"). You can edit it or simply save and close to proceed.
- **Step 4: Push the New Commit**
    - The revert process creates a new commit in your local repository. You must then `git push` this new commit to share the undone changes with your team.

##### Code Translation

```bash
# --- Step 1: Find the commit hash ---
# Let's say the log shows a bad commit with hash 'a867b4f'
git log --oneline
# a867b4f (HEAD -> main) Add buggy feature X
# f789a1b Implement base feature Y
# c345d6e Initial commit

# --- Step 2: Execute the revert command ---
# This will create a new commit that undoes the changes from a867b4f
git revert a867b4f

# --- Step 3: The editor opens ---
# You can save the default message or customize it.
# To skip this step, you could run: git revert --no-edit a867b4f

# --- Step 4: Push the new revert commit ---
git push origin main
```

### Deliverables / Outputs

The core idea behind `git revert` is to undo changes by creating new history rather than altering past history. It targets a specific commit and generates a new commit that applies the exact opposite changes. This approach is fundamental to maintaining a clean and understandable history in collaborative projects, as it transparently shows that a change was made and then later undone. It stands in contrast to other methods of [[Git - Undoing Changes]], such as using `[[Git - git checkout Command for File Restoration|git checkout to restore a file]]`, which modifies the working directory directly, or `git reset`, which can permanently alter the commit history.

## Context & Tradeoffs

### When to Use This Process

To safely undo a specific commit by creating a new commit that applies the inverse changes, thereby preserving the project's history.

### Common Pitfalls & Tradeoffs

- **Pro: Safe for Public History**
    - Its primary advantage is safety. Since it doesn't rewrite history, it's the approved way to undo changes on a branch that has been shared with others, preventing synchronization issues.
- **Con: Clutters Commit History**
    - The history log will contain both the original commit and the revert commit. Over time, this can make the history harder to read compared to a history that has been cleaned up with `git reset` or `rebase` (which should only be done on private branches).
- **Con: Can Cause Conflicts**
    - If subsequent commits have modified the same lines of code as the commit being reverted, Git may be unable to apply the inverse patch cleanly, resulting in a merge conflict that must be resolved manually.

## Connections

```
                 (Parent)
        Fundamental - Version Control
                   ▲
                   │
┌──────────────────┼──────────────────┐
│                  │                  │
(Alternative) ┌────────────┐      (Alternative)
 git reset    │ git revert │      git checkout
              └────────────┘
```


- It is a primary tool for the broader task of [[Git - Undoing Changes|undoing changes]] in a repository.
- A detailed guide, [[Git - git revert vs git checkout for Reverting|git revert vs git checkout]], directly contrasts its use case with using checkout for file restoration.
- It contrasts sharply with `git reset`, which rewrites commit history and is generally unsafe for shared branches.
- The command can be seen as an automated way of calculating a patch with `git diff` and applying its inverse.

## Deeper Questions

- You've discovered a bug in a feature that was merged to the main branch a week ago and has since been deployed to production. The team lead suggests using `git revert` to quickly undo the change. What are the potential risks of this approach, and how would you communicate the trade-off between a quick revert and a more careful hotfix to a product manager?
- Imagine a CI/CD pipeline that automatically deploys any commit to the `main` branch. How would a `git revert` commit flow through this system? What specific checks or manual gates would you implement to ensure that reverting a critical feature doesn't cause cascading failures in dependent services?
- What if the `git revert` command didn't exist? Describe a manual workflow using other Git commands (like `git diff` and `git apply`) to achieve the exact same outcome: creating a new commit that perfectly inverts the changes from a previous commit without rewriting history.