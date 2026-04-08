---
tags: 
  - core
  - python
  - caching
  - optimization
  - performance
  - dynamic_programming
  - recursion
  - concept
source: 
  - "[[Writing Functions in Python]]"
related: 
  - "[[Python - Memoizing Decorator]]"
  - "[[Python - When To Use Decorators]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Python - Decorators & DRY Principle Relationship]]"
  - "[[Python - Timer Decorator]]"
  - "[[Python - Functions]]"
  - "[[Python - User-Defined Functions]]"
  - "[[Python - Dictionaries]]"
  - "[[Fundamental - Computer Science]]"
  - "[[Python - Scope]]"
  - "[[Python - Nested Functions]]"
  - "[[Python - Memory-Efficient Data Processing]]"
---
# Core: Memoizing

## Summary

>Memoization is a performance optimization technique that stores the results of expensive function calls in a cache. When the same function is called again with the exact same inputs, the cached result is returned immediately, bypassing the need to re-execute the function's logic. This is the core principle behind the [[Python - Memoizing Decorator]], which automates this caching process.

**Why This Matters:** Memoizing dramatically speeds up programs by avoiding redundant, expensive calculations, making applications faster and more resource-efficient.

_Analogy:_ _Imagine a diligent mathematician solving a complex, time-consuming math problem. The first time they encounter the problem, they work through all the steps and write the final answer in a notebook, indexed by the problem's unique parameters. The next day, a student asks for the solution to the *exact same problem*. Instead of re-doing all the calculations, the mathematician simply opens their notebook to the correct page and provides the answer instantly._

In this analogy:
- **The Mathematician:** Represents the function being called.
- **The Complex Problem:** Is the computationally expensive task the function performs.
- **The Problem's Parameters:** Are the arguments passed to the function.
- **The Notebook:** Is the cache (often a dictionary in Python) that stores the results.
- **Looking up the answer:** Is the process of retrieving a pre-computed result from the cache (a 'cache hit').
- **Where it breaks down:** The analogy doesn't fully capture the memory cost. A real notebook has a finite size, but a simple memoization cache can grow indefinitely, potentially consuming all available system memory if not managed properly.

```
Function Call with Arguments
           │
           ▼
┌──────────────────────────┐
│ Are args in Cache?       │
└──────────┬───────────────┘
           │
    YES    │    NO
   (Hit)   │   (Miss)
           │
           ▼
┌──────────────────┐      ┌──────────────────────────┐
│ Return value     │      │ Execute expensive logic  │
│ from Cache       │      └──────────┬───────────────┘
└──────────────────┘                 │
                                     ▼
                              ┌──────────────────┐
                              │ Store result in  │
                              │ Cache            │
                              └──────────┬───────┘
                                         │
                                         ▼
                                  ┌──────────────────┐
                                  │ Return result    │
                                  └──────────────────┘
```

## Details

Memoizing is a specific form of caching applied to function return values. It embodies a classic space-time tradeoff: you use more memory (space) to store results in order to reduce computation time (speed). This technique is most effective for 'pure' functions—those that always produce the same output for the same input and have no side effects. It is particularly powerful for optimizing recursive functions, such as calculating Fibonacci numbers, which often involve many repeated sub-problems.

#### Primary Goal

To optimize application performance by eliminating the need to re-compute results for previously seen function inputs.

#### Mechanism

- **Step 1: Create a Cache**
    - Initialize a storage mechanism, typically a dictionary, to hold the results. This cache will map a function's arguments to its return value.
- **Step 2: Check the Cache**
    - Before executing the function's main logic, check if the current arguments already exist as a key in the cache.
- **Step 3: Return Cached Result (Cache Hit)**
    - If the arguments are found in the cache, the function immediately returns the corresponding stored value, skipping the expensive computation entirely.
- **Step 4: Compute and Store (Cache Miss)**
    - If the arguments are not in the cache, the function executes its normal, expensive logic. Before returning the newly computed result, it stores it in the cache with the arguments as the key for future use.

