## Chapter 1: Seeing Data as an Argument (Matplotlib)

### Exercise 1.1 – From Numbers to Claims

> [[Python 2 - Exercise 1.1]]

Covers:

* [[Python - Importance of Data Visualization]]
* [[Python - Matplotlib Library]]
* [[Python - Basic Matplotlib Plotting Workflow]]

> When does a plot stop being “output” and start becoming an argument?

Focus:

* Visualization as interpretation, not decoration
* Separation between intent (staging) and commitment (rendering)

Onwards:
Establishes plotting as a deliberate act, enabling critical choices between plot types next.

---

### Exercise 1.2 – Encoding Continuity and Relationship

Covers:

* [[Python - Line Plots with Matplotlib]]
* [[Python - Scatter Plots with Matplotlib]]
* [[Python - Line Plot vs Scatter Plot]]

> What analytical claim do you make when you connect points?

Focus:

* Order vs independence in data
* Choosing representations that match reality

Onwards:
Prepares the ground for distribution-focused thinking instead of point-wise relationships.

---

### Exercise 1.3 – From Individual Points to Distributions

Covers:

* [[Python - Histogram]]
* [[Python - Manual Histogram Creation Process]]
* [[Python - Histogram Bins]]

> What do we gain and lose when we summarize data into bins?

Focus:

* Precision vs shape
* How binning creates signal or noise

Onwards:
Enables responsible use of automated histogram tools without treating them as magic.

---

### Exercise 1.4 – Automating Exploration Without Losing Control

Covers:

* [[Python - Creating Histograms with Matplotlib]]
* [[Python - plt.hist() Function]]
* [[Python - Population Pyramid Histogram example]]

> How do we use automation while preserving analytical intent?

Focus:

* Understanding what matplotlib abstracts away
* Comparative distribution analysis

Onwards:
Sets the stage for storytelling and refinement through customization.

---

### Exercise 1.5 – Plot Refinement as Narrative Control

Covers:

* [[Python - Adding Data to Existing Plot Lists]]
* [[Python - Adding Labels and Titles to Matplotlib Plots]]
* [[Python - Customizing Axis Ticks with yticks()]]
* [[Python - Plot Customization in Matplotlib]]
* [[Python - Workflow for Enhancing a Matplotlib Plot]]

> How does refinement change interpretation without changing data?

Focus:

* Incremental enhancement workflow
* Ethics of visual emphasis and scale

Onwards:
Completes the visualization arc, preparing structured data to feed into plots next.

---

## Chapter 2: Meaningful Structure (Dictionaries and Pandas)

### Exercise 2.1 – From Positional Data to Semantic Access

Covers:

* [[Python - Dictionaries]]
* [[Python - Parallel Lists vs Dictionaries]]
* [[Python - Lists vs Dictionaries]]

> Why is meaning more powerful than position?

Focus:

* Eliminating index coupling
* Semantic correctness over ordering

Onwards:
Allows safe mutation and evolution of program state.

---

### Exercise 2.2 – Controlled Mutation and Safety

Covers:

* [[Python - Dictionary Syntax and Creation]]
* [[Python - Accessing Dictionary Values using Keys]]
* [[Python - Dictionary Operations]]
* [[Python - Adding Elements to a Dictionary]]
* [[Python - Updating Dictionary Values]]
* [[Python - Deleting Dictionary Elements]]
* [[Python - Checking for Key Existence in Dictionaries]]

> How do we let state evolve without breaking assumptions?

Focus:

* Safe access patterns
* Preventing KeyError and silent overwrites

Onwards:
Leads naturally to why dictionaries behave reliably under the hood.

---

### Exercise 2.3 – Why Dictionaries Work

Covers:

* [[Python - Dictionary Key-Value Lookup Efficiency]]
* [[Python - Dictionary Key Uniqueness]]
* [[Python - Dictionary Key Immutability]]
* [[02 Production-Ready Python/Python - Mutable vs Immutable Objects]]

> What constraints make dictionaries fast and reliable?

Focus:

* Hashing and immutability
* Last-write-wins semantics

Onwards:
Transitions from small semantic containers to large-scale tabular data.

