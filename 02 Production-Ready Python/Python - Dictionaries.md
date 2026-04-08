---
tags: 
  - major_core
  - python
  - key_value_pair
  - hash_map
  - mutable
  - data_structure
  - associative_array
  - concept
source: 
  - "[[Intermediate Python]]"
related: 
  - "[[Python - Data Types]]"
  - "[[Python - Lists]]"
  - "[[Python - Parallel Lists vs Dictionaries]]"
  - "[[Python - Dictionary Syntax and Creation]]"
  - "[[Python - Accessing Dictionary Values using Keys]]"
  - "[[Python - Dictionary Key-Value Lookup Efficiency]]"
  - "[[Python - Variables]]"
  - "[[Python - Objects]]"
  - "[[Python - Functions]]"
  - "[[Python - List Subsetting]]"
  - "[[Fundamental - Programming]]"
  - "[[Fundamental - Computer Science]]"
  - "[[Python - NumPy (Numeric Python)]]"
---
# Major Core: Dictionaries

## Summary

> A dictionary is a fundamental Python data structure that stores data as a collection of key-value pairs. Unlike lists which are indexed by a range of numbers, dictionaries are indexed by unique 'keys', which can be strings, numbers, or other immutable types. This structure is incredibly powerful for associating related pieces of information, such as linking a country name to its capital, and provides a much more intuitive alternative to managing [[Python - Parallel Lists vs Dictionaries|parallel lists]]. The process of creating a dictionary is covered in [[Python - Dictionary Syntax and Creation|dictionary syntax and creation]].

**Why This Matters:** Dictionaries are the cornerstone of efficient data handling in Python, allowing for instant retrieval of information using custom labels instead of numeric indices.

_Analogy:_ _Think of a Python dictionary like a real-world physical dictionary. Each word you look up (the 'key') is unique, and it points directly to its definition (the 'value'). You don't have to scan the entire book from the beginning; you just flip to the page for that specific word to get the information you need instantly._

**The Word**: This is the `key` in the Python dictionary. It's the unique identifier you use for lookup.
**The Definition**: This is the `value` associated with the key. It's the data you want to retrieve.
**The Dictionary Itself**: This represents the entire dictionary object in Python, holding all the key-value pairs.

**Where it breaks down**: In modern Python dictionaries (3.7+), the order of items is preserved, whereas a physical dictionary is always alphabetically ordered. Also, in a Python dictionary, you can change a value (the 'definition') after it's been created, which you can't do with a printed book.

```
A Dictionary: { key : value }

  Key         Value
┌─────────┐    ┌──────────────┐
│ "name"  │───►│ "Alice"      │
└─────────┘    └──────────────┘
┌─────────┐    ┌──────────────┐
│ "age"   │───►│ 30           │
└─────────┘    └──────────────┘
┌─────────┐    ┌──────────────┐
│ "city"  │───►│ "New York"   │
└─────────┘    └──────────────┘
```

## Details

Dictionaries are one of Python's most versatile and essential built-in data types, belonging to the category of 'mapping' types. Their core idea is to store an unordered (historically) collection of items, where each item is a pair consisting of a unique, immutable key and its corresponding value. This key-value structure allows for highly optimized data retrieval, making them a go-to choice in the data world for everything from configuration files to representing structured records like a row from a database. Instead of accessing data by its position like in a list, you access it by a meaningful name, which is detailed in [[Python - Accessing Dictionary Values using Keys|accessing dictionary values]].

#### Primary Goal

To provide a way to store and retrieve data based on a meaningful, unique identifier (a key) rather than a numerical position (an index).

#### Mechanism

- **How it Works:** A dictionary is fundamentally a hash map or hash table.
    1. **Key Hashing:** When you add a key-value pair, Python runs the key through a 'hashing function'. This function converts the key (e.g., the string 'name') into a unique integer, the 'hash'.
    2. **Memory Storage:** This hash is then used to calculate an index in a block of memory where the key and its associated value will be stored.
    3. **Value Retrieval:** When you want to retrieve a value using its key, Python re-runs the same hashing function on the key, calculates the same memory index, and instantly retrieves the value stored there. This process is what makes [[Python - Dictionary Key-Value Lookup Efficiency|dictionary lookups incredibly fast]], regardless of the dictionary's size.

