---
tags:
  - "#cheatsheet"
tool:
  - "Object-Oriented Programming (OOP)"
---
# Cheatsheet: Python - OOP Terminology Cheatsheet

> A quick reference guide for common commands and syntax for **Object-Oriented Programming (OOP)**.

---

### Core OOP Concepts

A quick reference for the fundamental terms in Object-Oriented Programming.

| Term      | Definition                                                              |
|-----------|-------------------------------------------------------------------------|
| **Class**     | A blueprint or template used to create objects.                           |
| **Object**    | An instance of a class, combining state (data) and behavior (functionality). |
| **Instance**  | A specific, concrete realization of an object, created from a class.     |
| **State**     | The data and properties associated with an object, stored in its attributes. |
| **Behavior**  | The functionality of an object; the actions it can perform, defined by its methods. |
| **Attribute** | A variable within a class that stores a piece of an object's state (e.g., `car.color`). Also known as a property or field. |
| **Method**    | A function defined within a class that implements an object's behavior (e.g., `car.drive()`). |

### Practical Example (Python)

This example shows how the concepts relate to each other in code.

```python
# This is the CLASS - the blueprint for a 'Dog'.
class Dog:
    # The __init__ method initializes a new object (instance).
    # 'name' and 'breed' are parameters to set the initial STATE.
    def __init__(self, name, breed):
        # ATTRIBUTES: These variables store the object's state.
        self.name = name
        self.breed = breed
        self.is_sitting = False

    # This is a METHOD - it defines a BEHAVIOR.
    def sit(self):
        """Simulates the dog sitting down."""
        if not self.is_sitting:
            self.is_sitting = True
            print(f"{self.name} sits down.")
        else:
            print(f"{self.name} is already sitting.")

    # Another METHOD defining another BEHAVIOR.
    def stand(self):
        """Simulates the dog standing up."""
        if self.is_sitting:
            self.is_sitting = False
            print(f"{self.name} stands up.")
        else:
            print(f"{self.name} is already standing.")

# Creating INSTANCES (Objects) of the Dog class.
my_dog = Dog("Fido", "Golden Retriever")
your_dog = Dog("Lucy", "Poodle")

# Accessing an object's STATE via its ATTRIBUTES.
print(f"My dog's name is {my_dog.name}.")
# > My dog's name is Fido.

# Calling METHODS to execute an object's BEHAVIOR.
my_dog.sit()
# > Fido sits down.

your_dog.stand()
# > Lucy is already standing.
```