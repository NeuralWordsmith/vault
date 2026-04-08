---
tags: 
  - core
  - python
  - dataset
  - retail_sales
  - time_series
  - pandas_example
  - exploratory_data_analysis
  - concept
source: 
  - "[[Data Manipulation with pandas]]"
related: 
  - "[[Python - Pandas Package]]"
  - "[[Python - Pandas DataFrame]]"
  - "[[Python - Summary Statistics in pandas]]"
  - "[[Python - Common Summary Statistics in pandas]]"
  - "[[Python - The .agg() Method for Custom Statistics]]"
  - "[[Python - Cumulative Statistics in pandas]]"
  - "[[Python - DataFrame Indexing and Selection]]"
  - "[[Fundamental - Statistics]]"
  - "[[NumPy - Exploratory Data Analysis with NumPy]]"
  - "[[Python - Matplotlib Library]]"
  - "[[Python - Data Types]]"
  - "[[Python - GroupBy Operations]]"
---
# Core: Walmart Sales Dataset

## Summary

>This dataset contains records of weekly sales for various Walmart stores, with each sale categorized by a specific store and department. Crucially, it also includes several influential external factors such as whether the week was a holiday, the average temperature, regional fuel prices, and the national unemployment rate. This combination of sales data and contextual variables makes it an ideal case study for exploring relationships, practicing data aggregation, and serves as the primary example for calculating [[Python - Summary Statistics in pandas|summary statistics]] and performing custom aggregations with [[Python - The .agg() Method for Custom Statistics|the .agg() method]].

**Why This Matters:** This dataset provides a rich, real-world context for applying and mastering fundamental data manipulation and analysis techniques in Python's pandas library.

_Analogy:_ _Think of this dataset as a hyper-detailed diary for a large retail chain. Each page represents a specific week in a specific department of a single store. The main entry on the page is 'Weekly Sales,' but there are also crucial side notes about the 'weather' (temperature), 'local economy' (fuel price, unemployment), and whether it was a 'special event' (a holiday). Just as a diary helps you see patterns in your life over time, this dataset lets analysts see patterns in sales by connecting performance to external conditions._

The dataset is the diary. The rows are the individual diary entries. The columns are the different types of information recorded (e.g., sales, weather, events). 
*   **Where it breaks down:** A personal diary is often subjective and qualitative. This dataset is strictly quantitative and structured, with every 'entry' (row) following the exact same format, which is what makes it perfect for computational analysis.

```
DataFrame: 'sales'
+-------+-------+------+------------+----------------+-------------+---------+--------------+---------+
| store | type  | dept |    date    | weekly_sales   | is_holiday  | temp_c  | fuel_price   |  unemp  |
+-------+-------+------+------------+----------------+-------------+---------+--------------+---------+
|   1   |   A   |  1   | 2010-02-05 |   24924.50     |    False    |  5.73   |    0.679     |  8.106  |
|   1   |   A   |  2   | 2010-02-05 |   50605.27     |    False    |  5.73   |    0.679     |  8.106  |
|  ...  |  ...  | ...  |    ...     |      ...       |     ...     |   ...   |     ...      |   ...   |
+-------+-------+------+------------+----------------+-------------+---------+--------------+---------+
```

## Details

The Walmart Sales Dataset is a tabular dataset commonly used for practicing data analysis in Python, particularly with the pandas library. It captures the complexity of real-world retail data, where sales figures are influenced by a variety of internal and external factors. The dataset is structured with one row per department per store per week, and includes columns like `store` ID, store `type`, `dept` ID, `date`, `weekly_sales`, a boolean `is_holiday` flag, `temp_c`, `fuel_price`, and the `unemp` rate. Its primary purpose in a learning context is to serve as a sandbox for applying data manipulation, aggregation, and visualization techniques.

#### Primary Goal

To provide a realistic, multi-featured dataset for practicing and demonstrating data analysis techniques, from basic inspection and cleaning to complex aggregation and visualization.

#### Mechanism

- **Step 1: Load the Data**
    - The first step in any analysis is to load the data from its source (typically a CSV file) into a pandas DataFrame, which is the standard structure for handling tabular data in Python.
- **Step 2: Initial Inspection**
    - Once loaded, you perform an initial inspection to understand its structure. Using `.head()` previews the first few rows to confirm the columns and data format. Using `.info()` provides a technical summary, showing column names, the number of non-null entries, and their data types (`Dtype`).
- **Step 3: Perform Analysis**
    - With the data loaded and understood, you can begin the analysis. This is where you would apply techniques like calculating [[Python - Common Summary Statistics in pandas|common summary statistics]] to get a feel for the data, using [[Python - The .agg() Method for Custom Statistics|aggregation]] to find total or average sales by store type, or computing [[Python - Cumulative Statistics in pandas|cumulative statistics]] to track sales growth over time.

