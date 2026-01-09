---
tags:
  - major-core
  - concept
  - machine-learning
source:
  - "[[Understanding Machine Learning]]"
related:
  - "[[Fundamental - What is Machine Learning]]"
  - "[[ML - Supervised Learning]]"
  - "[[ML - Unsupervised Learning]]"
  - "[[ML - Training Data]]"
---
# Major Core: Reinforcement Learning
## Summary

> Reinforcement Learning (RL) is a type of machine learning where an agent learns to make optimal sequences of decisions by performing actions in an environment to maximize a cumulative reward.

_Analogy: It's exactly like training a dog. The dog (agent) is in your living room (environment). When it performs a good action (like "sit"), you give it a treat (reward). When it performs a bad action (like chewing the furniture), it gets a penalty (no treat). Over time, the dog learns a policy (a strategy) to maximize its treats._

## Details

Reinforcement Learning is the third major paradigm of machine learning, distinct from supervised and unsupervised learning in how it learns.

- **The Core Loop:** RL works on a trial-and-error loop: 1. The **Agent** observes the current **State** of the **Environment**. 2. The Agent chooses an **Action** based on its current policy. 3. The Environment transitions to a new State and gives the Agent a **Reward** (or penalty). 4. The Agent updates its policy based on this reward, learning which actions lead to better outcomes in certain states.
- **No Labeled Data:** Unlike [[ML - Supervised Learning]], there is no "answer key" or labeled dataset. The agent is never told _what_ the best action was; it must discover it by trying different things. The reward signal is the only feedback it gets.
- **Sequential Decisions:** RL is designed for problems that involve a series of decisions over time, where an early action can have a significant impact on future rewards.
    - _Examples:_ A chess game (the goal is to win the game, not just make one good move), a robot navigating a maze, or an algorithm managing a stock portfolio.
- **Exploration vs. Exploitation:** This is the central challenge in RL. The agent must balance:
    - **Exploitation:** Taking actions it already knows will lead to a good reward.
    - **Exploration:** Trying new, random actions to potentially discover even better rewards.        

## Connections
### Parent Concept
- RL is one of the three main paradigms that falls under the umbrella of [[Fundamental - Machine Learning]].
### Child Concepts & Algorithms
These are the specific algorithms and ideas that are implementations or direct children of Reinforcement Learning:
- [[RL - Q-Learning]]
- [[RL - Deep Reinforcement Learning]]
- [[RL - Policy Gradient Methods]]
### Related Concepts
- **Key Application:** It is the foundational technique for [[AI - Robotics]] and for creating agents that can master complex games (e.g., AlphaGo).
- **Contrasts With:** [[ML - Supervised Learning]] and [[ML - Unsupervised Learning]].

## Questions

- What is the "exploration vs. exploitation" trade-off, and how do algorithms manage it?
- What is a "policy," a "value function," and a "Q-function" in the context of RL?
- How do algorithms like Q-learning work?
- What is Deep Reinforcement Learning, and how does it use neural networks?
- How does RL handle situations where the reward is delayed (e.g., you only find out if you won a chess game at the very end)?