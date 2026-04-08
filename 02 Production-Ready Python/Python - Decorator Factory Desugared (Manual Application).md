---
tags: 
  - core
  - python
  - syntactic_sugar
  - at_syntax
  - decorator_application
  - metaprogramming
  - python_decorators
  - concept
source: 
  - "[[Writing Functions in Python]]"
related: 
  - "[[Python - Decorators with Arguments]]"
  - "[[Python - Decorator Factory Pattern]]"
  - "[[Python - Creating a Decorator with Arguments (Decorator Factory)]]"
  - "[[Python - The Challenge of Parameterizing Decorators]]"
  - "[[Python - Decorators]]"
  - "[[Python - Functions as First-Class Objects]]"
  - "[[Python - Closures]]"
  - "[[Python - Nested Functions]]"
  - "[[Python - Functions]]"
  - "[[Python - Scope]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Fundamental - Programming]]"
---
# Core: Syntax for Decorators with Arguments (@decorator(args))

## Summary

>The `@decorator(args)` syntax is a form of "syntactic sugar" in Python. It provides a clean, readable, and idiomatic shortcut for the more verbose, two-step process of applying a parameterized decorator. This manual process involves first calling a [[Python - Decorator Factory Pattern|decorator factory]] with arguments to get the actual decorator function, and then applying that returned decorator to the target function. The `@` syntax elegantly performs both of these steps at once during function definition.

**Why This Matters:** This syntax significantly improves code readability and conciseness by replacing a manual two-step decorator application with a single, declarative line.

_Analogy:_ _Think of ordering a combo meal at a fast-food restaurant. Using the `@decorator(args)` syntax is like saying, "I'll have the Number 3 combo (with a large drink)." It's a single, clear instruction. The manual, two-step process is like a more drawn-out conversation: First, you ask the cashier, "What comes in the Number 3 combo?" (this is calling the factory function). The cashier replies, "A burger and fries" (this is the returned decorator). Then, you say, "Okay, I'll take that combo, but make it a large drink" (this is applying the returned decorator with your customization to your order). The `@` syntax is just a universally understood shortcut for that entire conversation._

In this analogy:
- **The Menu:** Python's available syntax.
- **Ordering "Number 3 (with a large drink)":** The `@decorator(args)` syntax.
- **The two-step conversation:** The manual process of `decorator = factory(args)` then `func = decorator(func)`.
- **The Cashier:** The Python interpreter.
- **The contents of the combo (burger and fries):** The actual decorator function returned by the factory.
- **Your final meal:** The decorated function.
- **"with a large drink":** The arguments passed to the decorator factory.

**Where it breaks down:** The primary difference is that in Python, this "conversation" is not a real-time interaction. The `@` syntax is a compile-time transformation; the interpreter immediately resolves it into the two-step process when it defines the function.

```
```
Manual Process:
+--------------------+      +-------------------+      +----------------------+
| run_n_times(3)     |----->| decorator_function|----->| new_wrapped_function |
+--------------------+      +-------------------+      +----------------------+
(1. Call Factory)         (2. Returns Decorator)     (3. Apply to Original)

Syntactic Sugar:
@run_n_times(3)
def my_func(): ...

Is a direct shortcut for the entire manual process above.
```
```

## Details

The `@run_n_times(3)` syntax is a powerful piece of syntactic sugar in Python that simplifies the use of parameterized decorators. It elegantly combines two distinct operations that would otherwise need to be written out explicitly: first, calling the decorator factory (e.g., `run_n_times(3)`) to create and return a decorator function, and second, applying that resulting decorator to the function defined immediately below it. This directly addresses [[Python - The Challenge of Parameterizing Decorators|the challenge of parameterizing decorators]] by providing a clean interface built upon the [[Python - Decorator Factory Pattern|decorator factory pattern]].

#### Primary Goal

To provide a clean, readable, and declarative way to apply a parameterized decorator to a function in a single line.

#### Mechanism

- **Step 1: The Manual Two-Step Process (The 'Desugared' Version)**
    - Without the `@` syntax, you must first explicitly call the factory function with its arguments. This call returns the actual decorator.
    - Then, you must manually apply this returned decorator to your target function, reassigning the function's name to the new, wrapped version.
