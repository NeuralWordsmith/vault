---
tags: 
  - core
  - python
  - setuptools
  - setup()
  - install_requires
  - package_metadata
  - dependency_management
  - concept
source: 
  - "[[Software Engineering Principles in Python]]"
related: 
  - "[[Python - setup.py File]]"
  - "[[Python - setuptools Package]]"
  - "[[Python - install_requires vs requirements.txt]]"
  - "[[Python - requirements.txt File]]"
  - "[[Python - Package Portability]]"
  - "[[Python - Packages]]"
  - "[[Python - Installing a Local Package with pip]]"
  - "[[Python - Package File Structure for Portability]]"
  - "[[Python - Specifying Dependencies in requirements.txt]]"
  - "[[Python - Installing Dependencies from requirements.txt]]"
  - "[[Python - Importing Packages]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Python - Wheels and Source Distributions]]"
  - "[[Python - PyPI (Python Package Index)]]"
  - "[[Python - pyproject.toml]]"
---
# Core: setup.py Arguments

## Summary

>The `setup()` function within a [[Python - setup.py File]] accepts a series of keyword arguments that define a package's metadata, contents, and installation requirements. While many arguments like `name` and `version` are self-explanatory, others like `packages` and `install_requires` are critical for defining the package's structure and dependencies, respectively. This function is the core component provided by the [[Python - setuptools Package]] for package configuration.

**Why This Matters:** These arguments are the metadata that tells packaging tools like pip and setuptools everything they need to know to correctly build, distribute, and install your Python project.

_Analogy:_ _Think of the `setup()` function and its arguments as a detailed recipe card for a dish (your Python package). The `name` is the dish's title, `version` is the recipe's edition number, `description` is the short, enticing blurb, and `author` is the chef. The `packages` argument is like the list of cooking steps, telling you which parts of your kitchen (codebase) are involved. Most importantly, `install_requires` is the 'Shopping List' section, listing all the ingredients (external libraries) you must get from the store before you can even start cooking._

**Where it breaks down:** A recipe card is static. The `setup.py` file is an executable Python script. This means it can contain conditional logic (e.g., 'if on Windows, use this ingredient; if on Linux, use another'), making it far more dynamic and powerful than a simple, fixed list of instructions.

```
setup.py
├── setup(
│   ├── name='my_package' ──────────> Package Identity
│   ├── version='0.0.1' ────────────> Release Version
│   ├── packages=['my_package'] ────> Source Code Location
│   └── install_requires=[...] ─────> External Dependencies
)
```

## Details

The `setup()` function, imported from the [[Python - setuptools Package]], serves as the central configuration point for a Python package. Its arguments provide the essential metadata that packaging tools use to understand and manage the project. While some arguments like `name`, `version`, and `author` are straightforward, the context highlights two less obvious but vital arguments: `packages` and `install_requires`. The `packages` argument tells `setuptools` where to find the actual source code by listing the directories containing `__init__.py` files. The `install_requires` argument defines the package's dependencies, functioning similarly to a [[Python - requirements.txt File]] by ensuring necessary libraries are installed alongside your package.

#### Primary Goal

To provide a single, centralized configuration for defining a Python package's identity, contents, and dependencies for distribution and installation.

#### Mechanism

- **How it Works:**
    - When a user runs a command like `pip install .`, the packaging tool executes the [[Python - setup.py File]]. This script calls the `setup()` function, passing all the defined keyword arguments to it. `setuptools` then uses this information to perform the necessary steps: building the package, resolving and installing dependencies listed in `install_requires`, and finally installing the package's own modules (found via the `packages` argument) into the correct environment.
- **Key Metadata Arguments:**
    - These arguments identify the package.
    - *Example:* `name`, `version`, `description`, `author`, `author_email`.
- **Package Discovery Argument (`packages`):**
    - This tells `setuptools` which directories to include as packages in the final build. A directory is considered a package if it contains an `__init__.py` file.
    - *Example:* `packages=['my_package']` instructs `setuptools` to include the `my_package` directory and its Python modules.
