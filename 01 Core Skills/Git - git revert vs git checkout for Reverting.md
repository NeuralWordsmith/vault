---
tags: 
  - comparison
  - git
  - git_checkout
  - file_revert
  - surgical_revert
  - version_control
  - undo
  - concept
source: 
  - "[[Introduction to Git]]"
related: 
  - "[[Fundamental - Version Control]]"
  - "[[Git - Undoing Changes]]"
  - "[[Git - git revert Command]]"
  - "[[Git - git checkout Command for File Restoration]]"
  - "[[Git - git restore Command for Unstaging]]"
  - "[[Git - Commits]]"
  - "[[Git - Working Directory]]"
  - "[[Git - Staging Area]]"
  - "[[Git - HEAD]]"
  - "[[Git - Branching]]"
  - "[[Git - Merging]]"
  - "[[Git - git diff]]"
  - "[[Git - git log]]"
---
# Comparison: Reverting a Single File from a Commit

## Why This Comparison Matters

> This concept addresses the specific scenario where a past commit contains changes to multiple files, but you only need to undo the changes for one of them. The standard `git revert` command is unsuitable as it operates on the entire commit. The solution is to use the `git checkout` command with a specific commit hash and file path to restore just that single file to its state from a previous point in history, effectively 'reverting' it in the working directory.

_Analogy:_ _Imagine a group photo session where you took ten photos. In the final, best photo (the 'HEAD commit'), everyone looks great except for one person who blinked. A full `git revert` would be like throwing away that entire group photo and going back to the previous, less perfect one. Instead, using `git checkout <commit> -- <file>` is like using photo editing software to find a photo where that one person's eyes were open (the 'previous commit'), copying just their open eyes, and pasting them onto the final group photo. You've surgically fixed the one flaw without discarding all the other good parts of the final image._

*   **Group Photo:** The current state of your project.
*   **Person Who Blinked:** The file with the undesirable changes.
*   **Previous Photo with Open Eyes:** The specific commit where the file was in the desired state.
*   **Photo Editing Software:** The `git checkout` command.
*   **Where it breaks down:** The analogy implies a seamless blend. In Git, `git checkout` completely replaces the current version of the file with the old one. You then have to stage and commit this 'reverted' file as a new change, which is more like saving the edited photo as a brand new file in the album rather than altering the original.

## Side-by-Side Comparison

- **`git revert <commit>`**
    - **Scope:** Operates on the entire commit. All changes introduced in that commit are inverted.
    - **History:** Creates a new 'revert' commit. This is a forward-moving change that transparently documents the undo operation, preserving project history.
    - **Use Case:** When an entire commit was a mistake (e.g., introduced a bug, merged the wrong feature).
- **`git checkout <commit> -- <file>`**
    - **Scope:** Operates on a single file. It plucks the state of one file from a past commit and places it in the working directory.
    - **History:** Does not create a new commit automatically. It only modifies the working directory. You must manually stage and commit the change to make it part of the history.
    - **Use Case:** When a commit contains both good and bad changes, and you need to surgically remove only the bad changes from a specific file.

### Comparison Table

| Feature | `git revert` | `git checkout <commit> -- <file>` |
| :--- | :--- | :--- |
| **Scope of Change** | Entire Commit | Single File |
| **History Impact** | Creates a new 'revert' commit | Modifies working directory; requires manual commit |
| **Automation** | Fully automated undo and commit | Manual staging and commit required after checkout |
| **Primary Use** | Undoing a bad merge or feature | Fixing one file within a larger, mixed-quality commit |

## Key Similarities

Both commands are used to access and re-introduce a previous state of the codebase into the project's timeline. They are both safe operations for shared, public branches because they don't alter existing history; instead, they add new commits to move the project forward, even if that 'forward' motion is an undo.

## Verdict: When to Use Which

Use `git revert` for a transparent, history-preserving undo of an entire commit's changes. Use `git checkout <commit> -- <file>` for a surgical strike to restore a single file from a multi-file commit, followed by a manual commit to save the change.

## Broader Connections

```
                      (Parent)
               Undoing Changes
                       ▲
                       │
         ┌─────────────┼─────────────┐
         │             │             │
(Broader Tool)  ┌───────────────────────────┐  (Alternative Tool)
  git revert    │ Reverting a Single File   │    git checkout
                └───────────────────────────┘
```

- This surgical approach directly [[Git - git revert Command|contrasts with the `git revert` command]], which is designed to undo an entire commit.
- It is a specific, powerful application of the [[Git - git checkout Command for File Restoration|`git checkout` command's ability to restore files]] from the project's history.
- This technique is a fundamental part of the broader topic of [[Git - Undoing Changes|undoing changes in Git]], offering more granularity than other methods.

## Deeper Questions

- Imagine a critical bug was introduced in a large commit that also contained an unrelated, urgent feature. How would you justify to a product manager the time spent surgically reverting only the buggy file versus a faster full revert that would delay the new feature? What's the business risk of each approach?
- In a CI/CD pipeline, how would you automate the detection and surgical reversion of a single problematic configuration file that was bundled into a larger deployment commit, without halting the entire deployment of other valid changes in that commit?
- What if the `git checkout` command didn't allow you to specify a file path from a previous commit? What alternative, multi-step Git process could you devise to achieve the same result of reverting a single file's changes from a multi-file commit?