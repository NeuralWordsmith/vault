---
tags: 
  - core
  - python
  - fillna
  - imputation
  - missing_data
  - pandas
  - data_cleaning
  - concept
source: 
  - "[[Cleaning Data in Python]]"
related: 
  - "[[Python - Handling Missing Data in Pandas]]"
  - "[[Python - Dropping Missing Data with .dropna()]]"
  - "[[Python - Missing Data (NaN)]]"
  - "[[Python - Detecting Missing Data in Pandas]]"
  - "[[Python - Data Completeness]]"
  - "[[Python - Types of Missing Data]]"
  - "[[Python - Missing Completely At Random (MCAR)]]"
  - "[[Python - Missing At Random (MAR)]]"
  - "[[Python - Missing Not At Random (MNAR)]]"
  - "[[Fundamental - Feature Engineering]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[NumPy - Exploratory Data Analysis with NumPy]]"
  - "[[Fundamental - Statistics]]"
---
# Core: Imputing Missing Data with .fillna()

## Summary

>In the Pandas library, `.fillna()` is a versatile method used to replace missing values, represented as `NaN` (Not a Number), with specified non-null data. It is a primary technique for data imputation, a core strategy for [[Python - Handling Missing Data in Pandas|handling missing data]]. Unlike [[Python - Dropping Missing Data with .dropna()|dropping data]], which removes entire rows or columns, imputation with `.fillna()` preserves the dataset's dimensions. The method can accept a single static value, a dictionary to impute different values for different columns, or even apply advanced filling strategies like forward or backward propagation.

**Why This Matters:** Using `.fillna()` is a crucial data cleaning step that preserves valuable data points, preventing the loss of information that occurs when dropping rows and enabling more robust statistical analysis and machine learning modeling.

_Analogy:_ _Think of `.fillna()` as a school's policy for handling an absent teacher. When a teacher (an original data point) is unexpectedly absent (a `NaN` value), the school doesn't just cancel the class for all students (i.e., drop the entire row of data). Instead, the administration (the data scientist) sends in a substitute teacher (the imputed value) to fill the gap. The substitute might be a generalist who knows the average lesson plan (imputing with the mean), or a specialist in that subject if one is available (imputing with a value based on domain knowledge)._

• **Original Teacher:** The true, unobserved data point.
• **Teacher's Absence:** A missing or `NaN` value in the dataset.
• **The School Administration:** The data scientist or analyst deciding on the imputation strategy.
• **The Substitute Teacher:** The imputed value provided by `.fillna()`.
• **The Lesson Plan:** The imputation strategy (e.g., using the mean, median, a constant, or a custom value).
• **Where it breaks down:** A substitute teacher, while keeping the class running, may not have the same expertise or deliver the lesson identically to the original teacher. Similarly, an imputed value is an estimate, not the true value. Overusing a single substitute (like the mean) can make all the classes seem more similar than they really are, reducing the overall variance and potentially biasing the students' (the model's) understanding of the subject.

```
Before .fillna():
+-------+-------------+------+
| Index | Temperature | CO2  |
+-------+-------------+------+
|   0   |     8.5     | 2.5  |
|   1   |    21.8     | 0.0  |
|   2   |     6.3     | 1.0  |
|   3   |    -31.0    | NaN  |  <-- Missing Value
|   4   |    19.9     | 0.1  |
+-------+-------------+------+

After .fillna({'CO2': 1.739584}):
+-------+-------------+----------+
| Index | Temperature |   CO2    |
+-------+-------------+----------+
|   0   |     8.5     | 2.500000 |
|   1   |    21.8     | 0.000000 |
|   2   |     6.3     | 1.000000 |
|   3   |    -31.0    | 1.739584 |  <-- Imputed Value
|   4   |    19.9     | 0.100000 |
+-------+-------------+----------+
```

## Details

After [[Python - Detecting Missing Data in Pandas|detecting missing values]] in a dataset, a critical decision is how to handle them. While [[Python - Dropping Missing Data with .dropna()|dropping data]] is a straightforward option, it can lead to significant information loss, especially if the missingness is widespread. The `.fillna()` method in Pandas provides a more nuanced alternative: imputation. It allows us to programmatically replace `NaN` values with a specified placeholder. As shown in the context, a common strategy is to use a statistical measure like the mean or median. However, its real power lies in its flexibility, such as accepting a dictionary to apply column-specific imputations, which is essential when dealing with diverse data types.

#### Primary Goal

To replace missing (`NaN`) values in a Pandas DataFrame or Series with specified non-null values, thereby ensuring data completeness for subsequent analysis or modeling.

#### Mechanism

- **Step 1: Calculate the Imputation Value**
    - First, determine the strategy for replacement. A common approach for numerical data is to calculate a measure of central tendency. In the provided example, the mean of the 'CO2' column is calculated and stored in a variable.
- **Step 2: Construct the Replacement Mapping**
    - To apply different imputation values to different columns, `.fillna()` accepts a dictionary. The keys of the dictionary should be the column names, and the values should be the desired replacement values for those columns.
