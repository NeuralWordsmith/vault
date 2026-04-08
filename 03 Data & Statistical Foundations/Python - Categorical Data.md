---
tags: 
  - major_core
  - python
  - nominal
  - ordinal
  - data_types
  - feature_engineering
  - qualitative_data
  - concept
source: 
  - "[[Cleaning Data in Python]]"
related: 
  - "[[Fundamental - Statistics]]"
  - "[[Fundamental - Feature Engineering]]"
  - "[[Python - Data Types]]"
  - "[[Python - Numeric Data Types]]"
  - "[[Python - Converting to Categorical Type]]"
  - "[[Python - Integer vs Categorical Data Description]]"
  - "[[DataEng - Dirty Data]]"
  - "[[DataEng - Garbage In, Garbage Out (GIGO)]]"
  - "[[DataEng - Data Science Workflow]]"
  - "[[Python - Identifying Data Types with .dtypes]]"
  - "[[Python - Inspecting DataFrame with .info()]]"
  - "[[One-Hot Encoding]]"
  - "[[Label Encoding]]"
---
# Major Core: Categorical Data

## Summary

> Categorical data represents variables that are divided into a finite number of distinct groups or categories. Even if these categories are represented by numbers (e.g., 1 for 'USA', 2 for 'Canada'), the numbers are just labels and have no inherent mathematical value or order, distinguishing them from true numeric data.

**Why This Matters:** Correctly identifying categorical data is crucial because it prevents misleading mathematical operations (like averaging zip codes) and enables machine learning models to properly interpret and learn from labeled groups.

_Analogy:_ _Think of jersey numbers on a sports team. A player with jersey #10 is not 'twice as good' as a player with #5, and you can't average #10 and #20 to get a meaningful 'player #15'. The numbers are just unique identifiers for different players (categories)._

**Where it breaks down:** The analogy primarily covers nominal data where order doesn't matter. It doesn't capture ordinal data, where categories have a meaningful sequence (like 'small', 'medium', 'large'), even if the distance between them isn't uniform.

```
+------------------+--------------------------------+--------------------------------+
|    Attribute     |          Nominal Data          |          Ordinal Data          |
+------------------+--------------------------------+--------------------------------+
| Order Matters?   | No                             | Yes                            |
| Example          | Car Brands (Ford, Honda, BMW)  | Education (HS, BS, MS, PhD)    |
| Math Operations  | Counting, Mode                 | Counting, Mode, Median, Rank   |
| Can't Do         | Average, Sum, Std Dev          | Average, Sum, Std Dev          |
+------------------+--------------------------------+--------------------------------+
```

## Details

Categorical data is a fundamental concept in statistics and data science used to classify observations into distinct groups. While it can sometimes appear as numbers (like product IDs or survey response codes), its core function is to act as a label, not a quantity. Misinterpreting this data type is a common source of [[DataEng - Dirty Data|dirty data]] and can lead to the [[DataEng - Garbage In, Garbage Out (GIGO)|'garbage in, garbage out']] problem. Understanding this distinction is a key first step in any [[DataEng - Data Science Workflow|data science workflow]]. There are two main types of categorical data: **Nominal** and **Ordinal**.

#### Primary Goal

The primary goal of identifying categorical data is to ensure it is treated appropriately during analysis and modeling, preventing invalid mathematical calculations and allowing for correct feature engineering techniques.

#### Mechanism

- **How it Works:**
    - Categorical data works by assigning observations to a fixed set of labels. Instead of measuring a quantity, it records a quality or characteristic.
    - For example, a 'Color' column might contain 'Red', 'Green', or 'Blue'. A 'Satisfaction' column might contain numbers 1, 2, 3, 4, 5, where each number corresponds to a label like 'Very Unsatisfied' to 'Very Satisfied'.
- **Nominal Data:**
    - Categories with no intrinsic order or ranking. You can't say one is 'greater' or 'better' than another.
    - Example: *Country codes (USA, UK, JP), eye color (Blue, Brown, Green), or types of transportation (Car, Bus, Train).* The order in which you list them is arbitrary.
