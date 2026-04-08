---
tags: 
  - core
  - python
  - caching
  - dynamic_programming
  - recursion
  - optimization
  - performance
  - concept
source: 
  - "[[Data Structures and Algorithms in Python]]"
related: 
  - "[[Python - Dynamic Programming]]"
  - "[[Python - Recursion]]"
  - "[[Python - Recursion & Dynamic Programming Relationship]]"
  - "[[Python - Call Stack]]"
  - "[[Python - Decorators]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Functions]]"
  - "[[Fundamental - Computer Science]]"
  - "[[Python - Recursive Factorial Implementation]]"
  - "[[Python - Base Case]]"
  - "[[Python - Time Complexity]]"
  - "[[Python - Space Complexity]]"
---
# Core: Memoization

## Summary

>Memoization is a performance optimization technique used to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again. It's a specific form of caching, primarily applied to functions. This approach is a cornerstone of the top-down strategy in [[Python - Dynamic Programming|Dynamic Programming]], where it prevents the repeated calculation of overlapping subproblems common in [[Python - Recursion|recursive]] algorithms.

**Why This Matters:** Memoization dramatically speeds up applications by eliminating redundant computations, transforming algorithms from impractically slow (exponential time) to highly efficient (linear time).

_Analogy:_ _Imagine you're a math student solving a complex multi-step problem on a test. The problem requires you to calculate $7 \times 13$ multiple times in different sections. The first time you see it, you do the multiplication and get 91. Instead of re-calculating it every subsequent time, you jot down '$7 \times 13 = 91$' in the margin. Now, whenever you encounter '$7 \times 13$', you just glance at your note and use the answer 91 instantly, saving time and mental effort._

In this analogy:
- **You, the student:** The program or CPU.
- **The calculation '$7 \times 13$':** The expensive function call with specific inputs (7 and 13).
- **The result '91':** The cached return value of the function.
- **The margin note:** The memoization cache (like a dictionary or hash map) that stores the results.
- **Where it breaks down:** The analogy implies a conscious decision. In programming, memoization is an automatic process baked into the function's logic. Furthermore, the 'margin' has limited space, mirroring the real-world memory cost of a cache.

```
Function Call with input 'n'
          │
          ▼
┌───────────────────┐
│ Is 'n' in cache?  │
└─────────┬─────────┘
          │
    ┌─────┴─────┐
   YES          NO
    │           │
    ▼           ▼
┌──────────┐  ┌──────────────────┐
│ Return   │  │ Compute result   │
│ cache[n] │  └─────────┬────────┘
└──────────┘            │
                        ▼
                    ┌──────────────────┐
                    │ Store result in  │
                    │ cache: cache[n]  │
                    └─────────┬────────┘
                              │
                              ▼
                          ┌──────────┐
                          │ Return   │
                          │ result   │
                          └──────────┘
```

## Details

The core idea of memoization is to trade memory for speed. When a function is called, it first checks if it has already computed the result for the given set of inputs. If it has, it returns the stored result without re-executing. If not, it computes the result, stores it in a data structure (typically a dictionary or hash map) for future use, and then returns it. This is particularly effective for functions that are 'pure'—meaning they always produce the same output for the same input—and are frequently called with the same arguments, a common pattern in recursive algorithms that solve overlapping subproblems.

#### Primary Goal

To avoid redundant, time-consuming computations by caching and reusing previously computed results.

#### Mechanism

- **Step 1: Create a Cache**
    - Initialize a data structure, typically a dictionary (hash map), to act as a cache. This cache will store input-to-output mappings. It is often passed as an argument to the function or maintained in a closure.
- **Step 2: Check the Cache**
    - At the beginning of the function call, check if the current inputs already exist as a key in the cache.
- **Step 3: Return from Cache (Cache Hit)**
    - If the key exists, immediately return the corresponding value from the cache, skipping all further computation.
- **Step 4: Compute and Store (Cache Miss)**
    - If the key does not exist, execute the function's normal logic to compute the result. Before returning the result, store it in the cache with the inputs as the key.

