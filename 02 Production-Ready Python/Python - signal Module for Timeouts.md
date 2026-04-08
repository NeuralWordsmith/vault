---
tags:
  - core
  - python
  - signal
  - alarm
  - timeout
  - asynchronous_event
  - interrupt
  - concept
source:
  - "[[Writing Functions in Python]]"
related:
  - "[[Python - Decorators]]"
  - "[[Process - Creating a Decorator with Arguments (Timeout Example)]]"
  - "[[Python - Hardcoded Timeout Decorator]]"
  - "[[Python - Flexible Timeout Decorator Factory]]"
  - "[[Python - Error Handling]]"
  - "[[Python - Functions]]"
  - "[[Python - Context Managers]]"
  - "[[Python - Functions as First-Class Objects]]"
  - "[[Fundamental - Programming]]"
  - "[[Python - Nested Functions]]"
  - "[[Python - Closures]]"
---
# Core: Signal Module for Timeouts

## Summary

>The `signal` module in Python provides a way for a program to handle asynchronous events sent by the operating system. For creating timeouts, we use it to set a timer (`signal.alarm()`) and register a special function (a 'handler') that Python will execute when the timer expires (`signal.signal()`). This handler typically raises an exception to interrupt the flow of a long-running function, effectively stopping it.

**Why This Matters:** This mechanism is crucial for preventing long-running functions from blocking an entire program, ensuring system responsiveness and stability by enforcing execution time limits.

_Analogy:_ _Imagine you're a chef cooking a complex dish (the main program) and you put a steak in the oven (a function that might take too long). You set a kitchen timer for 10 minutes (`signal.alarm(600)`). You then tell your assistant, "When this timer goes off, yell 'BURNING!' no matter what I'm doing" (`signal.signal()`). You go back to chopping vegetables. When the timer rings (the `SIGALRM` signal is sent), your assistant yells (`the handler function is called`), forcing you to drop everything and deal with the steak (an exception is raised). If you finish early, you turn off the timer (`signal.alarm(0)`) so it doesn't interrupt you later._

**Where it breaks down:** A real chef could choose to ignore the assistant's yell for a moment. In Python, the signal handler's execution is mandatory and immediately interrupts the program's flow. Furthermore, this timer analogy doesn't capture the critical limitation that this mechanism is generally unavailable on Windows and is not safe to use in multi-threaded applications.

```
Start Program
      │
      ▼
┌──────────────────────────────────┐
│ signal.signal(SIGALRM, handler)  │  (Register Handler)
└──────────────────────────────────┘
      │
      ▼
┌──────────────────────────────────┐
│     signal.alarm(5)              │  (Set 5-second timer)
└──────────────────────────────────┘
      │
      ▼
  Run Function()
      ├───────────┐
      │           │
(If finishes     (If takes
 in < 5s)        > 5s)
      │           │
      ▼           ▼
┌───────────┐   SIGALRM Sent ───► Call handler() ───► Raise TimeoutError
│ alarm(0)  │
└───────────┘
      │
      ▼
  End Program
```

## Details

The `signal` module allows a Python program to interact with low-level operating system signals. The core idea for creating a timeout is to leverage the alarm signal (`SIGALRM`), which is a standard POSIX signal for timers. The process involves three key functions from the module: `signal.alarm()` to start a countdown, `signal.signal()` to register what should happen when the countdown ends, and a custom handler function that we define to raise an exception and halt execution. This is the foundational technique used to build timeout decorators like the one seen in the [[Python - Hardcoded Timeout Decorator]].

#### Primary Goal

To provide a mechanism for interrupting a function's execution after a specified duration has passed, preventing it from running indefinitely and blocking the program.

#### Mechanism

- **Step 1: Define the Timeout Handler**
    - Create a simple function that accepts two arguments, `signum` (the signal number) and `frame` (the current stack frame). Its only job is to raise an exception, such as a custom `TimeoutError`.
- **Step 2: Register the Handler**
    - Use `signal.signal(signal.SIGALRM, handler_function)` to associate the alarm signal with your handler. This tells Python, "When you receive the `SIGALRM` signal, execute my handler."
- **Step 3: Set the Alarm**
    - Call `signal.alarm(seconds)` with an integer number of seconds. This schedules the `SIGALRM` signal to be sent to your program after that duration.
