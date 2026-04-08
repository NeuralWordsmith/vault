---
tags: 
  - core
  - python
  - fuzzy matching
  - string similarity
  - weighted ratio
  - data cleaning
  - thefuzz
  - concept
source: 
  - "[[Cleaning Data in Python]]"
related: 
  - "[[Python - thefuzz Package]]"
  - "[[Python - Levenshtein Distance]]"
  - "[[Python - process.extract Function]]"
  - "[[Python - Record Linkage]]"
  - "[[Python - Cleaning Categorical Data with String Matching]]"
  - "[[Python - Minimum Edit Distance]]"
  - "[[Python - Minimum Edit Distance & Similarity Score Relationship]]"
  - "[[Python - Strings]]"
  - "[[Fundamental - Natural Language Processing]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[Fundamental - Feature Engineering]]"
  - "[[DSA - Searching Algorithms]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Lists]]"
---
# Core: fuzz.WRatio

## Summary

>`fuzz.WRatio` is a string comparison function from the [[Python - thefuzz Package|thefuzz library]] that calculates a similarity score from 0 to 100. It is specifically designed to be robust against differences in word order and partial string matches, making it more sophisticated than simple [[Python - Levenshtein Distance|Levenshtein distance]] calculations.

**Why This Matters:** This function is crucial for real-world data cleaning because it intelligently handles messy, out-of-order, and partial text entries, making it possible to match related records that simple string comparison would miss.

_Analogy:_ _Think of `fuzz.WRatio` as a flexible recipe comparison. You have a detailed recipe for "Classic Beef Stew with Carrots and Potatoes" and a friend's scribbled note that just says "Stew: beef, potatoes." A simple word-for-word check would fail, but `fuzz.WRatio` is like a chef who recognizes the core ingredients ("beef", "potatoes", "stew") are present, even if some details are missing ("Classic", "with Carrots") and the format is different. It concludes the recipes are highly similar._

- **Full Recipe:** The first, more complete string (e.g., `'Houston Rockets vs Los Angeles Lakers'`).
- **Scribbled Note:** The second, shorter, or reordered string (e.g., `'Lakers vs Rockets'`).
- **The Chef:** The `fuzz.WRatio` function, which intelligently identifies the common, important parts.
- **Similarity Judgment:** The final score (e.g., 86), indicating a strong match despite the differences.
- **Where it breaks down:** The analogy implies semantic understanding. `fuzz.WRatio` doesn't understand that "beef" and "steak" are related; it only works on the characters present in the strings. It's a syntactic, not a semantic, comparison.

```
String A: "Houston Rockets vs Los Angeles Lakers"
String B: "Lakers vs Rockets"

    │
    ▼
fuzz.WRatio(A, B)
    │
    ▼
┌───────────────────────────┐
│  Heuristic Comparison:    │
│  - Simple Ratio           │
│  - Partial Ratio          │
│  - Token Sort Ratio       │
│  - Token Set Ratio        │
└───────────────────────────┘
    │
    ▼
  Score: 86
```

## Details

The `fuzz.WRatio` function, part of the [[Python - thefuzz Package|thefuzz library]], provides a powerful method for fuzzy string matching. Unlike basic similarity metrics that can be thrown off by extra words or different ordering, `WRatio` (Weighted Ratio) uses a clever heuristic to find the best possible match. It considers different combinations of string comparisons, including partial matches and sorted token sets, and weights the results to produce a single, robust similarity score. This makes it exceptionally useful for tasks like [[Python - Cleaning Categorical Data with String Matching|cleaning categorical data]] or [[Python - Record Linkage|record linkage]] where entries can be inconsistent.

#### Primary Goal

To provide a single, reliable similarity score between two strings that accounts for differences in word order, length, and partial matches.

#### Mechanism

- **Step 1: Import the Function**
    - First, import the `fuzz` object from the `thefuzz` library.
- **Step 2: Define Input Strings**
    - Prepare the two strings you want to compare. These can be of different lengths, have typos, or contain words in a different order.
- **Step 3: Call `fuzz.WRatio`**
    - Pass the two strings as arguments to the `fuzz.WRatio` function.
- **Step 4: Interpret the Score**
    - The function returns an integer score from 0 (no similarity) to 100 (identical). A higher score indicates a better match.

##### Code Translation

