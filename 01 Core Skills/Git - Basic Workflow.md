---
tags: 
  - process
  - git
  - git_workflow
  - staging_area
  - commit
  - version_control
  - git_add
  - concept
source: 
  - "[[Introduction to Git]]"
related: 
  - "[[Fundamental - Version Control]]"
  - "[[Git - Staging Area]]"
  - "[[Git - Commit]]"
  - "[[Git - Staging vs Committing]]"
  - "[[Git - git add Command]]"
  - "[[Git - git commit Command]]"
  - "[[Git - Commit Hash]]"
  - "[[Git - Commit Message Best Practices]]"
  - "[[Git - Repository]]"
  - "[[Git - Branching]]"
  - "[[Git - Working Directory]]"
  - "[[Git - HEAD]]"
---
# Process: Git - Core Workflow

**Why This Matters:** This three-step workflow provides a deliberate and controlled process for saving changes, preventing accidental commits and ensuring every snapshot of the project's history is meaningful and well-defined.
## Goal & Analogy

> **Goal:** The core Git workflow is a fundamental three-step process for saving changes to a project. It begins with modifying files in the working directory, followed by selectively adding those changes to a temporary [[Git - Staging Area|staging area]]. The final step is to permanently save the staged changes as a new version, known as a [[Git - Commit|commit]], in the project's history.

_Analogy:_ _Think of the Git workflow like online shopping. First, you browse the store and put items you *might* want into your shopping cart (this is like editing files). Next, you review your cart and decide which items you're actually ready to buy (this is adding files to the [[Git - Staging Area|staging area]]). Finally, you complete the purchase, creating a permanent receipt for the items you selected (this is making a [[Git - Commit|commit]]).

- **Editing Files:** Browsing the store and adding items to your cart.
- **Staging Area:** The shopping cart itself, holding items you've selected for purchase.
- **Commit:** The final checkout process that creates a permanent record (the receipt) of the transaction._

- **Where it breaks down:** Unlike a shopping receipt which can be lost, a Git commit is a permanent, cryptographically secure part of the project's history. Also, removing an item from the staging area is trivial, whereas trying to take an item out of your physical cart at the checkout counter can be more complicated.

```
Working Directory ────(git add)────> Staging Area ────(git commit)────> Git Repository
```

## The Step-by-Step Process

### Prerequisites / Inputs

- **Key Commands:** The workflow is primarily controlled by two core Git commands.
    - **`git add <file>`:** This command is the 'lever' to move changes from the working directory to the staging area. You can add specific files, entire directories, or even parts of files.
    - **`git commit -m "message"`:** This command is the 'lever' to move changes from the staging area into the permanent repository history. The commit message is a mandatory parameter that explains *why* the change was made.

### The Steps

- **How it Works:** The process moves changes through three distinct states before they are permanently recorded.
    1. **Modify:** You edit, create, or delete files in your project folder, known as the 'working directory'. At this point, Git is aware of the changes but is not yet tracking them for the next save.
    2. **Stage:** You use the [[Git - git add Command|git add]] command to select specific changes from your working directory and move them to the [[Git - Staging Area|staging area]]. This acts as a 'drafting space' for your next commit, allowing you to group related changes together.
    3. **Commit:** You use the [[Git - git commit Command|git commit]] command to take all the changes currently in the staging area and save them as a permanent snapshot in the project's history (the repository). Each [[Git - Commit|commit]] has a unique ID and a descriptive message.

### Deliverables / Outputs

The core Git workflow is a foundational concept in version control that introduces a deliberate, intermediate step between modifying a file and permanently saving it. Instead of a simple 'save' button that overwrites the previous version, Git uses a three-stage process: modifying files in your local directory, adding specific changes to a staging area, and then committing those staged changes to the project's history. This separation provides granular control, allowing you to craft logical, clean commits that tell a clear story about the project's evolution.

## Context & Tradeoffs

### When to Use This Process

To provide a structured, intentional, and safe process for recording changes to a project's history, ensuring that each saved version is a purposeful and logical snapshot.

### Common Pitfalls & Tradeoffs

- **Advantage: Granular Control**
    - The staging area allows you to build commits piece by piece. You can work on multiple unrelated features, but only stage and commit the changes for one feature at a time, leading to a clean, logical project history.
- **Advantage: Pre-Commit Review**
    - The staging area acts as a final review point before making a permanent change. It encourages developers to double-check exactly what they are about to save.
- **Disadvantage: Added Complexity**
    - For beginners or those coming from systems without a staging area (like SVN), this extra step can feel redundant and add cognitive overhead for simple changes.

## Connections

```
             (Parent)
      Fundamental - Version Control
                 ▲
                 │
       ┌─────────┼─────────┐
       │         │         │
┌──────────────┐ │ ┌───────────────┐
│ Core Workflow│ │ │ Staging Area  │
└──────────────┘ │ └───────────────┘
       │         │         │
       ▼         ▼         ▼
    Commit   git add   git commit
```


- This workflow's intermediate step is the [[Git - Staging Area|staging area]], which holds changes before they are saved.
- The final step of the workflow is to create a [[Git - Commit|commit]], which is a permanent snapshot of the staged changes.
- Understanding [[Git - Staging vs Committing|the difference between staging and committing]] is crucial to mastering this core workflow.
- The `[[Git - git add Command|git add]]` command is the mechanism for moving files into the staging area.
- The `[[Git - git commit Command|git commit]]` command is the mechanism for saving the staged changes to the repository's history.

## Deeper Questions

- When might a development team decide to enforce a policy of always using the staging area versus allowing shortcuts like `git commit -a`, and how would you justify the impact on developer velocity versus code history quality to management?
- In a large-scale CI/CD pipeline, how would you design an automated check to ensure that no 'work-in-progress' or debug code from the working directory is accidentally included in a commit that gets pushed, effectively enforcing the discipline of the staging area?
- What if Git had no staging area and `git commit` simply saved all modified files? How would that fundamentally alter collaborative workflows, especially code review practices and the concept of atomic commits?