---
tags: 
  - major_core
  - python
  - pytest
  - testing
  - decorators
  - test_organization
  - selective_execution
  - concept
source: 
  - "[[Introduction to Testing in Python]]"
related: 
  - "[[Python - Packages]]"
  - "[[Python - Decorators]]"
  - "[[Python - Functions]]"
  - "[[Python - Pytest Markers & Decorators Relationship]]"
  - "[[Python - Pytest skip Marker]]"
  - "[[Python - Pytest skipif Marker]]"
  - "[[Python - Pytest xfail Marker]]"
  - "[[SWE - Software Engineering for Data Scientists]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Python - User-Defined Functions]]"
  - "[[Python]]"
---
# Major Core: Pytest Markers

## Summary

> A pytest marker is a special tag or label that you can apply to a test function or class using a decorator. These markers act like metadata, allowing you to group tests and then run or skip specific groups from the command line, providing fine-grained control over test execution.

**Why This Matters:** Pytest markers are essential for managing complex test suites, enabling you to selectively run specific tests (like only fast 'smoke tests' or only 'slow' integration tests) to get faster feedback and optimize your CI/CD pipeline.

_Analogy:_ _Think of pytest markers like color-coded sticky notes you put on files in a filing cabinet. The cabinet is your entire test suite, and each file is a test. You might use a red sticky note for 'Urgent', a blue one for 'Archive', and a green one for 'Needs Review'. When your boss asks for only the urgent files, you don't have to open every single file; you just grab all the ones with a red sticky note. Similarly, pytest lets you 'run all tests with the `slow` marker' without having to manually pick them out._

In this analogy:
- **Filing Cabinet:** The entire collection of tests in your project.
- **Individual Files:** Single test functions.
- **Color-Coded Sticky Notes:** The pytest markers (e.g., `@pytest.mark.slow`, `@pytest.mark.api`).
- **Asking for Specific Files:** Running tests selectively from the command line (e.g., `pytest -m slow`).

**Where it breaks down:** Unlike simple sticky notes, some pytest markers can carry extra information or have built-in logic. For example, the [[Python - Pytest skipif Marker|skipif marker]] includes a condition that determines *whether* the test should be skipped, which is more advanced than a static label.

```
Test Suite Execution Flow

[test_suite.py] ───────> [pytest] ──────────> [Run All Tests]
     │                                            ▲
     │                                            │
     │                                      (Default Behavior)
     │
     │
     ├─ @pytest.mark.fast
     │
     ├─ @pytest.mark.slow
     │
     └─ @pytest.mark.api

[test_suite.py] ───────> [pytest -m "fast"] ───> [Run Only 'fast' Tests]
```

## Details

In the pytest library, a marker is a way to tag a test with custom metadata. This is achieved using Python's decorator syntax, specifically by adding `@pytest.mark.` followed by the desired marker name directly above a test function. The primary purpose of these markers is to categorize your tests, allowing you to create logical groups. Once tagged, you can instruct pytest to run only the tests that have a certain marker, or to exclude them. This provides a powerful mechanism for managing which tests are executed in different scenarios, such as running quick unit tests during development versus running comprehensive, slow integration tests in a CI pipeline. Common built-in markers include specialized ones for controlling test outcomes, such as **[[Python - Pytest skip Marker|skip]]**, **[[Python - Pytest skipif Marker|skipif]]**, and **[[Python - Pytest xfail Marker|xfail]]**.

#### Primary Goal

To categorize tests into groups so they can be selectively included or excluded during a test run.

#### Mechanism

- **Step 1: Import Pytest**
    - Ensure the `pytest` library is available in your environment. No explicit import is needed in the test file itself for markers to work.
- **Step 2: Define Test Functions**
    - Create standard Python functions whose names start with `test_`.
- **Step 3: Apply the Marker Decorator**
    - Above the function definition, add the decorator `@pytest.mark.your_marker_name`. You can invent any marker name that is a valid Python identifier. A test can have multiple markers.
