---
tags: 
  - core
  - algorithms
  - selection_sort
  - in_place_sort
  - sorting_algorithm
  - python_implementation
  - nested_loops
  - concept
source: 
  - "[[Data Structures and Algorithms in Python]]"
related: 
  - "[[DSA - Selection Sort Process]]"
  - "[[DSA - Selection Sort Time Complexity]]"
  - "[[DSA - Insertion Sort Python Implementation]]"
  - "[[DSA - Insertion Sort Process]]"
  - "[[DSA - Selection Sort vs Insertion Sort]]"
  - "[[DSA - Big O Notation]]"
  - "[[Python - for Loop]]"
  - "[[Python - Lists]]"
  - "[[Python - List Manipulation]]"
  - "[[DSA - Data Structures & Algorithms]]"
  - "[[Python - Functions]]"
  - "[[Python - Comparison Operators]]"
  - "[[DSA - Searching Algorithms]]"
---
# Core: Selection Sort Python Implementation

## Summary

>This note details the Python implementation of the Selection Sort algorithm. It translates the conceptual [[DSA - Selection Sort Process]] into working code, utilizing nested loops to iteratively find the minimum element in the unsorted portion of a list and swap it into its correct position. The result is an in-place sorting method that is simple to understand and write.

**Why This Matters:** Translating the theoretical steps of an algorithm like selection sort into functional code is a fundamental skill that bridges the gap between abstract concepts and practical problem-solving in software development.

_Analogy:_ _Imagine you're arranging a line of people by height. You, the programmer, stand at the beginning of the line. You look at the first person (index `i`) and then walk down the entire rest of the line (the inner `j` loop) to find the absolute shortest person. You don't move anyone yet, you just remember who the shortest person is. Once you've scanned everyone, you tell the person at your starting spot (`i`) to swap places with the shortest person you found. Then, you take one step to the right (increment `i`) and repeat the whole process for the rest of the line._

The Python code is the set of instructions you follow. The outer loop (`for i`) is you moving one step down the line after each swap. The inner loop (`for j`) is you scanning the remaining people. The `lowest` and `index` variables are your memory of who the shortest person is and where they are standing. The final swap is the two people actually changing places.

*   **Where it breaks down:** A human can often visually identify the shortest person in a group almost instantly. The computer, however, must perform a rigid, one-by-one comparison (`if my_list[j] < lowest`) for every single person in the unsorted section, which is why the algorithm is less efficient for large lists.

```
Initial List: [64, 25, 12, 22, 11]

--- Pass 1 (i=0) ---
Scan [64, 25, 12, 22, 11] -> Min is 11 at index 4
Swap my_list[0] and my_list[4]
Result: [11, | 25, 12, 22, 64]
         ^ Sorted

--- Pass 2 (i=1) ---
Scan [25, 12, 22, 64] -> Min is 12 at index 2
Swap my_list[1] and my_list[2]
Result: [11, 12, | 25, 22, 64]
         ^----^ Sorted

--- Pass 3 (i=2) ---
Scan [25, 22, 64] -> Min is 22 at index 3
Swap my_list[2] and my_list[3]
Result: [11, 12, 22, | 25, 64]
         ^-------^ Sorted
...
```

## Details

The Python implementation of selection sort is a direct translation of its procedural logic. The core of the code consists of two nested `for` loops. The outer loop iterates through the list, with its index `i` acting as a moving wall that separates the sorted portion on the left from the unsorted portion on the right. For each position `i`, the inner loop scans the entire unsorted portion to find the index of the minimum element. After the inner loop completes its scan, a single swap operation places this minimum element at position `i`, thereby expanding the sorted portion by one.

#### Primary Goal

To provide a concrete, functional Python code that sorts a list of elements in-place using the selection sort algorithm.

#### Mechanism

- **Step 1: Define the Function and Outer Loop**
    - Create a function `selection_sort` that accepts a list. The outer loop, `for i in range(list_length - 1)`, iterates from the first element up to the second-to-last. The index `i` marks the boundary for the current pass.
- **Step 2: Initialize Minimum Value Tracking**
    - At the start of each outer loop iteration, assume the element at the current boundary, `my_list[i]`, is the smallest in the unsorted part. Store its value in a `lowest` variable and its position in an `index` variable.
- **Step 3: Scan for the True Minimum**
    - The inner loop, `for j in range(i + 1, list_length)`, begins from the element immediately after `i` and scans to the end of the list.
