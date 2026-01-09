# Exercise 3 — Creating and Switching Is an Intentional Workflow Decision

This exercise introduces **one new idea only**:

> `git switch -c` encodes _intent_, not convenience.

We are not learning a shortcut.  
We are learning **why professionals use it**.

---

## A. Why This Exists (Real Problem)

The most common real-world Git mistake is:

> “I did the work on the wrong branch.”

Git needed a way to:

- Create a branch
    
- Move `HEAD` to it
    
- Do both **atomically**
    

So intent and execution cannot drift apart.

---

## B. The Mechanism (Observe, Don’t Assume)

### Step 1 — Return to `master`

```bash
git switch master
```

Observe:

- `HEAD` moves back
    
- Files remain unchanged
    

---

### Step 2 — Create _and_ Switch in One Action

```bash
git switch -c feature-b
```

Do not treat this as shorthand.

---

### Step 3 — Inspect Branch State

```bash
git branch
```

Observe:

- `feature-b` exists
    
- `HEAD` points to it
    
- `feature-a` still exists
    
- No commits changed
    

---

### Step 4 — Inspect History

```bash
git log --oneline --decorate
```

Observe:

- All branches still point to the same commit
    
- Only `HEAD` moved
    

---

## C. Failure Exercise (Beginner Mistake)

Mistake:

- Creating a branch
    
- Forgetting to switch
    
- Committing anyway
    

Result:

- Work lands on the wrong branch
    
- Cleanup requires history surgery or resets
    

This mistake is so common that `-c` exists **specifically to prevent it**.

---

## D. Expected Outputs

You should verify:

- Three branch names exist
    
- One commit exists
    
- Files unchanged
    
- `HEAD` → `feature-b`
    

---

## E. Correct Usage Pattern

Professionals:

- Create branches _at the moment of intent_
    
- Never “fix it later”
    
- Use `switch -c` to align thought and state
    

This is cognitive safety, not syntax.

---

## Pause — Your Turn

Explain **why `git switch -c` exists**, focusing on:

- The human mistake it prevents
    
- What state changes atomically
    
- Why this matters before _any_ work begins
    

Again:

- No commands
    
- No shortcuts
    
- Intent and guarantees only
    

We will proceed only after this is precise.

---

# After me responce

This is **correct**, but still slightly _surface-level_. We need to sharpen it so the **guarantee** is explicit, not just the convenience.

I will refine your explanation, then we proceed.

---

## Final Calibration for Exercise 3

Your statement:

> “git switch -c exists to create and switch to the new branch at the same time to prevent committing from the wrong branch later”

This is **directionally right**. Now let’s make it precise and professional.

---

### What `git switch -c` Exists _For_ (Precise)

Not just:

- “create and switch at the same time”
    

But:

> It exists to make **intent and `HEAD` movement atomic**, so there is no intermediate state where work can accidentally attach to the wrong branch.

That is the guarantee.

---

### The Human Failure It Prevents

Without `-c`, the workflow is:

1. Think: “I should work on a new branch”
    
2. Create branch
    
3. Forget to switch
    
4. Commit anyway
    
5. Realize too late
    

This is not a Git failure — it is a **human sequencing error**.

`git switch -c` collapses:

- decision
    
- creation
    
- positioning of `HEAD`
    

into **one irreversible, aligned action**.

---

### Why This Matters _Before_ Any Work Begins

Because:

- Files may look identical
    
- History may be identical
    
- But **commit routing is already different**
    

Once a commit exists:

- Cleanup becomes history manipulation
    
- Risk and cognitive load increase
    

Professionals eliminate that risk **upfront**.

---

## Exercise 3 Status

Your mental model is now **correct and stable**.

---

