---
tags: 
  - core
  - python
  - iterable_protocol
  - __iter__
  - sequence
  - collection
  - iteration
  - concept
source: 
  - "[[Python Toolbox]]"
related: 
  - "[[Python - Iteration]]"
  - "[[Python - Iterators]]"
  - "[[Python - Iterables & Iterators Relationship]]"
  - "[[Python - for Loop]]"
  - "[[Python - For Loop Iteration Mechanism]]"
  - "[[Python - iter() Function]]"
  - "[[Python - next() Function]]"
  - "[[Python - StopIteration Exception]]"
  - "[[Python - Lists]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Tuples]]"
  - "[[Python - Looping Over Data Structures]]"
  - "[[Python - Iterating Over Dictionaries]]"
  - "[[Python - Iterating Over Files]]"
  - "[[Python]]"
---
# Core: Iterables

## Summary

>An iterable is any Python object that can be "iterated over," meaning you can process its elements one by one. The technical definition is any object that implements the `__iter__()` method, which is responsible for returning an iterator. This is the fundamental concept that powers [[Python - Iteration|iteration]] and makes `for` loops work on diverse data types like lists, strings, and files.

**Why This Matters:** Iterables provide a universal, standardized way to process sequences of data, making Python's `for` loops incredibly versatile and powerful across different data types.

_Analogy:_ _An iterable is like a playlist of songs. The playlist itself isn't the music player; it's just the ordered list of what *can* be played. You can hand this playlist to any compatible music player (an iterator) to actually play the songs one by one._

  * **Playlist:** The iterable object (e.g., a list, string). It holds all the items.
  * **Songs:** The individual elements within the iterable.
  * **Music Player:** The [[Python - Iterators|iterator]], which keeps track of the current song and knows how to get to the next one.
  * **Where it breaks down:** Unlike a music playlist, some iterables (like generators or file objects) don't hold all their items in memory at once. They generate them on the fly, which is more like a radio station that plays songs sequentially but doesn't have the entire day's lineup stored in a single list.

```
+-----------------+
|  Iterable       |
| (e.g., list)    |
|                 |
|  __iter__()     |-----+
+-----------------+     |
                      |
                      |  Returns a new...
                      |
                      v
                +-----------------+
                |  Iterator       |
                |                 |
                |  __next__()     |
                +-----------------+
```

## Details

The context explains that objects like lists, strings, and range objects can be looped over because they are a special type of object called an "iterable." In Python, the core idea of an iterable is to represent a sequence of items in a way that can be processed sequentially. The defining characteristic of an iterable is its ability to produce an [[Python - Iterators|iterator]] when passed to the `iter()` function, which is possible because it has an internal `__iter__()` method. This simple protocol is the foundation for how `for` loops and other iteration tools work across a vast range of data structures.

#### Primary Goal

To provide a common, consistent interface for accessing the elements of a sequence, regardless of how that sequence is stored or generated.

#### Mechanism

- **How it Works:**
    - An object is considered iterable if it follows the "iterable protocol."
    1. The protocol requires the object to have a special method called `__iter__()`.
    2. When a `for` loop or the [[Python - iter() Function|iter() function]] is used on the iterable, this `__iter__()` method is called.
    3. The `__iter__()` method's job is to return a fresh [[Python - Iterators|iterator]] object. This iterator is the actual tool that will provide the elements one by one.
- **Common Examples of Iterables:**
    - **Sequences:** These are the most common iterables that store all their elements in memory.
        - *Example:* `my_list = [1, 2, 3]`, `my_string = "abc"`, `my_tuple = (1, 2, 3)`.
    - **Mappings:** Dictionaries are iterables that, by default, iterate over their keys.
        - *Example:* `my_dict = {'a': 1, 'b': 2}`. Looping over this yields `'a'` then `'b'`. See [[Python - Iterating Over Dictionaries|iterating over dictionaries]] for more detail.
    - **File Objects:** File connections are iterables that produce lines from the file one at a time.
        - *Example:* `with open('data.txt') as f: ...` The `f` object is an iterable. See [[Python - Iterating Over Files|iterating over files]].
    - **Generators:** Special functions that yield items one by one, creating an iterable sequence without storing it all in memory.
        - *Example:* `range(3)` is an efficient iterable that generates numbers 0, 1, 2 on demand.

