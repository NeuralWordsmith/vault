---
tags: 
  - core
  - python
  - data validation
  - sanity check
  - pytest
  - data pipeline
  - assertion
  - concept
source: 
  - "[[Introduction to Testing in Python]]"
related: 
  - "[[Python - Unit Testing]]"
  - "[[Python - Pytest Framework]]"
  - "[[Python - Pytest Fixtures]]"
  - "[[SWE - Testing Best Practices]]"
  - "[[Python - Data Science Salary Pipeline Workflow]]"
  - "[[Python - Testing File Read Operations]]"
  - "[[Python - Testing Data Type of a Calculation]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[NumPy - Exploratory Data Analysis with NumPy]]"
  - "[[Python - Comparison Operators]]"
  - "[[Python - Functions]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[SWE - Continuous Integration (CI)]]"
---
# Core: Testing Data Filtering Logic

## Summary

>Testing data filtering logic involves writing automated checks to verify that the functions responsible for selecting subsets of data behave as expected. This is a crucial part of [[Python - Unit Testing|unit testing]] in a data science workflow, like the [[Python - Data Science Salary Pipeline Workflow|salary pipeline]], as it guarantees that the data passed to analytical or modeling stages meets specific criteria. These tests often check boundary conditions and logical invariants, such as ensuring a calculated mean on filtered data falls within a sensible range.

**Why This Matters:** Testing data filtering logic prevents silent errors in data pipelines, ensuring that subsequent analyses and model training are based on the correct and expected subset of data.

_Analogy:_ _Think of testing data filtering logic like being a bouncer at an exclusive club with a very specific guest list. The bouncer's job (the test function) isn't to host the party, but to check every person (data row) against a set of rules (the filtering logic). The rules might be 'guests must be over 21' and 'must have an invitation'. The test asserts that after the bouncer has done their job, everyone inside the club (the filtered dataset) is indeed over 21 and has an invitation. It also performs a sanity check, like ensuring the number of people inside isn't more than the club's maximum capacity (the original dataset size)._

**Where it breaks down:** The analogy implies a simple, one-time check at the door. In reality, data filtering tests are part of an automated suite that runs continuously, and the 'rules' (filtering logic) can be far more complex and interconnected than a club's entry policy.

```
Original DataFrame (read_df)
+-----------------+
| salary_in_usd   |
|-----------------|
|      30000      |
|      80000      |  ─────┐
|     120000      |       │
+-----------------+       │
                          │ filter_df()
                          ▼
                  Filtered DataFrame
                  +-----------------+
                  | salary_in_usd   |
                  |-----------------|
                  |      80000      |
                  |     120000      |
                  +-----------------+
                          │
                          │ get_mean()
                          ▼
                        100000
                          │
         ┌────────────────┴────────────────┐
         │                                 │
         ▼                                 ▼
assert 100000 > 0 (✅)         assert 100000 <= 120000 (✅)
```

## Details

In data processing pipelines, filtering is a fundamental step used to isolate relevant data for analysis. However, complex filtering logic can introduce subtle bugs. Testing this logic involves creating specific test functions that apply the filter and then use assertions to validate properties of the resulting dataset. As seen in the example, we verify that the mean salary of a filtered group is not only positive but also logically constrained by the maximum salary of the entire original dataset, ensuring the filtering didn't produce nonsensical results.

#### Primary Goal

To programmatically verify that data subsetting operations correctly include the desired data and exclude the undesired data, preventing corrupted or incorrect data from propagating through a pipeline.

#### Mechanism

- **Step 1: Define the Test Function and Input Data**
    - A test function, typically prefixed with `test_`, is created. It accepts a [[Python - Pytest Fixtures|pytest fixture]] (e.g., `read_df`) which provides a consistent, known dataset (like the one from [[Python - Testing File Read Operations|testing file reads]]) for the test to run against.
- **Step 2: Apply the Filtering Logic**
    - Inside the test, the function containing the filtering logic (e.g., `filter_df(read_df)`) is called. This function is the 'unit' under test. Its output, a filtered DataFrame, is stored in a new variable.
