---
tags: 
  - core
  - git
  - git_object
  - content-addressable_storage
  - sha-1
  - file_snapshot
  - data_integrity
  - concept
source: 
  - "[[Introduction to Git]]"
related: 
  - "[[Fundamental - Version Control]]"
  - "[[Git - Data Storage Model]]"
  - "[[Git - Commit Object]]"
  - "[[Git - Tree Object]]"
  - "[[Git - Hash SHA-1]]"
  - "[[Git - git log Command]]"
  - "[[Git - Visualizing the Git Commit Structure]]"
  - "[[Git - The .git Directory]]"
  - "[[Git - Plumbing and Porcelain]]"
  - "[[Git - Git LFS (Large File Storage)]]"
  - "[[Fundamental - Hashing]]"
  - "[[Fundamental - Data Compression]]"
  - "[[Fundamental - Computer Science]]"
---
# Core: Blob Object

## Summary

>A blob (Binary Large Object) is the most fundamental data object in Git, representing the raw, compressed content of a file. It is a snapshot of a file's state at a specific point in time, completely independent of its filename, location, or permissions. This object is a core component of the [[Git - Data Storage Model|Git's content-addressable storage system]].

**Why This Matters:** Blobs are the foundation of Git's efficiency and data integrity, ensuring that the exact content of every version of every file is stored securely and without duplication.

_Analogy:_ _Imagine a massive library warehouse where every unique book text is stored only once. Instead of storing multiple copies of 'Moby Dick', the warehouse stores the text a single time and gives it a unique, permanent reference number. When a publisher wants to release a new edition with a different cover, they don't send a new copy of the text to the warehouse. Instead, they create a new catalog entry (a 'tree object') that simply points to the existing text's reference number. The blob is the actual book text in the warehouse, and its SHA-1 hash is its unique reference number._

**Where it breaks down:** The analogy's reference number is arbitrary, whereas a blob's identifier ([[Git - Hash SHA-1|SHA-1 hash]]) is mathematically derived from its content. If even a single letter in the book text changes, Git considers it a completely new blob with a brand new hash, whereas the library might just note it as a minor revision.

```
File Content:
"hello git blob"
     │
     ▼
Header + Content:
"blob 14\0hello git blob"
     │
     ▼
  SHA-1 Hash
     │
     ▼
[ f804b3a4... ]  <-- Blob Object ID
(Points to compressed "hello git blob" data)

```

## Details

A blob is the most basic data unit in Git's object database, representing only the content of a file and nothing more. It doesn't know the file's name, its location, or its permissions; this separation is key to Git's power. When you commit a change, Git takes a snapshot of your file's content, compresses it, and calculates a unique [[Git - Hash SHA-1|SHA-1 hash]] for that content. This hash becomes the blob's "name" or key in the database. If two different files in your repository have the exact same content, they will point to the exact same blob object, making Git incredibly space-efficient.

#### Primary Goal

To store file content efficiently and verifiably, completely decoupled from file metadata like name or path.

#### Mechanism

- **How it Works:** Git creates a blob through a simple, deterministic process:
    1.  **Header Creation:** Git constructs a small header string in the format `blob <content_size_in_bytes>\0`.
    2.  **Concatenation:** It concatenates this header with the raw content of the file.
    3.  **Hashing:** This combined data is then processed by the [[Git - Hash SHA-1|SHA-1]] algorithm, producing a unique 40-character hash. This hash becomes the object's identifier.
    4.  **Storage:** The original file content (without the header) is compressed using zlib and stored in the `.git/objects` directory. The object is filed using its hash as the key.
- **Key Characteristics:**
    - **Content-Addressable:** The blob's identifier (its hash) is derived directly from its content. Identical content will always produce the same blob and the same hash.
    - **Immutable:** Once a blob is written to the object database, it can never be changed. Any modification to a file results in a brand new blob with a new hash.
    - **Metadata-Agnostic:** A blob only contains file data. All metadata, such as the filename, path, and permissions, is stored in a separate [[Git - Tree Object|tree object]].

##### Code Translation


```bash
# This is a conceptual demonstration using Git's own "plumbing" commands.

# --- Step 1: Create a file with some content ---
# In your terminal:
echo 'hello git blob' > my_file.txt

# --- Step 2: Ask Git to create a blob object from the file ---
# The 'git hash-object' command calculates the hash and writes the object to the database.
# The -w flag tells Git to write the object.
git hash-object -w my_file.txt
# This will output the SHA-1 hash, for example: f804b3a408d25795818917904145549ed984498f

# --- Step 3: Inspect the type and content of the newly created object ---
# The 'git cat-file' command can be used to view Git objects.
# -t shows the object's type.
git cat-file -t f804b3a408d25795818917904145549ed984498f
# Output: blob

# -p "pretty-prints" the object's content.
git cat-file -p f804b3a408d25795818917904145549ed984498f
# Output: hello git blob
```

#### Key Parameters

- Blobs are fundamental data structures and do not have configurable parameters. Their properties are inherent and determined entirely by the content they store:
    - **Content:** The raw data of the file.
    - **Size:** The size of the content in bytes, which is part of the header used for hashing.
    - **SHA-1 Hash:** The 40-character identifier derived from the header and content.

#### Core Trade-offs

- **Pro: Data Integrity & Deduplication**
    - Since the hash is based on the content, it's impossible to change the content without changing the hash. This guarantees the integrity of the file's history. It also means identical files are stored only once, saving significant space.
- **Con: Inefficient for Large, Frequently Changing Binary Files**
    - Git's model is optimized for text files. When storing large binary files (like videos or design assets), each small change creates an entirely new, large blob. This can cause the repository size to grow very quickly, which is why solutions like Git LFS (Large File Storage) exist.

## Connections

```
                           (Parent)
                     Git Data Storage Model
                              ▲
                              │
┌─────────────────────────────┼─────────────────────────────┐
│                             │                             │
(Contains)           ┌──────────────────┐           (Identified By)
Tree Object          │    Blob Object   │           Hash SHA-1
                     └──────────────────┘
                              │
                              ▼
                         (Referenced By)
                          Commit Object
```

### Parent Concept

The blob is a fundamental component of the overall [[Git - Data Storage Model|Git data storage model]], representing the lowest level of content storage.

### Child Concepts

- Blobs are the most atomic data objects in Git and have no conceptual children; they are the building blocks themselves.

### Related Concepts 

- A [[Git - Tree Object|tree object]] acts like a directory, containing pointers to blobs and other trees, giving the raw content in blobs its filename and location.
- The [[Git - Commit Object|commit object]] captures a snapshot of the entire project by pointing to a single top-level tree object, effectively freezing a version of the project in time.
- Every blob is uniquely identified and its integrity is verified by a [[Git - Hash SHA-1|SHA-1 hash]], which is calculated from its content.
## Questions

- Your team is considering versioning large binary assets (e.g., 3D models) directly in Git. How would you explain the business trade-off between the convenience of a single versioning system and the long-term repository performance and storage costs associated with how Git handles blobs?
- Imagine you are designing a Git hosting service like GitHub. How would you design the underlying storage system to efficiently handle the deduplication of billions of blob objects across millions of repositories, ensuring both fast access and cost-effective storage?
- What if Git's blob objects were mutable, meaning you could change their content without changing their SHA-1 hash? What fundamental guarantees of Git would break, and what would be the most catastrophic consequence for a collaborative software project?