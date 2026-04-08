---
tags: 
  - core
  - python
  - subset
  - keep
  - data_cleaning
  - pandas
  - dataframe
  - concept
source: 
  - "[[Cleaning Data in Python]]"
related: 
  - "[[Python - pandas .duplicated() Method]]"
  - "[[Python - pandas .drop_duplicates() Method]]"
  - "[[Python - Data Cleaning]]"
  - "[[Python - Duplicate Data]]"
  - "[[Python - Causes of Duplicate Data]]"
  - "[[Python - Handling Incomplete Duplicates]]"
  - "[[Python - Process for Identifying and Analyzing Duplicates]]"
  - "[[Python - Process for Resolving Incomplete Duplicates with .groupby() and .agg()]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - Lists]]"
  - "[[Python - Booleans]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Conditional Statements]]"
---
# Core: pandas .duplicated() Method Parameters

## Summary

>The pandas `.duplicated()` method can be precisely calibrated using two key arguments. The `subset` parameter allows you to specify a list of column names to consider when checking for duplicates, ignoring all other columns. The `keep` parameter determines which occurrence of a duplicate group is marked as `False` (i.e., not a duplicate), with options to keep the `'first'`, the `'last'`, or mark all occurrences as duplicates by setting it to `False`.

**Why This Matters:** These parameters provide granular control over what defines a duplicate and which instances are flagged, preventing accidental data loss and ensuring accurate analysis.

_Analogy:_ _Imagine a bouncer at an exclusive club checking IDs. The bouncer is the `.duplicated()` method. By default, they check every detail on the ID. However, the manager can give specific instructions. Telling the bouncer to only check the 'Name' and 'Date of Birth' is like using the `subset` parameter. The club's entry policy is the `keep` parameter. If the policy is 'first-come, first-served' (`keep='first'`), only the first person with a given ID gets in. If it's 'last one in wins' (`keep='last'`), the last person to show the ID is the one who gets to stay. If the policy is to catch all fake IDs (`keep=False`), the bouncer flags every single person who shows up with the same ID._

**Where it breaks down:** The bouncer is actively denying entry or taking action. The `.duplicated()` method, by itself, doesn't remove or change any data. It simply acts as an identifier, returning a boolean Series (`True`/`False`) that flags which rows meet the duplicate criteria. A separate action, like using [[Python - pandas .drop_duplicates() Method|.drop_duplicates()]], is needed to act on these flags.

```
Conceptual view of how `keep` works on the 'John Smith' entries:

DataFrame:
+-------+------------+-----------+-----------------+
| Index | first_name | last_name | signup_source   |
+-------+------------+-----------+-----------------+
|   0   |    John    |   Smith   |      web        |
|   2   |    John    |   Smith   |      web        |
|   4   |    John    |   Smith   |      mobile     |
+-------+------------+-----------+-----------------+

Resulting Boolean Series:
+-------+---------------+--------------+--------------+
| Index | keep = 'first'| keep = 'last'| keep = False |
+-------+---------------+--------------+--------------+
|   0   |     False     |     True     |     True     |
|   2   |     True      |     True     |     True     |
|   4   |     True      |     False    |     True     |
+-------+---------------+--------------+--------------+
```

## Details

The `.duplicated()` method in pandas is not a blunt instrument; it offers powerful arguments to precisely define what constitutes a duplicate for your specific use case. The `subset` argument allows you to narrow the focus of the check to only the most important columns, such as key identifiers like `first_name` and `last_name`. Concurrently, the `keep` argument provides control over which instance of a duplicate group is marked—the first one encountered, the last one, or all of them. Mastering these parameters is a critical step in the broader [[Python - Data Cleaning|data cleaning]] workflow.

#### Primary Goal

To provide fine-grained control over the identification of duplicate rows in a pandas DataFrame by specifying which columns to check and which occurrences to flag.

#### Mechanism

- **Step 1: Create a DataFrame**
    - First, we'll create a sample DataFrame containing duplicate and partially duplicate entries to demonstrate the parameters.
- **Step 2: Use `subset` to Define Duplicates**
    - We specify a list of column names for the `subset` argument. Pandas will now only consider a row a duplicate if the values in *all* of these specified columns match another row.
- **Step 3: Use `keep` to Control Flagging**
    - We demonstrate the three options for `keep`:
    - `keep='first'`: (Default) Marks all but the first occurrence of a duplicate set as `True`.
    - `keep='last'`: Marks all but the last occurrence of a duplicate set as `True`.
    - `keep=False`: Marks *all* occurrences of a duplicate set as `True`.

