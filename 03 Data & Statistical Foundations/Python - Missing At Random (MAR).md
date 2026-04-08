---
tags: 
  - core
  - python
  - mar
  - missing data
  - data imputation
  - statistical bias
  - conditional missingness
  - concept
source: 
  - "[[Cleaning Data in Python]]"
related: 
  - "[[Python - Types of Missing Data]]"
  - "[[Python - Missing Completely At Random (MCAR)]]"
  - "[[Python - Missing Not At Random (MNAR)]]"
  - "[[Python - Handling Missing Data in Pandas]]"
  - "[[Python - Imputing Missing Data with .fillna()]]"
  - "[[Python - Dropping Missing Data with .dropna()]]"
  - "[[Python - Investigating Patterns in Missing Data]]"
  - "[[Python - Visualizing Missing Data with missingno]]"
  - "[[Fundamental - Statistics]]"
  - "[[Fundamental - Feature Engineering]]"
  - "[[Python - Data Completeness]]"
  - "[[Python - Detecting Missing Data in Pandas]]"
  - "[[Python - Missing Data (NaN)]]"
---
# Core: Missing at Random (MAR)

## Summary

>Missing at Random (MAR) describes a situation where the probability of a data point being missing is systematically related to another observed variable in the dataset, but not to the missing value itself. It's a middle ground between the purely random [[Python - Missing Completely At Random (MCAR)|MCAR]] and the more problematic [[Python - Missing Not At Random (MNAR)|MNAR]], where the missingness depends on the unobserved value.

**Why This Matters:** Understanding MAR is crucial because it allows for the use of sophisticated imputation methods that can correct for potential biases, leading to more accurate and reliable models than if the data were simply deleted.

_Analogy:_ _Imagine a survey about health and fitness. One question asks for a person's body weight, but some people leave it blank. We notice that men are significantly more likely to skip this question than women. In this case, the 'missingness' of the weight data is not truly random; it depends on the 'gender' variable, which we have recorded for everyone._

Here, 'Weight' is the variable with missing data. 'Gender' is the observed variable that predicts the missingness. The probability of weight being missing depends on gender, not on the actual weight value itself.

*   **Where it breaks down:** The analogy assumes the *only* factor is gender. If men with higher weights were also more likely to skip the question than men with lower weights, the situation would shift from MAR to the more complex [[Python - Missing Not At-Random (MNAR)|Missing Not At Random (MNAR)]], as the missingness would then depend on the unobserved value (weight) itself.

```
          ┌──────────────────────────┐
Observed  │   Temperature Reading    │ ────┐
Variable  │       (e.g., Low)        │     │
          └──────────────────────────┘     │ (Systematically predicts missingness)
                                           ▼
          ┌──────────────────────────┐
Missing   │       CO2 Reading        │
Variable  │         (is NaN)         │
          └──────────────────────────┘
```

## Details

Despite its confusing name, 'Missing at Random' does not mean the data is missing haphazardly. Instead, it implies there's a systematic pattern to the missingness that can be explained or predicted by other complete variables in the dataset. For instance, as mentioned in the context, if CO2 data is consistently missing when temperature readings are low, this is a classic case of MAR. The reason for the missingness (low temperature) is captured within our dataset, allowing us to account for it.

#### Primary Goal

To identify and model scenarios where the pattern of missing data is explainable by other observed features, enabling more sophisticated and less biased data handling strategies.

#### Mechanism

- **How it Works:**
    1. The core condition for MAR is that the probability of a value being missing for a variable $Y$ is dependent on an observed variable $X$, but not on the actual value of $Y$ itself.
    2. Mathematically, this is expressed as: $P(Y_{missing} | Y, X) = P(Y_{missing} | X)$. This means once we know the value of $X$, knowing the actual value of $Y$ gives us no extra information about why it's missing.
- **Key Characteristic:**
    - The missingness is systematic, but the system is contained within the observed data. This is the key difference from [[Python - Missing Not At Random (MNAR)|MNAR]], where the system depends on the unobserved data.
- **Example Scenarios:**
    - *Instrumentation Failure:* A sensor measuring CO2 levels fails to operate below a certain temperature. The CO2 data is missing, but the reason is perfectly predicted by the observed temperature data.
    - *Survey Design:* In a survey, a follow-up question is only asked if a respondent answers 'Yes' to a previous question. The data for the follow-up question will be missing for everyone who answered 'No', a pattern entirely explained by the previous question's answer.

##### Code Translation

nothing to fill here

 [[Code - Missing at Random (MAR) Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- MAR is a condition of the data itself, not an algorithm with parameters to tune. The 'levers' are in how you respond to it, such as the choice of imputation model.

#### Core Trade-offs

- **Advantage: Correctable Bias**
    - Because the source of the missingness is known (it's in the other columns), we can use methods like regression imputation or multiple imputation to create unbiased estimates of the missing values. This is a significant advantage over [[Python - Missing Not At Random (MNAR)|MNAR]].
- **Disadvantage: Simple Methods Fail**
    - Simply [[Python - Dropping Missing Data with .dropna()|dropping rows]] with MAR data can introduce significant bias. For example, if we drop all instances of missing CO2, we also drop all instances of low temperatures, skewing our dataset's temperature distribution.
    - Likewise, simple imputation with the mean or median via [[Python - Imputing Missing Data with .fillna()|.fillna()]] can also introduce bias by weakening the relationship between the variables.

## Connections

```
                      (Parent)
               Types of Missing Data
                         ▲
                         │
┌────────────────────────┼──────────────────────────┐
│                        │                          │
(Contrasts With)  ┌──────────────────────────┐  (Contrasts With)
MCAR              │ Missing at Random (MAR)  │  MNAR
                  └──────────────────────────┘
```

### Parent Concept

This concept is one of the three primary classifications within [[Python - Types of Missing Data|types of missing data]].

### Child Concepts



### Related Concepts 

- It directly [[Python - Missing Completely At Random (MCAR)|contrasts with MCAR]], where the missingness has no relationship with any data, observed or unobserved.
- It also [[Python - Missing Not At Random (MNAR)|contrasts with MNAR]], where the missingness is dependent on the missing value itself, making it much harder to handle.
- The process of [[Python - Investigating Patterns in Missing Data|investigating patterns in missing data]] is essential for determining if the MAR assumption is plausible.
- When MAR is present, simple strategies like using [[Python - Imputing Missing Data with .fillna()|.fillna()]] with a single value can introduce bias into the analysis.
## Questions

- Imagine a customer churn dataset where 'last_login_date' is often missing for customers with low 'monthly_spend' (MAR). Deleting these rows is easy but would bias the model towards high-spending customers. How would you justify the extra engineering effort to impute these dates to a product manager who wants the model deployed quickly?
- If you suspect MAR in a real-time data stream, how would you design a system to perform conditional imputation (e.g., regression imputation) at scale without introducing significant latency into your prediction pipeline?
- What if the variable predicting the missingness (e.g., temperature) is itself noisy or has missing values? How does this 'second-order missingness' complicate the MAR assumption, and what new strategies might you need to consider?