---
tags: 
  - major_core
  - python
  - oop
  - inheritance
  - code_reuse
  - diamond_problem
  - mro
  - concept
source: 
  - "[[Intermediate Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Inheritance & The 'is-a' Relationship]]"
  - "[[Python - Multilevel Inheritance]]"
  - "[[Python - Method Resolution Order (MRO)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - super()]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Python - Polymorphism]]"
  - "[[Python - Encapsulation]]"
  - "[[Python - Abstraction]]"
  - "[[Python - Class Methods]]"
---
# Major Core: Multiple Inheritance

## Summary

> Multiple inheritance is a feature of object-oriented programming where a class can inherit attributes and methods from more than one parent class. This allows for the creation of highly specialized child classes that combine the functionalities of their parents. For example, an `Intern` class can be both an `Employee` and a `Student`. This pattern is more complex than [[Python - Multilevel Inheritance|multilevel inheritance]] and can introduce challenges like method name collisions, which Python resolves using a specific algorithm called the [[Python - Method Resolution Order (MRO)|Method Resolution Order (MRO)]].

**Why This Matters:** It allows developers to model complex, real-world relationships where an object is a type of several different things, promoting significant code reuse and reducing redundancy.

_Analogy:_ _Think of multiple inheritance like a modern smartphone. A smartphone isn't just a phone; it inherits the functionality of a 'Camera' parent, a 'GPS Navigator' parent, and a 'Music Player' parent. The final 'Smartphone' class is a single device that can perform the distinct functions of all its parents._

  - **Child Class (Smartphone):** The final, specialized class that combines functionalities.
  - **Parent Classes (Camera, GPS, Music Player):** The individual, single-purpose classes that provide specific features.
  - **Inherited Methods (take_photo(), get_directions(), play_song()):** The specific functionalities that the Smartphone gets from its parents.
  - **Where it breaks down:** The analogy doesn't fully capture the 'Diamond Problem,' where two parent classes might inherit from the same 'grandparent' (e.g., both Camera and GPS use a 'PowerSource' component), creating ambiguity. Python has a clear system (MRO) to resolve this, whereas in a physical device, the components are simply integrated.

```
  [ Employee ]      [ Student ]
       \              /
        \            /
         \          /
         [  Intern  ]
```

## Details

In [[Python - Object-Oriented Programming (OOP)|Object-Oriented Programming]], multiple inheritance allows a class to be a direct specialization of more than one base class. This enables it to acquire and combine the distinct sets of behaviors and attributes from all its parents. The provided example of an `Intern` class inheriting from both `Employee` and `Student` perfectly illustrates this, as an intern embodies the characteristics of both roles simultaneously.

#### Primary Goal

To combine the features and behaviors of multiple existing classes into a single, more specialized class, thereby maximizing code reuse and creating a more accurate model of complex relationships.

#### Mechanism

- **Step 1: Define the Parent Classes**
    - Create two or more independent base classes. Each class should encapsulate a distinct set of attributes and methods. For our example, these are `Employee` and `Student`.
- **Step 2: Define the Child Class**
    - Create the new class, listing all parent classes in its definition, separated by commas. The order is important as it influences the [[Python - Method Resolution Order (MRO)|Method Resolution Order]].
- **Step 3: Initialize All Parents**
    - In the child class's `__init__` method, it's crucial to explicitly call the `__init__` method for *each* parent class to ensure all their specific attributes are properly set up.
- **Step 4: Access Combined Functionality**
    - Once an instance of the child class is created, it can seamlessly access the methods and attributes from all of its parents as if they were its own.

