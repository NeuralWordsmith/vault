---
tags:
  - core
  - concept
  - machine-learning
source:
  - "[[Understanding Machine Learning]]"
related:
  - "[[01 Core Skills/First attempt/ML - Machine Learning Model]]"
  - "[[ML - The Bias-Variance Tradeoff 1]]"
  - "[[ML - Overfitting]]"
  - "[[ML - Linear Regression]]"
  - "[[ML - Support Vector Machine (SVM)]]"
  - "[[ML - The Goal of Inference]]"
---
# Core: Linear vs Non-linear Models
## Summary

> **Linear models** assume the relationship between features and the target is a straight line, making them simple and interpretable, while **non-linear models** can learn complex curves and interactions, offering higher accuracy at the cost of complexity.

_Analogy: You're trying to build a fence to separate red flowers from blue flowers in a garden. A **linear model** is like using a single, perfectly straight plank of wood. It might work well if the flowers are in two neat groups. A **non-linear model** is like using a flexible garden hose that you can curve and bend to perfectly snake around every single flower, creating a more complex but perfect separation._

## Details

The choice between a linear and a non-linear model is a fundamental trade-off between simplicity and power.
- **Linear Models:**
    - **Assumption:** The output is a linear combination of the input features. In simple terms, it's a straight line (for one feature) or a flat plane (for two features). 
    - **Pros:**
        - **Fast to train.**
        - **Highly interpretable:** It's very easy to understand how each feature contributes to the prediction. This is critical for [[ML - The Goal of Inference]].
        - **Less prone to overfitting:** Their simplicity acts as a safeguard against memorizing the training data.
    - **Cons:**
        - **Low accuracy if the true relationship is complex:** If the real-world pattern is a curve, a straight line will be a poor approximation.
    - _Examples:_ [[ML - Linear Regression]], [[Gemini Drafts/dump/ML - Logistic Regression 1]], basic [[ML - Support Vector Machine (SVM)]] (with a linear kernel).
- **Non-linear Models:**
    - **Assumption:** The relationship between features and the target can be a complex, flexible curve. - **Pros:**
        - **High accuracy:** Can capture intricate and complex patterns in the data, leading to better performance.
        - **Flexible:** Can model almost any relationship given enough data.
    - **Cons:**
        - **Prone to overfitting:** Their flexibility means they can easily memorize the noise in the training data instead of the true signal.
        - **Often "black boxes":** Can be very difficult to understand _why_ the model made a specific prediction.
        - **Slower to train** and require more data.
    - _Examples:_ [[ML - Support Vector Machine (SVM)]] with a polynomial or RBF kernel, [[ML - Decision Trees]], [[ML - Neural Networks]].

## Connections

This concept is at the heart of model selection and evaluation.

- **Defines:** The complexity of a [[01 Core Skills/First attempt/ML - Machine Learning Model]].
- **Central to:** This choice is the core of [[ML - The Bias-Variance Tradeoff 1]]. Linear models typically have high bias and low variance, while non-linear models have low bias and high variance.
- **Leads to:** The flexibility of non-linear models is what makes [[ML - Overfitting]] a major risk.
- **Impacts:** The simplicity of linear models makes them ideal for [[ML - The Goal of Inference]], where understanding the "why" is more important than raw predictive power.    

## Questions

- How can a fundamentally linear model like Linear Regression be adapted to capture non-linear relationships? (Leads to Polynomial Features).
- What is the "kernel trick" in Support Vector Machines, and how does it allow them to model non-linear data?
- Is a Decision Tree a linear or non-linear model? (It's non-linear, as it creates step-wise, axis-aligned decision boundaries).
- How do you decide when the extra complexity of a non-linear model is actually worth it? (Leads to model selection techniques and cross-validation).