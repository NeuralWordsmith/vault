---
tags: 
  - core
  - python
  - pandas
  - merge
  - outer_join
  - dataframe
  - data_combination
  - concept
source: 
  - "[[Joining Data with pandas]]"
related: 
  - "[[Python - Outer Join (pandas)]]"
  - "[[Python - Right Join (pandas)]]"
  - "[[Python - Right Join Example (Movie Genres)]]"
  - "[[Python - Merging on Different Column Names (left_on, right_on)]]"
  - "[[Python - Inner Join (pandas)]]"
  - "[[Python - Left Join (pandas)]]"
  - "[[Python - pandas DataFrames]]"
  - "[[Python - Handling Missing Data (pandas)]]"
  - "[[Fundamental - SQL]]"
  - "[[SQL - JOIN Clause]]"
  - "[[SQL - OUTER JOIN]]"
  - "[[Python - NumPy (Numeric Python)]]"
---
# Core: Outer Join Example (Movie Genres)

## Summary

>This note provides a concrete, step-by-step example of performing an outer join in pandas. It uses two small DataFrames, one for 'Family' movies and one for 'Comedy' movies, to illustrate how an outer join includes all records from both tables, filling in `NaN` for non-matching entries. This contrasts with other join types like the [[Python - Right Join (pandas)|right join]], which would only keep all records from the second (right) table.

**Why This Matters:** This example visually demonstrates how to combine two datasets to create a complete picture, ensuring no data is lost even when records don't have a match in the other set.

_Analogy:_ _Imagine you and a friend are planning a joint party. You each have a separate guest list with names and the dish they promised to bring. An outer join is like creating a master guest list that includes *everyone* from both your list and your friend's list. If a person is on both lists, you'll see the dish they told you and the dish they told your friend. If a guest is only on your list, their entry on the master list will have a blank space for the dish your friend was told about, and vice-versa._

  *   **Your Guest List**: The left DataFrame (`family`).
  *   **Friend's Guest List**: The right DataFrame (`comedy`).
  *   **Guest Name**: The joining key (`movie_id`).
  *   **Dish Promised**: The data columns (`genre`).
  *   **Master Guest List**: The final merged DataFrame.
  *   **Blank Spaces**: The `NaN` or null values.
  *   **Where it breaks down:** The analogy implies two separate columns for "dish," which maps well to using suffixes. However, in a real database, you'd likely merge into a single "guest" table, whereas this pandas example creates a wider table with distinct columns from each source.

```
Left DF (family)      Right DF (comedy)          Result (how='outer')
+----------+--------+  +----------+--------+      +----------+-----------+-----------+
| movie_id | genre  |  | movie_id | genre  |      | movie_id | genre_fam | genre_com |
+----------+--------+  +----------+--------+      +----------+-----------+-----------+
|    12    | Family |  |     5    | Comedy |      |    5     |    NaN    |  Comedy   |
|    35    | Family |  |    13    | Comedy |      |    12    |  Family   |    NaN    |
|   105    | Family |  |    35    | Comedy |      |    13    |    NaN    |  Comedy   |
+----------+--------+  +----------+--------+      |    35    |  Family   |  Comedy   |
                                                  |   105    |  Family   |    NaN    |
                                                  +----------+-----------+-----------+
```

## Details

This example demonstrates the practical application of an outer join using pandas. We start by filtering a main `movie_to_genres` table to create two smaller, specialized tables: one for 'Family' movies and another for 'Comedy' movies. By merging these two tables using an outer join on the `movie_id` column, we can see the outcome clearly. The resulting table includes every movie from both original tables. Crucially, where a movie ID exists in one table but not the other (like ID 12 in the family table or ID 13 in the comedy table), the corresponding genre from the missing table is filled with a null (`NaN`) value, perfectly illustrating the inclusive nature of this join type.

#### Primary Goal

To provide a clear, visual walkthrough of how an outer join works in pandas, specifically showing how it preserves all records from both input DataFrames and uses nulls to represent missing matches.

#### Mechanism

- **Step 1: Prepare the DataFrames**
    - Two distinct pandas DataFrames are created. The first, `family`, contains movie IDs classified as 'Family'. The second, `comedy`, contains movie IDs for 'Comedy'. Notice that `movie_id` 35 exists in both, which will be a matching key.
