---
tags: 
  - major_core
  - python
  - mcar
  - mar
  - mnar
  - data_quality
  - missing_data
  - concept
source: 
  - "[[Cleaning Data in Python]]"
related: 
  - "[[Python - Data Completeness]]"
  - "[[Python - Missing Data (NaN)]]"
  - "[[Python - Detecting Missing Data in Pandas]]"
  - "[[Python - Visualizing Missing Data with missingno]]"
  - "[[Python - Investigating Patterns in Missing Data]]"
  - "[[Python - Missing Completely At Random (MCAR)]]"
  - "[[Python - Missing At Random (MAR)]]"
  - "[[Python - Missing Not At Random (MNAR)]]"
  - "[[Python - Handling Missing Data in Pandas]]"
  - "[[Python - Dropping Missing Data with .dropna()]]"
  - "[[Python - Imputing Missing Data with .fillna()]]"
  - "[[Fundamental - Feature Engineering]]"
  - "[[Fundamental - Statistics]]"
  - "[[NumPy - Exploratory Data Analysis with NumPy]]"
  - "[[Python - NumPy (Numeric Python)]]"
---
# Major Core: Missingness Types

## Summary

> Not all missing data is the same; the underlying reason a value is missing determines its 'missingness type'. This classification is a fundamental concept in data cleaning and preprocessing within statistics and data science. After identifying [[Python - Missing Data (NaN)|missing values]], the next critical step is to diagnose *why* they are missing, as this informs the entire strategy for handling them.

**Why This Matters:** Understanding the type of missing data is crucial because it dictates which methods for handling it are statistically valid and which will introduce bias into your analysis and models.

_Analogy:_ _Imagine you're conducting a public survey that asks for two things: 'Annual Income' and 'Favorite Hobby'.
- **Missing Completely at Random (MCAR):** A random printing error causes the 'Annual Income' field to be blank on 5% of the survey forms. The missingness is completely unrelated to a person's income, their hobby, or anything else. It's just bad luck, like a random dice roll.
- **Missing at Random (MAR):** You notice that people who list 'Yachting' as their hobby are far more likely to leave the 'Annual Income' field blank. You don't know their income, but you can predict the *missingness* of their income based on another piece of information you *do* have: their hobby.
- **Missing Not at Random (MNAR):** You suspect that people with very high incomes are deliberately skipping the 'Annual Income' question to protect their privacy. The reason the data is missing is directly related to the value of the income itself, which you don't have._

**Where it breaks down:** The analogy presents three very clear-cut scenarios. In real-world data, the lines between MAR and MNAR are often blurry and difficult to prove definitively. Diagnosing the type usually requires a combination of visualization, statistical tests, and, most importantly, domain knowledge, rather than being immediately obvious.

```
+------+------------------------------------------------+-----------------------------------+
| Type | Relationship with...                           | Example                           |
+------+------------------------------------------------+-----------------------------------+
| MCAR | No relationship with any data (random)         | Data entry error                  |
| MAR  | Other OBSERVED variables                       | Men skip depression survey        |
| MNAR | The missing value ITSELF (unobserved)          | High earners skip income question |
+------+------------------------------------------------+-----------------------------------+
```

## Details

When we encounter missing data in a dataset, we can't just fill it in blindly or delete it without consequence. We must first investigate the underlying mechanism that caused the data to be missing. This leads to a crucial classification of missing data into three primary categories, which are essential for choosing an appropriate and statistically sound strategy for [[Python - Handling Missing Data in Pandas|handling it]]. The three main types are **Missing Completely at Random (MCAR)**, **Missing at Random (MAR)**, and **Missing Not at Random (MNAR)**.

#### Primary Goal

To classify the pattern of missing data in a dataset to select the most appropriate and statistically sound method for handling it, thereby avoiding biased results and flawed conclusions.

#### Mechanism

- **How it Works:** The type of missingness is diagnosed by examining the relationship between the absence of data in one variable and the values of other variables in the dataset. The goal is to determine if the missingness is random or if it follows a systematic pattern.
- **Missing Completely At Random (MCAR):**
    - This is the simplest and most ideal scenario. The probability of a data point being missing is the same for all observations. There is no relationship between the missing data and any other values, observed or unobserved.
    - Example:
        - *A lab technician accidentally smudges a few test tubes, making their readings illegible. The smudging is random and has no connection to the results of the other samples.*
        - *As noted in the context, simple data entry errors where a clerk randomly skips a field when inputting data.*
