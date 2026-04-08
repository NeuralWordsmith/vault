---
tags: 
  - relationship
  - python
  - descriptor_protocol
  - attribute_access
  - managed_attributes
  - metaprogramming
  - __get__
  - concept
source: 
  - "[[Intermediate Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Property Decorator (@property)]]"
  - "[[Python - Descriptor Getter Method]]"
  - "[[Python - Descriptor Setter Method]]"
  - "[[Python - Descriptor Deleter Method]]"
  - "[[Python - Descriptor Naming Convention (_attribute)]]"
  - "[[Python - Creating Descriptors with @property Process]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Decorators]]"
  - "[[Python - Functions as First-Class Objects]]"
  - "[[Python - Scope]]"
  - "[[Python - Objects]]"
  - "[[Python - dunder methods]]"
  - "[[SWE - Encapsulation]]"
  - "[[Python - Class Methods]]"
---
# Relationship: Descriptors

**Why This Matters:** Descriptors provide a powerful, reusable way to control attribute access, enabling complex validation, logic, and security checks to be encapsulated cleanly within a class.
## The Relationship Defined

**Type:** Implementation

> In Python, a descriptor is an object attribute that has its access behavior controlled by methods in the descriptor protocol: `__get__()`, `__set__()`, and `__delete__()`. When we need to manage how an attribute is accessed—like validating a student's SSN for a specific format or preventing it from being read directly—we can create a separate class that implements these methods. By assigning an instance of this descriptor class to a class attribute, we intercept any attempts to get, set, or delete that attribute, redirecting those operations to our custom logic. This is the powerful, underlying mechanism that makes tools like the more user-friendly [[Python - Property Decorator (@property)|@property decorator]] possible.

_Analogy:_ _Think of a descriptor as a high-security receptionist for a VIP's office (the object's attribute). The receptionist doesn't just let anyone see, talk to, or remove the VIP. They have a strict protocol: they check your credentials before letting you *see* the VIP (`__get__`), they vet any messages or packages you want to *give* to the VIP (`__set__`), and they handle the formal process if the VIP needs to be *removed* from their position (`__delete__`). You never interact with the VIP directly; you always go through the receptionist._

-
- **VIP's Office:** The main class (e.g., `Student`).
- **The VIP:** The sensitive attribute being protected (e.g., `ssn`).
- **The Receptionist:** The descriptor class.
- **Checking Credentials (Seeing the VIP):** The `__get__` method.
- **Vetting Messages (Giving to the VIP):** The `__set__` method.
- **Formal Removal Process:** The `__delete__` method.
- **Where it breaks down:** A real receptionist is a separate person. In Python, the descriptor is part of the class's definition itself, more like a built-in security system for a specific office door rather than a separate entity. The descriptor's logic is defined once and applies to all instances of the class.

## Mechanism of Interaction

Descriptors are a low-level language feature that provides the underlying mechanism for implementing many core concepts in Python's [[Python - Object-Oriented Programming (OOP)|object-oriented model]]. When an attribute of a class is a descriptor, Python's attribute lookup process (`object.__getattribute__`) intercepts the access and invokes the descriptor's methods (`__get__`, `__set__`, etc.) instead of performing a standard dictionary lookup.

### Implementation Proof

```python
import re

# --- Step 1: Define the Descriptor Class ---
# This class will manage the 'ssn' attribute.
class SSN:
    def __init__(self):
        # Using a private name to store the actual value in the instance's dict
        self.private_name = '_ssn'

    # --- Step 3: Implement the Getter Logic ---
    def __get__(self, instance, owner):
        if instance is None:
            return self
        # Retrieve the value from the instance's __dict__
        value = instance.__dict__.get(self.private_name, None)
        if value is None:
            return None
        # Return a masked version for security
        return f'***-**-{value[-4:]}'

    # --- Step 2: Implement the Setter Logic ---
    def __set__(self, instance, value):
        # Validate the format using a regular expression
        if not re.match(r'^\d{3}-\d{2}-\d{4}$', value):
            raise ValueError("Invalid SSN format. Must be '###-##-####'.")
        # If valid, store the actual value in the instance's __dict__
        instance.__dict__[self.private_name] = value

    # --- Step 4: Implement the Deleter Logic ---
    def __delete__(self, instance):
        print(f"Deleting SSN for {instance.name}...")
        if self.private_name in instance.__dict__:
            del instance.__dict__[self.private_name]

# --- Step 5: Instantiate the Descriptor in the Owner Class ---
class Student:
    # 'ssn' is now a managed attribute, controlled by the SSN descriptor
    ssn = SSN()

    def __init__(self, name, ssn_value):
        self.name = name
        self.ssn = ssn_value # This automatically calls SSN.__set__()

# --- Demonstration ---
student1 = Student('John Doe', '123-45-6789')

# Accessing the attribute calls SSN.__get__()
print(f"Student: {student1.name}, SSN: {student1.ssn}") # Output: Student: John Doe, SSN: ***-**-6789

# Trying to set an invalid SSN calls SSN.__set__() and raises an error
try:
    student1.ssn = '999-999-9999'
except ValueError as e:
    print(f"Error: {e}") # Output: Error: Invalid SSN format. Must be '###-##-####'.

# Deleting the attribute calls SSN.__delete__()
del student1.ssn # Output: Deleting SSN for John Doe...
```

## Implications & Impact

This allows for 'managed attributes' where simple attribute access (e.g., `student.ssn = '...'`) can trigger complex validation, computation, or security logic, making code cleaner and more robust without requiring explicit method calls.

## Key Connections

- The process of creating a descriptor is often simplified by following the [[Python - Creating Descriptors with @property Process|process for using the @property decorator]], which provides a more readable syntax.
- When implementing a descriptor's setter, it's crucial to follow the [[Python - Descriptor Naming Convention (_attribute)|naming convention for private attributes]] to store the actual value and avoid infinite recursion.
- Descriptors are a fundamental concept that underpins how [[Python - Class Methods|class methods]] and static methods work internally.

## Deeper Questions

- Imagine you're building a system for a hospital. You could use descriptors to create a 'read-only' attribute for a patient's medical record ID after it's been set once. What are the business risks if you *don't* implement this, and how would you justify the development time to a project manager who sees it as 'just a simple field'?
- If you have a class with 20 attributes that all need similar validation logic (e.g., must be a positive integer), would you write 20 separate descriptor classes, or is there a more scalable, reusable design pattern you could implement using descriptors? How would this design affect memory usage for a million instances of the class?
- What if the descriptor protocol didn't exist in Python? How would you implement the functionality of `@property` (getters, setters, deleters) for the `ssn` attribute using only standard methods and functions? What would be the major drawbacks of your alternative implementation?