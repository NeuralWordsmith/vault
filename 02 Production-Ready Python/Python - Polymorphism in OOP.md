---
tags: 
  - core
  - python
  - polymorphism
  - method_overriding
  - dynamic_dispatch
  - oop
  - inheritance
  - concept
source: 
  - "[[Introduction to Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Method Overriding]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Method Overriding & Polymorphism Relationship]]"
  - "[[Python - Adding New Methods to Child Classes]]"
  - "[[Python - Customizing Child Class Constructors]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Python - Objects]]"
  - "[[Python - Class Methods]]"
  - "[[Fundamental - Programming]]"
---
# Core: Polymorphism

## Summary

>Polymorphism, a core principle of Object-Oriented Programming, is the ability for objects of different classes to respond to the same method call in different, class-specific ways. As shown in the bank account example, calling `.withdraw()` on a `BankAccount` object executes the parent class's code, while calling the exact same method on a `CheckingAccount` object executes its own specialized version. The interface is identical, but the behavior adapts to the object's actual type.

**Why This Matters:** Polymorphism allows you to write flexible, reusable code that can process objects of different classes through a single, consistent interface, dramatically reducing complexity and eliminating the need for cumbersome type-checking.

_Analogy:_ _Think of a universal remote control. It has a single 'Power' button. When you point the remote at your TV and press 'Power', the TV turns on. When you point the same remote at your soundbar and press the exact same 'Power' button, the soundbar turns on. The button (the interface) is the same, but the action that occurs (the implementation) depends on the object it's interacting with (the TV or the soundbar)._

Where it breaks down: The remote control sends a signal to an external device, which then performs the action. In polymorphism, the object itself contains the code to be executed. The `CheckingAccount` object doesn't send a signal; it *is* the thing that executes its own unique `withdraw` method.

```
```
Object         Method Call          Which code runs?
-----------    -------------        ----------------------------------

check_acct  ───► .withdraw(200) ───► CheckingAccount's withdraw() code
(type is                                (includes fee logic)
CheckingAccount)


bank_acct   ───► .withdraw(200) ───► BankAccount's withdraw() code
(type is                                (simple subtraction)
BankAccount)
```
```

## Details

Polymorphism, from the Greek for 'many forms', is a fundamental concept in [[Python - Object-Oriented Programming (OOP)]] that allows a single interface to represent different underlying data types. It enables a parent class to define a method, and for child classes to provide their own unique implementations of that method. The power of this idea is that the program determines at runtime which specific method to call based on the object's class, allowing for more dynamic and adaptable code. This is most commonly achieved through [[Python - Method Overriding|method overriding]], where a child class provides a specific implementation for a method already defined in its parent.

#### Primary Goal

To allow objects of different classes to be treated uniformly through a common interface, making code more generic, flexible, and extensible.

#### Mechanism

- **How it Works (Dynamic Dispatch):**
    1. **Common Interface:** A base (parent) class defines a method, establishing a common interface for all its subclasses. For example, `BankAccount` defines a `withdraw()` method.
    2. **Specialized Implementation:** A derived (child) class inherits from the base class and provides its own version of that method. This is known as [[Python - Method Overriding|method overriding]]. For instance, `CheckingAccount` overrides `withdraw()` to add a fee.
    3. **Method Invocation:** A method is called on an object (e.g., `check_acct.withdraw(200)`).
    4. **Runtime Resolution:** At the moment the code is executed, the Python interpreter looks at the actual class of the object (`CheckingAccount` in this case) and calls its specific version of the method. If the child class hadn't overridden the method, the interpreter would move up the inheritance chain and call the parent's version.

##### Code Translation

