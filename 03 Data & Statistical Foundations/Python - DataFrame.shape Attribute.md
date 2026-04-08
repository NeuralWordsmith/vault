---
tags: 
  - core
  - python
  - dataframe
  - pandas
  - dimensions
  - rows
  - columns
  - concept
source: 
  - "[[Data Manipulation with pandas]]"
related: 
  - "[[Python - Pandas DataFrame]]"
  - "[[Python - Exploratory Data Analysis with Pandas]]"
  - "[[Python - DataFrame.info() Method]]"
  - "[[Python - DataFrame.head() Method]]"
  - "[[Python - DataFrame.columns Attribute]]"
  - "[[Python - DataFrame.index Attribute]]"
  - "[[Python - DataFrame.values Attribute]]"
  - "[[Python - DataFrame Components]]"
  - "[[Python - Rectangular (Tabular) Data]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - Tuples]]"
  - "[[Python - Pandas Package]]"
  - "[[Python - DataFrame Definition]]"
---
# Core: DataFrame.shape Attribute

## Summary

>In the Pandas library, `DataFrame.shape` is an attribute that returns a Python tuple containing the number of rows and columns of a DataFrame, in that order (rows, columns). Because it is an attribute, not a method, it is accessed directly without parentheses, providing a quick way to understand the dimensions of your [[Python - Rectangular (Tabular) Data|tabular data]].

**Why This Matters:** The `.shape` attribute provides an instant, high-level summary of a dataset's size, which is the first critical step in understanding its scale and potential memory footprint.

_Analogy:_ _Think of a DataFrame's `.shape` attribute as the dimensions listed on a blueprint for a building. The blueprint might say '10 floors, 20 rooms per floor'._

The blueprint's dimensions (10 floors, 20 rooms) directly correspond to the DataFrame's shape (10 rows, 20 columns). It gives you the overall size at a glance without needing to inspect every single room (or data point). **Where it breaks down:** The blueprint analogy doesn't capture what's *inside* the rooms (the data types, like integer or string) or the names of the rooms (the column labels), which you would find using other tools like `[[Python - DataFrame.info() Method|.info()]]` or `[[Python - DataFrame.columns Attribute|.columns]]`.

```
DataFrame: `dogs`
+-----------+-----------+-------------+
| name      | breed     | weight_kg   |
+-----------+-----------+-------------+
| Bella     | Labrador  | 26          |  <-- Row 1
| Charlie   | Poodle    | 12          |  <-- Row 2
| Lucy      | Chow Chow | 25          |  <-- Row 3
| Cooper    | Schnauzer | 8           |  <-- Row 4
+-----------+-----------+-------------+
      ^           ^           ^
      |           |           |
  Column 1    Column 2    Column 3

`dogs.shape` --> (4, 3)
                 (rows, columns)
```

## Details

The `.shape` attribute is a fundamental property of a Pandas DataFrame, inherited from its underlying NumPy array structure. It provides a direct and efficient way to ascertain the dimensions of your dataset. This is often one of the very first commands run during [[Python - Exploratory Data Analysis with Pandas|exploratory data analysis (EDA)]] because it immediately answers the two most basic questions about a dataset: 'How many observations (rows) do I have?' and 'How many features (columns) do I have?'. Understanding the scale of the data is crucial for planning subsequent data cleaning, manipulation, and modeling steps.

#### Primary Goal

To provide a quick, simple, and computationally inexpensive way to retrieve the dimensions (number of rows and columns) of a DataFrame.

#### Mechanism

- **Step 1: Create or Load a DataFrame**
    - First, you need a Pandas DataFrame object. This can be created from scratch or by loading data from a file (e.g., a CSV).
- **Step 2: Access the `.shape` Attribute**
    - Use dot notation to access the `shape` attribute directly on the DataFrame object. Note the absence of parentheses `()`.
- **Step 3: Interpret the Output Tuple**
    - The attribute returns a tuple. The first element is the number of rows, and the second element is the number of columns.

##### Code Translation

```python
import pandas as pd

# --- Step 1: Create a DataFrame ---
data = {'name': ['Bella', 'Charlie', 'Lucy', 'Cooper'],
        'breed': ['Labrador', 'Poodle', 'Chow Chow', 'Schnauzer'],
        'weight_kg': [26, 12, 25, 8]}
dogs = pd.DataFrame(data)

# --- Step 2: Access the .shape Attribute ---
df_shape = dogs.shape

# --- Step 3: Interpret the Output ---
print(f"The DataFrame has {df_shape[0]} rows and {df_shape[1]} columns.")
# Output: The DataFrame has 4 rows and 3 columns.

# You can also print the attribute directly
print(dogs.shape)
# Output: (4, 3)
```

 [[Code - DataFrame.shape Attribute Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **No Parameters**
    - `.shape` is an attribute, which is a property of the object itself, not an action to be performed. Therefore, it does not take any parameters and is called without parentheses.

#### Core Trade-offs

- **Pro: Speed and Simplicity**
    - It is extremely fast because it's just retrieving stored metadata, not calculating anything. It's the simplest way to get the dimensions.
- **Con: Limited Information**
    - `.shape` only tells you the size. It provides no information about the data types of the columns, the number of non-null values, or memory usage. For that, you need to use the `[[Python - DataFrame.info() Method|.info()]]` method.

## Connections

```
                      (Parent)
               Pandas DataFrame
                       ▲
                       │
┌──────────────────────┼──────────────────────┐
│                      │                      │
(Related)      ┌───────────────────────────┐      (Related)
.head()        │ DataFrame.shape Attribute │      .info()
               └───────────────────────────┘
                       │
             ┌─────────┴─────────┐
             │                   │
         (Related)           (Related)
         .columns            .index
```

### Parent Concept

The `.shape` attribute is a core component of a [[Python - Pandas DataFrame|Pandas DataFrame]], providing essential metadata about its structure.

### Child Concepts



### Related Concepts 

- During [[Python - Exploratory Data Analysis with Pandas|exploratory data analysis]], `.shape` is often used in conjunction with `[[Python - DataFrame.head() Method|.head()]]` to get a quick snapshot of a dataset's size and content.
- While `.shape` gives the dimensions, the `[[Python - DataFrame.info() Method|.info()]]` method provides a more detailed summary including data types and memory usage.
- The `.shape` attribute is directly related to the other core [[Python - DataFrame Components|DataFrame components]]; the first value of the tuple corresponds to the length of the `[[Python - DataFrame.index Attribute|.index]]`, and the second value corresponds to the length of the `[[Python - DataFrame.columns Attribute|.columns]]`.
- The underlying data of a DataFrame can be accessed via the `[[Python - DataFrame.values Attribute|.values]]` attribute, which returns a NumPy array that has the exact same shape.
## Questions

- How would you explain the significance of a sudden, unexpected change in a DataFrame's shape to a project manager, and what potential data quality issues might this indicate?
- In a data pipeline that processes millions of rows daily, where would you log the `.shape` of the DataFrame and why is this a critical check for ensuring data integrity throughout the pipeline?
- What if the `.shape` attribute returned three values instead of two for a standard DataFrame? What could that third dimension conceptually represent in the context of tabular data, and how might you need to adapt your analysis tools to handle it?