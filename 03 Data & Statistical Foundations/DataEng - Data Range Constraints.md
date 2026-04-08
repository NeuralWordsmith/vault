---
tags: 
  - major_core
  - dataclean
  - data_cleaning
  - data_validation
  - outliers
  - data_integrity
  - preprocessing
  - concept
source: 
  - "[[Cleaning Data in Python]]"
related: 
  - "[[DataEng - Dropping Out-of-Range Data]]"
  - "[[DataEng - Capping Out-of-Range Data]]"
  - "[[DataEng - Assigning Custom Values to Out-of-Range Data]]"
  - "[[DataEng - Dropping Out-of-Range Rows in Pandas]]"
  - "[[DataEng - Capping Out-of-Range Values in Pandas]]"
  - "[[DataEng - Using Assert Statements for Data Validation]]"
  - "[[DataEng - Handling Out-of-Range Dates in Pandas]]"
  - "[[DataEng - Converting Columns to Datetime in Pandas]]"
  - "[[DataEng - Getting the Current Date in Python]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[Fundamental - Feature Engineering]]"
  - "[[Fundamental - Statistics]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[NumPy - Exploratory Data Analysis with NumPy]]"
  - "[[Python - Error Handling]]"
---
# Major Core: Handling Out-of-Range Data

## Summary

> Out-of-range data refers to values in a dataset that are logically or technically impossible given the context of the variable. For instance, a movie rating of 6 on a 1-to-5 scale or a subscription date set in the future are clear errors. Handling these values is a critical step in data cleaning to ensure the integrity and accuracy of any analysis or model built upon the data. Common strategies include removing the erroneous data, adjusting it to fit within the valid range, or replacing it with a placeholder.

**Why This Matters:** Ensuring data falls within its expected, logical boundaries is crucial for preventing skewed analyses, model failures, and nonsensical business conclusions.

_Analogy:_ _Imagine a quality control inspector on an assembly line for 500ml water bottles. The inspector's job is to ensure each bottle is filled to the correct level, with an acceptable range of 495ml to 505ml. Any bottle that is severely underfilled (e.g., 300ml) or overfilled (e.g., 600ml) is flagged as 'out-of-range'. The inspector then has to decide what to do: discard the bottle, send it back to be topped up or partially emptied, or set it aside for special analysis._

In this analogy:
- **The Bottles:** Represent individual data points or rows.
- **The Acceptable Fill Level (495-505ml):** Represents the valid, expected range for a data variable.
- **Underfilled/Overfilled Bottles:** Represent the out-of-range data points.
- **The Inspector's Actions (Discard, Adjust, Set Aside):** Correspond to the data cleaning strategies of [[DataEng - Dropping Out-of-Range Data|dropping data]], [[DataEng - Capping Out-of-Range Data|capping values]], or [[DataEng - Assigning Custom Values to Out-of-Range Data|assigning a custom value]].

**Where it breaks down:** The analogy implies a simple binary (good/bad) decision. In data analysis, the reason for an out-of-range value can be complex. It might not always be a simple error but could indicate a systemic issue or even a new, undocumented category, requiring more nuanced investigation than just discarding the 'bottle'.

```
[Raw Data] -> [Define Valid Range (e.g., 1 to 5)] -> [Filter for Errors (e.g., rating > 5)] -> [Choose Strategy] -> [Clean Data]
                                                                                                    /      |      \
                                                                                                   /       |       \
                                                                                              [Drop] [Cap] [Assign Custom]
```

## Details

In data analysis, we often have strong expectations about the values a variable can take. As seen in the examples, a movie rating should be between 1 and 5, and a subscription date shouldn't be in the future. When we find values that violate these rules, like a rating of 6, it's a clear sign of an error from data collection or processing. These out-of-range values can corrupt statistical summaries (like averages) and mislead machine learning models. This concept, a core part of data engineering and cleaning, is about the systematic identification and correction of these impossible values. The primary strategies for dealing with them are **dropping the data**, **capping the values**, or **assigning a custom value**.

#### Primary Goal

To identify and correct data points that fall outside their predefined, logical, or technically feasible boundaries to ensure data integrity and the accuracy of subsequent analysis.

#### Mechanism

- **How it Works:** The process is generally a three-step procedure:
    1. **Define the Range:** First, you must establish the logical or business-defined minimum and maximum valid values for a variable. For movie ratings, this is 1 and 5. For subscription dates, it's the earliest possible sign-up date and today's date.
    2. **Identify Violations:** Next, you filter the dataset to find all rows where the variable's value is less than the minimum or greater than the maximum.
    3. **Apply a Strategy:** Finally, you choose and implement a method to handle these identified violations.
