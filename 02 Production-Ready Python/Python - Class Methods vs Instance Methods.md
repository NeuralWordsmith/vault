---
tags: 
  - comparison
  - python
  - instance_method
  - self
  - object_state
  - bound_method
  - oop
  - concept
source: 
  - "[[Introduction to Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Methods]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Objects]]"
  - "[[Python - @classmethod Decorator]]"
  - "[[Python - The 'cls' Argument in Class Methods]]"
  - "[[Python - Calling Class Methods]]"
  - "[[Python - Scope of Class Methods]]"
  - "[[Python - Use Cases for Class Methods]]"
  - "[[Python - Alternative Constructors with Class Methods]]"
  - "[[Python - Singleton Design Pattern]]"
  - "[[Python - Scope]]"
  - "[[Python - Functions]]"
---
# Comparison: Instance Methods

## Why This Comparison Matters

> An instance method is a function defined within a class that is bound to an object (an instance of the class), not the class itself. Its primary purpose is to access and modify the object's unique state (instance-level data). As shown in the `Employee` example, when the `give_raise` method is called on two different employee objects, it modifies each object's individual `salary` attribute. This demonstrates that the method operates on data specific to that instance, passed implicitly via the `self` parameter. This contrasts with [[Python - Class Methods|class methods]], which operate on class-level data and have a more limited [[Python - Scope of Class Methods|scope]].

_Analogy:_ _Think of a class as the blueprint for a house, and an instance as a specific house built from that blueprint. An instance method is like the homeowner's personal key to their own front door. The key (`self`) is unique to that specific house (the instance) and can only be used to perform actions on it, like locking or unlocking its door (modifying its state). The key for House #101 won't work on House #102, just as calling `give_raise` on `emp_one` doesn't affect `emp_two`'s salary._

Where it breaks down: A key is a passive tool. An instance method in Python is an active piece of logic. It can contain complex calculations, call other methods, and interact with other objects, which goes far beyond the simple open/close function of a physical key.

## Side-by-Side Comparison

- **Instance Method**
    - Bound to a specific instance of the class.
    - Receives the instance as its first argument, conventionally named `self`.
    - Designed to access and modify instance-specific attributes (e.g., `self.name`, `self.salary`).
    - Called on an object: `my_object.do_something()`.
- **Class Method**
    - Bound to the class itself, not an instance.
    - Receives the class as its first argument, conventionally named `cls`, as discussed in [[Python - The 'cls' Argument in Class Methods|the 'cls' argument]].
    - Designed to access and modify class-level attributes or perform operations related to the class as a whole.
    - Can be called on the class (`MyClass.do_something()`) or an instance (`my_object.do_something()`).

### Comparison Table

| Feature | Instance Method | Class Method |
| :--- | :--- | :--- |
| **Binding** | Bound to the object/instance | Bound to the class |
| **First Argument** | `self` (the instance) | `cls` (the class) |
| **Data Access** | Instance attributes (`self.x`) | Class attributes (`cls.y`) |
| **Primary Use Case** | Manipulating object state | Factory methods, class-wide operations |

## Key Similarities

Both instance and class methods are functions defined within the body of a class. They represent behaviors associated with the class and its objects. Both can be called from an instance of the class, though their underlying binding and the first argument they receive are fundamentally different.

## Verdict: When to Use Which

Use an instance method for the vast majority of cases where you need to work with an object's unique data (its state). Use a class method for factory functions (like [[Python - Alternative Constructors with Class Methods|alternative constructors]]) or for operations that concern the class as a whole, not any single instance.

## Broader Connections

```
                      (Parent)
              Object-Oriented Programming
                         ▲
                         │
┌────────────────────────┼────────────────────────┐
│                        │                        │
(Contrasts With) ┌──────────────────┐      (Special Type)
Class Methods    │ Instance Methods │      __init__
                 └──────────────────┘
```

- The primary distinction of an instance method is that it contrasts with a [[Python - Class Methods|class method]], which is bound to the class rather than the instance.
- Instance methods are defined within a [[Python - Class Definition|class definition]] and are the most common type of method in object-oriented programming.
- The first parameter of an instance method is conventionally named `self`, which provides a reference to the specific object the method is being called on.
- The [[Python - @classmethod Decorator|@classmethod decorator]] is used to explicitly mark a method as a class method, distinguishing it from a standard instance method.

## Deeper Questions

- You're designing a `DataProcessor` class. When would you choose to implement a data validation rule as a private instance method versus a standalone utility function that takes the object as an argument? How does this choice affect the class's public API and its long-term maintainability for the business?
- In a distributed system with millions of `UserSession` objects, an instance method `calculate_activity_score()` is causing a performance bottleneck. How would you re-architect this feature to offload the computation from the object itself, considering scalability, data consistency, and potential failure modes?
- What if Python's `self` was not passed implicitly, and you had to manually pass the object reference to every instance method call (e.g., `emp_one.give_raise(emp_one, 5000)`)? How would this change the way you write and reason about object-oriented code, and what core OOP principle would be most violated?