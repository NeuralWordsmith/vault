---
tags: 
  - major_core
  - python
  - contract
  - polymorphism
  - abstract_methods
  - api_design
  - decoupling
  - concept
source: 
  - "[[Intermediate Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Formal Interfaces]]"
  - "[[Python - Informal Interfaces]]"
  - "[[Python - Abstract Methods 1]]"
  - "[[Python - Duck Typing]]"
  - "[[Python - Interfaces vs Abstract Base Classes]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Polymorphism]]"
  - "[[Python - Inheritance]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Python - Decorators]]"
  - "[[Python - Formal Interfaces & Contract Enforcement Relationship]]"
  - "[[Python - Class Methods]]"
  - "[[Python - Functions]]"
---
# Major Core: Interfaces

## Summary

> In object-oriented programming, an interface is a conceptual blueprint or contract that defines a set of methods a class must implement. It's like a special class composed only of [[Python - Abstract Methods 1|abstract methods]], which are method signatures without any actual code. Any class that agrees to 'implement' the interface is contractually obligated to provide a concrete implementation for every method defined in that interface, guaranteeing it has a specific set of capabilities. In Python, this concept is realized through two main approaches: [[Python - Informal Interfaces]] and [[Python - Formal Interfaces]].

**Why This Matters:** Interfaces enforce a consistent structure across different classes, making large codebases more predictable, maintainable, and scalable by ensuring components are interchangeable.

_Analogy:_ _An interface is like the specification for a universal power outlet (e.g., Type G in the UK). The specification dictates the exact shape, size, and pin configuration required for any plug to work. Electrical appliance manufacturers (the 'classes') who want to sell their products in the UK must design their plugs ('implement the interface') to match this specification exactly. The power outlet doesn't care if it's a toaster, a laptop, or a lamp; as long as the plug fits the 'interface', it will receive power._

**Where it breaks down:** A physical standard like a power outlet is absolutely rigid. In Python, the concept of [[Python - Duck Typing]] allows for more flexibility than this analogy suggests. With duck typing, you don't always need a formal, pre-defined interface; as long as an object 'quacks like a duck' (i.e., has the required methods), it can be used, even if it never formally declared its intention to adhere to a contract. The analogy holds up best for [[Python - Formal Interfaces]].

```
+-------------------+
|   <<Interface>>   |
|    ISerializable  |
+-------------------+
| + to_json()       |
+-------------------+
         ▲
         | (implements)
. . . . . . . . . . .
|                     |
+---------------+   +---------------+
|    User       |   |    Product    |
+---------------+   +---------------+
| - name        |   | - name        |
| - email       |   | - price       |
+---------------+   +---------------+
| + to_json()   |   | + to_json()   |
+---------------+   +---------------+
```

## Details

An interface acts as a contract, defining a set of behaviors (methods) without specifying how those behaviors are implemented. When a class implements an interface, it promises to provide the functionality outlined in that contract. This allows different classes to be used interchangeably by code that relies on the interface, a principle known as polymorphism. This is a cornerstone of robust object-oriented design, as it decouples the 'what' (the required functionality) from the 'how' (the specific implementation). In Python, interfaces can be categorized into two main types: **Formal Interfaces** and **Informal Interfaces**.

#### Primary Goal

To establish a contract that guarantees a class has a certain set of methods, enabling consistent and interchangeable use of different classes that adhere to the same contract.

#### Mechanism

- **How it Works:** The core process involves three main stages:
    1.  **Definition:** An interface is defined, specifying a collection of method names and their required arguments. This is the 'contract'.
    2.  **Implementation:** A concrete class declares that it will adhere to the interface. It must then provide a working implementation for *every single method* defined in the contract.
    3.  **Enforcement:** When the program runs, if a class claims to implement an interface but fails to define all the required methods, an error is raised (this is especially true for formal interfaces).
- **Informal Interfaces:**
    - Relies on convention, documentation, and the principles of [[Python - Duck Typing|duck typing]] rather than strict language-level enforcement.
    - The focus is on an object's capabilities (what methods it has) rather than its official type or inheritance hierarchy.
    - *Example: A function designed to save data might simply expect any object with a `.save()` method. It doesn't care if the object is a `DatabaseConnector`, a `FileHandler`, or a `CloudStorageUploader`, as long as it can call `.save()` on it.*