- **Step 2: Perform the Outer Join**
    - The `.merge()` method is called on the `family` DataFrame. We specify the `comedy` DataFrame as the one to merge with, set the `on` parameter to `'movie_id'`, and most importantly, set the `how` argument to `'outer'`. Suffixes `_fam` and `_com` are added to distinguish the origin of the identically named `genre` columns.
- **Step 3: Analyze the Result**
    - The output DataFrame contains all unique `movie_id`s from both tables (5, 12, 13, 35, 105). For `movie_id` 12 (only in `family`), `genre_com` is `NaN`. For `movie_id` 13 (only in `comedy`), `genre_fam` is `NaN`. For `movie_id` 35 (in both), both `genre_fam` and `genre_com` are populated with their respective values.

##### Code Translation

```python
import pandas as pd

# --- Step 1: Prepare the DataFrames ---
# In a real scenario, this would come from a larger table.
# For this example, we'll create them directly based on the context image.
family_data = {'movie_id': [12, 35, 105], 'genre': ['Family', 'Family', 'Family']}
family = pd.DataFrame(family_data)

comedy_data = {'movie_id': [5, 13, 35], 'genre': ['Comedy', 'Comedy', 'Comedy']}
comedy = pd.DataFrame(comedy_data)

print("Family DataFrame:")
print(family)
print("\nComedy DataFrame:")
print(comedy)

# --- Step 2: Perform the Outer Join ---
# We merge 'family' (left) with 'comedy' (right)
family_comedy = family.merge(comedy, on='movie_id', how='outer', suffixes=('_fam', '_com'))

# --- Step 3: Analyze the Result ---
print("\nResult of Outer Join:")
print(family_comedy)
```

 [[Code - Outer Join Example (Movie Genres) Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- `how='outer'`
    - This is the key parameter that specifies the type of join. It instructs pandas to include all keys from both the left (`family`) and right (`comedy`) DataFrames, creating the union of the keys.
- `on='movie_id'`
    - This tells the merge function which column to use as the key for matching rows between the two DataFrames.
- `suffixes=('_fam', '_com')`
    - This is necessary because both DataFrames have a column named 'genre'. The suffixes are appended to these column names in the final output to avoid ambiguity and clarify which table each column originated from.

#### Core Trade-offs

- **Pro: Data Completeness**
    - The primary advantage is that no information is lost. Every single row from both tables is represented in the output, making it ideal for creating a comprehensive dataset for analysis.
- **Con: Generation of Nulls**
    - The inclusiveness of the outer join often results in `NaN` (null) values where matches don't exist. This requires subsequent data cleaning steps (e.g., filling nulls with a default value or dropping rows) before the data can be used in many machine learning models.

## Connections

```
                  (Parent)
            Outer Join (pandas)
                     ▲
                     │
┌────────────────────┼────────────────────┐
│                    │                    │
(Sibling Example) ┌──────────────────────────┐ (Contrasting Join)
Right Join Example│ Outer Join Example       │ Right Join (pandas)
                  │ (Movie Genres)           │
                  └──────────────────────────┘
```

### Parent Concept

This example is a practical application of the [[Python - Outer Join (pandas)|outer join]], which is a method for combining DataFrames by including all keys present in both.

### Child Concepts



### Related Concepts 

- This example directly contrasts with the [[Python - Right Join Example (Movie Genres)|right join example]], which would have only preserved all rows from the `comedy` table.
- The underlying mechanism is similar to a [[Python - Right Join (pandas)|right join]], but it extends the logic to be inclusive of both tables instead of just one.
- If the `movie_id` columns had different names, we would need to use the parameters discussed in [[Python - Merging on Different Column Names (left_on, right_on)|merging on different column names]].
## Questions

- You've used an outer join to combine customer data from your company's sales system with data from a newly acquired company. The result has many nulls. How would you explain to a marketing manager why it's still valuable to keep these "incomplete" customer profiles, and what strategy would you propose to handle the nulls before launching a targeted campaign?
- Imagine these `family` and `comedy` tables are massive, each containing billions of rows stored in a distributed file system. How would the `merge` operation change? What are the potential performance bottlenecks (e.g., shuffling data), and how might a framework like Spark handle this outer join differently than pandas?
- What if you were not allowed to use a `merge` or `join` function at all? How could you replicate the result of this outer join using only basic DataFrame operations like concatenation, dropping duplicates, and conditional logic?