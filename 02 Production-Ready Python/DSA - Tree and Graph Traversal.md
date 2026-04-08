---
tags: 
  - major_core
  - dsa
  - graph_theory
  - tree_traversal
  - search_algorithms
  - node_visitation
  - data_structures
  - concept
source: 
  - "[[Data Structures and Algorithms in Python]]"
related: 
  - "[[Fundamental - Computer Science]]"
  - "[[DSA - Depth First Search (DFS)]]"
  - "[[DSA - Breadth First Search (BFS)]]"
  - "[[DSA - DFS for Binary Trees]]"
  - "[[DSA - DFS for Graphs]]"
  - "[[DSA - In-Order Traversal]]"
  - "[[DSA - Pre-Order Traversal]]"
  - "[[DSA - Post-Order Traversal]]"
  - "[[DSA - Time Complexity of Tree DFS]]"
  - "[[DSA - Time Complexity of Graph DFS]]"
  - "[[Data Structures - Trees]]"
  - "[[Data Structures - Graphs]]"
  - "[[Data Structures - Stacks]]"
  - "[[Data Structures - Queues]]"
  - "[[Algorithms - Shortest Path]]"
---
# Major Core: Traversal

## Summary

> Traversal is the core process in computer science of systematically visiting, checking, and/or updating each node in a tree or graph data structure exactly once. It's not a random walk, but a methodical exploration that ensures no node is missed. The two primary strategies for performing traversal are [[DSA - Depth First Search (DFS)|Depth-First Search (DFS)]] and Breadth-First Search (BFS), which dictate the order in which nodes are visited.

**Why This Matters:** Traversal is the fundamental mechanism for accessing, processing, and searching every piece of data within complex, non-linear structures like social networks or file systems.

_Analogy:_ _Imagine a tour guide tasked with taking a group to every single landmark in a city. The city is a complex network of landmarks (nodes) connected by roads (edges). The tour guide's specific itinerary—the exact order in which they visit the landmarks—is the traversal algorithm. One guide might choose to go deep into one neighborhood, visiting all its landmarks before moving to the next (like DFS), while another might visit all landmarks one mile from the city center, then all landmarks two miles out, and so on (like BFS)._

• **The City**: Represents the graph or tree.
• **Landmarks**: Represent the nodes.
• **Roads**: Represent the edges connecting the nodes.
• **The Tour Guide's Itinerary**: Represents the traversal algorithm (e.g., DFS or BFS).
• **Visiting a Landmark**: Represents processing a node.

**Where it breaks down:** A real-world tour guide might skip unimportant landmarks or revisit a central square multiple times. Algorithmic traversal is strict and systematic, designed to visit every single node precisely one time.

```
A graph with nodes A, B, C, D, E. Start at A.

DFS Path (Goes Deep):         BFS Path (Goes Wide):

      A                         A
     / \                       / \
    B---C                     B---C
    |   |                     |   |
    D---E                     D---E

Path: A -> B -> D -> E -> C   Path: A -> B -> C -> D -> E
```

## Details

At its heart, traversal is about imposing a linear order on the nodes of a non-linear data structure. It provides a predictable and exhaustive way to 'walk through' a tree or a graph, which is a prerequisite for many other complex algorithms like searching for a specific value, finding a path between two nodes, or collecting data from the entire structure. The choice of traversal strategy fundamentally changes the order of visitation and has significant implications for memory usage and problem-solving capabilities. The two main approaches are **Depth-First Search (DFS)** and **Breadth-First Search (BFS)**.

#### Primary Goal

To systematically visit and process every node in a tree or graph structure exactly once in a predictable order.

#### Mechanism

- **How it Works:**
    1. **Start:** Begin at a designated starting node (the 'root' in a tree or a 'source' in a graph).
    2. **Explore:** Follow an edge to an unvisited neighboring node.
    3. **Track:** Maintain a record of all visited nodes to avoid processing them again and to prevent getting stuck in infinite loops in graphs with cycles.
    4. **Repeat:** Continue this process, with the specific order determined by the chosen strategy (DFS or BFS), until all reachable nodes have been visited.
