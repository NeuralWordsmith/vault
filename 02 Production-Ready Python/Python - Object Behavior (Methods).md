---
tags: 
  - core
  - python
  - methods
  - oop
  - encapsulation
  - functionality
  - behavior
  - concept
source: 
  - "[[Introduction to Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Objects]]"
  - "[[Python - Object State (Attributes)]]"
  - "[[Python - Class]]"
  - "[[Python - Class & Object Relationship]]"
  - "[[Python - Functions]]"
  - "[[Python - User-Defined Functions]]"
  - "[[Python 6 - Everything is an Object]]"
  - "[[Python - Pandas DataFrame]]"
  - "[[Python - Scope]]"
  - "[[SWE - Do One Thing Principle]]"
  - "[[Python - dir() Function]]"
  - "[[Python - Procedural vs Object-Oriented Programming]]"
  - "[[Python 6 - type() Function]]"
---
# Core: Object Behavior (Methods)

## Summary

>In Object-Oriented Programming, an object's behavior refers to its functionality—what it can *do*. In Python, this is implemented through functions defined inside a [[Python - Class|class]], which are called **methods**. Behavior works hand-in-hand with an object's [[Python - Object State (Attributes)|state]] to create a complete, self-contained unit, which is a core principle of [[Python - Object-Oriented Programming (OOP)|Object-Oriented Programming]].

**Why This Matters:** Object behavior allows us to define reusable actions that an object can perform, making code more organized, intuitive, and easier to maintain by bundling functionality with the data it operates on.

_Analogy:_ _Think of a car as an object. Its properties like color, model, and current speed are its **state (attributes)**. The actions it can perform, such as accelerating, braking, or turning the wheel, are its **behavior (methods)**. The `accelerate()` method uses the car's current state (e.g., current speed, engine RPM) to perform its function and update that state._

*   **Where it breaks down:** A car's methods (like `accelerate()`) almost always cause a direct, physical change to its state. In Python, methods can also return new data or perform calculations without changing the object's internal state at all, which is a less direct parallel in the physical car analogy.

```
+-------------------------------+
|         Dog Object            |
|         (Instance)            |
|-------------------------------|
| State (Attributes)            |
|   - name = "Fido"             |
|-------------------------------|
| Behavior (Methods)            |
|   - bark()                    |
+-------------------------------+
```

## Details

Behavior is what an object *does*. In [[Python - Object-Oriented Programming (OOP)|OOP]], we bundle data ([[Python - Object State (Attributes)|attributes]]) and functionality (methods) together into a single [[Python - Object|object]]. This concept, known as encapsulation, is a fundamental shift from [[Python - Procedural vs Object-Oriented Programming|procedural programming]], where data structures and the functions that operate on them are kept separate. Methods are essentially functions that belong to a [[Python - Class|class]] and are designed to operate on the data of a specific instance of that class. A classic example is the `.head()` method of a pandas DataFrame, which provides the behavior of showing the first few rows of the data stored within the DataFrame object.

#### Primary Goal

To define the actions and functionalities an object can perform, often by interacting with its own internal state (attributes).

#### Mechanism

- **Step 1: Define a Class**
    - First, create a blueprint for your object using the `class` keyword. This will contain both the state and the behavior.
- **Step 2: Define a Method**
    - Inside the class, define a function. This function is now a method of the class. The first parameter must always be a reference to the object instance itself, conventionally named `self`.
- **Step 3: Implement the Behavior**
    - Within the method, write the code that performs the desired action. This code can access the object's attributes using the `self` reference (e.g., `self.attribute_name`).
- **Step 4: Create an Object Instance**
    - Instantiate the class to create an actual object in memory.
- **Step 5: Call the Method**
    - Use dot notation (`object_name.method_name()`) on the instance to execute its behavior. Python automatically passes the object instance as the first argument (`self`) to the method.

##### Code Translation

```python
# --- Step 1 & 2: Define a Class and a Method ---
class Dog:
    # The __init__ method sets the initial state (attributes)
    def __init__(self, name):
        self.name = name # Attribute

    # --- Step 3: Implement the Behavior ---
    # This is a method defining a behavior
    def bark(self):
        # This method accesses the object's own state (self.name)
        return f"{self.name} says Woof!"

# --- Step 4: Create an Object Instance ---
my_dog = Dog("Fido")

# --- Step 5: Call the Method ---
# Execute the bark() behavior on the my_dog object
print(my_dog.bark())

# Output: Fido says Woof!
```

 [[Code - Object Behavior (Methods) Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`self`**
    - The mandatory first parameter of any instance method. It's a reference to the instance calling the method, allowing the method to access the object's unique attributes and other methods. Python passes this argument automatically and implicitly when you call `object.method()`.
- **Positional & Keyword Arguments**
    - Just like regular functions, methods can accept any number of additional arguments. These are used to pass external information that the method needs to perform its task.
    - *Example: A `greet(person_name)` method would take an additional argument to know who to greet.*

#### Core Trade-offs

- **Pro (Encapsulation)**
    - Bundling behavior (methods) with the state (attributes) it modifies keeps related code tightly coupled and organized. This makes the system easier to reason about and maintain.
- **Pro (Reusability & Readability)**
    - Once a method is defined, any object of that class can use it, promoting the [[SWE - DRY (Don't Repeat Yourself) Principle|DRY principle]]. Code like `dataframe.head()` is more intuitive than `get_head_of_dataframe(dataframe)`.
- **Con (Initial Overhead)**
    - For very simple, one-off tasks, defining a full class with methods can be more verbose than writing a simple standalone function. The benefits of OOP shine in larger, more complex applications.

## Connections

```
                 (Parent)
           Python - Objects
                    ▲
                    │
┌───────────────────┼───────────────────┐
│                   │                   │
(Paired With) ┌───────────────────────────┐ (Defined In)
Object State  │ Object Behavior (Methods) │ Class
(Attributes)  └───────────────────────────┘
                    │
                    │
             (Core Tenet Of)
      Object-Oriented Programming
```

### Parent Concept

This concept is a core component of [[Python - Objects|Python objects]], defining the 'verb' or action part of an object's existence.

### Child Concepts



### Related Concepts 

- Object behavior is intrinsically linked with [[Python - Object State (Attributes)|object state]], as methods often read or modify an object's data to perform their function.
- Methods are defined within a [[Python - Class|class]], which serves as the blueprint for creating objects that share the same set of behaviors.
- The bundling of state and behavior is a cornerstone principle of [[Python - Object-Oriented Programming (OOP)|Object-Oriented Programming]], which contrasts with the separated data and functions of procedural programming.
## Questions

- Imagine you're building a financial reporting tool. You could have a `Report` object with a `generate_pdf()` method. What are the trade-offs between making this method highly configurable with many parameters versus creating multiple, specialized methods like `generate_summary_pdf()` and `generate_detailed_pdf()`? How would you decide which approach better serves the business need for both flexibility and ease of use?
- If a method on a `User` object, say `calculate_recommendations()`, becomes computationally expensive, how would you refactor the system to prevent this method call from blocking the main application thread? Describe a system design that offloads this behavior.
- What if Python methods could not access the object's state (i.e., the `self` parameter was disallowed)? How would this fundamentally change the nature of Object-Oriented Programming, and what programming paradigms would it start to resemble?