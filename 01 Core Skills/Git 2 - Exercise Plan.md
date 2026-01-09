# Exercise Plan

**Course: Intermediate Git — Branches, Merges, Remotes**

**Total Exercises:** 8  
**Goal:** Build _correct mental models_ for branching, merging, and collaboration — not command recall.

---

## Part 0 — Environment Calibration (Setup Only)

### Goal

Create a **minimal, local-only Git repository** with:

- One branch
    
- One commit
    
- Zero ambiguity about state
    

Nothing in this part is conceptual yet. This is pure grounding.

---

### Step 1 — Create a Dedicated Practice Directory

```bash
mkdir git-branches-lab
cd git-branches-lab
```

**What this does**

- Creates an isolated directory whose only purpose is this course.
    
- Ensures no accidental interaction with other repositories or files.
    

**Guarantee after this step**

- The directory contains **no Git history**.
    
- Git has no influence here yet.
    

---

### Step 2 — Initialize an Empty Git Repository

```bash
git init
```

**What actually happens**

- Git creates a hidden `.git/` directory.
    
- This directory becomes the **entire database** for commits, branches, and metadata.
    
- No files are tracked yet.
    

**Important observation**

- A repository can exist **without commits**.
    
- At this moment, Git knows _where_ history will live, but history itself does not exist.
    

---

### Step 3 — Verify Repository State

```bash
git status
```

**Expected output (conceptually)**

- You are on a default branch (`master` or `main`, depending on Git version).
    
- “Nothing to commit”
    
- “Working tree clean”
    

**What this guarantees**

- There are no tracked changes.
    
- No files are staged.
    
- Git’s index and working directory are aligned.
    

This is Git’s **zero-noise state**.

---

### Step 4 — Create a File to Anchor the First Commit

```bash
echo "Initial content" > README.md
```

**What this does**

- Creates a real file so Git has something concrete to track.
    
- Avoids abstract or empty commits, which obscure later observations.
    

---

### Step 5 — Stage the File

```bash
git add README.md
```

**What actually happens**

- Git copies the file’s current content into the **staging area**.
    
- The staging area becomes a **snapshot proposal**, not a commit.
    

**Key guarantee**

- Git now knows _exactly_ what you intend to record next.
    
- The working directory and index may now differ.
    

---

### Step 6 — Create the First Commit

```bash
git commit -m "Initial commit"
```

**What actually happens under the hood**

- Git creates a commit object containing:
    
    - A snapshot of tracked files
        
    - Metadata (author, timestamp, message)
        
    - No parent commit (this is the root)
        
- The current branch pointer moves to this commit.
    
- `HEAD` points to that branch.
    

This is the **first moment history exists**.

---

### Step 7 — Inspect the Commit Graph

```bash
git log --oneline
```

**Expected observation**

- Exactly one commit.
    
- A short hash.
    
- The message “Initial commit”.
    

**What this guarantees**

- You have a single, linear history.
    
- All branches (currently only one) point to the same commit.
    
- This commit is the **reference point** for every branching action that follows.
    

---

## Calibration Complete

At this point, we have:

- A clean repository
    
- One branch
    
- One commit
    
- No remotes
    
- No ambiguity
    

This is the **baseline state** assumed by every exercise that follows.

---

## Exercise 1 — Branches Are Pointers, Not Copies

>  [[Git 2 - Exercise 1]]

**Commands clubbed:**

- `git branch`
    
- `git branch <name>`
    

**Core insight:**  
Branches are **movable labels**, not environments.

**What you will observe:**

- Branch creation does **not** change files.
    
- Multiple branch names can point to the _same commit_.
    

**Failure angle:**  
Assuming a branch is a “workspace clone”.

---

## Exercise 2 — Switching Branches Changes History Context

>  [[Git 2 - Exercise 2]]

**Commands clubbed:**

- `git switch <name>`
    
- `git status`
    
- `git log --oneline --decorate`
    

**Core insight:**  
Switching branches moves `HEAD`, not files arbitrarily.

**What you will observe:**

- Same files, different _commit ancestry_
    
- `HEAD → branch → commit` chain
    

**Failure angle:**  
Thinking “switch” copies files instead of re-checking history.

---

## Exercise 3 — Creating + Switching Is a Workflow Decision

>  [[Git 2 - Exercise 3]]

**Commands clubbed:**

- `git switch -c <name>`
    
- `git branch`
    

**Core insight:**  
This is **not** a convenience shortcut — it encodes intent.

**What you will observe:**

- Atomic creation + movement
    
- Reduced risk of working on the wrong branch
    

**Failure angle:**  
Creating branches early vs late without intent.

---

## Exercise 4 — Comparing Branches Before Acting

>  [[Git 2 - Exercise 4]]

**Commands clubbed:**

- `git diff <branch1> <branch2>`
    
- `git log <branch1>..<branch2>`
    

**Core insight:**  
Diffing is **risk reduction**, not curiosity.

**What you will observe:**

- Directionality of comparison
    
- What will be lost or integrated
    

**Failure angle:**  
Deleting or merging without inspection.

---

## Exercise 5 — Renaming and Deleting Encode Judgment

>  [[Git 2 - Exercise 5]]

**Commands clubbed:**

- `git branch -m <old> <new>`
    
- `git branch -d <name>`
    
- `git branch -D <name>`
    

**Core insight:**  
Deletion choices reflect **value judgments about history**.

**What you will observe:**

- Safe delete refuses unmerged work
    
- Force delete overrides Git’s safety assumptions
    

**Failure angle:**  
Treating `-D` as cleanup instead of intentional discard.

---

## Exercise 6 — Merge Direction, Fast-Forward vs Merge Commit

>  [[Git 2 - Exercise 6]]

**Commands clubbed:**

- `git switch <destination>`
    
- `git merge <source>`
    
- `git log --oneline --graph --all`
    

**Core insight:**  
Merging **changes history shape**, not just content.

**What you will observe:**

- Pointer movement vs new merge commit
    
- Parent commits and graph topology
    

**Failure angle:**  
Merging from the wrong branch or ignoring merge output.

---

## Exercise 7 — Conflict as a Signal, Not an Error

>  [[Git 2 - Exercise 7]]

**Commands clubbed:**

- `git merge <branch>` (conflicting)
    
- Manual file edit
    
- `git add`
    
- `git commit`
    

**Core insight:**  
Git refuses to guess — _you must author meaning_.

**What you will observe:**

- Conflict markers as hard sentinels
    
- Resolution as a new authoritative commit
    

**Failure angle:**  
Deleting markers blindly or choosing “one side” by default.

---

## Exercise 8 (optional) — Local vs Remote: Synchronization, Not Execution

>  [[Git 2 - Exercise 8]]

**Commands clubbed:**

- `git clone`
    
- `git remote -v`
    
- `git remote add`
    
- `git fetch`
    
- `git pull`
    
- `git push`
    

**Core insight:**  
Remotes are **explicit synchronization targets**, not magic mirrors.

**What you will observe:**

- Fetch ≠ merge
    
- Pull as fetch + merge
    
- Push as permission to advance shared history
    

**Failure angle:**  
Confusing authority direction (push vs pull).

---