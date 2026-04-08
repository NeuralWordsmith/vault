---
tags:
  - core
  - python
  - class
  - __init__
  - oop
  - pep8
  - camelcase
  - concept
source:
  - "[[Software Engineering Principles in Python]]"
related:
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Instantiation]]"
  - "[[Python - Instance Attributes 2]]"
  - "[[Python - The 'self' Keyword in Classes]]"
  - "[[Python - Class Attributes]]"
  - "[[Python - Class Methods]]"
  - "[[Python - Class Inheritance]]"
  - "[[Python - Objects]]"
  - "[[Python - Core Principles of OOP]]"
  - "[[Python - Docstring Formatting Styles]]"
  - "[[Python - Packages]]"
  - "[[Python - User-Defined Functions]]"
  - "[[Python - Benefits of OOP]]"
  - "[[Python - Exposing Classes in a Package's __init__.py]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
---
# Core: Class Definition

## Summary

>A class definition in Python is the blueprint for creating objects. It starts with the `class` keyword, followed by a name (conventionally in CamelCase), and typically includes a docstring and an `__init__` method. This `__init__` method acts as the constructor, running automatically whenever a new object, or instance, of the class is created, as seen in [[Python - Class Instantiation|class instantiation]]. It's where you set up the initial state of the object, often by defining its [[Python - Instance Attributes 2|instance attributes]].

**Why This Matters:** Defining a class is the fundamental first step in object-oriented programming, enabling the creation of reusable and organized code blueprints for complex data structures and behaviors.

_Analogy:_ _A class definition is like the architectural blueprint for a house. The blueprint itself isn't a house, but it contains all the instructions and specifications for how to build one: the number of rooms, the layout, the materials, etc._

The blueprint is the `class` definition. Each house built from that blueprint is an `object` or `instance`. The process of building the house is [[Python - Class Instantiation|instantiation]]. The specific features of a finished house (e.g., the color of the walls, the type of flooring) are the `instance attributes`. **Where it breaks down:** Unlike a static paper blueprint, a class can contain methods (functions) that define the *behaviors* of the objects, something a blueprint doesn't explicitly detail beyond structural capabilities.

```
```
class MyClassName:
    │
    ├── """Docstring: Explains the class."""
    │
    └── def __init__(self, param1, param2):  <-- The Initializer/Constructor
            │
            ├── self.attribute1 = param1   <-- Sets initial state
            └── self.attribute2 = param2   <-- Sets initial state
```
```

## Details

In Python, Object-Oriented Programming (OOP) is implemented by writing classes. A class definition is the foundational syntax for creating these blueprints. It begins with the `class` keyword, followed by a name that, according to the PEP8 style guide, should be in CamelCase (e.g., `MyClass`) and should not contain underscores. Immediately following the class name is an optional docstring that explains the class's purpose. The most crucial part of a minimal class is often the `__init__` method, a special "dunder" (double underscore) method that serves as the class's initializer or constructor. It's automatically called when a new instance of the class is created, setting up the object's initial state.

#### Primary Goal

To provide a structured, reusable template for creating objects that bundle together data (attributes) and functionality (methods).

#### Mechanism

- **Step 1: Declare the Class**
    - Use the `class` keyword followed by the class name. The name must follow PEP8's CamelCase convention (e.g., `MyClassName`).
- **Step 2: Add a Docstring**
    - Immediately after the class declaration, include a triple-quoted string (`"""..."""`) to document the class's purpose, parameters, and attributes. This is accessible via Python's `help()` function.
- **Step 3: Define the Initializer**
    - Define the `__init__` method. This special method is the constructor. Its first parameter is always `self`, which refers to the instance being created. Subsequent parameters (like `value` in the example) are used to initialize the object's state.
    - Inside `__init__`, you assign values to instance attributes using [[Python - The 'self' Keyword in Classes|the 'self' keyword]], for example, `self.attribute = value`. This attaches the data to the specific object being created.

##### Code Translation

```python
# --- Step 1: Declare the Class ---
class MyClass:
    # --- Step 2: Add a Docstring ---
    """A minimal example class

    :param value: value to set as the ``attribute`` attribute
    :ivar attribute: contains the contents of ``value`` passed in init
    """
    # --- Step 3: Define the Initializer ---
    def __init__(self, value):
        # Define attribute with the contents of the value param
        self.attribute = value
```

 [[Code - Class Definition Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`class` Keyword**
    - The non-negotiable keyword that begins any class definition.
- **Class Name (CamelCase)**
    - The identifier for your blueprint. PEP8 convention dictates it should be capitalized and multi-word names should be joined without underscores (e.g., `DatabaseConnection`).
- **Docstring**
    - Provides human-readable documentation. While optional for the code to run, it is essential for maintainability and usability.
- **`__init__(self, ...)` Method**
    - The special constructor method. It's the entry point for setting up a new object. The `self` parameter is a reference to the new instance being created, and is handled automatically by Python.

#### Core Trade-offs

- **Overhead vs. Simplicity**
    - For very simple data grouping, defining a full class can be more verbose than using a dictionary or a tuple. The benefits of encapsulation and methods only become apparent as complexity grows.
- **Abstraction vs. Explicitness**
    - Classes hide implementation details, which is a core benefit of OOP. However, this can sometimes make it harder for a new developer to trace the exact flow of logic without understanding the class's internal workings.

## Connections

```
                      (Parent)
            Object-Oriented Programming
                       ▲
                       │
    ┌──────────────────┼──────────────────┐
    │                  │                  │
(Related)      ┌──────────────────┐      (Related)
The 'self' Keyword │ Class Definition │      Benefits of OOP
               └──────────────────┘
                       │
            ┌──────────┴──────────┐
            │                     │
    Class Instantiation   Instance Attributes
```

### Parent Concept

The concept of a class definition is the fundamental building block of [[Python - Object-Oriented Programming (OOP)|Object-Oriented Programming in Python]].

### Child Concepts

- Once a class is defined, the next step is [[Python - Class Instantiation|class instantiation]], which is the process of creating an actual object from the class blueprint.
- Within the `__init__` method of a class definition, you create [[Python - Instance Attributes 2|instance attributes]], which are variables that belong to a specific instance of a class.

### Related Concepts 

- The first parameter of any instance method, including `__init__`, is always a reference to the instance itself, which is handled by [[Python - The 'self' Keyword in Classes|the 'self' keyword]].
- Understanding how to define a class is the first step toward realizing the [[Python - Benefits of OOP|benefits of object-oriented programming]], such as encapsulation and reusability.
- For a class to be easily accessible when its containing package is imported, it's common practice to use [[Python - Exposing Classes in a Package's __init__.py|a package's __init__.py file to expose it]].
## Questions

- You're designing a system to process user data. You could use a list of dictionaries or define a `User` class. When would the initial overhead of defining a `User` class provide enough business value in terms of code clarity, maintainability, and error reduction to justify it over the simpler dictionary approach?
- Imagine a large application where hundreds of developers are defining their own classes. How would you design a system of base classes and interfaces to enforce consistent structure (e.g., ensuring every data-centric class has a `.to_dict()` method) and prevent architectural drift as the system scales?
- What if Python's `class` keyword was removed from the language, but you still had first-class functions and closures? How could you simulate the concept of a 'class'—bundling state and behavior—using only functions?