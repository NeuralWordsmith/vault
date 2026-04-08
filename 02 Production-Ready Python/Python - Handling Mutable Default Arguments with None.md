---
tags:
  - core
  - python
  - mutable defaults
  - sentinel value
  - pythonic idiom
  - side effects
  - function arguments
  - concept
source:
  - "[[Writing Functions in Python]]"
related:
  - "[[Python - Mutable Default Arguments Pitfall]]"
  - "[[Python - User-Defined Functions]]"
  - "[[Python - Functions]]"
  - "[[Python 5 - Mutable vs Immutable Objects]]"
  - "[[Python - Mutable Objects]]"
  - "[[Python - Immutable Objects]]"
  - "[[Python - Pass by Assignment]]"
  - "[[Python - Scope]]"
  - "[[Python - Lists]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Variable Assignment & Memory Model]]"
  - "[[Python - Function Argument Passing]]"
  - "[[SWE - Do One Thing Principle]]"
  - "[[Python - Docstrings]]"
---
# Core: Safe Mutable Default Arguments

## Summary

>This is a standard Pythonic idiom for safely providing a mutable default value to a function argument. Instead of directly using a mutable type like `[]` or `{}` as the default, you use `None` as a placeholder or 'sentinel' value. Inside the function, you check if the argument is `None` and, if so, create a new instance of the desired mutable object. This correctly isolates the state of each function call and is the direct solution to the [[Python - Mutable Default Arguments Pitfall]].

**Why This Matters:** This pattern prevents subtle, hard-to-debug bugs by ensuring function calls don't unintentionally share and modify the same default object, leading to more predictable and robust code.

_Analogy:_ _Imagine a self-serve coffee station at an office. The 'bad' way (a mutable default argument) is having a single, large pot of coffee brewed in the morning. The first person gets a fresh cup. The second person gets a slightly older cup. Someone might accidentally add salt instead of sugar. By the end of the day, everyone is sharing a stale, possibly contaminated pot. The 'good' way (the `None`-as-default pattern) is like having a high-tech coffee machine. If you don't bring your own mug (provide an argument), the machine's default behavior is to grab a *new, clean paper cup* (`None` triggers creating a new object) and brew a fresh serving just for you. Every person who doesn't bring a mug gets their own fresh, clean cup, and they don't affect anyone else's coffee._

• **The Coffee Machine:** The function.
• **Bringing Your Own Mug:** Passing a specific list or dictionary as an argument.
• **Not Bringing a Mug (Default):** Calling the function without providing that specific argument.
• **A New, Clean Paper Cup:** The fresh `[]` or `{}` created inside the function when the argument is `None`.
• **The Single, Shared Pot:** The dangerous mutable default object that persists across calls.

**Where it breaks down:** The analogy implies a new, fresh object is always the desired outcome. In some advanced or specific cases, you might *intentionally* want to share state across function calls (e.g., for caching), but this should be an explicit design choice, not an accidental side effect of default arguments.

```
Function Call(item, target_list=?)
       │
       ▼
┌──────────────────────┐
│ Is target_list None? │
└──────────────────────┘
      ╱         ╲
    YES          NO
     │           │
     ▼           ▼
target_list = []  Use provided list
     │           │
     └─────┬─────┘
           │
           ▼
┌────────────────────────┐
│ target_list.append(item) │
└────────────────────────┘
           │
           ▼
    Return target_list
```

## Details

The core idea is to use `None` as a sentinel value to sidestep the way Python evaluates default arguments. Python creates the default argument object only *once*, when the function is first defined, not each time it's called. If that object is a [[Python - Mutable Objects|mutable object]] like a list, any modification to it in one call will be visible in all subsequent calls. This pattern breaks that shared link by defaulting to the [[Python - Immutable Objects|immutable]] `None` and then creating a *new* mutable object inside the function's body for each call that needs a default.

#### Primary Goal

To ensure that each call to a function gets a fresh, independent mutable object as its default value, preventing unintended side effects and state-sharing between calls.

#### Mechanism

