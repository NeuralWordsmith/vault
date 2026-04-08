---
tags: 
  - major_core
  - python
  - udf
  - def
  - return
  - modularity
  - reusability
  - concept
source: 
  - "[[Introduction to Functions in Python]]"
related: 
  - "[[Python - Functions]]"
  - "[[Python - Function Definition (def keyword)]]"
  - "[[Python - Function Body]]"
  - "[[Python - Calling a Function]]"
  - "[[Python - Function Return Values (return keyword)]]"
  - "[[Python - Parameters vs Arguments]]"
  - "[[Python - Docstrings]]"
  - "[[Fundamental - Programming]]"
  - "[[Python - Key Characteristics]]"
  - "[[Python - Data Types]]"
  - "[[Python - Variables]]"
  - "[[Fundamental - Software Engineering]]"
---
# Major Core: User-Defined Functions

## Summary

> A user-defined function (UDF) is a named block of reusable code created by a programmer to perform a specific, custom task. Unlike built-in functions that come with Python, UDFs are tailored to solve problems unique to a particular project, such as cleaning a specific dataset or calculating a custom metric.

**Why This Matters:** User-defined functions allow you to package custom, repeatable logic into a single command, dramatically improving code organization, readability, and efficiency in complex data science workflows.

_Analogy:_ _Think of a user-defined function as a custom recipe you write down in a cookbook. Instead of buying a pre-made meal (a built-in function), you create your own set of instructions to make a specific dish exactly the way you want it._

In this analogy:
- **The Recipe Name** is the function name (e.g., `make_chocolate_cake`).
- **The Ingredients List** represents the function's [[Python - Parameters vs Arguments|parameters]] (e.g., `flour`, `sugar`, `eggs`).
- **The Step-by-Step Instructions** are the [[Python - Function Body|function body]], the code that processes the ingredients.
- **The Finished Cake** is the [[Python - Function Return Values (return keyword)|return value]], the final output of the recipe.
- **Actually baking the cake** is like [[Python - Calling a Function|calling the function]].
- **Where it breaks down:** A recipe is static. A Python function can be dynamic, producing different results based on the 'ingredients' (arguments) you provide each time you call it.

```
Function Definition & Execution Flow

1. DEFINE:
   def my_function(param1, param2):
       """Docstring explains purpose."""
       # --- Function Body ---
       result = param1 + param2
       return result

2. CALL:
   output = my_function(10, 20)  # Pass arguments
          │
          └─────────── Executes the function body with param1=10, param2=20

3. RETURN:
   The value `30` is returned and assigned to the `output` variable.
```

## Details

While Python's built-in functions are powerful, as a Data Scientist, you'll constantly face unique challenges that require custom solutions. User-defined functions are the primary tool for this. They allow you to define your own reusable 'mini-programs' that encapsulate a specific piece of logic. By giving a block of code a name, you can execute it whenever you need, simply by calling that name. This practice, a cornerstone of [[Fundamental - Programming]], is essential for writing clean, modular, and maintainable code, avoiding the need to copy and paste the same logic repeatedly. A function is fundamentally composed of its [[Python - Function Definition (def keyword)|definition]], which includes its name and parameters, and its [[Python - Function Body|body]], which contains the instructions to be executed.

#### Primary Goal

