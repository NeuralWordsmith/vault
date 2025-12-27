---
tags: 
  - core
  - git
  - undo
  - revert
  - restore
  - version_control
  - concept
source: 
  - "[[Introduction to Git]]"
related: 
  - "[[Fundamental - Version Control]]"
  - "[[Git - git revert Command]]"
  - "[[Git - git checkout Command for File Restoration]]"
  - "[[Git - git restore Command for Unstaging]]"
  - "[[Git - git revert vs git checkout for Reverting]]"
  - "[[Git - git reset Command]]"
  - "[[Git - Staging Area]]"
  - "[[Git - Commits]]"
  - "[[Git - Branches]]"
  - "[[Git - HEAD]]"
  - "[[Git - Working Directory]]"
  - "[[Fundamental - Software Engineering]]"
---
# Core: Git - Undoing Changes

## Summary

>This note provides an overview of the primary Git commands used to resolve problems and undo changes. In version control, mistakes are inevitable, from a simple typo in the last commit to realizing a whole feature was a bad idea. Git offers a powerful, but sometimes confusing, set of tools to rewind time at different levels: from unstaging a single file with [[Git - git restore Command for Unstaging|git restore]], to discarding changes in the working directory with [[Git - git checkout Command for File Restoration|git checkout]], to safely reversing entire commits in the public history with [[Git - git revert Command|git revert]]. Understanding which tool to use for which scenario is crucial for maintaining a clean and stable project history.

**Why This Matters:** Mastering how to undo changes in Git provides a critical safety net, enabling developers to experiment fearlessly and recover from mistakes without derailing project history.

_Analogy:_ _Think of Git's undo capabilities like the different "undo" functions in a sophisticated word processor._

 * **Unstaging a change (`git restore --staged`)**: This is like using the "Remove from List" button in a "Track Changes" feature. You've marked a change to be included in the next version, but then decide against it before saving. You're not deleting the text, just un-marking it for inclusion.
 * **Discarding local changes (`git checkout` or `git restore`)**: This is like selecting a paragraph and hitting `Ctrl+Z` (Undo). The changes you just typed, which were never saved, disappear and the text reverts to its last saved state.
 * **Reverting a commit (`git revert`)**: This is like publishing an article, finding a factual error, and then publishing a new article with a formal correction. You don't erase the original article (the history); you add a new entry that explicitly corrects the mistake, preserving the full historical record.
 * **Resetting the branch (`git reset`)**: This is like having a time machine for your document. You can choose to go back to a previous version and completely erase all the changes made since. It's powerful but dangerous, as it rewrites the past as if the mistakes never happened.
 * **Where it breaks down:** The analogy falters because a word processor's history is typically linear and private. Git's history is a complex, branching graph shared by a team. Actions that rewrite history (like `git reset`) are far more consequential in Git because they can disrupt the work of every collaborator.

```
Git Workflow & Undo Commands:

+-------------------+   git add <file>    +----------------+   git commit   +----------------+
| Working Directory | ------------------> |  Staging Area  | -------------> | Local          |
| (Your files)      | <------------------ |  (Index)       | <------------  | Repository     |
+-------------------+  git restore <file> +----------------+ git reset HEAD~1 +----------------+
                           ^                     |
                           |                     | git restore --staged <file>
                           |                     |
git checkout -- <file> ----+---------------------+

Published History (Remote):
Commit A -> Commit B (Mistake) -> Commit C (reverts B)  <-- Safe (git revert)
Commit A                                               <-- Unsafe (git reset)
```

## Details

In software development, the ability to undo mistakes is not just a convenience; it's a fundamental requirement for collaboration and stability. Git, as a distributed version control system, provides several distinct mechanisms for reversing changes, each tailored to a specific context and level of the Git workflow (working directory, staging area, and commit history). The primary challenge for developers is not a lack of options, but choosing the correct tool for the job to avoid unintended consequences, such as losing work or corrupting the shared project history. The main strategies can be categorized as **reverting published history**, **resetting local history**, and **restoring files**.

#### Primary Goal

To provide a safe and flexible set of tools for developers to correct errors at any stage of the development process, from local modifications to committed history.

#### Mechanism

- **Scenario 1: Reversing a Published Commit (Safe for Shared Branches)**
    - **Goal:** Undo a commit that has already been pushed and shared with others.
    - **Tool:** [[Git - git revert Command|git revert]]
    - **How it Works:** Instead of deleting the old commit, `git revert` creates a *new* commit that applies the inverse of the changes from the target commit. This preserves the project history, making it a safe operation for collaborative branches.
