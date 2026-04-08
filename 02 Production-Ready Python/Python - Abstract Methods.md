---
tags: 
  - core
  - python
  - abstractmethod
  - abc
  - polymorphism
  - interface
  - contract
  - concept
source: 
  - "[[Intermediate Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Abstract Base Classes (ABCs)]]"
  - "[[Python - Creating an Abstract Base Class]]"
  - "[[Python - Concrete Methods in ABCs]]"
  - "[[Python - ABC Inheritance & TypeError Relationship]]"
  - "[[Python - Multiple Abstract Methods]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Inheritance]]"
  - "[[Python - Polymorphism]]"
  - "[[Python - Decorators]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Python - Error Handling]]"
  - "[[Python - Dunder Methods]]"
  - "[[Python - Metaclasses]]"
---
# Core: Abstract Methods

## Summary

>An abstract method is a method declared within an [[Python - Abstract Base Classes (ABCs)|abstract base class]] that has no implementation of its own. It acts as a required placeholder, forcing any concrete subclass to provide its own version of that method. In Python, this is achieved by using the `@abstractmethod` decorator from the `abc` module, and the method body typically contains only a `pass` statement.

**Why This Matters:** Abstract methods enforce a consistent interface across different subclasses, ensuring that any object of a certain type will have the required functionality, which prevents common runtime errors.

_Analogy:_ _Think of an abstract method as a required section in a legal contract template. For a 'Rental Agreement' template (the Abstract Base Class), there must be a section titled 'Tenant Responsibilities' (the abstract method). The template itself doesn't fill in the details—it just mandates that the section must exist. Every specific rental contract you create from this template (a concrete subclass) *must* fill out the 'Tenant Responsibilities' section with actual rules. You can't finalize the contract without it._

**Where it breaks down:** A legal contract is a static document. Abstract methods are part of a dynamic, executable system. The 'implementation' in a subclass isn't just text; it's functional code that can perform complex logic, which the analogy doesn't fully capture.

```
+--------------------------+
|   GraphicShape (ABC)     |
|--------------------------|
| @abstractmethod          |
| def area(self):          |  <-- Blueprint: "Must have an area() method"
|   pass                   |
+--------------------------+
           ▲
           │ (Inherits from)
+--------------------------+
|   Square (Concrete Class)|
|--------------------------|
| def area(self):          |  <-- Implementation: "Here's HOW to calculate my area"
|   return self.side ** 2  |
+--------------------------+
```

## Details

Abstract methods are the core mechanism that makes [[Python - Abstract Base Classes (ABCs)|Abstract Base Classes]] truly 'abstract'. They define a contract or a required API that all child classes must adhere to. By decorating a method with `@abstractmethod`, you are stating that this method must be implemented by any class that inherits from the ABC. The body of the abstract method in the parent class is irrelevant and is conventionally just `pass`, as its entire purpose is to be overridden.

#### Primary Goal

To force subclasses to implement specific methods, thereby guaranteeing a common, predictable interface for a family of related classes.

#### Mechanism

- **Step 1: Import `ABC` and `abstractmethod`**
    - To create an abstract base class and define abstract methods, you need these components from Python's built-in `abc` module.
- **Step 2: Define the Abstract Base Class**
    - Create a class that inherits from `ABC`. This is the blueprint or contract for all subclasses. This process is detailed in [[Python - Creating an Abstract Base Class]].
- **Step 3: Define the Abstract Method**
    - Inside the ABC, define a method and place the `@abstractmethod` decorator directly above its definition. The method's body should only contain the `pass` keyword.
- **Step 4: Create a Concrete Subclass**
    - Create a new class that inherits from your ABC. This class is intended to be a usable, instantiable class.
- **Step 5: Implement the Abstract Method**
    - In the subclass, you must provide a concrete implementation for every abstract method defined in the parent ABC. If you fail to do this, Python will raise a `TypeError` when you try to create an instance of the subclass, a concept explored in [[Python - ABC Inheritance & TypeError Relationship]].

##### Code Translation

