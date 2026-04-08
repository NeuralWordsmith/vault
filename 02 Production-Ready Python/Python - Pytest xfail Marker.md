---
tags: 
  - core
  - python
  - pytest
  - testing
  - expected_failure
  - markers
  - decorators
  - concept
source: 
  - "[[Introduction to Testing in Python]]"
related: 
  - "[[Python - Pytest Markers]]"
  - "[[Python - Pytest skip Marker]]"
  - "[[Python - Pytest skipif Marker]]"
  - "[[Python - Pytest Markers & Decorators Relationship]]"
  - "[[SWE - Software Engineering for Data Scientists]]"
  - "[[Python - Decorators]]"
  - "[[Python - Error Handling]]"
  - "[[Python - Custom Exceptions]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Python - Functions]]"
  - "[[Python - Assertions]]"
  - "[[SWE - Test-Driven Development (TDD)]]"
---
# Core: Pytest xfail Marker

## Summary

>The `xfail` marker in `pytest` is a special decorator used to mark a test that is expected to fail. This is useful for tracking known bugs or features that are not yet implemented, allowing the test suite to run to completion without reporting a failure for this specific test. It's a way of saying, "I know this is broken, and I expect it to stay broken for now."

**Why This Matters:** It allows development teams to maintain a clean and passing test suite even with known bugs, ensuring that continuous integration pipelines are not blocked while still tracking the issue.

_Analogy:_ _Imagine a quality control checklist for assembling a car. One item on the list is "Check for scratches on the passenger door." However, the machine that paints the passenger doors is known to be faulty and always leaves a tiny scratch. Instead of stopping the entire assembly line every time this known, minor flaw is found, the inspector puts a special "Expected Flaw" sticker next to that checklist item. The car still moves down the line, but there's a clear record that this specific, known issue was present._

The `xfail` marker is the "Expected Flaw" sticker. The test function is the "Check for scratches" item. The known bug is the faulty painting machine. The test suite running successfully is the assembly line continuing to operate. **Where it breaks down:** Unlike the sticker, if the bug is accidentally fixed and the test *passes*, `pytest` can report this as an "XPASS" (unexpected pass), which is a signal to remove the `xfail` marker. The sticker has no such "self-correcting" feedback mechanism.

```
```
Test Execution Flow

pytest starts
     │
     ▼
Collects test_function()
     │
     ▼
Sees @pytest.mark.xfail
     │
     ▼
Runs the test
     │
┌────┴────┐
│         │
▼         ▼
Fails?    Passes?
(Expected)  (Unexpected)
│         │
▼         ▼
Result:   Result:
XFAIL     XPASS
```
```

## Details

In software testing, it's not always desirable for a failing test to break the entire build. Sometimes, we are fully aware of a bug but can't fix it immediately. The `pytest` framework provides a solution for this with the `xfail` marker. By using the `@pytest.mark.xfail` decorator, you can tell the test runner that you anticipate a failure. This allows you to integrate the test for the bug into your codebase, ensuring you don't forget about it, while still getting a "green" or successful report from your overall test suite. The test is run, but its failure doesn't count as a failure for the whole run; instead, it's categorized as an "expected failure" or `xfailed`.

#### Primary Goal

To mark a test as an expected failure, allowing the test suite to pass while still acknowledging and tracking a known issue.

#### Mechanism

- **Step 1: Define the Function to Test**
    - Create the Python function whose behavior you want to test. In this case, a function that generates a sequence and will be tested with invalid input.
- **Step 2: Apply the xfail Marker**
    - Import `pytest` and add the `@pytest.mark.xfail` decorator directly above the test function definition. This tells `pytest` to handle this test differently.
- **Step 3: Write the Failing Assertion**
    - Inside the test function, write an `assert` statement that you know will fail due to the bug or invalid input. For example, asserting a positive outcome from an input of -1.
- **Step 4: Run Pytest and Interpret Output**
    - Execute the tests from the command line using `pytest`. Observe the output, which will show the test result as `xfailed` (often represented by a lowercase 'x'), indicating it failed as expected.

