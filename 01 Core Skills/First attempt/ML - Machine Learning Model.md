---
tags:
  - core
  - concept
  - machine-learning
source:
  - "[[Understanding Machine Learning]]"
related:
  - "[[ML - Machine Learning Workflow]]"
  - "[[ML - Model Training & Evaluation]]"
  - "[[ML - Training Data]]"
  - "[[ML - The Goal of Prediction]]"
  - "[[ML - The Goal of Inference]]"
---
# Core: Machine Learning Model

## Summary

> A machine learning model is essentially a mathematical function with internal parameters that have been tuned by a training algorithm to recognize patterns in data, enabling it to make predictions or decisions on new, unseen inputs.

_Analogy: Think of a model as a complex audio mixing board. The data is the music, and the training process is an expert sound engineer meticulously adjusting every knob and slider (the parameters) until the output sounds perfect. The final configuration of all those knobs is the "model."_

## Details

At its heart, a model is a mathematical construct. The process of "learning" is the process of finding the best internal values (parameters or "weights") for that construct to map inputs to outputs accurately.

- **It's a Function:** A model is a function, f(x), that takes an input, x, and produces an output, y. For example, x could be an image of a cat, and y could be the label "cat".
- **It Has Parameters:** The function's behavior is controlled by its internal parameters (often called weights and biases), which we can represent as theta. So, a more accurate representation is y=f(x;theta).
- **Training Finds the Parameters:** The goal of [[ML - Model Training & Evaluation|model training]] is to find the optimal set of parameters, theta, that makes the model's predictions most accurate on the training data. This is an optimization problem, usually solved with algorithms like Gradient Descent.

Let's consider a very simple linear regression model:

```
y = mx + c
```

- **The Model Structure:** The structure is the linear equation itself.
- **The Inputs/Outputs:** `x` is the input feature, `y` is the predicted output.
- **The Parameters:** `m` (the slope) and `c` (the intercept) are the model's parameters.
- **Training:** The training process would test many different values for `m` and `c` against the data until it finds the combination that draws the most accurate "line of best fit" through the data points. That final pair of `m` and `c` values _is_ the trained model.

## Connections

A model is the central artifact in the machine learning lifecycle.

- **Parent Concept:** It is the primary output of the process defined in [[Fundamental - What is Machine Learning]].
- **How It's Created:** The process of creating a model is [[ML - Model Training & Evaluation]].
- **What It's Used For:** A trained model is used to achieve the goals of [[ML - The Goal of Prediction]] and [[ML - The Goal of Inference]].
- **What It's Made Of:** The underlying principles come from [[Fundamental - Statistics & Probability]].

## Questions

- How does a machine learning model _actually_ work internally? (This note answers the "what," but the next step is the "how" of the algorithms themselves).
- What is the difference between model parameters and model hyperparameters?
- How do you prevent a model from just "memorizing" the training data? (See: Overfitting).
- How do you choose the right type of model for a specific problem? (e.g., Linear Regression vs. a Decision Tree).
- What is the Bias-Variance Tradeoff?