---
tags: 
  - core
  - python
  - right_join
  - data_validation
  - left_on
  - right_on
  - merge
  - concept
source: 
  - "[[Joining Data with pandas]]"
related: 
  - "[[Python - Right Join (pandas)]]"
  - "[[Python - Merging on Different Column Names (left_on, right_on)]]"
  - "[[Python - Outer Join (pandas)]]"
  - "[[Python - Inner Join (pandas)]]"
  - "[[Python - Left Join (pandas)]]"
  - "[[Python - Outer Join Example (Family vs Comedy Movies)]]"
  - "[[Python - Pandas]]"
  - "[[Python - DataFrames]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[Fundamental - Data Cleaning]]"
  - "[[Fundamental - SQL]]"
  - "[[Python - Handling Missing Data]]"
  - "[[Python - NumPy (Numeric Python)]]"
---
# Core: Right Join Example (TV Movies)

## Summary

>This is a practical application of a [[Python - Right Join (pandas)|right join]], which is useful for data validation. The scenario involves merging a main `movies` table with a smaller `tv_genre` table, prioritizing keeping all records from the `tv_genre` table. The goal is to check if our main `movies` table is missing any movies that are listed in our specialized `tv_genre` table. This specific example also introduces the crucial technique of [[Python - Merging on Different Column Names (left_on, right_on)|merging on columns with different names]].

**Why This Matters:** This example demonstrates how a right join can be used as a diagnostic tool to identify records in a secondary table that are missing corresponding entries in a primary table.

_Analogy:_ _Imagine a catering company preparing for a big event. They have a master guest list (the `movies` table) with details for everyone invited. The client then sends a last-minute list of VIPs who absolutely *must* have a seat (the `tv_genre` table). The event manager performs a "right join" by taking the VIP list and looking up each person on the master guest list._

The manager's final list will include *all* VIPs. If a VIP was already on the master list, their details are pulled over. If a VIP was *not* on the master list, they are still added to the final seating chart, but their details (like meal preference) will be blank (`NaN` values). This highlights who was missed in the initial planning. **Where it breaks down:** This analogy simplifies the data to a single key (guest name). In pandas, joins can be complex, involving multiple columns, and the resulting data structure is a new DataFrame, not just a modified list.

```
Left Table: movies             Right Table: tv_genre
+-----+----------+             +----------+----------+
| id  | title    |             | movie_id | genre    |
+-----+----------+             +----------+----------+
| 9672| Infamous | --┐         ┌--| 10947    | TV Movie |
| ... | ...      |   | match   |  | 13187    | TV Movie |
+-----+----------+   └-------->| 9672     | TV Movie |
                               | ...      | ...      |
                               +----------+----------+
                                       │
                                       ▼
                  Result: tv_movies (how='right')
+------+----------+----------+----------+----------+
| id   | title    | ...      | movie_id | genre    |
+------+----------+----------+----------+----------+
| NaN  | NaN      | NaN      | 10947    | TV Movie | <- Kept from right
| NaN  | NaN      | NaN      | 13187    | TV Movie | <- Kept from right
|9672.0| Infamous | ...      | 9672     | TV Movie | <- Matched
| ...  | ...      | ...      | ...      | ...      |
+------+----------+----------+----------+----------+
(All rows from tv_genre are kept)
```

## Details

This example provides a concrete use case for a right join. We start with two DataFrames: a comprehensive `movies` table and a smaller, specialized `tv_genre` table containing only movies of the 'TV Movie' genre. Our objective is to merge them, treating `movies` as the left table and `tv_genre` as the right. By using a right join, we ensure that every single movie from the `tv_genre` table is included in the final result. This is a powerful technique for data validation, as it immediately reveals if any 'TV Movie' entries from our genre list are missing from our main `movies` database, which would show up as rows with `NaN` values in the columns from the `movies` table.

#### Primary Goal

To demonstrate how to use a right join with `left_on` and `right_on` to merge two tables and simultaneously check for missing data in the left table.

#### Mechanism

- **Step 1: Define the DataFrames**
    - We have two pandas DataFrames. The `movies` DataFrame (left) contains general movie information with an `id` column. The `tv_genre` DataFrame (right) contains a list of movies belonging to the 'TV Movie' genre, identified by a `movie_id` column.
- **Step 2: Perform the Right Join**
    - We call the `.merge()` method on the left DataFrame (`movies`). We specify the right DataFrame (`tv_genre`) as the first argument.
- **Step 3: Specify Join Type and Keys**
    - We set `how='right'` to ensure all rows from `tv_genre` are kept. Since the key columns have different names (`id` vs. `movie_id`), we use the `left_on='id'` and `right_on='movie_id'` parameters to tell pandas which columns to match.
- **Step 4: Analyze the Result**
    - The resulting `tv_movies` DataFrame contains all rows from `tv_genre`. Where a `movie_id` from `tv_genre` found a match in the `id` column of `movies`, the data is combined. If no match was found, the columns from the `movies` table will be filled with `NaN` for that row.

