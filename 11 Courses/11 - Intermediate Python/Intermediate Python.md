---
tags:
  - intermediate_python
status: In Progress
start_date: 2026-01-19
end_date:
---
# Course: Intermediate Python

# 1. Summary & Goals

> _A brief, one-paragraph description of the course. What are its main objectives? Why am I taking it, and what key skills do I expect to gain?_

---
# 2. Core Concepts & Notes

_This is the central index for this course. As I create new atomic notes, I will link them here under the relevant module or topic._

## Chapter 1: Matplotlib
---
### 01 - Basic plots with Matplotlib

1. [[Python - Importance of Data Visualization]]
2. [[Python - Matplotlib Library]]
3. [[Python - Matplotlib Pyplot Subpackage]]
4. [[Python - Basic Matplotlib Plotting Workflow]]
5. [[Python - Line Plots with Matplotlib]]
6. [[Python - Scatter Plots with Matplotlib]]
7. [[Python - Line Plot vs Scatter Plot]]

#### **Summary**

This section is about forming a correct mental model of **why Matplotlib works the way it does and what guarantees it gives you when building plots**, not about memorizing plotting commands. The core idea is that Matplotlib—via the [[Python - Matplotlib Pyplot Subpackage]]—operates as a **stateful staging system** where calls like plotting, labeling, and styling progressively mutate an internal figure until a deliberate render step occurs, as explained in [[Python - Basic Matplotlib Plotting Workflow]]. This separation between *defining* a visualization and *showing* it is what enables layered, intentional construction and avoids premature or misleading output, but it also creates a common beginner failure mode where nothing appears because rendering was never triggered. All concrete charts in this section—[[Python - Line Plots with Matplotlib]] and [[Python - Scatter Plots with Matplotlib]]—are just different ways of mapping data into that same workflow, and the real judgment lies in choosing which encoding tells the least misleading story, especially highlighted in [[Python - Line Plot vs Scatter Plot]]. Underneath all of this sits the broader rationale from [[Python - Importance of Data Visualization]]: visuals are interpretive tools, not neutral mirrors of data, and misuse can silently distort conclusions. If you leave this section knowing *that pyplot accumulates intent before rendering and nothing is “drawn” until explicitly shown* and *that chart choice encodes assumptions about continuity, correlation, and honesty*, you are correctly calibrated for everything that follows. Deeper object hierarchies and aesthetic tuning can be deferred until you start needing reproducibility or publication-grade control.

* **Must-read from this section:**
	* [[Python - Basic Matplotlib Plotting Workflow|plotting vs showing]] – establishes the core state-machine mental model everything else depends on
	* [[Python - Line Plot vs Scatter Plot|line vs scatter decision]] – prevents misleading interpretations early, when mistakes are cheapest
- **Revisit this section when**:
	* You move from notebooks to scripts and plots stop appearing or behave inconsistently
	* You catch yourself defaulting to line plots without checking whether continuity is actually justified
	* You need to explain *why* a visualization is appropriate, not just produce one
	* You start generating many plots programmatically and need control over rendering and memory

---

### 02 - Histogram

1. [[Python - Histogram]]
2. [[Python - Histogram Bins]]
3. [[Python - Manual Histogram Creation Process]]
4. [[Python - Creating Histograms with Matplotlib]]
5. [[Python - plt.hist() Function]]
6. [[Python - Population Pyramid Histogram example]]

#### Summary

This section is about understanding **what a histogram truly represents and where the real analytical risk lies**, rather than learning another Matplotlib chart type. A [[Python - Histogram]] is fundamentally a **lossy compression of numerical data into frequency buckets**, designed to expose distributional shape—skew, spread, modality, and outliers—at the cost of exact values, which is why it sits at the core of exploratory analysis rather than reporting. The decisive mental model is that **bins are not a neutral setting**: as detailed in [[Python - Histogram Bins]], bin count and bin boundaries directly control whether structure is revealed or erased, creating a bias–variance tradeoff where too few bins oversmooth reality and too many fabricate noise. What [[Python - Creating Histograms with Matplotlib]] and the [[Python - plt.hist() Function]] give you is not statistical judgment but automation: they collapse the otherwise explicit [[Python - Manual Histogram Creation Process]] into a single call, making it fast to iterate but also easy to lie to yourself unintentionally. The [[Python - Population Pyramid Histogram example]] demonstrates the upper bound of histogram leverage—comparative reasoning across conditions—showing that histograms are most powerful when used to reason about *shape shifts*, not isolated counts. If you leave this section knowing *that a histogram is a modeling choice over distributions, not a raw data display* and *that binning decisions encode assumptions that materially affect conclusions*, you are correctly calibrated for everything that follows.

* **Must-read from this section:**
	* [[Python - Histogram Bins|binning tradeoffs]] – because bin choice is the primary failure mode
	* [[Python - Manual Histogram Creation Process|manual process]] – because it exposes what `plt.hist()` hides
- **Revisit this section when**:
	* A histogram “looks fine” but contradicts intuition or downstream model behavior
	* You need to justify why two histograms of the same data tell different stories
	* You start comparing distributions across time, cohorts, or experimental groups
	* Stakeholders draw strong conclusions from a single-bin configuration

---

### 03 - Customization

