---
tags: 
  - core
  - numpy
  - data_validation
  - exploratory_data_analysis
  - eda
  - data_quality
  - outlier_detection
  - concept
source: 
  - "[[Introduction to Python]]"
related: 
  - "[[NumPy - Exploratory Data Analysis with NumPy]]"
  - "[[NumPy - Summarizing Statistics]]"
  - "[[NumPy - Mean (np.mean)]]"
  - "[[NumPy - Median (np.median)]]"
  - "[[NumPy - Standard Deviation (np.std)]]"
  - "[[Fundamental - Statistics]]"
  - "[[Data - Data Cleaning]]"
  - "[[Data - Data Validation]]"
  - "[[ML - Outlier Detection]]"
  - "[[Data - Feature Scaling]]"
  - "[[NumPy - Correlation Coefficient (np.corrcoef)]]"
  - "[[Data - Missing Value Imputation]]"
  - "[[NumPy - Data Simulation with Random Distributions]]"
---
# Core: Sanity Checking with Summarizing Statistics

## Summary

>A sanity check is the informal process of using basic descriptive statistics to quickly verify if data values are plausible and fall within an expected range. It involves calculating metrics like mean, median, and standard deviation to spot obvious errors, such as data entry mistakes or measurement unit inconsistencies, before diving into more complex analysis. This is a crucial first step in any [[NumPy - Exploratory Data Analysis with NumPy|Exploratory Data Analysis (EDA)]] workflow.

**Why This Matters:** This initial check is the first line of defense against the 'garbage in, garbage out' problem, preventing flawed data from corrupting an entire analysis or machine learning model.

_Analogy:_ _A sanity check is like a chef tasting a spoonful of broth before serving the entire pot of soup. The chef isn't analyzing the complex chemical composition of every ingredient. They are quickly checking for fundamental qualities: Is it too salty? Is it burnt? Is it reasonably warm? This quick taste test immediately flags any major, show-stopping problems that would ruin the dish for everyone, without needing a full laboratory analysis._

The broth represents your dataset. The chef is the data analyst. The quick taste is the calculation of summarizing statistics (mean, min, max). A 'too salty' result is like finding an average human weight of 2000 kg—an obvious error. 

*   **Where it breaks down:** The taste test can't detect subtle issues, like whether a specific, less common herb is missing or if the sodium level is 5% higher than the recipe specified. Similarly, sanity checks are great for catching gross errors but will miss more nuanced data quality problems or complex biases.

```
Data Input --> Calculate Stats (Mean, Max, etc.) --> Compare to Expectations --> [Plausible?] --> YES --> Proceed with Analysis
                                                                                   |
                                                                                   V
                                                                                   NO --> Flag & Investigate Data
```

## Details

Often, before any sophisticated modeling begins, you need to get a basic feel for your data. Summarizing statistics provide this quick overview, acting as a 'sanity check'. As the context highlights, if you're analyzing human weight and calculate an average of 2000 kilograms, you don't need a complex model to know something is fundamentally wrong. Your measurements are likely incorrect, perhaps recorded in grams instead of kilograms. This process uses simple metrics to ensure the data aligns with real-world expectations and common sense, catching glaring errors early.

#### Primary Goal

To rapidly identify and flag obviously incorrect or implausible data points before they can skew analysis or model training.

#### Mechanism

- **How it Works:** The process is a straightforward comparison of statistical outputs against domain knowledge.
    1.  **Calculate Summaries:** Use a library like NumPy to compute basic [[NumPy - Summarizing Statistics|summarizing statistics]] for the feature(s) in question. This typically includes measures of central tendency and dispersion.
    2.  **Apply Domain Knowledge:** Compare the calculated statistics to what is known about the real world. Does the minimum and maximum make sense? Is the average plausible?
    3.  **Investigate Anomalies:** If a statistic is wildly out of line (e.g., a negative value for age, a human height of 50 meters), flag the data for further investigation. The error could be a unit conversion issue, a data entry typo, or a sensor malfunction.
- **Key Statistical Checks:**
    - **Mean:** Calculated with [[NumPy - Mean (np.mean)|np.mean]], this is often the first check. It's sensitive to extreme outliers, which can make it a good indicator of a problem. *Example: An average transaction amount of $5 million for a local coffee shop is a red flag.*
    - **Median:** Calculated with [[NumPy - Median (np.median)|np.median]], this provides the middle value. Comparing it to the mean can reveal skewness caused by outliers. *Example: If the mean house price is $1.2M but the median is $450k, it suggests a few mansions are skewing the average.*
    - **Standard Deviation:** Calculated with [[NumPy - Standard Deviation (np.std)|np.std]], this measures the spread of data. An unusually high standard deviation can indicate inconsistent measurements or the presence of extreme outliers. *Example: A standard deviation of 50 degrees for daily temperature readings in a temperate climate suggests faulty sensor data.*
    - **Min/Max Values:** The simplest check of all. Are the minimum and maximum values physically possible? *Example: A 'percentage_complete' feature with a max value of 150 is clearly an error.*

