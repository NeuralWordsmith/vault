---
tags: 
  - core
  - python
  - concrete_product
  - factory_method
  - design_pattern
  - implementation
  - interface
  - concept
source: 
  - "[[Intermediate Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Factory Method Design Pattern]]"
  - "[[Python - Product (Factory Method Pattern)]]"
  - "[[Python - Factory Method & Interface Relationship]]"
  - "[[Python - Refactoring to a Factory Method]]"
  - "[[Python - Benefits of Factory Methods]]"
  - "[[Python - Factory Method Naming Convention]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Abstract Base Classes]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[SWE - Do One Thing Principle]]"
  - "[[Python - Polymorphism]]"
  - "[[Python - Inheritance]]"
---
# Core: Concrete Product (Factory Method Pattern)

## Summary

>Concrete products are the actual, specific classes that implement a common [[Python - Product (Factory Method Pattern)|product interface]]. They represent the tangible objects that a factory method is responsible for creating and returning to a client. For instance, in a system for educational materials, `Textbook`, `Blog`, and `Video` are all concrete products that fulfill the contract of a general `Resource` interface.

**Why This Matters:** Concrete products are the tangible outputs of a factory, allowing a system to produce and work with a variety of related objects through a common interface without being tightly coupled to their specific classes.

_Analogy:_ _Think of a car factory. The 'Product Interface' is the universal blueprint for a 'Vehicle,' which mandates that all vehicles must have an engine, wheels, and a chassis. The 'Concrete Products' are the specific models built from this blueprint: a `Ford Mustang`, a `Toyota Camry`, and a `Honda CR-V`. Each is a distinct type of vehicle with its own unique features, but they all adhere to the fundamental 'Vehicle' blueprint and can be used in similar ways (e.g., they can all be driven)._

The factory produces different models (`Mustang`, `Camry`, `CR-V`) based on the order it receives. The client doesn't need to know the complex assembly process for a Mustang; they just ask for a 'sports car' and the factory delivers the finished product. 

**Where it breaks down:** In software, concrete products can have vastly different internal logic and methods that go far beyond the shared interface. Physical car models, while different, often share more underlying manufacturing processes and components than software objects might.

```
   +------------------+
   |   Resource       | (Interface)
   |------------------|
   | + reference()    |
   +------------------+
             ▲
             | (implements)
   ┌─────────┴──────────┐
   │                    │
+--------------+   +--------------+   +--------------+
|   Textbook   |   |     Blog     |   |    Video     |
|--------------|   |--------------|   |--------------|
| + reference()|   | + reference()|   | + reference()|
+--------------+   +--------------+   +--------------+
```

## Details

Concrete products are the heart of the Factory Method pattern's flexibility. They are the individual, specialized classes that provide the actual implementation for a shared [[Python - Product (Factory Method Pattern)|product interface]]. While the client code interacts with these objects through the common interface, the factory is responsible for deciding which specific concrete product class to instantiate. The examples from the context—`Textbook`, `Blog`, and `Video`—are perfect illustrations of different concrete products that all fulfill the role of a `Resource`.

#### Primary Goal

To provide specific, interchangeable implementations of a common product interface, enabling the creation of diverse objects without coupling the client code to their concrete classes.

#### Mechanism

- **How it Works:**
    1. A common [[Python - Product (Factory Method Pattern)|product interface]] (often an Abstract Base Class in Python) is defined. It declares the methods that all products must implement, like a `Resource` interface with a `reference()` method.
    2. Multiple concrete product classes are created, each inheriting from or implementing this interface.
    3. Each concrete class provides its own specific implementation for the interface's methods, tailoring the behavior to its specific type.
- **Example Concrete Product: `Textbook`**
    - Implements the `Resource` interface.
    - Its `reference()` method might return a formatted academic citation, like: *'Author (Year). Title. Publisher.'*
- **Example Concrete Product: `Blog`**
    - Implements the `Resource` interface.
    - Its `reference()` method might return a URL, like: *'Read more at: https://example-blog.com/topic'*.
