---
tags: 
  - major_core
  - ds
  - nodes
  - vertices
  - edges
  - network
  - non_linear
  - concept
source: 
  - "[[Data Structures and Algorithms in Python]]"
related: 
  - "[[Fundamental - Computer Science]]"
  - "[[DSA - Trees]]"
  - "[[DSA - Directed Graphs]]"
  - "[[DSA - Undirected Graphs]]"
  - "[[DSA - Weighted Graphs]]"
  - "[[DSA - Trees vs Graphs]]"
  - "[[DSA - Graph Applications]]"
  - "[[DSA - Graph Implementation (Adjacency List)]]"
  - "[[DSA - Trees & Graphs Relationship]]"
  - "[[DSA - Tree Terminology]]"
  - "[[DSA - Binary Tree]]"
  - "[[Python - Dictionaries]]"
  - "[[Statistics - Random Walk]]"
---
# Major Core: Graphs

## Summary

> A graph is a fundamental data structure in computer science used to represent relationships. It consists of a set of nodes (also called vertices) which represent entities, and a set of edges (or links) that connect pairs of nodes, representing the relationship between them. Unlike linear structures like arrays, graphs are non-linear and can model complex, many-to-many relationships. A key point to remember is that [[DSA - Trees|trees]] are actually a specialized, more constrained type of graph, a concept explored further in [[DSA - Trees & Graphs Relationship|the relationship between trees and graphs]].

**Why This Matters:** Graphs are the ultimate data structure for modeling and analyzing complex real-world networks, from social connections and transportation systems to the very fabric of the internet.

_Analogy:_ _Think of a graph as a city's subway map. The subway stations are the **nodes** (or vertices), and the train lines running between the stations are the **edges** (or links). You can use the map to find a path from one station to another, see which stations are major hubs (highly connected), or identify all the stations on a particular line._

**Where it breaks down:** A simple subway map doesn't always capture concepts like one-way tracks ([[DSA - Directed Graphs|directed graphs]]) or the travel time/cost between stations ([[DSA - Weighted Graphs|weighted graphs]]), which are common and important features in graph data structures.

```
    (Miriam) ──────── (Martin) ── (Shui)
     ╱ │ ╲             ╱
    ╱  │  ╲           ╱
(David)──(Sue)─────────
```

## Details

A graph is a data structure formed by a set of nodes (also called vertices) and the links (also called edges) that connect them. It's a powerful way to represent networks and relationships between different points of data. For example, in the provided image, 'Miriam', 'David', and 'Sue' are nodes, and the lines connecting them are edges representing some relationship, like friendship. This structure is foundational in computer science and data science for modeling everything from social networks to logistical problems. Graphs can be categorized based on their properties, such as being **[[DSA - Directed Graphs|directed or undirected]]** and **[[DSA - Weighted Graphs|weighted or unweighted]]**.

#### Primary Goal

To model and analyze the relationships and connections between a collection of objects or entities.

#### Mechanism

- **How it Works:**
    1. **Represent Entities as Nodes:** Each item or entity in your dataset becomes a node (or vertex). In a social network, each person is a node.
    2. **Represent Relationships as Edges:** A connection or relationship between two nodes is represented by an edge. If two people are friends, an edge connects their respective nodes.
    3. **Analyze the Structure:** Once the graph is built, algorithms can be used to traverse it, find the shortest path between nodes, identify clusters of highly connected nodes, and much more.
- **Core Components:**
    - **Nodes (Vertices):** These are the fundamental units of the graph that represent the objects or entities.
        - *Example: In the image, the nodes are Miriam, David, Sue, Martin, and Shui.*
    - **Edges (Links):** These are the connections between pairs of nodes. They represent the relationship between the entities.
        - *Example: There is an edge between Miriam and David, an edge between Martin and Shui, etc. There is no direct edge between David and Martin.*

nothing to fill here

 [[Code - Graphs Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Directionality:** This determines if the relationship is one-way or two-way.
    - In an [[DSA - Undirected Graphs|undirected graph]], edges are bidirectional (if A is connected to B, B is connected to A). *Example: A Facebook friendship.*
    - In a [[DSA - Directed Graphs|directed graph]] (or digraph), edges have a direction (A can be connected to B, but B may not be connected to A). *Example: Following someone on Twitter.*
- **Weight:** This assigns a numerical value or "cost" to an edge.
    - In a [[DSA - Weighted Graphs|weighted graph]], each edge has a value. *Example: A map where the edge weight is the distance between two cities.*
    - In an unweighted graph, edges simply represent a connection without an associated cost.
- **Cycles:** A cycle is a path in a graph that starts and ends at the same node.
    - Graphs can contain cycles (e.g., A -> B -> C -> A), which distinguishes them from [[DSA - Trees|trees]], which are acyclic by definition.

#### Core Trade-offs

- **Flexibility vs. Complexity:** Graphs are extremely flexible and can model almost any relationship, but this comes at the cost of increased complexity in algorithms for traversal, searching, and manipulation compared to linear data structures like arrays.
- **Storage Overhead:** Representing a graph requires storing both the nodes and all their connections. For dense graphs (many edges), an adjacency matrix can be memory-intensive ($$O(V^2)$$), while for sparse graphs, an [[DSA - Graph Implementation (Adjacency List)|adjacency list]] is more space-efficient ($$O(V+E)$$).
- **No Inherent Order:** Unlike arrays, nodes in a graph do not have a natural or built-in order. Finding a specific node might require a search algorithm (like Breadth-First Search or Depth-First Search).

## Connections

```
                  (Parent)
         Fundamental - Computer Science
                   ▲
                   │
┌──────────────────┼──────────────────┐
│                  │                  │
(Special Case)   ┌───────────────┐   (Implementation)
   Trees         │     Graphs    │   Adjacency List
                 └───────────────┘
                        │
             ┌──────────┴──────────┐
             │                     │
       Directed Graphs      Undirected Graphs
```

### Parent Concept

Graphs are a fundamental non-linear data structure within the broader field of [[Fundamental - Computer Science|Computer Science]].

### Child Concepts

- A primary distinction is made for [[DSA - Directed Graphs|directed graphs]], where edges have a specific direction, modeling one-way relationships.
- Another key type is the [[DSA - Undirected Graphs|undirected graph]], where edges are bidirectional, representing mutual relationships.
- Graphs can also be classified as [[DSA - Weighted Graphs|weighted graphs]], where each edge is assigned a numerical value, such as cost or distance.

### Related Concepts 

- The [[DSA - Trees|tree]] data structure is a specialized, acyclic type of graph.
- A common way to represent a graph in code is using an [[DSA - Graph Implementation (Adjacency List)|adjacency list]].
- The key differences are highlighted when you compare [[DSA - Trees vs Graphs|trees versus graphs]] directly.
- The versatility of graphs leads to a wide range of [[DSA - Graph Applications|real-world applications]].
## Questions

- In designing a 'people you may know' feature for a social network, you could use complex graph algorithms to find 2nd or 3rd-degree connections. What is the business trade-off between the computational cost of these deep searches and the potential user engagement lift, and how would you propose an experiment to find the optimal search depth?
- Imagine you're tasked with building a system to analyze the entire Twitter social graph, which has billions of edges. How would you design a distributed system to store and process this graph, given that it cannot fit into the memory of a single machine? What are the primary bottlenecks you anticipate?
- What if edges in a graph could have their own properties and even connect to other edges, not just nodes (a structure sometimes called a hypergraph)? What new kinds of real-world systems could you model with this capability that are difficult to represent with a standard graph?
