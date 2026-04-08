---
tags: 
  - core
  - python
  - property
  - decorator
  - getter
  - setter
  - encapsulation
  - concept
source: 
  - "[[Data Types in Python]]"
related: 
  - "[[Python - Decorators]]"
  - "[[Python - Dataclasses]]"
  - "[[Python - @dataclass Decorator]]"
  - "[[Python - Descriptors]]"
  - "[[Python - Customizing Attribute Access]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Class Attributes]]"
  - "[[Python - Functions as First-Class Objects]]"
  - "[[Python - Creating a Dataclass]]"
  - "[[Python - Frozen Dataclasses]]"
  - "[[Python - Dataclass Conversion Functions (asdict, astuple)]]"
  - "[[SWE - Readability]]"
---
# Core: @property Decorator

## Summary

>The `@property` decorator is a built-in Python feature that transforms a class method into a 'getter' for a property of the same name. This allows the method to be accessed like a regular attribute, without parentheses, which enhances code readability and provides a way to compute attribute values on the fly. As seen in the context, it's particularly useful with a [[Python - Dataclasses|dataclass]] like `Cookie`, where the `value_of_goods` method is turned into a property that dynamically calculates its value from `cost` and `quantity`.

**Why This Matters:** It allows developers to create clean, intuitive APIs by exposing methods as if they were simple attributes, hiding complex calculations from the user and improving code readability.

