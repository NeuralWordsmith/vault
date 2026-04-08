### 01 - Introduction

[[Python - History & Creator]] - Python was created by Guido van Rossum with a deliberate focus on readability and simplicity, which enabled it to grow from a hobby project into a dominant general-purpose language.

[[Python - Key Characteristics]] - Python’s success comes from being open-source, highly versatile, and supported by a massive package ecosystem that accelerates development across domains.

[[Python - Role in Data Science]] - Python became the de facto language for data science because its libraries allow the full pipeline—from data collection to modeling and deployment—to be built efficiently in one language.

[[Python - Python Shell]] - The Python shell provides an immediate REPL feedback loop, making it ideal for learning, experimentation, and quick validation of ideas.

[[Python - IPython]] - IPython enhances the basic shell with introspection, history, and magic commands, making it essential for exploratory analysis and scientific workflows.

[[Python - Python Scripts]] - Python scripts enable automation and reproducibility by executing saved `.py` files from top to bottom, forming the foundation of real programs and applications.

[[Python - Interactive Shell vs Scripts]] - Interactive shells are best for exploration and debugging, while scripts are essential for repeatable, shareable, and production-ready code.

[[Python - Recommended Workflow for Learning]] - An effective learning workflow starts with experimentation in an interactive environment and then formalizes understanding by converting working code into scripts.

[[Python - print Command]] - The `print()` function is the primary mechanism for making a program’s internal state and results visible, especially critical in scripts where output is otherwise silent.

---
### 02 - Variables and Types

[[Python - Variables]] - Variables are named references to values in memory that make code readable, reusable, and capable of handling complex logic instead of one-off calculations.

[[Python - Variable Assignment]] - Variable assignment binds a descriptive name to an object in memory using `=`, allowing values to be referenced, reused, and updated without manipulating raw data directly.

[[Python - Using Variables in Calculations]] - Using variables in expressions abstracts raw values from logic, making calculations readable, reusable, and easy to update without rewriting formulas.

[[Python - Variables for Code Reproducibility]] - Variables enable reproducibility by separating input data from logic, allowing the same code to produce consistent results when inputs change.

[[Python - Data Types]] - Data types define how values are stored and what operations are valid, forming the foundation for correct, predictable program behavior.

[[Python - type() Function]] - The `type()` function reveals the runtime data type of a value, helping prevent errors and reason about operator behavior in dynamically typed code.

[[Python - Float Data Type]] - Floats represent real numbers with decimals and are essential for continuous values, but they introduce precision limitations due to binary representation.

[[Python - Integer (int) Data Type]] - Integers represent exact whole numbers with arbitrary precision, making them ideal for counting, indexing, and discrete calculations.

[[Python - String (str) Data Type]] - Strings represent textual data as sequences of characters, enabling all forms of text handling while behaving fundamentally differently from numeric types.

[[Python - Boolean (bool) Data Type]] - Booleans represent truth values (`True` or `False`) and are the core mechanism for decision-making and control flow in programs.

[[Python - Type-Dependent Operator Behavior]] - Operators change their behavior based on operand data types, making type awareness essential to avoid errors and ensure predictable outcomes.

---
## Chapter 2: Python Lists

### 01 - Python Lists

[[Python - Basic Data Types Cheatsheet]] - The cheatsheet provides a compact reference that consolidates Python’s core data types, assignment, type checking, and casting into a single mental model for quick recall and error prevention.

[[Python - Lists]] - Lists are Python’s primary ordered and mutable collection type, enabling efficient grouping, access, and modification of multiple related values under one variable.

[[Python - List Creation]] - List creation uses square brackets to define ordered collections, forming the entry point to working with grouped data instead of isolated variables.

[[Python - Lists with Mixed Data Types]] - Python lists can store heterogeneous data types, making them flexible containers for real-world, loosely structured data.

[[Python - Nested Lists]] - Nested lists allow Python to represent two-dimensional or hierarchical data structures such as tables, grids, and matrices without external libraries.

[[Python - List as a Data Type]] - A list is a distinct, mutable data type designed to hold ordered sequences of objects, forming the foundation for most data organization and iteration patterns in Python.