1. [[Python - Plot Customization in Matplotlib]]
2. [[Python - Adding Labels and Titles to Matplotlib Plots]]
3. [[Python - Customizing Axis Ticks with yticks()]]
4. [[Python - Adding Data to Existing Plot Lists]]
5. [[Python - Workflow for Enhancing a Matplotlib Plot]]
#### Summary

This section is about shifting from “a plot that renders” to **a plot that communicates**, by treating customization as an intentional, ordered refinement rather than decoration. The governing mental model is that Matplotlib plots are *incrementally staged artifacts*: you first establish the data relationship, then deliberately add context, scale, and narrative, as formalized in [[Python - Workflow for Enhancing a Matplotlib Plot]]. Adding or extending datasets via list concatenation in [[Python - Adding Data to Existing Plot Lists]] is not cosmetic; it changes the evidentiary scope of the plot and can materially alter the perceived trend, which means data aggregation decisions precede visual ones. Labels and titles from [[Python - Adding Labels and Titles to Matplotlib Plots]] are non-negotiable context anchors—without them, interpretation is guesswork—while axis control via [[Python - Customizing Axis Ticks with yticks()]] is a high-leverage but high-risk tool that can clarify magnitude or silently distort it. All of this rolls up into [[Python - Plot Customization in Matplotlib]] as a discipline, not a feature set, and ultimately into [[Data Visualization Storytelling]], where every choice either reinforces or undermines the intended message. If you leave this section knowing *that customization is about controlling interpretation, not aesthetics* and *that data, scale, and annotation must be aligned before rendering*, you are correctly calibrated for everything that follows.


* **Must-read from this section:**
	* [[Python - Workflow for Enhancing a Matplotlib Plot|enhancement workflow]] – establishes the correct order of decisions
	* [[Python - Customizing Axis Ticks with yticks()|axis control risks]] – highest leverage and most common source of distortion
- **Revisit this section when**:
	* A plot “looks right” but different viewers draw different conclusions
	* You extend a dataset and the visual story changes unexpectedly
	* You need to justify axis choices to a critical or non-technical audience
	* You are standardizing plots for reports or dashboards

---

## Chapter 2: Dictionaries and Pandas
---
### 01 - Dictionaries, Part 1

1. [[Python - Dictionaries]]
2. [[Python - Parallel Lists vs Dictionaries]]
3. [[Python - Dictionary Syntax and Creation]]
4. [[Python - Accessing Dictionary Values using Keys]]
5. [[Python - Dictionary Key-Value Lookup Efficiency]]
#### Summary

This section establishes **why dictionaries exist as a first-class data structure and what guarantees they provide**, rather than treating them as syntactic sugar over lists. The core mental model is that a [[Python - Dictionaries|dictionary]] is a **mapping**, not a sequence: it binds unique, immutable keys to values so retrieval is based on meaning rather than position, which is precisely the failure mode exposed in [[Python - Parallel Lists vs Dictionaries]]. The operational payoff of this model is explained by [[Python - Dictionary Key-Value Lookup Efficiency]], where hash-table–backed access gives near-constant-time lookups at scale, trading higher memory usage for predictability and speed. Everything else in the section is a consequence of that choice: [[Python - Dictionary Syntax and Creation]] defines how mappings are initialized, [[Python - Accessing Dictionary Values using Keys]] shows how square-bracket lookup is direct but unforgiving, and the efficiency note sets the boundary conditions under which dictionaries outperform lists decisively. The real risk to internalize is not syntax errors, but **conceptual misuse**—using dictionaries where order matters, or lists where semantic lookup dominates. If you leave this section knowing *that dictionaries are optimized for semantic lookup, not iteration by position* and *that their performance and constraints are a direct result of hash-based design*, you are correctly calibrated for everything that follows. Advanced behaviors and edge cases can be deferred until scale or correctness pressures appear.


* **Must-read from this section:**
	* [[Python - Parallel Lists vs Dictionaries|lists vs dicts motivation]] – clarifies the problem dictionaries actually solve
	* [[Python - Dictionary Key-Value Lookup Efficiency|lookup efficiency]] – explains the performance guarantee that justifies their use
- **Revisit this section when**:
	* You are choosing between lists, dictionaries, or hybrid structures for new data models
	* Lookup speed becomes a bottleneck or correctness depends on key-based access
	* You encounter unexplained `KeyError`s in production code
	* Memory usage vs. performance tradeoffs start to matter


---

### 02 - Dictionaries, Part 2

1. [[Python - Dictionary Key Uniqueness]]
2. [[Python - Dictionary Key Immutability]]
3. [[Python 5 - Mutable vs Immutable Objects]]
4. [[Python - Dictionary Operations]]
5. [[Python - Adding Elements to a Dictionary]]
6. [[Python - Checking for Key Existence in Dictionaries]]
7. [[Python - Updating Dictionary Values]]
8. [[Python - Deleting Dictionary Elements]]
9. [[Python - Lists vs Dictionaries]]
#### Summary

