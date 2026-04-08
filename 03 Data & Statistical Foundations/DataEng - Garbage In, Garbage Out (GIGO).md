---
tags: 
  - core
  - python
  - data_preparation
  - data_wrangling
  - data_preprocessing
  - data_quality
  - etl
  - concept
source: 
  - "[[Cleaning Data in Python]]"
related: 
  - "[[DataEng - Data Science Workflow]]"
  - "[[DataEng - Dirty Data]]"
  - "[[Fundamental - Feature Engineering]]"
  - "[[Python - Type Casting with .astype()]]"
  - "[[Python - Stripping Characters with .str.strip()]]"
  - "[[Python - Inspecting DataFrame with .info()]]"
  - "[[Python - Identifying Data Types with .dtypes]]"
  - "[[Python - Verifying Data with assert]]"
  - "[[Python - Categorical Data]]"
  - "[[Python - Converting to Categorical Type]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[NumPy - Exploratory Data Analysis with NumPy]]"
  - "[[Python - Data Type Constraints]]"
  - "[[Fundamental - Statistics]]"
---
# Core: Data Cleaning

## Summary

>Data cleaning, also known as data cleansing or data wrangling, is the process of detecting and correcting (or removing) corrupt, inaccurate, or irrelevant records from a dataset. It is a foundational step in the [[DataEng - Data Science Workflow|Data Science Workflow]] that directly addresses the problem of [[DataEng - Dirty Data|dirty data]]. The core principle is summed up by the adage, 'garbage in, garbage out'—if you start with flawed data, your results will be equally flawed.

**Why This Matters:** Effective data cleaning is the bedrock of reliable analytics and machine learning, directly preventing flawed models and inaccurate business insights.

_Analogy:_ _Data cleaning is like preparing ingredients for a gourmet meal. A chef wouldn't just throw unwashed, unpeeled, and randomly sized vegetables into a pot and expect a Michelin-star dish. They meticulously wash, peel, chop, and measure each ingredient to ensure the final dish is delicious and consistent. Similarly, a data scientist cleans data—handling missing values (discarding bad ingredients), correcting formats (chopping vegetables uniformly), and removing duplicates (avoiding too much salt)—to ensure their final analysis or model is accurate and reliable._

**Where it breaks down:** Unlike cooking where ingredients are often independent, data points can be highly correlated. 'Cleaning' one feature by removing rows might unintentionally discard crucial information from another, a complexity not present when simply discarding a bruised apple.

```
Raw Data ────> [ Inspect ] ────> [ Diagnose ] ────> [ Treat ] ────> Clean Data
```

## Details

The 'garbage in, garbage out' principle is central to data science. Real-world data is almost always messy, containing errors, inconsistencies, and missing values, a state known as [[DataEng - Dirty Data|dirty data]]. Data cleaning is the systematic process of identifying and rectifying these issues to ensure high data quality. It is a crucial, and often the most time-consuming, phase of the [[DataEng - Data Science Workflow|Data Science Workflow]]. The process can be broadly broken down into three phases: **inspection, diagnosis, and treatment**.

#### Primary Goal

To enhance data quality by identifying and resolving errors, inconsistencies, and inaccuracies, thereby ensuring that subsequent analysis and modeling are valid, reliable, and accurate.

#### Mechanism

- **How it Works:** The process is iterative and follows a general pattern:
    1. **Inspection:** Systematically scan the data to identify potential issues. This often involves using functions like `[[Python - Inspecting DataFrame with .info()|.info()]]` to check for nulls and `[[Python - Identifying Data Types with .dtypes|.dtypes]]` to get a high-level overview of data types.
    2. **Diagnosis:** Investigate the root cause and extent of the identified problems. Is a numeric column a string because of a currency symbol? Are missing values random or systematic? This step defines the problem before a solution is chosen.
    3. **Treatment:** Apply a specific technique to correct the issue. This could involve removing data, imputing values, or transforming data using methods like `[[Python - Stripping Characters with .str.strip()|stripping characters]]` or `[[Python - Type Casting with .astype()|type casting]]`.
