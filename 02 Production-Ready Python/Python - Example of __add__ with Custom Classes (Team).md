---
tags:
  - visual-analysis
---

# Python - Example of __add__ with Custom Classes (Team)

**Why This Matters:** Operator overloading allows your custom objects to use standard Python operators like `+` and `-`, making your code more intuitive and readable.


> [!info] Info
> In this example, we examine how to combine two custom 'Team' objects. Instead of creating a separate function to merge them, we've defined a custom behavior for the `+` operator, allowing us to 'add' a `rookies` team and a `veterans` team to form a new `dream_team`.

---

## The Example
![[Pasted image 20260225145610.png]]

**Visual Evidence Identified:**
- The first code block initializes two `Team` objects: `rookies` with ['Casey', 'Emmitt'] and `veterans` with ['Mike', 'Chuck'].
- The second code block demonstrates using the `+` operator on these two custom objects: `dream_team = rookies + veterans`.
- The final output block shows the result: the `dream_team` is of type 'Team' and its `team_members` attribute contains a single list with all four names combined.

---

## Deconstruction & Analysis
*How this example demonstrates the concept:*

```python
# Create two Team objects
rookies = Team(["Casey", "Emmitt"])
veterans = Team(["Mike", "Chuck"])

# Attempt to add these two Teams together
dream_team = rookies + veterans

print(type(dream_team))
print(dream_team.team_members)
```

### **Step 1: Instantiation**
Two separate instances of the `Team` class are created. The `rookies` object is initialized with a list of two names, and the `veterans` object is initialized with another list of two names.

### **Step 2: Invoking the Overloaded Operator**
The line `dream_team = rookies + veterans` uses the addition operator (`+`) on the two `Team` objects. Normally, this would raise a `TypeError` for custom objects. However, because the `Team` class has been designed to handle this operation (via a special method like `__add__`), Python knows exactly what to do: combine the member lists.

### **Step 3: Verifying the Result**
The output confirms the operation was successful. `print(type(dream_team))` shows the result is a new `Team` object, not just a plain list. `print(dream_team.team_members)` displays the new object's internal list, which correctly contains the members from both the `rookies` and `veterans` objects, in order.

---

## Core Takeaway
*The general principle proved by this example:*

This example visually proves the power of operator overloading in object-oriented programming. By defining how a standard operator like `+` should behave for a custom class, we can write highly expressive and readable code that treats our own objects with the same syntactic elegance as Python's built-in types.