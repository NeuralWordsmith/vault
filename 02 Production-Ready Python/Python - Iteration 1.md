---
tags: 
  - core
  - python
  - looping
  - iterator_protocol
  - sequence_processing
  - control_flow
  - iterable
  - concept
source: 
  - "[[Data Types in Python]]"
related: 
  - "[[Python - for Loop]]"
  - "[[Python - while Loop]]"
  - "[[Python - Container Sequences]]"
  - "[[Python - Lists]]"
  - "[[Python - Tuples]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - List Comprehensions]]"
  - "[[Python - Generator Functions]]"
  - "[[Python - Generator Expressions]]"
  - "[[Python - Custom Iterators]]"
  - "[[Python - Iterator Functions]]"
  - "[[Fundamental - Programming]]"
  - "[[Python - Iterating over lists]]"
  - "[[Python - Memory-Efficient Data Processing]]"
  - "[[Python - Control Flow]]"
---
# Core: Iteration

## Summary

>Iteration, also known as looping, is the process of sequentially accessing and performing an action on each element within a data container. It's the core of how we automate repetitive tasks on collections of data, such as those found in [[Python - Container Sequences|container sequences]], allowing us to group, aggregate, and process information efficiently.

**Why This Matters:** Iteration is the fundamental mechanism for systematically processing every item within a data collection, enabling everything from simple calculations to complex data transformations and analysis.

_Analogy:_ _Think of iteration like a quality control inspector on an assembly line. The conveyor belt is the data container (e.g., a list), and each item on the belt is an element in that list. The inspector (the loop) picks up one item at a time, performs a specific check (the code inside the loop), and then moves to the next item until the belt is empty._

**Where it breaks down:** Unlike a physical assembly line, a programmer can instruct the 'inspector' to stop early (using a `break` statement), skip certain items (using `continue`), or even add or remove items from the 'conveyor belt' while it's running, which can have complex consequences.

```
Iterable (e.g., a List)
[item1, item2, item3]
         │
         │ iter()
         ▼
   ┌──────────┐
   │ Iterator │  ───────► next() ───────► item1
   └──────────┘
         │
         │
   ┌──────────┐
   │ Iterator │  ───────► next() ───────► item2
   └──────────┘
         │
         │
   ┌──────────┐
   │ Iterator │  ───────► next() ───────► item3
   └──────────┘
         │
         │
   ┌──────────┐
   │ Iterator │  ───────► next() ───────► StopIteration Error
   └──────────┘
```

## Details

Iteration is the foundational programming concept of stepping through a sequence of data, one item at a time, to perform some action. This process is central to working with any collection of data, from simple lists to complex data structures. It allows us to avoid writing repetitive code for each individual element. In Python, this is primarily achieved through two main constructs: **`for` loops** and **`while` loops**.

#### Primary Goal

To automate the process of applying an operation to every single element in a sequence without writing redundant code for each element.

#### Mechanism

- **How it Works: The Iterator Protocol**
    - Iteration in Python is powered by a behind-the-scenes mechanism called the 'iterator protocol'. It involves two distinct types of objects:
- **The Iterable:**
    - Any object that can be looped over. This includes [[Python - Container Sequences|container sequences]] like lists, tuples, and strings.
    - An object is considered iterable if it has a special method, `__iter__()`, which Python can call to get an iterator.
- **The Iterator:**
    - This is the object that actually does the work of iteration. It keeps track of the current position in the sequence.
    - It has a `__next__()` method that returns the next item in the sequence.
    - When there are no more items, it raises a special `StopIteration` error to signal that the loop should end. A `for` loop handles this automatically.

##### Code Translation

