---
tags: 
  - relationship
  - python
  - method_signature
  - polymorphism_violation
  - typeerror
  - liskov_substitution_principle
  - interface_mismatch
  - concept
source: 
  - "[[Introduction to Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Polymorphism in OOP]]"
  - "[[Python - Method Overriding]]"
  - "[[Python - Inheritance]]"
  - "[[Python - Class Definition]]"
  - "[[Python - super()]]"
  - "[[Python - Abstract Base Classes]]"
  - "[[Python - Duck Typing]]"
  - "[[SWE - Liskov Substitution Principle]]"
  - "[[Python - Adding New Methods to Child Classes]]"
  - "[[Python - Customizing Child Class Constructors]]"
  - "[[Python - Error Handling]]"
---
# Relationship: Polymorphism Violation via Method Signature Mismatch

**Why This Matters:** Violating polymorphism by changing a method's signature in a subclass breaks the fundamental 'is-a' relationship promise of inheritance. It means you can no longer treat a child object as a parent object, leading to unexpected `TypeError` exceptions and making the code brittle, unpredictable, and difficult to maintain.
## The Relationship Defined

**Type:** Violation

> This issue occurs when a child class overrides a parent class method but changes its signature—the number, order, or names of its parameters. As shown with the `BankAccount` and `CheckingAccount` example, the parent's `withdraw(amount)` method is incompatible with the child's `withdraw(amount, fee)` method. This breaks the unified interface that is the cornerstone of [[Python - Polymorphism in OOP|polymorphism]], because the methods can no longer be called in the same way. While this is a form of [[Python - Method Overriding|method overriding]], it's an incorrect implementation that undermines the benefits of inheritance.

_Analogy:_ _Imagine a universal remote control designed to work with any television ('parent class'). The 'power' button on this remote is the standard interface (`power()` method). Now, you buy a new, fancy TV ('child class') that requires you to press 'power' and 'enter' simultaneously to turn on. The manufacturer has changed the 'power' method's signature to `power(confirmation_key)`. Your universal remote, which only knows how to send the simple 'power' command, can no longer turn on this new TV. The promise of a universal interface has been broken._

• **Parent Class (Universal Remote):** The base `BankAccount` class with its standard interface.
• **Child Class (Fancy TV):** The specialized `CheckingAccount` class.
• **Method (Power Button):** The `withdraw` method.
• **Original Signature (`power()`):** The original `withdraw(amount)` method call.
• **Modified Signature (`power(confirmation_key)`):** The new `withdraw(amount, fee)` method call.
• **Polymorphism Violation:** The universal remote (code that expects a `BankAccount`) cannot operate the new TV (the `CheckingAccount` object) using the new, required signature, causing an error.

**Where it breaks down:** In the real world, you might be able to reprogram the universal remote. In programming, 'reprogramming' the calling code with `if/else` checks to handle different object types is exactly the kind of complexity that polymorphism is designed to eliminate.

## Mechanism of Interaction

When a child class performs [[Python - Method Overriding|method overriding]] but alters the method's signature (the number or name of parameters), it creates a version of the method that is incompatible with the parent's version. This breaks the Liskov Substitution Principle, a cornerstone of polymorphism, which states that objects of a superclass should be replaceable with objects of a subclass without affecting the correctness of the program.

## Implications & Impact

The primary impact is that you can no longer treat objects of the parent and child classes interchangeably. Code that expects a `BankAccount` object will raise a `TypeError` if it receives a `CheckingAccount` and tries to call the `withdraw` method with the new signature. This forces the programmer to write special-case code to check the object's type, defeating the purpose of using polymorphism.

## Key Connections

- This concept is a direct violation of the principles of [[Python - Polymorphism in OOP|polymorphism]], which relies on a consistent interface across a class hierarchy.
- It arises from an incorrect application of [[Python - Method Overriding|method overriding]], where the goal should be to change behavior, not the method's signature.
- This contrasts with the valid technique of [[Python - Adding New Methods to Child Classes|adding entirely new methods]], which extends functionality without breaking the parent's interface.

## Deeper Questions

- Imagine you're designing a payment processing system. A new requirement comes in for a 'Premium' transaction type that must log the 'auditor_id' for every transaction. The base 'Transaction' class method is `process(amount)`. Would you modify the signature to `process(amount, auditor_id)` in the 'Premium' subclass, violating polymorphism, or find another way? Justify your decision in terms of long-term system maintainability and the risk of breaking existing integrations.
- If a widely-used base class in a large-scale application has one of its method signatures changed, what automated tools or strategies would you use to identify and refactor all the subclass implementations and external calls across the codebase to prevent widespread `TypeError` exceptions upon deployment?
- What if Python's interpreter was modified to *allow* this kind of polymorphism violation silently, by automatically ignoring extra arguments passed to the parent method and using default `None` values for missing arguments in the child method? What new categories of subtle, hard-to-debug logical errors might this introduce, even as it prevents `TypeError` exceptions?