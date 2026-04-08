---
tags: 
  - core
  - swe
  - readability
  - clean_code
  - maintainability
  - naming_conventions
  - self_documenting
  - concept
source: 
  - "[[Software Engineering Principles in Python]]"
related: 
  - "[[SWE - Readability]]"
  - "[[SWE - Self-Documenting Code]]"
  - "[[SWE - Role of Comments in Readability]]"
  - "[[SWE - Refactoring 1]]"
  - "[[Python - Zen of Python]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[SWE - Do One Thing Principle]]"
  - "[[SWE - Modular Code]]"
  - "[[SWE - Signs a Function is Doing Too Much]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Python - Functions]]"
  - "[[Python - Variables]]"
  - "[[Python - Class Definition]]"
  - "[[SWE - Software Engineering for Data Scientists]]"
---
# Core: Descriptive Naming

## Summary

>Descriptive naming is the practice of choosing names for variables, functions, classes, and other entities in code that clearly and concisely describe their purpose and functionality. It's a cornerstone of creating [[SWE - Self-Documenting Code|self-documenting code]], which aims to make the code's intent obvious without relying heavily on external documentation or [[SWE - Role of Comments in Readability|comments]]. The goal is to strike a balance, avoiding names that are too generic (like `check`) or excessively verbose.

**Why This Matters:** Descriptive naming transforms code from a cryptic set of instructions into a clear, human-readable narrative, drastically reducing the time and cognitive load required for maintenance and collaboration.

_Analogy:_ _Descriptive naming in code is like labeling the ingredients in a kitchen pantry._

A bullet point that starts with '**Where it breaks down:**' and explains the analogy's limitations. This is vital for preventing misconceptions.
- **Poor Naming (`check(x, y)`):** This is like having a row of identical, unlabeled jars. You have to open each one and taste the contents to know if it's salt, sugar, or flour. It's time-consuming and error-prone.
- **Descriptive Naming (`is_boiling(temp, boiling_point)`):** This is like having clear, concise labels: "Flour," "Sugar," "Salt." You know exactly what's inside and what it's for at a glance.
- **Going Overboard (`check_if_temperature_is_above_boiling_point(...)`):** This is like a label that says "Fine-Grain White Crystalline Substance Used for Sweetening, Derived from Sugar Cane." It's accurate but unnecessarily long and clutters the pantry.
- **Where it breaks down:** The analogy implies a static purpose. In code, the context in which a variable or function is used can add meaning, whereas a jar of "Flour" is always just flour. The "best" name can sometimes depend on the surrounding code, a nuance the pantry analogy doesn't capture.

```
Clarity Spectrum:

<─── Too Vague ─────────── Good ─────────── Too Verbose ───>

  check(x, y)      is_boiling(temp)      check_if_temp_is_...

Cognitive Load:      High                  Low                  Medium
Maintainability:     Low                   High                 Medium
```

## Details

The core idea behind descriptive naming is to embed the "what" and "why" directly into the code itself. Instead of forcing a developer to decipher cryptic abbreviations or generic terms, well-chosen names make the code's logic and intent immediately apparent. This practice, central to Software Engineering, is a key tenet of writing clean, maintainable, and readable code. It's about finding the sweet spot between being too vague and being overly verbose, as illustrated by the progression from `check(x, y)` to `is_boiling(temp)` to the overly long `check_if_temperature_is_above_boiling_point`. This principle aligns with the ideas in the [[Python - Zen of Python]], particularly "Readability counts."

#### Primary Goal

To make code easier to read, understand, and maintain by choosing names that accurately reflect the purpose of variables, functions, and classes.

#### Mechanism

- **How it Works:** The process involves a conscious effort to choose names that answer questions about the code. A good name should reveal intent and usage.
    1. **Identify the Entity's Purpose:** What does this variable hold? What does this function *do*?
    2. **Choose Specific, Unambiguous Words:** Prefer `user_list` over `data` or `list`. Prefer `is_boiling` over `check`.
    3. **Follow Conventions:** Adhere to language-specific conventions (e.g., `snake_case` for Python functions, `CamelCase` for classes).
    4. **Refine for Brevity and Clarity:** Remove redundant words without losing meaning. `convert_to_string` is better than `take_input_and_convert_it_into_a_string`.
- **Poor Naming:** This is the use of generic, single-letter, or abbreviated names that hide the entity's purpose.
    - *Example:* In `def check(x, y=100):`, the names `check`, `x`, and `y` give no clue about what is being checked or what the values represent. Is it a temperature? A score? A password length?
