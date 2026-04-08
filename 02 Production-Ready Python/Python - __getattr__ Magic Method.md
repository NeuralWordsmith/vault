---
tags: 
  - core
  - python
  - magic_method
  - dunder_method
  - attribute_access
  - metaprogramming
  - dynamic_attributes
  - concept
source: 
  - "[[Intermediate Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Customizing Attribute Access]]"
  - "[[Python - __setattr__ Magic Method]]"
  - "[[Python - Object Namespace]]"
  - "[[Python - __dict__ Attribute]]"
  - "[[Python - Descriptors vs __getattr__]]"
  - "[[Python - Using __getattr__ and __setattr__ Together]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Magic Methods]]"
  - "[[Python - Error Handling]]"
  - "[[Python - Metaclasses]]"
  - "[[Python - Proxy Objects]]"
  - "[[Fundamental - Software Engineering]]"
---
# Core: __getattr__ Magic Method

## Summary

>The `__getattr__` method is a special 'magic method' in Python that is automatically invoked only when an attempt is made to access an attribute that does not exist in an object's standard [[Python - Object Namespace|namespace]]. Instead of raising an `AttributeError`, it allows you to define custom logic to compute the attribute's value on the fly, return a default, or perform another action.

**Why This Matters:** The `__getattr__` method allows developers to create flexible and forgiving objects that can handle requests for attributes dynamically, preventing crashes and enabling more sophisticated API designs.

_Analogy:_ _Think of `__getattr__` as a helpful, multilingual receptionist at a large company. If you ask for a specific employee by their exact name (an existing attribute), the main directory connects you directly. But if you ask for 'the person who handles international shipping' (a non-existent attribute), a standard receptionist might just say 'I don't know who that is' and hang up (`AttributeError`). A receptionist with `__getattr__` logic, however, would say, 'Let me check for you.' They would then look up the logistics department, find the right person, and connect you, effectively creating the answer you needed on the spot._

**Where it breaks down:** A real receptionist is consulted for *every* request, whether they know the person or not. The `__getattr__` method is a last resort; it is *only* called after Python has already failed to find the attribute through all its normal channels (the instance, its class, and parent classes).

```
Attribute Access Flow:

[ User calls `obj.my_attr` ]
           │
           ▼
[ Python checks `obj.__dict__` for 'my_attr' ]
           │
      ┌────┴────┐
      │         │
  (Found)   (Not Found)
      │         │
      ▼         ▼
[ Return value ]  [ Python calls `obj.__getattr__('my_attr')` ]
                        │
                        ▼
                  [ Custom logic executes ]
                        │
                        ▼
                  [ Return result of logic ]
```

## Details

In Python's object-oriented programming, `__getattr__` serves as a fallback mechanism for attribute access. It's a core tool for [[Python - Customizing Attribute Access|customizing attribute access]], allowing an object to respond to requests for attributes that aren't explicitly defined. This is a powerful feature for metaprogramming, enabling the creation of proxy objects that delegate calls, or APIs that can generate results dynamically without needing to pre-define every possible attribute.

#### Primary Goal

To intercept and handle lookups for non-existent attributes in a controlled way, preventing the default `AttributeError` and enabling dynamic behavior.

#### Mechanism

- **Step 1: Define the Class and `__init__`**
    - Create a class. The `__init__` method can set up any initial, existing attributes. These attributes will be found normally and will *not* trigger `__getattr__`.
- **Step 2: Implement the `__getattr__` Method**
    - Define the `def __getattr__(self, name):` method. The `name` parameter will receive the string name of the attribute that was not found.
- **Step 3: Add Custom Logic**
    - Inside `__getattr__`, implement the desired fallback behavior. This could be returning a default value, calculating a value based on the `name`, or raising a more informative custom exception.
- **Step 4: Trigger the Method**
    - Create an instance of the class and try to access an attribute that you did not define in `__init__`. This action will automatically invoke your `__getattr__` method.

##### Code Translation

```python
class DynamicLogger:
    # --- Step 1: Define the Class and __init__ ---
    def __init__(self):
        self.existing_attribute = 'This is a real attribute.'

    # --- Step 2: Implement the __getattr__ Method ---
    def __getattr__(self, name):
        # --- Step 3: Add Custom Logic ---
        print(f"Notice: Attribute '{name}' was not found. Returning a default message.")
        return 'This is a dynamically generated default value.'

# --- Step 4: Trigger the Method ---
dl = DynamicLogger()

# Accessing an existing attribute works normally
print(dl.existing_attribute)

# Accessing a non-existent attribute triggers __getattr__
print(dl.missing_attribute)
print(dl.another_one)
```

 [[Code - __getattr__ Magic Method Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`self`**
    - The instance of the object itself, allowing the method to access other properties or methods of the object.
- **`name`**
    - A string containing the name of the attribute that was requested but not found in the object's namespace.

#### Core Trade-offs

- **Flexibility and Dynamic APIs**
    - Pro: Allows for creating highly flexible objects that can respond to a wide range of attribute requests without pre-defining them, ideal for wrappers around APIs or databases.
- **Hiding Bugs**
    - Con: Can make debugging difficult. A simple typo in an attribute name will no longer raise an `AttributeError` but will instead trigger the `__getattr__` logic, potentially masking the original error.
- **Code Obscurity**
    - Con: Overuse can make code harder for others (and your future self) to understand. It's not immediately obvious what attributes an object possesses by just reading the class definition.
- **Risk of Infinite Recursion**
    - Con: If the `__getattr__` implementation itself tries to access a non-existent attribute on `self`, it will trigger itself again, leading to an infinite loop and a `RecursionError`.

## Connections

```
                               (Parent)
                        Customizing Attribute Access
                                     ▲
                                     │
          ┌──────────────────────────┼──────────────────────────┐
          │                          │                          │
(Counterpart)             ┌──────────────────────────┐        (Mechanism)
__setattr__ Magic Method  │ __getattr__ Magic Method │        __dict__ Attribute
                          └──────────────────────────┘
                                     │
                                     │
(Related) ────────── Object Namespace & Descriptors vs __getattr__
```

### Parent Concept

The `__getattr__` method is a key technique within the broader topic of [[Python - Customizing Attribute Access|customizing attribute access]] in Python.

### Child Concepts



### Related Concepts 

- Its direct counterpart is the [[Python - __setattr__ Magic Method|__setattr__ magic method]], which intercepts attempts to set or modify an attribute's value.
- The `__getattr__` method is only invoked after Python fails to find an attribute in the [[Python - Object Namespace|object's namespace]], which is typically stored in the [[Python - __dict__ Attribute|__dict__ attribute]].
- For more advanced and granular control over attribute access, one must understand the trade-offs between [[Python - Descriptors vs __getattr__|descriptors and __getattr__]].
- It is often used in combination with its counterpart, as explored in [[Python - Using __getattr__ and __setattr__ Together|using __getattr__ and __setattr__ together]] to create fully dynamic objects.
## Questions

- Imagine you're building a data access library that wraps a complex, evolving third-party API. How would you use `__getattr__` to provide a stable interface for your users, even when the underlying API adds or renames endpoints? What's the risk of this approach if the API removes an endpoint your users depend on?
- If you implement `__getattr__` to dynamically query a remote database for attribute values, what performance bottlenecks could arise in a high-throughput system, and how would you design a caching layer within the object to mitigate this?
- What if Python's `__getattr__` was called for *every* attribute access, not just missing ones? How would this change the way you design classes, and what other fundamental Python magic method (`__getattribute__`) would it effectively replace?