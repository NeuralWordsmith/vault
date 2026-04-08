---
tags:
  - process
  - python
  - default arguments
  - mutability
  - sentinel value
  - pythonic
  - side effects
  - concept
source:
  - "[[Writing Functions in Python]]"
related:
  - "[[Python - Mutable Default Arguments Pitfall]]"
  - "[[Python - Functions]]"
  - "[[Python - User-Defined Functions]]"
  - "[[Python - Mutable Objects]]"
  - "[[Python - Immutable Objects]]"
  - "[[Python 5 - Mutable vs Immutable Objects]]"
  - "[[Python - Pass by Assignment]]"
  - "[[Python - Variable Assignment & Memory Model]]"
  - "[[Python - Scope]]"
  - "[[Python - Lists]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Objects]]"
  - "[[Python - Data Types]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
---
# Process: Safe Mutable Default Arguments

**Why This Matters:** This pattern prevents subtle, hard-to-debug bugs by ensuring a function creates a fresh mutable object for each call, avoiding unintended side effects and data corruption across calls.
## Goal & Analogy

> **Goal:** When a function needs a mutable object like a list or dictionary as a default argument, the standard Pythonic solution is to default the argument to `None`. Inside the function, you check if the argument is `None` and, if so, initialize a new, empty mutable object. This practice is essential because it circumvents the [[Python - Mutable Default Arguments Pitfall]], where a single mutable object is created once at function definition and shared (and modified) across all subsequent calls. This behavior is a direct consequence of how Python handles [[Python - Mutable Objects]] and its [[Python - Pass by Assignment]] evaluation strategy.

_Analogy:_ _Imagine a public coffee shop that offers a 'house cup' for customers who don't bring their own. The incorrect way (`def get_coffee(cup=[])`) is like having only one single house cup for everyone. The first customer uses it, leaves some coffee stains, and the next customer gets the same stained cup. The correct 'None-as-default' pattern (`def get_coffee(cup=None)`) is like the barista keeping a fresh stack of disposable paper cups behind the counter. If you don't bring your own cup, the barista checks (`if cup is None`), grabs a brand new one from the stack (`cup = []`), and then serves your coffee. Every customer who needs a house cup gets a clean, new one._

**Where it breaks down:** The analogy implies you always get a new cup if you don't bring one. In Python, you can intentionally create one cup object and pass that *same* object into the function multiple times. The pattern only creates a new 'cup' if you explicitly pass `None` or omit the argument entirely; it doesn't prevent you from reusing an existing object if you choose to.

```
Function Call: `add_to_list(item, my_list)`

              Is `my_list` provided?
             /                     \
           YES                      NO (`my_list` is `None`)
            |                        |
            |                        v
            |                  Create new list: `my_list = []`
            |                        |
            v                        v
            Use the provided `my_list`
                     |
                     v
              `my_list.append(item)`
                     |
                     v
                  Return `my_list`
```

## The Step-by-Step Process

### Prerequisites / Inputs

- **The Sentinel Value (`None`)**
    - `None` is used because it is a singleton object with a distinct type. This allows for a reliable identity check (`is None`), which is both fast and safe, avoiding potential issues with other falsy values (like an empty list `[]`) that a user might legitimately want to pass as an argument.
- **The Conditional Check (`if ... is None`)**
    - This is the gatekeeper logic. It cleanly separates the two main cases: the user provided an argument, or the user wants the function to create a default one. Using `is` instead of `==` is the preferred method for checking against singletons like `None`, `True`, and `False`.

### The Steps

- **Step 1: Define with `None` Default**
    - In the function signature, set the default value of the argument that needs to be mutable to `None`. This acts as a placeholder or 'sentinel value'.
- **Step 2: Check for `None`**
    - Inside the function, use a conditional statement to check if the argument's value is `None`. The idiomatic way to do this is with the identity operator: `if my_argument is None:`.
- **Step 3: Initialize the Mutable Object**
    - If the argument is `None`, assign a new, empty instance of the desired mutable type (e.g., `[]` for a list, `{}` for a dictionary) to the argument variable. This ensures a fresh object is created only when needed.

##### Code Translation

