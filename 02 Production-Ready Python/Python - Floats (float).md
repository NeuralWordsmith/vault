---
tags: 
  - core
  - python
  - floating-point
  - data-types
  - precision
  - approximation
  - ieee-754
  - concept
source: 
  - "[[Data Types in Python]]"
related: 
  - "[[Python - Numeric Data Types]]"
  - "[[Python - Data Types]]"
  - "[[Python - Integers (int)]]"
  - "[[Python - Decimals]]"
  - "[[Python - Float Scientific Notation]]"
  - "[[Python - Formatting Floats with f-strings]]"
  - "[[Python - Float vs Floored Division]]"
  - "[[Python - Comparison Operators]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - Pandas DataFrame]]"
  - "[[Fundamental - Computer Science]]"
  - "[[Python - Type Hints]]"
  - "[[Python - Variables]]"
  - "[[Python - Operator Overloading]]"
---
# Core: Floats

## Summary

>In Python, a `float` is one of the core [[Python - Numeric Data Types|numeric data types]] used to represent real numbers with a fractional part. Unlike [[Python - Integers (int)|integers]], which are exact, floats are binary floating-point numbers that store an *approximation* of a value. This makes them highly efficient for scientific and mathematical calculations where absolute precision isn't the primary concern, and they can be expressed using [[Python - Float Scientific Notation|scientific notation]] for very large or small numbers. For applications requiring exact decimal representation, such as finance, the [[Python - Decimals|Decimal type]] is the appropriate choice.

**Why This Matters:** Floats are essential for representing real-world quantities like measurements, probabilities, and scientific data, enabling computations where perfect precision is unnecessary but a wide range of magnitudes is required.

_Analogy:_ _A float is like using a standard measuring tape to measure the length of a wall. You might read it as 10.5 feet, 10.52 feet, or even 10.525 feet. It's incredibly useful and fast for most practical purposes like buying paint or placing furniture. However, if you were an aerospace engineer designing a piston, that same measuring tape would be dangerously imprecise. You wouldn't use it to measure a component that requires accuracy to a thousandth of an inch._

The measuring tape represents the float's ability to capture fractional values quickly and efficiently. The markings on the tape are like the discrete values a float can actually store. The engineer needing higher precision represents a scenario where floats are inappropriate, such as financial calculations, and a more precise tool (like the [[Python - Decimals|Decimal type]]) is needed.

**Where it breaks down:** A key difference is that a measuring tape's precision is constant across its length, whereas a float's precision is relative to its magnitude—the gap between representable numbers gets larger as the numbers themselves get larger.

```
Binary Representation Issue for 0.1 + 0.2

Decimal   | Binary (Approximation)
----------|----------------------------------------
  0.1     | 0.000110011001100110011...
+ 0.2     | 0.00110011001100110011...
----------|----------------------------------------
  0.3     | 0.01001100110011001100...

Resulting Decimal Value: 0.30000000000000004
Conclusion: The sum is not exactly 0.3 due to finite binary representation.
```

## Details

Floats are Python's implementation of the IEEE 754 standard for double-precision 64-bit floating-point numbers. Their fundamental design principle is to trade a small amount of precision for a massive representational range. This trade-off is what makes them the default choice for scientific computing, machine learning, and any domain dealing with continuous, real-world data. Because they are stored in base-2 (binary), they cannot precisely represent most base-10 fractions, leading to the well-known small approximation errors.

#### Primary Goal

To efficiently represent and perform calculations on a wide range of real numbers (both very large and very small fractional values) in a memory-efficient way, accepting that the representation is an approximation.

#### Mechanism

- **Step 1: Declaration**
    - A float is created by including a decimal point in a number or by using the `float()` constructor.
- **Step 2: Arithmetic and Division**
    - Standard arithmetic operators work as expected. Notably, standard division (`/`) always results in a float, which is a key difference from [[Python - Float vs Floored Division|floored division (`//`)]].
- **Step 3: Observing Imprecision**
    - The core trade-off of floats becomes visible when performing certain calculations. Because numbers like 0.1 cannot be perfectly represented in binary, adding them together can produce a result that is not exactly what you'd expect in base-10 arithmetic.
