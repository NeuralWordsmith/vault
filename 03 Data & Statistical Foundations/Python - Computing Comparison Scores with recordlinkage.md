---
tags: 
  - core
  - python
  - record_linkage
  - feature_engineering
  - comparison_vectors
  - compute
  - entity_resolution
  - concept
source: 
  - "[[Cleaning Data in Python]]"
related: 
  - "[[Python - Record Linkage]]"
  - "[[Python - Record Linkage Workflow]]"
  - "[[Python - recordlinkage Package]]"
  - "[[Python - Generating Candidate Pairs in Record Linkage]]"
  - "[[Python - The recordlinkage.Index Object]]"
  - "[[Python - Blocking in Record Linkage]]"
  - "[[Python - Comparing Candidate Pairs in Record Linkage]]"
  - "[[Python - The recordlinkage.Compare Object]]"
  - "[[Python - Defining Comparison Vectors with recordlinkage]]"
  - "[[Python - Filtering Potential Matches from Comparison Scores]]"
  - "[[Python - Pandas DataFrames]]"
  - "[[Fundamental - Feature Engineering]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[Python - NumPy (Numeric Python)]]"
---
# Core: Computing Comparison Vectors in Record Linkage

## Summary

>The `.compute()` method is the execution engine in the `recordlinkage` library's comparison phase. It takes the pre-generated candidate pairs and the defined comparison rules (from a [[Python - The recordlinkage.Compare Object|Compare object]]) and applies them to the original DataFrames, producing a DataFrame of comparison vectors where each row represents a pair and each column represents a comparison rule's score.

**Why This Matters:** This step transforms abstract comparison rules into a concrete, quantitative score matrix, which is the essential input for classifying pairs as matches or non-matches.

_Analogy:_ _Imagine a panel of judges at a talent show. Each judge is responsible for scoring one specific aspect of a performance (e.g., vocals, choreography, costume). The `.compute()` function is like the show's producer who takes the list of all contestants (candidate pairs), gives each judge the performance details (the original DataFrames), and collects their individual scorecards. The final result is a master spreadsheet where each row is a contestant and each column is a judge's score for a specific category._

**Where it breaks down:** In the talent show, judges might have subjective biases. The `.compute()` function is entirely objective and deterministic; it applies the exact same mathematical rule to every single pair without variation.

```
    +-----------------+   +--------------------+   +-----------------+
    | DataFrame A     |   | Candidate Pairs    |   | DataFrame B     |
    | (rec_id_1 data) |   | (rec_id_1, rec_id_2) |   | (rec_id_2 data) |
    +-----------------+   +--------------------+   +-----------------+
            |                      |                       |
            |         .compute(pairs, df_A, df_B)          |
            └──────────────────────|───────────────────────┘
                                   ▼
                 +------------------------------------+
                 |      Comparison Vector DataFrame     |
                 +------------------------------------+
                 | rec_id_1, rec_id_2 | comp_1 | comp_2 |
                 |--------------------|--------|--------|
                 |      (10, 25)      |   1.0  |   0.0  |
                 |      (12, 88)      |   0.85 |   1.0  |
                 |        ...         |   ...  |   ...  |
                 +------------------------------------+
```

## Details

After defining *how* to compare records using a [[Python - The recordlinkage.Compare Object|Compare object]], the `.compute()` method is the crucial step that actually performs the comparison. It iterates through each candidate pair, looks up the corresponding records in the two source DataFrames, and applies every defined comparison rule (like exact match, string similarity, etc.). The output is a structured, multi-indexed DataFrame known as the comparison vectors, which serves as the feature set for the final classification step.

#### Primary Goal

To execute the defined comparison logic on all candidate pairs and generate a numerical feature matrix (comparison vectors) that quantifies the similarity between each pair across multiple attributes.

#### Mechanism

- **Step 1: Initialize Objects**
    - Start with the generated candidate pairs (a `MultiIndex` object) from the indexing step and a configured `recordlinkage.Compare` object where comparison rules have been added.
- **Step 2: Execute Computation**
    - Call the `.compute()` method on the `Compare` object. This method requires the candidate pairs and the two original DataFrames as arguments so it can look up the actual data for comparison.
- **Step 3: Generate Comparison Vectors**
    - The method processes each pair, applies each defined comparison (e.g., `exact()`, `string()`), and calculates a score (0 for non-match, 1 for match, or a float between 0 and 1 for similarity).
