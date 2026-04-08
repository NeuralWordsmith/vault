---
tags: 
  - major_core
  - dataclean
  - data_cleaning
  - outlier_handling
  - data_validation
  - data_quality
  - preprocessing
  - concept
source: 
  - "[[Cleaning Data in Python]]"
related: 
  - "[[DataEng - Data Range Constraints]]"
  - "[[DataEng - Dropping Out-of-Range Data]]"
  - "[[DataEng - Capping Out-of-Range Data]]"
  - "[[DataEng - Assigning Custom Values to Out-of-Range Data]]"
  - "[[DataEng - Dropping Out-of-Range Rows in Pandas]]"
  - "[[DataEng - Capping Out-of-Range Values in Pandas]]"
  - "[[DataEng - Using Assert Statements for Data Validation]]"
  - "[[Fundamental - Feature Engineering]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[NumPy - Exploratory Data Analysis with NumPy]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[DataEng - Handling Out-of-Range Dates in Pandas]]"
  - "[[SWE - Testing Best Practices]]"
---
# Major Core: Handling Out-of-Range Data

## Summary

> Handling out-of-range data is a crucial data cleaning process that involves identifying and deciding how to treat data points that fall outside a predefined, acceptable range. Based on the context and business rules, there are several strategies, such as removing the invalid data, adjusting it to fit within the range, or replacing it with another value.

**Why This Matters:** Properly handling out-of-range data is critical for preventing silent model failures and ensuring the reliability of analytical results, as invalid data can corrupt everything from simple averages to complex machine learning predictions.

_Analogy:_ _Imagine a bouncer at an exclusive club that has a strict age policy: guests must be between 21 and 65. The bouncer's job is to check the ID of every person in line. An 18-year-old or a 70-year-old represents out-of-range data. The bouncer has several options: they can simply turn the person away (dropping the data), let the 70-year-old in but give them a 'senior guest' wristband (assigning a custom value), or tell them they can't enter the main floor but can wait in the lobby for their friends (capping the value to a boundary condition)._

In this analogy, the club's age policy is the [[DataEng - Data Range Constraints|data range constraint]], the people in line are the incoming data points, and the bouncer is the data validation process. The different actions the bouncer takes correspond to the various strategies for handling out-of-range data.

*   **Where it breaks down:** The analogy implies a conscious decision-maker (the bouncer) for each data point. In reality, handling out-of-range data is an automated process governed by pre-set rules that apply uniformly to thousands or millions of records, without individual judgment for each case.

```
nothing to fill here
```

## Details

In the world of data engineering and analysis, data rarely arrives in perfect condition. Values can be nonsensical due to entry errors, system glitches, or measurement issues—like a person's age being listed as 150 or a temperature reading of -1000°C. Handling out-of-range data is the set of strategies we use to manage these invalid points to maintain data integrity. The choice of strategy is not just technical; it's heavily influenced by the business assumptions behind the data. The primary options include **dropping the data**, **capping the values**, **setting to missing for imputation**, or **assigning a custom value**.

#### Primary Goal

To ensure data quality, consistency, and validity, thereby preventing skewed analyses and erroneous model predictions caused by impossible or invalid data points.

#### Mechanism

- **How it Works:**
    1.  **Define the Valid Range:** First, a valid range is established for a data column based on domain knowledge, business rules, or statistical properties (e.g., age must be between 0 and 120). This is the core of [[DataEng - Data Range Constraints|data range constraints]].
    2.  **Detect Out-of-Range Values:** The system scans the dataset to identify any data points that fall outside this predefined minimum and maximum.
    3.  **Apply a Strategy:** Once identified, one of the following strategies is applied to the out-of-range values.
- **Dropping Data**
    - The simplest approach. Any row containing an out-of-range value is completely removed from the dataset. This is a clean but potentially costly method if many rows are affected.
    - *Example:* If a dataset of customer transactions contains a sale amount of -$50, the entire transaction record is deleted. This is further explored in [[DataEng - Dropping Out-of-Range Data]].
- **Capping (or Clipping)**
    - This strategy involves setting custom minimums or maximums. Any value exceeding the maximum is reset to the maximum, and any value below the minimum is reset to the minimum.
    - *Example:* For a sensor that can only read temperatures up to 100°C, any reading of 105°C or 110°C would be reset to 100°C. This is detailed in [[DataEng - Capping Out-of-Range Data]].
