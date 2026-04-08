---
tags: 
  - core
  - swe
  - naming_conventions
  - clean_code
  - readability
  - self_documenting_code
  - maintainability
  - concept
source: 
  - "[[Software Engineering Principles in Python]]"
related: 
  - "[[SWE - Readability]]"
  - "[[SWE - Self-Documenting Code]]"
  - "[[SWE - Role of Comments in Readability]]"
  - "[[SWE - Role of Docstrings in Readability]]"
  - "[[Python - Zen of Python]]"
  - "[[SWE - Refactoring 1]]"
  - "[[SWE - Do One Thing Principle]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[SWE - Modular Code]]"
  - "[[Python - Functions]]"
  - "[[Python - Variables]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[SWE - Signs a Function is Doing Too Much]]"
---
# Core: Descriptive Naming

## Summary

>Descriptive naming is a core principle of writing clean, understandable code by choosing names for variables, functions, and classes that clearly communicate their purpose and behavior. It is a key aspect of achieving overall [[SWE - Readability]] and is the foundation for creating [[SWE - Self-Documenting Code|self-documenting code]]. The goal is to make the code's intent obvious without needing to read the underlying implementation or rely on extensive [[SWE - Role of Comments in Readability|comments]].

**Why This Matters:** Descriptive naming makes code easier to understand, debug, and maintain, directly reducing the cognitive load on developers and preventing future errors.

_Analogy:_ _Using descriptive names in code is like labeling kitchen canisters. If you have canisters clearly labeled 'Flour', 'Sugar', and 'Salt', you can instantly grab what you need while cooking. If they are cryptically labeled 'X', 'Y', and 'Z', you'd have to open and taste the contents of each one every time, slowing you down and dramatically increasing the chance of mixing up salt for sugar._

The analogy maps 'Flour', 'Sugar', 'Salt' to descriptive names like `user_name`, `item_price`, and `is_valid`. The unlabeled canisters 'X', 'Y', 'Z' map to poor names like `x`, `y`, `z` or `data1`. The act of 'tasting' is equivalent to a developer having to read a function's entire implementation just to understand what it does. **Where it breaks down:** Unlike static kitchen labels, code names also convey behavior (e.g., `calculate_tax` vs. `tax_amount`) and exist within a complex system of interactions, where a name's context is as important as its label.

```
+------------------+---------------------+------------------------------------------------+
| Poor             | Good                | Excessive                                      |
+------------------+---------------------+------------------------------------------------+
| def check(x, y): | def is_boiling(t):  | def check_if_temp_is_above_boiling_point(temp): |
|   ...            |   ...               |   ...                                          |
+------------------+---------------------+------------------------------------------------+
| Ambiguous        | Clear & Concise     | Verbose & Cluttered                            |
| High cognitive   | Low cognitive load  | High cognitive load (due to length)            |
| load             |                     |                                                |
+------------------+---------------------+------------------------------------------------+
```

## Details

The core idea, as highlighted in the examples, is that choosing clear, intention-revealing names for functions and variables is a fundamental practice for improving code [[SWE - Readability]]. Instead of generic names like `check` or `x`, which give no clue about their purpose, we should use names like `is_boiling` or `temp` that precisely describe what the code is doing. This practice is a cornerstone of Software Engineering, aligning with principles like 'Readability counts' from the [[Python - Zen of Python]]. However, there is a balance to strike; names can become too long and unwieldy, which can paradoxically harm readability.

#### Primary Goal

To make code immediately understandable by choosing names that accurately reflect the purpose and function of variables, functions, and classes, thereby reducing ambiguity and cognitive load.

#### Mechanism

- **How it Works:** The process involves replacing ambiguous or generic names with specific, intention-revealing ones.
    1. **Identify the Purpose:** Determine the exact role of a variable (what it holds) or the precise action of a function (what it does).
    2. **Choose Specific Words:** Select nouns for variables (e.g., `customer_name`) and verb phrases for functions (e.g., `calculate_total_price`). For functions that return a boolean, use prefixes like `is_`, `has_`, or `can_` (e.g., `is_boiling`).
    3. **Evaluate Clarity:** Read the code as if you were a new developer. Does the name make the code's intent obvious without further inspection?
- **Poor Naming:** This is code that is hard to understand without deep inspection because its names are generic or cryptic.
    - *Example:* `def check(x, y=100): return x >= y`. It's unclear what `check`, `x`, or `y` represent. Is it checking a score? A temperature? A count?
