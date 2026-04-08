---
tags: 
  - core
  - python
  - pandas
  - missing_data
  - data_cleaning
  - nan_count
  - data_profiling
  - concept
source: 
  - "[[Data Manipulation with pandas]]"
related: 
  - "[[Python - Handling Missing Values in pandas]]"
  - "[[Python - pandas .isna() Method]]"
  - "[[Python - NaN (Not a Number)]]"
  - "[[Python - Pandas DataFrame]]"
  - "[[Python - pandas .sum() Method]]"
  - "[[Python - pandas .dropna() Method]]"
  - "[[Python - pandas .fillna() Method]]"
  - "[[Python - pandas .isna().any() Method]]"
  - "[[Python - Visualizing Missing Values]]"
  - "[[Python - Data Types]]"
  - "[[Python - Booleans]]"
  - "[[Python - NumPy Data Aggregation]]"
  - "[[Fundamental - Feature Engineering]]"
  - "[[Fundamental - Data Engineering]]"
---
# Core: Counting Missing Values with .isna().sum()

## Summary

>This is a common pandas idiom that chains two methods to count the number of missing values (NaNs) in each column of a DataFrame. First, the `[[Python - pandas .isna() Method|.isna()]]` method creates a boolean DataFrame (a 'mask'), where each cell is `True` if the original value was missing and `False` otherwise. Then, the `.sum()` method is called on this boolean DataFrame. Because Python treats `True` as the integer `1` and `False` as `0`, summing the boolean values effectively counts the number of `True`s in each column, giving a precise total of missing entries.

**Why This Matters:** This two-method chain is the most efficient and standard way to get a rapid quantitative summary of data quality issues across an entire DataFrame, immediately highlighting which columns need attention.

_Analogy:_ _Imagine a teacher taking attendance for multiple classes lined up in columns. The teacher first goes to each student in every class and asks, 'Are you absent today?'. This is the `.isna()` step, creating a mental checklist of 'yes' (True) or 'no' (False) for every single student slot. After making this checklist, the teacher looks down each class column and simply counts the number of 'yes' answers. This counting process is the `.sum()` step, which gives the total number of absent students for each class._

The teacher's final count gives a total for each class, just as `.isna().sum()` gives a total for each column. 
*   **Where it breaks down:** The analogy doesn't capture the vectorized nature of the operation. Pandas doesn't literally iterate student by student; it performs the check and the sum across all columns simultaneously and very quickly.

```
Original DataFrame      .isna() -> Boolean Mask      .sum() -> Final Counts
+---------+-----+-----------+      +---------+-------+--------+      
| name    | age | city      |      | name    | age   | city   |      age     1
+---------+-----+-----------+      +---------+-------+--------+      city    2
| Alice   | 25  | New York  |      | False   | False | False  |      name    0
| Bob     | NaN | Los Angeles|      | False   | True  | False  |      dtype: int64
| Charlie | 35  | NaN       |      | False   | False | True   |      
| David   | 29  | NaN       |      | False   | False | True   |      
+---------+-----+-----------+      +---------+-------+--------+      
```

## Details

The core idea is to leverage a clever property of boolean arithmetic: `True` is equivalent to `1` and `False` is equivalent to `0`. By first converting a DataFrame into a boolean representation of missingness with `[[Python - pandas .isna() Method|.isna()]]`, we can then use a simple mathematical aggregation, `.sum()`, to count the occurrences of `True` for each column. This provides a fast and readable way to profile the completeness of a dataset.

#### Primary Goal

To quickly calculate the total number of missing (`NaN`) values for each column in a pandas DataFrame.

#### Mechanism

- **Step 1: Create a Boolean Mask**
    - Apply the `[[Python - pandas .isna() Method|.isna()]]` method to the target DataFrame. This operation returns a new DataFrame of the exact same dimensions, but all values are replaced with booleans: `True` if the original value was a `[[Python - NaN (Not a Number)|NaN]]`, and `False` otherwise.