- **Example Concrete Product: `Video`**
    - Implements the `Resource` interface.
    - Its `reference()` method might return a link with a timestamp, like: *'Watch at: https://youtube.com/watch?v=...&t=120s'*.

##### Code Translation

```python
from abc import ABC, abstractmethod

# --- The Product Interface ---
class Resource(ABC):
    @abstractmethod
    def reference(self, topic: str) -> None:
        """Provide a reference for the given topic."""
        pass

# --- Concrete Product 1 ---
class Textbook(Resource):
    def reference(self, topic: str) -> None:
        print(f"Citing textbook chapter on '{topic}'. [APA Format]...")

# --- Concrete Product 2 ---
class Blog(Resource):
    def reference(self, topic: str) -> None:
        print(f"Linking to blog post on '{topic}' at example.com/{topic}")

# --- Concrete Product 3 ---
class Video(Resource):
    def reference(self, topic: str) -> None:
        print(f"Sharing video link for '{topic}' at youtube.com/watch?v=...")

# The Factory Method would be responsible for creating instances of these classes.
```

 [[Code - Concrete Product (Factory Method Pattern) Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Interface Adherence**
    - The most critical aspect is that each concrete product *must* correctly and completely implement the methods defined in the product interface. Failure to do so breaks the contract and will cause errors when the client code tries to use the object.
- **Unique State and Behavior**
    - While they share an interface, concrete products can have their own unique attributes and methods. For example, a `Video` object might have a `duration` attribute, while a `Textbook` might have an `isbn` attribute. The client code, however, should generally not rely on these unique aspects, as it is designed to program to the common interface.

#### Core Trade-offs

- **Pro (Flexibility & Extensibility)**
    - The primary benefit is that adding a new product type (e.g., a `Podcast` resource) is easy. It only requires creating a new concrete product class and updating the factory. The client code that uses the resources doesn't need to change at all, adhering to the Open/Closed Principle.
- **Con (Class Proliferation)**
    - A potential drawback is that the pattern can lead to a large number of classes in the system. For every new type of product, a new class file is needed, which can increase the overall complexity of the codebase if not managed well.

## Connections

```
                      (Parent)
            Product (Factory Method Pattern)
                       ▲
                       │
    ┌──────────────────┼──────────────────┐
    │                  │                  │
(Related)       ┌───────────────────────────┐      (Related)
Factory Method  │      Concrete Product     │      Interface Relationship
                └───────────────────────────┘
```

### Parent Concept

This concept is a specific implementation of the more general [[Python - Product (Factory Method Pattern)|Product]], which defines the common interface for all objects a factory can create.

### Child Concepts

- Concrete products are the final implementations, so they do not have conceptual children in this hierarchy; rather, classes like `Textbook` or `Video` are specific *examples* of concrete products.

### Related Concepts 

- The [[Python - Factory Method Design Pattern|Factory Method pattern]] is the creational pattern that is responsible for instantiating and returning these concrete products.
- The relationship between the interface and the concrete product is central to this pattern, as explored in [[Python - Factory Method & Interface Relationship|Factory Method & Interface Relationship]].
- The process of changing code from direct instantiation (like the `if/elif/else` block in the source image) to using a factory is detailed in [[Python - Refactoring to a Factory Method|Refactoring to a Factory Method]].
## Questions

- Your team needs to add 15 new resource types to the system over the next quarter. At what point does the overhead of creating 15 new concrete product classes and updating the factory outweigh the benefits of decoupling? How would you justify a simpler, more coupled approach to your product manager if the deadline is tight?
- Imagine our concrete products (`Textbook`, `Video`) need to fetch their data from different microservices with varying latency and failure rates. How would you design the factory and the concrete product classes to handle these external dependencies gracefully, ensuring the client code remains unaffected by a downstream service outage?
- What if you were required to add new concrete product types at runtime *without* redeploying the application code? How might you design a system using dynamic class loading or configuration files to register new concrete products with the factory on the fly?