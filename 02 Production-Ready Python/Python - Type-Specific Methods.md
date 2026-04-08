---
tags: 
  - core
  - python
  - polymorphism
  - object-oriented_programming
  - method_overloading
  - duck_typing
  - dynamic_dispatch
  - concept
source: 
  - "[[Introduction to Python]]"
related: 
  - "[[10 Utility Notes/Fundamental - Programming.md]]"
  - "[[Python - Objects]]"
  - "[[Python - Methods]]"
  - "[[Python - Method Dot Notation]]"
  - "[[Python - String Methods]]"
  - "[[Python - List Methods]]"
  - "[[Python - Functions vs Methods]]"
  - "[[Python - Mutating Methods]]"
  - "[[10 Utility Notes/Fundamental - Computer Science.md]]"
  - "[[Python - Data Types]]"
  - "[[Python - Classes]]"
  - "[[Python - Inheritance]]"
  - "[[Python - Duck Typing]]"
---
# Core: Polymorphism

## Summary

>Polymorphism, meaning 'many forms', is a core principle in programming where objects of different types can share the same method name, but the behavior of that method is specific to the type of object it's called on. For example, the `index` method exists for both strings and lists, but it finds the position of a character in a string and the position of an element in a list.

**Why This Matters:** Polymorphism enables writing flexible, reusable code that can work with objects of different types through a common interface, drastically reducing code duplication.

_Analogy:_ _Think of the 'play' button on different devices. You have a 'play' button on your TV remote, your phone's music app, and your car stereo. The action you take is the same—pressing 'play'—but the result is different for each device: one plays a movie, one plays a song, and one plays a radio station. The button is the common interface (the method name), while the device is the object type that determines the specific action._

The 'play' button is the method (e.g., `.index()`). The devices (TV, phone, car) are the different object types (e.g., `string`, `list`). The specific action (playing a movie vs. a song) is the type-specific implementation of the method. **Where it breaks down:** This analogy doesn't fully capture that in programming, these different 'devices' can often be used interchangeably in code that's written to expect a 'playable' thing, which is the true power of polymorphism.

```
Object Type      Method Call      Behavior
-----------      -----------      --------
   String  ----▶   .index('z')  ---▶  Finds index of a CHARACTER

   List    ----▶   .index(1.73) ---▶  Finds index of an ELEMENT
```

## Details

In Python, everything is an [[Python - Objects|object]], and the type of an object determines what you can do with it. This means that the available [[Python - Methods|methods]] are different for a `string` versus a `list`. Polymorphism is the principle that allows objects of different types to respond to the same method call in a way that is specific to their type. For instance, the `index` method is available for both strings and lists. When you call it on a string, it finds the index of a character. When you call it on a list, it finds the index of an element. This allows for more intuitive and flexible code, as you can use the same logical operation name across different data structures.

#### Primary Goal

To allow a single interface, like a method name, to represent different underlying implementations, making code more generic and reusable.

#### Mechanism

- **Step 1: Create Objects of Different Types**
    - First, we define two different objects: a string named `sister` and a list named `fam`.
- **Step 2: Call a Polymorphic Method on the String**
    - We use the [[Python - Method Dot Notation|dot notation]] to call the `.index()` method on the `sister` string to find the position of the character 'z'.
- **Step 3: Call the Same Method on the List**
    - Next, we call the `.index()` method on the `fam` list to find the position of the element `1.73`.
- **Step 4: Observe the Type-Specific Behavior**
    - Notice that although the method name is identical, the action performed is tailored to the object's type. The first call searches for a character within a string, while the second searches for a complete element within a list.

##### Code Translation

```python
# --- Step 1: Create Objects of Different Types ---
# A string object
sister = "liz"
# A list object
fam = ["liz", 1.73, "emma", 1.68, "mom", 1.71, "dad", 1.89]

# --- Step 2: Call a Polymorphic Method on the String ---
# Find the index of the character 'z' in the string
string_index = sister.index("z")
print(f"Index of 'z' in the string 'liz': {string_index}") # Output: 2

# --- Step 3: Call the Same Method on the List ---
# Find the index of the element 1.73 in the list
list_index = fam.index(1.73)
print(f"Index of 1.73 in the list 'fam': {list_index}") # Output: 1

# --- Step 4: Observe the Type-Specific Behavior ---
# The same method name '.index()' behaves differently based on the object type.
```

 [[Code - Polymorphism Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Object Type**
    - The primary factor controlling a method's behavior is the type of the object it is called on. The internal implementation of `.index()` for a `string` is fundamentally different from the implementation for a `list`.
- **Method Arguments**
    - The arguments passed to the method also matter, but their interpretation is dictated by the object's type. For `string.index()`, the argument must be a string, whereas for `list.index()`, it can be any object type present in the list.

#### Core Trade-offs

- **Pro: Code Reusability and Flexibility**
    - Polymorphism allows you to write functions that can operate on objects of different types, as long as they share the required method interface (this is often called 'duck typing' in Python). This reduces code duplication.
- **Pro: Intuitive Interfaces**
    - Using common names for common operations (like `len()`, `+`, or `.index()`) across different data types makes the language easier to learn and use.
- **Con: Potential for Confusion**
    - The behavior of a polymorphic method can sometimes be surprising. For example, the `+` operator performs addition for numbers but concatenation for strings and lists. A developer must be aware of the object's type to predict the outcome accurately.

## Connections

```
                  (Parent)
             Programming
                   ▲
                   │
┌──────────────────┼──────────────────┐
│                  │                  │
(Foundation)  ┌──────────────────┐   (Contrast)
  Objects     │   Polymorphism   │   Functions vs Methods
              └──────────────────┘
                       │
            ┌──────────┴──────────┐
            │                     │
      String Methods        List Methods
    (Specific Example)    (Specific Example)
```

### Parent Concept

Polymorphism is a fundamental concept within [[10 Utility Notes/Fundamental - Programming.md|Fundamental - Programming]], particularly in the paradigm of object-oriented programming.

### Related Concepts 

- The concept is built upon the idea of [[Python - Objects|Python objects]], as the object's type is what determines which version of a method gets called.
- It is the core principle that explains why [[Python - Methods|methods]] with the same name can belong to different object types.
- A clear example is seen when comparing [[Python - String Methods|string methods]] and [[Python - List Methods|list methods]], where methods like `.index()` or `.count()` exist for both but operate differently.
- This behavior distinguishes [[Python - Methods|methods]] from functions, as explored in [[Python - Functions vs Methods|functions vs. methods]], since methods are inherently bound to the object they act upon.
## Questions

- How does polymorphism balance the benefit of a unified interface (like `+` or `len()`) with the potential cognitive overhead for developers who must remember the specific behavior for each data type, and how would you mitigate this risk when designing a public API?
- In a large-scale application with dozens of custom classes, what design patterns or documentation strategies would you implement to ensure that polymorphic methods (e.g., a `.serialize()` method on each class) behave consistently and predictably to prevent bugs in data processing pipelines?
- What if Python enforced strict method signatures, meaning a method name could only ever have one specific implementation across the entire language? How would you have to redesign common data structures like lists and strings, and what would be the cascading impact on code readability and the Python ecosystem?