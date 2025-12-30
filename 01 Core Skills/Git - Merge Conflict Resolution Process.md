---
tags: 
  - process
  - git
  - merge
  - conflict_resolution
  - version_control
  - collaboration
  - concept
source: 
  - "[[Intermediate Git]]"
related: 
  - "[[Fundamental - Version Control]]"
  - "[[Git - Collaboration]]"
  - "[[Git - Merge Conflicts]]"
  - "[[Git - Conflict Markers]]"
  - "[[Git - Preventing Merge Conflicts]]"
  - "[[Git - Staging Area]]"
  - "[[Git - Commit]]"
  - "[[Git - Branching]]"
  - "[[Git - Merging]]"
  - "[[Git - Rebase]]"
  - "[[Git - Pull Request]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Git - Cherry Pick]]"
  - "[[Git - Status]]"
  - "[[Git - Diff]]"
---
# Process: Resolving Merge Conflicts

**Why This Matters:** This process is the essential manual intervention required to integrate divergent lines of work, ensuring that collaborative development can proceed without losing critical changes.
## Goal & Analogy

> **Goal:** Resolving a merge conflict is the manual, step-by-step process a developer must follow when Git cannot automatically combine changes from different branches. It is the direct consequence of a [[Git - Merge Conflicts|merge conflict]] and requires editing the affected files to remove special [[Git - Conflict Markers|conflict markers]], choose the correct code, and create a new commit to finalize the merge. This is a cornerstone skill for effective [[Git - Collaboration|collaboration]] on any software project.

_Analogy:_ _Imagine two authors are asked to edit the same paragraph in a shared document without consulting each other. Author A rewrites a sentence to be more concise, while Author B adds a new clarifying detail to the same sentence. When they submit their changes, their editor sees two different versions of the same paragraph. The editor cannot automatically decide which is 'correct'; they must manually read both versions, combine the best elements of each (the conciseness from A, the detail from B), and create a new, final version of the paragraph before the document can be published._

In this analogy:
- **The Two Authors** are two developers working on separate Git branches.
- **The Shared Document** is the codebase.
- **The Conflicting Paragraph** is the specific block of code that was changed in both branches.
- **The Editor** is the developer performing the merge resolution.
- **The Final Published Document** is the successfully merged branch with the new merge commit.
- **Where it breaks down:** Unlike a human editor who understands the meaning and intent of the text, Git is only comparing lines of text. The developer resolving the conflict must apply their understanding of the code's logic and purpose to make the correct decision, a semantic judgment Git is incapable of.

```
Merge Fails ──> [ 1. git status ] ──> [ 2. Edit File ] ──> [ 3. Save File ] ──> [ 4. git add ] ──> [ 5. git commit ] ──> Merge Success
```

## The Step-by-Step Process

### Prerequisites / Inputs

- **Visual Merge Tools**
    - Instead of editing the raw text with conflict markers, you can configure Git to use a visual merge tool (`git mergetool`). Tools like VS Code, Beyond Compare, or P4Merge provide a three-way view (your version, their version, and the common ancestor) which can make it much easier to see the differences and choose the correct changes.
- **Merge Strategy Options**
    - When initiating the merge, you can use strategy options to automatically resolve conflicts in favor of one side. For example, `git merge -X ours` will attempt to auto-merge but will favor your branch's changes wherever a conflict arises. This can be a shortcut but should be used with caution as it can silently discard valid changes.

### The Steps

- **Step 1: Identify the Conflicted File**
    - Run `git status`. Git will clearly list the files that are in an 'unmerged' state. These are the files that require your manual intervention.
- **Step 2: Open and Edit the File**
    - Open the conflicted file in a text editor. You will see the [[Git - Conflict Markers|conflict markers]] (`<<<<<<< HEAD`, `=======`, `>>>>>>> branch-name`) that Git has inserted.
    - Your task is to delete these markers and the version of the code you do *not* want to keep. You might keep your version, the other version, or a combination of both.
- **Step 3: Save the File**
    - Once you are satisfied with the merged content and have removed all conflict markers, save the file.
- **Step 4: Stage the Resolved File**
    - Use the `git add <filename>` command. This doesn't just add the file to staging; it specifically tells Git that you have successfully resolved the conflict in that file.
