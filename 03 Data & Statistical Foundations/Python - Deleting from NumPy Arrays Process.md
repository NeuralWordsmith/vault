---
tags: 
  - process
  - python
  - numpy
  - axis
  - array_manipulation
  - data_cleaning
  - np_delete
  - concept
source: 
  - "[[Introduction to NumPy]]"
related: 
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - 2D NumPy Arrays]]"
  - "[[Python - Modifying NumPy Arrays]]"
  - "[[Python - Deleting Data from NumPy Arrays (np.delete)]]"
  - "[[Python - Indexing NumPy Arrays]]"
  - "[[Python - Subsetting 2D NumPy Arrays]]"
  - "[[Python - NumPy Concatenation]]"
  - "[[Python - Concatenating NumPy Arrays Process]]"
  - "[[Python - Shape Compatibility in NumPy Concatenation]]"
  - "[[Python - Pandas DataFrame]]"
  - "[[Python - List Manipulation]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[Fundamental - Feature Engineering]]"
  - "[[Python - Slicing]]"
  - "[[Python - Boolean Operators on NumPy Arrays]]"
---
# Process: Deleting Data from NumPy Arrays by Axis

**Why This Matters:** Specifying an axis for deletion provides the precise control needed to remove entire rows or columns, a fundamental operation in data cleaning and feature selection.
## Goal & Analogy

> **Goal:** When deleting data from a multi-dimensional NumPy array, you must specify not only *what* to delete (the index) but also the *direction* or *dimension* of the deletion. This direction is called the 'axis'. For a 2D array, `axis=0` targets rows, while `axis=1` targets columns. This is a core concept within the broader topic of [[Python - Deleting Data from NumPy Arrays (np.delete)|deleting data from NumPy arrays]].

_Analogy:_ _Imagine a spreadsheet. To delete the second row, you click on the row number '2' on the left-hand side and hit delete. To delete the second column, you click on the column letter 'B' at the top and hit delete. In this analogy, the NumPy `index` is the number you're targeting (e.g., the second one). The `axis` is your choice of clicking the row numbers on the side (`axis=0`) versus the column letters at the top (`axis=1`). You can't just say 'delete the second thing'; you have to specify if you mean the second row or the second column._

**Where it breaks down:** In a spreadsheet, this is a visual, in-place operation that modifies the sheet directly. In NumPy, `np.delete` is a functional operation; it doesn't change the original array but instead returns a *new* array with the specified data removed. This is a crucial distinction for memory management.

```
Original 3x3 Array:
[ [1, 2, 3],
  [4, 5, 6],  <-- Target Row (index 1)
  [7, 8, 9] ]
     ^
     | Target Column (index 1)

Delete with axis=0 (Row Deletion):
np.delete(arr, 1, axis=0)
     ||
     V
[ [1, 2, 3],
  [7, 8, 9] ]

Delete with axis=1 (Column Deletion):
np.delete(arr, 1, axis=1)
     ||
     V
[ [1, 3],
  [4, 6],
  [7, 9] ]
```

## The Step-by-Step Process

### Prerequisites / Inputs

- **`arr`**: The input NumPy array from which to delete values.
- **`obj`**: The index or slice indicating which sub-arrays to remove. For the example, this is `1` to target the second row/column.
- **`axis`**: The crucial parameter that defines the dimension of deletion.
    - `axis=0`: Deletes along the vertical axis, effectively removing one or more rows.
    - `axis=1`: Deletes along the horizontal axis, effectively removing one or more columns.
    - If `axis` is not provided, the array is flattened before deletion, which is usually not the desired behavior for 2D data.

### The Steps

- **Step 1: Define the Array**
    - Start with a standard 2D NumPy array.
- **Step 2: Delete a Row (Axis 0)**
    - To remove the second row, specify its index (`1`) and the axis for rows (`axis=0`).
- **Step 3: Delete a Column (Axis 1)**
    - To remove the second column, specify its index (`1`) and the axis for columns (`axis=1`).

##### Code Translation

```python
import numpy as np

# --- Step 1: Define the Array ---
# Create a 3x4 array
arr = np.array([
    [1, 2, 3, 4],
    [5, 6, 7, 8],  # This is the row we will delete (index 1)
    [9, 10, 11, 12]
])
# The second column is [2, 6, 10] (index 1)

print("Original Array:")
print(arr)

# --- Step 2: Delete a Row (Axis 0) ---
# To delete the second row, we use index=1 and axis=0
arr_without_row = np.delete(arr, 1, axis=0)

print("\nArray after deleting second row (axis=0):")
print(arr_without_row)

# --- Step 3: Delete a Column (Axis 1) ---
# To delete the second column, we use index=1 and axis=1
arr_without_column = np.delete(arr, 1, axis=1)

print("\nArray after deleting second column (axis=1):")
print(arr_without_column)
```

### Deliverables / Outputs

In a 2D NumPy array, data is structured along two dimensions: rows and columns. To remove an entire slice of data, such as a full row or a full column, you need to provide two key pieces of information: the index of the item to remove and the axis along which to perform the removal. For example, to delete the second row, the index is `1` and the axis is `0`. To delete the second column, the index is still `1`, but the axis is updated to `1`. This axis parameter is the critical switch that tells NumPy whether to operate vertically (across rows) or horizontally (across columns).

## Context & Tradeoffs

### When to Use This Process

To programmatically remove entire rows or columns from a 2D NumPy array to filter out unwanted data or restructure the array for further analysis.

### Common Pitfalls & Tradeoffs

- **Immutability vs. Memory**: `np.delete` returns a new array and does not modify the original. This is a safe practice that prevents unintended side effects, but it requires allocating memory for the new, smaller array, which can be inefficient for very large datasets in a tight loop.
- **Complexity in Higher Dimensions**: While the concept of `axis=0` (rows) and `axis=1` (columns) is intuitive for 2D arrays, visualizing and correctly specifying the axis for 3D or higher-dimensional arrays can become challenging and error-prone.

## Connections

```
                 (Parent)
        Python - Modifying NumPy Arrays
                   ▲
                   │
┌──────────────────┼──────────────────┐
│                  │                  │
(Relies On)  ┌───────────────────────────┐  (Contrasts With)
Python -     │ Deleting Data by Axis     │  Python - NumPy
Indexing     └───────────────────────────┘  Concatenation
NumPy Arrays
```


- This operation is a primary method for [[Python - Modifying NumPy Arrays|modifying NumPy arrays]].
- It directly contrasts with [[Python - NumPy Concatenation|NumPy concatenation]], which adds data along a specified axis instead of removing it.
- Correctly using this function depends on a solid understanding of [[Python - Indexing NumPy Arrays|NumPy indexing]] to specify which elements to remove.
- This is the core mechanism behind the general [[Python - Deleting Data from NumPy Arrays (np.delete)|np.delete function]].

## Deeper Questions

- Imagine you have a large dataset of sensor readings where rows represent time and columns represent individual sensors. Some sensors are discovered to be faulty. What is the trade-off between deleting these faulty sensor columns entirely versus keeping them and imputing the missing/faulty values? How would you decide which approach to take based on the project's goal, such as real-time anomaly detection versus historical trend analysis?
- If you needed to repeatedly delete rows from a massive, multi-gigabyte NumPy array in a streaming data pipeline, the memory cost of creating a new array each time with `np.delete` could be prohibitive. How would you design a more memory-efficient system to achieve the same outcome of filtering out unwanted data rows?
- What if the `axis` parameter in `np.delete` did not exist? How would you replicate the functionality of deleting the second column of a 2D array using only basic NumPy indexing, slicing, and concatenation?