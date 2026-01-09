---
tags:
  - core
  - concept
  - machine-learning
  - unsupervised-learning
source:
  - "[[Understanding Machine Learning]]"
related:
  - "[[ML - Training Data]]"
  - "[[ML - Supervised Learning Data]]"
  - "[[ML - Unsupervised Learning]]"
  - "[[ML - Feature Engineering]]"
---
# Core: Unsupervised Learning Data

## Summary

> Unsupervised learning data consists of observations with **features** only, and completely lacks a predefined **target variable** or labels, forcing the algorithm to discover inherent patterns and structures on its own.

_Analogy: You're given a huge box of mixed Lego bricks with no instructions. You can't build a specific model, but you can start sorting the bricks into piles based on their color, shape, and size (clustering). You are creating the categories yourself based on feature similarity._

## Details

This type of data is common in the real world where labeling is too expensive, impractical, or when the correct labels aren't even known.

- **Structure:** The data contains only input features **(X)**. There is no `y` variable to predict.
    - The goal is not to be "correct" in the same way as supervised learning, but to find interesting structures.
- **Primary Use Cases:**
    - **Clustering:** Automatically grouping similar data points together into categories. The key is that the number and definition of these categories are not known before you start.
        - _Example:_ A marketing team uses customer purchase data to automatically segment customers into groups like "budget shoppers," "brand loyalists," and "weekend spenders."
    - **Dimensionality Reduction:** Compressing many features into a smaller, more manageable set while retaining as much information as possible.
        - _Example:_ Taking a dataset with 100 different sensor readings and reducing it to just 2 or 3 principal components that capture the most important variance.
- **The Process:**
    1. **Exploration:** An unsupervised algorithm is applied to the unlabeled feature data.
    2. **Pattern Discovery:** The model finds its own patterns, creating clusters or identifying principal components.
    3. **Application:** For new data, we can input its features into the trained model to see which cluster it fits into best or to transform it into the lower-dimensional space.

## Connections

Unsupervised data analysis is a foundational tool for data exploration and pre-processing.

- **Parent Concept:** It is a specific type of [[ML - Training Data]].
- **Powers:** It is the required input for all [[ML - Unsupervised Learning]] algorithms.
- **Contrast With:** [[ML - Supervised Learning Data]], which requires a labeled target variable.
- **Can Precede:** Often used as a preliminary step before supervised learning to understand the data or for [[ML - Feature Engineering]].

## Questions

- How do you know if the clusters a model finds are actually meaningful? (Leads to Cluster Evaluation).
- How do you choose the right number of clusters for your data? (Leads to the Elbow Method).
- What is the "curse of dimensionality" and why is it a problem?
- What are the main differences between clustering algorithms like K-Means and hierarchical clustering?