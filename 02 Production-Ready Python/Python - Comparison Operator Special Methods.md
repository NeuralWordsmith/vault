---
tags:
  - "#cheatsheet"
tool:
  - "Python"
---
# Cheatsheet: Python - Comparison Operator Special Methods

> A quick reference guide for common commands and syntax for **Python**.

---

### Rich Comparison Methods

These "magic" or "dunder" methods allow you to define the behavior of comparison operators for your custom classes. Python calls the appropriate method when a comparison operator is used between instances of the class.

| Operator | Method                 | Description                  |
| :------- | :--------------------- | :--------------------------- |
| `==`     | `__eq__(self, other)`  | Equal to                     |
| `!=`     | `__ne__(self, other)`  | Not equal to                 |
| `<`      | `__lt__(self, other)`  | Less than                    |
| `>`      | `__gt__(self, other)`  | Greater than                 |
| `<=`     | `__le__(self, other)`  | Less than or equal to        |
| `>=`     | `__ge__(self, other)`  | Greater than or equal to     |

*Note: If `__ne__` is not implemented, it defaults to the inverse of `__eq__`. For the others, Python can sometimes infer a reversed comparison (e.g., `b > a` from `a < b`), but it's best to implement them explicitly or use `total_ordering`.*

### Implementation Example

Here's how to implement comparison methods in a custom class to compare objects based on an attribute.

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    # Implement '=='
    def __eq__(self, other):
        if not isinstance(other, Person):
            return NotImplemented
        return self.age == other.age

    # Implement '<'
    def __lt__(self, other):
        if not isinstance(other, Person):
            return NotImplemented
        return self.age < other.age

p1 = Person("Alice", 30)
p2 = Person("Bob", 40)
p3 = Person("Charlie", 30)

print(p1 == p2)  # False
print(p1 == p3)  # True
print(p1 < p2)   # True
print(p2 > p1)   # True (Python infers from __lt__)
```

### Using `functools.total_ordering`

To avoid writing all six comparison methods, you can use the `@total_ordering` decorator. You only need to define `__eq__` and one of `__lt__`, `__gt__`, `__le__`, or `__ge__`, and the decorator will fill in the rest.

```python
from functools import total_ordering

@total_ordering
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __eq__(self, other):
        if not isinstance(other, Person):
            return NotImplemented
        return self.age == other.age

    def __lt__(self, other):
        if not isinstance(other, Person):
            return NotImplemented
        return self.age < other.age

p1 = Person("Alice", 30)
p2 = Person("Bob", 40)

# All comparison operators now work automatically
print(p1 < p2)   # True
print(p1 <= p2)  # True
print(p1 > p2)   # False
print(p1 >= p2)  # False
print(p1 != p2)  # True
```