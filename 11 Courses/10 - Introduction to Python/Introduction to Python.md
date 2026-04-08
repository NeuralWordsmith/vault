---
tags:
  - python
status: Completed
start_date: 2026-01-12
end_date: 2026-02-01
---
# Course: Introduction to Python

# 1. Summary & Goals

> _Python is a general-purpose programming language that is becoming ever more popular for data science. Companies worldwide are using Python to harvest insights from their data and gain a competitive edge. Unlike other Python tutorials, this course focuses on Python specifically for data science. In our Introduction to Python course, you'll learn about powerful ways to store and manipulate data, and helpful data science tools to begin conducting your own analyses._

---

# 2. Core Concepts & Notes
---
## Chapter 1: Python Basics

### 01 - Introduction

1. [[Python - History & Creator]]
2. [[Python - Key Characteristics]]
3. [[Python - Role in Data Science]]
4. [[Python - Python Shell]]
5. [[Python - IPython]]
6. [[Python - Python Scripts]]
7. [[Python - Interactive Shell vs Scripts]]
8. [[Python - Recommended Workflow for Learning]]
9. [[Python - print Command]]

#### Summary

This section establishes Python’s practical mental model as a **general-purpose, interpreted language optimized for human workflow rather than raw machine efficiency**, and everything here is about choosing the right execution context for intent. Python’s origin and philosophy in [[Python - History & Creator|history and creator]] explain why readability and approachability are not cosmetic traits but deliberate design constraints that shape how systems are written and maintained. Its dominance emerges from the reinforcing loop described in [[Python - Key Characteristics|key characteristics]]—open source, ecosystem depth, and versatility—which makes Python viable across domains without committing you prematurely to specialization, a trade-off that matters once performance ceilings appear. The distinction between exploratory and production thinking is encoded in the contrast between [[Python - Python Shell|the interactive shell]] (and its enhanced form in [[Python - IPython|IPython]]) versus [[Python - Python Scripts|scripts]], where immediacy trades off against reproducibility, auditability, and automation, a boundary clarified explicitly in [[Python - Interactive Shell vs Scripts|interactive shell vs scripts]]. The requirement to be explicit about output in scripts via [[Python - print Command|print()]] is not syntactic trivia but a signal that scripts are meant to communicate intentionally rather than conversationally. Finally, [[Python - Role in Data Science|Python’s role in data science]] is a consequence of these properties, not a separate identity. *If you leave this section knowing* ***when to stay interactive versus when to formalize into scripts*** and *why Python’s ecosystem, not its syntax, is its real leverage*, you are correctly calibrated for everything that follows.

* **Must-read from this section:**
	* [[Python - Interactive Shell vs Scripts|Shell vs scripts]] – defines the core execution boundary you will rely on constantly
	* [[Python - Key Characteristics|Key characteristics]] – explains why Python scales socially even when it doesn’t scale computationally
	* [[Python - Recommended Workflow for Learning|Recommended workflow]] – aligns tools with learning intent to avoid false progress
- **Revisit this section when**:
	* You find yourself unsure whether a task should live in a notebook, shell session, or script
	* Your scripts start growing and you feel friction around output, debugging, or reuse
	* You begin evaluating Python against other languages for performance-sensitive work
	* You notice dependency or environment complexity increasing and need to reassess trade-offs


---

### 02 - Variables and Types
 
1. [[Python - Variables]]
2. [[Python - Variable Assignment]]
3. [[Python - Using Variables in Calculations]]
4. [[Python - Variables for Code Reproducibility]]
5. [[Python - Data Types]]
6. [[Python - type() Function]]
7. [[Python - Float Data Type]]
8. [[Python - Integer (int) Data Type]]
9. [[Python - String (str) Data Type]]
10. [[Python - Boolean (bool) Data Type]]
11. [[Python - Type-Dependent Operator Behavior]]

#### Summary

