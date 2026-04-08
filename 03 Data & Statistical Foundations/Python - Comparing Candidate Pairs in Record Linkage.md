---
tags: 
  - core
  - python
  - feature engineering
  - similarity scoring
  - comparison vectors
  - data matching
  - deduplication
  - concept
source: 
  - "[[Cleaning Data in Python]]"
related: 
  - "[[Python - Record Linkage]]"
  - "[[Python - Record Linkage Workflow]]"
  - "[[Python - recordlinkage Package]]"
  - "[[Python - Generating Candidate Pairs in Record Linkage]]"
  - "[[Python - Blocking in Record Linkage]]"
  - "[[Python - The recordlinkage.Index Object]]"
  - "[[Python - The recordlinkage.Compare Object]]"
  - "[[Python - Defining Comparison Vectors with recordlinkage]]"
  - "[[Python - Computing Comparison Scores with recordlinkage]]"
  - "[[Python - Filtering Potential Matches from Comparison Scores]]"
  - "[[Fundamental - Feature Engineering]]"
  - "[[DSA - Big O Notation]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Fundamental - Data Engineering]]"
---
# Core: Comparing Candidate Pairs in Record Linkage

## Summary

>After [[Python - Generating Candidate Pairs in Record Linkage|generating candidate pairs]], the next crucial step is to systematically compare them across various attributes. This process involves three key actions: creating a [[Python - The recordlinkage.Compare Object|Compare object]] to manage the rules, [[Python - Defining Comparison Vectors with recordlinkage|defining a set of comparison rules (vectors)]] for each attribute, and finally [[Python - Computing Comparison Scores with recordlinkage|computing the similarity scores]] for all pairs to create a feature matrix.

**Why This Matters:** This step transforms abstract pairs of records into quantifiable similarity scores, which is the essential foundation for deciding which records represent the same entity.

_Analogy:_ _Imagine a detective comparing witness statements about a suspect. The detective has a checklist of key features: height, hair color, clothing, and car model. This checklist is the `Compare` object. For each feature, the detective has a rule: 'height' must be within 2 inches (a numeric comparison), 'hair color' must be an exact match, and 'clothing' can be a similar color (a fuzzy string comparison). These rules are the comparison vectors. The detective goes through each pair of statements, fills out the checklist, and creates a final 'similarity report' for each pair. This report, with a score for each feature, is the resulting DataFrame of comparison scores._

**Where it breaks down:** A detective can use intuition and context—they might know one witness has poor eyesight or that a certain car model looks very similar to another. The computational comparison process is purely rule-based and lacks this qualitative judgment. It strictly follows the defined vectors without understanding external context.

```
+-----------------+     +--------------------------------+     +---------------------+
| Candidate Pairs | --> |   recordlinkage.Compare Object   | --> | Similarity Scores   |
| (MultiIndex)    |     |   - .exact('date_of_birth')    |     | (Feature Vectors)   |
+-----------------+     |   - .string('surname', thr=0.85) |     +---------------------+
                      +--------------------------------+
```

## Details

Once we have a list of potential matches (candidate pairs), we can't just assume they're correct. We need a structured way to evaluate *how similar* each pair is on a field-by-field basis. This is the core of the comparison phase in [[Python - Record Linkage|record linkage]]. It involves three main actions: initializing a comparison tool, specifying exactly *what* to compare and *how* (e.g., exact match for dates, fuzzy match for names), and then executing the comparison to generate a score for every pair on every specified attribute.

#### Primary Goal

To systematically calculate similarity scores for each candidate pair across multiple attributes, creating a feature vector that quantifies their likeness.

#### Mechanism

- **Step 1: Initialize the Comparison Object**
    - First, create an instance of the `recordlinkage.Compare` class. This object acts as a container that will hold all the comparison rules (vectors) you define.
- **Step 2: Define Comparison Vectors**
    - Add specific comparison rules to the `Compare` object. Each rule targets one or more columns and defines how they should be compared.
    - Common methods include:
        - `.exact()` for columns that must match perfectly (e.g., 'date_of_birth', 'state').
        - `.string()` for columns that can have minor variations or typos (e.g., 'surname', 'address_1'). This method requires a similarity algorithm and a `threshold`.
        - `.numeric()` for comparing numerical values within a certain tolerance.
- **Step 3: Compute the Scores**
    - Call the `.compute()` method on the `Compare` object. You must pass the candidate pairs (a `MultiIndex` object) and the original DataFrames. This executes all the defined rules against every pair and returns a new DataFrame where rows are candidate pairs and columns are the comparison vectors, filled with similarity scores (typically between 0.0 and 1.0).

##### Code Translation

