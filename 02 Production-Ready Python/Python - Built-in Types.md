---
tags: 
  - core
  - python
  - collections
  - mutability
  - sequence_types
  - mapping_types
  - data_organization
  - concept
source: 
  - "[[Writing Efficient Python Code]]"
related: 
  - "[[Python - Data Types]]"
  - "[[Python - Lists]]"
  - "[[Python - Tuples]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - List Comprehensions]]"
  - "[[Python - Iteration]]"
  - "[[Python - Looping Over Data Structures]]"
  - "[[DSA - Data Structures & Algorithms]]"
  - "[[Python - Hash Tables]]"
  - "[[Python - Efficiency of Built-in Components]]"
  - "[[Python - Built-in Functions]]"
  - "[[Python - Standard Library]]"
  - "[[Python - List Manipulation]]"
  - "[[Python - Dictionary Operations]]"
  - "[[Python - enumerate() Function 1]]"
---
# Core: Built-in Data Structures

## Summary

>Python's built-in data structures are pre-defined object types used to store collections of data. They are highly optimized and integrated directly into the language, providing ready-to-use tools for common data organization tasks. The four primary collection types are lists, tuples, sets, and dictionaries, each with distinct properties and use cases.

**Why This Matters:** These structures are the fundamental building blocks for organizing information in any Python program, making them essential for writing efficient and readable code.

_Analogy:_ _Think of Python's built-in data structures as a toolbox that comes with your workshop. You have a drawer for nails and screws (a List), a sealed, pre-organized kit of drill bits (a Tuple), a magnetic tray where all your unique wrenches stick (a Set), and a labeled filing cabinet for your manuals (a Dictionary). You don't have to build these containers yourself; they are provided, and each is perfectly designed for its specific job._

• **Toolbox:** The Python environment itself.
• **List (Nail Drawer):** An ordered collection you can add to or remove from easily.
• **Tuple (Drill Bit Kit):** An ordered collection that is fixed and cannot be changed once created.
• **Set (Magnetic Tray):** An unordered collection that automatically prevents duplicates and is great for quick checks.
• **Dictionary (Filing Cabinet):** A collection where each item (manual) has a unique label (key) for fast retrieval.
• **Where it breaks down:** Unlike physical tools, these data structures can contain other data structures (e.g., a list of dictionaries), making them far more versatile and complex than a simple toolbox.

```
Comparison of Core Data Structures
+---------------+-----------+----------+------------+-----------------+
| Type          | Mutable?  | Ordered? | Duplicates?| Syntax          |
+---------------+-----------+----------+------------+-----------------+
| List          | Yes       | Yes      | Yes        | [1, 2, 3]       |
| Tuple         | No        | Yes      | Yes        | (1, 2, 3)       |
| Set           | Yes       | No       | No         | {1, 2, 3}       |
| Dictionary    | Yes       | No*      | No (keys)  | {'a': 1, 'b': 2}|
+---------------+-----------+----------+------------+-----------------+
*Note: Dictionaries are insertion-ordered in Python 3.7+, but the primary access
method is via key, not index.
```

## Details

Python provides several built-in types for grouping data together, which are commonly referred to as data structures. Instead of requiring programmers to build these fundamental tools from scratch, Python offers them as part of its core. This is a key aspect of Python's 'batteries-included' philosophy, which is also seen in the extensive [[Python - Standard Library]]. The most common and powerful of these are **lists**, **tuples**, **sets**, and **dictionaries**. Each is designed to solve a different kind of data storage and retrieval problem, and understanding their differences is crucial for writing effective Python code.

#### Primary Goal

To provide developers with a standard, efficient, and convenient set of tools for storing, accessing, and manipulating collections of data.

#### Mechanism

- **How they Work:**
    - These data structures are implemented as classes within the Python interpreter, often written in the C programming language for maximum performance. This is a core reason for the [[Python - Efficiency of Built-in Components]]. When you create a list or dictionary, you are instantiating an object from one of these highly optimized, low-level classes.
- **List:** An ordered, mutable (changeable) sequence.
    - Best for ordered collections of items that may need to be modified, added, or removed.
    - Example: _A list of tasks in a to-do app._
- **Tuple:** An ordered, immutable (unchangeable) sequence.
    - Best for fixed collections of items that should not be altered, like coordinates or database records.
    - Example: _A tuple representing an RGB color value (255, 0, 128)._
- **Set:** An unordered collection of unique items.
    - Best for membership testing (checking if an item exists) and removing duplicates from a sequence.
    - Example: _A set of unique tags for a blog post._
- **Dictionary:** An unordered collection of key-value pairs.
    - Best for storing data that has a direct relationship, where you can look up a value using a specific key.
    - Example: _A dictionary storing a user's profile with keys like 'username' and 'email'._

##### Code Translation