This section establishes the **foundational contract between names, values, and behavior in Python**, where [[Python - Variables|variables]] act as stable labels for changeable values, and correctness depends on understanding that meaning emerges from [[Python - Data Types|data types]] rather than syntax alone. Python’s dynamic typing means a variable’s type is inferred at assignment and can change over time, which increases speed and expressiveness but shifts responsibility to you to reason about [[Python - Type-Dependent Operator Behavior|type-dependent operator behavior]], where the same operator can add, concatenate, or error depending on operand types. The core primitives—[[Python - Integer (int) Data Type|int]], [[Python - Float Data Type|float]], [[Python - String (str) Data Type|string]], and [[Python - Boolean (bool) Data Type|bool]]—define clear boundaries: integers are exact and discrete, floats enable continuous values but introduce precision risk, strings prioritize representation over computation, and booleans gate control flow rather than carry nuance. Using variables inside expressions, as described in [[Python - Using Variables in Calculations|using variables in calculations]], is less about arithmetic and more about separating logic from data to preserve clarity and changeability, which directly enables [[Python - Variables for Code Reproducibility|reproducibility]]. The [[Python - type() Function|type() function]] exists as an inspection tool, not a crutch, helping you diagnose state when behavior surprises you. *If you leave this section knowing* ***that operators do not have meaning independent of data types*** and *that* ***variables exist to stabilize logic while values change***, you are correctly calibrated for everything that follows.


* **Must-read from this section:**
	* [[Python - Data Types|data types]] – defines the behavioral boundaries everything else relies on
	* [[Python - Type-Dependent Operator Behavior|operator behavior]] – prevents the most common early bugs
	* [[Python - Variables for Code Reproducibility|variables for reproducibility]] – explains why naming is a design decision, not syntax
- **Revisit this section when**
	* You encounter unexpected results from simple expressions that “look correct”
	* You start refactoring calculations and want to avoid hidden logic breakage
	* You see `TypeError` frequently and can’t predict why
	* You begin writing longer scripts where changing one value should not require rewriting logic

---
## Chapter 2: Python Lists

### 01 - Python Lists

1. [[Python - Lists]]
2. [[Python - List Creation]]
3. [[Python - Lists with Mixed Data Types]]
4. [[Python - Nested Lists]]
5. [[Python - List as a Data Type]]
6. [[Python - Basic Data Types Cheatsheet]]

#### Summary

This section introduces **lists as the first real step from scalar values to structured data**, and the key mental shift is that a list is not “many variables” but a **single mutable container whose meaning comes from order and grouping**, as defined in [[Python - Lists|lists]]. Unlike the basic, single-value types summarized in [[Python - Basic Data Types Cheatsheet|basic data types cheatsheet]], lists exist to model collections whose size and contents can change over time, which is why mutability is the defining guarantee and also the primary risk. Understanding [[Python - List as a Data Type|list as a data type]] matters now because it explains why lists can hold heterogeneous elements, a convenience that accelerates early learning but can quietly introduce ambiguity if structure is not intentional. Creation mechanics in [[Python - List Creation|list creation]] are straightforward and can be treated as solved once recognized, while [[Python - Lists with Mixed Data Types|mixed-type lists]] should be understood as permitted but used deliberately, not reflexively. The real boundary appears with [[Python - Nested Lists|nested lists]], where lists become a tool for representing 2D or grouped data, but also where performance, readability, and correctness risks increase if shape assumptions are implicit. *If you leave this section knowing* ***when a list is the right abstraction versus multiple variables*** and *how* ***mutability and nesting change both power and failure modes***, you are correctly calibrated for everything that follows.


* **Must-read from this section:**
	* [[Python - Lists|lists]] – establishes the core mental model and trade-offs
	* [[Python - List as a Data Type|list as a data type]] – explains heterogeneity and mutability risks
	* [[Python - Nested Lists|nested lists]] – marks the boundary where structure starts to matter
- **Revisit this section when**
	* Your lists start containing “related groups” and indexing becomes hard to reason about
	* Bugs appear after modifying a list in one place and observing changes elsewhere
	* You begin modeling table-like or grid-like data without external libraries
	* Performance or clarity issues emerge from deeply nested or mixed-type lists

---

### 02 - Subsetting Lists

1. [[Python - List Subsetting]]
2. [[Python - List Indexing]]
3. [[Python - Zero-Based Indexing]]
4. [[Python - Negative List Indexing]]
5. [[Python - List Slicing]]
6. [[Python - List Slice Inclusivity Rule]]
7. [[Python - Omitting Indices in List Slicing]]

