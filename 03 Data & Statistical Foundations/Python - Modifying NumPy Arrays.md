---
tags: 
  - major_core
  - python
  - numpy
  - array_manipulation
  - data_cleaning
  - preprocessing
  - concatenation
  - concept
source: 
  - "[[Introduction to NumPy]]"
related: 
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - NumPy Concatenation]]"
  - "[[Python - Deleting Data from NumPy Arrays (np.delete)]]"
  - "[[Python - Concatenating NumPy Arrays Process]]"
  - "[[Python - Shape Compatibility in NumPy Concatenation]]"
  - "[[Python - Deleting from NumPy Arrays Process]]"
  - "[[Python - List Manipulation]]"
  - "[[Python - Subsetting NumPy Arrays]]"
  - "[[Python - Indexing NumPy Arrays]]"
  - "[[Python - 2D NumPy Arrays]]"
  - "[[Python - Pandas DataFrame]]"
  - "[[Python - Data Types]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[Python - Efficient Code]]"
---
# Major Core: Adding and Deleting NumPy Array Elements

## Summary

> Adding and deleting elements are fundamental NumPy operations for dynamically altering the size and content of arrays. Because NumPy arrays have a fixed size in memory, these operations don't modify the original array in-place; instead, they create and return a new array with the desired changes. This is a key part of data wrangling, where datasets are rarely in the perfect format for a task. The primary methods for adding data involve joining arrays, such as through [[Python - NumPy Concatenation|concatenation]], while deleting data is often handled by functions like `np.delete`, as detailed in [[Python - Deleting Data from NumPy Arrays (np.delete)]].

**Why This Matters:** Mastering array modification is crucial for data preprocessing, as it allows you to clean, reshape, and prepare raw datasets for analysis and machine learning.

_Analogy:_ _Think of a NumPy array as a published book. You can't just rip out a page or glue a new one in without ruining the binding. To add or remove a chapter, the publisher must create a whole new edition of the book. The original book (the original array) remains untouched, and you get a new, revised version (the new array) with the changes._

Where it breaks down: Unlike publishing a book, which is a slow and expensive process, creating a new NumPy array is computationally very fast. However, for extremely large arrays or in loops with many modifications, the overhead of repeatedly creating new arrays can become a significant performance bottleneck, whereas a publisher would never print a new edition for a single typo.

```
Original Array:      [1, 2, 3, 4, 5]

Operation: Add (e.g., concatenate [6, 7])
     │
     ▼
New Array:           [1, 2, 3, 4, 5, 6, 7]  (Original is untouched)


Original Array:      [1, 2, 3, 4, 5]

Operation: Delete (e.g., delete element at index 2)
     │
     ▼
New Array:           [1, 2, 4, 5]          (Original is untouched)
```

## Details

In our journey with NumPy, we quickly find that real-world data is messy and rarely fits our needs perfectly. That's where adding and deleting array elements becomes an essential skill. Unlike Python lists, which can grow and shrink dynamically, NumPy arrays have a fixed size in memory once created. This means that any operation to 'add' or 'delete' an element doesn't happen in-place. Instead, NumPy efficiently creates a new array with the updated content. This process is fundamental to data cleaning and preparation. The two main categories of these operations are **Adding Elements** (typically by joining arrays) and **Deleting Elements** (by specifying indices or axes to remove).

#### Primary Goal

To provide a mechanism for modifying the structure and content of NumPy arrays to match the requirements of a data analysis or modeling task, even though the underlying arrays are immutable in size.

#### Mechanism

- **The Immutability Principle:**
    - The core concept to grasp is that NumPy arrays have a fixed size. When you 'add' or 'delete' elements, you are not changing the original array. NumPy computes the result and allocates memory for a brand new array, returning it as the output. The original array is left unchanged.
- **Adding Elements (Concatenation):**
    - This is the most common way to add data. It involves joining two or more arrays along a specified axis. This is explored in detail in [[Python - NumPy Concatenation|NumPy Concatenation]]. For this to work, you must ensure [[Python - Shape Compatibility in NumPy Concatenation|shape compatibility]] along the non-concatenation axes.
