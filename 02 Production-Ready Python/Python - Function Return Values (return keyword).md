---
tags: 
  - core
  - python
  - return_keyword
  - function_output
  - value_passing
  - control_flow
  - function_result
  - concept
source: 
  - "[[Introduction to Functions in Python]]"
related: 
  - "[[Python - User-Defined Functions]]"
  - "[[Python - Calling a Function]]"
  - "[[Python - Function Body]]"
  - "[[Python - Parameters vs Arguments]]"
  - "[[Python - Function Definition (def keyword)]]"
  - "[[Python - Variables]]"
  - "[[Fundamental - Programming]]"
  - "[[Python - Scope]]"
  - "[[Python - Data Types]]"
  - "[[Python - Tuples]]"
  - "[[Python - None Type]]"
  - "[[Python - Docstrings]]"
  - "[[Python - Function Header & Body Relationship]]"
---
# Core: Returning Values from Functions

## Summary

>Instead of just performing an action like printing to the console, a function can send a calculated value back to the code that called it. This is achieved using the `return` keyword, which immediately stops the function's execution and passes a specified value back, allowing it to be stored in a variable or used in further operations.

**Why This Matters:** Returning values is the mechanism that transforms functions from simple command executors into powerful, reusable building blocks that can produce results and pass data throughout a program.

_Analogy:_ _Think of a function as a specialized kitchen appliance, like a juicer. You don't just put fruit in and watch it work; you expect something back. You provide the ingredients (arguments), the juicer performs its process (the function body), and then it dispenses juice (the return value) into a glass you've placed to catch it (the variable). The juicer doesn't just announce 'I've made juice!'; it delivers the product for you to use._

The juicer (the function) takes in fruit (arguments). The internal blades and motor are the function's logic. The spout where the juice comes out is the `return` statement. The glass catching the juice is the variable that stores the output.

*   **Where it breaks down:** A function can return abstract data like lists, dictionaries, or even other functions, which is far more complex than a physical product like juice. Also, a function without a `return` statement is like an appliance that just runs without producing a tangible output (e.g., a fan), which is still useful but for a different purpose.

```
Caller Scope             | Function Scope (`square_number`)
-------------------------|----------------------------------
1. `result = ...`        | 
2. Call `square_number(5)`--> 3. `number` parameter gets value 5
                         | 4. `squared_value = 5 ** 2` (is 25)
                         | 5. `return squared_value` (sends 25 back)
6. `... = 25` <----------| 
7. `result` is now 25    | (Function execution ends)
```

## Details

While some functions exist solely to perform actions (like printing to the screen), their true power is unlocked when they can process information and hand back a result. The context explains that instead of being a dead end, a function can compute a new value, such as squaring a number, and use the `return` keyword to pass that result back to the main program. This allows us to capture the function's output in a variable, making it a fundamental tool for transforming data and building modular, interconnected code. This is a critical part of what makes a [[Python - User-Defined Functions|user-defined function]] so versatile.

#### Primary Goal

To pass a computed result from inside a function's scope back to the external scope where the function was called, enabling data flow between different parts of a program.

#### Mechanism

- **Step 1: Define the Function**
    - Create a function using the `def` keyword, specifying any parameters it needs to accept. This sets up the container for your logic.
- **Step 2: Process Data in the Function Body**
    - Inside the [[Python - Function Body|function's body]], write the code to perform the desired calculation or transformation on the input parameters.
- **Step 3: Use the `return` Keyword**
    - At the end of the logic, use the `return` keyword followed by the variable or value you want to send back. This statement immediately terminates the function's execution.
- **Step 4: Call the Function and Assign the Output**
    - When [[Python - Calling a Function|calling the function]], use the assignment operator (`=`) to capture the returned value in a new variable for later use.

##### Code Translation

```python
# --- Step 1: Define the Function ---
def square_number(number):
    # --- Step 2: Process Data in the Function Body ---
    squared_value = number ** 2
    
    # --- Step 3: Use the `return` Keyword ---
    return squared_value

# --- Step 4: Call the Function and Assign the Output ---
# The function call `square_number(5)` evaluates to the value it returns (25).
result = square_number(5)

print(f"The result is: {result}")
# Output: The result is: 25
```

 [[Code - Returning Values from Functions Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Return Type Flexibility**
    - A function can return any Python object: a simple type like an integer or string, or a complex data structure like a list, dictionary, or even another function.
- **Multiple Return Values**
    - You can return multiple values by separating them with commas (e.g., `return a, b, c`). Python automatically packs these into a tuple, which can then be unpacked into multiple variables by the caller (e.g., `x, y, z = my_function()`).
- **Implicit `return None`**
    - If a function completes its execution without encountering a `return` statement, it implicitly returns the special value `None`. This signifies the absence of a return value.

#### Core Trade-offs

- **Pro: Enables Modularity and Composition**
    - Returning values allows functions to be treated as 'black boxes' that transform inputs to outputs. This lets you chain functions together, where the output of one becomes the input of another, leading to clean, modular, and reusable code.
- **Con: Immediate Termination**
    - The `return` statement immediately exits the function. Any code within the function that comes after a `return` statement is unreachable and will not be executed. This can be a source of bugs if not managed carefully, though it's also a powerful tool for controlling function flow.
- **Pro: Clearer Data Flow**
    - Using `return` creates an explicit and easy-to-follow path for data. It's much clearer than alternatives like modifying global variables, which can lead to confusing side effects and code that is difficult to debug.

## Connections

```
                 (Parent)
          User-Defined Functions
                   ▲
                   │
┌──────────────────┼──────────────────┐
│                  │                  │
(Mechanism)  ┌──────────────────┐  (Mechanism)
Function Body  │ Returning Values │  Calling a Function
             └──────────────────┘
                   │
                   │
          (Uses Information From)
          Parameters vs Arguments
```

### Parent Concept

Returning a value is a core capability of a [[Python - User-Defined Functions|user-defined function]], defining how it communicates results back to the program.

### Related Concepts 

- The `return` statement is the final instruction executed within the [[Python - Function Body|function's body]] to send a value back.
- The act of [[Python - Calling a Function|calling a function]] is an expression that evaluates to the value the function returns.
- The value returned is often the result of a computation performed on the [[Python - Parameters vs Arguments|parameters]] passed into the function.
## Questions

- Imagine you're building a data processing pipeline. You could have one large function that performs five transformations and returns a final complex dictionary, or five smaller functions that each perform one transformation and return a simple value, chained together. Discuss the trade-offs in terms of code readability, maintainability, and debugging speed, and explain which approach you'd advocate for to a project manager.
- If a function in a critical, high-throughput API returns a large object (e.g., a 10MB data frame), what are the potential performance bottlenecks related to memory allocation and network serialization? How might you re-architect the function's return value to mitigate these issues without losing essential information?
- What if the `return` keyword was removed from Python? How would you redesign function interactions to pass data back to the caller? Consider alternatives like modifying mutable objects passed as arguments or using global variables, and discuss the significant drawbacks of these approaches.