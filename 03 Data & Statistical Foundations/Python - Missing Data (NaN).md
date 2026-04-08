---
tags: 
  - core
  - python
  - data_quality
  - data_cleaning
  - null_values
  - nan
  - data_preprocessing
  - concept
source: 
  - "[[Cleaning Data in Python]]"
related: 
  - "[[Python - Data Completeness]]"
  - "[[Python - Detecting Missing Data in Pandas]]"
  - "[[Python - Handling Missing Data in Pandas]]"
  - "[[Python - Dropping Missing Data with .dropna()]]"
  - "[[Python - Imputing Missing Data with .fillna()]]"
  - "[[Python - Visualizing Missing Data with missingno]]"
  - "[[Python - Investigating Patterns in Missing Data]]"
  - "[[Python - Types of Missing Data]]"
  - "[[Python - Missing Completely At Random (MCAR)]]"
  - "[[Python - Missing At Random (MAR)]]"
  - "[[Python - Missing Not At Random (MNAR)]]"
  - "[[Fundamental - Feature Engineering]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[NumPy - Exploratory Data Analysis with NumPy]]"
---
# Core: Missing Data

## Summary

>Missing data occurs when no value is stored for a variable within a specific observation or record. It's a common issue in real-world datasets, often represented by placeholders like `NA` (Not Available) or `NaN` (Not a Number), but can also be disguised as arbitrary values like 0 or a period (.). This problem frequently arises from technical glitches during data collection or simple human error.

**Why This Matters:** Failing to identify and handle missing data can lead to inaccurate analyses, biased machine learning models, and ultimately, flawed business decisions.

_Analogy:_ _Imagine you're a teacher grading a stack of multiple-choice tests. A missing data point is like a student leaving a question completely blank. You know there should be an answer, but the space is empty. Some students might leave it blank, others might write 'IDK', and some might just put a dot. All of these represent a missing answer, but they look different._

In this analogy:
- **The stack of tests** is your dataset.
- **Each student's test** is an observation (or row).
- **Each question** is a variable (or column).
- **A blank answer** is the missing data point (`NA` or `NaN`).
- **'IDK' or a dot** are arbitrary value representations of missing data.

