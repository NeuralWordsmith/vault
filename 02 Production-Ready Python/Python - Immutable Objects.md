---
tags:
  - core
  - python
  - immutability
  - pass_by_assignment
  - memory_model
  - value_type
  - hashable
  - concept
source:
  - "[[Writing Functions in Python]]"
related:
  - "[[Python 5 - Mutable vs Immutable Objects]]"
  - "[[Python - Mutable Objects]]"
  - "[[Python - Pass by Assignment]]"
  - "[[Python - Variable Assignment & Memory Model]]"
  - "[[Python - Function Argument Passing]]"
  - "[[Python - Objects]]"
  - "[[Python - Data Types]]"
  - "[[Python - Tuples]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Scope]]"
  - "[[Python - Functions]]"
  - "[[Python - Lists]]"
  - "[[Python - Pass by Assignment & Memory Model Relationship]]"
---
# Core: Immutable Objects

## Summary

>An immutable object is an object whose internal state cannot be modified after it has been created. In Python, when you perform an operation that appears to change an immutable object, you are actually creating a new object in memory and reassigning the variable name to point to it. This behavior is fundamental to understanding [[Python - Function Argument Passing]], as it explains why variables holding immutable types like integers, strings, or tuples are not altered by function calls.

**Why This Matters:** Immutability ensures that data remains predictable and safe from unintended side effects, which is crucial for building reliable, concurrent, and bug-free programs.

_Analogy:_ _Think of an immutable object as a message written in permanent ink on a stone tablet. Once you've carved the message '3' onto the tablet, you cannot erase or alter it. If you need to represent the value '93', you can't just change the '3'. Instead, you must grab a brand new, blank stone tablet and carve '93' onto it. The original tablet with '3' still exists, completely unchanged._

• **The Stone Tablet:** The object in memory (e.g., the integer `3`).
• **The Permanent Ink:** The immutable nature of the object's data.
• **The Variable Name (`my_var`):** Your hand, which points to a specific tablet.
• **'Modifying' the Value:** The act of needing a new value (e.g., `3 + 90`).
• **Grabbing a New Tablet:** Python creating a completely new integer object (`93`) in a different memory location.
• **Pointing to the New Tablet:** The variable name `my_var` is updated to point to the new tablet with '93' on it.

• **Where it breaks down:** The analogy implies a manual, conscious act of getting a new tablet. In Python, the creation of a new object for immutable types is an automatic, underlying memory management mechanism that is transparent to the programmer during simple operations.

```
Before Operation:
[my_var] ──────────> (Memory Address: 0x100) [Integer Object: 3]

Operation: `my_var = my_var + 90`

After Operation:
[my_var] ──────────┐
                   │
                   └─> (Memory Address: 0x250) [Integer Object: 93]

(Memory Address: 0x100) [Integer Object: 3]  <── (Original object is unchanged)
```

## Details

Based on the example, when we assign `my_var = 3`, the variable `my_var` points to an integer object with the value 3. When we call `bar(my_var)`, the function receives a reference to this same object. However, because integers are immutable, the operation `argument + 90` cannot change the original '3' object. Instead, Python computes the result, 93, creates a *new* integer object for it, and the function's internal `argument` variable points to this new object. The original `my_var` outside the function remains untouched, still pointing to the '3' object. This behavior is a cornerstone of the [[Python - Variable Assignment & Memory Model]] and stands in direct contrast to how [[Python - Mutable Objects]] work. The primary immutable types are **integers, floats, strings, tuples, and frozensets**.

#### Primary Goal

To guarantee that an object's state remains constant throughout its lifecycle, preventing accidental modifications and making programs more predictable and safer, especially in concurrent scenarios.

#### Mechanism

- **How it Works:** The process of 'changing' an immutable object involves reassigning the variable name to a new object.
    - **1. Initial Assignment:** A variable name (e.g., `my_var`) is created and made to point to the memory address of an immutable object (e.g., the integer `3`).
    - **2. 'Modification' Operation:** An operation is performed that appears to modify the variable (e.g., `my_var = my_var + 90`).
    - **3. New Object Creation:** Because the original object (`3`) cannot be altered, Python first computes the new value (`93`). It then creates a brand new integer object in a new memory location to store this value.
    - **4. Rebinding the Name:** The variable name `my_var` is updated to point to the memory address of the new `93` object. The original `3` object is left unchanged and will be garbage collected if no other variable refers to it.

