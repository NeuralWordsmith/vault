---
tags: 
  - core
  - python
  - setuptools
  - pip
  - pypi
  - packaging
  - distribution
  - concept
source: 
  - "[[Software Engineering Principles in Python]]"
related: 
  - "[[Python - Packages]]"
  - "[[Python - setuptools Package]]"
  - "[[Python - setup() Function Arguments]]"
  - "[[Python - install_requires vs requirements.txt]]"
  - "[[Python - Package Portability]]"
  - "[[Python - requirements.txt File]]"
  - "[[Python - Installing a Local Package with pip]]"
  - "[[Python - Package File Structure for Portability]]"
  - "[[Python - Importing Packages]]"
  - "[[SWE - Software Engineering for Data Scientists]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Python - Pip (Package Installer for Python)]]"
  - "[[Python - PyPI (Python Package Index)]]"
  - "[[Python - pyproject.toml]]"
---
# Core: setup.py

## Summary

>The `setup.py` file is a Python script that serves as the main configuration file for creating a package. It tells tools like `pip` and services like PyPI everything they need to know to build, install, and distribute the project. Its core component is a call to the `setup()` function from the [[Python - setuptools Package|setuptools]] library, which contains all the package's metadata and dependencies.

**Why This Matters:** The `setup.py` file is the central blueprint that transforms a collection of Python scripts into a standardized, installable, and distributable package for the entire Python ecosystem.

_Analogy:_ _A `setup.py` file is like the recipe card included in a meal-kit box. The meal kit (your Python project) has all the raw ingredients (your `.py` files), but the recipe card provides the essential instructions: the name of the dish, a list of ingredients needed (dependencies), and the step-by-step process for assembly (how to install it)._

**Where it breaks down:** A recipe card is static. A `setup.py` file is an executable Python script, which means it can contain logic, making it more powerful but also potentially more complex and less secure than modern declarative configuration files like `pyproject.toml`.

```
Your Project Directory
├── my_awesome_package/
│   ├── __init__.py
│   └── module1.py
├── tests/
└── setup.py  <-- This file describes everything
```

## Details

The `setup.py` file is the traditional heart of Python packaging. It's a script that leverages the [[Python - setuptools Package|setuptools]] library to define all the metadata about your project. This metadata includes the package name, version, author, and, crucially, its dependencies. When you run a command like `pip install .`, `pip` executes this script to understand how to correctly install your package and its required components into the environment. It's the bridge between your source code and the wider Python ecosystem.

#### Primary Goal

To provide a single, executable script that defines all the necessary metadata and instructions for building, installing, and distributing a Python package.

#### Mechanism

- **Step 1: Import the `setup` function**
    - The script must begin by importing the necessary function from the `setuptools` library.
- **Step 2: Call the `setup` function**
    - The rest of the file consists of a single call to this function, which wraps all the configuration.
- **Step 3: Provide Metadata Arguments**
    - Pass keyword arguments to the `setup` function to define the package's metadata. This includes essential information like `name`, `version`, and `packages`. For a deeper dive, see [[Python - setup() Function Arguments]].
- **Step 4: Specify Dependencies**
    - Use the `install_requires` argument to list the external packages your project depends on. This is distinct from a `requirements.txt` file, as explored in [[Python - install_requires vs requirements.txt]].

##### Code Translation

```python
# --- Step 1 ---
from setuptools import setup, find_packages

# --- Step 2, 3 & 4 ---
setup(
    name='my_awesome_package',
    version='0.1.0',
    author='Your Name',
    author_email='you@example.com',
    description='A short description of my package.',
    packages=find_packages(),  # Automatically find all packages in the directory
    install_requires=[
        'numpy>=1.20.0',
        'pandas'
    ],
    classifiers=[
        'Programming Language :: Python :: 3',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
    ],
    python_requires='>=3.8',
)
```

 [[Code - setup.py Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Core Metadata**
    - Arguments like `name`, `version`, `author`, and `description` are used by package managers and PyPI to identify and display your package.
- **Package Discovery**
    - The `packages` argument tells `setuptools` which directories (and the Python files within them) to include in the final distribution. The `find_packages()` function is a common helper to do this automatically.
- **Dependency Specification**
    - The `install_requires` argument is a list of strings specifying the minimal set of dependencies needed for the package to run. `pip` will automatically install these when your package is installed.
- **Classifiers & Python Version**
    - Arguments like `classifiers` and `python_requires` provide additional metadata that helps users find your package and understand its compatibility.

#### Core Trade-offs

- **Pro: Executable and Flexible**
    - Because `setup.py` is a Python script, it can contain logic. This allows for complex, conditional build steps or dependency specifications, which can be powerful for complex packages (e.g., those with C extensions).
- **Con: Security and Tooling Complexity**
    - The executable nature is also a drawback. Build tools can't know the package's metadata or dependencies without running arbitrary code, which is a security risk and makes tooling slower and more complex.
- **Modern Alternative: `pyproject.toml`**
    - Modern Python packaging standards (PEP 517/518) favor a declarative configuration file, `pyproject.toml`. This file statically defines build dependencies and metadata, allowing tools to inspect a project without executing code. While `setup.py` is still widely used, `pyproject.toml` is the future direction for ensuring [[Python - Package Portability|package portability]].

## Connections

```
                  (Parent)
             Python - Packages
                     ▲
                     │
┌────────────────────┼────────────────────┐
│                    │                    │
(Tool)         ┌───────────────────┐        (Service)
pip            │     setup.py      │        PyPI
               └───────────────────┘
                     │
                     ▼
                (Uses)
         setuptools.setup()
```

### Parent Concept

The `setup.py` file is a fundamental component within the broader topic of creating and managing [[Python - Packages|Python packages]].

### Child Concepts

- The primary mechanism within `setup.py` is a call to the `setup()` function, whose behavior is defined by the various [[Python - setup() Function Arguments|arguments]] passed to it.

### Related Concepts 

- It relies on the [[Python - setuptools Package|setuptools package]] to provide the core `setup()` function that drives the packaging process.
- The `install_requires` argument within `setup.py` serves a different purpose than a `requirements.txt` file, a distinction clarified in [[Python - install_requires vs requirements.txt|install_requires vs requirements.txt]].
- Properly configuring `setup.py` is a cornerstone of achieving [[Python - Package Portability|package portability]] across different environments.
- The installation of a package defined by `setup.py` is typically performed by [[Python - Installing a Local Package with pip|installing the local package with pip]].
## Questions

- Your team is building a package with an optional, heavy dependency (e.g., `tensorflow`) that is only needed for a specific feature. How would you configure `setup.py` to allow users to install this optional feature without forcing the dependency on everyone, and how would you justify this complexity to product management in terms of user experience and installation size?
- You've inherited a legacy system where the `setup.py` file contains complex logic that dynamically reads version numbers from git tags and conditionally changes dependencies based on the operating system. What are the risks of this approach for build reproducibility and security in a CI/CD pipeline, and what steps would you take to migrate towards a more declarative `pyproject.toml` configuration?
- What if the `setuptools` package was deprecated tomorrow and you could no longer run `setup.py`? How would you design a new, purely declarative system (using only a static file like JSON or TOML) to capture all the necessary metadata and build instructions for a complex Python package that includes compiled C extensions?