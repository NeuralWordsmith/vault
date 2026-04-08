---
tags: 
  - core
  - python
  - higher-order functions
  - first-class functions
  - functional programming
  - callbacks
  - function as argument
  - concept
source: 
  - "[[Writing Functions in Python]]"
related: 
  - "[[Python - Functions as First-Class Objects]]"
  - "[[Python - Functions]]"
  - "[[Python - Assigning Functions to Variables]]"
  - "[[Python - Returning Functions from Functions]]"
  - "[[Python - Referencing vs Calling a Function]]"
  - "[[Python - Nested Functions]]"
  - "[[Python - Storing Functions in Data Structures]]"
  - "[[Python - Scope]]"
  - "[[Python - Docstrings]]"
  - "[[Python - Accessing Docstrings Programmatically]]"
  - "[[Python - List Comprehensions]]"
  - "[[Python - Generator Functions]]"
  - "[[Python - Objects]]"
---
# Core: Passing Functions as Arguments

## Summary

>In Python, because [[Python - Functions as First-Class Objects|functions are treated like any other object]], they can be passed as arguments into other functions. This allows a function to accept behavior, not just data, as an input, enabling the creation of more abstract and powerful 'higher-order' functions.

**Why This Matters:** This capability allows for creating highly flexible and reusable code, forming the foundation for powerful design patterns like decorators and callbacks.

_Analogy:_ _Think of a master chef writing a recipe for a cake. Instead of specifying 'whisk the eggs,' the recipe has a step that says 'Perform your preferred aeration technique on the eggs.' This allows a baker to use the same recipe but plug in their own specific technique—whisking, beating, or folding—as an 'argument' to that step._

The master recipe is the higher-order function (like `has_docstring`). The specific aeration technique (whisking, folding) is the function being passed as an argument (like `yes` or `no`). The recipe can now work with various techniques without being rewritten. **Where it breaks down:** Unlike a cooking technique, a function passed as an argument must conform to the expected signature (inputs and outputs) that the higher-order function expects, or it will cause a runtime error.

```
```
+-----------------+        +----------------------+
| def no():       |        | def yes():           |
|   return 42     |        |   """docstring"""    |
+-----------------+        |   return 42          |
        │                  +----------------------+
        │                             │
        └───────────┐   ┌─────────────┘
                    ▼   ▼
        +-----------------------------+
        | has_docstring(func)         |
        |                             |
        |  return func.__doc__ is not None |
        +-----------------------------+
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
has_docstring(no)      has_docstring(yes)
=> False               => True
```
```

## Details

The core idea is that functions in Python are not just blocks of code; they are objects. This means you can handle them just like you would an integer, a string, or a list. You can pass them into other functions, which is a cornerstone of functional programming in Python. The provided example demonstrates this with a `has_docstring()` function. This function doesn't care *what* its input function does; it only cares about operating *on* the function object itself to check for a docstring. This separates the concern of the check from the specific logic of the functions being checked.

#### Primary Goal

To enable the creation of higher-order functions that can modify or utilize the behavior of other functions, leading to more abstract, reusable, and modular code.

#### Mechanism

- **Step 1: Define the 'Worker' Functions**
    - Create one or more functions that will be passed as arguments. These functions contain specific logic. In the example, `no()` and `yes()` are the worker functions. One has a docstring, and the other does not.
- **Step 2: Define the 'Higher-Order' Function**
    - Create the main function that accepts another function as one of its parameters. This function's logic will operate on the function it receives. Here, `has_docstring(func)` is the higher-order function, and its parameter `func` is expected to be a function object.
- **Step 3: Pass the Worker Function as an Argument**
    - Call the higher-order function and pass the name of the worker function *without parentheses*. This is a critical distinction between [[Python - Referencing vs Calling a Function|referencing a function]] (passing the object) and calling it (executing it).

##### Code Translation

```python
# --- Step 1: Define the 'Worker' Functions ---
def no():
    return 42

def yes():
    """Return the value 42"""
    return 42

# --- Step 2: Define the 'Higher-Order' Function ---
def has_docstring(func):
    """Check to see if the function `func` has a docstring."""
    # The function operates on the passed function object `func`
    return func.__doc__ is not None

# --- Step 3: Pass the Worker Function as an Argument ---
# Note we are passing the function `no`, not the result of `no()`
result_no = has_docstring(no)
print(f"Does the 'no' function have a docstring? {result_no}")

# Pass the function `yes`
result_yes = has_docstring(yes)
print(f"Does the 'yes' function have a docstring? {result_yes}")

# Expected Output:
# Does the 'no' function have a docstring? False
# Does the 'yes' function have a docstring? True
```

 [[Code - Passing Functions as Arguments Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Function Signature**
    - The most important consideration is the 'signature' of the function being passed—the arguments it takes and the value it returns. The higher-order function often relies on this signature. For example, the `key` argument in Python's `sorted()` function expects a function that takes one argument and returns a comparable value.
- **State and Side Effects**
    - Be mindful of whether the passed function has side effects (e.g., modifying a global variable, printing to the console). A higher-order function might not anticipate these, leading to unexpected behavior.

#### Core Trade-offs

- **Pro: Abstraction and Reusability**
    - Allows you to write generic functions that can be customized with specific behaviors, reducing code duplication. The `sorted()` function is a perfect example; it provides the sorting logic, and you provide the `key` function to define *how* to sort.
- **Pro: Enables Powerful Patterns**
    - This is the foundation for decorators, callbacks (e.g., in GUIs or asynchronous programming), and many patterns used in functional programming.
- **Con: Increased Indirection**
    - The flow of execution can be harder to follow. When you see `wrapper(my_func)`, you have to look at the definition of `wrapper` to understand what will happen to `my_func`, which adds a layer of cognitive overhead.

## Connections

```
```
                           (Parent)
                 Functions as First-Class Objects
                              ▲
                              │
┌─────────────────────────────┼─────────────────────────────┐
│                             │                             │
(Prerequisite)       ┌──────────────────────────────────┐      (Inverse)
Referencing vs       │  Passing Functions as Arguments  │      Returning Functions
Calling a Function   └──────────────────────────────────┘      from Functions
                              │
                              │
                          (Used In)
                              │
                          Decorators
```
```

### Parent Concept

This concept is a direct consequence of the fact that Python treats [[Python - Functions as First-Class Objects|functions as first-class objects]], meaning they can be handled like any other data type.

### Child Concepts



### Related Concepts 

- Understanding the difference between [[Python - Referencing vs Calling a Function|referencing and calling a function]] is essential for correctly passing them as arguments.
- The ability to [[Python - Assigning Functions to Variables|assign functions to variables]] is another key aspect of functions being first-class objects.
- The inverse of this pattern is [[Python - Returning Functions from Functions|returning functions from other functions]], which is used to create function factories and closures.
- This technique is also fundamental to [[Python - Storing Functions in Data Structures|storing functions in data structures]] like lists or dictionaries.
## Questions

- Decorators heavily rely on passing functions as arguments. When might the added abstraction of a decorator actually harm code readability for a junior developer, and how would you decide whether to use a decorator versus a more explicit function call for a given piece of logic?
- Imagine a data processing pipeline where different validation rules (each a function) need to be applied to a DataFrame based on a configuration file. How would you design a system that dynamically loads these validation functions and passes them to a generic `validate_data(dataframe, validation_func)` processor, and what are the potential security risks of loading functions by name from a config?
- What if Python's functions were *not* first-class objects and couldn't be passed as arguments? How would you replicate the functionality of `list.sort(key=...)` or `functools.reduce`? What design patterns would emerge to compensate for this limitation?