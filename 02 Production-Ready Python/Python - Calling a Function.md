---
tags:
  - core
  - python
  - invocation
  - scope
  - concept
source:
  - "[[Introduction to Functions in Python]]"
related:
  - "[[Python - Functions]]"
  - "[[Python - Function Definition (def keyword)]]"
  - "[[Python - Function Body]]"
  - "[[Python - Parameters vs Arguments]]"
  - "[[Python - Function Return Values (return keyword)]]"
  - "[[Python - User-Defined Functions]]"
  - "[[Python - Docstrings]]"
  - "[[Python - Variables]]"
  - "[[Fundamental - Programming]]"
  - "[[Python - Key Characteristics]]"
  - "[[Python - Data Types]]"
  - "[[Python - Objects]]"
---
# Core: Function Call Execution

## Summary

>A function call, also known as function invocation, is the act of telling the program to execute the code contained within a function's body. When the Python interpreter encounters a function name followed by parentheses, it pauses the current execution flow, jumps to the function's definition, runs the code inside, and then returns to the point where it was called. This process is what makes a [[Python - Function Definition (def keyword)|defined function]] actually do something.

**Why This Matters:** Calling a function is the fundamental mechanism for executing reusable blocks of code, preventing repetition and making programs modular and easier to maintain.

_Analogy:_ _Think of a function definition as a recipe written on an index card. The recipe card itself (the function definition) doesn't cook anything. A function call is like telling a chef, 'Execute the recipe for Chocolate Cake now.' The chef stops what they are doing, picks up that specific recipe card, follows its instructions step-by-step (executes the function body), and once the cake is made, they return to their previous task._

**Where it breaks down:** A chef might improvise or use their judgment, but a function call is completely literal. The computer will execute the code in the [[Python - Function Body|function body]] exactly as written, with no creativity or deviation. The recipe card only becomes useful when you explicitly ask the chef to use it.

```
Main Program Flow
       │
       ▼
print("Start")
       │
       ▼
assign_number()  ────────►  1. Jump to function `assign_number`
                            2. Execute `new_value = 4`
                            3. Execute `print(...)`
       │                    4. Finish function body
       └─────────────────── 5. Return to main flow
       ▼
print("End")
```

## Details

A function call is the trigger that brings a defined function to life. While a [[Python - Function Definition (def keyword)|function definition]] simply creates a blueprint for a task, the call is the command that initiates that task. The context, 'new_value is assigned the value of 4', describes an action that only occurs *because* the function containing that line was called. This transfer of control to the function's scope and back again is a cornerstone of procedural programming.

#### Primary Goal

To execute a pre-defined, reusable block of code on demand, thereby activating its logic and producing a result or side effect.

#### Mechanism

- **Step 1: Define the Function**
    - First, a function must be defined using the `def` keyword. This block of code is stored in memory but is not executed yet. It establishes the relationship between the function's name and its body.
- **Step 2: Call the Function**
    - In the main part of the script, the function is called by writing its name followed by parentheses `()`. This is the signal to the interpreter to execute the function.
- **Step 3: Execute the Function Body**
    - The program's execution pointer jumps to the first line inside the function's body. Each line within the body is executed sequentially. In the example from the context, this is where `new_value = 4` would happen.
- **Step 4: Return Control**
    - Once the last line of the function body is executed (or a `return` statement is hit), the execution pointer jumps back to the line of code immediately following the original function call.

##### Code Translation

```python
# --- Step 1: Define the Function ---
# This blueprint is created and stored, but the code inside doesn't run.
def assign_number():
    """A simple function to demonstrate execution."""
    # This code is part of the function's body.
    new_value = 4
    print(f"Inside the function: new_value is {new_value}")

# --- Main program flow ---
print("Script started. About to call the function.")

# --- Step 2: Call the Function ---
# This line triggers the execution of the code inside assign_number().
assign_number()

# --- Step 3 & 4: Execution and Return ---
# The interpreter jumps into assign_number(), runs its code, and then returns here.
print("Function call complete. Script finished.")
```

 [[Code - Function Call Execution Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Parentheses `()`**
    - The parentheses are mandatory for a function call. They are what differentiate a call (which executes the function) from a reference to the function object itself.
    - They also serve as the container for passing data, known as arguments, into the function, which is a key concept explored in [[Python - Parameters vs Arguments|parameters vs. arguments]].

#### Core Trade-offs

- **Encapsulation vs. Scope Complexity**
    - Pro: Variables created inside a function (like `new_value`) are typically local. They exist only during that function call and are destroyed afterward. This prevents naming conflicts and is a core principle of modular code.
    - Con: For beginners, this concept of 'scope' can be confusing. A variable created inside a function cannot be accessed from outside after the call is complete, which can lead to `NameError` exceptions if not understood properly.
- **Readability vs. Performance Overhead**
    - Pro: Using functions makes code vastly more readable and maintainable. A well-named function call like `calculate_tax(income)` is self-documenting.
    - Con: There is a very small performance cost associated with the mechanics of a function call (pushing data to the call stack, transferring control). In 99.9% of cases, this is negligible and a worthwhile trade for clarity, but in extremely performance-sensitive, tight loops with millions of iterations, it can sometimes be a factor.

## Connections

```
          (Parent)
      Python - Functions
             ▲
             │
┌────────────┼────────────┐
│            │            │

(Defines the)  ┌───────────────────────────┐  (Provides the)
Function Body  │ Function Call Execution   │  Return Value
               └───────────────────────────┘

(Requires a)                      (Can pass)
Function Definition               Arguments
```

### Parent Concept

This concept is a core action within the broader topic of [[Python - Functions]], which covers everything from their definition to their execution.

### Related Concepts 

- The act of calling a function is only possible after a [[Python - Function Definition (def keyword)|function definition]] has been established.
- A function call triggers the execution of the code within the [[Python - Function Body|function body]].
- The relationship between the data passed during a call and the variables in the definition is explained by [[Python - Parameters vs Arguments|parameters vs. arguments]].
- Upon completion, a function call often yields a result via [[Python - Function Return Values (return keyword)|function return values]].
## Questions

- Imagine a critical data processing pipeline where a specific calculation is used in 20 different places. You could copy-paste the code for maximum performance (avoiding function call overhead) or use a function for maintainability. How would you decide, and how would you explain the risk of the copy-paste approach to a project manager in terms of future development costs and bug introduction?
- In a large, distributed system, a function call might be a remote procedure call (RPC) to another service. What are the new failure modes you must consider when a 'function call' crosses a network boundary, and how would you design your calling code to be resilient to them (e.g., timeouts, retries)?
- What if Python function calls were always asynchronous by default? How would that fundamentally change the way you write and reason about a simple script that reads a file, processes its content, and writes a result?