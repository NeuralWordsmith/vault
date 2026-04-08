---
tags:
  - core
  - python
  - scope
  - namespace
  - variable_lookup
  - legb
  - name_resolution
  - concept
source:
  - "[[Introduction to Functions in Python]]"
related:
  - "[[Python - User-Defined Functions]]"
  - "[[Python - Nested Functions]]"
  - "[[Python - Closures]]"
  - "[[Python - nonlocal Keyword]]"
  - "[[Python - nonlocal Keyword & Enclosing Scope Relationship]]"
  - "[[Python - Variables]]"
  - "[[Python - Functions]]"
  - "[[Python - global Keyword]]"
  - "[[Fundamental - Programming]]"
  - "[[Python - Decorators]]"
  - "[[Python - Lambda Functions]]"
  - "[[Python - Name Mangling]]"
  - "[[Python - Modules]]"
  - "[[Python - Classes]]"
---
# Core: LEGB Rule

## Summary

>The LEGB Rule is the fundamental sequence of scopes Python searches to resolve a variable name. It's an acronym for the four scopes checked in order: **L**ocal, **E**nclosing, **G**lobal, and **B**uilt-in. This search order is the foundation for understanding variable behavior, especially in complex structures like [[Python - Nested Functions]], and is the reason concepts like [[Python - Closures]] and the [[Python - nonlocal Keyword]] work the way they do.

**Why This Matters:** The LEGB rule prevents unpredictable behavior by establishing a clear, deterministic order for how Python finds the value associated with a variable name, ensuring code reliability.

_Analogy:_ _Imagine you're an office worker looking for a specific form. Your search follows a strict protocol:
1.  **Local (Your Desk):** You first check your own desk. If the form is there, you stop looking.
2.  **Enclosing (Your Department):** If it's not on your desk, you check the shared filing cabinet for your specific department.
3.  **Global (Building's Main Archive):** If it's not in your department, you go down to the building's main records archive, which is accessible to everyone.
4.  **Built-in (Public Library):** If the form is something universally understood and not specific to your company (like a standard tax form), you'd find it at the public library across the street. Python stops at the first place it finds the 'form' (the variable)._

*   **Where it breaks down:** The analogy implies physical, static locations. Python scopes are logical and dynamic, created and destroyed as functions are called and exit. Also, while you can't easily change a form at the public library, you *can* (though it's highly discouraged) reassign a built-in name like `print` in Python, effectively replacing the 'public' version with your own 'local' one.

```
+--------------------------------- Built-in (B) ---------------------------------+
| Contains: print(), len(), str(), list(), ...                                   |
|                                                                                |
|  +----------------------------- Global (G) --------------------------------+  |
|  |  x = "global"                                                          |  |
|  |                                                                        |  |
|  |  +------------------------- Enclosing (E) --------------------------+  |  |
|  |  |  x = "enclosing"                                                |  |  |
|  |  |                                                                 |  |  |
|  |  |  +----------------------- Local (L) ------------------------+  |  |  |
|  |  |  |  x = "local"                                            |  |  |  |
|  |  |  |                                                         |  |  |  |
|  |  |  |  print(x)  # Python finds "local" first and stops.      |  |  |  |
|  |  |  +---------------------------------------------------------+  |  |  |
|  |  |                                                                 |  |  |
|  |  +-----------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                                |
+--------------------------------------------------------------------------------+
```

## Details

Whenever you use a variable name in Python, the interpreter needs a system to find its value. The LEGB rule is that exact system—a strict, four-step search path that dictates how Python looks for a name in different namespaces. It's the core principle that governs variable accessibility and is essential for writing predictable and bug-free code, particularly when working with [[Python - Nested Functions]] and managing state with the [[Python - nonlocal Keyword]]. The four scopes are **Local**, **Enclosing**, **Global**, and **Built-in**.

#### Primary Goal

To provide a predictable and unambiguous rule for resolving variable names, ensuring that code behaves consistently regardless of its complexity.

#### Mechanism

- **How it Works:**
    - Python checks for a variable name in a specific order. The search stops immediately as soon as the name is found.
    1.  **L (Local):** The current function's scope. This includes function arguments and any variables assigned within the function.
    2.  **E (Enclosing):** The scope of any enclosing functions. This is relevant only for [[Python - Nested Functions]]. Python searches from the innermost enclosing function outwards.
    3.  **G (Global):** The top-level scope of the Python module or script.
    4.  **B (Built-in):** The special scope containing Python's built-in functions like `print()`, `len()`, and `str()`.
- **L: Local Scope**
    - Created every time a function is called. It's temporary and is destroyed when the function returns.
    - *Example: In `def my_func(arg): x = 10`, both `arg` and `x` are in the local scope of `my_func`.*
