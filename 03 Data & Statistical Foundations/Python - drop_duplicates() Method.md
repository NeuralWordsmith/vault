---
tags: 
  - core
  - python
  - data_cleaning
  - deduplication
  - pandas
  - dataframe
  - subset
  - concept
source: 
  - "[[Data Manipulation with pandas]]"
related: 
  - "[[Python - Pandas DataFrame]]"
  - "[[Python - Pandas Package]]"
  - "[[Python - value_counts() Method]]"
  - "[[Python - Counting Categorical Data]]"
  - "[[Python - DataFrame Indexing and Selection]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[Fundamental - Feature Engineering]]"
  - "[[Python - GroupBy Operations]]"
  - "[[Python - NumPy Data Aggregation]]"
  - "[[Python - Boolean Operators on NumPy Arrays]]"
  - "[[Python - Sorting DataFrames]]"
  - "[[Python - Data Cleaning]]"
---
# Core: Handling Duplicates in pandas

## Summary

>In pandas, handling duplicates involves using the `.drop_duplicates()` method to remove redundant rows from a DataFrame. The definition of what constitutes a 'duplicate' can be customized by specifying a single column or a combination of multiple columns, ensuring that only truly identical records are removed.

**Why This Matters:** Removing duplicate records is a fundamental data cleaning step to ensure the integrity and accuracy of any subsequent analysis, preventing skewed results from over-counting.

_Analogy:_ _Imagine a bouncer at an exclusive event checking the guest list. At first, they only check by first name. When 'Max' arrives, they let him in. When a second 'Max' arrives, the bouncer turns him away, assuming he's the same person. This is like `drop_duplicates(subset='name')`. The event organizer points out there are two guests named Max: 'Max Smith' and 'Max Jones'. The bouncer now updates their process to check both first and last names. Now, when 'Max Jones' arrives after 'Max Smith', he is correctly identified as a unique guest and allowed in. This is like `drop_duplicates(subset=['name', 'last_name'])`._

**Where it breaks down:** The analogy is limited because the `.drop_duplicates()` method has a `keep` parameter that can be set to `'first'`, `'last'`, or `False` (to drop all duplicates). A bouncer typically only implements the `'first'` logic, letting the first person in and denying all others with the same name.

```
Before drop_duplicates(subset=['name', 'breed']):
+---+------+----------+-----------+
| # | name | breed    | weight_kg |
+---+------+----------+-----------+
| 1 | Max  | Labrador | 28.35     |  <- Keep (first instance of this pair)
| 3 | Max  | Chow Chow| 24.01     |  <- Keep (first instance of a new pair)
| 4 | Max  | Labrador | 28.54     |  <- Drop (duplicate name/breed pair)
+---+------+----------+-----------+

After:
+---+------+----------+-----------+
| # | name | breed    | weight_kg |
+---+------+----------+-----------+
| 1 | Max  | Labrador | 28.35     |
| 3 | Max  | Chow Chow| 24.01     |
+---+------+----------+-----------+
```

## Details

When working with real-world data, like a log of vet visits, it's common to find duplicate entries. A simple approach is to remove rows where a dog's name has already appeared. However, this can be too aggressive, as different dogs might share the same name. The core idea of effective duplicate handling is to define uniqueness more precisely. Instead of just using the `name`, we can use a combination of columns, such as `name` and `breed`, to create a composite key that uniquely identifies each individual dog, thus preserving valid data while removing truly redundant records. This is a critical and common task in data cleaning within the pandas library.

#### Primary Goal

To create a clean dataset by programmatically removing rows that are considered redundant based on the values in one or more specified columns.

#### Mechanism

- **Step 1: Identify Initial Duplication Criteria**
    - Examine the DataFrame and decide which column(s) might define a duplicate. A common starting point is a single identifier column, like `name`.
- **Step 2: Apply `drop_duplicates()` with a Single Column**
    - Use the `.drop_duplicates()` method, passing the chosen column name to the `subset` argument. Evaluate the output to see if it has unintentionally removed valid data (e.g., two different dogs with the same name).
- **Step 3: Refine Criteria with Multiple Columns**
    - If the single-column approach was too broad, provide a list of column names to the `subset` argument. This tells pandas to only remove a row if the combination of values in all specified columns has appeared before.

##### Code Translation

