---
tags: 
  - process
  - python
  - abstract_base_class
  - abc_module
  - interface
  - polymorphism
  - contract
  - concept
source: 
  - "[[Intermediate Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Abstract Base Classes (ABCs)]]"
  - "[[Python - Abstract Methods]]"
  - "[[Python - Concrete Methods in ABCs]]"
  - "[[Python - ABC Inheritance & TypeError Relationship]]"
  - "[[Python - Multiple Abstract Methods]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Decorators]]"
  - "[[Python - Inheritance]]"
  - "[[Python - Polymorphism]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Python - Magic Methods]]"
  - "[[Python - Duck Typing]]"
  - "[[Fundamental - Software Engineering]]"
---
# Process: Creating Abstract Base Classes

**Why This Matters:** This process enforces a consistent structure across related classes, preventing runtime errors by ensuring that all subclasses implement a required set of methods.
## Goal & Analogy

> **Goal:** Creating an Abstract Base Class (ABC) in Python is the process of defining a blueprint for other classes. It involves making a class that inherits from the `ABC` helper class and contains one or more [[Python - Abstract Methods|abstract methods]]. These methods are declared but not implemented, forcing any subclass to provide its own implementation, thus guaranteeing a common interface. ABCs can also include [[Python - Concrete Methods in ABCs|concrete methods]] that are inherited directly by all subclasses.

_Analogy:_ _Think of creating an ABC as a city planner designing the blueprint for a new housing development. The planner creates a master blueprint (the ABC) that mandates certain features for every house: every house *must* have a front door and a connection to the sewer system (the abstract methods). The blueprint doesn't specify the color of the door or the type of pipes, just that they must exist. The blueprint also includes features that are identical for all houses, like the street address format and the utility hookup locations (the concrete methods)._

Each construction company (the subclass) must then build a house that follows the blueprint, implementing its own specific front door and sewer connection. If a company tries to build a house without a front door, the city inspector (the Python interpreter) will immediately fail the inspection and halt construction ([[Python - ABC Inheritance & TypeError Relationship|raising a `TypeError`]]). **Where it breaks down:** Unlike a physical blueprint which is just a passive guide, a Python ABC is an *active* enforcement mechanism. The Python interpreter checks for compliance the moment a subclass is defined, not after it has been 'built' and used.

```
    abc module
       │
       ├─ import ABC
       └─ import @abstractmethod
            │
    class School(ABC):  <── Step 2: Inherits from ABC
        │
        ├─ @abstractmethod  <── Step 3: Decorator marks method as required
        │  def enroll(self):
        │      pass
        │
        └─ def graduate(self):  <── Step 4: Concrete method is inherited directly
               # implementation...
```

## The Step-by-Step Process

### Prerequisites / Inputs

- **`ABC` Class**
    - The special marker class from the `abc` module. A class must inherit from `ABC` to be officially recognized as an abstract base class by Python.
- **`@abstractmethod` Decorator**
    - A decorator that transforms a regular method into an abstract one. Any non-abstract subclass that inherits from the ABC must provide an implementation for all methods marked with this decorator.

### The Steps

- **Step 1: Import Required Modules**
    - Begin by importing the `ABC` class and the `abstractmethod` decorator from Python's built-in `abc` module.
- **Step 2: Create the Abstract Base Class**
    - Define a new class that inherits directly from `ABC`. This inheritance is the signal to Python that this class is intended as a blueprint and not a regular, instantiable class.
- **Step 3: Define Abstract Methods**
    - Inside the ABC, define one or more methods and place the `@abstractmethod` decorator directly above their definition. The body of these methods should typically be empty, containing only the `pass` statement. This marks them as required for any subclass to implement.
- **Step 4: (Optional) Define Concrete Methods**
    - Add any regular methods to the ABC as you normally would. These [[Python - Concrete Methods in ABCs|concrete methods]] contain full implementations and will be inherited and usable by all subclasses without needing to be overridden.

##### Code Translation