This section is about internalizing **how and why dictionaries are safely mutable, and where that mutability can quietly bite you**, rather than learning isolated operations. The unifying idea is that dictionaries are designed to evolve over time through controlled mutation, as framed in [[Python - Dictionary Operations]] , but every mutation is governed by hard constraints that preserve lookup guarantees. Adding and updating use identical syntax, which is powerful but ambiguous, making [[Python - Dictionary Key Uniqueness]] the invisible rule that decides whether you are inserting new state or overwriting old truth, as surfaced in [[Python - Adding Elements to a Dictionary]] and [[Python - Updating Dictionary Values]]. Deletion completes the lifecycle but introduces failure modes when assumptions about existence are wrong, which is why [[Python - Checking for Key Existence in Dictionaries]] is not defensive boilerplate but a correctness boundary. All of this rests on the deeper invariant that keys must be stable identifiers: [[Python - Dictionary Key Immutability]] ties dictionary safety directly to the guarantees explained in [[Python 5 - Mutable vs Immutable Objects]]. The comparison in [[Python - Lists vs Dictionaries]] clarifies that these rules exist precisely because dictionaries trade positional flexibility for semantic certainty. If you leave this section knowing *that dictionary mutation is safe only because keys are immutable and unique* and *that identical syntax can either extend or silently overwrite state depending on key existence*, you are correctly calibrated for everything that follows.

* **Must-read from this section:**
	* [[Python - Dictionary Key Immutability|key immutability]] – explains the non-negotiable invariant behind safe mutation
	* [[Python - Dictionary Key Uniqueness|key uniqueness]] – determines whether mutation is additive or destructive
- **Revisit this section when**:
	* A dictionary update silently changes behavior without raising errors
	* You are debugging state corruption or missing data in long-running programs
	* You need to decide whether to mutate data in-place or construct new mappings
	* You are refactoring list-based logic into dictionary-based models

---
### 03 - Pandas, Part 1

1. [[Python - Tabular Data]]
2. [[Python - Limitations of NumPy for Tabular Data]]
3. [[Python - Pandas Package]]
4. [[Python - Pandas & NumPy Relationship]]
5. [[Python - Pandas DataFrame]]
6. [[Python - DataFrame Structure (Index, Columns, Data)]]
7. [[Python - Creating a DataFrame from a Dictionary]]
8. [[Python - Importing a CSV into a DataFrame using read_csv]]
9. [[Python - CSV (Comma Separated Values)]]

#### Summary

This section is about **why Pandas exists, what problem it solves over NumPy, and how tabular data moves from files or in-memory structures into a DataFrame**, not about memorizing APIs. The anchor concept is [[Python - Tabular Data]], which frames data as observations and variables arranged in rows and columns; everything else in this batch exists to operationalize that model safely and efficiently. [[Python - Limitations of NumPy for Tabular Data]] explains the forcing function: NumPy’s homogeneous arrays collapse mixed-type columns through upcasting, making them unsuitable for real datasets, which is why [[Python - Pandas Package]] introduces the [[Python - Pandas DataFrame]] as a labeled, heterogeneous structure built on NumPy rather than replacing it, clarified in [[Python - Pandas & NumPy Relationship]]. The [[Python - DataFrame Structure (Index, Columns, Data)]] defines the invariants you rely on for correctness—explicit labels, column-wise typing, and an index that separates identity from data. Data enters this structure either programmatically via [[Python - Creating a DataFrame from a Dictionary]]—useful for small, controlled datasets—or from disk via [[Python - Importing a CSV into a DataFrame using read_csv]], where [[Python - CSV (Comma Separated Values)]] acts as a universal but lossy interchange format. If you leave this section knowing *why Pandas is the correct abstraction for heterogeneous tabular data* and *how DataFrame structure, not file format, governs downstream correctness*, you are correctly calibrated for everything that follows.

* **Must-read from this section:**
	* [[Python - Limitations of NumPy for Tabular Data|NumPy limits]] – explains why Pandas is necessary at all
	* [[Python - DataFrame Structure (Index, Columns, Data)|DataFrame invariants]] – establishes the guarantees you rely on everywhere
- **Revisit this section when**:
	* You are unsure whether a dataset belongs in NumPy, Pandas, or a database
	* CSV imports behave strangely due to types, headers, or index handling
	* Memory usage or performance degrades as datasets grow
	* You need to explain Pandas’ role in a data or ML pipeline

---
### 04 - Pandas, Part 2

1. [[Python - DataFrame Indexing and Selection]]
2. [[Python - DataFrame Column Selection with Square Brackets]]
3. [[Python - Selecting a Series vs. a DataFrame]]
4. [[Python - DataFrame Row Selection with Slicing]]
5. [[Python - DataFrame Label-Based Selection with .loc]]
6. [[Python - DataFrame Position-Based Selection with .iloc]]
7. [[Python - .loc vs .iloc]]
8. [[Python - Square Bracket Indexing vs .loc .iloc]]
9. [[Python - Pandas Series & DataFrame Relationship]]

#### Summary

