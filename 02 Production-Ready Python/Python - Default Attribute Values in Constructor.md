---
tags: 
  - core
  - python
  - default_arguments
  - constructor
  - initialization
  - optional_parameters
  - oop
  - concept
source: 
  - "[[Introduction to Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Class Constructor (__init__)]]"
  - "[[Python - Attribute Definition in Classes]]"
  - "[[Python - Passing Arguments to a Class Constructor]]"
  - "[[Python - Attribute Definition Best Practices]]"
  - "[[Python - Class and Method Best Practices]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Objects]]"
  - "[[Python - Functions]]"
  - "[[Python - Function Argument Passing]]"
  - "[[Python - Scope]]"
  - "[[Python - Data Types]]"
  - "[[Python - User-Defined Functions]]"
---
# Core: Setting Default Attribute Values in __init__

## Summary

>The `__init__` method in a Python class can assign default values to its parameters, identical to how default arguments work in regular functions. This allows for the creation of an object without explicitly providing a value for every attribute. If an argument is omitted during instantiation, the attribute is still created and assigned its predefined default value, which simplifies object creation and prevents potential errors.

**Why This Matters:** Setting default attribute values in the constructor makes classes more flexible and robust by ensuring objects always start in a valid, predictable state, even when not all information is provided during creation.

_Analogy:_ _Think of filling out a 'New Bank Account' application form. Some fields are mandatory, like your 'Name'. Other fields, like 'Initial Deposit', might have a pre-filled value of '$0'. You are not required to put money in to open the account; if you leave that field blank, the bank still successfully opens your account with a starting balance of zero. You have the *option* to provide a different initial deposit, but a sensible default is already in place._

In this analogy, your 'Name' is a required argument, the 'Initial Deposit' is an optional argument with a default value, the bank account itself is the object instance, and '$0' is the default value. 
*   **Where it breaks down:** In Python, the order of parameters is strict—all parameters without defaults must come before any parameters with defaults. A physical form doesn't have this rigid structural requirement. Additionally, Python defaults can be complex data types like lists or other objects, not just simple numbers.

```
Object Creation Logic Flow:

1. `cust = Customer("Lara")`
   │
   └──> `__init__(self, name="Lara", balance=?)`
        │
        └──> Is `balance` provided? No.
             │
             └──> Use default: `balance = 0`
                  │
                  └──> `self.balance = 0`

2. `cust = Customer("John", 500)`
   │
   └──> `__init__(self, name="John", balance=500)`
        │
        └──> Is `balance` provided? Yes.
             │
             └──> Use provided value: `balance = 500`
                  │
                  └──> `self.balance = 500`
```

## Details

The [[Python - Class Constructor (__init__)]] is the ideal place to establish the initial state of an object. A powerful feature of this method is the ability to set default values for its parameters, making object creation more flexible. As shown in the `Customer` class example, by defining `__init__` with `balance=0`, we guarantee that every `Customer` instance will have a `.balance` attribute. When an object is created without specifying the balance, it automatically defaults to zero, preventing `AttributeError` exceptions and making the class more intuitive to use. This is a fundamental practice in [[Python - Object-Oriented Programming (OOP)]].

#### Primary Goal

To provide sensible, predictable starting values for an object's attributes, making object creation more flexible and preventing errors from missing information.

#### Mechanism

- **Step 1: Define the `__init__` Method with Default Parameters**
    - In the class definition, declare the `__init__` method. List required parameters first, followed by any optional parameters assigned a default value using the `=` operator.
- **Step 2: Assign Parameters to Instance Attributes**
    - Inside the method, assign the incoming parameter values (whether explicitly passed or defaulted) to instance attributes using `self.attribute_name = parameter_name`.
- **Step 3: Instantiate Objects Flexibly**
    - You can now create objects in two ways: by providing only the required arguments (letting the others default) or by providing values for all arguments.

##### Code Translation

