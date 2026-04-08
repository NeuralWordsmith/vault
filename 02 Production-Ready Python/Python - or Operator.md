---
tags:
  - core
  - python
  - logical operator
  - boolean logic
  - control flow
  - short-circuiting
  - condition
  - concept
source:
  - "[[Intermediate Python]]"
related:
  - "[[Python - Boolean Operators]]"
  - "[[Python - and Operator]]"
  - "[[Python - not Operator]]"
  - "[[Python - Data Types]]"
  - "[[Python - Variables]]"
  - "[[Fundamental - Programming]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - numpy.logical_or]]"
  - "[[Python - numpy.logical_and]]"
  - "[[Python - numpy.logical_not]]"
  - "[[Python - Boolean Operators on NumPy Arrays]]"
  - "[[Python - Subsetting NumPy Arrays]]"
  - "[[Python - Subsetting NumPy Arrays with Boolean Arrays 1]]"
  - "[[Python - Control Flow]]"
  - "[[Python - if Statement]]"
---
# Core: or Operator

## Summary

>The `or` operator is a logical operator in Python that evaluates to `True` if at least one of its operands is `True`. It only returns `False` when all of its operands are `False`. It is a key component of the broader set of [[Python - Boolean Operators]].

**Why This Matters:** The `or` operator is fundamental for creating flexible conditions in programs, allowing code to execute when *any one* of several criteria is met, which is essential for handling diverse inputs and states.

_Analogy:_ _Imagine you're trying to get into a club that has two entry requirements: you must either be on the guest list OR be a member. You don't need both; just one is enough to get in. The bouncer (the `or` operator) checks your status. If you're on the guest list (`True`), you get in. If you're a member (`True`), you get in. If you're both (`True` and `True`), you still get in. The only way you're turned away (`False`) is if you are neither on the guest list nor a member (`False` and `False`)._

**Where it breaks down:** The analogy implies a sequential check, but Python's `or` operator uses 'short-circuiting'. If the first condition (being on the guest list) is `True`, it doesn't even bother checking the second (being a member), because the outcome is already determined. The bouncer, in reality, might check both for thoroughness.

```
Truth Table for 'or'
+---------+---------+----------+
|    A    |    B    |  A or B  |
+---------+---------+----------+
|  True   |  True   |   True   |
|  True   |  False  |   True   |
|  False  |  True   |   True   |
|  False  |  False  |   False  |
+---------+---------+----------+
```

## Details

The `or` operator is a fundamental logical tool in Python used to combine boolean expressions. It works by checking if *at least one* of the conditions it connects is `True`. For instance, `True or False` evaluates to `True`, as does `True or True`. The only scenario where it results in `False` is when both sides of the operator are `False`. This allows for creating flexible logic, such as checking if a variable `y` (e.g., equal to 5) is less than 7 *or* greater than 13, which would be `True` because the first part of the condition is met. It is one of the three core [[Python - Boolean Operators]], alongside the [[Python - and Operator]] and [[Python - not Operator]].

#### Primary Goal

To evaluate if at least one of multiple conditions is true, providing a way to create more inclusive logical checks.

#### Mechanism

- **Step 1: Evaluate the Left Operand**
    - The Python interpreter first looks at the expression on the left side of the `or` keyword.
- **Step 2: Perform Short-Circuit Check**
    - If the left operand evaluates to `True`, the interpreter immediately stops and returns `True` without ever looking at the right operand. This is called short-circuiting.
- **Step 3: Evaluate the Right Operand (If Necessary)**
    - If and only if the left operand was `False`, the interpreter then evaluates the expression on the right side of the `or`.
- **Step 4: Return the Final Result**
    - The result of the right-side evaluation (`True` or `False`) becomes the final result of the entire `or` expression.

##### Code Translation

```python
# --- Example Data ---
y = 5

# --- Step 1 & 2: Evaluate Left Operand and Short-Circuit ---
# The left side (y < 7) is True.
# Python stops here and returns True without checking the right side.
result1 = (y < 7) or (y > 13) 
print(f"Is y < 7 or y > 13? {result1}")

# --- Step 3 & 4: Evaluate Right Operand (if necessary) ---
# The left side (y > 10) is False.
# Python must now evaluate the right side (y < 6), which is True.
# The final result is True.
result2 = (y > 10) or (y < 6)
print(f"Is y > 10 or y < 6? {result2}")

# --- Case where both are False ---
# The left side (y > 10) is False.
# The right side (y < 3) is also False.
# The final result is False.
result3 = (y > 10) or (y < 3)
print(f"Is y > 10 or y < 3? {result3}")
```

 [[Code - or Operator Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Left Operand**
    - The expression to the left of the `or` keyword. It is always evaluated.
- **Right Operand**
    - The expression to the right of the `or` keyword. It is only evaluated if the left operand is `False`.

#### Core Trade-offs

- **Pro: Efficiency (Short-Circuiting)**
    - The `or` operator is efficient because it stops evaluating as soon as it finds a `True` condition. This can prevent unnecessary computations, especially if the right-hand expression is complex or time-consuming.
- **Con: Potential for Unexecuted Code**
    - A potential pitfall of short-circuiting is that any function call or operation on the right side of the `or` will *not* execute if the left side is `True`. This can lead to subtle bugs if the programmer expected the right-side code to always run.

## Connections

```
                  (Parent)
               Boolean Operators
                       ▲
                       │
       ┌───────────────┼────────────────┐
       │               │                │
 (Contrast)     ┌──────────────┐    (Contrast)
  and Operator  │  or Operator │    not Operator
                └──────────────┘
                       │
                       │
              (Equivalent in NumPy)
                 numpy.logical_or
```

### Parent Concept

The `or` operator is one of the three fundamental [[Python - Boolean Operators|boolean operators]] used to construct logical expressions in Python.

### Child Concepts

- There are no direct children, but its functionality is mirrored in other libraries. For example, [[Python - numpy.logical_or|numpy.logical_or]] provides an element-wise `or` operation for NumPy arrays.

### Related Concepts 

- It provides an inclusive condition, which **contrasts with** the strict, exclusive condition required by the [[Python - and Operator|and operator]].
- The [[Python - not Operator|not operator]] is often used in conjunction with `or` to invert the logic of a sub-expression, such as `not (A or B)`.
- When working with arrays, the `or` operator's logic is essential for [[Python - Subsetting NumPy Arrays with Boolean Arrays 1|boolean array subsetting]] to select elements that meet one of several criteria.
## Questions

- You're filtering a customer database for a marketing campaign. The criteria are 'customers who have spent over $1000' OR 'customers who have made more than 10 purchases'. The first check is a fast database query, but the second requires a slow, complex calculation. How would you structure your `or` condition to maximize performance, and how would you explain the business impact of this optimization (e.g., faster campaign launches) to a product manager?
- Imagine this `or` condition is part of a real-time fraud detection system where the right-hand side of the `or` calls a third-party API to check a transaction's risk score. What are the system-level risks of this design due to short-circuiting, and how would you build in redundancy or fallbacks if the API call on the right side fails or times out?
- What if Python's `or` operator did *not* use short-circuit evaluation and always evaluated both operands? Describe a specific scenario where this change would introduce a critical bug into a previously working program, and another scenario where it might actually be beneficial.