---
tags:
  - visual-analysis
---

# Python - Visualizing Distributions with Histograms

**Why This Matters:** Increasing the number of trials in a random experiment reveals that the observed results will converge towards the true, theoretical probability distribution.


> [!info] Info
> In this example, we simulate a series of coin toss games to understand how empirical data approaches a theoretical distribution. Each 'game' consists of flipping a coin 10 times and counting the number of tails. We then repeat this entire game hundreds, then thousands of times, and plot the frequency of each outcome (e.g., how many games resulted in 5 tails) on a histogram.

---

## The Example
![[Pasted image 20260121212351.png]]
![[Pasted image 20260121212439.png]]
![[Pasted image 20260121212532.png]]
![[Pasted image 20260121212556.png]]

**Visual Evidence Identified:**
- The initial Python script uses `numpy` and `matplotlib` to simulate 100 games of 10 coin flips each.
- The histogram for 100 simulations shows a rough, somewhat lumpy distribution of tail counts.
- The histogram for 1,000 simulations shows a more defined, symmetrical distribution, starting to form a bell shape.
- The histogram for 10,000 simulations reveals a smooth, clear bell-shaped curve, closely approximating the theoretical distribution.

---

## Deconstruction & Analysis
*How this example demonstrates the concept:*

### Step 1: Establishing a Baseline with 100 Simulations
The initial Python script (Image 1) simulates the 10-coin-flip game 100 times. The resulting histogram (Image 2) provides a first look at the distribution of outcomes. While it shows that outcomes around 4-6 tails are most common, the small sample size results in a coarse and somewhat random-looking shape. This is an *empirical distribution* based on limited data.

### Step 2: Refining the Distribution with 1,000 Simulations
By changing the loop from `range(100)` to `range(1000)`, we increase the number of experiments tenfold. The resulting histogram (Image 3) is visibly smoother and more symmetric. The central tendency around 5 tails becomes much clearer, and the bars on either side begin to form a more predictable slope. The distribution is less noisy and is starting to converge.

### Step 3: Converging to the Theoretical with 10,000 Simulations
Finally, we increase the simulation count to 10,000 runs. The histogram (Image 4) now shows a classic, smooth bell-shaped curve. The random noise from the smaller sample sizes has been averaged out, revealing a shape that closely matches the *theoretical binomial distribution*. This demonstrates that with a sufficiently large number of trials, the results of a random experiment will mirror the true underlying probability.

---

## Core Takeaway
*The general principle proved by this example:*

This visual progression powerfully illustrates the Law of Large Numbers. It shows that as the number of repeated, independent random trials (the coin toss games) increases, the empirical distribution of their outcomes (the histogram) converges to the true, theoretical probability distribution (the bell-shaped binomial distribution). A small number of trials can be noisy and misleading, while a large number reveals the predictable, underlying pattern.