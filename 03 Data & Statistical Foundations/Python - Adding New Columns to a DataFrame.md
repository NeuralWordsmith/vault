---
tags: 
  - major_core
  - python
  - feature_engineering
  - data_transformation
  - pandas
  - dataframe_mutation
  - derived_columns
  - concept
source: 
  - "[[Data Manipulation with pandas]]"
related: 
  - "[[Python - Pandas DataFrame]]"
  - "[[Fundamental - Feature Engineering]]"
  - "[[Python - Creating a New Column from One Existing Column]]"
  - "[[Python - Creating a New Column from Multiple Existing Columns]]"
  - "[[Python - Chaining Pandas Operations for Analysis]]"
  - "[[Python - Vectorized Operations]]"
  - "[[Python - DataFrame Indexing and Selection]]"
  - "[[Python - Pandas Package]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - Data Types]]"
  - "[[Python - List Comprehensions]]"
  - "[[Python - Functions]]"
  - "[[SWE - Readability]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
---
# Major Core: Creating New Columns in a DataFrame

## Summary

> This is the process of adding new columns to a pandas DataFrame, where the values in the new column are calculated based on the data in one or more existing columns. This fundamental data manipulation technique is also known as mutating or transforming a DataFrame and is a core part of feature engineering. It allows you to create more meaningful variables, such as calculating a ratio, combining text fields, or extracting components from a date.

**Why This Matters:** Creating new columns from existing data is the primary way to enrich a dataset, enabling deeper analysis and building more predictive machine learning models.

_Analogy:_ _Think of a DataFrame as a baker's basic recipe for bread, with columns for 'flour', 'water', and 'yeast'. Creating a new column is like the baker deciding to add a new ingredient, say 'herbs_and_spices', by combining a pinch of 'rosemary' and a dash of 'thyme' from their pantry. The original recipe (DataFrame) is enhanced with a new, derived component that changes the final product's flavor profile (analytical outcome)._

**Where it breaks down:** A baker physically adds new ingredients. In pandas, we are not adding fundamentally new "raw" data; we are creating new information *derived* from the data that is already present in the DataFrame. The process is computational, not additive in the physical sense.

```
Before:
+------+-------+----------+
| item | price | quantity |
+------+-------+----------+
| A    | 10.0  | 5        |
| B    | 25.5  | 2        |
| C    | 5.75  | 10       |
+------+-------+----------+

        |
        V  (df['total'] = df['price'] * df['quantity'])
        |

After:
+------+-------+----------+---------------+
| item | price | quantity | total_revenue |
+------+-------+----------+---------------+
| A    | 10.0  | 5        | 50.0          |
| B    | 25.5  | 2        | 51.0          |
| C    | 5.75  | 10       | 57.5          |
+------+-------+----------+---------------+
```

## Details

When you first get a DataFrame, it rarely contains all the information you need in the perfect format. A crucial step in data analysis and preparation is to create new columns derived from the existing ones. This process, which can be called mutating a DataFrame, transforming data, or more formally, feature engineering, is all about making your data more useful. You might need to calculate a new value from a single column, like extracting the month from a date, or combine multiple columns, like calculating a debt-to-income ratio. The two primary approaches are **creating a new column from one existing column** and **creating a new column from multiple existing columns**.

#### Primary Goal

To enrich a dataset by generating new, informative features from existing data, making it more suitable for analysis, visualization, or machine learning.

#### Mechanism

- **Step 1: Identify the Source Column(s)**
    - Determine which existing column or columns contain the necessary information to compute the new feature.
- **Step 2: Define the Transformation Logic**
    - Decide on the operation to perform. This could be a simple arithmetic operation (e.g., `col_A * col_B`), a string manipulation, or a more complex function application.
- **Step 3: Assign the Result to a New Column**
    - Use square bracket notation (`df['new_col'] = ...`) or the `.assign()` method to create the new column and populate it with the results of the transformation.

