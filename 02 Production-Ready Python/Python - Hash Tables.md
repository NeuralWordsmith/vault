---
tags: 
  - major_core
  - python
  - data_structure
  - key_value_store
  - hashing
  - associative_array
  - time_complexity
  - concept
source: 
  - "[[Data Structures and Algorithms in Python]]"
related: 
  - "[[Fundamental - Computer Science]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Hash Function]]"
  - "[[Python - Hash Collisions]]"
  - "[[Python - Hash Table Lookup]]"
  - "[[Python - Hash Tables & Dictionaries Relationship]]"
  - "[[Python - Dictionary Operations]]"
  - "[[Python - Data Types]]"
  - "[[Python - Lists]]"
  - "[[Fundamental - Programming]]"
  - "[[Python - Tuples]]"
  - "[[Python - Creating Dictionaries]]"
  - "[[Python - Accessing Dictionary Values with get()]]"
  - "[[Python - Adding and Modifying Dictionary Entries]]"
---
# Major Core: Hash Table

## Summary

> A hash table is a fundamental data structure that stores data as a collection of key-value pairs. It uses a special function, called a [[Python - Hash Function|hash function]], to compute an index into an array of slots or buckets, from which the desired value can be found. This mechanism allows for extremely fast data retrieval, insertion, and deletion. In Python, the ubiquitous dictionary type is a prime example of a [[Python - Hash Tables & Dictionaries Relationship|hash table implementation]].

**Why This Matters:** Hash tables are the engine behind near-instantaneous data lookups, making them essential for high-performance databases, caches, and the core implementation of Python's dictionaries.

_Analogy:_ _Imagine a large library where every book is assigned a unique code based on its title (e.g., using the first letter and the number of words). To find a book, you don't scan every shelf. Instead, you calculate the code for the title you want, go directly to the shelf labeled with that code, and find your book there._

In this analogy:
- **The Key:** The book's title (e.g., 'Moby Dick').
- **The Value:** The book itself.
- **The Hash Function:** The system for generating a code from the title (e.g., 'M-9').
- **The Hash Table (Array):** The entire set of shelves in the library.
- **The Slot/Bucket:** A specific shelf labeled with a code (e.g., shelf 'M-9').
- **Where it breaks down:** The analogy assumes each code points to a single book. In a real hash table, it's possible for two different keys to generate the same code, an event known as a [[Python - Hash Collisions|hash collision]], which requires a special strategy to handle.

```
"lasagna" (Key)
    │
    ▼
[ Hash Function ]  ───> e.g., hash("lasagna") % 8
    │
    ▼
   "4" (Index)
    │
    ▼
Array [ , , , , {"lasagna": $12.99}, , , ]
               ▲
               │
           (Slot with Key-Value Pair)
```

## Details

The core idea of a hash table is to pre-calculate the storage location of an item based on its key, rather than searching for it sequentially. By applying a deterministic [[Python - Hash Function|hash function]] to a key, we get an index (a hash code) that tells us exactly where in memory to store or retrieve the associated value. This direct-mapping approach is what gives hash tables their signature speed, allowing for average-case constant time, or O(1), operations.

#### Primary Goal

To provide extremely fast, average-case constant time (O(1)) performance for looking up, adding, and removing key-value pairs.

#### Mechanism

- **How it Works:**
    1.  **Hashing the Key:** When you want to add a key-value pair (e.g., `lasagna`: `$12.99`), the hash table first passes the key (`lasagna`) to a [[Python - Hash Function|hash function]].
    2.  **Computing the Index:** The hash function processes the key and returns an integer hash code. This code is then mapped to a valid index within the underlying array (often using the modulo operator).
    3.  **Storing the Value:** The value (`$12.99`) is stored at that computed index in the array, which is known as a [[Python - Hash Table Slots (Buckets)|slot or bucket]].
    4.  **Retrieval:** To retrieve the value for `lasagna`, the exact same process is followed. The key is hashed, the index is computed, and the system looks directly at that memory location to find the value, which is the essence of a [[Python - Hash Table Lookup|hash table lookup]].
- **Key Components:**
    - **Keys:** Unique identifiers for the values they are associated with. Keys must be 'hashable', meaning they must be immutable (their value cannot change over their lifetime).
        - *Example: Strings, numbers, and tuples are hashable. Lists and dictionaries are not.*
    - **Values:** The data associated with a key. Values can be of any data type and do not have any restrictions on mutability.
    - **Hash Function:** The engine of the hash table. A good hash function distributes keys evenly across the available slots to minimize [[Python - Hash Collisions|collisions]].
    - **Array (Slots/Buckets):** The underlying data structure, a contiguous block of memory, where values are actually stored.

#### Key Parameters

- **Size / Load Factor:** The ratio of stored items to the number of available slots. A low load factor reduces the chance of collisions but wastes space. A high load factor saves space but increases collisions, degrading performance towards O(n).
    - Many implementations automatically resize the underlying array when the load factor exceeds a certain threshold (e.g., 0.75).
- **Hash Function Choice:** The quality of the hash function is paramount. A poor function that clusters many keys into a few slots will create many collisions and eliminate the performance benefits of the hash table.

#### Core Trade-offs

- **Time vs. Space:** Hash tables trade memory for speed. To maintain fast O(1) lookups and minimize collisions, they often require more memory than a simple list would to store the same number of items, as many slots may remain empty.
- **Average vs. Worst-Case Performance:** While the average-case performance is an excellent O(1), the worst-case performance is O(n). This occurs when a poor hash function or bad luck causes all keys to hash to the same slot, forcing the system to search through a list of all items.
- **Unordered:** Standard hash tables do not preserve the insertion order of elements. Accessing items is done by key, not by position. (Note: Since Python 3.7, standard dictionaries are ordered, but this is an implementation detail, not a general property of hash tables).

## Connections

```
                      (Parent)
              Fundamental - Computer Science
                           ▲
                           |
           ┌───────────────┼────────────────────────────┐
           |               |                            |
(Implementation)  ┌───────────────────────────┐     (Component)
  Dictionaries    |        Hash Table         |     Hash Function
                  └───────────────────────────┘
                           |
                           ▼
                      (Problem)
                    Hash Collisions
```

### Parent Concept

The hash table is a foundational concept within [[Fundamental - Computer Science|computer science]], serving as a primary example of a key-value data structure.

### Related Concepts 

- The [[Python - Dictionaries|Python dictionary]] is the most common and direct implementation of the hash table concept in the Python language.
- The performance of a hash table is critically dependent on its [[Python - Hash Function|hash function]], which is responsible for mapping keys to array indices.
- A significant challenge in hash table design is handling [[Python - Hash Collisions|hash collisions]], which occur when two different keys map to the same index.
- Understanding the [[Python - Hash Tables & Dictionaries Relationship|relationship between hash tables and dictionaries]] clarifies how this theoretical data structure is put into practice.
- The process of finding a value is known as a [[Python - Hash Table Lookup|hash table lookup]], which leverages the hash function to achieve near-instantaneous retrieval.
## Questions

- You're designing a caching system for user profile data, where the key is a user ID. Would you choose a hash function optimized for speed or one optimized for uniform distribution, and how would you justify the potential business impact of that trade-off (e.g., latency vs. memory cost)?
- Imagine a hash table powering a real-time bidding system that receives millions of writes per second. How would you design the resizing mechanism to avoid 'stop-the-world' pauses that could cause the system to miss bidding deadlines?
- What if you were forced to build a key-value store using only a sorted array? How would you implement the `get`, `set`, and `delete` operations, and what would their time complexity be compared to a hash table?
