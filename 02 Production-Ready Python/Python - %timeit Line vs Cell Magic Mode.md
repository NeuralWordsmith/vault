---
tags: 
  - core
  - python
  - ipython
  - magic_commands
  - performance_profiling
  - line_magic
  - cell_magic
  - concept
source: 
  - "[[Writing Efficient Python Code]]"
related: 
  - "[[Python - %timeit Magic Command]]"
  - "[[Python - IPython Magic Commands]]"
  - "[[Python - Performance Testing]]"
  - "[[Python - Code Runtime]]"
  - "[[Python - %timeit Runs and Loops]]"
  - "[[Python - %timeit -r and -n Flags]]"
  - "[[Python - %timeit -o Flag (Saving Output)]]"
  - "[[Python - List Comprehensions]]"
  - "[[Python - Efficient Code]]"
  - "[[Python - Standard Library]]"
  - "[[Python - for Loop]]"
  - "[[Python - Generator Expressions]]"
  - "[[SWE - Readability]]"
---
# Core: Line vs. Cell Magic for %timeit

## Summary

>%timeit is a versatile [[Python - IPython Magic Commands|IPython magic command]] that can operate in two modes. Line magic, using a single `%`, is for timing a single line of code. Cell magic, using `%%`, is for timing an entire code cell, which can contain multiple lines. This allows for precise performance measurement of both simple expressions and more complex code blocks.

**Why This Matters:** This distinction provides the flexibility to accurately profile everything from a single, compact expression to a complex, multi-step algorithm within IPython, enabling targeted code optimization.

_Analogy:_ _Think of a film crew's sound recording. Using `%timeit` in line magic mode is like using a directional "boom" microphone to capture the dialogue of a single actor in a scene. It's focused, precise, and isolates one specific sound source. Using `%%timeit` in cell magic mode is like setting up multiple ambient microphones to record the entire soundscape of the scene—all the actors' lines, background noise, and sound effects together._

**Where it breaks down:** The analogy implies that cell magic is less precise. In reality, both methods are highly precise for what they measure. Cell magic simply measures the total execution time of the *entire block* of code as a single unit, not the individual lines within it.

```
Syntax    | Scope                  | Use Case
----------|------------------------|--------------------------------
%timeit   | A single line of code  | Timing a compact expression
          |                        | (e.g., list comprehension)
----------|------------------------|--------------------------------
%%timeit  | The entire code cell   | Timing a multi-line algorithm
          |                        | (e.g., a for loop)
```

## Details

A key feature of the `%timeit` magic command is its dual-mode operation, which adapts to the scope of the code you want to measure. When you need to benchmark a single, self-contained statement, like a list comprehension, you use the "line magic" syntax with one percentage sign (`%`). Conversely, when you need to measure the performance of a larger block of code that spans multiple lines, such as a `for` loop with initialization, you switch to the "cell magic" syntax by using two percentage signs (`%%`) at the very beginning of the cell.

#### Primary Goal

To offer developers the flexibility to time either a single, concise expression or a multi-line block of code with a simple, memorable syntax change.

#### Mechanism

- **Step 1: Use Line Magic (`%`) for Single Statements**
    - Prefix a single line of Python code with `%timeit`. The command will time the execution of only that specific line. This is ideal for quick checks on list comprehensions, function calls, or simple assignments.
- **Step 2: Use Cell Magic (`%%`) for Multiple Lines**
    - Place `%%timeit` at the very top of a code cell. The command will then time the execution of the *entire* cell, from the first line to the last, as a single block. This is necessary for timing code structures that cannot be expressed in one line, like `for` loops, `while` loops, or function definitions.

##### Code Translation

```python
# --- Step 1: Line Magic Example (for a single statement) ---
# Measures the time to create a list using a list comprehension.
%timeit list_comp = [i for i in range(100)]

# --- Step 2: Cell Magic Example (for a multi-line block) ---
# Measures the time for the entire block, including list initialization and the loop.
%%timeit
nums = []
for i in range(100):
    nums.append(i)
```

 [[Code - Line vs. Cell Magic for %timeit Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`%` (Single Percent):** This is the syntax that activates line magic mode. It signals to IPython that the command applies only to the rest of the code on that same line.
- **`%%` (Double Percent):** This activates cell magic mode. It must be placed at the very beginning of a cell and tells IPython to apply the command to all subsequent code within that cell.

#### Core Trade-offs

- **Conciseness vs. Scope:** Line magic (`%`) is more concise for simple, one-line operations. However, it cannot handle logic that requires multiple lines, such as setup and execution.
- **Readability:** Cell magic (`%%`) is often more readable for complex operations, as it separates the timing command from the code being timed, allowing the code block to be formatted normally.
- **Inseparability:** A limitation of cell magic is that it times the *entire* cell. You cannot use it to time just a portion of a multi-line block; the entire block is treated as a single unit of work.

## Connections

```
                                (Parent)
                         %timeit Magic Command
                                  ▲
                                  │
        ┌─────────────────────────┼─────────────────────────┐
        │                         │                         │
(Broader Concept)      ┌───────────────────────────┐      (Related Feature)
IPython Magic Commands │ Line vs. Cell Magic for %timeit │      %timeit -r and -n Flags
                       └───────────────────────────┘
```

### Parent Concept

The distinction between line and cell magic is a fundamental aspect of using the [[Python - %timeit Magic Command|%timeit magic command]] for performance analysis.

### Child Concepts



### Related Concepts 

- This concept is a specific application of the broader system of [[Python - IPython Magic Commands|IPython magic commands]], which provide powerful extensions to the standard Python syntax.
- The number of executions timed by both line and cell magic is controlled by the [[Python - %timeit -r and -n Flags|-r and -n flags]].
- Understanding the difference between [[Python - Formal vs Literal Syntax for Data Structures|formal and literal syntax]] is useful, as line magic is often used to time the highly efficient literal syntax for creating lists or dicts.
- The results from `%timeit` provide insight into the [[Python - Code Runtime|code runtime]], helping to identify performance bottlenecks.
## Questions

- You're optimizing a critical data processing pipeline. You find a multi-line function that can be rewritten as a complex, but single-line, list comprehension. How would you use both cell and line magic to not only prove the one-liner is faster but also justify to your team why the potential loss in readability is an acceptable trade-off for the performance gain in this business-critical context?
- Imagine you are building an automated code review tool that flags inefficient code patterns. How would you design a component that uses `%%timeit` to automatically benchmark multi-line code snippets submitted in pull requests, and what are the potential pitfalls of running arbitrary code like this in an automated CI/CD pipeline (e.g., long run times, resource consumption, security)?
- What if IPython's magic command system was removed entirely? How would you replicate the reliable, multi-run, statistically-sound timing functionality of `%timeit` for both single and multi-line code blocks using only Python's standard library (like the `timeit` module)? What conveniences would you lose?