---
tags: 
  - core
  - python
  - mutability
  - in-place_modification
  - side_effects
  - object_state
  - pass_by_reference
  - concept
source: 
  - "[[Writing Functions in Python]]"
related: 
  - "[[Python - Immutable Objects]]"
  - "[[Python - Pass by Assignment]]"
  - "[[Python - Variable Assignment & Memory Model]]"
  - "[[Python - Function Argument Passing]]"
  - "[[Python - Lists]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Tuples]]"
  - "[[Python - Objects]]"
  - "[[Python - Data Types]]"
  - "[[Python - Scope]]"
  - "[[Python - Mutable Default Arguments Pitfall]]"
  - "[[Python - Handling Mutable Default Arguments with None]]"
  - "[[Python - List Memory Model (Reference vs. Value)]]"
  - "[[Python - List Manipulation]]"
  - "[[Python - Pass by Assignment & Memory Model Relationship]]"
---
# Core: Mutable Objects

## Summary

>A mutable object is a type of object in Python whose internal state or value can be changed after it has been created. When you pass a mutable object to a function, you are passing a reference to the original object, allowing the function to modify it directly. This behavior is a core aspect of the [[Python - Pass by Assignment & Memory Model Relationship|relationship between Python's memory model and argument passing]], and it contrasts sharply with [[Python - Immutable Objects|immutable objects]], which cannot be changed.

**Why This Matters:** Understanding mutability is crucial for preventing unexpected side effects where functions unintentionally modify data that other parts of your program rely on, which is a common source of bugs.

_Analogy:_ _Imagine you and a colleague are both working on the same physical whiteboard in an office. The whiteboard is the mutable object. If you give your colleague instructions to erase a diagram and draw a new one, the single, shared whiteboard is altered for both of you. You don't get a new copy of the whiteboard; you both see the changes on the original._

The whiteboard represents the list object in memory. Your name for the whiteboard (`my_list`) and your colleague's name for it (the function's parameter) are just two different labels pointing to the same physical object. **Where it breaks down:** This analogy doesn't fully capture the concept of creating a *copy* of the object. In the real world, you could get another whiteboard. In Python, you have to be explicit about creating a copy (e.g., `my_list.copy()`) to avoid modifying the original.

```
Before foo() call:

[Stack]                [Memory / Heap]
my_list  ───────────>  [ List Object: [1, 2, 3] ]
                       (id: 0x100)

Inside foo() call:

[Stack]                [Memory / Heap]
my_list  ───────────┐
                     ├─> [ List Object: [99, 2, 3] ]
a_list   ───────────┘    (id: 0x100)
(foo's scope)

Both variables point to the SAME object. Modifying it via 'a_list'
changes the object that 'my_list' also points to.
```

## Details

In Python, some objects, like lists and dictionaries, are "mutable," which simply means they can be changed in place after they've been created. The provided example demonstrates this perfectly: when we pass `my_list` to the `foo()` function, we aren't passing a copy of the list. Instead, we're passing a reference to the *exact same list object* in memory. Therefore, any modifications the function makes to its parameter will be reflected in the original `my_list` variable. This behavior is a direct consequence of Python's [[Python - Pass by Assignment|pass-by-assignment]] mechanism and is a fundamental aspect of the [[Python - Variable Assignment & Memory Model|Python memory model]].

#### Primary Goal

The primary goal of having mutable objects is to allow for efficient, in-place modification of data structures without the overhead of creating a new object in memory for every small change.

#### Mechanism

- **How it Works:**
    1. A variable, like `my_list`, doesn't hold the list itself but rather a reference (or pointer) to the list object's location in memory.
    2. When this variable is passed to a function, a new local variable (the function's parameter) is created, but it's assigned the *same reference*, pointing to the very same object in memory.
    3. Any operation that modifies the object through this new reference (e.g., `some_list[0] = 99`) changes the one and only object that exists.
    4. Both the original variable outside the function and the parameter inside the function will reflect this change because they both point to the same altered object.
- **Common Mutable Types:**
    - **Lists:** Ordered collections that can be appended to, sorted, or have their elements changed.
        - *Example: `my_list = [1, 2, 3]; my_list.append(4)`*
    - **Dictionaries:** Key-value pairs where you can add, remove, or change entries.
        - *Example: `my_dict = {'a': 1}; my_dict['b'] = 2`*
    - **Sets:** Unordered collections of unique items where you can add or remove elements.
        - *Example: `my_set = {1, 2}; my_set.add(3)`*

##### Code Translation

```python
# --- Step 1: Define a function that modifies a list ---
# This function takes a list and changes its first element.
def foo(a_list):
    print(f"  Inside foo(), before modification: id={id(a_list)}, value={a_list}")
    a_list[0] = 99  # Modify the object in-place
    print(f"  Inside foo(), after modification:  id={id(a_list)}, value={a_list}")

# --- Step 2: Create a list and pass it to the function ---
# 'my_list' is a variable that holds a reference to the list object.
my_list = [1, 2, 3]
print(f"Outside foo(), before call:       id={id(my_list)}, value={my_list}")

# Pass the reference to the list object to the function.
foo(my_list)

# --- Step 3: Observe the change in the original list ---
# The original 'my_list' is changed because the function modified the
# object that 'my_list' refers to.
print(f"Outside foo(), after call:        id={id(my_list)}, value={my_list}")

# Expected Output:
# Outside foo(), before call:       id=..., value=[1, 2, 3]
#   Inside foo(), before modification: id=..., value=[1, 2, 3]
#   Inside foo(), after modification:  id=..., value=[99, 2, 3]
# Outside foo(), after call:        id=..., value=[99, 2, 3]
# Note: The id will be the same in all print statements.
```

 [[Code - Mutable Objects Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Inherent Property:** Mutability is not a parameter you can tune. It is an intrinsic characteristic of a Python data type. You choose the data type (e.g., list vs. tuple) based on whether you need its contents to be changeable.

#### Core Trade-offs

- **Advantage - Efficiency:** Modifying large data structures in-place is much more memory and computationally efficient than creating a brand new copy with each change.
- **Advantage - Flexibility:** Allows for dynamic data structures that can grow, shrink, and change over time, which is essential for many algorithms.
- **Disadvantage - Unintended Side Effects:** The most significant drawback. A function can modify an object passed to it, leading to unexpected behavior in other parts of the code that use the same object. This is a common source of bugs, especially for beginners. A classic example is the [[Python - Mutable Default Arguments Pitfall|pitfall of using mutable default arguments]].
- **Disadvantage - Concurrency Issues:** When multiple threads or processes share and modify the same mutable object, it can lead to race conditions and corrupted data unless proper locking mechanisms are used.

## Connections

```
                      (Parent)
                       Objects
                         ▲
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                    │
(Contrasts With) ┌───────────────┐ (Mechanism)
Immutable Objects│ Mutable Objects │ Pass by Assignment
                 └───────────────┘
                        │
             ┌──────────┴──────────┐
             │                     │
           Lists              Dictionaries
```

### Parent Concept

Mutability is a fundamental characteristic of [[Python - Objects|Python objects]], which determines whether their state can be altered after creation.

### Child Concepts

- A primary example is the [[Python - Lists|list]], an ordered collection whose elements can be changed, added, or removed.
- Another key example is the [[Python - Dictionaries|dictionary]], a key-value store that allows for the in-place modification of its entries.

### Related Concepts 

- This concept directly contrasts with [[Python - Immutable Objects|immutable objects]], which cannot be changed after they are created.
- The behavior of mutable objects in function calls is a direct result of Python's [[Python - Pass by Assignment|pass-by-assignment]] strategy.
- Understanding the difference between mutable and immutable types is critical to grasping the [[Python - Variable Assignment & Memory Model|Python variable assignment and memory model]].
- A notorious bug related to this concept is the [[Python - Mutable Default Arguments Pitfall|mutable default argument pitfall]], where a default list or dictionary in a function definition persists across calls.
## Questions

- Your team is building a data processing pipeline where performance is critical. One function needs to modify a large DataFrame. Would you design the function to modify the DataFrame in-place (mutably) or to return a new, modified copy (immutably)? Justify your choice by explaining the trade-off between memory efficiency and the risk of introducing hard-to-debug side effects downstream.
- Imagine a multi-threaded application where several worker threads need to read from and occasionally write to a shared configuration dictionary. How would you manage access to this mutable object to prevent race conditions and ensure data integrity, and what Python libraries would you use?
- What if Python's lists were immutable by default, like tuples? How would this fundamental change impact common programming patterns like building a list in a loop, sorting, and algorithms that rely on in-place modification like quicksort? What new patterns or helper functions would become essential?