_Analogy:_ _Think of a car's speedometer. When you want to know your speed, you just glance at the dashboard and read the value (e.g., `car.speed`). You don't have to perform a complex calculation yourself by calling a function like `car.calculate_current_speed_from_wheel_rotation()`. The `@property` decorator is like the speedometer display: it gives you direct access to a piece of information, while the complex calculation (the method's logic) happens behind the scenes._

**Where it breaks down:** The speedometer is a read-only display. While a basic `@property` is also read-only, Python allows you to add a 'setter' to make the property writable (e.g., setting a thermostat's target temperature). The simple speedometer analogy doesn't capture this ability to modify the underlying state through the property.

```
Class Definition               Instance Usage
+--------------------------+     +------------------------------------+
| @dataclass               |     |                                    |
| class Cookie:            |     | peanut = Cookie(...)               |
|   cost: Decimal          |     |                                    |
|   quantity: int          |     | # Method call (old way)            |
|                          |     | # peanut.value_of_goods()          |
|   @property              |     |                                    |
|   def value_of_goods(self|     | # Property access (new way)        |
|     return self.cost *   |     | >>> peanut.value_of_goods          |
|            self.quantity |     | Decimal('9.6')                     |
+--------------------------+     +------------------------------------+
```

## Details

The `@property` decorator is a powerful tool for creating 'managed attributes' in Python. It lets you attach logic to the action of accessing an attribute. Instead of simply retrieving a stored value, you can execute a full method whenever an attribute is read. This is a key principle of encapsulation, allowing the internal representation of an object to change without affecting the public interface. The provided example demonstrates this perfectly within a [[Python - @dataclass Decorator|dataclass]], where a `value_of_goods` method is turned into a property that feels just like the other declared fields (`name`, `cost`).

#### Primary Goal

To allow a method to be accessed as an attribute, providing a clean, intuitive interface while encapsulating the logic for computing or retrieving the attribute's value.

#### Mechanism

- **Step 1: Define the Class and Base Attributes**
    - First, create a class with the necessary base attributes. In the example, this is a [[Python - Creating a Dataclass|dataclass]] named `Cookie` with `name`, `cost`, and `quantity`.
- **Step 2: Create the Getter Method**
    - Write a regular method that performs the desired calculation. This method should only take `self` as an argument. For the `Cookie` class, this is the `value_of_goods` method which calculates `self.quantity * self.cost`.
- **Step 3: Apply the `@property` Decorator**
    - Place the `@property` decorator on the line directly above the method definition. The name of the method will now become the name of the accessible property.
- **Step 4: Access as an Attribute**
    - After creating an instance of the class, you can access the new property without using parentheses, just as you would with any other attribute. For example, `peanut.value_of_goods` instead of `peanut.value_of_goods()`.

##### Code Translation

```python
from dataclasses import dataclass
from decimal import Decimal

# --- Step 1: Define the Class and Base Attributes ---
@dataclass
class Cookie:
    name: str
    cost: Decimal
    quantity: int

    # --- Step 2 & 3: Create the Getter Method and Apply the Decorator ---
    @property
    def value_of_goods(self) -> Decimal:
        """Calculates the total value of the cookies."""
        return self.quantity * self.cost

# --- Step 4: Access as an Attribute ---
peanut_cookie = Cookie(name="peanut butter", cost=Decimal("1.2"), quantity=8)

# Access the calculated value just like a regular attribute (no parentheses needed)
total_value = peanut_cookie.value_of_goods

print(f"The total value of {peanut_cookie.name} cookies is ${total_value}")
# Expected Output: The total value of peanut butter cookies is $9.6
```

 [[Code - @property Decorator Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Read-Only Property (Getter)**
    - The basic `@property` decorator creates a read-only attribute. Attempting to assign a value to it (e.g., `cookie.value_of_goods = 10`) will raise an `AttributeError`.
- **`@<property_name>.setter`**
    - To make a property writable, you can define a setter method. This method is decorated with the name of the property followed by `.setter`. It allows you to run validation or update other internal states when the property is assigned a new value.
- **`@<property_name>.deleter`**
    - Less commonly, you can define a deleter method decorated with `.deleter`. This method is executed when `del` is called on the property, allowing for custom cleanup logic.

#### Core Trade-offs

- **Pro (Clean API)**
    - It provides a clean, attribute-style access, making the class easier and more intuitive to use. The user doesn't need to distinguish between stored attributes and computed attributes.
- **Pro (Encapsulation)**
    - It hides the implementation details. You can change the internal calculation logic at any time without breaking the external code that accesses the property.
- **Con (Hidden Complexity)**
    - A user might assume accessing a property is a fast, simple lookup like a dictionary key. However, it could conceal a computationally expensive operation (e.g., a database query or a complex calculation), leading to unexpected performance bottlenecks.
- **Con (Potential for Confusion)**
    - It blurs the line between data (attributes) and behavior (methods). For developers new to a codebase, it might not be immediately obvious that accessing an attribute is triggering a function call.

## Connections

```
                      (Parent)
                    Decorators
                         ▲
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                    │
(Mechanism)     ┌──────────────────┐      (Used With)
Descriptors     │ @property        │      Dataclasses
                └──────────────────┘
                         │
              ┌──────────┴──────────┐
              │                     │
        @<prop>.setter      @<prop>.deleter
```

### Parent Concept

The `@property` decorator is a specific, user-friendly application of the broader concept of [[Python - Decorators|decorators]], which are used to modify or enhance functions and methods.

### Child Concepts



### Related Concepts 

- This technique is especially powerful when combined with [[Python - Dataclasses|dataclasses]] to create rich, yet simple, data objects with computed fields.
- The `@property` decorator is a high-level, easy-to-use implementation of the [[Python - Descriptors|descriptor protocol]], which provides more fine-grained control over attribute access.
- Using `@property` is a primary method for [[Python - Customizing Attribute Access|customizing attribute access]], allowing for dynamic behavior when an attribute is read, written, or deleted.
- It is a cornerstone of writing clean, object-oriented code, aligning with the principles of [[Python - Object-Oriented Programming (OOP)|OOP]] like encapsulation.
## Questions

- You're designing a data-intensive class where a property involves a costly database query. How would you balance the clean API of `@property` against the potential performance hit for frequent access? Would you keep it as a property or refactor it into an explicit method like `fetch_calculated_value()` and why?
- Imagine a system where a property's setter (`@value.setter`) triggers a cascade of updates in other related objects. What are the potential risks of this design in a large, concurrent application, and what patterns (e.g., Observer, Pub/Sub) could you use to manage these dependencies more robustly?
- What if Python removed the `@property` decorator? How would you replicate its core functionality (attribute-style access for a method) using only fundamental language features like dunder methods (e.g., `__getattr__`, `__getattribute__`)? What would be the downsides of your custom implementation compared to the built-in decorator?