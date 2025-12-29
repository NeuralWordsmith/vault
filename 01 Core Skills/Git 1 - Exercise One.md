
It is a **calibration session**: each exercise forces a specific mental model to either lock in—or visibly break.

Nothing here assumes commits, branches, or history yet. If this foundation is shaky, everything later will feel magical and fragile.

---

# Follow-Along Exercise 1

## Version Control Exists to Solve _State Fragility_

---

## A. Why this exists (the problem it solved)

**Problem to simulate mentally (not philosophically):**

You have a folder called `project/`.

- You edit files.
    
- You overwrite files.
    
- You rename files.
    
- You delete files.
    

Now answer honestly:

- Which version was “working” yesterday?
    
- What changed between 10am and 2pm?
    
- Can you safely experiment without fear?
    
- Can you explain _why_ a change was made?
    

**Without version control, all answers are “I don’t know.”**

Version control exists to make **these questions cheap and safe**, not to “store files.”

Key idea from your MOC:

> _Working files are disposable state; history is durable memory._

This exercise will make that separation concrete.

---

## B. The mechanism (what actually happens under the hood)

### Step 1 — Create a disposable working directory

```bash
mkdir git-orientation
cd git-orientation
```

Create a file:

```bash
echo "Version 1" > notes.txt
```

At this moment:

- The file exists
    
- **Nothing is remembered**
    
- You can lose everything instantly
    

### Step 2 — Draw the boundary

```bash
git init
```

What actually happened:

- Git created a hidden **`.git/` directory**
    
- That directory is now the **only authority over history**
    
- Your files did NOT become history automatically
    

Verify the boundary:

```bash
ls -a
```

You should see:

```
.git
notes.txt
```

This is the single most important moment in Git.

**Nothing else matters until this boundary is respected.**

---

## C. Failure exercise (break it on purpose)

### Failure 1 — Assume Git is “watching everything automatically”

Edit the file:

```bash
echo "Version 2" >> notes.txt
```

Now run:

```bash
git status
```

Expected confusion for beginners:

> “Why didn’t Git save anything yet?”

**Because Git does not care about files.  
Git only cares about snapshots you explicitly authorize.**

### Failure 2 — Destroy the boundary

Do **not** run this yet—just understand it:

```bash
rm -rf .git
```

If you did:

- All history would vanish
    
- Files would still exist
    
- Git would behave like it never existed
    

This proves:

> **Your project is not the repository.  
> The repository is the `.git` directory.**

---

## D. Expected outputs (self-verification)

Run:

```bash
git status
```

You should see **all of the following concepts reflected**:

- Repository exists
    
- File is **untracked**
    
- No history exists yet
    
- Git is aware of change but has recorded nothing
    

If you see:

- “Not a git repository” → boundary is broken
    
- “nothing to commit” → you are misunderstanding the workflow
    

---

## E. Correct usage pattern (what professionals actually do)

Professionals treat Git as **risk management**, not storage.

Correct behavior pattern:

1. **Initialize deliberately**
    
    - Never accidentally
        
    - Never nested unless intentional
        
2. **Treat `.git` as sacred**
    
    - Never copy it blindly
        
    - Never delete it casually
        
3. **Use `git status` as a mental mirror**
    
    - If Git disagrees with your mental model, stop
        
4. **Assume working files are disposable**
    
    - Safety comes from snapshots, not files
        

This aligns exactly with your MOC guidance:

> _Git’s value comes from guarantees, not commands._

---

## Lock-in check (do not skip)

Answer these without guessing:

1. If your laptop dies but `.git` exists elsewhere, are you safe?
    
2. If `.git` is deleted but files remain, are you safe?
    
3. Why does Git not automatically “save” changes?
    
4. What does `git init` **actually** create?
    

If any answer feels fuzzy, **do not move forward**.

---

### Next step (one action only)

If you want to continue **in the same follow-along style**, say:

> “Next exercise: repository boundary & nested repo failure”

We will then intentionally create a **nested repository failure** and dissect why Git appears “buggy” when this mental model is missing.



---
Good — this is the right moment to **tighten precision**, not move forward yet. I’ll go answer-by-answer and **correct the mental model**, not just the wording.

---

## 1. “If your laptop dies but `.git` exists elsewhere, are you safe?”

**Your answer:** yes  
**Status:** ✅ Correct

**Why this is correct (exactly):**  
Because **the repository _is_ the history**, and the history lives entirely inside `.git`.  
Your working files are reconstructible from that history.

Mental lock-in:

> A Git repository is sufficient to recreate a working directory.  
> A working directory is never sufficient to recreate history.

---

## 2. “If `.git` is deleted but files remain, are you safe?”

**Your answer:** no  
**Status:** ✅ Correct

**Why this matters:**  
This confirms you understand the **asymmetry**:

- Files ≠ history
    
- History ⇒ files (but not vice-versa)
    

This asymmetry explains:

- Why Git is not “just backup”
    
- Why Git can recover deleted files
    
- Why Git feels strict about boundaries
    

---

## 3. “Why does Git not automatically ‘save’ changes?”

**Your answer:** “cuz humans need to do that part..?”  
**Status:** ⚠️ Directionally right, but conceptually incomplete

Let’s fix this precisely.

### Incorrect mental model (subtle but dangerous)

> “Git doesn’t save automatically because humans should decide.”

This makes Git sound like a polite editor.

### Correct mental model

> **Git separates _change detection_ from _historical intent_.**

What Git does automatically:

- Detects file changes
    
- Tracks states (modified, untracked, staged)
    

What Git refuses to do automatically:

- Decide **which changes belong together**
    
- Decide **when something becomes permanent**
    
- Decide **why a change exists**
    

If Git auto-saved:

- Half-written experiments would become history
    
- Temporary debug prints would become permanent
    
- History would lose meaning, not just cleanliness
    

So the accurate answer is:

> Git does not auto-save because **history is a curated artifact, not a mirror of disk state**.

That sentence should feel heavy — it explains staging, commits, and undo safety later.

---

## 4. “What does `git init` actually create?”

**Your answer:** “initialises the repo or .git directory”  
**Status:** ⚠️ Technically right, mentally shallow

Let’s sharpen this.

### Incomplete answer

> “It initializes the repo.”

That hides the most important detail.

### Correct, precise answer

> `git init` creates a **`.git` directory that becomes the single source of truth for history, identity, and authority** over everything beneath it.

What it does **not** do:

- Does not track files
    
- Does not save anything
    
- Does not modify your working files
    

This distinction matters later when:

- Converting existing projects
    
- Debugging nested repositories
    
- Recovering broken repos
    

If you remember only one thing:

> **`git init` does not affect files — it creates a memory system.**

---

## Calibration verdict (important)

You are **correctly oriented**, but two concepts needed tightening:

1. Git’s refusal to auto-save is about **preserving intent**, not politeness.
    
2. `git init` creates **authority**, not just a folder.
    

You are now safe to proceed.

---

> **“Next exercise: nested repository failure”**

We will deliberately create a nested repo, observe Git’s “weird” behavior, and then explain why it is _correct_ and _protective_, not buggy.