---
tags: 
  - core
  - python
  - class_variable
  - static_variable
  - shared_state
  - oop
  - attribute
  - concept
source: 
  - "[[Intermediate Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Instance Attributes 1]]"
  - "[[Python - __init__ Method (Constructor)]]"
  - "[[Python - self Keyword]]"
  - "[[Python - Class Methods 1]]"
  - "[[Python - Instance Methods]]"
  - "[[Python - Inheritance 1]]"
  - "[[Python - Scope]]"
  - "[[Python - Instance Attributes vs Class Attributes]]"
  - "[[Python - Instance Methods vs Class Methods]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Lists]]"
---
# Core: Class Attributes

## Summary

>Class attributes are variables that belong to the class itself, rather than to any particular object (instance). Defined directly within the class body but outside of any methods, they store data that is shared among all instances. This is in direct contrast to [[Python - Instance Attributes 1|instance attributes]], which hold data unique to each object and are typically defined within the [[Python - __init__ Method (Constructor)|constructor]].

**Why This Matters:** Class attributes are essential for efficient memory usage and ensuring data consistency by providing a single, shared piece of information for all objects created from the same blueprint.

_Analogy:_ _Think of a car manufacturing plant. The blueprint for a 'Toyota Camry' is the class. A specific property on that blueprint, like 'Country of Origin: Japan', is a class attribute. Every single Camry that rolls off the assembly line (every instance) will share this same country of origin. Individual cars, however, will have unique Vehicle Identification Numbers (VINs), which are like instance attributes._

- **The Class:** The 'Toyota Camry' blueprint.
- **The Class Attribute:** The 'Country of Origin' property, which is 'Japan' for all Camrys.
- **An Instance:** A specific, physical Toyota Camry with its own VIN.
- **An Instance Attribute:** The unique VIN of that specific car.
- **Where it breaks down:** In Python, you can change the class attribute at runtime (e.g., `ToyotaCamry.country_of_origin = 'USA'`), and this change would instantly apply to all existing and future Camry objects. In the real world, you can't retroactively change the origin of all cars already built.

```
Class & Instance Attribute Relationship

[ Dog Class ]
  │
  └── species = "Canis lupus familiaris"  <── SHARED by all instances


   (Instance 1)           (Instance 2)
   [ fido_obj ]           [ buddy_obj ]
      │                      │
      └── name = "Fido"      └── name = "Buddy"

Both fido_obj.species and buddy_obj.species point back to the Dog Class's `species` attribute.
```

## Details

In Python's object-oriented programming, a class attribute is a piece of data that is owned by the class itself. It's defined directly under the class declaration, outside of methods like `__init__`. Because it's tied to the class, it acts as a shared constant or default value for every object created from that class. You can access it directly through the class name without even needing to create an object first, which distinguishes it from [[Python - Instance Attributes 1|instance attributes]] that require an object and the [[Python - self Keyword|self keyword]] for access.

#### Primary Goal

To store and manage data that is common to all instances of a class, providing a single source of truth and promoting memory efficiency.

#### Mechanism

- **Step 1: Define the Class Attribute**
    - Declare a variable directly inside the class's scope, but outside of any methods. This binds the attribute to the class blueprint.
- **Step 2: Access via the Class**
    - Retrieve the attribute's value using the `ClassName.attribute` syntax. This can be done without creating any instances of the class.
- **Step 3: Access via an Instance**
    - Create an object from the class. This object can also access the class attribute. Python first checks if the instance has its own attribute with that name; if not, it looks up to the class level.
- **Step 4: Observe the Shared State**
    - Modify the attribute through the class (`ClassName.attribute = new_value`). This change will be reflected across all existing and future instances that haven't 'shadowed' it with their own instance attribute.

##### Code Translation

