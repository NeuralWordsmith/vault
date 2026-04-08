---
tags: 
  - core
  - dataclean
  - data_cleaning
  - outlier_treatment
  - imputation
  - data_validation
  - business_rules
  - concept
source: 
  - "[[Cleaning Data in Python]]"
related: 
  - "[[DataEng - Handling Out-of-Range Data]]"
  - "[[DataEng - Data Range Constraints]]"
  - "[[DataEng - Capping Out-of-Range Data]]"
  - "[[DataEng - Dropping Out-of-Range Data]]"
  - "[[DataEng - Capping Out-of-Range Values in Pandas]]"
  - "[[DataEng - Dropping Out-of-Range Rows in Pandas]]"
  - "[[DataEng - Using Assert Statements for Data Validation]]"
  - "[[Fundamental - Feature Engineering]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - Filtering NumPy Arrays]]"
  - "[[Python - Pandas]]"
---
# Core: Assigning Custom Values for Out-of-Range Data

## Summary

>Assigning a custom value is a data cleaning strategy where values that fall outside a predefined valid range are replaced with a specific, predetermined value. This approach is used when the out-of-range data has a particular meaning or when simply deleting or capping the data would result in a loss of important contextual information.

**Why This Matters:** This technique allows you to embed specific business logic directly into your data, preserving records that would otherwise be discarded while flagging them for special handling.

_Analogy:_ _Imagine a multiple-choice test where some questions have an 'I don't know' option. If a student leaves a question blank, the grading machine doesn't just mark it as zero (capping) or throw out the test paper (dropping). Instead, it's programmed to assign a special code, say '-1', to that blank answer. This code tells the teacher not just that the answer was wrong, but specifically that the student *chose not to answer*._

In this analogy:
- **The blank answer** is the out-of-range or invalid data point.
- **The grading machine's rule** is the data validation logic.
- **The special code '-1'** is the custom value assigned.
- **The teacher** is the data analyst or machine learning model that can now interpret this special code differently from a regular incorrect answer.

**Where it breaks down:** The analogy is strong, but in a real dataset, a numerical custom value like -1 could be accidentally included in mathematical calculations (like calculating the average score), skewing the results. This requires an extra step in data processing to handle the custom value correctly, such as treating it as a separate category.

```
Before:
+---------------+-----+
| customer_id   | age |
+===============+=====+
| 101           | 25  |
| 102           | 150 |  <-- Out of range (>100)
| 103           | 34  |
| 104           | -5  |  <-- Out of range (<0)
| 105           | 42  |
+---------------+-----+

After assigning custom value of -1:
+---------------+-----+
| customer_id   | age |
+===============+=====+
| 101           | 25  |
| 102           | -1  |  <-- Replaced
| 103           | 34  |
| 104           | -1  |  <-- Replaced
| 105           | 42  |
+---------------+-----+
```

## Details

Based on specific business assumptions, we can choose to handle data that goes beyond a certain range in a more nuanced way than simply deleting or capping it. This method involves replacing these out-of-range values with a custom, pre-defined value (e.g., -1, 999, 0). This is a powerful technique in data engineering and feature engineering because the custom value can act as a flag, carrying information that the original value was invalid or belonged to a special case, which can be crucial for downstream analysis or modeling. It's a deliberate choice that contrasts with other methods like [[DataEng - Dropping Out-of-Range Data|dropping data]] or [[DataEng - Capping Out-of-Range Data|capping data]].

#### Primary Goal

To replace invalid or extreme data with a meaningful, business-defined value, thereby preserving the record while flagging it for special consideration or interpretation.

#### Mechanism

- **Step 1: Define the Business Rule**
    - Establish the valid range for the data based on domain knowledge or business requirements. Decide on the custom value that will be used for replacement. This value should ideally be one that does not naturally occur in the dataset (e.g., -1 for age).
- **Step 2: Identify Out-of-Range Data**
    - Create a boolean mask to programmatically identify all data points in the column that are less than the minimum valid value or greater than the maximum valid value.
- **Step 3: Assign the Custom Value**
    - Use the boolean mask to select the out-of-range values and replace them with the chosen custom value. In pandas, this is often done efficiently using the `.loc` indexer.

##### Code Translation

