---
tags: 
  - core
  - python
  - pandas
  - boolean_indexing
  - logical_operators
  - data_filtering
  - dataframe_subsetting
  - concept
source: 
  - "[[Data Manipulation with pandas]]"
related: 
  - "[[Python - Pandas DataFrame]]"
  - "[[Python - Subsetting DataFrames]]"
  - "[[Python - Subsetting Rows with Logical Conditions]]"
  - "[[Python - Subsetting Columns]]"
  - "[[Python - Subsetting with the isin() Method]]"
  - "[[Python - Boolean Operators]]"
  - "[[Python - Comparison Operators]]"
  - "[[Python - Sorting DataFrames]]"
  - "[[Python - Sorting by Multiple Columns]]"
  - "[[Python - DataFrame Indexing and Selection]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - Boolean Operators on NumPy Arrays]]"
  - "[[Python - Filtering NumPy Arrays]]"
---
# Core: Subsetting with Multiple Conditions

## Summary

>Subsetting with multiple conditions involves filtering a DataFrame to keep only the rows that satisfy two or more criteria simultaneously. This is achieved by combining individual boolean masks using logical operators like 'and' (`&`) or 'or' (`|`).

**Why This Matters:** This technique is fundamental for data analysis, allowing you to isolate specific, highly-relevant segments of your data for targeted investigation or modeling.

_Analogy:_ _Imagine you're a casting director looking for an actor. You have a headshot book (the DataFrame). You need someone who is "tall" (Condition 1) AND "has brown hair" (Condition 2). You first flip through and put a blue sticky note on all the tall actors. Then, you go through the book again and put a yellow sticky note on all the actors with brown hair. The only actors you call for an audition are the ones with *both* a blue and a yellow sticky note on their page._

In this analogy:
- **Headshot Book**: The pandas DataFrame.
- **Each Actor's Page**: A row in the DataFrame.
- **"Tall" criterion**: The first logical condition (e.g., `df['height'] > 180`).
- **"Brown hair" criterion**: The second logical condition (e.g., `df['hair_color'] == 'Brown'`).
- **Blue sticky notes**: The first boolean Series (`is_tall`).
- **Yellow sticky notes**: The second boolean Series (`has_brown_hair`).
- **Actors with both notes**: The final subset of the DataFrame where both conditions are `True`.

**Where it breaks down:** This analogy perfectly captures the 'AND' operation but doesn't as easily illustrate the 'OR' (`|`) or 'NOT' (`~`) operations without becoming convoluted (e.g., calling actors with *at least one* sticky note).

```
DataFrame (dogs)
+---------+------------------+--------+
|  name   |      breed       | color  |
+---------+------------------+--------+  --- Filter: (breed == 'Labrador') & (color == 'Brown') ---
| Bella   | Labrador         | Brown  |  -> Cond 1? True.  Cond 2? True.  (&) -> True.  => KEEP
| Charlie | Golden Retriever | Golden |  -> Cond 1? False. Cond 2? False. (&) -> False. => DROP
| Lucy    | Labrador         | Black  |  -> Cond 1? True.  Cond 2? False. (&) -> False. => DROP
| Cooper  | Poodle           | White  |  -> Cond 1? False. Cond 2? False. (&) -> False. => DROP
| Max     | Labrador         | Brown  |  -> Cond 1? True.  Cond 2? True.  (&) -> True.  => KEEP
+---------+------------------+--------+

      Result
+-------+----------+-------+
| name  |  breed   | color |
+-------+----------+-------+
| Bella | Labrador | Brown |
| Max   | Labrador | Brown |
+-------+----------+-------+
```

## Details

When analyzing data, you often need to be more specific than a single filter allows. To subset rows that meet multiple conditions, you can combine these conditions using logical operators. As shown in the example, you can find all the dogs that are both "Labrador" and "Brown". This is a core technique in data wrangling with pandas. The key is to use operators like `&` for 'and' and `|` for 'or'. A crucial syntax rule is that when you combine conditions in a single line, each individual condition must be enclosed in parentheses due to Python's operator precedence rules.

#### Primary Goal

To isolate and extract highly specific rows from a DataFrame that satisfy a combination of two or more criteria.

#### Mechanism

- **Step 1: Define the First Condition**
    - Create a boolean Series by applying a logical test to a column. This Series will have `True` for rows that meet the condition and `False` otherwise.
- **Step 2: Define the Second Condition**
    - Create a second boolean Series for your next criterion in the same way.
