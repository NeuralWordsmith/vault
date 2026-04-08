---
tags: 
  - core
  - python
  - comparison_vectors
  - feature_engineering
  - similarity_metrics
  - record_linkage
  - data_matching
  - concept
source: 
  - "[[Cleaning Data in Python]]"
related: 
  - "[[Python - Record Linkage]]"
  - "[[Python - Record Linkage Workflow]]"
  - "[[Python - recordlinkage Package]]"
  - "[[Python - Generating Candidate Pairs in Record Linkage]]"
  - "[[Python - Comparing Candidate Pairs in Record Linkage]]"
  - "[[Python - Defining Comparison Vectors with recordlinkage]]"
  - "[[Python - Computing Comparison Scores with recordlinkage]]"
  - "[[Python - Filtering Potential Matches from Comparison Scores]]"
  - "[[Python - The recordlinkage.Index Object]]"
  - "[[Python - Blocking in Record Linkage]]"
  - "[[Fundamental - Feature Engineering]]"
  - "[[DSA - Searching Algorithms]]"
  - "[[Python - Strings]]"
  - "[[Python - Data Types]]"
  - "[[Python - Packages]]"
---
# Core: The recordlinkage.Compare Object

## Summary

>The `recordlinkage.Compare` object is a central component in the [[Python - recordlinkage Package|recordlinkage library]] that acts as a container for defining the specific comparison rules, or 'vectors', for each attribute of the records. After [[Python - Generating Candidate Pairs in Record Linkage|generating candidate pairs]], this object is used to specify *how* to compare columns—whether through exact matching, string similarity, numeric similarity, or other methods. It essentially builds a blueprint for the comparison process before the actual scores are calculated.

**Why This Matters:** This object is the core engine for defining the 'rules of similarity' in a record linkage task, directly controlling how potential matches are evaluated and scored.

_Analogy:_ _Think of the `recordlinkage.Compare` object as a customizable scorecard for a talent show judge. Before the contestants (record pairs) perform, the judge creates a scorecard with different categories (record attributes like 'name', 'date_of_birth'). For each category, the judge decides on the scoring criteria: 'Singing' might be judged on a complex scale (like string similarity), while 'Punctuality' is a simple yes/no (like an exact match). The `Compare` object is this blank scorecard, and methods like `.exact()` and `.string()` are the act of adding these specific scoring rules to it._

**Where it breaks down:** The analogy implies a human judge making subjective decisions. The `Compare` object, however, applies its rules algorithmically and consistently to every single pair without any subjectivity. It only defines the rules; the actual scoring is a separate, deterministic computation step.

```
    +---------------------------+
    | recordlinkage.Compare()   |  <-- An empty container
    | (compare_cl)              |
    +---------------------------+
                 |
                 | .exact('dob', 'dob', label='dob')
                 | .string('name', 'name', threshold=0.85)
                 | ...
                 ▼
    +---------------------------+
    |   Configured Compare      |
    |   Object with Rules:      |
    |   - dob (exact)           |
    |   - name (string > 0.85)  |
    +---------------------------+
                 |
                 | .compute(pairs, df_A, df_B)
                 ▼
    +---------------------------+
    |   Comparison Vector       |  <-- Output DataFrame
    |   (Feature Matrix)        |
    +---------------------------+
```

## Details

The `recordlinkage.Compare` object is the heart of the comparison phase in the [[Python - Record Linkage Workflow|record linkage workflow]]. Its purpose is to provide a flexible and organized way to define multiple comparison criteria across different columns of your datasets. Instead of writing complex custom functions for each comparison, you instantiate this object and then chain methods to it, each specifying a comparison for a particular feature. This approach separates the *definition* of the comparison logic from its *execution*, leading to cleaner and more readable code. The primary methods used are **exact**, **string**, **numeric**, and **date** comparisons.

#### Primary Goal

To create a structured and reusable blueprint of comparison rules that will be applied to every candidate record pair to generate a similarity score for each feature.

#### Mechanism

- **Step 1: Instantiate the Compare Object**
    - First, you create an empty `Compare` object from the `recordlinkage` library. This object will act as a container to hold all the comparison rules you subsequently define.
- **Step 2: Define Comparison Vectors**
    - Use the object's methods (`.exact()`, `.string()`, etc.) to add comparison rules for specific columns. Each method call adds a 'comparison vector' to the object. You must specify the columns to compare from each DataFrame and should assign a `label` for clarity in the output.
- **Step 3: Specify Comparison Parameters**
    - For methods that are not simple exact matches, like `.string()`, you can provide additional parameters. For example, the `threshold` parameter sets the minimum similarity score for a pair to be considered a potential match for that specific feature.

##### Code Translation

