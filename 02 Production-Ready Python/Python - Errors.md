---
tags: 
  - core
  - python
  - runtime_error
  - exception
  - traceback
  - debugging
  - fail_fast
  - concept
source: 
  - "[[Introduction to Functions in Python]]"
related: 
  - "[[Python]]"
  - "[[Python - Error Handling]]"
  - "[[Python - Exceptions]]"
  - "[[Python - try-except Clause]]"
  - "[[Python - Catching Specific Exceptions]]"
  - "[[Python - Raising Errors]]"
  - "[[Python - ValueError vs TypeError]]"
  - "[[Python - Functions]]"
  - "[[Python - Data Types]]"
  - "[[Fundamental - Programming]]"
  - "[[Python - Conditional Statements]]"
  - "[[Python - Debugging]]"
  - "[[Python - Control Flow]]"
  - "[[Fundamental - Software Engineering]]"
---
# Core: Errors

## Summary

>An error is an event that disrupts the normal flow of a program's execution when an operation is attempted that is not valid. Python signals these events by raising an [[Python - Exceptions|exception]], which, if not handled, will stop the program and display a traceback message.

**Why This Matters:** Errors are Python's essential feedback mechanism, immediately halting incorrect operations to prevent silent data corruption and guide developers toward robust code.

_Analogy:_ _Think of a Python program as a factory assembly line. Each function is a specific machine designed for a particular task. An error is like a safety sensor on a machine that immediately shuts down the entire line when the wrong part is fed into it—for example, trying to put a block of wood into a machine designed to shape metal._

The machine (function) stops, a red light flashes (the error message), and a report is generated (the traceback) indicating exactly which machine failed and why. This prevents the wrong part from damaging subsequent machines or resulting in a faulty final product. **Where it breaks down:** In a real factory, you might want to divert the wrong part and keep the line running. In Python, an unhandled error stops everything by default. To achieve the 'divert and continue' behavior, you need to implement specific [[Python - Error Handling|error handling]] mechanisms like the [[Python - try-except Clause|try-except clause]].

```
Input: 'hello'
    │
    ▼
┌──────────────────┐
│ float() function │  ───────► Is this a valid number string?
└──────────────────┘
    │
    │ No
    ▼
┌──────────────────┐
│   RAISE ERROR    │
│  (ValueError)    │
└──────────────────┘
    │
    ▼
Program HALTS
```

## Details

When you use a function or perform an operation incorrectly in Python, it's designed to stop you in your tracks by 'throwing' an error. For instance, if you ask the `float()` function to convert the word 'hello' into a number, it simply can't. Instead of guessing or returning a nonsensical value, Python raises a `ValueError`. This is a crucial feature, not a bug. It's the language's way of communicating that something has gone wrong. These errors are formally known as [[Python - Exceptions|exceptions]], and they come in many specific types that help you diagnose the exact problem, such as **`ValueError`** for incorrect values and **`TypeError`** for incorrect data types.

#### Primary Goal

To immediately and explicitly halt program execution when an invalid operation occurs, preventing unpredictable behavior and providing clear, diagnostic feedback to the developer.

#### Mechanism

- **How it Works:**
    1. **Invalid Operation:** A line of code attempts an operation that is not permitted, such as dividing by zero or trying to add a number to a string.
    2. **Exception Object Creation:** The Python interpreter detects the issue and creates an 'exception object' that contains information about what went wrong.
    3. **Raising the Exception:** The interpreter 'raises' this exception, which interrupts the normal program flow.
    4. **Stack Unwinding (Traceback):** If the exception isn't 'caught' by an [[Python - Error Handling|error handling]] block (like a [[Python - try-except Clause|try-except clause]]), the program stops. It then prints a 'traceback', which shows the sequence of function calls that led to the error, pinpointing the exact location of the problem.
