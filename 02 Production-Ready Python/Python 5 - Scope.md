---
tags: 
  - major_core
  - python
  - namespace
  - legb
  - encapsulation
  - variable_lifetime
  - name_resolution
  - concept
source: 
  - "[[Writing Functions in Python]]"
related: 
  - "[[Python - Scope Resolution (LEGB Rule)]]"
  - "[[Python 5 - Local Scope]]"
  - "[[Python 5 - Global Scope]]"
  - "[[Python 5 - Built-in Scope]]"
  - "[[Python - Nonlocal Scope]]"
  - "[[Python 5 - global Keyword]]"
  - "[[Python 5 - nonlocal Keyword]]"
  - "[[Python - Nested Functions]]"
  - "[[Python - Variables]]"
  - "[[Python - Functions]]"
  - "[[Fundamental - Programming]]"
  - "[[Python - User-Defined Functions]]"
  - "[[Python - Closures]]"
  - "[[Python - Decorators]]"
---
# Major Core: Scope

## Summary

> Scope refers to the region in a program where a variable is accessible or 'visible'. Python uses a strict set of rules to determine which variable you are referring to when a name is used, ensuring that variables defined in one part of a program don't unintentionally interfere with variables in another. This system of organization is governed by the [[Python - Scope Resolution (LEGB Rule)|LEGB rule]], which defines the order in which Python searches for a variable across different scopes like [[Python 5 - Local Scope|local]], [[Python - Nonlocal Scope|nonlocal]], [[Python 5 - Global Scope|global]], and [[Python 5 - Built-in Scope|built-in]].

**Why This Matters:** Understanding scope is critical for writing bug-free, predictable, and maintainable code by preventing variable name collisions in complex programs.

_Analogy:_ _Think of Python scope like a multi-level office building. The 'Built-in' scope is the universal laws of physics and business that apply everywhere (e.g., gravity, the concept of profit). The 'Global' scope is the company-wide address book and resources available to everyone in the building. An 'Enclosing' scope is a specific department's floor, with resources shared among its teams. Finally, the 'Local' scope is your personal desk, with your own notes and tools that only you can access directly._

When you need a piece of information (a variable), you first check your desk (Local). If it's not there, you check your department's resources (Enclosing). If still not found, you check the company-wide address book (Global). Finally, you rely on universal principles (Built-in). 

**Where it breaks down:** Unlike an office, you can't easily change a company-wide policy (a global variable) from your desk (a local scope). You need special permission, which in Python is analogous to using the `[[Python 5 - global Keyword|global]]` or `[[Python 5 - nonlocal Keyword|nonlocal]]` keywords.

```
Built-in Scope (e.g., print(), len())
┌───────────────────────────────────────────────────┐
│ Global Scope (e.g., company_policy)               │
│ ┌───────────────────────────────────────────────┐ │
│ │ Enclosing Scope (e.g., department_rule)      │ │
│ │ ┌───────────────────────────────────────────┐ │ │
│ │ │ Local Scope (e.g., meeting_topic)       │ │ │
│ │ │                                           │ │ │
│ │ └───────────────────────────────────────────┘ │ │
│ └───────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────┘
```

## Details

Scope is the foundational concept that defines the accessibility and lifetime of variables in Python. When you create a variable, it only exists within a specific context or 'namespace'. This prevents a situation where a variable `x` inside a function accidentally overwrites a different variable `x` outside of it. Python's scoping rules provide a clear hierarchy for how it looks for a variable when it's called. The primary types of scope, ordered from narrowest to broadest, are **Local**, **Enclosing (Nonlocal)**, **Global**, and **Built-in**.

#### Primary Goal

To provide a structured namespace system that prevents naming conflicts and makes code more predictable and modular by controlling where variables can be accessed and modified.

#### Mechanism

- **How it Works:**
    - When your code references a variable name, the Python interpreter performs a search to find what that name refers to. This search follows a strict order, as defined by the [[Python - Scope Resolution (LEGB Rule)|LEGB Rule]]. It checks the scopes sequentially until the variable is found. If the interpreter searches all four scopes and doesn't find the variable, it raises a `NameError`.
- **The Four Scopes:**
    - **Local (L):** The innermost scope. It includes variables defined inside the current function. A new local scope is created every time a function is called. See [[Python 5 - Local Scope]].
    - **Enclosing (E):** Also known as nonlocal scope. This applies to nested functions. It's the scope of the outer function, which the inner function can access. See [[Python - Nonlocal Scope]].
    - **Global (G):** The top-level scope of a module or script. Variables defined here are accessible from anywhere within that module. See [[Python 5 - Global Scope]].
    - **Built-in (B):** The outermost scope. It contains all the names that are pre-loaded into Python, such as the `print()`, `len()`, and `str()` functions. See [[Python 5 - Built-in Scope]].