```python
# --- Step 1: Import necessary modules ---
from abc import ABC, abstractmethod

# --- Step 2: Define the Abstract Base Class ---
class GraphicShape(ABC):
    def __init__(self, name):
        self.name = name

    # --- Step 3: Define the Abstract Method ---
    @abstractmethod
    def area(self):
        """Return the area of the shape."""
        pass

# --- Step 4: Create a Concrete Subclass ---
class Square(GraphicShape):
    def __init__(self, side):
        super().__init__("Square")
        self.side = side

    # --- Step 5: Implement the Abstract Method ---
    def area(self):
        """Calculate the area of the square."""
        return self.side ** 2

# --- Usage ---
my_square = Square(10)
print(f"The area of the {my_square.name} is: {my_square.area()}")

# This would raise a TypeError: Can't instantiate abstract class Circle
# with abstract method 'area'
# class Circle(GraphicShape):
#     def __init__(self, radius):
#         super().__init__("Circle")
#         self.radius = radius
# my_circle = Circle(5)
```

 [[Code - Abstract Methods Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`@abstractmethod` Decorator**
    - This is the primary mechanism for defining an abstract method. It's a marker that signals to Python's inheritance system that this method must be overridden by subclasses.
    - It must be imported from the `abc` module.
    - It should be the innermost decorator if multiple decorators are applied to a method.

#### Core Trade-offs

- **Pro: Enforces API Consistency**
    - Guarantees that all subclasses will have a specific set of methods, which is essential for writing reliable polymorphic code. You can confidently call `.area()` on any `GraphicShape` object, regardless of its specific subclass.
- **Con: Increased Rigidity**
    - Adding a new abstract method to a base class is a breaking change. All existing concrete subclasses across the entire codebase must be updated to implement the new method, which can be a significant refactoring effort.
- **Pro: Clearer Design Intent**
    - Using abstract methods makes the intended design of the class hierarchy explicit. It serves as clear documentation for future developers about what is required to create a new type of subclass.

## Connections

```
                      (Parent)
             Abstract Base Classes (ABCs)
                       ▲
                       │
    ┌──────────────────┼──────────────────┐
    │                  │                  │
(Contrast)    ┌──────────────────┐    (Used with)
Concrete Methods  │ Abstract Methods │    @abstractmethod
                  └──────────────────┘
                       │
            ┌──────────┴──────────┐
            │                     │
    (Result if not implemented)   (Example)
        TypeError           Multiple Abstract Methods
```

### Parent Concept

Abstract methods are a fundamental component of [[Python - Abstract Base Classes (ABCs)|Abstract Base Classes (ABCs)]], serving as the primary mechanism to define the required interface.

### Child Concepts



### Related Concepts 

- The process of defining an abstract method is a key part of [[Python - Creating an Abstract Base Class|creating an abstract base class]].
- An abstract method directly [[Python - ABC Inheritance & TypeError Relationship|relates to the TypeError]] that is raised when a subclass fails to provide a required implementation.
- Abstract methods often coexist with [[Python - Concrete Methods in ABCs|concrete methods]] within the same abstract base class to provide a mix of required and shared functionality.
- A single ABC can enforce a complex contract by defining [[Python - Multiple Abstract Methods|multiple abstract methods]], each of which must be implemented by subclasses.
## Questions

- You're designing a plugin system for an e-commerce platform where third-party developers can create new payment gateways (e.g., Stripe, PayPal, Crypto). How would you use abstract methods to define the contract for these plugins, and what's the business trade-off between enforcing a very strict, detailed contract versus a more flexible, minimal one?
- Imagine our `GraphicShape` ABC is used in a large-scale graphics rendering engine with hundreds of concrete shape classes. If we need to add a new mandatory method, `@abstractmethod def get_bounding_box(self):`, to the base class, what are the system-level challenges and risks, and how would you manage the rollout of this change across the entire codebase without breaking production?
- What if Python's `abc` module didn't exist? How could you simulate the behavior of abstract methods—specifically, the enforcement that subclasses *must* implement certain methods—using only standard Python features like dunder methods (`__init_subclass__`) or metaclasses?