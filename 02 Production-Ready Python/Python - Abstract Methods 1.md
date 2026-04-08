---
tags: 
  - core
  - python
  - abstract_base_class
  - abc_module
  - contract
  - polymorphism
  - inheritance
  - concept
source: 
  - "[[Intermediate Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Interfaces]]"
  - "[[Python - Formal Interfaces]]"
  - "[[Python - Informal Interfaces]]"
  - "[[Python - Duck Typing]]"
  - "[[Python - Interfaces vs Abstract Base Classes]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Decorators]]"
  - "[[Python - Inheritance]]"
  - "[[Python - Polymorphism]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Python - Class Methods]]"
  - "[[Python - Formal Interfaces & Contract Enforcement Relationship]]"
---
# Core: Abstract Methods

## Summary

>An abstract method is a method declared in a base class without any implementation, acting as a required placeholder. Any concrete (non-abstract) subclass is forced to provide its own implementation for that method. They are the fundamental building blocks for creating [[Python - Formal Interfaces|formal interfaces]] in Python, establishing a 'contract' that implementing classes must follow.

**Why This Matters:** Abstract methods enforce a consistent structure across different classes, ensuring that any object conforming to an interface will have a predictable and reliable set of behaviors.

_Analogy:_ _An abstract method is like a required section in a standardized government form. For example, a passport application form has mandatory fields like 'Full Name', 'Date of Birth', and 'Place of Birth'. The form itself (the interface) doesn't provide the information, it just dictates that these fields *must* be filled out. Each applicant (the concrete class) must provide their own specific details for these fields. You cannot submit the form if any of these required sections are left blank._

**Where it breaks down:** A paper form is static. In programming, especially with a dynamic language like Python, you can often get away with not formally 'signing the contract' and instead rely on [[Python - Duck Typing|duck typing]], where the system only checks if the object can perform the required action at the moment it's asked to, much like scribbling a required field onto a form at the last second.

```
  +-------------------------+
  |      Shape (ABC)        |
  |-------------------------|
  | @abstractmethod         |
  |   def area(self): pass  |
  | @abstractmethod         |
  |   def perimeter(self):  |
  |       pass              |
  +-------------------------+
             ▲
             | (Inherits from & Implements)
  ┌──────────┴──────────┐
  |                     |
+-----------------+   +-----------------+
|     Square      |   |     Circle      |
|-----------------|   |-----------------|
| def area(self): |   | def area(self): |
|   return s*s  |   |   return pi*r*r |
| def perimeter() |   | def perimeter() |
+-----------------+   +-----------------+
```

## Details

An abstract method provides a skeleton of a method's signature—its name and parameters—but contains no functional code, typically just a `pass` statement. It lives inside an Abstract Base Class (ABC) and serves as a rule for all child classes. By inheriting from the ABC, a child class agrees to a contract, promising to provide a concrete implementation for every abstract method defined in the parent. This ensures that any object of a child class will reliably have the same core methods available, which is a cornerstone of robust object-oriented design.

#### Primary Goal

To define a mandatory method signature that all subclasses must implement, thereby enforcing a consistent API contract.

#### Mechanism

- **Step 1: Import `ABC` and `abstractmethod`**
    - To create abstract methods in Python, you need tools from the built-in `abc` (Abstract Base Classes) module.
- **Step 2: Define the Abstract Base Class (Interface)**
    - Create a class that inherits from `ABC`. This class acts as the blueprint or interface and cannot be instantiated on its own.
- **Step 3: Declare Abstract Methods**
    - Inside the ABC, define methods with the `@abstractmethod` decorator. The body of these methods should only contain the `pass` keyword.
- **Step 4: Create Concrete Subclasses**
    - Define new classes that inherit from your ABC. These 'concrete' classes must provide their own working implementation for *all* the abstract methods from the parent.
- **Step 5: Observe the Contract Enforcement**
    - If you try to create an instance of a subclass that has not implemented all the required abstract methods, Python will raise a `TypeError`, thus enforcing the contract at instantiation time.

##### Code Translation

