---
tags: 
  - core
  - python
  - pandas
  - feature_engineering
  - dataframe_manipulation
  - vectorized_operations
  - column_creation
  - concept
source: 
  - "[[Data Manipulation with pandas]]"
related: 
  - "[[Python - Pandas DataFrame]]"
  - "[[Python - Adding New Columns to a DataFrame]]"
  - "[[Python - Creating a New Column from One Existing Column]]"
  - "[[Python - Chaining Pandas Operations for Analysis]]"
  - "[[Python - Vectorized Operations]]"
  - "[[Python - DataFrame Indexing and Selection]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Fundamental - Feature Engineering]]"
  - "[[Python - Boolean Operators on NumPy Arrays]]"
  - "[[Python - Modifying NumPy Arrays]]"
  - "[[Python - Data Types]]"
  - "[[Python - Error Handling]]"
  - "[[Python - Subsetting NumPy Arrays]]"
  - "[[Python - Pandas Package]]"
---
# Core: Creating a New Column from Multiple Existing Columns

## Summary

>In data analysis with Pandas, creating a new column from multiple existing columns involves applying a mathematical or logical operation to two or more columns to generate a new series of values. This is a common step in feature engineering, where the interaction between variables is often more insightful than the variables themselves. As seen in the example of calculating a dog's BMI, we combine the `weight_kg` and `height_m` columns to create a new `bmi` column, moving beyond the simpler case of [[Python - Creating a New Column from One Existing Column|transforming a single column]].

**Why This Matters:** This technique is fundamental for feature engineering, allowing you to derive new, more meaningful variables from raw data to improve model performance and analysis.

_Analogy:_ _Imagine you're a baker creating an invoice for a custom cake. The invoice is your DataFrame. You have separate line items (columns) for 'Flour Cost', 'Sugar Cost', and 'Labor Cost'. To get the final price, you need to create a new line item called 'Total Ingredient Cost'. You do this by adding the values from the 'Flour Cost' and 'Sugar Cost' columns together. This new 'Total Ingredient Cost' column didn't exist before; you created it by combining information you already had._

In this analogy:
- **The Invoice** is the Pandas DataFrame.
- **'Flour Cost' and 'Sugar Cost'** are the existing columns (like `weight_kg` and `height_m`).
- **'Total Ingredient Cost'** is the new column you are creating (like `bmi`).
- **The act of adding the costs** is the mathematical operation (`+`, `/`, `**`, etc.) you apply to the columns.

**Where it breaks down:** The analogy implies a single, simple addition. Pandas operations are vectorized, meaning they perform the calculation on all rows simultaneously and can handle far more complex mathematical formulas, logical comparisons, or even string concatenations across entire columns at once, which is vastly more powerful and efficient than calculating one invoice line item.

```
[DataFrame: dogs]
  +-------------+    +--------------+
  | weight_kg   |    | height_m     |
  +-------------+    +--------------+
  | 24          |    | 0.56         |
  | 24          |    | 0.43         |
  | 24          |    | 0.46         |
  +-------------+    +--------------+
         │                  │
         └───────( / )──────┘
                   │
         ( ** 2 on height_m )
                   │
                   ▼
             +-------------+
             | bmi         |
             +-------------+
             | 76.53...    |
             | 129.79...   |
             | 113.42...   |
             +-------------+
```

## Details

While creating new columns from a single source is useful, many real-world features are derived from the interaction between multiple variables. This process, a cornerstone of feature engineering, involves combining columns using mathematical or logical operations to create new, insightful data points. The syntax in Pandas is intuitive and powerful, following the pattern `df['new_col'] = df['col_A'] <operator> df['col_B']`. The example of calculating a dog's Body Mass Index (BMI) perfectly illustrates this by using both weight and height to derive a new metric.

#### Primary Goal

To synthesize new information or features by combining the values from multiple existing columns in a DataFrame.

#### Mechanism

- **Step 1: Identify Source Columns**
    - Select the two or more columns in the DataFrame that you will use for the calculation. In the example, these are `weight_kg` and `height_m`.
- **Step 2: Define the New Column Name**
    - Choose a descriptive name for the new column. Use this name to index the DataFrame on the left side of the assignment operator, like `dogs['bmi']`. If this column name doesn't exist, Pandas will create it.
