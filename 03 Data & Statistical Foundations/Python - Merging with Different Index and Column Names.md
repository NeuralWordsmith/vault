---
tags:
  - core
  - pandas
  - merge
  - join
  - left_on
  - right_on
  - concept
source:
  - "[[Joining Data with pandas]]"
related:
  - "[[Python - Merging DataFrames]]"
  - "[[Python - Merging on Indexes]]"
  - "[[Python - left_index and right_index Parameters]]"
  - "[[Python - Merging on a MultiIndex]]"
  - "[[Pandas - Concatenating DataFrames]]"
  - "[[Pandas - Setting and Resetting Index]]"
  - "[[Pandas - DataFrame]]"
  - "[[Fundamental - SQL]]"
  - "[[SQL - JOIN]]"
  - "[[Fundamental - Data Cleaning]]"
  - "[[Fundamental - Data Wrangling]]"
  - "[[Python - Dictionaries]]"
---
# Core: left_on and right_on Parameters

## Summary

>The `left_on` and `right_on` parameters in the Pandas `.merge()` method allow you to specify the names of the key columns or index levels to join on, which is essential when these keys have different names in the left and right DataFrames.

**Why This Matters:** These parameters provide the flexibility to join datasets from disparate sources without the need for pre-processing, streamlining the data integration process when key columns are named differently.

_Analogy:_ _Imagine you're a wedding planner creating a master guest list from two spreadsheets. One from Partner A lists guests under a column named "Invitee_Name", and the other from Partner B uses the column header "Guest_Full_Name". To combine these lists and match up the RSVPs, you can't just look for a common column name. You have to explicitly tell your assistant, "Match the 'Invitee_Name' from this list with the 'Guest_Full_Name' from that list." The `left_on` and `right_on` parameters are you giving this explicit instruction to Pandas._

{
  "Partner A's List": "The left DataFrame.",
  "Partner B's List": "The right DataFrame.",
  "'Invitee_Name'": "The key specified in `left_on`.",
  "'Guest_Full_Name'": "The key specified in `right_on`.",
  "The Master Guest List": "The final merged DataFrame.",
  "**Where it breaks down:**": "The analogy implies the names are just strings. In Pandas, the values within those columns must also match for a successful merge. If 'John Smith' is spelled 'Jon Smith' in the other list, the merge won't happen on that row, whereas a human planner might catch the typo."
}

```
Left DataFrame: movies          Right DataFrame: movies_to_genres
+-----+---------------+         +----------+-----------------+
| id  | title         |         | movie_id | genre           |
+=====+===============+         +==========+=================+
| 5   | Four Rooms    |         | 5        | Crime           |
| 11  | Star Wars     |         | 5        | Comedy          |
+-----+---------------+         | 11       | Science Fiction |
                                +----------+-----------------+
          │
          │ pd.merge(..., left_on='id', right_on='movie_id')
          ▼

Merged DataFrame
+-----+-----------+-----------------+
| id  | title     | genre           |
+=====+===========+=================+
| 5   | Four Rooms| Crime           |
| 5   | Four Rooms| Comedy          |
| 11  | Star Wars | Science Fiction |
+-----+-----------+-----------------+
```

## Details

In real-world data analysis, it's rare for datasets from different sources to have perfectly matching column names, even when they refer to the same entity. For instance, a `movies` table might use `id` to identify a movie, while a `genres` table uses `movie_id`. The `left_on` and `right_on` parameters in Pandas provide a direct and flexible solution to this common problem, allowing you to perform a merge by explicitly stating which column from the left DataFrame should be matched with which column from the right DataFrame. This avoids the intermediate step of renaming columns just to perform a join.

#### Primary Goal

To join two DataFrames on key columns or index levels that have different names.

#### Mechanism

- **Step 1: Identify the DataFrames and Keys**
    - Start with two Pandas DataFrames. Identify the column or index in the left DataFrame and the corresponding column or index in the right DataFrame that you want to use for the merge. Note that their names are different.
- **Step 2: Call the `.merge()` Method**
    - Call the `.merge()` method on the left DataFrame, passing the right DataFrame as the first argument.
- **Step 3: Specify the Left and Right Keys**
    - Use the `left_on` parameter to pass the name of the key column/index from the left DataFrame. Use the `right_on` parameter to pass the name of the key column/index from the right DataFrame.
