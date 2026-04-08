---
tags: 
  - core
  - python
  - immutability
  - mutability
  - memory_management
  - data_types
  - object_state
  - concept
source: 
  - "[[Intermediate Python]]"
related: 
  - "[[Python - Objects]]"
  - "[[Python - Data Types]]"
  - "[[Python - Variables]]"
  - "[[Python - Lists]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Dictionary Key Immutability]]"
  - "[[Python - List Memory Model (Reference vs. Value)]]"
  - "[[Fundamental - Computer Science]]"
  - "[[Python - Functions]]"
  - "[[Python - Lists vs Dictionaries]]"
  - "[[Python - Key Characteristics]]"
  - "[[Python - Strings]]"
  - "[[Python - Tuples]]"
---
# Core: Immutable Objects

## Summary

>An immutable object is an object whose internal state cannot be modified after it has been created. In Python, when you perform an operation that appears to 'change' an immutable object, you are actually creating a completely new object in memory. Common examples include strings, booleans, integers, and floats, which stand in contrast to mutable objects like lists, whose contents can be altered in place.

**Why This Matters:** Understanding immutability is critical for writing predictable and bug-free code, as it guarantees that an object's state cannot be accidentally changed, which is essential for data integrity.

_Analogy:_ _Think of an immutable object as a signed and notarized legal contract. Once the contract is signed (the object is created), you cannot go back and scribble out a clause or change a date. If you need to alter the terms, you must draft an entirely new contract or an addendum (a new object) that supersedes the old one. The original document remains unchanged and serves as a permanent record._

The contract represents the immutable object (e.g., the string 'hello'). The signatures represent the finalization of its creation. Changing a term is like trying to modify the string. Drafting a new contract is like creating a new string ('hello world').

**Where it breaks down:** In Python, the 'old' object (the original contract) is often discarded by the garbage collector if no variables are pointing to it anymore. In the real world, the original contract is usually archived, not destroyed.

```
Initial State:

  Variable         Memory Address         Object (Value)
  ┌──────┐         ┌────────────┐         ┌────────────┐
  │  x   ├────────>│   0x7ff...a0   │         │     10     │
  └──────┘         └────────────┘         └────────────┘

After `x = x + 1`:

  Variable         Memory Address         Object (Value)
  ┌──────┐         ┌────────────┐         ┌────────────┐
  │  x   ├─┐      │   0x7ff...a0   │         │     10     │ (Orphaned)
  └──────┘ │       └────────────┘         └────────────┘
           │
           └───────>┌────────────┐         ┌────────────┐
                    │   0x7ff...c8   │         │     11     │ (New Object)
                    └────────────┘         └────────────┘
```

## Details

The core idea of immutability is to ensure that an object's value is constant throughout its lifecycle. This concept is fundamental to how Python manages memory and data. When you assign a variable to an immutable value like `x = 10`, the variable `x` is essentially a label pointing to an object in memory that holds the value 10. If you then execute `x = 11`, you are not changing the object `10`; you are creating a new object `11` and redirecting the label `x` to point to this new object. This behavior prevents unintended side effects where multiple parts of a program might reference the same object. This property is so important that it's a strict requirement for certain data structures, as explored in [[Python - Dictionary Key Immutability|dictionary key immutability]].

#### Primary Goal

To guarantee that an object's state remains constant after creation, preventing accidental modifications and making programs more predictable and easier to reason about.

#### Mechanism

- **How it Works: The Memory Model**
    1. **Creation & Referencing:** When an immutable object is created (e.g., `my_string = "abc"`), a piece of memory is allocated to store the value `"abc"`, and the variable `my_string` is set to point to that memory address.
    2. **Apparent Modification:** When you perform an operation that seems to modify it (e.g., `my_string = my_string + "d"`), Python does not alter the original `"abc"` object.
    3. **New Object Creation:** Instead, it creates a brand new object, `"abcd"`, in a new memory location.
    4. **Re-referencing:** The variable `my_string` is then updated to point to the memory address of the new `"abcd"` object. The original `"abc"` object is left unchanged and will be garbage-collected if no other variables are pointing to it.
