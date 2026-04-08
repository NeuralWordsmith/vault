---
tags: 
  - major_core
  - python
  - dry
  - single_responsibility
  - modularity
  - refactoring
  - code_design
  - concept
source: 
  - "[[Writing Functions in Python]]"
related: 
  - "[[Fundamental - Software Engineering]]"
  - "[[SWE - Refactoring]]"
  - "[[SWE - Code Smells]]"
  - "[[SWE - Do One Thing Principle]]"
  - "[[Python - Benefits of Single Responsibility Functions]]"
  - "[[SWE - Problems with Repeated Code]]"
  - "[[SWE - Repeated Code & Functions Relationship]]"
  - "[[Python - User-Defined Functions]]"
  - "[[Python - Functions]]"
  - "[[Python - Scope]]"
  - "[[Fundamental - Programming]]"
  - "[[Python - Nested Functions]]"
---
# Major Core: DRY and Do One Thing Principles

## Summary

> DRY (Don't Repeat Yourself) and the "Do One Thing" principle (also known as the Single Responsibility Principle) are two fundamental software engineering guidelines for writing clean, modular code. DRY focuses on eliminating redundancy by ensuring every piece of knowledge has a single, authoritative representation. "Do One Thing" dictates that a function or module should have one, and only one, reason to change, meaning it should perform a single, well-defined task.

**Why This Matters:** Adhering to these principles is the foundation for creating software that is easy to maintain, debug, and extend, directly reducing long-term development costs and the likelihood of introducing bugs.

_Analogy:_ _Imagine a professional kitchen. The DRY principle is like having a single, master recipe book. If you need to change the salt content for the signature sauce, you change it in one place, and every chef using that recipe is instantly updated. The "Do One Thing" principle is like having specialized kitchen tools. You have a whisk for whisking, a knife for chopping, and a blender for blending. You wouldn't use a blender to chop an onion because it's the wrong tool for the job and would do it poorly. Each tool does one thing exceptionally well._

The master recipe book represents a single source of truth for logic (a function). The specialized tools represent functions with a single responsibility. Each chef is a part of the program that needs to use that logic or tool.

*   **Where it breaks down:** This analogy doesn't fully capture the potential for over-abstraction. In software, creating too many tiny, specialized functions (tools) for a simple task can sometimes make the overall process (the full recipe) harder to follow than using a slightly more generalized tool.

```
BEFORE:
┌──────────────────────────────────┐
│                                  │
│   process_user_data_and_save()   │
│   - Loads data                   │
│   - Formats names (UPPERCASE)    │
│   - Saves data                   │
│                                  │
└──────────────────────────────────┘

AFTER:
┌──────────────┐   ┌──────────────────┐   ┌──────────────┐
│  read_data() │──>│  process_lines() │──>│ write_data() │
└──────────────┘   └──────────────────┘   └──────────────┘
                         │
                         ▼
                  ┌──────────────────┐
                  │ format_user_name() │
                  └──────────────────┘
```

## Details

In software engineering, DRY and "Do One Thing" are guiding principles for designing functions and modules. They are proactive strategies to prevent common issues like those described in [[SWE - Problems with Repeated Code|problems with repeated code]]. By avoiding duplication (DRY) and ensuring each component has a narrow, well-defined purpose ("Do One Thing"), developers create a codebase that is more predictable, easier to test, and simpler to modify without causing unintended side effects. These principles are the antidote to monolithic, tangled code and are often the primary goals of [[SWE - Refactoring|refactoring]].

#### Primary Goal

To produce code that is highly maintainable, reusable, and testable by reducing complexity and eliminating redundancy.

#### Mechanism

- **How They Work Together:**
    1.  **Identify Logic:** A developer identifies a piece of logic or a task within the codebase.
    2.  **Isolate (Do One Thing):** They create a function that is responsible for *only* that specific task. This makes the function's purpose clear and its behavior predictable, highlighting the [[Python - Benefits of Single Responsibility Functions|benefits of single responsibility]].
    3.  **Abstract (DRY):** If that same logic is needed elsewhere, instead of copying and pasting the code, the developer calls the newly created function. This establishes a single source of truth for that logic, embodying the [[SWE - Repeated Code & Functions Relationship|relationship between functions and avoiding repetition]].
- **DRY (Don't Repeat Yourself):**
    - Focuses on reducing the repetition of information and logic. If you find yourself copying and pasting code, it's a strong signal that you should create an abstraction, typically a function.
    - *Example:* Instead of writing the same data validation code in three different places, you write one `validate_data()` function and call it in all three locations.
- **Do One Thing (Single Responsibility Principle):**
    - Focuses on cohesion and scope. A function should not be a "Swiss Army knife" that loads data, cleans it, trains a model, and saves the results. Each of those actions should be its own function.
    - *Example:* A function named `calculate_and_format_report` violates this principle. It should be broken into two functions: `calculate_report_data()` which returns the raw data, and `format_report(data)` which takes the data and formats it for display.

```python
# --- BEFORE: Violates DRY and "Do One Thing" ---
# This function does three things: loads, processes, and saves.
# The processing logic is specific and might be repeated elsewhere.
def process_user_data_and_save(file_path):
    # 1. Load data (Thing 1)
    with open(file_path, 'r') as f:
        lines = f.readlines()

    # 2. Process data (Thing 2)
    processed_data = []
    for line in lines:
        user, email = line.strip().split(',')
        # Repetitive logic: formatting the user's name
        formatted_name = user.strip().upper()
        processed_data.append(f"{formatted_name},{email}")

    # 3. Save data (Thing 3)
    with open('processed_' + file_path, 'w') as f:
        for item in processed_data:
            f.write(item + '\n')

# --- AFTER: Adhering to principles ---

# Does ONE thing: formats a name (Reusable and DRY)
def format_user_name(name):
    return name.strip().upper()

# Does ONE thing: processes a list of lines
def process_lines(lines):
    processed_data = []
    for line in lines:
        user, email = line.strip().split(',')
        # Call the single-responsibility function (DRY)
        formatted_name = format_user_name(user)
        processed_data.append(f"{formatted_name},{email}")
    return processed_data

# Does ONE thing: reads a file
def read_data(file_path):
    with open(file_path, 'r') as f:
        return f.readlines()

# Does ONE thing: writes to a file
def write_data(file_path, data):
    with open(file_path, 'w') as f:
        for item in data:
            f.write(item + '\n')

# The main script now composes these simple, testable functions
input_file = 'users.csv'
output_file = 'processed_users.csv'

raw_lines = read_data(input_file)
final_data = process_lines(raw_lines)
write_data(output_file, final_data)
```

 [[Code - DRY and Do One Thing Principles Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Guiding Questions for Application:**
    - **For 'Do One Thing':** Can I describe what this function does without using the word 'and'?
    - **For 'Do One Thing':** If I were to write a test for this function, would I be testing multiple distinct outcomes?
    - **For DRY:** If I need to change a piece of business logic (e.g., a tax rate, a formatting rule), how many files do I have to edit?
    - **For DRY:** Have I copied and pasted more than one line of code recently? If so, can it be turned into a function?

#### Core Trade-offs

- **Over-Abstraction:**
    - Applying DRY too aggressively can lead to complex code where simple operations are hidden behind many layers of function calls, making the logic difficult to trace.
- **Premature Generalization:**
    - Creating an abstraction for a piece of code that is only used once might be unnecessary. It's sometimes better to wait until code is repeated three times before refactoring (the 'Rule of Three').
- **Subjectivity:**
    - The definition of "one thing" can be subjective and vary between developers and teams, sometimes leading to debates over the appropriate level of decomposition.

## Connections

```
                    (Parent)
            Software Engineering
                       ▲
                       │
┌──────────────────────┼──────────────────────┐
│                      │                      │
(Identifies)    ┌──────────────────────────┐    (Fixes via)
Code Smells     │ DRY & Do One Thing       │    Refactoring
                └──────────────────────────┘
                           │
            ┌──────────────┴──────────────┐
            │                             │
      DRY Principle        Do One Thing Principle
```

### Parent Concept

These principles are a cornerstone of modern [[Fundamental - Software Engineering|software engineering]], guiding the creation of clean and maintainable systems.

### Child Concepts

- The [[SWE - Do One Thing Principle|'Do One Thing' principle]], also known as the Single Responsibility Principle, is a direct component of this philosophy, focusing on functional cohesion.

### Related Concepts 

- The process of applying these principles to improve existing code is known as [[SWE - Refactoring|refactoring]].
- Violations of these principles are primary examples of [[SWE - Code Smells|code smells]], which indicate deeper problems in a codebase.
- These principles directly address the maintenance and bug-proneness issues outlined in [[SWE - Problems with Repeated Code|problems with repeated code]].
- The implementation of DRY is fundamentally tied to the [[SWE - Repeated Code & Functions Relationship|relationship between repeated code and functions]].
## Questions

- Imagine a critical feature needs to be shipped by the end of the day. You find a block of code that could be refactored into a DRY, single-responsibility function, but doing so would take several hours and risk introducing bugs. Do you repeat the code to ship on time, or do you refactor and risk the deadline? How do you justify this technical debt to your project manager?
- In a large microservices architecture, how can you enforce the DRY principle for common business logic (e.g., user authentication) that needs to be shared across multiple independent services written in different languages, without creating a tightly coupled system?
- What if you were working on a codebase for a deep learning experiment where rapid iteration and tweaking small, isolated parts of a data processing pipeline was more important than long-term maintainability? In this scenario, could aggressively applying DRY and 'Do One Thing' actually hinder productivity? Where is the line?
