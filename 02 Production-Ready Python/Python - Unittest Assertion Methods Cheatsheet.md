---
tags:
  - "#cheatsheet"
tool:
  - "Python unittest"
---
# Cheatsheet: Python - Unittest Assertion Methods Cheatsheet

> A quick reference guide for common commands and syntax for **Python unittest**.

---

### Common `unittest.TestCase` Assertion Methods

A quick reference for the most frequently used assertion methods in Python's built-in `unittest` framework.

| Method | Checks That... | Example Code |
| :--- | :--- | :--- |
| `assertEqual(a, b)` | `a == b` | `self.assertEqual(4, 2 + 2)` |
| `assertNotEqual(a, b)` | `a != b` | `self.assertNotEqual(5, 2 + 2)` |
| `assertTrue(x)` | `bool(x)` is `True` | `self.assertTrue("hello")` |
| `assertFalse(x)` | `bool(x)` is `False` | `self.assertFalse("")` |
| `assertIs(a, b)` | `a` is `b` (same object identity) | `a = None; self.assertIs(a, None)` |
| `assertIsNot(a, b)` | `a` is not `b` | `a = []; b = []; self.assertIsNot(a, b)` |
| `assertIsNone(x)` | `x` is `None` | `result = my_func_that_returns_none(); self.assertIsNone(result)` |
| `assertIsNotNone(x)` | `x` is not `None` | `self.assertIsNotNone("value")` |
| `assertIn(a, b)` | `a` is in the container `b` | `self.assertIn(1, [1, 2, 3])` |
| `assertNotIn(a, b)` | `a` is not in the container `b` | `self.assertNotIn(4, [1, 2, 3])` |
| `assertIsInstance(obj, cls)` | `isinstance(obj, cls)` is `True` | `self.assertIsInstance(5, int)` |
| `assertNotIsInstance(obj, cls)` | `isinstance(obj, cls)` is `False` | `self.assertNotIsInstance("5", int)` |

### Exception Assertions

The `assertRaises` method is best used as a context manager.

```python
import unittest

def raise_value_error():
    raise ValueError("Invalid value")

class TestExceptions(unittest.TestCase):
    def test_raises(self):
        # This test passes if a ValueError is raised inside the 'with' block
        with self.assertRaises(ValueError):
            raise_value_error()

    def test_raises_with_message_check(self):
        # You can also inspect the exception object
        with self.assertRaises(ValueError) as cm:
            raise_value_error()
        self.assertEqual(str(cm.exception), "Invalid value")
```