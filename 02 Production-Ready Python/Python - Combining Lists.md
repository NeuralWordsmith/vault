---
tags: 
  - core
  - python
  - list_concatenation
  - extend_method
  - in-place_modification
  - list_merging
  - sequence_operations
  - concept
source: 
  - "[[Data Types in Python]]"
related: 
  - "[[Python - List Manipulation]]"
  - "[[Python - Lists]]"
  - "[[Python - Appending to a List]]"
  - "[[Python - Mutability vs Immutability]]"
  - "[[Python - List Memory Model (Reference vs. Value)]]"
  - "[[Python - Iteration]]"
  - "[[Python - Tuples]]"
  - "[[Python - Operator Overloading]]"
  - "[[Python - Container Sequences]]"
  - "[[Python - Removing Elements from a List with pop()]]"
  - "[[Python - List Comprehensions]]"
  - "[[DSA - Data Structures & Algorithms]]"
---
# Core: Combining Lists

## Summary

>In Python, lists can be combined in two primary ways. The plus (`+`) operator concatenates two lists to create a completely new list, leaving the original lists unchanged. Alternatively, the `.extend()` method modifies a list in-place by appending all elements from another iterable to its end, which is more memory-efficient.

**Why This Matters:** Combining lists is a fundamental operation for aggregating data from multiple sources into a single, unified collection for processing or analysis.

_Analogy:_ _Imagine you have two separate grocery lists on two small sticky notes. Using the `+` operator is like taking a brand new, larger sticky note and copying all the items from both original notes onto it. You end up with three separate notes. Using the `.extend()` method is like taking the second sticky note and taping it to the bottom of the first one, creating one single, longer list. You've modified the first note and still have the second one._

**Where it breaks down:** The analogy is strong for the process, but unlike grocery lists which contain text, Python lists can contain a mix of any data types (numbers, strings, even other lists), and the operations are instantaneous, not manual like copying.

```
Concatenation (+):
[List A] + [List B]  ─────>  [New Combined List C]
(A and B are unchanged)

In-place Extension (.extend()):
[List A].extend([List B])  ───>  [Modified List A]
(A is now A + B)
```

## Details

Beyond adding single items, a common task is to merge entire lists. Python provides two distinct mechanisms for this, each with different implications for memory and object identity. Understanding the difference between creating a new, combined list versus modifying an existing one is crucial for writing efficient and predictable code. The two main approaches are **concatenation using the `+` operator** and **in-place modification using the `.extend()` method**.

#### Primary Goal

To merge the elements from two or more lists into a single, combined list.

#### Mechanism

- **Method 1: Concatenation with the `+` Operator**
    - This method takes two lists and creates a third, new list containing all the elements of the first list followed by all the elements of the second.
    - The original lists are not modified in any way.
    - This is useful when you need to preserve the original data structures.
- **Method 2: In-place Modification with the `.extend()` Method**
    - This method is called on a list object and takes an iterable (like another list) as its argument.
    - It appends each element from the argument to the end of the list it was called on, modifying it directly.
    - It does not return a new list; it returns `None`. This is more memory-efficient for large lists as it avoids creating a new copy.

##### Code Translation

```python
# --- Initial Data ---
cookies = ['chocolate chip', 'peanut butter', 'sugar']
cakes = ['strawberry', 'vanilla']

# --- Method 1: Concatenation with '+' ---
# This creates a new list called 'desserts'
# 'cookies' and 'cakes' remain unchanged.
desserts = cookies + cakes
print(f"New list from '+': {desserts}")
print(f"Original 'cookies' list is unchanged: {cookies}")

# --- Method 2: In-place modification with '.extend()' ---
# This modifies the 'cookies' list directly.
# The method itself returns None.
cookies.extend(cakes)
print(f"Modified 'cookies' list after .extend(): {cookies}")
```

 [[Code - Combining Lists Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`+` Operator (Concatenation)**
    - Requires two operands that are lists. The result is a new list.
- **`.extend(iterable)` Method**
    - **`iterable`**: The only argument. It can be any iterable object (e.g., another list, a tuple, a string). Each element of the iterable is appended to the original list.

#### Core Trade-offs

- **Memory Usage**
    - The `+` operator is less memory-efficient because it creates a new list in memory, effectively duplicating all the elements from the original lists.
    - The `.extend()` method is more memory-efficient as it modifies the list in-place, avoiding the creation of a new list object.
- **Immutability vs. Mutability**
    - Using `+` is safer if you need to preserve the original lists for later use, as it doesn't cause side effects.
    - Using `.extend()` permanently changes the original list. This can lead to bugs if other parts of your code expect the list to be in its original state. This directly relates to the concept of [[Python - Mutability vs Immutability|mutability]].

## Connections

```
          (Parent)
    List Manipulation
            ▲
            │
┌───────────┼───────────┐
│           │           │
(Related) ┌───────────────┐ (Related)
Appending │ Combining Lists │ Mutability
          └───────────────┘
```

### Parent Concept

This concept is a fundamental technique within [[Python - List Manipulation|list manipulation]].

### Child Concepts



### Related Concepts 

- This process is an extension of [[Python - Appending to a List|appending to a list]], where instead of adding one element, you add all elements from another collection.
- The core difference between the `+` operator and the `.extend()` method is a direct consequence of [[Python - Mutability vs Immutability|mutability vs. immutability]].
- The `.extend()` method works because it can loop over the provided argument, a process known as [[Python - Iteration 1|iteration]].
## Questions

- You're processing large, multi-gigabyte log files, each read into a list. You need to aggregate them into one master list. Would you prefer the `+` operator or the `.extend()` method? Justify your choice in terms of memory performance and potential system impact.
- Imagine a real-time data pipeline where multiple worker threads are producing lists of events that need to be combined into a single master list for processing. What concurrency issues might arise if you use `.extend()` on a shared list, and how would you design a thread-safe mechanism to handle this aggregation?
- What if the `+` operator and `.extend()` method were removed from Python's list implementation? How would you write a function from scratch to combine two lists using a simple loop, and what would be the Big O time complexity of your solution?