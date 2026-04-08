---
tags: 
  - core
  - python
  - data aggregation
  - deduplication
  - data consolidation
  - groupby
  - data wrangling
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
  - "[[Python - Process for Identifying and Analyzing Duplicates]]"
  - "[[Python - Process for Resolving Incomplete Duplicates with .groupby() and .agg()]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Fundamental - Statistics]]"
  - "[[Python - NumPy Data Aggregation]]"
  - "[[Fundamental - Feature Engineering]]"
---
# Core: Resolving Incomplete Duplicates with Statistical Measures

## Summary

>When dealing with [[Python - Duplicate Data|duplicate data]], sometimes records are not perfect copies. These 'incomplete' or 'partial' duplicates match on key identifiers (like name and address) but differ in other fields (like height or weight). Instead of simply deleting them, this method involves using statistical measures (e.g., mean, max, median) to combine the differing values, creating a single, consolidated, and more accurate representation of the entity. This is a common and powerful strategy within the broader process of [[Python - Data Cleaning]].

**Why This Matters:** This technique prevents the loss of valuable data by intelligently consolidating conflicting records into a single, more reliable entry, improving overall data quality.

_Analogy:_ _Imagine a detective interviewing two witnesses about a suspect's height. Witness A says the suspect was 'about 180 cm,' and Witness B says 'around 182 cm.' Instead of picking one account and discarding the other, the detective consolidates this information in the official report as 'approximately 181 cm.' The two witness accounts are the duplicate rows with discrepancies, the suspect is the unique entity, and the detective's final report is the single, consolidated row created by applying a statistical measure (the average)._

*   **Duplicate Rows:** The two witness statements.
*   **Conflicting Data:** The slightly different height estimates (180 cm vs. 182 cm).
*   **Key Identifier:** The suspect they are both describing.
*   **Statistical Resolution:** The detective calculating the average to create a single, representative value.
*   **Where it breaks down:** A detective would likely not create a value that neither witness actually said. In data science, calculating a mean (181 cm) creates a new value that may not have been explicitly recorded but is statistically representative. This is a powerful but artificial consolidation.

```
[Duplicate Rows for 'Ivor Pierce']
Row 1: {height: 168, weight: 66}
Row 2: {height: 168, weight: 88}
         │
         ▼
.groupby(['first_name', 'last_name'])
         │
         ▼
.agg({'height': 'mean', 'weight': 'max'})
         │
         ▼
[Single Consolidated Row]
Result: {height: 168.0, weight: 88}
```

## Details

When faced with duplicate records that have conflicting information, simply dropping rows using a method like `[[Python - pandas .drop_duplicates() Method|.drop_duplicates()]]` can lead to information loss. For example, if two records for the same person have different weight entries, deleting one means you arbitrarily discard one of the measurements. The core idea of this technique is to embrace the conflict and resolve it logically. By grouping all records belonging to the same entity, we can apply a statistical function to the columns with discrepancies to derive a single, sensible value, thus preserving the entity in our dataset in a more robust form.

#### Primary Goal

To merge partially duplicated records into a single, representative row by statistically resolving conflicting values, thereby avoiding arbitrary data loss.

#### Mechanism

- **How it Works:** The process is typically implemented using a combination of grouping and aggregation.
    - **1. Identify & Group:** First, you define the columns that uniquely identify an entity (e.g., `first_name`, `last_name`, `address`). You then group the entire dataset by these columns. This collects all rows that represent the same entity into a single logical bundle.
    - **2. Aggregate:** Next, you apply an aggregation function to the columns that have discrepancies. The choice of function is critical and depends on the data and the desired outcome.
    - **3. Combine:** The result of the group-and-aggregate operation is a new, clean dataset where each unique entity is represented by a single row, with the previously conflicting data now resolved into a single statistical value.
- **Common Aggregation Strategies:**
    - **Mean/Average:** Best for numerical data where discrepancies are likely due to minor measurement errors. The average provides a central tendency.
*Example: If a product's weight is recorded as 10.1kg and 10.3kg in two entries, the mean (10.2kg) is a reasonable consolidated value.*
    - **Median:** A robust alternative to the mean, especially when outliers or data entry errors are suspected.
*Example: If a person's salary is listed as $60k, $62k, and $620k (a clear typo), the median ($61k) is far more representative than the skewed mean.*
    - **Maximum/Minimum:** Useful when the value represents a cumulative or time-sensitive measure.
*Example: To find a customer's most recent login date from duplicate records, you would use the `max()` function on the timestamp column.*
    - **Mode (Most Frequent):** The ideal choice for categorical data where you want to pick the most common value.
*Example: If a user's location is recorded as 'NY', 'NY', and 'New York', the mode ('NY') is the correct choice.*

##### Code Translation

