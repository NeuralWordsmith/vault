---
tags: 
  - core
  - python
  - closures
  - nested_functions
  - scope_resolution
  - enclosing_scope
  - legb
  - concept
source: 
  - "[[Writing Functions in Python]]"
related: 
  - "[[Python - Scope]]"
  - "[[Python - Scope Resolution (LEGB Rule)]]"
  - "[[Python - Nested Functions]]"
  - "[[Python 5 - nonlocal Keyword]]"
  - "[[Python 5 - global Keyword]]"
  - "[[Python 5 - Local Scope]]"
  - "[[Python 5 - Global Scope]]"
  - "[[Python 5 - Built-in Scope]]"
  - "[[Python - Functions]]"
  - "[[Python - Closures]]"
  - "[[Python - Decorators]]"
  - "[[Python - Variables]]"
  - "[[Python - Nested Functions & Nonlocal Scope Relationship]]"
---
# Core: Nonlocal Scope

## Summary

>In Python, when functions are nested, the nonlocal scope (also known as the enclosing scope) refers to the variables of the outer function. When resolving a variable name, Python checks this scope after the inner function's local scope but before the global scope. It is the 'E' in the [[Python - Scope Resolution (LEGB Rule)|LEGB rule]].

**Why This Matters:** Nonlocal scope enables the creation of powerful patterns like closures and decorators, allowing inner functions to maintain and modify state from their containing function without polluting the global namespace.

_Analogy:_ _Imagine a master craftsperson (the outer function) working in a private workshop. They hire an apprentice (the inner function) who works at a small desk inside that same workshop. The apprentice's desk is their 'local scope'. The shared tools on the workshop walls are the 'nonlocal scope'. If the apprentice needs a tool, they first check their own desk. If it's not there, they can grab one from the workshop wall. If the tool isn't in the workshop, they'd have to go to the public hardware store ('global scope'). To change a tool on the wall (e.g., sharpen a chisel), the apprentice must get permission from the master (using the `nonlocal` keyword)._

The apprentice (inner function) can see and use all the tools in the workshop (nonlocal scope). To modify a workshop tool, they need explicit permission (`nonlocal`).

*   **Where it breaks down:** The analogy implies the apprentice could bring a new tool and place it on the workshop wall. In Python, an inner function cannot create a *new* variable in the nonlocal scope; it can only read or modify *existing* ones.

```
+-------------------------------- Global Scope ---------------------------------+
|                                                                               |
|  def outer_function():                                                        |
|    +--------------------------- Nonlocal Scope ---------------------------+   |
|    |  count = 0                                                          |   |
|    |                                                                     |   |
|    |    def inner_function():                                            |   |
|    |      +-------------------- Local Scope --------------------+        |   |
|    |      |  nonlocal count  # Declaration to modify          |        |   |
|    |      |  count += 1      # Modifies the nonlocal 'count'    |        |   |
|    |      +-----------------------------------------------------+        |   |
|    |                                                                     |   |
|    +--------------------------------------------------------------------+   |
|                                                                               |
+-------------------------------------------------------------------------------+
```

## Details

When you define a function inside another, a special relationship is created. The inner function gains access to the variables of the outer function. This intermediate layer of variable access, which is neither the inner function's private [[Python 5 - Local Scope|local scope]] nor the program's public [[Python 5 - Global Scope|global scope]], is called the nonlocal scope. This mechanism is fundamental to Python's variable lookup process, formally known as the [[Python - Scope Resolution (LEGB Rule)|LEGB rule]], and is the foundation for advanced features like closures and decorators.

#### Primary Goal

To allow nested functions to read and modify variables from their immediate enclosing function's scope, enabling state to be encapsulated without resorting to global variables or classes.

#### Mechanism

- **How it Works:** When a variable is referenced inside a nested function, Python's interpreter searches for it in a specific order:
    1.  **Local (L):** The interpreter first checks if the variable was defined within the current (inner) function.
    2.  **Enclosing/Nonlocal (E):** If not found locally, it checks the scope of the enclosing (outer) function. This continues outwards if there are multiple levels of nesting.
    3.  **Global (G):** If not found in any enclosing scopes, it checks the module-level (global) scope.
    4.  **Built-in (B):** Finally, it checks the names of Python's built-in functions and types.
