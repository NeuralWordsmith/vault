---
tags: 
  - core
  - python
  - summary_statistics
  - eda
  - data_profiling
  - pandas
  - dataframe_method
  - concept
source: 
  - "[[Data Manipulation with pandas]]"
related: 
  - "[[Python - Exploratory Data Analysis with Pandas]]"
  - "[[Python - Pandas DataFrame]]"
  - "[[Python - DataFrame.head() Method]]"
  - "[[Python - DataFrame.info() Method]]"
  - "[[Python - DataFrame.shape Attribute]]"
  - "[[Python - DataFrame.columns Attribute]]"
  - "[[Python - DataFrame.index Attribute]]"
  - "[[Python - DataFrame.values Attribute]]"
  - "[[Python - NumPy Data Aggregation]]"
  - "[[Fundamental - Statistics]]"
  - "[[Python - Pandas Package]]"
  - "[[Python - Histogram]]"
  - "[[Python - Matplotlib Library]]"
  - "[[Python - DataFrame Indexing and Selection]]"
  - "[[Python - Rectangular (Tabular) Data]]"
---
# Core: DataFrame.describe() Method

## Summary

>The `.describe()` method in pandas is a powerful tool used during [[Python - Exploratory Data Analysis with Pandas|Exploratory Data Analysis (EDA)]] to generate descriptive statistics for the numerical columns of a DataFrame. It provides a quick summary that includes count, mean, standard deviation, min/max values, and quartiles, offering a high-level understanding of the data's distribution and central tendency.

**Why This Matters:** This method provides an instant statistical health check for your numerical data, immediately revealing potential issues like outliers, scale differences, or missing values without manual calculation.

_Analogy:_ _Using `.describe()` on a DataFrame is like getting a "vitals report" from a doctor for a new patient. The report doesn't tell the full story of the patient's health, but it gives you critical numbers at a glance—heart rate, blood pressure, temperature, etc.—allowing you to quickly spot anything unusual that needs further investigation._

The components are:
- **DataFrame:** The patient.
- **Numerical Columns (e.g., 'age', 'weight'):** The specific vital signs being measured.
- **`.describe()` method:** The nurse or machine taking the vitals.
- **Output Table (mean, std, min, max):** The vitals report itself.
- **Where it breaks down:** A vitals report is purely quantitative. It won't tell you about the patient's mood, allergies, or medical history (equivalent to non-numeric data or the context behind the numbers), which often require different diagnostic tools.

```
    +--------------------------------+
    |      DataFrame 'dogs'          |
    |--------------------------------|
    |   | height_cm | weight_kg      |
    |---|-----------|----------------|
    | 0 |   49.7    |   27.4         |
    | 1 |   18.0    |   2.0          |
    | 2 |   ...     |   ...          |
    +--------------------------------+
                   |
                   | .describe()
                   ▼
    +--------------------------------+
    |      Summary Statistics        |
    |--------------------------------|
    |       | height_cm | weight_kg  |
    |-------|-----------|------------|
    | count |   7.0     |   7.0      |
    | mean  |  49.81... |  27.27...  |
    | std   |  17.96... |  22.28...  |
    | ...   |   ...     |   ...      |
    +--------------------------------+
```

## Details

The `.describe()` method is a cornerstone of initial data exploration in Python's pandas library. When you first load a dataset, you need a quick way to get a feel for the numerical variables. This method computes a set of summary statistics for each numerical column, such as the mean, median (50th percentile), and standard deviation. As seen in the example, it presents these statistics in a clean, tabular format, making it easy to compare the distributions of different columns and spot potential red flags like a standard deviation of zero (no variance) or a huge difference between the mean and median (skewness). It's often used alongside methods like [[Python - DataFrame.head() Method|head()]] and [[Python - DataFrame.info() Method|info()]] for a comprehensive first look.

#### Primary Goal

To provide a fast, high-level statistical summary of the numerical columns in a DataFrame to aid in initial data understanding and quality checks.

#### Mechanism

- **Step 1: Select Numerical Columns**
    - By default, `.describe()` automatically identifies and selects all columns in the DataFrame that have a numeric data type (e.g., int64, float64).
- **Step 2: Compute Summary Statistics**
    - For each selected column, it calculates a standard set of eight statistics: count (non-null values), mean, standard deviation (std), minimum (min), 25th percentile (lower quartile), 50th percentile (median), 75th percentile (upper quartile), and maximum (max).
