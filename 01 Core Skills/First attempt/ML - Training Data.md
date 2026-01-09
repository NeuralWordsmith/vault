---
tags:
  - core
  - concept
  - machine-learning
source:
  - "[[Understanding Machine Learning]]"
related:
  - "[[ML - Supervised Learning Data]]"
  - "[[ML - Unsupervised Learning Data]]"
  - "[[ML - Machine Learning Workflow]]"
  - "[[01 Core Skills/First attempt/ML - Machine Learning Model]]"
---
# Core: Training Data
## Summary

> Training data is the foundational dataset used by a machine learning algorithm to learn patterns, and its structure—specifically whether it is labeled or unlabeled—determines the type of machine learning problem.

_Analogy: Think of it like studying for an exam. **Supervised** learning is like using a practice test that comes with an answer key. **Unsupervised** learning is like being given a huge pile of raw lecture notes and having to find the key themes and categories yourself. **Reinforcement** learning is like learning to ride a bike—you don't study a book, you learn from the experience of trying, falling, and adjusting._

## Details

The characteristics of the training data dictate the entire approach to a machine learning problem.

- **The Training Process:** When a model learns from this data, it's called "training a model." This process can take anywhere from seconds for simple models on small datasets to weeks for massive models (like LLMs) on enormous datasets.
- **Structure Defines the Paradigm:**
    - **Labeled Data (for Supervised Learning):** This data contains both the input features **(X)** and the correct output, known as the **label** or **target (y)**. The model's goal is to learn the mapping function from X to y.
        - _Examples:_ Emails labeled as `spam`/`not spam`; house details paired with their final `sale price`.
```Python
# Labeled data has inputs (X) and an output (y)
X = [image_of_a_cat], y = "cat"
X = [patient_symptoms], y = "has_diabetes"
```
- **Unlabeled Data (for Unsupervised Learning):** This data contains only the input features **(X)** with no corresponding output labels. The model's goal is to find hidden patterns, structures, or clusters within the data itself.
	- _Examples:_ Customer purchase histories (to find customer segments); raw text from books (to find topics).        

```Python
# Unlabeled data only has inputs (X)
X = [customer_1_purchase_history]
X = [customer_2_purchase_history]
```
 
- **No Pre-existing Dataset (for Reinforcement Learning):** RL doesn't start with a static dataset. The "data" is a continuous stream of `(state, action, reward)` tuples generated as the agent interacts with its environment. The learning happens from this stream of experience.

## Connections

Training data is the fuel for the entire machine learning engine.
- **Used By:** The process that consumes training data is [[ML - Model Training & Evaluation]].
- **Defines:** The structure of the data determines whether you are doing [[ML - Supervised Learning]], [[ML - Unsupervised Learning]], or [[ML - Reinforcement Learning]]
- **Prerequisite For:** A [[01 Core Skills/First attempt/ML - Machine Learning Model|Machine Learning Model]] cannot exist without it.

## Questions

- What is the critical difference between training, validation, and test data?
- What does the principle of "Garbage In, Garbage Out" (GIGO) mean for machine learning?
- How much data is "enough" to train a model?
- What are the common techniques for handling missing values or errors in training data?
- What are the ethical implications of using biased training data?