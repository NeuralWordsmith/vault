---
tags: 
  - core
  - python
  - aggfunc
  - aggregation
  - summary_statistic
  - pandas
  - pivot_table
  - concept
source: 
  - "[[Data Manipulation with pandas]]"
related: 
  - "[[Python - Pivot Tables]]"
  - "[[Python - Pandas DataFrame]]"
  - "[[Python - NumPy Data Aggregation]]"
  - "[[Python - Pivot Table Basic Usage (index, values)]]"
  - "[[Python - Pivot Table Multi-Level Grouping (columns)]]"
  - "[[Python - Handling Missing Values in Pivot Tables (fill_value)]]"
  - "[[Python - Calculating Margins in Pivot Tables (margins)]]"
  - "[[Fundamental - Statistics]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Lists]]"
  - "[[Python - Functions]]"
  - "[[Python - NumPy (Numeric Python)]]"
---
# Core: Pivot Table Custom Aggregation (aggfunc)

## Summary

>The `aggfunc` parameter in pandas' `pivot_table` method is the control knob for specifying which summary statistic to calculate. While the default is the mean, `aggfunc` allows you to apply any other function—like median, sum, or even multiple functions at once—to aggregate your data.

**Why This Matters:** Using `aggfunc` moves you beyond default averages, allowing you to tailor data summaries to the specific questions you need to answer, such as finding the most common category (mode) or a robust central point (median).

_Analogy:_ _Think of `aggfunc` as placing a custom order at a smoothie shop. The `index` is your name ('Chris'), and the `values` are the fruits you've chosen ('banana', 'strawberry'). The default `pivot_table` just blends them into a standard mix (the `mean`). Using `aggfunc='median'` is like asking the barista to find the single fruit that represents the 'middle' flavor profile. Using `aggfunc=['mean', 'sum']` is like asking for two separate things: the standard blend, and also a report on the total amount of fruit used._

**Where it breaks down:** The analogy is limited because the smoothie shop creates new products from ingredients. In pandas, `aggfunc` applies mathematical operations to a set of existing numbers; it doesn't create a fundamentally new 'thing' but rather calculates a descriptive statistic about the existing data.

```
DataFrame ────> pivot_table(index, values)
                     │
                     ├─ No aggfunc ──> Default Summary (Mean)
                     │
                     ├─ aggfunc='median' ──> Single Custom Summary (Median)
                     │
                     └─ aggfunc=['mean', 'std'] ──> Multi-Statistic Summary
```

## Details

By default, a [[Python - Pivot Tables|pivot table]] summarizes data by calculating the average, but this is not always the most insightful metric. The `aggfunc` parameter provides the essential flexibility to change this calculation. You can specify a different single statistic, such as the median for a more robust measure of central tendency, or even request multiple statistics simultaneously by passing a list of functions, like `['mean', 'median']`, to get a richer summary in a single view.

#### Primary Goal

To customize the aggregation logic within a pivot table to compute one or more specific summary statistics beyond the default mean.

#### Mechanism

- **Step 1: Define the Basic Pivot Structure**
    - Start by creating a standard pivot table, specifying the `index` to group by and the `values` column to be aggregated. Without `aggfunc`, this will calculate the mean.
- **Step 2: Apply a Single Custom Statistic**
    - To change the summary calculation, add the `aggfunc` argument and pass the name of the desired function as a string. For example, `aggfunc='median'` will compute the median for each group.
- **Step 3: Apply Multiple Statistics**
    - To get several summary statistics at once, pass a list of function names to `aggfunc`. For instance, `aggfunc=['mean', 'median']` will create a pivot table with columns for both the mean and the median of the values for each group.

##### Code Translation

