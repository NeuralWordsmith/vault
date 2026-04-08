---
tags: 
  - core
  - python
  - np.concatenate
  - array_joining
  - axis
  - stacking
  - data_merging
  - concept
source: 
  - "[[Introduction to NumPy]]"
related: 
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - Modifying NumPy Arrays]]"
  - "[[Python - 2D NumPy Arrays]]"
  - "[[Python - Indexing NumPy Arrays]]"
  - "[[Python - Subsetting NumPy Arrays]]"
  - "[[Python - Concatenating NumPy Arrays Process]]"
  - "[[Python - Shape Compatibility in NumPy Concatenation]]"
  - "[[Python - Reshaping 1D Arrays for Concatenation]]"
  - "[[Python - Deleting Data from NumPy Arrays (np.delete)]]"
  - "[[Python - Deleting from NumPy Arrays Process]]"
  - "[[Python - Stacks (Data Structure)]]"
  - "[[Python - Lists]]"
  - "[[Python - Tuples]]"
  - "[[Python - Data Types]]"
  - "[[Python - Performance Testing]]"
---
# Core: Concatenating NumPy Arrays

## Summary

>In NumPy, concatenation is the process of joining two or more arrays along an existing axis, effectively stacking them together either vertically or horizontally. This is accomplished using the `np.concatenate` function. It's a fundamental operation for [[Python - Modifying NumPy Arrays|modifying arrays]], allowing you to add data, in contrast to operations like [[Python - Deleting Data from NumPy Arrays (np.delete)|deleting data]]. A key limitation is that concatenation cannot create new dimensions; it can only extend existing ones.

**Why This Matters:** Concatenation is the primary method for combining datasets, features, or results from different sources into a single, unified array, which is a critical step for most data analysis and machine learning workflows.

_Analogy:_ _Think of concatenating NumPy arrays like connecting train cars. You have two separate trains (arrays). You can connect the second train to the back of the first one, making a single, longer train. This is like concatenating along `axis=0` (stacking rows). Alternatively, if you have a parallel track, you could lay the second train right next to the first, making the whole formation wider. This is like concatenating along `axis=1` (stacking columns)._

**Where it breaks down:** The analogy implies you are simply 'hitching' new data on. In reality, NumPy often has to create a completely new, larger space in memory and then copy the data from all the original arrays into this new location. This is less efficient than just linking train cars and can have performance implications with very large datasets.

```
Vertical Concatenation (axis=0):

  [1, 2]   +   [5, 6]   =>   [1, 2]
  [3, 4]                      [3, 4]
                              [5, 6]

Horizontal Concatenation (axis=1):

  [1, 2]   +   [7]   =>   [1, 2, 7]
  [3, 4]       [8]        [3, 4, 8]
```

## Details

Concatenation is the core NumPy operation for combining multiple arrays into one. The central idea is to 'glue' arrays together along a dimension they already share. For example, you can take two 2D arrays and stack them on top of each other (joining along the row axis) or place them side-by-side (joining along the column axis). The `np.concatenate` function is the tool for this, but it strictly requires that the arrays have compatible shapes and that you are only adding data along an existing axis, not creating a new one. This entire workflow is detailed in the [[Python - Concatenating NumPy Arrays Process|concatenation process]].

#### Primary Goal

To combine multiple NumPy arrays into a single, larger array along a specified, existing axis.

#### Mechanism

- **Step 1: Define Input Arrays**
    - Create the NumPy arrays you wish to join. For the operation to succeed, these arrays must have compatible dimensions. This is a critical concept explained in [[Python - Shape Compatibility in NumPy Concatenation|shape compatibility]].
- **Step 2: Specify the Concatenation Axis**
    - Decide which axis to join the arrays along. For 2D arrays, `axis=0` joins along the rows (vertical stacking), and `axis=1` joins along the columns (horizontal stacking).
- **Step 3: Call `np.concatenate`**
    - Pass a tuple containing the arrays as the first argument and the chosen axis as the second argument to the `np.concatenate()` function. The function returns a new array containing the combined data.

##### Code Translation

