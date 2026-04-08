---
tags: 
  - core
  - python
  - backing_variable
  - private_attribute
  - name_mangling
  - property_convention
  - recursion_avoidance
  - concept
source: 
  - "[[Intermediate Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Property Decorator (@property)]]"
  - "[[Python - Descriptors]]"
  - "[[Python - Descriptor Setter Method]]"
  - "[[Python - Descriptor Getter Method]]"
  - "[[Python - Descriptor Deleter Method]]"
  - "[[Python - Creating Descriptors with @property Process]]"
  - "[[Python - Descriptors & Attribute Access Control Relationship]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Error Handling]]"
  - "[[Python - Scope]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Python - Decorators]]"
  - "[[Python - Class Methods]]"
---
# Core: Descriptor Backing Attribute Convention

## Summary

>The descriptor backing attribute convention is a standard Python practice where a public-facing attribute managed by a [[Python - Property Decorator (@property)|@property]] (e.g., `ssn`) uses a "private" internal attribute, typically prefixed with an underscore (e.g., `_ssn`), to actually store the data. The getter, setter, and deleter methods interact with this private, "backing" attribute to avoid accidentally re-triggering themselves and causing an infinite loop.

**Why This Matters:** This convention is the essential safeguard that prevents infinite recursion when implementing setter and deleter methods for managed attributes in Python.

_Analogy:_ _Think of a bank teller (the `@property` methods) and a secure vault (the `_ssn` backing attribute). When you want to deposit or withdraw money (set or get the `ssn` value), you don't go directly to the vault. You interact with the teller, who has the proper procedures and authorization to access the vault on your behalf. The public request (`my_account.ssn = ...`) goes to the teller (the setter method), and the teller then interacts with the vault (`self._ssn = ...`). Trying to access the vault from within the teller's own instructions would be like the teller telling themselves to go to the teller—a nonsensical, circular instruction._

The teller represents the `setter`/`getter` methods. The vault is the `_ssn` backing attribute. The customer's request is the public attribute access (`self.ssn`).

**Where it breaks down:** In Python, the "private" attribute (`_ssn`) is not truly private like a bank vault; it's accessible by convention, whereas a real vault is physically inaccessible to the public. The underscore is a hint to developers, not a lock.

```
External Code                |   Employee Instance
-----------------------------|--------------------------------
                             |
emp.ssn = "987654321"  ──────►  @ssn.setter(value)
                             |      │
                             |      └─(Validation Logic)
                             |      │
                             |      ▼
                             |   self._ssn = "987654321"
                             |
value = emp.ssn        ◄──────  @property (getter)
                             |      ▲
                             |      │
                             |   return self._ssn
```

## Details

When working with [[Python - Descriptors|descriptors]], particularly the [[Python - Property Decorator (@property)|@property decorator]], a crucial convention is to use a different name for the internal storage attribute versus the public-facing property. As the context highlights, inside a `setter` or `deleter` for a property named `ssn`, you must interact with `self._ssn`. If you were to reference `self.ssn` inside its own setter (e.g., `self.ssn = value`), you would trigger the setter again, leading to an infinite recursive loop and a `RecursionError`. The leading underscore (`_`) signals to other developers that this attribute is intended for internal use and is managed by the public property.

#### Primary Goal

To prevent infinite recursion by creating a separate, internal storage location for a property's value that can be accessed within the property's own methods without re-triggering them.

#### Mechanism

- **Step 1: The Problem - Infinite Recursion**
    - When a setter method for a property named `ssn` is defined, any assignment to `instance.ssn` will call this method.
    - If the code inside the setter itself tries to assign to `self.ssn`, it calls itself again, creating a loop that never ends until Python raises a `RecursionError`.
- **Step 2: The Solution - The Backing Attribute**
    - To break the loop, we introduce a separate, internal variable to hold the data, conventionally named with a leading underscore (e.g., `self._ssn`).
    - The public property (`ssn`) now acts as a controlled interface or gateway to this internal, or "backing," attribute.
- **Step 3: Implementing the Getter and Setter**
    - The [[Python - Descriptor Getter Method|getter]] for `ssn` is responsible for retrieving the value from `self._ssn`.
    - The [[Python - Descriptor Setter Method|setter]] for `ssn` performs its logic (e.g., validation) and then stores the final value in `self._ssn`, not `self.ssn`.

