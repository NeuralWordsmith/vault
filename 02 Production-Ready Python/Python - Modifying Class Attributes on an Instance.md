---
tags: 
  - core
  - python
  - shadowing
  - attribute lookup
  - instance override
  - class state
  - oop
  - concept
source: 
  - "[[Introduction to Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Class vs Instance Attributes]]"
  - "[[Python - Instance Attributes]]"
  - "[[Python - Accessing Class Attributes]]"
  - "[[Python - Use Cases for Class Attributes]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Encapsulation]]"
  - "[[Python - Inheritance]]"
  - "[[Python - Polymorphism]]"
  - "[[Python - Scope]]"
  - "[[Python - Objects]]"
  - "[[Python - __dict__]]"
---
# Core: Modifying Class Attributes

## Summary

>When you attempt to change a class-level attribute's value through a specific object (an instance), you are not modifying the original class attribute. Instead, Python creates a new instance-level attribute with the same name that 'shadows' or overrides the class attribute for that specific instance only. All other instances, which lack this new instance attribute, will continue to see the original, unchanged class attribute.

**Why This Matters:** Understanding this behavior is crucial for preventing unintended side effects, as it ensures that changing data in one object doesn't accidentally corrupt the shared state of all other objects from the same class.

_Analogy:_ _Think of a company's official dress code policy as a class attribute. The policy document (the class) states 'business casual' for everyone. Now, imagine one employee, Alex (an instance), decides to wear a bright yellow tie. Alex's choice to wear that tie doesn't change the company's official dress code for everyone else. Alex now has a personal style choice (an instance attribute) that overrides the general policy for themself. If you ask any other employee, like Beth, about the dress code, she will still refer to the original 'business casual' policy (the class attribute)._

Where it breaks down: In Python, you can explicitly delete the instance-level attribute (`del alex.dress_code`). When you do this, Alex immediately reverts to following the company's class-level policy again. In the real world, removing a personal style choice isn't as clean or directly linked to reverting to a default policy.

```
Before: `emp1.MIN_SALARY = 50000`

   [Employee Class]
   MIN_SALARY = 30000
       ▲         ▲
       │         │ (inherits from class)
   [emp1]      [emp2]
(no own MIN_SALARY) (no own MIN_SALARY)


After: `emp1.MIN_SALARY = 50000`

   [Employee Class]
   MIN_SALARY = 30000
       │         ▲
(shadows)        │ (inherits from class)
       │         │
   [emp1]      [emp2]
MIN_SALARY = 50000 (no own MIN_SALARY)
```

## Details

The provided context demonstrates a core principle of Python's object-oriented programming: the separation between class and instance state. When we have a class attribute like `min_salary` and we execute `emp1.min_salary = 50000`, we aren't changing the `min_salary` stored in the `Employee` class blueprint. Instead, we are adding a new attribute, also named `min_salary`, directly onto the `emp1` object itself. This new [[Python - Instance Attributes|instance attribute]] now takes precedence for `emp1`, effectively hiding the class attribute. This mechanism is a key part of Python's attribute lookup order and is fundamental to maintaining instance independence and data integrity.

#### Primary Goal

To isolate attribute modifications to individual instances, thereby protecting the shared state of a class from being altered by any single object.

#### Mechanism

- **Step 1: Define a Class with a Class Attribute**
    - First, we define an `Employee` class with a class attribute `MIN_SALARY` set to a default value. This value is shared by all objects created from this class unless overridden.
- **Step 2: Create Multiple Instances**
    - We then create two separate instances of the `Employee` class, `emp1` and `emp2`. Initially, both of them will inherit and access the same `MIN_SALARY` value from the class.
- **Step 3: Modify the Attribute on One Instance**
    - Next, we assign a new value to `MIN_SALARY` but do so through the `emp1` instance. This is the key step: Python creates a new `MIN_SALARY` attribute inside `emp1`'s namespace.
- **Step 4: Observe the Shadowing Effect**
    - When we print the `MIN_SALARY` for both employees, we see different results. `emp1` now uses its own instance-level attribute (50000), while `emp2`, having no such instance attribute, falls back to the shared class-level attribute (30000).

