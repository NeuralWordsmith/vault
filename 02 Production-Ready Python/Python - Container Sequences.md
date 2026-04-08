---
tags: 
  - major_core
  - python
  - data_structures
  - collections
  - sequences
  - lists
  - tuples
  - sets
  - concept
source: 
  - "[[Data Types in Python]]"
related: 
  - "[[Python - Data Types]]"
  - "[[Python - Lists]]"
  - "[[Python - Tuples]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Iteration]]"
  - "[[Python - Mutability vs Immutability]]"
  - "[[Python - List Indexing 1]]"
  - "[[Python - List Comprehensions]]"
  - "[[Python - Sorting Lists with sorted()]]"
  - "[[Python - Appending to a List]]"
  - "[[Python - Removing Elements from a List with pop()]]"
  - "[[DSA - Data Structures & Algorithms]]"
  - "[[Python - Generator Expressions]]"
  - "[[Python - Looping Over Data Structures]]"
  - "[[Python - Combining Lists]]"
---
# Major Core: Container Sequences

## Summary

> A container sequence is a data structure designed to hold, or 'contain', a sequence of other objects. In data science, these are the primary tools for storing collections of data points, such as measurements, user IDs, or text documents. They provide the structure over which we perform operations like [[Python - Iteration 1|iteration]], sorting, and filtering to analyze and transform our data. The most common examples in Python are lists, tuples, and sets.

**Why This Matters:** Container sequences are the fundamental building blocks for organizing and manipulating collections of data in Python, making complex data science tasks like aggregation, filtering, and sorting possible.

_Analogy:_ _Think of container sequences as different types of toolboxes. A toolbox is a container for tools (the elements). You might have a simple, open-top canvas bag, a plastic case with fixed compartments, or a large rolling chest with many drawers.

- **The Toolbox:** Represents the container sequence itself (e.g., a list).
- **The Tools (hammers, wrenches):** Represent the data elements (numbers, strings, etc.) stored inside.
- **The Type of Toolbox:** Represents the different types of containers. A canvas bag is like a `list`—you can easily add or remove tools. A plastic case with pre-molded spots for each tool is like a `tuple`—the contents are fixed and can't be changed. A drawer full of unique sockets is like a `set`—it holds only one of each size, and the order doesn't matter._

- **Where it breaks down:** The analogy implies the toolbox physically holds the tools. In Python, containers hold *references* (memory addresses) to the objects, not the objects themselves. Furthermore, the analogy doesn't fully capture the performance implications or strict rules of each container, such as the speed of checking for a tool's existence in a `set` versus a `list`.

```
A variable holding a container points to a structure that holds references to the actual data objects in memory.

my_list = [ 1, "hello", 3.14 ]

Variable        Container in Memory         Objects in Memory
─────────       ─────────────────────         ─────────────────

my_list ───> [ ref_A, ref_B, ref_C ]
                 │       │       └──────────> (float: 3.14)
                 │       └──────────────────> (str: "hello")
                 └──────────────────────────> (int: 1)
```

## Details

In Python, a container sequence is an object that groups multiple elements into a single unit. Instead of creating separate variables for every single data point, we can store them in a container to manage them collectively. This is essential in data science where we work with datasets containing thousands or millions of points. Python's primary built-in container types are **lists**, **tuples**, **sets**, and **dictionaries**, each with distinct properties and use cases.

#### Primary Goal

To provide flexible and efficient ways to store, access, and manage collections of related data items within a single variable.

#### Mechanism

- **How it Works:**
    1. A container is created and assigned to a variable.
    2. When elements are added, the container stores references (memory addresses) pointing to where each element's data is located in memory.
    3. This structure allows a single variable to represent the entire collection, enabling collective operations like looping through every item or applying a function to the whole group.
- **Lists (`list`):**
    - The most common general-purpose container. They are ordered, meaning elements maintain their position, and mutable, meaning you can change their contents.
    - Example: *A list of daily stock prices, where you might need to add new prices or correct an existing one. See [[Python - Appending to a List]] and [[Python - Removing Elements from a List with pop()]] for modification examples.*
- **Tuples (`tuple`):**
    - Similar to lists, they are ordered, but they are immutable. Once a tuple is created, its contents cannot be changed. This is a key distinction covered in [[Python - Mutability vs Immutability|mutability vs. immutability]].
    - Example: *A tuple representing RGB color values `(255, 165, 0)` or geographic coordinates `(40.7128, -74.0060)`. This data is fixed and shouldn't be altered accidentally.*
