---
tags:
  - major-core
  - concept
  - machine-learning
source:
  - "[[Understanding Machine Learning]]"
related:
  - "[[ML - Machine Learning Workflow]]"
  - "[[ML - Model Training & Evaluation]]"
  - "[[ML - Overfitting]]"
  - "[[ML - Training Data]]"
  - "[[ML - Cross-Validation]]"
---
# Major Core: Data Splitting for Model Validation

## Summary

> Data splitting is the process of partitioning your dataset into separate subsets for training and testing to simulate how a model will perform on new, unseen data and to prevent it from simply memorizing the training examples.

_Analogy: It's like preparing for a final exam. You use 80% of the textbook chapters to study and learn from (the **training set**). You then take a mock exam using 20% of the chapters you've never seen before (the **test set**). Your score on that mock exam is a realistic estimate of how you'll do on the real final exam._

## Details

Splitting the data is the primary defense against a model's biggest pitfall: **overfitting**. Without it, you have no reliable way to know if your model has actually learned general patterns or just memorized the data.

- **The Problem: The Open-Book Exam**
    - If you train and evaluate a model on the same data, it's like an "open-book exam." The model can get a perfect score by just looking up the answers it already saw. This gives you a misleading and overly optimistic sense of its performance.
- **The Solution: Train-Test Split**
    - The most common practice is to divide the data into two sets:
    - **Training Set:** The majority of the data (e.g., 80%) that is fed to the model so it can learn the underlying patterns and relationships.
    - **Test Set (Holdout Set):** A smaller, reserved portion of the data (e.g., 20%) that the model **never sees during training**. It is used only at the very end to get an unbiased evaluation of the final model's performance. - **The Golden Rule:** The test set must be treated as if it were brand new, future data. You should only use it **once** at the very end of your project to report the final performance. If you use it to tune the model, you are "leaking" information from the test set into your training process, and your final evaluation will be biased.

## Connections
### Parent Concept
- Data splitting is a critical, non-negotiable step within the [[ML - Machine Learning Workflow]].
### Child Concepts & Techniques
These are more advanced or specific techniques built on the core idea of data splitting:
- [[ML - Validation Set]] (The set used for tuning)
- [[ML - Cross-Validation]] (An advanced technique for when you have limited data)
- [[ML - Stratified Splitting]] (For imbalanced datasets)
- [[ML - Time-Based Splits]] (For time-series data)

### Related Concepts

- **Primary Defense Against:** The entire purpose of splitting is to detect and prevent [[ML - Overfitting]].
- **Enables:** This process is what makes [[ML - Model Training & Evaluation]] meaningful and reliable.

## Questions

- What is the difference between a **test set** and a **validation set**? (This is a critical distinction for tuning models).
- What if I don't have enough data to make a reliable split? (Leads to the concept of **Cross-Validation**).
- Should the split always be random? What happens if my classes are imbalanced? (Leads to **Stratified Splitting**).
- How is splitting different for time-series data where the order of observations matters? (Leads to **Time-Based Splits**).