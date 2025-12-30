---
tags: 
  - core
  - git
  - bare_repository
  - offline_collaboration
  - data_privacy
  - git_server
  - lan
  - concept
source: 
  - "[[Intermediate Git]]"
related: 
  - "[[Fundamental - Version Control]]"
  - "[[Git - Remote Repositories]]"
  - "[[Git - Local Repositories]]"
  - "[[Git - Local vs Remote Repositories]]"
  - "[[Git - Online Repository Hosting Services]]"
  - "[[Git - git clone Command]]"
  - "[[Git - git remote Command]]"
  - "[[Git - git remote add Command]]"
  - "[[Git - The origin Remote]]"
  - "[[Git - git init Command]]"
  - "[[Git - git push Command]]"
  - "[[Git - git pull Command]]"
  - "[[Cloud - Data Sovereignty & Cloud Computing]]"
  - "[[Fundamental - Software Engineering]]"
---
# Core: Local Remotes

## Summary

>A local remote is a Git repository that resides on the same local computer or a shared network drive, acting as a central point for collaboration without needing an internet connection. It functions identically to a standard [[Git - Remote Repositories|remote repository]] but is used in environments with strict data privacy rules where cloud storage is prohibited.

**Why This Matters:** This concept enables Git-based collaboration in secure, air-gapped environments where cloud access is forbidden, ensuring version control benefits without compromising data privacy.

_Analogy:_ _Imagine a team of architects working in a secure, windowless room. Each architect has their own personal notebook to sketch ideas (their local repository). Instead of uploading photos of their sketches to a public cloud server, they all walk over to a large, shared blueprint table in the center of the room to update a master blueprint (the local remote). They can copy the latest designs from the master blueprint to their notebook (pull) and add their own refined sketches to it for others to see (push)._

  
- **Your Personal Notebook:** Your personal [[Git - Local Repositories|local repository]] where you do your work.
- **The Shared Blueprint Table:** The central local remote repository (often a 'bare' repo) on a shared network drive.
- **Walking to the Table:** The act of `pushing` and `pulling` changes over the Local Area Network (LAN).
- **Where it breaks down:** The blueprint table is a single physical object. A local remote doesn't inherently come with the advanced features of a cloud service, like automated backups, issue tracking, or a web interface for code reviews, which must be managed separately.

```
+--------------------------+
| Shared Network Drive     |
|                          |
|  [central-repo.git]      |
|      (Bare Repo)         |
|                          |
+-----------▲--------------+
            │
   (push/pull over LAN)
            │
┌───────────┴────────────┐
│                        │
▼                        ▼
+----------------+     +----------------+
| User A's PC    |     | User B's PC    |
|                |     |                |
| [my-project]   |     | [another-project]|
| (Working Copy) |     | (Working Copy) |
+----------------+     +----------------+
```

## Details

A local remote is a Git repository, often a "bare" repository, that resides on a local machine or a shared network drive. It functions just like a remote hosted on an [[Git - Online Repository Hosting Services|online hosting service]] like GitHub or GitLab but without needing an internet connection. This approach is a cornerstone of version control for teams operating under strict security constraints, such as in finance, government, or healthcare, where data cannot leave the local network. It allows developers to use the standard Git workflow (push, pull, fetch) to collaborate, bridging the gap between a solitary [[Git - Local Repositories|local repository]] and a full-fledged cloud service.

#### Primary Goal

To provide a centralized point for collaboration and version history synchronization for a team without relying on an internet connection or third-party cloud services.

#### Mechanism

- **Step 1: Create a 'Bare' Central Repository**
    - A special 'bare' repository is created on a shared network drive or a server folder. This repo acts as the central server. It contains only the Git versioning data and has no working directory of its own, which prevents direct edits and conflicts.
- **Step 2: Clone the Bare Repository (User A)**
    - The first team member uses the [[Git - git clone Command|git clone command]] with the file path to the bare repository. This creates a normal working copy on their local machine, with the bare repository automatically configured as the [[Git - The origin Remote|'origin' remote]].
- **Step 3: Make Changes and Push (User A)**
    - User A works as usual: adding files, committing changes, and then running `git push` to send their commits from their local machine to the central bare repository over the network.
