---
tags:
  - visual-analysis
---

# Python - Basic Closure with foo() and bar()

**Why This Matters:** Closures allow functions to retain a 'memory' of their creation environment, which is the foundation for powerful patterns like decorators and factory functions in Python.


> [!info] Info
> In this example, we explore a Python 'closure' by defining an outer function `foo` that creates and returns a nested function `bar`. We will execute this returned function after its original parent scope has been destroyed and inspect how it still 'remembers' the variables it needs to operate.

---

## The Example
![[Pasted image 20260218193530.png]]

**Visual Evidence Identified:**
- The left pane shows the Python code defining the functions `foo` and `bar`.
- The line `func = foo()` assigns the returned `bar` function to the variable `func`.
- The output `5` on the left confirms that calling `func()` successfully prints the value of `a`.
- The right pane shows code that introspects the `func` object's special `__closure__` attribute.
- The output on the right reveals that `__closure__` is a tuple containing one cell, and the content of that cell is the integer `5`.

---

## Deconstruction & Analysis
*How this example demonstrates the concept:*

### **Step 1: Defining the Function Factory**
The outer function `foo` is defined. Inside its scope, it creates a local variable `a = 5` and defines a nested function `bar`. The sole purpose of `foo` is to act as a 'factory' that creates and returns the `bar` function object.

### **Step 2: Creating and Returning the Nested Function**
The line `func = foo()` executes the `foo` function. This creates the `bar` function. Crucially, when `foo` returns `bar`, Python sees that `bar` references the nonlocal variable `a`. It 'closes over' this variable, bundling a reference to `a` with the `bar` function object. The `foo` function then finishes executing, and its local scope (including `a`) is technically gone.

### **Step 3: Executing the Closure**
When `func()` is called, we are actually invoking the `bar` function that was created earlier. Even though the `foo` scope no longer exists, `bar` still has access to the variable `a` that was bundled with it. As a result, it successfully executes `print(a)` and outputs `5`.

### **Step 4: Inspecting the Evidence**
The right side of the image provides concrete proof of the closure. By inspecting the special `func.__closure__` attribute, we see it's a tuple of length 1. Accessing the contents of the first 'cell' in this tuple (`func.__closure__[0].cell_contents`) reveals the value `5`. This shows precisely how Python stores the 'remembered' variables from the enclosing scope.

---

## Core Takeaway
*The general principle proved by this example:*

This example visually demonstrates that a closure is a function object that retains access to variables from the enclosing scope in which it was defined, even after that scope has completed execution. The `__closure__` attribute is the internal mechanism that makes this 'memory' possible, storing the necessary nonlocal variables for later use.