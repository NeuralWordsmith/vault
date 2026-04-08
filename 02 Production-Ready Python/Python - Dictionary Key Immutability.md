---
tags:
  - core
  - python
  - hashable
  - immutable_keys
  - typeerror
  - dictionary_rules
  - hash_table
  - concept
source:
  - "[[Intermediate Python]]"
related:
  - "[[Python - Dictionaries]]"
  - "[[02 Production-Ready Python/Python - Mutable vs Immutable Objects]]"
  - "[[Python - Dictionary Key Uniqueness]]"
  - "[[Python - Lists]]"
  - "[[Python - Tuples]]"
  - "[[Python - Data Types]]"
  - "[[Python - Objects]]"
  - "[[Fundamental - Computer Science]]"
  - "[[Python - Dictionary Operations]]"
  - "[[Python - Adding Elements to a Dictionary]]"
  - "[[Python - Lists vs Dictionaries]]"
  - "[[Python - Sets]]"
  - "[[Python - Functions]]"
  - "[[Python - Variables]]"
---
# Core: Dictionary Keys Must Be Immutable

## Summary

>In Python, dictionary keys must be of an immutable type. This is because dictionaries are implemented as hash tables, which use a key's 'hash value'—a unique, fixed number derived from the key's content—to rapidly locate its associated value. [[02 Production-Ready Python/Python - Mutable vs Immutable Objects|Immutable objects]] like strings, numbers, and tuples have a hash value that never changes, making them perfect for this role. Mutable objects like lists can be altered after creation, which would change their hash value and break the dictionary's internal lookup system, hence they are disallowed as keys. This rule is a cornerstone for maintaining both the speed and integrity of dictionary operations.

**Why This Matters:** Requiring immutable keys ensures that a dictionary's lookup mechanism remains fast and reliable, preventing the chaos that would ensue if a key's identity could change after it was created.

_Analogy:_ _Think of a dictionary as a library's card catalog. Each book has a unique, permanent ISBN printed on its cover, which is used to create an index card. To find a book, you look up its unchanging ISBN in the catalog, which tells you exactly where to find it on the shelves. If you were allowed to use a temporary sticky note on the cover as the identifier (a mutable key), and someone changed the writing on that note, the original index card would become useless, pointing to an identifier that no longer exists. The book would be effectively lost within the library._

  - **Dictionary**: The entire card catalog system.
  - **Immutable Key**: The book's permanent, unchangeable ISBN.
  - **Value**: The book's physical location on the shelf.
  - **Invalid Mutable Key**: A temporary, editable sticky note used as an identifier.
  - **Where it breaks down:** A card catalog relies on manual, sequential lookups (e.g., alphabetical). A Python dictionary uses a highly optimized mathematical hash function for a near-instantaneous, non-sequential lookup, which is vastly more efficient.

```
Valid Immutable Key Process:
Key: "name"  ─── hash() ───> Hash Value: 519325434  ───>  Memory Slot [519325434]
                                                                      │
                                                                      ▼
                                                                  Value: "Alice"

Invalid Mutable Key Problem:
Initial Key: ["a"]  ─── hash() ───> Hash Value: 12345  ───>  Memory Slot [12345] stores Value
     │
(Key is mutated to ["a", "b"])
     │
New Key: ["a", "b"] ─── hash() ───> Hash Value: 67890  ───>  Looks in Memory Slot [67890] (Empty!)
                                                                ▲
                                                                │
                                                            LOOKUP FAILS
```

## Details

The core idea behind requiring immutable keys is to guarantee the stability of the dictionary's underlying data structure, the hash table. To store or retrieve a value, Python computes the hash of the key. This hash value directly maps to a specific 'bucket' in memory. If a key's content could change after it was inserted, its hash value would also change. When you later tried to look up that key, Python would calculate the new hash, look in a different bucket, and fail to find the value, even though it's still stored under the old hash. This would make the dictionary unreliable. This rule is what enables the remarkable O(1) average time complexity for lookups, insertions, and deletions.

#### Primary Goal

To guarantee that a key's hash value remains constant throughout its lifetime, ensuring the stability, reliability, and performance of the dictionary's internal hash table lookup mechanism.

#### Mechanism

- **How it Works (The Hashing Mechanism):**
    1. **Insertion:** When you add a key-value pair like `my_dict['name'] = 'Alice'`, Python calls the `hash()` function on the key `'name'`. This produces a consistent integer (e.g., `519325434`).
    2. **Mapping:** This hash value is used to determine a specific slot or 'bucket' in the dictionary's memory where the value `'Alice'` will be stored.
    3. **Retrieval:** When you look up `my_dict['name']`, Python re-calculates `hash('name')`, gets the same integer `519325434`, and goes directly to that memory slot to retrieve the value.
    4. **The Failure Case:** If you could use a list, `my_list = ['a']`, as a key, it would be hashed to some location. If you then modified the list to `my_list.append('b')`, its hash would change. The dictionary would now be broken; the value is still stored at the old hash location, but there's no way to calculate that old hash anymore.