- **Step 3: Apply the `.fillna()` Method**
    - Call the `.fillna()` method on the target DataFrame, passing the mapping dictionary as an argument. This operation returns a new DataFrame where the `NaN` values in the specified columns have been replaced.

##### Code Translation

```python
import pandas as pd
import numpy as np

# Create a sample DataFrame with missing data
data = {'Date': ['05/03/2005', '23/08/2004', '18/02/2005', '08/02/2005', '13/03/2005'],
        'Temperature': [8.5, 21.8, 6.3, -31.0, 19.9],
        'CO2': [2.5, 0.0, 1.0, np.nan, 0.1]}
airquality = pd.DataFrame(data)

print("Original DataFrame:")
print(airquality)

# --- Step 1: Calculate the Imputation Value ---
# Calculate the mean of the 'CO2' column, excluding the NaN value
co2_mean = airquality['CO2'].mean()
print(f"\nCalculated Mean for CO2: {co2_mean:.6f}") # Should be ~1.739584 based on context

# --- Step 2: Construct the Replacement Mapping ---
# Create a dictionary to specify which column to fill and with what value
imputation_map = {'CO2': co2_mean}

# --- Step 3: Apply the .fillna() Method ---
# Fill the missing values using the dictionary
airquality_imputed = airquality.fillna(imputation_map)

print("\nImputed DataFrame:")
print(airquality_imputed)
```

 [[Code - Imputing Missing Data with .fillna() Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`value`**: The primary parameter used to specify the replacement. It can be a single value (scalar) to fill all NaNs, or a dictionary/Series/DataFrame to provide specific values for specific columns/indices.
    - Example: `df.fillna(0)` fills all missing values with 0.
    - Example: `df.fillna({'col_A': 10, 'col_B': 20})` fills NaNs in `col_A` with 10 and in `col_B` with 20.
- **`method`**: An alternative to `value` for propagation-based filling.
    - `'ffill'` or `'pad'`: Forward-fill. Propagates the last valid observation forward to the next.
    - `'bfill'` or `'backfill'`: Backward-fill. Uses the next valid observation to fill a gap.
- **`inplace`**: A boolean that determines whether the operation modifies the DataFrame directly (`True`) or returns a new, modified DataFrame (`False`). The default is `False`, which is generally safer practice.

#### Core Trade-offs

- **Pro (Data Preservation)**: The main advantage over [[Python - Dropping Missing Data with .dropna()|dropping data]] is that it retains all observations, preserving other valuable information contained in the rows with missing values.
- **Con (Bias and Variance Distortion)**: Imputing with a single value like the mean or median reduces the natural variance of the data. This can make the data appear less spread out than it truly is and can bias statistical estimates like standard deviation and correlation.
- **Con (Distortion of Relationships)**: Filling missing values can artificially strengthen or weaken the relationships between variables. For instance, if you impute missing 'CO2' values with the mean, the relationship between 'CO2' and 'Temperature' for those imputed points is lost.
- **Risk (Inappropriate for Certain Missingness Types)**: Simple imputation is most defensible for [[Python - Missing Completely At Random (MCAR)|MCAR]] data. If data is [[Python - Missing Not At Random (MNAR)|MNAR]], the fact that a value is missing is itself informative. Replacing it with a simple statistic can mask this information and lead to incorrect conclusions.

## Connections

```
                  (Parent)
        Handling Missing Data in Pandas
                   ▲
                   │
┌──────────────────┼──────────────────┐
│                  │                  │
(Alternative) ┌──────────────────┐ (Alternative)
Dropping Data │ Imputing with    │ More Advanced Imputation
(.dropna)     │ .fillna()        │ (e.g., MICE, KNN)
              └──────────────────┘
                   │
                   ▼
             (Foundation For)
        Data Preprocessing for ML
```

### Parent Concept

This method is a primary strategy within the broader topic of [[Python - Handling Missing Data in Pandas|handling missing data in Pandas]].

### Child Concepts



### Related Concepts 

- It directly contrasts with [[Python - Dropping Missing Data with .dropna()|dropping missing data]], which removes observations entirely instead of replacing values.
- The effectiveness of this method depends heavily on the [[Python - Types of Missing Data|type of missing data]]; it's generally safer for MCAR than for MAR or MNAR.
- It is a fundamental step in achieving [[Python - Data Completeness|data completeness]] before feeding data into analytical models.
## Questions

- You're analyzing customer transaction data, and 15% of the 'average_purchase_value' is missing. The business wants to build a model to predict customer churn. Would you impute with the mean, the median, or drop the rows? Justify your choice in terms of its potential impact on the churn model's accuracy and the financial implications of misclassifying a high-value customer.
- Imagine a real-time data pipeline where sensor readings arrive every second, but some readings are frequently missing. How would you design a system using `.fillna()` that can handle this stream? Would you use a static mean calculated once, a rolling window mean, or another method like forward-fill (`ffill`)? What are the latency and memory trade-offs of your choice?
- What if, instead of a single value, you were tasked with imputing missing values in a way that *preserves* the original column's variance as much as possible? How might you use `.fillna()` in combination with other functions (e.g., from NumPy's random module) to achieve this, and what new risks would this 'stochastic imputation' introduce?