```python
import numpy as np

# --- Step 1: Define Input Arrays ---
a = np.array([[1, 2],
              [3, 4]])

b = np.array([[5, 6]])

# --- Step 2 & 3: Concatenate along axis=0 (rows) ---
# This stacks array 'b' vertically below array 'a'.
# Shapes must match along axis 1 (the number of columns).
# a.shape is (2, 2), b.shape is (1, 2). They both have 2 columns.
vertical_concat = np.concatenate((a, b), axis=0)
print("--- Vertical Concatenation (axis=0) ---")
print(vertical_concat)
print(f"New shape: {vertical_concat.shape}")

# --- Step 2 & 3: Concatenate along axis=1 (columns) ---
# This stacks array 'c' horizontally next to array 'a'.
# Shapes must match along axis 0 (the number of rows).
c = np.array([[7],
              [8]])
# a.shape is (2, 2), c.shape is (2, 1). They both have 2 rows.
horizontal_concat = np.concatenate((a, c), axis=1)
print("\n--- Horizontal Concatenation (axis=1) ---")
print(horizontal_concat)
print(f"New shape: {horizontal_concat.shape}")
```

 [[Code - Concatenating NumPy Arrays Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`a` (tuple or list of arrays)**
    - The sequence of arrays to be joined. They must be passed inside a tuple or list, e.g., `(array1, array2)`.
- **`axis` (integer, optional)**
    - The axis along which the arrays will be joined. The default is `0`.
    - For a 2D array: `axis=0` refers to the vertical axis (rows), and `axis=1` refers to the horizontal axis (columns).

#### Core Trade-offs

- **Limitation: No New Dimensions**
    - The primary limitation is that `np.concatenate` can only join arrays along an *existing* axis. It cannot be used to add a new dimension to an array (e.g., turning a 1D array into a 2D array). Functions like `np.stack` or `np.newaxis` are used for that.
- **Performance: Creates a New Array**
    - Concatenation is not an in-place operation. It allocates new memory for the combined array and copies the data from the original arrays. This can be inefficient if performed repeatedly in a loop with large arrays, leading to high memory consumption and slower execution.
- **Constraint: Shape Compatibility**
    - The arrays being joined must have the same shape along all axes *except* for the one being concatenated. A mismatch will raise a `ValueError`. This often requires pre-processing steps, such as those covered in [[Python - Reshaping 1D Arrays for Concatenation|reshaping arrays]], to ensure compatibility.

## Connections

```
             (Parent)
      Modifying NumPy Arrays
               ▲
               │
┌──────────────┼──────────────────────────────────┐
│              │                                  │
(Requires)  ┌──────────────────────────┐        (Contrast)
Shape       │ Concatenating NumPy Arrays │  Deleting Data from Arrays
Compatibility └──────────────────────────┘
               │
    ┌──────────┴──────────┐
    │                     │
(Process)             (Prerequisite)
Concatenation Process   Reshaping 1D Arrays
```

### Parent Concept

This concept is a fundamental technique within the broader topic of [[Python - Modifying NumPy Arrays|modifying NumPy arrays]], alongside operations like adding or deleting elements.

### Child Concepts

- The specific workflow is detailed in [[Python - Concatenating NumPy Arrays Process|the concatenation process]].
- A critical prerequisite is understanding [[Python - Shape Compatibility in NumPy Concatenation|shape compatibility]], which dictates how arrays can be joined.

### Related Concepts 

- This operation directly contrasts with [[Python - Deleting Data from NumPy Arrays (np.delete)|deleting data from arrays]], which removes elements instead of adding them.
- Often, successful concatenation requires first using techniques for [[Python - Reshaping 1D Arrays for Concatenation|reshaping 1D arrays]] to ensure their dimensions are compatible.
- It is built upon the foundational knowledge of [[Python - 2D NumPy Arrays|2D NumPy arrays]] and their axis-based structure.
## Questions

- You're processing daily log files, each loaded as a NumPy array. Your goal is to create a single master array for the month. Would you concatenate the array for each new day as it arrives, or would you store them separately and perform one large concatenation at the end of the month? Justify your choice based on memory usage, computational cost, and the need for intermediate analyses.
- Imagine a real-time data pipeline where sensor readings (as NumPy arrays) arrive every millisecond. Using `np.concatenate` in a loop to append each new reading would be highly inefficient. How would you design a system to aggregate these arrays in a memory-efficient way before performing a final, batched concatenation for downstream processing?
- What if the `np.concatenate` function was limited to only joining two arrays at a time? How would you rewrite a function that currently concatenates a list of 100 arrays to be as efficient as possible, and what data structure might you use to manage the intermediate steps?