```python
# --- Step 1 & 2: Define the __init__ method with a default value ---
class Customer:
    # Set a default value for the 'balance' parameter
    def __init__(self, name, balance=0):
        print(f"_init_ called for {name}...")
        self.name = name
        self.balance = balance

# --- Step 3: Instantiate objects flexibly ---

# Case 1: Omit the optional argument, using the default value
print("Creating customer without specifying balance:")
cust1 = Customer("Lara de Silva")
print(f"Name: {cust1.name}, Balance: {cust1.balance}")

print("\n--------------------\n")

# Case 2: Provide a value for the optional argument
print("Creating customer with a specified balance:")
cust2 = Customer("John Doe", 500)
print(f"Name: {cust2.name}, Balance: {cust2.balance}")

# Expected Output:
# Creating customer without specifying balance:
# _init_ called for Lara de Silva...
# Name: Lara de Silva, Balance: 0
#
# --------------------
#
# Creating customer with a specified balance:
# _init_ called for John Doe...
# Name: John Doe, Balance: 500
```

 [[Code - Setting Default Attribute Values in __init__ Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Default Value Selection**
    - The chosen default should represent a safe, common, or neutral state. For example, `0` for counters, `None` for optional objects, an empty string `""` for text fields, or `True` for a status flag like `is_active`.
- **The Mutable Default Argument Pitfall**
    - A critical rule is to avoid using mutable types (like `list` or `dict`) as default values directly in the function signature (e.g., `def __init__(self, items=[])`).
    - The default object is created only *once* when the function is defined, not each time it's called. All instances that use the default will share and modify the *same* list or dictionary, leading to unexpected bugs.
    - The correct pattern is to default to `None` and create a new mutable object inside the method: `if items is None: self.items = []`.

#### Core Trade-offs

- **Pro - Increased Flexibility & Usability**
    - Classes become easier to instantiate for common use cases, as the user only needs to provide the essential arguments, reducing boilerplate code.
- **Pro - Enhanced Robustness**
    - Ensures that an object is always created in a complete and valid state, preventing `AttributeError` exceptions that would occur if an optional attribute were not created at all.
- **Con - Can Obscure Dependencies**
    - Overuse of defaults can make the class's public interface less clear. It might not be immediately obvious which attributes are truly essential for the object's core functionality versus which are optional.

## Connections

```
             (Parent)
      Class Constructor (__init__)
                 ▲
                 │
┌────────────────┼────────────────┐
│                │                │
(Related)  ┌──────────────────────────────────┐  (Related)
Passing    │ Setting Default Attribute Values │  Attribute
Arguments  └──────────────────────────────────┘  Definition
```

### Parent Concept

This concept is a specific technique used within the [[Python - Class Constructor (__init__)]], which is the special method Python calls to initialize a new object instance.

### Child Concepts

- This is a foundational programming pattern rather than a concept with distinct, named sub-types.

### Related Concepts 

- This technique directly governs [[Python - Passing Arguments to a Class Constructor|how arguments are passed to a constructor]], as it defines which arguments become optional.
- It is a core part of the process of [[Python - Attribute Definition in Classes|defining attributes]], as it establishes their initial state upon object creation.
- Understanding the mutable default pitfall is crucial for following [[Python - Attribute Definition Best Practices|best practices for attribute definition]].
- Using sensible defaults is fundamental to the overall goal of writing clean and maintainable classes, as outlined in [[Python - Class and Method Best Practices]].
## Questions

- You're designing a `Product` class for an e-commerce system where the `discount_percentage` attribute could default to 0. What are the business risks of this default? When might it be better to force the user to explicitly provide a discount (or `None`), even if it's usually zero, to avoid accidental promotions?
- Imagine a system where a `User` class has a default empty list for `user_permissions`. If you accidentally implement this as `permissions=[]` in the `__init__` signature, what kind of cascading failures might you see as thousands of users are created and modified concurrently in a production web application? How would you design a test to catch this specific bug?
- What if Python's `__init__` method did not allow default arguments? How would you redesign class APIs to handle optional attributes? Would you use factory functions, builder patterns, or multiple `__init__`-like methods, and what would be the pros and cons of each approach?