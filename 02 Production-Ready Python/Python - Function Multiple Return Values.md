---
tags: 
  - core
  - python
  - multiple returns
  - function output
  - tuple packing
  - unpacking
  - return statement
  - concept
source: 
  - "[[Introduction to Functions in Python]]"
related: 
  - "[[Python - Tuples]]"
  - "[[Python - Tuple Unpacking]]"
  - "[[Python - User-Defined Functions]]"
  - "[[Python - Functions]]"
  - "[[Python - Tuples & Multiple Return Values Relationship]]"
  - "[[Python - Tuple Construction]]"
  - "[[Python - Tuple Immutability]]"
  - "[[Python - Data Types]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Multiple Function Parameters]]"
  - "[[Python - Tuples vs Lists]]"
---
# Core: Multiple Return Values

## Summary

>In Python, functions are not limited to returning a single value. By leveraging the power of [[Python - Tuples|tuples]], a function can return multiple, related results packaged together. When a `return` statement is followed by a comma-separated list of values, Python automatically creates a tuple containing those values. The calling code can then receive this tuple and, often, use [[Python - Tuple Unpacking|tuple unpacking]] to assign the individual values to separate variables, making the process feel seamless.

**Why This Matters:** Returning multiple values allows a function to efficiently bundle and deliver several related pieces of information in a single call, making code more expressive and avoiding the need for global variables or complex data structures.

_Analogy:_ _Think of a function as a specialized coffee shop barista. If you just order a single espresso, the barista hands you one cup. This is like a function returning a single value. But if you order a 'Breakfast Combo', the barista doesn't hand you a coffee, then a muffin, then a napkin in three separate transactions. Instead, they place all the items on a single tray and hand you the tray. The tray is the tuple, bundling multiple items (return values) into one convenient package for you to take back to your table._

The tray is the tuple, the individual items (coffee, muffin) are the return values, and you receiving the tray and taking the items off it is like the calling code unpacking the tuple into separate variables.

*   **Where it breaks down:** Unlike a coffee tray where you can take items in any order, the order of values in a returned tuple is fixed and crucial. The calling code must unpack the values in the same sequence they were packed by the function.

```
Function Call: raise_both(2, 3)

    │
    ▼
┌───────────────────────────┐
│   def raise_both(v1, v2):  │
│     r1 = v1 ** v2  # r1 = 8 │
│     r2 = v2 ** v1  # r2 = 9 │
│     return r1, r2          │
└───────────────────────────┘
    │
    ▼
  (8, 9)  <-- A single tuple object is returned
    │
    ▼
┌───────────────────────────┐
│  pow1, pow2 = (8, 9)      │  <-- Tuple Unpacking
└───────────────────────────┘
    │
    ├─► pow1 gets 8
    │
    └─► pow2 gets 9
```

## Details

The core idea is to enhance the capability of a function beyond outputting a single result. As seen in the exercise of modifying a `raise` function, instead of choosing between returning `value1 ** value2` or `value2 ** value1`, we can return both. Python facilitates this by automatically packaging comma-separated values in a `return` statement into a tuple. This mechanism is a fundamental aspect of writing efficient and 'Pythonic' code, allowing a single operation to report multiple outcomes, such as a result and a status, or multiple calculated metrics.

#### Primary Goal

To enable a function to output several related values simultaneously, packaged neatly as a single tuple object.

#### Mechanism

- **Step 1: Define the Function**
    - Create a standard function definition with `def`, a function name, and parameters. For this example, we'll create `raise_both` which takes two arguments, `value1` and `value2`.
- **Step 2: Perform Calculations**
    - Inside the function, perform all the necessary calculations and store the results in local variables. Here, we'll calculate `value1` to the power of `value2` and vice-versa.
- **Step 3: Package Results into a Tuple**
    - Construct a tuple containing the results from the previous step. This can be done explicitly using parentheses `(result1, result2)` or, more commonly, implicitly by just separating the values with a comma `result1, result2`.