- **Ordinal Data:**
    - Categories that have a meaningful, logical order, but the intervals between them are not necessarily equal or known.
    - Example: *T-shirt sizes (Small, Medium, Large), survey ratings (Disagree, Neutral, Agree), or education level (High School, Bachelor's, Master's).* We know 'Large' is bigger than 'Small', but not by how much.

nothing to fill here

 [[Code - Categorical Data Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Cardinality:**
    - Refers to the number of unique categories in a feature. Low cardinality (e.g., 'Gender') is easy to handle, while high cardinality (e.g., 'Zip Code') can be challenging for some models and may require special encoding techniques.
- **Ordering:**
    - The primary distinction between nominal and ordinal data. Recognizing if an inherent order exists is crucial for choosing the right encoding method and statistical tests.

#### Core Trade-offs

- **Advantage: Memory Efficiency**
    - In libraries like pandas, [[Python - Converting to Categorical Type|converting a column to the 'category' dtype]] can significantly reduce memory usage, especially for text data with many repetitions. This is because pandas stores the unique categories once and then uses integer codes to reference them, as explored in [[Python - Integer vs Categorical Data Description|the comparison between integer and categorical storage]].
- **Advantage: Semantic Meaning**
    - Explicitly defining data as categorical provides semantic context for analysis and visualization tools, enabling them to apply appropriate plots (like bar charts) and statistical tests (like Chi-Squared).
- **Disadvantage: Misinterpretation**
    - When categories are encoded with numbers (e.g., 1=Red, 2=Green), they can be accidentally treated as numeric data, leading to nonsensical calculations like the 'average color'.
- **Disadvantage: The Curse of Dimensionality**
    - High-cardinality categorical features, when one-hot encoded, can create a very wide and sparse dataset, which can degrade the performance of some machine learning models and increase computational costs.

## Connections

```
                  (Parent)
             Fundamental - Statistics
                       ▲
                       │
       ┌───────────────┼────────────────────────────┐
       │               │                            │
(Contrast)        ┌──────────────────┐             (Application)
Numeric Data      │ Categorical Data │             Feature Engineering
                  └──────────────────┘
                       │
              ┌────────┴──────────┐
              │                   │
         Nominal Data        Ordinal Data
```

### Parent Concept

Categorical data is a fundamental concept within the broader field of [[Fundamental - Statistics|statistics]], forming one of the primary data types alongside numeric data.

### Child Concepts

- The two main sub-types are **Nominal Data**, where categories have no inherent order (e.g., car brands), and **Ordinal Data**, where categories have a meaningful sequence (e.g., t-shirt sizes).

### Related Concepts 

- In practice, identifying and handling this data type often involves [[Python - Converting to Categorical Type|converting string or integer columns to a specific categorical type]] in libraries like pandas.
- Understanding the [[Python - Integer vs Categorical Data Description|difference between integer and categorical data storage]] is key to optimizing memory usage and performance.
- Misidentified categorical data is a common form of [[DataEng - Dirty Data|dirty data]] that must be cleaned early in the [[DataEng - Data Science Workflow|data science workflow]].
- It is distinct from [[Python - Numeric Data Types|numeric data]], where values have mathematical meaning and order.
## Questions

- You have a 'zip code' feature with thousands of unique values. Treating it as a categorical variable directly would explode your feature space. How would you balance the need to capture geographical information with the risk of overfitting and computational cost, and how would you explain your feature engineering strategy to a product manager?
- Imagine a streaming data pipeline where new, unseen categories can appear in a feature over time (e.g., new product IDs). How would you design a robust data processing and modeling system that can handle these new categories without requiring constant manual intervention or retraining?
- What if you were forced to represent all categorical features using only a single numeric column, without using any standard encoding techniques like one-hot or target encoding? What novel mathematical or embedding-based approaches could you devise to capture the relationships between categories in this single dimension?
