---
tags:
  - core
  - concept
  - machine-learning
source:
  - "[[Understanding Machine Learning]]"
related:
  - "[[ML - The Goal of Inference]]"
  - "[[ML - Supervised Learning]]"
  - "[[01 Core Skills/First attempt/ML - Machine Learning Model]]"
  - "[[ML - Machine Learning Workflow]]"
---
# Core: The Goal of Prediction

## Summary

> In machine learning, prediction is the process of using a trained [[01 Core Skills/First attempt/ML - Machine Learning Model|model]] to generate an output (an estimate or a category) for a new, previously unseen data point.

_Analogy: A bank trains a model on thousands of past loan applications, labeled with whether the borrower defaulted or not. Prediction is when they feed **your** new loan application into that model to get an output: a "risk score" or a "likely to default" classification._

## Details

Prediction is the primary, practical application of [[ML - Supervised Learning|Supervised Learning]]. The entire goal of training a supervised model is to make it capable of making accurate predictions on new data.

- **The Process:** The workflow is straightforward:
	1. Start with a [[01 Core Skills/First attempt/ML - Machine Learning Model|trained model]].
	2. Provide a new input data point (e.g., a new image, a new row in a spreadsheet).
	3. The model applies the patterns it learned during training to this new input.
	4. It outputs a prediction.        

```python
# Conceptual example
# model is already trained on historical data

new_customer_data = [age: 35, income: 80000, has_mortgage: True]

predicted_credit_score = model.predict(new_customer_data) 
# Output might be: 750
```
 
- **Two Main Types of Prediction:**
    - **Classification:** Predicting a discrete category or class label. The output is one of a limited set of possibilities.
	    - _Examples:_ Is this email `spam` or `not spam`? Does this image contain a `cat`, `dog`, or `bird`?
    - **Regression:** Predicting a continuous numerical value. The output can be any number within a range.
        - _Examples:_ What will be the price of this house? How many degrees Celsius will it be tomorrow?

## Connections

Prediction is a central pillar of the machine learning workflow.

- **Parent Goal:** It is one of the two primary goals of [[Fundamental - What is Machine Learning]], standing in contrast to [[ML - The Goal of Inference]]. While inference seeks to understand relationships _within_ the data, prediction focuses solely on the accuracy of the output for _new_ data.
- **Method:** It is the primary goal and defining outcome of [[ML - Supervised Learning]].
- **Tool:** It is the action performed by a trained [[01 Core Skills/First attempt/ML - Machine Learning Model|Machine Learning Model]].
- **Evaluation:** The quality of a model's predictions is formally measured during [[ML - Model Training & Evaluation]] using various metrics.


## Questions

- What is the fundamental difference between prediction and [[ML - The Goal of Inference|inference]]?
- How do we measure if a prediction is "good"? (Leads to metrics like Accuracy, Precision, Recall, F1-score for classification, and MAE, MSE, RMSE for regression).
- What happens when a model gets too good at predicting its training data but fails on new data? (Leads to the concept of Overfitting).
- Can a model make a reliable prediction on data that is fundamentally different from its training data? (Leads to Data Drift and domain adaptation).