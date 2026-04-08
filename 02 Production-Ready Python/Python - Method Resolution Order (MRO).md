---
tags: 
  - core
  - python
  - mro
  - c3_linearization
  - multiple_inheritance
  - method_lookup
  - oop
  - concept
source: 
  - "[[Intermediate Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Multiple Inheritance]]"
  - "[[Python - Inheritance & The 'is-a' Relationship]]"
  - "[[Python - Multilevel Inheritance]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Class Methods]]"
  - "[[Python - super()]]"
  - "[[Python - Polymorphism]]"
  - "[[Python - Encapsulation]]"
  - "[[Python - Abstraction]]"
  - "[[Fundamental - Computer Science]]"
---
# Core: Method Resolution Order (MRO)

## Summary

>Method Resolution Order (MRO) is the deterministic sequence in which Python searches a class's hierarchy to find a method or attribute. This becomes critically important in scenarios involving [[Python - Multiple Inheritance]], where a child class may inherit from multiple parent classes that have methods with the same name. Python uses the C3 linearization algorithm to compute this order, ensuring there is only one logical path to follow.

**Why This Matters:** MRO prevents ambiguity and ensures predictable behavior in complex class hierarchies by defining a clear, deterministic path for Python to follow when looking up methods.

_Analogy:_ _Imagine you're looking for a specific family recipe for 'Apple Pie'. Your first stop is your own personal recipe box (the child class). If it's not there, you have a family rule: first, check your Mom's recipe book (the first parent class), and if it's not there, check your Grandma's book (the second parent class). This predefined search path—You -> Mom -> Grandma—is the Method Resolution Order. It's the explicit set of instructions you follow to find the right recipe without confusion._

Where this analogy breaks down: Unlike a simple family rule, Python's MRO is calculated by a sophisticated algorithm (C3 linearization) that can resolve very complex inheritance structures, like the 'diamond problem', which a simple 'check Mom then Grandma' rule couldn't handle. Python will refuse to create a class if a consistent, logical order cannot be determined.

```
Search Path for `Intern.check_email()`:

1. [Intern]   -> Method not found, look to parents.
      │
      ▼
2. [Employee] -> Method found! Execute `Employee.check_email()`.
      │
      ▼ (Search stops here)
3. [Student]
      │
      ▼
4. [object]
```

## Details

When a class inherits from multiple parents, a conflict can arise if those parents define methods with the same name. For instance, if an `Intern` class inherits from both `Employee` and `Student`, and both parent classes have a `check_email()` method, which one should the `Intern` use? Method Resolution Order (MRO) is Python's answer to this problem. It establishes a clear, predictable search path, or a 'linearization' of the class hierarchy. The two fundamental rules are that Python always searches the child class first, and then it searches the parent classes in the left-to-right order they were listed in the class definition.

#### Primary Goal

To establish a single, unambiguous, and predictable linear order for searching methods and attributes within a class's inheritance hierarchy, especially in the context of multiple inheritance.

#### Mechanism

- **Step 1: Define the Parent Classes**
    - Create two distinct parent classes, `Employee` and `Student`. Both will have a method with the identical name, `check_email`, but with different implementations to make the MRO's choice obvious.
- **Step 2: Define the Child Class with Multiple Inheritance**
    - Create a child class, `Intern`, that inherits from both `Employee` and `Student`. The order in which we list the parents (`Employee`, then `Student`) is the most critical factor in determining the MRO.
- **Step 3: Instantiate and Call the Ambiguous Method**
    - Create an instance of the `Intern` class and call the `check_email()` method. Based on the MRO, Python will execute the version from the first parent listed, `Employee`.
- **Step 4: Inspect the MRO Programmatically**
    - Use the built-in `.mro()` method or the `.__mro__` attribute on the `Intern` class to print the exact search path. This will confirm the order Python follows: `Intern` -> `Employee` -> `Student` -> `object`.

##### Code Translation

