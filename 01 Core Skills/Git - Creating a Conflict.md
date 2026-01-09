Stop here. This outcome is **correct**, but it reveals an **important misunderstanding about what actually causes conflicts**. We must recalibrate before proceeding further.

You did **not** create a conflict. Git behaved correctly.

I will explain **why**, tie it back to the course material, and then we will deliberately fix the setup to _force_ a real conflict.

---

## What Actually Happened (Observed Reality)

You expected:

- A merge conflict  
    You got:
    
- A **fast-forward merge**
    

This is not accidental. It is the direct consequence of **how the file was modified**.

Let’s break it down precisely.

---

## Why There Was NO Conflict

### Key rule (non-negotiable):

> **Merge conflicts occur only when two branches modify the same logical region of the same file in incompatible ways.**

Now look at your edits:

### On `master`

```text
+ Master Line
```

You **appended a new line** at the end of the file.

### On `conflict-branch`

```bash
sed -i '$s/.*/Conflicting line/' README.md
```

This:

- Replaced the **last line**
    
- But at that moment, the last line already included `Master Line` because:
    
    - `conflict-branch` was created **after** the master commit
        

So the history was:

```
Initial commit
↓
Add line on master
↓
Conflicting change
```

There was **no divergence**.

That is why Git said:

```
Fast-forward
```

No parallel intent.  
No ambiguity.  
No conflict to resolve.

---

## Critical Correction to Your Mental Model

### ❌ Incorrect assumption

> “Different edits = conflict”

### ✅ Correct model

> Conflicts require **parallel, incompatible changes made independently**.

More formally:

A conflict requires **all three**:

1. Same file
    
2. Same logical region
    
3. Changes made on **diverged histories**
    

You only satisfied (1).

---

## Why Git Was Able to Fast-Forward

Because from Git’s perspective:

- `conflict-branch` was strictly **ahead** of `master`
    
- `master` had no unique commits
    
- There was nothing to reconcile
    

So Git did the only correct thing:

- Moved `master` forward
    
- Preserved all commits
    
- Avoided inventing a merge commit
    

This aligns exactly with **Chapter 3: Merging branches** in your notes .

---

## This Is a Good Failure

This failure is **diagnostic**, not a mistake.

It proves:

- You now understand fast-forward behavior
    
- But you have not yet internalized **what conflict actually means**
    

That is expected at this stage.

---

## We Now Fix the Setup (Deliberately)

We will now **force real divergence**.

### Do NOT improvise. Follow exactly.

### Step 1 — Reset to a clean point

```bash
git reset --hard HEAD~2
```

This rewinds:

- The fast-forward
    
- Both feature commits
    

You are now back to a single commit state.

---

### Step 2 — Create true divergence

```bash
git switch -c branch-a
echo "Line from branch A" >> README.md
git add README.md
git commit -m "Branch A change"
```

```bash
git switch master
git switch -c branch-b
echo "Line from branch B" >> README.md
git add README.md
git commit -m "Branch B change"
```

Now:

- Two branches
    
- Same file
    
- Same location
    
- Independent commits
    

---

### Step 3 — Merge and observe

```bash
git switch branch-a
git merge branch-b
```

This **will** produce a conflict.

---