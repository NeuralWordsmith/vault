---
tags: 
  - core
  - python
  - inheritance
  - method extension
  - specialization
  - child class
  - oop
  - concept
source: 
  - "[[Introduction to Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Class Methods]]"
  - "[[Python - Customizing Child Class Constructors]]"
  - "[[Python - Method Overriding]]"
  - "[[Python - Polymorphism in OOP]]"
  - "[[Python - Method Overriding & Polymorphism Relationship]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Python - Objects]]"
  - "[[Python - Scope]]"
  - "[[Python - Functions]]"
  - "[[Fundamental - Software Engineering]]"
---
# Core: Adding Methods to Child Classes

## Summary

>In Object-Oriented Programming, child classes are not limited to the methods they inherit from a parent. We can add entirely new methods to a child class to give it unique functionality. The power of this technique is that these new methods can seamlessly access and operate on a combination of the child's own unique attributes and the attributes inherited from the parent class. This is a primary way to extend functionality without duplicating code and is distinct from [[Python - Method Overriding|method overriding]], where an existing parent method is redefined.

**Why This Matters:** This allows specialized child classes to perform unique actions using both their own specific data and the general data inherited from the parent, promoting code reuse and extensibility.

_Analogy:_ _Think of a standard car as the 'Parent Class' (`Car`). It has attributes like `fuel_level` and `speed`, and methods like `accelerate()` and `brake()`. Now, imagine a specialized 'Child Class' called `Ambulance`. The `Ambulance` inherits all the standard car features. We can then add a new, unique method to it called `activate_siren()`. This new method might check the `fuel_level` (an attribute from the parent `Car` class) to ensure there's enough gas, while also using its own unique attribute, `siren_loudness`, to determine how loud the siren should be._

*   **Parent Class (`Car`)**: The base `BankAccount` class with general attributes (`balance`).
*   **Child Class (`Ambulance`)**: The specialized `SavingsAccount` class.
*   **Inherited Attribute (`fuel_level`)**: The `balance` attribute inherited from `BankAccount`.
*   **Child's Own Attribute (`siren_loudness`)**: The `interest_rate` attribute unique to `SavingsAccount`.
*   **New Child Method (`activate_siren()`)**: The new `compute_interest()` method.
*   **Where it breaks down:** The analogy is physical. In programming, the child class doesn't physically 'contain' the parent. Instead, it extends the parent's blueprint, creating a new, more specialized blueprint.

```
Parent: BankAccount
  - Attributes: balance, owner
      ▲
      │ (Inherits)
      │
Child: SavingsAccount
  - Own Attribute: interest_rate
  - Own Method: compute_interest()
      │
      ├─> Accesses self.balance (from Parent)
      └─> Accesses self.interest_rate (from Child)
```

## Details

We can add methods to a child class in the same way we add them to any other class. The key benefit of this in [[Python - Object-Oriented Programming (OOP)|Object-Oriented Programming]] is that these new methods can seamlessly access and utilize data (attributes) from both the child class itself and its parent class. The example of a `SavingsAccount` class adding a `compute_interest` method, which uses its own `interest_rate` and the parent `BankAccount`'s `balance`, perfectly illustrates this principle of extending functionality.

#### Primary Goal

To allow a specialized (child) class to have unique behaviors that build upon the general state and functionality provided by its parent class.

#### Mechanism

- **Step 1: Define Parent and Child Classes**
    - First, establish a base `BankAccount` class. Then, create a `SavingsAccount` class that inherits from it. The child class will typically have its own constructor to initialize its unique attributes, a process detailed in [[Python - Customizing Child Class Constructors|customizing child class constructors]].
- **Step 2: Add a New Method to the Child Class**
    - Directly inside the `SavingsAccount` class definition, define a new method like `compute_interest(self, n_periods=1)`. This method is exclusive to `SavingsAccount` and its instances.
- **Step 3: Access Attributes from Both Parent and Child**
    - Within the new method, use the `self` keyword to access the necessary data. `self.balance` is accessed from the parent `BankAccount` class, while `self.interest_rate` is accessed from the `SavingsAccount` class itself.
