---
tags: 
  - core
  - python
  - pandas
  - sort_values
  - multi-level_sort
  - ascending_parameter
  - dataframe_ordering
  - concept
source: 
  - "[[Data Manipulation with pandas]]"
related: 
  - "[[Python - Sorting DataFrames]]"
  - "[[Python - Sorting by Multiple Columns]]"
  - "[[Python - Sorting by a Single Column]]"
  - "[[Python - Pandas DataFrame]]"
  - "[[Python - Subsetting DataFrames]]"
  - "[[Python - DataFrame Indexing and Selection]]"
  - "[[Python - Method Chaining]]"
  - "[[Python - Subsetting Rows with Logical Conditions]]"
  - "[[Python - Subsetting with Multiple Conditions]]"
  - "[[Python - Subsetting with the isin() Method]]"
  - "[[Python - Data Types]]"
  - "[[Python - Lists]]"
---
# Core: Sorting with Custom Directions

## Summary

>In Pandas, sorting a DataFrame by multiple columns can be customized by passing a list of booleans to the `ascending` parameter of the `.sort_values()` method. This allows each column specified in the `by` parameter to have its own independent sort direction (ascending or descending), providing granular control over the final order of the data.

**Why This Matters:** This technique allows for creating sophisticated, real-world rankings by applying different sorting rules to different criteria simultaneously, such as finding the highest-rated products with the lowest price.

_Analogy:_ _Imagine you're the head librarian organizing a large book donation. Your primary goal is to feature the newest books first, so you sort by 'Publication Year' in descending order. However, for books published in the same year, you want to arrange them alphabetically by title for easy browsing. So, within each year, you sort by 'Title' in ascending order. The list of sorting rules—[Descending, Ascending]—is like the list of booleans you give to Pandas._

In this analogy:
- **The books** are the rows in your DataFrame.
- **'Publication Year' and 'Title'** are the columns you're sorting by.
- **Your two-part sorting rule** (newest first, then alphabetical) is the list passed to the `ascending` parameter, like `[False, True]`.
- **The final, organized bookshelf** is the sorted DataFrame.
- **Where it breaks down:** A librarian might use additional, subjective criteria on the fly. The Pandas sort is strictly rule-based and deterministic; it will always produce the same output for the same input and rules.

```
Goal: Sort by weight (ASC) then height (DESC)

Original DataFrame:
+---------+-----------+-----------+
| name    | weight_kg | height_cm |
+---------+-----------+-----------+
| Charlie | 24        | 43        |
| Lucy    | 24        | 46        |
| Bella   | 24        | 56        |
| Max     | 29        | 59        |
+---------+-----------+-----------+

.sort_values(by=['weight_kg', 'height_cm'], ascending=[True, False])

Sorted DataFrame:
+---------+-----------+-----------+
| name    | weight_kg | height_cm |
+---------+-----------+-----------+
| Bella   | 24        | 56        |  <-- Tie in weight, height is DESC
| Lucy    | 24        | 46        |  <-- Tie in weight, height is DESC
| Charlie | 24        | 43        |  <-- Tie in weight, height is DESC
| Max     | 29        | 59        |
+---------+-----------+-----------+
```

## Details

While [[Python - Sorting by Multiple Columns|sorting by multiple columns]] is powerful, its default behavior applies the same direction (ascending) to all columns. The real power comes when you need to rank data using opposing criteria. For example, you might want to find the heaviest dogs that are also the shortest. To achieve this, Pandas allows the `ascending` parameter to accept a list of booleans. This list must be the same length as the list of column names, with each boolean corresponding to a column, allowing you to specify `True` for ascending and `False` for descending on a per-column basis.

#### Primary Goal

To enable fine-grained, per-column control over the sort direction when ordering a DataFrame by multiple criteria.

#### Mechanism

- **Step 1: Define Sort Columns**
    - Create a Python list containing the string names of the columns you want to sort by. The order of columns in this list is critical, as it defines the sorting priority (e.g., sort by the first column, then the second for ties, and so on).
- **Step 2: Define Sort Directions**
    - Create a second list of the same length, containing boolean values. Each boolean corresponds to the column at the same index in the first list. Use `True` for an ascending sort and `False` for a descending sort.
