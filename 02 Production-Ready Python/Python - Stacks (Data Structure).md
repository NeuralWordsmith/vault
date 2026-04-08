---
tags: 
  - major_core
  - python
  - lifo
  - data_structure
  - abstract_data_type
  - push
  - pop
  - concept
source: 
  - "[[Data Structures and Algorithms in Python]]"
related: 
  - "[[Python - LIFO (Last-In-First-Out) Principle]]"
  - "[[Python - Stack Push Operation]]"
  - "[[Python - Stack Pop Operation]]"
  - "[[Python - Stack Peek Operation]]"
  - "[[Python - Stack Use Cases]]"
  - "[[Python - Stacks & Singly Linked Lists Relationship]]"
  - "[[Python - Implementing a Stack with a Linked List]]"
  - "[[Python - LifoQueue Class]]"
  - "[[Fundamental - Computer Science]]"
  - "[[Python - Lists]]"
  - "[[Python - Functions]]"
  - "[[Fundamental - Programming]]"
  - "[[Python - Class Definition]]"
---
# Major Core: Stacks

## Summary

> A stack is an abstract data structure that serves as a collection of elements, governed by the [[Python - LIFO (Last-In-First-Out) Principle|LIFO (Last-In-First-Out) principle]]. This means the last element added to the collection will be the first one to be removed. All additions and removals happen at a single end, referred to as the "top" of the stack.

**Why This Matters:** Stacks are a fundamental data structure essential for managing program execution (call stacks), parsing expressions, and implementing features like undo/redo in applications.

_Analogy:_ _Imagine a stack of physical books on a desk. You can only add a new book by placing it on top of the pile. To get to a book lower down, you must first remove all the books placed on top of it. The last book you put on the stack is always the first one you take off._

**Where it breaks down:** Unlike a physical stack of books where you could technically cheat and pull one from the middle, a true stack data structure strictly forbids this. Access is only ever granted to the single, topmost item. Also, computer-based stacks can have a predefined maximum capacity, which isn't a typical constraint for a pile of books.

```
Initial State:      Push('A'):          Push('B'):          Pop() -> 'B':       Pop() -> 'A':
[ ] (empty)         [ A ] <-- TOP       [ B ] <-- TOP       [ A ] <-- TOP       [ ] (empty)
                    [   ]               [ A ]               [   ]               [   ]
                    [   ]               [   ]               [   ]               [   ]
```

## Details

Stacks are a foundational concept in computer science, representing a linear data structure that restricts data access to one end, known as the "top". The core behavior is defined by the [[Python - LIFO (Last-In-First-Out) Principle|LIFO (Last-In-First-Out)]] ordering. This simple but powerful constraint makes stacks incredibly efficient for specific tasks. The primary operations that define a stack are **push** (adding an element to the top), **pop** (removing the element from the top), and **peek** (viewing the top element without removing it).

#### Primary Goal

To enforce a strict, sequential processing order where the most recently added item is the first one to be processed.

#### Mechanism

- **How it Works:**
    - A stack maintains a pointer to the "top" of the collection, which is the only point of interaction.
    - When a new element is added, it is placed at the top, and the top pointer is updated to this new element.
    - When an element is removed, the element at the top is taken, and the top pointer moves to the next element down.
- **[[Python - Stack Push Operation|Push Operation]]:**
    - This operation adds a new item to the top of the stack.
    - *Example: Placing the book '1984' on top of the existing stack of books.*
- **[[Python - Stack Pop Operation|Pop Operation]]:**
    - This operation removes the topmost item from the stack and returns it.
    - *Example: Taking the book '1984' off the top of the stack to read it.*
- **[[Python - Stack Peek Operation|Peek (or Top) Operation]]:**
    - This operation allows you to view the topmost item without removing it from the stack.
    - *Example: Reading the title of the top book, '1984', without actually picking it up.*

nothing to fill here

 [[Code - Stacks Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Underlying Data Structure:**
    - The choice of how to implement the stack affects performance. Common choices include dynamic arrays (like Python's list) or exploring the [[Python - Stacks & Singly Linked Lists Relationship|relationship with singly linked lists]].
    - Arrays offer better memory locality but can require resizing, while linked lists offer constant-time insertions/deletions but have higher memory overhead per element.
- **Capacity:**
    - A stack can be bounded (fixed-size) or unbounded (dynamically resizing). A bounded stack can lead to a 'stack overflow' error if an item is pushed when it's full.

#### Core Trade-offs

- **Pro: Speed and Simplicity:**
    - The core operations (push, pop, peek) are extremely fast, typically having a time complexity of O(1). The logic is simple to implement and understand.
- **Con: Restricted Access:**
    - You cannot access, search for, or remove elements from the middle or bottom of the stack without first popping all the elements above them. This makes stacks unsuitable for tasks requiring random access or searching.

## Connections

```
                      (Parent)
              Fundamental - Computer Science
                           ▲
                           │
           ┌───────────────┼────────────────────────────┐
           │               │                            │
(Implementation)  ┌───────────────────────────┐      (Principle)
Linked Lists      │          Stacks           │      LIFO
                  └───────────────────────────┘
                           │
                           │
                      (Use Cases)
                           │
                  ┌────────┴──────────┐
                  │                     │
             Call Stack           Undo/Redo
```

### Parent Concept

Stacks are a fundamental abstract data type within the broader field of [[Fundamental - Computer Science]].

### Child Concepts



### Related Concepts 

- The behavior of a stack is defined by the [[Python - LIFO (Last-In-First-Out) Principle|LIFO principle]], which dictates that the last item in is the first item out.
- A common way to build a stack is detailed in the [[Python - Stacks & Singly Linked Lists Relationship|relationship between stacks and singly linked lists]], where the head of the list acts as the top of the stack.
- Stacks are often contrasted with Queues, which follow a First-In-First-Out (FIFO) principle.
## Questions

- Your application's 'undo' feature is implemented with a stack and is causing high memory usage for power users who perform thousands of actions. How would you propose modifying the stack implementation to set a memory/action limit, and what's the business trade-off you'd present to the product manager regarding this limitation?
- Imagine you are designing a system for parsing and evaluating complex mathematical expressions (like `(5 * (3 + 2)) / 4`). How would you use two stacks (one for numbers, one for operators) to manage the order of operations, and what is the primary failure mode you would need to monitor in a production environment?
- What if you were required to implement a 'min' function for a stack that returns the smallest element in O(1) time, just like push and pop? How would you augment the standard stack structure to achieve this without sacrificing the performance of the other core operations?
