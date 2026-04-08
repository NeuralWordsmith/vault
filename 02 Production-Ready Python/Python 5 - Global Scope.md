---
tags: 
  - core
  - python
  - namespace
  - legb_rule
  - variable_lookup
  - module_level
  - global_keyword
  - concept
source: 
  - "[[Writing Functions in Python]]"
related: 
  - "[[Python - Scope]]"
  - "[[Python - Scope Resolution (LEGB Rule)]]"
  - "[[Python 5 - Local Scope]]"
  - "[[Python 5 - Built-in Scope]]"
  - "[[Python - Nonlocal Scope]]"
  - "[[Python 5 - global Keyword]]"
  - "[[Python 5 - nonlocal Keyword]]"
  - "[[Python - Nested Functions]]"
  - "[[Python - Variables]]"
  - "[[Python - Functions]]"
  - "[[Python - User-Defined Functions]]"
  - "[[SWE - Do One Thing Principle]]"
  - "[[Python - Namespaces]]"
---
# Core: Global Scope

## Summary

>The global scope is the outermost namespace in a Python script or module. It contains all variables, functions, and classes defined at the top level, outside of any function. When the interpreter cannot find a variable in the [[Python 5 - Local Scope|local scope]], it expands its search to the global scope before finally checking the [[Python 5 - Built-in Scope|built-in scope]], following the lookup order defined by the [[Python - Scope Resolution (LEGB Rule)|LEGB rule]].

**Why This Matters:** Global scope enables functions to share state and access configuration data defined at the top level of a script, preventing the need to pass the same information into every function call.

_Analogy:_ _Think of variable scopes like a search for a specific tool. The **local scope** is your personal toolbox right next to you—it's the first place you look. If the tool isn't there, you look in the **global scope**, which is like the main workshop or garage where all the shared, common tools for the whole project are kept. Anyone working on the project can see and use the tools in the workshop._

**Where it breaks down:** The analogy falters on modification. While you can easily use a tool from the main workshop (read a global variable), you can't just replace it with a new one from your personal toolbox without explicit permission. In Python, a function must use the `[[Python 5 - global Keyword|global]]` keyword to get 'permission' to modify a tool in the main workshop; otherwise, it just ends up creating a new, local tool with the same name in its own toolbox.

```
+-------------------------------------------------+
| Global Scope (module.py)                        |
|                                                 |
|   x = "I am global"                             |
|                                                 |
|   def my_function():                            |
|   +-------------------------------------------+ |
|   | Local Scope (inside my_function)          | |
|   |                                           | |
|   |   y = "I am local"                        | |
|   |   print(x)  <-- Looks for x here first,   | |
|   |                 then finds it outside.    | |
|   +-------------------------------------------+ |
|                                                 |
+-------------------------------------------------+
```

## Details

When a variable is referenced inside a function, Python's first instinct is to look for it locally. If it's not there, the search expands outward to the global scope. This scope acts as a common, module-level container for objects that need to be accessible throughout the entire script. It's the default namespace for anything not defined inside a function or class, making it a crucial part of Python's [[Python - Scope Resolution (LEGB Rule)|scope resolution]] mechanism.

#### Primary Goal

To provide a common, module-level namespace for variables and functions that need to be accessible throughout the entire script, serving as a shared repository of information.

#### Mechanism

- **How it Works:** The search for a variable follows a specific order when a name is referenced inside a function.
    1. **Check Local:** The interpreter first checks the [[Python 5 - Local Scope|local scope]] of the current function.
    2. **Check Enclosing (if any):** If the function is nested, the search proceeds to the [[Python - Nonlocal Scope|nonlocal scopes]] of any enclosing functions.
    3. **Check Global:** If the variable is still not found, the interpreter checks the global scope—the top-level namespace of the module where the function is defined.
    4. **Check Built-in:** As a last resort, it checks the [[Python 5 - Built-in Scope|built-in scope]] for names like `print()` or `len()`.
- **Read-Only Access (Default):**
    - By default, functions have read-only access to global variables. They can retrieve and use the value of a global variable without any special keywords.
