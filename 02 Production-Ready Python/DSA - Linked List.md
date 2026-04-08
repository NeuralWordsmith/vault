---
tags: 
  - major_core
  - cs
  - data_structure
  - nodes
  - pointers
  - sequential_access
  - dynamic_memory
  - concept
source: 
  - "[[Data Structures and Algorithms in Python]]"
related: 
  - "[[DSA - Data Structure Definition]]"
  - "[[DSA - Linked List Node]]"
  - "[[DSA - Linked List Head and Tail]]"
  - "[[DSA - Linked List Memory Allocation]]"
  - "[[DSA - Singly vs Doubly Linked List]]"
  - "[[Python - Lists]]"
  - "[[Fundamental - Computer Science]]"
  - "[[DSA - Algorithm Definition]]"
  - "[[Python - LinkedList Class Implementation]]"
  - "[[Python - LinkedList Append Method]]"
  - "[[Python - LinkedList Prepend Method]]"
  - "[[Python - LinkedList Search Method]]"
  - "[[DSA - Linked List Applications]]"
  - "[[DSA - Data Structures & Algorithms]]"
---
# Major Core: Linked List

## Summary

> A linked list is a fundamental linear [[DSA - Data Structure Definition|data structure]] where elements are not stored at contiguous memory locations. Instead, each element, or [[DSA - Linked List Node|node]], contains its own data and a pointer (or 'link') to the next node in the sequence. The sequence begins with a [[DSA - Linked List Head and Tail|head]] and ends with a node that points to null, signifying the end of the list.

**Why This Matters:** Linked lists provide a memory-efficient way to manage dynamic collections of data, enabling fast insertions and deletions without needing to shift large blocks of memory.

_Analogy:_ _A linked list is like a scavenger hunt. Each clue (a node) contains a piece of information (the data) and tells you exactly where to find the next clue (the pointer). You start at the first clue (the head) and follow the directions one by one until you reach the final clue, which tells you the hunt is over (the null pointer)._

<ul><li><b>Clue:</b> Represents a [[DSA - Linked List Node|Node]] in the list.</li><li><b>Information on the Clue:</b> Represents the data stored within the node.</li><li><b>Directions to the Next Clue:</b> Represents the pointer (or link) to the next node.</li><li><b>Starting Point of the Hunt:</b> Represents the [[DSA - Linked List Head and Tail|Head]] of the list.</li><li><b>Final Clue saying "You're Done!":</b> Represents the null pointer at the end of the list.</li><li><b>Where it breaks down:</b> In a scavenger hunt, you can't easily insert a new clue in the middle without changing the directions on the previous clue. While this is true for a linked list, the process is computationally very efficient, whereas physically changing a scavenger hunt clue would be cumbersome. Also, you can't jump to the 5th clue without visiting the first four, highlighting the sequential access limitation of linked lists.</li></ul>

```
Head
 | 
 v
+--------+----+      +---------+----+      +---------+----+      +---------+----+
| "data" |next| ---> | "data"  |next| ---> | "data"  |next| ---> | "data"  |null|
+--------+----+      +---------+----+      +---------+----+      +---------+----+
```

## Details

A linked list is a sequence of data elements connected through links or pointers. Unlike arrays, where elements are stored in a contiguous block of memory, linked list elements can be scattered anywhere in memory. This structure is a cornerstone of [[DSA - Data Structures & Algorithms|Data Structures and Algorithms]]. Each element, called a [[DSA - Linked List Node|node]], is a small object that holds the actual data and a reference to the next node in the chain. The list is traversed by starting at the first node, known as the [[DSA - Linked List Head and Tail|head]], and following the chain of pointers until the end is reached, indicated by a null pointer. Key variations include **singly linked lists** and **doubly linked lists**.

#### Primary Goal

To provide a dynamic data structure that excels at efficient insertion and deletion of elements, especially when the size of the data collection is unknown or changes frequently.

#### Mechanism

- **How it Works:**
    1. The list is identified by a single pointer to its first element, the [[DSA - Linked List Head and Tail|head]]. If the head pointer is null, the list is empty.
    2. Each [[DSA - Linked List Node|node]] in the list contains two parts: the data it holds and a pointer (the 'next' reference) to the subsequent node.
    3. To traverse the list, you start at the head and follow the 'next' pointers from node to node.
    4. The sequence ends when a node's 'next' pointer is null, indicating there are no more elements.
