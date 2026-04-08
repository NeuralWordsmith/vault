# Data Types as Behavioral Contracts

This exercise covers **exactly**:

* [[Python - Data Types]]
* [[Python - type() Function]]

Focus:

* Runtime typing
* Observation of type, not assumption
* Preventing silent errors

---

## **Part 0 — Environment Setup**

We return to a **script**.
Type behavior only becomes unambiguous when execution is fixed.

### 0.1 Create a new script

```bash
touch data_types_contracts.py
```

Open it in your editor.

---

## **A. Why this exists (the real problem)**

Beginners often think:

> “A number is a number.”

Python disagrees.

The real problem data types solve is **behavioral ambiguity**.

Same-looking values can:

* Support different operations
* Fail differently
* Produce subtly wrong results without errors

Python is **dynamically typed**, which means:

* Types exist at runtime
* The interpreter decides behavior *when code runs*, not when it’s written

This flexibility is powerful — and dangerous if you *assume* types instead of observing them.

---

## **B. The mechanism (what actually happens)**

We will now observe how **type controls behavior**.

---

### **B.1 Same operator, different behavior**

Put this into `data_types_contracts.py`:

```python
a = 10
b = 5

print(a + b)
```

Run it.

**Observe**

* Numeric addition

Now modify the file:

```python
a = "10"
b = "5"

print(a + b)
```

Run it.

**Observe**

* No error
* Result is `"105"`

**Critical observation**

* Same operator (`+`)
* Completely different behavior
* Python followed **type rules**, not visual appearance

This is what “data types as contracts” means:

> The type defines what operations *mean*.

---

### **B.2 Runtime typing (not compile-time)**

Modify the file:

```python
x = 10
print(type(x))

x = "ten"
print(type(x))
```

Run it.

**Observe**

* Same variable name
* Different types at different times

Python does **not** lock a variable to a type.
The name simply rebinds to different objects.

---

### **B.3 Using `type()` to observe, not guess**

Add:

```python
value = 3.14
print(type(value))
```

Then:

```python
value = True
print(type(value))
```

**Observe**

* Types are explicit at runtime
* No guessing required
* Python exposes this information directly

This is not debugging — this is **inspection**.

---

## **C. Failure exercise (silent error)**

### **C.1 A bug that does not crash**

Put this into the file:

```python
price = "100"
tax_rate = 0.18

total = price + price * tax_rate
print(total)
```

Run it.

**Observe**

* The script crashes

Now change it to:

```python
price = "100"
discount = "20"

final_price = price + discount
print(final_price)
```

Run it.

**Observe**

* No crash
* Output is `"10020"`

**What went wrong**

* The program ran
* The result is wrong
* No error warned you

This is worse than a crash.

---

## **D. Expected observations (self-verification)**

You should now clearly see:

* Types control behavior
* Operators are *polymorphic*
* Python checks types **at runtime**
* Wrong types can silently produce wrong results

If you think:

> “If it runs, it must be correct”

that belief is now broken — as it should be.

---

## **E. Correct usage pattern (professional discipline)**

Professionals follow one rule:

> Never assume a type. Observe or enforce it.

Common practices:

* Use `type()` during exploration
* Convert explicitly (`int()`, `float()`, `str()`) when needed
* Keep data clean at boundaries (inputs, files, APIs)

Mental model:

> A data type is a **behavioral contract** between you and the interpreter.

Break the contract, and Python will still run — but betray you quietly.

---

## **F. Mental model check**

Answer **precisely**:

1. Why the same operator can behave differently in Python
2. What “runtime typing” actually means
3. Why silent type errors are more dangerous than crashes

When you’re ready, respond — and we’ll tighten the model if needed before moving on.

---

# After my Response

---

## 1️⃣ “operator behave depending on the value”

This is **incorrect** in a subtle but critical way.

### What’s wrong

* Operators do **not** behave based on the *value*
* They behave based on the **type of the object**

Values can look similar and behave differently.

### Correct mental model

The operator dispatches behavior based on **type**, not value.

Precise correction:

> In Python, operators behave differently depending on the **data types of the operands**, not their apparent values.

Why this distinction matters:

* `"10"` and `10` *look* related
* They are **different types**
* Operators follow type rules, not human interpretation

If you say “value”, you’ll later expect `"5" * 2` to behave like `5 * 2` — and that’s how silent bugs start.

---

## 2️⃣ “it means that it checks type at runtime, types are explicit at runtime”

This is mostly right, but incomplete.

### What’s missing

You didn’t contrast it with what it is *not*.

### Correct mental model

Runtime typing means:

> Python determines and enforces type behavior **when each line executes**, not before the program runs.

Important consequences:

* The same variable name can refer to different types at different times
* Errors appear only when the problematic line is executed
* Some type mistakes never raise errors at all

So the danger is not just *when* checking happens — but **how late** it happens.

---

## 3️⃣ “why?” — Why silent type errors are more dangerous than crashes

This is the key insight. Let’s lock it in.

---

## 🔥 Why silent type errors are worse than crashes

### A crash is loud and honest

When Python crashes:

* Execution stops
* You know *something is wrong*
* You are forced to investigate

A crash protects you.

---

### A silent type error is quiet and deceptive

When Python runs with the wrong types:

* Execution continues
* Output looks reasonable
* No alarm is raised
* Wrong results propagate downstream

This is catastrophic in:

* Data analysis
* Machine learning
* Finance
* Science

Because:

> You may build *correct-looking conclusions on incorrect data*.

---

### Concrete contrast

Crash (safe failure):

```python
price = "100"
tax = 0.18
total = price + price * tax
```

You are stopped.
Bug contained.

Silent failure (dangerous):

```python
price = "100"
discount = "20"
final = price + discount
```

Program runs.
Result is wrong.
No warning.

This is why professionals fear silent errors more than crashes.

---

## ✅ Corrected reference-grade answers

Here is how your answers should sound when the model is precise:

1. **Why operators behave differently**
   → Because operators dispatch behavior based on the data types of their operands, not their apparent values.

2. **What runtime typing means**
   → Python determines and enforces type behavior at execution time, allowing names to bind to different types over a program’s lifetime.

3. **Why silent type errors are more dangerous than crashes**
   → Because they allow programs to continue running and produce plausible but incorrect results, making bugs harder to detect and more damaging.

---