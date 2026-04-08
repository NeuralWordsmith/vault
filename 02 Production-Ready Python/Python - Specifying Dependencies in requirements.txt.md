---
tags: 
  - core
  - python
  - version_pinning
  - dependency_management
  - reproducibility
  - pip
  - requirements
  - concept
source: 
  - "[[Software Engineering Principles in Python]]"
related: 
  - "[[Python - requirements.txt File]]"
  - "[[Python - Installing Dependencies from requirements.txt]]"
  - "[[Python - Package Portability]]"
  - "[[Python - install_requires vs requirements.txt]]"
  - "[[Python - setup.py File]]"
  - "[[Python - setuptools Package]]"
  - "[[Fundamental - Version Control]]"
  - "[[SWE - Software Engineering for Data Scientists]]"
  - "[[Python - Packages]]"
  - "[[Python - Importing Packages]]"
  - "[[Fundamental - MLOps]]"
  - "[[Fundamental - Containerization]]"
  - "[[Python - Installing a Local Package with pip]]"
  - "[[Python - Package File Structure for Portability]]"
---
# Core: Specifying Package Versions

## Summary

>In Python development, specifying package versions within a [[Python - requirements.txt File|requirements.txt file]] is the standard method for controlling the exact dependencies of a project. This ensures that every developer, user, or server running the code uses the same environment, which is a cornerstone of [[Python - Package Portability|package portability]]. There are three primary ways to specify a requirement: without a version to get the latest, with a double equals (`==`) to pin an exact version, or with a comparison operator (`>=`) to set a minimum version.

**Why This Matters:** Specifying package versions is crucial for creating reproducible and stable software environments, preventing unexpected breakages caused by dependency updates.

_Analogy:_ _Think of a `requirements.txt` file as a recipe for a complex dish. The recipe can list its ingredients in several ways. It might just say 'flour', leaving you to grab any kind you have. Or, it could be extremely precise, demanding 'King Arthur All-Purpose Flour, Batch #A4-2026', ensuring the exact same result every time. Alternatively, it could be flexible but safe, asking for 'any bread flour with at least 12% protein', guaranteeing a certain quality while allowing for different brands._

In this analogy:
- **'flour'**: Corresponds to an unpinned package like `matplotlib`.
- **'King Arthur Flour, Batch #A4-2026'**: Corresponds to a pinned package like `numpy==1.15.4`.
- **'flour with at least 12% protein'**: Corresponds to a minimum version requirement like `pycodestyle>=2.4.0`.
- **Where it breaks down:** The analogy is limited because software packages have their own complex, nested dependencies (one package requires another), which is not typically true for recipe ingredients. A change in one package can have cascading effects on others, a complexity not captured by the simple ingredient list.

```
Syntax         | Name             | Use Case
---------------|------------------|--------------------------------
package        | Unpinned         | Any version is fine (flexible)
package==X.Y.Z | Pinned (Exact)   | Maximum reproducibility (strict)
package>=X.Y.Z | Minimum Version  | Need specific features, allow updates
```

## Details

Open-source packages are constantly evolving, and a new version of a library your project depends on could introduce breaking changes. To prevent this and ensure your project works consistently for everyone, you can explicitly define which versions of your dependencies are acceptable. This is a fundamental practice in software engineering for creating reliable and reproducible builds. The primary methods for this control are **unpinned versions**, **pinned (exact) versions**, and **minimum versions**.

#### Primary Goal

To control the exact versions of dependencies used in a project to ensure reproducibility, stability, and prevent unexpected breaking changes from package updates.

#### Mechanism

- **How it Works:**
    - When you run the command for [[Python - Installing Dependencies from requirements.txt|installing dependencies]], the package manager (`pip`) reads the `requirements.txt` file line by line. For each line, it parses the package name and the version specifier to query a package index (like PyPI) and download the appropriate version that satisfies the rule.
- **Unpinned Version**
    - Simply listing the package name without any version specifier.
    - Example: `matplotlib`
    - Effect: `pip` will install the latest stable version available on the package index. This is convenient but risky for production environments as it's not reproducible.
