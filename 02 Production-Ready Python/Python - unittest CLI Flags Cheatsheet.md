---
tags:
  - "#cheatsheet"
tool:
  - "unittest"
---
# Cheatsheet: Python - unittest CLI Flags Cheatsheet

> A quick reference guide for common commands and syntax for **unittest**.

---

# Python `unittest` CLI Flags

A high-density summary of common command-line flags for Python's `unittest` module.

### Core Flags Summary

| Flag | Alias | Description |
|---|---|---|
| `-k <pattern>` | `--pattern <pattern>` | Selects tests whose names match the given pattern. |
| `-f` | `--failfast` | Stops the test run on the first failure or error. |
| `-c` | `--catch` | Catches `Ctrl+C` and waits for the current test to finish. |
| `-v` | `--verbose` | Provides more detailed (verbose) output. |

---

### `-k` / `--pattern`: Select Tests by Keyword

Runs only test methods, classes, or modules that match the specified substring or pattern. The matching is case-sensitive.

```bash
# Run a specific test method named 'test_login_success'
python -m unittest -k test_login_success

# Run all tests within a class named 'TestUserAuth'
python -m unittest -k TestUserAuth

# Run all tests containing the substring 'api'
python -m unittest -k api
```

### `-f` / `--failfast`: Stop on First Failure

Halts the entire test suite execution immediately after the first test fails or encounters an error. This is useful for quickly identifying the first point of failure in a large test suite.

```bash
# Stop execution as soon as a test fails
python -m unittest -f
```

### `-c` / `--catch`: Graceful Interruption

Allows the test run to be stopped gracefully with `Ctrl+C`. The test runner will wait for the currently running test to complete and then report the results gathered so far. A second `Ctrl+C` will interrupt the process immediately.

```bash
# Enable graceful Ctrl+C handling
python -m unittest -c
```

### `-v` / `--verbose`: Detailed Output

Provides a more detailed output for the test run. Instead of a single character per test (`.`, `F`, `E`), it prints the full name of each test method and its outcome.

```bash
# Run tests with verbose output
python -m unittest -v

# Example verbose output:
# test_addition (my_tests.TestMath) ... ok
# test_subtraction (my_tests.TestMath) ... FAIL
```

### Combining Flags

Flags can be combined to customize the test run.

```bash
# Run all tests matching 'TestAPI', stop on the first failure, and use verbose output
python -m unittest -v -f -k "TestAPI"
```