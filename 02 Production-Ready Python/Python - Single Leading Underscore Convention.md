---
tags: 
  - core
  - python
  - encapsulation
  - pep8
  - convention
  - api_design
  - leading_underscore
  - concept
source: 
  - "[[Software Engineering Principles in Python]]"
related: 
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Instance Methods 1]]"
  - "[[Python - Automating Object Initialization with __init__]]"
  - "[[Python - Risks of Using Non-Public Methods]]"
  - "[[Python - Class Inheritance]]"
  - "[[Python - Core Principles of OOP]]"
  - "[[Python - Name Mangling]]"
  - "[[Python - Decorators]]"
  - "[[Python - Class Methods]]"
  - "[[Python - Interfaces]]"
  - "[[SWE - Software Engineering for Data Scientists]]"
  - "[[SWE - API Design]]"
  - "[[SWE - Encapsulation]]"
  - "[[Python - Descriptors]]"
---
# Core: Non-Public (Internal Use) Methods

## Summary

>A non-public method in Python is a method intended for internal use within a class, conventionally marked by a single leading underscore in its name (e.g., `_helper_method`). This is a signal to other developers that the method is not part of the public API and could change without notice.

**Why This Matters:** This convention creates a clear public API for a class, preventing accidental misuse of internal helper methods and making the code easier to maintain and refactor over time.

_Analogy:_ _Think of a restaurant kitchen. The public menu represents the class's public methods—what customers can order. The kitchen itself has its own internal processes, tools, and secret recipes (the non-public methods) that the chefs use to prepare the food. Customers don't need to know the specific recipe for the secret sauce (`_prepare_sauce`) to order and enjoy their meal; they just use the public interface (`order_dish`)._

The kitchen staff (other methods within the class) can see and use all the internal tools. A curious customer (another developer) *could* walk into the kitchen and try to use the equipment, but it's not recommended, and the layout might change tomorrow. **Where it breaks down:** Unlike a real kitchen with a locked door, Python's non-public methods are only a convention; there's no technical barrier preventing someone from calling `_prepare_sauce` directly.

```
    +---------------------------------+
    |           Product Class         |
    |---------------------------------|
    |      PUBLIC API (The Door)      |
    |---------------------------------|
    | + __init__(name, price)         |
    | + get_price_with_discount(...)  | ----> Calls internal helper
    |---------------------------------|       |
    |   NON-PUBLIC (Internal Engine)  | <-----+
    |---------------------------------|
    | - _calculate_discount(...)      |
    +---------------------------------+
```

## Details

In Python's approach to [[Python - Object-Oriented Programming (OOP)|Object-Oriented Programming]], encapsulation is more of a guideline than a strict rule. Following the PEP 8 style guide, developers use a single leading underscore to name methods that are not meant to be part of the class's public interface. This convention, often called "protected" in other languages, signals that a method is for internal use only. It's a way to communicate intent, telling other programmers, "You can use this if you must, but it's not guaranteed to be stable, and you're responsible for any breakage." This contrasts with public methods, like the special `[[Python - Automating Object Initialization with __init__|__init__]]` method, which are meant for direct interaction.

#### Primary Goal

To clearly distinguish between the stable, public-facing API of a class and its internal implementation details, which are subject to change.

#### Mechanism

- **Step 1: Define the Class and Public Method**
    - Create a class with a public method that users will interact with. This method will be the main entry point for a specific functionality.
- **Step 2: Create a Non-Public Helper Method**
    - Define a method with a single leading underscore (e.g., `_calculate_discount`). This method will contain logic that is part of the internal implementation.
- **Step 3: Call the Non-Public Method from the Public Method**
    - Inside the public method, call the non-public helper method to perform its task. This encapsulates the complex or volatile logic.
- **Step 4: Instantiate and Use the Public API**
    - Create an instance of the class and call the public method. The internal workings of the non-public method are hidden from the user.

##### Code Translation

