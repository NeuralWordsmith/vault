---
tags: 
  - core
  - python
  - dunder method
  - inheritance
  - polymorphism
  - operator overloading
  - equality
  - concept
source: 
  - "[[Introduction to Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Class Methods]]"
  - "[[Python - Comparison Operators]]"
  - "[[Python - __str__ Method]]"
  - "[[Python - __repr__ Method]]"
  - "[[Python - __str__ vs __repr__]]"
  - "[[Python - Objects]]"
  - "[[Python - Data Types]]"
  - "[[Python - Functions]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Python - Polymorphism]]"
  - "[[Python - Method Resolution Order (MRO)]]"
---
# Core: Equality in Inheritance (__eq__)

## Summary

>When comparing a parent object and a child object in Python using the `==` operator, Python's method resolution order dictates that the `__eq__` method of the child class is always invoked. This ensures the comparison logic is specific to the more specialized (child) class, regardless of whether the child object is on the left or right side of the operator. This is similar to how other dunder methods like [[Python - __str__ Method|__str__]] and [[Python - __repr__ Method|__repr__]] allow subclasses to provide their own specific string representations.

**Why This Matters:** This behavior ensures that comparisons are handled by the most specific implementation available, preventing child objects from being incorrectly equated to parent objects based on a less complete set of criteria.

_Analogy:_ _Imagine a general "Vehicle" manual and a specific "Tesla Model S" manual. If you ask a question about the Tesla's battery management system, you wouldn't consult the generic Vehicle manual. You'd always refer to the specific Tesla manual, even if the question was framed as "Compare this Vehicle (the Tesla) to a generic car." The Tesla manual (the child class's method) has the most specific, relevant information and overrides the general one._

**Where it breaks down:** In the real world, you could choose to ignore the specific manual. In Python, the method resolution order is not optional; it's a fixed rule. The child's method is *always* called if it exists when a child instance is involved in the operation.

```
Comparison: ba == sa
      │
      ▼
Python checks types: BankAccount, SavingsAccount
      │
      ▼
SavingsAccount is the subclass (more specific)
      │
      ▼
Call the subclass method:
SavingsAccount.__eq__(sa, ba)
```

## Details

The provided context demonstrates a crucial aspect of polymorphism in Python's Object-Oriented Programming. When an object from a child class (e.g., `SavingsAccount`) is compared for equality with an object from its parent class (e.g., `BankAccount`), Python consistently calls the `__eq__` method defined in the child class. This happens regardless of the order of comparison (`parent == child` or `child == parent`). This rule ensures that the comparison logic is always handled by the most specialized implementation available, preventing potential bugs where a child object might be considered equal to a parent object based on the parent's less specific criteria.

#### Primary Goal

To ensure that equality comparisons involving objects of different types in an inheritance hierarchy are handled by the most specific (subclass) implementation, promoting predictable and accurate behavior.

#### Mechanism

- **Step 1: Define the Parent Class**
    - Create a base class like `BankAccount` with its own `__eq__` method. This method defines equality based on a common attribute, such as the account `number`.
- **Step 2: Define the Child Class**
    - Create a class like `SavingsAccount` that inherits from `BankAccount`. This child class must also define its own `__eq__` method, overriding the parent's. This method can contain the same or different logic.
- **Step 3: Instantiate Objects**
    - Create one instance of the parent class (`BankAccount`) and one instance of the child class (`SavingsAccount`).
- **Step 4: Perform the Comparison**
    - Compare the two objects using the `==` operator. Observe that Python invokes the `__eq__` method from the child class (`SavingsAccount`), regardless of the comparison order (`ba == sa` or `sa == ba`).

##### Code Translation

