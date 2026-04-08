---
tags: 
  - core
  - python
  - __wrapped__
  - introspection
  - functools
  - decorator
  - metaprogramming
  - concept
source: 
  - "[[Writing Functions in Python]]"
related: 
  - "[[Python - Decorators]]"
  - "[[Python - functools.wraps Decorator]]"
  - "[[Python - Preserving Metadata with @wraps Process]]"
  - "[[Python - Decorator Metadata Obscuration]]"
  - "[[Python - Decorator Metadata & Wrapper Function Relationship]]"
  - "[[Python - Closures]]"
  - "[[Python - Nested Functions]]"
  - "[[Python - Functions as First-Class Objects]]"
  - "[[Python - Scope]]"
  - "[[Python - Docstrings]]"
  - "[[Python - Accessing Docstrings Programmatically]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Fundamental - Software Engineering]]"
---
# Core: Accessing Original Function via __wrapped__

## Summary

>The `__wrapped__` attribute is a special property automatically added to a wrapper function by the `[[Python - functools.wraps Decorator|@functools.wraps]]` decorator. It holds a direct reference to the original, undecorated function, offering a clean and explicit alternative to manually inspecting a decorator's `[[Python - Closures|closure]]` to find the underlying function.

**Why This Matters:** This attribute provides a direct and standardized way to 'unwrap' a decorated function, which is crucial for introspection, testing, and debugging complex decorator chains.

_Analogy:_ _Imagine a gift-wrapped present. The decorator is the fancy wrapping paper and bow that adds a new look and feel. The original function is the actual gift inside. The `__wrapped__` attribute is like a special, scannable QR code on the gift tag. While the tag tells you the gift's name (like `__name__`), the QR code (`__wrapped__`) gives you a direct digital link to the original item's online manual and specifications, allowing you to interact with the 'idea' of the gift without unwrapping it._

