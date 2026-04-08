---
tags: 
  - core
  - python
  - inheritance
  - mro
  - superclass
  - subclass
  - method_resolution_order
  - concept
source: 
  - "[[Intermediate Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Inheritance 1]]"
  - "[[Python - __init__ Method (Constructor)]]"
  - "[[Python - Method Overriding 1]]"
  - "[[Python - self Keyword]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Instance Methods]]"
  - "[[Python - Class Methods 1]]"
  - "[[Python - Operator Overloading 1]]"
  - "[[Python - Instance Attributes 1]]"
  - "[[Python - Class Attributes 1]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
---
# Core: super() Function

## Summary

>The `super()` function is a built-in Python feature that returns a temporary proxy object of the parent class. It allows a child class to efficiently call methods that have been defined in its parent, most commonly the [[Python - __init__ Method (Constructor)|__init__ method]], without explicitly naming the parent class.

**Why This Matters:** Using `super()` makes your inheritance structures more maintainable and robust by automatically handling calls to parent classes, preventing bugs when class names or hierarchies change.

_Analogy:_ _Imagine a master chef (the child class, `Chef`) training an apprentice (the instance). The chef has a unique recipe for a special sauce, but the base of that sauce relies on a classic stock recipe created by their mentor (the parent class, `MentorChef`). When making the sauce, instead of re-creating the stock from scratch or explicitly saying, 'Now, I will perform the exact steps of *MentorChef*'s stock recipe,' the chef simply says, 'Prepare the classic stock base.' This command, 'Prepare the classic stock base,' is `super()`. It's a generic instruction that invokes the mentor's established method, allowing the chef to then add their own unique ingredients on top._

**Where it breaks down:** The analogy implies a single, known mentor. In Python, `super()` is more powerful; in complex multiple inheritance scenarios, it intelligently follows a pre-determined 'Method Resolution Order' (MRO) to find the *next* appropriate parent's method, which might not be the immediate parent you'd expect. It's less like calling a specific mentor and more like following a formal, documented lineage of techniques.

```
Class Hierarchy & `super()` Call Flow

      [ Person Class ]
      - __init__(self, name, age)
      - display_info(self)
              ▲
              │ (Inherits from)
      ┌───────┴───────┐
      │ [Employee Class]│
      │ - __init__(...) │ ◀──┐
      │ - display_info()│    │
      └───────────────┘    │
             │             │
             └─ super().__init__(name, age) calls parent's __init__
```

## Details

In [[Python - Object-Oriented Programming (OOP)|object-oriented programming]], `super()` is a crucial function for managing [[Python - Inheritance 1|inheritance]]. It provides a clean, dynamic way for a child class (subclass) to access and run methods from its parent class (superclass). As shown in the context, instead of hardcoding the parent class name like `Person.__init__(self, name, age)`, you use `super().__init__(name, age)`. This approach is more flexible and automatically handles passing the [[Python - self Keyword|self]] argument, making the code cleaner and less prone to errors if the parent class's name changes.

#### Primary Goal

To allow a subclass to cleanly and dynamically invoke methods from its superclass, promoting code reuse and maintainability, especially in complex inheritance hierarchies.

#### Mechanism

- **Step 1: Define the Parent Class**
    - Create a base class with its own attributes and methods. Here, `Person` is the parent class, and its `__init__` method initializes the `name` and `age` attributes.
- **Step 2: Define the Child Class**
    - Create a child class that inherits from the parent. `Employee` inherits from `Person` and needs to initialize the parent's attributes (`name`, `age`) as well as its own (`title`).
- **Step 3: Use `super()` to Call the Parent's `__init__`**
    - Inside the child's `__init__` method, call `super().__init__(...)` and pass the arguments required by the parent's constructor. This executes the parent's initialization logic first.
- **Step 4: Initialize Child-Specific Attributes**
    - After the parent's `__init__` has been called via `super()`, proceed to initialize any attributes that are unique to the child class, such as `self.title`.

##### Code Translation

