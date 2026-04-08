---
tags: 
  - core
  - python
  - data_structure
  - sequence
  - mutable
  - collection
  - array
  - concept
source: 
  - "[[Introduction to Python]]"
related: 
  - "[[Fundamental - Programming]]"
  - "[[Python - List as a Data Type]]"
  - "[[Python - Lists with Mixed Data Types]]"
  - "[[Python - Nested Lists]]"
  - "[[Python - Basic Data Types Cheatsheet]]"
  - "[[Python - Tuples]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Sets]]"
  - "[[Python - Indexing and Slicing]]"
  - "[[Python - For Loops]]"
  - "[[Python - List Comprehensions]]"
  - "[[Data Structures - Arrays]]"
  - "[[Data Structures - Linked Lists]]"
---
# Core: Lists

## Summary

>A Python list is an ordered, mutable (changeable) collection of items enclosed in square brackets. It can hold various data types, including numbers, strings, and even other lists, making it a highly flexible data structure.

**Why This Matters:** Lists are the fundamental way to store and manage ordered collections of items in Python, making it possible to work with groups of related data efficiently.

_Analogy:_ _Think of a Python list like a train. Each car on the train is an element in the list, and it holds a specific piece of cargo (the data). You can change the cargo in any car (mutable), add new cars to the end, remove cars, and the order of the cars is fixed unless you deliberately rearrange them._

**Where it breaks down:** While you can easily access any train car by its position (index), a real train requires you to move past other cars. In a Python list, you can instantly access any element by its index without traversing the ones before it.

```
Variable      Memory Address      Value (The List)
  fam   ───────>   0x10a...    ┌──────┬──────┬──────┬──────┐
                               │ 1.73 │ 1.68 │ 1.71 │ 1.89 │
                               └──────┴──────┴──────┴──────┘
                                 [0]    [1]    [2]    [3]   (Indices)
```

## Details

In Python, when you need to group multiple pieces of information together in a specific order, a list is the go-to tool. As the example of collecting heights from family members shows, you can create a list simply by enclosing comma-separated values within square brackets `[]`. This creates a data structure that you can then assign to a variable, like `fam`, allowing you to reference and manipulate the entire collection of heights using a single name. Lists are one of Python's most versatile [[Python - List as a Data Type|data types]] because they are **ordered** (items maintain their position) and **mutable** (you can change their contents after creation).

#### Primary Goal

To store an ordered sequence of items in a single variable, allowing for efficient access, modification, and iteration.

#### Mechanism

- **Step 1: Define the Elements**
    - Decide on the data you want to store in sequence. In the example, these are the heights: `1.73`, `1.68`, `1.71`, and `1.89`.
- **Step 2: Enclose in Square Brackets**
    - Place the elements, separated by commas, inside a pair of square brackets `[]` to signify that you are creating a list.
- **Step 3: Assign to a Variable**
    - Use the equals sign `=` to assign the newly created list to a meaningful variable name. This allows you to easily reference the entire collection later.

##### Code Translation

```python
# --- Step 1: The elements are the heights of two sisters and parents ---
# 1.73, 1.68, 1.71, 1.89

# --- Step 2: Enclose the elements in square brackets ---
# [1.73, 1.68, 1.71, 1.89]

# --- Step 3: Assign the list to a variable named 'fam' ---
fam = [1.73, 1.68, 1.71, 1.89]

# You can now print the variable to see the list it holds
print(fam)
# Output: [1.73, 1.68, 1.71, 1.89]
```

#### Key Parameters

- **Elements**
    - The items inside the list are its primary contents. The power of lists comes from the flexibility of these elements.
    - **Data Type**: While a list can contain items of a single type (like numbers), it's also powerful enough to handle [[Python - Lists with Mixed Data Types|lists with mixed data types]].
    - **Order**: The sequence in which you place the items matters. The first item is at index 0, the second at index 1, and so on. This order is preserved unless you explicitly change it.

#### Core Trade-offs

- **Flexibility (Pro)**
    - Lists are mutable, meaning you can add, remove, or change elements after creation. This makes them ideal for collections of data that need to change over time, like a list of tasks to complete.
- **Performance (Con)**
    - This mutability comes at a cost. Operations like inserting or deleting items in the middle of a large list can be slow because it may require shifting many other elements in memory. For fixed collections, a tuple can be more memory and time-efficient.
- **Heterogeneity (Pro)**
    - Lists can store different data types in the same collection (e.g., a string, an integer, and a float). This is great for flexibility but can sometimes make code harder to reason about compared to structures that enforce a single data type.

## Connections

```
                  (Parent)
           Fundamental - Programming
                       ▲
                       │
       ┌───────────────┼────────────────────────────┐
       │               │                            │
(Data Type)   ┌──────────────────┐          (Element Types)
List as a Data Type │      Lists       │          Basic Data Types
              └──────────────────┘
                       │
                       ▼
                  (Child)
                Nested Lists
```

### Parent Concept

Lists are a fundamental data structure provided by most high-level languages and are a core component of [[Fundamental - Programming|fundamental programming]].

### Child Concepts

- A powerful extension of this concept is the [[Python - Nested Lists|nested list]], which is simply a list that contains other lists as its elements, useful for representing matrices or grids.

### Related Concepts 

- A list is a specific implementation of a [[Python - List as a Data Type|data type]] in Python, designed for ordered collections.
- The elements within a list can be of any type, as detailed in the [[Python - Basic Data Types Cheatsheet|basic data types cheatsheet]].
- Unlike some other languages, Python allows for [[Python - Lists with Mixed Data Types|lists with mixed data types]], increasing their flexibility.
## Questions

- You're building a system to process user activity logs. You could use a list of lists to store this data in memory for quick analysis, or a more rigid data structure like a NumPy array. When would the flexibility of a Python list be worth the potential performance and memory overhead, and how would you justify this to a product manager concerned with system responsiveness?
- If a critical real-time application uses a Python list as a queue, with one thread adding items and another removing them, what specific race conditions or performance bottlenecks could arise as the list grows to millions of elements, and what alternative data structure from Python's standard library would be a better choice for a thread-safe, scalable queue?
- What if Python lists were immutable, like tuples? How would this fundamental change alter common programming patterns for data manipulation, and what new functions or methods would the language need to introduce to compensate for the inability to modify lists in place?