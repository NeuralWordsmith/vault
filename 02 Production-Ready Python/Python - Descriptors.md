---
tags: 
  - major_core
  - python
  - descriptor_protocol
  - metaprogramming
  - attribute_access
  - __get__
  - __set__
  - concept
source: 
  - "[[Intermediate Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Property Decorator (@property)]]"
  - "[[Python - Descriptor Getter Method]]"
  - "[[Python - Descriptor Setter Method]]"
  - "[[Python - Descriptor Deleter Method]]"
  - "[[Python - Descriptors & Attribute Access Control Relationship]]"
  - "[[Python - Creating Descriptors with @property Process]]"
  - "[[Python - Descriptor Naming Convention (_attribute)]]"
  - "[[Python - Decorators]]"
  - "[[Python - Functions as First-Class Objects]]"
  - "[[Python - Class Methods]]"
  - "[[Python - Objects]]"
  - "[[Python - Scope]]"
  - "[[Fundamental - Software Engineering]]"
---
# Major Core: Descriptors

## Summary

> Descriptors are Python objects that implement a specific protocol to manage attribute access. By defining any of the special methods `__get__()`, `__set__()`, or `__delete__()`, a class instance can become a descriptor that customizes the behavior of an attribute in another 'owner' class. This powerful metaprogramming feature is the underlying mechanism for properties, methods, static methods, and class methods, with the `[[Python - Property Decorator (@property)]]` being its most common and user-friendly application.

**Why This Matters:** Descriptors provide a powerful, reusable way to control attribute access, enabling cleaner code for validation, logging, and caching without cluttering business logic.

_Analogy:_ _Imagine a descriptor is like a specialized receptionist (the descriptor) for a VIP's office (the attribute) within a large corporate building (the class). The receptionist doesn't own the office or do the work inside it, but they have a strict set of rules for interacting with it. They control who can see the VIP (get the value), who can schedule a meeting or change the office decor (set the value), and under what conditions the VIP's name can be removed from the door (delete the attribute)._

The receptionist (descriptor) is a separate, reusable role that can be assigned to manage any office in the building, just as a single descriptor class can manage multiple attributes. The building's management (the class definition) decides which offices get a receptionist. **Where it breaks down:** This analogy implies the receptionist only grants or denies access. In Python, a descriptor can also actively transform, calculate, or create the value on the fly, something a real-world receptionist wouldn't do.

```
[Client Code]
`item.price = -1`
      │
      │ 1. Python sees `price` is a descriptor on the `Product` class.
      ▼
[Product Class]
  `price = NonNegative()`
      │
      │ 2. Instead of writing to `item.__dict__`, it invokes the descriptor.
      ▼
[NonNegative Descriptor Instance]
  `__set__(self, instance=item, value=-1)`
      │
      │ 3. The descriptor's custom logic runs.
      ▼
[ValueError Raised]
`"Value cannot be negative."`
```

## Details

Descriptors are a core part of Python's object model that allow you to hook into the attribute access mechanism. Instead of an attribute lookup simply retrieving a value from an object's `__dict__`, Python's lookup chain checks if the retrieved value is a descriptor. If it is, Python executes the descriptor's special methods, giving you programmatic control over the attribute. This enables the separation of concerns, moving logic like validation or caching out of the main class and into reusable components. The protocol is defined by three key methods: **`__get__`**, **`__set__`**, and **`__delete__`**.

#### Primary Goal

To intercept and customize attribute access (getting, setting, deleting) at the class level, applying the same logic to all instances of that class.

#### Mechanism

- **How it Works: The Lookup Chain**
    - When you access an attribute like `my_instance.x`, Python's process is roughly:
    1. Check if `'x'` is in the `__dict__` of `type(my_instance)` (the class).
    2. If it is, and the object found is a descriptor (i.e., has a `__get__`, `__set__`, or `__delete__` method), Python calls the appropriate descriptor method.
    3. If it's not a descriptor, Python then checks the instance's own `__dict__`.
    4. This process is why class-level descriptors can override instance-level attributes.
- **The Descriptor Protocol**
    - A class becomes a descriptor by implementing one or more of these methods:
    - - **`__get__(self, instance, owner)`**: Called when the attribute's value is retrieved. See `[[Python - Descriptor Getter Method]]`.
    - - **`__set__(self, instance, value)`**: Called when an attempt is made to set the attribute's value. See `[[Python - Descriptor Setter Method]]`.
    - - **`__delete__(self, instance)`**: Called when the attribute is deleted with `del`. See `[[Python - Descriptor Deleter Method]]`.

