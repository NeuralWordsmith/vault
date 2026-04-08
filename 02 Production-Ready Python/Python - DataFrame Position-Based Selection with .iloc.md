---
tags: 
  - core
  - python
  - integer-location
  - positional-indexing
  - pandas-subsetting
  - iloc
  - concept
source: 
  - "[[Intermediate Python]]"
related: 
  - "[[Python - DataFrame Indexing and Selection]]"
  - "[[Python - DataFrame Label-Based Selection with .loc]]"
  - "[[Python - .loc vs .iloc]]"
  - "[[Python - Square Bracket Indexing vs .loc/.iloc]]"
  - "[[Python - DataFrame Row Selection with Slicing]]"
  - "[[Python - DataFrame Column Selection with Square Brackets]]"
  - "[[Python - Selecting a Series vs. a DataFrame]]"
  - "[[Python - Pandas Series & DataFrame Relationship]]"
  - "[[Python - Subsetting NumPy Arrays]]"
  - "[[Python - List Subsetting]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - Data Types]]"
  - "[[Python - Lists]]"
---
# Core: DataFrame Position-Based Selection with .iloc

## Summary

>`.iloc` is a Pandas DataFrame accessor used for integer-location based indexing, allowing you to select rows and columns by their numerical position (e.g., the 0th row, the 1st column) rather than their labels. This method is essential when you need to retrieve data based on its order, similar to how you would subset a standard Python list or a NumPy array. It stands in direct contrast to [[Python - DataFrame Label-Based Selection with .loc|.loc]], which uses explicit labels for selection.

**Why This Matters:** Using `.iloc` allows for robust, scriptable data selection based on integer positions, making your code independent of potentially changing row or column labels.

_Analogy:_ _Think of a DataFrame as a large library bookshelf, and `.iloc` is like the librarian's catalog that tells you a book is on the 3rd shelf from the top, 5th book from the left. You don't need to know the book's title (the label); you just need its exact coordinates. If you ask for `[2, 4]`, the librarian goes to the 3rd shelf (index 2) and picks up the 5th book (index 4)._

The bookshelf is the DataFrame. The shelf number is the row index. The book's position on the shelf is the column index. The librarian's catalog is the `.iloc` accessor. **Where it breaks down:** Unlike a physical bookshelf, if you remove a book (a row), the positions of all subsequent books (rows) immediately shift up. The catalog is always up-to-date with the current integer positions, which can change if the DataFrame is modified.

```
DataFrame `brics`:
     0         1          2           3
  (country) (capital)   (area)   (population)
0  Brazil    Brasilia   8.516      209.3
1  Russia    Moscow     17.10      144.5   <-- brics.iloc[1]
2  India     New Delhi  3.286      1353
3  China     Beijing    9.597      1386
4  S. Africa Pretoria   1.221      57.75

Selection: brics.iloc[1:4, [0, 1]]

Result:
     0         1
  (country) (capital)
1  Russia    Moscow
2  India     New Delhi
3  China     Beijing
```

## Details

When working with Pandas DataFrames, you often need to select data not by its name or label (like 'RU' for Russia), but by its numerical position in the table. This is where the `.iloc` indexer becomes indispensable. It allows you to treat the DataFrame like a grid or a matrix, using integer indices to pinpoint the exact data you need. For instance, to get the second row (which might be Russia), you'd use index `1`. You can also select multiple rows and columns by providing lists of their integer positions, making it a powerful tool for programmatic subsetting.

#### Primary Goal

To provide a strict, integer-position-only method for selecting data from a DataFrame, ensuring selections are based on order rather than labels.

#### Mechanism

- **Step 1: Select a Single Row**
    - To select a single row, you provide its integer index. For example, `brics.iloc[1]` selects the second row (Russia), as indexing starts at 0.
- **Step 2: Select Multiple Rows**
    - To select a sequence of rows, you can use a slice, like `brics.iloc[1:4]`. This selects rows starting from index 1 up to, but not including, index 4 (i.e., rows at index 1, 2, and 3).
- **Step 3: Select Rows and Columns Simultaneously**
    - To select a specific block of data, you provide row and column selectors separated by a comma. For example, `brics.iloc[1:4, [0, 1]]` selects the same rows from Step 2 but only keeps the first two columns (country and capital) at index 0 and 1.

##### Code Translation

