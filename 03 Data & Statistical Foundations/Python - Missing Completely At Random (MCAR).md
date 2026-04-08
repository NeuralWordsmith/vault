---
tags: 
  - core
  - python
  - mcar
  - missing_data
  - randomness
  - data_quality
  - statistical_assumption
  - concept
source: 
  - "[[Cleaning Data in Python]]"
related: 
  - "[[Python - Types of Missing Data]]"
  - "[[Python - Missing At Random (MAR)]]"
  - "[[Python - Missing Not At Random (MNAR)]]"
  - "[[Python - Handling Missing Data in Pandas]]"
  - "[[Python - Dropping Missing Data with .dropna()]]"
  - "[[Python - Imputing Missing Data with .fillna()]]"
  - "[[Python - Detecting Missing Data in Pandas]]"
  - "[[Python - Visualizing Missing Data with missingno]]"
  - "[[Python - Investigating Patterns in Missing Data]]"
  - "[[Python - Data Completeness]]"
  - "[[Python - Missing Data (NaN)]]"
  - "[[Fundamental - Statistics]]"
  - "[[Fundamental - Feature Engineering]]"
---
# Core: Missing Completely At Random (MCAR)

## Summary

>Missing Completely At Random (MCAR) describes a situation where the reason for data being missing is entirely unrelated to any other variable in the dataset, both observed and unobserved. The missingness is purely a result of a random process, like a glitch during data entry or a dropped test tube in a lab. This is one of the three main [[Python - Types of Missing Data|types of missing data]], alongside [[Python - Missing At Random (MAR)|MAR]] and [[Python - Missing Not At Random (MNAR)|MNAR]].

**Why This Matters:** Understanding MCAR is crucial because it's the only scenario where simply deleting rows with missing data won't systematically bias your analysis, making it the ideal—though often unrealistic—situation.

_Analogy:_ _Imagine a researcher conducting a nationwide survey by mailing out 10,000 paper forms. Due to random, unpredictable events in the postal system—a mailbag falling off a truck here, a sorting machine error there—100 of those forms are lost and never returned. The loss of these 100 surveys is completely random and has nothing to do with the respondents' income, location, age, or their answers to the survey questions._

In this analogy, the 'lost survey forms' represent the missing data points. The 'random postal errors' are the mechanism causing the data to be MCAR. The fact that the loss is unrelated to any characteristic of the respondent (like their income or location) is the core principle of MCAR. 
*   **Where it breaks down:** The analogy fails if the postal service is less reliable in certain low-income neighborhoods. In that case, the missingness would be related to income, and the data would be Missing Not At Random (MNAR), not MCAR.

```
A visual representation of MCAR vs. a complete dataset.

Complete Dataset:
+-------+-------+-------+
| Var A | Var B | Var C |
+-------+-------+-------+
|   10  |  Red  |  Yes  |
|   15  |  Blue |  No   |
|   12  |  Red  |  Yes  |
|   18  | Green |  No   |
|   11  |  Blue |  Yes  |
+-------+-------+-------+

MCAR Dataset (Missing values are scattered randomly):
+-------+-------+-------+
| Var A | Var B | Var C |
+-------+-------+-------+
|   10  |  NaN  |  Yes  |
|   15  |  Blue |  No   |
|  NaN  |  Red  |  Yes  |
|   18  | Green |  NaN  |
|   11  |  Blue |  Yes  |
+-------+-------+-------+
```

## Details

Missing Completely At Random (MCAR) is the simplest type of missing data to handle. The core idea is that the probability of a data point being missing is the same for all observations. There is no systematic reason for its absence. This means the missing values are essentially a random subsample of all values. For example, if a survey participant accidentally skips a question, or a piece of lab equipment fails randomly and doesn't record a measurement, the resulting missing data is likely MCAR. This stands in stark contrast to [[Python - Missing At Random (MAR)|MAR]], where missingness is related to other observed variables, and [[Python - Missing Not At Random (MNAR)|MNAR]], where it's related to the missing value itself.

#### Primary Goal

