---
tags: 
  - core
  - python
  - unittest
  - cli
  - interrupt
  - test_runner
  - graceful_shutdown
  - concept
source: 
  - "[[Introduction to Testing in Python]]"
related: 
  - "[[Python - unittest Command-Line Interface]]"
  - "[[Python - Running unittest from CLI]]"
  - "[[Python - Interpreting unittest CLI Output]]"
  - "[[Python - unittest CLI -f Flag (Fail Fast)]]"
  - "[[Python - unittest CLI Verbose Flag]]"
  - "[[Python - unittest CLI -k Flag (Keyword Selection)]]"
  - "[[Python - Software Testing]]"
  - "[[SWE - Testing Best Practices]]"
  - "[[SWE - Python Testing Frameworks]]"
  - "[[Python - Pytest Framework]]"
  - "[[SWE - Continuous Integration (CI)]]"
  - "[[Python - Error Handling]]"
  - "[[Python - unittest CLI Flags Cheatsheet]]"
---
# Core: unittest CLI -c Flag (Catch)

## Summary

>The `-c` or `--catch` flag is an option for the [[Python - unittest Command-Line Interface]] that modifies how the test runner handles keyboard interrupts (Ctrl+C). It provides a two-stage mechanism to stop a test suite gracefully, allowing the currently running test to finish and reporting its results, or to stop it immediately if needed.

**Why This Matters:** This flag is crucial for maintaining productivity when working with large, time-consuming test suites, as it allows you to stop a run early without losing all progress.

_Analogy:_ _Using the `-c` flag is like being a train conductor with two ways to stop. Pressing `Ctrl+C` once is like the conductor making a calm announcement: 'We will be stopping at the next scheduled station.' The train continues smoothly until it reaches the next stop (the current test finishes), and all passengers who have reached their destination are accounted for (test results are reported). Pressing `Ctrl+C` a second time is like pulling the emergency brake. The train screeches to a halt immediately, right where it is, without waiting to reach a station._

**Where it breaks down:** The analogy implies the emergency brake is a last resort that might cause damage. In `unittest`, the second `Ctrl+C` is a designed feature that simply raises a standard `KeyboardInterrupt` exception; it's an abrupt but clean way to force an immediate stop without causing harm to the test runner itself.

```
Test Run Started with -c flag
          │
          ▼
User Presses Ctrl+C (First Time)
          │
          ▼
┌───────────────────────────┐
│ Is a test currently running? │
└───────────┬───────────────┘
            │
  ┌─────────┴──────────┐
  ▼ (Yes)              ▼ (No)
Wait for test to     Stop immediately,
finish.              Report results.
  │
  ▼
┌───────────────────────────┐
│ User Presses Ctrl+C Again? │
└───────────┬───────────────┘
            │
  ┌─────────┴──────────┐
  ▼ (Yes)              ▼ (No)
Raise KeyboardInterrupt,   Report results of
Stop immediately.          completed tests.
```

## Details

When running a large and potentially slow test suite, you might realize partway through that you need to stop—perhaps you've already seen the failure you were looking for, or you need to fix a bug and restart. Without the `-c` flag, a standard `Ctrl+C` might terminate the entire process abruptly, losing all information about the tests that passed before the interruption. The `catch` flag provides a controlled, two-level mechanism to interrupt the test execution while preserving the results of completed tests.

#### Primary Goal

To give developers control over long test runs, enabling them to interrupt the process while still collecting valuable results from the tests that have already finished.

#### Mechanism

- **How it Works:** The `-c` flag implements a two-tier interrupt system based on the `Ctrl+C` signal.
    - **1. Single `Ctrl+C` (Graceful Stop):** The test runner 'catches' the first interrupt signal. It allows the *currently executing test* to complete normally. Once that test is done, the runner stops, prints a summary of all tests that ran up to that point, and exits cleanly.
    - **2. Double `Ctrl+C` (Immediate Stop):** If a second `Ctrl+C` is pressed while the runner is waiting for the current test to finish, it bypasses the graceful shutdown. It immediately raises a `KeyboardInterrupt` exception, halting everything instantly.

##### Code Translation

```bash
# --- Running unittest with the catch flag ---
# The -c flag enables the graceful interrupt behavior.
# It can be placed anywhere after 'unittest'.
python3 -m unittest -c test_script.py

# The long form --catch is also valid and more descriptive.
python3 -m unittest --catch test_script.py
```

 [[Code - unittest CLI -c Flag (Catch) Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- The `-c` or `--catch` flag is a boolean flag and does not take any arguments itself. Its presence simply enables the interrupt handling behavior.

#### Core Trade-offs

- **Graceful Stop vs. Immediate Feedback:** A single `Ctrl+C` might still take a long time to respond if the currently running test is very slow. You trade immediate termination for a clean report and a graceful shutdown.
    - This contrasts with the [[Python - unittest CLI -f Flag (Fail Fast)|-f flag]], which provides immediate feedback after the very first failure.
- **Risk of Incomplete State:** A double `Ctrl+C` stops everything instantly. If a test was in the middle of creating temporary files or database entries, the `tearDown` or cleanup methods might not run, potentially leaving the test environment in a dirty state.

## Connections

```
                      (Parent)
            unittest Command-Line Interface
                           ▲
                           │
           ┌───────────────┼────────────────────────────┐
           │               │                            │
(Stops on first failure) ┌───────────────────────────┐ (Controls output detail)
      -f (Fail Fast)     │   -c Flag (Catch)         │   Verbose Flag
                         └───────────────────────────┘
```

### Parent Concept

This flag is a specific feature of the [[Python - unittest Command-Line Interface]], which provides various options for customizing test execution.

### Child Concepts



### Related Concepts 

- It provides a different way to stop a test suite compared to the [[Python - unittest CLI -f Flag (Fail Fast)|-f flag]], which stops automatically after the first failure.
- The behavior of the `-c` flag is independent of the [[Python - unittest CLI Verbose Flag|verbosity level]] set for the test output.
- Understanding how to use flags like `-c` is a core part of [[Python - Running unittest from CLI|running unittest effectively from the command line]].
## Questions

- You're debugging a flaky test in a CI pipeline that takes 30 minutes to run. The flakiness appears about halfway through. Would you add the `-c` flag to the CI script to allow manual interruption, or would you rely on the `-f` (fail-fast) flag? Justify your choice in terms of balancing developer time against pipeline resource usage.
- Imagine a test suite that interacts with a live, shared development database. How does the behavior of a double `Ctrl+C` with the `-c` flag (immediate `KeyboardInterrupt`) pose a risk to this shared environment, and what architectural change (e.g., in test setup/teardown) would you propose to mitigate it?
- What if the `unittest` framework didn't provide the `-c` flag? How would you implement a similar graceful shutdown mechanism for a custom test runner using Python's built-in `signal` module?