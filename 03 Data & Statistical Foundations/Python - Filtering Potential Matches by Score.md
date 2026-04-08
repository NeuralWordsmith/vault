---
tags: 
  - core
  - python
  - record_linkage
  - data_deduplication
  - boolean_indexing
  - pandas
  - filtering
  - concept
source: 
  - "[[Cleaning Data in Python]]"
related: 
  - "[[Python - Record Linkage Workflow 1]]"
  - "[[Python - Multi-Index DataFrames in Record Linkage]]"
  - "[[Python - Inverting a Boolean Index with the Tilde (~) Operator]]"
  - "[[Python - Concatenating DataFrames with pandas.concat()]]"
  - "[[Python - Boolean Indexing]]"
  - "[[Python - NumPy Broadcasting]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[Python - DataFrames]]"
  - "[[Python - Pandas]]"
  - "[[Python - Accessing Multi-Index Levels with get_level_values()]]"
  - "[[Fundamental - Feature Engineering]]"
  - "[[Python - Data Cleaning]]"
---
# Core: Filtering Probable Matches in Record Linkage

## Summary

>In a record linkage process, after generating a comparison matrix for all potential pairs, filtering for probable matches is the step of isolating a smaller, high-confidence subset of pairs. This is typically done by calculating a simple match score for each pair—often by summing the number of agreeing columns—and then keeping only the pairs that exceed a predefined score threshold. This efficiently narrows the focus to the most likely duplicates for further analysis.

**Why This Matters:** This technique is crucial for making record linkage computationally feasible by drastically reducing the number of candidate pairs that require more intensive, expensive comparison.

_Analogy:_ _Imagine a detective trying to find a suspect in a large city. Instead of investigating every single citizen (an impossible task), the detective first creates a shortlist. They have a checklist of key attributes: 'motive', 'no alibi', 'matches description', 'owns a similar vehicle'. They only create a case file for individuals who tick at least 3 out of 4 boxes. This initial filtering allows the detective to ignore thousands of irrelevant people and focus their deep investigation on a small group of probable suspects._

In this analogy:
- **The citizens** are all the possible pairs of records.
- **The checklist of attributes** represents the columns being compared (e.g., surname, date of birth).
- **Ticking a box** is a match in a specific column (a value of 1).
- **The match score** is the total number of ticked boxes for a person.
- **The threshold (3 out of 4)** is the minimum score required to be considered a probable match.
- **The shortlist of probable suspects** is the final filtered DataFrame of likely duplicates.

**Where it breaks down:** The analogy implies all evidence is equally important. In reality, a match on a rare surname is much more significant than a match on a common state, but this simple sum-and-filter method treats them equally.

```
potential_matches DataFrame
+----------------+-------+-------+---------+
|      Pair      | dob   | state | surname |
+----------------+-------+-------+---------+  .sum(axis=1)  +-------+
| (rec-A, rec-X) |   1   |   1   |    1    |  ───────────>  |   3   |  ───>  (Keep)
| (rec-A, rec-Y) |   0   |   1   |    0    |  ───────────>  |   1   |  ───>  (Discard)
| (rec-B, rec-Z) |   1   |   1   |    1    |  ───────────>  |   3   |  ───>  (Keep)
+----------------+-------+-------+---------+                +-------+
                                                                 ^
                                                                 |
                                                            Threshold >= 3
```

## Details

After comparing features between two datasets, you are left with a large DataFrame indicating which columns match for each potential pair. The core idea of this step is to perform a quick, heuristic-based filtering to discard the vast majority of pairs that have very few matching attributes. By summing the number of matches for each pair (row) and applying a threshold, we create a much smaller, more manageable dataset of high-probability duplicates, which is the first crucial step in the overall [[Python - Record Linkage Workflow 1|record linkage workflow]].

#### Primary Goal

To efficiently reduce the set of all potential record pairs to a smaller, high-confidence subset of likely matches, minimizing computational cost for subsequent, more complex matching steps.

#### Mechanism

- **Step 1: Start with a Comparison DataFrame**
    - Begin with a DataFrame (e.g., `potential_matches`) where the index identifies the pair of records being compared, often using a [[Python - Multi-Index DataFrames in Record Linkage|MultiIndex]], and the columns represent the features being compared. A value of 1 indicates a match, and 0 indicates a mismatch.
- **Step 2: Calculate a Row-wise Match Score**
    - Use the `.sum(axis=1)` method on the DataFrame. This operation sums the values horizontally across each row, effectively giving each record pair a simple 'match score' equal to the number of columns that agree.
- **Step 3: Create a Boolean Mask**
    - Compare the resulting Series of scores against a numeric threshold (e.g., `>= 3`). This creates a boolean Series of the same length as the DataFrame, with `True` for rows that meet or exceed the threshold and `False` for those that don't.
- **Step 4: Apply the Mask to Filter**
    - Use this boolean mask to index the original `potential_matches` DataFrame. This operation selects only the rows where the mask is `True`, resulting in a new DataFrame containing only the probable matches.

##### Code Translation

