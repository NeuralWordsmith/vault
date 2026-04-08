## Chapter 1: Matplotlib
### Matplotlib Fundamentals & Plotting Strategy

* [[Python - Matplotlib Library]] – Matplotlib is a low-level, highly controllable foundation that most Python visualization tools build upon
* [[Python - Matplotlib Pyplot Subpackage]] – pyplot provides a state-based interface that trades explicitness for speed and convenience
* [[Python - Basic Matplotlib Plotting Workflow]] – plotting commands stage intent; rendering is a separate, explicit commitment
* [[Python - Importance of Data Visualization]] – visualizations are interpretive acts that can clarify or distort depending on design choices
* [[Python - Line Plots with Matplotlib]] – line plots encode continuity and are appropriate only when order and progression are real
* [[Python - Scatter Plots with Matplotlib]] – scatter plots expose raw relationships, density, and outliers without implying trends
* [[Python - Line Plot vs Scatter Plot]] – the decision to connect points is an analytical claim, not a cosmetic one

---

### Python - Histogram Visualization and Analysis

* [[Python - Histogram]] – A histogram summarizes a distribution, sacrificing precision to reveal shape
* [[Python - Histogram Bins]] – Bin count and boundaries directly determine signal vs. noise
* [[Python - Manual Histogram Creation Process]] – Histograms are built from range partitioning and counting, not magic
* [[Python - Creating Histograms with Matplotlib]] – Matplotlib automates histogram construction for fast exploration
* [[Python - plt.hist() Function]] – `plt.hist()` collapses binning and counting into a single, stateful call
* [[Python - Population Pyramid Histogram example]] – Histograms excel at comparative distribution analysis across conditions

---

### Matplotlib Plot Customization & Storytelling

* [[Python - Adding Data to Existing Plot Lists]] – Data aggregation choices directly shape the narrative before plotting
* [[Python - Adding Labels and Titles to Matplotlib Plots]] – Labels and titles are mandatory context, not optional polish
* [[Python - Customizing Axis Ticks with yticks()]] – Tick control clarifies scale but can easily mislead if misused
* [[Python - Plot Customization in Matplotlib]] – Customization is a discipline of intent, not a grab bag of options
* [[Python - Workflow for Enhancing a Matplotlib Plot]] – Effective plots emerge from ordered, incremental refinement

---
## Chapter 2: Dictionaries and Pandas

---

### Python - Dictionaries

* [[Python - Dictionaries]] – Dictionaries store data as key–value mappings optimized for semantic access
* [[Python - Dictionary Syntax and Creation]] – Dictionaries are initialized with `{key: value}` pairs and strict key rules
* [[Python - Accessing Dictionary Values using Keys]] – Square-bracket lookup is direct, fast, and error-prone if keys are missing
* [[Python - Dictionary Key-Value Lookup Efficiency]] – Hash tables give dictionaries their near-constant-time performance
* [[Python - Parallel Lists vs Dictionaries]] – Dictionaries eliminate index-coupling errors inherent in parallel lists

---

### **Manipulating Dictionaries**

* [[Python - Dictionary Operations]] – Dictionaries support add, update, and delete as first-class, constant-time mutations. Dictionaries are explicitly designed to evolve as program state changes
* [[Python - Adding Elements to a Dictionary]] – Assignment adds new keys when they do not already exist
* [[Python - Updating Dictionary Values]] – The same assignment syntax overwrites values when keys already exist
* [[Python - Deleting Dictionary Elements]] – Deletion removes key–value pairs and fails if assumptions about existence are wrong
* [[Python - Checking for Key Existence in Dictionaries]] – Existence checks prevent `KeyError` and unintended overwrites
* [[Python - Dictionary Key Uniqueness]] – Keys map to exactly one value via last-write-wins semantics
* [[Python - Dictionary Key Immutability]] – Immutable keys guarantee stable hashing and safe lookup
* [[02 Production-Ready Python/Python - Mutable vs Immutable Objects]] – Immutability explains why keys are restricted and values are not
* [[Python - Lists vs Dictionaries]] – Dictionaries trade ordered access for semantic, key-based correctness

---
### **Pandas, DataFrames, and Tabular Data**

* [[Python - Tabular Data]] – Real-world analytical data is modeled as observations × variables
* [[Python - Pandas Package]] – Pandas is the high-level toolkit for working with tabular data in Python
* [[Python - Pandas DataFrame]] – The DataFrame is the core 2D, labeled, heterogeneous data structure
* [[Python - DataFrame Structure (Index, Columns, Data)]] – Index and columns provide identity, alignment, and safety
* [[Python - Pandas & NumPy Relationship]] – Pandas wraps NumPy arrays with labels and semantics
* [[Python - Limitations of NumPy for Tabular Data]] – Homogeneous typing breaks mixed-type datasets
* [[Python - CSV (Comma Separated Values)]] – CSV is a simple, universal but type-agnostic storage format
* [[Python - Creating a DataFrame from a Dictionary]] – Best for small, programmatically generated datasets
* [[Python - Importing a CSV into a DataFrame using read_csv]] – The standard gateway from files to analysis

