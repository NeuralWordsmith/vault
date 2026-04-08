---
tags: 
  - process
  - python
  - inheritance
  - oop
  - __init__
  - subclassing
  - code_reuse
  - concept
source: 
  - "[[Software Engineering Principles in Python]]"
related: 
  - "[[Python - Class Inheritance]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Core Principles of OOP]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Objects]]"
  - "[[Python - Multiple Inheritance]]"
  - "[[Python - Abstract Base Classes (ABCs)]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Python - super()]]"
  - "[[Python - Method Overriding]]"
  - "[[Python - Descriptors]]"
  - "[[Python - Decorators]]"
  - "[[Python - Class Methods]]"
  - "[[Python - Parent and Child Classes 1]]"
  - "[[SWE - Class Inheritance & DRY Principle Relationship]]"
---
# Process: Implementing Class Inheritance

**Why This Matters:** Implementing class inheritance allows developers to reuse existing code from a parent class, which significantly reduces redundancy and promotes a more maintainable and scalable software architecture.
## Goal & Analogy

> **Goal:** Implementing class inheritance is the practical, step-by-step process in Python for creating a new class (the child) that inherits the attributes and methods of an existing class (the parent). This mechanism is a cornerstone of [[Python - Object-Oriented Programming (OOP)|Object-Oriented Programming (OOP)]] and the primary way to apply the [[SWE - DRY (Don't Repeat Yourself) Principle|DRY principle]] in class design. It involves specifying the parent in the child's definition and explicitly calling the parent's initializer to ensure the child object is built correctly upon the parent's foundation.

_Analogy:_ _Think of a master blueprint for a standard family home (ParentClass). This blueprint defines all the essential features: foundation, electrical wiring, plumbing, and room layouts. Now, a client wants a custom version of this home (ChildClass). Instead of redrawing everything from scratch, the architect takes the master blueprint and adds a new page for a custom sunroom and a larger garage. To build the house, the construction crew first follows all the instructions from the master blueprint (`ParentClass.__init__`) and then builds the custom additions. The final house has all the standard features plus the unique ones._

The custom home plan *is* the master blueprint plus additions. In Python, the child class *uses* the parent's `__init__` to set up its own instance (`self`), but it is a distinct object. The child doesn't literally contain a separate parent object; rather, it's a single object that incorporates the structure and behavior defined by both the parent and child classes.

```
      [ ParentClass ]
      - __init__(self)
      - parent_attribute
             ▲
             │ (inherits from)
             │
      [ ChildClass ]
      - __init__(self)  ──> calls ParentClass.__init__(self)
      - child_attribute
```

## The Step-by-Step Process

### Prerequisites / Inputs

- **Method of Parent Initialization**
    - Explicit Call: `ParentClass.__init__(self, ...)` is direct but can be brittle, especially in [[Python - Multiple Inheritance|multiple inheritance]] scenarios.
    - Using `super()`: `super().__init__(...)` is the modern, recommended approach. It's more robust as it automatically finds the correct parent method to call in the Method Resolution Order (MRO), making the code more maintainable.
- **Method Overriding**
    - A child class can provide its own implementation of a method that already exists in the parent class. This allows the child to modify or extend behavior while keeping the same method name (interface).

### The Steps

- **Step 1: Import the Parent Class**
    - Before a child class can inherit from a parent, it must be made available in the current scope. This is typically done with a standard import statement.
- **Step 2: Define the Child Class with Inheritance**
    - To establish the inheritance relationship, the `ParentClass` is passed as an argument into the `class` statement of the `ChildClass`. This syntax tells Python that `ChildClass` is a specialized version of `ParentClass`.
- **Step 3: Initialize the Parent within the Child's `__init__`**
    - This is the most crucial step. Inside the child's `__init__` method, you must explicitly call the parent's `__init__` method. By passing `self` to `ParentClass.__init__`, you are instructing Python to run the parent's setup process on the current instance of the child class. This populates `self` with all the attributes defined in the parent.
- **Step 4: Add Child-Specific Functionality**
    - After the parent's `__init__` has been called, the child instance is fully equipped with the parent's features. You can now safely define additional attributes and methods that are unique to the child class.

##### Code Translation

```python
# --- Assume this is in a file named 'parent_module.py' ---
class ParentClass:
    def __init__(self):
        self.parent_attribute = "I'm a parent class attribute!"

    def parent_method(self):
        return "This is a method from the Parent."

# --- In a separate file ---

# --- Step 1: Import the Parent Class ---
from parent_module import ParentClass

# --- Step 2: Define the Child Class with Inheritance ---
class ChildClass(ParentClass):
    def __init__(self):
        # --- Step 3: Initialize the Parent within the Child's __init__ ---
        # This call ensures self gets 'parent_attribute'
        ParentClass.__init__(self)

        # --- Step 4: Add Child-Specific Functionality ---
        self.child_attribute = "I'm a child class attribute!"

# Create an instance and verify inheritance
child_instance = ChildClass()

# Accessing the attribute unique to the child
print(child_instance.child_attribute)
# >>> I'm a child class attribute!

# Accessing the attribute inherited from the parent
print(child_instance.parent_attribute)
# >>> I'm a parent class attribute!

# Calling a method inherited from the parent
print(child_instance.parent_method())
# >>> This is a method from the Parent.
```

### Deliverables / Outputs

The core idea is to establish a formal parent-child relationship between classes, allowing the child to absorb the parent's functionality. The process, as outlined in the source material, involves three key actions: importing the parent, specifying it in the child's class definition, and, most critically, calling the parent's `__init__` method from within the child's `__init__`. This call ensures that the instance of the child class (`self`) is properly initialized with all the parent's attributes and methods before any child-specific functionality is layered on top. This is the direct implementation of the [[SWE - Class Inheritance & DRY Principle Relationship|relationship between inheritance and the DRY principle]].

## Context & Tradeoffs

### When to Use This Process

To ensure a child class correctly receives all the attributes and methods from its parent class, enabling code reuse and the ability to extend functionality without rewriting existing code.

### Common Pitfalls & Tradeoffs

- **Tight Coupling**
    - Inheritance creates a strong bond between the parent and child. A change in the parent class's implementation (e.g., changing the `__init__` signature) can break all of its subclasses. This makes the codebase more rigid.
- **Hierarchy Complexity**
    - Deep or wide inheritance chains can become difficult to reason about. Tracing a method call through multiple layers of parents can be confusing and error-prone.
- **Alternative: Composition over Inheritance**
    - Often, a more flexible design is to use composition, where a class *contains* an instance of another class (a "has-a" relationship) instead of inheriting from it (an "is-a" relationship). This reduces coupling and often leads to simpler designs.

## Connections

```
                      (Parent)
                Class Inheritance
                         ▲
                         │
         ┌───────────────┼────────────────────────────┐
         │               │                            │
(Related)       ┌───────────────────────────┐      (Related)
DRY Principle   │ Implementing Inheritance  │      Parent/Child Classes
                └───────────────────────────┘
                         │
              ┌──────────┴──────────┐
              │                     │
      Method Overriding      `super()` function
```


- This implementation process is the practical application of the concepts outlined in [[Python - Parent and Child Classes 1|parent and child classes]].
- It directly supports the [[SWE - DRY (Don't Repeat Yourself) Principle|DRY principle]] by reusing the parent's initialization logic, avoiding code duplication.
- Understanding the [[SWE - Class Inheritance & DRY Principle Relationship|link between inheritance and DRY]] is crucial for writing clean, maintainable object-oriented code.
- The [[Python - Benefits of Class Inheritance|benefits of class inheritance]], such as code reuse and logical structuring, are realized through this specific implementation pattern.

## Deeper Questions

- You're refactoring a legacy system where two classes share 80% of their code but have critical differences in the remaining 20%. Would you implement inheritance or use composition (creating a shared helper object)? Justify your choice in terms of long-term maintenance costs and the risk of future changes in one class unintentionally breaking the other.
- Imagine a deep inheritance chain (e.g., A -> B -> C -> D). If a performance bottleneck is discovered in a method defined in class A, how would you design a testing and deployment strategy to patch it without causing regressions in the dozens of subclasses that might override or extend this behavior in subtle ways?
- What if Python's `__init__` method could not be called explicitly from a subclass (i.e., `ParentClass.__init__(self)` and `super().__init__()` were forbidden)? How would you design a pattern to ensure that child objects are still correctly initialized with the parent's state?