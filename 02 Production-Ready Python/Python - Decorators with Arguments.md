---
tags: 
  - major_core
  - python
  - decorator factory
  - parameterized decorators
  - function nesting
  - closures
  - metaprogramming
  - concept
source: 
  - "[[Writing Functions in Python]]"
related: 
  - "[[Python - Decorators]]"
  - "[[Python - Decorator Factory Pattern]]"
  - "[[Python - The Challenge of Parameterizing Decorators]]"
  - "[[Python - Creating a Decorator with Arguments (Decorator Factory)]]"
  - "[[Python - Syntax for Decorators with Arguments (@decorator(args))]]"
  - "[[Python - Decorator Factory Desugared (Manual Application)]]"
  - "[[Python 5 - Closures]]"
  - "[[Python - Nested Functions]]"
  - "[[Python - Functions as First-Class Objects]]"
  - "[[Python - User-Defined Functions]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Python - *args and **kwargs]]"
  - "[[Python - Scope]]"
---
# Major Core: Decorators with Arguments

## Summary

> Standard decorators are static; they always do the same thing. To make them flexible, we need to pass them arguments. This is achieved by adding an extra layer of function nesting, a pattern known as a [[Python - Decorator Factory Pattern|Decorator Factory]]. This outer function, or 'factory', takes the desired arguments and returns a customized decorator, which is then applied to the target function.

**Why This Matters:** This technique allows for the creation of highly reusable and configurable decorators, drastically reducing code duplication by letting a single decorator adapt to multiple, specific use cases.

_Analogy:_ _Think of a custom rubber stamp maker. A standard decorator is like a pre-made 'APPROVED' stamp—it always leaves the same mark. A decorator with arguments is like the stamp maker machine itself. You go to the machine (the decorator factory) and give it instructions: 'I want a stamp that says 'URGENT' in red ink' (these are the arguments). The machine then produces a custom stamp just for you (the actual decorator). You can then take this specific stamp and apply it to any document you want (the function being decorated)._

• **The Stamp Maker Machine:** The outer factory function that accepts arguments (e.g., `run_n_times(n)`).
• **Your Instructions ('URGENT', red ink):** The arguments passed to the factory (e.g., `n=3`).
• **The Custom Stamp Produced:** The inner decorator function that the factory returns.
• **The Document to be Stamped:** The function being decorated (e.g., `greet()`).
• **The Stamped Document:** The new functionality provided by the wrapper.

**Where it breaks down:** The analogy involves physical objects. In Python, the 'stamp maker' (factory) is a function that dynamically creates and returns *another function* in memory, a concept that doesn't have a perfect physical equivalent.

```
run_n_times(n)        <-- Factory: Receives arguments (e.g., n=3)
|
└── returns decorator()
    |
    └── decorator(func)   <-- Decorator: Receives function to decorate (e.g., say_hello)
        |
        └── returns wrapper()
            |
            └── wrapper(*args, **kwargs)  <-- Wrapper: Has access to 'n' and 'func'.
                                              Executes the core logic.
```

## Details

While standard decorators are powerful, their behavior is fixed. This presents [[Python - The Challenge of Parameterizing Decorators|a challenge]] when you need slight variations of the same logic, such as a decorator that repeats a function call a variable number of times. The solution is to wrap the decorator in an outer function. This outer function acts as a 'factory' that takes configuration arguments and manufactures a tailored decorator on the fly. This structure relies on [[Python 5 - Closures|closures]] to ensure the innermost function (the wrapper) has access to the arguments passed to the outermost function (the factory).

#### Primary Goal

To make decorators configurable and reusable by allowing them to accept arguments that modify their behavior.

#### Mechanism

- **The Three-Layer Structure:** Decorators with arguments are built with three nested functions.
    - **1. The Factory Layer:** The outermost function. It accepts the arguments that will configure the decorator (e.g., `n` in `run_n_times(n)`). Its sole purpose is to return the actual decorator function.
    - **2. The Decorator Layer:** The middle function. This is what a standard decorator looks like. It takes one argument: the function to be decorated.
    - **3. The Wrapper Layer:** The innermost function. This is where the enhanced functionality is implemented. It has access to both the arguments from the factory layer (via closure) and the original function from the decorator layer. It executes the custom logic and calls the original function.

