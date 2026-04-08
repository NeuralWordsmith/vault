---
tags: 
  - core
  - pandas
  - category_reduction
  - feature_engineering
  - data_cleaning
  - cardinality
  - replace_method
  - concept
source: 
  - "[[Cleaning Data in Python]]"
related: 
  - "[[DataEng - Categorical Data Cleaning]]"
  - "[[DataEng - Handling Inconsistent Capitalization]]"
  - "[[DataEng - Handling Leading and Trailing Whitespace]]"
  - "[[DataEng - Creating Categories from Continuous Data]]"
  - "[[DataEng - Creating Categories with qcut()]]"
  - "[[DataEng - Creating Categories with cut()]]"
  - "[[DataEng - qcut() vs cut()]]"
  - "[[Fundamental - Feature Engineering]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - Data Types]]"
  - "[[Fundamental - Statistics]]"
---
# Core: Collapsing Categories

## Summary

>Collapsing categories is a data cleaning technique used to reduce the number of unique values (cardinality) in a categorical column by grouping similar or granular categories into fewer, broader ones. For instance, specific versions like 'iOS 11' and 'iOS 12' can be merged into a single 'MobileOS' category. This is often a crucial step in [[DataEng - Categorical Data Cleaning|cleaning categorical data]], much like [[DataEng - Handling Inconsistent Capitalization|standardizing capitalization]].

**Why This Matters:** Collapsing categories simplifies complex data, which helps machine learning models generalize better and makes analytical reports easier to understand.

_Analogy:_ _Imagine you're a mailroom clerk sorting incoming mail for a large company. Initially, you have a separate mail slot for every single employee ('John Smith', 'Jane Doe', 'Peter Jones', etc.). This is very precise but quickly becomes overwhelming. To simplify, you decide to collapse these individual slots into broader department-level bins: 'Sales', 'Marketing', 'Engineering'. Now, you just need to know someone's department to sort their mail, making the process much faster and less error-prone._

-
**Individual Mail Slots:** The original, granular categories (e.g., 'iOS 11', 'Android 10').
- **Department Bins:** The new, collapsed categories (e.g., 'MobileOS', 'DesktopOS').
- **The Sorting Rule (Your Brain):** The mapping dictionary that defines which employee goes into which department bin.
- **The Act of Sorting:** The `.replace()` method applying the mapping.
- **Where it breaks down:** The analogy implies a physical sorting process. In data, this is an instantaneous, in-memory transformation. More importantly, if you need to send a package to a *specific* person (e.g., John Smith), the department-level bin is no longer sufficient. This highlights the trade-off: collapsing categories gains simplicity but loses granularity, which might be critical for certain analyses.

```
Before:                                     After:
+------------------+                      +------------------+
| operating_system |                      | operating_system |
+------------------+                      +------------------+
| Microsoft        | --                   | DesktopOS        |
| MacOS            | --\                  +------------------+
| Linux            | ---+--> {mapping} --> | MobileOS         |
| iOS              | --/                  +------------------+
| Android          | --
+------------------+
```

## Details

In data engineering and feature engineering, we often encounter categorical features with too many unique values. For example, a column for 'operating_system' might contain dozens of specific versions like 'Windows 10', 'Windows 11', 'macOS Ventura', 'iOS 16', etc. This high cardinality can make analysis difficult and cause machine learning models to overfit. The core idea of collapsing categories is to simplify this by mapping these specific values to a smaller set of more meaningful, high-level groups, such as 'DesktopOS' and 'MobileOS', using a dictionary and the `.replace()` method.

#### Primary Goal

To reduce the cardinality (number of unique values) of a categorical feature to improve model performance and simplify analysis.

#### Mechanism

- **Step 1: Define the Mapping**
    - Create a Python dictionary where the keys are the original category names you want to change, and the values are the new, broader category names they should be mapped to.
- **Step 2: Select the Column**
    - Isolate the specific column (a pandas Series) from your DataFrame that you want to transform.
- **Step 3: Apply the Replacement**
    - Call the `.replace()` method on the selected column, passing your mapping dictionary as the argument. This will return a new Series with the categories collapsed.
