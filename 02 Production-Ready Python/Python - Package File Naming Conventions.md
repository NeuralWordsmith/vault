---
tags: 
  - core
  - python
  - pep8
  - style_guide
  - module_naming
  - readability
  - maintainability
  - concept
source: 
  - "[[Software Engineering Principles in Python]]"
related: 
  - "[[Python - Packages]]"
  - "[[Python - Package Submodules]]"
  - "[[Python - Package Structure and Functionality]]"
  - "[[Python - Importing from Package Submodules]]"
  - "[[Python - Exposing Package Functionality with __init__.py]]"
  - "[[Python - Relative Imports in Packages]]"
  - "[[Python - Package Organization Strategy]]"
  - "[[Python - Subpackages]]"
  - "[[Python - Adding Functionality to a Package Process]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[SWE - Do One Thing Principle]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Python - Importing Packages]]"
---
# Core: File Naming Conventions for Submodules

## Summary

>The standard convention for naming Python submodule files is to use all lowercase letters and to avoid using underscores, unless doing so significantly enhances readability or for special files like `__init__.py`. This practice mirrors the naming conventions for packages themselves, promoting consistency throughout a project's structure.

**Why This Matters:** Adhering to standard file naming conventions for submodules prevents cross-platform import errors and ensures a Python package is readable, maintainable, and consistent for all contributors.

_Analogy:_ _Think of a Python package as a well-organized filing cabinet. Each drawer is a subpackage, and each file folder inside is a submodule. The naming convention is like the rule that all folder labels must be written in lowercase, simple-to-read print. You wouldn't use fancy script (CamelCase) or add a bunch of symbols (`_`) unless a longer name absolutely needed a separator to be clear, like "financial_reports_q1". This keeps the entire system uniform and easy to navigate._

{
    "Filing Cabinet": "The Python package.",
    "Drawers": "Subpackages.",
    "File Folders": "Submodule files (`.py` files).",
    "Labeling Rule (lowercase, no symbols)": "The file naming convention.",
    "Where it breaks down": "Unlike physical file labels, Python submodule names are directly used in `import` statements and become part of the program's namespace. A bad name isn't just inconvenient; it can be syntactically invalid or cause conflicts."
}

```
my_package/
├── __init__.py           # Good: Special file
├── analysis.py           # Good: Short, lowercase
├── db_connector.py       # Good: Underscore improves readability
├── visualization.py      # Good: Short, lowercase
│
└── old_style/
    ├── MyAnalysis.py     # Bad: Uses CamelCase
    └── db-connector.py   # Bad: Uses a hyphen (not a valid identifier)
```

## Details

In Python package development, consistency is key to creating maintainable and collaborative projects. The naming convention for submodule files is a fundamental aspect of this consistency, directly adopted from the PEP 8 style guide's recommendations for package naming. The core idea is simple: keep file names for your `.py` modules short, all-lowercase, and avoid underscores. This isn't just a suggestion; it helps prevent issues with case-sensitive filesystems and makes `import` statements cleaner and more predictable. The two primary rules are **use all lowercase** and **avoid underscores unless necessary**.

#### Primary Goal

To establish a universal, readable, and cross-platform compatible standard for naming module files within a Python package, thereby improving code clarity and preventing filesystem-related import issues.

#### Mechanism

- **Rule 1: All Lowercase**
    - All submodule filenames should be in `lowercase`. This avoids issues on case-sensitive filesystems (like Linux) versus case-insensitive ones (like Windows or macOS by default).
    - *Example:* `utils.py`, `models.py`, `config.py`.
    - *Avoid:* `Utils.py`, `MyModels.py`.
- **Rule 2: Avoid Underscores (with a caveat)**
    - The general preference is to use short, concise names without separators. However, if a name becomes unreadable without a separator, an underscore is permissible.
    - *Example (Preferred):* `dbutils.py` instead of `db_utils.py`.
    - *Example (Acceptable for Readability):* `data_processing_pipeline.py` is clearer than `dataprocessingpipeline.py`. The choice depends on team consensus and clarity.
- **Rule 3: Special Files**
    - Certain filenames have special meaning in Python and are exempt from these general guidelines. The most common is `__init__.py`, which is essential for marking a directory as a package and is a core part of [[Python - Exposing Package Functionality with __init__.py|exposing a package's public API]].

##### Code Translation

nothing to fill here

 [[Code - File Naming Conventions for Submodules Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **This is a convention, not a configurable parameter.**
    - **Team Agreement:** The main "lever" is team agreement on when an underscore "improves readability." This should be decided and documented in a project's style guide.
    - **Linters:** Tools like `pylint` or `flake8` can be configured to enforce or check for these naming conventions automatically, providing a mechanism for consistency.

#### Core Trade-offs

- **Clarity vs. Brevity**
    - Strictly avoiding underscores can sometimes lead to mashed-together, unreadable filenames (e.g., `userprofileauth.py`).
    - Allowing underscores for readability (`user_profile_auth.py`) makes the name longer but much clearer. The PEP 8 guideline provides this flexibility to prioritize human understanding.
- **Consistency vs. Expressiveness**
    - A rigid, no-exceptions policy ensures absolute consistency.
    - However, this can come at the cost of expressiveness, where a slightly longer, more descriptive name with an underscore would better communicate the module's purpose.

## Connections

```
                  (Parent)
            Package Submodules
                     ▲
                     │
┌────────────────────┼────────────────────┐
│                    │                    │
(Governs)     ┌───────────────────────────┐   (Part Of)
Package Structure │ File Naming Conventions   │ Package Organization
              └───────────────────────────┘
```

### Parent Concept

This concept is a direct guideline for implementing [[Python - Package Submodules|package submodules]], as it dictates how the `.py` files that constitute those modules should be named.

### Child Concepts



### Related Concepts 

- This convention is a core component of a good [[Python - Package Organization Strategy|package organization strategy]], ensuring the file structure is clean and intuitive.
- The naming of files directly impacts how you write statements for [[Python - Importing from Package Submodules|importing from package submodules]].
- It is closely related to the overall [[Python - Package Structure and Functionality|package structure]], as file names are the most granular level of that structure.
## Questions

- Your team is split on whether `userprofileauth.py` or `user_profile_auth.py` is the better submodule name. How would you facilitate a decision, and what long-term process would you implement to ensure naming consistency for future modules without stifling developer judgment?
- Imagine you're integrating a third-party legacy library into your CI/CD pipeline that uses non-standard module names (e.g., `Data-Processing.py`). What are the potential system-level failures this could cause, and how would you design a wrapper or an automated refactoring step to mitigate these risks during the build process?
- What if Python's import system was entirely case-insensitive and treated underscores and hyphens as identical characters for module resolution? What positive and negative consequences would this have on the Python ecosystem and the readability of large codebases?