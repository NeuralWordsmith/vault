---
tags: 
  - process
  - python
  - missingness
  - data exploration
  - eda
  - data quality
  - pandas
  - concept
source: 
  - "[[Cleaning Data in Python]]"
related: 
  - "[[Python - Missing Data (NaN)]]"
  - "[[Python - Detecting Missing Data in Pandas]]"
  - "[[Python - Types of Missing Data]]"
  - "[[Python - Missing Not At Random (MNAR)]]"
  - "[[Python - Handling Missing Data in Pandas]]"
  - "[[Python - Dropping Missing Data with .dropna()]]"
  - "[[Python - Imputing Missing Data with .fillna()]]"
  - "[[Python - Visualizing Missing Data with missingno]]"
  - "[[Python - Data Completeness]]"
  - "[[Fundamental - Feature Engineering]]"
  - "[[NumPy - Exploratory Data Analysis with NumPy]]"
  - "[[Python - Missing At Random (MAR)]]"
  - "[[Python - Missing Completely At Random (MCAR)]]"
---
# Process: Investigating Missing Data Patterns

**Why This Matters:** Understanding the *why* behind missing data is crucial for choosing the correct imputation or removal strategy, preventing biased models and flawed conclusions.
## Goal & Analogy

> **Goal:** Investigating missing data patterns is the process of diagnosing the root cause of missing values by looking for systematic relationships between the absence of data in one feature and the values of other features. It's a critical diagnostic step that comes after [[Python - Detecting Missing Data in Pandas|detecting missing data]] and before deciding on a handling strategy, such as [[Python - Dropping Missing Data with .dropna()|dropping]] or [[Python - Imputing Missing Data with .fillna()|imputing]] the values. This investigation helps determine the underlying [[Python - Types of Missing Data|type of missingness]], which has significant implications for model performance and bias.

_Analogy:_ _Imagine you're a detective investigating a series of 'missing person' cases in a town. The missing persons are your `NaN` values. Simply having a list of who is missing isn't enough to solve the case. To find a pattern, you separate the case files into two piles: one for the 'missing' people and one for everyone else who is 'not missing'. You then compare the characteristics of the two groups. If you find that everyone in the 'missing' pile went to the same coffee shop on the day they disappeared, you've uncovered a crucial pattern. The coffee shop didn't *cause* them to disappear, but it's strongly correlated with the event._

**Where it breaks down:** A detective aims to prove causation. This data analysis technique, however, only reveals correlation. In our example, we found that missing CO2 values are correlated with low temperatures, but we can't prove the temperature *caused* the sensor to fail—only that the failure happens under those conditions.

```
Original DataFrame (airquality)
        │
        ▼
┌───────┴───────┐
│ .isna() check │
│ on 'CO2' col  │
└───────┬───────┘
        │
┌───────▼───────┬───────────────┐
│               │               │
▼               ▼               ▼
DataFrame `missing` │ DataFrame `complete`
(CO2 is NaN)        │ (CO2 has values)
│               │
▼               ▼
.describe()     .describe()
│               │
└───────▼───────┘
        │
        ▼
Compare Statistics
(e.g., Temperature mean, min, max)
        │
        ▼
  Identify Pattern
(e.g., Missing CO2 correlates with low temp)
```

## The Step-by-Step Process

### Prerequisites / Inputs

- **Target Column:** The primary 'lever' is the column you choose to investigate for missingness. The entire analysis is oriented around understanding why this specific column has `NaN`s.
- **Comparison Columns:** These are the other features in your dataset. The goal is to see if their distributions change depending on whether the target column is missing. The effectiveness of the technique depends on having relevant comparison columns.
- **Statistical Method:** While `.describe()` is the standard for numeric data, the core idea can be adapted. For categorical features, you could use `.value_counts(normalize=True)` on both subsets to compare their distributions.

### The Steps

- **Step 1: Isolate Data Subsets**
    - First, partition the original DataFrame into two new ones. One DataFrame (`missing`) will contain only the rows where the target column (e.g., 'CO2') has `NaN` values. The other DataFrame (`complete`) will contain all the rows where the target column has valid data.
- **Step 2: Generate Descriptive Statistics**
    - Use the `.describe()` method on both the `missing` and `complete` DataFrames. This computes summary statistics (count, mean, standard deviation, min, max, etc.) for all the numeric columns in each subset.
- **Step 3: Compare and Hypothesize**
    - Carefully compare the output of `.describe()` for both subsets. Look for significant differences in the statistics of *other* columns. In the example, the mean, min, and max 'Temperature' for the `missing` DataFrame are drastically lower than for the `complete` DataFrame. This strongly suggests that the mechanism causing CO2 data to be missing is related to temperature.

