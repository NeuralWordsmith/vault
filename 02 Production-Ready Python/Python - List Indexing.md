---
tags: 
  - core
  - python
  - indexing
  - element_access
  - square_brackets
  - list_subsetting
  - zero_based
  - concept
source: 
  - "[[Introduction to Python]]"
related: 
  - "[[Python - List Subsetting]]"
  - "[[Python - Zero-Based Indexing]]"
  - "[[Python - Negative List Indexing]]"
  - "[[Python - List Slicing]]"
  - "[[Python - Lists]]"
  - "[[Python - Data Structures]]"
  - "[[Fundamental - Programming]]"
  - "[[Python - Tuples]]"
  - "[[Python - Strings]]"
  - "[[Python - For Loops]]"
  - "[[Python - IndexError]]"
  - "[[Python - List Slice Inclusivity Rule]]"
  - "[[Python - Omitting Indices in List Slicing]]"
---
# Core: List Indexing

## Summary

>In Python, list indexing is the process of accessing a single element from a list by specifying its numerical position. This position is called the 'index', and it is specified using square brackets `[]` immediately after the list's name. This entire system is built on the principle of [[Python - Zero-Based Indexing]], where the first element is at index 0, the second at index 1, and so on.

**Why This Matters:** List indexing is the fundamental mechanism for retrieving a single, specific piece of data from an ordered collection, enabling precise data manipulation and control flow in programming.

_Analogy:_ _Think of a list as a row of mailboxes at an apartment complex. Each mailbox holds a piece of mail (an element), and the entire row is the list. To get your specific mail, you don't check every single box; you go directly to the one with your apartment number on it. That number is the index._

The list is the row of mailboxes.
- The elements are the pieces of mail inside each box.
- The index is the unique number on each mailbox door.
- Using `list[3]` is like using your key on mailbox #3 to get what's inside.
- **Where it breaks down:** Mailbox numbers in the real world almost always start from 1. In Python, indexing starts from 0, which is a crucial distinction and a common source of errors for beginners.

```
List:    ["liz", 1.73, "emma", 1.68, "mom", 1.71]
          │      │       │       │       │       │
Index:    0      1       2       3       4       5
                                 ▲
                                 │
                             fam[3] -> 1.68
```

## Details

Python uses a numerical index to pinpoint and select specific elements within a list. As seen in the example of selecting Emma's height, `1.68`, although it is the fourth element in the sequence, its position is identified by index `3`. This is a direct application of [[Python - Zero-Based Indexing]]. This method of selecting a single item is the most basic form of [[Python - List Subsetting|list subsetting]] and is a foundational skill in Python programming for accessing and manipulating data stored in ordered collections.

#### Primary Goal

To provide a direct and efficient way to retrieve, inspect, or modify a single element within a list by specifying its exact position.

#### Mechanism

- **Step 1: Define the List**
    - First, you need a list of elements. Each element is automatically assigned an index based on its position.
- **Step 2: Identify the Target Index**
    - Determine the zero-based index of the element you want to access. Remember to count from 0. For the fourth element, the index is 3.
- **Step 3: Access the Element with Square Brackets**
    - Use the syntax `list_name[index]` to retrieve the value at that position. This expression evaluates to the element itself.

##### Code Translation

```python
# --- Step 1: Define the List ---
# A list containing names and heights
fam = ["liz", 1.73, "emma", 1.68, "mom", 1.71, "dad", 1.89]

# --- Step 2: Identify the Target Index ---
# We want Emma's height, which is the 4th element.
# The index is 4 - 1 = 3.

# --- Step 3: Access the Element with Square Brackets ---
# Select the element at index 3
emmas_height = fam[3]

# Print the result
print(f"Emma's height is: {emmas_height}")
# Output: Emma's height is: 1.68

# You can also use an index to modify an element
fam[3] = 1.69 # Update Emma's height
print(f"Updated list: {fam}")
# Output: Updated list: ['liz', 1.73, 'emma', 1.69, 'mom', 1.71, 'dad', 1.89]
```

#### Key Parameters

- **Index (Integer)**
    - The only 'parameter' for indexing is the index itself. It must be an integer. Using a float or other type will result in a `TypeError`.
    - The integer must be within the valid range of indices for the list. For a list of length `n`, the valid positive indices are from `0` to `n-1`.

#### Core Trade-offs

- **Pro: Constant Time Access**
    - Indexing is extremely fast (O(1) time complexity). It doesn't matter if the list has 10 elements or 10 million; the time it takes to access an element by its index is roughly the same.
- **Con: `IndexError`**
    - If you provide an index that is outside the valid range (e.g., index 10 for a list of 5 elements), Python will raise an `IndexError`, which will crash the program if not handled with error-catching logic (like a try-except block).
- **Con: Single Element Only**
    - Standard indexing can only retrieve one element at a time. To select a range of elements, you must use [[Python - List Slicing|list slicing]].

## Connections

```
                      (Parent)
                 List Subsetting
                         ▲
                         │
         ┌───────────────┼───────────────┐
         │               │               │
(Foundation)    ┌────────────────┐    (Alternative)
Zero-Based      │ List Indexing  │    List Slicing
Indexing        └────────────────┘
                         │
                         ▼
                   (Variation)
              Negative List Indexing
```

### Parent Concept

List indexing is the most fundamental method of [[Python - List Subsetting|list subsetting]], which is the general practice of selecting one or more elements from a list.

### Child Concepts

- A specialized variation is [[Python - Negative List Indexing|negative list indexing]], which provides a convenient way to access elements by counting from the end of the list rather than the beginning.

### Related Concepts 

- The entire concept is built upon the fundamental principle of [[Python - Zero-Based Indexing|zero-based indexing]], which dictates that counting begins at 0.
- It contrasts with [[Python - List Slicing|list slicing]], which is used to select a continuous range of elements rather than just a single one.
## Questions

- Imagine you're processing a stream of financial transactions stored in lists, where a specific index always corresponds to the transaction amount. Using direct indexing is fast, but an `IndexError` from a malformed list could halt the entire process. How would you design a robust system that balances the speed of direct access with the need for fault tolerance, and what is the business implication of getting this wrong?
- If you have a list containing millions of user profile objects, and you frequently need to access the 100th element, indexing is efficient. But what if you need to find a user by their unique ID instead of their position? Describe the performance bottleneck of relying solely on positional indexing in this scenario and what data structure you would use instead to scale the system.
- What if Python lists were 1-indexed instead of 0-indexed? Beyond the initial confusion for programmers, what fundamental algorithms or common programming patterns (like iterating with `range(len(list))`) would need to be completely re-thought, and what subtle bugs might arise during the transition?