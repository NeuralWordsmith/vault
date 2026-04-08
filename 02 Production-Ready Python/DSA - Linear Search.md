---
tags: 
  - core
  - cs
  - sequential_search
  - brute_force
  - unordered_list
  - iteration
  - o(n)
  - concept
source: 
  - "[[Data Structures and Algorithms in Python]]"
related: 
  - "[[DSA - Searching Algorithms]]"
  - "[[DSA - Linear Search Process]]"
  - "[[DSA - Linear Search & Time Complexity Relationship]]"
  - "[[DSA - Binary Search]]"
  - "[[DSA - Binary Search Process]]"
  - "[[DSA - Binary Search & Time Complexity Relationship]]"
  - "[[DSA - Linear Search vs Binary Search]]"
  - "[[Fundamental - Computer Science]]"
  - "[[Python - for Loop]]"
  - "[[Python - Lists]]"
  - "[[Python - Iteration]]"
  - "[[DSA - Big O Notation]]"
  - "[[DSA - Time Complexity]]"
  - "[[DSA - Data Structures]]"
  - "[[DSA - Algorithms]]"
---
# Core: Linear Search

## Summary

>Linear search, also known as sequential search, is a method for finding a target value within a list. It sequentially checks each element of the list for the target value until a match is found or until all the elements have been searched. As one of the most basic types of [[DSA - Searching Algorithms]], its strength lies in its simplicity and its ability to work on unsorted data.

**Why This Matters:** It is the most intuitive and fundamental method for finding an item in a collection, serving as a crucial baseline for understanding and appreciating more efficient algorithms.

_Analogy:_ _Imagine you're looking for a specific book, say 'Moby Dick', on a single, completely disorganized bookshelf. You have no choice but to start at the far left, pick up the first book, check its title, and if it's not 'Moby Dick', put it back and move to the next one. You repeat this process, book by book, until you either find 'Moby Dick' or you've checked every single book on the shelf._

In this analogy:
- **The Bookshelf:** Represents the list or array of data.
- **'Moby Dick':** Represents the target value you are searching for.
- **Checking Each Book's Title:** Corresponds to iterating through each element of the list and comparing it to the target.
- **Finding the Book:** The target value is found, and the search stops.
- **Reaching the End of the Shelf:** The search completes without finding the value.
- **Where it breaks down:** A human might use other cues like book color or size, or remember a general location. Linear search is strictly methodical; it has no such 'intuition' and must check every preceding item in sequence without skipping.

```
Target: 12

List: [15, 2, 21, 3, 12, 7, 8]
Index:  0   1   2   3   4   5   6

Search 1:  ▲
           Is 15 == 12? No. Move on.

Search 2:      ▲
           Is 2 == 12? No. Move on.

Search 3:          ▲
           Is 21 == 12? No. Move on.

Search 4:              ▲
           Is 3 == 12? No. Move on.

Search 5:                  ▲
           Is 12 == 12? Yes! Match found. Return index 4.
```

## Details

Linear search is the simplest search algorithm, belonging to the field of Data Structures and Algorithms. It operates on the straightforward principle of iterating through a collection of items one by one, from the beginning to the end. At each step, it compares the current item with the target value. If they match, the search is successful. If the end of the collection is reached without a match, the search is unsuccessful. This methodical, step-by-step approach is detailed in [[DSA - Linear Search Process]], and its performance implications are explored in [[DSA - Linear Search & Time Complexity Relationship]].

#### Primary Goal

To find the position (index) of a specific target value within a list by examining each element sequentially, without any requirement for the list to be sorted.

#### Mechanism

- **Step 1: Start at the Beginning**
    - The algorithm initializes its search at the very first element of the list (index 0).
- **Step 2: Compare and Check**
    - It compares the value of the current element with the target value.
- **Step 3: Handle a Match**
    - If the current element's value is equal to the target value, the search concludes successfully. The algorithm stops and returns the index of the current element.