This section is about building a **precise and defensible mental model for how Pandas selects data**, because most silent bugs and maintenance failures in analysis code originate here. The unifying frame is [[Python - DataFrame Indexing and Selection]], which establishes that Pandas exposes *multiple, intentionally different selection semantics* depending on whether you reason by label, by position, or by structure. Square brackets are overloaded and convenient, but fundamentally ambiguous, as shown in [[Python - DataFrame Column Selection with Square Brackets]] and [[Python - DataFrame Row Selection with Slicing]], where the same syntax can mean column access, row slicing, or boolean filtering depending on context. This ambiguity is why Pandas formalizes intent through explicit accessors: [[Python - DataFrame Label-Based Selection with .loc]] binds selection to stable semantic identifiers, while [[Python - DataFrame Position-Based Selection with .iloc]] binds selection to transient physical order, with their trade-offs made explicit in [[Python - .loc vs .iloc]] and [[Python - Square Bracket Indexing vs .loc .iloc]]. The Series–DataFrame boundary in [[Python - Pandas Series & DataFrame Relationship]] and [[Python - Selecting a Series vs. a DataFrame]] is not cosmetic; it determines dimensionality, method availability, and downstream correctness. If you leave this section knowing *that every selection choice encodes assumptions about stability, intent, and return type* and *that `.loc` and `.iloc` exist to make those assumptions explicit*, you are correctly calibrated for everything that follows.

* **Must-read from this section:**
	* [[Python - DataFrame Indexing and Selection|indexing mental model]] – defines the full selection surface and its guarantees
	* [[Python - .loc vs .iloc|label vs position]] – the most common and costly source of silent errors
- **Revisit this section when**:
	* A selection returns a Series when a DataFrame was expected (or vice versa)
	* Code breaks after sorting, reindexing, or filtering data
	* You see `SettingWithCopyWarning` and are unsure why
	* You are writing reusable or production-grade data pipelines

---

## Chapter 3: Logic, Control Flow and Filtering

---

### 01 - Comparison Operators

1. [[Python - Comparison Operators]]
2. [[Python - Boolean Data Type]]
3. [[Python - Relational Operators]]
4. [[Python - Equality Operator]]
5. [[Python - Inequality Operator]]
6. [[Python - Type Comparison Rules]]
7. [[Python - NumPy Array Comparison]]
8. [[Python - Comparison Operators Cheatsheet]]
#### Summary

This section is about **how Python decides truth, and where comparison logic quietly becomes a source of bugs**, rather than memorizing operators. The foundation is the [[Python - Boolean Data Type]], which constrains all decisions to a binary outcome and forces you to collapse ambiguity early, often before you realize you are doing so. Every comparison funnels through [[Python - Comparison Operators]], but the real risks surface at the boundaries: equality versus inequality in [[Python - Equality Operator]] and [[Python - Inequality Operator]] look symmetric yet behave very differently with floating-point values and complex objects, while relational checks from [[Python - Relational Operators]] encode assumptions about ordering that may not exist. [[Python - Type Comparison Rules]] and the resulting failures described in [[Python - Type Comparison Errors]] mark a deliberate design choice: Python refuses to guess across incompatible types, trading convenience for correctness. This discipline becomes powerful at scale through [[Python - NumPy Array Comparison]], where broadcasting turns scalar logic into vectorized decisions, amplifying both clarity and mistakes. The cheatsheet in [[Python - Comparison Operators Cheatsheet]] is reference material, not understanding. If you leave this section knowing *that every comparison is an explicit claim about type compatibility and meaning* and *that booleans are lossless for control flow but lossy for real-world uncertainty*, you are correctly calibrated for everything that follows.

---

### Must-read notes

* **Must-read from this section:**

  * [[Python - Type Comparison Rules|type boundaries]] – explains why comparisons fail fast instead of guessing
  * [[Python - NumPy Array Comparison|vectorized comparisons]] – where small logical mistakes scale dramatically

---

### Revisit this section when

* Comparisons behave differently after data type changes or ingestion
* Floating-point equality checks start failing unexpectedly
* Boolean masks in NumPy or Pandas produce surprising filters
* You are designing validation or decision logic for external inputs

---
### 02 - Boolean Operators

1. [[Python - Boolean Operators]]
2. [[Python - and Operator]]
3. [[Python - or Operator]]
4. [[Python - not Operator]]
5. [[Python - Boolean Operators on NumPy Arrays]]
6. [[Python - numpy.logical_and]]
7. [[Python - numpy.logical_or]]
8. [[Python - numpy.logical_not]]
9. [[Python - Subsetting NumPy Arrays with Boolean Arrays]]
#### Summary

This section is about **how boolean logic scales from single decisions to dataset-wide filtering, and where Python deliberately splits semantics to avoid ambiguity**, rather than about learning operators in isolation. At the scalar level, [[Python - Boolean Operators]] define how `and`, `or`, and `not` compose truth values, with short-circuiting in [[Python - and Operator]] and [[Python - or Operator]] acting as both a performance optimization and a control-flow guarantee, while [[Python - not Operator]] provides inversion but quickly degrades readability when nested. The critical boundary appears when this logic meets arrays: standard boolean operators fundamentally cannot reason about collections of truth values, which is why [[Python - Boolean Operators on NumPy Arrays]] exists as a parallel system. Here, intent must be made explicit through element-wise functions like [[Python - numpy.logical_and]], [[Python - numpy.logical_or]], and [[Python - numpy.logical_not]], which trade short-circuiting for vectorized determinism. These functions are not syntactic noise; they are the only safe bridge into [[Python - Subsetting NumPy Arrays with Boolean Arrays]], where boolean masks become first-class selectors over data. The real risk is conceptual leakage—assuming scalar logic rules apply unchanged to arrays—which leads to errors or silent misfilters. If you leave this section knowing *why Python forbids `and/or/not` on arrays* and *that boolean masks are data structures, not conditions*, you are correctly calibrated for everything that follows.

