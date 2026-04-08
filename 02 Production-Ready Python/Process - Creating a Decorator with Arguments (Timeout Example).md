---
tags:
  - process
  - python
  - higher-order functions
  - closures
  - metaprogramming
  - parameterized decorators
  - concept
source:
  - "[[Writing Functions in Python]]"
related:
  - "[[Python - Decorators]]"
  - "[[Python 5 - Closures]]"
  - "[[Python - Nested Functions]]"
  - "[[Python - Functions as First-Class Objects]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Python - Flexible Timeout Decorator Factory]]"
  - "[[Python - Hardcoded Timeout Decorator]]"
  - "[[Python - signal Module for Timeouts]]"
  - "[[Python - Functions]]"
  - "[[Python 5 - Scope]]"
  - "[[Python - Function Argument Passing]]"
  - "[[Python - functools Module]]"
  - "[[Python - Metaclasses]]"
  - "[[Python - Classes]]"
---
# Process: Decorator Factory

**Why This Matters:** Decorator factories enable the creation of highly reusable and configurable decorators, which is essential for writing clean, DRY (Don't Repeat Yourself) code in complex applications.
## Goal & Analogy

> **Goal:** A decorator factory is a higher-order function that takes arguments and returns a decorator. This pattern allows you to customize the behavior of the decorator on a per-use basis, making it much more flexible than a hardcoded one like in the [[Python - Hardcoded Timeout Decorator]]. It leverages the concept of [[Python 5 - Closures]] to "remember" the arguments passed to the factory, making them available to the decorator's logic when it's eventually applied.

_Analogy:_ _Think of a custom stamp maker. You don't just get a single, fixed stamp. Instead, you go to the stamp maker (the decorator factory) and give them your specific text and design (the arguments, like `n_seconds`). The maker then produces a unique, physical stamp (the decorator) just for you. You can then use this specific stamp to mark any document (the function to be decorated) you want with that custom design._

The stamp maker is the `timeout()` factory function. The custom text/design you provide are the arguments like `n_seconds`. The physical stamp they create is the `decorator` function. The document you stamp is the `func` being decorated. The act of stamping is applying the decorator with `@`.

*   **Where it breaks down:** A physical stamp is static once made. A decorator returned by a factory is a closure that remains dynamically linked to the environment where it was created, retaining access to the factory's arguments.

```
timeout(n_seconds) ----------------> The Factory (receives arguments)
    │
    └── returns decorator(func) ---> The Decorator (receives function)
            │
            └── returns wrapper(*args, **kwargs) -> The Wrapper (executes logic)
                    │
                    ├── Access to n_seconds (from factory's scope via closure)
                    ├── Access to func (from decorator's scope)
                    └── Access to *args, **kwargs (from its own scope)
```

## The Step-by-Step Process

### Prerequisites / Inputs

- **Factory Arguments**
    - These are the 'levers' that customize the decorator's behavior. They are passed when the decorator is applied (`@timeout(5)`), not when the decorated function is called.
    - In the `timeout(n_seconds)` example, `n_seconds` is the parameter. It's 'frozen' into the returned decorator's environment via closure, making it accessible to the `wrapper` function.

### The Steps

- **Step 1: Define the Factory Function**
    - Create an outer function that accepts parameters to customize the decorator's behavior. In our example, this is `timeout(n_seconds)`. This function is the factory itself.
- **Step 2: Define the Decorator Inside the Factory**
    - Inside the factory, define the actual decorator function (e.g., `decorator(func)`). This function will be returned by the factory.
- **Step 3: Define the Wrapper Inside the Decorator**
    - Inside the decorator, define the `wrapper(*args, **kwargs)` function. This is where the core logic resides. Crucially, this wrapper has access to both the arguments of the original function (`func`) and the parameters passed to the factory (`n_seconds`) because of closure.
- **Step 4: Return the Nested Functions**
    - The factory returns the decorator, and the decorator returns the wrapper. This chain of returns is what makes the pattern work. A complete implementation of this is available in the [[Python - Flexible Timeout Decorator Factory]].

##### Code Translation

```python
import signal
import functools

# --- Step 1: Define the Factory Function ---
def timeout(n_seconds):
    """
    A factory that returns a decorator to limit a function's execution time.
    """
    # --- Step 2: Define the Decorator Inside the Factory ---
    def decorator(func):
        @functools.wraps(func)
        # --- Step 3: Define the Wrapper Inside the Decorator ---
        def wrapper(*args, **kwargs):
            # Define a handler for the alarm signal
            def _handle_timeout(signum, frame):
                raise TimeoutError(f"Function {func.__name__} timed out after {n_seconds} seconds!")

            # Set the alarm using the n_seconds argument from the factory
            signal.signal(signal.SIGALRM, _handle_timeout)
            signal.alarm(n_seconds)

            try:
                # Call the original function
                result = func(*args, **kwargs)
            finally:
                # Cancel the alarm
                signal.alarm(0)
            return result
        # --- Step 4: Return the Wrapper ---
        return wrapper
    # --- Step 4: Return the Decorator ---
    return decorator

# Example Usage:
@timeout(5) # The factory is called with an argument, which returns the actual decorator
def slow_function():
    import time
    print("Starting slow function...")
    time.sleep(10)
    print("Slow function finished.")

try:
    slow_function()
except TimeoutError as e:
    print(e)
```

### Deliverables / Outputs

The core idea of a decorator factory is to add a layer of abstraction. Instead of defining a decorator directly, we define a function that *builds* and returns a decorator. This outer function, the "factory," can accept arguments. These arguments are then available to the inner decorator and its wrapper function via closure, allowing for dynamic and configurable behavior. This is a powerful technique for adhering to the [[SWE - DRY (Don't Repeat Yourself) Principle]] by avoiding the creation of multiple, slightly different decorators.

## Context & Tradeoffs

### When to Use This Process

To create flexible, reusable decorators whose behavior can be customized with arguments at the time of application.

### Common Pitfalls & Tradeoffs

- **Pro: Flexibility and Reusability (DRY)**
    - The primary benefit is creating highly configurable decorators. Instead of writing `timeout_5s`, `timeout_10s`, etc., you have one `timeout()` factory. This strongly adheres to the [[SWE - DRY (Don't Repeat Yourself) Principle]].
- **Con: Increased Complexity**
    - The triple-nested function structure (`factory -> decorator -> wrapper`) can be harder to read and debug for those unfamiliar with closures and higher-order functions.
    - It adds a layer of indirection that can obscure the flow of execution for developers new to the pattern.

## Connections

```
                  (Parent)
             Python - Decorators
                       ▲
                       │
       ┌───────────────┼────────────────────────────┐
       │               │                            │
(Foundation)  ┌───────────────────────────┐      (Contrast)
Python - Closures │    Decorator Factory      │  [[Example - Hardcoded Timeout Decorator|Hardcoded Decorator]]
              └───────────────────────────┘
                       │
                       ▼
                   (Example)
    [[Example - Flexible Timeout Decorator Factory|Flexible Timeout Decorator]]
```


- The decorator factory pattern is a direct application of [[Python 5 - Closures]], where the inner decorator 'remembers' the arguments passed to the outer factory function.
- It provides a flexible alternative to a static decorator, as seen in the [[Python - Hardcoded Timeout Decorator]].
- A practical implementation of this pattern is shown in the [[Python - Flexible Timeout Decorator Factory]], which uses the [[Python - signal Module for Timeouts]] to enforce execution time limits.
- This concept is fundamentally built upon the idea of [[Python - Nested Functions]] and functions being [[Python - Functions as First-Class Objects]].

## Deeper Questions

- You're building a web framework that needs decorators for rate-limiting (`@ratelimit(requests=100, per_minutes=1)`), caching (`@cache(ttl=300)`), and authentication (`@requires_auth(role='admin')`). How would you justify the initial development overhead of creating these as decorator factories versus simpler, hardcoded decorators to a project manager focused on short-term deadlines?
- Imagine our `@timeout(n)` decorator factory is used heavily in a multi-threaded application. What potential issues could arise from using the `signal` module in this context, and how would you re-architect the factory to be thread-safe?
- What if Python's syntax was changed to forbid nested function definitions? How could you achieve the same outcome of a configurable decorator using only classes and their instances?