---
tags: 
  - core
  - python
  - iterator
  - iteration_protocol
  - magic_method
  - dunder_method
  - stateful
  - concept
source: 
  - "[[Intermediate Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Iterator Protocol]]"
  - "[[Python - __iter__ Magic Method]]"
  - "[[Python - StopIteration Exception 1]]"
  - "[[Python - __next__ & StopIteration Relationship]]"
  - "[[Python - Custom Iterators]]"
  - "[[Python - Iteration]]"
  - "[[Python - for Loop]]"
  - "[[Python - Generator Functions]]"
  - "[[Python - Generator Expressions]]"
  - "[[Python - yield Keyword]]"
  - "[[Python - Memory-Efficient Data Processing]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Handling StopIteration with try-except]]"
---
# Core: __next__ Magic Method

## Summary

>The `__next__` dunder method is a core part of Python's [[Python - Iterator Protocol|iterator protocol]]. When called on an iterator object, it is responsible for returning the next item in the sequence and updating the iterator's internal state. When there are no more items to return, it must raise a `StopIteration` exception to signal completion.

**Why This Matters:** The `__next__` method is the engine that powers all `for` loops and sequence consumption in Python, making lazy evaluation and memory-efficient processing of potentially infinite data streams possible.

_Analogy:_ _Think of an iterator as a Pez dispenser. The `__next__` method is the act of tilting the dispenser's head back to get one candy. The dispenser itself (`the iterator`) holds all the candies (`the data`) and keeps track of which one is next. Each time you tilt the head (`call __next__`), it performs the action of pushing one candy out. You can keep doing this until the dispenser is empty. When you try to get another candy from an empty dispenser, you get nothing—this is the equivalent of the `StopIteration` exception._

The dispenser is the iterator object. The candies are the values being iterated over. Tilting the head is the `__next__()` call. The internal spring mechanism that pushes the next candy up is the iterator's internal state management. 
*   **Where it breaks down:** A Pez dispenser is finite. While many iterators are, some can be infinite (e.g., an iterator that generates prime numbers forever). The analogy doesn't capture this concept of infinite generation.

```
Caller (e.g., for loop)         Iterator Object (`__next__`)
-------------------------         --------------------------------

      next(iterator)  ─────────>  1. Is there a next item?
           │                                │
           │                                │ Yes
           │                                │
           │                      2. Update internal state
           │                      3. Return the item
           │                                │
           └──────────────────────────────  │

      next(iterator)  ─────────>  1. Is there a next item?
           │                                │
           │                                │ No
           │                                │
           └────────<── raise StopIteration │
```

## Details

The `__next__` method is the workhorse of iteration in Python. While the [[Python - __iter__ Magic Method|`__iter__` method]] is called once to set up the iteration by returning an iterator object, the `__next__` method is called repeatedly on that object to fetch each subsequent value. Its core responsibilities are to manage the iterator's state (e.g., the current position or the next value to compute) and to signal when the iteration is finished by raising the [[Python - StopIteration Exception 1|`StopIteration` exception]]. This explicit signal is what allows `for` loops and other iteration consumers to terminate gracefully.

#### Primary Goal

To retrieve the subsequent item from an iterator, advance its internal state, and signal when no more items are available.

#### Mechanism

- **Step 1: Define the `__next__` Method**
    - Inside your custom iterator class, define a method named `__next__(self)`. This class must also implement `__iter__` to be a valid iterator.
- **Step 2: Implement State-Checking Logic**
    - The first thing inside `__next__` should be a condition that checks if the iteration should continue. This typically involves comparing a counter to a limit or checking if a resource is exhausted.
- **Step 3: Return the Next Value and Update State**
    - If the condition from Step 2 passes, calculate or retrieve the next value. Crucially, you must then update the internal state (e.g., increment the counter) so the *next* call to `__next__` will produce a different value.