To formally define a type of missingness that is purely stochastic, which validates the use of simple data removal techniques without introducing bias into the remaining dataset.

#### Mechanism

- **Statistical Definition:**
    - The probability that a value is missing for a variable $Y$ does not depend on the observed values of other variables ($X$) or on the unobserved values of $Y$ itself.
    - Formally: $P(	ext{missing} | Y_{obs}, Y_{miss}, X) = P(	ext{missing})$. The probability of missingness is constant.
- **Key Implication:**
    - The dataset that remains after removing observations with missing values (a process called listwise deletion) is still a random, representative subsample of the original intended sample.
    - This means that analyses performed on the complete cases will produce unbiased estimates of parameters like means, variances, and regression coefficients.
- **Common Causes:**
    - *Data entry errors:* A clerk accidentally skips a field at random.
    - *Equipment malfunction:* A sensor fails intermittently without any pattern.
    - *Lost samples:* Biological samples in a lab are accidentally misplaced or destroyed before analysis.

##### Code Translation

nothing to fill here

 [[Code - Missing Completely At Random (MCAR) Implementation|View Full Implementation & Analysis]]

#### Key Parameters



#### Core Trade-offs

- **Advantage: Simplicity**
    - If data is truly MCAR, you can safely use listwise deletion (e.g., `pandas.DataFrame.dropna()`) without introducing systematic bias. This is the easiest and fastest method for [[Python - Handling Missing Data in Pandas|handling missing data]].
    - Statistical analyses remain valid on the reduced dataset, although with less statistical power due to the smaller sample size.
- **Disadvantage: Unrealistic Assumption**
    - MCAR is the strongest assumption you can make about missing data and is often violated in real-world scenarios. It's rare for missingness to be completely unrelated to any other factor.
    - It is difficult to definitively prove that data is MCAR. While statistical tests exist (like Little's MCAR test), they can only provide evidence against the MCAR assumption, not confirm it.
    - Even if data is MCAR, dropping observations reduces the size of your dataset, which decreases statistical power and can increase the variance of your estimates.

## Connections

```
                      (Parent)
               Types of Missing Data
                         ▲
                         │
┌────────────────────────┼────────────────────────┐
│                        │                        │
(Contrast)      ┌──────────────────────────┐      (Contrast)
Missing At      │ Missing Completely At    │      Missing Not
Random (MAR)    │      Random (MCAR)       │      At Random (MNAR)
                └──────────────────────────┘
                         │
                         │ (Justifies Use Of)
                         ▼
                Dropping Data (.dropna())
```

### Parent Concept

This concept is one of the three primary categories within [[Python - Types of Missing Data|Types of Missing Data]], which provides a framework for understanding why data might be absent.

### Child Concepts



### Related Concepts 

- MCAR contrasts directly with [[Python - Missing At Random (MAR)|Missing At Random (MAR)]], where the probability of missingness depends on other observed variables.
- It also contrasts with [[Python - Missing Not At Random (MNAR)|Missing Not At Random (MNAR)]], the most complex case, where missingness is related to the unobserved value itself.
- The assumption of MCAR is the primary justification for using simple methods like [[Python - Dropping Missing Data with .dropna()|dropping missing data]], as this approach does not introduce bias under this condition.
- Before handling missing data, one must first master [[Python - Detecting Missing Data in Pandas|detecting missing data]] to understand its scope and location.
## Questions

- If you suspect your data is MCAR, you could simply drop the missing rows, which is fast and cheap. However, if you're wrong and it's actually MAR, this could bias your results. How would you quantify the business risk of this assumption and decide whether to invest in more complex imputation methods?
- In a real-time data pipeline ingesting user survey data, how would you design a statistical monitoring system to continuously check if the pattern of incoming missing data still aligns with the MCAR assumption? What would be the trigger for an alert if the pattern changes, suggesting a shift to MAR or MNAR?
- What if you had a dataset where missingness was perfectly random (MCAR), but dropping the missing rows—even though statistically unbiased—reduced your dataset to a size so small that your model's predictions became too unstable to be useful? How would you resolve the conflict between maintaining an unbiased sample and needing sufficient data for model training?