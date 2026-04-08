---
tags: 
  - core
  - python
  - floating-point
  - real_number
  - data_type
  - precision
  - decimal
  - concept
source: 
  - "[[Introduction to Python]]"
related: 
  - "[[Python - Data Types]]"
  - "[[Python - Integer (int) Data Type]]"
  - "[[Python - String (str) Data Type]]"
  - "[[Python - Boolean (bool) Data Type]]"
  - "[[Python - Variables]]"
  - "[[Python - Variable Assignment]]"
  - "[[Python - type() Function]]"
  - "[[Python - Using Variables in Calculations]]"
  - "[[Python - Type-Dependent Operator Behavior]]"
  - "[[Fundamental - Programming]]"
  - "[[Fundamental - Computer Science]]"
  - "[[Python - Type Casting]]"
  - "[[Python - Arithmetic Operators]]"
---
# Core: Float (float) Data Type

## Summary

>A `float` is Python's fundamental data type for representing real numbers—that is, numbers that can have both an integer and a fractional part, separated by a decimal point. It is one of the core numeric [[Python - Data Types]], standing alongside the [[Python - Integer (int) Data Type]] which handles whole numbers.

**Why This Matters:** Floats are essential for representing continuous measurements like prices, temperatures, or probabilities, enabling precise calculations in scientific and financial applications.

_Analogy:_ _Think of a `float` as a modern digital kitchen scale. An older, simpler scale might only show you whole grams (like an integer), but the digital scale can show you precise measurements like 10.5 grams or 250.75 grams. It handles the 'in-between' values that are crucial for accuracy._

**Where it breaks down:** A real kitchen scale has physical limits to its precision (e.g., it can't measure a single grain of salt). Similarly, a computer `float` has a finite digital precision and cannot represent every possible real number perfectly. This can lead to tiny, almost invisible rounding errors in calculations, a limitation not present in the abstract world of mathematics.

```
Integer (int): ... -2  -1   0   1   2 ...
                  │   │   │   │   │
Float (float): ... -1.5 ... 0.5 ... 2.7 ...
(Can represent values *between* the integers)
```

## Details

In Python, a `float` (short for floating-point number) is a fundamental data type used to store numbers that require a decimal point. Whenever you need to represent quantities that are not whole numbers—such as measurements, percentages, or scientific values—you use a float. It is distinct from an [[Python - Integer (int) Data Type]], which is restricted to whole numbers. You can always verify if a variable holds a float by using the built-in `[[Python - type() Function]]`.

#### Primary Goal

To represent and perform calculations with real numbers (numbers with fractional parts) within the constraints of a computer's binary memory system.

#### Mechanism

- **Step 1: Assign a Float Value**
    - Create a [[Python - Variables|variable]] and use [[Python - Variable Assignment]] to store a number containing a decimal point. Python automatically infers the type as `float`.
- **Step 2: Verify the Data Type**
    - Use the `[[Python - type() Function]]` to inspect the variable and confirm that Python has correctly identified its data type as `<class 'float'>`.
- **Step 3: Use in Calculations**
    - Perform arithmetic operations. An important aspect of [[Python - Type-Dependent Operator Behavior]] is that any operation involving a `float` and an `int` will result in a `float`. This process, called 'type promotion', ensures that no precision is lost.

##### Code Translation

```python
# --- Step 1: Assign a Float Value ---
# Assigning a price and a scientific constant
price_of_coffee = 3.75
gravity_acceleration = 9.81

# --- Step 2: Verify the Data Type ---
print(f"The type of price_of_coffee is: {type(price_of_coffee)}")
print(f"The type of gravity_acceleration is: {type(gravity_acceleration)}")

# --- Step 3: Use in Calculations ---
# Calculating sales tax (float * float)
sales_tax_rate = 0.07
tax_amount = price_of_coffee * sales_tax_rate

# Calculating total cost (float + float)
total_cost = price_of_coffee + tax_amount

print(f"The total cost of the coffee is: ${total_cost:.2f}")

# Type promotion: an integer (2) is used with a float
# The result is automatically a float.
distance = 0.5 * gravity_acceleration * (2**2)
print(f"Distance fallen in 2 seconds: {distance} meters")
print(f"The type of the result 'distance' is: {type(distance)}")
```

#### Key Parameters

- **Precision (64-bit)**
    - By default, Python's `float` type is a 'double-precision' 64-bit number. This means it offers about 15 to 17 decimal digits of precision, which is sufficient for most scientific and general-purpose applications.

#### Core Trade-offs

- **Limitation: Floating-Point Inaccuracy**
    - Because computers store numbers in binary (base-2), they cannot represent certain decimal (base-10) fractions perfectly. This can lead to small, unexpected rounding errors. For example, the expression `0.1 + 0.2` famously evaluates to `0.30000000000000004`, not `0.3`.
- **Trade-off: Performance vs. Perfect Accuracy**
    - For applications where perfect decimal accuracy is non-negotiable, such as financial calculations, using standard floats is risky. Python's `Decimal` module provides perfect decimal representation but comes at the cost of slower performance and higher memory usage compared to the highly optimized, hardware-accelerated native `float` type.

## Connections

```
                      (Parent)
                     Data Types
                         ▲
                         │
         ┌───────────────┼───────────────┐
         │               │               │
      (Sibling)    ┌──────────────────┐   (Sibling)
       Integer     │      Float       │    String
                   └──────────────────┘
```

### Parent Concept

The concept of a float is a specific implementation of the broader category of [[Python - Data Types]].

### Related Concepts 

- A `float` directly contrasts with an [[Python - Integer (int) Data Type]], which can only represent whole numbers without any fractional part.
- The `[[Python - type() Function]]` is the standard tool used to identify a variable's data type, confirming whether it is a `float`, `int`, or `str`.
- Like all other data types, a `float` value is assigned to a name using [[Python - Variable Assignment]].
- The behavior of operators like `+` or `*` changes based on the data types involved; for instance, adding a `float` to an `int` results in a `float`, a key aspect of [[Python - Type-Dependent Operator Behavior]].
## Questions

- You're building a financial application for calculating loan interest. Why might using standard Python floats be a risky business decision, and what alternative would you propose to stakeholders to ensure calculation accuracy and mitigate financial risk?
- Imagine a large-scale scientific simulation generating billions of floating-point numbers per second that need to be stored and analyzed. What are the system-level challenges (memory, storage bandwidth, potential for precision error accumulation) you would anticipate, and how would you design a data pipeline to handle this?
- What if your computer could only use integer arithmetic? How would you represent and perform calculations on a number like 3.14159, and what would be the fundamental limitations of your approach?