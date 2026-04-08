---
tags:
  - visual-analysis
---

# 

**Why This Matters:** The `__setattr__` method is crucial for creating robust and predictable objects by allowing developers to enforce rules, such as type validation, every time an attribute's value is assigned or changed.


> [!info] Info
> 

---

## The Example


**Visual Evidence Identified:**


---

## Deconstruction & Analysis
*How this example demonstrates the concept:*

```python
class Student:
    def __init__(self, student_name, major):
        self.student_name = student_name
        self.major = major

    # --- Step 1: Define the __setattr__ method --- 
    # This method is automatically called on every attribute assignment.
    def __setattr__(self, name, value):
        
        # --- Step 2: Implement custom logic (type validation) ---
        # Check if the value being assigned is a string.
        if isinstance(value, str):
            print(f"Setting {name} = {value}")
            
            # --- Step 3: Set the attribute, avoiding recursion ---
            # Directly modify the object's namespace via its __dict__.
            # Using `self.name = value` here would cause an infinite loop.
            self.__dict__[name] = value
        
        # --- Step 4: Handle failure cases ---
        else: 
            # If the value is not a string, raise an exception.
            raise Exception("Unexpected data type!")

# --- Demonstration ---
karina = Student("Karina", "Data Science")

# This assignment succeeds because the value is a string
karina.residence_hall = "Honors College South"
# Output:
# Setting student_name = Karina
# Setting major = Data Science
# Setting residence_hall = Honors College South

# This assignment fails and raises an exception
try:
    karina.student_id = 19301872
except Exception as e:
    print(f"\nError: {e}")
    # Output: Error: Unexpected data type!
```



---

## Core Takeaway
*The general principle proved by this example:*

