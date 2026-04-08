---
tags: 
  - core
  - python
  - record_linkage
  - thresholding
  - filtering
  - data_matching
  - deduplication
  - concept
source: 
  - "[[Cleaning Data in Python]]"
related: 
  - "[[Python - Record Linkage]]"
  - "[[Python - Record Linkage Workflow]]"
  - "[[Python - recordlinkage Package]]"
  - "[[Python - Generating Candidate Pairs in Record Linkage]]"
  - "[[Python - Comparing Candidate Pairs in Record Linkage]]"
  - "[[Python - Computing Comparison Scores with recordlinkage]]"
  - "[[Python - The recordlinkage.Compare Object]]"
  - "[[Python - Blocking in Record Linkage]]"
  - "[[Python - NumPy]]"
  - "[[Python - Filtering NumPy Arrays]]"
  - "[[Fundamental - Statistics]]"
  - "[[Fundamental - Feature Engineering]]"
---
# Core: Filtering Matches by Score Threshold

## Summary

>After computing similarity scores for various attributes between record pairs, filtering by a score threshold is the process of making a final decision. It involves summing the individual attribute scores for each pair and then keeping only those pairs whose total score exceeds a predefined minimum value, effectively separating likely matches from unlikely ones.

**Why This Matters:** This technique is the critical decision-making step in record linkage that transforms a vast sea of possible connections into a manageable and high-confidence list of actual duplicates.

_Analogy:_ _Think of it like an audition for a talent show. Each candidate pair is a contestant, and each attribute comparison (e.g., name, date of birth) is a judge. Each judge gives a score (0 or 1). At the end of the performance, the contestant's scores from all judges are added up. Only contestants who achieve a total score above a certain cutoff (e.g., 2 out of 4) are considered 'potential finalists' and move on to the next round. Those who don't meet the threshold are sent home._

**Where it breaks down:** This simple analogy assumes each 'judge' (attribute) has equal importance. In more advanced record linkage, you might give more weight to a 'yes' from the 'Social Security Number' judge than the 'City' judge, something not captured by a simple sum.

```
Scores DataFrame (All Candidate Pairs)
+----------------+-------+---------+-------+  Sum  Filter (>=2)
| Pair           | name  | dob     | state | ----> ------>
+----------------+-------+---------+-------+
| rec1 <-> recA  |  1.0  |  1.0    |  1.0  |  3.0    KEEP
| rec2 <-> recB  |  0.0  |  1.0    |  1.0  |  2.0    KEEP
| rec3 <-> recC  |  1.0  |  0.0    |  0.0  |  1.0    DROP
| rec4 <-> recD  |  0.0  |  0.0    |  1.0  |  1.0    DROP
+----------------+-------+---------+-------+
                  |
                  V
Final DataFrame (Potential Matches)
+----------------+-------+---------+-------+
| Pair           | name  | dob     | state |
+----------------+-------+---------+-------+
| rec1 <-> recA  |  1.0  |  1.0    |  1.0  |
| rec2 <-> recB  |  0.0  |  1.0    |  1.0  |
+----------------+-------+---------+-------+
```

## Details

This is the classification stage within the broader [[Python - Record Linkage Workflow|record linkage workflow]]. After [[Python - Computing Comparison Scores with recordlinkage|computing comparison scores]], you are left with a DataFrame where each row represents a candidate pair and each column holds the similarity score for a specific feature. This filtering step aggregates these individual feature scores into a single, decisive total score for each pair. By applying a threshold to this total score, we can efficiently sift through thousands or millions of pairs to isolate the ones most likely to be true matches.

#### Primary Goal

To programmatically reduce the set of all candidate pairs to a smaller, high-probability subset of potential matches, making subsequent manual review or analysis feasible.

#### Mechanism

- **Step 1: Obtain the Scores DataFrame**
    - Start with the DataFrame generated from the comparison step, where the index contains the record pairs and columns contain the similarity scores for each feature.
- **Step 2: Sum Scores Horizontally**
    - For each row (record pair), calculate the sum of all feature scores. In pandas, this is done using the `.sum()` method with `axis=1`, which tells it to sum across the columns.
- **Step 3: Apply a Boolean Filter**
    - Create a boolean Series by comparing the summed scores to a chosen threshold (e.g., `sum >= 2`). This Series will have `True` for pairs that meet the condition and `False` for those that don't.
- **Step 4: Select Matching Rows**
    - Use this boolean Series to index the original scores DataFrame. This action effectively selects and returns only the rows where the condition was `True`, giving you the final list of potential matches.

##### Code Translation