- **Step 4: Update Minimum if a Smaller Value is Found**
    - Inside the inner loop, an `if` statement checks if the current element, `my_list[j]`, is less than the `lowest` value found so far. If it is, update `lowest` and `index` with the new minimum's value and position.
- **Step 5: Swap the Elements**
    - After the inner loop has finished its scan, the `index` variable holds the position of the absolute minimum in the unsorted part. A single tuple assignment, `my_list[i], my_list[index] = my_list[index], my_list[i]`, swaps the element at the current boundary `i` with this minimum element.
- **Step 6: Return the Sorted List**
    - Once the outer loop completes, the entire list has been sorted. The function returns the modified list.

##### Code Translation

```python
def selection_sort(my_list):
    list_length = len(my_list)

    # --- Step 1: Outer loop to iterate through the list ---
    for i in range(list_length - 1):

        # --- Step 2: Assume the first element of the unsorted part is the minimum ---
        lowest = my_list[i]
        index = i

        # --- Step 3: Inner loop to scan the rest of the list ---
        for j in range(i + 1, list_length):

            # --- Step 4: Update if a smaller element is found ---
            if my_list[j] < lowest:
                index = j
                lowest = my_list[j]

        # --- Step 5: Swap the found minimum with the first element of the unsorted part ---
        my_list[i], my_list[index] = my_list[index], my_list[i]

    # --- Step 6: Return the now-sorted list ---
    return my_list

# Example usage:
print(selection_sort([64, 25, 12, 22, 11]))
# Output: [11, 12, 22, 25, 64]
```

 [[Code - Selection Sort Python Implementation Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Input List (`my_list`)**
    - The primary input is the list of elements to be sorted. The characteristics of this list, such as its size, directly influence the algorithm's runtime.
    - Unlike some other algorithms, the initial order of elements does not change the number of comparisons. The [[DSA - Selection Sort Time Complexity|time complexity]] remains $O(n^2)$ even for a nearly-sorted list because the inner loop always scans the entire remaining part.

#### Core Trade-offs

- **Simplicity and Memory Efficiency**
    - The code is straightforward and easy to understand, making it a good educational tool for learning about sorting algorithms and nested loops.
    - It is an in-place algorithm, meaning it sorts the list without requiring significant additional memory, giving it a space complexity of $O(1)$.
- **Poor Time Complexity**
    - The primary drawback is its quadratic time complexity, $O(n^2)$, which makes it highly inefficient for sorting large lists. The number of comparisons grows exponentially with the size of the input.
    - As explored in [[DSA - Selection Sort vs Insertion Sort|comparison to other sorts]], algorithms like Insertion Sort can perform better on partially sorted data, while Selection Sort's performance is consistently poor regardless of the input's initial state.

## Connections

```
                          (Parent)
                  Selection Sort Process
                           ▲
                           │
           ┌───────────────┼────────────────────────────┐
           │               │                            │
(Contrasting Impl)┌───────────────────────────┐   (Performance)
Insertion Sort    │ Selection Sort Python Impl│   Time Complexity
                  └───────────────────────────┘
```

### Parent Concept

This note provides the practical code for the conceptual framework laid out in [[DSA - Selection Sort Process]].

### Child Concepts



### Related Concepts 

- The performance characteristics of this implementation are analyzed in detail in [[DSA - Selection Sort Time Complexity]].
- This implementation's strategy of finding the minimum and swapping once per pass contrasts with the method used in [[DSA - Insertion Sort Python Implementation]], which involves multiple shifts.
- A high-level comparison of the strategic differences between this algorithm and its close relative is covered in [[DSA - Selection Sort vs Insertion Sort]].
- The underlying logic of nested iteration is a core concept explained in [[Python - for Loop]].
## Questions

- Selection sort is known for minimizing the number of swaps (exactly N-1). If you were designing a system where write operations to memory were extremely expensive (e.g., writing to flash memory with a limited lifespan) but read operations were cheap, how would you justify choosing this $O(n^2)$ algorithm over a faster one like Quicksort to a non-technical stakeholder?
- Imagine you need to sort a massive dataset that doesn't fit into memory (e.g., a 100GB file on disk). How would you adapt the core logic of this selection sort implementation to work on such an external dataset? What would be the primary performance bottleneck in that system?
- What if, due to a strange hardware limitation, you could only compare and swap adjacent elements in the list? How could you modify the selection sort algorithm to find and move the minimum element to the front under this constraint, and what would be the impact on its swap count and overall time complexity?