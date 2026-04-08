---
tags: 
  - core
  - python
  - code_readability
  - maintainability
  - documentation
  - best_practices
  - annotations
  - concept
source: 
  - "[[Software Engineering Principles in Python]]"
related: 
  - "[[Python - Code Documentation]]"
  - "[[Python - Docstrings 1]]"
  - "[[Python - Comments vs Docstrings]]"
  - "[[Fundamental - Programming]]"
  - "[[SWE - Software Engineering for Data Scientists]]"
  - "[[Python - User-Defined Functions]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Python 5 - Docstrings]]"
  - "[[Python - Docstring Formatting Styles]]"
  - "[[Python - Functions]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Python - Anatomy of a Docstring 1]]"
  - "[[Python - Accessing Docstrings]]"
---
# Core: Comments

## Summary

>Comments are explanatory notes within the source code of a program that are ignored by the interpreter or compiler. Their primary purpose is to make the code more understandable for humans, not to affect the program's execution. They are a fundamental part of [[Python - Code Documentation]].

**Why This Matters:** Effective comments are crucial for long-term software maintainability, as they preserve the original developer's intent and business logic, saving future teams countless hours of reverse-engineering complex code.

_Analogy:_ _Think of code comments as the 'director's commentary' on a movie's DVD. The movie itself is the code—it executes and tells the story. The commentary, however, provides behind-the-scenes insight. The director doesn't just describe what's happening on screen (the 'what'); they explain *why* they chose a particular camera angle, what challenges they faced during a scene, or the subtext behind a character's line (the 'why')._

A good comment, like good commentary, reveals the intent and context that isn't obvious from the final product alone.

*   **Where it breaks down:** Director's commentary is a separate track from the film. Code comments are embedded directly within the code. If the code (the film) is edited, but the comments (the commentary) are not updated, they can become outdated and dangerously misleading, a problem known as 'comment rot'.

```
Code without 'Why' Comment:
+---------------------------------+
|                                 |
|   `tolerance = 0.01`            |  <--- A developer thinks: "Why 0.01? Is this arbitrary?"
|                                 |
+---------------------------------+

Code with 'Why' Comment:
+---------------------------------+
|   # Per business requirement BR-2.4, the sensor drift
|   # must be considered negligible if under 1%.
|   `tolerance = 0.01`            |
|                                 |  <--- Developer understands the business context.
+---------------------------------+
```

## Details

In programming, comments are annotations written for human readers. While there's some debate on their utility, the consensus is that good comments are invaluable. A critical rule of thumb is that comments should explain **why** a piece of code exists, not **what** it does. The 'what' should be evident from well-written, self-documenting code. However, the business logic, the trade-offs considered, or the reason for choosing a non-obvious solution can only be captured in a comment. As the context suggests, it's generally safer to add a comment you're unsure about than to leave future developers in the dark.

#### Primary Goal

To improve the readability, clarity, and maintainability of source code by providing context and explaining the programmer's intent.

#### Mechanism

- **How it Works:**
    1.  **Syntax:** In Python, a comment is created by placing a hash symbol (`#`) before the text. Everything from the `#` to the end of the line is treated as a comment.
    2.  **Interpreter Behavior:** When the Python interpreter executes the script, it completely ignores these lines. They have zero impact on the program's performance or logic.
- **'What' Comments (The Anti-Pattern):**
    - These comments simply restate what the code is doing in plain English. They are often redundant and add clutter, as the code should be clear enough to speak for itself.
    - *Example: `x = x + 1  # Increment x by 1`*
- **'Why' Comments (The Best Practice):**
    - These comments provide valuable context that is impossible to infer from the code alone. They explain the purpose, the constraints, or the reason for a particular implementation choice.
    - *Example: `x = x + 1  # We need to offset the index by one to account for the header row in the file`*

##### Code Translation

```python
# --- Example of a 'What' Comment (Less Useful) ---
def calculate_velocity(distance, time):
    # Return distance divided by time
    return distance / time

# --- Example of a 'Why' Comment (Much More Useful) ---
def get_user_retries(user_id):
    # The database call is expensive, so we've implemented a cache.
    # However, for admin users (ID < 10), we must bypass the cache
    # to ensure they always see the absolute latest data for debugging.
    if user_id < 10:
        return db.get_retries_bypassing_cache(user_id)
    else:
        return cache.get_retries(user_id)
```

 [[Code - Comments Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Guidelines for Effective Comments:**
    - **Focus on 'Why':** Always prioritize explaining the intent behind the code, not just translating the code to English.
    - **Keep Them Updated:** When you change the code, change the comment. Outdated comments are worse than no comments.
    - **Don't Be a Crutch:** Don't use comments to justify or explain confusing code. Refactor the code to be clearer first.
    - **Be Concise:** Write comments that are as short as possible while still being clear.

#### Core Trade-offs

- **Pros (Well-Written Comments):**
    - **Improved Maintainability:** Makes it easier for other developers (or your future self) to understand, debug, and extend the code.
    - **Knowledge Preservation:** Captures critical business logic or design decisions that might otherwise be lost.
    - **Faster Onboarding:** Helps new team members get up to speed on a complex codebase more quickly.
- **Cons (Poorly-Written or Unmaintained Comments):**
    - **Comment Rot:** Comments can become outdated as the code evolves, leading to confusion and bugs.
    - **Code Clutter:** Over-commenting, especially with obvious 'what' comments, can make the code harder to read.
    - **Maintenance Overhead:** Requires discipline to keep comments synchronized with code changes.

## Connections

```
          (Parent)
      Code Documentation
             ▲
             │
┌────────────┼────────────┐
│            │            │

(Contrasts With)  ┌──────────┐  (Related Standard)
   Docstrings     │ Comments │  Self-Documenting Code
                  └──────────┘
```

### Parent Concept

Comments are a primary form of [[Python - Code Documentation]], providing inline explanations for code logic.

### Child Concepts



### Related Concepts 

- Comments are often contrasted with [[Python - Docstrings 1|docstrings]], which are meant for documenting the public API of modules, classes, and functions, rather than the internal logic of an implementation.
- The need for extensive comments can sometimes be reduced by adhering to the [[SWE - DRY (Don't Repeat Yourself) Principle|DRY principle]], as well-factored, non-repetitive code is often more self-explanatory.
- A detailed comparison highlights the distinct roles of [[Python - Comments vs Docstrings|comments and docstrings]] in a well-documented Python project.
## Questions

- You've inherited a critical but uncommented legacy codebase. The deadline for a new feature is tight. Do you spend time retroactively commenting the old code to improve long-term maintainability, or do you focus solely on the new feature to meet the deadline? How do you justify the business risk of your choice?
- How would you implement an automated linting rule in a CI/CD pipeline to enforce a 'comment quality' standard (e.g., flagging 'what' comments or ensuring comments exist for complex logic) across a large engineering team, and what are the potential pitfalls of such automation?
- What if you were forced to work on a project where comments were completely forbidden? What specific changes would you enforce in coding style, naming conventions, and function design to ensure the codebase remains understandable and maintainable?