---
tags: 
  - core
  - python
  - performance_testing
  - benchmarking
  - magic_command
  - ipython
  - profiling
  - concept
source: 
  - "[[Writing Efficient Python Code]]"
related: 
  - "[[Python - %timeit Magic Command]]"
  - "[[Python - Performance Testing]]"
  - "[[Python - Code Runtime]]"
  - "[[Python - IPython Magic Commands]]"
  - "[[Python - %timeit Line vs Cell Magic Mode]]"
  - "[[Python - %timeit -o Flag (Saving Output)]]"
  - "[[Python - Efficient Code]]"
  - "[[DSA - Big O Notation]]"
  - "[[SWE - Continuous Integration (CI)]]"
  - "[[Python - Profiling]]"
  - "[[Python - time Module]]"
---
# Core: %timeit Runs and Loops

## Summary

>In the `%timeit` magic command, 'runs' and 'loops' are two levels of repetition used to accurately benchmark code. A 'run' is a single measurement cycle, and 'loops' are the number of times the code is executed within that single cycle. The total number of executions is the product of runs and loops, providing a more robust average by smoothing out temporary system fluctuations.

**Why This Matters:** Understanding runs and loops allows you to fine-tune performance measurements, ensuring you get a statistically stable and reliable estimate of your code's runtime without waiting an unnecessarily long time.

_Analogy:_ _Think of a scientist testing a new fertilizer's dissolving time. The 'loops' are how many times she dissolves a sample and times it in a single afternoon in her lab. Let's say she does this 10 times (10 loops). The 'runs' are the number of different days she repeats this entire process. She might do it on Monday and again on Wednesday (2 runs). This helps account for variations in lab conditions like temperature or humidity between days. The final reported time is the average across the two days, giving a more reliable result than just testing on a single day._

**Where it breaks down:** In a real lab, conditions between 'runs' (days) can change significantly. With `%timeit`, the system state between runs is usually very similar. The primary purpose of runs in `%timeit` is to gather multiple independent measurements to calculate a stable mean and standard deviation, rather than to account for major environmental shifts.

```
Run 1
  ├─ Loop 1: np.random.rand(1000)
  ├─ Loop 2: np.random.rand(1000)
  ├─ ...
  └─ Loop 10: np.random.rand(1000)
  ───> Record Time for Run 1

Run 2
  ├─ Loop 1: np.random.rand(1000)
  ├─ Loop 2: np.random.rand(1000)
  ├─ ...
  └─ Loop 10: np.random.rand(1000)
  ───> Record Time for Run 2

Final Result = Average & StdDev of [Time_Run1, Time_Run2]
```

## Details

When measuring [[Python - Code Runtime|code runtime]], a single execution can be misleading due to system noise or caching. The [[Python - %timeit Magic Command|%timeit magic command]] addresses this by using a two-tiered system of repetition: runs and loops. A 'run' is an independent timing trial. Within each run, the code is executed in a 'loop' a specified number of times. The final result is the average and standard deviation of the times recorded for each run. You can control these using the `-r` flag for runs and the `-n` flag for loops, allowing you to balance measurement precision with the total time spent benchmarking.

#### Primary Goal

To provide granular control over the benchmarking process, enabling a trade-off between the statistical reliability of the timing estimate and the total execution time of the test.

#### Mechanism

- **Step 1: Define the Code to Time**
    - Start with the line of Python code you want to benchmark. In this case, we're creating a NumPy array of 1000 random numbers.
- **Step 2: Specify the Number of Runs (`-r`)**
    - Use the `-r` flag followed by an integer to set how many independent timing experiments to conduct. Here, `-r2` means the entire timing process will be performed twice.
- **Step 3: Specify the Number of Loops (`-n`)**
    - Use the `-n` flag followed by an integer to set how many times the code should be executed within each single run. Here, `-n10` means the code will be executed 10 times per run.