---
### **DataFrame Indexing & Selection**

* [[Python - DataFrame Indexing and Selection]] – Pandas offers multiple, distinct selection mechanisms with different guarantees
* [[Python - DataFrame Column Selection with Square Brackets]] – Square brackets are best for quick column access but are overloaded
* [[Python - DataFrame Row Selection with Slicing]] – Bracket slicing is position-based and ignores index labels
* [[Python - DataFrame Label-Based Selection with .loc]] – `.loc` selects by explicit labels and is robust to reordering
* [[Python - DataFrame Position-Based Selection with .iloc]] – `.iloc` selects by integer position and is fragile to data movement
* [[Python - .loc vs .iloc]] – The core distinction is semantic labels vs physical order
* [[Python - Square Bracket Indexing vs .loc .iloc]] – Explicit accessors exist to eliminate bracket ambiguity
* [[Python - Pandas Series & DataFrame Relationship]] – Columns and rows are Series; structure matters
* [[Python - Selecting a Series vs. a DataFrame]] – Single vs double selection changes dimensionality and behavior

---
## Chapter 3: Logic, Control Flow and Filtering

---

### **Booleans & Comparison Operators**

* [[Python - Boolean Data Type]] – Booleans are the binary output of all logical evaluation
* [[Python - Comparison Operators]] – All conditional logic reduces to comparison outcomes
* [[Python - Equality Operator]] – `==` checks value equality, not identity
* [[Python - Inequality Operator]] – `!=` is the logical inverse but shares precision risks
* [[Python - Relational Operators]] – Ordering comparisons encode assumptions about comparability
* [[Python - Comparison Operators Cheatsheet]] – Syntax reference, not a mental model
* [[Python - Type Comparison Rules]] – Python compares only where rules are explicit
* [[Python - NumPy Array Comparison]] – Broadcasting scales comparisons element-wise across arrays

---
### **Boolean Logic & Array-Level Conditions**

* [[Python - Boolean Operators]] – Boolean operators combine truth values to drive control flow
* [[Python - and Operator]] – `and` is strict, short-circuited, and scalar-only
* [[Python - or Operator]] – `or` is inclusive, short-circuited, and scalar-only
* [[Python - not Operator]] – `not` inverts truth but compounds cognitive load when nested
* [[Python - Boolean Operators on NumPy Arrays]] – Arrays require element-wise logical semantics
* [[Python - numpy.logical_and]] – Combines multiple array conditions with deterministic, element-wise AND
* [[Python - numpy.logical_or]] – Selects elements satisfying at least one array-level condition
* [[Python - numpy.logical_not]] – Inverts boolean masks safely across arrays
* [[Python - Subsetting NumPy Arrays with Boolean Arrays]] – Boolean masks become selectors, not decisions

---

### **Conditional Statements & Control Flow**

* [[Python - Conditional Statements]] – Conditional blocks redirect execution based on boolean outcomes
* [[Python - if Statement]] – `if` introduces a single conditional execution gate
* [[Python - elif Statement]] – `elif` enables mutually exclusive, sequential decision paths
* [[Python - else Statement]] – `else` provides a default path but can hide unhandled cases
* [[Python - if-elif-else Control Flow]] – `if`, `elif`, and `else` form one cohesive decision structure conditions are evaluated top-down and stop at the first `True`
* [[Python - Comparison & Boolean Operators & Conditional Statements Relationship]] – Comparisons and booleans supply truth; conditionals act on it
* [[Python - Indentation and Colons in Control Structures]] – Whitespace and colons define logic, not just readability
---

### Boolean Indexing and DataFrame Filtering

- [[Python - Creating a Boolean Series from a Comparison]] – comparisons on Series yield aligned boolean masks
- [[Python - Boolean Indexing on a DataFrame]] – boolean masks directly select rows when placed inside brackets
- [[Python - Filtering DataFrames with Boolean Operators]] – multiple conditions must be combined element-wise
- [[Python - Filtering pandas DataFrames]] – filtering is a first-class data operation, not control flow
- [[Python - Selecting a pandas Series from a DataFrame]] – column selection often precedes boolean filtering

---

## Chapter 4: Loops

---
### While Loops