##### Code Translation

```python
import numpy as np

# --- Step 1: Prepare the Data ---
# Imagine this data represents the weights of adult males in kilograms.
# One value was accidentally entered in grams (90000) instead of kg (90.0).
weights_kg = np.array([85.5, 92.1, 78.3, 90000.0, 88.7, 95.2])

# --- Step 2: Calculate Summaries ---
mean_weight = np.mean(weights_kg)
median_weight = np.median(weights_kg)
std_dev_weight = np.std(weights_kg)
min_weight = np.min(weights_kg)
max_weight = np.max(weights_kg)

print(f"Mean: {mean_weight:.2f} kg")
print(f"Median: {median_weight:.2f} kg")
print(f"Standard Deviation: {std_dev_weight:.2f} kg")
print(f"Max Weight: {max_weight:.2f} kg")

# --- Step 3: Apply Domain Knowledge & Investigate ---
# A reasonable upper limit for human weight might be 300 kg.
if max_weight > 300 or mean_weight > 150:
    print("\nSANITY CHECK FAILED: The weight data seems highly implausible.")
    print("The mean and max values are far beyond normal human ranges.")
    print("Check for data entry errors or unit inconsistencies (e.g., grams vs. kg).")

# Output:
# Mean: 15073.30 kg
# Median: 90.40 kg
# Standard Deviation: 36709.85 kg
# Max Weight: 90000.00 kg
#
# SANITY CHECK FAILED: The weight data seems highly implausible.
# The mean and max values are far beyond normal human ranges.
# Check for data entry errors or unit inconsistencies (e.g., grams vs. kg).
```

 [[Code - Sanity Checking with Summarizing Statistics Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Choice of Statistics:** The specific statistics you choose depend on the data's nature. For skewed data, the median is a more robust check than the mean. For categorical data, you'd check value counts and frequencies instead of a mean.
- **Plausibility Thresholds:** These are the implicit or explicit boundaries you define based on domain knowledge (e.g., human age must be > 0 and < 130). Setting these requires understanding the context of the data.
- **Granularity of Checks:** You can perform sanity checks on the entire dataset, on specific segments (e.g., check average height for males and females separately), or on data from different time periods to ensure consistency.

#### Core Trade-offs

- **Detects Gross Errors, Misses Subtle Ones:** Sanity checking is excellent for catching a weight of '2000 kg' but will not catch a weight of '90 kg' that was supposed to be '85 kg'. It is a coarse, not a fine, filter.
- **Dependent on Domain Knowledge:** The effectiveness of a sanity check is entirely dependent on the quality of the assumptions you make. If your domain knowledge is wrong, your sanity check may incorrectly flag valid data or miss actual errors.
- **Not a Substitute for Rigorous Validation:** This is an informal, exploratory step. It does not replace formal data validation pipelines that might check for data types, formats, ranges, and inter-variable consistency in an automated, systematic way.

## Connections

```
                      (Parent)
            Exploratory Data Analysis
                        ▲
                        │
┌───────────────────────┼───────────────────────┐
│                       │                       │
(Tool)         ┌───────────────────────────┐      (Metric)
Summarizing    │ Sanity Checking with      │      Mean / Median
Statistics     │ Summarizing Statistics    │
               └───────────────────────────┘
```

### Parent Concept

This process is a fundamental component of [[NumPy - Exploratory Data Analysis with NumPy|Exploratory Data Analysis (EDA)]], representing one of the very first steps taken to understand a new dataset.

### Related Concepts 

- This process is the primary application of [[NumPy - Summarizing Statistics|summarizing statistics]], which provide the high-level numbers needed for the check.
- Specific metrics like the [[NumPy - Mean (np.mean)|mean]] and [[NumPy - Median (np.median)|median]] are the workhorses of sanity checking, each offering a different view of the data's central point.
- The [[NumPy - Standard Deviation (np.std)|standard deviation]] is crucial for sanity checking the dispersion of data, helping to identify if the spread of values is plausible.
- The efficiency of these checks is greatly enhanced by the performance of NumPy, highlighting the importance of the [[NumPy - NumPy Functions vs Basic Python Functions|relationship between NumPy and basic Python functions]] for data work.
## Questions

- You have a tight deadline to ship a fraud detection model. You could spend an extra week implementing a comprehensive suite of automated sanity checks for all 50 input features, or you could ship the model now after a brief manual check. How do you decide, and how would you explain the risk/reward of your choice to the product manager?
- How would you design an automated, real-time sanity checking system for a high-velocity data stream (e.g., IoT sensor data)? What statistics would you monitor, and what would be the automated response if a check fails (e.g., drop data, alert on-call engineer, trigger a fallback model)?
- What if you were given a dataset from a completely alien and unknown domain, with no context or domain expertise available? How would you approach 'sanity checking' this data? What statistical principles could you rely on when common sense is no longer applicable?