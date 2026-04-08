---
tags: 
  - core
  - python
  - closures
  - nested_functions
  - scope
  - state_management
  - variable_binding
  - concept
source: 
  - "[[Writing Functions in Python]]"
related: 
  - "[[Python - Scope]]"
  - "[[Python - Nested Functions]]"
  - "[[Python - Scope Resolution (LEGB Rule)]]"
  - "[[Python 5 - global Keyword]]"
  - "[[Python - Nonlocal Scope]]"
  - "[[Python - Nested Functions & Nonlocal Scope Relationship]]"
  - "[[Python - Functions]]"
  - "[[Python - Variables]]"
  - "[[Python - Closures]]"
  - "[[Python - Decorators]]"
  - "[[Python 5 - Local Scope]]"
  - "[[Python 5 - Global Scope]]"
  - "[[Python 5 - Built-in Scope]]"
  - "[[Python - Generator Functions]]"
---
# Core: nonlocal Keyword

## Summary

>The `nonlocal` keyword is a declaration used inside a nested function to indicate that a variable being modified refers to a variable in the nearest enclosing (parent) function's scope. It prevents Python from creating a new local variable, allowing the inner function to directly alter the state of its parent.

**Why This Matters:** The `nonlocal` keyword enables stateful behavior in nested functions, which is crucial for creating complex closures and decorators without polluting the global scope.

_Analogy:_ _Imagine a junior employee (nested function) needs to update a project whiteboard (nonlocal variable) that belongs to their direct manager (enclosing function). The `nonlocal` keyword is like the junior employee announcing, "I am now writing on the manager's whiteboard." Without this declaration, the employee would just start writing on their own personal notepad (a new local variable), and any changes they make would be invisible to the manager and the rest of the team._

The manager's project whiteboard is the `nonlocal` variable. The junior employee is the `nested function`. The manager is the `enclosing function`. The employee's personal notepad is a `local variable`. The explicit declaration is the `nonlocal` keyword.

**Where it breaks down:** In the analogy, the declaration sounds like a request for permission. In Python, `nonlocal` is a direct statement of intent by the inner function; it doesn't ask for permission but rather tells the interpreter how to resolve the variable's scope.

```
Global Scope
+-------------------------------------------------+
|                                                 |
|  Enclosing Function Scope (`make_counter`)      |
|  +-------------------------------------------+  |
|  |  count = 0                                |  |
|  |                                           |  |
|  |  Nested Function Scope (`increment`)      |  |
|  |  +-------------------------------------+  |  |
|  |  | nonlocal count                      |  |  |
|  |  | count += 1  <------ Modifies this   |  |  |
|  |  +----------------------^------------+  |  |
|  +-------------------------|----------------+  |
+-------------------------------------------------+
```

## Details

When working with [[Python - Nested Functions|nested functions]], Python's default behavior is to treat any variable assignment as the creation of a new variable in the local scope. The `nonlocal` keyword provides a way to override this default. It explicitly tells Python to look for the variable in the parent function's scope and modify it there. This mechanism is fundamental for creating closures that can remember and change their state over time. It is functionally similar to the `[[Python 5 - global Keyword|global keyword]]`, but its reach is limited to the enclosing function's scope, not the entire module's global scope.

#### Primary Goal

To allow a nested function to modify a variable that exists in its immediate enclosing (parent) function's scope.

#### Mechanism

- **Step 1: Define the Enclosing Function and Variable**
    - Create an outer function and initialize a variable within its local scope. This variable will become the target 'nonlocal' variable.
- **Step 2: Define the Nested Function**
    - Inside the outer function, define an inner function that will be responsible for modifying the state.
- **Step 3: Declare the Variable as Nonlocal**
    - Within the inner function, before any modification, use the `nonlocal` keyword followed by the variable name. This signals your intent to modify the outer function's variable.
- **Step 4: Modify the Variable**
    - Perform an assignment or modification operation on the variable inside the inner function. This change will now affect the variable in the parent's scope.
