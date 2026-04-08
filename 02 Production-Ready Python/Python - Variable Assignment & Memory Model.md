---
tags:
  - core
  - python
  - memory_model
  - references
  - pointers
  - aliasing
  - assignment
  - concept
source:
  - "[[Writing Functions in Python]]"
related:
  - "[[Python - Variables]]"
  - "[[Python - Objects]]"
  - "[[Python - Lists]]"
  - "[[Python 5 - Mutable vs Immutable Objects]]"
  - "[[Python - Pass by Assignment]]"
  - "[[Python - Mutable Objects]]"
  - "[[Python - Immutable Objects]]"
  - "[[Python - Function Argument Passing]]"
  - "[[Python - Mutable Default Arguments Pitfall]]"
  - "[[Python - Handling Mutable Default Arguments with None]]"
  - "[[Python - Pass by Assignment & Memory Model Relationship]]"
  - "[[Python - Data Types]]"
  - "[[Python - Dictionaries]]"
  - "[[Fundamental - Computer Science]]"
---
# Core: List Memory Model (Reference vs. Value)

## Summary

>In Python, variables are not containers for data but are labels or names that point to objects in memory. When you assign a variable to an existing list (e.g., `b = a`), you are not creating a copy of the list; you are creating a new label (`b`) that points to the exact same list object in memory as the original label (`a`). This is a core tenet of Python's [[Python - Pass by Assignment|pass-by-assignment]] mechanism and its behavior is heavily influenced by whether the object is one of the [[Python - Mutable Objects|mutable objects]] or [[Python - Immutable Objects|immutable objects]].

**Why This Matters:** Understanding this memory model is critical for preventing subtle bugs where modifying a list in one part of your code unintentionally affects another part that you thought was independent.

_Analogy:_ _Think of a variable as a sticky note with a web address written on it, and the object in memory as the actual website. When you write `a = 'google.com'`, you're writing 'google.com' on a sticky note labeled 'a'. If you then create a new sticky note 'b' and copy the address from 'a' (`b = a`), both sticky notes now point to the same single website. If someone updates the Google homepage (mutating the object), anyone visiting via either sticky note sees the change. However, if you erase the address on sticky note 'a' and write 'bing.com' instead (`a = 'bing.com'`), you've only changed where the 'a' sticky note points. The 'b' sticky note still points to 'google.com', completely unaffected._

Where it breaks down: This analogy doesn't fully capture the distinction between mutable and immutable objects. For an immutable object like a string or a tuple, you can't "update the website"; you can only ever create a new website and point your sticky note to it.

```
State 1: `a = [1, 2, 3]`, then `b = a`
  Name      Memory Address      Object
+-------+      +----------+    +-----------+
|   a   |----->|  0x100   |--->| [1, 2, 3] |
+-------+      |          |    +-----------+
               |          |
+-------+      |          |
|   b   |----->|          |
+-------+      +----------+

State 2: After `a.append(4)`
  Name      Memory Address      Object
+-------+      +----------+    +----------------+
|   a   |----->|  0x100   |--->| [1, 2, 3, 4]   |
+-------+      |          |    +----------------+
               |          |
+-------+      |          |
|   b   |----->|          |
+-------+      +----------+

State 3: After `a = [10, 20]`
+-------+      +----------+    +----------------+
|   b   |----->|  0x100   |--->| [1, 2, 3, 4]   |
+-------+      +----------+    +----------------+

+-------+      +----------+    +-----------+
|   a   |----->|  0x200   |--->| [10, 20]  |
+-------+      +----------+    +-----------+
```

## Details

Python's memory model for objects like lists operates on the principle of references, not values. When you perform an assignment like `b = a`, you are copying the reference (the memory address) that `a` holds, not the actual list data. This means both variables now 'refer' to the same underlying object. Consequently, any in-place modification (mutation) to the object through one variable will be visible through the other. This is known as aliasing. However, reassigning one variable to a completely new object breaks this link for that variable, leaving the other variable pointing to the original object.

#### Primary Goal

To manage memory efficiently by avoiding unnecessary copies of large data structures, instead allowing multiple variables to reference a single object.

#### Mechanism

