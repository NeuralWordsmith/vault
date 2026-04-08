---
tags: 
  - core
  - python
  - decimal
  - precision
  - fixed-point
  - currency
  - finance
  - concept
source: 
  - "[[Data Types in Python]]"
related: 
  - "[[Python - Data Types]]"
  - "[[Python - Numeric Data Types]]"
  - "[[Python - Floats (float)]]"
  - "[[Python - Integers (int)]]"
  - "[[Python - Float Scientific Notation]]"
  - "[[Python - Formatting Floats with f-strings]]"
  - "[[Python - Float vs Floored Division]]"
  - "[[Python - Operator Overloading]]"
  - "[[Python - Objects]]"
  - "[[Python - Importing Packages]]"
  - "[[Fundamental - Programming]]"
  - "[[Python - Error Handling]]"
  - "[[Python - Type Hints]]"
---
# Core: Decimals

## Summary

>The `Decimal` type is a specialized numeric object in Python, available from the `decimal` module, designed for fixed-point and floating-point arithmetic with user-settable precision. Unlike the standard `[[Python - Floats (float)]]` which use a binary (base-2) approximation, `Decimal` uses a base-10 representation. This makes it ideal for applications like accounting, finance, and scientific measurement where the exact representation of decimal values is non-negotiable.

**Why This Matters:** Using the Decimal type is crucial for financial and scientific applications because it prevents the subtle, compounding precision errors inherent in standard floats, ensuring calculations are always exact.

_Analogy:_ _Using a `Decimal` is like a master tailor using a special, non-stretchable, finely-marked metal ruler to cut fabric for a bespoke suit. A standard `float` is like using a common, slightly elastic, plastic measuring tape. For everyday measurements, the plastic tape is fast and good enough, but for a high-stakes, precision-fit suit, any tiny stretch or imprecision in the tape could ruin the final product. The metal ruler guarantees that every measurement is exact and repeatable, just as the tailor intended._

• **The Developer** is the **Master Tailor**.
• **The Financial Application** (e.g., a bank ledger) is the **Bespoke Suit**.
• **The `Decimal` type** is the **Non-stretchable Metal Ruler**, ensuring perfect precision.
• **The `float` type** is the **Slightly Elastic Plastic Tape**, which is faster but can introduce small inaccuracies.

**Where it breaks down:** The analogy implies that the `float` type is inherently flawed or 'stretchy'. In reality, `float` is not defective; it's a different tool optimized for speed in scientific and graphical computations where absolute decimal precision is less critical than performance. `Decimal` is more accurate for base-10 arithmetic but comes with a performance cost.

```
Float Calculation (Base-2 Approximation):
0.1 + 0.2  -->  0.30000000000000004  (Inaccurate)

Decimal Calculation (Base-10 Exact):
Decimal('0.1') + Decimal('0.2')  -->  Decimal('0.3')  (Accurate)
```

## Details

The `Decimal` object provides a way to perform arithmetic on numbers exactly as we write them in base-10. This is a critical distinction from `[[Python - Floats (float)]]`, which store numbers in a base-2 format. This binary approximation can't perfectly represent common decimal fractions like 0.1, leading to small but significant errors. `Decimal` solves this by storing and calculating numbers in a way that mirrors human arithmetic, making it the required tool for any application where financial or scientific precision is paramount.

#### Primary Goal

To provide an exact, base-10 representation of numbers, eliminating the floating-point representation errors common in financial and high-precision calculations.

#### Mechanism

- **Step 1: Import the `Decimal` Class**
    - To use this specialized type, you must first import it from Python's built-in `decimal` module.
- **Step 2: Instantiate `Decimal` Objects from Strings**
    - To preserve precision, it is crucial to create `Decimal` objects from strings, not from floats. Initializing from a float (`Decimal(0.1)`) would first create an inaccurate float, and then convert that inaccuracy into a `Decimal`.
- **Step 3: Perform Arithmetic Operations**
    - Standard arithmetic operators (`+`, `-`, `*`, `/`) work as expected. The `decimal` module ensures that the calculations are performed with the defined precision, yielding an exact `Decimal` result.
