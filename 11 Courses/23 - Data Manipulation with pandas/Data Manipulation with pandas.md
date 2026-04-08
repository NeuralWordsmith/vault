---
tags:
status: Notes created
start_date: 2026-02-27
end_date:
---
# Course: Data Manipulation with pandas

# 1. Summary & Goals

_A brief, one-paragraph description of the course. What are its main objectives? Why am I taking it, and what key skills do I expect to gain?_

---
# 2. Core Concepts & Notes

_This is the central index for this course. As I create new atomic notes, I will link them here under the relevant module or topic._

## Chapter 1: Transforming DataFrames
### 01 - Introducing DataFrames

1. [[Python - Pandas Package Overview]]
2. [[Python - Pandas, NumPy & Matplotlib Relationship]]
3. [[Python - Rectangular (Tabular) Data]]
4. [[Python - DataFrame Definition]]
5. [[Python - DataFrame vs R DataFrame vs SQL Table]]
6. [[Python - DataFrame Data Type Constraints]]
7. [[Python - Exploratory Data Analysis with Pandas]]
8. [[Python - DataFrame.head() Method]]
9. [[Python - DataFrame.info() Method]]
10. [[Python - DataFrame.shape Attribute]]
11. [[Python - DataFrame.describe() Method]]
12. [[Python - DataFrame Components]]
13. [[Python - DataFrame.values Attribute]]
14. [[Python - DataFrame.columns Attribute]]
15. [[Python - DataFrame.index Attribute]]
16. [[Python - Pandas Design Philosophy (The Anti-Zen of Python)]]
### 02 - Sorting and subsetting

1. [[Python - Sorting DataFrames]]
2. [[Python - Subsetting DataFrames]]
3. [[Python - Sorting by a Single Column]]
4. [[Python - Controlling Sort Direction]]
5. [[Python - Sorting by Multiple Columns]]
6. [[Python - Subsetting Columns]]
7. [[Python - Subsetting Rows with Logical Conditions]]
8. [[Python - Subsetting with Multiple Conditions]]
9. [[Python - Subsetting with the isin() Method]]
### 03 - New columns

1. [[Python - Adding New Columns to a DataFrame]]
2. [[Python - Creating a New Column from One Existing Column]]
3. [[Python - Creating a New Column from Multiple Existing Columns]]
4. [[Python - Chaining Pandas Operations for Analysis]]

## Chapter 2: Aggregating DataFrames
### 01 - Summary statistics

1. [[Python - Summary Statistics in pandas]]
2. [[Python - Common Summary Statistics in pandas]]
3. [[Python - The .agg() Method for Custom Statistics]]
4. [[Python - Cumulative Statistics in pandas]]
5. [[Python - Walmart Sales Dataset Context]]
### 02 - Counting

1. [[Python - Counting Categorical Data]]
2. [[Python - Handling Duplicates in pandas]]
3. [[Python - drop_duplicates() Method]]
4. [[Python - value_counts() Method]]
### 03 - Grouped summary statistics

1. [[Python - Grouped Summary Statistics]]
2. [[Python - Manual Subsetting vs groupby() for Aggregation]]
3. [[Python - DataFrame groupby() Method]]
4. [[Python - Grouped Aggregation with agg()]]
5. [[Python - Grouping by Multiple Columns]]
### 04 - Pivot tables

1. [[Python - Pivot Tables]]
2. [[Python - Pivot Table Basic Usage (index, values)]]
3. [[Python - Pivot Table Custom Aggregation (aggfunc)]]
4. [[Python - Pivot Table Multi-Level Grouping (columns)]]
5. [[Python - Handling Missing Values in Pivot Tables (fill_value)]]
6. [[Python - Calculating Margins in Pivot Tables (margins)]]

## Chapter 3: Slicing and Indexing DataFrames
### 01 - Explicit indexes

1. [[Python - Pandas DataFrame Structure]]
2. [[Python - Setting a DataFrame Index (set_index)]]
3. [[Python - Resetting a DataFrame Index (reset_index)]]
4. [[Python - Benefits of Using DataFrame Indexes]]
5. [[Python - Subsetting with .loc on DataFrame Index]]
6. [[Python - Non-Unique DataFrame Indexes]]
7. [[Python - Multi-Level (Hierarchical) Indexes]]
8. [[Python - Subsetting Outer Levels of a Multi-Level Index]]
9. [[Python - Subsetting Inner Levels of a Multi-Level Index]]
10. [[Python - Sorting by DataFrame Index (sort_index)]]
11. [[Python - Drawbacks of Using DataFrame Indexes]]
12. [[Python - Tidy Data Principles]]
### 02 - Slicing and subsetting with .loc and .iloc