- **Step 2: The Syntactic Sugar Equivalent**
    - Placing `@decorator_factory(args)` directly above a `def` statement instructs the Python interpreter to perform the entire two-step process from Step 1 automatically.
    - The interpreter calls `decorator_factory(args)` to get the decorator, and then immediately applies it to the function being defined.

##### Code Translation

```python
# Assume run_n_times is a decorator factory
def run_n_times(n):
    """A decorator factory that returns a decorator."""
    def decorator(func):
        """The actual decorator."""
        def wrapper(*args, **kwargs):
            for _ in range(n):
                func(*args, **kwargs)
        return wrapper
    return decorator

# --- Step 1: The Manual Two-Step Process ---
# This is what Python does behind the scenes.
def print_sum_manual(a, b):
    print(a + b)

# First, call the factory to get the decorator
repeat_3_times = run_n_times(3)
# Second, apply the returned decorator to the function
print_sum_manual = repeat_3_times(print_sum_manual)

print("Running the manually decorated function:")
print_sum_manual(10, 5)

print("-" * 20)

# --- Step 2: The Syntactic Sugar Equivalent ---
# This is the clean, idiomatic way to achieve the same result.
@run_n_times(3)
def print_sum_sugar(a, b):
    print(a + b)

print("Running the function decorated with syntactic sugar:")
print_sum_sugar(10, 5)

# Both versions will print the sum '15' three times.
```

 [[Code - Syntax for Decorators with Arguments (@decorator(args)) Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Decorator Arguments**
    - The values inside the parentheses `(...)` following the decorator name are passed directly as arguments to the outer factory function.
    - This allows you to customize the behavior of the decorator on a per-use basis.
    - Example: In `@run_n_times(5)`, the integer `5` is passed to the `n` parameter of the `run_n_times` factory.
    - Example: In `@check_permission(role='admin')`, the keyword argument `role='admin'` is passed to the `check_permission` factory.

#### Core Trade-offs

- **Pro: Readability and Declarative Style**
    - The `@` syntax is highly declarative. It clearly states the *intent*—"this function is modified by X"—right at the point of definition, making the code's purpose easier to grasp quickly.
- **Con: Obscures the Underlying Mechanism**
    - For developers new to Python, the "magic" of the `@` syntax can hide the crucial underlying two-step process (factory call -> decorator application). Understanding the manual equivalent is essential for debugging and truly comprehending how closures and first-class functions enable this powerful feature.

## Connections

```
```
                               (Parent)
                     Python - Decorators with Arguments
                                     ▲
                                     │
┌────────────────────────────────────┼────────────────────────────────────┐
│                                    │                                    │
(Builds on)           ┌──────────────────────────────────────────────────────────┐           (Is the clean version of)
Python - Decorator    │ Python - Syntax for Decorators with Arguments (@decorator(args)) │           Manual Application
Factory Pattern       └──────────────────────────────────────────────────────────┘

```
```

### Parent Concept

This syntax is the standard, idiomatic way to apply a [[Python - Decorators with Arguments|decorator that accepts arguments]].

### Child Concepts



### Related Concepts 

- This syntax provides a clean solution to [[Python - The Challenge of Parameterizing Decorators|the challenge of parameterizing decorators]].
- It is made possible by the underlying [[Python - Decorator Factory Pattern|decorator factory pattern]], which is the mechanism it simplifies.
- Understanding the manual equivalent is key to [[Python - Creating a Decorator with Arguments (Decorator Factory)|creating a decorator with arguments]] that can be used with this syntax.
## Questions

- If you were leading a code review for a junior developer's work, and they used the manual two-step decorator application instead of the `@` syntax, when would you ask them to change it for consistency, and when might you let it slide for clarity? What business or team-level factors influence that decision?
- Imagine a large codebase where a parameterized decorator like `@authorize(role='admin')` is used on hundreds of functions. If you need to change the signature of the `authorize` factory (e.g., add a new required argument like `audit_level`), how would you manage this refactoring across the entire system with minimal disruption?
- What if Python's core developers decided to deprecate the `@` syntax for decorators entirely? What alternative syntax or programming patterns could emerge to fill the gap for declaratively modifying function behavior, and what would be the pros and cons?