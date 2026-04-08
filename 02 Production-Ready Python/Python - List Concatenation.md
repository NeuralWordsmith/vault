---
tags: 
  - core
  - python
  - list_concatenation
  - plus_operator
  - immutable_operation
  - list_combination
  - sequence_operations
  - concept
source: 
  - "[[Introduction to Python]]"
related: 
  - "[[Python - List Manipulation]]"
  - "[[Python - List Memory Model (Reference vs. Value)]]"
  - "[[Python - Explicit List Copying (Cloning)]]"
  - "[[Python - Implicit List Copying (Assignment)]]"
  - "[[Python - Changing List Elements]]"
  - "[[Python - Deleting List Elements]]"
  - "[[Python - List Manipulation & Memory Model Relationship]]"
  - "[[Python - Lists]]"
  - "[[Python - Data Structures]]"
  - "[[Python - Slicing]]"
  - "[[Python - list.append()]]"
  - "[[Python - list.extend()]]"
  - "[[Fundamental - Programming]]"
---
# Core: Adding to a List

## Summary

>In Python, using the plus sign (`+`) with two lists is known as concatenation. It doesn't modify the original lists; instead, it creates and returns an entirely new list containing all the elements of the first list, followed by all the elements of the second. This is a fundamental operation within the broader topic of [[Python - List Manipulation]] and its behavior is a direct consequence of the [[Python - List Memory Model (Reference vs. Value)|list memory model]], as it necessitates creating a new object in memory.

**Why This Matters:** Using the plus operator is the most intuitive way to combine two separate lists into a single, new list, which is essential for aggregating data from different sources without altering the original datasets.

_Analogy:_ _Think of list concatenation like connecting two separate train carriages to form a new, longer train. You have one carriage (the first list) with its passengers (elements), and a second carriage (the second list) with its own passengers. When you use the `+` operator, you are coupling them together to create a brand new, longer train (the new list) that has all the passengers from both original carriages, in order._

Where it breaks down: In the real world, after coupling the carriages, you have one train and the original separate carriages no longer exist as independent entities. In Python, the original two lists remain completely unchanged and independent after the concatenation operation. The `+` operator creates a third, distinct list, effectively duplicating the data in a new memory location.

```
list_a = [1, 2, 3]
list_b = [4, 5]

   [1, 2, 3]      +      [4, 5]
       |                 |
       '-----------------'
                 |
                 ▼
      [1, 2, 3, 4, 5]  (A new list in memory)
```

## Details

The provided context explains a simple yet powerful feature of Python lists: concatenation using the plus (`+`) operator. When you 'add' two lists, Python doesn't perform a mathematical sum but rather 'pastes' them together, end-to-end. This operation is a core part of list manipulation in Python. It's crucial to understand that this action is not an in-place modification; it always results in the creation of a new list, which has important implications for memory and performance, especially when compared to other modification techniques like [[Python - Changing List Elements|directly changing elements]].

#### Primary Goal

To create a new list by combining the elements of two existing lists in a sequential order.

#### Mechanism

- **Step 1: Define the Initial Lists**
    - Start with two separate lists. The first will be the base, and the second will contain the elements you wish to append.
- **Step 2: Apply the Concatenation Operator**
    - Place the `+` operator between the first list (left operand) and the second list (right operand).
- **Step 3: Assign the Result to a New Variable**
    - The operation returns a completely new list. You must capture this result in a new variable to use it. The original lists remain untouched.

##### Code Translation

```python
# --- Step 1: Define the Initial Lists ---
# The original list of family member heights
fam_height = [["liz", 1.73], ["emma", 1.68], ["mom", 1.71], ["dad", 1.89]]

# The new data to add, structured as a list
my_data = [["me", 1.79]]

# --- Step 2 & 3: Apply the Operator and Assign to a New Variable ---
# Concatenate the two lists to create a new, updated list.
# The original 'fam_height' list is not changed.
fam_height_full = fam_height + my_data

# --- Verification ---
print("Original list ID:", id(fam_height))
print("New list ID:", id(fam_height_full))
print("--- Contents ---")
print("Original list:", fam_height)
print("Full new list:", fam_height_full)
```

#### Key Parameters

- **Left Operand**
    - The list whose elements will appear first in the newly created list. Must be a list data type.
- **Right Operand**
    - The list whose elements will be appended after the elements of the left operand. Must also be a list data type.

#### Core Trade-offs

- **Pro: Safety and Immutability**
    - Because this operation creates a new list, the original data sources are preserved. This prevents accidental side effects where a list is modified when you didn't intend it to be, a common bug related to the principles of the [[Python - List Memory Model (Reference vs. Value)|list memory model]].
- **Con: Memory and Performance Inefficiency**
    - Creating a new list requires allocating new memory and copying every element from both original lists. For very large lists or when adding elements repeatedly in a loop, this is significantly slower and more memory-intensive than in-place methods like `.append()` or `.extend()`. This performance characteristic is a key aspect of the [[Python - List Manipulation & Memory Model Relationship|relationship between list operations and memory]].

## Connections

```
             (Parent)
        List Manipulation
                 ▲
                 │
┌────────────────┼────────────────┐
│                │                │
(Alternative)  ┌──────────────────┐  (Related Concept)
.append()      │ Adding to a List │  Explicit Copying
.extend()      └──────────────────┘
                 │
                 ▼
          (Contrasts With)
      Changing List Elements
      Deleting List Elements
```

### Parent Concept

This operation is a fundamental technique within the broader subject of [[Python - List Manipulation]].


### Related Concepts 

- This method of creating a new list **contrasts with** in-place modifications like [[Python - Changing List Elements|changing elements directly]] or [[Python - Changing List Slices|updating slices]].
- It serves as an alternative to [[Python - Deleting List Elements|deleting elements]] when the goal is to restructure a list by combining it with another.
- The creation of a new object in memory is a clear demonstration of [[Python - Explicit List Copying (Cloning)|explicit list copying]], as opposed to [[Python - Implicit List Copying (Assignment)|implicit copying]] which only copies the reference.
## Questions

- You're processing a continuous stream of user activity data, adding each new event to a master list for a daily report. Would you use list concatenation (`+`) inside the processing loop? Justify your choice in terms of performance impact and potential server costs.
- Imagine a system where multiple concurrent processes need to add data to a shared list. How does the fact that list concatenation creates a *new* list object affect your strategy for managing state and avoiding race conditions, compared to an in-place method like `append()`?
- What if the `+` operator for lists was changed in a future Python version to modify the left-hand list in-place instead of creating a new one? What existing Python code patterns would break, and what new programming paradigms might emerge from this change?