---
tags: 
  - process
  - python
  - record_linkage
  - data_deduplication
  - entity_resolution
  - data_matching
  - fuzzy_matching
  - concept
source: 
  - "[[Cleaning Data in Python]]"
related: 
  - "[[Python - Multi-Index DataFrames in Record Linkage]]"
  - "[[Python - Filtering Potential Matches by Score]]"
  - "[[Python - Accessing Multi-Index Levels with get_level_values()]]"
  - "[[Python - Inverting a Boolean Index with the Tilde (~) Operator]]"
  - "[[Python - Concatenating DataFrames with pandas.concat()]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Sets]]"
  - "[[Python - List Comprehensions]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[Fundamental - SQL]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - Boolean Operators]]"
  - "[[Python - Comparison Operators]]"
---
# Process: Record Linkage Workflow

**Why This Matters:** This workflow is crucial for creating a single, reliable source of truth by intelligently merging disparate datasets that lack a common unique identifier, preventing fragmented and inaccurate analysis.
## Goal & Analogy

> **Goal:** Record linkage is a multi-step process used to identify and connect records that refer to the same entity across different data sources. As described in the context, this involves generating potential pairs, scoring them based on matching columns, isolating high-confidence duplicates, filtering out these duplicates from one dataset, and finally combining the unique records to create a unified view.

_Analogy:_ _Imagine you're a detective with two separate witness reports about a getaway car. Report A says it was a 'blue, 4-door sedan with a dented fender'. Report B says it was a 'dark blue Ford sedan with a broken taillight'. Neither report has a license plate (a unique ID). Your job is to link these reports. You compare attributes (color, type, damage) to decide if they describe the same car. If you find enough matching 'clues' (e.g., color, make, type), you confidently link the reports. You then set aside the redundant information from Report B and merge the unique details from both into a single, more complete case file._

In this analogy, the witness reports are the DataFrames (`census_A`, `census_B`), the car's attributes (color, make, damage) are the columns, and the final case file is the linked DataFrame. The process of comparing clues is the matching and scoring step. **Where it breaks down:** Unlike detective work which can involve intuition and ambiguity, record linkage in data science relies on explicit, programmable rules and similarity scores. The data is structured, and the 'clues' are not subjective interpretations.

```
    [census_A]                                [census_B]
        │                                         │
        └───────────┐             ┌───────────────┘
                    │             │
              [Compare & Score Pairs]
                    │
      [Isolate Matches (e.g., >=3 cols)]
                    │
      [Get Indices of Duplicates in B]
                    │
      [Find Unique Rows in B using ~]
                    │
                    └───────────┐
                                │
              [Concat A + Unique B]
                                │
                     ┌──────────────────┐
                     │ Full Census Data │
                     └──────────────────┘
```

## The Step-by-Step Process

### Prerequisites / Inputs

- **Matching Columns**
    - The choice of which columns to compare is critical. Including stable, discriminating columns (like date of birth) improves accuracy, while noisy columns (like addresses with typos) can reduce it.
- **Similarity Threshold**
    - This is the 'lever' that controls how strict the matching is. A high threshold (e.g., requiring 4+ columns to match) increases precision (fewer false positives) but may miss true matches (lower recall). A low threshold does the opposite.
- **Blocking Strategy**
    - For large datasets, comparing every record is computationally infeasible. Blocking involves pre-sorting records into smaller groups based on a shared attribute (e.g., all people born in the same year) and only comparing pairs within each block.

### The Steps

- **Step 1: Generate & Score Potential Matches**
    - First, generate all possible pairs of records between the two DataFrames (`census_A` and `census_B`). Then, compare values across multiple columns for each pair and calculate a similarity score. This often results in [[Python - Multi-Index DataFrames in Record Linkage|multi-indexed DataFrames]] where the index contains the pairs of original indices.
- **Step 2: Isolate High-Confidence Matches**
    - Apply a threshold to the similarity scores to tighten the search. The context specifies isolating pairs with matches across 3 or more columns. This is a form of [[Python - Filtering Potential Matches by Score|filtering potential matches by score]] to ensure we only consider highly likely duplicates.
- **Step 3: Extract Duplicate Indices**
    - From the high-confidence matches, extract the row indices belonging to the second DataFrame (`census_B`). These are the rows in `census_B` that have a confirmed duplicate in `census_A`. A common way to do this is by [[Python - Accessing Multi-Index Levels with get_level_values()|accessing the multi-index levels]] that correspond to `census_B`.
- **Step 4: Find Non-Duplicated Rows**
    - Create a boolean mask to identify the rows in `census_B` that are *not* duplicates. This is efficiently done by [[Python - Inverting a Boolean Index with the Tilde (~) Operator|inverting the boolean index with the tilde (~) operator]]. This gives us only the new, unique records from `census_B`.
- **Step 5: Link DataFrames for Full Results**
    - Finally, combine the original `census_A` DataFrame with the subset of unique rows from `census_B`. This is typically achieved using [[Python - Concatenating DataFrames with pandas.concat()|DataFrame concatenation]], resulting in a single, comprehensive census DataFrame without redundant entries.

