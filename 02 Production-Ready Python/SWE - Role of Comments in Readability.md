---
tags: 
  - core
  - swe
  - code_clarity
  - maintainability
  - documentation
  - readability
  - software_engineering_principles
  - concept
source: 
  - "[[Software Engineering Principles in Python]]"
related: 
  - "[[SWE - Readability]]"
  - "[[SWE - Self-Documenting Code]]"
  - "[[SWE - Descriptive Naming]]"
  - "[[SWE - Role of Docstrings in Readability]]"
  - "[[Python - Docstrings]]"
  - "[[Python - Zen of Python]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[SWE - Do One Thing Principle]]"
  - "[[SWE - Refactoring 1]]"
  - "[[SWE - Modular Code]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Python 5 - Docstrings]]"
---
# Core: Code Commenting Philosophy

## Summary

>The core idea is that code should be written for humans first and computers second. The provided context emphasizes a specific philosophy: when faced with the choice, it's safer and more beneficial in the long run to add a comment than to omit one. Under-commented code creates ambiguity and future maintenance headaches, while over-commented code is, at worst, a minor annoyance that can be easily ignored or removed.

**Why This Matters:** This philosophy directly impacts a project's long-term health, making code easier to debug, maintain, and onboard new developers to.

_Analogy:_ _Imagine a professional chef writing a recipe for their team. They could just list the ingredients and steps ('what' to do). But a great chef also adds notes in the margins: 'Sear the scallops on high heat for only 90 seconds to prevent them from getting rubbery' (the 'why'), or 'Be careful, this pan gets extremely hot on the handle' (a warning/assumption). These comments don't change the recipe, but they ensure consistency, prevent mistakes, and transfer crucial experience to the next person who uses it._

The recipe is the code. The ingredients and steps are the self-documenting parts of the code. The margin notes are the comments, explaining intent and potential pitfalls. **Where it breaks down:** Unlike a recipe, code can be changed. If the code is updated but the 'margin notes' (comments) are not, they become dangerously misleading, which is a problem that doesn't exist with a static recipe.

```
<-- Less Clear -------------------- Clarity Spectrum -------------------- More Clear -->

[Under-Commented] -------> [Self-Documenting Code] --(Doubt?)--> [Well-Commented Code] ---> [Over-Commented]
     (Risky)                   (Ideal)                          (Safe Bet)                 (Noisy)

Guideline: If you are at "Self-Documenting" but have any doubt,
           move right to "Well-Commented". Avoid the left side.
```

## Details

This is a fundamental principle in [[Fundamental - Software Engineering|Software Engineering]] that guides how and when to write comments, forming a key pillar of achieving [[SWE - Readability|code readability]]. While the ideal is perfectly [[SWE - Self-Documenting Code|self-documenting code]] through clear [[SWE - Descriptive Naming|descriptive naming]], this is not always possible. Complex algorithms, business logic, or subtle workarounds often require explicit explanation. The philosophy from the context—"under-commented is a bigger issue than over-commented"—serves as a practical tie-breaker, pushing developers to prioritize clarity for their future selves and teammates.

#### Primary Goal

To reduce the cognitive load on future readers by explaining the *intent* and *reasoning* behind the code, which the code itself cannot always convey.

#### Mechanism

- **How it Works:** A developer should pause and consider adding a comment when the code's purpose isn't immediately obvious. The goal is to preemptively answer questions a future reader might have. The thought process is:
    1. **Explain the 'Why', not the 'What':** The code itself shows *what* it is doing. A good comment explains *why* it's being done that way.
    2. **Document Constraints and Assumptions:** If the code relies on a non-obvious external factor (e.g., 'this API fails if we send more than 10 requests/sec'), it must be commented.
    3. **Clarify Complex Logic:** For dense algorithms or complex business rules, a high-level summary in plain English is invaluable.
    4. **Apply the Tie-Breaker Rule:** If you hesitate for even a moment and wonder, "Will this be clear in six months?", that is the signal to add a comment.
- **Guiding Principle: Comment the 'Why'**
    - *Bad Comment (The 'What'):* `i = i + 1 # Increment i`
    - *Good Comment (The 'Why'):* `remaining_attempts -= 1 # Decrement attempts to prevent infinite loops on failure.`

##### Code Translation

