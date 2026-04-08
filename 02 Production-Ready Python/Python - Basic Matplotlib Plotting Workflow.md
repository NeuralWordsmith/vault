---
tags: 
  - process
  - python
  - matplotlib
  - pyplot
  - state_machine
  - rendering
  - visualization_workflow
  - concept
source: 
  - "[[Intermediate Python]]"
related: 
  - "[[Python - Matplotlib Library]]"
  - "[[Python - Matplotlib Pyplot Subpackage]]"
  - "[[Python - Importance of Data Visualization]]"
  - "[[Python - Line Plots with Matplotlib]]"
  - "[[Python - Scatter Plots with Matplotlib]]"
  - "[[Python - Line Plot vs Scatter Plot]]"
  - "[[Fundamental - Programming]]"
  - "[[Python - Data Structures]]"
  - "[[Python - Functions]]"
  - "[[Python - Pandas Library]]"
  - "[[Python - Seaborn Library]]"
  - "[[Data Visualization - Principles]]"
  - "[[Data Visualization - Chart Types]]"
  - "[[Python - Jupyter Notebooks]]"
  - "[[Python - Scripts]]"
---
# Process: Plotting vs. Showing in Matplotlib

**Why This Matters:** This separation allows for building complex, multi-layered visualizations piece by piece before rendering the final image, preventing inefficient, premature displays.
## Goal & Analogy

> **Goal:** In the [[Python - Matplotlib Library|Matplotlib]] library, there is a crucial distinction between defining a plot and displaying it. Functions like `plt.plot()` or `plt.scatter()` act as instructions that add elements to a visualization canvas in the background. However, nothing is displayed to the user until the `plt.show()` function is explicitly called. This 'lazy' approach is a core design principle that enables the creation of detailed, customized plots by adding titles, labels, and multiple data series before the final rendering.

_Analogy:_ _Think of it like preparing a gourmet meal. Calling `plt.plot()` is like adding an ingredient to the pot—chopping the carrots, searing the steak, adding a spice. Each call adds another layer of flavor or texture. Customization functions like `plt.title()` or `plt.xlabel()` are like arranging the food on the plate and adding a garnish. The plot is fully prepared but still in the kitchen. The `plt.show()` command is the final step: the waiter carrying the finished, beautifully arranged dish out to the dining room for the customer to see._

**Where it breaks down:** Unlike a chef who can't easily remove an ingredient once it's mixed in, a programmer can clear the entire plot canvas with a command like `plt.clf()` before calling `plt.show()`, effectively starting the 'meal' over from scratch without any cost.

```
Script Execution Flow:

[ import matplotlib.pyplot as plt ]
              │
              ▼
[   year = [...] ; pop = [...]   ]
              │
              ▼
[ plt.plot(year, pop) ]  <-- (Plot defined in memory, not visible)
              │
              ▼
[ plt.title("...")   ]  <-- (Metadata added in memory)
              │
              ▼
[   plt.show()    ]      <-- (Triggers rendering)
              │
              ▼
(  Plot appears on screen  )
```

## The Step-by-Step Process

### Prerequisites / Inputs

- **Plotting Functions (`plt.plot`, `plt.scatter`, etc.)**
    - These are the primary staging commands. Their parameters (e.g., `color`, `marker`, `linestyle`) define the visual properties of the data series being added to the plot.
- **`plt.show()`**
    - This rendering command has its own parameters. For example, `block=True` (the default) pauses script execution until the plot window is closed, which is useful for scripts but can be changed for interactive applications.

### The Steps

- **Step 1: Import the Library**
    - Begin by importing the `matplotlib.pyplot` subpackage, conventionally aliased as `plt`.
- **Step 2: Prepare the Data**
    - Create the data you want to visualize, typically as lists or NumPy arrays for the x and y axes.
- **Step 3: Stage the Plot Layers**
    - Use a plotting function like `plt.plot()` to tell Matplotlib *what* data to visualize and *how* to style it. This command adds a layer to the internal figure but does not display it.
- **Step 4: Add Customizations (Optional)**
    - Add other ingredients like a title with `plt.title()`, axis labels with `plt.xlabel()` and `plt.ylabel()`, or a legend with `plt.legend()`. Each of these is another staged instruction.