```python
# --- Step 1: Define the Parent Class ---
class BankAccount:
    def __init__(self, number, balance=0):
        self.balance = balance
        self.number = number

    # Define __eq__ that returns True if the number attributes are equal
    def __eq__(self, other):
        print("BankAccount __eq__() called")
        return self.number == other.number

# --- Step 2: Define the Child Class ---
class SavingsAccount(BankAccount):
    def __init__(self, number, balance, interest_rate):
        BankAccount.__init__(self, number, balance)
        self.interest_rate = interest_rate

    # Define __eq__ that returns True if the number attributes are equal
    def __eq__(self, other):
        print("SavingsAccount __eq__() called")
        # A more robust implementation would check 'other' type
        return self.number == other.number

# --- Step 3: Instantiate Objects ---
ba = BankAccount(123, 10000)
sa = SavingsAccount(456, 2000, 0.05)

# --- Step 4: Perform the Comparison ---
print("Comparing ba == sa:")
result1 = (ba == sa) # Calls SavingsAccount.__eq__
print(f"Result: {result1}\n")

print("Comparing sa == ba:")
result2 = (sa == ba) # Also calls SavingsAccount.__eq__
print(f"Result: {result2}")

# Expected Output:
# Comparing ba == sa:
# SavingsAccount __eq__() called
# Result: False
#
# Comparing sa == ba:
# SavingsAccount __eq__() called
# Result: False
```

 [[Code - Equality in Inheritance (__eq__) Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`self`**
    - The instance on the left-hand side of the `==` operator. Python passes this argument automatically.
- **`other`**
    - The instance on the right-hand side of the `==` operator. Python passes this argument automatically.

#### Core Trade-offs

- **Pro (Predictability)**
    - This behavior is consistent and predictable. The more specific implementation always wins, which aligns with the principles of polymorphism and method overriding.
- **Con (Potential for Asymmetry)**
    - If the child's `__eq__` doesn't properly handle the case where `other` is an instance of the parent class, you can get unexpected `False` results. For true symmetric equality, you might need to check types explicitly (e.g., using `isinstance()`), which can add complexity.
- **Con (Liskov Substitution Principle)**
    - This behavior can subtly violate the Liskov Substitution Principle. If a `SavingsAccount` is a type of `BankAccount`, one might expect `BankAccount(123) == SavingsAccount(123)` to be `True`. The default override behavior makes it `False` unless you write specific code to handle this cross-type comparison, which is often not desirable.

## Connections

```
                  (Parent)
       Object-Oriented Programming
                   ▲
                   │
┌──────────────────┼──────────────────┐
│                  │                  │
(Related) ┌───────────────────────────┐     (Related)
__str__   │ Equality in Inheritance │  Comparison Operators
          └───────────────────────────┘
```

### Parent Concept

This concept is a specific application of method overriding within [[Python - Object-Oriented Programming (OOP)]].

### Child Concepts



### Related Concepts 

- The `__eq__` method is one of several "dunder" methods used for [[Python - Object String Representation|customizing object behavior]], much like [[Python - __str__ Method|__str__]] and [[Python - __repr__ Method|__repr__]] customize string conversion.
- This behavior is a direct consequence of Python's Method Resolution Order (MRO), which determines how methods are looked up in an inheritance hierarchy.
- Understanding this is crucial for correctly implementing [[Python - Comparison Operators|comparison operators]] for custom classes.
## Questions

- Imagine our `BankAccount` and `SavingsAccount` objects are used in an auditing system. If `ba == sa` evaluates to `False` even with the same account number, this could trigger false alarms. How would you modify the `__eq__` logic to consider them 'equivalent' for auditing purposes without making them strictly 'equal' in all other contexts, and what business risk does this custom logic introduce?
- If we introduce a third level of inheritance, say `HighInterestSavingsAccount`, how would you design the `__eq__` methods across all three classes to ensure that equality checks are both symmetric (`a == b` implies `b == a`) and transitive (`a == b` and `b == c` implies `a == c`)? What testing framework would you use to automatically verify these properties as the class hierarchy grows?
- What if Python's `==` operator, when comparing objects of different types, called *both* `__eq__` methods (e.g., `a.__eq__(b)` and `b.__eq__(a)`) and only returned `True` if both agreed? What existing programming patterns would this break, and what new kinds of bugs might it prevent?