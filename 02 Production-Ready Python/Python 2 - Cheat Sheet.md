## Master Decision Chart — Python, Data, Simulation & Visualization

### 1. Control Flow & Logic

| Concept                          | What It Does                    | When to Use             | Common Failure Mode         |
| -------------------------------- | ------------------------------- | ----------------------- | --------------------------- |
| `if / elif / else`               | Chooses one execution path      | One-time decision       | Wrong order → dead branches |
| `while` loop                     | Repeats until condition changes | Unknown iteration count | Infinite loop               |
| `for` loop                       | Iterates over a structure       | Known iterable          | Manual indexing             |
| Boolean operators (`and/or/not`) | Combine scalar truths           | Control flow            | Used on arrays              |
| Vectorized logic                 | Element-wise truth              | Data filtering          | Ambiguous truth errors      |

---

### 2. Data Structures & Iteration Semantics

| Structure        | Primary Role     | Iteration Yields | Use When        | Avoid When            |
| ---------------- | ---------------- | ---------------- | --------------- | --------------------- |
| List             | Ordered sequence | Elements         | Order matters   | Key-based lookup      |
| Dictionary       | Semantic mapping | Keys / (k,v)     | Meaningful keys | Order-dependent logic |
| NumPy array      | Numeric grid     | Scalars / arrays | Math-heavy ops  | Python loops          |
| Pandas DataFrame | Tabular data     | Columns / rows   | Data analysis   | Row-wise loops        |

---

### 3. Pandas Selection & Indexing

| Method              | Selection Basis   | Stable Under Reordering | Risk                |
| ------------------- | ----------------- | ----------------------- | ------------------- |
| `[]`                | Context-dependent | ❌                       | Ambiguity           |
| `.loc`              | Labels            | ✅                       | Missing labels      |
| `.iloc`             | Position          | ❌                       | Fragile indexing    |
| Series vs DataFrame | Dimensionality    | —                       | Silent shape change |

---

### 4. Iteration in Pandas (What Not to Do)

| Method        | Purpose        | Performance | Verdict        |
| ------------- | -------------- | ----------- | -------------- |
| `iterrows()`  | Inspection     | Very slow   | ❌ Anti-pattern |
| `apply()`     | Row/column ops | Medium      | ⚠️ Acceptable  |
| Vectorization | Column ops     | Fast        | ✅ Preferred    |

---

### 5. Dictionaries: Mutation Rules

| Operation  | Syntax     | Hidden Rule     | Risk        |
| ---------- | ---------- | --------------- | ----------- |
| Add        | `d[k] = v` | Key must be new | Overwrite   |
| Update     | `d[k] = v` | Key exists      | Silent loss |
| Delete     | `del d[k]` | Key must exist  | `KeyError`  |
| Membership | `k in d`   | Hash lookup     | None        |

---

### 6. Randomness & Simulation

| Concept           | Meaning          | Why It Matters          |
| ----------------- | ---------------- | ----------------------- |
| Pseudo-randomness | Deterministic    | Debuggable              |
| Random seed       | Sequence control | Reproducibility         |
| `rand()`          | Continuous       | Probabilities           |
| `randint()`       | Discrete         | Events                  |
| Simulation        | Repetition       | Approximate probability |

---

### 7. Random Walks & State

| Element      | Role                | Key Risk             |
| ------------ | ------------------- | -------------------- |
| Random step  | Memoryless event    | Mis-mapping outcomes |
| Random walk  | State accumulation  | Bad initialization   |
| Path         | Trajectory          | Off-by-one errors    |
| Distribution | Aggregated outcomes | Too few trials       |

---

### 8. Distributions & Histograms

| Aspect               | What It Encodes | Risk                 |
| -------------------- | --------------- | -------------------- |
| Histogram            | Frequency shape | Bin choice           |
| Bins                 | Resolution      | Over/under-smoothing |
| Sample size          | Stability       | Noisy inference      |
| Simulation vs theory | Convergence     | False confidence     |

---

### 9. Visualization Mental Model

| Stage        | Purpose        | Mistake                   |
| ------------ | -------------- | ------------------------- |
| Plotting     | Stage intent   | Forget to render          |
| Labeling     | Context        | Ambiguity                 |
| Axis control | Interpretation | Misleading scale          |
| Styling      | Emphasis       | Decoration-first thinking |

---

# Python → Data → Simulation → Visualization

## One Complete Mental-Model Cheatsheet

---

## 1. Control Flow: Decisions vs Repetition

### Conditionals (`if / elif / else`)

* Purpose: **choose one path**
* Truth comes from **comparisons + boolean logic**
* Execution model: **top-down, first-true-wins**
* `else` is a *catch-all*, not a guarantee of correctness
* Indentation is logic, not formatting

