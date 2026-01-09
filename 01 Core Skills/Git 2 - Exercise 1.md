# Exercise 1 — Branches Are Pointers, Not Copies

This is the **first calibration exercise**.  
Nothing new will be introduced beyond what is necessary.

We are isolating **one idea only**:

> A Git branch is a **movable pointer to a commit**, not a copy of files and not a workspace.

---

## A. Why This Exists (Real Problem)

Git needed a way to let multiple lines of work exist **without duplicating repositories or files**.

Copying directories is:

- Slow
    
- Error-prone
    
- Hard to reconcile
    

Branches solve this by allowing **multiple names to reference the same history**, so new work can diverge _cheaply_ and _reversibly_.

If branches were copies, Git would not scale.

---

## B. The Mechanism (Observe, Don’t Assume)

We will **create a branch and observe what does _not_ change**.

### Step 1 — List Existing Branches

```bash
git branch
```

**What to observe**

- Exactly one branch is listed.
    
- It is marked with `*`.
    

**What this tells you**

- `*` marks where `HEAD` is pointing.
    
- There is only one pointer name in the repository right now.
    

---

### Step 2 — Create a New Branch

```bash
git branch feature-a
```

**Important instruction**

- Do **not** switch branches.
    
- Do **not** edit files.
    
- Just run the command.
    

---

### Step 3 — List Branches Again

```bash
git branch
```

**What to observe**

- Two branch names are listed.
    
- The `*` has **not moved**.
    
- Both branches exist simultaneously.
    

---

### Step 4 — Inspect the Commit Graph

```bash
git log --oneline --decorate
```

**What to observe carefully**

- Both branch names appear **on the same commit**.
    
- No new commits exist.
    
- No history has diverged.
    

This is the key observation.

---

## C. Failure Exercise (Beginner Mistake)

### The Mistake

Assuming that creating a branch creates:

- A new workspace
    
- A copy of files
    
- A new version of history
    

### How This Breaks Thinking

If branches were copies:

- Creating one would duplicate files
    
- Disk usage would increase
    
- Switching would require merging immediately
    

None of that happened.

Nothing changed except **metadata**.

---

## D. Expected Outputs (Self-Verification)

You should be able to verify all of the following **without trusting me**:

- `git branch` shows two names
    
- Only one branch is marked with `*`
    
- `git log --decorate` shows **both names on the same commit**
    
- No files changed
    
- No new commits were created
    

If any of these are false, stop — the setup is broken.

---

## E. Correct Usage Pattern (Professional Practice)

Professionals create branches:

- Early
    
- Cheaply
    
- Without fear
    

Because:

- A branch costs almost nothing
    
- It does not fork files
    
- It only becomes meaningful **after a commit moves it**
    

This is why disciplined workflows create branches before work, not after.

---

## Pause — Your Turn

**Explain what happened in your own words**, focusing on:

- What changed
    
- What did _not_ change
    
- What a branch actually is at this moment
    

Do not describe commands.  
Describe **state and meaning**.

When you respond, I will correct your mental model precisely before we move to Exercise 2.

---
# After my response

Your explanation contains **factual inaccuracies**, which means the mental model is not yet stable. I will be precise and corrective, not encouraging.

---

## What You Said vs What Actually Happened

### 1. _“we added a branch, added a file and committed the change”_

This is **incorrect for this exercise**.

- The file was added and committed **before** Exercise 1, during setup.
    
- In Exercise 1:
    
    - **No files were added**
        
    - **No commits were created**
        
    - **No content changed**
        

If this distinction is blurred, every later concept (merge, conflict, delete) will be misinterpreted.

**Correction:**  
In Exercise 1, **only a branch name was added**. Nothing else.

---

### 2. _“master branch”_

This answer is **incomplete and vague**.

The question was not “which branch exists,” but **what did not change**.

What did _not_ change includes:

- The working directory contents
    
- The commit history
    
- The commit that `HEAD` ultimately refers to
    

Saying “master branch” does not describe state or behavior.

---

### 3. _“a link to master branch in history”_

This is **conceptually wrong**.

A branch is **not**:

- A link _to another branch_
    
- A reference _inside history_
    

A branch is:

- A **name**
    
- That **points directly to a commit**
    

Branches do not point to branches.  
They point to commits.

---

## Correct Mental Model (Read Carefully)

Let me restate the **correct model**, using only what you have already observed.

### What changed

- Git created a **new branch name**: `feature-a`
    
- That name was stored as metadata inside `.git/`
    

### What did NOT change

- No files changed
    
- No commits were added
    
- No history diverged
    
- `HEAD` did not move
    
- The working directory stayed identical
    

### What a branch actually is _at this moment_

- A **label**
    
- Attached directly to **the same commit** as `master`
    
- Completely passive until a commit moves it
    

You currently have:

```
master ─┐
        └── (same commit)
feature-a ─┘
```

Two names.  
One commit.  
Zero divergence.

---

## Why This Correction Matters

If you think:

- branches are copies
    
- branches point to other branches
    
- branches imply commits
    

Then:

- merges will feel magical
    
- deletes will feel dangerous
    
- conflicts will feel random
    

All of those are symptoms of a broken first model.

---

## Try Again (Required)

Explain again, in **your own words**, answering **only** these three points:

1. What changed in Exercise 1
    
2. What did _not_ change
    
3. What a branch is _right now_, before any new commits
    

Do **not** mention commands.  
Do **not** mention setup steps.  
Describe **state and meaning only**.

We will not proceed to Exercise 2 until this explanation is precise.

---

Good. This is **mostly correct**, but we need to tighten the language to remove one remaining ambiguity. Precision matters here.

I will refine, then we move on.

---

## Final Calibration for Exercise 1

### 1. _“we made new branch”_

Acceptable, but incomplete.

**Precise version:**  
A new **branch name** was created in Git’s metadata.

Why this matters:  
The word _branch_ can still subconsciously imply structure or content.  
What actually appeared was **a new label**, nothing more.

---

### 2. _“no files were changed”_

Correct.

Also true (and important):

- No commits were created
    
- No history moved
    
- `HEAD` did not move
    

Files staying the same is a **symptom**; the deeper invariant is that **history did not change**.

---

### 3. _“a pointer to the commit in history”_

This is the key sentence, and it is **correct**.

Let me lock it in with full precision:

> A branch is a **named pointer to a specific commit**.

Not:

- A pointer to another branch
    
- A copy of files
    
- A container of changes
    

Just a name → commit.

---

## Exercise 1 Status

Your mental model is now **acceptable and stable**:

- Branches are cheap
    
- Branches are passive
    
- Branches only become meaningful when commits move them
    

We proceed.

---