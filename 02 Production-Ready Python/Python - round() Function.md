---
tags: 
  - core
  - python
  - rounding
  - precision
  - built-in_function
  - floating_point
  - formatting
  - concept
source: 
  - "[[Introduction to Python]]"
related: 
  - "[[Fundamental - Programming]]"
  - "[[Python - Functions]]"
  - "[[Python - Function Calls (Input-Process-Output)]]"
  - "[[Python - Function Arguments]]"
  - "[[Python - Optional Arguments]]"
  - "[[Python - max() Function]]"
  - "[[Python - help() Function]]"
  - "[[Python - Discovering Built-in Functions]]"
  - "[[Fundamental - Mathematics]]"
  - "[[Math - Decimals]]"
  - "[[Python - Data Types]]"
  - "[[Python - Floating-Point Arithmetic]]"
  - "[[Python - Built-in Functions]]"
  - "[[Python - Type Conversion]]"
---
# Core: round() Function

## Summary

>The `round()` function is a built-in Python [[Python - Functions|function]] used to adjust the precision of floating-point numbers. It follows the standard [[Python - Function Calls (Input-Process-Output)|input-process-output]] model by taking a number and an optional precision level as [[Python - Function Arguments|arguments]], and then returning a new, simplified number. It is a fundamental tool for data cleaning, formatting, and presentation.

**Why This Matters:** Rounding is essential for presenting numerical data in a human-readable format, simplifying complex figures for reports, displays, and user interfaces.

_Analogy:_ _Think of a butcher's digital scale. When you buy meat, the scale might show a very precise weight like 1.027 kg. For pricing, the butcher rounds this to a more practical number, like 1.03 kg. The original weight (1.027 kg) is the first input number. The decision to use two decimal places for the price is the second input (the precision). The final weight used for the bill (1.03 kg) is the rounded output._

Where it breaks down: A butcher's rounding is often a simple 'round up' for pricing convenience. Python's `round()` function uses a more statistically robust but sometimes non-intuitive strategy called 'round half to even' for numbers ending in .5, which can differ from common expectations.

```
Input 1      Input 2
(Number)     (Precision)
  1.68     ,     1
    │            │
    ▼            ▼
┌───────────────────┐
│  round() Process  │
└───────────────────┘
          │
          ▼
       Output
        1.7
```

## Details

The `round()` function is one of Python's fundamental built-in tools for numerical manipulation. As the context explains, it takes two inputs, or [[Python - Function Arguments|arguments]]: first, the number you want to round, and second, the precision, which specifies how many digits to keep after the decimal point. For example, `round(1.68, 1)` takes the number `1.68` and rounds it to `1` decimal place, resulting in `1.7`. This function provides a simple way to control numerical representation without needing to write complex logic from scratch.

#### Primary Goal

To simplify a number by reducing its decimal precision to a specified number of digits.

#### Mechanism

- **Step 1: Identify the Number and Precision**
    - Determine the floating-point number you need to round and how many decimal places you want to keep. For instance, the number `1.68` and a desired precision of `1` decimal place.
- **Step 2: Call the Function with Arguments**
    - Use the `round()` syntax, passing the number as the first argument and the desired precision as the second argument, separated by a comma: `round(1.68, 1)`.
- **Step 3: Receive the Rounded Output**
    - The function processes the inputs and returns a new number that has been rounded to the specified precision. The result of `round(1.68, 1)` is `1.7`.

##### Code Translation

```python
# --- Step 1: Identify the Number and Precision ---
original_number = 1.68
desired_precision = 1

# --- Step 2: Call the Function with Arguments ---
# The function takes the number and precision as inputs.
rounded_number = round(original_number, desired_precision)

# --- Step 3: Receive the Rounded Output ---
# The result is stored in the 'rounded_number' variable.
print(f"The number {original_number} rounded to {desired_precision} decimal place is: {rounded_number}")
# Expected Output: The number 1.68 rounded to 1 decimal place is: 1.7

# Example with the optional precision argument omitted (rounds to nearest integer)
price = 99.75
rounded_to_integer = round(price)
print(f"The price {price} rounded to the nearest integer is: {rounded_to_integer}")
# Expected Output: The price 99.75 rounded to the nearest integer is: 100
```

#### Key Parameters

- **`number` (Required)**
    - The first argument. This is the numeric value (integer or float) that you want to round.
- **`ndigits` (Optional)**
    - The second argument, representing the precision. It specifies how many digits after the decimal point to keep. If this [[Python - Optional Arguments|optional argument]] is omitted, the function rounds to the nearest integer.

#### Core Trade-offs

- **Floating-Point Inaccuracy**
    - Because computers store decimal numbers in binary, some fractions can't be represented perfectly. This can lead to surprising results, e.g., `round(2.675, 2)` might result in `2.67` instead of the expected `2.68` due to the underlying binary representation being slightly less than `2.675`.
- **'Round Half to Even' Strategy**
    - For values exactly halfway between two numbers (like 2.5), Python's `round()` function rounds to the nearest *even* integer. So, `round(2.5)` is `2`, while `round(3.5)` is `4`. This statistical approach avoids consistently biasing a large dataset upwards but can be counter-intuitive for those expecting the common 'round half up' rule.

## Connections

```
                  (Parent)
             Fundamental - Programming
                       ▲
                       │
       ┌───────────────┼────────────────────────────┐
       │               │                            │
(Related Concept) ┌───────────────────┐         (Related Concept)
max() Function    │  round() Function │         help() Function
                  └───────────────────┘
                       │
                       ▼
                  (Built Upon)
              Function Arguments
```

### Parent Concept

`round()` is a specific implementation of the broader concept of [[Fundamental - Programming|programming]], providing a pre-built tool to perform a common mathematical operation.

### Child Concepts

- As a specific, built-in function, `round()` does not have conceptual children in the same way a broad topic would.

### Related Concepts 

- Like `round()`, the [[Python - max() Function|max() function]] is another built-in tool that performs a specific operation on numerical inputs.
- The inputs provided to `round()` are examples of [[Python - Function Arguments|function arguments]], which are the data a function needs to do its job.
- If you are ever unsure about the specific behavior of `round()`, you can use the [[Python - help() Function|help() function]] to get its documentation directly in the interpreter.
- Understanding `round()` is part of the process of [[Python - Discovering Built-in Functions|discovering the built-in functions]] that Python offers to solve common problems efficiently.
## Questions

- Your e-commerce platform displays average product ratings. The backend calculates an average of 4.75 stars. Would you round this to 4.8 or display it as 4.75? Justify your choice in terms of user trust and its potential impact on conversion rates.
- Imagine you're processing a billion financial transactions daily, and each must be rounded to two decimal places. How would you investigate and mitigate the potential cumulative impact of Python's 'round half to even' behavior on the company's total revenue reporting?
- What if the `round()` function was deprecated due to its floating-point inconsistencies? How would you implement a custom, perfectly reliable rounding function from scratch that always 'rounds half up', and what would be the performance implications?