- **Step 4: Collaborate (User B)**
    - A second team member clones the same bare repository. They automatically receive User A's work. They can then make their own changes, commit them, and push them back to the central repository for User A and others to pull.

##### Code Translation

```python
```bash
# --- Step 1: Create a "Bare" Central Repository ---
# This is typically done on a shared network drive accessible by the team.
mkdir /path/to/shared/central-repo.git
cd /path/to/shared/central-repo.git
git init --bare

# --- Step 2: Clone the Bare Repository (User A) ---
# User A creates their local working copy from the shared location.
cd /path/to/user-a/projects
git clone /path/to/shared/central-repo.git my-project
cd my-project

# --- Step 3: Make Changes and Push (User A) ---
echo "Initial content" > file.txt
git add file.txt
git commit -m "Initial commit"
# 'origin' automatically points to /path/to/shared/central-repo.git
git push origin main

# --- Step 4: Clone and Collaborate (User B) ---
# User B creates their own local working copy.
cd /path/to/user-b/projects
git clone /path/to/shared/central-repo.git another-project
cd another-project
# User B now has file.txt. They can add their own changes.
echo "User B's contribution" >> file.txt
git commit -am "Add User B's changes"
git push origin main
```
```

 [[Code - Local Remotes Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`--bare` flag**
    - Used with `git init`, this is the most critical parameter. It creates a repository without a working directory (the actual project files), making it a pure, non-editable history store suitable for a central hub.
- **Repository Path**
    - The path to the local remote can be a simple file system path (e.g., `/path/to/repo.git`) or use a protocol like SSH for more secure network access (e.g., `ssh://user@server/path/to/repo.git`).

#### Core Trade-offs

- **Pro: Security & Privacy**
    - The primary advantage. All source code and version history remain entirely within the local network, satisfying strict data sovereignty and privacy requirements.
- **Pro: Speed**
    - Pushing and pulling changes can be significantly faster as data travels over a high-speed Local Area Network (LAN) instead of the public internet.
- **Con: No Web UI or Tooling**
    - Lacks the rich features of [[Git - Online Repository Hosting Services|online services]] like graphical pull requests, issue tracking, CI/CD integration, and user management interfaces.
- **Con: Accessibility & Backup**
    - The repository is only accessible from within the local network. It also creates a single point of failure; if the server or drive hosting the bare repo fails, the central history could be lost without a robust, manually configured backup strategy.

## Connections

```
                      (Parent)
                Remote Repositories
                         ▲
                         │
         ┌───────────────┼────────────────┐
         │               │                │
(Contrasts With) ┌───────────────┐ (Relies On)
Online Hosting   │ Local Remotes │ git remote add
                 └───────────────┘
```

### Parent Concept

This concept is a specific implementation of [[Git - Remote Repositories|remote repositories]], which are central to collaborative workflows in version control.

### Child Concepts



### Related Concepts 

- It directly **contrasts with** [[Git - Online Repository Hosting Services|online repository hosting services]], which provide cloud-based storage and extensive collaboration tools.
- The workflow relies on the [[Git - git remote add Command|git remote add command]] to manually configure the path to the local remote if it wasn't set up during the initial clone.
- Understanding the difference between a working copy and a bare repository is key, which relates to the fundamental nature of a [[Git - Local Repositories|local repository]].
- This setup provides many of the same [[Git - Benefits of Remote Repositories|benefits of remote repositories]], such as collaboration and a single source of truth, but in an offline context.
## Questions

- Your team is developing proprietary financial modeling software and is forbidden from using any cloud services. How would you justify the increased operational overhead (manual backups, access management) of using local remotes to a project manager who is concerned about development velocity compared to a team using GitHub?
- Imagine you've set up a local remote on a network share for a team of 50 developers. What specific performance bottlenecks would you anticipate as the repository size and commit frequency grow, and what strategies (e.g., file system choice, network configuration, Git GC scheduling) would you implement to mitigate them?
- What if the concept of a 'central' repository, even a local one, was completely banned for a project due to a radical peer-to-peer security mandate? How could you still achieve a collaborative Git workflow where every developer's repository is equal and there is no single source of truth?