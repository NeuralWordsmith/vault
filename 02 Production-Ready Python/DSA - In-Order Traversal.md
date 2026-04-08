---
tags: 
  - core
  - dsa
  - binary_tree
  - recursion
  - depth_first_search
  - bst
  - sorting
  - concept
source: 
  - "[[Data Structures and Algorithms in Python]]"
related: 
  - "[[DSA - Tree and Graph Traversal]]"
  - "[[DSA - Depth First Search (DFS)]]"
  - "[[DSA - DFS for Binary Trees]]"
  - "[[DSA - Pre-Order Traversal]]"
  - "[[DSA - Post-Order Traversal]]"
  - "[[DSA - In-Order vs Pre-Order vs Post-Order Traversal Use Cases]]"
  - "[[DSA - Time Complexity of Tree DFS]]"
  - "[[Fundamental - Computer Science]]"
  - "[[DSA - Binary Search Tree]]"
  - "[[DSA - Recursion]]"
  - "[[DSA - Stack Data Structure]]"
  - "[[DSA - Tree Data Structure]]"
  - "[[Python - User-Defined Functions]]"
---
# Core: In-Order Traversal

## Summary

>In-order traversal is a specific type of [[DSA - Depth First Search (DFS)|Depth-First Search]] for binary trees that processes nodes in a 'Left-Current-Right' sequence. This means it recursively explores the entire left subtree, visits the current node, and then recursively explores the entire right subtree. A key feature is that when applied to a Binary Search Tree (BST), it visits the nodes in ascending order, effectively sorting the data.

**Why This Matters:** Its primary significance lies in its ability to retrieve all elements from a Binary Search Tree in their natural, sorted order, which is fundamental for many data retrieval and processing tasks.

_Analogy:_ _Imagine you're looking up a word in a physical dictionary. You don't read it from front to back. Instead, you open to a section (the root), decide if your word is before or after the current page (go left or right), and repeat this process. When you finally find your word (the 'current' node), you've implicitly navigated past all the 'left' words and haven't yet reached the 'right' words. Reading the words in this navigated order would give you a sorted list._

**Where it breaks down:** A dictionary is static and perfectly balanced. A binary tree can be unbalanced, meaning the 'left' or 'right' side could be much deeper, making the traversal path less direct than flipping through dictionary pages. Also, the analogy focuses on finding one item, whereas traversal visits *every* item.

```
Traversal Path (L -> C -> R) on the example tree:

Start at 65 -> Go Left to 20
  -> Go Left to 10
    -> No Left child. VISIT 10.
    -> No Right child. Return to 20.
  -> Visited Left of 20. VISIT 20.
  -> Go Right to 22
    -> No Left child. VISIT 22.
    -> No Right child. Return to 20.
  -> Return to 65.
-> Visited Left of 65. VISIT 65.
-> Go Right to 70
  -> Go Left to 68
    -> No Left child. VISIT 68.
    -> No Right child. Return to 70.
  -> Visited Left of 70. VISIT 70.
  -> Go Right to 75
    -> No Left child. VISIT 75.
    -> No Right child. Return to 70.
  -> Return to 65.
-> Traversal Complete.

Final Order: 10, 20, 22, 65, 68, 70, 75
```

## Details

In-order traversal is a fundamental algorithm in computer science for visiting nodes in a binary tree. It follows a strict 'Left, Current, Right' order. The process starts at the root and recursively travels down the left-most path. Once it hits a node with no left child, it 'visits' that node (e.g., prints its value), and then attempts to traverse its right subtree. This backtracking process ensures that for any given node, its entire left subtree is visited before the node itself, and the node is visited before its entire right subtree. This specific ordering is what makes it incredibly useful for Binary Search Trees, as it naturally produces a sorted sequence of the tree's elements.

#### Primary Goal

To visit every node in a binary tree following a 'Left-Subtree, Current-Node, Right-Subtree' sequence, which is particularly useful for retrieving elements from a Binary Search Tree in ascending order.

#### Mechanism

- **Step 1: Check for a Valid Node**
    - The recursive function first checks if the `current_node` is not `None`. This serves as the base case that stops the recursion when we reach a leaf's child (which is null).
- **Step 2: Traverse the Left Subtree**
    - The function calls itself (`in_order`) on the `current_node.left_child`. This step is repeated, pushing function calls onto the call stack, until a node with no left child is found.
