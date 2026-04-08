---
tags: 
  - core
  - numpy
  - average
  - central_tendency
  - descriptive_statistics
  - arithmetic_mean
  - concept
source: 
  - "[[Introduction to Python]]"
related: 
  - "[[NumPy - Summarizing Statistics]]"
  - "[[NumPy - Median (np.median)]]"
  - "[[NumPy - Standard Deviation (np.std)]]"
  - "[[NumPy - Exploratory Data Analysis with NumPy]]"
  - "[[NumPy - Correlation Coefficient (np.corrcoef)]]"
  - "[[10 Utility Notes/Fundamental - Statistics.md|Fundamental - Statistics]]"
  - "[[NumPy - Data Sanity Check]]"
  - "[[NumPy - NumPy Functions vs Basic Python Functions]]"
  - "[[NumPy - Data Type Homogeneity & Calculation Speed Relationship]]"
  - "[[NumPy - Data Simulation with Random Distributions]]"
  - "[[NumPy - Stacking Arrays (np.column_stack)]]"
  - "[[Subject - Mathematics]]"
---
# Core: Mean (np.mean)

## Summary

>The `np.mean()` function in NumPy calculates the arithmetic average of a numerical dataset. As seen when finding the average height of 5000 people, it's a fundamental operation in [[NumPy - Exploratory Data Analysis with NumPy|exploratory data analysis]] for understanding the central tendency of a variable. It works by summing all the values and dividing by the count of those values.

**Why This Matters:** It provides a single, representative value that summarizes the 'center' of a dataset, which is the first step in understanding its overall characteristics.

_Analogy:_ _Calculating the mean is like splitting the bill evenly among friends at a restaurant. You add up the total cost of everything everyone ordered and then divide it by the number of people. The result is the 'average' amount each person should pay to cover the total cost._

- **Total Bill:** The sum of all values in your dataset.
- **Number of Friends:** The count of values in your dataset.
- **Evenly Split Amount:** The calculated mean.
- **Where it breaks down:** This analogy falters if one friend orders an extremely expensive dish (an outlier). While the 'mean' payment would still cover the bill, it wouldn't accurately represent what most people *actually* spent. The mean is highly sensitive to such outliers, whereas a concept like the [[NumPy - Median (np.median)|median]] would be more representative of the typical person's meal cost.

```
    [1.75, 1.80, 1.62, 1.91, 1.72]
                 │
                 ▼
    Sum = 1.75 + 1.80 + 1.62 + 1.91 + 1.72 = 8.8
                 │
                 ▼
              Count = 5
                 │
                 ▼
         Mean = 8.8 / 5 = 1.76
```

## Details

When you're faced with a large dataset, like the heights of 5000 people, the first step is often to get a sense of a 'typical' value. The `np.mean()` function is the tool for this job. It calculates the arithmetic mean, a core measure of central tendency in statistics. Before you can calculate the mean of a specific feature like height from a multi-column array, you first need to perform a subsetting operation to isolate that single column of data. This process is a cornerstone of [[NumPy - Summarizing Statistics|summarizing statistics]] and provides a foundational reference point for further analysis.

#### Primary Goal

To compute the arithmetic average of an array's elements, providing a single summary value representing the data's central point.

#### Mechanism

- **Step 1: Isolate the Data**
    - For a 2D NumPy array (a table of data), you first need to select the specific column or row you want to analyze. In the example, this meant extracting the 'height' column from the main array containing data on 5000 people.
- **Step 2: Compute the Average**
    - Apply the `np.mean()` function directly to the isolated 1D array (the height column). NumPy efficiently sums all the elements and divides by the number of elements to return the mean.

##### Code Translation

```python
import numpy as np

# --- Step 0: Simulate the Data ---
# Create a 2D array representing 5 people's [height, weight]
# This is a smaller version of the 5000-person dataset from the context.
people_data = np.array([
    [1.75, 70.3],
    [1.80, 85.1],
    [1.62, 58.5],
    [1.91, 92.2],
    [1.72, 68.0]
])

# --- Step 1: Isolate the Data ---
# Select the first column (index 0), which represents height.
height_column = people_data[:, 0]
print(f"Isolated height data: {height_column}")

# --- Step 2: Compute the Average ---
# Calculate the mean of the height column.
average_height = np.mean(height_column)
print(f"Average height: {average_height:.2f} meters")
# This result is similar to the 1.75m from the context.
```

 [[Code - Mean (np.mean) Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`axis`**
    - `axis=0`: Calculates the mean down each column. Useful for finding the average of each feature across all samples (e.g., average height, average weight).
    - `axis=1`: Calculates the mean across each row. Useful for finding the average for each sample across all its features.
    - If `axis` is not specified, the mean of the entire flattened array is calculated.

#### Core Trade-offs

- **Pro: Simplicity and Inclusivity**
    - The mean is easy to understand and calculate. It uses every single data point, providing a complete summary of the dataset.
- **Con: Sensitivity to Outliers**
    - Its biggest weakness is being heavily skewed by extreme values (outliers). A single very tall person in a group of short people will pull the average height up significantly, making it less representative of the typical person. In such cases, the [[NumPy - Median (np.median)|median]] is often a more robust measure.

## Connections

```
                      (Parent)
              Summarizing Statistics
                         ▲
                         │
         ┌───────────────┼───────────────┐
         │               │               │
(Measures Spread) ┌──────────────┐ (Alternative Center)
Standard Deviation│  Mean (np.mean)  │      Median
                  └──────────────┘
                         │
                         ▼
                     (Used In)
           Exploratory Data Analysis
```

### Parent Concept

The mean is a fundamental measure within the broader practice of [[NumPy - Summarizing Statistics|summarizing statistics]], providing a key indicator of central tendency.

### Related Concepts 

- It directly contrasts with the [[NumPy - Median (np.median)|median]], which finds the middle value and is less sensitive to outliers.
- The mean is the foundation for calculating the [[NumPy - Standard Deviation (np.std)|standard deviation]], which measures how spread out the data is around the mean.
- Calculating the mean is a critical first step in many forms of [[NumPy - Exploratory Data Analysis with NumPy|exploratory data analysis]] to understand a dataset's basic properties.
## Questions

- Imagine you're analyzing 'average session duration' for a website. A few automated bots have sessions lasting 24 hours (outliers), while most users stay for 2-3 minutes. Why would the `np.mean` be a misleading KPI to report to stakeholders, and how would you justify using `np.median` instead to measure user engagement?
- You're tasked with calculating the real-time average temperature from a million IoT sensors streaming data every second. How would you design a system to compute this average continuously without storing the entire stream in memory, and what are the potential precision issues with this approach?
- What if you were told that the arithmetic mean is fundamentally flawed for a specific type of skewed data, like financial returns? What other types of 'means' (e.g., geometric, harmonic) exist, and in what scenario would one of them provide a more accurate picture of 'average' performance than `np.mean`?