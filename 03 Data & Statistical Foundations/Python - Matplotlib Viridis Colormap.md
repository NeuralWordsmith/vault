---
tags: 
  - core
  - python
  - matplotlib
  - colormap
  - data_visualization
  - accessibility
  - colorblindness
  - concept
source: 
  - "[[Introduction to NumPy]]"
related: 
  - "[[Python - Plot Customization in Matplotlib]]"
  - "[[Python - Matplotlib Library]]"
  - "[[Python - Histogram]]"
  - "[[NumPy - Exploratory Data Analysis with NumPy]]"
  - "[[Python - Pandas DataFrame]]"
  - "[[Fundamental - Statistics]]"
  - "[[SWE - Readability]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - NumPy np.split Function]]"
  - "[[Python - NumPy Split-Apply-Stack Workflow]]"
  - "[[Python - np.stack vs np.concatenate]]"
---
# Core: Viridis Colormap

## Summary

>Viridis is the default colormap in Matplotlib, a perceptually uniform color scale designed to be highly readable for people with color vision deficiencies. It maps data values to a sequence of colors from dark purple (for low values) to bright yellow (for high values), ensuring that the visual change in color corresponds directly to the change in data value.

**Why This Matters:** Using the Viridis colormap ensures that data visualizations are accurately interpreted by the widest possible audience, including people with common forms of colorblindness, preventing critical misinterpretations of data.

_Analogy:_ _Think of the Viridis colormap as an accessibility ramp for data visualization. A steep, colorful staircase (like a 'rainbow' colormap) might look impressive, but it can be difficult or impossible for some people to use. An accessibility ramp, however, has a constant, gentle slope that allows everyone, regardless of their mobility, to ascend smoothly and safely. Viridis is that ramp; its smooth, consistent gradient in brightness ensures everyone can perceive the 'slope' of the data correctly._

*   **Data Values** are the different levels of the building.
*   **Colors in the map** are the path to get between levels.
*   **The 'rainbow' colormap** is the flashy staircase, where steps might be uneven or poorly lit, causing people to misjudge the height.
*   **The Viridis colormap** is the accessibility ramp, with a uniform, predictable slope (perceptual uniformity).
*   **People with colorblindness** are like people who use wheelchairs or have difficulty with stairs; the ramp is essential for their access and understanding.
*   **Where it breaks down:** A physical ramp's primary purpose is access, while a colormap's is to both provide access and represent data quantitatively. The analogy doesn't fully capture the risk of misleading interpretations that poor colormaps can introduce, such as creating false boundaries in the data where none exist.

```
Low Value  ──────────────────> High Value

[ Dark Purple ] → [ Blue ] → [ Green ] → [ Bright Yellow ]

(Monotonically Increasing Brightness)
```

## Details

Viridis is Matplotlib's default colormap, designed to address the shortcomings of older, more popular colormaps like 'jet' (the rainbow colormap). Its core principle is perceptual uniformity. This means that a certain step-change in the data value will correspond to the same amount of change in perceived color, regardless of where you are on the scale. This is crucial for accurate data interpretation and is especially beneficial for viewers with colorblindness, as the colormap still works effectively when converted to grayscale.

#### Primary Goal

To provide a visually appealing, scientifically accurate, and accessible way to represent sequential data, ensuring that insights are not distorted by the choice of color.

#### Mechanism

- **How it Works:**
    1.  **Perceptual Uniformity:** Viridis is constructed in a special color space (CIELAB) so that the brightness increases linearly from one end to the other. A 10% increase in data value results in a visually equivalent change in color whether you're at the low end (purple) or the high end (yellow) of the scale.
    2.  **Colorblind Safe:** The specific colors (blue, green, yellow) were chosen because their brightness levels are distinct enough to be differentiated by people with the most common forms of colorblindness (deuteranopia and protanopia).
    3.  **Grayscale Convertible:** Because the brightness is monotonic (always increasing), if you print the visualization in black and white, the data's structure is preserved. Darker shades of gray correspond to lower values, and lighter shades to higher values, just as purple is darker than yellow.