```python
# --- Step 1: Import Required Modules ---
from abc import ABC, abstractmethod

# --- Step 2: Create the Abstract Base Class ---
# The School class is a blueprint; it cannot be instantiated directly.
class School(ABC):

    # --- Step 3: Define Abstract Methods ---
    # Any class that inherits from School *must* implement the enroll() method.
    @abstractmethod
    def enroll(self):
        # The body is empty because each subclass will define its own logic.
        pass

    # --- Step 4: (Optional) Define Concrete Methods ---
    # This method is inherited by all subclasses automatically.
    def graduate(self):
        print("Congrats on graduating!")

# Example of a concrete subclass
class University(School):
    def enroll(self):
        print("Enrolling in a 4-year university program.")

# This would raise a TypeError because it doesn't implement enroll():
# class HighSchool(School):
#     def get_locker_number(self):
#         return 123

# --- Usage ---
u = University()
u.enroll()    # Calls the implementation from the University class
u.graduate()  # Calls the concrete method from the School ABC
```

### Deliverables / Outputs

The core idea behind creating an [[Python - Abstract Base Classes (ABCs)|Abstract Base Class]] is to establish a formal contract for a group of related classes. By inheriting from the `ABC` helper class and using the `@abstractmethod` decorator, you can define a common API that all subclasses are required to adhere to. This is a fundamental concept in [[Python - Object-Oriented Programming (OOP)]] that promotes code consistency and prevents logical errors by ensuring that essential methods are always implemented. The process involves a few key steps: **importing necessary tools, inheriting from ABC, decorating abstract methods, and optionally adding concrete methods.**

## Context & Tradeoffs

### When to Use This Process

To define a common, enforceable interface (a set of required methods) for a group of subclasses, ensuring they all share a predictable structure and functionality.

### Common Pitfalls & Tradeoffs

- **Pro (Increased Rigidity & Clarity)**
    - Enforces a clear contract, making the codebase more predictable and self-documenting. It prevents errors where a developer forgets to implement a crucial method in a subclass.
- **Con (Added Boilerplate & Complexity)**
    - Introduces a layer of abstraction that can feel like unnecessary overhead for simpler class hierarchies. It requires developers to understand the `abc` module and its concepts.
- **Pro (Enables Reliable Polymorphism)**
    - Facilitates polymorphism by guaranteeing that any object derived from the ABC will have the required methods, allowing different objects to be treated as the same type (`isinstance()` and `issubclass()` work as expected).
- **Con (Less Flexible than Duck Typing)**
    - Python's natural "duck typing" is often more flexible. ABCs impose a stricter, formal interface (nominal subtyping), which might be overly restrictive in some dynamic scripting scenarios where behavior matters more than formal inheritance.

## Connections

```
                      (Parent)
        Object-Oriented Programming
                       ▲
                       │
    ┌──────────────────┼──────────────────┐
    │                  │                  │
(Component)     ┌───────────────────────────┐     (Component)
Abstract Methods  │ Creating Abstract Base Classes │  Concrete Methods in ABCs
                  └───────────────────────────┘
                       │
            ┌──────────┴──────────┐
            │                     │
      (Consequence)         (Example)
ABC Inheritance & TypeError   Multiple Abstract Methods
```


- The core component of this process is defining one or more [[Python - Abstract Methods|abstract methods]], which act as the contractual requirements for subclasses.
- This creation process is the foundation for establishing [[Python - Abstract Base Classes (ABCs)|Abstract Base Classes]], which serve as formal blueprints in an object-oriented design.
- A key outcome of this design is the [[Python - ABC Inheritance & TypeError Relationship|relationship between inheritance and TypeErrors]], where Python actively prevents the instantiation of incomplete subclasses.
- An ABC is not limited to just abstract methods; the creation process often includes defining [[Python - Concrete Methods in ABCs|concrete methods]] to provide shared, default functionality to all children.

## Deeper Questions

- You're designing a plugin system for an e-commerce platform where third-party developers can create new payment gateways. Would you enforce a strict ABC for all gateways? How would you justify the initial development overhead of creating and maintaining this ABC to a project manager focused on shipping the first version as quickly as possible?
- Imagine our `School` ABC is used by hundreds of different `University` and `Bootcamp` subclasses across a large microservices architecture. How would you manage and version changes to the ABC itself? What's the deployment strategy to ensure a change (like adding a new abstract method) doesn't break all existing services simultaneously?
- What if the `@abstractmethod` decorator didn't exist? How could you mimic the behavior of an ABC—specifically, preventing a subclass from being instantiated if it's missing a method—using only standard class features like `__init__` or `__init_subclass__`?