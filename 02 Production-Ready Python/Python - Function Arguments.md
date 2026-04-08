---
tags: 
  - core
  - python
  - parameters
  - keyword_arguments
  - positional_arguments
  - function_signature
  - api_design
  - concept
source: 
  - "[[Introduction to Python]]"
related: 
  - "[[Python - Functions]]"
  - "[[Python - Function Calls (Input-Process-Output)]]"
  - "[[Python - Optional Arguments]]"
  - "[[Python - round() Function]]"
  - "[[Python - help() Function]]"
  - "[[Python - max() Function]]"
  - "[[Python - Discovering Built-in Functions]]"
  - "[[Python - *args and **kwargs]]"
  - "[[Python - Type Hinting]]"
  - "[[Python - Scope]]"
  - "[[Fundamental - Programming]]"
  - "[[Fundamental - Software Engineering]]"
---
# Core: Function Arguments

## Summary

>In Python, arguments are the named placeholders within a function's definition that receive values when the function is called. As the context shows with `round(number=1.68, ndigits=1)`, these arguments (`number` and `ndigits`) act like labeled slots. When you call the function, you provide inputs (or values) like `1.68` and `1`, and Python matches these inputs to the corresponding arguments, making them available for use inside the function's code block. This mechanism is fundamental to how all [[Python - Functions|functions]] operate.

**Why This Matters:** Function arguments are the mechanism that allows us to pass specific data into reusable blocks of code, making functions flexible and powerful instead of static and repetitive.

_Analogy:_ _Think of a function as a recipe, and its arguments as the list of ingredients at the top (e.g., 'Flour', 'Sugar', 'Eggs'). When you decide to bake the cake, the actual items you take from your pantry (e.g., '2 cups of King Arthur flour', '1 cup of Domino sugar', '3 large eggs') are the inputs you provide to the recipe. The recipe instructions can then refer to 'Flour' or 'Sugar' abstractly, but they operate on the specific ingredients you provided._

The recipe itself is the [[Python - Functions|function]]. The ingredient list (`Flour`, `Sugar`) represents the named arguments. The actual ingredients you use (`2 cups of flour`) are the values passed to those arguments. The process of baking is the [[Python - Function Calls (Input-Process-Output)|function call]].

*   **Where it breaks down:** The analogy is limited because recipe ingredients are typically listed in a fixed order. In Python, you can often provide arguments out of order by using their names (keyword arguments), which offers more flexibility than a standard recipe.

```
Function Call: round(1.68, ndigits=1)

   Input Values      Matching Process      Function Arguments
   ┌──────────┐                            ┌──────────┐
   │   1.68   ├──────────────────────────> │  number  │
   └──────────┘                            └──────────┘
   ┌──────────┐                            ┌──────────┐
   │     1    ├──────────────────────────> │  ndigits │
   └──────────┘                            └──────────┘
```

## Details

As seen with the `round` function, functions need inputs to perform their tasks. These inputs are formally known as arguments, which are essentially named variables that exist only within the scope of that function. In the example `round(number=1.68, ndigits=1)`, `number` and `ndigits` are the argument names. Python's core job during a function call is to match the values we provide (`1.68` and `1`) to these argument slots. This matching process is what makes a single function reusable for many different scenarios. The two primary ways Python performs this matching are through **positional arguments** and **keyword arguments**.

#### Primary Goal

To provide a clear and structured way for a function to receive the specific data it needs to perform its operation.

#### Mechanism

- **Step 1: Define the Function with Named Arguments**
    - First, create a function and define the names of the arguments it expects inside the parentheses. These names will be used to access the input values inside the function.
- **Step 2: Call Using Positional Arguments**
    - Provide the inputs in the same order they were defined. Python matches the first input to the first argument, the second to the second, and so on.
- **Step 3: Call Using Keyword Arguments**
    - Provide the inputs by explicitly stating the argument name followed by an equals sign and the value. When using keywords, the order no longer matters, which improves readability.

##### Code Translation

