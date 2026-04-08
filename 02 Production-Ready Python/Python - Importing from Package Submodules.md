---
tags: 
  - core
  - python
  - dot_notation
  - submodule_import
  - namespace
  - package_access
  - attribute_access
  - concept
source: 
  - "[[Software Engineering Principles in Python]]"
related: 
  - "[[Python - Packages]]"
  - "[[Python - Package Submodules]]"
  - "[[Python - Importing Packages]]"
  - "[[Python - Package Structure and Functionality]]"
  - "[[Python - Exposing Package Functionality with __init__.py]]"
  - "[[Python - Relative Imports in Packages]]"
  - "[[Python - Subpackages]]"
  - "[[Python - Scope]]"
  - "[[Python - User-Defined Functions]]"
  - "[[Python - Modules]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[SWE - Do One Thing Principle]]"
  - "[[Python - Package Organization Strategy]]"
  - "[[Python - Adding Functionality to a Package Process]]"
---
# Core: Accessing Submodule Functions

## Summary

>Functions within a [[Python - Package Submodules|submodule]] are accessed using a hierarchical dot notation syntax: `package_name.submodule_name.function_name`. This acts like a precise address, guiding Python to the exact function you want to call within the overall [[Python - Package Structure and Functionality|package structure]].

**Why This Matters:** This dot notation syntax is the fundamental mechanism for using organized, modular code, allowing developers to access specific tools within a large library without causing naming conflicts.

_Analogy:_ _Think of a large public library as your Python package (`my_package`). The library is organized into different sections, like 'Science Fiction' or 'History'. These sections are the submodules (`utils`). To find a specific book, you don't just look for its title; you go to the correct section first and then find the book on the shelf. The dot notation `my_package.utils.we_need_to_talk` is like the librarian's instruction: 'Go to the My Package library, find the Utilities section, and get the book titled We Need to Talk.'_

**Where it breaks down:** In a real library, you can take the book off the shelf and carry it around. While you can 'import' a function directly to give it a shorter name, the original function still resides in its submodule. The dot notation is more like a permanent address card than a physical object you move.

```
work_dir/
└── my_script.py  (Imports and calls the function)
     │
     │ import my_package.utils
     │ my_package.utils.we_need_to_talk()
     ▼
my_package/       (Package)
├── __init__.py
└── utils.py      (Submodule)
    └── we_need_to_talk() (Function)
```

## Details

The core idea is to use a chain of names separated by dots to navigate the hierarchy of a Python package. This syntax provides a clear, unambiguous path from the top-level package down to a specific function nested within a submodule. This structured approach, which relies on a clear [[Python - Package Structure and Functionality|package structure]], is essential for managing complexity in large codebases and preventing naming conflicts. For example, as shown in the context, to call the `we_need_to_talk` function, we must specify its full path: `my_package.utils.we_need_to_talk`.

#### Primary Goal

To provide a clear, explicit, and hierarchical path for accessing functions and other objects within a package's namespace, ensuring code is readable and maintainable.

#### Mechanism

- **Step 1: Define the Function in a Submodule**
    - First, a function is defined and saved in a `.py` file. This file acts as a submodule within the package directory. For instance, the function `we_need_to_talk` is placed in `utils.py` inside the `my_package` directory.
- **Step 2: Import the Submodule**
    - In a separate script (e.g., `my_script.py`) located outside the package, you import the entire submodule using the `import package_name.submodule_name` syntax. This makes all the functions within that submodule available to your script, but under the submodule's namespace.
- **Step 3: Call the Function using Dot Notation**
    - To execute the function, you use the full path: `package_name.submodule_name.function_name()`. This tells Python exactly where to find the function, resolving any potential ambiguity.

##### Code Translation

```python
# --- File Structure ---
# work_dir/
# ├── my_package/
# │   ├── __init__.py
# │   └── utils.py
# └── my_script.py

# --- Step 1: Define the function in my_package/utils.py ---
def we_need_to_talk(break_up=False):
    """Helper for communicating with significant other"""
    if break_up:
        print("It's not you, it's me...")
    else:
        print('I <3 U!')

# --- In my_script.py ---

# --- Step 2: Import the submodule ---
import my_package.utils

# --- Step 3: Call the function using its full path ---
# Decide to start seeing other people
my_package.utils.we_need_to_talk(break_up=True)

# Expected Output:
# It's not you, it's me...
```

 [[Code - Accessing Submodule Functions Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`package_name`**
    - The name of the top-level package directory. This is the entry point.
- **`submodule_name`**
    - The name of the `.py` file (without the extension) inside the package that contains the function.
- **`function_name`**
    - The actual name of the function you wish to call.

#### Core Trade-offs

- **Clarity and Explicitness (Pro)**
    - The full path `package.submodule.function` leaves no doubt about where the function comes from. This is extremely helpful in large projects with many modules, preventing namespace collisions (e.g., two different submodules having a function named `calculate`).
- **Verbosity (Con)**
    - Writing out the full path can become tedious and make lines of code long, especially in deeply nested [[Python - Subpackages|subpackages]].
    - This can be mitigated by importing the submodule with an alias (e.g., `import my_package.utils as u` then `u.we_need_to_talk()`) or by importing the function directly (`from my_package.utils import we_need_to_talk`).

## Connections

```
                      (Parent)
               Package Submodules
                       ▲
                       │
┌──────────────────────┼──────────────────────┐
│                      │                      │
(Enables)     ┌──────────────────────────┐   (Alternative)
Package Structure │ Accessing Submodule Func │   Relative Imports
                  └──────────────────────────┘
```

### Parent Concept

This method is a direct application of the concept of [[Python - Package Submodules|package submodules]], providing the mechanism to interact with the code they contain.

### Child Concepts



### Related Concepts 

- This access pattern is fundamental to the overall [[Python - Package Structure and Functionality|package structure and functionality]], which organizes code hierarchically.
- It is the most explicit way of [[Python - Importing Packages|importing packages]] and their contents.
- The verbosity of this method can sometimes be reduced by using [[Python - Relative Imports in Packages|relative imports]] for communication between modules inside the same package.
- How and what is accessible can be controlled by [[Python - Exposing Package Functionality with __init__.py|exposing package functionality with __init__.py]], which can simplify the import path for users.
## Questions

- You're working on a large project where a deeply nested function `project.data.processing.cleaning.normalize_text()` is used hundreds of times. The verbosity is making the code hard to read. What are the trade-offs between using `import project.data.processing.cleaning as cl` versus `from project.data.processing.cleaning import normalize_text` to shorten the call? How does your choice impact code readability, maintainability, and the risk of namespace collisions?
- Imagine your package's `utils` submodule becomes a dumping ground for dozens of unrelated helper functions. How would this 'god object' submodule affect a large-scale application that depends on it, particularly concerning import times, dependency management, and the ability for teams to work in parallel? What refactoring strategy, like creating [[Python - Subpackages]], would you propose?
- What if Python's dot notation for attribute access was replaced with a file-path-like slash notation (e.g., `my_package/utils/we_need_to_talk()`). What potential ambiguities or new capabilities might this syntax introduce, especially concerning objects that are not modules or packages?