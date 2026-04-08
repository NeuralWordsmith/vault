---
tags:
  - visual-analysis
---

# Example - Flexible Timeout Decorator Factory

**Why This Matters:** Parameterizing decorators allows you to create highly reusable and configurable code wrappers that can adapt to different functional requirements, like setting a unique timeout for each function.


> [!info] Info
> In this example, we examine a Python decorator factory named `timeout`. This factory allows us to create a decorator that applies a specific timeout duration to any function it wraps, demonstrating how one decorator can be customized for different needs.

---

## The Example
![[Pasted image 20260223235332.png]]

**Visual Evidence Identified:**
- The code on the left defines `timeout(n_seconds)`, a function that returns a decorator.
- The code on the right shows two functions: `foo()` is decorated with `@timeout(5)`, and `bar()` is decorated with `@timeout(20)`.
- The first output block shows that calling `foo()` results in a `TimeoutError`.
- The second output block shows that calling `bar()` successfully executes and prints `'bar!'`.

---

## Deconstruction & Analysis
*How this example demonstrates the concept:*

### Step 1: Creating a Decorator Factory
The `timeout(n_seconds)` function is a 'decorator factory'. It's not the decorator itself; it's a function that takes an argument (`n_seconds`) and *returns* the actual decorator (`decorator`). This extra layer of nesting is the standard Python pattern for passing arguments to a decorator.

### Step 2: Applying a 5-Second Timeout to `foo()`
The line `@timeout(5)` above `foo()` first calls the factory with `n_seconds = 5`. The returned decorator then wraps `foo()`. When `foo()` is eventually called, its wrapper sets a `signal.alarm(5)`. Since `foo()` attempts to `time.sleep(10)`, the 5-second alarm is triggered before the sleep finishes, causing the `TimeoutError`.

### Step 3: Applying a 20-Second Timeout to `bar()`
Similarly, `@timeout(20)` calls the factory with `n_seconds = 20` to wrap the `bar()` function. When `bar()` is called, its wrapper sets a much longer 20-second alarm.

### Step 4: Successful Execution of `bar()`
The `bar()` function only needs to `time.sleep(10)`. This is less than its 20-second timeout limit. The function completes, prints `'bar!'`, and then enters the `finally` block. The `signal.alarm(0)` call cancels the pending 20-second alarm, ensuring a clean exit.

---

## Core Takeaway
*The general principle proved by this example:*

This example proves that by wrapping a decorator in an outer function (a factory), we can pass arguments to customize its behavior. The inner wrapper function maintains access to these arguments through a closure, enabling the creation of flexible and powerful decorators that can be configured on a per-use basis.