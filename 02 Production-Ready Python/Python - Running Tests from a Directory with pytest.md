---
tags: 
  - core
  - python
  - pytest
  - test discovery
  - test suite
  - directory testing
  - cli
  - concept
source: 
  - "[[Introduction to Testing in Python]]"
related: 
  - "[[Python - Invoking pytest from the CLI]]"
  - "[[Python - Running a Single Test File with pytest]]"
  - "[[Python - Filtering pytest Tests by Keyword (-k flag)]]"
  - "[[Python - pytest CLI Cheatsheet]]"
  - "[[Python - Command-Line Interface (CLI)]]"
  - "[[SWE - Software Engineering for Data Scientists]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Python - Error Handling]]"
  - "[[Python - Functions]]"
  - "[[Python - Importing Packages]]"
  - "[[Fundamental - Version Control]]"
  - "[[Fundamental - MLOps]]"
  - "[[Python - Packages]]"
---
# Core: Running a Directory of Tests with pytest

## Summary

>Instead of executing test scripts one by one, `pytest` allows you to specify a directory as the target. It will then automatically discover and run all valid test files (e.g., `test_*.py` or `*_test.py`) and functions (e.g., `test_*`) within that directory and its subdirectories, providing a consolidated report of the results.

**Why This Matters:** This enables automated, comprehensive testing of an entire codebase by executing all test suites with a single command, which is fundamental for scalable and reliable software development.

_Analogy:_ _Think of a health inspector visiting a large restaurant. Instead of checking each dish individually as it's made ([[Python - Running a Single Test File with pytest|running a single test file]]), the inspector can perform a full kitchen inspection (`running a test directory`). They go through a checklist for the entire kitchen—storage, prep stations, cooking line—to ensure everything meets the standard. The final report summarizes the overall compliance of the entire operation, not just one plate of food._

The inspector is `pytest`. The kitchen is the test directory (`tests_underscore_dir`). Each station (storage, prep, etc.) is a separate test file (`.py`). The individual checklist items are the test functions (`test_*`). The final report is the `pytest` output. **Where it breaks down:** A health inspector might stop the entire inspection if a critical failure is found early on. By default, `pytest` will attempt to run all tests regardless of earlier failures, though this behavior can be modified with flags.

```
project_root/
│
└─── tests_underscore_dir/  <── pytest is pointed here
     │
     ├── test_script_one.py  (Collects tests from this file)
     │
     └── test_script_two.py  (And also this file)
```

## Details

Building on the ability to [[Python - Invoking pytest from the CLI|invoke pytest from the command line]], we can scale up our testing efforts significantly. Rather than pointing `pytest` to a single script, we can point it to an entire folder. The context shows this with the command `pytest tests_underscore_dir`. `pytest` intelligently scans this directory, collects all the tests from the two scripts inside, and runs them all in one go, reporting that six tests passed. This feature is a cornerstone of organizing and managing test suites in any non-trivial project, allowing for comprehensive checks with minimal effort.

#### Primary Goal

To provide a simple, scalable method for executing an entire collection of tests organized within a directory structure, without needing to specify each test file individually.

#### Mechanism

- **Step 1: Organize Test Files**
    - Create a directory (e.g., `tests/`) and place all your test script files inside it. `pytest` follows a standard discovery convention, looking for files named `test_*.py` or `*_test.py`.
- **Step 2: Navigate to the Project Root**
    - Open your terminal and navigate to the parent directory that contains your test directory. This is typically the root of your project.
- **Step 3: Run pytest on the Directory**
    - Execute the `pytest` command followed by the name of the directory containing your tests. The trailing slash is optional but can improve readability.

##### Code Translation

```bash
# --- Step 1: Assumed Directory Structure ---
# project_root/
# ├── tests_underscore_dir/
# │   ├── test_format.py
# │   └── test_math.py
# └── (other_project_files)

# --- Step 2: Navigate to Project Root ---
# (You are already in project_root/)

# --- Step 3: Execute pytest on the Directory ---
pytest tests_underscore_dir
```

 [[Code - Running a Directory of Tests with pytest Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Directory Path**
    - The primary parameter is the path to the directory you want to test. This can be a relative path (like `tests/`) or an absolute path.
- **Test Discovery Rules**
    - `pytest`'s behavior is governed by its test discovery rules. By default, it looks for files matching `test_*.py` or `*_test.py` and, within those files, functions prefixed with `test`. This convention is configurable but sticking to the default is common practice.

#### Core Trade-offs

- **Pro: Scalability and Organization**
    - This approach is highly scalable. As a project grows, you can add more test files to the directory, and they are automatically included in the test run. It encourages a clean separation of test code from application code.
- **Pro: Simplicity**
    - Running an entire suite of hundreds of tests is reduced to a single, simple command, making it ideal for automation and Continuous Integration (CI) pipelines.
- **Con: Execution Time**
    - For very large test suites, running the entire directory can be time-consuming. In such cases, it's often more efficient to use flags to run a subset of tests, such as using the `[[Python - Filtering pytest Tests by Keyword (-k flag)|-k flag to filter by keyword]]`.

## Connections

```
                  (Parent)
        Invoking pytest from the CLI
                   ▲
                   │
┌──────────────────┼──────────────────┐
│                  │                  │
(Contrasts With) ┌──────────────────────────────────────────┐ (Refined By)
Single Test File │ Running a Directory of Tests with pytest │ Keyword Filtering
                 └──────────────────────────────────────────┘
```

### Parent Concept

This method is a direct application of [[Python - Invoking pytest from the CLI|invoking pytest from the command-line interface]], scaling the concept from a single target to many.

### Child Concepts



### Related Concepts 

- This approach directly **contrasts with** [[Python - Running a Single Test File with pytest|running a single test file]], which is more targeted but less comprehensive.
- When a full directory run is too slow or broad, its functionality **can be refined by** [[Python - Filtering pytest Tests by Keyword (-k flag)|filtering tests by keyword]] to execute only a relevant subset.
- The entire process **is built upon** the fundamentals of using a [[Python - Command-Line Interface (CLI)|command-line interface]] to interact with development tools.
- A [[Python - pytest CLI Cheatsheet|pytest CLI cheatsheet]] serves as a valuable quick reference for this and other related commands.
## Questions

- In a large, multi-team project, how would you structure your test directories to balance the need for comprehensive CI/CD runs against the need for individual developers to quickly execute only the tests relevant to their changes?
- As a project grows to hundreds of test files, running the entire directory becomes a bottleneck in the CI pipeline. What strategies, beyond simple keyword filtering, would you implement to optimize test execution time without sacrificing coverage (e.g., parallelization, test selection based on code changes)?
- What if `pytest`'s automatic test discovery mechanism didn't exist? How would you build a script or tool to replicate the functionality of running all tests in a directory, and what challenges related to pathing, execution, and reporting would you anticipate?