- **Common Cleaning Tasks:**
    - **Handling Missing Values:** Deciding whether to remove, replace (impute), or flag rows/columns with missing data.
    - **Correcting Data Types:** Ensuring data is stored in the correct format. This is a core `[[Python - Data Type Constraints|data type constraint]]` issue and is often solved by following the `[[Python - Converting String Columns to Numeric Process|process for converting strings to numbers]]`.
    - **Removing Duplicates:** Identifying and deleting records that are exact copies to prevent skewed results.
    - **Standardizing Inconsistent Entries:** Correcting variations in data, such as converting 'USA', 'U.S.A.', and 'United States' to a single, consistent format. This is often a precursor to creating `[[Python - Categorical Data|categorical data]]`.

##### Code Translation

nothing to fill here

 [[Code - Data Cleaning Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Scope of Cleaning:**
    - Deciding which issues are critical to fix versus which are minor enough to ignore, based on the project goals and the specific analytical method to be used.
- **Treatment Strategy:**
    - Choosing between removal, imputation, or correction. For example, removing rows with missing data is simple but reduces dataset size, while imputation preserves data but introduces assumptions.
- **Automation Level:**
    - Determining whether cleaning steps should be manual for exploration or codified into a reusable, automated pipeline for production systems. Using `[[Python - Verifying Data with assert|assert statements]]` can help automate data validation.

#### Core Trade-offs

- **Time vs. Quality:**
    - Data cleaning is often the most time-consuming part of a data project. There's a constant trade-off between achieving perfect data and meeting project deadlines.
- **Information Loss vs. Accuracy:**
    - Aggressive cleaning, like deleting any row with a missing value, can lead to a significant loss of data and statistical power, potentially biasing the remaining sample.
- **Introducing Bias:**
    - The methods used to clean data (e.g., mean imputation) can introduce their own biases into the dataset, potentially leading a model to learn from artifacts of the cleaning process rather than the true underlying patterns.

## Connections

```
                 (Parent)
          Data Science Workflow
                   ▲
                   │
┌──────────────────┼──────────────────┐
│                  │                  │

(The Problem)   ┌────────────────┐   (The Next Step)
Dirty Data      │  Data Cleaning │   Feature Engineering
                └────────────────┘
                   │
         ┌─────────┴──────────┐
         │                    │
Type Correction      Handling Missing
(Implementation)           Values
       │
   .astype()
```

### Parent Concept

Data Cleaning is a fundamental and often the most time-consuming phase of the broader [[DataEng - Data Science Workflow|Data Science Workflow]].

### Child Concepts

- A common task is [[Python - Converting String Columns to Numeric Process|converting string columns to numeric types]], which is essential for mathematical operations.
- Another key activity is handling [[Python - Categorical Data|categorical data]], which involves standardizing text entries before converting them to a more efficient type using `[[Python - Converting to Categorical Type|astype('category')]]`.

### Related Concepts 

- Data Cleaning is the direct solution to the problem of [[DataEng - Dirty Data|dirty data]].
- It is a critical prerequisite for [[Fundamental - Feature Engineering|Feature Engineering]], as clean data is necessary to create meaningful new features.
- Techniques like `[[Python - Type Casting with .astype()|type casting]]` are the practical tools used to execute data cleaning tasks.
- Using an `[[Python - Verifying Data with assert|assert statement]]` is a programmatic way to enforce data quality rules after cleaning.
## Questions

- You're on a tight deadline and discover a column has 30% missing values, but it seems highly predictive. Do you drop the column to move faster, spend significant time on complex imputation, or drop the rows and risk biasing your dataset? Justify your choice in terms of business risk.
- How would you design an automated data cleaning pipeline for a real-time streaming data source? What specific checks would you put in place to monitor the pipeline's health and alert you to new types of data quality issues that weren't present in the initial design?
- What if you had a model (like some tree-based ensembles) that is naturally robust to many types of dirty data, such as missing values and unscaled features? In such a scenario, what is the remaining, irreducible value of the data cleaning process?