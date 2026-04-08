---
tags: 
  - core
  - python
  - encapsulation
  - api_stability
  - internal_methods
  - code_maintenance
  - technical_debt
  - concept
source: 
  - "[[Software Engineering Principles in Python]]"
related: 
  - "[[Python - Non-Public (Internal Use) Methods]]"
  - "[[Python - Single Leading Underscore Convention]]"
  - "[[Python - Packages]]"
  - "[[Python - Package Documentation]]"
  - "[[Python - Importing Packages]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[SWE - Software Engineering for Data Scientists]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Python - Docstrings]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Instance Methods 1]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Fundamental - Version Control]]"
---
# Core: Risks of Using Non-Public Methods

## Summary

>Using a non-public method means calling a function or method that a package developer intended only for internal use within their own code. This is a gamble because these methods are not part of the stable, documented public API and can change or disappear at any time, leading to broken code.

**Why This Matters:** Understanding the risks of using non-public methods is crucial for writing stable, maintainable code that doesn't break unexpectedly when dependencies are updated.

_Analogy:_ _Think of a restaurant. The public menu is the package's public API—stable, documented, and guaranteed. The non-public methods are like the secret, off-menu dishes the chefs make for themselves using special ingredients or techniques. You might convince a friendly waiter to get you one, but you can't complain if it's not available tomorrow, if the recipe changes, or if it gives you a stomach ache, because it was never meant for you in the first place._

**Where it breaks down:** In software, you can actually see the "secret recipes" (the source code) for non-public methods, whereas a restaurant's internal techniques are usually hidden. This visibility can create a false sense of security that the method is safe to use.

```
Your Codebase              | Third-Party Package
----------------------------------------------------
                            |
my_workflow()  ───────────► |  package.public_method()  (✅ Safe & Supported)
                            |
                            |
my_risky_code()  - - - - -► |  package._internal_helper() (❌ Unsafe & Unstable)
                            |
----------------------------------------------------
(Calls across the public API boundary)
```

## Details

In object-oriented programming, developers often create helper methods that are not meant for external use. In Python, this is communicated by convention, most commonly the `[[Python - Single Leading Underscore Convention|_single_leading_underscore]]` prefix (e.g., `_internal_helper()`). While the language doesn't prevent you from calling these `[[Python - Non-Public (Internal Use) Methods|non-public methods]]`, doing so means you are knowingly stepping outside the developer's intended public interface. You are using the package "at your own risk," as the developer makes no promises about the stability, documentation, or even existence of these methods in future versions. The two primary risks are **instability** and **lack of documentation**.

#### Primary Goal

To prevent future code breakages and reduce maintenance overhead by relying only on a library's stable, public Application Programming Interface (API).

#### Mechanism

- **The Core Risks:**
    - **1. Instability and Breaking Changes:**
        - The developer assumes no one else is using the method, so they feel free to change its name, the number or type of its input arguments, or the structure of its output at any time.
        - *Example: A `_calculate_metrics` method might return a dictionary in version 1.0. In version 1.1, the developer might refactor it to return a custom object instead. Any code you wrote that expected a dictionary will immediately break upon updating the package.*
    - **2. Lack of Documentation and Support:**
        - Non-public methods typically have minimal or no docstrings. You are left to guess how they work by reading the source code.
        - You cannot expect support from the developer if you have issues. Filing a bug report related to a non-public method will likely be closed with a "won't fix" resolution.

##### Code Translation

nothing to fill here

 [[Code - Risks of Using Non-Public Methods Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- There are no tunable parameters for this concept. The primary "lever" is a developer's choice:
    - **Respect the Convention:** Stick to the public, documented API for maximum stability.
    - **Ignore the Convention:** Access a non-public method to solve an immediate problem, but accept the long-term risk of your code breaking.

#### Core Trade-offs

- **Trade-off: Short-Term Gain vs. Long-Term Stability**
    - **Pro (Using Non-Public Method):** You might gain access to a specific piece of functionality or a performance optimization that isn't exposed through the public API, allowing you to solve a problem quickly.
    - **Con (Using Non-Public Method):** You create "technical debt." Your code becomes fragile and tightly coupled to the internal implementation of a dependency. Every time you update that package, you risk breaking your application, leading to difficult and time-consuming debugging sessions.

## Connections

```
                           (Parent)
               Non-Public (Internal Use) Methods
                              ▲
                              │
┌─────────────────────────────┼─────────────────────────────┐
│                             │                             │
(Convention)           ┌───────────────────────────────────┐           (Goal)
Single Leading         │ Risks of Using Non-Public Methods │      API Stability
Underscore             └───────────────────────────────────┘
```

### Parent Concept

This concept is a direct consequence of the existence of [[Python - Non-Public (Internal Use) Methods|non-public (internal use) methods]], detailing why developers should avoid using them.

### Child Concepts



### Related Concepts 

- The [[Python - Single Leading Underscore Convention|single leading underscore convention]] is the primary mechanism used in Python to signal that a method is non-public.
- Adhering to a package's public API is a key principle of good [[SWE - Software Engineering for Data Scientists|software engineering for data scientists]].
- Well-written [[Python - Package Documentation|package documentation]] clearly defines the public API, helping users avoid accidentally relying on internal methods.
## Questions

- Imagine you're facing a critical production bug, and the only known workaround involves calling a non-public method from a core library. How would you assess the risk, what temporary safeguards would you put in place, and how would you articulate the long-term technical debt to your product manager?
- You're leading a team and discover that junior developers are frequently using non-public methods from popular libraries like pandas or scikit-learn to get quick results. How would you design a code review process and what automated tooling (e.g., linters) could you implement to detect and discourage this practice at scale?
- What if a widely-used open-source package decided to make *all* its methods public by default, removing any distinction between internal and external APIs? What would be the immediate benefits and the catastrophic long-term consequences for the package's evolution and the stability of the ecosystem relying on it?