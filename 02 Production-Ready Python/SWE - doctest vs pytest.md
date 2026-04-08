---
tags: 
  - comparison
  - swe
  - doctest
  - pytest
  - test_coverage
  - software_testing
  - code_quality
  - concept
source: 
  - "[[Software Engineering Principles in Python]]"
related: 
  - "[[SWE - doctest]]"
  - "[[SWE - pytest]]"
  - "[[SWE - Unit Testing]]"
  - "[[SWE - Python Testing Frameworks]]"
  - "[[SWE - Testing Best Practices]]"
  - "[[Python - Docstrings]]"
  - "[[SWE - Running doctests]]"
  - "[[SWE - Running pytest]]"
  - "[[SWE - pytest Test Discovery]]"
  - "[[Python - Pandas DataFrame]]"
  - "[[SWE - Software Engineering for Data Scientists]]"
  - "[[SWE - Benefits of Automated Testing]]"
  - "[[SWE - Comparing Objects in Tests]]"
---
# Comparison: Limitations of doctests

## Why This Comparison Matters

> While `doctest` is an excellent tool for verifying simple, self-contained examples directly within documentation, its utility diminishes as complexity grows. It is not designed to handle comprehensive test suites, complex setup/teardown logic, or tests involving large, hard-to-represent outputs like pandas DataFrames. These limitations highlight the point at which a developer should transition to a more powerful, dedicated testing framework like `[[SWE - pytest|pytest]]` to ensure robust code quality.

_Analogy:_ _Using `doctest` is like having a pocket knife. It's incredibly convenient for simple, everyday tasks like opening a box or tightening a loose screw on your glasses. However, if you need to build a piece of furniture or repair a car engine, you wouldn't rely on just a pocket knife. For that, you need a full mechanic's toolbox (`pytest`), which contains specialized tools like wrenches, sockets, and power drills, designed specifically for complex, heavy-duty jobs._

**Where it breaks down:** The analogy is physical, whereas testing frameworks are logical constructs for organizing code. The 'difficulty' of the task in software isn't about physical force but about managing state, complexity, and dependencies, which a dedicated framework is designed to handle systematically.

## Side-by-Side Comparison

- **doctest**
    - Tests are embedded directly within docstrings, coupling documentation and testing.
    - Ideal for simple, illustrative examples that prove a function works as described.
    - No external dependencies; it's part of the Python standard library.
    - Lacks advanced features like fixtures for setup/teardown or test parametrization.
- **pytest**
    - Tests are written in separate `test_*.py` files, decoupling tests from production code.
    - Designed for building comprehensive test suites, from simple unit tests to complex integration tests.
    - An external package that must be installed (`pip install pytest`).
    - Offers a rich ecosystem of features and plugins, including fixtures, parametrization, and detailed reporting.

### Comparison Table

| Feature             | doctest                                    | pytest                                                       |
|---------------------|--------------------------------------------|--------------------------------------------------------------|
| **Location**        | Inside docstrings in `.py` files           | Separate `test_*.py` files                                   |
| **Primary Use Case**| Documenting with simple, runnable examples | Comprehensive unit, integration, and functional testing      |
| **Complexity**      | Very simple, text-based comparison         | Highly extensible, supports complex assertions and fixtures  |
| **Setup/Teardown**  | Not supported                              | Robust support via fixtures                                  |
| **Ecosystem**       | Part of Python's standard library          | Extensive plugin architecture for enhanced capabilities      |

## Key Similarities

Both `doctest` and `pytest` are tools for implementing automated testing in Python. Their fundamental goal is to verify that code behaves as expected, thereby improving code quality and maintainability. They can even be used together in the same project, with `pytest` being capable of discovering and running `doctests`.

## Verdict: When to Use Which

Use `doctest` for simple, clear examples that double as documentation for your functions. For any testing that requires setup, covers multiple edge cases, or validates complex outputs, use `pytest` as the dedicated, more powerful tool.

### Comparative Code Example
nothing to fill here

## Broader Connections

```
                      (Parent)
                     [[SWE - doctest|doctest]]
                         ▲
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                    │
(Context)       ┌───────────────────────────┐   (Successor)
[[SWE - Unit Testing|Unit Testing]] │  Limitations of doctests  │   [[SWE - pytest|pytest]]
                └───────────────────────────┘
```

- Understanding these limitations directly motivates the adoption of more powerful frameworks like [[SWE - pytest|pytest]] for comprehensive testing.
- These shortcomings are a key reason why dedicated [[SWE - Python Testing Frameworks|Python testing frameworks]] are essential for professional software development.
- Recognizing when to move beyond doctests is a fundamental aspect of [[SWE - Testing Best Practices|testing best practices]].
- The difficulty in representing complex return values is a primary driver for using tools that allow for more advanced techniques, such as [[SWE - Comparing Objects in Tests|comparing objects in tests]].

## Deeper Questions

- You're leading a team where some junior developers love the simplicity of doctests for everything, while seniors argue for the rigor of pytest. How do you establish a team-wide testing standard that balances ease-of-use for simple functions with the robustness needed for critical business logic, and how would you justify this standard to management in terms of long-term code maintainability?
- Imagine a data processing pipeline where a function's output is a large, non-deterministic Spark DataFrame. Why is a doctest completely unsuitable here? Describe how you would use a framework like pytest, possibly with helper libraries, to create a reliable, repeatable test for this function's core logic.
- What if Python's docstrings could execute arbitrary setup code and had a built-in, powerful diffing tool for complex objects? Would there still be a compelling reason for a separate framework like pytest to exist? What fundamental problem does the separation of test code and production code solve?