---
tags: 
  - process
  - swe
  - testmod
  - test runner
  - documentation testing
  - python standard library
  - automated testing
  - concept
source: 
  - "[[Software Engineering Principles in Python]]"
related: 
  - "[[SWE - doctest]]"
  - "[[SWE - pytest]]"
  - "[[SWE - Unit Testing]]"
  - "[[Python 5 - Docstrings]]"
  - "[[SWE - Python Testing Frameworks]]"
  - "[[SWE - Benefits of Automated Testing]]"
  - "[[SWE - doctest vs pytest]]"
  - "[[Python - Functions]]"
  - "[[Python - Importing Packages]]"
  - "[[SWE - Testing Best Practices]]"
  - "[[SWE - Running pytest]]"
  - "[[Python - User-Defined Functions]]"
---
# Process: Running doctest

**Why This Matters:** Running doctests provides an immediate and simple way to verify that a function's implementation matches its documented examples, catching bugs and documentation drift with minimal setup.
## Goal & Analogy

> **Goal:** Running a doctest involves using Python's built-in `doctest` module to automatically find and execute code examples embedded within docstrings. The module's `testmod()` function scans the current file, runs the example code, and compares the actual output to the expected output listed in the docstring. If all tests pass, it produces no output; if any test fails, it provides a detailed report of the discrepancy.

_Analogy:_ _Think of a docstring as a recipe in a cookbook. The example code (`>>> square(3)`) is a specific instruction, and the expected output (`9`) is the picture of the perfectly finished dish. Running `doctest.testmod()` is like having an automated chef who follows your recipe instructions exactly and then compares their final dish to the picture in the book. If the dish matches the picture, the chef says nothing. If it doesn't match (e.g., they made a cubed potato instead of a squared one), they immediately show you both dishes side-by-side, pointing out the difference._

*   **Where it breaks down:** A real cookbook recipe doesn't automatically test itself. A person (or an automated system) must actively choose to execute the steps and perform the comparison. The `doctest.testmod()` command is that active choice.

```
my_module.py contains:
  - def my_func():
  -   """ >>> my_func() ... """
  - if __name__ == '__main__':
  -   doctest.testmod()

      │
      ▼

$ python my_module.py

      │
      ▼

[ doctest.testmod() runs ] ───> [ Scans docstrings for '>>>' ]
      │
      │
      ├─> If (Actual Output == Expected Output) ───> [ No Output (Success) ]
      │
      └─> If (Actual Output != Expected Output) ───> [ Prints Failure Report ]
```

## The Step-by-Step Process

### Prerequisites / Inputs

- **`verbose`**
    - A boolean parameter. If set to `True` (e.g., `doctest.testmod(verbose=True)`), `doctest` will print a summary of all tests run, even the ones that passed. This can be useful for confirming that tests are actually being discovered and executed.

### The Steps

- **Step 1: Write a Function with a doctest**
    - Define a Python function and, within its docstring, provide an example of its usage. The example must start with `>>>` followed by the function call, and the expected output should be on the next line.
- **Step 2: Import the doctest Module**
    - Add the line `import doctest` at the top of your Python script.
- **Step 3: Add the Test Runner Command**
    - Call `doctest.testmod()` to initiate the testing process. It's best practice to place this call inside an `if __name__ == "__main__":` block. This allows your file to be imported as a module by other scripts without automatically running the tests.
- **Step 4: Execute the Script and Interpret the Output**
    - Run the Python file from your terminal. If there is no output, all tests passed successfully. If a test fails, `doctest` will print a detailed report showing the failed example, the expected output, and the output it actually received.

##### Code Translation

```python
# --- Step 1 & 2: Define function, add docstring with example, and import ---
def square(x):
    """Square the number x

    :param x: number to square
    :return: x squared

    # This is the doctest example.
    # It simulates a Python shell session.
    >>> square(3)
    9
    """
    # This typo will cause the test to fail.
    return x ** 3

# --- Step 3: Add the test runner command ---
if __name__ == "__main__":
    import doctest
    doctest.testmod()

# --- Step 4: Interpreting the output from running `python your_file.py` ---
# **********************************************************************
# File "your_file.py", line 9, in __main__.square
# Failed example:
#     square(3)
# Expected:
#     9
# Got:
#     27
# **********************************************************************
```

### Deliverables / Outputs

To use the `doctest` module, you simply import it and call the `doctest.testmod()` function. This command serves as a lightweight test runner that validates the examples you've written directly inside your [[Python 5 - Docstrings|docstrings]]. As shown in the context, it's excellent for catching simple bugs, like a typo in an exponent (`x ** 3` instead of `x ** 2`). A key characteristic of `doctest` is its 'quiet on success' behavior: if all documented examples run correctly and match their expected output, the command produces no output at all. A failure, however, results in a clear report detailing what went wrong.

## Context & Tradeoffs

### When to Use This Process

To automatically execute and verify the code examples written inside docstrings, ensuring they are correct, up-to-date, and serve as reliable documentation.

### Common Pitfalls & Tradeoffs

- **Simplicity vs. Capability**
    - Pro: `doctest` is incredibly simple to start with, requiring no external libraries and minimal boilerplate. It encourages writing clear, example-driven documentation.
    - Con: It is not designed for complex testing scenarios. It lacks features like test setup/teardown fixtures, easy exception testing, or test parameterization, which are standard in more robust frameworks like [[SWE - pytest|pytest]].
- **Clarity vs. Clutter**
    - Pro: Placing tests next to the code they document makes the function's behavior immediately clear to anyone reading the docstring.
    - Con: For functions requiring many test cases, embedding them all can make the docstring long and difficult to read, obscuring the primary documentation.

## Connections

```
                      (Parent)
               Python Testing Frameworks
                         ▲
                         │
         ┌───────────────┼────────────────
         │               │                │
(Prerequisite)  ┌──────────────────┐   (Alternative)
  Docstrings    │  Running doctest │      pytest
                └──────────────────┘
                         │
                         ▼
                    (Concept)
                    Unit Testing
```


- The `[[SWE - doctest|doctest]]` module is the specific tool from Python's standard library that provides the `testmod()` function to run these tests.
- A direct comparison can be made in `[[SWE - doctest vs pytest|doctest vs pytest]]`, which highlights the trade-offs between this simple, built-in tool and a full-featured, third-party framework.
- This entire process is built upon the existence of `[[Python 5 - Docstrings|Docstrings]]`, as they are the medium where the executable examples are stored.
- Running doctests is a fundamental practice in `[[SWE - Unit Testing|Unit Testing]]`, focusing on verifying the smallest individual components of a program in isolation.

## Deeper Questions

- You're leading a team of data scientists who are great at writing functions but resistant to formal testing. How would you pitch using `doctest` as a first step into automated testing, and what would be your argument for when the team *must* graduate to a more robust framework like `pytest`?
- In a large, multi-file project, how would you design a CI/CD pipeline step to automatically run all doctests across the entire codebase? What potential issue could arise from the 'quiet on success' default behavior in an automated environment, and how would you mitigate it?
- What if Python's docstrings didn't exist? Propose an alternative, equally lightweight method for embedding executable examples directly alongside a function's source code without relying on a separate test file.