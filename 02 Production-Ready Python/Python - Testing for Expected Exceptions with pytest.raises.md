---
tags: 
  - core
  - python
  - exception_testing
  - context_manager
  - pytest
  - error_handling
  - test-driven_development
  - concept
source: 
  - "[[Introduction to Testing in Python]]"
related: 
  - "[[Python - Pytest Framework]]"
  - "[[Python - Software Testing]]"
  - "[[Python - Testing with pytest]]"
  - "[[Python - Assert Statement for Testing]]"
  - "[[Python - Context Managers]]"
  - "[[Python - Error Handling]]"
  - "[[Python - Custom Exceptions]]"
  - "[[Python - Importance of Software Testing]]"
  - "[[Python - Airplane Pre-Flight Check Analogy for Testing]]"
  - "[[SWE - Software Engineering for Data Scientists]]"
  - "[[Python - Functions]]"
  - "[[Python - Decorators]]"
  - "[[Python - with Statement]]"
  - "[[Fundamental - Software Engineering]]"
---
# Core: Pytest Raises

## Summary

>`pytest.raises` is a context manager provided by the [[Python - Pytest Framework|Pytest framework]] to assert that a specific block of code raises an expected exception. It is a fundamental tool in [[Python - Software Testing|software testing]] for verifying that error-handling logic works as intended, offering a more readable and direct alternative to using a standard `try...except` block.

**Why This Matters:** It provides a clean and explicit way to verify that your code correctly handles and raises expected errors, which is crucial for building robust and predictable software.

_Analogy:_ _Using `pytest.raises` is like conducting a fire drill. The entire purpose of a fire drill is to test if the alarm system works when you intentionally trigger it. You don't want the alarm going off during normal operations, but during the drill, you *expect* it to sound. If the alarm sounds, the drill is a success. If it stays silent, or a different alarm (like a burglar alarm) goes off, the drill has failed._

In this analogy:
- **The Fire Drill:** The test scenario set up by the `with pytest.raises(...)` block.
- **Pulling the Fire Alarm Lever:** The specific line of code that is supposed to cause an error, like `division(a=25, b=0)`.
- **The Alarm Sounding:** The expected exception being raised, such as `ZeroDivisionError`.
- **A Successful Drill:** The test passes because the expected exception was raised.
- **A Failed Drill:** The test fails if no exception is raised, or if an unexpected exception occurs.
- **Where it breaks down:** A fire drill is a simulation. `pytest.raises` tests the *actual* code execution path, not a simulation. It's a real test of the system's response to a specific, intentional failure-inducing input.

```
Test Function Execution Flow

    Test Starts
        │
        ▼
+--------------------------------------+
| with pytest.raises(ExpectedError):   |  <-- Sets up an "exception trap"
|       │                              |
|       ▼                              |
|   code_that_should_raise_error()     |
+--------------------------------------+
        │
        ├─> ExpectedError is raised? ───> [TEST PASSES]
        │
        └─> No exception / Wrong exception? ───> [TEST FAILS]
```

## Details

