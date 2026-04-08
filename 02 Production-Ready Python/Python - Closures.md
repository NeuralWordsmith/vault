---
tags: 
  - core
  - python
  - closures
  - nested_functions
  - enclosing_scope
  - lexical_scope
  - function_factory
  - concept
source: 
  - "[[Introduction to Functions in Python]]"
related: 
  - "[[Python - Nested Functions]]"
  - "[[Python - Functions]]"
  - "[[Python - User-Defined Functions]]"
  - "[[Python - LEGB Scope Resolution Rule]]"
  - "[[Python - nonlocal Keyword]]"
  - "[[Python - Decorators]]"
  - "[[Python - First-Class Functions]]"
  - "[[Python - Lambdas]]"
  - "[[Fundamental - Computer Science]]"
  - "[[Python - Scope]]"
  - "[[Python - nonlocal Keyword & Enclosing Scope Relationship]]"
  - "[[Python - Nested Functions for Code Reusability]]"
---
# Core: Closures

## Summary

>A closure is a special type of inner function that remembers and has access to the variables in its enclosing scope, even after the outer function has finished executing. It 'closes over' the free variables from its environment, bundling them with the function itself.

**Why This Matters:** Closures enable the creation of powerful 'function factories' and are the core mechanism behind Python decorators, allowing for more flexible, reusable, and encapsulated code.

_Analogy:_ _Imagine a master locksmith who creates custom keys. The locksmith's workshop is the outer function (`raise_vals`). The locksmith takes an order for a specific key pattern, say, a 'square' pattern (`n=2`). This pattern is a variable in the workshop's scope. The locksmith then forges a unique key (`inner` function) that is permanently shaped by that 'square' pattern. When you receive this key (`square`), you can take it anywhere and use it to open 'square' locks. The key itself *remembers* the pattern it was forged with, long after it has left the workshop and the workshop has closed for the day._

**Where it breaks down:** A physical key is a static object. A closure, however, is a callable function object. It doesn't just 'fit' a lock; it actively performs a computation using the state it has remembered. The 'memory' is an active reference to the variable, not a static, unchangeable shape.

```
Execution Flow:

1. `square = raise_vals(n=2)`
   │
   └─> Python creates an `inner` function instance.
       This instance gets a special pointer to its enclosing scope.
       [ Enclosing Scope: { n: 2 } ]

2. `raise_vals` finishes. The `square` variable now holds the `inner` function.
   The enclosing scope { n: 2 } is kept alive because `square` needs it.

3. `square(5)` is called.
   │
   └─> The `inner` function executes.
       It needs the value of `n`.
       It looks in its local scope (finds `x=5`).
       It looks in its enclosing scope via the pointer (finds `n=2`).
       Returns `5 ** 2` -> `25`
```

## Details

In Python, a closure occurs when a nested function references a value from its enclosing scope. As explained in the context, if the outer function returns this [[Python - Nested Functions|nested function]], the returned function object keeps a reference to that enclosing scope. This allows the inner function to access those 'non-local' variables long after the outer function has completed its execution. This behavior, where a function remembers the environment in which it was created, is a fundamental concept in computer science that enables powerful programming patterns.

#### Primary Goal

To create functions that encapsulate and retain state from their creation context, allowing for the development of specialized function generators or 'factories'.

#### Mechanism

- **Step 1: Define an Outer 'Factory' Function**
    - Create an outer function that accepts one or more arguments. These arguments will become the 'state' that the inner function remembers.
- **Step 2: Define a Nested Inner Function**
    - Inside the outer function, define another function. This inner function performs an action using the arguments passed to the outer function.
- **Step 3: Return the Inner Function Object**
    - The outer function must return the inner function itself, without calling it (i.e., return `inner`, not `inner()`).
- **Step 4: Create and Use the Closure**
    - Call the outer function with a specific argument. The return value is a new, specialized function (the closure). This new function can now be called like any other function.

##### Code Translation