#### Summary

This section is about **precise, intention-driven access to ordered data**, where mistakes are rarely conceptual but often off-by-one, silent, and costly. Everything rests on [[Python - Zero-Based Indexing|zero-based indexing]], which defines indices as offsets rather than counts and must be treated as a non-negotiable invariant whenever reasoning about position. [[Python - List Subsetting|list subsetting]] is the umbrella skill, with [[Python - List Indexing|indexing]] used when you want exactly one element and failure should be loud via `IndexError`, and [[Python - List Slicing|slicing]] used when you want a range and accept copying semantics. The half-open boundary defined in [[Python - List Slice Inclusivity Rule|slice inclusivity rule]]—start included, end excluded—is the critical safety property that enables predictable partitioning and length reasoning, while [[Python - Omitting Indices in List Slicing|omitting indices]] is merely a readability shorthand once that rule is internalized. [[Python - Negative List Indexing|negative indexing]] exists to express intent from the tail without length arithmetic, but should be used deliberately to avoid obscuring bounds reasoning. The real risk is not syntax but mental drift: mixing “human counting” with index offsets or forgetting that slices allocate new lists. *If you leave this section knowing **that indices express positions, not ordinals*** and *how **half-open slices define safe, composable boundaries***, you are correctly calibrated for everything that follows.*


* **Must-read from this section:**
	* [[Python - Zero-Based Indexing|zero-based indexing]] – foundational invariant everything else depends on
	* [[Python - List Slice Inclusivity Rule|slice inclusivity rule]] – prevents off-by-one errors and enables clean partitioning
	* [[Python - List Subsetting|list subsetting]] – frames indexing vs slicing as intentional choices
- **Revisit this section when**:
	* You see off-by-one bugs that “almost” return the right data
	* You start chunking or windowing data and boundaries feel fragile
	* You refactor slicing logic and results subtly change size or content
	* You work with large lists where copying behavior impacts memory

---

### 03 - **Manipulating Lists**

1. [[Python - List Manipulation]]
2. [[Python - Changing List Elements]]
3. [[Python - Changing List Slices]]
4. [[Python - List Concatenation]]
5. [[Python - Deleting List Elements]]
6. [[Python - List Memory Model (Reference vs. Value)]]
7. [[Python - Implicit List Copying (Assignment)]]
8. [[Python - Explicit List Copying (Cloning)]]
9. [[Python - List Manipulation & Memory Model Relationship]]

#### Summary

This section is about **deciding whether you are changing data or changing references**, and most real bugs here come from confusing the two. All list updates live under [[Python - List Manipulation|list manipulation]], but the governing rule is the [[Python - List Memory Model (Reference vs. Value)|list memory model]], where variables point to list objects rather than owning their contents. Operations like [[Python - Changing List Elements|changing elements]], [[Python - Changing List Slices|changing slices]], and [[Python - Deleting List Elements|deleting elements]] mutate the same underlying list in-place, which is efficient but dangerous when aliases exist via [[Python - Implicit List Copying (Assignment)|implicit copying]]. This is why assignment is never a neutral act with lists—it creates shared state by default. Safety comes only from intentional separation through [[Python - Explicit List Copying (Cloning)|explicit copying]], which trades memory for predictability. [[Python - List Concatenation|List concatenation]] sits on the other side of the boundary by always producing a new list, avoiding side effects while incurring allocation cost, a trade-off explained in [[Python - List Manipulation & Memory Model Relationship|the manipulation–memory relationship]]. Syntax details and method variants can be deferred; what must be internalized now is when an operation mutates shared state versus when it creates new state. *If you leave this section knowing **that assignment creates aliases, not copies*** and *how **mutation propagates through references unless you explicitly clone***, you are correctly calibrated for everything that follows.*

* **Must-read from this section:**
	* [[Python - List Memory Model (Reference vs. Value)|list memory model]] – explains all side effects and aliasing
	* [[Python - Implicit List Copying (Assignment)|implicit copying]] – root cause of accidental shared mutations
	* [[Python - Explicit List Copying (Cloning)|explicit copying]] – only reliable escape hatch from shared state
