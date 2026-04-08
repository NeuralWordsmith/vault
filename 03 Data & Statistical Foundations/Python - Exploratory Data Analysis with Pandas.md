---
tags: 
  - major_core
  - python
  - eda
  - data_exploration
  - data_profiling
  - initial_analysis
  - pandas
  - concept
source: 
  - "[[Data Manipulation with pandas]]"
related: 
  - "[[Python - Pandas Package]]"
  - "[[Python - DataFrame.head() Method]]"
  - "[[Python - DataFrame.info() Method]]"
  - "[[Python - DataFrame.shape Attribute]]"
  - "[[Python - DataFrame.describe() Method]]"
  - "[[Python - Pandas DataFrame]]"
  - "[[Fundamental - Statistics]]"
  - "[[Fundamental - Feature Engineering]]"
  - "[[Python - Rectangular (Tabular) Data]]"
  - "[[Python - Pandas, NumPy & Matplotlib Relationship]]"
  - "[[Python - DataFrame Components]]"
  - "[[Python - DataFrame.values Attribute]]"
  - "[[Python - DataFrame.columns Attribute]]"
  - "[[Python - DataFrame.index Attribute]]"
  - "[[Python - NumPy (Numeric Python)]]"
---
# Major Core: Exploratory Data Analysis with Pandas

## Summary

> Exploratory Data Analysis (EDA) is the process of using simple tools and methods to investigate a dataset for the first time. In Python, the pandas library is the primary tool for this, offering a suite of functions to quickly summarize a dataset's main characteristics. This initial 'reconnaissance' involves checking the data's shape, previewing its contents, understanding its data types, and calculating basic summary statistics using methods like `[[Python - DataFrame.head() Method|.head()]]`, `[[Python - DataFrame.info() Method|.info()]]`, `[[Python - DataFrame.shape Attribute|.shape]]`, and `[[Python - DataFrame.describe() Method|.describe()]]`.

**Why This Matters:** This is the crucial first step in any data analysis project, allowing you to understand your data's structure, quality, and underlying patterns before committing to complex modeling.

_Analogy:_ _Think of EDA as a detective arriving at a crime scene. Before collecting detailed forensic evidence, the detective does a quick walkthrough. They note the size of the room, see who is present, check for obvious signs of a struggle, and get a general 'feel' for the situation. This initial survey guides their entire subsequent investigation, helping them decide where to focus their efforts and what tools to use next._

In this analogy, the data scientist is the detective, the new dataset is the crime scene, and the initial EDA is the walkthrough. The detective's tools—like a notepad and magnifying glass—are the pandas methods (`.head()`, `.info()`, etc.). This initial look doesn't solve the crime, but it's an indispensable first step.

*   **Where it breaks down:** A detective's initial survey is often qualitative and based on intuition. While EDA involves some intuition, it is fundamentally a quantitative process that provides concrete, objective summaries of the data.

```
Raw Data File (e.g., .csv)
          │
          ▼
[ pandas.read_csv() ]
          │
          ▼
┌───────────────────┐
│  pandas DataFrame │
└───────────────────┘
          │
          ├───────────► .shape   ───> (rows, columns)
          │
          ├───────────► .head()  ───> First N rows
          │
          ├───────────► .info()  ───> Dtypes, non-null counts
          │
          └───────────► .describe()──> Statistical summary
```

## Details

When you first encounter a new dataset, you're faced with a collection of unknown values. The core idea of Exploratory Data Analysis (EDA) with pandas is to perform a systematic initial investigation to quickly orient yourself. It's a process of asking basic questions: How big is this data? What does it look like? What kinds of data does it contain? Are there missing pieces? This is the foundational step for working with `[[Python - Rectangular (Tabular) Data|tabular data]]` and is almost always performed on a `[[Python - DataFrame Definition|pandas DataFrame]]`.

#### Primary Goal

To rapidly gain a high-level understanding of a dataset's structure, content, and quality to inform the next steps of a data analysis or machine learning project.

#### Mechanism

- **Step 1: Load the Data**
    - The first step is always to load your data from a source (like a CSV file) into a pandas DataFrame, the primary data structure for this kind of work.
- **Step 2: Inspect Dimensions**
    - Use the `[[Python - DataFrame.shape Attribute|.shape]]` attribute to see how many rows and columns the dataset contains. This gives you an immediate sense of its scale.
- **Step 3: Preview the Data**
    - Use the `[[Python - DataFrame.head() Method|.head()]]` method to view the first few rows. This helps you verify that the data loaded correctly and see the column names and the format of the data in each column.
- **Step 4: Get a Technical Summary**
    - Use the `[[Python - DataFrame.info() Method|.info()]]` method to get a concise summary of the DataFrame. This is crucial for checking column data types and identifying the number of non-null values, which reveals missing data.
- **Step 5: Calculate Descriptive Statistics**
    - Use the `[[Python - DataFrame.describe() Method|.describe()]]` method to generate summary statistics (count, mean, standard deviation, min, max, quartiles) for the numerical columns. This helps you spot outliers and understand the distribution of your data.