- **Depth-First Search (DFS):**
    - This strategy explores as far as possible down one branch before backtracking. It uses a stack (often the call stack via recursion) to keep track of nodes to visit.
    - Example: *Imagine exploring a maze by always taking the first path on your right, following it to a dead end, and only then backtracking to try the next path. This is the essence of [[DSA - Depth First Search (DFS)|DFS]].*
    - Specific implementations for binary trees include [[DSA - Pre-Order Traversal|Pre-Order]], [[DSA - In-Order Traversal|In-Order]], and [[DSA - Post-Order Traversal|Post-Order]] traversals.
- **Breadth-First Search (BFS):**
    - This strategy explores all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level. It uses a queue to keep track of nodes to visit.
    - Example: *Imagine a ripple effect in a pond after a stone is thrown. BFS explores nodes in the same way, visiting all nodes one step away, then all nodes two steps away, and so on.*

nothing to fill here

 [[Code - Traversal Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Choice of Algorithm:**
    - The most critical parameter is selecting between DFS and BFS. This choice depends entirely on the problem's requirements (e.g., finding the shortest path vs. checking for cycles).
- **Starting Node:**
    - The traversal begins from this node. In a disconnected graph, a traversal starting from one node will only visit the nodes in its connected component.
- **Underlying Data Structure:**
    - The choice of algorithm implicitly defines the data structure used to manage the 'frontier' of nodes to visit: a stack for DFS and a queue for BFS.

#### Core Trade-offs

- **Memory Usage:**
    - DFS is generally more memory-efficient for wide, shallow graphs because it only needs to store the nodes on the current path (stack depth). BFS can be very memory-intensive for wide graphs as its queue may need to hold all nodes at a given level simultaneously.
- **Path Finding:**
    - BFS is guaranteed to find the shortest path (in terms of number of edges) between two nodes in an unweighted graph. DFS is not; it may find a very long path first simply because it's the first one it explores.
- **Completeness:**
    - In finite graphs, both DFS and BFS are complete (they will find a solution if one exists). However, in infinite graphs, DFS can get stuck going down an infinitely long path and never find a solution in another branch.

## Connections

```
                     (Parent)
            Fundamental - Computer Science
                       ▲
                       │
┌──────────────────────┼──────────────────────┐
│                      │                      │
(Application) ┌────────────────┐      (Application)
[[DSA - DFS for Binary Trees|DFS for Trees]] │    Traversal     │ [[DSA - DFS for Graphs|DFS for Graphs]]
              └────────────────┘
                       │
           ┌───────────┴───────────┐
           │                       │
(Method) Depth First Search   (Method) Breadth First Search
```

### Parent Concept

Traversal is a fundamental concept within [[Fundamental - Computer Science]], specifically in the study of algorithms and data structures.

### Child Concepts

- The primary method is [[DSA - Depth First Search (DFS)]], which explores as far as possible along each branch before backtracking.
- Another key method is [[DSA - Breadth First Search (BFS)|Breadth-First Search (BFS)]], which explores all neighbor nodes at the present depth prior to moving on to nodes at the next depth level.

### Related Concepts 

- The application of traversal to hierarchical structures is detailed in [[DSA - DFS for Binary Trees]].
- Its use in more complex, interconnected networks is covered in [[DSA - DFS for Graphs]].
- Specific strategies for binary trees, such as [[DSA - In-Order Traversal]], are specialized forms of traversal that yield nodes in a particular order.
## Questions

- Imagine you're building a social network feature to find the shortest chain of connections between two users ('degrees of separation'). Would you choose DFS or BFS, and how would you explain the memory vs. speed trade-off to a product manager concerned about server costs for a network with millions of users?
- For a massive graph that doesn't fit into a single machine's memory, like the web graph, how would you adapt a traversal algorithm to work in a distributed environment? What are the primary communication bottlenecks you'd anticipate between worker nodes?
- What if you had to traverse a graph where edges could appear or disappear while your traversal is in progress? How would this 'dynamic graph' problem break the assumptions of standard DFS/BFS, and what strategies might you use to get a reasonably accurate snapshot of the graph's state?