```python
import pandas as pd

data = {
    'first_name': ['Ivor', 'Desirae', 'Ivor', 'Desirae'],
    'last_name': ['Pierce', 'Shannon', 'Pierce', 'Shannon'],
    'address': ['102-3364 Non Road', 'P.O. Box 643', '102-3364 Non Road', 'P.O. Box 643'],
    'height': [168, 195, 168, 196],
    'weight': [66, 83, 88, 83]
}
df = pd.DataFrame(data)

# --- Step 1: Define identifier columns and aggregation logic ---
identifier_cols = ['first_name', 'last_name', 'address']

# Define how to resolve discrepancies for other columns
# Use 'mean' for height, and 'max' for weight as an example
aggregation_logic = {
    'height': 'mean',
    'weight': 'max'
}

# --- Step 2: Group by identifiers and apply aggregation ---
# This is the core of the technique
clean_df = df.groupby(identifier_cols).agg(aggregation_logic).reset_index()

print("Original DataFrame with Duplicates:")
print(df)
print("\nCleaned DataFrame after Aggregation:")
print(clean_df)

# Output:
# Original DataFrame with Duplicates:
#   first_name last_name            address  height  weight
# 0       Ivor    Pierce  102-3364 Non Road     168      66
# 1    Desirae   Shannon      P.O. Box 643     195      83
# 2       Ivor    Pierce  102-3364 Non Road     168      88
# 3    Desirae   Shannon      P.O. Box 643     196      83

# Cleaned DataFrame after Aggregation:
#   first_name last_name            address  height  weight
# 0    Desirae   Shannon      P.O. Box 643   195.5      83
# 1       Ivor    Pierce  102-3364 Non Road   168.0      88
```

 [[Code - Resolving Incomplete Duplicates with Statistical Measures Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Choice of Aggregation Function:** This is the primary 'parameter' you control. The function you choose directly impacts the final consolidated value.
    - **`mean`:** Creates a central value, sensitive to outliers.
    - **`median`:** Creates a central value, robust to outliers.
    - **`max` / `min`:** Selects the highest or lowest observed value, useful for tracking boundaries or latest/earliest events.
    - **`sum`:** Aggregates total amounts, like combining multiple transactions for one customer.
    - **`first` / `last`:** Selects a value based on its order in the group. Use with caution as it can be arbitrary unless the data is sorted.

#### Core Trade-offs

- **Pro: Preserves Data:** The main advantage is that it prevents the loss of an entire entity's record, which would happen if you simply dropped duplicates.
- **Pro: Improves Data Quality:** By creating a statistically sound central value, you can often produce a more accurate and reliable dataset than by arbitrarily keeping one of the conflicting records.
- **Con: Creates Artificial Data:** The resulting aggregated value (e.g., an average height) might be a value that was never actually observed in the original data. This is a synthetic representation.
- **Con: Requires Domain Knowledge:** Choosing the correct aggregation function is not always obvious and requires a good understanding of the data's meaning. A poor choice (e.g., averaging ID numbers) can corrupt the dataset.
- **Con: Can Mask Deeper Issues:** If discrepancies are very large, aggregation might hide a significant underlying data quality problem that should be investigated and fixed at the source rather than being papered over.

## Connections

```
                      (Parent)
                   Duplicate Data
                         ▲
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                    │
(Tool)          ┌───────────────────────────┐        (Process)
.groupby()/.agg() │ Resolving Incomplete Dups │  Data Cleaning
                  └───────────────────────────┘
```

### Parent Concept

This method is a specific strategy for handling a common problem encountered when working with [[Python - Duplicate Data|duplicate data]].

### Child Concepts

- This is a specific technique and does not have conceptual children.

### Related Concepts 

- The practical implementation of this strategy is detailed in the [[Python - Process for Resolving Incomplete Duplicates with .groupby() and .agg()|process of using .groupby() and .agg()]].
- This method is a crucial step in the broader workflow of [[Python - Data Cleaning]].
- It serves as a more sophisticated alternative to simply using the [[Python - pandas .drop_duplicates() Method|.drop_duplicates()]] method when data loss is a concern.
- The underlying statistical measures are often calculated using functions from [[Python - NumPy (Numeric Python)|NumPy]].
## Questions

- You're cleaning a customer database where duplicate entries for the same person have different 'last_purchase_date' and 'total_spend' values. How would you decide which aggregation strategy (e.g., max, sum, mean) to use for each column, and how would you explain the potential impact of your choices on a marketing campaign's ROI calculation to the sales director?
- Imagine a real-time data stream of user events where partial duplicates are common due to network retries. How would you design a scalable system to deduplicate and aggregate these events within a 5-minute window before they are written to a permanent data warehouse? What are the potential failure points?
- What if, for a given set of duplicates, the discrepancies in a critical numerical column were bimodally distributed (e.g., heights clustering around 160cm and 180cm)? Why would using a simple mean or median be misleading, and what alternative approach might you propose to resolve the duplicates without losing this crucial insight?