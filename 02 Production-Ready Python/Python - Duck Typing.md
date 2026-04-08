---
tags: 
  - core
  - python
  - polymorphism
  - dynamic_typing
  - eafp
  - informal_interface
  - behavioral_typing
  - concept
source: 
  - "[[Intermediate Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Interfaces]]"
  - "[[Python - Informal Interfaces]]"
  - "[[Python - Formal Interfaces]]"
  - "[[Python - Abstract Methods 1]]"
  - "[[Python - Interfaces vs Abstract Base Classes]]"
  - "[[Python - Polymorphism]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Iteration]]"
  - "[[Python - Context Managers]]"
  - "[[SWE - Liskov Substitution Principle]]"
  - "[[Python - Error Handling]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Functions]]"
  - "[[Python - Decorators]]"
---
# Core: Duck Typing

## Summary

>Duck typing is a programming concept common in dynamically-typed languages like Python, summarized by the phrase: "If it walks like a duck and it quacks like a duck, then it must be a duck." In practice, this means an object's suitability for an operation is determined by the presence of certain methods and properties (its behavior), not by its inheritance from a particular class (its type). This is the core principle that enables [[Python - Informal Interfaces]], where a class implicitly satisfies a contract simply by implementing the required methods, without any formal declaration.

**Why This Matters:** Duck typing enables highly flexible and decoupled code by focusing on an object's behavior rather than its explicit type, making it easier to substitute objects and write more generic functions.

_Analogy:_ _Think of a USB port on a computer. The port doesn't care if you plug in a keyboard, a mouse, a flash drive, or a desk fan. As long as the device has a standard USB-A connector (the 'interface'), the port will accept it and provide power. The computer doesn't check the 'type' of the device (e.g., 'Is this a `Keyboard` class object?'). It only cares that the device 'acts' like a USB device by having the correct physical plug._

  - **Computer's USB Port:** A function or method that expects an object with a certain behavior.
  - **USB-A Connector:** The required methods or attributes (the 'interface,' like `assign_homework()` and `grade_assignment()`).
  - **Keyboard, Mouse, Flash Drive:** Different classes (`ProgrammingCourse`, `ArtCourse`, etc.) that all implement the required methods.
  - **Where it breaks down:** The analogy implies a physical, standardized plug. In duck typing, the 'interface' is often implicit and unstated, as seen in [[Python - Informal Interfaces]]. A USB port provides a clear, enforced contract, whereas duck typing relies on convention and documentation, which can lead to runtime errors if an object is passed that *looks* right but behaves unexpectedly. This is a key difference from [[Python - Formal Interfaces]], which provide a more explicit, verifiable contract.

```
    [Object] ----> | Function(obj) | ----> Does obj have .method()?
                       /        \
                      /          \
                    YES           NO
                     |            |
                  obj.method()   AttributeError
```

## Details

Duck typing is a fundamental concept in Python's approach to object-oriented programming. It's a form of polymorphism where the type or class of an object is less important than the methods it defines. When you use duck typing, you are not concerned with what an object *is*, but rather with what it *can do*. The provided example of `ProgrammingCourse` implicitly conforming to the 'interface' suggested by the `Course` class (even without inheriting from it) is a perfect illustration of this principle in action, forming the basis for [[Python - Informal Interfaces]].

#### Primary Goal

To increase flexibility and reduce coupling between components by allowing any object that exhibits the right behavior to be used in a given context, regardless of its actual class hierarchy.

#### Mechanism

- **How it Works (Easier to Ask for Forgiveness than Permission - EAFP):**
    1. A function is written to operate on an object, expecting it to have certain methods (e.g., a `.quack()` and `.fly()` method).
    2. When the function is called, it does **not** perform a type check like `isinstance(obj, Duck)`.
    3. Instead, it directly **attempts** to call the required methods on the object (e.g., `obj.quack()`).
    4. If the object has the method, the code runs successfully.
    5. If the object lacks the method, a runtime error (typically an `AttributeError`) is raised, which can be handled with a `try...except` block.
- **Example from Context:**
    - The `ProgrammingCourse` class is considered to 'act like' a `Course` because it implements `assign_homework()` and `grade_assignment()`.
    - A function designed to work with any 'Course-like' object could be given a `ProgrammingCourse` instance and it would work perfectly, without `ProgrammingCourse` ever needing to inherit from `Course`.

##### Code Translation

