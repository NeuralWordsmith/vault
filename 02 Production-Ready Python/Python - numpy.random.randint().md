---
tags: 
  - core
  - python
  - random_integer
  - discrete_uniform
  - numpy_random
  - simulation
  - half-open_interval
  - concept
source: 
  - "[[Intermediate Python]]"
related: 
  - "[[Python - Random Number Generation with NumPy]]"
  - "[[Python - Coin Toss Simulation Example]]"
  - "[[Python - numpy.random.rand()]]"
  - "[[Python - Pseudo-Random Numbers]]"
  - "[[Python - Random Seed]]"
  - "[[Python - Reproducibility in Random Simulations]]"
  - "[[Python - Hacker Statistics]]"
  - "[[Python - Empire State Building Walk Simulation Problem]]"
  - "[[Fundamental - Statistics]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - Functions]]"
  - "[[Python - Data Types]]"
  - "[[Python - Lists]]"
  - "[[Python - Random Seed & Reproducibility Relationship]]"
---
# Core: numpy.random.randint()

## Summary

>numpy.random.randint() is a function from the NumPy library used for [[Python - Random Number Generation with NumPy|generating random integers]]. It operates on a "half-open" interval, meaning it includes the lower bound but excludes the upper bound, which is a crucial detail for correctly modeling scenarios like the [[Python - Coin Toss Simulation Example]].

**Why This Matters:** This function is the cornerstone of simulating discrete events, like a coin toss or a dice roll, which is fundamental for building probabilistic models and running Monte Carlo simulations.

_Analogy:_ _Imagine a gumball machine that only dispenses numbered gumballs. You tell the machine you want a gumball with a number from 0 up to (but not including) 2. The machine will then randomly give you either a '0' gumball or a '1' gumball, but never a '2'._

The machine is `numpy.random.randint()`. The numbers you specify (0 and 2) are the `low` and `high` arguments. The gumball you get is the random integer result. **Where it breaks down:** Unlike a real gumball machine where removing a gumball changes the probability for the next draw, `randint()` generates numbers with replacement; each draw is independent, based on the underlying [[Python - Pseudo-Random Numbers|pseudo-random number generation]] algorithm.

```
np.random.randint(0, 2)

Possible Outcomes:
[ 0,      1 ]
  ▲       ▲
  │       │
(Heads) (Tails)

The number '2' is the wall; it's never included.
```

## Details

The core idea of `numpy.random.randint()` is to provide a simple way to generate one or more random integers within a specified range. As the context shows for a coin toss, if we need to generate either a 0 or a 1, we must provide the range `(0, 2)`. This is because the function's upper bound is *exclusive*. This behavior is common in programming (like Python's `range()` function) and is essential to remember for accurate simulations. It's a fundamental tool in [[Python - Hacker Statistics]] for simulating discrete random variables.

#### Primary Goal

To efficiently generate random integers from a discrete uniform distribution over a specified half-open interval `[low, high)`.

#### Mechanism

- **Step 1: Import NumPy**
    - First, you need to import the NumPy library, typically with the alias `np`.
- **Step 2: Define the Range**
    - Specify the `low` (inclusive) and `high` (exclusive) boundaries for the random integer. For a coin toss (0 or 1), this is `low=0` and `high=2`.
- **Step 3: Generate the Integer**
    - Call `np.random.randint(low, high)` to produce a single random integer within that range. This is the core of the [[Python - Coin Toss Simulation Example|coin toss simulation]].

##### Code Translation

```python
# --- Step 1: Import NumPy ---
import numpy as np

# Set a random seed for reproducibility, a key concept for simulations.
# See: [[Python - Random Seed & Reproducibility Relationship]]
np.random.seed(42)

# --- Step 2: Define the Range ---
# We want to generate either 0 (Heads) or 1 (Tails).
# The low bound is 0 (inclusive).
# The high bound must be 2 (exclusive).
low_bound = 0
high_bound = 2

# --- Step 3: Generate the Integer ---
coin_toss_result = np.random.randint(low_bound, high_bound)

print(f"The random coin toss result is: {coin_toss_result}")
```

 [[Code - numpy.random.randint() Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`low`**: The lowest integer that can be generated (inclusive). If `high` is not specified, this parameter acts as the exclusive high bound, and the low bound is assumed to be 0.
- **`high`**: The upper bound of the range (exclusive). This value will *never* be generated.
- **`size`**: An optional argument that specifies the shape of the output array of random integers. For example, `size=10` would generate a 1D array of 10 random integers.

#### Core Trade-offs

- **Pro**: It's extremely intuitive and efficient for generating integers from a discrete uniform distribution, making it perfect for simple simulations like dice rolls or coin flips.
- **Con**: The exclusive nature of the `high` parameter can be a common source of off-by-one errors for beginners who might expect `randint(0, 1)` to produce both 0 and 1.
- **Con**: It can be confused with other functions like [[Python - numpy.random.rand()|np.random.rand()]] which generates floats, or Python's built-in `random.randint()` which has an *inclusive* upper bound, leading to potential bugs when mixing libraries.

## Connections

```
                (Parent)
    Random Number Generation with NumPy
                   ▲
                   │
    ┌──────────────┼───────────────────────────┐
    │              │                           │
(Contrast)   ┌───────────────────────────┐   (Application)
numpy.random.rand() │ numpy.random.randint()    │ Coin Toss Simulation
                    └───────────────────────────┘
```

### Parent Concept

This function is a specific implementation within the broader topic of [[Python - Random Number Generation with NumPy|random number generation using the NumPy library]], which provides a suite of tools for creating random data.

### Child Concepts



### Related Concepts 

- It directly contrasts with [[Python - numpy.random.rand()|numpy.random.rand()]], which generates random floating-point numbers in the interval `[0.0, 1.0)` instead of integers.
- Its behavior is foundational to understanding the [[Python - Coin Toss Simulation Example]], where it's used to model the binary outcome.
- The entire process relies on the principles of [[Python - Pseudo-Random Numbers|pseudo-random numbers]] to create sequences that appear random but are deterministic.
- Setting a [[Python - Random Seed|random seed]] is crucial for achieving [[Python - Reproducibility in Random Simulations|reproducibility]] when using this function.
## Questions

- You're building a simulation for a new marketing A/B test where 'A' is 0 and 'B' is 1. A junior developer uses Python's built-in `random.randint(0, 1)` while you use NumPy's `np.random.randint(0, 2)`. How could this seemingly minor difference in implementation lead to drastically different business conclusions, and how would you explain the importance of library consistency to management?
- If you needed to generate a billion random integers for a large-scale Monte Carlo simulation to be run on a distributed cluster, what are the potential memory and performance bottlenecks of using `np.random.randint(low, high, size=1_000_000_000)`, and how might you design a more scalable data generation pipeline?
- What if the `randint` function was fundamentally biased and, over a million trials, produced the `low` value 51% of the time? How would you statistically prove this bias, and what are the implications for simulations that assume a perfectly uniform distribution?