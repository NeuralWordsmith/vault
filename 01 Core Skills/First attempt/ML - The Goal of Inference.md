---
tags:
  - core
  - concept
  - machine-learning
source:
  - "[[Understanding Machine Learning]]"
related:
  - "[[ML - The Goal of Prediction]]"
  - "[[Fundamental - What is Machine Learning]]"
  - "[[01 Core Skills/First attempt/ML - Machine Learning Model]]"
  - "[[Fundamental - Statistics & Probability]]"
---
# Core: The Goal of Inference

## Summary

> In machine learning, inference is the process of using a model to understand the underlying relationships and causal structures within a dataset, focusing on **why** something happens rather than just **what** will happen.

_Analogy: A medical researcher uses a model on patient data. [[ML - The Goal of Prediction|Prediction]] would be to forecast which patients are at high risk for a heart attack. **Inference** would be to use the same model to understand which factors (like cholesterol, blood pressure, age) are the most significant drivers of that risk, and by how much._

## Details

While prediction wants an accurate output, inference wants an understandable model. The goal is to draw conclusions about the real-world process that generated the data.

- **Interpretability is Key:** For inference, you must be able to inspect the model's parameters and understand what they mean. A "black box" model that is highly predictive but unexplainable is not useful for inference.
    - _Example:_ Simple, interpretable models like Linear Regression are often preferred for inference tasks.
- **Focus on Relationships:** The goal is to quantify the effect of each input feature on the output.
    - _Question:_ "If I increase advertising spend by $1,000, how much will my sales increase, holding all other factors constant?" This is an inference question.
- **Statistical Significance:** Inference is deeply rooted in statistics. We don't just want to know the relationship; we want to know how confident we are in that relationship. This involves concepts like p-values and confidence intervals.

```Python
# Conceptual example using a trained linear regression model
# model.formula = "sales ~ tv_ad_spend + radio_ad_spend"

# The coefficients are the core of the inference
print(model.coefficients)
# Output might be:
# tv_ad_spend: 45.7  => "For each $1 spent on TV, sales increase by $45.70"
# radio_ad_spend: 188.5 => "For each $1 spent on Radio, sales increase by $188.50"
```

## Connections

Inference provides the "why" that complements the "what" of prediction.

- **Counterpart:** It is one of the two primary goals of [[Fundamental - What is Machine Learning]], standing in direct contrast to [[ML - The Goal of Prediction]].
- **Foundation:** It is the traditional and primary goal of the field of [[Fundamental - Statistics & Probability]].
- **Common Tools:** Often performed using interpretable models like [[ML - Linear Regression]] and [[Gemini Drafts/dump/ML - Logistic Regression 1]].

## Questions

- What is the fundamental difference between correlation and causation, and how does that relate to inference?
- What is the "interpretability vs. accuracy trade-off"? Can a single model be great at both?
- How are p-values and confidence intervals used to determine if a model's finding is statistically significant?
- If a model infers a relationship, how do we know it will hold true in the future?