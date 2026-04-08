---
tags: 
  - major_core
  - python
  - data_types
  - dynamic_typing
  - type_system
  - primitive_types
  - type_inference
  - concept
source: 
  - "[[Introduction to Python]]"
related: 
  - "[[Fundamental - Programming]]"
  - "[[Python - Variables]]"
  - "[[Python - Variable Assignment]]"
  - "[[Python - type() Function]]"
  - "[[Python - Integer (int) Data Type]]"
  - "[[Python - Float Data Type]]"
  - "[[Python - String (str) Data Type]]"
  - "[[Python - Boolean (bool) Data Type]]"
  - "[[Python - Type-Dependent Operator Behavior]]"
  - "[[Python - Type Conversion]]"
  - "[[Python - Data Structures]]"
  - "[[Python - Lists]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Type Hinting]]"
---
# Major Core: Python Data Types

## Summary

> In Python, a data type is a classification that tells the interpreter how to treat a value. It defines the kind of data a variable can hold (e.g., a whole number, text, a true/false value), what operations can be performed on it, and how it's stored in memory. While we start with numerical types like integers and floats, data science heavily relies on other types like strings for text and booleans for logical conditions.

**Why This Matters:** Understanding data types is the absolute foundation of programming because it dictates what operations are possible, preventing nonsensical errors and ensuring your data is processed correctly.

_Analogy:_ _Think of data types like different types of containers in a workshop. You have jars for liquids (like oil), bins for solids (like nuts and bolts), and labeled envelopes for documents. You instinctively know you can't pour a bolt or measure a document in liters. The container's type dictates its purpose and the tools you can use with its contents._

**Where it breaks down:** In a workshop, you could force a document into a liquid jar—it would be messy but possible. In Python, the rules are strict. Attempting an invalid operation, like dividing a number by a piece of text (`'hello' / 5`), won't just be messy; it will stop your program with a `TypeError`.

```
Value Assigned to Variable -> [ Python Interpreter ] -> Inferred Data Type
----------------------------------------------------------------------
          42              -> [    Inference     ] ->   Integer (int)
        3.14159           -> [    Inference     ] ->   Float (float)
       "Hello!"           -> [    Inference     ] ->   String (str)
         True             -> [    Inference     ] ->   Boolean (bool)
```

## Details

So far, we've focused on numerical values like height and weight, which Python classifies as specific types like `int` and `float`. However, to do effective data science, you need a richer vocabulary to describe the world. Python provides many other data types, with the most common being [[Python - String (str) Data Type|strings]] for textual information and [[Python - Boolean (bool) Data Type|booleans]] for representing truth values. Every single value stored in a [[Python - Variables|variable]] has a data type, which acts as a blueprint defining its behavior and capabilities.

#### Primary Goal

To provide a structured way for the computer to understand and correctly operate on different kinds of information, preventing logical errors and enabling complex data manipulation.

#### Mechanism

- **How it Works: Dynamic Typing**
    - Python is a dynamically typed language. This means you don't have to explicitly declare the data type of a variable. Python's interpreter automatically infers the type based on the value you assign to it. You can check the type of any variable using the built-in [[Python - type() Function|type() function]].
- **Common Primitive Data Types:**
    - **Integer (`int`):** Represents whole numbers, both positive and negative, without any decimal points.
        - Example: `user_count = 150`
        - See [[Python - Integer (int) Data Type]] for more details.
    - **Float (`float`):** Represents real numbers, or numbers with a floating decimal point.
        - Example: `price = 19.99`
        - See [[Python - Float Data Type]] for more details.
    - **String (`str`):** Represents a sequence of characters, used for textual data. Strings are enclosed in single (`'`) or double (`"`) quotes.
        - Example: `user_name = "Alice"`
        - See [[Python - String (str) Data Type]] for more details.
    - **Boolean (`bool`):** Represents one of two values: `True` or `False`. Booleans are fundamental for logic, control flow, and conditional statements.
        - Example: `is_subscribed = True`
        - See [[Python - Boolean (bool) Data Type]] for more details.

```python
# Python automatically infers the data type at the moment of assignment.

# --- Integer (int) --- 
# Used for whole numbers.
num_users = 10500

# --- Float (float) ---
# Used for numbers with decimal points.
average_rating = 4.7

# --- String (str) ---
# Used for text. Can use single or double quotes.
product_name = "Data Science Pro"

# --- Boolean (bool) ---
# Used for True/False logic.
is_active = True

# We can verify the types using the type() function
print(f"'{num_users}' is of type: {type(num_users)}")
print(f"'{average_rating}' is of type: {type(average_rating)}")
print(f"'{product_name}' is of type: {type(product_name)}")
print(f"'{is_active}' is of type: {type(is_active)}")

```

#### Key Parameters

- The concept of data types itself does not have parameters. Data types are fundamental classifications. However, functions and methods that operate on objects of a certain type often have parameters that control their behavior.

#### Core Trade-offs

- **Dynamic Typing (Python's approach):**
    - **Pro:** Allows for rapid development and flexible code, as you don't need to pre-define variable types.
    - **Con:** Type-related errors may only surface at runtime, which can make debugging difficult in large applications. It can also be slightly less performant than statically typed languages.
- **Static Typing (e.g., Java, C++, or Python with type hints):**
    - **Pro:** Catches type mismatches before the code is run (during compilation or static analysis), leading to more robust code and easier refactoring.
    - **Con:** Requires more verbose code, as all variable types must be explicitly declared, which can slow down initial development.

## Connections

```
                 (Parent)
           Fundamental - Programming
                     ▲
                     │
     ┌───────────────┼────────────────┐
     │               │                │
(Holds Data)  ┌──────────────────┐  (Checks Type)
Variables     │ Python Data Types│  type() Function
              └──────────────────┘
                     │
      ┌──────────────┴───────────────┐
      │              │               │
  Integer (int)  Float (float)  String (str)  Boolean (bool)
    (Children)
```

### Parent Concept

The concept of data types is a cornerstone of nearly every programming language and is a core topic within [[Fundamental - Programming|Fundamental - Programming]].

### Child Concepts

- The most common numeric type is the [[Python - Integer (int) Data Type|integer]], which represents whole numbers.
- For numbers with decimal precision, Python uses the [[Python - Float Data Type|float]].
- Textual data is handled by the [[Python - String (str) Data Type|string]], a sequence of characters.
- Logical conditions are represented by the [[Python - Boolean (bool) Data Type|boolean]], which can only be `True` or `False`.

### Related Concepts 

- Data types define the kind of value a [[Python - Variables|variable]] can hold.
- The behavior of operators like `+` is determined by the data types of the operands, a concept known as [[Python - Type-Dependent Operator Behavior|type-dependent operator behavior]].
- You can always determine a variable's data type at runtime using the [[Python - type() Function|type() function]].
- The process of assigning a value (and thus a type) to a variable is called [[Python - Variable Assignment|variable assignment]].
## Questions

- Imagine you're building a data ingestion pipeline that processes millions of records per hour from a third-party API with inconsistent data quality. Would you prefer to enforce strict data types on ingress, potentially rejecting many records, or use a more flexible schema and handle type errors downstream? Justify your choice in terms of business reliability vs. data completeness.
- In a large, collaborative data science project, how would you design a system or process to manage and document the expected data types for key dataframes to prevent runtime `TypeError` exceptions, especially when one team's output is another team's input?
- What if Python had no distinct data types, and every value was just a raw sequence of bytes? What fundamental programming constructs and data science operations would become incredibly difficult or impossible to implement reliably?