---
### 02 - Subsetting Lists

[[Python - List Subsetting]] - List subsetting is the general mechanism for accessing specific elements or ranges within a list using indexing and slicing.

[[Python - List Indexing]] - List indexing retrieves a single element by its exact position, enabling fast and precise access to individual values.

[[Python - Zero-Based Indexing]] - Zero-based indexing defines the first element at index 0, forming the foundation for all list access and preventing off-by-one errors when understood correctly.

[[Python - Negative List Indexing]] - Negative indexing allows direct access to elements from the end of a list without calculating its length, improving readability and intent.

[[Python - List Slicing]] - List slicing extracts a range of elements into a new list using start and stop indices, enabling clean and expressive sub-sequence operations.

[[Python - List Slice Inclusivity Rule]] - Python slices follow a half-open interval rule where the start index is included and the end index is excluded, simplifying range calculations.

[[Python - Omitting Indices in List Slicing]] - Omitting slice indices provides concise shorthand for slicing from the beginning or to the end of a list, improving code clarity for common cases.

---

### 03 - Manipulating Lists

[[Python - List Manipulation]] - List manipulation enables in-place modification of lists, making Python suitable for dynamic, real-time data handling but requiring awareness of side effects.

[[Python - Changing List Elements]] - Changing list elements updates specific positions directly in memory, allowing precise edits without creating new lists.

[[Python - Changing List Slices]] - Slice assignment allows bulk replacement, insertion, or deletion of list segments in a single operation, even changing list length.

[[Python - List Concatenation]] - List concatenation (`+`) combines lists by creating a new list, preserving originals at the cost of extra memory.

[[Python - Deleting List Elements]] - Deleting list elements removes items in-place and shifts subsequent indices, impacting both performance and list structure.

[[Python - List Memory Model (Reference vs. Value)]] - Lists are stored and passed by reference, meaning multiple variables can point to the same list and share side effects.

[[Python - Implicit List Copying (Assignment)]] - Assigning one list variable to another copies the reference, not the data, creating aliases to the same list.

[[Python - Explicit List Copying (Cloning)]] - Explicit copying creates an independent list object, preventing unintended mutations of the original data.

[[Python - List Manipulation & Memory Model Relationship]] - All list manipulation behavior is governed by Python’s reference-based memory model, making copying strategy critical for data safety.

---

## Chapter 3: Functions and packages

### 01 - Functions

[[Python - Functions]] - Functions encapsulate reusable logic into named units, enabling abstraction, modularity, and adherence to the DRY principle.

[[Python - Function Calls (Input-Process-Output)]] - Function calls follow a clear input–process–output model that structures how data flows through reusable code blocks.

[[Python - Function Arguments]] - Function arguments define the interface of a function, allowing it to accept varying inputs while keeping internal logic reusable.

[[Python - Optional Arguments]] - Optional arguments provide sensible defaults, making functions flexible for common cases without sacrificing customization.

[[Python - max() Function]] - The `max()` function abstracts iteration and comparison to reliably return the largest value from inputs with minimal code.

[[Python - round() Function]] - The `round()` function controls numerical precision for presentation and reporting, with behavior shaped by floating-point representation.

[[Python - help() Function]] - The `help()` function enables immediate introspection by exposing a function’s documentation, arguments, and behavior directly in the interpreter.

[[Python - Discovering Built-in Functions]] - Discovering built-in functions encourages efficient, Pythonic coding by leveraging existing, tested tools instead of reinventing solutions.

---

### 02 - Methods

[[Python - Objects]] - Everything in Python is an object with a type and associated behavior, which unifies how all data is represented and manipulated.

[[Python - Methods]] - Methods are functions bound to objects that operate on the object’s internal data, forming the primary way actions are performed in Python.

[[Python - Method Dot Notation]] - Dot notation (`object.method()`) is the universal syntax for accessing an object’s behavior in a clear and readable way.

[[Python - Type-Specific Methods]] - Available methods depend on an object’s type, ensuring that only logically valid operations can be performed on given data.

