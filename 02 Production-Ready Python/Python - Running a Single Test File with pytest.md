---
tags: 
  - core
  - python
  - pytest
  - cli
  - test_execution
  - module_argument
  - test_runner
  - concept
source: 
  - "[[Introduction to Testing in Python]]"
related: 
  - "[[Python - Command-Line Interface (CLI)]]"
  - "[[Python - Running Tests from a Directory with pytest]]"
  - "[[Python - Filtering pytest Tests by Keyword (-k flag)]]"
  - "[[Python - pytest CLI Cheatsheet]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[SWE - Software Engineering for Data Scientists]]"
  - "[[Python]]"
  - "[[Python - User-Defined Functions]]"
  - "[[Python - Functions]]"
  - "[[Python - Error Handling]]"
  - "[[Python - Custom Exceptions]]"
  - "[[Fundamental - Version Control]]"
---
# Core: Invoking pytest from the CLI

## Summary

>Invoking pytest from the Command-Line Interface (CLI) is the standard method for running tests. The process involves typing the `pytest` keyword, which acts as the entry point to the test runner, followed by a 'module argument'—the name of the specific Python script you want to test. This command instructs the pytest framework to discover and execute all test functions within that file and report the results directly in the terminal.

**Why This Matters:** This is the most fundamental command for executing and validating Python code with the pytest framework, providing a direct way to ensure a specific module's quality and correctness.

_Analogy:_ _Think of it like a film director holding an audition. The director (you at the terminal) wants to see a specific actor's performance. The director calls out, "Action, pytest!" (the `pytest` keyword), and then points to a specific actor, "Mr. slides dot py, you're up!" (the `slides.py` module argument). The actor then performs their scene (the tests run). Afterwards, the director and casting agents review the performance notes (the terminal output), which summarize how well the actor did (how many tests passed, failed, etc.)._

**Where it breaks down:** A film director provides subjective, creative feedback. The pytest framework provides objective, binary results based on strict, pre-written assertions. There is no room for interpretation; a test either passes or it fails.

```
[Terminal]
    │
    └──> User types: `pytest slides.py`
            │
            ▼
[pytest Framework]
    │
    └──> Executes `test_addition()` in `slides.py`
            │
            ▼
[Terminal Output]
    ├── Test Summary
    ├── Collected items: 1
    └── Status: 1 passed
```

## Details

The core idea is to use the command line as a direct interface to the pytest test runner. By issuing the command `pytest <filename.py>`, you are telling your system to use the pytest executable to analyze and run a target Python file. Pytest then takes over, automatically discovering functions that follow its naming conventions (e.g., starting with `test_`), executing them, and printing a comprehensive summary of the results, including environment details, the number of tests 'collected', and a final status of how many passed, failed, or were skipped.

#### Primary Goal

To execute all discovered tests within a single, specified Python file using the pytest framework and view the results in the terminal.

#### Mechanism

- **Step 1: Create a Test Script**
    - Write a Python file (e.g., `slides.py`) that contains one or more functions whose names begin with `test_`. These functions should contain `assert` statements to check for expected outcomes.
- **Step 2: Open the Command Line**
    - Navigate your terminal or command prompt to the directory where your `slides.py` file is saved.
- **Step 3: Run the pytest Command**
    - Type the keyword `pytest` followed by the name of your script. This is the core invocation.
- **Step 4: Analyze the Output**
    - Observe the output in the terminal. Pytest will provide a header with system information, a progress indicator (dots for passes, 'F' for failures), and a final summary detailing the number of tests passed, failed, etc.

##### Code Translation

```python
# --- Step 1: Create a test script named 'slides.py' ---

def add(x, y):
    return x + y

# Pytest will discover and run this function because it starts with 'test_'
def test_addition():
    assert add(2, 3) == 5
    assert add(-1, 1) == 0

# Pytest will NOT run this function because its name doesn't start with 'test_'
def helper_function():
    print("This won't be run by pytest")

```

```bash
# --- Step 3: Run the pytest command from your terminal ---
# (Ensure you are in the same directory as slides.py)

pytest slides.py

# --- Step 4: Expected Terminal Output (simplified) ---
# ============================= test session starts ==============================
# platform linux -- Python 3.9.12, pytest-7.1.2, pluggy-1.0.0
# rootdir: /path/to/your/project
# collected 1 item
#
# slides.py .                                                              [100%]
#
# ============================== 1 passed in 0.01s ===============================
```

 [[Code - Invoking pytest from the CLI Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Module Argument**
    - This is the primary parameter, specifying the path to the test file (e.g., `slides.py`, `tests/test_models.py`). It tells pytest exactly where to look for tests.
- **Command-Line Flags (Optional)**
    - The basic command can be modified with flags to alter its behavior. For example, adding `-v` for verbose output or `-k` to run only tests whose names match a specific keyword.

#### Core Trade-offs

- **Pro: Simplicity and Focus**
    - Running a single file is straightforward and fast. It's ideal when you are developing or debugging a specific module and want quick feedback without running the entire project's test suite.
- **Con: Poor Scalability**
    - This approach becomes tedious and inefficient in large projects with hundreds of test files. Manually specifying each file is not practical. For larger-scale testing, more advanced discovery methods are preferred, such as [[Python - Running Tests from a Directory with pytest|running pytest on a whole directory]].

## Connections

```
                 (Parent)
                   Python
                      ▲
                      │
┌─────────────────────┼─────────────────────┐
│                     │                     │
(Foundation) ┌───────────────────────────────┐ (Extension)
CLI          │ Invoking pytest from the CLI  │ Filtering Tests (-k)
             └───────────────────────────────┘
                      │
                      ▼
                 (Alternative)
        Running Tests from a Directory
```

### Parent Concept

This concept is a direct application within the [[Python]] ecosystem, as pytest is the de-facto standard framework for testing Python code.

### Child Concepts



### Related Concepts 

- This command is a specific application of interacting with a [[Python - Command-Line Interface (CLI)|command-line interface]], a common way to run development tools.
- While effective for single files, this method contrasts with [[Python - Running Tests from a Directory with pytest|running tests from a directory]], which is more scalable for larger projects.
- The basic invocation can be refined using flags, as explored in [[Python - Filtering pytest Tests by Keyword (-k flag)|filtering tests by keyword]], which allows for more granular test selection.
- This command is one of the core entries in a [[Python - pytest CLI Cheatsheet|pytest CLI cheatsheet]], which summarizes common testing commands.
## Questions

- You're working on a critical bug fix in a single module of a large e-commerce application. Your manager wants the fix deployed ASAP. Would you run the tests for just this single file, or run the entire project's test suite? Justify your decision in terms of risk, speed, and confidence in the deployment.
- In a CI/CD pipeline, how would you design a step that only runs tests for files that have been changed in a specific git commit, rather than running the entire test suite every time? What are the potential pitfalls of this 'delta testing' approach?
- What if the `pytest` command was unavailable in your system's PATH, but you still had the pytest library installed as a Python package? How could you programmatically invoke the pytest test runner from within another Python script to achieve the same result as `pytest slides.py`?