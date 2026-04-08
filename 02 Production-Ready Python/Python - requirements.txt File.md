---
tags: 
  - core
  - python
  - dependency_management
  - reproducibility
  - environment_setup
  - pip
  - requirements.txt
  - concept
source: 
  - "[[Software Engineering Principles in Python]]"
related: 
  - "[[Python - Package Portability]]"
  - "[[Python - Specifying Dependencies in requirements.txt]]"
  - "[[Python - Installing Dependencies from requirements.txt]]"
  - "[[Python - setup.py File]]"
  - "[[Python - install_requires vs requirements.txt]]"
  - "[[Python - setuptools Package]]"
  - "[[Python - Packages]]"
  - "[[Python - Importing Packages]]"
  - "[[Fundamental - Version Control]]"
  - "[[Fundamental - Containerization]]"
  - "[[SWE - Software Engineering for Data Scientists]]"
  - "[[Python - Installing a Local Package with pip]]"
  - "[[Python - Package File Structure for Portability]]"
---
# Core: Requirements File

## Summary

>A requirements file, conventionally named `requirements.txt`, is a plain text file that lists all the external Python packages a project depends on. It acts as a blueprint for recreating the project's environment, ensuring that anyone working on the project uses the same versions of the same dependencies. This is a cornerstone of [[Python - Package Portability]], as it allows an environment to be consistently rebuilt across different machines. It's closely related to the process of [[Python - Installing Dependencies from requirements.txt]], which is the command used to bring this blueprint to life.

**Why This Matters:** A requirements file ensures that any developer can perfectly replicate the exact software environment needed for a project, eliminating "it works on my machine" errors and guaranteeing reproducibility.

_Analogy:_ _A requirements file is like a detailed recipe for a cake. The recipe lists every single ingredient (flour, sugar, eggs) and the exact quantity needed (2 cups, 1 cup, 3 large). Anyone with this recipe can bake the exact same cake._

  * **Ingredients:** The Python packages (`pandas`, `numpy`, `requests`).
  * **Quantities:** The specific version numbers (`pandas==1.3.5`).
  * **The Baker:** The developer or an automated system using `pip`.
  * **The Final Cake:** The fully functional and reproducible Python environment.
  * **Where it breaks down:** A recipe doesn't usually specify the brand of flour or the exact temperature of the eggs, but a requirements file can be extremely precise, even pointing to a specific file or version control hash. The recipe also doesn't list the tools (oven, mixer), whereas a requirements file assumes the presence of the core tool, `pip`.

```
Developer's Machine          Version Control (Git)         Collaborator's Machine
+-------------------+        +-------------------+        +--------------------+
| project_code.py   |        |                   |        |                    |
| requirements.txt  | -----> |  project_repo/    | -----> |  project_code.py   |
| (pandas==1.0)     |        |   - code.py       |        |  requirements.txt  |
+-------------------+        |   - reqs.txt      |        |  (pandas==1.0)     |
                             |                   |        +----------+---------+
                             +-------------------+                   |
                                                                     | pip install -r reqs.txt
                                                                     v
                                                            +--------------------+
                                                            |  Identical Python  |
                                                            |  Environment       |
                                                            +--------------------+
```

## Details

A requirements file is a fundamental tool in Python development for managing project dependencies. Its core idea is to provide a simple, human-readable, and machine-parseable list of packages needed to run a piece of software. This solves the critical problem of environment inconsistency, where code works for one developer but fails for another due to differences in installed package versions. By standardizing the environment, requirements files ensure reproducibility and collaboration. The file itself is typically a simple text file, often named `requirements.txt`, which is then used by the package manager `pip` to install the specified dependencies. This concept is a key part of achieving [[Python - Package Portability]] and works hand-in-hand with tools like `pip` and virtual environments.

#### Primary Goal

To provide a definitive, shareable, and reproducible list of a project's Python package dependencies.

#### Mechanism

- **How it Works:**
    1. A developer creates a plain text file (e.g., `requirements.txt`).
    2. Inside the file, each required package is listed on a new line.
    3. Optionally, version specifiers are added to pin packages to specific versions, preventing breaking changes from future updates.
    4. This file is committed to version control alongside the project's source code.
    5. Other developers or deployment systems use `pip` to read this file and install the exact dependencies into their local environment.