- **Revisit this section when:**
	* A list changes unexpectedly after being passed to a function
	* Refactoring introduces subtle data corruption across variables
	* You are unsure whether an operation mutates or allocates
	* Performance issues appear due to excessive copying or in-place edits

---

## Chapter 3: Functions and packages

### 01 - Functions

1. [[Python - Functions]]
2. [[Python - Function Calls (Input-Process-Output)]]
3. [[Python - Function Arguments]]
4. [[Python - Optional Arguments]]
5. [[Python - max() Function]]
6. [[Python - round() Function]]
7. [[Python - help() Function]]
8. [[Python - Discovering Built-in Functions]]

#### Summary

This section frames **functions as the primary abstraction boundary in Python**, where you stop thinking in lines of code and start thinking in input–output contracts. [[Python - Functions|Functions]] exist to encapsulate logic so callers only reason about behavior, not implementation, which is why every function invocation follows the [[Python - Function Calls (Input-Process-Output)|input–process–output model]]. What matters now is not how to write functions, but how to *use* them effectively: arguments define the interface surface in [[Python - Function Arguments|function arguments]], while defaults in [[Python - Optional Arguments|optional arguments]] encode intent about what usually matters versus what can be ignored. Built-ins like [[Python - max() Function|max()]] and [[Python - round() Function|round()]] are concrete reminders of the “don’t reinvent the wheel” principle embedded in Python’s design, where abstraction trades control for correctness, performance, and readability. Discovery is part of the workflow, not a weakness, which is why [[Python - Discovering Built-in Functions|discovering built-ins]] via [[Python - help() Function|help()]] is treated as a first-class skill rather than a fallback. Precision risks and behavioral edges, such as rounding strategy or comparability requirements, exist but can be deferred until correctness or data integrity becomes critical. *If you leave this section knowing **that functions are black-box contracts defined by their arguments*** and *how **to discover and trust built-ins instead of reimplementing logic***, you are correctly calibrated for everything that follows.*

* **Must-read from this section:**
	* [[Python - Functions|functions]] – establishes abstraction as the organizing principle
	* [[Python - Function Arguments|function arguments]] – defines how function contracts are expressed
	* [[Python - Discovering Built-in Functions|discovering built-ins]] – unlocks speed and leverage through reuse
- **Revisit this section when:**
	* You are about to write a loop and suspect a built-in already exists
	* A function call behaves unexpectedly and you need to inspect its contract
	* Optional parameters start affecting correctness or readability
	* Numerical results look “off” and rounding or comparison rules matter

---

### 02 - Methods

1. [[Python - Objects]]
2. [[Python - Methods]]
3. [[Python - Method Dot Notation]]
4. [[Python - Type-Specific Methods]]
5. [[Python - List Methods]]
6. [[Python - String Methods]]
7. [[Python - Mutating Methods]]
8. [[Python - Functions vs Methods]]

#### Summary

This section establishes the **object-centric mental model of Python**, where behavior lives on data rather than floating independently, and most practical decisions come down to understanding where an operation is anchored. Everything starts with [[Python - Objects|objects]], which explains why values carry both state and behavior, and why actions are accessed through [[Python - Method Dot Notation|dot notation]] rather than free-form calls. The boundary between [[Python - Functions vs Methods|functions vs methods]] matters because functions operate generically across types, while [[Python - Methods|methods]] are intentionally bound to a specific object’s type, enforcing capability constraints through [[Python - Type-Specific Methods|type-specific methods]]. This is why [[Python - List Methods|list methods]] and [[Python - String Methods|string methods]] share names like `index` yet behave differently under [[Python - Polymorphism|polymorphism]], a feature that improves reuse but requires you to stay type-aware. The most consequential risk sits in [[Python - Mutating Methods|mutating methods]], where operations silently modify object state in-place, contrasted with immutable behaviors that return new objects; this distinction is easy to miss syntactically but expensive to misunderstand architecturally. You can defer memorizing individual methods or their performance characteristics; what must be internalized now is how method binding, mutability, and polymorphism interact. *If you leave this section knowing **that methods are behavior bound to object identity*** and *how **mutation versus return-value semantics change program state***, you are correctly calibrated for everything that follows.*

