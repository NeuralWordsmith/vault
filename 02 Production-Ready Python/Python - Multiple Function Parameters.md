---
tags: 
  - core
  - python
  - parameters
  - arguments
  - function signature
  - positional arguments
  - keyword arguments
  - concept
source: 
  - "[[Introduction to Functions in Python]]"
related: 
  - "[[Python - User-Defined Functions]]"
  - "[[Python - Functions]]"
  - "[[Python - Function Multiple Return Values]]"
  - "[[Python - Tuples]]"
  - "[[Python - Tuple Unpacking]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Variables]]"
  - "[[Python - Data Types]]"
  - "[[Python - *args and **kwargs]]"
  - "[[Fundamental - Programming]]"
  - "[[Python - Scope]]"
  - "[[Python - Tuples vs Lists]]"
  - "[[Python - Tuple Immutability]]"
---
# Core: Function Multiple Parameters

## Summary

>In Python, a user-defined function can be designed to accept multiple input values, known as parameters, by listing them in the function's header. When calling the function, you provide corresponding values, called arguments, in the same order. This allows a single function to perform more complex operations that depend on several pieces of information.

**Why This Matters:** Allowing functions to accept multiple inputs is fundamental to creating flexible and powerful code, enabling a single block of logic to operate on various combinations of data.

_Analogy:_ _Think of a function as a recipe for a cake. The recipe itself is the function. The list of required ingredients in the recipe's header (e.g., 'flour', 'sugar', 'eggs') are the function's parameters—they are placeholders. The actual items you pull from your pantry to make the cake (e.g., '2 cups of all-purpose flour', '1 cup of white sugar', '3 large eggs') are the arguments you "pass" to the recipe when you start baking._

*   **Where it breaks down:** The analogy is imperfect because in programming, the order in which you provide the arguments must strictly match the order of the parameters in the function definition (unless you use special syntax like keyword arguments). In many recipes, you can add ingredients in a slightly different order without affecting the final outcome.

```
Function Call:       raise_to_power( 3 ,  4 )
                                    │    │
                                    │    └──────────┐
                                    │               │
                                    ▼               ▼
Function Definition: def raise_to_power(value1, value2):
                                    ▲               ▲
                                    │               │
Inside Function:     new_value = value1 ** value2
                                    │      │
                                    3      4
```

## Details

Instead of a function that can only perform an operation on a single value (like squaring a number), we can create more general-purpose tools by allowing them to accept multiple inputs. By defining multiple parameters in the function's header, we create named "slots" for the different pieces of information the function needs to do its work. This is a core capability of [[Python - User-Defined Functions]] that allows us to model real-world problems which rarely depend on just one variable.

#### Primary Goal

To enable a function to receive and use more than one piece of information, making it more versatile and capable of handling more complex tasks.

#### Mechanism

- **Step 1: Define the Function Signature**
    - Declare the function using the `def` keyword. Inside the parentheses, list the names you want to give your parameters, separated by commas. These names will act as variables inside the function.
- **Step 2: Implement the Function Body**
    - Write the code that performs the desired operation. Within this code, you can use the parameter names you defined in the signature as if they were regular variables.
- **Step 3: Call the Function with Arguments**
    - When you execute the function, provide the actual values (arguments) inside the parentheses. By default, the arguments are matched to the parameters based on their position: the first argument is assigned to the first parameter, the second to the second, and so on.

##### Code Translation

```python
# --- Step 1: Define the function signature with two parameters: value1 and value2 ---
def raise_to_power(value1, value2):
  """Raises value1 to the power of value2."""
  # --- Step 2: Implement the function body using the parameters ---
  new_value = value1 ** value2
  return new_value

# --- Step 3: Call the function with two arguments: 3 and 4 ---
# 3 is passed to value1, 4 is passed to value2
result = raise_to_power(3, 4)

print(result)
# Expected Output: 81
```

 [[Code - Function Multiple Parameters Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Positional Arguments**
    - This is the default behavior shown above. The arguments passed during the function call are matched to parameters based on their order.
- **Keyword Arguments**
    - You can explicitly name which parameter an argument corresponds to. This improves code readability and allows you to pass arguments in any order.
        - *Example: `raise_to_power(value2=4, value1=3)` produces the same result.*

#### Core Trade-offs

- **Pro (Flexibility)**
    - The primary advantage is creating more powerful, reusable, and expressive functions that can model more complex logic.
- **Con (Cognitive Overhead)**
    - As the number of parameters grows, functions become harder to call, read, and maintain. A function with more than 4-5 parameters is often considered a "code smell," suggesting it might have too many responsibilities.
- **Mitigation Strategy**
    - For functions requiring many inputs, it's often better to group related parameters into a single data structure like a dictionary or a custom object, and pass that single object as the argument.

## Connections

```
                  (Parent)
         User-Defined Functions
                   ▲
                   │
┌──────────────────┼──────────────────┐
│                  │                  │
                  ┌───────────────────────────┐
                  │ Function Multiple Parameters │
                  └───────────────────────────┘
                         │
              ┌──────────┴──────────┐
              │                     │
    (Inverse Concept)       (Related Data Structure)
Function Multiple Return Values      Tuples
```

### Parent Concept

This concept is a fundamental aspect of creating [[Python - User-Defined Functions]], extending their capability beyond single-input operations.

### Related Concepts 

- This concept is the direct inverse of [[Python - Function Multiple Return Values]], which focuses on sending multiple values *out* of a function.
- The data structure [[Python - Tuples]] is often used in conjunction with multiple parameters, especially when a function needs to return multiple values that might later be passed into another function.
- A more advanced application is [[Python - Tuple Unpacking]], which allows the elements of a tuple to be passed as separate arguments to a function with multiple parameters.
## Questions

- You're designing a data processing function that requires 7 configuration settings. What are the trade-offs between defining a function with 7 parameters (some with default values) versus a function that accepts a single dictionary object containing these settings? How does your choice impact code readability and future maintenance for your team?
- Imagine you are building a public API endpoint that allows users to query a database. The endpoint needs to support filtering by multiple, optional fields (e.g., `date_range`, `user_id`, `status`). How would you design the function signature in your backend service to handle these incoming parameters robustly, considering that new filter options might be added in the future?
- What if Python enforced a strict 'single parameter' rule for all functions? How would you refactor a common function like `matplotlib.pyplot.plot(x, y, color='blue', linestyle='--')`? What new programming patterns or helper objects would you need to invent to maintain its functionality?