```python
import pandas as pd

# Create a sample DataFrame
data = {'country': ['Brazil', 'Russia', 'India', 'China', 'South Africa'],
        'capital': ['Brasilia', 'Moscow', 'New Delhi', 'Beijing', 'Pretoria'],
        'area': [8.516, 17.10, 3.286, 9.597, 1.221],
        'population': [209.3, 144.5, 1353, 1386, 57.75]}
brics = pd.DataFrame(data)
brics.index = ['BR', 'RU', 'IN', 'CH', 'SA']
print("Original DataFrame:")
print(brics)
print("\n" + "="*30 + "\n")

# --- Step 1: Select a single row by its integer position ---
# Get the second row (Russia), which is at index 1
russia_row = brics.iloc[1]
print("Step 1: Select row at index 1 (Russia):")
print(russia_row)
print("\n" + "="*30 + "\n")

# --- Step 2: Select multiple rows using a slice ---
# Get rows from index 1 up to (but not including) index 4
subset_rows = brics.iloc[1:4]
print("Step 2: Select rows from index 1 to 3:")
print(subset_rows)
print("\n" + "="*30 + "\n")

# --- Step 3: Select specific rows and columns by position ---
# Get the same rows (1 to 3) but only the first two columns (0 and 1)
subset_rows_cols = brics.iloc[1:4, [0, 1]]
print("Step 3: Select rows 1-3 and columns 0-1:")
print(subset_rows_cols)
```

 [[Code - DataFrame Position-Based Selection with .iloc Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Row Selector**: The first argument inside the square brackets. It can be:
    - An integer (e.g., `5`) to select a single row.
    - A list of integers (e.g., `[0, 2, 4]`) to select specific rows.
    - A slice object (e.g., `1:5`) to select a range of rows.
- **Column Selector**: The optional second argument, following a comma. It accepts the same input types as the row selector but applies them to columns.

#### Core Trade-offs

- **Pro: Robust to Label Changes**
    - Your code won't break if row or column names are changed, as `.iloc` only cares about the integer position. This is useful for stable, programmatic access.
- **Con: Brittle to Order Changes**
    - The biggest drawback. If the DataFrame is sorted or a row is deleted, `df.iloc[1]` will now point to a completely different piece of data, which can lead to silent errors.
- **Con: Less Readable**
    - Code using `.iloc` can be harder to understand than code using `.loc`. `df.loc['Russia']` is self-documenting, whereas `df.iloc[1]` requires you to know the current structure of the DataFrame.

## Connections

```
                  (Parent)
    DataFrame Indexing and Selection
                   ▲
                   │
┌──────────────────┼──────────────────┐
│                  │                  │
(Contrasts With) ┌───────────┐ (Builds On)
.loc             │   .iloc   │ Slicing
                 └───────────┘
```

### Parent Concept

This concept is a specific method within the broader topic of [[Python - DataFrame Indexing and Selection|how to access and subset data in Pandas DataFrames]].

### Related Concepts 

- It directly **contrasts with** [[Python - DataFrame Label-Based Selection with .loc|.loc]], which selects data by explicit labels instead of integer positions.
- The behavior of `.iloc` **is a direct comparison to** [[Python - Square Bracket Indexing vs .loc/.iloc|the ambiguity of basic square bracket indexing]], offering a clear, position-only approach.
- Understanding the difference between selecting a single row, which returns a Series, and multiple rows, which returns a DataFrame, is explained in [[Python - Selecting a Series vs. a DataFrame|Series vs. DataFrame selection]].
- The fundamental difference between `.iloc` and its counterpart is detailed in [[Python - .loc vs .iloc|.loc vs .iloc]].
## Questions

- You're building a data pipeline that processes daily sales reports. The column order sometimes changes unexpectedly, but the column names ('Date', 'Sales', 'Region') remain the same. Would you use `.iloc` or `.loc` to extract the 'Sales' data? Justify your choice in terms of pipeline robustness and potential business impact if the wrong data is processed.
- Imagine a system where a DataFrame with millions of rows is updated in real-time, with rows being added and deleted frequently. How would using `.iloc` to access 'the 100th most recent entry' be problematic, and what alternative indexing strategy would you design to make this operation reliable and efficient?
- What if Pandas removed the `.iloc` accessor entirely? How would you replicate its core functionality—selecting the Nth row and Mth column of a DataFrame—using only other Pandas or NumPy methods, and what would be the performance implications?