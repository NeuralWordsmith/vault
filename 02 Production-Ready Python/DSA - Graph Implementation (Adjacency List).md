---
tags: 
  - core
  - ds
  - adjacency_list
  - graph_representation
  - data_structures
  - python_class
  - dictionary
  - concept
source: 
  - "[[Data Structures and Algorithms in Python]]"
related: 
  - "[[DSA - Graphs]]"
  - "[[DSA - Directed Graphs]]"
  - "[[DSA - Undirected Graphs]]"
  - "[[DSA - Weighted Graphs]]"
  - "[[DSA - Adjacency Matrix]]"
  - "[[DSA - Graph Traversal]]"
  - "[[DSA - Breadth-First Search (BFS)]]"
  - "[[DSA - Depth-First Search (DFS)]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Fundamental - Computer Science]]"
  - "[[DSA - Trees vs Graphs]]"
  - "[[DSA - Graph Applications]]"
  - "[[DSA - Trees]]"
---
# Core: Graph Implementation (Adjacency List)

## Summary

>An adjacency list is a common way to implement a [[DSA - Graphs|graph]] data structure. It uses a collection, typically a dictionary or hash map, where each key represents a vertex, and the corresponding value is a list of all vertices it is connected to (its neighbors). This approach is particularly efficient for graphs where the number of edges is much smaller than the maximum possible number of edges.

**Why This Matters:** This implementation provides a memory-efficient way to represent sparse graphs, making it practical for modeling real-world networks like social connections or road maps where most nodes are not directly connected.

_Analogy:_ _Think of an adjacency list like the contact list on your phone. Each person in your contacts is a "vertex." When you tap on a person's name, you see a list of their phone numbers and email addresses—these are the "edges" connecting you to them. You don't have an entry for every single person in the world, only the ones you are directly connected to._

**Where it breaks down:** A phone contact list is usually a one-way lookup (you look up a person). In many graphs, relationships can be two-way (like friendships in an [[DSA - Undirected Graphs|undirected graph]]), which would require adding each person to the other's "list." The analogy also doesn't capture the concept of [[DSA - Weighted Graphs|weighted edges]], where a connection might have a value like distance or cost.

```
```
Graph Representation (Adjacency List)

Python Dictionary: my_graph.vertices

{
  "David":  [ "Miriam", "Martin" ],  // David is connected to Miriam and Martin
  "Miriam": [ "Martin" ],            // Miriam is connected to Martin
  "Martin": [ ]                     // Martin has no outgoing connections
}
```
```

## Details

The provided code demonstrates a fundamental method for implementing a graph in Python. The core idea is to use a dictionary to store the graph's structure. Each key in this dictionary is a vertex. The value associated with each key is a list containing all the vertices to which the key vertex has an outgoing edge. This structure is known as an adjacency list. The code defines a `Graph` class with methods like `add_vertex` to introduce new nodes and `add_edge` to create connections between them, effectively building the network piece by piece. This is one of the two main ways to represent graphs, the other being an **adjacency matrix**.

#### Primary Goal

To provide a space-efficient and intuitive way to store and access the connections (edges) for each node (vertex) in a graph, especially when the graph is sparse (has relatively few edges).

#### Mechanism

- **Step 1: Initialize the Graph**
    - The `Graph` class is initialized with an empty dictionary called `vertices`. This dictionary will hold the entire structure of the graph.
- **Step 2: Add Vertices**
    - The `add_vertex` method takes a vertex (e.g., a name like 'David') as input. It adds this vertex as a new key to the `self.vertices` dictionary and assigns it an empty list as its value. This empty list will later store the neighbors of this vertex.
- **Step 3: Add Edges**
    - The `add_edge` method takes a `source` and a `target` vertex. It finds the `source` vertex in the dictionary and appends the `target` vertex to its list of neighbors. This represents a directed connection from the source to the target, as seen in [[DSA - Directed Graphs|directed graphs]].

##### Code Translation

