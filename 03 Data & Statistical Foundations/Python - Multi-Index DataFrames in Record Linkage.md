---
tags: 
  - core
  - python
  - record_linkage
  - multi-index
  - candidate_pairs
  - data_matching
  - pandas
  - concept
source: 
  - "[[Cleaning Data in Python]]"
related: 
  - "[[Python - Record Linkage Workflow 1]]"
  - "[[Python - Filtering Potential Matches by Score]]"
  - "[[Python - Accessing Multi-Index Levels with get_level_values()]]"
  - "[[Python - Inverting a Boolean Index with the Tilde (~) Operator]]"
  - "[[Python - Concatenating DataFrames with pandas.concat()]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Sets]]"
  - "[[Python - Tuples]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - Indexing NumPy Arrays]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[DSA - Big O Notation]]"
  - "[[Python - List Comprehensions]]"
---
# Core: Potential Matches DataFrame

## Summary

>In record linkage, a Potential Matches DataFrame is a specialized, multi-index data structure that holds all candidate pairs generated from two datasets. Its index consists of record IDs from each source DataFrame, and its columns, often called 'comparison vectors', contain binary values (1 for match, 0 for mismatch) indicating whether the records agree on specific attributes. This DataFrame is a critical intermediate step in the overall [[Python - Record Linkage Workflow 1|record linkage workflow]], serving as the direct input for scoring and classification.

**Why This Matters:** This structure systematically organizes all plausible record pairs, transforming the abstract problem of record linkage into a concrete, computable scoring and filtering task.

_Analogy:_ _Think of a detective's investigation board for finding a suspect's alias. The detective has a list of known associates (records from `census_A`) and a separate list of persons of interest from another town (records from `census_B`). The board itself is the Potential Matches DataFrame. For each known associate, the detective pins up photos of several persons of interest who share some characteristics (e.g., same height, hair color). A red string connects them if a characteristic matches (a '1'), and there's no string if it doesn't (a '0'). The board doesn't identify the alias, but it organizes all the plausible connections so the detective can focus on the most promising leads._

In this analogy:
- **Known Associates (`census_A`)**: The first set of records.
- **Persons of Interest (`census_B`)**: The second set of records.
- **The Investigation Board**: The `potential_matches` Multi-Index DataFrame.
- **Pairing an Associate with a Person of Interest**: A single row in the DataFrame, identified by the multi-index (`rec_id_1`, `rec_id_2`).
- **Red Strings (Matching Traits)**: The columns with a value of '1'.
- **Where it breaks down:** The detective is looking for a compatible partner or a connection, whereas in record linkage, we are trying to confirm that two records represent the exact same entity.

```
A simplified ASCII representation of the Potential Matches DataFrame:

                  (Comparison Vector Columns)
                  -------------------------------------
                  date_of_birth | state | surname
                  -------------------------------------
rec_id_1      rec_id_2
rec-1070-org  rec-561-dup-0        0        |   1   |   0.0
              rec-2642-dup-0       0        |   1   |   0.0
              rec-608-dup-0        0        |   1   |   0.0
...
rec-1631-org  rec-1697-dup-0       1        |   1   |   1.0
              rec-4404-dup-0       0        |   1   |   0.0

(Multi-Index)
```

## Details

The Potential Matches DataFrame is the primary output of the 'blocking' or 'candidate generation' phase in record linkage. Instead of comparing every single record from one dataset to every record in another (which is computationally infeasible), we first generate a smaller, more manageable set of plausible pairs. This DataFrame materializes that set, structuring it with a hierarchical index (`MultiIndex`) for efficient lookup and analysis. The columns explicitly show the feature-by-feature agreement, which forms the basis for calculating a final similarity score.

#### Primary Goal

To create a structured, exhaustive list of all candidate record pairs that need to be scored and evaluated for a potential match, while discarding the vast majority of obviously non-matching pairs.

#### Mechanism

- **How it Works:** The DataFrame is defined by two key structural elements: its multi-level index and its comparison vector columns.
    1.  **Index Generation:** A blocking strategy is first applied to the source datasets (e.g., only consider pairs that match on the 'state' attribute). This generates all plausible pairs of record indices.
    2.  **Comparison:** For each generated pair, a series of comparison functions are applied to the linking columns (e.g., 'surname', 'date_of_birth').
    3.  **DataFrame Construction:** The pairs form the `MultiIndex`, and the results of the comparisons form the data in the columns, resulting in the final `potential_matches` DataFrame.
