---
tags: 
  - core
  - python
  - iterable
  - comprehension
  - sequence
  - generator
  - duck_typing
  - concept
source: 
  - "[[Python Toolbox]]"
related: 
  - "[[Python - List Comprehensions]]"
  - "[[Python - List Comprehension Syntax]]"
  - "[[Python - List Comprehensions vs for Loops]]"
  - "[[Python - Nested List Comprehensions]]"
  - "[[Python - Readability vs Conciseness in List Comprehensions]]"
  - "[[Python - Iteration]]"
  - "[[Python - for Loop]]"
  - "[[Python - Tuples]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Lists]]"
  - "[[Python - Data Types]]"
  - "[[Fundamental - Programming]]"
  - "[[Python - Generator Expressions]]"
  - "[[Python - range()]]"
  - "[[Python - str]]"
---
# Core: List Comprehensions over Iterables

## Summary

>List comprehensions are a versatile tool in Python that can process not just lists, but any object that can be iterated over, such as tuples, strings, range objects, and generator expressions. This flexibility, which builds upon the fundamental [[Python - List Comprehension Syntax]], is a core part of Python's 'duck typing' philosophy: if it walks like a duck and quacks like a duck, it's a duck. If an object can be looped over, it can be used in a list comprehension.

**Why This Matters:** This concept dramatically increases code efficiency and readability by allowing the concise syntax of list comprehensions to be applied to any sequence-like data structure, not just lists.

_Analogy:_ _Think of a list comprehension as a universal factory assembly line. The line is designed to take individual items, perform an action on them (like painting or packaging), and place the finished product on a new pallet. The factory doesn't care how the raw items arrive—whether on a conveyor belt (a list), in a series of pre-packaged boxes (a tuple), or generated one-by-one by a machine at the start of the line (a range object or generator). As long as it receives a steady stream of items, the assembly line works perfectly._

**Where it breaks down:** The analogy falters in that a factory assembly line might modify items or simply move them. A list comprehension *always* produces a brand new list as its output, regardless of the input iterable's type. It never modifies the original source iterable; it only reads from it to create something new.

```
Any Iterable       List Comprehension Logic       New List
(range, str, tuple)  [expression for item in iterable]   [...result...]
+---------------+      +--------------------------+      +-------------+
| 1, 2, 3, 4, 5 | ---> | item * 2 for item in ... | ---> | 2, 4, 6, 8, 10|
+---------------+      +--------------------------+      +-------------+
```

## Details

The power of list comprehensions extends far beyond just lists. You can apply this concise and powerful syntax to any iterable object in Python. An iterable is simply anything you can loop over, like a `range` object, a string, a tuple, or even a dictionary's keys or values. This makes list comprehensions a general-purpose tool for creating lists from sequential data, not just a list-specific feature. This flexibility is a key reason why [[Python - List Comprehensions vs for Loops|list comprehensions are often preferred over traditional for loops]] for creating new lists.

#### Primary Goal

To provide a single, consistent, and highly readable syntax for creating a new list by processing elements from any type of iterable data source.

#### Mechanism

- **Step 1: Identify an Iterable Source**
    - Start with any object that supports iteration, not necessarily a list. This example uses a `range` object and a `string`, both of which are iterables.
- **Step 2: Define the Comprehension**
    - Write the list comprehension using the standard `[expression for item in iterable]` syntax.
- **Step 3: Apply an Expression**
    - For each item yielded by the iterable, apply a transformation. In the example, we square each number from the `range`.
- **Step 4: (Optional) Apply a Filter**
    - Add an `if` condition to selectively include elements in the final list based on a condition. Here, we only include numbers that are even.

##### Code Translation

```python
# --- Step 1: Identify an Iterable Source ---
# The source is a range object, which is an iterable but not a list.
source_iterable = range(10)

# --- Step 2, 3 & 4: Define, Apply Expression, and Filter ---
# We iterate over 'num' in the range, square each number,
# but only if the original number is even.
squared_evens = [num**2 for num in source_iterable if num % 2 == 0]

# The result is always a new list.
print(f"Source iterable type: {type(source_iterable)}")
print(f"Resulting list: {squared_evens}")

# --- Another example with a string iterable ---
sentence = "The power of list comprehensions"
vowels = [char for char in sentence if char.lower() in 'aeiou']
print(f"Vowels from string: {vowels}")
```

 [[Code - List Comprehensions over Iterables Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Iterable**: The source of data. This can be any object that supports iteration (e.g., `list`, `tuple`, `dict`, `set`, `str`, `range`, generators). The type and content of the iterable determine the sequence of items to be processed.
- **Expression**: The operation performed on each item from the iterable before it's added to the new list. This defines the values that will populate the output list.
- **Filter (if clause)**: An optional condition that each item must satisfy to be processed and included in the resulting list. This allows for powerful, one-line selective logic.

#### Core Trade-offs

- **Pro: Versatility**
    - The primary advantage is its ability to work with any iterable, making it a universal and consistent tool for list creation in Python.
- **Pro: Readability**
    - For many common tasks, this syntax is more concise and declarative than an equivalent `for` loop, a topic explored in [[Python - Readability vs Conciseness in List Comprehensions]].
- **Con: Output is Always a List**
    - Regardless of the input iterable's type (e.g., a tuple or a set), the output is *always* a new list. If you need a different collection type, you must use a different comprehension (e.g., set or dict comprehensions) or explicitly convert the result.
- **Con: Memory Usage**
    - Like any list comprehension, it builds the entire new list in memory. For very large or infinite iterables, this can be inefficient or impossible. In such cases, a generator expression `(item for item in iterable)` is the memory-efficient alternative.

## Connections

```
                      (Parent)
                List Comprehensions
                         ▲
                         │
         ┌───────────────┼────────────────────────────┐
         │               │                            │
(Syntax)        ┌───────────────────────────┐     (Alternative)
List Comp Syntax│ List Comps over Iterables │     for Loop
                └───────────────────────────┘
                         │
                         ▼
                  (Related Idea)
             Generator Expressions
```

### Parent Concept

This concept is a specific application and extension of the core idea of [[Python - List Comprehensions]].

### Related Concepts 

- The fundamental [[Python - List Comprehension Syntax]] provides the blueprint for how these operations are structured.
- This approach directly [[Python - List Comprehensions vs for Loops|contrasts with traditional for loops]], offering a more concise alternative for creating lists from any iterable source.
- The concept can be extended to [[Python - Nested List Comprehensions]], where the iterables themselves can be nested data structures.
- Understanding this is foundational for learning other types of comprehensions, such as set and dictionary comprehensions, which also operate on iterables.
## Questions

- You're processing a massive, multi-gigabyte log file from a web server, which can be treated as an iterable of lines. Your goal is to extract all IP addresses that accessed a specific endpoint. Would you use a list comprehension for this task? Justify your decision in terms of memory performance and its impact on the server's operational cost.
- Imagine a data pipeline where one microservice produces a stream of events (an iterable, but potentially infinite). Another service needs to consume these events and create batches of 1000 processed events to write to a database. How would the principle of list comprehensions over iterables fall short here, and what Python tool or pattern (like using `itertools`) would you use instead to handle the 'infinite' nature of the source?
- What if Python's list comprehensions were strictly limited to only work on actual `list` objects? What fundamental Python philosophy (e.g., 'duck typing') would this violate, and how would it negatively impact the way Python developers write code for data manipulation across different data structures?