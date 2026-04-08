---
tags: 
  - core
  - cs
  - logarithmic
  - big_o
  - divide_and_conquer
  - binary_search
  - efficiency
  - concept
source: 
  - "[[Data Structures and Algorithms in Python]]"
related: 
  - "[[DSA - Time Complexity]]"
  - "[[DSA - Big O Notation]]"
  - "[[DSA - O(1) Constant Time Complexity]]"
  - "[[DSA - O(n) Linear Time Complexity]]"
  - "[[DSA - O(n^2) Quadratic Time Complexity]]"
  - "[[DSA - O(n^3) Cubic Time Complexity]]"
  - "[[DSA - O(n log n) Linearithmic Time Complexity]]"
  - "[[DSA - Space Complexity]]"
  - "[[DSA - Simplifying Big O Notation]]"
  - "[[DSA - Calculating Big O Complexity]]"
  - "[[Fundamental - Computer Science]]"
  - "[[DSA - Binary Search]]"
  - "[[DSA - Sorting Algorithms]]"
  - "[[DSA - Balanced Binary Search Tree]]"
---
# Core: O(log n) Logarithmic Time Complexity

## Summary

>An algorithm with O(log n) or logarithmic time complexity is one where the time it takes to run increases logarithmically with the size of the input ($n$). This means that if you double the input size, you only add a single extra operation. This makes it incredibly efficient and scalable, standing in stark contrast to [[DSA - O(n) Linear Time Complexity|linear time]], where doubling the input size doubles the work.

**Why This Matters:** Logarithmic time complexity is the hallmark of highly efficient algorithms, enabling them to process massive datasets by repeatedly halving the problem size with each step.

_Analogy:_ _Imagine you're trying to find a specific word in a massive, physical dictionary. You wouldn't start at the first page and read every word (a linear approach). Instead, you'd open it to the middle. If your word comes alphabetically after the words on that page, you discard the entire first half of the book. You then take the remaining half and repeat the process, again opening to its middle. You very quickly narrow down the search to a single page._

-
- **The Dictionary:** Represents the entire sorted dataset of size $n$.
- **The Word You're Looking For:** The specific element you are searching for.
- **Opening to the Middle & Discarding Half:** This is the core logarithmic operation. With each step, you eliminate half of the remaining possibilities.
- **Number of Times You Open the Book:** This corresponds to the number of operations, which is proportional to $\log(n)$.
- **Where it breaks down:** This analogy assumes the data (the dictionary) is already perfectly sorted. If it's not, you can't use this method. Furthermore, accessing the 'middle' of a data structure in a computer isn't always an instantaneous, free operation.

```
Binary Search on an array of size 8:

Initial Search Space: [1] [2] [3] [4] [5] [6] [7] [8]
                      └─────────────────┬─────────────────┘
                                        │ (Check middle)
Step 1 Search Space:   [1] [2] [3] [4]
                       └───────┬───────┘
                               │ (Check middle)
Step 2 Search Space:           [3] [4]
                               └─┬─┘
                                 │ (Check middle)
Step 3 Search Space:             [4]
                                (Found)
```

## Details

Logarithmic time complexity, denoted as $O(\log n)$, describes algorithms that follow a 'divide and conquer' strategy. With each step, the algorithm reduces the size of the problem by a constant fraction, most commonly by half. This systematic reduction means that the algorithm's runtime grows very slowly, even as the input size ($n$) grows exponentially. This efficiency is a key goal in algorithm design and is a fundamental concept within [[DSA - Big O Notation|Big O notation]] for analyzing performance.

#### Primary Goal

To achieve maximum efficiency when searching or operating on large, sorted datasets by systematically and repeatedly reducing the problem size.

#### Mechanism

- **How it Works:**
    1. The algorithm begins with a problem of size $n$.
    2. In a single step, it performs an operation that reduces the effective size of the problem to a fraction of its original size (e.g., to $n/2$ or $n/3$).
    3. This process is repeated on the smaller sub-problem until the problem is so small it can be solved directly (the 'base case').
    4. Because the problem size is divided at each step, the total number of steps required is logarithmic with respect to the original size $n$.
