---
tags: 
  - process
  - python
  - data_cleaning
  - fuzzy_matching
  - data_wrangling
  - string_standardization
  - categorical_data
  - concept
source: 
  - "[[Cleaning Data in Python]]"
related: 
  - "[[Python - thefuzz Package]]"
  - "[[Python - process.extract Function]]"
  - "[[Python - Levenshtein Distance]]"
  - "[[Python - Minimum Edit Distance]]"
  - "[[Python - Record Linkage]]"
  - "[[Python - fuzz.WRatio Function]]"
  - "[[Python - Minimum Edit Distance & Similarity Score Relationship]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[Fundamental - Feature Engineering]]"
  - "[[Python - Strings]]"
  - "[[Python - for Loop]]"
  - "[[Python - Conditional Statements]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Lists]]"
---
# Process: Collapsing Categories with String Matching

**Why This Matters:** This technique is essential for cleaning messy, real-world categorical data, which enables accurate analysis and prevents fragmented reporting caused by simple typos.
## Goal & Analogy

> **Goal:** Collapsing categories is a data cleaning process used to standardize categorical data that contains typos, variations, or free-text entries. It works by comparing each messy entry against a list of correct, canonical categories and, if the similarity is high enough, replacing the incorrect entry with the correct one. This process heavily relies on fuzzy string matching libraries like [[Python - thefuzz Package|thefuzz]] and functions such as [[Python - process.extract Function|process.extract]] to calculate these similarity scores.

_Analogy:_ _Imagine a librarian tasked with organizing a massive, disorganized pile of donated books. The library has a master list of official genres: 'Fantasy', 'Science Fiction', 'Mystery'. The donated books have handwritten, often misspelled labels like 'Fantacy', 'SciFi', 'Mistery', or 'Sience Fiction'. The librarian picks up each book, compares its messy label to the master list, and if it's 'close enough', places it on the correct, official shelf. This act of sorting the messy pile into clean, defined sections is exactly what collapsing categories does for data._

In this analogy:
- **The Librarian:** Represents the Python script or for-loop that automates the process.
- **The Master List of Genres:** Is the `categories` DataFrame containing the correct, standardized strings.
- **The Disorganized Pile of Books:** Is the `survey['state']` column with all its typos and variations.
- **The Librarian's Judgment ('close enough'):** Corresponds to the similarity score threshold (e.g., >= 80).
- **Placing the Book on the Correct Shelf:** Is the act of replacing the typo in the DataFrame with the correct category string.
- **Where it breaks down:** A human librarian can use external context like the book's cover art or author to resolve ambiguity. The algorithm, by default, only sees the string itself. It might incorrectly group 'Maine' with 'Spain' if the threshold is too low, a mistake a human would never make.

```
      [Correct Categories]                                [Cleaned Survey Data]
 ('California', 'New York')                                  ('California')
             |                                                     ▲
             |                                                     |
             ▼                                                (Replace)
#1 For each correct state ('California')...                       |
             |                                                     |
             ▼                                                     |
   [Messy Survey Data] --#2 process.extract--> [('Calefornie', 95), ('Cali', 80), ...]
('Cali', 'Calefornie', ...)      |                                 |
                                 | #3 Filter (Score >= 80)         |
                                 ▼                                 |
                       [('Calefornie', 95), ('Cali', 80)] ---------
```

## The Step-by-Step Process

### Prerequisites / Inputs

- **Similarity Score Threshold**
    - The integer value (0-100) used to filter matches. This is the most critical parameter to tune.
    - *Low Threshold*: Increases recall (finds more potential typos) but risks false positives (e.g., matching 'Virginia' with 'West Virginia').
    - *High Threshold*: Increases precision (matches are more likely correct) but risks false negatives (missing more complex typos).
- **Scorer Function**
    - The `process.extract` function can accept a `scorer` argument, allowing you to use different similarity calculation methods from `thefuzz`, such as `fuzz.ratio`, `fuzz.partial_ratio`, or the more robust [[Python - fuzz.WRatio Function|fuzz.WRatio]]. The default is `fuzz.WRatio`, which is generally a good starting point.

### The Steps

- **Step 1: Define Correct and Messy Data**
    - Start with two DataFrames: one containing the messy data (e.g., `survey`) and another containing the list of unique, correct categories (e.g., `categories`).
- **Step 2: Iterate Through Correct Categories**
    - Create a `for` loop that iterates over each correct string in the `categories` DataFrame. This string will serve as the 'gold standard' for each round of matching.
- **Step 3: Find Potential Matches**
    - Inside the loop, use `process.extract()` to find all strings in the messy `survey['state']` column that are similar to the current correct category. This function returns a list of tuples, each containing the matched string and its similarity score.
