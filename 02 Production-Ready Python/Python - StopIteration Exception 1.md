---
tags: 
  - core
  - python
  - stopiteration
  - iterator_protocol
  - exception_handling
  - iteration
  - next
  - concept
source: 
  - "[[Intermediate Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Iteration]]"
  - "[[Python - Iterator Protocol]]"
  - "[[Python - __next__ Magic Method]]"
  - "[[Python - Custom Iterators]]"
  - "[[Python - for Loop]]"
  - "[[Python - Generator Functions]]"
  - "[[Python - Error Handling]]"
  - "[[Python - __iter__ Magic Method]]"
  - "[[Python - __next__ & StopIteration Relationship]]"
  - "[[Python - Handling StopIteration with try-except]]"
  - "[[Python - CoinFlips Custom Iterator]]"
  - "[[Python - Generator Expressions]]"
  - "[[Python - List Comprehensions]]"
---
# Core: StopIteration

## Summary

>StopIteration is a built-in Python exception that is raised by an iterator's `__next__` method to signal that there are no more items to yield. It's not an error, but rather a control-flow mechanism that gracefully terminates loops and other iteration constructs.

**Why This Matters:** StopIteration is the fundamental signal that makes Python's `for` loops work, preventing them from running forever by providing a standard way for any data source to say "I'm empty."

_Analogy:_ _Think of an iterator as a vending machine stocked with a limited number of snacks. Each time you call `next()` on the iterator, it's like pressing a button to get a snack. The machine dispenses one snack at a time. When you press the button after the last snack has been dispensed, the machine doesn't give you an 'empty' wrapper. Instead, a 'Sold Out' light flashes. This 'Sold Out' signal is the `StopIteration` exception. It's not an error with the machine; it's a clear, definitive signal that the collection is exhausted._

The vending machine is the iterator, each snack is an item, pressing the button is calling `next()`, and the 'Sold Out' light is the `StopIteration` exception.

*   **Where it breaks down:** In Python, constructs like `for` loops automatically see the 'Sold Out' light and walk away (terminate). If you were manually pressing the button (calling `next()` yourself), the flashing light (`StopIteration`) would stop you in your tracks (raise an unhandled exception) unless you were specifically prepared to see it and knew what to do, which is covered in [[Python - Handling StopIteration with try-except|handling the exception explicitly]].

```
Flow within the __next__ method:

call next(my_iterator)
        │
        ▼
┌───────────────────────────┐
│  Is there another item?   │
│ (e.g., counter < limit)   │
└───────────┬───────────────┘
            │
    ┌───────┴───────┐
    │               │
   YES             NO
    │               │
    ▼               ▼
return item     raise StopIteration
```

## Details

In Python's iteration model, the `StopIteration` exception is the formal contract for ending a sequence. Any object that follows the [[Python - Iterator Protocol|iterator protocol]] must implement a `__next__` method. The core responsibility of this method is to produce the next item, but just as importantly, it must `raise StopIteration` when it runs out of items. This provides a universal, unambiguous signal that allows tools like `for` loops, list comprehensions, and the `map()` function to work with any kind of sequential data, from a simple list to a stream of data from a network socket, without needing to know the internal details of the data source.

#### Primary Goal

To provide a clean, standard, and unambiguous signal that an iterator has been completely exhausted and has no more values to provide.

#### Mechanism