- **Deleting Elements (Deletion):**
    - This involves creating a new array that omits specified elements, rows, or columns from the original. The `np.delete()` function is the primary tool for this, allowing you to specify the indices of the data to remove along a given axis. The process is detailed in [[Python - Deleting from NumPy Arrays Process]].

```python
import numpy as np

# --- Original Array ---
arr = np.array([[10, 20, 30], [40, 50, 60]])
print(f"Original Array:\n{arr}\n")

# --- Step 1: Adding Elements (by concatenating a new row) ---
# This is a form of 'adding' data to the array structure.
new_row = np.array([[70, 80, 90]])
arr_with_addition = np.concatenate((arr, new_row), axis=0)
print(f"After Adding a Row (Concatenation):\n{arr_with_addition}\n")

# --- Step 2: Deleting Elements (by deleting a column) ---
# This creates a new array without the specified column (index 1).
arr_with_deletion = np.delete(arr, 1, axis=1)
print(f"After Deleting Column 1:\n{arr_with_deletion}\n")

# Note: The original array remains unchanged.
print(f"Original Array is Unchanged:\n{arr}")
```

 [[Code - Adding and Deleting NumPy Array Elements Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`obj` (for `np.delete`)**: The input array from which to delete.
- **`arrs` (for `np.concatenate`)**: A tuple or sequence of arrays to be joined together.
- **`axis`**: This is the most critical parameter for both operations. It specifies the axis along which the deletion or concatenation occurs. If `None`, the arrays are flattened before the operation.
    - For a 2D array, `axis=0` refers to rows, and `axis=1` refers to columns.

#### Core Trade-offs

- **Performance Overhead**: The primary drawback is that every addition or deletion creates a new array. In a loop or with very large datasets, this can lead to high memory consumption and slower execution compared to in-place modifications available in Python lists.
- **Predictability vs. Flexibility**: The fixed-size nature of NumPy arrays allows for highly optimized, contiguous memory layouts, which is why numerical operations are so fast. The trade-off for this speed is the lack of flexibility for in-place size modifications.

## Connections

```
                           (Parent)
                     NumPy (Numeric Python)
                              ▲
                              │
  ┌───────────────────────────┼───────────────────────────┐
  │                           │                           │
(Contrasts With)    ┌───────────────────────────────────┐    (Related)
List Manipulation   │ Adding/Deleting NumPy Elements    │    Subsetting NumPy Arrays
                    └───────────────────────────────────┘
                              │
                   ┌──────────┴──────────┐
                   │                     │
       NumPy Concatenation      Deleting Data (np.delete)
```

### Parent Concept

This concept is a fundamental aspect of array manipulation within the [[Python - NumPy (Numeric Python)]] library.

### Child Concepts

- A primary method for adding elements is [[Python - NumPy Concatenation|NumPy concatenation]], which joins multiple arrays into a single new one.
- The main technique for removing elements is [[Python - Deleting Data from NumPy Arrays (np.delete)|deleting data using `np.delete`]], which creates a new array with specified elements or axes removed.

### Related Concepts 

- This process of creating new arrays contrasts with the in-place modification methods found in [[Python - List Manipulation|Python list manipulation]].
- The logic for specifying which elements to affect is closely related to [[Python - Subsetting NumPy Arrays|subsetting NumPy arrays]], as both rely on indexing and axes.
- Understanding the [[Python - Concatenating NumPy Arrays Process|process of concatenation]] is key to effectively adding data to arrays.
- Before concatenating, one must often ensure [[Python - Shape Compatibility in NumPy Concatenation|shape compatibility]] between the arrays being joined.
## Questions

- When would the performance cost of creating new NumPy arrays for every deletion be unacceptable during data ingestion, and what alternative data structure, like a Python list, might you use for the initial cleaning phase before converting to a final, static NumPy array for computation?
- Imagine a real-time data stream feeding into a system that uses NumPy for calculations. How would you design a buffer or batching mechanism to handle element additions/deletions efficiently, minimizing the overhead of frequent array re-creation?
- What if NumPy arrays were mutable and allowed efficient in-place addition/deletion like Python lists? How would this fundamentally change the library's design, its performance characteristics for numerical computation, and what new challenges might it introduce?
