---
tags: 
  - process
  - python
  - decorator factory
  - closures
  - nested functions
  - metaprogramming
  - parameterized decorators
  - concept
source: 
  - "[[Writing Functions in Python]]"
related: 
  - "[[Python - Decorators]]"
  - "[[Python - Decorators with Arguments]]"
  - "[[Python - The Challenge of Parameterizing Decorators]]"
  - "[[Python - Syntax for Decorators with Arguments (@decorator(args))]]"
  - "[[Python - Decorator Factory Desugared (Manual Application)]]"
  - "[[Python 5 - Closures]]"
  - "[[Python - Nested Functions]]"
  - "[[Python - Functions as First-Class Objects]]"
  - "[[Python 5 - Scope]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Python - User-Defined Functions]]"
  - "[[Python - Function Argument Passing]]"
  - "[[Fundamental - Programming]]"
---
# Process: Decorator Factory Pattern

**Why This Matters:** This pattern transforms static decorators into flexible, reusable tools by allowing them to be configured with arguments at decoration time, promoting cleaner and more maintainable code.
## Goal & Analogy

> **Goal:** The Decorator Factory Pattern is a design pattern in Python used to create [[Python - Decorators with Arguments|decorators that can accept arguments]]. It solves [[Python - The Challenge of Parameterizing Decorators|the challenge of parameterizing decorators]] by introducing an extra layer of nesting: an outer function (the "factory") takes the desired arguments and returns the actual decorator, which in turn takes the function to be decorated.

_Analogy:_ _Think of a custom rubber stamp factory. You don't just get a generic "APPROVED" stamp. Instead, you call the factory and place an order: "I need a stamp that says 'URGENT' in red ink." The factory (the outer function, e.g., `run_n_times`) takes your specifications (the arguments, e.g., `n=3`) and manufactures a custom stamp (the `decorator` function) just for you. This custom stamp is then ready to be applied to any document (the `func` to be decorated) you want._

The factory produces the stamp, which is then used to mark documents. The factory itself never touches the document. In Python, the factory is the outer function, the stamp is the returned decorator, and the document is the function being decorated. **Where it breaks down:** In Python, the "factory" call and the "stamping" happen almost simultaneously at definition time, not as two distinct, temporally separate actions like in a real factory. The factory "builds" the decorator which is immediately applied.

```
```
run_n_times(n)  <-- The Factory: Receives arguments (e.g., n=3)
│
└─── returns ───► decorator(func)  <-- The Decorator: Receives the function to decorate
                 │
                 └─── returns ───► wrapper(*args, **kwargs) <-- The Wrapper: Replaces the original function
                                  │
                                  └─── Accesses 'n' from outer scope (closure)
                                  └─── Executes func(*args, **kwargs) 'n' times
```
```

## The Step-by-Step Process

### Prerequisites / Inputs

- **Factory Arguments**
    - These are the 'levers' that configure the decorator's behavior, passed when the decorator is applied.
    - *Example*: In a `@retry(attempts=3, delay=5)` decorator, `attempts` and `delay` are factory arguments.
    - *Impact*: They are captured by the closure and used within the final `wrapper` function to control its logic (e.g., how many times to loop, how long to wait between retries).

### The Steps

- **Step 1: Define the Factory Function**
    - Create an outer function that accepts the desired configuration arguments (e.g., `run_n_times(n)`). This function acts as the factory.
- **Step 2: Define the Decorator Inside the Factory**
    - Inside the factory, define a second function (e.g., `decorator(func)`). This is the actual decorator, and it will be returned by the factory.
- **Step 3: Define the Wrapper Inside the Decorator**
    - Inside the decorator function, define the `wrapper(*args, **kwargs)`. This is the function that will eventually replace the original decorated function.
- **Step 4: Implement Logic in the Wrapper**
    - The `wrapper` function contains the core logic. Crucially, it can access both the arguments passed to the factory (like `n`) from the enclosing scope and the arguments passed to the original function (`*args`, `**kwargs`).
- **Step 5: Return Values Appropriately**
    - The `wrapper` returns the result of calling the original function (`func`). The `decorator` returns the `wrapper`. The factory (`run_n_times`) returns the `decorator`.

##### Code Translation

