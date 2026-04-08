---
tags: 
  - major_core
  - statistics
  - random_walk
  - stochastic_process
  - simulation
  - markov_chain
  - time_series
  - concept
source: 
  - "[[Intermediate Python]]"
related: 
  - "[[Fundamental - Statistics]]"
  - "[[Statistics - Distribution of a Random Walk]]"
  - "[[Statistics - Simulating a Random Walk Distribution]]"
  - "[[Python - Visualizing Distributions with Histograms]]"
  - "[[Statistics - Simulated vs Theoretical Distribution Relationship]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - Matplotlib Library]]"
  - "[[Python - Histogram]]"
  - "[[Fundamental - Probability]]"
  - "[[Statistics - Central Limit Theorem]]"
  - "[[Statistics - Law of Large Numbers]]"
  - "[[Finance - Efficient Market Hypothesis]]"
  - "[[Physics - Brownian Motion]]"
---
# Major Core: Random Walk

## Summary

> A random walk is a mathematical object that describes a path consisting of a succession of random steps. In the context of the die-throwing example, each throw dictates the next step (e.g., up or down), and the sequence of all these steps forms the random walk. While a single walk is interesting, the true power emerges when we simulate thousands of them to understand the [[Statistics - Distribution of a Random Walk|distribution of possible outcomes]].

**Why This Matters:** Random walks provide a simple yet powerful framework for modeling unpredictable phenomena across various fields, from the movement of stock prices in finance to the diffusion of molecules in physics.

_Analogy:_ _Imagine a drunk person trying to walk along a narrow street. They start in the middle. For each step they take, they are equally likely to stumble one step to the left or one step to the right. Their path down the street is a random walk._

In this analogy:
- **The drunk person** is the 'walker' or the object whose position we are tracking.
- **The narrow street** represents the one-dimensional space (a line) they can move on.
- **Each stumble (left or right)** is a single random step.
- **Their final position after 100 stumbles** is the endpoint of the random walk.

**Where it breaks down:** The analogy assumes each step is perfectly random and independent. In reality, a person might develop a bias or momentum, stumbling in the same direction several times in a row, which violates the pure randomness assumption of a simple random walk.

```
A single walk's path over 10 steps:

Position
  +3 |
  +2 |         ╭───╮
  +1 |   ╭───╮ │   ╰───╮
   0 | ╭─╯     ╰───────╯
  -1 | ╯
───-┼───────────────────> Time (Steps)
     0 1 2 3 4 5 6 7 8 9 10

Path: [0, -1, 0, 1, 2, 1, 0, 1, 2, 2, 1]
```

## Details

A random walk is a foundational concept in the field of [[Fundamental - Statistics|statistics]] and stochastic processes. It models a path that is built from a series of random, successive steps. The core idea is that the future position of an object depends only on its current position and a random variable that determines the next step; it has no 'memory' of how it got to its current position. By running many simulations, we can move from observing one path to understanding the overall behavior, a process known as [[Statistics - Simulating a Random Walk Distribution|simulating the distribution]].

#### Primary Goal

To model and predict the aggregate behavior of systems where individual movements are random and unpredictable.

#### Mechanism

- **Step 1: Initialization**
    - Define the starting point of the walk (usually 0) and the total number of steps to take (e.g., 100 die throws).
- **Step 2: Generate Random Steps**
    - Create a sequence of random values representing each step. For a simple walk, this could be an array of +1s (for moving up) and -1s (for moving down).
- **Step 3: Accumulate the Steps**
    - Iterate through the sequence of steps, adding each step to the previous position. This is done using a cumulative sum to build the entire path of the walk from start to finish.
- **Step 4: Repetition and Analysis**
    - Repeat the entire process many times (e.g., 10,000 times) to generate a large number of random walks. This collection of walks allows us to analyze the [[Statistics - Distribution of a Random Walk|distribution of the final positions]], often visualized using a [[Python - Visualizing Distributions with Histograms|histogram]].

