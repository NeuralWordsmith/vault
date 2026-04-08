---
tags: 
  - core
  - python
  - iterator_protocol
  - dunder_method
  - iteration
  - magic_method
  - self
  - concept
source: 
  - "[[Intermediate Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Iterator Protocol]]"
  - "[[Python - __next__ Magic Method]]"
  - "[[Python - StopIteration Exception 1]]"
  - "[[Python - Custom Iterators]]"
  - "[[Python - Iteration]]"
  - "[[Python - for Loop]]"
  - "[[Python - Generator Functions]]"
  - "[[Python - Generator Expressions]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - __next__ & StopIteration Relationship]]"
  - "[[Example - CoinFlips Custom Iterator]]"
  - "[[Python - Handling StopIteration with try-except]]"
---
# Core: __iter__ Magic Method

## Summary

>The `__iter__` dunder method is a fundamental part of Python's [[Python - Iterator Protocol|iterator protocol]]. Its sole responsibility is to return an iterator object, which for objects that are their own iterators, is almost always the object itself (`self`). This method signals that the object is ready to be iterated over.

**Why This Matters:** The `__iter__` method is the essential entry point of the iterator protocol, enabling an object to be used in `for` loops and other iteration contexts by officially providing the iterator.

_Analogy:_ _Think of the `__iter__` method as the "Table of Contents" in a book. When you want to start reading a book chapter by chapter, you first open it to the table of contents. The table of contents doesn't give you the story itself, but it points you to the beginning (the first chapter) and confirms that this *is* a book you can read sequentially._

The `__iter__` method is the act of opening to the table of contents. The book itself is the iterator object. The actual process of reading, turning from one page to the next, is handled by the [[Python - __next__ Magic Method|__next__ method]].

**Where it breaks down:** A table of contents gives you an overview of all chapters at once. The `__iter__` method simply returns the iterator object itself, providing the starting point without revealing the entire sequence upfront.

```
For Loop starts on `my_object`...
    │
    ▼
┌──────────────────────────┐
│ Calls my_object.__iter__() │
└───────────┬────────────┘
            │
┌───────────▼────────────┐
│ __iter__() returns self  │  <-- The core job
└───────────┬────────────┘
            │
    ▼
Loop now has the iterator object.
It will call __next__() on this object repeatedly.
```

## Details

The `__iter__` method is a cornerstone of creating [[Python - Custom Iterators|custom iterators]] in Python. As the context states, it's typically a very basic, single-line method. Its job isn't to produce values, but to declare, "I am an iterator, and you can start iterating over me." When Python's `for` loop or the `iter()` built-in function encounters an object, it first calls this `__iter__` method to get the actual iterator. For an object that is its own iterator, this method simply returns `self`, fulfilling its part of the [[Python - Iterator Protocol|iterator protocol]].

#### Primary Goal

To return an iterator object, which is usually the object itself, to signal the start of an iteration process.

#### Mechanism

- **Step 1: Define the Iterator Class**
    - Create a class that will serve as a custom iterator. This class needs to manage its own state (e.g., a counter). A good example is the [[Example - CoinFlips Custom Iterator|CoinFlips iterator]], which tracks the number of flips.
- **Step 2: Implement `__iter__`**
    - Define the `__iter__` method within the class. Its only job is to `return self`. This tells Python that this specific object instance is the iterator to be used.
- **Step 3: Implement `__next__`**
    - Define the [[Python - __next__ Magic Method|__next__ method]] to produce the next value in the sequence and update the internal state. This is where the actual iteration logic lives. It must also raise a [[Python - StopIteration Exception 1|StopIteration]] when there are no more items.
- **Step 4: Instantiate and Iterate**
    - Create an instance of the class and use it in a `for` loop. The loop will implicitly call `__iter__` once at the very beginning to get the iterator object, and then call `__next__` repeatedly.

##### Code Translation

```python
# A simple custom iterator that counts up to a limit
class Counter:
    def __init__(self, low, high):
        # --- Step 1: Define the Iterator Class (with state) ---
        self.current = low
        self.high = high

    # --- Step 2: Implement __iter__ ---
    # This method makes the object an iterator.
    # It simply returns the object itself.
    def __iter__(self):
        print("__iter__ called!")
        return self

    # --- Step 3: Implement __next__ ---
    # This method provides the next value.
    def __next__(self):
        if self.current < self.high:
            num = self.current
            self.current += 1
            return num
        else:
            # Signal that the iteration is complete
            raise StopIteration

# --- Step 4: Instantiate and Iterate ---
# The for loop first calls __iter__() on my_counter to get the iterator.
# Then, it calls __next__() repeatedly until StopIteration is raised.
my_counter = Counter(0, 3)

print("Starting for loop...")
for number in my_counter:
    print(number)

# Expected Output:
# Starting for loop...
# __iter__ called!
# 0
# 1
# 2
```

 [[Code - __iter__ Magic Method Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`self`**: The only parameter, representing the instance of the object itself. The method's entire purpose is to return this very instance to the calling context (like a `for` loop).

#### Core Trade-offs

- **Pro: Simplicity**
    - The implementation is trivial (`return self`), making it extremely easy to conform to the iterator protocol.
- **Con: Mandatory Overhead**
    - It's a required piece of boilerplate for any object that is its own iterator. While simple, it must be included for the protocol to work, which can feel redundant for simple cases.
- **Pro: Enables Separation of Concerns**
    - In more complex scenarios (e.g., a list), `__iter__` on the *container* returns a separate *iterator* object with its own state. This separates the iterable container from the iteration state, allowing multiple independent iterations over the same container. For simple custom iterators, this separation is often unnecessary.

## Connections

```
                      (Parent)
                 Iterator Protocol
                         ▲
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                    │
(Paired With)   ┌──────────────────────┐   (Signals End)
__next__        │  __iter__ Magic Method │   StopIteration
                └──────────────────────┘
                         │
                         ▼
                   (Used In)
                 Custom Iterators
```

### Parent Concept

The `__iter__` method is a core component of the [[Python - Iterator Protocol|iterator protocol]], which defines a standard way for objects to be iterated over.

### Child Concepts



### Related Concepts 

- It works in tandem with the [[Python - __next__ Magic Method|__next__ magic method]], which is responsible for producing the subsequent items in the iteration.
- The iteration process initiated by `__iter__` is eventually terminated when the `__next__` method raises a [[Python - StopIteration Exception 1|StopIteration exception]].
- Implementing both `__iter__` and `__next__` is the standard way to create [[Python - Custom Iterators|custom iterators]] in Python.
- The relationship between these two methods is central to the [[Python - __next__ & StopIteration Relationship|__next__ and StopIteration relationship]].
## Questions

- In what scenario would you design an `__iter__` method to return a *separate* iterator object instead of `self`? How would this design choice impact memory usage and state management for a system processing large, real-time data streams, and how would you justify the added complexity to your team?
- If you have a custom iterator processing a massive, potentially infinite, data source (like a network socket), what safeguards would you build around the `__iter__` and `__next__` implementation to prevent the system from hanging or consuming unbounded memory if the data source fails to signal an end?
- What if the `__iter__` method was allowed to perform a costly one-time setup operation (e.g., connecting to a database, loading a large file into a buffer)? What new failure modes would this introduce into standard Python `for` loops, and how would you have to change your error handling strategies?