```python
# --- Step 1: Define the Parent Class ---
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def display_info(self):
        return f"Name: {self.name}, Age: {self.age}"

# --- Step 2: Define the Child Class ---
class Employee(Person): # Employee inherits from Person
    def __init__(self, name, age, title):
        # --- Step 3: Use super() to Call the Parent's __init__ ---
        # This initializes the 'name' and 'age' attributes from the Person class.
        super().__init__(name, age)

        # --- Step 4: Initialize Child-Specific Attributes ---
        self.title = title

    # This method overrides the parent's display_info method
    def display_info(self):
        # We can also use super() to call parent methods other than __init__
        person_info = super().display_info()
        return f"{person_info}, Title: {self.title}"

# Create an instance of the child class
emp = Employee("Alice", 30, "Software Engineer")

# The instance has attributes from both parent and child
print(emp.name)       # Output: Alice
print(emp.title)      # Output: Software Engineer
print(emp.display_info()) # Output: Name: Alice, Age: 30, Title: Software Engineer
```

 [[Code - super() Function Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Zero-Argument Form: `super()`**
    - This is the most common and recommended form. When called inside a method, Python automatically figures out the class it was called in and the instance (`self`) involved, and finds the appropriate parent method in the Method Resolution Order (MRO).
- **Two-Argument Form: `super(type, object_or_type)`**
    - This form is used for more advanced and explicit control, often outside of methods or in complex multiple inheritance scenarios. `type` specifies the class whose MRO you want to search, and `object_or_type` is the instance used to find the starting point in that MRO.

#### Core Trade-offs

- **Pro: Enhanced Maintainability**
    - It decouples the child class from the parent class's name. If you rename the parent class, you don't have to find and replace its name in every child class; `super()` handles it automatically.
- **Pro: Correctly Handles Multiple Inheritance**
    - `super()` correctly follows the Method Resolution Order (MRO), ensuring that in a complex hierarchy with multiple parents, each parent's method is called exactly once in the correct sequence. Explicitly calling `Parent.__init__` can lead to methods being called multiple times or not at all.
- **Con: Can Be Less Explicit for Beginners**
    - For someone new to OOP, seeing `Person.__init__(self, ...)` is very clear about what's happening. `super().__init__(...)` is more abstract and requires understanding the concept of `super` and the inheritance chain.

## Connections

```
                 (Parent)
             Python - Inheritance 1
                      ▲
                      │
┌─────────────────────┼─────────────────────┐
│                     │                     │
(Used In)    ┌──────────────────┐    (Used In)
__init__     │ super() Function │    Method Overriding
             └──────────────────┘
```

### Parent Concept

The `super()` function is a fundamental tool used within the framework of [[Python - Inheritance 1|inheritance]] to manage the relationship between parent and child classes.

### Child Concepts



### Related Concepts 

- `super()` is most commonly used within the [[Python - __init__ Method (Constructor)|constructor]] of a child class to ensure the parent class is properly initialized.
- The primary use case for `super()` is to call the parent's version of a method, which is a key pattern in [[Python - Method Overriding 1|method overriding]].
- A key convenience of `super()` is that it automatically handles the [[Python - self Keyword|self]] argument, implicitly passing the current instance to the parent method.
- `super()` provides a more robust alternative to explicitly calling methods on a parent class, which is a core concept of [[Python - Inheritance 1|inheritance]].
## Questions

- In a complex multiple inheritance scenario, `super()` follows the Method Resolution Order (MRO), which can sometimes lead to unexpected methods being called. How would you debug this, and how would you justify the added complexity of this inheritance structure to your team versus using composition?
- Imagine you're refactoring a large legacy codebase that uses explicit parent class calls (e.g., `Parent.__init__(self, ...)`). What is your strategy for migrating to `super()` across hundreds of classes? What automated tools or tests would you implement to ensure the refactoring doesn't break existing functionality?
- What if the `super()` function was removed from Python? How would you replicate its dynamic dispatch behavior, especially for multiple inheritance, using only other language features like introspection (`__mro__`, `getattr`)?