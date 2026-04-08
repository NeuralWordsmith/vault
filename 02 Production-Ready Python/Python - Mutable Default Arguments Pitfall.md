---
tags:
  - core
  - python
  - default arguments
  - mutability
  - side effects
  - gotcha
  - function definition
  - concept
source:
  - "[[Writing Functions in Python]]"
related:
  - "[[Python - Functions]]"
  - "[[Python - Mutable Objects]]"
  - "[[Python - Immutable Objects]]"
  - "[[Python 5 - Mutable vs Immutable Objects]]"
  - "[[Python - Pass by Assignment]]"
  - "[[Python - Variable Assignment & Memory Model]]"
  - "[[Python - Handling Mutable Default Arguments with None]]"
  - "[[Python - Lists]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Scope]]"
  - "[[Python - User-Defined Functions]]"
  - "[[Python - Function Argument Passing]]"
  - "[[Python - Pass by Assignment & Memory Model Relationship]]"
---
# Core: Mutable Default Arguments

## Summary

>In Python, default argument values are created only once, at the moment the function is defined, not each time the function is called. If this default value is a mutable object, such as a list or dictionary, any in-place modification made to it during one function call will persist and be visible in all subsequent calls. This is a direct consequence of Python's [[Python - Pass by Assignment|pass-by-assignment]] model and the fundamental difference between [[Python 5 - Mutable vs Immutable Objects|mutable and immutable objects]].

**Why This Matters:** This behavior is a classic 'gotcha' for Python developers, and understanding it is crucial for writing predictable, bug-free functions that handle mutable data structures.

_Analogy:_ _Imagine a coffee shop puts up a single, large community whiteboard with the instruction: "Add your coffee order to the list." The whiteboard itself is the mutable default argument. The first customer walks up and writes "Latte." The next customer comes and, following the same instruction, adds "Espresso" right below "Latte." They are both modifying the same, single whiteboard. No one gets a fresh, new whiteboard for their order; they all share the original one._

- **The Whiteboard**: Represents the single, mutable list object created when the function was defined.
- **The Instruction**: Represents the function being called.
- **Each Customer**: Represents a separate call to the function.
- **Adding an Order**: Represents appending an item to the list inside the function.
- **Where it breaks down:** The analogy's solution would be for each customer to grab a new sticky note, which is less direct. In Python, the idiomatic solution is to use `None` as a placeholder and create a new 'whiteboard' (list) inside the function if one isn't provided, as detailed in [[Python - Handling Mutable Default Arguments with None|handling mutable defaults]].

```
Function Definition Time:
def foo(items=[])
      │
      └─> Creates ONE list object in memory: id(4321) -> []

First Call: foo()
      │
      └─> Uses the default object: id(4321) -> [1]

Second Call: foo()
      │
      └─> Uses the SAME default object: id(4321) -> [1, 1]
```

## Details

The surprising behavior described in the `foo()` function example stems from a core design choice in Python: default argument values are evaluated and bound only once, at function definition time. When that default value is a [[Python - Mutable Objects|mutable object]] like a list, all calls to the function that don't provide their own argument will share and modify that single, persistent object instance in memory. This leads to state being unintentionally preserved across function calls.

#### Primary Goal

To understand why function calls can unexpectedly share state when using mutable default arguments and to learn how to avoid this common source of bugs.

#### Mechanism

- **Step 1: Function Definition**
    - When Python executes `def foo(items=[]):`, it creates a single list object `[]` in memory. The default value for the `items` parameter is then set to be a reference to this specific object.
- **Step 2: First Function Call**
    - `foo()` is called without any arguments. Python uses the default list object it created in Step 1. The line `items.append(1)` modifies this object in-place. The single list object in memory now contains `[1]`.
- **Step 3: Second Function Call**
    - `foo()` is called again. Python once again uses the *exact same* default list object from Step 1. This object is no longer empty; it's `[1]`. The function appends another `1`, and the object in memory becomes `[1, 1]`, which is what gets printed.

##### Code Translation

