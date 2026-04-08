---
tags: 
  - comparison
  - python
  - mutability
  - immutability
  - in-place_modification
  - pass_by_assignment
  - memory_model
  - concept
source: 
  - "[[Writing Functions in Python]]"
related: 
  - "[[Python - Mutable Objects]]"
  - "[[Python - Immutable Objects]]"
  - "[[Python - Pass by Assignment]]"
  - "[[Python - Variable Assignment & Memory Model]]"
  - "[[Python - Function Argument Passing]]"
  - "[[Python - Mutable Default Arguments Pitfall]]"
  - "[[Python - Handling Mutable Default Arguments with None]]"
  - "[[Python - Objects]]"
  - "[[Python - Data Types]]"
  - "[[Python - Lists]]"
  - "[[Python - Tuples]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Sets]]"
  - "[[Python - List Memory Model (Reference vs. Value)]]"
  - "[[Python - Functions]]"
---
# Comparison: Mutable vs. Immutable Objects

## Why This Comparison Matters

> In Python, the distinction between mutable and immutable objects is fundamental to understanding data behavior. Mutable objects (like lists or dictionaries) can be changed in-place after they are created. Immutable objects (like integers, strings, or tuples) cannot be changed; any operation that appears to modify them actually creates a new object. This concept is the cornerstone for understanding Python's [[Python - Pass by Assignment|pass-by-assignment]] mechanism and the [[Python - Variable Assignment & Memory Model|variable assignment and memory model]], as it dictates whether a function can alter the original object passed to it.

_Analogy:_ _Imagine you have a whiteboard and a printed, laminated document.

- **The Whiteboard is a Mutable Object:** You can walk up to the whiteboard (the object in memory) and change it directly. You can erase a word, add a drawing, or rewrite a sentence. The whiteboard itself—the physical object—remains the same, but its content is altered. Anyone else looking at that same whiteboard will see your changes instantly.

- **The Laminated Document is an Immutable Object:** If you find a typo in the document, you cannot change the document itself. It's sealed. To 'correct' it, you must go back to the original computer file, make the change, and print a brand new, laminated document. You then replace the old document with the new one. The original document is untouched and unchanged._

- **Where it breaks down:** The analogy is about changing the object itself. In Python, you can always reassign a variable name. For the immutable document, this is like throwing the old one in the trash and putting the new one in its place. The variable `my_doc` now points to the new object, but the analogy doesn't fully capture that the old, unchanged object might still exist in memory if another variable still points to it.

## Side-by-Side Comparison

- **Mutable Objects**
    - Can be modified in-place after creation.
    - The object's memory address (ID) remains the same after modification.
    - Changes made via one variable are visible to all other variables referencing the same object.
    - Generally cannot be used as dictionary keys or in sets because their value can change, which would alter their hash value.
    - Examples: `list`, `dict`, `set`, `bytearray`.
- **Immutable Objects**
    - Cannot be modified after creation. Apparent modifications create a new object.
    - Any operation that 'changes' the object results in a new object with a new memory address.
    - Variables must be reassigned to the new object to see the 'change'.
    - Can be used as dictionary keys or in sets because their value and hash are guaranteed to be constant.
    - Examples: `int`, `float`, `bool`, `string`, `tuple`, `frozenset`.

### Comparison Table

| Feature                  | Mutable Objects                                | Immutable Objects                                |
|--------------------------|------------------------------------------------|--------------------------------------------------|
| **In-place Modification**  | Yes, content can be changed directly.          | No, a new object must be created.                |
| **Memory ID on 'Change'**  | Stays the same.                                | A new ID is assigned to the new object.          |
| **Hashing (e.g., dict keys)** | Generally not hashable (e.g., `list`).         | Hashable, as their value is constant.            |
| **Side Effects in Functions** | High risk; function can alter the caller's object. | Low risk; function works on a copy or new object.|
| **Common Examples**        | `list`, `dict`, `set`, `bytearray`             | `int`, `str`, `tuple`, `frozenset`               |

## Key Similarities

Both mutable and immutable objects are first-class citizens in Python. The core similarity lies in how variables interact with them: a variable is always just a name or a label that points to an object in memory. For both types, you can reassign a variable to point to a completely different object at any time. The distinction is not in how variables work, but in whether the underlying object they point to can be changed.

## Verdict: When to Use Which

Use immutable objects (like tuples) when you need to guarantee that data remains constant, such as for dictionary keys, set elements, or function arguments you want to protect from side effects. Use mutable objects (like lists) when you need a collection that can be efficiently modified in-place, such as accumulating results in a loop or building up a complex data structure.

## Broader Connections

```
                      (Parent)
                 Python - Objects
                        ▲
                        │
┌───────────────────────┼────────────────────────┐
│                       │                        │
(Impacts)      ┌───────────────────────────┐      (Impacts)
Pass by Assignment │Mutable vs. Immutable Objects│ Variable Assignment
                   └───────────────────────────┘
                              │
                   ┌──────────┴───────────┐
                   │                       │
          (Example Of)            (Example Of)
        Mutable Objects         Immutable Objects
```

- The distinction between mutable and immutable types is the foundation for understanding Python's [[Python - Pass by Assignment|pass-by-assignment]] mechanism for function arguments.
- This concept is deeply intertwined with the [[Python - Variable Assignment & Memory Model|variable assignment and memory model]], where names are simply references to underlying objects.
- A detailed exploration of objects that can be changed in-place is covered in [[Python - Mutable Objects]].
- Conversely, objects that cannot be changed after creation are detailed in [[Python - Immutable Objects]].
- A common source of bugs, the [[Python - Mutable Default Arguments Pitfall|pitfall of mutable default arguments]], arises directly from misunderstanding this distinction.

## Deeper Questions

- You're designing a configuration system for a large application. Would you store the configuration settings in a dictionary (mutable) or a custom object using frozensets and tuples (immutable)? Justify your choice in terms of system stability, performance, and the potential business cost of an accidental configuration change in production.
- In a multi-threaded application processing a large, shared dataset (e.g., a list of user profiles), describe the specific race conditions and data corruption issues that could arise if the dataset is mutable. How would using an immutable data structure instead simplify the concurrency model, and what performance trade-offs might you incur?
- What if Python's strings were mutable? How would this fundamentally change string processing, slicing, and memory management within the Python interpreter? What existing language features or common programming patterns would become inefficient or even impossible?