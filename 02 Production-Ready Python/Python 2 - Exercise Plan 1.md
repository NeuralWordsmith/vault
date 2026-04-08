## Chapter 1: From Position to Meaning — Why Dictionaries Exist

> [[Python 2 - Exercise 1.1]]

Covers:

* [[Python - Parallel Lists vs Dictionaries]]
* [[Python - Lists vs Dictionaries]]
* [[Python - Dictionary Key-Value Lookup Efficiency]]

> The question this answers
> Why is indexing by position fragile when modeling real-world relationships?

Focus:

* Structural weakness of index-based mapping
* Lookup complexity and cognitive load

Onwards:
This exposes the pain of positional mapping and motivates labeled access.

---

> [[Python 2 - Exercise 1.2 – First-Class Key–Value Modeling]]

Covers:

* [[Python - Dictionaries]]
* [[Python - Dictionary Syntax and Creation]]
* [[Python - Accessing Dictionary Values using Keys]]

> The question this answers
> How does key-based modeling eliminate positional dependency?

Focus:

* Literal syntax with `{}`
* Direct lookup mental model

Onwards:
Now that lookup works, we must understand the constraints that make it reliable.

---

> [[Python 2 - Exercise 1.3 – Why Keys Must Behave]]

Covers:

* [[Python - Dictionary Key Immutability]]
* [[02 Production-Ready Python/Python - Mutable vs Immutable Objects]]
* [[Python - Dictionary Key Uniqueness]]

> The question this answers
> Why must dictionary keys be unique and immutable for hashing to work?

Focus:

* Hash-based identity
* Stability of object state

Onwards:
With structural rules clear, we can now safely mutate dictionary contents.

---

> [[Python 2 - Exercise 1.4 – Dynamic State Management]]

Covers:

* [[Python - Dictionary Operations]]
* [[Python - Adding Elements to a Dictionary]]
* [[Python - Updating Dictionary Values]]
* [[Python - Deleting Dictionary Elements]]
* [[Python - Checking for Key Existence in Dictionaries]]

> The question this answers
> How does a dictionary evolve safely over time?

Focus:

* In-place mutation
* Defensive key checks

Onwards:
We now move from single mappings to structured tables of data.

---

## Chapter 2: From Key–Value Pairs to Tables

> [[Python 2 - Exercise 2.1 – What Is Tabular Data Really?]]

Covers:

* [[Python - Tabular Data]]
* [[Python - Limitations of NumPy for Tabular Data]]

> The question this answers
> Why is heterogeneous tabular data incompatible with plain NumPy arrays?

Focus:

* Rows as observations
* Column type consistency

Onwards:
We now introduce the structure built specifically for tabular heterogeneity.

---

> [[Python 2 - Exercise 2.2 – Enter Pandas]]

Covers:

* [[Python - Pandas Package]]
* [[Python - Pandas & NumPy Relationship]]
* [[Python - Pandas DataFrame]]
* [[Python - DataFrame Structure (Index, Columns, Data)]]
* [[Python - Pandas Series & DataFrame Relationship]]

> The question this answers
> What structural abstraction does Pandas introduce on top of NumPy?

Focus:

* Labeled axes
* Series as atomic building block

Onwards:
We must now construct and ingest real tabular datasets.

---

> [[Python 2 - Exercise 2.3 – Building and Importing Tables]]

Covers:

* [[Python - Creating a DataFrame from a Dictionary]]
* [[Python - CSV (Comma Separated Values)]]
* [[Python - Importing a CSV into a DataFrame using read_csv]]

> The question this answers
> How do structured datasets enter memory as DataFrames?

Focus:

* Constructor mental model
* File-to-memory ingestion

Onwards:
With data in memory, the central skill becomes controlled access.

---

## Chapter 3: Precise Data Access

> [[Python 2 - Exercise 3.1 – Indexing Foundations]]

Covers:

* [[Python - DataFrame Indexing and Selection]]
* [[Python - DataFrame Column Selection with Square Brackets]]
* [[Python - Selecting a Series vs. a DataFrame]]
* [[Python - DataFrame Row Selection with Slicing]]

> The question this answers
> How does dimensionality change depending on selection syntax?

Focus:

* Shape preservation vs reduction
* Positional slicing

Onwards:
Now we formalize explicit label and position selection.

---

> [[Python 2 - Exercise 3.2 – loc vs iloc]]

Covers:

* [[Python - DataFrame Label-Based Selection with .loc]]
* [[Python - DataFrame Position-Based Selection with .iloc]]
* [[Python - .loc vs .iloc]]
* [[Python - Square Bracket Indexing vs .loc .iloc]]

> The question this answers
> When should selection be label-driven versus position-driven?

Focus:

* Robustness to reordering
* Explicitness in indexing

Onwards:
With selection mastered, we shift toward logical filtering.

---

## Chapter 4: Boolean Logic as a Data Filter

> [[Python 2 - Exercise 4.1 – Truth as a Type]]

Covers:

* [[Python - Boolean Data Type]]
* [[Python - Comparison Operators]]
* [[Python - Relational Operators]]
* [[Python - Equality Operator]]
* [[Python - Inequality Operator]]
* [[Python - Type Comparison Rules]]

> The question this answers
> How do comparisons produce binary truth states?

Focus:

* Boolean evaluation
* Type safety in comparison

Onwards:
Now we combine truth values to express richer conditions.

---

> [[Python 2 - Exercise 4.2 – Logical Composition]]

Covers:

* [[Python - Boolean Operators]]
* [[Python - and Operator]]
* [[Python - or Operator]]
* [[Python - not Operator]]

> The question this answers
> How are multiple conditions fused into a single decision?

Focus:

* Short-circuiting
* Logical composition