```python
# --- Step 1: Import the Function ---
from thefuzz import fuzz

# --- Step 2: Define Input Strings ---
# Example 1: Typo comparison
string1_typo = 'Reeding'
string2_typo = 'Reading'

# Example 2: Partial string comparison
string1_partial = 'Houston Rockets'
string2_partial = 'Rockets'

# Example 3: Different ordering
string1_order = 'Houston Rockets vs Los Angeles Lakers'
string2_order = 'Lakers vs Rockets'

# --- Step 3: Call fuzz.WRatio ---
score_typo = fuzz.WRatio(string1_typo, string2_typo)
score_partial = fuzz.WRatio(string1_partial, string2_partial)
score_order = fuzz.WRatio(string1_order, string2_order)

# --- Step 4: Interpret the Score ---
print(f"Similarity score for '{string1_typo}' vs '{string2_typo}': {score_typo}")
# Output: Similarity score for 'Reeding' vs 'Reading': 86

print(f"Similarity score for '{string1_partial}' vs '{string2_partial}': {score_partial}")
# Output: Similarity score for 'Houston Rockets' vs 'Rockets': 90

print(f"Similarity score for '{string1_order}' vs '{string2_order}': {score_order}")
# Output: Similarity score for 'Houston Rockets vs Los Angeles Lakers' vs 'Lakers vs Rockets': 86
```

 [[Code - fuzz.WRatio Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Underlying Ratios**
    - `fuzz.WRatio` itself doesn't have user-configurable parameters beyond the two input strings. Its behavior is determined by an internal weighting of several other `thefuzz` comparison functions.
    - It intelligently combines scores from `fuzz.ratio`, `fuzz.partial_ratio`, `fuzz.token_sort_ratio`, and `fuzz.token_set_ratio`.
    - The function applies a weighting system based on the characteristics of the input strings (e.g., if one string is a subset of the other, the partial ratio score is weighted more heavily). This logic is pre-defined and not exposed to the user.

#### Core Trade-offs

- **Pro: High Robustness**
    - Its key advantage is its resilience to common data entry issues like word reordering and partial matches, which makes it far more effective than simple [[Python - Levenshtein Distance|Levenshtein distance]] for many real-world datasets.
- **Pro: Simplicity**
    - It provides a single, easy-to-interpret score without requiring any parameter tuning, making it very user-friendly.
- **Con: Computational Cost**
    - Because it runs multiple underlying comparisons, `WRatio` is computationally more expensive than simpler functions like `fuzz.ratio`. This can be a bottleneck when comparing millions of string pairs.
- **Con: 'Magic' Heuristic**
    - The internal weighting logic is a heuristic that works well in general but can sometimes produce counter-intuitive results in edge cases. It's less transparent than using a single, specific comparison method.

## Connections

```
                           (Parent)
                      thefuzz Package
                             ▲
                             │
┌────────────────────────────┼────────────────────────────┐
│                            │                            │
(Underlying Metric) ┌──────────────────┐           (Application)
Levenshtein Distance    │    fuzz.WRatio   │           Record Linkage
                    └──────────────────┘
                             │
                             ▼
                       (Used With)
                    process.extract
```

### Parent Concept

`fuzz.WRatio` is a core function provided by the [[Python - thefuzz Package|thefuzz package]], which is a library dedicated to fuzzy string matching.

### Child Concepts



### Related Concepts 

- The score from `fuzz.WRatio` is an abstraction over the raw [[Python - Minimum Edit Distance|minimum edit distance]], providing a more intuitive percentage-based metric as explored in the [[Python - Minimum Edit Distance & Similarity Score Relationship|relationship between edit distance and similarity scores]].
- It is often used as the scoring function within the [[Python - process.extract Function|process.extract function]] to find the best matches for a string from a list of choices.
- This function is a fundamental tool for [[Python - Cleaning Categorical Data with String Matching|cleaning messy categorical data]] before analysis or modeling.
- Its ability to handle partial and reordered strings makes it highly effective for complex tasks like [[Python - Record Linkage|record linkage]], where entities need to be matched across different datasets.
## Questions

- You're tasked with de-duplicating a customer database of 10 million records. `fuzz.WRatio` gives great results but is too slow. How would you design a hybrid approach that balances the accuracy of `WRatio` with the speed needed for this scale, and how would you justify the potential for slightly lower accuracy to the business?
- Imagine deploying a real-time API that uses `fuzz.WRatio` to suggest corrected addresses to users as they type. What are the potential performance bottlenecks in this system, and how would you architect a caching strategy to ensure a responsive user experience?
- What if the underlying logic of `fuzz.WRatio` was completely transparent and you could adjust the weights of the partial, token sort, and simple ratios yourself? Describe a scenario where you would deviate from the default weighting and what kind of problem this custom 'SuperRatio' would be uniquely suited to solve.