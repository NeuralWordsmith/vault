---
tags: 
  - core
  - python
  - immutability
  - frozen
  - dataclass
  - state_management
  - hashable
  - concept
source: 
  - "[[Data Types in Python]]"
related: 
  - "[[Python - Dataclasses]]"
  - "[[Python - @dataclass Decorator]]"
  - "[[Python - Creating a Dataclass]]"
  - "[[Python - Tuples]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Class Attributes]]"
  - "[[Python - Data Types]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Hash Tables]]"
  - "[[Python - Dataclass Conversion Functions (asdict, astuple)]]"
  - "[[Python - Custom Properties in Dataclasses (@property)]]"
  - "[[Python - Class Instantiation]]"
  - "[[Python - Decorators]]"
---
# Core: Frozen Dataclass Instances

## Summary

>A frozen dataclass instance is an object whose attributes cannot be modified after it has been created. This is achieved by passing the `frozen=True` argument to the [[Python - @dataclass Decorator|@dataclass decorator]]. This feature is a cornerstone for creating reliable and immutable data structures, ensuring an object's state remains constant throughout its lifecycle.

**Why This Matters:** Using frozen dataclasses enforces immutability, which prevents accidental data corruption and makes your code more predictable and easier to debug.

_Analogy:_ _Think of a frozen dataclass instance as a commemorative plaque cast in bronze. Once the text (the data) is set and the plaque is cast (the instance is created), you can't just scratch out a name or date and write a new one. The information is permanently fixed. To change it, you would have to melt down the bronze and cast an entirely new plaque._

The plaque's text (attributes) is set at the time of casting (instantiation). Trying to alter it would require re-casting the entire plaque, just as you'd need to create a new dataclass instance to represent a change. **Where it breaks down:** Unlike a physical plaque, you can easily create a *new*, slightly different instance from an old one in Python using functions like `dataclasses.replace()`. The original instance remains untouched, but creating a modified copy is trivial.

```
Class Definition         Instance Creation         Attempted Update
+--------------------+     +-------------------+     +--------------------+
| @dataclass(frozen=True) | --> | c = Cookie(...)   | --> | c.quantity = 15    |
| class Cookie:      |     | (Object is FROZEN)  |     | (Raises Error)     |
|   name: str        |     +-------------------+     +--------------------+
|   quantity: int    |                                       │
+--------------------+                                       ▼
                                                 +-------------------------+
                                                 | FrozenInstanceError     |
                                                 +-------------------------+
```

## Details

The core idea is to provide a simple, declarative way to create immutable data structures in Python. By adding the `frozen=True` argument when [[Python - Creating a Dataclass|creating a dataclass]], we instruct Python to make all instances of that class unchangeable after they are initialized. As the example shows, if you create a `Cookie` instance and then try to update its `quantity`, Python will stop you by raising a `FrozenInstanceError`. This feature is a powerful way to enforce data integrity and prevent unintended side effects.

#### Primary Goal

To create immutable objects whose state is guaranteed to remain constant after creation, making them safe to use as dictionary keys or in sets.

#### Mechanism

- **Step 1: Decorate the Class with `frozen=True`**
    - Apply the `[[Python - @dataclass Decorator|@dataclass decorator]]` to your class definition and pass the argument `frozen=True`.
- **Step 2: Define Attributes**
    - Define the class attributes with type hints, just as you would for any standard dataclass.
- **Step 3: Instantiate the Object**
    - Create an instance of the class by providing initial values for its attributes. At this moment, the object's state becomes permanently fixed.
- **Step 4: Observe Immutability**
    - Any subsequent attempt to assign a new value to an attribute will fail, raising a `dataclasses.FrozenInstanceError`.

##### Code Translation

```python
import dataclasses

# --- Step 1 & 2: Decorate the class and define attributes ---
@dataclasses.dataclass(frozen=True)
class Cookie:
    name: str
    quantity: int = 0

# --- Step 3: Instantiate the object ---
# The 'c' object is now frozen and cannot be changed.
c = Cookie("chocolate chip", 10)

print(f"Original cookie: {c}")

# --- Step 4: Attempt modification (and fail) ---
try:
    c.quantity = 15
except dataclasses.FrozenInstanceError as e:
    print(f"\nError: {e}")

# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
#   File "<string>", line 4, in __setattr__
# dataclasses.FrozenInstanceError: cannot assign to field 'quantity'
```

 [[Code - Frozen Dataclass Instances Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`frozen` (bool)**
    - A boolean argument passed to the `@dataclass` decorator.
    - `True`: Makes instances of the class immutable. Assignments to fields will generate an exception.
    - `False` (Default): Instances are mutable, and their attributes can be changed after creation.

#### Core Trade-offs

- **Pro: Data Integrity and Hashability**
    - Frozen instances are hashable, meaning they can be used as keys in dictionaries or as elements in sets. This is because their hash value never changes.
    - Immutability prevents accidental modification of state, leading to more predictable and bug-free code, especially in complex systems or multi-threaded applications.
- **Con: Inflexibility and Performance Overhead**
    - You cannot change an object's state directly. To represent a change, you must create an entirely new instance. For frequent, minor updates, this can be less memory-efficient than modifying an object in-place.
    - The `dataclasses.replace()` helper function can ease the creation of new instances, but it still involves creating a copy, which has a performance cost.

## Connections

```
                      (Parent)
                     Dataclasses
                           ▲
                           │
           ┌───────────────┼────────────────────────────┐
           │               │                            │
     (Similar to)   ┌───────────────────────────┐   (Configured via)
        Tuples      │ Frozen Dataclass Instances│   @dataclass Decorator
                    └───────────────────────────┘
```

### Parent Concept

This concept is a specific feature of [[Python - Dataclasses|dataclasses]], which provide a concise way to create classes primarily used for storing data.

### Child Concepts



### Related Concepts 

- The `frozen=True` parameter is passed directly to the [[Python - @dataclass Decorator|@dataclass decorator]] to enable this behavior.
- This concept of immutability is a core feature that distinguishes [[Python - Dataclasses|dataclasses]] from regular, mutable Python classes.
- Immutable objects like frozen dataclasses are conceptually similar to [[Python - Tuples|tuples]], which are also immutable sequences that cannot be changed after creation.
## Questions

- Your team is building a system to track user sessions. One developer proposes using a frozen dataclass to store session data (user_id, start_time, last_seen) to prevent accidental changes. Another argues for a regular class because the `last_seen` timestamp needs frequent updates. How would you weigh the trade-off between the data integrity offered by a frozen instance versus the performance overhead of creating a new instance for every single update, and what solution would you propose?
- If you use frozen dataclass instances as keys in a large, in-memory cache (a dictionary), what potential memory consumption issues could arise if the logic for creating these keys is flawed, leading to many near-identical but distinct instances? How would you design a system to canonicalize these instances to prevent cache bloat?
- What if the Python language designers decided to make all dataclasses frozen by default? What immediate benefits and major drawbacks would the Python community experience, and what existing programming patterns would be fundamentally broken or improved?