`pytest.raises` is a specialized tool within the [[Python - Pytest Framework|Pytest framework]] designed for a common scenario in [[Python - Software Testing|software testing]]: verifying that code fails correctly. Good software should not only work under normal conditions but also behave predictably when it encounters errors. Instead of manually writing `try...except` blocks and using an [[Python - Assert Statement for Testing|assert statement]] to check if an error was caught, `pytest.raises` provides a more readable and idiomatic syntax. It leverages the concept of [[Python - Context Managers|Python's context managers]] to create a temporary 'exception-catching' environment for a specific piece of code.

#### Primary Goal

To cleanly and explicitly test that a specific piece of code raises a specific exception under a given set of conditions.

#### Mechanism

- **Step 1: Import Pytest**
    - Begin by importing the `pytest` library into your test file.
- **Step 2: Define the Test Function**
    - Create a standard test function, ensuring its name starts with `test_` so that the [[Python - Pytest Framework|Pytest test runner]] discovers it.
- **Step 3: Use the `with` Statement**
    - Use `pytest.raises` as a context manager by writing a `with` statement. Pass the exception class you expect to be raised as the argument, for example, `with pytest.raises(ZeroDivisionError):`.
- **Step 4: Trigger the Exception**
    - Inside the indented `with` block, write the single line of code that you expect to trigger the specified exception.
- **Step 5: Interpret the Result**
    - If the code inside the `with` block raises the expected exception, the code block is exited, and the test passes. If it raises a different exception or no exception at all, the test fails.

##### Code Translation

```python
import pytest

# --- A function to test ---
def division(a, b):
    # This function is intentionally simple to demonstrate the test.
    # In a real application, it might have more complex error handling.
    if b == 0:
        raise ZeroDivisionError("Denominator cannot be zero")
    return a / b

# --- A test function using pytest.raises ---
def test_division_by_zero():
    # Step 1 & 2 are implicit (file is a test file, function starts with test_)
    
    # Step 3: Use the `with` statement with pytest.raises
    with pytest.raises(ZeroDivisionError):
        # Step 4: Trigger the exception
        division(a=25, b=0)

# To run this, save it as a Python file (e.g., test_division.py) 
# and run `pytest` in your terminal.
# Step 5: Pytest will report that the test passes.
```

 [[Code - Pytest Raises Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`expected_exception` (Positional Argument)**
    - This is the primary argument. It must be an exception class (e.g., `ValueError`, `TypeError`) or a tuple of exception classes. The test passes if an instance of any of these classes is raised.
- **`match` (Keyword Argument)**
    - An optional string containing a regular expression. If provided, the test only passes if the raised exception's message matches the pattern. This is useful for verifying not just the *type* of error, but the specific error message itself.
    - Example: `with pytest.raises(ValueError, match=r"invalid literal for int.*"):`

#### Core Trade-offs

- **Pro: Readability and Intent**
    - The syntax `with pytest.raises(SomeError):` makes the test's purpose immediately clear: this block of code is *expected* to fail in a specific way. This is much more declarative than a `try/except` block.
- **Pro: Conciseness**
    - It eliminates the boilerplate of a `try...except...else...pytest.fail()` pattern, leading to shorter and cleaner test code.
- **Con: Potential to Mask the True Point of Failure**
    - The test passes if the expected exception is raised *anywhere* within the `with` block. If you have multiple lines of code in the block, and an earlier line than expected raises the error, the test will still pass, potentially hiding a bug.
    - Best Practice: Keep the code inside the `with pytest.raises` block as minimal as possible, ideally a single function call.

## Connections

```
                      (Parent)
                  Pytest Framework
                         ▲
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                    │
(Builds On)     ┌──────────────────┐      (Tool For)
Context Managers  │  Pytest Raises   │      Software Testing
                  └──────────────────┘
                         │
                         ▼
                  (Alternative To)
           try/except + assert statement
```

### Parent Concept

`pytest.raises` is a specific tool provided by the [[Python - Pytest Framework|Pytest framework]] for writing robust tests.

### Child Concepts



### Related Concepts 

- It is a fundamental tool for [[Python - Testing with pytest|testing with pytest]], enabling developers to validate error-handling paths.
- It serves a similar purpose to a `try...except` block combined with an [[Python - Assert Statement for Testing|assert statement]], but provides a more idiomatic and readable syntax for tests.
- This tool builds upon the general Python concept of [[Python - Context Managers]], which manage the setup and teardown of a temporary context.
- Understanding its use is key to appreciating the [[Python - Importance of Software Testing|importance of software testing]], as it validates not just success paths but also expected failure modes.
## Questions

- You're testing a complex data processing function. An error can occur in multiple stages, but you only want to test for a `ValueError` in the final validation step. How could using `pytest.raises(ValueError)` on the whole function potentially give you a false positive, and how would you refactor the test to ensure you're testing the exact line of code you intend to?
- In a CI/CD pipeline, you have a suite of tests that use `pytest.raises` to check for custom exceptions. A developer refactors the core error handling, changing the exception types across the application. How would you design your testing and code review process to catch these breaking changes before they are merged, preventing the CI pipeline from failing unexpectedly?
- What if `pytest.raises` didn't exist? How would you design a custom decorator, say `@expects_exception(TypeError)`, to achieve the same declarative syntax for testing exceptions in Python, and what would be the advantages or disadvantages compared to the context manager approach?