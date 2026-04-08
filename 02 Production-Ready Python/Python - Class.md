---
tags: 
  - core
  - python
  - oop
  - blueprint
  - instantiation
  - object-oriented
  - encapsulation
  - concept
source: 
  - "[[Introduction to Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Object]]"
  - "[[Python - Class & Object Relationship]]"
  - "[[Python - Object State (Attributes)]]"
  - "[[Python - Object Behavior (Methods)]]"
  - "[[Python - Procedural vs Object-Oriented Programming]]"
  - "[[Python 6 - Everything is an Object]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Functions]]"
  - "[[Python - Inheritance]]"
  - "[[Python - Encapsulation]]"
  - "[[Python - Polymorphism]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Python 6 - type() Function]]"
  - "[[Python - dir() Function]]"
---
# Core: Classes

## Summary

>A class is a user-defined blueprint or template from which individual objects are created. As a core concept of [[Python - Object-Oriented Programming (OOP)]], a class bundles data (attributes) and functions (methods) that operate on that data into a single, logical unit. It defines the structure and capabilities that all [[Python - Object|objects]] instantiated from it will share.

**Why This Matters:** Classes enable code reusability and organization by providing a template for creating consistent, predictable objects, which is the foundation of modern software development.

_Analogy:_ _A class is like a blueprint for a house. The blueprint itself isn't a house you can live in; it's the detailed plan. It specifies the essential properties (e.g., number of bedrooms, square footage, color of the walls) and functionalities (e.g., you can open doors, you can turn on lights). Each actual house built from that blueprint is an object—a concrete instance that shares the structure and capabilities defined by the plan, but has its own unique state (e.g., one house might be painted blue, another red)._

