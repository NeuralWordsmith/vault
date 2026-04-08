---
tags: 
  - core
  - python
  - property decorator
  - getter
  - setter
  - deleter
  - managed attributes
  - concept
source: 
  - "[[Intermediate Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Descriptors]]"
  - "[[Python - Decorators]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Descriptor Getter Method]]"
  - "[[Python - Descriptor Setter Method]]"
  - "[[Python - Descriptor Deleter Method]]"
  - "[[Python - Descriptor Naming Convention (_attribute)]]"
  - "[[Python - Descriptors & Attribute Access Control Relationship]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Python - Functions]]"
  - "[[Python - Class Methods]]"
  - "[[Python - Encapsulation]]"
---
# Core: Creating Descriptors with @property

## Summary

>The `@property` decorator is a Pythonic tool used to turn a class method into a 'getter' for a property, creating a managed attribute. It allows you to intercept attribute access, modification, and deletion by defining specific 'getter', 'setter', and 'deleter' methods, making the attribute behave like a regular one from the outside while having controlled logic on the inside.

**Why This Matters:** Using the @property decorator is the industry-standard, most readable way to implement attribute access control in Python, leading to cleaner, more maintainable, and less error-prone object-oriented code.

_Analogy:_ _Think of a managed attribute as a high-security bank vault (the actual data, like `_ssn`). You, the client, cannot just walk into the vault. You must go through a specific bank teller (the `@property`). This teller has a strict set of procedures: one for when you want to 'get' your balance (the getter), another for when you want to 'set' a new deposit (the setter), and a third for when you want to 'delete' your account (the deleter). You interact with the teller using a simple name (like `account.balance`), but the teller handles all the complex, secure logic behind the counter._

The teller is the `@property` decorator and its associated setter/deleter. The vault is the private backing attribute (e.g., `self._ssn`). Your request is the attribute access (e.g., `student.ssn`). The teller's procedures are the getter, setter, and deleter methods. **Where it breaks down:** In Python, the 'private' attribute isn't truly inaccessible like a bank vault; it's just a convention. A determined programmer can still access `_ssn` directly, bypassing the teller.

```
Client Interaction         Python's Interpretation         Method Called
------------------         -----------------------         -------------------
`value = obj.attr`   ───>    Attribute Read Access   ───>   `@property` getter

`obj.attr = value`   ───>    Attribute Write Access  ───>   `@attr.setter`

`del obj.attr`       ───>    Attribute Delete Access ───>   `@attr.deleter`
```

## Details

In Python, while there are several ways to create [[Python - Descriptors|descriptors]], the `@property` decorator is the most common and idiomatic approach. It provides a clean syntax to bundle the 'getter', 'setter', and 'deleter' logic for a single attribute directly within the class definition. This is achieved by decorating three methods that all share the same name as the public attribute they manage. This approach elegantly enforces the [[Python - Descriptors & Attribute Access Control Relationship|relationship between descriptors and access control]], making code more intuitive than using the `property()` function or implementing the full descriptor protocol with magic methods.

#### Primary Goal

To provide a simple, readable, and declarative syntax for creating managed attributes (descriptors) that control how a class attribute's value is accessed, modified, and deleted.

#### Mechanism

- **Step 1: Define the Getter Method**
    - Create a method with the same name as the public attribute you want to expose (e.g., `ssn`).
    - Decorate this method with `@property`. This method will be called automatically whenever the attribute is accessed (e.g., `print(student.ssn)`). This is the core [[Python - Descriptor Getter Method|getter method]].
- **Step 2: Define the Setter Method (Optional)**
    - Create another method with the *exact same name*.
    - Decorate it with `@<attribute_name>.setter` (e.g., `@ssn.setter`). This method must accept `self` and a `value` to be assigned.
    - Inside this [[Python - Descriptor Setter Method|setter method]], you typically store the incoming value in a 'private' backing variable, following the [[Python - Descriptor Naming Convention (_attribute)|naming convention]] (e.g., `self._ssn = new_ssn`).
- **Step 3: Define the Deleter Method (Optional)**
    - Create a third method, again with the *exact same name*.
    - Decorate it with `@<attribute_name>.deleter` (e.g., `@ssn.deleter`). This [[Python - Descriptor Deleter Method|deleter method]] defines the behavior when `del` is called on the attribute (e.g., `del student.ssn`).

##### Code Translation

