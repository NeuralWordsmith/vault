---
tags: 
  - process
  - python
  - data_integrity
  - data_cleaning
  - sanity_check
  - pandas
  - boolean_masking
  - concept
source: 
  - "[[Cleaning Data in Python]]"
related: 
  - "[[Python - Handling Data Inconsistencies]]"
  - "[[Python - Cross Field Validation for Flight Passenger Counts]]"
  - "[[Python - Cross Field Validation for User Age and Birthday]]"
  - "[[Python - Booleans]]"
  - "[[Python - Comparison Operators]]"
  - "[[Python - Boolean Operators]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - Filtering NumPy Arrays]]"
  - "[[NumPy - Exploratory Data Analysis with NumPy]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[Fundamental - Statistics]]"
  - "[[SWE - Testing Best Practices]]"
  - "[[Python - Data Types]]"
  - "[[Python - Lists]]"
---
# Process: Cross Field Validation

**Why This Matters:** This technique is crucial for ensuring data integrity by verifying that related pieces of information are logically consistent, preventing flawed analysis and costly downstream errors.
## Goal & Analogy

> **Goal:** Cross-field validation is a data cleaning technique that uses the logical relationships between two or more columns in a dataset to perform a 'sanity check' on the data's integrity. It confirms that the values make sense in context, such as verifying that a total column is indeed the sum of its constituent parts. This is a fundamental step in the broader process of [[Python - Handling Data Inconsistencies|handling data inconsistencies]] before any analysis is performed.

_Analogy:_ _Think of a cashier balancing their cash register at the end of a shift. They have a pile of cash, a stack of credit card receipts, and a list of check payments. They sum these three sources of money. This calculated sum must exactly match the 'total sales' figure recorded by the register's computer. If there's a mismatch, an inconsistency has been found, and an investigation must begin._

In this analogy:
- **The individual payment types** (cash, credit, checks) are like the individual data columns (`economy_class`, `business_class`, `first_class`).
- **The cashier's calculated sum** is the new value derived from these columns.
- **The register's 'total sales' figure** is the expected value or 'total' column (`total_passengers`).
- **Finding a mismatch** is equivalent to identifying an inconsistent row in the dataset.
- **Where it breaks down:** The analogy implies the register's total is the single source of truth. In data validation, it's possible for the component columns, the total column, or both to be incorrect. This method only flags the *discrepancy*; it doesn't automatically identify the source of the error.

```
[DataFrame]
    │
    ├─> [Col A: economy]
    ├─> [Col B: business]
    ├─> [Col C: first]
    │
    ▼
[Sum(A, B, C)] ---> [Compare ==] <--- [Col D: total]
                         │
                         ▼
                  [Boolean Mask]
                  (e.g., [T, T, F, T, T])
                         │
       ┌─────────────────┴─────────────────┐
       │ (Invert with `~`)                 │
       ▼                                   ▼
[Inconsistent Rows]               [Consistent Rows]
(Where Mask is False)             (Where Mask is True)
```

## The Step-by-Step Process

### Prerequisites / Inputs

- **Column Selection**
    - The primary 'parameter' is the choice of which columns to validate against each other. This is determined by domain knowledge of the dataset's business rules.
- **Aggregation/Logical Operation**
    - While `.sum()` is common for totals, the operation can be any function that defines the relationship (e.g., subtraction for checking differences, a custom function for complex rules).
- **Comparison Operator**
    - Equality (`==`) is most frequent, but other operators like `>`, `<`, or `!=` can be used to enforce other types of constraints (e.g., `start_date < end_date`).

### The Steps

- **Step 1: Aggregate Related Columns**
    - First, select the columns that should logically combine to form a total. Use an appropriate aggregation function, like `.sum(axis=1)`, to calculate the expected value for each row.
- **Step 2: Create a Boolean Mask**
    - Compare the newly calculated series from Step 1 with the column containing the expected total. This comparison (e.g., using `==`) generates a boolean Series of `True` for consistent rows and `False` for inconsistent ones.
- **Step 3: Filter for Inconsistencies**
    - Use the boolean mask to subset the original DataFrame. To isolate the problematic rows, invert the mask using the tilde (`~`) symbol. This selects all rows that were marked as `False` in the previous step.

##### Code Translation

