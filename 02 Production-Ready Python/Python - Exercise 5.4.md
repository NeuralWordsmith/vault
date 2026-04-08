## **2D NumPy Arrays**

**Trajectory (explicit):**

> *From “arrays as vectors” → to “arrays as structured data”*

This exercise answers one final question:

> *What changes when data stops being a list of values and becomes a table?*

Once this is clear, NumPy stops expanding conceptually.

---

## **Part 0 — Environment Setup (Script Mode)**

Create a final file for this chapter:

```bash
touch numpy_2d_arrays.py
```

Open it.

---

## **A. Why this exists (capstone motivation)**

So far:

* 1D arrays → vectors
* Operations → element-wise
* Conditions → masks

Real data is rarely flat.

This exercise exists to show that **2D arrays are not “lists of lists”** —
they are **single objects with shape, structure, and rules**.

---

## **B. Creating a 2D array (one object, not nested lists)**

Put this into `numpy_2d_arrays.py`:

```python
import numpy as np

data = np.array([
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90]
])

print(data)
print("shape:", data.shape)
```

Run it.

### Observe

* `data` is one object
* Shape is `(3, 3)`
* Rows and columns are *structural*, not conceptual

This is **not** a list of lists.
It’s a **2D numerical structure**.

---

## **C. Indexing: row-first, then column**

Add:

```python
print(data[0])
print(data[0][1])
print(data[0, 1])
```

Run it.

### Observe

* `data[0]` → entire row
* `data[0, 1]` → single element
* Comma-based indexing is **native**, not syntactic sugar

This encodes **row, column semantics** directly.

---

## **D. Slicing preserves structure**

Add:

```python
print(data[:, 1])      # all rows, column 1
print(data[1:, :2])    # rows 1 onward, first two columns
```

Run it.

### Observe

* Slices return arrays
* Shape changes, but structure remains
* You are slicing **dimensions**, not lists

This is where NumPy diverges completely from Python lists.

---

## **E. Element-wise operations scale to 2D automatically**

Add:

```python
print(data * 2)
print(data + 5)
```

Run it.

### Observe

* Same operators
* Same semantics
* Applied across both dimensions

Nothing new was added — the **array contract scales**.

---

## **F. The critical moment: view vs copy**

Add this:

```python
subset = data[:, 1]
subset[0] = 999

print("subset:", subset)
print("data:", data)
```

Run it.

### Observe

* Original data changed
* No warning
* No explicit mutation of `data`

This is **the most important moment** in NumPy.

Do **not** explain yet.

---

## **G. Idiomatic indexing replaces control logic**

Add:

```python
mask = data > 50
print(mask)
print(data[mask])
```

Run it.

### Observe

* Mask is 2D
* Selection is flattened
* Logic expressed as data

This is the final conceptual shift.

---

## **H. Mental model check — note-aligned (final, mandatory)**

Answer with **design intent**, not mechanics.

1. Explain why a 2D NumPy array is a *single object with shape*, not a nested collection
2. Explain how row/column indexing expresses *structure*, not traversal
3. Explain why slicing often produces **views**, and why this is an intentional trade-off
4. Explain how idiomatic indexing (slices + masks) replaces control flow in numerical programs

**Final completion rule:**
If your explanation frames NumPy as “optimized Python” instead of a **different data model**, it is incomplete.

---

### **1️⃣ Why a 2D NumPy array is a *single object with shape*, not a nested collection**

A 2D NumPy array is designed as **one contiguous numerical structure** with an explicit `shape`, not as a list of lists, because numerical operations require **global consistency** across dimensions.

* All elements share:

  * the same data type
  * the same memory layout
* Rows and columns are **logical views** over the same underlying data, not independent containers

This design ensures that:

* operations apply uniformly
* slicing preserves numerical meaning
* memory layout stays predictable

In short:

> **Structure is a property of the array itself, not of nested containers.**

---

### **2️⃣ How row/column indexing expresses *structure*, not traversal**

NumPy indexing (`array[row, column]`) does **not** mean:

> “Go into this list, then into another list…”

It means:

> “Select along defined dimensions of a structured dataset.”

Row/column indexing:

* operates over **axes**
* encodes *positional meaning*, not iteration order
* makes intent explicit (row selection vs column selection)

This is why:

* `array[0]` returns a row
* `array[:, 1]` returns a column
* slicing works consistently across dimensions

In short:

> **Indexing describes *what part of the structure* you want, not *how to reach it*.**

---

### **3️⃣ Why slicing often produces *views*, and why this is intentional**

NumPy slicing produces **views** (not copies) because:

* copying large numerical datasets is expensive
* many numerical workflows depend on *working with subsets* of the same data
* performance and memory efficiency are first-class design goals

This is an intentional trade-off:

* ✅ Fast, memory-efficient operations
* ⚠️ Requires discipline to avoid unintended mutation

The design assumes:

> *You are reasoning about data, not blindly modifying it.*

That’s why NumPy makes views cheap — and responsibility explicit.

---

### **4️⃣ How idiomatic indexing replaces control flow in numerical programs**

In NumPy:

* conditions produce **arrays**
* logic becomes **data**
* selection happens through **indexing**, not `if` statements

Instead of:

* looping
* branching
* appending

You:

* express conditions as boolean arrays
* apply them directly to data
* let the array semantics handle selection

This shifts numerical programming from:

> *step-by-step instructions*
> to
> *declarative data transformations*

In short:

> **Control flow is replaced by data flow.**

---

## **The single sentence that ties everything together**

If you remember nothing else, remember this:

> **NumPy is not optimized Python — it is a different data model where structure, logic, and computation live in arrays, not in control flow.**

That’s the capstone insight.

---