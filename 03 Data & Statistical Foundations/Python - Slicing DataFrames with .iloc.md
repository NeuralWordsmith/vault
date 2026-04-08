---
tags: 
  - core
  - python
  - integer-location
  - positional-indexing
  - dataframe-slicing
  - pandas
  - subsetting
  - concept
source: 
  - "[[Data Manipulation with pandas]]"
related: 
  - "[[Python - Pandas DataFrame]]"
  - "[[Python - DataFrame Indexing and Selection]]"
  - "[[Python - Slicing Columns with .loc]]"
  - "[[Python - .loc vs .iloc Slicing Behavior]]"
  - "[[Python - Slicing Lists]]"
  - "[[Python - Subsetting NumPy Arrays]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - Pandas Package]]"
  - "[[Python - Slicing and Subsetting in Pandas]]"
  - "[[Python - Slicing Rows and Columns Simultaneously with .loc]]"
  - "[[Python - Indexing NumPy Arrays]]"
  - "[[Python - 2D NumPy Arrays]]"
  - "[[Python - Slicing Outer Index Level with .loc]]"
  - "[[Python - Slicing Inner Index Level with .loc]]"
---
# Core: Slicing with .iloc

## Summary

>The `.iloc` method in Pandas is used for selecting data from a DataFrame by its integer position. It stands for 'integer-location' and uses a syntax similar to `[[Python - Slicing Lists|slicing Python lists]]`, but extended to two dimensions: one for rows and one for columns. A key characteristic is that, like list slicing, the final value in a slice is not included. This method strictly uses integers, ignoring the DataFrame's labels, which is the primary difference from its label-based counterpart, `.loc`.

**Why This Matters:** This method provides a fast, unambiguous way to select data based on its absolute position, which is crucial for programmatic data manipulation where labels might change or be irrelevant.

_Analogy:_ _Think of a DataFrame as a large library bookshelf. Using `.iloc` is like telling a librarian, 'Please get me the books from the 3rd through the 5th shelf, and from each of those shelves, grab the 2nd through the 4th book from the left.' You are giving exact numerical coordinates and don't care about the titles of the books (column labels) or the categories of the shelves (row labels)._

**Where it breaks down:** In a real library, you almost always want a book based on its title, not its position. Similarly, in data analysis, using column names (`.loc`) is often more readable and less error-prone than using column numbers (`.iloc`), especially if the order of columns might change.

```
DataFrame: `dogs` (Positions)

      0        1         2          3           4
    +--------+---------+---------+-----------+-----------+
0   | Bella  | Labrador| Brown   | 56        | 25        |
1   | Charlie| Poodle  | Black   | 43        | 23        |
    +--------+---------+---------+-----------+-----------+
2   | Lucy   | ChowChow| Brown   | 46        | 22        | <--- Start Row (2)
3   | Cooper |Schnauzer| Grey    | 49        | 17        |
4   | Max    | Labrador| Black   | 59        | 29        | <--- End Row (4)
    +--------+---------+---------+-----------+-----------+
5   | Stella |Chihuahua| Tan     | 18        | 2         |
6   | Bernie |StBernard| White   | 77        | 74        |
    +--------+---------+---------+-----------+-----------+
               ^
               | Start Col (1)   End Col (3) --> |
```

## Details

In the `[[Python - Pandas Package|Pandas]]` library, `.iloc` is the primary accessor for purely integer-location based indexing. It allows you to select rows and columns at specific positions, as if the DataFrame were a simple matrix or a 2D array. This method operates on the principle of zero-based indexing, familiar from Python lists and NumPy arrays. The core idea is to provide a selection mechanism that is completely independent of the DataFrame's index and column labels, which is a critical distinction explored in `[[Python - .loc vs .iloc Slicing Behavior|.loc vs .iloc slicing behavior]]`.

#### Primary Goal

To provide a performant and explicit method for selecting subsets of a DataFrame based on their numerical row and column positions, independent of their labels.

#### Mechanism

- **Step 1: Identify Target Positions**
    - Determine the zero-based integer ranges for the rows and columns you wish to select. For the example `dogs.iloc[2:5, 1:4]`, we want rows at positions 2, 3, and 4, and columns at positions 1, 2, and 3.
- **Step 2: Access with .iloc**
    - Use the `.iloc[]` accessor on your DataFrame object. This signals to Pandas that you are performing an integer-based selection.
- **Step 3: Provide Row and Column Slicers**
    - Inside the square brackets, provide the row slicer and column slicer, separated by a comma. The format is `DataFrame.iloc[row_slicer, column_slicer]`. The slicers use standard Python slice notation (`start:stop`).