---

### Must-read notes

* **Must-read from this section:**

  * [[Python - Boolean Operators on NumPy Arrays|array vs scalar logic]] – defines the semantic split that prevents ambiguity
  * [[Python - Subsetting NumPy Arrays with Boolean Arrays|boolean masking]] – shows where boolean logic becomes data selection

---

### Revisit this section when

* You see `ValueError` from boolean expressions involving NumPy arrays
* A filter unexpectedly drops too much or too little data
* You are chaining many conditions and performance or readability degrades
* You transition from control flow (`if`) to data filtering logic

---
### 03 - if, elif, else

1. [[Python - Conditional Statements]]
2. [[Python - if Statement]]
3. [[Python - else Statement]]
4. [[Python - elif Statement]]
5. [[Python - if-elif-else Control Flow]]
6. [[Python - Indentation and Colons in Control Structures]]
7. [[Python - Comparison & Boolean Operators & Conditional Statements Relationship]]

#### Summary

This section consolidates **how raw truth values become executable decisions**, and where subtle ordering and structure choices create or eliminate entire classes of bugs. The governing relationship is made explicit in [[Python - Comparison & Boolean Operators & Conditional Statements Relationship]], which establishes that comparisons and boolean operators merely *produce* truth, while [[Python - Conditional Statements]] *consume* that truth to redirect execution. The `if` statement in [[Python - if Statement]] is the minimal decision gate—execute or skip—but real programs require mutually exclusive branching, which is why [[Python - if-elif-else Control Flow]] and its execution guarantees in [[Python - if-elif-else Execution Flow]] matter more than syntax: evaluation is strictly top-down and first-match-wins, making condition order a correctness boundary, not a style choice. The [[Python - elif Statement]] exists to flatten logic and avoid nested “arrow” structures, but it introduces its own risk surface when broader conditions shadow narrower ones, while the [[Python - else Statement]] provides a safety net that can either harden systems or silently mask unhandled cases. All of this is enforced—not suggested—by Python’s block definition rules in [[Python - Indentation and Colons in Control Structures]], where whitespace encodes logic itself. If you leave this section knowing *that conditional chains are single, ordered decision units* and *that structure and ordering are as critical as the conditions themselves*, you are correctly calibrated for everything that follows.

---

### Must-read notes

* **Must-read from this section:**

  * [[Python - if-elif-else Execution Flow|first-true-wins model]] – defines the non-negotiable execution guarantee
  * [[Python - Comparison & Boolean Operators & Conditional Statements Relationship|logic-to-control bridge]] – clarifies where truth becomes behavior

---

### Revisit this section when

* A branch of code never executes despite conditions “looking correct”
* New conditions are added and existing behavior changes unexpectedly
* You are refactoring deeply nested decision logic
* Silent fall-throughs into `else` blocks cause incorrect outcomes

---

### 04 - Filtering pandas DataFrames

1. [[Python - Filtering pandas DataFrames]]
2. [[Python - Selecting a pandas Series from a DataFrame]]
3. [[Python - Creating a Boolean Series from a Comparison]]
4. [[Python - Boolean Indexing on a DataFrame]]
5. [[Python - Filtering DataFrames with Boolean Operators]]
#### Summary

This section tightens the bridge between boolean logic and practical data filtering, showing how raw comparisons become actionable selectors once they are expressed as boolean arrays or Series and applied directly to data structures. The core move is understanding that comparisons on NumPy arrays or pandas Series yield element-wise boolean results, which can then be reused as masks to subset arrays or DataFrames, as formalized in [[Python - Creating a Boolean Series from a Comparison|boolean Series creation]] and [[Python - Boolean Indexing on a DataFrame|boolean indexing]]. What matters now is recognizing the boundary between Python’s scalar boolean operators and their vectorized counterparts: `and`, `or`, and `not` do not scale to arrays, which is why NumPy’s logical functions and pandas’ boolean operators exist, a distinction anchored in [[Python - Boolean Operators on NumPy Arrays|boolean operators on arrays]]. Filtering a DataFrame is therefore not a control-flow problem but a data-selection problem, best expressed as a declarative condition applied over columns, as shown in [[Python - Filtering pandas DataFrames|filtering DataFrames]]. You can safely defer performance nuances and compound condition ergonomics until you start chaining filters across multiple columns. If you leave this section knowing *that comparisons produce reusable boolean masks rather than single truth values* and *that filtering is selection, not branching*, you are correctly calibrated for everything that follows.

**Must-read from this section:**

* [[Python - Boolean Indexing on a DataFrame|Boolean indexing]] – this is the mental pivot from logic to selection
* [[Python - Filtering pandas DataFrames|Filtering DataFrames]] – shows the real-world end state of the technique

**Revisit this section when**

* You need to filter rows based on multiple column conditions
* A boolean expression raises an “ambiguous truth value” error
* You start chaining filters and the intent becomes hard to read
* You transition from NumPy array masks to pandas DataFrame logic

---

## Chapter 4: Loops

---
### 01 - while loop

1. [[Python - while Loop]]
2. [[Python - if Statement vs while Loop]]
3. [[Python - Use Cases for while Loops]]
4. [[Python - while Loop Error Reduction Example]]
5. [[Python - Infinite Loops]]
#### Summary

