---
tags:
  - core
  - python
  - self
  - instance method
  - oop
  - convention
  - pep8
  - concept
source:
  - "[[Software Engineering Principles in Python]]"
related:
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Class Instantiation]]"
  - "[[Python - Instance Attributes 2]]"
  - "[[Python - Class Attributes]]"
  - "[[Python - Class Methods]]"
  - "[[Python - Objects]]"
  - "[[Python - Core Principles of OOP]]"
  - "[[Python - Class Syntax]]"
  - "[[Python - Methods]]"
  - "[[Python - __init__]]"
  - "[[Python - Decorators]]"
  - "[[Python - Scope]]"
---
# Core: The self Convention

## Summary

>In Python's Object-Oriented Programming, `self` is the conventional name for the first argument of an instance method. It acts as a placeholder that refers to the specific instance of the class on which the method is being called, allowing the method to access that instance's unique attributes and other methods.

**Why This Matters:** The `self` convention is the universal mechanism that allows an object's methods to access and modify its own unique data, making object-oriented programming in Python possible.

_Analogy:_ _Think of a class as a generic blueprint for a "Conference Attendee" name badge. The blueprint has a blank space labeled "Your Name Here." The `self` keyword is like that "Your Name Here" placeholder. When you create a specific attendee, John, you are instantiating the class. John's badge is the instance. When you write "John" on the badge, you are using the placeholder to assign a specific value to that specific badge. Any action related to the badge (like scanning it) uses that placeholder to know it's referring to John's information, not the generic blueprint._

**Where it breaks down:** The analogy is static. A name badge doesn't actively change its own properties. In Python, methods use `self` not just to read data but to actively call other methods and modify the instance's state (e.g., `self.has_entered_keynote = True`).

```
my_instance = MyClass("hello")
       │
       └───────────┐
                   ▼
# Python automatically calls:
MyClass.__init__(self, value)
       ▲           │
       │           │
       └───────────┘
(The object `my_instance` is automatically
 passed as the `self` argument)
```

## Details

In essence, `self` is a way to refer to a class instance from within its own methods, even though we don't know what a user will actually name their instance variable. When defining the [[Python - Class Syntax|syntax for a class]], `self` is always the first argument for typical instance methods, like `__init__`. However, Python handles passing the actual instance to this argument automatically during [[Python - Class Instantiation|instantiation]]; the user never provides it. While you could technically use a different word, `self` is a very strong PEP8 convention, and not following it makes code difficult for others to understand. It is the primary tool for creating and managing [[Python - Instance Attributes 2|instance attributes]].

#### Primary Goal

To provide a consistent and conventional way for an object's methods to access its own unique attributes and other methods.

#### Mechanism

- **Step 1: Define an Instance Method**
    - Within a class definition, create a method. The very first parameter of this method must be a reference to the instance itself. By convention, this parameter is always named `self`.
- **Step 2: Use `self` to Access and Assign Attributes**
    - Inside the method, use the dot notation on `self` (e.g., `self.attribute_name = value`) to create or modify an attribute that belongs exclusively to that specific instance.
- **Step 3: Instantiate the Class**
    - When you create an object from the class, you call the class name followed by parentheses. You only pass the arguments that come *after* `self` in the method definition.
- **Step 4: Python's Automatic Binding**
    - Behind the scenes, when you call a method on an instance (e.g., `my_instance.my_method(arg1)`), Python automatically passes the instance itself (`my_instance`) as the first argument, which is received by the `self` parameter inside the method.

##### Code Translation

```python
# --- Step 1 & 2: Define the __init__ method and use self to assign an attribute ---
class MyClass:
    """A minimal example class"""
    def __init__(self, value):
        # 'self' refers to the future instance that will be created.
        # We use it to attach the 'value' to that specific instance's 'attribute'.
        print(f"Inside __init__, self is: {id(self)}")
        self.attribute = value

# --- Step 3: Instantiate the class --- 
# Notice we only pass 'value'. Python handles passing the instance to 'self' automatically.
my_instance = MyClass(value='class attribute value')
print(f"Outside, my_instance is: {id(my_instance)}")

# --- Step 4: Python's automatic binding in action ---
# The call above is essentially syntactic sugar for this:
# MyClass.__init__(my_instance, value='class attribute value')

# We can now access the instance-specific attribute that was set using 'self'
print(my_instance.attribute)

# Output:
# Inside __init__, self is: 4389379216
# Outside, my_instance is: 4389379216
# class attribute value
```

 [[Code - The self Convention Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Positional Requirement**
    - `self` must always be the first parameter in any instance method's signature. This is a strict requirement of the Python language.
- **Naming Convention (PEP8)**
    - While the interpreter would allow any valid variable name (e.g., `this`, `instance`, `obj`), the universal and strongly enforced convention is to use the name `self`. Using any other name will make your code confusing to other Python developers and is a major violation of community standards.

#### Core Trade-offs

- **Pro: Explicitness and Clarity**
    - Having `self` explicitly in the method signature makes it immediately obvious that the method operates on instance state. It clearly distinguishes instance methods from static methods (which don't have `self`) and class methods (which have `cls`). This is aligned with the Zen of Python's "Explicit is better than implicit."
- **Con: Verbosity**
    - For programmers coming from languages like Java, C++, or C#, where the instance reference (`this`) is an implicit keyword, having to type `self` as the first argument of every method and use it to access every attribute can feel redundant and verbose.

## Connections

```
                      (Parent)
                  Class Definition
                         ▲
                         │
         ┌───────────────┼────────────────────────────┐
         │               │                            │
(Mechanism For) ┌───────────────────────────┐   (Used During)
Instance Attr.  │    The self Convention    │   Instantiation
                └───────────────────────────┘
                         │
                         ▼
                   (Foundation For)
               Object-Oriented Programming
```

### Parent Concept

The `self` convention is a fundamental concept used within a [[Python - Class Definition|class definition]] to implement the principles of object-oriented programming.

### Child Concepts

- This is a foundational concept and does not have distinct sub-types.

### Related Concepts 

- The process of [[Python - Class Instantiation|class instantiation]] is what triggers the automatic passing of the new instance to the `self` parameter of the `__init__` method.
- `self` is the primary mechanism used to create and access [[Python - Instance Attributes 2|instance attributes]], which store the unique state of each object.
- The entire concept of `self` is a cornerstone of [[Python - Object-Oriented Programming (OOP)|object-oriented programming]], enabling the encapsulation of data and behavior within an object.
- The standard [[Python - Class Syntax|class syntax]] dictates that `self` must be the first argument of any instance method.
- Understanding `self` is crucial for appreciating the [[Python - Benefits of OOP|benefits of OOP]], such as encapsulation and state management.
## Questions

- Imagine a junior developer on your team argues for using `this` instead of `self` for consistency with their JavaScript background. How would you explain the long-term cost to the project's maintainability and team collaboration, justifying the enforcement of the `self` convention even though the code would technically run?
- In a large, complex class with many methods, how could the overuse of `self` to modify state from many different places lead to a system that is difficult to debug and reason about? What design patterns (e.g., separating query methods from command methods) could you enforce to mitigate this risk as the system scales?
- What if Python's core design was changed so that `self` was an implicit, hidden variable available in every instance method, similar to `this` in other languages? What are the biggest advantages and disadvantages you foresee with this 'magic' variable approach compared to Python's explicit `self`?