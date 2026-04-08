---
tags:
  - "#cheatsheet"
tool:
  - "pytest"
---
# Cheatsheet: Python - pytest CLI Cheatsheet

> A quick reference guide for common commands and syntax for **pytest**.

---

### Basic Test Execution

| Command | Description |
|---|---|
| `pytest` | Run all `test_*.py` or `*_test.py` files recursively. |
| `pytest <path/to/file.py>` | Run tests in a specific file. |
| `pytest <path/to/dir>` | Run all tests in a specific directory. |
| `pytest <file.py>::<test_func>` | Run a specific function within a file. |
| `pytest <file.py>::<TestClass>` | Run all tests within a specific class in a file. |
| `pytest <file.py>::<TestClass>::<test_method>` | Run a specific method within a class. |

### Selecting & Filtering Tests

| Flag | Argument | Example | Description |
|---|---|---|---|
| `-k` | `"expression"` | `pytest -k "squared and not slow"` | Run tests with names matching the keyword expression. Use `and`, `or`, `not`. |
| `-m` | `"marker"` | `pytest -m "slow or regression"` | Run tests decorated with `@pytest.mark.<marker>`. |
| `--collect-only` | | `pytest --collect-only -k "http"` | Show which tests would be run without executing them. |

### Controlling Output & Verbosity

| Flag | Alias | Description |
|---|---|---|
| `-v` / `-vv` | `--verbose` | Increase verbosity level. `-vv` is more verbose. |
| `-q` | `--quiet` | Decrease verbosity level (quiet mode). |
| `-s` | `--capture=no` | Disable output capturing. Allows `print()` to show immediately. |
| `-r<chars>` | | Show extra summary info for test categories (see table below). |
| `--tb=style` | | Set traceback style: `auto`, `long`, `short`, `no`, `line`, `native`. |

**`-r` Summary Characters**

| Char | Meaning |
|---|---|
| `f` | failed |
| `E` | error |
| `s` | skipped |
| `x` | xfailed (expected to fail) |
| `X` | xpassed (unexpectedly passed) |
| `p` | passed |
| `a` | all (except `p`) |

*Example: `pytest -ra` (show all info) or `pytest -rfs` (show failed and skipped).* 

### Test Session Control

| Flag | Alias | Description |
|---|---|---|
| `-x` | `--exitfirst` | Stop the session instantly on the first failing test. |
| `--maxfail=NUM` | | Stop the session after `NUM` failing tests. e.g., `--maxfail=2`. |
| `--fixtures` | | Show available built-in and user-defined fixtures. |
| `-h` | `--help` | Show all pytest command-line options. |