```python
import functools

def run_n_times(n): # --- 1. The Factory Layer (receives arguments) ---
    """A factory that takes an argument `n` and returns a decorator."""
    
    def decorator(func): # --- 2. The Decorator Layer (receives the function) ---
        """The actual decorator that will be returned by the factory."""
        
        @functools.wraps(func) # Preserves original function metadata
        def wrapper(*args, **kwargs): # --- 3. The Wrapper Layer (executes the logic) ---
            """The wrapper has access to 'n' from the factory's scope."""
            print(f"Running {func.__name__} {n} times...")
            for i in range(n):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

# Using the decorator with an argument
@run_n_times(3)
def say_hello(name):
    """Prints a simple greeting."""
    print(f"Hello, {name}!")

say_hello("Alice")

# Expected Output:
# Running say_hello 3 times...
# Hello, Alice!
# Hello, Alice!
# Hello, Alice!
```

 [[Code - Decorators with Arguments Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Configuration Arguments:** These are the parameters passed to the outermost factory function.
    - In the `run_n_times(n)` example, the parameter is `n`.
    - Its value directly controls the behavior of the wrapper function (e.g., the number of iterations in the `for` loop).
    - You can pass any number of positional or keyword arguments to the factory, just like any other Python function.

#### Core Trade-offs

- **Pro (Flexibility & Reusability):** This pattern is extremely powerful for creating generic, reusable tools. A single decorator factory can replace dozens of similar, hardcoded decorators, adhering to the [[SWE - DRY (Don't Repeat Yourself) Principle|DRY principle]].
- **Con (Increased Complexity):** The triple-nested function structure can be conceptually challenging for developers new to the pattern. It adds a layer of indirection that can make the code harder to read and reason about at first glance.
- **Con (Debugging):** Stack traces become longer and more complex. An error inside the wrapper will trace back through the wrapper, the decorator, and the factory, which can be confusing during debugging.

## Connections

```
          (Parent)
         Decorators
              ▲
              │
┌─────────────┼──────────────┐
│             │              │
(Relies On)  ┌───────────────────────────┐  (Is A)
 Closures    │ Decorators with Arguments │  Decorator Factory
             └───────────────────────────┘
              │
              │
       (Enables Syntax)
              │
  @decorator(args) Syntax
```

### Parent Concept

This concept is a direct and powerful extension of [[Python - Decorators]], adding a layer of configuration and reusability.

### Child Concepts



### Related Concepts 

- This implementation is formally known as the [[Python - Decorator Factory Pattern|Decorator Factory Pattern]].
- It directly solves [[Python - The Challenge of Parameterizing Decorators|the challenge of making decorators configurable]] with custom parameters.
- The `@decorator(args)` syntax is the standard, elegant way to apply this pattern, as detailed in [[Python - Syntax for Decorators with Arguments (@decorator(args))|syntax for decorators with arguments]].
- Understanding how this works under the hood is clarified by examining the [[Python - Decorator Factory Desugared (Manual Application)|desugared, manual application]] of the pattern.
- The entire mechanism is fundamentally enabled by [[Python 5 - Closures|closures]], which allow the inner wrapper to remember the arguments passed to the outer factory.
## Questions

- Imagine a web framework with decorators for rate-limiting (`@rate_limit(requests=100, per_minute=1)`), caching (`@cache(ttl=300)`), and authentication (`@require_auth(role='admin')`). How would you justify the initial development time and complexity of creating these flexible, argument-based decorators to a project manager, compared to writing simpler, hardcoded decorators for each specific case?
- If you have a decorator with an argument that connects to an external service (e.g., `@log_to_service(endpoint='http://logs.service.com')`), what are the potential failure modes and performance bottlenecks? How would you design the decorator to be resilient to network failures or service downtime without crashing the decorated function?
- What if Python's syntax was changed to forbid nested functions entirely? How could you achieve the same outcome of a configurable decorator using only classes and their `__init__` and `__call__` methods?
