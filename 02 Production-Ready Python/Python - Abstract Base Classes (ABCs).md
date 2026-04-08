---
tags: 
  - major_core
  - python
  - abstract_base_class
  - abc_module
  - inheritance
  - polymorphism
  - interface
  - concept
source: 
  - "[[Intermediate Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Abstract Methods]]"
  - "[[Python - Concrete Methods in ABCs]]"
  - "[[Python - ABC Inheritance & TypeError Relationship]]"
  - "[[Python - Creating an Abstract Base Class]]"
  - "[[Python - Multiple Abstract Methods]]"
  - "[[Python - Decorators]]"
  - "[[Python - Error Handling]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Python - Functions]]"
  - "[[Python - Class Methods]]"
---
# Major Core: Abstract Base Classes

## Summary

> An Abstract Base Class (ABC) in Python is a special type of class that acts as a blueprint or contract for its subclasses. It defines a common interface by declaring [[Python - Abstract Methods|abstract methods]] that any concrete (i.e., non-abstract) subclass must implement. ABCs themselves cannot be instantiated.

**Why This Matters:** Abstract Base Classes enforce a consistent structure across related classes, preventing runtime errors and making large codebases more predictable and maintainable.

_Analogy:_ _Think of an Abstract Base Class as the official application form for a specific job, like "Software Engineer." The form has required fields that *every* applicant must fill out: "Name," "Contact Info," and "Years of Experience." You can't submit an empty or incomplete form; it would be rejected._

Where it breaks down:** Unlike a paper form, an Abstract Base Class can also provide pre-filled sections that are common to all applicants (e.g., "Company Policy Agreement"). These are known as [[Python - Concrete Methods in ABCs|concrete methods]].

```
    +------------------+
    |   Shape (ABC)    |
    |------------------|
    | + area()         |  <-- Abstract Method (Contract)
    | + perimeter()    |  <-- Abstract Method (Contract)
    +------------------+
             ▲
             | (Inherits from)
    ┌────────┴────────┐
    |                 |
+--------------+   +--------------------------------+
| Square       |   | Circle (Incomplete)            |
|--------------|   |--------------------------------|
| - side       |   | - radius                       |
|--------------|   |--------------------------------|
| + area()     |   | + area()                       |
| + perimeter()|   |                                |
+--------------+   +--------------------------------+
      (Valid)         (Invalid - Raises TypeError)
```

## Details

In object-oriented programming, we often want to create a family of classes that share a common set of behaviors. Abstract Base Classes (ABCs) provide a formal way to define this common interface. They act as a contract, guaranteeing that any class inheriting from them will have a specific set of methods available. This is a core principle of polymorphism, allowing different objects to be treated the same way if they adhere to the same contract. An ABC is created by inheriting from the `ABC` class from Python's `abc` module and uses decorators to specify its required methods.

#### Primary Goal

To enforce a common API or interface across a set of related subclasses, ensuring they all provide a required set of functionalities.

#### Mechanism

- **How it Works:**
    1. A developer first defines a "blueprint" class by [[Python - Creating an Abstract Base Class|creating a class]] that inherits from `ABC`.
    2. Inside this class, they define one or more methods but mark them as abstract using the `@abstractmethod` decorator. These are the [[Python - Abstract Methods|abstract methods]].
    3. Other developers then create concrete classes that inherit from this ABC.
    4. Python's inheritance mechanism checks if these new subclasses have implemented *all* the abstract methods from the parent ABC.
    5. If a subclass fails to implement even one abstract method, Python will raise a `TypeError` upon any attempt to instantiate it, which is the core of the [[Python - ABC Inheritance & TypeError Relationship|relationship between ABC inheritance and TypeErrors]].
- **Key Components:**
    - **`ABC` class:** A helper class from the `abc` module that makes a regular class an ABC when inherited.
    - **`@abstractmethod` decorator:** A decorator from the `abc` module used to declare a method as abstract. The method has no implementation in the ABC itself (often just a `pass` statement).

