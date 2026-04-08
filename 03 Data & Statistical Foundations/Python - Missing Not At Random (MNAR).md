---
tags: 
  - core
  - python
  - mnar
  - nonignorable_missingness
  - selection_bias
  - data_quality
  - missing_data
  - concept
source: 
  - "[[Cleaning Data in Python]]"
related: 
  - "[[Python - Types of Missing Data]]"
  - "[[Python - Missing Completely At Random (MCAR)]]"
  - "[[Python - Missing At Random (MAR)]]"
  - "[[Python - Investigating Patterns in Missing Data]]"
  - "[[Python - Handling Missing Data in Pandas]]"
  - "[[Python - Data Completeness]]"
  - "[[Python - Missing Data (NaN)]]"
  - "[[Python - Detecting Missing Data in Pandas]]"
  - "[[Python - Visualizing Missing Data with missingno]]"
  - "[[Python - Dropping Missing Data with .dropna()]]"
  - "[[Python - Imputing Missing Data with .fillna()]]"
  - "[[Fundamental - Statistics]]"
  - "[[Fundamental - Feature Engineering]]"
---
# Core: Missing Not At Random (MNAR)

## Summary

>Missing Not At Random (MNAR) describes a situation where the reason a data point is missing is directly related to the value of that missing data point itself. This creates a systematic bias because the missing values are not a random sample of the data, but rather a specific, unobserved subgroup.

**Why This Matters:** Identifying MNAR is critical because it's the most dangerous type of missing data; ignoring it and using simple fixes like dropping rows will almost certainly lead to biased and incorrect conclusions.

_Analogy:_ _Imagine you're conducting a city-wide survey about personal income. You send out the survey, but you notice that people with very high incomes (e.g., >$1M/year) and people with very low incomes (e.g., <$20k/year) are far less likely to respond. The very wealthy may not respond due to privacy concerns, and the very poor may not respond due to shame or lack of access. In this case, the missingness of the 'income' data is directly caused by the 'income' value itself._

Here, the survey respondents are your dataset, the 'income' question is the variable with missing data, and the non-response from the highest and lowest earners is the MNAR pattern. The probability of the 'income' data being missing depends on the unobserved income level.

*   **Where it breaks down:** In the real world, we usually don't know for sure *why* the data is missing. With the survey, we can guess the reason, but with a dataset, the underlying mechanism causing the MNAR pattern is often hidden and requires deep domain expertise to even hypothesize about.

```
The core causal relationship in MNAR:

[ Unobserved Value of Variable X ]
            │
            │ (causes/influences)
            ▼
[ Probability that X is Missing ]
```

## Details

In the landscape of [[Python - Types of Missing Data|types of missing data]], Missing Not At Random (MNAR) is the most challenging case. It occurs when there's a systematic relationship between the missing data and the unobserved values themselves. The example of a thermometer failing on hot days perfectly illustrates this: the very condition we want to measure (high temperature) is the cause of the data going missing. Unlike its counterparts, [[Python - Missing Completely At Random (MCAR)|MCAR]] and [[Python - Missing At Random (MAR)|MAR]], the missingness in MNAR is considered 'non-ignorable' because the pattern is not random and cannot be explained by other observed variables in the dataset.

#### Primary Goal

The primary goal of identifying an MNAR pattern is to understand that simple data handling techniques are insufficient and that failing to account for the underlying missingness mechanism will introduce significant bias into any analysis or model.

#### Mechanism

