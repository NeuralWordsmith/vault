---
tags: 
  - core
  - python
  - inheritance
  - oop
  - class_hierarchy
  - code_reuse
  - specialization
  - concept
source: 
  - "[[Software Engineering Principles in Python]]"
related: 
  - "[[Python - Class Inheritance]]"
  - "[[Python - Multiple Inheritance]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Core Principles of OOP]]"
  - "[[Python - super() Function 1]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Class Attributes]]"
  - "[[Python - Class Methods]]"
  - "[[Python - Method Overriding]]"
  - "[[Python - Abstract Base Classes (ABCs)]]"
  - "[[Python - Class Introspection]]"
  - "[[Python - dir() Function 1]]"
  - "[[Python - help() Function 2]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Python - Polymorphism]]"
---
# Core: Multilevel Inheritance

## Summary

>Multilevel inheritance is a type of inheritance in object-oriented programming where a class inherits from an already derived class, creating a "grandparent-parent-child" relationship. This forms a chain where features of the original base class and the intermediate derived class are both passed on to the new, most-derived class.

**Why This Matters:** Multilevel inheritance allows for the creation of highly specialized classes by building upon a layered hierarchy of functionality, promoting systematic code reuse and a logical, organized structure.

_Analogy:_ _Imagine a family of bakers. The grandparent (Grandma) has a secret recipe for a basic cake dough. The parent (Mom) inherits that recipe and adds her own special frosting technique. The child (You) then inherits both the dough recipe from Grandma and the frosting technique from Mom, and adds a unique flair for decorative piping. The final cake is a product of all three generations of expertise._

The analogy maps well: Grandma is the base class, Mom is the intermediate/child class, and You are the grandchild/derived class. Each generation adds a new skill (method) while retaining the old ones. **Where it breaks down:** In programming, a child class can completely override a parent's method (changing the frosting technique entirely), which is less common in family recipes. Also, a class can inherit from multiple unrelated "parents" ([[Python - Multiple Inheritance]]), which isn't possible in this biological analogy.

```
[Base Class: Organism]
       │
       ▼ (inherits from)
[Intermediate Class: Animal]
       │
       ▼ (inherits from)
[Derived Class: Dog]
```

## Details

Following the principles of [[Python - Class Inheritance|class inheritance]], multilevel inheritance takes it a step further. Instead of just a single parent-child relationship, we create a longer family tree. A child class, which has already inherited features from its parent, can itself become a parent to another class. This creates a chain of inheritance, where the "grandchild" class gains access to all the methods and attributes from both its immediate parent and its "grandparent" class. This is a powerful way to build increasingly specialized classes from more general ones.

#### Primary Goal

To model a hierarchical "is-a" relationship that extends over multiple levels, allowing for gradual specialization and maximizing code reuse.

#### Mechanism

- **Step 1: Define the Base (Grandparent) Class**
    - Create the most general class. This class has its own attributes and methods that will be passed down the entire chain.
- **Step 2: Define the Intermediate (Parent) Class**
    - Create a new class that inherits directly from the base class. It can use the base class's functionality and add its own new methods or override existing ones.
- **Step 3: Define the Derived (Grandchild) Class**
    - Create a third class that inherits from the intermediate class. This class now has access to the members of both the intermediate and base classes.
- **Step 4: Instantiate and Use the Grandchild Class**
    - Create an object of the most derived class (`Grandchild`). You can now call methods defined in the Grandchild, Parent, and Grandparent classes on this single object.

##### Code Translation