- **Pinned (Exact) Version**
    - Uses the double equals operator (`==`) to lock the package to one specific version.
    - Example: `numpy==1.15.4`
    - Effect: This provides the highest level of reproducibility. Anyone installing from this file will get the exact same version of NumPy, eliminating version-related bugs.
- **Minimum Version**
    - Uses a comparison operator like greater than or equal to (`>=`) to specify a baseline version.
    - Example: `pycodestyle>=2.4.0`
    - Effect: This ensures that the installed version has at least the features of `2.4.0`, while still allowing `pip` to install newer versions that may contain important bug fixes or security patches.

##### Code Translation

```bash
# Contents of a typical requirements.txt file

# --- No version specified (installs the latest) ---
matplotlib

# --- Exact version specified (pinned) ---
numpy==1.15.4

# --- Minimum version specified ---
pycodestyle>=2.4.0
```

 [[Code - Specifying Package Versions Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Common Version Specifiers:** These operators are the 'levers' you can use to control dependency resolution.
    - `==` (Exactly Equal): Pins the dependency to a single, specific version. Example: `pandas==1.3.5`.
    - `>=` (Greater Than or Equal To): Sets a minimum required version. Example: `scikit-learn>=1.0.0`.
    - `<=` (Less Than or Equal To): Sets a maximum allowed version, often to avoid known breaking changes in future releases. Example: `django<=3.2`.
    - `~=` (Compatible Release): A powerful specifier that allows for patch and minor updates but not major ones. Example: `~=1.4.2` is equivalent to `>=1.4.2, ==1.4.*` or `>=1.4.2, <1.5.0`.

#### Core Trade-offs

- **Strict Pinning (`==`)**
    - Pro: Guarantees a perfectly reproducible environment, which is critical for production systems and scientific research.
    - Con: You miss out on automatic security patches, bug fixes, and performance improvements. It can also make resolving nested dependency conflicts more difficult.
- **Loose Pinning (`>=`, `~=`)**
    - Pro: Your project can benefit from the latest improvements and security updates in its dependencies without manual intervention.
    - Con: A new minor version of a dependency could unexpectedly introduce a bug or a subtle breaking change, making your build fail or behave incorrectly.

## Connections

```
                  (Parent)
           [[Python - requirements.txt File|requirements.txt File]]
                     ▲
                     │
┌────────────────────┼────────────────────┐
│                    │                    │
(Mechanism) ┌───────────────────────────┐ (Alternative)
[[Python - In...|Installing Dependencies]] │ Specifying Package Versions │ [[Python - ins...|install_requires]]
            └───────────────────────────┘
                     │
                     ▼
                   (Goal)
        [[Python - Package Portability|Package Portability]]
```

### Parent Concept

This concept is a specific implementation detail of the [[Python - requirements.txt File|requirements.txt file]], which is a core tool for managing project dependencies.

### Child Concepts



### Related Concepts 

- The specifications in this file are used by the `pip install -r requirements.txt` command, as detailed in [[Python - Installing Dependencies from requirements.txt|installing dependencies]].
- This method of specifying dependencies for an environment contrasts with using the `install_requires` argument in a `setup.py` file for defining a package's abstract dependencies, a topic explored in [[Python - install_requires vs requirements.txt|the difference between install_requires and requirements.txt]].
- Ultimately, managing versions correctly is a cornerstone of achieving [[Python - Package Portability|package portability]].
## Questions

- Your production service is failing due to a newly discovered security vulnerability in a dependency pinned to `numpy==1.15.4`. The patch is in `numpy==1.16.0`, but this version introduces a minor breaking change to an API your team uses. How do you weigh the immediate business risk of the security flaw against the development cost and risk of refactoring the code for the new version? How would you communicate this to management?
- Imagine you manage a monorepo with 50 microservices, each with its own `requirements.txt`. How would you design a CI/CD system to automatically detect and manage dependency conflicts or outdated pinned versions across all services without requiring manual intervention for every minor patch?
- What if the Python Package Index (PyPI) went down permanently and you could no longer fetch packages by version number? What alternative strategies and infrastructure would you need to create to ensure your projects remain buildable and portable?