- **Step 4: Signal Completion with `StopIteration`**
    - If the condition in Step 2 fails (meaning the iteration is over), the method MUST `raise StopIteration`. This is not an error, but a standard signal to the calling process (like a `for` loop) that the iteration is complete. The relationship between these two is explored in [[Python - __next__ & StopIteration Relationship]].
    - A great practical example of this entire flow can be seen in the [[Example - CoinFlips Custom Iterator]].

##### Code Translation

```python
# A simple iterator that counts down from a starting number.
class Countdown:
    def __init__(self, start):
        self.current = start

    def __iter__(self):
        # This makes the object an iterable.
        return self

    def __next__(self):
        # --- Step 1: Method is defined ---
        
        # --- Step 2: Check state ---
        if self.current < 0:
            # --- Step 4: Signal completion ---
            raise StopIteration
        else:
            # --- Step 3: Return value and update state ---
            num = self.current
            self.current -= 1
            return num

# How it's used by a for loop (implicitly)
for i in Countdown(3):
    print(i)

# How it's used manually
counter = Countdown(2)
it = iter(counter) # same as it = counter.__iter__()
print(next(it)) # 2
print(next(it)) # 1
print(next(it)) # 0
# The next call would raise StopIteration
# print(next(it)) # raises StopIteration
```

 [[Code - __next__ Magic Method Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`self`**
    - The `__next__` method takes only one parameter: `self`, which is the instance of the iterator object itself. It uses `self` to access and modify its internal state variables (e.g., `self.current` in the code example).
- **Internal State Variables**
    - While not formal parameters of the method, the variables defined in `__init__` (like counters, pointers, or data sources) are the essential 'levers' that `__next__` manipulates to produce the sequence of values.

#### Core Trade-offs

- **Benefit: Lazy Evaluation**
    - The primary advantage is that values are generated one at a time, on demand. This is incredibly memory-efficient, as the entire sequence doesn't need to be stored in memory at once. It allows for processing huge files or even infinite sequences.
- **Complexity: Manual State Management**
    - When creating a [[Python - Custom Iterators|custom iterator]], you are responsible for correctly initializing, updating, and checking the state within `__next__`. An error in this logic can lead to infinite loops or incorrect sequences.
- **Contrast: Verbosity vs. Generators**
    - Implementing the full iterator protocol with `__iter__` and `__next__` is more verbose and requires more boilerplate code than using a [[Python - Generator Functions|generator function]] with `yield`, which handles the state management and `StopIteration` automatically.

## Connections

```
                      (Parent)
               Iterator Protocol
                       ▲
                       │
┌──────────────────────┼──────────────────────┐
│                      │                      │
(Paired With) ┌──────────────────────────┐ (Signals End With)
__iter__      │  __next__ Magic Method   │ StopIteration
              └──────────────────────────┘
```

### Parent Concept

The `__next__` method is a mandatory component of the [[Python - Iterator Protocol|iterator protocol]], which defines how objects provide sequential access to their elements.

### Child Concepts



### Related Concepts 

- It works in tandem with the [[Python - __iter__ Magic Method|`__iter__` method]], which is responsible for returning the iterator object that `__next__` will be called on.
- The end of its lifecycle is signaled by raising a [[Python - StopIteration Exception 1|`StopIteration` exception]], which is the standard way to terminate iteration.
- The fundamental link between this method and the exception is detailed in [[Python - __next__ & StopIteration Relationship]].
- [[Python - Generator Functions|Generator functions]] provide a much more concise syntax for creating iterators, automatically implementing the `__iter__` and `__next__` protocol behind the scenes using the `yield` keyword.
## Questions

- Imagine you're processing a massive, multi-terabyte log file. Would you design a custom iterator using `__next__` to parse it line-by-line, or would you use a library like Pandas to load chunks? Justify your choice based on memory constraints, development speed, and the specific business goal (e.g., real-time alerting vs. batch analytics).
- In a distributed data processing system, how would you ensure that a stateful iterator implemented with `__next__` could be paused, serialized, and resumed on a different worker node without losing its place or processing duplicate items?
- What if the `StopIteration` exception was removed from Python? How would the `for` loop and other iteration-based constructs need to be redesigned to signal the end of an iteration, and what new problems might this introduce?