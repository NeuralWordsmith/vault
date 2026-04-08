---
tags: 
  - core
  - python
  - candidate_pairs
  - indexing
  - blocking
  - record_linkage
  - multiindex
  - concept
source: 
  - "[[Cleaning Data in Python]]"
related: 
  - "[[Python - Record Linkage]]"
  - "[[Python - Record Linkage Workflow]]"
  - "[[Python - recordlinkage Package]]"
  - "[[Python - Blocking in Record Linkage]]"
  - "[[Python - Comparing Candidate Pairs in Record Linkage]]"
  - "[[Python - The recordlinkage.Compare Object]]"
  - "[[Python - Defining Comparison Vectors with recordlinkage]]"
  - "[[Python - Computing Comparison Scores with recordlinkage]]"
  - "[[Python - Filtering Potential Matches from Comparison Scores]]"
  - "[[Python - Pandas]]"
  - "[[Python - Pandas DataFrame]]"
  - "[[Python - Pandas MultiIndex]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[Fundamental - Data Cleaning]]"
  - "[[DSA - Big O Notation]]"
---
# Core: Generating Candidate Pairs in Record Linkage

## Summary

>Generating candidate pairs is the process of creating a structured list of all record pairs from two datasets that are considered potential matches. It is a crucial step in the [[Python - Record Linkage Workflow|record linkage workflow]] that typically follows an initial filtering strategy like [[Python - Blocking in Record Linkage|blocking]] to reduce the search space. The process uses the `recordlinkage` library to produce a `pandas.MultiIndex` object, which efficiently stores these pairs of record indices for the next stage of comparison.

**Why This Matters:** This step transforms the abstract problem of finding matches into a concrete, manageable set of potential pairs, making the computationally expensive comparison phase feasible.

_Analogy:_ _Imagine a large conference where a networking host wants to introduce people who might already know each other from their hometown. Instead of the chaotic and time-consuming approach of having every attendee talk to every other attendee (a full comparison), the host first asks everyone to stand in groups based on the city they're from. This is 'blocking'. Then, within each city-group, the host creates a specific list of every possible two-person introduction to make. This list of planned introductions is the 'candidate pairs'. It's a much smaller, more targeted list than introducing everyone to everyone._

**Where it breaks down:** The analogy implies a social goal of making any connection. In record linkage, the goal is much more specific: to find pairs of records that represent the exact same underlying entity, not just records that share a common attribute.

```
    +----------------+   +----------------+
    | DataFrame A    |   | DataFrame B    |
    | (rec_id_1, ..) |   | (rec_id_2, ..) |
    +----------------+   +----------------+
            |                    |
            ▼                    ▼
    +--------------------------------------+
    | recordlinkage.Index()                |
    |  .block('state')                     |
    |  .index(census_A, census_B)          |
    +--------------------------------------+
                     |
                     ▼
    +--------------------------------------+
    | pandas.MultiIndex (Candidate Pairs)  |
    | [('rec_id_1_a', 'rec_id_2_x'),       |
    |  ('rec_id_1_b', 'rec_id_2_y'), ...]  |
    +--------------------------------------+
```

## Details

The core idea is to systematically create potential matches between two datasets after an initial, broad filtering step. This is achieved in Python using the `recordlinkage` library's `Index` object. By first applying a filtering strategy like [[Python - Blocking in Record Linkage|blocking]], we ensure that we only generate pairs that share at least one key characteristic (e.g., the same 'state'). This drastically reduces the number of pairs that need to be evaluated in the more intensive comparison phase. The final output is a `pandas.MultiIndex`, an efficient data structure for storing these pairs of row indices from the original DataFrames.

#### Primary Goal

To produce a structured collection of record index pairs from two DataFrames that are plausible candidates for being a match, serving as the input for the subsequent comparison stage.

#### Mechanism

- **Step 1: Instantiate the Indexer**
    - First, create an indexing object using `recordlinkage.Index()`. This object acts as a builder that will manage the pair generation logic.
- **Step 2: Define the Indexing Method (e.g., Blocking)**
    - Use a method on the indexer object to specify the pairing strategy. The most common method is `.block()`, which is told which column to use. This instructs the indexer to only create pairs of records that have the exact same value in that specified column.
- **Step 3: Generate the Pairs**
    - Call the `.index()` method on the configured indexer, passing in the two DataFrames to be linked. This executes the pairing logic and returns the `pandas.MultiIndex` containing all the generated candidate pairs.

##### Code Translation

