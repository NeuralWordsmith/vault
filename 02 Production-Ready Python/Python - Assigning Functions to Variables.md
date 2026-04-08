---
tags: 
  - core
  - python
  - first-class functions
  - aliasing
  - function reference
  - higher-order functions
  - assignment
  - concept
source: 
  - "[[Writing Functions in Python]]"
related: 
  - "[[Python - Functions]]"
  - "[[Python - Functions as First-Class Objects]]"
  - "[[Python - Referencing vs Calling a Function]]"
  - "[[Python - Passing Functions as Arguments]]"
  - "[[Python - Returning Functions from Functions]]"
  - "[[Python - Storing Functions in Data Structures]]"
  - "[[Python - Nested Functions]]"
  - "[[Python - Scope]]"
  - "[[Python - Variables]]"
  - "[[Python - Objects]]"
  - "[[Python - Decorators]]"
  - "[[Python - Lambda Functions]]"
  - "[[Python - User-Defined Functions]]"
---
# Core: Assigning a Function to a Variable

## Summary

>In Python, functions are treated like any other object, such as an integer or a string. This means you can assign a function to a variable, giving it a new name or "alias" that can then be used to call it. This behavior is a direct consequence of the core principle of [[Python - Functions as First-Class Objects|functions being first-class objects]] and hinges on understanding the difference between [[Python - Referencing vs Calling a Function|referencing a function]] (using its name) and calling it (using its name with parentheses).

**Why This Matters:** This technique transforms functions from static code blocks into dynamic, portable data, enabling more flexible and powerful programming patterns like higher-order functions.

_Analogy:_ _Think of a contact in your phone. The actual person is the 'function'—they have a specific capability (e.g., answering your call). The name you save them under in your contacts list, like 'Mom' or 'Dr. Smith', is the 'variable'. You can create multiple contact entries for the same person, like 'Jane Doe' and 'Work - Jane', but both point to the same underlying phone number and connect you to the same person when you 'call' them._

The person maps to the function object, the contact name maps to the variable name, and the phone number maps to the function's memory address. 
*   **Where it breaks down:** A phone contact is just a label for a number. In Python, the variable doesn't just point to the function's address; it holds a direct reference to the function object itself, including all its properties and code. You can inspect the function object directly through the variable.

```
Memory
+---------------------------------+
|  Function Object (at 0x10a...)  |
|  def greet(name):               |
|    return f"Hello, {name}!"     |
+---------------------------------+
    ▲                  ▲
    │                  │
+----------+      +-----------------+
| Variable |      | Variable        |
| `greet`  |      | `say_hello`     |
+----------+      +-----------------+
    │                  │
    └----(points to)---┘
```

## Details

In Python, you can treat a function just like any other piece of data. You can take a function, whether it's one you wrote like `my_function()` or a built-in one like `print()`, and assign it to a variable using the `=` operator. This new variable then becomes another name for that function, allowing you to execute it using the new name. This is a fundamental aspect of Python's design, stemming from the principle that functions are [[Python - Functions as First-Class Objects|first-class citizens]].

#### Primary Goal

To create a new reference or alias for an existing function, making code more readable, flexible, or abstract.

#### Mechanism

- **Step 1: Define or Identify a Function**
    - Start with an existing function. This can be a function you've defined yourself or a built-in Python function.
- **Step 2: Assign the Function Reference**
    - Use the assignment operator (`=`) to assign the function's name—without parentheses—to a new variable. This action creates a new reference pointing to the original function object in memory; it does not create a copy of the function.
- **Step 3: Call the Function via the New Variable**
    - Use the new variable name followed by parentheses `()` and any required arguments to execute the original function's code. Calling the function via the new variable is identical to calling it by its original name.

##### Code Translation

```python
# --- Step 1: Define or Identify a Function ---
# A simple user-defined function
def greet(name):
    return f"Hello, {name}!"

# We will also use the built-in print() function.

# --- Step 2: Assign the Function Reference ---
# Assign the 'greet' function to a new variable 'say_hello'
say_hello = greet

# Assign the built-in 'print' function to a fun new name
PrintyMcPrintface = print

# --- Step 3: Call the Function via the New Variable ---
# Calling say_hello() is the same as calling greet()
message = say_hello("Alice")
PrintyMcPrintface(message) # Outputs: Hello, Alice!

# You can prove they are the same object in memory
PrintyMcPrintface(f"Is say_hello the same object as greet? {say_hello is greet}") # Outputs: True
```

 [[Code - Assigning a Function to a Variable Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- This concept is a fundamental language feature and does not have parameters or hyperparameters to tune. It is a direct assignment operation inherent to how Python handles objects.

#### Core Trade-offs

- **Pro: Flexibility & Abstraction**
    - Allows functions to be treated as data, which is the foundation for advanced patterns like [[Python - Passing Functions as Arguments|passing functions to other functions]] and [[Python - Storing Functions in Data Structures|storing them in lists or dictionaries]].
- **Pro: Readability (Aliasing)**
    - Can give a function a more context-specific name. For example, `calculate_tax = get_federal_income_tax_rate_2024` can make the code's intent clearer within a specific module.
- **Con: Potential for Confusion**
    - Overusing aliasing, especially with non-descriptive names (e.g., `f = my_complex_function`), can obscure the code's logic and make it harder for others to trace where the original functionality is defined.

## Connections

```
                      (Parent)
                      Functions
                          ▲
                          │
    ┌─────────────────────┼─────────────────────┐
    │                     │                     │
(Enabling Principle) ┌──────────────────────────────────┐ (Direct Application)
Functions as         │ Assigning a Function to a Variable │ Storing Functions
First-Class Objects  └──────────────────────────────────┘ in Data Structures
                                  │
                                  │
                      (Crucial Distinction)
                 Referencing vs Calling a Function
```

### Parent Concept

This concept is a direct application of the broader topic of [[Python - Functions]], which covers how to define and use reusable blocks of code.

### Child Concepts

- This is a foundational technique rather than a concept with distinct sub-types. It serves as a building block for more advanced patterns.

### Related Concepts 

- This capability exists because Python treats functions as [[Python - Functions as First-Class Objects|first-class objects]], allowing them to be handled like any other data type.
- A critical prerequisite is understanding the difference between [[Python - Referencing vs Calling a Function|referencing a function]] (the name) and calling it (the name with parentheses).
- This technique is the basis for [[Python - Storing Functions in Data Structures|storing functions in data structures]], such as creating a dispatch table with a dictionary of functions.
- It also enables higher-order functions, such as [[Python - Passing Functions as Arguments|passing a function as an argument]] to another function or [[Python - Returning Functions from Functions|returning a function from another function]].
## Questions

- You're refactoring a legacy system where a core calculation function is used in 20 different modules under slightly different contexts. Would you create a specific, context-rich alias for the function in each module (e.g., `calculate_invoice_tax = core_calc`), or enforce using the single, generic `core_calc` name everywhere? Justify your choice in terms of long-term maintainability vs. immediate readability.
- Imagine a plugin-based architecture where users can supply their own Python files with custom processing functions. How would you design a system that dynamically discovers and assigns these user-defined functions to a standardized set of variable names or stores them in a registry for later execution, and what are the security risks of this approach?
- What if Python's assignment operator (`=`) for functions created a deep *copy* of the function's code and its closure, rather than just creating a new reference to the same object? How would this fundamentally change patterns like decorators or monkey-patching, and would it make Python code safer or more confusing?