- **Missing At Random (MAR):**
    - This is a more common and manageable scenario. The probability of a data point being missing is systematically related to other *observed* data, but not the missing value itself. In other words, we can explain the missingness using other variables we have.
    - Example:
        - *In a health study, men are less likely than women to fill out a depression survey. The missingness in the 'depression_score' variable can be predicted by the 'gender' variable, which is observed.*
        - *As per the context, missing ozone data is more common for days with high temperatures. We can model the probability of missing ozone data based on the observed temperature.*
- **Missing Not At Random (MNAR):**
    - This is the most problematic type of missingness. The probability of a data point being missing is related to the value of that data point itself. It's also known as nonignorable missingness because we cannot ignore the mechanism that caused it.
    - Example:
        - *People with very high levels of debt are less likely to report their debt amount on a financial survey. The missingness of the 'debt' variable is dependent on the unobserved value of the debt itself.*
        - *In a medical study, patients with the most severe symptoms are more likely to drop out, leading to missing outcome data for the sickest individuals.*

nothing to fill here

 [[Code - Missingness Types Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Underlying Assumptions:** The key 'parameter' is the assumption you make about the nature of your missing data. Your choice of handling method (e.g., deletion vs. imputation) is entirely dependent on whether you assume the data is MCAR, MAR, or MNAR.
- **Statistical Tests & Visualization:** While no test is perfect, statistical methods like Little's MCAR test can help reject the MCAR assumption. More often, [[Python - Visualizing Missing Data with missingno|visualizing missing data]] and [[Python - Investigating Patterns in Missing Data|investigating patterns]] are used to form a hypothesis about whether the data is MAR or MNAR, a process that heavily relies on domain knowledge.

#### Core Trade-offs

- **Risk of Bias:** The greatest danger is incorrectly assuming data is MCAR or MAR when it is actually MNAR. Using simple methods like [[Python - Dropping Missing Data with .dropna()|complete-case analysis (dropping rows)]] or mean [[Python - Imputing Missing Data with .fillna()|imputation]] on MNAR data will introduce significant bias and lead to incorrect analytical conclusions.
- **Complexity of Handling:** MCAR is the easiest to handle, as deletion is often statistically valid. MAR requires more sophisticated methods like multiple imputation. MNAR is the most difficult and may require building a specific statistical model to account for the missingness mechanism or even collecting new data.
- **Verifiability:** The assumptions of MAR and especially MNAR are often untestable from the data alone. You must rely on domain expertise and careful exploratory analysis to justify your choice, which introduces a degree of subjectivity into the data cleaning process.

## Connections

```
                      (Parent)
                 Data Completeness
                         ▲
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                    │
(Tool)          ┌──────────────────┐      (Action)
missingno       │ Missingness Types│      Handling Missing Data
                └──────────────────┘
                         │
          ┌──────────────┴──────────────┐
          │              │              │
         MCAR           MAR            MNAR
```

### Parent Concept

This concept is a crucial aspect of [[Python - Data Completeness|data completeness]], which involves assessing the presence and patterns of missing values before analysis.

### Child Concepts

- The simplest type is [[Python - Missing Completely At Random (MCAR)|Missing Completely At Random (MCAR)]], where the pattern of missingness is entirely random and unrelated to any data.
- A more common scenario is [[Python - Missing At Random (MAR)|Missing At Random (MAR)]], where the pattern of missingness can be explained by other observed variables in the dataset.
- The most challenging type is [[Python - Missing Not At Random (MNAR)|Missing Not At Random (MNAR)]], where the reason for a value being missing is related to the unobserved value itself.

### Related Concepts 

- Understanding missingness types is the theoretical foundation for practical steps like [[Python - Detecting Missing Data in Pandas|detecting missing data in Pandas]].
- Tools like the `missingno` library are used for [[Python - Visualizing Missing Data with missingno|visualizing missing data]], which helps in forming a hypothesis about the missingness type.
- The diagnosed missingness type directly influences the strategy for [[Python - Handling Missing Data in Pandas|handling missing data]], whether it's deletion or imputation.
## Questions

- You discover that customer income data is MNAR, with high-earners being less likely to respond. The business wants to build a model to predict high-value customers. How do you explain to stakeholders that simply dropping or imputing this data with the mean will lead to a model that systematically underestimates the value of your best potential customers, and what alternative, potentially more costly, data collection or modeling strategy would you propose?
- Imagine you're building a real-time data pipeline that ingests sensor data. You suspect that sensor failures (leading to missing data) are more likely under extreme environmental conditions (MNAR). How would you design an automated system to not only impute these values but also flag potential systemic sensor health issues to an operations team before the data quality degradation impacts downstream models?
- What if you could create a 'missingness score' for every single data point in your dataset, representing the probability it *would have been* missing, even if it's currently observed? How could you leverage this hypothetical score to build more robust and bias-aware machine learning models?
