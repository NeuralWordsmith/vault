---
tags: 
  - core
  - python
  - numpy_array
  - data_extraction
  - interoperability
  - dataframe_attribute
  - pandas
  - concept
source: 
  - "[[Data Manipulation with pandas]]"
related: 
  - "[[Python - Pandas DataFrame]]"
  - "[[Python - DataFrame Components]]"
  - "[[Python - DataFrame.index Attribute]]"
  - "[[Python - DataFrame.columns Attribute]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - 2D NumPy Arrays]]"
  - "[[Python - Pandas, NumPy & Matplotlib Relationship]]"
  - "[[Python - DataFrame Indexing and Selection]]"
  - "[[Python - Subsetting 2D NumPy Arrays]]"
  - "[[Python - Data Types]]"
  - "[[Python - DataFrame Data Type Constraints]]"
  - "[[Python - Exploratory Data Analysis with Pandas]]"
  - "[[Python - Vectorized Operations]]"
  - "[[Fundamental - Feature Engineering]]"
---
# Core: DataFrame.values Attribute

## Summary

>The `.values` attribute of a Pandas DataFrame provides direct access to the underlying data, returning it as a 2-dimensional NumPy array. This effectively strips away the row labels ([[Python - DataFrame.index Attribute|index]]) and column labels ([[Python - DataFrame.columns Attribute|columns]]), leaving just the raw, rectangular data grid. This is a crucial step when interfacing with libraries that operate on NumPy arrays.

**Why This Matters:** This attribute is the primary bridge for passing structured Pandas data into machine learning libraries like Scikit-learn, which expect raw numerical NumPy arrays.

_Analogy:_ _Think of a Pandas DataFrame as a fully decorated and framed painting. The painting itself is the data, the ornate frame represents the column labels, and the museum label next to it (with the artist, title, and year) is the index. The `.values` attribute is like carefully removing the painting from its frame and taking it off the wall. You are left with just the raw canvas containing the artwork, ready to be analyzed, scanned, or moved without the bulky, context-specific frame and label._

**Where it breaks down:** The analogy implies the frame and label are just decorative. In Pandas, the index and columns are powerful tools for alignment and analysis. Discarding them with `.values` is a permanent loss of this contextual metadata, which isn't easily reattached once you have the raw canvas (NumPy array).

```
Pandas DataFrame (dogs_df)
+-------+----------+-----------+-----------+
| index | name     | breed     | weight_kg |
+-------+----------+-----------+-----------+
|   0   | 'Bella'  | 'Labrador'|    24     |
|   1   | 'Charlie'| 'Poodle'  |    24     |
|  ...  |   ...    |    ...    |    ...    |
+-------+----------+-----------+-----------+
               |
               | .values
               ▼
NumPy Array (dog_values)
[['Bella' 'Labrador' 24]
 ['Charlie' 'Poodle' 24]
 [ ...       ...     ...]]
```

## Details

The `.values` attribute is a fundamental component of a [[Python - Pandas DataFrame|DataFrame]], serving as the direct gateway to its internal data structure. As the context shows, it extracts the data and presents it as a 2-dimensional [[Python - NumPy (Numeric Python)|NumPy]] array. This is essential because while Pandas provides rich, labeled structures for data manipulation and [[Python - Exploratory Data Analysis with Pandas|exploratory analysis]], many other scientific computing and machine learning libraries are built to work with the raw, efficient, and unlabeled array format of NumPy. Accessing `.values` is the standard way to prepare your data for these downstream tasks.

#### Primary Goal

To extract the raw data from a DataFrame, stripping away the index and column labels, and return it as a NumPy array for use in other libraries.

#### Mechanism

- **Step 1: Start with a DataFrame**
    - Begin with a standard Pandas DataFrame, which contains data along with row and column labels.
- **Step 2: Access the `.values` Attribute**
    - Call the `.values` attribute on the DataFrame object. This is not a method, so no parentheses are needed (e.g., `df.values`).
- **Step 3: Receive a NumPy Array**
    - The operation returns a new object: a 2D NumPy array containing all the data from the DataFrame. The metadata (index and column names) is discarded.