##### Code Translation

```python
# --- Step 1: Define a Class with a Class Attribute ---
class Employee:
    # This is a class attribute, shared by all instances
    MIN_SALARY = 30000

    def __init__(self, name, salary):
        # These are instance attributes
        self.name = name
        self.salary = salary

# --- Step 2: Create Multiple Instances ---
emp1 = Employee("John", 40000)
emp2 = Employee("Jane", 60000)

# Initially, both instances access the class attribute
print(f"Initial MIN_SALARY for emp1: {emp1.MIN_SALARY}")
print(f"Initial MIN_SALARY for emp2: {emp2.MIN_SALARY}")

# --- Step 3: Modify the Attribute on One Instance ---
# This creates a new *instance attribute* on emp1 called MIN_SALARY.
# It does NOT change Employee.MIN_SALARY.
emp1.MIN_SALARY = 50000

# --- Step 4: Observe the Shadowing Effect ---
print("\n--- After modifying emp1 ---")
print(f"emp1's MIN_SALARY: {emp1.MIN_SALARY}") # Accesses its own instance attribute
print(f"emp2's MIN_SALARY: {emp2.MIN_SALARY}") # Still accesses the class attribute
print(f"Employee Class's MIN_SALARY: {Employee.MIN_SALARY}") # The class attribute is unchanged
```

 [[Code - Modifying Class Attributes Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Instance-Level Assignment (`instance.attribute = value`)**
    - This is the mechanism for creating an instance-specific override. It adds an attribute to the instance's `__dict__`, effectively hiding the class attribute for that instance.
- **Class-Level Assignment (`ClassName.attribute = value`)**
    - To modify the attribute for *all* instances that don't have their own override, you must perform the assignment directly on the class. For example, `Employee.MIN_SALARY = 35000` would change the default for `emp2` and any new employees created.

#### Core Trade-offs

- **Benefit: Encapsulation and Safety**
    - This behavior is a powerful feature for data safety. It prevents a single instance from accidentally changing a shared constant or default value for all other instances, which could lead to unpredictable behavior across the application.
- **Drawback: Potential for Confusion**
    - A developer might mistakenly believe they are updating a shared value when they are actually creating an instance-specific one. This can lead to subtle bugs where changes don't propagate as expected, making debugging more difficult.
- **Drawback: Increased Memory Usage**
    - If a large number of instances override the class attribute, each one will store its own copy. This consumes more memory than if all instances simply shared the single class attribute.

## Connections

```
                      (Parent)
            Class vs Instance Attributes
                       ▲
                       │
┌──────────────────────┼──────────────────────┐
│                      │                      │
(Creates)     ┌──────────────────────────┐     (Supports)
Instance      │ Modifying Class Attributes │     Encapsulation
Attributes    └──────────────────────────┘
```

### Parent Concept

This behavior is a direct consequence of the fundamental distinction between a [[Python - Class vs Instance Attributes|class attribute and an instance attribute]].

### Child Concepts



### Related Concepts 

- Modifying a class attribute on an instance results in the creation of a new [[Python - Instance Attributes|instance attribute]] that shadows the original.
- This concept of shadowing is a key part of how Python handles [[Python - Accessing Class Attributes|accessing class attributes]], following an order of checking the instance first, then the class.
- This protective behavior is a practical application of the [[Python - Encapsulation|encapsulation principle]], as it shields the class's shared state from being directly modified by its instances.
## Questions

- Imagine a configuration setting, like `API_TIMEOUT`, is stored as a class attribute for a service client. A developer 'fixes' a timeout issue for a single problematic request by setting `client_instance.API_TIMEOUT = 60`. What are the potential long-term risks of this 'fix', and how would you propose a more robust solution that balances immediate needs with system-wide consistency?
- If you have a class with millions of instances, and a large percentage of them override a class attribute, what are the memory implications compared to modifying the class attribute directly? How would you design a system to decide when an override is justified versus when a new subclass should be created?
- What if Python's attribute assignment worked differently, where `instance.attribute = value` *always* modified the class attribute if it existed on the class? What fundamental OOP principles would this break, and what kind of new programming patterns might emerge from such a design?