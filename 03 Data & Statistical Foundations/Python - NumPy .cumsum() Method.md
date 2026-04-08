---
tags: 
  - core
  - python
  - cumulative_sum
  - running_total
  - numpy_aggregation
  - time_series_analysis
  - concept
source: 
  - "[[Introduction to NumPy]]"
related: 
  - "[[Python - NumPy Data Aggregation]]"
  - "[[Python - NumPy .sum() Method]]"
  - "[[Python - NumPy axis Argument in Aggregation]]"
  - "[[Python - NumPy .mean() Method]]"
  - "[[Python - NumPy .min() and .max() Methods]]"
  - "[[Python - NumPy keepdims Argument in Aggregation]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - 2D NumPy Arrays]]"
  - "[[Python - Subsetting NumPy Arrays]]"
  - "[[Python - Pandas DataFrame]]"
  - "[[Fundamental - Statistics]]"
  - "[[Python - Looping Over Data Structures]]"
  - "[[Python - Performance Testing]]"
  - "[[Python - List Comprehensions]]"
  - "[[Python - Data Types]]"
---
# Core: NumPy .cumsum() Method

## Summary

>The `numpy.cumsum()` method calculates the cumulative sum of elements along a specified axis in a NumPy array. Instead of a single total like `[[Python - NumPy .sum() Method|.sum()]]`, it returns an array of the same shape where each element is the sum of all preceding elements up to that point in the given dimension.

**Why This Matters:** It enables the efficient tracking of running totals and growth trajectories in data, which is crucial for analyzing trends like financial balances, inventory levels, or cumulative user engagement over time.

_Analogy:_ _Imagine your bank account statement for a month. Each line shows a transaction (a deposit or withdrawal). The `np.cumsum()` function is like the 'Balance' column on that statement. It doesn't just show you the individual transaction amount; it shows you the running total of your money after each transaction has occurred._

The bank statement's list of individual transactions is the initial array. The 'Balance' column is the output of `cumsum()`. Each new balance is the previous balance plus the current transaction. **Where it breaks down:** This analogy primarily works for a 1D array. For 2D arrays, `cumsum` operates independently along rows or columns, which is like having multiple, separate bank accounts being tracked simultaneously on the same statement.

```
Client 1 Calculation (axis=0)
┌──────────┐      ┌──────────────┐
│ Year 1: 0│ ───> │ Output 1: 0  │
└──────────┘      └──────────────┘
     +
┌──────────┐      ┌──────────────┐
│ Year 2: 0│ ───> │ Output 2: 0+0=0│
└──────────┘      └──────────────┘
     +
┌──────────┐      ┌──────────────┐
│ Year 3: 1│ ───> │ Output 3: 0+1=1│
└──────────┘      └──────────────┘
     +
┌──────────┐      ┌──────────────┐
│ Year 4: 2│ ───> │ Output 4: 1+2=3│
└──────────┘      └──────────────┘
     +
┌──────────┐      ┌──────────────┐
│ Year 5: 0│ ───> │ Output 5: 3+0=3│
└──────────┘      └──────────────┘
```

## Details

The `numpy.cumsum()` method is a powerful tool within the NumPy library for performing cumulative data aggregation. As the name suggests, it computes the cumulative sum of array elements. This is particularly useful for time-series analysis or any scenario where you need to track a running total. For instance, as shown in the example of tracking security breaches, applying `cumsum()` along the time axis (e.g., years) for each client reveals the total number of breaches they have experienced up to any given point in time, transforming raw event data into a history of accumulation.

#### Primary Goal

To create a new array where each element represents the running total of all elements up to that point along a specified axis.

#### Mechanism

- **Step 1: Define the Input Array**
    - Start with a NumPy array containing the data. In this case, it's a 2D array where rows represent years and columns represent clients, with values being the number of security breaches in that year.
- **Step 2: Specify the Aggregation Axis**
    - Decide the direction for the cumulative sum. Using `axis=0` means we sum *down the columns*, calculating the running total for each client across the years. This is a key concept detailed in [[Python - NumPy axis Argument in Aggregation]].
- **Step 3: Apply .cumsum()**
    - Call the `.cumsum()` method on the array, passing the chosen axis as an argument.
