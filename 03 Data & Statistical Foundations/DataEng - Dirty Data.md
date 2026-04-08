---
tags: 
  - core
  - python
  - data_quality
  - data_wrangling
  - data_munging
  - etl
  - preprocessing
  - concept
source: 
  - "[[Cleaning Data in Python]]"
related: 
  - "[[DataEng - Garbage In, Garbage Out (GIGO)]]"
  - "[[DataEng - Data Science Workflow]]"
  - "[[Python - Verifying Data with assert]]"
  - "[[Python - Type Casting with .astype()]]"
  - "[[Python - Stripping Characters with .str.strip()]]"
  - "[[Python - Converting String Columns to Numeric Process]]"
  - "[[Python - Inspecting DataFrame with .info()]]"
  - "[[Python - Identifying Data Types with .dtypes]]"
  - "[[Python - Data Type Constraints]]"
  - "[[Python - Categorical Data]]"
  - "[[Python - Converting to Categorical Type]]"
  - "[[Fundamental - Feature Engineering]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[NumPy - Exploratory Data Analysis with NumPy]]"
  - "[[Python - Pandas]]"
---
# Core: Data Cleaning

## Summary

>Data cleaning, also known as data cleansing or data wrangling, is the process of detecting and correcting (or removing) corrupt, inaccurate, or irrelevant records from a dataset. It addresses issues like duplicate values, mis-spellings, and data type errors that arise from sources like manual data entry or legacy systems. This is a critical step in the [[DataEng - Data Science Workflow|data science workflow]], as it directly upholds the principle that high-quality output requires high-quality input, preventing the [[DataEng - Garbage In, Garbage Out (GIGO)|'Garbage In, Garbage Out']] phenomenon.

**Why This Matters:** Data cleaning is the bedrock of reliable analysis; without it, even the most advanced models and reports will produce misleading or entirely incorrect results, leading to poor business decisions.

_Analogy:_ _Think of data cleaning as the 'mise en place' for a chef. Before a chef can cook a gourmet meal, they must first prepare the ingredients. They wash the vegetables, peel the potatoes, trim the fat from the meat, and measure out the spices. Attempting to cook with dirty, unprepared ingredients would result in a terrible, possibly inedible, final dish._

In this analogy:
- **Dirty Data** = Raw, unwashed, and unprepared ingredients.
- **The Data Cleaning Process** = The act of washing, peeling, chopping, and measuring.
- **Clean Data** = The neatly prepared ingredients, ready for cooking.
- **The Analysis/Model** = The final cooked meal.
- **The Insights/Report** = The taste and presentation of the meal.

**Where it breaks down:** Unlike cooking prep which is usually a one-time step, data cleaning can be an iterative process. You might clean the data, perform some analysis, discover new issues, and return to the cleaning phase. Furthermore, some data cleaning techniques like imputation involve generating new data, which has no direct equivalent in standard cooking preparation.

```
Dirty Data ─────► [ Inspection ──► Identification ──► Cleaning ──► Verification ] ─────► Clean Data ─────► Analysis & Modeling
```

## Details

Dirty data is an unavoidable reality in data science and engineering. It can manifest as duplicate entries cluttering the dataset, simple mis-spellings causing inconsistencies, or data type parsing errors where numbers are treated as text. These issues often stem from human error, data migration from legacy systems, or combining disparate data sources. Data cleaning is the systematic process of identifying these problems and applying transformations to fix them, ensuring the data is accurate, consistent, and usable for its intended purpose. The process generally involves several key activities.

#### Primary Goal

To improve data quality to a standard that allows for accurate, reliable, and meaningful analysis and modeling.

#### Mechanism

- **How it Works:** The process is typically iterative and follows a general sequence:
    1.  **Inspection:** First, you must understand your data's health. This involves using tools to get a high-level summary, like [[Python - Inspecting DataFrame with .info()|inspecting DataFrame metadata with `.info()`]] or [[Python - Identifying Data Types with .dtypes|checking data types with `.dtypes`]].
    2.  **Identification:** Pinpoint specific problems. This could mean finding duplicate rows, identifying columns with mixed data types, or spotting inconsistent text formatting.
    3.  **Cleaning:** Apply transformations to correct the identified issues. This is where specific techniques are used, such as [[Python - Stripping Characters with .str.strip()|stripping unwanted characters]] or performing [[Python - Type Casting with .astype()|type casting with `.astype()`]].
    4.  **Verification:** After cleaning, confirm that the fixes worked and didn't introduce new problems. A powerful technique for this is to [[Python - Verifying Data with assert|verify data with `assert`]] statements to programmatically check that your data meets expected conditions.
- **Common Data Quality Issues & Solutions:**
    - **Data Type Errors:** A column that should be numeric is loaded as a string (e.g., '1,000' instead of 1000).
        - *Example:* The [[Python - Converting String Columns to Numeric Process|process for converting string columns to numeric]] involves removing non-numeric characters and then using [[Python - Type Casting with .astype()|`.astype()`]] to change the data type.
    - **Text Formatting Issues:** Inconsistent capitalization ('USA', 'usa', 'U.S.A.') or leading/trailing whitespace (' New York ').
    - **Duplicate Records:** The same entity or event is recorded multiple times, which can skew aggregations and analysis.
    - **Structural Errors:** Inconsistent naming conventions or misplaced values that violate the dataset's schema or [[Python - Data Type Constraints|data type constraints]].

##### Code Translation

