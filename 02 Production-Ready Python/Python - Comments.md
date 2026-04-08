---
tags: 
  - core
  - python
  - code_readability
  - documentation
  - pound_symbol
  - inline_comment
  - block_comment
  - concept
source: 
  - "[[Software Engineering Principles in Python]]"
related: 
  - "[[Python - Code Documentation]]"
  - "[[Python - Docstrings 1]]"
  - "[[Python - Comments vs Docstrings]]"
  - "[[Python - Best Practices for Writing Comments]]"
  - "[[Fundamental - Programming]]"
  - "[[Python - Functions]]"
  - "[[Python - Variables]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[SWE - Do One Thing Principle]]"
  - "[[Python - User-Defined Functions]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Readability]]"
---
# Core: Comments

## Summary

>Comments are non-executable lines in Python code, prefixed with a pound symbol (`#`), used to add explanatory notes for human readers. They are crucial for improving code readability and are completely ignored by the Python interpreter. This is a key part of effective [[Python - Code Documentation]].

**Why This Matters:** Comments are essential for maintaining and collaborating on codebases, as they explain the 'why' behind the code, preventing future confusion and errors.

_Analogy:_ _Think of comments in code as sticky notes left in a complex instruction manual. The manual (the code) tells you *how* to assemble the furniture, but the sticky notes (the comments) explain *why* a particular screw is used in a specific spot, or offer a tip like "Be careful, this part is fragile!"._

The person assembling the furniture (the Python interpreter) completely ignores the sticky notes and just follows the main instructions. **Where it breaks down:** Unlike sticky notes which can fall off or get lost, code comments are permanently attached to the line they describe, but they can become outdated if the code changes and the comment isn't updated, leading to confusion.

```
```
# This is a block comment.
# It exists on its own lines, explaining the 'why' of the code below.

code_line_1 = "some_value"

code_line_2 = "another_value"  # This is an inline comment. It clarifies this specific line.
```
```

## Details

In Python, comments are an essential tool for making your code understandable. They are lines of text that the Python interpreter completely ignores, marked by a pound symbol (`#`). Their sole purpose is to provide context or explanations for human readers, whether that's a future collaborator or your future self. You can use them to clarify a complex line of logic, explain the reasoning behind a particular choice, or temporarily disable a piece of code. While similar in purpose to [[Python - Docstrings 1|docstrings]], comments are more informal and targeted at explaining the *how* and *why* of specific code blocks, rather than the overall purpose of a function or module. We can categorize them into two main types: **inline comments** and **block comments**.

#### Primary Goal

To improve the readability and maintainability of code by providing human-readable explanations directly within the source file.

#### Mechanism

- **Step 1: Identify the Need for a Comment**
    - Look for code that is complex, non-obvious, or makes an important assumption. This is where a comment adds value.
- **Step 2: Choose the Comment Type**
    - Decide if you need an inline comment for a single line or a block comment for a larger section.
- **Step 3: Write the Comment**
    - For an inline comment, add two spaces, then `#`, then another space, and your explanation at the end of the code line.
    - For a block comment, place the `#` at the beginning of its own line, followed by a space and your explanation.

##### Code Translation

```python
# --- Step 1 & 2: Identify Need and Choose Type ---

# This is a block comment. It explains the purpose of the function below.
# It's used for more detailed explanations that don't fit on a single line.
def calculate_area(radius):
    pi = 3.14159  # This is an inline comment. It clarifies a specific variable.
    area = pi * (radius ** 2)
    return area

# print(calculate_area(5)) # This is a commented-out line of code, used for debugging.
```

 [[Code - Comments Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Block Comments**
    - Used for longer explanations that precede a block of code. They start on a new line and apply to the subsequent code.
    - *Example: Explaining the overall goal of a complex algorithm before the implementation begins.*
- **Inline Comments**
    - Placed at the end of a line of code to explain that specific line. They are best for short, concise clarifications.
    - *Example: `x = y * 2  # Double the value to account for round-trip`*
- **Commented-Out Code**
    - A common practice during development and debugging where a line of code is temporarily disabled by turning it into a comment.
    - *Example: `# print(intermediate_value) # Temporarily disabled debug print`*

#### Core Trade-offs

- **Pro: Enhanced Readability**
    - Good comments make code easier to understand, reducing the time it takes for new developers (or your future self) to get up to speed.
- **Pro: Easier Collaboration**
    - They facilitate teamwork by communicating intent and reasoning that isn't obvious from the code itself.
- **Con: Maintenance Overhead**
    - Comments must be updated whenever the code they describe changes. Outdated comments can be more misleading than no comments at all.
- **Con: Code "Smell"**
    - Sometimes, the need for a comment indicates that the code itself is too complex and should be refactored to be more self-explanatory. The best code often needs the fewest comments.

## Connections

```
```
                      (Parent)
               Fundamental - Programming
                           ▲
                           │
           ┌───────────────┼────────────────────────────┐
           │               │                            │
(Contrasts With)  ┌───────────────────────────┐   (Best Practice)
   Docstrings     │         Comments          │   Best Practices for Writing Comments
                  └───────────────────────────┘
                           │
                           └──────────┐
                                      │
                               Code Documentation
```
```

### Parent Concept

Comments are a fundamental concept in [[Fundamental - Programming]], providing a way to annotate source code for human readers without affecting program execution.

### Child Concepts



### Related Concepts 

- Comments are a form of [[Python - Code Documentation]], serving a different but complementary purpose.
- A key distinction exists between comments and [[Python - Docstrings 1|docstrings]], which is explored in [[Python - Comments vs Docstrings]].
- Following [[Python - Best Practices for Writing Comments]] ensures that comments add clarity rather than noise.
## Questions

- Your team is behind schedule on a critical feature. Do you enforce the policy of writing detailed comments for all non-obvious code, potentially slowing down initial delivery, or do you allow the team to skip comments to meet the deadline? How would you justify the long-term cost or benefit of your choice to management?
- How would you design an automated CI/CD pipeline check to identify potentially 'stale' or outdated comments (e.g., comments that reference variables or functions that no longer exist in the modified code block) to mitigate the risk of misleading documentation in a large, rapidly evolving codebase?
- What if Python's syntax was redesigned to completely forbid comments? What alternative programming patterns, naming conventions, and code structures would you need to rely on to ensure a large, complex application remains maintainable and understandable?