```python
# --- Step 1: Define the Parent Class with a base method ---
class BankAccount:
    def __init__(self, balance):
        self.balance = balance

    def withdraw(self, amount):
        self.balance -= amount
        print(f"Parent BankAccount: Withdrew ${amount}. New balance: ${self.balance}")
        return self.balance

# --- Step 2: Define the Child Class that overrides the method ---
class CheckingAccount(BankAccount):
    def __init__(self, balance, fee):
        super().__init__(balance)
        self.fee = fee

    # This method overrides the parent's withdraw method
    def withdraw(self, amount):
        # Apply the checking account specific logic (the fee)
        total_to_withdraw = amount + self.fee
        self.balance -= total_to_withdraw
        print(f"Child CheckingAccount: Withdrew ${amount} + ${self.fee} fee. New balance: ${self.balance}")
        return self.balance

# --- Step 3: Instantiate objects of both classes ---
check_acct = CheckingAccount(1000, 25)
bank_acct = BankAccount(1000)

# --- Step 4: Call the same method on both objects ---
# Python dynamically calls the CheckingAccount version
print("Calling withdraw on CheckingAccount object:")
check_acct.withdraw(200)

print("\n" + "-"*20 + "\n")

# Python calls the base BankAccount version
print("Calling withdraw on BankAccount object:")
bank_acct.withdraw(200)

# Output:
# Calling withdraw on CheckingAccount object:
# Child CheckingAccount: Withdrew $200 + $25 fee. New balance: $775
#
# --------------------
#
# Calling withdraw on BankAccount object:
# Parent BankAccount: Withdrew $200. New balance: $800
```

 [[Code - Polymorphism Implementation|View Full Implementation & Analysis]]

#### Key Parameters



#### Core Trade-offs

- **Pro: Code Reusability and Flexibility**
    - Allows you to write generic functions that can operate on objects of any subclass. For example, a function `process_accounts(accounts_list)` could loop through a list of mixed `BankAccount` and `CheckingAccount` objects and call `.withdraw()` on each, without needing to know the specific type.
- **Pro: Extensibility**
    - New classes (e.g., `SavingsAccount`, `InvestmentAccount`) can be added to the system with their own `withdraw` logic, and existing code that uses the `BankAccount` interface will work with them automatically without any changes.
- **Con: Reduced Readability**
    - When looking at a line like `account.withdraw()`, it's not immediately obvious which version of the method will be executed. You must know the specific type of the `account` object at that point in the code, which can make debugging more complex.

## Connections

```
```
          (Parent)
Object-Oriented Programming
           ▲
           │
┌──────────┴──────────┐
│     Polymorphism    │
└─────────────────────┘

(Mechanism)                                (Foundation)
Method Overriding                          Inheritance
```
```

### Parent Concept

Polymorphism is one of the four fundamental pillars of [[Python - Object-Oriented Programming (OOP)|Object-Oriented Programming]], alongside encapsulation, inheritance, and abstraction.

### Child Concepts



### Related Concepts 

- The primary mechanism for achieving polymorphism in Python is [[Python - Method Overriding|method overriding]], where a child class provides a specific implementation for a method defined in its parent.
- The [[Python - Method Overriding & Polymorphism Relationship|relationship between method overriding and polymorphism]] is that overriding is the *how* and polymorphism is the *what*—it's the resulting behavior.
- Polymorphism relies on the foundational concept of inheritance, which is established in the [[Python - Class Definition|class definition]] of a child class.
- [[Python - Adding New Methods to Child Classes|Adding new methods]] extends a child class's functionality, while polymorphism modifies existing functionality from the parent.
## Questions

- Imagine a payment processing system that handles `CreditCard`, `PayPal`, and `Crypto` payments, all inheriting from a `PaymentMethod` class. How would you use polymorphism to design the `process_payment()` method? What's the business risk if the `Crypto` implementation has a subtle bug that the others don't, and how does polymorphism make this risk harder to spot during a code review?
- If we have a list containing thousands of objects from different subclasses of a `Vehicle` class, and we call `vehicle.calculate_fuel_efficiency()` on each one, what are the performance implications of Python's dynamic dispatch mechanism at this scale compared to a non-polymorphic approach using `if/elif` type checks?
- What if Python did not support method overriding? Could you still achieve a form of polymorphism? What design patterns or language features (like first-class functions) could you use to simulate this behavior, and what would be the major drawbacks?