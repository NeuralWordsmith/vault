---
tags:
  - core
  - python
  - pass_by_object_reference
  - mutability
  - side_effects
  - memory_model
  - function_arguments
  - concept
source:
  - "[[Writing Functions in Python]]"
related:
  - "[[Python - Function Argument Passing]]"
  - "[[Python 5 - Mutable vs Immutable Objects]]"
  - "[[Python - Variable Assignment & Memory Model]]"
  - "[[Python - Mutable Objects]]"
  - "[[Python - Immutable Objects]]"
  - "[[Python - Pass by Assignment & Memory Model Relationship]]"
  - "[[Python - Mutable Default Arguments Pitfall]]"
  - "[[Python - Handling Mutable Default Arguments with None]]"
  - "[[Python - Functions]]"
  - "[[Python - Scope]]"
  - "[[Python - Lists]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - List Memory Model (Reference vs. Value)]]"
  - "[[Python - Objects]]"
  - "[[Fundamental - Programming]]"
---
# Core: Pass by Assignment

## Summary

>Python's "pass by assignment" means that when you pass a variable to a function, you are actually passing a *copy of the reference* to the object, not the object itself. This behavior is sometimes described as "pass by object reference," and its effects depend heavily on whether the object is mutable or immutable. This is a core mechanism within the broader topic of [[Python - Function Argument Passing]].

**Why This Matters:** Understanding pass by assignment is crucial for preventing subtle but critical bugs where functions unexpectedly modify data structures you thought were safe.

_Analogy:_ _Imagine you have a GPS coordinate for a specific treasure chest written on a piece of paper. Giving a function this piece of paper is like "pass by assignment". The function gets a *copy* of the paper with the same coordinate. It can't change the original piece of paper in your hand, but it can use its copy of the coordinate to go to the treasure chest and change its contents (if the chest is unlocked, i.e., mutable)._

• **GPS Coordinate:** The memory address (reference) of the object.
• **Piece of Paper:** The variable holding the reference.
• **Copy of the Paper:** The function's local parameter, which gets a copy of the reference.
• **Treasure Chest:** The actual object in memory.
• **Changing Chest Contents:** Modifying a mutable object.
• **Where it breaks down:** The analogy doesn't fully capture the concept of rebinding a name within the function. If the function gets the coordinate and then decides to write a *new* coordinate on its copy of the paper, it doesn't affect your original paper or the original treasure chest's location at all.

```
Before Call:
[caller_variable] ────► [Object in Memory]

During Call:
[caller_variable] ────► [Object in Memory]
                           ▲
                           │
                    [function_parameter] (gets a copy of the reference)
```

## Details

In Python, the way information is passed to functions can be confusing. It's not strictly "pass by value" (where a copy of the data is made) nor "pass by reference" (where the function gets direct access to the original variable). Instead, Python uses a mechanism called "pass by assignment". This means the function parameter becomes a new name (or alias) that points to the very same object the original variable was pointing to. The consequences of this are deeply tied to the distinction between [[Python 5 - Mutable vs Immutable Objects]].

#### Primary Goal

To provide an efficient way to pass data to functions without the overhead of copying large objects, while maintaining a clear and consistent assignment model.

#### Mechanism

- **How it Works:**
    1. When a function is called, a new local variable (the parameter) is created within the function's scope.
    2. This new local variable is then *assigned* the object that the argument was referencing. It's the same as doing `parameter = argument`.
    3. The function now has its own reference to the original object.
- **Behavior with Immutable Objects:**
    - If you pass an immutable object (like a number, string, or tuple), the function cannot change the original object.
    - *Example:* If you pass the number `5`, any operation inside the function that seems to change it (e.g., `x = x + 1`) actually creates a *new* number object (`6`) and rebinds the local parameter `x` to this new object. The original variable outside the function is completely unaffected. This is a core aspect of [[Python - Immutable Objects]].
- **Behavior with Mutable Objects:**
    - If you pass a mutable object (like a list or dictionary), the function can modify the contents of the original object through its reference.
    - *Example:* If you pass a list `my_list` and the function calls `my_list.append(10)`, the change is made to the *original* object, and it will be visible outside the function. This is because both the original variable and the function parameter point to the same list object in memory, as explained in [[Python - Mutable Objects]].

##### Code Translation

