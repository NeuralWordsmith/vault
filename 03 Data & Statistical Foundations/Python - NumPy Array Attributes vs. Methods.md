---
tags: 
  - comparison
  - python
  - numpy
  - oop
  - array_properties
  - method_vs_function
  - dot_notation
  - concept
source: 
  - "[[Introduction to NumPy]]"
related: 
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - .shape Attribute]]"
  - "[[Python - .flatten() Method]]"
  - "[[Python - .reshape() Method]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Objects]]"
  - "[[Python - Class Attributes]]"
  - "[[Python - 2D NumPy Arrays]]"
  - "[[Python - Multi-dimensional Arrays in NumPy]]"
  - "[[Python - Subsetting NumPy Arrays]]"
  - "[[Python - Functions]]"
  - "[[Python - Array Terminology (Vector, Matrix, Tensor)]]"
  - "[[Python - Array Dimension Indexing]]"
  - "[[Python - Boolean Operators on NumPy Arrays]]"
---
# Comparison: Array Attributes and Methods

## Why This Comparison Matters

> In NumPy, array attributes are the intrinsic properties or characteristics of an array object, like its dimensions or data type, which you access directly. In contrast, array methods are actions or operations that the array object can perform on itself. This distinction highlights an object-oriented approach, where data (the array) and the operations on that data (methods) are bundled together, differing from general NumPy functions that take the array as an external argument.

_Analogy:_ _Think of a car. The car's attributes are its static specifications on a fact sheet: its color is 'red', its `horsepower` is 300, and its `num_doors` is 4. You just look at these properties. The car's methods are actions it can perform on itself: you can call `car.start_engine()` or `car.turn_on_wipers()`. These are built-in capabilities. A general NumPy function is like an external mechanic. The mechanic performs an action *on* the car, like `change_oil(car)` or `rotate_tires(car)`. The car is passed to the mechanic (the function) to be operated on._

**Where it breaks down:** The analogy is strong for the 'property vs. action' and 'internal vs. external' distinction. However, it can be misleading because in programming, both methods (`car.start_engine()`) and functions (`change_oil(car)`) are just code that manipulates the car object's state. A real-world mechanic is a physically separate entity, whereas in code, the distinction is more about syntax and design patterns (Object-Oriented vs. Functional).

## Side-by-Side Comparison

- **Array Methods**
    - Syntax: Called directly on an object instance using dot notation (e.g., `my_array.sum()`).
    - Style: Follows an Object-Oriented Programming (OOP) paradigm.
    - Scope: Bound to the specific array object it's called on.
    - Example: `arr.reshape((3, 2))`
- **NumPy Functions**
    - Syntax: The object is passed as an argument to the function (e.g., `np.sum(my_array)`).
    - Style: Follows a more functional or procedural programming paradigm.
    - Scope: General functions within the NumPy namespace that can operate on various compatible inputs.
    - Example: `np.reshape(arr, (3, 2))`

### Comparison Table

| Feature | Array Methods | NumPy Functions |
| :--- | :--- | :--- |
| **Invocation** | `my_array.method()` | `np.function(my_array)` |
| **Paradigm** | Object-Oriented | Functional / Procedural |
| **Discoverability** | Can be found via tab-completion on an array object. | Must know the function exists in the `np` namespace. |
| **Chaining** | Often more readable for chained operations: `arr.reshape(..).transpose()` | Can be less readable: `np.transpose(np.reshape(arr, ..))` |

## Key Similarities

Both array methods and NumPy functions are used to perform operations and transformations on NumPy arrays. For many common operations, such as `sum`, `reshape`, and `sort`, NumPy provides both a method and a function version that achieve the same result, giving developers flexibility in their coding style.

## Verdict: When to Use Which

The choice is largely stylistic and a matter of convention. Use methods (`arr.sum()`) when you are thinking in an object-oriented way, performing an action that belongs to the array itself. Use functions (`np.sum(arr)`) when you want a more functional style or when the operation is more general and not tightly bound to a single object (e.g., `np.concatenate([arr1, arr2])`, which logically takes multiple objects). For consistency, it's best to pick one style for operations that have both forms.

### Comparative Code Example
```python
import numpy as np

# --- Step 1: Create a NumPy array ---
# This is our base object, a 2x3 array (2 rows, 3 columns).
arr = np.array([[1, 2, 3], [4, 5, 6]])
print(f"Original Array:\n{arr}\n")

# --- Step 2: Access an Attribute ---
# We access the .shape attribute directly. It's a property, not an action.
# This is like checking the car's spec sheet.
array_shape = arr.shape
print(f"Accessed Attribute: arr.shape -> {array_shape}\n")

# --- Step 3: Call a Method ---
# We call the .flatten() method on the array object itself.
# This is an action the array performs on its own data.
flattened_arr = arr.flatten()
print(f"Called Method: arr.flatten() -> {flattened_arr}\n")

# --- Step 4: Use a NumPy Function (for comparison) ---
# We pass the array as an argument to the np.mean() function.
# This is like the mechanic (np.mean) working on the car (arr).
array_mean = np.mean(arr)
print(f"Used NumPy Function: np.mean(arr) -> {array_mean}")
```

## Broader Connections

```
                  (Parent)
           Python - NumPy
                   ▲
                   │
┌──────────────────┼──────────────────┐
│                  │                  │
(Related) ┌──────────────────────────┐ (Related)
OOP       │ Array Attributes & Methods │ NumPy Functions
          └──────────────────────────┘
                   │
         ┌─────────┴─────────┐
         │                   │
(Example Attribute)   (Example Method)
.shape Attribute      .reshape() Method
```

- The [[Python - .shape Attribute|.shape attribute]] is a quintessential example of an array property, providing a tuple of its dimensions.
- In contrast, the [[Python - .reshape() Method|.reshape() method]] and [[Python - .flatten() Method|.flatten() method]] are classic examples of actions an array can perform on itself to change its structure.
- This distinction between data and bundled operations is a fundamental concept of [[Python - Object-Oriented Programming (OOP)|object-oriented programming]].
- Understanding attributes and methods is crucial for effectively indexing and manipulating [[Python - Multi-dimensional Arrays in NumPy|multi-dimensional arrays]].

## Deeper Questions

- A colleague argues for exclusively using NumPy functions over array methods for consistency, even when a method is available. What is the potential performance trade-off of this approach, especially with very large arrays, and how would you argue for or against this coding standard from a readability and maintenance perspective?
- In a data processing pipeline that handles arrays of unpredictable shapes and dimensions, how would you design a robust error-handling wrapper that uses array attributes like `.ndim` and `.shape` to validate an incoming array before applying a series of method-based transformations like `.reshape()` or `.transpose()`?
- What if NumPy was redesigned to eliminate array methods entirely, forcing all operations to be universal functions (ufuncs) or standard functions in the `np` namespace? What would be the biggest advantages and disadvantages of such a 'purely functional' approach to array manipulation?