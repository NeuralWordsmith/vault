---
tags: 
  - core
  - python
  - iterator_protocol
  - lazy_evaluation
  - stateful_object
  - memory_efficiency
  - __next__
  - concept
source: 
  - "[[Python Toolbox]]"
related: 
  - "[[Python - Iteration]]"
  - "[[Python - Iterables]]"
  - "[[Python - Iterables & Iterators Relationship]]"
  - "[[Python - next() Function]]"
  - "[[Python - iter() Function]]"
  - "[[Python - StopIteration Exception]]"
  - "[[Python - for Loop]]"
  - "[[Python - For Loop Iteration Mechanism]]"
  - "[[Python - Generators]]"
  - "[[Python - Lists]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Iterating Over Dictionaries]]"
  - "[[Python - Iterating Over Files]]"
  - "[[Python - Unpacking Iterators with the Star Operator]]"
  - "[[Fundamental - Computer Science]]"
---
# Core: Iterator

## Summary

>An iterator is a stateful object that produces the next value in a sequence each time its `next()` method is called. It remembers its position, allowing it to serve one item at a time until it has no more items, at which point it signals completion.

**Why This Matters:** Iterators enable Python to process massive datasets that are too large to fit into memory by providing a way to access elements one at a time, on demand.

_Analogy:_ _An iterator is like a Pez dispenser. The dispenser itself is the iterator, holding a stack of candies (the data). You can't see all the candies at once. To get a candy, you have to perform an action (tilting the head back), which is like calling the `next()` method. This action gives you one—and only one—candy. You can keep doing this until the dispenser is empty, and trying to get another candy from an empty dispenser results in nothing._

• **Pez Dispenser:** The iterator object.
• **Stack of Candies:** The underlying sequence of data.
• **Tilting the Head:** Calling the `next()` method.
• **Receiving One Candy:** The `next()` method returning a single value.
• **Empty Dispenser:** The iterator is exhausted.

**Where it breaks down:** Unlike a Pez dispenser which can be reloaded, a standard iterator in Python is single-use. Once it's exhausted, you cannot reset it or go backward; you must create a new iterator from the original data source.

```
Iterable (e.g., list)  ─── `iter()` ───►  Iterator Object (Stateful)
                                                │
                                                │
                                          `next()` ◄───┐
                                                │      │
                                                ▼      │ (Loop)
                                             Value     │
                                                │      │
                                                ▼      │
                                          (No more items?)
                                                │
                                                ▼
                                       `StopIteration`
```

## Details

In Python, an iterator is the actual engine that drives the process of [[Python - Iteration|iteration]]. It's an object that keeps track of its state (i.e., its current position within a sequence) and knows how to produce the next value. This contrasts with an [[Python - Iterables|iterable]], which is an object that can *produce* an iterator but doesn't handle the iteration itself. The core principle is lazy evaluation: an iterator computes and returns values only when requested, which is fundamental to its memory efficiency.

#### Primary Goal

To provide a standardized, memory-efficient mechanism for accessing elements of a collection sequentially, one at a time, without needing to load the entire collection into memory.

#### Mechanism

- **How it Works (The Iterator Protocol):**
    - An object is considered an iterator if it implements two special methods:
    1.  `__iter__()`: This method is called to initialize the iterator. It must return the iterator object itself. This allows iterators to be used where iterables are expected, such as in a `for` loop.
    2.  `__next__()`: This method is called to retrieve the next item from the sequence. It should update the iterator's internal state to point to the next item. When there are no more items to return, it must raise a `[[Python - StopIteration Exception]]` to signal the end of the iteration.
- **Key Characteristics:**
    - **Stateful:** An iterator maintains its current position. If you call `next()` on it, it gives you the next item and remembers where it left off for the subsequent call.
    - **Lazy:** It produces values on demand. The next value is not generated until the `next()` method is explicitly called.
    - **Single-Pass:** Iterators are exhaustible. Once you have traversed all the elements, the iterator is empty. To iterate again, you must create a new iterator from the original iterable.

##### Code Translation

```python
# A custom iterator class that counts up to a maximum number
class Counter:
    def __init__(self, max_num):
        self.max_num = max_num
        self.current = 0

    # The __iter__ method makes this object an iterable
    # It returns an iterator, which in this case is itself
    def __iter__(self):
        return self

    # The __next__ method makes this object an iterator
    def __next__(self):
        if self.current < self.max_num:
            self.current += 1
            return self.current - 1 # Return the value before incrementing
        else:
            # Signal that the iteration is complete
            raise StopIteration

# --- Usage ---
# Create an iterator from our Counter class
my_counter = Counter(3)

# Manually call next() to get consecutive values
print(next(my_counter)) # Output: 0
print(next(my_counter)) # Output: 1
print(next(my_counter)) # Output: 2

# The next call will raise StopIteration because it's exhausted
# print(next(my_counter)) # Raises StopIteration

# A for loop automatically handles this process
print("\nUsing a for loop:")
for number in Counter(3):
    print(number)
# Output:
# 0
# 1
# 2
```

 [[Code - Iterator Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Behavioral Control:** Iterators don't have parameters in the traditional sense. Their behavior is entirely defined by the logic implemented within their `__next__` method.
    - The sequence of values, the termination condition, and any state that needs to be managed are all coded directly into the iterator's class definition.

#### Core Trade-offs

- **Pro: Memory Efficiency**
    - Because iterators generate values one by one (lazily), they can handle infinitely long sequences or files larger than the available RAM. The memory footprint is constant, only storing the state needed to produce the next item.
- **Con: Single-Pass and Forward-Only**
    - An iterator is like a lit fuse—it only moves forward and can't be reused once it's finished. You cannot access previous elements, check the length, or reset the iterator. If you need to iterate multiple times, you must request a new iterator from the source [[Python - Iterables|iterable]].

## Connections

```
          (Parent)
      Python - Iteration
             ▲
             │
┌────────────┼────────────┐
│            │            │

(Produces)  ┌──────────────────┐  (Consumes)
Iterable    │     Iterator     │  next() Function
            └──────────────────┘
                     │
                     ▼
                 (Signals End)
            StopIteration Exception
```

### Parent Concept

An iterator is the core mechanism that enables the process of [[Python - Iteration|iteration]] in Python.

### Related Concepts 

- The relationship between these two concepts is detailed in [[Python - Iterables & Iterators Relationship|the relationship between iterables and iterators]], where an iterable is an object that can produce an iterator.
- The `[[Python - next() Function|next()]]` function is the primary way to manually consume an iterator, retrieving one element at a time.
- When an iterator has no more values to produce, it signals this by raising a `[[Python - StopIteration Exception|StopIteration]]` exception.
- The common `[[Python - for Loop|for loop]]` is built upon the iterator protocol, automatically calling `[[Python - iter() Function|iter()]]` on an iterable and then `next()` until a `StopIteration` is caught.
## Questions

- You're designing a data processing pipeline for 100GB log files. Would you recommend loading the data into a list or using an iterator-based approach (e.g., reading line-by-line)? Justify your decision to a project manager, focusing on the trade-offs between memory cost, processing speed, and implementation complexity.
- Imagine you are building a system to process a real-time, potentially infinite stream of data from a source like the Twitter API. How does the iterator protocol provide a natural and scalable way to handle this? What are the primary failure modes you would need to monitor for in a production environment?
- What if Python's `for` loop did not automatically handle the `StopIteration` exception? How would you have to rewrite your loops, and what new categories of common bugs might emerge from this change?