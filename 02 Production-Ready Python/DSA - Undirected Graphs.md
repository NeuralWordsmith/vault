---
tags: 
  - core
  - ds
  - symmetric
  - bidirectional
  - reciprocal
  - network_model
  - adjacency
  - concept
source: 
  - "[[Data Structures and Algorithms in Python]]"
related: 
  - "[[DSA - Graphs]]"
  - "[[DSA - Directed Graphs]]"
  - "[[DSA - Weighted Graphs]]"
  - "[[DSA - Trees]]"
  - "[[DSA - Trees vs Graphs]]"
  - "[[DSA - Graph Implementation (Adjacency List)]]"
  - "[[DSA - Graph Applications]]"
  - "[[DSA - Adjacency Matrix]]"
  - "[[DSA - Graph Traversal]]"
  - "[[DSA - Breadth-First Search (BFS)]]"
  - "[[DSA - Depth-First Search (DFS)]]"
  - "[[DSA - Spanning Tree]]"
  - "[[Fundamental - Computer Science]]"
---
# Core: Undirected Graphs

## Summary

>An undirected graph is a type of [[DSA - Graphs|graph]] where the connections (edges) between nodes have no inherent direction. This signifies a mutual or reciprocal relationship; if node A is connected to node B, then B is also connected to A. This directly contrasts with [[DSA - Directed Graphs|directed graphs]], where relationships are one-way.

**Why This Matters:** Undirected graphs are essential for modeling symmetric, two-way relationships like social networks or physical connections, enabling the analysis of community structures and network resilience.

_Analogy:_ _An undirected graph is like a two-way street system in a city. Each intersection is a node (a landmark), and each two-way street is an edge. You can travel from intersection A to B, and you can also travel back from B to A along the same street._

• **Nodes (Vertices):** Intersections or landmarks in the city.
• **Edges:** The two-way streets connecting the intersections.
• **Mutual Relationship:** The fact that the street allows traffic in both directions represents the symmetric connection.
• **Where it breaks down:** This analogy doesn't easily represent concepts like [[DSA - Weighted Graphs|weighted graphs]] (e.g., travel time or distance on a street) without adding extra information. It also doesn't capture more complex graph properties like cycles or paths in a nuanced way.

```
    (Ben) <------- Mutual Relationship -------> (Daya)

      ▲                                           ▲
      │                                           │
    Node A                                      Node B
    (Vertex)                                    (Vertex)
```

## Details

In the world of data structures, an undirected graph represents relationships that are inherently mutual or symmetric. Unlike [[DSA - Directed Graphs|directed graphs]] where a link from A to B doesn't imply a link from B to A, in an undirected graph, an edge between two nodes, say Ben and Daya, means the relationship goes both ways—Ben is friends with Daya, and Daya is friends with Ben. This simple but powerful model is a cornerstone of Data Structures and Algorithms for representing networks where directionality is irrelevant or assumed to be reciprocal.

#### Primary Goal

To model and analyze systems where connections between entities are bidirectional and symmetric.

#### Mechanism

- **How it Works:**
    1. **Nodes (Vertices):** Represent the individual entities in the system.
    2. **Edges (Links):** Represent the mutual relationship between a pair of nodes. An edge `(u, v)` is identical to the edge `(v, u)`. There is no arrow or direction associated with the edge.
- **Key Characteristics:**
    - **Symmetry:** The core principle. If there's a path from node A to node B, a path from B to A is guaranteed via the same edge.
    - **Adjacency:** Two nodes are considered 'adjacent' or 'neighbors' if they are connected by an edge.
    - **Degree:** The degree of a node is the number of edges connected to it. It represents how many neighbors a node has.
- **Example: Social Network**
    - *Nodes:* People (e.g., Ben, Daya, Chloe).
    - *Edges:* Friendship. An edge between Ben and Daya means they are friends. This is inherently mutual.
- **Example: Network Infrastructure**
    - *Nodes:* Computers or routers.
    - *Edges:* A physical cable connection. If router A is physically connected to router B, router B is also connected to router A.

##### Code Translation

nothing to fill here

 [[Code - Undirected Graphs Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Representation Choice:** The primary 'parameter' in using an undirected graph is how you choose to represent it in memory, which impacts performance.
    - [[DSA - Graph Implementation (Adjacency List)|Adjacency List]]: A list where the index corresponds to a node, and the value is a list of its neighbors. Memory-efficient for sparse graphs (few edges).
    - **Adjacency Matrix:** A square matrix where `M[i][j] = 1` if an edge exists between node `i` and `j`. It's symmetric for undirected graphs (`M[i][j] = M[j][i]`). Faster for checking edge existence but uses more memory for sparse graphs.

#### Core Trade-offs

- **Simplicity vs. Granularity:**
    - Undirected graphs are simpler to reason about and implement because you don't need to track direction. However, they cannot model asymmetric relationships (e.g., a 'follows' relationship on Twitter, which is a [[DSA - Directed Graphs|directed graph]]).
- **Storage Overhead:**
    - In an adjacency matrix, the symmetry is redundant (the upper triangle mirrors the lower triangle), potentially wasting space. An [[DSA - Graph Implementation (Adjacency List)|adjacency list]] is often more efficient, but checking for a specific edge `(u, v)` can be slightly slower than a matrix lookup.

## Connections

```
                      (Parent)
                       Graphs
                         ▲
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                    │
(Contrasts With) ┌───────────────┐      (Can Be)
Directed Graphs  │Undirected Graph │   Weighted Graphs
                 └───────────────┘
```

### Parent Concept

Undirected graphs are a fundamental type of [[DSA - Graphs|graph]], a non-linear data structure used to represent relationships between objects.

### Child Concepts



### Related Concepts 

- This concept directly contrasts with [[DSA - Directed Graphs|directed graphs]], where edges represent one-way relationships.
- An undirected graph can also be a [[DSA - Weighted Graphs|weighted graph]] if each mutual connection has an associated cost or distance.
- The relationship between [[DSA - Trees & Graphs Relationship|trees and graphs]] is important, as a tree is a special, more constrained type of undirected, acyclic graph.
## Questions

- Imagine you're building a recommendation engine for an e-commerce site. Would you model the 'customers who bought this also bought' relationship as an undirected or directed graph? Justify your choice by explaining the business implications of potential information loss or gain.
- For a massive social network like Facebook, with billions of users and trillions of friendships (edges), why is an [[DSA - Graph Implementation (Adjacency List)|adjacency list]] a far more scalable implementation choice than an adjacency matrix for this undirected graph? Describe the memory complexity bottleneck of the matrix approach.
- What if you had to model a relationship that is *mostly* mutual but has rare, specific exceptions where it's one-way? How would you adapt a standard undirected graph data structure to handle this hybrid scenario efficiently without defaulting to a fully directed graph for all connections?