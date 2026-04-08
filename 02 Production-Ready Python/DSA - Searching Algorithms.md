---
tags: 
  - major_core
  - cs
  - search
  - algorithm
  - data_structure
  - traversal
  - efficiency
  - concept
source: 
  - "[[Data Structures and Algorithms in Python]]"
related: 
  - "[[Fundamental - Computer Science]]"
  - "[[Fundamental - Data Structures]]"
  - "[[DSA - Linear Search]]"
  - "[[DSA - Binary Search]]"
  - "[[DSA - Linear Search vs Binary Search]]"
  - "[[DSA - Time Complexity]]"
  - "[[DSA - Big O Notation]]"
  - "[[DSA - Sorting Algorithms]]"
  - "[[DSA - Trees]]"
  - "[[DSA - Graphs]]"
  - "[[DSA - Binary Search Trees]]"
  - "[[DSA - Depth-First Search (DFS)]]"
  - "[[DSA - Breadth-First Search (BFS)]]"
  - "[[Python - Lists]]"
  - "[[Python - Dictionaries]]"
---
# Major Core: Searching Algorithms

## Summary

> A searching algorithm is a well-defined procedure used to locate a specific element, known as the target, within a collection of items or a data structure. The choice of algorithm, such as a simple [[DSA - Linear Search|linear search]] versus a more efficient [[DSA - Binary Search|binary search]], depends heavily on the structure of the data and the specific requirements of the task, such as speed and memory usage.

**Why This Matters:** Searching algorithms are the backbone of information retrieval, enabling everything from finding a contact in your phone to powering Google's web search by providing efficient methods to locate specific data within vast collections.

_Analogy:_ _Think of searching for a specific book in a library. The library is your data structure, the book title is your target element, and your method for finding it is the searching algorithm._

  - **The Library:** Represents the data structure (e.g., an array, list, or tree).
  - **The Book Title:** Represents the target value you are searching for.
  - **Your Searching Method:** Represents the searching algorithm itself.
    - *Method 1 (Linear Search):* You start at the first aisle, first shelf, and check every single book one-by-one until you find the one you want. This is slow but guaranteed to work even if the library is a complete mess.
    - *Method 2 (Binary Search):* The library is organized alphabetically by the Dewey Decimal System (sorted data). You go to the middle of the library, check the section, and immediately know whether your book is in the first half or the second half, discarding 50% of the library in one step. You repeat this process until you zero in on the book.
- **Where it breaks down:** A physical library is relatively static. In computer science, data structures can be highly dynamic, with elements being added and removed constantly, which can impact the efficiency of certain search methods (e.g., the cost of keeping data sorted for a binary search).

```
Data Structure: [ 11 | 23 | 5 | 89 | 42 | 16 ]
                   ▲
                   │
Target Element: --- 5

Goal: Find the index of '5'.
```

## Details

Searching for an element in a data structure is one of the most fundamental and essential operations in computer science. There are numerous ways to perform a search, and the best method depends on how the data is organized. The simplest approach is to check items one by one, but more sophisticated strategies can leverage sorted data or complex relationships between elements to find what you're looking for much faster. The main categories we will explore are **sequential searches**, **interval searches**, and **traversal-based searches** for non-linear structures like trees and graphs.

#### Primary Goal

To efficiently locate a specific element or a set of elements within a data structure.

#### Mechanism

- **How it Works:**
    1.  **Input:** The algorithm takes a target value and a data structure as input.
    2.  **Examine:** It systematically examines elements within the data structure.
    3.  **Compare:** It compares each examined element to the target value.
    4.  **Output:** It returns the location (e.g., index) or a confirmation of the element's presence if a match is found. If the entire structure is traversed without a match, it signals that the element is not present.
- **Sequential Search (e.g., Linear Search):**
    - This is the most straightforward method, where you iterate through every element in the collection from the beginning until you find the target or reach the end. It's the only reliable method for completely unsorted data.
    - Example: *Looking for the name 'Chris' in an unsorted list of attendees: ['Zoe', 'Alex', 'Chris', 'Ben']. You check 'Zoe', then 'Alex', and finally find 'Chris' on the third try.*
- **Interval Search (e.g., Binary Search):**
    - This method requires the data to be sorted. It works by repeatedly dividing the search interval in half. If the value of the search key is less than the item in the middle of the interval, it narrows the interval to the lower half. Otherwise, it narrows it to the upper half. This is significantly faster than a linear search for large datasets.
    - Example: *Finding the number 23 in a sorted list: [4, 8, 15, 16, 23, 42]. You first check the middle (16), see 23 is larger, and discard the entire first half. You then check the middle of the remaining half, quickly finding 23.*
