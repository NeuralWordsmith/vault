---
tags: 
  - major_core
  - python
  - metaprogramming
  - higher-order_functions
  - wrappers
  - function_composition
  - closures
  - concept
source: 
  - "[[Writing Functions in Python]]"
related: 
  - "[[Python - Functions]]"
  - "[[Python - Nested Functions]]"
  - "[[Python - Scope]]"
  - "[[Python - Decorator Mechanics (Function Wrapping)]]"
  - "[[Python - Decorators & Closures Relationship]]"
  - "[[Python - Decorator Syntactic Sugar (@)]]"
  - "[[Python - Generator Functions]]"
  - "[[Python - Objects]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[SWE - Do One Thing Principle]]"
  - "[[Python - Error Handling]]"
  - "[[Python - Docstrings]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Python - User-Defined Functions]]"
---
# Major Core: Decorators

## Summary

> A decorator is a design pattern in Python that allows a user to add new functionality to an existing object (like a function) without modifying its structure. They are a form of metaprogramming, essentially acting as functions that take another function as an argument, add some functionality inside a wrapper, and then return the enhanced function. This process of wrapping one function inside another is the core of [[Python - Decorator Mechanics (Function Wrapping)]].

**Why This Matters:** Decorators allow you to extend or modify the functionality of functions without permanently altering their source code, promoting cleaner, more reusable, and maintainable programs.

_Analogy:_ _Think of a decorator as a professional gift-wrapping service. Your original function is the gift inside a plain box—it has a core purpose. The gift-wrapping service is the decorator. You hand them your box, and they 'wrap' it with decorative paper, a ribbon, and a name tag. The gift itself hasn't changed, but its presentation and some surrounding functionality (like identifying the recipient) have been enhanced. You can even apply multiple layers of wrapping (stacking decorators) for different effects._

**Where it breaks down:** The gift-wrapping analogy implies the changes are purely cosmetic. A Python decorator is far more powerful; it can fundamentally alter the gift. It could inspect the gift (modify inputs), swap it for a different one (modify outputs), or even decide not to give the gift at all (e.g., an authentication decorator that blocks execution).

```
Input -> [Decorator Wrapper: Pre-processing] -> [Original Function] -> [Decorator Wrapper: Post-processing] -> Output

   (Arguments)                 (Original Logic)                  (Return Value)
       │                           │                                 │
       ▼                           ▼                                 ▼
┌──────────────┐             ┌───────────┐             ┌───────────────┐
│ Wrapper Code │── calls ──>│  func()   │── returns ──>│ Wrapper Code  │
│ (Before)     │             └───────────┘             │ (After)       │
└──────────────┘                                       └───────────────┘
```

## Details

Based on the idea that functions are first-class objects in Python, a decorator is a wrapper you can place around a function to change its behavior. This means functions can be passed as arguments, returned from other functions, and assigned to variables. Decorators leverage this by taking a function as input, defining a new nested function that adds behavior before and/or after calling the original, and then returning that new function. This powerful pattern is built upon the concepts of [[Python - Nested Functions|nested functions]] and closures, a relationship explored in [[Python - Decorators & Closures Relationship]]. The primary use case is to cleanly separate concerns, like adding logging, timing, or authentication checks to a function without cluttering its core logic.

#### Primary Goal

