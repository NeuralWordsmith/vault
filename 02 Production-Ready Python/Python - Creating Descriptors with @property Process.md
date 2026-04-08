---
tags: 
  - process
  - python
  - property
  - getter
  - encapsulation
  - managed_attributes
  - uniform_access
  - concept
source: 
  - "[[Intermediate Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Descriptors]]"
  - "[[Python - Decorators]]"
  - "[[Python - Descriptor Getter Method]]"
  - "[[Python - Descriptor Setter Method]]"
  - "[[Python - Descriptor Deleter Method]]"
  - "[[Python - Descriptors & Attribute Access Control Relationship]]"
  - "[[Python - Descriptor Naming Convention (_attribute)]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Class Methods]]"
  - "[[Python - Functions as First-Class Objects]]"
  - "[[Python - Scope]]"
---
# Process: Property Decorator (@property)

**Why This Matters:** The @property decorator allows you to evolve a class's internal logic, such as adding validation or computation to an attribute, without breaking the public API that other parts of the program rely on.
## Goal & Analogy

> **Goal:** The `@property` decorator is a built-in Python feature that transforms a class method into a 'getter' for a managed attribute. This allows the method to be accessed with the same syntax as a regular attribute (e.g., `obj.name` instead of `obj.get_name()`), providing a cleaner and more intuitive interface. It serves as the foundational first step in creating a complete [[Python - Descriptors|descriptor]], which can also include a corresponding [[Python - Descriptor Setter Method|setter]] and [[Python - Descriptor Deleter Method|deleter]] for full control over attribute access.

_Analogy:_ _Think of the `@property` decorator as the digital display on a smart home thermostat. When you glance at the thermostat to see the current temperature, you are simply reading a value, like `thermostat.current_temp`. You don't know or care about the complex process happening behind the scenes: the thermostat's internal method might be polling a sensor, averaging the last few readings, and formatting the result for the display. The `@property` provides this simple, direct-access interface while hiding the underlying work._

• **Reading the Temperature Display:** This is like accessing the property, e.g., `print(thermostat.current_temp)`.
• **The Thermostat's Internal Logic (polling, averaging):** This represents the code inside the decorated getter method.
• **The Simple Value (e.g., '72°F'):** This is the return value of the getter method.
• **Where it breaks down:** This analogy primarily covers the 'getter' aspect. A real thermostat display is often read-only. The `@property` decorator is the starting point; you can easily add a `.setter` to allow changing the temperature (`thermostat.current_temp = 68`), which the simple display analogy doesn't capture.

```
Client Code Request         Python Interpreter Action
-------------------         -------------------------

   obj.my_prop  ────────►   Is 'my_prop' a property?
      (Read)                          │
                                      ▼ Yes
                                Call the getter method
                                      │
                                      ▼
                                 Return value


 obj.my_prop = val ────────►   Is 'my_prop' a property
     (Write)                      with a .setter?
                                      │
                                      ▼ Yes
                                Call the setter method
                                with 'val' as argument
```

## The Step-by-Step Process

### Prerequisites / Inputs

- The `@property` decorator itself takes no arguments. Its behavior is controlled by the subsequent decorators that are chained to it:
    - **`@<property_name>.setter`**: This decorator is applied to a method that will act as the setter. The method it decorates must accept one argument besides `self`: the value being assigned.
    - **`@<property_name>.deleter`**: This decorator is applied to a method that will act as the deleter. The method it decorates takes only the `self` argument and is called upon a `del obj.attribute` statement.

### The Steps

- **Step 1: Define the Getter Method**
    - Write a standard instance method that computes or retrieves the desired value. By convention, this method is given the same name as the public attribute you want to expose (e.g., `ssn`). This method will typically access a 'private' instance variable, following the [[Python - Descriptor Naming Convention (_attribute)|naming convention]] (e.g., `_ssn`).
- **Step 2: Apply the `@property` Decorator**
    - Place the `@property` decorator directly above the method definition. This action registers the method as the 'getter' for an attribute with the same name.
- **Step 3: (Optional) Define the Setter and Deleter**
    - To complete the descriptor, you can define corresponding [[Python - Descriptor Setter Method|setter]] and [[Python - Descriptor Deleter Method|deleter]] methods. These are decorated using the name of the property itself, for example: `@ssn.setter` and `@ssn.deleter`.

##### Code Translation

