Proceeding.

This is the exercise where Git becomes **mathematically honest**. Most confusion people have with Git survives until this point and then collapses quickly once this mental model locks in.

---

# Follow-Along Exercise 6

## Diffs as Explicit Comparisons (Not “What Changed?”)

---

## A. Why this exists (the problem it solved)

**The core confusion Git eliminates here:**

People ask:

> “What changed?”

Git asks back:

> “Between _which two states_?”

Before Git, tools answered vaguely:

- “What changed recently”
    
- “What’s different now”
    

Git refuses vagueness.

> **A diff is not a description of change.  
> A diff is a recipe to transform one exact snapshot into another.**

If you do not specify both sides, Git will assume defaults — and that’s where confusion begins.

---

## B. The mechanism (what actually happens under the hood)

A diff is always computed between **two trees**.

Those trees can come from:

- Working Directory
    
- Staging Area (index)
    
- A Commit (via hash or reference)
    

Git does **not** care about time.  
It only cares about **state A → state B**.

The entire diff system is built on this invariant.

---

## C. Failure exercise (where people think Git is “lying”)

We will now intentionally create confusion and resolve it.

### Step 1 — Modify without staging

Edit your file:

```bash
echo "Line 5: new experiment" >> work.txt
```

Now run:

```bash
git diff
```

**Question:**  
What two states did Git compare?

Answer (do not guess):

- Working Directory
    
- vs **Staging Area**
    

That is the default.

So this diff answers:

> “What have I changed _since I last staged_?”

---

### Step 2 — Stage the change

```bash
git add work.txt
```

Now run again:

```bash
git diff
```

You will see **nothing**.

Beginner reaction:

> “Git lost my change”

Reality:

> You changed the comparison.

Now Git is comparing:

- Working Directory
    
- vs Staging Area
    

And they are identical.

---

## D. Expected outputs (self-verification)

Now run:

```bash
git diff --staged
```

This explicitly asks:

> “What will change if I commit now?”

This diff compares:

- Staging Area
    
- vs Last Commit (`HEAD`)
    

You should now see the diff again.

This proves:

> Git did not lose anything.  
> You changed the question.

---

## E. Correct usage pattern (what professionals actually do)

Professionals always know **which two states they are comparing**.

They use diffs deliberately:

- `git diff`  
    → _What have I modified but not staged?_
    
- `git diff --staged`  
    → _What am I about to make permanent?_
    
- `git diff HEAD~1 HEAD`  
    → _What did the last commit change?_
    

Mental model to lock in:

> **Diffs are answers to explicit questions, not ambient information.**

If you don’t know the question, the output is meaningless.

---

## Lock-in questions (answer before moving on)

Answer briefly, numbered:

1. Why does `git diff` sometimes show nothing even when changes exist?
    
2. What exact comparison does `git diff` perform by default?
    
3. What exact comparison does `git diff --staged` perform?
    
4. Why is Git’s diff behavior described as “brutally literal”?
    

Once these are solid, the final section becomes easy: **undoing changes safely without lying to history**.

---

Good. You are very close. I will **tighten precision**, remove ambiguity, and then explicitly confirm readiness to move to the final section.

I will go answer-by-answer.

---

## 1. Why does `git diff` sometimes show nothing even when changes exist?

**Your answer:**

> if the changes are staged, they won't show up, it only shows unstaged differences

**Status:** ✅ Correct

**Precision lock-in:**

> `git diff` shows nothing when all changes are already staged because it compares the **working directory to the staging area**, and those two states are identical.

This is not “hiding” changes — it is answering a different question.

---

## 2. What exact comparison does `git diff` perform by default?

**Your answer:**

> it shows the unstaged changes, from the last version that was staged

**Status:** ⚠️ Almost correct, needs one important correction

### Correction

It does **not** compare to “the last version that was staged” historically.

It compares to:

- **The current contents of the staging area (index)**
    

Those are not always the same thing.

Correct version:

> By default, `git diff` compares the working directory against the staging area (index), showing changes that are not yet staged.

This matters later when you stage partial hunks.

---

## 3. What exact comparison does `git diff --staged` perform?

**Your answer:**

> compares the currently staged changes with the previous commit

**Status:** ✅ Correct

**Tightened wording:**

> `git diff --staged` compares the staging area against the last commit (`HEAD`), showing exactly what will become permanent if you commit now.

This is the **pre-commit truth check** professionals rely on.

---

## 4. Why is Git’s diff behavior described as “brutally literal”?

**Your answer:**

> as they can compare exact changes word to word

**Status:** ⚠️ Directionally right, but too narrow

### Correct framing (this is important)

It is not about “word to word”.  
It is about **state to state**.

Correct answer:

> Git’s diff behavior is brutally literal because it compares only the exact two states you ask for, without guessing intent, meaning, or context.

That explains:

- Why diffs feel confusing
    
- Why Git never “helps”
    
- Why correctness beats convenience
    

---

## Final calibration verdict for Exercise 6

You now correctly understand:

- Diffs are **explicit comparisons**
    
- “Nothing shown” means **no difference between those two states**
    
- Confusion comes from asking the wrong comparison
    
- Git is literal by design, not unfriendly
    

This means you are ready for the **last conceptual pillar**.

---

# Next Exercise (Final for this sequence)

## Undoing Changes — Without Lying to History

This is where everything you learned converges:

- staging
    
- commits
    
- hashes
    
- diffs
    
- history integrity
    

Reply with exactly:

> **“Next exercise: undoing changes safely”**

We will map:

- mistake scope → correct undo tool  
    so you never panic-reset again.