- **Strategy 1: Dropping**
    - This involves completely removing the row containing the out-of-range value. It's the simplest approach but can lead to information loss if other columns in that row contain valid data.
    - This is a common strategy discussed in [[DataEng - Dropping Out-of-Range Data]] and implemented in tools like pandas, as shown in [[DataEng - Dropping Out-of-Range Rows in Pandas]].
- **Strategy 2: Capping (or Clamping)**
    - This method replaces the out-of-range value with the nearest valid boundary. For example, a rating of 6 would be 'capped' at 5. This preserves the data point but can distort the distribution by creating an artificial pile-up of values at the boundary.
    - The concept is detailed in [[DataEng - Capping Out-of-Range Data]], with practical examples in [[DataEng - Capping Out-of-Range Values in Pandas]].
- **Strategy 3: Assigning Custom Values**
    - Here, the out-of-range value is replaced with a specific, chosen value, such as `NaN` (Not a Number), the column's mean, or median. This offers flexibility but can introduce its own biases.
    - This is the focus of [[DataEng - Assigning Custom Values to Out-of-Range Data]].
- **Strategy 4: Proactive Validation**
    - Instead of cleaning data after the fact, you can build checks into your data pipeline to prevent bad data from entering in the first place. This is often done by [[DataEng - Using Assert Statements for Data Validation|using assert statements]] to halt execution if an invalid value is found.

nothing to fill here

 [[Code - Handling Out-of-Range Data Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Valid Range Definition:** The most critical parameters are the lower and upper bounds that define what is considered 'valid'. These are determined by business logic, physical constraints, or common sense.
    - *Example: For a percentage, the range is 0 to 100. For a movie rating, it's 1 to 5.*
- **Chosen Strategy:** The choice between dropping, capping, or assigning a custom value is a key decision that depends on the specific context and the goals of the analysis.
- **Scope of Application:** Deciding whether to apply the rule to a single column, multiple columns, or based on the values in other columns.

#### Core Trade-offs

- **Information Loss vs. Data Integrity (Dropping):** Dropping rows is clean but permanently removes information. If an out-of-range value occurs in a row that is otherwise full of valuable data, you lose that data entirely.
- **Distribution Distortion vs. Data Retention (Capping):** Capping keeps the data point but can create artificial spikes at the minimum or maximum values, which can skew statistical measures and mislead models that are sensitive to data distribution.
- **Introducing Bias vs. Simplicity (Custom Values):** Assigning a mean, median, or mode is a common imputation strategy, but it artificially reduces the variance of the data and can introduce bias, especially if a large number of values are replaced.

## Connections

```
                  (Parent)
           Fundamental - Data Engineering
                   ▲
                   │
┌──────────────────┼──────────────────┐
│                  │                  │
(Related) ┌───────────────────────────┐     (Related)
Data Validation   │ Handling Out-of-Range Data│     Feature Engineering
                  └───────────────────────────┘
                         │
       ┌───────────────┬─┴───────────────┐
       │               │                 │
    Dropping        Capping        Assigning Custom
```

### Parent Concept

This concept is a fundamental practice within [[Fundamental - Data Engineering]], specifically in the data cleaning and preprocessing stages.

### Child Concepts

- One common strategy is [[DataEng - Dropping Out-of-Range Data|dropping]], where the entire record containing the invalid value is removed.
- Another approach is [[DataEng - Capping Out-of-Range Data|capping]], which replaces invalid values with the nearest valid boundary (minimum or maximum).
- A flexible method involves [[DataEng - Assigning Custom Values to Out-of-Range Data|assigning custom values]], where out-of-range data is replaced with a specific value like the mean, median, or a null indicator.

### Related Concepts 

- The practical implementation for date-specific issues is detailed in [[DataEng - Handling Out-of-Range Dates in Pandas]].
- A proactive approach to prevent this issue is [[DataEng - Using Assert Statements for Data Validation|using assert statements]], which can stop execution if invalid data is detected.
- This process is a key component of [[Fundamental - Feature Engineering]], as it ensures the quality of features before they are used in a model.
## Questions

- You're analyzing user subscription data and find 1% of sign-up dates are in the future. Dropping them is easy but loses 1% of your new user data. Capping them to today's date retains the user but introduces an artificial spike in sign-ups for today. How do you decide which to do, and how would you explain the potential impact on a 'daily new user' business KPI to the product manager?
- How would you design an automated data ingestion pipeline that flags out-of-range movie ratings (e.g., > 5) without stopping the entire pipeline? Describe where the invalid data would be stored, how stakeholders would be notified, and how the corrected data would be re-integrated.
- What if an out-of-range value wasn't an error, but a signal of a new, undocumented category? For example, a movie rating of '6' could secretly mean 'staff favorite'. How would your data validation strategy need to change to distinguish between true errors and these hidden signals?
