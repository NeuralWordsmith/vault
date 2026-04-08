---
tags:
  - core
  - python
  - matplotlib
  - data_visualization
  - correlation
  - bivariate_analysis
  - pyplot
  - concept
source:
  - "[[Intermediate Python]]"
related:
  - "[[Python - Line Plots with Matplotlib]]"
  - "[[Python - Line Plot vs Scatter Plot]]"
  - "[[Python - Basic Matplotlib Plotting Workflow]]"
  - "[[Python - Matplotlib Pyplot Subpackage]]"
  - "[[Python - Importance of Data Visualization]]"
  - "[[Fundamental - Statistics.md]]"
  - "[[Python - Bar Charts]]"
  - "[[Python - Box Plots]]"
  - "[[ML - Linear Regression]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[Fundamental - Programming]]"
  - "[[Python - Matplotlib Library]]"
  - "[[Python - Histogram]]"
---
# Core: Scatter Plots

## Summary

>A scatter plot is a fundamental type of data visualization that displays individual data points on a two-dimensional graph. Unlike a [[Python - Line Plots with Matplotlib|line plot]], which connects sequential points to show a trend over time, a scatter plot places a marker for each observation at the intersection of its x and y values, without connecting them. This approach is ideal for revealing patterns, clusters, and correlations between two variables.

**Why This Matters:** Scatter plots are the primary tool for visually identifying the relationship, correlation, and distribution between two numerical variables, which is the foundation of predictive modeling.

_Analogy:_ _A scatter plot is like a star chart used by an astronomer. Each star on the chart is a data point, placed according to its coordinates (e.g., its position in the sky). The astronomer doesn't connect the stars with lines; instead, they look at the overall arrangement to find patterns, like constellations (correlations), clusters of stars (data clusters), or isolated stars (outliers)._

The chart shows the relationship between stars' positions. Similarly, a scatter plot shows the relationship between two variables.

*   **Where it breaks down:** A star chart represents physical objects in a real, spatial relationship. In a scatter plot, the axes can represent abstract concepts like 'price' and 'customer satisfaction', where the 'distance' between points is purely numerical, not physical.

```
      Exam Score (%)
        ^
  100 + |               *
      |             *   
   90 + |           *  
      |         *    
   80 + |       *      
      |     *        
   70 + |   *          
      | *            
   60 + |*             
      | *              
   50 + +-----------------------------------> Hours Studied
        0   1   2   3   4   5   6   7   8   9   10
```

## Details

A scatter plot is a data visualization tool used to explore the relationship between two continuous variables. Based on the provided context, creating one in Python's Matplotlib library is a straightforward transition from making a line plot. The key difference is changing the function from `plot()` to `scatter()`. This simple change instructs the program to represent each data entry as a distinct point on the graph, rather than connecting them with a continuous line, which is essential for observing correlations and distributions.

#### Primary Goal

To visually assess the relationship and correlation between two numerical variables by plotting each observation as an individual point.

#### Mechanism

- **Step 1: Import Libraries**
    - Begin by importing the necessary library, which is typically the `pyplot` subpackage from `matplotlib`.
- **Step 2: Prepare Data**
    - Define the two variables you want to compare. These should be sequences of numbers (like lists or arrays) of the same length, one for the x-axis and one for the y-axis.
- **Step 3: Create the Scatter Plot**
    - Use the `plt.scatter()` function, passing the x-axis data as the first argument and the y-axis data as the second.
- **Step 4: Customize and Display**
    - Add labels, a title, and other customizations to make the plot understandable. Finally, call `plt.show()` to display the generated plot.

##### Code Translation

