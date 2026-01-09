---
tags:
  - major_core
  - concept
  - machine-learning
source:
  - "[[Understanding Machine Learning]]"
related:
  - "[[Fundamental - What is Machine Learning]]"
  - "[[ML - Unsupervised Learning]]"
  - "[[ML - Reinforcement Learning]]"
  - "[[ML - Supervised Learning]]"
  - "[[ML - The Goal of Prediction]]"
---
# Major Core: Supervised Learning
## Summary

> Supervised Learning is a machine learning paradigm where a model learns from data that is explicitly labeled with the correct output, with the goal of predicting the output for new, unseen data.

_Analogy: It's like a student (the model) learning with flashcards. Each card has a question on one side (the input features) and the correct answer on the back (the label). After studying thousands of these flashcards, the student can confidently answer new questions they've never seen before._

## Details

Supervised learning is the most common and straightforward type of machine learning, where the "right answers" are provided to the model during training.

- **The Core Mechanism:** The model's goal is to learn the underlying mapping function between the input **features (X)** and the output **label (y)**. It takes an observation (a set of features) and assigns a label to it.
- **Requires Labeled Data:** This is the defining characteristic. The entire process is dependent on having high-quality [[ML - Supervised Learning Data]].
- **Two Main Types:** The task is defined by the type of label the model is trying to predict.    

## Connections

### Parent Concept
- Supervised Learning is one of the three main paradigms that falls under the umbrella of [[Fundamental - Machine Learning]].
### Child Concepts & Algorithms
These are the specific tasks that are implementations of Supervised Learning:
- [[01 Core Skills/First attempt/ML - Classification 1]] (Predicting a category)
- [[01 Core Skills/First attempt/ML - Regression]] (Predicting a number)
### Related Concepts
- **Contrasts With:** It is defined by its use of labeled data, which distinguishes it from [[ML - Unsupervised Learning]] (no labels) and [[ML - Reinforcement Learning]] (learns from rewards, not a static dataset).
- **Primary Goal:** Its entire purpose is to achieve [[ML - The Goal of Prediction]].
- **Core Process:** It is the main type of modeling performed within the [[ML - Machine Learning Workflow]].

## Questions

- What are the most common algorithms for classification vs. regression? (Leads to Logistic Regression, Decision Trees, SVMs, Linear Regression, etc.)
- If we have the "right" answers, how do we measure if the model's predictions are "good"? (Leads to Model Validation and metrics like Accuracy, F1-Score, and RMSE).
- What happens if the model learns the training data _too_ well and can't make good predictions on new data? (Leads to the concept of Overfitting).
- What is the biggest practical challenge of supervised learning? (Leads to the cost and difficulty of acquiring high-quality labeled data).