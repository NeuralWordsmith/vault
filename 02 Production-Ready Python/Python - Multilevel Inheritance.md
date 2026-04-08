---
tags: 
  - core
  - python
  - inheritance
  - oop
  - class hierarchy
  - code reuse
  - specialization
  - concept
source: 
  - "[[Intermediate Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Inheritance & The 'is-a' Relationship]]"
  - "[[Python - Multiple Inheritance]]"
  - "[[Python - Method Resolution Order (MRO)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - super()]]"
  - "[[Python - Method Overriding]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Python - Objects]]"
  - "[[Python - Class Methods]]"
  - "[[Python - Polymorphism]]"
  - "[[Python - Encapsulation]]"
  - "[[Python - Abstraction]]"
---
# Core: Multilevel Inheritance

## Summary

>Multilevel inheritance is a type of inheritance in Object-Oriented Programming where a class inherits from a parent class, which itself inherits from a grandparent class. This creates a linear chain of inheritance, such as `Grandchild -> Parent -> Grandparent`. It's a direct application of the [[Python - Inheritance & The 'is-a' Relationship|'is-a' relationship]] in a layered fashion, contrasting with [[Python - Multiple Inheritance|multiple inheritance]] where a class can inherit from several unrelated parents.

**Why This Matters:** It allows for the creation of highly specialized classes by building upon existing layers of abstraction, promoting code reuse and logical hierarchies in complex software.

_Analogy:_ _Think of family generations. A 'Grandparent' class has certain core traits (like having a name). A 'Parent' class inherits all the Grandparent's traits and adds its own (like having a job). Finally, a 'Child' class inherits all the traits from the Parent (including the ones from the Grandparent) and adds its own unique traits (like having a specific managerial role). The Child has access to the traits of all its ancestors in the direct line._

*   **Where it breaks down:** In biology, a child inherits traits directly from two parents, and the influence of grandparents is genetically mixed. In Python's multilevel inheritance, a 'grandchild' class only inherits directly from its one immediate 'parent'. It gains access to the 'grandparent's' features *through* the parent, following a strict, linear path defined by the [[Python - Method Resolution Order (MRO)|Method Resolution Order]].

```
      [Person]
         ▲
         │ (inherits from)
      [Employee]
         ▲
         │ (inherits from)
      [Manager]
```

## Details

Multilevel inheritance is a fundamental concept in Python's Object-Oriented Programming (OOP) that establishes a linear chain of inheritance. Instead of a class inheriting from multiple parents, it inherits from a single parent that is itself a child of another class. This creates a 'grandchild' class that inherits features from both its immediate parent and its 'grandparent' class, allowing for incremental specialization. A classic example is a `Manager` class inheriting from an `Employee` class, which in turn inherits from a `Person` class.

#### Primary Goal

To model hierarchical, layered relationships where classes become progressively more specialized by building upon a single ancestral line, maximizing code reuse.

#### Mechanism

- **Step 1: Define the Grandparent Class**
    - Create the most general, base class. This class contains attributes and methods that are common to all subsequent classes in the chain. For example, a `Person` class with a name.
- **Step 2: Define the Parent Class**
    - Create an intermediate class that inherits from the grandparent. This class adds more specific functionality. For example, an `Employee` class inherits from `Person` and adds a job title.
- **Step 3: Define the Grandchild Class**
    - Create the most specialized class, which inherits from the parent. This class gains all features from the parent and grandparent and can add its own. For example, a `Manager` class inherits from `Employee` and adds the ability to manage a team.
- **Step 4: Instantiate and Use**
    - Create an object of the grandchild class. This object can now access methods and attributes from all three levels of the hierarchy, demonstrating the flow of inherited features.

##### Code Translation

