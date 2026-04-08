---
tags: 
  - core
  - python
  - first-class_functions
  - dynamic_dispatch
  - strategy_pattern
  - dispatch_table
  - higher-order_functions
  - concept
source: 
  - "[[Writing Functions in Python]]"
related: 
  - "[[Python - Functions as First-Class Objects]]"
  - "[[Python - Assigning Functions to Variables]]"
  - "[[Python - Referencing vs Calling a Function]]"
  - "[[Python - Passing Functions as Arguments]]"
  - "[[Python - Returning Functions from Functions]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Lists]]"
  - "[[Python - Dictionary Operations]]"
  - "[[Python - Functions]]"
  - "[[Python - Data Types]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Python - Lambda Functions]]"
  - "[[Python - Decorators]]"
---
# Core: Storing Functions in Data Structures

## Summary

>In Python, functions are [[Python - Functions as First-Class Objects|first-class objects]], meaning they can be treated like any other data type. This allows you to store them in data structures like lists and dictionaries, enabling you to group, manage, and call them dynamically based on an index or a key.

**Why This Matters:** Storing functions in data structures enables the creation of dynamic, data-driven systems where the behavior of the program can be configured and changed at runtime without altering core logic.

_Analogy:_ _Think of a toolbox. The toolbox itself is a data structure (like a list or a dictionary). The tools inside (hammer, screwdriver, wrench) are the functions. You don't use all the tools at once; you select a specific tool from the toolbox based on the job you need to do and then use it._

A list of tools is like a Python list of functions, where you might grab the third tool in the box (`tools[2]`). A dictionary is like a labeled toolbox drawer; you open the drawer labeled "screwdrivers" (`tools['screwdriver']`) to get the tool you need. **Where it breaks down:** Unlike physical tools, you can store the *same* function multiple times in a list or under different keys in a dictionary, and the "tool" itself is just a reference, not a heavy physical object.

```
Data Structure             Memory Location          Function Object

list_of_functions[0] ─────>   0x10a2b3c   ┌───────────────────────┐
                                          │ def my_function():    │
                                          │   ...                 │
                                          └───────────────────────┘

dict_of_functions['func3'] ─> 0x7f8d9e0   ┌───────────────────────┐
                                          │ built-in print()      │
                                          │   ...                 │
                                          └───────────────────────┘
```

## Details

The core idea is that because Python treats functions as objects, you can store them just like you would store numbers, strings, or other objects. Instead of hard-coding a series of `if/elif/else` statements to decide which function to call, you can build a collection of functions and select the one you need programmatically. This is a direct application of [[Python - Functions as First-Class Objects|functions being first-class citizens]] and relies on understanding the difference between [[Python - Referencing vs Calling a Function|referencing a function]] (e.g., `my_function`) and calling it (e.g., `my_function()`).

#### Primary Goal

To enable dynamic function selection and execution, making code more flexible, configurable, and extensible.

#### Mechanism

- **Step 1: Define or Identify Functions**
    - First, create or identify the functions that will perform the specific tasks you want to manage.
- **Step 2: Store Function References**
    - Create a list or dictionary and place the function names (without parentheses) into it. This stores a reference to the function object, not the result of calling it.
- **Step 3: Access a Function**
    - Use the standard syntax for the data structure—an index for a list (`my_list[i]`) or a key for a dictionary (`my_dict['key']`)—to retrieve a specific function reference.
- **Step 4: Call the Accessed Function**
    - Add parentheses `()` after the access expression and pass any required arguments to execute the function.

##### Code Translation

```python
# --- Step 1: Define or Identify Functions ---
def greet(name):
    """Greets a person by name."""
    return f"Hello, {name}!"

def farewell(name):
    """Says goodbye to a person."""
    return f"Goodbye, {name}!"

# --- Step 2: Store Function References ---
# Storing in a list
message_functions_list = [greet, farewell]

# Storing in a dictionary (often called a "dispatcher")
message_functions_dict = {
    'welcome': greet,
    'exit': farewell
}

# --- Step 3 & 4: Access and Call ---
# Using the list to get the 'greet' function (at index 0)
list_output = message_functions_list[0]('Alice')
print(f"From list: {list_output}")
# Output: From list: Hello, Alice!

# Using the dictionary to get the 'farewell' function (with key 'exit')
dict_output = message_functions_dict['exit']('Bob')
print(f"From dict: {dict_output}")
# Output: From dict: Goodbye, Bob!
```

 [[Code - Storing Functions in Data Structures Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Choice of Data Structure**
    - **List**: Use when the order of functions matters or when you want to access them by a numeric index. Good for creating a sequence of operations or a pipeline.
    - **Dictionary**: Use when you want to map a specific name (a string key) to a function. This is excellent for creating dispatch tables, command handlers, or implementing the Strategy design pattern where you select behavior based on a name or condition.

#### Core Trade-offs

- **Pro: Flexibility & Extensibility**
    - You can easily add or change functions in the data structure without modifying the core logic that calls them. This is great for plugins or configurable systems.
- **Pro: Cleaner Code**
    - Replaces long `if/elif/else` chains with a simple lookup, making the code more readable and maintainable, adhering to the [[SWE - DRY (Don't Repeat Yourself) Principle|DRY principle]].
- **Con: Reduced Static Analysis**
    - It can be harder for static analysis tools and IDEs to trace which function will be called, as the decision is made at runtime. This can make debugging slightly more difficult.
- **Con: Potential for Runtime Errors**
    - If you try to access a key or index that doesn't exist, you'll get a `KeyError` or `IndexError`. You must handle these cases carefully, for instance with `try...except` blocks or `.get()` for dictionaries.

## Connections

```
                           (Parent)
               Functions as First-Class Objects
                              ▲
                              │
┌─────────────────────────────┼─────────────────────────────┐
│                             │                             │
(Sibling)            ┌───────────────────────────┐        (Sibling)
Assigning Functions  │ Storing Functions in      │        Passing Functions
to Variables         │    Data Structures        │        as Arguments
                     └───────────────────────────┘
```

### Parent Concept

This capability is a direct consequence of the fact that Python treats [[Python - Functions as First-Class Objects|functions as first-class objects]], allowing them to be handled like any other variable.

### Child Concepts



### Related Concepts 

- This technique relies on the ability of [[Python - Assigning Functions to Variables|assigning functions to variables]], which is the simplest form of treating functions as objects.
- It is crucial to understand the difference between [[Python - Referencing vs Calling a Function|referencing vs. calling a function]] to avoid executing the function when you mean to store it.
- A common use case for stored functions is to then use them in higher-order functions, which involves [[Python - Passing Functions as Arguments|passing functions as arguments]] to other functions.
- More advanced patterns involve [[Python - Returning Functions from Functions|returning functions from other functions]], which can then be stored in these data structures.
## Questions

- Imagine you're building a data processing pipeline that can apply different transformations (e.g., 'normalize', 'standardize', 'log_transform'). Would you use a hardcoded `if/elif/else` chain or a dictionary of functions to select the transformation? Justify your choice in terms of long-term maintainability and onboarding new developers.
- You are designing a plugin architecture for an application where third-party developers can register their own functions. How would you use a dictionary to manage these plugins, and what system-level checks would you implement to ensure a registered plugin doesn't crash the entire application when it's called?
- What if the functions you needed to store in a dictionary required different sets of arguments (e.g., one needs `(x, y)`, another needs `(data, threshold, mode)`). How would you design the system that calls these functions to handle this variability without making the calling code overly complex?