```python
# --- Step 1: Define the Parent Classes ---
class Employee:
    def check_email(self):
        print("Checking work email inbox...")

class Student:
    def check_email(self):
        print("Checking university email inbox...")

# --- Step 2: Define the Child Class with Multiple Inheritance ---
# The order here (Employee, Student) defines the MRO.
class Intern(Employee, Student):
    def onboard(self):
        print("Starting onboarding process.")

# --- Step 3: Instantiate and Call the Ambiguous Method ---
my_intern = Intern()

# This will call Employee.check_email because Employee is first in the MRO
my_intern.check_email() 
# Expected Output: Checking work email inbox...

# --- Step 4: Inspect the MRO Programmatically ---
print("\nMRO using .mro() method:")
print(Intern.mro())
# Expected Output: [<class '__main__.Intern'>, <class '__main__.Employee'>, <class '__main__.Student'>, <class 'object'>]

print("\nMRO using .__mro__ attribute:")
print(Intern.__mro__)
# Expected Output: (<class '__main__.Intern'>, <class '__main__.Employee'>, <class '__main__.Student'>, <class 'object'>)
```

 [[Code - Method Resolution Order (MRO) Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Order of Parent Classes in Definition**
    - This is the primary 'lever' you can pull. The left-to-right order of base classes in a class declaration directly dictates the MRO. Changing `class Intern(Employee, Student):` to `class Intern(Student, Employee):` would reverse the search order for the parents, causing `Student.check_email()` to be called instead.

#### Core Trade-offs

- **Pro: Predictability and Consistency**
    - The C3 linearization algorithm guarantees a single, non-ambiguous resolution order. This makes code behavior deterministic and prevents conflicts that could otherwise make [[Python - Multiple Inheritance]] unusable.
- **Con: Can Obscure Logic in Complex Hierarchies**
    - In very deep or wide inheritance structures (like the 'diamond problem'), the MRO can become non-intuitive. Developers might need to explicitly inspect the MRO to understand which method is being called, potentially hiding the flow of logic.
- **Con: Potential for `TypeError` on Class Creation**
    - If an inheritance hierarchy is constructed in a way that a consistent, linear MRO cannot be formed, Python will raise a `TypeError` when the class is defined, not when a method is called. This prevents the creation of logically inconsistent class structures.

## Connections

```
                      (Parent)
        Python - Object-Oriented Programming (OOP)
                         ▲
                         │
          ┌──────────────┼──────────────┐
          │              │              │
(Crucial For)   ┌───────────────────────────┐   (Extends)
Multiple        │ Method Resolution Order   │   Inheritance
Inheritance     │          (MRO)            │
                └───────────────────────────┘
```

### Parent Concept

MRO is a fundamental mechanism within [[Python - Object-Oriented Programming (OOP)]] that governs how method calls are resolved in class hierarchies.

### Child Concepts

- This concept is a specific mechanism and does not have distinct conceptual children; rather, it is the rulebook that governs other OOP concepts.

### Related Concepts 

- MRO is most critical when implementing [[Python - Multiple Inheritance]], as it resolves which parent's method to use in case of a name conflict.
- The concept is a direct extension of the basic [[Python - Inheritance & The 'is-a' Relationship]], defining the rules for more complex 'is-a' chains.
- Understanding MRO is essential for debugging method calls in [[Python - Multilevel Inheritance]] to trace the exact path of execution up the chain.
## Questions

- Imagine you're inheriting from two third-party libraries. Both provide a `connect()` method, but one is a fast, insecure connection and the other is a slow, secure one. How would you use your knowledge of MRO to ensure security by default, and how would you justify the potential performance hit to a product manager?
- In a large microservices architecture, a core 'service' class is inherited by hundreds of specific service implementations. If you need to override a method from a grandparent class deep in the MRO, what are the risks to the stability of the entire system, and what testing strategy would you implement to mitigate them?
- What if Python did not have a deterministic MRO and instead chose a parent's method at random in cases of conflict? What fundamental OOP principles would this violate, and what kind of chaotic bugs would you expect to see in large codebases?