---
tags: 
  - core
  - python
  - pandas
  - pivot_table
  - axis
  - aggregation
  - row-wise
  - concept
source: 
  - "[[Data Manipulation with pandas]]"
related: 
  - "[[Python - Pandas DataFrame]]"
  - "[[Python - Working with Pivot Tables]]"
  - "[[Python - Creating Pivot Tables]]"
  - "[[Python - Pivot Tables as DataFrames]]"
  - "[[Python - Pivot Table Calculations Across Rows (axis='index')]]"
  - "[[Python - Subsetting Pivot Tables with .loc]]"
  - "[[Python - NumPy Data Aggregation]]"
  - "[[Python - DataFrame Indexing and Selection]]"
  - "[[Python - Pandas Package]]"
  - "[[Fundamental - Statistics]]"
  - "[[Python - GroupBy Operations]]"
  - "[[Python - Handling Missing Data]]"
  - "[[Python - Vectorized Operations]]"
---
# Core: Pivot Table Calculations Across Columns (axis='columns')

## Summary

>In pandas, when you apply an aggregation function (like `.mean()` or `.sum()`) to a pivot table and set the parameter `axis` to `"columns"` (or its numeric equivalent, `1`), the calculation is performed for each row, moving horizontally across the columns. This collapses the columns to produce a single summary value for each label in the index. For instance, as shown in the context image, it calculates the average height for each dog breed by averaging the values from all the 'color' columns.

**Why This Matters:** This allows for summarizing data horizontally, enabling quick comparisons of an index category's average performance across all column categories.

_Analogy:_ _Imagine a teacher's gradebook where each row is a student and each column is a different assignment or test. To calculate the final average grade for a single student, the teacher must look at that student's row and calculate the average of their scores *across all the columns* (all the assignments). Setting `axis="columns"` is like telling the teacher to perform this exact row-by-row calculation for every student in the class._

*   **Where it breaks down:** The analogy assumes all assignments have equal weight. In a real gradebook, a final exam (one column) might be worth more than a homework assignment (another column). A simple `.mean(axis="columns")` doesn't account for these weights; it treats every column equally. A more complex weighted average would be needed for that scenario.

```
Pivot Table:
          Color A | Color B | Color C
        +---------+---------+---------+      Result:
Breed 1 |  Val1A  |  Val1B  |   NaN   | ---> mean(Val1A, Val1B) = Result 1
        +---------+---------+---------+
Breed 2 |  Val2A  |  Val2B  |  Val2C  | ---> mean(Val2A, Val2B, Val2C) = Result 2
        +---------+---------+---------+
```

## Details

When working with a [[Python - Creating Pivot Tables|pivot table]], you have a multi-dimensional summary of your data, often with one categorical variable on the index and another on the columns. While default aggregations often operate vertically (down the columns), you frequently need to ask questions about each item in the index. By specifying `axis="columns"`, you change the direction of the operation from vertical to horizontal. This allows you to get a single summary statistic for each row, such as the overall average sales for a product across all regions, or as in the example, the average height for a dog breed across all its coat colors. This is the direct counterpart to performing [[Python - Pivot Table Calculations Across Rows (axis='index')|calculations down the columns]].

#### Primary Goal

To compute a summary statistic for each index label in a pivot table by aggregating values horizontally across all columns.

#### Mechanism

- **Step 1: Create the Pivot Table**
    - Begin with a standard pandas DataFrame. Use the `.pivot_table()` method to create a summarized view, placing one feature on the `index`, another on the `columns`, and specifying the `values` to be aggregated.
- **Step 2: Apply an Aggregation Function**
    - Call a standard aggregation method on the resulting pivot table object. Common choices include `.mean()`, `.sum()`, `.max()`, `.min()`, or `.std()`.
- **Step 3: Specify the Axis of Operation**
    - Crucially, pass the argument `axis="columns"` or `axis=1` into the aggregation method. This instructs pandas to perform the calculation horizontally, for each row.
- **Step 4: Interpret the Result**
    - The output will be a pandas Series. The index of this Series will be the same as the index of your original pivot table (e.g., 'breed'). The values of the Series will be the summary statistics calculated for each row (e.g., the mean height for each breed).

##### Code Translation

