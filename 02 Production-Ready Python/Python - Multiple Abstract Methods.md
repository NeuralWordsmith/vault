---
tags: 
  - core
  - python
  - abstract base class
  - interface
  - contract
  - polymorphism
  - multiple methods
  - concept
source: 
  - "[[Intermediate Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Abstract Base Classes (ABCs)]]"
  - "[[Python - Abstract Methods]]"
  - "[[Python - Concrete Methods in ABCs]]"
  - "[[Python - ABC Inheritance & TypeError Relationship]]"
  - "[[Python - Creating an Abstract Base Class]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Inheritance]]"
  - "[[Python - Polymorphism]]"
  - "[[Python - Decorators]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
---
# Core: Multiple Abstract Methods in ABCs

## Summary

>An Abstract Base Class (ABC) is not limited to a single abstract method; it can define a comprehensive "blueprint" by including multiple methods decorated with `@abstractmethod`. Any concrete subclass that inherits from this ABC is contractually obligated to provide a specific implementation for *every single one* of these abstract methods.

**Why This Matters:** Enforcing a multi-part contract ensures that all subclasses reliably provide a complete set of required behaviors, leading to more predictable and robust systems.

_Analogy:_ _Think of an ABC with multiple abstract methods as a building permit application. The application doesn't just have one required field; it has several mandatory sections you must complete: 'Structural Plans', 'Electrical Wiring Diagram', and 'Plumbing Layout'. You cannot get the permit (i.e., you cannot create a valid building/object) until you have provided concrete details for all these required sections. A single missing section makes the entire application invalid._

**Where it breaks down:** A building permit is a static document. In software, you might later decide to add a new mandatory section (like 'HVAC Plan') to the permit (the ABC). This would require going back and updating all existing approved buildings (subclasses), which isn't how real-world permits work.

```
```
+------------------+
|   School (ABC)   |
|------------------|
| @abstractmethod  |
|   enroll()       |
| @abstractmethod  |
|   add_course()   |
|------------------|
|   graduate()     |  <-- Concrete Method
+------------------+
        ▲
        | (Inherits From)
+------------------+
|   HighSchool     |
|------------------|
|   enroll()       |  <-- Implemented
|   add_course()   |  <-- Implemented
+------------------+
```
```

## Details

As the name suggests, an Abstract Base Class can establish a contract with more than just one rule. By decorating multiple methods with `@abstractmethod`, you create a more detailed blueprint that subclasses must follow. In the provided example, the `School` ABC defines two required behaviors: `enroll` and `add_course`. For the `HighSchool` class to be a valid, instantiable "School," it must provide concrete implementations for both of these methods, not just one. This mechanism is a core part of Python's approach to object-oriented programming, ensuring that related objects share a common, predictable interface.

#### Primary Goal

To define and enforce a more complex and complete interface (or contract) for a family of related classes, ensuring all subclasses implement a specific set of required functionalities.

#### Mechanism

- **Step 1: Define the ABC with Multiple Abstract Methods**
    - Create a class that inherits from `ABC`. Inside this class, define two or more methods. Decorate each method you want to make mandatory for subclasses with `@abstractmethod`. These methods typically have an empty body, like `pass`.
- **Step 2: Create a Concrete Subclass**
    - Define a new class that inherits from the ABC created in the previous step. For example, `class HighSchool(School):`.
- **Step 3: Implement All Abstract Methods**
    - Within the subclass, provide a concrete implementation (a method body with actual logic) for *every* method that was marked with `@abstractmethod` in the parent ABC. If even one is missing, Python will raise a `TypeError` when you try to create an instance of the subclass.

##### Code Translation

```python
from abc import ABC, abstractmethod

# --- Step 1: Define the ABC with Multiple Abstract Methods ---
class School(ABC):
    @abstractmethod
    def enroll(self):
        """A mandatory method for enrolling a student."""
        pass

    @abstractmethod
    def add_course(self, course_name):
        """A mandatory method for adding a course."""
        pass

    def graduate(self):
        """A concrete method shared by all subclasses."""
        print("Congrats on graduating!")

# --- Step 2 & 3: Create a Subclass and Implement All Abstract Methods ---
class HighSchool(School):
    def __init__(self):
        self.courses = []

    # Implementing the first abstract method
    def enroll(self):
        print("Welcome to high school!")

    # Implementing the second abstract method
    def add_course(self, course_name):
        self.courses.append(course_name)
        print(f"You enrolled in {course_name}")

# --- Verification ---
# This works because HighSchool implements ALL abstract methods
my_school = HighSchool()
my_school.enroll()
my_school.add_course("Algebra II")
my_school.graduate()
print(f"Current courses: {my_school.courses}")

# This would fail with a TypeError:
# class MiddleSchool(School):
#     def enroll(self):
#         print("Welcome to middle school!")
#     # Missing the add_course method!
#
# ms = MiddleSchool() # Raises TypeError: Can't instantiate abstract class MiddleSchool with abstract method add_course
```

 [[Code - Multiple Abstract Methods in ABCs Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Required Methods as 'Parameters'**
    - The primary 'levers' in this pattern are the abstract methods themselves. Adding or removing an abstract method from the base class directly changes the contract that all child classes must adhere to.

#### Core Trade-offs

- **Pro: Enforces a Strong, Detailed Contract**
    - By requiring multiple methods, you ensure that any object of a certain type (e.g., a 'School') is guaranteed to have a rich, predictable set of functionalities, which prevents runtime errors and makes the system easier to reason about.
- **Con: Increased Rigidity**
    - A highly detailed abstract contract can make the class hierarchy more rigid. If a new type of subclass emerges that genuinely doesn't need one of the abstract methods, it is still forced to provide a placeholder implementation (e.g., with `pass` or by raising `NotImplementedError`), which can be awkward.

## Connections

```
```
                     (Parent)
            Abstract Base Classes
                       ▲
                       │
┌──────────────────────┼──────────────────────┐
│                      │                      │
(Has)         ┌───────────────────────────┐      (Consequence of Violation)
Abstract Methods  │ Multiple Abstract Methods │      TypeError Relationship
                  └───────────────────────────┘

```
```

### Parent Concept

This concept is a direct application of [[Python - Abstract Base Classes (ABCs)|Abstract Base Classes]], which provide the foundational mechanism for defining such contracts.

### Child Concepts



### Related Concepts 

- The core building block of this concept is the [[Python - Abstract Methods|abstract method]], which is used multiple times to define the contract.
- This contrasts with [[Python - Concrete Methods in ABCs|concrete methods in ABCs]], which provide shared functionality that subclasses inherit directly without being required to implement them.
- The consequence of failing to implement all required methods is detailed in the [[Python - ABC Inheritance & TypeError Relationship|relationship between ABC inheritance and TypeErrors]].
- The overall framework for this pattern is established when [[Python - Creating an Abstract Base Class|creating an Abstract Base Class]] by inheriting from `ABC`.
## Questions

- When would enforcing a multi-method contract be too rigid for a rapidly evolving software project? How would you balance the need for a stable interface with the need for flexibility and rapid prototyping?
- Imagine a large system with dozens of classes inheriting from an ABC with five abstract methods. If you need to add a sixth mandatory method to the ABC, what is your strategy for updating all subclasses across the codebase without breaking production?
- What if Python allowed 'optional' abstract methods—methods that a subclass *could* implement for extra functionality but wasn't required to? How would that change the design philosophy of ABCs and when might it be useful?