- **Step 4: Execute and Interpret the Output**
    - Run the command. The total number of executions will be `runs * loops` (2 * 10 = 20). The output will show the mean and standard deviation calculated from the results of the 2 runs.

##### Code Translation

```python
# We need numpy for this example
import numpy as np

# --- Step 1: Define the code to time ---
# The code is `rand_nums = np.random.rand(1000)`

# --- Step 2 & 3: Specify runs and loops ---
# -r2 sets the number of runs to 2.
# -n10 sets the number of loops to 10.

# --- Step 4: Execute the command in an IPython/Jupyter environment ---
%timeit -r2 -n10 rand_nums = np.random.rand(1000)

# Expected Output:
# 16.9 µs ± 5.14 µs per loop (mean ± std. dev. of 2 runs, 10 loops each)
```

 [[Code - %timeit Runs and Loops Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`-r<R>` (Number of Runs)**
    - Controls the number of times the entire timing experiment is repeated. A higher `R` value leads to a more reliable mean and a more accurate standard deviation, giving you better confidence in the stability of your code's performance. This is the primary lever for statistical significance.
- **`-n<N>` (Number of Loops)**
    - Controls the number of times the statement is executed within a single run. For extremely fast operations, a large `N` is necessary to get a measurable time that isn't dominated by the overhead of the timing mechanism itself. `%timeit` often determines a suitable `N` automatically if it's not specified.

#### Core Trade-offs

- **Precision vs. Time Cost**
    - The main trade-off is between measurement accuracy and the time it takes to run the benchmark. Increasing runs (`-r`) or loops (`-n`) provides a more stable result but directly increases the total execution time.
- **Measurement Overhead**
    - For code that executes in nanoseconds, the timer's own overhead can be significant. Using a sufficiently large number of loops (`-n`) helps ensure that the measured time reflects the code's execution, not the measurement process.
- **Caching Effects**
    - The first execution within a loop might be slower due to factors like CPU cache misses. Subsequent executions in the same loop are often faster. Multiple runs (`-r`) help average out these effects and provide a more realistic performance profile.

## Connections

```
                      (Parent)
              %timeit Magic Command
                         ▲
                         │
┌────────────────────────┼──────────────────────────┐
│                        │                          │
(Mode)      ┌───────────────────────────┐         (Output)
Line vs Cell  │    %timeit Runs & Loops   │         -o Flag
              └───────────────────────────┘
```

### Parent Concept

This concept is a specific feature of the [[Python - %timeit Magic Command|%timeit magic command]], which is one of the useful [[Python - IPython Magic Commands|IPython magic commands]] for code analysis.

### Child Concepts



### Related Concepts 

- The distinction between applying `%timeit` to a single statement or a whole cell is covered in [[Python - %timeit Line vs Cell Magic Mode|%timeit line vs cell magic mode]].
- For programmatic use of timing results, the ability to capture the output is detailed in [[Python - %timeit -o Flag (Saving Output)|the -o flag for saving output]].
- This entire process is a fundamental part of [[Python - Performance Testing|performance testing]] in Python.
- Ultimately, the goal is to understand and improve [[Python - Code Runtime|code runtime]].
## Questions

- You're optimizing a critical API endpoint. Increasing the number of runs/loops from `-r7 -n100` to `-r50 -n1000` gives a 0.1% more stable performance metric, but adds 10 minutes to your CI/CD pipeline. How do you decide if this trade-off is worth it, and how would you explain your decision to the product manager?
- If you were building an automated performance regression testing system that uses `%timeit`, how would you dynamically determine the optimal `-r` and `-n` values for a wide variety of functions with vastly different execution times, ensuring both statistical significance and reasonable test suite duration?
- What if the code you're timing has a 'warm-up' cost, meaning the first execution in any loop is always significantly slower than subsequent ones? How would the concepts of runs and loops either hide or help you diagnose this phenomenon, and how might you change your measurement strategy?