##### Code Translation

```python
# --- Step 1: Create a Cache ---
# The 'memo' dictionary will act as our cache.
memo = {}

def fibonacci(n):
    # --- Step 2: Check the Cache ---
    # Arguments are just the integer 'n'. We check if it's a key in our cache.
    if n in memo:
        # --- Step 3: Return Cached Result (Cache Hit) ---
        return memo[n]

    # --- Step 4: Compute and Store (Cache Miss) ---
    # This is the expensive, recursive part of the function.
    if n <= 1:
        result = n
    else:
        result = fibonacci(n - 1) + fibonacci(n - 2)
    
    # Store the newly computed result in the cache before returning.
    memo[n] = result
    return result

# The first call to fibonacci(30) will be slow as it computes and caches values.
print(f"Calculating fibonacci(30): {fibonacci(30)}")

# The second call will be instantaneous because the result is already in the 'memo' cache.
print(f"Calculating fibonacci(30) again: {fibonacci(30)}")
```

 [[Code - Memoizing Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Cache Size**
    - The maximum number of results to store. An unbounded cache can lead to excessive memory consumption. Implementations like Python's `functools.lru_cache` allow you to set a `maxsize` to limit this.
- **Cache Eviction Policy**
    - The strategy for deciding which items to remove when the cache is full. Common policies include LRU (Least Recently Used) and LFU (Least Frequently Used).

#### Core Trade-offs

- **Pro: Increased Speed**
    - Provides a significant performance boost for functions that are called repeatedly with the same arguments, especially if the computation is complex or involves I/O.
- **Con: Increased Memory Usage**
    - Storing results consumes memory. This can become a bottleneck for functions with a vast input space or that return very large objects.
- **Limitation: Only for Pure Functions**
    - Memoization is unreliable for 'impure' functions—those with side effects (e.g., modifying a global variable) or whose output depends on external state (e.g., `datetime.now()`, `random.random()`). The cached result may become stale or incorrect.

## Connections

```
                      (Parent)
                 Optimization Technique
                           ▲
                           │
           ┌───────────────┼────────────────────────────┐
           │               │                            │
(Implementation)  ┌───────────────────────────┐      (Principle)
Memoizing Decorator │        Memoizing        │      DRY Principle
                  └───────────────────────────┘
                           │
                  ┌──────────┴──────────┐
                  │                     │
           Dynamic Programming     Caching
```

### Parent Concept

Memoizing is a specific type of optimization technique found in [[Fundamental - Computer Science|computer science]] that focuses on improving runtime performance by caching results.

### Child Concepts

- The most common and elegant implementation in Python is the [[Python - Memoizing Decorator]], which wraps a function to add this caching behavior without modifying the original function's code.

### Related Concepts 

- This technique is a direct application of the [[SWE - DRY (Don't Repeat Yourself) Principle|DRY principle]] to computation, as it avoids the repetition of expensive calculations.
- The relationship between this general concept and its practical implementation is a key part of understanding the [[Python - Decorators & DRY Principle Relationship|link between decorators and DRY]].
- A [[Python - Timer Decorator]] is often used to empirically measure and prove the performance benefit gained from applying memoization to a function.
- Memoization is a foundational concept in dynamic programming, where solutions to subproblems are stored to efficiently build up a solution to a larger problem.
## Questions

- You're optimizing a financial modeling function that's called thousands of times with overlapping inputs. Memoizing it speeds it up 100x but increases memory usage by 2GB. How do you decide if this trade-off is acceptable, and how would you explain the cost-benefit of a potential server upgrade to a product manager?
- Imagine this memoized function is part of a distributed system with multiple server instances. How would you design a shared cache (like Redis) for memoization so that a result computed on one server can be used by all others, and what are the new potential failure points you've introduced?
- What if the function you need to memoize is not 'pure'—it occasionally depends on a slowly changing external configuration file. How could you adapt the memoization strategy to handle this, perhaps by introducing a time-to-live (TTL) or an explicit cache invalidation mechanism?