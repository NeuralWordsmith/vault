---
tags: 
  - core
  - numpy
  - central_tendency
  - robust_statistics
  - outliers
  - descriptive_statistics
  - sorting
  - concept
source: 
  - "[[Introduction to Python]]"
related: 
  - "[[NumPy - Summarizing Statistics]]"
  - "[[NumPy - Mean (np.mean)]]"
  - "[[NumPy - Standard Deviation (np.std)]]"
  - "[[NumPy - Exploratory Data Analysis with NumPy]]"
  - "[[NumPy - Data Sanity Check]]"
  - "[[Fundamental - Statistics]]"
  - "[[NumPy - NumPy Functions vs Basic Python Functions]]"
  - "[[NumPy - Correlation Coefficient (np.corrcoef)]]"
  - "[[NumPy - Data Simulation with Random Distributions]]"
  - "[[Subject - Mathematics]]"
---
# Core: Median (np.median)

## Summary

>The median is the value that separates the higher half from the lower half of a dataset. In simpler terms, if you sort all the values, the median is the one right in the middle. It is a fundamental tool in [[NumPy - Summarizing Statistics]] and is often compared with the [[NumPy - Mean (np.mean)|mean]] to understand the distribution and skewness of data.

**Why This Matters:** The median provides a robust measure of central tendency that is unaffected by extreme outliers, giving a more realistic picture of the 'typical' value in skewed datasets.

_Analogy:_ _Imagine lining up a group of people by height, from shortest to tallest. The median height is simply the height of the person standing in the exact middle of the line. If you have 11 people, it's the height of the 6th person. This middle person's height gives you a good sense of the typical height for the group, even if the world's tallest person is also in the line._

**Where it breaks down:** The analogy is perfect for an odd number of people. For an even number, there isn't one 'middle' person. The median is then the average height of the two people in the middle. The analogy also doesn't easily extend to calculating medians across multiple dimensions of data (e.g., finding the median height for several different groups at once), which NumPy handles effortlessly.

```
Odd Number of Elements:
Data: [165, 170, 175, 180, 210]
                   ▲
                   │
                Median (175)

Even Number of Elements:
Data: [165, 170, 175, 180, 185, 210]
                       │
                   ┌───┴───┐
                 (175 + 180) / 2 = 177.5
```

## Details

The context gives a perfect example: finding the median height of a group of people. This is the height of the middle person when everyone is sorted. The median is a cornerstone of descriptive statistics, providing a measure of central tendency. It's a key function in NumPy used for [[NumPy - Exploratory Data Analysis with NumPy]]. Its main advantage over the [[NumPy - Mean (np.mean)|mean]] is its robustness; it is not affected by unusually large or small values (outliers), which can distort the mean and give a misleading sense of the 'average'.

#### Primary Goal

To find the central point of a dataset in a way that is robust to extreme values or skewed distributions.

#### Mechanism

- **Step 1: Sort the Data**
    - Conceptually, the first step is to arrange all data points in ascending order.
- **Step 2: Find the Middle Value**
    - If the number of data points ($n$) is **odd**, the median is the single value in the middle position.
    - If the number of data points ($n$) is **even**, the median is the average of the two middle values.
- **Step 3: Use `np.median()` for Simplicity**
    - NumPy's `np.median()` function automates this entire sorting and selection process, making it a prime example of how [[NumPy - NumPy Functions vs Basic Python Functions|NumPy functions are superior]] to manual implementation in Python.

##### Code Translation

```python
import numpy as np

# --- Context: A dataset of heights, including an outlier ---
# This demonstrates the median's robustness compared to the mean.
heights = np.array([165, 170, 175, 180, 210]) # Odd number of elements
heights_even = np.array([165, 170, 175, 180, 185, 210]) # Even number of elements

# --- Step 3: Use np.median() --- 
# NumPy handles the sorting and finding the middle value automatically.
median_height_odd = np.median(heights)
median_height_even = np.median(heights_even)

print(f"Sorted odd array: {np.sort(heights)}")
print(f"Median for odd-sized array: {median_height_odd}\n")

print(f"Sorted even array: {np.sort(heights_even)}")
print(f"Median for even-sized array: {median_height_even}\n")

# --- Comparison with Mean ---
# Notice how the outlier (210) pulls the mean upwards, while the median remains representative.
mean_height_odd = np.mean(heights)
print(f"The mean is skewed by the outlier: {mean_height_odd:.2f}")
print(f"The median remains robust: {median_height_odd}")
```

 [[Code - Median (np.median) Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`a` (array_like)**
    - The input array containing the numbers for which the median is required.
- **`axis` (int or tuple of ints, optional)**
    - The axis or axes along which to compute the median. If `None` (the default), the median is computed for the flattened array.
    - Example: `axis=0` computes the median down each column, while `axis=1` computes it across each row.

#### Core Trade-offs

- **Pro: Robust to Outliers**
    - This is its primary advantage. A few extremely high or low values will not affect the median, making it a better measure of central tendency for skewed data (e.g., income, house prices).
- **Con: Ignores Magnitude of Values**
    - The median only considers the rank order of data. The datasets `[1, 2, 100]` and `[1, 2, 3]` have the exact same median (2), even though their overall distributions are vastly different.
- **Con: Less Statistically 'Efficient' for Normal Distributions**
    - For data that is normally distributed (a bell curve), the mean uses information from every data point and is generally a better estimator of the population center.

## Connections

```
                  (Parent)
           [[NumPy - Summarizing Statistics|Summarizing Statistics]]
                       ▲
                       │
        ┌──────────────┼───────────────────┐
        │              │                   │
(Contrasts With) ┌────────────────────┐ (Used Alongside)
 Mean            │ Median (np.median) │ Standard Deviation
                 └────────────────────┘
```

### Parent Concept

The median is a fundamental measure used in [[NumPy - Summarizing Statistics]], providing a way to describe the central tendency of a dataset.

### Related Concepts 

- The median provides a measure of central tendency that **contrasts with** the [[NumPy - Mean (np.mean)|mean]], which is sensitive to outliers.
- It is a crucial tool for performing a [[NumPy - Data Sanity Check|data sanity check]], as a large divergence between the mean and median suggests a skewed distribution.
- Calculating the median is a core part of [[NumPy - Exploratory Data Analysis with NumPy|exploratory data analysis]] to understand the typical value in a feature.
- The efficiency of `np.median` over a manual Python implementation is a prime example of the advantages discussed in [[NumPy - NumPy Functions vs Basic Python Functions|NumPy vs. Basic Python Functions]].
## Questions

- You're analyzing customer transaction data for an e-commerce site. The CEO wants to know the 'average' purchase amount to set marketing budgets. You notice the data is heavily skewed by a few very large corporate orders. Would you report the mean or the median, and how would you explain to the CEO why your choice gives a more actionable insight for targeting typical customers?
- Imagine you need to calculate the median of a massive, streaming dataset that cannot fit into memory. How would you design an algorithm to approximate the median in real-time with limited memory, and what are the trade-offs of your approach compared to NumPy's exact calculation on a smaller batch?
- What if your dataset was multi-modal, having two distinct peaks (e.g., product prices in 'budget' and 'premium' categories)? The median would likely fall in the empty space between these peaks, representing no actual product. In this scenario, what alternative summary statistics would be more meaningful, and why is the median misleading here?