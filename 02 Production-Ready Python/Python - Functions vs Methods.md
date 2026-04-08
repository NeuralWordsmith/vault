---
tags: 
  - comparison
  - python
  - functions
  - methods
  - dot_notation
  - object_oriented
  - callable
  - concept
source: 
  - "[[Introduction to Python]]"
related: 
  - "[[Fundamental - Programming]]"
  - "[[Python - Objects]]"
  - "[[Python - Methods]]"
  - "[[Python - Method Dot Notation]]"
  - "[[Python - Type-Specific Methods]]"
  - "[[Python - List Methods]]"
  - "[[Python - String Methods]]"
  - "[[Python - Mutating Methods]]"
  - "[[Fundamental - Computer Science]]"
  - "[[Python - Classes]]"
  - "[[Python - Attributes]]"
  - "[[Python - Built-in Functions]]"
---
# Comparison: Python - Functions vs. Methods

## Why This Comparison Matters

> In Python, both functions and methods are callable blocks of code that perform an action. The key distinction lies in their association with [[Python - Objects|objects]]. General-purpose functions like `type()` or `max()` can operate on various types of objects. In contrast, [[Python - Methods|methods]] are functions that are 'bound' to an object of a specific type, meaning they are accessed through the object itself using [[Python - Method Dot Notation|dot notation]] and often implicitly act upon that object's data.

_Analogy:_ _Think of a public park (Python's global scope) versus your own kitchen. The park has public utilities like a water fountain or a public telephone (`functions`). Anyone can walk up and use them. Your kitchen, however, contains specific appliances like a microwave or a blender (`objects`). These appliances have their own unique buttons and controls (`methods`) that only work for that specific appliance. You can't use the microwave's 'defrost' button on the blender._

In this analogy, the public utilities (`type()`, `len()`) are like Python's built-in functions. The kitchen appliances (a list, a string) are like [[Python - Objects|Python objects]]. The specific buttons on those appliances (`.append()`, `.upper()`) are the [[Python - Methods|methods]] tied to that object's type. **Where it breaks down:** Unlike a physical appliance, a Python object is passed *implicitly* as the first argument to its method, a concept that doesn't have a direct parallel with pressing a button on a microwave.

## Side-by-Side Comparison

- **Functions**
    - Called independently and are not tied to a specific object (e.g., `len(my_list)`).
    - Operate on the data passed to them as explicit arguments.
    - Often serve a general purpose across many data types.
- **Methods**
    - Called on an object using [[Python - Method Dot Notation|dot notation]] (e.g., `my_list.append(4)`).
    - Implicitly receive the object they are called on as their first argument (conventionally named `self`).
    - Are specific to the object's type; for example, [[Python - List Methods|list methods]] differ from [[Python - String Methods|string methods]].

### Comparison Table

| Feature          | Function                             | Method                                       |
|------------------|--------------------------------------|----------------------------------------------|
| **Invocation**   | `function_name(arg1, ...)`           | `object_name.method_name(arg1, ...)`         |
| **Association**  | Independent, not bound to an object. | Bound to an object of a specific type.       |
| **First Argument** | Explicitly provided by the caller.   | Implicitly the object itself (`self`).       |
| **Example**      | `len([1, 2, 3])`                     | `my_list.append(4)`                          |

## Key Similarities

Both functions and methods are 'callables' in Python, meaning they are defined blocks of reusable code that can be executed. They can both accept arguments and return values. Fundamentally, a method is simply a function that is bound to a class.

## Verdict: When to Use Which

The distinction isn't a choice for the programmer but a fundamental aspect of Python's object-oriented design. Use a built-in function when the operation is general (e.g., finding the length of a collection with `len()`). Use a method when the operation is specific to the nature and internal state of an object (e.g., adding an item to a list with `.append()`).

## Broader Connections

```
                      (Parent)
                 Fundamental - Programming
                          ▲
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
     (Related)     ┌──────────────────────┐    (Related)
      Objects      │ Functions vs. Methods│    Dot Notation
                   └──────────────────────┘
                          │
                 ┌────────┴────────┐
                 │                 │
        Type-Specific Methods   Mutating Methods
```

- The concept of methods is intrinsically linked to [[Python - Objects|Python objects]], as methods are functions that belong to an object's class.
- Methods are invoked using [[Python - Method Dot Notation|dot notation]], which is the syntax for accessing an object's attributes and methods.
- The behavior of a method is determined by its class, leading to [[Python - Type-Specific Methods|type-specific methods]] that perform different actions for different data types.
- A key consideration is whether a method is one of the [[Python - Mutating Methods|mutating methods]], which modify the object in-place, or if it returns a new object.

## Deeper Questions

- Imagine you are designing a new data processing library for your company. When would you choose to implement a piece of functionality as a standalone function versus a method on your custom data object? How would you explain the long-term maintenance and usability benefits of your choice to the product manager?
- In a large-scale application, 'monkey-patching' (dynamically adding a new method to a class at runtime) is sometimes used. What are the system-level risks of this practice, and how could it lead to unpredictable behavior or technical debt, especially when multiple teams are working on the same codebase?
- What if Python did not have methods and only had functions? How would you have to redesign common operations like adding an element to a list or converting a string to uppercase? What would be the impact on code readability and the overall object-oriented paradigm?