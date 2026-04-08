---
tags: 
  - process
  - python
  - legb
  - scope_resolution
  - name_lookup
  - namespace
  - interpreter
  - concept
source: 
  - "[[Writing Functions in Python]]"
related: 
  - "[[Python - Scope]]"
  - "[[Python - Local Scope]]"
  - "[[Python - Global Scope]]"
  - "[[Python - Built-in Scope]]"
  - "[[Python - Nonlocal Scope]]"
  - "[[Python - Nested Functions]]"
  - "[[Python - Functions]]"
  - "[[Python - Variables]]"
  - "[[Python - global Keyword]]"
  - "[[Python - nonlocal Keyword]]"
  - "[[Python - Nested Functions & Nonlocal Scope Relationship]]"
  - "[[Fundamental - Programming]]"
  - "[[Python - Namespaces]]"
---
# Process: LEGB Rule

**Why This Matters:** The LEGB rule prevents naming conflicts and makes code predictable by defining a clear, unambiguous order for the Python interpreter to find the variables you are referring to.
## Goal & Analogy

> **Goal:** The LEGB Rule is the acronym for the sequence of scopes the Python interpreter searches to resolve a variable name: **L**ocal, **E**nclosing, **G**lobal, **B**uilt-in. This hierarchical lookup is the core mechanism that governs how [[Python 5 - Scope|variable scope]] works, determining which value is used when a variable name is referenced. It dictates the interaction between the [[Python 5 - Local Scope|local scope]] of a function, the [[Python - Nonlocal Scope|enclosing (or nonlocal) scope]] of nested functions, the [[Python 5 - Global Scope|global scope]] of a module, and the universal [[Python 5 - Built-in Scope|built-in scope]].

_Analogy:_ _Imagine you're in an office building looking for a specific form. You first check your own desk drawer (**Local**). If it's not there, you check the filing cabinet for your immediate team (**Enclosing**). Still no luck? You go to the central records room for the entire company floor (**Global**). If it's a standard, universal form like a W-9, and you still can't find it, you know you can always download a fresh copy from the IRS website (**Built-in**)._

**Where it breaks down:** In programming, you can use the `global` and `nonlocal` keywords to explicitly declare that you intend to modify a form in the central records room or your team's filing cabinet directly from your desk, without creating a local copy. This level of direct, long-distance modification doesn't have a clean equivalent in the office analogy.

```
Built-in Scope (e.g., print, len)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
|  Global Scope (e.g., module-level variables) |
|  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  |
|  |  Enclosing Scope (outer_func)          |  |
|  |  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  |  |
|  |  |  Local Scope (inner_func)        |  |  |
|  |  |                                  |  |  |
|  |  |  Interpreter starts search HERE  |  |  |
|  |  |                                  |  |  |
|  |  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  |  |
|  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  |
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

## The Step-by-Step Process

### Prerequisites / Inputs

- **`global` Keyword**
    - This keyword allows you to modify a variable in the [[Python 5 - Global Scope|global scope]] from within a local or enclosing scope. It tells the interpreter to skip the L and E scopes for assignment and go directly to G. See [[Python 5 - global Keyword|how to use it]].
- **`nonlocal` Keyword**
    - This keyword allows you to modify a variable in the nearest [[Python - Nonlocal Scope|enclosing scope]] from within a nested function. It tells the interpreter to skip the L scope for assignment and go to the E scope. See [[Python 5 - nonlocal Keyword|how to use it]].

### The Steps

- **How it Works:**
    - The interpreter performs a sequential search, starting from the most specific scope and moving to the most general.
    1.  The search begins in the current, innermost scope.
    2.  If the variable is not found, the search expands to the next level out.
    3.  This process repeats until the variable is found or all scopes have been exhausted, at which point a `NameError` is raised.
- **L: Local Scope**
    - This is the innermost scope, containing names defined inside the current function. This includes function arguments and variables assigned within the function.
    - Example: *In `def my_func(arg): var = 10`, both `arg` and `var` are in the local scope of `my_func`.*
- **E: Enclosing (Nonlocal) Scope**
    - This scope only exists for [[Python - Nested Functions|nested functions]]. It refers to the local scope of any and all enclosing functions, from the innermost to the outermost. The search starts with the nearest parent function.
    - Example: *If `inner_func` is defined inside `outer_func`, the local scope of `outer_func` is the enclosing scope for `inner_func`.*
- **G: Global Scope**
    - This is the top-level scope of the Python module or script. It contains all names defined at the main level of the program.
    - Example: *Any variable assigned outside of all functions in a `.py` file is in the global scope.*
- **B: Built-in Scope**
    - This is the outermost scope and is available everywhere. It contains all of Python's built-in names, such as functions like `print()`, `len()`, `str()`, and exceptions like `ValueError`.
    - Example: *You can call `print()` from anywhere without defining it because it exists in the built-in scope.*

##### Code Translation

```python
# --- G: Global Scope ---
x = 'global x'