- **Common Formats:**
    - **Simple Package Name:** `requests` (installs the latest version available on PyPI).
    - **Specific Version:** `pandas==1.3.5` (installs exactly version 1.3.5).
    - **Version Range:** `numpy>=1.20.0,<1.22.0` (installs a version within a compatible range).
    - **From Version Control:** `git+https://github.com/user/repo.git@main#egg=packagename` (installs directly from a Git repository).

##### Code Translation

```bash
# Example requirements.txt file

# Core data science libraries
pandas==1.4.2
numpy>=1.21.0
scikit-learn

# For making API calls
requests~=2.27.0

# For plotting
matplotlib
```

 [[Code - Requirements File Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`==` (Exact Version)**: `package==1.2.3`. Pins the dependency to a single, specific version. This is the safest option for production environments to guarantee stability and reproducibility.
- **`>=` (Minimum Version)**: `package>=1.2.0`. Ensures at least version 1.2.0 is installed, allowing for non-breaking updates and security patches. Offers flexibility but risks pulling in a future breaking change.
- **`~=` (Compatible Release)**: `package~=1.2.3`. A flexible marker equivalent to `>=1.2.3, ==1.2.*`. It allows patch releases (e.g., 1.2.4) but not minor version changes (e.g., 1.3.0), balancing stability with bug fixes.
- **`-r <other_file>` (Recursive Inclusion)**: Allows you to include dependencies from another requirements file, which is useful for splitting dependencies (e.g., `requirements_dev.txt` for testing tools and `requirements.txt` for production).

#### Core Trade-offs

- **Pro: Reproducibility & Simplicity**: The primary benefit. It guarantees that every environment is identical, eliminating "works on my machine" issues. As a plain text file, it's easy to read, write, and manage with version control.
- **Con: Poor Transitive Dependency Management**: A requirements file lists your direct dependencies, but not the dependencies *of your dependencies*. This can lead to conflicts if two of your packages require different, incompatible versions of a third package. Tools like `pip-tools` or dependency managers like Poetry solve this by generating a lock file.
- **Con: Not Ideal for Libraries**: It's excellent for applications where you want to lock down the entire environment. For libraries intended to be used by others, using `install_requires` in a [[Python - setup.py File]] is preferred, as it allows for more flexible version ranges to avoid conflicts in the end-user's environment. This highlights the key difference explored in [[Python - install_requires vs requirements.txt]].

## Connections

```
                      (Parent)
                Package Portability
                         ▲
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                    │
(Alternative)   ┌──────────────────┐      (Mechanism)
setup.py        │ Requirements File│      pip
                └──────────────────┘
                         │
              ┌──────────┴──────────┐
              │                     │
    Specifying Dependencies   Installing Dependencies
```

### Parent Concept

The concept of a requirements file is a core mechanism for achieving [[Python - Package Portability]], which is the broader goal of making a Python project runnable across different machines and environments.

### Child Concepts

- A key aspect of using a requirements file is [[Python - Specifying Dependencies in requirements.txt|specifying dependencies]], which involves using precise syntax to control package versions.
- Once defined, the environment is created by [[Python - Installing Dependencies from requirements.txt|installing dependencies from the file]] using a package manager like pip.

### Related Concepts 

- While a requirements file is ideal for applications, a [[Python - setup.py File|setup.py file]] is the standard for creating distributable packages, defining metadata and installation requirements through its `install_requires` argument.
- The distinction between using a requirements file and the `install_requires` argument is a crucial decision, as explored in [[Python - install_requires vs requirements.txt|install_requires vs requirements.txt]].
- Ultimately, the goal of using a requirements file is to ensure a consistent [[Python - Package File Structure for Portability|package file structure and environment]] that can be easily shared and deployed.
## Questions

- Your production service is failing intermittently after a recent deployment. You suspect a dependency issue. Your `requirements.txt` uses flexible specifiers like `>=`. How would you argue to your product manager about the business need to spend engineering time locking down all dependency versions with `==`, and what potential risks (e.g., missing security patches) does this 'pinning' strategy introduce?
- You are designing a CI/CD pipeline for a large microservices-based application where dozens of services have their own `requirements.txt`. How would you design a system to manage, audit, and enforce consistency for common dependencies (like `requests` or a company's internal library) across all these files to prevent version conflicts and security risks at scale?
- What if the `pip` package manager and `requirements.txt` files were suddenly deprecated? How would you design a new, decentralized dependency management system for Python that relies on a blockchain to verify package integrity and resolve dependency graphs without a central repository like PyPI?