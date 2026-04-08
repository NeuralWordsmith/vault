---
tags:
  - core
  - python
  - scope
  - nested_functions
  - closures
  - lexical_scoping
  - enclosing_scope
  - concept
source:
  - "[[Writing Functions in Python]]"
related:
  - "[[Python - Scope]]"
  - "[[Python - Nested Functions]]"
  - "[[Python 5 - Closures]]"
  - "[[Python - Functions]]"
  - "[[Python - Variables]]"
  - "[[Python - Decorators & Closures Relationship]]"
  - "[[Python - Closure Value Persistence]]"
  - "[[Python - Generator Functions]]"
  - "[[Python - Lambda Functions]]"
  - "[[Python - global Keyword]]"
  - "[[Fundamental - Programming]]"
  - "[[Python - Closure Attribute (__closure__)]]"
  - "[[Python - Basic Closure with foo() and bar()]]"
  - "[[Python - Parent and Child Functions]]"
---
# Core: Nonlocal Variables

## Summary

>A nonlocal variable is any variable defined in the scope of a [[Python - Parent and Child Functions|parent (or enclosing) function]] that is accessed by a child (or nested) function. This allows the inner function to 'remember' the state of its creation environment, a key feature that underpins [[Python 5 - Closures|closures]].

**Why This Matters:** Nonlocal variables are the fundamental mechanism that allows inner functions to remember and interact with their enclosing environment, enabling powerful programming patterns like closures and decorators.

_Analogy:_ _Think of a family recipe book. The parent function is the grandparent who writes down the recipes (variables) in the book. The child function is the grandchild who inherits the book. The grandchild can read any recipe (access nonlocal variables) from the book to cook a meal, even if the grandparent isn't in the kitchen anymore. The recipes are 'nonlocal' to the grandchild's immediate kitchen but are part of their inherited culinary knowledge._

The grandchild can read the recipes, but to *change* a recipe in the original book (modify a nonlocal variable), they need special permission (the `nonlocal` keyword). Without it, they'd just be making a temporary note on a separate piece of paper (creating a new local variable). **Where it breaks down:** A real recipe book is static, whereas nonlocal variables can be updated by the parent function or by the child function (using the `nonlocal` keyword), and those changes are reflected for any other functions that share that scope.

```
Scope of parent(arg_1, arg_2):
+------------------------------------------------+
| Variables: arg_1, arg_2, value, my_dict, child |
|                                                |
|   Scope of child():                            |
|   +----------------------------------------+   |
|   | No local variables defined.            |   |
|   |                                        |   |
|   | Accesses 'value', 'my_dict', 'arg_1',  |   |
|   | 'arg_2' from the enclosing scope.      |   |
|   +----------------------------------------+   |
|                                                |
+------------------------------------------------+
```

## Details

In Python, when you define a function inside another function, you create a nested structure. A nonlocal variable is simply a variable that isn't local to the inner function, nor is it global. It lives in the 'in-between' space: the scope of the outer function. This concept is a direct consequence of Python's lexical scoping rules (LEGB: Local, Enclosing, Global, Built-in). The 'E' for Enclosing is precisely where nonlocal variables reside. Understanding this is the first step to mastering [[Python 5 - Closures|closures]], which are functions that carry their enclosing environment with them.

#### Primary Goal

To provide a mechanism for a nested function to access variables from its containing function's scope, allowing it to retain state and context from its creation environment.

#### Mechanism

- **How it Works:** Python's interpreter follows a specific order to find a variable, known as the LEGB rule.
    1. **Local (L):** It first checks if the variable was defined within the current function.
    2. **Enclosing (E):** If not found locally, it checks the scope of any enclosing functions, from the innermost to the outermost. This is the 'nonlocal' scope.
    3. **Global (G):** If still not found, it checks the global scope of the module.
    4. **Built-in (B):** Finally, it checks Python's built-in names (like `print`, `len`).
- **Read-Only Access (Default):**
    - By default, a child function can only *read* the value of a nonlocal variable. As seen in the example, `child()` can read `value`, `my_dict`, `arg_1`, and `arg_2` without any special keyword.
