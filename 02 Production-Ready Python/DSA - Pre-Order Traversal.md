---
tags: 
  - core
  - dsa
  - tree_traversal
  - depth_first_search
  - recursion
  - root_left_right
  - polish_notation
  - concept
source: 
  - "[[Data Structures and Algorithms in Python]]"
related: 
  - "[[DSA - DFS for Binary Trees]]"
  - "[[DSA - Depth First Search (DFS)]]"
  - "[[DSA - Tree and Graph Traversal]]"
  - "[[DSA - In-Order Traversal]]"
  - "[[DSA - Post-Order Traversal]]"
  - "[[DSA - In-Order vs Pre-Order vs Post-Order Traversal Use Cases]]"
  - "[[DSA - Trees]]"
  - "[[DSA - Binary Search Tree (BST)]]"
  - "[[Python - Recursion]]"
  - "[[Python - Stacks (Data Structure)]]"
  - "[[DSA - Time Complexity of Tree DFS]]"
  - "[[DSA - Data Structures & Algorithms]]"
---
# Core: Pre-Order Traversal

## Summary

>Pre-order traversal is a method for visiting all nodes in a tree data structure, following a specific "Root, Left, Right" sequence. It's a key type of [[DSA - DFS for Binary Trees|Depth-First Search (DFS) for binary trees]] where the current node is processed first, followed by the recursive traversal of its left subtree, and then its right subtree. This contrasts with [[DSA - In-Order Traversal|In-Order]] and [[DSA - Post-Order Traversal|Post-Order]] traversals, which process the node at different stages.

**Why This Matters:** Pre-order traversal is crucial for tasks like creating an exact copy of a tree or serializing it, as it preserves the hierarchical structure by processing parent nodes before their children.

_Analogy:_ _Imagine a formal introduction at a royal family gathering. The monarch (the root node) is introduced first. Then, the monarch introduces their firstborn, and that entire branch of the family (the left subtree) is introduced, following the same protocol (heir first, then their children). Only after the firstborn's entire line is presented does the monarch introduce their second-born and that entire branch of the family (the right subtree)._

The monarch is the root node of the tree. Introducing yourself first corresponds to processing the current node's data. The firstborn's family line represents the left subtree, while the second-born's family line represents the right subtree. The protocol itself is the recursive nature of the traversal.

**Where it breaks down:** This analogy implies a strict birth order, whereas a binary tree only has a left and a right child, not necessarily a 'first' or 'second' in a temporal sense. The analogy also doesn't capture the 'backtracking' aspect of the algorithm as it returns from recursive calls.

```
Traversal Path (Root -> Left -> Right) on the example tree:

1. Visit 65
       (65)
       /  \
      20   70
     / \  / \
    10 22 68 75

2. Go Left, Visit 20
       (65)
       /
     (20)

3. Go Left, Visit 10
       (65)
       /
     (20)
     /
   (10) -> Backtrack

4. Go Right, Visit 22
       (65)
       /
     (20)
       \
       (22) -> Backtrack to 20 -> Backtrack to 65

5. Go Right, Visit 70
       (65)
          \
          (70)

6. Go Left, Visit 68
       (65)
          \
          (70)
          /
        (68) -> Backtrack

7. Go Right, Visit 75
       (65)
          \
          (70)
            \
            (75) -> Backtrack to 70 -> Backtrack to 65 -> Done.

Final Order: 65, 20, 10, 22, 70, 68, 75
```

## Details

Pre-order traversal is a fundamental algorithm within [[DSA - Tree and Graph Traversal|tree traversal]], specifically a form of [[DSA - DFS for Binary Trees|Depth-First Search for binary trees]]. The core idea is to follow a strict "visit-left-right" order. You start at the root, "visit" it (e.g., print its value or add it to a list), and then you commit to exploring its entire left side. You recursively apply the same pre-order logic to the left child, going deeper and deeper until you can't go left anymore. Only after the entire left subtree has been visited do you backtrack and apply the same process to the right subtree.

#### Primary Goal

To process a parent node before any of its descendant nodes, ensuring a top-down exploration of the tree's structure.

#### Mechanism

