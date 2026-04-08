---
tags: 
  - core
  - python
  - error_handling
  - runtime_error
  - traceback
  - exception_types
  - program_flow
  - concept
source: 
  - "[[Introduction to Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Error Handling]]"
  - "[[Python - Exception Handling with try-except-finally]]"
  - "[[Python - Raising Exceptions]]"
  - "[[Python - Built-in Exception Hierarchy]]"
  - "[[Python - Custom Exceptions]]"
  - "[[Python - Defining Custom Exceptions]]"
  - "[[Python - Custom Exceptions & Robust Object Creation Relationship]]"
  - "[[Python - Conditional Statements]]"
  - "[[Python - Functions]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Python - Data Types]]"
  - "[[Python - Lists]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Control Flow]]"
---
# Core: Exceptions

## Summary

>An exception is an error event that occurs during the execution of a Python program, disrupting the normal flow of instructions. If not managed, it will terminate the program and display a traceback message indicating the source of the error.

**Why This Matters:** Unhandled exceptions will crash your program, so understanding them is the first step toward building robust, reliable software that can recover from unexpected errors.

_Analogy:_ _An exception is like a fire alarm in a factory. The assembly line (your program's code) is running smoothly. Suddenly, a machine overheats and triggers the fire alarm (the exception). The entire assembly line halts immediately to prevent further damage. A supervisor (the exception handler) must then follow a specific emergency procedure to address the problem before production can resume._

**Where it breaks down:** While a fire alarm is always a serious, unexpected event, in Python, we can sometimes anticipate and even intentionally trigger exceptions ([[Python - Raising Exceptions|raising them]]) as a way to control program flow or signal invalid states, which is not typical for a real-world alarm.

```
Normal Flow:
[Instruction 1] -> [Instruction 2] -> [Instruction 3] -> [Program End]

Exception Flow:
[Instruction 1] -> [Invalid Instruction] --(Exception!)--> [HALT]
                                                             |
                                                             V
                                                      [Traceback Printed]
```

## Details

In Python, certain operations are invalid and will cause an error when the program tries to execute them. For instance, dividing a number by zero or trying to add a number to a piece of text are impossible tasks. These runtime errors are known as exceptions. Python signals that an exceptional event has occurred by creating an exception object. Each exception has a specific type, like `ZeroDivisionError` or `TypeError`, which helps identify the exact nature of the problem. If an exception is not properly handled using a mechanism like a `try...except` block, it will immediately stop the program's execution and display a 'traceback' message.

#### Primary Goal

To signal that an error or other exceptional event has occurred during program execution, allowing the program to either terminate gracefully or handle the issue without crashing.

#### Mechanism

- **How it Works:**
    1. The Python interpreter executes code line by line.
    2. When it encounters an operation it cannot perform (e.g., `1 / 0`), it stops normal execution.
    3. It creates an exception object containing information about the error (e.g., its type and the line number where it occurred).
    4. The interpreter then searches for an appropriate handler, such as a [[Python - Exception Handling with try-except-finally|try...except block]], to manage the error.
    5. If no handler is found, the program halts and prints a traceback to the console, providing a detailed report of the error.
- **Common Built-in Exceptions:**
    - **`ZeroDivisionError`**: Occurs when a number is divided or modulo by zero. 
*Example: `5 / 0`*
    - **`TypeError`**: Raised when an operation or function is applied to an object of an inappropriate type. 
*Example: `5 + 'hello'`*
    - **`IndexError`**: Occurs when you try to access an index in a sequence (like a list) that is out of range. 
*Example: `my_list = [1, 2, 3]; print(my_list[3])`*
    - **`NameError`**: Raised when a local or global name (e.g., a variable) is not found. 
*Example: `print(undefined_variable)`*

##### Code Translation

```python
# This code demonstrates how different operations raise exceptions.
# Executing any of these lines individually in a Python interpreter
# will cause the program to halt and display the corresponding error.

# --- Raises ZeroDivisionError ---
# result = 1 / 0

# --- Raises TypeError ---
# result = 1 + "Hello"

# --- Raises IndexError ---
# my_list = [1, 2, 3]
# element = my_list[5]

# --- Raises NameError ---
# result = a + b # Assuming 'b' has not been defined
```

 [[Code - Exceptions Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Exception Information:**
    - Exceptions themselves don't have parameters in the way functions do. Instead, when an exception occurs, an 'exception object' is created.
    - This object carries information, such as an error message and a traceback, which can be accessed within an `except` block to understand and log the error.

#### Core Trade-offs

- **Unhandled Exceptions (The Default):**
    - **Pro:** Simple, requires no extra code. Immediately alerts the developer to a bug with a detailed traceback.
    - **Con:** Crashes the entire program, providing a poor user experience and potentially leaving the system in an unstable or corrupt state.
- **Handled Exceptions:**
    - **Pro:** Allows the program to recover from errors, log issues, and continue running, leading to more robust and user-friendly applications.
    - **Con:** Adds complexity to the code (`try...except` blocks). Overly broad exception handling can hide underlying bugs, making them harder to find and fix.

## Connections

```
                      (Parent)
                   Error Handling
                          ▲
                          │
          ┌───────────────┼────────────────────────────┐
          │               │                            │
(Mechanism)      ┌──────────────────┐             (Action)
try-except       │    Exceptions    │             Raising Exceptions
                 └──────────────────┘
                          │
                 ┌────────┴──────────┐
                 │                   │
    Built-in Exceptions     Custom Exceptions
```

### Parent Concept

Exceptions are a core component of [[Python - Error Handling|error handling]], representing the specific error events that need to be managed.

### Child Concepts

- Python includes a rich [[Python - Built-in Exception Hierarchy|hierarchy of built-in exceptions]], such as `TypeError`, `ValueError`, and `IndexError`, for common errors.
- Developers can also create [[Python - Custom Exceptions|custom exceptions]] to signal application-specific error conditions.

### Related Concepts 

- The primary mechanism for dealing with exceptions is [[Python - Exception Handling with try-except-finally|exception handling using `try...except` blocks]], which allows a program to catch and respond to errors without crashing.
- While Python raises exceptions automatically for invalid operations, a developer can also explicitly [[Python - Raising Exceptions|raise an exception]] using the `raise` keyword to signal a specific error condition.
- Understanding the [[Python - Built-in Exception Hierarchy|built-in exception hierarchy]] is crucial for writing specific and effective error handlers.
- The ability to [[Python - Defining Custom Exceptions|define custom exceptions]] is particularly useful when building libraries or complex applications where standard exceptions are not descriptive enough.
## Questions

- Imagine you're building a data ingestion pipeline that processes thousands of files per hour. You find that 1% of files have a formatting error that raises a `ValueError`. Would you configure the system to crash on the first error, or to log the error and skip the problematic file? How would you justify the business impact of potential data loss vs. pipeline uptime to a product manager?
- In a large, distributed microservices architecture, if one service raises an unhandled exception and crashes, what are the cascading failure risks for the entire system? How would you design a health-check and restart policy to mitigate this at the infrastructure level?
- What if Python had no concept of exceptions and instead returned special error codes or `None` for every function that could fail (similar to some other languages)? How would this change the way you structure your code, and what new categories of bugs might become more common?