```python
class Employee:
    def __init__(self, name, ssn):
        self.name = name
        self._ssn = ssn  # 'Private' attribute using naming convention

    # --- Step 1 & 2: Define the getter method and apply the decorator ---
    @property
    def ssn(self):
        """The 'getter' for the ssn attribute."""
        print("Getting SSN...")
        # Here you could add logic, like returning only the last 4 digits
        return f"***-**-{self._ssn[-4:]}"

    # --- Step 3: (Optional) Define the setter ---
    @ssn.setter
    def ssn(self, value):
        """The 'setter' for the ssn attribute."""
        print("Setting SSN...")
        if len(value) == 9 and value.isdigit():
            self._ssn = value
        else:
            print("Invalid SSN format!")

    # --- Step 3: (Optional) Define the deleter ---
    @ssn.deleter
    def ssn(self):
        """The 'deleter' for the ssn attribute."""
        print("Deleting SSN is not allowed!")
        # Or you could implement deletion logic: del self._ssn

# --- Usage ---
e = Employee("John Doe", "123456789")

# Accessing the getter (looks like a normal attribute access)
print(e.ssn)
# Output:
# Getting SSN...
# ***-**-6789

# Accessing the setter (looks like a normal attribute assignment)
e.ssn = "987654321"
# Output:
# Setting SSN...

# Accessing the deleter
del e.ssn
# Output:
# Deleting SSN is not allowed!
```

### Deliverables / Outputs

The `@property` decorator is a Pythonic tool for creating managed attributes. It allows you to start with a simple public attribute and later replace it with a method that includes more complex logic (like validation, computation, or logging) without changing the way client code interacts with your class. This adheres to the 'Uniform Access Principle,' which states that client code shouldn't need to know if a value is stored directly or computed on the fly. This decorator is the most common and straightforward way to implement a [[Python - Descriptors|descriptor]], which is the underlying mechanism for controlling attribute access in Python.

## Context & Tradeoffs

### When to Use This Process

To allow a method to be accessed as if it were a simple attribute, providing a clean public interface while hiding internal implementation details and enabling controlled access.

### Common Pitfalls & Tradeoffs

- **Pro: API Stability and Encapsulation**
    - It allows you to add logic (validation, computation, logging) to an attribute's access without changing the public interface, preventing the need to refactor all client code that uses the attribute.
- **Pro: Readability and Pythonic Style**
    - Accessing an attribute via `obj.name` is generally considered more readable and intuitive than using explicit getter/setter methods like `obj.get_name()` and `obj.set_name('new')`.
- **Con: Can Hide Complexity**
    - A user might assume `obj.name` is a fast, simple attribute lookup, when in reality it could be triggering a slow database query or a complex calculation. This can lead to unexpected performance bottlenecks.
- **Con: Potential for Non-Obvious Side Effects**
    - If a getter or setter does more than just get or set a value (e.g., modifies other state in the object), it can make the code harder to reason about and debug.

## Connections

```
                 (Parent)
              Python - Decorators
                      ▲
                      │
┌─────────────────────┼─────────────────────┐
│                     │                     │
(Mechanism)  ┌───────────────────────────┐  (Mechanism)
Descriptors  │ Property Decorator (@property) │  Attribute Access Control
             └───────────────────────────┘
                      │
           ┌──────────┴──────────┐
           │                     │
Descriptor Getter Method  Descriptor Setter Method
```


- The `@property` decorator is the most common and user-friendly way to create a [[Python - Descriptors|descriptor]].
- The initial method decorated with `@property` automatically becomes the [[Python - Descriptor Getter Method|descriptor's getter method]].
- A [[Python - Descriptor Setter Method|descriptor's setter method]] is defined by chaining the `.setter` attribute to an existing property.
- Similarly, a [[Python - Descriptor Deleter Method|descriptor's deleter method]] is created by chaining the `.deleter` attribute.
- The relationship between properties and private attributes is a core part of the [[Python - Descriptors & Attribute Access Control Relationship|relationship between descriptors and attribute access control]].
- Fundamentally, `@property` is a specific, built-in implementation of the general [[Python - Decorators|decorator]] pattern.

## Deeper Questions

- You're refactoring a legacy system where a public attribute `customer.balance` is widely used. You now need to add logging and validation whenever this balance is changed. How would you use `@property` to implement this without forcing a massive code change across the entire application, and what's the business value of this approach over a simple find-and-replace to a `set_balance()` method?
- Imagine a property getter that performs a network request or a heavy database query. How would this design impact the performance and scalability of a system that accesses this property frequently in a loop? What caching strategies could you implement within the getter/setter to mitigate this?
- What if the `@property` decorator didn't exist? How would you replicate its core functionality—providing attribute-style access to method calls—using only dunder methods like `__getattribute__` and `__setattr__`? What are the disadvantages of this manual approach?