1. [[Python - Slicing and Subsetting in Pandas]]
2. [[Python - Slicing Lists]]
3. [[Python - Slicing Outer Index Level with .loc]]
4. [[Python - Slicing Inner Index Level with .loc]]
5. [[Python - Slicing Columns with .loc]]
6. [[Python - Slicing Rows and Columns Simultaneously with .loc]]
7. [[Python - Slicing by Date Ranges with .loc]]
8. [[Python - Slicing by Partial Dates with .loc]]
9. [[Python - Slicing DataFrames with .iloc]]
10. [[Python - .loc vs .iloc Slicing Behavior]]
11. [[Python - DataFrame Slicing Process]]
### 03 - Working with pivot tables

1. [[Python - Working with Pivot Tables]]
2. [[Python - Creating Pivot Tables]]
3. [[Python - Pivot Tables as DataFrames]]
4. [[Python - Subsetting Pivot Tables with .loc]]
5. [[Python - Pivot Table Calculations Across Rows (axis='index')]]
6. [[Python - Pivot Table Calculations Across Columns (axis='columns')]]
7. [[Python - Pivot Table Data Type Homogeneity]]

## Chapter 4: Creating and Visualizing DataFrames
### 01 - Visualizing your data

1. [[Python - Data Visualization with Pandas]]
2. [[Python - Pandas Plotting with Matplotlib]]
3. [[Python - Histograms]]
4. [[Python - Adjusting Histogram Bins]]
5. [[Python - Bar Plots]]
6. [[Python - Line Plots]]
7. [[Python - Scatter Plots]]
8. [[Python - Layering Plots]]
9. [[Python - Adding Titles to Plots]]
10. [[Python - Rotating Plot Labels]]
11. [[Python - Adding Legends to Plots]]
12. [[Python - Adjusting Plot Transparency (Alpha)]]
### 02 - Missing values

1. [[Python - Handling Missing Values in pandas]]
2. [[Python - NaN (Not a Number)]]
3. [[Python - pandas .isna() Method]]
4. [[Python - pandas .isna().any() Method]]
5. [[Python - pandas .isna().sum() Method]]
6. [[Python - Visualizing Missing Values]]
7. [[Python - pandas .dropna() Method]]
8. [[Python - pandas .fillna() Method]]
### 03 - Creating DataFrames

1. [[Python - Dictionaries 2]]
2. [[Python - Creating Pandas DataFrames]]
3. [[Python - Creating a DataFrame from a List of Dictionaries]]
4. [[Python - Creating a DataFrame from a Dictionary of Lists]]
5. [[Python - Row-wise vs Column-wise DataFrame Creation]]
### 04 - Reading and writing CSVs

1. [[Python - CSV (Comma-Separated Values)]]
2. [[Python - pandas.read_csv()]]
3. [[Python - DataFrame.to_csv()]]
4. [[Python - CSV Data I/O Workflow]]

---
# 3. Key Takeaways & Reflections

_After completing the course, what are the 2-3 most important ideas that I will carry forward? Were there any "aha!" moments that connected this topic to others in a new way?_

- **Everything covered in this course:** [[ - Major Takeaway note]]
- **Cheat Sheet:** [[ - Cheat sheet]]

---
# 4. Related Projects & Applications

_A list of projects where I have applied the skills from this course. This directly links my theoretical knowledge to practical, portfolio-worthy application._

- **Exercises:** [[ - Exercise plan]]

---

- [x] [[Python - Pandas Foundations 841]]
- [x] [[Python - Slicing And Dicing 128]]
- [x] [[Python - Column Creation 517]]
- [x] [[Python - Aggregating Insights 249]]
- [x] [[Python - Counting Canines 654]]
- [x] [[Python - Grouped Insights 984]]
- [x] [[Python - Pivoting Perspectives 656]]
- [x] [[Python - Index Intricacies 135]]
- [x] [[Python - Precise Data Slices 403]]
- [x] [[Python - Pivoting Perspectives 575]]
- [x] [[Python - Painting With Data 764]]
- [x] [[Python - Wrangling Nulls 612]]
- [x] [[Python - Framing The Data 519]]
- [x] [[Python - Tabular Transmissions 847]]
- [ ] [[Python - Pandas Post-Mortem 792]]