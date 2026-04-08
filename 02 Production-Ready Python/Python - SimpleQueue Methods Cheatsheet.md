---
tags:
  - "#cheatsheet"
tool:
  - "Python queue.SimpleQueue"
---
# Cheatsheet: Python - SimpleQueue Methods Cheatsheet

> A quick reference guide for common commands and syntax for **Python queue.SimpleQueue**.

---

### Python `queue.SimpleQueue` Cheatsheet

A `SimpleQueue` is an unbounded FIFO (First-In, First-Out) queue. It's a simplified, lock-free version of `queue.Queue` available since Python 3.7.

### Setup & Initialization

```python
import queue

# Create a new SimpleQueue instance
orders_queue = queue.SimpleQueue()
```

### Core Methods

| Method | Description | Example |
| :--- | :--- | :--- |
| `put(item)` | Adds an `item` to the end (right side) of the queue. | `orders_queue.put("Sushi")` |
| `get()` | Removes and returns an `item` from the front (left side) of the queue. | `first_order = orders_queue.get()` |
| `qsize()` | Returns the approximate number of items in the queue. | `size = orders_queue.qsize()` |
| `empty()` | Returns `True` if the queue is empty, `False` otherwise. | `if orders_queue.empty(): print("Done!")` |
| `put_nowait(item)` | Equivalent to `put(item)`. Included for compatibility with `Queue`. | `orders_queue.put_nowait("Paella")` |
| `get_nowait()` | Equivalent to `get()`, but raises `queue.Empty` if the queue is empty. | `try: item = q.get_nowait() except queue.Empty: pass` |

### Complete Example

This example demonstrates the full lifecycle of a `SimpleQueue`.

```python
import queue

# 1. Create the queue
orders = queue.SimpleQueue()

# 2. Add items to the queue (FIFO)
orders.put("Sushi")
orders.put("Lasagna")
orders.put("Paella")

# 3. Check the size
print(f"The size is: {orders.qsize()}")
# Output: The size is: 3

# 4. Remove and process items in order
print(orders.get()) # Output: Sushi
print(orders.get()) # Output: Lasagna
print(orders.get()) # Output: Paella

# 5. Check if the queue is empty
print(f"Empty queue: {orders.empty()}")
# Output: Empty queue: True
```