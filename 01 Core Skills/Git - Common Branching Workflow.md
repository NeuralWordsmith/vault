---
tags: 
  - process
  - git
  - workflow
  - feature_branch
  - bug_fix
  - merge
  - concept
source: 
  - "[[Intermediate Git]]"
related: 
  - "[[Fundamental - Version Control]]"
  - "[[Git - Branching]]"
  - "[[Git - Benefits of Branching]]"
  - "[[Git - The main Branch]]"
  - "[[Git - Branch Management Commands Cheatsheet]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Git - Merge Conflicts]]"
  - "[[Git - Pull Requests]]"
  - "[[Git - Rebase vs Merge]]"
  - "[[CI/CD - Continuous Integration]]"
  - "[[Fundamental - MLOps]]"
  - "[[Agile - Software Development]]"
  - "[[Fundamental - Containerization]]"
---
# Process: Git - Branching Workflow

**Why This Matters:** This workflow enables teams to develop new features and fix urgent bugs in parallel without destabilizing the live production system.
## Goal & Analogy

> **Goal:** A branching workflow is a structured strategy for managing code changes in a version control system like Git. It revolves around using a stable, primary branch (often called `main`) as the single source of truth for production code. All new work, such as features or bug fixes, is done in separate, temporary branches. This isolation, a core part of [[Git - Branching|Git's branching capability]], prevents unstable code from affecting the live system. Once the work is complete and verified, the temporary branch is merged back into the primary [[Git - The main Branch|main branch]], integrating the new changes.

_Analogy:_ _Imagine a team of authors co-writing a definitive encyclopedia. The published, printed edition is the `main` branch—it's the official version everyone reads. When an author wants to add a new chapter on 'Artificial Intelligence', they don't write directly in the master copy. Instead, they create a separate draft (a 'feature branch'). They write, edit, and revise this draft in isolation. Simultaneously, an editor might find a typo in the published edition. The editor makes a quick correction on a separate sticky note (a 'bug-fix branch'). Once the new AI chapter is perfect, it's carefully added to the master manuscript (a 'merge'). Likewise, the editor's typo correction is applied to the master copy. This way, new content is developed and errors are fixed without disrupting the integrity of the official, published encyclopedia._

*   **Where it breaks down:** Unlike merging text in a document, merging code can create 'merge conflicts' where two changes are logically incompatible. This requires a developer to manually intervene and decide how to combine the conflicting code, a technical task with no direct equivalent in simple text editing.

```
A visual representation of the workflow described:

(main)   A----B-----------------M1-----------------C----M2--->
            |                 /                  |
(ai-assist)  `---D----E----F---'                   |
                                                 |
(bug-fix)                                         `---G---H---'
```

## The Step-by-Step Process

### Prerequisites / Inputs

- **Branch Naming Conventions**
    - Teams often adopt standardized prefixes for branch names to clarify their purpose, such as `feature/ai-assistant`, `bugfix/login-error`, or `hotfix/critical-db-patch`.
- **Merge Strategy**
    - How a branch is merged can vary. A standard merge preserves the branch's history, while a 'squash and merge' condenses all of the branch's commits into a single commit on `main`, creating a cleaner history.
- **Code Review (Pull/Merge Requests)**
    - In team environments, merging is not done unilaterally. A developer opens a 'Pull Request' (or Merge Request), which is a formal proposal to merge their branch. This allows other team members to review the code, suggest changes, and run automated tests before approval.

### The Steps

- **How it Works:** The workflow follows a clear, sequential cycle for both feature development and bug fixing.
    - **1. Start from a Stable Base:** The `main` branch always represents the stable, production-ready code.
    - **2. Create a Feature Branch:** To begin work on a new feature, a new branch (e.g., `ai-assistant`) is created from the latest version of `main`.
    - **3. Develop in Isolation:** All commits related to the new feature are made exclusively on the `ai-assistant` branch. The `main` branch remains untouched and stable.
    - **4. Integrate the Feature:** Once the feature is complete and tested, the `ai-assistant` branch is merged back into `main`, incorporating the new code into the production line.
    - **5. Address Urgent Issues:** When a bug is discovered in production (i.e., in `main`), a new `bug-fix` branch is created from `main`.
    - **6. Implement the Fix:** Commits to resolve the bug are made on the `bug-fix` branch.
    - **7. Deploy the Fix:** The `bug-fix` branch is quickly merged back into `main` to patch the live system.

##### Code Translation

```bash
# --- Step 1 & 2: Create a feature branch from main ---
git checkout main         # Ensure you are on the main branch
git pull                # Get the latest version of main
git checkout -b ai-assistant # Create and switch to the new branch

# --- Step 3: Develop in isolation ---
# ... edit files: feature.py, model.py ...
git add .
git commit -m "feat: Implement initial AI logic"
# ... more edits and commits ...
git add .
git commit -m "feat: Refine AI response generation"

# --- Step 4: Integrate the feature ---
git checkout main         # Switch back to main
git merge ai-assistant  # Merge the feature branch into main

# --- Step 5: A bug is found! Create a bug-fix branch ---
git checkout -b bug-fix   # Create a new branch from main

# --- Step 6: Implement the fix ---
# ... edit file: bug_source.py ...
git add .
git commit -m "fix: Correct null pointer exception"

# --- Step 7: Deploy the fix ---
git checkout main
git merge bug-fix
```

### Deliverables / Outputs

The core idea is to maintain a clean, working version of your project in a dedicated branch while isolating all development and bug fixes into their own separate branches. As described in the scenario, we start with the `main` branch, which holds our live system's code. For a new feature, we create an `ai-assistant` branch. This allows us to build and test the new functionality without any risk to the production code. After the feature is stable, we merge it back. If a separate, urgent issue arises, like a bug in production, we repeat the process by creating a `bug-fix` branch, resolving the issue there, and then merging that fix back into `main`. This systematic approach is how teams realize the [[Git - Benefits of Branching|full benefits of branching]].

## Context & Tradeoffs

### When to Use This Process

To provide a safe, parallel, and organized method for adding new features and fixing bugs without disrupting the stable, production-ready codebase.

### Common Pitfalls & Tradeoffs

- **Pro: Safety and Stability**
    - The primary advantage is that the `main` branch is always protected from experimental or broken code, ensuring a stable version is always available for deployment.
- **Pro: Parallel Development**
    - Multiple developers or teams can work on different features simultaneously without interfering with each other's work.
- **Con: Merge Complexity**
    - If a feature branch lives for a long time and `main` changes significantly, merging it back can become very complex and lead to difficult-to-resolve merge conflicts.
- **Con: Management Overhead**
    - In large projects, a proliferation of branches can become difficult to track. It requires discipline to delete stale branches and maintain a clean repository.

## Connections

```
                      (Parent)
               Fundamental - Version Control
                           ▲
                           |
                           |
┌──────────────────────────┼──────────────────────────┐
│                          │                          │
(Core Concept)    ┌──────────────────────────┐    (Core Component)
Git - Branching   │  Git - Branching Workflow  │    Git - The main Branch
                  └──────────────────────────┘
                           |
                           |
                           ▼
                      (Realizes)
               Git - Benefits of Branching
```


- This workflow is a practical application of the core concept of [[Git - Branching|branching]], which provides the underlying mechanism for creating isolated lines of development.
- The stability of the entire system relies on protecting [[Git - The main Branch|the main branch]] as the single, immutable source of truth for production code.
- Following this structured process is how a team fully realizes the [[Git - Benefits of Branching|benefits of branching]], such as parallel development and improved code quality.
- A helpful reference for implementing this workflow is the [[Git - Branch Management Commands Cheatsheet|cheatsheet of branch management commands]].

## Deeper Questions

- Your team has a long-running feature branch that has diverged significantly from `main`. Merging it now would be complex and risky, but the business wants the feature released. Do you attempt the risky merge, or do you invest time in refactoring the branch first, delaying the release? How do you explain the risk vs. reward to a project manager?
- In a large project with dozens of active feature and bug-fix branches, how would you design an automated CI/CD pipeline that prevents broken code from ever being merged into the `main` branch?
- What if your entire team was forced to work directly on the `main` branch with no feature branches allowed (a practice known as trunk-based development)? What new processes, tools, and developer disciplines would be absolutely essential to prevent constant system instability?