- **Step 4: Interpret the Output**
    - The resulting array has the same dimensions as the input. Each element `(i, j)` in the output is the sum of all elements from `(0, j)` to `(i, j)` in the input array, effectively showing the total-to-date.

##### Code Translation

```python
import numpy as np

# --- Step 1: Define the Input Array ---
# Data represents security breaches per year for 3 clients
# Rows: year 1, year 2, ..., year 5
# Columns: client 1, client 2, client 3
security_breaches = np.array([
    [0, 5, 1],  # year 1
    [0, 2, 0],  # year 2
    [1, 1, 2],  # year 3
    [2, 2, 1],  # year 4
    [0, 0, 0]   # year 5
])

# --- Step 2 & 3: Specify the Axis and Apply .cumsum() ---
# We want the cumulative total for each client over the years.
# This means summing down the columns, so we use axis=0.
cumulative_breaches = security_breaches.cumsum(axis=0)

# --- Step 4: Interpret the Output ---
print("Original Breaches per Year:\n", security_breaches)
print("\nCumulative Breaches Over Time (axis=0):\n", cumulative_breaches)
# The output shows the total breaches a client has had up to that year.
# For client 2, by year 4, the total is 5+2+1+2 = 10.
```

 [[Code - NumPy .cumsum() Method Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`axis`**: An integer that specifies the axis along which the cumulative sum is computed.
    - `axis=0` computes the sum down the columns (across rows).
    - `axis=1` computes the sum across the rows (across columns).
    - If not provided, the array is flattened and a single cumulative sum is computed over all elements.
- **`dtype`**: An optional argument to specify the data type of the returned array. This can be important to prevent integer overflow if the cumulative sums become very large.
- **`out`**: An optional argument to specify an output array in which to place the result. The output array must have the same shape and buffer length as the expected output.

#### Core Trade-offs

- **Memory Usage**: `cumsum()` returns a new array of the same size as the input. For very large arrays, this can be memory-intensive compared to an in-place loop (though the NumPy version is much faster and more efficient).
- **Readability vs. Manual Loop**: It is significantly more concise, readable, and less error-prone than writing a manual for-loop in Python to calculate a running total.
- **Use Case Specificity**: It is designed specifically for calculating running totals. For a single, final total of all elements in an axis, the `[[Python - NumPy .sum() Method|.sum()]]` method is the appropriate and more direct choice.

## Connections

```
                      (Parent)
             NumPy Data Aggregation
                       ▲
                       │
    ┌──────────────────┼──────────────────┐
    │                  │                  │
(Contrast)    ┌───────────────────────────┐    (Parameter)
  .sum()      │   NumPy .cumsum() Method  │    axis Argument
              └───────────────────────────┘
```

### Parent Concept

The `.cumsum()` method is a specific form of [[Python - NumPy Data Aggregation|NumPy data aggregation]], focusing on sequential accumulation rather than a single summary statistic.

### Child Concepts



### Related Concepts 

- It directly contrasts with the [[Python - NumPy .sum() Method|.sum()]] method, which computes a single total for an entire axis, whereas `.cumsum()` provides a running total at each step.
- Understanding the [[Python - NumPy axis Argument in Aggregation|axis argument]] is fundamental to correctly applying `.cumsum()` to multi-dimensional arrays, as it dictates whether the running total is calculated along rows or columns.
- While `.cumsum()` tracks accumulation, other aggregation methods like [[Python - NumPy .mean() Method|.mean()]] or [[Python - NumPy .min() and .max() Methods|.min()/.max()]] are used to find central tendency or extreme values within the data.
## Questions

- You're analyzing daily user sign-up data for a new product. Management wants a dashboard showing both the daily sign-up count and the total user base growth over time. How would you use both `.sum()` and `.cumsum()` to efficiently generate the data for this dashboard, and what's the business risk of only showing the cumulative sum?
- Imagine you're processing a massive, multi-terabyte stream of financial transaction data that doesn't fit into memory. How would you adapt your approach to calculate a running daily balance (a cumulative sum) without using `np.cumsum()` on the entire dataset at once?
- What if you needed to calculate a 'cumulative product' instead of a cumulative sum to model compounding interest or multiplicative effects? How would you implement this in NumPy, and what numerical stability issues (like underflow or overflow) might you encounter that you wouldn't with `.cumsum()`?