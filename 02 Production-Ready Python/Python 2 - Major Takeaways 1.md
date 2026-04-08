## Chapter 2: Dictionaries and Pandas
### 01 - Dictionaries, Part 1

[[Python - Dictionaries]] – A dictionary is a mutable mapping that associates unique, immutable keys with values, enabling direct and meaningful data retrieval instead of position-based indexing. 

[[Python - Parallel Lists vs Dictionaries]] – Dictionaries eliminate the fragility and inefficiency of parallel lists by directly linking related data through keys, removing the need for index coordination. 

[[Python - Dictionary Syntax and Creation]] – A dictionary is initialized using `{}` with `key: value` pairs separated by commas, where keys must be unique and immutable, and values can be any type. 

[[Python - Accessing Dictionary Values using Keys]] – Dictionary lookup uses square bracket notation (`dict[key]`) to retrieve values directly via their unique keys, raising a `KeyError` if the key does not exist. 

[[Python - Dictionary Key-Value Lookup Efficiency]] – Dictionary lookups are O(1) on average because keys are hashed into memory indices via a hash table, enabling near-constant-time access regardless of dictionary size. 

---
### 02 - Dictionaries, Part 2

[[Python - Dictionary Key Uniqueness]] – Dictionary keys must be unique, and assigning a value to an existing key overwrites the previous value under a strict “last-write-wins” rule. 

[[Python - Dictionary Key Immutability]] – Dictionary keys must be immutable (hashable) so their hash value remains stable, ensuring reliable and constant-time lookup in the underlying hash table. 

[[02 Production-Ready Python/Python - Mutable vs Immutable Objects]] – Immutable objects cannot change state after creation and instead produce new objects on modification, while mutable objects can change in-place, affecting all references. 

[[Python - Dictionary Operations]] – Dictionaries are mutable structures that support dynamic state management through adding, updating, and deleting key-value pairs in-place. 

[[Python - Adding Elements to a Dictionary]] – A new key-value pair is added using `dict[new_key] = value`, which creates the key only if it does not already exist. 

[[Python - Checking for Key Existence in Dictionaries]] – The `in` operator safely verifies whether a key exists before access, preventing `KeyError` and enabling defensive programming. 

[[Python - Updating Dictionary Values]] – Assigning a value to an existing key with `dict[key] = new_value` replaces the old value in-place due to key uniqueness guarantees. 

[[Python - Deleting Dictionary Elements]] – The `del dict[key]` statement permanently removes a key-value pair from a dictionary, raising a `KeyError` if the key does not exist. 

[[Python - Lists vs Dictionaries]] – Lists organize data by position (integer index) for ordered access, while dictionaries organize data by unique immutable keys for fast direct lookup. 

---

### 03 - Pandas, Part 1

1. [[Python - Tabular Data]] – Tabular data organizes information into a two-dimensional grid where rows represent observations and columns represent variables, forming the structural foundation of most analytical workflows. 

2. [[Python - Limitations of NumPy for Tabular Data]] – NumPy arrays require a single data type, causing mixed tabular data to be upcast (often to strings), which breaks numerical analysis and motivates the use of Pandas. 

3. [[Python - Pandas Package]] – Pandas is a high-level data manipulation library built on top of NumPy that provides labeled, flexible data structures optimized for real-world tabular data analysis. 

4. [[Python - Pandas & NumPy Relationship]] – Pandas wraps NumPy arrays with labeled axes and a rich API, combining NumPy’s computational efficiency with higher-level data abstraction. 

5. [[Python - Pandas DataFrame]] – A DataFrame is Pandas’ primary two-dimensional data structure that stores heterogeneous tabular data with labeled rows (index) and columns. 

6. [[Python - DataFrame Structure (Index, Columns, Data)]] – A DataFrame is structurally defined by its index (row labels), columns (variable names), and underlying data values, which together determine how data is accessed and manipulated. 

7. [[Python - Creating a DataFrame from a Dictionary]] – A DataFrame can be constructed by passing a dictionary to `pd.DataFrame()`, where keys become column names and equal-length value lists form the column data. 

