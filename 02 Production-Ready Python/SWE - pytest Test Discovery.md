---
tags: 
  - core
  - swe
  - arrange_act_assert
  - test_case
  - assertion
  - pytest
  - test_driven_development
  - concept
source: 
  - "[[Software Engineering Principles in Python]]"
related: 
  - "[[SWE - Unit Testing]]"
  - "[[SWE - pytest]]"
  - "[[SWE - doctest]]"
  - "[[SWE - Testing Best Practices]]"
  - "[[SWE - Benefits of Automated Testing]]"
  - "[[SWE - Comparing Objects in Tests]]"
  - "[[SWE - Python Testing Frameworks]]"
  - "[[SWE - Running pytest]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Python - Functions]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Error Handling]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[SWE - Do One Thing Principle]]"
---
# Core: Writing Unit Tests

## Summary

>Writing a unit test is the process of creating a small, automated piece of code to verify that a specific function or method (a 'unit') behaves exactly as intended. As shown in the context, frameworks like [[SWE - pytest]] automatically discover and run these tests by looking for files and functions with a `test_` prefix. The core of the test involves setting up a specific scenario, executing the code, and then using the `assert` keyword to confirm that the outcome matches the expected result.

**Why This Matters:** Writing unit tests creates a reliable safety net, allowing developers to refactor code and add new features with confidence, knowing that existing functionality won't break unexpectedly.

_Analogy:_ _Think of writing a unit test like being a quality control inspector for a single, specific kitchen appliance, like a toaster. Before the toaster is assembled into a full 'kitchen set' (the application), the inspector runs a series of checks. They put in a slice of bread (the input), press the lever (the action), and check if the toast comes out perfectly golden brown and not burnt (the expected output)._

The inspector is the test function. The toaster is the 'unit' of code being tested. The slice of bread is the input data. The checklist of 'is it golden brown?' and 'did it pop up?' are the `assert` statements. **Where it breaks down:** Unlike a simple toaster, software components are often deeply interconnected. A unit test can confirm the toaster works perfectly in isolation, but it can't guarantee that it won't cause a power surge that affects the microwave when used in the same kitchen (integration issues).

```
Test Function Execution Flow

[ Arrange ]       (e.g., `doc = Document('a e i o u')`)
    │
    ▼
[  Act  ]         (e.g., Access `doc.tokens`)
    │
    ▼
[ Assert ]        (e.g., `assert doc.tokens == [...]`)
    │
    ├─ True ───> [ PASS ]
    │
    └─ False ──> [ FAIL ]
```

## Details

The fundamental practice of writing a unit test involves a structured, repeatable process to validate code correctness. The provided example demonstrates the standard pattern used in [[SWE - pytest]]: a test file (e.g., `test_document.py`) contains functions whose names start with `test_`. Inside each function, you first arrange a specific test case by creating an object or setting up data. Then, you act by calling the method or accessing the attribute you want to test. Finally, you assert that the result is what you expect. If the assertion holds true, the test passes; otherwise, it fails, immediately signaling a problem.

#### Primary Goal

To automatically and reliably verify that an individual component of code produces the correct output for a specific set of inputs, isolating it from the rest of the application.

#### Mechanism

- The standard workflow for writing a unit test follows the **Arrange-Act-Assert (AAA)** pattern:
- **Step 1: Arrange**
    - Set up all the necessary preconditions and inputs. This involves creating instances of objects, defining variables, or mocking dependencies needed for the test.
- **Step 2: Act**
    - Execute the specific piece of code—the function or method—that you want to test.
- **Step 3: Assert**
    - Verify that the outcome of the action is what you expected. This is done using the `assert` keyword followed by a boolean expression. If the expression is `True`, the test passes. If `False`, `pytest` will report a failure.

##### Code Translation

```python
# working in workdir/tests/test_document.py

from text_analyzer import Document
from collections import Counter

# Test tokens attribute on Document object
def test_document_tokens():
    # --- Step 1: Arrange ---
    # Create an instance of the Document class with a specific string.
    doc = Document('a e i o u')

    # --- Step 2: Act ---
    # The 'act' is implicitly the initialization and the access of the .tokens attribute.
    # We will check the value of doc.tokens.

    # --- Step 3: Assert ---
    # Check if the tokens attribute matches the expected list of characters.
    assert doc.tokens == ['a', 'e', 'i', 'o', 'u']

# Test with an empty document
def test_empty_document():
    # --- Step 1: Arrange ---
    empty_doc = Document('')

    # --- Step 2 & 3: Act and Assert ---
    # Verify that an empty document results in an empty token list and word count.
    assert empty_doc.tokens == []
    assert empty_doc.word_counts == Counter()

```

 [[Code - Writing Unit Tests Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Test Case Design:** The effectiveness of a unit test depends entirely on the scenarios it covers. Key considerations include:
    - **Happy Path:** Test the function with typical, expected inputs to ensure it works correctly under normal circumstances. (e.g., `Document('a e i o u')`).
    - **Edge Cases:** Test the boundaries of the input. This includes empty inputs (`Document('')`), single-item inputs, or values at the very limit of what's acceptable.
    - **Error Conditions:** Test how the code behaves with invalid inputs. Does it raise the expected exception? Does it return a sensible default value?

#### Core Trade-offs

- **Increased Confidence vs. Development Time:**
    - Writing tests takes time upfront, potentially slowing down initial feature development. However, this investment pays off by providing a safety net that speeds up future refactoring and debugging, as detailed in [[SWE - Benefits of Automated Testing]].
- **Specificity vs. Brittleness:**
    - Tests that are too specific can be brittle—they might break due to minor, irrelevant implementation changes, even if the functionality is still correct. Good tests verify the public behavior (the 'what') rather than the internal implementation (the 'how').

## Connections

```
          (Parent)
        Unit Testing
             ▲
             │
┌────────────┼────────────┐
│            │            │
(Framework)  ┌───────────────────┐  (Alternative)
  pytest     │ Writing Unit Tests│  doctest
             └───────────────────┘
                 │
                 ▼
          (Key Principle)
    Comparing Objects in Tests
```

### Parent Concept

This concept is a fundamental practice within the broader discipline of [[SWE - Unit Testing]], which focuses on verifying the smallest testable parts of an application in isolation.

### Child Concepts



### Related Concepts 

- The process is implemented using specific tools, making it closely related to [[SWE - Python Testing Frameworks|Python testing frameworks]] like [[SWE - pytest]].
- It contrasts with [[SWE - doctest]], which is an alternative approach that embeds tests directly within docstrings rather than in separate test files.
- Following [[SWE - Testing Best Practices]] is crucial to ensure that unit tests are maintainable, readable, and effective.
- A key part of the 'Assert' phase often involves [[SWE - Comparing Objects in Tests|comparing objects for equality]], which can have nuances depending on the object's complexity.
## Questions

- Your team is falling behind on a feature deadline. A manager suggests skipping unit tests to 'move faster'. How would you argue for the long-term business value of writing tests now, even if it means a short-term delay, framing it in terms of risk and total cost of ownership?
- Imagine the `Document` class you're testing relies on an external, slow, and unreliable API for tokenization. How would you modify your unit testing strategy to ensure your tests are fast, reliable, and completely isolated from this external dependency?
- What if the `assert` keyword was removed from Python? How would you redesign a testing framework from first principles to verify code correctness without it, and what would be the pros and cons of your new approach?