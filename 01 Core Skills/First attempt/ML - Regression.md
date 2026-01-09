---
tags:
  - major-core
  - concept
  - machine-learning
source:
  - "[[Understanding Machine Learning]]"
related:
  - "[[ML - Supervised Learning]]"
  - "[[01 Core Skills/First attempt/ML - Classification 1]]"
  - "[[ML - The Goal of Prediction]]"
  - "[[ML - Supervised Learning Data]]"
  - "[[ML - Linear Regression]]"
---
# Major Core: Regression
## Summary

> Regression is a supervised learning task where the model's goal is to predict a continuous, numerical value for a given observation.

_Analogy: If classification is about sorting things into bins, regression is like creating a custom measuring stick. It looks at the features of a new object and uses the measuring stick to estimate its exact value, like its price, weight, or temperature._

## Details

While classification predicts a category, regression predicts a quantity.

- **The Goal:** To predict a **continuous variable**, which is a variable that can take on any value within a given range (e.g., 1.0, 1.1, 1.11, 1.112...).
- **The Process:** The trained model learns a line or curve that represents the "best fit" for the relationship between the input features and the output values in the training data. When a new observation is provided, the model finds the point on that line corresponding to the new features to make its prediction.
- **Common Examples:**
    - _Finance:_ How much will this stock be worth next month?
    - _Science:_ Based on its orbital characteristics, what is this exoplanet's mass?
    - _E-commerce:_ How many units of this product will we sell tomorrow?
    - _Health:_ How tall will this child be as an adult?

## Connections

### Parent Concept

- Regression is one of the two primary tasks that falls under the umbrella of [[ML - Supervised Learning]].

### Child Concepts & Algorithms

These are the specific algorithms and ideas that are implementations or direct children of Regression:
- [[ML - Linear Regression]] (The most fundamental regression algorithm)
- [[ML - Polynomial Regression]]
- [[ML - Decision Trees for Regression]]
- [[ML - Regression Metrics]] (e.g., MAE, MSE, RMSE)

### Related Concepts

- **Data Requirement:** It requires [[ML - Supervised Learning Data]] where the target variable is a number.
- **Core Goal:** It is a specific implementation of [[ML - The Goal of Prediction]].

## Questions

- What is the most fundamental regression algorithm? (Leads to Linear Regression).
- How do we measure the error of a numerical prediction? What's the difference between MAE and RMSE?
- What if the relationship between the features and the target isn't a straight line? (Leads to Polynomial Regression and more complex models).
- What is the difference between a model's prediction being "biased" versus having high "variance"?