- **Step 5: Commit the Merge**
    - Run `git commit`. Git will often open an editor with a pre-populated commit message (e.g., "Merge branch 'feature'"). You can keep this message or edit it. Once you save and close, the merge is complete, and the branches are successfully combined.

##### Code Translation

```python
```bash
# Let's assume 'feature-branch' has a conflict with 'main'
git checkout main
git merge feature-branch
# Auto-merging conflicted_file.txt
# CONFLICT (content): Merge conflict in conflicted_file.txt
# Automatic merge failed; fix conflicts and then commit the result.

# --- Step 1: Identify the conflicted file ---
git status
# On branch main
# You have unmerged paths.
#   (fix conflicts and run "git commit")
#
# Unmerged paths:
#   (use "git add <file>..." to mark resolution)
#         both modified:   conflicted_file.txt

# --- Step 2 & 3: Manually edit conflicted_file.txt to resolve, then save ---
# (This step happens in your code editor, not the terminal)

# --- Step 4: Stage the now-resolved file ---
git add conflicted_file.txt

# --- Step 5: Commit the merge resolution ---
git commit -m "Merge branch 'feature-branch'; resolved conflict in conflicted_file.txt"
```
```

### Deliverables / Outputs

When a merge fails, Git doesn't give up; it pauses the process and hands control over to you. It modifies the problematic file to show you exactly where the disagreement is, using special markers. Your job is to act as the final arbiter, editing the file to produce the single, correct version. This structured workflow—identify, edit, save, stage, and commit—is the standard procedure for resolving these inevitable side effects of parallel development.

## Context & Tradeoffs

### When to Use This Process

To manually create a single, correct version of a file from two or more conflicting versions, allowing the merge process to be successfully completed.

### Common Pitfalls & Tradeoffs

- **Risk of Human Error**
    - The entire process relies on the developer's judgment. A wrong decision during the manual edit can easily introduce bugs, delete a required feature, or revert a previous fix. The correctness of the resolution is not automatically verified.
- **Development Bottleneck**
    - A complex conflict can be time-consuming and mentally taxing to resolve. It halts the integration process and can become a significant bottleneck, especially in fast-moving projects with many contributors.
- **Obscured History**
    - The resolution is captured in a single merge commit. The specific, granular decisions made during the edit (e.g., "I took lines 5-10 from this branch and lines 12-15 from that one") are not recorded in the Git history, only the final, combined result is. This can make it harder to understand the 'why' behind the final code later on.

## Connections

```
                      (Parent)
                 Version Control
                         ▲
                         │
           ┌─────────────┼─────────────┐
           │             │             │
(Caused By)     ┌───────────────────────────┐     (Requires Editing)
Merge Conflicts │ Resolving Merge Conflicts │     Conflict Markers
                └───────────────────────────┘
                         │
                         │
                   (Essential For)
                    Collaboration
```


- This process is the direct response required to fix a [[Git - Merge Conflicts|merge conflict]].
- The first step in resolving a conflict is identifying and removing the [[Git - Conflict Markers|conflict markers]] that Git inserts into the file.
- Mastering this skill is essential for effective [[Git - Collaboration|team collaboration]] in a shared codebase.
- Adopting strategies for [[Git - Preventing Merge Conflicts|preventing merge conflicts]], such as frequent communication and smaller pull requests, can reduce the need for this manual process.

## Deeper Questions

- You've encountered a complex merge conflict between a critical hotfix and a long-running feature branch. Resolving it manually will delay the hotfix deployment by several hours. How do you decide whether to risk a quick, less-thorough resolution to meet the deployment window versus delaying the fix to ensure a perfect merge, and how would you communicate the business impact of this trade-off to a project manager?
- In a large monorepo with hundreds of developers, merge conflicts are constant. How would you design an automated system or a set of team-wide best practices to minimize the *time-to-resolution* for common conflicts, and what metrics would you track to measure the effectiveness of your system?
- What if Git provided an 'undo' button for individual choices *within* a conflict resolution (e.g., undoing the choice to keep 'our' version of a specific hunk)? How would that change the way you approach complex merges, and what new problems might it introduce?