```python
class Student:
    def __init__(self, name, ssn):
        self.name = name
        # The initial assignment here calls the setter method below
        self.ssn = ssn

    # --- Step 1: Define the Getter ---
    @property
    def ssn(self):
        """The 'ssn' property getter. Masks the SSN.
        This is called when you access `student.ssn`.
        """
        # Note: It accesses the 'private' _ssn attribute
        return f"XXX-XX-{self._ssn[-4:]}"

    # --- Step 2: Define the Setter ---
    @ssn.setter
    def ssn(self, new_ssn):
        """The 'ssn' property setter. Stores the value.
        This is called when you assign `student.ssn = '...'`.
        """
        # It stores the actual value in a 'private' attribute
        self._ssn = new_ssn

    # --- Step 3: Define the Deleter ---
    @ssn.deleter
    def ssn(self):
        """The 'ssn' property deleter. Prevents deletion.
        This is called when you run `del student.ssn`.
        """
        raise AttributeError("The 'ssn' attribute cannot be deleted.")

# --- Usage ---
student = Student("John Doe", "123-45-6789")

# Accessing the attribute calls the getter
print(student.ssn)  # Output: XXX-XX-6789

# Assigning to the attribute calls the setter
student.ssn = "987-65-4321"

# Accessing again shows the new masked value
print(student.ssn)  # Output: XXX-XX-4321

# Trying to delete calls the deleter
# del student.ssn  # Raises AttributeError: The 'ssn' attribute cannot be deleted.
```

 [[Code - Creating Descriptors with @property Implementation|View Full Implementation & Analysis]]

#### Key Parameters



#### Core Trade-offs

- **Pro: Readability and Colocation**
    - The `@property` syntax is highly declarative and easy to read. It keeps the logic for getting, setting, and deleting an attribute grouped together within the class, making the code easier to understand and maintain.
- **Pro: Ease of Use**
    - It's the simplest way to add managed behavior to an existing attribute. You can start with a simple public attribute and later add `@property` logic without changing the class's public API, meaning code that uses the class doesn't need to be refactored.
- **Con: Limited Reusability**
    - The logic defined within `@property` methods is tied to that specific class. If you need to apply the same validation or transformation logic to attributes across many different classes, a separate, reusable descriptor class is a better choice to avoid violating the [[SWE - DRY (Don't Repeat Yourself) Principle|DRY principle]].

## Connections

```
                      (Parent)
                 Python - Descriptors
                         ▲
                         │
         ┌───────────────┼───────────────────────────┐
         │               │                           │
(Foundation)    ┌───────────────────────────────────┐    (Mechanism)
Decorators      │ Creating Descriptors with @property │    Attribute Access Control
                └───────────────────────────────────┘
                                 │
                      ┌──────────┴──────────┐
                      │                     │
            Descriptor Getter      Descriptor Setter
                                  & Deleter Methods
```

### Parent Concept

The `@property` decorator is the most common and Pythonic technique for implementing [[Python - Descriptors|descriptors]], which are objects that customize attribute access.

### Child Concepts

- The primary component is the [[Python - Descriptor Getter Method|descriptor getter method]], which is defined by decorating a method with `@property`.
- An optional component is the [[Python - Descriptor Setter Method|descriptor setter method]], which is created using the `@<attribute>.setter` decorator to control attribute assignment.
- Another optional component is the [[Python - Descriptor Deleter Method|descriptor deleter method]], established with `@<attribute>.deleter` to manage attribute deletion.

### Related Concepts 

- This entire process is a practical application of the [[Python - Decorators|decorator]] design pattern.
- The use of a leading underscore in the backing variable (e.g., `_ssn`) follows the [[Python - Descriptor Naming Convention (_attribute)|descriptor naming convention]] to signal that it's intended for internal use.
- Fundamentally, `@property` is a high-level abstraction for managing the [[Python - Descriptors & Attribute Access Control Relationship|relationship between descriptors and attribute access control]].
## Questions

- You're refactoring a legacy codebase where sensitive data like a user's credit score is stored as a public attribute. The business requires logging every time this score is accessed or modified. Would you use `@property` or a full descriptor class, and how would you justify the development time trade-off to a project manager?
- Imagine a class with 20 attributes that all require the same complex validation logic (e.g., must be a positive integer within a specific range). How would using `@property` for all 20 attributes create a code maintenance problem, and what alternative design pattern would be more scalable?
- What if Python's `@property` decorator didn't exist? How would you replicate its exact syntax and functionality for creating getters and setters using only metaclasses and the `property()` built-in function?