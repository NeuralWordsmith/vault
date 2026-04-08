---
tags: 
  - core
  - python
  - edit_distance
  - string_similarity
  - levenshtein
  - fuzzy_matching
  - string_metric
  - concept
source: 
  - "[[Cleaning Data in Python]]"
related: 
  - "[[Python - Minimum Edit Distance]]"
  - "[[Python - thefuzz Package]]"
  - "[[Python - fuzz.WRatio Function]]"
  - "[[Python - process.extract Function]]"
  - "[[Python - Record Linkage]]"
  - "[[Python - Cleaning Categorical Data with String Matching]]"
  - "[[Python - Minimum Edit Distance & Similarity Score Relationship]]"
  - "[[Python - Strings]]"
  - "[[DSA - Data Structures & Algorithms]]"
  - "[[DSA - Searching Algorithms]]"
  - "[[Fundamental - Natural Language Processing]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Lists]]"
---
# Core: Edit Distance Algorithms

## Summary

>Edit distance algorithms are a family of methods used to quantify how dissimilar two strings are by counting the minimum number of "edits" (like insertions, deletions, or substitutions) required to change one string into the other. While the core concept is shared, as seen in [[Python - Minimum Edit Distance]], different algorithms define "edit" differently, making them suitable for various tasks. For instance, the Levenshtein distance is a versatile, general-purpose choice, which is why it's implemented in popular libraries like the [[Python - thefuzz Package]].

**Why This Matters:** These algorithms are the backbone of fuzzy string matching, enabling systems to intelligently handle typos, variations, and errors in user-entered text, which is crucial for data cleaning and search functionality.

_Analogy:_ _Think of edit distance algorithms as different types of editors proofreading a document. One editor (Levenshtein) can only add, remove, or replace letters. Another, more specialized editor (Damerau-Levenshtein), can also swap adjacent letters. A very strict editor (Hamming) will only replace letters and refuses to work if the words aren't the same length. Each editor arrives at a "correction count," which tells you how much work was needed to fix the original word._

**Where it breaks down:** This analogy implies human intent. Edit distance algorithms are purely mechanical; they don't understand semantics or context. They would see "house" and "home" as very different, even though they are synonyms, because the character-level changes are significant.

```
```
String 1: "saturday"
String 2: "sunday"

Levenshtein Operations (Distance: 3)
1. substitute 'a' -> 'u'  (suturday)
2. substitute 't' -> 'n'  (sunurday)
3. substitute 'r' -> 'd'  (sunday)

----------------------------------------

Damerau-Levenshtein Example
String 1: "ca"
String 2: "ac"
1. transpose 'ca' -> 'ac' (Distance: 1)
```
```

## Details

There isn't just one way to measure the "distance" between two strings. A variety of algorithms exist, each based on the concept of [[Python - Minimum Edit Distance]], but they differ in which operations they permit and how they weigh them. The choice of algorithm depends on the specific type of string differences you expect to encounter. For example, the Levenshtein distance is a widely used, general-purpose algorithm that considers insertions, substitutions, and deletions. Other algorithms like Hamming or Jaro are more specialized, focusing only on substitutions or transpositions, respectively. This lesson will focus on the Levenshtein distance, implemented via the [[Python - thefuzz Package]], as it provides a robust foundation for string matching.

#### Primary Goal

To provide a flexible framework for quantifying string similarity by allowing the selection of an appropriate set of edit operations (insertion, deletion, substitution, transposition) tailored to a specific problem.

#### Mechanism

- **How they Work:**
    - All edit distance algorithms operate on a source string and a target string.
    - They calculate the minimum number of allowed operations to transform the source into the target.
    - The final count is the 'edit distance'. A lower distance means higher similarity.
- **Levenshtein Distance:**
    - The most common and general-purpose algorithm.
    - Allowed Operations: **Insertion**, **Substitution**, **Deletion**.
    - *Example: To change 'saturday' to 'sunday', Levenshtein would make 3 edits.*
- **Damerau-Levenshtein Distance:**
    - An extension of Levenshtein that is better for catching common human typos.
    - Allowed Operations: Insertion, Substitution, Deletion, and **Transposition** (swapping two adjacent characters).
    - *Example: To change 'ca' to 'ac', Damerau-Levenshtein requires 1 transposition, while Levenshtein would require 2 operations (a deletion and an insertion).*
- **Hamming Distance:**
    - A simpler, more restrictive algorithm.
    - Constraint: **Strings must be of equal length.**
    - Allowed Operations: **Substitution only**.
    - *Example: The Hamming distance between 'karolin' and 'kathrin' is 3.*