[[Python - List Methods]] - List methods provide optimized, built-in operations for modifying and querying ordered, mutable collections.

[[Python - String Methods]] - String methods enable powerful text manipulation while preserving immutability by always returning new strings.

[[Python - Mutating Methods]] - Mutating methods change an object in-place, offering performance benefits at the cost of potential side effects.

[[Python - Functions vs Methods]] - Functions are general-purpose callables, while methods are type-bound operations that implicitly act on an object’s data.

---

### 03 - Packages

**[[Python - Packages]]** – A package is a directory-based way to bundle related modules into a single, reusable namespace, forming the foundation of scalable and shareable Python code.

**[[Python - Rationale for Packages]]** – Packages exist to prevent Python from becoming a bloated monolith by keeping the core lean and letting users install only the functionality they need.

**[[Python - Modules]]** – A module is a single `.py` file that groups related functions, classes, and variables and serves as the basic building block of packages.

**[[Python - Common Data Science Packages]]** – Libraries like NumPy, Matplotlib, and scikit-learn transform Python into a high-performance data science and machine learning ecosystem.

**[[Python - Installing Packages with pip]]** – `pip` is the standard tool that installs third-party packages from PyPI, enabling access to Python’s vast ecosystem while introducing dependency management concerns.

**[[Python - Importing Packages]]** – Installing a package is not enough; the `import` statement explicitly loads it into a script’s namespace so its functionality can be used.

**[[Python - Standard Import Statement]]** – Standard imports (`import package`) favor clarity and safety by keeping all external functionality inside a clear package namespace.

**[[Python - Importing with an Alias]]** – Aliases (`import numpy as np`) reduce verbosity while preserving clarity and are a community convention in professional Python code.

**[[Python - Importing Specific Functions (from...import)]]** – Selective imports allow direct access to functions but trade brevity for increased risk of namespace pollution and reduced clarity.

**[[Python - Standard Import vs from...import]]** – The core trade-off is clarity versus convenience: standard imports are safer and more readable, while `from...import` should be used sparingly.

---

## Chapter 4: Numpy

### 01 - Numpy

**[[Python - List Calculation Limitations]]** – Python lists are flexible containers but cannot perform direct mathematical operations element-wise, making them unsuitable for numerical computing.

**[[Python - NumPy (Numeric Python)]]** – NumPy is a specialized numerical computing library that overcomes Python list limitations by enabling fast, vectorized operations on large datasets.

**[[Python - NumPy Array]]** – A NumPy array (`ndarray`) is a fixed-type, contiguous-memory data structure that enables high-performance numerical and scientific computations.

**[[Python - Installing & Importing NumPy]]** – NumPy must be installed once per environment and imported in each script to make its numerical tools available for use.

**[[Python - Creating a NumPy Array]]** – Creating a NumPy array converts Python lists into a homogeneous, high-performance structure that unlocks vectorized computation.

**[[Python - NumPy Element-wise Operations]]** – NumPy overloads mathematical operators to apply computations element-wise across entire arrays without explicit loops.

**[[Python - NumPy Array Single Data Type Constraint]]** – NumPy arrays enforce a single data type for all elements, enabling speed and memory efficiency at the cost of flexibility.

**[[Python - List Concatenation vs NumPy Array Addition]]** – The `+` operator concatenates Python lists but performs element-wise mathematical addition for NumPy arrays.

**[[Python - Subsetting NumPy Arrays]]** – NumPy arrays support fast indexing and slicing to access individual elements or ranges of data efficiently.

**[[Python - Subsetting NumPy Arrays with Indices]]** – Index-based subsetting allows precise positional access to NumPy array elements and slices.

**[[Python - Subsetting NumPy Arrays with Boolean Arrays]]** – Boolean indexing lets you filter NumPy arrays by conditions (`True`/`False` masks) instead of positions, enabling fast, readable, and expressive data filtering.

---

### 02 - **2D Numpy Arrays**

**[[Python - 2D NumPy Arrays]]** – A 2D NumPy array represents data in a strict rows-and-columns grid optimized for fast numerical computation.

