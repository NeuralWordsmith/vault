---
tags: 
  - core
  - python
  - __doc__
  - dunder method
  - introspection
  - docstring
  - metadata
  - concept
source: 
  - "[[Writing Functions in Python]]"
related: 
  - "[[Python 5 - Docstrings]]"
  - "[[Python - Accessing Docstrings Programmatically]]"
  - "[[Python - inspect.getdoc() Function]]"
  - "[[Python - inspect Module]]"
  - "[[Python - Functions]]"
  - "[[Python - User-Defined Functions]]"
  - "[[Python - Objects]]"
  - "[[Python - Docstring Formatting Styles]]"
  - "[[Python - Google-style Docstrings]]"
  - "[[Python - Numpydoc Style]]"
  - "[[Python - Anatomy of a Docstring]]"
  - "[[Python - Benefits of Docstrings]]"
---
# Core: Accessing Docstrings via __doc__

## Summary

>In Python, every function, class, and module object has a special attribute called `__doc__` (short for 'documentation'). This attribute, often called a 'dunder' attribute because of the double underscores, holds the raw string literal that was defined as the object's docstring. It provides a direct, unfiltered way to access the documentation written by the developer.

**Why This Matters:** Accessing the `__doc__` attribute is the most direct, built-in way to programmatically retrieve a function's documentation, enabling automated tools, help systems, and code introspection without external libraries.

_Analogy:_ _Accessing a function's `__doc__` attribute is like opening a new appliance and pulling out the instruction manual. The manual is right there inside the box, exactly as it was printed and folded at the factory._

The appliance is the Python function. The instruction manual is the [[Python 5 - Docstrings|docstring]]. Accessing `__doc__` is the act of taking the manual out. The key part of the analogy is that the manual might be folded awkwardly or have creases—this represents the raw, unformatted nature of the `__doc__` attribute, which preserves all the original indentation and whitespace from the source code. 

**Where it breaks down:** Unlike a physical manual, the `__doc__` attribute can be accessed and used by other programs instantly, forming the basis for automated documentation generation and interactive help systems.

```
Function Object: calculate_area
│
├── name: 'calculate_area'
├── code: <code object ...>
└── __doc__: """Calculate the area of a rectangle.\n\n    This function takes the length and width of a rectangle..."""
       ▲
       │
       └─ Holds the raw, unformatted docstring text, including indentation.
```

## Details

Python's philosophy emphasizes readability and accessible documentation. The `__doc__` attribute is a core feature of this, making documentation a first-class citizen of the language. It's a fundamental mechanism for introspection—the ability of a program to examine its own structure at runtime. When you define a function and place a string as the very first statement inside it, Python automatically assigns that string to the function's `__doc__` attribute. This provides a direct, though unformatted, way of [[Python - Accessing Docstrings Programmatically|accessing docstrings programmatically]].

#### Primary Goal

To provide a simple, built-in mechanism to retrieve the raw documentation string associated with a function or other Python object for introspection and programmatic use.

#### Mechanism

- **Step 1: Define a Function with a Docstring**
    - Create a standard Python function. The very first statement inside the function must be a string literal (usually a multi-line triple-quoted string), which will serve as the docstring.
- **Step 2: Access the `__doc__` Attribute**
    - Use dot notation directly on the function object to access its special `__doc__` attribute. This does not call the function, but rather retrieves one of its metadata attributes.
- **Step 3: Print and Observe the Raw Output**
    - Print the contents of the `__doc__` attribute. Notice that the output includes any leading whitespace (indentation) from the original source code, as it is a raw representation.

##### Code Translation

```python
# --- Step 1: Define a Function with a Docstring ---
def calculate_area(length, width):
    """Calculate the area of a rectangle.

    This function takes the length and width of a rectangle
    and returns its total area.
    """
    return length * width

# --- Step 2: Access the __doc__ Attribute ---
docstring_content = calculate_area.__doc__

# --- Step 3: Print and Observe the Raw Output ---
print(docstring_content)

# Expected Output:
# Calculate the area of a rectangle.
#
#     This function takes the length and width of a rectangle
#     and returns its total area.
#
# Note the preserved indentation on the second paragraph.
```

 [[Code - Accessing Docstrings via __doc__ Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- The `__doc__` attribute is not a function and does not take any parameters. It is a read-only attribute that holds the string value of the docstring.

#### Core Trade-offs

- **Pro: Simplicity and Universality**
    - It is a built-in feature of Python, requiring no imports. It's the most direct and fundamental way to access an object's documentation string.
- **Con: Raw, Unformatted Output**
    - The primary drawback is that `__doc__` returns the docstring exactly as it appears in the source code, including any indentation used for formatting. This leading whitespace can make it difficult to display cleanly in help text or generated documentation, often requiring manual string manipulation to clean up.

## Connections

```
                      (Parent)
        Python - Accessing Docstrings Programmatically
                         ▲
                         │
┌────────────────────────┼────────────────────────┐
│                        │                        │
(Alternative)  ┌───────────────────────────────────┐  (Foundation)
inspect.getdoc │ Accessing Docstrings via __doc__  │  Python - Docstrings
               └───────────────────────────────────┘
```

### Parent Concept

This is a primary method for achieving [[Python - Accessing Docstrings Programmatically|programmatic access to docstrings]].

### Child Concepts



### Related Concepts 

- It directly contrasts with the [[Python - inspect.getdoc() Function|inspect.getdoc() function]], which provides a cleaned-up version of the docstring by removing common leading whitespace.
- This attribute is the mechanism for accessing the content defined in a [[Python 5 - Docstrings|docstring]].
- It is a fundamental tool for introspection, a capability further expanded by the [[Python - inspect Module|inspect module]].
## Questions

- You're building an internal developer tool that automatically generates documentation websites from your team's Python code. Would you build the parser using the raw `__doc__` attribute or the `inspect.getdoc()` function? Justify your choice in terms of development effort, maintenance, and the final quality of the user-facing documentation.
- Imagine a large-scale code analysis pipeline that scans millions of lines of Python code to identify functions lacking proper documentation. How would the difference in whitespace handling between `__doc__` and `inspect.getdoc()` affect the logic and performance of your linting rules, especially when dealing with code from many different developers with varying indentation styles?
- What if the `__doc__` attribute were writeable? What are the most creative (or malicious) ways you could exploit this to dynamically change a program's self-documentation at runtime, and what kind of security or debugging challenges would this introduce?