```python
# --- Step 1: Function Definition ---
# The default list [] is created ONCE, when this line is executed.
def foo(items=[]):
  """Appends 1 to a list, demonstrating the mutable default issue."""
  items.append(1)
  print(f"Inside foo: items is {items} at memory id {id(items)}")

# --- Step 2: First Call ---
print("Calling foo() the first time...")
foo()
# Expected by beginners: [1]
# Actual: [1]

# --- Step 3: Second Call ---
print("\nCalling foo() the second time...")
foo()
# Expected by beginners: [1]
# Actual: [1, 1] -> The default list was modified in place!

# --- Verification ---
# Calling with an explicit argument creates and uses a new list, as expected.
print("\nCalling foo() with a new list...")
my_list = [10]
print(f"Outside foo: my_list is {my_list} at memory id {id(my_list)}")
foo(my_list)
print(f"Outside foo: my_list is now {my_list}")
```

 [[Code - Mutable Default Arguments Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **The Default Value Object**
    - The core of the issue. The problem only manifests when the object provided as a default in the function signature is mutable (e.g., `list`, `dict`, `set`). Using an [[Python - Immutable Objects|immutable object]] like a number, string, or tuple as a default does not cause this issue.
- **The Function Call Signature**
    - The problem only occurs when the function is called *without* providing an explicit value for that argument, thereby forcing Python to use the shared default. If a new list is passed in each time, `foo(my_list)`, a new object is used and the default is ignored.

#### Core Trade-offs

- **Pro: Performance**
    - The 'evaluate once' rule is efficient. It avoids the overhead of re-creating default objects on every single function call, which is beneficial for complex or large default objects that are immutable.
- **Con: Unexpected Side Effects**
    - The major drawback is the potential for hard-to-debug side effects when mutable defaults are modified. State persists between otherwise independent function calls, violating the principle of least surprise.
- **Pro (Use with Caution): Intentional Caching**
    - This behavior can be intentionally exploited to create a simple cache. A function can store the results of previous computations in a default dictionary, for example. However, this is often considered unclear and poor practice compared to more explicit caching mechanisms like decorators.

## Connections

```
                      (Parent)
                     Functions
                         ▲
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                    │
(Underlying Cause) ┌───────────────────────────┐      (Solution)
 [[Python - Mutable Objects|Mutable Objects]]    │ Mutable Default Arguments │ [[Python - Handling Mutable Default Arguments with None|Handling Mutable Defaults]]
                   └───────────────────────────┘
                         │
                         │
               (Related Concept)
          [[Python - Pass by Assignment|Pass by Assignment]]
```

### Parent Concept

This concept is a specific, and often misunderstood, behavior related to defining [[Python - Functions|Python functions]] and how their default arguments are initialized and stored.

### Child Concepts

- The standard and safest way to address this issue is by [[Python - Handling Mutable Default Arguments with None|handling mutable default arguments using `None` as a sentinel value]], which ensures a new object is created for each call that needs one.

### Related Concepts 

- This behavior is a direct consequence of Python's memory model, where variables are names pointing to objects, as explained in [[Python - Variable Assignment & Memory Model|variable assignment & memory model]].
- It highlights the critical difference between [[Python 5 - Mutable vs Immutable Objects|mutable and immutable objects]], as this problem does not occur with immutable defaults like strings, numbers, or tuples.
- The underlying mechanism is rooted in how Python handles [[Python - Function Argument Passing|function argument passing]], which is formally known as [[Python - Pass by Assignment|pass by assignment]].
## Questions

- Imagine you've discovered a critical, widely-used function in your company's legacy codebase that relies on a mutable default argument for caching. Refactoring it to use a proper cache would be costly. How would you argue the business case for or against the refactor, considering the risks of bugs versus the development cost?
- In a multi-threaded application, how could the mutable default argument behavior lead to a race condition? Describe a scenario and what mechanisms (like locks) you would use to make the function thread-safe without changing the default argument pattern.
- What if Python's core design were changed so that default arguments were re-evaluated on every call? What existing programming patterns or optimizations would break, and what new kinds of bugs might this change introduce?