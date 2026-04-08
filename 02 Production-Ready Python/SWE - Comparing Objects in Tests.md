---
tags: 
  - core
  - swe
  - object_comparison
  - equality
  - identity
  - double_equals
  - testing
  - concept
source: 
  - "[[Software Engineering Principles in Python]]"
related: 
  - "[[Python - Objects]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Operator Overloading]]"
  - "[[SWE - Unit Testing]]"
  - "[[SWE - Testing Best Practices]]"
  - "[[Python - Comparison Operators]]"
  - "[[Python - List Memory Model (Reference vs. Value)]]"
  - "[[SWE - pytest]]"
  - "[[SWE - doctest]]"
  - "[[Python - Class Attributes]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
---
# Core: Testing Object Equality

## Summary

>In Python, using the double equals operator (`==`) on custom class objects doesn't compare their contents or attributes by default. Instead, it checks if the two variables point to the exact same object in memory (identity). To correctly test if two different objects are semantically equivalent, one must compare their relevant attributes directly.

**Why This Matters:** Understanding how to properly test for object equality is crucial for writing accurate and bug-free unit tests, preventing false negatives where two semantically identical objects are incorrectly reported as different.

_Analogy:_ _Imagine you have two brand-new, identical copies of the same book, 'The Art of Programming'. If you ask, 'Are these the exact same physical object?', the answer is no. You are holding two separate books. This is like Python's `==` operator checking for memory identity. However, if you ask, 'Do these two books have the exact same content?', the answer is yes. They have the same title, author, and text. This is like comparing the objects' attributes to check for semantic equality._

**Where it breaks down:** The analogy is simplified. In Python, you can actually override the `==` operator (using the `__eq__` method) to make it behave like the 'content check' automatically, a capability physical books don't have.

```
Memory
+--------------------------------------+
| Address 0x1000                       |
|   doc1 --> [ Document Object ]       |
|            +----------------+        |
|            | title: "..."   |        |
|            | author: "..."  |        |
|            +----------------+        |
+--------------------------------------+
| Address 0x2000                       |
|   doc2 --> [ Document Object ]       |
|            +----------------+        |
|            | title: "..."   |        |
|            | author: "..."  |        |
|            +----------------+        |
+--------------------------------------+

doc1 == doc2  --> False (Compares 0x1000 vs 0x2000)
doc1.title == doc2.title --> True (Compares content)
```

## Details

When working with class objects in Python, it's a common pitfall to assume the `==` operator will check if two objects have the same attribute values. By default, for user-defined classes, `obj1 == obj2` is equivalent to `obj1 is obj2`, which only returns `True` if both variables refer to the same instance in memory. This behavior is fundamental to Python's object model. Therefore, when writing a [[SWE - Unit Testing|unit test]], simply creating two 'identical' objects and comparing them with `==` will fail, leading to confusing test results. The correct approach is to explicitly compare the attributes that define the object's state.

#### Primary Goal

To provide a reliable method for determining if two distinct object instances represent the same logical entity by comparing their internal state (attributes), rather than their memory address.

#### Mechanism

- **Step 1: Define a Simple Class**
    - First, we create a simple `Document` class with `title` and `author` attributes.
- **Step 2: Create Two 'Identical' Instances**
    - We then instantiate two separate `Document` objects with the exact same attribute values. In memory, these are two distinct objects at different addresses.
- **Step 3: The Default `==` Comparison Fails**
    - When we compare `doc1 == doc2`, Python checks if they are the same object in memory. Since they are not, the expression evaluates to `False`. This is a common source of bugs in tests.
- **Step 4: The Correct Attribute-Based Comparison Succeeds**
    - To check for semantic equality, we compare the corresponding attributes of each object. Since `doc1.title == doc2.title` and `doc1.author == doc2.author` are both `True`, we can conclude the objects are equivalent.

##### Code Translation

```python
# --- Step 1: Define a Simple Class ---
class Document:
    def __init__(self, title, author):
        self.title = title
        self.author = author

# --- Step 2: Create Two 'Identical' Instances ---
doc1 = Document("Testing in Python", "Jane Doe")
doc2 = Document("Testing in Python", "Jane Doe")

# --- Step 3: The Default `==` Comparison Fails ---
# This compares memory addresses, not content.
print(f"Are the objects the same with `==`? {doc1 == doc2}")  # Output: False

# --- Step 4: The Correct Attribute-Based Comparison Succeeds ---
# This compares the actual content (state) of the objects.
are_equal = (doc1.title == doc2.title) and (doc1.author == doc2.author)
print(f"Are the objects equal by attributes? {are_equal}") # Output: True
```

 [[Code - Testing Object Equality Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Attribute Selection**
    - The primary 'lever' is deciding which attributes are essential for defining an object's equality. For a `User` object, you might compare `user_id` but ignore a transient attribute like `last_login_timestamp`.

#### Core Trade-offs

- **Verbosity and Maintenance**
    - Manually comparing attributes for every test is verbose and error-prone. If a new attribute is added to the class, all equality checks must be updated, violating the [[SWE - DRY (Don't Repeat Yourself) Principle|DRY principle]].
- **The Better Way: `__eq__`**
    - This manual approach highlights the need for a more robust solution. The idiomatic Python way to define object equality is by implementing the `__eq__` special method, a form of [[Python - Operator Overloading|operator overloading]]. This centralizes the equality logic within the class itself.

## Connections

```
                      (Parent)
                 Python - Objects
                         ▲
                         │
┌────────────────────────┼───────────────────────────┐
│                        │                           │
(Context)      ┌───────────────────────────┐      (Solution)
SWE - Unit Testing │ Testing Object Equality │ Python - Operator Overloading
                   └───────────────────────────┘
```

### Parent Concept

This concept is a direct consequence of how [[Python - Objects|Python objects]] are handled in memory, where each instance has a unique identity.

### Child Concepts

- The manual approach described here directly motivates the need for a more elegant solution, which is to implement the `__eq__` method as part of [[Python - Operator Overloading|operator overloading]].

### Related Concepts 

- This principle is fundamental to writing effective assertions within a [[SWE - Unit Testing|unit test]].
- Failing to handle object equality correctly is a common pitfall that goes against [[SWE - Testing Best Practices|testing best practices]].
- The distinction between object identity (`is`) and value equality (`==`) is conceptually similar to the ideas in [[Python - List Memory Model (Reference vs. Value)|Python's memory model for mutable types]].
- Frameworks like [[SWE - pytest|pytest]] provide powerful assertion introspection that can help debug failing equality tests on complex objects.
## Questions

- How would you decide which attributes to include in an equality check for a complex `User` object in a social media application, considering performance implications and the business requirements for what makes two user profiles 'equal'?
- In a large-scale system with millions of objects, what are the performance implications of frequently comparing objects by their attributes versus using a unique identifier? How would you design a caching layer that relies on object equality?
- What if Python's `==` operator compared objects by attribute value by default? What unforeseen problems or design complexities might this introduce in the language and its ecosystem, particularly for mutable objects?