**Use when:**
You need **one-time branching**, not repetition.

---

### `while` Loop

* Purpose: **repeat until the world changes**
* Condition checked **before every iteration**
* Correctness depends on **explicit termination**
* Primary risk: **infinite loops**

**Use when:**

* Iteration count is unknown
* Waiting for valid input, convergence, retries

**Avoid when:**

* Iterating over a known collection → use `for`

---

### `for` Loop

* Purpose: **iterate over a structure**
* The loop is stable; **the data structure defines behavior**
* Execution flow: one element per iteration, no manual index needed

**Use when:**

* Iteration target already exists (list, string, array, dict, DataFrame)

---

## 2. Boolean Logic: Scalar vs Vectorized

### Scalar Boolean Operators

* `and`, `or`, `not`
* Short-circuiting
* Operate on **single truth values**

**Used in:**

* `if`, `while`

---

### Vectorized Boolean Logic (NumPy / Pandas)

* Comparisons produce **boolean arrays / Series**
* Use:

  * `np.logical_and`
  * `np.logical_or`
  * `np.logical_not`
* Boolean masks are **data**, not conditions

**Key rule:**

> Filtering is *selection*, not control flow

---

## 3. Core Data Structures & Iteration Semantics

### Lists

* Ordered, index-based
* Best for **sequences**

Iteration yields: **elements**

---

### Dictionaries

* Key → value mapping
* Keys must be **unique + immutable**
* Iteration order is **not a semantic guarantee**
* Use `.items()` for safe iteration

Iteration yields:

* keys (default)
* `(key, value)` with `.items()`

---

### NumPy Arrays

* Homogeneous, numeric
* Optimized for **vectorized operations**
* Looping is usually a smell

Iteration:

* 1D: yields scalars
* ND: use `nditer()` if absolutely required

---

### Pandas DataFrames

* Tabular, heterogeneous
* Column-oriented
* Row-wise Python loops are an **anti-pattern**

**Golden rule:**

> Transform columns, don’t iterate rows

* `iterrows()` → inspection only
* `apply()` → compromise, not ideal
* Vectorization > apply > iterrows

---

## 4. Indexing & Selection (Critical for Pandas)

### Square Brackets `[]`

* Overloaded
* Context-dependent
* Convenient but ambiguous

---

### `.loc`

* Label-based
* Stable under sorting / reindexing
* Preferred for correctness

---

### `.iloc`

* Position-based
* Fragile if data order changes

---

### Series vs DataFrame

* Single brackets → Series
* Double brackets → DataFrame
* Dimensionality affects downstream behavior

---

## 5. Dictionaries: Mutation Rules

* Add & update use **same syntax**
* Behavior depends on **key existence**
* Deletion requires certainty (`in` check)
* Keys are immutable → lookup safety
* Dictionaries are mutable containers with strict invariants

---

## 6. Randomness & Simulation

### Pseudo-Randomness

* Fully deterministic
* Controlled by **seed**
* Same seed → same future

**Reproducibility exists to debug logic**, not to guarantee correctness.

---

### NumPy Random Generators

* `rand()` → continuous [0,1)
* `randint()` → discrete integers
* Randomness type must match the phenomenon

---

### Hacker Statistics

* Probability via **repetition**
* Simulation replaces closed-form math
* Trust comes from **scale**, not elegance

---

## 7. Random Walks (Stateful Randomness)

* Random step = memoryless
* Random walk = **state accumulation**
* Each step depends on previous position
* Bugs hide in initialization and update logic

**Shift:**
From “random values” → “random trajectories”

---

## 8. From Paths to Distributions

* Single run ≠ insight
* Aggregate **final states** across many simulations
* Histograms reveal structure
* Noise shrinks with sample size

Simulation ≈ theory **when assumptions hold and trials are large**

---

## 9. Histograms (Distribution Lens)

* Histogram = **lossy compression**
* Bins define the story
* Bin choice ≠ cosmetic
* `plt.hist()` automates counting + grouping

**Use for:**

* Shape
* Spread
* Skew
* Modality

**Not for:**
Exact values

---

## 10. Visualization as Communication

* Plotting is staged intent
* Nothing is “drawn” until rendered
* Customization controls interpretation
* Axis choices are high-risk, high-leverage

**Mental shift:**
Plots are arguments, not decorations.

---

## Final Calibration Rule

You are **correctly calibrated** if you can say:

* *Which abstraction I’m using (scalar vs vector, sequence vs mapping, path vs distribution)*
* *What assumptions that abstraction encodes*
* *What would silently break if those assumptions change*

---