- **Step 4: Verify the Result**
    - Check the unique values of the transformed column using the `.unique()` method to confirm that the categories have been successfully collapsed.

##### Code Translation

```python
import pandas as pd

# --- Step 1 & 2: Prepare Data and Define Mapping ---
# Assume 'devices' is a DataFrame with an 'operating_system' column
data = {'operating_system': ['Microsoft', 'MacOS', 'iOS', 'Android', 'Linux', 'iOS']}
devices = pd.DataFrame(data)

# The mapping dictionary defines how to collapse the categories
mapping = {
    'Microsoft': 'DesktopOS',
    'MacOS': 'DesktopOS',
    'Linux': 'DesktopOS',
    'iOS': 'MobileOS',
    'Android': 'MobileOS'
}

# --- Step 3: Apply the Replacement ---
# The .replace() method uses the dictionary to map old values to new ones
devices['operating_system'] = devices['operating_system'].replace(mapping)

# --- Step 4: Verify the Result ---
# .unique() shows only the new, collapsed categories remain
print(devices['operating_system'].unique())
# Expected Output: array(['DesktopOS', 'MobileOS'], dtype=object)
```

 [[Code - Collapsing Categories Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Mapping Dictionary**
    - This is the primary control. The keys must exactly match the existing category names (case-sensitive). The values determine the new, collapsed categories. Any category not present as a key in the dictionary will remain unchanged.

#### Core Trade-offs

- **Pro: Simplicity and Generalization**
    - Fewer categories can prevent models from overfitting to rare or noisy data points. It also makes visualizations and summary statistics much easier to interpret.
- **Con: Loss of Information**
    - The primary drawback is the loss of granularity. If there's a meaningful difference in behavior between 'iOS 15' and 'iOS 16' users, collapsing them into 'MobileOS' hides this insight. You are making an assumption that the collapsed categories are homogenous.

## Connections

```
                           (Parent)
                  Categorical Data Cleaning
                             ▲
                             │
┌────────────────────────────┼────────────────────────────┐
│                            │                            │
(Related)             ┌───────────────────────────┐         (Related)
Handling Whitespace   │   Collapsing Categories   │   Handling Capitalization
                      └───────────────────────────┘
                             │
                             │
                   (Contrasts With)
        Creating Categories from Continuous Data
```

### Parent Concept

This technique is a fundamental part of the broader process of [[DataEng - Categorical Data Cleaning|categorical data cleaning]], which aims to make categorical data consistent and usable for analysis.

### Child Concepts



### Related Concepts 

- This method is often used alongside other cleaning steps like [[DataEng - Handling Inconsistent Capitalization|handling inconsistent capitalization]] and [[DataEng - Handling Leading and Trailing Whitespace|removing whitespace]] to standardize values *before* collapsing them.
- It contrasts with the goal of [[DataEng - Creating Categories from Continuous Data|creating categories from continuous data]], which involves increasing complexity by binning numeric data, whereas this method reduces complexity by merging existing categories.
- The choice of how to group categories is a form of [[Fundamental - Feature Engineering|feature engineering]], where domain knowledge is used to create more meaningful features.
## Questions

- You're analyzing user engagement for a new app feature. Collapsing 'iOS 16.1' and 'iOS 16.2' into 'iOS 16' simplifies the report, but you suspect a critical bug in 16.1 is causing low engagement. How do you balance the need for a high-level summary for executives against the risk of masking a critical, version-specific issue in your analysis?
- In a production ETL pipeline, the 'operating_system' column is populated by a third-party API. How would you design a system to handle the sudden appearance of a new, unmapped category like 'FuchsiaOS' without causing the pipeline to fail or producing incorrect groupings? What kind of alerting would you set up?
- What if you were given a column with 5,000 unique user-agent strings and told to collapse them into meaningful categories like 'Desktop Browser', 'Mobile Browser', 'Bot', etc., but you were forbidden from using a predefined dictionary? What programmatic or algorithmic approaches could you use to discover and create these groupings automatically?