```python
import pandas as pd

# --- Setup: Create a sample DataFrame ---
data = {'item': ['A', 'B', 'C'],
        'price': [10.00, 25.50, 5.75],
        'quantity': [5, 2, 10]}
sales_df = pd.DataFrame(data)

# --- Step 1 & 2: Identify source columns and define logic ---
# We want to calculate the total revenue from 'price' and 'quantity'.
# The logic is a simple multiplication.

# --- Step 3: Assign the result to a new column ---
sales_df['total_revenue'] = sales_df['price'] * sales_df['quantity']

print(sales_df)
```

 [[Code - Creating New Columns in a DataFrame Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Assignment Method**
    - You can use direct assignment (`df['new_col'] = ...`) which modifies the DataFrame in-place, or the `.assign(new_col=...)` method, which returns a new DataFrame. The latter is useful for [[Python - Chaining Pandas Operations for Analysis|method chaining]].
- **Operation Type**
    - The choice of operation significantly impacts performance. [[Python - Vectorized Operations|Vectorized operations]] (e.g., `df['col_a'] + df['col_b']`) are highly efficient. Applying custom functions row-by-row with `.apply()` is more flexible but much slower.

#### Core Trade-offs

- **Readability vs. Performance**
    - Vectorized operations are fast but can become complex and hard to read for intricate logic. Using `.apply()` with a well-named function can be much more readable but incurs a significant performance penalty, as it operates row-by-row rather than on entire columns at once.
- **In-Place Mutation vs. Immutability**
    - Directly assigning a new column (`df['new'] = ...`) modifies the original DataFrame. This can save memory but may lead to unexpected side effects in complex code. Using `.assign()` creates a new DataFrame, which consumes more memory but promotes a safer, more predictable functional style of programming, especially when chaining operations.

## Connections

```
                  (Parent)
            Pandas DataFrame
                     ▲
                     │
┌────────────────────┼────────────────────┐
│                    │                    │
(Related)       ┌───────────────────────────────────┐      (Related)
Feature Eng.    │ Creating New Columns in a DataFrame │  Vectorized Ops
                └───────────────────────────────────┘
                           │
                ┌──────────┴──────────┐
                │                     │
    (Child) From One Column     (Child) From Multiple Columns
```

### Parent Concept

This concept is a fundamental data manipulation technique applied to a [[Python - Pandas DataFrame|pandas DataFrame]].

### Child Concepts

- A common use case is [[Python - Creating a New Column from One Existing Column|creating a new column from a single existing column]], such as extracting a year from a date.
- Another powerful application is [[Python - Creating a New Column from Multiple Existing Columns|creating a new column from multiple existing columns]], like calculating a ratio or combining text fields.

### Related Concepts 

- This process is a core component of [[Fundamental - Feature Engineering|feature engineering]], where raw data is transformed into features suitable for machine learning.
- For performance, it is highly recommended to use [[Python - Vectorized Operations|vectorized operations]] whenever possible, as they are significantly faster than row-wise calculations.
- Creating new columns is often a step within a larger analytical workflow, which can be made more readable and efficient by [[Python - Chaining Pandas Operations for Analysis|chaining pandas operations]] together.
## Questions

- You're building a customer churn model. You could create a simple `tenure_in_months` feature, or a more complex `loyalty_score` feature that combines tenure, purchase frequency, and average order value. How would you decide which feature to build first, and how would you justify the potential engineering effort of the complex feature to a product manager?
- Imagine you need to add 10 new features to a 50 GB DataFrame in a memory-constrained production environment. How would you design your data transformation pipeline to minimize memory spikes and avoid crashing the system? Would you favor in-place operations or creating intermediate DataFrames?
- What if the pandas `.apply()` method was removed from the library? How would you implement a complex, non-vectorizable function (e.g., one that calls an external API for each row) to create a new column, and what would be the performance implications?