- [[Python - while Loop]] – Introduces `while` as a condition-first loop where execution depends entirely on a boolean expression remaining true.
- [[Python - Use Cases for while Loops]] – Shows that `while` excels when iteration count is unknown and state evolves dynamically.
- [[Python - Infinite Loops]] – Demonstrates how missing or incorrect state updates lead to non-terminating execution.
- [[Python - while Loop Error Reduction Example]] – Illustrates how tightly coupling condition checks with state mutation reduces loop bugs.
- [[Python - if Statement vs while Loop]] – Clarifies that `if` is single-evaluation control flow, while `while` is repeated conditional execution.

---

### **For Loops & Enumeration**

* [[Python - for Loop]] – `for` loops traverse iterables deterministically until exhaustion
* [[Python - for Loop Execution Flow]] – Iteration order and termination are owned by the iterable
* [[Python - Iterating Over a List with a for Loop]] – Lists yield elements sequentially, not indices
* [[Python - Iterating Over a String with a for Loop]] – Strings are iterated character by character as immutable sequences
* [[Python 2 - enumerate() Function]] – `enumerate()` safely couples index with value when position matters
---

### Looping Over Dictionaries and NumPy Arrays

- [[Python - Looping Over Data Structures]] – The `for` loop is stable; iteration behavior comes from the data structure
- [[Python - Looping Over Dictionaries with .items()]] – `.items()` exposes key–value meaning directly and safely
- [[Python - Unordered Nature of Dictionary Iteration]] – Dictionary iteration order is not a semantic guarantee
- [[Python - Looping Over 1D NumPy Arrays]] – 1D NumPy arrays iterate cleanly element by element
- [[Python - Looping Over N-Dimensional NumPy Arrays with nditer()]] – `nditer()` enables true element-wise traversal across dimensions
- [[Python - Dictionary .items() vs NumPy nditer()]] – Dictionary iteration is semantic; NumPy iteration is structural and performance-driven

---

### Pandas DataFrame Iteration & Transformation

- [[Python - Iterating Over Pandas DataFrames (The Wrong Way)]] – Manual row iteration is an anti-pattern due to hidden performance costs
- [[Python - DataFrame.iterrows() Method]] – `iterrows()` yields (index, Series) pairs and is meant for inspection, not mutation
- [[Python - DataFrame.iterrows() & Performance Relationship]] – Per-row Series creation is the core scalability bottleneck
- [[Python - DataFrame.apply() Method]] – `.apply()` shifts iteration into Pandas internals and is usually preferable
- [[Python - .iterrows() vs .apply()]] – Both solve similar problems, but with radically different performance profiles
- [[Python - Adding a DataFrame Column via Iteration]] – Demonstrates the intuitive but inefficient beginner approach

---
## Chapter 5: Random Numbers and Distribution
---
### Randomness, Simulation, and Reproducibility

- [[Python - Pseudo-Random Numbers]] – Randomness in code is deterministic and sequence-based
- [[Python - Random Seed]] – The seed fixes the entire future sequence of random values
- [[Python - Random Seed & Reproducibility Relationship]] – Same seed guarantees identical outcomes
- [[Python - Reproducibility in Random Simulations]] – Reproducibility enables debugging and scientific trust
- [[Python - Random Number Generation with NumPy]] – NumPy provides vectorized random generators `np.random` is the engine behind all simulations
- [[Python - numpy.random.rand()]] – Generates uniform continuous values in [0, 1)
- [[Python - numpy.random.randint()]] – Generates discrete integers over half-open intervals
- [[Python - Coin Toss Simulation Example]] – Maps random integers to meaningful outcomes
- [[Python - Empire State Building Walk Simulation Problem]] – Demonstrates stateful Monte Carlo simulation
- [[Python - Hacker Statistics]] – Uses repeated simulation to approximate probabilities

---

### Random Walks & State Accumulation

- [[Python - Head or Tails]] – Demonstrates independent random events with no carried state
- [[Python - Random Step]] – Defines the atomic, memoryless unit of randomness
- [[Python - Random Walk]] – Shows how accumulated random steps form a path over time
- [[Python - Simulating a Random Walk]] – Implements stateful accumulation via previous-position updates

---

### Random Walk Distributions & Convergence

- [[Statistics - Random Walk]] – Defines the stochastic process whose outcomes are being aggregated
- [[Statistics - Simulating a Random Walk Distribution]] – Shows how repeated simulations produce an empirical distribution
- [[Statistics - Distribution of a Random Walk]] – Frames the collection of final states as a probabilistic object
- [[Python - Visualizing Distributions with Histograms]] – Uses histograms to expose distribution shape and convergence
- [[Statistics - Simulated vs Theoretical Distribution Relationship]] – Explains why empirical results approach theory with scale