```python
import pandas as pd
import numpy as np

# --- Sample Data ---
data = {'color': ['Black', 'Brown', 'Black', 'White', 'Brown', 'Tan'],
        'weight_kg': [28, 24, 25, 74, 24, 2]}
dogs = pd.DataFrame(data)

# --- Step 1 & 2: Apply a single custom function ---
# Here, we calculate the median weight for each dog color.
median_weight = dogs.pivot_table(values='weight_kg', index='color', aggfunc='median')
print("--- Median Weight by Color ---")
print(median_weight)

# --- Step 3: Apply multiple functions ---
# Here, we get both the mean and median weight for each color.
multi_stats = dogs.pivot_table(values='weight_kg', index='color', aggfunc=['mean', 'median'])
print("\n--- Mean and Median Weight by Color ---")
print(multi_stats)
```

 [[Code - Pivot Table Custom Aggregation (aggfunc) Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`aggfunc`**: The core parameter that defines the aggregation function(s). It is highly flexible and can accept several types of input:
    - **String**: The name of a common aggregation function, such as `'mean'`, `'median'`, `'sum'`, `'count'`, `'min'`, `'max'`, or `'std'`.
    - **List**: A list of strings or functions to compute multiple aggregations at once (e.g., `['sum', 'mean']`). This results in a DataFrame with hierarchical columns.
    - **Function**: A specific function object, like `np.median` or a custom-defined `lambda` function, for more complex or non-standard aggregations.
    - **Dictionary**: Used to apply different aggregation functions to different columns when multiple `values` are specified. (e.g., `aggfunc={'weight_kg': 'mean', 'height_cm': 'median'}`).

#### Core Trade-offs

- **Clarity vs. Information Density**: Requesting multiple statistics (e.g., `aggfunc=['mean', 'median', 'std']`) creates a wider, more complex DataFrame with multi-level columns. This is information-rich but can be harder to read and parse than several simpler tables.
- **Performance**: Using built-in aggregation functions specified by strings (e.g., `'mean'`) is highly optimized in pandas. Conversely, passing custom Python functions or lambdas can be significantly slower, especially on large datasets, as they may not leverage the underlying C-speed optimizations.

## Connections

```
                      (Parent)
                 Python - Pivot Tables
                         ▲
                         │
           ┌─────────────┼─────────────┐
           │             │             │
(Foundation)  ┌──────────────────────────────────────────┐  (Works With)
Basic Usage   │ Pivot Table Custom Aggregation (aggfunc) │  Multi-Level Grouping
              └──────────────────────────────────────────┘
                         │
                         │
                   (Considers)
      Handling Missing Values in Pivot Tables
```

### Parent Concept

This concept is a key parameter within the broader functionality of [[Python - Pivot Tables|pivot tables]], which are used to create spreadsheet-style summaries of data.

### Child Concepts



### Related Concepts 

- [[Python - Pivot Table Basic Usage (index, values)|Basic pivot table usage]] establishes the foundational structure of rows and values that `aggfunc` then operates on.
- The `aggfunc` parameter works in conjunction with [[Python - Pivot Table Multi-Level Grouping (columns)|multi-level grouping]] to create highly detailed summary tables with multiple statistics across different categories.
- The choice of aggregation function is often influenced by [[Python - Handling Missing Values in Pivot Tables (fill_value)|how missing values are handled]], as `NaN`s can affect calculations like mean and count.
- The results generated by `aggfunc` can be further summarized by enabling [[Python - Calculating Margins in Pivot Tables (margins)|margins]] to see overall totals for each statistic.
## Questions

- You're analyzing customer transaction data for an e-commerce site. Management wants a single dashboard view. Would you use `aggfunc` to show mean, median, sum, and count for transaction amounts per region, creating one wide, dense table? Or would you create four separate, simpler tables? Justify your choice based on the trade-off between information density and stakeholder readability.
- Imagine a real-time dashboard that pivots a massive, streaming dataset every minute. Using a complex custom Python function in `aggfunc` is causing a performance bottleneck. What strategies would you employ to optimize this aggregation step without sacrificing the custom logic? Consider vectorization, pre-aggregation, or alternative libraries.
- What if the `aggfunc` parameter was completely removed from the `pivot_table` method? How would you replicate the functionality of calculating both the mean and the 95th percentile for 'sales' grouped by 'product_category' and 'region' using only other pandas methods like `groupby`, `agg`, and `unstack`?