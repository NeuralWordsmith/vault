---
tags: 
  - core
  - python
  - instantiation
  - object_creation
  - constructor_call
  - oop
  - instance
  - concept
source: 
  - "[[Introduction to Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Objects]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Empty Class with pass]]"
  - "[[Python - Class Methods]]"
  - "[[Python - The 'self' Argument]]"
  - "[[Python - Class Attributes]]"
  - "[[Python - Accessing Object Attributes]]"
  - "[[Python - Encapsulation (Bundling State and Behavior)]]"
  - "[[Python - Data Types]]"
  - "[[Python - Variables]]"
  - "[[Fundamental - Programming]]"
  - "[[Python - List Memory Model (Reference vs. Value)]]"
  - "[[Python - Functions]]"
---
# Core: Object Instantiation

## Summary

>Object instantiation is the process of creating a specific, concrete instance of a class. Once a [[Python - Class Definition|class]] is defined, which acts as a blueprint, you can create any number of unique objects from it. As shown in the example, `c_one` and `c_two` are two distinct objects created from the `Customer` class, each existing independently in memory.

**Why This Matters:** Object instantiation is the fundamental mechanism that turns a class blueprint into a tangible, usable entity in memory, allowing you to work with multiple, independent versions of a data structure.

_Analogy:_ _Think of a class as a cookie cutter. The cookie cutter (`Customer` class) defines the shape and pattern for all cookies, but it isn't a cookie itself. When you press the cutter into the dough, you create an actual cookie (`c_one`). Each cookie you make is a separate, unique object. You can make another cookie (`c_two`) with the same cutter, and it will have the same shape, but it's a different physical cookie that you can decorate or eat independently._

**Where it breaks down:** Unlike cookies, which are static once baked, software objects are dynamic. You can change their internal data (attributes) and ask them to perform actions (methods) throughout their lifecycle.

```
[ Class: Customer ] (The Blueprint)
       │
       │ Instantiation: Customer()
       │
┌──────┴──────┐
│             │
▼             ▼
[ Object: c_one ]  [ Object: c_two ]
(Instance 1)     (Instance 2)
```

## Details

After defining a class using the `class` keyword, you need a way to actually create and use it. This process is called instantiation. In Python, this is done by calling the class name as if it were a function, followed by parentheses `()`. This action allocates memory for a new object and returns a reference to it. For example, `c_one = Customer()` creates one instance, and `c_two = Customer()` creates a completely separate second instance, even if they come from the same `Customer` blueprint.

#### Primary Goal

To create concrete, usable objects from an abstract class blueprint, allowing for the management of multiple, independent data structures that share a common form and behavior.

#### Mechanism

- **Step 1: Define the Blueprint**
    - First, a class must be defined using the `class` keyword. This serves as the template for the objects. For this example, we'll use an [[Python - Empty Class with pass|empty class]].
- **Step 2: Call the Class Name**
    - To create an instance, you call the class name followed by parentheses, like `Customer()`. This invokes the class's constructor (a special method called `__init__`) and creates the object in memory.
- **Step 3: Assign to a Variable**
    - The newly created object is then assigned to a variable (e.g., `c_one`). This variable now holds a reference to that specific object in memory, allowing you to interact with it.

##### Code Translation

```python
# --- Step 1: Define the Blueprint ---
# We define a simple Customer class. It's empty for now.
class Customer:
    pass

# --- Step 2 & 3: Call the Class and Assign to Variables ---
# We instantiate two separate objects from the Customer class.
c_one = Customer()
c_two = Customer()

# --- Verification ---
# c_one and c_two are different objects, which can be proven
# by checking their unique memory addresses.
print(f"Object c_one is of type: {type(c_one)}")
print(f"Object c_two is of type: {type(c_two)}")
print(f"Are c_one and c_two the same object? {c_one is c_two}")
```

 [[Code - Object Instantiation Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Constructor Arguments**
    - The parentheses `()` after the class name can accept arguments. These arguments are passed to a special method called `__init__` (the constructor), which is used to initialize the object's state (its attributes) upon creation.

#### Core Trade-offs

- **Benefit: Reusability and Organization**
    - Instantiation allows you to reuse the same class structure to create many objects, promoting organized, DRY (Don't Repeat Yourself) code. This is the core of [[Python - Encapsulation (Bundling State and Behavior)|encapsulation]].
- **Cost: Memory Consumption**
    - Each object instance consumes memory. Creating thousands or millions of objects can have a significant memory footprint, especially if the objects hold large amounts of data.

## Connections

```
                  (Parent)
                 Python - Objects
                       ▲
                       │
       ┌───────────────┼────────────────────────────┐
       │               │                            │
(Prerequisite)┌───────────────────────────┐     (Next Step)
Class Definition  │  Object Instantiation     │  Accessing Attributes
              └───────────────────────────┘
```

### Parent Concept

Object instantiation is a fundamental concept within the broader topic of [[Python - Objects]], as it is the very process by which objects are brought into existence.

### Child Concepts



### Related Concepts 

- The process of instantiation is only possible after a [[Python - Class Definition|class has been defined]], which acts as the necessary blueprint.
- Once an object is instantiated, the next logical step is [[Python - Accessing Object Attributes|accessing its attributes]] to read or modify its state.
- Instantiation is the first step in achieving [[Python - Encapsulation (Bundling State and Behavior)|encapsulation]], as it creates the container that bundles data (attributes) and behavior (methods) together.
## Questions

- Imagine you are designing a system for an e-commerce site that needs to represent millions of products. What are the memory and performance trade-offs between creating a full-featured `Product` object for every item upfront versus instantiating them lazily (just-in-time) when a user requests product details? How would this choice impact system responsiveness and infrastructure cost?
- In a large, distributed system, how would you manage the lifecycle of objects that are instantiated on one server but need to be used or referenced by another? Describe the challenges of serialization and deserialization (e.g., using pickle or JSON) and how you would ensure object state consistency across the system.
- What if Python's instantiation process (`ClassName()`) was asynchronous by default? How would that change the way you write object-oriented code, particularly for applications involving I/O operations like database connections or network requests within the object's constructor?