**[[Python - numpy.ndarray]]** – `numpy.ndarray` is NumPy’s core data structure, storing homogeneous data in contiguous memory for high-performance multi-dimensional computation.

**[[Python - Creating 2D NumPy Arrays]]** – Converting a list of lists into a NumPy array is the gateway step that unlocks vectorized operations on tabular data.

**[[Python - Structure of 2D NumPy Arrays]]** – A 2D NumPy array enforces a rectangular structure where each inner list becomes a row and all rows share the same number of columns.

**[[Python - ndarray.shape Attribute]]** – The `.shape` attribute reveals the dimensions of an array as `(rows, columns)` and is essential for understanding and debugging array operations.

**[[Python - NumPy Attributes vs Methods]]** – Attributes describe stored properties of an array (like `.shape`), while methods perform actions or computations (like `.sum()`).

**[[Python - NumPy Array Homogeneity]]** – NumPy arrays enforce a single data type across all elements, enabling speed and memory efficiency through vectorization.

**[[Python - 2D NumPy Array vs Python List of Lists]]** – NumPy arrays trade flexibility for performance, vastly outperforming Python lists for numerical and matrix-style operations.

**[[Python - Subsetting 2D NumPy Arrays]]** – Subsetting allows precise extraction of rows, columns, or elements from 2D arrays, forming the basis of data selection and analysis.

**[[Python - Subsetting 2D NumPy Arrays (Chained Brackets)]]** – Chained indexing (`array[row][col]`) works but is less efficient than NumPy’s native comma-separated indexing.

**[[Python - Subsetting 2D NumPy Arrays (Comma-Separated Indexing)]]** – Comma-separated indexing (`array[row, col]` or `array[rows, cols]`) is the most efficient and idiomatic way to access elements or sub-grids in 2D NumPy arrays.

**[[Python - Slicing 2D NumPy Arrays]]** – Slicing with comma-separated ranges (`array[r1:r2, c1:c2]`) extracts rectangular views of data efficiently without copying underlying memory.

**[[Python - Element-wise Calculations in 2D NumPy Arrays]]** – NumPy performs vectorized, element-wise operations across entire 2D arrays, delivering massive performance gains over explicit Python loops.

---
### 03 - NumPy: Basic Statistics

**[[NumPy - Exploratory Data Analysis with NumPy]]** – EDA with NumPy transforms raw arrays into insight by using summary statistics to understand structure, anomalies, and relationships before modeling.

**[[NumPy - Summarizing Statistics]]** – Summarizing statistics condense large datasets into a few descriptive numbers that reveal central tendency, spread, and relationships.

**[[NumPy - Mean (np.mean)]]** – `np.mean()` provides a quick measure of a dataset’s center but is highly sensitive to outliers.

**[[NumPy - Median (np.median)]]** – `np.median()` gives a robust measure of central tendency that remains reliable even when extreme outliers are present.

**[[NumPy - Correlation Coefficient (np.corrcoef)]]** – `np.corrcoef()` quantifies the strength and direction of linear relationships between variables in a single standardized value.

**[[NumPy - Standard Deviation (np.std)]]** – `np.std()` measures how spread out data points are around the mean, capturing variability and consistency in the data.

**[[NumPy - Data Sanity Check]]** – Sanity checks use basic statistics to quickly catch implausible values and prevent garbage data from corrupting analysis.

**[[NumPy - NumPy Functions vs Basic Python Functions]]** – NumPy functions outperform basic Python functions by operating on homogeneous arrays with vectorized, compiled code.

**[[NumPy - Data Type Homogeneity & Calculation Speed Relationship]]** – Enforcing a single data type enables NumPy’s contiguous memory layout and is the root cause of its massive speed advantage.

**[[NumPy - Data Simulation with Random Distributions]]** – Data simulation uses NumPy’s random distributions to generate realistic synthetic datasets for testing, exploration, and modeling.

**[[NumPy - Stacking Arrays (np.column_stack)]]** – `np.column_stack` combines multiple equal-length 1D arrays into a single 2D feature matrix by treating each array as a column.