---
tags:
  - visual-analysis
---

# Python - BankAccount Inheritance Example

**Why This Matters:** Inheritance allows you to create specialized classes from general ones, which is a cornerstone of building scalable and maintainable software by promoting code reuse.


> [!info] Info
> In this example, we are modeling different types of bank accounts. We start with a generic `BankAccount` class and then create more specific versions—a `SavingsAccount` and a `CheckingAccount`—that share common features but also have their own unique attributes and behaviors.

---

## The Example
![[Pasted image 20260224162617.png]]

**Visual Evidence Identified:**
- The `BankAccount` box represents the base (or parent) class, containing a `balance` attribute and a `withdraw()` method.
- The `SavingsAccount` and `CheckingAccount` boxes represent the derived (or child) classes.
- The red arrows pointing from `BankAccount` to the other two classes visually represent the inheritance relationship.
- The `SavingsAccount` adds a unique `interest_rate` attribute and `compute_interest()` method.
- The green arrow highlights that the `CheckingAccount` provides its own 'Modified version of withdraw()', a concept known as method overriding.

---

## Deconstruction & Analysis
*How this example demonstrates the concept:*

### **1. Establish the Parent Class**
We begin with the `BankAccount` class. It defines the most fundamental properties and actions that all bank accounts share: a `balance` to hold money and a `withdraw()` method to take money out. This class serves as a general blueprint.

### **2. Extend Functionality via Inheritance**
The `SavingsAccount` class inherits from `BankAccount`, as shown by the red arrow. This means it automatically gets the `balance` attribute and `withdraw()` method without needing to redefine them. It then *extends* the blueprint by adding its own specific features: an `interest_rate` and a `compute_interest()` method.

### **3. Modify Behavior via Inheritance**
The `CheckingAccount` also inherits from `BankAccount`. Like the `SavingsAccount`, it gets the `balance` attribute. However, it provides its own specialized implementation of the `withdraw()` method, as highlighted by the green arrow. This is called 'overriding'. A checking account's withdrawal logic might need to consider an overdraft `limit`, so it modifies the original behavior to suit its specific needs, while also adding a new `deposit()` method.

---

## Core Takeaway
*The general principle proved by this example:*

This visual demonstrates that inheritance is a powerful tool for creating a hierarchy of related classes. A child class can reuse functionality from a parent class, extend it by adding new attributes and methods (like `SavingsAccount`), or modify existing behavior to fit specialized needs (like `CheckingAccount` overriding `withdraw()`). This 'is-a' relationship (e.g., a SavingsAccount 'is-a' BankAccount) is fundamental to object-oriented design.