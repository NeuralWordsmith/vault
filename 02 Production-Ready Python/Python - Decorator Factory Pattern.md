---
tags: 
  - core
  - python
  - decorator_factory
  - closures
  - metaprogramming
  - higher_order_functions
  - parameterized_decorators
  - concept
source: 
  - "[[Writing Functions in Python]]"
related: 
  - "[[Python - Decorators]]"
  - "[[Python - Closures]]"
  - "[[Python - Nested Functions]]"
  - "[[Python - Functions as First-Class Objects]]"
  - "[[Python - The Challenge of Parameterizing Decorators]]"
  - "[[Python - Creating a Decorator with Arguments (Decorator Factory)]]"
  - "[[Python - Syntax for Decorators with Arguments (@decorator(args))]]"
  - "[[Python - Decorator Factory Desugared (Manual Application)]]"
  - "[[Python - Decorators with Arguments]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Python - Scope]]"
  - "[[Python - Function Argument Passing]]"
  - "[[Fundamental - Software Engineering]]"
---
# Core: Decorator Factory Pattern

## Summary

>The Decorator Factory Pattern is a design pattern in Python where a function, instead of being a decorator itself, returns a decorator. This outer function—the 'factory'—accepts arguments that configure the behavior of the decorator it produces, effectively solving [[Python - The Challenge of Parameterizing Decorators|the challenge of creating decorators with arguments]].

**Why This Matters:** This pattern transforms decorators from static add-ons into configurable tools, dramatically increasing their reusability and power across a codebase.

_Analogy:_ _Imagine a custom stamp factory. You don't just buy a generic 'Approved' stamp off the shelf. Instead, you go to the factory (the decorator factory) and give it specifications, like 'Department: Sales' and 'Date: 2026-02-23' (the arguments). The factory then manufactures and gives you a unique, custom stamp (the decorator) built to your exact needs. You can then take this specific stamp and apply it to any document (the function) you want._

• **The Stamp Factory:** The decorator factory function (`def my_factory(arg1, arg2)`).
• **Your Specifications:** The arguments passed to the factory (`arg1`, `arg2`).
• **The Custom Stamp:** The actual decorator function returned by the factory.
• **The Document:** The function you apply the stamp to (`@my_factory(arg1, arg2)`).
• **Where it breaks down:** The analogy implies a physical, one-time creation. In code, the factory is called every time the decorated function is defined, creating a new decorator and closure each time, which is a subtle but important distinction in terms of runtime behavior.

```
Function Call & Data Flow

repeat(num_times=3)  <-- Arguments are passed here (The Factory Call)
     │
     └── returns ──> decorator_repeat (with num_times=3 'remembered' in a closure)
                         │
                         └── decorates ──> greet (The Decorator Application)
                                             │
                                             └── returns ──> wrapper

When greet("Alice") is called, it's actually the `wrapper` that runs.
```

## Details

A standard Python decorator is a function that takes another function as input and returns a modified function. This simple structure provides no way to pass external arguments to customize the decorator's behavior. The Decorator Factory Pattern introduces an extra layer of nesting to solve this. It's a higher-order function that takes configuration arguments and returns the decorator, which then takes the target function. This pattern relies heavily on the concept of [[Python - Closures|closures]] to 'remember' the arguments passed to the factory.

#### Primary Goal

To allow decorators to accept arguments, making them configurable, flexible, and more reusable.

#### Mechanism

- **How it Works:** The pattern involves a three-level function structure.
    1.  **The Factory:** The outermost function that accepts the desired arguments (e.g., `num_times`). Its sole purpose is to return the decorator function.
    2.  **The Decorator:** The middle function. It's what the factory returns. It accepts one argument: the function to be decorated (e.g., `func`). Its purpose is to return the final wrapper function.
    3.  **The Wrapper:** The innermost function. This function contains the actual logic. It executes code before and/or after calling the original function (`func`). Crucially, it has access to both the arguments from the factory (via closure) and the original function passed to the decorator.

##### Code Translation