- **Step 4: Safe Comparison and Formatting**
    - Due to imprecision, directly comparing floats with `==` is unreliable. The standard practice is to check if the numbers are close within a small tolerance. For display, [[Python - Formatting Floats with f-strings|f-strings]] provide powerful control over the number of decimal places shown.

##### Code Translation

```python
# --- Step 1: Declaration ---
my_float_1 = 10.5
my_float_2 = float(7)

print(f"Type of 10.5: {type(my_float_1)}")
print(f"Value of float(7): {my_float_2}")

# --- Step 2: Arithmetic and Division ---
result_add = my_float_1 + 3.2
result_div = 10 / 4 # Standard division produces a float

print(f"10.5 + 3.2 = {result_add}")
print(f"10 / 4 = {result_div}")

# --- Step 3: Observing Imprecision ---
val1 = 0.1
val2 = 0.2
imprecise_sum = val1 + val2

print(f"\n0.1 + 0.2 = {imprecise_sum}")
print(f"Is the sum exactly 0.3? {imprecise_sum == 0.3}")

# --- Step 4: Safe Comparison and Formatting ---
TOLERANCE = 1e-9
is_close = abs(imprecise_sum - 0.3) < TOLERANCE

print(f"Is the sum close to 0.3? {is_close}")

# Formatting the imprecise sum for clean display
print(f"Formatted sum: {imprecise_sum:.2f}")
```

 [[Code - Floats Implementation|View Full Implementation & Analysis]]

#### Key Parameters



#### Core Trade-offs

- **Pro: Massive Range and Computational Speed**
    - Floats can represent an enormous range of numbers, from the very small (e.g., `1e-308`) to the very large (e.g., `1e+308`). They are implemented directly in hardware, making them extremely fast for mathematical computations.
- **Con: Inherent Imprecision**
    - This is the primary drawback. They are approximations and cannot represent most decimal fractions exactly. This leads to small rounding errors that can accumulate in complex calculations.
- **Con: Unsafe for Equality Checks**
    - Never use the `==` operator to check if two floats are equal. Always check if their absolute difference is within an acceptable tolerance. This makes them unsuitable for applications like finance or billing, where exactness is non-negotiable and the [[Python - Decimals|Decimal type]] should be used instead.

## Connections

```
              (Parent)
         Numeric Data Types
                 ▲
                 │
 ┌───────────────┼────────────────┐
 │               │                │
(Contrast)┌──────────────────┐    (Contrast)
 Integers │      Floats      │     Decimals
          └──────────────────┘
                 │
      ┌──────────┴──────────┐
      │                     │
(Representation)      (Operation)
Scientific Notation   Float Division
```

### Parent Concept

Floats are a fundamental type within the broader category of [[Python - Numeric Data Types]].

### Child Concepts



### Related Concepts 

- [[Python - Integers (int)|Integers]] represent whole numbers and are the primary counterpart to floats for non-fractional data.
- [[Python - Decimals|The Decimal type]] offers a direct contrast, providing user-settable precision for applications like finance at the cost of performance.
- [[Python - Float vs Floored Division|Standard division (`/`)]] is an operation that always produces a float, distinguishing it from floored division (`//`).
- [[Python - Float Scientific Notation|Scientific notation]] provides a compact and readable way to define very large or very small floating-point numbers.
- [[Python - Formatting Floats with f-strings|Formatting with f-strings]] is the modern technique for controlling the display precision of floats in output.
## Questions

- You're building a transaction ledger for a new fintech app. A junior developer suggests using floats to store monetary values because they are 'fast'. How would you explain the catastrophic business risk of this choice and justify the performance trade-off of using the `Decimal` type instead?
- Imagine a large-scale scientific simulation running on a distributed cluster, where intermediate float results from one node are passed to another. How would you design a protocol to ensure that minor floating-point representation differences across different hardware architectures don't accumulate and corrupt the final simulation result?
- What if Python's `float` type was suddenly replaced with a fixed-point number type with four decimal places of precision? Which major application domains (e.g., scientific computing, machine learning, web development) would be most severely impacted and why?