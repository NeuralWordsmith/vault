---
tags: 
  - major_core
  - python
  - single responsibility principle
  - srp
  - refactoring
  - modularity
  - cohesion
  - concept
source: 
  - "[[Writing Functions in Python]]"
related: 
  - "[[Fundamental - Software Engineering]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[SWE - Refactoring]]"
  - "[[SWE - Code Smells]]"
  - "[[Python - User-Defined Functions]]"
  - "[[Python - Benefits of Single Responsibility Functions]]"
  - "[[Fundamental - Programming]]"
  - "[[SWE - Problems with Repeated Code]]"
  - "[[SWE - Repeated Code & Functions Relationship]]"
  - "[[SWE - Code Smells & Refactoring Relationship]]"
  - "[[Python - Scope]]"
  - "[[Fundamental - Computer Science]]"
---
# Major Core: Do One Thing Principle

## Summary

> The "Do One Thing" principle, also known as the Single Responsibility Principle (SRP), states that every function, class, or module should have a single, well-defined responsibility. A function should be focused on one task and one task only. Violating this is a common [[SWE - Code Smells|code smell]] that often requires [[SWE - Refactoring|refactoring]] to fix. This principle complements the [[SWE - DRY (Don't Repeat Yourself) Principle|DRY principle]] by promoting modular, reusable code units.

**Why This Matters:** Adhering to the "Do One Thing" principle makes code easier to understand, test, and reuse, which significantly reduces the cost and effort of long-term software maintenance.

_Analogy:_ _A function that does too many things is like a Swiss Army Knife. It has a blade, a screwdriver, a can opener, and tweezers. While versatile, if you need to chop vegetables for a meal, a dedicated chef's knife is far more effective, efficient, and safer. If you need to assemble furniture, a proper screwdriver provides better torque and control. The `load_and_plot` function is the Swiss Army Knife—it combines multiple tools, but each task would be better served by a specialized instrument._

*   **Where it breaks down:** The tools on a Swiss Army Knife are physically separate and don't interfere with each other. In a function that does too much, the different responsibilities (like data loading and plotting) are often tangled together with shared variables and logic, making them much harder to separate or modify independently than simply folding out a different tool.

```
Original Function:
┌──────────────────────────┐
│     load_and_plot()      │
│--------------------------│
│  - Load data from CSV    │
│  - Perform PCA           │
│  - Plot results          │
└──────────────────────────┘

        │
        ▼ Refactor
        
New Functions:
┌────────────────┐      ┌────────────────┐
│   load_data()  │      │   plot_pca()   │
│----------------│      │----------------│
│ - Load data    │      │ - Perform PCA  │
│ - Return X, y  │      │ - Plot results │
└────────────────┘      └────────────────┘
```

## Details

The "Do One Thing" principle is a fundamental concept in [[Fundamental - Software Engineering|software engineering]] that dictates a unit of code should have only one reason to change. The provided example of `load_and_plot` clearly violates this by combining two distinct responsibilities: data loading and data visualization. This entanglement makes the code less modular, harder to test (how do you test just the loading part?), and less reusable (what if you want to load the data but not plot it?). Recognizing and fixing such violations through [[SWE - Refactoring|refactoring]] is a key skill for writing clean, maintainable code and is the primary way to realize the [[Python - Benefits of Single Responsibility Functions|benefits of single-responsibility functions]].

#### Primary Goal

To increase code modularity and cohesion, making individual components easier to understand, test, reuse, and maintain.

#### Mechanism

- **Step 1: Identify the Responsibilities**
    - Analyze the original `load_and_plot` function. It clearly has two distinct jobs: (1) Loading data from a CSV file and separating features/labels, and (2) Performing PCA and plotting the results.
- **Step 2: Create a Function for Each Responsibility**
    - Create a new, focused function for each identified task. The first will be `load_data(path)`, and the second will be `plot_pca(X)`.
- **Step 3: Refactor the Logic into New Functions**
    - Move the data loading code into `load_data` and the plotting code into `plot_pca`. Ensure each new function has clear inputs and outputs, breaking the tight coupling of the original function.
- **Step 4: Compose the Functions (Optional)**
    - If the original combined behavior is still needed elsewhere, create a new coordinator function that calls the smaller, single-responsibility functions in sequence. This maintains the original workflow while keeping the underlying logic clean and modular.

```python
# --- Before Refactoring (Violates "Do One Thing") ---
def load_and_plot(path):
    """Load a dataset and plot the first two principal components."""
    # Responsibility 1: Load Data
    data = pd.read_csv(path)
    y = data['label'].values
    X = data[col for col in data.columns if col != 'label'].values
    
    # Responsibility 2: Plot Data
    pca = PCA(n_components=2).fit_transform(X)
    plt.scatter(pca[:,0], pca[:,1])
    
    return X, y

# --- After Refactoring (Adheres to "Do One Thing") ---

# --- Step 2 & 3: Create focused functions ---
def load_data(path):
    """Load features and labels from a CSV file."""
    data = pd.read_csv(path)
    y = data['label'].values
    X = data.drop('label', axis=1).values
    return X, y

def plot_pca(X):
    """Plot the first two principal components of a feature matrix."""
    pca = PCA(n_components=2).fit_transform(X)
    plt.scatter(pca[:,0], pca[:,1])
    plt.xlabel("Principal Component 1")
    plt.ylabel("Principal Component 2")
    plt.title("PCA of Dataset")
    plt.show()

# --- Step 4: Compose the functions ---
def main_workflow(path):
    """Main workflow to load data and plot PCA."""
    features, labels = load_data(path)
    plot_pca(features)
```

 [[Code - Do One Thing Principle Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Guideline: Cohesion**
    - A function's lines of code should all work together to achieve a single, unified purpose. If you can split the code into distinct groups that don't interact much, it's a sign the function is doing too much.
- **Guideline: Abstraction Level**
    - All operations within a function should be at the same level of abstraction. The example function mixes low-level data manipulation with high-level plotting, which is a red flag.
- **Guideline: Function Naming**
    - If you have to use "and" in the function name (e.g., `load_and_plot`), it's a strong indicator that it's doing more than one thing.

#### Core Trade-offs

- **Pro: Improved Readability & Maintainability**
    - Smaller, focused functions are easier to read, understand, and debug. Changes to one responsibility (e.g., changing the plot style) don't risk breaking another (e.g., the data loading logic).
- **Pro: Enhanced Reusability**
    - The `load_data` function can now be reused in any part of the codebase that needs to load that specific data format, without the unwanted side effect of creating a plot.
- **Pro: Simplified Testing**
    - It's trivial to write a unit test for `load_data` to ensure it returns the correct arrays. Testing the plotting function is also simpler. Testing the original combined function is more complex.
- **Con: Increased Function Count**
    - Strictly adhering to the principle can lead to a larger number of small functions. This can sometimes make it harder to follow the high-level control flow if not organized well with clear naming and structure.

## Connections

```
                  (Parent)
         Software Engineering
                   ▲
                   │
    ┌──────────────┼────────────────┐
    │              │                │
(Related)   ┌───────────────────────────┐   (Related)
DRY Principle │  Do One Thing Principle   │   Refactoring
            └───────────────────────────┘
                       │
                       ▼ (Leads To)
                 Modular Design
```

### Parent Concept

This principle is a cornerstone of [[Fundamental - Software Engineering|software engineering]], guiding the design of clean, maintainable, and robust systems.

### Child Concepts

- Application of this principle leads directly to concepts like *modular programming* and *microservices architecture*, where components are designed to have a single, well-defined responsibility.

### Related Concepts 

- This principle is closely related to the [[SWE - DRY (Don't Repeat Yourself) Principle|DRY principle]], as functions that do too much often contain logic that could be generalized and reused, thus avoiding repetition.
- Violating this principle is a common type of [[SWE - Code Smells|code smell]], indicating a potential problem in the codebase that needs attention.
- The process of modifying code to adhere to this principle is known as [[SWE - Refactoring|refactoring]].
- Understanding the [[SWE - Code Smells & Refactoring Relationship|relationship between code smells and refactoring]] is crucial for applying this principle effectively in practice.
- Adhering to this principle is a primary way to achieve the [[Python - Benefits of Single Responsibility Functions|benefits of single-responsibility functions]], such as improved testability and reusability.
## Questions

- Imagine you're on a tight deadline for a proof-of-concept demo. You've written a function like `load_process_train_and_evaluate` that gets the job done quickly. When do you decide to invest the time to refactor it into single-responsibility functions, and how would you justify that 'non-feature' work to a project manager focused solely on the deadline?
- If the `load_data` part of a function becomes a major bottleneck (e.g., loading terabytes of data), how does having it as a separate, single-responsibility function make it easier to scale or optimize (e.g., by moving it to a distributed Spark job) compared to if it were entangled with plotting logic?
- What if you were working in a purely functional programming language with extreme constraints on function length (e.g., max 5 lines). Would the 'Do One Thing' principle become redundant, or would it manifest in a different way, perhaps at the level of function composition?