- **How it Works:** The process is typically implemented recursively:
    - **Step 1: Visit the Root:** Process the current node (e.g., print its data, add it to an array).
    - **Step 2: Traverse the Left Subtree:** Make a recursive call to the pre-order function using the current node's left child as the new root.
    - **Step 3: Traverse the Right Subtree:** After the entire left subtree has been traversed (i.e., the recursive call from Step 2 has returned), make a recursive call to the pre-order function using the current node's right child as the new root.

##### Code Translation

```python
class Node:
    def __init__(self, data):
        self.data = data
        self.left_child = None
        self.right_child = None

class Tree:
    def __init__(self, root=None):
        self.root = root

    def pre_order(self, current_node):
        # Base case: If the node is None, return
        if current_node:
            # --- Step 1: Visit the current node ---
            print(current_node.data)

            # --- Step 2: Recursively traverse the left subtree ---
            self.pre_order(current_node.left_child)

            # --- Step 3: Recursively traverse the right subtree ---
            self.pre_order(current_node.right_child)

# Example from the image:
#         65
#        /  \
#       20   70
#      / \  / \
#     10 22 68 75
root = Node(65)
root.left_child = Node(20)
root.right_child = Node(70)
root.left_child.left_child = Node(10)
root.left_child.right_child = Node(22)
root.right_child.left_child = Node(68)
root.right_child.right_child = Node(75)

my_tree = Tree(root)
print("Pre-order traversal:")
my_tree.pre_order(my_tree.root)
# Expected Output:
# 65
# 20
# 10
# 22
# 70
# 68
# 75
```

 [[Code - Pre-Order Traversal Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Starting Node:** The traversal begins at a specified node, which is almost always the root of the tree for a full traversal.
    - If you start from a different node, the traversal will only cover the subtree rooted at that node.

#### Core Trade-offs

- **Use Case: Creating Copies:**
    - Pre-order traversal is ideal for copying a tree. By inserting nodes in pre-order sequence, you can perfectly replicate the original tree's structure.
- **Use Case: Prefix Expressions (Polish Notation):**
    - When applied to an expression tree, a pre-order traversal yields the prefix notation of the expression (e.g., `+ a b`). This is useful in some compilers and calculators.
- **Limitation: Unsuitability for Deletion:**
    - It's not suitable for processes that require child nodes to be handled before the parent, such as deleting all nodes in a tree. For that, [[DSA - Post-Order Traversal|Post-Order traversal]] is used.

## Connections

```
                           (Parent)
                   DFS for Binary Trees
                             ▲
                             │
┌────────────────────────────┼────────────────────────────┐
│                            │                            │
(Sibling)               ┌──────────────────┐                (Sibling)
In-Order Traversal      │Pre-Order Traversal│             Post-Order Traversal
                        └──────────────────┘
                                 │
                                 │
                      (Application Context)
   In-Order vs Pre-Order vs Post-Order Traversal Use Cases
```

### Parent Concept

Pre-order traversal is a specific implementation of [[DSA - DFS for Binary Trees|Depth-First Search for binary trees]], which systematically explores the depth of the tree before backtracking.

### Child Concepts



### Related Concepts 

- It directly contrasts with [[DSA - In-Order Traversal|In-Order traversal]], which follows a 'Left, Root, Right' pattern, useful for retrieving sorted data from a Binary Search Tree.
- It also contrasts with [[DSA - Post-Order Traversal|Post-Order traversal]], which uses a 'Left, Right, Root' pattern, essential for tasks like deleting nodes from a tree.
- The choice between these methods is dictated by the problem, as explored in [[DSA - In-Order vs Pre-Order vs Post-Order Traversal Use Cases|the use cases for different traversal types]].
## Questions

- Imagine you're serializing a complex configuration hierarchy (represented as a tree) to a file so it can be reconstructed later. Why would pre-order traversal be a more robust choice than in-order or post-order for this task, and what's the business impact of choosing the wrong traversal?
- If you were to implement pre-order traversal iteratively using a stack instead of recursively for a massive, deeply unbalanced tree, what potential memory or performance issues would you be mitigating, and how would the stack-based approach handle that?
- What if you were forbidden from using recursion or an explicit stack? Could you devise a method for pre-order traversal (like Morris Traversal) that uses only a constant amount of extra space, and what would be the trade-offs?