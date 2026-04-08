---
tags: 
  - major_core
  - python
  - data_deduplication
  - entity_resolution
  - fuzzy_matching
  - data_cleaning
  - master_data_management
  - concept
source: 
  - "[[Cleaning Data in Python]]"
related: 
  - "[[Fundamental - Data Engineering]]"
  - "[[Python - Levenshtein Distance]]"
  - "[[Python - thefuzz Package]]"
  - "[[Python - fuzz.WRatio Function]]"
  - "[[Python - process.extract Function]]"
  - "[[Python - Cleaning Categorical Data with String Matching]]"
  - "[[Fundamental - Feature Engineering]]"
  - "[[Fundamental - Natural Language Processing]]"
  - "[[Python - Strings]]"
  - "[[Python - Minimum Edit Distance]]"
  - "[[Python - Minimum Edit Distance & Similarity Score Relationship]]"
  - "[[DSA - Big O Notation]]"
  - "[[Fundamental - SQL]]"
---
# Major Core: Record Linkage

## Summary

> Record linkage, also known as entity resolution or data deduplication, is the process of identifying and merging records that refer to the same real-world entity across different data sources. This is especially challenging when a clean, unique identifier is missing, forcing the process to rely on 'fuzzy' matching of attributes like names or addresses using string similarity techniques.

**Why This Matters:** Record linkage is crucial for creating a single, reliable source of truth from multiple, messy datasets, which is the foundation for accurate analytics and machine learning.

_Analogy:_ _Imagine a detective investigating a case with witness reports from three different people. One witness saw 'Mr. Robert Smith' leaving the scene. Another saw a 'Robbie Smyth' nearby. A third report mentions a 'Bob Smith' in the same area. The detective's job is to link these records, using clues like physical description, time, and location, to determine if they all refer to the same person. Each witness report is a data source, and the slightly different names are the fuzzy duplicate values._

The detective pieces together these disparate reports to form a single, coherent profile of the suspect. Similarly, record linkage combines fuzzy data entries into a single, clean master record. 

**Where it breaks down:** A detective can use intuition, context, and seek out new information to confirm a link. Automated record linkage is confined to the data it's given and relies purely on quantifiable algorithms like [[Python - Levenshtein Distance|Levenshtein distance]] and statistical probabilities, without real-world understanding.

```
+-----------------+      +-----------------+
|  Data Source A  |      |  Data Source B  |
| "John Smith"    |      | "J. Smith"      |
| "Apple Inc."    |      | "Apple"         |
+-----------------+      +-----------------+
        │                      │
        └─────────┐    ┌───────┘
                  ▼    ▼
      [ String Similarity Engine ]
      (e.g., Levenshtein, WRatio)
                  │
                  ▼
+-------------------------------------+
|         Linked Master Data          |
| ID | Name         | Source A | Src B |
|----|--------------|----------|-------|
| 1  | John Smith   |    ✓     |   ✓   |
| 2  | Apple Inc.   |    ✓     |   ✓   |
+-------------------------------------+
```

## Details

Record linkage is a core task in data cleaning and integration, a key part of [[Fundamental - Data Engineering|data engineering]]. It directly addresses the problem of joining data sources that contain 'fuzzy duplicates'—entries that represent the same entity but have slightly different string representations (e.g., 'Apple Inc.' vs. 'Apple'). To solve this, it employs string similarity metrics to score how alike two strings are, allowing it to identify and merge these duplicates into a final, clean DataFrame. The two main approaches are **Deterministic Record Linkage** and **Probabilistic Record Linkage**.

#### Primary Goal

To create a clean, deduplicated master dataset by intelligently joining disparate data sources that lack a common, clean identifier.

#### Mechanism

- **How it Works:** The process generally follows a multi-step pipeline:
    1. **Preprocessing:** Standardize the data in relevant columns. This includes actions like converting text to lowercase, removing punctuation, and stripping whitespace.
    2. **Blocking/Indexing:** To avoid the computationally expensive task of comparing every record to every other record (an O(n^2) problem), records are grouped into 'blocks' based on a shared characteristic (e.g., the first three letters of a last name). Comparisons are then only made within these blocks.
    3. **Comparison:** For each pair of records within a block, calculate a similarity score for relevant fields. This is where algorithms like [[Python - Levenshtein Distance|Levenshtein distance]] or more advanced ratios from libraries like [[Python - thefuzz Package|thefuzz]] are used.
    4. **Classification/Matching:** A decision is made based on the comparison scores. A simple approach uses a threshold: if the score is above 90, it's a match. More complex methods use statistical models to weigh different fields and calculate a match probability.
    5. **Merging:** Combine the information from matched records into a single, consolidated 'golden' record.