- **E: Enclosing Scope**
    - Also known as the 'nonlocal' scope. It's the local scope of any parent functions of a nested function.
    - *Example: If `inner_func` is defined inside `outer_func`, the local scope of `outer_func` is the enclosing scope for `inner_func`. This is the scope targeted by the [[Python - nonlocal Keyword]].*
- **G: Global Scope**
    - The scope of a single `.py` file. Variables defined here are accessible to all functions within that file.
    - *Example: A variable `API_KEY = '...'` defined at the top of a script is in the global scope.*
- **B: Built-in Scope**
    - Contains all the names that are pre-loaded into Python, such as `list`, `dict`, `sum`, and `Exception`.
    - *Example: You can call `len([1, 2])` from anywhere without importing anything because `len` is in the built-in scope.*

##### Code Translation

```python
# --- G: Global Scope ---
x = 'global_x'

def outer_func():
    # --- E: Enclosing Scope ---
    x = 'enclosing_x'

    def inner_func():
        # --- L: Local Scope ---
        x = 'local_x'
        print(f"Inside inner_func, x is: {x}") # Prints 'local_x'

    inner_func()
    print(f"Inside outer_func, x is: {x}") # Prints 'enclosing_x'

# --- Execution ---
outer_func()
print(f"In global scope, x is: {x}") # Prints 'global_x'

# Demonstrating the search for a name not in L, E, or G
def find_builtin():
    # No 'len' is defined in Local, Enclosing, or Global scopes
    # Python finds it in the Built-in scope.
    print(len([1, 2, 3]))

find_builtin() # Prints 3
```

 [[Code - LEGB Rule Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`global` Keyword**
    - This keyword is a directive to Python, telling it that an assignment within a function should modify the variable in the *global* scope, bypassing the local and enclosing scopes entirely.
- **`nonlocal` Keyword**
    - This keyword tells Python that an assignment should modify the variable in the nearest *enclosing* scope. It's crucial for creating stateful functions and is directly explained by the [[Python - nonlocal Keyword & Enclosing Scope Relationship|relationship between nonlocal and the 'E' scope]].

#### Core Trade-offs

- **Pro: Predictability & Encapsulation**
    - The strict, unchanging order makes code easier to reason about. It naturally encapsulates variables within functions, preventing accidental modification of variables in outer scopes, which reduces bugs.
- **Con: Variable Shadowing**
    - A variable defined in a local scope can "hide" or "shadow" a variable with the same name from an outer scope. If this is unintentional, it can lead to subtle bugs where the code uses the local variable instead of the intended outer one.

## Connections

```
                                (Parent)
                       [[Python - User-Defined Functions]]
                                     ▲
                                     │
    ┌────────────────────────────────┼────────────────────────────────┐
    │                                │                                │
[[Python - Closures]]           ┌───────────┐                  [[Python - Variables]]
(Relies Upon)                   │ LEGB Rule │                  (Builds Upon)
                                └───────────┘
                                     │
                                     │
                      (Mechanism that enables...)
                                     │
                                     ▼
                         [[Python - nonlocal Keyword]]
```

### Parent Concept

The LEGB rule is a core principle within [[Python - User-Defined Functions]], as scope resolution is most critical when defining, nesting, and calling functions.

### Child Concepts

- The LEGB rule is a fundamental principle rather than a concept with distinct sub-types. However, its rules directly govern the behavior of keywords like [[Python - nonlocal Keyword|nonlocal]] and `global`, which are used to explicitly manipulate its search path.

### Related Concepts 

- The concept of an enclosing scope is central to [[Python - Nested Functions|nested functions]], which are functions defined inside other functions.
- Understanding the LEGB rule is a prerequisite for grasping [[Python - Closures|closures]], which remember and access variables from their enclosing scope even after that scope has finished executing.
- The [[Python - nonlocal Keyword & Enclosing Scope Relationship|relationship between the nonlocal keyword and the enclosing scope]] is a direct application and manipulation of the 'E' in LEGB.
- It builds upon the basic principles of [[Python - Variables|variable assignment and lookup]].
## Questions

- A junior developer on your team is frequently using the `global` keyword to share state between functions, arguing it's simpler than passing many parameters. How would you explain the long-term maintainability risks of this approach, and what alternative design pattern (like classes or dependency injection) would you propose to achieve the same business goal with more robust code?
- Imagine a large, multi-threaded Python application where different threads are executing functions that modify global variables. How does the LEGB rule interact with the Global Interpreter Lock (GIL)? What race conditions could arise from this design, and how would you architect a thread-safe state management system to prevent them?
- What if Python reversed the LEGB rule to 'BGEL' (Built-in -> Global -> Enclosing -> Local)? How would this fundamentally change the way we write Python code? What existing programming paradigms would become impossible or trivial, and what new kinds of bugs would become common?