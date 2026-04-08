---
tags: 
  - relationship
  - python
  - abc module
  - typeerror
  - abstract base class
  - contract
  - instantiation
  - concept
source: 
  - "[[Intermediate Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Formal Interfaces]]"
  - "[[Python - Abstract Methods 1]]"
  - "[[Python - Informal Interfaces]]"
  - "[[Python - Duck Typing]]"
  - "[[Python - Interfaces]]"
  - "[[Python - Interfaces vs Abstract Base Classes]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Decorators]]"
  - "[[Python - Error Handling]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Python - Inheritance]]"
  - "[[Python - Polymorphism]]"
  - "[[Python - Metaclasses]]"
---
# Relationship: Enforcement of Formal Interfaces

**Why This Matters:** Enforcing formal interfaces at instantiation time prevents the creation of incomplete or 'broken' objects, guaranteeing that any object of a certain type will reliably have the methods you expect, thus preventing subtle runtime bugs.
## The Relationship Defined

**Type:** Constituent

> In Python, the enforcement of a formal interface is the mechanism by which the `abc` module ensures a subclass fully adheres to the contract defined by its parent Abstract Base Class (ABC). This check occurs not when the class is defined, but at the moment of instantiation. If a subclass fails to implement all of the parent's `[[Python - Abstract Methods 1|abstract methods]]`, Python raises a `TypeError`, effectively blocking the creation of an invalid object. This provides a strong guarantee that is absent in `[[Python - Informal Interfaces|informal interfaces]]` and is the defining characteristic of `[[Python - Formal Interfaces|formal interfaces]]`.

_Analogy:_ _Think of a formal interface as a building blueprint certified by the city, and a class as the construction company building the house. The blueprint (`ABC`) explicitly requires essential systems like plumbing, electrical, and structural supports (`abstract methods`). The construction company (`subclass`) can build the house, but before anyone can move in (`instantiate an object`), a city inspector (`Python's type checker`) must verify that *every single required system* from the blueprint has been installed. If the plumbing is missing, the inspector will refuse to issue an occupancy permit (`raise a TypeError`), preventing the incomplete house from being used._

Blueprint -> ABC (Abstract Base Class)
Required Systems -> Abstract Methods
Construction Company -> Subclass
City Inspector -> Python's instantiation check
Occupancy Permit -> Successful object creation

**Where it breaks down:** A real-world inspector checks a mostly-finished building. In Python, the 'inspection' happens the very instant you try to create the object, preventing an incomplete object from ever existing, even for a moment.

## Mechanism of Interaction

This enforcement mechanism is the core feature that gives a formal interface its power. The `abc` module's metaclass machinery intercepts the instantiation process of any subclass of an ABC. It checks if all methods decorated with `@abstractmethod` in the parent have been overridden in the subclass. If not, it raises a `TypeError`.

### Implementation Proof

```python
from abc import ABC, abstractmethod

# --- Step 1: Define the Formal Interface ---
# The 'Course' class is our blueprint. It demands that any subclass
# must know how to grade an assignment.
class Course(ABC):
    def __init__(self, title):
        self.title = title

    @abstractmethod
    def grade_assignment(self, student, score):
        """A method to record a grade for a student."""
        pass

# --- Step 2: Create an Incomplete Implementation ---
# The ProgrammingCourse class inherits the contract but 'forgets' 
# to define the grade_assignment method.
class ProgrammingCourse(Course):
    def get_title(self):
        return f"Course: {self.title}"

# --- Step 3 & 4: Trigger the Enforcement Check and Observe the TypeError ---
# The check happens here, at the moment of instantiation.
print("Attempting to create an incomplete object...")
try:
    # This line will fail because the contract is broken.
    python_course = ProgrammingCourse("Python 101")
except TypeError as e:
    print(f"\nInstantiation FAILED as expected.")
    print(f"Error: {e}")

# Example of a COMPLETE implementation that works
class HistoryCourse(Course):
    def grade_assignment(self, student, score):
        print(f"Grading {student}'s assignment for {self.title} with a score of {score}.")

print("\nAttempting to create a complete object...")
history_course = HistoryCourse("World History")
print("Instantiation SUCCEEDED.")
history_course.grade_assignment("Alice", 95)
```

## Implications & Impact

This guarantees that any object successfully created from a class that claims to implement the interface will fulfill its contract. It shifts error detection from a potential runtime `AttributeError` (when a method is called) to a definitive `TypeError` at instantiation, making code more robust and predictable.

## Key Connections

- The concept of `[[Python - Formal Interfaces|formal interfaces]]` is entirely built upon this enforcement mechanism.
- This strict, upfront validation `contrasts sharply with` the runtime, 'ask for forgiveness' approach of `[[Python - Duck Typing|duck typing]]`.
- The enforcement check specifically looks for missing implementations of methods marked as `[[Python - Abstract Methods 1|abstract methods]]`.
- This mechanism is the key differentiator when comparing `[[Python - Interfaces vs Abstract Base Classes|interfaces and abstract base classes]]` against informal, convention-based approaches.

## Deeper Questions

- Your team is building a plugin system where third-party developers will submit components. Would you enforce a strict formal interface or rely on an informal, duck-typed one? Justify your choice in terms of developer onboarding friction versus long-term system stability and support costs.
- Imagine a large, distributed system where different services communicate via objects that are supposed to adhere to a shared interface. How would the `TypeError` enforcement of formal interfaces help or hinder the independent deployment and versioning of these services?
- What if Python's `abc` module only issued a `Warning` instead of raising a `TypeError` for unimplemented abstract methods? What new categories of bugs would emerge, and what coding patterns would developers adopt to compensate?