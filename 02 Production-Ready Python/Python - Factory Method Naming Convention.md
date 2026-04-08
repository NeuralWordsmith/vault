---
tags: 
  - core
  - python
  - naming convention
  - protected method
  - pep 8
  - internal api
  - encapsulation
  - concept
source: 
  - "[[Intermediate Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Factory Method Design Pattern]]"
  - "[[Python - Product (Factory Method Pattern)]]"
  - "[[Python - Concrete Product (Factory Method Pattern)]]"
  - "[[Python - Benefits of Factory Methods]]"
  - "[[Python - Factory Method & Interface Relationship]]"
  - "[[Python - Refactoring to a Factory Method]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Class Methods]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Python - Scope]]"
---
# Core: Underscore for Factory Methods

## Summary

>In Python, it is a standard convention (defined in PEP 8) to prefix a method name with a single underscore, like `_get_resource`, to indicate it is intended for internal use within a class and its subclasses. While not enforced by the interpreter, this 'protected' status signals that the method is not part of the public API and could change without notice. This is commonly used for the creation method in the [[Python - Factory Method Design Pattern]] to separate the 'how' of object creation from the 'what' of the class's public functionality.

**Why This Matters:** This naming convention signals to other developers that a method is for internal object creation, preventing misuse and making the class's public interface clearer, which is crucial for long-term code maintainability.

_Analogy:_ _Think of a restaurant's kitchen. The public-facing menu and the waiter who takes your order are the class's public methods (like `explore_topic`). The 'Staff Only' door leading to the kitchen is the underscored factory method (`_get_resource`). Customers aren't supposed to go through that door to get their food; they use the public interface (the waiter). Only the restaurant staff (the class itself and its subclasses, like a specialized pastry kitchen) use that internal door to prepare and retrieve specific dishes (objects like `Textbook`, `Blog`, or `Video`)._

**Where it breaks down:** Unlike a locked 'Staff Only' door, Python doesn't actually stop you from opening it. A developer (a very determined customer) can still call the `_get_resource` method directly from outside the class. The underscore is a strong hint, a social contract among developers, not a physical barrier.

```
Client Code View vs. Internal Class View

External Client Code
        │
        │ Calls public method only
        ▼
┌──────────────────────────────────┐
│ class Student:                   │
│----------------------------------│
│ + explore_topic(...)             │  <-- Public API (Safe to use)
│                                  │
│ - _get_resource(...)             │  <-- Internal/Protected (Avoid direct call)
└──────────────────────────────────┘
        ▲
        │ explore_topic() calls this internally
        │
   Internal Logic
```

## Details

The use of a leading underscore for a factory method is a powerful Pythonic convention for communicating intent. It's a core aspect of encapsulation in [[Python - Object-Oriented Programming (OOP)]]. By marking the creation method like `_get_resource` as internal, a developer clearly separates the implementation detail of *how* an object is made from the public-facing methods that *use* that object. This tells other programmers, "You can rely on the public methods, but be careful with this one—it's part of the internal machinery that subclasses might need to change."

#### Primary Goal

To visually distinguish internal implementation details (like object creation logic) from the stable, public interface of a class, thereby improving code clarity and preventing accidental misuse.

#### Mechanism

- **How it Works:**
    1. A method name is prefixed with a single leading underscore (e.g., `_get_resource`).
    2. This acts as a signal to other developers that the method is 'protected'—intended for use only within the class or its subclasses.
    3. The Python interpreter does not enforce any access restrictions; it is purely a convention.
    4. In the context of the [[Python - Factory Method Design Pattern]], this convention is applied to the method responsible for instantiating and returning a [[Python - Product (Factory Method Pattern)|Product]]. This clearly marks it as the customizable part of the creation process for subclasses.
- **Contrasting Convention: Double Underscore (`__`)**
    - A double underscore prefix (e.g., `__get_resource`) triggers 'name mangling'. Python changes the name to `_ClassName__get_resource` to avoid naming conflicts in subclasses.
    - This is considered 'private' and is generally avoided for factory methods because they are *designed* to be easily overridden by subclasses, and name mangling makes this more difficult.

