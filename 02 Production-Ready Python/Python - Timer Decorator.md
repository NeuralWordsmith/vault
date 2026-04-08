---
tags: 
  - process
  - python
  - decorator
  - profiling
  - metaprogramming
  - higher-order function
  - timing
  - concept
source: 
  - "[[Writing Functions in Python]]"
related: 
  - "[[Python - Decorators & DRY Principle Relationship]]"
  - "[[Python - Don't Repeat Yourself (DRY) Principle]]"
  - "[[Python - When To Use Decorators]]"
  - "[[Python - Memoizing Decorator]]"
  - "[[Python - Memoization]]"
  - "[[Python - Functions]]"
  - "[[Python - Nested Functions]]"
  - "[[Python - Scope]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Python - User-Defined Functions]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Python - Generator Functions]]"
---
# Process: Timer Decorator

**Why This Matters:** This pattern allows you to measure and profile the performance of any function without altering its internal code, making it an essential tool for identifying and optimizing bottlenecks in software.
## Goal & Analogy

> **Goal:** A timer decorator is a higher-order function in Python that wraps another function to measure its execution time. It intercepts the function call, records the time before and after the function runs, prints the elapsed duration, and then returns the original function's result, all without modifying the decorated function's source code. This is a classic example of applying the [[Python - Don't Repeat Yourself (DRY) Principle|DRY principle]] to a cross-cutting concern like performance monitoring.

_Analogy:_ _Imagine a personal trainer timing a sprinter. The sprinter's only job is to run the race (the original function's logic). The trainer (the decorator) stands at the finish line with a stopwatch. The trainer starts the watch when the starting gun fires (before the function runs), waits for the sprinter to cross the finish line (the function completes), stops the watch (after the function runs), and then announces the official time. The trainer doesn't run the race for the sprinter but adds the functionality of timing the performance._

In this analogy:
- **The Sprinter:** The original function being decorated (e.g., `calculate_data()`).
- **The Trainer:** The `timer()` decorator.
- **The Stopwatch:** The `time` module used to record start and end times.
- **Announcing the Time:** The `print()` statement that shows the elapsed duration.
- **The Race Itself:** The execution of the original function's code.

**Where it breaks down:** A real-world trainer might give feedback that changes the sprinter's future performance. A simple timer decorator is passive; it only observes and reports, it doesn't alter the function's logic or its future return values, unlike a [[Python - Memoizing Decorator|memoizing decorator]] which actively caches results to change future behavior.

```
Function Call Flow:

[Call to `my_function()`]
         │
         ▼
┌───────────────────────────┐
│   @timer Decorator        │
│ 1. Start stopwatch        │
│ 2. Call `my_function()`   │
│ 3. Stop stopwatch         │
│ 4. Print elapsed time     │
└───────────────────────────┘
         │
         ▼
[Return `my_function()` result]
```

## The Step-by-Step Process

### Prerequisites / Inputs

- **Decorator Arguments (Advanced)**
    - The basic `timer` decorator doesn't take arguments. However, it can be extended to accept parameters by adding another layer of nesting. For example, you could pass a string to format the output message or a logger object to send the output to a file instead of the console.

### The Steps

- **Step 1: Define the Decorator**
    - Create an outer function, `timer()`, that accepts the function to be decorated (`func`) as its argument.
- **Step 2: Define the Wrapper Function**
    - Inside `timer()`, define a nested function called `wrapper()`. This `wrapper` will accept any positional (`*args`) and keyword (`**kwargs`) arguments so it can stand in for any function it decorates.
- **Step 3: Record Start Time & Execute**
    - Inside `wrapper()`, record the current time using `time.perf_counter()`. Then, call the original function (`func`) with the received `*args` and `**kwargs`, storing its return value in a variable.
- **Step 4: Calculate and Print Duration**
    - After `func` completes, record the end time. Calculate the difference and print a formatted string showing how long the function took to run.
- **Step 5: Return Result and Wrapper**
    - The `wrapper()` function returns the stored result from the original function call. The outer `timer()` function returns the `wrapper` function itself, which replaces the original function.

##### Code Translation

```python
import time
import functools

# --- Step 1: Define the Decorator ---
def timer(func):
    """A decorator that prints the time a function takes to run."""
    # Use functools.wraps to preserve the original function's metadata
    @functools.wraps(func)
    # --- Step 2: Define the Wrapper Function ---
    def wrapper(*args, **kwargs):
        # --- Step 3: Record Start Time & Execute ---
        start_time = time.perf_counter()
        value = func(*args, **kwargs) # Call the original function
        
        # --- Step 4: Calculate and Print Duration ---
        end_time = time.perf_counter()
        run_time = end_time - start_time
        print(f"Finished {func.__name__!r} in {run_time:.4f} secs")
        
        # --- Step 5: Return Result ---
        return value
    
    # The decorator returns the wrapper function
    return wrapper

# Example Usage:
@timer
def waste_some_time(num_times):
    """A simple function that loops to waste time."""
    for _ in range(num_times):
        sum([i**2 for i in range(10000)])

waste_some_time(1)
waste_some_time(10)

# Expected Output:
# Finished 'waste_some_time' in 0.0025 secs
# Finished 'waste_some_time' in 0.0248 secs
```

### Deliverables / Outputs

The core idea of a timer decorator is to augment a function's behavior by 'wrapping' it with additional functionality—in this case, performance timing. It leverages Python's support for higher-order functions, where functions can accept other functions as arguments and return new functions. This allows developers to cleanly separate concerns; the business logic remains inside the original function, while the timing logic resides in the decorator. This pattern is a powerful tool for adhering to the [[Python - Don't Repeat Yourself (DRY) Principle|DRY principle]], as the same timer can be applied to any function with a simple `@timer` syntax.

## Context & Tradeoffs

### When to Use This Process

To measure and report the execution time of any function without modifying its source code, promoting code reuse and separation of concerns.

### Common Pitfalls & Tradeoffs

- **Pro: Code Reusability and Readability**
    - It perfectly embodies the [[Python - Don't Repeat Yourself (DRY) Principle|DRY principle]]. The timing logic is written once and can be applied to any function with a single line (`@timer`), keeping the business logic clean and uncluttered.
- **Pro: Separation of Concerns**
    - It separates the cross-cutting concern of performance monitoring from the primary logic of the function. This makes the code easier to maintain and reason about.
- **Con: Minor Performance Overhead**
    - The wrapper function adds a very small amount of overhead to each function call. For functions that are extremely fast and called millions of times, this overhead could become noticeable. For most applications, it is negligible.
- **Con: Debugging Complexity**
    - Decorators add a layer of indirection. When looking at a traceback, you will see the wrapper function in the call stack. While `functools.wraps` helps preserve the original function's identity, it can still make debugging slightly less direct for beginners.

## Connections

```
                  (Parent)
                   Python
                      ▲
                      │
┌─────────────────────┼─────────────────────┐
│                     │                     │
(Built Upon) ┌──────────────────┐      (Principle)
Nested       │  Timer Decorator │      DRY Principle
Functions    └──────────────────┘
                      │
                      ▼
                 (Application)
             Performance Profiling
```


- The timer decorator is a powerful application of the [[Python - Don't Repeat Yourself (DRY) Principle|DRY principle]], which is central to writing maintainable code and is explored further in [[Python - Decorators & DRY Principle Relationship|the relationship between decorators and DRY]].
- It is fundamentally built upon the concept of [[Python - Nested Functions|nested functions]], where an inner `wrapper` function has access to the variables of the outer decorator function.
- This pattern contrasts with a [[Python - Memoizing Decorator|memoizing decorator]], which also wraps a function but modifies its behavior by caching results to avoid re-computation, rather than just observing its performance.
- Understanding [[Python - When To Use Decorators|when to use decorators]] is crucial for applying this pattern effectively for concerns like timing, logging, or authentication.
- The ability for `timer` to accept `func` as an argument is a core feature of [[Python - Functions|Python functions]] being first-class objects.

## Deeper Questions

- You've implemented a `@timer` decorator on several key API endpoints. During a load test, you find that the small overhead of the decorator, when aggregated over millions of requests, is causing you to miss your p99 latency SLA. How would you justify the trade-off between keeping this simple, readable decorator for development vs. switching to a more complex, lower-overhead production profiling tool like `cProfile` or a commercial APM solution?
- How would you modify this decorator to not just print the execution time, but to push it as a metric (e.g., `function.execution.time`) to a centralized monitoring system like Prometheus or Datadog, including tags for the function name and the server hostname, to enable system-wide performance monitoring in a microservices architecture?
- What if the Python language suddenly removed support for the `@` syntactic sugar for decorators? How would you achieve the same goal of applying timing logic to dozens of functions across a codebase without being able to use the `@timer` syntax, while still adhering strictly to the DRY principle?