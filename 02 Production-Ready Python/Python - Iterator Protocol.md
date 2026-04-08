---
tags: 
  - core
  - python
  - iterator
  - protocol
  - magic_methods
  - __iter__
  - __next__
  - concept
source: 
  - "[[Intermediate Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Iteration]]"
  - "[[Python - Custom Iterators]]"
  - "[[Python - __iter__ Magic Method]]"
  - "[[Python - __next__ Magic Method]]"
  - "[[Python - StopIteration Exception 1]]"
  - "[[Python - __next__ & StopIteration Relationship]]"
  - "[[Python - for Loop]]"
  - "[[Python - Generator Functions]]"
  - "[[Python - Generator Expressions]]"
  - "[[Python - Lists]]"
  - "[[Python - Memory-Efficient Data Processing]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Example - CoinFlips Custom Iterator]]"
  - "[[Python - Handling StopIteration with try-except]]"
---
# Core: Iterator Protocol

## Summary

>The iterator protocol is a set of rules in Python that an object must follow to be considered an iterator. It dictates that a class must implement two specific magic methods: `__iter__` and `__next__`. By defining these methods, an object can produce a sequence of values and be used in `for` loops and other iteration contexts, forming the basis for creating [[Python - Custom Iterators]].

**Why This Matters:** The iterator protocol is the fundamental contract that enables Python's `for` loop to work universally on any sequence, from simple lists to complex, custom data structures, ensuring memory-efficient data processing.

_Analogy:_ _Think of the iterator protocol like the operating instructions for a gumball machine. The machine itself is the 'iterable' data source. To get gumballs (data), you must follow a two-step protocol: first, you put a coin in and turn the handle once to 'initialize' the process (this is the `__iter__` method). Then, for each subsequent gumball, you must perform the action of turning the handle again (this is the `__next__` method). You repeat this action until the machine is empty, at which point trying to turn the handle does nothing, signaling it's finished (this is the `StopIteration` exception)._

**Where it breaks down:** A gumball machine contains a finite, pre-loaded set of items. Python iterators, especially those built with generators, can compute and yield values on the fly, potentially representing an infinite sequence (e.g., all even numbers). A physical machine cannot hold an infinite supply.

```
Iterable Object (e.g., a list, or a custom class)
       │
       │ 1. `for item in iterable:` calls iter(iterable)
       ▼
`__iter__()` method is invoked
       │
       │ 2. Returns an Iterator Object
       ▼
Iterator Object (has a `__next__` method)
       │
       ├─ 3. `next(iterator)` is called repeatedly ───> Returns next item
       │
       └─ 4. When exhausted, `__next__()` raises `StopIteration` ──> Loop terminates
```

## Details

The iterator protocol is a core concept in Python that provides a standardized way to process items in a sequence. It's the underlying mechanism that powers the `for` loop. For any object to be considered an iterator, it must follow this specific set of rules, namely, defining two special "magic" methods: `__iter__` and `__next__`. This protocol is the essential blueprint for creating [[Python - Custom Iterators]], allowing developers to define their own sequential data access patterns for any kind of object.

#### Primary Goal

To provide a single, consistent interface for sequential data access, allowing different types of objects (lists, files, custom classes) to be iterated over in the exact same way.

#### Mechanism

- **How it Works:** The protocol defines a clear, step-by-step interaction between an iterable object and the construct looping over it (like a `for` loop).
    - **1. Initialization:** When an iteration starts (e.g., `for item in my_object:`), Python's built-in `iter()` function is called on `my_object`.
    - **2. Get Iterator:** The `iter()` function invokes the object's [[Python - __iter__ Magic Method|__iter__ method]]. This method's job is to return an iterator object. Often, for a class that is its own iterator, this method simply returns `self`.
    - **3. Fetch Next Item:** The `for` loop then repeatedly calls the built-in `next()` function on the iterator object that was just returned.
    - **4. Produce Value:** The `next()` function, in turn, invokes the iterator's [[Python - __next__ Magic Method|__next__ method]]. This method contains the logic to produce the next value in the sequence and return it.
    - **5. Signal Completion:** When there are no more items to return, the `__next__` method must raise a [[Python - StopIteration Exception 1|StopIteration exception]]. The `for` loop is designed to catch this specific exception and terminate the loop gracefully. This crucial interaction is explored in [[Python - __next__ & StopIteration Relationship]].