This section establishes `while` **loops as condition-driven control structures**, emphasizing that execution is governed by a boolean condition evaluated *before* each iteration, not by a predetermined sequence length as with `for` loops ([[Python - while Loop|while loop core]]). The critical mental model is that a `while` loop represents *“keep going until the world changes”*, which makes it powerful for stateful processes like input validation, retries, and convergence logic ([[Python - Use Cases for while Loops|use cases]]), but also inherently risky if termination is not explicitly guaranteed ([[Python - Infinite Loops|infinite loops]]). The dominant failure mode is forgetting to update the loop condition’s controlling state, which silently converts intent into non-terminating execution; this risk is mitigated by deliberate state mutation and condition checks placed close together ([[Python - while Loop Error Reduction Example|error reduction example]]). A key boundary is understanding when a `while` loop is *incorrect by design*: if iteration count is known or data is iterable, `for` is clearer and safer ([[Python - if Statement vs while Loop|if vs while comparison]]). If you leave this section knowing *that a `while` loop’s correctness depends entirely on an explicit termination guarantee* and *that its primary value lies in condition-controlled repetition rather than traversal*, you are correctly calibrated for everything that follows.

**Must-read from this section:**
* [[Python - while Loop|while loop core]] – defines the governing execution model
* [[Python - Infinite Loops|infinite loops]] – exposes the primary real-world failure mode
* [[Python - Use Cases for while Loops|use cases]] – clarifies when `while` is the right abstraction

* **Revisit this section when**
	* You design logic that waits for valid input, external state change, or convergence
	* A program hangs or runs indefinitely without obvious errors
	* You are choosing between `for` and `while` and feel uncertain about intent clarity
	* You need to reason about termination guarantees in control flow

---
### 02 - for loop

1. [[Python - for Loop]]
2. [[Python - Iterating Over a List with a for Loop]]
3. [[Python - for Loop Execution Flow]]
4. [[Python 2 - enumerate() Function]]
5. [[Python - Iterating Over a String with a for Loop]]

#### Summary

This section reframes looping as **deterministic traversal over an iterable**, not as “repeated execution,” and the distinction matters for correctness, readability, and failure avoidance. The governing abstraction is the [[Python - for Loop]], which delegates iteration mechanics to the iterable itself, guaranteeing termination once the sequence is exhausted, as formalized in [[Python - for Loop Execution Flow]]. This makes `for` the default tool whenever the data boundary is known, contrasting sharply with condition-driven repetition in `while`. Iteration over concrete sequences—lists in [[Python - Iterating Over a List with a for Loop]] and strings in [[Python - Iterating Over a String with a for Loop]]—follows the same execution contract: one element at a time, in order, with no implicit index unless explicitly requested. That absence is intentional, and the [[Python 2 - enumerate() Function]] exists to surface position only when it is semantically meaningful, avoiding fragile manual counters and off-by-one errors. The real risk in this section is misusing `for` as a control structure rather than a traversal primitive—modifying the iterable mid-loop, relying on implicit indices, or using `for` where termination is conditional rather than structural. If you leave this section knowing *that `for` loops are defined by the iterable’s boundaries, not your conditions* and *that `enumerate()` is the canonical way to bind position to value*, you are correctly calibrated for everything that follows.

---

### Must-read notes

* **Must-read from this section:**

  * [[Python - for Loop Execution Flow|execution contract]] – defines why `for` loops are safe and predictable
  * [[Python 2 - enumerate() Function|index-value pairing]] – eliminates the most common iteration errors

---

### Revisit this section when

* You find yourself manually managing counters inside loops
* Loop behavior changes after modifying the underlying collection
* You are deciding between `for` and `while` and termination logic feels unclear
* Performance or correctness issues appear in large-scale iteration

---
### 03 - Loop Data Structures Part 1

1. [[Python - Looping Over Data Structures]]
2. [[Python - Looping Over Dictionaries with .items()]]
3. [[Python - Unordered Nature of Dictionary Iteration]]
4. [[Python - Looping Over 1D NumPy Arrays]]
5. [[Python - Looping Over N-Dimensional NumPy Arrays with nditer()]]
6. [[Python - Dictionary .items() vs NumPy nditer()]]
#### Summary

This section is about **choosing the correct iteration model based on the shape and semantics of your data**, not about learning more `for` loop syntax. The unifying idea in [[Python - Looping Over Data Structures]] is that Python’s `for` loop is stable, but *what it yields* depends entirely on the data structure’s contract. Dictionaries are semantic containers, not sequences, which is why iterating safely means using [[Python - Looping Over Dictionaries with .items()]] to expose key–value meaning explicitly, while remaining aware—per [[Python - Unordered Nature of Dictionary Iteration]]—that iteration order is not a logical guarantee you should build behavior on. NumPy arrays, by contrast, are numeric grids, and looping over them naively only works cleanly for 1D data as shown in [[Python - Looping Over 1D NumPy Arrays]]; once dimensionality increases, element-wise intent must be made explicit via [[Python - Looping Over N-Dimensional NumPy Arrays with nditer()]]. The comparison in [[Python - Dictionary .items() vs NumPy nditer()]] matters because it exposes a deeper design split: dictionaries embed iteration as an object method reflecting structure, while NumPy externalizes iteration into specialized, performance-aware utilities. What you must internalize now is *what each loop yields and why*; what can be deferred is performance tuning or vectorization alternatives. If you leave this section knowing *that iteration semantics come from the data structure, not the loop* and *that misuse usually stems from assuming sequence behavior where none exists*, you are correctly calibrated for everything that follows.

