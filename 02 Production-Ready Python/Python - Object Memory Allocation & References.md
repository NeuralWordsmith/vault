---
tags: 
  - core
  - python
  - memory_address
  - object_identity
  - __repr__
  - __str__
  - default_behavior
  - concept
source: 
  - "[[Introduction to Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Objects]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Default Object Comparison Behavior]]"
  - "[[Python - Operator Overloading]]"
  - "[[Python - __eq__ Special Method]]"
  - "[[Python - Implementing Custom Object Equality]]"
  - "[[Python - Comparison Operator Special Methods]]"
  - "[[Python - Built-in vs Custom Object Comparison]]"
  - "[[Python - List Memory Model (Reference vs. Value)]]"
  - "[[Python - Variables]]"
  - "[[Python - Data Types]]"
  - "[[Fundamental - Computer Science]]"
---
# Core: Default Object Representation

## Summary

>By default, when you try to print a custom object, Python doesn't show its internal data (like attributes). Instead, it displays the object's type and its unique memory address (e.g., `<Customer at 0x10a2b3c4d>`). This happens because the base `object` class provides a generic, fallback representation when a more specific, human-readable one hasn't been defined by the developer.

**Why This Matters:** Understanding Python's default object representation is the first step toward creating custom classes that are debuggable, user-friendly, and behave predictably in comparisons.

_Analogy:_ _Think of a Python object as a house and its variable as the mailing address. If someone asks you 'What is this?', and you only have the address (e.g., '123 Main Street'), you're giving them the default representation. You're telling them *where* it is, not *what's inside* it (e.g., a 3-bedroom, 2-bath with a blue door). To describe the house itself, you need to provide a custom description._

**Where it breaks down:** A physical address is permanent for the life of the house. In Python, an object's memory address is only valid for its current execution. If you run the program again, the same conceptual object will likely be created at a completely different memory address.

```
Variable          Memory
┌────────────┐    ┌──────────────────────────────────────────┐
│ customer_a │ ───>│ Memory Chunk @ 0x7f8c1a0d3e50            │
└────────────┘    │ ┌──────────────────────────────────────┐ │
                  │ │ Customer Object                      │ │
                  │ │  - name: "Alice"                     │ │
                  │ │  - email: "alice@example.com"        │ │
                  │ └──────────────────────────────────────┘ │
                  └──────────────────────────────────────────┘
                      ▲
                      │
print(customer_a) ────┘ (Accesses the object, but default __repr__ only reports the address)
```

## Details

The core idea stems from how Python manages memory. When an object is created, it's placed in a specific 'chunk' of memory. The variable you assign it to doesn't hold the object itself, but rather a reference—or pointer—to that memory location. The context explains that printing this object reveals this memory location because Python's default behavior is to show this unique identifier instead of guessing how to display the object's internal state. This concept is the direct foundation for [[Python - Default Object Comparison Behavior|Python's default comparison behavior]], where two separately created objects are never considered equal because they reside in different memory chunks.

#### Primary Goal

To provide a universally unique, albeit not very descriptive, string representation for any object, ensuring that every object has at least some form of identifier for debugging purposes.

#### Mechanism

- **How it Works:** The default representation is provided by the `__repr__` method inherited from Python's base `object` class.
    1. When you use `print(my_object)`, Python first looks for a `__str__` special method defined in your custom class.
    2. If `__str__` is not found, it falls back to finding a `__repr__` method.
    3. Since custom classes implicitly inherit from `object`, and the developer hasn't defined `__str__` or `__repr__`, Python uses the `object` class's default `__repr__` implementation.
    4. This default implementation returns a string formatted as `<ClassName at memory_address>`, where the address is typically shown in hexadecimal.

##### Code Translation

```python
# --- Step 1: Define a simple class without custom representation ---
class Customer:
    def __init__(self, name, email):
        self.name = name
        self.email = email

# --- Step 2: Create an instance of the class ---
customer_a = Customer("Alice", "alice@example.com")

# --- Step 3: Print the object ---
# This invokes the default representation inherited from the base 'object' class.
print(customer_a)

# Expected Output (memory address will vary):
# <__main__.Customer object at 0x7f8c1a0d3e50>
```

 [[Code - Default Object Representation Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **No Direct Parameters:** The default behavior itself has no parameters to tune.
    - Control is achieved not by modifying the default, but by overriding it.
    - You can provide a custom, human-readable representation by implementing the `__str__` (for end-users) and `__repr__` (for developers/debugging) special methods in your class. This is a form of [[Python - Operator Overloading|operator overloading]].

#### Core Trade-offs

- **Pro: Guaranteed Uniqueness & Simplicity**
    - Provides a simple, guaranteed way to get a unique identifier for an object instance, which can be useful for low-level debugging to see if two variables point to the exact same object in memory.
    - Requires zero effort from the developer; it works out-of-the-box for any class.
- **Con: Uninformative and Poor for Debugging**
    - The memory address tells you nothing about the object's current state (the values of its attributes), making it difficult to understand what the object represents at a glance.
    - This lack of information makes debugging logs and interactive sessions much less useful.

## Connections

```
                      (Parent)
                   Python - Objects
                           ▲
                           │
           ┌───────────────┼────────────────────────────┐
           │               │                            │
(General Technique) ┌───────────────────────────┐ (Direct Consequence)
Operator Overloading│Default Object Representation│ Default Object Comparison
                    └───────────────────────────┘
                           │
                           │
                  (Solution/Override)
                           │
                  __str__ / __repr__
```

### Parent Concept

This concept is a fundamental aspect of how [[Python - Objects|Python objects]] are handled in memory and by the interpreter.

### Child Concepts



### Related Concepts 

- This memory-address-based identity is the direct cause of [[Python - Default Object Comparison Behavior|Python's default object comparison behavior]], where two distinct instances are never equal.
- The general technique for changing this default behavior is [[Python - Operator Overloading|operator overloading]], which involves implementing special methods.
- To provide a meaningful equality check instead of the default, one must implement the [[Python - __eq__ Special Method|__eq__ special method]].
## Questions

- When designing a public library or SDK, what is the business risk of failing to provide a clear `__repr__` for your core objects, and how does that impact developer adoption and long-term maintenance costs?
- In a distributed system where Python objects are serialized (e.g., with pickle or JSON) and sent between services, the memory address becomes meaningless. How would you design a robust system for object identification that works across process and machine boundaries?
- What if Python's default `__repr__` for custom objects was to automatically introspect and display all of its attributes as a dictionary? What new problems could this 'helpful' feature introduce, especially for objects with circular references or those containing sensitive information?