---
tags: 
  - core
  - cs
  - divide_and_conquer
  - logarithmic_time
  - sorted_array
  - search_algorithm
  - concept
source: 
  - "[[Data Structures and Algorithms in Python]]"
related: 
  - "[[DSA - Searching Algorithms]]"
  - "[[DSA - Linear Search]]"
  - "[[DSA - Linear Search vs Binary Search]]"
  - "[[DSA - Binary Search Process]]"
  - "[[DSA - Binary Search & Time Complexity Relationship]]"
  - "[[Fundamental - Computer Science]]"
  - "[[Python - Lists]]"
  - "[[Python - Tuples]]"
  - "[[DSA - Time Complexity]]"
  - "[[DSA - Big O Notation]]"
  - "[[DSA - Sorting Algorithms]]"
  - "[[DSA - Merge Sort]]"
  - "[[DSA - Quick Sort]]"
  - "[[DSA - Divide and Conquer]]"
---
# Core: Binary Search

## Summary

>A highly efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing the search interval in half, a core principle that makes it significantly faster than a [[DSA - Linear Search|linear search]] for large datasets.

**Why This Matters:** It enables applications to find specific items within massive, sorted datasets almost instantaneously, making features like auto-complete and database lookups feasible at scale.

_Analogy:_ _Imagine looking for the word 'Search' in a physical dictionary. You don't start at 'A' and read every word. Instead, you open the dictionary to the middle (maybe the 'M' section). You see 'Mountain' and realize 'Search' must come after it. So, you ignore the entire first half of the dictionary and repeat the process on the second half, opening it to its middle (perhaps the 'T' section). You keep halving the problem until you zero in on the exact page._

The Dictionary: The sorted list of data.
The Word 'Search': The target value you are looking for.
Opening to the Middle: Checking the middle element of the current search interval.
Ignoring a Half: Discarding the portion of the list where the target cannot be.
**Where it breaks down:** A physical dictionary has tabs (A, B, C...) that allow for an even faster initial jump than just going to the middle. Binary search is purely algorithmic and doesn't have these 'cheats'; it always starts exactly in the middle of the current range.

```
Target: 13

Initial State:
[1, 3, 5, 7, 9, 11, 13, 15, 17]
 L           M              H
(low=0, mid=4, high=8). Guess is 9. Target > 9. Search right.

Iteration 2:
[_, _, _, _, _, 11, 13, 15, 17]
                L   M   H
(low=5, mid=6, high=8). Guess is 13. Target == 13. Found!

Result: Index 6
```

## Details

Binary search is a fundamental algorithm in computer science, belonging to the family of [[DSA - Searching Algorithms]]. Its defining characteristic and absolute prerequisite is that it operates on a **sorted** collection of elements. Instead of checking each item one by one like in a [[DSA - Linear Search]], it employs a 'divide and conquer' strategy. By repeatedly targeting the midpoint of a list and eliminating half of the remaining elements in each step, it can locate a target value with remarkable speed. The detailed mechanics of this are outlined in the [[DSA - Binary Search Process]].

#### Primary Goal

To find the position of a target value within a sorted array efficiently by repeatedly halving the search space.

#### Mechanism

- **Step 1: Initialize Pointers**
    - Start with two pointers, `low` at the beginning of the list (index 0) and `high` at the end of the list (index `n-1`).
- **Step 2: Loop While Search Space is Valid**
    - Continue the search as long as the `low` pointer is less than or equal to the `high` pointer. If `high` becomes less than `low`, the item is not in the list.
- **Step 3: Find the Middle**
    - Calculate the middle index: `mid = (low + high) // 2`.
- **Step 4: Compare and Narrow the Search**
    - Compare the element at the `mid` index with the target value.
    - If `list[mid]` equals the target, the search is successful. Return the `mid` index.
    - If the target is *less than* `list[mid]`, it must be in the left half. Discard the right half by moving the `high` pointer: `high = mid - 1`.
    - If the target is *greater than* `list[mid]`, it must be in the right half. Discard the left half by moving the `low` pointer: `low = mid + 1`.