```python
# --- Step 1: Import Libraries ---
import matplotlib.pyplot as plt
import numpy as np

# --- Step 2: Prepare Data ---
# Sample data: relationship between hours studied and exam score
hours_studied = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
exam_score = np.array([55, 60, 62, 75, 78, 85, 90, 88, 95, 98])

# --- Step 3: Create the Scatter Plot ---
# Instead of plt.plot(), we use plt.scatter()
plt.scatter(hours_studied, exam_score)

# --- Step 4: Customize and Display ---
plt.title('Exam Score vs. Hours Studied')
plt.xlabel('Hours Studied')
plt.ylabel('Exam Score (%)')
plt.grid(True)

plt.show()
```

 [[Code - Scatter Plots Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`x`, `y`**
    - The primary inputs representing the data for the horizontal and vertical axes, respectively.
- **`s` (size)**
    - Controls the size of each marker. This can be a single value for all points or an array to vary the size of each point, effectively encoding a third dimension of data.
- **`c` (color)**
    - Controls the color of the markers. Similar to size, this can be a single color or an array of values that are mapped to a colormap, encoding a fourth dimension.
- **`alpha`**
    - A float value between 0 (transparent) and 1 (opaque) that controls the transparency of the points. This is extremely useful for mitigating overplotting in dense datasets.

#### Core Trade-offs

- **Pro: Reveals Relationships**
    - Excellent at showing the correlation (positive, negative, or none), clustering, and presence of outliers between two variables at a glance.
- **Pro: Handles Non-Sequential Data**
    - Unlike line plots, the order of data points doesn't matter, making it suitable for datasets where there is no inherent sequence, such as comparing height and weight.
- **Con: Overplotting**
    - With very large datasets, points can overlap heavily, obscuring the true distribution of the data. This can be partially managed with the `alpha` parameter or by using alternative plots like hexbin or density plots.
- **Con: Correlation vs. Causation**
    - A scatter plot can strongly suggest a correlation, but it cannot prove causation. It's easy for viewers to mistakenly assume that one variable causes the other, which is a common statistical fallacy.

## Connections

```
                      (Parent)
           Basic Matplotlib Plotting Workflow
                         ▲
                         │
         ┌───────────────┼────────────────┐
         │               │                │
(Tool)   │      ┌──────────────────┐      │      (Contrast)
Matplotlib Pyplot │  Scatter Plots   │      │   Line Plots
         │      └──────────────────┘      │
         │                                │
         └────────────────────────────────┘
                         │
                         │
                    (Comparison)
               Line Plot vs Scatter Plot
```

### Parent Concept

A scatter plot is a specific visualization created as part of the [[Python - Basic Matplotlib Plotting Workflow|basic Matplotlib plotting workflow]].

### Related Concepts 

- A scatter plot directly contrasts with a [[Python - Line Plots with Matplotlib|line plot]], which connects data points to show trends over a continuous interval.
- The explicit differences and use-cases are detailed in the comparison of a [[Python - Line Plot vs Scatter Plot|line plot vs. a scatter plot]].
- It is created using functions from the [[Python - Matplotlib Pyplot Subpackage|Matplotlib Pyplot subpackage]], the primary interface for plotting.
- The creation of any plot is motivated by the [[Python - Importance of Data Visualization|importance of data visualization]] in understanding data.
- Scatter plots are a foundational tool in [[10 Utility Notes/Fundamental - Statistics.md|statistics]] for performing exploratory data analysis.
## Questions

- You need to explain the relationship between marketing spend and new user sign-ups to a non-technical executive. How would you use a scatter plot to present this, and what specific visual cues (like trend lines or annotations) would you add to prevent the common misinterpretation of correlation as causation?
- Your dataset contains 50 million data points representing user locations. Attempting to create a standard scatter plot with `matplotlib.pyplot.scatter` causes your system to run out of memory. How would you redesign your visualization approach to handle this scale while still revealing the underlying geographic density patterns?
- What if you were tasked with visualizing the relationship between *three* continuous variables, but you were strictly forbidden from using a 3D plot due to its perceptual ambiguity? How could you creatively use the parameters of a 2D scatter plot (e.g., size, color, shape) to effectively encode the third variable?