```python
import pandas as pd
import numpy as np

# --- Step 1: Create and Load a Sample DataFrame ---
# In a real scenario, you would use pd.read_csv('your_file.csv')
data = {
    'age': [25, 30, np.nan, 45, 22],
    'city': ['New York', 'London', 'Paris', 'Tokyo', 'New York'],
    'salary': [70000, 80000, 65000, 90000, 68000]
}
df = pd.DataFrame(data)

print("--- Initial DataFrame ---")
print(df)

# --- Step 2: Inspect Dimensions ---
print("\n--- Step 2: Shape ---")
print(f"The dataset has {df.shape[0]} rows and {df.shape[1]} columns.")

# --- Step 3: Preview the Data ---
print("\n--- Step 3: Head ---")
print(df.head(3)) # Show the first 3 rows

# --- Step 4: Get a Technical Summary ---
print("\n--- Step 4: Info ---")
df.info()

# --- Step 5: Calculate Descriptive Statistics ---
print("\n--- Step 5: Describe ---")
print(df.describe())

```

 [[Code - Exploratory Data Analysis with Pandas Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`.head(n)` / `.tail(n)`**
    - The integer `n` allows you to specify the exact number of rows you want to see from the beginning or end of the DataFrame. The default is 5.
- **`.describe(include, exclude)`**
    - By default, `.describe()` only works on numeric columns. You can use `include=['object']` to get summaries for categorical columns (count, unique, top, freq) or `include='all'` to see summaries for all columns.
- **`.info(verbose, memory_usage)`**
    - The `verbose=True` (default) prints the full summary. `verbose=False` prints a more compact version. `memory_usage='deep'` provides a more accurate memory usage calculation.

#### Core Trade-offs

- **Surface-Level Insights Only**
    - These initial EDA methods are designed for speed and high-level summaries. They will not reveal complex, multivariate relationships or subtle patterns in the data. They are a starting point, not a complete analysis.
- **Risk of Misinterpretation**
    - Summary statistics can be misleading. For example, `.describe()` might show a reasonable mean and standard deviation, but this could hide a bimodal distribution or the presence of distinct subgroups within the data. Anscombe's quartet is a famous example of this.
- **Scalability Issues on Large Datasets**
    - Methods like `.info()` and `.describe()` need to scan the entire dataset. On very large datasets that don't fit in memory, these operations can be slow or impossible to run directly without strategies like sampling or chunking.

## Connections

```
                      (Parent)
               Python - Pandas Package
                         ▲
                         │
┌────────────────────────┼───────────────────────────┐
│                        │                           │
(Uses)         ┌───────────────────────────────────┐      (Foundation For)
Pandas DataFrame │ Exploratory Data Analysis with Pandas │      Feature Engineering
               └───────────────────────────────────┘
                         │
           ┌─────────────┴─────────────┐
           │             │             │
.head() Method    .info() Method    .shape Attribute ... (and others)
```

### Parent Concept

This entire process is a primary application of the [[Python - Pandas Package|pandas package]], which is the de facto standard for data manipulation in Python.

### Child Concepts

- A key tool for this is the [[Python - DataFrame.head() Method|.head() method]], used to quickly preview the first few rows of the data.
- The [[Python - DataFrame.info() Method|.info() method]] provides a crucial technical summary, including data types and null value counts.
- The [[Python - DataFrame.shape Attribute|.shape attribute]] is used to get the dimensions (rows and columns) of the dataset instantly.
- The [[Python - DataFrame.describe() Method|.describe() method]] is essential for generating descriptive statistics for the numerical columns.

### Related Concepts 

- The fundamental object used throughout this process is the [[Python - Pandas DataFrame|pandas DataFrame]], which holds the data in a structured, tabular format.
- This initial exploration is a prerequisite for more advanced tasks like [[Fundamental - Feature Engineering|feature engineering]], where you create new variables from existing ones.
- The efficiency of pandas is built upon NumPy, and understanding the [[Python - Pandas, NumPy & Matplotlib Relationship|relationship between pandas and NumPy]] is key to effective data analysis.
- While pandas is the tool, the principles of EDA are rooted in [[Fundamental - Statistics|fundamental statistics]], which provides the theoretical basis for interpreting the results of methods like `.describe()`.
## Questions

- You have 30 minutes to explore a new, massive dataset for a stakeholder who wants to know if it's 'good enough' for a new fraud detection project. Which EDA methods would you prioritize and what key findings (e.g., missing values, strange distributions) would you look for to give a confident 'go/no-go' recommendation?
- If you're given a dataset that's too large to fit into memory (e.g., 500GB), how would your initial EDA strategy change? What tools or pandas parameters (like `chunksize` in `read_csv`) would you use to get a representative sense of the data without loading it all at once?
- What if you were forbidden from using `.describe()` or `.info()`? What sequence of other pandas operations could you chain together to manually recreate the most critical information provided by these two methods?