```python
import pandas as pd

# Sample DataFrame based on the context
data = {'flight_number': ['DL140', 'BA248', 'MEA124', 'AFR939', 'TKA101'],
        'economy_class': [100, 130, 100, 140, 130],
        'business_class': [60, 100, 50, 70, 100],
        'first_class': [40, 70, 50, 90, 20],
        'total_passengers': [200, 300, 201, 300, 250]} # MEA124 has an error
flights = pd.DataFrame(data)

# --- Step 1: Aggregate Related Columns ---
# Sum the passenger counts for each class across each row (axis=1)
sum_classes = flights[['economy_class', 'business_class', 'first_class']].sum(axis=1)

# --- Step 2: Create a Boolean Mask ---
# Check where the sum of classes equals the total_passengers column
passenger_equ = (sum_classes == flights['total_passengers'])
# print(passenger_equ)
# 0     True
# 1     True
# 2    False  <-- The inconsistency is detected here
# 3     True
# 4     True
# dtype: bool

# --- Step 3: Filter for Inconsistencies ---
# Use the inverted boolean mask to find rows where the sum does NOT equal the total
inconsistent_pass = flights[~passenger_equ]
print("Inconsistent Rows:")
print(inconsistent_pass)

# (Optional) Filter for consistent rows
consistent_pass = flights[passenger_equ]
# print("\nConsistent Rows:")
# print(consistent_pass)
```

### Deliverables / Outputs

Cross-field validation is a powerful data cleaning method that leverages inherent rules and relationships within your data to spot errors. Instead of checking a single column in isolation, you compare it against others to see if they logically align. For example, as shown in the [[Python - Cross Field Validation for Flight Passenger Counts|flight passenger example]], the sum of passengers in different classes should equal the total passengers. Similarly, in another common scenario, you might perform a [[Python - Cross Field Validation for User Age and Birthday|check to ensure a user's stated age is consistent with their date of birth]]. This process is essential for building trust in your dataset before modeling or analysis.

## Context & Tradeoffs

### When to Use This Process

To identify and isolate rows in a dataset where related columns have logically inconsistent values, thereby improving overall data quality and preventing incorrect conclusions.

### Common Pitfalls & Tradeoffs

- **Pro: Simplicity and Effectiveness**
    - It is an intuitive and computationally cheap method for catching common data entry or processing errors that might otherwise go unnoticed.
- **Con: Identifies Problems, Not Solutions**
    - This method flags a row as inconsistent but does not tell you *which* of the columns contains the error. The sum of the parts could be wrong, or the total could be wrong. Manual review or more advanced imputation is required to resolve the issue.
- **Con: Requires Redundancy or Known Rules**
    - The technique is only applicable when there is redundant information (like a total column) or a known, inviolable rule that columns must follow. It cannot be used on datasets without such relationships.

## Connections

```
                      (Parent)
                 Data Cleaning
                           ▲
                           │
           ┌───────────────┼────────────────────────────┐
           │               │                            │
(Broader Process) ┌───────────────────────────┐   (Specific Example)
Handling Data     │  Cross Field Validation   │   Flight Passenger Counts
Inconsistencies   └───────────────────────────┘
                             │
                  ┌──────────┴──────────┐
                  │                     │
      User Age and Birthday      (and other examples...)
```


- This technique is a core component of the broader process of [[Python - Handling Data Inconsistencies|handling data inconsistencies]] found during data cleaning.
- A classic application is the [[Python - Cross Field Validation for Flight Passenger Counts|validation of flight passenger counts]], where component totals must match a grand total.
- Another common use case involves checking logical consistency, such as in the [[Python - Cross Field Validation for User Age and Birthday|validation of a user's age against their date of birth]].

## Deeper Questions

- Imagine you discover that 5% of your sales data has inconsistent totals (sum of items vs. final price). The business needs a quarterly report tomorrow. Do you drop the inconsistent rows, potentially under-reporting revenue, or do you try to correct them, risking the introduction of new errors and missing the deadline? How do you explain your choice to the Head of Sales?
- You're building a data ingestion pipeline that processes millions of records per hour. How would you implement cross-field validation checks in a streaming context without creating a major performance bottleneck? What alerting mechanism would you put in place for when the rate of inconsistencies suddenly spikes?
- What if you had a dataset with hundreds of columns, and you suspected there were logical relationships between them, but you didn't know what they were? How could you use machine learning or statistical methods to automatically discover potential rules for cross-field validation?