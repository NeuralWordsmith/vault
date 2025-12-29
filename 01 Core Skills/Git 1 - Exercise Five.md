Proceeding. This is **Exercise 5**, and it directly activates **Chapter 2.1 + 2.2 of your MOC** — turning history from something you _read_ into something you _question_ .

Nothing new will be assumed. Everything builds strictly on what you already touched.

---

# Follow-Along Exercise 5

## `git log` as a Query Engine (Not a Scroll)

---

## A. Why this exists (the problem it solved)

**The real problem:**

Once a project has:

- dozens of commits
    
- multiple contributors
    
- overlapping changes
    

This question becomes common:

> “Something changed… but **when**, **why**, and **where**?”

Scrolling `git log` top-to-bottom does **not** answer that.  
It overwhelms you with irrelevant history.

So Git does not treat history as a timeline.  
It treats it as a **queryable graph**.

> `git log` is not a viewer.  
> It is a **filter over immutable facts**.

---

## B. The mechanism (what actually happens under the hood)

When you run `git log`, Git:

1. Starts from a reference (by default `HEAD`)
    
2. Walks the commit graph backward
    
3. Applies **filters**
    
4. Prints only commits that satisfy **all constraints**
    

This matters:

- Order ≠ importance
    
- Absence ≠ non-existence
    
- Filters are **ANDed**, not ORed
    

---

## C. Failure exercise (why beginners think Git “lost history”)

### Step 1 — Run the naive command

```bash
git log
```

What you see:

- Every commit
    
- In reverse chronological order
    
- With no context relevance
    

This answers **nothing** except “what exists”.

---

### Step 2 — Ask a _bad_ question

Run:

```bash
git log --oneline work.txt
```

If you typo the filename, or the file didn’t exist yet, Git may show **nothing**.

Beginner reaction:

> “Git didn’t track it”  
> “History is missing”  
> “Something broke”

Reality:

> Your **query eliminated all candidates**.

This is a critical failure mode.

---

## D. Expected outputs (self-verification)

Now run these **in order**.

### 1. Ask: _“Which commits ever touched this file?”_

```bash
git log --oneline -- work.txt
```

Expected:

- Only commits where `work.txt` changed
    
- Likely both commits you created earlier
    

If this returns nothing, your mental model or filename is wrong — not Git.

---

### 2. Ask: _“Show me less noise.”_

```bash
git log --oneline -2
```

Expected:

- Exactly two commits
    
- Most recent only
    

This proves:

> Limiting output ≠ filtering meaning

---

### 3. Ask: _“Who changed what?”_

```bash
git log --stat
```

Expected:

- File names
    
- Line counts
    
- Still no diffs
    

This is **summary-level interrogation**.

---

## E. Correct usage pattern (what professionals actually do)

Professionals never start with full history.

They follow a **three-step interrogation pattern**:

1. **Narrow the candidate set**
    
    - by file
        
    - by time
        
    - by count
        
2. **Identify the suspect commit**
    
    - hash
        
    - message
        
    - author
        
3. **Inspect with precision**
    
    - `git show <hash>`
        

Mental model to lock in:

> `git log` answers **“which commits?”**  
> `git show` answers **“what exactly happened?”**

If you reverse this order, you drown.

---

## Lock-in questions (answer before moving on)

Answer briefly, numbered:

1. Why is `git log` described as a _query engine_ rather than a history viewer?
    
2. Why can a filtered `git log` return nothing even when history exists?
    
3. What is the danger of over-filtering log output?
    
4. Why should `git show` come **after** `git log`, not before?
    

Once these land, we will move to **diffs as explicit comparisons**, where Git becomes brutally literal and most confusion finally disappears.

Take your time. This section pays dividends forever.

---

Good — your instincts are right. Now I will **tighten each answer into a professional-grade mental model**. No new concepts, only correction and sharpening.

---

## 1. Why is `git log` described as a _query engine_ rather than a history viewer?

**Your answer:**

> because we can look for specific queries and it can bring it up precisely

**Status:** ✅ Correct, but underspecified

### Tightened version you should internalize

> `git log` is a query engine because it does not merely display history; it **selects commits that satisfy explicit constraints** (file, time, count, author, message, etc.).

Key upgrade:

- It is not “showing history”
    
- It is **answering a question you asked**
    

If you don’t phrase a question, you get noise.

---

## 2. Why can a filtered `git log` return nothing even when history exists?

**Your answer:**

> hmm why?

Good — this confusion is _exactly_ the learning point.

### Correct explanation (this is critical)

> A filtered `git log` can return nothing because **filters are strict AND conditions**, not fuzzy searches.

What this means concretely:

- Git does not say “close enough”
    
- If _no commit satisfies all filters simultaneously_, the result is empty
    
- Empty output means **“no commit matches your query”**, not “no history exists”
    

Correct answer to lock in:

> Because filters eliminate commits that do not meet the exact criteria, and an empty result means the query was too restrictive, not that history is missing.

This prevents one of the most common Git misdiagnoses.

---

## 3. What is the danger of over-filtering log output?

**Your answer:**

> it may get confusing?

**Status:** ⚠️ Directionally right, but vague

### Precise danger (this matters in real debugging)

> The danger of over-filtering is **false confidence** — concluding that something never happened when it actually did, but outside your filter.

Examples:

- Wrong filename
    
- Wrong date window
    
- Commit happened before file existed
    
- Commit touched logic indirectly
    

Correct answer:

> Over-filtering can hide relevant commits and lead you to falsely conclude that a change never occurred.

This is how bugs get misattributed.

---

## 4. Why should `git show` come _after_ `git log`, not before?

**Your answer:**

> we need to be sure for specific commit first then we must look into what exactly

**Status:** ✅ Correct and well reasoned

### Professional phrasing

> `git log` is used to identify the relevant commit, and `git show` is used to inspect it in detail; reversing this order causes unnecessary inspection of irrelevant history.

Mental model to lock in:

- `git log` = **search**
    
- `git show` = **forensics**
    

You do not do forensics without a suspect.

---

## Final calibration verdict

You now correctly understand that:

- History is **queryable**, not linear
    
- Empty output means **query failure**, not data loss
    
- Filters are powerful but dangerous when misused
    
- Git rewards precise questions, not browsing
    

At this point, your Git usage has crossed from **command execution** into **reasoned interrogation**.

---

### Next exercise

> **“Next exercise: diffs as explicit comparisons”**

This is where Git becomes brutally literal, and most remaining confusion disappears.