---
tags: 
  - core
  - python
  - scatter_plot
  - data_visualization
  - pandas
  - correlation
  - matplotlib
  - concept
source: 
  - "[[Data Manipulation with pandas]]"
related: 
  - "[[Python - Data Visualization with Pandas]]"
  - "[[Python - Pandas Plotting with Matplotlib]]"
  - "[[Python - Histograms]]"
  - "[[Python - Bar Plots]]"
  - "[[Python - Line Plots]]"
  - "[[Python - Layering Plots]]"
  - "[[Python - Adding Titles to Plots]]"
  - "[[Python - Rotating Plot Labels]]"
  - "[[Python - Adding Legends to Plots]]"
  - "[[Python - Adjusting Plot Transparency (Alpha)]]"
  - "[[Python - Pandas DataFrame]]"
  - "[[Fundamental - Statistics]]"
  - "[[Python - Matplotlib Library]]"
  - "[[NumPy - Exploratory Data Analysis with NumPy]]"
---
# Core: Scatter Plots

## Summary

>A scatter plot is a fundamental data visualization tool used to display values for two numeric variables as a collection of points. Each point's position on the horizontal (x-axis) and vertical (y-axis) axes corresponds to the values of the two variables for a single data record. It's an essential first step in understanding potential correlations, trends, or clusters in data. Unlike a [[Python - Histograms|histogram]] which shows the distribution of a single variable, a scatter plot explicitly explores the interaction between two.

**Why This Matters:** Scatter plots provide the quickest and most intuitive way to visually identify the nature and strength of a relationship between two numerical variables, revealing patterns that summary statistics might hide.

_Analogy:_ _A scatter plot is like a star chart of a small section of the night sky. Each star is a data point, and its position is determined by two coordinates (right ascension and declination, similar to our x and y variables). By looking at the chart, an astronomer can quickly see if stars cluster together in a galaxy (a strong correlation), form a straight line (a linear relationship), or are just randomly distributed across the sky (no relationship)._

Each star represents a single data point (e.g., one dog).
- The star's horizontal position (Right Ascension) corresponds to the value of the first variable (e.g., dog's height).
- The star's vertical position (Declination) corresponds to the value of the second variable (e.g., dog's weight).
- A constellation or galaxy signifies a pattern or correlation in the data.
- **Where it breaks down:** A star chart is a static map of physical objects. A scatter plot represents abstract data, and unlike stars, data points can overlap perfectly (overplotting), which can hide the true density of observations in a region.

```
      |
    y |           *
    - |         * 
    a |       * * 
    x |   *       
    i | *   *     
    s |
      +------------------
            x-axis
```

## Details

Scatter plots are a cornerstone of exploratory data analysis, offering a direct visual representation of the relationship between two numeric variables. In Python's Pandas library, creating one is straightforward using the `.plot()` method. As shown with the dog data, we can map `height_cm` to the x-axis and `weight_kg` to the y-axis by setting `kind="scatter"`. This immediately reveals if taller dogs tend to be heavier, if there are distinct groups, or if any dogs are unusual outliers. This contrasts with other plot types like [[Python - Bar Plots|bar plots]], which are better for comparing quantities across categories, or [[Python - Line Plots|line plots]], which excel at showing trends over a continuous interval like time.

#### Primary Goal

To visually inspect the relationship between two continuous variables to identify correlation, patterns, clusters, and outliers.

#### Mechanism

- **Step 1: Prepare the Data**
    - Ensure you have a Pandas DataFrame with at least two numeric columns you want to compare.
- **Step 2: Call the Plot Method**
    - Use the `.plot()` method on your DataFrame object.
- **Step 3: Specify Parameters**
    - Set the `x` and `y` parameters to the column names you want on the horizontal and vertical axes, respectively. Crucially, set the `kind` parameter to `"scatter"`.
- **Step 4: Display the Plot**
    - Call `plt.show()` from the Matplotlib library (which Pandas uses under the hood) to render and display the visualization.

##### Code Translation