```python
from abc import ABC, abstractmethod

# --- Define the Abstract Base Class (the blueprint) ---
class Shape(ABC):
    @abstractmethod
    def area(self):
        """Return the area of the shape."""
        pass

    @abstractmethod
    def perimeter(self):
        """Return the perimeter of the shape."""
        pass

# --- Create a concrete subclass that implements the contract ---
class Square(Shape):
    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side * self.side

    def perimeter(self):
        return 4 * self.side

# --- Attempting to use the classes ---
# This works because Square fulfills the Shape contract
my_square = Square(5)
print(f"Square Area: {my_square.area()}") # Output: Square Area: 25

# This will fail with a TypeError because Circle doesn't implement 'perimeter'
class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14 * self.radius * self.radius

try:
    my_circle = Circle(10)
except TypeError as e:
    print(f"Error: {e}")
    # Output: Error: Can't instantiate abstract class Circle with abstract method perimeter
```

 [[Code - Abstract Base Classes Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Scope of Abstraction:**
    - Deciding which methods should be abstract versus concrete is the primary 'lever'. Making a method abstract forces every subclass to create its own unique implementation.
    - Conversely, providing a [[Python - Concrete Methods in ABCs|concrete method]] in the ABC offers default functionality that subclasses can use directly or override if needed.

#### Core Trade-offs

- **Pro: Enforced Consistency & Clarity**
    - ABCs make the code's intent clear. They explicitly define the required interface for a family of classes, which improves readability and maintainability.
    - They prevent common errors by raising a `TypeError` at instantiation time (early) rather than a potential `AttributeError` at runtime (late) if a method is missing.
- **Con: Increased Rigidity & Boilerplate**
    - They introduce a level of rigidity. Every subclass *must* conform to the interface, which might be overly restrictive for simple cases or during rapid prototyping.
    - For simple class hierarchies, defining an ABC can feel like unnecessary boilerplate code compared to informal interfaces (duck typing).

## Connections

```
                           (Parent)
               Object-Oriented Programming
                             ▲
                             │
       ┌─────────────────────┼─────────────────────┐
       │                     │                     │
(Related Concept)   ┌───────────────────────────┐   (Related Concept)
  Abstract Methods  │  Abstract Base Classes    │   Polymorphism
                    └───────────────────────────┘
                                 │
                      ┌──────────┴──────────┐
                      │                     │
             Concrete Methods      ABC Inheritance &
                in ABCs           TypeError Relationship
```

### Parent Concept

Abstract Base Classes are a fundamental concept within [[Python - Object-Oriented Programming (OOP)|Object-Oriented Programming (OOP)]], providing a mechanism to enforce structure and contracts through inheritance.

### Child Concepts

- While ABCs don't have formal 'child' concepts, the direct result of using an ABC is the creation of **concrete subclasses**, which are the non-abstract classes that inherit from the ABC and implement all of its abstract methods.

### Related Concepts 

- The core components of an ABC are its [[Python - Abstract Methods|abstract methods]], which serve as the contractual obligations for subclasses.
- An ABC is not limited to just abstract methods; it can also include [[Python - Concrete Methods in ABCs|concrete methods]] to provide shared, default functionality to all its children.
- The enforcement mechanism of an ABC is the [[Python - ABC Inheritance & TypeError Relationship|direct relationship between inheritance and TypeErrors]], which prevents the instantiation of incomplete classes.
- The process of [[Python - Creating an Abstract Base Class|creating an ABC]] involves inheriting from Python's built-in `ABC` class and using the `@abstractmethod` decorator.
## Questions

- You're designing a plugin system for a data processing application. You could enforce the plugin API using an Abstract Base Class or rely on Python's 'duck typing'. When would the rigidity of an ABC provide more business value than the flexibility of duck typing, especially considering future plugin developers might be third-party contributors?
- Imagine an ABC is defined in a core library that is a dependency for 50 other microservices. If you need to add a new abstract method to this ABC, how would you manage the rollout across the entire system to avoid breaking all dependent services simultaneously?
- What if Python's `abc` module didn't exist? How could you implement a similar 'abstract' behavior using only basic class features like `__init__` or metaclasses to ensure subclasses implement required methods?
