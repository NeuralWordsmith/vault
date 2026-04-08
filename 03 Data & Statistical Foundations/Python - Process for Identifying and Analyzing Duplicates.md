---
tags: 
  - process
  - python
  - incomplete_duplicates
  - data_quality
  - record_linkage
  - entity_resolution
  - data_deduplication
  - concept
source: 
  - "[[Cleaning Data in Python]]"
related: 
  - "[[Python - Data Cleaning]]"
  - "[[Python - Duplicate Data]]"
  - "[[Python - Causes of Duplicate Data]]"
  - "[[Python - pandas .duplicated() Method]]"
  - "[[Python - .duplicated() Method Parameters (subset, keep)]]"
  - "[[Python - pandas .drop_duplicates() Method]]"
  - "[[Python - Process for Resolving Incomplete Duplicates with .groupby() and .agg()]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[Fundamental - Feature Engineering]]"
  - "[[Python - NumPy Data Aggregation]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Lists]]"
  - "[[Python - Conditional Statements]]"
---
# Process: Handling Incomplete Duplicates

**Why This Matters:** Failing to resolve incomplete duplicates can corrupt aggregations and statistical analysis, leading to flawed business insights and model predictions.
## Goal & Analogy

> **Goal:** Incomplete duplicates are records that appear to represent the same real-world entity based on key identifying columns (e.g., name, address) but have conflicting or inconsistent values in other columns (e.g., height, weight, phone number). They are a common and challenging issue in [[Python - Data Cleaning]].

_Analogy:_ _Imagine you and a friend both have 'Alex' in your phone's contact list. You both have the same home address for Alex, but you have Alex's old work phone number, while your friend has the new one. The 'entity' (Alex) is the same, but the data records are incomplete and inconsistent duplicates of each other._

In this analogy:
- **Alex:** Represents the single, real-world entity.
- **Your Contact Entry & Your Friend's Entry:** These are the two incomplete duplicate rows in the dataset.
- **Name and Address:** These are the key identifying columns that match.
- **Work Phone Number:** This is the column with the conflicting, inconsistent data.
- **Where it breaks down:** In real life, you could simply call Alex to find the correct number. In data analysis, you don't have that luxury and must rely on systematic rules and assumptions to create a single, authoritative 'golden record'.

```
Incomplete Duplicates: Match on Keys, Differ on Attributes

+-------+-----------+-----------+---------------------+--------+--------+
| Index | first_name| last_name |       address       | height | weight |
+-------+-----------+-----------+---------------------+--------+--------+
|   28  |  Desirae  |  Shannon  | P.O. Box 643...     |  195   |   83   |
|  103  |  Desirae  |  Shannon  | P.O. Box 643...     |  196   |   83   |
+-------+-----------+-----------+---------------------+---||---+--------+
                                                           \/
                                                      Discrepancy

+-------+-----------+-----------+---------------------+--------+--------+
|   1   |   Ivor    |   Pierce  | 102-3364 Non Road   |  168   |   66   |
|  101  |   Ivor    |   Pierce  | 102-3364 Non Road   |  168   |   88   |
+-------+-----------+-----------+---------------------+--------+---||---+
                                                                   \/
                                                              Discrepancy
```

## The Step-by-Step Process

### Prerequisites / Inputs

- **Choice of Identifying Columns (`subset`)**
    - This is the most critical decision. Including too few columns (e.g., only `last_name`) can falsely group different people. Including too many (e.g., `timestamp`) can cause you to miss legitimate duplicates that were entered at different times.
- **Resolution Strategy**
    - Once identified, you must decide how to merge the conflicting data. This is not a parameter of the identification method but of the subsequent handling process. Common strategies include taking the most recent value, the most frequent one, or averaging numerical data. This is the focus of the [[Python - Process for Resolving Incomplete Duplicates with .groupby() and .agg()|process for resolving duplicates]].

### The Steps

- **Step 1: Define Identifying Columns**
    - First, determine which columns should uniquely identify an entity. In the example, these are `first_name`, `last_name`, and `address`.
- **Step 2: Flag All Occurrences of Duplicates**
    - Use the `.duplicated()` method with the identifying columns as the `subset` and set `keep=False`. This creates a boolean Series that marks *all* rows that are part of a duplicate set, not just the subsequent ones.
- **Step 3: Isolate and Inspect the Duplicates**
    - Use the boolean Series from the previous step to filter the original DataFrame. This shows only the rows that have duplicates, making them easier to inspect.
- **Step 4: Sort for Comparison**
    - As shown in the context image, sorting the isolated duplicates (e.g., by `first_name`) groups the matching records together, providing a clear 'bird's eye view' to visually confirm which are complete duplicates and which are incomplete.

##### Code Translation