```python
import recordlinkage
import pandas as pd

# Assume census_A and census_B are pandas DataFrames
# with a 'state' column and unique record IDs as their index.
# For demonstration, let's create dummy data:
data_a = {'rec_id': ['rec-1007-org', 'rec-1016-org', 'rec-1054-org'],
          'state': ['CA', 'NY', 'CA']}
census_A = pd.DataFrame(data_a).set_index('rec_id')

data_b = {'rec_id': ['rec-2001-org', 'rec-2002-org', 'rec-2003-org'],
          'state': ['NY', 'CA', 'TX']}
census_B = pd.DataFrame(data_b).set_index('rec_id')

# --- Step 1: Instantiate the Indexer ---
indexer = recordlinkage.Index()

# --- Step 2: Define the Indexing Method (Blocking) ---
# Only consider pairs that are in the same state.
indexer.block('state')

# --- Step 3: Generate the Pairs ---
# Generate the candidate links from the two dataframes.
candidate_links = indexer.index(census_A, census_B)

# The result is a pandas MultiIndex
# Expected pairs: ('rec-1007-org', 'rec-2002-org') and ('rec-1054-org', 'rec-2002-org') from CA
# and ('rec-1016-org', 'rec-2001-org') from NY
print(f"Number of candidate pairs: {len(candidate_links)}")
print(candidate_links)
```

 [[Code - Generating Candidate Pairs in Record Linkage Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Blocking Column(s)**
    - The column name(s) passed to the `.block()` method. This is the most critical parameter as it directly controls the size and quality of the candidate set. A more restrictive block (e.g., blocking on `['state', 'city']`) generates fewer pairs but increases the risk of missing true matches (lower recall).
- **DataFrames**
    - The two pandas DataFrames passed into the final `.index()` method. They must have unique indices, as these indices are used to construct the resulting `MultiIndex` of pairs.

#### Core Trade-offs

- **Computational Cost vs. Recall**
    - This is the central tradeoff. Generating all possible pairs (a full index or Cartesian product) is computationally prohibitive for large datasets. Using methods like blocking drastically reduces this cost but risks excluding true matches if they differ in the blocking key (e.g., due to a typo or a change in address), thereby lowering recall.
- **Memory Usage**
    - The resulting `MultiIndex` object can itself be very large and consume significant memory, especially if the blocking strategy is not restrictive enough and generates millions of candidate pairs.
- **Blocking Key Quality**
    - The effectiveness of the entire process hinges on the quality of the data in the blocking column. If the blocking key is noisy, has many missing values, or low cardinality (few unique values), it can lead to either too many candidate pairs (low cardinality) or missed matches (noisy data).

## Connections

```
                      (Parent)
                  Record Linkage
                         ▲
                         |
    ┌────────────────────┼────────────────────┐
    │                    │                    │
(Precedes)      ┌───────────────────────────────────────────┐      (Follows)
Blocking        │ Generating Candidate Pairs in Record Linkage │      Comparing Pairs
                └───────────────────────────────────────────┘
```

### Parent Concept

This process is a fundamental step within the broader framework of [[Python - Record Linkage|record linkage]], which aims to identify and link records that refer to the same entity across different datasets.

### Child Concepts



### Related Concepts 

- This step is the direct implementation of the strategy defined by [[Python - Blocking in Record Linkage|blocking]], which is used to intelligently reduce the search space before generating pairs.
- The output of this process, the candidate pairs, serves as the direct input for [[Python - Comparing Candidate Pairs in Record Linkage|comparing candidate pairs]], where feature similarities are calculated.
- It is a core component of the overall [[Python - Record Linkage Workflow|record linkage workflow]], sitting between initial data filtering and detailed comparison.
## Questions

- You're linking customer records from two systems. Blocking on 'state' generates 10 million candidate pairs, which is too slow to compare. Blocking on 'state' and 'city' reduces it to 500,000 pairs but you suspect you're missing matches for customers who moved. How would you approach this problem, and how would you explain the business impact of potentially lower match accuracy versus faster processing to a product manager?
- Imagine this pair generation process is part of a nightly batch job that links millions of records. If the job starts failing due to out-of-memory errors during the `.index()` call, what are your first three debugging steps? How would you re-architect the pair generation to handle data that is 10x larger without simply provisioning a larger machine?
- What if you were not allowed to use a hard blocking key due to known data quality issues (e.g., many typos in the 'state' column)? How could you still generate a reasonably sized set of candidate pairs without resorting to a full cartesian product of all records?