```python
import pandas as pd

# --- Step 1: Prepare the Data (and identify criteria) ---
# We'll first try to deduplicate by 'name', then by ['name', 'breed'].
data = {
    'date': ['2018-09-02', '2019-06-07', '2018-01-17', '2019-06-07', '2019-04-22'],
    'name': ['Bella', 'Max', 'Stella', 'Max', 'Max'],
    'breed': ['Labrador', 'Labrador', 'Chihuahua', 'Chow Chow', 'Labrador'],
    'weight_kg': [24.87, 28.35, 1.51, 24.01, 28.54]
}
vet_visits = pd.DataFrame(data)
print("Original DataFrame:")
print(vet_visits)

# --- Step 2: Apply drop_duplicates() with a Single Column ---
# This is too aggressive, as it removes the 'Max' who is a Chow Chow.
unique_names = vet_visits.drop_duplicates(subset="name")
print("\nDuplicates dropped based on 'name' only:")
print(unique_names)

# --- Step 3: Refine the Criteria with Multiple Columns ---
# This correctly identifies unique dogs by their name AND breed.
unique_dogs = vet_visits.drop_duplicates(subset=["name", "breed"])
print("\nDuplicates dropped based on 'name' and 'breed':")
print(unique_dogs)
```

 [[Code - Handling Duplicates in pandas Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`subset`**: The most important parameter. It takes a column name (string) or a list of column names to use for identifying duplicates. If `None` (the default), all columns are used to identify duplicate rows.
- **`keep`**: Controls which duplicate record to preserve.
    - `'first'` (default): Keeps the first occurrence and drops subsequent ones.
    - `'last'`: Keeps the last occurrence and drops preceding ones.
    - `False`: Drops all rows that are part of any duplicate set.
- **`inplace`**: A boolean that determines whether to modify the original DataFrame.
    - `False` (default): Returns a new DataFrame with duplicates removed.
    - `True`: Modifies the existing DataFrame directly and returns `None`.

#### Core Trade-offs

- **Clarity and Simplicity**: The method provides a highly readable and straightforward way to perform a common and essential data cleaning task.
- **Risk of Data Loss**: If the `subset` argument is not chosen carefully, you can unintentionally remove valid data. As the context shows, using just `name` deleted a distinct dog that happened to share a name with another.
- **Limited Logic for Preservation**: The `keep` parameter is useful but limited. If you need to keep a duplicate based on a more complex rule (e.g., 'keep the row with the highest weight'), you must perform additional steps like sorting the data before dropping duplicates.

## Connections

```
                      (Parent)
                 Pandas DataFrame
                         ▲
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                    │
(Used Before)   ┌───────────────────────────┐   (Alternative)
value_counts()  │ Handling Duplicates       │   Grouping & Aggregating
                └───────────────────────────┘
                         │
                         │
               (Resulting In)
               Clean, Unique Data
```

### Parent Concept

This concept is a fundamental data manipulation method available on the [[Python - Pandas DataFrame|pandas DataFrame]] object, which is the primary data structure in the [[Python - Pandas Package|pandas library]].

### Child Concepts



### Related Concepts 

- Before removing duplicates, it is common practice to first explore the data by [[Python - Counting Categorical Data|counting categorical data]] using the [[Python - value_counts() Method|value_counts() method]] to understand the frequency of occurrences.
- This process is a key step in data cleaning, which is a prerequisite for almost all data analysis and feature engineering tasks.
- An alternative to dropping duplicates is to group by the identifying columns and then aggregate the other fields, which offers more control over which information is preserved from the duplicate records.
## Questions

- Imagine you have a customer transaction dataset where duplicate rows could represent either a true data entry error or a legitimate repeat purchase made moments later. How would you decide on a `subset` for `drop_duplicates()`, and what is the business risk of being too aggressive versus too lenient in your duplicate removal strategy?
- You're building a data pipeline that ingests millions of records daily. Calling `drop_duplicates()` on the entire historical dataset each day is too slow. How would you design a more efficient, incremental system to identify and remove duplicates only from the newly arrived data against the existing unique records?
- What if the `.drop_duplicates()` method didn't exist? How would you replicate its functionality for finding unique records based on a combination of columns using only other pandas methods like `groupby()`, `sort_values()`, and boolean indexing?