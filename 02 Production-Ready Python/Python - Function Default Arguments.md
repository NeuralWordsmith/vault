---
tags: 
  - core
  - python
  - optional_parameters
  - function_signature
  - keyword_arguments
  - api_design
  - function_defaults
  - concept
source: 
  - "[[Introduction to Functions in Python]]"
related: 
  - "[[Python - User-Defined Functions]]"
  - "[[Python - Functions]]"
  - "[[Python - Flexible Arguments (args)]]"
  - "[[Python - Function Generalization Process]]"
  - "[[Python - Keyword Arguments]]"
  - "[[Python - Positional Arguments]]"
  - "[[Python - Scope]]"
  - "[[Python - Data Types]]"
  - "[[Python - Lists]]"
  - "[[Python - Dictionaries]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Python - Docstrings]]"
---
# Core: Default Arguments

## Summary

>A default argument is a value provided in a function definition that is automatically assigned to a parameter if no argument is provided in the function call. This technique makes parameters optional. Defining default arguments is a key step in the [[Python - Function Generalization Process|process of making functions more general]] and serves as a more explicit alternative to using [[Python - Flexible Arguments (args)|flexible arguments]] when the optional parameters are known beforehand.

**Why This Matters:** Default arguments make functions more flexible and easier to use by providing sensible fallbacks, reducing the need for callers to specify every single parameter for common use cases.

_Analogy:_ _Ordering a combo meal at a fast-food restaurant is like using a function with default arguments. The standard combo comes with a burger, medium fries, and a medium soda. These are the 'defaults'. You can simply ask for 'Combo #1' and get this standard setup. However, you also have the option to override these defaults by saying, 'I'll have Combo #1, but with large fries and a diet soda.'_

In this analogy:
- **The Function Call:** Placing your order (e.g., 'Combo #1').
- **The Default Arguments:** The standard items (medium fries, medium soda).
- **The Function's Logic:** The kitchen staff preparing your meal.
- **Overriding the Defaults:** Specifying different items (large fries, diet soda).

**Where it breaks down:** The analogy doesn't capture the critical programming pitfall of using mutable objects (like a list or dictionary) as default arguments. In Python, a mutable default is like a single tray of fries shared by *every* customer who orders the default combo; if one customer takes a fry, it's gone for the next person, leading to unexpected shared state.

```
Function Call: create_user_profile("bob", notifications="sms")

       │
       ▼
┌──────────────────────────────────────────────────┐
│ Function `create_user_profile` is executed       │
│                                                  │
│ 1. `username` provided? Yes -> "bob"             │
│ 2. `is_active` provided? No  -> Use default: True│
│ 3. `notifications` provided? Yes -> "sms"        │
│                                                  │
└──────────────────────────────────────────────────┘
```

## Details

To define a function with a default argument, you simply assign a value to a parameter directly in the function's header using the equals sign (`=`). This makes the argument optional when the function is called. If the caller provides a value for that argument, the provided value is used; otherwise, the pre-defined default value is used. This is a fundamental technique in Python for creating robust, user-friendly, and backward-compatible functions.

#### Primary Goal

To increase a function's flexibility by making some parameters optional, simplifying its usage for common cases while still allowing for full customization when needed.

#### Mechanism

- **Step 1: Define the Function Signature**
    - In the `def` statement, list the function's parameters. For any parameter that should be optional, follow its name with an equals sign (`=`) and the desired default value.
- **Step 2: Place Default Arguments Last**
    - A critical syntax rule in Python is that all parameters with default values must be listed *after* all parameters that do not have default values. A `SyntaxError` will occur otherwise.
- **Step 3: Call the Function**
    - You can now call the function in multiple ways:
    1.  **Omitting the argument:** The function will automatically use the default value you defined.
    2.  **Providing the argument:** The value you provide in the call will override the default value.

##### Code Translation