To add functionality to an existing function in a reusable and non-invasive way, adhering to the [[SWE - DRY (Don't Repeat Yourself) Principle]].

#### Mechanism

- **How it Works:** A decorator is fundamentally a higher-order function that follows a specific pattern:
    1. **Define the Decorator:** Create an outer function that accepts one argument, which will be the function to be decorated (e.g., `original_function`).
    2. **Define the Wrapper:** Inside the decorator, define a nested function (the 'wrapper'). This function will contain the new logic.
    3. **Add Pre-Action Code:** Inside the wrapper, place any code you want to run *before* the original function is called (e.g., logging the start time).
    4. **Call the Original:** The wrapper then calls the `original_function`, passing along any arguments it received and capturing its return value.
    5. **Add Post-Action Code:** After the original function executes, you can add code to run *afterward*, potentially modifying the captured return value.
    6. **Return the Wrapper:** The outer decorator function returns the wrapper function object, effectively replacing the original function with this new, enhanced version.

```python
# --- Step 1: Define the Decorator ---
def my_decorator(func):
    # --- Step 2: Define the Wrapper ---
    def wrapper():
        # --- Step 3: Add Pre-Action Code ---
        print("Something is happening before the function is called.")
        
        # --- Step 4: Call the Original ---
        func() # Call the original function
        
        # --- Step 5: Add Post-Action Code ---
        print("Something is happening after the function is called.")
    
    # --- Step 6: Return the Wrapper ---
    return wrapper

# This is how you apply the decorator manually
def say_whee():
    print("Whee!")

# Decorate the function by reassigning its name to the decorated version
say_whee = my_decorator(say_whee)

# Now calling say_whee() executes the wrapper's logic
say_whee()

# Output:
# Something is happening before the function is called.
# Whee!
# Something is happening after the function is called.
```

 [[Code - Decorators Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Decorator Arguments:**
    - To make decorators more flexible, they can be designed to accept their own arguments. This requires an extra layer of nesting: a function factory that takes the arguments and returns the decorator, which in turn decorates the function.
    - Example: A `@repeat(num_times=3)` decorator would require an outer `repeat` function that accepts `num_times`, which then returns the actual decorator function.

#### Core Trade-offs

- **Pro: Code Reusability (DRY):**
    - Centralizes common functionality (e.g., logging, timing, caching, authentication) in one place instead of repeating it in every function.
- **Pro: Separation of Concerns:**
    - Keeps the core business logic of a function clean and separate from cross-cutting concerns, making the code easier to read and maintain.
- **Con: Increased Complexity & Obfuscation:**
    - Can make code harder to debug because the function being called (`say_whee`) is not the function you wrote but a wrapper. This can make call stacks deeper and more confusing.
- **Con: Function Metadata Obscured:**
    - By default, a decorator replaces the original function's metadata (like its `__name__` and `__doc__` docstring) with the wrapper's metadata. This can be fixed by using the `@functools.wraps` decorator inside your custom decorator.

## Connections

```
                      (Parent)
                 Higher-Order Functions
                           ▲
                           │
           ┌───────────────┼────────────────────────────┐
           │               │                            │
(Relies On)       ┌───────────────────────────┐      (Mechanism)
Closures          │        Decorators         │      Function Wrapping
                  └───────────────────────────┘
                             │
                  ┌──────────┴──────────┐
                  │                     │
             (Use Case)           (Use Case)
               Logging               Timing
```

### Parent Concept

Decorators are a specific application of [[Python - Functions|higher-order functions]] in Python, which are functions that can operate on other functions (by taking them as arguments or returning them).

### Child Concepts

- A common use case is [[Python - Decorators for Logging|logging decorators]], which automatically add print or logging statements to track function calls, inputs, and outputs.
- Another practical application is [[Python - Decorators for Timing|timing decorators]], which measure the execution time of a function to help identify performance bottlenecks.
- A powerful built-in example is [[Python - Decorators for Caching|caching decorators]] (like `functools.lru_cache`), which store the results of expensive function calls to avoid re-computation for the same inputs.

### Related Concepts 

- The underlying mechanism of a decorator is explained in detail in [[Python - Decorator Mechanics (Function Wrapping)]].
- Decorators rely heavily on the concept of [[Python - Decorators & Closures Relationship|closures]], where a nested function remembers and has access to the enclosing scope's variables even after the outer function has finished executing.
- The common `@` symbol is a convenient shorthand, or [[Python - Decorator Syntactic Sugar (@)|syntactic sugar]], for applying a decorator to a function definition.
- This pattern strongly supports the [[SWE - DRY (Don't Repeat Yourself) Principle]] by abstracting away repetitive setup or teardown code.
- Decorators can be seen as a way to enforce the [[SWE - Do One Thing Principle]] by separating cross-cutting concerns from the main function logic.
## Questions

- You're asked to add performance monitoring to 50 critical API endpoints. You could manually add timing code to each, or you could write a single timing decorator. How would you justify the initial time investment of creating a robust, well-tested decorator to a project manager focused on short-term deadlines?
- Imagine a caching decorator (`@lru_cache`) is applied to a function that fetches user profile data in a large-scale web application. What are the potential memory-related risks as the number of users scales to millions, and how would you design the system to mitigate them?
- What if Python's `@` syntax was removed from the language? How would you achieve the same functional composition and code modification patterns that decorators provide, and what would be the impact on code readability and maintainability?
