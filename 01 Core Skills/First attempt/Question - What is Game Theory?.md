---
tags:
  - question
  - to-research
status: Answered
related:
  - "[[ML - Reinforcement Learning]]"
---

# Question: What is Game Theory?

## 1. Context & Origin

_Where did this question come from? What was I learning or thinking about that sparked this curiosity? Link to the specific note or course._

> This question arose while studying [[ML - Reinforcement Learning]] and noting that it uses complex mathematics, like **game theory**.

## 2. My Initial Thoughts & Hypothesis

_What is my current guess? Writing down what I think the answer might be, even if it's wrong, is a powerful way to prime my brain for the real answer._

My initial thought is that game theory is the mathematics of strategy. It's probably a formal way to analyze situations where people (or "players") have to make decisions that affect each other, like in chess, economics, or even animal behavior. It likely involves figuring out the "best" move when the outcome depends on what someone else does.

## 3. Research & Findings

_This section is for later. As I find resources (articles, videos, documentation) that help answer the question, I will link them and summarize their key points here._

- **Resource:** [Investopedia: Game Theory](https://www.investopedia.com/terms/g/gametheory.asp "null")
    - _Finding:_ Defines it as the study of how and why people make decisions within a competitive situation. Mentions key concepts like the **Prisoner's Dilemma** and **Nash Equilibrium**.
- **Resource:** [Video: Game Theory Explained in One Minute](https://www.google.com/search?q=https://www.youtube.com/watch%3Fv%3DM952hE2__iI "null")
    - _Finding:_ Emphasizes that it's about strategic decision-making where the outcome for a player depends on the actions of other players. It's not just about "games" but any interactive situation.
- **Resource:** [[ML - Reinforcement Learning]] note
    - _Finding:_ RL is about an **agent** taking **actions** in an **environment** to maximize a **reward**. This sounds a lot like a "player" taking a "strategy" to maximize a "payoff." The environment itself can be seen as the other player in the game.

## 4. The Synthesized Answer

_Once I have enough information, I will write the final, clear answer in my own words here. This act of synthesis is the final step in truly understanding the topic._

**Game Theory** is a theoretical framework for analyzing situations of strategic interaction between rational decision-makers. In simpler terms, it's the math of making choices when the result of your choice depends on the choices of others.

The core of any "game" consists of three elements:
1. **Players:** The rational decision-makers in the game.
2. **Strategies:** The set of possible actions each player can take.
3. **Payoffs:** The outcome or reward (positive or negative) that each player receives for every possible combination of strategies.

A key concept is the **Nash Equilibrium**, which is a state where no player can do better by unilaterally changing their strategy, assuming all other players' strategies remain unchanged.

**The connection to Reinforcement Learning is direct and fundamental.** In RL, the **agent** is a player in a game. The **environment** can be thought of as the other player. The agent's **policy** is its strategy for choosing actions, and the cumulative **reward** is its payoff. The goal of an RL algorithm is to find an optimal policy (a strategy) that maximizes its reward, which is equivalent to finding a solution to the game defined by the agent and the environment.