def outer_func():
    # --- E: Enclosing Scope for inner_func ---
    x = 'enclosing x'

    def inner_func():
        # --- L: Local Scope ---
        x = 'local x'
        print(x) # Interpreter finds 'x' in the Local scope first.

    inner_func()
    print(x) # Interpreter finds 'x' in the Enclosing scope.

outer_func()
print(x) # Interpreter finds 'x' in the Global scope.

# What about built-in?
print(len('hello')) # 'len' is not in L, E, or G, so it's found in the Built-in scope.

# --- Output ---
# local x
# enclosing x
# global x
# 5
```

### Deliverables / Outputs

When the Python interpreter encounters a variable name, like `x` in `print(x)`, it doesn't just guess which `x` you mean. It follows a strict, predetermined search path to find the variable's value. This ordered search is known as the LEGB rule, which stands for the four scopes it checks in sequence: **Local**, **Enclosing**, **Global**, and **Built-in**. The interpreter stops as soon as it finds the first match, ensuring that variable resolution is always predictable and deterministic.

## Context & Tradeoffs

### When to Use This Process

To provide a deterministic and predictable system for resolving variable names, preventing ambiguity and ensuring that the correct variable is accessed based on its context within the code.

### Common Pitfalls & Tradeoffs

- **Clarity vs. Complexity**
    - The LEGB rule provides a clear, predictable lookup order. However, in code with many deeply nested functions, tracing the exact scope of a variable can become complex and lead to subtle bugs if not managed carefully.
- **Variable Shadowing**
    - A variable defined in an inner scope (e.g., local) can 'shadow' or hide a variable with the same name in an outer scope (e.g., global). While this is a direct consequence of the LEGB rule, it can be an unintentional source of errors if a developer expects to access the outer variable but accidentally re-defines it locally.

## Connections

```
                      (Parent)
                        Scope
                          ▲
                          │
          ┌───────────────┼────────────────────────────┐
          │               │                            │
(Modifies Behavior) ┌─────────────┐            (Applies To)
`global` Keyword    │  LEGB Rule  │            Nested Functions
`nonlocal` Keyword  └─────────────┘
                          │
      ┌───────────────────┴───────────────────┐
      │           │           │               │
Local Scope  Enclosing  Global Scope   Built-in Scope
             Scope
```


- The LEGB rule is the fundamental mechanism that defines [[Python 5 - Scope|variable scope]] in Python.
- The 'E' in LEGB, the enclosing scope, is particularly relevant and only comes into play with [[Python - Nested Functions|nested functions]].
- The default behavior of the LEGB rule can be explicitly overridden for assignments using the [[Python 5 - global Keyword|global]] and [[Python 5 - nonlocal Keyword|nonlocal]] keywords.
- Understanding the LEGB rule is essential for grasping the [[Python - Nested Functions & Nonlocal Scope Relationship|relationship between nested functions and the nonlocal scope]].

## Deeper Questions

- Imagine a large, legacy codebase where a critical global variable is frequently 'shadowed' by local variables in many functions, causing intermittent bugs. What's the business case for a refactoring effort to fix this, and how would you weigh the cost of refactoring against the risk of leaving the buggy code in production?
- In a microservices architecture, how does the concept of scope translate when a Python service needs to access configuration variables? Would you rely on global variables loaded from a file, environment variables, or a dedicated configuration service, and what are the LEGB-like implications for variable resolution and potential conflicts in each approach?
- What if Python reversed the LEGB rule to 'BGEL' (Built-in, Global, Enclosing, Local)? How would this fundamentally change the way we write functions and manage state, and what existing programming patterns would become impossible or dangerous?