- **Step 1: Define with `None` Default**
    - In the function signature, set the default value for the parameter that needs a mutable type to `None`. This is a safe, immutable placeholder.
- **Step 2: Check for the Sentinel Value**
    - Inside the function, the first step is to check if the argument's value is `None`. The idiomatic way to do this is with `if my_arg is None:`.
- **Step 3: Initialize New Mutable Object**
    - If the check is true, it means the caller did not provide their own object, so you assign a new, empty mutable object (e.g., `my_arg = []` or `my_arg = {}`) to the parameter variable.
- **Step 4: Proceed with Logic**
    - The rest of the function can now proceed, confident that `my_arg` refers to either the object the user passed in or a brand-new object created just for this specific call.

##### Code Translation

```python
# The SAFE pattern using None as a default sentinel
def add_item_safely(item, item_list=None):
    # --- Step 1 & 2: Define with None and check for it ---
    if item_list is None:
        # --- Step 3: Initialize a new object ---
        item_list = []
    
    # --- Step 4: Proceed with logic ---
    item_list.append(item)
    return item_list

# --- DEMONSTRATION ---
# Each call gets its own, new list, as expected.
list1 = add_item_safely('apple')
print(f"First call: {list1}")  # Output: First call: ['apple']

list2 = add_item_safely('banana')
print(f"Second call: {list2}") # Output: Second call: ['banana']

# The first list is unaffected by the second call.
print(f"First list after second call: {list1}") # Output: First list after second call: ['apple']
```

 [[Code - Safe Mutable Default Arguments Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **The Sentinel Value**
    - `None` is the conventional choice because it's a singleton object. Using `is` for an identity check (`if arg is None:`) is both fast and reliable, preventing potential issues with objects that might evaluate to `False` in a boolean context (like an empty list `[]`).
- **The Conditional Block**
    - The `if/else` or `if` block is the core control structure of this pattern. It cleanly separates the two paths: the caller provided an object, or the function needs to create a default one.

#### Core Trade-offs

- **Pro: Safety and Predictability**
    - This is the primary benefit. It eliminates a common and confusing source of bugs, making the function's behavior predictable and robust.
- **Pro: Explicit and Clear**
    - The pattern makes the function's intent obvious to anyone reading the code. It clearly documents that a new object is created when one isn't provided.
- **Con: Increased Verbosity**
    - It adds two to three lines of boilerplate code to the function. For very simple functions, this can feel slightly cumbersome, but the safety gained is almost always worth it.

## Connections

```
                      (Parent)
              User-Defined Functions
                       ▲
                       │
    ┌──────────────────┼──────────────────┐
    │                  │                  │
(Problem)    ┌───────────────────────────┐    (Foundation)
Mutable      │ Safe Mutable Default Args │    Pass by
Default Pitfall  └───────────────────────────┘    Assignment
                                              (Foundation)
                                              Mutable vs
                                              Immutable
```

### Parent Concept

This pattern is a crucial best practice within the broader topic of creating [[Python - User-Defined Functions]].

### Child Concepts



### Related Concepts 

- This pattern is the direct solution to the problem described in [[Python - Mutable Default Arguments Pitfall|the mutable default argument pitfall]].
- Its necessity stems from the fundamental difference between [[Python 5 - Mutable vs Immutable Objects|mutable and immutable objects]] in Python's data model.
- Understanding this idiom requires grasping Python's memory model, specifically [[Python - Pass by Assignment]], where arguments are passed by assigning a reference to an object.
## Questions

- Imagine you're building a caching function that takes an optional dictionary to store results. Using the `None`-as-default pattern ensures each call gets a fresh cache. When might you *intentionally* violate this pattern and use a mutable default `cache={}` to create a shared, in-memory cache across different parts of an application, and what are the risks you'd need to communicate to your team?
- If this pattern is used in a highly concurrent, multi-threaded application, what potential race conditions could still occur if the *caller* passes the same mutable object to multiple threads, and how would you design the function to be thread-safe even in that scenario?
- What if Python's core behavior was changed so that default arguments were re-evaluated on every function call? What existing code patterns and libraries would break, and what new kinds of bugs might be introduced by this 'fix'?