- **Step 2: Sum the Boolean Values**
    - Apply the `.sum()` method directly to the boolean DataFrame from Step 1. By default (`axis=0`), pandas sums the values downward along each column. Since `True` is treated as `1` and `False` as `0`, the result is a pandas Series where the index is the column names and the values are the total counts of `NaN`s in those columns.

##### Code Translation

```python
import pandas as pd
import numpy as np

# Create a sample DataFrame with missing values
data = {'name': ['Alice', 'Bob', 'Charlie', 'David'],
        'age': [25, np.nan, 35, 29],
        'city': ['New York', 'Los Angeles', np.nan, np.nan]}
df = pd.DataFrame(data)

print("--- Original DataFrame ---")
print(df)

# --- Step 1: Create a Boolean Mask --- 
# The .isna() method identifies missing values.
boolean_mask = df.isna()

print("\n--- Step 1: Boolean Mask from .isna() ---")
print(boolean_mask)

# --- Step 2: Sum the Boolean Values --- 
# The .sum() method counts the 'True' values in each column.
missing_counts = boolean_mask.sum()

print("\n--- Step 2: Final Count from .sum() ---")
print(missing_counts)

# The entire operation is typically done in one line:
# print(df.isna().sum())
```

 [[Code - Counting Missing Values with .isna().sum() Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`axis` (in `.sum()`)**: This parameter determines the direction of the sum.
    - `axis=0` or `axis='index'` (default): Sums vertically down the columns. This is what you use to get the count of NaNs per column.
    - `axis=1` or `axis='columns'`: Sums horizontally across the rows. This would give you the count of NaNs for each individual record (row) in the DataFrame.

#### Core Trade-offs

- **Pro: Efficiency and Readability**
    - This is the most idiomatic and computationally efficient way to get a summary of missing data in pandas. It's a single, highly readable line of code.
- **Con: Provides 'What' not 'Where' or 'Why'**
    - The method provides a quantitative summary (how many are missing) but gives no insight into the distribution or pattern of missingness. For that, you would need other techniques like `[[Python - Visualizing Missing Values|visualizations]]` (e.g., heatmaps).
    - It doesn't explain the reason for the missing data (e.g., data entry error, sensor failure), which requires domain knowledge.

## Connections

```
                      (Parent)
            Handling Missing Values
                       ▲
                       │
┌──────────────────────┼──────────────────────┐
│                      │                      │
(Foundation)    ┌──────────────────────────────────┐    (Alternative Check)
.isna() Method  │ Counting Missing Values with...  │    .isna().any() Method
                └──────────────────────────────────┘
                       │
           ┌───────────┴───────────┐
           │                       │
      (Next Step)             (Next Step)
      .dropna()               .fillna()
```

### Parent Concept

This technique is a fundamental part of the broader topic of `[[Python - Handling Missing Values in pandas|handling missing values in pandas]]`.

### Child Concepts



### Related Concepts 

- The entire process is built upon the `[[Python - pandas .isna() Method|.isna() method]]`, which generates the initial boolean mask.
- This method provides a quantitative count, which **contrasts with** the `[[Python - pandas .isna().any() Method|.isna().any() method]]` that simply checks for the presence of at least one `NaN` per column.
- The output of this count is a critical diagnostic step before deciding on a strategy, such as removing data with `[[Python - pandas .dropna() Method|.dropna()]]`.
- Alternatively, the count of missing values informs how one might impute or replace them using the `[[Python - pandas .fillna() Method|.fillna() method]]`.
## Questions

- You find that a critical feature column for your model has 40% missing values. Counting them with `.isna().sum()` was the first step. What's your next step? How would you decide between dropping the rows, dropping the column, or imputing the values, and how would you explain the business risk associated with each choice to a project manager?
- Imagine this `.isna().sum()` check is part of a daily data ingestion pipeline for a terabyte-scale dataset, and this simple operation starts taking too long. What are the potential bottlenecks, and how might you re-architect this data quality check to be more performant at scale (e.g., using Dask, Spark, or statistical sampling)?
- What if the `.sum()` method on boolean DataFrames was suddenly deprecated? How could you achieve the exact same result of counting NaNs per column using other pandas or NumPy methods, and which alternative do you hypothesize would be the most computationally efficient?