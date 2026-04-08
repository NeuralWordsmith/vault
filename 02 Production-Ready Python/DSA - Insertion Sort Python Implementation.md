---
tags: 
  - core
  - algorithms
  - sorting_algorithm
  - in-place_sort
  - stable_sort
  - python_implementation
  - nested_loops
  - concept
source: 
  - "[[Data Structures and Algorithms in Python]]"
related: 
  - "[[DSA - Insertion Sort Process]]"
  - "[[DSA - Insertion Sort Time Complexity]]"
  - "[[DSA - Selection Sort Python Implementation]]"
  - "[[DSA - Selection Sort Process]]"
  - "[[DSA - Selection Sort vs Insertion Sort]]"
  - "[[DSA - Searching Algorithms]]"
  - "[[DSA - Big O Notation]]"
  - "[[Python - for Loop]]"
  - "[[Python - while Loop]]"
  - "[[Python - Lists]]"
  - "[[Python - List Manipulation]]"
  - "[[DSA - Data Structures & Algorithms]]"
  - "[[Python - Functions]]"
---
# Core: Insertion Sort Python Implementation

## Summary

>This note details the Python code that implements the insertion sort algorithm. The code iterates through a list, treating the left portion as a sorted sub-array. For each new element, it finds the correct position within the sorted portion by shifting larger elements to the right and then inserts the element into the created gap. This 'shifting' approach is a key differentiator from the 'swapping' method used in [[DSA - Selection Sort Python Implementation]].

**Why This Matters:** This implementation provides a clear, practical example of an in-place sorting algorithm that is highly efficient for small or nearly-sorted datasets, making it a valuable tool for specific, optimized use cases.

_Analogy:_ _Imagine you're sorting a hand of playing cards. You pick up one card at a time from the pile on the table. For each new card, you look at the cards already in your hand (which you keep sorted) and find the right spot for the new card. You slide the other cards over to make a gap and then insert the new card. The Python implementation does the exact same thing with a list of numbers._

  - **Cards on the table:** The unsorted part of the Python list.
  - **Cards in your hand:** The sorted sub-list at the beginning of the Python list.
  - **Picking up a new card:** The `number_to_order` variable that stores the current element from the outer loop.
  - **Sliding cards over:** The `while` loop that shifts elements (`my_list[j + 1] = my_list[j]`) to the right.
  - **Inserting the new card:** Placing `number_to_order` into its correct position (`my_list[j + 1] = number_to_order`).
  - **Where it breaks down:** A human can see the correct spot and insert a card in one motion. The algorithm must mechanically shift each larger element one by one, which is where the computational cost comes from.

```
Initial: [5, 2, 4, 6, 1, 3]

i=1, num_to_order=2
  j=0: 2 < 5? Yes. Shift 5 right.
  List: [5, 5, 4, 6, 1, 3]
  Insert 2 at j+1=0: [2, 5, 4, 6, 1, 3]

i=2, num_to_order=4
  j=1: 4 < 5? Yes. Shift 5 right.
  List: [2, 5, 5, 6, 1, 3]
  j=0: 4 < 2? No. Loop ends.
  Insert 4 at j+1=1: [2, 4, 5, 6, 1, 3]

i=3, num_to_order=6
  j=2: 6 < 5? No. Loop ends.
  Insert 6 at j+1=3: [2, 4, 5, 6, 1, 3] (no change)

...and so on.
```

## Details

This note breaks down the practical Python code for implementing insertion sort, a fundamental algorithm in computer science. The provided code translates the conceptual [[DSA - Insertion Sort Process]] into a working function. The core logic revolves around a nested loop structure: an outer loop iterates through the list to select an element, and an inner loop works backward through the already sorted portion of the list to find the correct insertion point for that element.

#### Primary Goal

To provide a concrete, working Python function that sorts a list of numbers in-place using the insertion sort method.

#### Mechanism

- **Step 1: Initialize the Outer Loop**
    - The `for` loop starts at index 1 (`range(1, len(my_list))`). This is because the element at index 0 is considered a sorted sub-list of size one by default.
- **Step 2: Store the Element and Prepare for Comparison**
    - The current element to be sorted is stored in `number_to_order`. A second index, `j`, is initialized to `i - 1`, pointing to the last element in the already sorted portion of the list.
- **Step 3: Find the Correct Position with the Inner Loop**
    - The `while` loop runs as long as we haven't fallen off the beginning of the list (`j >= 0`) and the element we're holding (`number_to_order`) is smaller than the element we're looking at in the sorted portion (`my_list[j]`).
