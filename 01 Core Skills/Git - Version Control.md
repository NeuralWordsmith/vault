---
tags: 
  - major_core
  - git
  - source_control
  - scm
  - repository
  - collaboration
  - concept
source: 
  - "[[Introduction to Git]]"
related: 
  - "[[Fundamental - Software Engineering]]"
  - "[[Git - Git Version Control System]]"
  - "[[Git - Benefits of Version Control]]"
  - "[[Git - Benefits of Git]]"
  - "[[Git - Shell (Terminal)]]"
  - "[[Fundamental - MLOps]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[Fundamental - Containerization]]"
  - "[[Fundamental - Programming]]"
  - "[[Fundamental - Cloud Computing]]"
  - "[[DevOps - Continuous Integration (CI)]]"
  - "[[DevOps - Continuous Deployment (CD)]]"
  - "[[Git - Branching]]"
  - "[[Git - Merging]]"
  - "[[Git - Commits]]"
---
# Major Core: Version Control

## Summary

> Version control is a category of systems and processes designed to manage and track changes to a collection of files over time. It's essential for any project that evolves, especially those involving collaboration, such as software code, datasets, or documentation. By creating a detailed history of every modification, it allows teams to understand a project's evolution, revert to previous states, and merge work from multiple contributors, which provides the core [[Git - Benefits of Version Control|benefits of version control]].

**Why This Matters:** Version control is the safety net for collaborative projects, preventing catastrophic data loss and enabling teams to work on the same files simultaneously without chaos.

_Analogy:_ _Think of version control like the 'Version History' feature in Google Docs. As you and your colleagues write and edit a document, Google Docs is silently saving snapshots of every change. If someone accidentally deletes a crucial paragraph, you don't panic; you simply open the version history, find the snapshot from before the deletion, and restore it. You can see who made what change and when, providing a complete, transparent timeline of the document's life._

• **The Google Doc** is your project's folder (repository).
• **Each saved version** in the history is a 'commit'—a snapshot of the project at a specific point in time.
• **Seeing who made changes** is like viewing the author of each commit.
• **Restoring an old version** is equivalent to 'checking out' a previous commit.

• **Where it breaks down:** Google Docs has a single, linear timeline. Modern version control systems like [[Git - Git Version Control System|Git]] are far more powerful, allowing for non-linear development through 'branches'. This lets multiple developers work on different features in parallel universes and then intelligently merge their changes back together, something a simple version history cannot do.

```
A File's Timeline in Version Control

File v1.0  ───(change)───>  File v1.1  ───(change)───>  File v2.0
   ▲                           ▲                           ▲
   │                           │                           │
Commit A                    Commit B                    Commit C
(Initial)                 (Add feature)               (Fix bug)
```

## Details

At its heart, version control is about systematically capturing snapshots of a project's state. Instead of saving files with names like `report_final_v2_revised.docx`, a version control system (VCS) manages this history automatically in a special database called a repository. This allows any team member to retrieve any version of any file at any time. It is a cornerstone of modern [[10 Utility Notes/Fundamental - Software Engineering.md|Software Engineering]] and [[10 Utility Notes/Fundamental - MLOps.md|MLOps]]. The two primary approaches are **Centralized Version Control** and **Distributed Version Control**.

#### Primary Goal

To provide a reliable and systematic way to manage the evolution of a project's files over time, enabling safe collaboration and recovery from errors.

#### Mechanism

- **How it Works:**
    1. **Initialize Repository:** A special hidden directory (e.g., `.git`) is created in the project folder. This directory will store the entire history of changes.
    2. **Track & Modify:** You work on your files as usual—editing code, updating data, writing documentation.
    3. **Stage Changes:** You select which of your modified files you want to include in the next snapshot. This is called 'staging' or 'adding'.
    4. **Commit Changes:** You save the staged changes as a permanent snapshot, called a 'commit'. Each commit is given a unique ID and must be accompanied by a message describing what was changed. This creates a single point in the project's timeline.
- **Centralized Version Control (CVCS):**
    - A single, central server holds the master copy of the project repository. Developers 'check out' the latest version, make changes, and then 'check in' their updates to the central server.
    - *Example:* Subversion (SVN), Perforce. This model is older and less common now because the central server is a single point of failure.