```python
import pandas as pd
import numpy as np

# --- Sample Dirty Data ---
data = {'product_id': ['A1', 'B2', ' C3 ', 'A1', 'D4'],
        'price': ['$5.99', '10.00', ' $8.49', '$5.99', '7.25'],
        'category': ['Fruit', 'Dairy', 'Fruit', 'Fruit', np.nan]}
df = pd.DataFrame(data)
print("--- Original Dirty DataFrame ---")
print(df)
df.info()

# --- Step 1 & 2: Inspect and Identify Issues ---
# Issues identified:
# 1. 'product_id' has leading/trailing whitespace (' C3 ').
# 2. 'price' is an object/string type due to '$' and needs to be numeric.
# 3. There is a duplicate row (index 0 and 3).
# 4. 'category' has a missing value.

# --- Step 3: Cleaning ---
# Fix whitespace in 'product_id'
df['product_id'] = df['product_id'].str.strip() # See: [[Python - Stripping Characters with .str.strip()]]

# Convert 'price' to numeric
# See: [[Python - Converting String Columns to Numeric Process]]
df['price'] = df['price'].str.replace('$', '', regex=False).str.strip()
df['price'] = pd.to_numeric(df['price'])

# Remove duplicate rows
df = df.drop_duplicates()

# Handle missing data (simple fill)
df['category'] = df['category'].fillna('Unknown')

# Convert 'category' to a more memory-efficient type
# See: [[Python - Converting to Categorical Type]]
df['category'] = df['category'].astype('category')

# --- Step 4: Verification ---
# See: [[Python - Verifying Data with assert]]
assert df['price'].dtype == 'float64'
assert df.duplicated().sum() == 0
assert df['product_id'].str.contains(' ').any() == False

print("\n--- Cleaned & Verified DataFrame ---")
print(df)
df.info()
```

 [[Code - Data Cleaning Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Strategy for Missing Values:**
    - **Deletion:** Rows (listwise) or columns with missing values can be removed. This is simple but can cause significant information loss if the missingness is not random.
    - **Imputation:** Missing values can be filled in with a substitute, such as the mean, median, or mode of the column, or using more complex predictive models. This preserves data but can introduce bias.
- **Definition of 'Clean':**
    - The standard for 'clean' is context-dependent. It is defined by business rules and the requirements of the subsequent analysis. For example, an age column might be considered clean if all values are integers between 0 and 120.

#### Core Trade-offs

- **Time and Effort vs. Data Quality:**
    - Thorough data cleaning is time-consuming. There is a trade-off between achieving perfect data and delivering results in a timely manner. Over-cleaning can lead to diminishing returns, while under-cleaning compromises validity.
- **Risk of Information Loss:**
    - Aggressive cleaning strategies, like deleting any row with a missing value, can discard valuable information and reduce the statistical power of the dataset.
- **Potential to Introduce Bias:**
    - The choices made during cleaning can inadvertently introduce bias. For example, imputing missing income data with the mean could mask the true variability and affect the results of an analysis on income inequality.

## Connections

```
                      (Parent)
               Data Science Workflow
                         ▲
                         │
         ┌───────────────┼────────────────┐
         │               │                │
(Principle)     ┌──────────────────┐    (Followed By)
Garbage In,     │   Data Cleaning  │    Feature Engineering
Garbage Out     └──────────────────┘
                         │
                         │
(Verification Technique)
      assert
```

### Parent Concept

Data cleaning is a fundamental and often the most time-consuming stage within the broader [[DataEng - Data Science Workflow|data science workflow]].

### Child Concepts

- Specific tasks within data cleaning include **Duplicate Removal**, which eliminates redundant entries.
- Another key task is **Data Type Correction**, ensuring that data is stored in the correct format for computation (e.g., numeric, string, date).
- **Text Normalization** is a form of cleaning that standardizes text fields, for example, by converting all text to lowercase or removing punctuation.

### Related Concepts 

- The entire concept is motivated by the principle of [[DataEng - Garbage In, Garbage Out (GIGO)|Garbage In, Garbage Out]], which states that the quality of output is determined by the quality of input.
- After cleaning, [[Python - Verifying Data with assert|using `assert` statements]] is a robust programming technique to programmatically confirm that the data meets the expected quality standards.
- Data cleaning is a prerequisite for and often overlaps with [[Fundamental - Feature Engineering|feature engineering]], where new predictive variables are created from the clean data.
- Understanding and correcting [[Python - Categorical Data|categorical data]] is a common and important sub-task within the data cleaning process.
- The process of [[Python - Converting String Columns to Numeric Process|converting string columns to numeric formats]] is a classic example of a data cleaning task.
- A key part of the inspection phase involves using methods like [[Python - Inspecting DataFrame with .info()|`.info()`]] to get a quick summary of data types and null values.
## Questions

- A key sales dataset has 20% of its 'revenue' entries missing. Deleting these rows would ensure data integrity but significantly shrink the dataset for your quarterly forecast model. Imputing the values might maintain dataset size but could introduce bias. How do you decide which path to take, and how would you explain the potential impact of your choice on the sales forecast to the Head of Sales?
- You're building an ETL pipeline that ingests customer data from multiple third-party APIs, each with its own format and quality issues. How would you design a scalable and maintainable data cleaning module for this pipeline? What tools or frameworks would you consider, and how would you handle a new data source being added with completely unforeseen data quality problems?
- What if you were given a dataset so 'dirty' that more than 50% of the values in every column were incorrect, missing, or improperly formatted? Is there a point where data is 'uncleanable' and it's better to discard it entirely and focus on fixing the data generation process itself? Where do you draw that line?