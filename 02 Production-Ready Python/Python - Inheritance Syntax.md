---
tags: 
  - core
  - python
  - inheritance
  - subclassing
  - parent-child
  - oop
  - class syntax
  - concept
source: 
  - "[[Introduction to Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Class Inheritance]]"
  - "[[Python - Code Reuse in OOP]]"
  - "[[Python - Parent and Child Classes]]"
  - "[[Python - isinstance() with Inheritance]]"
  - "[[Python - BankAccount Inheritance Example]]"
  - "[[Python - Inheritance & Polymorphism Relationship]]"
  - "[[Python - super()]]"
  - "[[Python - Method Overriding]]"
  - "[[Python - Multiple Inheritance]]"
  - "[[Python - Method Resolution Order (MRO)]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Fundamental - Programming]]"
  - "[[Python - Objects]]"
---
# Core: Implementing Class Inheritance

## Summary

>Implementing inheritance in Python involves defining a new class and specifying the class it should inherit from in parentheses after its name, using the syntax `class Child(Parent):`. This creates a direct parent-child relationship, allowing the child class to automatically gain the parent's attributes and methods without rewriting them. This is a core practice for achieving [[Python - Code Reuse in OOP|code reuse]].

**Why This Matters:** This syntax is the fundamental mechanism for enabling code reuse and building logical hierarchies in object-oriented programming, drastically reducing redundancy.

_Analogy:_ _Think of a blueprint for a standard house (the `BankAccount` class). An architect can take this blueprint and create a new one for a 'House with a Solar Panel' (the `SavingsAccount` class). The new blueprint doesn't redraw the entire house; it simply *inherits* all the standard rooms and structure from the original and then adds the new solar panel feature. The `pass` keyword is like creating the new blueprint but not adding any new features yet—it's identical to the original for now._

The **Standard House Blueprint** is the parent class (`BankAccount`).
The **'House with Solar Panel' Blueprint** is the child class (`SavingsAccount`).
The **Inherited Rooms and Structure** are the inherited methods and attributes like `__init__` and `withdraw`.
The **Solar Panel** represents new, specialized functionality that can be added to the child class later.
**Where it breaks down:** Unlike physical blueprints, a change to the parent class blueprint (`BankAccount`) can instantly and automatically propagate to all child class blueprints (`SavingsAccount`) that inherit from it, which isn't true for physical copies.

```
      [BankAccount] (Parent)
           │
           └── inherits from
           │
    [SavingsAccount] (Child)
```

## Details

In object-oriented programming, we often want to create specialized versions of existing classes. For example, given a general `BankAccount` class, we might want to create a `SavingsAccount` class. Instead of copying and pasting the code, Python provides a simple syntax to establish an inheritance relationship. By writing `class SavingsAccount(BankAccount):`, we tell Python that `SavingsAccount` is a specialized version of `BankAccount`, automatically granting it all the parent's capabilities. This establishes the formal link between [[Python - Parent and Child Classes|parent and child classes]] and is a cornerstone of [[Python - Object-Oriented Programming (OOP)]].

#### Primary Goal

To provide a direct and readable syntax for creating a new class that reuses and extends the functionality of an existing class.

#### Mechanism

- **Step 1: Define the Parent Class**
    - First, create the base or parent class with its initial attributes and methods. In our case, this is the `BankAccount` class, which has a balance and a `withdraw` method.
- **Step 2: Define the Child Class with Inheritance Syntax**
    - Declare the new, specialized class. To make it inherit, place the parent class's name in parentheses directly after the new class name: `class SavingsAccount(BankAccount):`.
- **Step 3: Implement the Child Class Body**
    - For a simple inheritance where the child just gets all the parent's functionality without adding anything new yet, use the `pass` keyword. This tells Python the class definition is complete, even though its body is empty.
