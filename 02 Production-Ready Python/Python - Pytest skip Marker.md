---
tags: 
  - core
  - python
  - pytest
  - testing
  - skip
  - markers
  - decorators
  - concept
source: 
  - "[[Introduction to Testing in Python]]"
related: 
  - "[[Python - Pytest Markers]]"
  - "[[Python - Pytest skipif Marker]]"
  - "[[Python - Pytest xfail Marker]]"
  - "[[Python - Pytest Markers & Decorators Relationship]]"
  - "[[Python - Decorators]]"
  - "[[SWE - Software Engineering for Data Scientists]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Python - Functions]]"
  - "[[Python - Error Handling]]"
  - "[[Python - Custom Exceptions]]"
  - "[[Python - Unit Testing]]"
  - "[[Python - Test Driven Development (TDD)]]"
  - "[[Python]]"
  - "[[Fundamental - Programming]]"
---
# Core: Pytest skip Marker

## Summary

>The `@pytest.mark.skip` marker is a built-in [[Python - Pytest Markers|Pytest marker]] that unconditionally instructs the test runner to bypass a specific test function. It's a direct way to temporarily disable a test, often used for tests that are known to be failing, are under development, or are not currently relevant. This contrasts with the [[Python - Pytest skipif Marker|skipif marker]], which skips a test based on a specific condition.

**Why This Matters:** This marker allows developers to temporarily disable tests that are broken, incomplete, or irrelevant, ensuring the rest of the test suite can still run and pass without being blocked by known issues.

_Analogy:_ _Using `@pytest.mark.skip` is like putting a "Do Not Disturb" sign on a hotel room door. The housekeeping staff (the test runner) sees the sign and knows to bypass that specific room (the test function) without trying to enter or clean it. They simply note that the room was skipped and move on to the next one._

-
    **Housekeeping Staff:** The Pytest test runner.
-   **Hotel Rooms:** The individual test functions in the suite.
-   **"Do Not Disturb" Sign:** The `@pytest.mark.skip` marker.
-   **Cleaning the Room:** Executing the test function.
-   **Noting the Skipped Room:** Pytest's output report showing "1 skipped".
-   **Where it breaks down:** The analogy implies the occupant (developer) will eventually remove the sign. In reality, skipped tests can be forgotten, leading to "test debt" where parts of the codebase are no longer being validated. The sign doesn't have an expiry date or a reason attached unless you explicitly add one.

```
Pytest Runner
     │
     ▼
Discovers `test_get_len()`
     │
     ▼
Checks for Markers
     │
┌────┴────┐
│ @pytest │
│ .mark   │
│ .skip   │
└────┬────┘
     │
     └──────────► Skip Execution
                     │
                     ▼
                Report as "SKIPPED"
```

## Details

In software testing with Pytest, there are times when you need to temporarily disable a test without deleting the code. The `@pytest.mark.skip` marker provides a straightforward mechanism to do this. As a type of [[Python - Pytest Markers & Decorators Relationship|decorator]], it's applied directly above a test function definition. When Pytest discovers tests, it sees this marker and immediately flags the test to be skipped, providing a clear report of which tests were collected but not executed. This is particularly useful for tests that are currently broken due to a refactor, are incomplete, or test functionality that is temporarily disabled.

#### Primary Goal

To provide a simple, unconditional way to prevent a specific test from being executed by the Pytest runner.

#### Mechanism

- **Step 1: Import Pytest**
    - Begin by importing the `pytest` library, which is necessary to access the markers.
- **Step 2: Define the Test Function**
    - Write a standard test function, ensuring its name starts with `test_`.
- **Step 3: Apply the Decorator**
    - Place the `@pytest.mark.skip` decorator directly above the test function's definition. You can optionally pass a string argument like `reason="Work in progress"` to document why the test is being skipped.
- **Step 4: Run Pytest**
    - Execute the test suite from the command line. Pytest will discover the test, see the marker, and report it as "skipped" in the final summary instead of "passed" or "failed".

##### Code Translation

```python
import pytest

# A simple function to be tested
def get_length(string: str) -> int:
    return len(string)

# --- Step 1 & 2 are implicit in the setup ---

# --- Step 3: Apply the Decorator ---
# This test will be unconditionally skipped.
@pytest.mark.skip(reason="This test is currently under development.")
def test_get_len_wip():
    assert get_length('123') == 3

# This test will run as normal
def test_get_len_functional():
    assert get_length('abcde') == 5

# --- Step 4: Run Pytest ---
# In your terminal, you would run:
# > pytest
# The output would show 1 passed, 1 skipped.
```

 [[Code - Pytest skip Marker Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`reason` (optional)**
    - A string that explains why the test is being skipped. This reason is displayed in the test summary when using verbose mode (`-v -rs`), which is highly recommended for documentation and team communication.
        - *Example:* `@pytest.mark.skip(reason="Waiting on new API endpoint to be deployed.")`

#### Core Trade-offs

- **Pro: Simplicity and Clarity**
    - It's an explicit and easy-to-understand way to disable a test without commenting out or deleting code, preserving the test logic for future use.
- **Con: Risk of "Test Debt"**
    - Skipped tests can be easily forgotten. If the underlying code changes, a skipped test provides a false sense of security because it's no longer validating the functionality it was written for. This can lead to an accumulation of unmaintained tests.
- **Pro: Keeps Test Suite Green**
    - It allows the main test suite to pass (remain "green") even if some tests are known to be failing, which is crucial for CI/CD pipelines that block deployment on test failures.
- **Con: Hides Real Failures**
    - While useful, it can mask underlying bugs or regressions. A test that is skipped is not providing any information about the health of the code it's supposed to cover. The [[Python - Pytest xfail Marker|xfail marker]] is often a better choice for tests that are expected to fail.

## Connections

```
                  (Parent)
               Pytest Markers
                       ▲
                       │
       ┌───────────────┼────────────────────────────┐
       │               │                            │
(Conditional Skip)┌───────────────────────────┐   (Expected Fail)
   skipif         │     Pytest skip Marker    │      xfail
                  └───────────────────────────┘
```

### Parent Concept

This concept is a specific implementation of the broader system of [[Python - Pytest Markers|Pytest Markers]], which are used to categorize and apply special behavior to tests.

### Child Concepts



### Related Concepts 

- It is directly related to the [[Python - Pytest Markers & Decorators Relationship|relationship between markers and decorators]], as `@pytest.mark.skip` is a decorator that applies the 'skip' metadata.
- It contrasts with the [[Python - Pytest skipif Marker|skipif marker]], which provides a way to skip tests *conditionally* based on runtime evaluations.
- It also contrasts with the [[Python - Pytest xfail Marker|xfail marker]], which marks a test as "expected to fail" rather than skipping it entirely.
## Questions

- Your team's CI/CD pipeline is failing due to a flaky test that depends on an unstable third-party API. You could use `@pytest.mark.skip` to get the pipeline green immediately, or spend time mocking the API. How do you decide, and how would you justify the business impact of potential 'test debt' from skipping versus the development cost of mocking to your project manager?
- Imagine you are responsible for a large, legacy test suite with hundreds of tests marked with `@pytest.mark.skip` without a `reason`. How would you design an automated system or process to periodically review these skipped tests, identify which ones are still relevant, and alert the appropriate code owners to either fix or delete them to manage technical debt?
- What if the `@pytest.mark.skip` marker was removed from the framework? How would you implement a similar 'unconditional skip' functionality using only other existing Pytest hooks or decorators, and what would be the potential downsides of your custom implementation?