- **Step 4: Advance if No Match**
    - If the values do not match, the algorithm moves to the next element in the sequence and repeats Step 2.
- **Step 5: Conclude the Search**
    - This process continues until a match is found or the end of the list is reached. If the entire list is traversed without finding the target, the algorithm concludes unsuccessfully, typically by returning a special value like -1 to indicate 'not found'.

##### Code Translation

```python
def linear_search(data_list, target_value):
    """
    Performs a linear search to find the index of a target value in a list.

    Args:
        data_list: The list of elements to search through.
        target_value: The value to search for.

    Returns:
        The index of the target value if found, otherwise -1.
    """
    # --- Step 1 & 5: Iterate through the list from the beginning to the end ---
    for index in range(len(data_list)):
        # --- Step 2: Compare the current element with the target value ---
        if data_list[index] == target_value:
            # --- Step 3: If a match is found, return the index ---
            return index
    
    # --- Step 5 (continued): If the loop finishes, the target was not found ---
    return -1

# Example Usage:
my_list = [15, 2, 21, 3, 12, 7, 8]
target = 12
result_index = linear_search(my_list, target)

if result_index != -1:
    print(f"Target {target} found at index: {result_index}")
else:
    print(f"Target {target} not found in the list.")

# Output: Target 12 found at index: 4
```

 [[Code - Linear Search Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **The List/Array to Search**
    - The collection of data to be searched. The number of elements in this list is the primary factor determining the algorithm's runtime.
- **The Target Value**
    - The specific element being sought. Its position in the list determines the exact number of comparisons needed (best case: it's the first element; worst case: it's the last or not present at all).

#### Core Trade-offs

- **Pro: Simplicity and Flexibility**
    - It is extremely easy to understand, implement, and debug. Crucially, it does not require the data to be sorted, making it applicable to any list.
- **Con: Inefficiency on Large Datasets**
    - Its performance is directly proportional to the size of the list (linear time complexity, O(n)). For large lists, this becomes very slow and computationally expensive.
- **Con: Poor Worst-Case Performance**
    - In the worst-case scenario (the item is at the end of the list or not in the list at all), the algorithm must examine every single element. This inefficiency is the main reason it is often contrasted with [[DSA - Binary Search]], as highlighted in [[DSA - Linear Search vs Binary Search]].

## Connections

```
                      (Parent)
                Searching Algorithms
                           ▲
                           │
           ┌───────────────┼───────────────────────────┐
           │               │                           │
(Alternative)     ┌──────────────────┐     (Performance Analysis)
Binary Search     │  Linear Search   │     Linear Search & Time Complexity
                  └──────────────────┘
                           │
                           │
                      (Process)
                 Linear Search Process
```

### Parent Concept

It is a fundamental type of [[DSA - Searching Algorithms]], which are algorithms designed to retrieve information stored within a data structure.

### Child Concepts



### Related Concepts 

- The step-by-step execution of this method is detailed in [[DSA - Linear Search Process]].
- Its performance characteristics and scalability are formally analyzed in [[DSA - Linear Search & Time Complexity Relationship]].
- It directly contrasts with the more efficient [[DSA - Binary Search]], which requires a sorted list but can find elements much faster.
- The fundamental trade-offs between these two approaches are explored in [[DSA - Linear Search vs Binary Search]].
## Questions

- You're building an e-commerce site feature to check if a unique, non-indexed promo code entered by a user is valid. The list of active codes is small (under 500) and updated frequently. Would you use linear search or a more complex structure like a hash set? Justify your decision in terms of implementation cost, maintenance, and user-perceived latency.
- Imagine a system where linear search is used to find a user's record in a log file that grows by 1 GB every hour. What is the first performance bottleneck you'd expect to hit, and what architectural change (e.g., indexing, switching to a database, using a different search algorithm) would you propose to mitigate it as the system scales?
- What if memory access time was not constant? For instance, what if accessing elements at the end of an array was 100x slower than accessing elements at the beginning? How would this change your strategy for using or even modifying the linear search algorithm?