```python
# --- Step 1 & 2: Define the function with a default argument placed last ---
def create_user_profile(username, is_active=True, notifications="email"):
    """Creates a user profile with default settings."""
    print(f"Creating profile for: {username}")
    print(f"  - Active Status: {is_active}")
    print(f"  - Notification Preference: {notifications}")
    print("---")

# --- Step 3: Call the function in different ways ---

# Call 1: Using all defaults for optional parameters
# 'is_active' will be True and 'notifications' will be "email"
print("Calling with minimal required info:")
create_user_profile("alice")

# Call 2: Overriding one default argument
# We specify 'notifications', so 'is_active' remains the default True
print("Calling while overriding one default:")
create_user_profile("bob", notifications="sms")

# Call 3: Overriding all default arguments
# We provide values for both 'is_active' and 'notifications'
print("Calling while overriding all defaults:")
create_user_profile("charlie", is_active=False, notifications="none")
```

 [[Code - Default Arguments Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Placement Rule**
    - Non-default arguments cannot follow default arguments. Python's parser needs to unambiguously map positional arguments, so it enforces that all required parameters come first.
    - *Correct:* `def func(required, optional=1):`
    - *Incorrect:* `def func(optional=1, required):` (This raises a `SyntaxError`)
- **Evaluation Time**
    - Default argument values are evaluated only **once**, when the function is defined (i.e., when the `def` statement is executed), not each time the function is called. This is the source of the 'mutable default argument' trap.

#### Core Trade-offs

- **Pro: Increased Flexibility and Readability**
    - Functions become easier to use for common scenarios, as the caller doesn't need to remember or provide every single argument. This simplifies the function's public API and improves code readability.
- **Con: The Mutable Default Argument Trap**
    - This is a major pitfall for new and experienced developers. If a mutable object like a `list` or `dict` is used as a default, that single object is shared across all calls to that function. Modifying it in one call will permanently alter the default for all subsequent calls, leading to unexpected and hard-to-debug behavior.
    - The standard practice is to use `None` as the default and create a new mutable object inside the function if the argument is `None`.
- **Con: Can Obscure Function Behavior**
    - Overusing default arguments, especially with many optional parameters, can make a function's behavior less explicit. A developer might not be aware of all the optional behaviors controlled by defaults without carefully reading the function's source code or documentation.

## Connections

```
                  (Parent)
         User-Defined Functions
                   ▲
                   │
    ┌──────────────┼────────────────┐
    │              │                │
(Complements)   ┌──────────────────┐   (Alternative For)
Function        │ Default          │   Flexible Arguments
Generalization  │ Arguments        │   (*args, **kwargs)
                └──────────────────┘
```

### Parent Concept

Default arguments are a specific feature used when defining a [[Python - User-Defined Functions|user-defined function]] to make it more versatile.

### Related Concepts 

- The [[Python - Function Generalization Process|process of generalizing functions]] often involves identifying parameters that can be given sensible defaults to simplify common use cases.
- Default arguments provide a simpler and more explicit alternative to [[Python - Flexible Arguments (args)|flexible arguments (*args and **kwargs)]] when you have a fixed number of optional parameters with known names.
- Understanding default arguments is essential for writing clean and reusable [[Python - Functions|functions]] that serve as building blocks for larger programs.
## Questions

- You're designing a data processing library for your company. One key function has 10 parameters. How do you decide which parameters should have default values versus which should be required, and how would you justify this API design to your team in terms of balancing ease-of-use for new users against explicitness for power users?
- Imagine a widely-used function in a production codebase has a default argument that is a mutable object (e.g., `cache={}`). This bug has gone unnoticed for months. How would you design a static analysis check or a linting rule to automatically detect this specific anti-pattern across the entire codebase to prevent future occurrences?
- What if Python's default arguments were re-evaluated on every function call instead of only once at definition time? How would this change the way you write functions, and what new programming patterns might emerge (or become obsolete) as a result?