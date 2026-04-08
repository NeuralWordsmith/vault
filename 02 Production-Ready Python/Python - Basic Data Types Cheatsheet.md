---
tags:
  - "#cheatsheet"
tool:
  - "Python"
---
# Cheatsheet: Python - Basic Data Types Cheatsheet

> A quick reference guide for common commands and syntax for **Python**.

---

# Python: Basic Data Types & Variables

### Core Data Types
A summary of Python's fundamental data types for single values.

| Type  | Full Name | Description              | Example         |
|-------|-----------|--------------------------|-----------------|
| `int`   | Integer   | Whole numbers (no decimals) | `42`, `-100`    |
| `float` | Float     | Real numbers (with decimals)| `3.14`, `-0.01` |
| `str`   | String    | Sequence of characters   | `"Hello"`, `'Hi'` |
| `bool`  | Boolean   | Logical true or false    | `True`, `False` |

### Variable Assignment
Store a value in a named variable using the assignment operator (=).

**Syntax:** `variable_name = value`

```python
# Assigning an integer
age = 30

# Assigning a float
price = 19.99

# Assigning a string
name = "Alice"

# Assigning a boolean
is_active = True
```

### Checking Data Types
Use the `type()` function to determine a variable's data type.

```python
x = 10          # int
y = 2.5         # float
z = "Python"    # str
a = False       # bool

print(type(x))  # <class 'int'>
print(type(y))  # <class 'float'>
print(type(z))  # <class 'str'>
print(type(a))  # <class 'bool'>
```

### Basic Type Conversion (Casting)
Explicitly convert a value from one type to another.

| Function   | Description                               | Example                               | Result      |
|------------|-------------------------------------------|---------------------------------------|-------------|
| `int()`    | Converts a float or string to an integer. | `int(9.8)`                            | `9`         |
| `float()`  | Converts an integer or string to a float. | `float("123.45")`                     | `123.45`    |
| `str()`    | Converts any value to a string.           | `str(42)`                             | `"42"`      |
| `bool()`   | Converts a value to a boolean.            | `bool(0)`, `bool("text")`             | `False`, `True` |

**Note on `bool()`:** `0`, `0.0`, `""` (empty string), and `None` evaluate to `False`. Most other values evaluate to `True`.