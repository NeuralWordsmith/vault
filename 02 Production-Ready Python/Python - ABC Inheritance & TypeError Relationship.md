---
tags: 
  - relationship
  - python
  - inheritance
  - typeerror
  - interface
  - contract
  - subclassing
  - concept
source: 
  - "[[Intermediate Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Abstract Base Classes (ABCs)]]"
  - "[[Python - Abstract Methods]]"
  - "[[Python - Concrete Methods in ABCs]]"
  - "[[Python - Creating an Abstract Base Class]]"
  - "[[Python - Multiple Abstract Methods]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Inheritance]]"
  - "[[Python - Polymorphism]]"
  - "[[Python - Duck Typing]]"
  - "[[Python - Method Overriding]]"
  - "[[Python - super()]]"
  - "[[SWE - Liskov Substitution Principle]]"
  - "[[Python - Error Handling]]"
---
# Relationship: Implementing Abstract Methods in Subclasses

**Why This Matters:** This rule enforces a design contract, guaranteeing that any object conforming to an interface is complete and functional, which prevents unpredictable runtime errors.
## The Relationship Defined

**Type:** Enforcement

> In Python's object-oriented programming, any concrete class that inherits from an [[Python - Abstract Base Classes (ABCs)|Abstract Base Class (ABC)]] is contractually obligated to provide its own implementation for all of the parent's [[Python - Abstract Methods|abstract methods]]. If a subclass fails to define even one of these required methods, it is considered incomplete (and thus, abstract itself). The Python interpreter will raise a `TypeError` if you attempt to create an instance of such an incomplete class, effectively enforcing the interface defined by the ABC.

_Analogy:_ _Think of an Abstract Base Class as a government form for a building permit, like a 'PermitApplication'. The form has several sections that MUST be filled out, such as 'Electrical Plan', 'Plumbing Plan', and 'Structural Plan'. These required sections are the abstract methods.

A construction company (the subclass) wants to get a permit for a specific 'ResidentialHouse'. To do this, they must take the 'PermitApplication' form and provide concrete details for every required section. They must submit their specific electrical, plumbing, and structural plans.

If the company submits the form but leaves the 'Plumbing Plan' section blank, the permit office (the Python interpreter) will reject it immediately, saying, 'Cannot process this application; required information is missing.' This rejection is the `TypeError`. You can't start building (instantiate the object) without a complete and approved permit._

**Where it breaks down:** In the real world, you can't even submit the incomplete form. In Python, you can successfully *define* the incomplete subclass without error; the error only occurs when you try to *instantiate* it (i.e., create an object from it).

## Mechanism of Interaction

The presence of an [[Python - Abstract Methods|abstract method]] in a parent class acts as a flag. During the instantiation of a subclass, Python's type system checks if all methods flagged as abstract in the inheritance hierarchy have been overridden with concrete implementations. If any are missing, it blocks the object's creation by raising a `TypeError`.

### Implementation Proof

```python
from abc import ABC, abstractmethod

# --- Step 1: Define the ABC and its abstract method ---
# This establishes the 'contract' that all subclasses must follow.
class Shape(ABC):
    @abstractmethod
    def area(self):
        """Return the area of the shape."""
        pass

# --- Step 2: Create a concrete subclass that fulfills the contract ---
# The 'Square' class provides its own implementation for the 'area' method.
class Square(Shape):
    def __init__(self, side_length):
        self.side_length = side_length

    def area(self):
        return self.side_length ** 2

# This works perfectly because the contract is met.
square = Square(5)
print(f"Square area: {square.area()}") # Output: Square area: 25

# --- Step 3: Attempt to create an incomplete subclass ---
# The 'Circle' class inherits from 'Shape' but 'forgets' to implement 'area'.
class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    # Missing the required 'area' method implementation.
    def circumference(self):
        return 2 * 3.14159 * self.radius

# --- Step 4: Trigger the TypeError by trying to instantiate it ---
try:
    # This line will fail because Circle is abstract.
    circle = Circle(10)
except TypeError as e:
    print(f"\nError: {e}")
    # Output: Error: Can't instantiate abstract class Circle with abstract method area
```

## Implications & Impact

This forces developers to create subclasses that are complete and conform to the interface defined by the ABC, preventing the creation of 'broken' or incomplete objects and leading to more predictable, polymorphic behavior.

## Key Connections

- The core purpose of this rule is to enforce the contract defined by [[Python - Abstract Methods|abstract methods]] within a parent class.
- This concept is the enforcement mechanism that gives power to [[Python - Abstract Base Classes (ABCs)|Abstract Base Classes (ABCs)]] as interface definitions.
- This requirement contrasts with [[Python - Concrete Methods in ABCs|concrete methods in ABCs]], which are inherited normally and do not need to be implemented by the subclass.
- The entire process begins with [[Python - Creating an Abstract Base Class|creating an abstract base class]] that contains one or more abstract methods.

## Deeper Questions

- Imagine you're building a plugin system for an e-commerce platform where third-party developers can create new payment gateways. How would you use an ABC to define the `PaymentGateway` interface? What's the business trade-off between enforcing a very strict interface with many abstract methods versus a more flexible one with fewer, and how does this impact the developer experience and time-to-market for new plugins?
- In a large, evolving codebase with dozens of classes inheriting from a core ABC, what is the risk of adding a new abstract method to that base class? How would you manage this change across the system to avoid breaking all existing implementations, and what tools or strategies (like versioning the ABC) could you employ?
- What if Python allowed you to instantiate a class that hadn't implemented all of its parent's abstract methods? What would be the immediate consequences for polymorphism, and what kind of runtime checks or defensive programming would you need to add to every function that accepts the base class type as an argument?