##### Code Translation

```python
class Employee:
    def __init__(self, name, ssn):
        self.name = name
        # Initialize the public property, which in turn calls the setter
        # to set the initial value of the backing attribute `_ssn`.
        self.ssn = ssn

    @property
    def ssn(self):
        """The getter for the ssn property."""
        print("Getting SSN from the backing attribute...")
        # --- Step 3: Getter reads from the backing attribute ---
        return self._ssn

    @ssn.setter
    def ssn(self, value):
        """The setter for the ssn property."""
        print("Setting SSN via the public interface...")
        # --- Step 1 (The Problem - What NOT to do) ---
        # If we did this, it would call this setter again, infinitely!
        # self.ssn = value  # <--- CAUSES RECURSION ERROR

        # --- Step 2 & 3 (The Solution) ---
        # Instead, we perform logic and then interact with the "private" backing attribute.
        if not isinstance(value, str) or len(value) != 9 or not value.isdigit():
            raise ValueError("SSN must be a 9-digit string.")
        self._ssn = value

# --- Usage ---
emp = Employee("John Doe", "123456789")

# Accessing emp.ssn triggers the getter, which reads from emp._ssn
print(f"Public SSN: {emp.ssn}")

# Assigning to emp.ssn triggers the setter, which writes to emp._ssn
emp.ssn = "987654321"
print(f"Updated Public SSN: {emp.ssn}")

# We can still access the backing attribute directly, but it's against convention
print(f"Backing attribute (direct access): {emp._ssn}")
```

 [[Code - Descriptor Backing Attribute Convention Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- This is a programming convention, not a function or class with configurable parameters. The key element is the naming pattern: a public name (e.g., `name`) and a corresponding internal name with a leading underscore (e.g., `_name`).

#### Core Trade-offs

- **Pro: Prevents Recursion**
    - This is the primary and most critical benefit. It provides a simple, reliable way to avoid `RecursionError` in setters and deleters.
- **Pro: Clear Intent**
    - The `_` prefix is a universally understood signal in the Python community that an attribute is intended for internal use and should not be modified directly.
- **Con: Convention, Not Enforcement**
    - Python does not enforce privacy. A developer can still access and modify `_ssn` directly, bypassing any validation or logic in the setter. This relies on developer discipline.
- **Con: Verbosity**
    - It adds a small amount of boilerplate code, as you always need two names (e.g., `ssn` and `_ssn`) to manage one piece of data.

## Connections

```
                      (Parent)
            Property Decorator (@property)
                       ▲
                       │
    ┌──────────────────┼──────────────────┐
    │                  │                  │
                      ┌──────────────────────────────────┐
                      │ Descriptor Backing Attribute...│
                      └──────────────────────────────────┘
```

### Parent Concept

This convention is a fundamental implementation detail required when using the [[Python - Property Decorator (@property)|@property decorator]] to create managed attributes.

### Child Concepts



### Related Concepts 

- The entire [[Python - Creating Descriptors with @property Process|process of creating descriptors with @property]] relies on this convention to function correctly.
- It is the core mechanism that allows the [[Python - Descriptor Setter Method|setter method]] and [[Python - Descriptor Deleter Method|deleter method]] to modify state without causing infinite loops.
- This technique is a key part of the relationship between [[Python - Descriptors & Attribute Access Control Relationship|descriptors and attribute access control]], providing a hook to manage internal state.
- The [[Python - Descriptor Getter Method|getter method]] also uses this convention to retrieve the value from the private backing store.
## Questions

- Imagine you're designing a class to handle sensitive financial data. The business requires strict validation on all data writes, but also needs high performance for read operations. How would you justify the overhead of using the property/backing attribute pattern for every single attribute, versus only for the most critical ones, to a project manager concerned about development speed and performance?
- If you have a class with dozens of properties all using this backing attribute convention, how might you refactor the code to reduce boilerplate, perhaps using a metaclass or a class decorator, and what are the potential risks of such an abstraction when debugging?
- What if Python's `__setattr__` method was modified to automatically detect and prevent recursive calls within a property's setter? What new programming patterns might emerge, and what existing problems with the current backing attribute convention would be solved or made worse?