8. [[Python - Importing a CSV into a DataFrame using read_csv]] – The `pd.read_csv()` function loads external CSV files into a DataFrame, optionally specifying parameters like `index_col`, delimiter, and header handling to correctly structure the data. 

9. [[Python - CSV (Comma Separated Values)]] – A CSV file is a plain-text format for storing tabular data where rows are separated by newlines and columns by delimiters (typically commas), requiring external tools to infer data types and structure. 

---

### 04 - Pandas, Part 2

1. [[Python - DataFrame Indexing and Selection]] – DataFrame indexing and selection encompasses the full set of mechanisms (`[]`, `.loc`, `.iloc`) used to retrieve subsets of rows and columns, balancing brevity, clarity, and robustness depending on whether selection is label-based or position-based. 

2. [[Python - DataFrame Column Selection with Square Brackets]] – Using `df['col']` returns a Series, while `df[['col']]` returns a DataFrame, making bracket-based column selection simple but type-sensitive and potentially ambiguous. 

3. [[Python - Selecting a Series vs. a DataFrame]] – The structure of the selector (single label vs. list of labels) determines whether the result collapses into a 1D Series or preserves a 2D DataFrame, which directly impacts downstream operations. 

4. [[Python - DataFrame Row Selection with Slicing]] – Passing a `start:end` slice inside `[]` selects rows by integer position (start inclusive, end exclusive), inheriting Python slicing rules but operating only on positional indices. 

5. [[Python - DataFrame Label-Based Selection with .loc]] – `.loc` performs explicit label-based selection on rows and columns, with inclusive slicing and strong robustness to row reordering as long as labels remain stable. 

6. [[Python - DataFrame Position-Based Selection with .iloc]] – `.iloc` selects rows and columns strictly by integer position (0-based), using standard Python-exclusive slicing and remaining independent of index or column labels. 

7. [[Python - .loc vs .iloc]] – The core distinction is semantic vs positional access: `.loc` uses labels with inclusive slicing and raises `KeyError`, while `.iloc` uses integer positions with exclusive slicing and raises `IndexError`. 

8. [[Python - Square Bracket Indexing vs .loc .iloc]] – Square brackets are concise but overloaded and ambiguous, whereas `.loc` and `.iloc` provide explicit, unambiguous selection semantics for maintainable code. 

9. [[Python - Pandas Series & DataFrame Relationship]] – A DataFrame is a collection of aligned Series objects sharing a common index, and most single-column or single-row selections return a Series as the fundamental 1D building block. 

---

## Chapter 3: Logic, Control Flow and Filtering

### 01 - Comparison Operators

1. [[Python - Comparison Operators]] – Comparison operators evaluate the relationship between two operands and return a Boolean (`True` or `False`), forming the foundation of conditional logic and control flow. 

2. [[Python - Boolean Data Type]] – The `bool` type represents binary truth values (`True` or `False`) and is the direct result of comparison expressions and the driver of decision-making in code. 

3. [[Python - Relational Operators]] – Relational operators (`<`, `>`, `<=`, `>=`) compare the ordering or magnitude of two values and return a Boolean outcome based on their relative position. 

4. [[Python - Equality Operator]] – The `==` operator checks value equality (not identity) between two operands and returns `True` only when their evaluated values match. 

5. [[Python - Inequality Operator]] – The `!=` operator returns `True` when two operands differ in value, acting as the logical inverse of the equality operator. 

6. [[Python - Type Comparison Rules]] – Python enforces strict type compatibility in comparisons, raising a `TypeError` when relational operators are applied to incompatible data types, while allowing defined coercion for compatible numeric types. 

7. [[Python - NumPy Array Comparison]] – NumPy extends comparison operators to perform element-wise, vectorized comparisons using broadcasting, producing Boolean arrays instead of single Boolean values. 

---

### 02 - Boolean Operators

1. [[Python - Boolean Operators]] – Boolean operators (`and`, `or`, `not`) combine or invert boolean expressions, enabling compound logical conditions and structured decision-making in control flow. 

2. [[Python - and Operator]] – The `and` operator returns `True` only when all connected conditions are `True`, using short-circuit evaluation to stop early if a `False` is encountered. 

3. [[Python - or Operator]] – The `or` operator returns `True` if at least one condition is `True`, short-circuiting as soon as a `True` operand is found. 