##### Code Translation

```python
# --- Step 1: Initial Assignment ---
# 'my_var' points to the memory address of the integer object 3.
my_var = 3
print(f"Initial value of my_var: {my_var}")
print(f"Initial memory address (id) of my_var: {id(my_var)}")

# --- Step 2: Function Call ---
# The function 'bar' receives a reference to the object '3'.
def bar(argument):
  # Inside the function, a NEW integer object (3 + 90 = 93) is created.
  # The name 'argument' now points to this new object '93'.
  # The original object '3' is unaffected.
  argument = argument + 90
  print(f"\nValue inside function: {argument}")
  print(f"Memory address inside function: {id(argument)}")
  return argument

bar(my_var)

# --- Step 3: Value After Function Call ---
# 'my_var' still points to the original integer object 3.
# Its value and memory address are unchanged by the function call.
print(f"\nFinal value of my_var: {my_var}")
print(f"Final memory address (id) of my_var: {id(my_var)}")
```

 [[Code - Immutable Objects Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Common Immutable Types:** Python has several built-in types that are immutable. You don't configure their immutability; it's an inherent property.
    - **Numeric Types:** `int`, `float`, `complex`
    - **Sequence Types:** `str` (strings), `tuple`, `frozenset`
    - **Other Core Types:** `bool`, `bytes`, `NoneType`

#### Core Trade-offs

- **Advantage (Predictability & Safety):** Since the object can't change, you can pass it to functions or share it across threads without worrying about it being modified unexpectedly. This prevents a large class of bugs related to shared state.
- **Advantage (Hashability):** Immutable objects have a constant hash value for their entire lifetime. This property is essential, as it allows them to be used as keys in dictionaries or as elements in sets.
- **Disadvantage (Performance Overhead):** Every 'modification' requires creating a new object and allocating new memory. For operations involving many small changes (like building a long string by concatenating in a loop), this can be less efficient than modifying a mutable object in-place.

## Connections

```
                      (Parent)
                  Python - Objects
                           ▲
                           │
           ┌───────────────┼────────────────────────────┐
           │               │                            │
(Contrasts With)  ┌───────────────────────────┐     (Mechanism)
Mutable Objects   │    Immutable Objects      │  Pass by Assignment
                  └───────────────────────────┘
                           │
                  ┌────────┴──────────┐
                  │                     │
               Strings                Tuples
```

### Parent Concept

This concept is a fundamental aspect of [[Python - Objects]], defining one of the two major categories of how objects behave in memory.

### Child Concepts

- Common examples of immutable types include primitive [[Python - Data Types|data types]] like integers and strings, as well as the container type [[Python - Tuples]].

### Related Concepts 

- The behavior of immutable objects directly contrasts with that of [[Python - Mutable Objects]], which can be changed in-place without creating a new object.
- Understanding immutability is essential for grasping Python's [[Python - Pass by Assignment]] strategy, as it explains why passing numbers or strings to a function doesn't alter the original variable.
- The distinction between mutable and immutable types is central to the [[Python - Variable Assignment & Memory Model]], which governs how names are bound to objects in memory.
- This concept clarifies the entire mechanism of [[Python - Function Argument Passing]] for a large category of Python's built-in types.
## Questions

- You're building a data processing pipeline that constructs a large, complex configuration string from thousands of smaller pieces. Would you use standard string concatenation (`+`), which leverages immutable strings, or would you use a mutable alternative like a `list` of strings followed by `''.join()`? Justify your choice in terms of performance, memory usage, and code readability.
- Imagine a multi-threaded application where several threads need to read from a shared configuration object. Why would using an immutable object (like a tuple of settings) for this configuration be inherently safer and simpler to manage than a mutable one (like a list or dictionary), and what specific concurrency problems does it prevent?
- What if Python's `int` type were mutable? Describe a simple scenario, perhaps involving a loop counter and a function call, where this would lead to completely unexpected and disastrous bugs in a program that currently works correctly.