##### Code Translation

```python
import pandas as pd
import numpy as np

# --- Step 1: Start with a DataFrame ---
# Create a sample DataFrame about dogs
data = {
    'name': ['Bella', 'Charlie', 'Lucy', 'Cooper'],
    'breed': ['Labrador', 'Poodle', 'Chow Chow', 'Schnauzer'],
    'weight_kg': [24, 24, 24, 17],
    'height_cm': [56, 43, 46, 49]
}
dogs_df = pd.DataFrame(data)
print("--- Original DataFrame ---")
print(dogs_df)
print("\n")

# --- Step 2: Access the .values Attribute ---
# This extracts the data into a NumPy array
dog_values = dogs_df.values

# --- Step 3: Receive a NumPy Array ---
print("--- Result of .values ---")
print(dog_values)
print(f"\nType of result: {type(dog_values)}")
print(f"Shape of result: {dog_values.shape}")
```

 [[Code - DataFrame.values Attribute Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- The `.values` attribute does not accept any parameters as it is a property of the DataFrame object, not a method.

#### Core Trade-offs

- **Pro: Interoperability**
    - The primary benefit is seamless integration with the vast scientific Python ecosystem (Scikit-learn, TensorFlow, PyTorch, Matplotlib) that is built on [[Python - NumPy (Numeric Python)|NumPy]].
- **Con: Loss of Metadata**
    - Accessing `.values` discards the informative index and column labels. The resulting array is just a grid of data, losing the context of what each row and column represents. This can make the data harder to interpret without referring back to the original DataFrame.
- **Con: Data Type Coercion**
    - If a DataFrame contains columns with multiple data types (e.g., numbers and strings), the resulting NumPy array will have a single, more general `dtype`, often `object`. This can negate the performance benefits of NumPy's specialized numeric types and may require further data cleaning. This is a key aspect of [[Python - DataFrame Data Type Constraints|DataFrame data type constraints]].

## Connections

```
                  (Parent)
           DataFrame Components
                     ▲
                     │
┌────────────────────┼────────────────────┐
│                    │                    │
(Sibling)      ┌───────────────────────────┐      (Sibling)
.columns       │  DataFrame.values Attribute │      .index
               └───────────────────────────┘
                     │
                     ▼
                 (Returns)
                NumPy Array
```

### Parent Concept

The `.values` attribute is one of the three core [[Python - DataFrame Components|components of a DataFrame]], alongside the index and columns.

### Child Concepts



### Related Concepts 

- The `.values` attribute provides the raw data that is often visualized using libraries discussed in [[Python - Pandas, NumPy & Matplotlib Relationship|the relationship between Pandas, NumPy, and Matplotlib]].
- It is the counterpart to the [[Python - DataFrame.columns Attribute|`.columns` attribute]], which holds the column labels that `.values` strips away.
- Similarly, it discards the row labels managed by the [[Python - DataFrame.index Attribute|`.index` attribute]].
- The output of `.values` is a [[Python - 2D NumPy Arrays|2D NumPy array]], which is the fundamental data structure for numerical computation in Python.
## Questions

- You have a DataFrame where one column is a unique customer ID (string) and the rest are numerical features for a churn model. If you call `.values` on the whole DataFrame, the entire resulting NumPy array becomes `dtype=object`, potentially slowing down model training. How would you prepare this data for a Scikit-learn model to maximize performance, and how would you explain the business value of this extra processing step (which takes developer time) to a project manager?
- Imagine a production pipeline that pulls data, processes it in Pandas, and then passes `df.values` to a model for inference. What kind of automated check would you implement *before* the `.values` call to ensure the data schema hasn't unexpectedly changed upstream (e.g., a column was dropped or renamed), preventing the model from receiving data in the wrong shape and making incorrect predictions?
- What if the `.values` attribute was deprecated and you were forbidden from using it? How would you efficiently convert a Pandas DataFrame into a NumPy array for a machine learning model using only other Pandas or NumPy functions, and what might be the subtle differences or advantages of your alternative approach?