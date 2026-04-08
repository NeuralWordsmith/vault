---
tags: 
  - core
  - python
  - object-oriented
  - dot_notation
  - instance_methods
  - attributes
  - behavior
  - concept
source: 
  - "[[Introduction to Python]]"
related: 
  - "[[Python - Objects]]"
  - "[[Python - Method Dot Notation]]"
  - "[[Python - Functions vs Methods]]"
  - "[[Python - Type-Specific Methods]]"
  - "[[Python - Mutating Methods]]"
  - "[[Python - String Methods]]"
  - "[[Python - List Methods]]"
  - "[[Fundamental - Programming]]"
  - "[[Python - Data Types]]"
  - "[[Python - Classes]]"
  - "[[Python - Functions]]"
  - "[[Python - Attributes]]"
---
# Core: Methods

## Summary

>A method is a function that is bound to a specific object, allowing it to act upon or query the data contained within that object. The available methods depend entirely on the object's type; for example, a string object has different capabilities (methods) than a list object, a concept known as [[Python - Type-Specific Methods|type-specific methods]].

**Why This Matters:** Methods are the primary way we interact with and manipulate data stored in Python objects, making them the essential verbs of the language for getting work done.

_Analogy:_ _Think of a Python object as a Swiss Army Knife and its methods as the individual tools on it (the blade, the corkscrew, the screwdriver). The knife itself (the object) holds all the tools together. To perform a specific action, like opening a bottle, you don't use a separate, generic 'opener' function; you select the corkscrew tool that 'belongs to' the knife and use it. The tool is designed specifically to work with the main body of the knife._

*   **Python Object:** The Swiss Army Knife itself (e.g., a `list` object).
*   **Method:** A specific tool on the knife (e.g., the `.sort()` method).
*   **Action:** Using the tool for its intended purpose (e.g., sorting the list).
*   **Where it breaks down:** A Swiss Army Knife has a fixed set of tools. In Python, especially with custom classes, you can define your own new methods, making objects far more flexible and extensible.

```
[Object] ──── .method_name(arguments) ────> [Result]
   (e.g., list)      (e.g., .append(5))      (Original list is now modified)
```

## Details

Python objects are not just passive containers for data; they come with built-in capabilities called methods. These are like specialized functions that "belong to" an object and are designed to work with that object's specific data. For instance, a string object has methods like `capitalize()` and `replace()`, while a list object has different methods like `append()` and `sort()`. This concept is fundamental to object-oriented programming in Python, where data and the operations on that data are bundled together. The way we access these methods is through [[Python - Method Dot Notation|dot notation]]. Key categories of methods include **[[Python - String Methods|string methods]]**, **[[Python - List Methods|list methods]]**, and **[[Python - Mutating Methods|mutating methods]]** which modify the object directly.

#### Primary Goal

To provide a clean, intuitive, and type-safe way to perform common operations on the data contained within an object.

#### Mechanism

- **Step 1: Create an Object**
    - First, an object of a specific type is created and assigned to a variable. This object holds some data.
- **Step 2: Access a Method**
    - Using [[Python - Method Dot Notation|dot notation]] (a period `.`), you specify which of the object's available methods you want to use.
- **Step 3: Call the Method**
    - You execute the method by adding parentheses `()` after its name. Any required information, called arguments, is passed inside these parentheses.
- **Step 4: Observe the Result**
    - The method performs its action. This might involve returning a new object with a new value, or it might modify the original object in-place, a behavior characteristic of [[Python - Mutating Methods|mutating methods]].

##### Code Translation

```python
# --- Step 1: Create Objects ---
# A string object
place = "new york city"
# A list object
heights = [6.2, 5.9, 5.4, 6.1]

# --- Step 2 & 3: Access and Call Methods ---
# Access the capitalize() method on the string object
place_capitalized = place.capitalize()

# Access the sort() method on the list object
# This is a mutating method, so it doesn't return a new list
heights.sort()

# --- Step 4: Observe the Results ---
# The original string is unchanged, a new one was returned
print(f"Original string: {place}")
print(f"New, capitalized string: {place_capitalized}")

# The original list has been modified in-place
print(f"Sorted list: {heights}")
```

 [[Code - Methods Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Arguments (Parameters)**
    - Methods can accept arguments inside their parentheses to control their behavior, just like functions.
    - **No Arguments:** Some methods perform a fixed action and require no extra information. 
*Example:* `"hello".upper()`
    - **Required Arguments:** Many methods need information to do their job.
*Example:* `my_list.append(42)` requires the item `42` to add.
    - **Optional Arguments:** Some methods have default behaviors but allow for customization with optional arguments.
*Example:* `"apple,banana,cherry".split(',')` uses a comma as a separator, but `split()` can also be called with no arguments to split on whitespace.

#### Core Trade-offs

- **Clarity vs. Discovery**
    - Methods lead to highly readable, self-documenting code (e.g., `customer_list.sort()`). However, this relies on the programmer knowing or looking up which methods are available for a given object type, which can be a barrier for beginners.
- **Risk of Unintended Mutation**
    - A key distinction is between methods that return a new object (like `string.upper()`) and [[Python - Mutating Methods|mutating methods]] that modify the object in-place (like `list.sort()`). In-place mutation is memory-efficient but can lead to subtle bugs if the same object is being used in multiple parts of a program and is changed unexpectedly.

## Connections

```
              (Parent)
           Python Objects
                  ▲
                  │
  ┌───────────────┼────────────────────────────┐
  │               │                            │
(Syntax)   ┌──────────────────┐           (Contrast)
Dot Notation │     Methods      │      Functions vs Methods
           └──────────────────┘
                  │
       ┌──────────┴──────────┐
       │                     │
String Methods        List Methods
(Type-Specific)       (Type-Specific)
```

### Parent Concept

The concept of methods is a direct extension of [[Python - Objects|Python Objects]], as methods are functions that are bound to object instances, defining their behavior.

### Child Concepts

- A common category is [[Python - String Methods|string methods]], which perform operations specific to text data, like `upper()` or `split()`.
- Another key category is [[Python - List Methods|list methods]], designed for ordered collections, including actions like `append()` and `sort()`.

### Related Concepts 

- The syntax for using methods is defined by [[Python - Method Dot Notation|dot notation]].
- Methods are a key differentiator from standalone functions, a distinction explored in [[Python - Functions vs Methods|Functions vs Methods]].
- The specific methods available to an object are determined by its type, a concept known as [[Python - Type-Specific Methods|type-specific methods]].
- A critical behavior to understand is whether a method modifies the original object, as covered in [[Python - Mutating Methods|mutating methods]].
## Questions

- You're designing a data processing library. You have a choice between creating methods that mutate objects in-place for performance gains (less memory allocation) versus methods that always return new, modified copies for safety and predictability. How would you decide which approach to use as the default, and how would you justify this to your team in terms of long-term code maintainability vs. raw performance?
- Imagine a large-scale application where a central `user_profile` object is passed through many different services. If this object has mutating methods (e.g., `user.add_to_cart()`), what specific monitoring and logging strategies would you implement to trace how and where the object's state changes, especially when debugging a production issue where the state is unexpectedly corrupted?
- What if Python had no concept of methods, and all operations were performed by standalone functions that took the object as the first argument (e.g., `capitalize(my_string)` instead of `my_string.capitalize()`). What would be the single biggest advantage and disadvantage of this design for a large, complex codebase?