- **Dependency Management Argument (`install_requires`):**
    - This specifies the minimal set of dependencies required for the package to function. When your package is installed via `pip`, these dependencies are automatically downloaded and installed first.
    - *Example:* `install_requires=['matplotlib', 'numpy>=1.15.4']` ensures that `matplotlib` and a specific version of `numpy` are present in the user's environment. This is a key topic in the discussion of [[Python - install_requires vs requirements.txt]].

##### Code Translation

```python
from setuptools import setup

setup(name='my_package',
      version='0.0.1',
      description='An example package for DataCamp.',
      author='Adam Spannbauer',
      author_email='spannbaueradam@gmail.com',
      packages=['my_package'],
      install_requires=['matplotlib',
                        'numpy==1.15.4',
                        'pycodestyle>=2.4.0'])
```

 [[Code - setup.py Arguments Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`name`**: (string) The distribution name of your package. This is the name users will type to install it (e.g., `pip install my_package`).
- **`version`**: (string) The version number of the package, which should ideally follow semantic versioning (e.g., '0.0.1').
- **`packages`**: (list of strings) A list of all Python import packages that should be included in the distribution package. `setuptools.find_packages()` is a common helper function to automate this.
- **`install_requires`**: (list of strings) A list specifying the minimal dependencies needed for the package to run. `pip` uses this list to install required packages from PyPI.
- **`description`**: (string) A short, one-sentence summary of the package.
- **`author` / `author_email`**: (string) The name and email of the package author, used for contact and attribution.

#### Core Trade-offs

- **Centralization vs. Modern Alternatives**: While `setup.py` centralizes all configuration, the modern standard is moving towards declarative configuration in `pyproject.toml`. Using a pure `setup.py` can be overly complex for simple projects and less standardized than the newer format.
- **Abstract vs. Concrete Dependencies**: The `install_requires` argument is meant for abstract dependencies (e.g., `pandas>=1.0`), ensuring broad compatibility. This contrasts with a [[Python - requirements.txt File]], which is used for pinning concrete versions (e.g., `pandas==1.3.5`) to create a reproducible environment for development or deployment. Misusing one for the other's purpose can lead to installation conflicts or non-reproducible builds.
- **Power vs. Predictability**: Because `setup.py` is executable code, you can add dynamic logic (e.g., platform-specific dependencies). This is powerful but can make package builds less predictable and harder to debug compared to a static configuration file.

## Connections

```
                      (Parent)
                  Python Packages
                         ▲
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                    │
(Tool)          ┌──────────────────────┐      (Defines)
setuptools      │  setup.py Arguments  │      Package Portability
                └──────────────────────┘
                         │
              ┌──────────┴──────────┐
              │                     │
    (Related Concept)       (Related Concept)
install_requires vs       requirements.txt
requirements.txt
```

### Parent Concept

The arguments within the `setup()` function are a fundamental component of creating distributable [[Python - Packages]].

### Child Concepts

- This concept represents a collection of parameters rather than a topic with distinct conceptual sub-types.

### Related Concepts 

- The `setup()` function itself is provided by the [[Python - setuptools Package|setuptools library]].
- The `install_requires` argument serves a similar but distinct purpose compared to a [[Python - requirements.txt File|requirements.txt file]], a difference explored in [[Python - install_requires vs requirements.txt]].
- Properly defining these arguments is crucial for achieving [[Python - Package Portability|package portability]] across different environments.
- These arguments are defined within the [[Python - setup.py File]], which acts as the build script for the package.
## Questions

- Your team wants to release a new version of a critical internal library. The `install_requires` list has some loosely defined dependencies (e.g., `pandas>=1.0`). A stakeholder is concerned about breaking downstream applications that rely on older versions of pandas. How do you balance the need for modern features with the risk of causing breaking changes, and how would you communicate your versioning and dependency strategy to the teams that depend on your package?
- Imagine your `setup.py` needs to compile a C extension, but only on Linux systems, while using a pure Python fallback on Windows and macOS. How would you modify the `setup()` arguments dynamically to handle this platform-specific build logic, and what are the risks associated with this approach in a CI/CD pipeline?
- What if the `install_requires` argument was deprecated? How would the Python packaging ecosystem need to evolve to manage transitive dependencies during installation, and what new tools or standards might emerge to fill that gap?