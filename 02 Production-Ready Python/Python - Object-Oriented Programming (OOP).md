---
tags: 
  - major_core
  - python
  - oop
  - paradigm
  - encapsulation
  - inheritance
  - abstraction
  - concept
source: 
  - "[[Introduction to Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Procedural vs Object-Oriented Programming]]"
  - "[[Python - Object]]"
  - "[[Python - Class]]"
  - "[[Python - Object State (Attributes)]]"
  - "[[Python - Object Behavior (Methods)]]"
  - "[[Python - Class & Object Relationship]]"
  - "[[Python 6 - Everything is an Object]]"
  - "[[Fundamental - Programming]]"
  - "[[Python]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[SWE - Do One Thing Principle]]"
  - "[[Python - Packages]]"
  - "[[Python - dir() Function]]"
  - "[[Python 6 - type() Function]]"
  - "[[Python - OOP Terminology Cheatsheet]]"
---
# Major Core: Object-Oriented Programming

## Summary

> Object-Oriented Programming (OOP) is a programming paradigm centered around the concept of 'objects'. Instead of focusing on logic and functions that manipulate data, OOP bundles data and the functions that operate on that data together into a single unit. This approach, which contrasts with [[Python - Procedural vs Object-Oriented Programming|procedural programming]], is invaluable for organizing code, especially in large projects like Python packages, making it more reusable and maintainable.

**Why This Matters:** It provides a powerful mental model for structuring complex software into logical, reusable, and manageable components, mirroring how we perceive the real world.

_Analogy:_ _Think of a car. A car is an object. As a driver, you interact with it through a simple, well-defined interface: a steering wheel, pedals, and a gear stick. You don't need to know the intricate details of the internal combustion engine, the transmission, or the electrical system to drive it. The car's complexity is hidden from you; you just use the simple controls to make it perform actions like 'accelerate' or 'turn'._

In this analogy:
- **The Car Itself**: Represents the `[[Python - Object|Object]]`, a self-contained unit.
- **The Car's Blueprint**: Represents the `[[Python - Class|Class]]` that defines how all cars of that model are made.
- **Internal State (Fuel Level, Engine Temperature, Current Gear)**: Represents the `[[Python - Object State (Attributes)|object's attributes]]` (its data).
- **Actions (Accelerate, Brake, Turn)**: Represents the `[[Python - Object Behavior (Methods)|object's methods]]` (its functions).
- **The Driver's Interface (Steering Wheel, Pedals)**: Represents the object's public interface, which hides the internal complexity (a key principle called Abstraction).

**Where it breaks down:** Software objects are more flexible than physical ones. You can create a new 'SportsCar' class that inherits all the features of the 'Car' class and adds new ones like a 'TurboBoost' method, a concept that doesn't map perfectly to manufacturing.

```
      +---------------------------------+
      |             Object              |
      |      (e.g., a specific car)     |
      |=================================|
      |          Data/Attributes        |
      |      - color = "red"            |
      |      - current_speed = 0        |
      |      - fuel_level = 0.75        |
      +---------------------------------+
      |        Behavior/Methods         |
      |      - accelerate()             |
      |      - brake()                  |
      |      - get_fuel_level()         |
      +---------------------------------+
```

## Details

Object-Oriented Programming is a fundamental paradigm in software engineering that shifts the focus from writing procedures to creating objects. The core idea is to model a complex system by identifying the key entities or 'objects' within it and defining their properties (data) and behaviors (functions). This point of view becomes invaluable when designing and building software like Python packages, as it helps organize code into logical, self-contained modules. The paradigm is built upon four main pillars: **Encapsulation, Abstraction, Inheritance, and Polymorphism**.

#### Primary Goal

To manage the complexity of large software systems by organizing code into self-contained, reusable units that model real-world or abstract entities.

#### Mechanism

- **How it Works:**
    1. **Identify Objects:** First, a programmer analyzes a problem and identifies the core objects involved. For an e-commerce system, this might be `Customer`, `Product`, and `ShoppingCart`.
    2. **Define Classes:** For each type of object, a `[[Python - Class|Class]]` is created, which acts as a blueprint. The `Product` class would define that every product has a name, price, and description.
    3. **Instantiate Objects:** From these classes, individual `[[Python - Object|Objects]]` (instances) are created. For example, 'Laptop' and 'Mouse' would be two distinct objects created from the `Product` class.
    4. **Interact:** These objects then interact with each other by calling their methods. For instance, a `ShoppingCart` object might have an `addProduct()` method that takes a `Product` object as an argument.
