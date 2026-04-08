---
tags: 
  - major_core
  - python
  - introspection
  - metaprogramming
  - dunder attribute
  - documentation
  - docstring
  - concept
source: 
  - "[[Writing Functions in Python]]"
related: 
  - "[[Python 5 - Docstrings]]"
  - "[[Python - inspect.getdoc() Function]]"
  - "[[Python - inspect Module]]"
  - "[[Python - Benefits of Docstrings]]"
  - "[[Python - Anatomy of a Docstring]]"
  - "[[Python - Docstring Formatting Styles]]"
  - "[[Python - User-Defined Functions]]"
  - "[[Python - Objects]]"
  - "[[Python - Functions]]"
  - "[[Python - Google-style Docstrings]]"
  - "[[Python - Numpydoc Style]]"
  - "[[Fundamental - Programming]]"
---
# Major Core: __doc__ Attribute

## Summary

> In Python, every function, class, and module object has a special, built-in attribute called `__doc__` (short for 'documentation string'). This attribute holds the raw string literal that was written as the object's docstring, making the documentation itself an accessible piece of data at runtime.

**Why This Matters:** The __doc__ attribute provides a direct, programmatic way to access a function's documentation, enabling automated tools for code analysis, documentation generation, and interactive help systems.

_Analogy:_ _Think of a function as a new kitchen appliance in a box. The `__doc__` attribute is like the raw, unfolded instruction manual that's packed inside the box right alongside the appliance. You can pull it out and read it directly to understand what the appliance does, but it might be creased and include printing margins or other raw formatting._

In this analogy, the appliance is the Python function, the box is the Python runtime, and the instruction manual is the docstring. Accessing `my_function.__doc__` is like opening the box and pulling out that manual. 

**Where it breaks down:** The analogy holds well, but the key limitation is that `__doc__` gives you the manual exactly as it was printed and folded—including all the extra whitespace and indentation from the factory (the source code). It's not a cleaned-up, nicely formatted booklet, which is why tools like [[Python - inspect.getdoc() Function]] are often preferred for a cleaner presentation.

```
Function Object
┌──────────────────────────┐
│ def calculate_average(): │
│   """Docstring..."""      │
│   return ...             │
└────────────┬─────────────┘
             │
             │ .__doc__
             ▼
        String Data
┌──────────────────────────┐
│ "Calculates the average.." │
│ "\n"                     │
│ "  This function..."     │
└──────────────────────────┘
```

## Details

Python's philosophy includes the idea of 'batteries included' and strong introspection capabilities, meaning code can examine other code. The `__doc__` attribute is a prime example of this. It's a 'dunder' (double underscore) attribute automatically attached to most Python objects that have a [[Python 5 - Docstrings|docstring]]. It provides a simple, direct way to retrieve the documentation associated with a function or class without needing to parse the source file, allowing programs to be self-describing.

#### Primary Goal

To provide a standard, built-in mechanism for programmatically accessing the raw docstring of a Python object at runtime.

#### Mechanism

- **Step 1: Define a Function with a Docstring**
    - First, create a standard Python function. Immediately after the `def` line, add a multi-line string literal. This string is automatically captured as the function's docstring. Notice the indentation.
- **Step 2: Access the `__doc__` Attribute**
    - Use standard dot notation to access the special `__doc__` attribute on the function object itself (e.g., `function_name.__doc__`).
- **Step 3: Observe the Raw Output**
    - When you print the contents of the `__doc__` attribute, you will see the exact string, including all the leading whitespace (indentation) from the original source code. This is a key characteristic to remember.

```python
# --- Step 1: Define a Function with a Docstring ---
def calculate_average(numbers):
    """Calculates the average of a list of numbers.

    This function demonstrates the __doc__ attribute.
    Notice the indentation of this line.
    """
    return sum(numbers) / len(numbers)

# --- Step 2: Access the __doc__ Attribute ---
docstring_content = calculate_average.__doc__

# --- Step 3: Observe the Raw Output ---
print("--- Raw __doc__ Output ---")
print(docstring_content)

# The output will include the leading whitespace from the function body.
# Output:
# --- Raw __doc__ Output ---
# Calculates the average of a list of numbers.
#
#     This function demonstrates the __doc__ attribute.
#     Notice the indentation of this line.
#     
```

 [[Code - __doc__ Attribute Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **No Parameters**
    - The `__doc__` attribute is not a function and takes no parameters. It is a direct property of an object that is accessed to retrieve its value.

#### Core Trade-offs

- **Pro: Simplicity and Universality**
    - It is a built-in feature of Python, requiring no special imports. It's the most direct and fundamental way to access docstring content.
- **Con: Raw and Unformatted Output**
    - The primary drawback is that `__doc__` returns the string exactly as it appears in the source code, including any indentation. This makes it unsuitable for direct display to end-users without post-processing. This limitation is the main reason the [[Python - inspect.getdoc() Function]] exists, as it provides a cleaned-up version.

## Connections

```
                 (Parent)
            Python - Docstrings
                     ▲
                     │
┌────────────────────┼────────────────────┐
│                    │                    │
(Provides raw data for) ┌───────────────────┐ (Cleans data from)
Python - inspect Module │ __doc__ Attribute │ [[Python - inspect.getdoc() Function|inspect.getdoc()]]
                        └───────────────────┘
```

### Parent Concept

The `__doc__` attribute is a core implementation detail of how [[Python 5 - Docstrings|docstrings]] are attached to objects in Python.

### Child Concepts



### Related Concepts 

- The [[Python - inspect.getdoc() Function|inspect.getdoc() function]] is the preferred alternative to `__doc__` when you need a clean, unindented version of the docstring for display.
- The `__doc__` attribute is a fundamental concept within the broader topic of Python's [[Python - inspect Module|inspect module]], which provides many tools for runtime object introspection.
- Understanding `__doc__` is part of understanding how [[Python - Objects|Python objects]] can hold metadata about themselves.
- This attribute is most commonly used on [[Python - User-Defined Functions|user-defined functions]] and classes to make them self-documenting.
## Questions

- Imagine you're building a developer tool that automatically generates API documentation from source code. Would you rely solely on the `__doc__` attribute? What are the business risks of presenting the raw `__doc__` content directly to users, and how would you justify the extra development effort to use a more sophisticated parser like the [[Python - inspect Module|inspect module]]?
- If you were designing a large-scale code analysis pipeline that extracts docstrings from thousands of Python modules, what potential performance or parsing issues might you encounter by directly accessing `__doc__`, especially with inconsistently formatted codebases? How might this affect the scalability of your system?
- What if the `__doc__` attribute was writeable? What are some creative (or malicious) ways this could be used for metaprogramming or runtime code modification, and what would be the implications for code security and debugging?
