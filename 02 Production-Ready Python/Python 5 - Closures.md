---
tags: 
  - major_core
  - python
  - stateful_functions
  - nonlocal_variables
  - lexical_scoping
  - decorators
  - function_factories
  - concept
source: 
  - "[[Writing Functions in Python]]"
related: 
  - "[[Python - Nested Functions]]"
  - "[[Python - Scope]]"
  - "[[Python - Nonlocal Variables]]"
  - "[[Python - Decorators & Closures Relationship]]"
  - "[[Python - Functions]]"
  - "[[Python - Generator Functions]]"
  - "[[Python - First-Class Functions]]"
  - "[[Python - Closure Value Persistence]]"
  - "[[Python - Closure Attribute (__closure__)]]"
  - "[[Python - Basic Closure with foo() and bar()]]"
  - "[[Fundamental - Programming]]"
  - "[[Python - Lambda Functions]]"
  - "[[Python - Objects]]"
  - "[[Python - Parent and Child Functions]]"
---
# Major Core: Closures

## Summary

> A closure is a function object that remembers and has access to variables from its enclosing scope, even after the outer function has finished executing. It's Python's way of "bundling" a function with its required "free variables" (variables that are not defined locally but are used by it), allowing it to operate correctly when called outside its parent's scope. This is a crucial concept for understanding the [[Python - Decorators & Closures Relationship|relationship between decorators and closures]].

**Why This Matters:** Closures enable stateful functions and are the foundational mechanism behind powerful tools like decorators, allowing for cleaner, more modular, and reusable code.

_Analogy:_ _Imagine a traveler (the inner function) who is about to go on a journey. Before they leave, their parent (the outer function) packs a special backpack for them. This backpack contains specific tools and supplies (the nonlocal variables) that the traveler will need later on. Even after the traveler has left home and the parent is no longer around, the traveler still has the backpack and can use the tools inside whenever they need them._

  * **Traveler:** The inner function that is returned.
  * **Parent:** The outer, enclosing function.
  * **Backpack:** The closure itself, the mechanism that binds the variables.
  * **Tools & Supplies:** The nonlocal variables (`value`, `my_dict`, `arg_1` in the example) that are "closed over".
  * **Journey:** Calling the returned inner function outside of its original scope.
  * **Where it breaks down:** A real backpack's contents are static. In Python closures, if the enclosed variable is a mutable object (like a list), changes made by the inner function will persist across calls, as seen in [[Python - Closure Value Persistence|how closure values persist]]. This is more like a magical backpack where using a tool can change its state for the next time you use it.

```
Execution of parent(3, 4):
+---------------------------------+
| parent() Scope                  |
|   arg_1 = 3                     |
|   arg_2 = 4                     |
|   value = 22                    |
|   my_dict = {'...'}             |
|                                 |
|   +-------------------------+   |
|   | def child():            |   |
|   |   uses value, my_dict,  |   |
|   |   arg_1, arg_2          |   |
|   +-------------------------+   |
|                                 |
|   return child ----------------------> [child function object]
+---------------------------------+       |
                                          |
parent() scope is now gone.               |
                                          |
new_function = [child function object] ---+--- [Closure "Backpack"]
                                              |  - cell for arg_1 (3)
                                              |  - cell for arg_2 (4)
                                              |  - cell for value (22)
                                              |  - cell for my_dict ({...})
```

## Details

A closure is a core concept in Python that allows a nested function (the "child") to remember the environment in which it was created. As the context states, it's Python's way of attaching nonlocal variables to a returned function. This means that even when the outer "parent" function has completed its execution and its local variables should have been destroyed, the inner function, if returned, carries a reference to those variables. This mechanism is fundamental to creating functions with persistent state and is the backbone of decorators.

#### Primary Goal

To allow a function to retain access to the state of its enclosing scope, enabling it to operate correctly even when executed in a different context.

#### Mechanism

- **Step 1: Define Parent and Child Functions**
    - Create an outer function that accepts arguments and defines its own local variables. Inside this parent, define a nested, inner function.
- **Step 2: Reference Enclosing Scope**
    - The inner (child) function must reference one or more variables from the outer (parent) function's scope. These are called "free variables".
- **Step 3: Return the Child Function**
    - The parent function returns the child function object itself, *without executing it* (e.g., `return child`, not `return child()`).
- **Step 4: Create the Closure**
    - When the parent function is called, Python executes it and sees that the returned inner function needs variables from the parent's scope. It then packages, or "closes over," these variables along with the inner function, creating the closure.
