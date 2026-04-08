---
tags: 
  - core
  - python
  - metadata
  - introspection
  - functools
  - wrapper_function
  - decorator_factory
  - concept
source: 
  - "[[Writing Functions in Python]]"
related: 
  - "[[Python - Decorators]]"
  - "[[Python - Decorator Metadata Obscuration]]"
  - "[[Python - Decorator Metadata & Wrapper Function Relationship]]"
  - "[[Python - Preserving Metadata with @wraps Process]]"
  - "[[Python - __wrapped__ Attribute]]"
  - "[[Python - Nested Functions]]"
  - "[[Python - Closures]]"
  - "[[Python - Functions as First-Class Objects]]"
  - "[[Python - Docstrings]]"
  - "[[Python - Accessing Docstrings Programmatically]]"
  - "[[Python 5 - Scope]]"
  - "[[Python - User-Defined Functions]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
---
# Core: functools.wraps

## Summary

>The `wraps()` function from Python's `functools` module is a decorator specifically designed to be used when creating other decorators. Its purpose is to solve the problem of [[Python - Decorator Metadata Obscuration|metadata obscuration]] by copying essential attributes like the function's name (`__name__`) and docstring (`__doc__`) from the original function to the wrapper function. This preserves the [[Python - Decorator Metadata & Wrapper Function Relationship|relationship between the wrapper and the original function's metadata]], making the decorated function appear as itself to developers and introspection tools.

**Why This Matters:** It ensures that decorators are transparent, preserving the original function's identity and documentation, which is critical for debugging, introspection, and maintaining clean, self-documenting code.

_Analogy:_ _Imagine a famous author hires a talented ghostwriter to write a new book. The ghostwriter does all the actual writing (the new functionality), but the book is published under the famous author's name, with their biography and photo on the cover. In this scenario, `functools.wraps` is the legally binding publishing contract. It ensures that the final product (the decorated function), despite being the work of the ghostwriter (the wrapper), is presented to the world with the identity and credentials of the famous author (the original function)._

{
  "content": "",
  "children": [
    {
      "content": "**Famous Author:** The original function you are decorating (`my_func`)."
    },
    {
      "content": "**Ghostwriter:** The inner `wrapper` function inside your decorator that adds new behavior."
    },
    {
      "content": "**The Book's Content:** The combined logic of the wrapper and the original function working together."
    },
    {
      "content": "**The Book Cover (Author's Name, Bio):** The original function's metadata (`__name__`, `__doc__`, etc.)."
    },
    {
      "content": "**The `wraps` Decorator:** The 'publishing contract' that copies the author's identity onto the ghostwriter's work, making it official."
    },
    {
      "content": "**Where it breaks down:** In the analogy, the ghostwriter's identity is completely hidden. In Python, `@wraps` is more transparent; it adds a [[Python - __wrapped__ Attribute|`__wrapped__` attribute]] to the decorated function, allowing you to access the original 'ghostwriter' (the wrapper function) if you need to."
    }
  ]
}

```
Before @wraps:
decorated_func.__name__  ---> "wrapper"
decorated_func.__doc__   ---> (None or wrapper's docstring)

       The Process: @wraps(original_func)
                      │
                      ▼
             [ Metadata Copier ]
(Copies __name__, __doc__, etc. from original_func)
                      │
                      ▼
After @wraps:
decorated_func.__name__  ---> "original_func"
decorated_func.__doc__   ---> "This is the original docstring."
```

## Details

The `functools.wraps` function is a decorator factory from Python's standard library. Its primary purpose is to solve a common and frustrating side effect of creating decorators: the loss of the original function's metadata. When you decorate a function, you are essentially replacing it with a new function—the wrapper. Without `@wraps`, this new function has its own generic name (e.g., 'wrapper') and docstring, which hides the identity of the function you intended to decorate. This is the core problem of [[Python - Decorator Metadata Obscuration]]. `@wraps` acts as a 'metadata copier,' ensuring the decorated function presents itself to the outside world as the original function, which is essential for debugging and creating intuitive APIs.

#### Primary Goal

To make a wrapper function look and feel like the original function it is decorating by copying over important metadata like its name, docstring, and module.

#### Mechanism

- **Step 1: Import `wraps`**
    - Begin by importing the `wraps` decorator from the `functools` module.
- **Step 2: Define the Decorator**
    - Create the outer decorator function. This function will accept the original function (e.g., `func`) as its argument.
- **Step 3: Apply `@wraps` to the Wrapper**
    - Inside the decorator, define the inner `wrapper` function. Apply the `@wraps(func)` decorator directly above the `wrapper`'s definition. This is the crucial step where you instruct Python to copy the metadata from `func` to `wrapper`.
- **Step 4: Implement Wrapper Logic**
    - Add the decorator's additional logic inside the `wrapper` function. Ensure you call the original function (`func`) at the appropriate point and return its result if necessary.
- **Step 5: Return the Wrapper**
    - The outer decorator function must return the `wrapper` function, which has now been enhanced with the original function's metadata.

##### Code Translation

```python
# --- Step 1: Import wraps ---
from functools import wraps
import time

# --- Step 2: Define the Decorator ---
def timer(func):
    """A decorator that prints the time a function takes to execute."""
    # --- Step 3: Apply @wraps to the Wrapper ---
    @wraps(func)
    def wrapper(*args, **kwargs):
        # --- Step 4: Implement Wrapper Logic ---
        start_time = time.perf_counter()
        result = func(*args, **kwargs)
        end_time = time.perf_counter()
        run_time = end_time - start_time
        print(f"Finished {func.__name__!r} in {run_time:.4f} secs")
        return result
    # --- Step 5: Return the Wrapper ---
    return wrapper

@timer
def slow_function(delay):
    """A sample function that waits for a given delay."""
    time.sleep(delay)
    return "Done"

# --- DEMONSTRATION ---
# Without @wraps, the following would print 'wrapper' and None.
# With @wraps, it correctly identifies the original function.

print(f"Function Name: {slow_function.__name__}")
print(f"Docstring: {slow_function.__doc__}")

# Calling the decorated function
slow_function(1)

# Output:
# Function Name: slow_function
# Docstring: A sample function that waits for a given delay.
# Finished 'slow_function' in 1.0005 secs
```

 [[Code - functools.wraps Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`wrapped`**
    - The function to be decorated (the original function). This is the primary and required argument, which serves as the source of the metadata to be copied.
- **`assigned`**
    - A tuple of attribute names that are copied directly from the `wrapped` function to the `wrapper` function. The default is `('__module__', '__name__', '__qualname__', '__doc__', '__annotations__')`.
- **`updated`**
    - A tuple of attribute names on the `wrapper` that are updated with values from the `wrapped` function. The main one is `__dict__`, which merges the `wrapped` function's dictionary of attributes into the wrapper's. The default is `('__dict__',)`.

#### Core Trade-offs

- **Pro: Metadata Preservation**
    - This is the primary benefit. It makes decorated functions behave predictably for introspection tools (like `help()`), debuggers, and automatic documentation generators (like Sphinx).
- **Pro: Improved Debugging and Maintainability**
    - Code is far easier to debug because function identities and tracebacks are not lost. Error messages will correctly reference `slow_function` instead of a generic `wrapper`.
- **Pro: Access to the Original Function**
    - It automatically adds the [[Python - __wrapped__ Attribute|`__wrapped__` attribute]] to the decorator, providing a standard way to access the original, undecorated function if needed.
- **Con: Minor Overhead**
    - There is a very small, and almost always negligible, performance cost associated with the function call to `wraps` when the decorator is first defined and applied.

## Connections

```
                      (Parent)
                     Decorators
                         ▲
                         │
   ┌─────────────────────┼─────────────────────┐
   │                     │                     │
(Problem)        ┌──────────────────┐        (Solution)
Decorator        │ functools.wraps  │        Preserving Metadata
Metadata         └──────────────────┘        with @wraps Process
Obscuration             │
                        │
               (Resulting Attribute)
                        │
                  __wrapped__ Attribute
```

### Parent Concept

`functools.wraps` is a utility within the broader concept of [[Python - Decorators]], designed specifically to address a common side effect of their implementation.

### Child Concepts



### Related Concepts 

- It directly solves the problem of [[Python - Decorator Metadata Obscuration|decorator metadata obscuration]], where a wrapper function hides the identity of the original function.
- The core of its function is to manage the [[Python - Decorator Metadata & Wrapper Function Relationship|relationship between a wrapper function and the original function's metadata]].
- The entire [[Python - Preserving Metadata with @wraps Process|process of preserving metadata with `@wraps`]] is the practical application of this decorator.
- A key feature it provides is the [[Python - __wrapped__ Attribute|`__wrapped__` attribute]], which allows for introspection into the original undecorated function.
## Questions

- Imagine you're building a public API for your company. A product manager suggests omitting `@wraps` from your internal performance-logging decorators to save a few nanoseconds per call. How would you argue that the long-term cost of degraded developer experience and difficult debugging outweighs this micro-optimization, especially in terms of onboarding new developers and maintaining the API's documentation?
- If you were designing a framework that allows third-party developers to create plugins using decorators, how would you enforce or strongly encourage the use of `@wraps` in their contributions to ensure the stability and introspectability of the entire system? What kind of static analysis or linting rules might you implement?
- What if the `functools` module didn't exist? How would you manually implement the functionality of `@wraps` from scratch? What specific attributes would you prioritize copying, and what potential edge cases (like function signatures) would be the most difficult to handle correctly?