- **Step 3: Assert Logical Conditions**
    - The `assert` keyword is used to check if certain conditions about the filtered data are true. These are not just simple equality checks but often logical or business-rule validations.
    - *Example 1:* `assert get_mean(filtered) > 0` checks a basic property – that the average salary is a positive number.
    - *Example 2:* `assert get_mean(filtered) <= read_df['salary_in_usd'].max()` is a more powerful sanity check. It asserts that the mean of any subset cannot logically exceed the maximum value of the entire original set.

##### Code Translation

```python
import pandas as pd

# Assume these functions are defined elsewhere in the project
def filter_df(df: pd.DataFrame) -> pd.DataFrame:
    # Example filtering logic: only keep salaries above 50k
    return df[df['salary_in_usd'] > 50000]

def get_mean(df: pd.DataFrame) -> float:
    # Example mean calculation
    return df['salary_in_usd'].mean()

# --- Test Function ---
def test_feature(read_df: pd.DataFrame):
    # --- Step 1 & 2: Prepare data and apply filtering ---
    # 'read_df' is a fixture providing the initial DataFrame
    # The filtering logic from 'filter_df' is the unit under test
    filtered = filter_df(read_df)

    # --- Step 3: Assert logical conditions ---
    # Test case: The mean of the filtered salaries should be positive
    assert get_mean(filtered) > 0

    # Test case: The mean of the filtered group cannot be larger
    # than the absolute maximum salary in the original dataset.
    assert get_mean(filtered) <= read_df['salary_in_usd'].max()
```

 [[Code - Testing Data Filtering Logic Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Assertion Logic**
    - The core 'levers' are the assertions themselves. You can test for different properties: the count of rows, the absence of certain values, the range of a column, or complex statistical relationships.
- **Input Data (Fixtures)**
    - By creating different fixtures, you can test how the filtering logic handles various edge cases, such as empty DataFrames, DataFrames with missing values, or data that should be entirely filtered out.

#### Core Trade-offs

- **Pro: Prevents Silent Failures**
    - The biggest advantage is catching bugs in data logic that wouldn't cause a crash but would produce incorrect analytical results downstream. This builds trust in the data pipeline.
- **Con: Can Be Brittle**
    - Tests that assert very specific values (e.g., `assert mean == 105.7`) can break easily if the input data or filtering logic changes slightly. It's often better to test for properties and ranges, as shown in the example (`> 0`, `<= max()`).
- **Con: Increased Maintenance**
    - As the data processing logic evolves, the corresponding tests must be updated. This adds a layer of maintenance overhead to the project.

## Connections

```
                      (Parent)
                   Unit Testing
                         ▲
                         │
         ┌───────────────┼───────────────────────────┐
         │               │                           │
(Part of Workflow)┌───────────────────────────┐ (Prerequisite)
Salary Pipeline   │ Testing Data Filtering    │ File Read Tests
                  └───────────────────────────┘
                         │
                         ▼
                   (Related)
               Testing Data Type
```

### Parent Concept

This concept is a specific application of [[Python - Unit Testing|unit testing]], focusing on verifying the behavior of functions within a data processing context.

### Child Concepts



### Related Concepts 

- This type of test is a critical component in a larger [[Python - Data Science Salary Pipeline Workflow|data science pipeline]], ensuring each step's output is valid before the next step begins.
- It builds upon the foundation of [[Python - Testing File Read Operations|testing file read operations]], as it requires a reliable and consistent data source (often from a fixture) to test against.
- This test complements [[Python - Testing Data Type of a Calculation|testing the data type of a calculation]], as both work together to ensure the structural and logical integrity of the data.
- The assertions used are fundamental [[Python - Comparison Operators|comparison operators]] combined with methods from the pandas library.
## Questions

- You've written a test to ensure the mean salary of filtered senior-level employees is within a logical range. The business now adds a new 'stock options value' column. How would you update your testing strategy to validate filtering logic that now involves both salary and stock options, and how would you explain the value of this extra testing effort to a product manager concerned about development velocity?
- Imagine this filtering logic is part of a real-time data pipeline processing thousands of records per second. How would you design a system to run these data quality assertions in production without significantly impacting the pipeline's latency? What happens if a batch of data fails an assertion?
- What if you were told you could no longer use `assert` statements because a new company policy requires all data validation failures to be logged to a database with rich context, rather than just halting the test suite. How would you refactor this test function to meet the new requirement while still clearly signaling success or failure?