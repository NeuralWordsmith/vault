---
tags: 
  - core
  - python
  - multi-level sort
  - hierarchical sorting
  - pandas
  - dataframe
  - sort_values
  - concept
source: 
  - "[[Data Manipulation with pandas]]"
related: 
  - "[[Python - Sorting DataFrames]]"
  - "[[Python - Sorting by a Single Column]]"
  - "[[Python - Controlling Sort Direction]]"
  - "[[Python - Pandas DataFrame]]"
  - "[[Python - Subsetting DataFrames]]"
  - "[[Python - Subsetting with Multiple Conditions]]"
  - "[[Python - Subsetting Rows with Logical Conditions]]"
  - "[[Python - Subsetting Columns]]"
  - "[[Python - DataFrame Indexing and Selection]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - Data Types]]"
  - "[[Python - Lists]]"
---
# Core: Sorting by Multiple Columns

## Summary

>In data analysis, sorting by a single criterion often results in ties. Sorting by multiple columns, or multi-level sorting, resolves this by establishing a hierarchy of sorting criteria. The data is first sorted by a primary column, and then any rows with tied values in that column are sorted by a secondary column, and so on. This creates a stable, predictable, and more granular ordering of the data.

**Why This Matters:** Sorting by multiple columns allows for creating nuanced, hierarchical orderings in data, which is essential for generating ranked reports or preparing data for specific analyses where tie-breaking is critical.

_Analogy:_ _Think of sorting a contact list on your phone. The primary sort is by 'Last Name'. But what if you know several people with the last name 'Smith'? The phone then uses a secondary sort key, 'First Name', to arrange them alphabetically: 'Smith, Adam' comes before 'Smith, John'. If you somehow had two 'John Smiths', a tertiary key like 'Middle Initial' might be used._

In this analogy, the contact list is the DataFrame. 'Last Name' is the primary sort column (`weight_kg` in the example), and 'First Name' is the secondary sort column (`height_cm`). The list of column names `["Last Name", "First Name"]` defines the sorting hierarchy. 
* **Where it breaks down:** This analogy is very direct. The main difference is that data sorting is purely algorithmic and deterministic, whereas a person manually sorting might apply other unstated rules or biases.

```
Original Data (Simplified)
+---------+-----------+-----------+
| Name    | weight_kg | height_cm |
+---------+-----------+-----------+
| Charlie | 24        | 43        |
| Lucy    | 24        | 46        |
| Bella   | 24        | 56        |
| Cooper  | 17        | 49        |
+---------+-----------+-----------+

      sort_values(["weight_kg", "height_cm"])
                       │
                       ▼

Sorted Data
+---------+-----------+-----------+
| Name    | weight_kg | height_cm |  <-- First, sorted by weight_kg
+---------+-----------+-----------+
| Cooper  | 17        | 49        |
| Charlie | 24        | 43        |  <-- Then, within the '24' group,
| Lucy    | 24        | 46        |  <-- sorted by height_cm
| Bella   | 24        | 56        |
+---------+-----------+-----------+
```

## Details

When a single sorting criterion, as seen in [[Python - Sorting by a Single Column|sorting by a single column]], is insufficient to uniquely order all rows, multi-level sorting provides a deterministic way to resolve ambiguities. It establishes a clear hierarchy of importance for ordering the data by applying subsequent sorting criteria to break ties from the preceding criteria. In Pandas, this is achieved by passing an ordered list of column names to the `.sort_values()` method.

#### Primary Goal

To create a stable and predictable row order by resolving ties in a primary sort key using one or more secondary sort keys.

#### Mechanism

- **Step 1: Define the Sort Hierarchy**
    - Determine the order of importance for the columns you want to sort by. The first column in the list will be the primary sort key, the second will be the secondary key used to break ties in the first, and so on.
- **Step 2: Pass the Column List to `sort_values()`**
    - Provide this ordered list of column names to the `by` parameter of the DataFrame's `.sort_values()` method.
- **Step 3: Observe the Hierarchical Result**
    - Pandas first sorts the entire DataFrame by the first column in the list. Then, within each group of identical values in that first column, it sorts the rows based on the values in the second column. This process continues for all columns in the list.