* **Must-read from this section:**
	* [[Python - Objects|objects]] – anchors the entire object–behavior model
	* [[Python - Functions vs Methods|functions vs methods]] – defines where behavior lives
	* [[Python - Mutating Methods|mutating methods]] – explains the highest-risk failure mode
- **Revisit this section when:**
	* State changes unexpectedly after a method call
	* Two objects respond to the same method name differently
	* You are unsure whether an operation modifies data or returns a new value
	* API design decisions hinge on where behavior should live

---

### 03 - **Packages**

1. [[Python - Packages]]
2. [[Python - Rationale for Packages]]
3. [[Python - Modules]]
4. [[Python - Common Data Science Packages]]
5. [[Python - Installing Packages with pip]]
6. [[Python - Importing Packages]]
7. [[Python - Standard Import Statement]]
8. [[Python - Importing with an Alias]]
9. [[Python - Importing Specific Functions (from...import)]]
10. [[Python - Standard Import vs from...import]]

#### Summary

This section is about **how Python scales beyond a single file by controlling code visibility, dependencies, and cognitive load**, and the key shift is recognizing that imports are not convenience syntax but architectural boundaries. The motivation sits in [[Python - Rationale for Packages|the need for packages]], which explains why Python deliberately avoids a monolithic core and instead relies on optional, installable units to preserve maintainability. Structurally, [[Python - Modules|modules]] are the atomic units of reuse, while [[Python - Packages|packages]] are namespaces that group modules to prevent collisions and enable distribution. Installation via [[Python - Installing Packages with pip|pip]] happens at the environment level and can be treated as a solved prerequisite once understood, but usage begins only when code is explicitly loaded through [[Python - Importing Packages|importing packages]]. The real decision surface lies in import style: [[Python - Standard Import Statement|standard imports]] maximize clarity and traceability, [[Python - Importing with an Alias|aliased imports]] trade verbosity for readability while preserving origin, and [[Python - Importing Specific Functions (from...import)|from…import]] optimizes brevity at the cost of namespace safety, a trade-off made explicit in [[Python - Standard Import vs from...import|the import comparison]]. Access via [[Python - Accessing Package Components|dot notation]] is not syntactic noise but a guarantee of origin clarity. You can defer memorizing package ecosystems or tooling depth; what matters now is import intent and namespace hygiene. If you leave this section knowing ***that installation, import, and access are separate responsibilities*** and how ***import style choices directly affect readability, safety, and long-term maintainability***, you are correctly calibrated for everything that follows.

* **Must-read from this section:**
	* [[Python - Rationale for Packages|rationale for packages]] – explains why the ecosystem is modular at all
	* [[Python - Importing Packages|importing packages]] – defines the boundary between installed and usable code
	* [[Python - Standard Import vs from...import|standard vs from…import]] – captures the core trade-off that drives most style decisions
- **Revisit this section when:**
	* A codebase becomes hard to read due to unclear function origins
	* You encounter naming conflicts or unexpected overrides
	* Dependency versions start conflicting across projects
	* You move from small scripts to multi-module or team-based codebases

---

## Chapter 4: Numpy

### 01 - Numpy

1. [[Python - List Calculation Limitations]]
2. [[Python - NumPy (Numeric Python)]]
3. [[Python - NumPy Array]]
4. [[Python - Installing & Importing NumPy]]
5. [[Python - Creating a NumPy Array]]
6. [[Python - NumPy Element-wise Operations]]
7. [[Python - NumPy Array Single Data Type Constraint]]
8. [[Python - List Concatenation vs NumPy Array Addition]]
9. [[Python - Subsetting NumPy Arrays]]
10. [[Python - Subsetting NumPy Arrays with Indices]]
11. [[Python - Subsetting NumPy Arrays with Boolean Arrays 1]]

#### Summary

