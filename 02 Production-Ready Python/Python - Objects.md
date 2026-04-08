---
tags: 
  - major_core
  - python
  - object-oriented
  - data_types
  - instances
  - attributes
  - python_data_model
  - concept
source: 
  - "[[Introduction to Python]]"
related: 
  - "[[Fundamental - Programming]]"
  - "[[Python - Methods]]"
  - "[[Python - Method Dot Notation]]"
  - "[[Python - Type-Specific Methods]]"
  - "[[Python - List Methods]]"
  - "[[Python - String Methods]]"
  - "[[Python - Mutating Methods]]"
  - "[[Python - Functions vs Methods]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[Fundamental - Computer Science]]"
  - "[[Python - Variables]]"
  - "[[Python - Data Types]]"
  - "[[Python - Classes]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
---
# Major Core: Objects

## Summary

> An object is the fundamental building block in Python. Every value, from a simple number to a complex data structure like a list, is an object. Each object has a specific type (like `str`, `int`, `list`) which determines what it can do. This "everything is an object" philosophy is central to Python's design and leads directly to the concept of [[Python - Methods|methods]]—actions that are inherently tied to an object's type.

**Why This Matters:** Understanding that everything in Python is an object is the key to unlocking its powerful, consistent, and extensible nature, allowing you to manipulate any piece of data using a unified syntax.

_Analogy:_ _Think of Python objects like different types of tools in a toolbox. A hammer is an object, a screwdriver is an object, and a wrench is an object. Each tool has a specific "type" (hammer, screwdriver) and a set of actions or "methods" it can perform (a hammer can `pound()`, a screwdriver can `turn()`). You wouldn't try to `pound()` with a screwdriver; you use the right method for the right type of object._

**Where it breaks down:** Unlike physical tools, Python objects can be easily created, copied, and destroyed. More complex objects can also contain other objects, like a toolbox containing smaller toolkits, which isn't perfectly captured by the simple tool analogy.

```
┌──────────────────────────┐
│      Python Object       │
│      (e.g., my_list)     │
├──────────────────────────┤
│                          │
│  Type: list              │
│  Value: [1, 2, 3]        │
│                          │
├──────────────────────────┤
│                          │
│  Methods:                │
│   - .append()            │
│   - .pop()               │
│   - .sort()              │
│   - ...                  │
│                          │
└──────────────────────────┘
```

## Details

A foundational principle of Python: everything is an object. Whether you're working with a simple piece of text (a string), a number (a float or integer), or a collection of items (a list), you are fundamentally manipulating an object. This isn't just a naming convention; it means that every piece of data carries with it both its value and a set of built-in capabilities, known as [[Python - Methods|methods]], which are specific to its type.

#### Primary Goal

To provide a consistent and unified way to represent and interact with all data, regardless of its complexity.

#### Mechanism

- **How it Works:**
    1. When you create a variable, like `x = 10`, Python doesn't just store the value `10`. It creates an integer *object* that holds the value `10`.
    2. This object is automatically tagged with a *type*, in this case, `int`.
    3. Because it's an `int` object, it has access to all the methods associated with integers. The same applies to strings (`str`), lists (`list`), and all other data types.
- **Key Properties of an Object:**
    - **Identity:** A unique identifier for the object, which you can see with the `id()` function. It's like the object's memory address.
    - **Type:** The blueprint of the object, defining its properties and available actions. You can check it with the `type()` function. This is what determines which [[Python - Type-Specific Methods|type-specific methods]] are available.
    - **Value:** The actual data the object holds, like `10`, `'hello'`, or `[1, 2, 3]`.

```python
# --- Create different types of objects ---
my_string = "hello world"
my_integer = 42
my_list = [1, 2, 3]

# --- Every variable is an object with a type ---
print(f"'my_string' is an object of type: {type(my_string)}")
print(f"'my_integer' is an object of type: {type(my_integer)}")
print(f"'my_list' is an object of type: {type(my_list)}")

# --- Each object has a unique identity (memory address) ---
print(f"ID of my_string: {id(my_string)}")
```

 [[Code - Objects Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- Objects themselves don't have "parameters" in the way a machine learning model does. Instead, their behavior is defined by their inherent **type** and the **methods** associated with that type.
    - **Type:** The most fundamental property. Changing an object's type (e.g., from an integer `5` to a string `'5'`) completely changes its identity and the methods it can use.
    - **Methods:** The actions an object can perform. Many methods accept arguments, which act as parameters to control the method's specific behavior (e.g., `my_list.append(4)` where `4` is the argument).

#### Core Trade-offs

- **Consistency and Intuitiveness**
    - **Pro:** The "everything is an object" model provides a highly consistent syntax. You use the same [[Python - Method Dot Notation|dot notation]] (`object.method()`) to act on strings, lists, dataframes, and custom-built objects. This makes the language easier to learn and read.
- **Performance Overhead**
    - **Con:** Storing everything as an object (with its associated type information and methods) can introduce more memory and processing overhead compared to languages that use more primitive, bare-bones data types. For most applications, this is negligible, but it can be a factor in high-performance computing.

## Connections

```
                  (Parent)
          Fundamental - Programming
                     ▲
                     │
       ┌─────────────┼─────────────┐
       │             │             │
(Related)     ┌──────────────┐  (Related)
Methods       │   Objects    │  Functions vs Methods
              └──────────────┘
                     │
                     ▼
                  (Children)
            Strings, Lists, Floats
```

### Parent Concept

The concept of objects is a core pillar of [[10 Utility Notes/Fundamental - Programming.md|Fundamental - Programming]], particularly in object-oriented paradigms like Python.

### Child Concepts

- Specific examples of objects include [[Python - String Methods|strings]], which are sequences of characters.
- Another common object type is the [[Python - List Methods|list]], which is a mutable, ordered collection of other objects.
- Simple numeric types like integers and floats are also fundamental objects in Python.

### Related Concepts 

- The actions an object can perform are called [[Python - Methods|methods]], which are functions bound to the object's type.
- Accessing these actions is done through [[Python - Method Dot Notation|dot notation]], a universal syntax for calling an object's method.
- The available actions are determined by [[Python - Type-Specific Methods|type-specific methods]], ensuring a string can't use a list's `append` method.
- It's important to understand the distinction between [[Python - Functions vs Methods|functions and methods]], as methods are always associated with an object.
## Questions

- Python's 'everything is an object' model adds a small amount of memory overhead for each variable compared to a language like C. In a memory-constrained IoT device processing millions of data points, how would you justify the trade-off of using Python's convenient object model versus a lower-level language, and what strategies could you use to mitigate the memory impact?
- Imagine you are designing a large-scale data processing pipeline where data passes through multiple stages, each transforming it. How does Python's object-oriented nature help or hinder the design of a robust system for tracking data lineage and ensuring type consistency across these stages?
- What if Python had a separate, distinct syntax for primitive types (like numbers and booleans) that were *not* objects, and another syntax for complex 'object' types? How would this fundamental change impact the language's learning curve, readability, and the ecosystem of libraries like Pandas and NumPy?
