---
tags: 
  - core
  - git
  - git_log
  - merge_commit
  - commit_history
  - dag
  - ancestry
  - concept
source: 
  - "[[Intermediate Git]]"
related: 
  - "[[Fundamental - Version Control]]"
  - "[[Git - Branch Merging]]"
  - "[[Git - Purpose of Merging Branches]]"
  - "[[Git - Source & Destination Branches]]"
  - "[[Git - Standard Merge Workflow]]"
  - "[[Git - Interpreting Merge Command Output]]"
  - "[[Git - Fast-Forward Merge]]"
  - "[[Git - Fast-Forward Merge Output]]"
  - "[[Git - Three-Way Merge]]"
  - "[[Git - Rebase]]"
  - "[[Git - Commit]]"
  - "[[Git - Branch]]"
  - "[[Git - Directed Acyclic Graph (DAG)]]"
  - "[[Git - Log]]"
  - "[[Git - HEAD]]"
---
# Core: Git - Parent Commits

## Summary

>In version control systems like Git, when two branches are combined through a [[Git - Branch Merging|merge operation]], the resulting merge commit has two direct ancestors. These two ancestors—the last commit from the [[Git - Source & Destination Branches|source branch]] and the last commit from the destination branch—are known as the parent commits.

**Why This Matters:** Parent commits are crucial because they create a verifiable audit trail, showing exactly which lines of development were combined to form a new state in the project's history.

_Analogy:_ _Think of a project's history as a family tree. A regular commit is like a person having a single child, continuing a direct line of descent. A merge commit is like a child born to two parents from different family lines. This child (the merge commit) has a clear connection back to both of its parents (the parent commits), uniting their distinct histories into a single, new lineage._

*   **Where it breaks down:** In human genetics, a child is a unique blend of both parents' DNA. In Git, a merge commit doesn't 'blend' the content in the same way; it simply points to the two parent commits and records the combined state of the files as a new snapshot. The parent commits themselves remain entirely unchanged.

```
    A---B---D-------F  (main)
         \         /
          C---E---    (feature)

In this diagram:
- F is the merge commit.
- D (from main) is the first parent.
- E (from feature) is the second parent.
```

## Details

A parent commit is the immediate ancestor of another commit. While most commits have a single parent, the defining characteristic of a merge commit is that it has two parents. This two-parent structure is the mechanism Git uses to formally record the act of joining two separate branches. It's a fundamental concept in [[Fundamental - Version Control|version control]] that allows Git to maintain a non-linear, graph-like history that accurately reflects parallel development.

#### Primary Goal

To preserve the historical context of parallel development by explicitly linking a merge commit back to the two independent lines of work that were combined.

#### Mechanism

- **How it Works:**
    1. A developer initiates a [[Git - Branch Merging|merge operation]], for example, merging a `feature` branch into `main`.
    2. Git identifies the tip (the most recent commit) of the current branch (`main`) and the tip of the branch being merged in (`feature`).
    3. It then creates a new, special commit known as a 'merge commit'.
    4. This new merge commit has two pointers in its metadata: one pointing to the former tip of `main` and another pointing to the tip of `feature`. These two referenced commits are its parents.

##### Code Translation

```python
nothing to fill here
```

 [[Code - Git - Parent Commits Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Structural Property:** The concept of parent commits is not a parameter you can configure. It is an inherent, structural property of Git's data model.
    - A standard commit will always have one parent (except the very first root commit).
    - A non-fast-forward merge commit will always have two parents.

#### Core Trade-offs

- **Clarity vs. Linearity:** The two-parent structure creates a complex, graph-like history (a Directed Acyclic Graph or DAG). While this accurately reflects parallel work, it can be harder to read at a glance than a perfectly linear history that might be created by rebasing.
- **Historical Accuracy:** By explicitly recording the two parents, a merge commit preserves the exact context of when and what was merged. This is invaluable for auditing and debugging complex issues, as it shows the precise state of both branches at the moment of integration. This context is lost in workflows that rewrite history, like rebasing.

## Connections

```
          (Parent)
    Fundamental - Version Control
             ▲
             │
┌────────────┼────────────┐
│            │            │
(Related)   ┌──────────────────┐   (Related)
Branch Merging  │  Parent Commits  │   Fast-Forward Merge
            └──────────────────┘
```

### Parent Concept

Parent commits are a fundamental concept within [[Fundamental - Version Control|version control]], specifically in how systems like Git manage the history of branching and merging.

### Child Concepts



### Related Concepts 

- The entire process is initiated through [[Git - Branch Merging|branch merging]], which is the action that necessitates the creation of a commit with two parents.
- Understanding parent commits is key to [[Git - Interpreting Merge Command Output|interpreting the output of a merge command]], which often references the specific commit hashes being joined.
- This concept is bypassed in a [[Git - Fast-Forward Merge|fast-forward merge]], which avoids creating a new merge commit with two parents by simply moving the branch pointer forward.
## Questions

- Your team is debating between a 'merge' vs. 'rebase' workflow. How would you explain the value of preserving parent commit history (via merging) to a project manager in terms of risk management and bug tracking, even if it makes the Git log look more complex?
- Imagine you're designing a Git visualization tool for a massive monorepo with thousands of developers merging branches daily. How would you efficiently process and display the parent-child relationships to prevent the graph from becoming an unreadable 'spaghetti' of lines, while still highlighting critical merge points?
- What if Git allowed a commit to have three or more parents? Describe a plausible development scenario where a 'three-parent merge' (an 'octopus merge') might be genuinely useful, and what new kinds of problems or complexities might it introduce?