To encapsulate a specific piece of logic into a reusable, named block of code, improving modularity and reducing repetition (adhering to the DRY - Don't Repeat Yourself - principle).

#### Mechanism

- **Step 1: Define the Function Header**
    - Use the `def` keyword, followed by a descriptive function name and parentheses containing any required [[Python - Parameters vs Arguments|parameters]]. This first line is known as the function header.
- **Step 2: Write the Function Body**
    - Below the header, write an indented block of code that performs the desired task. This is the [[Python - Function Body|function's body]] and contains the core logic.
- **Step 3: Add Documentation (Optional but Recommended)**
    - The first line inside the function body can be a string literal, known as a [[Python - Docstrings|docstring]], which explains what the function does. This is a crucial best practice.
- **Step 4: Return a Value**
    - Use the `return` keyword to output a result from the function. If omitted, the function implicitly returns `None`.
- **Step 5: Call the Function**
    - To execute the code, you [[Python - Calling a Function|call the function]] by its name, providing the necessary arguments inside the parentheses.

```python
# --- Step 1: Define the Function Header ---
def calculate_area(length, width):
    
    # --- Step 3: Add Documentation ---
    """Calculate the area of a rectangle."""
    
    # --- Step 2: Write the Function Body ---
    area = length * width
    
    # --- Step 4: Return a Value ---
    return area

# --- Step 5: Call the Function ---
rectangle_area = calculate_area(10, 5) # The arguments are 10 and 5
print(f"The area is: {rectangle_area}")

# Output:
# The area is: 50
```

 [[Code - User-Defined Functions Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Parameters & Arguments**
    - Parameters are the variables listed inside the function's parentheses in the definition. Arguments are the actual values sent to the function when it is called. This distinction is explored in [[Python - Parameters vs Arguments|Parameters vs Arguments]].
- **Default Arguments**
    - You can assign a default value to a parameter in the function header (e.g., `def greet(name, message="Hello")`). This makes the argument optional when calling the function.
- **Variable Scope**
    - Variables created inside a function (like `area` in the example) are local to that function. They cannot be accessed from outside the function's body, which prevents unintended side effects.

#### Core Trade-offs

- **Pro: Modularity and Reusability**
    - Functions break down complex problems into smaller, manageable pieces. Once written, a function can be reused throughout a program, saving time and reducing code duplication.
- **Pro: Readability and Maintenance**
    - Well-named functions make code self-documenting. Instead of a long script, you have a series of logical steps, making it easier to understand, debug, and update.
- **Con: Abstraction Overhead**
    - For very simple, one-off scripts, creating functions can feel like unnecessary overhead. It can also add a layer of abstraction that requires a developer to look up the function's definition to understand what it does.

## Connections

```
                  (Parent)
            Python - Functions
                     ▲
                     │
┌────────────────────┼────────────────────┐
│                    │                    │
│           ┌──────────────────────────┐  │
│           │ User-Defined Functions   │  │
│           └──────────────────────────┘  │
│                    │                    │
└──────────┬─────────┴────────┬───────────┘
           │                  │
  Function Definition     Function Body
     (Component)           (Component)
```

### Parent Concept

This concept is a specific type of [[Python - Functions]], focusing on functions created by the programmer rather than those built into the language.

### Child Concepts

- The process begins with the [[Python - Function Definition (def keyword)|function definition]], which establishes the function's name and parameters.
- The core logic resides within the [[Python - Function Body|function body]], an indented block of code that executes when the function is called.
- Execution is triggered by [[Python - Calling a Function|calling the function]], which passes arguments to the defined parameters.
- Often, a function will conclude by sending back a result using [[Python - Function Return Values (return keyword)|function return values]].

### Related Concepts 

- A crucial concept is understanding the difference between [[Python - Parameters vs Arguments|parameters and arguments]], which are the blueprint and the concrete values, respectively.
- Best practices dictate the inclusion of [[Python - Docstrings|docstrings]] to document the function's purpose, inputs, and outputs.
- The ability to create functions is a core tenet of [[Fundamental - Programming]], enabling structured and modular software design.
## Questions

- You're tasked with processing a new data source. You could write one large, highly-flexible function with many parameters to handle all foreseeable cleaning tasks, or multiple smaller, single-purpose functions. How do you decide which approach to take, and how would you justify the potential increase in development time for one approach over the other to a project manager?
- Your data science team has developed a collection of 50 useful UDFs for a recurring project. How would you design a system to package, version, and distribute these functions as a shared internal library to ensure all team members are using the same, up-to-date logic?
- What if Python functions could only modify variables in the global scope instead of returning values (i.e., no `return` statement)? How would this fundamentally change the way you structure programs, and what new categories of bugs would become common?
