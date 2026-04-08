---
tags: 
  - core
  - python
  - magic_method
  - dunder_method
  - attribute_assignment
  - metaprogramming
  - validation
  - concept
source: 
  - "[[Intermediate Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Customizing Attribute Access]]"
  - "[[Python - __getattr__ Magic Method]]"
  - "[[Python - __getattribute__ Magic Method]]"
  - "[[Python - __delattr__ Magic Method]]"
  - "[[Python - __dict__ Attribute]]"
  - "[[Python - Object Namespace]]"
  - "[[Python - Descriptors vs __getattr__]]"
  - "[[Python - Using __getattr__ and __setattr__ Together]]"
  - "[[Python - Properties]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Metaclasses]]"
  - "[[Python - Decorators]]"
---
# Core: __setattr__ Magic Method

## Summary

>The `__setattr__` magic method is a special Python function that automatically intercepts any attempt to assign a value to an object's attribute. It is invoked whenever you use dot notation to set or update an attribute (e.g., `my_obj.x = 10`), including during the object's initialization within `__init__`. This provides a centralized point to control and add custom logic to the attribute assignment process, acting as the counterpart to the `[[Python - __getattr__ Magic Method|__getattr__]]` method which handles attribute access.

**Why This Matters:** It allows you to create 'smart' objects that can validate, log, or react to any change in their own state, preventing invalid data and enabling powerful design patterns like observation.

_Analogy:_ _Think of `__setattr__` as a meticulous security guard at the entrance of a high-security building (your object). Anyone trying to deliver a package (a value) to a specific office (an attribute) can't just walk in. They must first go through the guard. The guard checks the delivery person's credentials, inspects the package for safety (validation), logs the delivery time and details, and only then personally places the package in the correct office's incoming mail slot (the object's `__dict__`)._

**Where it breaks down:** The analogy is slightly imperfect because the security guard is a separate entity from the building. In Python, the `__setattr__` method is an integral part of the object itself, like a building with its own automated, built-in security and logistics system that manages its own internal state.

```
Assignment Attempt
      │
      ▼
[ obj.x = 10 ] ────► Intercepted by Python Runtime
                         │
                         ▼
               ┌───────────────────────────┐
               │  __setattr__(self, 'x', 10) │
               │                           │
               │   1. Run Custom Logic     │
               │      (e.g., validation)   │
               │                           │
               │   2. Bypass & Assign      │
               │      self.__dict__['x'] = 10 │
               └───────────────────────────┘
                         │
                         ▼
                  Object's __dict__
                  { 'x': 10, ... }
```

## Details

In standard Python objects, assigning an attribute like `obj.color = 'blue'` is a direct, unchecked operation. The `__setattr__` method provides a powerful hook to override this default behavior. It acts as a gatekeeper for all attribute assignments, allowing you to run code *before* the attribute's value is actually changed. This is a cornerstone of `[[Python - Customizing Attribute Access]]`, enabling dynamic validation, logging, or triggering side-effects (like notifying other parts of a program) whenever an object's state is modified.

#### Primary Goal

To intercept and customize the process of setting or creating an attribute on an object, enabling logic like validation, logging, or triggering side-effects.

#### Mechanism

- **Step 1: Define the `__setattr__` Method**
    - Within your class, define the method with the signature `def __setattr__(self, name, value):`. This method will now be called for every attribute assignment.
- **Step 2: Implement Custom Logic**
    - Inside the method, before the actual assignment, add your custom code. This could be a check to ensure `value` is a specific type, a log entry, or any other action.
- **Step 3: Perform the Actual Assignment (Carefully!)**
    - This is the most critical step. If you simply write `self.name = value` inside `__setattr__`, it will trigger another call to `__setattr__`, causing an infinite recursion loop. You must bypass this.
    - The standard way to do this is to directly access the instance's underlying attribute dictionary, the `[[Python - __dict__ Attribute|__dict__]]`, and set the value: `self.__dict__[name] = value`.

##### Code Translation

