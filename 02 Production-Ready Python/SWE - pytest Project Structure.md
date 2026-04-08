---
tags: 
  - core
  - swe
  - pytest
  - directory_structure
  - test_organization
  - project_layout
  - test_discovery
  - concept
source: 
  - "[[Software Engineering Principles in Python]]"
related: 
  - "[[SWE - pytest]]"
  - "[[SWE - pytest Test Discovery]]"
  - "[[SWE - Running pytest]]"
  - "[[SWE - Unit Testing]]"
  - "[[SWE - Testing Best Practices]]"
  - "[[SWE - Python Testing Frameworks]]"
  - "[[SWE - doctest]]"
  - "[[SWE - doctest vs pytest]]"
  - "[[Python - Packages]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[SWE - Do One Thing Principle]]"
  - "[[Python - Importing Packages]]"
  - "[[SWE - Benefits of Automated Testing]]"
  - "[[SWE - Comparing Objects in Tests]]"
---
# Core: pytest Directory Structure

## Summary

>The standard `pytest` convention is to place a `tests` directory at the root of the project, parallel to the main source code package. This separation keeps test code distinct from application code, which is a core principle of [[SWE - Testing Best Practices|good testing practice]]. For larger projects, this `tests` directory can be further subdivided to mirror the structure of the source package, improving organization.

**Why This Matters:** A well-organized test directory structure ensures that tests are easily discoverable, maintainable, and scalable as a project grows, preventing chaos and improving developer productivity.

_Analogy:_ _Think of your project's test suite as a library's filing system. The main `tests` directory is like the "Non-Fiction" section. For a small library, you might just have all the books on shelves in that one section. But for a massive library (a large software package), you'd create subsections like "History," "Science," and "Biography" to keep related books together. These subsections are like the `subpackage_tests` folders._

**Where it breaks down:** A library's structure is purely for human browsing. A `pytest` directory structure is also for an automated tool, [[SWE - pytest Test Discovery|pytest's test discovery mechanism]], which has specific rules it follows to find and run tests. The naming and placement of files and folders directly impact whether the tests are executed.

```
Standard Structure:
project_root/
├── my_package/
│   ├── __init__.py
│   └── module.py
└── tests/
    ├── __init__.py
    └── test_module.py

Large Package Structure:
project_root/
├── my_large_package/
│   ├── __init__.py
│   ├── subpackage1/
│   │   └── feature_x.py
│   └── subpackage2/
│       └── feature_y.py
└── tests/
    ├── __init__.py
    ├── test_subpackage1/
    │   └── test_feature_x.py
    └── test_subpackage2/
        └── test_feature_y.py
```

## Details

The recommended way to structure tests for a Python package using `pytest` is to create a dedicated `tests` directory at the same level as your main package directory. This clear separation is a fundamental concept in software engineering. While this is the most common approach, `pytest` is flexible. As shown in the provided diagram, for larger, more complex packages, it's often beneficial to create subdirectories within the `tests` folder that mirror the structure of your subpackages. This helps keep tests organized and close to the code they are verifying. This organization is crucial for how [[SWE - pytest Test Discovery|pytest discovers]] which files and functions are tests.

#### Primary Goal

To provide a clean, predictable, and scalable organization for test code that separates it from application code while making it easy for developers and tools like `pytest` to find and run tests.

#### Mechanism

- **Standard 'tests' Directory Structure:**
    - The most common and recommended layout for small to medium-sized projects.
    - A single `tests/` directory is created at the project root, alongside your source package (e.g., `my_package/`).
    - All test files (e.g., `test_module.py`) are placed directly inside this `tests/` directory.
- **Subpackage Test Structure:**
    - Used for larger packages with multiple subpackages to maintain organization and clarity.
    - The main `tests/` directory still exists at the root.
    - Inside `tests/`, you create subdirectories that correspond to the subpackages in your source code (e.g., `tests/subpackage_tests/`, `tests/subpackage2_tests/`).
    - This mirrors the application's structure, making it intuitive to find the tests for a specific piece of functionality.

##### Code Translation

nothing to fill here

 [[Code - pytest Directory Structure Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`__init__.py` files:**
    - Placing an empty `__init__.py` file in the `tests` directory (and subdirectories) helps Python recognize them as packages. This can be important for import resolution, especially in older Python versions or with certain project structures.
- **`pytest.ini` or `pyproject.toml`:**
    - These configuration files can be used to customize `pytest`'s behavior, including modifying the `testpaths` variable to tell `pytest` where to look for tests if you deviate from the standard structure.

#### Core Trade-offs

- **Standard Structure (Pros/Cons):**
    - **Pro:** Simple, flat, and easy to navigate for smaller projects.
    - **Con:** Can become cluttered and disorganized as the number of test files grows, making it hard to find relevant tests.
- **Subpackage Structure (Pros/Cons):**
    - **Pro:** Highly organized and scalable. It's immediately clear which tests correspond to which parts of the application.
    - **Con:** Adds a small amount of overhead and directory depth, which might be unnecessary for simple projects.

## Connections

```
                  (Parent)
                   pytest
                     ▲
                     │
┌────────────────────┼────────────────────┐
│                    │                    │
(Mechanism)     ┌───────────────────────────┐     (Best Practice)
Test Discovery  │ pytest Directory Structure│  Testing Best Practices
                └───────────────────────────┘
                     │
                     ▼
                 (Action)
                Running pytest
```

### Parent Concept

This concept is a fundamental aspect of using the [[SWE - pytest|pytest framework]] effectively.

### Child Concepts



### Related Concepts 

- The chosen directory structure directly influences [[SWE - pytest Test Discovery|how pytest discovers tests]] to run.
- A logical structure is a key component of [[SWE - Testing Best Practices|general testing best practices]], promoting maintainability.
- Once the structure is in place, the next step is [[SWE - Running pytest|running the tests]] from the command line.
## Questions

- At what point in a project's lifecycle (e.g., number of modules, number of developers) would you advocate for migrating from a flat `tests/` directory to a nested, subpackage-based structure, and how would you justify the refactoring effort to project management?
- How would you configure a CI/CD pipeline (like GitHub Actions) to run only the tests relevant to a specific subpackage that was changed in a pull request, leveraging the nested directory structure?
- What if your project had a hard requirement to place test files directly alongside the source files they test (e.g., `my_package/module.py` and `my_package/test_module.py`)? What `pytest` configuration changes would be needed, and what are the long-term maintainability risks of this 'tests-in-source' approach compared to the standard 'tests-out-of-source' structure?