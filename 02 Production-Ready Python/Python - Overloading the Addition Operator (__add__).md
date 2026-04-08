---
tags:
  - core
  - python
  - operator_overloading
  - magic_methods
  - dunder_methods
  - __add__
  - polymorphism
  - concept
source:
  - "[[Intermediate Object-Oriented Programming in Python]]"
related:
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Overloading the Equality Operator (__eq__)]]"
  - "[[Python - Example of __add__ with Custom Classes (Team) 1]]"
  - "[[Python - Cross-Type Operator Overloading]]"
  - "[[Python - Example of __add__ Creating a Different Type (Employee to Team) 1]]"
  - "[[Python - Common Overloadable Operators]]"
  - "[[Python - Magic Methods]]"
  - "[[Python - Polymorphism]]"
  - "[[Python - Data Model]]"
  - "[[Python - __str__ and __repr__]]"
  - "[[Python - __len__]]"
  - "[[Python - Objects]]"
---
# Core: Overloading the Plus Operator (__add__)

## Summary

>In Python, overloading the plus operator means defining a custom behavior for the `+` symbol when used with instances of a class. This is achieved by implementing the `__add__` magic method, which specifies exactly what should happen when two objects are "added" together, often resulting in a new object that represents their combination. This is very similar to how [[Python - Overloading the Equality Operator (__eq__)|overloading the equality operator]] defines custom comparison logic.

**Why This Matters:** Overloading the plus operator allows custom objects to be combined using the intuitive `+` symbol, making code more readable and Pythonic.

_Analogy:_ _Think of overloading the `+` operator like having two separate Lego sets, each with its own instruction booklet and pieces. The `__add__` method is a new, custom instruction booklet you write that tells you how to combine the pieces from both sets to build a single, larger, more complex model. You aren't just dumping the pieces in a pile; you're defining a specific way to merge them into a new, coherent structure._

**Where it breaks down:** The analogy implies you always create a bigger version of the same thing. In Python, `__add__` is more flexible; you could "add" an `Employee` object to a `Department` object and create a `Team` object, a completely different type. The result doesn't have to be a "bigger" version of the original items, as explored in [[Python - Cross-Type Operator Overloading]].

```
```
+-----------------+      +      +-----------------+      =      +----------------------------------+
| Team Object 1   |             | Team Object 2   |             | New Team Object                  |
| members: [A, B] |             | members: [C, D] |             | members: [A, B, C, D]            |
+-----------------+             +-----------------+             +----------------------------------+
      (self)                         (other)                       (return Team(self.m + other.m))
```
```

## Details

The core idea behind overloading the `+` operator is to extend the functionality of a standard Python operator to custom-defined data types. By implementing the `__add__(self, other)` "dunder" (double underscore) method within a class, you can dictate the outcome of an expression like `object1 + object2`. This is a key feature of Python's object-oriented programming model that promotes polymorphism and allows for more expressive and readable code. Instead of calling a verbose method like `object1.combine_with(object2)`, you can use the familiar and concise `+` symbol.

#### Primary Goal

The primary goal is to make custom objects work with the standard addition operator (`+`) in a way that is logical and intuitive for the object's domain.

#### Mechanism

- **Step 1: Define the `__add__` Method**
    - Inside your class, define a method named `__add__`. This method will automatically be called whenever the `+` operator is used with an instance of this class on the left-hand side.
- **Step 2: Access Operands**
    - The method takes two parameters: `self`, which refers to the object on the left of the `+`, and `other`, which refers to the object on the right.
- **Step 3: Implement Combination Logic**
    - Inside the method, write the code that combines `self` and `other`. In the case of the `Team` class, this involves concatenating the `team_members` lists from both objects.
- **Step 4: Return a New Object**
    - Typically, `__add__` should return a *new* object that represents the result of the addition. For example, adding two `Team` objects creates and returns a third, larger `Team` object. This is demonstrated in the [[Python - Example of __add__ with Custom Classes (Team) 1]] note.

##### Code Translation