##### Code Translation

```python
import pandas as pd

# --- Step 1: Define the DataFrames ---
# Assume 'movies' DataFrame exists from a larger dataset
movies_data = {'id': [257, 14290, 38365, 9672, 12819],
               'title': ['Oliver Twist', 'Better Luck Tomorrow', 'Grown Ups', 'Infamous', 'Alpha and Omega'],
               'popularity': [20.4, 3.8, 38.8, 3.6, 12.3]}
movies = pd.DataFrame(movies_data)

# Assume 'tv_genre' DataFrame is a subset focused on one genre
tv_genre_data = {'movie_id': [10947, 13187, 22488, 78814, 153397, 9672],
                 'genre': ['TV Movie', 'TV Movie', 'TV Movie', 'TV Movie', 'TV Movie', 'TV Movie']}
tv_genre = pd.DataFrame(tv_genre_data)
# Note: movie_id 9672 was added to tv_genre to show a successful match.

# --- Step 2 & 3: Perform the Right Join with different keys ---
tv_movies = movies.merge(tv_genre,
                         how='right',
                         left_on='id',
                         right_on='movie_id')

# --- Step 4: Analyze the Result ---
# The output will show NaN for movies in tv_genre not found in the main movies table.
print(tv_movies)

#      id      title  popularity  movie_id     genre
# 0   NaN        NaN         NaN     10947  TV Movie
# 1   NaN        NaN         NaN     13187  TV Movie
# 2   NaN        NaN         NaN     22488  TV Movie
# 3   NaN        NaN         NaN     78814  TV Movie
# 4   NaN        NaN         NaN    153397  TV Movie
# 5  9672.0  Infamous        3.6      9672  TV Movie
```

 [[Code - Right Join Example (TV Movies) Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`how='right'`**: This is the core parameter that specifies the type of join. It instructs pandas to include all keys from the right DataFrame (`tv_genre`) in the result, regardless of whether they have a match in the left DataFrame (`movies`).
- **`left_on='id'`**: This parameter is used when the key column in the left DataFrame has a different name than the key column in the right. It explicitly tells the merge operation to use the 'id' column from the `movies` DataFrame for matching.
- **`right_on='movie_id'`**: This works in tandem with `left_on`. It specifies that the 'movie_id' column from the `tv_genre` DataFrame should be used as the key for the merge operation. This is a key part of the [[Python - Merging on Different Column Names (left_on, right_on)|technique for merging on differently named columns]].

#### Core Trade-offs

- **Pro: Excellent for Data Validation**
    - The primary advantage shown here is its utility as a diagnostic tool. It quickly highlights records that exist in a reference table (right) but are missing from a primary data table (left), which is invaluable for maintaining data integrity.
- **Con: Can Introduce Null Values**
    - The main trade-off is the introduction of `NaN` (Not a Number) values. For every row in the right table that doesn't find a match in the left, all columns from the left table will be populated with `NaN`, which may require subsequent data cleaning steps.
- **Con: Result Size is Dictated by the Right Table**
    - The number of rows in the output will be at least the number of rows in the right table. If the right table is very large, this can lead to a large resulting DataFrame, potentially with many null values.

## Connections

```
                               (Parent)
                         Right Join (pandas)
                                  ▲
                                  │
    ┌─────────────────────────────┼──────────────────────────────┐
    │                             │                              │
(Related)              ┌──────────────────────────────────┐            (Related)
Outer Join (pandas)    │ Right Join Example (TV Movies)   │            Merging on Different Column Names
                       └──────────────────────────────────┘
```

### Parent Concept

This example is a practical application of the [[Python - Right Join (pandas)|right join]], which is a fundamental database-style operation for combining DataFrames.

### Child Concepts



### Related Concepts 

- The technique used here relies on [[Python - Merging on Different Column Names (left_on, right_on)|merging on columns with different names]], which is essential when joining datasets from different sources.
- This method contrasts with an [[Python - Outer Join (pandas)|outer join]], which would keep all records from *both* tables, regardless of whether a match is found.
- For a different data validation scenario, one might explore the [[Python - Outer Join Example (Family vs Comedy Movies)|outer join example]], which is useful for finding unique entries in two distinct but related datasets.
## Questions

- Imagine our `movies` table is a live production database and the `tv_genre` table is a daily file from a third-party provider. If you run this right join and find thousands of `NaN` values, how would you decide whether the issue is with our database (missing data) or the provider's file (bad data)? What's the business risk of making the wrong call?
- If this merge operation was part of a data pipeline that runs every hour on millions of records, what performance bottlenecks might you anticipate from using `left_on` and `right_on` with non-indexed string columns versus indexed integer columns? How would you design the system to mitigate this?
- What if you were told you could no longer use `NaN` values in your final dataset for a machine learning model, but you still needed to perform this exact data validation check? How could you modify the join or post-processing steps to represent the 'missing movie' information without using nulls?