```python
# --- Step 1: Define the Class Attribute ---
class Dog:
    # This is a class attribute, shared by all dogs.
    species = "Canis lupus familiaris"

    def __init__(self, name):
        # This is an instance attribute, unique to each dog.
        self.name = name

# --- Step 2: Access via the Class ---
# No instance is needed to access the class attribute.
print(f"Accessing via class: {Dog.species}")

# --- Step 3: Access via an Instance ---
# Create two instances (objects)
dog1 = Dog("Fido")
dog2 = Dog("Buddy")

# Instances can access the class attribute.
print(f"{dog1.name}'s species: {dog1.species}")
print(f"{dog2.name}'s species: {dog2.species}")

# --- Step 4: Observe the Shared State ---
# Let's say scientists reclassify the species.
# We change it once on the class.
Dog.species = "Canis familiaris"

# The change is reflected in all instances.
print(f"Fido's new species: {dog1.species}")
print(f"Buddy's new species: {dog2.species}")
```

 [[Code - Class Attributes Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Scope of Definition**
    - The key factor is *where* the variable is defined. If it's directly in the class body, it's a class attribute. If it's inside a method (usually `__init__`) and assigned to `self`, it's an instance attribute.
- **Mutability Concerns**
    - Using mutable types (like lists or dictionaries) as class attributes can be dangerous. If one instance modifies the object (e.g., `my_instance.shared_list.append(5)`), the change affects *all* other instances because they all share the exact same list object. This can lead to hard-to-debug, state-related bugs.

#### Core Trade-offs

- **Pro: Memory Efficiency & Consistency**
    - By storing a piece of data only once at the class level, you save memory compared to duplicating that data in every single instance. It also provides a single source of truth for constants or default values.
- **Con: Risk of Unintended Shared State Modification**
    - As mentioned, modifying a mutable class attribute from any instance affects all other instances. This side effect can be non-obvious and is a common source of errors for beginners.
- **Con: Attribute Shadowing**
    - If you assign a value to an attribute on an instance that has the same name as a class attribute (e.g., `dog1.species = "Wolf"`), you are creating a *new instance attribute* for `dog1` that 'shadows' or hides the class attribute. `dog1.species` will now return "Wolf", while `dog2.species` will still return the class-level value. This can lead to inconsistent behavior if not managed intentionally.

## Connections

```
                  (Parent)
          Python - Class Definition
                     ▲
                     │
┌────────────────────┼────────────────────┐
│                    │                    │
(Contrasts With) ┌───────────────────┐ (Shares Concept With)
Instance Attributes  │ Class Attributes  │ Class Methods
                     └───────────────────┘
```

### Parent Concept

Class attributes are a fundamental component used within a [[Python - Class Definition]] to establish the shared state or properties of the blueprint.

### Child Concepts



### Related Concepts 

- Class attributes stand in direct contrast to [[Python - Instance Attributes 1|instance attributes]], which store data that is unique to each individual object.
- The concept of being tied to the class rather than an instance is also central to [[Python - Class Methods 1|class methods]], which operate on the class itself.
- A clear understanding of this topic is a prerequisite for grasping the nuances discussed in [[Python - Instance Attributes vs Class Attributes]].
- They are often used to define constants or default configurations that are relevant to all objects created from a class, a pattern also seen in [[Python - Inheritance 1|inheritance hierarchies]].
## Questions

- You're building a configuration management system for a fleet of servers where most servers use port 80, but a few require custom ports. Would you store the 'port' as a class attribute or an instance attribute? Justify your decision in terms of maintainability, flexibility, and the risk of misconfiguration.
- Imagine a multi-threaded application where multiple threads create instances of a class and modify a *mutable* class attribute (e.g., a dictionary tracking active jobs). What specific concurrency problems could arise from this shared state, and how would you redesign the class to ensure it is thread-safe?
- What if Python disallowed direct modification of class attributes after the class is first defined (making them truly constant)? What common design patterns would become easier to implement safely, and which current flexible (but risky) practices would become impossible?