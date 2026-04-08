---
tags: 
  - core
  - python
  - dunder_method
  - magic_method
  - object_representation
  - reproducibility
  - debugging
  - concept
source: 
  - "[[Introduction to Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Object String Representation]]"
  - "[[Python - __str__ Method]]"
  - "[[Python - __str__ vs __repr__]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Objects]]"
  - "[[Python - f-strings]]"
  - "[[Python - Class Methods]]"
  - "[[Python - Functions]]"
  - "[[Python - Data Types]]"
  - "[[Python - NumPy (Numeric Python)]]"
---
# Core: __repr__ Method

## Summary

>The `__repr__` dunder method in Python is designed to return the "official" string representation of an object. Its primary goal is to be unambiguous and, ideally, to return a string of Python code that can be executed to recreate the object with the same state. It's primarily intended for developers for debugging and logging purposes.

**Why This Matters:** Implementing `__repr__` provides an unambiguous, developer-friendly string representation of an object, making debugging and logging vastly more effective by showing exactly how to recreate the object's state.

_Analogy:_ _Think of `__repr__` as an architect's blueprint for a specific house. While a photo (`__str__`) shows you what the house looks like for a visitor, the blueprint (`__repr__`) gives another architect the exact, unambiguous instructions needed to build an identical house, including dimensions, materials, and structure._

The blueprint (`__repr__`) gives you the *code* to build the house (`Customer('Maryam Azar', 3000)`). The photo (`__str__`) gives you a user-friendly view (`Customer: Maryam Azar`).
*   **Where it breaks down:** Not all objects can have a simple, executable representation. For complex objects like database connections or open files, the `__repr__` might provide useful information (like the connection string or file path) without being directly executable code to recreate the live state.

```
```
+---------------------------+      Calls      +--------------------------+
|                           |  ──────────>  |                          |
|  repr(cust)               |               |  cust.__repr__(self)     |
|  OR                       |               |                          |
|  Typing 'cust' in console |               |  Returns:                |
|                           |  <──────────  |  "Customer('...', ...)"  |
+---------------------------+    Returns    +--------------------------+
```
```

## Details

The `__repr__` method is a fundamental part of Python's data model, providing a formal, developer-focused representation of an object. The core idea, as emphasized by best practices, is that the output of `repr(obj)` should be a valid Python expression that could, in a perfect world, be used to reconstruct an equivalent object. This makes it invaluable for debugging, as seen in the NumPy example where `repr()` shows the exact `array()` call. It contrasts with the more user-friendly [[Python - __str__ Method|`__str__` method]], but serves as a crucial fallback: if a class only has one of these methods, it should be `__repr__` because `print()` will use it if `__str__` is missing.

#### Primary Goal

To provide a complete, unambiguous, and ideally executable string representation of an object, primarily for developer use in debugging and logging.

#### Mechanism

- **Step 1: Define the Class**
    - Create a class with an `__init__` method to set up its attributes upon instantiation.
- **Step 2: Implement `__repr__`**
    - Define the `__repr__(self)` method within the class. This method will be automatically called by the built-in `repr()` function or when an object is inspected in an interactive console.
- **Step 3: Construct the Representation String**
    - Inside `__repr__`, return a string that looks like a constructor call for the class. Use [[Python - f-strings|f-strings]] to embed the object's attribute values (e.g., `self.name`, `self.balance`) into the string. Ensure that any string attributes are enclosed in quotes within the final returned string to make it valid Python syntax.
- **Step 4: Instantiate and Inspect**
    - Create an instance of the class. When you type the instance's variable name in an interactive console or pass it to the `repr()` function, Python will automatically invoke your custom `__repr__` method.

##### Code Translation

```python
# --- Step 1: Define the Class ---
class Customer:
    def __init__(self, name, balance):
        self.name = name
        self.balance = balance

    # --- Step 2: Implement __repr__ ---
    def __repr__(self):
        # --- Step 3: Construct the Representation String ---
        # Notice the inner quotes around the string self.name to make it a valid string literal.
        return f"Customer('{self.name}', {self.balance})"

# --- Step 4: Instantiate and Inspect ---
cust = Customer("Maryam Azar", 3000)

# Calling repr() on the object executes __repr__
print(repr(cust))
# Output: Customer('Maryam Azar', 3000)

# Typing the object in an interactive console also executes __repr__
# >>> cust
# Customer('Maryam Azar', 3000)
```

 [[Code - __repr__ Method Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- The `__repr__` method is an instance method and only takes one parameter by convention:
    - **`self`**: A reference to the instance itself, which is automatically passed by Python. This allows the method to access the object's attributes (e.g., `self.name`).

#### Core Trade-offs

- **Developer Clarity vs. User Readability**
    - The primary goal of `__repr__` is unambiguous representation for developers, which can sometimes be verbose or less readable for end-users compared to a well-defined `__str__`.
- **Fallback Behavior**
    - If `__str__` is not implemented, `print()` and `str()` will fall back to using `__repr__`. This makes `__repr__` the more fundamental of the two; if you can only implement one, it should be `__repr__`.
- **Reproducibility Goal**
    - While the ideal `__repr__` returns an executable string, this isn't always practical for objects with complex states (e.g., network sockets, file handles). In such cases, the convention is to provide a descriptive, unambiguous representation enclosed in angle brackets, like `<Socket from 127.0.0.1:8000>`.

## Connections

```
```
                           (Parent)
                Object String Representation
                             ▲
                             │
             ┌───────────────┼───────────────┐
             │               │               │
(Contrast)        ┌────────────────────┐        (Uses)
__str__ Method    │   __repr__ Method  │        f-strings
                  └────────────────────┘
```
```

### Parent Concept

`__repr__` is one of the two primary methods for defining how an object is represented as a string, falling under the broader topic of [[Python - Object String Representation]].

### Child Concepts



### Related Concepts 

- It directly **contrasts with** the [[Python - __str__ Method|`__str__` method]], which is aimed at providing a readable, user-friendly string representation.
- The decision of when to use each is a key part of the [[Python - __str__ vs __repr__|`__str__` vs `__repr__`]] discussion.
- Modern implementations of `__repr__` often **leverage** [[Python - f-strings|f-strings]] for clean and readable construction of the representation string.
## Questions

- You're designing a data-heavy class for a financial application that will be used by both developers for debugging and by a reporting engine that generates PDF reports for clients. How would you implement both `__str__` and `__repr__` to satisfy both audiences, and what's the business risk if you only implement `__repr__`?
- Imagine a distributed system where objects are serialized, sent over a network, and potentially deserialized by a different service for logging or debugging. How could a well-defined `__repr__` for your objects simplify remote debugging and error tracing in this system, and what potential security issues might arise if the `__repr__` string contains sensitive information?
- What if the Python `eval()` function was considered a major security vulnerability and was deprecated entirely? How would this change the 'best practice' philosophy behind `__repr__`'s goal of creating a reproducible object via an executable string?