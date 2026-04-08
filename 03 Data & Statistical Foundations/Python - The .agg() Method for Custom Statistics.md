---
tags: 
  - core
  - python
  - pandas
  - aggregation
  - summary_statistics
  - custom_functions
  - dataframe
  - concept
source: 
  - "[[Data Manipulation with pandas]]"
related: 
  - "[[Python - Summary Statistics in pandas]]"
  - "[[Python - Common Summary Statistics in pandas]]"
  - "[[Python - Cumulative Statistics in pandas]]"
  - "[[Python - Pandas DataFrame]]"
  - "[[Python - GroupBy Operations]]"
  - "[[Python - User-Defined Functions]]"
  - "[[Python - NumPy Data Aggregation]]"
  - "[[Python - List Comprehensions]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Efficient Code]]"
  - "[[Python - Pandas Package]]"
  - "[[Python - DataFrame Indexing and Selection]]"
  - "[[Fundamental - Statistics]]"
  - "[[Python - Functions]]"
  - "[[Python - Lambda Functions]]"
---
# Core: Custom Aggregations with .agg()

## Summary

>The `.agg()` (or its alias `.aggregate()`) method in pandas is a powerful and flexible tool for applying one or more operations across specified columns of a DataFrame. While it can be used with simple string names for common aggregations like 'mean' or 'sum' (as covered in [[Python - Common Summary Statistics in pandas]]), its primary strength lies in its ability to apply user-defined functions. This allows for the calculation of completely custom summary statistics tailored to specific analytical needs.

**Why This Matters:** This method is crucial because it allows data analysts to move beyond standard metrics and calculate highly specific, business-relevant statistics that are not built into pandas.

_Analogy:_ _Think of `.agg()` as a custom measurement station at a quality control lab. A standard lab has pre-built tools like a ruler for length (`.mean()`) and a scale for weight (`.sum()`). The `.agg()` station is different; it's a workbench where you can bring your own, highly specialized instruments that you've designed yourself (your custom Python functions). For example, you might invent a device to measure the 'shininess' of the 30% dullest samples (a 30th percentile function). You can then use this single custom tool on a batch of steel rods (`one column`), or on both the steel rods and a set of glass plates (`multiple columns`). You can even set up a line of several of your custom tools and run each sample through all of them at once (`a list of functions`)._

**Where it breaks down:** The analogy implies the `.agg()` station helps you *build* the custom tool. In reality, you must build the tool (the Python function) completely separately. `.agg()` is merely the station that knows how to expertly *apply* your pre-built tool to the data you provide.

```
```
DataFrame: dogs
+-----------+-----------+
| weight_kg | height_cm |
+-----------+-----------+
|    22     |     45    |
|    26     |     50    |
|    ...    |    ...    |
+-----------+-----------+
        │
        └─── dogs['weight_kg'] ───► .agg(pct30) ───► Custom Function: pct30(column)
                                                           │
                                                           ▼
                                                    Returns: column.quantile(0.3)
                                                           │
                                                           ▼
                                                      Result: 22.599
```
```

## Details

The `.agg()` method in pandas provides a flexible way to compute custom summary statistics on DataFrame columns. While pandas offers many built-in aggregations like `.mean()` and `.median()`, as seen in [[Python - Common Summary Statistics in pandas]], `.agg()` allows you to define your own functions for more specific calculations. For example, as shown in the context, you can create a function to calculate a specific percentile, like the 30th percentile, and apply it to one or multiple columns. You can even apply a list of different custom functions at once, making it a highly versatile tool for data summarization.

#### Primary Goal

To apply one or more custom or built-in aggregation functions to one or more Series or DataFrame columns simultaneously.

#### Mechanism

- **Step 1: Define the Custom Function**
    - First, create a standard Python function. This function must accept a pandas Series (which is what a DataFrame column is) as its input and return a single summary value (e.g., a float or integer).
- **Step 2: Select Data**
    - Use standard pandas indexing to select the column (a Series) or columns (a DataFrame) you wish to analyze.
- **Step 3: Apply `.agg()`**
    - Call the `.agg()` method on your selected data. Pass the name of your custom function as the argument. To apply multiple functions at once, pass a list of the function names.

##### Code Translation

