---
tags: 
  - core
  - python
  - default_parameters
  - function_signature
  - keyword_arguments
  - api_design
  - concept
source: 
  - "[[Introduction to Python]]"
related: 
  - "[[Python - Functions]]"
  - "[[Python - Function Arguments]]"
  - "[[Python - Function Calls (Input-Process-Output)]]"
  - "[[Python - round() Function]]"
  - "[[Python - max() Function]]"
  - "[[Python - help() Function]]"
  - "[[Python - Discovering Built-in Functions]]"
  - "[[Fundamental - Programming]]"
  - "[[Python - Positional Arguments]]"
  - "[[Python - Keyword Arguments (kwargs)]]"
  - "[[Python - Arbitrary Arguments (args)]]"
  - "[[Python - Function Signatures]]"
  - "[[Python - Docstrings]]"
  - "[[Fundamental - Software Engineering]]"
---
# Core: Optional Arguments

## Summary

>An optional argument is a parameter in a function that has a pre-defined default value. If a user does not provide a value for this argument when calling the function, the function will automatically use its default. The built-in [[Python - round() Function|round() function]] is a perfect example: if you omit the second argument for the number of digits, it defaults to rounding to the nearest whole number.

**Why This Matters:** Optional arguments make functions more flexible and user-friendly by providing sensible defaults, reducing the need for users to specify every single detail for common use cases.

_Analogy:_ _Ordering a coffee is like calling a function with optional arguments. You can walk into a shop and say, "I'd like a latte." This is the required argument. The barista will assume you want the default 'medium' size and 'whole' milk—these are the optional arguments. You only need to specify them if you want to override the default, like saying, "I'd like a *large*, *oat milk* latte."_

In this analogy, the type of drink ('latte') is the required argument. The size and milk type are optional arguments with default values ('medium', 'whole milk'). The custom order ('large', 'oat milk') is you providing explicit values to override those defaults.

**Where it breaks down:** In Python, required arguments must always come before optional arguments in the function definition. In a coffee shop, you can usually say the details in any order ("An oat milk, large latte, please").

```
# Scenario 1: Optional argument NOT provided
round(3.14159)  ---> [ ndigits defaults to 0 ] ---> 3

# Scenario 2: Optional argument IS provided
round(3.14159, 2) ---> [ ndigits is set to 2 ] ---> 3.14
```

## Details

Some functions, like the `round()` function, are designed to work even if you don't provide all possible inputs. This is because some of their parameters have default values. These are known as optional arguments. When you call the function and omit an optional argument, Python automatically uses the pre-programmed default value. This is a fundamental concept in [[Fundamental - Programming|programming]] that greatly enhances the usability and flexibility of [[Python - Functions|functions]] by simplifying common [[Python - Function Calls (Input-Process-Output)|function calls]].

#### Primary Goal

To provide default behavior for a function, making it easier to call for common scenarios while still allowing for customization when needed.

#### Mechanism

- **Step 1: Define a Function with a Default Value**
    - To create an optional argument, you assign it a value directly in the function definition using the equals sign (=). This value becomes the default. Any parameters without a default value are considered required.
- **Step 2: Call the Function Without the Optional Argument**
    - When you call the function and only provide the required arguments, the function executes using the default value for the optional one.
- **Step 3: Call the Function With the Optional Argument**
    - When you provide a value for the optional argument during the function call, your new value overrides the default for that specific call.

##### Code Translation

```python
# --- Step 1: Define a function with an optional argument ---
# 'name' is required, but 'greeting' is optional and defaults to "Hello"
def create_greeting(name, greeting="Hello"):
    """Creates a greeting message."""
    return f"{greeting}, {name}!"

# --- Step 2: Call the function without the optional argument ---
# The function uses the default value "Hello"
default_message = create_greeting("Alice")
print(f"Default call: {default_message}")
# Expected Output: Default call: Hello, Alice!

# --- Step 3: Call the function with the optional argument ---
# We override the default by providing a new value
custom_message = create_greeting("Bob", "Good morning")
print(f"Custom call: {custom_message}")
# Expected Output: Custom call: Good morning, Bob!
```

#### Key Parameters

- **Default Value Assignment**
    - An optional argument is created by assigning a default value in the function signature, like `def my_func(required_arg, optional_arg=10):`.
- **Order of Arguments**
    - In a function definition, all optional arguments MUST be listed after all required (positional) arguments. Placing a required argument after an optional one will cause a `SyntaxError`.

#### Core Trade-offs

- **Pro: Flexibility and Simplicity**
    - They make functions much easier to use for the most common scenarios, as the user doesn't need to remember or provide every single parameter. This leads to cleaner, more readable code.
- **Con: Hidden Complexity**
    - The default behavior might not be obvious to a user who hasn't read the documentation. This can lead to unexpected results if a default value is not what the user assumes it to be. This is why tools like the [[Python - help() Function|help() function]] are crucial for discovering a function's full signature.
- **Con: Mutable Default Argument Risk**
    - Using a mutable object (like a list or dictionary) as a default value is a common pitfall. The default object is created only once, so if it's modified in one function call, the modification persists for all subsequent calls, leading to hard-to-debug bugs.

## Connections

```
                  (Parent)
            Function Arguments
                     ▲
                     │
     ┌───────────────┼────────────────┐
     │               │                │
(Related)       ┌────────────────────┐    (Related)
Function Calls  │ Optional Arguments │    round() Function
                └────────────────────┘
                     │
                     ▼
               (Child Concept)
           Keyword Arguments (kwargs)
```

### Parent Concept

This concept is a specific type of [[Python - Function Arguments|function argument]], which defines the inputs that can be passed into a function.

### Child Concepts

- A more advanced application of this idea is using [[Python - Keyword Arguments (kwargs)|keyword arguments (`**kwargs`)]], which allow a function to accept an arbitrary number of optional arguments as a dictionary.

### Related Concepts 

- The concept of providing inputs is central to [[Python - Function Calls (Input-Process-Output)|function calls]], where optional arguments simplify what the user needs to provide.
- The built-in [[Python - round() Function|round() function]] serves as a perfect practical example of a function with an optional `ndigits` argument.
- Understanding optional arguments is a key part of mastering [[Python - Functions|Python functions]] in general.
- You can use the [[Python - help() Function|help() function]] to discover which arguments are optional for any given function.
## Questions

- Imagine you're designing a data processing API for a client. Using many optional arguments could make the API very flexible, but also harder to learn. How would you decide the balance between providing many optional 'power-user' features versus keeping the function simple with fewer arguments for the average user, and how would this choice impact project timelines and client onboarding?
- If you have a core function with several optional arguments that is used in hundreds of different microservices, what is your strategy for updating a default value? How do you ensure that changing a default doesn't cause unexpected behavior in downstream services that were relying on the old default?
- What if Python did not support optional arguments at all? How would you replicate the functionality of a function like `round(number, ndigits=None)`? What design patterns, like function overloading or wrapper functions, would become more common?