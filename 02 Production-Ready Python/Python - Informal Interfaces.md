---
tags: 
  - major_core
  - python
  - duck_typing
  - implicit_interface
  - convention
  - polymorphism
  - contract
  - concept
source: 
  - "[[Intermediate Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Interfaces]]"
  - "[[Python - Duck Typing]]"
  - "[[Python - Formal Interfaces]]"
  - "[[Python - Abstract Methods 1]]"
  - "[[Python - Interfaces vs Abstract Base Classes]]"
  - "[[Python - Formal Interfaces & Contract Enforcement Relationship]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Polymorphism]]"
  - "[[Python - Inheritance]]"
  - "[[Python - Magic Methods]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Python - Decorators]]"
---
# Major Core: Informal Interfaces

## Summary

> An informal interface is a convention-based contract in Python where a class is expected to have certain methods and properties, but this contract is not programmatically enforced. It relies on the principle of [[Python - Duck Typing|duck typing]]—if an object provides the necessary methods, it's considered to fulfill the interface, regardless of its inheritance hierarchy. This stands in contrast to [[Python - Formal Interfaces]], which use tools like Abstract Base Classes to enforce the contract.

**Why This Matters:** Informal interfaces allow for rapid, flexible development by defining expected behavior through convention rather than strict inheritance, which is central to Python's dynamic nature.

_Analogy:_ _Think of an informal interface as a recipe. The recipe (the `Course` class) lists the required steps: 'mix ingredients' (`assign_homework`) and 'bake at 350 degrees' (`grade_assignment`). Any chef (the `ProgrammingCourse` class) can follow this recipe to make the cake. The chef doesn't need to be a graduate of the recipe author's culinary school (i.e., inherit from the `Course` class); they just need to know how to perform the specified actions. If they can mix and bake, they fulfill the 'contract' of the recipe._

**Where it breaks down:** In cooking, if you forget a step, the final dish will obviously fail. With informal interfaces in Python, the program only fails at the exact moment you try to execute the missing step (call the missing method). There is no 'master chef' checking your implementation before you start 'baking', which can lead to unexpected runtime errors.

```
      (Blueprint / Convention)
            ┌──────────┐
            │  Course  │
            │----------│
            │.assign() │
            │.grade()  │
            └──────────┘
                 ┆
      (No Inheritance Link)
                 ┆
(Implementation Fulfills Contract)
        ┌───────────────────┐
        │ ProgrammingCourse │
        │-------------------│
        │.assign()          │
        │.grade()           │
        └───────────────────┘
```

## Details

In Python's object-oriented programming, an informal interface is a class that defines a set of methods, often with empty bodies (using `pass`), to serve as a blueprint or guideline for other classes. This approach leverages [[Python - Duck Typing]], where the focus is on an object's behavior rather than its type. If a `ProgrammingCourse` object has the same methods as a `Course` blueprint, it can be used wherever a `Course` is expected, even without any formal inheritance relationship. This provides immense flexibility but sacrifices the compile-time safety found in more statically-typed languages.

#### Primary Goal

To establish a behavioral contract between objects based on convention and shared method names, promoting code flexibility and decoupling without forcing a strict inheritance structure.

#### Mechanism

- **How it Works:** The process relies on convention and Python's dynamic nature.
    1. **Define the Blueprint:** A class is created (e.g., `Course`) with method definitions that contain no logic, typically just the `pass` keyword. These methods, like `assign_homework()`, act as placeholders. They define the expected 'shape' of any class that wants to conform to this interface. These are conceptually similar to [[Python - Abstract Methods 1|abstract methods]] but lack any formal enforcement mechanism.
    2. **Implement the Contract:** Another class (e.g., `ProgrammingCourse`) is created independently, without inheriting from the blueprint. It implements methods with the *exact same names and compatible signatures* as those in the blueprint class, but with actual logic.
    3. **Rely on Duck Typing:** At runtime, any function or code that expects a `Course`-like object can be given a `ProgrammingCourse` object. As long as the methods being called (e.g., `.assign_homework()`) exist on the `ProgrammingCourse` object, the code will execute successfully. The check is based on behavior ('if it walks and quacks like a duck...'), not on a formal type relationship.