---

### Exercise 2.4 – Thinking in Tables, Not Arrays

Covers:

* [[Python - Tabular Data]]
* [[Python - Pandas Package]]
* [[Python - Pandas DataFrame]]
* [[Python - DataFrame Structure (Index, Columns, Data)]]
* [[Python - Pandas & NumPy Relationship]]
* [[Python - Limitations of NumPy for Tabular Data]]

> What breaks when we force real data into arrays?

Focus:

* Identity, alignment, and labels
* Mixed-type reality of data

Onwards:
Enables correct ingestion of external data sources.

---

### Exercise 2.5 – From Files to Frames

Covers:

* [[Python - CSV (Comma Separated Values)]]
* [[Python - Creating a DataFrame from a Dictionary]]
* [[Python - Importing a CSV into a DataFrame using read_csv]]

> How does raw data become analyzable structure?

Focus:

* Type ambiguity in CSVs
* Programmatic vs file-based creation

Onwards:
Prepares precise selection and slicing of structured data.

---

### Exercise 2.6 – Selecting With Intent

Covers:

* [[Python - DataFrame Indexing and Selection]]
* [[Python - DataFrame Column Selection with Square Brackets]]
* [[Python - DataFrame Row Selection with Slicing]]
* [[Python - DataFrame Label-Based Selection with .loc]]
* [[Python - DataFrame Position-Based Selection with .iloc]]
* [[Python - .loc vs .iloc]]
* [[Python - Square Bracket Indexing vs .loc .iloc]]
* [[Python - Pandas Series & DataFrame Relationship]]
* [[Python - Selecting a Series vs. a DataFrame]]

> Why is ambiguity dangerous in data selection?

Focus:

* Label vs position semantics
* Dimensionality awareness

Onwards:
Allows boolean logic to act directly on data structures.

---

## Chapter 3: Truth, Decisions, and Filtering

### Exercise 3.1 – Establishing Truth

Covers:

* [[Python - Boolean Data Type]]
* [[Python - Comparison Operators]]
* [[Python - Equality Operator]]
* [[Python - Inequality Operator]]
* [[Python - Relational Operators]]
* [[Python - Type Comparison Rules]]
* [[Python - Comparison Operators Cheatsheet]]

> What does it mean for a condition to be true?

Focus:

* Value vs identity
* Comparability constraints

Onwards:
Enables compound logic and array-level reasoning.

---

### Exercise 3.2 – Logic at Scale

Covers:

* [[Python - Boolean Operators]]
* [[Python - and Operator]]
* [[Python - or Operator]]
* [[Python - not Operator]]
* [[Python - NumPy Array Comparison]]
* [[Python - Boolean Operators on NumPy Arrays]]
* [[Python - numpy.logical_and]]
* [[Python - numpy.logical_or]]
* [[Python - numpy.logical_not]]
* [[Python - Subsetting NumPy Arrays with Boolean Arrays]]

> Why do scalar rules fail on arrays?

Focus:

* Element-wise logic
* Boolean masks as selectors

Onwards:
Directly feeds into DataFrame filtering.

---

### Exercise 3.3 – Decision Flow

Covers:

* [[Python - Conditional Statements]]
* [[Python - if Statement]]
* [[Python - elif Statement]]
* [[Python - else Statement]]
* [[Python - if-elif-else Control Flow]]
* [[Python - Comparison & Boolean Operators & Conditional Statements Relationship]]
* [[Python - Indentation and Colons in Control Structures]]

> How does truth redirect execution?

Focus:

* Top-down evaluation
* Default paths and hidden cases

Onwards:
Completes the mental bridge from logic to data filtering.

---

### Exercise 3.4 – Filtering DataFrames as Logic

Covers:

* [[Python - Creating a Boolean Series from a Comparison]]
* [[Python - Boolean Indexing on a DataFrame]]
* [[Python - Filtering DataFrames with Boolean Operators]]
* [[Python - Filtering pandas DataFrames]]
* [[Python - Selecting a pandas Series from a DataFrame]]

> Why filtering is not control flow?

Focus:

* Masks vs decisions
* Alignment guarantees

