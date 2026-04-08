---
tags: 
  - process
  - python
  - matplotlib
  - scatter_plot
  - data_visualization
  - exploratory_data_analysis
  - outlier_detection
  - concept
source: 
  - "[[Cleaning Data in Python]]"
related: 
  - "[[Python - Matplotlib]]"
  - "[[Python - Data Uniformity]]"
  - "[[Python - Standardizing Temperature Units]]"
  - "[[Python - Using Assert Statements for Data Validation]]"
  - "[[NumPy - Exploratory Data Analysis with NumPy]]"
  - "[[Python - Pandas]]"
  - "[[Python - Importing Packages]]"
  - "[[Fundamental - Statistics]]"
  - "[[Python - Lists]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Functions]]"
  - "[[Python - Data Types]]"
  - "[[Python - Inconsistent Date Formats]]"
  - "[[Python - Standardizing Dates with pandas.to_datetime]]"
---
# Process: Visualizing Data with Scatter Plots

**Why This Matters:** Visually plotting data with scatter plots allows for the immediate identification of outliers and anomalies that might be missed by purely statistical methods, preventing skewed analysis and faulty model training.
## Goal & Analogy

> **Goal:** A scatter plot is a fundamental data visualization tool used to display values for two numerical variables as a collection of points. Each point's position on the horizontal (x-axis) and vertical (y-axis) axis indicates its values. It's a primary method in exploratory data analysis for visually inspecting the relationship between variables and identifying patterns, clusters, or outliers, which is a crucial first step before tasks like [[Python - Data Uniformity|ensuring data uniformity]].

_Analogy:_ _A scatter plot is like a detective's evidence board. The detective pins photos (data points) of suspects onto a large corkboard. The board's horizontal axis might represent the 'time of the alibi,' and the vertical axis could be the 'distance from the crime scene.' Most photos cluster in a reasonable area, but one photo pinned far away from the others—a suspect with a weak alibi who was very close to the scene—immediately draws the eye._

{
  "The Evidence Board": "The plot's canvas (the `matplotlib` figure).",
  "The Axes (Time/Distance)": "The x and y variables in your dataset (e.g., 'Date' and 'Temperature').",
  "The Pinned Photos": "The individual data points (rows in the DataFrame).",
  "The Outlying Photo": "The outlier data point that deviates significantly from the main cluster.",
  "Where it breaks down": "A detective's board often implies causal links or a narrative, whereas a scatter plot only shows correlation or distribution. It doesn't inherently explain *why* an outlier exists, only that it does."
}

```
    Temperature |
           70 +                 *  <-- Outlier (e.g., 62.6)
              |
           20 +   * *
           15 + *  *
           10 + * 
            0 +-------------------->
                 Date
```

## The Step-by-Step Process

### Prerequisites / Inputs

- **`x`, `y`**: The column names (as strings) or array-like data sequences to be plotted on the horizontal and vertical axes, respectively. These are the only required parameters.
- **`data`**: An optional parameter specifying the data source (like a pandas DataFrame) from which to pull the `x` and `y` columns. This allows you to use column names as strings for `x` and `y`.
- **`c` (color)**: Controls the color of the markers. It can be a single color string (e.g., `'red'`) or a sequence of colors to color each point individually.
- **`s` (size)**: Controls the marker size. It can be a single number for a uniform size or an array to vary the size of each point, effectively adding a third dimension to the plot.
- **`alpha`**: A float between 0 (transparent) and 1 (opaque) that controls the transparency of the markers. This is very useful for mitigating overplotting in datasets with many points.

### The Steps

- **Step 1: Import the Library**
    - Before any plotting can occur, you must import the `matplotlib.pyplot` module, typically using the standard alias `plt` for brevity.
- **Step 2: Create the Scatter Plot**
    - Call the `plt.scatter()` function. At a minimum, you need to provide the data for the x-axis and y-axis. It's common practice to also pass the entire DataFrame to the `data` parameter and refer to the columns by their string names for `x` and `y`.