In this analogy:
- **The Blueprint** = The Class
- **An Actual House** = An Object (an instance of the class)
- **Properties (e.g., number of rooms)** = Attributes (the object's state)
- **Functionalities (e.g., opening a door)** = Methods (the object's behavior)

**Where it breaks down:** Unlike a physical house, a software object's state (attributes) can be changed much more dynamically after it's created. Furthermore, software objects can interact with each other in complex ways not easily represented by static blueprints.

```
[ Customer Class (Blueprint) ]
   - Attributes: name, email, cart
   - Methods: add_to_cart(), view_cart()
          │
          │ Instantiation
          ▼
┌─────────────────────┬─────────────────────┐
│ [ Object: customer1 ] │ [ Object: customer2 ] │
│  - name: "Alice"    │  - name: "Bob"      │
│  - email: "..."     │  - email: "..."     │
│  - cart: ['Laptop'] │  - cart: []         │
└─────────────────────┴─────────────────────┘
```

## Details

In Object-Oriented Programming, a class is the abstract, logical definition of a type of object. It acts as a factory for creating objects, ensuring that each one starts with the same structure. A class defines both the [[Python - Object State (Attributes)|state]] (what an object knows about itself, stored in attributes) and the [[Python - Object Behavior (Methods)|behavior]] (what an object can do, defined in methods). This bundling of data and functionality is a key principle called encapsulation.

#### Primary Goal

To create a reusable, logical template for producing objects with a consistent structure and a defined set of capabilities.

#### Mechanism

- **Step 1: Define the Class**
    - Use the `class` keyword followed by a name (typically in PascalCase) to start the blueprint. Everything indented underneath belongs to the class.
- **Step 2: Define the Initializer (`__init__`)**
    - This special method, often called a constructor, runs automatically whenever a new object is created from the class. Its primary job is to set up the initial [[Python - Object State (Attributes)|state]] of the object by assigning values to its attributes.
- **Step 3: Define Behaviors (Methods)**
    - These are functions defined inside the class that dictate what an object can do. The first parameter of any method is conventionally named `self`, which is a reference to the specific object instance calling the method.
- **Step 4: Instantiate an Object**
    - Create a concrete instance of the class by calling the class name as if it were a function, passing any arguments required by the `__init__` method. This action creates an object in memory.

##### Code Translation

```python
# --- Step 1: Define the Class ---
class Customer:
    # --- Step 2: Define the Initializer (__init__) ---
    # This method runs when a new object is created.
    # 'self' refers to the specific instance being created.
    def __init__(self, name, email):
        self.name = name  # Attribute for customer's name
        self.email = email # Attribute for customer's email
        self.cart = []     # Attribute for shopping cart, starts empty

    # --- Step 3: Define Behaviors (Methods) ---
    def add_to_cart(self, item):
        """Adds an item to the customer's cart."""
        self.cart.append(item)
        print(f"{item} added to {self.name}'s cart.")

    def view_cart(self):
        """Displays the items in the customer's cart."""
        if not self.cart:
            print(f"{self.name}'s cart is empty.")
        else:
            print(f"Cart for {self.name}: {', '.join(self.cart)}")

# --- Step 4: Instantiate an Object ---
# Create a specific customer object from the Customer class blueprint
customer1 = Customer("Alice", "alice@example.com")

# Use the object's attributes and methods
print(f"New customer created: {customer1.name}")
customer1.add_to_cart("Laptop")
customer1.view_cart()
```

 [[Code - Classes Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Key Components of a Class Definition**
    - **`class` keyword**: The statement that begins a class definition.
    - **`__init__(self, ...)`**: The special "initializer" or "constructor" method. It's automatically called when an object is instantiated to set up its initial state.
    - **`self` parameter**: The conventional name for the first parameter of any instance method. It always refers to the object instance itself, giving the method access to its attributes and other methods.
    - **Attributes**: Variables that are bound to an object instance (e.g., `self.name`). They hold the data that represents the object's state.
    - **Methods**: Functions defined within a class (e.g., `add_to_cart`). They define the actions or behaviors the object can perform.

#### Core Trade-offs

- **Pro: Encapsulation & Organization**
    - Classes bundle related data and behavior into a single, self-contained unit. This makes code cleaner, easier to understand, and simpler to maintain.
- **Pro: Reusability**
    - A class can be instantiated as many times as needed, creating multiple objects with the same structure. This strongly supports the [[SWE - DRY (Don't Repeat Yourself) Principle|DRY principle]].
- **Con: Abstraction Overhead**
    - For very simple, one-off tasks, defining a full class can be more verbose and complex than using a simpler data structure like a dictionary or a more direct [[Python - Procedural vs Object-Oriented Programming|procedural approach]].
- **Con: Initial Learning Curve**
    - Grasping core OOP concepts like classes, `self`, inheritance, and polymorphism can be challenging for beginners compared to the linear flow of procedural code.

## Connections

```
                  (Parent)
    Object-Oriented Programming
                   ▲
                   │
    ┌──────────────┼──────────────────────────┐
    │              │                          │
(Defines)   ┌──────────────┐             (Contrasts With)
Object      │    Classes   │             Procedural Programming
            └──────────────┘
                   │
                   ▼
           (Leads To Relationship)
    Class & Object Relationship
```

### Parent Concept

A class is a fundamental building block within [[Python - Object-Oriented Programming (OOP)]], serving as the template for creating objects.

### Child Concepts

- The direct result of using a class is an [[Python - Object|object]], which is a concrete instance of that class.
- The fundamental connection between the blueprint and the instance is detailed in the [[Python - Class & Object Relationship|Class & Object Relationship]].

### Related Concepts 

- A class defines the [[Python - Object State (Attributes)|state (attributes)]] and [[Python - Object Behavior (Methods)|behavior (methods)]] that each object instance will possess.
- The concept of a class is a key differentiator when comparing [[Python - Object-Oriented Programming (OOP)|OOP]] with [[Python - Procedural vs Object-Oriented Programming|procedural programming]].
- In Python, even fundamental data types are implemented as classes, reinforcing the idea that [[Python 6 - Everything is an Object|everything is an object]].
- You can inspect the type of an object, which reveals its class, using the [[Python 6 - type() Function|type() function]].
## Questions

- You're designing a system for processing user data. You could use a simple list of dictionaries or define a `User` class. How would you justify the extra development time of creating a class to a project manager, focusing on long-term maintenance costs and data integrity?
- Imagine a system that needs to create millions of `Customer` objects per second. What are the potential memory and performance bottlenecks of instantiating a class with many attributes and methods versus using a more lightweight data structure like a tuple, and how might you profile this?
- What if Python's `class` keyword was removed from the language? How could you simulate the concept of a 'blueprint' for creating structured data with associated behaviors using only functions and dictionaries, and what key OOP features would be hardest to replicate?