4. [[Python - not Operator]] – The `not` operator performs unary negation, flipping the truth value of a boolean expression or any object evaluated via truthiness rules. 

5. [[Python - Boolean Operators on NumPy Arrays]] – Standard Python boolean operators cannot operate element-wise on NumPy arrays, requiring NumPy-specific logical functions to combine boolean arrays correctly. 

6. [[Python - numpy.logical_and]] – `np.logical_and` performs element-wise AND across two broadcast-compatible arrays, producing a boolean mask used for compound filtering. 

7. [[Python - numpy.logical_or]] – `np.logical_or` performs element-wise OR across two arrays, returning `True` wherever at least one corresponding condition holds. 

8. [[Python - numpy.logical_not]] – `np.logical_not` inverts each element of a boolean (or truth-evaluable) array, producing an element-wise negated boolean mask. 

9. [[Python - Subsetting NumPy Arrays with Boolean Arrays]] – Boolean subsetting uses a boolean mask to filter NumPy arrays, selecting only elements where the mask evaluates to `True`, enabling efficient conditional data extraction. 

---

### 03 - if, elif, else

1. [[Python - Conditional Statements]] – Conditional statements enable branching in program execution by running specific code blocks based on whether boolean conditions evaluate to `True` or `False`. 

2. [[Python - if Statement]] – The `if` statement executes an indented block of code only when its associated condition evaluates to `True`, forming the fundamental decision gate in control flow. 

3. [[Python - else Statement]] – The `else` statement provides a default execution path that runs only when all preceding `if` and `elif` conditions evaluate to `False`. 

4. [[Python - elif Statement]] – The `elif` statement allows sequential checking of multiple alternative conditions in a mutually exclusive chain, executing only the first condition that evaluates to `True`. 

5. [[Python - if-elif-else Control Flow]] – In an `if-elif-else` chain, conditions are evaluated top-down and only the first `True` condition’s block executes, after which the entire structure exits. 

6. [[Python - Indentation and Colons in Control Structures]] – Colons signal the start of a control block and indentation defines its scope, making whitespace a syntactic mechanism for grouping code in Python. 

7. [[Python - Comparison & Boolean Operators & Conditional Statements Relationship]] – Comparison and boolean operators produce the `True`/`False` values that drive conditional statements, forming the logical foundation of branching behavior in programs. 

---

### 04 - Filtering pandas DataFrames

1. [[Python - Filtering pandas DataFrames]] – Filtering a DataFrame is the structured process of generating a boolean mask from a condition and applying it to retain only rows where the condition evaluates to `True`. 

2. [[Python - Selecting a pandas Series from a DataFrame]] – Selecting a single column as a 1D Series is the prerequisite for vectorized comparisons, since filtering logic operates element-wise on a Series. 

3. [[Python - Creating a Boolean Series from a Comparison]] – Applying a comparison operator to a Series produces a vectorized boolean mask of `True`/`False` values that encode which rows satisfy the condition. 

4. [[Python - Boolean Indexing on a DataFrame]] – Boolean indexing applies a boolean Series inside `df[...]` to return a new DataFrame containing only rows aligned with `True` values in the mask. 

5. [[Python - Filtering DataFrames with Boolean Operators]] – Multiple filtering criteria are combined by applying element-wise logical operations (e.g., `np.logical_and` or `&`) to boolean Series before indexing the DataFrame. 

---

## Chapter 4: Loops

### 01 - while loop

1. [[Python - while Loop]] – A `while` loop repeatedly executes a code block as long as its condition evaluates to `True`, making it suitable for iteration when the number of repetitions is not known in advance. 

2. [[Python - if Statement vs while Loop]] – An `if` statement checks a condition once for branching, whereas a `while` loop continuously re-evaluates a condition to enable repeated execution until it becomes `False`. 

3. [[Python - Use Cases for while Loops]] – `while` loops are best used for iterative processes driven by state changes, such as convergence algorithms or event-driven repetition, where termination depends on runtime conditions. 

4. [[Python - while Loop Error Reduction Example]] – The error reduction example demonstrates how a `while` loop iteratively updates a variable toward a target state, highlighting the necessity of state updates to ensure termination. 

