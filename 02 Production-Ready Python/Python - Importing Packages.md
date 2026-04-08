---
tags: 
  - major_core
  - python
  - import
  - namespace
  - module
  - library
  - dependency
  - concept
source: 
  - "[[Introduction to Python]]"
related: 
  - "[[Python - Packages]]"
  - "[[Python - Modules]]"
  - "[[Python - Installing Packages with pip]]"
  - "[[Python - Standard Import Statement]]"
  - "[[Python - Importing with an Alias]]"
  - "[[Python - Importing Specific Functions (from...import)]]"
  - "[[Python - Standard Import vs from...import]]"
  - "[[Python - Rationale for Packages]]"
  - "[[Python - Common Data Science Packages]]"
  - "[[Fundamental - Programming]]"
  - "[[Python - Virtual Environments]]"
  - "[[Python - Namespaces]]"
  - "[[Fundamental - Software Engineering]]"
---
# Major Core: Using an Installed Package

## Summary

> Once a package is installed on your system using a tool like pip, it's available for use. However, to access its functions, classes, or variables within a specific Python script, you must explicitly bring it into that script's memory. This action is performed using an `import` statement, which acts as a declaration that your code will be using functionality from that external library.

**Why This Matters:** This is the essential bridge between having a powerful tool (a package) and actually applying it to solve problems in your code, making reusable code a practical reality.

_Analogy:_ _Think of your Python environment as a massive public library. Using `pip install` is like getting a library card—it grants you access to every book in the entire system. However, just having the card doesn't mean you can read a book. To actually use a specific book (a package), you must go to the front desk and formally check it out with an `import` statement. This brings the book to your personal desk (your script's memory), where you can open it and use its contents (functions and classes)._

*   **Where it breaks down:** Unlike checking out a physical book, importing a package in Python doesn't remove it from the 'library'. It simply makes a copy of its functionality available to your script. The original package remains installed and available for any other script to 'check out' simultaneously.

```
External Environment        Your Python Script (`my_script.py`)
+---------------------+     +-----------------------------------------+
|                     |     |                                         |
|  numpy/             |     | # Step 3: Import the package            |
|  pandas/            |     | import numpy as np                      |
|  scikit-learn/      |     |                                         |
|  ... (all installed | --► | # Step 4: Use the functionality         |
|      packages)      |     | my_list = [1, 2, 3]                     |
|                     |     | result = np.sum(my_list)                |
|                     |     | print(result)                           |
+---------------------+     +-----------------------------------------+
```

## Details

After successfully [[Python - Installing Packages with pip|installing a package]], it resides on your computer's file system, but your individual Python scripts are unaware of it by default. The `import` statement is the crucial second step that makes this installed code accessible. It tells the Python interpreter to find the specified [[Python - Packages|package]] or [[Python - Modules|module]] and load it into the current session's memory, a space known as the script's namespace. This makes it possible to call its functions and use its tools. There are several ways to do this, including a **standard import**, an **import with an alias**, and importing **specific functions**.

#### Primary Goal

To load an external package or module into the current script's memory, making its functionality available for use.

#### Mechanism

- **Step 1: Install the Package (Prerequisite)**
    - Before you can use a package, it must be installed in your Python environment. This is typically done once per project or environment using a command like `pip install numpy`.
- **Step 2: Create a Python Script**
    - Open a new file with a `.py` extension (e.g., `my_script.py`).
- **Step 3: Import the Package**
    - At the top of your script, write the `import` statement. It's convention to place all imports at the beginning of the file. Here, we use an alias `np` for convenience, a common practice covered in [[Python - Importing with an Alias|importing with an alias]].
- **Step 4: Use the Package's Functionality**
    - Now you can call functions or access classes from the package using the name you imported it with (e.g., `np`).

```python
# my_script.py

# --- Step 3: Import the Package ---
# We import the numpy package and give it the alias 'np' to make it shorter to type.
import numpy as np

# --- Step 4: Use the Package's Functionality ---
# Now we can use functions from numpy by prefixing them with 'np.'
my_array = np.array([1, 2, 3, 4, 5])

mean_value = np.mean(my_array)

print(f"The array is: {my_array}")
print(f"The mean of the array is: {mean_value}")

# Expected Output:
# The array is: [1 2 3 4 5]
# The mean of the array is: 3.0
```

 [[Code - Using an Installed Package Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Import Method**
    - The primary 'lever' is choosing *how* you import the package, which affects code readability and potential for naming conflicts.
    - **[[Python - Standard Import Statement|Standard Import]] (`import package`):** Brings the entire package into your script under its original name. Access functions with `package.function()`.
    - **[[Python - Importing with an Alias|Aliased Import]] (`import package as p`):** Same as a standard import, but gives the package a shorter, more convenient name.
    - **[[Python - Importing Specific Functions (from...import)|Specific Import]] (`from package import function`):** Brings only a specific function or class into your script's main namespace. You can call it directly without the package prefix (`function()`).

#### Core Trade-offs

- **Clarity vs. Brevity**
    - Standard (`numpy.mean()`) and aliased (`np.mean()`) imports are very clear about where a function comes from. Specific imports (`from numpy import mean`) are shorter to type but can make it harder to trace the origin of a function in large scripts.
- **Namespace Pollution**
    - Importing specific functions (or worse, everything with `from package import *`) adds names directly to your script's global namespace. This increases the risk of accidentally overwriting a function or variable with the same name from another library or your own code. This is a key consideration discussed in [[Python - Standard Import vs from...import|the comparison of import methods]].
- **Memory and Performance (Minor)**
    - While importing a specific function might seem more efficient, Python often loads the entire module in the background anyway. The primary trade-off is about code organization and readability, not performance, for most applications.

## Connections

```
                  (Parent)
          Fundamental - Programming
                     ▲
                     │
┌────────────────────┼────────────────────┐
│                    │                    │
(Prerequisite) ┌───────────────────────────┐ (Component)
Installing     │ Using an Installed Package│   Packages
Packages       └───────────────────────────┘
                           │
             ┌─────────────┴─────────────┐
             │             │             │
      Standard Import   Importing    Importing Specific
                        with Alias       Functions
```

### Parent Concept

The process of using a package is a core concept in modern [[Fundamental - Programming|programming]], enabling code reuse and modularity.

### Child Concepts

- A key method is the [[Python - Standard Import Statement|standard import]], which brings the entire module into the script under its own name.
- For convenience, programmers often use [[Python - Importing with an Alias|aliased imports]] to assign a shorter nickname to a package.
- To avoid prefixing, one can use [[Python - Importing Specific Functions (from...import)|specific function imports]], which bring a named tool directly into the local namespace.

### Related Concepts 

- This entire process is predicated on first [[Python - Installing Packages with pip|installing a package]] into your environment.
- The fundamental unit being imported is typically a [[Python - Packages|package]], which is a collection of modules.
- A package itself is composed of one or more [[Python - Modules|modules]], which are the individual `.py` files containing the functions and classes.
## Questions

- Imagine you're joining a team with a large, legacy codebase where many scripts use `from numpy import *`. What are the immediate risks to code stability, and what is your step-by-step plan to refactor this to improve maintainability without breaking the existing code?
- If you have two different projects on your machine that require conflicting versions of the same package (e.g., Project A needs pandas 1.5 and Project B needs pandas 2.1), how do you design an environment that allows both projects to run correctly without interfering with each other? What tools would you use?
- What if Python's `import` statement was incredibly slow, taking several seconds to load a large package like pandas. How would this fundamental change alter the way you structure applications and organize your code to ensure a good user experience?