```python
# A standard for loop abstracts away the details.
print("--- Standard 'for' loop ---")
my_list = [10, 20, 30]
for item in my_list:
    print(item)

# --- The underlying mechanism (Iterator Protocol) ---
print("\n--- Manual Iteration ---")
# 1. Get an iterator from the iterable (the list)
my_iterator = iter(my_list)

# 2. Repeatedly call next() on the iterator to get items
try:
    print(next(my_iterator)) # Fetches 10
    print(next(my_iterator)) # Fetches 20
    print(next(my_iterator)) # Fetches 30
    print(next(my_iterator)) # No more items, this will raise StopIteration
except StopIteration:
    print("Iteration is complete.")
```

 [[Code - Iteration Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **The Iterable:**
    - The data source you are looping over (e.g., a list, tuple, dictionary, or file object). The type and content of the iterable determine what you process.
- **The Loop Variable:**
    - A temporary variable that holds the value of the current element during each pass of the loop (e.g., `item` in `for item in my_list:`).
- **The Loop Body:**
    - The block of indented code that executes for each element. This is where you define the action to be performed.

#### Core Trade-offs

- **Clarity vs. Flexibility:**
    - Standard `for` loops are highly readable and are the preferred method for simple sequence traversal. `while` loops offer more flexibility for complex conditions (e.g., looping until a flag changes) but can be harder to read and risk creating infinite loops if the exit condition is never met.
- **Memory Consumption:**
    - Iterating over a large data structure that is fully loaded into memory (like a massive list) can be inefficient. Concepts like [[Python - Generator Functions|generators]] provide a memory-efficient alternative by producing items one at a time, on-the-fly, rather than all at once.
- **Modification During Iteration:**
    - Modifying a list (e.g., [[Python - Removing Elements from a List with pop()|removing elements]]) while iterating over it can lead to unpredictable behavior, such as skipping elements. It's often safer to iterate over a copy of the list if modifications are necessary.

## Connections

```
                      (Parent)
              Fundamental - Programming
                         ▲
                         │
          ┌──────────────┼──────────────┐
          │              │              │
(Data to Iterate)  ┌───────────┐  (Advanced Form)
Container Sequences  │ Iteration │  Generator Functions
                     └───────────┘
                         │
              ┌──────────┴──────────┐
              │                     │
        (Implementation)      (Implementation)
           for Loop             while Loop
```

### Parent Concept

Iteration is a core concept within [[Fundamental - Programming|fundamental programming]], serving as a primary tool for control flow and data processing.

### Child Concepts

- The most common implementation is the [[Python - for Loop|`for` loop]], designed for iterating over a sequence of a known length.
- A more flexible implementation is the [[Python - while Loop|`while` loop]], which continues as long as a specified condition is true.
- A concise, specialized form of iteration for creating lists is the [[Python - List Comprehensions|list comprehension]].
- Advanced iteration patterns can be created using [[Python - Custom Iterators|custom iterators]] and [[Python - Generator Functions|generator functions]] for memory-efficient data processing.

### Related Concepts 

- Iteration is performed on [[Python - Container Sequences|container sequences]], which are the data structures that hold the elements to be processed.
- A direct application of this concept is [[Python - Iterating over lists|iterating over lists]], one of the most common tasks in Python.
- Understanding iteration is crucial before creating more advanced patterns like [[Python - Generator Expressions|generator expressions]], which provide a memory-efficient way to perform iterative calculations.
- The objects produced by iteration can be of different types, highlighting the importance of understanding [[Python - Mutability vs Immutability|mutability vs. immutability]].
## Questions

- Imagine you have a massive, multi-gigabyte log file. Would you read the entire file into a list and then iterate, or would you process it line-by-line? Justify your choice in terms of memory efficiency and performance, and explain the business impact of a potential system crash due to memory exhaustion.
- You're building a data pipeline that consumes from a real-time stream of events. How would you design the core iteration logic to be resilient to temporary connection drops or malformed data packets without halting the entire pipeline?
- What if Python's `for` loop was removed from the language? How would you replicate its functionality for iterating over a list using only `while` loops and exception handling, and what does this reveal about the underlying 'iterator protocol'?