```python
import recordlinkage
import pandas as pd

# Assume census_A and census_B are pandas DataFrames
# and 'pairs' is a MultiIndex of candidate links
# from an indexer object.
# For demonstration:
data_a = {'id': [1, 2], 'surname': ['smith', 'jones'], 'date_of_birth': ['1990-05-15', '1985-11-22']}
data_b = {'id': [101, 102], 'surname': ['smyth', 'jones'], 'date_of_birth': ['1990-05-15', '1988-11-22']}
census_A = pd.DataFrame(data_a).set_index('id')
census_B = pd.DataFrame(data_b).set_index('id')
indexer = recordlinkage.Index()
indexer.block('date_of_birth')
pairs = indexer.index(census_A, census_B)


# --- Step 1: Instantiate the Compare Object ---
# Create an empty container for our comparison rules.
compare_cl = recordlinkage.Compare()

# --- Step 2 & 3: Define Comparison Vectors and Parameters ---
# Add a rule for an exact match on the 'date_of_birth' column.
compare_cl.exact('date_of_birth', 'date_of_birth', label='date_of_birth')

# Add a rule for string similarity on the 'surname' column.
# Only pairs with a Jaro-Winkler similarity > 0.85 will get a score of 1.
compare_cl.string('surname', 'surname', threshold=0.85, label='surname')

# The 'compare_cl' object is now configured and ready to be used
# in the compute step to generate comparison vectors.
print("Configured Comparison Vectors:")
print(compare_cl.vectors)
```

 [[Code - The recordlinkage.Compare Object Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Comparison Methods (`.exact`, `.string`, `.numeric`, etc.)**
    - The choice of method is the most fundamental parameter. `.exact()` is fast but strict. `.string()` is more flexible for noisy text data but computationally more expensive. The method dictates the underlying algorithm used for comparison.
- **`label`**
    - This string parameter assigns a name to the output column in the resulting comparison vector DataFrame. It's crucial for readability and for later steps like classification. If not provided, a default name is generated.
- **`threshold`**
    - Used in similarity-based methods (like `.string()` or `.numeric()`). It sets a cutoff point. The comparison result is binary (1 if similarity is above the threshold, 0 otherwise). A higher threshold is stricter, leading to fewer matches.
- **`method` (within `.string()`)**
    - The `.string()` comparison allows you to specify the string similarity algorithm to use, such as 'jaro', 'jarowinkler' (default), 'levenshtein', or 'damerau_levenshtein'.

#### Core Trade-offs

- **Performance vs. Accuracy**
    - Simple comparisons like `.exact()` are extremely fast but will miss matches with minor variations (e.g., 'Smith' vs 'Smyth'). Complex methods like `.string()` can catch these variations but require significantly more computation time, especially on large sets of candidate pairs.
- **Strictness vs. Recall**
    - Setting a high `threshold` for similarity comparisons increases precision (fewer false positives) but can lower recall (more false negatives). A lower threshold does the opposite. The right balance depends on the cost of a false match versus a missed match in the specific application.
- **Readability vs. Complexity**
    - The `Compare` object promotes readable code by chaining clear method calls. However, building a complex set of rules with many different comparison vectors can still become hard to manage and debug without clear `label`ing and documentation.

## Connections

```
                               (Parent)
                 Comparing Candidate Pairs in Record Linkage
                                  ▲
                                  │
    ┌─────────────────────────────┼──────────────────────────────┐
    │                             │                              │
(Precedes)             ┌───────────────────────────┐          (Follows)
Generating Candidate   │ recordlinkage.Compare()   │          Computing Comparison
Pairs                  └───────────────────────────┘          Scores
                                  │
                                  ▼
                             (Produces)
                      Defining Comparison Vectors
```

### Parent Concept

The `recordlinkage.Compare` object is a key tool used within the broader process of [[Python - Comparing Candidate Pairs in Record Linkage|comparing candidate pairs in record linkage]].

### Child Concepts



### Related Concepts 

- The `Compare` object is instantiated after [[Python - Generating Candidate Pairs in Record Linkage|candidate pairs have been generated]], typically using an `Index` object.
- The rules defined in the `Compare` object are used to create the [[Python - Defining Comparison Vectors with recordlinkage|comparison vectors]], which form the feature matrix for the final classification.
- The configured `Compare` object is passed to the `.compute()` method, which is the core of [[Python - Computing Comparison Scores with recordlinkage|computing comparison scores]].
## Questions

- You're linking customer records from two systems. One system has high-quality address data, but the other has frequent typos. How would you configure the `recordlinkage.Compare` object to balance the high cost of a false match (merging two different customers) with the need to catch legitimate matches despite the typos? Justify your choice of methods and thresholds.
- Imagine your record linkage pipeline runs daily on millions of new records. The string similarity comparisons on names and addresses are becoming a major performance bottleneck. How would you redesign the comparison step, potentially altering your use of the `Compare` object or integrating other techniques, to improve scalability without significantly degrading match quality?
- What if the `recordlinkage.Compare` object was limited to *only* the `.exact()` method? How would you preprocess your data (e.g., using techniques from [[Fundamental - Feature Engineering|feature engineering]] or [[Fundamental - Natural Language Processing|NLP]]) to still achieve high-quality fuzzy matching on names and addresses before they even reach the comparison stage?