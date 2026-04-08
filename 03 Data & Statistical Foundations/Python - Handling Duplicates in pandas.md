---
tags: 
  - core
  - python
  - data_cleaning
  - deduplication
  - pandas
  - unique_rows
  - data_preprocessing
  - concept
source: 
  - "[[Data Manipulation with pandas]]"
related: 
  - "[[Python - Pandas DataFrame]]"
  - "[[Python - Counting Categorical Data]]"
  - "[[Python - value_counts() Method]]"
  - "[[Fundamental - Feature Engineering]]"
  - "[[Python - DataFrame Indexing and Selection]]"
  - "[[Python - Pandas Package]]"
  - "[[Python - Data Types]]"
  - "[[Python - NumPy Data Aggregation]]"
  - "[[Python - GroupBy Operations]]"
  - "[[Python - Data Wrangling]]"
  - "[[Python - Missing Data Handling]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Lists]]"
---
# Core: drop_duplicates() Method

## Summary

>In data analysis, we often encounter datasets with repeated entries, like a dog visiting a vet multiple times. The `drop_duplicates()` method in the pandas library is a fundamental tool for removing these repeated rows from a DataFrame. It allows us to isolate unique entities based on the values in one or more columns, which is an essential prerequisite for accurately performing tasks like [[Python - Counting Categorical Data|counting unique items]]. For instance, after using `drop_duplicates()` to get a list of unique dogs, we could then use the `[[Python - value_counts() Method|value_counts()]]` method on the 'breed' column to get the correct count of dogs per breed.

**Why This Matters:** Dropping duplicates is a critical data cleaning step that ensures each entity is counted only once, preventing skewed analyses and inaccurate results.

_Analogy:_ _Imagine you're a teacher taking attendance in a chaotic classroom where some eager students raise their hands multiple times to be counted. Your goal is to get an accurate headcount, counting each student exactly once. Using `drop_duplicates()` is like the teacher making a list of student names. When a student raises their hand, the teacher checks the list. If their name is already on it, they are ignored. If not, their name is added. This process ensures that even the most enthusiastic student is only counted a single time._

In this analogy, the full list of hand-raises is the original DataFrame. The student's name is the column used in the `subset` parameter. The final, clean list of names is the de-duplicated DataFrame. 

**Where it breaks down:** The analogy simplifies the process. In pandas, `drop_duplicates()` removes the entire *row* of data associated with a duplicate. Furthermore, the `keep` parameter adds a layer of complexity not present in the analogy—you can choose to keep the *first* time the student raised their hand, the *last* time, or neither, which can be important if other data in the row (like the time of day) is relevant.

```
Before: vet_visits
+------+-----------+------------+
| name | breed     | date       |
+------+-----------+------------+
| Bella| Labrador  | 2018-09-02 |
| Max  | Labrador  | 2019-06-07 |  <-- First 'Max'
| Stella| Chihuahua | 2018-01-17 |  <-- First 'Stella'
| Max  | Chow Chow | 2019-06-07 |  <-- Duplicate 'Max'
| Stella| Chihuahua | 2018-01-20 |  <-- Duplicate 'Stella'
+------+-----------+------------+
             │
             ▼ .drop_duplicates(subset='name', keep='first')
             │
After: unique_dogs
+------+-----------+------------+
| name | breed     | date       |
+------+-----------+------------+
| Bella| Labrador  | 2018-09-02 |
| Max  | Labrador  | 2019-06-07 |  <-- Kept
| Stella| Chihuahua | 2018-01-17 |  <-- Kept
+------+-----------+------------+
```

## Details

The provided context highlights a common data analysis problem: raw data often contains duplicate records that can inflate counts and lead to incorrect conclusions. The `drop_duplicates()` method is a pandas function designed to solve this by filtering a DataFrame to keep only unique rows. Uniqueness can be defined based on all columns together or, more commonly, a specific subset of columns that identify a unique entity, such as a dog's 'name'. This is a foundational operation in data cleaning and preparation, ensuring that subsequent statistical summaries are accurate.

#### Primary Goal

To create a new DataFrame containing only the unique rows from an original DataFrame, based on specified column criteria.

#### Mechanism

- **Step 1: Identify the Uniqueness Criteria**
    - Determine which column or combination of columns uniquely identifies an entity. In the vet example, the 'name' column is used to identify each unique dog.
- **Step 2: Apply the `drop_duplicates()` Method**
    - Call the method on the target DataFrame. Pass the column name(s) from Step 1 as a list to the `subset` parameter. For example: `df.drop_duplicates(subset=['name'])`.