- **Step 4: Return the Tuple**
    - Use a single `return` statement followed by the tuple (or the comma-separated values that will form the tuple).
- **Step 5: Call and Unpack**
    - When you call the function, you can assign its single tuple output to one variable, or you can use [[Python - Tuple Unpacking|tuple unpacking]] to assign the tuple's elements to multiple variables directly. The number of variables on the left side of the assignment must match the number of values returned by the function.

##### Code Translation

```python
# --- Step 1: Define the Function ---
def raise_both(value1, value2):
    """Raises value1 to the power of value2 and vice versa."""
    
    # --- Step 2: Perform Calculations ---
    result1 = value1 ** value2
    result2 = value2 ** value1
    
    # --- Step 3 & 4: Package and Return the Tuple ---
    # Python automatically creates a tuple from comma-separated values
    return result1, result2

# --- Step 5: Call and Unpack ---
# The function returns a single tuple, which is then unpacked
# into two separate variables: pow1 and pow2.
pow1, pow2 = raise_both(2, 3)

print(f"2 to the power of 3 is: {pow1}")
print(f"3 to the power of 2 is: {pow2}")

# You can also assign the entire tuple to a single variable
result_tuple = raise_both(2, 3)
print(f"The returned tuple is: {result_tuple}")
```

 [[Code - Multiple Return Values Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Order of Values**
    - The order in which you list the variables in the `return` statement dictates the order of elements in the resulting tuple. This order is critical for the consumer of the function, who must unpack the values in the same sequence.
- **Number of Values**
    - A function can return any number of values. However, returning a very large number of values (e.g., more than 3 or 4) can harm code readability. In such cases, it might be better to return a dictionary or a custom object.

#### Core Trade-offs

- **Pro: Expressiveness and Efficiency**
    - It allows a function to communicate multiple related outputs cleanly without resorting to modifying mutable arguments or using global variables. It's a direct and clear way to express that an operation produces several results.
- **Con: Tight Coupling and Readability**
    - The calling code must know the exact number and order of the returned values to unpack them correctly. If the function's return signature changes (e.g., a new value is added), all calls that unpack the results will break. This creates a tight coupling.
    - Returning too many values can make it difficult to remember what each returned element represents, reducing code clarity.

## Connections

```
                      (Parent)
              User-Defined Functions
                         ▲
                         │
           ┌─────────────┼─────────────┐
           │             │             │
(Mechanism For) ┌───────────────────────────┐ (Consumed By)
     Tuples     │   Multiple Return Values  │ Tuple Unpacking
                └───────────────────────────┘
```

### Parent Concept

This concept is a specific feature within the broader topic of [[Python - User-Defined Functions|user-defined functions]], defining how they can output information.

### Related Concepts 

- The core mechanism enabling multiple return values is the [[Python - Tuples|tuple]], which acts as the container for the returned data.
- The primary way to consume multiple return values is through [[Python - Tuple Unpacking|tuple unpacking]], which assigns the elements of the returned tuple to individual variables.
- The intimate link between these concepts is explored in detail in [[Python - Tuples & Multiple Return Values Relationship|the relationship between tuples and multiple return values]].
- This contrasts with functions that accept [[Python - Multiple Function Parameters|multiple function parameters]], which deals with function *input* rather than *output*.
- Because tuples are immutable, this feature provides a safe way to return multiple pieces of data without allowing the calling code to modify the original container, a key aspect of [[Python - Tuple Immutability|tuple immutability]].
## Questions

- How would you decide between a function returning a tuple of 5 values versus returning a single dictionary or a custom data class, especially when considering long-term code readability and maintainability for a growing engineering team?
- In a production data processing pipeline, a key function returns multiple calculated metrics as a tuple. How would you design the downstream components to be robust against future changes where a new metric might be added to the function's return values?
- What if Python's `return` statement was strictly limited to a single object, and tuples didn't exist? How would you refactor a function that logically needs to output both a primary result and a status code (e.g., 'success', 'error', 'warning')?