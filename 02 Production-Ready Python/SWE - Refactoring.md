---
tags: 
  - core
  - python
  - code_quality
  - maintainability
  - technical_debt
  - code_smells
  - software_craftsmanship
  - concept
source: 
  - "[[Writing Functions in Python]]"
related: 
  - "[[Fundamental - Software Engineering]]"
  - "[[SWE - Code Smells]]"
  - "[[SWE - Code Smells & Refactoring Relationship]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[SWE - Do One Thing Principle]]"
  - "[[SWE - Problems with Repeated Code]]"
  - "[[SWE - Repeated Code & Functions Relationship]]"
  - "[[Python - Benefits of Single Responsibility Functions]]"
  - "[[Fundamental - Version Control]]"
  - "[[SWE - Technical Debt]]"
  - "[[SWE - SOLID Principles]]"
  - "[[SWE - YAGNI (You Ain't Gonna Need It)]]"
  - "[[SWE - KISS (Keep It Simple, Stupid)]]"
---
# Core: Refactoring

## Summary

>Refactoring is the disciplined process of restructuring existing computer code—changing its internal structure—without altering its external behavior. It's a core practice in software engineering aimed at improving code quality, readability, and maintainability. This process is the primary mechanism for addressing [[SWE - Code Smells|code smells]] and systematically paying down technical debt.

**Why This Matters:** Refactoring is the primary defense against software aging, ensuring that a codebase remains understandable, adaptable, and cost-effective to change over its entire lifecycle.

_Analogy:_ _Refactoring is like reorganizing a messy workshop. Initially, your tools might be scattered everywhere. You can still build things, but it's slow and frustrating because you can't find what you need. Reorganizing the workshop (refactoring) doesn't produce a new piece of furniture (a new feature), but you group similar tools, label drawers, and clear workspaces. The next time you need to build something, the process is dramatically faster, safer, and more efficient._

**Where it breaks down:** Unlike tidying a physical workshop, refactoring code carries an inherent risk of breaking existing functionality. A misplaced tool in a workshop is an inconvenience; a misplaced line of code can crash an entire application. This is why refactoring must be done in small, controlled steps supported by a comprehensive suite of automated tests.

```
    +-----------------------+
    | Existing Working Code |
    +-----------+-----------+
                |
                v
    +-----------------------+      No
    |  Identify Code Smell  | <---------+
    +-----------+-----------+           |
                |                       |
                v                       |
    +-----------------------+           |
    | Apply Small Refactor  |           |
    +-----------+-----------+           |
                |                       |
                v                       |
    +-----------------------+           |
    |    Run All Tests      | --(Fail)--> Revert
    +-----------+-----------+
                | (Pass)
                v
    +-----------------------+
    |   Commit Change       |
    +-----------------------+
```

## Details

Based on the work of Martin Fowler, refactoring is a foundational practice for any professional software engineer. It is not a chaotic rewrite but a series of small, incremental improvements to the code's design. The core idea is to continuously clean and simplify the codebase, making it easier for anyone (including your future self) to understand and modify. This process is often triggered by the detection of [[SWE - Code Smells|code smells]], which are symptoms of deeper structural problems that refactoring aims to cure.

#### Primary Goal

To improve the non-functional attributes of software, such as readability, complexity, and maintainability, in order to make future development faster, cheaper, and less prone to bugs.

#### Mechanism