##### Code Translation

```python
import pandas as pd

# --- Setup: Create sample DataFrames ---
census_A = pd.DataFrame({
    'first_name': ['john', 'mary', 'peter', 'susan'],
    'last_name': ['smith', 'jones', 'williams', 'brown'],
    'dob': ['1990-01-15', '1985-05-20', '1992-11-30', '1990-01-15']
})

census_B = pd.DataFrame({
    'first_name': ['jon', 'david', 'mary', 'peter'],
    'last_name': ['smyth', 'miller', 'jones', 'williams'],
    'dob': ['1990-01-15', '1988-03-10', '1985-05-20', '1992-11-30']
})

# --- Step 1 & 2 (Simulated): Assume we've found high-confidence matches ---
# In a real scenario, this would involve a library like `recordlinkage`.
# Here, we manually identify the indices in census_B that are duplicates.
# Mary Jones (index 2) and Peter Williams (index 3) are clear duplicates.
duplicate_indices_in_B = [2, 3]

# --- Step 3: The extracted indices are already here ---
print(f"Extracted duplicate indices from census_B: {duplicate_indices_in_B}\n")

# --- Step 4: Find rows in census_B that are NOT duplicated ---
# Create a boolean mask for all rows in census_B
is_duplicated = census_B.index.isin(duplicate_indices_in_B)

# Use the tilde (~) operator to invert the mask and find unique rows
unique_rows_in_B = census_B[~is_duplicated]
print("Unique rows found in census_B:\n", unique_rows_in_B, "\n")

# --- Step 5: Link both DataFrames for full results ---
full_census = pd.concat([census_A, unique_rows_in_B], ignore_index=True)
print("Final linked DataFrame:\n", full_census)

```

### Deliverables / Outputs

The core idea is to systematically and programmatically piece together a complete picture from fragmented data. We start with two or more datasets that we suspect contain overlapping information but lack a shared key to join them easily. The process, a fundamental task in data cleaning and preparation, moves from a broad search for any potential matches to a narrow, high-confidence selection of true duplicates. By identifying these duplicates in one dataset, we can isolate the truly new information it contains before merging it with the other, preventing redundant entries in the final, unified dataset.

## Context & Tradeoffs

### When to Use This Process

To merge two or more datasets that lack a common, unique identifier by finding and linking records that refer to the same entity, creating a single, deduplicated master dataset.

### Common Pitfalls & Tradeoffs

- **Precision vs. Recall**
    - This is the fundamental trade-off. A highly stringent matching criteria ensures that linked records are almost certainly the same entity (high precision), but you risk failing to link records that are true matches but have minor discrepancies (low recall). A lenient criteria catches more true matches (high recall) but also incorrectly links different entities (low precision).
- **Computational Cost**
    - The number of possible pairs grows quadratically with the size of the datasets. Without efficient strategies like blocking, record linkage can be extremely slow and memory-intensive, making it impractical for big data.
- **Scalability vs. Accuracy**
    - Complex comparison methods (e.g., phonetic algorithms for names, distance metrics for addresses) can improve accuracy but significantly increase computation time. Simpler, exact matching is faster but less robust to data entry errors.

## Connections

```
                      (Parent)
                 Data Integration
                        ▲
                        │
        ┌───────────────┼────────────────────────────┐
        │               │                            │
(Component)      ┌───────────────────────────┐      (Component)
Filtering by Score │  Record Linkage Workflow  │  Inverting an Index (~)
                 └───────────────────────────┘
                        │
             ┌──────────┴──────────┐
             │                     │
    Multi-Indexing       DataFrame Concatenation
```


- The process of identifying duplicates often results in [[Python - Multi-Index DataFrames in Record Linkage|multi-indexed DataFrames]], which are essential for managing the paired records before making a final decision.
- A critical step in this workflow is [[Python - Filtering Potential Matches by Score|filtering potential matches by a similarity score]] to separate high-confidence links from ambiguous ones.
- Isolating unique records is efficiently handled by [[Python - Inverting a Boolean Index with the Tilde (~) Operator|inverting a boolean mask with the tilde operator]], a common and powerful pandas idiom.
- The final step of combining the original data with the newly identified unique records is accomplished through [[Python - Concatenating DataFrames with pandas.concat()|DataFrame concatenation]].
- This entire workflow is a practical application of [[Fundamental - Data Engineering|data engineering]] principles focused on creating clean, usable datasets.

## Deeper Questions

- How would you explain the business impact of the precision/recall trade-off to a marketing team? For instance, what are the risks of being too aggressive (high recall) versus too conservative (high precision) when creating a unified customer mailing list?
- Imagine these census DataFrames grow from thousands to billions of records. The current pairwise comparison approach would crash due to memory constraints. How would you re-architect this workflow to handle the scale, and what new infrastructure might be required?
- What if you were tasked with linking two datasets where there were no reliable string-based columns (like name or address), only numerical data (e.g., transaction amounts, timestamps, sensor readings)? How would you define 'similarity' and adapt this workflow?