- **Step 4: Filter and Replace High-Similarity Matches**
    - Create a nested loop to iterate through the list of potential matches. Use an `if` statement to check if a match's similarity score is above a chosen threshold (e.g., 80).
    - If the score is high enough, use the `.loc` accessor to find all rows in the `survey` DataFrame where the 'state' column equals the matched typo and replace it with the current correct category.

##### Code Translation

```python
import pandas as pd
from thefuzz import process

# --- Step 1: Define Correct and Messy Data ---
survey_data = {'state': ['California', 'Cali', 'Calefornie', 'Calfornia', 'New York', 'New York City']}
survey = pd.DataFrame(survey_data)

categories_data = {'state': ['California', 'New York']}
categories = pd.DataFrame(categories_data)

# --- Step 2: Iterate Through Correct Categories ---
for state in categories['state']:
    # --- Step 3: Find Potential Matches ---
    # Find all potential matches in the messy column for the current correct state
    matches = process.extract(state, survey['state'], limit=survey.shape[0])

    # --- Step 4: Filter and Replace High-Similarity Matches ---
    # Iterate through the list of potential matches
    for potential_match in matches:
        # Check if the similarity score is 80 or higher
        if potential_match[1] >= 80:
            # Replace the typo with the correct category
            survey.loc[survey['state'] == potential_match[0], 'state'] = state

print(survey['state'].unique())
# Expected Output: array(['California', 'New York'], dtype=object)
```

### Deliverables / Outputs

In many real-world datasets, especially those with free-text fields, a single categorical concept can be represented by dozens of different strings due to typos, abbreviations, and variations. For example, 'California' might appear as 'Cali', 'Calefornia', or 'CA'. Collapsing categories is the practical technique of consolidating all these variations into a single, standardized value. This is achieved by programmatically measuring the string similarity between each messy entry and a predefined list of correct categories, often using algorithms based on [[Python - Levenshtein Distance|Levenshtein distance]].

## Context & Tradeoffs

### When to Use This Process

To standardize messy categorical data by replacing variations and typos with a predefined, correct category, thereby improving data quality for reliable analysis and reporting.

### Common Pitfalls & Tradeoffs

- **Pro: Automation & Scalability**
    - It provides a programmatic way to clean thousands or millions of records far more quickly than manual correction.
- **Con: Threshold Dependency**
    - The entire process's effectiveness hinges on finding the right similarity threshold, which often requires trial and error and can be data-specific.
- **Con: Risk of Incorrect Merging**
    - A poorly chosen threshold or scorer can lead to the incorrect collapsing of distinct categories that happen to be spelled similarly (e.g., 'Iowa' and 'Ohio', or 'St. Kitts' and 'St. Lucia').
- **Con: Computational Complexity**
    - The nested loop approach can be computationally expensive, especially with a large number of correct categories and a very large survey DataFrame. The complexity is roughly O(C * N * log(N)) where C is the number of correct categories and N is the number of rows in the messy data.

## Connections

```
                               (Related Field)
                         [[Python - Record Linkage|Record Linkage]]
                                      ▲
                                      │
    ┌─────────────────────────────────┼─────────────────────────────────┐
    │                                 │                                 │
(Uses)                           ┌───────────────────────────┐        (Based On)
[[Python - thefuzz Package|thefuzz]] │ Collapsing Categories     │ [[Python - Levenshtein Distance|Levenshtein Distance]]
                                 └───────────────────────────┘
                                      │
                                      ▼
                                (Implemented By)
                      [[Python - process.extract Function|process.extract]]
```


- This technique is a fundamental component of [[Python - Record Linkage|record linkage]], where identifying and standardizing similar fields is the first step to merging duplicate entities.
- The entire process is powered by libraries like [[Python - thefuzz Package|thefuzz]], which provides the necessary functions for fuzzy string comparison.
- The similarity scores are ultimately derived from the concept of [[Python - Minimum Edit Distance|minimum edit distance]], which is calculated using algorithms like the [[Python - Levenshtein Distance|Levenshtein distance]].
- The conversion from an integer edit distance to a percentage-based similarity score is detailed in the [[Python - Minimum Edit Distance & Similarity Score Relationship|relationship between edit distance and similarity scores]].

## Deeper Questions

- You're cleaning a 'city' column containing both 'St. Louis' and 'East St. Louis'. How would you adjust the similarity threshold and potentially the logic to correctly collapse typos for 'St. Louis' (e.g., 'St Louis') without incorrectly merging 'East St. Louis' into it? What's the business risk of getting this wrong?
- The provided code uses nested loops, which can be slow for a DataFrame with 10 million survey responses and 500 unique correct categories. How would you refactor this process to be more performant and scalable, perhaps by avoiding explicit iteration over the DataFrame?
- What if string similarity alone is insufficient? Imagine you have product names like 'Apple iPhone 12 64GB' and 'Apple iPhone 12 Pro 128GB'. A simple fuzzy match might collapse them. What other data or techniques, beyond simple string comparison, could you incorporate to make the collapsing logic smarter and context-aware?