```python
# --- Step 1: Define the Blueprint (Informal Interface) ---
# The Course class defines a contract: any object that is a 'Course'
# should have these two methods.
class Course:
    def assign_homework(self, assignment_number, due_date):
        # Typically, the pass keyword will be used when creating an interface
        pass

    def grade_assignment(self, assignment_number):
        pass

# --- Step 2: Implement the Contract ---
# The ProgrammingCourse class fulfills the contract by defining the same methods.
# It does NOT inherit from Course.
class ProgrammingCourse:
    def __init__(self, course_name):
        self.course_name = course_name

    def assign_homework(self, due_date):
        # Some implementation of assign_homework here...
        print(f"Assigning homework for {self.course_name} due on {due_date}.")

    def grade_assignment(self, assignment_number):
        # Some implementation of grade_assignment here...
        print(f"Grading assignment #{assignment_number} for {self.course_name}.")

# --- Step 3: Rely on Duck Typing ---
# This function expects any object that 'looks like' a Course.
def manage_course(course_object):
    course_object.assign_homework(due_date="2026-03-15")
    course_object.grade_assignment(assignment_number=1)

# Create an instance of the implementing class
python_course = ProgrammingCourse("Intro to Python")

# Pass it to the function. It works because python_course has the required methods.
manage_course(python_course)
```

 [[Code - Informal Interfaces Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Contract Elements:** The 'parameters' of an informal interface are the elements that define its contract, which are checked only at runtime.
    - **Method Names:** The exact spelling of the method names (e.g., `assign_homework`) is the primary part of the contract. A typo will result in an `AttributeError` when the method is called.
    - **Method Signatures:** The number, order, and names of a method's parameters are also implicitly part of the contract. Providing the wrong number of arguments will raise a `TypeError` at runtime.

#### Core Trade-offs

- **Pro: Flexibility and Decoupling**
    - Classes do not need to be tied together through a rigid inheritance hierarchy. This makes it easy to substitute objects with similar behavior and promotes a loosely coupled system design.
- **Con: Lack of Enforcement**
    - The contract is purely a convention and is not checked until a method is actually called. A typo in a method name or a missing method will only be discovered when that specific code path is executed, leading to potential runtime errors. This is the core issue addressed by the [[Python - Formal Interfaces & Contract Enforcement Relationship|relationship between formal interfaces and enforcement]].
- **Con: Poor Discoverability and Readability**
    - It is not immediately obvious from a class's definition that it is intended to implement a specific informal interface. This understanding relies heavily on documentation, naming conventions, or reading the code that uses the class.

## Connections

```
                  (Parent)
                 Interfaces
                     ▲
                     │
     ┌───────────────┼────────────────────────────┐
     │               │                            │
(Contrast)    ┌───────────────────────────┐     (Mechanism)
Formal Interfaces │    Informal Interfaces    │     Duck Typing
                  └───────────────────────────┘
```

### Parent Concept

This concept is a specific type of [[Python - Interfaces|interface]], which defines a contract for what methods a class should implement.

### Child Concepts



### Related Concepts 

- The core mechanism that enables informal interfaces is [[Python - Duck Typing|duck typing]], where an object's suitability is determined by its methods and properties rather than its explicit type.
- Informal interfaces stand in direct contrast to [[Python - Formal Interfaces|formal interfaces]], which use mechanisms like Abstract Base Classes to enforce the contract at class creation time.
- The methods defined in an informal interface, like `assign_homework()`, serve a similar purpose to [[Python - Abstract Methods 1|abstract methods]] but lack the formal requirement for implementation.
- The choice between these two approaches is a key consideration when comparing [[Python - Interfaces vs Abstract Base Classes|interfaces and ABCs]] for designing robust software.
## Questions

- Your team is building a plugin system where third-party developers can contribute new modules. Would you recommend using informal or formal interfaces for the plugin API? Justify your choice in terms of developer experience, system stability, and long-term maintenance costs.
- In a large, distributed microservices architecture, one service expects objects conforming to a specific informal interface from another service. How would you design a robust contract testing strategy to prevent runtime errors due to one service changing its object structure without the other's knowledge?
- What if Python's `hasattr()` function was suddenly 100x slower, making runtime duck typing prohibitively expensive? What alternative patterns or language features would you use to achieve similar levels of flexibility and decoupling provided by informal interfaces?