- **Step 4: Execute Code and Handle Timeout**
    - Wrap the potentially long-running code in a `try...except` block to catch the `TimeoutError` that the handler will raise.
- **Step 5: Cancel the Alarm**
    - Crucially, place `signal.alarm(0)` in a `finally` block. This cancels any pending alarm, ensuring it doesn't fire unexpectedly later if the function finishes before the timeout.

##### Code Translation

```python
import signal
import time

# --- Step 1: Define the Timeout Handler ---
class TimeoutError(Exception):
    pass

def raise_timeout(signum, frame):
    """This is the handler function that raises our custom exception."""
    raise TimeoutError("Function call timed out")

def long_running_function():
    print("Starting long function...")
    time.sleep(10) # Simulate a long task
    print("Long function finished.")

# --- Step 2: Register the Handler for the Alarm Signal ---
signal.signal(signal.SIGALRM, raise_timeout)

# --- Step 3: Set the Alarm for 5 seconds ---
signal.alarm(5)

try:
    # --- Step 4: Execute the Target Code ---
    print("Calling the function with a 5-second timeout.")
    long_running_function()
except TimeoutError as e:
    print(f"Caught expected exception: {e}")
finally:
    # --- Step 5: Cancel the Alarm ---
    # This is critical to prevent the alarm from firing later
    signal.alarm(0)
    print("Alarm cancelled.")

```

 [[Code - Signal Module for Timeouts Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`signal.signal(signalnum, handler)`**
    - `signalnum`: The integer representing the signal to be handled. For timeouts, this is always `signal.SIGALRM`.
    - `handler`: The callable (function) that will be executed when the signal is received. It can also be one of two special values: `signal.SIG_IGN` to ignore the signal or `signal.SIG_DFL` for the default behavior.
- **`signal.alarm(seconds)`**
    - `seconds`: An integer specifying the number of seconds until the `SIGALRM` signal is sent. If `seconds` is 0, any previously scheduled alarm is cancelled.

#### Core Trade-offs

- **Platform Incompatibility**
    - The primary drawback is that `signal.alarm` is not available on Windows, making any solution based on it non-portable.
- **Single Global Timer**
    - A process can only have one alarm scheduled at a time. Calling `signal.alarm()` will overwrite any previously set alarm, which can lead to bugs in complex applications.
- **Not Thread-Safe**
    - Signals are delivered to the main thread of a process. Using this mechanism in a multi-threaded program can lead to unpredictable behavior, as the signal might interrupt a thread that did not set the alarm.

## Connections

```
                      (Parent)
                     Decorators
                         ▲
                         │
         ┌───────────────┼────────────────────────────┐
         │               │                            │
(Implementation)  ┌───────────────────────────┐   (Implementation)
Hardcoded Timeout │ Signal Module for Timeouts│   Flexible Timeout
                  └───────────────────────────┘
                         │
                         ▼
                     (Process)
         Creating a Decorator with Arguments
```

### Parent Concept

This concept is a fundamental technique used to implement more advanced patterns, such as [[Python - Decorators]] that enforce time limits on function execution.

### Child Concepts



### Related Concepts 

- The [[Python - Hardcoded Timeout Decorator]] provides a direct, practical application of this signal-based timing mechanism.
- This low-level signal handling is abstracted away in the [[Python - Flexible Timeout Decorator Factory]], which builds upon this core idea to create a more reusable and configurable tool.
- The entire [[Process - Creating a Decorator with Arguments (Timeout Example)]] relies on the principles of the signal module to add timeout functionality to a decorator.
- This approach contrasts with other concurrency models in Python, such as using the `threading` or `multiprocessing` modules, which offer more robust but complex ways to handle long-running tasks.
## Questions

- Given that `signal.alarm` is not available on Windows and is not thread-safe, how would you justify its use in a cross-platform library? What alternative timeout mechanisms would you propose for a production system that must support both Linux and Windows, and what are the performance vs. complexity trade-offs?
- Imagine you have a web server with multiple worker processes handling requests. If you implement a timeout using `signal.alarm` within a request handler, what potential race conditions or unintended side effects could occur if another long-running task in the same process also tries to set its own alarm? How would you design a system to manage a single, process-wide alarm resource safely?
- What if the Python Global Interpreter Lock (GIL) was removed? How would that fundamentally change the reliability and behavior of signal handling for timeouts in a multi-threaded context, and what new failure modes might emerge?