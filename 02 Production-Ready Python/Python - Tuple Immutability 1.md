---
tags: 
  - core
  - python
  - immutability
  - hashable
  - data_integrity
  - tuple
  - data_structure
  - concept
source: 
  - "[[Data Types in Python]]"
related: 
  - "[[Python - Tuples]]"
  - "[[Python - Lists]]"
  - "[[Python - Tuples vs Lists 1]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Data Types]]"
  - "[[Python - Hash Tables]]"
  - "[[Python - Tuple Unpacking 1]]"
  - "[[Python - zip() Function 1]]"
  - "[[Python - enumerate() Function]]"
  - "[[DSA - Data Structures & Algorithms]]"
  - "[[Python - List Memory Model (Reference vs. Value)]]"
  - "[[Python - Objects]]"
  - "[[Python - Comma as Tuple Creation Operator]]"
  - "[[Python - Sets]]"
---
# Core: Tuple Immutability

## Summary

>Immutability is the core property of Python tuples, meaning that once a tuple is created, its contents cannot be altered. You cannot add, remove, or change the elements within it. This provides a powerful guarantee of data integrity and is the primary feature that distinguishes tuples from lists.

**Why This Matters:** Immutability guarantees that data remains constant throughout a program's execution, preventing accidental modifications and making tuples reliable keys in dictionaries.

_Analogy:_ _A tuple is like a signed, sealed contract. Once all parties have signed it, the terms are locked in. You can't just scribble out a clause or add a new one. To reflect a change, you must draft and sign an entirely new contract, leaving the original one intact. The original contract serves as a permanent, unchangeable record._

The contract's terms are the tuple's elements. Signing the contract is like creating the tuple. Trying to alter a clause is like attempting to modify an element, which is forbidden. Creating a new contract is analogous to creating a new tuple with the desired changes. **Where it breaks down:** The analogy falters if a tuple contains a mutable object, like a list. In that case, it's like a contract with an appendix that *can* be edited; the reference to the appendix is fixed, but the appendix's content can change.

```
```
Original Tuple: (10, 20, 30)
[ Sealed Container ]
  │
  ├─> Reference to object '10' @ index 0 (Fixed)
  ├─> Reference to object '20' @ index 1 (Fixed)
  └─> Reference to object '30' @ index 2 (Fixed)

Attempt: coordinates[0] = 99  --->  X TypeError: 'tuple' object does not support item assignment X
```
```

## Details

Immutability is a fundamental characteristic of Python's tuple data structure. Once a tuple is created, its state is effectively 'frozen.' This is a deliberate design choice that provides safety and predictability, ensuring that a collection of items passed around a program cannot be inadvertently changed. This property is crucial for maintaining data integrity and directly contrasts with mutable data structures like [[Python - Lists|lists]], which are designed to be changed.

#### Primary Goal

To provide a data structure that guarantees data integrity and can be used in contexts where an unchangeable sequence is required, such as for dictionary keys or elements in a set.

#### Mechanism

- **How it Works:**
    - When a tuple is created, Python allocates a fixed-size block of memory to store references to the objects it contains. The tuple's identity is tied to this memory location and its contents.
    - The 'immutability' means that these internal references cannot be reassigned to point to new objects, nor can the sequence of references be lengthened or shortened.
- **Attempting Modification Results in an Error:**
    - Any operation that tries to change an element (e.g., `my_tuple[0] = 'new_value'`), add an element (`my_tuple.append(...)`), or remove an element (`del my_tuple[0]`) will fail, raising a `TypeError`.
- **'Changing' a Tuple Creates a New One:**
    - The only way to achieve the effect of modifying a tuple is to create a completely new tuple. This is typically done by concatenating or slicing parts of the old tuple with new elements. The original tuple remains untouched in memory.

##### Code Translation

```python
# --- Step 1: Create a tuple ---
# This object is now fixed and cannot be altered.
coordinates = (10, 20, 30)
print(f"Original tuple: {coordinates}")
print(f"ID of original tuple: {id(coordinates)}")

# --- Step 2: Attempt to modify an element (This will fail) ---
# Python protects the tuple from in-place changes.
try:
    coordinates[0] = 99
except TypeError as e:
    print(f"\nAttempting to modify failed: {e}")

# --- Step 3: "Modify" by creating a new tuple ---
# This creates a new tuple object; it does not alter the original.
new_coordinates = (99,) + coordinates[1:]
print(f"\nNew tuple created: {new_coordinates}")
print(f"ID of new tuple: {id(new_coordinates)}")
print(f"Original tuple remains unchanged: {coordinates}")
```

 [[Code - Tuple Immutability Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Inherent Property:**
    - Immutability is not a parameter you can configure. It is a fundamental, built-in characteristic of the tuple data type in Python. If you need a mutable sequence, you must use a list.

#### Core Trade-offs

- **Pro: Data Integrity & Safety:**
    - The primary advantage. You can pass a tuple to a function and be certain it won't be modified, preventing subtle and hard-to-trace bugs.
- **Pro: Hashability (Use as Dictionary Keys):**
    - Because their contents and hash value can never change, tuples can be used as keys in dictionaries or as elements in sets. Mutable types like lists cannot be used for this purpose.
- **Con: Inflexibility:**
    - If you need a collection that must grow, shrink, or be sorted in place, a tuple is the wrong choice. Constantly creating new tuples to simulate changes is inefficient compared to modifying a list.
- **Caveat: Mutable Contents:**
    - If a tuple contains a mutable object (e.g., a list), the *contents* of that inner object can be changed. The tuple's reference to the list is immutable, but the list itself is not.
    - *Example: `my_tuple = ([1, 2], 3)`. You can execute `my_tuple[0].append(99)`, which changes the tuple to `([1, 2, 99], 3)`. The tuple still points to the same list object, but that list object's content has changed.*

## Connections

```
```
                  (Parent)
                   Tuples
                     ▲
                     │
┌────────────────────┼────────────────────┐
│                    │                    │
(Contrasts With) ┌───────────────────┐ (Enables)
   Lists         │ Tuple Immutability│   Dictionary Keys
                 └───────────────────┘
                     │
                     │
              (Leads To)
            Data Integrity
```
```

### Parent Concept

Immutability is a core characteristic of the [[Python - Tuples|Python tuple]] data structure.

### Child Concepts



### Related Concepts 

- This property is the primary differentiator that [[Python - Tuples vs Lists 1|contrasts tuples with lists]], as lists are mutable by design.
- The immutability of tuples allows them to be used as keys in [[Python - Dictionaries|dictionaries]], a feature not available to lists.
- Because tuples are immutable, operations like [[Python - Tuple Unpacking 1|tuple unpacking]] can be performed with the guarantee that the source data structure won't change during the operation.
## Questions

- You're designing a system to store geographic coordinates (latitude, longitude) for permanent landmarks. Would you use a list of lists or a list of tuples? Justify your choice to a project manager, focusing on the long-term risks of data corruption vs. development flexibility.
- Imagine you have a large-scale caching system that uses complex data structures as keys. Why are tuples a suitable choice for these keys, and what performance implications (both positive and negative) would arise from this choice compared to, for example, using a string representation of the data as a key?
- What if Python's tuples were mutable but had a special `.freeze()` method that made them immutable on demand? How would this change the way you use tuples and lists, and what new programming patterns or potential bugs might emerge?