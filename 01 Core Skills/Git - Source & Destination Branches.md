---
tags: 
  - core
  - git
  - merge
  - source_branch
  - destination_branch
  - version_control
  - concept
source: 
  - "[[Intermediate Git]]"
related: 
  - "[[Fundamental - Version Control]]"
  - "[[Git - Branch Merging]]"
  - "[[Git - Purpose of Merging Branches]]"
  - "[[Git - Standard Merge Workflow]]"
  - "[[Git - Parent Commits]]"
  - "[[Git - Fast-Forward Merge]]"
  - "[[Git - Interpreting Merge Command Output]]"
  - "[[Git - Fast-Forward Merge Output]]"
  - "[[Git - Branches]]"
  - "[[Git - Commits]]"
  - "[[Git - Checkout]]"
  - "[[Git - Three-Way Merge]]"
  - "[[Git - Merge Conflicts]]"
---
# Core: Source and Destination Branches

## Summary

>In any [[Git - Branch Merging|Git merge operation]], there are two key roles: the 'source' branch, which contains the changes you want to incorporate, and the 'destination' branch, which is the branch that will receive those changes. This terminology establishes a clear, one-way direction for the flow of code.

**Why This Matters:** Clearly defining source and destination branches is crucial for preventing accidental overwrites and ensuring that code changes flow in the intended direction during a merge.

_Analogy:_ _Imagine you're an editor working on a final manuscript (the destination). A writer gives you a separate document with their new chapter and revisions (the source). Your job is to merge the writer's new content *from* the source document *into* your final manuscript. You wouldn't merge the old manuscript into the new chapter; the flow is one-way._

Where it breaks down:** Unlike a document, Git merges are not just copy-pasting. Git intelligently combines the histories of both branches, often creating a new [[Git - Parent Commits|merge commit]] that records the integration point, a complexity not captured by simply adding text to a manuscript.

```
    (Source Branch)
    feature/ai-assistant ------┐
                                 ▼
                                (merge)
                                 │
    main ----------------------► main (with new features)
    (Destination Branch)
```

## Details

The concept of source and destination branches is fundamental to version control, providing a clear mental model for the direction of change. When you perform a merge, you are always taking the history and changes from one branch (the source) and integrating them into another (the destination). For instance, as mentioned in the context, when merging a feature branch like `ai-assistant` back into the main codebase, `ai-assistant` is the source of the new features, and `main` is the destination where they will be permanently stored. This distinction is the foundation of the [[Git - Standard Merge Workflow|standard merge workflow]].

#### Primary Goal

To establish an unambiguous, directional relationship between the two branches involved in a merge, ensuring that changes are applied correctly and predictably.

#### Mechanism

- **The Roles in a Merge:**
    1. **Identify the Destination:** First, you must be 'on' the branch you want to merge *into*. This is your destination. You achieve this with the `git checkout` command.
    2. **Specify the Source:** Second, you execute the `git merge` command and provide the name of the branch you want to merge *from*. This is your source.
- **Source Branch:**
    - This is the branch that contains the new commits, features, or bug fixes.
    - It is typically a short-lived feature branch, experiment branch, or hotfix branch.
    - *Example: The `ai-assistant` branch contains the newly developed AI features.*
- **Destination Branch:**
    - This is the branch that will receive the changes from the source branch.
    - It is often a long-lived integration branch like `main`, `master`, or `develop`.
    - *Example: The `main` branch is the stable, primary codebase that needs to incorporate the new AI features.*

#### Key Parameters

- **The Merge Command Structure:** The 'parameters' are the branch names themselves, which define the roles.
    - `git checkout <destination_branch>`: This command sets your current location, implicitly defining the destination for the subsequent merge.
    - `git merge <source_branch>`: This command explicitly names the source branch whose changes will be brought into your current (destination) branch.

#### Core Trade-offs

- **Clarity vs. Risk of Error:**
    - The source/destination terminology provides essential clarity for a potentially complex operation.
    - However, the primary risk is human error. Accidentally reversing the roles (e.g., being on the feature branch and merging `main` into it) can pull unintended changes into your feature branch, complicating its history and potentially leading to a messy final merge.

## Connections

```
                  (Parent)
              Branch Merging
                    ▲
                    │
┌───────────────────┼───────────────────┐
│                   │                   │
(Workflow)     ┌───────────────────────────┐     (Mechanism)
Standard Merge │ Source & Destination      │     Fast-Forward Merge
               │ Branches                  │
               └───────────────────────────┘
                    │
                    ▼
               (Defines)
           Purpose of Merging
```

### Parent Concept

This concept is a core component of [[Git - Branch Merging|branch merging]], defining the fundamental roles and direction of the operation.

### Related Concepts 

- The [[Git - Standard Merge Workflow|standard merge workflow]] is entirely built upon the principle of merging a source feature branch into a destination main branch.
- Understanding the source and destination is key to understanding the [[Git - Purpose of Merging Branches|purpose of merging]], which is to integrate isolated lines of development.
- Whether a [[Git - Fast-Forward Merge|fast-forward merge]] is possible depends on the relationship between the commit histories of the source and destination branches.
## Questions

- Imagine you accidentally merged `main` (destination) into your `feature` branch (source) instead of the other way around. How would you explain the potential impact on the project's history to a non-technical manager, and what Git commands would you use to recover from this mistake?
- In a large team with dozens of developers, how would you use repository settings (like protected branches on GitHub/GitLab) to enforce the rule that developers can only merge feature branches *into* the `develop` branch, and never the other way around?
- What if Git's merge command was symmetric, meaning `git merge A B` and `git merge B A` produced the same result? How would that change the fundamental branching and integration strategies we use today?