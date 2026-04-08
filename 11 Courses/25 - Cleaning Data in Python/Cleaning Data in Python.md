---
tags:
status: Notes created
start_date: 2026-02-28
end_date:
---
# Course: Cleaning Data in Python

# 1. Summary & Goals

_A brief, one-paragraph description of the course. What are its main objectives? Why am I taking it, and what key skills do I expect to gain?_

---
# 2. Core Concepts & Notes

_This is the central index for this course. As I create new atomic notes, I will link them here under the relevant module or topic._

## Chapter 1: Common data problems
### 01 - Data type constraints

1. [[DataEng - Data Science Workflow]]
2. [[DataEng - Dirty Data]]
3. [[DataEng - Garbage In, Garbage Out (GIGO)]]
4. [[Python - Data Type Constraints]]
5. [[Python - Identifying Data Types with .dtypes]]
6. [[Python - Inspecting DataFrame with .info()]]
7. [[Python - Converting String Columns to Numeric Process]]
8. [[Python - Stripping Characters with .str.strip()]]
9. [[Python - Type Casting with .astype()]]
10. [[Python - Verifying Data with assert]]
11. [[Python - Categorical Data]]
12. [[Python - Converting to Categorical Type]]
13. [[Python - Integer vs Categorical Data Description]]
### 02 - Data range constraints

1. [[DataEng - Data Range Constraints]]
2. [[DataEng - Handling Out-of-Range Data]]
3. [[DataEng - Dropping Out-of-Range Data]]
4. [[DataEng - Capping Out-of-Range Data]]
5. [[DataEng - Assigning Custom Values to Out-of-Range Data]]
6. [[DataEng - Dropping Out-of-Range Rows in Pandas]]
7. [[DataEng - Capping Out-of-Range Values in Pandas]]
8. [[DataEng - Using Assert Statements for Data Validation]]
9. [[DataEng - Handling Out-of-Range Dates in Pandas]]
10. [[DataEng - Converting Columns to Datetime in Pandas]]
11. [[DataEng - Getting the Current Date in Python]]
### 03 - Uniqueness constraints

1. [[Python - Data Cleaning]]
2. [[Python - Duplicate Data]]
3. [[Python - Causes of Duplicate Data]]
4. [[Python - pandas .duplicated() Method]]
5. [[Python - .duplicated() Method Parameters (subset, keep)]]
6. [[Python - pandas .drop_duplicates() Method]]
7. [[Python - Handling Incomplete Duplicates]]
8. [[Python - Process for Identifying and Analyzing Duplicates]]
9. [[Python - Process for Resolving Incomplete Duplicates with .groupby() and .agg()]]

## Chapter 2: Text and categorical data problems
### 01 - Membership constraints

1. [[DataEng - Categorical Data]]
2. [[DataEng - Inconsistent Categorical Data]]
3. [[DataEng - Handling Inconsistent Categorical Data]]
4. [[DataEng - Anti Join]]
5. [[DataEng - Inner Join]]
6. [[DataEng - Anti Join vs Inner Join]]
7. [[DataEng - Dropping Rows with Inconsistent Categories]]
### 02 - Categorical variables

9. [[DataEng - Categorical Data Cleaning]]
10. [[DataEng - Handling Inconsistent Capitalization]]
11. [[DataEng - Handling Leading and Trailing Whitespace]]
12. [[DataEng - Creating Categories from Continuous Data]]
13. [[DataEng - Creating Categories with qcut()]]
14. [[DataEng - Creating Categories with cut()]]
15. [[DataEng - qcut() vs cut()]]
16. [[DataEng - Collapsing Categories with replace()]]
### 03 - Cleaning text data

1. [[Python - Text Data Cleaning]]
2. [[Python - String Replacement with .str.replace()]]
3. [[Python - Filtering by String Length]]
4. [[Python - Data Validation with Assert Statements]]
5. [[Python - Regular Expressions (Regex)]]
6. [[Python - Extracting Digits with Regex]]

## Chapter 3: Advanced data problems
### 01 - Uniformity

1. [[Python - Data Uniformity]]
2. [[Python - Visualizing Data Uniformity Issues]]
3. [[Python - Standardizing Temperature Units]]
4. [[Python - Using Assert Statements for Data Validation]]
5. [[Python - Inconsistent Date Formats]]
6. [[Python - Standardizing Dates with pandas.to_datetime]]
7. [[Python - Handling Unparseable Dates with errors='coerce']]
8. [[Python - Reformatting Datetime Columns with strftime]]
9. [[Python - Handling Ambiguous Date Formats]]
### 02 - Cross field validation