- **Multi-Index Structure:**
    - The index has two levels, typically named after the source record IDs (e.g., `rec_id_1` and `rec_id_2`).
    - For each unique ID in the first level (`rec_id_1`), there are multiple corresponding IDs in the second level (`rec_id_2`), representing all its potential matches.
    - This hierarchical structure is efficient and can be manipulated using specific pandas methods like [[Python - Accessing Multi-Index Levels with get_level_values()|`get_level_values()`]] to analyze matches for a specific record.
- **Comparison Vector Columns:**
    - Each column corresponds to one of the features used for linking (e.g., `state`, `surname`, `address_1`).
    - The values are typically binary: `1` indicates that the feature values for the pair of records agree (e.g., both records have `state` = 'CA'), and `0` indicates they do not.
    - These vectors provide the raw data needed for the next step, [[Python - Filtering Potential Matches by Score|calculating a match score]], which is often a simple sum across the row.

##### Code Translation

```python
import pandas as pd

# --- Example: Manually creating a Potential Matches DataFrame ---
# In a real workflow, a library like `recordlinkage` would generate this.

# The multi-index is a list of tuples (rec_id_1, rec_id_2)
index_tuples = [
    ('rec-1070-org', 'rec-561-dup-0'),
    ('rec-1070-org', 'rec-2642-dup-0'),
    ('rec-1070-org', 'rec-608-dup-0'),
    ('rec-1631-org', 'rec-1697-dup-0'),
    ('rec-1631-org', 'rec-4404-dup-0'),
]
multi_index = pd.MultiIndex.from_tuples(index_tuples, names=['rec_id_1', 'rec_id_2'])

# The comparison data (1 for match, 0 for mismatch)
data = {
    'date_of_birth': [0, 0, 0, 1, 0],
    'state': [1, 1, 1, 1, 1],
    'surname': [0.0, 0.0, 0.0, 1.0, 0.0],
    'address_1': [0.0, 0.0, 0.0, 1.0, 0.0]
}

# Create the DataFrame
potential_matches = pd.DataFrame(data, index=multi_index)

print(potential_matches)
```

 [[Code - Potential Matches DataFrame Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Blocking Strategy:**
    - The choice of which column(s) to block on is the most critical parameter. Blocking on a common attribute like 'state' will generate many pairs, while blocking on a more unique attribute like 'zip_code' will generate fewer.
- **Comparison Columns:**
    - The set of columns chosen for comparison determines the richness of the data available for scoring. Including more columns can help distinguish between true and false matches but adds computational overhead.

#### Core Trade-offs

- **Memory vs. Recall:**
    - A lenient blocking strategy (e.g., blocking on a very common attribute) creates a massive `potential_matches` DataFrame. This increases the chance of finding all true matches (high recall) but can easily exceed available memory and make computation prohibitively slow.
- **Precision vs. Computational Cost:**
    - A strict blocking strategy (e.g., requiring an exact match on 'first_name' and 'last_name') produces a much smaller, higher-precision set of candidates. This is computationally cheap but risks missing true matches with slight variations or typos (low recall).

## Connections

```
                      (Parent)
               Record Linkage Workflow
                         ▲
                         │
         ┌───────────────┼───────────────────────────┐
         │               │                           │
(Used For)      ┌───────────────────────────┐      (Requires)
Filtering by    │ Potential Matches DataFrame │      Accessing Multi-Index
Score           └───────────────────────────┘      Levels
```

### Parent Concept

This DataFrame is a central artifact within the broader [[Python - Record Linkage Workflow 1|record linkage workflow]], representing the output of the candidate generation step and the input to the scoring step.

### Child Concepts

- Once created, the primary next step is [[Python - Filtering Potential Matches by Score|filtering potential matches by score]] to identify the most likely true matches.

### Related Concepts 

- Working with its hierarchical index often requires [[Python - Accessing Multi-Index Levels with get_level_values()|accessing multi-index levels with `get_level_values()`]].
- Filtering operations on this DataFrame might involve using the [[Python - Inverting a Boolean Index with the Tilde (~) Operator|tilde (~) operator to invert a boolean index]] for selecting non-matches.
- The initial datasets that are being linked are often prepared and combined using techniques like [[Python - Concatenating DataFrames with pandas.concat()|concatenating DataFrames]].
## Questions

- Imagine your `potential_matches` DataFrame is too large to fit in memory. How would you adjust your blocking strategy to reduce its size, and what is the risk to the project's goal of finding all duplicate customer records?
- In a production system where new census data arrives daily, how would you design the process to update the `potential_matches` set? Would you regenerate it from scratch, or implement an incremental update strategy? What are the failure modes of each approach?
- What if, instead of binary 0/1 comparison columns, you were required to use fuzzy string similarity scores (e.g., Jaro-Winkler distance from 0.0 to 1.0) directly in this DataFrame? How would that change the structure, the subsequent scoring logic, and the overall performance of the linkage task?