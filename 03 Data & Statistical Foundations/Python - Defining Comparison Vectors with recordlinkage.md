---
tags: 
  - core
  - python
  - recordlinkage
  - comparison_rules
  - exact_matching
  - fuzzy_matching
  - string_similarity
  - concept
source: 
  - "[[Cleaning Data in Python]]"
related: 
  - "[[Python - Record Linkage]]"
  - "[[Python - Record Linkage Workflow]]"
  - "[[Python - recordlinkage Package]]"
  - "[[Python - Generating Candidate Pairs in Record Linkage]]"
  - "[[Python - The recordlinkage.Compare Object]]"
  - "[[Python - Computing Comparison Scores with recordlinkage]]"
  - "[[Python - Filtering Potential Matches from Comparison Scores]]"
  - "[[Python - Blocking in Record Linkage]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[Fundamental - Natural Language Processing]]"
  - "[[Python - Strings]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - Data Types]]"
---
# Core: Defining Comparison Rules in recordlinkage

## Summary

>In the `recordlinkage` library, comparison rules are the specific instructions that define how to measure the similarity between columns of two datasets. These rules are added to a `recordlinkage.Compare` object, which acts as a container. The library provides different methods for different types of data, such as `.exact()` for columns that must match perfectly and `.string()` for columns that can have minor variations or typos.

**Why This Matters:** This step is the heart of record linkage, as it translates raw data attributes into meaningful similarity scores, which are the foundation for deciding if two records represent the same entity.

_Analogy:_ _Think of the `Compare` object as a detective's evidence comparison checklist. For each piece of evidence (a data column), the detective specifies a comparison method. For a fingerprint (like a unique ID or date of birth), the rule is 'exact match only' (`.exact()`). For a handwritten note (like a name or address), the rule is 'check for similarity, allowing for messy handwriting' (`.string()`), with a confidence threshold for how close it needs to be._

**Where it breaks down:** A detective uses intuition, context, and external knowledge to weigh evidence. The `Compare` object is purely systematic and quantitative; it follows the defined rules precisely without understanding the real-world context of the data. It can't, for example, know that 'Bill' is a common nickname for 'William' unless explicitly told through a more complex rule.

```
┌──────────────────────────┐
│ recordlinkage.Compare()  │  (Empty Checklist)
└────────────┬─────────────┘
             │
             ├─ Add Rule 1: .exact('state', ...)
             ├─ Add Rule 2: .exact('dob', ...)
             ├─ Add Rule 3: .string('name', threshold=0.85, ...)
             └─ Add Rule 4: .string('address', threshold=0.85, ...)
             │
             ▼
┌──────────────────────────┐
│  Configured `Compare`    │  (Completed Checklist)
│         Object           │
└──────────────────────────┘
```

## Details

After generating a set of potential matches, the next crucial step in the [[Python - Record Linkage Workflow|record linkage workflow]] is to systematically evaluate how similar these candidate pairs are across various attributes. The `recordlinkage.Compare` object is the primary tool for this task. You instantiate this object and then 'attach' rules to it, one for each column you want to compare. This process allows for a flexible and tailored comparison strategy, using the most appropriate method for each data type. The two most common methods are **exact matching** and **fuzzy string matching**.

#### Primary Goal

To create a configurable set of instructions that specifies exactly how to calculate a similarity score for each important attribute (column) in the candidate record pairs.

#### Mechanism

- **Step 1: Instantiate the `Compare` Object**
    - First, you create an empty `Compare` object from the `recordlinkage` library. This object will hold all the comparison rules you define.
- **Step 2: Define Exact Match Rules**
    - For columns where the values must be identical to be considered a match (e.g., dates, state codes, unique identifiers), you use the `.exact()` method. You provide the column name and a `label` for the output column.
- **Step 3: Define Fuzzy String Match Rules**
    - For columns that may contain typos, abbreviations, or other variations (e.g., names, addresses), you use the `.string()` method. This method requires the column name, a similarity `threshold` between 0 and 1, and a `label`.

##### Code Translation

