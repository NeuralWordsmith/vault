---
tags: 
  - major_core
  - python
  - namedtuple
  - collections
  - immutable
  - data_structure
  - readability
  - concept
source: 
  - "[[Data Types in Python]]"
related: 
  - "[[Python - Tuples]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Data Types]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Creating a NamedTuple]]"
  - "[[Python - Accessing NamedTuple Fields]]"
  - "[[Python - Advantages of NamedTuple]]"
  - "[[Python - NamedTuple vs Dictionary vs DataFrame]]"
  - "[[Python - Memory-Efficient Data Processing]]"
  - "[[SWE - Readability]]"
  - "[[DSA - Data Structures & Algorithms]]"
  - "[[Python - Lists]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
---
# Major Core: NamedTuple

## Summary

> A namedtuple is a specialized container type available in Python's `collections` module. It is a subclass of the standard tuple, meaning it inherits all the properties of a tuple (like being immutable and indexable), but adds the ability to access elements by name instead of just by their position. This makes code significantly more readable and less prone to errors, as you can refer to `point.x` instead of the more abstract `point[0]`. The process for [[Python - Creating a NamedTuple|creating a namedtuple]] and [[Python - Accessing NamedTuple Fields|accessing its fields]] are straightforward ways to leverage this feature.

**Why This Matters:** NamedTuples provide a memory-efficient and readable way to create simple, immutable data structures, bridging the gap between raw tuples and full-fledged classes for cleaner, self-documenting code.

_Analogy:_ _Think of a namedtuple as a pre-printed contact card template. The template has fixed, labeled fields: 'Name', 'Phone', and 'Email'. You can't change these labels on the template itself. When you want to store a new contact, you take a blank card from this template and fill in the values. The resulting card is a single, lightweight object. To get the person's phone number, you look for the 'Phone' label; you don't have to remember that it's the second piece of information on the card._

In this analogy, the 'contact card template' is the namedtuple class you define. The 'labels' ('Name', 'Phone') are the field names. The 'filled-in card' is the actual namedtuple instance with data. You can access data via labels (`contact.phone`) just like you can with an index (`contact[1]`).

**Where it breaks down:** A physical contact card can be altered after it's created (you could cross out a number and write a new one). A namedtuple, being immutable, cannot be changed once created. To 'update' it, you must create an entirely new instance.

```
NamedTuple Factory: namedtuple('Point', ['x', 'y'])
        │
        ▼
Creates a new Class: <class '__main__.Point'>
        │
        ▼
Instantiate: p1 = Point(x=10, y=20)
        │
        ▼
Instance `p1`:
+---+---+ 
| x | y |  <-- Access by name (p1.x)
+---+---+
| 10| 20|
+---+---+
  ▲   ▲
  │   │
Index 0, 1 <-- Access by index (p1[0])
```

## Details

The core idea behind the namedtuple is to provide a simple way to create lightweight, object-like types without the boilerplate of defining a full class using the `class` keyword. It's a factory function that generates new tuple subclasses tailored to specific needs. This allows you to bundle a few pieces of data together under a clear type name and with descriptive field names, enhancing code readability and maintainability. It strikes a balance, offering more structure than a plain tuple and less overhead than a dictionary or custom class, a topic explored in [[Python - NamedTuple vs Dictionary vs DataFrame|the comparison between data structures]].

#### Primary Goal

To create simple, immutable data containers that are as memory-efficient as tuples but as readable as objects with named attributes.

#### Mechanism

- **Step 1: Import the Factory**
    - First, you must import the `namedtuple` factory function from the built-in `collections` module.
- **Step 2: Define the Template (Create the Class)**
    - Call the `namedtuple()` factory, providing two arguments: a string for the new class name (e.g., 'Car') and a list of strings for the field names (e.g., `['make', 'model', 'year']`). This doesn't create an instance, but rather a new class.
- **Step 3: Instantiate the Object**
    - Use the newly created class (e.g., `Car`) to create instances, passing the values for each field as arguments, either positionally or by keyword.
- **Step 4: Access Data**
    - You can now access the data in two ways: by using dot notation with the field name (e.g., `my_car.model`) or by using the integer index like a regular tuple (e.g., `my_car[1]`).