- **Formal Interfaces:**
    - Uses explicit language features, primarily Python's `abc` (Abstract Base Classes) module, to create and enforce the contract.
    - Provides runtime checks. If you try to create an instance of a class that hasn't implemented all the required abstract methods from its parent interface, Python will raise a `TypeError`.
    - *Example: Using the `@abstractmethod` decorator from the `abc` module to mark methods in a base class, forcing all subclasses to implement them. This is a key part of the [[Python - Formal Interfaces & Contract Enforcement Relationship|relationship between formal interfaces and contract enforcement]].*

nothing to fill here

 [[Code - Interfaces Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Contract Methods:** The primary 'parameters' of an interface are the abstract methods it defines. The number, names, and signatures (arguments) of these methods determine the complexity and strictness of the contract that implementing classes must follow.
- **Formality Level:** The choice between an informal (convention-based) and a formal (ABC-enforced) interface is a key design decision. Formal interfaces provide stronger guarantees and safety at the cost of some boilerplate, while informal interfaces offer greater flexibility and are often considered more 'Pythonic'.

#### Core Trade-offs

- **Pro: Decoupling & Modularity:** Interfaces separate the definition of a component from its implementation. This allows you to swap out implementations (e.g., switch from a SQL database to a NoSQL database) without changing the code that uses them, as long as both implementations adhere to the same interface.
- **Pro: Predictability & Polymorphism:** They make code easier to reason about. If an object implements an `ISerializable` interface, you know for certain it has a `.serialize()` method. This enables powerful polymorphic behavior where you can treat a list of disparate objects in a uniform way.
- **Con: Rigidity & Boilerplate:** Formal interfaces can add verbosity and make the code more rigid. For simple, small-scale projects, the flexibility of [[Python - Duck Typing]] is often sufficient and requires less upfront design.
- **Con: Potential for Over-Engineering:** Applying interfaces where they are not strictly necessary can over-complicate a system's design. It's a tool best used when defining clear boundaries and public APIs in a larger application.

## Connections

```
                           (Parent)
               Object-Oriented Programming
                             ▲
                             │
┌────────────────────────────┼────────────────────────────┐
│                            │                            │
(Related)             ┌──────────────────┐                (Related)
Abstract Methods      │    Interfaces    │                Duck Typing
                      └──────────────────┘
                             │
                  ┌──────────┴──────────┐
                  │                     │
          Formal Interfaces     Informal Interfaces
```

### Parent Concept

Interfaces are a fundamental concept within [[Python - Object-Oriented Programming (OOP)]], used to define contracts and enable polymorphism.

### Child Concepts

- One approach is [[Python - Formal Interfaces]], which use mechanisms like Abstract Base Classes for strict, runtime enforcement of the contract.
- The other, more 'Pythonic' approach is [[Python - Informal Interfaces]], which rely on convention and documentation, aligning closely with the principles of duck typing.

### Related Concepts 

- Interfaces are composed of [[Python - Abstract Methods 1|abstract methods]], which are method declarations without an implementation.
- The concept of [[Python - Duck Typing]] provides an alternative to formal interfaces, focusing on an object's behavior rather than its explicit type.
- It's important to understand the difference between [[Python - Interfaces vs Abstract Base Classes|interfaces and abstract base classes]], as ABCs are the primary tool for creating formal interfaces in Python but can also contain concrete methods.
## Questions

- Your team is building a plugin system for a new e-commerce platform. Would you enforce a strict, formal interface for all third-party payment plugins, or would you rely on an informal, duck-typed interface? Justify your decision in terms of long-term maintenance costs, developer onboarding speed, and system reliability.
- Imagine a large microservices architecture where dozens of services communicate. How could you use interfaces (or a similar contract-based approach like Protocol Buffers) to define the communication contracts between services, and what system-level tools would you use to verify that all services adhere to these contracts during CI/CD?
- What if Python's core philosophy completely rejected duck typing and required every object interaction to be defined by a formal, statically-checked interface, similar to Java? How would this fundamentally change the way we write Python code and the types of problems the language is best suited for?
