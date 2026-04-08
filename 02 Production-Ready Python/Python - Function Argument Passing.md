---
tags:
  - major_core
  - python
  - pass_by_assignment
  - mutability
  - immutability
  - function_arguments
  - memory_model
  - concept
source:
  - "[[Writing Functions in Python]]"
related:
  - "[[Python - Functions]]"
  - "[[Python - Pass by Assignment]]"
  - "[[Python 5 - Mutable vs Immutable Objects]]"
  - "[[Python - Variable Assignment & Memory Model]]"
  - "[[Python - Mutable Objects]]"
  - "[[Python - Immutable Objects]]"
  - "[[Python - Pass by Assignment & Memory Model Relationship]]"
  - "[[Python - Mutable Default Arguments Pitfall]]"
  - "[[Python - Handling Mutable Default Arguments with None]]"
  - "[[Python - Scope]]"
  - "[[Python - Objects]]"
  - "[[Python - Data Types]]"
  - "[[Python - Lists]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - List Memory Model (Reference vs. Value)]]"
---
# Major Core: Argument Passing

## Summary

> This note is a high-level container that organizes the concepts explaining how Python passes data to functions. The central mechanism is known as [[Python - Pass by Assignment|pass by assignment]], a model whose behavior is fundamentally tied to the distinction between [[Python 5 - Mutable vs Immutable Objects|mutable and immutable objects]].

**Why This Matters:** Understanding Python's argument passing model is critical for preventing subtle bugs where functions unintentionally modify data, ensuring code predictability and reliability.

## Details

This note serves as a central hub for understanding Python's unique approach to passing arguments to functions. Unlike languages that use a strict 'pass by value' or 'pass by reference', Python employs a system called [[Python - Pass by Assignment|pass by assignment]]. In this model, the function parameter becomes a new name (or reference) for the object that was passed in. The practical consequences of this depend entirely on whether the object is mutable (like a list) or immutable (like a number or string), which is explored in the child notes.

#### Primary Goal

To provide a structured overview and entry point for the detailed concepts that govern how information is passed to functions in Python.

#### Mechanism

- **How it Works:**
    - This note acts as a structural guide, grouping together the core components that define Python's argument passing behavior. It directs you to the specific notes that explain each part of the process.
- **Core Concepts Covered:**
    1. **The Model:** The fundamental mechanism is explained in [[Python - Pass by Assignment]].
    2. **Object Behavior:** The critical distinction that determines the outcome is detailed in [[Python 5 - Mutable vs Immutable Objects]], with specific notes on [[Python - Mutable Objects]] and [[Python - Immutable Objects]].
    3. **Memory Implications:** The underlying memory model that connects variable names to objects is covered in [[Python - Variable Assignment & Memory Model]].
    4. **Common Pitfalls:** A notorious and common bug related to this topic is explained in [[Python - Mutable Default Arguments Pitfall]], along with its solution in [[Python - Handling Mutable Default Arguments with None]].

## Connections

```
                  (Parent)
                  Functions
                      ▲
                      │
┌─────────────────────┼─────────────────────┐
│                     │                     │
(Foundation) ┌────────────────────┐     (Related)
  Objects    │  Argument Passing  │       Scope
             └────────────────────┘
                      │
  ┌───────────────────┴───────────────────┐
  │                                       │
Pass by Assignment            Mutable vs Immutable Objects
                                            │
                              ┌─────────────┴─────────────┐
                              │                           │
                        Mutable Objects             Immutable Objects
```

### Parent Concept

This topic is a fundamental aspect of [[Python - Functions]], defining the contract for how data flows into them.

### Child Concepts

- The core mechanism is detailed in [[Python - Pass by Assignment]], which explains that Python passes references to objects by value.
- The practical outcome of this mechanism is determined by the concepts in [[Python 5 - Mutable vs Immutable Objects]], which contrasts objects that can be changed in place from those that cannot.
- A deeper look at how names are bound to objects in memory is provided by [[Python - Variable Assignment & Memory Model]].
- A common and confusing bug that arises from these principles is explored in [[Python - Mutable Default Arguments Pitfall]].
- The standard solution to this common bug is outlined in [[Python - Handling Mutable Default Arguments with None]].

### Related Concepts 

- The concept of [[Python - Scope|scope]] is closely related, as it governs where variable names are accessible, while argument passing determines how values are initially bound to names within a function's scope.
- A solid understanding of [[Python - Objects|Python's object model]] is a prerequisite, as the entire 'pass by assignment' system is built on the idea that all data are objects.
- The behavior described here is a direct consequence of the [[Python - List Memory Model (Reference vs. Value)|list memory model]], which shows how multiple names can point to the same list object in memory.
## Questions

- Imagine you're leading a team of junior Python developers. A critical bug in production was traced back to a function unexpectedly modifying a list passed into it. How would you explain the root cause using the concepts of 'pass by assignment' and mutability, and what coding standards would you implement to prevent this entire class of errors in the future, balancing code safety with development speed?
- In a large-scale, multi-threaded data processing pipeline, how could a misunderstanding of Python's argument passing model (specifically with mutable objects like dictionaries) lead to subtle race conditions or data corruption? What architectural patterns or data structures would you use to ensure data integrity when passing complex state between concurrent processes?
- What if Python were to switch from 'pass by assignment' to a strict 'pass by value' model for all data types, similar to C? What fundamental Python idioms and popular libraries (like Pandas or NumPy) would break or need a complete redesign, and what would be the performance implications for large data structures?