```python
# --- Descriptor Definition ---
# This descriptor ensures an attribute can only hold non-negative numbers.
class NonNegative:
    def __set_name__(self, owner, name):
        # Store the attribute name, e.g., '_price' or '_quantity'
        # This uses the common [[Python - Descriptor Naming Convention (_attribute)]]
        self.private_name = '_' + name

    def __get__(self, instance, owner):
        # Retrieve the value from the instance's __dict__
        return getattr(instance, self.private_name)

    def __set__(self, instance, value):
        # The core validation logic
        if value < 0:
            raise ValueError("Value cannot be negative.")
        # If valid, set the value on the instance's private attribute
        setattr(instance, self.private_name, value)

# --- Class Using the Descriptor ---
class Product:
    # Assign the descriptor instance to a class attribute
    price = NonNegative()
    quantity = NonNegative()

    def __init__(self, price, quantity):
        self.price = price  # This automatically calls NonNegative.__set__
        self.quantity = quantity

# --- Usage ---
item = Product(10.50, 5)
print(f"Price: {item.price}")  # Calls NonNegative.__get__

try:
    item.price = -1.00  # This will trigger the ValueError
except ValueError as e:
    print(e)
```

 [[Code - Descriptors Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`self`**: The instance of the descriptor itself (e.g., the `NonNegative` object).
- **`instance`**: The instance of the owner class through which the attribute is being accessed (e.g., the `item` object of the `Product` class).
- **`owner`**: The owner class itself (e.g., the `Product` class).
- **`value`**: (For `__set__` only) The value being assigned to the attribute.

#### Core Trade-offs

- **Power vs. Complexity**: Descriptors offer immense power for creating reusable, clean validation and access logic. However, they introduce a layer of indirection that can make the code harder to trace and understand for developers unfamiliar with the pattern.
- **Reusability vs. Readability**: For simple, one-off attribute controls, the `[[Python - Property Decorator (@property)]]` is far more readable and straightforward. Descriptors excel when the *same* access logic needs to be applied to many different attributes across multiple classes, promoting DRY principles.

## Connections

```
                      (Parent)
           Object-Oriented Programming
                       ▲
                       │
    ┌──────────────────┼──────────────────┐
    │                  │                  │
(Related)     ┌──────────────────┐     (Related)
Decorators    │   Descriptors    │     Metaclasses
              └──────────────────┘
                       │
            ┌──────────┴──────────┐
            │                     │
(High-Level Use)         (Core Components)
@property             __get__, __set__, __delete__
```

### Parent Concept

Descriptors are an advanced feature of `[[Python - Object-Oriented Programming (OOP)]]`, providing a low-level mechanism for controlling attribute behavior.

### Child Concepts

- The most common high-level implementation is the `[[Python - Property Decorator (@property)]]`, which provides a convenient syntax for creating simple descriptors.
- The core of the protocol is defined by the `[[Python - Descriptor Getter Method]]` (`__get__`), which manages attribute retrieval.
- The `[[Python - Descriptor Setter Method]]` (`__set__`) is responsible for handling attribute assignment and validation.
- The `[[Python - Descriptor Deleter Method]]` (`__delete__`) controls the behavior of the `del` statement on an attribute.

### Related Concepts 

- The relationship between `[[Python - Descriptors & Attribute Access Control Relationship|descriptors and attribute access control]]` is fundamental, as descriptors are the primary tool for implementing such control.
- The process of `[[Python - Creating Descriptors with @property Process|creating descriptors with @property]]` offers a much simpler, more readable alternative for common use cases.
- A common pattern involves the `[[Python - Descriptor Naming Convention (_attribute)|descriptor naming convention]]`, where the actual data is stored in a 'private' instance attribute to avoid infinite recursion.
## Questions

- You're designing a data-intensive application framework. You could enforce data validation rules using descriptors for reusability across many classes, or use simple checks within each class's `__init__` method for simplicity. How would you decide which approach to take, and how would you justify the potential increase in complexity from descriptors to your team in terms of long-term maintenance costs and developer productivity?
- Imagine a descriptor that caches the result of an expensive computation (e.g., a database query). In a multi-threaded production environment, what race conditions or stale data issues could arise, and how would you modify the descriptor's `__get__` and `__set__` methods using locking mechanisms to make it thread-safe?
- What if the `__get__` method of a descriptor didn't just return a value, but instead returned another, different descriptor object? What kind of dynamic, chainable behaviors could you build with this 'descriptor factory' pattern, and what would be the primary risks of such a design?