5. [[Python - Infinite Loops]] – An infinite loop occurs when the loop’s termination condition never becomes `False`, typically due to a missing or incorrect state update inside the loop body. 

---

### 02 - for loop

1. [[Python - for Loop]] – A `for` loop iterates over each item in an iterable sequence and executes a code block once per item, automating structured repetition over finite collections. 

2. [[Python - Iterating Over a List with a for Loop]] – Iterating over a list assigns each element to a temporary variable sequentially, allowing uniform processing of every list item without manual index management. 

3. [[Python - for Loop Execution Flow]] – The execution flow of a `for` loop consists of retrieving the next item from the iterable, assigning it to the loop variable, executing the loop body, and repeating until the iterable is exhausted. 

4. [[Python 2 - enumerate() Function]] – `enumerate()` enhances `for` loops by yielding index-value pairs during iteration, providing simultaneous access to both an element and its position without manual counters. 

5. [[Python - Iterating Over a String with a for Loop]] – Because strings are iterable sequences, a `for` loop processes them character by character, enabling character-level text operations while preserving string immutability. 

---

### 03 - Loop Data Structures Part 1

1. [[Python - Looping Over Data Structures]] – The `for` loop syntax stays constant, but each data structure defines its own iteration behavior (e.g., dictionary keys by default, NumPy rows or elements), requiring structure-specific methods for full control. 

2. [[Python - Looping Over Dictionaries with .items()]] – The `.items()` method enables simultaneous access to dictionary keys and values by yielding `(key, value)` tuples during iteration. 

3. [[Python - Unordered Nature of Dictionary Iteration]] – Dictionaries historically did not guarantee insertion order due to their hash table implementation, meaning iteration order was not inherently predictable in older Python versions. 

4. [[Python - Looping Over 1D NumPy Arrays]] – Iterating over a 1D NumPy array behaves like looping over a list, yielding one scalar element per iteration, though it is generally less efficient than vectorized operations. 

5. [[Python - Looping Over N-Dimensional NumPy Arrays with nditer()]] – `np.nditer()` provides a C-optimized iterator for traversing every element in multi-dimensional arrays sequentially, avoiding manual nested loops. 

6. [[Python - Dictionary .items() vs NumPy nditer()]] – `.items()` is an object method yielding structured key-value pairs for dictionaries, whereas `np.nditer()` is a specialized NumPy function designed for efficient element-wise traversal of numerical arrays. 

---

### 04 - Loop Data Structures Part 2

1. [[Python - Iterating Over Pandas DataFrames (The Wrong Way)]] – Directly iterating over a DataFrame with `for item in df` yields column names, not rows, because a DataFrame behaves like a dictionary of Series. 

2. [[Python - DataFrame.iterrows() Method]] – `.iterrows()` enables explicit row-wise iteration by yielding `(index, row_series)` tuples, but it creates a new Series object for each row. 

3. [[Python - Adding a DataFrame Column via Iteration]] – Creating a column via row-wise looping uses `.iterrows()` and `.loc` for assignment, but this procedural approach scales poorly compared to vectorized alternatives. 

4. [[Python - DataFrame.iterrows() & Performance Relationship]] – The inefficiency of `.iterrows()` stems from repeatedly constructing new Series objects per row, causing significant memory and CPU overhead on large datasets. 

5. [[Python - DataFrame.apply() Method]] – `.apply()` applies a function element-wise (or row/column-wise via `axis`) and provides a cleaner, generally faster alternative to explicit row iteration. 

6. [[Python - .iterrows() vs .apply()]] – `.iterrows()` is suited for inspection and complex row access, while `.apply()` is preferred for transformations, offering better performance and cleaner abstraction over manual loops. 



---

## Links present in this note

