# Introduction to Python - Exercise Plan


# 📘 Chapter 1: Introduction to Python

*(Mental Model: “What kind of tool Python actually is, and how we interact with it”)*

## Exercise Cluster 1.1 — Why Python Exists & Why It Won

> [[Python 1 - Exercise 1.1]]

Covers:

* [[Python - History & Creator]]
* [[Python - Key Characteristics]]
* [[Python - Role in Data Science]]

**Single exercise**, because these answer one question:

> *Why did Python survive and dominate while many languages didn’t?*

Focus:

* Design intent → ecosystem → consequences
* Readability as an *economic* advantage
* Why “one-language pipeline” matters

---

## Exercise Cluster 1.2 — Python as an Interactive System

> [[Python 1 - Exercise 1.2]]

Covers:

* [[Python - Python Shell]]
* [[Python - IPython]]

**Single flow**, two environments, same code.

Focus:

* REPL feedback loop
* Introspection vs execution
* Observation of state, not output alone

---

## Exercise Cluster 1.3 — Python as a Scripted System

> [[Python 1 - Exercise 1.3]]

Covers:

* [[Python - Python Scripts]]
* [[Python - Interactive Shell vs Scripts]]
* [[Python - Recommended Workflow for Learning]]

Focus:

* Execution order
* Determinism vs exploration
* Why scripts are “real programs”

---

## Exercise Cluster 1.4 — Making Programs Speak

> [[Python 1 - Exercise 1.4]]

Covers:

* [[Python - print Command]]

Focus:

* Visibility of state
* Why scripts are silent without print
* Debugging mindset

---

# 📘 Chapter 2: Variables and Types

*(Mental Model: “Names point to objects — types control behavior”)*

## Exercise Cluster 2.1 — Variables as Memory References

> [[Python 1 - Exercise 2.1]]

Covers:

* [[Python - Variables]]
* [[Python - Variable Assignment]]
* [[Python - Using Variables in Calculations]]
* [[Python - Variables for Code Reproducibility]]

Focus:

* Names ≠ values
* Rebinding vs recalculation
* Reproducibility through separation of data and logic

---

## Exercise Cluster 2.2 — Data Types as Behavioral Contracts

> [[Python 1 - Exercise 2.2]]

Covers:

* [[Python - Data Types]]
* [[Python - type() Function]]

Focus:

* Runtime typing
* Observation of type, not assumption
* Preventing silent errors

---

## Exercise Cluster 2.3 — Numeric Types Under the Hood

> [[Python 1 - Exercise 2.3]]

Covers:

* [[Python - Integer (int) Data Type]]
* [[Python - Float Data Type]]

Focus:

* Exact vs approximate
* Precision errors you can *see*
* Why floats “lie”

---

## Exercise Cluster 2.4 — Non-Numeric Types

> [[Python 1 - Exercise 2.4]]

Covers:

* [[Python - String (str) Data Type]]
* [[Python - Boolean (bool) Data Type]]
* [[Python - Type-Dependent Operator Behavior]]

Focus:

* Same operators, different meanings
* String concatenation vs numeric addition
* Boolean logic as control foundation

---

# 📘 Chapter 3: Python Lists

*(Mental Model: “Ordered, mutable collections with reference semantics”)*

## Exercise Cluster 3.1 — Lists as a Data Type

> [[Python 1 - Exercise 3.1]]

Covers:

* [[Python - Basic Data Types Cheatsheet]]
* [[Python - Lists]]
* [[Python - List Creation]]
* [[Python - Lists with Mixed Data Types]]
* [[Python - Nested Lists]]
* [[Python - List as a Data Type]]

Focus:

* Why lists exist
* Mutability
* Structural flexibility

---

## Exercise Cluster 3.2 — Subsetting & Indexing Rules

> [[Python 1 - Exercise 3.2]]

Covers:

* [[Python - List Subsetting]]
* [[Python - List Indexing]]
* [[Python - Zero-Based Indexing]]
* [[Python - Negative List Indexing]]
* [[Python - List Slicing]]
* [[Python - List Slice Inclusivity Rule]]
* [[Python - Omitting Indices in List Slicing]]

Focus:

* Half-open intervals
* Mental model of positions
* Avoiding off-by-one bugs

---

## Exercise Cluster 3.3 — List Mutation & Memory Model

> [[Python 1 - Exercise 3.3]]

Covers:

* [[Python - List Manipulation]]
* [[Python - Changing List Elements]]
* [[Python - Changing List Slices]]
* [[Python - List Concatenation]]
* [[Python - Deleting List Elements]]
* [[Python - List Memory Model (Reference vs. Value)]]
* [[Python - Implicit List Copying (Assignment)]]
* [[Python - Explicit List Copying (Cloning)]]
* [[Python - List Manipulation & Memory Model Relationship]]

Focus:

* In-place mutation
* Aliasing bugs
* Professional copying patterns

---

# 📘 Chapter 4: Functions and Packages

*(Mental Model: “Abstraction + behavior bound to data”)*

## Exercise Cluster 4.1 — Functions as Interfaces

> [[Python 1 - Exercise 4.1]]

Covers:

* [[Python - Functions]]
* [[Python - Function Calls (Input-Process-Output)]]
* [[Python - Function Arguments]]
* [[Python - Optional Arguments]]

