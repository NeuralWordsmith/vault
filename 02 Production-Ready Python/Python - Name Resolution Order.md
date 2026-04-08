---
tags: 
  - core
  - python
  - legb_rule
  - name_resolution
  - namespace
  - variable_lookup
  - shadowing
  - concept
source: 
  - "[[Introduction to Functions in Python]]"
related: 
  - "[[Python - Scope]]"
  - "[[Python - Global Scope]]"
  - "[[Python - Local Scope]]"
  - "[[Python - Built-in Scope]]"
  - "[[Python - global Keyword]]"
  - "[[Python - User-Defined Functions]]"
  - "[[Python - Variables]]"
  - "[[Python - Functions]]"
  - "[[Fundamental - Programming]]"
  - "[[Python - Objects]]"
  - "[[Python - Data Types]]"
  - "[[Python - Namespaces]]"
---
# Core: Scope Resolution Order

## Summary

>Scope Resolution Order, often called the LEGB rule, is the sequence Python follows to find the value associated with a name. It searches scopes in a specific order: first the [[Python - Local Scope|Local]], then any Enclosing function scopes, then the [[Python - Global Scope|Global]], and finally the [[Python - Built-in Scope|Built-in]] scope. The search stops as soon as the name is found, ensuring that name resolution is predictable and deterministic.

**Why This Matters:** Understanding Python's scope resolution order is critical for preventing subtle bugs where variables are unintentionally overwritten or accessed from the wrong context.

_Analogy:_ _Think of looking for a specific tool. First, you check the small toolbox you have right next to you (Local Scope). If it's not there, you check the larger tool chest in your garage (Global Scope). If you still can't find it, you assume it's a standard tool that's always available at the hardware store down the street (Built-in Scope). You stop looking as soon as you find the tool at the most immediate location._

The toolbox is your local function. The garage is the main script file. The hardware store is Python's collection of built-in functions like `print()` or `len()`. 

**Where it breaks down:** Unlike a hardware store, you cannot easily add new tools (functions or variables) to Python's built-in scope during normal program execution.

```
┌───────────────────────────────────────────┐
│ Built-in Scope (e.g., print(), len())     │
│                                           │
│   ┌───────────────────────────────────┐   │
│   │ Global Scope (module-level)       │   │
│   │                                   │   │
│   │   new_val = 10                    │   │
│   │                                   │   │
│   │   ┌───────────────────────────┐   │   │
│   │   │ Local Scope (inside func) │   │   │
│   │   │                           │   │   │
│   │   │ Search for 'new_val' here │   │   │
│   │   │ first. If not found...    │   │   │
│   │   └─────────────▲─────────────┘   │   │
│   │                   │ Search Path   │   │
│   └───────────────────┼───────────────┘   │
│                       │                   │
└───────────────────────┼───────────────────┘
                        │
```

## Details

When Python encounters a variable name, it must have a consistent method to determine which value to use, especially when the same name exists in different parts of a program. This strict hierarchy of searching from the innermost scope to the outermost scope is the solution. As the context states, if Python cannot find a name in the local scope, 'it will then and only then look in the global scope.' This prevents ambiguity and ensures that functions don't accidentally modify variables they weren't intended to. The full, formal order of this search is known as the **LEGB Rule: Local, Enclosing, Global, Built-in**.

#### Primary Goal

To provide a deterministic and unambiguous rule for Python to find the correct object a name refers to, preventing conflicts and ensuring code behaves predictably.

#### Mechanism

- **How it Works: The LEGB Rule**
    - Python's interpreter performs a sequential search through nested namespaces:
    1.  **L - Local Scope:** Searched first. This is the namespace within the current function. If you define a variable inside a function, it's local.
        - *Example: In `def my_func(): x = 10`, `x` is in the local scope of `my_func`.*
    2.  **E - Enclosing Scope:** Searched if the name isn't in the local scope. This applies to nested functions (closures). It's the scope of the outer function.
        - *Example: If `inner_func` is defined inside `outer_func`, the scope of `outer_func` is the enclosing scope for `inner_func`.*
    3.  **G - Global Scope:** Searched if the name is in neither the local nor enclosing scopes. This is the top-level namespace of the module/script.
        - *Example: As mentioned in the context, `new_val` defined at the top of a script is found here when accessed from within the `square` function.*
    4.  **B - Built-in Scope:** The final place searched. This scope contains all of Python's built-in names like `print()`, `len()`, `str`, and exceptions.
        - *Example: When you call `print('hello')` without importing anything, Python finds `print` in the built-in scope.*

