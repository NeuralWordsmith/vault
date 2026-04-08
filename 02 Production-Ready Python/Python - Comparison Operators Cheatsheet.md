---
tags:
  - "#cheatsheet"
tool:
  - "Python"
---
# Cheatsheet: Python - Comparison Operators Cheatsheet

> A quick reference guide for common commands and syntax for **Python**.

---

### Comparison (Relational) Operators

These operators compare two values and return a boolean result (`True` or `False`).

| Operator | Description          | Example (`a=5`, `b=10`) | Result |
|:--------:|----------------------|-------------------------|:------:|
| `==`     | Equal to             | `a == 5`                | `True`   |
| `!=`     | Not equal to         | `a != b`                | `True`   |
| `>`      | Greater than         | `b > a`                 | `True`   |
| `<`      | Less than            | `a < b`                 | `True`   |
| `>=`     | Greater than or equal| `a >= 5`                | `True`   |
| `<=`     | Less than or equal   | `b <= 9`                | `False`  |

### Key Concepts

#### Chaining Comparisons
You can chain multiple comparison operators for more complex checks. The expression is evaluated from left to right.

```python
x = 7
# Checks if x is between 5 and 10 (inclusive of 5)
5 <= x < 10  # True

# Equivalent to: (5 <= x) and (x < 10)
```

#### Comparing Different Numeric Types
Python can compare numbers of different types (e.g., `int` and `float`).

```python
5 == 5.0   # True
10 > 9.5   # True
```

#### Comparing Strings
Strings are compared lexicographically (based on dictionary order using their underlying Unicode code points).

```python
'apple' < 'banana'  # True
'Cat' < 'cat'       # True (uppercase letters come before lowercase)
'A' == 'a'          # False
```