- **Valid Key Types (Immutable & Hashable):**
    - *Strings:* `"hello"`
    - *Integers:* `42`
    - *Floats:* `3.14`
    - *Booleans:* `True`
    - *Tuples:* `(10, 20)` (as long as they only contain other immutable types).
- **Invalid Key Types (Mutable / Unhashable):**
    - *Lists:* `[1, 2, 3]`
    - *Dictionaries:* `{'a': 1}`
    - *Sets:* `{1, 2, 3}`

##### Code Translation

```python
# --- Step 1: Create a valid dictionary with immutable keys ---
# Strings, integers, and tuples are all immutable and therefore valid keys.
valid_dict = {
    "name": "Alice",
    404: "Not Found",
    (1920, 1080): "Full HD"
}
print(f"Valid dictionary: {valid_dict}")

# --- Step 2: Attempt to create an invalid dictionary with a mutable key ---
# A list is a mutable object.
key_list = ["a", "b"]

try:
    invalid_dict = {
        key_list: "This will fail"
    }
except TypeError as e:
    print(f"\nError caught as expected: {e}")

# --- Step 3: The common workaround --- 
# Convert the mutable list to an immutable tuple to use it as a key.
key_tuple = tuple(key_list)
workaround_dict = {
    key_tuple: "This works!"
}
print(f"Workaround using a tuple key: {workaround_dict}")
```

 [[Code - Dictionary Keys Must Be Immutable Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Constraint 1: Immutability**
    - The primary rule. The object's internal state cannot be changed after it is created. This ensures the hash value remains constant.
- **Constraint 2: Hashability**
    - The object must have a `__hash__()` method that returns an integer. This integer must be the same for the entire lifetime of the object. All of Python's built-in immutable types are hashable.

#### Core Trade-offs

- **Pro: Performance and Reliability**
    - This rule is the direct cause of a dictionary's main advantage: incredibly fast and consistent O(1) average-case time complexity for lookups, insertions, and deletions. The system is predictable and stable.
- **Con: Reduced Flexibility**
    - You cannot use naturally mutable data structures like lists as keys, even when it might seem intuitive (e.g., mapping a list of coordinates `[x, y]` to a city name).
- **Workaround: Type Conversion**
    - The standard solution is to convert the mutable type into an equivalent immutable one. For a list of coordinates, you would convert it to a tuple: `locations[(x, y)] = 'City'`. This preserves the data while satisfying the immutability requirement.

## Connections

```
                      (Parent)
                   Dictionaries
                         ▲
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                    │
(Contrasts With) ┌───────────────────────────┐ (Relies On)
      Lists      │ Dictionary Keys Must Be   │ Mutable vs Immutable
                 │        Immutable          │ Objects
                 └───────────────────────────┘
                         │
                         ▼
                   (Enables)
             Dictionary Key Uniqueness
```

### Parent Concept

This concept is a fundamental rule governing the behavior of [[Python - Dictionaries|Python dictionaries]].

### Related Concepts 

- The core reason for this rule is explained by the distinction between [[02 Production-Ready Python/Python - Mutable vs Immutable Objects|mutable and immutable objects]].
- This rule works in tandem with [[Python - Dictionary Key Uniqueness|dictionary key uniqueness]] to ensure each key provides a stable, one-of-a-kind identifier.
- This requirement is a key differentiator when comparing [[Python - Lists vs Dictionaries|lists vs. dictionaries]], as lists have no such constraint on their elements.
## Questions

- Imagine you're building a system to cache the results of complex calculations based on user-defined configuration settings, which are provided as lists of parameters. The immutability rule prevents using these lists directly as cache keys. How would you design a solution to use these configurations as keys, and how would you explain the performance benefit of this extra complexity to a project manager?
- If you were designing a distributed caching system (like Redis) that uses Python dictionaries under the hood, how does the key immutability requirement impact the serialization and network transmission of keys between different nodes? What potential bugs or inconsistencies could arise if two different nodes serialize a conceptually 'identical' but mutable object differently?
- What if Python were changed to allow mutable keys in dictionaries? Describe the cascading effects this would have on the underlying hash table implementation. What new, complex logic would need to be added to handle a key's value (and thus its hash) changing after it's been inserted, and what would be the catastrophic impact on performance?