---
tags: 
  - core
  - python
  - *args
  - variadic functions
  - argument packing
  - arbitrary arguments
  - function signature
  - concept
source: 
  - "[[Introduction to Functions in Python]]"
related: 
  - "[[Python - User-Defined Functions]]"
  - "[[Python - Functions]]"
  - "[[Python - Tuples]]"
  - "[[Python - Function Generalization Process]]"
  - "[[Python - Function Default Arguments]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - for Loop]]"
  - "[[Python - Looping Over Data Structures]]"
  - "[[Fundamental - Programming]]"
  - "[[Python - Key Characteristics]]"
  - "[[Python - Data Types]]"
  - "[[Python - Lists]]"
---

# Core: Flexible Arguments (*args)

## Summary

>In Python, `*args` is a special syntax used in a function definition to pass a variable-length, non-keyworded argument list. The asterisk `*` before the parameter name `args` instructs Python to collect all extra positional arguments into a tuple, allowing the function to be called with any number of arguments. This is a fundamental technique in the [[Python - Function Generalization Process|process of making functions more general and adaptable]].

**Why This Matters:** This feature allows functions to handle an unknown number of inputs, making them highly reusable for tasks like calculating sums or averages for varying data sets without needing to be rewritten.

_Analogy:_ _Think of a function with `*args` as a universal remote control with a 'learn' button. The remote has standard buttons like 'power' and 'volume' (representing regular, named arguments). The 'learn' button, however, can be programmed to control an arbitrary number of different devices—a TV, a soundbar, a Blu-ray player. You just point and click, and it accepts the new command. `*args` is like that 'learn' button; it's ready to accept and handle any number of arguments you 'point' at the function when you call it._

**Where it breaks down:** A universal remote's 'learn' function might have a finite memory limit for how many devices it can learn. In Python, `*args` is only limited by the system's available memory. Furthermore, the remote actively learns and stores a signal, whereas `*args` simply collects the arguments passed to it for immediate use within that single function call without 'learning' them for future calls.

```
Function Call:   my_func(1, "hello", True)
                       │      │       │
                       │      │       │
                       ▼      ▼       ▼
-------------------------------------------------
Inside Function: def my_func(*args):
                    │
                    ▼
                  args = (1, "hello", True)  <-- Packed into a tuple
-------------------------------------------------
```

## Details

Sometimes, you don't know in advance how many arguments a user will need to pass to a function. For example, you might want a function that can sum two numbers, or three, or a hundred. Instead of writing a separate function for each case, Python provides the `*args` syntax to create a single, flexible function. The asterisk `*` before the parameter name (the word `args` is just a convention) tells Python to gather any number of positional arguments provided during the function call and pack them into a tuple.

#### Primary Goal

To allow a function to accept any number of positional arguments without having to define each one explicitly in the function signature.

#### Mechanism

- **Step 1: Define the Function with `*args`**
    - In the function signature, include a parameter prefixed with a single asterisk (e.g., `*numbers`). This parameter must come after any standard positional arguments.
- **Step 2: Process the Arguments as a Tuple**
    - Inside the function, the `*args` parameter (e.g., `numbers`) behaves exactly like a tuple. A common and intuitive pattern is to use a [[Python - for Loop|for loop]] to iterate over its elements.
- **Step 3: Call the Function with Multiple Arguments**
    - You can now call this function with zero, one, or many positional arguments. Python will automatically handle packing them into the tuple for you.

##### Code Translation

```python
# --- Step 1: Define the Function with *args ---
def add_all(*numbers):
    """
    This function takes an arbitrary number of numerical arguments
    and returns their sum.
    """
    # --- Step 2: Process the Arguments as a Tuple ---
    total = 0
    # 'numbers' is a tuple containing all passed arguments
    for number in numbers:
        total += number
    return total

# --- Step 3: Call the Function with Multiple Arguments ---
print(f"Sum of 1, 2, 3: {add_all(1, 2, 3)}")
# Expected output: Sum of 1, 2, 3: 6

print(f"Sum of 10, 20, 30, 40, 50: {add_all(10, 20, 30, 40, 50)}")
# Expected output: Sum of 10, 20, 30, 40, 50: 150

print(f"Sum with no arguments: {add_all()}")
# Expected output: Sum with no arguments: 0
```

 [[Code - Flexible Arguments (*args) Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`*args` (Argument Tuple)**
    - This is the core component. The name `args` is a strong convention, but any valid variable name like `*numbers` or `*items` will work. The single asterisk `*` is the essential part of the syntax.
    - It instructs Python to "pack" all positional arguments that don't match other defined parameters into a single tuple.

#### Core Trade-offs

- **Pro (Flexibility)**
    - The primary benefit is creating highly flexible and reusable functions that can adapt to different numbers of inputs, reducing code duplication.
- **Con (Readability & Explicitness)**
    - Overuse can make function signatures less explicit and harder to understand at a glance. It's not immediately clear what kind or how many arguments are expected without reading the function's documentation or body. This contrasts with [[Python - Function Default Arguments|default arguments]], which clearly define expected parameters.
- **Con (Type Hinting Complexity)**
    - It can be slightly more complex to provide precise type hints for `*args` compared to explicitly named parameters, though modern Python versions have improved support for this.

## Connections

```
                  (Parent)
            User-Defined Functions
                       ▲
                       │
       ┌───────────────┼────────────────────────────┐
       │               │                            │
(Related)     ┌───────────────────────────┐      (Related)
Default Arguments │ Flexible Arguments (*args)│  Function Generalization
              └───────────────────────────┘
                       │
                       ▼
                   (Related)
            Flexible Keyword Arguments (**kwargs)
```

### Parent Concept

This concept is a specific feature within the broader topic of [[Python - User-Defined Functions]], enabling more advanced and adaptable function definitions.

### Related Concepts 

- It is a key technique in the [[Python - Function Generalization Process|process of function generalization]], allowing a single function to replace multiple, more specific ones.
- It complements [[Python - Function Default Arguments|default arguments]], which provide flexibility by making parameters optional rather than by accepting an unknown quantity of them.
- A related concept is `**kwargs`, which collects an arbitrary number of *keyword* arguments into a dictionary instead of a tuple.
- The arguments collected by `*args` are stored in a [[Python - Tuples|tuple]], which is an immutable sequence.
## Questions

- You're building a data processing library. One function needs to aggregate metrics from various sources. Would you use `*args` to accept an arbitrary number of metric arrays, or would you enforce that users pass a single list of arrays? Justify your choice in terms of both developer experience for your users and the long-term maintainability of the library.
- Imagine a high-throughput logging service where a function `log_event(*details)` is called millions of times per minute. What are the potential performance implications of the argument packing/unpacking process of `*args` at this scale, and how might you design the system to mitigate them?
- What if Python tuples were mutable? How would this fundamentally change the safety and predictability of using `*args`, and what new kinds of bugs might developers accidentally introduce into their functions?