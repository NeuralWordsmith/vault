# Exercise 1.4 — Making Programs Speak

*(The `print()` command)*

This exercise covers **exactly**:

* [[Python - print Command]]

Focus:

* Visibility of state
* Why scripts are silent without `print()`
* Debugging mindset

---

## **Part 0 — Environment Setup**

We stay in **script mode**.

### 0.1 Ensure you are at the system shell

You should **not** see `>>>` or `In [ ]:`.

---

### 0.2 Create a new script

**Instruction**

```bash
touch print_visibility.py
```

Open it in your editor.

---

## **A. Why this exists (the real problem)**

Programs *always* compute things.

But computation alone is useless if:

* You can’t see intermediate values
* You can’t verify assumptions
* You can’t tell whether logic executed at all

Scripts are **silent by default**.

This is intentional.

The real problem `print()` solves is:

> *Making invisible program state visible to humans.*

Not logging.
Not formatting.
**Observation.**

---

## **B. The mechanism (what actually happens)**

We’ll now observe the difference between:

* Computation
* Visibility

---

### **B.1 Computation without visibility**

Put this into `print_visibility.py`:

```python
x = 10
y = x * 3
z = y - 5
```

Run the script:

```bash
python print_visibility.py
```

**Observe**

* Nothing appears
* No error
* Script completed successfully

**Important**

* The program *did work*
* You just didn’t see it

Silence ≠ failure
Silence = no explicit output

---

### **B.2 Making state visible**

Modify the file:

```python
x = 10
print(x)

y = x * 3
print(y)

z = y - 5
print(z)
```

Run it again.

**Observe**

* Each value appears
* In execution order
* Exactly when you asked for it

**What actually happened**

* `print()` sends a string representation of the value to standard output
* Python did *not* change the computation
* You only added **visibility hooks**

---

## **C. Failure exercise (common beginner mistake)**

### **C.1 Expecting implicit output in scripts**

Beginners often write:

```python
x = 10
x
```

Run it.

**Observe**

* Still nothing

**What went wrong**

* `x` alone is an expression
* Scripts do **not** auto-display expressions
* That behavior belongs **only** to interactive shells

Shell convenience ≠ program behavior

---

### **C.2 Overusing `print()` blindly**

Now write:

```python
print("hello")
print("hello")
print("hello")
```

Run it.

**Observe**

* Output appears
* But conveys no information

**What went wrong**

* `print()` without intent creates noise
* Noise hides signal
* This is how debugging becomes guessing

---

## **D. Expected observations (self-verification)**

You should now clearly see:

* Scripts compute silently
* Visibility must be **explicit**
* `print()` does not change logic
* Output reflects *execution order*
* Meaningful prints reveal *state*, not decoration

If you think:

> “`print()` is just for showing results”

that model is incomplete.

---

## **E. Correct usage pattern (debugging mindset)**

Professionals use `print()` to answer **specific questions**:

* Did this line run?
* What is the value *right now*?
* Did this variable change when I expected?

They do **not**:

* Scatter prints randomly
* Rely on prints as final output in serious systems
* Confuse debugging output with program results

Mental model:

> `print()` is a probe, not a feature.

It is a temporary window into program state.

---