---
tags: 
  - process
  - python
  - etl
  - data_engineering
  - automation
  - data_processing
  - workflow
  - concept
source: 
  - "[[Introduction to Testing in Python]]"
related: 
  - "[[Fundamental - Data Engineering]]"
  - "[[Python - Packages]]"
  - "[[Python - Importing Packages]]"
  - "[[Python - Error Handling]]"
  - "[[SWE - Testing Best Practices]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[SWE - Do One Thing Principle]]"
  - "[[Python - Unit Testing]]"
  - "[[Python - Pytest Framework]]"
  - "[[Python - Testing File Read Operations]]"
  - "[[Python - Testing File Write Operations]]"
  - "[[Python - Testing Data Filtering Logic]]"
  - "[[Python - Testing Business Logic with Assertions]]"
  - "[[Fundamental - SQL]]"
  - "[[Fundamental - Cloud Computing]]"
  - "[[Fundamental - Containerization]]"
---
# Process: Data Pipelines

**Why This Matters:** Data pipelines automate the flow and transformation of data, ensuring that reliable, up-to-date information is consistently available for analysis and decision-making.
## Goal & Analogy

> **Goal:** A data pipeline is a series of automated, sequential data processing steps. It's a common pattern in data engineering to move data from a source, apply transformations, and load it into a destination. The example pipeline demonstrates a simple version of this: reading data, filtering it, performing a calculation, and saving the result. Each stage of this process must be reliable, which is why specific testing practices like [[Python - Testing File Read Operations|testing the initial data ingestion]] and [[Python - Testing Data Filtering Logic|validating the transformation logic]] are critical for building robust pipelines.

_Analogy:_ _Think of a data pipeline as a restaurant's kitchen assembly line for a specific dish, like a salad.

- **Raw Ingredients Arrive**: A truck delivers fresh lettuce, tomatoes, and cucumbers. This is the raw data source.
- **Prep Station**: A chef washes the lettuce and chops the vegetables. This is the 'Extract' and 'Transform' stage, where data is read and cleaned/filtered.
- **Assembly Station**: Another chef combines the ingredients in a bowl and adds dressing. This is the core 'Transform' or calculation stage, like finding the mean salary.
- **Plating/Serving**: The finished salad is put on a plate and sent to the customer. This is the 'Load' stage, where the final result is saved to a file or database for the 'customer' (an analyst, a dashboard, etc.) to use._

- **Raw Ingredients** -> Raw data (e.g., CSV file)
- **Prep Station** -> Reading and filtering data
- **Assembly Station** -> Performing calculations (e.g., `mean()`)
- **Plating/Serving** -> Saving the result to a new file
- **Where it breaks down:** This analogy implies a simple, linear flow. Real-world data pipelines can be far more complex, with branching paths, feedback loops, parallel processing, and sophisticated error handling that a simple kitchen line doesn't capture.

```
[Source CSV]──> (1. Read) ──> (2. Filter 'FT') ──> (3. Calculate Mean) ──> (4. Save) ──> [Result TXT]
```

## The Step-by-Step Process

### Prerequisites / Inputs

- **Source and Destination Paths**
    - The file paths or database connection strings for where to read data from and where to write results to. These are often configurable to switch between development and production environments.
- **Transformation Logic**
    - The specific rules for filtering, cleaning, and aggregating data. In the example, the `employment_type` ('FT') is a key parameter that could be changed to analyze other groups.
- **Execution Schedule/Trigger**
    - Determines when the pipeline runs. It could be on a fixed schedule (e.g., every night at 2 AM), triggered by an event (e.g., a new file arriving), or run manually.

### The Steps

- **Step 1: Read the Data (Extract)**
    - The pipeline begins by loading the raw data from a source. In this case, it's a CSV file containing information about data science jobs.
- **Step 2: Filter by Employment Type (Transform)**
    - The first transformation step applies business logic to the dataset. Here, we isolate only the rows corresponding to 'Full-Time' (FT) employees to narrow the scope of our analysis.
- **Step 3: Calculate Mean Salary (Transform)**
    - The second transformation step performs an aggregation. The pipeline calculates the average salary for the previously filtered group of full-time employees.
- **Step 4: Save the Result (Load)**
    - Finally, the pipeline writes the calculated result to a destination, such as a new text file or database table, so it can be easily accessed.

##### Code Translation

