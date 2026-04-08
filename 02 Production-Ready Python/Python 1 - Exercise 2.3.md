# Numeric Types Under the Hood

*(Integers vs Floats)*

This exercise covers **exactly**:

* [[Python - Integer (int) Data Type]]
* [[Python - Float Data Type]]

Focus:

* Exact vs approximate
* Precision errors you can *see*
* Why floats “lie”

---

## **Part 0 — Environment Setup**

We stay in **script mode**.
Precision issues are easiest to see when output is controlled.

### 0.1 Create a new script

```bash
touch numeric_types_under_the_hood.py
```

Open it in your editor.

---

## **A. Why this exists (the real problem)**

Most beginners assume:

> “Numbers are numbers.”

This assumption is false — and dangerous.

The real problem numeric types solve is **how numbers are represented in memory**.

Different numbers require different trade-offs:

* Accuracy
* Range
* Performance

Python exposes this explicitly by having **multiple numeric types** with different guarantees.

---

## **B. The mechanism (what actually happens)**

We will now *observe*, not theorize.

---

### **B.1 Integers are exact**

Put this into the file:

```python
a = 10
b = 3

print(a / b)
print(a * b)
```

Run it.

**Observe**

* Division produces a float
* Multiplication is exact

Now add:

```python
x = 10 ** 50
print(x)
print(type(x))
```

Run again.

**Observe**

* The number prints exactly
* No overflow
* Type is `int`

**What this means**

* Python integers have **arbitrary precision**
* They grow as large as memory allows
* No rounding errors

Integers do **not** lie.

---

### **B.2 Floats are approximations**

Now add:

```python
f = 0.1
print(f)
print(type(f))
```

Run it.

Looks fine so far.

Now add:

```python
print(0.1 + 0.2)
```

Run again.

**Observe**

* You do **not** get `0.3`
* You get something like `0.30000000000000004`

This is not a Python bug.

---

### **B.3 Making the lie visible**

Add:

```python
result = 0.1 + 0.2
print(result == 0.3)
```

Run it.

**Observe**

* The comparison is `False`

This is the moment most beginners realize:

> Floats are not exact numbers.

---

## **C. Failure exercise (common beginner mistake)**

### **C.1 Trusting float equality**

Add:

```python
balance = 0.0

balance += 0.1
balance += 0.1
balance += 0.1

print(balance)
print(balance == 0.3)
```

Run it.

**Observe**

* The printed value looks close
* The equality check fails

**What went wrong**

* Each operation introduced a tiny error
* Errors accumulate
* Equality comparison exposes the lie

This is why:

* Financial software
* Scientific simulations
* ML preprocessing

must treat floats carefully.

---

## **D. Expected observations (self-verification)**

At this point, you should clearly see:

* Integers are exact and unbounded
* Floats are approximations
* Float arithmetic can visibly drift
* Equality checks on floats are unreliable

If you still think:

> “This is just rounding for display”

that mental model is **wrong**.

---

## **E. Correct usage pattern (professional reality)**

Professionals follow these rules:

* Use **integers** for:

  * Counting
  * Indexing
  * Exact quantities

* Use **floats** for:

  * Measurements
  * Continuous values
  * Approximations

* Never compare floats directly for equality

* Compare within a **tolerance** (you’ll learn this properly later)

Mental model:

> Integers model *math*.
> Floats model *measurement*.

Measurements are never perfectly precise.

---

## **F. Mental model check**

Answer **precisely**:

1. Why Python integers don’t overflow
2. Why `0.1 + 0.2` does not equal `0.3`
3. Why direct equality checks on floats are unsafe

---
# After my response

Good — this time you’re **conceptually right**, but still a bit **hand-wavy**. I’ll sharpen each answer so the model is *mechanical*, not poetic.

We’ll lock it after this.

---

## 1️⃣ “because they are exact, whereas the floats are approximation”

This is **directionally correct**, but incomplete.

### What’s missing

You explained *what*, not *why*.

### Precise correction

Python integers don’t overflow because:

> Python integers are implemented with arbitrary precision, allocating more memory as needed instead of being constrained to a fixed number of bits.

So the **reason** is not just “exactness”, but:

* No fixed-width storage
* No maximum size (except memory)

Correct answer:

> Python integers don’t overflow because they are stored with arbitrary precision rather than a fixed bit-size representation.

---

## 2️⃣ “0.1 and 0.2 are floats in themselves which on calculation make another float and not exact 0.3”

This is **mostly right**, but still vague.

### What’s missing

You didn’t explain *why* those floats are inexact to begin with.

### Precise correction

The real reason:

> Floats are stored in binary (base-2), and numbers like 0.1 and 0.2 cannot be represented exactly in binary, so Python stores approximations of them.

Then:

* Adding two approximations produces another approximation
* The result is close to 0.3, but not exactly equal

Correct answer:

> `0.1 + 0.2` is not exactly `0.3` because 0.1 and 0.2 cannot be represented exactly in binary floating-point, so their sum carries a small rounding error.

---

## 3️⃣ “as 2 approximations cannot be equal”

This is **not wrong**, but too weak to rely on.

### What’s missing

You didn’t connect it to **comparison semantics**.

### Precise correction

The real danger is:

> Float equality compares exact binary representations, not “closeness”.

So even tiny differences matter.

Correct answer:

> Direct equality checks on floats are unsafe because floating-point arithmetic introduces small representation errors, and equality compares exact values rather than numerical closeness.

This is why professionals compare within tolerances — not because floats are “bad”, but because they are **approximations by design**.

---

## ✅ Locked reference-grade answers

Here’s the version you should internalize:

1. **Why Python integers don’t overflow**
   → Because Python integers use arbitrary-precision storage instead of fixed-width binary representations.

2. **Why `0.1 + 0.2 != 0.3`**
   → Because 0.1 and 0.2 cannot be represented exactly in binary floating-point, so their sum contains a small rounding error.

3. **Why float equality checks are unsafe**
   → Because floating-point comparisons test exact binary equality, not numerical closeness, making small rounding errors visible.

---