```python
# --- Step 1: Define the Parent Classes ---
class Employee:
    def __init__(self, department):
        self.department = department

    def begin_job(self):
        print(f"Welcome to {self.department}!")

class Student:
    def __init__(self, school):
        self.school = school
        self.courses = []

    def add_course(self, course_name):
        self.courses.append(course_name)
        print(f"{course_name} added to courses at {self.school}.")

# --- Step 2: Define the Child Class ---
class Intern(Employee, Student):
    # --- Step 3: Initialize All Parents ---
    def __init__(self, department, school):
        Employee.__init__(self, department)
        Student.__init__(self, school)

# --- Step 4: Access Combined Functionality ---
# Create an instance of the Intern class
intern_jane = Intern("Engineering", "State University")

# Access method from Employee parent
intern_jane.begin_job()  # Output: Welcome to Engineering!

# Access method from Student parent
intern_jane.add_course("Data Structures") # Output: Data Structures added to courses at State University.

# Access attributes from both parents
print(f"Jane's department: {intern_jane.department}")
print(f"Jane's courses: {intern_jane.courses}")
```

 [[Code - Multiple Inheritance Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Order of Parent Classes**
    - The sequence in which parent classes are listed in the child's definition—e.g., `class Intern(Employee, Student):` vs. `class Intern(Student, Employee):`—is critical. This order directly determines the [[Python - Method Resolution Order (MRO)|Method Resolution Order (MRO)]], which dictates the lookup path for attributes and methods. If both parents have a method with the same name, Python will use the one from the class that appears earlier in the list.

#### Core Trade-offs

- **Pro: Enhanced Code Reusability**
    - It is a powerful tool for adhering to the [[SWE - DRY (Don't Repeat Yourself) Principle|DRY principle]]. Functionality from multiple sources can be combined without rewriting code.
- **Pro: Richer Semantic Modeling**
    - Allows for the creation of classes that more accurately represent complex real-world objects that have multiple roles or types (e.g., an `AmphibiousVehicle` is both a `Car` and a `Boat`).
- **Con: The Diamond Problem**
    - This classic issue arises when a class inherits from two parents that both share a common ancestor. It creates ambiguity about which version of a method from the common ancestor to use. Python deterministically solves this with its C3 linearization algorithm, but the underlying complexity remains.
- **Con: Increased Complexity and Reduced Readability**
    - It can make the codebase harder to understand and debug. Tracing the origin of a method or attribute can be difficult, as it could come from any number of parent classes, requiring developers to understand the [[Python - Method Resolution Order (MRO)|MRO]].

## Connections

```
                      (Parent)
    Inheritance & The 'is-a' Relationship
                           ▲
                           │
           ┌───────────────┼────────────────────────────┐
           │               │                            │
(Contrasting Pattern)┌───────────────────────────┐ (Key Mechanism)
Multilevel Inheritance │   Multiple Inheritance    │ Method Resolution Order (MRO)
                       └───────────────────────────┘
```

### Parent Concept

This concept is a specific implementation of [[Python - Inheritance & The 'is-a' Relationship|inheritance]], which is a fundamental pillar of object-oriented programming.

### Child Concepts



### Related Concepts 

- It directly contrasts with [[Python - Multilevel Inheritance|multilevel inheritance]], where a class inherits from a single parent that in turn inherits from its own parent, forming a linear chain.
- The potential complexities of this pattern, such as method name collisions and the 'Diamond Problem,' are resolved in Python using the [[Python - Method Resolution Order (MRO)|Method Resolution Order (MRO)]].
- Multiple inheritance is a powerful feature within the broader paradigm of [[Python - Object-Oriented Programming (OOP)|Object-Oriented Programming (OOP)]] for creating flexible and reusable code.
## Questions

- Your team is building a system for a university. You could model a 'TeachingAssistant' using multiple inheritance from 'Student' and 'Employee'. Alternatively, you could use composition, where the 'TeachingAssistant' class *has* a student object and an employee object as attributes. When would you choose multiple inheritance, and how would you justify the potential increase in code complexity to your project manager?
- Imagine a large, legacy codebase with hundreds of classes where multiple inheritance is used extensively. How would you design a static analysis tool to automatically detect potential 'Diamond Problem' scenarios and visualize the Method Resolution Order for any given class to help new developers navigate the inheritance hierarchy?
- What if Python's MRO algorithm was changed from C3 linearization to a simple depth-first, left-to-right search? What specific, common multiple inheritance patterns (especially those involving `super()`) would break, and what new kinds of bugs would developers start encountering?