- **Step 4: Instantiate and Use the New Method**
    - Create an object of the `SavingsAccount` class. You can now call the new `compute_interest` method on this object, and it will perform its calculation using the combined data.

##### Code Translation

```python
# --- Step 1: Define Parent and Child Classes ---
class BankAccount:
    def __init__(self, balance):
        self.balance = balance

class SavingsAccount(BankAccount):
    def __init__(self, balance, interest_rate):
        # Initialize parent attribute
        BankAccount.__init__(self, balance)
        # Initialize child's own attribute
        self.interest_rate = interest_rate

    # --- Step 2: Add a New Method to the Child Class ---
    # This method is unique to SavingsAccount
    def compute_interest(self, n_periods=1):
        # --- Step 3: Access Attributes from Both Parent and Child ---
        # self.balance is from BankAccount (Parent)
        # self.interest_rate is from SavingsAccount (Child)
        interest_amount = self.balance * ((1 + self.interest_rate) ** n_periods - 1)
        return interest_amount

# --- Step 4: Instantiate and Use the New Method ---
my_savings = SavingsAccount(balance=1000, interest_rate=0.05)
interest = my_savings.compute_interest(n_periods=2)

print(f"Interest earned over 2 periods: ${interest:.2f}")
# Expected Output: Interest earned over 2 periods: $102.50
```

 [[Code - Adding Methods to Child Classes Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`self` Keyword**
    - The crucial first parameter in any instance method. It acts as a reference to the object instance itself, providing the gateway to access all its attributes, whether they were defined in the child or inherited from the parent.
- **Method-Specific Parameters**
    - Standard parameters, like `n_periods` in the example, can be passed to the new method to provide additional, external data required for its specific calculation or action.

#### Core Trade-offs

- **Pro (Specialization & Reusability)**
    - Allows for creating highly specialized classes that build upon a common, reusable foundation. This strongly adheres to the [[SWE - DRY (Don't Repeat Yourself) Principle|DRY principle]] by avoiding code duplication.
- **Pro (Encapsulation)**
    - The logic for a specialized behavior is encapsulated within the specific child class where it belongs. This makes the overall codebase more organized, logical, and easier to maintain.
- **Con (Increased Complexity)**
    - As child classes accumulate more unique methods, the overall class hierarchy can become more complex. It may become difficult to quickly determine which methods are inherited, which are overridden, and which are new without inspecting the class definitions.

## Connections

```
                      (Parent)
           Object-Oriented Programming
                       ▲
                       │
    ┌──────────────────┼──────────────────┐
    │                  │                  │
(Related)     ┌───────────────────────────┐     (Related)
Method Overriding │ Adding Methods to Child Classes │ Polymorphism
                  └───────────────────────────┘
```

### Parent Concept

This concept is a fundamental technique within [[Python - Object-Oriented Programming (OOP)|Object-Oriented Programming (OOP)]], specifically leveraging the principle of inheritance to extend functionality.

### Child Concepts



### Related Concepts 

- This technique directly **complements** [[Python - Customizing Child Class Constructors|customizing child class constructors]], as a custom constructor is often needed to initialize the unique attributes that the new methods will use.
- It **contrasts with** [[Python - Method Overriding|method overriding]], where a child class redefines a method that *already exists* in the parent, rather than adding a completely new one.
- This capability is a prerequisite for achieving [[Python - Polymorphism in OOP|polymorphism]], as it allows different child classes derived from the same parent to have unique, callable methods.
## Questions

- Imagine you're building a banking application. You could add a `calculate_fraud_score()` method to a `CreditCardAccount` child class. What is the trade-off between implementing this complex logic directly in the child class versus creating a separate 'FraudService' class and having the method call that service? How would you justify the added system complexity of a separate service to a project manager?
- If you have a base `User` class and 15 different child classes (e.g., `AdminUser`, `GuestUser`, `PowerUser`), each with several unique added methods, how would you design a system to dynamically call a specific method on a user object without using a massive chain of `if/elif isinstance()` checks? What design pattern might be useful here?
- What if Python's inheritance model didn't allow child class methods to access parent attributes directly using `self`? How would you redesign the `SavingsAccount` example to achieve the same `compute_interest` functionality, and what would be the major drawbacks of that design?