- **Example Implementation:** A practical demonstration of this protocol can be seen in the [[Example - CoinFlips Custom Iterator]], which defines both required methods to create a custom sequence.

##### Code Translation

```python
# A basic class skeleton demonstrating the iterator protocol.
# This class, when instantiated, can be used in a 'for' loop.

class Counter:
    def __init__(self, low, high):
        self.current = low
        self.high = high

    # The __iter__ method makes this object an iterable.
    # It must return an iterator, which in this case is the object itself.
    def __iter__(self):
        return self

    # The __next__ method makes this object an iterator.
    # It returns the next value or raises StopIteration.
    def __next__(self):
        if self.current < self.high:
            num = self.current
            self.current += 1
            return num
        else:
            # Signal that the iteration is complete.
            raise StopIteration

# Usage:
# The 'for' loop automatically handles calling __iter__ once
# and __next__ repeatedly until StopIteration is raised.
for i in Counter(3, 6):
    print(i)

# Expected Output:
# 3
# 4
# 5
```

 [[Code - Iterator Protocol Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- The iterator protocol itself does not have parameters. Instead, it *is* a contract that requires the implementation of two specific parameter-less (except for `self`) methods:
    - **`__iter__(self)`:** Must be defined to make an object iterable. Its role is to return an iterator.
    - **`__next__(self)`:** Must be defined on the iterator object. Its role is to return the next item or raise `StopIteration`.

#### Core Trade-offs

- **Pro: Memory Efficiency (Lazy Evaluation)**
    - Iterators produce items one at a time and only when requested. This is incredibly memory-efficient for large or infinite datasets, as the entire collection doesn't need to be stored in memory at once.
- **Pro: Universal Interface**
    - It provides a clean, consistent API for looping. The `for` loop works on lists, tuples, dictionaries, files, and custom objects, all thanks to this single, underlying protocol, which makes code more abstract and reusable.
- **Con: Verbosity for Simple Cases**
    - For simple, one-off iteration tasks, writing a full class with `__iter__` and `__next__` can be more verbose than using a [[Python - Generator Functions|generator function]] or a [[Python - Generator Expressions|generator expression]], which implement the protocol automatically with less boilerplate code.
- **Con: Statefulness and Exhaustion**
    - An iterator is stateful; it keeps track of its current position. Once it's exhausted (i.e., it has raised `StopIteration`), it cannot be reset or reused. You must create a new iterator instance to start the iteration over.

## Connections

```
                      (Parent)
                    Iteration
                        ▲
                        │
    ┌───────────────────┼───────────────────┐
    │                   │                   │
(Alternative)  ┌────────────────────┐   (Mechanism For)
Generators     │  Iterator Protocol │   for Loop
               └────────────────────┘
                        │
             ┌──────────┴──────────┐
             │                     │
      __iter__ Method       __next__ Method
```

### Parent Concept

The iterator protocol is the fundamental mechanism that enables [[Python - Iteration]] in a standardized way across different data types.

### Child Concepts

- The protocol is defined by the [[Python - __iter__ Magic Method]], which is responsible for returning an iterator object.
- The core logic of iteration is handled by the [[Python - __next__ Magic Method]], which produces the next item in the sequence.

### Related Concepts 

- Implementing this protocol is the primary way to create [[Python - Custom Iterators|custom iterators]].
- The [[Python - for Loop|for loop]] is the most common consumer of the iterator protocol, abstracting away the manual calls to `iter()` and `next()`.
- The protocol's end-of-sequence signal is the [[Python - StopIteration Exception 1|StopIteration exception]].
- [[Python - Generator Functions|Generator functions]] provide a more concise syntax for creating objects that automatically implement the iterator protocol.
- The relationship between the core methods and the exception is detailed in [[Python - __next__ & StopIteration Relationship]].
## Questions

- You're processing a massive, multi-terabyte log file for a critical business report. Would you load the data into a list or create a custom iterator class to parse it line-by-line? How would you justify the development time of the custom iterator to a project manager focused on immediate delivery?
- Imagine a distributed system where multiple worker processes need to consume items from a single, shared data source. How would you design an iterator that is both thread-safe and ensures that each item is processed exactly once across all workers, and what are the potential race conditions or bottlenecks?
- What if the `StopIteration` exception was removed from Python? How would you redesign the iterator protocol to signal the end of an iteration, and what would be the cascading effects on the `for` loop and other language constructs?