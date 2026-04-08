---
tags: 
  - core
  - python
  - numpy
  - mean
  - average
  - aggregation
  - central_tendency
  - concept
source: 
  - "[[Introduction to NumPy]]"
related: 
  - "[[Python - NumPy Data Aggregation]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - NumPy axis Argument in Aggregation]]"
  - "[[Python - NumPy keepdims Argument in Aggregation]]"
  - "[[Python - NumPy .sum() Method]]"
  - "[[Python - NumPy .min() and .max() Methods]]"
  - "[[Python - NumPy .cumsum() Method]]"
  - "[[Fundamental - Statistics]]"
  - "[[Python - 2D NumPy Arrays]]"
  - "[[Python - Subsetting NumPy Arrays]]"
  - "[[Python - Pandas DataFrame]]"
  - "[[NumPy - Exploratory Data Analysis with NumPy]]"
  - "[[Python - Boolean Operators on NumPy Arrays]]"
---
# Core: NumPy .mean() Method

## Summary

>The `.mean()` method in NumPy is an aggregation function that calculates the arithmetic average of all elements in an array. As shown with the security breach data, it can compute a single average for the entire dataset (e.g., 1.13 breaches) or be directed to calculate the average along a specific dimension, such as finding the mean number of breaches per year across all clients.

**Why This Matters:** It provides a one-step method to calculate the average value, a fundamental measure of central tendency essential for summarizing datasets and establishing performance baselines.

_Analogy:_ _Think of the `.mean()` method as a diligent teacher calculating the average score for a pop quiz. The entire stack of graded quizzes is the NumPy array. The teacher adding up all the scores and dividing by the number of students is like calling `.mean()` on the whole array to get the class average. If the teacher instead calculates the average score for each row of desks, that's like using `.mean(axis=1)` to get the average for each row in the array._

**Where it breaks down:** The analogy holds well, but a key limitation of the mean (and the teacher's class average) is its sensitivity to outliers. One student acing the test with a 100% and another failing with a 0% can drastically pull the average up or down, potentially misrepresenting how the 'typical' student performed. In data analysis, this means the mean can be a misleading summary for skewed datasets.

```
Calculating mean with axis=1:

[ [0, 5, 1],   -> (0+5+1)/3 = 2.0
  [0, 2, 0],   -> (0+2+0)/3 = 0.666...
  [1, 1, 2],   -> (1+1+2)/3 = 1.333...
  [2, 2, 1],   -> (2+2+1)/3 = 1.666...
  [0, 0, 0] ]  -> (0+0+0)/3 = 0.0

Result: [2.        0.66666667 1.33333333 1.66666667 0.        ]
```

## Details

The `.mean()` method is a fundamental aggregation function in NumPy used to compute the arithmetic average of an array's elements. It is a cornerstone of descriptive statistics and a key part of [[Python - NumPy Data Aggregation|NumPy's data aggregation toolkit]]. The method can be applied to the entire array to get a single global average, or it can be applied along a specific dimension using the `axis` parameter to get an array of averages, as demonstrated by calculating the mean security breaches per year.

#### Primary Goal

To compute the arithmetic average (the sum of elements divided by the number of elements) of a NumPy array, providing a key measure of central tendency.

#### Mechanism

- **Step 1: Define the Data Array**
    - First, create a NumPy array. In this example, we use the `security_breaches` data, which has 5 rows (years) and 3 columns (clients).
- **Step 2: Calculate the Overall Mean**
    - Call the `.mean()` method on the array with no arguments. NumPy sums all 15 elements in the array and divides by 15 to find the single, overall average.
- **Step 3: Calculate the Mean Along an Axis**
    - To get a more granular view, provide the `axis` argument. `axis=1` tells NumPy to perform the calculation *across the columns* for each row. This results in a new array containing five values, where each value is the average number of breaches for that year.

##### Code Translation