- **Common Error Types:**
    - These are specific classes of [[Python - Exceptions|exceptions]] that signal different kinds of problems. Understanding the type of error is the first step in debugging.
    - **Example:** The distinction between a `ValueError` and a `TypeError` is a fundamental concept in Python error diagnosis, as explored in [[Python - ValueError vs TypeError]].
	    - **`ValueError`:** Raised when a function receives an argument of the correct type but an inappropriate value. *e.g., `int('abc')`*
	    - **`TypeError`:** Raised when an operation or function is applied to an object of an inappropriate type. *e.g., `'5' + 2`*
	    - **`NameError`:** Raised when a variable or function name is not found. *e.g., `print(my_undefined_variable)`*
	    - **`IndexError`:** Raised when a sequence subscript is out of range. *e.g., `my_list = [1, 2]; print(my_list[2])`*
	    - **`KeyError`:** Raised when a dictionary key is not found. *e.g., `my_dict = {'a': 1}; print(my_dict['b'])`*
	    - **`ZeroDivisionError`:** Raised when the second argument of a division or modulo operation is zero. *e.g., `10 / 0`*

##### Code Translation

```python
# --- Step 1: Attempt an invalid operation ---
# The float() function expects a string that looks like a number.
# We are giving it a non-numeric string.

print("Attempting to convert 'hello' to a float...")

# --- Step 2: Python raises an exception ---
# This line will cause the program to crash and will not execute further.
# The interpreter creates and raises a ValueError object.

value = float('hello') 

# --- Step 3: Program halts and prints a traceback ---
# This line is never reached because the error stops execution.
print("Conversion successful!")

# The output in the console will be:
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
# ValueError: could not convert string to float: 'hello'
```

 [[Code - Errors Implementation|View Full Implementation & Analysis]]

#### Core Trade-offs

- **Pro: Fail-Fast Principle**
    - Errors cause the program to stop immediately upon detecting an invalid state. This prevents the error from propagating and causing more subtle, harder-to-debug issues or data corruption later on.
- **Con: Abrupt Termination**
    - By default, an unhandled error will crash the entire application. For critical systems (like a web server or a data processing pipeline), this is unacceptable. This necessitates implementing explicit [[Python - Error Handling|error handling]] to manage failures gracefully.
- **Pro: Explicit and Informative**
    - The traceback provides a clear 'stack trace' showing the exact line and sequence of calls that led to the error, which is invaluable for debugging.
- **Con: Can Expose Implementation Details**
    - In production systems, raw error messages and tracebacks can reveal sensitive information about the code's structure or the data it was processing. They should be logged for developers but not shown to end-users.

## Connections

```
                  (Parent)
                   Python
                     ▲
                     │
┌────────────────────┼────────────────────┐
│                    │                    │
(Mechanism For)   ┌──────────────┐      (A Type Of)
Error Handling    │    Errors    │      Exceptions
                  └──────────────┘
                         │
                         ▼ (Handled By)
                 try-except Clause
```

### Parent Concept

Errors are a fundamental concept within the [[Python]] programming language, serving as its primary mechanism for signaling runtime problems.

### Child Concepts

- The primary way to manage errors is through [[Python - Error Handling|error handling]], which provides structured ways to anticipate and respond to potential failures.

### Related Concepts 

- Errors are a specific implementation of the broader concept of [[Python - Exceptions|exceptions]], which represent any event that disrupts the normal flow of a program.
- The most common way to deal with potential errors is by using a [[Python - try-except Clause|try-except clause]] to 'catch' them before they crash the program.
- Understanding errors is critical when working with [[Python - Functions|functions]], as they are the primary way functions communicate incorrect usage or failed operations to the caller.
- Developers can also create and trigger their own errors using techniques for [[Python - Raising Errors|raising errors]] to enforce rules within their own code.
## Questions

- In a customer-facing API, you could either let an invalid input throw a detailed `ValueError` traceback or catch it and return a generic 'Invalid Request' message. What are the security and user experience trade-offs of each approach, and how would you decide which is better for the business?
- Imagine a distributed data processing pipeline where one of many worker nodes fails with a `MemoryError`. How would you design a system that logs the error, prevents the same task from being retried indefinitely, and notifies an operator without halting the entire pipeline?
- What if Python did not have exceptions and instead returned special values (like `None` or `-1`) to indicate an error, similar to how some C functions operate? How would this change the structure of a typical Python application, and what new categories of bugs might become more common?