- **Step 1: Define a Termination Condition**
    - Inside your [[Python - Custom Iterators|custom iterator's]] `__init__` method, establish the state that will determine when the iteration should stop. This is often a counter and a maximum value, or checking if a data structure is empty.
- **Step 2: Implement the `__next__` Method**
    - This method, a core part of the [[Python - __next__ Magic Method|`__next__` contract]], is called for each step of the iteration.
- **Step 3: Check the Condition**
    - At the beginning of the `__next__` method, check if the termination condition has been met. For example, check if `self.counter < self.limit`.
- **Step 4: Return a Value or Raise the Exception**
    - If the iterator is not exhausted, perform the necessary logic, update the state (e.g., increment the counter), and `return` the next value.
    - If the termination condition *is* met, immediately `raise StopIteration`. Do not return `None` or any other value. This specific exception is the required signal.

##### Code Translation

```python
import random

# This is a simplified version of the CoinFlips custom iterator.
# See [[Python - CoinFlips Custom Iterator]] for the full example.
class CoinFlips:
    def __init__(self, number_of_flips):
        # --- Step 1: Define a Termination Condition --- 
        self.number_of_flips = number_of_flips
        self.counter = 0

    def __iter__(self):
        return self

    # --- Step 2: Implement the __next__ Method ---
    def __next__(self):
        # --- Step 3: Check the Condition ---
        if self.counter < self.number_of_flips:
            # --- Step 4 (Part 1): Return a Value ---
            self.counter += 1
            return random.choice(["H", "T"])
        else:
            # --- Step 4 (Part 2): Raise the Exception ---
            raise StopIteration

# A for loop automatically handles the StopIteration exception
for flip in CoinFlips(5):
    print(flip)

# Output might be: H, T, T, H, T
```

 [[Code - StopIteration Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- `StopIteration` itself takes no parameters. It is a simple signal. The logic that determines *when* to raise it is what's configurable within the custom iterator's design (e.g., the `number_of_flips` argument in the example).

#### Core Trade-offs

- **Clarity and Explicitness**
    - Using an exception for control flow is a very explicit signal. There is no ambiguity about whether the iteration ended or if the iterator returned a special value like `None` that could be a legitimate part of the data stream.
- **Seamless Integration**
    - Python's `for` loops, comprehensions, and generator functions are all built to listen for and handle `StopIteration` automatically. This makes the mechanism feel invisible and natural to the end-user.
- **Potential for Unhandled Exceptions**
    - If you call `next()` manually on an exhausted iterator without wrapping it in a `try...except` block, the `StopIteration` will propagate up and crash the program. This is why direct calls to `next()` are less common than using `for` loops. See [[Python - Handling StopIteration with try-except]] for the correct pattern.

## Connections

```
                  (Parent)
                  Iteration
                      ▲
                      │
┌─────────────────────┼─────────────────────┐
│                     │                     │
(Defines When)   ┌──────────────────┐   (Defines How)
__next__ Method  │  StopIteration   │  Iterator Protocol
                 └──────────────────┘
                      │
                      ▼
                  (Handled By)
                   for Loop
```

### Parent Concept

The concept of `StopIteration` is a cornerstone of [[Python - Iteration]], providing the essential mechanism for terminating the iteration process.

### Child Concepts

- The explicit management of this signal is detailed in [[Python - Handling StopIteration with try-except|handling StopIteration with try-except blocks]], which is necessary when manually advancing an iterator.

### Related Concepts 

- The `StopIteration` exception is fundamentally linked to the [[Python - __next__ Magic Method|`__next__` magic method]], as it is the required signal for that method to indicate exhaustion.
- This entire mechanism is a core part of Python's [[Python - Iterator Protocol|iterator protocol]], which defines how iterable objects should behave.
- Understanding this signal is crucial when building [[Python - Custom Iterators|custom iterators]] to ensure they integrate correctly with Python's language features.
- The intimate dance between these two components is explored in [[Python - __next__ & StopIteration Relationship|the relationship between `__next__` and `StopIteration`]].
## Questions

- Instead of raising `StopIteration`, an alternative API design could be to return a special sentinel value (e.g., a unique `object()` instance) to signal the end. What are the trade-offs of the exception-based approach versus a sentinel-value approach in terms of code clarity, performance, and potential for bugs?
- Imagine you are building an iterator for a real-time data stream from a network source that can be temporarily interrupted. How would you modify the `__next__` method to distinguish between a temporary lack of data (where you should perhaps wait) and a definitive end-of-stream signal (where you should raise `StopIteration`)?
- What if Python's `for` loop did *not* automatically handle `StopIteration`? How would you have to rewrite every `for` loop in your code, and what new categories of common bugs would likely emerge from this change?