- **Step 1: Initial Object Creation**
    - A list object `[1, 2, 3]` is created in memory. The variable name `a` is created and set to point to the memory address of this new list.
- **Step 2: Reference Assignment (Aliasing)**
    - When `b = a` is executed, Python creates a new variable name `b`. It looks up the memory address that `a` is pointing to and makes `b` point to that *same* address. No new list is created.
- **Step 3: In-Place Mutation**
    - When a method like `.append()` is called on `a`, Python follows the reference from `a` to the list object and modifies it directly. Since `b` points to the very same object, the change is reflected when `b` is accessed.
- **Step 4: Reassignment**
    - When `a = [10, 20]` is executed, a completely new list object `[10, 20]` is created at a new memory address. The variable `a` is then updated to point to this new address. This action has no effect on `b`, which continues to point to the original list's memory address.

##### Code Translation

```python
# --- Step 1: Initial Object Creation ---
a = [1, 2, 3]
print(f"Initial state: a={a}, id(a)={id(a)}")

# --- Step 2: Reference Assignment (Aliasing) ---
b = a
print(f"After b = a:   b={b}, id(b)={id(b)}") # Note the identical IDs

# --- Step 3: In-Place Mutation ---
a.append(4)
print(f"After append:    a={a}, b={b}") # The change is reflected in both

# --- Step 4: Reassignment ---
a = [10, 20]
print(f"After reassign:  a={a}, b={b}") # 'a' points to a new object, 'b' is unchanged
print(f"Final IDs:       id(a)={id(a)}, id(b)={id(b)}") # IDs are now different
```

 [[Code - List Memory Model (Reference vs. Value) Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- This memory model is a fundamental behavior of the Python language and is not controlled by user-configurable parameters. The key factor influencing its effects is the type of the object being referenced.

#### Core Trade-offs

- **Pro: Efficiency**
    - It is highly memory-efficient. Passing large lists or dictionaries around in a program doesn't require creating expensive copies, which saves both memory and processing time.
- **Con: Risk of Unintended Side Effects**
    - If a programmer is unaware of this behavior, they can introduce subtle bugs. Modifying a list passed into a function can unexpectedly alter the state of the list in the calling scope. This is the root cause of the [[Python - Mutable Default Arguments Pitfall|mutable default arguments pitfall]].

## Connections

```
                 (Parent)
              Python - Variables
                      ▲
                      │
┌─────────────────────┼─────────────────────┐
│                     │                     │
(Consequence) ┌───────────────────────────┐ (Determined By)
Pass by       │ List Memory Model         │ Mutable vs
Assignment    │ (Reference vs. Value)     │ Immutable Objects
              └───────────────────────────┘
```

### Parent Concept

This model is a specific illustration of the general principles of [[Python - Variables|how variables work in Python]], where names are bound to objects.

### Child Concepts



### Related Concepts 

- The concept of [[Python - Pass by Assignment|pass by assignment]] is a direct consequence of this memory model, explaining how arguments are handled during function calls.
- The practical impact of this model is determined by the distinction between [[Python 5 - Mutable vs Immutable Objects|mutable and immutable objects]].
- This memory model is the foundational knowledge needed to understand the relationship described in [[Python - Pass by Assignment & Memory Model Relationship|the relationship between pass-by-assignment and the memory model]].
- Understanding this is crucial for avoiding common errors like the [[Python - Mutable Default Arguments Pitfall|mutable default argument pitfall]].
## Questions

- Imagine you have a massive dataset (e.g., 10GB) loaded into a list-like object. A colleague suggests making a full copy before passing it to a data cleaning function to 'be safe'. Argue for or against this, considering the trade-offs between memory usage, performance, and the risk of unintended side effects. How does this decision impact the cost of running the job on a cloud platform?
- You're debugging a multi-threaded application where different threads share access to a list of tasks. You observe that tasks are being processed incorrectly or duplicated. How could Python's reference-based memory model be contributing to this race condition, and what specific mechanisms (e.g., locks, using immutable data structures) would you implement to make the shared state thread-safe?
- What if Python's assignment operator (`=`) for lists always performed a deep copy instead of creating a reference? How would this fundamental change impact the language's performance, memory footprint, and common programming idioms? What existing Python features or libraries would become redundant or need a complete redesign?