```python
# --- Step 1: Define the Base (Grandparent) Class ---
class Organism:
    def breathe(self):
        print("The organism breathes.")

# --- Step 2: Define the Intermediate (Parent) Class ---
class Animal(Organism):  # Inherits from Organism
    def move(self):
        print("The animal moves.")

# --- Step 3: Define the Derived (Grandchild) Class ---
class Dog(Animal):  # Inherits from Animal
    def bark(self):
        print("The dog barks.")

# --- Step 4: Instantiate and Use the Grandchild Class ---
my_dog = Dog()

# Call method from its own class
my_dog.bark()  # Output: The dog barks.

# Call method from the parent class (Animal)
my_dog.move()  # Output: The animal moves.

# Call method from the grandparent class (Organism)
my_dog.breathe() # Output: The organism breathes.
```

 [[Code - Multilevel Inheritance Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Inheritance Syntax:**
    - The key mechanism is the class definition syntax `class ChildClassName(ParentClassName):`. This is repeated at each level to form the chain.
- **Method Resolution Order (MRO):**
    - Python determines which method to call by searching in a specific order: first in the instance's class, then its parent, then its grandparent, and so on, up the chain. This predictable order is crucial for the hierarchy to function correctly.

#### Core Trade-offs

- **Pro: Code Reusability & Logic**
    - It perfectly models hierarchical relationships (e.g., `Vehicle` -> `Car` -> `ElectricCar`), adhering to the [[SWE - DRY (Don't Repeat Yourself) Principle|DRY principle]] by avoiding redundant code.
- **Con: Tight Coupling (Fragile Base Class Problem)**
    - Changes in a grandparent class can have unexpected and far-reaching ripple effects down the entire chain, making the system fragile and difficult to refactor.
- **Con: Increased Complexity**
    - Deep inheritance chains (e.g., 5+ levels) can become very difficult to understand and debug. It can be hard to trace where a particular method or attribute originates without tools for [[Python - Class Introspection|class introspection]], such as using the [[Python - dir() Function 1|dir() function]] to list all members or the [[Python - help() Function 2|help() function]] to view the method resolution order.

## Connections

```
                      (Parent)
                 Class Inheritance
                         ▲
                         │
         ┌───────────────┼────────────────────────────┐
         │               │                            │
(Contrast)      ┌───────────────────────────┐      (Tool)
Multiple        │  Multilevel Inheritance   │      super()
Inheritance     └───────────────────────────┘
                         │
                         ▼
                  (Leads to)
             Specialized Child Class
```

### Parent Concept

Multilevel inheritance is a specific pattern of [[Python - Class Inheritance|class inheritance]], which is a core pillar of [[Python - Object-Oriented Programming (OOP)|Object-Oriented Programming]].

### Child Concepts



### Related Concepts 

- It contrasts with [[Python - Multiple Inheritance|multiple inheritance]], where a class inherits from several unrelated parent classes simultaneously.
- The [[Python - super() Function 1|super() function]] is crucial for correctly initializing and calling methods from parent classes within any inheritance hierarchy.
- Understanding the inheritance chain often requires [[Python - Class Introspection|class introspection]], using tools to examine the attributes and methods of an object at runtime.
- The built-in [[Python - dir() Function 1|dir() function]] is a simple way to see all the attributes and methods an object has inherited from its entire family tree.
## Questions

- You're designing a system for a vehicle manufacturer. You could model 'Car', 'ElectricCar', and 'SelfDrivingElectricCar' using a deep multilevel inheritance chain. Alternatively, you could use a flatter hierarchy with composition (e.g., a 'Car' has a 'Motor' and a 'DrivingSystem'). When would the deep inheritance model be a liability, and how would you justify the switch to a composition-based design to your project manager in terms of long-term maintenance costs?
- If a critical bug is found in a method within a base 'grandparent' class that is 5 levels deep in an inheritance chain, what steps would you take to design a testing and deployment strategy to ensure the fix doesn't introduce breaking changes in the hundreds of specialized grandchild classes that depend on it in production?
- What if Python's Method Resolution Order (MRO) was 'last-in, first-out' instead of its current C3 linearization? How would that fundamentally break the intuitive model of multilevel inheritance, and what kind of bizarre behaviors might you see in a 'grandchild' object?