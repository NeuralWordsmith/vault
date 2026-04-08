# Exercise 1.3 — Python as a Scripted System

This exercise covers **exactly**:

* [[Python - Python Scripts]]
* [[Python - Interactive Shell vs Scripts]]
* [[Python - Recommended Workflow for Learning]]

Focus:

* Execution order
* Determinism vs exploration
* Why scripts are *real programs*

---

## **Part 0 — Environment Setup**

We now *deliberately leave* the interactive world.

### 0.1 Ensure you are **not** in any Python shell

If you see `>>>` or `In [ ]:`, exit:

```python
exit()
```

You must be back at your system shell prompt.

---

### 0.2 Create your first script file

**Instruction**

```bash
touch script_test.py
```

**What this does**

* Creates an empty `.py` file
* Marks the transition from:

  * *conversation with Python*
  * to *instructions for Python*

A script is not interactive.
It is a **set of orders**.

---

### 0.3 Open the file in a text editor

Use any editor you prefer (`nano`, `vim`, VS Code, etc.).

Example:

```bash
nano script_test.py
```

---

## **A. Why this exists (the real problem)**

Interactive shells are powerful — but they have fatal flaws:

* Hidden state
* Order-dependent behavior
* No guaranteed reproducibility

These are unacceptable when:

* Sharing code
* Automating tasks
* Building systems
* Running experiments again later

**Scripts exist to enforce determinism.**

A script answers one question:

> *If I give Python these instructions, in this order, what happens?*

Same input.
Same file.
Same output.

Every time.

---

## **B. The mechanism (what actually happens)**

We will now **observe Python executing a script from top to bottom**.

---

### **B.1 Write ordered instructions**

Put this **exactly** into `script_test.py`:

```python
x = 10
y = x + 5
print(y)
```

Save the file.

---

### **B.2 Execute the script**

From the terminal:

```bash
python script_test.py
```

**Observe**

* Output appears **once**
* Python exits immediately after
* No state remains

---

### **B.3 Execution order is absolute**

Now modify the file to this:

```python
print(y)
x = 10
y = x + 5
```

Run it again:

```bash
python script_test.py
```

**Observe**

* The script fails
* Execution stops immediately

**What actually happened**

* Python does **not** scan the whole file
* It executes **line by line**
* From top → bottom
* No future knowledge
* No forgiveness

This is determinism enforced by design.

---

## **C. Failure exercise (common beginner mistake)**

### **C.1 Treating scripts like shells**

Many beginners unconsciously assume:

> “Python remembers things”

Add this to `script_test.py`:

```python
print(x)
```

Run the script **without defining `x` in the file**.

**Observe**

* NameError
* Immediate failure

**What went wrong**

* Scripts start from a **blank state**
* No memory of past runs
* No shared variables
* No “session”

This is a *feature*, not a limitation.

---

## **D. Expected observations (self-verification)**

You should now clearly see:

* Scripts:

  * Execute top to bottom
  * Have no persistent state
  * Fail immediately on undefined behavior
* Output exists *only* if explicitly produced
* Execution ends decisively

If you still think:

> “Scripts are just saved shells”

that mental model is **incorrect**.

---

## **E. Correct usage pattern (professional reality)**

Professionals follow this loop:

1. **Explore**

   * Python shell / IPython
   * Test ideas
   * Inspect objects

2. **Formalize**

   * Move working code into a script
   * Make order explicit
   * Remove hidden state

3. **Rerun**

   * Same result
   * Anywhere
   * Anytime

This is the **recommended learning workflow**:

* Shell → Script
* Curiosity → Determinism

Scripts are “real programs” because:

* They are reproducible
* They are shareable
* They are automatable
* They do not depend on *you being present*

---