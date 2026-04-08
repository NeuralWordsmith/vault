---
tags: 
  - core
  - python
  - identity
  - equality
  - reference
  - value
  - object_comparison
  - concept
source: 
  - "[[Introduction to Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Objects]]"
  - "[[Python - Object Memory Allocation & References]]"
  - "[[Python - __eq__ Special Method]]"
  - "[[Python - Operator Overloading]]"
  - "[[Python - Implementing Custom Object Equality]]"
  - "[[Python - Comparison Operator Special Methods]]"
  - "[[Python - Data Types]]"
  - "[[Python - Variables]]"
  - "[[Python - List Memory Model (Reference vs. Value)]]"
  - "[[Python - Hashing and __hash__]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Sets]]"
---
# Core: Built-in vs Custom Object Comparison

## Summary

>By default, Python's equality operator (`==`) checks if two custom object variables point to the exact same location in memory (identity), not whether their internal data is identical (equality). This often leads to the unexpected result of `False` when comparing two objects that seem logically the same.

**Why This Matters:** Understanding this distinction is critical for preventing subtle bugs where your program fails to recognize that two objects represent the same real-world entity, leading to incorrect data processing and flawed logic.

_Analogy:_ _Imagine you have two brand-new, identical copies of the same book, "The Python Guide." If you ask, "Are these the exact same physical object?" the answer is no; you're holding two separate books. This is Python's default check (identity). If you ask, "Do these books have the exact same content?" the answer is yes. This is the logical equality check you usually want._

**Where it breaks down:** The analogy implies you can just open the books to check the content. In Python, you have to explicitly teach the `class` *how* to "open the book and compare the content" by implementing a special method like [[Python - __eq__ Special Method|__eq__]]. Without that instruction, Python only checks if they are the same physical book.

```
```
Memory
┌──────────────────────────────────────────┐
│                                          │
│   Variable          Address      Object  │
│   `customer_one` ───> 0x100 ┌──────────────────┐
│                            │ name: "Maryam"   │
│                            │ balance: 3000    │
│                            │ acc_id: 123      │
│                            └──────────────────┘
│                                          │
│   `customer_two` ───> 0x200 ┌──────────────────┐
│                            │ name: "Maryam"   │
│                            │ balance: 3000    │
│                            │ acc_id: 123      │
│                            └──────────────────┘
│                                          │
└──────────────────────────────────────────┘

`customer_one == customer_two` compares 0x100 and 0x200 -> False
```
```

## Details

When we create two objects from the same class blueprint with identical attributes, our intuition suggests they should be treated as equal. However, Python's default behavior for custom objects contradicts this. It doesn't look inside the objects to compare their data; instead, it compares their memory addresses. This is a fundamental concept in Python's object model, stemming from the distinction between [[Python - Object Memory Allocation & References|object references and the values they point to]]. The two main types of comparison are **identity comparison** and **equality comparison**.

#### Primary Goal

To clarify why `object_one == object_two` can be `False` even with identical data, highlighting the need for developers to define their own logic for what makes two custom objects "equal".

#### Mechanism

- **Identity Comparison (`is` operator):**
    - Checks if two variables refer to the *exact same object* in memory. It is a strict test for whether two variables are aliases for one single object.
    - This is equivalent to comparing the results of the built-in `id()` function: `id(a) == id(b)`.
    - *Example: `customer_one is customer_two` will be `False` because they are two separate instances, each with its own memory address.*
- **Equality Comparison (`==` operator):**
    - **For Built-in Types:** For types like integers, strings, and lists, `==` compares the *actual values* or contents. `5 == 5` is `True`, and `[1, 2] == [1, 2]` is `True`.
    - **For Custom Objects (Default):** For objects you define with `class`, the `==` operator, by default, behaves exactly like the `is` operator. It checks for identity, not the equality of attributes. This is the source of the confusion.
    - **For Custom Objects (Overloaded):** To achieve logical equality, you must tell Python how to compare your objects. This is done through [[Python - Operator Overloading|operator overloading]], specifically by [[Python - Implementing Custom Object Equality|implementing the `__eq__` special method]] within your class.

##### Code Translation