- **Step 4: Return the Feature DataFrame**
    - The output is a pandas DataFrame where the index is the `MultiIndex` of candidate pairs, and the columns correspond to the labels of the comparison rules. This DataFrame is the direct input for the next stage: [[Python - Filtering Potential Matches from Comparison Scores|scoring and classification]].

##### Code Translation

```python
import pandas as pd
import recordlinkage

# Assume df_a and df_b are pandas DataFrames
# and 'pairs' is a MultiIndex of candidate links
# from a previous indexing step.
df_a = pd.DataFrame({'rec_id': ['rec-1070-org'], 'date_of_birth': ['1970-01-01'], 'state': ['CA'], 'surname': ['smith']})
df_b = pd.DataFrame({'rec_id': ['rec-561-dup'], 'date_of_birth': ['1980-05-10'], 'state': ['CA'], 'surname': ['smyth']})
df_a.set_index('rec_id', inplace=True)
df_b.set_index('rec_id', inplace=True)

# --- Step 1: Initialize Objects ---
# Generate candidate pairs (for this example, all pairs)
indexer = recordlinkage.Index()
indexer.full()
pairs = indexer.index(df_a, df_b)

# Configure the Compare object
comparer = recordlinkage.Compare()
comparer.exact('date_of_birth', 'date_of_birth', label='date_of_birth')
comparer.exact('state', 'state', label='state')
comparer.string('surname', 'surname', threshold=0.85, label='surname')

# --- Step 2 & 3: Execute Computation & Generate Vectors ---
# The .compute() method does the work
comparison_vectors = comparer.compute(pairs, df_a, df_b)

# --- Step 4: Inspect the Feature DataFrame ---
print("Comparison Vectors DataFrame:")
print(comparison_vectors)

# Output:
# Comparison Vectors DataFrame:
#                           date_of_birth  state  surname
# rec_id       rec_id                                    
# rec-1070-org rec-561-dup              0      1      1.0
```

 [[Code - Computing Comparison Vectors in Record Linkage Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`pairs`**: A `pandas.MultiIndex` object containing the candidate record pairs to be compared. This is typically generated by an [[Python - The recordlinkage.Index Object|indexer object]].
- **`df_a`**: The first DataFrame. The `.compute()` method uses the first level of the `pairs` index to look up records from this DataFrame.
- **`df_b`**: The second DataFrame. The method uses the second level of the `pairs` index to look up records here.

#### Core Trade-offs

- **Computational Cost**: The primary tradeoff is performance. The time taken by `.compute()` is directly proportional to the number of candidate pairs and the complexity of the comparison functions. String similarity algorithms are particularly expensive.
- **Memory Usage**: The resulting comparison vector DataFrame can become very large if there are many candidate pairs and many comparison features, potentially leading to memory issues. This reinforces the importance of effective [[Python - Blocking in Record Linkage|blocking]] to reduce the number of pairs.

## Connections

```
                           (Parent)
             Comparing Candidate Pairs in Record Linkage
                                 ▲
                                 │
       ┌─────────────────────────┼──────────────────────────┐
       │                         │                          │
(Precedes)             ┌───────────────────────────────────┐            (Follows)
Generating Pairs       │ Computing Comparison Vectors      │ Filtering Potential Matches
                       └───────────────────────────────────┘
                                 │
                                 │
                               (Uses)
                                 ▼
                       recordlinkage.Compare Object
```

### Parent Concept

This process is a core part of the overall workflow for [[Python - Comparing Candidate Pairs in Record Linkage|comparing candidate pairs]] in a record linkage project.

### Child Concepts



### Related Concepts 

- The output of this step is the direct input for [[Python - Filtering Potential Matches from Comparison Scores|filtering and classifying potential matches]].
- The rules executed by `.compute()` are defined beforehand using a [[Python - The recordlinkage.Compare Object|recordlinkage.Compare object]].
- The efficiency of this computation heavily depends on the quality of the candidate set generated during [[Python - Generating Candidate Pairs in Record Linkage|candidate pair generation]].
## Questions

- Your `.compute()` step is taking hours to run on a large dataset. You suspect that a few complex string similarity comparisons are the bottleneck. How would you approach diagnosing the performance issue, and what trade-offs between match quality and computational speed would you consider when proposing a solution to the business?
- Imagine you need to implement a record linkage pipeline that runs daily on new streaming data. How would you design the system around the `.compute()` step to ensure it's incremental and doesn't re-compute comparisons for all historical data every day? What state would you need to maintain?
- What if the `.compute()` method allowed for custom, user-defined comparison functions that could make external API calls (e.g., to a geolocation service to compare addresses)? What new failure modes and performance challenges would this introduce, and how might you mitigate them?