```python
# --- Example: Under-commented (Bad) ---
# It's impossible to know the significance of the number 90 without external context.
def get_priority_customers(customers):
    return [c for c in customers if c.days_active > 90]

# --- Example: Over-commented / 'What' comment (Also Bad) ---
# This comment is redundant, adds noise, and insults the reader's intelligence.
def get_priority_customers(customers):
    # Create an empty list for results
    priority_list = []
    # Loop through all customers
    for c in customers:
        # Check if days_active is greater than 90
        if c.days_active > 90:
            # Add customer to the list
            priority_list.append(c)
    # Return the list
    return priority_list

# --- Example: Well-commented / 'Why' comment (Good) ---
# The comment explains the business logic behind the 'magic number'.
# This is a perfect use case for a comment, as the code cannot explain this context.
def get_priority_customers(customers):
    # Per marketing, "priority" status is granted to customers active
    # for more than one business quarter (90 days).
    BUSINESS_QUARTER_DAYS = 90
    return [c for c in customers if c.days_active > BUSINESS_QUARTER_DAYS]
```

 [[Code - Code Commenting Philosophy Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Audience**
    - Who will read this code? Junior developers or those new to the domain may need more explanatory comments than senior architects already familiar with the system's quirks.
- **Complexity**
    - Is the logic inherently complex (e.g., a financial calculation, a tricky algorithm)? Complex logic demands comments explaining the high-level approach and rationale.
- **Longevity & Brittleness**
    - How long will this code live, and how fragile is it? A core library function expected to last for years that relies on a non-obvious assumption must have that assumption clearly documented.

#### Core Trade-offs

- **Clarity vs. Noise**
    - The primary tradeoff. Good comments enhance clarity. Bad or excessive comments (commenting the 'what') create noise, making it harder to read the actual code.
- **Maintenance Overhead**
    - Comments are a form of documentation that must be maintained. When code is changed, the corresponding comments must also be updated. Out-of-date comments are worse than no comments because they are actively misleading.
- **Risk of Under-Commenting**
    - The risk is high cognitive load, bugs, and slow development in the future. It creates 'tribal knowledge' where only the original author understands the code, creating a key-person dependency.
- **Risk of Over-Commenting**
    - The risk is lower: code can become cluttered, and there's a higher chance of comments becoming stale. However, the context explicitly states this is the lesser of two evils.

## Connections

```
                  (Parent)
                Readability
                     ▲
                     │
     ┌───────────────┼────────────────────────────┐
     │               │                            │
(Complements) ┌───────────────────────────┐     (Complements)
Self-Doc Code │ Code Commenting Philosophy│   Descriptive Naming
              └───────────────────────────┘
                     │
                     ▼
                  (Tool)
            Role of Docstrings
```

### Parent Concept

This philosophy is a core component of achieving [[SWE - Readability|code readability]], which is the overarching goal of writing clean, maintainable software.

### Child Concepts



### Related Concepts 

- This principle directly complements the goal of [[SWE - Self-Documenting Code|self-documenting code]]; when the code itself cannot explain the 'why', comments are essential to fill the gap.
- Effective commenting, combined with [[SWE - Descriptive Naming|descriptive naming]], forms the foundation of understandable and maintainable programs.
- While general comments explain inline logic, [[SWE - Role of Docstrings in Readability|docstrings]] serve a more formal role in documenting the API of functions and classes.
- The [[Python - Zen of Python|Zen of Python]] echoes this sentiment with 'Readability counts' and 'Explicit is better than implicit'.
- A common trigger for adding comments is during [[SWE - Refactoring 1|refactoring]], when a developer realizes a piece of code is too complex and needs explanation before it can be simplified.
## Questions

- You've inherited a critical but uncommented legacy system. The business wants new features urgently, but the development team is slowed down by the code's obscurity. How would you justify to a non-technical manager a multi-week 'commenting and refactoring' project that delivers no immediate features but is crucial for future velocity?
- How would you implement a policy for code commenting in a large, distributed team to ensure consistency without being overly bureaucratic? What automated tools (linters, pre-commit hooks) could you use to enforce a 'minimum viable commenting' standard, especially for complex functions?
- What if you were forced to work on a project where you were forbidden from writing any comments at all (including docstrings)? What other techniques and principles (like naming, function decomposition, design patterns) would you have to rely on to an extreme degree to maintain readability?