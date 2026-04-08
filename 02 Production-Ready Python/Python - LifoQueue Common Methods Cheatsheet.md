---
tags:
  - "#cheatsheet"
tool:
  - "Python queue.LifoQueue"
---
# Cheatsheet: Python - LifoQueue Common Methods Cheatsheet

> A quick reference guide for common commands and syntax for **Python queue.LifoQueue**.

---

### Python `queue.LifoQueue` (LIFO Stack)

A thread-safe Last-In, First-Out (LIFO) queue implementation, which effectively behaves like a stack.

### Initialization

Import the `queue` module and instantiate `LifoQueue`. `maxsize=0` means the stack size is infinite.

```python
import queue

# Create an infinite-size stack
my_stack = queue.LifoQueue(maxsize=0)
```

### Core Methods

| Method             | Description                                                                 |
| ------------------ | --------------------------------------------------------------------------- |
| `put(item)`        | Pushes an `item` onto the top of the stack.                                 |
| `get()`            | Pops and returns the item from the top of the stack (LIFO). Blocks if empty.|
| `qsize()`          | Returns the number of items in the stack.                                   |
| `empty()`          | Returns `True` if the stack is empty, `False` otherwise.                    |
| `full()`           | Returns `True` if the stack has reached `maxsize`, `False` otherwise.       |
| `put_nowait(item)` | Equivalent to `put(item)` but raises `queue.Full` if the stack is full.     |
| `get_nowait()`     | Equivalent to `get()` but raises `queue.Empty` if the stack is empty.       |

### Practical Example

Demonstrates the LIFO (Last-In, First-Out) behavior.

```python
import queue

# 1. Initialize the stack
book_stack = queue.LifoQueue()

# 2. Add items using put()
print("Pushing items...")
book_stack.put("The Misunderstanding")
book_stack.put("Persepolis")
book_stack.put("1984")

# 3. Check the size
print(f"Stack size: {book_stack.qsize()}") # Output: Stack size: 3

# 4. Pop items using get()
print("\nPopping items (LIFO order):")
while not book_stack.empty():
    item = book_stack.get()
    print(item)

# Expected Output:
# 1984
# Persepolis
# The Misunderstanding

# 5. Verify the stack is empty
print(f"\nIs stack empty? {book_stack.empty()}") # Output: Is stack empty? True
```