```python
import recordlinkage
import pandas as pd

# Assume census_A, census_B, and pairs are pre-existing DataFrames/MultiIndex
# pairs = indexer.index(census_A, census_B)

# --- Step 1: Instantiate the Compare Object ---
# Create a Compare object to store our rules.
compare_cl = recordlinkage.Compare()

# --- Step 2: Define Exact Match Rules ---
# For 'date_of_birth' and 'state', the values must be identical.
compare_cl.exact('date_of_birth', 'date_of_birth', label='date_of_birth')
compare_cl.exact('state', 'state', label='state')

# --- Step 3: Define Fuzzy String Match Rules ---
# For 'surname' and 'address_1', allow for small differences.
# A match is scored if the string similarity is 85% or higher.
compare_cl.string('surname', 'surname', threshold=0.85, label='surname')
compare_cl.string('address_1', 'address_1', threshold=0.85, label='address_1')

# The 'compare_cl' object is now configured and ready to be used
# to compute similarity scores for the candidate pairs.
# potential_matches = compare_cl.compute(pairs, census_A, census_B)

print(compare_cl.vectors)
```

 [[Code - Defining Comparison Rules in recordlinkage Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **For `.exact()`:**
    - `column_name`: The name of the column to compare in both DataFrames.
    - `label`: The name for the new column in the output DataFrame that will store the comparison result (1 for a match, 0 for a non-match).
- **For `.string()`:**
    - `column_name`: The name of the column to compare.
    - `threshold`: A float between 0.0 and 1.0. The comparison will result in a score of 1 if the string similarity is above this value, and 0 otherwise.
    - `label`: The name for the new output column.

#### Core Trade-offs

- **Exact Matching (`.exact()`)**
    - **Pro:** It is computationally fast and unambiguous. It's perfect for standardized codes, dates, or IDs.
    - **Con:** It is extremely brittle. A single typo, a difference in capitalization, or a formatting change (e.g., 'NY' vs 'N.Y.') will result in a non-match (score of 0).
- **Fuzzy String Matching (`.string()`)**
    - **Pro:** It is robust to minor errors, typos, and variations in string data, making it essential for names and addresses.
    - **Con:** It is significantly more computationally expensive than exact matching. The choice of `threshold` is critical and non-trivial; a threshold that is too low will create many false positives, while one that is too high will miss valid matches (false negatives).

## Connections

```
                      (Parent)
            The recordlinkage.Compare Object
                         ▲
                         │
           ┌─────────────┼───────────────────────────┐
           │             │                           │
(Part of)         ┌──────────────────────────────────┐     (Leads to)
Record Linkage    │ Defining Comparison Rules in     │     Computing
Workflow          │ recordlinkage                    │     Comparison Scores
                  └──────────────────────────────────┘
```

### Parent Concept

This concept is a direct application of the [[Python - The recordlinkage.Compare Object|recordlinkage.Compare object]], which serves as the container for these defined rules.

### Child Concepts



### Related Concepts 

- Defining rules is the core activity within the broader step of [[Python - Comparing Candidate Pairs in Record Linkage|comparing candidate pairs]].
- The configured `Compare` object is subsequently used for [[Python - Computing Comparison Scores with recordlinkage|computing comparison scores]], which generates the feature vectors for classification.
- This stage directly follows [[Python - Generating Candidate Pairs in Record Linkage|generating candidate pairs]] in the standard [[Python - Record Linkage Workflow|record linkage workflow]].
## Questions

- When comparing customer names, you find many instances of formal names ('William') vs. nicknames ('Bill'). How would you adjust your comparison strategy and `threshold` to handle this, and what is the business risk of setting the threshold too high versus too low in terms of customer duplication?
- Imagine you have 50 million candidate pairs and need to perform fuzzy string comparisons on 5 different address fields. What performance bottlenecks would you anticipate, and how would you architect this comparison step to run efficiently, potentially using parallel or distributed computing?
- What if you were forbidden from using the built-in `.string()` method? How would you design a custom comparison function from scratch to handle complex address variations, such as 'Street' vs. 'St.', 'Apartment' vs. 'Apt' vs. '#', and differing word order?