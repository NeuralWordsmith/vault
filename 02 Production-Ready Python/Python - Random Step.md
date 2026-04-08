---
tags: 
  - core
  - python
  - stochastic_process
  - simulation
  - markov_property
  - time_series
  - probability
  - concept
source: 
  - "[[Intermediate Python]]"
related: 
  - "[[Python - Simulating a Random Walk]]"
  - "[[Python - Head or Tails]]"
  - "[[Fundamental - Statistics]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - Matplotlib Library]]"
  - "[[Python - Lists]]"
  - "[[Python - Functions]]"
  - "[[Fundamental - Programming]]"
  - "[[Markov Chains]]"
  - "[[Brownian Motion]]"
  - "[[Monte Carlo Simulation]]"
  - "[[Time Series Analysis]]"
  - "[[Quantitative Finance]]"
---
# Core: Random Walk

## Summary

>A random walk is a mathematical object that describes a path consisting of a succession of random steps. Based on the provided context, if a single dice roll determines one random step, a sequence of 100 dice rolls creates a path of 100 random steps, which is known as a random walk. The key idea is that the next position depends only on the current position and a random variable, not on any past positions.

**Why This Matters:** The random walk model is fundamental to quantitative finance for modeling stock prices and to physics for describing the motion of molecules, providing a simple yet powerful framework for understanding seemingly unpredictable systems.

_Analogy:_ _Imagine a person standing on a line at position zero. For every minute that passes, they flip a coin. If it's heads, they take one step forward (+1). If it's tails, they take one step backward (-1). Their path along the line after an hour is a random walk. Their final location is uncertain, but the process that generated the path is clearly defined._

In this analogy:
- **The Person:** Represents the object or variable being tracked (e.g., a stock price, a particle).
- **The Coin Flip:** Is the random process generating the step, similar to the dice roll. This is explored in [[Python - Head or Tails]].
- **The Step Forward/Backward:** Is the random step (e.g., +1 or -1).
- **The Path on the Line:** Is the random walk itself, a cumulative sum of all the random steps.

**Where it breaks down:** This simple analogy assumes each step is independent and has the same probability (a 'memoryless' or Markovian property). Many real-world phenomena, like stock prices, can be influenced by past trends, momentum, or external events not captured by a simple coin flip.

```
Start ───── Step 1 ───── Step 2 ───── Step 3 ───── Step 4 ───── ...
  0    (+1)    1     (-1)    0     (+1)    1     (+1)    2
```

## Details

A random walk describes a path created by a series of random, successive steps. The core idea, as illustrated by the dice example, is that a complex, unpredictable path can emerge from a very simple, repeated random process. It's a foundational concept in the field of stochastic processes and statistics, used to model phenomena where the future state is a random modification of the present state. The most common types are **1D, 2D, and 3D random walks**, which describe movement along a line, on a plane, or in space, respectively.

#### Primary Goal

To provide a mathematical model for a path where each step is determined by chance, allowing for the analysis and simulation of unpredictable processes.

#### Mechanism

- **Step 1: Initialization**
    - Define the starting point of the walk. Typically, this is zero for a 1D walk. Also, decide on the total number of steps to simulate.
- **Step 2: Generate Random Steps**
    - Create a sequence of random values that will determine the direction and magnitude of each step. For a simple walk, this could be a series of +1s and -1s, generated from a process like a coin toss, as demonstrated in [[Python - Head or Tails]].
- **Step 3: Accumulate the Steps**
    - Iterate through the sequence of random steps, adding each one to the previous position to build the path. The result is a list of positions over time, which constitutes the random walk. This entire process is implemented in the note [[Python - Simulating a Random Walk]].

##### Code Translation

```python
import numpy as np
import matplotlib.pyplot as plt

# --- Step 1: Initialization ---
n_steps = 1000
start_position = 0

# --- Step 2: Generate Random Steps ---
# Generate 1000 random steps: +1 or -1
# np.random.randint(0, 2, size=n_steps) generates 0s and 1s.
# We multiply by 2 and subtract 1 to get -1s and 1s.
steps = np.random.randint(0, 2, size=n_steps) * 2 - 1

# --- Step 3: Accumulate the Steps ---
# The first position is the start_position
# The subsequent positions are the cumulative sum of the steps.
random_walk = np.concatenate(([start_position], np.cumsum(steps)))

# This process is a direct application of the concepts in
# [[Python - Simulating a Random Walk]]

# Plotting the walk
plt.plot(random_walk)
plt.title("1D Random Walk")
plt.xlabel("Step Number")
plt.ylabel("Position")
plt.grid(True)
plt.show()
```

 [[Code - Random Walk Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Number of Steps ($N$)**
    - Controls the length of the simulation. A higher number of steps allows the walk to explore more positions and exhibit more complex long-term behavior.
- **Step Probabilities (Bias)**
    - In a simple, symmetric random walk, the probability of stepping forward (+1) is equal to stepping backward (-1), i.e., $p=0.5$. If $p \neq 0.5$, the walk is 'biased' and will have a general drift in one direction.
- **Dimensionality**
    - Determines if the walk is on a line (1D), a plane (2D), or in space (3D). A 2D walk requires random steps for both x and y coordinates at each time point.

#### Core Trade-offs

- **Strength: Simplicity and Generality**
    - The random walk is easy to understand and implement, yet it can model a wide range of complex phenomena, from stock market fluctuations to the diffusion of gases.
- **Limitation: The Markov (Memoryless) Assumption**
    - The core assumption is that the next step is independent of all past steps. This is often an oversimplification. For example, stock prices can exhibit momentum (trends), which violates this assumption.
- **Limitation: Assumes Stationary Step Distribution**
    - The model assumes that the random process generating the steps (e.g., the coin flip probabilities) does not change over time. In reality, market volatility can change, making steps larger or smaller at different times.

## Connections

```
                      (Parent)
               Fundamental - Statistics
                         ▲
                         │
         ┌───────────────┼───────────────┐
         │               │               │
(Source of Randomness)   ┌─────────────┐ (Practical Application)
  Python - Head or Tails │ Random Walk │ Python - Simulating a Random Walk
                         └─────────────┘
                                │
                     ┌──────────┴──────────┐
                     │                     │
           (Continuous Limit)      (Generalization)
            Brownian Motion        Markov Chains
```

### Parent Concept

The concept of a random walk is a fundamental topic within [[Fundamental - Statistics]], specifically in the study of stochastic processes.

### Related Concepts 

- The practical implementation of this concept is detailed in [[Python - Simulating a Random Walk]].
- The individual random step in a simple walk can be generated by a binary outcome, similar to the process described in [[Python - Head or Tails]].
- A random walk is a specific type of Markov Chain, a more general model where the future state depends only on the present state.
- In the limit of very small, frequent steps, a random walk approximates Brownian motion, a key concept in physics and finance.
## Questions

- A financial firm wants to use a random walk model to set risk limits for its trading desk. What is the primary danger of relying solely on this model, and how would you augment it to account for real-world market behaviors like volatility clustering and momentum?
- Imagine you need to simulate the diffusion of 10 million particles, each following a 3D random walk, on a distributed computing cluster. How would you design the system to partition the workload, manage the state of each particle, and aggregate the results efficiently?
- What if the probability of taking a step in a certain direction depended on the last 10 steps taken (i.e., the walk has a short-term memory)? How would this 'path-dependent' random walk differ from a standard one, and what kind of real-world system, like animal foraging patterns, might it better represent?