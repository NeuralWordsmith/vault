---
tags: 
  - core
  - python
  - scope
  - namespace
  - global_variables
  - module_level
  - legb
  - concept
source: 
  - "[[Introduction to Functions in Python]]"
related: 
  - "[[Python - Scope]]"
  - "[[Python - Local Scope]]"
  - "[[Python - Built-in Scope]]"
  - "[[Python - Name Resolution Order]]"
  - "[[Python - global Keyword]]"
  - "[[Python - Variables]]"
  - "[[Python - User-Defined Functions]]"
  - "[[Python - Functions]]"
  - "[[Python - Packages]]"
  - "[[Fundamental - Programming]]"
  - "[[Python - Objects]]"
  - "[[Python - Key Characteristics]]"
---
# Core: Global Scope

## Summary

>The global scope refers to the main body of a Python script. Any variable defined at this top level is considered 'global' and can be accessed from anywhere within that script, including inside functions and classes. This is the outermost scope layer, distinct from the more restricted [[Python - Local Scope|local scope]] found inside functions.

**Why This Matters:** Understanding global scope is crucial for managing shared data and configuration across different parts of a program, preventing bugs caused by unintended variable modifications.

_Analogy:_ _Imagine a small town's community hall. On the main wall, there's a large public announcement board. Any message posted on this board can be read by anyone in the town hall, whether it's the mayor in their office or a resident attending a meeting. This public board is the global scope._

• **The Town Hall:** Represents the entire Python script file (`.py`).
• **The Public Announcement Board:** Represents the global scope.
• **The Announcements (e.g., 'Meeting at 5 PM'):** These are the global variables.
• **People in the Hall (Mayor, Librarian, etc.):** These are the functions and classes within the script. They can all read the announcements.
• **Where it breaks down:** In the analogy, anyone can walk up and change an announcement. In Python, while any function can *read* a global variable, it must explicitly declare its intention with the `[[Python - global Keyword|global keyword]]` to *modify* it. This is like needing special permission from the town clerk before you can change the public notice.

```
+------------------------------------ SCRIPT (config.py) -----------------------------------+
|                                                                                           |
|  GLOBAL SCOPE                                                                             |
|  `api_key = "ABC-123"`                                                                    |
|  `timeout = 30`                                                                           |
|                                                                                           |
|  +--------------------------------- FUNCTION (fetch_data) -----------------------------+  |
|  |                                                                                     |  |
|  |  LOCAL SCOPE                                                                        |  |
|  |  `url = "..."`                                                                      |  |
|  |                                                                                     |  |
|  |  (Can freely read global `api_key` and `timeout`)                                   |  |
|  |  (To modify `timeout`, would need `global timeout`)                                 |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+
```

## Details

In Python, the global scope is the environment where all top-level variables, functions, and class definitions reside. When you create a variable in the main body of a script—not inside any function—it is automatically placed in this global namespace. This makes it a foundational concept in Python's [[Python - Scope|scoping rules]], which determine how and where a variable can be accessed, following the [[Python - Name Resolution Order|LEGB rule]] (Local, Enclosing, Global, Built-in).

#### Primary Goal

To provide a mechanism for defining variables and objects that need to be accessible throughout an entire script or module, acting as a shared namespace.

#### Mechanism

- **How it Works:**
    1. **Definition:** When you assign a value to a variable at the outermost level of a Python file, the Python interpreter creates that variable within the module's global scope.
    2. **Read Access:** Any function or class defined within that same file can directly read the value of a global variable. Python's name resolution will look for the variable in the local scope first, and if it's not found, it will proceed to check the enclosing, global, and finally the [[Python - Built-in Scope|built-in scope]].
    3. **Write Access:** If a function needs to modify a global variable, it must first declare its intent using the `global` keyword. Without this declaration, assigning a value to that name would create a new *local* variable, shadowing the global one.

##### Code Translation