- **Step 3: Specify Which Duplicate to Keep (Optional)**
    - Use the `keep` parameter to control which of the duplicate rows is preserved. The default is `'first'`, which keeps the first occurrence. You can also use `'last'` to keep the final one, or `False` to drop all rows that have any duplicates.
- **Step 4: Review the Result**
    - The method returns a new, smaller DataFrame with the duplicate rows removed, which can then be used for accurate analysis.

##### Code Translation

```python
import pandas as pd

# --- Step 1: Prepare the Data (and identify uniqueness criteria) ---
# The uniqueness criterion is the 'name' of the dog.
data = {'date': ['2018-09-02', '2019-06-07', '2018-01-17', '2019-06-07', '2018-01-20'],
        'name': ['Bella', 'Max', 'Stella', 'Max', 'Stella'],
        'breed': ['Labrador', 'Labrador', 'Chihuahua', 'Chow Chow', 'Chihuahua']}
vet_visits = pd.DataFrame(data)
print("Original DataFrame:")
print(vet_visits)

# --- Step 2 & 3: Apply drop_duplicates() with subset and keep ---
# We want to find each unique dog, so we subset by 'name'.
# The 'keep' parameter defaults to 'first'. For 'Max', the first entry (Labrador) 
# will be kept, and the second (Chow Chow) will be dropped.
unique_dogs = vet_visits.drop_duplicates(subset=['name'], keep='first')

# --- Step 4: Review the Result ---
print("\nDataFrame after dropping duplicates by 'name':")
print(unique_dogs)
```

 [[Code - drop_duplicates() Method Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`subset`**: A list of column labels to use for identifying duplicates. If not specified (`None`), all columns are used to find rows that are identical across the board.
- **`keep`**: A string that determines which duplicates (if any) to keep.
    - **`'first'`**: (Default) Marks all duplicates as `True` except for the first occurrence.
    - **`'last'`**: Marks all duplicates as `True` except for the last occurrence.
    - **`False`**: Marks all duplicates as `True`. This will drop all rows that have a duplicate anywhere in the DataFrame.
- **`inplace`**: A boolean (default `False`). If `True`, the DataFrame is modified directly and the method returns `None`. If `False`, it returns a new DataFrame with duplicates removed.

#### Core Trade-offs

- **Pro: Ensures Accuracy**
    - It is the most direct way to ensure that counts, aggregations, and statistical models are not biased by redundant data.
- **Con: Potential for Information Loss**
    - If a duplicate row contains meaningful but different data in other columns (e.g., a dog's weight changing over time, or Max's breed being recorded differently), dropping it loses that context. The choice of `keep` ('first' vs. 'last') can be arbitrary and affect analysis, especially with time-series data.
- **Risk: Incorrect Subset Definition**
    - Carelessly choosing the `subset` can lead to unintended data removal. For example, dropping duplicates based only on 'breed' would incorrectly reduce the dataset to one dog of each breed.

## Connections

```
                  (Parent)
              Python - Pandas DataFrame
                     ▲
                     │
┌────────────────────┼────────────────────┐
│                    │                    │
(Precursor to)  ┌──────────────────────────┐ (Precursor to)
[[Python - value_counts() Method|value_counts()]]  │ drop_duplicates() Method │ [[Python - Counting Categorical Data|Counting Categorical Data]]
                └──────────────────────────┘
```

### Parent Concept

This method is a core function for data manipulation within a [[Python - Pandas DataFrame]].

### Child Concepts



### Related Concepts 

- It is often used as a preparatory step before [[Python - Counting Categorical Data|counting categorical data]] to ensure each item is counted only once.
- The [[Python - value_counts() Method|value_counts()]] method provides a shortcut for counting unique values in a Series, but `drop_duplicates()` is more flexible for handling uniqueness across multiple columns in a DataFrame.
- This method is a fundamental part of data cleaning, which is a key component of [[Fundamental - Feature Engineering]].
## Questions

- Imagine the vet clinic data has a 'treatment_cost' column. If you `drop_duplicates(subset='name')`, you lose the revenue data from repeat visits. How would you calculate both the number of unique dogs *and* the total revenue per breed? What's the business risk of only reporting on unique dogs?
- You're processing a 100GB stream of vet visit events and cannot hold the entire dataset in memory. How would you design a system to efficiently find and count unique dogs without using pandas' in-memory `drop_duplicates()`?
- What if two different dogs were accidentally given the same name, 'Lucy'? How could `drop_duplicates(subset='name')` lead to a dangerously wrong conclusion, and what additional data or logic would you need to disambiguate them?