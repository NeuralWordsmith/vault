---
tags: 
  - core
  - python
  - pandas
  - dataframe
  - data_inspection
  - missing_values
  - data_types
  - concept
source: 
  - "[[Cleaning Data in Python]]"
related: 
  - "[[Python - Identifying Data Types with .dtypes]]"
  - "[[DataEng - Dirty Data]]"
  - "[[Python - Type Casting with .astype()]]"
  - "[[DataEng - Data Science Workflow]]"
  - "[[Python - Data Type Constraints]]"
  - "[[Python - Verifying Data with assert]]"
  - "[[Python - Categorical Data]]"
  - "[[Python - Converting to Categorical Type]]"
  - "[[Python - Stripping Characters with .str.strip()]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[NumPy - Exploratory Data Analysis with NumPy]]"
  - "[[Python - Handling Missing Data]]"
  - "[[Python - Pandas DataFrames]]"
  - "[[Python - Pandas Series]]"
---
# Core: Checking DataFrame Info with .info()

## Summary

>The `.info()` method in the pandas library is a fundamental tool for exploratory data analysis. It provides a concise, high-level summary of a DataFrame, including the number of entries, the number of columns, the data type of each column, the count of non-null values, and the memory usage. It's one of the very first commands run in any [[DataEng - Data Science Workflow|data science workflow]] to get a quick assessment of the data's structure and to begin identifying potential [[DataEng - Dirty Data|dirty data]].

**Why This Matters:** This method is the single most important first step in data analysis, providing an instant health check that reveals a dataset's structure, size, and potential quality issues like missing data.

_Analogy:_ _Using `.info()` on a DataFrame is like looking at the dashboard of a car you're about to drive for the first time. The dashboard gives you a quick summary of the car's vital statistics: the odometer shows the total mileage (number of rows), the fuel gauge shows how much gas is in the tank (non-null values), the speedometer and tachometer show the engine's potential (column data types), and the 'check engine' light might indicate a problem (unexpected nulls or wrong dtypes)._

**Where it breaks down:** The car's dashboard tells you *that* the fuel is low, but it doesn't tell you *why* it's low or where the nearest gas station is. Similarly, `.info()` will show you that a column has missing values, but it won't tell you the reason they are missing or what the best strategy is for handling them.

```
Output of `df.info()`:

<class 'pandas.core.frame.DataFrame'>
RangeIndex: 5 entries, 0 to 4
Data columns (total 4 columns):
 #   Column       Non-Null Count  Dtype  
---  ------       --------------  -----  
 0   user_id      5 non-null      int64  
 1   age          4 non-null      float64  <-- Missing value detected
 2   plan_type    5 non-null      object 
 3   is_active    4 non-null      object   <-- Missing value & wrong Dtype

dtypes: float64(1), int64(1), object(2)
memory usage: 176.0+ bytes
```

## Details

In data analysis, you can't work with data you don't understand. The `.info()` method is a pandas DataFrame function designed to be the first line of inquiry. It answers critical initial questions: How many rows and columns am I dealing with? What kind of information does each column contain (numbers, text, dates)? Are there any missing pieces of information? How much memory is this dataset occupying? It provides a more comprehensive overview than just checking [[Python - Identifying Data Types with .dtypes|.dtypes]] alone, as it includes null counts and memory usage, making it an indispensable diagnostic tool.

#### Primary Goal

To get a quick, comprehensive summary of a DataFrame's structure, data types, and completeness (non-null counts) in a single command.

#### Mechanism

- **Step 1: Import Libraries and Prepare Data**
    - First, import the necessary libraries (pandas and numpy) and create or load a DataFrame. For this example, we'll create one with various data types and some missing values (`np.nan`).
- **Step 2: Call the `.info()` Method**
    - Simply call the method on the DataFrame object using dot notation. No arguments are needed for a standard summary.
- **Step 3: Interpret the Output**
    - The output provides several key pieces of information:
    - **RangeIndex:** Shows the number of rows (e.g., '5 entries, 0 to 4').
    - **Data columns:** Shows the total number of columns.
    - **Column List:** Each row details a column's name, its count of 'Non-Null' values, and its 'Dtype' (data type). A discrepancy between the total entries and the non-null count indicates missing data.
    - **dtypes:** A summary count of each data type present in the DataFrame.
    - **memory usage:** An estimate of the memory the DataFrame occupies.