**Where it breaks down:** The analogy implies all missing answers are the same. In reality, the *reason* a question was left blank (e.g., the student didn't know, ran out of time, or found the question confusing) is critically important, which maps to the different [[Python - Types of Missing Data|types of missingness]] like MCAR, MAR, and MNAR.

```
A typical dataset with missing values:

+-----+-------+--------+-----------+
| ID  | Age   | Gender |   City    |
+-----+-------+--------+-----------+
| 101 | 25    | Male   | New York  |
| 102 | NA    | Female | London    |
| 103 | 32    | Male   |   NaN     |
| 104 | 45    | Female | Paris     |
+-----+-------+--------+-----------+

Here, the 'Age' for ID 102 and the 'City' for ID 103 are missing data.
```

## Details

Missing data is a fundamental concept in data cleaning and preprocessing, representing gaps or null values in a dataset. It directly impacts one of the core tenets of data quality: [[Python - Data Completeness|completeness]]. Before any meaningful analysis or modeling can occur, it's crucial to first identify the presence, extent, and nature of these missing values. Understanding *why* the data is missing is the first step toward choosing an appropriate strategy to handle it, as the reasons can be categorized into distinct types: **Missing Completely At Random (MCAR)**, **Missing At Random (MAR)**, and **Missing Not At Random (MNAR)**.

#### Primary Goal

To identify and understand gaps in a dataset to ensure the quality and reliability of any subsequent analysis or modeling.

#### Mechanism

- **How it Works:**
    1. In a structured dataset (like a table or spreadsheet), each cell is expected to have a value.
    2. A missing value is simply an empty cell or a cell filled with a special placeholder.
    3. The presence of these gaps can disrupt calculations (e.g., you can't calculate the average of a column with non-numeric `NA` values) and introduce bias.
- **Common Representations:**
    - **Standard Placeholders:** Most data analysis tools, like Pandas, have standard representations.
        - *Example:* `NA` (Not Available), `NaN` (Not a Number), `None` (Python's null object).
    - **Arbitrary Placeholders:** Sometimes, missingness is encoded with values that can be mistaken for real data.
        - *Example:* Using `0` for a 'number of children' variable, `999` for an 'age' variable, or a single dot `.` or hyphen `-`.
- **Common Causes:**
    - **Human Error:** A person forgets to enter a value in a form, or intentionally skips a sensitive question like income.
        - *Example:* A survey respondent leaves the 'Annual Income' field blank.
    - **Technical Error:** A sensor fails to record a temperature reading, a data transfer process is interrupted, or there's a system incompatibility.
        - *Example:* A network outage causes several rows of data from an IoT device to be lost during transmission.

##### Code Translation

nothing to fill here

 [[Code - Missing Data Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Representation Format:** The primary 'parameter' to be aware of is how missing data is encoded in your specific dataset.
    - Is it a standard format like `NaN` that tools can automatically detect, or is it an arbitrary value like `999` that requires manual identification?

#### Core Trade-offs

- **Ignoring Missing Data (The Biggest Trade-off):**
    - **Reduced Statistical Power:** Many statistical tests and models cannot run on datasets with missing values, forcing you to discard rows and thus reducing your sample size and the reliability of your conclusions.
    - **Biased Results:** If the missingness is not random, ignoring it can lead to a skewed understanding of the data. For example, if high-income individuals are less likely to report their income, any analysis of the remaining data will underestimate the true average income.
    - **Model Failure:** Many machine learning algorithms in libraries like scikit-learn will raise an error if they encounter `NaN` values during training.

## Connections

```
                      (Parent)
                 Data Completeness
                         ▲
                         │
           ┌─────────────┼─────────────┐
           │             │             │
(Detection)   ┌──────────────────┐   (Handling)
Detecting     │   Missing Data   │   Imputing
Missing Data  └──────────────────┘   Missing Data
                         │
           ┌─────────────┴─────────────┐
           │             │             │
         MCAR           MAR           MNAR
      (Child Type) (Child Type) (Child Type)
```

### Parent Concept

Missing data is a direct violation of the data quality dimension of [[Python - Data Completeness|data completeness]], which states that a dataset should have no gaps.

### Child Concepts

- A key sub-type is [[Python - Missing Completely At Random (MCAR)|Missing Completely At Random (MCAR)]], where the reason for missingness is unrelated to any other variable in the dataset.
- Another type is [[Python - Missing At Random (MAR)|Missing At Random (MAR)]], where the missingness can be explained by other observed variables.
- The most problematic type is [[Python - Missing Not At Random (MNAR)|Missing Not At Random (MNAR)]], where the reason for the missing value is related to the missing value itself.

### Related Concepts 

- The first step after understanding the concept is learning about [[Python - Detecting Missing Data in Pandas|detecting missing data]], which provides the practical tools to find these gaps.
- Once found, the next logical step is to explore methods for [[Python - Handling Missing Data in Pandas|handling missing data]], such as dropping or imputing values.
- For a more intuitive understanding of the extent and patterns of missingness, one can use tools for [[Python - Visualizing Missing Data with missingno|visualizing missing data]].
## Questions

- You're working with a customer churn dataset where the 'income' variable has 30% missing values. The business wants a churn prediction model ASAP. What is the trade-off between dropping all rows with missing income versus imputing them, and how would you explain the business risk of each choice to the project manager?
- How would you design a data ingestion pipeline for a real-time sensor network to automatically detect and flag missing data points? What specific metrics would you monitor, and what would be the automated alert mechanism if the rate of missing data suddenly spikes?
- What if a missing value wasn't an absence of information, but a deliberate signal from the user? How could you reframe the problem to use the 'missingness' itself as a predictive feature in a machine learning model?