```python
import pandas as pd
import numpy as np

# Sample DataFrame similar to the context
data = {'name': ['Bella', 'Charlie', 'Lucy', 'Cooper', 'Max', 'Stella', 'Bernie', 'Rocky'],
        'weight_kg': [22, 26, 20, 29, 35, 18, 23, 25],
        'height_cm': [45, 50, 42, 55, 60, 40, 48, 52]}
dogs = pd.DataFrame(data)

# --- Step 1: Define the Custom Functions ---
# Function to compute the 30th percentile
def pct30(column):
  return column.quantile(0.3)

# Function to compute the 40th percentile
def pct40(column):
  return column.quantile(0.4)

# --- Step 2 & 3: Apply .agg() on a single column ---
# Select the 'weight_kg' column and apply the pct30 function
weight_pct30 = dogs['weight_kg'].agg(pct30)
print(f"30th percentile of weight:\n{weight_pct30}\n")

# --- Apply .agg() on multiple columns ---
# Select 'weight_kg' and 'height_cm' and apply pct30
multi_col_pct30 = dogs[['weight_kg', 'height_cm']].agg(pct30)
print(f"30th percentile of weight and height:\n{multi_col_pct30}\n")

# --- Apply multiple functions with .agg() ---
# Select 'weight_kg' and apply a list of functions
weight_multi_pct = dogs['weight_kg'].agg([pct30, pct40])
print(f"30th and 40th percentiles of weight:\n{weight_multi_pct}")
```

 [[Code - Custom Aggregations with .agg() Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`func`**: The primary argument that specifies the aggregation(s) to perform. It can be passed in several formats:
    - **Single Function:** Pass the function object directly (e.g., `df.agg(pct30)`).
    - **String Name:** Pass the string name of a common function (e.g., `df.agg('sum')`).
    - **List of Functions:** Pass a list of function objects and/or strings to compute multiple aggregations (e.g., `df.agg([pct30, 'mean'])`).
    - **Dictionary:** Pass a dictionary where keys are column names and values are the functions to apply to that specific column (e.g., `df.agg({'weight_kg': 'mean', 'height_cm': pct30})`).

#### Core Trade-offs

- **Pro: Unmatched Flexibility**
    - Its greatest strength is the ability to apply any conceivable function that can operate on a Series, going far beyond standard metrics. This is essential for calculating domain-specific KPIs or custom statistical measures.
- **Con: Potential Performance Cost**
    - Custom Python functions passed to `.agg()` are executed in Python and may not be as performant as the built-in, C-optimized aggregation methods (like `.sum()`, `.mean()`). For very large datasets, this performance difference can be significant.

## Connections

```
```
                           (Parent)
                 Summary Statistics in pandas
                              ▲
                              │
┌─────────────────────────────┼─────────────────────────────┐
│                             │                             │
(Related)              ┌───────────────────────────────┐             (Related)
Common Summary Stats   │ Custom Aggregations with .agg() │        Cumulative Statistics
                       └───────────────────────────────┘
```
```

### Parent Concept

This concept is a specific implementation within the broader topic of [[Python - Summary Statistics in pandas|calculating summary statistics in pandas]], providing maximum flexibility for custom calculations.

### Child Concepts



### Related Concepts 

- It provides a more flexible alternative to the methods described in [[Python - Common Summary Statistics in pandas]], which cover optimized, built-in functions.
- Unlike the methods in [[Python - Cumulative Statistics in pandas]] which calculate running totals or products, `.agg()` computes a single summary value for each group or column.
- The functionality of `.agg()` is often applied to real-world data, such as the [[Python - Walmart Sales Dataset Context|Walmart sales data]], to calculate custom business metrics.
## Questions

- Imagine you're analyzing customer transaction data. The business wants a 'typical purchase value' metric. You could use the mean (fast, built-in) or a custom 20% trimmed mean (slower, requires `.agg()`) to exclude outlier purchases. How would you decide which to use, and how would you explain the potential value of the slower, custom metric to a product manager?
- You've built a data processing pipeline that uses a complex, user-defined function within `.agg()` to calculate a fraud score for batches of 10 million transactions. What performance bottlenecks might you encounter, and how would you refactor your approach if the `.agg()` step becomes too slow for the required processing time?
- What if the `.agg()` method was removed from pandas, but the `.apply()` method still existed? How could you replicate the functionality of applying a list of two different summary functions to a list of three different columns, and what would be the primary drawback of your solution compared to using `.agg()`?