---
tags: 
  - comparison
  - python
  - instance_method
  - class_method
  - self
  - cls
  - classmethod_decorator
  - concept
source: 
  - "[[Intermediate Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Instance Methods]]"
  - "[[Python - Class Methods 1]]"
  - "[[Python - Instance Attributes vs Class Attributes]]"
  - "[[Python - self Keyword]]"
  - "[[Python - __init__ Method (Constructor)]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Decorators]]"
  - "[[Python - Static Methods]]"
  - "[[Python - Inheritance 1]]"
  - "[[Python - super() Function]]"
  - "[[Python - Class Attributes 1]]"
  - "[[Python - Instance Attributes 1]]"
---
# Comparison: Instance Methods vs. Class Methods

## Why This Comparison Matters

> In Python's object-oriented programming, the primary distinction lies in what the method operates on. An [[Python - Instance Methods|instance method]] belongs to and operates on a specific object (an instance of a class), using the [[Python - self Keyword|`self` keyword]] to access instance-specific data. In contrast, a [[Python - Class Methods 1|class method]], marked by the `@classmethod` decorator, belongs to the class itself and operates on class-level data, receiving the class as its first argument, conventionally named `cls`.

_Analogy:_ _Imagine a large car manufacturing company (the Class). Each car produced is an object (an Instance).

An **instance method** is like a mechanic performing a service on a *specific car*. To check the tire pressure, the mechanic needs that one car (`self`). The action is tied to the individual car's state (its unique tire pressure). You can't check the tire pressure of a car that hasn't been built yet.

A **class method** is like the factory's production manager announcing the *total number of cars of a certain model produced that day*. This information belongs to the factory (the Class) as a whole, not to any single car. The manager doesn't need a specific car to get this data; they consult the factory's overall records._

In this analogy:
- **The Car Factory:** Represents the `Class`.
- **A Specific Car:** Represents an `object` or `instance`.
- **The Mechanic:** Represents an `instance method`.
- **The Car's Tire Pressure:** Represents an `instance attribute`.
- **The Production Manager:** Represents a `class method`.
- **Total Cars Produced:** Represents a `class attribute`.

**Where it breaks down:** The analogy doesn't fully capture a primary use case for class methods: acting as alternative constructors (factory methods). The production manager reports data but doesn't *build* a new car based on a different set of blueprints, which is a common and powerful application of class methods.

## Side-by-Side Comparison

- **Instance Methods**
    - Implicitly passed the instance (`self`) as the first argument.
    - Called on an instance of the class (e.g., `my_car.get_mileage()`).
    - Can access and modify both instance attributes (via `self.attribute`) and class attributes (via `self.__class__.attribute`).
    - Primary Purpose: To interact with the state of a specific object.
- **Class Methods**
    - Must be decorated with `@classmethod`.
    - Implicitly passed the class (`cls`) as the first argument.
    - Can be called on the class itself (e.g., `Car.create_from_vin(...)`) or on an instance.
    - Can only access and modify class attributes. It has no access to a specific instance's attributes.
    - Primary Purpose: Factory methods (alternative constructors) or operations that relate to the class as a whole.

### Comparison Table

| Feature             | Instance Method                               | Class Method                                    |
|---------------------|-----------------------------------------------|-------------------------------------------------|
| **First Parameter** | `self` (the instance object)                  | `cls` (the class itself)                        |
| **Decorator**       | None (default)                                | `@classmethod`                                  |
| **Primary Access**  | Instance and Class attributes                 | Class attributes only                           |
| **Invocation**      | `my_object.method()`                          | `MyClass.method()`                              |
| **Core Use Case**   | Operating on an object's specific state       | Factory methods, class-level operations         |

## Key Similarities

Both instance and class methods are defined within the body of a class and are bound to it. They both have access to class-level attributes and can be called from an instance of the class. Their core similarity is that they are not free-floating functions but are part of a class's namespace and behavior.

## Verdict: When to Use Which

Use an **instance method** for any operation that needs to read or modify an object's unique state (its instance attributes). Use a **class method** when you need a method that is logically connected to the class but doesn't depend on the state of any particular instance, especially for creating instances through alternative means (factory pattern).

## Broader Connections

```
                          (Parent)
        Python - Object-Oriented Programming (OOP)
                           ▲
                           │
           ┌───────────────┼────────────────────────────┐
           │               │                            │
(Mirrors Distinction) ┌───────────────────────────┐   (Key Component)
[[Python - Instance Attributes vs Class Attributes|Instance vs. Class Attributes]] │ Instance Methods vs. Class Methods │   [[Python - self Keyword|self Keyword]]
                          └───────────────────────────┘
```

- The distinction between these method types directly mirrors the difference between [[Python - Instance Attributes vs Class Attributes|instance attributes and class attributes]], where one set of data belongs to the object and the other to the class.
- An [[Python - Instance Methods|instance method]] is the default and most common type of method, designed to operate on an object's unique state.
- A [[Python - Class Methods 1|class method]] provides an alternative that operates on the class itself, often used for factory patterns that create instances.
- The [[Python - self Keyword|`self` keyword]] is the fundamental mechanism that gives an instance method its context and access to a specific object's data.
- The [[Python - __init__ Method (Constructor)|`__init__` method]] is a special instance method responsible for initializing the state of a new object.

## Deeper Questions

- Imagine you're designing a `User` class. You need a way to create a `User` object from a dictionary of data coming from a web form. Would you use the standard `__init__` or a `@classmethod` factory? Justify your choice in terms of code clarity, flexibility for future data sources (e.g., loading from a CSV), and how it impacts the ease of onboarding a new developer.
- If a class method is used as a factory to create objects and it relies on a shared, mutable class attribute (e.g., a counter for total objects created), what potential race conditions could arise in a multi-threaded production environment, and how would you design the class method to be thread-safe?
- What if Python removed the `@classmethod` decorator entirely? How would you replicate its most common use case—the factory pattern—using only instance methods or standalone functions? What would be the design drawbacks of your alternative approach?