- **Setting to Missing (for Imputation)**
    - The out-of-range value is replaced with a null or missing indicator (like `NaN`). This preserves the rest of the data in the row and flags the value to be handled by a separate imputation step (e.g., filling with the mean, median, or a model-predicted value).
    - *Example:* If a survey respondent enters their height as 9 feet, the value is changed to `NaN`, to be filled in later based on the average height of other respondents.
- **Assigning a Custom Value**
    - Based on specific business logic, out-of-range values are replaced with a special, custom value that has a defined meaning.
    - *Example:* In a system tracking user login attempts, any attempt count greater than 5 might be set to a special value of `999` to indicate a potential brute-force attack, a strategy covered in [[DataEng - Assigning Custom Values to Out-of-Range Data]].

nothing to fill here

 [[Code - Handling Out-of-Range Data Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Thresholds (Min/Max):** The most critical parameters. These define the boundaries of the valid range. They can be based on physical impossibilities (age < 0), business rules (discount % > 100), or statistical measures (e.g., values beyond 3 standard deviations from the mean).
- **Chosen Strategy:** The selection of which method to use (dropping, capping, etc.) is a key parameter itself, driven by the specific context and the goals of the analysis.
- **Custom/Imputation Value:** If using imputation or custom assignment, the value used for replacement (e.g., mean, median, -1, 999) is a crucial parameter that can influence downstream results.

#### Core Trade-offs

- **Information Loss vs. Data Distortion:**
    - [[DataEng - Dropping Out-of-Range Data|Dropping data]] is the cleanest option but can lead to significant information loss, especially if out-of-range values are common or correlated with other important features.
    - [[DataEng - Capping Out-of-Range Data|Capping data]] retains the record but distorts the statistical distribution of the variable by creating artificial clusters of data at the minimum and maximum boundaries.
- **Simplicity vs. Assumption Introduction:**
    - Dropping and capping are simple to implement and understand.
    - Setting to missing for imputation introduces assumptions into the dataset. The imputed value is a guess, and if the guess is poor, it can introduce bias and reduce the variance of the data.
- **Domain Knowledge Dependency:**
    - [[DataEng - Assigning Custom Values to Out-of-Range Data|Assigning a custom value]] can be very powerful but is highly dependent on having accurate business context. An incorrect assumption can lead to misinterpretation of the data.

## Connections

```
          (Parent)
   Data Range Constraints
             ▲
             │
┌────────────┼────────────┐
│            │            │
(Used in) ┌───────────────────────────────┐ (Related to)
Feature   │ Handling Out-of-Range Data  │ Data Validation
Engineering └───────────────────────────────┘
             │
  ┌──────────┴──────────┬──────────────────┐
  │                     │                  │
Dropping Data       Capping Data      Assigning Custom
                                       Values
```

### Parent Concept

This concept is a direct application of [[DataEng - Data Range Constraints|data range constraints]], which first define the rules for what constitutes a valid value.

### Child Concepts

- A primary strategy is [[DataEng - Dropping Out-of-Range Data|dropping data]], which involves completely removing records with invalid values.
- Another common method is [[DataEng - Capping Out-of-Range Data|capping data]], where values are forced to lie within a specified min/max range.
- A more business-driven approach is [[DataEng - Assigning Custom Values to Out-of-Range Data|assigning custom values]], which replaces invalid data with a specific, meaningful code.

### Related Concepts 

- The entire process is a fundamental component of [[Fundamental - Feature Engineering|feature engineering]], as it prepares raw data for modeling.
- [[DataEng - Using Assert Statements for Data Validation|Using assert statements]] is a programmatic way to enforce these data handling rules and stop execution if an out-of-range value is found.
- Discovering out-of-range data is often done during [[NumPy - Exploratory Data Analysis with NumPy|exploratory data analysis with NumPy]], using functions to find minimums, maximums, and descriptive statistics.
## Questions

- You are cleaning a dataset for a credit risk model. You find that 5% of applicants have an 'income' value that is below the minimum wage, which is your defined lower bound. Would you choose to drop these records or cap them at the minimum wage? Justify your decision based on the potential business impact on model fairness and profitability.
- How would you design a scalable, real-time data ingestion pipeline that validates incoming records against a set of dynamic range constraints (e.g., valid price ranges for products that change daily) and routes invalid records to a 'quarantine' zone for manual review without halting the entire data flow?
- What if a recurring 'out-of-range' value from a specific IoT sensor isn't an error, but an indicator that the sensor itself is failing or has entered a new, previously unknown operational state? How would you adapt your data handling strategy to distinguish between true data errors and these 'system state' signals?