```python
# --- Step 1: Define a variable in the global scope ---
# This variable is defined in the main body of the script.
app_version = "1.0.0"

# --- Step 2: Read the global variable from a function ---
# This function can access 'app_version' without any special keyword.
def print_version():
    # Python looks for 'app_version' locally, fails, and finds it in the global scope.
    print(f"Application Version (read from global): {app_version}")

# --- Step 3: Attempt to modify the global variable without the 'global' keyword ---
# This creates a new LOCAL variable and does NOT change the global one.
def local_change_attempt():
    app_version = "2.0.0" # This is a new variable local to this function.
    print(f"Inside local_change_attempt, version is: {app_version}")

# --- Step 4: Correctly modify the global variable using the 'global' keyword ---
def release_new_version():
    global app_version # Explicitly state we are modifying the global variable.
    app_version = "1.1.0"
    print(f"New version released! Global version is now: {app_version}")

# --- Execution Flow ---
print("--- Initial State ---")
print_version() # Prints "1.0.0"

print("\n--- Attempting Local Change ---")
local_change_attempt() # Prints "2.0.0" inside the function
print_version() # Still prints "1.0.0", the global variable was unaffected.

print("\n--- Performing Global Change ---")
release_new_version() # Prints "1.1.0"
print_version() # Now prints "1.1.0", the global variable has been changed.
```

 [[Code - Global Scope Implementation|View Full Implementation & Analysis]]

#### Core Trade-offs

- **Pro (Convenience):** For small scripts or defining module-level constants (e.g., `PI = 3.14159`), global variables offer a simple way to make data available everywhere without passing it through many function calls.
    - *Example: A single script for data analysis might define input and output file paths as global constants for easy access by multiple functions.*
- **Con (Reduced Readability):** Functions that rely on global variables have hidden dependencies. It's not clear from the function's signature what external state it depends on, making the code harder to understand and reason about.
    - This is often called 'action at a distance', where a change in one part of the code can unexpectedly affect a completely different part.
- **Con (Increased Complexity and Bugs):** Overuse of global variables makes code difficult to debug and maintain. Since any function can potentially modify the global state, tracking down incorrect values becomes a major challenge in larger applications.
    - It also makes functions harder to test in isolation, as you need to set up the entire global state before you can test a single function's behavior.

## Connections

```
                      (Parent)
                        Scope
                          ▲
                          │
    ┌─────────────────────┼─────────────────────┐
    │                     │                     │
(Contrasts With) ┌──────────────────┐ (Contrasts With)
  Local Scope    │   Global Scope   │   Built-in Scope
                 └──────────────────┘
                          │
                          │
                   (Modified By)
                  global Keyword
```

### Parent Concept

It is a fundamental type of [[Python - Scope|scope]], which defines the visibility and lifetime of a variable within a program.

### Child Concepts

- The global scope does not have distinct sub-types, but it serves as the container for all top-level objects in a module, including function and class definitions.

### Related Concepts 

- It directly contrasts with [[Python - Local Scope|local scope]], where variables are only accessible within the function they are defined in.
- The [[Python - Name Resolution Order|LEGB rule]] dictates that Python checks the global scope after the local and enclosing scopes but before the [[Python - Built-in Scope|built-in scope]].
- Modifying a global variable from within a function requires the explicit use of the [[Python - global Keyword|global keyword]] to prevent the creation of a new local variable.
## Questions

- You're building a configuration management system for a large application. When would you choose to store configuration settings as global variables versus passing a configuration object explicitly to every function that needs it? How would you justify the long-term maintenance cost of your choice?
- If two different modules in a large Python application both define a global variable with the same name (e.g., `CONFIG`), and one module imports the other, what determines which variable is accessed? How would you design your application to prevent such naming collisions and ensure predictable behavior?
- What if Python had no global scope, and every piece of data had to be explicitly passed into a function's local scope to be used? What new programming patterns would emerge, and how would it fundamentally change the way we structure large applications?