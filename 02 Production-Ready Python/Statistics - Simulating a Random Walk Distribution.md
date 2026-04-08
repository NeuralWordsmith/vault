---
tags:
  - visual-analysis
---

# Statistics - Simulating a Random Walk Distribution

**Why This Matters:** Simulating a random process multiple times allows us to understand the probability distribution of its outcomes, revealing patterns that are invisible in a single trial.


> [!info] Info
> This example uses Python's NumPy library to simulate a 'random walk' representing a series of 10 coin tosses. We first model a single game to track the cumulative number of tails. Then, we expand this by simulating the entire 10-toss game 100 times to collect the final number of tails from each game, thereby generating a distribution of possible outcomes.

---

## The Example
![[Pasted image 20260121211637.png]]
![[Pasted image 20260121211846.png]]

**Visual Evidence Identified:**
- The first code block, `headtailsrw.py`, simulates a single random walk of 10 coin tosses, tracking the cumulative number of tails.
- The second block, `distribution.py`, wraps the single simulation in an outer loop to run it 100 times.
- The output below the second block is a list showing the final number of tails from each of the 100 simulated games, representing the distribution of outcomes.

---

## Deconstruction & Analysis
*How this example demonstrates the concept:*

### Step 1: Simulate a Single Random Walk
In `headtailsrw.py`, we model one game of 10 coin tosses. The `tails` list starts at `[0]`. The `for` loop iterates 10 times. In each iteration, `np.random.randint(0, 2)` simulates a coin toss (0 for heads, 1 for tails), and the new cumulative total is appended to the `tails` list. The final list would show the step-by-step count of tails after each toss.

### Step 2: Repeat the Simulation 100 Times
In `distribution.py`, the goal is to see the range of possible outcomes over many games. The outer `for x in range(100)` loop is introduced to run the entire 10-toss simulation 100 separate times. An empty list, `final_tails`, is created to store the result of each complete game.

### Step 3: Capture the Final Outcome of Each Game
The key line, `final_tails.append(tails[-1])`, is indented to run *after* each 10-toss simulation (the inner loop) but *inside* the 100-run simulation (the outer loop). `tails[-1]` retrieves only the last value from the `tails` list, which is the total number of tails after 10 tosses for that specific game. This final count is then added to the `final_tails` list.

### Step 4: Observe the Resulting Distribution
The final `print(final_tails)` statement executes after all 100 games are finished. The output, `[3, 6, 4, 5, 5, ...]`, is a collection of the final states from 100 independent random walks. Each number represents the total tails from one 10-toss game, and together they form an empirical probability distribution.

---

## Core Takeaway
*The general principle proved by this example:*

This example demonstrates a fundamental concept of computational statistics: by repeatedly simulating a random process, we can generate an empirical distribution of its outcomes. A single random walk shows just one possible path, but simulating many walks reveals the underlying probabilities of different final states. This technique, a form of Monte Carlo simulation, allows us to understand complex systems by observing the results of many random trials.