```python
# --- Step 1: Create a List (Mutable, Ordered) ---
# A list of tasks to complete.
my_list = ['buy groceries', 'pay bills', 'walk the dog']
my_list.append('call mom') # We can add items
my_list[1] = 'pay utility bills' # We can change items
print(f"List: {my_list}")

# --- Step 2: Create a Tuple (Immutable, Ordered) ---
# A tuple representing a fixed point in 3D space.
coordinates = (10, 20, 30)
# coordinates[0] = 5  # This would raise a TypeError
print(f"Tuple: {coordinates}")

# --- Step 3: Create a Set (Unique, Unordered) ---
# A set of unique tags for an article.
# Note the duplicate 'python' is automatically removed.
tags = {'python', 'data science', 'programming', 'python'}
print(f"Set: {tags}")
print(f"Is 'java' in tags? {'java' in tags}") # Fast membership testing

# --- Step 4: Create a Dictionary (Key-Value Pairs) ---
# A dictionary for a user's profile.
user_profile = {
    'username': 'alex_123',
    'email': 'alex@example.com',
    'member_since': 2021
}
print(f"Dictionary: {user_profile}")
print(f"User's email: {user_profile['email']}") # Fast lookup by key
```

 [[Code - Built-in Data Structures Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Mutability:** Whether the object can be changed after creation.
    - Mutable: `list`, `set`, `dict`. You can add, remove, or change elements.
    - Immutable: `tuple`. Once created, its contents cannot be altered.
- **Ordering:** Whether the order of elements is preserved and can be accessed by index.
    - Ordered: `list`, `tuple`. Elements have a defined sequence, and you can access them with `my_list[0]`.
    - Unordered: `set`, `dict` (traditionally). The concept of position is irrelevant; access is by membership or key.
- **Uniqueness:** Whether duplicate elements are allowed.
    - Duplicates Allowed: `list`, `tuple`.
    - Unique Elements Only: `set` (for elements), `dict` (for keys).

#### Core Trade-offs

- **List vs. Tuple:** Choose a `list` when you need to modify a sequence. Choose a `tuple` for data that should not change (data integrity), or when you need a hashable key for a dictionary, as lists cannot be dictionary keys.
- **Set vs. List:** Choose a `set` for extremely fast membership checking (`in` operator) or to automatically enforce uniqueness. Choose a `list` if you need to maintain the order of elements or require duplicate values.
- **Dictionary vs. List:** Choose a `dict` when you need to associate data with a specific label (key) for fast, meaningful lookups. Choose a `list` when your data is a simple sequence and can be accessed by its numerical position (index).

## Connections

```
             (Parent)
          Data Types
               ▲
               │
┌──────────────┼────────────────┐
│              │                │
(Operated on by) ┌───────────────────────────┐ (Relies on)
Built-in Functions │ Built-in Data Structures  │ Efficiency of Built-in Components
                 └───────────────────────────┘
                              │
          ┌───────────────────┴───────────────────┐
          │                   │                   │
        Lists              Tuples          Dictionaries & Sets
                                                (Based on)
                                                    │
                                               Hash Tables
```

### Parent Concept

This concept is a fundamental part of [[Python - Data Types]], focusing specifically on the types used to represent collections of other objects.

### Child Concepts

- The most common mutable sequence is the [[Python - Lists|list]], which allows for ordered collections that can be modified.
- An immutable counterpart is the [[Python - Tuples|tuple]], which provides an ordered, unchangeable sequence.
- For unordered collections of unique items, Python provides the `set`.
- For mapping unique keys to values, the primary tool is the [[Python - Dictionaries|dictionary]].

### Related Concepts 

- Many [[Python - Built-in Functions|built-in functions]] like `len()`, `sum()`, and `sorted()` are designed to operate directly on these data structures.
- The performance characteristics of these structures are a key topic in understanding the [[Python - Efficiency of Built-in Components|efficiency of built-in components]].
- The [[Python - Standard Library]] extends these core structures with more specialized collections, such as `collections.deque` and `collections.Counter`.
- Iterating over these structures is a core concept explained in [[Python - Iteration]].
- The [[Python - map() Function 1|map() function]] provides a concise way to apply a function to every item in an iterable like a list or tuple.
## Questions

- You are leading a team handling sensitive financial transaction records. When would you enforce the use of tuples over lists for storing this data, and how would you justify the development constraint (immutability) to a non-technical project manager in terms of business value?
- A new feature requires checking, millions of times per second, if a given user ID is part of a 'premium' group of 5 million users. Would you store the premium user IDs in a list or a set in memory? Describe the system-level performance and memory implications of your choice as the user base grows.
- Modern Python dictionaries (3.7+) preserve insertion order. What if this had been the case from Python's inception? How might that have fundamentally changed common programming patterns and possibly negated the need for specialized tools like `collections.OrderedDict`?