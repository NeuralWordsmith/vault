---
tags: 
  - process
  - python
  - pip
  - local_install
  - package_development
  - setuptools
  - editable_mode
  - concept
source: 
  - "[[Software Engineering Principles in Python]]"
related: 
  - "[[Python - Packages]]"
  - "[[Python - setup.py File]]"
  - "[[Python - setuptools Package]]"
  - "[[Python - setup() Function Arguments]]"
  - "[[Python - Package Portability]]"
  - "[[Python - requirements.txt File]]"
  - "[[Python - Installing Dependencies from requirements.txt]]"
  - "[[Python - install_requires vs requirements.txt]]"
  - "[[Python - Package File Structure for Portability]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Python - Importing Packages]]"
  - "[[Python - Virtual Environments]]"
  - "[[Python - PyPI (Python Package Index)]]"
  - "[[Python - Wheels and Source Distributions]]"
---
# Process: Installing a Local Package with Pip

**Why This Matters:** This command transforms a local directory of code into a reusable, importable library within your Python environment, enabling you to test and use your package just like any other installed library.
## Goal & Analogy

> **Goal:** `pip install .` is a command-line instruction that installs a Python package from the current directory. It looks for a configuration file like `[[Python - setup.py File|setup.py]]`, builds the package, and installs it into the active Python environment's `site-packages` directory, making it available for import in any script using that environment.

_Analogy:_ _Installing a local package with `pip install .` is like assembling a piece of IKEA furniture in your living room. You have all the parts (your `.py` files), the instruction manual (your `[[Python - setup.py File|setup.py]]`), and the tools (`pip` and `[[Python - setuptools Package|setuptools]]`). Running the command is the act of following the instructions to build the furniture and place it in the room, ready for anyone to use._

The instruction manual (`setup.py`) tells the assembler (`pip`) exactly how to put the pieces together and what the final product should be called. Once assembled, the furniture (your package) is a functional part of the room (your Python environment) and can be used alongside other furniture (other installed packages). **Where it breaks down:** Unlike furniture, a software package can be easily "disassembled" (uninstalled) or updated to a new version without leaving any holes in the wall. Also, the "instruction manual" can automatically fetch other required "parts" (dependencies) from a global warehouse (PyPI).

```
```
[Your Project Directory]
       │
       ├── my_package/
       │   ├── __init__.py
       │   └── module.py
       │
       └── setup.py  <───┐
                         │
(Terminal)               │
$ pip install .  ────────┘ (pip reads setup.py)
       │
       ▼
[Python Environment]
       │
       └── site-packages/
           ├── my_package/  <─── (Package is now installed here)
           │
           └── ... (other installed packages)
```
```

## The Step-by-Step Process

### Prerequisites / Inputs

- **Editable Mode (`-e` or `--editable`)**
    - Using `pip install -e .` installs the package in "editable" or "develop" mode.
    - Instead of copying the files to `site-packages`, it creates a symbolic link (a `.pth` file) pointing back to your source code.
    - This is extremely useful during development, as any changes you make to your source files are immediately reflected in the installed package without needing to reinstall.

### The Steps

- **Step 1: Navigate to the Package Root**
    - Open your terminal or command prompt and change your directory (`cd`) to the root of your package—the one containing the `setup.py` file.
- **Step 2: Activate the Target Environment**
    - Ensure the correct virtual environment is activated. The package will be installed here, isolating it from other projects.
- **Step 3: Run the Installation Command**
    - Execute `pip install .`. Pip will then take over the process.
- **Step 4: Pip's Execution Flow**
    1. Pip locates the `setup.py` file in the current directory (`.`).
    2. It uses the `[[Python - setuptools Package|setuptools]]` library to read the metadata and dependencies defined in the `[[Python - setup() Function Arguments|setup() function]]`.
    3. It resolves and installs any dependencies listed in the `install_requires` argument.
    4. It builds the package into a distributable format (like a wheel).
    5. It copies the necessary files into the `site-packages` directory of your active Python environment.
