---
tags: 
  - core
  - numpy
  - eda
  - summary_statistics
  - data_exploration
  - initial_analysis
  - concept
source: 
  - "[[Introduction to Python]]"
related: 
  - "[[Fundamental - Statistics]]"
  - "[[NumPy - Mean (np.mean)]]"
  - "[[NumPy - Median (np.median)]]"
  - "[[NumPy - Standard Deviation (np.std)]]"
  - "[[NumPy - Correlation Coefficient (np.corrcoef)]]"
  - "[[NumPy - Data Sanity Check]]"
  - "[[NumPy - Data Simulation with Random Distributions]]"
  - "[[NumPy - NumPy Functions vs Basic Python Functions]]"
  - "[[NumPy - Data Type Homogeneity & Calculation Speed Relationship]]"
  - "[[10 Utility Notes/Fundamental - Feature Engineering.md]]"
  - "[[Subject - Machine Learning]]"
  - "[[10 Utility Notes/Fundamental - Data Engineering.md]]"
  - "[[NumPy - Stacking Arrays (np.column_stack)]]"
---
# Core: Exploratory Data Analysis with NumPy

## Summary

>Given a dataset, like a 2D NumPy array of heights and weights, Exploratory Data Analysis (EDA) is the crucial first step of investigating the data to discover its main characteristics. Instead of just staring at raw numbers, you ask questions and answer them with summary statistics. This process involves calculating measures of central tendency like the [[NumPy - Mean (np.mean)|mean]] and [[NumPy - Median (np.median)|median]], measures of spread like the [[NumPy - Standard Deviation (np.std)|standard deviation]], and relationships between variables using the [[NumPy - Correlation Coefficient (np.corrcoef)|correlation coefficient]] to build an initial understanding of the data's story.

**Why This Matters:** Exploratory Data Analysis (EDA) transforms raw, meaningless numbers into actionable insights by revealing the underlying structure, patterns, and anomalies in a dataset before you commit to building a model.

_Analogy:_ _EDA is like being a detective arriving at a crime scene. The raw data (the 5000 height/weight pairs) is the scene itself—a collection of facts. The detective doesn't just stare at everything; they start measuring distances, checking for fingerprints, and looking for relationships between objects. These initial measurements (calculating mean, median, standard deviation) are the summary statistics that help form a preliminary theory of what happened._

*   **Where it breaks down:** A detective's investigation often leads to a single, definitive conclusion about 'what happened'. EDA, however, is often open-ended. It generates hypotheses and reveals patterns but doesn't necessarily provide a single 'correct' answer; it guides the next steps in a data analysis or machine learning project.

```
[ Raw Data ]      --->   [ Sanity Check ]   --->   [ Calculate Stats ]   --->   [ Find Relationships ]   --->   [ Insights ]
(5000x2 Array)          (shape, min, max)          (mean, median, std)          (correlation)                 (hypotheses)
```

## Details

When confronted with a large dataset, such as a 2D NumPy array of 5000 heights and weights, simply staring at the numbers is overwhelming and yields no insights. Exploratory Data Analysis (EDA) is the crucial first step in any data-driven project, acting as a reconnaissance mission. It uses statistical methods to summarize the main characteristics of a dataset. With NumPy, we can efficiently compute these summaries to get a quick but powerful overview of our data's landscape, from identifying the average person's height to spotting potential data entry errors or understanding the strength of the relationship between variables.

#### Primary Goal

To uncover initial patterns, spot anomalies, test hypotheses, and check assumptions using summary statistics before diving into more complex modeling.

#### Mechanism

- **Step 1: Simulate the Data**
    - First, we create a realistic-looking dataset. We can use NumPy's random number generation to simulate height and weight data for 5000 adults, a process detailed in [[NumPy - Data Simulation with Random Distributions|data simulation]]. We'll then combine them into a single 2D array using [[NumPy - Stacking Arrays (np.column_stack)|np.column_stack]].
- **Step 2: Perform a Sanity Check**
    - Before any analysis, we perform a [[NumPy - Data Sanity Check|data sanity check]]. We inspect the array's shape to confirm we have 5000 rows and 2 columns, and check the minimum and maximum values to ensure they are within a reasonable range (e.g., no negative heights).
- **Step 3: Calculate Measures of Central Tendency**
    - We compute the 'typical' values for height and weight. This involves using [[NumPy - Mean (np.mean)|np.mean]] to find the average and [[NumPy - Median (np.median)|np.median]] to find the middle value, which is less sensitive to extreme outliers.
- **Step 4: Calculate Measures of Spread**
    - To understand how much the data varies, we calculate the [[NumPy - Standard Deviation (np.std)|np.std]]. A small standard deviation means most people are close to the average height, while a large one indicates a wide range of heights.
- **Step 5: Analyze Relationships**
    - Finally, we investigate how height and weight relate to each other. We use the [[NumPy - Correlation Coefficient (np.corrcoef)|np.corrcoef]] to get a single number that tells us the direction and strength of their linear relationship.

##### Code Translation

