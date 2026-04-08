---
tags: 
  - core
  - python
  - package_structure
  - setuptools
  - distribution
  - portability
  - project_layout
  - concept
source: 
  - "[[Software Engineering Principles in Python]]"
related: 
  - "[[Python - Packages]]"
  - "[[Python - Package Portability]]"
  - "[[Python - setup.py File]]"
  - "[[Python - requirements.txt File]]"
  - "[[Python - setuptools Package]]"
  - "[[Python - setup() Function Arguments]]"
  - "[[Python - install_requires vs requirements.txt]]"
  - "[[Python - Installing a Local Package with pip]]"
  - "[[Python - Importing Packages]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[SWE - Software Engineering for Data Scientists]]"
  - "[[Python - Package Documentation]]"
---
# Core: Portable Package Structure

## Summary

>A portable package structure is a conventional directory layout for Python projects that separates the actual source code (the package) from metadata and dependency files. This organization, with a root directory containing a package folder, a `setup.py` file, and a `requirements.txt` file, is universally understood by Python's packaging tools like `pip` and `setuptools`, making the code distributable and easy to install for others.

**Why This Matters:** This standardized file structure is the blueprint for creating shareable and installable Python code, enabling collaboration and reproducibility across different projects and environments.

_Analogy:_ _Think of a portable package as a flat-pack furniture kit from IKEA. The package directory (`my_package`) is the box containing all the wooden parts and screws—the actual substance of the furniture. The `setup.py` file is the detailed instruction manual, telling the 'installer' (like `pip`) the name of the furniture, its version, and how to assemble the pieces correctly. The `requirements.txt` file is a separate note listing the specific tools (like a Phillips head screwdriver or an Allen key) that you need to have on hand to perform the assembly, which aren't included in the box._

**Where it breaks down:** The analogy falters because with Python packages, the 'tools' listed in `requirements.txt` or `setup.py` are often fetched and installed automatically by the package manager (`pip`). With furniture, you have to find the tools yourself. Also, the `setup.py` instruction manual can also contain its own list of required 'tools' via the `install_requires` argument.

```
work_dir/
├── my_package/
│   ├── __init__.py
│   ├── module_a.py
│   └── module_b.py
├── setup.py
└── requirements.txt
```

## Details

The core idea behind a portable package structure is the separation of concerns. By placing the actual Python modules inside a dedicated package directory (e.g., `my_package`) and keeping the configuration files like [[Python - setup.py File]] and [[Python - requirements.txt File]] at the top level of the project, we create a clean, predictable, and self-contained project. This structure isn't just a suggestion; it's the standard convention that enables tools to automatically build, distribute, and install your code.

#### Primary Goal

To organize Python code and its metadata into a standardized format that allows it to be reliably installed and used in different environments, promoting code reuse and sharing.

#### Mechanism

- **How it Works:** The structure relies on a specific hierarchy of files and folders that packaging tools are programmed to recognize.
    1. A top-level project root directory (e.g., `work_dir`) contains everything.
    2. Inside the root, there is a package directory (e.g., `my_package`) which holds all the Python source code (`.py` files).
    3. This package directory must contain an `__init__.py` file (which can be empty) to signal to Python that it is a package, not just a regular folder.
    4. Alongside the package directory, at the same level, are the metadata files: `setup.py` for installation instructions and `requirements.txt` for development dependencies.
- **Key Components:**
    - **Project Root (`work_dir`):** The main folder that encapsulates the entire project. This is what you would typically track in version control (e.g., a Git repository).
    - **Package Directory (`my_package`):** Contains the actual, importable Python code. The name of this folder becomes the name you use in an `import` statement (e.g., `import my_package`).
    - **Setup Script (`setup.py`):** The build script for the package. It leverages the [[Python - setuptools Package]] to define package metadata (like name, version) and installation requirements. This is the core file needed to make a package installable.
    - **Requirements File (`requirements.txt`):** A list of dependencies required to set up a development environment for the project. While `setup.py` is for making the package *installable*, `requirements.txt` is for making the project *workable* for a developer.

##### Code Translation

nothing to fill here

 [[Code - Portable Package Structure Implementation|View Full Implementation & Analysis]]

#### Key Parameters



#### Core Trade-offs

- **Benefit: Standardization & Portability**
    - This structure is the de facto standard in the Python ecosystem. Anyone familiar with Python can quickly understand your project's layout and how to install it, ensuring true [[Python - Package Portability|portability]].
- **Benefit: Clear Dependency Management**
    - It provides a clear distinction between dependencies needed to *install* the package (`setup.py`) and those needed to *develop* it (`requirements.txt`), a concept explored in [[Python - install_requires vs requirements.txt]].
- **Drawback: Overhead for Small Projects**
    - For a single, simple script or a project not intended for distribution, creating this structure can feel like unnecessary boilerplate.

## Connections

```
          (Parent)
      Python - Packages
             ▲
             │
┌────────────┼──────────────────┐
│            │                  │
(Tool)  ┌───────────────────────────┐  (Goal)
setuptools  │ Portable Package Structure│  Package Portability
            └───────────────────────────┘
                       │
            ┌──────────┴──────────┐
            │                     │
      setup.py File      requirements.txt File
```

### Parent Concept

This standardized layout is the fundamental way to create distributable [[Python - Packages]].

### Child Concepts

- The [[Python - setup.py File]] is a critical child component, acting as the build script and instruction manual for the package.
- The [[Python - requirements.txt File]] is another key component, used to define the development environment's dependencies.

### Related Concepts 

- This structure is processed by the [[Python - setuptools Package|setuptools library]], which reads `setup.py` to build and distribute the package.
- The ultimate goal of adopting this structure is to achieve [[Python - Package Portability|package portability]], allowing code to run anywhere.
- A developer would use the command line for [[Python - Installing a Local Package with pip|installing a local package]] that follows this structure.
- A common point of confusion this structure clarifies is the difference between [[Python - install_requires vs requirements.txt|install_requires and requirements.txt]].
## Questions

- You're building an internal data science tool. A colleague argues for just sharing a Jupyter notebook, while you advocate for creating a proper portable package. How would you justify the extra upfront effort of packaging to a project manager, focusing on long-term business value and risk reduction?
- Imagine this package becomes critical and is used by 50 other services in your company. How would you design a versioning and deployment pipeline to ensure that updates to this package don't break downstream dependencies? What role does the `setup.py` file play in this automated system?
- What if the `setup.py` and `setuptools` standards never existed? How might the Python community have evolved to share and distribute reusable code? What alternative mechanisms might have emerged, and what would their drawbacks be?