- **Tree/Graph Traversal Search (e.g., DFS & BFS):**
    - These methods are used for non-linear data structures like trees and graphs. They don't just search for a value but 'traverse' or visit the nodes in a specific order.
    -   - **Depth-First Search (DFS):** Explores as far as possible down one branch before backtracking. *Example: Navigating a maze by always taking the rightmost path until you hit a dead end, then backtracking to the last junction and trying the next path.*
    -   - **Breadth-First Search (BFS):** Explores all the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level. *Example: On a social network, finding the shortest path to another person by first checking all your direct friends, then all of their friends, and so on, level by level.*

nothing to fill here

 [[Code - Searching Algorithms Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Data Organization:**
    - Is the data sorted or unsorted? This is the single most important factor in choosing between a [[DSA - Linear Search|linear search]] and a more efficient algorithm like [[DSA - Binary Search|binary search]].
- **Data Structure Type:**
    - Is the data in a linear structure (array, list) or a non-linear one (tree, graph)? This determines whether you use sequential/interval searches or traversal algorithms like DFS/BFS.
- **Size of the Dataset:**
    - For very small, unsorted datasets, the simplicity and low overhead of a linear search might make it faster in practice than a more complex algorithm that requires pre-processing.

#### Core Trade-offs

- **Time Complexity vs. Pre-processing Cost:**
    - Algorithms like [[DSA - Binary Search|binary search]] are extremely fast (logarithmic time, $O(\log n)$), but they impose a strict requirement that the data must be sorted first. This sorting step has its own time cost. In contrast, a [[DSA - Linear Search|linear search]] requires no pre-processing but is much slower (linear time, $O(n)$). This is a core concept explored in the [[DSA - Linear Search vs Binary Search|comparison between them]].
- **Memory Usage:**
    - Iterative algorithms like linear search use minimal extra memory ($O(1)$ space). Recursive algorithms, such as a recursive implementation of DFS, can use significant memory on the call stack ($O(h)$ where $h$ is the height of the tree). BFS can also be memory-intensive as it needs to store all nodes at a given level in a queue.
- **Implementation Complexity:**
    - Linear search is trivial to implement. Binary search is slightly more complex and prone to off-by-one errors. Graph traversal algorithms are more complex still, requiring careful management of data structures like stacks or queues to track visited nodes.

## Connections

```
                  (Parent)
         Fundamental - Computer Science
                       ▲
                       │
       ┌───────────────┼────────────────┐
       │               │                │
(Related)       ┌───────────────────────────┐      (Related)
Data Structures │   Searching Algorithms    │      Sorting Algorithms
                └───────────────────────────┘
                       │
         ┌─────────────┴──────────────┐
         │                            │
  Linear Search                Binary Search
(Sequential Search)          (Interval Search)
```

### Parent Concept

Searching algorithms are a fundamental topic within [[Fundamental - Computer Science]], forming the basis for how we retrieve information from any organized collection of data.

### Child Concepts

- A foundational approach is the [[DSA - Linear Search|linear search]], which sequentially checks each element until a match is found.
- A more efficient method for sorted data is the [[DSA - Binary Search|binary search]], which repeatedly divides the search interval in half.
- For graph and tree data structures, traversal-based searches like [[DSA - Depth-First Search (DFS)|Depth-First Search (DFS)]] are used to explore branch by branch.
- Another graph traversal method is [[DSA - Breadth-First Search (BFS)|Breadth-First Search (BFS)]], which explores level by level.
- Specialized data structures like [[DSA - Binary Search Trees|Binary Search Trees (BSTs)]] have their own inherent search mechanisms that leverage their ordered structure.

### Related Concepts 

- The choice of a searching algorithm is deeply intertwined with the underlying [[Fundamental - Data Structures|data structure]] holding the information.
- The performance trade-offs are often analyzed in the context of the [[DSA - Linear Search vs Binary Search|direct comparison between linear and binary search]].
- Many efficient search algorithms, like binary search, rely on the data first being processed by [[DSA - Sorting Algorithms|sorting algorithms]].
## Questions

- You're designing a search feature for an e-commerce site's internal inventory system. The data is updated frequently but searched less often. Would you prioritize a fast search (like binary search, requiring constant re-sorting) or a fast data-update process (using an unsorted list and linear search)? How would you justify the impact of your choice on inventory management efficiency?
- Imagine you are implementing a web crawler. Would you use Depth-First Search or Breadth-First Search to discover new web pages? How would you design the system to handle the 'infinite' nature of the web and avoid getting stuck in crawler traps (infinite loops of links)?
- What if memory access time was not constant? If accessing elements at the end of a large array was 1000x slower than accessing elements at the beginning, how would this fundamentally change the design and viability of algorithms like linear and binary search?
