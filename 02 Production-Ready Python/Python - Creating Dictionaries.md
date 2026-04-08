---
tags:
  - core
  - python
  - key_value_pair
  - hash_map
  - mapping_type
  - data_structure
  - associative_array
  - concept
source:
  - "[[Data Structures and Algorithms in Python]]"
related:
  - "[[Python - Hash Tables]]"
  - "[[Python - Data Types]]"
  - "[[Python - Dictionary Operations]]"
  - "[[Python - Lists]]"
  - "[[Python - Tuples]]"
  - "[[Python - Hash Function]]"
  - "[[Python - Iterating Over Dictionaries 1]]"
  - "[[Python - Nested Dictionaries]]"
  - "[[Python - Adding and Modifying Dictionary Entries]]"
  - "[[Python - Accessing Dictionary Values with get()]]"
  - "[[Python - Dictionary .items() Method]]"
  - "[[Python - Dictionary .keys() Method]]"
  - "[[Python - Dictionary .values() Method]]"
  - "[[Python - Hash Tables & Dictionaries Relationship]]"
  - "[[Fundamental - Computer Science]]"
---
# Core: Dictionaries

## Summary

>In Python, dictionaries are the primary, built-in implementation of the [[Python - Hash Tables|hash table]] data structure. They store collections of data as key-value pairs, allowing for highly efficient lookup. For example, you can map a dish name (the key) to its price (the value), creating an intuitive and fast way to access information.

**Why This Matters:** Dictionaries enable near-instantaneous data retrieval by using a unique, human-readable key instead of a numerical index, which is fundamental for efficient data management in programming.

_Analogy:_ _A Python dictionary is like a physical dictionary or a rolodex. To find the definition of 'ephemeral' (the value), you don't read the book from the beginning; you use the word 'ephemeral' (the key) to jump directly to the correct page and find its definition. Similarly, to find a contact's phone number, you use their name to find their card instantly._

In this analogy:
- **The Word/Name** = The Dictionary Key
- **The Definition/Phone Number** = The Dictionary Value
- **The Alphabetical Indexing** = The Hashing Mechanism

**Where it breaks down:** A physical dictionary is sorted alphabetically. Python dictionaries, since version 3.7, maintain the order in which items were inserted, which is not necessarily alphabetical or numerical. Also, unlike a rolodex where you might have two 'John Smiths', keys in a Python dictionary must be absolutely unique.

```
Key-Value Pair Structure

  Key         Value
┌─────────┐   ┌─────────┐
│'lasagna'├─► │  14.75  │
└─────────┘   └─────────┘

┌──────────┐   ┌─────────┐
│'moussaka'├─► │  21.15  │
└──────────┘   └─────────┘

┌─────────┐   ┌─────────┐
│ 'sushi' ├─► │  16.05  │
└─────────┘   └─────────┘
```

## Details

In the Python ecosystem, the term for a hash table is a 'dictionary'. It is a mutable, dynamic collection that stores items as key-value pairs. This structure is incredibly versatile for associating related pieces of data. As shown in the example, a menu can be represented where dish names like 'lasagna' are keys and their prices are values. This key-based access is the dictionary's defining feature, distinguishing it from sequence types like lists. The direct [[Python - Hash Tables & Dictionaries Relationship|relationship between the abstract hash table and the Python dictionary]] is that the dictionary is the concrete, ready-to-use implementation of that data structure.

#### Primary Goal

To provide a mutable collection of items where each item is a key-value pair, optimized for extremely fast data retrieval based on its unique key.

#### Mechanism

- **Step 1: Define an Empty Dictionary**
    - You can create an empty dictionary that can be populated later. This is done using a pair of empty curly braces `{}`.
- **Step 2: Define a Dictionary with Items**
    - You can also initialize a dictionary with some key-value pairs from the start. Each pair consists of a `key`, a colon `:`, and a `value`, with pairs separated by commas, all enclosed in curly braces.

##### Code Translation

