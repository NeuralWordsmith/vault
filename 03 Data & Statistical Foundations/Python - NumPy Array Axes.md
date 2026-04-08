---
tags: 
  - core
  - python
  - numpy
  - axis
  - dimension
  - array_manipulation
  - aggregation
  - concept
source: 
  - "[[Introduction to NumPy]]"
related: 
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - 2D NumPy Arrays]]"
  - "[[Python - Indexing NumPy Arrays]]"
  - "[[Python - Indexing 2D NumPy Arrays]]"
  - "[[Python - Subsetting 2D NumPy Arrays]]"
  - "[[Python - NumPy Array Slicing]]"
  - "[[Python - 2D NumPy Array Slicing]]"
  - "[[Python - NumPy Array Manipulation]]"
  - "[[Python - Sorting NumPy Arrays with np.sort]]"
  - "[[Python - Boolean Operators on NumPy Arrays]]"
  - "[[Python - Pandas DataFrame]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[Python - Random Number Generation with NumPy]]"
  - "[[NumPy - Exploratory Data Analysis with NumPy]]"
---
# Core: NumPy Axes

## Summary

>In NumPy, an axis refers to a specific dimension of a multi-dimensional array. For a 2D array, `axis=0` represents the direction along the rows (vertically), and `axis=1` represents the direction along the columns (horizontally). This concept is fundamental because many NumPy functions, like `sum()`, `mean()`, or `sort()`, can be directed to operate along a specific axis.

**Why This Matters:** Understanding axes is crucial for performing targeted calculations on multi-dimensional data, allowing you to aggregate, manipulate, and analyze datasets along specific dimensions like rows or columns, which is a cornerstone of data analysis.

_Analogy:_ _Think of a 2D NumPy array as a spreadsheet. The rows in the spreadsheet represent `axis=0`, and the columns represent `axis=1`. If you want to calculate the total sales for each product (each row), you would sum the values *across* the columns (`axis=1`). If you wanted to find the total sales for each month (each column), you would sum the values *down* the rows (`axis=0`). The `axis` parameter tells NumPy which direction to perform the calculation._

**Where it breaks down:** The spreadsheet analogy is excellent for 2D arrays but becomes less intuitive for higher-dimensional arrays. NumPy arrays can have many axes (3D, 4D, etc.), whereas a standard spreadsheet is limited to two. The concept remains the same—each axis is just another dimension—but it's harder to visualize.

```
Given the array:
[ [10, 20, 30],
  [40, 50, 60] ]

Summing along axis=0 (collapsing rows):
  10   20   30
+ 40 + 50 + 60
  --   --   --
= [50,  70,  90]

Summing along axis=1 (collapsing columns):
[10 + 20 + 30]  -> [60]
[40 + 50 + 60]  -> [150]
```

## Details

In the world of NumPy, an 'axis' is a dimension. For a 2D array, which is like a grid or a table, there are two dimensions: rows and columns. By convention, `axis=0` is the first dimension (the rows), and `axis=1` is the second dimension (the columns). A helpful mnemonic is that a vertical column looks like the number '1', so `axis=1` refers to columns. Specifying an axis tells a function, like `np.sum()`, to collapse that dimension during the operation. For example, summing along `axis=0` collapses the rows to produce a result for each column.

#### Primary Goal

To provide a mechanism for directing NumPy functions to operate along a specific dimension (e.g., rows or columns) of a multi-dimensional array, enabling precise data aggregation and manipulation.

#### Mechanism

- **How it Works:**
    1. **Select an Operation:** Choose a NumPy function that accepts an `axis` argument, such as `np.sum()`, `np.mean()`, `np.max()`, or `np.sort()`.
    2. **Specify the Axis:** Provide the `axis` keyword argument to tell the function which dimension to operate on.
    3. **Collapse the Dimension:** The function is applied to all the elements along the specified axis, effectively 'collapsing' that dimension and returning an array with one fewer dimension.
- **Axis 0 (The Rows):**
    - This refers to the vertical dimension of the array. When you perform an operation along `axis=0`, you are performing it *down each column*.
    - *Example: `array.sum(axis=0)` calculates the sum of the first elements of each row, then the sum of the second elements of each row, and so on.*
