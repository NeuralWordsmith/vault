---
tags: 
  - comparison
  - python
  - mutability
  - immutability
  - data_structures
  - in-place_modification
  - hashing
  - concept
source: 
  - "[[Data Types in Python]]"
related: 
  - "[[Python - Lists]]"
  - "[[Python - Tuples]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Data Types]]"
  - "[[Python - List Memory Model (Reference vs. Value)]]"
  - "[[DSA - Data Structures & Algorithms]]"
  - "[[Python - Container Sequences]]"
  - "[[Python - Appending to a List]]"
  - "[[Python - Removing Elements from a List with pop()]]"
  - "[[Python - Iterating over lists]]"
  - "[[Python - List Indexing 1]]"
  - "[[Python - Functions]]"
  - "[[Python - Objects]]"
---
# Comparison: Mutability vs. Immutability

## Why This Comparison Matters

> In Python, an object's mutability determines whether its state or value can be changed after it has been created. Mutable objects, such as lists, can be altered in-place, meaning you can perform operations like [[Python - Appending to a List|appending]], [[Python - Removing Elements from a List with pop()|removing]], or changing elements without creating a new object. In contrast, immutable objects, like tuples and strings, cannot be altered. Any operation that appears to modify an immutable object actually creates a new object in memory. This distinction is crucial for data integrity, as immutability protects reference data from accidental changes, making code more predictable.

_Analogy:_ _Think of a mutable object as a whiteboard in a meeting room. Anyone with a marker can walk up to it, erase a section, and add new drawings or notes. The whiteboard itself remains the same physical object, but its content changes. An immutable object is like a printed and laminated sign. Once it's created, you can't change the text on it. If you need a different sign, you must design and print a completely new one; you cannot alter the original._

The analogy maps well to the concept of in-place modification (whiteboard) versus creating a new object (printing a new sign). 

*   **Where it breaks down:** The analogy doesn't fully capture Python's variable assignment. When you 'change' an immutable object like a string (`my_string = my_string + 'a'`), you aren't just getting a new sign; you're also telling the variable name `my_string` to stop pointing at the old sign and point to the new one instead. The original object might still exist in memory for a short time until it's garbage collected.

## Side-by-Side Comparison

- **Mutable Objects (e.g., Lists, Dictionaries, Sets)**
    - Can be modified in-place after creation.
    - Flexible size; elements can be added or removed.
    - Changes to an object are reflected in all variables that reference it.
    - Generally cannot be used as dictionary keys because their hash value would change.
- **Immutable Objects (e.g., Tuples, Strings, Integers, Floats)**
    - Cannot be modified after creation; any 'change' creates a new object.
    - Fixed size and content.
    - Safer for use as default arguments in functions and in multi-threaded applications.
    - Can be used as dictionary keys because their hash value is constant.

### Comparison Table

| Feature             | Mutable (e.g., `list`)                               | Immutable (e.g., `tuple`)                            |
|---------------------|------------------------------------------------------|------------------------------------------------------|
| **Modifiability**   | Can be changed in-place (add, remove, update)        | Cannot be changed; operations create a new object    |
| **Performance**     | Slower to create due to dynamic memory allocation    | Faster to create as the size is fixed                |
| **Memory Usage**    | Less memory-efficient; often over-allocates space    | More memory-efficient; exact space is allocated      |
| **Use Case**        | Dynamic collections of data (e.g., a list of tasks)  | Fixed data sets (e.g., coordinates, RGB values)      |
| **Hashing**         | Not hashable; cannot be used as dictionary keys      | Hashable; can be used as dictionary keys             |

## Key Similarities

Both mutable and immutable container types, like lists and tuples, serve as collections of items. They are both considered [[Python - Container Sequences]], can store heterogeneous data types, support indexing to access elements (as seen in [[Python - List Indexing 1]]), and can be looped over, which is a core part of [[Python - Iterating over lists|list iteration]].

## Verdict: When to Use Which

Use mutable types like lists when you need a collection that will grow, shrink, or change over its lifetime. Use immutable types like tuples when you want to ensure a collection of data remains constant, for performance gains with fixed data, or when you need a hashable type to use as a dictionary key.

### Comparative Code Example
```python
# --- Mutable Example: List ---
# A list can be changed in-place.
mutable_list = [1, 2, 3, 4]
print(f"Original list: {mutable_list}, ID: {id(mutable_list)}")

# Appending an element modifies the original list object.
mutable_list.append(5)
print(f"After append:  {mutable_list}, ID: {id(mutable_list)}") # ID is the same

# Removing an element also modifies the original object.
mutable_list.pop()
print(f"After pop:     {mutable_list}, ID: {id(mutable_list)}") # ID is the same


# --- Immutable Example: Tuple ---
# A tuple cannot be changed.
immutable_tuple = (1, 2, 3, 4)
print(f"\nOriginal tuple: {immutable_tuple}, ID: {id(immutable_tuple)}")

# Attempting to change an element raises an error.
try:
    immutable_tuple[0] = 99
except TypeError as e:
    print(f"Error on modification: {e}")

# 'Adding' to a tuple creates a completely new tuple object.
new_tuple = immutable_tuple + (5,)
print(f"New tuple:      {new_tuple}, ID: {id(new_tuple)}") # ID is different
```

## Broader Connections

```
                 (Parent)
          Python - Data Types
                   ▲
                   │
┌──────────────────┼──────────────────┐
│                  │                  │
(Concept)   ┌───────────────────────────┐   (Concept)
List Memory │ Mutability vs. Immutability │   Hashing
            └───────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
 (Mutable Example)     (Immutable Example)
      Lists                 Tuples
```

- The ability to change a list in-place is demonstrated by operations like [[Python - Appending to a List|appending]] and [[Python - Removing Elements from a List with pop()|popping elements]].
- Both mutable lists and immutable tuples are examples of [[Python - Container Sequences]], meaning they can hold collections of other objects.
- Despite their differences in mutability, both types support [[Python - Iteration 1|iteration]] to access their elements one by one.
- The concept of mutability is fundamental to understanding the [[Python - List Memory Model (Reference vs. Value)|difference between passing by reference and by value]].

## Deeper Questions

- You're designing a system to store user configuration settings that are read frequently but updated very rarely. Would you choose a mutable `dict` or an immutable `tuple` of key-value pairs? Justify your decision to a project manager in terms of performance, data integrity, and long-term maintenance costs.
- In a multi-threaded application processing a large, shared dataset, what specific dangers does using a mutable data structure like a list introduce? How would you design a system using immutable structures to avoid race conditions and ensure data consistency across threads without relying on complex locking mechanisms?
- What if Python's strings were mutable? How would this fundamental change impact the language's performance, security (especially regarding dictionary keys and hashing), and common programming idioms?