```python
# --- Step 1: Define an Outer 'Factory' Function ---
def raise_vals(n):
    """This outer function takes an argument 'n' which will be the state.
    It will act as a factory for creating power functions."""
    
    # --- Step 2: Define a Nested Inner Function ---
    def inner(x):
        """This inner function uses 'n' from its enclosing scope."""
        return x ** n

    # --- Step 3: Return the Inner Function Object ---
    return inner

# --- Step 4: Create and Use the Closure ---

# Create a 'square' function. raise_vals(2) executes and finishes,
# but the returned 'inner' function remembers that n=2.
square = raise_vals(2)

# Create a 'cube' function. This is another closure that remembers n=3.
cube = raise_vals(3)

# Now, call the closures. They use their remembered 'n' value.
print(f"5 squared is: {square(5)}")  # Output: 5 squared is: 25
print(f"5 cubed is: {cube(5)}")    # Output: 5 cubed is: 125
```

 [[Code - Closures Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Captured Variables (Free Variables)**
    - These are not parameters in the typical sense, but variables from the enclosing scope that the inner function references. The closure's behavior is entirely dependent on the values these variables had when the closure was created.

#### Core Trade-offs

- **Advantage: State Encapsulation**
    - Closures provide a way to maintain state without using global variables or creating a full class structure. The state is hidden and protected within the function.
- **Advantage: Function Factories**
    - They excel at creating specialized versions of a function on the fly, reducing code duplication and promoting a clean, configurable design.
- **Disadvantage: Memory Consumption**
    - Because a closure holds a reference to its enclosing scope, the variables in that scope cannot be garbage collected. If a closure captures large objects and has a long lifespan, it can lead to higher memory usage than expected.
- **Disadvantage: Readability**
    - For developers unfamiliar with the concept, the 'action at a distance' where a function uses a variable defined elsewhere can sometimes make the code harder to trace and debug compared to an explicit class.

## Connections

```
                      (Parent)
                 Nested Functions
                         ▲
                         │
         ┌───────────────┼────────────────┐
         │               │                │
┌────────────────┐  ┌───────────┐  ┌──────────────────┐
│ LEGB Scope Rule│──│ Closures  │──│ nonlocal Keyword │
└────────────────┘  └───────────┘  └──────────────────┘
                         │
                         ▼
                    (Used For)
                     Decorators
```

### Parent Concept

The concept of a closure is a direct and powerful application of [[Python - Nested Functions|nested functions]].

### Child Concepts

- Closures are the fundamental mechanism that makes [[Python - Decorators|decorators]] possible, allowing them to wrap and modify other functions while retaining state.

### Related Concepts 

- The ability of a closure to find its captured variables is governed by the [[Python - LEGB Scope Resolution Rule|LEGB scope resolution rule]], specifically the 'E' for Enclosing scope.
- While closures provide read-only access to enclosing variables, the [[Python - nonlocal Keyword|nonlocal keyword]] is a related concept that allows an inner function to modify the state captured by the closure.
- The relationship between the `nonlocal` keyword and the enclosing scope is a direct extension of the closure mechanism, as detailed in [[Python - nonlocal Keyword & Enclosing Scope Relationship|nonlocal & enclosing scope relationship]].
- A simple use case for [[Python - Nested Functions for Code Reusability|nested functions for code reusability]] can be extended into a closure if the inner function is returned instead of just being called internally.
## Questions

- Imagine you're building a data processing pipeline where different clients require slightly different transformation rules (e.g., different scaling factors or thresholds). How could you use closures to create a clean, configurable 'transformation factory' for these clients, and how would you justify this design over simply passing the configuration parameters to a single, generic function every time?
- If you create thousands of closures in a long-running web application, each capturing a large object (like a user session or a database connection) from its enclosing scope, what potential memory management issues could arise, and how would you design a system to mitigate the risk of memory leaks?
- What if Python did not support closures? How would you replicate the 'stateful function' behavior using only classes and their instances? What are the syntactical and conceptual trade-offs between the two approaches?