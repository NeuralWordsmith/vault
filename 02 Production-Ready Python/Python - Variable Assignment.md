---
tags: 
  - core
  - python
  - assignment
  - identifier
  - memory_reference
  - object
  - namespace
  - concept
source: 
  - "[[Introduction to Python]]"
related: 
  - "[[10 Utility Notes/Fundamental - Programming.md]]"
  - "[[Python - Data Types]]"
  - "[[Python - Using Variables in Calculations]]"
  - "[[Python - Variables for Code Reproducibility]]"
  - "[[Python - type() Function]]"
  - "[[Python - Integer (int) Data Type]]"
  - "[[Python - Float Data Type]]"
  - "[[Python - String (str) Data Type]]"
  - "[[Python - Boolean (bool) Data Type]]"
  - "[[Python - Type-Dependent Operator Behavior]]"
  - "[[10 Utility Notes/Fundamental - Computer Science.md]]"
  - "[[Python - Lists]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Scope]]"
---
# Core: Variables

## Summary

>A variable is a named container in a computer's memory used to store a piece of information. As shown in the example of storing height and weight, you use an assignment operator (=) to give a value to a variable name. Once assigned, you can refer to the value simply by using its name. The kind of data stored, such as a number or text, determines the variable's [[Python - Data Types|data type]].

**Why This Matters:** Variables are the fundamental building blocks of programming, allowing you to store, label, and manipulate data, which is essential for creating any dynamic and useful software.

_Analogy:_ _Think of a variable as a labeled storage box. You can put something inside the box (the value), and the label on the outside (the variable name) tells you what's inside without having to look. If you want to know your height, you just look for the box labeled "height"._

-
**Variable Name:** The label on the box (e.g., `height`).
- **Value:** The contents of the box (e.g., `1.79`).
- **Assignment (=):** The act of putting something into the box.
- **Retrieval:** Looking at the label to know what's inside.
- **Where it breaks down:** In Python, variables are more like labels pointing to objects in memory rather than being the boxes themselves. Multiple labels (variables) can point to the exact same object. If you change the object through one label, all other labels pointing to it will see the change. A physical box can only be in one place.

```
Variable Name      Memory Location      Value
-------------      ---------------      -----
   height     ─────►   (0x10a2b3c)   ─────► 1.79
   weight     ─────►   (0x10a2b3d)   ─────► 68.7
```

## Details

In Python, a variable is a symbolic name that acts as a reference or pointer to an object stored in memory. When you measure your height as 1.79 meters and weight as 68.7 kilograms, you can create variables named `height` and `weight` to store these values. This is done using the equals sign (=), known as the assignment operator. After this assignment, typing the variable name `height` instructs Python to find that label, retrieve the associated value (`1.79`), and display it. This mechanism allows us to work with data using easy-to-remember names instead of raw memory addresses, forming the basis for more complex operations like [[Python - Using Variables in Calculations|using variables in calculations]].

#### Primary Goal

To provide a human-readable way to label and access data stored in a computer's memory for later use.

#### Mechanism

- **Step 1: Choose a Name (Identifier)**
    - Select a descriptive, valid name for your variable. For example, `height`.
- **Step 2: Use the Assignment Operator**
    - Type the equals sign (=) after the variable name. This operator tells Python to assign the value on the right to the name on the left.
- **Step 3: Provide a Value**
    - Place the data you want to store to the right of the equals sign. For instance, `1.79`. The type of this data, like a [[Python - Float Data Type|float]] or an [[Python - Integer (int) Data Type|integer]], is automatically determined by Python.
- **Step 4: Retrieve the Value**
    - To use the stored data, simply type the variable's name. Python will look it up and substitute its value.

##### Code Translation

```python
# --- Step 1, 2, & 3: Assigning values to variables ---
# Assign the value 1.79 to the variable named 'height'
height = 1.79

# Assign the value 68.7 to the variable named 'weight'
weight = 68.7

# --- Step 4: Retrieving the value ---
# Typing the variable name in an interactive session prints its value
print(height)
# Expected Output: 1.79

print(weight)
# Expected Output: 68.7
```
#### Key Parameters

- **Naming Rules (Syntax)**
    - Must start with a letter (a-z, A-Z) or an underscore (`_`).
    - Cannot start with a number.
    - Can only contain alpha-numeric characters and underscores (A-z, 0-9, and `_`).
    - Are case-sensitive (`age`, `Age`, and `AGE` are three different variables).
- **Naming Conventions (Style)**
    - Use `snake_case` for variable names (all lowercase with underscores separating words), e.g., `body_mass_index`.
    - Choose names that are descriptive and unambiguous to improve [[Python - Variables for Code Reproducibility|code reproducibility and readability]].

#### Core Trade-offs

- **Scope and Lifetime**
    - Variables can have a limited scope (local), existing only within a function, or a global scope, accessible from anywhere. Overusing global variables can lead to complex dependencies and bugs that are hard to trace.
- **Readability vs. Brevity**
    - Very short variable names (e.g., `h`, `w`) can make code concise but hard to understand. Descriptive names (e.g., `height_in_meters`) improve clarity at the cost of being more verbose.
- **Mutability**
    - The object a variable points to can be mutable (changeable, like a list) or immutable (unchangeable, like a number or string). Reassigning an immutable variable actually creates a new object in memory, which can have performance implications in large-scale operations.

## Connections

```
                      (Parent)
               Fundamental - Programming
                           ▲
                           │
           ┌───────────────┼────────────────────────────┐
           │               │                            │
(Determines Behavior)┌───────────────────┐ (Enables)
   Data Types        │     Variables     │ Using Variables in Calculations
                     └───────────────────┘
                           │
                           ▼
                      (Enables)
           Variables for Code Reproducibility
```

### Parent Concept

Variables are a foundational concept within [[10 Utility Notes/Fundamental - Programming.md|Fundamental - Programming]], serving as the primary mechanism for storing and managing data in any language.

### Child Concepts

- The core purpose of variables is demonstrated when [[Python - Using Variables in Calculations|using variables in calculations]], where named values are manipulated to produce new results.
- Properly named variables are crucial for [[Python - Variables for Code Reproducibility|code reproducibility]], making logic clear and maintainable for others (and your future self).

### Related Concepts 

- The value a variable holds always has one of the built-in [[Python - Data Types|data types]], which dictates how it can be used.
- You can inspect a variable's type at any time using the [[Python - type() Function|type() function]].
- For example, a variable can hold a [[Python - Float Data Type|floating-point number]] like `1.79` or a [[Python - String (str) Data Type|string]] like `'hello'`.
## Questions

- In a large-scale financial modeling application, you could use very short variable names (`i` for interest rate, `p` for principal) to make complex formulas appear more like their textbook mathematical representations, or long, descriptive names (`annual_interest_rate`, `initial_principal_amount`) for clarity. How would you decide which convention to enforce for the team, and what is the potential business impact of that choice on long-term maintenance costs versus initial development speed?
- Imagine a real-time data processing pipeline where millions of temporary variables are created and destroyed per second inside a core processing function. How would you design a system to monitor memory usage related to this variable churn, and what strategies could you employ in Python to minimize memory fragmentation and potential performance degradation over time?
- What if Python's variable assignment was 'copy-by-value' for all objects (like in some other languages), instead of its actual 'assignment-by-reference' model? How would this fundamentally change the way you'd write a program that processes a large, complex data structure like a nested dictionary, and what new categories of bugs might become more common?