```python
import pandas as pd
import numpy as np

# --- Step 1: Create the Pivot Table ---
# Sample data mimicking the context
data = {'breed': ['Beagle', 'Beagle', 'Boxer', 'Boxer', 'Poodle', 'Poodle'],
        'color': ['Brown', 'Tricolor', 'Fawn', 'Brindle', 'Black', 'White'],
        'height': [35, 37, 60, 58, 50, 53]}
dogs = pd.DataFrame(data)

# Create a pivot table: average height by breed and color
dogs_pivot = dogs.pivot_table(values='height', index='breed', columns='color')
print("--- Original Pivot Table ---")
print(dogs_pivot)
print("\n")

# --- Step 2 & 3: Apply Aggregation Across Columns ---
# Calculate the mean height for each breed, across all colors
mean_height_by_breed = dogs_pivot.mean(axis="columns")

# --- Step 4: Interpret the Result ---
print("--- Mean Height Across Colors (axis='columns') ---")
print(mean_height_by_breed)

# --- Output of the code ---
# --- Original Pivot Table ---
# color    Black  Brindle  Brown  Fawn  Tricolor  White
# breed                                                
# Beagle     NaN      NaN   35.0   NaN      37.0    NaN
# Boxer      NaN     58.0    NaN  60.0       NaN    NaN
# Poodle    50.0      NaN    NaN   NaN       NaN   53.0

# --- Mean Height Across Colors (axis='columns') ---
# breed
# Beagle    36.0
# Boxer     59.0
# Poodle    51.5
# dtype: float64
```

 [[Code - Pivot Table Calculations Across Columns (axis='columns') Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`axis`**: The key parameter that controls the direction of the operation.
    - `axis='columns'` or `axis=1`: Performs the operation horizontally, across the columns for each row.
    - `axis='index'` or `axis=0`: The default. Performs the operation vertically, down the rows for each column.
- **`skipna`**: A boolean that controls the handling of missing data (`NaN`).
    - `True` (default): Missing values are ignored during the calculation. In the example, the Beagle's average is calculated from its two non-missing color values.
    - `False`: If any `NaN` is present in a row, the result for that row will also be `NaN`.

#### Core Trade-offs

- **Insight Granularity**: Calculating across columns provides a high-level summary for each index item. This is useful for ranking or general comparison but loses the detailed information contained within the individual columns.
    - For example, we know the Boxer's average height is 59, but we lose the fact that Fawn Boxers are taller than Brindle Boxers in our sample.
- **Choice of Axis**: The choice between `axis="columns"` and its counterpart `axis="index"` fundamentally changes the analytical question.
    - `axis="columns"` asks: "What is the typical value for this *breed*?"
    - `axis="index"` asks: "What is the typical value for this *color*?"
- **Impact of Sparsity**: In a sparse pivot table (many `NaN`s), row-wise calculations can be misleading if a row has very few data points. The resulting average might not be representative, as it's based on a small sample of the columns.

## Connections

```
                      (Parent)
             Working with Pivot Tables
                       ▲
                       │
    ┌──────────────────┼──────────────────┐
    │                  │                  │
(Counterpart) ┌───────────────────────────┐ (Foundation)
axis='index'  │  Calc Across Columns      │  Pivot Tables as DataFrames
              │  (axis='columns')         │
              └───────────────────────────┘
                         │
              ┌──────────┴──────────┐
              │                     │
    Subsetting with .loc      Creating Pivot Tables
```

### Parent Concept

This operation is a fundamental technique within the broader topic of [[Python - Working with Pivot Tables|working with pivot tables]] in pandas for data summarization.

### Child Concepts



### Related Concepts 

- This method directly **contrasts with** performing [[Python - Pivot Table Calculations Across Rows (axis='index')|calculations down the columns using `axis='index'`]], which would compute the average height for each color across all breeds.
- The ability to perform these calculations relies on the fact that [[Python - Pivot Tables as DataFrames|pivot tables are fundamentally pandas DataFrames]], inheriting their methods and properties.
- After calculating these row-wise summaries, you might use [[Python - Subsetting Pivot Tables with .loc|`.loc` for subsetting]] to filter for breeds with an average height above a certain threshold.
## Questions

- Imagine you're analyzing sales data pivoted with 'Product' as the index and 'Region' as columns. Calculating the mean sales per product across all regions (`axis='columns'`) might be misleading if one region (e.g., USA) has 100x the sales volume of another (e.g., New Zealand). How would you adjust your analysis to provide a more meaningful 'average performance' metric for each product, and how would you explain the limitation of the simple mean to a sales manager?
- If your pivot table is extremely wide (thousands of columns, e.g., one for every store in a retail chain) and sparse (many `NaN` values), what potential performance bottlenecks could arise when calculating row-wise means for millions of products? How might you optimize this calculation in a production data pipeline, perhaps by avoiding the creation of the dense pivot table altogether?
- What if the `.mean()`, `.sum()`, etc. methods in pandas were deprecated and you could only use the `.apply()` method? How would you replicate the functionality of `pivot_table.mean(axis='columns')` using `.apply()` and a lambda function, and what might be the performance implications?