- **Deterministic Linkage:**
    - This method uses a set of fixed, rule-based criteria to declare a match. It's fast and simple but brittle.
    - *Example: Two records are considered a match if and only if (FirstName matches exactly) AND (LastName matches exactly) AND (DateOfBirth matches exactly). A single typo in any field would cause the match to fail.*
- **Probabilistic Linkage (Fuzzy Matching):**
    - This method uses similarity scores and statistical models to calculate the probability of a match. It is more robust to errors and variations in the data.
    - *Example: A weighted score is calculated based on the similarity of multiple fields. A 95% match on name (using [[Python - fuzz.WRatio Function|fuzz.WRatio]]) and an 80% match on address might result in a high overall probability, classifying the pair as a match even if neither field is identical.*

nothing to fill here

 [[Code - Record Linkage Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Similarity Threshold:**
    - The cutoff score for considering two strings a match. A low threshold increases recall (finds more potential matches) but risks more false positives. A high threshold increases precision but may miss valid, slightly different matches.
- **Blocking Key:**
    - The choice of which column(s) to use for initial grouping. A poor blocking key can either miss potential matches (if too specific) or create blocks that are too large to process efficiently (if too general).
- **Choice of Similarity Metric:**
    - Different metrics are suited for different types of string variations. The relationship between [[Python - Minimum Edit Distance & Similarity Score Relationship|minimum edit distance and similarity]] is key. Simple [[Python - Levenshtein Distance|Levenshtein distance]] is good for typos, while more complex functions like [[Python - fuzz.WRatio Function|fuzz.WRatio]] can handle out-of-order words and other variations.

#### Core Trade-offs

- **Computational Complexity vs. Accuracy:**
    - Comparing every record to every other is an O(n^2) problem, which is infeasible for large datasets. Effective blocking is essential for scalability but adds complexity and risks missing matches that fall into different blocks.
- **False Positives vs. False Negatives:**
    - Setting the match threshold involves a direct trade-off. Incorrectly merging two distinct entities (a false positive) can corrupt data, while failing to merge two identical ones (a false negative) leaves duplicates. The business context determines which error is more costly.
- **Simplicity vs. Robustness:**
    - Deterministic linkage is simple to implement and explain but fails on messy, real-world data. Probabilistic linkage is far more robust but requires more tuning, computational resources, and statistical understanding.

## Connections

```
                  (Parent)
              Data Engineering
                       ▲
                       │
       ┌───────────────┼────────────────────────────┐
       │               │                            │
(Relies On)   ┌───────────────────────────┐     (Application)
String Similarity │      Record Linkage       │  Cleaning Categorical Data
              └───────────────────────────┘
                         │
              ┌──────────┴──────────┐
              │                     │
    Deterministic Linkage   Probabilistic Linkage
```

### Parent Concept

Record linkage is a fundamental process within [[Fundamental - Data Engineering|data engineering]], focused on data integration and quality.

### Child Concepts

- A primary approach is **deterministic record linkage**, which uses strict, rule-based criteria to identify matches.
- A more flexible approach is **probabilistic record linkage** (or fuzzy matching), which uses statistical methods and string similarity scores to determine the likelihood of a match.

### Related Concepts 

- The core mechanism of probabilistic record linkage is built upon string similarity metrics like [[Python - Levenshtein Distance|Levenshtein distance]], which quantifies the difference between two strings.
- Practical implementation often involves libraries like [[Python - thefuzz Package|thefuzz]], which provides functions like [[Python - fuzz.WRatio Function|WRatio]] to handle complex string variations.
- A common application of these techniques is in [[Python - Cleaning Categorical Data with String Matching|cleaning categorical data]], where fuzzy matching helps consolidate inconsistent labels.
- This process is closely related to [[Fundamental - Feature Engineering|feature engineering]], as creating a clean, unified entity ID is a critical step in preparing data for modeling.
## Questions

- You're tasked with linking customer records from a newly acquired company. The marketing team wants a complete list ASAP for a new campaign, but the legal team warns that incorrectly merging records (a false positive) could lead to a major privacy breach. How do you set your matching threshold and what process would you use to balance the marketing team's need for speed and recall with the legal team's requirement for precision?
- Imagine you need to implement a near real-time record linkage system for an e-commerce platform that ingests millions of new user sign-ups and guest checkouts daily. How would you design the architecture to avoid the O(n^2) comparison problem and ensure the system can scale without significant latency?
- What if you had no access to string similarity algorithms? Describe a completely different, non-text-based approach you could use to probabilistically link records for individuals across datasets, assuming you only had access to their anonymized behavioral data (e.g., timestamps of website visits, purchase categories, locations).