- **Step 3: Visit the Current Node**
    - Once the recursion can't go any further left, the call stack begins to unwind. At this point, the current node's data is processed (e.g., `print(current_node.data)`).
- **Step 4: Traverse the Right Subtree**
    - After visiting the current node, the function calls itself (`in_order`) on the `current_node.right_child` to process the entire right subtree in the same manner.

##### Code Translation

```python
# Assuming a simple Node class structure
class Node:
    def __init__(self, data):
        self.data = data
        self.left_child = None
        self.right_child = None

def in_order(current_node):
    # --- Step 1: Check for a Valid Node (Base Case) ---
    if current_node:
        # --- Step 2: Traverse the Left Subtree ---
        in_order(current_node.left_child)

        # --- Step 3: Visit the Current Node ---
        print(current_node.data)

        # --- Step 4: Traverse the Right Subtree ---
        in_order(current_node.right_child)

# Example based on the image:
# Constructing the tree
root = Node(65)
root.left_child = Node(20)
root.right_child = Node(70)
root.left_child.left_child = Node(10)
root.left_child.right_child = Node(22)
root.right_child.left_child = Node(68)
root.right_child.right_child = Node(75)

# Calling the traversal function
in_order(root)

# Expected Output:
# 10
# 20
# 22
# 65
# 68
# 70
# 75
```

 [[Code - In-Order Traversal Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Starting Node**
    - The traversal typically begins at the root of the tree. However, the function can be called on any node to traverse only the subtree rooted at that specific node.

#### Core Trade-offs

- **Space Complexity**
    - The recursive implementation uses the call stack for storing function calls. In the worst case of a completely skewed tree, the space complexity can be $O(n)$, where $n$ is the number of nodes. For a balanced tree, it improves to $O(\log n)$.
- **Stack Overflow Risk**
    - For very deep or highly unbalanced trees, the recursive approach can exhaust the call stack memory, leading to a stack overflow error. An iterative approach using an explicit stack data structure can mitigate this risk.
- **Use Case Specificity**
    - While perfect for getting sorted data from a BST, it's not always the best choice. For example, [[DSA - Post-Order Traversal|Post-order traversal]] is used for safely deleting nodes in a tree, and [[DSA - Pre-Order Traversal|Pre-order traversal]] is useful for creating a copy of a tree.

## Connections

```
            (Parent)
    DFS for Binary Trees
               ▲
               │
┌──────────────┴──────────────┐
│                             │
(Sibling)            ┌──────────────────┐             (Sibling)
Pre-Order Traversal  │ In-Order Traversal │             Post-Order Traversal
                     └──────────────────┘
                              │
                              │
                         (Key Use Case)
                              │
                       Binary Search Tree
                           (Sorting)
```

### Parent Concept

In-order traversal is a specific strategy for implementing a [[DSA - DFS for Binary Trees|depth-first search on a binary tree]].

### Child Concepts



### Related Concepts 

- It directly contrasts with [[DSA - Pre-Order Traversal|Pre-order traversal]] (Current-Left-Right) and [[DSA - Post-Order Traversal|Post-order traversal]] (Left-Right-Current), which visit nodes in different sequences for different purposes.
- The choice between these methods is explored in [[DSA - In-Order vs Pre-Order vs Post-Order Traversal Use Cases|comparing traversal use cases]], which highlights when to use each one.
- The overall approach is a form of [[DSA - Tree and Graph Traversal|tree traversal]], a fundamental category of algorithms for visiting every node in a data structure.
## Questions

- You're designing a system for an e-commerce site to display products sorted by price. When would the overhead of maintaining a perfectly balanced Binary Search Tree to guarantee efficient in-order traversal be worth the engineering cost, versus simply storing products in an array and sorting it on demand for each user request?
- If you were to implement an iterative (non-recursive) version of in-order traversal to avoid stack overflow on a massive, deeply nested tree with billions of nodes, what data structure would you use to manage the traversal state, and what are the potential memory bottlenecks of that approach?
- What if you needed to perform an in-order traversal on a tree where each node's `left` and `right` pointers were encrypted, and you could only decrypt them by visiting the parent node first? How would this constraint fundamentally break the standard in-order algorithm, and could you devise a new traversal method to still get a sorted list?