##### Code Translation

```python
import pandas as pd

# --- Step 1: Create a DataFrame ---
data = {
    'first_name': ['John', 'Jane', 'John', 'Peter', 'John'],
    'last_name': ['Smith', 'Doe', 'Smith', 'Jones', 'Smith'],
    'signup_source': ['web', 'mobile', 'web', 'web', 'mobile']
}
df = pd.DataFrame(data)
print("Original DataFrame:")
print(df)

# --- Step 2 & 3: Use subset and keep ---

# Define the columns to check for duplication
column_subset = ['first_name', 'last_name']

# Example 1: keep='first' (default behavior)
# Only the second and third 'John Smith' are marked as duplicates.
df_first = df.duplicated(subset=column_subset, keep='first')
print("\nDuplicates (keep='first'):")
print(df_first)

# Example 2: keep='last'
# The first and second 'John Smith' are marked as duplicates.
df_last = df.duplicated(subset=column_subset, keep='last')
print("\nDuplicates (keep='last'):")
print(df_last)

# Example 3: keep=False
# All three 'John Smith' rows are marked as duplicates.
df_all = df.duplicated(subset=column_subset, keep=False)
print("\nDuplicates (keep=False):")
print(df_all)
```

 [[Code - pandas .duplicated() Method Parameters Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`subset`** (list-like, optional)
    - Takes a list of column labels to use for identifying duplicates. If not provided, all columns in the DataFrame are used.
- **`keep`** ({'first', 'last', False}, default 'first')
    - `'first'`: Marks duplicates as `True` except for the first occurrence.
    - `'last'`: Marks duplicates as `True` except for the last occurrence.
    - `False`: Marks all duplicates as `True`.

#### Core Trade-offs

- **Specificity vs. Overlooking Duplicates**
    - Using `subset` is powerful for finding duplicates based on key identifiers (e.g., name and address). However, being too restrictive with the subset might cause you to miss 'true' duplicates where all columns are identical but one of your subset columns has a minor typo.
- **Premature Data Loss vs. Thorough Investigation**
    - The `keep` parameter directly influences which rows are flagged. Choosing `'first'` or `'last'` is an implicit decision to preserve one record over others. If the non-duplicate columns contain different, valuable information (like different signup sources), this can lead to information loss. Setting `keep=False` allows you to flag all instances for a more careful, manual review, which is a safer approach when dealing with [[Python - Handling Incomplete Duplicates|incomplete duplicates]].

## Connections

```
                 (Parent)
        pandas .duplicated() Method
                   ▲
                   │
┌──────────────────┼──────────────────┐
│                  │                  │
│      ┌───────────────────────────┐  │
│      │ .duplicated() Parameters  │  │
│      └───────────────────────────┘  │
│                                     │
└─────────────────────────────────────┘
(Used by)                               (Foundation for)
.drop_duplicates() Method               Identifying Duplicates Process
```

### Parent Concept

This concept provides a detailed look at the key parameters of the [[Python - pandas .duplicated() Method|pandas .duplicated() method]].

### Child Concepts



### Related Concepts 

- The [[Python - pandas .drop_duplicates() Method|`.drop_duplicates()` method]] is the direct consumer of these flags, using the exact same `subset` and `keep` parameters to remove the rows identified here.
- The [[Python - Process for Identifying and Analyzing Duplicates|overall process for handling duplicates]] relies on using these parameters to correctly flag the right data for further investigation or removal.
- Understanding these parameters is a fundamental skill in [[Python - Data Cleaning|data cleaning]], as it prevents the incorrect or premature removal of important data.
## Questions

- You're analyzing customer sign-up data and notice duplicates based on `first_name` and `last_name`. However, the `signup_timestamp` and `referral_source` columns are different for these 'duplicates'. How would you use the `keep` parameter to investigate this, and what business-level questions would you ask before deciding to drop any of these records?
- In a large-scale data pipeline that processes millions of records daily, running `.duplicated(subset=[...], keep=False)` could generate a massive boolean Series, consuming significant memory. How would you design a more memory-efficient, perhaps iterative, approach to identify and log all occurrences of duplicates based on a specific subset of columns?
- What if the `subset` parameter could accept not just column names, but a custom function that defines 'sameness' (e.g., a function that considers 'John Smith' and 'J. Smith' as duplicates)? How would this change your approach to identifying complex, non-exact duplicates?