```python
import pandas as pd
import io

# Create a dummy CSV file in memory to simulate the source data
csv_data = """
work_year,experience_level,employment_type,job_title,salary
2023,SE,FT,Principal Data Scientist,80000
2023,MI,CT,ML Engineer,30000
2023,SE,FT,Data Scientist,175000
2023,SE,FT,Applied Scientist,222200
2023,SE,PT,Data Scientist,100000
"""

def process_salaries(input_file, output_file, emp_type='FT'):
    """A simple data pipeline function."""
    try:
        # --- Step 1: Read the Data (Extract) ---
        df = pd.read_csv(input_file)
        print("Successfully read data.")

        # --- Step 2: Filter by Employment Type (Transform) ---
        filtered_df = df[df['employment_type'] == emp_type]
        print(f"Filtered for employment type: {emp_type}")

        # --- Step 3: Calculate Mean Salary (Transform) ---
        mean_salary = filtered_df['salary'].mean()
        print(f"Calculated mean salary: {mean_salary:.2f}")

        # --- Step 4: Save the Result (Load) ---
        with open(output_file, 'w') as f:
            f.write(f"Mean salary for {emp_type} employees: {mean_salary:.2f}")
        print(f"Result saved to {output_file}")

    except Exception as e:
        print(f"An error occurred: {e}")

# --- Execute the pipeline ---
input_data_source = io.StringIO(csv_data)
output_data_sink = 'mean_salary_result.txt'
process_salaries(input_data_source, output_data_sink)

```

### Deliverables / Outputs

Following the provided context, a data pipeline is a set of actions to extract insights from data. The example outlines a simple but complete pipeline: it reads salary data, filters it for a specific employment type, calculates an aggregate statistic (the mean salary), and saves this new piece of information. This sequence of 'Extract, Transform, Load' (ETL) is a foundational concept in the field of Data Engineering. The goal is to create a repeatable, automated workflow that turns raw data into useful, processed information. The main stages are typically **Data Ingestion**, **Data Transformation**, and **Data Loading/Serving**.

## Context & Tradeoffs

### When to Use This Process

To automate the process of moving and transforming data from a source to a destination, making it ready for analysis, reporting, or use in an application.

### Common Pitfalls & Tradeoffs

- **Simplicity vs. Robustness**
    - A simple script is fast to write but lacks features like automatic retries, logging, and monitoring. Production-grade pipelines use orchestration tools (like Apache Airflow or Dagster) to manage these complexities, at the cost of higher initial setup effort.
- **Batch vs. Streaming**
    - This example is a batch pipeline, processing all available data at once. This is efficient for historical analysis but introduces latency. Streaming pipelines process data in real-time as it arrives, enabling immediate insights but requiring more complex and stateful infrastructure.
- **Coupling**
    - In this simple pipeline, the steps are tightly coupled. A change in the 'salary' column name would break both the calculation and filtering steps. More advanced pipelines use schemas and contracts between steps to reduce this brittleness.

## Connections

```
                      (Parent)
                 Data Engineering
                         ▲
                         │
         ┌───────────────┼────────────────────────────┐
         │               │                            │
(Related Concept) ┌───────────────┐         (Related Concept)
Testing File I/O  │ Data Pipeline │  Testing Business Logic
                  └───────────────┘
                         │
              ┌──────────┴──────────┐
              │                     │
   ETL (Extract, Transform, Load)   ELT (Extract, Load, Transform)
```


- Ensuring the reliability of a pipeline's first step is crucial, which is why [[Python - Testing File Read Operations|testing file read operations]] is a foundational practice.
- The core logic of the transformation stage must be validated, making [[Python - Testing Data Filtering Logic|testing data filtering logic]] essential for correctness.
- After the pipeline runs, it's important to confirm the output is correct, which involves [[Python - Testing File Write Operations|testing file write operations]].
- To ensure the pipeline is not just correct but also efficient, [[Python - pytest-benchmark for Performance Testing|performance testing]] can identify bottlenecks in any of the stages.

## Deeper Questions

- The business wants real-time salary insights. Your current pipeline is a daily batch job. How would you explain the trade-offs in cost, complexity, and maintenance of moving to a real-time streaming pipeline versus simply increasing the batch frequency to hourly?
- Imagine this pipeline needs to process 100GB of salary data daily instead of a small CSV. Where are the likely bottlenecks in the current script-based approach, and what architectural changes (e.g., using Spark, Dask, or a cloud service) would you propose to handle this scale?
- What if you were told that the 'save the result' step was no longer allowed? You can only serve the calculated mean salary via an API endpoint. How does this change the entire concept of the 'pipeline' and what new failure modes do you now have to consider?