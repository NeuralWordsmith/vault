---
tags: 
  - core
  - python
  - numpy
  - aggregation
  - minimum
  - maximum
  - exploratory_data_analysis
  - concept
source: 
  - "[[Introduction to NumPy]]"
related: 
  - "[[Python - NumPy Data Aggregation]]"
  - "[[Python - NumPy .sum() Method]]"
  - "[[Python - NumPy .mean() Method]]"
  - "[[Python - NumPy axis Argument in Aggregation]]"
  - "[[Python - NumPy keepdims Argument in Aggregation]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - 2D NumPy Arrays]]"
  - "[[Python - Subsetting NumPy Arrays]]"
  - "[[Python - Boolean Operators on NumPy Arrays]]"
  - "[[NumPy - Exploratory Data Analysis with NumPy]]"
  - "[[Python - Pandas DataFrame]]"
  - "[[Fundamental - Statistics]]"
  - "[[Python - NumPy .cumsum() Method]]"
---
# Core: NumPy .min() and .max() Methods

## Summary

>In NumPy, `.min()` and `.max()` are fundamental [[Python - NumPy Data Aggregation|data aggregation]] methods used to find the smallest and largest values within an array, respectively. Similar to the [[Python - NumPy .sum() Method|.sum() method]], they can operate on the entire array to return a single scalar value, or they can be applied along a specific dimension using the [[Python - NumPy axis Argument in Aggregation|axis argument]] to find the min/max of each column or row.

**Why This Matters:** These methods provide an instant way to identify the boundaries and potential outliers within a dataset, which is a critical first step in data validation and exploratory analysis.

_Analogy:_ _Imagine a regional track meet with athletes from several different schools. Finding the overall fastest time across all events and all schools is like calling `.max()` on the entire dataset of times. Asking for the fastest time from *each individual school* is like using `.max(axis=...)` to aggregate by group._

- The entire dataset of race times is the NumPy array.
- The overall fastest time is the global maximum (`.max()`).
- Each school represents a row or column in the array.
- The fastest time from each school is the axis-specific maximum (`.max(axis=1)`).
- **Where it breaks down:** This analogy doesn't capture multi-dimensional arrays (e.g., results broken down by school, event, and gender), where the `axis` argument becomes even more powerful.

```
security_breaches array:
[[0, 5, 1],   -- Year 1
 [0, 2, 0],   -- Year 2
 [1, 1, 2],   -- Year 3
 [2, 2, 1],   -- Year 4
 [0, 0, 0]]   -- Year 5

Applying .min(axis=1)
------------------------>
[min(0,5,1), min(0,2,0), min(1,1,2), min(2,2,1), min(0,0,0)]
        │
        ▼
Result: [0, 0, 1, 1, 0]
(The minimum value for each row/year)
```

## Details

The `.min()` and `.max()` methods are essential tools in the NumPy library for performing exploratory data analysis. They allow a data scientist to quickly get a sense of the range of values in their data, which is crucial for tasks like identifying outliers, normalizing data, or simply understanding the dataset's characteristics. These functions belong to a family of aggregating methods that summarize an array's data, including [[Python - NumPy .sum() Method|.sum()]] and [[Python - NumPy .mean() Method|.mean()]]. By default, they reduce the entire array to a single number, but their behavior can be precisely controlled by specifying an axis, which collapses the data along that dimension.

#### Primary Goal

To efficiently find the smallest or largest value within a NumPy array, either for the entire dataset (globally) or along a specified dimension (per column or per row).

#### Mechanism

- **Step 1: Prepare the Data**
    - Start with a NumPy array. We'll use the `security_breaches` data from the context, where rows represent years and columns represent clients.
- **Step 2: Find the Global Minimum/Maximum**
    - Call the `.min()` or `.max()` method on the array without any arguments. This scans every element and returns a single scalar value representing the overall minimum or maximum.
- **Step 3: Find the Axis-Specific Minimum/Maximum**
    - To find the minimum or maximum for each row or column, provide the `axis` argument. `axis=0` aggregates down the columns (finding the min/max for each client across all years), while `axis=1` aggregates across the rows (finding the min/max for each year across all clients).

##### Code Translation