- **Step 3: Add Contextual Labels**
    - A plot without labels is ambiguous. Use helper functions like `plt.title()`, `plt.xlabel()`, and `plt.ylabel()` to add a main title and axis labels, making the plot understandable to others (and your future self).
- **Step 4: Display the Plot**
    - Finally, call `plt.show()` to render and display the plot in your environment (e.g., a Jupyter notebook or a separate window).

##### Code Translation

```python
# Assume 'temperatures' is a pandas DataFrame with 'Date' and 'Temperature' columns
# temperatures = pd.read_csv('temperature.csv')

# --- Step 1: Import the Library ---
import matplotlib.pyplot as plt

# --- Step 2: Create the Scatter Plot ---
# We specify which columns to use for the x and y axes and the data source.
plt.scatter(x = 'Date', y = 'Temperature', data = temperatures)

# --- Step 3: Add Contextual Labels ---
plt.title('Temperature in Celsius March 2019 - NYC')
plt.xlabel('Dates')
plt.ylabel('Temperature in Celsius')

# --- Step 4: Display the Plot ---
plt.show()
```

### Deliverables / Outputs

After identifying potential issues in our data, like a strange temperature value, we need to confirm their presence visually. A scatter plot is the perfect tool for this. Using Python's `matplotlib.pyplot` library, we can create a simple two-dimensional graph where each data point is represented by a dot. This visual representation makes it incredibly easy to spot values that don't fit the general pattern, providing a clear, intuitive confirmation of data quality problems before we proceed with cleaning steps like [[Python - Standardizing Temperature Units|standardizing units]].

## Context & Tradeoffs

### When to Use This Process

To visually represent the relationship between two numerical variables, making it easy to identify patterns, trends, correlations, and especially outliers at a glance.

### Common Pitfalls & Tradeoffs

- **Pro: Intuitive and Fast**
    - Scatter plots are one of the most straightforward ways to visualize relationships. They make it easy to spot correlations, clusters, and especially outliers with a quick glance.
- **Con: Overplotting**
    - In large datasets, many data points can be plotted on top of each other, obscuring the true density and distribution of the data. This can be partially addressed using the `alpha` parameter for transparency or by using alternative plots like hexbin plots.
- **Con: Limited Dimensionality**
    - A standard scatter plot is limited to two variables (x and y). While color and size can be used to encode additional dimensions, this becomes visually complex and hard to interpret beyond four dimensions.

## Connections

```
                      (Parent)
                 Data Visualization
                         ▲
                         │
         ┌───────────────┼────────────────┐
         │               │                │
(Used For)      ┌───────────────────────────┐   (Alternative)
Data Cleaning   │  Visualizing with Scatter │   Box Plot
                │           Plots           │
                └───────────────────────────┘
                         │
                         │
                  (Library Used)
                         │
                     Matplotlib
```


- This visualization technique is a critical first step in [[Python - Data Uniformity|achieving data uniformity]], as it helps spot inconsistent values that need correction.
- After identifying an outlier with a scatter plot, one might implement an [[Python - Using Assert Statements for Data Validation|assert statement]] to programmatically check for and handle such anomalies in a data pipeline.
- A scatter plot is particularly useful for visualizing time-series data where you might have [[Python - Inconsistent Date Formats|inconsistent date formats]] that must be standardized before plotting can be effective.

## Deeper Questions

- You've used a scatter plot to identify a cluster of high-value transactions that look like outliers. Your model's performance improves if you remove them, but the business team suspects they are legitimate VIP customers. How do you decide whether to keep or remove these points, and how would you explain the business risk of either choice to stakeholders?
- Imagine you need to generate scatter plots for 100 different variable pairs in a massive, terabyte-scale dataset for a daily report. The standard `matplotlib` approach is too slow. How would you re-architect this visualization pipeline for performance and scalability, and what tools might you use instead?
- What if you could only use a one-dimensional visualization (like a histogram or a density plot) to find outliers in a two-variable dataset? What statistical techniques would you have to rely on to replicate the intuitive insight you get from a 2D scatter plot?