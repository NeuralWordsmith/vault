---
tags: 
  - core
  - git
  - version_control
  - merge
  - branching
  - collaboration
  - concept
source: 
  - "[[Intermediate Git]]"
related: 
  - "[[Fundamental - Version Control]]"
  - "[[Git - Collaboration]]"
  - "[[Git - Merge Conflict Resolution Process]]"
  - "[[Git - Conflict Markers]]"
  - "[[Git - Preventing Merge Conflicts]]"
  - "[[Git - Branching]]"
  - "[[Git - Merging]]"
  - "[[Git - Rebasing]]"
  - "[[Git - Pull Request]]"
  - "[[Git - Three-Way Merge]]"
  - "[[Git - Common Ancestor]]"
  - "[[Fundamental - Software Engineering]]"
---
# Core: Merge Conflict

## Summary

>A merge conflict is an event that occurs when Git, a version control system, is unable to automatically reconcile differences in code between two branches. This typically happens when two developers have modified the same line in the same file, forcing Git to pause the merge and ask for human intervention to decide which version is correct. This process is a core part of [[Git - Collaboration|collaborative workflows]].

**Why This Matters:** Understanding merge conflicts is essential for effective team collaboration in software development, as they are a natural and frequent side-effect of parallel work that must be resolved to integrate new features.

_Analogy:_ _Imagine two authors are co-writing a book using a shared Google Doc. Author A changes the first sentence of Chapter 3 to "It was a dark and stormy night." At the same time, Author B, working on their own copy, changes the same sentence to "The sun beat down on the arid desert." When they try to merge their documents, the software doesn't know which opening sentence to keep. It flags the line and says, "Hey, I have two different versions of this sentence. You two need to talk and decide which one to use."_

- **Authors:** Developers on a team.
- **Shared Google Doc:** The central Git repository.
- **Individual Copies:** The local branches each developer works on.
- **Conflicting Sentences:** The same lines of code edited differently.
- **The Software Flagging the Issue:** Git pausing the merge and creating a conflict.
- **Where it breaks down:** Unlike a simple text document, code has logical structure and dependencies. Resolving a code conflict isn't just about picking the "better" sentence; it's about ensuring the final combined code still functions correctly, which requires technical understanding beyond simple text comparison.

```
    (Base Commit) C1
         │
    ┌────┴────┐
    │         │
    C2        C3  (Both edit line 5 of file.txt)
(Branch A) (Branch B)
    │         │
    └────┬────┘
         │
    git merge B
         │
         ▼
      CONFLICT!
(Git cannot auto-merge C2 and C3's changes to file.txt)
```

## Details

A merge conflict is a fundamental concept in version control systems like Git. It arises when Git's automated merging logic encounters an ambiguity it cannot resolve on its own. This happens most commonly when two separate branches, which originated from a common ancestor commit, have both made changes to the exact same part of a file. Instead of guessing and potentially breaking the code, Git halts the merge process, marks the file as conflicted, and hands control over to the developer to manually resolve the differences. This safety mechanism is crucial for maintaining code integrity in collaborative projects. The visual cues for this are known as [[Git - Conflict Markers|conflict markers]], and fixing them follows a specific [[Git - Merge Conflict Resolution Process|resolution process]].

#### Primary Goal

The primary goal of flagging a merge conflict is to prevent data loss and code corruption by forcing a human developer to make an intelligent decision when an automated merge is impossible.

#### Mechanism

- **How it Works:**
    1. **Divergence:** Two branches (e.g., `feature-A` and `main`) start from the same base commit.
    2. **Parallel Changes:** A developer on `feature-A` modifies a specific line in `config.js`. Simultaneously, another developer modifies the *exact same line* in `config.js` on the `main` branch.
    3. **Merge Attempt:** The developer tries to merge `feature-A` into `main`.
    4. **Conflict Detection:** Git's three-way merge algorithm compares the two branch tips and their common ancestor. It sees that the same line has been changed in two different ways and cannot choose a winner.
    5. **Process Halt:** Git stops the merge, marks the file as 'unmerged', and injects [[Git - Conflict Markers|conflict markers]] into the file to show both the incoming changes and the current changes.

##### Code Translation

```python
nothing to fill here
```

 [[Code - Merge Conflict Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Frequency of Communication:**
    - Less communication between developers about what they are working on increases the likelihood of them editing the same files and creating conflicts.
- **Branch Longevity:**
    - Long-lived feature branches that diverge significantly from the main branch are far more likely to have conflicts when merged back in. This is a key argument for continuous integration and short-lived branches.
- **Team Size & Codebase Overlap:**
    - Larger teams working on the same parts of a codebase will naturally generate more conflicts.

#### Core Trade-offs

- **Safety vs. Automation:**
    - The primary tradeoff is safety. Git could be designed to always pick one version (e.g., 'theirs' or 'ours'), but this would be extremely dangerous and lead to silently lost work. The conflict process prioritizes correctness over a frictionless, automated merge.
- **Disruption vs. Integrity:**
    - A merge conflict is disruptive; it stops a developer's workflow and requires manual effort to fix. However, this disruption is the price paid for ensuring the integrity of the codebase.

## Connections

```
                      (Parent)
                 Version Control
                         ▲
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                    │
(Enables)      ┌───────────────────┐      (Strategy for)
Collaboration  │   Merge Conflict  │      Preventing Conflicts
               └───────────────────┘
                         │
              ┌──────────┴──────────┐
              │                     │
    Conflict Markers      Resolution Process
```

### Parent Concept

A merge conflict is a core concept that exists within the domain of [[Fundamental - Version Control|version control]], representing a common challenge in managing parallel development streams.

### Child Concepts

- The visual indicators of a conflict are known as [[Git - Conflict Markers|conflict markers]], which Git inserts directly into the affected files to show the differing versions.
- The manual procedure for fixing these issues is the [[Git - Merge Conflict Resolution Process|merge conflict resolution process]], a critical skill for any developer.

### Related Concepts 

- Merge conflicts are an inherent part of [[Git - Collaboration|collaboration]] when multiple developers contribute to the same codebase.
- Adopting strategies for [[Git - Preventing Merge Conflicts|preventing merge conflicts]], such as frequent communication and pulling changes regularly, is a key aspect of effective team workflow.
## Questions

- Imagine you encounter a merge conflict where one branch refactored a function for performance, and the other branch added critical new business logic to the old version of that same function. How would you approach the resolution, and how would you justify the potential delay to a project manager?
- In designing a CI/CD pipeline for a large team, what specific steps or automated checks would you implement to catch merge conflicts early and prevent a conflicted state from ever being deployed to a staging environment?
- What if Git used a probabilistic model to resolve conflicts, choosing the 'most likely' correct version based on the project's history? What new categories of bugs might this introduce, and would the time saved be worth the risk?