##### Code Translation

```python
import pandas as pd
import numpy as np

# Assume 'airquality' is a pre-existing DataFrame
# For demonstration, let's create a similar one:
data = {
    'Temperature': np.concatenate([np.random.uniform(-50, -30, 30), np.random.uniform(-2, 45, 70)]),
    'CO2': np.concatenate([np.full(30, np.nan), np.random.uniform(0, 12, 70)])
}
airquality = pd.DataFrame(data)

# --- Step 1: Isolate Data Subsets ---
# Isolate rows with missing CO2 values
missing = airquality[airquality['CO2'].isna()]

# Isolate rows with complete CO2 values (using ~ to invert the boolean mask)
complete = airquality[~airquality['CO2'].isna()]


# --- Step 2: Generate Descriptive Statistics ---
print("--- Statistics for rows with MISSING CO2 ---")
print(missing.describe())

print("\n--- Statistics for rows with COMPLETE CO2 ---")
print(complete.describe())

# --- Step 3: Compare and Hypothesize ---
# By comparing the 'Temperature' column in both outputs, we'd see that
# the mean, min, and max temperatures are much lower for the 'missing' group,
# confirming the pattern.
```

### Deliverables / Outputs

After identifying that a dataset has [[Python - Missing Data (NaN)|missing values]], the next critical step is to understand their nature. Are they scattered randomly, or is there a hidden pattern? The technique demonstrated in the context is a powerful method for this investigation. By isolating the rows with missing data and comparing their statistical summary to the rows with complete data, we can uncover systematic differences. In the `airquality` example, this comparison reveals that CO2 measurements are exclusively lost at very low temperatures, a clear sign of [[Python - Missing Not At Random (MNAR)|Missing Not At Random (MNAR)]] data.

## Context & Tradeoffs

### When to Use This Process

To determine if missing data in one column is random or if it's systematically related to the values of other columns, which informs how to properly handle it.

### Common Pitfalls & Tradeoffs

- **Pro: Reveals Hidden Bias:** This is a powerful and simple method to uncover systematic issues in data collection, which could otherwise lead to heavily biased models.
- **Con: Correlation, Not Causation:** The method only highlights correlations. It shows that low temperatures and missing CO2 values co-occur, but it doesn't prove the former causes the latter. External domain knowledge is needed to confirm the causal link (e.g., knowing the sensor's operating range).
- **Con: Manual and Time-Consuming:** Performing this check manually for every column with missing data in a wide dataset is inefficient. For a quick, high-level overview, a graphical approach using a tool like `[[Python - Visualizing Missing Data with missingno|missingno]]` is often a better first step.

## Connections

```
                      (Parent)
            Detecting Missing Data in Pandas
                           ▲
                           │
           ┌───────────────┼────────────────────────────┐
           │               │                            │
(Visual Alternative) ┌───────────────────────────┐ (Next Step)
Visualizing Missing  │ Investigating Missing     │ Types of Missing Data
Data with missingno  │ Data Patterns             │ (e.g., MNAR)
                     └───────────────────────────┘
                                  │
                       ┌──────────┴──────────┐
                       │                     │
           Dropping Missing Data     Imputing Missing Data
           with .dropna()          with .fillna()
```


- This technique is a direct follow-up to [[Python - Detecting Missing Data in Pandas|detecting missing data]] in a DataFrame.
- The insights gained are crucial for correctly identifying the [[Python - Types of Missing Data|type of missingness]], such as [[Python - Missing Not At Random (MNAR)|MNAR]].
- It provides the justification for choosing a specific strategy from the various [[Python - Handling Missing Data in Pandas|methods for handling missing data]].
- [[Python - Visualizing Missing Data with missingno|Visualizing missing data]] offers a graphical and often faster alternative to this manual statistical comparison.

## Deeper Questions

- Imagine this analysis reveals that missing CO2 values are strongly correlated with a specific, rare weather event. Dropping these rows would remove all data from that event, potentially biasing your climate model. Imputing might introduce artificial data. How would you decide which risk is more acceptable for a model intended to predict air quality during extreme weather?
- You're building an automated data ingestion pipeline. How would you implement a system to automatically flag potential MNAR patterns like this one as new data streams in, without requiring manual inspection of `.describe()` outputs every time?
- What if the relationship wasn't in the mean or min/max, but in the variance? For example, what if temperature was much more volatile (high standard deviation) when the CO2 sensor failed? How would the `.describe()` comparison still help, and what other statistical tests might you use to confirm this more subtle pattern?