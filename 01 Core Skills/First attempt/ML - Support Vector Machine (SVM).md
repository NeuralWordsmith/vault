---
tags:
  - core
  - concept
source:
  - "[[Understanding Machine Learning]]"
related:
  - "[[ML - Supervised Learning]]"
  - "[[01 Core Skills/First attempt/ML - Classification 1]]"
  - "[[ML - Linear vs Non-linear Models]]"
  - "[[Gemini Drafts/dump/ML - Logistic Regression 1]]"
  - "[[ML - Overfitting]]"
---
# Core: Support Vector Machine (SVM)
## Summary

> A Support Vector Machine (SVM) is a powerful supervised learning algorithm that finds the optimal boundary (or "hyperplane") that best separates data points of different classes by maximizing the margin, or the distance, between the classes.

_Analogy: Imagine a street with houses from two different families (the classes) on either side. An SVM doesn't just draw a line down the middle of the street; it finds the widest possible median strip that separates the two sides, pushing the dividing line as far away from the closest houses on both sides as possible._

## Details

SVMs are known for their effectiveness, especially on smaller, cleaner datasets. The key concepts are the hyperplane, the margin, and the support vectors.

- **The Hyperplane:** This is the decision boundary. In a 2D space (with two features), it's a simple line. In a 3D space, it's a flat plane. In higher dimensions, it's called a hyperplane.
- **Maximizing the Margin:** This is the core idea of an SVM. Instead of just finding _any_ line that separates the classes, an SVM finds the line that creates the largest possible "buffer zone" or **margin** between the classes. This makes the model more robust to new data.
- **Support Vectors:** The data points that are closest to the hyperplane and sit right on the edge of the margin are called the **support vectors**. These are the critical observations that "support" the hyperplane; if you were to move them, the hyperplane itself would move.
- **The Kernel Trick (for Non-linearity):**
    - A basic SVM is a [[ML - Linear vs Non-linear Models|linear model]]. But what if the data can't be separated by a straight line?
    - This is where **kernels** come in. A kernel is a function that takes the existing data and projects it into a higher dimension where it _can_ be separated by a straight line.
    - **Linear Kernel:** The default. It doesn't transform the data, keeping the model linear.
    - **Polynomial Kernel:** Bends the decision boundary into a curve, allowing the SVM to act as a non-linear model.
    - **RBF Kernel:** A popular and powerful kernel that can create very complex, circular decision boundaries.

## Connections

SVMs are a foundational algorithm in the history of machine learning.

- **Parent Concepts:** An SVM is a specific algorithm used for [[ML - Supervised Learning]], most commonly for [[01 Core Skills/First attempt/ML - Classification 1]] tasks.
- **Illustrates:** It is a perfect example of a model that can be both [[ML - Linear vs Non-linear Models|linear or non-linear]] depending on the choice of its kernel.
- **Alternative To:** It is often compared to [[Gemini Drafts/dump/ML - Logistic Regression 1]] for classification tasks. While Logistic Regression focuses on probabilities, SVMs focus on finding the optimal boundary.
- **Risk:** When using powerful non-linear kernels (like RBF), SVMs can be prone to [[ML - Overfitting]] if not properly tuned.    

## Questions

- What is the "kernel trick" and how does it work mathematically without actually computing the new high-dimensional coordinates?
- What are the key hyperparameters of an SVM (like `C` and `gamma`), and how do they affect the model's behavior?
- How can SVMs be used for regression tasks? (Leads to Support Vector Regression, or SVR).
- Why are SVMs so effective on high-dimensional data (e.g., text data) but sometimes less popular than tree-based models for tabular data?