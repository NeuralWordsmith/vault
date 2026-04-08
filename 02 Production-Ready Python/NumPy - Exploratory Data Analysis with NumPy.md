---
tags: 
  - major_core
  - numpy
  - exploratory_data_analysis
  - eda
  - summary_statistics
  - data_profiling
  - data_intuition
  - concept
source: 
  - "[[Introduction to Python]]"
related: 
  - "[[Fundamental - Statistics]]"
  - "[[NumPy - Summarizing Statistics]]"
  - "[[NumPy - Mean (np.mean)]]"
  - "[[NumPy - Median (np.median)]]"
  - "[[NumPy - Standard Deviation (np.std)]]"
  - "[[NumPy - Correlation Coefficient (np.corrcoef)]]"
  - "[[NumPy - Data Sanity Check]]"
  - "[[Fundamental - Feature Engineering]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[Data Visualization]]"
  - "[[Hypothesis Testing]]"
  - "[[Outlier Detection]]"
  - "[[Data Cleaning]]"
  - "[[Pandas - DataFrame.describe]]"
---
# Major Core: Exploratory Data Analysis

## Summary

> Exploratory Data Analysis (EDA) is the critical first step in any data analysis project, focused on summarizing the main characteristics of a dataset, often using visual methods. While it's simple to eyeball a small NumPy array, EDA provides the techniques to understand datasets with thousands or even billions of data points. It's less about formal hypothesis testing and more about developing an intuition for the data's structure, outliers, and underlying relationships before committing to a modeling approach. This process involves calculating key metrics like the [[NumPy - Mean (np.mean)|mean]] and [[NumPy - Median (np.median)|median]] to understand central tendency, and the [[NumPy - Standard Deviation (np.std)|standard deviation]] to understand its spread.

**Why This Matters:** Failing to understand your data's underlying patterns, errors, and biases at the outset can lead to building flawed models that produce incorrect and costly conclusions.

_Analogy:_ _Exploratory Data Analysis is like a detective arriving at a crime scene. Before trying to solve the case (building a model), the detective doesn't just jump to conclusions. Instead, they first survey the entire area, take photographs from different angles, dust for fingerprints, and look for any unusual clues or patterns. They are 'getting to know' the scene of the crime._

In this analogy:
- **The Crime Scene:** Represents your raw dataset.
- **Surveying the Area:** Corresponds to getting high-level [[NumPy - Summarizing Statistics|summary statistics]] (e.g., count, mean, min, max).
- **Taking Photographs:** Is like creating visualizations (histograms, scatter plots) to see the data from different perspectives.
- **Dusting for Fingerprints:** Represents looking for specific patterns, outliers, or relationships between variables using tools like a [[NumPy - Correlation Coefficient (np.corrcoef)|correlation matrix]].
- **Solving the Case:** Is the final goal of building a predictive model.

**Where it breaks down:** A crime scene is the result of intentional actions, and the detective is looking for a motive. Data, in most cases, doesn't have 'intent' in the same way; the patterns are simply a reflection of a process, and the goal is to understand that process, not to find a culprit.

```
      [ Raw Data ]
           │
           ▼
┌────────────────────┐
│  Data Profiling &  │
│   Sanity Checks    │
└────────────────────┘
           │
           ▼
┌────────────────────┐      ┌────────────────────┐
│ Summarize Stats    ├──────►   Visualize Data   │
│ (Mean, Median, Std)│      │ (Histograms, Plots)│
└────────────────────┘      └────────────────────┘
           │                          │
           └───────────▼──────────────┘
                  [ Insights & Hypotheses ]
                           │
                           ▼
                  [ Feature Engineering & Modeling ]
```

## Details

The core idea behind Exploratory Data Analysis (EDA) is to thoroughly investigate a dataset to discover its main characteristics before the main modeling task begins. As the context highlights, you can't simply look at millions of numbers; you need a systematic approach. EDA uses a combination of statistical summaries and graphical tools to uncover patterns, spot anomalies, check assumptions, and frame hypotheses. It's a philosophy of data analysis that prioritizes flexibility, investigation, and building a deep understanding of the data's story.

#### Primary Goal

To maximize insight into a dataset, uncover underlying structure, identify important variables, detect outliers and anomalies, and develop a better intuition for the data before formal modeling.

#### Mechanism

- **How it Works:** The process is iterative and investigative, generally following these phases:
    1. **Data Profiling & Quality Check:** The first step is to understand the basic shape and quality of the data. This involves checking for missing values, data types, and performing a basic [[NumPy - Data Sanity Check|data sanity check]] to ensure the values make sense.
    2. **Summarizing with Descriptive Statistics:** Quantify the main characteristics of each variable. This is where you calculate measures of central tendency and dispersion.
    3. **Visualizing Distributions:** Use plots to understand the distribution of individual variables (univariate analysis).
    4. **Exploring Relationships:** Use plots and statistical measures to understand how different variables interact with each other (bivariate and multivariate analysis).
- **Key Activities & Tools:**
    - **Descriptive Statistics:** Calculating single numbers that summarize the data.
        - *Example:* Using functions like `np.mean()`, `np.median()`, and `np.std()` to quickly grasp the center and spread of your data.
    - **Data Visualization:** Creating plots to see patterns visually.
        - *Example:* A histogram to see the frequency distribution of a single variable, or a scatter plot to see the relationship between two variables.
    - **Correlation Analysis:** Quantifying the strength and direction of the linear relationship between pairs of variables.
        - *Example:* Using `np.corrcoef()` to generate a correlation matrix, which helps identify which variables move together.

