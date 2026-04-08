---
tags: 
  - core
  - python
  - cumulative_sum
  - running_total
  - cummax
  - cumsum
  - time_series_analysis
  - concept
source: 
  - "[[Data Manipulation with pandas]]"
related: 
  - "[[Python - Summary Statistics in pandas]]"
  - "[[Python - Common Summary Statistics in pandas]]"
  - "[[Python - The .agg() Method for Custom Statistics]]"
  - "[[Python - Pandas DataFrame]]"
  - "[[Python - Pandas Package]]"
  - "[[Statistics - Random Walk]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - DataFrame Indexing and Selection]]"
  - "[[Python - Vectorized Operations]]"
  - "[[Python - NumPy Data Aggregation]]"
  - "[[Fundamental - Statistics]]"
  - "[[Python - Lists]]"
---
# Core: Cumulative Statistics in pandas

## Summary

>Cumulative statistics in pandas are methods that compute a "running" value for a statistic as they iterate through a Series or DataFrame column. Unlike [[Python - Common Summary Statistics in pandas|standard summary statistics]] which return a single value (like the total sum or overall max), cumulative methods return a new Series of the same length as the input, where each element represents the calculated statistic up to that point in the data.

**Why This Matters:** These functions are essential for analyzing trends and patterns over time, such as calculating running totals for sales or tracking the peak value of a stock price up to each day.

_Analogy:_ _Imagine you're running a marathon. A standard summary statistic would be like looking at your watch only at the finish line to see your total time. A cumulative statistic is like looking at your watch at *every single mile marker*. At mile 1, you see your time for the first mile. At mile 2, you see your total time for miles 1 and 2 combined. At mile 10, you see your total time for the first ten miles, and so on, until you get the final total at the end._

Where it breaks down:** The analogy implies a time-series or ordered sequence (marathon miles). While this is a primary use case, cumulative statistics can be applied to any ordered data, even if the order isn't chronological. The meaning might just be less intuitive.

```
Original Data vs. Cumulative Sum

+-------+-----------+----------------------+
| Index | weight_kg | weight_kg.cumsum()   |
+-------+-----------+----------------------+
|   0   |    24     |       24             |  (24)
|   1   |    24     |       48             |  (24 + 24)
|   2   |    24     |       72             |  (48 + 24)
|   3   |    17     |       89             |  (72 + 17)
|   4   |    29     |      118             |  (89 + 29)
|   5   |     2     |      120             |  (118 + 2)
|   6   |    74     |      194             |  (120 + 74)
+-------+-----------+----------------------+ 
```

## Details

In data analysis, we often need to understand how a quantity accumulates or changes over a sequence. pandas provides a suite of cumulative statistics methods to handle this directly. Instead of calculating a single summary value for an entire column, these methods, such as `.cumsum()` for cumulative sum or `.cummax()` for cumulative maximum, produce a new column. Each row in this new column shows the result of the statistic calculated on all data from the first row up to the current row. This is particularly powerful for tracking growth, decay, or peak/trough values in ordered datasets, like time-series financial data or experimental results. The main methods are **`.cumsum()`**, **`.cumprod()`**, **`.cummin()`**, and **`.cummax()`**.

#### Primary Goal

To compute running calculations (like totals, products, maximums, or minimums) sequentially over a Series or DataFrame column.

#### Mechanism

- **Step 1: Select the Data**
    - Isolate the pandas Series (a column) on which you want to perform the cumulative calculation.
- **Step 2: Apply the Cumulative Method**
    - Call the desired method, such as `.cumsum()` or `.cummax()`, on the selected Series.
- **Step 3: Interpret the Result**
    - The output is a new Series of the same length. The value at index `i` in the output is the result of the operation on all elements from index `0` to `i` in the original Series.

##### Code Translation

```python
import pandas as pd

# --- Step 1: Prepare the Data ---
# Create a DataFrame similar to the example
dogs_data = {'weight_kg': [24, 24, 24, 17, 29, 2, 74]}
dogs = pd.DataFrame(dogs_data)
print("Original Weights:")
print(dogs['weight_kg'])
print("\n" + "="*30 + "\n")

# --- Step 2: Apply the Cumulative Method ---
# Calculate the cumulative sum (running total)
cumulative_sum = dogs['weight_kg'].cumsum()

# Calculate the cumulative maximum (running max)
cumulative_max = dogs['weight_kg'].cummax()


# --- Step 3: Interpret the Result ---
print("Cumulative Sum (Running Total):")
print(cumulative_sum)
print("\n" + "="*30 + "\n")

print("Cumulative Maximum (Running Max):")
print(cumulative_max)
```

 [[Code - Cumulative Statistics in pandas Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`axis`**
    - Determines whether to perform the operation along rows (`axis=0` or `'index'`, the default) or columns (`axis=1` or `'columns'`). Applying it across columns is less common but can be useful in specific scenarios, like accumulating values across different feature columns for each sample.
- **`skipna`**
    - A boolean (default `True`) that controls whether to exclude `NA`/`null` values. If `True`, missing values are ignored in the calculation. If `False`, the presence of an `NA` value will propagate `NA`s in the subsequent cumulative results.

#### Core Trade-offs

- **Pro: Intuitive for Ordered Data**
    - Extremely effective and clear for time-series or any sequentially ordered data to show trends, growth, or running totals.
- **Pro: Vectorized and Efficient**
    - These methods are implemented in C and are highly optimized, making them much faster than trying to achieve the same result with a Python `for` loop.
- **Con: Misleading on Unordered Data**
    - Applying a cumulative function to unordered categorical data can produce a result, but it will likely be meaningless as the output depends entirely on the arbitrary row order.
- **Con: Memory Usage**
    - The output is always a new Series with the same number of elements as the input. For very large datasets, this duplicates the data in memory, which could be a concern.

## Connections

```
                           (Parent)
                Summary Statistics in pandas
                             ▲
                             │
┌────────────────────────────┼────────────────────────────┐
│                            │                            │
(Contrasts With)      ┌──────────────────────────────┐      (Application)
Common Summary Stats  │ Cumulative Statistics in pandas │      Random Walk
                      └──────────────────────────────┘
                             │
                             │
                       (Alternative)
                      The .agg() Method
```

### Parent Concept

Cumulative statistics are a specific type of [[Python - Summary Statistics in pandas|summary statistic]] used to understand how a value accumulates over a sequence.

### Child Concepts



### Related Concepts 

- This method contrasts with [[Python - Common Summary Statistics in pandas|common summary statistics]] like `.sum()` or `.max()`, which compute a single scalar value for the entire series.
- While cumulative functions apply one operation sequentially, [[Python - The .agg() Method for Custom Statistics|the .agg() method]] provides a flexible way to apply multiple different summary functions at once.
- A classic application of cumulative sums is in simulating a [[Statistics - Random Walk|random walk]], where each step is added to the previous position.
## Questions

- Imagine you are analyzing daily sales data for a new product. How would you use a cumulative sum to determine the exact day the product reached 80% of its total quarterly sales target, and what is the business risk of relying solely on this cumulative view without considering the daily sales rate?
- In a production system processing a continuous stream of sensor readings, calculating a cumulative maximum over all historical data is computationally expensive. How would you design a system to provide this running maximum in near real-time without re-scanning the entire dataset for each new reading?
- What if you needed to compute a 'cumulative rolling average'—that is, for each row, you calculate the average of all values up to that point? Since pandas doesn't have a `.cummean()` method, how would you implement this efficiently using the existing cumulative functions?