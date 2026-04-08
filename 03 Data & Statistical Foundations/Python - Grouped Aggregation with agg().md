---
tags: 
  - core
  - python
  - pandas
  - aggregation
  - groupby
  - agg
  - summary_statistics
  - concept
source: 
  - "[[Data Manipulation with pandas]]"
related: 
  - "[[Python - Pandas DataFrame]]"
  - "[[Python - DataFrame groupby() Method]]"
  - "[[Python - Grouped Summary Statistics]]"
  - "[[Python - Grouping by Multiple Columns]]"
  - "[[Python - Manual Subsetting vs groupby() for Aggregation]]"
  - "[[Python - NumPy Data Aggregation]]"
  - "[[Python - DataFrame Indexing and Selection]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Lists]]"
  - "[[Python - Functions]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Fundamental - Statistics]]"
  - "[[Python - Efficient Code]]"
---
# Core: Multiple Grouped Summaries

## Summary

>Building upon the concept of [[Python - Grouped Summary Statistics|single grouped summaries]], applying multiple aggregations allows you to compute several statistics (like minimum, maximum, and sum) for each group simultaneously. Instead of running separate operations for each statistic, you can pass a list of functions to the `.agg()` method to get a consolidated DataFrame as output.

**Why This Matters:** This method provides a comprehensive, multi-faceted view of each data group in a single, efficient command, eliminating the need for repetitive calculations and streamlining exploratory data analysis.

_Analogy:_ _Imagine you're a restaurant manager wanting a quick daily report for each menu item (like 'Pizza', 'Pasta', 'Salad'). Instead of asking your chef for three separate reports—one for the *lowest* daily sales, one for the *highest* daily sales, and one for the *total* daily sales—you give them a single checklist: [Lowest, Highest, Total]. The chef returns one consolidated report with all three figures for each menu item. The `.agg()` method with a list is that efficient checklist._

The manager is the data analyst. The menu items are the groups (e.g., 'color'). The sales figures are the data being aggregated (e.g., 'weight_kg'). The checklist `[Lowest, Highest, Total]` is the list of functions `[min, max, sum]`. The final consolidated report is the resulting pandas DataFrame. **Where it breaks down:** The analogy implies a manual process, whereas `.agg()` is a highly optimized, vectorized operation that is far more efficient than any human chef could be.

```
    + DataFrame 'dogs' +
    | color | weight_kg|
    |-------|----------|
    | Black | 29       |
    | White | 74       |
    | Black | 24       |
    | Brown | 24       |
    | ...   | ...      |
    +------------------+
             │
             ▼ .groupby("color")["weight_kg"]
    +--------------------------------+
    | Group: Black  -> [29, 24]      |
    | Group: Brown  -> [24, 24]      |
    | Group: White  -> [74]          |
    | ...                            |
    +--------------------------------+
             │
             ▼ .agg([min, max, sum])
    +----------------------+
    |       | min | max| sum|
    | color |-----|----|----|
    | Black | 24  | 29 | 53 |
    | Brown | 24  | 24 | 48 |
    | White | 74  | 74 | 74 |
    | ...   | ... | ...| ...|
    +----------------------+
```

## Details

The core idea is to extend the power of the [[Python - DataFrame groupby() Method|groupby() method]] by using its `.agg()` function to apply a list of aggregation functions. This is a fundamental technique in exploratory data analysis for getting a quick, yet detailed, statistical overview of different segments within your data. Instead of calculating the mean, then the median, then the standard deviation in three separate steps, you can do it all in one line of code, which is both more readable and computationally efficient.

#### Primary Goal

To efficiently generate a DataFrame containing multiple summary statistics for each category identified by a `groupby` operation.

#### Mechanism

- **Step 1: Group the Data**
    - Use the `.groupby()` method on the DataFrame to create groups based on a categorical column. In the example, `dogs.groupby("color")` groups the rows by the unique values in the 'color' column.
