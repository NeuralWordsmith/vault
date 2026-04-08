---
tags: 
  - core
  - python
  - software_engineering
  - code_maintainability
  - abstraction
  - refactoring
  - design_principle
  - concept
source: 
  - "[[Writing Functions in Python]]"
related: 
  - "[[Fundamental - Software Engineering]]"
  - "[[SWE - Do One Thing Principle]]"
  - "[[Python - User-Defined Functions]]"
  - "[[Python - Decorators & DRY Principle Relationship]]"
  - "[[Python - When To Use Decorators]]"
  - "[[Python - Timer Decorator]]"
  - "[[Python - Memoization]]"
  - "[[Python - Memoizing Decorator]]"
  - "[[Python - Functions]]"
  - "[[Python - Scope]]"
  - "[[Fundamental - Programming]]"
  - "[[Fundamental - Computer Science]]"
---
# Core: DRY (Don't Repeat Yourself) Principle

## Summary

>The 'Don't Repeat Yourself' (DRY) principle is a fundamental concept in software development focused on reducing the repetition of software patterns, logic, or information. It advocates that every piece of knowledge or logic must have a single, unambiguous, authoritative representation within a system. This is achieved by abstracting common code into a reusable unit, such as a function or class.

**Why This Matters:** Adhering to the DRY principle significantly reduces the chance of introducing bugs during updates because a change only needs to be made in one authoritative place, ensuring consistency across the entire system.

_Analogy:_ _Imagine a cookbook where, for every single cake recipe, the author rewrites the full, detailed instructions for making vanilla frosting from scratch. If the author later discovers a better way to make the frosting, they would have to find and update every single cake recipe. A DRY approach is like having a separate, master recipe for 'Classic Vanilla Frosting' on page 10. Each cake recipe that needs it simply says, 'Prepare one batch of Classic Vanilla Frosting (see page 10)'. Now, if the frosting recipe is improved, it only needs to be updated in one single place._

In this analogy:
- **Repetitive Frosting Instructions:** This represents duplicated code or logic scattered throughout an application.
- **Master 'Classic Vanilla Frosting' Recipe:** This is the abstracted, single source of truth—a function, class, or module.
- **'See page 10' Reference:** This is the call to the reusable function or instantiation of a class.
- **Updating the Master Recipe:** This is like fixing a bug or adding a feature in the single, abstracted piece of code.
- **Where it breaks down:** The analogy doesn't fully capture the cost of abstraction. In software, creating a new 'master recipe' (a function or class) can sometimes add more complexity than it removes, especially if the repeated code isn't exactly identical or is only used twice. Deciding when to abstract is a key engineering judgment.

```
WET Code (Before DRY)
+-------------------------+      +-------------------------+
| Code for Task A         |      | Code for Task B         |
| ...                     |      | ...                     |
| [Repetitive Logic]      |      | [Repetitive Logic]      |
| ...                     |      | ...                     |
+-------------------------+      +-------------------------+

         │
         ▼

DRY Code (After Abstraction)
+-------------------------+      +-------------------------+
| Code for Task A         |      | Code for Task B         |
| ...                     |      | ...                     |
| call(Shared_Function)   |----->| [Shared_Function]       |
| ...                     |      |   - Repetitive Logic    |
+-------------------------+ <-----| ...                     |
                                 +-------------------------+
                                  (Single Source of Truth)
```

## Details

The DRY principle is a cornerstone of maintainable software design, aiming to eliminate redundancy. Instead of copying and pasting code to perform the same task in multiple locations, the logic should be encapsulated within a single, reusable component. This not only saves time but, more importantly, makes the codebase easier to manage, debug, and evolve. When a piece of logic needs to be changed, it only has to be done in one location, preventing inconsistencies and bugs that arise from forgetting to update one of the copies. This principle is closely related to other ideas like the [[SWE - Do One Thing Principle]] and is often implemented using patterns like decorators, as explored in [[Python - Decorators & DRY Principle Relationship]].

#### Primary Goal

To reduce code repetition in order to improve maintainability, increase readability, and minimize the risk of bugs caused by inconsistent logic.

#### Mechanism

- **How it Works:** The process of applying the DRY principle generally follows three steps:
    1.  **Identify Repetition:** The developer notices that the same or very similar blocks of code appear in multiple places in the codebase.
    2.  **Abstract the Logic:** The repeated logic is extracted and placed into its own distinct unit. This unit is given a clear name that describes its purpose.
    3.  **Reuse (Call) the Abstraction:** The original locations of the repeated code are replaced with a single call to the new, reusable unit.
- **Common Abstraction Techniques:**
    - **Functions:** The most common way to apply DRY. A block of code that performs a specific task is wrapped in a function, which can then be called from anywhere.
        - *Example: A function to calculate and format a user's age based on their birthdate.*
    - **Classes:** Grouping related data and functions (methods) together. If you find yourself passing the same set of data to multiple functions, it might be a sign that they should be bundled into a class.
        - *Example: A `User` class that contains user data and methods like `calculate_age()` and `format_address()`.*
    - **Decorators:** A powerful Python feature for adding functionality to existing functions without modifying their source code. This is a prime example of DRY, as it avoids repeating setup/teardown code (like timing or logging) for multiple functions. This is a key aspect of the [[Python - Decorators & DRY Principle Relationship|relationship between decorators and DRY]].
        - *Example: Using a [[Python - Timer Decorator|timer decorator]] to measure the execution time of several different functions without rewriting the timing logic in each one.*