- **Step 5: Execute the Closure**
    - The variable assigned the result of the parent function call now holds the closure. This new function can be called at any time, and it will still have access to the original variables from its parent's scope, even though the parent has finished executing.

```python
# --- Step 1 & 2: Define Parent and Child Functions, and Reference Scope ---
def parent(arg_1, arg_2):
    # These are the nonlocal variables the child will "remember"
    value = 22
    my_dict = {'chocolate': 'yummy'}

    def child():
        # The child function uses variables from the parent's scope
        print(2 * value)
        print(my_dict['chocolate'])
        print(arg_1 + arg_2)

    # --- Step 3: Return the Child Function Object ---
    return child

# --- Step 4: Create the Closure by calling the parent ---
# new_function is now the 'child' function bundled with its nonlocal variables
new_function = parent(3, 4)

# --- Step 5: Execute the Closure ---
# Even though parent() has finished, new_function remembers value, my_dict, etc.
new_function()
# Expected output:
# 44
# yummy
# 7

# We can inspect the closure's contents using the __closure__ attribute
# This shows the cell objects containing the remembered variables
print([cell.cell_contents for cell in new_function.__closure__])
# Expected output:
# [3, 4, 22, {'chocolate': 'yummy'}]
```

 [[Code - Closures Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Enclosing Scope**
    - The scope of the outer function that contains the variables to be "closed over". This environment is what the closure "remembers".
- **Nested Function**
    - The inner function that references variables from the enclosing scope. This function object is what gets returned and becomes the closure.
- **Free Variables**
    - The variables that are not defined in the inner function's local scope but are used by it. These are the variables that get "captured" in the closure.

#### Core Trade-offs

- **Pro (State Retention)**
    - Closures provide a clean way to create functions that maintain state between calls, avoiding the need for global variables or more complex class structures. This is demonstrated in [[Python - Closure Value Persistence|how closure values persist]].
- **Pro (Data Encapsulation)**
    - They can be used to hide data. The nonlocal variables are not directly accessible from the outside world, only through the returned function, providing a form of encapsulation.
- **Con (Memory Usage)**
    - Because the closure holds references to the enclosing scope's variables, those objects are kept in memory as long as the closure exists. If the closed-over variables are large, this can lead to higher memory consumption than a stateless function.
- **Con (Readability)**
    - For developers unfamiliar with the concept, closures can be harder to reason about than simple functions or classes, potentially making code less readable at first glance.

## Connections

```
                  (Parent)
             Nested Functions
                     ▲
                     │
┌────────────────────┼────────────────────┐
│                    │                    │
(Mechanism For) ┌────────────────┐      (Uses)
 Decorators     │    Closures    │   Nonlocal Variables
                └────────────────┘
                         │
              ┌──────────┴──────────┐
              │                     │
    Closure Value      Closure Attribute
     Persistence       (__closure__)
```

### Parent Concept

Closures are a direct application of [[Python - Nested Functions|nested functions]], where an inner function is defined within the scope of an outer function.

### Child Concepts

- A key behavior enabled by closures is [[Python - Closure Value Persistence|closure value persistence]], where changes to mutable nonlocal variables are remembered across multiple calls to the inner function.
- The internal mechanism can be inspected via the [[Python - Closure Attribute (__closure__)|__closure__ attribute]], which reveals the cell objects holding the captured variables.

### Related Concepts 

- Closures are the fundamental mechanism that makes the elegant syntax of the [[Python - Decorators & Closures Relationship|decorator pattern]] possible in Python.
- The concept of a closure is tightly bound to [[Python - Scope|scoping rules]], particularly how Python looks for variables in enclosing scopes.
- To modify a closed-over variable that is not a mutable object, one must explicitly use [[Python - Nonlocal Variables|nonlocal variables]] with the `nonlocal` keyword.
- The relationship between the outer and inner functions is a classic example of [[Python - Parent and Child Functions|parent and child functions]].
## Questions

- You're designing a data processing pipeline. You could use a class with methods to maintain state (e.g., a running average), or you could use a closure. When would the closure be a better choice, and how would you justify the potential decrease in readability for a junior developer in favor of its functional programming benefits?
- If you have a web application that generates thousands of unique closures per second for user requests (e.g., custom validation functions), what potential memory management issues or performance bottlenecks would you anticipate, and how would you design a system to mitigate them?
- What if Python did not have closures? How would you replicate the functionality of a decorator that needs to accept arguments, and what would be the major drawbacks of your alternative implementation?
