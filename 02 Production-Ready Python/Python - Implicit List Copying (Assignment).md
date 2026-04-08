---
tags: 
  - core
  - python
  - pass_by_reference
  - mutability
  - aliasing
  - memory_model
  - side_effects
  - concept
source: 
  - "[[Introduction to Python]]"
related: 
  - "[[Python - List Manipulation]]"
  - "[[Python - Explicit List Copying (Cloning)]]"
  - "[[Python - List Manipulation & Memory Model Relationship]]"
  - "[[Python - Changing List Elements]]"
  - "[[Python - Deleting List Elements]]"
  - "[[Python - Lists]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Tuples]]"
  - "[[Python - Mutability]]"
  - "[[Python - Shallow vs Deep Copy]]"
  - "[[Fundamental - Programming]]"
  - "[[Fundamental - Computer Science]]"
---
# Core: List Memory Model (Reference vs. Value)

## Summary

>In Python, when assigning a mutable object like a list to a new variable using the equals sign (=), you are not creating a new copy of the list. Instead, you are creating a new *reference* (or label) that points to the exact same object in memory. This behavior, often called 'assignment by reference', is the reason why operations like [[Python - Changing List Elements]] on one variable can unexpectedly affect another. It is the foundation for understanding the consequences of all forms of [[Python - List Manipulation]].

**Why This Matters:** This concept is critical for preventing subtle, hard-to-debug bugs where changing one variable unintentionally modifies another, ensuring data integrity in complex programs.

_Analogy:_ _Imagine you have a Google Doc (the list in memory). You share the link to this document with a colleague. You now both have a 'variable' (the link) that points to the exact same document. If your colleague opens their link and starts typing, you will see those changes in real-time when you open your link. The link itself was copied, not the document's content._

*   **Where it breaks down:** This analogy is very strong for mutable objects like lists. However, it doesn't fully capture how Python handles immutable objects (like numbers or strings). For those, it's more like you text your colleague the number '5'. If they change their number to '6', your number remains '5'. There's no shared document, just independent values.

```
After `y = x`:
  x ───┐
       │
       └─> [ 10, 20, 30 ]  (Object in Memory)
       ┌─>
       │
  y ───┘

After `y[1] = 99`:
  x ───┐
       │
       └─> [ 10, 99, 30 ]  (The *same* object is now changed)
       ┌─>
       │
  y ───┘
```

## Details

The provided context highlights a surprising but fundamental behavior in Python. When you write `y = x` where `x` is a list, you aren't making a duplicate of the list's data. You are simply creating a second name, `y`, that points to the very same list object in the computer's memory. This is a core concept in Python programming known as 'pass-by-assignment' or 'pass-by-object-reference'. It explains why modifying a list through one variable name is visible through another, a phenomenon called a 'side effect'. This behavior is determined by the object's type: **mutable objects** (like lists) are passed by reference, while **immutable objects** (like numbers) effectively behave as if passed by value.

#### Primary Goal

To optimize memory usage and performance by avoiding the costly process of copying large data structures every time they are assigned to a new variable or passed to a function.

#### Mechanism

- **Step 1: Create an Original List**
    - Define an initial list and assign it to a variable, `x`. This action creates a list object in a specific location in memory, and the variable `x` stores the address of that location.
- **Step 2: Assign by Reference**
    - Create a new variable, `y`, and assign `x` to it using `y = x`. This does not create a new list; it simply copies the memory address stored in `x` and places it into `y`. Both variables now point to the identical object.
- **Step 3: Modify Through the New Reference**
    - Change an element in the list using the new variable, for example, `y[1] = 99`. Since `y` points to the list object, this modification happens directly on that object in memory.
- **Step 4: Observe the Side Effect**
    - Print the original variable `x`. You will see that it reflects the change made via `y`, because both variables are simply different names for the same underlying data structure.

##### Code Translation

```python
# --- Step 1: Create an Original List ---
x = [10, 20, 30]
print(f"Original x: {x}, Memory ID: {id(x)}")

# --- Step 2: Assign by Reference ---
y = x
# Note that the memory ID is the same, proving they are the same object.
print(f"y after assignment: {y}, Memory ID: {id(y)}")

# --- Step 3: Modify Through the New Reference ---
print("\nChanging the second element of y to 99...")
y[1] = 99

# --- Step 4: Observe the Side Effect ---
print(f"y after modification: {y}")
# x is also changed because it points to the same list!
print(f"x after y was modified: {x}")
```

#### Key Parameters

- **Object Mutability**
    - The core 'parameter' controlling this behavior is whether the data type is mutable or immutable.
    - **Mutable Types (e.g., lists, dictionaries, sets):** Follow the assignment-by-reference model. Changes made through any variable referencing the object are visible to all other references. This is why [[Python - Changing List Elements]] can have this side effect.
    - **Immutable Types (e.g., integers, floats, strings, tuples):** Behave like assignment-by-value. Reassigning a variable creates a completely new object in memory; the original is unaffected, thus avoiding side effects.

#### Core Trade-offs

- **Pro: Memory and Performance Efficiency**
    - It's highly efficient. Instead of copying potentially huge lists or dictionaries every time you pass them to a function, you only copy a tiny memory address. This saves both memory and processing time.
- **Con: Unintended Side Effects (Aliasing)**
    - This is the major drawback. If you're unaware of this behavior, you can accidentally modify a list in one part of your code and cause unexpected bugs in a completely different part that uses another reference to the same list. This makes understanding the difference between reference assignment and [[Python - Explicit List Copying (Cloning)|explicit copying]] absolutely critical for writing robust code.

## Connections

```
                 (Parent)
         Fundamental - Programming
                   ▲
                   │
┌──────────────────┼──────────────────┐
│                  │                  │
(Contrast)  ┌───────────────────────────┐  (Solution)
Value Types │ List Memory Model (Ref/Val) │ Explicit Copying
            └───────────────────────────┘
                   │
                   ▼
              (Impacts)
        List Manipulation
```

### Parent Concept

This concept is a fundamental aspect of memory management within [[10 Utility Notes/Fundamental - Programming.md|Fundamental - Programming]].

### Related Concepts 

- This memory model is the underlying reason why methods for [[Python - List Manipulation|list manipulation]] can sometimes have surprising side effects.
- To avoid the pitfalls of reference assignment, one must use methods for [[Python - Explicit List Copying (Cloning)|explicit list copying]], which creates a truly independent new list.
- The interplay between this model and list operations is a critical concept, explored further in [[Python - List Manipulation & Memory Model Relationship|the relationship between list manipulation and the memory model]].
- Understanding this concept is crucial before performing operations like [[Python - Deleting List Elements|deleting list elements]], as it could remove an item from a list referenced elsewhere in the code.
## Questions

- You've discovered a critical bug where financial reports are being calculated incorrectly. The root cause is a function that modifies a list of transactions passed into it, unintentionally altering the original data source used by other reporting functions. How would you explain the trade-off between the performance gain of passing by reference versus the data integrity risk to a project manager, and what immediate and long-term code changes would you propose?
- Imagine a multi-threaded application where several threads are given access to the same large configuration dictionary. How does Python's reference-based memory model introduce race conditions here, and what synchronization mechanisms (like locks) would you implement to ensure that threads can safely read and modify the configuration without corrupting it?
- What if Python's lists were immutable by default, like tuples? How would this fundamental change impact common programming patterns for data processing, and what new methods or syntax would need to be introduced to efficiently 'build up' a collection of items?