```python
# The safe, idiomatic pattern for mutable default arguments
def add_to_list(item, my_list=None):
    """Adds an item to a list, creating a new list if one isn't provided."""
    # --- Step 1: The argument `my_list` defaults to `None` in the signature.
    
    # --- Step 2: Check if the argument is None.
    if my_list is None:
        # --- Step 3: If it is, initialize a new mutable object.
        my_list = []
    
    my_list.append(item)
    return my_list

# --- DEMONSTRATION ---

# First call: No list provided, so a new one is created.
list1 = add_to_list(1)
print(f"Call 1: {list1}")  # Output: Call 1: [1]

# Second call: Still no list provided. A *new*, separate list is created.
list2 = add_to_list(2)
print(f"Call 2: {list2}")  # Output: Call 2: [2]

# The first list remains unchanged by the second call.
print(f"List 1 after Call 2: {list1}") # Output: List 1 after Call 2: [1]

# Third call: We provide our own list, so the function uses it.
existing_list = [10, 20]
add_to_list(30, existing_list)
print(f"Call 3 (with existing list): {existing_list}") # Output: Call 3 (with existing list): [10, 20, 30]
```

### Deliverables / Outputs

In Python, default function arguments are evaluated only once, at the time the function is defined, not each time it's called. If a default argument is a [[Python - Mutable Objects|mutable object]] like a list, any in-place modification to that object within the function will persist across all future calls that rely on that default. This creates a hidden state that can lead to unpredictable behavior. The 'default to `None`' idiom is the canonical best practice to avoid this [[Python - Mutable Default Arguments Pitfall]] and ensure function calls are independent and predictable.

## Context & Tradeoffs

### When to Use This Process

To ensure that a function call that omits a mutable argument always receives a new, independent instance of that mutable object, preventing unintended side effects between calls.

### Common Pitfalls & Tradeoffs

- **Pro: Robustness and Predictability**
    - This pattern eliminates a common and confusing class of bugs related to shared state between function calls. It makes the function's behavior explicit and reliable.
- **Pro: Readability and Intent**
    - Seeing `arg=None` in a function signature is a strong, conventional signal to other Python developers that the function internally handles the creation of a default object if one isn't supplied.
- **Con: Minor Verbosity**
    - It requires two to three extra lines of code (the `if` block) compared to the naive (and incorrect) approach. This is a very small price to pay for correctness and is considered a standard Python idiom.

## Connections

```
                  (Parent)
            Python - Functions
                     ▲
                     │
┌────────────────────┼────────────────────┐
│                    │                    │
(The Problem)  ┌───────────────────────────┐  (Underlying Cause)
Mutable Default│ Safe Mutable Default Args │  Mutable Objects
Arguments Pitfall└───────────────────────────┘
                                        ▲
                                        │
                               (Memory Model)
                               Pass by Assignment
```


- This pattern is the direct and canonical solution to the problem detailed in [[Python - Mutable Default Arguments Pitfall|the mutable default argument pitfall]].
- A deep understanding of this pattern requires a firm grasp of the difference between [[Python 5 - Mutable vs Immutable Objects|mutable and immutable objects]] in Python.
- The underlying behavior that makes this pattern necessary is a direct consequence of Python's [[Python - Pass by Assignment|'pass-by-assignment']]] memory model, where function arguments are references to objects.
- This concept is fundamentally about managing object identity and state, which is central to the [[Python - Variable Assignment & Memory Model|Python variable and memory model]].

## Deeper Questions

- A junior developer on your team argues that using this `None`-as-default pattern is overly verbose for a small, internal script. How would you justify the importance of this best practice, connecting it to long-term project maintainability and the potential cost of debugging subtle errors down the line?
- Imagine a high-performance data processing pipeline where a function using this pattern is called millions of times per second. Could the repeated `is None` check and object instantiation become a performance bottleneck? How would you profile this, and what alternative designs might you consider if it proved to be a problem?
- What if Python's core behavior was changed so that default arguments were re-evaluated on every function call? What existing code patterns would this break (e.g., memoization caches), and what new kinds of bugs might it introduce, particularly concerning performance or resource management (e.g., default database connections)?