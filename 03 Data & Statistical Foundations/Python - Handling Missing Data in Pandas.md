---
tags: 
  - major_core
  - python
  - data_cleaning
  - imputation
  - data_preprocessing
  - missing_values
  - dropna
  - concept
source: 
  - "[[Cleaning Data in Python]]"
related: 
  - "[[Python - Data Completeness]]"
  - "[[Python - Missing Data (NaN)]]"
  - "[[Python - Detecting Missing Data in Pandas]]"
  - "[[Python - Dropping Missing Data with .dropna()]]"
  - "[[Python - Imputing Missing Data with .fillna()]]"
  - "[[Python - Types of Missing Data]]"
  - "[[Python - Missing Completely At Random (MCAR)]]"
  - "[[Python - Missing At Random (MAR)]]"
  - "[[Python - Missing Not At Random (MNAR)]]"
  - "[[Fundamental - Feature Engineering]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[NumPy - Exploratory Data Analysis with NumPy]]"
  - "[[Fundamental - Statistics]]"
  - "[[Python - Visualizing Missing Data with missingno]]"
  - "[[Python - Investigating Patterns in Missing Data]]"
---
# Major Core: Simple Approaches to Missing Data

## Summary

> When a dataset suffers from a lack of [[Python - Data Completeness|data completeness]], we are left with [[Python - Missing Data (NaN)|missing values]]. Simple approaches for dealing with this problem are the 'first-aid' techniques used to make the dataset usable. These methods fall into two primary categories: removing the data points that have missing values, or replacing the missing values with a plausible substitute based on a simple statistical calculation.

**Why This Matters:** Applying simple strategies to handle missing data is the first critical step in cleaning a dataset, enabling subsequent analysis and preventing errors in machine learning models.

_Analogy:_ _Imagine you're a chef following a recipe, but you discover you're missing an ingredient, say, a specific type of herb for a sauce. A simple approach would be to either (A) skip making the sauce entirely (dropping the data) or (B) substitute the missing herb with a very common one you have on hand, like parsley (imputing with a common value like the mode or mean). You've addressed the immediate problem, and the overall dish can still be completed, even if the sauce's flavor is slightly different from the original recipe._

**Where it breaks down:** The analogy falters because a simple statistical substitute (like the mean) doesn't have the same nuanced relationships as a real ingredient. Filling every missing 'herb' value with 'parsley' might significantly alter the final 'flavor' (the statistical properties and variance) of the dataset, potentially more than a thoughtful culinary substitution would.

```
[Dataset with NaN] --> [Identify Missing Data] --> [Decision Point]
                                                         /         \
                                                        /           \
                                     [Drop Data]         [Impute Data]
                                         |                  /   |   \
                                         |                 /    |    \
                                         v               [Mean] [Median] [Mode]
                                         |                  \    |    /
                                         |                   \   |   /
                                         |                    v  v  v
                                         \                   /
                                          \                 /
                                           v               v
                                        [Clean Dataset]
```

## Details

Dealing with missing data is a foundational step in data preprocessing. While there are many sophisticated techniques, the journey always begins with simple, fundamental approaches. These strategies provide a quick and easy way to create a complete dataset suitable for analysis or machine learning algorithms that cannot handle null values. The two main families of simple approaches are **Deletion** (removing rows or columns with missing data) and **Simple Imputation** (filling missing values with a single representative statistic like the mean, median, or mode).

#### Primary Goal

To quickly and easily transform an incomplete dataset into a complete one, enabling further analysis and modeling without errors caused by null values.

#### Mechanism

- **How it Works:** The process involves a decision point after identifying missing data. You must choose between two fundamental paths:
    1.  **Eliminate:** Remove the observation (row) or the feature (column) that contains the missing value.
    2.  **Substitute:** Replace the missing value with a calculated placeholder.
- **Deletion (Dropping Data):**
    - This is the most straightforward method, where you completely remove the data associated with the missing value. This is handled in Pandas using the `.dropna()` method.
    - This can be done by removing the entire row (listwise deletion) or the entire column.
    - Example: You might drop a row if a survey respondent skipped one non-critical question, but you might drop a column if a sensor was broken and an entire feature is 70% empty. For a detailed guide, see [[Python - Dropping Missing Data with .dropna()]].
