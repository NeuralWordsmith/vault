# Exercise 7 — Merge Conflicts Exist to Prevent Silent Data Loss

This is the final and most important conceptual exercise.

We introduce **one idea only**:

> A merge conflict is Git refusing to guess when two intents collide.

---

## A. Why This Exists (Real Problem)

When two branches modify the same logical area:

- Git cannot know which version is “correct”
    
- Guessing would risk silent loss of intent
    

So Git **halts the merge** and externalizes the ambiguity.

Conflicts are a **safety mechanism**, not an error.

---

## B. The Mechanism (Observe, Don’t Assume)

We must create _real divergence_.

### Step 1 — Create a Conflict on `master`

```bash
echo "Master line" >> README.md
git add README.md
git commit -m "Add line on master"
```

---

### Step 2 — Switch and Create a Conflicting Change

```bash
git switch -c conflict-branch
sed -i '$s/.*/Conflicting line/' README.md
git add README.md
git commit -m "Conflicting change"
```

---

### Step 3 — Attempt the Merge

```bash
git switch master
git merge conflict-branch
```

Observe:

- The merge stops [[Git - Creating a Conflict|it didn't?]]
    
- Git reports a conflict
    
- The repository enters a **special state**
    

---

### Step 4 — Inspect the File

Open `README.md`.

You will see:

- Conflict markers (`<<<<<<<`,  ======= ,  >>>>>>>)
    
- Two competing versions
    
- No resolution chosen
    

---

### Step 5 — Resolve Intentionally

Manually edit the file:

- Remove markers
    
- Decide the correct content
    

Then:

```bash
git add README.md
git commit
```

This commit records **your judgment**.

---

## C. Failure Exercise (Beginner Mistake)

Mistakes:

- Deleting one side blindly
    
- Leaving conflict markers
    
- Treating resolution as cleanup
    

Each mistake encodes **loss of intent**.

---

## D. Expected Outputs

You should observe:

- Merge stops automatically
    
- Git blocks further merges
    
- Resolution requires:
    
    - File edit
        
    - Stage
        
    - Commit
        

---

## E. Correct Usage Pattern

Professionals:

- Read both sides
    
- Understand intent
    
- Synthesize meaning
    
- Commit the resolution
    

Conflicts are authored decisions.

---

## Pause — Your Turn

Explain:

1. Why Git stops instead of choosing a side
    
2. What conflict markers represent
    
3. Why the resolution must be a new commit
    

State principles, not steps.

This explanation is the final calibration checkpoint.

---
# After my responce

Good. Your answers are **substantively correct**. We only need to tighten precision and explicitly lock the guarantees. I will do that now, then we will close this exercise and the course section cleanly.

---

## Exercise 7 — Final Calibration

### 1. Why Git stops instead of choosing a side

Your answer:

> “git cannot know what changes to keep so it externalises the decision”

This is **correct**.

**Locked-in version:**

> Git stops because choosing a side would silently discard intent, and Git’s primary guarantee is to prevent silent data loss.

Key boundary:

- Git optimizes for **correctness over convenience**
    
- Stopping is a safety mechanism, not a failure
    

If Git guessed, history could become _wrong without being visibly broken_ — which is unacceptable.

---

### 2. What conflict markers represent

Your answer:

> “they represent the conflicting changes while merge took place”

Correct, with one precision addition.

**Locked-in version:**

> Conflict markers are explicit boundaries injected into the file to show competing versions of the same logical area, forcing a human-authored decision.

Important nuance:

- They are not comments
    
- They are not explanations
    
- They are **hard sentinels** that block progress until resolved
    

Leaving even one guarantees breakage later.

---

### 3. Why the resolution must be a new commit

Your answer:

> “to snapshot the finalised version in history”

Correct.

**Locked-in version:**

> The resolution must be a new commit because it records a deliberate synthesis of competing intents, becoming the single authoritative version going forward.

Why this matters:

- The resolution is not “cleanup”
    
- It is authorship
    
- It replaces ambiguity with an explicit historical decision
    

That commit is the moment where **parallel intent becomes shared truth**.

---

## Locked Mental Model — Merge Conflicts

You now correctly understand that:

1. Conflicts exist to prevent silent loss of meaning
    
2. Markers force explicit human judgment
    
3. Resolution is an authored decision recorded in history
    

Conflicts are not errors.  
They are **decision points**.

---

## Course Status — Completed Scope

You have now completed the **entire conceptual arc** you outlined:

- Branches as pointers, not copies
    
- `HEAD` as commit routing
    
- Intentional branch creation
    
- Comparison as risk reduction
    
- Deletion as judgment
    
- Merge direction and fast-forward trade-offs
    
- Conflicts as safety and authorship
    
- Local vs shared history foundations
    

Your mental models are now **structurally sound**.

---