```python
# This pattern is the core of [[Python - Creating a Decorator with Arguments (Decorator Factory)]]

def repeat(num_times):  # --- Level 1: The Decorator Factory ---
    """Accepts arguments and returns the actual decorator."""
    def decorator_repeat(func):  # --- Level 2: The Decorator ---
        """Takes the function to be decorated."""
        def wrapper(*args, **kwargs):  # --- Level 3: The Wrapper ---
            """Runs the logic, using args from the factory."""
            for _ in range(num_times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator_repeat

# Using the decorator factory
@repeat(num_times=3)
def greet(name):
    print(f"Hello {name}!")

greet("Alice")
# Expected Output:
# Hello Alice!
# Hello Alice!
# Hello Alice!
```

 [[Code - Decorator Factory Pattern Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Factory Arguments:** These are the 'levers' that configure the decorator's behavior.
    - In the example, `num_times` is the parameter. It is captured by the closure of `decorator_repeat` and is directly used by the `wrapper` function to control the loop.
    - These can be any type of data: integers, strings, booleans, or even other functions, allowing for highly dynamic and powerful decorator logic.

#### Core Trade-offs

- **Pro: Flexibility and Reusability (DRY)**
    - A single decorator factory can replace multiple, slightly different, hard-coded decorators. For instance, instead of `@log_to_file`, `@log_to_database`, you can have one `@log(destination='file')`.
- **Con: Increased Complexity**
    - The three levels of nested functions can be confusing for developers new to the concept. It adds a layer of indirection that can make code harder to read and debug.
    - Stack traces for errors originating inside the wrapper can be longer and more complex, making it slightly harder to pinpoint the source of a problem.

## Connections

```
                    (Parent)
               Python - Decorators
                       ▲
                       │
           ┌───────────┼───────────┐
           │           │           │
(Foundation)    ┌───────────────────────────┐    (Problem)
Python - Closures │ Decorator Factory Pattern │    Python - The Challenge of Parameterizing Decorators
                └───────────────────────────┘
                           │
                           ▼
                    (Implementation)
 Python - Creating a Decorator with Arguments (Decorator Factory)
```

### Parent Concept

This pattern is an advanced application built directly upon the fundamental concept of [[Python - Decorators|Python decorators]].

### Child Concepts

- The direct implementation of this pattern is detailed in [[Python - Creating a Decorator with Arguments (Decorator Factory)|creating a decorator with arguments]], which shows the step-by-step coding process.

### Related Concepts 

- The entire mechanism is made possible by [[Python - Closures|closures]], which allow the inner wrapper function to access and 'remember' the arguments passed to the outer factory function.
- This pattern provides the solution to [[Python - The Challenge of Parameterizing Decorators|the challenge of parameterizing decorators]], which outlines the limitations of simple decorators.
- The structure relies on [[Python - Nested Functions|nested functions]] to create the required layers of scope.
- Understanding the [[Python - Syntax for Decorators with Arguments (@decorator(args))|syntax for decorators with arguments]] is key to applying this pattern effectively.
- Manually applying the pattern, as shown in [[Python - Decorator Factory Desugared (Manual Application)|decorator factory desugaring]], reveals the underlying function calls that the `@` syntax hides.
## Questions

- You have a set of functions that need timing, logging, and caching. Would you create three separate decorator factories (`@timed`, `@logged(level='INFO')`, `@cached(ttl=300)`) or a single, highly configurable factory like `@enhance(timing=True, log_level='INFO', cache_ttl=300)`? Justify your choice based on maintainability, usability, and the Single Responsibility Principle.
- Imagine you are building a shared library of decorator factories for a large engineering organization. How would you design the system to handle argument validation, provide clear error messages for incorrect usage, and ensure consistent documentation across all decorators to maximize adoption and minimize support tickets?
- What if Python's `@` syntax was restricted to functions that take only one argument (the decorated function), effectively banning the factory pattern. How could you architect a system to achieve similar configurable, reusable, function-modifying behavior, perhaps using classes or a different metaprogramming approach?