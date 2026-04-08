---
tags:
  - core
  - python
  - documentation
  - metadata
  - readability
  - code_quality
  - pep_257
  - concept
source:
  - "[[Introduction to Functions in Python]]"
related:
  - "[[Python - User-Defined Functions]]"
  - "[[Python - Function Definition (def keyword)]]"
  - "[[Python - Function Body]]"
  - "[[Python - Function Header & Body Relationship]]"
  - "[[Python - Calling a Function]]"
  - "[[Python - Parameters vs Arguments]]"
  - "[[Python - Function Return Values (return keyword)]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Python - Comments]]"
  - "[[Python - Type Hinting]]"
  - "[[Python - help() Function]]"
  - "[[Python - __doc__ Attribute]]"
  - "[[Tools - Sphinx]]"
---
# Core: Docstrings

## Summary

>A docstring is a string literal that occurs as the first statement in a Python module, function, class, or method definition. Its purpose is to provide documentation on what the code does, its parameters, and its return values, serving as an essential part of a well-defined [[Python - User-Defined Functions|user-defined function]].

**Why This Matters:** Docstrings are crucial for creating maintainable and collaborative code by embedding documentation directly into functions, making them self-explanatory to other developers and automated tools.

_Analogy:_ _A docstring is like the instruction manual that comes with a new kitchen appliance. The appliance itself is the function's code—it performs a specific task. But to use it correctly and safely, you don't take it apart to see how the circuits work; you read the manual._

In this analogy:
- **The Appliance:** The function's code, specifically the [[Python - Function Body|function body]], which contains the logic to perform a task.
- **'What it Does' Section:** The one-line summary at the top of the docstring.
- **'Controls & Inputs' Section:** The `Args` section of the docstring, which describes the function's [[Python - Parameters vs Arguments|parameters]].
- **'Expected Results' Section:** The `Returns` section, which describes the [[Python - Function Return Values (return keyword)|return value]].
- **Where it breaks down:** Unlike a static paper manual, a docstring is 'live' documentation. It can be accessed programmatically within Python using the `help()` function or the `__doc__` attribute, and it's used by IDEs to provide real-time assistance.

```
def function_name(parameter1, parameter2):
    |
    +---> """This is the docstring.
    |      It explains the function's purpose,
    |      arguments, and return value.
    |      """
    |
    +---> # This is the function body.
         return parameter1 + parameter2
```

## Details

In Python, a docstring is the standard way to create documentation for your code. It's more than just a comment; it's a special attribute of the function object itself. Placed immediately after the [[Python - Function Header & Body Relationship|function header]], and enclosed in triple quotes (`"""` or `'''`), it provides a high-level summary of the function's purpose. This allows anyone, including your future self, to understand what a function does without having to decipher its internal logic. Adherence to docstring conventions is a cornerstone of writing clean, professional Python code.

#### Primary Goal

To provide clear, accessible documentation about a function's purpose, parameters, and return values directly within the code itself, making it understandable for both humans and automated tools.

#### Mechanism

- **Step 1: Define the Function Header**
    - Begin by defining the function using the [[Python - Function Definition (def keyword)|`def` keyword]], followed by the function name and its parameters in parentheses. This forms the function's signature.
- **Step 2: Open the Docstring and Write a Summary**
    - On the very next line, indented, start the docstring with triple quotation marks (`"""`). Write a concise, one-sentence summary of the function's purpose.
- **Step 3: Detail Parameters and Return Value**
    - After a blank line, add sections to describe the arguments (`Args:`) and the return value (`Returns:`). For each parameter, specify its name, type, and a brief description. Do the same for the return value.
- **Step 4: Close the Docstring and Add the Function Body**
    - Close the docstring with another set of triple quotation marks (`"""`). Following this, write the actual code that the function will execute, which constitutes the [[Python - Function Body|function body]].

##### Code Translation

```python
# --- Step 1: Define the Function Header ---
def calculate_area(length, width):
    # --- Step 2: Open the Docstring and Write a Summary ---
    """Calculates the area of a rectangle.

    # --- Step 3: Detail Parameters and Return Value ---
    Args:
        length (int or float): The length of the rectangle.
        width (int or float): The width of the rectangle.

    Returns:
        int or float: The calculated area of the rectangle.
    """
    # --- Step 4: Close the Docstring and Add the Function Body ---
    area = length * width
    return area

# You can access the docstring programmatically:
print(calculate_area.__doc__)
```

 [[Code - Docstrings Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Docstring Formats/Styles**
    - While Python is flexible, several standard formats have emerged to ensure consistency, which are understood by documentation generators like Sphinx.
    - **Google Style:**
        - Highly readable and easy to write. Uses sections like `Args:`, `Returns:`, and `Raises:`.
    - **NumPy/SciPy Style:**
        - More verbose and structured, common in the scientific computing community. Uses sections like `Parameters`, `Returns`, and `Examples`.
    - **reStructuredText (reST):**
        - The official standard for Python's own documentation. It's very powerful but can be more complex to write correctly.

#### Core Trade-offs

- **Benefit: Improved Readability and Maintainability**
    - Well-written docstrings make code significantly easier to understand, debug, and modify, especially in large, collaborative projects.
- **Benefit: Enables Automated Tooling**
    - Tools like Sphinx can automatically parse docstrings to generate professional-looking HTML documentation. IDEs also use them to provide context-aware help and autocompletion.
- **Cost: Maintenance Overhead**
    - Docstrings require effort to write and, more importantly, to keep up-to-date. An outdated docstring that contradicts the code is often more harmful than no docstring at all.

## Connections

```
                      (Parent)
             User-Defined Functions
                       ▲
                       │
    ┌──────────────────┼──────────────────┐
    │                  │                  │
(Describes)    ┌──────────────────┐    (Describes)
Parameters     │    Docstrings    │    Return Values
               └──────────────────┘
                       │
           ┌───────────┴───────────┐
           │                       │
      Google Style           NumPy Style
    (Formatting Convention) (Formatting Convention)
```

### Parent Concept

Docstrings are a fundamental component for documenting [[Python - User-Defined Functions|user-defined functions]], providing a standardized way to explain their behavior.

### Child Concepts

- While docstrings don't have conceptual children in an algorithmic sense, they are implemented using specific community-standard formats such as **Google Style**, **NumPy Style**, and **reStructuredText**.

### Related Concepts 

- A docstring is placed immediately after the [[Python - Function Definition (def keyword)|function definition]] and its header.
- It serves to explain the logic contained within the [[Python - Function Body|function body]] without requiring a developer to read the underlying code.
- A key part of a good docstring is describing the expected [[Python - Function Return Values (return keyword)|return value]] of the function.
- It clarifies the purpose of a function's inputs, which are defined as parameters in the header and are distinct from the [[Python - Parameters vs Arguments|arguments]] passed when [[Python - Calling a Function|calling a function]].
## Questions

- Your team is behind schedule on a critical feature. A senior developer argues for skipping docstrings to ship faster, claiming 'the code is self-documenting'. How do you argue for the long-term business value of maintaining documentation standards, even under pressure?
- Imagine you are building a large internal library for data scientists at your company. How would you design a system to enforce a consistent docstring style (e.g., Google style) across all contributions and automatically generate a user-facing documentation website from these docstrings?
- What if Python's `help()` function and all IDE tooltips were disabled? What alternative, in-code documentation methods could you devise that would be as discoverable and useful as docstrings, and what would their limitations be?