- **Step 4: Observe the Exact Result**
    - The result of the operation is a new `Decimal` object that represents the value exactly, without converting to `[[Python - Float Scientific Notation|scientific notation]]` or introducing binary representation errors.

##### Code Translation

```python
# --- Step 1: Import the Decimal Class ---
from decimal import Decimal

# --- Using standard floats (demonstrating the problem) ---
float_a = 0.1
float_b = 0.2
float_sum = float_a + float_b
print(f"Using Floats: {float_a} + {float_b} = {float_sum}") # Result is not exactly 0.3

print("-"*20)

# --- Step 2: Instantiate Decimal Objects from Strings ---
decimal_a = Decimal('0.1')
decimal_b = Decimal('0.2')

# --- Step 3: Perform Arithmetic Operations ---
decimal_sum = decimal_a + decimal_b

# --- Step 4: Observe the Exact Result ---
print(f"Using Decimals: {decimal_a} + {decimal_b} = {decimal_sum}") # Result is exactly 0.3

# Example of a currency calculation
price = Decimal('19.99')
tax_rate = Decimal('0.075')
tax = price * tax_rate # The result will be a Decimal with exact precision
print(f"Tax on ${price} is ${tax}")
```

 [[Code - Decimals Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Precision Context (`getcontext().prec`)**
    - The primary 'lever' for `Decimal` is the precision of the context, which controls the number of significant digits stored for calculations. You can view and set this globally.
    - Example: `from decimal import getcontext; getcontext().prec = 28` sets the precision to 28 digits (the default).
- **Rounding Mode**
    - The context also defines how numbers are rounded (e.g., `ROUND_HALF_UP`, `ROUND_DOWN`). This is critical for financial calculations that must adhere to specific rounding rules.

#### Core Trade-offs

- **Pro: Absolute Precision**
    - Eliminates binary floating-point representation errors, making it the only safe choice for monetary and high-precision calculations.
- **Pro: Control**
    - Offers explicit control over precision and rounding rules, which is a requirement for many financial and scientific standards.
- **Con: Performance Overhead**
    - `Decimal` arithmetic is significantly slower than native `float` arithmetic because it is implemented in software rather than hardware.
- **Con: Memory Usage and Verbosity**
    - `Decimal` objects consume more memory than floats. They also require an explicit import and are best instantiated from strings, making the code slightly more verbose.

## Connections

```
             (Parent)
           Data Types
                 ▲
                 │
┌────────────────┼────────────────┐
│                │                │
(Contrasts With) │         (Related To)
     Floats      │          Integers
                 │
        ┌────────┴────────┐
        │    Decimals     │
        └─────────────────┘
```

### Parent Concept

The `Decimal` type is a specialized member of Python's broader category of [[Python - Data Types|data types]].

### Child Concepts



### Related Concepts 

- It directly contrasts with [[Python - Floats (float)]], which are prone to representation errors in financial contexts due to their binary nature.
- While [[Python - Integers (int)]] offer exactness for whole numbers, `Decimal` extends this guarantee of precision to fractional numbers.
- Unlike floats, `Decimal` objects do not automatically convert to [[Python - Float Scientific Notation|scientific notation]] for very large or small numbers, which preserves readability in financial reports.
- The `Decimal` type is one of the three core [[Python - Numeric Data Types|numeric data types]] available in Python, alongside integers and floats.
## Questions

- You're building a transaction processing system for a fintech startup. The product team wants fast processing, but the finance team demands absolute accuracy. How would you justify the performance overhead of using `Decimal` over `float` to the product team, perhaps using a concrete example of how a tiny float error could compound into a significant financial loss over millions of transactions?
- Imagine a data pipeline that ingests billions of financial records daily, currently stored as strings. To perform calculations, you need to convert them to a numeric type. How would you design the system to handle this conversion to `Decimal` at scale, considering the performance cost? What potential bottlenecks or failure modes would you anticipate in the data validation and conversion layer?
- What if the `decimal` module didn't exist? How would you implement a system for precise currency calculations in Python using only built-in types like `[[Python - Integers (int)]]`? What would be the major drawbacks of your approach?