- **Classic Example: Binary Search**
    - Binary search is the quintessential $O(\log n)$ algorithm, used to find an element in a *sorted* array.
    - *Example: Find `42` in the sorted array `[11, 20, 35, 42, 59, 68, 77]`*
        1. **Step 1:** Look at the middle element, `42`. It's a match! The search is over in one step.
    - *Example: Find `20` in the same array*
        1. **Step 1:** Look at the middle element, `42`. `20` is less than `42`, so discard the right half. The new search space is `[11, 20, 35]`.
        2. **Step 2:** Look at the middle of the new space, `20`. It's a match! The search took two steps.
        - In contrast, a linear search would have taken two steps for `20` but four steps for `42`.

##### Code Translation

```python
def binary_search(sorted_list, target):
    """An O(log n) implementation of binary search."""
    low = 0
    high = len(sorted_list) - 1

    # --- The loop continues as long as the search space has not been narrowed to zero ---
    while low <= high:
        # --- Step 1: Find the middle index ---
        mid = (low + high) // 2
        guess = sorted_list[mid]

        # --- Step 2: Compare and reduce the problem size ---
        if guess == target:
            return mid  # Target found
        if guess > target:
            high = mid - 1  # Discard the right half
        else:
            low = mid + 1   # Discard the left half

    return None # Target not in list

# Example Usage
my_list = [1, 3, 5, 7, 9, 11, 13, 15, 17]
print(f"Found at index: {binary_search(my_list, 11)}") # Output: Found at index: 5
print(f"Found at index: {binary_search(my_list, -1)}") # Output: Found at index: None
```

 [[Code - O(log n) Logarithmic Time Complexity Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Input Size ($n$):** This is the primary factor influencing performance. The key benefit of $O(\log n)$ is that the runtime increases extremely slowly as $n$ grows.
- **Base of the Logarithm:** In binary search, the base is 2 because we divide the problem by 2 each time. However, in [[DSA - Simplifying Big O Notation|Big O notation]], the base of the logarithm is considered a constant factor and is omitted. Whether it's $\log_2 n$ or $\log_{10} n$, the growth characteristic is the same: logarithmic.

#### Core Trade-offs

- **Pro: Extreme Efficiency & Scalability:** For very large datasets, $O(\log n)$ is dramatically faster than polynomial complexities like [[DSA - O(n) Linear Time Complexity|O(n)]] or [[DSA - O(n^2) Quadratic Time Complexity|O(n^2)]]. An algorithm that takes 30 steps for a billion items is incredibly powerful.
- **Con: Data Pre-requisites:** The most common logarithmic algorithms, like binary search, have a strict requirement that the data must be sorted. The cost of sorting the data initially (which is often $O(n \log n)$) must be factored into the total complexity if the data isn't already sorted.
- **Con: Not Universally Applicable:** These algorithms are not suitable for problems that require visiting every element, such as finding the largest item in an *unsorted* array. In such cases, an $O(n)$ approach is unavoidable.

## Connections

```
                      (Parent)
                 Time Complexity
                         ▲
                         │
┌────────────────────────┼────────────────────────┐
│                        │                        │
(Faster)         ┌───────────────────┐        (Slower)
O(1)             │ O(log n)          │        O(n)
                 └───────────────────┘
                         │
                         │ (Component Of)
                         ▼
                    O(n log n)
```

### Parent Concept

It is a specific classification of algorithmic efficiency described by [[DSA - Time Complexity|time complexity]] analysis.

### Child Concepts



### Related Concepts 

- It is a fundamental category within the framework of [[DSA - Big O Notation|Big O notation]], representing a highly efficient growth rate.
- It contrasts sharply with [[DSA - O(n) Linear Time Complexity|linear time complexity]], which is significantly slower as input size grows.
- While incredibly fast, it is still slower than the ideal [[DSA - O(1) Constant Time Complexity|constant time complexity]], where performance is independent of input size.
- It is a core component of O(n log n) (linearithmic) complexity, which often involves performing a logarithmic operation for each of the $n$ elements.
## Questions

- You're designing a system for an e-commerce site's product lookup. You can either use a simple linear search on the product list, which is easy to implement, or invest development time to implement a binary search, which requires keeping the product list sorted at all times. How would you decide which to use, and how would you justify the potential extra cost of the logarithmic approach to a project manager?
- Imagine a distributed system with a massive, sorted dataset spread across multiple servers. How would you adapt an algorithm like binary search to work in this environment, and what new bottlenecks (like network latency) would become more significant than the computational complexity itself?
- What if memory access was not a constant time operation, but instead took logarithmic time relative to the size of the memory? How would this fundamentally change our evaluation of algorithms, and would O(log n) algorithms still be considered 'efficient'?