**Where it breaks down:** Unlike a QR code that just links to information, the `__wrapped__` attribute is a direct handle to the original function object itself. You can use this handle to actually *run* the original function, completely bypassing the wrapping paper (the decorator's logic), which is not something you can do with a real gift's QR code.

```
Decorated Function (e.g., `add`)
       │
       ├──> Executes Wrapper Logic (e.g., logging)
       │
       └──> .__wrapped__ attribute
               │
               ▼
         Original Function (the real `add` logic)
```

## Details

When you use the `@functools.wraps` decorator, its primary job is to solve `[[Python - Decorator Metadata Obscuration|metadata obscuration]]` by copying attributes like `__name__` and `__doc__`. As a valuable side effect, it also establishes a formal link back to the original function by creating the `__wrapped__` attribute on the new wrapper function. This provides a clean, public API for introspection and allows developers to programmatically access the underlying function without relying on implementation details like the `__closure__` attribute.

#### Primary Goal

To provide a simple, standardized, and explicit way to access the original function that has been decorated, bypassing the decorator's added logic for purposes like testing or introspection.

#### Mechanism

- **Step 1: Define the Original Function**
    - First, create a standard Python function. This is the core logic that we want to decorate and later access directly.
- **Step 2: Create a Decorator Using `@wraps`**
    - Define a decorator that accepts a function. Inside it, the `wrapper` function must be decorated with `@functools.wraps(func)`. This is the crucial step that creates the `__wrapped__` attribute.
- **Step 3: Apply the Decorator**
    - Use the `@` syntax to apply your decorator to the original function. The name of the original function now points to the `wrapper` function returned by the decorator.
- **Step 4: Access the Original via `__wrapped__`**
    - You can now access the original, undecorated function by calling the `__wrapped__` attribute on the decorated function object. This allows you to execute its core logic without triggering the decorator's additional behavior.

##### Code Translation

```python
import functools

# --- Step 2: Create a Decorator Using @wraps ---
def logging_decorator(func):
    """A simple decorator that logs when a function is called."""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}...")
        result = func(*args, **kwargs)
        print(f"{func.__name__} finished.")
        return result
    return wrapper

# --- Step 1: Define the Original Function ---
# --- Step 3: Apply the Decorator ---
@logging_decorator
def add(a, b):
    """This is the original add function."""
    return a + b

# Calling the decorated function executes the wrapper logic
print("--- Calling Decorated Function ---")
result = add(5, 3)
print(f"Result: {result}\n")

# --- Step 4: Access the Original via __wrapped__ ---
# The __wrapped__ attribute points to the original 'add' function
original_add = add.__wrapped__

# Calling the original function bypasses the decorator's logging
print("--- Calling Original Function via .__wrapped__ ---")
original_result = original_add(10, 20)
print(f"Original Result: {original_result}")

# You can also verify the docstring is from the original
print(f"Docstring of original: {original_add.__doc__}")
```

 [[Code - Accessing Original Function via __wrapped__ Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`@functools.wraps(func)`**
    - The presence of this decorator on the inner wrapper function is the sole mechanism that creates the `__wrapped__` attribute. If it is omitted, the decorated function will not have this attribute, and an `AttributeError` will be raised if you try to access it.

#### Core Trade-offs

- **Pro (Clean Introspection & Testing)**
    - It provides a clear, documented API for accessing the original function. This is invaluable for unit tests where you may want to test the core business logic of a function in isolation, without its decorative layers (like logging, caching, or authentication).
- **Con (Dependency on Correct Implementation)**
    - Code that relies on `__wrapped__` is coupled to the assumption that the decorator was built correctly using `@wraps`. If a third-party or internal decorator forgets to use `@wraps`, any introspection tool or test suite relying on `__wrapped__` will break.
- **Con (Potential for Misuse)**
    - Using `__wrapped__` in application logic to intentionally bypass a decorator's behavior can subvert critical functionality. For example, bypassing a security or transaction-logging decorator could lead to serious bugs or vulnerabilities. Its use should generally be confined to testing and debugging frameworks.

## Connections

```
                      (Parent)
                functools.wraps Decorator
                           ▲
                           │
           ┌───────────────┼────────────────────────────┐
           │               │                            │
(Problem Solved)  ┌───────────────────────────┐      (Alternative)
Metadata          │ Accessing Original        │      Closure Inspection
Obscuration       │ Function via __wrapped__  │
                  └───────────────────────────┘
                           │
                           ▼
                      (Used For)
                 Introspection & Testing
```

### Parent Concept

This capability is a direct feature provided by the `[[Python - functools.wraps Decorator|@functools.wraps decorator]]`, which is designed to make decorators more transparent and easier to work with.

### Child Concepts



### Related Concepts 

- The `__wrapped__` attribute is a key part of the solution to the problem of `[[Python - Decorator Metadata Obscuration|metadata obscuration]]`, as it provides a direct link back to the original object and all its properties.
- Understanding the `[[Python - Decorator Metadata & Wrapper Function Relationship|relationship between a wrapper and the original function]]` is fundamental to appreciating why a mechanism like `__wrapped__` is necessary for robust metaprogramming.
- Accessing `__wrapped__` provides a much cleaner and more reliable alternative to manually inspecting a function's `[[Python - Closures|closure]]` to find the original function reference.
## Questions

- Imagine a critical financial transaction function is decorated with a mandatory audit logger. A junior developer discovers they can speed up a batch process by calling `.__wrapped__` to bypass the logging. How would you explain the business risk of this 'optimization' and what technical controls could you put in place to prevent this misuse in the future?
- If you have a chain of multiple decorators on a single function, how would you design a utility to 'unwrap' the function layer by layer to inspect the state at each stage of decoration? What potential issues could arise if one decorator in the chain fails to use `@wraps`?
- What if the `__wrapped__` attribute was made read-only and inaccessible for direct calls, only for introspection (e.g., getting the original's `__name__` or `__doc__`)? What new patterns or language features would be needed to effectively unit test the original function's logic in isolation?