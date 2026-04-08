## **Packages & Imports**

What we are building toward:

* You already reason about **state inside objects**
* Now you will reason about **state across files**
* Next comes **state across projects and environments**

Imports are where **small programs become systems**.

---

## **Part 0 — Environment Setup**

Create a workspace:

```bash
mkdir imports_lab
cd imports_lab
touch main.py helpers.py
```

You now have **two files**.
This is the smallest unit where imports *matter*.

---

## **A. Why this exists (practical motivation)**

So far, everything you’ve written lived in one file.

That breaks down immediately when:

* Code grows
* Multiple people touch it
* Concepts need isolation
* Names start colliding

Packages and imports exist to answer **one core question**:

> *Who owns this name, and under what boundary?*

This exercise will make **namespace ownership visible**.

---

## **B. Modules as namespaces (observe the boundary)**

Open `helpers.py` and write:

```python
print("helpers module loaded")

def add(a, b):
    return a + b

value = 42
```

Now open `main.py` and write:

```python
print("main script start")

import helpers

print(helpers.add(2, 3))
print(helpers.value)
```

Run:

```bash
python main.py
```

### Observe carefully

* `helpers module loaded` prints **once**
* `helpers` is a **namespace**
* Nothing from `helpers` exists in `main` without the prefix

This is **not stylistic**.
This is **isolation by design**.

---

## **C. Importing names vs importing namespaces**

Modify `main.py`:

```python
from helpers import add

print(add(5, 6))
```

Run again.

### Observe

* No `helpers.` prefix
* `value` is now **inaccessible**
* Origin of `add` is no longer visible in usage

Same functionality.
Different **traceability**.

This is your first **design trade-off**.

---

## **D. Aliases as controlled compression**

Change `main.py` to:

```python
import helpers as h

print(h.add(1, 1))
```

### Observe

* Namespace preserved
* Verbosity reduced
* Ownership still visible

This pattern scales.
That’s why it becomes convention.

---

## **E. The silent danger: name collision**

Modify `main.py`:

```python
from helpers import add

def add(a, b):
    return a * b

print(add(2, 3))
```

Run it.

### Observe

* No error
* No warning
* The imported `add` is silently overwritten

This is **not a Python quirk**.
This is the **cost of collapsing namespaces**.

---

## **F. Mental model check**

1. Using **Python – Rationale for Packages**, explain why Python does *not* place all functionality into a single global namespace
2. Using **Python – Modules** and **Importing Packages**, explain what boundary an `import` statement actually creates
3. Using **Standard Import vs from…import**, explain why professional codebases prefer explicit namespaces even when they are more verbose

**Completion rule:**
If your answer explains *what happened* but not *why Python is designed this way*, it is incomplete.

---

Good — again, you’re pointing in the **right direction**, but your answers are still a bit *engineering-intuition driven*. Section F here needs to be **design-intent driven**, exactly as the notes frame it.

I’ll tighten each answer by **re-anchoring it to the notes’ mental model**, not by disputing what you said.

We are **not moving on yet**.

---

## 1️⃣ Why Python does not use a single global namespace

*(Python – Rationale for Packages)*

Your answer:

> because doing so would make things difficult, … collide … inefficient … disk space

### What’s right

* ✔ Namespace collision risk
* ✔ Scalability concerns

### What’s missing (and important)

The notes are *not* arguing primarily from performance or disk space.
They’re arguing from **cognitive and architectural discipline**.

### What the note is actually saying

Packages exist to enforce **conceptual boundaries**:

* Separate concerns
* Separate responsibilities
* Separate ownership of names

The key idea is not “efficiency”, it’s **meaning preservation**.

### Correct, note-aligned reconstruction

> Python avoids a single global namespace because packages enforce conceptual and naming boundaries, preventing collisions and allowing code to scale in clarity, ownership, and reasoning as systems grow.

This reframes the problem as **human-scale reasoning**, not machine constraints.

---

## 2️⃣ What boundary an `import` actually creates

*(Python – Modules, Importing Packages)*

Your answer:

> import statement creates a boundary on what all external packages to load into script's memory

### Why this is incomplete

* “Load into memory” is a side effect, not the intent
* The note is precise about **names**, not memory

### What the notes emphasize

An import establishes a **namespace boundary**, not just availability.

Specifically:

* Code is executed once
* Names are bound under a module namespace
* Access is mediated through that boundary

### Correct, note-aligned reconstruction

> An import creates a namespace boundary that controls how external names are accessed, making the origin and ownership of functionality explicit within the importing module.

This is why `helpers.add` mattered in the exercise.

---

## 3️⃣ Why professionals prefer explicit namespaces

*(Standard Import vs from…import)*

Your answer:

> as explicit namespace have lower risk of conflict

### This is correct — but underspecified

The notes go one step deeper.

Conflict avoidance is a **symptom**, not the core reason.

### What the note is actually asserting

Explicit imports:

* Preserve traceability
* Make dependencies visible
* Allow readers to reason locally about code

The goal is **maintainability**, not just safety.

### Correct, note-aligned reconstruction

> Professional codebases prefer explicit namespaces because they preserve name origin and dependency clarity, reducing ambiguity and making code easier to reason about, audit, and maintain as systems grow.

That’s the design intent.

---

## ✅ Locked, note-faithful mental models (final)

Here is the **clean version** you should now hold:

1. **Why packages exist**
   → Packages enforce conceptual and naming boundaries, allowing Python systems to scale without ambiguity or collision.

2. **What an import creates**
   → An import establishes a namespace boundary that controls name access and makes ownership explicit.

3. **Why explicit imports are preferred**
   → Because they preserve traceability and dependency clarity, which matters more than brevity in large systems.

---