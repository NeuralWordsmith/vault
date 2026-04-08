---
tags: 
  - core
  - python
  - set
  - union
  - set theory
  - data combination
  - unique elements
  - concept
source: 
  - "[[Data Types in Python]]"
related: 
  - "[[Python - Sets]]"
  - "[[Python - Set Operations]]"
  - "[[Python - Set .intersection() Method]]"
  - "[[Python - Set .difference() Method]]"
  - "[[Python - Set .update() Method]]"
  - "[[Python - Set .add() Method]]"
  - "[[Python - Creating Sets]]"
  - "[[Python - Modifying Sets]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Lists]]"
  - "[[Python - Tuples]]"
  - "[[DSA - Data Structures & Algorithms]]"
  - "[[Python - Data Types]]"
---
# Core: Set .union() Method

## Summary

>The `.union()` method is a fundamental operation in [[Python - Set Operations|set theory]] that combines two sets and returns a new set containing all the unique elements present in either of the original sets. It's the programmatic equivalent of the logical 'OR' operation for set membership.

**Why This Matters:** It provides a highly efficient way to combine unique items from multiple collections, which is crucial for data aggregation, deduplication, and creating comprehensive feature sets.

_Analogy:_ _Imagine you and a friend are planning a potluck dinner. You each make a list of the dishes you plan to bring. To see the complete menu for the party, you combine your lists. The `.union()` method is like creating that final, master menu. It takes your list (set A) and your friend's list (set B) and produces a single, comprehensive menu (the new set) that includes every unique dish from both lists. If you both planned to bring 'salad', it only appears once on the final menu._

The dishes are the elements in the sets. Your list is the first set. Your friend's list is the second set. The final master menu is the new set returned by `.union()`. **Where it breaks down:** The analogy implies a physical list, but Python sets are unordered. The final menu might not have the dishes in the same order you wrote them down.

```
```
Set A: {1, 2, 3}      Set B: {3, 4, 5}
   /────────\         /────────\
  /    1, 2  \       /   4, 5   \
 |      ( 3 )───────( 3 )      |
  \          /       \          /
   \________/         \________/
           │
           ▼
A.union(B) or A | B
           │
           ▼
     /────────────\
    /  1, 2, 3,    \
   |      4, 5       |
    \              /
     \____________/
Result: {1, 2, 3, 4, 5}
```
```

## Details

The `.union()` method is a core feature of [[Python - Sets|Python's set data structure]], designed to aggregate elements from multiple collections. As shown in the cookie example, if you have one set of cookies Jason ate and another for Hugo, `.union()` lets you see the full, unique variety of cookies eaten by both. This operation is non-destructive, meaning it leaves the original sets unchanged and returns a completely new set.

#### Primary Goal

To create a new set that contains every unique element from two or more source sets.

#### Mechanism

- **Step 1: Define the Initial Sets**
    - Create two or more sets that you want to combine. Each set contains a collection of unique, hashable elements.
- **Step 2: Call the `.union()` Method**
    - Invoke the `.union()` method on one of the sets, passing the other set as an argument. You can also pass multiple iterables. A common shorthand for this operation is the vertical bar `|` operator.
- **Step 3: Receive the New Set**
    - The method returns a brand new set containing all unique elements from the sets involved in the operation. The original sets remain unmodified.

##### Code Translation

```python
# --- Step 1: Define the Initial Sets ---
cookies_jason_ate = {'chocolate chip', 'oatmeal cream', 'peanut butter'}
cookies_hugo_ate = {'chocolate chip', 'anzac'}

# --- Step 2: Call the .union() Method ---
# This finds all unique cookies eaten by either Jason or Hugo.
all_cookies_eaten = cookies_jason_ate.union(cookies_hugo_ate)

# --- Step 3: Receive the New Set ---
print(all_cookies_eaten)
# Expected Output: {'chocolate chip', 'anzac', 'oatmeal cream', 'peanut butter'}
# Note: The order of elements in the output set is not guaranteed.

# You can also use the | operator as a shorthand for union
all_cookies_eaten_operator = cookies_jason_ate | cookies_hugo_ate
print(all_cookies_eaten_operator)
# Expected Output: {'chocolate chip', 'anzac', 'oatmeal cream', 'peanut butter'}
```

 [[Code - Set .union() Method Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **other_iterable**
    - The `.union()` method takes one or more iterables (like sets, lists, or tuples) as arguments. It will combine all elements from all provided iterables with the set it was called on.

#### Core Trade-offs

- **Memory Usage**
    - It creates a new set in memory. For very large sets, this can be memory-intensive. If you need to modify a set in-place to save memory, the [[Python - Set .update() Method|.update()]] method is a better choice.
- **Immutability of Originals**
    - A key advantage is that it's a non-destructive operation. The original sets are not altered, which can prevent unintended side effects in your code.
- **Loss of Order**
    - Like all set operations, the resulting union is an unordered collection. If the original order of elements is important, a different data structure and approach are needed.

## Connections

```
```
                  (Parent)
              Set Operations
                     ▲
                     │
     ┌───────────────┼────────────────┐
     │               │                │
(Contrast)      ┌──────────────────┐      (Contrast)
Intersection    │ Set .union()     │      Difference
                └──────────────────┘
                     │
                     ▼
                 (In-place
                  version)
                  .update()
```
```

### Parent Concept

The `.union()` method is a fundamental concept within [[Python - Set Operations|Set Operations]], representing the combination of elements.

### Child Concepts



### Related Concepts 

- It directly contrasts with the [[Python - Set .intersection() Method|.intersection()]] method, which finds only the elements common to all sets.
- Another contrasting operation is the [[Python - Set .difference() Method|.difference()]] method, which finds elements present in one set but not another.
- The [[Python - Set .update() Method|.update()]] method provides similar functionality but modifies the set in-place instead of returning a new one.
- The concept of combining unique items is foundational to [[Python - Sets|sets]] as a data structure.
## Questions

- Imagine you're merging customer ID lists from two recent marketing campaigns. Using `.union()` is fast, but you lose information about which campaign a customer came from. How would you modify your approach to retain this source information while still getting a unique list of all customers, and what's the business implication of this choice?
- If you needed to compute the union of a million very large sets stored across a distributed system, how would a simple `set.union()` approach fail, and what architectural patterns (like MapReduce) could you use to perform this operation at scale?
- What if Python's `set` objects were memory-constrained and could only hold 1000 elements at a time? How would you implement a function to find the union of two sets that are both much larger than this limit?