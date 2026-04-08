---
tags: 
  - core
  - python
  - local_import
  - module
  - package_structure
  - relative_path
  - sys.path
  - concept
source: 
  - "[[Software Engineering Principles in Python]]"
related: 
  - "[[Python - Importing Packages]]"
  - "[[Python - Packages]]"
  - "[[Python - Minimal Package Structure]]"
  - "[[Python - __init__.py File]]"
  - "[[Python - Creating a Minimal Package]]"
  - "[[Python - Package Naming Conventions (PEP 8)]]"
  - "[[Python - Inspecting a Package with help()]]"
  - "[[Python - Functions]]"
  - "[[Python - Scope]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Python - User-Defined Functions]]"
  - "[[Python - Class Definition]]"
---
# Core: Importing a Local Package

## Summary

>Importing a local package is the process of making Python code from a nearby directory (the "package") available for use in another script. This is achieved by placing the script in the same parent directory as the package folder and using a standard `import` statement. This method relies on Python's default module search path, which includes the current working directory.

**Why This Matters:** This technique is the simplest way to reuse and organize your code into modules, forming the foundational step towards building more complex and maintainable Python applications.

_Analogy:_ _Imagine you have a personal toolbox (`my_package`) that you built and keep in your garage. When you're working on a project (your `main_script.py`) in the garage, you can simply reach over and grab a tool from that specific toolbox because it's right there. You don't need a map or special instructions to find it; its proximity makes it directly accessible._

**Where it breaks down:** This analogy works well for projects confined to one location (the "garage"). However, if you start a new project in the house, you can't just "reach over" for your garage toolbox. Similarly, this simple import method fails if your script is not in the same directory as the package, highlighting its lack of portability for larger, more distributed projects.

```
project_folder/
├── my_package/              <-- The package
│   ├── __init__.py
│   └── module1.py
└── main_script.py           <-- This script imports 'my_package'
```

## Details

In Python, importing a local package is the most direct way to access code you've organized into a separate directory. The core principle is colocation: your main script and the package directory must reside at the same level in your file system. This allows Python's import system, which automatically searches the current directory, to find and load your package without any special configuration. This is the first step in modular programming, where you break down a large problem into smaller, manageable, and reusable parts, often starting with a [[Python - Minimal Package Structure|minimal package structure]].

#### Primary Goal

To enable a Python script to access and use functions, classes, and variables defined within a user-created package located in the same directory.

#### Mechanism

- **Step 1: Establish the Package Structure**
    - Create a directory for your project. Inside it, create the package directory (e.g., `my_package`). This directory must contain an `[[Python - __init__.py File|__init__.py]]` file to be recognized as a package, along with your module files (e.g., `module1.py`). This follows the [[Python - Minimal Package Structure|minimal package structure]].
- **Step 2: Create the Main Script**
    - In the same top-level project directory (i.e., as a sibling to `my_package`), create your main Python script (e.g., `main_script.py`). This colocation is the key to this import method.
- **Step 3: Import and Use the Package**
    - Inside `main_script.py`, use a standard `import` statement to access your package. You can then call functions or use classes from the modules within that package.

##### Code Translation

```python
# Assume the following file structure:
# project_folder/
# ├── my_package/
# │   ├── __init__.py  (can be empty)
# │   └── greeter.py   (contains a function `say_hello`)
# └── main_script.py

# --- Step 1 & 2: File Content ---
# Contents of my_package/greeter.py
# def say_hello(name):
#     return f"Hello, {name} from my_package!"

# Contents of main_script.py
# --- Step 3: Import and Use ---
import my_package.greeter

# Call the function from the imported module
message = my_package.greeter.say_hello("Alice")
print(message)

# Expected Output:
# Hello, Alice from my_package!
```

 [[Code - Importing a Local Package Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **File System Layout**
    - The primary "parameter" controlling this mechanism is the relative location of the script and the package directory. They *must* be siblings. If the script is moved to a different location, the import will fail with a `ModuleNotFoundError`.
- **Current Working Directory**
    - The import works because Python's `sys.path` (the list of directories it searches for modules) implicitly includes the directory from which the script is being executed. Changing the current working directory at runtime can break this import method.

#### Core Trade-offs

- **Simplicity vs. Brittleness**
    - This method is extremely simple and requires no configuration, making it great for small scripts and initial project setups. However, it's brittle; moving the script or trying to run it from a different directory will break the import path.
- **Limited Scalability**
    - It is not suitable for complex projects or libraries intended for distribution. It creates an implicit dependency on the file structure, which is not a robust or portable solution. For larger projects, installing the package (e.g., in editable mode with `pip`) is the standard practice.

## Connections

```
                  (Parent)
             Python - Importing Packages
                     ▲
                     │
┌────────────────────┼────────────────────┐
│                    │                    │
[[Python - Minimal Package Structure|Minimal Structure]]    ┌───────────────────────────┐   [[Python - __init__.py File|__init__.py File]]
                  │ Importing a Local Package │
                  └───────────────────────────┘
                         │
                         │
                  (Leads to need for)
           [[Python - Inspecting a Package with help()|Inspecting a Package]]
```

### Parent Concept

This is a specific technique for achieving the broader goal of [[Python - Importing Packages|importing packages]].

### Child Concepts



### Related Concepts 

- The process begins by [[Python - Creating a Minimal Package|creating a minimal package]] with the correct directory structure.
- A crucial component for a directory to be recognized as a package is the [[Python - __init__.py File|__init__.py file]].
- Following [[Python - Package Naming Conventions (PEP 8)|PEP 8 naming conventions]] for your package is essential for readability and avoiding conflicts.
- Once imported, you can explore the package's contents using [[Python - Inspecting a Package with help()|the built-in help() function]].
## Questions

- Your team is building a small, internal data processing tool. You've chosen this simple local import method for speed. At what point would the technical debt from this brittle approach outweigh the initial development speed, and what specific event (e.g., needing to run a script via cron, sharing the tool with another team) would trigger the migration to a properly installable package?
- Imagine this local package is now used by five different scripts, all located in the same root directory. If you need to refactor the package by renaming a module, how would you design a process to update all dependent scripts safely and automatically, minimizing the risk of breaking production workflows?
- What if Python's `sys.path` was immutable after startup, meaning you could not rely on the script's current directory being automatically included for imports? How would you redesign the fundamental mechanism of local development and testing without using editable installs (`pip install -e .`)?