- **Step 4: Handle Index-based Merges (Optional)**
    - If one of the keys is an index, you must also set the corresponding parameter (`left_index=True` or `right_index=True`) to `True`. As shown in the source example, this is used alongside `left_on` and `right_on` when merging on indexes with different names.

##### Code Translation

```python
import pandas as pd

# --- Step 1: Prepare the DataFrames ---
# Left DataFrame ('movies') with 'id' as the index
movies_data = {
    'id': [5, 11, 257, 9672],
    'title': ['Four Rooms', 'Star Wars', 'Oliver Twist', 'Infamous'],
    'popularity': [22.8, 126.3, 20.4, 3.6]
}
movies = pd.DataFrame(movies_data).set_index('id')

# Right DataFrame ('movies_to_genres') with 'movie_id' as the index
genres_data = {'genre': ['Crime', 'Comedy', 'Science Fiction', 'Action', 'Adventure']}
movies_to_genres = pd.DataFrame(genres_data, index=pd.Index([5, 5, 11, 11, 11], name='movie_id'))

print("--- Left DataFrame (movies) ---")
print(movies)
print("\n--- Right DataFrame (movies_to_genres) ---")
print(movies_to_genres)

# --- Step 2, 3 & 4: Merge using left_on, right_on, and index flags ---
# We merge on the index of both tables, which have different names ('id' and 'movie_id')
movies_genres = movies.merge(movies_to_genres,
                             left_on='id',
                             right_on='movie_id',
                             left_index=True,
                             right_index=True)

print("\n--- Merged DataFrame ---")
print(movies_genres.head())
```

 [[Code - left_on and right_on Parameters Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`left_on`**
    - A string or list of strings specifying the column or index level name(s) in the left DataFrame to use as the join key(s).
- **`right_on`**
    - A string or list of strings specifying the column or index level name(s) in the right DataFrame to use as the join key(s).

#### Core Trade-offs

- **Pro: Flexibility**
    - Avoids the need to create intermediate copies of DataFrames just to rename columns, making code more concise and potentially more memory-efficient.
- **Con: Reduced Readability**
    - Can sometimes make the merge logic less explicit. A reader has to check the parameters to understand the join condition, whereas renaming columns to match beforehand makes the join condition self-evident.
- **Con: Redundant Columns**
    - After the merge, the resulting DataFrame will contain both key columns (e.g., `id` and `movie_id`). This can be redundant and may require an extra step to drop one of the columns.

## Connections

```
                              (Parent)
                       Pandas - Merging on Indexes
                                  ▲
                                  │
   ┌──────────────────────────────┼──────────────────────────────┐
   │                              │                              │
(Alternative Method)      ┌──────────────────────────────────┐      (Related Parameter)
Rename Column then Merge  │ left_on and right_on Parameters  │      left_index and right_index
                          └──────────────────────────────────┘
```

### Parent Concept

This concept is a specific technique used within the broader topic of [[Python - Merging on Indexes]], providing a way to handle joins when index names do not align.

### Child Concepts



### Related Concepts 

- This method is a core part of the general process of [[Python - Merging DataFrames|merging DataFrames in Pandas]].
- It works in conjunction with the [[Python - left_index and right_index Parameters|left_index and right_index parameters]] when the mismatched keys are in the DataFrame's index.
- It provides a more flexible alternative to the standard approach of [[Python - Merging on Indexes|merging on indexes]] where the index names are assumed to be identical.
## Questions

- In a collaborative project, when would you enforce a strict policy of renaming columns to a standard convention before merging, versus allowing developers to use `left_on` and `right_on`? Discuss the trade-offs in terms of development speed, code maintainability, and potential for bugs.
- Imagine you are building a data pipeline that joins customer data from a CRM (with key `customer_id`) and a sales database (with key `client_num`). How would you design this merge step to be resilient to schema changes, such as the sales DB changing its key to `customer_number` in a future update?
- What if Pandas only allowed you to merge on columns with the exact same name? Describe a memory-efficient function you could write to perform a merge on two very large DataFrames (that don't fit in memory twice) where the key columns are named differently, without using `left_on` or `right_on`.