- **Step 2: Select the Target Column**
    - Isolate the specific numeric column you want to perform calculations on using square bracket notation. Here, `["weight_kg"]` selects the weight column for aggregation.
- **Step 3: Apply Multiple Aggregations**
    - Call the `.agg()` method and pass it a Python list containing the desired aggregation functions. These can be provided as function objects (`min`, `max`, `sum`) or as strings (`'min'`, `'max'`, `'sum'`). Pandas applies each function in the list to each group's 'weight_kg' data.

##### Code Translation

```python
import pandas as pd
import numpy as np

# --- Create a sample DataFrame ---
data = {'color': ['Black', 'White', 'Black', 'Brown', 'Brown', 'Tan', 'Gray'],
        'weight_kg': [29, 74, 24, 24, 24, 2, 17]}
dogs = pd.DataFrame(data)

# --- Step 1: Group the Data ---
grouped_dogs = dogs.groupby("color")

# --- Step 2: Select the Target Column ---
weight_groups = grouped_dogs["weight_kg"]

# --- Step 3: Apply Multiple Aggregations ---
# Pass a list of functions to the .agg() method
summary_df = weight_groups.agg([min, max, sum])

print(summary_df)

# Output:
#        min  max  sum
# color               
# Black   24   29   53
# Brown   24   24   48
# Gray    17   17   17
# Tan      2    2    2
# White   74   74   74
```

 [[Code - Multiple Grouped Summaries Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **List of Functions**
    - The primary parameter for `.agg()` in this context is a list of aggregation functions.
    - You can pass built-in Python functions (`min`, `max`, `sum`), NumPy functions (`np.mean`, `np.std`), or even custom-defined functions.
    - Functions can also be passed as strings (e.g., `['min', 'max', 'mean']`), which can be more convenient and sometimes more performant.

#### Core Trade-offs

- **Computational Cost**
    - While highly efficient, applying a large number of complex aggregation functions to a massive dataset can still be computationally intensive. It's faster than a Python loop but not instantaneous.
- **Readability vs. Complexity**
    - For a few aggregations, this method is very readable. However, if you need to apply different aggregations to different columns, the syntax can become more complex (using a dictionary), potentially reducing readability for newcomers.

## Connections

```
                      (Parent)
            Grouped Summary Statistics
                       ▲
                       │
    ┌──────────────────┼──────────────────┐
    │                  │                  │
(Foundation)  ┌──────────────────────────┐  (Extension)
groupby()     │ Multiple Grouped Summaries │  Grouping by Multiple Columns
Method        └──────────────────────────┘
```

### Parent Concept

This technique is a direct extension of calculating [[Python - Grouped Summary Statistics|grouped summary statistics]], moving from a single calculation per group to multiple calculations.

### Child Concepts



### Related Concepts 

- The entire process is built upon the [[Python - DataFrame groupby() Method|DataFrame groupby() method]], which is the foundational step for creating the groups to be aggregated.
- This method can be combined with [[Python - Grouping by Multiple Columns|grouping by multiple columns]] to generate multi-level summary reports.
- It represents a highly efficient alternative to [[Python - Manual Subsetting vs groupby() for Aggregation|manual subsetting and aggregation]], which would require looping and is much more verbose and slower.
## Questions

- You're analyzing customer transaction data grouped by region. You can quickly calculate `mean`, `median`, and `sum` of transaction values. However, calculating a custom `percentile_95` function is 10x slower. When would you include the slower, custom metric in a dashboard for regional managers, and how would you justify the potential performance hit versus the business insight it provides?
- Imagine this aggregation is part of an hourly data pipeline processing millions of records. If the number of groups (e.g., new product categories) suddenly increases by 1000x, what is the most likely bottleneck in this `.groupby().agg()` step, and how would you re-architect the pipeline to handle this scale?
- What if the `.agg()` method was limited to only accepting a single function at a time? How would you replicate the functionality of `df.groupby('col1')['col2'].agg(['min', 'max', 'mean'])` in the most performant way possible without using `.agg()` with a list?