```python
import pandas as pd

# --- Sample DataFrame mimicking the context ---
data = {
    'first_name': ['Cole', 'Desirae', 'Ivor', 'Mary', 'Ivor', 'Cole', 'Desirae', 'Mary'],
    'last_name': ['Palmer', 'Shannon', 'Pierce', 'Colon', 'Pierce', 'Palmer', 'Shannon', 'Colon'],
    'address': ['8366 At, Street', 'P.O. Box 643, 5251 Consectetuer, Rd.', '102-3364 Non Road', '4674 Ut Rd.', '102-3364 Non Road', '8366 At, Street', 'P.O. Box 643, 5251 Consectetuer, Rd.', '4674 Ut Rd.'],
    'height': [178, 195, 168, 179, 168, 178, 196, 179],
    'weight': [91, 83, 66, 75, 88, 91, 83, 75]
}
df = pd.DataFrame(data, index=[22, 28, 1, 37, 101, 102, 103, 100])

# --- Step 1 & 2: Define identifiers and flag all duplicates ---
identifying_cols = ['first_name', 'last_name', 'address']
duplicates_mask = df.duplicated(subset=identifying_cols, keep=False)

# --- Step 3: Isolate the duplicate rows ---
duplicate_rows = df[duplicates_mask]

# --- Step 4: Sort for a clear view (as in the context image) ---
sorted_duplicates = duplicate_rows.sort_values(by='first_name')

print(sorted_duplicates)
# Output shows the 4 sets of duplicates, including the incomplete ones for Desirae and Ivor.
```

### Deliverables / Outputs

After using a tool like the [[Python - pandas .duplicated() Method|.duplicated() method]] on a subset of columns to flag potential [[Python - Duplicate Data|duplicates]], we often discover that not all flagged rows are identical. The context image shows this perfectly: while the 'Cole Palmer' and 'Mary Colon' records are complete duplicates, the 'Desirae Shannon' and 'Ivor Pierce' records match on name and address but have discrepancies in height and weight. These are **incomplete duplicates**. Handling them is a nuanced process that goes beyond simple removal, as each record might contain a piece of correct information that needs to be consolidated.

## Context & Tradeoffs

### When to Use This Process

To identify, analyze, and resolve inconsistencies between records that represent the same entity, ultimately merging them into a single, accurate, and complete record.

### Common Pitfalls & Tradeoffs

- **Complexity vs. Accuracy**
    - Simply dropping all but one record (like with `drop_duplicates()`) is easy but risks losing valuable information (e.g., the correct height or weight). A proper resolution is more complex but results in a more accurate final dataset.
- **Risk of Incorrect Merging**
    - An automated resolution strategy might make the wrong choice. For example, averaging two different phone numbers is nonsensical. The strategy must be chosen carefully based on domain knowledge of the data.
- **Manual Effort**
    - For critical data with a small number of incomplete duplicates, the best approach might be manual review. This is not scalable but provides the highest accuracy.

## Connections

```
                      (Parent)
                 Duplicate Data
                        ▲
                        │
┌───────────────────────┼───────────────────────────┐
│                       │                           │
(Tool)         ┌──────────────────────────────────┐      (Next Step)
.duplicated()  │  Handling Incomplete Duplicates  │      Process for Resolving...
               └──────────────────────────────────┘
                        │
                        ▼
                   (Part Of)
                 Data Cleaning
```


- The concept of [[Python - Duplicate Data|duplicate data]] is the parent category, encompassing both complete and incomplete duplicates.
- Identifying these records is the first step in the broader task of [[Python - Data Cleaning|data cleaning]].
- The [[Python - pandas .duplicated() Method|.duplicated() method]] is the primary tool used to flag the rows that need to be inspected for incompleteness.
- The logical next step after identifying incomplete duplicates is to use the [[Python - Process for Resolving Incomplete Duplicates with .groupby() and .agg()|process for resolving them]] into a single golden record.
- This contrasts with the simpler action of using the [[Python - pandas .drop_duplicates() Method|.drop_duplicates() method]], which is typically only suitable for complete duplicates.

## Deeper Questions

- You're cleaning a customer database and find two records for 'Jon Smith' with the same address but different phone numbers and different 'last_seen' dates. Your strategy is to merge them, keeping the record with the most recent 'last_seen' date. What is the primary business risk of this automated strategy, and how would you quantify its potential negative impact?
- In a large-scale ETL pipeline that ingests customer data from multiple sources daily, how would you design a system to detect and resolve incomplete duplicates? Describe the architecture, where the deduplication logic would live, and how you would handle cases that require manual review without halting the entire pipeline.
- What if you were tasked with finding incomplete duplicates in a dataset with no reliable identifiers, only behavioral data (e.g., website clicks, purchase history, time spent on page)? What unsupervised learning or probabilistic methods could you use to cluster records that likely belong to the same person?