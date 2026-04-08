---
tags: 
  - core
  - python
  - nested_lists
  - 2d_data
  - data_structures
  - python_list
  - matrix
  - concept
source: 
  - "[[Introduction to Python]]"
related: 
  - "[[Python - Lists]]"
  - "[[Python - List Creation]]"
  - "[[Python - Lists with Mixed Data Types]]"
  - "[[Python - List as a Data Type]]"
  - "[[Python - Basic Data Types Cheatsheet]]"
  - "[[Fundamental - Programming]]"
  - "[[NumPy - Arrays]]"
  - "[[Pandas - DataFrame]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Tuples]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[Data Structures - Arrays]]"
  - "[[Data Structures - Matrices]]"
---
# Core: Lists of Lists

## Summary

>A list of lists, also known as a nested list, is a Python data structure where the elements of an outer list are themselves lists. This allows for the creation of 2D, table-like structures to group related pieces of information together in an organized way.

**Why This Matters:** Using lists of lists is the fundamental, built-in Python method for representing two-dimensional data like tables, grids, or matrices, which is essential for tasks ranging from game development to data analysis.

_Analogy:_ _Think of a list of lists as a spreadsheet or a muffin tin. The entire spreadsheet is the main, outer list. Each row in that spreadsheet is a smaller, inner list (a sublist). So, the first row might contain `['Name', 'Height', 'Age']`, the second row `['Liz', 1.73, 30]`, and so on. The entire spreadsheet is simply a collection (a list) of these individual rows (lists)._

**Where it breaks down:** Unlike a spreadsheet which has a rigid grid structure where every row must have the same number of columns, a Python list of lists is more flexible. Each inner list can have a different number of elements, which can be powerful but also requires careful handling to avoid errors.

```
A list of lists, `fam2`, can be visualized as a container holding other containers:

 fam2 (Outer List)
 ┌───────────────────────────────────────────────────┐
 │                                                   │
 │   Element 0        Element 1        Element 2     │
 │  ┌──────────┐     ┌──────────┐     ┌──────────┐    │
 │  │ ["liz",   │ ,   │ ["emma",  │ ,   │ ["mom",   │ ...│
 │  │  1.73]   │     │  1.68]   │     │  1.71]   │    │
 │  └──────────┘     └──────────┘     └──────────┘    │
 │   (Sublist)        (Sublist)        (Sublist)     │
 │                                                   │
 └───────────────────────────────────────────────────┘
```

## Details

Building on the idea that a [[Python - Lists|Python list]] can hold various data types, we can take this a step further by having lists contain other lists. Instead of creating a flat [[Python - Lists with Mixed Data Types|list with mixed data types]] like `['liz', 1.73, 'emma', 1.68]`, we can group related items into their own sublists. For example, `['liz', 1.73]` becomes one unit, and `['emma', 1.68]` becomes another. These sublists then become the elements of a larger, outer list. This technique provides a simple yet powerful way to represent 2D data structures, such as tables or matrices, directly in Python without needing external libraries.

#### Primary Goal

To organize and store data in a two-dimensional, grid-like format where elements are grouped into sub-collections.

#### Mechanism

- **Step 1: Create the Sublists**
    - First, define the individual lists that will become the elements of the main list. Each sublist contains a set of related data.
- **Step 2: Create the Main List**
    - Next, use the standard [[Python - List Creation|list creation]] syntax (square brackets `[]`) to enclose the sublists you created. Separate each sublist with a comma.
- **Step 3: Print and Inspect**
    - When you print the main list, you'll see a structure with nested square brackets, confirming you have successfully created a list of lists.

##### Code Translation

```python
# --- Step 1: Create the Sublists ---
# Each sublist groups related information for one family member
liz = ["liz", 1.73]
emma = ["emma", 1.68]
mom = ["mom", 1.71]
dad = ["dad", 1.89]

# --- Step 2: Create the Main List ---
# The sublists are now the elements of the 'fam2' list
fam2 = [liz, emma, mom, dad]

# --- Step 3: Print and Inspect ---
# The output shows a list containing other lists
print(fam2)
# Expected Output: [['liz', 1.73], ['emma', 1.68], ['mom', 1.71], ['dad', 1.89]]

# You can also check its type to confirm it's still a list
print(type(fam2))
# Expected Output: <class 'list'>
```

#### Key Parameters

- **Structure:** The primary 'parameter' is the structure itself.
    - **Outer List Length:** The number of sublists it contains (e.g., the number of rows in a table).
    - **Inner List Length:** The number of elements within each sublist (e.g., the number of columns). This can be uniform (like a matrix) or jagged (each sublist has a different length).

#### Core Trade-offs

- **Advantage: Simplicity and Flexibility**
    - Lists of lists are a built-in, intuitive way to represent 2D data without requiring any special libraries. The ability to have jagged lists (uneven inner list lengths) offers high flexibility.
- **Disadvantage: Performance and Type Safety**
    - For large-scale numerical computations (e.g., matrix multiplication), Python lists are much slower than specialized arrays from libraries like NumPy. There is also no enforcement of data types or sublist lengths, which can lead to runtime errors if the structure is not handled carefully.

## Connections

```
                    (Parent)
                 Python - Lists
                        ▲
                        │
┌───────────────────────┼───────────────────────────┐
│                       │                           │
(Related)      ┌──────────────────┐               (Related)
Lists with     │ Lists of Lists   │               List Creation
Mixed Types    └──────────────────┘
```

### Parent Concept

This concept is a specific application of [[Python - Lists|Python - Lists]], demonstrating their ability to hold complex data structures.

### Related Concepts 

- The structure of a list of lists confirms that a [[Python - List as a Data Type|list is a distinct data type]] capable of containing elements of any other type, including itself.
- This is a more structured approach compared to simply creating [[Python - Lists with Mixed Data Types|lists with mixed data types]] in a flat structure.
- The process of creating a nested list follows the same fundamental rules as [[Python - List Creation|list creation]].
- For more efficient and powerful 2D data manipulation, especially in scientific computing, this structure is often replaced by [[NumPy - Arrays|NumPy arrays]].
## Questions

- You're storing customer transaction data. When would you choose a simple list of lists over a Pandas DataFrame? Justify your decision based on the trade-offs between memory usage, performance of analytical queries, and initial development speed.
- Imagine you are designing an API that returns a potentially massive 2D dataset (e.g., a user's activity log). Why might serializing a large Python list of lists directly to JSON become a performance bottleneck, and what alternative data structure or serialization format would you propose to ensure scalability?
- What if Python's lists were restricted from nesting (i.e., a list could not contain another list)? How would you represent a 2D grid like a chessboard using only a single, flat list, and what would be the mathematical formula to access an element at a specific `(row, column)` coordinate?