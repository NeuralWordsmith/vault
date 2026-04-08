---
tags: 
  - core
  - python
  - multiindex
  - pandas
  - get_level_values
  - dataframe
  - indexing
  - concept
source: 
  - "[[Cleaning Data in Python]]"
related: 
  - "[[Python - Multi-Index DataFrames in Record Linkage]]"
  - "[[Python - Record Linkage Workflow 1]]"
  - "[[Python - Filtering Potential Matches by Score]]"
  - "[[Python - Inverting a Boolean Index with the Tilde (~) Operator]]"
  - "[[Python - Concatenating DataFrames with pandas.concat()]]"
  - "[[Python - Data Types]]"
  - "[[Python - Lists]]"
  - "[[Python - Tuples]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - Indexing NumPy Arrays]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[Fundamental - Feature Engineering]]"
---
# Core: Extracting Multi-Index Level Values

## Summary

>In pandas, when working with a `[[Python - Multi-Index DataFrames in Record Linkage|Multi-Index DataFrame]]`, the `.get_level_values()` method is used to extract all index labels from a single, specified level. This is a common step in the `[[Python - Record Linkage Workflow 1|record linkage workflow]]` to isolate the original indices of matched records from one of the source DataFrames.

**Why This Matters:** This is crucial for isolating and acting upon records from a specific source dataset after they have been matched in a record linkage process.

_Analogy:_ _Think of a large library's cataloging system where each book has a two-part ID: `(Genre, Author_ID)`. The entire list of these pairs is the MultiIndex. Using `.get_level_values('Genre')` is like asking the librarian for a list of every single genre represented in the library, pulling just that piece of information from every book's ID._

**Where it breaks down:** The analogy implies a simple lookup. In pandas, this operation creates a new Index object in memory, which for extremely large DataFrames could have performance implications, unlike a librarian just reading off a list.

```
MultiIndex DataFrame 'matches':
+--------------------------------+---------+
|             Index              |         |
| census_A         | census_B    |  score  |
+------------------+-------------+---------+
| 'rec-1007-org'   | 'rec-2404'  |   0.9   |
| 'rec-1016-org'   | 'rec-4178'  |   0.85  |
| 'rec-1054-org'   | 'rec-1054'  |   1.0   |
+--------------------------------+---------+
                 |
                 | .index.get_level_values(1)
                 ▼
        Extracted Index:
['rec-2404', 'rec-4178', 'rec-1054']
```

## Details

When you access the `.index` attribute of a DataFrame with a hierarchical index, you get a `MultiIndex` object. This object contains tuples, where each tuple represents the combined index for a row. To isolate the indices from just one of the original sources (e.g., `census_B`), you can't just slice it directly. The `.get_level_values()` method provides a clean and efficient way to 'unstack' or extract all values from a single level of this index.

#### Primary Goal

To selectively retrieve all index values from a single, specified level of a pandas MultiIndex.

#### Mechanism

- **Step 1: Access the MultiIndex**
    - Start with your DataFrame (e.g., `matches`) that has a MultiIndex and access its index object using the `.index` attribute.
- **Step 2: Call get_level_values()**
    - Chain the `.get_level_values()` method to the index object.
- **Step 3: Specify the Level**
    - Pass the desired level to the method. This can be the level's integer position (0 for the first level, 1 for the second, etc.) or its string name if the index levels are named.

##### Code Translation

```python
import pandas as pd

# --- Setup: Create a sample Multi-Index DataFrame ---
# This represents our 'matches' DataFrame from the record linkage context
index_a = ['rec-1007-org', 'rec-1016-org', 'rec-1054-org']
index_b = ['rec-2404-dup-0', 'rec-4178-dup-0', 'rec-1054-dup-0']
multi_index = pd.MultiIndex.from_tuples(zip(index_a, index_b), names=['census_A', 'census_B'])
matches = pd.DataFrame({'score': [0.9, 0.85, 1.0]}, index=multi_index)

print("Original Multi-Index DataFrame:")
print(matches)
print("\n------------------------------------\n")

# --- Step 1: Access the MultiIndex ---
# The 'matches.index' attribute holds the MultiIndex object
multi_index_obj = matches.index
print("The MultiIndex object:")
print(multi_index_obj)
print("\n------------------------------------\n")

# --- Step 2 & 3: Call get_level_values() with the desired level ---
# We want the indices from census_B, which is the second level (index 1)
census_b_indices = matches.index.get_level_values(1)

print("Extracted indices from the second level (census_B):")
print(census_b_indices)
```

 [[Code - Extracting Multi-Index Level Values Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **level (int or str)**: The primary parameter that specifies which index level to extract.
    - *Integer*: Use `0` for the outermost level, `1` for the next level, and so on.
    - *String*: If the index levels have been assigned names (e.g., via `names=['name1', 'name2']`), you can pass the string name directly, which is often more readable.

#### Core Trade-offs

- **Readability vs. Brittleness**
    - Using integer positions (e.g., `1`) is concise but can be brittle. If the order of levels changes, the code will break or return incorrect data. Using string names is more robust and self-documenting.
- **Memory Usage**
    - Calling `.get_level_values()` on a very large DataFrame materializes a new Index object in memory containing all the values from that level. For memory-constrained applications with billions of rows, this could be a consideration.

## Connections

```
                               (Parent)
                 Multi-Index DataFrames in Record Linkage
                                  ▲
                                  │
        ┌─────────────────────────┼─────────────────────────┐
        │                         │                         │
(Used in Workflow)     ┌──────────────────────────────────┐     (Used to Process Output)
Record Linkage Workflow  │ Extracting Multi-Index Level Values │  Inverting a Boolean Index
                         └──────────────────────────────────┘
```

### Parent Concept

This method is a direct tool for manipulating the `[[Python - Multi-Index DataFrames in Record Linkage|Multi-Index DataFrames]]` that are often the output of record linkage libraries.

### Child Concepts



### Related Concepts 

- This operation is a key step within the broader `[[Python - Record Linkage Workflow 1|record linkage workflow]]`, used to handle the matched pairs.
- The indices extracted using this method are often used for subsequent steps, such as `[[Python - Filtering Potential Matches by Score|filtering matches]]` or identifying records to remove from an original dataset.
- Once you have a set of indices, you might use an operator like the `[[Python - Inverting a Boolean Index with the Tilde (~) Operator|tilde (~) operator]]` to select all *unmatched* records.
## Questions

- In a record linkage project, you've identified duplicate records. You could either drop the duplicates from one of the original DataFrames using the indices extracted with `.get_level_values()` or create a new, merged DataFrame. What are the business implications and data integrity risks of each approach?
- Imagine your `matches` DataFrame contains billions of rows. How might the performance of `.get_level_values()` be affected, and what alternative strategies could you use to efficiently identify and process records from one of the original sources without materializing the entire index level in memory?
- What if the `.get_level_values()` method didn't exist? How would you achieve the same result of extracting all indices from the second level of a MultiIndex using only basic list comprehensions or loops on the `.index` tuple-like structure?