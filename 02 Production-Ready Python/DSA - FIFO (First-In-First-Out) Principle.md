---
tags: 
  - core
  - ds
  - fifo
  - data_structure
  - linear_data_structure
  - enqueue
  - dequeue
  - concept
source: 
  - "[[Data Structures and Algorithms in Python]]"
related: 
  - "[[DSA - Data Structures]]"
  - "[[Fundamental - Computer Science]]"
  - "[[DSA - Stacks]]"
  - "[[DSA - Linked Lists]]"
  - "[[DSA - Queue Head]]"
  - "[[DSA - Queue Tail]]"
  - "[[DSA - Enqueue Operation]]"
  - "[[DSA - Dequeue Operation]]"
  - "[[DSA - Queue Variations]]"
  - "[[DSA - Queue Applications]]"
  - "[[DSA - Queue Implementation with Linked Lists]]"
  - "[[Python - queue Module]]"
  - "[[DSA - Big O Notation]]"
  - "[[DSA - Breadth-First Search (BFS)]]"
  - "[[DSA - Priority Queues]]"
---
# Core: Queues

## Summary

>A queue is a linear data structure that strictly adheres to the **First-In-First-Out (FIFO)** principle. This means the first element added to the collection is the first one to be removed. It operates like a line, where new elements are added to one end (the [[DSA - Queue Tail|tail]]) and removed from the other (the [[DSA - Queue Head|head]]). The two primary operations are [[DSA - Enqueue Operation|enqueue]] (adding an item) and [[DSA - Dequeue Operation|dequeue]] (removing an item).

**Why This Matters:** Queues are essential for managing tasks and resources in a fair, sequential order, forming the backbone of everything from printer jobs and network packet handling to asynchronous processing in web applications.

_Analogy:_ _Imagine a checkout line at a grocery store. The first person to get in line is the first person to be served by the cashier and leave. People who arrive later join the back of the line and must wait for everyone in front of them to be served first._

-
**The Line:** Represents the queue itself.
- **People:** The data elements being stored in the queue.
- **Getting in Line:** The [[DSA - Enqueue Operation|enqueue]] operation, adding an element to the tail.
- **Being Served by the Cashier:** The [[DSA - Dequeue Operation|dequeue]] operation, removing an element from the head.
- **Where it breaks down:** This analogy doesn't account for concepts like priority queues (where someone might cut in line for an emergency) or dequeues (where someone could leave from either end of the line), which are covered in [[DSA - Queue Variations]].

```
Head -> [ Item 1 ] -> [ Item 2 ] -> [ Item 3 ] <- Tail

Dequeue Operation:
Removes from Head
<-- [ Item 1 ]

Resulting Queue:
Head -> [ Item 2 ] -> [ Item 3 ] <- Tail

Enqueue Operation:
Adds to Tail
                            [ Item 4 ] -->

Resulting Queue:
Head -> [ Item 2 ] -> [ Item 3 ] -> [ Item 4 ] <- Tail
```

## Details

At its heart, a queue is a fundamental data structure in computer science designed to manage a collection of items while preserving their insertion order. Based on the "First-In-First-Out" (FIFO) principle, it ensures that elements are processed in the exact sequence they were added. This simple but powerful rule makes queues indispensable for scenarios requiring orderly, sequential processing. The structure is defined by two main pointers: the [[DSA - Queue Head|head]], which points to the front of the queue, and the [[DSA - Queue Tail|tail]], which points to the end.

#### Primary Goal

To enforce a strict, sequential order of processing where elements are handled in the same order they are received.

#### Mechanism

- **How it Works:**
    1. **Initialization:** An empty queue is created, with its [[DSA - Queue Head|head]] and [[DSA - Queue Tail|tail]] pointers typically set to null or an initial index.
    2. **Adding Elements (Enqueue):** When a new element is added using the [[DSA - Enqueue Operation|enqueue]] operation, it is placed at the [[DSA - Queue Tail|tail]] of the queue. The tail pointer is then updated to point to this new element.
    3. **Removing Elements (Dequeue):** When an element is removed using the [[DSA - Dequeue Operation|dequeue]] operation, the element at the [[DSA - Queue Head|head]] of the queue is returned. The head pointer is then updated to point to the next element in line.