##### Code Translation

```python
import pytest

# --- Step 1: Define the Function to Test ---
# This function is expected to fail with negative input, 
# but for this example, we'll pretend it's a bug.
def gen_sequence(n):
    if n < 0:
        # This will result in an empty list, which is "falsy" in Python.
        return list(range(1, n+1))
    return list(range(1, n+1))

# --- Step 2: Apply the xfail Marker ---
@pytest.mark.xfail(reason="gen_sequence does not handle negative numbers yet")
def test_gen_seq_with_negative_input():
    # --- Step 3: Write the Failing Assertion ---
    # The function returns an empty list `[]` for n=-1.
    # An empty list evaluates to False in a boolean context, so the assert fails.
    assert gen_sequence(-1)

# --- Step 4: Run Pytest and Interpret Output ---
# In the terminal, run `pytest`.
# The output will show:
# collected 1 item
# test_file.py x                               [100%]
# =================== 1 xfailed in 0.01s ===================
```

 [[Code - Pytest xfail Marker Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **reason**
    - A string explaining why the test is marked as `xfail`. This is good practice for documentation. Example: `@pytest.mark.xfail(reason="Bug #123: Negative inputs fail")`.
- **raises**
    - Specify a particular exception that is expected. If the test fails with a different exception, it will be reported as a regular failure. Example: `@pytest.mark.xfail(raises=ValueError)`.
- **strict**
    - A boolean. If `strict=True`, an `XPASS` (an unexpected pass) will cause the entire test suite to fail. This is useful for ensuring the marker is removed as soon as the bug is fixed. The default is `False`.

#### Core Trade-offs

- **Pro: Non-Blocking CI/CD**
    - Allows continuous integration pipelines to remain "green" even when known, non-critical bugs exist, preventing development bottlenecks.
- **Pro: Bug Visibility**
    - Keeps the test for a known bug within the codebase, acting as a constant reminder that the issue needs to be addressed.
- **Con: Can Hide Regressions**
    - If not used carefully (e.g., without a specific `raises` condition), it might mask a new, different reason for failure. The test might `xfail` for the wrong reason.
- **Con: Complacency**
    - Overuse of `xfail` can lead to a culture of ignoring failing tests, allowing bugs to linger in the codebase for too long. It should be a temporary measure.

## Connections

```
```
                  (Parent)
               Pytest Markers
                       ▲
                       │
       ┌───────────────┼────────────────────────────┐
       │               │                            │
(Alternative) ┌───────────────────────────┐     (Alternative)
Pytest skip   │    Pytest xfail Marker    │     Pytest skipif
              └───────────────────────────┘
                       │
                       │
              (Underlying Mechanism)
                       │
         Markers & Decorators Relationship
```
```

### Parent Concept

`xfail` is a specific type of marker provided by the `pytest` framework, as detailed in [[Python - Pytest Markers]].

### Child Concepts



### Related Concepts 

- It provides a different strategy than the [[Python - Pytest skip Marker|skip marker]], which prevents a test from running at all.
- It is more specific than `skip` but less conditional than the [[Python - Pytest skipif Marker|skipif marker]], which skips a test only if a certain condition is met.
- The implementation of `@pytest.mark.xfail` relies on the general relationship between [[Python - Pytest Markers & Decorators Relationship|Pytest markers and Python decorators]].
## Questions

- Your team has discovered a bug that affects a minor, non-critical feature. The fix is estimated to take a full sprint. How would you decide between using `@pytest.mark.xfail` on the failing test versus dedicating resources to fix it immediately, and how would you justify the cost/benefit of your choice to a product manager?
- Imagine a large, legacy codebase with over 50 tests marked as `xfail`. How would you design a process or automated system to periodically review these tests, ensure they are still relevant, and prevent them from being forgotten, thereby reducing technical debt?
- What if the `xfail` marker had a mandatory "time-to-live" (TTL) parameter, after which an `xfail` would automatically become a hard failure? What would be the positive and negative consequences of such a feature on a development team's workflow and culture?