```python
import numpy as np

# --- Step 1: Prepare the Data ---
# Rows are years, columns are clients
security_breaches = np.array([[0, 5, 1],
                              [0, 2, 0],
                              [1, 1, 2],
                              [2, 2, 1],
                              [0, 0, 0]])

# --- Step 2: Find the Global Minimum/Maximum ---
# Smallest number of breaches any client experienced in any year
global_min = security_breaches.min()
print(f"Global Minimum: {global_min}") # Output: 0

# Largest number of breaches any client experienced in any year
global_max = security_breaches.max()
print(f"Global Maximum: {global_max}") # Output: 5

# --- Step 3: Find the Axis-Specific Minimum/Maximum ---
# Find the minimum number of breaches each year (across all clients)
min_per_year = security_breaches.min(axis=1)
print(f"Minimum per year (axis=1): {min_per_year}") # Output: [0 0 1 1 0]

# Find the maximum number of breaches for each client (across all years)
max_per_client = security_breaches.max(axis=0)
print(f"Maximum per client (axis=0): {max_per_client}") # Output: [2 5 2]
```

 [[Code - NumPy .min() and .max() Methods Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`axis`**
    - This parameter specifies the dimension along which the aggregation is performed. It is a key concept detailed in [[Python - NumPy axis Argument in Aggregation|axis argument in aggregation]].
    - `axis=None` (default): The aggregation is performed over the entire array, returning a single scalar value.
    - `axis=0`: The aggregation is performed down the columns, resulting in an array of values, one for each column.
    - `axis=1`: The aggregation is performed across the rows, resulting in an array of values, one for each row.
- **`keepdims`**
    - A boolean that, if set to `True`, ensures the output array has the same number of dimensions as the input array. The reduced axis will have a size of 1. This is explained further in [[Python - NumPy keepdims Argument in Aggregation|keepdims argument in aggregation]].

#### Core Trade-offs

- **Simplicity vs. Robustness**
    - `.min()` and `.max()` are extremely fast and simple for finding absolute extremes. However, they are highly sensitive to single outlier values, which might be data errors. More robust measures like quantiles might be better for understanding data distribution in the presence of noise.
- **Information Loss**
    - Like all aggregation functions, these methods reduce dimensionality and thus cause a loss of information. You know the minimum value, but you don't know where it occurred unless you use a different function like `argmin()`.

## Connections

```
                  (Parent)
         NumPy Data Aggregation
                   ▲
                   │
┌──────────────────┼──────────────────┐
│                  │                  │
(Similar)      ┌───────────────────────────┐      (Controls)
.sum()         │ NumPy .min()/.max() Methods │      axis Argument
               └───────────────────────────┘
                          │
                          │
(Similar)      ┌──────────┴──────────┐
.mean()        │                     │
               └─────────────────────┘
```

### Parent Concept

These methods are a fundamental part of [[Python - NumPy Data Aggregation|NumPy's data aggregation capabilities]], which focus on summarizing data within an array.

### Child Concepts



### Related Concepts 

- The syntax and behavior of these methods are directly analogous to the [[Python - NumPy .sum() Method|.sum() method]], which also aggregates array elements.
- They are often used alongside the [[Python - NumPy .mean() Method|.mean() method]] to get a quick statistical summary of a dataset's range and central tendency.
- Understanding the [[Python - NumPy axis Argument in Aggregation|axis argument]] is crucial for controlling whether the aggregation happens globally, per-column, or per-row.
- The [[Python - NumPy keepdims Argument in Aggregation|keepdims argument]] can be used with `.min()` and `.max()` to preserve the original array's dimensionality, which is useful for broadcasting operations.
## Questions

- In a financial dataset, the absolute minimum or maximum transaction value might be a data entry error. How would you decide whether to report these raw `.min()`/`.max()` values to business stakeholders, versus reporting a more robust measure like the 1st and 99th percentiles, and what are the business implications of each choice?
- Imagine you are tasked with finding the global maximum value from a collection of massive log files that cannot fit into memory at once. How would you design a system to compute this value by processing the files in chunks, without loading the entire dataset?
- What if you were forbidden from using `np.sort()` or any explicit sorting function? How could you efficiently find the *second* largest value for each row in a large 2D NumPy array using only basic array operations and aggregation methods?