---
tags: 
  - core
  - python
  - pandas
  - dataframe
  - eda
  - data_summary
  - data_types
  - concept
source: 
  - "[[Data Manipulation with pandas]]"
related: 
  - "[[Python - Exploratory Data Analysis with Pandas]]"
  - "[[Python - Pandas DataFrame]]"
  - "[[Python - DataFrame.head() Method]]"
  - "[[Python - DataFrame.shape Attribute]]"
  - "[[Python - DataFrame.describe() Method]]"
  - "[[Python - DataFrame.values Attribute]]"
  - "[[Python - DataFrame.columns Attribute]]"
  - "[[Python - DataFrame.index Attribute]]"
  - "[[Python - DataFrame Data Type Constraints]]"
  - "[[Python - Data Types]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - Pandas Package]]"
  - "[[Python - Rectangular (Tabular) Data]]"
  - "[[Python - Pandas, NumPy & Matplotlib Relationship]]"
  - "[[Python - DataFrame Components]]"
---
# Core: DataFrame.info() Method

## Summary

>The `.info()` method in the pandas library is a fundamental tool for [[Python - Exploratory Data Analysis with Pandas|exploratory data analysis]]. It prints a concise summary of a [[Python - DataFrame Definition|DataFrame]], including the index dtype and columns, non-null values, and memory usage. This is often one of the very first commands run after loading data, alongside `[[Python - DataFrame.head() Method|.head()]]` and `[[Python - DataFrame.shape Attribute|.shape]]`.

**Why This Matters:** It provides a crucial first-look "ID card" for your dataset, immediately revealing its structure, data types, and potential missing value problems, which is the foundation of any reliable data analysis.

_Analogy:_ _Think of the `.info()` method as the "Table of Contents and Index" combined for a book. It doesn't give you the story (the actual data values), but it tells you the book's structure: the chapter titles (column names), how many pages are in each chapter (non-null counts), what language each chapter is written in (data types), and the total page count (number of entries)._

**Where it breaks down:** A book's table of contents is static. The output of `.info()` is a dynamic summary of the DataFrame's current state. If you add a chapter (column) or tear out pages (drop rows), re-running `.info()` will show the new, updated structure.

```
```
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 7 entries, 0 to 6         <-- Total number of rows
Data columns (total 6 columns):
 #   Column         Non-Null Count  Dtype   <-- Column-by-column breakdown
---  ------         --------------  -----
 0   name           7 non-null      object  <-- No missing values, text data
 1   breed          7 non-null      object
 2   color          7 non-null      object
 3   height_cm      7 non-null      int64   <-- No missing values, integer data
 4   weight_kg      7 non-null      int64
 5   date_of_birth  7 non-null      object
dtypes: int64(2), object(4)          <-- Summary of data types used
memory usage: 464.0+ bytes           <-- How much memory the DataFrame uses
```
```

## Details

The `.info()` method is a core function within the [[Python - Pandas Package|pandas]] library, designed for initial [[Python - Exploratory Data Analysis with Pandas|Exploratory Data Analysis (EDA)]]. It provides a high-level technical summary of a [[Python - DataFrame Definition|DataFrame]]. By calling this single method, you can quickly assess the dataset's size, identify columns with missing data (by comparing the 'Non-Null Count' to the total number of entries), and check if each column has the correct data type (e.g., numbers stored as `int64`, text as `object`), which is a key aspect of [[Python - DataFrame Data Type Constraints|enforcing data type constraints]].

#### Primary Goal

To provide a quick, readable summary of a DataFrame's structure, including column data types, non-null counts, and memory usage, to facilitate initial data quality checks.

#### Mechanism

- **Step 1: Load Data**
    - First, import the pandas library and load your data into a DataFrame.
- **Step 2: Call the Method**
    - Access the `.info()` method directly on your DataFrame object.
- **Step 3: Interpret the Output**
    - Analyze the printed summary, paying close attention to the 'Non-Null Count' for each column to spot missing values and the 'Dtype' to verify data types.