```python
import pandas as pd
import matplotlib.pyplot as plt

# --- Step 1: Prepare the Data ---
# Create a sample DataFrame similar to the context
data = {
    'height_cm': [58, 62, 65, 55, 70, 68, 20, 18, 22, 19, 50, 52],
    'weight_kg': [25, 30, 35, 22, 80, 65, 8, 5, 10, 6, 20, 21]
}
dog_pack = pd.DataFrame(data)

# --- Step 2 & 3: Call the Plot Method and Specify Parameters ---
# Plot height vs. weight using a scatter plot
dog_pack.plot(x="height_cm", y="weight_kg", kind="scatter")

# --- Step 4: Display the Plot ---
# Add titles and labels for clarity (good practice)
plt.title("Dog Height vs. Weight")
plt.xlabel("Height (cm)")
plt.ylabel("Weight (kg)")
plt.show()
```

 [[Code - Scatter Plots Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`x` and `y`**: The names of the columns in the DataFrame to be plotted on the horizontal and vertical axes.
- **`kind`**: A string specifying the type of plot. For a scatter plot, this must be `"scatter"`.
- **`alpha`**: A float between 0.0 (transparent) and 1.0 (opaque). This is useful for [[Python - Adjusting Plot Transparency (Alpha)|adjusting transparency]] to mitigate overplotting in dense datasets.
- **`c`**: Specifies the color of the points. It can be a single color name or a column name to color points based on the value of another variable.
- **`s`**: Specifies the size of the points. It can be a single value or a column name to size points based on a third variable.

#### Core Trade-offs

- **Overplotting**
    - With large datasets, points can be plotted on top of each other, obscuring the true density of the data. Using transparency (`alpha`) or smaller markers can help, but it remains a challenge.
- **Correlation vs. Causation**
    - A scatter plot can reveal a strong correlation (e.g., as x increases, y increases), but it cannot prove that one variable causes the change in the other.
- **Limited to Two Dimensions**
    - A standard scatter plot can only show the relationship between two variables. While color and size can add dimensions, the primary visual relationship is 2D, potentially hiding more complex interactions involving other variables (an issue known as Simpson's paradox).

## Connections

```
                                (Parent)
                   Data Visualization with Pandas
                                  ▲
                                  │
    ┌─────────────────────────────┼─────────────────────────────┐
    │                             │                             │
(For 1 Variable)      ┌───────────────────────────┐      (For Categorical Data)
   Histogram          │       Scatter Plots       │          Bar Plots
                      └───────────────────────────┘
                                  │
                                  │
                      (For Time Series Data)
                             Line Plots
```

### Parent Concept

This concept is a specific implementation within the broader topic of [[Python - Data Visualization with Pandas|data visualization using the Pandas library]].

### Child Concepts



### Related Concepts 

- It directly contrasts with a [[Python - Histograms|histogram]], which is used to understand the distribution of a single numeric variable.
- It is often used as a precursor to fitting a [[Python - Line Plots|line plot]] for regression analysis, which aims to model the relationship discovered in the scatter plot.
- The underlying rendering is handled by [[Python - Pandas Plotting with Matplotlib|Matplotlib]], which allows for further customization like [[Python - Adding Titles to Plots|adding titles]] and [[Python - Adding Legends to Plots|legends]].
- For visualizing categorical data, a [[Python - Bar Plots|bar plot]] is a more appropriate choice.
## Questions

- You're creating a dashboard for the marketing team showing advertising spend vs. new user sign-ups. The scatter plot is a dense, unreadable blob due to high data volume. How would you adjust the visualization to make it useful, and what is the business trade-off of your chosen method (e.g., sampling vs. using transparency)?
- Imagine you need to build a live monitoring system that displays a scatter plot of server latency vs. CPU load, updated every second. What are the primary technical challenges in making this visualization performant and scalable, and how would you architect the data pipeline from the server to the browser?
- What if the relationship between your two variables was fundamentally 3-dimensional (e.g., height, weight, and age)? How would you attempt to represent this relationship visually, and what are the inherent limitations of trying to project three dimensions onto a two-dimensional screen?