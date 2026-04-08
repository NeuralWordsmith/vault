---
tags: 
  - core
  - python
  - data validation
  - unit testing
  - pandas
  - pytest
  - data integrity
  - concept
source: 
  - "[[Introduction to Testing in Python]]"
related: 
  - "[[Python - Unit Testing]]"
  - "[[Python - Pytest Framework]]"
  - "[[Python - Pytest Fixtures]]"
  - "[[Python - Testing Business Logic with Assertions]]"
  - "[[Python - Testing Data Type of a Calculation]]"
  - "[[Python - Data Science Salary Pipeline Workflow]]"
  - "[[Python - Testing File Read Operations]]"
  - "[[Python - Testing File Write Operations]]"
  - "[[SWE - Testing Best Practices]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - Conditional Statements]]"
  - "[[Python - Booleans]]"
  - "[[Python - Comparison Operators]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
---
# Core: Testing Data Filtering Logic

## Summary

>This type of unit test verifies that a data transformation function, specifically a filter, correctly isolates the intended records from a dataset. It confirms that after filtering, a specific column contains only the expected unique values, ensuring the core business logic of the selection process is sound. This is a common pattern in data science workflows, as seen in the overall [[Python - Data Science Salary Pipeline Workflow|data science pipeline workflow]].

**Why This Matters:** This test ensures the integrity of data subsets, preventing incorrect data from propagating through an analysis pipeline and leading to flawed conclusions.

_Analogy:_ _Imagine a quality control inspector at a factory that produces colored marbles. Their specific job is to test a sorting machine that's supposed to pull out only the blue marbles. The inspector takes a bucket of marbles processed by the machine, spreads them out, and checks if every single marble in the bucket is blue. If they find even one red or green marble, the machine fails the test._

  * **Sorting Machine:** The `filter_df()` function in the code.
  * **Bucket of Sorted Marbles:** The `filtered` pandas DataFrame.
  * **The Inspector's Check:** The `assert filtered['employment_type'].unique() == ['FT']` line.
  * **Blue Marbles:** The 'FT' (Full-Time) employment type.
  * **Where it breaks down:** The analogy implies a physical, one-by-one check. In code, methods like `.unique()` are highly optimized and check the entire dataset column almost instantly, without manual iteration.

```
    +----------------------+
    | Original DataFrame   |
    | (FT, PT, Contract)   |
    +----------------------+
              |
              v
    +----------------------+
    |    filter_df()       |
    |  (keep where == 'FT')|
    +----------------------+
              |
              v
    +----------------------+
    | Filtered DataFrame   |
    | (FT, FT)             |
    +----------------------+
              |
              v
    +--------------------------------+
    | .unique() on 'employment_type' |
    +--------------------------------+
              |
              v
    +----------------------+
    |       ['FT']         |
    +----------------------+
              |
              v
    +------------------------+
    | assert result == ['FT']|
    +------------------------+
              |
              v
    +----------------------+
    |      PASS / FAIL     |
    +----------------------+
```

## Details

In many data processing pipelines, a critical first step is to filter a large dataset to a specific subset of interest. For example, we might want to analyze only full-time employees. This unit test is designed to explicitly verify that our filtering logic works exactly as intended. We apply the filter and then check the state of the resulting data—specifically, we use the pandas `.unique()` method on the relevant column to confirm that it contains one and only one expected value, in this case, 'FT'. This is a form of [[Python - Testing Business Logic with Assertions|testing business logic]], ensuring our data transformations align with requirements.

#### Primary Goal

To programmatically guarantee that a data filtering function correctly isolates a specific segment of the data based on predefined criteria.

#### Mechanism

- **Step 1: Prepare the Test Data**
    - A sample pandas DataFrame is created, often using a [[Python - Pytest Fixtures|pytest fixture]]. This DataFrame should contain a mix of data, including rows that should be kept and rows that should be removed by the filter.
- **Step 2: Apply the Filtering Function**
    - The function under test (e.g., `filter_df`) is called with the test DataFrame as input. This produces a new, smaller DataFrame.
