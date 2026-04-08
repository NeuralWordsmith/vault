---
tags:
  - core
  - python
  - operator_overloading
  - dunder_methods
  - type_transformation
  - __add__
  - polymorphism
  - concept
source:
  - "[[Intermediate Object-Oriented Programming in Python]]"
related:
  - "[[Python - Overloading the Addition Operator (__add__)]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Magic Methods (Dunder Methods)]]"
  - "[[Python - Polymorphism]]"
  - "[[Python - Overloading the Equality Operator (__eq__)]]"
  - "[[Python - Common Overloadable Operators]]"
  - "[[Python - Example of __add__ with Custom Classes (Team) 1]]"
  - "[[Python - Class Methods]]"
  - "[[Python - __init__ Method]]"
  - "[[Python - __repr__ Method]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[SWE - Do One Thing Principle]]"
---
# Core: Example of __add__ Creating a Different Type (Employee to Team)

## Summary

>This example demonstrates a powerful feature of [[Python - Overloading the Addition Operator (__add__)|operator overloading]]: the ability for an operation to return an object of a completely different type. Instead of `Employee + Employee` resulting in another `Employee`, the `__add__` method is customized to instantiate and return a new `Team` object, effectively transforming the operands into a new conceptual entity.

**Why This Matters:** This pattern allows developers to create highly intuitive, domain-specific APIs where combining objects logically results in a new kind of entity, making code more readable and expressive.

_Analogy:_ _Think of combining two separate ingredients, like flour and eggs. When you "add" them together in the context of baking, you don't get "more flour" or "more eggs." Instead, you create something entirely new: batter. The `+` operator here is like the act of mixing, which transforms the input ingredients (`Employee` objects) into a new product (`Team` object)._

**Where it breaks down:** In baking, the original ingredients are consumed and physically changed. In this Python example, the original `Employee` objects (`emp1` and `emp2`) remain unchanged and still exist in memory after the `Team` is created.

```
    +-----------------+        +-----------------+
    | Employee Object |        | Employee Object |
    | self.name       |        | other.name      |
    +-----------------+        +-----------------+
            │                          │
            └───────────  +  ──────────┘
                          │
                          ▼
              __add__(self, other):
              return Team([self.name, other.name])
                          │
                          ▼
                +-----------------+
                |   Team Object   |
                | team_members=[..]|
                +-----------------+
```

## Details

This specific implementation showcases the flexibility of Python's data model. By defining the `__add__` magic method within the `Employee` class, we can intercept the `+` operator. The core idea is that the logic inside this method is entirely up to the developer. Here, instead of performing a mathematical addition, we use it as a trigger to collect information (employee names) from the two `Employee` instances and use that information to construct and return an instance of a completely different class, `Team`. This is a powerful technique for creating expressive, domain-specific code.

#### Primary Goal

To illustrate that operator overloading can be used for type transformation, where combining two objects of one type results in the creation of an object of another, distinct type.

#### Mechanism

- **Step 1: Define the Target Class (`Team`)**
    - A simple class `Team` is created. Its `__init__` method accepts a list of `team_members`.
- **Step 2: Define the Source Class (`Employee`)**
    - The `Employee` class is defined with `name` and `title` attributes.
- **Step 3: Implement `__add__` in the Source Class**
    - The `__add__` magic method is defined within the `Employee` class. It automatically receives the left operand as `self` and the right operand as `other`.
- **Step 4: Extract Data and Instantiate New Type**
    - Inside `__add__`, a new list is created containing the `name` attribute from both `self` and `other`. This list is then passed to the `Team` class constructor to create a new `Team` object.
- **Step 5: Return the New Object**
    - The newly created `Team` instance is returned as the result of the addition operation.

##### Code Translation

```python
# --- Step 1 & 2: Define the Classes ---
class Team:
    def __init__(self, team_members):
        self.team_members = team_members
    
    def __repr__(self):
        return f"Team(members={self.team_members})"

class Employee:
    def __init__(self, name, title):
        self.name = name
        self.title = title

    # --- Step 3, 4, 5: Implement __add__ for type transformation ---
    def __add__(self, other):
        # Create a list of names from the two Employee objects
        member_names = [self.name, other.name]
        # Use this list to create and return a new Team object
        return Team(member_names)

# --- Demonstration ---
emp1 = Employee("Alice", "Developer")
emp2 = Employee("Bob", "Designer")

# The '+' operator now creates a Team object
new_team = emp1 + emp2

print(new_team)
# Expected Output: Team(members=['Alice', 'Bob'])
print(type(new_team))
# Expected Output: <class '__main__.Team'>
```

 [[Code - Example of __add__ Creating a Different Type (Employee to Team) Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- This pattern does not involve tunable parameters or hyperparameters in the traditional sense. The behavior is hard-coded into the `__add__` method's implementation.

#### Core Trade-offs

- **Pro: Expressive and Intuitive Code**
    - For domain-specific problems, this can make the code highly readable. `employee1 + employee2` is a very clear way to express the creation of a team.
- **Con: Potential for Confusion**
    - A developer new to the codebase might be surprised that adding two `Employee` objects results in a `Team` object. This behavior violates the principle of least astonishment if not well-documented or expected within the domain.
- **Con: Limited Scope**
    - This implementation only works for adding exactly two employees. A more robust solution for creating larger teams might require a different design pattern (e.g., a `Team.add_member()` method or a factory function).

## Connections

```
                           (Parent)
             Overloading the Addition Operator (__add__)
                              ▲
                              │
┌─────────────────────────────┼─────────────────────────────┐
│                             │                             │
(Related)          ┌───────────────────────────────────────────┐          (Related)
Overloading the    │ Example of __add__ Creating a Different   │          Example of __add__
Equality Operator  │       Type (Employee to Team)             │          with Custom Classes
(__eq__)           └───────────────────────────────────────────┘          (Team)
```

### Parent Concept

This concept is a specific, advanced application built upon the fundamental principles of [[Python - Overloading the Addition Operator (__add__)|overloading the addition operator]], which allows classes to define custom behavior for the `+` symbol.

### Child Concepts



### Related Concepts 

- This is a direct [[Python - Example of __add__ with Custom Classes (Team) 1|example of using __add__ with custom classes]], but it takes the concept a step further by returning a different type.
- The general principle of defining custom operator behavior is also seen in [[Python - Overloading the Equality Operator (__eq__)|overloading the equality operator]], which customizes the `==` comparison.
- This pattern is one of many ways to customize class behavior, as cataloged in [[Python - Common Overloadable Operators|common overloadable operators]].
## Questions

- In a large, collaborative project, when might this pattern of creating a new type via `+` become a liability by making the code harder to understand for new developers, and what documentation or design conventions would you enforce to mitigate this risk?
- Imagine you have a `Department` class that holds a list of `Team` objects. How would you overload the `+` operator for the `Department` class to merge two departments? What potential performance bottlenecks or data integrity issues (like duplicate employees) would you need to address in your implementation, especially if departments are very large?
- What if Python's `__add__` method was restricted to only return an object of the same type as the left-hand operand? How would you redesign the interaction between `Employee` and `Team` to achieve the same goal of creating a team from two employees, without using the `+` operator for this purpose?