---
tags: 
  - core
  - python
  - pandas
  - concat
  - dataframe
  - data_linking
  - stacking
  - concept
source: 
  - "[[Cleaning Data in Python]]"
related: 
  - "[[Python - Record Linkage Workflow 1]]"
  - "[[Python - Inverting a Boolean Index with the Tilde (~) Operator]]"
  - "[[Python - Filtering Potential Matches by Score]]"
  - "[[Python - Multi-Index DataFrames in Record Linkage]]"
  - "[[Python - Accessing Multi-Index Levels with get_level_values()]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - Lists]]"
  - "[[Python - Data Types]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[Python - NumPy Array Manipulation]]"
  - "[[Python - Packages]]"
---
# Core: Linking DataFrames with concat

## Summary

>After identifying and isolating duplicate records between two DataFrames, `pandas.concat` is used to vertically stack the original DataFrame with the newly identified, non-duplicate rows from the second DataFrame. This operation effectively appends the new information, creating a single, complete, and de-duplicated dataset. It's the culmination of the [[Python - Record Linkage Workflow 1|record linkage process]], leveraging techniques like [[Python - Inverting a Boolean Index with the Tilde (~) Operator|inverting boolean masks]] to prepare the data for this final merge.

**Why This Matters:** This is the final, crucial step in record linkage that combines disparate datasets into a single, unified source of truth, enabling comprehensive analysis without redundant information.

_Analogy:_ _Imagine you are a party planner with a master guest list (DataFrame A). Your colleague gives you a separate, newer list of potential guests (DataFrame B). Before sending out invitations, you first cross-reference the lists to find people who are on both (the duplicates). To create the final, complete invitation list, you don't just tape the two lists together. Instead, you take your original master list and then append *only the names from your colleague's list that were not already on yours*. The `pd.concat` function is the act of taping that small list of new names to the bottom of your master list._

*   **Master Guest List:** The primary DataFrame (`census_A`).
*   **Colleague's List:** The secondary DataFrame with potential new entries (`census_B`).
*   **Cross-Referencing:** The process of finding duplicate rows.
*   **List of New Names:** The filtered DataFrame containing only non-duplicates (`census_B_new`).
*   **Taping Lists Together:** The `pd.concat` operation.
*   **Where it breaks down:** The analogy implies the lists have the same format. In pandas, `concat` can be more complex, needing to handle misaligned columns or different data types, which isn't captured by simply taping paper lists together.

```
DataFrame A
+---+-------+
| 1 | Alice |
| 2 |  Bob  |
+---+-------+

DataFrame B (New Rows Only)
+---+---------+
| 4 | Charlie |
+---+---------+

      │
      ▼ pd.concat([A, B_new])
      │

  Full DataFrame
+---+---------+
| 1 |  Alice  |
| 2 |   Bob   |
| 4 | Charlie |
+---+---------+
```

## Details

In the context of data science and specifically record linkage, linking DataFrames is the final assembly step. Once you've gone through the process of comparing records and [[Python - Filtering Potential Matches by Score|identifying duplicates]], you are left with two groups of records in your second dataset: those that match the first, and those that are entirely new. The core idea is to discard the duplicates from the second dataset and append only the new records to the first, resulting in a single, comprehensive DataFrame.

#### Primary Goal

To combine two DataFrames into one by appending the rows of one to another, typically after ensuring no duplicate records are introduced.

#### Mechanism

- **Step 1: Identify Duplicate Rows**
    - First, a boolean mask is created to identify which rows in the second DataFrame (`census_B`) have indices that match the list of known duplicates (`duplicate_rows`). This is done using the `.isin()` method.
- **Step 2: Isolate New Rows**
    - To get the rows that are *not* duplicates, we use the [[Python - Inverting a Boolean Index with the Tilde (~) Operator|tilde (~) operator]] to invert the boolean mask from Step 1. This powerful technique flips `True` to `False` and vice-versa, effectively selecting all the unique, new entries from `census_B`.
- **Step 3: Concatenate DataFrames**
    - Finally, `pd.concat()` is called with a list containing the original DataFrame (`census_A`) and the newly created DataFrame of non-duplicates (`census_B_new`). By default, `concat` stacks them vertically (axis=0), creating the final, linked dataset.

