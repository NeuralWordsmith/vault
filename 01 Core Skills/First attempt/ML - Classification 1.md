---
tags:
  - major-core
  - concept
  - machine-learning
source:
  - "[[Understanding Machine Learning]]"
related:
  - "[[ML - Supervised Learning]]"
  - "[[01 Core Skills/First attempt/ML - Regression]]"
  - "[[ML - The Goal of Prediction]]"
  - "[[ML - Supervised Learning Data]]"
  - "[[Gemini Drafts/dump/ML - Logistic Regression 1]]"
---
# Major Core: Classification
## Summary

> Classification is a supervised learning task where the model's goal is to predict a discrete, predefined category or class label for a given observation.

_Analogy: Think of a post office sorting machine. It looks at the address (the features) on a letter (the observation) and assigns it to a specific bin for a city or zip code (the class label)._

## Details

Classification is all about assigning items to the correct buckets.

- **The Goal:** To predict a **discrete variable**, which is a variable that can only take on a finite number of distinct values (e.g., `Yes`/`No`, `Red`/`White`/`Rosé`).
- **The Process:** The trained model learns a decision boundary that separates the different classes in the data. When a new observation comes in, the model determines which side of the boundary it falls on and assigns the corresponding class label. 
- **Types of Classification:**
    - **Binary Classification:** There are only two possible outcome categories. This is the most common type.
        - _Examples:_ Will this customer `churn` or `not churn`? Is this transaction `fraudulent` or `legitimate`?
    - **Multiclass Classification:** There are more than two possible outcome categories, and they are mutually exclusive.
        - _Examples:_ What `species` of flower is this? Is this news article about `sports`, `politics`, or `technology`?

## Connections

### Parent Concept

- Classification is one of the two primary tasks that falls under the umbrella of [[ML - Supervised Learning]].

### Child Concepts & Algorithms

These are the specific algorithms and ideas that are implementations or direct children of Classification:

- [[Gemini Drafts/dump/ML - Logistic Regression 1]] (A foundational classification algorithm)
- [[ML - k-Nearest Neighbors (kNN)]]
- [[Gemini Drafts/Plans/dump/ML - Support Vector Machines (SVMs)]]
- [[ML - Decision Trees]]
- [[ML - Classification Metrics]] (e.g., Accuracy, Precision, Recall)

### Related Concepts

- **Core Goal:** It is a specific implementation of [[ML - The Goal of Prediction]].
- **Data Requirement:** It requires [[ML - Supervised Learning Data]] where the target variable is a category.

## Questions

- How do you choose the right evaluation metric? Why is "accuracy" sometimes a terrible metric? (Leads to the problem of imbalanced classes).
- What is the difference between multiclass and multilabel classification?
- How does a model output a "probability" for a class, and how do we use that? (Leads to thresholds).