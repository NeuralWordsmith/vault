---
tags: 
  - core
  - python
  - performance
  - profiling
  - magic_command
  - ipython
  - benchmarking
  - concept
source: 
  - "[[Writing Efficient Python Code]]"
related: 
  - "[[Python - %timeit Magic Command]]"
  - "[[Python - Performance Testing]]"
  - "[[Python - IPython Magic Commands]]"
  - "[[Python - %timeit -r and -n Flags]]"
  - "[[Python - %timeit Runs and Loops]]"
  - "[[Python - %timeit Line vs Cell Magic Mode]]"
  - "[[Python - Code Runtime]]"
  - "[[Python - Efficient Code]]"
  - "[[Python - Decorators]]"
  - "[[Python - Standard Library]]"
  - "[[SWE - Continuous Integration (CI)]]"
  - "[[Fundamental - Statistics]]"
  - "[[Python - Matplotlib Library]]"
  - "[[Python - List Comprehensions]]"
---
# Core: %timeit -o Flag

## Summary

>The `-o` flag in the `[[Python - %timeit Magic Command|%timeit magic command]]` captures the detailed timing results into a `TimeitResult` object instead of just printing a summary. This object stores data from all the individual runs, allowing for deeper statistical analysis beyond the standard mean and standard deviation.

**Why This Matters:** It transforms a simple performance measurement into a rich data object, enabling programmatic analysis, statistical validation, and robust comparison of code snippets.

_Analogy:_ _Using `%timeit` without the `-o` flag is like a race announcer just declaring the average lap time at the end of a race. Using the `-o` flag is like getting the official race data packet, which includes a detailed breakdown of every single lap time for every racer, the fastest lap, and the slowest lap._

In this analogy:
- **Race Announcer's Summary:** The standard, printed output of `%timeit`.
- **Official Race Data Packet:** The `TimeitResult` object stored in the variable.
- **Individual Lap Times:** The `.timings` attribute of the result object.
- **Fastest Lap:** The `.best` attribute.
- **Slowest Lap:** The `.worst` attribute.
- **Where it breaks down:** The race data packet is a static report of a past event. The `TimeitResult` object is an active object in your Python session that you can immediately use for further calculations, plotting, or comparisons.

```
[Code Snippet]
      │
      ▼
%timeit -o [Code Snippet]
      │
      ├─► Prints Summary to Console (e.g., "8.69 µs ± 91.4 ns...")
      │
      ▼
[Variable] = TimeitResult Object
      │
      ├─► .timings (List of all run times)
      ├─► .best    (Fastest run time)
      └─► .worst   (Slowest run time)
```

## Details

The `-o` (output) flag is a powerful option for the `[[Python - IPython Magic Commands|IPython magic command]]` `[[Python - %timeit Magic Command|%timeit]]`. Instead of only displaying a summary of the execution time, it saves the results to a variable. This variable holds a special `TimeitResult` object, which contains a wealth of information, including the timings for each individual run. This allows you to move beyond a simple performance check and perform more rigorous statistical analysis, compare different code versions programmatically, or visualize the distribution of run times.

#### Primary Goal

To capture detailed performance metrics from `%timeit` in a structured object for further programmatic analysis and inspection.

#### Mechanism

- **Step 1: Construct the `%timeit` Command**
    - Start with the standard `%timeit` command for the code you want to profile.
- **Step 2: Add the `-o` Flag and Assign to a Variable**
    - Insert the `-o` flag after `%timeit` and use an assignment operator (`=`) to store the output in a variable.
- **Step 3: Execute the Command**
    - Run the cell. The usual summary output will still be printed to the console.
- **Step 4: Inspect the Result Object**
    - Access the attributes of the created variable to analyze the detailed timing data. Common attributes are `.timings` (a list of all run times), `.best` (the fastest run), and `.worst` (the slowest run).

##### Code Translation

```python
import numpy as np

# --- Step 1 & 2: Construct the command with the -o flag and assign to a variable ---
# We want to time the creation of a NumPy array
times_obj = %timeit -o np.random.rand(1000)

# --- Step 3: The command executes and prints the summary automatically ---
# Output will be similar to: 8.69 µs ± 91.4 ns per loop (mean ± std. dev. of 7 runs, 100000 loops each)

# --- Step 4: Inspect the Result Object ---
print(f"\n--- Detailed Analysis ---")
print(f"All run timings (in seconds): {times_obj.timings}")
print(f"Best time: {times_obj.best:.6f} seconds")
print(f"Worst time: {times_obj.worst:.6f} seconds")
```

 [[Code - %timeit -o Flag Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`-o` (output)**
    - This flag instructs `%timeit` to capture the results in a `TimeitResult` object.
    - It must be followed by an assignment to a variable (e.g., `my_results = %timeit -o ...`).

#### Core Trade-offs

- **Pro: Granular Analysis**
    - Enables detailed statistical analysis, such as calculating variance, plotting distributions, or performing significance tests between two different code versions.
- **Pro: Programmatic Comparison**
    - Allows you to store results from multiple code snippets and compare them programmatically, which is more robust than manually comparing printed outputs.
- **Con: Slightly More Verbose**
    - The syntax is slightly longer than a simple `%timeit` call. For a quick, one-off check where you don't need to save the results, it's unnecessary.

## Connections

```
             (Parent)
      %timeit Magic Command
               ▲
               │
┌──────────────┼───────────────────────────┐
│              │                           │
(Controls) ┌───────────────────────────┐ (Context)
-r and -n Flags  │    %timeit -o Flag    │ Performance Testing
             └───────────────────────────┘
```

### Parent Concept

The `-o` flag is a specific option within the broader `[[Python - %timeit Magic Command|%timeit magic command]]`, which is a tool for measuring code execution time.

### Child Concepts



### Related Concepts 

- The `-o` flag works in conjunction with the `[[Python - %timeit -r and -n Flags|-r and -n flags]]`, which control the number of runs and loops that generate the data captured by the output object.
- It is a fundamental tool for `[[Python - Performance Testing|performance testing]]`, moving beyond simple timing to detailed data collection.
- This feature is one of the many powerful `[[Python - IPython Magic Commands|IPython magic commands]]` that enhance the interactive Python experience.
- Understanding the difference between `[[Python - %timeit Line vs Cell Magic Mode|line and cell magic modes]]` is important for applying `%timeit` and its flags correctly to single lines or entire code blocks.
## Questions

- You've found two algorithms for a critical data processing step. Algorithm A has a better average time (lower `.best` attribute), but Algorithm B has a much smaller standard deviation (less variance in the `.timings` list). How would you use the data from the `-o` flag to decide which to deploy, and how would you explain the business value of choosing the more consistent but slightly slower algorithm to a product manager concerned with predictable user experience?
- Imagine you're building an automated performance regression testing suite that runs on every code commit. How would you use the `-o` flag within a CI/CD pipeline to programmatically compare the performance of a function against its previous version, automatically flag a significant slowdown, and store the historical timing data for trend analysis?
- What if the `TimeitResult` object from the `-o` flag didn't exist? How would you replicate its core functionality—capturing a list of individual run times for statistical analysis—using only standard Python libraries like `time` and basic loop structures?