```python
class Product:
    # --- Step 1 & 3: Define the Class and Public Method that calls the helper ---
    # The __init__ method is a public interface for creating the object.
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def get_price_with_discount(self, discount_percentage):
        """Returns the final price after applying a discount."""
        discount_amount = self._calculate_discount(discount_percentage)
        return self.price - discount_amount

    # --- Step 2: Create a Non-Public Helper Method ---
    # This method is for internal calculation and not part of the public API.
    def _calculate_discount(self, discount_percentage):
        """Calculates the discount amount. Intended for internal use."""
        if 0 < discount_percentage < 1:
            return self.price * discount_percentage
        return 0

# --- Step 4: Instantiate and Use the Public API ---
book = Product("The Knowledge Architect", 100)
final_price = book.get_price_with_discount(0.2) # Using the public method
print(f"The final price is: ${final_price}")

# While possible, calling the non-public method directly is discouraged.
# It signals a potential violation of the class's intended use.
# See [[Python - Risks of Using Non-Public Methods]]
direct_discount = book._calculate_discount(0.2)
print(f"Directly calculated discount (not recommended): ${direct_discount}")
```

 [[Code - Non-Public (Internal Use) Methods Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Single Leading Underscore (`_method`)**
    - This is the standard convention for non-public or "protected" members. It's a strong hint to not use it externally, but it doesn't prevent access.
- **Double Leading Underscore (`__method`)**
    - This triggers "name mangling". Python renames the attribute to `_ClassName__method`, making it much harder to access from outside the class. This is used to avoid naming conflicts in subclasses, not to create truly private methods.

#### Core Trade-offs

- **Pro: Clear API Definition**
    - It clearly separates the public interface from the internal implementation, making the class easier to understand and use correctly.
- **Pro: Increased Flexibility for Maintainers**
    - Class authors can refactor or change internal methods without worrying about breaking external code that depends on them.
- **Con: Relies on Convention, Not Enforcement**
    - A developer can still choose to ignore the hint and call the method directly, which is one of the key [[Python - Risks of Using Non-Public Methods|risks of using non-public methods]]. This "consenting adults" philosophy of Python offers flexibility but can lead to brittle code if conventions are ignored.

## Connections

```
                      (Parent)
            Object-Oriented Programming
                       ▲
                       │
    ┌──────────────────┼──────────────────┐
    │                  │                  │
(Principle)     ┌───────────────────────────┐     (Contrasts With)
Encapsulation   │ Non-Public (Internal Use) │     Public Methods
                │          Methods          │
                └───────────────────────────┘
                           │
                           ▼
                      (Consequence)
           Risks of Using Non-Public Methods
```

### Parent Concept

This concept is a core part of [[Python - Object-Oriented Programming (OOP)|Object-Oriented Programming in Python]], specifically related to the principle of encapsulation.

### Child Concepts



### Related Concepts 

- It is a fundamental convention applied to [[Python - Instance Methods 1|instance methods]] to hide implementation details.
- The use of non-public methods is a key aspect of encapsulation, a principle also seen in the way `[[Python - Automating Object Initialization with __init__|__init__]]` sets up an object's internal state.
- Ignoring this convention leads to the issues detailed in [[Python - Risks of Using Non-Public Methods|Risks of Using Non-Public Methods]].
- This convention contrasts with public methods, which form the stable, documented API of a class.
## Questions

- Your team is building a library for financial calculations. A stakeholder wants to directly access an internal helper method (`_calculate_risk_factor`) for a one-off report. How would you explain the long-term business risk of creating this dependency versus the short-term benefit, and what alternative solution would you propose?
- Imagine you're designing a large-scale plugin architecture where third-party developers extend your core classes. How would the widespread use of non-public methods in your base classes affect the stability and maintainability of the entire ecosystem as you release new versions?
- What if Python enforced true privacy for methods prefixed with an underscore, making them completely inaccessible from outside the class? What new design patterns might emerge, and what existing Pythonic practices would be broken or become obsolete?