---
tags:
  - visual-analysis
---

# Example - Hardcoded Timeout Decorator

**Why This Matters:** Enforcing timeouts prevents a single long-running function from blocking an entire application, which is critical for building responsive and reliable systems.


> [!info] Info
> This example demonstrates how to create and apply a Python decorator, `timeout_in_5s`, that uses the built-in `signal` module to automatically terminate any function that runs for more than five seconds by raising a `TimeoutError`.

---

## The Example
![[Pasted image 20260223235107.png]]

**Visual Evidence Identified:**
- The code on the left defines the `timeout_in_5s` decorator, which sets a 5-second alarm using `signal.alarm(5)`.
- The code on the right defines a function `foo()` that sleeps for 10 seconds, and applies the timeout decorator to it using the `@timeout_in_5s` syntax.
- The function `foo()` is called.
- The final output, shown in the black box, is a `TimeoutError`, not the expected print statement from the `foo` function.

---

## Deconstruction & Analysis
*How this example demonstrates the concept:*

### **Step 1: Decorating the Function**
The `@timeout_in_5s` syntax above `def foo():` wraps the `foo` function. This means that when `foo()` is called, Python actually executes the `wrapper` function defined inside the `timeout_in_5s` decorator.

### **Step 2: Setting the Alarm**
The first line inside the `wrapper` function is `signal.alarm(5)`. This schedules a `SIGALRM` signal to be sent to the program in exactly 5 seconds, effectively starting a countdown.

### **Step 3: Executing the Wrapped Function**
Inside the `try` block, the original `foo` function is called. It immediately starts its `time.sleep(10)` operation, pausing execution for a planned 10 seconds.

### **Step 4: The Timeout Interrupts Execution**
Before the 10-second sleep can finish, the 5-second alarm goes off. The `SIGALRM` signal is received, which Python translates into a `TimeoutError` exception. This immediately interrupts the `time.sleep(10)` call.

### **Step 5: Cleanup and Final Output**
Because an exception was raised, the program jumps to the `finally` block. `signal.alarm(0)` is executed to cancel the alarm (a crucial cleanup step). The `TimeoutError` then propagates, becoming the final output shown in the black box. The `print('foo!')` line is never reached.

---

## Core Takeaway
*The general principle proved by this example:*

This example demonstrates how decorators can elegantly add cross-cutting behavior, like timeout logic, to any function. By combining system signals with a `try...finally` block, we can create a robust mechanism that guarantees a function either completes successfully within a time limit or is cleanly interrupted, ensuring predictable program behavior.