Onwards:
We now extend scalar logic into vectorized NumPy space.

---

> [[Python 2 - Exercise 4.3 – Boolean Logic at Scale (NumPy)]]

Covers:

* [[Python - NumPy Array Comparison]]
* [[Python - Boolean Operators on NumPy Arrays]]
* [[Python - numpy.logical_and]]
* [[Python - numpy.logical_or]]
* [[Python - numpy.logical_not]]
* [[Python - Subsetting NumPy Arrays with Boolean Arrays]]

> The question this answers
> How does element-wise logic differ from scalar boolean logic?

Focus:

* Vectorization
* Boolean masks

Onwards:
We now bring this logic into DataFrame filtering.

---

> [[Python 2 - Exercise 4.4 – Filtering Structured Data]]

Covers:

* [[Python - Filtering pandas DataFrames]]
* [[Python - Selecting a pandas Series from a DataFrame]]
* [[Python - Creating a Boolean Series from a Comparison]]
* [[Python - Boolean Indexing on a DataFrame]]
* [[Python - Filtering DataFrames with Boolean Operators]]

> The question this answers
> How do boolean masks become row filters in labeled data?

Focus:

* Mask alignment
* Conditional subsetting

Onwards:
Now that conditional logic controls selection, we explore control flow.

---

## Chapter 5: Control Flow and Iteration

> [[Python 2 - Exercise 5.1 – Conditional Execution]]

Covers:

* [[Python - Conditional Statements]]
* [[Python - if Statement]]
* [[Python - else Statement]]
* [[Python - elif Statement]]
* [[Python - if-elif-else Control Flow]]
* [[Python - Indentation and Colons in Control Structures]]
* [[Python - Comparison & Boolean Operators & Conditional Statements Relationship]]

> The question this answers
> How does boolean evaluation control execution paths?

Focus:

* Block structure
* Flow branching

Onwards:
Now we move from branching to repetition.

---

> [[Python 2 - Exercise 5.2 – While Condition-Driven Loops]]

Covers:

* [[Python - while Loop]]
* [[Python - if Statement vs while Loop]]
* [[Python - Use Cases for while Loops]]
* [[Python - while Loop Error Reduction Example]]
* [[Python - Infinite Loops]]

> The question this answers
> When does repeated execution depend on state rather than sequence?

Focus:

* Loop invariants
* Termination conditions

Onwards:
Now we explore sequence-driven iteration.

---

> [[Python 2 - Exercise 5.3 – For Structured Iteration]]

Covers:

* [[Python - for Loop]]
* [[Python - Iterating Over a List with a for Loop]]
* [[Python - Iterating Over a String with a for Loop]]
* [[Python - for Loop Execution Flow]]
* [[Python 2 - enumerate() Function]]

> The question this answers
> How does iteration abstract over sequence position?

Focus:

* Iterator mental model
* Index-value pairing

Onwards:
We generalize iteration across data structures.

---

> [[Python 2 - Exercise 5.4 – Iterating Across Structures]]

Covers:

* [[Python - Looping Over Data Structures]]
* [[Python - Looping Over Dictionaries with .items()]]
* [[Python - Unordered Nature of Dictionary Iteration]]
* [[Python - Looping Over 1D NumPy Arrays]]
* [[Python - Looping Over N-Dimensional NumPy Arrays with nditer()]]
* [[Python - Dictionary .items() vs NumPy nditer()]]

> The question this answers
> How does iteration differ between mapping structures and arrays?

Focus:

* Structural iteration differences
* Dimensional traversal

Onwards:
We conclude by confronting iteration in Pandas.

---

> [[Python 2 - Exercise 5.5 – Iteration vs Vectorization in Pandas]]

Covers:

* [[Python - Iterating Over Pandas DataFrames (The Wrong Way)]]
* [[Python - DataFrame.iterrows() Method]]
* [[Python - Adding a DataFrame Column via Iteration]]
* [[Python - DataFrame.iterrows() & Performance Relationship]]
* [[Python - DataFrame.apply() Method]]
* [[Python - .iterrows() vs .apply()]]

> The question this answers
> When should you avoid explicit loops in DataFrame processing?

Focus:

* Performance trade-offs
* Vectorized thinking

Onwards:
The arc is complete: from positional data, to labeled modeling, to logical filtering, to controlled execution, to performance-aware transformation.


---

1. [[Python 2 - Exercise 1.1]]
2. [[Python 2 - Exercise 1.2 – First-Class Key–Value Modeling]]
3. [[Python 2 - Exercise 1.3 – Why Keys Must Behave]]
4. [[Python 2 - Exercise 1.4 – Dynamic State Management]]
5. [[Python 2 - Exercise 2.1 – What Is Tabular Data Really?]]
6. [[Python 2 - Exercise 2.2 – Enter Pandas]]
7. [[Python 2 - Exercise 2.3 – Building and Importing Tables]]
8. [[Python 2 - Exercise 3.1 – Indexing Foundations]]
9. [[Python 2 - Exercise 3.2 – loc vs iloc]]
10. [[Python 2 - Exercise 4.1 – Truth as a Type]]
11. [[Python 2 - Exercise 4.2 – Logical Composition]]
12. [[Python 2 - Exercise 4.3 – Boolean Logic at Scale (NumPy)]]
13. [[Python 2 - Exercise 4.4 – Filtering Structured Data]]
14. [[Python 2 - Exercise 5.1 – Conditional Execution]]
15. [[Python 2 - Exercise 5.2 – While Condition-Driven Loops]]
16. [[Python 2 - Exercise 5.3 – For Structured Iteration]]
17. [[Python 2 - Exercise 5.4 – Iterating Across Structures]]
18. [[Python 2 - Exercise 5.5 – Iteration vs Vectorization in Pandas]]