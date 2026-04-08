---
tags: 
  - core
  - python
  - matplotlib
  - legend
  - plot annotation
  - data visualization
  - pyplot
  - concept
source: 
  - "[[Data Manipulation with pandas]]"
related: 
  - "[[Python - Plot Customization in Matplotlib]]"
  - "[[Python - Matplotlib Library]]"
  - "[[Python - Histograms]]"
  - "[[Python - Bar Plots]]"
  - "[[Python - Line Plots]]"
  - "[[Python - Scatter Plots]]"
  - "[[Python - Adding Titles to Plots]]"
  - "[[Python - Rotating Plot Labels]]"
  - "[[Python - Adjusting Plot Transparency (Alpha)]]"
  - "[[Python - Pandas Plotting with Matplotlib]]"
  - "[[Python - Data Visualization with Pandas]]"
  - "[[Fundamental - Statistics]]"
---
# Core: Adding Legends to Plots

## Summary

>When multiple datasets are layered onto a single plot, a legend acts as a key to identify what each color, line style, or marker shape represents. It's a crucial component for creating clear and self-explanatory visualizations, especially when comparing different groups or categories within your data.

**Why This Matters:** Adding a legend is essential for making plots with multiple data series interpretable, preventing misinterpretation by clearly labeling what each visual element represents.

_Analogy:_ _Think of a legend on a plot as the key on a map. A city map might show several different subway lines, each drawn in a different color. Without the key, you just see a tangle of red, blue, and green lines. The key, or legend, is what tells you that the 'Red Line' goes downtown, the 'Blue Line' is the crosstown express, and the 'Green Line' serves the suburbs. It translates the visual encoding (color) into meaningful information (subway route)._

In this analogy, the map is the plot's axes, the different colored subway lines are the different data series (e.g., histograms for male and female dogs), and the map's key is the plot's legend. **Where it breaks down:** A map key often includes a wider variety of symbols (for parks, hospitals, points of interest), whereas a plot legend is typically focused on decoding the data series themselves.

```
    +---------------------------------+
    |         Plot Title              |
    |                                 |
    |    | |                          |
    |  Y | | | |                      |  ┌─────────┐
    |    | | | | |                    |  │ ■ Label 1 │
    |  A | | | | | |                  |  │ ■ Label 2 │
    |  x | | | | | |                  |  └─────────┘
    |  i | | | | | |                  |   (Legend)
    |  s | | | | | |                  |
    |    └-+-+-+-+-+-+-+-+-+-+-+-+-+-+  |
    |           X-Axis                |
    +---------------------------------+
```

## Details

In data visualization with libraries like Matplotlib, you can overlay multiple plots on the same set of axes to compare distributions or trends. For example, you can plot a [[Python - Histograms|histogram]] for one group and then immediately plot another for a second group. When you do this, the plots will overlap. To make sense of this combined visual, you need a legend. A legend provides a guide that maps a label (e.g., 'Male', 'Female') to the visual properties (e.g., color) of each plotted dataset, making the chart readable.

#### Primary Goal

To provide a clear, readable key that identifies the different data series or groups shown on a single plot.

#### Mechanism

- **Step 1: Plot the First Data Series**
    - Generate the first plot. Matplotlib will automatically assign it a color (typically blue).
- **Step 2: Plot Subsequent Data Series**
    - On the same axes, generate the next plot. Matplotlib will assign it the next color in its default cycle (typically orange).
- **Step 3: Add the Legend**
    - Call the `plt.legend()` function, passing it a list of strings. The order of these strings MUST match the order in which the plots were created.
- **Step 4: Display the Plot**
    - Call `plt.show()` to render the final visualization with the layered plots and the corresponding legend.

##### Code Translation

```python
import pandas as pd
import matplotlib.pyplot as plt

# Assume 'dog_pack' is a pandas DataFrame with 'sex' and 'height_cm' columns
data = {'sex': ['F', 'M', 'F', 'M', 'F', 'M', 'F', 'M', 'F', 'M'],
        'height_cm': [25, 55, 22, 60, 30, 65, 28, 58, 32, 62]}
dog_pack = pd.DataFrame(data)

# --- Step 1: Plot the first data series (Female dogs) ---
dog_pack[dog_pack["sex"]=="F"]["height_cm"].hist()

# --- Step 2: Plot the second data series (Male dogs) ---
dog_pack[dog_pack["sex"]=="M"]["height_cm"].hist()

# --- Step 3: Add the Legend ---
# The order of labels ['F', 'M'] corresponds to the order of plotting.
plt.legend(["F", "M"])

# --- Step 4: Display the Plot ---
plt.show()
```

 [[Code - Adding Legends to Plots Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`labels`**: A list of strings to label each plotted data series. The order is critical and must match the plotting order.
- **`loc` (location)**: A string or integer code that specifies where to place the legend on the plot. Common values include `'best'`, `'upper right'`, `'lower left'`, etc. `'best'` allows Matplotlib to automatically find a location with minimal overlap.
- **`title`**: A string that can be used to add a title to the legend box itself, providing additional context.

#### Core Trade-offs

- **Clarity vs. Clutter**: Legends are essential for clarity when comparing a few series. However, with many series (e.g., >10), the legend can become large, cluttered, and difficult to read, potentially detracting from the plot itself.
- **Automatic vs. Manual Placement**: Using `loc='best'` is convenient but can sometimes result in the legend obscuring important data points. Manually specifying a location gives you full control but requires more effort to find the optimal spot.

## Connections

```
                      (Parent)
             Plot Customization in Matplotlib
                           ▲
                           │
           ┌───────────────┼────────────────────────────┐
           │               │                            │
(Adds Context To) ┌───────────────────────────┐ (Adds Context To)
  Line Plots      │   Adding Legends to Plots   │   Scatter Plots
                  └───────────────────────────┘
                             │
                  ┌──────────┴──────────┐
                  │                     │
           (Used With)           (Used With)
      Adding Titles to Plots   Rotating Plot Labels
```

### Parent Concept

This concept is a fundamental technique within [[Python - Plot Customization in Matplotlib]], which covers the various ways to enhance and annotate visualizations.

### Child Concepts



### Related Concepts 

- [[Python - Adding Titles to Plots|Adding a title]] is another essential step, alongside adding a legend, to make a plot fully self-explanatory.
- This technique is frequently applied to [[Python - Histograms|histograms]] to compare the distributions of different groups, as shown in the example.
- For time-series data, legends are critical when overlaying multiple [[Python - Line Plots|line plots]] to track different metrics over time.
- [[Python - Scatter Plots|Scatter plots]] also rely heavily on legends to differentiate between categories of data points.
- Using [[Python - Adjusting Plot Transparency (Alpha)|adjustable transparency]] is a complementary technique that makes overlapping plots, which require legends, easier to interpret.
## Questions

- You're presenting a plot with 15 different product categories to stakeholders. A legend would be unreadably cluttered. How would you redesign the visualization to clearly communicate the performance of each category without using a standard legend, and how would you justify your design choice?
- Imagine an automated dashboard that generates a daily performance plot, but the number of data series (e.g., active marketing campaigns) can vary from 2 to 20. How would you programmatically handle the legend creation and placement to ensure the plot remains readable regardless of the number of series?
- What if you had to convey the information typically found in a legend, but you were forbidden from adding any text-based keys or labels directly onto the plot area? What alternative visual encoding strategies could you use?