- **Distributed Version Control (DVCS):**
    - Every developer has a full, complete copy of the entire repository, including its history, on their local machine. Work is committed locally first. To collaborate, developers 'push' their local changes to a shared remote repository (like on GitHub) and 'pull' changes from others.
    - *Example:* The most popular DVCS is [[Git - Git Version Control System|Git]], which is the modern industry standard.

#### Key Parameters

- **Commit Granularity:**
    - This refers to the scope of changes included in a single commit. The best practice is to create small, 'atomic' commits where each commit represents a single logical change (e.g., 'Fix login bug' or 'Add user authentication feature').
- **Branching Strategy:**
    - This is the set of rules a team follows for creating and merging branches. A branch is a parallel line of development. Strategies like GitFlow or Trunk-Based Development organize how new features, bug fixes, and releases are managed without disrupting the main, stable version of the project.
- **Ignore Files (.gitignore):**
    - A crucial configuration file that tells the version control system which files or directories to intentionally not track. This is used for temporary files, build artifacts, log files, or sensitive information like API keys.

#### Core Trade-offs

- **Pro: Safety and Reversibility:**
    - The entire history of the project is preserved, making it trivial to undo mistakes, revert to a previous working state, or compare different versions of a file to see what changed.
- **Pro: Collaboration and Parallel Work:**
    - Version control, especially distributed systems like Git, is built for teamwork. It provides structured ways (like branching and merging) for multiple people to work on the same codebase simultaneously without overwriting each other's work.
- **Con: Learning Curve and Overhead:**
    - Using a VCS requires learning a new set of concepts and commands, often through a [[Git - Shell (Terminal)|command-line interface]]. This adds a layer of complexity compared to simply saving files, which can be a barrier for beginners.
- **Con: Repository Size:**
    - Storing the complete history of every change can lead to very large repository sizes, especially for projects with large binary assets (e.g., images, videos, large datasets). This can make cloning or fetching updates slow.

## Connections

```
              (Parent)
        Software Engineering
                 ▲
                 │
┌────────────────┼────────────────┐
│                │                │
(Tool)      ┌──────────────────┐    (Benefit)
Shell       │  Version Control │    Collaboration
            └──────────────────┘
                 │
      ┌──────────┴──────────┐
      │                     │
Distributed (Git)    Centralized (SVN)
```

### Parent Concept

Version control is a foundational practice within the broader discipline of [[10 Utility Notes/Fundamental - Software Engineering.md|Software Engineering]], ensuring code quality, collaboration, and maintainability.

### Child Concepts

- The most dominant implementation of version control today is the [[Git - Git Version Control System|Git Version Control System]], a distributed model that has become the industry standard.
- An older paradigm is Centralized Version Control (like SVN), where a single server acts as the sole source of truth for all changes.

### Related Concepts 

- The core purpose of version control is to provide the numerous [[Git - Benefits of Version Control|benefits of version control]], such as traceability, collaboration, and disaster recovery.
- While version control is the concept, [[Git - Git Version Control System|Git]] is the most popular tool that implements it, offering many of its own [[Git - Benefits of Git|specific advantages]].
- Interacting with version control systems like Git is typically done through a command-line interface like the [[Git - Shell (Terminal)|Shell]].
- The principles of version control are central to [[10 Utility Notes/Fundamental - MLOps.md|MLOps]], where it's used to track not just code, but also changes in data and models to ensure reproducibility.
## Questions

- Your team is working with very large binary files (e.g., 3D models, video assets) that are not well-suited for standard Git. What trade-offs would you consider when choosing between Git LFS (Large File Storage) and a dedicated digital asset management system, and how would you justify the potential cost and complexity to a project manager?
- You are designing a CI/CD pipeline for a large organization with hundreds of developers. How would you structure your branching strategy and repository permissions to prevent 'merge hell' and ensure that only high-quality, tested code reaches the main branch, while still allowing for rapid development?
- What if storage became infinitely cheap and fast, and every single keystroke for every file on your computer was automatically saved and indexed forever? Would traditional 'commit'-based version control still be necessary, or would it be replaced by a different paradigm of navigating project history?
