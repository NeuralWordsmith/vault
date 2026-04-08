---
tags: 
  - core
  - pandas
  - binning
  - discretization
  - data_segmentation
  - feature_engineering
  - concept
source: 
  - "[[Cleaning Data in Python]]"
related: 
  - "[[DataEng - Creating Categories from Continuous Data]]"
  - "[[DataEng - Creating Categories with qcut()]]"
  - "[[DataEng - qcut() vs cut()]]"
  - "[[Fundamental - Feature Engineering]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - Pandas]]"
  - "[[DataEng - Categorical Data Cleaning]]"
  - "[[Fundamental - Statistics]]"
  - "[[NumPy - Exploratory Data Analysis with NumPy]]"
  - "[[Python - Lists]]"
  - "[[Python - Data Types]]"
---
# Core: Creating Categories with cut()

## Summary

>The pandas `cut()` function is a method for [[DataEng - Creating Categories from Continuous Data|segmenting continuous data]] into discrete bins based on user-defined value ranges. Unlike its counterpart, [[DataEng - Creating Categories with qcut()|qcut()]], which creates bins with an equal number of data points, `cut()` provides precise control over the bin edges, making it ideal when specific, meaningful boundaries (like age groups or income brackets) are required.

**Why This Matters:** This function allows data engineers to translate raw numerical data into meaningful, business-defined categories, making complex datasets understandable and ready for analysis or machine learning.

_Analogy:_ _Imagine you're a librarian organizing a new collection of books of all different heights. Instead of creating shelves that each hold the same *number* of books, you decide to create shelves for specific height ranges: a 'Paperback' shelf for books up to 7 inches, a 'Standard' shelf for books 7-10 inches, and an 'Oversized' shelf for anything taller. The `cut()` function is like you, the librarian, deciding on these exact height measurements for each shelf *before* you start sorting._

The librarian is the data engineer. The books' heights are the continuous data. The custom-built shelves ('Paperback', 'Standard', 'Oversized') are the categorical bins created by `cut()`. The specific height measurements (7", 10") are the values passed to the `bins` argument. **Where it breaks down:** This analogy doesn't capture that `cut()` can lead to very unevenly filled shelves (bins), which might be a desirable outcome based on domain knowledge, whereas a librarian might prefer more evenly distributed shelves for aesthetic reasons.

```
Continuous Data (Income):
|---25k---189k---|---450k---|---500k---778k--->

Applying cut() with bins=[0, 200k, 500k, inf]:

Bin 1: (0 - 200k]      Bin 2: (200k - 500k]    Bin 3: (500k - inf)
[   25k, 189k   ]      [       450k       ]    [   500k, 778k   ]

Resulting Categories:
Label: '0-200K'        Label: '200K-500K'      Label: '500K+'
```

## Details

In data engineering and feature engineering, `pd.cut()` is a fundamental tool within the Pandas library for discretization. It transforms a continuous variable into a categorical one by 'cutting' it at specific points you define. This is crucial when the boundaries themselves have intrinsic meaning, such as tax brackets, credit score ratings (e.g., 'Poor', 'Fair', 'Good', 'Excellent'), or customer lifecycle stages. It allows you to impose business logic directly onto the data, which is a key step in [[DataEng - Creating Categories from Continuous Data|creating categories from continuous data]].

#### Primary Goal

To group continuous data into discrete, non-overlapping intervals based on pre-defined, explicit boundaries that are often derived from domain knowledge.

#### Mechanism

- **Step 1: Define Bin Edges**
    - Create a list of numbers that represent the boundaries of your categories. The first number is the lower bound of the first category, and the last number is the upper bound of the last category. You can use `np.inf` for an unbounded upper limit.
- **Step 2: Define Category Labels**
    - Create a list of strings that will be the names for each bin. The number of labels must be one less than the number of bin edges.
- **Step 3: Apply `pd.cut()`**
    - Call the `pd.cut()` function, passing the continuous data Series as the first argument, the list of bin edges to the `bins` parameter, and the list of labels to the `labels` parameter.

##### Code Translation