This section marks the **intentional transition from general-purpose Python containers to numerical computing primitives**, where the primary decision is no longer “how do I store data” but “how do I compute on it safely and at scale.” The motivation is grounded in [[Python - List Calculation Limitations|list calculation limitations]], which explains why Python lists fail silently or loudly for vectorized math, forcing loops that are slow and error-prone. [[Python - NumPy (Numeric Python)|NumPy]] introduces the [[Python - NumPy Array|NumPy array]] as a deliberately constrained structure whose power comes from two guarantees: contiguous memory and the [[Python - NumPy Array Single Data Type Constraint|single data type constraint]], both of which enable fast [[Python - NumPy Element-wise Operations|element-wise operations]]. The act of [[Python - Creating a NumPy Array|creating a NumPy array]] is therefore not cosmetic conversion but a semantic commitment: you trade flexibility for performance, predictability, and mathematical clarity, with the risk of silent upcasting if your input data is dirty. Operator behavior changes accordingly, as highlighted by [[Python - List Concatenation vs NumPy Array Addition|list concatenation vs array addition]], and data access scales from simple indexing to expressive filtering via [[Python - Subsetting NumPy Arrays|subsetting]] and [[Python - Subsetting NumPy Arrays with Boolean Arrays 1|boolean subsetting]], where conditions replace positions. You can defer multi-dimensional shape reasoning and performance micro-optimizations; what must be internalized now is the mental model shift from objects to arrays-as-computation-surfaces. *If you leave this section knowing **why NumPy arrays exist as a constrained alternative to lists*** and *how **element-wise operations and boolean subsetting define the core workflow***, you are correctly calibrated for everything that follows.*

* **Must-read from this section:**
	* [[Python - NumPy Array|NumPy array]] – establishes the core data structure and its guarantees
	* [[Python - List Calculation Limitations|list calculation limitations]] – explains why NumPy is necessary
	* [[Python - NumPy Element-wise Operations|element-wise operations]] – defines the primary computational advantage
	* [[Python - NumPy Array Single Data Type Constraint|single data type constraint]] – the main source of both speed and risk
- **Revisit this section when:**
	* Numerical code becomes slow, loop-heavy, or hard to reason about
	* Calculations behave differently after converting lists to arrays
	* Filtering data with conditions starts to dominate your logic
	* Memory usage or silent type coercion causes unexpected failures

---

### 02 - **2D Numpy Arrays**

1. [[Python - 2D NumPy Arrays]]
2. [[Python - numpy.ndarray]]
3. [[Python - Creating 2D NumPy Arrays]]
4. [[Python - Structure of 2D NumPy Arrays]]
5. [[Python - ndarray.shape Attribute]]
6. [[Python - NumPy Attributes vs Methods]]
7. [[Python - NumPy Array Homogeneity]]
8. [[Python - 2D NumPy Array vs Python List of Lists]]
9. [[Python - Subsetting 2D NumPy Arrays]]
10. [[Python - Subsetting 2D NumPy Arrays (Chained Brackets)]]
11. [[Python - Subsetting 2D NumPy Arrays (Comma-Separated Indexing)]]
12. [[Python - Slicing 2D NumPy Arrays]]
13. [[Python - Element-wise Calculations in 2D NumPy Arrays]]

#### Summary

This section completes the shift from “using NumPy” to **thinking in NumPy’s structural and access model**, where performance and correctness depend on understanding arrays as fixed-shape, homogeneous computation surfaces rather than nested containers. [[Python - 2D NumPy Arrays|2D NumPy arrays]] formalize multidimensional data as a single object with an explicit layout, clarified by [[Python - Structure of 2D NumPy Arrays|array structure]] and made inspectable through [[Python - ndarray.shape Attribute|the shape attribute]], which is the non-negotiable source of truth for dimensional reasoning. The contrast in [[Python - 2D NumPy Array vs Python List of Lists|NumPy arrays vs list-of-lists]] explains why intuition from Python lists eventually breaks down: NumPy optimizes for contiguous memory and uniform operations, not per-row flexibility. This design enables safe and fast [[Python - Element-wise Calculations in 2D NumPy Arrays|element-wise calculations]], but only if access patterns respect NumPy’s indexing model. Subsetting via [[Python - Subsetting 2D NumPy Arrays|2D subsetting]] is the key boundary, where [[Python - Subsetting 2D NumPy Arrays (Comma-Separated Indexing)|comma-separated indexing]] should be treated as the default because it expresses intent in a single operation, while [[Python - Subsetting 2D NumPy Arrays (Chained Brackets)|chained brackets]] are a transitional convenience that introduce hidden temporaries and scale poorly. You can defer higher-dimensional broadcasting and advanced indexing; what matters now is structural awareness and access discipline. *If you leave this section knowing **how shape defines what operations are valid*** and *why **comma-separated indexing is the correct mental model for 2D access***, you are correctly calibrated for everything that follows.*