- **Step 4: Shift Elements to the Right**
    - Inside the `while` loop, `my_list[j + 1] = my_list[j]` copies the larger element one position to the right, creating a space. The `j` index is then decremented (`j -= 1`) to continue checking the next element to the left.
- **Step 5: Insert the Element**
    - Once the `while` loop finishes, `j + 1` is the correct index for `number_to_order`. The element is placed in this now-vacant spot.
- **Step 6: Return the Sorted List**
    - After the outer `for` loop has processed every element, the function returns the fully sorted list.

##### Code Translation

```python
def insertion_sort(my_list):
    # --- Step 1: Initialize the Outer Loop ---
    for i in range(1, len(my_list)):
        # --- Step 2: Store the Element and Prepare for Comparison ---
        number_to_order = my_list[i]
        j = i - 1

        # --- Step 3: Find the Correct Position with the Inner Loop ---
        while j >= 0 and number_to_order < my_list[j]:
            # --- Step 4: Shift Elements to the Right ---
            my_list[j + 1] = my_list[j]
            j -= 1
        
        # --- Step 5: Insert the Element ---
        my_list[j + 1] = number_to_order

    # --- Step 6: Return the Sorted List ---
    return my_list

# Example usage:
unsorted_list = [5, 2, 4, 6, 1, 3]
print(f"Unsorted: {unsorted_list}")
sorted_list = insertion_sort(unsorted_list)
print(f"Sorted:   {sorted_list}")
```

 [[Code - Insertion Sort Python Implementation Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Input List (`my_list`)**: The primary parameter is the list of elements to be sorted. The characteristics of this list significantly impact performance.
    - **Best Case:** If the list is already sorted, the inner `while` loop condition (`number_to_order < my_list[j]`) is never met. The algorithm only performs a single comparison for each element, resulting in a linear time complexity of $O(n)$.
    - **Worst Case:** If the list is sorted in reverse order, the inner `while` loop must shift every element in the sorted sub-array for each new element being inserted. This leads to a quadratic time complexity of $O(n^2)$.

#### Core Trade-offs

- **Pro: Simplicity and Low Overhead**
    - The code is straightforward and easy to understand, making it a good teaching tool. It sorts 'in-place', meaning it requires only a constant amount of extra memory ($O(1)$) regardless of the list size.
- **Pro: Efficiency on Small or Nearly-Sorted Data**
    - Its adaptive nature makes it one of the fastest sorting algorithms for lists that are already substantially sorted. For small `n`, its simplicity can outperform more complex algorithms like Quicksort or Mergesort due to lower constant factors.
- **Con: Poor Scalability**
    - The primary drawback is its average and worst-case time complexity of $O(n^2)$, as explained in [[DSA - Insertion Sort Time Complexity]]. This makes it impractical for sorting large, unsorted lists.

## Connections

```
                      (Parent)
               Searching Algorithms
                         ▲
                         │
         ┌───────────────┼────────────────┐
         │               │                │
(Related)       ┌───────────────────────────┐      (Related)
Selection Sort  │ Insertion Sort Python Imp │  Insertion Sort Process
                └───────────────────────────┘
```

### Parent Concept

This implementation is a practical application of a fundamental sorting algorithm, which falls under the broader topic of [[DSA - Searching Algorithms]].

### Child Concepts



### Related Concepts 

- The code directly translates the logic described in [[DSA - Insertion Sort Process]].
- It provides a useful contrast to the [[DSA - Selection Sort Python Implementation]], which finds the minimum element and swaps it rather than shifting elements.
- Understanding this code is key to analyzing its performance, as covered in [[DSA - Insertion Sort Time Complexity]].
- A direct comparison of its strategy against other simple sorts is found in [[DSA - Selection Sort vs Insertion Sort]].
## Questions

- Given that insertion sort is efficient for nearly sorted data, describe a real-world scenario (e.g., updating a daily leaderboard) where you would choose this O(n^2) algorithm over a theoretically faster one like Quicksort (O(n log n)). How would you justify this to your team, considering the potential for worst-case performance?
- Imagine you have a system that receives a continuous stream of new data points that need to be inserted into a large, already-sorted list. How would you adapt the core logic of this insertion sort implementation to handle this online sorting problem efficiently without re-sorting the entire list each time a new element arrives?
- What if memory writes (shifting elements) were extremely expensive, but comparisons were virtually free? How would this constraint fundamentally change the viability of insertion sort compared to selection sort, and could you modify the insertion sort algorithm to minimize writes, even at the cost of more comparisons?