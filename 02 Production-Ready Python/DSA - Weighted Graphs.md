---
tags: 
  - core
  - ds
  - edge_weight
  - cost
  - shortest_path
  - graph_theory
  - network_optimization
  - concept
source: 
  - "[[Data Structures and Algorithms in Python]]"
related: 
  - "[[DSA - Graphs]]"
  - "[[DSA - Directed Graphs]]"
  - "[[DSA - Undirected Graphs]]"
  - "[[DSA - Graph Applications]]"
  - "[[DSA - Graph Implementation (Adjacency List)]]"
  - "[[DSA - Trees vs Graphs]]"
  - "[[DSA - Trees]]"
  - "[[Algorithm - Dijkstra's Algorithm]]"
  - "[[Algorithm - Bellman-Ford Algorithm]]"
  - "[[Algorithm - Prim's Algorithm]]"
  - "[[Algorithm - Kruskal's Algorithm]]"
  - "[[Fundamental - Data Structures]]"
  - "[[Fundamental - Algorithms]]"
  - "[[Python - Dictionaries]]"
---
# Core: Weighted Graphs

## Summary

>A weighted graph is a type of [[DSA - Graphs|graph]] where each edge is assigned a numerical value, or 'weight'. This weight can represent various metrics like distance, cost, time, or capacity. Unlike unweighted graphs where edges simply indicate a connection, weighted graphs provide a quantitative measure of the relationship between nodes. They can be either [[DSA - Directed Graphs|directed]] or [[DSA - Undirected Graphs|undirected]], making them highly versatile.

**Why This Matters:** Weighted graphs are crucial for modeling real-world problems where connections have costs, distances, or capacities, enabling optimization for tasks like finding the shortest route or cheapest network path.

_Analogy:_ _Think of a weighted graph as a flight map for an airline. The cities are the nodes (vertices), and the flight paths between them are the edges. The 'weight' of each edge could be the ticket price, the flight duration, or the distance in miles._

{
  "Nodes (Vertices)": "Cities (e.g., San Francisco, San Jose)",
  "Edges": "Direct flight routes between cities",
  "Weights": "The cost of the flight ticket, the flight time, or the distance for that specific route",
  "Path": "A sequence of flights to get from a starting city to a destination (e.g., a layover)",
  "Shortest Path Problem": "Finding the cheapest or fastest sequence of flights to get to your destination",
  "Where it breaks down:": "A flight map is fairly static. In many real-world graph problems (like internet traffic), the weights can change dynamically and rapidly, which the simple analogy doesn't capture."
}

```
(San Francisco)
    |    \
   89     313
  /        \
(San Jose)---(Fresno)
      245
```

## Details

A weighted graph is a fundamental concept in Data Structures and Algorithms that extends the basic idea of a [[DSA - Graphs|graph]] by adding a quantitative dimension to its connections. Instead of just showing that a relationship exists between two nodes (like in an unweighted graph), a weighted graph tells you *how much* of something is associated with that relationship—be it distance, cost, time, or capacity. The provided example of a road map between cities like San Francisco and San Jose perfectly illustrates this, where the numbers on the edges represent the distance. These graphs can be structured as either **directed** (one-way relationships) or **undirected** (two-way relationships).

#### Primary Goal

To model and solve real-world problems where the relationships or connections between entities have an associated cost, distance, or value.

#### Mechanism

- **How it Works:**
    1. **Nodes (Vertices):** Represent the entities in the system (e.g., cities, computers, people).
    2. **Edges:** Represent the connections between these entities.
    3. **Weights:** A numeric value is assigned to each edge. This value quantifies the 'cost' of traversing that edge.
    4. **Representation:** These graphs are often implemented using an [[DSA - Graph Implementation (Adjacency List)|adjacency list]] or an adjacency matrix, where the implementation is modified to store the weight alongside the destination node.