- **Axis 1 (The Columns):**
    - This refers to the horizontal dimension of the array. When you perform an operation along `axis=1`, you are performing it *across each row*.
    - *Example: `array.sum(axis=1)` calculates the sum of all elements in the first row, then the sum of all elements in the second row, and so on.*

##### Code Translation

import numpy as np

# --- Step 1: Create a 2D NumPy array ---
# Represents sales data: 4 stores (rows), 3 months (columns)
sales_data = np.array([
    [100, 150, 200], # Store 1
    [120, 130, 140], # Store 2
    [80, 190, 110],  # Store 3
    [90, 100, 210]   # Store 4
])

# --- Step 2: Perform operation along axis=0 (down the rows) ---
# This calculates the total sales for each month across all stores.
monthly_totals = sales_data.sum(axis=0)
print(f"Total sales per month (axis=0): {monthly_totals}") # Result: [390 570 660]

# --- Step 3: Perform operation along axis=1 (across the columns) ---
# This calculates the total sales for each store across all months.
store_totals = sales_data.sum(axis=1)
print(f"Total sales per store (axis=1): {store_totals}") # Result: [450 390 380 400]

 [[Code - NumPy Axes Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Axis Value (Integer):**
    - The integer specifies the dimension to operate on. It's zero-indexed, so `0` is the first dimension, `1` is the second, and so on.
    - For a 3D array, `axis=0` would be depth, `axis=1` would be rows, and `axis=2` would be columns.
- **`keepdims` (Boolean):**
    - Some functions like `np.sum` have a `keepdims=True` parameter. If set, the reduced axes are left in the result as dimensions with size one. This allows the result to broadcast correctly against the original array.

#### Core Trade-offs

- **Clarity vs. Complexity:**
    - Using the `axis` parameter is powerful and concise but can be confusing for beginners, especially with higher-dimensional arrays. It's easy to mix up `axis=0` and `axis=1`, leading to incorrect calculations.
- **Dimensionality Reduction:**
    - The primary consequence of using an axis in an aggregation function is that it reduces the number of dimensions in the output array by one (unless `keepdims=True`). This can cause 'shape mismatch' errors in subsequent operations if not handled carefully.

## Connections

```
                      (Parent)
               2D NumPy Arrays
                         ▲
                         │
           ┌─────────────┼─────────────┐
           │             │             │
(Uses)     │      ┌──────────────┐     │     (Uses)
Indexing 2D Arrays │   NumPy Axes   │  Array Manipulation
           │      └──────────────┘     │
           │             │             │
           │             │             │
(Uses)     │             │             │     (Uses)
Array Slicing          │         Sorting Arrays
                       │
                       ▼
                (Concept)
            Aggregation Functions
            (e.g., sum, mean)
```

### Parent Concept

The concept of axes is a fundamental property of [[Python - 2D NumPy Arrays|2D NumPy arrays]] and higher-dimensional arrays, defining the dimensions along which operations can be performed.

### Child Concepts



### Related Concepts 

- [[Python - NumPy Array Manipulation|NumPy array manipulation]] often relies on the `axis` parameter to perform targeted changes, such as concatenating or stacking arrays along a specific dimension.
- The process of [[Python - Indexing 2D NumPy Arrays|indexing 2D NumPy arrays]] is inherently tied to the concept of axes, as you specify which elements to access based on their position along axis 0 (row index) and axis 1 (column index).
- Functions like [[Python - Sorting NumPy Arrays with np.sort|sorting NumPy arrays]] use the `axis` parameter to determine whether to sort the data within each column (`axis=0`) or within each row (`axis=1`).
## Questions

- Imagine you have a dataset of daily sales for multiple stores (rows=stores, columns=days). You need to report both the total sales per store for the month and the total company-wide sales for each day. How would you use the `axis` parameter to achieve this, and why might a manager care about one metric (e.g., daily trends) more than the other (e.g., individual store performance)?
- In a large-scale data processing pipeline, you're calculating the average feature values across millions of data points (e.g., `np.mean(data, axis=0)`). If this operation becomes a memory bottleneck, what strategies could you employ to compute these axis-wise statistics without loading the entire dataset into memory at once?
- What if the `axis` parameter in NumPy functions was limited to only operating on the last dimension of an array? How would this fundamentally change the way you structure your data and perform common array manipulations like calculating row-wise sums or column-wise means?