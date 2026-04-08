---
tags: 
  - core
  - python
  - pytest-benchmark
  - decorator
  - performance_testing
  - profiling
  - syntactic_sugar
  - concept
source: 
  - "[[Introduction to Testing in Python]]"
related: 
  - "[[Python - Performance Testing with pytest-benchmark]]"
  - "[[Python - pytest-benchmark Fixture]]"
  - "[[Python - Decorators]]"
  - "[[Python - Nested Functions]]"
  - "[[Python - Performance Testing]]"
  - "[[Python - Pytest Framework]]"
  - "[[Python - Pytest Fixtures]]"
  - "[[SWE - Continuous Integration (CI)]]"
  - "[[Python - Functions as First-Class Objects]]"
  - "[[Python - Closures]]"
  - "[[Python - Interpreting pytest-benchmark Results]]"
  - "[[Python - Use Cases for Performance Testing]]"
  - "[[Python - Performance (Software)]]"
---
# Core: Benchmark Decorator

## Summary

>In `pytest-benchmark`, the `benchmark` fixture can be used as a decorator (`@benchmark`) to wrap a function. This approach is a syntactic alternative to calling `benchmark(callable, *args, **kwargs)`. It is particularly useful for defining and benchmarking a specific, self-contained operation directly inside a test function, enhancing clarity and focus.

**Why This Matters:** This decorator syntax provides a highly readable and explicit way to isolate and measure the performance of a specific block of code within a larger test function.

_Analogy:_ _Think of a professional track coach timing a relay race. The coach has a special stopwatch. Instead of timing the entire race from start to finish, the coach wants to measure the performance of just the third runner. The coach tells the third runner, 'As soon as you get the baton, I'm starting this special stopwatch just for your leg of the race.' The `@benchmark` decorator is like that special stopwatch, assigned to time only one specific 'runner' (a nested function) within the larger 'race' (the main test function)._

In this analogy, the main test function is the entire relay race, the nested function is the specific runner being timed, and the `@benchmark` decorator is the coach's specialized stopwatch. **Where it breaks down:** Unlike a simple stopwatch, the `@benchmark` decorator doesn't just record a single time. It runs the function multiple times to gather robust statistical data, calculating metrics like min, max, mean, and standard deviation, which is crucial for reliable [[Python - Performance Testing|performance testing]].

```
test_func(benchmark):
    │
    └─ Executes normally

        @benchmark  <-- Decorator intercepts the call
            │
            └─ sleep_for_1_sec():
                   │
                   └─ time.sleep(1) <-- This code is run repeatedly and timed.
```

## Details

The `pytest-benchmark` library offers a flexible way to measure code execution time. While the [[Python - pytest-benchmark Fixture|benchmark fixture]] can be called like a regular function, it can also be used as a decorator. As shown in the context, this `@benchmark` syntax allows you to wrap a nested function defined inside your main test function. This pattern cleanly separates the code being measured from the surrounding test setup, making the test's intent immediately obvious: to benchmark the decorated block of code.

#### Primary Goal

To provide a clean, declarative, and highly readable syntax for isolating and benchmarking a specific function or code block within a pytest test.

#### Mechanism

- **Step 1: Define the Test Function**
    - Create a standard pytest test function that accepts the `benchmark` fixture as an argument. This gives you access to the benchmarking functionality.
- **Step 2: Define a Nested Function**
    - Inside the test function, define a new, nested function. This inner function should contain the exact code snippet whose performance you want to measure.
- **Step 3: Apply the Decorator**
    - Place the `@benchmark` decorator directly above the definition of the nested function. This tells `pytest-benchmark` to run this specific function multiple times and collect performance statistics.
- **Step 4: Run Pytest**
    - Execute the test file from the command line using `pytest`. The test function will be called, `pytest-benchmark` will take control of the decorated nested function, run the benchmark, and report the results. The body of the outer test function can remain empty as the decorator handles the execution.

##### Code Translation

```python
# --- Example from context ---
import time

# --- Step 1: Define the test function and accept the fixture ---
def test_func(benchmark):

    # --- Step 3: Apply the decorator ---
    @benchmark
    # --- Step 2: Define the nested function to be benchmarked ---
    def sleep_for_1_sec():
        time.sleep(1)

# The test function itself has no other code. The decorator handles the benchmark.
```

 [[Code - Benchmark Decorator Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Decorator Arguments**
    - The `@benchmark` decorator can accept the same arguments as the `benchmark()` callable, such as `min_rounds`, `timer`, `max_time`, etc., to customize the benchmarking run for that specific test. For example: `@benchmark(min_rounds=10)`.
- **CLI Flags**
    - Global benchmarking behavior is controlled via CLI flags when invoking pytest, such as `--benchmark-min-rounds=5` or `--benchmark-autosave`. These flags can override defaults for all benchmark tests in the session.

#### Core Trade-offs

- **Pros**
    - **Readability:** The intent of the test is exceptionally clear. It's immediately obvious which specific piece of code is being benchmarked.
    - **Isolation:** It cleanly separates the setup code (in the outer function) from the code under test (in the decorated inner function).
    - **Scoping:** It's perfect for benchmarking operations that rely on variables or state set up within the outer test function's scope.
- **Cons**
    - **Verbosity:** For very simple cases, defining a nested function and decorating it can be more verbose than a single line like `benchmark(my_existing_function)`.
    - **Complexity:** This pattern requires an understanding of both [[Python - Decorators|decorators]] and [[Python - Nested Functions|nested functions]], which might add a slight learning curve for developers new to these concepts.

## Connections

```
                      (Parent)
        Performance Testing with pytest-benchmark
                       ▲
                       │
┌──────────────────────┼──────────────────────┐
│                      │                      │
(Foundation)    ┌──────────────────┐      (Alternative)
Decorators      │ Benchmark Decorator│      pytest-benchmark Fixture
                └──────────────────┘

```

### Parent Concept

This decorator syntax is a specific application within the broader topic of [[Python - Performance Testing with pytest-benchmark|performance testing with pytest-benchmark]].

### Child Concepts



### Related Concepts 

- This pattern is built upon the fundamental Python concept of [[Python - Decorators|decorators]], which modify or enhance functions.
- It provides an alternative syntax to directly calling the [[Python - pytest-benchmark Fixture|pytest-benchmark fixture]].
- The use of an inner function is a direct application of [[Python - Nested Functions|nested functions]], which have access to the enclosing function's scope.
- Ultimately, this is a tool used for the discipline of [[Python - Performance Testing|performance testing]] to ensure code efficiency.
## Questions

- When would the verbosity of the decorator syntax be justified over a simple `benchmark(func)` call, especially in a large test suite where conciseness is valued? How does this choice impact code review and maintainability for a team with varying Python skill levels?
- Imagine this decorator pattern is used extensively across hundreds of performance tests in a CI/CD pipeline. How would you design a system to automatically flag performance regressions based on the statistical output from these decorated benchmarks, and what challenges might you face in distinguishing real regressions from environmental noise?
- What if Python's decorator syntax didn't exist? How would you replicate the clean separation of 'code to be benchmarked' from the 'test setup' that this pattern provides, using only standard function calls and classes?