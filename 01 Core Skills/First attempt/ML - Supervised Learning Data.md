---
tags:
  - core
  - concept
  - machine-learning
  - supervised-learning
source:
  - "[[Understanding Machine Learning]]"
related:
  - "[[ML - Training Data]]"
  - "[[ML - Unsupervised Learning Data]]"
  - "[[ML - Supervised Learning]]"
  - "[[ML - Feature Engineering]]"
---
# Core: Supervised Learning Data
## Summary

> Supervised learning training data consists of a set of observations, where each observation contains a collection of **features** (the inputs) and a corresponding known **label** for a **target variable** (the output you want to predict).

_Analogy: It's a spreadsheet for predicting house prices. Each row is one house (**an observation**). The columns for square footage, number of bedrooms, and location are the **features**. The final column with the actual sale price is the **target label**._

## Details

The structure of this data is what makes supervised learning possible.

- **Core Components:**
    - **Target Variable:** This is the single, specific outcome you want to predict.
    - **Label:** The known, correct value for the target variable in a given observation. Labels can be:
        - _Categories:_ `spam`, `not spam`, `cat`, `dog`. (for Classification)
        - _Numbers:_ `$250,000`, `78.3`, `-14`. (for Regression)
    - **Features:** These are the different pieces of information or variables that might help predict the target.
    - **Observations (or Examples):** A single instance or data point (e.g., one email, one customer, one house) containing both its features and its target label. More observations are generally better.
- **The Process:**
    1. **Training:** We input the features and their corresponding labels into a machine learning algorithm. The "magic" of ML is that the algorithm can analyze many features at once, even ones we're unsure about, to find complex relationships between them and the target.
    2. **Prediction:** Once training is complete, the trained model is ready. We can now give it new observations _without_ the label. The model takes these new features as input and outputs its prediction for the target.

## Connections

This type of data is the specific fuel for the supervised learning paradigm.
- **Parent Concept:** It is a specific type of [[ML - Training Data]].
- **Powers:** It is the required input for all [[ML - Supervised Learning]] algorithms.
- **Contrast With:** [[ML - Unsupervised Learning]], which uses data _without_ a target variable or labels.    

## Questions

- What makes a feature "good" versus "bad"? (Leads to [[ML - Feature Engineering]]).
- What happens if the labels in the training data are incorrect or "noisy"?
- What if one category of a label is much more common than others? (Leads to the Class Imbalance problem).
- How is the process of getting labeled data done in the real world? (Leads to Data Labeling).