---
tags: 
  - core
  - git
  - version_control
  - source_of_truth
  - master_branch
  - production_branch
  - concept
source: 
  - "[[Intermediate Git]]"
related: 
  - "[[Fundamental - Version Control]]"
  - "[[Git - Branching]]"
  - "[[Git - Benefits of Branching]]"
  - "[[Git - Common Branching Workflow]]"
  - "[[Git - Branch Management Commands Cheatsheet]]"
  - "[[Git - Commit]]"
  - "[[Git - Merge]]"
  - "[[Git - Pull Request]]"
  - "[[Git - Repository]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Fundamental - MLOps]]"
  - "[[Git - Rebase]]"
  - "[[Git - HEAD]]"
  - "[[Git - Staging Area]]"
---
# Core: Main Branch

## Summary

>The `main` branch is the default repository branch that holds the stable, working version of an application, such as the live DataCamp website. It acts as the foundation from which new development, like testing a feature in a separate branch, originates. This practice of creating a new branch from an existing one is called "branching off".

**Why This Matters:** The main branch serves as the single source of truth for a project's stable, production-ready code, ensuring there is always a reliable version to deploy or build upon.

_Analogy:_ _Think of the `main` branch as the master blueprint for a skyscraper. The construction crew works from this official, approved blueprint to build the actual live building that people use every day. When architects want to design a new feature, like a rooftop garden, they don't scribble on the master blueprint. Instead, they trace a copy of it onto a new sheet of paper (a feature branch). On this copy, they can experiment, draw, erase, and test their ideas for the garden. If the design is a success and gets approved, its changes are carefully merged back into the master blueprint, updating it for all future construction. If the garden idea is scrapped, the copy is simply thrown away, and the master blueprint remains untouched and pristine._

**Where it breaks down:** The blueprint analogy is static. In Git, the `main` branch is a living history that constantly evolves as new, approved features are merged into it. It's not just a single master copy but a timeline of all master copies.

```
main: A --- B --- C --- E --- F
         \         /
feature:  D -----
```

## Details

In version control systems like Git, the `main` branch is, by convention, the primary branch of a repository. It represents the official, stable history of the project. Think of it as the definitive version of your application, like the live DataCamp website. All new development, such as creating a new feature, is typically done in separate branches that are "branched off" from `main`. This core concept of [[Git - Branching|branching]] isolates experimental work, ensuring the `main` branch always remains functional and deployable.

#### Primary Goal

To maintain a clean, stable, and deployable version of the codebase that serves as the single source of truth for the project's history.

#### Mechanism

- **How it Works:**
    1. **Initialization:** When a new repository is created, Git automatically creates a default branch, conventionally named `main`.
    2. **Source of Truth:** This branch is designated as the primary line of development. It should only contain code that has been tested and is considered stable or "production-ready".
    3. **Branching Off:** To start new work, a developer creates a new branch (e.g., `speed-test`) from the latest state of `main`. This new branch is an exact copy of `main` at that point in time.
    4. **Isolation:** Development and testing occur on the new feature branch, completely isolated from `main`. This is one of the key [[Git - Benefits of Branching|benefits of branching]].
    5. **Merging:** Once the feature is complete and verified, it is merged back into `main`, incorporating the new changes into the official project history. This is a key part of a [[Git - Common Branching Workflow|common branching workflow]].
#### Key Parameters

- **Branch Protection Rules:**
    - On platforms like GitHub or GitLab, `main` is often protected. Rules can be set to prevent direct pushes, requiring changes to be submitted via pull requests.
    - Example:
        - *Requiring at least one code review approval before a merge is allowed.*
        - *Requiring status checks (like automated tests) to pass before merging.*
- **Default Branch Name:**
    - While `main` is the modern convention, older repositories may use `master`. The default name can be configured for new repositories.

#### Core Trade-offs

- **Pro: Stability & Reliability**
    - Having a dedicated `main` branch ensures there is always a known-good version of the code, which is critical for continuous integration and deployment (CI/CD).
- **Con: Overhead & Discipline**
    - Maintaining a clean `main` branch requires team discipline. It introduces the overhead of creating branches, opening pull requests, and conducting code reviews, which can slow down very small projects or solo developers.

## Connections

```
                  (Parent)
            Fundamental - Version Control
                       ▲
                       │
       ┌───────────────┼────────────────────────────┐
       │               │                            │
(Sibling Concept) ┌───────────────────────────┐ (Sibling Concept)
Git - Branching   │      Git - Main Branch      │ Git - Common Branching Workflow
                  └───────────────────────────┘
                         │
                         ▼
                    (Instance)
               Production Deployment
```

### Parent Concept

The concept of a main branch is a core convention within the broader practice of [[Fundamental - Version Control|version control]], providing a stable anchor for project history.

### Child Concepts



### Related Concepts 

- The `main` branch serves as the primary trunk from which all other work in [[Git - Branching|Git branching]] originates.
- Protecting the `main` branch and using feature branches is a central tenet of a [[Git - Common Branching Workflow|common branching workflow]].
- The isolation provided by working outside the `main` branch is one of the primary [[Git - Benefits of Branching|benefits of branching]], as it prevents unstable code from affecting the production version.
- Managing the `main` branch and feature branches is done using a set of commands detailed in the [[Git - Branch Management Commands Cheatsheet|branch management commands cheatsheet]].
## Questions

- A key stakeholder wants to release a critical bug fix immediately and is pressuring your team to push the fix directly to the `main` branch, bypassing the standard pull request and review process. How would you explain the business risk of this action, and what alternative, expedited process could you propose that still protects the integrity of `main`?
- Imagine you are designing a CI/CD pipeline for a large project with dozens of developers. How would you configure branch protection rules and automated checks for the `main` branch to ensure that no code is merged unless it meets quality standards (e.g., passes all tests, has no linting errors, meets code coverage), and how would this system scale as the team grows?
- What if your team adopted a 'main-less' development model where there was no single, long-lived primary branch? What kind of project or team structure might thrive in such an environment, and what new tools or conventions would be necessary to manage releases and maintain stability?