```python
import numpy as np

# --- Step 1: Define the Data Array ---
# Data represents security breaches for 3 clients over 5 years.
security_breaches = np.array([[0, 5, 1],
                              [0, 2, 0],
                              [1, 1, 2],
                              [2, 2, 1],
                              [0, 0, 0]])

# --- Step 2: Calculate the Overall Mean ---
# This gives the average number of breaches across all years and all clients.
overall_mean = security_breaches.mean()
print(f"Overall mean breaches: {overall_mean:.2f}")
# Output: Overall mean breaches: 1.13

# --- Step 3: Calculate the Mean Along an Axis ---
# axis=1 calculates the mean for each year across all clients.
# Result is an array with the average breaches for Year 1, Year 2, etc.
mean_by_year = security_breaches.mean(axis=1)
print(f"Mean breaches by year: {mean_by_year}")
# Output: Mean breaches by year: [2.     0.6667 1.3333 1.6667 0.    ]
```

 [[Code - NumPy .mean() Method Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`axis`**: Specifies the dimension along which the mean is computed. `axis=0` computes the mean down each column, while `axis=1` computes it across each row. This is detailed further in [[Python - NumPy axis Argument in Aggregation|the note on the axis argument]].
- **`keepdims`**: A boolean that, if set to `True`, ensures the output array has the same number of dimensions as the input array. For example, averaging a (5,3) array along `axis=1` would result in a (5,1) array instead of a (5,) array. This is explained in [[Python - NumPy keepdims Argument in Aggregation|the note on the keepdims argument]].
- **`dtype`**: Allows you to specify the data type for the accumulator and the result, which can be useful for controlling precision or memory usage during the calculation.

#### Core Trade-offs

- **Pro: Simplicity and Efficiency**
    - It provides a fast, highly optimized, and computationally inexpensive way to get a measure of central tendency for a dataset in a single line of code.
- **Con: Sensitivity to Outliers**
    - The mean is not a robust statistic. A single extremely large or small value can significantly skew the result, making it a poor representation of the 'typical' value in datasets with long tails or anomalies. In such cases, the median is often a more reliable measure.

## Connections

```
                      (Parent)
             NumPy Data Aggregation
                       ▲
                       │
    ┌──────────────────┼──────────────────┐
    │                  │                  │
(Alternative) ┌──────────────────┐   (Component)
  Median      │ NumPy .mean()    │  axis Argument
              └──────────────────┘
                       │
            ┌──────────┴──────────┐
            │                     │
        .sum()                 .min()/.max()
    (Related Aggregations)
```

### Parent Concept

The `.mean()` method is a fundamental function within the broader topic of [[Python - NumPy Data Aggregation|data aggregation in NumPy]], used to summarize array data into a single representative value.

### Child Concepts



### Related Concepts 

- It operates similarly to the [[Python - NumPy .sum() Method|.sum() method]], but divides the total by the count of elements to find the average.
- The behavior of `.mean()` is controlled by the [[Python - NumPy axis Argument in Aggregation|axis argument]], which dictates the dimension along which the calculation is performed.
- It provides a measure of central tendency, which contrasts with [[Python - NumPy .min() and .max() Methods|.min() and .max() methods]] that identify the extreme values in an array.
- For understanding cumulative trends rather than a single average, the [[Python - NumPy .cumsum() Method|.cumsum() method]] provides a running total.
## Questions

- You're analyzing customer transaction data, which contains a few multi-million dollar purchases by corporate clients alongside thousands of small individual purchases. How would using `.mean()` to find the 'average' transaction value be misleading for the marketing team, and what alternative metric would you propose to give them a more accurate picture of a typical customer?
- Imagine you have a distributed system processing a massive stream of sensor data that's too large to fit into memory on a single machine. How would you design a system to calculate the global mean of this data stream in a scalable and memory-efficient way, without collecting all the data in one place?
- What if you could only use the `.sum()` method and the `.shape` attribute of a NumPy array? How would you replicate the functionality of `.mean()` for a 2D array, both for the overall mean and for the mean along `axis=1`?