- **Good Descriptive Naming:** This is the sweet spot. The name is clear, concise, and accurately describes the entity's role.
    - *Example:* In `def is_boiling(temp, boiling_point=100):`, the function name `is_boiling` clearly indicates it returns a boolean (True/False). The parameters `temp` and `boiling_point` are self-explanatory. This is a core part of [[SWE - Self-Documenting Code]].
- **Overly Verbose Naming (Going Overboard):** This happens when names become so long they are hard to read and clutter the code, often restating information that is already obvious from the context.
    - *Example:* `def check_if_temperature_is_above_boiling_point(...)` is redundant. The function's logic is simple, and the name is longer than the implementation. `is_boiling` conveys the same meaning more efficiently.

##### Code Translation

```python
# --- Path 1: Poor Naming ---
# Vague and requires comments or deep inspection to understand.
# What is x? What is y? What is being checked?
def check(x, y=100):
    return x >= y

# --- Path 2: Descriptive Naming (The Goal) ---
# Clear, concise, and self-documenting.
# The intent is immediately obvious from the names.
def is_boiling(temp, boiling_point=100):
    return temp >= boiling_point

# --- Path 3: Going Overboard ---
# The name is so long it becomes harder to read than the code itself.
# It adds noise without adding new information.
def check_if_temperature_is_above_boiling_point(
    temperature_to_check,
    celsius_water_boiling_point=100):
    return temperature_to_check >= celsius_water_boiling_point
```

 [[Code - Descriptive Naming Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Heuristics for Naming:**
    - **Use Nouns for Variables:** A variable holds a thing, so its name should be a noun (e.g., `user_name`, `record_count`).
    - **Use Verbs for Functions:** A function *does* something, so its name should start with a verb (e.g., `calculate_total`, `validate_input`). For functions that return a boolean, use prefixes like `is_`, `has_`, or `can_` (e.g., `is_valid`, `has_permission`).
    - **Be Consistent:** Use the same name for the same concept across the entire codebase. If you use `user` in one place, don't switch to `customer` in another for the same entity.
    - **Avoid Disinformation:** Don't use names that imply something false. For example, don't call a variable `account_list` if it's not actually a list data structure.

#### Core Trade-offs

- **Clarity vs. Brevity:**
    - The primary tradeoff is finding the balance between a name that is short and easy to type versus one that is long enough to be fully descriptive. As seen in the example, `is_boiling` is a better balance than both `check` and `check_if_temperature_is_above_boiling_point`.
- **Context Dependency:**
    - A name that is perfectly descriptive in a small, localized scope (e.g., `i` in a short `for` loop) might be terribly vague in a larger scope. The "right" level of descriptiveness depends on how far the name is used from its definition.
- **Potential for Bike-Shedding:**
    - Teams can sometimes spend an excessive amount of time debating the "perfect" name for a variable or function, a phenomenon known as bike-shedding. While good naming is important, it's crucial to avoid analysis paralysis and make a reasonable choice.

## Connections

```
                  (Parent)
               Readability
                     ▲
                     │
┌────────────────────┼────────────────────┐
│                    │                    │
(Principle)     ┌──────────────────┐      (Goal)
Zen of Python   │ Descriptive Naming │      Self-Documenting Code
                └──────────────────┘
                     │
                     ▼
                 (Action)
                 Refactoring
```

### Parent Concept

Descriptive naming is a fundamental technique for achieving the broader goal of [[SWE - Readability|code readability]].

### Child Concepts



### Related Concepts 

- It is the primary mechanism for creating [[SWE - Self-Documenting Code|self-documenting code]], where the code's purpose is clear without extensive comments.
- The practice of improving names is a common activity during [[SWE - Refactoring 1|refactoring]] to enhance code quality.
- Choosing good names aligns with the philosophy of the [[Python - Zen of Python]], which states that 'Readability counts'.
- Effective naming helps prevent the need for excessive [[SWE - Role of Comments in Readability|comments]], as the code explains itself.
## Questions

- Imagine you're joining a legacy project where single-letter variable names like `d`, `t`, and `m` are used for 'duration', 'tolerance', and 'magnitude'. The project is business-critical, and any change is risky. How would you justify the cost and risk of a major refactoring effort to improve naming to a non-technical manager focused solely on quarterly feature delivery?
- In a large, distributed team, how would you design and enforce a consistent naming convention across multiple microservices written in different languages? What tools and processes would you implement to prevent naming styles from diverging and creating confusion at the integration points?
- What if your programming language restricted all variable and function names to a maximum of 8 characters? How would this constraint fundamentally change your approach to structuring code, and what new patterns or conventions would you need to invent to maintain readability?