```python
import numpy as np
import matplotlib.pyplot as plt

# --- Step 1: Initialization ---
n_steps = 100 # Number of throws/steps
start_position = 0

# --- Step 2: Generate Random Steps ---
# Generate 100 random integers: 0 (tails) or 1 (heads)
draws = np.random.randint(0, 2, size=n_steps)
# Convert 0s to -1s (down) and 1s to +1s (up)
steps = np.where(draws > 0, 1, -1)

# --- Step 3: Accumulate the Steps ---
# Calculate the cumulative sum to get the path of the walk
# We prepend the start_position to the cumulative sum
random_walk = np.concatenate(([start_position], np.cumsum(steps)))

# --- Visualization (Optional) ---
# This shows the path of a single random walk
plt.plot(random_walk)
plt.title("A Single Random Walk")
plt.xlabel("Step Number")
plt.ylabel("Position")
plt.grid(True)
plt.show()

print(f"Final position after {n_steps} steps: {random_walk[-1]}")
```

 [[Code - Random Walk Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Number of Steps ($n$)**
    - The total length of the walk. A higher number of steps allows the walk to drift further from the origin, leading to a wider distribution of final positions.
- **Step Probabilities**
    - The likelihood of taking each possible step. An unbiased walk has equal probabilities (e.g., 50% for +1, 50% for -1). A biased walk would favor one direction over another.
- **Step Sizes**
    - The magnitude of each step. Instead of just +1/-1, steps could be drawn from a distribution, like +5/-2, which would change the walk's volatility.
- **Dimensionality**
    - Walks can occur in one dimension (a line), two dimensions (a plane), or more. The die-throwing example is a one-dimensional walk.

#### Core Trade-offs

- **Simplicity vs. Realism**
    - The primary strength of a random walk is its simplicity. However, it assumes 'memorylessness' (the next step is independent of all past steps), which is an oversimplification for many real-world systems like stock markets that exhibit momentum.
- **Descriptive Power vs. Predictive Limitation**
    - Random walks are excellent for describing the overall statistical properties and volatility of a system. However, they cannot predict the specific path of any single future walk.

## Connections

```
                      (Parent)
               Fundamental - Statistics
                       ▲
                       │
    ┌──────────────────┼──────────────────┐
    │                  │                  │
(Related)     ┌──────────────────┐     (Related)
Markov Chain  │   Random Walk    │     Brownian Motion
              └──────────────────┘
                       │
            ┌──────────┴──────────┐
            │                     │
    (Application)         (Application)
  Gambler's Ruin        Stock Price Model
```

### Parent Concept

This concept is a fundamental building block within the broader field of [[Fundamental - Statistics|statistics]], specifically under the study of stochastic processes.

### Child Concepts



### Related Concepts 

- The ultimate goal of simulating many random walks is to understand the [[Statistics - Distribution of a Random Walk|distribution of their endpoints]].
- The process of running thousands of simulations to generate this distribution is detailed in [[Statistics - Simulating a Random Walk Distribution|simulating a random walk distribution]].
- Once a distribution is simulated, it is typically visualized using tools like a [[Python - Visualizing Distributions with Histograms|histogram]].
- A random walk is a specific type of Markov Chain, where the state is the position and the transitions are the random steps.
- The [[Statistics - Simulated vs Theoretical Distribution Relationship|relationship between simulated and theoretical distributions]] explains why our simulation results converge to a predictable shape (like a normal distribution) as the number of walks increases.
## Questions

- You are modeling user engagement on a new app feature as a random walk, where 'up' is a positive interaction and 'down' is a negative one. A simple random walk model is easy to explain but fails to capture user churn after several negative events. How would you justify investing in a more complex, memory-based model to stakeholders, balancing the trade-off between model interpretability and its business value in predicting user retention?
- If you were tasked with simulating one million parallel random walks to model crowd behavior in a city, what would be the primary computational bottleneck in your Python simulation, and how would you leverage libraries like NumPy or Dask to scale the process efficiently?
- What if the steps in a random walk were not independent, but each step's probability depended on the outcome of the previous three steps? How would this 'memory' change the fundamental nature of the walk, and what real-world phenomena might this more complex model better represent?
