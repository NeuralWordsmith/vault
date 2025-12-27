---
tags: 
  - major_core
  - git
  - git_objects
  - content-addressable
  - snapshot
  - directed_acyclic_graph
  - vcs
  - concept
source: 
  - "[[Introduction to Git]]"
related: 
  - "[[Fundamental - Version Control]]"
  - "[[Git - Commit Object]]"
  - "[[Git - Tree Object]]"
  - "[[Git - Blob Object]]"
  - "[[Git - Hash SHA-1]]"
  - "[[Git - git log Command]]"
  - "[[Git - Visualizing the Git Commit Structure]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Git - Branching]]"
  - "[[Git - Merging]]"
  - "[[Git - Staging Area]]"
  - "[[Git - .git Directory]]"
  - "[[Git - Garbage Collection]]"
---
# Major Core: Git - Data Storage Model

## Summary

> Instead of storing the differences between files (deltas), Git stores data as a series of snapshots of the entire project. This is achieved through a system of three core, interconnected objects: the [[Git - Commit Object|commit]], which points to a [[Git - Tree Object|tree]] representing the project's directory structure, which in turn points to [[Git - Blob Object|blobs]] containing the actual file content.

**Why This Matters:** This snapshot-based, content-addressable model is the core reason for Git's speed, data integrity, and powerful branching capabilities, setting it apart from other version control systems.

_Analogy:_ _Think of Git's data model like a series of dated, notarized blueprints for a building. Each blueprint set is a complete snapshot of the entire building on a specific date, not just a list of changes from the previous day._

  - **Blueprint Set:** A single [[Git - Commit Object|commit]], representing one version of the project.
  - **Notary's Stamp & Date:** The commit metadata (author, date, message) and its unique [[Git - Hash SHA-1|hash]].
  - **Master Index Page:** The [[Git - Tree Object|tree object]], listing all the individual floor plans and where to find them.
  - **Individual Floor Plans:** The [[Git - Blob Object|blob objects]], containing the actual design for each room or floor.
  - **Where it breaks down:** Unlike physical blueprints which are entirely separate, Git is highly efficient. If a floor plan (a file) hasn't changed between versions, Git doesn't create a new copy; it simply reuses the existing blob, saving immense space.

```
Commit (Snapshot 2)
   │
   ├─ parent: (points to Commit 1)
   └─ tree: (SHA of root tree) ─────► Tree (root)
                                        │
                                        ├─ blob README.md
                                        └─ tree src/ ───► Tree (src)
                                                           │
                                                           └─ blob main.py
```

## Details

To understand how Git tracks version history, we must look at its underlying data storage. Instead of storing the differences between files (deltas), Git's model is fundamentally a content-addressable filesystem. It takes a snapshot of your entire project at a given moment. This snapshot is built from three fundamental building blocks, often called Git objects: the **commit**, the **tree**, and the **blob**.

#### Primary Goal

To ensure data integrity, speed, and support for complex, non-linear workflows like branching and merging by treating project history as a series of complete snapshots rather than a list of file changes.

#### Mechanism

- **How it Works:**
    1. When you commit, Git takes a snapshot of your entire staging area.
    2. For each file, it calculates a unique [[Git - Hash SHA-1|SHA-1 hash]] of its content and stores that content in a **blob** object. If a file's content hasn't changed, Git reuses the existing blob.
    3. It then creates **tree** objects to represent the directory structure, listing which blobs (files) and other trees (subdirectories) are present.
    4. Finally, it creates a **commit** object that contains metadata (author, message) and a pointer to the root tree for that snapshot, effectively capturing the project's state and linking it to the previous commit.
- **The Blob (Binary Large Object):**
    - This is the most basic unit, storing only the raw content of a file.
    - It has no metadata, not even the filename; it is purely content-addressable.
    - *Example:* The text `"hello world"` would be stored in a blob, and its name would be its SHA-1 hash, like `3b18e512dba79e45ba52f5225243a07c3744841b`.