- **Core Components:**
    - **Node:** The basic building block. It's a container with two fields.
        - *Example: A node could store an integer `5` and a pointer to the memory address of the next node.*
    - **Data:** The value stored within a node.
        - *Example: In the image from the context, the data are the strings "mixing", "resting", etc.*
    - **Pointer ('Next'):** A reference that stores the memory address of the next node in the sequence. This is the 'link' in the linked list.
        - *Example: The node containing "mixing" has a pointer that points to the node containing "resting".*

nothing to fill here

 [[Code - Linked List Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Structure Pointers:** The primary 'levers' of a linked list are the pointers that define its structure.
    - **Head Pointer:** Determines the entry point of the list. Changing the head pointer effectively makes a new node the start of the list.
    - **Tail Pointer:** (Optional but common) A pointer to the last node. It allows for O(1) append operations, but adds complexity to maintain.
    - **'Next' Pointers:** These are the internal links. Modifying a node's 'next' pointer is how insertion and deletion are performed, rerouting the chain to include or exclude a node.

#### Core Trade-offs

- **Dynamic Size vs. Access Speed:** Linked lists offer flexibility at the cost of direct access.
    - **Pro: Efficient Insertions/Deletions:** Adding or removing an element in the middle of a linked list is very fast (O(1)) if you already have a pointer to the preceding node, as it only requires updating a couple of pointers. This contrasts with arrays, which require shifting all subsequent elements (O(n)).
    - **Con: Slow Access/Search:** To access the nth element, you must traverse the list from the head, taking O(n) time. Arrays provide constant time O(1) access to any element via its index.
    - **Pro: Memory Flexibility:** The [[DSA - Linked List Memory Allocation|memory for nodes]] can be allocated anywhere, which is efficient for managing dynamic data that grows and shrinks unpredictably. Arrays require a contiguous block of memory, which can lead to fragmentation or costly resizing operations.
    - **Con: Memory Overhead:** Each node in a linked list must store at least one extra piece of information: the pointer to the next node. This can add up to significant memory overhead compared to an array, especially if the data elements themselves are small.

## Connections

```
                  (Parent)
             Data Structure
                    ▲
                    │
┌───────────────────┼───────────────────┐
│                   │                   │
(Contrasts With) ┌──────────────┐    (Composed Of)
   Array         │  Linked List │    Linked List Node
                 └──────────────┘
                        │
             ┌──────────┴──────────┐
             │                     │
    Singly Linked List    Doubly Linked List
```

### Parent Concept

It is a fundamental type of [[DSA - Data Structure Definition|data structure]] used in computer science to organize and store data.

### Child Concepts

- A common variant is the [[DSA - Singly vs Doubly Linked List|singly linked list]], where each node points only to the next node in the sequence.
- Another key type is the [[DSA - Singly vs Doubly Linked List|doubly linked list]], which provides more flexibility by having each node point to both the next and the previous node.

### Related Concepts 

- The individual elements of a linked list are instances of a [[DSA - Linked List Node|Linked List Node]].
- It contrasts sharply with a [[Python - Lists|Python List (Dynamic Array)]], which stores elements in contiguous memory blocks and offers fast indexed access but slower insertions and deletions.
- Understanding [[DSA - Linked List Memory Allocation|how linked lists handle memory allocation]] is key to appreciating their advantage over static arrays in dynamic scenarios.
## Questions

- You're building a real-time text editor with a feature for 'undo/redo'. Would you choose a linked list or a dynamic array to store the history of user actions? Justify your choice by weighing the performance of insertions/deletions against the need for random access, and explain the business impact of that choice on user experience.
- Imagine a distributed system where multiple services need to process a shared, ordered queue of tasks. How could you implement a thread-safe linked list to manage this queue, and what are the primary bottlenecks or race conditions you would need to design for at scale?
- What if memory addresses were not fixed, and the 'pointer' in a node could only store a relative instruction like 'the next node is 3 blocks forward and 2 blocks to the left from my current position'? How would this change the fundamental operations of a linked list, and what new possibilities or problems would it create?
