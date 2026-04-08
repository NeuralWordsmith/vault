---
tags: 
  - core
  - python
  - collision_resolution
  - separate_chaining
  - open_addressing
  - load_factor
  - probing
  - concept
source: 
  - "[[Data Structures and Algorithms in Python]]"
related: 
  - "[[Python - Hash Tables]]"
  - "[[Python - Hash Function]]"
  - "[[Python - Hash Table Slots (Buckets)]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Hash Tables & Dictionaries Relationship]]"
  - "[[Fundamental - Computer Science]]"
  - "[[Python - Hash Table Lookup]]"
  - "[[Python - Separate Chaining]]"
  - "[[Python - Open Addressing]]"
  - "[[Python - Linear Probing]]"
  - "[[Python - Quadratic Probing]]"
  - "[[Python - Double Hashing]]"
  - "[[Fundamental - Data Structures]]"
  - "[[Python - Time Complexity]]"
  - "[[Python - Space Complexity]]"
---
# Core: Hash Table Collisions

## Summary

>A hash table collision occurs when a [[Python - Hash Function|hash function]] generates the same index (or [[Python - Hash Table Slots (Buckets)|slot]]) for two or more different keys. This is a natural consequence of mapping a large universe of possible keys to a smaller, finite number of slots.

**Why This Matters:** Collisions are an unavoidable aspect of hash tables, and the strategy used to resolve them directly determines the data structure's performance and efficiency.

_Analogy:_ _Imagine a hotel with a limited number of rooms (the slots). The hotel's receptionist (the hash function) assigns each guest (the key) a room number based on their last name. A collision happens when two guests with different last names, say Mr. Smith and Mr. Goldsmith, are both assigned to Room 101. The hotel needs a policy (a collision resolution strategy) to handle this, like asking Mr. Goldsmith to wait in the lobby (probing) or putting a second bed in Room 101 (chaining)._

**Where it breaks down:** In a hotel, the receptionist can use judgment or look at a list of all rooms. A hash function is deterministic and has no memory; it will *always* assign "Smith" and "Goldsmith" to the same room number without knowing it's already occupied. The resolution is a pre-defined algorithm, not a conscious decision.

```
Key 1: "lasagna"  ───► hash() ───► Index 5
Key 2: "moussaka" ───► hash() ───► Index 1
Key 3: "pastitsio"───► hash() ───► Index 1  ◄── COLLISION!

Hash Table:
[   ] [ Slot 1 ] [   ] [   ] [   ] [ Slot 5 ]
         │                          │
         └─ "moussaka" value         └─ "lasagna" value

Attempt to insert "pastitsio":
- Hashes to Index 1.
- Slot 1 is already occupied.
- A resolution strategy is now required.
```

## Details

In the world of [[Python - Hash Tables|hash tables]], a collision is an inevitable event that happens when the [[Python - Hash Function|hash function]] maps two distinct keys to the same [[Python - Hash Table Slots (Buckets)|slot]]. As shown in the example, if `hash("moussaka")` returns `1` and slot `1` is already occupied, we have a collision. This isn't a failure of the hash function but a mathematical certainty known as the Pigeonhole Principle: if you have more items (keys) than containers (slots), at least one container must hold more than one item. Therefore, every practical hash table implementation must have a robust strategy for resolving these collisions. The two primary families of resolution techniques are **Separate Chaining** and **Open Addressing**.

#### Primary Goal

The primary goal of collision resolution is to ensure that all key-value pairs can be stored and retrieved correctly and efficiently, even when multiple keys map to the same initial slot.

#### Mechanism

- **How a Collision Occurs:**
    1. A new key-value pair needs to be inserted into the [[Python - Hash Tables|hash table]].
    2. The key is passed to the [[Python - Hash Function|hash function]], which computes an index (e.g., `hash("moussaka") -> 1`).
    3. The algorithm attempts to place the value in the corresponding [[Python - Hash Table Slots (Buckets)|slot]] at that index.
    4. If the slot is already occupied by a different key's value, a collision has occurred.
- **Collision Resolution Strategy 1: Separate Chaining**
    - Each slot in the hash table doesn't hold a single value, but rather a pointer to another data structure, typically a linked list.
    - *Example:* When "moussaka" hashes to slot 1, which is already occupied, its key-value pair is simply added as a new node to the linked list at that slot.
- **Collision Resolution Strategy 2: Open Addressing (Probing)**
    - All key-value pairs are stored within the table array itself. When a collision occurs, the algorithm "probes" or searches for the next available empty slot according to a fixed sequence.
    - *Example:* If "moussaka" hashes to slot 1 and it's full, the algorithm might check slot 2, then slot 3, and so on, until an empty slot is found. This specific method is called *linear probing*.

##### Code Translation

nothing to fill here

 [[Code - Hash Table Collisions Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Load Factor ($\alpha$)**
    - The ratio of the number of stored items to the number of slots in the table. A higher load factor increases the probability of collisions, making the choice of resolution strategy more critical. Keeping $\alpha$ low (e.g., below 0.7) is a key parameter for managing performance.
- **Hash Function Quality**
    - A good hash function distributes keys uniformly across the slots, minimizing the initial number of collisions. A poor function can lead to "clustering," where many keys map to the same few slots, degrading performance significantly.

#### Core Trade-offs

- **Separate Chaining**
    - *Pro:* Simple to implement and performance degrades gracefully as the load factor increases.
    - *Con:* Requires extra memory outside the table for the linked lists, which can lead to poor cache performance due to scattered memory locations.
- **Open Addressing**
    - *Pro:* More memory-efficient as everything is stored in the array, leading to better cache performance.
    - *Con:* More complex to implement (especially deletion) and performance can degrade sharply as the table gets full. It's also susceptible to clustering issues.

## Connections

```
                  (Parent)
                Hash Tables
                     ▲
                     │
┌────────────────────┼────────────────────┐
│                    │                    │
(Causes)        ┌───────────────────────────┐      (Impacts)
Hash Function   │  Hash Table Collisions    │      Dictionaries
                └───────────────────────────┘
                           │
                ┌──────────┴──────────┐
                │                     │
        (Resolution Technique) (Resolution Technique)
         Separate Chaining      Open Addressing
```

### Parent Concept

This concept is a fundamental problem that must be addressed within the design of [[Python - Hash Tables|hash tables]].

### Child Concepts

- A primary resolution technique is [[Python - Separate Chaining|separate chaining]], where each slot acts as the head of a linked list to store colliding elements.
- An alternative family of techniques is [[Python - Open Addressing|open addressing]], which finds the next empty slot within the table itself when a collision occurs.

### Related Concepts 

- The likelihood of a collision is directly influenced by the quality of the [[Python - Hash Function|hash function]], which is responsible for distributing keys.
- Collisions occur when multiple keys map to the same [[Python - Hash Table Slots (Buckets)|hash table slot]].
- Understanding collisions is essential for appreciating the performance characteristics of Python's built-in [[Python - Dictionaries|dictionaries]], which are implemented using hash tables.
## Questions

- You're designing a system for real-time ad bidding where lookup speed is paramount. Would you favor a hash table using separate chaining or open addressing, assuming memory is not a major constraint? How would you justify the potential performance trade-offs to the product manager in terms of latency and system throughput?
- Imagine a distributed hash table (like a key-value store) running across multiple servers. How does the problem of hash collisions manifest differently in this environment, and what new system-level challenges arise when you need to resolve a collision that involves data on two different machines?
- What if you could design a 'perfect' hash function that guarantees zero collisions for a known, fixed set of keys. How would this change the implementation of a hash table, and what new limitations or constraints would this 'perfect' system introduce?