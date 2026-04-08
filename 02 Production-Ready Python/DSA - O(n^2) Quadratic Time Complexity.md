---
tags: 
  - core
  - cs
  - quadratic_time
  - big_o
  - nested_loops
  - scalability
  - performance
  - concept
source: 
  - "[[Data Structures and Algorithms in Python]]"
related: 
  - "[[DSA - Big O Notation]]"
  - "[[DSA - Time Complexity]]"
  - "[[DSA - O(n) Linear Time Complexity]]"
  - "[[DSA - O(n^3) Cubic Time Complexity]]"
  - "[[DSA - O(log n) Logarithmic Time Complexity]]"
  - "[[DSA - O(1) Constant Time Complexity]]"
  - "[[DSA - O(n^2) Quadratic Time Example (Nested Loop)]]"
  - "[[DSA - Simplifying Big O Notation]]"
  - "[[DSA - Calculating Big O Complexity]]"
  - "[[DSA - Space Complexity]]"
  - "[[DSA - Time vs Space Complexity]]"
  - "[[Fundamental - Computer Science]]"
  - "[[Fundamental - Programming]]"
  - "[[Python - for Loop]]"
---
# Core: O(n^2) Quadratic Time Complexity

## Summary

>O(n^2), known as quadratic time, describes an algorithm whose performance is directly proportional to the square of the size of its input ($n$). As the context notes, this means the number of operations increases significantly with more input, making it much less efficient than [[DSA - O(n) Linear Time Complexity|linear time]] algorithms for large datasets.

**Why This Matters:** Recognizing quadratic time complexity is crucial because it signals an algorithm that will become unusably slow as the input data grows, often leading to major performance bottlenecks in applications.

_Analogy:_ _Imagine you're at a networking event with 'n' people. To ensure everyone meets everyone, you instruct each person to shake hands with every other person in the room. If there are 10 people, the first person shakes 9 hands, the second shakes 8 new hands, and so on. The total number of handshakes grows much faster than the number of people._

In this analogy, the 'n' people represent the input size, and each handshake is an 'operation'. As you add more people, the total number of required handshakes (operations) increases quadratically. For 'n' people, there are roughly $n * (n-1) / 2$ handshakes, which in [[DSA - Big O Notation|Big O Notation]] simplifies to $O(n^2)$.

*   **Where it breaks down:** In a real event, people might form smaller groups or be introduced simultaneously. This analogy assumes a rigid, one-by-one pairwise interaction, which is precisely what leads to the quadratic complexity in algorithms.

```
Input Size (n) vs. Operations (n^2)
-------------------------------------
|    n    |   Operations (n^2)  |
|---------|---------------------|
|    1    |          1          |
|    10   |         100         |
|   100   |        10,000       |
|  1,000  |      1,000,000      |
| 10,000  |    100,000,000    |
```

## Details

Quadratic time complexity, denoted as $O(n^2)$, is a performance characteristic in [[Fundamental - Computer Science|computer science]] where the execution time of an algorithm grows with the square of the input size ($n$). This typically occurs when an algorithm needs to compare every element of a collection to every other element. The most common pattern that results in quadratic time is a nested loop, where an inner loop iterates over the same collection as an outer loop.

#### Primary Goal

To classify algorithms whose workload increases quadratically relative to the input size, helping developers identify potentially non-scalable code.

#### Mechanism

- **How it Works:**
    1.  The algorithm takes an input of size $n$ (e.g., a list with $n$ elements).
    2.  For each of the $n$ elements, it performs a set of operations that involves iterating through all $n$ elements again.
    3.  This results in approximately $n \times n = n^2$ total operations. As $n$ grows, the execution time grows by a factor of $n^2$.
- **Common Cause: Nested Iteration**
    - The most frequent source of $O(n^2)$ complexity is a loop nested inside another loop, where both loops iterate up to $n$.
    - Example: *For each item in a list, check every other item in the same list to find duplicates.*
    - A concrete implementation of this can be seen in the [[DSA - O(n^2) Quadratic Time Example (Nested Loop)]] note.

##### Code Translation

```python
# This function checks for duplicate values in a list.
# It demonstrates a classic O(n^2) algorithm.
def find_duplicates(data_list):
    # --- Outer loop iterates n times ---
    for i in range(len(data_list)):
        # --- Inner loop also iterates n times for each outer loop iteration ---
        for j in range(len(data_list)):
            # We check if we are not comparing the element to itself
            if i != j:
                # If we find two different indices with the same value, it's a duplicate
                if data_list[i] == data_list[j]:
                    return True # Found a duplicate
    return False # No duplicates found

my_list = [1, 2, 3, 4, 5, 6, 7, 3] # n = 8
# The function will perform roughly 8*8 = 64 comparisons.
print(find_duplicates(my_list))
```

 [[Code - O(n^2) Quadratic Time Complexity Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Input Size ($n$)**
    - This is the primary factor. The quadratic relationship means that doubling the input size quadruples the execution time (e.g., from $10^2=100$ to $20^2=400$ operations).

#### Core Trade-offs

- **Advantage: Simplicity**
    - Quadratic algorithms are often the most straightforward and easiest to conceptualize and implement for problems involving pairwise comparisons (e.g., finding the closest pair of points in a set).
- **Disadvantage: Poor Scalability**
    - As highlighted in the context, the number of operations 'increases by a lot'. This makes $O(n^2)$ algorithms impractical for large datasets, as they quickly become too slow to be useful in real-world applications.

## Connections

```
                      (Parent)
                 Time Complexity
                        ▲
                        │
┌───────────────────────┼────────────────────────┐
│                       │                        │
(Slower)       ┌──────────────────────────┐      (Faster)
O(n^3) Cubic   │ O(n^2) Quadratic Time    │      O(n) Linear
               └──────────────────────────┘
                        │
                        ▼
                    (Example)
      O(n^2) Quadratic Time Example (Nested Loop)
```

### Parent Concept

This is a specific classification within the broader framework of [[DSA - Time Complexity]], which analyzes how an algorithm's runtime changes with input size.

### Child Concepts

- A direct implementation is the [[DSA - O(n^2) Quadratic Time Example (Nested Loop)]], which uses nested loops to demonstrate this behavior.

### Related Concepts 

- It represents a significant performance decrease compared to [[DSA - O(n) Linear Time Complexity|O(n) linear time]], where work grows proportionally to the input.
- It is less efficient but often conceptually simpler than more optimized algorithms like [[DSA - O(log n) Logarithmic Time Complexity|O(log n) logarithmic time]].
- This concept is a fundamental part of [[DSA - Big O Notation|Big O notation]], which is used to formally describe algorithm performance.
- It serves as a stepping stone to understanding even less scalable complexities, such as [[DSA - O(n^3) Cubic Time Complexity|O(n^3) cubic time]].
## Questions

- You've identified a critical feature's algorithm as O(n^2). The engineering team says a rewrite to O(n log n) will take two months. Given that user growth is projected to double in three months, how do you justify the immediate need for this refactor to a product manager who is focused on shipping new features?
- Imagine a social media 'people you may know' feature that uses a quadratic algorithm to compare every user with every other user. How would you re-architect this system to handle millions of users without performing n-squared comparisons in real-time? What kind of pre-computation or data structures might you use?
- What if you had a hardware architecture with a massive number of parallel cores, where you could perform 'n' comparisons simultaneously? How would this change the practical impact of an O(n^2) algorithm, even if the theoretical complexity remains the same?