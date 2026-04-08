---
tags: 
  - major_core
  - python
  - method
  - class
  - behavior
  - self
  - object-oriented
  - concept
source: 
  - "[[Introduction to Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Class Definition]]"
  - "[[Python - The 'self' Argument]]"
  - "[[Python - Object Instantiation]]"
  - "[[Python - Objects]]"
  - "[[Python - Functions]]"
  - "[[Python - User-Defined Functions]]"
  - "[[Python - Encapsulation (Bundling State and Behavior)]]"
  - "[[Python - Attribute Assignment within Methods]]"
  - "[[Python - Accessing Object Attributes]]"
  - "[[Python - Object Method Call vs Class Method Call]]"
  - "[[Python - Class Attributes]]"
  - "[[Fundamental - Programming]]"
  - "[[SWE - Do One Thing Principle]]"
---
# Major Core: Method Definition

## Summary

> A method is a function that is defined inside a [[Python - Class Definition|class body]]. It's the mechanism for bundling behavior with data, allowing objects created from the class to perform specific actions. Just like a standard Python function, it's defined with the `def` keyword, but its first parameter must always be a special argument, conventionally named `self`, which refers to the specific [[Python - Object Instantiation|object instance]] calling the method.

**Why This Matters:** Defining methods is how we give our custom objects behaviors, transforming them from passive data containers into active, functional components of a program.

_Analogy:_ _Think of a class as a blueprint for a coffee machine. The attributes are its properties (color, brand, water capacity). The methods are the buttons you can press: 'Brew Coffee', 'Steam Milk', 'Grind Beans'. Each button is a defined task the machine can perform. When you press the 'Brew Coffee' button on *your specific machine*, you are calling the `brew_coffee()` method on that particular object._

**Where it breaks down:** A physical button on a coffee machine is a fixed mechanism. In Python, methods can be much more dynamic; they can be added, removed, or even replaced at runtime, which isn't possible with a physical appliance.

```
Class Blueprint: Customer
┌──────────────────────────┐
│                          │
│  Attributes: (data)      │
│    - id                  │
│    - email               │
│                          │
│  Methods: (behavior)     │
│    - identify(self, name)│
│    - purchase(self, item)│
│                          │
└──────────────────────────┘
       │
       ▼
Object Instance: customer_one
(A specific customer with its own data,
 but it uses the methods from the blueprint)
```

## Details

In object-oriented programming, we want to create objects that not only store data (attributes) but can also perform actions. Methods are how we define these actions. The syntax for defining a method is nearly identical to defining a regular function, with the crucial exception of the first parameter, `self`. This special [[Python - The 'self' Argument|'self' argument]] is the link that gives the method access to the specific object's own data and other methods, enabling the core principle of [[Python - Encapsulation (Bundling State and Behavior)|encapsulation]].

#### Primary Goal

To define the behaviors and actions that an object of a particular class can perform.

#### Mechanism

- **Step 1: Define the Class**
    - Start by creating a class using the `class` keyword. This acts as the container for your methods and attributes.
- **Step 2: Define the Method**
    - Inside the class, use the `def` keyword to define a function. This function is now a method of the class. The first parameter must be `self`.
- **Step 3: Add Parameters and Logic**
    - After `self`, you can add any other parameters the method needs to do its job. The indented block following the `def` line contains the code that executes when the method is called.

```python
# --- Step 1: Define the Class ---
class Customer:
    # --- Step 2: Define the Method ---
    # The 'identify' method is defined within the Customer class.
    # It takes 'self' as its first argument, which will refer to a specific Customer object.
    # --- Step 3: Add Parameters and Logic ---
    # It also takes a 'name' parameter.
    def identify(self, name):
        # The method's logic is to print a formatted string.
        print("I am Customer " + name)

# To use this, you would first create an instance and then call the method:
c1 = Customer()
c1.identify("Alice") # Output: I am Customer Alice
```

 [[Code - Method Definition Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **The `self` Parameter**
    - This is the most critical parameter. It is passed automatically by Python when you call a method on an object. It represents the instance itself, giving the method access to the object's attributes and other methods. See [[Python - The 'self' Argument]] for a deep dive.
- **Positional & Keyword Arguments**
    - After `self`, a method can accept any other type of Python function arguments (positional, keyword, `*args`, `**kwargs`). These are provided by the caller when the method is invoked.

#### Core Trade-offs

- **Pro: Encapsulation**
    - Methods bundle behavior directly with the data they operate on. This improves code organization and makes it easier to understand what an object can do. This is the core idea of [[Python - Encapsulation (Bundling State and Behavior)|encapsulation]].
- **Pro: Reusability**
    - Once a method is defined in a class, every object created from that class gets its own copy of that behavior, promoting code reuse.
- **Con: Tight Coupling**
    - If a method relies heavily on the internal state (many attributes) of an object, it can become tightly coupled to the class's implementation. Changes to the class's data structure might require rewriting many methods.

## Connections

```
                  (Parent)
                Python - Objects
                       ▲
                       │
       ┌───────────────┼────────────────────────────┐
       │               │                            │
(Key Component)   ┌───────────────────────────┐      (Contrast)
The 'self' Argument │     Method Definition     │  Object Method Call vs Class Method Call
                  └───────────────────────────┘
                       │
                       ▼
                  (Principle)
        Encapsulation (Bundling State and Behavior)
```

### Parent Concept

Methods are a fundamental component of [[Python - Objects|Python objects]], defining the behaviors that an instance of a class can perform.

### Child Concepts



### Related Concepts 

- The special [[Python - The 'self' Argument|'self' argument]] is the mandatory first parameter of any instance method, providing the link between the method and the specific object it was called on.
- Understanding method definition is crucial for grasping the difference between an [[Python - Object Method Call vs Class Method Call|object method call and a class method call]].
- Defining methods is the primary way to achieve [[Python - Encapsulation (Bundling State and Behavior)|encapsulation]], which bundles an object's data and the operations that can be performed on that data.
## Questions

- You're designing a data processing library. When would you choose to implement a specific transformation as a method on a `Dataframe` class versus a standalone function that takes a dataframe as an argument? How does this choice impact the library's API design and usability for the end-user?
- Imagine a `User` class with a `send_email` method that integrates with a third-party email service. How would you design this method and the surrounding class to be resilient to API changes from the email provider, and how would you implement monitoring to detect when the integration fails in a production environment?
- What if Python methods were 'static' by default, meaning they had no `self` argument and couldn't access instance-specific attributes? How would you have to redesign object-oriented patterns like the State pattern or the Strategy pattern to work in this paradigm?
