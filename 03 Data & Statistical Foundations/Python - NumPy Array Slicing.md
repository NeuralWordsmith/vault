---
tags: 
  - core
  - python
  - numpy
  - slicing
  - array_subsetting
  - indexing
  - data_selection
  - concept
source: 
  - "[[Introduction to NumPy]]"
related: 
  - "[[Python - NumPy Indexing]]"
  - "[[Python - 2D NumPy Array Slicing]]"
  - "[[Python - NumPy Array Slicing with Step]]"
  - "[[Python - Subsetting NumPy Arrays]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - Lists]]"
  - "[[Python - List Subsetting]]"
  - "[[Python - NumPy Array Manipulation]]"
  - "[[Python - Indexing 2D NumPy Arrays]]"
  - "[[Python - Indexing Rows in 2D NumPy Arrays]]"
  - "[[Python - Indexing Columns in 2D NumPy Arrays]]"
  - "[[Python - Pandas DataFrame]]"
  - "[[Python - DataFrame Indexing and Selection]]"
  - "[[Python - NumPy Array Axes]]"
  - "[[Python - Sorting NumPy Arrays with np.sort]]"
---
# Core: 1D NumPy Array Slicing

## Summary

>Slicing extracts a contiguous subset of elements from a 1D NumPy array using a `start:stop` index notation, creating a new array *view* of the selected data. It's a more powerful and efficient way to subset data than single-element [[Python - NumPy Indexing|indexing]].

**Why This Matters:** Slicing is the fundamental mechanism for selecting and analyzing specific ranges of data, such as a time series segment or a feature subset, without needing to loop through elements individually.

_Analogy:_ _Slicing a NumPy array is like highlighting a specific passage in a book. The book is your original array. When you use a highlighter to mark from the beginning of page 6 to the end of page 8, you're not creating a new, separate book with just those pages. You're simply creating a 'view' or a reference to that specific section within the original book._

The original book is the NumPy array. The page numbers (e.g., page 6, page 8) are the indices. The highlighted passage is the resulting slice (the new array view).

*   **Where it breaks down:** Unlike highlighting, if you were to "write over" the highlighted passage (modify the slice), the text in the original book would also change. This direct link (view vs. copy) is a key feature of NumPy slicing that differs from a simple analogy.

```
Original Array: [ 2,  4,  6,  8,  10 ]
Indices:        [ 0,  1,  2,  3,  4  ]
                       |-------|
                       |       |
Slice [2:4] ---------->  [ 6,  8 ]
(Includes index 2, stops before index 4)
```

## Details

Slicing is a core operation in NumPy for extracting a portion of an array. Instead of picking out elements one by one, slicing allows you to specify a range using a `start:stop` syntax inside square brackets. This is incredibly efficient for working with sequential data. A key rule is that the `stop` index is exclusive, meaning the element at that index is *not* included in the slice. This concept is foundational to data manipulation in Python and is extended in [[Python - 2D NumPy Array Slicing|2D array slicing]].

#### Primary Goal

To efficiently select and extract a contiguous sequence of elements from a 1D NumPy array.

#### Mechanism

- **Step 1: Create the Array**
    - Define a 1D NumPy array containing the data you want to work with.
- **Step 2: Define the Slice**
    - Specify the range of elements to extract using the `[start:stop]` notation. The `start` index is the first element to include, and the `stop` index is the first element *not* to include.
- **Step 3: Execute the Slice**
    - Apply the slice to the array. NumPy returns a new array object that is a *view* of the original data, not a copy.

##### Code Translation

```python
import numpy as np

# --- Step 1: Create the Array ---
# Original array with elements at indices 0, 1, 2, 3, 4
my_array = np.array([2, 4, 6, 8, 10])
print(f"Original Array: {my_array}")

# --- Step 2: Define the Slice ---
# We want to slice from index 2 up to (but not including) index 4.
# This corresponds to the elements 6 and 8.
# The syntax is array[start_index:stop_index]
my_slice = my_array[2:4]

# --- Step 3: Execute the Slice ---
print(f"Sliced Array [2:4]: {my_slice}")
```

 [[Code - 1D NumPy Array Slicing Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`start`**: The index of the first element to include in the slice. If omitted, it defaults to the beginning of the array (index 0).
    - Example: `my_array[:3]` slices from the beginning up to index 3.
- **`stop`**: The index of the first element to *exclude* from the slice. If omitted, it defaults to the end of the array.
    - Example: `my_array[2:]` slices from index 2 to the very end.
- **`step`**: The interval between elements in the slice. This is covered in more detail in [[Python - NumPy Array Slicing with Step|slicing with a step]]. The default is 1.

#### Core Trade-offs

- **Performance (View vs. Copy)**: Slicing creates a *view* of the original array, not a copy. This is memory-efficient and fast because no data is duplicated, which is critical for large datasets.
- **Unintended Side Effects**: Because a slice is a view, modifying the slice will also modify the original array. This can be a powerful feature but can also introduce subtle bugs if you expect the slice to be an independent copy.
    - To prevent this and create a true copy, you must explicitly use the `.copy()` method (e.g., `my_slice = my_array[2:4].copy()`).

## Connections

```
                  (Parent)
              NumPy Indexing
                     ▲
                     │
┌────────────────────┼────────────────────┐
│                    │                    │
(Extends to)   ┌───────────────────────────┐   (Adds functionality)
2D Slicing     │  1D NumPy Array Slicing   │   Slicing with Step
               └───────────────────────────┘
                     │
                     ▼
               (Used for)
           NumPy Array Manipulation
```

### Parent Concept

Slicing is a specific technique within the broader concept of [[Python - NumPy Indexing|NumPy indexing]], which covers all methods of accessing array data.

### Child Concepts



### Related Concepts 

- This concept is the one-dimensional foundation for [[Python - 2D NumPy Array Slicing|slicing 2D arrays]], which applies the same principles across multiple axes.
- [[Python - NumPy Array Slicing with Step|Slicing with a step]] introduces a third parameter to the slice notation (`start:stop:step`) for more advanced selection patterns.
- Slicing is a primary tool used for [[Python - NumPy Array Manipulation|NumPy array manipulation]], as it allows you to select the parts of an array you wish to change or analyze.
## Questions

- You have a massive array of sensor data representing a full year of readings. You need to calculate the average reading for Q2 (April-June). Would you use a slice and then calculate the mean, or would you create a copy first? How would you justify your choice in terms of memory usage and the risk of accidentally corrupting the original dataset for other downstream analyses?
- Imagine a real-time data processing pipeline where a continuous stream of data is appended to a large NumPy array. How would you design a system to efficiently extract the "last 5 minutes" of data using slicing, and what potential performance bottlenecks could arise as the main array grows to terabytes in size?
- What if the `stop` index in NumPy slicing was *inclusive* instead of exclusive? What common Python idioms and data science workflows would break or become more complicated, and what, if anything, might become simpler?