```python
# --- Step 1: Define the Factory Function ---
def run_n_times(n):
    """A factory that creates a decorator to run a function n times."""
    print(f"Factory called with n={n}. Creating the decorator.")

    # --- Step 2: Define the Decorator Inside the Factory ---
    def decorator(func):
        """This is the actual decorator."""
        print(f"Decorator created. It will decorate '{func.__name__}'.")

        # --- Step 3: Define the Wrapper Inside the Decorator ---
        def wrapper(*args, **kwargs):
            """This wrapper executes the core logic."""
            print(f"Wrapper is about to run '{func.__name__}' {n} times.")
            # --- Step 4 & 5: Implement Logic and Call Original Func ---
            for i in range(n):
                result = func(*args, **kwargs)
            return result # Return the result of the last call
        
        return wrapper # Decorator returns the wrapper
    
    return decorator # Factory returns the decorator

# Example Usage using the @ syntax
@run_n_times(3)
def say_hello(name):
    print(f"Hello, {name}!")

say_hello("World")

# Output:
# Factory called with n=3. Creating the decorator.
# Decorator created. It will decorate 'say_hello'.
# Wrapper is about to run 'say_hello' 3 times.
# Hello, World!
# Hello, World!
# Hello, World!
```

### Deliverables / Outputs

The core idea behind the Decorator Factory Pattern is to solve [[Python - The Challenge of Parameterizing Decorators|the problem of passing arguments to a decorator]]. A standard decorator can only accept one argument: the function it's decorating. To add more parameters, we need another layer of function nesting. This pattern introduces an outer function—the "factory"—whose sole job is to accept the decorator's arguments and return the actual decorator function. This returned decorator then behaves like a normal one, accepting the target function and returning a wrapper. This three-level structure (factory -> decorator -> wrapper) allows information (the arguments) to flow from the outermost layer into the innermost wrapper via the principle of [[Python 5 - Closures|closures]].

## Context & Tradeoffs

### When to Use This Process

To enable the creation of configurable and reusable decorators by allowing them to accept arguments.

### Common Pitfalls & Tradeoffs

- **Pro: Enhanced Reusability**
    - The primary benefit. A single decorator factory can create many specialized decorator instances, promoting the [[SWE - DRY (Don't Repeat Yourself) Principle|DRY principle]]. For example, `@run_n_times(3)` and `@run_n_times(5)` are two different decorators created from the same factory code.
- **Con: Increased Complexity**
    - The three-level nesting (factory -> decorator -> wrapper) can be harder for beginners to read and debug compared to a simple, single-level decorator. It adds a layer of indirection.
- **Con: Slight Performance Overhead**
    - There is a marginal, usually negligible, overhead from the extra function call to the factory itself. This happens once at definition time, not on every call to the decorated function, so it's rarely a concern in practice.

## Connections

```
```
                  (Parent)
             Python - Decorators
                       ▲
                       │
       ┌───────────────┼──────────────────────────────────┐
       │               │                                  │
(Problem)     ┌───────────────────────────┐         (Mechanism)
Challenge of  │ Decorator Factory Pattern │     Python 5 - Closures
Parameterizing└───────────────────────────┘
Decorators               │
              ┌──────────┴──────────┐
              │                     │
(Syntax)      Syntax for Decorators │ with Arguments
              (@decorator(args))    │
                                    │
                                    (Application)
                                    Decorators with Arguments
```
```


- This pattern directly solves [[Python - The Challenge of Parameterizing Decorators|the challenge of parameterizing decorators]] by adding a necessary layer of abstraction.
- The resulting decorator is applied using the familiar [[Python - Syntax for Decorators with Arguments (@decorator(args))|@decorator(args) syntax]], which is syntactic sugar for this three-level function call.
- Understanding the [[Python - Decorator Factory Desugared (Manual Application)|manual application of a decorator factory]] reveals how the nested function calls work under the hood.
- The entire mechanism is powered by [[Python 5 - Closures|closures]], which allow the inner `wrapper` function to remember the arguments passed to the outer factory function.

## Deeper Questions

- You're building a framework with a decorator for API call retries, `@retry(attempts, backoff_strategy)`. How would you justify the added complexity of implementing this factory pattern to a junior developer, versus just hard-coding retry logic in each function, by framing it in terms of long-term business value like developer velocity and system reliability?
- If you have a decorator factory like `@cache(ttl=3600)` used on hundreds of functions across a large microservices application, how would you design a system to centrally manage and dynamically update the `ttl` values for all these functions without requiring a full redeployment of every service?
- What if Python's scope rules were changed so that closures didn't exist? How could you re-implement the decorator factory pattern to pass arguments from the 'factory' to the 'wrapper' using only class-based structures or global state, and what would be the major downsides of those approaches?