##### Code Translation

```python
import pandas as pd

# --- Step 1: Load the Data ---
# Assuming the data is in a file named 'walmart_sales.csv'
# sales = pd.read_csv('walmart_sales.csv')

# For demonstration, we'll create a sample DataFrame
data = {
    'store': [1, 1, 1, 1, 1],
    'type': ['A', 'A', 'A', 'A', 'A'],
    'dept': [1, 2, 3, 4, 5],
    'date': ['2010-02-05', '2010-02-05', '2010-02-05', '2010-02-05', '2010-02-05'],
    'weekly_sales': [24924.50, 50605.27, 13740.12, 39954.04, 32229.38],
    'is_holiday': [False, False, False, False, False],
    'temp_c': [5.73, 5.73, 5.73, 5.73, 5.73],
    'fuel_price': [0.679, 0.679, 0.679, 0.679, 0.679],
    'unemp': [8.106, 8.106, 8.106, 8.106, 8.106]
}
sales = pd.DataFrame(data)

# --- Step 2: Initial Inspection ---
# Preview the first 5 rows
print("--- First 5 Rows ---")
print(sales.head())

# Get a summary of the DataFrame's structure and data types
# print("\n--- DataFrame Info ---")
# sales.info()
```

 [[Code - Walmart Sales Dataset Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Dataset Features (Columns)**
    - **`store`**: An integer representing the unique ID of a store.
    - **`type`**: A character ('A', 'B', 'C') representing the type or size of the store.
    - **`dept`**: An integer representing the unique ID of a department within a store.
    - **`date`**: The date of the week for the sales record.
    - **`weekly_sales`**: The total sales in US dollars for the given department/store/week. This is often the target variable for analysis.
    - **`is_holiday`**: A boolean value (`True`/`False`) indicating if the week includes a major holiday.
    - **`temp_c`**: The average temperature in Celsius for the week in the store's region.
    - **`fuel_price`**: The average cost of fuel in the store's region.
    - **`unemp`**: The national unemployment rate for the week.

#### Core Trade-offs

- **Scope Limitation**
    - The data covers a specific time period and a finite set of stores. Conclusions drawn from this dataset may not generalize to other time periods (e.g., post-pandemic) or different retail chains.
- **Granularity**
    - The data is aggregated at the weekly level. It cannot be used to analyze daily, hourly, or real-time sales patterns, which might be crucial for staffing or inventory decisions.
- **Omitted Variables**
    - While it includes several useful external factors, it omits other key variables that could influence sales, such as local competitor activity, marketing spend, store-specific promotions, or local events.

## Connections

```
                      (Parent)
                   Pandas Package
                           ▲
                           │
    ┌──────────────────────┼──────────────────────┐
    │                      │                      │
(Used to create)  ┌───────────────────────────┐  (Used to analyze)
Pandas DataFrame  │  Walmart Sales Dataset    │  Summary Statistics
                  └───────────────────────────┘
                           │
                           │
                  (Analyzed with)
                           │
                 .agg() Method, Cumulative Stats
```

### Parent Concept

This dataset serves as a canonical example for applying the tools within the [[Python - Pandas Package|pandas package]].

### Child Concepts



### Related Concepts 

- It is represented in memory as a [[Python - Pandas DataFrame|pandas DataFrame]], the primary data structure for tabular data analysis in Python.
- This dataset is the primary subject for learning to compute [[Python - Summary Statistics in pandas|summary statistics]], which provide a high-level overview of the data's distribution.
- Analysts often use [[Python - The .agg() Method for Custom Statistics|the .agg() method]] on this dataset to calculate multiple statistics simultaneously, especially after grouping by store or type.
- To understand sales trends over time, one might calculate [[Python - Cumulative Statistics in pandas|cumulative statistics]] on the `weekly_sales` column.
## Questions

- Walmart wants to know if running a promotion on a holiday week is worth the cost. Using this dataset, how would you frame an analysis to answer this? What key metric would you focus on, and what confounding variables (like temperature) would you need to control for to provide a confident recommendation?
- Imagine this dataset grows from a few years of data to 20 years, covering every store globally, resulting in a 500GB file. How would your approach to calculating the average weekly sales per store type change? Describe the tools (e.g., Dask, Spark) you might use instead of pandas and why.
- What if you discovered the 'unemployment' data was not the national rate, but a randomly generated number for half the dataset? What steps would you take to validate the integrity of the other columns, and how would this discovery change your trust in any conclusions drawn from the data?