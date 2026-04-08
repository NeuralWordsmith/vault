---
tags: 
  - core
  - python
  - polymorphism
  - inheritance
  - subclassing
  - method signature
  - oop
  - concept
source: 
  - "[[Intermediate Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Inheritance 1]]"
  - "[[Python - super() Function]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Instance Methods]]"
  - "[[Python - self Keyword]]"
  - "[[Python - __init__ Method (Constructor)]]"
  - "[[Python - Operator Overloading 1]]"
  - "[[Python - Method Overriding vs Operator Overloading]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Python - Class Attributes 1]]"
  - "[[Python - Instance Attributes 1]]"
---
# Core: Method Overriding

## Summary

>Method overriding is a core feature of [[Python - Inheritance 1|inheritance]] that allows a child class (subclass) to provide a new implementation for a method that it has inherited from a parent class (superclass). When an object of the child class calls this method, Python executes the child's version, not the parent's. This mechanism is fundamental to achieving polymorphism, where different objects can respond to the same method call in their own unique ways. It is distinct from [[Python - Operator Overloading 1|operator overloading]], which redefines the behavior of built-in operators for custom classes.

**Why This Matters:** Method overriding allows subclasses to provide specific implementations of methods from their parent class, enabling flexible and context-specific behavior in object-oriented programming.

_Analogy:_ _Imagine a family recipe for a basic tomato sauce passed down from a parent. This is the parent class's method. Now, a child inherits this recipe but decides to improve it by adding fresh basil and a pinch of chili flakes. The child is 'overriding' the original recipe. The name of the task ('make_sauce') remains the same, but the implementation and the final product are now specific to the child. If you ask the child to make sauce, you'll get their new, specialized version._

The parent's original recipe is the method in the superclass. The child's modified recipe is the overridden method in the subclass. The act of adding new ingredients represents the new lines of code in the child's method. **Where it breaks down:** In programming, the child can still choose to use the original parent's recipe by using the [[Python - super() Function|super() function]] to call the parent's method from within their own. In cooking, once the new ingredients are in the pot, you can't easily revert to the original version for that batch.

```
+-----------------+
|  Person Class   |
|-----------------|
| introduce()     |  <-- Original method
+-----------------+
        ▲
        | (Inherits from)
+-----------------+
| Employee Class  |
|-----------------|
| introduce()     |  <-- Overridden method (new implementation)
+-----------------+
```

## Details

In object-oriented programming, when a child class inherits from a parent, it receives all the parent's methods and attributes. However, a generic method from a parent might not be specific enough for the child's needs. Method overriding provides a way for the child class to redefine that method with the same name and signature, providing a more specialized implementation. As seen in the example, an `Employee` class inherits an `introduce` method from a `Person` class but overrides it to include the employee's `title`, making the introduction more specific to its context.

#### Primary Goal

To allow a subclass to customize or completely replace the behavior of a method inherited from its superclass, enabling specialized functionality.

#### Mechanism

- **Step 1: Define the Parent Class**
    - Create a base class (e.g., `Person`) with a general-purpose method (e.g., `introduce()`).
- **Step 2: Define the Child Class with Inheritance**
    - Create a new class (e.g., `Employee`) that inherits from the parent class. This new class automatically gets the `introduce()` method.
- **Step 3: Override the Method**
    - Inside the child class, define a new method with the *exact same name* (`introduce`). Write the new, specialized code inside this method.
- **Step 4: Instantiate and Call the Method**
    - Create an instance of the child class (`Employee`). When you call the `introduce()` method on this object, Python's Method Resolution Order (MRO) finds the version in the `Employee` class first and executes it, ignoring the parent's version.

##### Code Translation

```python
# --- Step 1: Define the Parent Class ---
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def introduce(self):
        print(f"My name is {self.name}.")

# --- Step 2: Define the Child Class with Inheritance ---
class Employee(Person):
    def __init__(self, name, age, title):
        # Call the parent's __init__ to handle name and age
        super().__init__(name, age)
        self.title = title

    # --- Step 3: Override the Method ---
    def introduce(self):
        # This method has the same name as the one in Person
        # but provides a more specific implementation.
        print(f"""My name is {self.name},
I am a {self.title}""")

# --- Step 4: Instantiate and Call the Method ---
lester = Employee("Lester", 26, "Technician")
lester.introduce() # This will call the Employee's version of introduce()

# Output:
# My name is Lester,
# I am a Technician
```

 [[Code - Method Overriding Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Method Signature Match**
    - For a method to be considered an override, its name in the child class must exactly match the name in the parent class. The number and type of parameters should also be compatible.
- **Inheritance Relationship**
    - The class providing the new method implementation must be a subclass (directly or indirectly) of the class containing the original method.

#### Core Trade-offs

- **Pro: Enables Polymorphism and Specialization**
    - Overriding is the primary mechanism for polymorphism. It allows you to write code that works with parent class objects, but which will automatically use the specialized behavior of any child class objects that are passed to it.
- **Pro: Promotes Code Reusability**
    - You can reuse the general logic from a parent class and only customize the specific parts that need to change in the child, often by using `super()` to call the parent's method within the override.
- **Con: Can Violate Liskov Substitution Principle (LSP)**
    - If an overridden method changes the fundamental contract of the parent method (e.g., by requiring different types of arguments or producing an incompatible output), it can lead to unexpected bugs. A subclass object should always be substitutable for a parent class object without breaking the program.
- **Con: Creates Coupling and Maintenance Overhead**
    - Child classes are tightly coupled to the signature of the parent's methods. If the parent method is refactored (e.g., its name or parameters change), all child classes that override it must also be updated, which can be a significant maintenance task in large codebases.

## Connections

```
                      (Parent)
                    Inheritance
                         ▲
                         │
         ┌───────────────┼────────────────────────────┐
         │               │                            │
(Related)       ┌───────────────────────────┐      (Contrasts With)
super()         │     Method Overriding     │      Operator Overloading
                └───────────────────────────┘
```

### Parent Concept

Method overriding is a direct consequence and a primary feature of [[Python - Inheritance 1|inheritance]], which allows a class to acquire the properties and methods of another class.

### Child Concepts



### Related Concepts 

- It is often used in conjunction with the [[Python - super() Function|super() function]], which allows the overridden method to call the parent class's version of the method as part of its new logic.
- It contrasts with [[Python - Operator Overloading 1|operator overloading]], which redefines the behavior of built-in operators like `+` or `*` for custom objects, rather than redefining a named method from a parent class.
- The concept is central to the distinction between [[Python - Method Overriding vs Operator Overloading|method overriding and operator overloading]], as they both modify behavior but in different contexts.
## Questions

- Imagine you have a complex `render()` method in a base `UIComponent` class. A subclass needs to add a single line of logging before the parent's rendering logic executes. Would you override the entire method and copy-paste the parent's code, or is there a better approach? How does your choice impact long-term maintainability if the parent's `render()` method changes frequently?
- In a large application with deep inheritance hierarchies (e.g., `Vehicle` -> `Car` -> `ElectricCar` -> `TeslaModelS`), how would you design a system to trace which version of an overridden method (like `calculate_range()`) is being called at runtime for a specific object, especially for debugging purposes?
- What if Python did not support method overriding, but still had inheritance? How would you architect a system to achieve specialized behavior in subclasses? What design patterns might become more prominent?