- **Sets (`set`):**
    - An unordered collection of *unique* elements. They are highly optimized for checking if an element is present in the collection.
    - Example: *A set of unique user IDs who have visited a website. Duplicates are automatically discarded, and you can quickly check if a specific user has visited.*

```python
# --- Step 1: Create a List (Mutable, Ordered) ---
# Used for a collection that needs to be modified.
student_grades = [88, 92, 100, 75]
print(f"List of grades: {student_grades}")

# --- Step 2: Create a Tuple (Immutable, Ordered) ---
# Used for fixed data, like coordinates.
ny_coordinates = (40.7128, -74.0060)
print(f"Tuple of coordinates: {ny_coordinates}")

# --- Step 3: Create a Set (Mutable, Unordered, Unique) ---
# Used for tracking unique items.
unique_tags = {'python', 'data_science', 'machine_learning', 'python'}
print(f"Set of unique tags: {unique_tags}") # Note: 'python' only appears once
```

 [[Code - Container Sequences Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Mutability:**
    - Determines if the container's contents can be changed after creation. Lists and sets are mutable; tuples are immutable. This is a critical factor discussed in [[Python - Mutability vs Immutability]].
- **Ordering:**
    - Determines if the elements maintain a consistent, predictable order. Lists and tuples are ordered. Sets are unordered.
- **Uniqueness:**
    - Determines if duplicate elements are allowed. Sets enforce uniqueness, automatically discarding any duplicates. Lists and tuples allow duplicates.
- **Indexing:**
    - Determines if elements can be accessed by their numerical position (index). Ordered containers like lists and tuples support [[Python - List Indexing 1|indexing]]. Unordered sets do not.

#### Core Trade-offs

- **Lists: Flexibility vs. Performance**
    - Pro: Highly flexible, can be grown, shrunk, and modified easily.
    - Con: Checking for the existence of an item (`item in my_list`) is slower than in sets, as it may require checking every element.
- **Tuples: Integrity vs. Inflexibility**
    - Pro: Immutable nature guarantees data integrity and they are slightly more memory-efficient and faster to create than lists.
    - Con: Cannot be modified. If you need to add or remove an element, you must create an entirely new tuple.
- **Sets: Speed vs. Structure**
    - Pro: Extremely fast for membership testing (checking if an item exists) and for finding unique elements.
    - Con: They do not preserve the original insertion order of elements and do not allow access by index.

## Connections

```
                      (Parent)
                    Data Types
                        ▲
                        │
        ┌───────────────┼────────────────┐
        │               │                │
(Property)     ┌──────────────────┐     (Action)
Mutability     │ Container Seq.   │     Iteration
               └──────────────────┘
                        │
             ┌──────────┴───────────┐
             │          │           │
           Lists      Tuples       Sets
```

### Parent Concept

It is a fundamental concept within [[Python - Data Types]], representing complex types used to hold collections of other data.

### Child Concepts

- The most common mutable, ordered container is the [[Python - Lists|list]], which allows for dynamic modification.
- An immutable, ordered container is the [[Python - Tuples|tuple]], used for data that should not change.
- For unordered collections of unique items, Python provides the `set`.
- For key-value storage, the [[Python - Dictionaries|dictionary]] is the primary container.

### Related Concepts 

- The core difference between containers like lists and tuples is explained by the concept of [[Python - Mutability vs Immutability|mutability vs. immutability]].
- A primary operation performed on all container sequences is [[Python - Iteration 1|iteration]], which allows processing each element in turn.
- Ordered containers like lists and tuples support [[Python - List Indexing 1|indexing]] to access specific elements by their position.
- Operations like [[Python - Sorting Lists with sorted()|sorting]] are common tasks performed on ordered containers to organize data.
## Questions

- You're processing a large log file of user IDs for a daily report. Some IDs are duplicates. The final report needs the unique IDs in the *exact order they first appeared*. A `set` is fast for uniqueness but loses order. A `list` preserves order but requires a slow, manual de-duplication process. How would you solve this efficiently, and how would you explain the performance trade-off of your solution to a product manager concerned about processing time?
- Imagine a real-time system that ingests millions of events per second, each with a unique transaction ID. We need to store these IDs for a short period (e.g., 5 minutes) to check for duplicates before processing. Which container type would you choose for this in-memory cache? How would you design the system to manage the container's size and prevent unbounded memory growth in a production environment?
- What if Python's built-in `list` was immutable, like a `tuple`? How would this fundamental change alter the way you approach common programming patterns like building up results in a loop, and what new data structures or functions would become essential to compensate?