```python
# --- Step 1: Define an Empty Dictionary ---
my_empty_dictionary = {}
print(f"Empty Dictionary: {my_empty_dictionary}")
print(f"Type: {type(my_empty_dictionary)}")

# --- Step 2: Define a Dictionary with Items ---
# In this example, the dish names are the keys and the prices are the values.
my_menu = {
    'lasagna': 14.75,
    'moussaka': 21.15,
    'sushi': 16.05
}
print(f"\nMenu Dictionary: {my_menu}")

# Accessing a value using its key
price_of_sushi = my_menu['sushi']
print(f"The price of sushi is: ${price_of_sushi}")
```

 [[Code - Dictionaries Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Keys**
    - Must be of an **immutable** type (e.g., strings, numbers, tuples). This is a strict requirement because the dictionary's underlying [[Python - Hash Function|hash function]] needs a consistent value to compute the storage location.
    - Must be **unique** within the dictionary. A duplicate key will overwrite the previous entry.
- **Values**
    - Can be of **any data type**, including mutable types like lists or even other dictionaries.
    - Values do **not** need to be unique; multiple keys can hold the same value.

#### Core Trade-offs

- **Pro: Fast Lookups (O(1))**
    - The primary advantage. On average, the time to look up, add, or delete an item is constant, regardless of the dictionary's size. This is a significant performance benefit over lists, which have O(n) lookup time.
- **Con: Higher Memory Usage**
    - The hash table structure that enables fast lookups requires more memory overhead compared to a simple list or tuple storing the same number of elements.
- **Con: Key Constraints**
    - The requirement for keys to be immutable (hashable) means you cannot use mutable objects like lists or other dictionaries as keys.
- **Neutral: Order Preservation**
    - As of Python 3.7, dictionaries preserve the insertion order of items. While this is now a standard feature, code that needs to run on older versions of Python cannot rely on this behavior.

## Connections

```
                      (Parent)
                    Data Types
                         ▲
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                    │
(Contrasts With) ┌───────────────┐ (Underlying Structure)
   Lists         │  Dictionaries │      Hash Tables
                 └───────────────┘
                         │
              ┌──────────┴──────────┐
              │                     │
    Dictionary Operations     Nested Dictionaries
```

### Parent Concept

Dictionaries are a core built-in mapping type within [[Python - Data Types]].

### Child Concepts

- Common tasks are handled through [[Python - Dictionary Operations|various dictionary operations and methods]], such as adding, removing, and retrieving items.
- Dictionaries can hold other dictionaries as values, creating complex [[Python - Nested Dictionaries|nested data structures]] for representing hierarchical data.
- Specific methods like [[Python - Dictionary .keys() Method|.keys()]], [[Python - Dictionary .values() Method|.values()]], and [[Python - Dictionary .items() Method|.items()]] provide powerful ways to work with a dictionary's components.

### Related Concepts 

- A Python dictionary is the primary implementation of the abstract data structure known as a [[Python - Hash Tables|hash table]].
- The direct link between these two concepts is explored in [[Python - Hash Tables & Dictionaries Relationship]].
- Unlike [[Python - Lists|lists]], which are ordered sequences accessed by integer indices, dictionaries are collections accessed by unique keys.
- You can efficiently loop through the contents of a dictionary, as detailed in [[Python - Iterating Over Dictionaries 1]].
- [[Python - Adding and Modifying Dictionary Entries|Adding or changing entries]] is a fundamental operation that leverages the key to find and update the corresponding value.
## Questions

- Imagine you are storing user profile data. You could use a dictionary or a list of custom objects. When would the performance benefits of a dictionary's O(1) lookup justify its potentially higher memory footprint and key constraints compared to a list of objects, and how would you explain this trade-off to a project manager?
- If you needed to use a large dictionary as a cache in a distributed system, what serialization format (e.g., JSON, pickle, MessagePack) would you choose and why? How would you design the system to handle potential bottlenecks during serialization and deserialization of millions of key-value pairs?
- What if Python dictionary keys were not required to be hashable (i.e., you could use a list as a key)? What alternative data structures or algorithms would you need to implement to replicate dictionary functionality, and what would be the catastrophic performance implications for lookups?