```python
# --- Step 1: Import the Factory ---
from collections import namedtuple

# --- Step 2: Define the Template (Create the Class) ---
# This creates a new class called 'Car'
Car = namedtuple('Car', ['make', 'model', 'year', 'color'])

# --- Step 3: Instantiate the Object ---
# Create an instance of the Car class
my_car = Car(make='Toyota', model='Camry', year=2021, color='blue')

# --- Step 4: Access Data ---
# Accessing by name (more readable)
print(f"My car is a {my_car.year} {my_car.make} {my_car.model}.")

# Accessing by index (like a regular tuple)
print(f"The model is: {my_car[1]}")

# NamedTuples are immutable
try:
    my_car.year = 2022
except AttributeError as e:
    print(f"\nError: {e}")
```

 [[Code - NamedTuple Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`typename`**: A string that specifies the name of the new tuple subclass being created. This name becomes the type name, like 'Point' or 'Car'.
- **`field_names`**: The names of the fields. This can be provided in two ways:
    - A sequence of strings, such as `['x', 'y', 'z']`.
    - A single string with names separated by whitespace or commas, such as `'x y z'` or `'x, y, z'`.

#### Core Trade-offs

- **Pro: Readability and Self-Documentation**
    - Accessing fields by name (`point.x`) makes code much clearer than using indices (`point[0]`), reducing cognitive load and preventing bugs from mixing up field order.
- **Pro: Memory Efficiency**
    - Instances of namedtuples are just as memory-efficient as regular tuples because they don't store a per-instance `__dict__`, making them ideal for storing large numbers of simple records.
- **Pro: Immutability**
    - Like tuples, namedtuples are immutable. This prevents accidental modification of data and makes them usable as dictionary keys.
- **Con: Inflexibility**
    - Because they are immutable, you cannot change the value of a field after an instance is created. You must create a new instance with the updated value. They also cannot have per-instance methods without creating a custom subclass.

## Connections

```
              (Parent)
               Tuples
                  ▲
                  │
┌─────────────────┼─────────────────┐
│                 │                 │
(Alternative)  ┌──────────────┐   (Alternative)
Dictionary     │  NamedTuple  │   Class Definition
               └──────────────┘
                      │
           ┌──────────┴──────────┐
           │                     │
Creating a NamedTuple   Accessing Fields
```

### Parent Concept

A namedtuple is a direct factory-produced subclass of [[Python - Tuples]], inheriting its core properties of being an ordered, immutable sequence.

### Child Concepts

- [[Python - Creating a NamedTuple|Creating a namedtuple]] is the process of using the `collections.namedtuple` factory to define the new data type.
- [[Python - Accessing NamedTuple Fields|Accessing namedtuple fields]] can be done either by name using dot notation or by index, just like a standard tuple.

### Related Concepts 

- [[Python - NamedTuple vs Dictionary vs DataFrame|A direct comparison with other data structures]] highlights its unique position as a lightweight, readable container.
- The [[Python - Advantages of NamedTuple|advantages of namedtuples]] primarily revolve around their blend of readability and memory efficiency.
- It contrasts with [[Python - Dictionaries]], which are mutable and use more memory but offer more flexibility for storing key-value pairs.
- It serves as a lightweight alternative to a full [[Python - Class Definition]], which is more powerful but requires more boilerplate code.
- It is one of several fundamental [[Python - Data Types]] used for organizing and storing collections of data.
## Questions

- You're processing a stream of millions of simple, structured records. You could use dictionaries or namedtuples. How would you justify choosing namedtuples to your team, focusing on the trade-offs between memory footprint, performance, and developer ergonomics (like typo prevention)?
- Imagine a data pipeline where an upstream API, which previously returned data matching your namedtuple's fields, suddenly adds a new, optional field. How would you design your system to handle this change gracefully without breaking the downstream consumers of your namedtuple instances?
- What if Python's built-in `tuple` type was removed from the language entirely, and `namedtuple` (or a similar structure) was the only available immutable sequence type? What fundamental Python idioms would break, and what new patterns might emerge?
