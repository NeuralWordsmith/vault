---
tags: 
  - comparison
  - python
  - pandas
  - data_selection
  - indexing
  - label_based
  - position_based
  - concept
source: 
  - "[[Intermediate Python]]"
related: 
  - "[[Python - DataFrame Indexing and Selection]]"
  - "[[Python - DataFrame Label-Based Selection with .loc]]"
  - "[[Python - DataFrame Position-Based Selection with .iloc]]"
  - "[[Python - Square Bracket Indexing vs .loc/.iloc]]"
  - "[[Python - DataFrame Column Selection with Square Brackets]]"
  - "[[Python - DataFrame Row Selection with Slicing]]"
  - "[[Python - Pandas Series & DataFrame Relationship]]"
  - "[[Python - Selecting a Series vs. a DataFrame]]"
  - "[[Python - Subsetting NumPy Arrays]]"
  - "[[Python - List Subsetting]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Lists]]"
---
# Comparison: loc vs. iloc

## Why This Comparison Matters

> In Pandas, `.loc` and `.iloc` are the two primary methods for selecting data from a DataFrame. The fundamental difference lies in their selection mechanism: `.loc` selects data based on the *labels* of the index and columns, while `.iloc` selects data based on their integer *position*. This distinction is a cornerstone of explicit and unambiguous [[Python - DataFrame Indexing and Selection|DataFrame indexing]], preventing the common pitfalls associated with basic square bracket notation.

_Analogy:_ _Imagine a large library. Using `.loc` is like finding a book by its title and the name of the shelf it's on (e.g., 'Moby Dick' on the 'American Literature' shelf). You are using explicit labels. Using `.iloc` is like finding a book by its physical position (e.g., the 5th book from the left on the 3rd shelf from the top). You are using its integer coordinates, regardless of what the book or shelf is named._

  * **Library**: The Pandas DataFrame
  * **Shelves & Books**: The rows and columns
  * **Shelf Name & Book Title**: The row and column labels (used by `.loc`)
  * **Shelf Number & Book Position**: The row and column integer positions (used by `.iloc`)

*   **Where it breaks down:** In a library, if you move a book, its title stays the same but its position changes. Similarly, in a DataFrame, sorting or re-indexing changes the integer position of a row but not its label. The analogy is quite robust, but unlike books, DataFrame integer positions are always zero-indexed and contiguous.

## Side-by-Side Comparison

- **`.loc` (Label-Based)**
    - Selects rows and columns based on their labels (index names, column names).
    - Slicing is **inclusive** of both the start and end labels. `df.loc['a':'c']` includes row 'c'.
    - Input must be labels, lists of labels, slices of labels, or a boolean array.
    - Raises a `KeyError` if any of the requested labels are not found in the index.
- **`.iloc` (Position-Based)**
    - Selects rows and columns based on their integer position (from 0 to length-1).
    - Slicing follows standard Python behavior and is **exclusive** of the end position. `df.iloc[0:3]` includes rows at positions 0, 1, and 2, but not 3.
    - Input must be integers, lists of integers, slices of integers, or a boolean array.
    - Raises an `IndexError` if any of the requested integer positions are out of bounds.

### Comparison Table

| Feature            | `.loc`                               | `.iloc`                                |
|--------------------|--------------------------------------|----------------------------------------|
| **Selection By**   | Labels (index/column names)          | Integer Positions (0-indexed)          |
| **Slicing Endpoint** | Inclusive (`start:end` includes `end`) | Exclusive (`start:end` excludes `end`) |
| **Input Types**    | Labels, boolean arrays               | Integers, boolean arrays               |
| **Error on Miss**  | `KeyError`                           | `IndexError`                           |
| **Use Case**       | Semantic, readable, robust selection | Programmatic, order-based selection    |

## Key Similarities

Both `.loc` and `.iloc` are properties of Pandas DataFrames and Series that act as powerful data selection tools. They share a similar syntax, `df.accessor[row_selector, column_selector]`, allowing for the simultaneous selection of rows and columns. Both methods can also accept a boolean array of the correct length to perform conditional filtering.

## Verdict: When to Use Which

Use `.loc` when your selection logic is based on the index or column *names* (labels); this is robust to reordering and makes code more readable. Use `.iloc` when your logic is based on the *order* of rows or columns (integer positions), which is useful for programmatic access by count or for operations that are position-dependent.

## Broader Connections

```
                      (Parent)
            DataFrame Indexing and Selection
                       ▲
                       │
┌──────────────────────┼──────────────────────┐
│                      │                      │
(Specific Method) ┌────┴─────┐      (Specific Method)
.loc              │ loc vs. iloc │      .iloc
                  └──────────┘
                       │
                       ▼
                  (Contrasts With)
        Square Bracket Indexing
```

- This comparison is a core part of understanding [[Python - DataFrame Indexing and Selection|DataFrame Indexing and Selection]].
- It directly contrasts the mechanisms of [[Python - DataFrame Label-Based Selection with .loc|label-based selection with .loc]] and [[Python - DataFrame Position-Based Selection with .iloc|position-based selection with .iloc]].
- Understanding this difference is crucial to see why these methods are often preferred over the more ambiguous [[Python - Square Bracket Indexing vs .loc/.iloc|square bracket indexing]].

## Deeper Questions

- Imagine a financial dataset where the row index is the date. You need to select all data from Q1 2023. Using `.iloc` might work today, but what is the business risk of this choice if the data source adds or removes historical data in the future? How would you justify using `.loc` to a project manager, even if it requires slightly more code to set up the date index correctly?
- In a data pipeline that processes millions of rows, you discover a performance bottleneck in a step that uses `.loc` with a non-unique, non-sorted index. How would you diagnose the root cause of the slowdown, and what architectural changes (e.g., index restructuring, switching to `.iloc` after a `reset_index`) would you propose to make the selection O(1) and ensure the pipeline scales?
- What if Pandas was redesigned so that the `[]` square bracket operator was strictly position-based (like `.iloc`) and a new `.label[]` operator was introduced for labels (like `.loc`). What are the biggest advantages and disadvantages of this explicit design compared to the current, more ambiguous `[]` operator?