```python
# --- Step 1: Initialize the Graph ---
class Graph:
    def __init__(self):
        # The dictionary stores the adjacency list
        self.vertices = {}

    # --- Step 2: Add Vertices ---
    def add_vertex(self, vertex):
        # Add a vertex and initialize its adjacency list as empty
        if vertex not in self.vertices:
            self.vertices[vertex] = []

    # --- Step 3: Add Edges ---
    def add_edge(self, source, target):
        # Add an edge from source to target
        if source in self.vertices and target in self.vertices:
            self.vertices[source].append(target)

# --- Example Usage ---
my_graph = Graph()
my_graph.add_vertex('David')
my_graph.add_vertex('Miriam')
my_graph.add_vertex('Martin')

my_graph.add_edge('David', 'Miriam')
my_graph.add_edge('David', 'Martin')
my_graph.add_edge('Miriam', 'Martin')

# Print the final adjacency list representation
print(my_graph.vertices)
# Expected Output:
# {'David': ['Miriam', 'Martin'], 'Miriam': ['Martin'], 'Martin': []}
```

 [[Code - Graph Implementation (Adjacency List) Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Vertices (Nodes)**
    - These are the fundamental entities within the graph. In the example, 'David', 'Miriam', and 'Martin' are vertices. They are stored as keys in the main dictionary.
- **Edges (Connections)**
    - These represent the relationships between vertices. An edge is defined by a `source` and a `target` vertex. In this implementation, they are stored by adding the `target` to the `source`'s list of neighbors.

#### Core Trade-offs

- **Space Complexity**
    - **Pro:** Very space-efficient for sparse graphs (graphs with few edges). The memory required is proportional to the number of vertices plus the number of edges, $O(V+E)$.
    - **Con:** Can be less space-efficient for dense graphs (graphs with many edges), where an adjacency matrix might be comparable or better.
- **Time Complexity**
    - **Pro:** Adding a vertex is fast, typically $O(1)$. Adding an edge is also fast, $O(1)$. Iterating over all neighbors of a vertex is efficient, as you just traverse its list.
    - **Con:** Checking if an edge exists between two vertices (e.g., `is_edge(u, v)`) is slower than with an adjacency matrix. It requires searching the adjacency list of vertex `u`, which takes time proportional to the number of `u`'s neighbors (its degree).

## Connections

```
```
                  (Parent)
                   Graphs
                     ▲
                     │
┌────────────────────┼────────────────────┐
│                    │                    │
(Alternative)   ┌───────────────────────────┐   (Related)
Adjacency Matrix│Graph Impl (Adjacency List)│   Python Dictionaries
                └───────────────────────────┘
                     │
          ┌──────────┴──────────┐
          │                     │
   Directed Graphs      Undirected Graphs
```
```

### Parent Concept

This implementation is a specific method for representing the abstract data structure known as a [[DSA - Graphs|graph]].

### Child Concepts



### Related Concepts 

- This implementation naturally represents [[DSA - Directed Graphs|directed graphs]], as shown by the one-way connections in the example.
- It can be easily adapted to model [[DSA - Undirected Graphs|undirected graphs]] by adding a second edge in the reverse direction for every edge added.
- The core data structure used in this implementation is the [[Python - Dictionaries|Python dictionary]], which provides efficient key-based lookups for vertices.
- This method contrasts with the [[DSA - Adjacency Matrix|adjacency matrix]] representation, which uses a 2D array and is often better for dense graphs.
- Understanding this structure is foundational for exploring various [[DSA - Graph Applications|graph applications]].
## Questions

- Your social media application is currently using this adjacency list implementation. As the network grows incredibly dense (approaching a state where nearly everyone is connected to everyone else), what specific performance metric would degrade first, and how would you justify the engineering cost of migrating to an adjacency matrix representation to a product manager focused on short-term feature delivery?
- Imagine this graph implementation is used for a dependency management system (like pip or npm). How would you design a system to detect and report cyclical dependencies (e.g., A depends on B, and B depends on A) during the `add_edge` operation to prevent infinite loops during package installation?
- What if Python dictionaries suddenly lost their O(1) average-case lookup time and became O(n)? How would you redesign this graph implementation from scratch using only lists and tuples to maintain reasonable performance for adding edges and finding neighbors?