```python
# --- Step 1: Define the Grandparent Class ---
class Person:
    def __init__(self, name):
        self.name = name

    def introduce(self):
        print(f"Hello, my name is {self.name}")

# --- Step 2: Define the Parent Class ---
class Employee(Person):  # Inherits from Person
    def __init__(self, name, title):
        super().__init__(name)  # Initialize the Person part of the object
        self.title = title

    def change_position(self, new_title):
        self.title = new_title
        print(f"My new role is {self.title}")

# --- Step 3: Define the Grandchild Class ---
class Manager(Employee):  # Inherits from Employee
    def __init__(self, name, title, team_size):
        super().__init__(name, title)  # Initialize the Employee part
        self.team_size = team_size

    def delegate_task(self):
        print(f"As a {self.title}, I am delegating tasks to my team of {self.team_size}.")

# --- Step 4: Instantiate and Use ---
# Create an instance of the most specialized class
mgr = Manager("Alice", "Engineering Manager", 10)

# Access method from Grandparent (Person)
mgr.introduce()  # Output: Hello, my name is Alice

# Access method from Parent (Employee)
mgr.change_position("Director of Engineering") # Output: My new role is Director of Engineering

# Access method from Grandchild (Manager)
mgr.delegate_task() # Output: As a Director of Engineering, I am delegating tasks to my team of 10.
```

 [[Code - Multilevel Inheritance Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Depth of Hierarchy**
    - This refers to the number of levels in the inheritance chain. Deeper hierarchies can model more complex, granular relationships but increase coupling and can become harder to debug and maintain.
- **Method Overriding**
    - A child or grandchild class can provide a specific implementation of a method that is already defined in one of its ancestors. This allows for specialized behavior while maintaining a consistent interface.
- **Use of `super()`**
    - The `super()` function is crucial for ensuring that the `__init__` methods (and other methods) of the parent and grandparent classes are called correctly. This guarantees that the object is properly constructed at each level of the hierarchy.

#### Core Trade-offs

- **Pro: Logical Structure**
    - It clearly models real-world hierarchical relationships where concepts are naturally layered (e.g., a `Manager` *is an* `Employee`, which *is a* `Person`).
- **Pro: Code Reusability**
    - Follows the [[SWE - DRY (Don't Repeat Yourself) Principle|DRY principle]] by allowing specialized classes to reuse common functionality from a single, well-defined ancestral line.
- **Con: Tight Coupling**
    - The grandchild class becomes dependent on the implementation details of its entire ancestry. A change in the grandparent class can have unintended ripple effects all the way down the chain, making the system fragile.
- **Con: Increased Complexity**
    - Very deep inheritance chains can become difficult to reason about, understand, and debug. Tracing a method call requires understanding the entire [[Python - Method Resolution Order (MRO)|MRO]], which can be non-trivial in complex hierarchies.

## Connections

```
                      (Parent)
    Inheritance & The 'is-a' Relationship
                           ▲
                           │
           ┌───────────────┼────────────────────────────┐
           │               │                            │
(Contrasts With)  ┌───────────────────────────┐     (Governed By)
Multiple Inheritance  │  Multilevel Inheritance   │     Method Resolution Order (MRO)
                      └───────────────────────────┘
```

### Parent Concept

It is a specific implementation of the general principle of [[Python - Inheritance & The 'is-a' Relationship|inheritance]], which allows one class to acquire the properties and methods of another.

### Child Concepts



### Related Concepts 

- It contrasts with [[Python - Multiple Inheritance|multiple inheritance]], where a class can inherit from two or more unrelated parent classes simultaneously.
- The order in which methods are resolved in a multilevel chain is determined by the [[Python - Method Resolution Order (MRO)|Method Resolution Order (MRO)]].
## Questions

- You're designing a system for a retail company. You could model products with a deep multilevel inheritance chain (`Product` -> `Apparel` -> `Shirt` -> `T-Shirt`). What are the long-term maintenance costs of this deep hierarchy versus a flatter design, and how would you justify the more complex design to a project manager concerned with development speed?
- If a critical bug is found in a method within the top-level 'grandparent' class of a five-level inheritance chain, what steps would you take to test and deploy the fix to ensure you don't introduce breaking changes in any of the dozens of specialized grandchild classes in production?
- What if Python's `super()` function could only call the immediate parent's method but couldn't chain calls further up the hierarchy? How would you redesign the initialization of a grandchild class like `Manager` to ensure all attributes from `Person` and `Employee` are correctly set?