```python
import pandas as pd
import numpy as np

# Sample data
data = {'household_income': [25000, 189243, 450000, 778533, 500000, 30000]}
demographics = pd.DataFrame(data)

# --- Step 1: Define Bin Edges ---
# Bins are (0, 200k], (200k, 500k], (500k, infinity]
ranges = [0, 200000, 500000, np.inf]

# --- Step 2: Define Category Labels ---
group_names = ['0-200K', '200K-500K', '500K+']

# --- Step 3: Apply pd.cut() ---
demographics['income_group'] = pd.cut(
    demographics['household_income'],
    bins=ranges,
    labels=group_names
)

print(demographics[['income_group', 'household_income']])
```

 [[Code - Creating Categories with cut() Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`x`**
    - The input array or Series to be binned. Must be 1-dimensional.
- **`bins`**
    - Defines the bin edges. Can be an integer (for equal-width bins) or a sequence of scalars (for user-defined bin edges), which is the primary use case discussed here.
- **`labels`**
    - Specifies the labels for the returned bins. Must be the same length as the number of resulting bins (i.e., `len(bins) - 1`).
- **`right`**
    - A boolean indicating whether the bins include the rightmost edge or not. Defaults to `True`, meaning intervals are like `(0, 100]`.
- **`include_lowest`**
    - A boolean indicating whether the first interval should be left-inclusive. For example, if `True`, the first bin for `bins=[0, 100, 200]` would be `[0, 100]`.

#### Core Trade-offs

- **Pro: High Control and Interpretability**
    - Allows for the creation of categories based on specific domain knowledge (e.g., tax brackets, age groups), making the results highly interpretable and aligned with business logic.
- **Pro: Not Influenced by Distribution**
    - The bin boundaries are fixed and do not change based on the distribution of the data, providing stability and consistency in the transformation.
- **Con: Can Create Imbalanced Bins**
    - Since bins are based on value ranges, not frequency, it can result in some categories having a vast number of data points while others have very few or none. This can be problematic for some machine learning models.
- **Con: Requires A Priori Knowledge**
    - Effective use of `cut()` requires pre-existing knowledge of the data's range and the meaningful boundaries to apply. Poorly chosen bins can obscure patterns or create misleading categories.

## Connections

```
                           (Parent)
            Creating Categories from Continuous Data
                               ▲
                               │
┌──────────────────────────────┼──────────────────────────────┐
│                              │                              │
(Contrasts With)      ┌──────────────────────────────────┐      (Comparison)
qcut()                │  Creating Categories with cut()  │      qcut() vs cut()
                      └──────────────────────────────────┘
```

### Parent Concept

This method is a specific implementation of the broader task of [[DataEng - Creating Categories from Continuous Data|creating categories from continuous data]], which is a common step in feature engineering.

### Child Concepts



### Related Concepts 

- The `cut()` function directly contrasts with [[DataEng - Creating Categories with qcut()|qcut()]], which bins data based on quantiles (equal frequency) rather than fixed value ranges.
- A detailed comparison of when to use each method is covered in [[DataEng - qcut() vs cut()|qcut() vs cut()]].
- This technique is a core component of [[Fundamental - Feature Engineering]], where raw numerical features are transformed into more meaningful categorical ones.
## Questions

- Imagine you're segmenting customers by 'days since last purchase'. Using `cut()` with business-defined bins (e.g., 0-30 days 'Active', 31-90 'At Risk', 91+ 'Churned') results in 95% of customers in the 'Active' bin. How would you justify this binning strategy to a marketing manager, and what are the risks of using these imbalanced categories for a promotional campaign?
- If the bin boundaries for a feature like 'customer lifetime value' need to be updated quarterly based on new business rules, how would you design a data pipeline to apply `cut()` dynamically? Where would you store the bin configurations to avoid hardcoding them in your transformation script?
- What if you had to create meaningful, domain-specific categories from a continuous variable, but you were forbidden from using any function that explicitly takes bin edges as input (like `cut()`)? How might you use a combination of filtering, boolean masking, and assignment to achieve a similar result?