##### Code Translation

```python
import pandas as pd

# --- Step 1: Prepare the Data (recreating the example) ---
data = {
    'name': ['Bella', 'Charlie', 'Lucy', 'Cooper', 'Max', 'Stella', 'Bernie'],
    'breed': ['Labrador', 'Poodle', 'Chow Chow', 'Schnauzer', 'Labrador', 'Chihuahua', 'St. Bernard'],
    'color': ['Brown', 'Black', 'Brown', 'Grey', 'Black', 'Tan', 'White'],
    'height_cm': [56, 43, 46, 49, 59, 18, 77],
    'weight_kg': [25, 23, 22, 17, 29, 2, 74]
}
dogs = pd.DataFrame(data)

print("--- Full DataFrame ---")
print(dogs)

# --- Step 2 & 3: Access with .iloc and provide slicers ---
# Select rows at index 2, 3, 4 (up to, but not including, 5)
# Select columns at index 1, 2, 3 (up to, but not including, 4)
subset = dogs.iloc[2:5, 1:4]

print("\n--- Sliced DataFrame using .iloc[2:5, 1:4] ---")
print(subset)

# Expected Output:
# --- Sliced DataFrame using .iloc[2:5, 1:4] ---
#        breed  color  height_cm
# 2   Chow Chow  Brown         46
# 3   Schnauzer   Grey         49
# 4    Labrador  Black         59
```

 [[Code - Slicing with .iloc Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Row Selector (First Argument)**
    - Specifies the rows to be selected. It can be a single integer (`dogs.iloc[0]`), a list of integers (`dogs.iloc[[0, 2, 4]]`), or a slice object (`dogs.iloc[2:5]`).
- **Column Selector (Second Argument)**
    - Specifies the columns to be selected. It follows the same rules as the row selector. It is optional; if omitted (`dogs.iloc[2:5]`), all columns for the specified rows are returned.

#### Core Trade-offs

- **Pro: Performance and Unambiguity**
    - `.iloc` is generally faster than `.loc` because it doesn't need to handle label lookups. It is also unambiguous, as integer positions are unique, whereas index or column labels can be duplicated.
- **Con: Poor Readability**
    - Code using `.iloc` can be hard to read and understand. `dogs.loc[:, 'breed']` is much clearer than `dogs.iloc[:, 1]`.
- **Con: Brittle Code**
    - Selections are dependent on the order of rows and columns. If a new column is added at the beginning of the DataFrame, `dogs.iloc[:, 1]` will now refer to a different column, potentially causing silent errors in your code. This makes it less robust for production pipelines.

## Connections

```
                  (Parent)
    [[Python - DataFrame Indexing and Selection|DataFrame Indexing and Selection]]
                   ▲
                   │
┌──────────────────┼──────────────────┐
│                  │                  │
(Related) ┌──────────────────┐      (Contrasts With)
[[Python - Slicing Lists|List Slicing]]  │ Slicing with .iloc │      [[Python - Slicing Columns with .loc|Slicing with .loc]]
          └──────────────────┘
```

### Parent Concept

This method is a core part of `[[Python - DataFrame Indexing and Selection|DataFrame indexing and selection]]`, providing one of the two main paradigms for accessing data.

### Child Concepts



### Related Concepts 

- It directly contrasts with label-based selection, which is performed using methods like `[[Python - Slicing Columns with .loc|slicing columns with .loc]]`.
- The syntax is intentionally similar to `[[Python - Slicing Lists|slicing standard Python lists]]`, making it intuitive for those familiar with basic Python.
- Understanding the differences between the two main accessors is crucial, as detailed in `[[Python - .loc vs .iloc Slicing Behavior|.loc vs .iloc slicing behavior]]`.
## Questions

- You're building a data processing pipeline where the input CSV's column order might change unexpectedly. Would you use `.iloc` or `.loc` to select the 'user_id' and 'transaction_amount' columns? Justify your choice in terms of pipeline robustness and potential maintenance costs.
- Imagine a real-time analytics dashboard that queries a massive, constantly updating DataFrame. If performance is the absolute priority for slicing a specific positional block of recent data, how would you ensure your `.iloc` calls remain valid even if the DataFrame's schema is altered by an upstream process without breaking the dashboard?
- What if Pandas removed the `.iloc` accessor entirely? How would you replicate the functionality of selecting the 100th to 200th rows and the 5th to 10th columns of a DataFrame using only `.loc` and the DataFrame's index/column attributes, and what would be the performance implications?