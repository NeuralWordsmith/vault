---
tags: 
  - core
  - python
  - default_parameters
  - optional_arguments
  - function_signature
  - keyword_arguments
  - function_definition
  - concept
source: 
  - "[[Introduction to Functions in Python]]"
related: 
  - "[[Python - User-Defined Functions]]"
  - "[[Python - Functions]]"
  - "[[Python - Flexible Function Arguments]]"
  - "[[Python - Arbitrary Positional Arguments (args)]]"
  - "[[Python - Arbitrary Keyword Arguments (kwargs)]]"
  - "[[Python - args & Tuples Relationship]]"
  - "[[Python - kwargs & Dictionaries Relationship]]"
  - "[[Python - Data Types]]"
  - "[[Python - Lists]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - List Memory Model (Reference vs. Value)]]"
  - "[[Fundamental - Programming]]"
---
# Core: Default Function Arguments

## Summary

>In Python, a default argument is a value provided in a function definition that is automatically assigned to a parameter if no argument is provided in the function call. This allows you to make certain parameters optional, enhancing the function's usability. It's a key feature for creating [[Python - Flexible Function Arguments|flexible functions]], alongside other mechanisms like [[Python - Arbitrary Positional Arguments (args)|*args]] and [[Python - Arbitrary Keyword Arguments (kwargs)|**kwargs]].

**Why This Matters:** Default arguments make functions more flexible and easier to use by providing sensible fallback values, which simplifies code and reduces the burden on the user for common scenarios.

_Analogy:_ _Think of ordering a coffee. The default order might be a 'medium black coffee'. If you just say "I'll have a coffee," that's what you get. The size ('medium') and additions ('black') are the default arguments. However, you can override these defaults by being more specific, like saying "I'll have a large coffee with milk." Here, you provided your own arguments ('large', 'with milk'), and the defaults were ignored._

The coffee order is the function call. The type of coffee is a required argument. The size and additions are parameters with default values. You can call the function with just the required argument or provide specific values for the optional ones.

*   **Where it breaks down:** The analogy doesn't capture a critical programming pitfall: if the 'default coffee' was a single, shared physical cup that everyone drank from (a mutable object), any changes one person made (like adding sugar) would affect the next person's 'default' order. In Python, using mutable types like lists as defaults can cause this exact kind of unintended side effect between function calls.

```
Function Call             Function Definition
--------------------      -----------------------------------
                      ┌> Use provided value for 'exponent' (e.g., 3)
raise_to_power(2, 3) ─┤
                      └> return 2 ** 3

                      ┌> No value for 'exponent' provided
raise_to_power(3) ────┼> Use default value for 'exponent' (1)
                      └> return 3 ** 1
```

## Details

The core idea is to provide a fallback value for a function parameter directly in the function's definition, also known as its signature. By following a parameter name with an equals sign and a value, you tell Python what to use if the caller decides to omit that specific argument. This is incredibly useful for functions where some parameters have a common, standard setting, but you still want to allow for customization when needed.

#### Primary Goal

To make function calls more convenient and readable by pre-defining common or standard values for certain parameters, making them optional.

#### Mechanism

- **Step 1: Define the Function Signature**
    - In the function header, list the parameters. For any parameter you want to make optional, follow its name with an equals sign (`=`) and the desired default value.
    - Crucially, all parameters with default values must come *after* all parameters without default values.
- **Step 2: Implement the Function Logic**
    - Write the body of the function as you normally would, using the parameters. The function's logic doesn't need to know whether a value came from the caller or the default.
- **Step 3: Call the Function**
    - You can now call the function in two ways: either by providing an argument for the optional parameter, which overrides the default, or by omitting it, which causes the default value to be used.

##### Code Translation

```python
# --- Step 1 & 2: Define the function with a default argument ---
# The 'exponent' parameter has a default value of 1.
def raise_to_power(base, exponent=1):
    """Raises the base to the power of the exponent."""
    return base ** exponent

# --- Step 3: Call the function in different ways ---

# Call with two arguments, overriding the default.
# This will calculate 2^3.
result_with_two_args = raise_to_power(2, 3)
print(f"Calling with two arguments (2, 3): {result_with_two_args}")

# Call with only one argument, using the default for 'exponent'.
# This will calculate 3^1.
result_with_one_arg = raise_to_power(3)
print(f"Calling with one argument (3): {result_with_one_arg}")
```

 [[Code - Default Function Arguments Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Parameter Ordering**
    - Non-default arguments must always precede default arguments in the function signature. `def my_func(a, b=10):` is valid, but `def my_func(a=10, b):` will raise a `SyntaxError`.
- **Default Value Type**
    - The default value is evaluated only *once*, at the time the function is defined. This has important implications for mutable vs. immutable types.
    - *Immutable Defaults (Safe):* Using types like numbers, strings, or tuples as defaults is safe because their value cannot change. Each function call effectively gets a fresh copy.
    - *Mutable Defaults (Dangerous):* Using types like lists or dictionaries can lead to unexpected behavior. Since the object is created only once, any modification to it inside the function will persist across subsequent calls. See the tradeoffs section for more detail.

#### Core Trade-offs

- **Advantage: Improved Readability and Usability**
    - Functions become cleaner to call for common use cases. A user doesn't need to remember or supply arguments for every single parameter, reducing cognitive load and the potential for errors.
- **Advantage: Backwards Compatibility**
    - You can add new optional parameters to a function without breaking existing code that calls it. The old calls will simply use the new parameter's default value.
- **Disadvantage: The Mutable Default Argument Pitfall**
    - This is a classic Python gotcha. If a default argument is a mutable object (like a list), all calls to that function that don't provide their own list will share the *exact same list object*. This can lead to bugs that are very hard to trace.
    - The standard practice is to use `None` as the default and then create a new mutable object inside the function if the parameter is `None`.

## Connections

```
                  (Parent)
        Python - User-Defined Functions
                   ▲
                   │
┌──────────────────┼──────────────────┐
│                  │                  │

(Related) ┌───────────────────────────┐ (Related)
*args     │ Default Function Arguments  │ **kwargs
          └───────────────────────────┘


```

### Parent Concept

This concept is a specific feature of defining [[Python - User-Defined Functions|user-defined functions]] in Python, controlling how parameters behave.

### Related Concepts 

- Default arguments are a primary way to create [[Python - Flexible Function Arguments|flexible function arguments]], allowing a function to be called in multiple ways.
- This mechanism contrasts with [[Python - Arbitrary Positional Arguments (args)|*args]], which allows a function to accept an indefinite number of *positional* arguments.
- It also contrasts with [[Python - Arbitrary Keyword Arguments (kwargs)|**kwargs]], which allows a function to accept an indefinite number of *keyword* arguments.
- The behavior of default arguments is deeply tied to the [[Python - List Memory Model (Reference vs. Value)|distinction between mutable and immutable data types]] in Python.
## Questions

- When designing a public-facing library API, when might you deliberately *avoid* using default arguments for a parameter, even if it has a very common value, and what business or technical risk are you mitigating by forcing the user to be explicit?
- Describe the 'mutable default argument' problem in detail. How would you design an automated linter rule or a code review checklist to detect and prevent this common bug from entering a large, collaborative codebase?
- What if Python's syntax was changed so that a function could *only* have default arguments for all of its parameters or none at all (i.e., no mixing)? How would this fundamental constraint alter the way you design functions and structure libraries?