- **How it Works:**
    1.  A specific value or range of values for a variable (let's call it $Y$) influences the probability that it will be recorded.
    2.  This means the observed data for variable $Y$ is no longer a representative sample of the true population for $Y$.
    3.  Any statistical calculation (like the mean) performed on the observed data will be biased. For example, if a thermometer fails in the heat, the average temperature calculated from the available data will be systematically lower than the true average.
- **Key Characteristic: Non-Ignorable Missingness**
    - The missingness mechanism cannot be ignored or simplified. You cannot fix the problem by just looking at other columns in your data (as you might with MAR). Addressing MNAR requires making assumptions about the missing data mechanism itself, often using advanced statistical models or collecting more data.
- **Examples:**
    - *Clinical Trials:* Patients with the most severe symptoms of a disease might drop out of a study because they are too sick to continue. The missing outcome data is related to the severity of their outcome.
    - *Weight Measurement:* People who are overweight may be less likely to report their weight on a health form. The missingness of the 'weight' variable is dependent on the person's actual weight.

##### Code Translation

nothing to fill here

 [[Code - Missing Not At Random (MNAR) Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Domain Knowledge:**
    - This is the most critical 'parameter'. You cannot reliably detect or handle MNAR without understanding the data collection process and the real-world context. Why might someone not answer a question? How could a sensor fail?
- **Assumptions about the Missingness Mechanism:**
    - To handle MNAR, you must make an explicit assumption about the relationship between the missing value and the probability of it being missing. This assumption cannot be tested from the data itself and is a major source of uncertainty.

#### Core Trade-offs

- **Pro: Prevents Flawed Conclusions**
    - The primary benefit of correctly identifying data as MNAR is that it stops you from making naive assumptions and drawing incorrect, biased conclusions from your analysis.
- **Con: Extremely Difficult to Handle**
    - There are no simple, universally applicable methods for handling MNAR data. Standard techniques like mean/median imputation or dropping rows will introduce bias. Correctly handling it requires complex statistical models (e.g., selection models, pattern-mixture models) that are difficult to implement and validate.
- **Con: Untestable Assumptions**
    - Since the missingness depends on the values you don't have, you can never empirically prove from the data alone that it is MNAR or that your model for handling it is correct. The validity of your results hinges entirely on the quality of your assumptions.

## Connections

```
                      (Parent)
               Types of Missing Data
                         ▲
                         │
         ┌───────────────┼────────────────┐
         │               │                │
(Contrasts With)  ┌───────────────────────────┐  (Contrasts With)
      MCAR        │ Missing Not At Random (MNAR)│        MAR
                  └───────────────────────────┘
```

### Parent Concept

This concept is one of the three main classifications within the broader topic of [[Python - Types of Missing Data|types of missing data]].

### Child Concepts



### Related Concepts 

- MNAR provides a critical contrast to [[Python - Missing Completely At Random (MCAR)|Missing Completely At Random (MCAR)]], where the missingness is purely random and unrelated to any data.
- It also contrasts with [[Python - Missing At Random (MAR)|Missing At Random (MAR)]], where the missingness can be explained by other observed variables in the dataset.
- The process of [[Python - Investigating Patterns in Missing Data|investigating patterns in missing data]] is crucial for forming a hypothesis about whether a dataset might be MNAR, as it often requires deep domain knowledge rather than simple statistical tests.
- Understanding MNAR is essential before deciding on a strategy for [[Python - Handling Missing Data in Pandas|handling missing data]], as it invalidates simple approaches like [[Python - Dropping Missing Data with .dropna()|dropping data]] or using basic [[Python - Imputing Missing Data with .fillna()|imputation]].
## Questions

- Imagine you're analyzing customer churn data, and you suspect that high-value customers who are about to churn are less likely to fill out a final satisfaction survey. How would you justify to a product manager the significant extra time and resources needed to model this MNAR data, instead of just dropping the missing surveys and providing a faster, but potentially biased, analysis?
- If you build a complex model (e.g., a Heckman selection model) to handle MNAR data in a production pipeline, what specific monitoring systems would you put in place to detect if the assumptions of your model are no longer valid as new data comes in?
- What if you had a dataset you strongly suspected was MNAR, but you had absolutely no external or domain knowledge to help you model the missingness mechanism? What is the most 'honest' or 'least wrong' approach you could take, and how would you communicate the uncertainty of your findings?