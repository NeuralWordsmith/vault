---
tags: 
  - core
  - python
  - code_reuse
  - is-a_relationship
  - parent_child_class
  - method_overriding
  - oop
  - concept
source: 
  - "[[Introduction to Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Class Inheritance]]"
  - "[[Python - Parent and Child Classes]]"
  - "[[Python - Inheritance Syntax]]"
  - "[[Python - isinstance() with Inheritance]]"
  - "[[Python - BankAccount Inheritance Example]]"
  - "[[Python - Inheritance & Polymorphism Relationship]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Python - super()]]"
  - "[[Python - Method Overriding]]"
  - "[[Python - Composition]]"
  - "[[Python - Polymorphism]]"
  - "[[Python - Objects]]"
  - "[[Python - Class Methods]]"
---
# Core: Inheritance

## Summary

>Inheritance is a core mechanism in Object-Oriented Programming that allows a new class to be based on an existing class, absorbing its attributes and methods automatically. This creates a parent-child relationship between classes, enabling code reuse and specialization. It directly addresses the problem of needing to adapt existing code for slightly different needs, allowing developers to keep a consistent interface while customizing functionality without modifying the original source code.

**Why This Matters:** Inheritance allows developers to build upon existing, proven code, drastically reducing development time and errors by reusing functionality instead of rewriting it from scratch.

_Analogy:_ _Think of inheritance like a set of family recipes. You have a basic, time-tested 'Cookie Dough' recipe from your grandmother (the parent class). This recipe has ingredients (attributes) like flour, sugar, and eggs, and instructions (methods) like 'mix' and 'bake'.

Now, you want to make 'Chocolate Chip Cookies' (the child class). You don't write a new recipe from scratch. Instead, you 'inherit' the 'Cookie Dough' recipe and simply add one new ingredient (chocolate chips) and perhaps slightly modify an instruction ('bake for 10 minutes instead of 12'). You get all the goodness of the original recipe plus your own customization._

  - **Grandmother's Cookie Dough Recipe**: The parent or base class (`CookieDough`).
  - **Your Chocolate Chip Cookie Recipe**: The child or derived class (`ChocolateChipCookie`).
  - **Flour, Sugar, Eggs**: Inherited attributes.
  - **'mix', 'bake' instructions**: Inherited methods.
  - **Adding Chocolate Chips**: Adding a new attribute or method to the child class.
  - **Changing the bake time**: Overriding a method from the parent class.
  - **Where it breaks down:** If your grandmother fundamentally changes the base recipe (e.g., switches to a new type of gluten-free flour), it might unexpectedly ruin your chocolate chip version. Similarly, changes in a parent class in software can sometimes break child classes that depend on the old implementation, a problem known as the 'fragile base class' issue.

```
      [ Parent Class ]
      (e.g., Employee)
      - name
      - salary
      - display_profile()
            │
            └── inherits from
            │
      [ Child Class ]
      (e.g., Manager)
      - department (new)
      - calculate_bonus() (overridden)
```

## Details

