---
tags:
  - core
  - concept
source:
  - "[[Understanding Machine Learning]]"
related:
  - "[[01 Core Skills/First attempt/ML - Regression]]"
  - "[[01 Core Skills/First attempt/ML - Classification 1]]"
  - "[[Fundamental - Statistics & Probability]]"
  - "[[ML - Observations, Features, and Targets]]"
  - "[[ML - Feature Engineering]]"
---
# Core: Continuous vs. Discrete Variables
## Summary

> In data analysis, a **discrete** variable is a countable value (like the number of rooms), while a **continuous** variable can take any value within a range (like the exact temperature). This distinction determines whether you frame an ML problem as a classification or a regression.

_Analogy: Think of a digital clock versus an analog clock. The digital clock shows **discrete** minutes (it can be 10:10 or 10:11, but nothing in between). The analog clock's second hand sweeps smoothly, representing **continuous** time—it touches every possible point around the dial._

## Details

Understanding this distinction is the first step in translating a business problem into a machine learning problem. The type of target variable you are trying to predict dictates your entire modeling approach.

- **Discrete Variables:**
    - Can only take on a finite, countable number of values.
    - You can list out all the possible values.
    - **When the** _**target**_ **is discrete, it's a [[01 Core Skills/First attempt/ML - Classification 1]] problem.**
    - _Examples:_
        - The number of bedrooms in a house (`2`, `3`, `4`).
        - A customer's subscription tier (`'Basic'`, `'Premium'`, `'Enterprise'`).
        - Whether an email is `spam` or `not_spam`.
- **Continuous Variables:**
    - Can take on any value within a given range. There is always another possible value between any two existing values.
    - You cannot count all the possible values.
    - **When the** _**target**_ **is continuous, it's a [[01 Core Skills/First attempt/ML - Regression]] problem.**
    - _Examples:_
        - The price of a house (`$300,000`, `$300,000.01`, `$300,000.011`...).
        - The temperature outside (`25°C`, `25.1°C`, `25.11°C`...).
        - The height of a person.
- **Problem Framing:**
    - As a machine learning engineer, you often have the power to frame the problem. You can turn a continuous variable into a discrete one if it makes sense for the business goal. This is a key part of [[ML - Feature Engineering]].
    - _Example:_ Instead of predicting the exact `age` of a customer (regression), you could predict their `age_group` (`'Child'`, `'Teen'`, `'Adult'`, `'Senior'`), turning it into a classification problem.

## Connections

This statistical concept is a foundational prerequisite for supervised learning.

- **Determines:** The type of target variable directly determines whether you are solving a [[01 Core Skills/First attempt/ML - Classification 1]] or [[01 Core Skills/First attempt/ML - Regression]] problem.
- **Applies To:** Both **features** and **targets** in your dataset ([[ML - Observations, Features, and Targets]]) can be either continuous or discrete.
- **Foundation For:** Understanding this is critical for [[ML - Feature Engineering]], where you might convert variables from one type to another (e.g., binning).
- **Originates From:** This is a core concept from [[Fundamental - Statistics & Probability]].

## Questions

- What is the difference between a "discrete" variable and a "categorical" variable? (They are often used interchangeably, but "categorical" specifically implies no inherent numerical ordering).
- What is "binning" or "discretization" in the context of feature engineering?
- Are there types of variables that are neither continuous nor discrete? (Leads to ordinal variables, which have a clear order but not a consistent interval, like `'Small'`, `'Medium'`, `'Large'`).
- How do you handle discrete/categorical features when most ML models expect numerical input? (Leads to techniques like One-Hot Encoding and Label Encoding).