```python
# --- Global Scope (G) ---
company_policy = "All reports due on Friday."

def department():
    # --- Enclosing Scope (E) ---
    department_rule = "Use the blue cover sheet."

    def team_meeting():
        # --- Local Scope (L) ---
        meeting_topic = "Project Phoenix status."
        
        # Accessing variables from all scopes
        print(f"Local: {meeting_topic}")
        print(f"Enclosing: {department_rule}")
        print(f"Global: {company_policy}")
        
        # --- Built-in Scope (B) ---
        # The 'print' function itself is from the built-in scope
        num_chars = len(company_policy) # 'len' is also built-in
        print(f"Built-in: The policy has {num_chars} characters.")

    team_meeting()

department()
```

 [[Code - Scope Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`global` Keyword:**
    - Allows you to modify a variable from the global scope within a local scope. Without it, assigning a value to a variable inside a function creates a new local variable with the same name. See [[Python 5 - global Keyword]].
- **`nonlocal` Keyword:**
    - Allows you to modify a variable from an enclosing (but not global) scope within a nested function. This is essential for creating stateful inner functions. See [[Python 5 - nonlocal Keyword]].

#### Core Trade-offs

- **Benefit: Encapsulation and Readability**
    - Scope prevents unintended side effects by isolating variables within functions. This makes code easier to reason about, debug, and maintain, as you know a function's operations won't accidentally alter the state of the entire program.
- **Limitation: Variable Shadowing**
    - A variable in an inner scope can have the same name as a variable in an outer scope. This is called 'shadowing'. The inner variable takes precedence, which can be a source of subtle bugs if not done intentionally.
- **Complexity: Explicit Modification**
    - The need for `global` and `nonlocal` keywords to modify outer scopes adds a layer of complexity. While this enforces explicitness, it can make the flow of data harder to track if overused, violating the principle of encapsulation.

## Connections

```
                      (Parent)
               Fundamental - Programming
                         ▲
                         │
┌────────────────────────┼────────────────────────┐
│                        │                        │
(Defines accessibility of) ┌───────────────┐ (Creates new scopes)
[[Python - Variables|Variables]]   │     Scope     │   [[Python - Functions|Functions]]
                         └───────────────┘
                                │
                 ┌──────────────┴──────────────┐
                 │                             │
(Governed By) [[Python - Scope Resolution (LEGB Rule)|LEGB Rule]]   (Types of Scope)
                                               │
                               ┌───────────────┴───────────────────┐
                               │                 │                 │
                 [[Python 5 - Local Scope|Local]]   [[Python 5 - Global Scope|Global]]   [[Python - Nonlocal Scope|Nonlocal]]
```

### Parent Concept

Scope is a fundamental concept in [[Fundamental - Programming]] that governs how identifiers (like variable names) are mapped to objects.

### Child Concepts

- The narrowest scope is the [[Python 5 - Local Scope|local scope]], which is created inside a function call.
- For nested functions, the [[Python - Nonlocal Scope|nonlocal scope]] allows an inner function to access variables from its containing (enclosing) function.
- The [[Python 5 - Global Scope|global scope]] contains variables defined at the top level of a Python script or module.
- The broadest scope is the [[Python 5 - Built-in Scope|built-in scope]], which holds all of Python's standard functions and exceptions.

### Related Concepts 

- The precise order of searching through these scopes is defined by the [[Python - Scope Resolution (LEGB Rule)|LEGB Rule]].
- The concept of a nonlocal scope is most relevant in the context of [[Python - Nested Functions|nested functions]], where one function is defined inside another.
- [[Python - Variables|Variables]] are the actual objects whose accessibility and lifetime are determined by scope rules.
- [[Python - Functions|Functions]] are the primary mechanism in Python for creating new local scopes.
- The [[Python 5 - global Keyword|global keyword]] provides an explicit way to bypass local scope rules and modify a global variable.
- Similarly, the [[Python 5 - nonlocal Keyword|nonlocal keyword]] is used to modify a variable in the nearest enclosing scope.
## Questions

- You're refactoring a large, legacy script that heavily uses global variables for state management. What are the business risks of this approach (e.g., maintenance cost, bug introduction), and how would you justify the time investment to refactor it towards a more encapsulated, scope-aware design to a project manager?
- In a large, multi-threaded application, how can the overuse of the `global` keyword lead to race conditions and non-deterministic bugs? What architectural patterns (like passing state explicitly or using thread-local storage) would you use to mitigate these issues?
- What if Python had only one scope (a single global scope)? What fundamental programming patterns like recursion or object-oriented encapsulation would become difficult or impossible to implement, and what new kinds of bugs would become common?