- **Write Access (The `nonlocal` Keyword):**
    - If you try to assign a new value to a nonlocal variable (e.g., `value = 44`), Python will assume you are creating a *new local variable* named `value`, shadowing the outer one. To explicitly modify the nonlocal variable, you must declare it with the `nonlocal` keyword inside the child function (e.g., `nonlocal value`).

##### Code Translation

```python
def parent(arg_1, arg_2):
    # --- Step 1: Define variables in the parent scope ---
    # From child()'s point of view,
    # `value` and `my_dict` are nonlocal variables,
    # as are `arg_1` and `arg_2`.
    value = 22
    my_dict = {'chocolate': 'yummy'}

    # --- Step 2: Define a child function that uses them ---
    def child():
        # The child function can READ these nonlocal variables
        print(2 * value)
        print(my_dict['chocolate'])
        print(arg_1 + arg_2)

    # --- Step 3: Return the child function ---
    return child

# --- Step 4: Create and call the child function ---
my_child_func = parent(10, 20)
my_child_func() 
# Expected Output:
# 44
# yummy
# 30
```

 [[Code - Nonlocal Variables Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **The `nonlocal` Keyword:**
    - **Purpose:** Declares that a variable inside a nested function refers to a variable in the nearest enclosing scope that is not global.
    - **Usage:** It's used when you need to *modify* or *rebind* a variable from the parent scope, not just read it.
    - **Example:** If `child()` had the line `nonlocal value` followed by `value = 100`, it would change the `value` in the `parent` function's scope.

#### Core Trade-offs

- **Benefit: State Retention**
    - Nonlocal variables are the core mechanism that allows [[Python 5 - Closures|closures]] to 'remember' state between calls, which is essential for creating decorators and simple stateful objects without using classes. This is demonstrated in [[Python - Closure Value Persistence|how closure values persist]].
- **Risk: Increased Complexity**
    - Overuse of nonlocal variables, especially for modification, can make code harder to reason about. It creates a tighter coupling between the parent and child functions, and it might not be immediately obvious where a variable's state is being changed.
- **Risk: Shadowing**
    - Forgetting the `nonlocal` keyword when intending to modify a variable can lead to subtle bugs. Python will silently create a new local variable that 'shadows' the nonlocal one, leading to unexpected behavior.

## Connections

```
                  (Parent)
                    Scope
                      ▲
                      │
┌─────────────────────┼─────────────────────┐
│                     │                     │
(Prerequisite)   ┌───────────────────────────┐   (Application)
Nested Functions │     Nonlocal Variables    │   Closures
                 └───────────────────────────┘
```

### Parent Concept

The concept of nonlocal variables is a direct extension of [[Python - Scope|Python's scoping rules]], specifically representing the 'E' (Enclosing) in the LEGB lookup order.

### Child Concepts



### Related Concepts 

- Nonlocal variables are the enabling mechanism for [[Python 5 - Closures|closures]], which are functions that remember and have access to variables from their enclosing scope even after the outer function has finished executing.
- The entire concept is only relevant within [[Python - Nested Functions|nested functions]], as it describes the relationship between a parent and child function's scopes.
- Understanding the dynamic between [[Python - Parent and Child Functions|parent and child functions]] is the structural prerequisite for grasping where and why nonlocal variables exist.
- The relationship between decorators and closures, as explored in [[Python - Decorators & Closures Relationship|their relationship]], is entirely dependent on the ability of nonlocal variables to capture state.
## Questions

- You're building a data processing pipeline where each step can be configured with a specific threshold. You could use a class to manage the state of each step, or you could use a factory function with a closure that captures the threshold as a nonlocal variable. What are the trade-offs between these two approaches in terms of code readability, performance, and ease of testing, and how would you justify your choice to the team?
- Imagine a web application that uses closures extensively to handle user-specific contexts (like permissions or session data), relying on nonlocal variables. If you start observing memory leaks, how would you design a debugging strategy to trace which closures are holding onto large objects in their nonlocal scope, and what tools in Python could help you inspect the [[Python - Closure Attribute (__closure__)|__closure__ attribute]] of these functions in a production environment?
- What if Python's `nonlocal` keyword didn't exist? How would you replicate the behavior of modifying a variable in an outer function's scope from within a nested function? What data structures or design patterns could you use to achieve this, and what would be the performance and complexity implications of your workaround?