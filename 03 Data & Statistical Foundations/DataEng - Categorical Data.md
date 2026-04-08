---
tags: 
  - core
  - data-cleaning
  - nominal
  - ordinal
  - encoding
  - cardinality
  - feature_engineering
  - concept
source: 
  - "[[Cleaning Data in Python]]"
related: 
  - "[[Fundamental - Feature Engineering]]"
  - "[[DataEng - Inconsistent Categorical Data]]"
  - "[[DataEng - Handling Inconsistent Categorical Data]]"
  - "[[DataEng - Dropping Rows with Inconsistent Categories]]"
  - "[[DataEng - Anti Join]]"
  - "[[DataEng - Inner Join]]"
  - "[[Fundamental - Statistics]]"
  - "[[Python - Data Types]]"
  - "[[ML - One-Hot Encoding]]"
  - "[[ML - Label Encoding]]"
  - "[[ML - Target Encoding]]"
  - "[[Python - Pandas]]"
---
# Core: Categorical Variables

## Summary

>Categorical variables represent data that can be divided into a predefined, finite number of distinct groups or labels. Unlike numeric data, these variables are qualitative. Examples include marriage status ('married', 'unmarried'), loan status ('default', 'paid'), or country of origin. Because most machine learning algorithms require numerical input, these text-based categories must be converted into numbers. However, this process requires care, as datasets often contain [[DataEng - Inconsistent Categorical Data|inconsistent categorical data]] (e.g., 'USA' and 'U.S.A.') that must be cleaned first.

**Why This Matters:** Understanding categorical variables is crucial because they represent a vast amount of real-world qualitative information, and correctly encoding them is a foundational step for building accurate machine learning models.

_Analogy:_ _Think of a t-shirt store. The variable is 'T-Shirt Size', and the categories are the predefined, finite options available: 'Small', 'Medium', 'Large', and 'X-Large'. Each t-shirt in the inventory belongs to exactly one of these size categories. You can't have a size 'Medium-and-a-half'; it must be one of the established options. When preparing for a machine learning model (like predicting sales), you might convert these sizes to numbers: Small=0, Medium=1, Large=2, X-Large=3._

• **The Variable:** 'T-Shirt Size' represents the categorical variable itself (e.g., 'Marriage Status').
• **The Categories:** The specific sizes ('Small', 'Medium', 'Large') are the distinct, predefined groups (e.g., 'unmarried', 'married').
• **A Data Point:** A single t-shirt's label ('Medium') is an individual data point's value.
• **Inherent Order:** The clear progression from 'Small' to 'X-Large' maps directly to the concept of ordinal categorical data.
• **Where it breaks down:** The analogy best represents *ordinal* data. It doesn't capture *nominal* data as well, where categories have no order. For example, 'T-Shirt Color' ('Red', 'Blue', 'Green') would be a nominal variable, and assigning numbers (Red=0, Blue=1) would be arbitrary.

```
      Categorical Variable
            │
    ┌───────┴───────┐
    │               │
  Nominal         Ordinal
(No Order)      (Has Order)
    │               │
 e.g. Colors   e.g. Sizes (S,M,L)
```

## Details

In data science and machine learning, we often work with categorical variables, which, as the name suggests, represent data points belonging to a predefined, finite set of categories. As seen in examples like marriage status, household income brackets, or loan approval status, this type of data is descriptive and non-numeric. Since mathematical models operate on numbers, a critical step in feature engineering is to convert these text labels into a numerical format. These variables are generally classified into two main types: **Nominal** and **Ordinal**.

#### Primary Goal

To classify data into distinct groups or labels, allowing us to structure and analyze qualitative information that doesn't have an intrinsic numerical value.

#### Mechanism

- **How it Works:**
    1.  **Assignment:** Each data point in a dataset is assigned to one, and only one, category from a fixed list for a given variable.
    2.  **Encoding:** For use in machine learning, a mapping is created to convert each unique category label into a number. For example, in the 'Marriage Status' variable, 'unmarried' might be mapped to 0 and 'married' to 1.
- **Nominal Variables:**
    - These are categories with no intrinsic order or ranking between them. The numerical encoding is purely for identification and does not imply any relationship.
    - Example:
        - *Loan Status: 'default', 'payed', 'no_loan'. Assigning 0, 1, 2 does not mean 'no_loan' is 'greater' than 'default'.*
        - *Country: 'USA', 'Canada', 'Mexico'.*
