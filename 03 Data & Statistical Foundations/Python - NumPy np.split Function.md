---
tags: 
  - core
  - python
  - array_manipulation
  - splitting
  - data_chunking
  - axis
  - multiple_assignment
  - concept
source: 
  - "[[Introduction to NumPy]]"
related: 
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - 2D NumPy Arrays]]"
  - "[[Python - Indexing NumPy Arrays]]"
  - "[[Python - Subsetting NumPy Arrays]]"
  - "[[Python - Tuple Unpacking 1]]"
  - "[[Python - NumPy np.split Behavior and Constraints]]"
  - "[[Python - np.stack vs np.concatenate]]"
  - "[[Python - NumPy Split-Apply-Stack Workflow]]"
  - "[[Python - NumPy np.stack Function]]"
  - "[[Python - List Comprehensions]]"
  - "[[Python - Functions]]"
  - "[[Python - Data Types]]"
  - "[[Python - Looping Over Data Structures]]"
  - "[[Fundamental - Data Engineering]]"
---
# Core: NumPy np.split Function

## Summary

>The `np.split` function in NumPy is a tool for dividing a single array into multiple, equally-sized sub-arrays along a specified axis. As shown in the context, it's particularly useful for tasks like isolating the red, green, and blue channels from an RGB image array. A key convenience is its ability to work with multiple assignment (a form of [[Python - Tuple Unpacking 1|tuple unpacking]]), allowing for concise and readable code.

**Why This Matters:** This function is essential for deconstructing complex datasets, like separating color channels in an image, which is a foundational step for many feature engineering and data analysis tasks.

_Analogy:_ _Think of `np.split` as a precision deli slicer for a rectangular loaf of multi-layered bread (like a rainbow cake). The loaf is your NumPy array, the number of slices you set on the machine is the number of splits, and the direction you feed the loaf into the slicer (e.g., top-down or side-on) is the axis. The function hands you back a neat stack of perfectly equal slices._

The loaf of bread represents the input NumPy array. The deli slicer is the `np.split` function. The number of slices you want corresponds to the `sections` argument. The orientation of the cut (e.g., slicing vertically through the layers) is the `axis` argument. The resulting individual slices are the new, smaller arrays.

**Where it breaks down:** The analogy falters because `np.split` strictly requires that the loaf can be cut into perfectly equal slices. If you tried to make 3 equal slices from a 10-inch loaf, the function would fail. For unequal slicing, you'd need a different tool (`np.array_split`).

```
Original 3D Array (Shape: 2, 2, 3)
+------------------------------------+
| [[R,G,B], [R,G,B]],                |
|  [[R,G,B], [R,G,B]] ]              |
+------------------------------------+
                 |
                 | np.split(arr, 3, axis=2)
                 V
+----------------+-------------------+----------------+
| Red Channel    | Green Channel     | Blue Channel   |
| (Shape: 2,2,1) | (Shape: 2,2,1)    | (Shape: 2,2,1) |
| [[R],[R]],     | [[G],[G]],        | [[B],[B]],     |
|  [[R],[R]] ]   |  [[G],[G]] ]      |  [[B],[B]] ]   |
+----------------+-------------------+----------------+
```

## Details

In the field of numerical computing with Python, `np.split` provides a straightforward method to partition a large NumPy array into a list of smaller, equally-sized sub-arrays. This is a common operation in data preprocessing and analysis. For instance, when working with image data represented as a 3D array (height, width, color channels), `np.split` can be used to cleanly separate the data along the color channel axis, isolating each color's intensity values into its own array. This function also enhances code clarity by supporting direct unpacking of the resulting arrays into distinct variables.

#### Primary Goal

To divide a single NumPy array into a list of multiple sub-arrays of equal size along a specified dimension.

#### Mechanism

- **Step 1: Prepare the Input Array**
    - First, create or load the NumPy array you intend to split. In this example, we'll create a simplified 3x2x3 array representing a small RGB image.
- **Step 2: Define Split Parameters**
    - Determine the number of equal-sized arrays you want as output and the axis along which the split should occur. For an RGB image, we want 3 arrays (one for each channel) split along the third axis (index 2).
