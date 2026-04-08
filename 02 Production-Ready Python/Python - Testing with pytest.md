---
tags: 
  - core
  - python
  - pytest
  - test function
  - assertion
  - unit testing
  - test discovery
  - concept
source: 
  - "[[Introduction to Testing in Python]]"
related: 
  - "[[Python - Software Testing]]"
  - "[[Python - Pytest Framework]]"
  - "[[Python - Assert Statement for Testing]]"
  - "[[Python - Importance of Software Testing]]"
  - "[[Python - Testing for Expected Exceptions with pytest.raises]]"
  - "[[SWE - Software Engineering for Data Scientists]]"
  - "[[Python - Functions]]"
  - "[[Python - User-Defined Functions]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Python - Error Handling]]"
  - "[[Python - Decorators]]"
  - "[[Fundamental - Version Control]]"
---
# Core: Simple Test Function with Pytest

## Summary

>A simple test function in Pytest is a standard Python function whose name begins with the prefix `test_`. This naming convention allows the Pytest framework to automatically discover and execute it as a test. Inside the function, an `assert` statement is used to check if a certain condition is true, verifying that the code being tested behaves as expected.

**Why This Matters:** This is the fundamental building block for automated testing in Python, allowing developers to verify code correctness, prevent future bugs, and refactor with confidence.

_Analogy:_ _Think of a recipe tester verifying a new cake recipe. The recipe itself is the function you want to test (e.g., `squared()`). The recipe tester is the test function (e.g., `test_squared()`). The tester is given a specific, non-negotiable instruction to check: 'Assert that the cake rises to exactly 5 inches.' This instruction is the `assert` statement. The `test_` prefix on their report (`test_squared`) is what flags it as an official test result for the head chef (the Pytest framework) to review. If the cake is 5 inches, the tester says nothing (pass). If it's 4 or 6 inches, they raise an alarm (fail)._

**Where it breaks down:** A human recipe tester might use subjective judgment ('it tastes good'). A Pytest function is purely objective and binary; the condition is either true (pass) or false (fail). It cannot assess qualitative aspects, only verifiable, boolean outcomes.

```
[ squared() function ] <--- (Unit Under Test)
       │
       │ Calls
       ▼
[ test_squared() ]   <--- (Discovered by Pytest runner due to 'test_' prefix)
       │
       │ Contains
       ▼
[ assert squared(-2) == squared(2) ]
       │
       │ Evaluates to
       ▼
┌─────────┴─────────┐
│                   │
TRUE              FALSE
(Pass)            (Fail)
```

## Details

To verify the functionality of a piece of code, such as the `squared` function, we don't just run it manually; we write another, separate function to test it automatically. This test function, in the context of the [[Python - Pytest Framework|Pytest framework]], must follow a specific naming convention: its name must start with `test_`. This convention is crucial because it's how Pytest automatically finds all the tests in your project. The core of the test itself is an [[Python - Assert Statement for Testing|assert statement]], which checks if a condition is true. If the condition is true, the test passes silently; if it's false, the test fails and Pytest provides a detailed report.

#### Primary Goal

To create a simple, self-contained, and automatically discoverable unit of verification for a single behavior of a piece of code.

#### Mechanism

- **Step 1: Define the Function to Test**
    - First, you have the regular Python function that contains the logic you want to verify. This is often called the 'unit under test'.
- **Step 2: Create the Test Function**
    - Next, you create a new function specifically for testing. Crucially, its name must be prefixed with `test_`. This allows the Pytest test runner to automatically discover it.
- **Step 3: Write the Assertion**
    - Inside the test function, you use the `assert` keyword followed by a boolean expression. This expression calls your original function and compares its output to an expected value.
    - If `expression` evaluates to `True`, the test passes, and execution continues. If it evaluates to `False`, an `AssertionError` is raised, and Pytest marks the test as failed.

##### Code Translation

```python
# No need to import pytest if you are just using assert and the naming convention

# --- Step 1: Define the Function to Test ---
# This is the function whose behavior we want to verify.
def squared(number):
    return number * number

# --- Step 2: Create the Test Function ---
# The name 'test_squared' allows pytest to find it automatically.
def test_squared():
    # --- Step 3: Write the Assertion ---
    # This line checks if the output of squared(-2) is equal to the output of squared(2).
    # If they are equal (4 == 4), the test passes. Otherwise, it fails.
    assert squared(-2) == squared(2)
```

 [[Code - Simple Test Function with Pytest Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Test Inputs**
    - The specific values passed to the function being tested (e.g., `-2` and `2`). The quality of a test suite heavily depends on choosing good inputs that cover typical use cases, edge cases (e.g., 0, negative numbers, large numbers), and invalid inputs.
- **Expected Outcome**
    - The value or state you are asserting against. In the example, the expected outcome is not a fixed value, but the principle that the function's output for `x` and `-x` should be identical.

#### Core Trade-offs

- **Pro: Simplicity and Clarity**
    - This pattern is extremely easy to write, read, and understand. It directly expresses a single expectation about a single function, making it ideal for unit testing.
- **Con: Limited Scope**
    - Each test function typically checks only one specific behavior or condition. A function with complex logic will require many such test functions to be fully verified, which can lead to a lot of boilerplate code.
- **Con: Potential for Repetition**
    - Testing multiple inputs often means writing multiple, nearly identical test functions. This violates the [[SWE - DRY (Don't Repeat Yourself) Principle|DRY principle]] and is better handled by more advanced Pytest features like parametrization.

## Connections

```
          (Parent)
      Pytest Framework
             ▲
             │
┌────────────┼───────────────────────────────────────────────────────────┐
│            │                                                           │
(Relies On) ┌──────────────────────────────────┐ (A form of)
Assert Stmt │  Simple Test Function with Pytest  │ Software Testing
            └──────────────────────────────────┘
                         │
                         │ (Foundation for)
                         ▼
            Testing for Expected Exceptions
```

### Parent Concept

This concept is a fundamental building block used within the [[Python - Pytest Framework|Pytest framework]], which acts as the test runner that discovers and executes these functions.

### Child Concepts

- This simple pattern is the foundation for more advanced tests, such as [[Python - Testing for Expected Exceptions with pytest.raises|testing for expected exceptions]], where you assert that a specific error is raised.

### Related Concepts 

- The core verification mechanism relies on the built-in [[Python - Assert Statement for Testing|assert statement]] to check if conditions are true.
- This is a practical, code-level implementation of the high-level principles of [[Python - Software Testing|software testing]].
- Writing such tests is a direct response to understanding the [[Python - Importance of Software Testing|importance of software testing]] for creating robust and maintainable code.
## Questions

- The `test_squared` function is simple. Imagine a complex financial calculation function. How would you balance writing dozens of simple, granular tests for each edge case versus a few larger, more integrated tests? What's the business risk of choosing one approach over the other in terms of development speed vs. potential for bugs in production?
- If you have thousands of these simple test functions in a large codebase, the test suite can become very slow to run. How would you design a system or configure your CI/CD pipeline to run only the relevant tests for a specific code change, rather than running the entire suite every time?
- What if the `assert` statement didn't exist in Python? How would you re-implement the `test_squared` function to achieve the same pass/fail outcome and provide a meaningful error message on failure, without using `assert`?