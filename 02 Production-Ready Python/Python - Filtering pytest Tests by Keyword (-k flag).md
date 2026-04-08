---
tags: 
  - core
  - python
  - pytest
  - test filtering
  - keyword selection
  - cli
  - testing
  - concept
source: 
  - "[[Introduction to Testing in Python]]"
related: 
  - "[[Python - Invoking pytest from the CLI]]"
  - "[[Python - Running a Single Test File with pytest]]"
  - "[[Python - Running Tests from a Directory with pytest]]"
  - "[[Python - Command-Line Interface (CLI)]]"
  - "[[Python - pytest CLI Cheatsheet]]"
  - "[[SWE - Software Engineering for Data Scientists]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Python - User-Defined Functions]]"
  - "[[Python - Packages]]"
  - "[[Python - Error Handling]]"
  - "[[Python]]"
---
# Core: Filtering Tests by Name with pytest

## Summary

>In Python's pytest framework, you can selectively run tests based on a keyword or expression that matches their names. This is accomplished through the `-k` flag, a powerful feature of the [[Python - Command-Line Interface (CLI)|command-line interface]] that filters the collected tests, executing only those that meet the specified criteria.

**Why This Matters:** This allows developers to rapidly isolate and debug specific functionalities by running only relevant tests, dramatically speeding up the development and troubleshooting cycle.

_Analogy:_ _Using the `-k` flag in pytest is like using the search bar in your music streaming app. Instead of playing your entire library of thousands of songs when you want to hear a specific genre, you type "Rock Ballads" into the search bar to instantly filter your collection and play only the songs that match that description._

In this analogy, the `-k` flag is the search bar, the expression you provide (e.g., "squared") is your search term, the test function names are the song titles, and the selected tests are the songs that appear in your search results. **Where it breaks down:** Unlike a simple text search, pytest's `-k` can use logical operators like `and`, `or`, and `not` for more complex filtering, making it more powerful than a basic search bar.

```
```
All Collected Tests:
[ test_add, test_number_squared, test_string_concatenation, test_another_squared_number ]
        │
        │
Filter: pytest -k "squared"
        │
        ▼
Selected & Run:
[ test_number_squared, test_another_squared_number ]
```
```

## Details

When you have a large suite of tests, running all of them can be time-consuming. To focus on a specific feature or bug, you can instruct pytest to run only tests whose names contain a certain word or expression. This is achieved by using the `-k` flag when [[Python - Invoking pytest from the CLI|invoking pytest from the command line]]. For instance, if you want to test functions related to squaring numbers, you can use `-k "squared"` to select only those tests, causing others to be deselected, as seen in the output where a subset of tests is "selected" while others are "deselected".

#### Primary Goal

To provide a flexible and efficient way to run a targeted subset of tests from a larger collection without needing to comment out code or modify test files.

#### Mechanism

- **Step 1: Define Your Test Functions**
    - Create a Python file (e.g., `test_math_operations.py`) with several test functions following pytest's naming conventions (e.g., starting with `test_`). Ensure their names are descriptive to facilitate filtering.
- **Step 2: Open the Command-Line Interface**
    - Navigate to the directory containing your test file using your terminal or command prompt.
- **Step 3: Execute pytest with the `-k` Flag**
    - Run the pytest command, specifying the test file and using the `-k` flag followed by a string expression. This expression will be used as a substring match against the test function names.

##### Code Translation

```python
# --- Step 1: Create a test file named test_math_operations.py ---
def test_add():
    assert 2 + 2 == 4

def test_number_squared():
    assert 3 * 3 == 9

def test_string_concatenation():
    assert "a" + "b" == "ab"

def test_another_squared_number():
    assert 5**2 == 25
```

```bash
# --- Step 3: Execute from the CLI ---
# This command tells pytest to run only tests in the file
# whose names contain the substring "squared".
pytest test_math_operations.py -k "squared"

# Expected Output Snippet:
# ======================== test session starts =========================
# collected 4 items / 2 deselected / 2 selected
#
# test_math_operations.py ..                                     [100%]
#
# =================== 2 passed, 2 deselected in 0.01s ==================
```

 [[Code - Filtering Tests by Name with pytest Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **The Expression String:** The primary parameter is the string that follows the `-k` flag. It can be a simple substring or a more complex logical expression.
    - **Simple Substring:** `pytest -k "squared"` matches any test with "squared" in its name.
    - **Logical OR:** `pytest -k "squared or add"` runs tests containing "squared" OR "add".
    - **Logical AND:** `pytest -k "number and squared"` runs tests containing BOTH "number" AND "squared".
    - **Logical NOT:** `pytest -k "not string"` runs all tests EXCEPT those containing "string".
    - **Combinations:** These can be combined using parentheses for grouping, e.g., `pytest -k "(number and squared) or add"`.

#### Core Trade-offs

- **Pro - Speed and Focus:** The main advantage is a much faster feedback loop. When working on a specific function, you can run its tests in seconds instead of waiting for the entire suite to complete.
- **Pro - Debugging Efficiency:** It allows you to isolate a failing test and its related tests, making it easier to pinpoint the root cause of a bug.
- **Con - Risk of Overlooking Side Effects:** By only running a subset of tests, you might miss regressions or unintended consequences your changes have on other parts of the codebase. It's crucial to run the full test suite before merging changes.
- **Con - Dependency on Naming Conventions:** The effectiveness of `-k` relies heavily on having clear, consistent, and descriptive names for your test functions. Poorly named tests are hard to filter effectively.

## Connections

```
```
                           (Parent)
               Invoking pytest from the CLI
                             ▲
                             │
┌────────────────────────────┼────────────────────────────┐
│                            │                            │
(Broader Concept) ┌──────────────────────────────────┐ (Specific Case)
CLI               │ Filtering Tests by Name (pytest) │ Running a Single Test File
                  └──────────────────────────────────┘
```
```

### Parent Concept

This method is a specific technique used when [[Python - Invoking pytest from the CLI|invoking pytest from the command line]] to control which tests are executed.

### Child Concepts



### Related Concepts 

- This is one of several ways to control test execution, complementing the simpler approach of [[Python - Running a Single Test File with pytest|running all tests within a single file]].
- It is a more granular alternative to [[Python - Running Tests from a Directory with pytest|running all tests within a directory]].
- The `-k` flag is a fundamental part of the [[Python - Command-Line Interface (CLI)|pytest command-line interface]] and a key entry in any [[Python - pytest CLI Cheatsheet|pytest CLI cheatsheet]].
## Questions

- Your team has a large, legacy test suite with inconsistent naming conventions. How would you justify the time investment to refactor test names to make features like `-k` filtering more effective, and what business metric (e.g., developer productivity, CI/CD time) would you use to measure the impact?
- You're designing a CI/CD pipeline. You want to run a quick 'smoke test' on pull requests that only executes critical tests, and then run the full suite nightly. How would you use a combination of keyword filtering (`-k`) and pytest markers (`-m`) to implement this two-tiered testing strategy, and what are the risks of this approach?
- What if the `-k` flag was removed from pytest? How would you replicate its functionality for targeted test execution during development without modifying the test code itself? Think about scripting and interacting with pytest's collection process.