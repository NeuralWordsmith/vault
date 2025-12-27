---
tags: 
  - core
  - git
  - version_control
  - dvcs
  - source_code_management
  - collaboration
  - repository
  - concept
source: 
  - "[[Introduction to Git]]"
related: 
  - "[[Fundamental - Version Control]]"
  - "[[Git - Benefits of Version Control]]"
  - "[[Git - Benefits of Git]]"
  - "[[Git - Shell (Terminal)]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Fundamental - Containerization]]"
  - "[[GitHub]]"
  - "[[GitLab]]"
  - "[[Bitbucket]]"
  - "[[CI/CD]]"
  - "[[Git - Branching]]"
  - "[[Git - Merging]]"
  - "[[Git - Remotes]]"
  - "[[Git - Rebase]]"
  - "[[Git LFS]]"
---
# Core: Git

## Summary

>Git is a free, open-source, distributed version control system designed to handle everything from small to very large projects with speed and efficiency. Unlike older, centralized systems, Git gives every developer a full copy of the project's history, allowing for powerful offline capabilities and robust collaboration. It is the most popular modern implementation of the principles described in [[Git - Version Control|version control]].

**Why This Matters:** Git is the industry-standard tool for tracking changes in code, enabling teams to collaborate efficiently on complex software projects without overwriting each other's work.

_Analogy:_ _Imagine Git is like a supercharged Google Doc for a team of authors writing a book. The main document is the 'main' branch. When an author wants to write a new chapter or experiment with a plot twist, they create a 'branch'—essentially making a personal copy to work on without disturbing the main text. After they finish their work, they 'commit' their changes, saving a snapshot of their progress with a descriptive message. Finally, they create a 'pull request' to 'merge' their new chapter back into the main book, where editors can review it and integrate it seamlessly. Every author has the entire history of all changes on their own computer._

**Where it breaks down:** The biggest difference is that Google Docs is centralized; everyone works on one master copy stored on Google's servers. Git is *distributed*. Every author has their own complete, independent copy of the book and its entire history. This allows them to work completely offline and provides a much higher degree of safety and redundancy, as the project isn't reliant on a single central server.

```
 Working Directory ────(git add)────> Staging Area ────(git commit)────> Local Repository
(Your local files)                     (Index)                       (.git directory)
```

## Details

Git is a specific, powerful tool that implements the theory of a [[Git - Version Control|version control system (VCS)]]. Created by Linus Torvalds for developing the Linux kernel, its core innovation is its distributed architecture. This means that instead of a single central server holding the project history, every developer's computer has a full-fledged repository with the complete history. This design makes most operations, like committing changes or creating branches, incredibly fast because they happen locally. Developers typically interact with Git using commands in a [[Git - Shell (Terminal)|shell or terminal]], allowing for precise control over their code's history.

#### Primary Goal

To provide a robust, fast, and distributed system for tracking changes in files (primarily source code) over time, allowing multiple developers to collaborate effectively and non-linearly.

#### Mechanism

- **Step 1: Initialize the Repository**
    - A new repository is created in a project folder. This creates a hidden `.git` directory where Git will store all the history and metadata.
- **Step 2: Modify and Stage Files**
    - The developer makes changes to files in their working directory. To prepare these changes for a snapshot, they are added to a 'staging area' (also called the index). This allows the developer to be selective about which changes are included in the next commit.
- **Step 3: Commit Changes**
    - The developer takes the files from the staging area and saves them as a permanent snapshot (a 'commit') in the local repository's history. Each commit has a unique ID and a descriptive message explaining the changes.

##### Code Translation

```python
# This is a shell script, not Python

# --- Step 1: Initialize the Repository ---
# Create a new directory and turn it into a Git repository
mkdir my-project
cd my-project
git init

# --- Step 2: Modify and Stage Files ---
# Create a new file and add some content
echo "Hello, Git!" > readme.md

# Add the new file to the staging area
git add readme.md

# --- Step 3: Commit Changes ---
# Save the staged changes to the repository's history
git commit -m "Initial commit: Add readme file"
```

 [[Code - Git Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Branching (`git branch`, `git checkout`)**
    - These are the primary levers for parallel development. `git branch <name>` creates a new line of development, and `git checkout <name>` switches to it, allowing you to work on features in isolation without affecting the main codebase.
- **Merging (`git merge`)**
    - This command is used to integrate the changes from one branch into another. It's the key to combining completed features back into the main project.
- **Remotes (`git remote`, `git push`, `git pull`)**
    - These commands manage connections to other repositories (e.g., on GitHub, GitLab). `push` sends your local commits to the remote, and `pull` fetches changes from the remote and merges them into your local branch, enabling team collaboration.

#### Core Trade-offs

- **Advantage: Speed and Efficiency**
    - Because most operations (branching, committing, merging) are performed locally, Git is extremely fast. You only need a network connection to push or pull changes from a remote repository.
- **Advantage: Powerful Branching and Merging**
    - Git's branching model is lightweight and a core part of the workflow, encouraging feature branches and experimentation. This is one of the key [[Git - Benefits of Git|benefits of Git]] for modern development practices.
- **Disadvantage: Steep Learning Curve**
    - Git's command-line interface and the underlying concepts (like the staging area, different merge strategies, and rebasing) can be complex and intimidating for beginners compared to simpler systems.
- **Disadvantage: Poor Handling of Large Binary Files**
    - Git is optimized for text files (like source code). It becomes slow and inefficient when tracking large binary files (e.g., videos, 3D models, datasets) because it stores a full copy of every version of every file.

## Connections

```
                     (Parent)
              Version Control
                       ▲
                       │
       ┌───────────────┼────────────────┐
       │               │                │
(Used Via)      ┌──────────────┐      (Provides)
  Shell         │     Git      │   Benefits of Git
                └──────────────┘
                       │
            ┌──────────┴──────────┐
            │                     │
        Branching             Merging
```

### Parent Concept

Git is a specific implementation of the concepts outlined in [[10 Utility Notes/Fundamental - Version Control.md|Fundamental - Version Control]].

### Child Concepts

- A core feature is [[Git - Branching|branching]], which allows for parallel development of features in isolated environments.
- The process of combining branches is known as [[Git - Merging|merging]], which integrates changes from different development lines back together.

### Related Concepts 

- Git is the most popular implementation of a [[Git - Version Control|version control system]], a category of tools designed to manage project history.
- The distributed nature of Git is one of the primary [[Git - Benefits of Git|benefits of Git]], offering speed and resilience over centralized systems.
- Most interactions with Git happen through a command-line interface like the [[Git - Shell (Terminal)|shell]].
## Questions

- Your team is considering storing large binary assets (like 3D models or design files) directly in a Git repository. What are the performance and scalability trade-offs of this decision, and what alternative solution (like Git LFS) would you propose to stakeholders to balance versioning needs with repository health?
- You're designing a CI/CD pipeline for a large monorepo with hundreds of developers. How would you structure your Git branching strategy (e.g., GitFlow, Trunk-Based Development) and configure your build triggers to prevent pipeline bottlenecks while ensuring code quality and rapid integration?
- What if Git's hashing algorithm (SHA-1, now moving to SHA-256) was proven to be easily breakable, allowing for malicious history rewriting that goes undetected? What fundamental changes would need to be made to the architecture of distributed version control to restore trust?