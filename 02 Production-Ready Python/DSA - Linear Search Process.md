---
tags: 
  - process
  - cs
  - sequential_search
  - brute_force
  - iteration
  - unsorted_data
  - o(n)
  - concept
source: 
  - "[[Data Structures and Algorithms in Python]]"
related: 
  - "[[DSA - Searching Algorithms]]"
  - "[[DSA - Linear Search & Time Complexity Relationship]]"
  - "[[DSA - Binary Search]]"
  - "[[DSA - Binary Search Process]]"
  - "[[DSA - Linear Search vs Binary Search]]"
  - "[[Fundamental - Computer Science]]"
  - "[[Python - for Loop]]"
  - "[[Python - Lists]]"
  - "[[Python - Iteration]]"
  - "[[Python - Conditional Statements]]"
  - "[[Python - Functions]]"
  - "[[Fundamental - Software Engineering]]"
---
# Process: Linear Search

**Why This Matters:** Linear search is the foundational brute-force method for finding an element, providing a simple and universal solution that works on any list, regardless of its order.
## Goal & Analogy

> **Goal:** Linear search, also known as sequential search, is a fundamental algorithm for finding a target value within a list. It operates by sequentially checking each element of the list until a match is found or the whole list has been searched. It is one of the simplest [[DSA - Searching Algorithms|searching algorithms]] to implement.

_Analogy:_ _Imagine you're looking for a specific book, "Moby Dick," on a single, long, and completely disorganized bookshelf. You have no choice but to start at the very first book on the left, check its title, and if it's not the one you're looking for, move to the next one, and so on, until you either find "Moby Dick" or reach the end of the shelf._

  * **The Bookshelf:** The list or array of data.
  * **Each Book:** An element in the list.
  * **"Moby Dick":** The search value you are trying to find.
  * **Your Process:** The linear search algorithm, moving one by one.
  * **Where it breaks down:** This analogy perfectly captures the sequential nature but doesn't illustrate the performance cost. For a small shelf, it's fine. For a massive library (a large dataset), this method becomes incredibly slow and impractical. It also doesn't have a good parallel for the concept of a sorted list, which is where algorithms like [[DSA - Binary Search|binary search]] excel.

```
List: [15, 2, 21, 3, 12, 7, 8]
Search Value: 8

Iteration 1:
[15, 2, 21, 3, 12, 7, 8]  Is 15 == 8? No.
 ▲

Iteration 2:
[15, 2, 21, 3, 12, 7, 8]  Is 2 == 8? No.
    ▲

... (iterations 3-6) ...

Iteration 7:
[15, 2, 21, 3, 12, 7, 8]  Is 8 == 8? Yes! Return True.
                      ▲
```

## The Step-by-Step Process

### Prerequisites / Inputs

- **List/Array**
    - The collection of items to be searched. A key feature of linear search is that this list does not need to be sorted.
- **Search Value**
    - The specific item you are trying to find within the list.

### The Steps

- **Step 1: Start at the Beginning**
    - The algorithm begins its search at the very first element of the list (index 0).
- **Step 2: Compare and Check**
    - It compares the current element with the `search_value`.
- **Step 3: Handle a Match**
    - If the current element is equal to the `search_value`, the search is successful. The algorithm immediately stops and returns `True`.
- **Step 4: Continue to the Next Element**
    - If the elements are not equal, the algorithm moves to the next element in the sequence and repeats Step 2.
- **Step 5: Handle End of List**
    - If the algorithm reaches the end of the list without finding the `search_value`, the search is unsuccessful, and it returns `False`.

##### Code Translation

```python
def linear_search(unordered_list, search_value):
  # --- Step 1 & 4 ---
  # The for loop starts at the first element (index 0) and iterates to the next.
  for index in range(len(unordered_list)):
    # --- Step 2 ---
    # Compare the element at the current index with the search value.
    if unordered_list[index] == search_value:
      # --- Step 3 ---
      # If a match is found, return True and exit the function.
      return True
  # --- Step 5 ---
  # If the loop completes without finding a match, return False.
  return False

# Example 1: Value is found
print(linear_search([15,2,21,3,12,7,8], 8))
# Output: True

# Example 2: Value is not found
print(linear_search([15,2,21,3,12,7,8], 800))
# Output: False
```

### Deliverables / Outputs

The core idea of linear search is straightforward: to find an item, we must look at every single spot it could be, one after another. As described in the implementation, we iterate over the elements in a list and, at each index, we check if the element is the one we're looking for. If we find it, we're done. If we get to the end of the list without finding it, we can conclude it's not there. This method belongs to the field of Data Structures and Algorithms (DSA) and is often the first searching algorithm taught due to its simplicity.

## Context & Tradeoffs

### When to Use This Process

To find a target value in a collection by examining every element sequentially from the beginning until the value is found or the end of the collection is reached.

### Common Pitfalls & Tradeoffs

- **Pro: Simplicity and Flexibility**
    - The algorithm is extremely easy to understand and implement. Its greatest advantage is that it works on any type of list, including unsorted data.
- **Con: Inefficiency on Large Datasets**
    - Its performance is directly proportional to the size of the list. As the list grows, the time it takes to find an element also grows linearly. This is explored in the [[DSA - Linear Search & Time Complexity Relationship|relationship between linear search and time complexity]].
    - For large, sorted datasets, it is significantly outperformed by algorithms like [[DSA - Binary Search|binary search]].

## Connections

```
                  (Parent)
             Searching Algorithms
                       ▲
                       │
┌──────────────────────┼──────────────────────┐
│                      │                      │
(Contrasts With)  ┌────────────────┐      (Foundation For)
 Binary Search    │  Linear Search │      More Complex Searches
                  └────────────────┘
                       │
                       │
       (Analyzed By) Time Complexity
```


- Linear search is a fundamental type of [[DSA - Searching Algorithms|searching algorithm]].
- It directly contrasts with the more efficient [[DSA - Binary Search|binary search]], which requires the data to be sorted.
- The performance implications of its sequential nature are detailed in the [[DSA - Linear Search & Time Complexity Relationship|analysis of its time complexity]].
- A direct comparison highlights the [[DSA - Linear Search vs Binary Search|trade-offs between linear and binary search]].

## Deeper Questions

- Imagine you are building a feature to search user permissions, where the list of permissions per user is typically very small (fewer than 10 items). How would you justify choosing linear search over a more complex but theoretically faster algorithm like binary search to your product manager, focusing on development time and system maintenance?
- If you had to implement a linear search on a dataset so massive it's distributed across a cluster of 100 machines, what would be the primary bottleneck in the system, and how would you design the process to parallelize the search and aggregate the results?
- What if you were told that the item you're searching for is *most likely* to be in the last 10% of the list? How could you modify the standard linear search algorithm to potentially improve its average-case performance, and what new risks or trade-offs would this modification introduce?