The context highlights a common software development problem: a library or class is almost perfect, but not quite. Instead of starting over or copying and pasting code, inheritance provides a formal, structured way to reuse what works and change what doesn't. This embodies the [[SWE - DRY (Don't Repeat Yourself) Principle|DRY (Don't Repeat Yourself) principle]] by building upon existing, tested code. Inheritance establishes an "is-a" relationship; for example, a `Manager` *is an* `Employee`, or a `SavingsAccount` *is a* `BankAccount`. This hierarchical structure is not just for code reuse; it's the foundation that enables powerful concepts like polymorphism, as explored in [[Python - Inheritance & Polymorphism Relationship]].

#### Primary Goal

To enable code reuse by allowing a new class to absorb the attributes and methods of an existing class, facilitating specialization and extension.

#### Mechanism

- **Step 1: Identify a Base (Parent) Class**
    - Start with a general class that contains the core attributes and methods. This is the [[Python - Parent and Child Classes|parent class]]. For example, an `Employee` class with `name` and `salary`.
- **Step 2: Define a Derived (Child) Class**
    - Create a new, more specific class. Use the [[Python - Inheritance Syntax]] by placing the parent class name in parentheses after the new class name to establish the inheritance link.
- **Step 3: Extend with New Functionality**
    - Add methods or attributes to the child class that are unique to it. For instance, a `Manager` class might have a `reports` attribute listing the employees they manage.
- **Step 4: Override Existing Functionality**
    - If the parent's method isn't suitable for the child, you can redefine it in the child class. This is called method overriding. A `Manager` might have a `calculate_bonus` method that works differently from a regular `Employee`'s.
- **Step 5: Utilize Parent's Logic with `super()`**
    - Often, you don't want to completely replace a parent's method, just add to it. The `super()` function allows you to call the parent class's version of a method from within the child's overridden method. A practical application of this is shown in the [[Python - BankAccount Inheritance Example]].

##### Code Translation

```python
# --- Step 1: Identify a Base (Parent) Class ---
class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def display_profile(self):
        print(f"Name: {self.name}, Salary: ${self.salary:,}")

    def calculate_bonus(self, percentage):
        return self.salary * percentage

# --- Step 2: Define a Derived (Child) Class ---
# Manager inherits from Employee using the specific syntax
class Manager(Employee):
    # --- Step 3 & 5: Extend and Utilize with super() ---
    def __init__(self, name, salary, department):
        # Call the parent's __init__ method to handle name and salary
        super().__init__(name, salary)
        # Add new functionality specific to Manager
        self.department = department

    # --- Step 4: Override Existing Functionality ---
    def calculate_bonus(self, percentage, project_bonus):
        # Use super() to get the base bonus from the parent method
        base_bonus = super().calculate_bonus(percentage)
        # Add manager-specific bonus logic
        return base_bonus + project_bonus

# --- Usage ---
emp = Employee("Alex", 80000)
_mgr = Manager("Brenda", 120000, "Engineering")

emp.display_profile()
_mgr.display_profile() # This method was inherited directly

print(f"Alex's bonus: ${emp.calculate_bonus(0.1):,}")
print(f"Brenda's bonus: ${_mgr.calculate_bonus(0.1, 5000):,}")
```

 [[Code - Inheritance Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Methods to Override**
    - The primary design decision is choosing which behaviors of the parent class need to be specialized in the child. Overriding methods is how you customize functionality.
- **Use of `super()`**
    - Deciding whether to completely replace a parent method or to simply extend it. Using `super()` promotes code reuse by building on the parent's logic instead of rewriting it.
- **Inheritance Depth**
    - Deciding how many layers of inheritance to create (e.g., `Employee` -> `Manager` -> `SeniorManager`). Deep hierarchies can become complex and hard to maintain.

#### Core Trade-offs

- **Pro: Code Reusability**
    - The most significant advantage. It avoids code duplication by allowing child classes to reuse code from parent classes, adhering to the DRY principle.
- **Pro: Logical Structure**
    - It creates a clear and intuitive hierarchical relationship between concepts in your code, which can make the software design easier to understand.
- **Con: Tight Coupling**
    - Child classes are inherently dependent on the implementation details of their parent. A change in the parent class (e.g., renaming a method, changing its parameters) can break all of its children.
- **Con: Complexity and Rigidity**
    - Deep or wide inheritance hierarchies can become difficult to reason about. It can be hard to trace where a method comes from. This structure can also be rigid; an object's class is fixed at creation, making it hard to change its behavior dynamically, a problem that composition can solve more flexibly.

## Connections

```
                      (Parent)
           Object-Oriented Programming
                       ▲
                       │
    ┌──────────────────┼──────────────────┐
    │                  │                  │
(Alternative) ┌──────────────────┐    (Enabled by)
Composition   │    Inheritance   │    Polymorphism
              └──────────────────┘
                       │
            ┌──────────┴──────────┐
            │                     │
    Single Inheritance    Multiple Inheritance
```

### Parent Concept

Inheritance is a foundational pillar of [[Python - Object-Oriented Programming (OOP)]], providing the primary mechanism for code reuse and establishing hierarchical relationships between classes.

### Child Concepts

- The most common form is **single inheritance**, where a class derives from just one parent class.
- A more complex form is **multiple inheritance**, where a class can inherit attributes and methods from several parent classes at once.

### Related Concepts 

- The concept of [[Python - Parent and Child Classes]] describes the fundamental structure that inheritance creates.
- Inheritance is the primary mechanism that enables the powerful behavior of [[Python - Inheritance & Polymorphism Relationship|polymorphism]], which allows objects of different child classes to be treated as if they were objects of the parent class.
- The specific [[Python - Inheritance Syntax]] in Python involves placing the parent class name in parentheses after the child class name during its definition.
- One can programmatically verify the 'is-a' relationship established by inheritance using the [[Python - isinstance() with Inheritance|isinstance() function]].
## Questions

- You're designing a system for a shipping company. You could create a deep inheritance hierarchy (`Vehicle` -> `Truck` -> `RefrigeratedTruck`) or use composition (`Vehicle` has a `Cargo` object, which can be a `RefrigeratedContainer`). When would you choose the deep inheritance model, and how would you justify the risk of tight coupling to a project manager concerned about long-term maintenance?
- Imagine a large codebase where a core `User` class is inherited by 50 other specialized classes. A critical security patch requires changing the signature of the `__init__` method in the base `User` class. What is your strategy to roll out this change across the system without breaking the dozens of child classes, and what automated tests would you implement to prevent future regressions?
- What if Python removed class inheritance entirely? How would you replicate the 'is-a' relationship and code-sharing benefits using only composition and protocols (duck typing), and what would be the biggest drawback of this approach compared to traditional OOP?