- **Weight Characteristics:**
    - **Positive Weights:** The most common type, representing quantities like distance, time, or cost, which are always non-negative.
        - *Example: The distance between San Francisco and San Jose is 89 miles.*
    - **Negative Weights:** Can be used to model more abstract concepts like financial gains/losses, discounts on a path, or energy levels in a system. They introduce complexity and can create negative cycles, which some algorithms (like Dijkstra's) cannot handle.
        - *Example: In a financial transaction graph, an edge from A to B with a weight of -50 could represent A paying B $50, resulting in a gain for B.*
    - **Zero-Weight Edges:** Can represent a 'free' transition or an action with no cost.

##### Code Translation

nothing to fill here

 [[Code - Weighted Graphs Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Edge Directionality:**
    - **Undirected:** The weight applies equally in both directions (e.g., the driving distance between two cities is the same regardless of the starting point).
    - **Directed:** The weight is specific to the direction of travel (e.g., the cost of a flight from SF to NY might be different from NY to SF).
- **Weight Type:**
    - **Integer vs. Floating-Point:** The data type of the weight can affect precision and storage requirements. Distances might be integers, while probabilities or financial costs might be floats.
- **Graph Density (Sparsity vs. Density):**
    - The number of edges relative to the number of vertices. This doesn't change the concept of weighting but heavily influences the choice of implementation ([[DSA - Graph Implementation (Adjacency List)|adjacency lists]] for sparse graphs, adjacency matrices for dense graphs) and algorithm performance.

#### Core Trade-offs

- **Expressiveness vs. Complexity:**
    - **Pro:** Weighted graphs can model a much wider and more nuanced range of real-world problems compared to unweighted graphs.
    - **Con:** The algorithms required to process them (e.g., Dijkstra's, Bellman-Ford, Prim's) are more complex and computationally expensive than those for unweighted graphs (e.g., Breadth-First Search).
- **Data Representation:**
    - **Pro:** The weight provides crucial information for optimization problems like finding the shortest path or minimum spanning tree.
    - **Con:** Storing the weights requires more memory, whether in an adjacency list or an adjacency matrix.

## Connections

```
                  (Parent)
                   Graphs
                     ▲
                     │
┌────────────────────┼────────────────────┐
│                    │                    │
(Contrast)      ┌──────────────────┐      (Contrast)
Undirected Graph  │  Weighted Graph  │      Directed Graph
                  └──────────────────┘
                         │
              ┌──────────┴──────────┐
              │                     │
      (Application)         (Application)
    Shortest Path Algos   Min Spanning Tree
```

### Parent Concept

Weighted graphs are a specialized type of [[DSA - Graphs|Graphs]], which are abstract data structures used to model relationships between objects.

### Child Concepts



### Related Concepts 

- It can be implemented as either a [[DSA - Directed Graphs|directed graph]], where weights apply to one-way paths, or an [[DSA - Undirected Graphs|undirected graph]], where weights are bidirectional.
- The concept of a weighted graph is fundamental to many [[DSA - Graph Applications|graph applications]], such as finding the shortest path in a network.
- While [[DSA - Trees vs Graphs|trees are a specific type of graph]], most tree structures are unweighted, focusing on hierarchy rather than the cost of connections, which contrasts with the core idea of a weighted graph.
- The most common way to represent a weighted graph in code is using an [[DSA - Graph Implementation (Adjacency List)|adjacency list]], where each entry stores both the neighbor and the weight of the edge leading to it.
## Questions

- You're designing a delivery routing system. Using real-time traffic data makes your edge weights more accurate but significantly increases API costs and computational load. How would you decide on the update frequency for these weights, and how would you justify the trade-off between optimal routing and operational cost to management?
- Imagine a social network represented as a weighted graph where edge weights signify the strength of a relationship. As the network scales to billions of edges, how would you design a distributed system to store this graph and efficiently run queries like 'find the strongest path between two users' without loading the entire graph into one machine's memory?
- What if the 'weight' of an edge wasn't a single number, but a probability distribution function representing travel time? How would classic shortest path algorithms like Dijkstra's need to be fundamentally re-imagined to find the 'most likely' fastest path?