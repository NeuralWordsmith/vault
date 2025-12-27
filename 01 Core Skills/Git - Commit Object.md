---
tags: 
  - core
  - git
  - git_object
  - snapshot
  - metadata
  - commit_hash
  - version_history
  - concept
source: 
  - "[[Introduction to Git]]"
related: 
  - "[[Git - Data Storage Model]]"
  - "[[Git - Tree Object]]"
  - "[[Git - Blob Object]]"
  - "[[Git - Hash SHA-1]]"
  - "[[Git - git log Command]]"
  - "[[Git - Visualizing the Git Commit Structure]]"
  - "[[Fundamental - Version Control]]"
  - "[[Git - Branch]]"
  - "[[Git - HEAD]]"
  - "[[Git - Index (Staging Area)]]"
  - "[[Git - Merge]]"
  - "[[Git - Rebase]]"
  - "[[Git - Revert]]"
---
# Core: Git - Commit Object

## Summary

>A commit object is one of the three core components of Git's internal data storage, alongside the [[Git - Blob Object|blob]] and [[Git - Tree Object|tree]]. It acts as a snapshot of your entire project at a specific moment in time, containing essential metadata like the author, committer, timestamp, and a log message. Crucially, it holds a pointer to the top-level [[Git - Tree Object|tree object]] that represents the project's directory structure for that snapshot, and one or more pointers to its parent commits, forming a linked historical chain.

**Why This Matters:** The commit object is the fundamental unit of project history in Git, providing an immutable, verifiable snapshot that makes reliable version control possible.

_Analogy:_ _Think of a Git commit as a single, dated entry in a ship's logbook. Each entry is a complete record of the ship's status at a specific time.

- **The Log Entry Date & Author:** This is the commit's timestamp, author, and committer metadata.
- **The Log Message:** This is the commit message, explaining what happened during that watch (e.g., "Sighted land to the west, adjusted course.").
- **A Detailed Ship Inventory:** This is the pointer to the top-level [[Git - Tree Object|tree object]]. The log entry doesn't list every single item on the ship; instead, it references a master inventory list that captures the exact state and location of every crate ([[Git - Blob Object|blob]]) in the cargo hold at that moment.
- **Reference to the Previous Entry:** This is the parent pointer. Each log entry explicitly refers to the previous one, creating an unbroken, chronological chain of events that can be traced back to the start of the voyage._

- **Where it breaks down:** Unlike a logbook entry which is just text, a Git commit's identity is a cryptographic [[Git - Hash SHA-1|hash]] of its contents (including the tree pointer and parent hash). Changing any part of the commit's metadata or the project's files would result in a completely different commit hash, ensuring the history is immutable in a way a paper logbook is not.

```
  (Parent Commit)         (This Commit)
   [ 4a2723c ] <────────── [ 9e1b4f7 ]
        │                      │
        │                      │ points to a full snapshot
        ▼                      ▼
   [ Tree A  ]            [ Tree B  ]
                            /      \
                           /        \
                          ▼          ▼
                     [ Blob X ]   [ Tree C ]
                                      │
                                      ▼
                                 [ Blob Y ]
```

## Details

The core idea of a commit object is to create a permanent, timestamped snapshot of the entire project. It doesn't store the changes or 'diffs' directly; instead, it points to a [[Git - Tree Object|tree]] that represents the complete state of all files at that point. By also pointing to its parent commit(s), it forms a directed acyclic graph (DAG), which is the fundamental structure of Git's history. This design ensures that you can check out any commit and have the exact version of the project as it existed at that time.

#### Primary Goal

To capture a complete, verifiable snapshot of the project's state at a specific point in time and link it to the project's history.

#### Mechanism

- **How it Works:**
    1. When you run `git commit`, Git takes the current state of the staging area (the index) and creates the necessary [[Git - Blob Object|blob]] and [[Git - Tree Object|tree]] objects to represent it.
    2. It then creates a new commit object, which contains the following key pieces of information.
- **Top-level Tree Pointer:**
    - This is the [[Git - Hash SHA-1|SHA-1 hash]] of the single [[Git - Tree Object|tree object]] that represents the root directory of your project at the time of the commit.
- **Parent Pointer(s):**
    - The SHA-1 hash of the preceding commit(s).
        - *Example:* A normal commit has one parent. A merge commit has two or more parents. The very first commit in a repository has no parents.
