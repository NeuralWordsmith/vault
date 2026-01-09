---
tags:
  - core
  - concept
  - machine-learning
source:
  - "[[Understanding Machine Learning]]"
related:
  - "[[ML - Training Data]]"
  - "[[ML - Supervised Learning Data]]"
  - "[[ML - Unsupervised Learning Data]]"
  - "[[ML - Feature Engineering]]"
  - "[[01 Core Skills/First attempt/ML - Machine Learning Model]]"
---
# Core: Observations, Features, and Targets
## Summary

> In machine learning, an **observation** is a single data point (like a customer), its **features** are its individual characteristics (like age and income), and the **target** is the specific value we want to predict for it (like whether they will churn).

_Analogy: Think of a patient's medical chart. The entire chart for one patient is the **observation**. The individual measurements like `height`, `weight`, and `blood pressure` are the **features**. The final diagnosis, like `has_diabetes`, is the **target**._

## Details

This vocabulary is the standard way to describe the structure of a dataset, especially in supervised learning. It's often visualized as a spreadsheet or table.

- **Observation:**
    - A single instance or example in your dataset.
    - In a spreadsheet, this corresponds to a **single row**.
    - _Examples:_ A single email, a specific house on the market, one customer, a single image.
- **Features (X):**
    - The independent variables or attributes that describe an observation. These are the inputs the model uses to make a prediction.
    - In a spreadsheet, these are the **individual columns** (except for the target).
    - _Examples:_ For a house, features could be `square_footage`, `number_of_bedrooms`, and `year_built`.
- **Target (y):**
    - The specific outcome or dependent variable that you are trying to predict. **This only exists in supervised learning.**
    - In a spreadsheet, this is the **single column** you want to predict.
    - _Examples:_ For the house, the target might be `sale_price` (for regression) or `is_in_good_school_district` (for classification).

```Python
# A single observation represented as a dictionary
# The keys are feature names (and the target name)
house_observation = {
    "square_footage": 1500,     # Feature
    "num_bedrooms": 3,          # Feature
    "year_built": 1995,         # Feature
    "sale_price": 300000        # Target
}
```

## Connections

These are the atomic units of data that fuel the entire machine learning process.

- **Make Up:** A collection of observations, features, and (optionally) a target forms your [[ML - Training Data]].
- **Defines:** The presence or absence of a **target** is what distinguishes [[ML - Supervised Learning Data]] from [[ML - Unsupervised Learning Data]].
- **Input For:** The **features** of an observation are the direct input for a [[01 Core Skills/First attempt/ML - Machine Learning Model]].
- **Modified By:** The process of [[ML - Feature Engineering]] is all about creating better, more informative **features** from the raw data.

## Questions

- What's the difference between a feature and a label? (A "label" is just another name for the target in a classification problem).
- Can a feature be non-numeric? (Yes, these are called categorical features, and they require special handling).
- What is the process of selecting the _best_ features for a model called? (Leads to Feature Selection).
- What does "independent and identically distributed" (i.i.d.) mean in the context of observations?