- **Ordinal Variables:**
    - These are categories that have a clear, meaningful order or ranking. The numerical encoding should reflect this inherent sequence.
    - Example:
        - *Household Income Category: '0-20K', '20-40K', '40-60K'. Here, '20-40K' is clearly greater than '0-20K'.*
        - *Customer Satisfaction: 'Poor', 'Average', 'Good', 'Excellent'.*

##### Code Translation

```python
import pandas as pd

# --- Step 1: Create a DataFrame with categorical data ---
data = {'loan_status': ['payed', 'default', 'payed', 'no_loan', 'default'],
        'income_category': ['20-40K', '0-20K', '40-60K', '20-40K', '0-20K']}
df = pd.DataFrame(data)

print("Original DataFrame:")
print(df)
print("\n")

# --- Step 2: Convert a categorical column to its numeric representation ---
# This is a common technique called 'Label Encoding'.
# Pandas can do this by converting the column to a 'category' dtype first.
df['loan_status_encoded'] = df['loan_status'].astype('category').cat.codes

print("DataFrame with Numeric Representation:")
print(df)

# --- Note the mapping ---
# default -> 0
# no_loan -> 1
# payed   -> 2
# The mapping is alphabetical by default.
```

 [[Code - Categorical Variables Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Cardinality:**
    - Refers to the number of unique categories in a variable. High cardinality (many unique values) can be challenging for some modeling techniques like one-hot encoding, as it can lead to a very large number of features.
- **Ordering:**
    - The decision of whether a variable is nominal or ordinal is crucial. This choice directly influences the most appropriate encoding strategy and can significantly impact model performance.

#### Core Trade-offs

- **Pro: Rich Representation**
    - Categorical variables provide a simple and intuitive way to represent complex, qualitative information that is easily understood by humans.
- **Con: Requires Preprocessing**
    - Most machine learning algorithms cannot process text labels directly, necessitating an encoding step to convert them into numbers, which adds a layer of complexity.
- **Risk: Misinterpretation of Order**
    - Incorrectly treating a nominal variable as ordinal can mislead a model into finding a false relationship between categories. Conversely, treating an ordinal variable as nominal discards valuable ranking information.
- **Challenge: Data Quality**
    - These variables are highly susceptible to quality issues, such as [[DataEng - Inconsistent Categorical Data|inconsistent entries]] ('NY' vs 'New York'). This requires robust methods for [[DataEng - Handling Inconsistent Categorical Data|handling inconsistencies]] before they can be used.

## Connections

```
                      (Parent)
               Feature Engineering
                         ▲
                         │
         ┌───────────────┼────────────────────────────┐
         │               │                            │
(Requires Cleaning) ┌─────────────────────┐      (Contrasts With)
Inconsistent Data   │ Categorical Variable│      Numeric Data
                    └─────────────────────┘
                         │
              ┌──────────┴──────────┐
              │                     │
           Nominal               Ordinal
```

### Parent Concept

Categorical variables are a fundamental concept within [[Fundamental - Feature Engineering|feature engineering]], as they represent a common type of raw data that must be transformed into a suitable format for machine learning models.

### Child Concepts

- The two primary types are **Nominal Variables**, which have no inherent order (e.g., 'country'), and **Ordinal Variables**, which have a meaningful sequence (e.g., 'education level').

### Related Concepts 

- Dealing with [[DataEng - Inconsistent Categorical Data|inconsistent categorical data]] is a common challenge that must be addressed before these variables can be used effectively.
- Techniques for [[DataEng - Handling Inconsistent Categorical Data|handling inconsistent categorical data]], such as standardization or mapping, are crucial data cleaning steps.
- One method for identifying inconsistencies involves using an [[DataEng - Anti Join|anti join]] to find category values in a dataset that do not exist in a master list of valid categories.
## Questions

- Imagine you're building a credit risk model. The 'Loan Purpose' feature has 50 unique categories, some with very few examples. How would you balance the business need for granular insights against the risk of overfitting by including all 50 categories? What encoding strategy would you propose and why?
- In a production environment where new, unseen categories for a variable (e.g., 'new product type') can appear in real-time streaming data, how would you design a robust data pipeline that prevents the model from failing? What's your strategy for handling these novel categories automatically?
- What if you had a categorical variable with thousands of unique values (e.g., 'user_id') that was highly predictive. Traditional encoding methods like one-hot encoding are infeasible. What alternative, potentially lossy, representations could you create to capture its predictive power without exploding the feature space?