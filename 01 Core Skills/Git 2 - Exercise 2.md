# Exercise 2 — Switching Branches Changes History Context

This exercise introduces **exactly one new idea**:

> Switching branches moves `HEAD`, which changes **which history you are standing on**, even if files look identical.

---

## A. Why This Exists (Real Problem)

Git needs a way to:

- Keep multiple branch pointers
    
- Let you **work from one perspective at a time**
    
- Prevent commits from landing on the wrong branch
    

`HEAD` exists to answer one question unambiguously:

> “Where will the next commit go?”

---

## B. The Mechanism (Observe, Don’t Assume)

We will switch branches **without changing files** and observe what _actually_ moves.

### Step 1 — Switch to the New Branch

```bash
git switch feature-a
```

**What to observe**

- The command succeeds silently.
    
- No files visibly change.
    

---

### Step 2 — Check Branch State

```bash
git branch
```

**What to observe**

- The `*` has moved.
    
- The list of branch names is unchanged.
    

This star movement is not cosmetic.

---

### Step 3 — Inspect History with Decoration

```bash
git log --oneline --decorate
```

**What to observe carefully**

- `HEAD` now points to `feature-a`
    
- `master` still exists
    
- Both still reference the same commit
    

This is a **context shift**, not a history change.

---

## C. Failure Exercise (Beginner Mistake)

### The Mistake

Thinking:

> “Switching branches changed nothing, so it doesn’t matter.”

### Why This Breaks Later

- Commits go onto the **currently checked-out branch**
    
- If you misunderstand this, work lands on the wrong branch
    
- Cleanup becomes dangerous and confusing
    

The damage shows up **later**, not now.

---

## D. Expected Outputs (Self-Verification)

You should be able to verify:

- `git branch` shows `* feature-a`
    
- `master` still exists
    
- No new commits exist
    
- Files are unchanged
    
- `HEAD` → `feature-a` → commit
    

---

## E. Correct Usage Pattern (Professional Practice)

Professionals:

- Switch branches **before** starting work
    
- Confirm the active branch explicitly
    
- Treat `HEAD` position as critical state
    

Branch switching is not navigation — it is **commit routing**.

---

## Pause — Your Turn

Explain what switching branches did, focusing on:

- What moved
    
- What did not move
    
- Why this matters _even when files look the same_
    

Again:

- No commands
    
- No setup references
    
- State and meaning only
    

When you respond, I will correct if needed and then proceed to Exercise 3.

---

# After my response

This explanation is **directionally correct**, but it needs **terminological precision** and **one missing causal link** to be fully calibrated.

I will correct it, then we move on.

---

## Tightening Your Explanation (Exercise 2)

### 1. _“header moved to a new branch name”_

This is **almost correct**, but the term matters.

**Correction:**  
Not _header_ → **`HEAD`**.

More precisely:

> `HEAD` moved to point to a different branch name.

Why this precision matters:

- `HEAD` is a first-class Git concept.
    
- Confusing it with a generic “header” weakens later reasoning about commits, merges, and detached states.
    

---

### 2. _“files were not moved”_

Correct, but incomplete.

What did **not** move:

- Files
    
- Commits
    
- History
    
- Branch pointers themselves
    

Only the **active reference (`HEAD`)** moved.

This reinforces the idea that:

> Branch switching is a **context switch**, not a data operation.

---

### 3. _“making changes and commits on right branch is crucial”_

Correct, but let’s make the causality explicit.

**Why this matters even when files look the same:**

> Commits are always attached to the branch that `HEAD` points to.

So even if:

- Files are identical
    
- History is identical
    

The **next commit will diverge history** by moving only the currently checked-out branch.

That is the entire risk surface.

---

## Final Calibrated Mental Model (Lock This In)

After switching branches:

- `HEAD` moved
    
- Branch pointers did not
    
- History did not
    
- Files did not
    

But:

> The destination of future commits **changed completely**.

This is why branch switching must be intentional **before** work begins.

---

## Exercise 2 Status

Your mental model is now **precise enough to proceed**.

---

