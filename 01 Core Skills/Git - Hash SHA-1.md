---
tags: 
  - core
  - git
  - sha-1
  - checksum
  - data_integrity
  - content_addressing
  - immutable_history
  - concept
source: 
  - "[[Introduction to Git]]"
related: 
  - "[[Fundamental - Version Control]]"
  - "[[Git - Data Storage Model]]"
  - "[[Git - Commit Object]]"
  - "[[Git - Tree Object]]"
  - "[[Git - Blob Object]]"
  - "[[Git - git log Command]]"
  - "[[Git - Visualizing the Git Commit Structure]]"
  - "[[Fundamental - Computer Science]]"
  - "[[Git - Branching]]"
  - "[[Git - Merging]]"
  - "[[Git - HEAD]]"
  - "[[Git - Staging Area]]"
  - "[[Cryptography - Hash Functions]]"
---
# Core: Commit Hash

## Summary

>A commit hash is a unique 40-character SHA-1 checksum that acts as a permanent and verifiable fingerprint for a specific version of a project's state. It's generated from the contents of the commit, including the code changes (represented by a [[Git - Tree Object|tree object]]), the author's information, the commit message, and the hash of the parent commit(s). This ensures that any change, no matter how small, results in a completely different hash.

**Why This Matters:** The commit hash is the core mechanism that guarantees the integrity and efficiency of a Git repository, allowing for reliable version tracking and fast data synchronization.

_Analogy:_ _A commit hash is like a unique serial number for a specific edition of a book. The first edition has its own serial number. If the author releases a second edition with even a single word changed, it gets a brand new, completely different serial number. You can instantly tell if two books are from the exact same printing just by comparing their serial numbers, without having to read and compare every single page._

Where it breaks down:** Unlike a book's serial number which is often assigned sequentially by a publisher, a Git hash is *calculated* from the content itself. There's no central authority assigning them; the hash is an intrinsic property of the commit's data.

```
    +--------------------------------+
    |      Commit Metadata           |
    |--------------------------------|
    | tree: <tree_object_hash>       |
    | parent: <parent_commit_hash>   |
    | author: John Doe <...>         |
    | committer: John Doe <...>      |
    |                                |
    | Commit message...              |
    +--------------------------------+
                 │
                 ▼
    +--------------------------------+
    |       SHA-1 Hash Function      |
    +--------------------------------+
                 │
                 ▼
    +--------------------------------+
    |  e.g., 1a410efbd13591db07496601c |
    |  1296a50210ce2c79              |
    +--------------------------------+
```

## Details

In Git, every commit is assigned a unique identifier called a hash. This isn't just a random string; it's a 40-character SHA-1 checksum meticulously calculated from the commit's entire contents and metadata. This cryptographic approach is fundamental to Git's design, providing a robust way to ensure data integrity. Because the hash is derived from the data, it acts as a perfect fingerprint: if two commits have the same hash, they are guaranteed to be identical. This allows Git to manage and transfer project history with incredible efficiency and reliability.

#### Primary Goal

To provide a permanent, unique, and verifiable identifier for a specific snapshot of a repository's state, ensuring data integrity and enabling efficient data sharing.

#### Mechanism

- **How it Works:**
    1. When you create a commit, Git gathers all the relevant information: the hash of the [[Git - Tree Object|tree object]] (which represents the project's root directory), the hash(es) of the parent commit(s), the author and committer information (name, email, timestamp), and the commit message.
    2. Git concatenates this information into a single block of text, forming the content of the [[Git - Commit Object|commit object]].
    3. This block of text is then processed by the SHA-1 (Secure Hash Algorithm 1) hash function.
    4. The output of the SHA-1 function is the 40-character hexadecimal string that becomes the commit's unique hash or ID.
- **Deterministic Nature:**
    - The hashing process is deterministic, not random. The exact same input data will *always* produce the exact same SHA-1 hash. This is why Git can be a distributed system—two different users on different machines will independently calculate the exact same hash for the exact same commit.
- **The Avalanche Effect:**
    - A tiny change to any part of the input data (e.g., changing a single character in the commit message or a single line of code) will produce a drastically different and unpredictable hash. This property makes it computationally impossible to tamper with a commit's history without it being immediately obvious, as all subsequent commit hashes would also change.

##### Code Translation

```python
nothing to fill here
```

 [[Code - Commit Hash Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Commit Content:** The primary input is the content of the [[Git - Commit Object|commit object]] itself, which includes:
    - **Tree Hash:** The SHA-1 hash of the top-level [[Git - Tree Object|tree object]], which represents the entire state of the project's files and directories for that commit.
    - **Parent Hash(es):** The SHA-1 hash of the preceding commit(s). This is what links commits together into a chain of history.
    - **Author/Committer Info:** The name, email address, and timestamp for both the original author and the person who committed the code.
    - **Commit Message:** The descriptive text explaining the changes.

#### Core Trade-offs

- **Pro: Data Integrity:** The hash acts as a checksum. If a commit's data is corrupted (e.g., due to a disk error), its calculated hash will no longer match its ID, and Git will immediately detect the corruption.
- **Pro: Immutability:** Because a commit's hash depends on its parent's hash, you cannot change a commit in the history without changing its hash and the hashes of *all subsequent commits*. This creates a tamper-evident, immutable ledger of changes.
- **Con: Human Unfriendliness:** Hashes like `1a410efbd1...` are not memorable or easy for humans to work with. This is why Git provides friendlier references like branches (e.g., `main`) and tags (e.g., `v1.0`).
- **Con: SHA-1 Collision Risk (Theoretical):** SHA-1 is considered cryptographically weak, and it's theoretically possible (though practically infeasible for Git's use case) to create two different sets of data with the same hash (a 'collision'). The Git project is transitioning to SHA-256 to mitigate this long-term risk.

## Connections

```
                      (Parent)
                Version Control
                       ▲
                       │
    ┌──────────────────┼──────────────────┐
    │                  │                  │
(Component Of)  ┌────────────────┐  (Component Of)
Commit Object   │   Commit Hash  │  Data Storage Model
                └────────────────┘
                       │
                       ▼
                  (No Children)
```

### Parent Concept

The concept of a commit hash is a cornerstone of [[Fundamental - Version Control|version control]], providing the mechanism for uniquely identifying and verifying every saved state of a project.

### Child Concepts



### Related Concepts 

- The commit hash is the unique identifier for a [[Git - Commit Object|commit object]], which bundles together metadata with a pointer to a tree object.
- This hash is a fundamental part of Git's [[Git - Data Storage Model|data storage model]], where every piece of data is content-addressable.
- You can view a list of commit hashes and their associated messages using the [[Git - git log Command|git log command]].
- The hash of a [[Git - Tree Object|tree object]] is one of the key inputs used to calculate the final commit hash.
## Questions

- Given the theoretical risk of SHA-1 collisions, how would you explain to a non-technical manager the business risk of staying on SHA-1 versus the cost and complexity of migrating a massive, decade-old monorepo to SHA-256? At what point does the theoretical risk justify the concrete engineering effort?
- Imagine you are designing a Git hosting service like GitHub. How would you design the storage and retrieval system to efficiently look up objects by their full 40-character hash, and how would you handle partial hash lookups (e.g., the first 7 characters) at scale with millions of repositories?
- What if Git used a simple, sequential integer (1, 2, 3...) for commit IDs instead of a cryptographic hash? What fundamental properties of Git would break, and what new problems would emerge in a distributed environment?