```python
# --- Step 1: Create a dictionary ---
# A dictionary is created using curly braces {} with key:value pairs.
# Here, we represent population data for different countries.
country_populations = {
    "China": 1444216107,
    "India": 1393409038,
    "United States": 332915073
}
print(f"Initial Dictionary: {country_populations}")

# --- Step 2: Access a value using its key ---
# We use square bracket notation with the key to look up the value.
us_population = country_populations["United States"]
print(f"Population of the United States: {us_population}")

# --- Step 3: Add a new key-value pair ---
country_populations["Indonesia"] = 276361783
print(f"Dictionary after adding Indonesia: {country_populations}")

# --- Step 4: Modify an existing value ---
# Simply assign a new value to an existing key.
country_populations["India"] = 1400000000 # Updated population
print(f"Dictionary after updating India: {country_populations}")
```

 [[Code - Dictionaries Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Key Constraints:** The 'parameters' that define a dictionary's structure are its keys and values, which have specific rules.
    - **Uniqueness:** Every key in a dictionary must be unique. If you assign a value to an existing key, it will overwrite the original value.
    - **Immutability:** Keys must be of an immutable type. This is because Python needs to be able to calculate a consistent hash value for the key.
        - *Allowed Key Types:* `strings`, `numbers` (int, float), `tuples`.
        - *Disallowed Key Types:* `lists`, `dictionaries`, other `mutable` types.

#### Core Trade-offs

- **Pro: Fast Lookups:**
    - Retrieving a value by its key is extremely fast, typically an O(1) operation. This efficiency is a major advantage over lists, where you might have to search the entire list (O(n)) to find an item.
- **Con: Higher Memory Usage:**
    - The underlying hash table mechanism that makes lookups fast requires more memory than a simple list to store the same number of elements.
- **Con: Key Constraints:**
    - The requirement for keys to be unique and immutable can be restrictive in some use cases.
- **Neutral: Ordering:**
    - In Python versions before 3.7, dictionaries were unordered. Now, they preserve insertion order, which is a significant benefit, but code should not rely on this if it needs to be compatible with older Python versions.

## Connections

```
                  (Parent)
              Python - Data Types
                       ▲
                       │
       ┌───────────────┼────────────────────────────┐
       │               │                            │
(Contrasts With)  ┌──────────────────┐         (Aspect Of)
Parallel Lists    │   Dictionaries   │   Key-Value Lookup Efficiency
                  └──────────────────┘
                       │
              ┌────────┴──────────┐
              │                     │
  Syntax & Creation      Accessing Values
```

### Parent Concept

Dictionaries are a fundamental mapping type within the broader category of [[Python - Data Types|Python - Data Types]].

### Child Concepts

- The basic [[Python - Dictionary Syntax and Creation|syntax for creating dictionaries]] involves using curly braces `{}` and colons `:` to separate keys and values.
- Once created, [[Python - Accessing Dictionary Values using Keys|accessing dictionary values]] is done efficiently using square bracket notation with the key.
- The reason for this speed is due to the underlying hash map, which results in highly efficient [[Python - Dictionary Key-Value Lookup Efficiency|key-value lookup performance]].

### Related Concepts 

- The use of dictionaries is a more robust and readable alternative that [[Python - Parallel Lists vs Dictionaries|contrasts with using parallel lists]] to store related information.
- While dictionaries map keys to values, [[Python - Lists|Python - Lists]] are an ordered sequence of elements accessed by a numeric index.
- Dictionaries are a core component of the [[Python - NumPy (Numeric Python)|NumPy]] library's structured arrays and are used extensively in libraries like Pandas to create DataFrames.
## Questions

- For representing a collection of user profiles, you could use a list of dictionaries or a list of custom class objects. What are the trade-offs between these two approaches in terms of memory usage, code readability, and ease of adding new behaviors (methods) to the profiles?
- Imagine you are building a real-time analytics system that counts word frequencies from a massive, continuous stream of text data. A single Python dictionary in memory would eventually overflow. How would you design a system to handle this, and what technologies (like Redis, Kafka, or distributed databases) might you use to manage the key-value store at scale?
- What if Python dictionaries allowed for duplicate keys? What would be the implications for data retrieval? What existing data structure does this 'multi-value dictionary' resemble, and what new kinds of problems could it solve more elegantly than current structures?
