---
tags: 
  - core
  - python
  - class-dot-method
  - syntax
  - method invocation
  - factory method
  - oop
  - concept
source: 
  - "[[Introduction to Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Class Methods]]"
  - "[[Python - @classmethod Decorator]]"
  - "[[Python - The 'cls' Argument in Class Methods]]"
  - "[[Python - Class Methods vs Instance Methods]]"
  - "[[Python - Alternative Constructors with Class Methods]]"
  - "[[Python - Use Cases for Class Methods]]"
  - "[[Python - Scope of Class Methods]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Static Methods]]"
  - "[[Python - Constructors]]"
  - "[[Python - The 'self' Argument in Instance Methods]]"
  - "[[Python - Singleton Design Pattern]]"
---
# Core: Calling Class Methods

## Summary

>Calling a class method involves using the class name itself, followed by a dot and the method name (`ClassName.method()`). This contrasts with instance methods, which are called on an object (`object.method()`). This is the standard way to invoke methods decorated with the `[[Python - @classmethod Decorator]]`, which are designed to operate on the class rather than a specific instance.

**Why This Matters:** This syntax allows you to use class-level functionality, like creating objects from alternative data sources, without needing an instance of the class first.

_Analogy:_ _Think of a blueprint for a house (the Class). To build a standard house, you follow the main instructions on the blueprint (the Constructor). However, the blueprint also has a special section labeled "Build from a Prefabricated Kit" (the Class Method). To use this special instruction, you don't need a house first; you refer directly to the blueprint itself: "Blueprint, build from kit." This is `class.method()` syntax. You're not telling an existing house to do something; you're telling the blueprint how to create a house in a special way._

**Where it breaks down:** A blueprint is static. In Python, class methods can actually modify class-level state (class variables), which is like the blueprint being able to update itself based on how many "prefab kits" have been used.

```
    +----------------+
    |   ClassName    |
    +----------------+
           |
           . (dot syntax)
           |
    +----------------+
    |  method_name() |
    +----------------+
           |
           V
[ Executes method logic, often returning an object ]
```

## Details

The core idea is that some methods belong to the class as a whole, not to any single instance or object. To invoke these methods, we use a direct `class-dot-method` syntax. For example, a method like `Employee.from_file` is called on the `Employee` class itself to create a new employee object, bypassing the standard constructor. This approach is central to implementing `[[Python - Alternative Constructors with Class Methods]]`, which provide flexible ways to instantiate objects.

#### Primary Goal

To provide a direct way to access and execute methods that operate on the class itself, rather than on an instance of the class.

#### Mechanism

- **Step 1: Define the Class and Class Method**
    - Create a class and define a method within it. Use the `[[Python - @classmethod Decorator]]` to designate it as a class method. This method will automatically receive the class itself as its first argument, conventionally named `[[Python - The 'cls' Argument in Class Methods|cls]]`.
- **Step 2: Invoke the Method on the Class**
    - Call the method directly on the class name using dot notation (`ClassName.method_name()`). Do not create an instance of the class first.
- **Step 3: Observe the Result**
    - The class method executes, often returning a new instance of the class created through a non-standard pathway or modifying a class-level attribute.

##### Code Translation

```python
class Car:
    # Class attribute
    cars_produced = 0

    def __init__(self, model, year):
        self.model = model
        self.year = year

    # --- Step 1: Define the Class and Class Method ---
    @classmethod
    def from_string(cls, car_string):
        """Alternative constructor to create a Car from a 'Model-Year' string."""
        model, year_str = car_string.split('-')
        year = int(year_str)
        cls.cars_produced += 1 # Accessing class state
        # The 'cls' argument is used here to call the constructor
        return cls(model, year)

# --- Step 2: Invoke the Method on the Class ---
# No instance of Car exists yet. We call the method on the Car class itself.
car1 = Car.from_string("Tesla-2023")

# --- Step 3: Observe the Result ---
print(f"Created car: {car1.model} from {car1.year}")
print(f"Total cars produced: {Car.cars_produced}")

car2 = Car.from_string("Ford-2021")
print(f"Created car: {car2.model} from {car2.year}")
print(f"Total cars produced: {Car.cars_produced}")
```

 [[Code - Calling Class Methods Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`ClassName`**: The name of the class on which the method is defined. This is the target of the call.
- **`.` (Dot Operator)**: The syntax used to access attributes and methods of an object or class.
- **`method_name`**: The identifier of the class method you wish to call.
- **`()` (Parentheses)**: Used to execute the method, containing any required arguments (excluding the implicit `cls` argument, which Python provides automatically).

#### Core Trade-offs

- **Pro: Instance-Independent**
    - Class methods can be called without creating an object first, which is ideal for factory functions or `[[Python - Alternative Constructors with Class Methods|alternative constructors]]`.
- **Pro: Access to Class State**
    - They have access to the class itself via the `[[Python - The 'cls' Argument in Class Methods|cls]]` parameter, allowing them to read or modify class-level variables. This is something instance methods can do, but it's more explicit and clear with class methods.
- **Con: No Access to Instance State**
    - A class method cannot access instance-specific attributes (like `self.name`) because it's not bound to a particular object. This clearly separates its concerns from instance methods, as explored in `[[Python - Class Methods vs Instance Methods]]`.

## Connections

```
                  (Parent)
                Class Methods
                       ▲
                       │
       ┌───────────────┼────────────────────────────┐
       │               │                            │
(Decorator Used)  ┌───────────────────────────┐   (Contrasts With)
@classmethod      │  Calling Class Methods    │   Calling Instance Methods
                  └───────────────────────────┘
                       │
                       ▼
              (Primary Use Case)
           Alternative Constructors
```

### Parent Concept

This calling convention is the primary way to interact with `[[Python - Class Methods]]`.

### Child Concepts



### Related Concepts 

- This syntax is enabled by the `[[Python - @classmethod Decorator]]`, which signals to Python that the method should receive the class as its first argument.
- The primary purpose of calling a class method is often to implement `[[Python - Alternative Constructors with Class Methods]]`, providing flexible object creation.
- It fundamentally **contrasts with** calling instance methods, a key distinction covered in `[[Python - Class Methods vs Instance Methods]]`.
- The `[[Python - The 'cls' Argument in Class Methods|'cls' argument]]` is implicitly passed by the interpreter when you use the class-dot-method syntax.
## Questions

- Your team needs to load `User` objects from three different sources: a database row, a JSON file, and a legacy XML service. Would you use three separate class methods for this, or a single class method with a 'source_type' argument? Justify your choice in terms of code maintainability and ease of use for other developers.
- If a class method like `Product.get_product_count()` queries a database to get the total number of products, how would you design a caching layer to prevent this expensive call from running on every invocation, especially in a high-traffic, multi-threaded web application?
- What if Python did not have the `class-dot-method` syntax? How could you achieve the same functionality of an alternative constructor (e.g., `User.from_json()`) using only regular functions defined outside the class, and what would be the major disadvantages of that approach?