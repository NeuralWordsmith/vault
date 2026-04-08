---
tags:
  - relationship
  - python
  - pass_by_assignment
  - pass_by_object_reference
  - mutability
  - function_arguments
  - memory_model
  - concept
source:
  - "[[Writing Functions in Python]]"
related:
  - "[[Python - Function Argument Passing]]"
  - "[[Python 5 - Mutable vs Immutable Objects]]"
  - "[[Python - Variable Assignment & Memory Model]]"
  - "[[Python - Mutable Objects]]"
  - "[[Python - Immutable Objects]]"
  - "[[Python - Functions]]"
  - "[[Python - Scope]]"
  - "[[Python - Lists]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Objects]]"
  - "[[Python - List Memory Model (Reference vs. Value)]]"
  - "[[Python - Mutable Default Arguments Pitfall]]"
  - "[[Python - Handling Mutable Default Arguments with None]]"
  - "[[Fundamental - Computer Science]]"
  - "[[Python - Variables]]"
---
# Relationship: Pass by Assignment

**Why This Matters:** This concept is the key to understanding why Python functions can sometimes modify variables outside their scope and sometimes can't. Misunderstanding this leads to subtle, hard-to-find bugs, especially when dealing with mutable data structures like lists and dictionaries in complex applications.
## The Relationship Defined

**Type:** Mechanistic

> Python's argument passing model is neither "pass-by-value" nor "pass-by-reference" in the traditional sense; it is formally called "pass by assignment." When you pass a variable to a function, the function's parameter name is assigned to the *exact same object* the original variable points to. If that object is a [[Python - Mutable Objects|mutable object]] (like a list), any in-place modifications made via the function's parameter will affect the original object. However, if the parameter name is *reassigned* to a completely new object inside the function (e.g., `x = [4, 5, 6]`), the link to the original object is broken, and the caller's variable remains untouched. This explains why modifying a list's contents works, but reassigning an integer does not affect the original.

_Analogy:_ _Imagine you have a Google Doc (an object in memory). You write its web address on a sticky note labeled 'my_list'. This sticky note is your variable. To have a colleague work on it, you copy the *web address* onto a new sticky note labeled 'x' and hand it to them (passing the argument to a function). Both sticky notes now point to the exact same online document. If your colleague ('x') opens the document and starts typing (mutating the list), you'll see the changes when you look at it using your 'my_list' sticky note. However, if your colleague instead creates a brand new Google Doc and writes its *new* address on their 'x' sticky note (reassignment), their note now points to a different document. Any changes they make to this new document won't affect your original one at all._

The sticky note is the variable name. The web address is the memory reference. The Google Doc is the object in memory. Modifying the doc's content is like `list.append()`. Creating a new doc and writing its address on the sticky note is like `x = [4, 5, 6]`. **Where it breaks down:** This analogy doesn't fully capture the nuance of [[Python - Immutable Objects|immutable objects]] like integers. In Python, you can't 'edit' the integer `3` itself; reassigning a variable to `4` means the variable's 'sticky note' now points to a completely different, pre-existing 'document' for the number `4`.

## Mechanism of Interaction

Pass by Assignment is the underlying mechanism that implements [[Python - Function Argument Passing]]. When a function is called, the parameter names in the function's local scope are assigned to the objects passed in by the caller. This means the parameter becomes another name (an alias) for the same object.

## Implications & Impact

This has profound implications for program state. If the passed object is mutable, the function can modify the object itself, creating side effects visible outside the function. If the parameter name is reassigned within the function, it simply points to a new object, breaking the connection to the original and preventing side effects on the caller's variable.

## Key Connections

- The concept of [[Python - Pass by Assignment|pass by assignment]] is the specific mechanism that governs [[Python - Function Argument Passing|how arguments are handled in Python functions]].
- It is fundamentally dependent on the distinction between [[Python 5 - Mutable vs Immutable Objects|mutable and immutable objects]], as this determines whether changes made inside a function can affect the caller's scope.
- Understanding this model is impossible without a clear grasp of the [[Python - Variable Assignment & Memory Model|Python variable assignment and memory model]], which explains that variables are just names pointing to objects in memory.
- A common source of bugs, the [[Python - Mutable Default Arguments Pitfall|pitfall of mutable default arguments]], arises directly from the mechanics of pass by assignment combined with how function defaults are evaluated only once.

## Deeper Questions

- You're designing an API that processes large, complex data structures (e.g., dictionaries representing user profiles). To optimize for performance and memory, you decide to modify these structures in-place within your functions. What is the primary business risk of this design choice, and how would you document the API contract to prevent misuse by other developers on your team who might not expect this side-effect behavior?
- Imagine a multi-threaded data processing pipeline where different threads call the same function, passing in references to shared, mutable state objects (like a shared configuration dictionary). How does Python's 'pass by assignment' model introduce race conditions in this scenario, and what specific synchronization mechanisms (e.g., locks) would you implement within the function to ensure data integrity at scale?
- What if Python were to switch from 'pass by assignment' to a strict 'pass by value' model for all data types, where functions always receive a deep copy of the arguments? What class of common Python bugs would this eliminate entirely, but what new, significant performance bottlenecks would it introduce, especially in data science and machine learning workloads?