1. [[Python - .iterrows() vs .apply()]]
2. [[Python - .loc vs .iloc]]
3. [[Python - Accessing Dictionary Values using Keys]]
4. [[Python - Adding Elements to a Dictionary]]
5. [[Python - Adding a DataFrame Column via Iteration]]
6. [[Python - Boolean Data Type]]
7. [[Python - Boolean Indexing on a DataFrame]]
8. [[Python - Boolean Operators]]
9. [[Python - Boolean Operators on NumPy Arrays]]
10. [[Python - CSV (Comma Separated Values)]]
11. [[Python - Checking for Key Existence in Dictionaries]]
12. [[Python - Comparison & Boolean Operators & Conditional Statements Relationship]]
13. [[Python - Comparison Operators]]
14. [[Python - Conditional Statements]]
15. [[Python - Creating a Boolean Series from a Comparison]]
16. [[Python - Creating a DataFrame from a Dictionary]]
17. [[Python - DataFrame Column Selection with Square Brackets]]
18. [[Python - DataFrame Indexing and Selection]]
19. [[Python - DataFrame Label-Based Selection with .loc]]
20. [[Python - DataFrame Position-Based Selection with .iloc]]
21. [[Python - DataFrame Row Selection with Slicing]]
22. [[Python - DataFrame Structure (Index, Columns, Data)]]
23. [[Python - DataFrame.apply() Method]]
24. [[Python - DataFrame.iterrows() & Performance Relationship]]
25. [[Python - DataFrame.iterrows() Method]]
26. [[Python - Deleting Dictionary Elements]]
27. [[Python - Dictionaries]]
28. [[Python - Dictionary .items() vs NumPy nditer()]]
29. [[Python - Dictionary Key Immutability]]
30. [[Python - Dictionary Key Uniqueness]]
31. [[Python - Dictionary Key-Value Lookup Efficiency]]
32. [[Python - Dictionary Operations]]
33. [[Python - Dictionary Syntax and Creation]]
34. [[Python - Equality Operator]]
35. [[Python - Filtering DataFrames with Boolean Operators]]
36. [[Python - Filtering pandas DataFrames]]
37. [[Python - Importing a CSV into a DataFrame using read_csv]]
38. [[Python - Indentation and Colons in Control Structures]]
39. [[Python - Inequality Operator]]
40. [[Python - Infinite Loops]]
41. [[Python - Iterating Over Pandas DataFrames (The Wrong Way)]]
42. [[Python - Iterating Over a List with a for Loop]]
43. [[Python - Iterating Over a String with a for Loop]]
44. [[Python - Limitations of NumPy for Tabular Data]]
45. [[Python - Lists vs Dictionaries]]
46. [[Python - Looping Over 1D NumPy Arrays]]
47. [[Python - Looping Over Data Structures]]
48. [[Python - Looping Over Dictionaries with .items()]]
49. [[Python - Looping Over N-Dimensional NumPy Arrays with nditer()]]
50. [[02 Production-Ready Python/Python - Mutable vs Immutable Objects]]
51. [[Python - NumPy Array Comparison]]
52. [[Python - Pandas & NumPy Relationship]]
53. [[Python - Pandas DataFrame]]
54. [[Python - Pandas Package]]
55. [[Python - Pandas Series & DataFrame Relationship]]
56. [[Python - Parallel Lists vs Dictionaries]]
57. [[Python - Relational Operators]]
58. [[Python - Selecting a Series vs. a DataFrame]]
59. [[Python - Selecting a pandas Series from a DataFrame]]
60. [[Python - Square Bracket Indexing vs .loc .iloc]]
61. [[Python - Subsetting NumPy Arrays with Boolean Arrays]]
62. [[Python - Tabular Data]]
63. [[Python - Type Comparison Rules]]
64. [[Python - Unordered Nature of Dictionary Iteration]]
65. [[Python - Updating Dictionary Values]]
66. [[Python - Use Cases for while Loops]]
67. [[Python - and Operator]]
68. [[Python - elif Statement]]
69. [[Python - else Statement]]
70. [[Python - for Loop]]
71. [[Python - for Loop Execution Flow]]
72. [[Python - if Statement]]
73. [[Python - if Statement vs while Loop]]
74. [[Python - if-elif-else Control Flow]]
75. [[Python - not Operator]]
76. [[Python - numpy.logical_and]]
77. [[Python - numpy.logical_not]]
78. [[Python - numpy.logical_or]]
79. [[Python - or Operator]]
80. [[Python - while Loop]]
81. [[Python - while Loop Error Reduction Example]]
82. [[Python 2 - enumerate() Function]]