##### Code Translation

```python
import pandas as pd

# Assume census_A, census_B, and duplicate_rows are pre-defined
# census_A: DataFrame 1
# census_B: DataFrame 2
# duplicate_rows: A list or index of rows in census_B identified as duplicates of rows in census_A

# --- Step 1 & 2: Isolate new rows from census_B ---
# The tilde (~) inverts the boolean series, selecting rows NOT in duplicate_rows.
census_B_new = census_B[~census_B.index.isin(duplicate_rows)]

# --- Step 3: Link the DataFrames! ---
# pd.concat stacks the two DataFrames vertically.
full_census = pd.concat([census_A, census_B_new])

print("--- Original Census A ---")
# print(census_A)
print("\n--- New Rows from Census B ---")
# print(census_B_new)
print("\n--- Final Linked Census ---")
# print(full_census)
```

 [[Code - Linking DataFrames with concat Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`objs`**: A sequence or mapping of Series or DataFrame objects to be concatenated. This is the primary input, typically a list like `[df1, df2]`.
- **`axis`**: The axis to concatenate along. `0` (the default) means stacking rows, while `1` means stacking columns side-by-side.
- **`join`**: How to handle indexes on the other axis. `'outer'` (default) takes the union of all columns/indices, filling non-matching areas with `NaN`. `'inner'` takes the intersection, dropping any non-matching columns/indices.
- **`ignore_index`**: If `True`, the resulting DataFrame will have a new, continuous index from 0 to n-1, discarding the original indices. This is useful when the original indices are not meaningful after concatenation.

#### Core Trade-offs

- **Simplicity vs. Complexity**: `concat` is excellent for simple stacking operations. For more complex, database-style joins based on specific key columns, `pd.merge()` or `df.join()` are more appropriate and powerful, but also more complex to use.
- **Performance**: For very large DataFrames, concatenation can be memory-intensive as it involves creating a new, larger DataFrame in memory. In-place operations are not the norm.
- **Schema Rigidity**: `concat` works best when the DataFrames have the same or very similar column structures. If columns are misaligned or have different dtypes, it can lead to a DataFrame with mixed types or many `NaN` values, requiring further cleanup.

## Connections

```
                  (Parent)
             Python - Pandas
                     ▲
                     │
┌────────────────────┼───────────────────────────┐
│                    │                           │
(Precursor Step)  ┌──────────────────────────┐   (Core Method)
Filter Matches    │ Linking DataFrames w/ concat │   Invert Boolean Index
                  └──────────────────────────┘
                     │
                     ▼
               (Part of)
        Record Linkage Workflow
```

### Parent Concept

This operation is a fundamental data manipulation technique within the [[Python - Packages|Pandas library]], which is the primary tool for data analysis in Python.

### Child Concepts



### Related Concepts 

- This entire process is a core part of the overarching [[Python - Record Linkage Workflow 1|record linkage workflow]].
- The selection of non-duplicate rows is made possible by the [[Python - Inverting a Boolean Index with the Tilde (~) Operator|tilde (~) operator]], which inverts a boolean mask.
- This step occurs after [[Python - Filtering Potential Matches by Score|filtering potential matches]] to create a definitive list of duplicates.
- The underlying data structures are built upon concepts from [[Python - NumPy (Numeric Python)|NumPy]], which provides the high-performance arrays that power DataFrames.
## Questions

- You've successfully concatenated two census datasets, but you discover the 'income' column has a `float` dtype in one and an `object` (string) dtype in the other, causing pandas to default the final column to `object`. What is the business risk of proceeding with this messy data, and how would you justify the engineering time to fix the upstream data sources versus just cleaning it post-concatenation?
- Imagine this concatenation is part of a daily ETL job that appends new customer sign-ups to a master customer table. How would you design this step to be idempotent, ensuring that if the job accidentally runs three times in one day, you don't end up with triplicate records for that day's sign-ups?
- What if the `pandas.concat` function was suddenly 100x slower due to a bug in a new release? How could you achieve the exact same result of vertically stacking two DataFrames using only NumPy array manipulations, and what are the potential pitfalls of your NumPy-only approach?