```python
import pandas as pd

# --- Step 1: Start with a Comparison DataFrame ---
# This DataFrame represents the output of a comparison step.
# The MultiIndex contains pairs of record IDs from two censuses.
# Columns show if attributes match (1.0) or not (0.0).
arrays = [
    ['rec-2404-org', 'rec-4178-org', 'rec-1054-org', 'rec-9999-org'],
    ['rec-2404-dup-0', 'rec-4178-dup-0', 'rec-1054-dup-0', 'rec-0000-dup-1']
]
index = pd.MultiIndex.from_arrays(arrays, names=('rec_id_1', 'rec_id_2'))
potential_matches = pd.DataFrame({
    'date_of_birth': [1.0, 1.0, 1.0, 0.0],
    'state': [1.0, 1.0, 1.0, 1.0],
    'surname': [1.0, 1.0, 1.0, 0.0],
    'address_1': [1.0, 1.0, 0.0, 0.0]
}, index=index)

# --- Step 2: Calculate a Row-wise Match Score ---
match_scores = potential_matches.sum(axis=1)
# print(match_scores)
# rec_id_1      rec_id_2      
# rec-2404-org  rec-2404-dup-0    4.0
# rec-4178-org  rec-4178-dup-0    4.0
# rec-1054-org  rec-1054-dup-0    3.0
# rec-9999-org  rec-0000-dup-1    1.0

# --- Step 3: Create a Boolean Mask ---
threshold = 3
mask = match_scores >= threshold
# print(mask)
# rec_id_1      rec_id_2      
# rec-2404-org  rec-2404-dup-0     True
# rec-4178-org  rec-4178-dup-0     True
# rec-1054-org  rec-1054-dup-0     True
# rec-9999-org  rec-0000-dup-1    False

# --- Step 4: Apply the Mask to Filter (in one line) ---
matches = potential_matches[potential_matches.sum(axis=1) >= 3]

print(matches)
```

 [[Code - Filtering Probable Matches in Record Linkage Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Threshold Value**
    - This is the most critical parameter. It's an integer representing the minimum number of agreeing columns for a pair to be considered a 'probable match'.
    - **Impact:** A **higher threshold** increases precision (the matches you find are very likely to be true duplicates) but decreases recall (you might miss true duplicates that have a few errors and fall below the threshold). A **lower threshold** increases recall at the cost of precision, resulting in more false positives that need to be manually reviewed or processed further.

#### Core Trade-offs

- **Pro: Simplicity and Speed**
    - This method is computationally very cheap and easy to implement using vectorized pandas operations. It's an extremely effective first-pass filter for massive datasets.
- **Con: Ignores Feature Importance**
    - A simple sum treats all features as equally important. A match on a unique identifier like a Social Security Number should be weighted far more heavily than a match on a common feature like 'state'. This method cannot capture that nuance.
- **Con: Sensitive to Minor Data Errors**
    - A true match with a single typo in one of the key fields might fall just below the threshold and be incorrectly discarded. It's a blunt instrument that doesn't account for partial or 'fuzzy' matches.

## Connections

```
                               (Parent)
                         Record Linkage Workflow
                                   ▲
                                   │
           ┌───────────────────────┼───────────────────────┐
           │                       │                       │
(Uses)     │      ┌───────────────────────────────────┐    │     (Related Operation)
Multi-Index DF │ Filtering Probable Matches in RL  │    Inverting a Boolean Index
           │      └───────────────────────────────────┘    │
           │                                               │
           └───────────────────────────────────────────────┘
```

### Parent Concept

This filtering technique is a fundamental step within the broader [[Python - Record Linkage Workflow 1|record linkage workflow]], typically occurring after initial blocking and comparison.

### Child Concepts



### Related Concepts 

- The input data for this step is often structured as [[Python - Multi-Index DataFrames in Record Linkage|multi-index DataFrames]], where the index itself holds the identifiers for each record pair.
- This technique directly contrasts with using the [[Python - Inverting a Boolean Index with the Tilde (~) Operator|tilde (~) operator]] on the boolean mask, which would isolate the *unlikely* matches instead of the probable ones.
- After identifying matches and non-matches, one might use [[Python - Concatenating DataFrames with pandas.concat()|pandas.concat()]] to combine the cleaned, deduplicated data back into a single dataset.
## Questions

- You've set a match threshold of 3 out of 4 columns. This gives you high confidence but you might be missing 15% of true duplicates that only match on 2 columns. How would you justify the cost of manually reviewing these potential misses versus the business risk of having undetected duplicates in your customer database?
- Imagine your `potential_matches` DataFrame contains 500 million rows. The `.sum(axis=1)` operation and subsequent boolean indexing might cause memory errors on a single machine. How would you redesign this filtering step to work on a distributed system like Spark, and what would be the key performance considerations?
- What if instead of a simple sum, you had to implement a weighted scoring system where a `surname` match is worth 3 points, `date_of_birth` is 2 points, but `state` is only 0.5 points? How would this change the code, and what new challenges might arise in determining the correct weights and threshold?