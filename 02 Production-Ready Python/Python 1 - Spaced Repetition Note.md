# 📘 Spaced Repetition Note — Python → NumPy Mental Model Shift

*(Purpose: retain the **way of thinking**, not commands)*

---

## 1. Python’s Core Model: Names, Objects, and Boundaries

* **Names do not store values** — they bind to objects
* **Assignment copies references**, not data
* **Mutation changes objects**, rebinding changes names
* Bugs arise when multiple names point to the same mutable object

> Mental anchor: *Track object identity, not variable names.*

---

## 2. Lists: Flexible Containers, Not Mathematical Objects

* Lists are **general-purpose sequences**
* They can hold anything → no uniform meaning
* Operators (`+`, `*`) express **sequence behavior**, not math
* Element-wise math is **intentionally undefined**

> Mental anchor: *Lists prioritize flexibility over semantics.*

---

## 3. Functions vs Methods: Contracts, Not Syntax

* **Functions** → transform inputs → return outputs
* **Methods** → behavior bound to objects
* Same syntax does **not** imply same effect
* Some methods mutate, others return new objects — syntax does not warn you

> Mental anchor: *Always ask: “Does this mutate or return?”*

---

## 4. Imports & Packages: Namespaces as Discipline

* Imports create **namespace boundaries**, not just access
* Explicit imports preserve **traceability and ownership**
* `from … import …` trades brevity for ambiguity
* Import style is a **correctness decision**, not style preference

> Mental anchor: *Clarity beats convenience at scale.*

---

## 5. Why NumPy Exists (The Irreversible Shift)

* Python lists fail at math by **design**, not limitation
* Numerical computing requires:

  * uniform meaning
  * predictable memory
  * well-defined operations

NumPy exists because:

> *Math needs semantics before speed.*

---

## 6. NumPy Arrays: What You Pay, What You Get

**You give up:**

* Mixed types
* Structural flexibility
* Implicit safety

**You gain:**

* Homogeneity
* Contiguous memory
* Mathematical meaning
* Element-wise operations as the default

> Mental anchor: *Constraints buy semantics.*

---

## 7. Vectorization: Computation Model Change

* Arrays, not elements, are the unit of computation
* Operators apply to **entire datasets**
* Loops are replaced by **transformations**
* Speed is a consequence, not the goal

> Mental anchor: *Describe what, not how.*

---

## 8. Boolean Masks: Logic Becomes Data

* Comparisons produce **arrays**, not decisions
* Conditions are represented as data
* Selection happens via indexing, not control flow
* Logic moves from code → structure

> Mental anchor: *Conditions are arrays, not branches.*

---

## 9. 2D Arrays: Structure Is Explicit

* A 2D array is **one object with shape**, not nested lists
* Rows/columns are **axes**, not traversal paths
* Indexing expresses **structure**, not navigation
* Slicing often returns **views**, not copies — intentionally

> Mental anchor: *Shape defines meaning.*

---

## 10. The Final Unifying Model

Everything you learned converges to this:

> **Python = control, structure, orchestration**
> **NumPy = data, semantics, transformation**

Or in one line:

> **NumPy is not optimized Python — it is a different data model where structure, logic, and computation live in arrays, not in control flow.**

---