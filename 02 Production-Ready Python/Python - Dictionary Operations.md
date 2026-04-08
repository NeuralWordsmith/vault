---
tags:
  - major_core
  - python
  - dictionary_modification
  - add_key_value
  - update_value
  - delete_key
  - mutable_data
  - concept
source:
  - "[[Intermediate Python]]"
related:
  - "[[Python - Dictionaries]]"
  - "[[Python - Adding Elements to a Dictionary]]"
  - "[[Python - Updating Dictionary Values]]"
  - "[[Python - Deleting Dictionary Elements]]"
  - "[[02 Production-Ready Python/Python - Mutable vs Immutable Objects]]"
  - "[[Python - Lists vs Dictionaries]]"
  - "[[Python - Checking for Key Existence in Dictionaries]]"
  - "[[Python - Dictionary Key Uniqueness]]"
  - "[[Python - Dictionary Key Immutability]]"
  - "[[Python - Data Types]]"
  - "[[Python - Lists]]"
  - "[[Python - List Manipulation]]"
  - "[[Fundamental - Programming]]"
---
# Major Core: Manipulating Dictionaries

## Summary

> Unlike static data structures, Python dictionaries are mutable, meaning they are designed to be changed after they are created. This flexibility allows you to perform three core operations: adding new key-value pairs, updating the values associated with existing keys, and deleting key-value pairs that are no longer needed. These operations make dictionaries a powerful tool for managing data that evolves over the course of a program's execution.

**Why This Matters:** Manipulating dictionaries is fundamental to programming because it allows applications to dynamically manage and update data, which is essential for tracking state, aggregating information, and responding to real-time events.

_Analogy:_ _Think of a dictionary as your phone's contact list. The contact's name is the 'key' (unique) and their information (phone number, email) is the 'value'. You can dynamically manipulate this list: you can add a new friend's contact information (adding an element), update a friend's phone number when they get a new one (updating a value), and remove a contact you no longer need (deleting an element). The list is not fixed; it grows and changes with your social circle._

The contact list is a living, editable collection of information, just like a Python dictionary.
*   **Where it breaks down:** In a phone's contact list, you might have two people with the exact same name. In a Python dictionary, every key must be absolutely unique. This concept is explored further in [[Python - Dictionary Key Uniqueness|dictionary key uniqueness]].

```
Initial State:
+--------------------------+
|  "spain": 46.77         |
|  "france": 65.27        |
+--------------------------+
         │
         ▼ (Add, Update, Delete)
         │
Final State:
+--------------------------+
|  "spain": 47.35         |
|  "germany": 83.2        |
+--------------------------+
```

## Details

After learning how to create and access dictionaries, the next crucial step is understanding how to modify them. Dictionaries are not static; their power comes from their mutability. This means you can add new data, change existing data, or remove data entirely after the dictionary has been created. This dynamic nature is central to their use in programming for tasks like counting items, storing configuration settings, or representing complex objects. The primary ways to manipulate a dictionary are through **adding new elements**, **updating existing values**, and **deleting elements**.

#### Primary Goal

To provide a flexible and efficient way to add, modify, and remove key-value pairs from a data collection, allowing it to adapt as a program runs.

#### Mechanism

- **Step 1: Add a New Key-Value Pair**
    - To add a new item, you use square bracket notation with a new key on the left side of an assignment operator and the value on the right. If the key does not exist, Python creates it.
- **Step 2: Update an Existing Value**
    - The syntax for updating is identical to adding. If you use square bracket notation with a key that *already exists* in the dictionary, Python will simply overwrite the old value with the new one.
- **Step 3: Delete a Key-Value Pair**
    - To remove an item completely, you use the `del` keyword followed by the dictionary variable and the key you wish to remove in square brackets.