```python
import pandas as pd
import numpy as np

# Sample data with out-of-range values
data = {'customer_id': [101, 102, 103, 104, 105],
        'age': [25, 150, 34, -5, 42]} 
df = pd.DataFrame(data)
print("--- Original Data ---")
print(df)

# --- Step 1: Define the Business Rule ---
# Business assumption: Valid age is between 0 and 100.
# Any other value is considered invalid and should be replaced with -1.
min_valid_age = 0
max_valid_age = 100
custom_value = -1

# --- Step 2: Identify Out-of-Range Data ---
# Create a boolean mask for ages outside the valid range
is_out_of_range = (df['age'] < min_valid_age) | (df['age'] > max_valid_age)

# --- Step 3: Assign the Custom Value ---
# Use .loc to replace values where the mask is True
df.loc[is_out_of_range, 'age'] = custom_value

print("\n--- Data After Assigning Custom Value ---")
print(df)

# Expected Output:
# --- Original Data ---
#    customer_id  age
# 0          101   25
# 1          102  150
# 2          103   34
# 3          104   -5
# 4          105   42
#
# --- Data After Assigning Custom Value ---
#    customer_id  age
# 0          101   25
# 1          102   -1
# 2          103   34
# 3          104   -1
# 4          105   42
```

 [[Code - Assigning Custom Values for Out-of-Range Data Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Valid Range (Min/Max)**
    - These thresholds define the boundaries of acceptable data. Their selection is critical and must be driven by business logic or empirical analysis of the data's distribution.
- **Custom Value**
    - The value used for replacement. It should be chosen carefully to avoid collision with valid data points and to be easily identifiable. Common choices include -1, 0, 999, or `np.nan` depending on the desired downstream behavior.

#### Core Trade-offs

- **Pro: Preserves Information**
    - Unlike dropping rows, this method keeps the entire record. The custom value itself becomes a new piece of information, indicating that the original value was invalid, which can be used as a feature in a model.
- **Pro: Encodes Business Logic**
    - It directly translates a business rule (e.g., 'age cannot be negative') into the dataset, making the data more robust and aligned with domain knowledge.
- **Con: Can Distort Statistics**
    - If the custom value is a number (like -1 or 999), it can significantly skew statistical measures like mean, variance, and correlation if not explicitly handled or filtered out before calculation.
- **Con: Requires Careful Downstream Handling**
    - Machine learning models might misinterpret the custom value as a legitimate numerical point on a scale. It often requires an additional feature engineering step, like creating a binary flag column ('is_age_invalid') or treating the column as categorical.

## Connections

```
                               (Parent)
                     Handling Out-of-Range Data
                                 ▲
                                 │
          ┌──────────────────────┼──────────────────────┐
          │                      │                      │
(Alternative)        ┌──────────────────────────────────────────┐      (Alternative)
Dropping Data        │ Assigning Custom Values for Out-of-Range │      Capping Data
                     └──────────────────────────────────────────┘
```

### Parent Concept

This is one of several strategies for [[DataEng - Handling Out-of-Range Data|handling out-of-range data]], which is a core task in data cleaning and preparation.

### Child Concepts



### Related Concepts 

- This method directly enforces [[DataEng - Data Range Constraints|data range constraints]] defined by business requirements.
- It provides a more nuanced alternative that [[DataEng - Capping Out-of-Range Data|capping data]], which simply forces values to a boundary without indicating *why* they were changed.
- It starkly contrasts with [[DataEng - Dropping Out-of-Range Data|dropping data]], as its primary goal is to preserve the record rather than discard it.
- The implementation often relies on the same boolean masking techniques used for [[DataEng - Capping Out-of-Range Values in Pandas|capping values in pandas]].
- This technique is a form of imputation, which is a key concept in [[Fundamental - Feature Engineering|feature engineering]].
## Questions

- Imagine you're analyzing customer age, and the business decides to replace any age over 90 with the custom value -1. How might this impact a model predicting customer lifetime value, and what steps would you take to mitigate potential negative effects while still respecting the business rule?
- If you implement a rule to assign a custom value for out-of-range sensor readings in a real-time IoT data pipeline, how would you design a system to alert engineers if the *frequency* of these custom value assignments suddenly spikes, and what could such a spike indicate?
- What if, instead of a single custom value, you were tasked with assigning a *dynamically generated* value based on *why* the data was out of range (e.g., data entry error vs. legitimate extreme event)? How would this change your data processing architecture?