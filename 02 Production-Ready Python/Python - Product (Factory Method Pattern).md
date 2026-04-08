---
tags: 
  - core
  - python
  - factory_pattern
  - design_patterns
  - interface
  - abstract_base_class
  - polymorphism
  - concept
source: 
  - "[[Intermediate Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Factory Method Design Pattern]]"
  - "[[Python - Concrete Product (Factory Method Pattern)]]"
  - "[[Python - Factory Method & Interface Relationship]]"
  - "[[Python - Benefits of Factory Methods]]"
  - "[[Python - Refactoring to a Factory Method]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Python - Decorators]]"
  - "[[Python - Class Methods]]"
---
# Core: Product (Factory Method Pattern)

## Summary

>In the Factory Method design pattern, the 'Product' is the common interface or abstract base class that all objects created by the factory must implement. It defines a contract—a set of methods and properties—that guarantees any object returned by the factory will have a consistent structure and behavior. For instance, the `Resource` class in the example acts as the Product, dictating that any specific resource type must have a `reference` method. This is the cornerstone of the [[Python - Factory Method & Interface Relationship|relationship between the factory and the objects it produces]].

**Why This Matters:** Defining a Product interface ensures that all objects created by a factory are interchangeable, allowing for flexible and maintainable code that can be extended without breaking existing client logic.

_Analogy:_ _Think of a standard electrical wall outlet. The outlet itself is the 'Product' interface. It doesn't provide power on its own, but it defines a universal standard for how any appliance must connect to the electrical grid (e.g., two flat prongs and a round ground pin). Different appliances like a toaster, a lamp, or a laptop charger are the 'Concrete Products'. They all perform different functions, but they all conform to the outlet's interface, allowing you to plug any of them in and have them work._

**Where it breaks down:** The analogy is physical. In software, the 'Product' interface is a purely logical contract. Unlike a physical outlet, a software interface can be easily modified or extended, though doing so has ripple effects on all implementing classes.

```
```
+------------------+
|   <<interface>>  |
|     Resource     |
+------------------+
| + reference()    |
+--------▲---------+
         | (implements)
┌────────┴─────────┐
│                  │
+-------------+   +-------------+
|  Textbook   |   |    Blog     |
+-------------+   +-------------+
| + reference() |   | + reference() |
+-------------+   +-------------+
```
```

## Details

The core idea of the Product is to establish a common blueprint for a family of related objects. Within the [[Python - Factory Method Design Pattern|Factory Method pattern]], this is typically achieved in Python using an Abstract Base Class (ABC). This abstract class, like the `Resource` example, declares one or more abstract methods (e.g., `reference`). Any class that inherits from this Product, known as a [[Python - Concrete Product (Factory Method Pattern)|Concrete Product]], is forced by the programming language to provide its own implementation for these abstract methods. This enforces a consistent API across all objects the factory can create, promoting polymorphism and decoupling the client code from specific implementations.

#### Primary Goal

To define a consistent interface for a family of objects, ensuring that client code can work with any object created by the factory without needing to know its specific concrete class.

#### Mechanism

- **How it Works:** The Product establishes a contract that all concrete implementations must follow.
    1. **Define an Interface/Abstract Class:** An abstract class is created (e.g., `Resource`) that serves as the blueprint. It cannot be instantiated directly.
    2. **Declare Abstract Methods:** Within this class, one or more methods are decorated with `@abstractmethod` (e.g., `reference`). These methods have no implementation in the abstract class itself.
    3. **Enforce Implementation:** Any subclass that inherits from the Product abstract class *must* provide a concrete implementation for all inherited abstract methods. If it fails to do so, Python will raise a `TypeError` when you try to instantiate it.

##### Code Translation

