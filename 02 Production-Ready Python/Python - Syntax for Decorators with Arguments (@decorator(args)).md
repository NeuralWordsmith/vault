---
tags: 
  - core
  - python
  - decorator factory
  - parameterized decorator
  - syntactic sugar
  - closures
  - higher-order functions
  - concept
source: 
  - "[[Writing Functions in Python]]"
related: 
  - "[[Python - Decorators]]"
  - "[[Python - Decorator Factory Pattern]]"
  - "[[Python - The Challenge of Parameterizing Decorators]]"
  - "[[Python - Creating a Decorator with Arguments (Decorator Factory)]]"
  - "[[Python - Decorator Factory Desugared (Manual Application)]]"
  - "[[Python - Closures]]"
  - "[[Python - Nested Functions]]"
  - "[[Python - Functions as First-Class Objects]]"
  - "[[Python - Scope]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Python - Functions]]"
---
# Core: Decorators with Arguments Syntax

## Summary

>When a decorator name is followed by parentheses, like `@my_decorator(arg)`, it signifies a different execution order. Instead of directly applying the decorator, Python first calls `my_decorator(arg)`. This call must return the *actual* decorator function, which is then applied to the decorated function. This pattern is known as the [[Python - Decorator Factory Pattern|Decorator Factory Pattern]].

**Why This Matters:** Understanding this syntax is crucial because the parentheses are not merely stylistic; they are the trigger that executes the outer 'factory' function, which is the core mechanism for creating configurable and reusable decorators.

_Analogy:_ _Think of it like ordering a custom coffee. A simple decorator (`@black_coffee`) is like asking for a standard item. A decorator with arguments (`@custom_coffee(shots=3, milk='oat')`) is like giving a specific order to the barista. The barista (the 'decorator factory') takes your arguments (`shots=3`, `milk='oat'`) and then prepares a specific, customized coffee (the actual decorator) just for you. This custom coffee is then used to fill your cup (decorate your function)._

**Where it breaks down:** The coffee analogy is static; you place one order and get one coffee. In Python, the decorator factory is a function that can be called dynamically with different arguments at different times, programmatically generating an infinite variety of decorators, making it far more powerful than a coffee shop menu.

```
Execution Flow of `@decorator(args)`:

1. Interpreter sees: `@decorator(args)`
                  │
                  ▼
2. Immediate Call:  `result = decorator(args)`
                  │
                  ▼
3. Factory Returns: `result` is now the actual decorator function (e.g., `actual_decorator`)
                  │
                  ▼
4. Application:     `target_func = actual_decorator(target_func)`
```

## Details

The core idea behind the `@decorator(args)` syntax is to add a layer of indirection to solve [[Python - The Challenge of Parameterizing Decorators|the challenge of parameterizing decorators]]. The parentheses signal an immediate function call. The function being called is not the decorator itself, but a 'factory' that *produces* a decorator. The arguments passed in the parentheses are used by the factory to configure the behavior of the decorator it creates and returns. This mechanism relies heavily on the concept of [[Python - Closures|closures]] to retain the arguments for later use.

#### Primary Goal

To provide a clean, readable syntax for passing configuration arguments to a decorator, enabling the creation of flexible and reusable code.

#### Mechanism

- **How it Works:** The syntax desugars into a nested function call.
    - **1. Factory Call:** The Python interpreter first sees `@run_n_times(3)` and immediately executes the function call `run_n_times(3)`. This is the 'factory' being called.
    - **2. Decorator Return:** The `run_n_times(3)` call must return a function. This returned function is the *actual* decorator (e.g., a function named `actual_decorator`).
    - **3. Decorator Application:** Python then applies this returned decorator to the target function. This is equivalent to `my_func = actual_decorator(my_func)`.

##### Code Translation

```python
# This is the decorator factory. It is called first.
def run_n_times(n):
    """Takes an argument `n` and returns a decorator."""
    # This is the actual decorator that the factory returns.
    def decorator(func):
        """Takes a function and returns a wrapper."""
        # The wrapper has access to `n` via closure.
        def wrapper(*args, **kwargs):
            print(f"Running {n} times...")
            for _ in range(n):
                func(*args, **kwargs)
        return wrapper
    return decorator

# --- The Syntax in Action ---
# 1. `run_n_times(3)` is called.
# 2. It returns the `decorator` function.
# 3. The returned `decorator` is applied to `say_hello`.
@run_n_times(3)
def say_hello():
    print("Hello!")

say_hello()

# Expected Output:
# Running 3 times...
# Hello!
# Hello!
# Hello!
```

 [[Code - Decorators with Arguments Syntax Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Decorator Arguments:** These are the values passed inside the parentheses (e.g., `3` in `@run_n_times(3)`).
    - These arguments are captured by the outermost function (the factory) and are made available to the inner decorator and wrapper functions via a [[Python - Closures|closure]].
    - They can be of any data type: integers, strings, booleans, or even other functions.

#### Core Trade-offs

- **Pro: Configurability & Reusability:** This syntax allows a single decorator to be used in many different ways, promoting the [[SWE - DRY (Don't Repeat Yourself) Principle|DRY principle]]. For example, `@retry(attempts=5, delay=2)` is much more flexible than having separate `@retry_5_times` and `@retry_with_delay` decorators.
- **Con: Increased Complexity:** It introduces an extra layer of function nesting. This can make the code harder to read for beginners and can slightly complicate debugging, as the call stack will be deeper.

## Connections

```
          (Parent)
      Python - Decorators
             ▲
             │
┌────────────┼──────────────────────────────────────────────────────────┐
│            │                                                          │
(Mechanism)  ┌──────────────────────────────────┐                     (Problem)
 Closures    │ Decorators with Arguments Syntax │   The Challenge of Parameterizing Decorators
             └──────────────────────────────────┘
                          │
                          ▼
                      (Pattern)
             Decorator Factory Pattern
```

### Parent Concept

This syntax is a specific feature of the broader concept of [[Python - Decorators|Python Decorators]].

### Child Concepts



### Related Concepts 

- This syntax is the solution to [[Python - The Challenge of Parameterizing Decorators|the challenge of creating configurable decorators]].
- It is the enabling syntax for the [[Python - Decorator Factory Pattern|Decorator Factory Pattern]], which is the standard way to implement this feature.
- The manual, step-by-step execution of this syntax is demonstrated in [[Python - Decorator Factory Desugared (Manual Application)|Decorator Factory Desugared (Manual Application)]].
- The underlying mechanism that allows the inner functions to remember the arguments passed to the outer function is the [[Python - Closures|Python Closure]].
## Questions

- You need a decorator to handle API request retries. How would you decide between hard-coding the number of retries in the decorator name (e.g., `@retry_3_times`) versus creating a parameterized decorator (`@retry(n=3, delay=1)`), and what are the long-term maintenance and business continuity implications of each choice?
- If you have a parameterized decorator like `@cache(ttl=3600)` used across hundreds of microservices, how would you design a system to dynamically update the `ttl` argument for all services from a central configuration without requiring a full redeployment of each service?
- What if Python's `@` syntax didn't support parentheses for arguments? How could you achieve the same outcome of a parameterized decorator using only standard function calls, and what would the code look like on the line before a function definition?