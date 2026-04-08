---
tags: 
  - core
  - python
  - metaprogramming
  - wrapper
  - higher-order_functions
  - syntactic_sugar
  - concept
source: 
  - "[[Writing Functions in Python]]"
related: 
  - "[[Python - Functions]]"
  - "[[Python - Nested Functions]]"
  - "[[Python - Timer Decorator]]"
  - "[[Python - Memoization]]"
  - "[[Python - Memoizing Decorator]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Python - Decorators & DRY Principle Relationship]]"
  - "[[Python - Generator Functions]]"
  - "[[Python - Scope]]"
  - "[[Python - User-Defined Functions]]"
  - "[[Python - Docstrings]]"
  - "[[Fundamental - Software Engineering]]"
---
# Core: Decorators

## Summary

>In Python, a decorator is a function that takes another function as an argument, adds some functionality to it, and returns a new, modified function. This is done without altering the source code of the original function, making it a powerful tool for adding common behaviors like logging, timing, or caching. This pattern is a prime example of adhering to the [[SWE - DRY (Don't Repeat Yourself) Principle|DRY principle]], as seen in applications like the [[Python - Timer Decorator|timer decorator]] or implementing [[Python - Memoization|memoization]].

**Why This Matters:** Decorators allow you to extend the functionality of existing functions in a clean, reusable, and non-invasive way, which is crucial for maintaining readable and scalable code.

_Analogy:_ _Think of a decorator as a professional gift wrapper. You have a present (your original function) that is complete on its own. The gift wrapper (the decorator) adds an extra layer of presentation and flair—like fancy paper, a ribbon, and a name tag—without changing the actual gift inside. When you hand over the present, you're handing over the wrapped package (the decorated function), which includes both the original item and the beautiful wrapping._

• **The Gift**: The original function with its core logic (e.g., a function that calculates a value).
• **The Gift Wrapper**: The decorator function that contains the additional logic (e.g., code to time the calculation).
• **The Wrapping Process**: Applying the decorator to the function using the `@` syntax.
• **The Wrapped Gift**: The new function object that, when called, executes both the decorator's logic and the original function's logic.
• **Where it breaks down:** A gift wrapper is purely aesthetic and is typically discarded to get to the gift. A decorator's 'wrapping' is functional and becomes an integral, permanent part of the function's execution every time it's called.

```
Before:
  my_function()  --->  Executes original code

After applying @decorator:
                             ┌──────────────────┐
  my_function()  --->  Calls │ Wrapper Function │
                             │ (in decorator)   │
                             └───────┬──────────┘
                                     │
                       1. Executes pre-code (e.g., logging)
                                     │
                                     ▼
                       2. Calls original_function()
                                     │
                                     ▼
                       3. Executes post-code (e.g., logging)
```

## Details

Decorators are a key feature in Python that allows for metaprogramming—writing code that modifies other code. They are essentially 'syntactic sugar' for a common design pattern where a function is passed as an argument to another function. This is possible because functions in Python are first-class objects, meaning they can be passed around just like any other variable. The `@` symbol provides a clean, readable way to apply this pattern. The primary motivation for using decorators is to avoid code repetition, a concept central to the [[Python - Decorators & DRY Principle Relationship|relationship between decorators and the DRY principle]].

#### Primary Goal

To add common, reusable functionality to multiple functions without modifying their source code, thereby promoting modularity and a clean separation of concerns.

#### Mechanism

- **Step 1: Define the Decorator Function**
    - Create an outer function that accepts one argument, which will be the function you intend to wrap (e.g., `func`).
- **Step 2: Define an Inner Wrapper Function**
    - Inside the decorator, define a nested function, often named `wrapper`. This function will contain the new code you want to execute before and/or after the original function runs. It must also call the original function (`func`) at the appropriate point.
- **Step 3: Return the Wrapper Function**
    - The outer decorator function must return the inner `wrapper` function object itself, without calling it (i.e., `return wrapper`, not `return wrapper()`).
- **Step 4: Apply the Decorator**
    - Use the `@decorator_name` syntax on the line directly above the definition of the function you want to modify. This is equivalent to writing `my_function = decorator_name(my_function)` after the function is defined.

##### Code Translation

```python
# --- Step 1: Define the decorator function ---
def simple_logger(func):
    # --- Step 2: Define an inner wrapper function ---
    def wrapper():
        print(f"Calling function: {func.__name__}") # Code before original function
        func() # Call the original function
        print(f"Finished function: {func.__name__}") # Code after original function

    # --- Step 3: Return the wrapper function ---
    return wrapper

# --- Step 4: Apply the decorator ---
@simple_logger
def say_hello():
    print("Hello, world!")

# Calling the decorated function
say_hello()

# Expected Output:
# Calling function: say_hello
# Hello, world!
# Finished function: say_hello
```

 [[Code - Decorators Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Parameterized Decorators**
    - Decorators can be made more flexible by accepting arguments. This requires an additional layer of nesting. The outermost function accepts the decorator's arguments (e.g., a log level or a file path) and returns the decorator itself, which then takes the function and returns the wrapper.
- **`functools.wraps`**
    - A common issue is that decorating a function overwrites its original metadata (like its name `__name__` and docstring `__doc__`). To preserve this, you can use the `@functools.wraps` decorator on your inner wrapper function. This is considered best practice.

#### Core Trade-offs

- **Pro: Reusability and DRY Principle**
    - Decorators allow you to write a piece of functionality once (e.g., timing, logging) and apply it to many functions, reducing code duplication.
- **Pro: Separation of Concerns**
    - They help keep core business logic clean and separate from cross-cutting concerns like monitoring, caching, or authentication.
- **Con: Increased Debugging Complexity**
    - When an error occurs, the traceback will include the decorator's wrapper function, which can make it slightly harder to pinpoint the source of the problem if you're not familiar with the pattern.
- **Con: Potential for Obscured Metadata**
    - Without using `functools.wraps`, the decorated function loses its original identity (name, docstring), which can be problematic for introspection and documentation tools.

## Connections

```
                      (Parent)
                     Functions
                         ▲
                         │
           ┌─────────────┼──────────────┐
           │             │              │
(Principle)     ┌──────────────────┐     (Technique)
   DRY          │    Decorators    │     Memoization
                └──────────────────┘
                           │
                ┌──────────┴──────────┐
                │                     │
         Timer Decorator     Memoizing Decorator
           (Example)             (Example)
```

### Parent Concept

Decorators are a powerful application built upon the concept of [[Python - Functions|Python functions]] being first-class objects, often utilizing [[Python - Nested Functions|nested functions]] to create the wrapping mechanism.

### Child Concepts

- A common practical application is the [[Python - Timer Decorator|timer decorator]], which measures and reports the execution time of a function.
- Another powerful use case is the [[Python - Memoizing Decorator|memoizing decorator]], which caches function results to avoid redundant computations.

### Related Concepts 

- Decorators are a primary tool for implementing the [[SWE - DRY (Don't Repeat Yourself) Principle|DRY (Don't Repeat Yourself) principle]] by abstracting away repetitive boilerplate code.
- The relationship between decorators and DRY is so strong that it's a core design pattern, as explored in [[Python - Decorators & DRY Principle Relationship|the connection between decorators and the DRY principle]].
- The technique of [[Python - Memoization|memoization]] is frequently implemented using decorators to create a clean, reusable caching mechanism.
## Questions

- You're tasked with improving the performance of a critical data processing pipeline. You could use a memoization decorator on several functions, which would speed them up but significantly increase memory usage. How would you decide which functions to decorate, and how would you explain the memory cost vs. speed gain trade-off to a project manager concerned about cloud infrastructure bills?
- Imagine you've deployed a web service where many endpoint functions are wrapped with a custom `@log_request` decorator. If this decorator starts failing or becomes a performance bottleneck, the entire service could be affected. How would you design the decorator and the surrounding system to be resilient to such failures, perhaps by allowing it to be disabled dynamically without a full redeployment?
- What if the Python `@` syntax for decorators was removed from the language? How would you replicate the decorator pattern to add timing or logging to 100 different functions, and what would be the major drawbacks of your approach compared to the standard syntax?