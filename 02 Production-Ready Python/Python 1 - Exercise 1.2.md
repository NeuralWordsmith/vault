

---

# Exercise 1.2 — Python as an Interactive System

*(Python Shell vs IPython)*

This exercise covers **exactly**:

* Python – Python Shell
* Python – IPython

One flow.
Same code.
Different environments.
Different mental models.

---

## **Part 0 — Environment Setup (Mandatory)**

You are likely already inside the Python shell from Exercise 1.1.
If not, do this first.

### 0.1 Exit any existing Python session

**Instruction**

```python
exit()
```

**What this does**

* Terminates the interpreter process
* Clears *all* in-memory state
* Ensures we don’t confuse *past state* with *current behavior*

State leakage is a silent mental-model killer.

---

### 0.2 Start the standard Python shell

**Instruction**

```bash
python
```

You should see:

```
>>>
```

This is the **baseline** environment.

Do **not** install or start IPython yet.

---

## **A. Why this exists (the real problem)**

Programming has two fundamentally different activities:

1. **Exploration**

   * “What happens if…?”
   * “What is this object?”
   * “Why did this break?”

2. **Execution**

   * “Run this exactly”
   * “Same result every time”
   * “No surprises”

Before interactive shells:

* You had to write files
* Run them
* Inspect output
* Modify
* Re-run

This created **long feedback loops**, especially deadly for learning and science.

The Python shell exists to **collapse the distance between thought and execution**.

IPython exists because the *basic* shell was not enough for deep inspection.

---

## **B. The mechanism (what actually happens)**

We will now **interact with the interpreter as a system**, not just type commands.

---

### **B.1 REPL behavior in the Python shell**

In the standard Python shell, type:

```python
x = 10
```

**Observe**

* No output
* But something *did* happen

Now type:

```python
x
```

**Observe**

* `10` is printed
* You didn’t call `print()`

**What actually happened**

* The shell automatically displays the *repr* of the last expression
* Assignment is a **statement**, not an expression
* Expressions produce values; statements don’t

This distinction matters later for functions, comprehensions, and debugging.

---

### **B.2 State persists across commands**

Now type:

```python
y = x + 5
y
```

**Observe**

* The shell remembers `x`
* The interpreter is **stateful**

This is not a script.
This is a *live environment*.

---

### **B.3 Introspection in the Python shell**

Type:

```python
type(x)
```

Then:

```python
dir(x)
```

**Observe**

* `type()` tells you *what* something is
* `dir()` reveals *what it can do*

This is **introspection**:

* The program can inspect itself
* No documentation lookup required

But notice:

* Output is raw
* Long
* Hard to scan

This limitation is **why IPython exists**.

---

## **C. Failure exercise (common beginner mistake)**

### **C.1 Confusing shell behavior with program behavior**

In the Python shell, type:

```python
10 + 20
```

You see:

```
30
```

Now imagine this code inside a script:

```python
10 + 20
```

**What beginners expect**

* Output appears

**What actually happens**

* Nothing is shown
* The result is computed and discarded

**What went wrong**

* The shell *prints expressions automatically*
* Scripts do **not**
* Confusing these leads to “my program does nothing” bugs

The shell lies politely.
Scripts tell the truth.

---

## **D. Expected observations (self-verification)**

At this point, you should clearly see:

* The Python shell:

  * Auto-prints expressions
  * Preserves state
  * Encourages exploration
* Assignment ≠ expression
* Introspection is possible but clunky

If you still think:

> “Shell output = program output”

then the mental model is **still wrong**.

---

## **E. IPython: same code, different power**

Now exit the Python shell:

```python
exit()
```

### **E.1 Start IPython**

**Instruction**

```bash
ipython
```

(If it’s not installed, stop here and tell me. Do not install silently.)

You’ll see a prompt like:

```
In [1]:
```

This is **not cosmetic**.

---

### **E.2 Repeat the same interactions**

Type:

```python
x = 10
x
type(x)
dir(x)
```

**Observe carefully**

* Output is formatted
* Scrolling is easier
* Results are numbered
* History is navigable

Now type:

```python
x?
```

**Observe**

* Documentation appears
* You didn’t call `help()`

This is **deep introspection**, not execution.

---

## **C (again). Failure exercise — misuse of IPython**

Many beginners think:

> “IPython *is* Python”

It is not.

IPython:

* Enhances interaction
* Does not change Python semantics
* Does not make scripts behave differently

Mistake:

* Writing code that relies on IPython-only features
* Then wondering why scripts break

IPython is a **microscope**, not a new organism.

---

## **D. Expected outputs (final check)**

You should now be able to *observe*, not just say:

* Same code
* Same Python
* Different interaction layer
* Different cognitive experience

Nothing magical.
Nothing hidden.

---

## **E. Correct usage pattern (professional reality)**

Professionals use:

* **Python shell / IPython**

  * Exploration
  * Inspection
  * Debugging
  * Learning

* **Scripts**

  * Reproducibility
  * Automation
  * Deployment

They **never confuse the two**.

---