##### Code Translation

```python
# --- Step 1: Create a Cache ---
# The 'memo' dictionary will act as our cache.
memo = {}

def fibonacci_memo(n, memo):
    # --- Step 2: Check the Cache ---
    if n in memo:
        # --- Step 3: Return from Cache (Cache Hit) ---
        return memo[n]

    # Base cases for the recursion
    if n <= 1:
        return n

    # --- Step 4: Compute and Store (Cache Miss) ---
    # The result is computed recursively
    result = fibonacci_memo(n - 1, memo) + fibonacci_memo(n - 2, memo)
    
    # Store the result in the cache before returning
    memo[n] = result
    return result

# Example usage:
# Without memoization, fib(40) would take a very long time.
# With memoization, it's nearly instantaneous.
print(f"Fibonacci(10): {fibonacci_memo(10, {})}")
print(f"Fibonacci(40): {fibonacci_memo(40, {})}")

# Python's built-in way using a decorator from functools
from functools import lru_cache

@lru_cache(maxsize=None) # maxsize=None means an unbounded cache
def fib_lru(n):
    if n <= 1:
        return n
    return fib_lru(n-1) + fib_lru(n-2)

print(f"Fibonacci(40) with lru_cache: {fib_lru(40)}")
```

 [[Code - Memoization Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Cache Size**
    - The maximum number of results to store. An unbounded cache can consume significant memory, while a small cache might have a low hit rate, reducing the effectiveness of memoization. Python's `@lru_cache` decorator allows you to set a `maxsize`.
- **Cache Data Structure**
    - A dictionary or hash map is most common due to its O(1) average time complexity for lookups. For a specific problem domain (e.g., inputs are always sequential integers), an array or list might be more efficient.

#### Core Trade-offs

- **Time vs. Space**
    - The primary tradeoff. Memoization decreases runtime (time complexity) at the cost of increased memory usage (space complexity) to store the cache.
- **Overhead**
    - For functions that are very fast to compute or are rarely called with the same inputs, the overhead of checking and storing values in the cache can actually make the program slower.
- **Function Purity**
    - Memoization is only safe for 'pure' functions—those that have no side effects and always return the same output for the same inputs. Using it on impure functions (e.g., one that depends on the current time or a random number) will lead to incorrect, stale results.

## Connections

```
                      (Parent)
               Dynamic Programming
                        ▲
                        │
        ┌───────────────┼────────────────┐
        │               │                │
(Optimizes)      ┌──────────────┐      (Implemented With)
 Recursion       │ Memoization  │      Decorators
                 └──────────────┘
                        │
                        ▼
                  (Avoids filling)
                   Call Stack
```

### Parent Concept

Memoization is the core technique used in the top-down approach of [[Python - Dynamic Programming|Dynamic Programming]].

### Child Concepts



### Related Concepts 

- It is most commonly applied to optimize naive [[Python - Recursion|recursive]] algorithms that suffer from overlapping subproblems.
- The relationship between these concepts is central to the [[Python - Recursion & Dynamic Programming Relationship|Recursion & Dynamic Programming Relationship]].
- By preventing deep, redundant recursive calls, memoization helps avoid exhausting the [[Python - Call Stack|call stack]].
- In Python, memoization can be elegantly implemented using [[Python - Decorators|Decorators]], such as `@lru_cache` from the `functools` module.
## Questions

- You have a recursive function with overlapping subproblems running on a memory-constrained embedded device. When might you choose *not* to use memoization, and how would you justify the performance trade-off to your team?
- How would you design a memoization cache for a function that is executed across a distributed system of multiple servers? What are the primary challenges regarding cache consistency, invalidation, and network latency?
- What if a function's output was non-deterministic (e.g., it involved a random process but had a stable probability distribution for a given input)? Could you design a 'probabilistic memoization' that caches the *distribution* of results instead of a single value, and what would be a practical use case for it?