```python
class LoggedRecord:
    """A class that logs every attribute assignment."""

    def __init__(self, name):
        # This assignment also triggers __setattr__!
        self.name = name
        self.log = [f"Initialized with name: {name}"]

    # --- Step 1: Define the __setattr__ Method ---
    def __setattr__(self, name, value):
        # --- Step 2: Implement Custom Logic ---
        # We check if 'log' already exists to avoid issues during initialization
        if 'log' in self.__dict__:
            self.log.append(f"Set attribute '{name}' to '{value}'")
        
        # --- Step 3: Perform the Actual Assignment ---
        # We use __dict__ to avoid infinite recursion.
        self.__dict__[name] = value

# --- Usage ---
record = LoggedRecord("MyData")
print(f"Initial Log: {record.log}")

record.value = 100
print(f"Log after setting value: {record.log}")

record.status = "active"
print(f"Log after setting status: {record.log}")

# Output:
# Initial Log: ["Initialized with name: MyData", "Set attribute 'name' to 'MyData'"]
# Log after setting value: ["Initialized with name: MyData", "Set attribute 'name' to 'MyData'", "Set attribute 'value' to '100'"]
# Log after setting status: ["Initialized with name: MyData", "Set attribute 'name' to 'MyData'", "Set attribute 'value' to '100'", "Set attribute 'status' to 'active'"]
```

 [[Code - __setattr__ Magic Method Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`self`**
    - The instance of the class on which the attribute is being set.
- **`name`**
    - A string containing the name of the attribute being assigned (e.g., `'x'` in `obj.x = 10`).
- **`value`**
    - The actual value being assigned to the attribute (e.g., `10` in `obj.x = 10`).

#### Core Trade-offs

- **Risk of Infinite Recursion**
    - This is the most common and critical pitfall. A direct assignment like `self.name = value` inside the `__setattr__` method will cause the method to call itself repeatedly, leading to a `RecursionError`.
- **Performance Overhead**
    - Adding a method call for every single attribute assignment introduces a small but non-zero overhead. In performance-critical applications with thousands of assignments in a tight loop, this can become a bottleneck compared to direct attribute access.
- **Increased Complexity**
    - Overriding `__setattr__` makes the simple dot-assignment syntax hide potentially complex logic. This can make the code less predictable and harder for other developers to debug if not well-documented.

## Connections

```
                      (Parent)
            Customizing Attribute Access
                         ▲
                         │
┌────────────────────────┼───────────────────────────┐
│                        │                           │
(__getattr__) ◄───  ┌──────────────────┐  ───► (__dict__)
(Handles Access)    │ __setattr__      │    (Storage Mechanism)
                    │ (Handles Set)    │
                    └──────────────────┘
                         │
                         ▼
                  (Object Namespace)
                  (Manages State)
```

### Parent Concept

`__setattr__` is a primary mechanism for [[Python - Customizing Attribute Access]], providing the means to control how an object's state is written or modified.

### Child Concepts



### Related Concepts 

- It serves as the direct counterpart to the [[Python - __getattr__ Magic Method|__getattr__ magic method]], which intercepts attempts to *read* non-existent attributes, while `__setattr__` intercepts attempts to *write* any attribute.
- To prevent infinite recursion, implementations of `__setattr__` typically bypass the standard assignment mechanism by directly modifying the instance's [[Python - __dict__ Attribute|__dict__]], which is the underlying dictionary storing the object's attributes.
- By controlling attribute assignment, `__setattr__` plays a crucial role in dynamically managing an [[Python - Object Namespace|object's namespace]].
- The combination of `__getattr__` and `__setattr__` is essential for advanced patterns like [[Python - Customizing attribute storage|customizing attribute storage]], where attribute data might be proxied to a database or another object.
## Questions

- Imagine you're building a data model for a financial application where attributes must always be positive numbers. You could enforce this with `__setattr__` validation or with individual property setters. How would you decide between these two approaches, considering factors like the number of attributes, future extensibility, and the clarity of error messages for developers using your class?
- If you used `__setattr__` to log every state change of an object to a remote database for auditing, what potential performance bottlenecks could arise in a high-throughput system, and how would you design a more scalable solution, perhaps using a background queue or batching?
- What if Python's `__setattr__` also received the *old* value of the attribute being updated (e.g., `__setattr__(self, name, new_value, old_value)`)? How would this change the patterns for implementing observer/notification systems or transactional object models?