1. [[Python - Cross Field Validation]]
2. [[Python - Cross Field Validation Process]]
3. [[Python - Cross Field Validation for Flight Passenger Counts]]
4. [[Python - Cross Field Validation for User Age and Birthday]]
5. [[Python - Handling Data Inconsistencies]]
### 03 - Completeness

1. [[Python - Data Completeness]]
2. [[Python - Missing Data (NaN)]]
3. [[Python - Detecting Missing Data in Pandas]]
4. [[Python - Visualizing Missing Data with missingno]]
5. [[Python - Investigating Patterns in Missing Data]]
6. [[Python - Types of Missing Data]]
7. [[Python - Missing Completely At Random (MCAR)]]
8. [[Python - Missing At Random (MAR)]]
9. [[Python - Missing Not At Random (MNAR)]]
10. [[Python - Handling Missing Data in Pandas]]
11. [[Python - Dropping Missing Data with .dropna()]]
12. [[Python - Imputing Missing Data with .fillna()]]

## Chapter 4: Record linkage
### 01 - Comparing strings

1. [[Python - Minimum Edit Distance]]
2. [[Python - Levenshtein Distance]]
3. [[Python - thefuzz Package]]
4. [[Python - fuzz.WRatio Function]]
5. [[Python - process.extract Function]]
6. [[Python - Minimum Edit Distance & Similarity Score Relationship]]
7. [[Python - Cleaning Categorical Data with String Matching]]
8. [[Python - Record Linkage]]
### 02 - Generating pairs

1. [[Python - Record Linkage]]
2. [[Python - Record Linkage Workflow]]
3. [[Python - recordlinkage Package]]
4. [[Python - Generating Candidate Pairs in Record Linkage]]
5. [[Python - Blocking in Record Linkage]]
6. [[Python - The recordlinkage.Index Object]]
7. [[Python - Comparing Candidate Pairs in Record Linkage]]
8. [[Python - The recordlinkage.Compare Object]]
9. [[Python - Defining Comparison Vectors with recordlinkage]]
10. [[Python - Computing Comparison Scores with recordlinkage]]
11. [[Python - Filtering Potential Matches from Comparison Scores]]
### 03 - Linking DataFrames

1. [[Python - Record Linkage Workflow 1]]
2. [[Python - Multi-Index DataFrames in Record Linkage]]
3. [[Python - Filtering Potential Matches by Score]]
4. [[Python - Accessing Multi-Index Levels with get_level_values()]]
5. [[Python - Inverting a Boolean Index with the Tilde (~) Operator]]
6. [[Python - Concatenating DataFrames with pandas.concat()]]


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



---

- **Created Plans:**
	- [x] [[Python - Data Integrity 454]]
	- [x] [[DataClean - Range Rover 149]]
	- [x] [[Python - Duplicate Dilemmas 608]]
	- [x] [[Data Cleaning - Categorical Purity 666]]
	- [x] [[Pandas - Categorical Cleanup 928]]
	- [x] [[Python - Textual Tidy Up 846]]
	- [x] [[Python - Uniformity Unveiled 922]]
	- [x] [[Python - Data Integrity Check 747]]
	- [x] [[Python - Handling The Voids 153]]
	- [x] [[Python - Fuzzy String Logic 916]]
	- [x] [[Python - Linking Lineage 696]]
	- [x] [[Python - Duplicate Destiny 955]]
	- [ ] [[DataEng - Course Recap 735]]

---

## Links present in this note

