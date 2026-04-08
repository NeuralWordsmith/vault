---
tags: 
  - core
  - python
  - dictionary_views
  - iteration
  - for_loop
  - items()
  - keys()
  - concept
source: 
  - "[[Data Types in Python]]"
related: 
  - "[[Python - Dictionaries]]"
  - "[[Python - Looping Over Data Structures]]"
  - "[[Python - for Loop]]"
  - "[[Python - Tuples]]"
  - "[[Python - List Comprehensions]]"
  - "[[Python - Direct Key Access in Dictionaries]]"
  - "[[Python - Safe Key Access with .get() Method]]"
  - "[[Python - Creating a Dictionary from a List of Tuples]]"
  - "[[Python - Iteration]]"
  - "[[Python - Data Types]]"
  - "[[Python - Dictionaries 1]]"
  - "[[Python - Direct Key Access vs .get() Method]]"
  - "[[Python - Dictionary Operations]]"
---
# Core: Dictionary Iteration

## Summary

>In Python, we can traverse the contents of a dictionary in several ways. We can iterate over its keys, its values, or its key-value pairs (called 'items'). By default, when you loop directly over a dictionary, you are iterating through its keys.

**Why This Matters:** Iterating over dictionaries is the fundamental mechanism for systematically accessing and processing stored data, enabling everything from simple data lookups to complex transformations and aggregations.

_Analogy:_ _Think of a dictionary as a phone's contact list. Iterating over the `.keys()` is like scrolling through only the names of your contacts. Iterating over the `.values()` is like looking at a list of just the phone numbers, without the names attached. Iterating over the `.items()` is like looking at each full entry, seeing both the name and the corresponding phone number together._

*   **Where it breaks down:** A contact list is almost always sorted alphabetically. While modern Python dictionaries (3.7+) maintain insertion order, their primary advantage is fast, hash-based lookups, not their order. The analogy doesn't capture this underlying performance characteristic.

```
stock_prices = { "AAPL": 175.25, "GOOG": 2850.70 }
     │
     ├─ Default or .keys()   ───> "AAPL", "GOOG"
     │
     ├─ .values()            ───> 175.25, 2850.70
     │
     └─ .items()             ───> ("AAPL", 175.25), ("GOOG", 2850.70)
```

## Details

While [[Python - Direct Key Access in Dictionaries|direct access]] is perfect for retrieving a single value when you know its key, iteration is used for processing all or a subset of the data within the dictionary. Python provides three explicit methods to control what you loop over: `.keys()` for just the keys, `.values()` for just the values, and `.items()` for key-value pairs. As a convenient shortcut, looping directly on the dictionary object itself is equivalent to looping over its keys.

#### Primary Goal

To systematically access and process the elements (keys, values, or key-value pairs) stored within a dictionary.

#### Mechanism

- **Step 1: Default Iteration (Over Keys)**
    - When a `for` loop is used directly on a dictionary object, it iterates over the keys one by one.
- **Step 2: Explicitly Iterating Over Keys with `.keys()`**
    - Using the `.keys()` method achieves the same result as the default behavior but is more explicit about the intent.
- **Step 3: Iterating Over Values with `.values()`**
    - To loop through only the values in the dictionary, the `.values()` method is used. The corresponding keys are not accessed in this loop.
- **Step 4: Iterating Over Key-Value Pairs with `.items()`**
    - The `.items()` method returns view objects containing key-value tuples. This is the most common and powerful iteration method, often combined with tuple unpacking to assign the key and value to separate variables within the loop.

##### Code Translation

```python
# Sample dictionary
stock_prices = {
    'AAPL': 175.25,
    'GOOG': 2850.70,
    'MSFT': 340.50
}

# --- Step 1: Default Iteration (Keys) ---
print("\n--- Iterating over Keys (Default) ---")
for ticker in stock_prices:
    # We can use the key to access the value inside the loop
    print(f"Ticker: {ticker}, Price: {stock_prices[ticker]}")

# --- Step 2: Explicitly Iterating Over Keys ---
print("\n--- Iterating over Keys (.keys()) ---")
for ticker in stock_prices.keys():
    print(f"Ticker: {ticker}")

# --- Step 3: Iterating Over Values ---
print("\n--- Iterating over Values (.values()) ---")
for price in stock_prices.values():
    print(f"Price: {price}")

# --- Step 4: Iterating Over Key-Value Pairs (Items) ---
print("\n--- Iterating over Items (.items()) ---")
# Using tuple unpacking for clean access to both key and value
for ticker, price in stock_prices.items():
    print(f"Ticker: {ticker}, Price: {price}")
```

 [[Code - Dictionary Iteration Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- Dictionary iteration itself does not have parameters. The choice of method (`.keys()`, `.values()`, or `.items()`) determines what data is yielded during each loop cycle.

#### Core Trade-offs

- **Memory Efficiency**
    - In modern Python, `.keys()`, `.values()`, and `.items()` return memory-efficient 'view objects', not new lists. These views provide a dynamic window into the dictionary's entries, reflecting any changes made to the dictionary.
- **Readability and Intent**
    - Using `.items()` with tuple unpacking (`for key, value in ...`) is highly readable and considered Pythonic when you need both elements. Using `.keys()` or `.values()` clearly signals that you only need one part of the pair.
- **Modification During Iteration**
    - Attempting to add or remove keys from a dictionary while iterating over it will raise a `RuntimeError`. If you must modify the dictionary, you should iterate over a copy, for example: `for key in list(my_dict.keys()):`.

## Connections

```
                      (Parent)
                    Dictionaries
                         ▲
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                    │
(Contrast)      ┌───────────────────────────┐      (Related)
Direct Access   │   Dictionary Iteration    │      Dict Comprehensions
                └───────────────────────────┘
                         │
                         │
           ┌─────────────┴─────────────┐
           │                           │
      .keys() Method             .items() Method
```

### Parent Concept

This concept is a fundamental operation within the broader topic of [[Python - Dictionaries]].

### Child Concepts



### Related Concepts 

- This process directly builds on the core structure of [[Python - Dictionaries 1|dictionaries]].
- It provides a method for processing multiple entries, which contrasts with [[Python - Direct Key Access in Dictionaries|direct key access]] used for single lookups.
- The `.items()` method is particularly relevant when working with data that may have been created by [[Python - Creating a Dictionary from a List of Tuples|constructing a dictionary from tuples]].
- A solid grasp of dictionary iteration is a prerequisite for understanding and using dictionary comprehensions, a more advanced feature related to [[Python - List Comprehensions]].
- When deciding how to access data, one must choose between this iteration approach and the [[Python - Direct Key Access vs .get() Method|trade-offs of direct vs. safe access methods]].
## Questions

- You're processing a large dictionary of user preferences where you only need to update the values based on some logic. Would you iterate using `.items()` or create a list of keys to iterate over? How would you justify your choice in terms of performance and code clarity to your team, especially if the dictionary contains millions of entries?
- Imagine a real-time system where a dictionary holding user session data is constantly being updated by one thread while another thread needs to iterate over it to check for expired sessions. What specific concurrency issues could arise, and how would you design a thread-safe iteration mechanism to prevent a `RuntimeError` or data corruption?
- What if Python dictionaries lost their `.keys()`, `.values()`, and `.items()` methods? How would you replicate the functionality of iterating over key-value pairs using only default dictionary iteration and direct key access, and what would be the performance implications of your solution compared to the built-in `.items()` method?