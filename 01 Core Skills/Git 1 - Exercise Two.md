We proceed **one layer deeper**, and this is where many people permanently lose trust in Git if the mental model is not corrected early.

---

# Follow-Along Exercise 2

## Repository Boundary & Nested Repository Failure

This exercise exists to **break Git on purpose**, observe the failure, and then explain why Git is behaving correctly.

Do not skim. Perform each step.

---

## A. Why this exists (the problem it solved)

**Real-world problem Git is preventing:**

Imagine this structure:

```
work/
└── project/
    ├── src/
    ├── docs/
    └── experiments/
```

Now imagine:

- Some files are tracked
    
- Some silently are not
    
- History appears “missing”
    
- Commits don’t include everything you edited
    

This usually happens because **someone accidentally created a second repository inside the first**.

Nested repositories fracture history.

Git is designed to **refuse implicit recursion** because recursion would destroy guarantees about ownership, integrity, and responsibility.

This exercise makes that visible.

---

## B. The mechanism (what actually happens under the hood)

### Step 1 — Start clean

From your previous exercise directory:

```bash
cd git-orientation
```

Confirm you are inside a repository:

```bash
git status
```

You should **not** see:

```
fatal: not a git repository
```

---

### Step 2 — Create a subdirectory

```bash
mkdir experiments
cd experiments
```

Create a file:

```bash
echo "temporary idea" > test.txt
```

Now go back **one level up**:

```bash
cd ..
```

Check Git’s view:

```bash
git status
```

You should see something like:

```
untracked files:
  experiments/
```

So far, this is correct and expected.

---

### Step 3 — Break the boundary (the failure)

Now do this **inside `experiments/`**:

```bash
cd experiments
git init
```

You have just created a **nested repository**.

Return to the parent:

```bash
cd ..
git status
```

---

## C. Failure exercise (observe the break)

### What you will observe

Git will now behave _strangely_.

Typical symptoms:

- `experiments/` may appear as a single entity
    
- Files inside may stop appearing as normal changes
    
- Parent repo will **not** track files inside `experiments/`
    
- History inside `experiments/` is now completely separate
    

This is not a bug.

This is Git **refusing to cross authority boundaries**.

Mental model:

> A Git repository will not track another Git repository’s internals.

Why?

- Two histories
    
- Two authorities
    
- No safe merge of responsibility
    

---

## D. Expected outputs (self-verification)

Run these **exactly**:

```bash
cd experiments
git status
```

Then:

```bash
cd ..
git status
```

You should observe:

- Each repository believes it is the root
    
- Neither sees the other’s internal history
    
- The parent does **not** list `test.txt` anymore
    

If this feels confusing — good. That confusion is the lesson.

---

## E. Correct usage pattern (what professionals actually do)

Professionals follow **one of only three patterns**:

### Pattern 1 — Single repository (most common)

- One `.git` at the top
    
- All files belong to the same history
    

### Pattern 2 — Multiple repositories, clearly separated

```
work/
├── project-a/   (.git)
├── project-b/   (.git)
```

Never nested unless intentional.

### Pattern 3 — Submodules (advanced, explicit)

- Git knows it is nesting
    
- Boundaries are declared
    
- Not accidental
    

**What professionals never do:**

- `git init` inside a repo without a reason
    
- Ignore `.git` presence
    
- Assume Git will “figure it out”
    

---

## Lock-in questions (answer before moving on)

Answer **in your own words**, briefly:

1. Why does Git refuse to track files inside another repo?
    
2. Why does nested `.git` make history appear “missing”?
    
3. Is Git broken here — or enforcing a rule?
    
4. What is the _real_ danger of nested repositories?
    

Reply with numbered answers only.

Once these are solid, we will move to **staging vs committing**, where intent becomes explicit.

---

Good. You are **conceptually aligned**. Now I will **tighten language and causal accuracy** so the model is precise enough to survive real projects.

I will not introduce anything new yet.

---

## 1. Why does Git refuse to track files inside another repo?

**Your answer (summary):**  
Two histories, two authorities, no safe merge of responsibility.

**Status:** ✅ Correct and well-phrased.

**Precision upgrade (lock this wording):**

> Git refuses to track another repository’s internals because **each `.git` directory defines an independent authority over history**, and Git has no safe rule for reconciling competing authorities implicitly.

This is about **authority**, not just history.

---

## 2. Why does nested `.git` make history appear “missing”?

**Your answer:**  
Nested repo reports to git inside that repo, so parent repo doesn't show it.

**Status:** ✅ Correct intuition, needs causal tightening.

**Correct causal chain:**

- The moment a subdirectory contains its own `.git`
    
- That directory stops being _files_ and becomes a _boundary_
    
- The parent repo treats it as an opaque object
    
- Therefore:
    
    - Files are not missing
        
    - They are **intentionally excluded**
        

Correct phrasing:

> History appears missing because the parent repository **is explicitly prevented from seeing inside another repository’s boundary**, not because data is lost.

This distinction matters later when diagnosing “Git ignored my changes.”

---

## 3. Is Git broken here — or enforcing a rule?

**Your answer:** enforcing rules  
**Status:** ✅ Correct

**Lock-in framing:**

> Git is enforcing a **safety invariant**, not failing.

If Git _did_ recurse:

- Accidental corruption would be easy
    
- History ownership would be ambiguous
    
- Recovery would be unreliable
    

---

## 4. What is the real danger of nested repositories?

**Your answer:** history merging conflicts  
**Status:** ⚠️ Partially correct, but incomplete

Merging conflicts are **a downstream symptom**, not the core danger.

### Real danger (this is the key insight):

> **Silent loss of expected history.**

More precise breakdown:

- Work appears untracked
    
- Commits appear incomplete
    
- Collaborators assume files are versioned when they are not
    
- Backups and pushes exclude critical data
    
- Recovery becomes impossible because nothing was ever recorded
    

Corrected answer:

> The real danger is **believing work is protected by Git when it never entered the repository’s history at all**.

This is why nested repos are one of the most expensive early mistakes.

---

## Calibration verdict

You now clearly understand:

- Repository boundaries
    
- Authority separation
    
- Why Git behaves “strictly”
    
- Why this strictness is protective, not hostile
    

You are now ready for the **most important Git concept**:

> **Staging exists to separate intent from permanence.**

---

### Next step (one action only)

Reply with:

> **“Next exercise: staging vs committing”**

This next exercise will intentionally create a commit that _should not exist_, then show how staging prevents it.