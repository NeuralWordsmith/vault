---
tags: 
  - core
  - git
  - rejected_push
  - divergent_history
  - collaboration
  - synchronization
  - concept
source: 
  - "[[Intermediate Git]]"
related: 
  - "[[Fundamental - Version Control]]"
  - "[[Git - Git Push]]"
  - "[[Git - Git Pull]]"
  - "[[Git - Git Push vs Git Pull]]"
  - "[[Git - Push/Pull Workflow]]"
  - "[[Git - Recursive Merge on Pull]]"
  - "[[Git - Pushing a New Local Branch to Remote]]"
  - "[[Git - Merge Conflicts]]"
  - "[[Git - Git Fetch]]"
  - "[[Git - Git Merge]]"
  - "[[Git - Git Rebase]]"
  - "[[Git - Branching]]"
  - "[[Git - Remote Repositories]]"
---
# Core: Rejected Push (Behind Remote)

## Summary

>A rejected push occurs when Git blocks an attempt to upload local changes because the remote repository has new commits that the local repository doesn't have yet. This is a fundamental safeguard in collaborative workflows, forcing developers to integrate remote changes via a [[Git - Git Pull|`git pull`]] before sharing their own, preventing history divergence.

**Why This Matters:** This Git safety mechanism prevents you from accidentally overwriting your team's work, ensuring a consistent and shared project history.

_Analogy:_ _Imagine you and a colleague are editing the same chapter in a shared Google Doc. You download a copy of the chapter to work on offline. While you're writing, your colleague adds a new paragraph and saves their changes to the master document online. When you come back online and try to upload your version, the system stops you, saying, "Wait, the online version has changed since you downloaded it! You need to see the new paragraph first before adding your changes."_

Your offline copy = Your local Git repository.
The master Google Doc online = The remote Git repository.
Your colleague's new paragraph = Commits pushed by others to the remote.
Your attempt to upload = Your `git push` command.
The system stopping you = Git rejecting the push.
Seeing the new paragraph first = Performing a `git pull` to get the latest changes.
**Where it breaks down:** Unlike a Google Doc which might show changes in real-time, Git requires an explicit action (`git pull`) to see others' work. Also, resolving conflicts in Git is a manual process of merging code, which is more complex than resolving conflicting sentences in a document.

```
# Before your push attempt:

Remote (origin/main):  A -- B -- C -- D  <-- Teammate's commit
                             ^
                             |
Local (main):          A -- B -- C -- E  <-- Your commit

# Git sees that 'D' is on the remote but not in your local history's ancestry.
# It rejects the push to prevent 'D' from being lost.
```

## Details

When you try to push your local changes to a remote repository, Git first compares the history of your local branch with its remote counterpart. If it discovers that the remote branch has commits that you don't have locally, it rejects the push. This is a very common scenario in team environments where multiple people are contributing to the same branch. Git's error message is explicit: the "tip of your current branch is behind its remote counterpart," indicating your local version is out of date. This mechanism is a core part of version control, designed to force synchronization and prevent a chaotic, divergent history.

#### Primary Goal

To protect the integrity of the shared remote repository by preventing developers from unknowingly overwriting commits made by their colleagues.

#### Mechanism

- **How it Happens:**
    1. **Divergence:** You clone or pull a repository, making your local `main` branch identical to the remote `origin/main`.
    2. **Remote Progress:** While you are working, a teammate finishes their work and successfully performs a [[Git - Git Push|`git push`]], adding new commits to `origin/main`.
    3. **Local Progress:** You finish your work and make one or more commits to your local `main` branch.
    4. **Push Attempt:** You run `git push origin main`.
    5. **Rejection:** Git on the remote server sees that its `main` branch contains commits that are not in the history of the `main` branch you are trying to push. Your history has diverged. To prevent overwriting the teammate's work, Git rejects your push with an error.

##### Code Translation

```bash
# --- Step 1: You attempt to push your local changes ---
$ git push origin main

# --- Step 2: Git rejects the push with an error message ---
To github.com:user/repo.git
 ! [rejected]        main -> main (fetch first)
error: failed to push some refs to 'github.com:user/repo.git'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

#### Key Parameters

- **Collaborative Environment:**
    - This error almost exclusively occurs when more than one person (or process) is pushing to the same branch.
- **Divergent Histories:**
    - The core condition is that the remote branch's commit history and the local branch's commit history have diverged. They share a common ancestor, but both have unique commits.

#### Core Trade-offs

- **Safety vs. Immediacy:**
    - The rejection is a safety feature. It forces you to pause and integrate changes, preventing accidental data loss. The 'cost' is the extra step of pulling and resolving potential merge conflicts.
- **The 'Force Push' Override:**
    - Git provides an escape hatch: `git push --force`. This command tells the remote to discard its history and accept your local history, no matter what. It is extremely dangerous in shared branches as it permanently deletes other people's commits from the branch history.
    - It should only be used with extreme caution and team agreement, typically when intentionally rewriting the history of a private feature branch.

## Connections

```
                  (Parent)
           Fundamental - Version Control
                       ▲
                       │
       ┌───────────────┼────────────────────────────┐
       │               │                            │
(Resolves With)   ┌───────────────────────────┐   (Caused By)
   Git Pull       │ Rejected Push (Behind)    │     Git Push
                  └───────────────────────────┘
                       │
                       │
             (Central to Workflow)
              Push/Pull Workflow
```

### Parent Concept

This concept is a fundamental safety mechanism within the broader practice of [[Fundamental - Version Control|version control]], specifically in distributed systems like Git.

### Related Concepts 

- The direct solution to a rejected push is to use [[Git - Git Pull|Git Pull]], which fetches the remote changes and merges them into your local branch.
- This error state is triggered by an unsuccessful [[Git - Git Push|Git Push]] command when histories have diverged.
- Understanding the difference between [[Git - Git Push vs Git Pull|pushing and pulling]] is essential for navigating this common collaborative scenario.
- This entire sequence is a core part of the standard [[Git - Push/Pull Workflow|Git Push/Pull Workflow]] for team-based development.
## Questions

- Under what specific, high-stakes scenario might you justify a `git push --force` on a shared branch like `develop`? How would you communicate this action to a 20-person team to minimize disruption and what recovery plan would you have in place if it goes wrong?
- How would you configure repository rules on a platform like GitHub or GitLab to prevent this 'rejected push' scenario from ever happening on the `main` branch, while still allowing teams to collaborate effectively on feature branches? What are the system-level implications of such a policy?
- What if Git's default behavior was to automatically try and merge remote changes whenever a push was rejected? What new classes of problems or benefits might arise from this 'auto-resolving' push mechanism?