```python
# --- Step 1: Import from the abc module ---
from abc import ABC, abstractmethod
import math

# --- Step 2: Define the Abstract Base Class (Interface) ---
class Shape(ABC):
    """An interface for any object that can be considered a shape."""
    
    # --- Step 3: Declare Abstract Methods ---
    @abstractmethod
    def area(self):
        """Return the area of the shape."""
        pass

    @abstractmethod
    def perimeter(self):
        """Return the perimeter of the shape."""
        pass

# --- Step 4: Create Concrete Subclasses ---
class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return math.pi * self.radius ** 2

    def perimeter(self):
        return 2 * math.pi * self.radius

class Square(Shape):
    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side ** 2

    def perimeter(self):
        return 4 * self.side

# --- Step 5: Observe the Contract Enforcement ---

# This works because Circle implements all abstract methods
my_circle = Circle(10)
print(f"Circle Area: {my_circle.area()}")

# This would fail with a TypeError because Shape has abstract methods
# my_shape = Shape() # TypeError: Can't instantiate abstract class Shape

# Let's define a class that *forgets* to implement a method
class BadRectangle(Shape):
    def __init__(self, length, width):
        self.length = length
        self.width = width

    def area(self):
        return self.length * self.width
    
    # Missing the perimeter() method!

# This will fail with a TypeError
# my_bad_rectangle = BadRectangle(5, 4) # TypeError: Can't instantiate abstract class
```

 [[Code - Abstract Methods Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Method Signature as a Guideline**
    - The primary 'parameter' of an abstract method is its entire signature (name and expected arguments).
    - As the context notes, the parameters in the subclass implementation don't need to match the abstract method's parameters *exactly* (e.g., different variable names), but they must be compatible to fulfill the contract's intent.

#### Core Trade-offs

- **Pro: Guarantees Structure and Safety**
    - They enforce a clear, explicit contract. This prevents runtime errors by ensuring that any object claiming to be a certain type actually has the methods required to function as that type.
- **Pro: Improves Code Readability and Maintainability**
    - Abstract Base Classes serve as excellent documentation, clearly defining the required API for a family of objects.
- **Con: Increased Rigidity and Boilerplate**
    - This approach is more rigid than [[Python - Duck Typing|duck typing]]. It requires explicitly inheriting from the ABC and using decorators, which can feel like unnecessary boilerplate for simpler applications.

## Connections

```
                      (Parent)
                    Interfaces
                         ▲
                         │
         ┌───────────────┼────────────────┐
         │               │                │
(Mechanism For) ┌──────────────────┐ (Contrasts With)
Formal Interfaces │  Abstract Methods  │ Duck Typing
                  └──────────────────┘
                         │
                         ▼
                   (Implemented In)
                   Concrete Classes
```

### Parent Concept

Abstract methods are a fundamental component of [[Python - Object-Oriented Programming (OOP)|object-oriented programming]] and are the primary building blocks used to create [[Python - Interfaces|interfaces]].

### Child Concepts

- There are no direct 'types' of abstract methods, but their power is realized when a **concrete method** in a subclass provides a specific implementation for the contract defined by the abstract method.

### Related Concepts 

- They are the core mechanism for implementing [[Python - Formal Interfaces|formal interfaces]], which provide checks before runtime.
- This explicit contract-based approach contrasts sharply with [[Python - Duck Typing|duck typing]], which checks for the presence of methods only when they are called at runtime.
- The relationship between interfaces and abstract base classes is nuanced; [[Python - Interfaces vs Abstract Base Classes|interfaces are a design concept, while ABCs are the specific Python implementation]] for creating them.
- The enforcement of this contract is a key part of the [[Python - Formal Interfaces & Contract Enforcement Relationship|relationship between formal interfaces and contract enforcement]].
## Questions

- Your team is building a plugin system for an e-commerce platform where third-party developers can create new payment gateways. Would you enforce a strict interface with abstract methods for `process_payment` and `issue_refund`, or rely on duck typing? Justify your choice in terms of system reliability vs. developer friction and the potential business impact of a faulty plugin.
- Imagine a large-scale system with hundreds of classes implementing an interface defined by abstract methods. If you need to add a new, mandatory abstract method to the base interface, how would you manage the refactoring process across the entire codebase to avoid breaking production, and what tools or strategies would you use to ensure all implementing classes are updated?
- What if Python's `@abstractmethod` decorator was removed from the language? How could you implement a similar 'must-implement' contract enforcement mechanism using only metaclasses or custom class decorators, and what would be the potential downsides of your custom solution?