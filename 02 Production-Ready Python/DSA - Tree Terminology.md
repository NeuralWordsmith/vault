---
tags: 
  - core
  - ds
  - root_node
  - parent_child
  - tree_levels
  - node_hierarchy
  - data_structure
  - concept
source: 
  - "[[Data Structures and Algorithms in Python]]"
related: 
  - "[[DSA - Trees]]"
  - "[[DSA - Binary Tree]]"
  - "[[DSA - Binary Tree Node Implementation]]"
  - "[[DSA - Tree Applications]]"
  - "[[DSA - Graphs]]"
  - "[[DSA - Trees vs Graphs]]"
  - "[[DSA - Trees & Graphs Relationship]]"
  - "[[Fundamental - Computer Science]]"
  - "[[DSA - Directed Graphs]]"
  - "[[DSA - Undirected Graphs]]"
  - "[[DSA - Graph Implementation (Adjacency List)]]"
  - "[[Python - Class Definition]]"
---
# Core: Tree Terminology

## Summary

>In a tree data structure, the **root** is the top-most node, a **parent** is a node that has other nodes connected below it, and these connected nodes are its **children**. The entire structure is organized into **levels**, representing the distance from the root.

**Why This Matters:** Standardized terminology provides a precise language for describing, analyzing, and implementing tree-based data structures, which is essential for clear communication and correct algorithm design.

_Analogy:_ _A tree data structure is like a family tree. The original ancestor is the 'root'. Their direct descendants are their 'children', and they are the 'parent'. Each generation (grandparents, parents, children) represents a different 'level' in the family hierarchy._

**Where it breaks down:** Unlike a family tree where a child has two biological parents, in most computer science trees, a child node has exactly one parent. This single-parent rule is fundamental to the tree's hierarchical structure.

```
    Level 1:      (A)  <-- Root
                 / | \
    Level 2:   (B) (C) (D)  <-- B, C, D are children of A
               / \     |
    Level 3: (E) (F)   (G)  <-- E, F are children of B
                       |
    Level 4:           (H)
```

## Details

To effectively work with [[DSA - Trees|tree data structures]], we need a common vocabulary. The provided images illustrate the fundamental terminology used to describe the relationships between nodes and the overall structure. The first node is called the **root**. Any node can be a **parent** to other nodes, which are called its **children**. The hierarchy is organized into distinct **levels**, indicating how many steps away a node is from the root. This language is foundational for discussing more complex structures like a [[DSA - Binary Tree|binary tree]].

#### Primary Goal

To establish a clear and unambiguous language for describing the components, relationships, and structure of a tree data structure.

#### Mechanism

- **How it Works:** The terminology defines the hierarchical relationships within a tree based on a few key roles and properties.
    1. A single node is designated as the starting point (the root).
    2. Other nodes are added below it, forming parent-child links.
    3. This creates a branching structure where every node (except the root) has exactly one parent.
- **Root Node:** The single, top-most node in the tree from which all other nodes descend. It is the only node with no parent.
    - *Example:* In the provided image, node `A` is the root.
- **Parent Node:** A node that has at least one other node connected directly below it.
    - *Example:* Node `B` is the parent of nodes `E` and `F`. Node `D` is the parent of node `G`.
- **Child Node:** A node that is connected directly below another node (its parent). Nodes with the same parent are called siblings.
    - *Example:* Nodes `E` and `F` are the children of node `B`. Node `G` is the child of node `D`.
- **Levels (or Depth):** The organization of the tree into layers based on the distance from the root. The root is at Level 1 (or sometimes Level 0).
    - *Example:*
    - - *Level 1:* `A`
    - - *Level 2:* `B`, `C`, `D`
    - - *Level 3:* `E`, `F`, `G`
    - - *Level 4:* `H`

##### Code Translation

nothing to fill here

 [[Code - Tree Terminology Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Height:** The number of edges on the longest path from the root node to a leaf node (a node with no children). It defines the 'tallness' of the tree.
- **Depth:** The number of edges from the root node to a specific node. The depth of the root is 0.
- **Leaf Node:** A node that has no children.
    - *Example:* In the diagram, `C`, `E`, `F`, and `H` are leaf nodes.
- **Internal Node:** A node that has at least one child.
    - *Example:* In the diagram, `A`, `B`, `D`, and `G` are internal nodes.

#### Core Trade-offs

- **Clarity vs. Rigidity:** While this terminology provides extreme clarity, it also enforces a strict hierarchical model (one parent per child), which makes it unsuitable for representing network-like relationships where a node can have multiple 'parents,' a scenario better handled by [[DSA - Graphs|graphs]].
- **Abstraction vs. Implementation:** The concept of 'levels' is abstract. In a practical [[DSA - Binary Tree Node Implementation|node implementation]], levels aren't explicitly stored but are inferred by traversing the tree from the root.

## Connections

```
                      (Parent)
                       Trees
                         ▲
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                    │
(Related)      ┌─────────────────────┐      (Related)
 Graphs        │  Tree Terminology   │   Binary Tree
               └─────────────────────┘
                         │
                         ▼
                  (Used to Describe)
                  Tree Traversal
```

### Parent Concept

This terminology is fundamental to understanding the structure of [[DSA - Trees|trees]], which are hierarchical data structures.

### Child Concepts

- This vocabulary is applied to describe specific types of trees, such as the [[DSA - Binary Tree|binary tree]], where each parent has at most two children.

### Related Concepts 

- This hierarchical language directly [[DSA - Trees vs Graphs|contrasts with]] the terminology for [[DSA - Graphs|graphs]], which can represent more complex, non-hierarchical networks.
- Understanding these terms is a prerequisite for implementing tree structures, such as in a [[DSA - Binary Tree Node Implementation|binary tree node implementation]].
- The relationship between nodes is a core concept that helps differentiate [[DSA - Trees & Graphs Relationship|trees and graphs]].
## Questions

- Imagine you're designing a file system for a new OS. How would the concepts of 'parent', 'child', and 'levels' influence your design for file path resolution, and what's the business impact of choosing a deep vs. a wide tree structure for user directories?
- If you were to serialize a massive tree structure (e.g., a corporate org chart with millions of employees) to send over a network, how would you represent the parent-child relationships efficiently to minimize payload size and reconstruction time on the client-side?
- What if a node could have more than one parent? How would that fundamentally change the definition of a 'level' and a 'root', and what kind of real-world system would this new 'poly-hierarchical' structure be useful for?