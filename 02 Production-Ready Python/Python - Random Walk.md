---
tags: 
  - major_core
  - python
  - stochastic_process
  - markov_chain
  - brownian_motion
  - time_series
  - probability_theory
  - concept
source: 
  - "[[Intermediate Python]]"
related: 
  - "[[Fundamental - Statistics]]"
  - "[[Python - Simulating a Random Walk]]"
  - "[[Python - Random Step]]"
  - "[[Python - Head or Tails]]"
  - "[[Fundamental - Programming]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - Matplotlib Library]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[Fundamental - MLOps]]"
  - "[[Python - Lists]]"
  - "[[Python - Functions]]"
  - "[[Python - Variables]]"
---
# Major Core: Random Walk

## Summary

> A random walk is a mathematical object that describes a path consisting of a succession of random steps. It's a fundamental concept used to model phenomena where the future position is determined by a series of unpredictable movements. The core building block of any random walk is the individual [[Python - Random Step|random step]], which can be as simple as a coin flip determining direction, like in a [[Python - Head or Tails|heads or tails]] game.

**Why This Matters:** It provides a simple yet powerful model for understanding unpredictable processes across fields like finance, physics, and biology, from stock market fluctuations to molecular motion.

_Analogy:_ _Imagine a drunk person trying to walk home from a lamppost on a long, straight street. At each moment, they are equally likely to stumble one step forward or one step backward. Their position relative to the lamppost after many steps traces a random walk._

  * **The Drunk Person:** The object whose path is being modeled (e.g., a molecule, a stock price).
  * **The Lamppost:** The starting point (e.g., initial price, origin point).
  * **Each Stumble (Forward/Backward):** A single [[Python - Random Step|random step]]. The direction is determined by a random process.
  * **The Path:** The sequence of positions over time, which constitutes the random walk.
  * **Where it breaks down:** This analogy assumes each step is independent and has a fixed size. Real-world phenomena, like stock prices, can have 'memory' (momentum) or step sizes that vary wildly, which a simple random walk model doesn't capture.

```
Start (0) --> Step 1 (+1) --> Position (1) --> Step 2 (-1) --> Position (0) --> Step 3 (+1) --> Position (1) ...
   │
   └─ Each step is a random choice (+1 or -1)
```

## Details

A random walk is a process that describes a path made up of a series of random, successive steps. It's a core concept in the field of statistics and probability theory. The context gives great examples: the path of a molecule in a gas or the fluctuating fortune of a gambler. The key idea is that the next position depends only on the current position plus a random step; the past history of the walk doesn't matter (this is known as the Markov property). We can explore this concept practically by [[Python - Simulating a Random Walk|simulating a random walk]] in code.

#### Primary Goal

To provide a mathematical framework for modeling and analyzing systems that evolve over time through a sequence of unpredictable changes.

#### Mechanism

- **How it Works:**
    1. **Start at an Origin:** The walk begins at a specific point, often zero ($S_0 = 0$).
    2. **Take a Random Step:** At each time interval, a random step ($X_i$) is generated. This step is drawn from a probability distribution. The simplest case is a coin toss, like in [[Python - Head or Tails|heads or tails]], where the step is +1 or -1 with equal probability.
    3. **Update Position:** The new position ($S_n$) is the sum of the previous position ($S_{n-1}$) and the new random step ($X_n$). Mathematically, $$S_n = S_{n-1} + X_n$$.
    4. **Repeat:** Steps 2 and 3 are repeated for the desired number of iterations, tracing out the path of the walk.
- **Key Property: The Markov Property**
    - A random walk is 'memoryless'. The probability of moving to the next state depends *only* on the current state, not on the sequence of states that preceded it.
    - *Example: For the gambler, whether they win or lose the next hand depends only on their current fortune and the random outcome of the game, not on whether they had a winning or losing streak before.*

```python
import random

# This snippet illustrates the logic of a single iteration in a random walk,
# not a full simulation.

# --- Step 1: Define the starting position ---
position = 0

# --- Step 2: Generate a random step ---
# This simulates a single step, like a coin flip.
# This is the core logic used in [[Python - Random Step]]
step = 1 if random.random() < 0.5 else -1

# --- Step 3: Update the position ---
new_position = position + step

print(f"Started at {position}, took a step of {step}, and ended at {new_position}.")
```

 [[Code - Random Walk Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Dimensionality**
    - The number of dimensions the walk can move in.
    - *Example: A 1D walk moves along a line (e.g., gambler's fortune). A 2D walk moves on a plane (e.g., a molecule on a surface).*
- **Step Distribution**
    - The probability distribution from which the size and direction of each step are drawn.
    - *Example: A simple symmetric walk uses a discrete distribution (+1 or -1 with 50% probability each). More complex walks could draw steps from a Normal (Gaussian) distribution.*
- **Barriers/Boundaries**
    - Constraints on the walk's movement.
    - *Example: An 'absorbing' barrier stops the walk (e.g., a gambler goes bankrupt). A 'reflecting' barrier bounces the walk back.*

#### Core Trade-offs

- **Simplicity vs. Realism**
    - The basic random walk model is easy to understand and implement but often oversimplifies reality. Real-world systems like stock markets exhibit features like momentum and volatility clustering that are not captured by a simple random walk.
- **Predictive Power**
    - By definition, a random walk is unpredictable in the short term. Its value is in modeling aggregate, long-term statistical properties (like expected distance from the origin), not in predicting the next specific step.

## Connections

```
             (Parent)
            Statistics
                 ▲
                 │
┌────────────────┼────────────────┐
│                │                │
│       ┌────────────────┐        │
│       │   Random Walk  │        │
│       └────────────────┘        │
│                │                │
└────────────► Children ◄────────────┘
                 │
      Simulating a Random Walk
```

### Parent Concept

It is a fundamental concept within [[Fundamental - Statistics|Statistics]] and probability theory, serving as a basic model for stochastic processes.

### Child Concepts

- A specific implementation is [[Python - Simulating a Random Walk|simulating a random walk]], which uses code to generate and visualize the path.

### Related Concepts 

- The core component of a random walk is the [[Python - Random Step|random step]], which determines the movement at each interval.
- A simple binary choice, like [[Python - Head or Tails|heads or tails]], can be used to determine the direction of each step in a one-dimensional walk.
- It is closely related to Brownian motion, which is essentially a continuous-time limit of a random walk.
- The concept contrasts with deterministic processes, where the future state is entirely determined by the current state without any randomness.
## Questions

- The Efficient Market Hypothesis suggests stock prices follow a random walk. If you're building a trading algorithm, what's the business risk of assuming this is perfectly true, and what's the risk of assuming it's false? How would you justify a budget to explore deviations from a pure random walk model to a CFO?
- Imagine you need to simulate one million parallel random walks for a Monte Carlo simulation in finance. What are the primary computational bottlenecks you'd expect, and how would you design a distributed system to handle this workload efficiently?
- What if each step in a random walk was not independent, but was instead weakly influenced by the average direction of the last 10 steps? How would this 'memory' change the long-term statistical properties of the walk, and what real-world phenomenon might this new model better represent?
