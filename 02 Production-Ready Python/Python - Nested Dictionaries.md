---
tags:
  - core
  - python
  - nested_data
  - hierarchical_data
  - data_structures
  - json
  - dictionary_in_dictionary
  - concept
source:
  - "[[Data Structures and Algorithms in Python]]"
related:
  - "[[Python - Dictionaries]]"
  - "[[Python - Dictionary Operations]]"
  - "[[Python - Creating Dictionaries]]"
  - "[[Python - Accessing Dictionary Values with get()]]"
  - "[[Python - Iterating Over Dictionaries 1]]"
  - "[[Python - Dictionary .items() Method]]"
  - "[[Python - Dictionary .keys() Method]]"
  - "[[Python - Dictionary .values() Method]]"
  - "[[Python - Adding and Modifying Dictionary Entries]]"
  - "[[Python - Lists]]"
  - "[[Python - Tuples]]"
  - "[[Python - Data Types]]"
  - "[[Python - Hash Tables]]"
  - "[[Python - Hash Tables & Dictionaries Relationship]]"
---
# Core: Nested Dictionaries

## Summary

>A nested dictionary is a dictionary where one or more of its values is another dictionary. This 'dictionary within a dictionary' structure allows for the creation of multi-level, hierarchical data representations.

**Why This Matters:** Nested dictionaries are fundamental for representing and manipulating complex, hierarchical data structures, such as those found in JSON files and API responses, in an intuitive way.

_Analogy:_ _Think of a nested dictionary as a filing cabinet. The main cabinet is the outer dictionary. Each drawer is a key in that cabinet. When you open a drawer, you don't find a single document, but a set of labeled file folders. Each file folder is a key in the inner dictionary, and inside each folder is the final piece of information (the value)._

**Where it breaks down:** A physical filing cabinet has a fixed structure, whereas a nested dictionary is highly dynamic. You can add, remove, or change the 'drawers' (outer keys) and 'folders' (inner keys) programmatically at any time.

```
my_menu (dict)
   │
   ├── 'sushi' (key) ───> { (dict)
   │                        ├── 'price': 19.25
   │                        └── 'best_served': 'cold'
   │
   └── 'paella' (key) ──> { (dict)
                            ├── 'price': 15
                            └── 'best_served': 'hot'
```

## Details

In Python, dictionaries store data in key-value pairs. The power of this structure is amplified when a value itself is another dictionary. This concept, known as a nested dictionary, is essential for modeling real-world data that has inherent structure or hierarchy. For instance, as shown in the `my_menu` example, a dish (the outer key) has multiple attributes like 'price' and 'best_served' (the inner keys), which can be neatly organized in a dictionary associated with that dish. This is a common pattern for working with data from sources like JSON APIs.

#### Primary Goal

To model and store hierarchical or multi-level data relationships within a single Python object, mirroring real-world structured information.

#### Mechanism

- **Step 1: Define the Outer Dictionary**
    - Start by creating the main dictionary that will hold the nested structures. The keys of this dictionary will represent the top-level entities (e.g., 'sushi', 'paella').
- **Step 2: Assign Inner Dictionaries as Values**
    - For each key in the outer dictionary, the corresponding value will be another complete dictionary. This inner dictionary holds the specific attributes of the top-level entity (e.g., {'price': 19.25, 'best_served': 'cold'}).
- **Step 3: Access Nested Data**
    - To retrieve a value from an inner dictionary, you use a chain of square bracket lookups. The first key selects the inner dictionary, and the second key selects the specific value within it.

##### Code Translation

```python
# --- Step 1 & 2: Define the outer dictionary with inner dictionaries as values ---
my_menu = {
    'sushi': {
        'price': 19.25,
        'best_served': 'cold'
    },
    'paella': {
        'price': 15,
        'best_served': 'hot'
    }
}

# --- Step 3: Access nested data ---
# Get the price of sushi
sushi_price = my_menu['sushi']['price']
print(f"The price of sushi is: {sushi_price}") # Output: The price of sushi is: 19.25

# Get the serving preference for paella
paella_preference = my_menu['paella']['best_served']
print(f"Paella is best served: {paella_preference}") # Output: Paella is best served: hot
```

 [[Code - Nested Dictionaries Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Key Selection**
    - The primary 'levers' are the keys you choose at each level of nesting. Keys must be of an immutable type (like strings, numbers, or tuples) and should be descriptive to maintain readability.
- **Nesting Depth**
    - You can nest dictionaries to any depth, but deeper nesting (e.g., more than 2-3 levels) can make the code harder to read and debug. It's a trade-off between accurately modeling the data's hierarchy and maintaining code simplicity.

#### Core Trade-offs

- **Pro: Intuitive Data Representation**
    - Nested dictionaries provide a very natural and readable way to represent hierarchical data, such as JSON objects, configuration files, or complex entities from a database.
- **Pro: Flexibility**
    - The structure is dynamic. New keys and even new levels of nesting can be added or removed on the fly, making it adaptable to changing data schemas.
- **Con: Verbose Access**
    - Accessing deeply nested values requires chaining multiple keys (e.g., `data['level1']['level2']['level3']`), which can become cumbersome and lead to long, unreadable lines of code.
- **Con: Error-Prone Lookups**
    - A `KeyError` will be raised if any key in the access chain does not exist. This can be mitigated by using the `[[Python - Accessing Dictionary Values with get()|.get()]]` method at each level, but that adds even more verbosity.

## Connections

```
                  (Parent)
                Dictionaries
                     ▲
                     │
┌────────────────────┼────────────────────┐
│                    │                    │
(Related)      ┌───────────────────────┐      (Related)
Dictionary     │  Nested Dictionaries  │      Iterating Over
Operations     └───────────────────────┘      Dictionaries
```

### Parent Concept

The concept of nested dictionaries is built directly upon the fundamental [[Python - Dictionaries|dictionary]] data structure.

### Child Concepts



### Related Concepts 

- Effectively working with nested dictionaries often involves standard [[Python - Dictionary Operations|dictionary operations]] applied at different levels of the structure.
- When a key might be missing at a certain level, [[Python - Accessing Dictionary Values with get()|accessing values with the .get() method]] becomes a crucial technique to avoid `KeyError` exceptions.
- The process of [[Python - Iterating Over Dictionaries 1|iterating over dictionaries]] can be extended with nested loops to traverse and process all the data within a nested structure.
- The ability to nest dictionaries is a key reason why they are so effective for representing data formats like JSON, which is fundamentally hierarchical.
## Questions

- Imagine you're parsing a complex JSON API response for an e-commerce site. How would you decide between using deeply nested dictionaries versus creating custom class objects to represent the data? What are the long-term maintainability and performance trade-offs of each approach?
- If you have a massive, deeply nested dictionary loaded into memory (e.g., a configuration file for a large application), what are the potential performance bottlenecks when frequently accessing or modifying values deep within the structure? How might you design a caching strategy to mitigate this?
- What if Python dictionaries didn't support nesting? How would you model the `my_menu` data structure using only 'flat' data structures like lists and tuples, and what would be the major drawbacks of your alternative design?