```python
class Customer:
    def __init__(self, name, balance, acc_id):
        self.name = name
        self.balance = balance
        self.acc_id = acc_id

# --- Step 1: Create two distinct objects with identical data ---
# Even though the data is the same, Python allocates two different memory slots.
customer_one = Customer("Maryam Azar", 3000, 123)
customer_two = Customer("Maryam Azar", 3000, 123)

# --- Step 2: Perform default comparisons ---
# Equality (==) check: By default, this checks for memory address (identity).
# Since they are different objects, this is False.
print(f"customer_one == customer_two: {customer_one == customer_two}") # -> False

# Identity (is) check: This explicitly checks for memory address.
# This is also False, as expected.
print(f"customer_one is customer_two: {customer_one is customer_two}") # -> False

# --- Step 3: Verify their memory addresses are different ---
print(f"ID of customer_one: {id(customer_one)}")
print(f"ID of customer_two: {id(customer_two)}")
```

 [[Code - Built-in vs Custom Object Comparison Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Comparison Operator:** The choice between `is` and `==` is the primary "lever".
    - Use `is` for strict identity checks (e.g., checking for singletons like `None`).
    - Use `==` for equality checks, which may require custom implementation for your objects.
- **Custom Equality Definition:** The key decision is *which attributes* define an object's equality. This business logic must be encoded in the `__eq__` method.
    - For a `Customer` object, is it just the `acc_id`? Or is it the combination of `name` and `acc_id`?

#### Core Trade-offs

- **Default Behavior (Identity Check):**
    - **Pro:** It's fast and simple. It doesn't require inspecting potentially large and complex objects.
    - **Con:** It's often not semantically correct for business logic. Two customer records with the same ID should usually be considered "equal" even if they are different objects in memory.
- **Custom Behavior (Value Check):**
    - **Pro:** Allows for correct, intuitive, and domain-specific comparisons that match real-world expectations.
    - **Con:** Requires extra work to implement the `__eq__` (and often `__hash__`) method. The comparison can be slower if it involves checking many attributes or performing complex logic.

## Connections

```
```
                  (Parent)
    Python - Object-Oriented Programming
                   ▲
                   │
┌──────────────────┼──────────────────┐
│                  │                  │
(Underlying Mechanism) ┌───────────────────────────────────┐ (The Solution)
Object Memory        │ Built-in vs Custom Object Comparison│ __eq__ Special Method
Allocation           └───────────────────────────────────┘
                                           │
                                           │
                                     (General Concept)
                                     Operator Overloading
```
```

### Parent Concept

This concept is a core aspect of [[Python - Object-Oriented Programming (OOP)]], as it defines how instances of user-defined classes interact with Python's fundamental operators.

### Child Concepts



### Related Concepts 

- The behavior described here is a direct consequence of [[Python - Object Memory Allocation & References|how Python manages object memory and references]].
- The standard solution to this problem is to implement the [[Python - __eq__ Special Method|__eq__ special method]] to define custom equality logic.
- Implementing `__eq__` is a specific form of [[Python - Operator Overloading|operator overloading]], which allows classes to work with Python's built-in operators.
- A complete guide to [[Python - Implementing Custom Object Equality|implementing custom object equality]] shows the practical steps to resolve the default comparison issue.
- This concept is one of many covered by [[Python - Comparison Operator Special Methods|comparison operator special methods]], which also include methods for less than (`__lt__`), greater than (`__gt__`), etc.
## Questions

- Imagine a system where `Customer` objects are frequently added to a `set` to find unique customers. If you forget to implement `__eq__` and `__hash__`, what is the direct business impact on data quality, and how would you explain the cost of this technical oversight to a product manager?
- In a distributed system with multiple services, you receive two `Customer` JSON payloads that are textually identical. When deserialized, they become two distinct objects in memory. How would you design a robust, system-wide 'entity equality' service that ensures these two objects are treated as the same entity, and what are the performance implications of this check at scale?
- What if Python's default `==` operator for custom objects performed a deep, recursive comparison of all attributes by default? What new categories of bugs or performance nightmares might this 'intuitive' behavior introduce, especially in complex applications with circular references?