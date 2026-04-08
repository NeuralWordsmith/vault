---
tags: 
  - core
  - python
  - inheritance
  - superclass
  - subclass
  - base_class
  - derived_class
  - concept
source: 
  - "[[Introduction to Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Class Inheritance]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Code Reuse in OOP]]"
  - "[[Python - Inheritance Syntax]]"
  - "[[Python - isinstance() with Inheritance]]"
  - "[[Python - BankAccount Inheritance Example]]"
  - "[[Python - Inheritance & Polymorphism Relationship]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Objects]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Python - Method Overriding]]"
  - "[[Python - super() Function]]"
  - "[[Python - Multiple Inheritance]]"
---
# Core: Parent and Child Classes

## Summary

>In the context of [[Python - Class Inheritance|class inheritance]], the terms 'Parent' and 'Child' provide the fundamental vocabulary to describe the relationship. The **Parent class** (also known as a superclass or base class) is the class that provides features to another class. The **Child class** (also known as a subclass or derived class) is the class that receives those features.

**Why This Matters:** This terminology establishes a clear, hierarchical relationship between classes, which is the foundation for building reusable and extensible code through inheritance.

_Analogy:_ _Think of a family's genetic traits. A **Parent** has a set of genetic traits (e.g., eye color, height potential). A **Child** inherits all of these traits from the parent automatically. The child can then use these traits as they are, or develop their own unique characteristics (e.g., learning a new skill) that the parent doesn't have._

**Where it breaks down:** In programming, a child class can inherit from multiple parent classes (multiple inheritance), which is not possible in biology. Furthermore, any new skills or modifications the 'child' class develops do not affect the 'parent' class in any way.

```
  [ Parent Class ]
  (e.g., Employee)
        │
        │ inherits from
        ▼
  [ Child Class ]
  (e.g., Manager)
```

## Details

In Object-Oriented Programming, 'Parent' and 'Child' are not just labels but define a specific, one-way flow of features and functionality. The Parent class serves as a general blueprint, containing common attributes and methods. The Child class inherits this blueprint, gaining all its capabilities, and can then specialize by adding new features or modifying (overriding) existing ones. This directional relationship is the core mechanism for achieving [[Python - Code Reuse in OOP|code reuse]] and creating logical hierarchies in software.

#### Primary Goal

To provide a clear and intuitive vocabulary for describing the directional relationship in class inheritance, where one class provides functionality to another.

#### Mechanism

- **How it Works:**
    1. A Parent class is defined with a set of attributes and methods that represent a general concept.
    2. A Child class is then defined, and through a specific [[Python - Inheritance Syntax|syntax]], it is declared to inherit from the Parent.
    3. The Child class automatically, without any extra code, gains access to all the non-private methods and attributes of the Parent class.
    4. The Child class can then be extended with its own unique methods and attributes or can provide its own implementation for a method that already exists in the Parent (a concept called method overriding).
- **Parent Class (Superclass/Base Class):**
    - The class that is being inherited *from*.
    - It typically represents a more general or abstract concept.
    - *Example: `Vehicle` is a general concept that can be a parent class.*
- **Child Class (Subclass/Derived Class):**
    - The class that inherits *from* another class.
    - It typically represents a more specific or specialized version of the parent.
    - *Example: `Car` and `Bicycle` can be child classes that inherit from `Vehicle`, each adding their own specific details like `number_of_doors` or `has_pedals`.*

##### Code Translation

```python
# --- Parent Class (Superclass) ---
# This is the general blueprint.
class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def get_details(self):
        return f"Name: {self.name}, Salary: ${self.salary}"

# --- Child Class (Subclass) ---
# It inherits from Employee using the syntax: class Manager(Employee)
# This establishes the parent-child relationship.
class Manager(Employee):
    # The Manager class adds its own specific functionality
    def assign_task(self, task):
        return f"{self.name} (Manager) assigned task: {task}"

# --- Usage ---
# A regular employee object
emp = Employee("Alice", 60000)
print(emp.get_details())

# A manager object
mgr = Manager("Bob", 90000)
# The manager can use the get_details() method inherited from the Parent
print(mgr.get_details())
# The manager can also use its own specific method
print(mgr.assign_task("Review quarterly report"))
```

 [[Code - Parent and Child Classes Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Declaration Syntax:** The parent-child relationship is not controlled by parameters but is established at the time of class definition.
    - The specific [[Python - Inheritance Syntax|syntax]] `class ChildClassName(ParentClassName):` is what creates the link. The name inside the parentheses dictates the Parent.

#### Core Trade-offs

- **Benefit (Logical Structure):** This model creates a clear and logical hierarchy of concepts, making codebases easier to understand and reason about (e.g., a `Poodle` *is a* `Dog`, which *is an* `Animal`).
- **Benefit (Code Reusability):** It is the primary mechanism for achieving the [[SWE - DRY (Don't Repeat Yourself) Principle|DRY principle]] in OOP, as common logic is written once in the parent and reused by all children.
- **Risk (Tight Coupling):** A child class is tightly coupled to its parent's implementation. A change in the parent class (e.g., renaming a method, changing its arguments) can break all of its child classes, leading to fragile code if not managed carefully.

## Connections

```
                      (Parent)
                 Class Inheritance
                         ▲
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                    │
(Mechanism)     ┌───────────────────────────┐     (Concept)
Inheritance Syntax│  Parent and Child Classes │  Code Reuse in OOP
                  └───────────────────────────┘
                         │
                         ▼
                      (Example)
             BankAccount Inheritance Example
```

### Parent Concept

The concept of Parent and Child classes is the fundamental terminology used to describe the mechanism of [[Python - Class Inheritance|class inheritance]].

### Child Concepts



### Related Concepts 

- The relationship between parent and child is defined using a specific [[Python - Inheritance Syntax|inheritance syntax]] in the class definition.
- This parent-child structure is the primary mechanism for achieving [[Python - Code Reuse in OOP|code reuse in object-oriented programming]].
- The [[Python - isinstance() with Inheritance|isinstance() function]] can be used to verify if an object is an instance of a child class or any of its parent classes.
- The relationship between parent and child classes is a prerequisite for understanding the powerful concept of [[Python - Inheritance & Polymorphism Relationship|polymorphism]].
- A real-world application of this terminology can be seen in the [[Python - BankAccount Inheritance Example|BankAccount inheritance example]], where `SavingsAccount` is a child of the `BankAccount` parent.
## Questions

- You're designing a system with a deep inheritance hierarchy (e.g., a Parent class with children, which in turn have their own children). What is the business risk of making a change to the top-level Parent class, and how would you mitigate this risk while still allowing for future feature extensions?
- In a large codebase with hundreds of classes, how would you design a system or use tooling to visualize the parent-child inheritance trees to quickly identify dependencies and potential impacts of a change in a core base class?
- What if Python only allowed 'composition' (building classes by including instances of other classes) and completely forbade the parent-child inheritance model? What common OOP patterns would become impossible or significantly more complex to implement?