```python
# --- How it Works ---
def modify_data(some_list, some_string):
    print(f"  Inside function (start): some_list ID: {id(some_list)}, some_string ID: {id(some_string)}")

    # --- Behavior with Mutable Objects ---
    # This modifies the *original* list object
    some_list.append(100)

    # --- Behavior with Immutable Objects ---
    # This creates a *new* string object and rebinds the local name 'some_string'
    some_string = some_string + " world"

    print(f"  Inside function (end):   some_list ID: {id(some_list)}, some_string ID: {id(some_string)}")
    return some_string

# --- Setup ---
my_list = [1, 2, 3]
my_string = "hello"

print(f"Outside function (before): my_list ID: {id(my_list)}, my_string ID: {id(my_string)}")
print(f"Original list: {my_list}, Original string: {my_string}\n")

# --- Function Call ---
new_string = modify_data(my_list, my_string)

print(f"\nOutside function (after):  my_list ID: {id(my_list)}, my_string ID: {id(my_string)}")
print(f"Modified list: {my_list}, Original string: {my_string}")
print(f"Returned string: {new_string}")
```

 [[Code - Pass by Assignment Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- The primary "lever" controlling the behavior of pass by assignment is not a parameter you set, but rather the nature of the object being passed.
    - **Object Mutability:** The key factor is whether the object is mutable or immutable.
        - Passing a [[Python - Mutable Objects|mutable object]] (like a list) allows the function to modify the original object's state, leading to side effects.
        - Passing an [[Python - Immutable Objects|immutable object]] (like a string or integer) prevents the function from altering the original object, ensuring data integrity outside the function's scope.

#### Core Trade-offs

- **Pro: Efficiency**
    - It avoids making expensive copies of large data structures (like long lists or complex dictionaries) when passing them to functions. Only the reference (a small pointer) is copied.
- **Con: Potential for Unintended Side Effects**
    - If a function modifies a mutable object passed to it, the change affects the object everywhere it is referenced in the program. This can lead to subtle, hard-to-debug bugs if the caller does not expect the object to be changed. This is famously seen in the [[Python - Mutable Default Arguments Pitfall|pitfall of using mutable default arguments]].
- **Con: Conceptual Confusion**
    - The term itself and its behavior can be confusing for programmers coming from languages with clear "pass by value" or "pass by reference" semantics. Understanding the underlying [[Python - Variable Assignment & Memory Model|memory model]] is essential.

## Connections

```
                  (Parent)
        Function Argument Passing
                   ▲
                   │
┌──────────────────┼──────────────────┐
│                  │                  │
(Relates to)    ┌──────────────────────┐   (Relates to)
Memory Model    │ Pass by Assignment   │   Mutability
                └──────────────────────┘
                       │
                       ▼
             (Governs Behavior Of)
         Mutable & Immutable Objects
```

### Parent Concept

This concept is a specific implementation of the broader topic of [[Python - Function Argument Passing]], defining exactly how Python handles data transfer into functions.

### Child Concepts



### Related Concepts 

- The behavior of pass by assignment is fundamentally determined by the [[Python 5 - Mutable vs Immutable Objects|distinction between mutable and immutable objects]].
- To truly grasp this concept, one must understand the [[Python - Variable Assignment & Memory Model|variable assignment and memory model]], which explains how names are bound to objects.
- A critical real-world consequence of this mechanism is the [[Python - Mutable Default Arguments Pitfall|mutable default argument pitfall]], which can cause unexpected behavior across function calls.
- This concept is the direct link between how functions receive data and the underlying [[Python - Pass by Assignment & Memory Model Relationship|relationship with the memory model]].
## Questions

- Your team is building a data processing pipeline where performance is critical. A junior developer suggests passing a large Pandas DataFrame to every function, which then modifies it in-place to save memory. What are the long-term risks of this design, and how would you explain the trade-off between memory efficiency and code maintainability/predictability to them in the context of business goals like reducing bug-fix time?
- Imagine a multi-threaded application where several threads call the same function, passing it a reference to a shared, mutable dictionary. How would you design a system to prevent race conditions and ensure data integrity, given Python's pass-by-assignment model? What specific synchronization primitives would you use and why?
- What if Python were to switch from 'pass by assignment' to a strict 'pass by value' model for all data types, like some other languages? What immediate benefits would this provide in terms of code safety, and what catastrophic performance implications would it have on scientific computing and data analysis libraries like NumPy and Pandas?