- **Read Access (Implicit):**
    - An inner function can automatically read or access the value of a variable in its nonlocal scope without any special keyword.
- **Write/Modify Access (Explicit):**
    - To reassign or modify a variable from the nonlocal scope, you MUST explicitly declare your intent using the `[[Python 5 - nonlocal Keyword|nonlocal keyword]]`.
    - If you try to assign a value to a variable with the same name as a nonlocal variable *without* the `nonlocal` keyword, Python will simply create a new, separate variable in the inner function's local scope, shadowing the outer one.

##### Code Translation

```python
# --- Example of Nonlocal Scope ---
def outer_function():
    # This is the nonlocal scope for inner_function
    count = 0

    def inner_function():
        # To MODIFY the 'count' from the outer scope, we must declare it as nonlocal
        nonlocal count
        
        # --- Step 1: Modify the nonlocal variable ---
        count += 1
        print(f"Inner call: count is now {count}")

    return inner_function

# --- Step 2: Create a closure ---
# 'counter' is now the inner_function, but it still remembers its nonlocal scope where 'count' lives.
counter = outer_function()

# --- Step 3: Call the inner function multiple times ---
counter() # Output: Inner call: count is now 1
counter() # Output: Inner call: count is now 2
counter() # Output: Inner call: count is now 3
```

 [[Code - Nonlocal Scope Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **The `nonlocal` Keyword:**
    - This is the primary control mechanism for interacting with the nonlocal scope. It signals to Python that when you assign a value to a variable, you intend to modify the variable in the nearest enclosing scope, not create a new local one.
    - It can only be used inside nested functions and only for variables that already exist in an outer scope (but not the global scope).

#### Core Trade-offs

- **Advantage: Encapsulation and State Preservation:**
    - Nonlocal scope is the engine behind closures, allowing functions to 'remember' the environment in which they were created. This is perfect for creating simple stateful objects like counters or caches without the full boilerplate of a class.
    - It helps avoid polluting the [[Python 5 - Global Scope|global scope]] with variables that are only needed by a small, related group of functions.
- **Disadvantage: Increased Complexity:**
    - Overuse of `nonlocal` and deeply nested functions can make code harder to read and debug. It can become unclear where a variable's state is being managed.
    - It can be easily confused with the `[[Python 5 - global Keyword|global keyword]]`, which modifies variables at the module level, leading to subtle bugs if used incorrectly.

## Connections

```
                    (Parent)
                     Scope
                       ▲
                       │
┌──────────────────────┼──────────────────────┐
│                      │                      │
(Related)       ┌──────────────────┐        (Related)
Nested Functions  │  Nonlocal Scope  │        LEGB Rule
                  └──────────────────┘
                       │
                       ▼
                 (Mechanism)
               nonlocal Keyword
```

### Parent Concept

Nonlocal scope is a specific type of [[Python - Scope|scope]] within Python's variable resolution hierarchy.

### Child Concepts

- The primary mechanism for modifying variables in this scope is the [[Python 5 - nonlocal Keyword|nonlocal keyword]].

### Related Concepts 

- The concept of nonlocal scope is a direct consequence of using [[Python - Nested Functions|nested functions]], where one function is defined inside another.
- It represents the 'E' (Enclosing) in the [[Python - Scope Resolution (LEGB Rule)|LEGB scope resolution rule]], sitting between Local and Global.
- It provides a more encapsulated alternative to using the [[Python 5 - global Keyword|global keyword]] for maintaining state between function calls.
- It contrasts directly with [[Python 5 - Local Scope|local scope]], which is private to a single function's execution, and [[Python 5 - Global Scope|global scope]], which is accessible throughout a module.
## Questions

- You're designing a complex data processing pipeline where multiple steps need to maintain state (e.g., a running count of processed items). Would you use a class with instance variables or a factory function using closures and nonlocal variables to manage this state? Justify your choice based on readability, testability, and the expected complexity of the state.
- If you have a deeply nested function (e.g., 4 or 5 levels deep), how does Python's interpreter efficiently resolve a `nonlocal` variable? What potential performance implications, if any, might arise in performance-critical code compared to accessing a local variable or an object attribute?
- What if Python did not have the `nonlocal` keyword? How would you replicate the behavior of a closure that needs to modify its parent's state? What design patterns would become more common, and what would be the downsides of those alternatives?