```python
import pandas as pd

# --- Step 1: Obtain the Scores DataFrame ---
# This is a sample DataFrame mimicking the output of a recordlinkage comparison.
# Index is a MultiIndex of record pairs.
# 1.0 means a match on that feature, 0.0 means no match.
index = pd.MultiIndex.from_tuples([
    ('rec-4878-org', 'rec-4878-dup-0'),
    ('rec-417-org', 'rec-2867-dup-0'),
    ('rec-3964-org', 'rec-394-dup-0'),
    ('rec-1373-org', 'rec-4051-dup-0')
], names=['rec_id_1', 'rec_id_2'])

scores_df = pd.DataFrame([
    [1.0, 1.0, 1.0, 0.0], # Total score = 3.0
    [0.0, 1.0, 0.0, 1.0], # Total score = 2.0
    [0.0, 1.0, 1.0, 0.0], # Total score = 2.0
    [0.0, 0.0, 1.0, 0.0]  # Total score = 1.0
], index=index, columns=['date_of_birth', 'state', 'surname', 'address_1'])

print("--- Original Scores DataFrame ---")
print(scores_df)

# --- Step 2: Sum Scores Horizontally ---
# Calculate the total score for each record pair.
total_scores = scores_df.sum(axis=1)

# --- Step 3: Apply a Boolean Filter ---
# Define the threshold and create the boolean mask.
threshold = 2
is_potential_match = total_scores >= threshold

# --- Step 4: Select Matching Rows ---
# Use the boolean mask to filter the original DataFrame.
potential_matches = scores_df[is_potential_match]

print("\n--- Filtered Potential Matches (Score >= 2) ---")
print(potential_matches)

# The one-liner from the context image combines steps 2, 3, and 4:
# potential_matches = scores_df[scores_df.sum(axis=1) >= 2]
```

 [[Code - Filtering Matches by Score Threshold Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Threshold Value**
    - This is the most critical parameter. It directly controls the trade-off between precision and recall.
    - **High Threshold:** Results in fewer matches, but those identified are very likely to be correct (high precision). However, you risk missing many true matches (low recall).
    - **Low Threshold:** Results in more matches, capturing most of the true duplicates (high recall). However, you will also include many incorrect matches (false positives), leading to lower precision.

#### Core Trade-offs

- **Simplicity vs. Granularity**
    - A simple sum is easy to implement and understand, but it treats all features as equally important. A match on a unique identifier like `social_security_number` should arguably contribute more to the total score than a match on a common `city`.
- **Subjectivity of Threshold**
    - Choosing the 'right' threshold is often more of an art than a science. It depends heavily on the specific business problem, the quality of the data, and the tolerance for false positives versus false negatives. It typically requires experimentation and domain expertise.

## Connections

```
                      (Parent)
            Computing Comparison Scores
                       ▲
                       │
┌──────────────────────┼───────────────────────────┐
│                      │                           │
(Workflow Step) ┌──────────────────────────────────┐ (Workflow Step)
Record Linkage  │ Filtering Matches by Score Threshold │ Comparing Candidate Pairs
Workflow        └──────────────────────────────────┘
                       │
                       ▼
                 (Leads to)
          Manual Review / Classification
```

### Parent Concept

This filtering method is the direct consumer of the output from [[Python - Computing Comparison Scores with recordlinkage|computing comparison scores]], turning a matrix of feature similarities into a final decision.

### Child Concepts

- While a final step in automated filtering, this process is often a precursor to **manual review**, where a human inspects the high-scoring pairs to confirm they are true matches.

### Related Concepts 

- This technique is a fundamental classification step within the overall [[Python - Record Linkage Workflow|record linkage workflow]].
- The scores being filtered are generated by the process of [[Python - Comparing Candidate Pairs in Record Linkage|comparing candidate pairs]] using various similarity metrics.
- The entire operation is typically managed using tools from the [[Python - recordlinkage Package|recordlinkage package]].
## Questions

- You're linking patient records for a critical clinical trial. A high threshold ensures high data integrity (high precision) but might exclude patients who are true duplicates but have data entry errors, potentially skewing results (low recall). A low threshold includes more patients (high recall) but risks merging records of different people, a major compliance violation. How do you choose a threshold and justify the associated clinical and business risks?
- In a production system that links streaming user data in real-time, how would you design a system to dynamically adjust the matching threshold? What metrics would you monitor to trigger an adjustment, and what are the risks of an automated threshold-tuning system?
- What if, instead of a simple sum and a hard threshold, you were required to treat this as a classification problem? How would you use the feature scores (e.g., `date_of_birth_score`, `surname_score`) as inputs to a machine learning model like Logistic Regression to predict a match, and what are the primary advantages of that approach over simple thresholding?