```python
class Team:
    def __init__(self, team_members):
        # team_members is a list of names
        self.team_members = team_members

    # --- Step 1: Define the __add__ Method ---
    # --- Step 2: Access Operands (self, other) ---
    def __add__(self, other):
        # Adding Team objects creates a larger Team

        # --- Step 3: Implement Combination Logic ---
        combined_members = self.team_members + other.team_members

        # --- Step 4: Return a New Object ---
        return Team(combined_members)

# Example Usage
team1 = Team(['Alice', 'Bob'])
team2 = Team(['Charlie', 'David'])
combined_team = team1 + team2

print(combined_team.team_members)
# Output: ['Alice', 'Bob', 'Charlie', 'David']
```

 [[Code - Overloading the Plus Operator (__add__) Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`self`**
    - The instance of the class on the *left* side of the `+` operator. Python passes this argument automatically.
- **`other`**
    - The object on the *right* side of the `+` operator. This can be an instance of the same class or, with careful implementation, an instance of a different class (see [[Python - Cross-Type Operator Overloading]]).

#### Core Trade-offs

- **Pro: Code Readability**
    - Using `+` makes the code more intuitive and closer to natural language (e.g., `total_sales = region1_sales + region2_sales`) compared to a method call like `total_sales = region1_sales.add(region2_sales)`.
- **Pro: Adherence to Pythonic Idioms**
    - Leveraging dunder methods is a core part of writing idiomatic Python. It allows your custom objects to integrate seamlessly with the language's built-in features.
- **Con: Potential for Ambiguity**
    - If the meaning of 'addition' for a class is not obvious, overloading `+` can make code harder to understand. For example, what should `user1 + user2` do? It's crucial that the operation has a clear, unambiguous meaning.
- **Con: Risk of Unexpected Behavior**
    - Users might assume `+` is commutative (`a + b == b + a`), but this is not guaranteed unless you implement it that way. Also, if `__add__` modifies `self` instead of returning a new object, it violates user expectations and can lead to subtle bugs.

## Connections

```
```
                           (Parent)
               Object-Oriented Programming
                             ▲
                             │
┌────────────────────────────┼────────────────────────────┐
│                            │                            │
(Similar To)      ┌───────────────────────────────────┐      (Concept)
__eq__            │ Overloading the Plus Operator     │      Cross-Type Overloading
                  │             (__add__)             │
                  └───────────────────────────────────┘
                                 │
                      ┌──────────┴──────────┐
                      │                     │
                (Example)             (Related)
    __add__ with Custom Classes   Common Overloadable Operators
```
```

### Parent Concept

This concept is a fundamental technique within [[Python - Object-Oriented Programming (OOP)]], allowing developers to customize the behavior of classes.

### Child Concepts



### Related Concepts 

- It operates on the same principle as [[Python - Overloading the Equality Operator (__eq__)|overloading the equality operator]], where a magic method is used to define behavior for a standard symbol.
- A practical demonstration is provided in the [[Python - Example of __add__ with Custom Classes (Team) 1]] note, which shows how to merge two `Team` objects.
- The concept can be extended to handle addition between different types of objects, a technique known as [[Python - Cross-Type Operator Overloading]].
- The `__add__` method is one of many such methods, which are collectively covered in [[Python - Common Overloadable Operators]].
## Questions

- You're designing a `User` class for a social media platform. A product manager suggests allowing developers to 'add' users together to form a `Group`. What are the potential ambiguities and risks of overloading the `+` operator for this purpose, and how would you justify an alternative design (like a `Group.add_members()` method) to a non-technical stakeholder?
- Imagine you have a `FinancialPortfolio` class where instances are added frequently in a high-performance trading simulation. Each addition creates a new portfolio object by deep-copying and merging potentially thousands of asset objects. How would you design the `__add__` method to minimize memory allocation and CPU overhead in this performance-critical loop?
- What if the `+` operator was reserved only for commutative operations (where `a + b` must equal `b + a`)? How would this language-level constraint change your design for classes where the order of 'addition' matters, such as concatenating file paths or merging configuration objects where one overrides the other?