- **Jaro Distance:**
    - Measures similarity based on matching characters and transpositions.
    - Allowed Operations: **Transposition only**.
    - It's often used in [[Python - Record Linkage]] and results in a similarity score from 0 to 1, not a distance count.

##### Code Translation

```python
# The 'thefuzz' package uses Levenshtein distance for many of its calculations.
# Here's how to see the distance-based ratio in action.
from thefuzz import fuzz

# --- Step 1: Levenshtein Example ---
# Measures insertions, deletions, substitutions
string1 = "saturday"
string2 = "sunday"
# fuzz.ratio() returns a similarity score based on the edit distance.
# A lower distance results in a higher ratio.
levenshtein_similarity = fuzz.ratio(string1, string2)
print(f"Levenshtein-based similarity between '{string1}' and '{string2}': {levenshtein_similarity}%")

# --- Step 2: Damerau-Levenshtein Intuition ---
# 'thefuzz' doesn't directly expose D-L, but we can see why transposition matters.
string3 = "algorithm"
string4 = "algorihtm" # 'h' and 't' are transposed
# Levenshtein would see 2 changes (substitute 't'->'h', 'h'->'m').
# A D-L algorithm would see only 1 change (transpose 'ht').
levenshtein_similarity_transposed = fuzz.ratio(string3, string4)
print(f"Similarity with a transposition: {levenshtein_similarity_transposed}% (Calculated with 2 edits by Levenshtein)")
```

 [[Code - Edit Distance Algorithms Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Choice of Algorithm:**
    - This is the most significant parameter. Selecting Levenshtein vs. Jaro fundamentally changes how similarity is measured, based on the types of errors you expect (e.g., typos vs. phonetic errors).
- **Operation Costs/Weights:**
    - While basic implementations assume each operation has a cost of 1, advanced versions allow for weighting. For example, you could make substituting 'a' for 's' (a common keyboard adjacency typo) cost less than substituting 'a' for 'z'.

#### Core Trade-offs

- **Complexity vs. Accuracy:**
    - More complex algorithms like Damerau-Levenshtein can capture more intuitive human errors (like transpositions) but are computationally more expensive than simpler ones like Hamming distance.
- **Generality vs. Specificity:**
    - Levenshtein is a great general-purpose algorithm. However, for specific tasks like matching names where only transpositions are common, Jaro distance might be more effective and efficient.
- **Input Constraints:**
    - Some algorithms have strict requirements. Hamming distance, for example, is useless for comparing strings of different lengths, making it unsuitable for most real-world text data.

## Connections

```
```
                               (Parent)
                       Minimum Edit Distance
                                 ▲
                                 │
    ┌────────────────────────────┼────────────────────────────┐
    │                            │                            │
(Implementation)      ┌───────────────────────────┐      (Application)
  thefuzz Package     │ Edit Distance Algorithms  │      Record Linkage
                      └───────────────────────────┘
                                 │
                      ┌──────────┴──────────┐
                      │                     │
             Levenshtein Distance      Jaro Distance
```
```

### Parent Concept

This concept is a specific implementation of the broader idea of [[Python - Minimum Edit Distance]], which establishes the goal of finding the smallest number of operations to transform one string into another.

### Child Concepts



### Related Concepts 

- The [[Python - thefuzz Package|thefuzz package]] is a popular library that provides a practical implementation of Levenshtein distance for fuzzy string matching in Python.
- Understanding these algorithms is key to interpreting the output of functions like [[Python - fuzz.WRatio Function|fuzz.WRatio]], which calculates a similarity score derived from the underlying edit distance.
- These algorithms are the core engine behind [[Python - Record Linkage]], where they are used to identify and merge records that refer to the same entity despite minor variations in spelling.
- The choice of algorithm directly impacts the [[Python - Minimum Edit Distance & Similarity Score Relationship|relationship between edit distance and the final similarity score]], as different operations change the raw distance count.
## Questions

- You're building a real-time search suggestion feature for an e-commerce site. Would you choose a computationally cheaper algorithm like Jaro or a more comprehensive one like Damerau-Levenshtein? Justify your decision by weighing the business impact of suggestion latency against the cost of failing to catch common user typos.
- Imagine you need to deduplicate a database of 10 million customer names, where data entry was manual and inconsistent. How would you design a scalable system to find potential matches without performing a pairwise comparison for every record, which would be computationally infeasible?
- What if the 'cost' of an edit operation was not fixed, but depended on its phonetic impact? How might you design a 'phonetic edit distance' algorithm where substituting 'f' for 'ph' has a near-zero cost, while substituting 'f' for 'z' is very expensive?