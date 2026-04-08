---
tags:
  - visual-analysis
---

# Python - Empire State Building Walk Simulation Problem

**Why This Matters:** Monte Carlo simulations allow us to model and find the probability of complex, real-world outcomes that are too difficult to solve with direct mathematical formulas.


> [!info] Info
> In this example, we are using a 'random walk' simulation to model a game of climbing the stairs of the Empire State Building. By defining a set of rules based on dice rolls and adding an element of chance (a small probability of falling), we can run thousands of simulated games to estimate the probability of reaching a specific goal: step 60.

---

## The Example


**Visual Evidence Identified:**
- Initial State: The walk starts at step 0.
- Rule 1 (Step Down): A dice roll of 1 or 2 results in moving down one step, with a floor at 0.
- Rule 2 (Step Up): A dice roll of 3, 4, or 5 results in moving up one step.
- Rule 3 (Bonus Step Up): A roll of 6 triggers a second roll, moving up by that new amount.
- Constraint (Clumsiness): There is a 0.1% chance on any move of falling and resetting to step 0.
- Goal: The simulation aims to determine the probability of reaching step 60 or higher after 100 dice throws.

---

## Deconstruction & Analysis
*How this example demonstrates the concept:*

### **Step 1: Model a Single Game (A Random Walk)**
First, we need to translate the game's rules into a single, repeatable process. This involves a loop that runs 100 times (for 100 dice throws). Inside the loop, we simulate a die roll (a random integer from 1 to 6) and update our current position ('step') based on the outcome, using conditional logic (if/elif/else) to handle the different rules.

### **Step 2: Incorporate All Constraints**
For each move, we must enforce the game's constraints. After calculating a potential downward move, we must ensure the position does not go below zero (e.g., `step = max(0, step - 1)`). Crucially, we also simulate the 0.1% chance of clumsiness by generating another random number; if it falls within that tiny probability window, we reset the `step` variable back to 0, simulating a fall.

### **Step 3: Run Thousands of Simulations (The Monte Carlo Method)**
A single game is determined by luck and tells us nothing about the overall probability. To get a reliable estimate, we must repeat the entire 100-throw game many times (e.g., 10,000 or more). We wrap our single-game logic in another loop, and at the end of each full game, we store the final step reached in a list.

### **Step 4: Calculate the Final Probability**
After running all the simulations, we have a large collection of final outcomes. To find the probability of winning the bet, we count how many of these outcomes are 60 or greater. The final probability is this count divided by the total number of simulations performed. For example, if 780 out of 10,000 simulations ended at or above step 60, our estimated probability is 7.8%.

---

## Core Takeaway
*The general principle proved by this example:*

This example proves that we can find meaningful answers to complex probability questions through computational simulation. Instead of deriving a complex mathematical formula, we modeled the underlying random process, ran it many times, and observed the distribution of outcomes. The law of large numbers ensures that as the number of simulations increases, our estimated probability converges toward the true theoretical probability.