- **Key Components:**
    - **Head:** The front of the queue. This is where elements are removed from. See [[DSA - Queue Head]] for more detail.
    - **Tail:** The back or rear of the queue. This is where new elements are added. See [[DSA - Queue Tail]] for more detail.
- **Core Operations:**
    - **Enqueue:** Adds an item to the tail of the queue. The process is detailed in [[DSA - Enqueue Method Implementation Process]].
    - **Dequeue:** Removes and returns the item from the head of the queue. The process is detailed in [[DSA - Dequeue Method Implementation Process]].
    - **Peek (or Front):** Returns the item at the head of the queue without removing it.
    - **isEmpty:** Checks if the queue contains any elements.
    - **isFull:** Checks if the queue has reached its maximum capacity (relevant for array-based implementations).

##### Code Translation

nothing to fill here

 [[Code - Queues Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Implementation Choice:**
    - The underlying data structure used to implement the queue significantly affects its performance. Common choices include arrays (static or dynamic) and linked lists, as explored in [[DSA - Queue Implementation with Linked Lists]].
- **Capacity:**
    - For array-based implementations, a maximum size or capacity must be defined. A **bounded queue** has a fixed size, while an **unbounded queue** (typically implemented with a linked list) can grow dynamically.

#### Core Trade-offs

- **Advantage: Fairness and Order Preservation**
    - The strict FIFO nature ensures that every item is processed in the order it was received, which is inherently fair and predictable. This is crucial for applications like task schedulers or request handlers.
- **Advantage: Simplicity**
    - The operations (enqueue, dequeue) are intuitive and generally have a constant time complexity, $O(1)$, with efficient implementations (like a doubly linked list or a circular array).
- **Disadvantage: Inflexibility**
    - The FIFO principle is rigid. Queues are unsuitable for scenarios where some items are more important than others and need to be processed sooner. For such cases, a Priority Queue is a better fit.
- **Disadvantage: No Random Access**
    - You can only access elements at the head of the queue. Searching for or accessing an element in the middle of the queue is inefficient, typically requiring $O(n)$ time as you must dequeue elements one by one.

## Connections

```
                  (Parent)
              Data Structures
                     ▲
                     │
     ┌───────────────┼───────────────┐
     │               │               │
(Contrasting)   ┌──────────────────┐   (Implementation)
   Stack        │      Queues      │   Linked List
  (LIFO)        └──────────────────┘
                     │
          ┌──────────┴──────────┐
          │                     │
  (Variation)           (Application)
Priority Queue       Breadth-First Search
```

### Parent Concept

Queues are a fundamental type of linear [[DSA - Data Structures|data structure]] within the broader field of [[Fundamental - Computer Science|Computer Science]].

### Child Concepts

- There are several important [[DSA - Queue Variations|variations of queues]], such as Priority Queues and Circular Queues, which adapt the basic model for specific use cases.
- A common way to build a queue is through a [[DSA - Queue Implementation with Linked Lists|queue implementation using linked lists]], which allows for dynamic resizing.

### Related Concepts 

- The core [[DSA - Enqueue Operation|enqueue operation]] is responsible for adding new elements to the tail of the queue.
- Conversely, the [[DSA - Dequeue Operation|dequeue operation]] removes elements from the head, enforcing the FIFO principle.
- In Python, queues are readily available through the [[Python - queue Module|queue module]], which provides thread-safe implementations.
- A queue's primary counterpart is the Stack, a data structure that follows a Last-In-First-Out (LIFO) principle.
## Questions

- You're designing a customer support ticketing system. When would you choose a simple FIFO queue over a priority queue to handle incoming requests, and how would you justify the potential impact on customer satisfaction for high-priority clients to stakeholders?
- Imagine you need to build a distributed task queue for a microservices architecture that must process millions of jobs per hour. How would you design the system to ensure fault tolerance and prevent a single point of failure, and what are the challenges of maintaining FIFO order across multiple consumer instances?
- What if a queue's `dequeue` operation was modified to randomly remove any element from the collection, not just the head? What existing data structure would this resemble, and could you invent a practical use case for this 'chaotic queue'?