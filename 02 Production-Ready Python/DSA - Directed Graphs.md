---
tags: 
  - core
  - ds
  - directed_graph
  - digraph
  - one-way_relationship
  - graph_theory
  - arcs
  - concept
source: 
  - "[[Data Structures and Algorithms in Python]]"
related: 
  - "[[DSA - Graphs]]"
  - "[[DSA - Undirected Graphs]]"
  - "[[DSA - Weighted Graphs]]"
  - "[[DSA - Graph Applications]]"
  - "[[DSA - Graph Implementation (Adjacency List)]]"
  - "[[DSA - Trees]]"
  - "[[DSA - Trees vs Graphs]]"
  - "[[Fundamental - Computer Science]]"
  - "[[DSA - Breadth-First Search (BFS)]]"
  - "[[DSA - Depth-First Search (DFS)]]"
  - "[[DSA - Topological Sort]]"
  - "[[DSA - Dijkstra's Algorithm]]"
---
# Core: Directed Graphs

## Summary

>A directed graph, or digraph, is a type of graph where the connections (edges) between nodes have a specific direction. Unlike an [[DSA - Undirected Graphs|undirected graph]] where relationships are mutual, a directed edge from node A to node B does not imply a connection from B to A.

**Why This Matters:** Directed graphs are essential for modeling real-world systems with one-way flows or dependencies, such as website link structures, task scheduling, and social media 'follow' relationships.

_Analogy:_ _A directed graph is like a city's system of one-way streets. A car (information) can travel from intersection A (node) to intersection B (node) if there's a one-way street pointing from A to B. However, you can't necessarily drive back from B to A using the same street; you'd need a different, separate one-way street pointing in the opposite direction._

**Where it breaks down:** While one-way streets have physical constraints, the 'cost' or 'distance' to traverse an edge in a graph can represent abstract concepts like time, priority, or dependency. [[DSA - Weighted Graphs|Weighted graphs]] add this layer of complexity.

```
  (Miriam)
  /      \
 v        v
(David) -> (Martin) <- (Shui)
```

## Details

In the field of data structures and algorithms, a directed graph is a fundamental way to represent relationships that are not reciprocal. The key idea is that each edge has a source and a destination, indicated by an arrow. For instance, in a social network, if 'David follows Martin,' an arrow points from David to Martin. This one-way connection is crucial because it accurately models that Martin doesn't necessarily follow David back. This concept is a specific type of [[DSA - Graphs|graph]] and stands in contrast to [[DSA - Undirected Graphs|undirected graphs]], where connections are always two-way.

#### Primary Goal

To model relationships, processes, or flows where the connection between two points is inherently one-way.

#### Mechanism

- **How it Works:** A directed graph consists of a set of vertices (nodes) and a set of directed edges (also called arcs).
    1. Each edge is an ordered pair of vertices, `(u, v)`, representing a connection *from* vertex `u` (the tail) *to* vertex `v` (the head).
    2. This ordering signifies a one-way path. You can traverse from `u` to `v`, but not from `v` to `u` along that same edge.
- **Key Components:**
    - **Nodes (Vertices):** These represent the individual entities in the system.
        - *Example: In the social network from the context, 'David', 'Martin', 'Miriam', and 'Shui' are all nodes.*
    - **Directed Edges (Arcs):** These represent the one-way relationships or flow between nodes.
        - *Example: The arrow from 'David' to 'Martin' is a directed edge representing that David follows Martin.*

##### Code Translation

nothing to fill here

 [[Code - Directed Graphs Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Cyclicity:** A critical property of a directed graph is whether it contains cycles.
    - **Cyclic Graph:** Contains at least one path that starts and ends at the same node. *Example: A -> B -> C -> A.*
    - **Directed Acyclic Graph (DAG):** A directed graph with no directed cycles. This is a very important structure for modeling dependencies, like task scheduling where task A must finish before B, and B before C. You can't have a cycle where C depends on A.

#### Core Trade-offs

- **Expressiveness vs. Simplicity:**
    - **Pro:** Directed graphs can model a wider and more nuanced range of real-world scenarios (e.g., dependencies, flows, one-way links) compared to [[DSA - Undirected Graphs|undirected graphs]].
    - **Con:** They introduce more complexity. Algorithms for traversal, pathfinding, and cycle detection are different and can be more complex than their undirected counterparts.
- **Representation Overhead:**
    - In an [[DSA - Graph Implementation (Adjacency List)|adjacency list]], an edge from A to B only appears in A's list. In an undirected graph, the edge would appear in both A's and B's lists, potentially using more space for symmetric relationships.

## Connections

```
                  (Parent)
                   Graphs
                     ▲
                     │
┌────────────────────┼────────────────────┐
│                    │                    │
(Contrast)      ┌──────────────────┐      (Can Be)
Undirected Graph  │  Directed Graph  │      Weighted Graph
                  └──────────────────┘
                         │
                         │
              (Important Sub-Type)
                         │
                         ▼
             Directed Acyclic Graph (DAG)
```

### Parent Concept

Directed graphs are a fundamental type of [[DSA - Graphs|graph]], a data structure used to represent networks of interconnected nodes.

### Child Concepts

- A particularly important subtype is the Directed Acyclic Graph (DAG), which has no cycles and is crucial for modeling dependencies and scheduling tasks.

### Related Concepts 

- This concept directly **contrasts with** [[DSA - Undirected Graphs|undirected graphs]], where all edges are bidirectional, representing mutual relationships.
- A directed graph can also be a [[DSA - Weighted Graphs|weighted graph]] if each directed edge is assigned a numerical value representing cost, distance, or capacity.
- Many real-world [[DSA - Graph Applications|graph applications]], such as modeling web page links or dependency charts, rely on the one-way nature of directed graphs.
## Questions

- How would you decide between a directed and an undirected graph to model a company's internal communication network, and what are the business implications of that choice for analyzing information flow?
- When modeling a massive dependency graph for a software build system (where A must be built before B), what are the potential performance bottlenecks in detecting circular dependencies, and how would you design the system to handle this at scale?
- What if you had to represent a directed graph using only the data structures for an undirected graph? What extra information would you need to store, and how would it impact the performance of pathfinding algorithms?