- **Step 4: Run Tests Selectively**
    - From your terminal, use the `-m` flag followed by the marker name to run only the tests with that marker. For example, `pytest -m slow`.
    - You can also use boolean logic, like `pytest -m "slow and not api"` to run tests marked `slow` but not those marked `api`.

```python
import pytest

# --- Step 2 & 3: Define tests and apply markers ---

@pytest.mark.slow
def test_slow_database_query():
    # Simulates a slow test
    import time
    time.sleep(1)
    assert True

@pytest.mark.fast
def test_fast_arithmetic():
    # A quick unit test
    assert 2 + 2 == 4

@pytest.mark.slow
@pytest.mark.api
def test_slow_api_call():
    # A test with multiple markers
    import time
    time.sleep(1)
    assert True

# --- Step 4: Run from the terminal ---

# To run only the fast tests:
# > pytest -m fast

# To run only the slow tests:
# > pytest -m slow

# To run only tests that are slow AND related to the api:
# > pytest -m "slow and api"
```

 [[Code - Pytest Markers Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Marker Name**
    - The primary 'parameter' is the name you give the marker (e.g., `slow`, `smoke`, `regression`). This name is used with the `-m` flag to select tests.
- **Marker Arguments**
    - Some built-in markers, like `skipif` and `xfail`, accept arguments to add conditional logic. For example, `@pytest.mark.skipif(sys.version_info < (3, 8), reason="requires python3.8 or higher")`.

#### Core Trade-offs

- **Pro: Enhanced Organization and Flexibility**
    - Markers provide a clean, declarative way to categorize tests, making it easy to manage large test suites and run specific subsets for different purposes (e.g., pre-commit hooks, nightly builds).
- **Con: Risk of Marker Sprawl and Typos**
    - Without a clear convention, teams can create too many markers, making the system confusing. Furthermore, a typo in a marker name (e.g., `@pytest.mark.regrssion`) will cause pytest to silently ignore that test when you run `pytest -m regression`, unless you use the `--strict-markers` configuration option to catch unregistered markers.

## Connections

```
                      (Parent)
                 Python - Packages
                         ▲
                         │
           ┌─────────────┼──────────────┐
           │             │              │
(Foundation)    ┌──────────────────┐    (Relationship)
Decorators      │  Pytest Markers  │    Markers & Decorators
                └──────────────────┘
                         │
           ┌─────────────┴──────────────┐
           │             │              │
         skip          skipif         xfail
      (Child)       (Child)        (Child)
```

### Parent Concept

Pytest markers are a feature provided by the [[Python - Packages|pytest package]], a popular third-party library for testing in Python.

### Child Concepts

- A common built-in marker is [[Python - Pytest skip Marker|skip]], which unconditionally prevents a test from running.
- The [[Python - Pytest skipif Marker|skipif]] marker provides more control by only skipping a test if a specific condition is met.
- Another useful marker is [[Python - Pytest xfail Marker|xfail]], which indicates that a test is expected to fail, so a failure does not break the entire test suite run.

### Related Concepts 

- The implementation of markers is fundamentally built upon the concept of [[Python - Decorators|Python decorators]].
- Understanding the [[Python - Pytest Markers & Decorators Relationship|relationship between markers and decorators]] clarifies how pytest is able to attach this metadata to functions.
- The `skip` marker is a direct application of this concept for unconditionally ignoring tests.
- The `skipif` marker contrasts with `skip` by adding conditional logic to the skipping behavior.
## Questions

- Imagine you're designing the testing strategy for a large microservices project. How would you establish a convention for pytest markers (e.g., for unit, integration, contract, and end-to-end tests) to balance providing fast feedback to developers on pre-commit hooks versus ensuring comprehensive coverage in the main CI/CD pipeline?
- In a large, distributed team, how would you programmatically enforce a consistent and documented set of pytest markers to prevent 'marker sprawl' and ensure that a new developer understands exactly what `@pytest.mark.critical_path` implies without having to ask?
- What if you were forbidden from using the `@pytest.mark` decorator? How would you achieve the same goal of selectively running subsets of your test suite using only a combination of file naming conventions, test function name prefixes, and directory structures?