- **Step 3: Isolate and Inspect the Target Column**
    - The specific column that was the basis for the filter (e.g., 'employment_type') is selected from the filtered DataFrame.
- **Step 4: Assert the Column's State**
    - An `assert` statement is used to check if the unique values in the target column match the expected outcome. The `.unique()` method returns an array of unique values, which is then compared to a list containing only the expected value (e.g., `['FT']`).

##### Code Translation

```python
import pandas as pd
import pytest

# --- Assume this is the function from our main application we want to test ---
def filter_df(df):
    """Filters the DataFrame to include only Full-Time employment types."""
    return df[df['employment_type'] == 'FT']

# --- Pytest Fixture to create sample data for our tests ---
@pytest.fixture
def sample_dataframe():
    """Provides a sample DataFrame for testing."""
    data = {
        'employee_id': [1, 2, 3, 4],
        'employment_type': ['FT', 'PT', 'FT', 'Contract'],
        'salary': [90000, 50000, 120000, 80000]
    }
    return pd.DataFrame(data)

# --- The Unit Test ---
def test_filter_for_ft_only(sample_dataframe):
    # Step 1: The 'sample_dataframe' fixture provides the data.

    # Step 2: Apply the filtering function.
    filtered = filter_df(sample_dataframe)

    # Step 3: Isolate the target column and get its unique values.
    unique_employment_types = filtered['employment_type'].unique()

    # Step 4: Assert that the unique values are exactly what we expect.
    # The tolist() method is often used for a more robust comparison.
    assert unique_employment_types.tolist() == ['FT']
```

 [[Code - Testing Data Filtering Logic Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Expected Value:** The primary 'parameter' in this test is the hardcoded expected value within the assertion (e.g., `['FT']`).
    - Changing this value directly changes the test's objective. For instance, changing it to `['PT']` would require a corresponding change in the `filter_df` function's logic to make the test pass.
    - This makes the test very specific but also brittle; if business requirements change, the test must be updated.

#### Core Trade-offs

- **Specificity vs. Flexibility:** This test is highly specific. It confirms *only* 'FT' is present. This is great for ensuring strict data integrity.
    - The downside is brittleness. If the business rule changes to 'include FT and Intern', this test will fail and need to be rewritten. A more flexible test might check `assert 'PT' not in unique_values`, but that's less precise.
- **Readability vs. Complexity:** Using `.unique()` is extremely readable and clearly states the intent. However, for very large datasets, calculating unique values can be computationally expensive in a testing environment, though this is rarely an issue for unit tests which should use small, representative data samples.

## Connections

```
                      (Parent)
                    Unit Testing
                         ▲
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                    │
(Related)      ┌───────────────────────────┐      (Related)
Testing Business Logic │ Testing Data Filtering Logic │ Testing Data Type
                       └───────────────────────────┘
```

### Parent Concept

This concept is a specific application of [[Python - Unit Testing|unit testing]], where a small, isolated piece of code—the filtering function—is verified independently.

### Child Concepts



### Related Concepts 

- This test is a core component of a larger [[Python - Data Science Salary Pipeline Workflow|data science pipeline workflow]], ensuring data quality at each stage.
- It is a specific form of [[Python - Testing Business Logic with Assertions|testing business logic]], where the "logic" is the rule for including or excluding data.
- This test complements other checks, such as [[Python - Testing Data Type of a Calculation|testing the data type of a calculation]], to provide comprehensive test coverage.
## Questions

- Imagine the business requirement changes from 'only FT' to 'all employment types except Contract'. How would you refactor this unit test to validate the new logic, and what's the trade-off between asserting what *is* present versus asserting what *is not* present?
- In a production data pipeline that processes terabytes of data, running `.unique()` on a column inside a test could be very slow and costly. How would you redesign this validation check to be more performant while still providing confidence in the filter's correctness? Would sampling be appropriate?
- What if you were told that the `employment_type` column might contain `None` or `NaN` values in the raw data? How would your `filter_df` function and this corresponding unit test need to change to handle these missing values gracefully?