```python
import recordlinkage
import pandas as pd

# Assume census_A, census_B are pandas DataFrames
# Assume 'pairs' is a MultiIndex of candidate pairs from an indexer
# pairs = indexer.index(census_A, census_B)

# --- Step 1: Initialize the Comparison Object ---
# Create a Compare object to hold the comparison rules.
compare_cl = recordlinkage.Compare()

# --- Step 2: Define Comparison Vectors ---
# Rule 1: Exact match for 'date_of_birth'
compare_cl.exact('date_of_birth', 'date_of_birth', label='date_of_birth')

# Rule 2: Exact match for 'state'
compare_cl.exact('state', 'state', label='state')

# Rule 3: String similarity for 'surname' with a threshold of 0.85
compare_cl.string('surname', 'surname', threshold=0.85, label='surname')

# Rule 4: String similarity for 'address_1' with a threshold of 0.85
compare_cl.string('address_1', 'address_1', threshold=0.85, label='address_1')

# --- Step 3: Compute the Scores ---
# Execute the comparisons for all pairs and get a DataFrame of scores.
potential_matches = compare_cl.compute(pairs, census_A, census_B)

# The 'potential_matches' DataFrame now contains a similarity score (0 or 1 for exact, 0-1 for string)
# for each feature vector for each candidate pair.
print(potential_matches.head())
```

 [[Code - Comparing Candidate Pairs in Record Linkage Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Comparison Method**
    - The choice of method (`.exact()`, `.string()`, `.numeric()`, etc.) is the most critical parameter. It dictates the fundamental logic used for comparing the values in a column.
- **`threshold` (for fuzzy matching)**
    - In methods like `.string()`, this float (from 0.0 to 1.0) determines the minimum similarity score required to be considered a partial match. A higher threshold is stricter and results in fewer matches.
- **`label`**
    - This string parameter assigns a column name in the output DataFrame of scores. Using clear labels is crucial for making the results interpretable in the subsequent classification step.

#### Core Trade-offs

- **Computational Cost vs. Granularity**
    - Adding more comparison vectors provides a richer, more detailed feature set for classification, but it significantly increases computation time, as each vector's logic is executed for every single candidate pair.
- **Rule Complexity vs. Accuracy**
    - Simple rules like `.exact()` are fast and computationally cheap but may miss valid matches that have minor typos (false negatives). Complex rules like `.string()` can catch these matches but risk introducing incorrect matches if the threshold is too lenient (false positives).
- **Threshold Tuning**
    - Finding the right `threshold` for fuzzy comparisons is a classic trade-off. A threshold that is too high will cause you to miss legitimate matches (false negatives). A threshold that is too low will incorrectly group dissimilar records (false positives).

## Connections

```
                      (Parent)
             Record Linkage Workflow
                       ▲
                       │
    ┌──────────────────┼──────────────────┐
    │                  │                  │
(Preceded by) ┌──────────────────────────────────────────┐ (Followed by)
Generating    │  Comparing Candidate Pairs in Record Linkage │ Filtering
Pairs         └──────────────────────────────────────────┘ Matches
                           │
             ┌─────────────┴─────────────┐
             │                           │
    Defining Comparison Vectors   Computing Scores
```

### Parent Concept

This process is a fundamental step within the broader [[Python - Record Linkage Workflow|record linkage workflow]].

### Child Concepts

- The process begins by instantiating [[Python - The recordlinkage.Compare Object|the `recordlinkage.Compare` object]], which serves as the container for all comparison logic.
- The core of the configuration involves [[Python - Defining Comparison Vectors with recordlinkage|defining comparison vectors]], which are the specific rules for how to compare each column.
- The final action is [[Python - Computing Comparison Scores with recordlinkage|computing the comparison scores]], which executes the defined vectors against the candidate pairs.

### Related Concepts 

- This comparison stage directly follows the process of [[Python - Generating Candidate Pairs in Record Linkage|generating candidate pairs]], using the output of that step as its primary input.
- The output of the comparison, a DataFrame of scores, is the input for the next step, which involves [[Python - Filtering Potential Matches from Comparison Scores|classifying or filtering potential matches]] to make a final decision.
- The entire process is facilitated by the [[Python - recordlinkage Package|`recordlinkage` package]], which provides the necessary tools like the `Compare` object and its methods.
## Questions

- You're linking a customer database with a marketing leads list. The business wants to maximize outreach but avoid annoying existing customers with duplicate introductory emails. How would you tune the comparison thresholds for 'name' and 'email' fields to balance this trade-off, and how would you explain the risk of false positives (annoying customers) vs. false negatives (missed leads) to the marketing team?
- Imagine you have 100 million candidate pairs and 15 comparison vectors. The `.compute()` step is taking days to run. How would you re-architect this comparison pipeline for scalability? Would you use distributed computing like Spark, pre-calculate certain features, or change the blocking strategy, and why?
- What if you couldn't define explicit comparison rules (like `.exact` or `.string`)? How could you use an unsupervised machine learning approach, like embedding models (e.g., Word2Vec for names, or a more complex model for entire records), to generate a single, holistic similarity score for each pair without feature-by-feature comparison?