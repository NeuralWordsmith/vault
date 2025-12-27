---
tags: 
  - core
  - git
  - git_object
  - data_structure
  - snapshot
  - directory_structure
  - sha-1
  - concept
source: 
  - "[[Introduction to Git]]"
related: 
  - "[[Git - Data Storage Model]]"
  - "[[Git - Commit Object]]"
  - "[[Git - Blob Object]]"
  - "[[Git - Hash SHA-1]]"
  - "[[Fundamental - Version Control]]"
  - "[[Git - git log Command]]"
  - "[[Git - Visualizing the Git Commit Structure]]"
  - "[[Git - Branching]]"
  - "[[Git - Merging]]"
  - "[[Git - Staging Area (Index)]]"
  - "[[Git - HEAD]]"
  - "[[Git - Packfiles]]"
  - "[[Git - Garbage Collection]]"
---
# Core: Git Tree Object

## Summary

>A Git tree object is a fundamental component of the [[Git - Data Storage Model|Git Data Storage Model]] that represents a directory snapshot. It contains a list of pointers, each referencing either a file's content (a [[Git - Blob Object|blob object]]) or another directory (another tree object), effectively capturing the entire file hierarchy for a specific [[Git - Commit Object|commit]].

**Why This Matters:** The Git tree object is the core mechanism that allows Git to efficiently store and reconstruct the exact state of a project's directory structure at any point in history, making version control possible.

_Analogy:_ _Think of a Git tree object as a single folder in a file cabinet. The folder itself doesn't contain the documents, but rather a neatly organized index card for each item inside. Each index card lists the item's name (the filename) and a unique reference number (the [[Git - Hash SHA-1|SHA-1 hash]]) that tells you exactly which document (a blob) or which other folder (another tree) to pull from the cabinet._

**Where it breaks down:** Unlike a physical folder, a Git tree is immutable. You can't change an existing tree; instead, for every new commit, Git creates a completely new tree object with the updated contents, even if only one file changes. This ensures the integrity of the project's history.

```
Tree (root) 4a23b8...
│
├── 100644 blob 8d34a...  README.md
├── 100644 blob 3c12f...  main.py
└── 040000 tree 9e7c1...  src/
                            │
                            └── 100644 blob 1f8a9...  utils.py
```

## Details

The tree object is one of the three core data structures in Git, alongside the [[Git - Blob Object|blob]] and the [[Git - Commit Object|commit]]. Its purpose is to represent the state of a directory at a specific moment. While a blob stores file *content*, the tree stores file *metadata* and structure—specifically, the filenames, permissions, and pointers to the corresponding blobs or sub-trees. This separation allows Git to be incredibly efficient, as it only needs to store a file's content (the blob) once, even if it appears in thousands of commits with the same content.

#### Primary Goal

To capture a snapshot of a directory's structure and contents by mapping filenames to their corresponding data (blobs) or subdirectories (other trees).

#### Mechanism

- **How it Works:** A tree object is essentially a list of entries. When Git creates a tree, it generates a unique [[Git - Hash SHA-1|SHA-1 hash]] based on the contents of this list. This means that if the directory structure or any file within it changes, the resulting tree object will have a different hash.
- **Tree Entry Structure:** Each line within a tree object contains four pieces of information:
    - **Mode:** A six-digit octal number representing the file type and permissions. Common modes are `100644` for a normal file (blob) and `040000` for a directory (tree).
    - **Type:** Specifies whether the entry points to a `blob` (file) or another `tree` (subdirectory).
    - **SHA-1 Hash:** The 40-character hash that uniquely identifies the blob or tree object being referenced.
    - **Filename:** The name of the file or subdirectory.

##### Code Translation

```python
# This isn't code to be executed, but a representation of what a tree object's content looks like.
# You can view this yourself by finding a tree hash in your .git folder and running:
# git cat-file -p <tree_hash>

# Example output for a root directory tree:
100644 blob 8d34a2218c863882f0443454473a0d4a2a24f21d    README.md
100644 blob 3c12f7a8121a1e0bec06796859f743a6305181a3    main.py
040000 tree 9e7c1537a36c3a219a5e8621599a437b5b5a2a8f    src
```

 [[Code - Git Tree Object Implementation|View Full Implementation & Analysis]]

#### Key Parameters



#### Core Trade-offs

- **Pro: Storage Efficiency**
    - By pointing to existing blobs via hashes, Git avoids duplicating file content. If a file hasn't changed between commits, the new tree simply points to the same old blob, saving significant space.
- **Pro: Integrity and Immutability**
    - Since a tree's hash is derived from its contents (including the hashes of the blobs and sub-trees it points to), the entire history is cryptographically secured. Any change to a file or directory in the past would change its hash, which would change the tree's hash, which would change the commit's hash, making tampering evident.
- **Con: Object Proliferation**
    - Even a small change to a single file in a deep directory structure requires creating new tree objects all the way up to the root. This can lead to a large number of small objects in the database, which Git later optimizes with packfiles.

## Connections

```
                     (Parent)
              Fundamental - Version Control
                         ▲
                         │
         ┌───────────────┼────────────────┐
         │               │                │
(Points to)     ┌──────────────────┐     (Points to)
Blob Object     │ Git Tree Object  │     Commit Object
                └──────────────────┘
                         │
                         │
                    (Identified by)
                      SHA-1 Hash
```

### Parent Concept

The tree object is a core component of the data model used by [[10 Utility Notes/Fundamental - Version Control.md|version control]] systems like Git.

### Child Concepts



### Related Concepts 

- It is a fundamental part of the [[Git - Data Storage Model|Git Data Storage Model]], working alongside blobs and commits to form a complete snapshot.
- A [[Git - Commit Object|commit object]] acts as the entry point to a snapshot by pointing to a single, top-level tree that represents the project's root directory.
- The tree object itself contains pointers to [[Git - Blob Object|blob objects]], which hold the actual, raw file content.
- The unique identifier for every tree is a [[Git - Hash SHA-1|SHA-1 hash]], which is calculated from its complete contents.
- Commands like [[Git - git log Command|git log]] traverse the chain of commits, each of which allows Git to reconstruct the project state by reading the associated tree.
## Questions

- If you have a repository with millions of tiny files, creating new tree objects for each commit can become a performance bottleneck. How would you balance the need for frequent commits with the overhead of tree object creation, and what repository structuring strategies might you propose to mitigate this?
- Imagine you're designing a system to detect unauthorized changes in a Git repository's history. How would you leverage the immutable, content-addressed nature of tree and blob objects to build a reliable audit trail, and what would be the first thing your system checks to validate the integrity of a commit?
- What if Git's tree objects could be mutable? What immediate advantages might this offer, and what catastrophic failures or security vulnerabilities would it introduce to the entire concept of version control history?