- **Simple Imputation (Filling Data):**
    - This method retains the data row/column by filling the missing slot with a statistical value derived from the non-missing data in that column. This is handled in Pandas using the `.fillna()` method.
    - Common statistical measures used include:
    - - **Mean:** Best for numerical columns that are normally distributed and have no significant outliers.
    - - **Median:** More robust for numerical columns that are skewed or contain outliers, as it is less affected by extreme values.
    - - **Mode:** The only simple option for categorical (non-numeric) columns, as it uses the most frequently occurring value.
    - For a detailed guide, see [[Python - Imputing Missing Data with .fillna()]].

nothing to fill here

 [[Code - Simple Approaches to Missing Data Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Deletion Threshold:** When dropping, you must decide on a threshold. For instance, you might set a rule to drop any column with more than 50% missing values, or any row with more than 3 missing values.
- **Imputation Statistic:** The primary choice in simple imputation is which statistic to use. This decision depends on the data type (numeric vs. categorical) and its distribution (symmetric vs. skewed).
- **Scope (Axis):** You must specify whether your operation applies to rows (`axis=0`) or columns (`axis=1`). This is a critical parameter in functions like `.dropna()` and `.fillna()` in Pandas.

#### Core Trade-offs

- **Deletion (Dropping):**
    - **Pro:** It's simple, fast, and guarantees the remaining data is completely real and not fabricated. It avoids adding potentially misleading data.
    - **Con:** It can lead to significant information loss. If the missingness is not random (see [[Python - Missing Not At Random (MNAR)|MNAR]]), dropping data can introduce substantial bias into the dataset, skewing the results of any analysis.
- **Simple Imputation:**
    - **Pro:** It preserves the sample size by keeping all observations, which can be crucial for some models or when data is scarce.
    - **Con:** It artificially reduces the natural variance of the feature. It also ignores the relationships between variables, as the imputed value is based only on the column it belongs to, not on other features in the same row.

## Connections

```
                                (Parent)
                         Data Completeness
                                 ▲
                                 │
(Prerequisite)          ┌──────────────────────────────────┐          (Influences)
Detecting Missing Data  │  Simple Approaches to Missing Data │  Types of Missing Data
                        └──────────────────────────────────┘
                                 │
                      ┌──────────┴──────────┐
                      │                     │
        Dropping Missing Data     Imputing Missing Data
```

### Parent Concept

The concept of handling missing data is a direct response to the problem of ensuring [[Python - Data Completeness|data completeness]], a core tenet of data quality.

### Child Concepts

- [[Python - Dropping Missing Data with .dropna()|Dropping missing data]] is the most direct approach, where rows or columns containing nulls are completely removed.
- [[Python - Imputing Missing Data with .fillna()|Simple imputation]] is an alternative strategy that involves filling in missing values with a statistical measure like the mean, median, or mode.

### Related Concepts 

- Before applying any strategy, one must first perform [[Python - Detecting Missing Data in Pandas|detection of missing data]] to understand its scope.
- The choice of strategy is heavily influenced by the [[Python - Types of Missing Data|type of missing data]] (e.g., MCAR, MAR, MNAR), as simple methods are safest only for MCAR.
- Understanding the underlying representation of missing values, such as [[Python - Missing Data (NaN)|NaN in NumPy and Pandas]], is a prerequisite for handling them.
## Questions

- You have a customer dataset where 15% of the 'Annual Income' values are missing. The business wants to use this data to target high-value customers. Dropping the rows loses 15% of your potential customers, while imputing with the median might misclassify some customers. How do you decide which approach to take, and how would you explain the risk of your chosen method to the marketing team?
- Imagine you're building a real-time data pipeline that processes thousands of records per second. How would you implement a strategy for handling missing data that is both computationally efficient and robust against sudden changes in the data's statistical properties (e.g., the mean suddenly shifts)?
- What if, instead of dropping or imputing, you were required to treat 'missingness' itself as a feature? How would you encode this information, and in what type of machine learning problem might this 'missingness' feature actually improve model performance?