* **Must-read from this section:**
	* [[Python - 2D NumPy Arrays|2D NumPy arrays]] – establishes the core structural abstraction
	* [[Python - ndarray.shape Attribute|shape attribute]] – the invariant for dimensional reasoning
	* [[Python - Subsetting 2D NumPy Arrays (Comma-Separated Indexing)|comma-separated indexing]] – defines the correct access pattern
- **Revisit this section when:**
	* Calculations fail due to unexpected array shapes or dimensions
	* Performance degrades inside loops that access individual elements
	* You are unsure whether an indexing expression creates temporaries
	* You begin treating arrays as tables or grids rather than vectors

---

### 03 - NumPy: Basic Statistics

1. [[NumPy - Exploratory Data Analysis with NumPy]]
2. [[NumPy - Summarizing Statistics]]
3. [[NumPy - Mean (np.mean)]]
4. [[NumPy - Median (np.median)]]
5. [[NumPy - Correlation Coefficient (np.corrcoef)]]
6. [[NumPy - Standard Deviation (np.std)]]
7. [[NumPy - Data Sanity Check]]
8. [[NumPy - NumPy Functions vs Basic Python Functions]]
9. [[NumPy - Data Type Homogeneity & Calculation Speed Relationship]]
10. [[NumPy - Data Simulation with Random Distributions]]
11. [[NumPy - Stacking Arrays (np.column_stack)]]

#### Summary

This section reframes NumPy from a fast array container into a **thinking tool for early data judgment**, where the goal is not precision but plausibility before commitment. The workflow is anchored in [[NumPy - Exploratory Data Analysis with NumPy|exploratory data analysis]], which treats a 2D array as a provisional model of reality and asks whether the numbers deserve trust before deeper modeling. The first boundary is the [[NumPy - Data Sanity Check|data sanity check]], where simple summaries act as a coarse filter against “garbage in, garbage out,” explicitly acknowledging that this step catches gross errors but not subtle bias. Core summaries—[[NumPy - Mean (np.mean)|mean]], [[NumPy - Median (np.median)|median]], and [[NumPy - Standard Deviation (np.std)|standard deviation]]—are not interchangeable; the divergence between mean and median is itself a signal of skew or outliers, while standard deviation quantifies reliability rather than centrality. These operations rely on NumPy’s performance guarantees, explained by [[NumPy - Data Type Homogeneity & Calculation Speed Relationship|data type homogeneity]], and are intentionally favored over basic Python as clarified in [[NumPy - NumPy Functions vs Basic Python Functions|NumPy vs Python functions]]. Relationships emerge only after structure is correct, often requiring assembly via [[NumPy - Stacking Arrays (np.column_stack)|column stacking]] before probing with [[NumPy - Correlation Coefficient (np.corrcoef)|correlation]]. You can defer visualization libraries and inferential statistics; what matters now is using summaries to decide whether analysis should proceed at all. *If you leave this section knowing **how summarizing statistics act as a plausibility gate*** and *why **mean, median, and spread answer different questions***, you are correctly calibrated for everything that follows.*

* **Must-read from this section:**
	* [[NumPy - Data Sanity Check|data sanity check]] – defines the first non-negotiable filter
	* [[NumPy - Summarizing Statistics|summarizing statistics]] – establishes the core EDA toolkit
	* [[NumPy - Exploratory Data Analysis with NumPy|EDA with NumPy]] – frames how these pieces connect
- **Revisit this section when:**
	* Model results look impressive but feel disconnected from reality
	* Mean and median disagree sharply and you cannot explain why
	* Large datasets need quick validation before expensive processing
	* You must justify delaying modeling due to questionable data quality

---
# 3. Key Takeaways & Reflections

- **Everything covered in this course:** [[Introduction to Python Take-aways]]
- **Cheat Sheet:** [[Introduction to Python Cheat Sheet]]
- [[Python 1 - Spaced Repetition Note|Spaced repeat]]

---
# 4. Related Projects & Applications

- **Exercises:** [[Python 1 - Exercise Plan]]