- **Metadata:**
    - - **Author:** The person who originally wrote the code, along with a timestamp.
    - - **Committer:** The person who last applied the work, along with a timestamp. (Often the same as the author).
    - - **Commit Message:** A block of text explaining the changes made in this snapshot.
- **The Commit Hash:**
    - Finally, Git takes all of this content (tree pointer, parent pointer(s), and metadata), runs it through the SHA-1 algorithm, and produces a unique 40-character hash. This hash becomes the commit's permanent ID.

##### Code Translation

```python
/*
You can inspect the contents of a commit object using the `git cat-file -p` command followed by a commit hash. The output reveals its internal structure.
*/

// Command to view a commit object (replace <commit-hash> with a real hash from your repo)
> git cat-file -p <commit-hash>

// --- Example Output ---
tree 2d19138888a7939c2b7ebb73727228b55e41e4a8
parent 4a2723c3e014de2f1dd7da3599879548515ab329
author Your Name <you@example.com> 1678886400 -0700
committer Your Name <you@example.com> 1678886400 -0700

Add feature X and fix bug Y

- Implemented the core logic for the new feature.
- Patched a critical issue in the login module.
```

 [[Code - Git - Commit Object Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Staging Area (Index):**
    - The content of the commit is determined entirely by what is in the staging area when `git commit` is run. This is the primary input.
- **Commit Message (`-m` flag):**
    - The log message that describes the commit's purpose. It is essential for understanding the project's history and is a key input parameter.
- **Parent Reference (HEAD):**
    - Git automatically uses the commit that the current branch's HEAD is pointing to as the parent for the new commit, linking it into the history.

#### Core Trade-offs

- **Immutability vs. Flexibility:**
    - The cryptographic hashing of commits makes the history stable and trustworthy (a major advantage). However, this makes correcting mistakes in past commits (e.g., committing a secret key) intentionally difficult, requiring advanced commands like `git rebase` which rewrite history and can be dangerous in shared repositories.
- **Snapshot vs. Deltas:**
    - Storing snapshots makes checking out any version of the project extremely fast, as Git doesn't need to rebuild the state by applying patches. The tradeoff is potential storage inefficiency, though Git mitigates this heavily with packing and delta compression for objects that are similar.

## Connections

```
                      (Parent)
              Git - Data Storage Model
                         ▲
                         │
         ┌───────────────┼────────────────┐
         │               │                │
(Component)     ┌──────────────────┐     (Component)
Tree Object     │  Commit Object   │     Blob Object
                └──────────────────┘
                         │
                         │
              ┌──────────┴───────────┐
              │                      │
        (Used By)              (Visualized By)
      git log Command      Visualizing the Git
                           Commit Structure
```

### Parent Concept

The commit object is a fundamental component of the [[Git - Data Storage Model|Git Data Storage Model]], which defines how Git stores and manages version history internally.

### Child Concepts



### Related Concepts 

- A commit object points to a top-level [[Git - Tree Object|Tree Object]], which represents the complete file and directory structure of the project for that snapshot.
- The actual file content is stored in [[Git - Blob Object|Blob Objects]], which are referenced by the tree objects.
- The unique identity of every commit is its [[Git - Hash SHA-1|SHA-1 hash]], which guarantees the integrity of the project history.
- The linear or branching history of commits can be inspected using the [[Git - git log Command|git log command]].
- The interconnected nature of commits, parents, and trees is best understood by [[Git - Visualizing the Git Commit Structure|visualizing the Git commit structure]] as a graph.
## Questions

- Imagine you've discovered that a developer accidentally committed a sensitive API key five commits ago, and it's already been pushed to the shared repository. What are the trade-offs between using `git revert` versus performing a history rewrite, and how would you explain the business risk and chosen solution to a project manager?
- In a monorepo with thousands of developers and tens of thousands of commits per day, how would the sheer volume of commit objects impact Git's performance for operations like `git clone` or `git log`? What strategies (like shallow clones or sparse checkouts) would you employ to mitigate these issues?
- What if Git's commit objects were mutable, allowing you to directly edit the message or content of any past commit without changing its hash? What fundamental guarantees of version control would break, and what new, potentially dangerous, workflows might emerge?