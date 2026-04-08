---
tags: 
  - core
  - python
  - nested_dictionary
  - data_structure
  - hierarchy
  - json
  - grouping
  - concept
source: 
  - "[[Data Types in Python]]"
related: 
  - "[[Python - Dictionaries]]"
  - "[[Python - Dictionary Operations]]"
  - "[[Python - Accessing Nested Dictionary Values]]"
  - "[[Python - Use Cases for Nested Dictionaries]]"
  - "[[Python - Data Types]]"
  - "[[Python - Lists]]"
  - "[[Python - Tuples]]"
  - "[[Python - Looping Over Data Structures]]"
  - "[[Python - List Comprehensions]]"
  - "[[Python - JSON]]"
  - "[[DSA - Data Structures & Algorithms]]"
  - "[[Python - Objects]]"
---
# Core: Nested Dictionaries

## Summary

>A nested dictionary is a dictionary where the value associated with a key is another dictionary. This 'dictionary-within-a-dictionary' structure allows for the creation of multi-level, hierarchical data models, which is fundamental for managing grouped or related data.

**Why This Matters:** Nested dictionaries are crucial for representing and manipulating complex, hierarchical data structures, such as those found in JSON APIs, configuration files, and relational datasets.

_Analogy:_ _Think of a nested dictionary as a filing cabinet. The entire cabinet is the outer dictionary. Each drawer is labeled with a key (like a zip code '10027'). When you open a drawer, you don't find a single document; you find a set of labeled folders, which represents the inner dictionary. Each folder (the inner key, like 'Paige's Art Gallery') contains a specific document (the final value, like a phone number)._

**Where it breaks down:** A physical filing cabinet requires you to manually search through drawers and folders. In Python, accessing a nested value is instantaneous if you know the exact 'path' of keys. Also, unlike physical files, you can store any type of data as the final value, not just documents.

```
art_galleries (dict)
      │
      ├── '10021' (key) ───> { (value is another dict)
      │                      ├── 'Agora Gallery': '(212) 226-4151'
      │                      └── 'David Zwirner Gallery': '(212) 727-2070'
      │
      ├── '10027' (key) ───> { (value is another dict)
      │                      ├── "Paige's Art Gallery": '(212) 531-1577'
      │                      └── 'Triple Candie': '(212) 865-0783'
      │                      └── ...
      │
      └── '10013' (key) ───> { (value is another dict)
                             └── 'Postmasters': '(212) 727-3323'
```

## Details

As the context shows with the art gallery example, you can go beyond simple key-value pairs by nesting dictionaries to group data or establish a hierarchy. Instead of a flat list of galleries, the data is reorganized to be keyed first by zip code. The value for each zip code is *another dictionary* containing the galleries in that area. This is a powerful technique in Python for modeling structured, real-world information that has multiple levels of organization. Understanding this structure is the first step before learning about the various [[Python - Use Cases for Nested Dictionaries|use cases for nested dictionaries]] or the methods for [[Python - Accessing Nested Dictionary Values|accessing their values]].

#### Primary Goal

To represent and manage data with inherent hierarchical relationships, such as groupings, categories, or parent-child connections, within a single Python object.

#### Mechanism

- **Step 1: Define the Outer Dictionary Structure**
    - Begin by creating the main dictionary. The keys of this dictionary will represent the highest level of your hierarchy (e.g., zip codes).
- **Step 2: Create the Inner Dictionaries**
    - For each key in the outer dictionary, the corresponding value will be another complete dictionary. These inner dictionaries contain the next level of data (e.g., gallery names and their phone numbers).
- **Step 3: Combine into a Single Nested Structure**
    - Assign the inner dictionaries as values to the keys of the outer dictionary. The result is a single, multi-level dictionary object.

##### Code Translation

```python
# --- Steps 1, 2, and 3: Define and combine the dictionaries ---
# This structure groups art galleries by their zip code.
art_galleries = {
    '10021': {
        'Agora Gallery': '(212) 226-4151',
        'David Zwirner Gallery': '(212) 727-2070'
    },
    '10027': {
        "Paige's Art Gallery": '(212) 531-1577',
        'Triple Candie': '(212) 865-0783',
        'Africart Motherland Inc': '(212) 368-6802',
        'Inner City Art Gallery Inc': '(212) 368-4941'
    },
    '10013': {
        'Postmasters': '(212) 727-3323'
    }
}

# --- Example Usage ---
# Get all the top-level keys (zip codes)
print(art_galleries.keys())
# dict_keys(['10021', '10027', '10013'])

# Access the inner dictionary for a specific zip code
print(art_galleries['10027'])
# {'Paige\'s Art Gallery': '(212) 531-1577', 'Triple Candie': '(212) 865-0783', ...}
```

 [[Code - Nested Dictionaries Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Structure and Depth**
    - The primary 'parameter' is the structure itself, which is defined by the programmer. The choice of keys and the depth of nesting depend entirely on the hierarchy of the data being modeled. There are no built-in limits to the depth of nesting.

#### Core Trade-offs

- **Pro: Intuitive Data Modeling**
    - Nested dictionaries provide a very natural and readable way to represent hierarchical data, closely mirroring formats like JSON.
- **Pro: Grouping and Scoping**
    - They allow data to be logically grouped, making it easy to work with subsets of the data (e.g., process all galleries within a single zip code).
- **Con: Access Complexity**
    - Retrieving deeply nested values requires chaining multiple keys, which can become cumbersome and error-prone. This complexity is explored further in [[Python - Accessing Nested Dictionary Values|accessing nested dictionary values]].
- **Con: Readability at Scale**
    - For very deep or complex hierarchies, the literal definition of a nested dictionary in code can become difficult to read and maintain compared to using custom classes.

## Connections

```
             (Parent)
          Dictionaries
                 ▲
                 │
┌────────────────┼────────────────┐
│                │                │
(Related) ┌──────────────┐ (Related)
JSON      │   Nested     │ Dictionary
          │ Dictionaries │ Operations
          └──────────────┘
                 │
                 ▼
      (Explores How to Use)
Accessing Nested Dictionary Values
```

### Parent Concept

The concept is a direct extension of [[Python - Dictionaries|Python's dictionary data structure]], applying its key-value principle recursively.

### Child Concepts



### Related Concepts 

- The practical applications of this structure are detailed in [[Python - Use Cases for Nested Dictionaries|use cases for nested dictionaries]].
- The specific techniques for retrieving data from these structures are covered in [[Python - Accessing Nested Dictionary Values|accessing nested dictionary values]].
- The standard [[Python - Dictionary Operations|dictionary operations]] can be applied at each level of a nested dictionary.
- This structure is conceptually similar to how data is organized in JSON files, making it a key tool for API interactions.
- It contrasts with flat data structures like [[Python - Lists|lists]] or simple dictionaries, which do not have a built-in hierarchy.
## Questions

- Imagine you're receiving deeply nested JSON data from an API. At what point does parsing it into a nested dictionary become less efficient than creating custom Python classes to represent the data structure? How would you justify the added complexity of classes to your team?
- If a nested dictionary is used as a configuration object for a large application, what strategies would you implement to validate its structure and data types at startup to prevent runtime errors deep within the application?
- What if Python dictionaries could only have primitive data types (strings, integers, etc.) as values? How would you redesign a system, like the art gallery directory, to represent the same hierarchical relationships without nested dictionaries?