```python
from abc import ABC, abstractmethod

# --- Step 1 & 2: Define the Product interface with an abstract method ---
# This is the 'Product'. It defines the contract.
class Resource(ABC):
    """
    The Product interface declares the operations that all concrete products must implement.
    """
    @abstractmethod
    def reference(self, topic: str) -> list:
        """
        A method that all concrete resources must implement.
        """
        pass

# This is a 'Concrete Product' that implements the 'Product' interface.
# See [[Python - Concrete Product (Factory Method Pattern)]] for more detail.
class Textbook(Resource):
    """
    A Concrete Product that provides a specific implementation of the Resource interface.
    """
    def __init__(self):
        self.index = {"Object-Oriented Programming": ["Inheritance", "Polymorphism", "Encapsulation"]}

    def reference(self, topic: str) -> list:
        print(f"Referencing {topic} using a textbook")
        return self.index.get(topic, [])

# Another Concrete Product (e.g., Blog, Video) would also inherit from Resource
# and provide its own implementation of the reference() method.
```

 [[Code - Product (Factory Method Pattern) Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Scope of the Interface:**
    - Deciding which methods should be abstract is a critical design choice. The interface should be general enough to apply to all possible concrete products but specific enough to be useful.
    - Overly broad interfaces can be meaningless, while overly specific ones can be too restrictive and violate the principle of loose coupling.
- **Inclusion of Concrete Methods:**
    - A Product interface (especially an ABC) can contain both abstract methods and concrete methods. Concrete methods provide default behavior that can be shared or overridden by subclasses, which can be a way to follow the [[SWE - DRY (Don't Repeat Yourself) Principle|DRY principle]].

#### Core Trade-offs

- **Pro: Enforces Consistency and Polymorphism:**
    - The primary benefit is that it guarantees any object produced by the factory will have the expected methods, allowing client code to treat all products uniformly. This is the essence of polymorphism.
- **Pro: Decoupling:**
    - The client code depends only on the Product interface, not on the specific concrete classes. This makes it easy to introduce new [[Python - Concrete Product (Factory Method Pattern)|concrete products]] without modifying the client.
- **Con: Increased Boilerplate/Complexity:**
    - For very simple cases, defining a formal interface might feel like unnecessary overhead. It adds another layer of abstraction to the system.
- **Con: Rigidity:**
    - Once an interface is defined and widely used, changing it can be difficult as it requires updating all implementing classes. This can make the design rigid if not planned carefully.

## Connections

```
```
                           (Parent)
                Factory Method Design Pattern
                              ▲
                              │
┌─────────────────────────────┼─────────────────────────────┐
│                             │                             │
(Defines Contract For)   ┌───────────────────────────┐   (Implemented By)
Factory Method           │          Product          │   Concrete Product
                         └───────────────────────────┘
```
```

### Parent Concept

The Product is a fundamental component of the [[Python - Factory Method Design Pattern|Factory Method design pattern]], serving as the contract for all objects the factory can create.

### Child Concepts

- The direct implementation of this interface is the [[Python - Concrete Product (Factory Method Pattern)|concrete product]], which provides the specific logic for the methods defined in the Product.

### Related Concepts 

- The Product defines the common interface that is central to the [[Python - Factory Method & Interface Relationship|relationship between the factory and the objects it creates]].
- One of the key [[Python - Benefits of Factory Methods|benefits of using factory methods]] is the ability to work with the abstract Product interface, decoupling client code from concrete implementations.
- When you [[Python - Refactoring to a Factory Method|refactor code to use a factory method]], the first step is often to identify or create the common Product interface that different object types can share.
## Questions

- Imagine our `Resource` product interface needs to be extended to support asynchronous fetching. How would you modify the `reference` method contract to accommodate both synchronous and asynchronous concrete products without breaking existing client code, and what business trade-offs (e.g., performance vs. development complexity) would you present to the product manager?
- In a large-scale system with dozens of `ConcreteProduct` classes implementing the `Resource` interface, how would you design a registration and discovery mechanism so that the factory can be aware of new `Resource` types automatically (e.g., via plugins) without needing to modify the factory's source code?
- What if the 'Product' wasn't a class interface but a structural contract (duck typing)? Could you achieve the goals of the Factory Method pattern in Python without using an ABC, and what potential risks or maintenance challenges would this introduce?