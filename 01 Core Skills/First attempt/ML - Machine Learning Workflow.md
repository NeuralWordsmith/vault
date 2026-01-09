---
tags:
  - major-core
  - concept
  - machine-learning
source:
  - "[[Understanding Machine Learning]]"
related:
  - "[[Fundamental - What is Machine Learning]]"
  - "[[01 Core Skills/First attempt/ML - Machine Learning Model]]"
  - "[[ML - Feature Engineering]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[Fundamental - Software Engineering]]"
---
# Major Core: Machine Learning Workflow
## Summary

> The Machine Learning Workflow is the standard, end-to-end, iterative process for taking a business problem and solving it with a trained machine learning model.

_Analogy: It's the complete recipe for baking a cake, starting from deciding what kind of cake to make (problem definition), going to the store for ingredients (data collection), preparing the ingredients (feature engineering), mixing and baking (modeling), tasting to see if it's good (evaluation), possibly adding more frosting (tuning), and then serving it (deployment)._

## Details

The workflow provides the roadmap for every practical ML project. It is a highly iterative process, not a linear one.

- **The Standard Phases:**
    1. **Problem Definition:** Translating a business need into a specific ML problem (e.g., "Can we predict customer churn?").
    2. **Data Collection & Preparation:** Gathering and cleaning the raw data. This is often 80% of the work.
    3. **Feature Engineering:** Transforming raw data into informative features the model can use.
    4. **Modeling:** This is a cycle within the larger workflow: - **Split Data:** Divide the dataset into training and testing sets.
        - **Train Model:** The algorithm learns patterns from the training data.
        - **Evaluate:** The model's performance is measured on the unseen test data.
        - **Tune & Repeat:** If performance isn't good enough, adjust the model's settings or the features and re-train. This loop continues until the model is satisfactory.
    5. **Deployment & Monitoring:** Integrating the final model into a live environment and monitoring its performance over time.

## Connections

### Parent Concept

- The workflow is the primary process used to execute the goals of [[Fundamental - Machine Learning]].

### Child Concepts & Techniques

These are the specific concepts that make up the key stages of the workflow:

- [[ML - Feature Engineering]]
- [[ML - Data Splitting for Model Validation]]
- [[ML - Model Training & Evaluation]]
- [[ML - Overfitting]]
- [[ML - MLOps]] (The discipline of automating and scaling the workflow)

### Related Concepts

- **Key Output:** The process produces a trained [[01 Core Skills/First attempt/ML - Machine Learning Model]].
- **Connects to other Fields:** It relies on [[Fundamental - Data Engineering]] for its inputs and [[Fundamental - Software Engineering]] for its outputs (deployment).

## Questions

- How does this workflow change for an [[ML - Unsupervised Learning]] problem where there's no "evaluation" against correct labels?
- What is MLOps, and how does it relate to automating and scaling this workflow?
- What are the most common bottlenecks in this process? (Leads to the importance of data quality).
- How do you create a "baseline" model to know if your complex model is actually any good?