---
tags: 
  - core
  - python
  - pass_statement
  - placeholder
  - class_scaffolding
  - minimal_class
  - concept
source: 
  - "[[Introduction to Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Class Definition]]"
  - "[[Python - Object Instantiation]]"
  - "[[Python - Objects]]"
  - "[[Python - Class Methods]]"
  - "[[Python - The 'self' Argument]]"
  - "[[Python - Class Attributes]]"
  - "[[Python - Attribute Assignment within Methods]]"
  - "[[Python - Accessing Object Attributes]]"
  - "[[Python - Encapsulation (Bundling State and Behavior)]]"
  - "[[Python - User-Defined Functions]]"
  - "[[Python - Scope]]"
  - "[[Fundamental - Programming]]"
---
# Core: Empty Class

## Summary

>An empty class in Python is a class definition that contains no methods or attributes. It is created by using the `pass` statement within the class body. The `pass` statement is a null operation; nothing happens when it executes. This technique serves as a placeholder, allowing you to define the structure of your code, like a blueprint, before filling in the details. Even though it's empty, it's a complete, valid class from which you can perform [[Python - Object Instantiation|object instantiation]].

**Why This Matters:** Using an empty class with `pass` allows developers to build the structural skeleton of a program first, enabling iterative development and preventing syntax errors for code that is not yet written.

_Analogy:_ _An empty class is like an empty folder on your computer that you've labeled "Vacation Photos." You've created the container and given it a name, establishing its place in your file system. You know what it's for, but you haven't put any photos in it yet. You can still interact with the folder (move it, rename it), just as you can create an object from an empty class, but it doesn't contain any specific data (attributes) or functionality (methods) yet._

**Where it breaks down:** Unlike a simple folder, a Python object instantiated from an empty class can have attributes and even methods dynamically added to it after its creation. A standard file folder doesn't typically gain new, inherent functionalities after it's been created.

```
class Customer:
    │
    └── pass  # A null operation; a placeholder.
             # It satisfies the need for an indented block.

# Result: A valid, but empty, class blueprint is created.
# You can now create Customer objects, even though they have no
# custom attributes or methods yet.
```

## Details

In Python, every `class` or `def` block requires an indented body of code. Sometimes, when designing a program, you know you'll need a class, but you haven't decided on its attributes or methods yet. The `pass` statement solves this by acting as a syntactically valid placeholder. It literally does nothing, but it satisfies Python's requirement for an indented block, allowing you to create a minimal, "empty" class. This is a fundamental tool for top-down design and scaffolding, letting you outline your program's structure first and fill in the logic later.

#### Primary Goal

To serve as a syntactically correct placeholder for a class definition, allowing for incremental development without causing indentation errors.

#### Mechanism

- **Step 1: Define the Class**
    - Start the class definition using the `class` keyword followed by the desired class name (e.g., `Customer`) and a colon. This signals the beginning of a new class blueprint, as covered in [[Python - Class Definition|class definitions]].
- **Step 2: Use the `pass` Statement**
    - In the indented block following the class declaration, write the `pass` statement. This tells the Python interpreter that the class body is intentionally empty and that no action should be taken.
- **Step 3: Instantiate an Object**
    - Even with an empty definition, you can create an instance of the class. This process, known as [[Python - Object Instantiation|object instantiation]], creates a valid object in memory that belongs to the `Customer` class.

##### Code Translation

```python
# --- Step 1: Define the Class ---
class Customer:
    # --- Step 2: Use the pass Statement ---
    # This is a placeholder for future attributes and methods.
    pass

# --- Step 3: Instantiate an Object ---
# We can create an object from this "empty" class.
new_customer = Customer()

# The object exists and has a type.
print(new_customer)
print(type(new_customer))
```

 [[Code - Empty Class Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- An empty class itself has no parameters or 'levers' to adjust. The `pass` statement is a fixed keyword with no arguments.

#### Core Trade-offs

- **Pro: Facilitates Top-Down Design**
    - Allows developers to outline the high-level structure of an application (the classes and their relationships) without getting bogged down in implementation details. This is excellent for scaffolding and planning.
- **Pro: Prevents Syntax Errors**
    - Python requires an indented block after a `class` or `def` statement. `pass` provides a syntactically valid way to leave these blocks empty temporarily.
- **Con: Can Lead to Incomplete Code**
    - If placeholders are not tracked properly (e.g., with `TODO` comments), they can be forgotten, leaving non-functional parts in the codebase.

## Connections

```
                      (Parent)
                 Class Definition
                         ▲
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                    │
(Used for)      ┌──────────────────┐      (Enables)
Placeholder     │   Empty Class    │      Object Instantiation
                └──────────────────┘
```

### Parent Concept

The concept of an empty class is a specific technique used within the broader framework of a [[Python - Class Definition|class definition]].

### Child Concepts



### Related Concepts 

- Once an empty class is defined, the next logical step is [[Python - Object Instantiation|object instantiation]] to create an actual object from that blueprint.
- An empty class is essentially a class definition waiting for [[Python - Class Methods|class methods]] to be added to define its behavior.
- Similarly, it serves as a shell until [[Python - Class Attributes|class attributes]] are defined to hold its state.
## Questions

- In a large, multi-team project, when would you advocate for committing empty class definitions to the main branch versus waiting for a more complete implementation? How does this choice impact development velocity versus code quality risk?
- Imagine a system where plugins are loaded dynamically. How could you use empty classes or abstract base classes as a 'contract' to ensure that all plugins, even those developed by third parties, conform to a required interface, and what happens if a plugin developer forgets to override the `pass` statements?
- What if the `pass` statement didn't exist in Python? What alternative language constructs or design patterns would you use to achieve the same goal of creating a placeholder class definition, and what would be the downsides of those alternatives?