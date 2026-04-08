---
tags: 
  - major_core
  - python
  - data_types
  - type_system
  - type_casting
  - data_representation
  - memory_management
  - concept
source: 
  - "[[Cleaning Data in Python]]"
related: 
  - "[[Python - Variables]]"
  - "[[Python - Numeric Data Types]]"
  - "[[Python - Strings]]"
  - "[[Python - Booleans]]"
  - "[[Python - Type Casting with .astype()]]"
  - "[[Python - Identifying Data Types with .dtypes]]"
  - "[[Python - Inspecting DataFrame with .info()]]"
  - "[[DataEng - Dirty Data]]"
  - "[[DataEng - Garbage In, Garbage Out (GIGO)]]"
  - "[[Python - Categorical Data]]"
  - "[[Python - Converting to Categorical Type]]"
  - "[[Python - Integer vs Categorical Data Description]]"
  - "[[DataEng - Data Science Workflow]]"
  - "[[Fundamental - Statistics]]"
  - "[[Python - Lists]]"
---
# Major Core: Data Types

## Summary

> In programming and data analysis, a data type is a classification that specifies which type of value a variable can hold and what type of mathematical, relational, or logical operations can be applied to it without causing an error. It's a fundamental constraint that tells the computer how to interpret and handle the data.

**Why This Matters:** Using the correct data types is non-negotiable for accurate analysis, as misclassifying data can lead to incorrect calculations, flawed models, and ultimately, unreliable insights.

_Analogy:_ _Think of data types like different containers in a kitchen. You have a glass for liquids (like water), a jar for powders (like flour), and a box for solid items (like cookies). Each container is designed for a specific type of ingredient. You wouldn't store water in a cardboard box or try to pour flour into a salt shaker with tiny holes. The container dictates how you can store and interact with the ingredient inside._

In this analogy, the containers (glass, jar, box) represent the data types (`float`, `int`, `str`). The ingredients (water, flour, cookies) are the actual data values. The actions you can perform (pouring, scooping) are the operations (addition, string concatenation). Using the wrong container for an ingredient is like a type error in programming, leading to a mess or an impossible operation.

**Where it breaks down:** Unlike kitchen containers, some data types can be converted into others (e.g., the integer `5` can become the text `'5'`), a process known as [[Python - Type Casting with .astype()|type casting]]. This flexibility isn't always possible with physical containers.

```
Conceptual Type   | Example Value        | Python Type
------------------|----------------------|-------------
Text Data         | "First name"         | str
Integers          | 1050                 | int
Decimals          | 98.6                 | float
Binary            | True / False         | bool
Dates             | "2026-02-28"         | datetime
Categories        | "Married"            | category
```

## Details

When working with data, we encounter various forms like text, integers, decimals, and dates. As the first step in any [[DataEng - Data Science Workflow|data science workflow]], it's crucial to ensure every variable is assigned the correct data type. This foundational step prevents errors and ensures that subsequent analysis, from simple calculations to complex machine learning models, is built on a solid, reliable footing. The failure to do so is a primary cause of [[DataEng - Dirty Data|dirty data]] and can compromise the entire analysis.

#### Primary Goal

To provide a structural framework for data, ensuring it is stored efficiently, interpreted correctly by the computer, and can be manipulated with appropriate operations.

#### Mechanism

- **How it Works:**
    - Python, as a dynamically-typed language, infers the data type of a variable at runtime. However, when data is imported (e.g., from a CSV), it often needs to be explicitly checked and converted. Each data type has a set of rules and allowed operations.
- **Text Data (`str`)**
    - Used for sequences of characters, enclosed in single or double quotes.
    - Example: *First name, address, product descriptions.*
- **Integer (`int`)**
    - Used for whole numbers without a fractional component.
    - Example: *Number of subscribers, products sold, age.*
- **Decimal / Float (`float`)**
    - Used for numbers that have a fractional component (floating-point numbers).
    - Example: *Temperature, price, exchange rates.*
- **Binary / Boolean (`bool`)**
    - Represents one of two values: `True` or `False`.
    - Example: *Is married, new customer, yes/no flags.*
- **Dates (`datetime`)**
    - Specifically for handling dates and times, allowing for chronological calculations.
    - Example: *Order dates, ship dates, birth dates.*
- **Categories (`category`)**
    - A specialized data type for variables that have a fixed and limited number of possible values. This is more memory-efficient than using strings for the same purpose. See [[Python - Categorical Data]].
    - Example: *Marriage status ('Single', 'Married', 'Divorced'), gender, survey ratings ('Low', 'Medium', 'High').*

