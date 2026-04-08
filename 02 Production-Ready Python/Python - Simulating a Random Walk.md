---
tags:
  - visual-analysis
---

# Python - Simulating a Random Walk

**Why This Matters:** A random walk transforms a sequence of independent random steps into a cumulative path, a fundamental concept for modeling phenomena like stock prices, particle motion, and population genetics.


> [!info] Info
> This example demonstrates how to build a simple 'random walk' using Python's NumPy library. We simulate a series of 10 coin flips, where each flip is a random step (0 for 'heads' or 1 for 'tails'), and we track the cumulative number of tails over time to observe how the total 'walks' away from its starting point.

---

## The Example
![[Pasted image 20260121203817.png]]

**Visual Evidence Identified:**
- The Python code block defines a simulation using the NumPy library, with a seed for reproducibility.
- The `tails = [0]` line initializes the walk's starting position before any steps are taken.
- The core logic, `tails.append(tails[x] + coin)`, calculates the next position in the walk based on the previous position and a new random step.
- The black output box shows the final list, which is a record of the random walk's position after each of the 10 steps.

---

## Deconstruction & Analysis
*How this example demonstrates the concept:*

### 1. Initialization
The process begins by creating a list `tails = [0]`. This establishes the starting point of our walk: before any coin flips, the cumulative count of tails is zero.

### 2. The First Step (Iteration x=0)
The loop begins. A random number `coin` is generated (with seed 123, the first value is 0, for 'heads'). This is added to the previous state, `tails[0]` (which is 0). The result, `0 + 0 = 0`, is appended. The list is now `[0, 0]`, showing no change in the tails count.

### 3. The Second Step (Iteration x=1)
In the next iteration, the random `coin` flip results in 1 ('tails'). This is added to the *previous* state, `tails[1]` (which is 0). The new state is `0 + 1 = 1`. This result is appended, and the list becomes `[0, 0, 1]`. The cumulative count of tails has now taken its first step up.

### 4. Accumulating the Walk
This process repeats. For each new flip, the code looks at the immediately preceding value in the `tails` list (`tails[x]`) and adds the new random step (0 or 1). If the flip is 0, the next value is the same as the last (a horizontal step). If the flip is 1, the next value increments (a step up).

### 5. The Final Path
The final printed list, `[0, 0, 1, 1, 1, 1, 1, 2, 3, 3]`, is the result of this accumulation. It's not a list of individual flips, but the historical path—the 'walk'—of the total number of tails at each point in time. For example, the '2' indicates that after 8 flips, a total of 2 tails had occurred.

---

## Core Takeaway
*The general principle proved by this example:*

This example illustrates the core principle of a discrete-time stochastic process: the state of a system at any step is determined by its state at the previous step plus a random variable. By accumulating these small, random changes, we can generate a path-dependent history where the past influences the present.