- **The Tree:**
    - Represents a directory. It's essentially a list of pointers to blobs and other trees.
    - Each pointer includes the mode (e.g., executable), type (blob or tree), SHA-1 hash, and filename.
    - *Example:* A tree for a root directory might point to a blob for `README.md` and another tree for the `src/` subdirectory.
- **The Commit:**
    - Represents a single point in history, tying everything together.
    - It contains a pointer to the root tree object for that snapshot, plus metadata like the parent commit(s), author, committer, and the commit message.
    - *Example:* A commit object links to the `tree` that defines the project structure for that version and points back to its `parent` commit, forming the historical chain you see with the [[Git - git log Command|git log command]].

#### Key Parameters

- **Content-Addressing:**
    - The core 'parameter' is the content itself. The [[Git - Hash SHA-1|SHA-1 hash]] is derived directly from the content of blobs and trees, meaning identical content always results in the identical object and hash. This is fundamental to Git's efficiency and integrity.
- **Pointers (SHA-1 Hashes):**
    - The entire system is built on pointers. A commit points to a tree, and a tree points to blobs and other trees. This pointer-based system forms a Directed Acyclic Graph (DAG), which is what allows for powerful branching and merging.

#### Core Trade-offs

- **Pro: Speed & Integrity**
    - Taking snapshots and using hashes makes operations like switching branches incredibly fast, as Git just checks out the corresponding root tree. Data integrity is high because hashing the content means any corruption is easily detectable.
- **Pro: Powerful Branching**
    - The snapshot model makes branching trivial. A new branch is just a new pointer to a commit. This is much simpler than in delta-based systems where changesets must be carefully applied.
- **Con: Potential for Large Repositories**
    - Storing snapshots can theoretically lead to larger repository sizes than delta-based systems, especially for projects with large binary files that change frequently. However, Git mitigates this with `git gc` (garbage collection) which packs objects efficiently using deltas for storage *after the fact*.

## Connections

```
                      (Parent)
                Version Control
                       ▲
                       │
    ┌──────────────────┼─────────────────────┐
    │                  │                     │
(Mechanism)   ┌───────────────────────────┐   (Visualization)
SHA-1 Hash    │  Git Data Storage Model   │   Visualizing Commits
              └───────────────────────────┘
                         │
              ┌──────────┴──────────┐
              │                     │
          Tree Object          Blob Object
              │
         Commit Object
```

### Parent Concept

This model is a specific implementation of the broader concept of [[10 Utility Notes/Fundamental - Version Control.md|Fundamental - Version Control]].

### Child Concepts

- The core component is the [[Git - Commit Object|commit object]], which acts as a snapshot of the project at a specific point in time.
- Each commit points to a [[Git - Tree Object|tree object]], which represents the directory structure of the project.
- Trees, in turn, point to [[Git - Blob Object|blob objects]], which store the raw content of the files themselves.

### Related Concepts 

- The entire model relies on the [[Git - Hash SHA-1|SHA-1 hash]] to uniquely identify and ensure the integrity of every object.
- This underlying object structure is what you are actually navigating when you use the [[Git - git log Command|git log command]] to view project history.
- Understanding this model is key to [[Git - Visualizing the Git Commit Structure|visualizing the Git commit structure]] as a graph of interconnected snapshots.
## Questions

- Git's snapshot model is excellent for source code but can be inefficient for large, frequently changing binary files (e.g., game assets, videos). How would you justify to a project manager the decision to use Git LFS (Large File Storage) versus an alternative version control system like Perforce, considering the trade-offs in cost, workflow complexity, and developer experience?
- Imagine you're designing a backup and recovery system for a company's central Git server. How does the content-addressable nature of Git's object model (blobs, trees, commits) simplify or complicate the process of creating incremental, space-efficient backups and ensuring data integrity during restoration?
- What if the SHA-1 hashing algorithm were proven to be insecure for collision resistance, and you had to migrate a massive, mission-critical monorepo to a new hashing algorithm (like SHA-256) with zero downtime? What would be the biggest technical and logistical challenges?
