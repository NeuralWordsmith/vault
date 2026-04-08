---
tags: 
  - relationship
  - python
  - multiple_returns
  - tuple_packing
  - function_output
  - unpacking
  - pythonic_patterns
  - concept
source: 
  - "[[Introduction to Functions in Python]]"
related: 
  - "[[Python - Tuples]]"
  - "[[Python - Tuple Unpacking]]"
  - "[[Python - Functions]]"
  - "[[Python - User-Defined Functions]]"
  - "[[Python - Tuple Construction]]"
  - "[[Python - Tuple Indexing]]"
  - "[[Python - Lists]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Multiple Function Parameters]]"
  - "[[Python - Data Types]]"
  - "[[Fundamental - Programming]]"
  - "[[Python - Objects]]"
  - "[[Python - Tuples vs Lists]]"
  - "[[Python - Tuple Immutability]]"
---
# Relationship: Function Multiple Return Values

**Why This Matters:** Returning multiple values allows a function to be more expressive and self-contained. Instead of modifying global variables or returning complex, hard-to-parse strings, a function can cleanly output several related pieces of information, such as a result and a status code, or multiple calculated metrics like mean and standard deviation.
## The Relationship Defined

**Type:** Implementation Detail

> In Python, a function can return multiple values by packaging them into a single object. The standard and most Pythonic way to do this is by using a tuple. The function body performs a `[[Python - Tuple Construction|tuple construction]]`, creating a tuple that contains all the values to be returned. The `return` statement then sends this single tuple object back to the calling environment, where it can be handled as a single entity or immediately processed using `[[Python - Tuple Unpacking|tuple unpacking]]`.

_Analogy:_ _Think of a function as a specialized kitchen appliance, like a high-end coffee machine. You provide inputs (water, coffee beans), and it performs a process. When it's done, it doesn't just give you one thing. It returns a bundle of related items into the output tray: a cup of espresso and a puck of used coffee grounds. You receive this 'bundle' (the tuple) and can then take the individual items you need (the espresso) and discard the others (the grounds)._

The key components are:
- **Coffee Machine:** The Python function.
- **Inputs (Water, Beans):** The function's arguments or `[[Python - Multiple Function Parameters|parameters]]`.
- **Output Tray with Espresso & Puck:** The single returned tuple containing multiple values.
- **Espresso & Puck:** The individual values within the tuple.
- **You taking the items:** The calling code that receives the tuple and potentially unpacks it.

**Where it breaks down:** The analogy implies two physically separate items. In Python, the function returns a *single* object—the tuple—which acts as a container for the other values. The caller receives this one container, not multiple, separate objects directly.

## Mechanism of Interaction

Python functions are fundamentally designed to return only a single object. The feature of 'multiple return values' is syntactic sugar that leverages this. When you write `return value1, value2`, Python automatically performs `[[Python - Tuple Construction|tuple construction]]` behind the scenes, creating a single tuple `(value1, value2)`. It is this single tuple object that is actually returned to the caller.

## Implications & Impact

This makes tuples the primary and most idiomatic mechanism for creating functions that need to output several related pieces of data. It promotes writing clean, self-contained functions that don't rely on side effects (like modifying global variables) to communicate their results, leading to more readable and maintainable code.

## Key Connections

- This capability is directly enabled by `[[Python - Tuples|tuples]]`, which serve as the lightweight container for the multiple values.
- The returned values are most effectively used through `[[Python - Tuple Unpacking|tuple unpacking]]`, which assigns each value in the returned tuple to a separate variable in a single, clean line of code.
- This concept is the inverse of passing `[[Python - Multiple Function Parameters|multiple function parameters]]`, which involves bundling multiple inputs *into* a function call.
- The choice to use a tuple for multiple returns often `[[Python - Tuples vs Lists|contrasts with lists]]`, with tuples being preferred due to their `[[Python - Tuple Immutability|immutability]]`, signaling that the returned data is a fixed record and not meant to be changed.

## Deeper Questions

- You're designing an API endpoint that calculates a user's credit score. The calculation can succeed, fail with a specific error (e.g., 'insufficient history'), or require manual review. How would you use multiple return values to design the function's output for the API? How does this design choice impact the downstream developers who will consume this API, and how does it improve the system's overall reliability from a business perspective?
- Imagine a data processing pipeline where a function returns a large tuple containing several large NumPy arrays. What are the potential memory and performance implications of this pattern at scale, especially if this function is called millions of times? How might you refactor this to be more memory-efficient, perhaps by passing mutable objects as parameters instead?
- What if Python's `return` statement was strictly limited to returning only single, primitive data types (int, float, string), and tuples could not be returned? How would you redesign common programming patterns, like a function that needs to return both a calculated value and an error status, without using global variables?