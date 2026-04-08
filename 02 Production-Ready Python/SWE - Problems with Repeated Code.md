---
tags: 
  - core
  - python
  - code_duplication
  - technical_debt
  - maintainability
  - copy_paste_programming
  - code_smell
  - concept
source: 
  - "[[Writing Functions in Python]]"
related: 
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[SWE - Code Smells]]"
  - "[[SWE - Refactoring]]"
  - "[[SWE - Repeated Code & Functions Relationship]]"
  - "[[Python - User-Defined Functions]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[SWE - Do One Thing Principle]]"
  - "[[Python - Benefits of Single Responsibility Functions]]"
  - "[[Python - Scope]]"
  - "[[Python - Functions]]"
  - "[[Fundamental - Programming]]"
  - "[[SWE - Code Smells & Refactoring Relationship]]"
---
# Core: Problems with Repeated Code

## Summary

>Repeated code, often resulting from copy-pasting during exploratory work, is a common practice that becomes a major liability. It introduces two primary dangers: the high probability of introducing subtle, hard-to-find errors during duplication, and the maintenance nightmare of needing to update the same logic in multiple places. This is a classic example of a [[SWE - Code Smells|code smell]] that principles like the [[SWE - DRY (Don't Repeat Yourself) Principle|DRY principle]] are designed to prevent.

**Why This Matters:** Repeated code significantly increases the risk of bugs and makes software expensive and slow to maintain or update.

_Analogy:_ _Imagine you're writing a multi-volume fantasy series. In the first book, you write a detailed description of a magical spell. For the next five books, instead of referencing the first description, you copy and paste the entire paragraph each time the spell is cast._

The Spell Description: This is your block of code.
Copying and Pasting: This is duplicating the code block instead of creating a reusable function.
Introducing a Typo: If you make a small typo in one of the copied versions (e.g., 'firebal' instead of 'fireball'), that specific instance of the spell is now subtly broken, which is hard for a proofreader (or a debugger) to catch. This maps to the 'accidental errors' problem.
Changing the Spell's Color: If you later decide the spell should produce a *blue* flame instead of a *red* one, you now have to find and edit every single copied paragraph across all six books. If you miss one, you create an inconsistency in your world's lore. This maps to the 'multiple places to change' problem.
**Where it breaks down:** The analogy implies a static text. In code, repeated blocks might be slightly different, making it even harder to consolidate them into a single function without careful [[SWE - Refactoring|refactoring]].

```
Problem 1: Error Propagation

Original Code Block      --->      Copy & Paste      --->      Copied Block 1
    (Correct)                                                (Correct)

                           --->      Copy & Paste      --->      Copied Block 2
                                   (with a tweak)              (Contains subtle bug)

--------------------------------------------------------------------------------

Problem 2: Maintenance Nightmare

[ Code Block v1 ]      [ Code Block v1 ]      [ Code Block v1 ]
      │                      │                      │
      └───────── Bug Found Here ─────────┘
                         │
                         ▼
Must Fix Manually -> [ Code Block v2 ]  [ Code Block v2 ]  [ Code Block v2 ]
                                          (Did you find all of them?)
```

## Details

In software development, especially during research or prototyping, it's tempting to copy, paste, and tweak code snippets to quickly test new ideas. While this feels efficient in the moment, this practice, known as code duplication, is a fundamental anti-pattern. It's a primary type of [[SWE - Code Smells|code smell]] that directly violates the [[SWE - DRY (Don't Repeat Yourself) Principle|DRY principle]]. The core issue is that what saves you five minutes today can cost you hours or days of debugging and maintenance in the future. The two main categories of problems it creates are **Increased Risk of Errors** and **Maintenance Overhead**.

#### Primary Goal

To understand why code duplication is a dangerous practice that leads to fragile, hard-to-maintain software, motivating the use of abstractions like functions.

#### Mechanism

- **Problem 1: Increased Risk of Silent Errors**
    - When code is copied, it's often slightly modified. It's very easy to make a small mistake during this modification, like forgetting to rename a variable or changing a comparison operator incorrectly.
    - These errors are often 'silent' – they don't crash the program immediately but produce incorrect results that can be extremely difficult to trace back to the source, as the developer assumes the 'trusted' copied block is correct.
- **Problem 2: High Maintenance Overhead**
    - If a bug is found in the original logic, or if a new feature requires a change to that logic, the developer must hunt down every single copy of that code block.
    - Missing even one instance leads to inconsistent behavior in the application, which is a common and frustrating source of bugs. This is directly addressed by the [[SWE - Repeated Code & Functions Relationship|relationship between repeated code and functions]], where a function provides a single source of truth.

##### Code Translation

```python
# --- Problem Example: Calculating discounted prices ---

# Block 1: Calculate discount for customer A
price_a = 100
discount_rate_a = 0.10
discounted_price_a = price_a * (1 - discount_rate_a)
# A small, hard-to-spot error could be introduced during copy-paste
final_price_a = discounted_price_a + 5 # Shipping fee
print(f"Customer A final price: {final_price_a}")


# Block 2: (Copied and pasted) Calculate discount for customer B
price_b = 250
discount_rate_b = 0.15
discounted_price_b = price_b * (1 - discount_rate_b)
# The same logic is repeated
final_price_b = discounted_price_b + 5 # Shipping fee
print(f"Customer B final price: {final_price_b}")

# --- The Problems ---
# 1. Error Risk: If the "+ 5" was a bug, it's now in two places.
# 2. Maintenance: If the shipping fee changes from 5 to 7,
#    you have to find and change it in BOTH places.
#    Forgetting one introduces inconsistency.
```

 [[Code - Problems with Repeated Code Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- Not applicable. This concept describes a problem ('code smell') rather than a configurable algorithm or technique with parameters.

#### Core Trade-offs

- **Short-Term Speed vs. Long-Term Maintainability**
    - The primary tradeoff is sacrificing long-term code health for immediate, short-term velocity. Copy-pasting feels faster *right now*.
    - However, this creates 'technical debt'. The time 'saved' by not creating a proper abstraction (like a function) is paid back with interest later during debugging and updating the duplicated code.

## Connections

```
                  (Parent)
                 Code Smells
                     ▲
                     │
┌────────────────────┼────────────────────┐
│                    │                    │
(Solution)      ┌───────────────────────────┐      (Process to Fix)
   DRY          │ Problems with Repeated Code │      Refactoring
                └───────────────────────────┘
                         │
                         ▼
                (Solved By Using)
                  Functions
```

### Parent Concept

This concept is a specific and very common example of a [[SWE - Code Smells|code smell]], which are surface-level indicators of deeper problems in software design.

### Child Concepts

- This concept describes a problem, so it doesn't have 'children' in the traditional sense. However, the solutions to this problem are central software engineering concepts, such as creating [[Python - User-Defined Functions|user-defined functions]] to encapsulate logic.

### Related Concepts 

- It is the direct violation of the [[SWE - DRY (Don't Repeat Yourself) Principle|DRY (Don't Repeat Yourself) principle]], which states that every piece of knowledge must have a single, unambiguous, authoritative representation within a system.
- The process of fixing repeated code is known as [[SWE - Refactoring|refactoring]], where the code's structure is improved without changing its external behavior.
- The [[SWE - Repeated Code & Functions Relationship|relationship between repeated code and functions]] highlights how functions are the primary tool for eliminating this exact problem.
- Like other [[SWE - Code Smells|code smells]], it signals that the code may also be violating the [[SWE - Do One Thing Principle|'Do One Thing' principle]], as a larger block of code containing the duplication is likely doing too much.
## Questions

- You've discovered a critical business logic calculation is duplicated in 15 different microservices, and a bug fix is needed urgently. The 'quick fix' is to patch all 15 services, taking a full day. The 'right fix' is to create a central library, which will take a week but prevent future issues. How do you decide which path to take, and how do you explain the business risk of the 'quick fix' to a product manager who needs the feature working by tomorrow?
- Imagine you're designing a system to detect duplicated code automatically across a large monorepo with thousands of developers. What are the biggest challenges? How would you distinguish between harmful duplication and acceptable boilerplate, and how would you integrate this tool into the CI/CD pipeline to prevent new duplications without frustrating developers?
- What if you were working in a programming paradigm that had no concept of functions or methods to abstract away logic. What alternative patterns or structures could you invent to mitigate the dangers of repeated code?