##### Code Translation

```python
import pandas as pd

# --- Step 1: Prepare the Data ---
data = {'name': ['Bella', 'Charlie', 'Lucy', 'Cooper', 'Max', 'Stella', 'Bernie'],
        'breed': ['Labrador', 'Poodle', 'Chow Chow', 'Schnauzer', 'Labrador', 'Chihuahua', 'St. Bernard'],
        'color': ['Brown', 'Black', 'Brown', 'Gray', 'Black', 'Tan', 'White'],
        'height_cm': [56, 43, 46, 49, 59, 18, 77],
        'weight_kg': [24, 24, 24, 17, 29, 2, 74]}
dogs = pd.DataFrame(data)

# --- Step 2: Define Sort Hierarchy and Sort ---
# The hierarchy is: 1st 'weight_kg', 2nd 'height_cm'
sort_keys = ["weight_kg", "height_cm"]
sorted_dogs = dogs.sort_values(by=sort_keys)

# --- Step 3: Observe the Result ---
# Notice that for the three dogs weighing 24kg, they are now
# ordered by their height_cm (43, 46, 56).
print(sorted_dogs)
```

 [[Code - Sorting by Multiple Columns Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`by` (list of strings)**: The primary parameter, which accepts a list of column names. The order of the names in the list dictates the sorting priority from highest to lowest.
    - Example: `by=['state', 'city', 'last_name']` sorts first by state, then breaks ties by city, then breaks remaining ties by last name.
- **`ascending` (list of booleans)**: This parameter can be a list of booleans corresponding to the columns in the `by` list. This allows for mixed-order sorting.
    - Example: `ascending=[True, False]` would sort the first key ascending and the second key descending. This is a powerful feature covered in [[Python - Controlling Sort Direction|controlling sort direction]].

#### Core Trade-offs

- **Performance Impact**: Sorting is a computationally intensive operation, typically with a complexity of $O(N \log N)$. Each additional sort key adds complexity to the comparison logic for each pair of rows, which can slow down the operation, especially on very large DataFrames.
- **Order is Critical**: The sequence of columns in the list fundamentally changes the output. A common error is to list columns in the wrong order of priority, leading to a logically incorrect result that may not be immediately obvious.
- **Increased Cognitive Load**: While powerful, a long list of sort keys can make the code's intent harder to grasp at a glance. It's important to comment on why a specific sorting hierarchy was chosen if it's not self-evident.

## Connections

```
                  (Parent)
              Sorting DataFrames
                       ▲
                       │
       ┌───────────────┼────────────────────────────┐
       │               │                            │
(Simpler Form)  ┌───────────────────────────┐   (Controls Behavior)
Single Column   │  Sorting by Multiple Cols │   Controlling Direction
                └───────────────────────────┘
```

### Parent Concept

This method is a more advanced application of the general concept of [[Python - Sorting DataFrames|sorting DataFrames]].

### Child Concepts



### Related Concepts 

- This technique builds directly upon the idea of [[Python - Sorting by a Single Column|sorting by a single column]] by extending its functionality to handle ties.
- The direction of each sort level can be individually customized, a concept detailed in [[Python - Controlling Sort Direction|controlling sort direction]].
- Just as you can specify multiple columns for sorting, you can also use multiple criteria for filtering data, as seen in [[Python - Subsetting with Multiple Conditions|subsetting with multiple conditions]].
## Questions

- Imagine you are preparing a sales report for executives. The request is to show top-performing products. How would you decide on the hierarchy of columns to sort by (e.g., total revenue, units sold, profit margin, region), and how would you justify the business impact of your chosen order versus another?
- You need to perform a multi-level sort on a 500GB dataset that cannot fit into your machine's RAM. How would you architect a solution to handle this? Would you rely on a database, a distributed computing framework like Dask or Spark, or another approach?
- What if the `sort_values` method in Pandas was limited to only a single column? How would you replicate the behavior of a multi-level sort using other Pandas methods like `groupby` or `apply`? What would be the performance implications of your custom solution?