- **Step 3: Construct the Vectorized Operation**
    - Write the expression that combines the source columns. This operation will be applied element-wise down the entire length of the columns. For the BMI calculation, the expression is `dogs['weight_kg'] / dogs['height_m'] ** 2`.
- **Step 4: Execute and Verify**
    - Run the line of code. It's good practice to then inspect the DataFrame using a method like `.head()` to confirm that the new column was created with the expected values.

##### Code Translation

```python
import pandas as pd

# --- Setup: Create the sample DataFrame ---
data = {'name': ['Bella', 'Charlie', 'Lucy'],
        'weight_kg': [24, 24, 24],
        'height_cm': [56, 43, 46]}
dogs = pd.DataFrame(data)

# First, create the height_m column (from a single column)
dogs['height_m'] = dogs['height_cm'] / 100

# --- Step 1: Source columns are 'weight_kg' and 'height_m' ---

# --- Step 2 & 3: Define new column 'bmi' and construct the operation ---
dogs['bmi'] = dogs['weight_kg'] / dogs['height_m'] ** 2

# --- Step 4: Execute and Verify ---
print(dogs.head())

# Expected Output:
#       name  weight_kg  height_cm  height_m         bmi
# 0    Bella         24         56      0.56   76.530612
# 1  Charlie         24         43      0.43  129.799892
# 2     Lucy         24         46      0.46  113.421550
```

 [[Code - Creating a New Column from Multiple Existing Columns Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Left-Hand Side (Target Column)**
    - The `df['new_column_name']` expression. This defines where the result of the calculation is stored. If the column already exists, its values will be overwritten. If it's a new name, a new column will be appended to the DataFrame.
- **Right-Hand Side (The Operation)**
    - The expression involving two or more existing columns, such as `df['col_A'] + df['col_B']`. The key requirement is that the operator (`+`, `-`, `*`, `/`, `**`, etc.) must be a valid vectorized operation for the data types of the columns involved.

#### Core Trade-offs

- **Pro: Efficiency**
    - This approach is highly efficient because it leverages [[Python - Vectorized Operations|vectorized operations]] powered by NumPy. It is significantly faster than iterating over DataFrame rows with a `for` loop.
- **Con: Data Type Sensitivity**
    - Attempting a mathematical operation between columns with incompatible data types (e.g., a number and a string) will result in a `TypeError`. Data cleaning and type conversion must often be performed first.
- **Con: Propagation of Missing Values**
    - If a row has a missing value (`NaN`) in any of the source columns, the resulting value for that row in the new column will also be `NaN`. This can unintentionally increase the amount of missing data and requires careful handling, often with methods like `.fillna()`.

## Connections

```
                  (Parent)
    Adding New Columns to a DataFrame
                   ▲
                   │
┌──────────────────┼──────────────────┐
│                  │                  │
(Simpler Case) ┌───────────────────────────────────────────────┐ (Related Technique)
Creating from  │ Creating a New Column from Multiple Columns │ Chaining Operations
One Column     └───────────────────────────────────────────────┘
                   │
                   ▼
               (Relies On)
           Vectorized Operations
```

### Parent Concept

This technique is a specific implementation of the broader concept of [[Python - Adding New Columns to a DataFrame|adding new columns to a DataFrame]].

### Child Concepts



### Related Concepts 

- The simpler case, [[Python - Creating a New Column from One Existing Column|creating a new column from a single existing column]], forms the basis for this more complex operation.
- This method is often a key step within a larger data transformation pipeline, which can be streamlined using [[Python - Chaining Pandas Operations for Analysis|method chaining]].
- Under the hood, this approach relies on [[Python - Vectorized Operations|vectorized operations]] for its remarkable speed and efficiency compared to manual iteration.
## Questions

- You're building a customer churn model. You could create a 'tenure_to_complaint_ratio' feature from two existing columns. This might improve model accuracy but makes the final model's predictions harder for the customer service team to interpret. How would you decide whether to include this complex feature, and how would you explain its value to the head of customer service?
- Imagine a real-time data pipeline where you're calculating a 'transaction_risk_score' by combining 10 different streaming data columns. What are the potential failure points in this calculation (e.g., data type changes, missing data from one source), and how would you design a robust system to handle these errors without crashing the entire pipeline?
- What if you were told you could not use standard arithmetic operators (+, -, *, /) to combine columns due to a custom, non-standard data type. How would you approach creating a new column that represents the 'distance' between two columns of this custom type?