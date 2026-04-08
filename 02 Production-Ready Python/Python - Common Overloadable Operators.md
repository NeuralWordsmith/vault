---
tags:
  - "#cheatsheet"
tool:
  - "Python"
---
# Cheatsheet: Python - Common Overloadable Operators

> A quick reference guide for common commands and syntax for **Python**.

---

# Python Operator Overloading

Use magic methods (also known as dunder methods) to define or override the behavior of built-in operators for your custom classes.

### Common Overloadable Operators

The table below lists common operators and their corresponding magic methods, based on the provided context.

| Operator | Magic Method        | Operator Type |
| :------- | :------------------ | :------------ |
| `-`      | `__sub__`           | Arithmetic    |
| `!=`     | `__ne__`            | Comparison    |
| `<`      | `__lt__`            | Comparison    |
| `>`      | `__gt__`            | Comparison    |
| `+=`     | `__iadd__`          | Assignment    |
| `and`    | `__and__`           | Logical       |
| `in`     | `__contains__`      | Membership    |
| `is`     | `__is__`            | Identity      |

**Important Notes:**
*   **`and` vs `&`**: The logical `and` operator cannot be overloaded due to its short-circuiting behavior. The `__and__` method actually overloads the **bitwise AND operator (`&`)**.
*   **`is` operator**: The `is` operator checks for object identity. It is generally not meant to be overloaded, and `__is__` is not a standard magic method for this purpose in modern Python.

### Example: Overloading Comparison (`<`, `!=`)

```python
from functools import total_ordering

@total_ordering
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    # To use @total_ordering, you must define __eq__ and one rich comparison method
    def __eq__(self, other):
        if not isinstance(other, Person):
            return NotImplemented
        return self.age == other.age

    def __lt__(self, other):
        if not isinstance(other, Person):
            return NotImplemented
        return self.age < other.age

# --- Usage ---
p1 = Person("Alice", 30)
p2 = Person("Bob", 25)

print(f"p2 < p1: {p2 < p1}")   # Calls p2.__lt__(p1) -> True
print(f"p1 > p2: {p1 > p2}")   # Automatically inferred by @total_ordering -> True
print(f"p1 != p2: {p1 != p2}") # Automatically inferred from __eq__ -> True
```

### Example: Overloading Membership (`in`)

```python
class Team:
    def __init__(self, members):
        self.members = members

    # Overload the 'in' operator
    def __contains__(self, member_name):
        return member_name in self.members

# --- Usage ---
team_alpha = Team(["Alice", "Bob", "Charlie"])

print(f"'Bob' in team_alpha: {'Bob' in team_alpha}")
# Output: 'Bob' in team_alpha: True

print(f"'David' in team_alpha: {'David' in team_alpha}")
# Output: 'David' in team_alpha: False
```