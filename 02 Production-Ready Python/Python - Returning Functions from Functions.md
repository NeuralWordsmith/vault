---
tags: 
  - core
  - python
  - function_factory
  - higher_order_functions
  - closures
  - nested_functions
  - first_class_functions
  - concept
source: 
  - "[[Writing Functions in Python]]"
related: 
  - "[[Python - Functions]]"
  - "[[Python - Nested Functions]]"
  - "[[Python - Functions as First-Class Objects]]"
  - "[[Python - Assigning Functions to Variables]]"
  - "[[Python - Passing Functions as Arguments]]"
  - "[[Python - Referencing vs Calling a Function]]"
  - "[[Python - Scope]]"
  - "[[Python - User-Defined Functions]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Python - Generator Functions]]"
  - "[[Python - Iteration]]"
  - "[[Python - List Comprehensions]]"
  - "[[Python - Error Handling]]"
---
# Core: Returning Functions from Functions

## Summary

>In Python, because [[Python - Functions as First-Class Objects|functions are treated like any other object]], a function can return another function as its output value. This is often achieved by [[Python - Defining a function inside another function|defining a nested function]] and then returning a reference to it, which can then be assigned to a variable and called later.

**Why This Matters:** This capability allows for the creation of "function factories," enabling dynamic and configurable code that forms the basis for advanced patterns like decorators and closures.

_Analogy:_ _Imagine a custom coffee blend machine (`get_function`). You press a button on this machine, and instead of dispensing a cup of coffee directly, it creates and gives you a specialized, single-purpose coffee pod (`print_me`). This pod is now yours to use whenever you want, in any coffee maker (`new_func`), to make a specific blend of coffee. The big machine built the pod, but the pod does the final work._

The coffee machine (outer function) creates the pod (inner function). You assign the pod to your coffee maker (assign the function to a variable). You then use your coffee maker to brew the coffee (call the new function). **Where it breaks down:** Unlike a physical coffee pod, the returned function can still have a "live" connection to the environment where it was created (a concept called a closure), allowing it to remember variables from the outer function.

```
1. Call get_function()
       │
       ▼
2. Inside get_function():
   ┌──────────────────┐
   │ def print_me(s): │
   │   print(s)       │
   └──────────────────┘
       │
       ▼
3. return print_me  ────────►  4. new_func = [reference to print_me]
                                      │
                                      ▼
                               5. Call new_func('...')
                                      │
                                      ▼
                               6. Executes the code inside print_me
```

## Details

The provided example demonstrates a powerful feature of Python: a function is not limited to returning data like numbers, strings, or lists. It can also create and return another function. The outer function, `get_function()`, acts as a factory. It defines a new, nested function called `print_me()` and then returns the `print_me` function object itself. When we assign the result of `get_function()` to `new_func`, we are not running `print_me` yet; we are simply giving the `print_me` function a new name, `new_func`. This is a direct result of functions being first-class citizens in Python.

#### Primary Goal

To dynamically generate and configure functions, creating specialized versions of a function that can be used later.

#### Mechanism

- **Step 1: Define the Outer 'Factory' Function**
    - Create a function, like `get_function()`, that will be responsible for creating and returning another function.
- **Step 2: Define the Inner Function**
    - Inside the outer function, define the function that you want to return, such as `print_me(s)`. This inner function contains the logic that will eventually be executed.
- **Step 3: Return the Inner Function Object**
    - The outer function uses the `return` keyword with the name of the inner function (`return print_me`). Crucially, you return the function's name without parentheses. This is [[Python - Referencing vs Calling a Function|referencing the function]], not calling it.
- **Step 4: Capture the Returned Function**
    - Call the outer function (`get_function()`) and assign its return value to a new variable, like `new_func`. This variable now holds a reference to the inner `print_me` function.
- **Step 5: Execute the New Function**
    - You can now call the new variable as if it were the original inner function (`new_func('This is a sentence.')`), passing any required arguments.

##### Code Translation

```python
# --- Step 1 & 2: Define outer and inner functions ---
def get_function():
    def print_me(s):
        print(s)
    # --- Step 3: Return the inner function object ---
    return print_me

# --- Step 4: Capture the returned function ---
new_func = get_function()

# --- Step 5: Execute the new function ---
new_func('This is a sentence.')

# Output:
# This is a sentence.
```

 [[Code - Returning Functions from Functions Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Outer Function Arguments**
    - The real power of this pattern emerges when the outer function accepts arguments. These arguments can be used to customize the behavior of the inner function it creates and returns. For example, an outer function `create_multiplier(n)` could return an inner function that always multiplies its input by `n`.

#### Core Trade-offs

- **Flexibility vs. Readability**
    - This pattern, often called a 'function factory', is extremely flexible and promotes DRY principles. However, it can increase the cognitive load for someone reading the code, as the logic is split across multiple scopes and execution is deferred.
- **Closures and State**
    - A significant advantage is that the returned function 'remembers' the environment in which it was created (this is a closure). This allows it to maintain state without using global variables or classes. The downside is that this can lead to subtle bugs or unintended memory usage if not managed carefully.

## Connections

```
                  (Parent)
              Nested Functions
                     ▲
                     │
┌────────────────────┼────────────────────┐
│                    │                    │
(Relies On) ┌──────────────────────────────┐   (Enables)
Functions as│ Returning Functions from...  │   Decorators
First-Class └──────────────────────────────┘   & Closures
Objects                  │
                         │
              (Often Used With)
                         │
             Passing Functions as
                   Arguments
```

### Parent Concept

This concept is built directly upon [[Python - Nested Functions]], as it requires defining a function inside another to be able to return it.

### Child Concepts



### Related Concepts 

- The ability to return a function is a core characteristic of [[Python - Functions as First-Class Objects|functions being first-class objects]].
- This pattern is often used in conjunction with [[Python - Passing Functions as Arguments|passing functions as arguments]] to create highly dynamic and flexible programs, a hallmark of functional programming.
- It's crucial to understand the difference between [[Python - Referencing vs Calling a Function|referencing a function]] (returning its name) and calling it (returning its result).
- The act of capturing the returned function in a new variable is a direct application of [[Python - Assigning Functions to Variables|assigning functions to variables]].
## Questions

- When designing a system that requires generating many similar but slightly different behaviors (e.g., different data validation rules), when would you choose this function factory pattern over defining a class with a configurable `__init__` method? How would you justify the impact on code readability and long-term maintainability to your team?
- In a long-running server application, if a returned function (a closure) holds a reference to a large object from its parent function's scope, it can prevent that object from being garbage collected, leading to a memory leak. How would you design a monitoring and debugging strategy to detect and resolve such memory issues caused by this pattern?
- What if Python's `return` statement was restricted to only primitive data types and collections, forbidding it from returning functions? How would you architect a workaround to implement a decorator, which fundamentally relies on a function returning a modified or wrapped version of another function?