```python
# --- Declaring variables of different types ---
first_name = "Alice"         # str
subscribers = 4200          # int
temperature = 25.5          # float
is_new_customer = True      # bool

# --- Checking their types ---
print(f"'{first_name}' is of type: {type(first_name)}")
print(f"{subscribers} is of type: {type(subscribers)}")
print(f"{temperature} is of type: {type(temperature)}")
print(f"{is_new_customer} is of type: {type(is_new_customer)}")

# --- Example of a type error ---
try:
    # You can't add a number to a string
    result = first_name + subscribers
except TypeError as e:
    print(f"\nError: {e}")
```

 [[Code - Data Types Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Constraints as Parameters:** The primary 'parameters' of data types are the inherent constraints they impose.
    - **Numeric Precision:** `float` types can represent decimals but may have precision limitations, while `int` types are exact but cannot hold fractions.
    - **Allowed Operations:** You can perform arithmetic on `int` and `float`, but not on `str` (except for concatenation). You can perform logical operations on `bool`.
    - **Memory Footprint:** Different data types consume different amounts of memory. An `int` is typically smaller than a `float`. Using the `category` type instead of `str` for repetitive text data can significantly reduce memory usage.

#### Core Trade-offs

- **Memory vs. Precision:**
    - Using a `float` provides precision for decimal values but uses more memory than an `int`. For variables like 'number of children', using a `float` would be wasteful and semantically incorrect.
    - As explored in [[Python - Integer vs Categorical Data Description]], using a `category` type for columns with low cardinality (few unique values) is far more memory-efficient than using the default `object` (string) type in pandas.
- **Flexibility vs. Strictness:**
    - Python's dynamic typing is flexible and easy for beginners, but it can lead to unexpected runtime errors if types are not carefully managed. This is a common source of [[DataEng - Dirty Data|dirty data]].
    - Statically-typed languages (like Java or C++) enforce type constraints at compile time, catching errors earlier but requiring more verbose code.

## Connections

```
                      (Parent)
                 Python - Variables
                         ▲
                         │
          ┌──────────────┴──────────────┐
          │                             │
(Checks With)  ┌───────────────────────────┐  (Corrects With)
.dtypes / .info() │      Python - Data Types      │  .astype()
          └───────────────────────────┘
                         │
      ┌──────────────────┴──────────────────┐
      │                  │                  │
Numeric Data Types     Booleans           Strings
```

### Parent Concept

The concept of data types is a fundamental property of [[Python - Variables|variables]], as every variable must hold data of a specific type.

### Child Concepts

- A primary category is [[Python - Numeric Data Types|numeric data types]], which includes integers (`int`) and floating-point numbers (`float`).
- Another core type is [[Python - Booleans|booleans]], which represent binary `True` or `False` values and are the foundation of logical operations.
- [[Python - Strings|Strings]] are the data type used to represent text data.
- A specialized and memory-efficient type for data with a limited number of unique values is [[Python - Categorical Data|categorical data]].

### Related Concepts 

- The presence of incorrect data types is a common form of [[DataEng - Dirty Data|dirty data]], which can invalidate analysis.
- Failing to correct data types is a primary cause of the [[DataEng - Garbage In, Garbage Out (GIGO)|'Garbage In, Garbage Out']] principle, where flawed input data produces flawed output.
- The process of changing a variable from one data type to another is known as [[Python - Type Casting with .astype()|type casting]].
- In the pandas library, one can quickly check the data types of all columns in a DataFrame using [[Python - Identifying Data Types with .dtypes|.dtypes]] or get a more detailed summary with [[Python - Inspecting DataFrame with .info()|.info()]].
## Questions

- Imagine you're analyzing financial transaction data. The 'amount' column is stored as a string ('$1,234.56'). What are the business risks of leaving it as a string versus the technical steps and trade-offs of converting it to a numeric type? How would an error in this conversion impact a quarterly revenue report?
- You are tasked with designing a data ingestion pipeline for a high-volume streaming data source. How would you design the system to automatically infer, validate, and enforce data types for millions of incoming records per minute? What is your strategy for handling records that fail type validation without halting the entire pipeline?
- What if Python was a strictly, statically-typed language like Java? How would this fundamentally change the typical exploratory data analysis (EDA) process for data scientists? Would it solve the problem of 'dirty data' or just shift the burden to a different stage of the workflow?