- **Step 3: Execute and Unpack**
    - Call `np.split()` with the array, number of sections, and axis. Use multiple assignment to directly capture the output arrays into named variables, making the code more readable.

##### Code Translation

```python
import numpy as np

# --- Step 1: Prepare the Input Array ---
# Create a sample 3x2x3 array representing a small RGB image
# (3 pixels high, 2 pixels wide, 3 color channels)
rgb_image = np.array([
    [[255, 0, 0], [0, 255, 0]],  # Row 1: Red pixel, Green pixel
    [[0, 0, 255], [255, 255, 0]], # Row 2: Blue pixel, Yellow pixel
    [[0, 0, 0], [255, 255, 255]]  # Row 3: Black pixel, White pixel
])

# --- Step 2: Define Split Parameters ---
# We want to split it into 3 arrays along the color channel axis (axis=2).

# --- Step 3: Execute and Unpack ---
# Use multiple assignment to unpack the results directly
red_channel, green_channel, blue_channel = np.split(rgb_image, 3, axis=2)

print("--- Red Channel ---")
# The shape will be (3, 2, 1) because the third axis is preserved
print(red_channel.squeeze()) # .squeeze() removes the last dimension for clarity

print("\n--- Green Channel ---")
print(green_channel.squeeze())

# Output for Red Channel:
# [[255   0]
#  [  0 255]
#  [  0 255]]
```

 [[Code - NumPy np.split Function Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`ary` (array_like)**
    - The NumPy array that you want to divide.
- **`indices_or_sections` (int or 1-D array)**
    - If an integer `N`, the array is divided into `N` equal-sized sub-arrays. This is the mode used in the example (`3`).
    - If a 1-D array of sorted integers, it specifies the indices at which the splits occur (e.g., `[2, 5]` would split the array at index 2 and index 5).
- **`axis` (int, optional)**
    - The axis along which to perform the split. The default is `0` (the first axis/rows).

#### Core Trade-offs

- **Pro: Simplicity and Readability**
    - For cases requiring equal-sized chunks, `np.split` is highly intuitive. When combined with multiple assignment, it produces clean, self-documenting code.
- **Con: Strict Equality Constraint**
    - The primary limitation, as explored in [[Python - NumPy np.split Behavior and Constraints|its behavior and constraints]], is that it will raise a `ValueError` if the array cannot be divided into the specified number of equal sub-arrays. For unequal divisions, the more flexible `np.array_split` function must be used.

## Connections

```
                      (Parent)
                 NumPy (Numeric Python)
                         ▲
                         │
         ┌───────────────┼────────────────────────────┐
         │               │                            │
(Alternative)   ┌───────────────────────────┐      (Inverse)
np.array_split  │   NumPy np.split Function │      np.concatenate
                └───────────────────────────┘
                         │
                         ▼
                     (Used In)
             Split-Apply-Stack Workflow
```

### Parent Concept

This function is a core array manipulation tool within the [[Python - NumPy (Numeric Python)|NumPy]] library.

### Child Concepts



### Related Concepts 

- The strict requirement for equal-sized outputs is a key topic detailed in [[Python - NumPy np.split Behavior and Constraints|the behavior and constraints of np.split]].
- `np.split` is the inverse operation of functions like `np.concatenate`, which are compared in [[Python - np.stack vs np.concatenate|stack vs. concatenate]].
- This function serves as the first step in the common [[Python - NumPy Split-Apply-Stack Workflow|Split-Apply-Stack workflow]] for parallelizable data processing.
- The use of multiple assignment to capture the output arrays is a direct application of [[Python - Tuple Unpacking 1|tuple unpacking]].
## Questions

- Imagine you're processing satellite imagery where images can have 3 (RGB) or 4 (RGBA) channels. How would you design a pipeline that uses `np.split` to separate channels without breaking when it encounters an image with a different channel count? What's the business risk of a rigid splitting strategy?
- If you were to parallelize a large array computation using `np.split` to create chunks for different processor cores, what potential performance bottleneck could arise from the splitting operation itself, and how might `np.array_split` be a better choice in a scenario with an uneven number of data points?
- What if NumPy had no `split` or `concatenate` functions? How would you replicate the functionality of splitting an RGB image into its R, G, and B channels using only basic NumPy indexing and slicing?