- **Pillar 1: Encapsulation**
    - This is the practice of bundling an object's data (`[[Python - Object State (Attributes)|attributes]]`) and the methods that operate on that data (`[[Python - Object Behavior (Methods)|methods]]`) into a single unit. It prevents direct, uncontrolled access to the data, protecting it from accidental modification.
- **Pillar 2: Abstraction**
    - This principle involves hiding the complex implementation details of an object and exposing only the essential features. Like the car analogy, you use the steering wheel (the interface) without needing to know how the steering column works.
- **Pillar 3: Inheritance**
    - This allows a new class (a 'child' or 'subclass') to be based on an existing class (a 'parent' or 'superclass'). The child class inherits the attributes and methods of the parent, promoting code reuse. *Example: A `Dog` class and a `Cat` class can both inherit from a parent `Animal` class, sharing attributes like `name` and methods like `eat()`.*
- **Pillar 4: Polymorphism**
    - Literally meaning 'many forms', this allows objects of different classes to be treated as objects of a common superclass. It enables a single interface to represent different underlying forms. *Example: If both `Dog` and `Cat` classes have a `make_sound()` method, you can call this method on any `Animal` object, and it will correctly output 'Woof' for a Dog and 'Meow' for a Cat.*

nothing to fill here

 [[Code - Object-Oriented Programming Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Benefit: Modularity & Maintainability**
    - Because objects are self-contained, changes made to one object's internal implementation do not affect other parts of the system, as long as its public interface remains the same. This makes code easier to debug and maintain.
- **Benefit: Code Reusability**
    - Through inheritance, you can reuse code from existing, proven classes to build new ones, saving development time and reducing redundancy. This aligns with the [[SWE - DRY (Don't Repeat Yourself) Principle|DRY principle]].
- **Benefit: Scalability**
    - The organized, modular structure of OOP makes it easier to add new features and functionality to a large system over time without breaking existing code.

#### Core Trade-offs

- **Drawback: Increased Complexity for Simple Problems**
    - For small, simple scripts or tasks, the boilerplate of defining classes and objects can be overkill. A straightforward procedural script is often faster to write and easier to understand in these cases.
- **Drawback: Steeper Learning Curve**
    - Properly designing a system with OOP requires understanding abstract concepts like inheritance, polymorphism, and design patterns, which can be more challenging for beginners than writing a linear script.
- **Drawback: Potential Performance Overhead**
    - In performance-critical applications, the indirection involved in method calls (dynamic dispatch) can introduce a small amount of overhead compared to direct function calls in procedural code.

## Connections

```
                     (Parent)
                 Fundamental - Programming
                           ▲
                           │
           ┌───────────────┼────────────────────────────┐
           │               │                            │
(Contrasts With)  ┌───────────────────────────┐      (Core Unit)
Procedural Prog.  │ Object-Oriented Programming │      Object / Class
                  └───────────────────────────┘
                             │
                  ┌──────────┴──────────┐
                  │                     │
            (Pillar)              (Pillar)
          Inheritance           Encapsulation
```

### Parent Concept

Object-Oriented Programming is a major paradigm within the broader field of [[Fundamental - Programming]] and is the dominant approach to structuring code in modern [[Python]].

### Child Concepts



### Related Concepts 

- The [[Python - Procedural vs Object-Oriented Programming|procedural programming]] paradigm offers a contrasting approach that focuses on sequences of instructions rather than interacting objects.
- The fundamental unit in OOP is the [[Python - Object|Object]], which is a concrete instance created from a blueprint called a [[Python - Class|Class]].
- The concept that [[Python 6 - Everything is an Object|everything in Python is an object]] makes OOP a very natural and intuitive way to write Python code.
- You can use the built-in [[Python - dir() Function|dir() function]] to inspect the attributes and methods of any object, which is useful for understanding its encapsulated properties and behaviors.
## Questions

- Your team is building a data processing pipeline. A procedural script would be faster to write, but an OOP approach would create reusable components for future pipelines. How do you decide which paradigm to use, and how would you justify the potential long-term benefits of OOP against the short-term deadline pressure?
- Imagine you've designed a large e-commerce system using OOP, with classes like `Customer`, `Product`, and `Order`. How would you design the system to handle a major change, like introducing a new 'SubscriptionProduct' type that has recurring billing logic, without having to rewrite large parts of the existing `Order` and `Customer` classes?
- What if you were forced to build a complex GUI application, like a photo editor, but were forbidden from using classes and objects? What data structures and functional patterns would you use to manage the state and behavior of different UI elements, and what would be the biggest challenge?