- **Step 5: Execute the Functions**
    - The outer function must return or call the inner function for the modification to occur. This pattern is common in function factories and decorators.

##### Code Translation

```python
# --- Step 1: Define the Enclosing Function and Variable ---
def make_counter():
    count = 0  # This is the variable in the enclosing scope

    # --- Step 2: Define the Nested Function ---
    def increment():
        # --- Step 3: Declare the Variable as Nonlocal ---
        nonlocal count

        # --- Step 4: Modify the Variable ---
        count += 1
        return count

    return increment

# --- Step 5: Execute the Functions ---
counter_one = make_counter()

# Each call modifies the *same* 'count' variable from its parent scope
print(counter_one())  # Output: 1
print(counter_one())  # Output: 2
print(counter_one())  # Output: 3

# Creating a new counter creates a new, independent scope and 'count' variable
counter_two = make_counter()
print(counter_two()) # Output: 1
```

 [[Code - nonlocal Keyword Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Syntax**
    - The keyword is used as a statement: `nonlocal variable_name`.
- **Placement**
    - It must be declared at the top of the nested function's body, before the variable is used for assignment.
- **Scope Target**
    - It only searches for the variable in the *nearest* enclosing function scopes. It will not skip a level to find a variable further up a chain of nested functions, nor will it ever target the global scope.

#### Core Trade-offs

- **Pro: Clean State Management**
    - It is the canonical way to create closures and decorators that need to maintain state between calls, avoiding the need for global variables or passing mutable objects.
- **Con: Increased Complexity**
    - It can make code harder to reason about because the inner function's behavior is no longer self-contained; it directly depends on and alters the state of its parent. This can violate the principle of functional purity.
- **Con: Potential for Bugs**
    - If not used carefully, `nonlocal` can lead to subtle bugs where state is modified unexpectedly, making debugging more difficult than with functions that have no side effects.

## Connections

```
                      (Parent)
                 Python - Scope
                         ▲
                         │
         ┌───────────────┼───────────────────────────┐
         │               │                           │
(Manages Scope) ┌──────────────────┐          (Contrasts With)
Nonlocal Scope  │ nonlocal Keyword │          global Keyword
                └──────────────────┘
                         │
              ┌──────────┴───────────┐
              │                      │
(Used Within) Nested Functions     (Enables) Closures
```

### Parent Concept

The `nonlocal` keyword is a tool for managing variable lookups within the broader context of [[Python - Scope]].

### Child Concepts



### Related Concepts 

- It directly manages the `[[Python - Nonlocal Scope|nonlocal scope]]`, which is a key part of Python's name resolution process.
- It serves a similar purpose to the `[[Python 5 - global Keyword|global keyword]]`, but targets the enclosing function's scope instead of the module's global scope.
- The existence of the `nonlocal` keyword is fundamentally tied to the `[[Python - Nested Functions & Nonlocal Scope Relationship|relationship between nested functions and nonlocal scope]]`, as it solves the problem of modifying state in the parent from the child.
- Understanding `nonlocal` is essential for correctly interpreting the `[[Python - Scope Resolution (LEGB Rule)|LEGB rule]]`, as it provides an explicit way to bypass the creation of a new local variable.
## Questions

- You're designing a data processing pipeline where each step is a function. You could use `nonlocal` to create a stateful counter within a factory function to track processed items, or you could pass a mutable object (like a dictionary) through each function. What are the trade-offs, and how would you decide which approach is better for long-term maintainability and debugging?
- Imagine a web application using a decorator with a `nonlocal` variable for caching. In a multi-threaded environment, what race conditions could arise from multiple threads accessing and modifying this `nonlocal` cache variable simultaneously, and what synchronization mechanisms (like locks) would you need to implement to make it thread-safe?
- What if the `nonlocal` keyword didn't exist? How would you replicate its behavior of modifying an outer function's state from an inner function using only mutable data types like lists or dictionaries? What would be the primary disadvantage of this workaround?