---
tags: 
  - comparison
  - python
  - class_variables
  - shared_state
  - static_variables
  - oop
  - attribute_lookup
  - concept
source: 
  - "[[Introduction to Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Instance Attributes]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Accessing Class Attributes]]"
  - "[[Python - Modifying Class Attributes on an Instance]]"
  - "[[Python - Use Cases for Class Attributes]]"
  - "[[Python - Class Methods]]"
  - "[[Python - Inheritance]]"
  - "[[Python - Encapsulation]]"
  - "[[Python - Core Principles of OOP]]"
  - "[[Python - Objects]]"
  - "[[Python - Scope]]"
  - "[[Python - Decorators]]"
---
# Comparison: Class Attributes

## Why This Comparison Matters

> Class attributes are variables defined directly within a class that are shared among all instances (objects) of that class. Unlike [[Python - Instance Attributes|instance attributes]], which are unique to each object, a class attribute has a single copy that is stored on the class itself. Any change made to the class attribute via the class will be reflected across all instances that haven't overridden it. This mechanism is fundamental for storing data that is constant or common to all objects of a certain type, such as configuration settings, counters, or default values.

_Analogy:_ _Think of a company's official 'Employee Handbook'. The company is the Class, and each employee is an Instance. The Employee Handbook is a Class Attribute. There is only one official version of the handbook, and it applies to every single employee. If the company updates the handbook (e.g., changes the vacation policy), that change instantly applies to all employees. Each employee's name or ID number, however, is an Instance Attribute – it's unique to them and doesn't affect anyone else._

Where it breaks down: In Python, an individual instance can create its own attribute with the same name as a class attribute (e.g., an employee makes personal notes in their copy of the handbook). This action 'shadows' the class attribute for that specific instance only, without changing the official company-wide handbook. This concept is explored further in [[Python - Modifying Class Attributes on an Instance|modifying class attributes on an instance]].

## Side-by-Side Comparison

- **Class Attributes**
    - Shared by all instances of a class.
    - Defined directly inside the class body, outside of any methods.
    - Only one copy exists, stored on the class object itself.
    - Changes made via the class are reflected in all instances.
    - Ideal for constants, counters, or default values applicable to all objects.
- **Instance Attributes**
    - Unique to each individual instance.
    - Typically defined inside the `__init__` method using `self`.
    - A new copy is created for every new instance of the class.
    - Changes affect only the specific instance they are made on.
    - Ideal for storing the specific state or properties of an object.

### Comparison Table

| Feature | Class Attribute | Instance Attribute |
| :--- | :--- | :--- |
| **Scope** | Shared across all instances | Specific to one instance |
| **Definition** | In the class body, outside methods | In `__init__` using `self` |
| **Storage** | Stored on the class itself | Stored on the instance itself |
| **Mutability** | Modifying via class affects all instances | Modifying only affects that one instance |
| **Primary Use** | Constants, shared state, default values | Unique object state |

## Key Similarities

Both class and instance attributes are fundamental components of a class structure used for storing data. They are both accessed using the same dot notation (e.g., `object.attribute`). Python's attribute lookup mechanism will first check for an instance attribute and, if not found, will then look for a class attribute with the same name.

## Verdict: When to Use Which

Use **class attributes** for data that should be the same for all objects of a class, such as constants, configuration settings, or tracking data (like an object counter). Use **instance attributes** for data that defines the unique state of each object, such as a user's name, an employee's ID, or a car's color.

## Broader Connections

```
                      (Parent)
             Object-Oriented Programming
                         ▲
                         │
         ┌───────────────┼───────────────────────────┐
         │               │                           │
(Contrasts With)  ┌───────────────────────────┐   (Operated On By)
Instance Attributes │      Class Attributes     │   Class Methods
                  └───────────────────────────┘
                         │
          ┌──────────────┴───────────────────────────┐
          │                                          │
(Child Concept)                            (Child Concept)
Accessing Class Attributes        Modifying Class Attributes on an Instance
```

- This concept directly contrasts with [[Python - Instance Attributes|instance attributes]], which store data unique to each object.
- [[Python - Class Methods|Class methods]] are often used to read or modify class attributes, as they operate on the class itself rather than a specific instance.
- The process of retrieving these values is detailed in [[Python - Accessing Class Attributes|accessing class attributes]].
- Understanding how instances can shadow these values is covered in [[Python - Modifying Class Attributes on an Instance|modifying class attributes on an instance]].
- Practical applications and common patterns for using this feature are explored in [[Python - Use Cases for Class Attributes|use cases for class attributes]].

## Deeper Questions

- Imagine you're building a system to model a fleet of delivery drones. You could store the `max_payload_kg` as a class attribute for a `Drone` class, assuming all drones are the same model. What is the business risk of this design choice, and at what point would you refactor this to an instance attribute? How would you justify the engineering effort for this refactor to a product manager?
- If a class attribute is a large, mutable object (like a dictionary or a list) that is frequently modified by many instances across multiple threads, what specific concurrency problems (e.g., race conditions) might you encounter, and what Python-native mechanisms would you implement to ensure thread safety?
- What if Python's attribute lookup mechanism was reversed: it checked for an instance attribute first, and if not found, it would *not* look for a class attribute? How would this fundamental change break common design patterns like inheritance and default values, and what new patterns might emerge to compensate for the lack of shared state?