##### Code Translation

```python
# --- Step 1: Define different types of iterables ---
my_list = [10, 20, 30]  # A list is an iterable
my_string = "xyz"      # A string is an iterable
my_range = range(3)    # A range object is an iterable

# --- Step 2: Use a for loop, which works on any iterable ---
print("Looping over a list:")
for item in my_list:
    print(item)

print("\nLooping over a string:")
for char in my_string:
    print(char)

print("\nLooping over a range object:")
for num in my_range:
    print(num)

# --- Step 3: Manually check for the __iter__ method ---
# The presence of this method is what makes them iterable.
print(f"\nDoes list have __iter__? {'__iter__' in dir(my_list)}")
print(f"Does string have __iter__? {'__iter__' in dir(my_string)}")
```

 [[Code - Iterables Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Protocol, Not Parameter**
    - The concept of an iterable is not controlled by parameters or hyperparameters. It is a fundamental protocol or interface in Python.
    - An object either correctly implements the `__iter__()` method (making it an iterable) or it does not. There are no 'levers' to adjust its behavior at this level.

#### Core Trade-offs

- **Benefit: Universality and Simplicity**
    - The primary advantage is creating a single, consistent way to loop over any collection. Code like `for item in collection:` works whether `collection` is a list, a file, a dictionary, or a custom object, making code more readable and reusable.
- **Potential Pitfall: In-Memory vs. Lazy Iterables**
    - A common point of confusion is the difference between iterables that hold all data in memory (like lists and tuples) and those that generate it on demand (like range objects or file handlers). Using an in-memory iterable for a very large dataset can lead to high memory consumption.

## Connections

```
                           (Parent)
                            Python
                              ▲
                              │
┌─────────────────────────────┼─────────────────────────────┐
│                             │                             │
(Enables)                ┌────────────────┐                  (Produces)
For Loop Iteration       │    Iterables   │                  Iterators
                         └────────────────┘
                              │
                              │ (Relationship)
                              │
       Iterables & Iterators Relationship
```

### Parent Concept

Iterables are a fundamental concept within the [[Python]] programming language, forming the basis for its powerful and consistent approach to sequence processing.

### Child Concepts

- Common built-in iterables include [[Python - Lists|lists]], which are mutable ordered sequences.
- Another key iterable type is the [[Python - Dictionaries|dictionary]], which allows iteration over its keys, values, or key-value pairs.
- Strings are also iterables, where each character is an element in the sequence.

### Related Concepts 

- An iterable's primary purpose is to produce an [[Python - Iterators|iterator]], which is the object that actually performs the iteration and keeps track of the state.
- The relationship between these two concepts is central to understanding [[Python - Iterables & Iterators Relationship|how iteration works under the hood]].
- This entire mechanism is what powers the simple syntax of the `for` loop, as detailed in the [[Python - For Loop Iteration Mechanism|for loop's internal process]].
- The built-in [[Python - iter() Function|iter() function]] is the standard way to explicitly get an iterator from an iterable.
## Questions

- Imagine you are processing a 100GB log file. Would you load it into a list (an in-memory iterable) or process it line-by-line using the file object directly? Justify your choice in terms of memory efficiency and its impact on system performance and cost.
- You're designing a data pipeline API where users can provide their own data sources. How would you enforce that their custom data source objects are compatible with your pipeline's `for` loops? Describe the interface or protocol you would require them to implement.
- What if Python's `for` loop didn't exist? How would you manually replicate the process of iterating over a list using only a `while` loop and the core principles of iterables and iterators (i.e., using `iter()` and `next()`)?