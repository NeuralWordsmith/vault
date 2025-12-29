Proceeding.

This exercise is where Git stops being “a tool you use” and becomes **a system you rely on**. From here onward, Git’s guarantees are mathematical, not procedural.

---

# Follow-Along Exercise 4

## Commit Hashes & Immutability — Why Git History Can Be Trusted

---

## A. Why this exists (the problem it solved)

**Real-world problem before Git:**

- History could be edited silently
    
- Changes could be reordered or rewritten
    
- Blame was social, not technical
    
- Trust depended on people, not systems
    

Git was designed to answer a single hard question:

> **“How can I prove that this exact state existed, in this exact form, at this exact point in history?”**

The answer is **content-addressed history**.

Commit hashes are not IDs.  
They are **proofs**.

---

## B. The mechanism (what actually happens under the hood)

### Step 1 — Inspect an existing commit

Run:

```bash
git log --oneline
```

You will see something like:

```
a3f9c2e Add real feature
7b1d9a4 Add initial stable idea
```

That short string (`a3f9c2e`) is a **shortened commit hash**.

Now run:

```bash
git log
```

You will see the **full hash** (40 hex characters).

That hash is computed from:

- The snapshot contents (tree)
    
- Parent commit hash
    
- Author metadata
    
- Commit message
    
- Timestamp
    

**Change any one of these → the hash changes completely.**

This is not a label.  
It is a fingerprint.

---

### Step 2 — Understand what a commit _points to_

A commit does **not** store files.

It stores:

- A pointer to a tree (directory structure)
    
- That tree points to blobs (file contents)
    
- A pointer to its parent commit
    

So history is a **linked graph**, not a timeline.

This means:

- History cannot be altered without breaking links
    
- Rewriting history changes _every descendant hash_
    

---

## C. Failure exercise (try to “edit history” mentally)

Imagine this impossible action:

> “I’ll just change one line in an old commit.”

If you did:

1. The blob hash would change
    
2. The tree hash would change
    
3. The commit hash would change
    
4. Every child commit hash would change
    

Result:

- History no longer matches what others have
    
- Git immediately detects divergence
    

This is why Git says:

> _“These branches have diverged.”_

Not morally.  
Cryptographically.

---

## D. Expected outputs (self-verification)

Run:

```bash
git show HEAD
```

Observe:

- Commit hash
    
- Author
    
- Date
    
- Message
    
- Diff
    

Now run:

```bash
git show HEAD~1
```

You are not moving files.  
You are **asking Git to reconstruct a historical snapshot** from hashes alone.

That reconstruction is deterministic.

If Git can do this, history is trustworthy.

---

## E. Correct usage pattern (what professionals actually do)

Professionals assume:

1. **Commits are immutable**
    
    - If it’s published, it’s permanent
        
2. **Hashes are identities**
    
    - Referencing by hash is referencing truth
        
3. **Rewriting history is exceptional**
    
    - Only before sharing
        
    - Only with explicit intent
        

Mental model to lock in:

> A Git commit is a **cryptographically sealed statement** about the state of a project.

Once sealed, it is either:

- Reverted (by adding new history), or
    
- Abandoned (by branching away)
    

It is never quietly changed.

---

## Lock-in questions (answer before moving on)

Answer briefly, numbered:

1. Why does changing an old commit force all later commits to change?
    
2. Why are commit hashes considered trustworthy identifiers?
    
3. Why is “rewriting public history” dangerous?
    
4. What is the difference between _undoing_ and _lying to history_?
    

Once these are solid, we move to **`git log` as a query engine**, where you start _interrogating_ history instead of scrolling it.

---

Good — this tells me **exactly where the mental model breaks**, which is the whole point of this exercise. I’ll correct each answer **surgically**, without adding new concepts prematurely.

You are not behind. These are _the_ hardest questions in Git.

---

## 1. Why does changing an old commit force all later commits to change?

**Your answer:**

> it makes a new branch from that edit?

**Status:** ❌ Incorrect mechanism

### What actually happens (precise and critical)

Changing an old commit does **not** automatically create a new branch.

The real reason is this:

> **Every commit hash includes the hash of its parent commit.**

So the structure is:

```
Commit B hash = hash(treeB + parent=A)
Commit C hash = hash(treeC + parent=B)
```

If you change commit **A**:

- A’s hash changes
    
- Therefore B’s parent hash changes → B’s hash changes
    
- Therefore C’s parent hash changes → C’s hash changes
    

This is **hash dependency propagation**, not branching.

Correct answer you should lock in:

> Changing an old commit changes its hash, which invalidates every descendant commit because each commit’s hash depends on its parent’s hash.

---

## 2. Why are commit hashes considered trustworthy identifiers?

**Your answer:**

> because they hold one unique snapshot made in time and they cant be modified in themselves

**Status:** ⚠️ On the right path, needs precision

### Tightened, correct answer

Commit hashes are trustworthy because:

- They are **derived from content**, not assigned
    
- Any change to:
    
    - files
        
    - metadata
        
    - parent reference  
        produces a completely different hash
        
- This makes silent tampering detectable by design
    

Correct phrasing:

> Commit hashes are trustworthy because they are cryptographic fingerprints of a commit’s exact contents and ancestry, making any modification immediately detectable.

“Cannot be modified” is imprecise — they _can_ be rewritten, but rewriting **proves** divergence.

---

## 3. Why is rewriting public history dangerous?

**Your answer:**

> idk.. why?

Good — this is the most important one to get right.

### The real danger (this is foundational)

> **Rewriting public history breaks the shared graph of trust between collaborators.**

Concretely:

- Others already have the old hashes
    
- You publish new hashes for “the same” commits
    
- Git sees two incompatible histories
    
- Automatic reconciliation becomes impossible
    

This causes:

- Forced resets
    
- Lost work
    
- Confusing merges
    
- Permanent trust erosion in the repository
    

Correct answer:

> Rewriting public history is dangerous because it invalidates commits that others already rely on, breaking the shared history graph and making reconciliation unsafe.

This is why Git is strict, not polite.

---

## 4. What is the difference between _undoing_ and _lying to history_?

**Your answer:**

> no idea

That’s fine — this distinction only makes sense _now_, after hashes.

### Clear, professional distinction

**Undoing:**

- Adds new commits
    
- Preserves what actually happened
    
- History remains truthful
    
- Example: `git revert`
    

**Lying to history:**

- Rewrites or deletes commits
    
- Makes it appear something never happened
    
- Breaks trust if shared
    
- Example: rewriting published commits
    

Correct answer:

> Undoing adds new history to correct past actions, while lying to history rewrites or erases past actions as if they never occurred.

This distinction governs every “undo” command you will ever learn.

---

## Final calibration verdict

You now correctly understand:

- Why hashes cascade
    
- Why history is immutable by default
    
- Why Git enforces safety over convenience
    
- Why some actions are socially dangerous, not technically illegal
    

From here on, Git becomes **interrogative**, not conceptual.

---

### Next exercise (one action only)

Reply with:

> **“Next exercise: `git log` as a query engine”**

We will stop _reading_ history and start **asking it precise questions**.