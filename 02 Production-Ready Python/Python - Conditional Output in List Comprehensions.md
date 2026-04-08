---
tags: 
  - core
  - python
  - list_comprehension
  - ternary_operator
  - conditional_expression
  - python_one_liner
  - transformation
  - concept
source: 
  - "[[Python Toolbox]]"
related: 
  - "[[Python - Iteration]]"
  - "[[Python - Lists]]"
  - "[[Python - for Loop]]"
  - "[[Python - Conditional Statements]]"
  - "[[Python - Conditional Filtering in List Comprehensions]]"
  - "[[Python - Dictionary Comprehensions]]"
  - "[[Python - Advanced Comprehensions]]"
  - "[[Python - Modulo Operator]]"
  - "[[Python - Functions]]"
  - "[[Python - Lambda Functions]]"
  - "[[Python - Data Types]]"
  - "[[Python - Boolean Operators]]"
  - "[[Python - Tuples]]"
  - "[[Fundamental - Programming]]"
---
# Core: Conditional Output in List Comprehensions

## Summary

>Conditional output in a list comprehension uses an inline `if-else` statement (a ternary operator) on the *output expression* itself. Unlike [[Python - Conditional Filtering in List Comprehensions|conditional filtering]], which decides whether to include an element at all, this method processes *every* element from the source iterable and decides which of two possible transformations to apply to it before adding it to the new list.

**Why This Matters:** This technique allows you to transform every element in a list differently based on a condition, creating a new, modified list of the same size in a single, highly readable line of code.

_Analogy:_ _Imagine a quality control inspector on a factory assembly line. Every single product that comes down the belt reaches the inspector's station. The inspector doesn't throw any products away. Instead, for each product, they check if it meets a certain standard. If it passes, they apply a green 'Approved' sticker. If it fails, they apply a red 'Needs Review' sticker. The final bin contains the exact same number of products that started on the belt, but now each one has one of two possible labels._

**Where it breaks down:** The analogy is limited to applying one of two simple labels. In Python, the two outcomes of the conditional expression can be entirely different and complex calculations (e.g., squaring a number vs. cubing it), not just applying a static value.

```
Input Iterable: [item1, item2, item3, ...]
      │
      ▼
┌──────────────────────────────────────────┐
│ For each `item` in the iterable:         │
│                                          │
│      ┌──────────────────┐                │
│      │ Is condition true? │ ────── Yes ──► Apply `expression_if_true`
│      └─────────┬────────┘                │
│                │                         │
│                No                        │
│                │                         │
│                ▼                         │
│      Apply `expression_if_false`         │
│                                          │
└───────────────────│──────────────────────┘
                    │
                    ▼
         Append result to new list
```

## Details

The core idea is to embed decision-making directly into the value being created in a list comprehension. Instead of having a filter at the end of the statement that discards items, we place a ternary operator (`value_if_true if condition else value_if_false`) at the beginning. This ensures the output list will always have the same length as the input iterable, making it a tool for transformation rather than selection.

#### Primary Goal

To efficiently create a new list by applying one of two different transformations to each element of an input iterable, based on a condition.

#### Mechanism

- **Step 1: Define the Input Iterable**
    - Start with a list or any other iterable that you want to process.
- **Step 2: Write the Conditional Output Expression**
    - This is the core of the technique. Structure it as `expression_if_true if condition else expression_if_false`. This entire statement will be evaluated for each item in the iterable.
- **Step 3: Add the Loop Clause**
    - Follow the conditional expression with the standard `for item in iterable` syntax.
- **Step 4: Enclose in Brackets**
    - Wrap the entire statement in square brackets `[]` to signify that the result is a new list.

##### Code Translation

```python
# Goal: Create a new list from 'numbers'. If a number is even, square it.
# If it's odd, represent it as a negative number.

# --- Step 1: Define the Input Iterable ---
numbers = [1, 2, 3, 4, 5, 6]

# --- Steps 2, 3, 4: Construct the full comprehension ---
# The expression `num**2 if num % 2 == 0 else -num` is the conditional output.
# It is placed *before* the `for` loop.
# This contrasts with filtering, where `if` comes *after* the `for` loop.
transformed_list = [num**2 if num % 2 == 0 else -num for num in numbers]

print(f"Original list: {numbers}")
print(f"Transformed list: {transformed_list}")

# Expected Output:
# Original list: [1, 2, 3, 4, 5, 6]
# Transformed list: [-1, 4, -3, 16, -5, 36]
```

 [[Code - Conditional Output in List Comprehensions Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`expression_if_true`**: The value or calculation to be used for an element if the `condition` evaluates to `True`.
    - Example: In `[x**2 if x > 0 else 0 for x in nums]`, `x**2` is this expression.
- **`condition`**: The boolean test performed on each element of the iterable. It must evaluate to either `True` or `False`.
    - Example: In the code above, `x > 0` is the condition.
- **`expression_if_false`**: The value or calculation to be used for an element if the `condition` evaluates to `False`.
    - Example: In the code above, `0` is this expression.

#### Core Trade-offs

- **Pro: Conciseness and Readability**
    - For simple conditional transformations, this syntax is exceptionally clean and expresses the programmer's intent in a single, declarative line.
- **Con: Reduced Readability with Complexity**
    - If the condition or the output expressions become complex or nested, the one-liner can quickly become difficult to parse. In such cases, a traditional `for` loop with an `if/else` block is often more maintainable.
- **Limitation: No Filtering**
    - This structure always produces a list of the same length as the input. It cannot be used by itself to skip elements; for that, you must use [[Python - Conditional Filtering in List Comprehensions|conditional filtering]] or combine both techniques in [[Python - Advanced Comprehensions|advanced comprehensions]].

## Connections

```
                      (Parent)
                 Python - Iteration
                         ▲
                         │
    ┌────────────────────┼───────────────────────────┐
    │                    │                           │
(Contrast)      ┌───────────────────────────────────┐      (Related Concept)
Conditional     │ Conditional Output in List Comp.  │      Dictionary Comprehensions
Filtering       └───────────────────────────────────┘
                                                           (Commonly Used In)
                                                           Modulo Operator
```

### Parent Concept

This concept is a powerful technique within the broader topic of [[Python - Iteration]], offering a compact alternative to a standard `for` loop for element-wise transformation.

### Related Concepts 

- This method directly **contrasts with** [[Python - Conditional Filtering in List Comprehensions|conditional filtering]], which selectively includes or excludes elements rather than transforming every one.
- The same principle of inline conditional logic can be applied to create dictionaries, as seen in [[Python - Dictionary Comprehensions]].
- A common tool used within the conditional expression is the [[Python - Modulo Operator|modulo operator]], which is perfect for checking properties like even or odd.
- For more complex scenarios, this transformation technique can be combined with filtering to create powerful [[Python - Advanced Comprehensions|advanced comprehensions]].
## Questions

- Imagine you're processing a list of user transaction amounts. You need to create a new list where amounts over $1000 are labeled 'high_value' and all others are labeled 'standard'. A list comprehension is concise, but a standard `for` loop might be easier for a junior developer to debug. How would you decide which to use, and how would you justify the potential long-term maintenance cost of the more 'clever' solution to your project manager?
- If you were to apply a conditional output comprehension to a generator that yields billions of records from a massive file, what is the primary memory-related risk, and how would you refactor the code using a generator expression to mitigate this risk entirely?
- What if the ternary operator (`... if ... else ...`) was removed from Python? How could you replicate the functionality of a conditional output list comprehension in a single line of code, perhaps using boolean arithmetic or dictionary lookups?