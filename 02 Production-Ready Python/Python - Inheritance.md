---
tags: 
  - core
  - python
  - code_reuse
  - parent_class
  - child_class
  - is-a_relationship
  - method_overriding
  - concept
source: 
  - "[[Introduction to Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Encapsulation]]"
  - "[[Python - Polymorphism]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Objects]]"
  - "[[Python - Class vs Instance Attributes]]"
  - "[[Python - Instance Attributes]]"
  - "[[Python - Class Methods]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Python - Core Principles of OOP]]"
  - "[[Python - Accessing Class Attributes]]"
  - "[[Python - Modifying Class Attributes on an Instance]]"
---
# Core: Inheritance

## Summary

>Inheritance is a fundamental mechanism in Object-Oriented Programming that allows a new class (the 'child' or 'subclass') to be based on an existing class (the 'parent' or 'superclass'). The child class automatically acquires all the attributes and methods of the parent class, allowing developers to reuse code and establish a logical hierarchy. It is one of the [[Python - Core Principles of OOP]], working in concert with [[Python - Encapsulation]] and [[Python - Polymorphism]] to create robust and scalable software.

**Why This Matters:** Inheritance enables developers to write cleaner, more maintainable code by reusing proven logic from existing classes, drastically reducing redundancy and development time.

_Analogy:_ _Think of a general 'Vehicle Blueprint' as a parent class. This blueprint defines the essential characteristics and functions of any vehicle: it has wheels, an engine, and a method called `move()`. Now, you want to design a specific type of vehicle, like a 'Car'. Instead of starting from scratch, you use the Vehicle Blueprint as your foundation. This 'Car Blueprint' is the child class. It inherits everything from the Vehicle Blueprint (wheels, engine, `move()`) but adds its own specific features, like doors and a trunk. It might also modify an inherited function; its `move()` method might be more specific, like 'drive on road', instead of the generic 'move'._

*   **Vehicle Blueprint** -> Parent Class (Superclass)
*   **Car Blueprint** -> Child Class (Subclass)
*   **Inherited Features (wheels, engine)** -> Inherited Attributes & Methods
*   **New Features (doors, trunk)** -> New Attributes & Methods in the Child Class
*   **Modified `move()` function** -> Method Overriding
*   **Where it breaks down:** In software, a child class can completely change or even nullify an inherited behavior (e.g., overriding a method to do nothing). In the physical world, you can't simply decide a car's inherited wheels will no longer function as wheels; the physical constraints are more rigid.

```
      [ Parent Class: Animal ]
      - Attributes: name
      - Methods: speak()
              ▲
              │ (Inherits from)
              │
      [ Child Class: Dog ]
      - Inherits: name, speak()
      - Adds: breed
      - Overrides: speak() -> "Woof!"
```

## Details

