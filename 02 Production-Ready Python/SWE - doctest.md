---
tags: 
  - core
  - swe
  - documentation
  - testing
  - standard_library
  - code_examples
  - verification
  - concept
source: 
  - "[[Software Engineering Principles in Python]]"
related: 
  - "[[SWE - Unit Testing]]"
  - "[[SWE - Python Testing Frameworks]]"
  - "[[SWE - Running doctests]]"
  - "[[SWE - pytest]]"
  - "[[SWE - doctest vs pytest]]"
  - "[[Python - Docstrings]]"
  - "[[Python - Functions]]"
  - "[[SWE - Testing Best Practices]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Python - Package Documentation]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Python - User-Defined Functions]]"
  - "[[SWE - Benefits of Automated Testing]]"
---
# Core: doctest

## Summary

>Doctest is a Python module that searches for pieces of text that look like interactive Python sessions within docstrings and then executes those sessions to verify that they work exactly as shown. It's a simple way to combine documentation and [[SWE - Unit Testing|unit testing]], making it easy to ensure your examples are accurate and serve as a first line of defense against bugs.

**Why This Matters:** It transforms your documentation into executable tests, guaranteeing that code examples are always correct and up-to-date, which prevents documentation rot.

_Analogy:_ _Using `doctest` is like publishing a cookbook where every recipe's photo is automatically verified against an actual dish made using the instructions. The recipe text is your function's code and docstring, and the photo is the example output you write in the docstring._

The recipe (the function) and its instructions (the docstring) are written by the chef (the developer). The photo of the perfect final dish (`>>> square(3)\n9`) is the expected outcome. `doctest` is the quality control inspector who actually follows the recipe and compares their resulting dish to the photo. If they don't match, the recipe is flagged as flawed. 
* **Where it breaks down:** A recipe photo only shows the final result for one specific set of ingredients (the happy path). It doesn't test variations (edge cases like `square(0)` or `square(-1)`) or complex interactions between different dishes, which more robust frameworks like [[SWE - pytest|pytest]] are designed for.

```
your_script.py
┌──────────────────────────────────────────┐
│ def my_func():                           │
│     """                                  │
│     >>> my_func()  ───(1. Input)─────────│───┐
│     'Expected'   ───(2. Expected Output)─│───┤
│     """                                  │   │
│     return 'Actual' ──(3. Actual Output)─│───┘
└──────────────────────────────────────────┘   │
                                               │
         doctest.testmod()                     ▼
┌──────────────────────────────────────────┐
│                                          │
│  Compare (2) and (3)                     │
│  'Expected'  ==  'Actual' ?              │
│                                          │
└──────────────────────────────────────────┘
               │
        ┌──────┴──────┐
        ▼             ▼
     (Match)       (Mismatch)
  Silent Pass      Report Failure
```

## Details

The core idea is that if you write informative docstrings with examples, you've already created tests that can be run with `doctest`. As seen with the `square` function example, `doctest` scans the docstring for lines starting with `>>>`, which mimic an interactive Python prompt. It runs the code on that line and compares the actual output to the expected output on the next line. This simple mechanism turns your documentation into a live, verifiable contract for how your code should behave, providing a lightweight form of [[SWE - Unit Testing|unit testing]] that is built directly into Python's standard library.

#### Primary Goal

To ensure that the code examples provided in documentation are correct and remain correct as the underlying code evolves.

#### Mechanism

- **Step 1: Write a Docstring with an Example**
    - In a function's docstring, write an example as if you were typing it in a Python REPL. Start the command with `>>>` and place the exact expected output on the line immediately following it.
- **Step 2: Write (or have) Buggy Code**
    - For the test to be meaningful, it must be able to fail. The example from the context shows a function that is supposed to square a number but incorrectly cubes it, creating a mismatch with the docstring's expectation.
- **Step 3: Import `doctest` and Run `testmod()`**
    - Import the `doctest` module and call `doctest.testmod()`. This function scans the current module for docstrings, executes the embedded examples, and compares the results. If there are no failed tests, the output is blank.

##### Code Translation

```python
import doctest

def square(x):
    """Square the number x

    :param x: number to square
    :return: x squared

    # --- Step 1: Write a Docstring with an Example ---
    # This example states that square(3) should return 9.
    >>> square(3)
    9
    """
    # --- Step 2: Write Buggy Code ---
    # This is the buggy implementation shown in the context image.
    # It incorrectly calculates the cube, not the square.
    return x ** 3

# --- Step 3: Import and Run the Test Runner ---
if __name__ == "__main__":
    # The testmod() function finds and runs the tests in the docstrings.
    # It will compare the actual output of square(3) [which is 27]
    # with the expected output [9] and report a failure.
    doctest.testmod()

# Expected output when this script is run:
# **********************************************************************
# File "your_file.py", line 8, in __main__.square
# Failed example:
#     square(3)
# Expected:
#     9
# Got:
#     27
# **********************************************************************
```

 [[Code - doctest Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`verbose`**: A boolean parameter for `doctest.testmod()`. If set to `True`, `doctest` will print a summary of all tests run, even if they all pass. By default (`False`), it only produces output for failures.
- **Directives**: Special comments within the docstring can alter `doctest`'s behavior for a specific example, such as `# doctest: +SKIP` to skip a test or `# doctest: +ELLIPSIS` to allow for variable parts in the output.

#### Core Trade-offs

- **Pro: Simplicity and Readability**
    - Tests are written in a simple, human-readable format directly alongside the code they document. This encourages writing clear examples and lowers the barrier to entry for testing.
- **Pro: Documentation Synchronization**
    - It forces documentation examples to be correct. If the code changes and breaks the example, the test will fail, prompting a fix to either the code or the documentation.
- **Con: Limited Scope**
    - It is not designed for complex testing scenarios. It lacks features like test fixtures (setup/teardown), parametrization, or complex assertions that are standard in frameworks like [[SWE - pytest|pytest]].
- **Con: Can Clutter Docstrings**
    - For functions requiring many test cases, including all of them in the docstring can make it long and difficult to read, undermining its primary purpose as documentation.

## Connections

```
                      (Parent)
            Python Testing Frameworks
                       ▲
                       │
    ┌──────────────────┼──────────────────┐
    │                  │                  │
(Alternative) ┌──────────────────┐ (Alternative)
   unittest   │     doctest      │    pytest
              └──────────────────┘
                       │
                       ▼
                  (Used In)
             Package Documentation
```

### Parent Concept

`doctest` is a type of [[SWE - Python Testing Frameworks|Python testing framework]], offering a simple, documentation-centric approach to testing that is included in the standard library.

### Child Concepts



### Related Concepts 

- It provides a basic form of [[SWE - Unit Testing|unit testing]] by verifying small, isolated pieces of code directly from their documentation.
- The process of executing these tests from the command line or within a script is detailed in [[SWE - Running doctests|running doctests]].
- A direct [[SWE - doctest vs pytest|comparison with pytest]] highlights its simplicity for basic cases versus pytest's power and flexibility for comprehensive test suites.
## Questions

- You're leading a team building a public-facing data science library. Would you enforce `doctest` for all public functions? How would you justify the developer time spent maintaining these example-based tests to a project manager focused on shipping new features?
- Imagine a large codebase where `doctest` is used extensively. How would you design a CI/CD pipeline to run only the doctests relevant to the changed files in a pull request, instead of running all tests across the entire project every time?
- What if Python's docstrings could not be introspected at runtime? How would you redesign the `doctest` concept to achieve the same goal of synchronizing documentation examples with code behavior?