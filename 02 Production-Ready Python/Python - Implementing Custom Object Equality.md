---
tags: 
  - process
  - python
  - type_checking
  - equality
  - __eq__
  - dunder_methods
  - object_comparison
  - concept
source: 
  - "[[Introduction to Object-Oriented Programming in Python]]"
related: 
  - "[[Python - __eq__ Special Method]]"
  - "[[Python - Operator Overloading]]"
  - "[[Python - Default Object Comparison Behavior]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Inheritance]]"
  - "[[Python - Polymorphism]]"
  - "[[Python - Special Methods]]"
  - "[[Python - type() function]]"
  - "[[Python - isinstance() function]]"
  - "[[Python - Comparison Operators]]"
  - "[[Python - Object Memory Allocation & References]]"
  - "[[Python - Built-in vs Custom Object Comparison]]"
  - "[[Python - Comparison Operator Special Methods]]"
---
# Process: Type Checking in Custom Equality

**Why This Matters:** Adding a type check to custom equality methods prevents logical errors where objects of different classes are incorrectly treated as identical just because their attribute values happen to match.
## Goal & Analogy

> **Goal:** When defining custom object comparison using the [[Python - __eq__ Special Method|__eq__ special method]], solely comparing attribute values can lead to a logical flaw: an object of one class could be considered equal to an object of a completely different class if they happen to share attribute names and values. To prevent this, a robust implementation of `__eq__` should also verify that both objects belong to the same class, ensuring a stricter and more accurate definition of equality.

_Analogy:_ _Imagine you're a bouncer checking IDs. The default behavior is just checking if two people are literally the same person (memory address). A basic custom check is like looking at the name and birthdate on two ID cards. If 'John Smith, born 1/1/1990' is on both, you'd say they match. However, type checking is the crucial next step: you also check if both IDs are of the same *type*. Is one a 'Driver's License' and the other a 'Student ID'? Even with matching data, they serve different purposes and aren't truly interchangeable. You must confirm both are 'Driver's Licenses' for them to be considered equivalent in that context._

**Where it breaks down:** In the real world, a Driver's License and a Student ID for the same person are both valid representations of that individual. In programming, we often need stricter, more distinct boundaries; a `Customer` object and an `Employee` object should almost never be considered equal, even if they share an ID number.

```
obj1 == obj2
   │
   ▼
Customer.__eq__(obj1, obj2)
   │
   ├─> 1. Check Types: type(obj1) == type(obj2) ?
   │      │
   │      └─> If False, return False immediately.
   │
   └─> 2. Check Attributes (only if types match):
          (obj1.id == obj2.id) AND (obj1.name == obj2.name) ?
          │
          └─> Return final result (True/False)
```

## The Step-by-Step Process

### Prerequisites / Inputs

- **Strict Check: `type(self) == type(other)`**
    - This is the most rigid form of type checking. It returns `True` only if the two objects are instances of the *exact same class*. It will return `False` for instances of a subclass.
- **Flexible Check: `isinstance(other, type(self))`**
    - This check is more accommodating to inheritance. It returns `True` if `other` is an instance of `self`'s class *or any of its subclasses*. This is often preferred as it aligns better with the principles of polymorphism, but the choice depends on the specific logic required.

### The Steps

- **Step 1: Define the `__eq__` Method**
    - Within your class, define the special method `def __eq__(self, other):`. This method is automatically called whenever the `==` operator is used on instances of the class.
- **Step 2: Compare Core Attributes**
    - Write the boolean logic to compare the essential attributes of `self` and `other`. For example, `(self.acc_id == other.acc_id) and (self.name == other.name)`.
- **Step 3: Add the Type Check Condition**
    - Append an additional check to the return statement using a logical `and` to ensure the types are identical: `and (type(self) == type(other))`. The entire expression will now only return `True` if both the attributes and the types match.

##### Code Translation

```python
class Customer:
    def __init__(self, acc_id, name):
        self.acc_id = acc_id
        self.name = name

    # Will be called when == is used
    def __eq__(self, other):
        # --- Step 1 & 2: Define method and compare attributes ---
        # (self.acc_id == other.acc_id) and (self.name == other.name)

        # --- Step 3: Add the type check ---
        # Returns True if the objects have the same attributes
        # and are of the same type
        return (self.acc_id == other.acc_id) and (self.name == other.name) \
               and (type(self) == type(other))

# --- Example Usage ---

class Employee:
    def __init__(self, acc_id, name):
        self.acc_id = acc_id
        self.name = name

c1 = Customer(123, "Alice")
e1 = Employee(123, "Alice")

# Without the type check, this would incorrectly return True.
# With the type check, it correctly returns False.
print(c1 == e1) 
# Expected Output: False
```

### Deliverables / Outputs

While overriding the `__eq__` method to compare attributes is a significant improvement over [[Python - Default Object Comparison Behavior|Python's default memory address check]], it introduces a new potential issue. Without an explicit type check, a `Customer` object could be evaluated as equal to, for instance, a `Product` object if they both happen to have an `id` and `name` attribute with identical values. This can lead to subtle and hard-to-find bugs. The solution is to augment the attribute comparison with a type comparison, ensuring that for two objects to be equal, they must be value-equivalent *and* type-equivalent.

## Context & Tradeoffs

### When to Use This Process

To enforce a strict, logically sound definition of equality that prevents objects of different, unrelated classes from being considered equal.

### Common Pitfalls & Tradeoffs

- **Pro: Increased Robustness**
    - Prevents logical errors and unexpected behavior that can arise from comparing objects of different types. It makes the system's behavior more predictable and explicit.
- **Con: Potential Rigidity (with `type()`)**
    - Using `type()` can be too strict in object-oriented designs that rely heavily on inheritance. It can violate the Liskov Substitution Principle, where a subclass instance should be substitutable for a parent class instance. In such cases, `isinstance()` is often the more appropriate choice.

## Connections

```
                      (Parent)
               __eq__ Special Method
                         ▲
                         │
           ┌─────────────┼─────────────┐
           │             │             │
(Contrasts With) ┌───────────────────────────────┐ (Enables)
Default Object   │ Type Checking in Custom Equality│ Operator Overloading
Comparison       └───────────────────────────────┘
```


- This practice is a crucial refinement when implementing the [[Python - __eq__ Special Method|__eq__ special method]] to define custom equality.
- It provides a more robust and logically sound alternative to the [[Python - Default Object Comparison Behavior|default object comparison]], which only checks for identical memory addresses.
- Understanding this is fundamental for effective [[Python - Operator Overloading|operator overloading]], as it ensures the `==` operator behaves predictably and correctly across different object types.
- This concept is a practical application within the broader topic of [[Python - Object-Oriented Programming (OOP)|object-oriented programming]].

## Deeper Questions

- You're designing a system with a base `Vehicle` class and subclasses like `Car` and `Truck`. When implementing equality, would you use `type()` or `isinstance()`? Justify your choice based on the business logic of whether a `Car` object with the same VIN should ever be considered 'equal' to a `Truck` object.
- In a large-scale application with hundreds of classes, how would you enforce a consistent policy for implementing `__eq__` (e.g., always including a type check) to prevent bugs introduced by developers forgetting this detail? Would you use a shared base class, a metaclass, or a custom linter rule?
- What if Python's `==` operator, by default, performed a deep attribute comparison *and* a type check, instead of an identity check? What unforeseen problems or performance bottlenecks might this 'more intuitive' default behavior introduce in common programming patterns?