- **Step 5: Render the Final Visualization**
    - Call `plt.show()` to trigger the rendering process. Matplotlib will now take all the staged instructions and display the complete plot in a window.

##### Code Translation

```python
# --- Step 1: Import the Library ---
import matplotlib.pyplot as plt

# --- Step 2: Prepare the Data ---
year = [2010, 2012, 2014, 2016, 2018, 2020]
population = [8.5, 9.1, 9.8, 10.5, 11.2, 11.9]

# --- Step 3: Stage the Plot Layers ---
# This line tells Python WHAT to plot, but doesn't display it yet.
plt.plot(year, population)

# --- Step 4: Add Customizations (Optional) ---
# These are more 'ingredients' added before the final 'show'.
plt.title("City Population Over Time")
plt.xlabel("Year")
plt.ylabel("Population (in millions)")

# --- Step 5: Render the Final Visualization ---
# This is the command that actually displays the plot.
plt.show()
```

### Deliverables / Outputs

The core idea behind separating plotting from showing is Matplotlib's use of a state-based interface, managed by the [[Python - Matplotlib Pyplot Subpackage|pyplot subpackage]]. When you call a function like `plt.plot()`, you are not directly drawing on the screen; you are modifying an internal state that keeps track of the current 'figure' and 'axes' objects. Python waits patiently as you add more layers—data series, labels, titles, annotations. Only when you call `plt.show()` does Matplotlib inspect this complete internal state and render the final, composed visualization. This workflow is fundamental to creating everything from simple [[Python - Line Plots with Matplotlib|line plots]] to intricate, multi-panel figures.

## Context & Tradeoffs

### When to Use This Process

To provide a flexible and efficient workflow for constructing a visualization layer by layer before committing to the final, computationally expensive rendering step.

### Common Pitfalls & Tradeoffs

- **Pro: Flexibility and Control**
    - The separation allows for the programmatic construction of highly complex and layered plots that would be difficult to define in a single command.
- **Con: Initial Confusion for Beginners**
    - Newcomers often expect a plot to appear immediately after calling `plt.plot()`, leading to confusion when their script runs without producing any visual output because they forgot `plt.show()`.
- **Con: Inconsistent Behavior in Interactive Environments**
    - In environments like Jupyter Notebooks, the backend is often configured to automatically call a show-like function at the end of a cell. This can mask the necessity of `plt.show()`, causing issues when the same code is moved to a standard Python script (`.py` file).

## Connections

```
                      (Parent)
              Matplotlib Pyplot Subpackage
                         ▲
                         │
┌────────────────────────┼────────────────────────┐
│                        │                        │
(Used to create) ┌───────────────────────────┐ (Used to create)
Line Plots       │ Plotting vs. Showing      │ Scatter Plots
                 └───────────────────────────┘
```


- This stateful process is central to creating visualizations like [[Python - Line Plots with Matplotlib|line plots]] and [[Python - Scatter Plots with Matplotlib|scatter plots]].
- Understanding this separation is a foundational concept within the broader [[Python - Matplotlib Library|Matplotlib library]].
- The entire workflow is managed by the state machine provided by the [[Python - Matplotlib Pyplot Subpackage|pyplot subpackage]].
- This deliberate separation of staging and rendering underscores the [[Python - Importance of Data Visualization|importance of careful construction in data visualization]].

## Deeper Questions

- Imagine you're building a real-time dashboard for business KPIs. The `plt.show(block=True)` command freezes the script. How would you modify the plotting workflow to create visualizations that update every 5 seconds without halting the entire application, and what's the business implication of a frozen vs. a non-blocking display?
- If you were generating 10,000 plots in a batch process to save them as files for a report, calling `plt.show()` for each would be disastrously slow and consume memory. How would you refactor the standard 'plot then show' workflow for a non-interactive, server-side environment, and what Matplotlib functions would be critical to manage memory effectively?
- What if the `plt.plot()` function immediately rendered the plot and returned a plot object, and every subsequent call like `plt.title()` had to be a method on that object (e.g., `my_plot.add_title(...)`). How would this 'object-oriented' approach change the way you write plotting code, and what advantages or disadvantages might it have over pyplot's current 'state machine' model?