```python
# --- Initial Dictionary ---
# A dictionary representing population data for two countries
population = {
    "spain": 46.77,
    "france": 65.27
}
print(f"Initial: {population}")

# --- Step 1: Add a New Key-Value Pair ---
# Add Germany's population (in millions)
population["germany"] = 83.2
print(f"After Adding: {population}")

# --- Step 2: Update an Existing Value ---
# Update Spain's population with a more recent figure
population["spain"] = 47.35
print(f"After Updating: {population}")

# --- Step 3: Delete a Key-Value Pair ---
# Remove France from the dictionary
del(population["france"])
print(f"After Deleting: {population}")
```

 [[Code - Manipulating Dictionaries Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Assignment (`[] = value`)**
    - This is the primary mechanism for both adding and updating. Its behavior depends on whether the key already exists. This is a core aspect of [[Python - Adding Elements to a Dictionary|adding elements]] and [[Python - Updating Dictionary Values|updating values]].
- **`del` Keyword**
    - The `del` statement is the most direct way to remove a key-value pair. If you try to delete a key that doesn't exist, it will raise a `KeyError`. This highlights the importance of [[Python - Checking for Key Existence in Dictionaries|checking for key existence]] before attempting deletion.

#### Core Trade-offs

- **Power vs. Risk**
    - Mutability is powerful, allowing data structures to adapt. However, it can introduce bugs. If a dictionary is passed to a function, that function can modify the original dictionary, leading to unexpected side effects elsewhere in the code. This is a key difference between [[02 Production-Ready Python/Python - Mutable vs Immutable Objects|mutable and immutable objects]].
- **Performance Considerations**
    - Adding, updating, and deleting items in a dictionary are typically very fast operations, with an average time complexity of O(1). This efficiency is a major reason why dictionaries are preferred over lists for lookups and modifications when you have a unique identifier (the key).
- **Error Handling**
    - Attempting to access or delete a key that does not exist will result in a `KeyError`, which can crash a program if not handled properly. This necessitates defensive programming, such as checking if a key exists before trying to use it.

## Connections

```
                 (Parent)
           Python - Dictionaries
                     ▲
                     │
┌────────────────────┼────────────────────┐
│                    │                    │
(Foundation)  ┌───────────────────────────┐  (Contrast)
Mutable vs    │ Manipulating Dictionaries │  Lists vs
Immutable     └───────────────────────────┘  Dictionaries
Objects                    │
            ┌──────────────┴──────────────┐
            │                             │
Adding Elements to a Dictionary  Updating Dictionary Values  Deleting Dictionary Elements
```

### Parent Concept

This concept is a fundamental aspect of working with the [[Python - Dictionaries|Python dictionary]] data structure, which is a core component of the language.

### Child Concepts

- [[Python - Adding Elements to a Dictionary|Adding elements]] is the specific operation for inserting new key-value pairs.
- [[Python - Updating Dictionary Values|Updating values]] covers the process of changing the value associated with an existing key.
- [[Python - Deleting Dictionary Elements|Deleting elements]] is the operation for removing key-value pairs from the dictionary.

### Related Concepts 

- The concept of mutability is foundational and is explored in detail in [[02 Production-Ready Python/Python - Mutable vs Immutable Objects|mutable vs. immutable objects]].
- The ability to efficiently modify data based on a key is a primary feature that [[Python - Lists vs Dictionaries|contrasts dictionaries with lists]].
- Before attempting to update or delete, it's often necessary to perform a check, as detailed in [[Python - Checking for Key Existence in Dictionaries|checking for key existence]].
- The behavior of manipulation is governed by the rules of [[Python - Dictionary Key Uniqueness|dictionary key uniqueness]].
## Questions

- When designing a data processing pipeline, when would you choose to create a new dictionary with updated values versus modifying one in-place? Discuss the trade-offs in terms of memory usage, performance, and code readability.
- Imagine a multi-threaded application where different threads need to read from and write to a shared dictionary that acts as a cache. What specific race conditions could arise from these dictionary manipulations, and what Python concurrency tools (like locks) would you implement to ensure data integrity?
- What if Python dictionaries were immutable by default, like tuples? How would this fundamentally change common programming patterns for data aggregation and state management, and what new data structures or idioms would need to emerge to compensate?