1. [[DataEng - Anti Join]]
2. [[DataEng - Anti Join vs Inner Join]]
3. [[DataEng - Assigning Custom Values to Out-of-Range Data]]
4. [[DataEng - Capping Out-of-Range Data]]
5. [[DataEng - Capping Out-of-Range Values in Pandas]]
6. [[DataEng - Categorical Data]]
7. [[DataEng - Categorical Data Cleaning]]
8. [[DataEng - Collapsing Categories with replace()]]
9. [[DataEng - Converting Columns to Datetime in Pandas]]
10. [[DataEng - Creating Categories from Continuous Data]]
11. [[DataEng - Creating Categories with cut()]]
12. [[DataEng - Creating Categories with qcut()]]
13. [[DataEng - Data Range Constraints]]
14. [[DataEng - Data Science Workflow]]
15. [[DataEng - Dirty Data]]
16. [[DataEng - Dropping Out-of-Range Data]]
17. [[DataEng - Dropping Out-of-Range Rows in Pandas]]
18. [[DataEng - Dropping Rows with Inconsistent Categories]]
19. [[DataEng - Garbage In, Garbage Out (GIGO)]]
20. [[DataEng - Getting the Current Date in Python]]
21. [[DataEng - Handling Inconsistent Capitalization]]
22. [[DataEng - Handling Inconsistent Categorical Data]]
23. [[DataEng - Handling Leading and Trailing Whitespace]]
24. [[DataEng - Handling Out-of-Range Data]]
25. [[DataEng - Handling Out-of-Range Dates in Pandas]]
26. [[DataEng - Inconsistent Categorical Data]]
27. [[DataEng - Inner Join]]
28. [[DataEng - Using Assert Statements for Data Validation]]
29. [[DataEng - qcut() vs cut()]]
30. [[Python - .duplicated() Method Parameters (subset, keep)]]
31. [[Python - Accessing Multi-Index Levels with get_level_values()]]
32. [[Python - Blocking in Record Linkage]]
33. [[Python - Categorical Data]]
34. [[Python - Causes of Duplicate Data]]
35. [[Python - Cleaning Categorical Data with String Matching]]
36. [[Python - Comparing Candidate Pairs in Record Linkage]]
37. [[Python - Computing Comparison Scores with recordlinkage]]
38. [[Python - Concatenating DataFrames with pandas.concat()]]
39. [[Python - Converting String Columns to Numeric Process]]
40. [[Python - Converting to Categorical Type]]
41. [[Python - Cross Field Validation]]
42. [[Python - Cross Field Validation Process]]
43. [[Python - Cross Field Validation for Flight Passenger Counts]]
44. [[Python - Cross Field Validation for User Age and Birthday]]
45. [[Python - Data Cleaning]]
46. [[Python - Data Completeness]]
47. [[Python - Data Type Constraints]]
48. [[Python - Data Uniformity]]
49. [[Python - Data Validation with Assert Statements]]
50. [[Python - Defining Comparison Vectors with recordlinkage]]
51. [[Python - Detecting Missing Data in Pandas]]
52. [[Python - Dropping Missing Data with .dropna()]]
53. [[Python - Duplicate Data]]
54. [[Python - Extracting Digits with Regex]]
55. [[Python - Filtering Potential Matches by Score]]
56. [[Python - Filtering Potential Matches from Comparison Scores]]
57. [[Python - Filtering by String Length]]
58. [[Python - Generating Candidate Pairs in Record Linkage]]
59. [[Python - Handling Ambiguous Date Formats]]
60. [[Python - Handling Data Inconsistencies]]
61. [[Python - Handling Incomplete Duplicates]]
62. [[Python - Handling Missing Data in Pandas]]
63. [[Python - Handling Unparseable Dates with errors='coerce']]
64. [[Python - Identifying Data Types with .dtypes]]
65. [[Python - Imputing Missing Data with .fillna()]]
66. [[Python - Inconsistent Date Formats]]
67. [[Python - Inspecting DataFrame with .info()]]
68. [[Python - Integer vs Categorical Data Description]]
69. [[Python - Inverting a Boolean Index with the Tilde (~) Operator]]
70. [[Python - Investigating Patterns in Missing Data]]
71. [[Python - Levenshtein Distance]]
72. [[Python - Minimum Edit Distance]]
73. [[Python - Minimum Edit Distance & Similarity Score Relationship]]
74. [[Python - Missing At Random (MAR)]]
75. [[Python - Missing Completely At Random (MCAR)]]
76. [[Python - Missing Data (NaN)]]
77. [[Python - Missing Not At Random (MNAR)]]
78. [[Python - Multi-Index DataFrames in Record Linkage]]
79. [[Python - Process for Identifying and Analyzing Duplicates]]
80. [[Python - Process for Resolving Incomplete Duplicates with .groupby() and .agg()]]
81. [[Python - Record Linkage]]
82. [[Python - Record Linkage Workflow]]
83. [[Python - Record Linkage Workflow 1]]
84. [[Python - Reformatting Datetime Columns with strftime]]
85. [[Python - Regular Expressions (Regex)]]
86. [[Python - Standardizing Dates with pandas.to_datetime]]
87. [[Python - Standardizing Temperature Units]]
88. [[Python - String Replacement with .str.replace()]]
89. [[Python - Stripping Characters with .str.strip()]]
90. [[Python - Text Data Cleaning]]
91. [[Python - The recordlinkage.Compare Object]]
92. [[Python - The recordlinkage.Index Object]]
93. [[Python - Type Casting with .astype()]]
94. [[Python - Types of Missing Data]]
95. [[Python - Using Assert Statements for Data Validation]]
96. [[Python - Verifying Data with assert]]
97. [[Python - Visualizing Data Uniformity Issues]]
98. [[Python - Visualizing Missing Data with missingno]]
99. [[Python - fuzz.WRatio Function]]
100. [[Python - pandas .drop_duplicates() Method]]
101. [[Python - pandas .duplicated() Method]]
102. [[Python - process.extract Function]]
103. [[Python - recordlinkage Package]]
104. [[Python - thefuzz Package]]