```python
import numpy as np
import matplotlib.pyplot as plt

# --- Step 1: Simulate some data (e.g., heights and weights) ---
# Let's pretend we're exploring a new dataset of 1000 people.
# We can use data simulation to create a realistic example.
np.random.seed(42)
heights = np.random.normal(175, 10, 1000) # mean=175cm, std=10cm
# Let's assume weight is correlated with height, plus some noise
weights = (heights * 0.8) + np.random.normal(0, 5, 1000) - 70

# --- Step 2: Summarize with Descriptive Statistics ---
print("--- Summary Statistics ---")
print(f"Average Height: {np.mean(heights):.2f} cm")
print(f"Median Height: {np.median(heights):.2f} cm")
print(f"Standard Deviation of Height: {np.std(heights):.2f} cm")
print(f"Correlation between Height & Weight: {np.corrcoef(heights, weights)[0, 1]:.2f}")

# --- Step 3: Visualize Distributions (Univariate) ---
plt.figure(figsize=(12, 5))
plt.subplot(1, 2, 1)
plt.hist(heights, bins=30, edgecolor='black')
plt.title('Distribution of Heights')
plt.xlabel('Height (cm)')
plt.ylabel('Frequency')

# --- Step 4: Explore Relationships (Bivariate) ---
plt.subplot(1, 2, 2)
plt.scatter(heights, weights, alpha=0.5)
plt.title('Height vs. Weight')
plt.xlabel('Height (cm)')
plt.ylabel('Weight (kg)')

plt.tight_layout()
plt.show()
```

 [[Code - Exploratory Data Analysis Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Key Questions to Guide Exploration:** EDA is driven by questions rather than configurable parameters. The 'levers' you pull are the questions you ask:
    - **What is the central tendency?** What is a typical value for this variable? (e.g., [[NumPy - Mean (np.mean)|Mean]], [[NumPy - Median (np.median)|Median]])
    - **How spread out is the data?** Are the values tightly clustered or widely dispersed? (e.g., [[NumPy - Standard Deviation (np.std)|Standard Deviation]], Range, Quartiles)
    - **What is the shape of the distribution?** Is it symmetric (like a normal distribution), skewed, or multimodal?
    - **Are there outliers?** Are there extreme values that might be errors or represent rare events?
    - **How do variables relate to each other?** Do they tend to increase or decrease together? (e.g., [[NumPy - Correlation Coefficient (np.corrcoef)|Correlation]])

#### Core Trade-offs

- **Benefit: Prevents 'Garbage In, Garbage Out'**
    - By understanding your data first, you can clean errors and make informed decisions, leading to more robust and reliable models. It's the single best defense against building a model on faulty assumptions.
- **Benefit: Guides Modeling Strategy**
    - Insights from EDA (e.g., discovering a skewed distribution or a non-linear relationship) directly inform which types of models to try, what features to create ([[Fundamental - Feature Engineering|feature engineering]]), and what data transformations are necessary.
- **Drawback: Can be Time-Consuming**
    - Thorough EDA is not a quick process, especially with complex, high-dimensional datasets. It requires patience and can take up a significant portion of a project's timeline.
- **Drawback: Risk of Spurious Discoveries**
    - If you look at enough charts and correlations, you are bound to find patterns just by chance. It's important to treat findings from EDA as hypotheses to be formally tested later, not as confirmed truths.

## Connections

```
                      (Parent)
               Fundamental - Statistics
                         ▲
                         │
          ┌──────────────┴──────────────┐
          │                             │
(Related) │  ┌───────────────────────────┐  │ (Related)
Data Sanity Check │ Exploratory Data Analysis │ Feature Engineering
          │  └───────────────────────────┘  │
          │                │                │
          └───────┬────────┴────────┬───────┘
                  │                 │
      Summarizing Statistics   Correlation Coefficient
                  │
        ┌─────────┴─────────┐
        │                   │
      Mean                Median
```

### Parent Concept

This concept is a core practice within the broader field of [[10 Utility Notes/Fundamental - Statistics.md|Fundamental - Statistics]], applying statistical concepts to gain initial insights.

### Child Concepts

- A primary activity is [[NumPy - Summarizing Statistics|summarizing statistics]], which involves calculating single values to describe the data's characteristics.
- A key measure of central tendency calculated during EDA is the [[NumPy - Mean (np.mean)|mean]], or arithmetic average.
- To resist the effect of outliers, analysts often use the [[NumPy - Median (np.median)|median]] as an alternative measure of centrality.
- Understanding the data's dispersion is achieved by calculating the [[NumPy - Standard Deviation (np.std)|standard deviation]].
- Investigating relationships between variables often involves calculating the [[NumPy - Correlation Coefficient (np.corrcoef)|correlation coefficient]].

### Related Concepts 

- The process of performing a [[NumPy - Data Sanity Check|data sanity check]] is an integral and early part of exploratory data analysis.
- Insights gained from EDA are foundational for the subsequent process of [[10 Utility Notes/Fundamental - Feature Engineering.md|Fundamental - Feature Engineering]].
- To practice EDA skills, one might use [[NumPy - Data Simulation with Random Distributions|data simulation]] to create datasets with known properties to explore.
## Questions

- Imagine you have only one day to perform EDA on a new, massive dataset for a fraud detection project. How would you prioritize your activities to deliver the most valuable initial insights to stakeholders, and what potential risks would you highlight due to the time constraint?
- When dealing with a dataset that's too large to fit into memory (e.g., terabytes), how would you adapt your EDA workflow? What tools or techniques (like sampling, streaming, or distributed computing frameworks) would you use to calculate summary statistics and generate visualizations?
- What if you were given a dataset with no column names or data dictionary? What creative EDA techniques could you employ to infer the meaning, data types, and relationships between the variables?