```python
import numpy as np

# --- Step 1: Simulate the Data ---
# Simulate height (average 170cm, std 10cm) and weight (average 75kg, std 15kg)
np.random.seed(42)
height = np.random.normal(loc=170, scale=10, size=5000)
weight = np.random.normal(loc=75, scale=15, size=5000)
# Stack them into a single 2D array
city_data = np.column_stack((height, weight))

# --- Step 2: Perform a Sanity Check ---
print(f"Data shape: {city_data.shape}")
print(f"Min height: {np.min(city_data[:, 0]):.2f}, Max height: {np.max(city_data[:, 0]):.2f}")
print(f"Min weight: {np.min(city_data[:, 1]):.2f}, Max weight: {np.max(city_data[:, 1]):.2f}")

# --- Step 3: Calculate Measures of Central Tendency ---
mean_height = np.mean(city_data[:, 0])
median_height = np.median(city_data[:, 0])
mean_weight = np.mean(city_data[:, 1])
median_weight = np.median(city_data[:, 1])
print(f"\nMean height: {mean_height:.2f} cm, Median height: {median_height:.2f} cm")
print(f"Mean weight: {mean_weight:.2f} kg, Median weight: {median_weight:.2f} kg")

# --- Step 4: Calculate Measures of Spread ---
std_height = np.std(city_data[:, 0])
std_weight = np.std(city_data[:, 1])
print(f"\nStandard Deviation of height: {std_height:.2f} cm")
print(f"Standard Deviation of weight: {std_weight:.2f} kg")

# --- Step 5: Analyze Relationships ---
correlation_matrix = np.corrcoef(city_data[:, 0], city_data[:, 1])
correlation = correlation_matrix[0, 1]
print(f"\nCorrelation between height and weight: {correlation:.2f}")
```

 [[Code - Exploratory Data Analysis with NumPy Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Scope of Analysis**
    - **Variable Selection:** Deciding which columns (variables) to analyze. Do we look at height and weight individually, or focus on their relationship?
    - **Segmentation:** Choosing whether to analyze the entire dataset or segment it by groups (e.g., analyzing males and females separately, if that data were available). This can reveal patterns hidden in the aggregate data.
    - **Choice of Statistics:** Selecting the appropriate summary statistics. For skewed data, the [[NumPy - Median (np.median)|median]] might be more informative than the [[NumPy - Mean (np.mean)|mean]]. For non-linear relationships, the correlation coefficient might be misleading.

#### Core Trade-offs

- **NumPy-Only Limitations**
    - **Lack of Visualization:** NumPy is a numerical computing library, not a plotting library. True EDA heavily relies on visualizations (histograms, scatter plots) to build intuition, which requires libraries like Matplotlib or Seaborn.
    - **No Contextual Labels:** NumPy arrays are just numbers. For complex datasets with many columns, managing them without labels (like in a Pandas DataFrame) can be cumbersome and error-prone.
    - **Limited Group-By Functionality:** While possible, performing complex grouped analyses (e.g., 'calculate the average height for each city district') is much less straightforward in NumPy compared to libraries designed for data manipulation like Pandas.

## Connections

```
                  (Parent)
            Fundamental - Statistics
                       ▲
                       │
       ┌───────────────┼────────────────────────────┐
       │               │                            │
(Foundation)  ┌───────────────────────────────────┐     (Next Step)
Data Sanity Check │ Exploratory Data Analysis with NumPy│     Feature Engineering
              └───────────────────────────────────┘
                         │
              ┌──────────┴──────────┐
              │                     │
       Mean / Median          Std / Correlation
    (Central Tendency)           (Spread / Rel.)
```

### Parent Concept

Exploratory Data Analysis is a practical application of the principles covered in [[10 Utility Notes/Fundamental - Statistics.md|Fundamental - Statistics]], using computational tools to uncover insights from data.

### Child Concepts

- A core part of EDA involves calculating measures of central tendency, such as the [[NumPy - Mean (np.mean)|mean]], to find the 'average' value.
- To understand the typical value without being skewed by outliers, EDA often uses the [[NumPy - Median (np.median)|median]].
- To quantify the variability or spread of the data, EDA relies on the [[NumPy - Standard Deviation (np.std)|standard deviation]].
- To understand how two variables move together, EDA uses the [[NumPy - Correlation Coefficient (np.corrcoef)|correlation coefficient]].

### Related Concepts 

- The process of EDA always begins with a [[NumPy - Data Sanity Check|data sanity check]] to ensure the data is sound before analysis.
- EDA is often performed on simulated data, which can be generated using techniques from [[NumPy - Data Simulation with Random Distributions|data simulation]], to test analysis pipelines.
- The insights gained from EDA are foundational for the subsequent process of [[10 Utility Notes/Fundamental - Feature Engineering.md|feature engineering]].
- Understanding the performance benefits of [[NumPy - NumPy Functions vs Basic Python Functions|NumPy functions over basic Python]] is key to performing EDA efficiently on large datasets.
## Questions

- Your EDA on the height/weight data reveals a strong positive correlation. A stakeholder asks you to build a predictive model immediately. How would you explain the business risk of skipping further analysis (like checking for outliers or confounding variables) even when the initial results look promising?
- Imagine this survey data grows from 5,000 to 50 million records, stored in a distributed file system. How would your NumPy-based EDA script need to change? What tools or architectural patterns (e.g., Dask, Spark) would you consider to perform these summary calculations without loading all the data into one machine's memory?
- What if you were told that all summary statistics (mean, median, std, correlation) are misleading and you were forbidden from using them? How would you conduct an 'exploratory data analysis' on the raw 2D NumPy array to derive insights?