- **Step 5: Repeat or Conclude**
    - Go back to Step 2 with the new, smaller search space. If the loop finishes without finding the target, return an indicator (like -1) that the value was not found.

##### Code Translation

```python
def binary_search(sorted_list, target):
    # --- Step 1: Initialize Pointers ---
    low = 0
    high = len(sorted_list) - 1

    # --- Step 2: Loop While Search Space is Valid ---
    while low <= high:
        # --- Step 3: Find the Middle ---
        mid = (low + high) // 2
        guess = sorted_list[mid]

        # --- Step 4: Compare and Narrow the Search ---
        if guess == target:
            return mid  # Target found
        if guess > target:
            high = mid - 1  # Guess was too high, search left half
        else:
            low = mid + 1   # Guess was too low, search right half

    # --- Step 5: Conclude ---
    return -1 # Target not in list

# Example Usage:
my_list = [1, 3, 5, 7, 9, 11, 13, 15, 17]
target_value = 13
result = binary_search(my_list, target_value)

if result != -1:
    print(f"Element found at index: {result}")
else:
    print("Element not found in the list.")
```

 [[Code - Binary Search Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Sorted List/Array**
    - The collection of items to search through. This is the most critical parameter, as the algorithm fundamentally relies on the data being ordered.
- **Target Value**
    - The specific item you are trying to find within the list.

#### Core Trade-offs

- **Pro: Exceptional Speed**
    - Its primary advantage is its logarithmic time complexity, $O(\log n)$. As detailed in [[DSA - Binary Search & Time Complexity Relationship]], this means the number of comparisons grows very slowly as the list size increases, making it incredibly efficient for large datasets.
- **Con: Requires Sorted Data**
    - The list *must* be sorted before the search can begin. If the data is not already sorted, the cost of sorting it first (often $O(n \log n)$) can outweigh the benefit of the fast search, especially if you only need to search once.
- **Con: Requires Random Access**
    - Binary search needs to be able to jump to the middle element instantly. This makes it ideal for data structures like arrays but unsuitable for structures like linked lists, which only allow sequential access.

## Connections

```
                      (Parent)
               Searching Algorithms
                         ▲
                         │
         ┌───────────────┼───────────────┐
         │               │               │
(Contrasting)   ┌──────────────────┐   (Performance)
Linear Search   │  Binary Search   │   Time Complexity
                └──────────────────┘
                         │
                         │
                  (Detailed View)
                 Binary Search Process
```

### Parent Concept

Binary search is a specific implementation of the broader category of [[DSA - Searching Algorithms]].

### Child Concepts



### Related Concepts 

- It stands in stark contrast to [[DSA - Linear Search]], which examines every element sequentially and does not require a sorted list.
- The efficiency of this algorithm is best understood by analyzing the [[DSA - Binary Search & Time Complexity Relationship]], which is logarithmic.
- A direct comparison highlights the strengths and weaknesses in [[DSA - Linear Search vs Binary Search]].
- The step-by-step execution is detailed in [[DSA - Binary Search Process]].
## Questions

- When would the initial, one-time cost of sorting a massive, dynamic dataset be so high that it would be better to repeatedly use a less efficient [[DSA - Linear Search|linear search]] for a system that requires frequent lookups?
- Imagine you need to implement a search service for a petabyte-scale, sorted dataset distributed across thousands of machines. How would you adapt the binary search concept to work in this environment, and what are the primary bottlenecks (e.g., network latency, maintaining sort order across nodes)?
- What if your data was 'mostly sorted' but you knew that up to 5% of elements could be out of place? How could you modify the standard binary search algorithm to be more robust to these imperfections without resorting to a full linear scan, and what would the performance trade-offs be?