- **Scenario 2: Unstaging a File (Before Committing)**
    - **Goal:** You've used `git add` on a file but decide you don't want to include it in the next commit.
    - **Tool:** [[Git - git restore Command for Unstaging|git restore --staged <file>]]
    - **How it Works:** This command moves the file from the staging area back to the working directory. The changes in the file itself are not lost; they are just no longer staged for the next commit.
- **Scenario 3: Discarding Local Changes in a File**
    - **Goal:** You've made changes to a file in your working directory that you want to completely throw away and revert to the version from the last commit (`HEAD`).
    - **Tool:** [[Git - git checkout Command for File Restoration|git checkout -- <file>]] or `git restore <file>`
    - **How it Works:** This overwrites the file in your working directory with the version stored in the last commit. This is a destructive action for local, uncommitted changes.
- **Scenario 4: Rewriting Local History (Use with Caution)**
    - **Goal:** You want to completely remove one or more recent commits from your local branch history *before* sharing them.
    - **Tool:** `git reset`
    - **How it Works:** `git reset` moves the branch pointer (`HEAD`) to a previous commit, effectively erasing the commits that came after it. This rewrites history and should never be used on branches that others are using.

##### Code Translation

```python
nothing to fill here
```

 [[Code - Git - Undoing Changes Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Scope of the Undo:** The primary "parameter" is choosing the right command based on the scope of the mistake.
    - **Individual File:** Use `git checkout` or `git restore`.
    - **Staged Change:** Use `git restore --staged`.
    - **Entire Commit:** Use `git revert` or `git reset`.
- **History Integrity:** The choice depends on whether the history is shared or private.
    - **Shared History (pushed):** Always prefer `git revert`. It creates a new commit that undoes the changes, preserving a transparent and complete history for all collaborators.
    - **Private History (local):** `git reset` can be used to cleanly remove mistakes before they are shared, resulting in a tidier commit history.

#### Core Trade-offs

- **History Preservation vs. Cleanliness:**
    - `git revert` preserves the full, unabridged history, including the mistakes. This is transparent and safe for collaboration but can make the log look "messy" with revert commits.
    - `git reset` creates a clean, linear history by erasing mistakes, but this rewriting of history is dangerous on shared branches and can cause major problems for collaborators.
- **Safety vs. Power:**
    - Commands like `git revert` are safe because they are additive; they don't delete history.
    - Commands like `git reset --hard` and `git checkout -- <file>` are powerful but destructive. They can permanently delete uncommitted work or rewrite history, so they must be used with a clear understanding of their consequences.

## Connections

```
                  (Parent)
            Fundamental - Version Control
                     ▲
                     │
┌────────────────────┼────────────────────┐
│                    │                    │
(Related)       ┌──────────────────┐      (Related)
Git - git revert vs │  Undoing Changes │      Git - git checkout Command for File Restoration
git checkout    └──────────────────┘
                     │
          ┌──────────┴──────────┐
          │                     │
Git - git revert Command      Git - git restore Command for Unstaging
```

### Parent Concept

This concept is a fundamental aspect of [[10 Utility Notes/Fundamental - Version Control.md|Fundamental - Version Control]], providing the safety mechanisms necessary for effective software development.

### Child Concepts

- The safest method for undoing shared history is [[Git - git revert Command|git revert]], which creates a new commit to reverse previous changes.
- For unstaging changes or discarding local file modifications, [[Git - git restore Command for Unstaging|git restore]] is the modern, recommended command.
- The versatile [[Git - git checkout Command for File Restoration|git checkout]] can also be used to restore files, though its primary purpose is switching branches.

### Related Concepts 

- A common point of confusion is understanding the difference between [[Git - git revert vs git checkout for Reverting|reverting with git revert vs. git checkout]], as they operate at different levels of the repository.
- The [[Git - git revert Command|git revert command]] is the primary tool for safely undoing changes on public branches.
- The [[Git - git restore Command for Unstaging|git restore command]] is specifically designed to unstage files or discard local changes, making it a safer alternative to older commands.
## Questions

- A junior developer on your team just pushed a commit to the main branch that broke the build. You could use `git revert` to quickly fix it, leaving the faulty commit in the history, or guide them through a more complex `git reset` on a protected branch. How do you decide, and how would you explain the business impact of "messy" vs. "clean" history to a project manager?
- Imagine you are designing a CI/CD pipeline for a large organization. How would you incorporate automated checks to prevent developers from using destructive commands like `git reset --hard` on protected branches like `main` or `develop`? What tools or Git hooks would you use?
- What if the `git revert` command didn't exist? How would you design a workflow or a set of scripts to safely undo a commit on a shared branch with hundreds of active developers, ensuring no history is lost and merge conflicts are minimized?