##### Code Translation

```python
# --- Step 1: Import Libraries and Prepare Data ---
import pandas as pd
import numpy as np

data = {'user_id': [101, 102, 103, 104, 105],
        'age': [25, 32, np.nan, 45, 28],
        'plan_type': ['basic', 'premium', 'basic', 'premium', 'family'],
        'is_active': [True, False, True, True, np.nan]}

df = pd.DataFrame(data)

# --- Step 2: Call the .info() Method ---
print("--- DataFrame Info ---")
df.info()

# --- Step 3: Interpretation ---
# The output shows:
# - 5 total entries (rows 0 to 4).
# - 4 total columns.
# - The 'age' column has only 4 non-null values (1 missing).
# - The 'is_active' column has only 4 non-null values (1 missing).
# - 'is_active' is an 'object' type because of the mix of booleans and np.nan.
#   This is a common issue that .info() helps spot immediately.
```

 [[Code - Checking DataFrame Info with .info() Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`verbose`**: A boolean. If `True` (the default), it prints the full summary. If `False`, it prints a shorter summary (index type, columns, dtypes, memory usage) without the per-column null counts.
- **`show_counts`**: A boolean, `True` by default. Controls whether the non-null counts are shown. Setting it to `False` can be useful for a very quick type-check on wide DataFrames.
- **`memory_usage`**: Can be `True`, `False`, or `'deep'`. If `'deep'`, it introspects the data deeply to calculate the true memory usage, which is more accurate for `object` columns but can be slow.

#### Core Trade-offs

- **Pro: Speed and Convenience**
    - It provides a wealth of essential information with a single, simple command, making it extremely efficient for initial data exploration.
- **Pro: Early Problem Detection**
    - It immediately flags two of the most common data quality issues: missing values (via non-null counts) and incorrect data types (e.g., numbers stored as text/`object`).
- **Con: Summary-Level Information Only**
    - It tells you *how many* values are missing, but not *where* they are or *why*. It doesn't provide any statistical information like mean, median, or standard deviation.
- **Con: Truncation on Wide DataFrames**
    - By default, if a DataFrame has many columns, the output will be truncated to save space. The `verbose=True` parameter is needed to see the full list.

## Connections

```
                      (Parent)
           Python - Exploratory Data Analysis
                         ▲
                         │
          ┌──────────────┼────────────────┐
          │              │                │
(More Focused)   ┌──────────────────┐   (Next Step)
  .dtypes        │  .info() Method  │   .astype()
                 └──────────────────┘
                         │
                         │
                   (Identifies)
                 Dirty Data
```

### Parent Concept

The `.info()` method is a core component of [[Python - Exploratory Data Analysis with Pandas|exploratory data analysis in pandas]], serving as the primary tool for initial data inspection.

### Child Concepts



### Related Concepts 

- The `.info()` method provides a more comprehensive summary than [[Python - Identifying Data Types with .dtypes|.dtypes]], which only lists the data type for each column.
- Problems identified by `.info()`, such as an incorrect `object` type for a numeric column, are typically fixed using [[Python - Type Casting with .astype()|.astype()]].
- The presence of missing values, first spotted with `.info()`, is a key characteristic of [[DataEng - Dirty Data|dirty data]].
- Using `.info()` is a foundational step in the data understanding phase of the [[DataEng - Data Science Workflow|data science workflow]].
## Questions

- You've run `.info()` on a critical customer dataset and found that a 'last_purchase_date' column, crucial for a churn prediction model, is an `object` type with 30% missing values. How do you explain the business risk of this to a product manager, and what's your proposed trade-off between dropping the dirty data vs. investing time in cleaning and imputation?
- Imagine a data pipeline that ingests 100GB of data daily into a pandas DataFrame. Calling `.info()` directly might be slow or memory-intensive. How would you design an automated 'health check' system that provides a similar summary (column types, null counts) without loading the entire dataset into memory at once?
- What if the `.info()` method was removed from pandas? What combination of other pandas methods would you chain together to replicate its exact output, and what are the performance implications of your custom solution compared to the original optimized method?