##### Code Translation

```python
# Assume Textbook, Blog, and Video are defined classes (Concrete Products)
class Textbook:
    def reference(self, topic):
        return f"Finding '{topic}' in the Textbook index."

class Blog:
    def reference(self, topic):
        return f"Searching for '{topic}' on the Blog."

class Video:
    def reference(self, topic):
        return f"Looking for timestamp of '{topic}' in the Video."

class Student: # This is the Creator class
    # --- Step 1: Define the Factory Method with an underscore --- 
    # This signals it's an internal method for creating resources.
    # Subclasses could override this to add new resource types.
    def _get_resource(self, resource_type):
        if resource_type == "Textbook":
            return Textbook()
        elif resource_type == "Blog":
            return Blog()
        elif resource_type == "Video":
            return Video()
        raise ValueError(f"Unknown resource type: {resource_type}")

    # --- Step 2: Use the Factory Method in a public method ---
    # This is the public API. The client code calls this method.
    # It doesn't need to know how the resource is created.
    def explore_topic(self, resource_type, topic):
        print(f"Client wants to explore '{topic}' using a '{resource_type}'.")
        resource = self._get_resource(resource_type) # Internal call
        return resource.reference(topic)

# --- Client Code ---
student = Student()
result = student.explore_topic("Blog", "Factory Pattern")
print(result)
# > Client wants to explore 'Factory Pattern' using a 'Blog'.
# > Searching for 'Factory Pattern' on the Blog.
```

 [[Code - Underscore for Factory Methods Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- This is a naming convention, not an algorithm, so it does not have parameters to tune. The key decision is simply whether to apply the underscore to a given method based on its intended visibility and role within the class design.

#### Core Trade-offs

- **Pro: Improved Readability**
    - It clearly communicates the architect's intent, making the class's public interface obvious and easier to understand for new developers.
- **Pro: Promotes Loose Coupling**
    - By discouraging direct calls to internal methods, it helps decouple client code from the implementation details of the class, making future refactoring safer.
- **Con: Not Enforced**
    - Its effectiveness relies on developer discipline. A developer can ignore the convention and call the method directly, creating brittle code that might break if the internal method is changed later.

## Connections

```
                      (Parent)
        Python - Object-Oriented Programming (OOP)
                         ▲
                         │
┌────────────────────────┼────────────────────────┐
│                        │                        │
(Implementation Of) ┌───────────────────────────┐ (Used To Create)
Factory Method      │ Underscore for Factory    │ Concrete Product
Design Pattern      │          Methods          │
                    └───────────────────────────┘
```

### Parent Concept

This naming convention is a key practice within [[Python - Object-Oriented Programming (OOP)]] for managing class interfaces and implementing encapsulation.

### Child Concepts



### Related Concepts 

- This convention is central to implementing the [[Python - Factory Method Design Pattern|Factory Method design pattern]], where the underscored method is the factory itself.
- The objects created by the factory, such as a [[Python - Concrete Product (Factory Method Pattern)|Concrete Product]], are the return values of the underscored method.
- Understanding this convention is crucial when [[Python - Refactoring to a Factory Method|refactoring code to use a Factory Method]], as it helps delineate the new internal creation logic from the existing public interface.
- The [[Python - Benefits of Factory Methods|benefits of factory methods]], such as decoupling, are enhanced by properly hiding the creation logic behind this 'protected' convention.
## Questions

- You're leading a team with junior developers who keep calling underscored methods directly from client code. What is the business risk here, and how would you explain the importance of respecting this convention in terms of long-term project maintenance costs and stability?
- Imagine the `_get_resource` factory method needs to create objects that require network calls or database connections. How does marking it as 'internal' influence your strategy for testing, mocking, and handling potential failures within the public `explore_topic` method that calls it?
- What if Python's core developers decided to strictly enforce single-underscore methods as private and inaccessible from outside the class, similar to other languages? How would this fundamentally change the flexibility of the Factory Method pattern and other patterns that rely on subclass overrides of 'protected' methods?