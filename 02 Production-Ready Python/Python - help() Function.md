---
tags: 
  - core
  - python
  - help()
  - docstring
  - introspection
  - documentation
  - built-in
  - concept
source: 
  - "[[Introduction to Python]]"
related: 
  - "[[Python - Functions]]"
  - "[[Python - Function Arguments]]"
  - "[[Python - Optional Arguments]]"
  - "[[Python - Function Calls (Input-Process-Output)]]"
  - "[[Python - round() Function]]"
  - "[[Python - max() Function]]"
  - "[[Fundamental - Programming]]"
  - "[[Python - Data Types]]"
  - "[[Python - Variables]]"
  - "[[Python - Methods]]"
  - "[[Python - Docstrings]]"
  - "[[Python - Introspection]]"
---
# Core: Discovering Built-in Functions

## Summary

>In Python, you don't need to memorize every function. The `help()` function is a built-in utility that acts as an instant documentation lookup. By passing a function's name into `help()`, you can immediately see a description of what it does, what inputs (or [[Python - Function Arguments|arguments]]) it requires, and what it returns, directly in your console.

**Why This Matters:** Using built-in help allows you to understand and use unfamiliar code directly within your programming environment, dramatically speeding up learning and development without breaking your workflow.

_Analogy:_ _Using the `help()` function is like having an instant user manual for every tool in a workshop. Instead of guessing what a strange-looking wrench does, you can instantly pull up its official guide. The guide tells you the tool's name (the function), what it's designed to work on (the `number` argument), and if there are any special adjustments you can make (the `ndigits` [[Python - Optional Arguments|optional argument]])._

*   **The Tool:** A specific Python function (e.g., `round()`).
*   **The User Manual:** The documentation provided by the `help()` function.
*   **What it Works On:** The required arguments (e.g., `number`).
*   **Special Adjustments:** The optional arguments (e.g., `ndigits`).
*   **Where it breaks down:** A physical user manual is static. The `help()` function pulls up documentation that is part of the code itself (a 'docstring'), so it's always the correct version for the code you are running, which is a significant advantage.

```
          You have a question about a function
                         │
                         ▼
┌──────────────────────────────────────────┐
│ Call help() with the function name       │
│ e.g., `help(round)`                      │
└──────────────────────────────────────────┘
                         │
                         ▼
                  Python Interpreter
                         │
                         ▼
┌──────────────────────────────────────────┐
│ Displays the function's documentation    │
│ (its "docstring") in your console.       │
└──────────────────────────────────────────┘
```

## Details

When you encounter a new function or forget the details of one you know, how do you find out how to use it? While searching online is an option, Python provides a more immediate solution: the `help()` function. This powerful tool lets you inspect any object, including [[Python - Functions|functions]], and retrieve its documentation on the spot. For example, as the context shows, calling `help(round)` reveals that the `[[Python - round() Function|round()]]` function takes two arguments, `number` and `ndigits`, clarifying how it works without ever leaving your programming environment.

#### Primary Goal

To provide developers with instant, in-environment access to the documentation for any Python object, explaining its purpose, parameters, and return value.

#### Mechanism

- **Step 1: Identify the Target Function**
    - First, determine which function you need to learn about. This could be a built-in function like `round` or `max`, or a function from a library you've imported.
- **Step 2: Call the `help()` Function**
    - Type `help()` and place the name of the target function inside the parentheses without quotes. For example, to get help on the `round` function, you would write `help(round)`.
- **Step 3: Interpret the Documentation**
    - The console will display the function's 'docstring'. This text explains what the function does, lists its parameters (arguments), and describes what kind of value it outputs. This is the core of the [[Python - Function Calls (Input-Process-Output)|Input-Process-Output]] model for that specific function.

##### Code Translation

```python
# --- Step 1 & 2: Identify the target function and call help() ---
# Let's find out how the round() function works.
help(round)

# --- Output from help(round) ---
# Help on built-in function round in module builtins:
#
# round(number, ndigits=None)
#     Round a number to a given precision in decimal digits.
#
#     The return value is an integer if ndigits is omitted or None. Otherwise
#     the return value has the same type as the number.
#     ndigits may be negative.

# Let's try it on another function, max()
help(max)

# --- Output from help(max) ---
# Help on built-in function max in module builtins:
#
# max(...)
#    max(iterable, *[, default=obj, key=func]) -> value
#    max(arg1, arg2, *args, *[, key=func]) -> value
#
#    With a single iterable argument, return its biggest item. The
#    default keyword-only argument specifies an object to return if
#    the provided iterable is empty.
#    With two or more arguments, return the largest argument.
```

#### Key Parameters

- **Object (`object`)**
    - The `help()` function takes one primary argument: the object you want to learn about. This is typically a function name (e.g., `round`, `max`, `print`), but it can be any Python object, like a data type (`int`, `str`) or a module.

#### Core Trade-offs

- **Pro: Immediacy and Context**
    - The biggest advantage is speed. You get answers without switching to a web browser, which keeps you in the flow of coding. The documentation is also guaranteed to be for the exact version of the code you are running.
- **Con: Can Be Terse or Overwhelming**
    - The quality of the help text depends entirely on how well the function's 'docstring' was written. For complex functions, the output can be dense and hard to read. Official online documentation often provides more examples and friendlier formatting.

## Connections

```
                             (Parent)
                         Fundamental - Programming
                                    ▲
                                    │
┌───────────────────────────────────┼───────────────────────────────────┐
│                                   │                                   │
(Used to understand)     ┌───────────────────────────────────┐     (Used to understand)
Python - Functions       │ Discovering Built-in Functions    │     Python - Function Arguments
                         └───────────────────────────────────┘
                                    │
                                    │ (Examples of what can be discovered)
                                    ▼
                      Python - round() Function
                      Python - max() Function
```

### Parent Concept

This concept is a utility within the broader topic of [[Fundamental - Programming|Programming]], providing a mechanism for learning and discovery within the language itself.

### Related Concepts 

- The `help()` function is essential for understanding the structure and requirements of [[Python - Functions|functions]].
- It is the primary tool for discovering the specific [[Python - Function Arguments|arguments]] a function accepts, including both required and [[Python - Optional Arguments|optional ones]].
- You can use `help()` to explore the behavior of specific built-in functions like [[Python - round() Function|round()]] and [[Python - max() Function|max()]].
- By revealing the inputs and outputs, `help()` clarifies the [[Python - Function Calls (Input-Process-Output)|Input-Process-Output model]] for any given function.
## Questions

- When would relying solely on `help()` be a risk for a junior developer on a critical project, and what process would you implement to supplement it with more comprehensive documentation practices?
- If you were building a large internal Python library for your company, how would you design and enforce a documentation standard (docstrings) to ensure that `help()` provides maximum value to all developers using the library?
- What if the `help()` function and docstrings were removed from Python? What alternative, in-terminal tools or workflows could you create to replicate the core functionality of immediate object introspection?