---

### Must-read notes

**Must-read from this section:**

* [[Python - Looping Over Data Structures|iteration mental model]] – establishes how the same loop adapts across structures
* [[Python - Dictionary .items() vs NumPy nditer()|iteration comparison]] – reveals the structural vs numeric iteration split

---

### Revisit this section when

* A loop yields unexpected values (keys, rows, or arrays instead of scalars)
* You move from 1D to multi-dimensional NumPy data
* Code logic silently depends on dictionary iteration order
* Performance issues surface in element-wise array processing

---
### 04 - Loop Data Structures Part 2

1. [[Python - Iterating Over Pandas DataFrames (The Wrong Way)]]
2. [[Python - DataFrame.iterrows() Method]]
3. [[Python - Adding a DataFrame Column via Iteration]]
4. [[Python - DataFrame.iterrows() & Performance Relationship]]
5. [[Python - DataFrame.apply() Method]]
6. [[Python - .iterrows() vs .apply()]]

#### Summary

This section is about **unlearning the instinct to “loop like Python” when working with Pandas**, and replacing it with a performance-aware mental model of *columnar transformation vs row-wise inspection*. The critical warning is made explicit in [[Python - Iterating Over Pandas DataFrames (The Wrong Way)]], which frames naive row-by-row loops as an anti-pattern not because they are incorrect, but because they silently destroy scalability. The root cause is structural: [[Python - DataFrame.iterrows() Method]] yields a *new Series object per row*, and as formalized in [[Python - DataFrame.iterrows() & Performance Relationship]], this repeated object creation is the dominant performance sink. By contrast, [[Python - DataFrame.apply() Method]] operates at the Series level, pushing iteration into Pandas’ internal machinery and preserving intent while avoiding Python-level loops, a distinction sharpened in [[Python - .iterrows() vs .apply()]]. The note on [[Python - Adding a DataFrame Column via Iteration]] is important not as a recommendation, but as a pedagogical bridge: it shows *why* beginners reach for iteration, and why that intuition must be actively overridden. What you must internalize now is *when row context is genuinely required* versus when it is a habit. If you leave this section knowing *that iterrows() is for inspection, not transformation* and *that apply() is a compromise, not the endgame*, you are correctly calibrated for everything that follows.

---

### Must-read notes

**Must-read from this section:**

* [[Python - Iterating Over Pandas DataFrames (The Wrong Way)|anti-pattern framing]] – prevents scaling failures early
* [[Python - .iterrows() vs .apply()|core comparison]] – defines the practical decision boundary
* [[Python - DataFrame.iterrows() & Performance Relationship|performance mechanism]] – explains *why* the slowdown happens

---

### Revisit this section when

* A DataFrame operation that “worked fine before” becomes unbearably slow
* You feel tempted to add multiple new columns inside a for-loop
* You are refactoring exploratory code into something production-facing
* Dataset size grows enough that runtime or memory becomes visible

---
## Chapter 5: Random Numbers and Distribution

---
### 01 - Random Numbers

1. [[Python - Hacker Statistics]]
2. [[Python - Empire State Building Walk Simulation Problem]]
3. [[Python - Random Number Generation with NumPy]]
4. [[Python - Pseudo-Random Numbers]]
5. [[Python - Random Seed]]
6. [[Python - Reproducibility in Random Simulations]]
7. [[Python - Random Seed & Reproducibility Relationship]]
8. [[Python - numpy.random.rand()]]
9. [[Python - numpy.random.randint()]]
10. [[Python - Coin Toss Simulation Example]]

#### Summary

This section reframes randomness as a **controlled, deterministic tool for reasoning about uncertainty**, not as something mystical or uncontrolled. The foundation is that all randomness used here is based on [[Python - Pseudo-Random Numbers]], meaning every “random” outcome is generated by a deterministic algorithm whose behavior is entirely governed by a [[Python - Random Seed]], a causal relationship made explicit in [[Python - Random Seed & Reproducibility Relationship]] and operationalized through [[Python - Reproducibility in Random Simulations]]. On top of this mechanism sits [[Python - Random Number Generation with NumPy]] and, more concretely, the generators in [[Random Generators in NumPy]], where the distinction between continuous randomness ([[Python - numpy.random.rand()]]) and discrete randomness ([[Python - numpy.random.randint()]]) determines what kind of real-world process you are modeling. These tools enable [[Python - Hacker Statistics]], which replaces closed-form probability with repeated simulation, a shift illustrated concretely by [[Python - Coin Toss Simulation Example]] for simple binary events and scaled up in [[Python - Empire State Building Walk Simulation Problem]] to model complex, stateful random walks. The key risk boundary is model validity: simulations are only as trustworthy as the rules and distributions they encode, and reproducibility exists to debug logic, not to guarantee correctness. You can defer optimization, distribution theory, and large-scale Monte Carlo concerns for now. If you leave this section knowing *that randomness in code is deterministic and seed-controlled* and *that simulation estimates probability by repetition, not calculation*, you are correctly calibrated for everything that follows.