##### Code Translation

```python
# --- BEFORE (WET - Write Everything Twice) ---
# The logic for calculating and printing a discount is repeated.

def process_order_A(price, quantity):
    total = price * quantity
    discount = 0
    if total > 100:
        discount = total * 0.10
    final_price = total - discount
    print(f"Order A Final Price: ${final_price:.2f}")

def process_order_B(price, quantity):
    total = price * quantity
    discount = 0
    if total > 100:
        discount = total * 0.10
    final_price = total - discount
    print(f"Order B Final Price: ${final_price:.2f}")

process_order_A(50, 3)
process_order_B(20, 4)


# --- AFTER (DRY - Don't Repeat Yourself) ---
# Step 1 & 2: Identify and abstract the repeated logic into a function.

def calculate_final_price(price, quantity):
    """Calculates the final price after applying a discount for totals over 100."""
    total = price * quantity
    discount = 0
    if total > 100:
        discount = total * 0.10
    return total - discount

# Step 3: Reuse the abstraction.
def process_dry_order_A(price, quantity):
    final_price = calculate_final_price(price, quantity)
    print(f"Order A Final Price: ${final_price:.2f}")

def process_dry_order_B(price, quantity):
    final_price = calculate_final_price(price, quantity)
    print(f"Order B Final Price: ${final_price:.2f}")

process_dry_order_A(50, 3)
process_dry_order_B(20, 4)
```

 [[Code - DRY (Don't Repeat Yourself) Principle Implementation|View Full Implementation & Analysis]]

#### Key Parameters



#### Core Trade-offs

- **Pro: Increased Maintainability**
    - Changes only need to be made in one place, drastically reducing the effort required for updates and the likelihood of introducing bugs.
- **Pro: Improved Readability**
    - Well-named abstractions (like `calculate_final_price`) make the code's intent clearer than a block of raw calculation logic.
- **Con: Risk of Over-Abstraction**
    - Applying DRY too aggressively or prematurely can lead to complex, tightly coupled code that is difficult to understand and modify. This is sometimes called 'AHA' (Avoid Hasty Abstractions).
- **Con: Incorrect Abstraction**
    - If two pieces of code look similar but represent different business concepts, abstracting them together can be a mistake. When their requirements diverge later, untangling the shared abstraction can be very difficult.

## Connections

```
                      (Parent)
            Fundamental - Software Engineering
                         ▲
                         │
           ┌─────────────┼─────────────┐
           │             │             │
(Related Principle) ┌───────────────────────────────────┐ (Related Pattern)
Do One Thing        │ DRY (Don't Repeat Yourself) Principle │ Decorators & DRY Relationship
                    └───────────────────────────────────┘
                                 │
                      ┌──────────┴──────────┐
                      │                     │
(Implementation) User-Defined Functions   (Implementation) Memoization
```

### Parent Concept

The DRY principle is a foundational concept within [[Fundamental - Software Engineering|software engineering]], guiding developers on how to write clean, scalable, and maintainable code.

### Child Concepts

- [[Python - User-Defined Functions|User-defined functions]] are the most direct and common implementation of the DRY principle, encapsulating a piece of logic to be reused.
- The [[Python - Decorators & DRY Principle Relationship|use of decorators]] is a more advanced application of DRY, allowing for the reuse of cross-cutting concerns like logging, timing, or caching across multiple functions.

### Related Concepts 

- The [[SWE - Do One Thing Principle|'Do One Thing' principle]] is a complementary concept, suggesting that a function or module should have a single, well-defined responsibility, which often makes it easier to apply DRY effectively.
- The [[Python - Decorators & DRY Principle Relationship|relationship between decorators and DRY]] is very strong, as decorators are a primary pattern for applying shared functionality without repeating code.
- [[Python - When To Use Decorators|Knowing when to use decorators]] often involves identifying repetitive setup or teardown code that can be abstracted away, which is a direct application of DRY thinking.
- [[Python - Memoization|Memoization]] is a specific optimization technique that embodies the DRY principle by storing the results of expensive function calls and reusing the cached result when the same inputs occur again, thus avoiding repeated computation.
## Questions

- You've identified two similar-looking blocks of code in a critical performance path. Applying DRY would introduce an extra function call, adding a small amount of overhead. When would you choose to violate DRY for performance, and how would you document this 'technical debt' to justify the decision to your team and future developers?
- In a large microservices architecture, multiple services need to perform the same complex business validation logic. How would you apply the DRY principle across service boundaries without creating a single point of failure or a tightly coupled 'shared library' monolith that slows down independent deployment?
- What if a new programming paradigm emerged where modifying code was computationally 'free' and instantaneous across an entire codebase (e.g., an AI refactoring agent could perfectly and instantly update all copies of a logic block). Would the DRY principle still hold the same value, or are its benefits purely tied to the limitations of human developers?