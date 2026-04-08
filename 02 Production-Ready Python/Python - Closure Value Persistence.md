---
tags:
  - visual-analysis
---

# Python - Closure Value Persistence

**Why This Matters:** Understanding closures is crucial because they allow functions to retain state from their creation environment, which is the foundational mechanism behind powerful programming patterns like decorators.


> [!info] Info
> In this Python example, we explore the concept of a 'closure' by creating a nested function. We'll see how the inner function retains access to a variable from its parent function's scope, even after the original, external variable that provided the value has been explicitly deleted.

---

## The Example
![[Pasted image 20260218194352.png]]

**Visual Evidence Identified:**
- The left panel shows Python code where a function `foo` defines and returns a nested function `bar`.
- The first output block shows `25` after calling the returned function `my_func`.
- The code then deletes the original variable `x` using `del(x)`.
- The second output block surprisingly shows `25` again, even after `x` was deleted.
- The right panel shows introspection code, revealing that the `my_func` object has a closure of length 1, containing the value `25`.

---

## Deconstruction & Analysis
*How this example demonstrates the concept:*

### Step 1: Creating the Closure
First, a global variable `x` is set to `25`. The function `foo(x)` is then called. Inside `foo`, a new function `bar` is defined. `bar` references the `value` argument from its parent `foo`. When `foo` returns `bar`, the resulting function object (now named `my_func`) carries a 'closure' that 'closes over' and remembers the variable `value` (which holds 25).

### Step 2: Initial Function Call
When `my_func()` is called for the first time, it accesses the `value` from its closure and prints `25`. At this point, the behavior is straightforward as the original variable `x` still exists.

### Step 3: Deleting the Original Variable
The statement `del(x)` removes the global variable `x` from memory. A common assumption would be that `my_func` will now fail because the variable it seems to depend on is gone.

### Step 4: The Closure Persists
Despite `x` being deleted, calling `my_func()` again successfully prints `25`. This demonstrates the core principle: the function didn't store a reference to `x`, but rather it captured the *value* of the `value` variable from its enclosing scope at the time of its creation. This captured value lives on inside the function's private closure.

### Step 5: Visual Proof
The introspection code on the right confirms this. `my_func.__closure__` is a tuple of cells containing the captured variables. `len(...)` shows there is one such cell, and `cell_contents` reveals its value is `25`, proving the data is stored within the function object itself.

---

## Core Takeaway
*The general principle proved by this example:*

This example visually demonstrates that a closure is a function that bundles together its own code with a reference to its lexical environment. The crucial insight is that this environment is preserved; the function retains the state of its parent scope at the moment of its creation, making it independent of the original variables' lifecycle.