Onwards:
Sets up iteration and transformation patterns.

---

## Chapter 4: Iteration as Controlled Repetition

### Exercise 4.1 – Condition-Driven Loops

Covers:

* [[Python - while Loop]]
* [[Python - Use Cases for while Loops]]
* [[Python - Infinite Loops]]
* [[Python - while Loop Error Reduction Example]]
* [[Python - if Statement vs while Loop]]

> When does repetition replace decision?

Focus:

* State mutation
* Termination guarantees

Onwards:
Transitions to deterministic iteration.

---

### Exercise 4.2 – Traversing Structures Safely

Covers:

* [[Python - for Loop]]
* [[Python - for Loop Execution Flow]]
* [[Python - Iterating Over a List with a for Loop]]
* [[Python - Iterating Over a String with a for Loop]]
* [[Python 2 - enumerate() Function]]

> Who controls iteration: you or the data?

Focus:

* Iterable ownership
* Index-value coupling

Onwards:
Expands iteration across structures.

---

### Exercise 4.3 – Meaning vs Structure in Iteration

Covers:

* [[Python - Looping Over Data Structures]]
* [[Python - Looping Over Dictionaries with .items()]]
* [[Python - Unordered Nature of Dictionary Iteration]]
* [[Python - Looping Over 1D NumPy Arrays]]
* [[Python - Looping Over N-Dimensional NumPy Arrays with nditer()]]
* [[Python - Dictionary .items() vs NumPy nditer()]]

> What does iteration expose: meaning or memory layout?

Focus:

* Semantic vs structural traversal
* Performance implications

Onwards:
Frames why DataFrame iteration is dangerous.

---

### Exercise 4.4 – Transforming Data the Right Way

Covers:

* [[Python - Iterating Over Pandas DataFrames (The Wrong Way)]]
* [[Python - DataFrame.iterrows() Method]]
* [[Python - DataFrame.iterrows() & Performance Relationship]]
* [[Python - DataFrame.apply() Method]]
* [[Python - .iterrows() vs .apply()]]
* [[Python - Adding a DataFrame Column via Iteration]]

> Why intuition fails at scale?

Focus:

* Vectorization mindset
* Internal vs external iteration

Onwards:
Prepares for simulation and repeated computation.

---

## Chapter 5: Randomness, Simulation, and Emergence

### Exercise 5.1 – Deterministic Randomness

Covers:

* [[Python - Pseudo-Random Numbers]]
* [[Python - Random Seed]]
* [[Python - Random Seed & Reproducibility Relationship]]
* [[Python - Reproducibility in Random Simulations]]

> How can randomness be repeatable?

Focus:

* Sequence determinism
* Scientific trust

Onwards:
Enables controlled random generation.

---

### Exercise 5.2 – Generating Random Events

Covers:

* [[Python - Random Number Generation with NumPy]]
* [[Python - numpy.random.rand()]]
* [[Python - numpy.random.randint()]]
* [[Python - Coin Toss Simulation Example]]

> How do numbers become events?

Focus:

* Mapping ranges to meaning
* Vectorized generation

Onwards:
Introduces state accumulation.

---

### Exercise 5.3 – From Events to Paths

Covers:

* [[Python - Head or Tails]]
* [[Python - Random Step]]
* [[Python - Random Walk]]
* [[Python - Simulating a Random Walk]]

> What changes when history matters?

Focus:

* Stateful simulation
* Accumulation patterns

Onwards:
Allows distributional reasoning over many simulations.

---

### Exercise 5.4 – Emergence and Convergence

Covers:

* [[Statistics - Random Walk]]
* [[Statistics - Simulating a Random Walk Distribution]]
* [[Statistics - Distribution of a Random Walk]]
* [[Python - Visualizing Distributions with Histograms]]
* [[Statistics - Simulated vs Theoretical Distribution Relationship]]
* [[Python - Empire State Building Walk Simulation Problem]]
* [[Python - Hacker Statistics]]

> How does probability emerge from repetition?

Focus:

* Empirical vs theoretical distributions
* Scale and convergence

Onwards:
Closes the full loop back to visualization as evidence.

---