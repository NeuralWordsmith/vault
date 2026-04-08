---
tags: 
  - core
  - python
  - whole_number
  - integer_arithmetic
  - data_type
  - int
  - precision
  - concept
source: 
  - "[[Data Types in Python]]"
related: 
  - "[[Python - Data Types]]"
  - "[[Python - Numeric Data Types]]"
  - "[[Python - Floats (float)]]"
  - "[[Python - Decimals]]"
  - "[[Python - Float vs Floored Division]]"
  - "[[Python - Variables]]"
  - "[[Python - Comparison Operators]]"
  - "[[Python - Boolean Operators]]"
  - "[[Python - Type Hints]]"
  - "[[Python - Lists]]"
  - "[[Python - for Loop]]"
  - "[[Python - Dictionaries]]"
  - "[[Fundamental - Programming]]"
  - "[[DSA - Big O Notation]]"
  - "[[Python - Formatting Floats with f-strings]]"
---
# Core: Integers (int)

## Summary

>An integer (`int`) in Python is a fundamental numeric data type representing whole numbers, both positive and negative, without any fractional part. They are a cornerstone of the broader category of [[Python - Numeric Data Types]] and are distinct from types that handle decimal values, like [[Python - Floats (float)]].

**Why This Matters:** Integers are the foundation for counting, indexing, and performing precise arithmetic on whole numbers, which is essential for everything from loop control to financial calculations.

_Analogy:_ _Integers are like physical counting blocks. You can have 1 block, 5 blocks, or 100 blocks, and you can even owe someone 3 blocks (a negative integer), but you can never have half a block. They are discrete, whole units used for exact counting._

**Where it breaks down:** Physical blocks have a practical size limit. In modern Python, integers can grow to an arbitrary size, limited only by the computer's memory, allowing them to represent incredibly large numbers that would be impossible to model with physical blocks.

```
Memory Representation (Conceptual)

Variable: `my_age`
Value:    30
Type:     <class 'int'>

[ ... | 00011110 | ... ]  <- Binary representation in memory
```

## Details

In Python, integers, often shortened to `int`, are the go-to data type for representing whole numbers. They are perfect for any situation that requires exactness without fractions, such as counting items, indexing into a list, or handling large, precise values. Unlike some other languages, Python's integers can handle numbers of arbitrary size, making them incredibly flexible. They are one of the three primary [[Python - Numeric Data Types]], alongside [[Python - Floats (float)]] for decimal numbers and [[Python - Decimals]] for high-precision financial calculations.

#### Primary Goal

To provide a memory-efficient and computationally fast way to represent and perform exact arithmetic on whole numbers.

#### Mechanism

- **Step 1: Declare an Integer**
    - Create an integer by assigning a whole number literal to a variable. Python automatically infers the type as `int`.
- **Step 2: Perform Arithmetic**
    - Use standard arithmetic operators (`+`, `-`, `*`) for calculations. It's important to understand the distinction between [[Python - Float vs Floored Division|standard division (`/`) which produces a float, and floored division (`//`) which produces an integer]].
- **Step 3: Check the Type**
    - Use the built-in `type()` function to confirm that a variable holds an integer value.

##### Code Translation

```python
# --- Step 1: Declare an Integer ---
item_count = 10
negative_value = -150

# Python integers can be arbitrarily large, limited only by memory
large_number = 99999999999999999999999999999999999999999999999999

print(f"Initial item count: {item_count}")
print(f"A large number: {large_number}")

# --- Step 2: Perform Arithmetic ---
total_items = item_count + 5      # Addition
remaining_stock = item_count - 3  # Subtraction
total_cost = item_count * 20      # Multiplication

print(f"Total items after restock: {total_items}")
print(f"Remaining stock after sale: {remaining_stock}")
print(f"Total cost for {item_count} items: ${total_cost}")

# --- Step 3: Check the Type ---
print(f"The type of item_count is: {type(item_count)}")
print(f"The type of large_number is: {type(large_number)}")
```

 [[Code - Integers (int) Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Literal Declaration**
    - The most common way; simply assigning a whole number to a variable, like `x = 100`.
- **Type Casting with `int()`**
    - Explicitly convert another data type to an integer. When converting a float, this *truncates* (cuts off) the decimal part, it does not round. For example, `int(9.9)` results in `9`.
- **Base Specification**
    - Integers can be created from strings representing different number systems (like binary, octal, or hexadecimal) by providing a second argument to the `int()` constructor. For example, `int('1010', 2)` results in the integer `10`.

#### Core Trade-offs

- **Pro: Absolute Precision**
    - Integers are exact. `1 + 2` is always exactly `3`. This is crucial for counting, indexing, and any calculation where floating-point rounding errors are unacceptable.
- **Con: No Fractional Representation**
    - By definition, integers cannot represent fractions or decimals. This makes them unsuitable for many scientific calculations where precision after the decimal point is required, which is where [[Python - Floats (float)]] or [[Python - Decimals]] are used.
- **Pro: Arbitrary Precision**
    - Unlike fixed-size integers in languages like C++ or Java, Python integers can grow to any size, limited only by available memory. This is a major advantage for handling massive numbers in fields like cryptography or number theory.

## Connections

```
                      (Parent)
                 Numeric Data Types
                           ▲
                           │
           ┌───────────────┼────────────────┐
           │               │                │
(Alternative)     ┌──────────────────┐     (Alternative)
   Floats         │  Integers (int)  │       Decimals
                  └──────────────────┘
```

### Parent Concept

Integers are a fundamental category within the broader concept of [[Python - Numeric Data Types]].

### Child Concepts



### Related Concepts 

- It directly contrasts with [[Python - Floats (float)]], which represent numbers with decimal points and are subject to potential precision errors.
- For high-precision decimal arithmetic without the binary representation issues of floats, [[Python - Decimals]] provides a more robust alternative for applications like finance.
- The behavior of the division operator on integers highlights the important distinction between [[Python - Float vs Floored Division|standard (float) division and floored (integer) division]].
## Questions

- You're building a financial transaction system. Why would you choose to store monetary values like '$19.99' as an integer representing cents (1999) instead of using a float? How would you explain the risk of using floats for money to a project manager?
- If you are processing a massive stream of sensor data where each reading is a whole number, but the total sum could exceed the memory of a single machine, how would you design a system to calculate the exact total sum without losing precision?
- What if Python's integers were fixed-size (e.g., 64-bit) like in many other languages? What common Python features or libraries would break or become significantly more complex to implement?