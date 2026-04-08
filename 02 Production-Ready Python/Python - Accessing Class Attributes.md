---
tags: 
  - core
  - python
  - shared_state
  - class_variable
  - static_variable
  - oop
  - namespace
  - concept
source: 
  - "[[Introduction to Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Class vs Instance Attributes]]"
  - "[[Python - Instance Attributes]]"
  - "[[Python - Modifying Class Attributes on an Instance]]"
  - "[[Python - Use Cases for Class Attributes]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Inheritance]]"
  - "[[Python - Scope]]"
  - "[[Python - self Keyword]]"
  - "[[Python - __init__ Method]]"
  - "[[Python - Methods]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Python - Encapsulation]]"
  - "[[Python - Class Methods]]"
---
# Core: Class Attributes

## Summary

>A class attribute is a variable defined directly within a class's scope, outside of any instance methods like `__init__`. Its value is shared across all instances (objects) of that class. This stands in direct contrast to [[Python - Instance Attributes]], which hold data unique to each specific object. Understanding this distinction is the central theme of [[Python - Class vs Instance Attributes]].

**Why This Matters:** Class attributes provide a single source of truth for data that should be shared across all instances of a class, ensuring consistency and efficient memory usage for constant values.

_Analogy:_ _Think of a class as a blueprint for a 'Company' and each object instance as an 'Employee'. The company's official 'Street Address' is a class attribute. Every employee, no matter who they are, works at the same company address. If the company moves, the address is updated in one place (the class), and this new address instantly applies to all employees. In contrast, each employee's 'Employee ID' would be an instance attribute, as it's unique to each person._

**Where it breaks down:** The analogy holds well for read-only data. However, in Python, an individual employee (instance) could put a sticky note with a different address on their own desk. This doesn't change the official company address, but it creates a local override for that one employee. This reflects the concept of [[Python - Modifying Class Attributes on an Instance]], where an instance can 'shadow' the class attribute with its own version.

```
Class Scope vs. Instance Scope

+---------------------------------+
| class Employee:                 |
|                                 |
|   +-------------------------+   |
|   | MIN_SALARY = 30000      |   |  <-- One copy, shared by all
|   +-------------------------+   |
|                                 |
+---------------------------------+
          ▲                ▲
          │                │
  (shares)│                │(shares)
          │                │
+----------------+   +----------------+
| e1 (instance)  |   | e2 (instance)  |
|----------------|   |----------------|
| name: "Alice"  |   | name: "Bob"    |
| salary: 50000  |   | salary: 75000  |
+----------------+   +----------------+
```

## Details

Class attributes are properties that belong to the class itself, not to any particular instance. They serve as shared data or constants for all objects created from that class. As described in the source material, we access them within the class using the `ClassName.Attribute` syntax, not `self.attribute`, to make it clear we are referencing a shared class-level variable. This mechanism is a cornerstone of effective [[Python - Object-Oriented Programming (OOP)]] for managing shared state and configuration.

#### Primary Goal

To store data that is constant or shared across all instances of a class, avoiding data duplication and providing a single, authoritative value.

#### Mechanism

- **Step 1: Define the Class Attribute**
    - A class attribute is declared directly inside the class definition, but outside of any methods. Here, `MIN_SALARY` is defined for the `Employee` class.
- **Step 2: Access the Attribute within the Class**
    - Inside a method like `__init__`, the attribute is accessed using the class name (`Employee.MIN_SALARY`). This avoids confusion with an instance attribute that might be named `self.MIN_SALARY`.
- **Step 3: Observe Shared Value Across Instances**
    - When we create multiple objects (`e1`, `e2`), they both access the *same* class attribute. There is only one copy of `MIN_SALARY` that both instances share.

##### Code Translation

```python
class Employee:
    # --- Step 1: Define the Class Attribute ---
    # This value is shared by all instances of the Employee class.
    MIN_SALARY = 30000

    def __init__(self, name, salary):
        self.name = name
        
        # --- Step 2: Access the Attribute within the Class ---
        # We use the class name to access the class attribute for a check.
        if salary < Employee.MIN_SALARY:
            raise ValueError(f"Salary cannot be less than {Employee.MIN_SALARY}")
        self.salary = salary

# --- Step 3: Observe Shared Value Across Instances ---
# Create two instances of the Employee class.
e1 = Employee("Alice", 50000)
e2 = Employee("Bob", 75000)

# Accessing the class attribute from each instance yields the same value.
print(f"Employee 1 Min Salary: {e1.MIN_SALARY}") # Output: 30000
print(f"Employee 2 Min Salary: {e2.MIN_SALARY}") # Output: 30000

# You can also access it directly from the class.
print(f"Class Min Salary: {Employee.MIN_SALARY}") # Output: 30000
```

 [[Code - Class Attributes Implementation|View Full Implementation & Analysis]]

#### Key Parameters



#### Core Trade-offs

- **Pro (Memory Efficiency)**
    - The attribute's value is stored only once in the class's namespace, not duplicated in every instance. This is efficient for constants or large data structures shared by many objects.
- **Pro (Single Source of Truth)**
    - It provides a centralized place to store and update a value that affects all instances, aligning with the [[SWE - DRY (Don't Repeat Yourself) Principle]].
- **Con (Risk with Mutable Types)**
    - If a class attribute is a mutable type (e.g., a list or dictionary), a change made through one instance will affect all other instances, often leading to unexpected bugs. For example, `e1.shared_list.append(5)` would also change `e2.shared_list`.
- **Con (Attribute Shadowing)**
    - Assigning a value to a class attribute via an instance (e.g., `e1.MIN_SALARY = 35000`) does not change the class attribute. Instead, it creates a new *instance attribute* with the same name that 'shadows' the class attribute for that specific instance. This is the core concept of [[Python - Modifying Class Attributes on an Instance]].

## Connections

```
                 (Parent)
          Python - Class Definition
                     ▲
                     │
┌────────────────────┼────────────────────┐
│                    │                    │
(Contrasts With) ┌───────────────────┐ (Explores)
Instance Attrib. │ Class Attributes  │ Class vs Instance Attrib.
                 └───────────────────┘
                     │
                     │
                 (Explores)
 Modifying Class Attrib. on an Instance
```

### Parent Concept

Class attributes are a fundamental component defined within a [[Python - Class Definition]], establishing shared state for the class.

### Child Concepts



### Related Concepts 

- It directly **contrasts with** [[Python - Instance Attributes]], which store data unique to each object created from a class.
- Understanding both is essential for grasping the full picture of [[Python - Class vs Instance Attributes]].
- The behavior of class attributes is a key element in [[Python - Inheritance]], as subclasses can inherit and override them from parent classes.
- Properly using class attributes for constants is a practical application of the [[SWE - DRY (Don't Repeat Yourself) Principle]].
- Class attributes are one of the mechanisms used to achieve [[Python - Encapsulation]] by bundling shared data with the class that operates on it.
## Questions

- You're designing a system for a retail company. You need to store the VAT rate, which is constant for all products but might change once a year due to new legislation. Would you use a class attribute on the `Product` class, a global constant in a config file, or a value fetched from a database? Justify your choice based on maintainability, scalability, and business agility.
- In a multi-threaded application, multiple threads are creating instances of a class that has a mutable class attribute (e.g., a list of active user sessions). What race conditions or data integrity issues might arise, and what synchronization mechanisms (like locks) would you implement to ensure thread safety?
- What if Python's attribute lookup mechanism was reversed—it checked for an instance attribute first, and if not found, it would *not* look for a class attribute? How would this fundamental change break common OOP patterns, and how would you have to redesign classes that rely on shared constants or state?