- **Step 3: Format the Output**
    - The results are returned as a new pandas DataFrame, where the index contains the names of the statistics and the columns correspond to the original numerical columns from the input DataFrame.

##### Code Translation

```python
import pandas as pd

# --- Step 1: Create a DataFrame with numerical data ---
# Recreating the 'dogs' DataFrame from the image context
dogs_data = {
    'height_cm': [49.7, 18.0, 77.0, 44.5, 49.0, 57.5, 53.0],
    'weight_kg': [27.4, 2.0, 74.0, 19.5, 23.0, 27.0, 19.0]
}
dogs = pd.DataFrame(dogs_data)

# --- Step 2 & 3: Call .describe() to get the summary ---
# This single call performs the computation and formats the output.
summary_stats = dogs.describe()

print(summary_stats)

# Expected Output:
#        height_cm  weight_kg
# count   7.000000   7.000000
# mean   49.814286  27.271429
# std    17.963336  22.289398
# min    18.000000   2.000000
# 25%    46.750000  19.250000
# 50%    49.700000  23.000000
# 75%    55.250000  27.200000
# max    77.000000  74.000000
```

 [[Code - DataFrame.describe() Method Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`percentiles`**
    - A list-like object of numbers between 0 and 1 to specify which percentiles to include in the output. The default is `[.25, .5, .75]`, which correspond to the 25th, 50th (median), and 75th percentiles.
- **`include`**
    - A list of data types to be included in the result. To get a summary of all columns, you can use `include='all'`. This will show statistics like `unique`, `top`, and `freq` for object/categorical columns.
- **`exclude`**
    - A list of data types to be excluded from the result. By default, non-numeric types are excluded. You can use this to, for example, exclude floating-point numbers if you only want to see integers.

#### Core Trade-offs

- **Pro: Speed and Simplicity**
    - It provides a comprehensive statistical overview with a single line of code, making it extremely efficient for initial data exploration.
- **Con: Numeric-Only by Default**
    - By default, it ignores categorical and object columns. While you can force inclusion with `include='all'`, the statistics provided for non-numeric data (`unique`, `top`, `freq`) are different and less comprehensive.
- **Con: Can Mask Important Details**
    - Summary statistics can be misleading. For example, a dataset with a bimodal distribution (two peaks) might have a mean that falls in the valley between them, representing no actual data point. It doesn't show the shape of the distribution, which requires visualization tools like histograms.

## Connections

```
                           (Parent)
             Exploratory Data Analysis with Pandas
                              ▲
                              │
┌─────────────────────────────┼──────────────────────────────┐
│                             │                              │
(Quick Look)           ┌──────────────────────────┐          (Data Types)
DataFrame.head()       │ DataFrame.describe()     │          DataFrame.info()
                       └──────────────────────────┘
                              │
                              │
                          (Dimensions)
                       DataFrame.shape
```

### Parent Concept

The `.describe()` method is a fundamental tool within the broader process of [[Python - Exploratory Data Analysis with Pandas|Exploratory Data Analysis with Pandas]].

### Child Concepts



### Related Concepts 

- While `.describe()` provides a statistical summary, [[Python - DataFrame.head() Method|`.head()`]] offers a direct, raw glimpse at the first few rows of the data, which is useful for checking column names and data formats.
- It complements [[Python - DataFrame.info() Method|`.info()`]], which summarizes the technical aspects of the DataFrame like data types and non-null counts, whereas `.describe()` focuses on the statistical properties of the data itself.
- The `count` row in the `.describe()` output can be cross-referenced with the total number of entries from the [[Python - DataFrame.shape Attribute|`.shape` attribute]] to quickly calculate the number of missing values in each column.
## Questions

- The output of `.describe()` for a 'transaction_amount' column shows a mean of $100 but a max value of $5,000,000. How would this observation influence your data preprocessing strategy, and what business risk are you trying to mitigate by addressing it?
- Imagine you are building an automated data quality pipeline for a streaming dataset with millions of events per hour. Calling `.describe()` on the entire stream is not feasible. How would you design a system to provide near real-time summary statistics? What sampling strategies or approximate algorithms might you use?
- What if the `.describe()` method, in addition to the standard table, also returned a 'data quality score' from 0 to 1 for each column, based on its own internal heuristics (e.g., skewness, kurtosis, percentage of outliers)? What would be the biggest benefit and the most significant danger of relying on such an automated score?