- **Common Immutable Types**
    - *Integers*: `x = 10`
    - *Floats*: `pi = 3.14`
    - *Strings*: `name = "Alice"`
    - *Booleans*: `is_active = True`
    - *Tuples*: `coordinates = (10, 20)`
- **Common Mutable Types (for Contrast)**
    - *Lists*: `my_list = [1, 2, 3]`. You can change it in place: `my_list.append(4)`.
    - *Dictionaries*: `my_dict = {'key': 'value'}`. You can add new key-value pairs.
    - *Sets*: `my_set = {1, 2, 3}`. You can add or remove elements.

##### Code Translation

```python
# --- Step 1: Create an immutable integer and check its memory ID ---
# The id() function returns the unique memory address of an object.
x = 10
print(f"Value: {x}, Memory ID: {id(x)}")

# --- Step 2: "Modify" the integer and check its ID again ---
# Python creates a NEW integer object and points x to it.
x = x + 1
print(f"Value: {x}, Memory ID: {id(x)}") # The ID will be different!

print("\n-- Contrast with a Mutable List --\n")

# --- Step 3: Create a mutable list and check its memory ID ---
my_list = [1, 2, 3]
print(f"Value: {my_list}, Memory ID: {id(my_list)}")

# --- Step 4: Modify the list in-place and check its ID again ---
# The list object itself is changed, but no new object is created.
my_list.append(4)
print(f"Value: {my_list}, Memory ID: {id(my_list)}") # The ID will be the SAME!
```

 [[Code - Immutable Objects Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- Immutability is a fundamental, built-in characteristic of a data type in Python, not a parameter that can be tuned or configured by the user. You choose a type based on whether you need its properties to be mutable or immutable.

#### Core Trade-offs

- **Pro: Predictability and Safety**
    - Immutable objects are inherently thread-safe because their state cannot be changed by concurrent processes. This simplifies multi-threaded programming.
    - It prevents hard-to-find bugs where an object is unintentionally modified by a different part of the program that shares a reference to it.
    - This property is why they are required for [[Python - Dictionary Key Immutability|dictionary keys]]; the key must be constant to ensure the hash value never changes.
- **Con: Performance Overhead**
    - Operations that involve many modifications (e.g., building a long string by concatenating in a loop) can be inefficient. Each concatenation creates a new string object, leading to increased memory allocation and garbage collection.
    - For these scenarios, it's better to use a mutable alternative designed for this purpose, like using `''.join()` with a list of strings.

## Connections

```
                 (Parent)
           Python - Objects
                    ▲
                    │
┌───────────────────┼───────────────────┐
│                   │                   │
(Contrast) ┌───────────────────┐ (Application)
Mutable    │ Immutable Objects │ Dictionary Key Immutability
Objects    └───────────────────┘
                    │
                    │
             (Related To)
     List Memory Model (Ref vs Value)
```

### Parent Concept

This concept is a fundamental property of [[Python - Objects|Python objects]], defining whether their internal state can be changed after creation.

### Related Concepts 

- The requirement for [[Python - Dictionary Key Immutability|dictionary key immutability]] is a direct and critical application of this concept.
- The behavior of [[Python - Lists|lists]] provides a clear contrast, as they are a prime example of a mutable data structure.
- Understanding the [[Python - List Memory Model (Reference vs. Value)|memory model of references versus values]] is essential to grasp the underlying mechanism of why immutability works the way it does.
- The choice between mutable and immutable structures is a key factor in the discussion of [[Python - Lists vs Dictionaries|lists vs. dictionaries]] and their respective use cases.
## Questions

- Imagine you're building a configuration system for a large application. Would you choose to store configuration settings in a mutable dictionary or an immutable data structure (like a tuple of tuples)? Justify your choice in terms of system stability, ease of debugging, and the potential business impact of an accidental configuration change in production.
- If you're processing a massive text file by concatenating strings in a loop, this can be very inefficient due to immutability creating new objects constantly. How would you design a scalable data processing pipeline in Python to build a very large string efficiently, and what specific data structures or modules would you use to mitigate this performance bottleneck?
- What if Python's core numeric types (integers, floats) were mutable? Describe a simple scenario where this would lead to catastrophic and difficult-to-debug errors in a financial calculation application.