- **Modification with `global`:**
    - To modify or reassign a global variable from within a function, you must explicitly declare this intent using the [[Python 5 - global Keyword|global keyword]]. Without it, Python would create a new local variable with the same name, shadowing the global one.

##### Code Translation

```python
# --- Step 1: Define a global variable ---
# This variable exists in the global scope because it's at the top level.
player_health = 100

# --- Step 2: Read the global variable from a function ---
# This function can access 'player_health' without any special keyword.
def check_health():
    # Python doesn't find 'player_health' locally, so it looks globally.
    print(f"Reading from global scope: Player health is {player_health}")

# --- Step 3: Modify the global variable using the 'global' keyword ---
# This function needs to declare its intent to change the global variable.
def take_damage(amount):
    # The 'global' keyword tells Python not to create a new local variable.
    global player_health
    player_health -= amount
    print(f"Modified global scope: Player health is now {player_health}")

# --- Execution ---
check_health()      # Output: Reading from global scope: Player health is 100
take_damage(20)     # Output: Modified global scope: Player health is now 80
check_health()      # Output: Reading from global scope: Player health is 80
```

 [[Code - Global Scope Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Implicit Definition:**
    - Any variable assigned a value in the main body of a script (i.e., not indented inside a function or class) is automatically placed in the global scope.
- **Explicit Modification:**
    - The `[[Python 5 - global Keyword|global]]` keyword is used inside a function to signal that an assignment should affect the global variable of the same name, not create a new local one.

#### Core Trade-offs

- **Pro - Simplicity for Constants:**
    - Global scope is ideal for defining module-level constants (e.g., `PI = 3.14159`) or configuration settings that are meant to be read-only across the application.
- **Pro - Shared State:**
    - It provides a straightforward way for different functions to share state without passing variables as arguments through many layers of function calls, which can be useful in smaller scripts.
- **Con - Reduced Readability & Maintainability:**
    - Overuse of global variables makes it harder to reason about a function's behavior in isolation. To understand its dependencies, you must look outside the function, which violates the principle of locality and makes code harder to debug.
- **Con - Risk of Unintended Side Effects:**
    - A function can accidentally modify a global variable, causing unexpected bugs in other parts of the program that rely on that variable. This 'action at a distance' makes the codebase fragile.

## Connections

```
                      (Parent)
                       Scope
                         ▲
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                    │
(Searched Before)  ┌───────────────┐   (Searched After)
  Local Scope      │  Global Scope │     Built-in Scope
                   └───────────────┘
                         │
                         │
                  (Modified By)
                  global Keyword
```

### Parent Concept

The concept of global scope is a fundamental component of the broader topic of [[Python - Scope]], which defines the rules for variable visibility and accessibility in a program.

### Child Concepts

- While not a direct child, the behavior of the global scope is explicitly controlled from within a function using the [[Python 5 - global Keyword|global keyword]], which signals an intent to modify a global variable.

### Related Concepts 

- It is a key stage in the [[Python - Scope Resolution (LEGB Rule)|LEGB rule]], searched immediately after the [[Python 5 - Local Scope|local scope]].
- It contrasts with [[Python - Nonlocal Scope|nonlocal scope]], which refers to the scope of an outer function in a [[Python - Nested Functions|nested function]] structure, not the top-level module scope.
- The final search location after the global scope fails is the [[Python 5 - Built-in Scope|built-in scope]], which contains Python's standard functions and exceptions.
## Questions

- You're refactoring a legacy script that heavily uses global variables for configuration and state management. What is the business case for investing time to refactor this into a class-based or parameter-passing approach, and how would you argue the long-term value (e.g., maintainability, reduced bugs) against the short-term cost of development?
- Imagine a multi-threaded application where several threads need to read and *occasionally* write to a shared global dictionary. What specific concurrency problems could arise from this design, and what Python-native mechanisms (e.g., locks) would you implement to ensure thread safety without creating significant performance bottlenecks?
- What if Python completely removed the global scope and the `global` keyword? How would you have to fundamentally redesign a typical application (e.g., a Flask web app or a data processing script) to manage configuration, constants, and shared resources like database connections?