- **Step 3: Apply `.sort_values()`**
    - Call the `.sort_values()` method on your DataFrame. Pass the list of column names to the `by` argument and the list of booleans to the `ascending` argument.

##### Code Translation

```python
import pandas as pd

data = {'name': ['Charlie', 'Lucy', 'Bella', 'Max'],
        'weight_kg': [24, 24, 24, 29],
        'height_cm': [43, 46, 56, 59]}
dogs = pd.DataFrame(data)

# --- Step 1: Define Sort Columns ---
# We want to sort by weight first, then by height.
sort_columns = ['weight_kg', 'height_cm']

# --- Step 2: Define Sort Directions ---
# We want weight to be ascending (True) and height to be descending (False).
sort_directions = [True, False]

# --- Step 3: Apply .sort_values() ---
# This will sort from lightest to heaviest, and for dogs with the same weight,
# it will sort them from tallest to shortest.
sorted_dogs = dogs.sort_values(by=sort_columns, ascending=sort_directions)

print(sorted_dogs)
# Output:
#       name  weight_kg  height_cm
# 2    Bella         24         56
# 1     Lucy         24         46
# 0  Charlie         24         43
# 3      Max         29         59
```

 [[Code - Sorting with Custom Directions Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`by` (list of strings)**: The list of column names to sort by. The order determines the hierarchy of sorting.
- **`ascending` (list of booleans)**: The list of sort directions. Its length MUST match the length of the `by` list. A `ValueError` will be raised if they do not match.
- **`inplace` (boolean, default `False`)**: If `True`, modifies the DataFrame in place and returns `None`. If `False`, returns a new, sorted DataFrame.
- **`na_position` (string, default `'last'`)**: Determines where `NaN` values are placed. Can be set to `'first'` to put them at the beginning or `'last'` to put them at the end.

#### Core Trade-offs

- **Clarity vs. Complexity**: For two or three columns, this method is clear and powerful. However, as the number of sorting criteria increases, the two separate lists for `by` and `ascending` can become difficult to read and maintain, increasing the risk of bugs due to mismatched indices.
- **Performance**: Sorting is a computationally intensive operation. Applying multi-level sorting, especially on large DataFrames, can be slow. The performance impact grows with the number of columns used for sorting.

## Connections

```
                      (Parent)
               Sorting DataFrames
                       ▲
                       │
┌──────────────────────┼──────────────────────┐
│                      │                      │
(Prerequisite) ┌───────────────────────────┐ (Prerequisite)
Sorting by a   │ Sorting with Custom       │ Sorting by
Single Column  │ Directions                │ Multiple Columns
               └───────────────────────────┘
                       │
                       │ (Used Before)
                       ▼
               Subsetting DataFrames
```

### Parent Concept

This is a specific technique used within the broader context of [[Python - Sorting DataFrames|sorting DataFrames in Pandas]].

### Child Concepts



### Related Concepts 

- This method is a direct extension of [[Python - Sorting by Multiple Columns|sorting by multiple columns]], adding a layer of directional control.
- It provides a more flexible alternative to [[Python - Sorting by a Single Column|sorting by a single column]] when a single criterion is insufficient for proper ranking.
- The sorted DataFrame produced by this method is often the input for subsequent [[Python - Subsetting DataFrames|subsetting operations]], such as selecting the top N records based on the complex sort order.
## Questions

- Imagine you're an e-commerce analyst. You need to identify products for a 'Hot Deals' promotion. You decide to sort by `review_score` (descending) and `inventory_count` (ascending). How would you justify this sorting strategy to the marketing team, and what potential business risk does sorting by low inventory first introduce?
- If you have a massive DataFrame (billions of rows) that doesn't fit in memory, how would you implement a multi-column sort with custom directions? Describe the challenges related to data partitioning and the 'reduce' step in a distributed environment like Dask or Spark.
- What if the `ascending` parameter in `.sort_values()` could accept not just booleans, but a custom callable function for each column? What new kinds of sorting possibilities would this unlock, and what would be a practical example (e.g., sorting strings by length, or sorting dates by the day of the week)?