Inheritance is the mechanism for 'building on top of existing code' by creating new classes that are specialized versions of existing ones. This establishes an 'is-a' relationship: a `Car` *is a* `Vehicle`, a `Dog` *is an* `Animal`. This approach is central to writing efficient, organized code because it promotes reusability, which is a core tenet of the [[SWE - DRY (Don't Repeat Yourself) Principle]]. Instead of duplicating code for similar objects, you place the common code in a parent class and have more specific child classes inherit that logic.

#### Primary Goal

To enable a new class to reuse, extend, and modify the attributes and methods of an existing class, thereby promoting code reusability and establishing a logical hierarchy.

#### Mechanism

- **Step 1: Define the Parent (Base) Class**
    - Create a class that contains general attributes and methods common to a category of objects. This will serve as the foundation.
- **Step 2: Define the Child (Derived) Class**
    - Create a new class and, in its definition, specify the parent class in parentheses. This tells Python that the new class should inherit from the parent.
- **Step 3: Inherit and Utilize Functionality**
    - Instances of the child class now automatically have access to all attributes and methods of the parent class without any extra code.
- **Step 4: Extend or Override (Optional)**
    - **Extend:** Add new attributes or methods to the child class that are specific to it.
    - **Override:** Redefine a method from the parent class within the child class to provide a more specific implementation. The `super()` function can be used to call the parent's version of the method from within the overridden one.

##### Code Translation

```python
# --- Step 1: Define the Parent (Base) Class ---
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "Some generic animal sound"

# --- Step 2: Define the Child (Derived) Class ---
class Dog(Animal): # Dog inherits from Animal
    # --- Step 4: Extend and Override ---
    def __init__(self, name, breed):
        # Call the parent's __init__ method to handle the 'name' attribute
        super().__init__(name)
        self.breed = breed # Add a new attribute specific to Dog

    # Override the parent's 'speak' method
    def speak(self):
        return "Woof!"

# --- Step 3: Inherit and Utilize Functionality ---
my_dog = Dog("Rex", "Golden Retriever")

# Access inherited attribute from Animal class
print(f"Name: {my_dog.name}")

# Access new attribute from Dog class
print(f"Breed: {my_dog.breed}")

# Call the overridden method in the Dog class
print(f"Sound: {my_dog.speak()}")
```

 [[Code - Inheritance Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Choice of Parent Class**
    - The most fundamental decision. Selecting the right parent determines the entire set of functionalities the child class will start with.
- **Method Overriding**
    - The decision of which parent methods to redefine in the child class to provide specialized behavior. This is how a child class adapts inherited functionality.
- **Use of `super()`**
    - A key control mechanism. Deciding whether to completely replace a parent's method or to extend it by calling `super()` to execute the parent's logic first, then adding new logic.
- **Multiple Inheritance**
    - An advanced technique where a class can inherit from multiple parent classes. This is a powerful but complex lever, as it can lead to issues like the 'Diamond Problem' if not managed carefully.

#### Core Trade-offs

- **Pro: Code Reusability**
    - The primary advantage. It allows developers to avoid duplicating code by placing common functionality in a base class, adhering to the [[SWE - DRY (Don't Repeat Yourself) Principle]].
- **Pro: Logical Structure**
    - It creates a clear and intuitive 'is-a' hierarchy, making the relationships between different parts of the software easier to understand and reason about.
- **Con: Tight Coupling**
    - Child classes are tightly coupled to the implementation of their parent classes. A change in the parent class (e.g., changing a method signature) can break all of its descendants.
- **Con: Hierarchy Complexity**
    - Deep or wide inheritance hierarchies can become difficult to navigate and maintain. It can be hard to trace where a particular method or attribute is coming from, sometimes referred to as the 'yo-yo problem'.

## Connections

```
                     (Parent)
            Object-Oriented Programming
                       ▲
                       │
┌──────────────────────┼──────────────────────┐
│                      │                      │
(Works With)    ┌──────────────┐    (Works With)
Encapsulation   │  Inheritance │    Polymorphism
                └──────────────┘
                       │
            ┌──────────┴──────────┐
            │                     │
    (Technique)           (Technique)
Method Overriding   Multiple Inheritance
```

### Parent Concept

Inheritance is one of the fundamental principles of [[Python - Object-Oriented Programming (OOP)]], providing the mechanism for code reuse and establishing hierarchical class relationships.

### Child Concepts

- A key technique enabled by inheritance is **method overriding**, where a subclass provides a specific implementation of a method that is already defined by its superclass.
- A more advanced form is **multiple inheritance**, where a class can inherit from more than one parent class, combining their functionalities.

### Related Concepts 

- Inheritance works alongside [[Python - Encapsulation|encapsulation]], as the child class inherits the entire bundled unit of data and methods from the parent.
- It is intrinsically linked to [[Python - Polymorphism|polymorphism]], which allows objects of different inherited classes to be treated as objects of a common parent class.
- The attributes inherited from a parent can be either [[Python - Class vs Instance Attributes|class or instance attributes]], depending on their definition in the parent class.
- Understanding how to define a parent class is foundational, which relates back to the basics of [[Python - Class Definition|class definitions]].
## Questions

- You're designing a system with many types of employees (e.g., Salaried, Hourly, Contractor). You could use inheritance with a base `Employee` class, or you could use composition by giving an `Employee` object a `PayStrategy` object. When would you choose inheritance, and what business risks (e.g., future organizational changes) does that choice introduce compared to composition?
- If you refactor a widely-used base class in a large codebase, what is your strategy for identifying and testing all downstream child classes to ensure you haven't introduced breaking changes, especially if those child classes are maintained by different teams?
- What if Python removed the ability to override methods? How would you achieve specialized behavior in subclasses, and what design patterns would become more prominent as a result?