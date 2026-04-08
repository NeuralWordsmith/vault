---
tags: 
  - core
  - python
  - numpy
  - vector
  - matrix
  - tensor
  - dimensionality
  - concept
source: 
  - "[[Introduction to NumPy]]"
related: 
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - Multi-dimensional Arrays in NumPy]]"
  - "[[Python - .shape Attribute]]"
  - "[[Python - .reshape() Method]]"
  - "[[Python - .flatten() Method]]"
  - "[[Python - Array Dimension Indexing]]"
  - "[[Python - 2D NumPy Arrays]]"
  - "[[Python - Subsetting NumPy Arrays]]"
  - "[[Fundamental - Deep Learning]]"
  - "[[Python - Pandas DataFrame]]"
  - "[[Python - Data Types]]"
  - "[[Python - Boolean Operators on NumPy Arrays]]"
---
# Core: NumPy Array Terminology

## Summary

>In the world of NumPy, everything is technically an `ndarray`. However, to align with mathematical and scientific conventions, programmers use specific terms based on an array's number of dimensions. A one-dimensional array is called a **vector**, a two-dimensional array is a **matrix**, and an array with three or more dimensions is known as a **tensor**. This vocabulary is crucial for understanding an array's structure, which can be checked using the [[Python - .shape Attribute|.shape]] attribute.

**Why This Matters:** Using the correct terminology (vector, matrix, tensor) provides a precise, shared language between mathematics and programming, which is essential for correctly implementing and understanding algorithms in data science and machine learning.

_Analogy:_ _Think of these array types like organizing a shopping list. A **vector** is a single, simple list of items (e.g., 'milk, eggs, bread'). A **matrix** is a spreadsheet of shopping lists for a week, with days as columns and items as rows. A **tensor** is a binder full of these weekly spreadsheets, perhaps one for each month of the year._

**Where it breaks down:** The analogy implies distinct containers (a piece of paper, a spreadsheet, a binder). In NumPy, they are all the same fundamental object (`ndarray`), just with a different `shape` attribute. You can easily convert one to another using methods like [[Python - .reshape() Method|.reshape()]].

```
Dimensions │ Terminology │ NumPy Shape Example
───────────┼─────────────┼──────────────────────
    1D     │   Vector    │ (5,)
    2D     │   Matrix    │ (3, 4) or (5, 1)
    3D+    │   Tensor    │ (2, 3, 4)
```

## Details

While NumPy's core data structure is the `ndarray`, the terms 'vector', 'matrix', and 'tensor' are borrowed from mathematics to describe the array's dimensionality. This provides a common language, especially in fields like deep learning where 'tensor' is a fundamental concept. Understanding this distinction is key to interpreting documentation, academic papers, and function requirements. The number of dimensions determines which term applies: **one dimension (vector)**, **two dimensions (matrix)**, or **three or more dimensions (tensor)**.

#### Primary Goal

To establish a clear and conventional vocabulary for describing the dimensionality of NumPy arrays, aligning programming practice with mathematical theory.

#### Mechanism

- **Vector (1D Array)**
    - A one-dimensional sequence of elements.
    - In NumPy, this corresponds to an array with a shape like `(n,)`, where `n` is the number of elements. Note the trailing comma.
    - *Example: A list of temperatures for a single day recorded every hour.*
    - A crucial distinction exists between a true 1D vector `(shape: (5,))` and a 2D array that looks like a vector, such as a column vector `(shape: (5, 1))` or a row vector `(shape: (1, 5))`. These are technically matrices.
- **Matrix (2D Array)**
    - A two-dimensional array, organized into rows and columns.
    - Corresponds to an array with a shape like `(n, m)`, where `n` is the number of rows and `m` is the number of columns.
    - *Example: A grayscale image, where each value is a pixel's intensity, organized in a grid.*
- **Tensor (3D+ Array)**
    - An array with three or more dimensions. The term is used broadly in fields like physics and deep learning.
    - Corresponds to an array with a shape like `(d, n, m)`, `(d, h, w, c)`, etc.
    - *Example: A color image, which has height, width, and color channels (e.g., RGB), making it a 3D tensor.*
    - *Example: A batch of color images for training a neural network would be a 4D tensor (batch_size, height, width, channels).*