Focus:

* Data flow
* Contracts
* Defaults as design decisions

---

## Exercise Cluster 4.2 — Built-ins & Introspection

> [[Python 1 - Exercise 4.2]]

Covers:

* [[Python - max() Function]]
* [[Python - round() Function]]
* [[Python - help() Function]]
* [[Python - Discovering Built-in Functions]]

Focus:

* Leveraging existing tools
* Inspect before using
* Trust but verify

---

## Exercise Cluster 4.3 — Objects & Methods

> [[Python 1 - Exercise 4.3]]

Covers:

* [[Python - Objects]]
* [[Python - Methods]]
* [[Python - Method Dot Notation]]
* [[Python - Type-Specific Methods]]
* [[Python - List Methods]]
* [[Python - String Methods]]
* [[Python - Mutating Methods]]
* [[Python - Functions vs Methods]]

Focus:

* Everything-is-an-object
* Mutating vs non-mutating behavior
* Why method choice matters

---

## Exercise Cluster 4.4 — Packages & Imports

> [[Python 1 - Exercise 4.4]]

Covers:

* [[Python - Packages]]
* [[Python - Rationale for Packages]]
* [[Python - Modules]]
* [[Python - Common Data Science Packages]]
* [[Python - Installing Packages with pip]]
* [[Python - Importing Packages]]
* [[Python - Standard Import Statement]]
* [[Python - Importing with an Alias]]
* [[Python - Importing Specific Functions (from...import)]]
* [[Python - Standard Import vs from...import]]

Focus:

* Namespaces
* Dependency discipline
* Professional import style

---

# 📘 Chapter 5: NumPy

*(Mental Model: “Contiguous memory + vectorized computation”)*

## Exercise Cluster 5.1 — Why NumPy Exists

> [[Python 1 - Exercise 5.1]]

Covers:

* [[Python - List Calculation Limitations]]
* [[Python - NumPy (Numeric Python)]]

Focus:

* Performance bottlenecks
* Why Python lists fail at math

---

## Exercise Cluster 5.2 — NumPy Arrays

> [[Python - Exercise 5.2]]

Covers:

* [[Python - NumPy Array]]
* [[Python - Installing & Importing NumPy]]
* [[Python - Creating a NumPy Array]]
* [[Python - NumPy Array Single Data Type Constraint]]

Focus:

* Homogeneity
* Memory layout
* Type coercion

---

## Exercise Cluster 5.3 — Vectorized Operations & Subsetting

> [[Python - Exercise 5.3]]

Covers:

* [[Python - NumPy Element-wise Operations]]
* [[Python - List Concatenation vs NumPy Array Addition]]
* [[Python - Subsetting NumPy Arrays]]
* [[Python - Subsetting NumPy Arrays with Indices]]
* [[Python - Subsetting NumPy Arrays with Boolean Arrays]]

Focus:

* Broadcasting
* Boolean masks
* Performance observation

---

## Exercise Cluster 5.4 — 2D NumPy Arrays

> [[Python - Exercise 5.4]]

Covers **all 2D array concepts**, including:

* Creation
* `.shape`
* Indexing styles
* Slicing
* Element-wise ops

Grouped intentionally to expose:

* View vs copy
* Row/column semantics
* Idiomatic indexing

---

## Exercise Cluster 5.5 — NumPy Statistics & Simulation

> [[Python 1 - Exercise 5.5]]

Covers:

- [[NumPy - Exploratory Data Analysis with NumPy]]
- [[NumPy - Summarizing Statistics]]
- [[NumPy - Mean (np.mean)]]
- [[NumPy - Median (np.median)]]
- [[NumPy - Correlation Coefficient (np.corrcoef)]]
- [[NumPy - Standard Deviation (np.std)]]
- [[NumPy - Data Sanity Check]]
- [[NumPy - NumPy Functions vs Basic Python Functions]]
- [[NumPy - Data Type Homogeneity & Calculation Speed Relationship]]
- [[NumPy - Data Simulation with Random Distributions]]
- [[NumPy - Stacking Arrays (np.column_stack)]]

Focus:

- Insight before modeling
- Sanity checks
- Feature matrix construction

---

## Links present in this note

1. [[Python 1 - Exercise 1.1]]
2. [[Python 1 - Exercise 1.2]]
3. [[Python 1 - Exercise 1.3]]
4. [[Python 1 - Exercise 1.4]]
5. [[Python 1 - Exercise 2.1]]
6. [[Python 1 - Exercise 2.2]]
7. [[Python 1 - Exercise 2.3]]
8. [[Python 1 - Exercise 2.4]]
9. [[Python 1 - Exercise 3.1]]
10. [[Python 1 - Exercise 3.2]]
11. [[Python 1 - Exercise 3.3]]
12. [[Python 1 - Exercise 4.1]]
13. [[Python 1 - Exercise 4.2]]
14. [[Python 1 - Exercise 4.3]]
15. [[Python 1 - Exercise 4.4]]
16. [[Python 1 - Exercise 5.1]]
17. [[Python - Exercise 5.2]]
18. [[Python - Exercise 5.3]]
19. [[Python - Exercise 5.4]]
20. [[Python 1 - Exercise 5.5]]