- **Step 4: Verify Inheritance**
    - Create an instance of the child class (`SavingsAccount`). You can then call methods that were originally defined only in the parent class (`BankAccount`) on this new object to confirm that the functionality was successfully inherited.

##### Code Translation

```python
# --- Step 1: Define the Parent Class ---
class BankAccount:
    def __init__(self, balance):
        self.balance = balance

    def withdraw(self, amount):
        self.balance -= amount

# --- Step 2 & 3: Define the Child Class and use 'pass' ---
# This class inherits all functionality from BankAccount
class SavingsAccount(BankAccount):
    pass

# --- Step 4: Verify Inheritance ---
my_savings = SavingsAccount(1000)
print(f"Initial balance: {my_savings.balance}")

# The .withdraw() method was inherited from BankAccount
my_savings.withdraw(100)
print(f"Balance after withdrawal: {my_savings.balance}")
```

 [[Code - Implementing Class Inheritance Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Parent Class Name**
    - The class name specified inside the parentheses of the child class definition. This is the source of the inherited attributes and methods.
- **Child Class Name**
    - The new class being defined. It receives the functionality from the parent.
- **`pass` Keyword**
    - A placeholder statement. It is used when a class or function body is syntactically required, but you don't want to add any custom code yet. It allows the child class to exist while containing only the members inherited from the parent.

#### Core Trade-offs

- **Simplicity vs. Obscurity**
    - While the syntax is simple, it can hide complexity. It's not immediately obvious from looking at the child class alone what methods it contains; one must also inspect the parent class (and potentially its parents) to get a full picture.
- **Tight Coupling**
    - The child class becomes tightly coupled to the parent's implementation. A change in the parent class (e.g., changing a method's name or parameters) can unintentionally break the functionality of the child class.

## Connections

```
                      (Parent)
            Object-Oriented Programming
                       ▲
                       │
    ┌──────────────────┼──────────────────┐
    │                  │                  │
(Enables)     ┌───────────────────────────┐     (Defines)
Code Reuse    │ Implementing Inheritance  │     Parent/Child Classes
              └───────────────────────────┘
                         │
              ┌──────────┴──────────┐
              │                     │
      BankAccount Example     isinstance() Check
```

### Parent Concept

The implementation of inheritance is a core mechanism within the broader paradigm of [[Python - Object-Oriented Programming (OOP)]], which focuses on modeling real-world entities using objects and classes.

### Child Concepts

- This implementation is demonstrated in the [[Python - BankAccount Inheritance Example|BankAccount inheritance example]], which shows a practical application of creating a specialized account type.

### Related Concepts 

- This syntax is the foundation of [[Python - Class Inheritance|class inheritance]], defining the 'is-a' relationship between classes.
- The primary benefit of this implementation is [[Python - Code Reuse in OOP|code reuse]], as it avoids duplicating code from the parent class.
- This mechanism formally establishes the relationship between [[Python - Parent and Child Classes|parent and child classes]].
- Once inheritance is implemented, you can use the [[Python - isinstance() with Inheritance|isinstance() function]] to check if an object is an instance of a parent class.
- The relationship between inheritance and polymorphism is crucial, as [[Python - Inheritance & Polymorphism Relationship|inheritance is one way to achieve polymorphism]].
## Questions

- Imagine our `BankAccount` class is used by thousands of other classes in our banking application. If a business requirement forces a breaking change in the `withdraw` method's signature (e.g., adding a required 'reason' parameter), how would you manage the rollout of this change across the system to minimize disruption and cost?
- In a large-scale system with deep inheritance chains (e.g., `Asset` -> `FinancialAsset` -> `Stock` -> `USStock`), how would you design a system to trace method calls and debug issues? What tools or practices would you use to manage the complexity of 'Method Resolution Order' (MRO)?
- What if Python removed the `(ParentClass)` syntax for inheritance? How could you achieve a similar outcome of code reuse and specialization using only composition (i.e., creating objects of other classes inside your class)?