- **How it Works: The Refactoring Cycle**
    - Refactoring is a disciplined, cyclical process, not a one-time event.
    1. **Identify a Smell:** A developer notices a piece of code that is confusing, duplicated, or unnecessarily complex—a [[SWE - Code Smells|code smell]]. For example, seeing the same block of logic repeated in multiple places violates the [[SWE - DRY (Don't Repeat Yourself) Principle|DRY principle]].
    2. **Find a Cure:** The developer chooses a specific, well-known refactoring technique to resolve the smell. For duplicated code, the technique is often 'Extract Function'.
    3. **Apply the Change:** The developer makes the small, targeted change to the code's structure.
    4. **Test:** The developer runs the full suite of automated tests. If all tests pass, the external behavior of the system is confirmed to be unchanged. If any test fails, the change is reverted, and the approach is re-evaluated.
    5. **Commit & Repeat:** The small, successful change is committed to version control. The cycle then begins again with the next identified smell.
- **Core Principle: Small, Verifiable Steps**
    - The power of refactoring comes from its incremental nature. It is the opposite of a 'big rewrite'. Each step is tiny and leaves the system in a working state, minimizing risk and allowing the process to be stopped at any time.

##### Code Translation

```python
# --- BEFORE REFACTORING ---
# This function violates the 'Do One Thing' principle by both calculating and formatting a message.
# This makes it hard to reuse the calculation logic elsewhere.
def process_and_display_data(name, scores):
    if not scores:
        print(f"{name} has no scores.")
        return

    average = sum(scores) / len(scores)
    message = f"{name}'s average score is: {average:.2f}"
    print(message)

process_and_display_data("Alice", [90, 85, 92])

# --- AFTER REFACTORING ---
# The logic is separated into two functions, each with a single responsibility.

# --- Step 1: Extract the calculation logic --- 
def calculate_average(scores):
    """Calculates the average of a list of scores. Returns 0 for an empty list."""
    if not scores:
        return 0
    return sum(scores) / len(scores)

# --- Step 2: Create a function for formatting the output ---
def format_average_message(name, scores):
    """Formats a message with the user's average score."""
    average_score = calculate_average(scores)
    if average_score == 0:
        return f"{name} has no scores."
    return f"{name}'s average score is: {average_score:.2f}"

# --- Step 3: Use the new, refactored functions ---
message = format_average_message("Alice", [90, 85, 92])
print(message)
```

 [[Code - Refactoring Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Timing (When to Refactor)**
    - **Preparatory Refactoring:** Before adding a new feature or fixing a bug, clean up the relevant area of the code first to make the new work easier.
    - **Comprehension Refactoring:** When you're trying to understand a piece of code, renaming variables and breaking down functions can be a way to improve it while you learn it.
    - **After a Code Review:** Feedback from peers often highlights areas that are unclear or overly complex, which are prime candidates for refactoring.
- **Scope (How Much to Refactor)**
    - The scope should always be as small as possible for a single change. This could be renaming a variable, extracting one function, or moving a method between two classes. Large-scale refactoring is an anti-pattern and is better described as 'restructuring' or 'rewriting'.

#### Core Trade-offs

- **Pro: Reduces Cost of Change**
    - The primary benefit is economic. A clean, well-structured codebase is cheaper and faster to modify, allowing new features to be delivered more quickly.
- **Pro: Improves Bug Detection**
    - Simplifying complex logic and removing duplication can reveal hidden bugs and makes the code easier to reason about, preventing future bugs.
- **Con: Requires Time and Discipline**
    - Refactoring is an investment. It takes time away from writing new features, which can be difficult to justify to non-technical stakeholders who may not see the immediate value.
- **Con: Risk of Introducing Errors**
    - If performed without a comprehensive automated test suite, refactoring is extremely risky. A lack of tests is the single biggest impediment to effective refactoring.

## Connections

```
                      (Parent)
               Software Engineering
                         ▲
                         │
         ┌───────────────┼────────────────────────────┐
         │               │                            │
(Is a response to)┌───────────────────────────┐ (A guiding principle for)
   Code Smells    │       Refactoring         │    DRY Principle
                  └───────────────────────────┘
                         │
              ┌──────────┴──────────┐
              │                     │
       (Specific Technique)  (Specific Technique)
        Extract Method        Rename Variable
```

### Parent Concept

Refactoring is a core discipline within the broader field of [[Fundamental - Software Engineering|software engineering]], focused on maintaining code health and managing complexity over the long term.

### Child Concepts

- Common refactoring techniques include *Extract Method*, where a piece of code is turned into its own function to improve clarity and reuse, and *Rename Variable*, a simple but powerful way to make code more self-documenting.

### Related Concepts 

- The [[SWE - Code Smells & Refactoring Relationship|relationship between code smells and refactoring]] is fundamental; refactoring is the prescribed treatment for the problems identified by code smells.
- Adhering to the [[SWE - DRY (Don't Repeat Yourself) Principle|DRY principle]] often involves refactoring to centralize logic and eliminate redundant code.
- A common goal of refactoring is to create functions that follow the [[SWE - Do One Thing Principle|'Do One Thing' principle]], which results in more modular, testable, and understandable code.
- Refactoring is the primary tool used to pay down [[SWE - Technical Debt|technical debt]] in a controlled and systematic way.
## Questions

- You've identified a critical module that is functional but very difficult to understand (high technical debt). You estimate a two-week refactoring effort is needed. How do you justify this 'non-feature' work to a product manager who is focused on a tight deadline for a new feature that depends on this module?
- Imagine a large, legacy monolithic application with no automated test suite. What strategy would you propose to begin refactoring it safely, and how would you measure the improvement in code quality and developer velocity over time?
- What if you were on a team where the 'move fast and break things' culture meant that any form of refactoring was actively discouraged in favor of shipping features. What are the top three metrics you would track to prove, with data, that this approach is becoming unsustainable?