##### Code Translation

```python
# --- Global Scope ---
new_val = 10 # This variable exists in the global scope

def square(value):
    # --- Local Scope ---
    # 'new_val' is not defined locally, so Python looks in the global scope.
    new_val_squared = new_val ** 2
    print(f"Accessing global 'new_val' from local scope: {new_val}")
    return new_val_squared

# --- Global Scope ---
# The function is called from the global scope.
result = square(5)
print(f"The result is: {result}")

# Example of shadowing
def square_shadow(value):
    # --- Local Scope ---
    new_val = 5 # This is a NEW local variable that 'shadows' the global one.
    new_val_squared = new_val ** 2
    print(f"Accessing local 'new_val': {new_val}") # Python finds the local one first and stops.
    return new_val_squared

square_shadow(10)
print(f"Global 'new_val' remains unchanged: {new_val}")
```

 [[Code - Scope Resolution Order Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Keywords that Modify Scope Behavior**
    - While the LEGB search order is fixed, certain keywords can alter how variables are assigned within these scopes:
    - **`global` Keyword:** The [[Python - global Keyword|global keyword]] explicitly tells Python that an assignment inside a local scope should modify the variable in the global scope, rather than creating a new local variable.
        - *Example: `global my_counter; my_counter += 1` inside a function will increment a counter defined at the module level.*
    - **`nonlocal` Keyword:** Used in nested functions, this keyword indicates that a variable refers to a name in the nearest enclosing scope (the 'E' in LEGB) that is not global.

#### Core Trade-offs

- **Pro: Predictability and Encapsulation**
    - The strict LEGB order makes code behavior predictable. You can reason about where a variable's value is coming from. It also promotes encapsulation, as functions operate in their own local scope without accidentally modifying the global state.
- **Con: Variable Shadowing**
    - A variable defined in an inner scope can 'hide' or 'shadow' a variable with the same name in an outer scope. If a developer accidentally creates a local variable with the same name as a global one they intended to use, it can lead to subtle and hard-to-find bugs.

## Connections

```
             (Parent)
             Scope
               ▲
               │
┌──────────────┼────────────────┐
│              │                │
(Component)  ┌───────────────────┐  (Component)
Local Scope  │ Scope Resolution  │  Global Scope
             │       Order       │
             └───────────────────┘
               │
               │
           (Mechanism)
        global Keyword
```

### Parent Concept

This rule is the core mechanism governing how [[Python - Scope|scopes]] operate in Python.

### Related Concepts 

- The search begins in the [[Python - Local Scope|local scope]], which is the most immediate and temporary namespace.
- If a name is not found locally, the search proceeds to the [[Python - Global Scope|global scope]], which contains names defined at the top level of a script.
- The final place Python looks is the [[Python - Built-in Scope|built-in scope]], which holds globally available functions like `print` and `len`.
- The [[Python - global Keyword|global keyword]] provides an explicit way to bypass the creation of a local variable and instead modify a variable in the global scope.
## Questions

- Imagine you're debugging a large, legacy codebase where a critical global configuration variable is being unexpectedly changed. How would you trace the source of this modification, and what's the long-term risk of relying heavily on mutable global state versus passing configurations explicitly as function arguments?
- In a microservices architecture, configuration is often managed externally (e.g., in environment variables or a config service). How does Python's scope resolution model interact with this pattern? Where in the LEGB hierarchy would you typically load and access this external configuration to ensure it's available where needed without polluting the global namespace?
- What if Python's scope resolution was reversed (Built-in -> Global -> Local)? What fundamental programming patterns would break, and what new kinds of bugs would become common?