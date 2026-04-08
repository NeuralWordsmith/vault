---
tags: 
  - core
  - python
  - oop
  - subclass
  - superclass
  - is-a relationship
  - code reuse
  - concept
source: 
  - "[[Intermediate Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - __init__ Method (Constructor)]]"
  - "[[Python - self Keyword]]"
  - "[[Python - super() Function]]"
  - "[[Python - Method Overriding 1]]"
  - "[[Python - Instance Attributes 1]]"
  - "[[Python - Class Attributes 1]]"
  - "[[Python - Instance Methods]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Python - Operator Overloading 1]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Python - Class Methods 1]]"
  - "[[Python - Instance Attributes vs Class Attributes]]"
  - "[[Python - Instance Methods vs Class Methods]]"
---
# Core: Inheritance

## Summary

>Inheritance is a core pillar of Object-Oriented Programming that allows a 'child' class to acquire all the attributes and methods of a 'parent' class. This mechanism is based on an "is-a" relationship, where the child class is a more specific version of the parent (e.g., an `Employee` "is-a" `Person`). The child class can then be extended with its own unique functionality. This relationship is often established by calling the parent's [[Python - __init__ Method (Constructor)|`__init__` method]] from within the child's constructor.

**Why This Matters:** Inheritance is crucial for writing clean, reusable code by allowing new classes to adopt properties and behaviors from existing ones, which directly supports the [[SWE - DRY (Don't Repeat Yourself) Principle|DRY principle]].

_Analogy:_ _Think of genetic inheritance in a family. A child inherits physical traits like eye color and height from their parents. These are the baseline characteristics. However, the child is still a unique individual and can develop their own new skills, like learning to play the piano or speak a new language, which the parents may not possess._

  * **Parents:** The base `Person` class.
  * **Inherited Traits:** The `name` and `age` attributes, and the `introduce()` method.
  * **Child:** The derived `Employee` class.
  * **New Skills:** The new `title` attribute and the `change_position()` method.
  * **Where it breaks down:** In biology, a child typically inherits from two parents, which is analogous to multiple inheritance—a more complex programming concept. Furthermore, a child cannot consciously 'override' their genetic traits in the same way a child class can implement [[Python - Method Overriding 1|method overriding]] to change a parent's behavior.

```
      [ Person ] (Parent/Superclass)
           ▲
           │ (Inherits from)
           │
      [ Employee ] (Child/Subclass)
```

## Details

Inheritance is a fundamental concept in [[Python - Object-Oriented Programming (OOP)]] that enables code reuse. It establishes a parent-child relationship between classes, where the child (or subclass) inherits all the functionality—attributes and methods—from the parent (or superclass). This is often described as an "is-a" relationship; for instance, in the provided example, an `Employee` is a `Person`. After inheriting, the child class can be specialized by adding new attributes or methods, making it a more specific version of the parent.

#### Primary Goal

To promote code reusability and create a logical hierarchy between classes, reducing redundancy and making code easier to maintain.

#### Mechanism

- **Step 1: Define the Parent Class**
    - Create a general, base class that contains common attributes and methods. In the example, this is the `Person` class, which defines the `name` and `age` attributes and an `introduce` method that all `Person` objects (and their descendants) will have.
- **Step 2: Define the Child Class**
    - Create a new, more specific class. To establish inheritance, place the parent class's name in parentheses after the child class's name: `class Employee(Person):`. This syntax tells Python that `Employee` inherits from `Person`.
- **Step 3: Initialize the Parent's State**
    - Inside the child's [[Python - __init__ Method (Constructor)|`__init__` method]], you must explicitly call the parent's `__init__` method. This ensures that all the attributes defined in the parent are properly initialized. The example uses `Person.__init__(self, name, age)`, though using the [[Python - super() Function|`super()` function]] is often preferred for its flexibility.
- **Step 4: Extend the Child Class**
    - Add new attributes and [[Python - Instance Methods|instance methods]] that are unique to the child class. The `Employee` class adds a `title` attribute and a `change_position` method, which are not present in the `Person` class.
- **Step 5: Utilize Inherited and New Functionality**
    - When you create an instance of the child class (e.g., `lester = Employee(...)`), it has access to both its own methods (`change_position`) and the methods it inherited from the parent (`introduce`).

##### Code Translation

```python
# --- Step 1: Define the Parent Class ---
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def introduce(self):
        print(f"Hello, my name is {self.name}")

# --- Step 2: Define the Child Class ---
class Employee(Person):
    def __init__(self, name, age, title):
        # --- Step 3: Initialize the Parent's State ---
        Person.__init__(self, name, age)
        
        # --- Step 4: Extend the Child Class ---
        self.title = title

    def change_position(self, new_title):
        self.title = new_title

# --- Step 5: Utilize Inherited and New Functionality ---
lester = Employee("Lester", 26, "Technician")

# Call inherited method from Person
lester.introduce()  # Output: Hello, my name is Lester

# Call method defined in Employee
lester.change_position("Cashier")
print(lester.title) # Output: Cashier
```

 [[Code - Inheritance Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Single Inheritance**
    - A class inherits from only one parent class. This is the most common and straightforward form, as seen in the `Employee(Person)` example. It creates a simple, linear hierarchy that is easy to follow.
- **Multiple Inheritance**
    - A class can inherit from multiple parent classes, combining functionality from all of them (e.g., `class FlyingCar(Car, Airplane):`). This is a powerful feature but can introduce complexity, such as the "diamond problem," where ambiguity arises if multiple parents share a method with the same name.

#### Core Trade-offs

- **Pro: Code Reusability**
    - The primary benefit. It avoids duplicating code by placing common functionality in a parent class, directly supporting the [[SWE - DRY (Don't Repeat Yourself) Principle|DRY principle]].
- **Pro: Logical Structure**
    - Creates a clear and intuitive hierarchy that can model real-world relationships, making the codebase easier to understand (e.g., a `Dog` class inheriting from an `Animal` class).
- **Con: Tight Coupling**
    - The child class is tightly bound to the parent class's implementation. A change in the parent class can unexpectedly break functionality in the child class, even if the child's code is not directly modified.
- **Con: Fragile Base Class Problem**
    - A seemingly safe modification to a base class can have unintended and far-reaching consequences for all of its descendants, making the entire hierarchy brittle and difficult to refactor.

## Connections

```
                (Parent)
    Object-Oriented Programming
                   ▲
                   │
    ┌──────────────┼────────────────┐
    │              │                │
(Related)   ┌──────────────┐    (Related)
__init__    │  Inheritance │    super()
            └──────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
(Child Concept)       (Child Concept)
Method Overriding   Multiple Inheritance
```

### Parent Concept

Inheritance is one of the four fundamental pillars of [[Python - Object-Oriented Programming (OOP)]], alongside encapsulation, polymorphism, and abstraction.

### Child Concepts

- A direct application of inheritance is [[Python - Method Overriding 1|method overriding]], where a child class provides a specific implementation for a method that is already defined in its parent class.

### Related Concepts 

- The [[Python - __init__ Method (Constructor)|`__init__` method]] is crucial in inheritance for initializing the state of both the parent and child classes.
- The [[Python - super() Function|`super()` function]] provides a more robust and maintainable way to call methods from the parent class, especially in complex hierarchies.
- The [[Python - self Keyword|`self` keyword]] is used consistently to refer to the instance of the class, whether the method being called was defined in the child or inherited from the parent.
- Inheritance is a key mechanism for creating specialized [[Python - Instance Methods|instance methods]] that build upon a common base.
## Questions

- Your team is building a system with many types of users (Admin, Editor, Viewer). You could use inheritance with a base `User` class, or you could use composition by giving a `User` object a `Role` attribute. How would you decide between these two approaches, and what is the long-term business impact on maintainability and flexibility for adding new user types?
- Imagine a deep inheritance chain (e.g., `Vehicle` -> `Car` -> `ElectricCar` -> `TeslaModelS`). If a critical bug is found in a method defined in the base `Vehicle` class, what steps would you take to test and deploy the fix across the entire system to ensure you don't break the specialized logic in any of the child classes?
- What if Python removed class-based inheritance entirely? How would you replicate its primary benefit—code reuse and polymorphism—using only functions and composition (i.e., objects containing other objects)?