##### Code Translation

```python
import matplotlib.pyplot as plt
import numpy as np

# --- Step 1: Generate sample data ---
# Create a 10x10 grid of random data
data = np.random.rand(10, 10)

# --- Step 2: Create two plots for comparison ---
fig, axs = plt.subplots(1, 2, figsize=(10, 4))

# --- Step 3: Display data with the misleading 'jet' colormap ---
# Note the harsh, non-intuitive color boundaries
im1 = axs[0].imshow(data, cmap='jet')
axs[0].set_title('Misleading Colormap (jet)')
fig.colorbar(im1, ax=axs[0])

# --- Step 4: Display the same data with the 'viridis' colormap ---
# Note the smooth, perceptually uniform transition from dark to light
im2 = axs[1].imshow(data, cmap='viridis')
axs[1].set_title('Accessible Colormap (Viridis)')
fig.colorbar(im2, ax=axs[1])

plt.suptitle('Colormap Comparison')
plt.show()
```

 [[Code - Viridis Colormap Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`cmap` argument:**
    - In most Matplotlib plotting functions (e.g., `imshow`, `scatter`, `pcolormesh`), the colormap is specified using the `cmap` string argument.
    - Example: `plt.scatter(x, y, c=values, cmap='viridis')`
- **Reversing the map:**
    - You can reverse any colormap by appending `_r` to its name. For Viridis, `cmap='viridis_r'` would map high values to purple and low values to yellow.

#### Core Trade-offs

- **Pro: Scientific Accuracy & Accessibility**
    - Viridis prevents the creation of false visual boundaries that rainbow colormaps often introduce, leading to more honest data representation. Its design makes it the gold standard for accessible scientific communication.
- **Con: Less 'Vibrant' than Rainbow Maps**
    - Rainbow colormaps like 'jet' use a wider and more saturated range of colors, which can sometimes feel more visually dramatic or engaging to an untrained eye. However, this vibrancy comes at the cost of perceptual accuracy and accessibility.
- **Pro: Default in Matplotlib**
    - Being the default since version 2.0 encourages good visualization practices without requiring users to actively think about it, improving the quality of scientific plots across the ecosystem.

## Connections

```
                      (Parent)
            Python - Plot Customization in Matplotlib
                         ▲
                         │
           ┌─────────────┼─────────────┐
           │             │             │
(Used In) ┌───────────────────────────┐ (Used In)
Histogram │     Viridis Colormap      │ Matplotlib Library
          └───────────────────────────┘
```

### Parent Concept

The Viridis colormap is a specific tool used for [[Python - Plot Customization in Matplotlib|plot customization in Matplotlib]], falling under the broader topic of effective data visualization.

### Child Concepts



### Related Concepts 

- Viridis is a core feature of the [[Python - Matplotlib Library|Matplotlib library]], serving as its default for many plot types.
- It is frequently used when creating a [[Python - Histogram|histogram]] or heatmap to show the distribution or intensity of data.
- Before data can be visualized with Viridis, it often needs to be processed; a common pattern for this is the [[Python - NumPy Split-Apply-Stack Workflow|Split-Apply-Stack workflow]], which prepares data for analysis and subsequent plotting.
- For instance, one might use [[Python - NumPy np.split Function|np.split]] to segment data into meaningful chunks before applying a function and visualizing the results for each chunk on a shared plot.
## Questions

- When might you intentionally choose a non-perceptually-uniform colormap over Viridis for a business presentation, and what specific data interpretation risks would you be accepting and need to mitigate for your audience?
- Imagine you are tasked with creating a company-wide data visualization style guide. How would you design a system to enforce the use of accessible colormaps like Viridis across all dashboards and reports generated by dozens of analysts using different tools (e.g., Python, R, Tableau)?
- What if you had to design a colormap for a non-human observer, like a computer vision algorithm? Would perceptual uniformity still be the most important principle, or would you optimize for something else, like maximizing the Euclidean distance between adjacent color values in RGB space?