##### Code Translation

```python
import pandas as pd
import io

# --- Step 1: Load Data ---
# Create a sample dataset with missing values
data = """name,breed,height_cm,weight_kg
Bella,Labrador,56,25
Charlie,Poodle,43,
Lucy,Chow Chow,48,23
Cooper,Labrador,,29
"""
dogs = pd.read_csv(io.StringIO(data))

# --- Step 2: Call the Method ---
# Get a summary of the DataFrame's structure
print("--- DataFrame.info() Output ---")
dogs.info()

# --- Step 3: Interpret the Output ---
# From the output, we can see:
# - There are 4 entries (rows).
# - 'weight_kg' has 3 non-null values (1 missing).
# - 'height_cm' has 3 non-null values (1 missing).
# - 'height_cm' and 'weight_kg' are float64, others are object.
```

 [[Code - DataFrame.info() Method Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`verbose`**: If `True` (default), prints the full summary. If `False`, prints a shorter summary (omitting column-level details).
- **`memory_usage`**: Can be `True`, `False`, or `'deep'`. If `'deep'`, it introspects the data deeply to calculate the true memory usage, which is more accurate for `object` columns but slower.
- **`show_counts`**: If `True` (default), shows the non-null counts for each column. Set to `False` to hide this information.

#### Core Trade-offs

- **Pro**: Provides a dense, multi-faceted summary (dimensions, nulls, dtypes, memory) in a single command, making it extremely efficient for initial EDA.
- **Con**: For DataFrames with a very large number of columns, the output can be truncated or overwhelming. In these cases, using individual attributes like `df.shape`, `df.dtypes`, or `df.isnull().sum()` might be more targeted.
- **Con**: It only shows metadata about the data, not the data itself. It must be used in conjunction with methods like `[[Python - DataFrame.head() Method|.head()]]` to get a complete picture.

## Connections

```
```
                           (Parent)
             Exploratory Data Analysis with Pandas
                              ▲
                              │
┌─────────────────────────────┼─────────────────────────────┐
│                             │                             │
(Shows Data)             ┌──────────────────┐             (Shows Stats)
.head()                  │ DataFrame.info() │             .describe()
                         └──────────────────┘
                              │
                              │
(Shows Dimensions) ─────── .shape Attribute ──────── (Shows Dtypes)
                                                  .dtypes Attribute
```
```

### Parent Concept

The `.info()` method is a primary tool used in [[Python - Exploratory Data Analysis with Pandas|exploratory data analysis with Pandas]].

### Child Concepts



### Related Concepts 

- It provides a more detailed summary than the `[[Python - DataFrame.shape Attribute|.shape]]` attribute, which only gives the dimensions.
- It complements the `[[Python - DataFrame.head() Method|.head()]]` method, which shows the actual data values but not the metadata like data types or null counts.
- It contrasts with the `[[Python - DataFrame.describe() Method|.describe()]]` method, which provides a statistical summary for numeric columns rather than a structural one.
- The 'Dtype' information it provides is crucial for understanding and enforcing `[[Python - DataFrame Data Type Constraints|data type constraints]]` within your dataset.
## Questions

- The memory usage reported by `.info()` for 'object' columns can be misleadingly low. How would you explain the significance of using the `memory_usage='deep'` parameter to a project manager concerned about cloud computing costs, and what actions might you take if you discover 'object' columns are consuming far more memory than expected?
- In a real-time data ingestion pipeline, calling `.info()` on a rapidly growing DataFrame every few seconds is inefficient. How would you design a lightweight, periodic 'health check' system that captures the most critical information from `.info()` (e.g., schema changes, a sudden spike in nulls) without incurring its full performance cost?
- What if the `.info()` method was suddenly deprecated from pandas? What combination of other DataFrame attributes and methods would you chain together to create a custom function that perfectly replicates its output, including the index type, column list with non-null counts and dtypes, and total memory usage?