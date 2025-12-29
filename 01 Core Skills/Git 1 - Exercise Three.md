Proceeding.

This is the **pivot point** of Git. If this section lands correctly, everything else (diffs, undo, history, blame) becomes predictable instead of memorization-heavy.

---

# Follow-Along Exercise 3

## Staging vs Committing — Separating Intent from Permanence

---

## A. Why this exists (the problem it solved)

**Real problem Git is solving:**

You are working on multiple things at once:

- A real feature
    
- A temporary experiment
    
- A debug print
    
- A typo fix you noticed incidentally
    

If Git worked like “Save = History”:

- All of that would become one permanent event
    
- You could never explain _why_ a change happened
    
- Undoing would be destructive or dishonest
    

So Git introduces a **deliberate friction point**.

> The staging area exists so that **history records intent, not disk noise**.

This is not about commands.  
This is about accountability.

---

## B. The mechanism (what actually happens under the hood)

We will now make **three kinds of changes** and intentionally commit only one.

### Step 1 — Prepare a clean base

From your repository root:

```bash
cd git-orientation
```

Create a file:

```bash
echo "Line 1: stable idea" > work.txt
```

Check status:

```bash
git status
```

You should see:

```
untracked files: work.txt
```

Now stage it:

```bash
git add work.txt
```

Commit it:

```bash
git commit -m "Add initial stable idea"
```

You now have:

- A repository
    
- One commit
    
- One intentional snapshot
    

---

### Step 2 — Introduce mixed intent (this is the key)

Edit the same file in **three different ways**:

```bash
echo "Line 2: real feature" >> work.txt
echo "Line 3: DEBUG TEMP" >> work.txt
echo "Line 4: typo fix later" >> work.txt
```

Now ask Git what it sees:

```bash
git status
```

Git sees:

- Changes
    
- But no understanding of intent
    

Git is **waiting for you to decide**.

---

### Step 3 — Stage selectively (this is the mechanism)

Open the file:

```bash
cat work.txt
```

Decide:

- You want to commit **Line 2**
    
- You do **not** want to commit Lines 3 and 4
    

Now stage **the file** anyway:

```bash
git add work.txt
```

This is where beginners panic — but pause.

Run:

```bash
git status
```

Git now says:

- Changes are staged
    
- Working directory is clean
    

But here’s the truth:

> Git staged the **current snapshot**, not your future intent.

We are about to expose the failure.

---

## C. Failure exercise (commit something you regret)

Commit now:

```bash
git commit -m "Add real feature"
```

You have just committed:

- A debug line
    
- A typo placeholder
    
- Along with the real feature
    

This is **not a mistake in Git**.  
This is a failure of **intent separation**.

Every messy repository starts exactly like this.

---

## D. Expected outputs (self-verification)

Run:

```bash
git log --oneline
```

You should see:

- Two commits
    
- The second commit claims to be a “real feature”
    
- But contains unrelated noise
    

This mismatch between **message** and **content** is the red flag.

History now lies — subtly.

---

## E. Correct usage pattern (what professionals actually do)

Professionals treat staging as **editorial control**, not a checkbox.

Correct pattern:

1. Make changes freely
    
2. Inspect them deliberately
    
3. Stage **only what belongs together**
    
4. Commit with a message that truthfully explains the snapshot
    

Mental model to lock in:

> **`git add` defines the story.  
> `git commit` makes the story permanent.**

Nothing else in Git matters until this is respected.

---

## Lock-in questions (answer before moving on)

Answer briefly, numbered:

1. Why is committing everything immediately dangerous?
    
2. What problem does the staging area solve that commits alone cannot?
    
3. Why did Git allow a “bad” commit without warning?
    
4. What does a commit message actually claim?
    

Once these are solid, we will move to **commit hashes and immutability**, where Git stops being flexible and becomes cryptographic.

---

Good engagement. Your instincts are mostly right; now we will **remove imprecision** so your mental model matches how Git actually works under pressure.

I’ll go point by point, correct only what needs correction, and then decide whether you are ready to advance.

---

## 1. Why is committing everything immediately dangerous?

**Your answer (summary):**  
It records bad or unsure versions; only sure versions should be committed.

**Status:** ⚠️ Partially correct, but framed incorrectly.

### What needs correction

This framing treats Git like a **quality filter** (“only good versions go in history”).  
That is _not_ Git’s contract.

### Correct mental model

> Committing everything immediately is dangerous because it **collapses unrelated intent into a single irreversible historical unit**.

Key corrections:

- Git is not about “good vs bad” code
    
- Bad commits are acceptable
    
- **Ambiguous commits are the problem**
    

A bad commit with clear intent can be reverted safely.  
A mixed-intent commit cannot be reasoned about safely.

Corrected answer you should internalize:

> Immediate commits are dangerous because they destroy the ability to explain, isolate, undo, or reason about changes later.

---

## 2. What problem does the staging area solve that commits alone cannot?

**Your answer:**  
Without staging, files would be overwritten on every commit.

**Status:** ❌ Incorrect mechanism

This answer describes _what you imagine would happen_, not what Git actually does.

### Correct explanation

Git commits **snapshots**, not incremental overwrites.  
Even without staging, Git could still snapshot everything.

So staging does **not** exist to prevent overwrites.

### Correct mental model

> The staging area exists to let you define **which exact changes belong to the same logical decision**.

It solves:

- Mixed work streams
    
- Partial commits
    
- Intent curation
    

Correct answer:

> The staging area allows you to curate intent by selecting which changes form a single historical statement, something commits alone cannot do.

This distinction is critical later for diffs, revert safety, and blame accuracy.

---

## 3. Why did Git allow a “bad” commit without warning?

**Your answer:**  
Because the message is our responsibility; Git’s job is something else.

**Status:** ⚠️ Directionally right, but incomplete.

### Precise correction

Git does not judge:

- Meaning
    
- Correctness
    
- Intent alignment
    

Because **Git cannot know intent**.

Correct framing:

> Git allowed the commit because its only invariant is internal consistency, not semantic correctness.

Git guarantees:

- Object integrity
    
- History immutability
    
- Referential correctness
    

Git explicitly refuses to guarantee:

- Meaning
    
- Quality
    
- Honesty
    

That responsibility is human.

---

## 4. What does a commit message actually claim?

**Your answer:**  
A descriptive message on specific changes.

**Status:** ⚠️ Too shallow for long-term use.

### Correct, professional framing

> A commit message is a **durable claim about why a snapshot exists**, not a description of what changed.

Why this matters:

- Diffs already show _what_
    
- History exists to explain _why_
    
- Six months later, only the message survives cognitively
    

Correct answer to lock in:

> A commit message asserts the intent and rationale behind a permanent snapshot.

---

## Final calibration verdict

You are **ready to move forward**, but note this:

- You reason intuitively
    
- You sometimes explain Git in terms of _convenience_ instead of _guarantees_
    

From this point onward, Git becomes **cryptographic and immutable**, not flexible.

If the next section lands correctly, you will stop fearing “breaking history.”

---

### Next step (one action only)

Reply with:

> **“Next exercise: commit hashes & immutability”**

We will dissect what a commit hash actually represents, why history cannot be edited casually, and why this is the foundation of trust in Git.