---
tags: 
  - comparison
  - python
  - oop
  - abstraction
  - polymorphism
  - contract
  - blueprint
  - concept
source: 
  - "[[Intermediate Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Interfaces]]"
  - "[[Python - Abstract Methods 1]]"
  - "[[Python - Formal Interfaces]]"
  - "[[Python - Informal Interfaces]]"
  - "[[Python - Duck Typing]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Inheritance]]"
  - "[[Python - Polymorphism]]"
  - "[[Python - Encapsulation]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[SWE - Do One Thing Principle]]"
---
# Comparison: Interfaces vs. Abstract Base Classes

## Why This Comparison Matters

> In Python's object-oriented programming, Interfaces and Abstract Base Classes (ABCs) are both tools for abstraction, but they serve different purposes. Interfaces define a strict 'contract' of methods that a class must implement, creating a 'must-do' or 'can-do' relationship, ideal for interchangeable classes. In contrast, Abstract Base Classes provide a 'blueprint' for a family of related classes, sharing common characteristics and code, establishing an 'is-a' relationship.

_Analogy:_ _Think of an Interface as a universal power outlet (like a USB-C port). The port defines a contract: any device, whether it's a phone, a hard drive, or a monitor, *must* have a USB-C plug to connect. The port doesn't care what the device *is*, only that it *can do* the action of connecting. An Abstract Base Class is like a blueprint for a specific type of vehicle, say a 'Sedan'. The blueprint mandates certain features every sedan must have (e.g., four doors, a trunk - these are abstract methods), but it also provides some pre-built, shared components (e.g., a standard chassis design - a concrete method). Any car built from this blueprint *is a* Sedan._

**Where it breaks down:** The power outlet analogy perfectly captures the idea of a [[Python - Formal Interfaces|formal interface]]. However, it doesn't fully represent [[Python - Informal Interfaces|informal interfaces]], which are more like an unwritten convention, akin to knowing that most coffee mugs have a handle you can grab, even if it's not a formal, enforced standard.

## Side-by-Side Comparison

- **Interfaces**
    - Define a 'contract' with classes that implement it.
    - Establishes a 'must-do' or 'can-do' relationship.
    - Can be formal (using `abc` module) or informal (convention-based).
    - Can only contain abstract methods; no concrete implementations.
    - Used for nearly identical, interchangeable classes that might be otherwise unrelated.
- **Abstract Base Classes (ABCs)**
    - Create a 'blueprint' for classes with common characteristics.
    - Establishes an 'is-a' relationship (inheritance).
    - Almost always formal, defined using the `abc` module.
    - Can contain a mix of both abstract and concrete methods.
    - Used for classes that look and feel similar, forming a conceptual family.

### Comparison Table

| Feature | Interfaces | Abstract Base Classes |
| :--- | :--- | :--- |
| **Relationship** | 'must-do' / 'can-do' (Contract) | 'is-a' (Blueprint/Inheritance) |
| **Method Types** | Abstract methods only | Mix of abstract and concrete methods |
| **Code Sharing** | No shared implementation | Can share concrete method implementations |
| **Formality** | Can be formal or informal | Almost always formal |
| **Primary Use Case** | Unrelated but interchangeable classes | A family of similar, related classes |

## Key Similarities

Both Interfaces and Abstract Base Classes are fundamental tools for abstraction in object-oriented programming. Neither can be instantiated directly. Their primary shared goal is to define a structure that other classes must adhere to, promoting polymorphism and enabling consistent handling of different objects that conform to the same standard.

## Verdict: When to Use Which

Use an **Interface** when you want to define a capability that can be implemented by any number of disparate, unrelated classes (e.g., anything that can be 'saved' or 'logged'). Use an **Abstract Base Class** when you are creating a family of closely related classes that share common code and identity (e.g., different types of 'file readers' or 'database connections').

### Comparative Code Example
```python
import abc

# --- Path 1: Interface (Contract for 'can-do' behavior) ---
# An interface typically only has abstract methods.
# It defines what an object can do (e.g., it can be serialized).
class ISerializable(abc.ABC):
    @abc.abstractmethod
    def to_json(self):
        """Return a JSON serializable dictionary representation."""
        pass

    @abc.abstractmethod
    def to_xml(self):
        """Return an XML string representation."""
        pass

# This class is NOT related to User, but it can be serialized.
class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def to_json(self): # Fulfills the contract
        return {'name': self.name, 'price': self.price}
    
    def to_xml(self): # Fulfills the contract
        return f'<product><name>{self.name}</name><price>{self.price}</price></product>'

# --- Path 2: Abstract Base Class (Blueprint for 'is-a' relationship) ---
# An ABC provides a blueprint for a family of related classes.
# It can contain a mix of abstract and concrete methods.
class DatabaseConnection(abc.ABC):
    def __init__(self, connection_string):
        self.connection_string = connection_string
        self.is_connected = False

    @abc.abstractmethod
    def connect(self):
        """Establish a connection to the database."""
        pass

    def disconnect(self): # Concrete method shared by all subclasses
        print("Closing the connection.")
        self.is_connected = False

# This class IS A type of DatabaseConnection.
class PostgresConnection(DatabaseConnection):
    def connect(self): # Implements the abstract method
        print(f"Connecting to PostgreSQL at {self.connection_string}")
        self.is_connected = True

# This class IS ALSO A type of DatabaseConnection.
class SQLiteConnection(DatabaseConnection):
    def connect(self): # Implements the abstract method
        print(f"Connecting to SQLite at {self.connection_string}")
        self.is_connected = True

```

## Broader Connections

```
┌───────────────────────────┐      vs.      ┌───────────────────────────┐
│        Interfaces         │               │  Abstract Base Classes    │
└───────────────────────────┘               └───────────────────────────┘
  Defines a "contract"  ────────── Relationship ────────── Creates a "blueprint"
      ("must-do")                                              ("is-a")

  Only abstract methods ────────── Method Types ────────── Mix of abstract & concrete

For interchangeable classes ───── Use Case ───── For similar, related classes
```

- The core concept of an [[Python - Interfaces|interface]] is to define a contract, which can be either a [[Python - Formal Interfaces|formal interface]] enforced by the language or an [[Python - Informal Interfaces|informal interface]] reliant on convention and [[Python - Duck Typing|duck typing]].
- Both interfaces and ABCs rely on [[Python - Abstract Methods 1|abstract methods]] to define the parts of the contract or blueprint that subclasses must implement.
- The relationship between a class and a [[Python - Formal Interfaces|formal interface]] is a strict [[Python - Formal Interfaces & Contract Enforcement Relationship|contract enforcement relationship]], ensuring compliance at instantiation time.

## Deeper Questions

- Imagine you're designing a plugin architecture for a large e-commerce platform. Would you use an Interface or an ABC for third-party developers to create new payment gateway plugins? Justify your choice in terms of long-term maintenance costs and developer onboarding friction.
- If you have a deep inheritance hierarchy built on ABCs, what are the potential 'ripple effects' or refactoring challenges if you need to change a concrete method in the base class? How does this compare to changing an Interface that's implemented by many unrelated classes?
- What if Python completely removed the `abc` module and formal ABCs? Could you still achieve the same level of code structure and safety using only informal interfaces and duck typing? What would be the biggest drawback of this approach in a large, collaborative project?