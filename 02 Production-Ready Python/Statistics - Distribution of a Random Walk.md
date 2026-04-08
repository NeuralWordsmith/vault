---
tags: 
  - core
  - statistics
  - simulation
  - stochastic_process
  - probability_distribution
  - monte_carlo
  - aggregation
  - concept
source: 
  - "[[Intermediate Python]]"
related: 
  - "[[Fundamental - Statistics]]"
  - "[[Statistics - Random Walk]]"
  - "[[Statistics - Simulating a Random Walk Distribution]]"
  - "[[Python - Visualizing Distributions with Histograms]]"
  - "[[Statistics - Simulated vs Theoretical Distribution Relationship]]"
  - "[[Statistics - Central Limit Theorem]]"
  - "[[Statistics - Probability]]"
  - "[[Statistics - Normal Distribution]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - Histogram]]"
  - "[[Statistics - Monte Carlo Simulation]]"
  - "[[Statistics - Law of Large Numbers]]"
  - "[[Statistics - Expected Value]]"
  - "[[Statistics - Variance]]"
---
# Core: Distribution of Final Steps

## Summary

>A distribution of final steps is the collection of all the ending positions from a large number of simulated [[Statistics - Random Walk|random walks]]. Instead of a single, unpredictable outcome, this collection forms a pattern, often visualized with a [[Python - Visualizing Distributions with Histograms|histogram]], which reveals the most and least likely final positions.

**Why This Matters:** By aggregating the outcomes of many random simulations, we can transform the uncertainty of a single event into a predictable pattern, allowing us to calculate the probability of future outcomes.

_Analogy:_ _Imagine a Plinko board from a game show. A single chip is dropped from the top and bounces randomly off pegs until it lands in a slot at the bottom. You can't predict where one chip will land. However, if you drop thousands of chips, they will pile up in the bottom slots, forming a bell-shaped curve. This pile of chips is the distribution of final steps._

• **Single Chip:** A single [[Statistics - Random Walk|random walk]].
• **Pegs:** The random up/down steps in the walk.
• **Final Slot:** The final step (ending position) of one walk.
• **Pile of Chips:** The distribution of all final steps from thousands of walks.
• **Where it breaks down:** The Plinko board has physical boundaries and a fixed number of slots. A theoretical random walk can end on any integer step, and its distribution can spread out infinitely, whereas the Plinko board is finite.

```
Walk 1: Start 0 -> ... -> End +4
Walk 2: Start 0 -> ... -> End -2
Walk 3: Start 0 -> ... -> End +2
Walk 4: Start 0 -> ... -> End -2
...
Walk 1000: Start 0 -> ... -> End 0

    │
    ▼

Collection of Final Steps: [+4, -2, +2, -2, ..., 0]

    │
    ▼

Distribution (Histogram):
    -4 | XX
    -2 | XXXXXX
     0 | XXXXXXXXX
    +2 | XXXXXX
    +4 | XX
```

## Details

The core idea is that while a single [[Statistics - Random Walk|random walk]] is unpredictable, the collective result of many walks is not. By running a simulation thousands of times, as is done when [[Statistics - Simulating a Random Walk Distribution|simulating a random walk distribution]], we gather thousands of different final steps. This collection of outcomes isn't just a random jumble; it forms a predictable statistical distribution. This distribution is powerful because it allows us to move from "what could happen?" to "what is *likely* to happen?", forming the basis for calculating probabilities and making forecasts.

#### Primary Goal

To transform the unpredictable outcome of a single random process into a predictable pattern of outcomes by observing it many times.

#### Mechanism

- **How it Works:**
    1. **Simulation:** Run a large number of independent [[Statistics - Random Walk|random walks]]. Each walk starts at the same point (e.g., 0) and takes the same number of steps.
    2. **Collection:** For each walk, record only its final position (the step it ends on).
    3. **Aggregation:** Collect all these final positions into a single list or array.
    4. **Analysis:** This collection of numbers is the distribution of final steps. It can be analyzed to find the mean, variance, and can be visualized using a [[Python - Visualizing Distributions with Histograms|histogram]] to see its shape.

##### Code Translation

nothing to fill here

 [[Code - Distribution of Final Steps Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Number of Simulations (Walks):**
    - **Impact:** A higher number of simulations leads to a smoother, more reliable distribution that better approximates the true underlying theoretical distribution. A small number might produce a noisy, unrepresentative sample.
- **Number of Steps per Walk:**
    - **Impact:** Increasing the number of steps in each walk causes the distribution of final steps to become wider (higher variance). The possible outcomes spread out further from the starting point.
- **Step Probabilities:**
    - **Impact:** If the probability of stepping up is not equal to stepping down (a biased random walk), the center of the distribution will shift away from the starting point in the direction of the bias.

#### Core Trade-offs

- **Computational Cost vs. Accuracy:**
    - Running more simulations gives a more accurate picture of the true distribution but requires more computational time and resources. One must balance the need for precision with practical constraints.
- **Simulation vs. Theory:**
    - This simulated distribution is an *approximation* of a theoretical one (like the Normal distribution). As explored in the [[Statistics - Simulated vs Theoretical Distribution Relationship|relationship between simulated and theoretical distributions]], the simulation is easy to implement but may not perfectly match the clean mathematical form of the theory, especially with a low number of trials.

## Connections

```
                      (Parent)
    Simulating a Random Walk Distribution
                           ▲
                           │
           ┌───────────────┼──────────────────────────────────┐
           │               │                                  │
(Generates)     ┌──────────────────────────────┐     (Visualized By)
Random Walk     │ Distribution of Final Steps  │     Histogram
                └──────────────────────────────┘
                           │
                  ┌────────┴──────────┐
                  │                     │
      (Enables) Probability       (Approximates) Theoretical
                  Calculation           Distribution
```

### Parent Concept

This concept is the direct outcome of the process of [[Statistics - Simulating a Random Walk Distribution|simulating a random walk distribution]].

### Child Concepts

- Once obtained, this distribution allows for probability calculation, enabling us to answer questions like 'What is the chance the walk ends 10 steps away from the start?'.
- It also serves as the basis for hypothesis testing, where we can check if an observed outcome is statistically significant or likely due to random chance.

### Related Concepts 

- The fundamental process that generates each data point for this distribution is the [[Statistics - Random Walk|random walk]].
- This distribution is often visualized using a [[Python - Visualizing Distributions with Histograms|histogram]] to understand its shape, center, and spread.
- The resulting shape of this distribution often approximates a theoretical one, highlighting the important [[Statistics - Simulated vs Theoretical Distribution Relationship|relationship between simulated and theoretical distributions]].
## Questions

- Imagine you're modeling stock price movements using a random walk. A high-resolution simulation (many steps, many walks) is computationally expensive but gives a more accurate risk profile. How would you explain the trade-off between simulation cost and the business value of a more precise Value-at-Risk (VaR) calculation to a portfolio manager?
- If you were to build a system that continuously simulates market scenarios using random walks to update risk metrics in near real-time, what would be the primary architectural bottleneck? How would you design the data pipeline to handle the aggregation of millions of 'final steps' per minute?
- What if the steps in your random walk were not independent, but instead, the probability of the next step depended on the last 10 steps (i.e., it had memory)? How would that change the shape of the final distribution, and would the concept of a simple distribution of final steps still be as useful?