---

### Must-read notes

**Must-read from this section:**

* [[Python - Pseudo-Random Numbers|deterministic randomness]] – anchors all later intuition about “random” behavior
* [[Python - Random Seed & Reproducibility Relationship|seed–outcome causality]] – defines why results repeat exactly
* [[Python - Hacker Statistics|simulation-first probability]] – establishes the computational mindset shift

---

### Revisit this section when

* Two runs of the same simulation produce different results unexpectedly
* You need to justify simulation-based probabilities to a skeptical audience
* A stochastic model behaves plausibly but gives inconsistent conclusions
* You scale from toy simulations to thousands or millions of trials

---

### 02 - Random Walk

1. [[Python - Random Walk]]
2. [[Python - Random Step]]
3. [[Python - Head or Tails]]
4. [[Python - Simulating a Random Walk]]

#### Summary

This section completes the transition from *independent randomness* to *stateful stochastic processes* by showing how simple random events accumulate into structured paths over time. The atomic unit is the [[Python - Random Step]], a single random outcome (often derived from [[Python - Head or Tails]]) that is memoryless on its own, but becomes consequential once it is added to prior state. A [[Python - Random Walk]] is precisely this accumulation: each new position is computed from the immediately previous position plus a new random step, a dependency formalized and made concrete in [[Python - Simulating a Random Walk]]. The critical mental shift is recognizing that the output of interest is no longer the sequence of random draws, but the *trajectory* they generate; history matters because state is carried forward, even though the randomness itself remains memoryless. This is the first place where bugs tend to hide, because off-by-one indexing, incorrect initialization, or misunderstanding what constitutes “state” silently corrupts the walk. You can defer theoretical extensions (bias, multi-dimensional walks, Markov chains) until later; what matters now is internalizing the state-update pattern. If you leave this section knowing *how a random step differs from a random walk* and *how cumulative state transforms independent randomness into a path*, you are correctly calibrated for everything that follows.

---

### Must-read notes

**Must-read from this section:**

* [[Python - Random Walk|random walk mental model]] – defines the stateful accumulation boundary
* [[Python - Simulating a Random Walk|state update logic]] – exposes where most implementation errors occur

---

### Revisit this section when

* You start modeling processes where the past influences the present
* Simulation results look plausible but drift unexpectedly over time
* You move from single-trial simulations to trajectories and paths
* You begin visualizing stochastic processes rather than raw outcomes

---

### 03 - Distribution

1. [[Statistics - Random Walk]]
2. [[Statistics - Distribution of a Random Walk]]
3. [[Statistics - Simulating a Random Walk Distribution]]
4. [[Python - Visualizing Distributions with Histograms]]
5. [[Statistics - Simulated vs Theoretical Distribution Relationship]]

#### Summary

This section closes the loop between *simulation*, *aggregation*, and *statistical meaning* by showing how many individual random processes collapse into a stable, interpretable distribution. The key transition is from observing a single path, as formalized in [[Statistics - Random Walk]], to collecting only the *final states* of many such paths to study their behavior in aggregate, which is the focus of [[Statistics - Simulating a Random Walk Distribution]] and [[Statistics - Distribution of a Random Walk]]. Histograms, introduced earlier, now become analytical instruments rather than exploratory visuals: [[Python - Visualizing Distributions with Histograms]] demonstrates how increasing the number of simulations smooths empirical noise and reveals the underlying shape, while [[Statistics - Simulated vs Theoretical Distribution Relationship]] explains why this convergence is expected rather than coincidental. The governing principle is that randomness at the micro level produces regularity at scale, provided trials are independent and identically distributed—a boundary condition that silently underwrites all conclusions here. What you must understand now is that distributions are properties of *processes*, not of single runs, and that simulation is a legitimate proxy for theory when repetition is large enough. Formal probability theory and closed-form derivations can be deferred. If you leave this section knowing *why aggregating final outcomes reveals structure invisible in single runs* and *how sample size controls the gap between simulated and theoretical distributions*, you are correctly calibrated for everything that follows.

---

### Must-read notes

**Must-read from this section:**

* [[Statistics - Simulating a Random Walk Distribution|simulation-to-distribution jump]] – defines the methodological shift from paths to probabilities
* [[Statistics - Simulated vs Theoretical Distribution Relationship|convergence logic]] – explains why simulation results stabilize with scale

---

### Revisit this section when

* Simulation outputs look noisy and you are unsure if results are trustworthy
* You need to justify Monte Carlo results without closed-form solutions
* Increasing trial counts changes conclusions materially
* You begin reasoning about variance, spread, or risk rather than single outcomes


---
# 3. Key Takeaways & Reflections

_After completing the course, what are the 2-3 most important ideas that I will carry forward? Were there any "aha!" moments that connected this topic to others in a new way?_

- **Everything covered in this course:** [[Python 2 - Major Takeaways]]
- **Everything covered in this course:** [[Python 2 - Major Takeaways 1]]
- **Cheat Sheet:** [[Python 2 - Cheat Sheet]]


---
# 4. Related Projects & Applications

_A list of projects where I have applied the skills from this course. This directly links my theoretical knowledge to practical, portfolio-worthy application._

[[Python 2 - Exercise Plan]]
[[Python 2 - Exercise Plan 1]]


---