```python
# --- Step 1: Define two different classes with the same method names ---
# These classes are completely unrelated by inheritance.
class ProgrammingCourse:
    def __init__(self, name):
        self.name = name

    def assign_homework(self, due_date):
        print(f"New programming assignment for {self.name} due on {due_date}.")

    def grade_assignment(self, assignment_number):
        print(f"Grading programming assignment #{assignment_number} for {self.name}.")

class HistoryCourse:
    def __init__(self, topic):
        self.topic = topic

    def assign_homework(self, due_date):
        print(f"New reading assignment for {self.topic} history due on {due_date}.")

    def grade_assignment(self, assignment_number):
        print(f"Grading essay #{assignment_number} for {self.topic} history.")

# --- Step 2: Create a function that relies on behavior, not type ---
# This function doesn't care if the object is a ProgrammingCourse or a HistoryCourse.
# It only cares that the object can .assign_homework() and .grade_assignment().
def manage_course_work(course):
    print("--- Managing course --- ")
    course.assign_homework("2026-03-15")
    course.grade_assignment(3)
    print("\n")

# --- Step 3: Use the function with instances of different types ---
python_course = ProgrammingCourse("CS101")
history_course = HistoryCourse("World War II")

# The function works for both because they both 'act like a duck' (i.e., have the required methods)
manage_course_work(python_course)
manage_course_work(history_course)

# --- Output ---
# --- Managing course --- 
# New programming assignment for CS101 due on 2026-03-15.
# Grading programming assignment #3 for CS101.
#
# --- Managing course --- 
# New reading assignment for World War II history due on 2026-03-15.
# Grading essay #3 for World War II history.
```

 [[Code - Duck Typing Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Implicit Contracts:**
    - The 'interface' an object is expected to fulfill is defined by documentation (e.g., docstrings) and convention, not by a formal, machine-checkable declaration. This places a high premium on clear communication.
- **Runtime Error Handling:**
    - Because type checking is deferred to runtime, robust error handling (e.g., `try...except AttributeError`) is crucial for gracefully managing objects that do not conform to the expected interface.

#### Core Trade-offs

- **Pro: Flexibility & Decoupling:**
    - Code is not tied to specific class implementations. You can easily substitute new objects that provide the required behavior without changing the calling code.
- **Pro: Simplicity:**
    - Avoids the need for complex inheritance hierarchies and explicit interface declarations, often leading to cleaner, more readable code.
- **Con: Lack of Static Guarantees:**
    - Errors, such as a missing method or incorrect method signature, are only caught at runtime. This can make large codebases harder to refactor and debug. This is a key area where [[Python - Formal Interfaces]] using Abstract Base Classes offer a significant advantage.
- **Con: Readability & Discoverability:**
    - It can be difficult for a developer to understand what 'shape' of object a function expects without reading its source code or relying on excellent documentation. IDEs may also struggle to provide accurate autocompletion and type analysis.

## Connections

```
                      (Parent)
        Object-Oriented Programming
                       ▲
                       │
    ┌──────────────────┼──────────────────┐
    │                  │                  │
(Contrasts With)  ┌─────────────┐  (Principle Behind)
Formal Interfaces │ Duck Typing │  Informal Interfaces
                  └─────────────┘
```

### Parent Concept

Duck typing is a core principle within [[Python - Object-Oriented Programming (OOP)]] that defines Python's dynamic approach to polymorphism.

### Child Concepts



### Related Concepts 

- It is the fundamental principle that enables [[Python - Informal Interfaces]], where conformance is determined by behavior rather than inheritance.
- This approach contrasts sharply with [[Python - Formal Interfaces]], which use Abstract Base Classes to explicitly define and enforce contracts at class registration time.
- The concept is a practical application of polymorphism, allowing a single function to operate on objects of different classes.
## Questions

- Your team is building a plugin system where third-party developers can submit their own data processors. Would you rely on duck typing (requiring them to implement specific methods like `.process()`) or enforce a [[Python - Formal Interfaces|formal interface]] with an ABC? Justify your choice in terms of developer experience, system robustness, and long-term maintenance costs.
- Imagine a large, distributed system where microservices communicate by passing serialized objects. How does duck typing complicate or simplify this architecture? What specific runtime validation strategies would you need to implement at the service boundaries to prevent malformed 'duck-typed' objects from causing cascading failures?
- What if Python's core data model were changed to be strictly nominal (type-based) instead of structural (behavior-based)? Which common Python idioms and popular libraries (like `pandas` or `requests`) would fundamentally break or need a complete redesign, and why?