- **Good Descriptive Naming:** This is the ideal state, where the name clearly and concisely communicates intent.
    - *Example:* `def is_boiling(temp, boiling_point=100): return temp >= boiling_point`. It's immediately obvious that the function checks if a temperature has reached the boiling point.
- **Excessive Naming (Going Overboard):** This occurs when names become so long they are hard to parse and create visual clutter, harming readability.
    - *Example:* `def check_if_temperature_is_above_boiling_point(temperature_to_check, ...):`. While very descriptive, its length makes the line of code cumbersome. `is_boiling` is more concise and just as clear.

##### Code Translation

```python
# 1. Poor Naming (Ambiguous)
def check(x, y=100):
    return x >= y

# 2. Good Descriptive Naming (Clear and Concise)
def is_boiling(temp, boiling_point=100):
    return temp >= boiling_point

# 3. Excessive Naming (Verbose and Cluttered)
def check_if_temperature_is_above_boiling_point(
        temperature_to_check,
        celsius_water_boiling_point=100):
    return temperature_to_check >= celsius_water_boiling_point
```

 [[Code - Descriptive Naming Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Use Verbs for Functions:** Function names should describe what they *do*. Standard prefixes like `get_`, `set_`, `is_`, `has_`, `can_` are effective conventions that signal the function's action and return type.
    - e.g., `get_user_data()`, `is_active()`, `calculate_tax()`
- **Use Nouns for Variables:** Variable names should describe what they *are* or what data they hold.
    - e.g., `user_name` instead of `string1`, `final_price` instead of `val`.
- **Be Specific but Concise:** The name should be as specific as possible without being overly long. The goal is to find the sweet spot between `check` and `check_if_temperature_is_above_boiling_point`.
- **Avoid Ambiguous Abbreviations:** Don't use cryptic abbreviations (e.g., `acct` for `account`) unless they are universally understood within the project's domain. A new team member should not need a glossary to understand the code.

#### Core Trade-offs

- **Descriptiveness vs. Brevity:** This is the primary tradeoff. A name must be descriptive enough to be clear but short enough not to clutter the code and make lines excessively long. The example `check_if_temperature_is_above_boiling_point` illustrates the negative extreme of prioritizing descriptiveness over all else.
- **Cognitive Load:** Short, cryptic names (`chk`, `x`) increase cognitive load because the developer must constantly remember or look up what they mean. Conversely, excessively long names also increase cognitive load by making lines of code hard to scan and parse visually. The goal is to find the name that minimizes this load.
- **Refactoring Effort:** Improving names in an existing codebase is a core activity of [[SWE - Refactoring 1|refactoring]]. While it significantly improves long-term maintainability and readability, it requires dedicated time and effort. This can be a hard sell when compared against delivering new features.

## Connections

```
                           (Parent)
                       SWE - Readability
                               ▲
                               │
┌──────────────────────────────┼──────────────────────────────┐
│                              │                              │
(Contributes to)        ┌───────────────────────────┐       (Reduces need for)
SWE - Self-Documenting  │    Descriptive Naming     │   SWE - Role of Comments
Code                    └───────────────────────────┘       in Readability
```

### Parent Concept

This concept is a fundamental component of [[SWE - Readability]], as clear naming is one of the most direct and impactful ways to make code easier to understand.

### Child Concepts



### Related Concepts 

- Effective descriptive naming is a cornerstone of creating [[SWE - Self-Documenting Code|self-documenting code]], which aims to make the code itself the primary source of documentation.
- This principle directly impacts the [[SWE - Role of Comments in Readability|role of comments]], as good names often make explanatory comments redundant.
- The philosophy behind descriptive naming is echoed in the [[Python - Zen of Python]], particularly in the aphorism 'Readability counts'.
- The process of improving names in an existing codebase is a key activity in [[SWE - Refactoring 1|refactoring]].
## Questions

- Your team is working on a legacy system with thousands of poorly named variables (e.g., `d1`, `flag_a`, `temp_val`). A full refactor would take two sprints, delaying a critical feature launch. How do you argue for or against dedicating time to this 'naming debt' to a product manager who is focused solely on feature velocity?
- In a large, microservices-based system, how would you establish and enforce consistent naming conventions across different services, which might be written in different languages by different teams, to ensure the overall system remains comprehensible?
- What if you were forced to write code where every variable and function name had to be 5 characters or less? What programming patterns and commenting strategies would you have to adopt to maintain any semblance of readability and maintainability?