##### Code Translation

```python
import numpy as np

# --- Vector (1D Array) ---
# A true 1D vector
vector = np.array([1, 2, 3, 4, 5])
print(f"Vector: {vector}")
print(f"Shape: {vector.shape}, Dimensions: {vector.ndim}\n") # Shape is (5,)

# --- Matrix (2D Array) ---
# A 2D matrix
matrix = np.array([[1, 2, 3], [4, 5, 6]])
print(f"Matrix:\n{matrix}")
print(f"Shape: {matrix.shape}, Dimensions: {matrix.ndim}\n") # Shape is (2, 3)

# A 2D column vector (technically a matrix)
column_vector = np.array([[1], [2], [3], [4], [5]])
print(f"Column Vector (Matrix):\n{column_vector}")
print(f"Shape: {column_vector.shape}, Dimensions: {column_vector.ndim}\n") # Shape is (5, 1)

# --- Tensor (3D+ Array) ---
# A 3D tensor (e.g., 2 matrices of 2x3)
tensor = np.array([[[1, 2, 3], [4, 5, 6]], [[7, 8, 9], [10, 11, 12]]])
print(f"Tensor:\n{tensor}")
print(f"Shape: {tensor.shape}, Dimensions: {tensor.ndim}") # Shape is (2, 2, 3)
```

 [[Code - NumPy Array Terminology Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- These are descriptive terms based on an array's intrinsic properties (its number of dimensions), not a process with tunable parameters.

#### Core Trade-offs

- **Clarity vs. Ambiguity**
    - Using these terms provides clarity and aligns code with mathematical concepts. However, it can create ambiguity, especially with 'vectors'. A 1D array `(shape: (N,))` behaves differently in broadcasting than a 2D column `(N, 1)` or row `(1, N)` vector, which can lead to subtle bugs if not handled carefully.
- **Context-Dependence**
    - The term 'tensor' is used very specifically in deep learning frameworks (like TensorFlow, PyTorch) to refer to their primary multi-dimensional data structure, which is analogous to but distinct from a NumPy `ndarray`.

## Connections

```
                           (Parent)
                Multi-dimensional Arrays in NumPy
                              ▲
                              │
┌─────────────────────────────┼─────────────────────────────┐
│                             │                             │
(Property)             ┌───────────────────────────┐          (Action)
.shape Attribute       │ NumPy Array Terminology   │      .reshape() Method
                       └───────────────────────────┘
                              │
                   ┌──────────┴──────────┐
                   │                     │
             (Example)             (Application)
         2D NumPy Arrays         Deep Learning
```

### Parent Concept

This terminology is a way of classifying instances of the core concept of [[Python - Multi-dimensional Arrays in NumPy|multi-dimensional arrays in NumPy]].

### Child Concepts



### Related Concepts 

- The [[Python - .shape Attribute|.shape attribute]] is the primary way to determine whether an array should be referred to as a vector, matrix, or tensor.
- The [[Python - .reshape() Method|.reshape() method]] is a practical tool for converting an array from one type to another, for example, turning a 1D vector into a 2D matrix.
- The concept of a tensor is especially fundamental in [[Fundamental - Deep Learning|deep learning]], where all data, weights, and gradients are represented as tensors.
- A matrix is a direct implementation of a [[Python - 2D NumPy Arrays|2D NumPy array]].
## Questions

- How would you explain the difference between a 1D vector of customer IDs `(shape: (1000,))` and a 2D single-column matrix of the same IDs `(shape: (1000, 1))` to a product manager, and why might this technical distinction be critical for a machine learning pipeline's input requirements?
- In a large-scale data processing pipeline, you discover a function that sometimes returns a 1D array `(N,)` and other times a 2D column vector `(N, 1)`. What kind of silent bugs could this inconsistency introduce in downstream linear algebra operations, and how would you refactor the code to enforce a consistent output shape?
- What if NumPy did not support 1D arrays, and every array had to have at least two dimensions? How would this 'matrix-only' world simplify or complicate linear algebra operations and the rules of broadcasting?