- **Step 3: Combine Conditions with a Logical Operator**
    - Use a logical operator (`&` for AND, `|` for OR) to combine the two boolean Series into a single final Series. For an 'AND' operation, the final Series will only be `True` where *both* input Series were `True`.
- **Step 4: Apply the Combined Filter**
    - Use the final combined boolean Series to index the original DataFrame, which will return only the rows where the combined condition is `True`.

##### Code Translation

```python
import pandas as pd

data = {'name': ['Bella', 'Charlie', 'Lucy', 'Cooper', 'Max'],
        'breed': ['Labrador', 'Golden Retriever', 'Labrador', 'Poodle', 'Labrador'],
        'color': ['Brown', 'Golden', 'Black', 'White', 'Brown']}
dogs = pd.DataFrame(data)

# --- Step 1: Define the First Condition ---
is_lab = dogs["breed"] == "Labrador"

# --- Step 2: Define the Second Condition ---
is_brown = dogs["color"] == "Brown"

# --- Step 3: Combine Conditions with a Logical Operator ---
is_lab_and_brown = is_lab & is_brown

# --- Step 4: Apply the Combined Filter ---
brown_labs = dogs[is_lab_and_brown]
print("Method 1: Separate Variables")
print(brown_labs)

# --- Alternative: Single-Line Method ---
# Note the mandatory parentheses around each condition
brown_labs_single_line = dogs[(dogs["breed"] == "Labrador") & (dogs["color"] == "Brown")]
print("\nMethod 2: Single Line")
print(brown_labs_single_line)
```

 [[Code - Subsetting with Multiple Conditions Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`&` (AND)**: Selects rows where *both* conditions are true. This is the most common operator for creating highly specific filters.
- **`|` (OR)**: Selects rows where *at least one* of the conditions is true. Useful for selecting rows that fit into one of several categories.
- **`~` (NOT)**: Inverts a boolean condition. It selects all rows where the condition is `False`. Can be combined with other operators, e.g., `df[~(condition1 & condition2)]`.
- **Parentheses `()`**: When combining conditions in a single line, each condition *must* be wrapped in parentheses. This is due to Python's operator precedence, where bitwise operators like `&` and `|` are evaluated before comparison operators like `==` or `>`. The parentheses ensure the comparisons happen first.

#### Core Trade-offs

- **Readability vs. Conciseness**
    - **Separate Variables (More Readable):** Creating boolean variables for each condition (e.g., `is_lab`, `is_brown`) makes the code self-documenting and easier to debug, especially with many complex conditions.
    - **Single Line (More Concise):** Combining conditions in one line is faster to write but can become very long and difficult to read if more than two or three conditions are involved.
- **Performance**
    - For simple cases, the performance difference between the two methods is negligible. However, creating intermediate boolean Series for the multi-line approach consumes slightly more memory. In most practical scenarios, readability should be prioritized over these minor performance differences.

## Connections

```
                           (Parent)
             Subsetting Rows with Logical Conditions
                              ▲
                              │
┌─────────────────────────────┼──────────────────────────────┐
│                             │                              │
(Alternative)      ┌───────────────────────────────────┐      (Broader Concept)
isin() Method       │   Subsetting with Multiple Conditions   │      Subsetting DataFrames
                   └───────────────────────────────────┘
```

### Parent Concept

This technique is a specific application of the broader concept of [[Python - Subsetting Rows with Logical Conditions|subsetting rows using logical conditions]], extending it from a single criterion to multiple.

### Child Concepts



### Related Concepts 

- This method is a fundamental part of [[Python - Subsetting DataFrames|the general process of subsetting DataFrames]].
- For cases where you need to check if a column's value is one of several possibilities, the [[Python - Subsetting with the isin() Method|isin() method]] provides a more concise alternative to chaining multiple 'OR' conditions.
- Combining multiple conditions is often a precursor to [[Python - Sorting DataFrames|sorting the resulting filtered data]] to further organize the analysis.
## Questions

- You're analyzing customer churn data. You can create a very complex filter with ten different 'AND' conditions that isolates a tiny, high-churn segment, or a simpler filter with two 'OR' conditions that identifies a much larger, moderately-high churn segment. Which approach do you present to the marketing team, and how do you justify the potential return on investment for targeting each group?
- Imagine you have a streaming data pipeline that processes millions of events per second. You need to apply a multi-condition filter in real-time. How would the single-line vs. separate-variable approach impact memory usage and latency at this scale? Would you consider pre-calculating some of the boolean conditions if they are frequently reused?
- What if the `&` and `|` operators were deprecated in pandas for filtering? How could you replicate the logic of an 'AND' condition using only sequential subsetting operations, and what would be the performance implications of that approach?