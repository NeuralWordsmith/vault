Good — this error is **expected**, and it exposes an important rule we have not yet made explicit. This is not a mistake; it is a **necessary calibration point** in Exercise 5.

I will explain what happened, why Git blocked you, and how to proceed **without changing the conceptual goal of the exercise**.

---

## What Happened (Observed Behavior)

You ran:

```bash
git branch -D feature-b
```

Git responded:

> `Cannot delete branch 'feature-b' checked out at '...'`

This is **not** about safe vs force delete yet.  
This is a **stronger invariant**.

---

## The Rule You Just Discovered

> **Git will never allow you to delete the branch that `HEAD` is currently pointing to.**

This rule overrides **both**:

- safe delete (`-d`)
    
- force delete (`-D`)
    

Why?

Because deleting the currently checked-out branch would leave `HEAD` pointing to **nothing**, which would violate Git’s internal guarantees.

This is a **structural safety rule**, not a value judgment.

---

## Why This Is Separate from Safe vs Force Delete

There are **two different safety layers** at play:

### 1. Structural safety (non-negotiable)

- You cannot delete the current branch
    
- You cannot leave `HEAD` dangling
    
- Git enforces this unconditionally
    

### 2. Intent safety (overrideable)

- Unmerged work is protected by `-d`
    
- You may override this with `-D`
    

You just hit **layer 1**, which cannot be bypassed.

This distinction matters later when reasoning about resets, detached HEAD, and history rewriting.

---

## Correcting the Procedure (Continue the Exercise)

To proceed with **Exercise 5 as intended**, do this:

### Step 1 — Switch Away from `feature-b`

```bash
git switch master
```

**What this does**

- Moves `HEAD` to `master`
    
- Leaves `feature-b` as an inactive pointer
    

---

### Step 2 — Force Delete `feature-b`

```bash
git branch -D feature-b
```

Now observe:

- Git deletes the branch
    
- Git explicitly tells you it is overriding safety
    
- The commit still exists (temporarily, until garbage collection)
    

This completes the **intended observation** of force delete.

---

## Conceptual Lock-In (Very Important)

You now know three distinct things:

1. **A branch cannot be deleted if it is checked out**  
    → structural invariant
    
2. **Safe delete protects unmerged work by default**  
    → value assumption
    
3. **Force delete overrides that value assumption, not structural rules**  
    → explicit discard of intent
    

This aligns exactly with the branch lifecycle and deletion semantics described in [[Git - Deleting Branches.md]].

---