```python
# --- Step 1: Define the Function with Named Arguments ---
# 'name' and 'message' are the arguments.
def create_greeting(name, message):
    """Creates a personalized greeting string."""
    return f"{message}, {name}!"

# --- Step 2: Call Using Positional Arguments ---
# 'Alice' is matched to 'name', 'Hello' is matched to 'message'.
positional_greeting = create_greeting("Alice", "Hello")
print(f"Positional Call: {positional_greeting}")
# Output: Positional Call: Hello, Alice!

# --- Step 3: Call Using Keyword Arguments ---
# Python matches 'Bob' to 'name' and 'Welcome' to 'message' despite the order.
keyword_greeting = create_greeting(name="Bob", message="Welcome")
print(f"Keyword Call: {keyword_greeting}")
# Output: Keyword Call: Welcome, Bob!

# Order doesn't matter with keywords
keyword_greeting_reversed = create_greeting(message="Hi there", name="Charlie")
print(f"Reversed Keyword Call: {keyword_greeting_reversed}")
# Output: Reversed Keyword Call: Hi there, Charlie!
```

#### Key Parameters

- **Positional Arguments**
    - These are the most common type. The values passed to the function are matched to arguments based on their position or order.
    - *Example: In `round(1.68, 1)`, `1.68` is the first input, so it's assigned to the first argument, `number`.*
- **Keyword Arguments**
    - These arguments are passed to a function by explicitly specifying the argument's name along with its value. This makes the code more self-documenting.
    - *Example: In `round(number=1.68, ndigits=1)`, we explicitly state which value belongs to which argument. The call `round(ndigits=1, number=1.68)` would produce the exact same result.*

#### Core Trade-offs

- **Positional Arguments: Readability vs. Brevity**
    - **Pro:** They are concise and quick to type, especially for functions with few, obvious arguments (e.g., `max(1, 5, 2)`).
    - **Con:** They can lead to bugs if the order is incorrect, and the code becomes hard to read when a function has many arguments. It's not immediately clear what `my_function(True, False, 5, 'approved')` does without looking up the definition.
- **Keyword Arguments: Clarity vs. Verbosity**
    - **Pro:** They are self-documenting and make function calls unambiguous (`my_function(is_admin=True, needs_review=False, retries=5, status='approved')`). This drastically improves code maintainability.
    - **Con:** They require more typing, which can make simple function calls feel unnecessarily long.

## Connections

```
                 (Parent)
              Python - Functions
                       ▲
                       │
       ┌───────────────┼───────────────────────────┐
       │               │                           │
(Example Of)      ┌───────────────────────────┐    (Central To)
round() Function  │     Function Arguments    │    Function Calls
                  └───────────────────────────┘
                       │
                       ▼
                 (Child Concept)
              Optional Arguments
```

### Parent Concept

Arguments are a fundamental component of [[Python - Functions|functions]], defining the interface through which a function receives data to operate on.

### Child Concepts

- A specialized type is the [[Python - Optional Arguments|optional argument]], which is defined with a default value, allowing it to be omitted from the function call.

### Related Concepts 

- The process of providing inputs to arguments is the core mechanism of [[Python - Function Calls (Input-Process-Output)|function calls]].
- The built-in [[Python - round() Function|round() function]] provides a clear, real-world example of a function with two named arguments: `number` and `ndigits`.
- Using the [[Python - help() Function|help() function]] is the primary way to discover the names, order, and purpose of any function's arguments.
- The [[Python - max() Function|max() function]] is an interesting case that can accept a variable number of positional arguments.
## Questions

- You're designing a public API for your company. Would you enforce the use of keyword-only arguments for functions with more than two parameters? Justify your decision in terms of developer experience, long-term maintainability, and potential performance overhead.
- Imagine a critical data processing function in a pipeline that takes 10 arguments. If a new developer accidentally swaps two positional arguments of the same data type (e.g., `process_data(start_date, end_date)` is called as `process_data(end_date, start_date)`), how would you design the system to catch this logical error before it corrupts downstream data?
- What if Python completely removed positional arguments and forced every argument to be passed by keyword? What new programming patterns might emerge, and which existing ones (like function currying or partial application) would become more awkward or more elegant?