- **Step 5: Verify the Installation**
    - You can now open a Python interpreter from *any* directory (while the environment is active) and `import` your package to confirm it works.

##### Code Translation

```bash
# --- Step 1: Navigate to the Package Root ---
# Assume our package 'my_awesome_package' is in the 'projects' directory
cd /path/to/projects/my_awesome_package

# --- Step 2: Activate the Target Environment ---
# (This command varies based on your OS and virtual environment tool)
source .venv/bin/activate

# --- Step 3: Run the Installation Command ---
# The '.' tells pip to look for setup.py in the current directory
pip install .

# --- Step 5: Verify the Installation ---
# Navigate away from the project directory to ensure you're not importing locally
cd ~

# Open a Python interpreter
python
>>> import my_awesome_package
>>> # If no ImportError occurs, the installation was successful!
>>> exit()
```

### Deliverables / Outputs

After you've structured your project and created a `[[Python - setup.py File|setup.py]]` file to define its metadata and dependencies, the next logical step is to actually install it. The command `pip install .` (where the dot represents the current directory) is the standard way to do this. It tells `pip`, Python's package installer, to look in the current folder for the necessary setup files, build the package, and install it into your active Python environment. This makes your code importable from any other script, just as if you had installed it from an online repository like PyPI.

## Context & Tradeoffs

### When to Use This Process

To make a local collection of Python scripts and modules available as a single, importable package within the current Python environment for development and testing purposes.

### Common Pitfalls & Tradeoffs

- **Pro: Realistic Testing**
    - Installing the package allows you to test it in the same way an end-user would, ensuring that your import paths and dependencies are correctly configured in `[[Python - setup.py File|setup.py]]`.
- **Pro: Environment-Level Availability**
    - Once installed, the package can be imported from any script or interactive session using that Python environment, not just from within the project directory.
- **Con: Static Installation (without `-e`)**
    - A standard `pip install .` is a snapshot. If you change your source code, you must run the command again to see the changes, which can slow down development. This is why the editable flag is so popular.
- **Con: Environment Pollution**
    - It installs the package directly into your environment. For rapid testing, this is fine, but it's crucial to use virtual environments to avoid cluttering your global Python installation and creating dependency conflicts.

## Connections

```
```
                  (Parent)
             Package Portability
                     ▲
                     │
┌────────────────────┼────────────────────┐
│                    │                    │
(Prerequisite)  ┌───────────────────────────┐  (Alternative)
setup.py File   │ Installing a Local Package│  pip install -e .
                └───────────────────────────┘
                     │
                     ▼
                (Result)
          Environment-Level Import
```
```


- This command relies entirely on a properly configured `[[Python - setup.py File|setup.py file]]` to know what to install and what dependencies are required.
- The `pip install .` command is a key step in achieving `[[Python - Package Portability|package portability]]`, as it simulates how an end-user would install the package.
- While `pip install .` installs dependencies from `install_requires` in `setup.py`, the related command `pip install -r requirements.txt` is used for `[[Python - Installing Dependencies from requirements.txt|installing development dependencies]]` from a `[[Python - requirements.txt File|requirements.txt file]]`.
- The core logic for parsing the setup file is handled by the `[[Python - setuptools Package|setuptools package]]`, which `pip` calls under the hood.

## Deeper Questions

- You're deciding between instructing your development team to use `pip install .` versus `pip install -e .` for their local work. What are the business impacts of this choice in terms of development speed, testing reliability, and the risk of shipping bugs to production?
- In a CI/CD pipeline, you need to build and test your package before publishing. How would you design the build stage to ensure that the `pip install .` command runs in a clean, isolated environment and that all dependencies specified in `setup.py` are correctly resolved without conflicting with the CI runner's system Python?
- What if the `pip` command itself was fundamentally broken or untrusted? How would you manually replicate the process of `pip install .` to get your package's code into an environment's `site-packages` directory and make it importable?