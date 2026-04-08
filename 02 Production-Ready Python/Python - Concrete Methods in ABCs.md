---
tags: 
  - core
  - python
  - concrete_method
  - inheritance
  - code_reuse
  - oop
  - abc
  - concept
source: 
  - "[[Intermediate Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Abstract Base Classes (ABCs)]]"
  - "[[Python - Abstract Methods]]"
  - "[[Python - Creating an Abstract Base Class]]"
  - "[[Python - ABC Inheritance & TypeError Relationship]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Python - Decorators]]"
  - "[[Python - Multiple Abstract Methods]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Python - Functions]]"
---
# Core: Concrete Methods in Abstract Base Classes

## Summary

>A concrete method is a regular method with a full implementation defined within an [[Python - Abstract Base Classes (ABCs)|Abstract Base Class]]. Unlike [[Python - Abstract Methods|abstract methods]], which are just empty shells that subclasses *must* implement, concrete methods are inherited directly and can be used as-is, providing common, reusable code to all child classes.

**Why This Matters:** Concrete methods in ABCs allow you to provide default, shared functionality across all subclasses, preventing code duplication and enforcing a consistent API.

_Analogy:_ _Think of a car manufacturer's blueprint for a new car model (the Abstract Base Class). The blueprint mandates certain features that each specific trim level must design for itself, like the engine (`abstract method`). However, the blueprint also includes a fully designed, standard feature that will be the same in *all* trim levels, like the braking system (`concrete method`). The base model, the sports model, and the luxury model all inherit the exact same braking system without having to redesign it._

**Where it breaks down:** While subclasses inherit the concrete method, they can still choose to *override* it with their own specific implementation. In the car analogy, this would be like the sports trim deciding to replace the standard braking system with a high-performance one. The blueprint provides a default, but it doesn't absolutely forbid customization.

```
      [Document ABC]
            │
  ┌─────────┴──────────┐
  │                    │
┌─┴──────────────┐   ┌─┴────────────────┐
│ @abstractmethod│   │ print_summary()  │  <-- Concrete Method
│ get_content()  │   │ { ... code ... } │      (Inherited by all)
└────────────────┘   └────────────────┘
        │
        │ (Subclasses MUST implement)
        │
  ┌─────┴──────┐
  │            │
[PDFDocument] [WebPage]
  │            │
  └─────┬──────┘
        │
        ▼
  (Both can call .print_summary() for free)
```

## Details

In Python's object-oriented programming, not every method within an [[Python - Abstract Base Classes (ABCs)|Abstract Base Class (ABC)]] has to be an empty placeholder. You can include fully functional methods, known as concrete methods. These are inherited and used by subclasses just like methods from a regular parent class. This powerful feature allows an ABC to act as a mixin, providing shared, reusable functionality while still enforcing a specific interface through its [[Python - Abstract Methods|abstract methods]]. For example, a `School` ABC could have an abstract `enroll_student` method but a concrete `get_school_year` method that is the same for all schools.

#### Primary Goal

To provide shared, default functionality to all subclasses of an abstract base class, promoting code reuse and reducing redundancy.

#### Mechanism

- **Step 1: Define the ABC with Mixed Methods**
    - Create a class that inherits from `ABC`. Use the `@abstractmethod` decorator for methods that subclasses must implement. Then, add one or more regular methods without the decorator. These are the concrete methods.
- **Step 2: Implement the Concrete Method**
    - Write the full body of the concrete method. This logic will be the default behavior for all subclasses.
- **Step 3: Create Subclasses**
    - Define child classes that inherit from the ABC. These classes are only required to provide implementations for the abstract methods.
- **Step 4: Inherit and Use the Concrete Method**
    - Instances of the subclasses can now call the concrete method directly, as if it were defined on the subclass itself. The shared logic from the parent ABC is executed.

##### Code Translation

```python
from abc import ABC, abstractmethod

# --- Step 1 & 2: Define the ABC with abstract and concrete methods ---
class Document(ABC):
    def __init__(self, title):
        self.title = title

    @abstractmethod
    def get_content(self):
        """Return the document's content as a string."""
        pass

    # This is a CONCRETE method
    def print_summary(self):
        """Prints a standardized summary of the document."""
        content = self.get_content()
        print(f"--- Summary for: {self.title} ---")
        print(f"{content[:75]}...")
        print(f"(Total length: {len(content)} characters)")
        print("\n")

# --- Step 3: Create Subclasses ---
class PDFDocument(Document):
    def get_content(self):
        # In a real scenario, this would read a PDF file
        return "This is the full text content extracted from a PDF file. It is typically very long and contains detailed information."

class WebPage(Document):
    def get_content(self):
        # In a real scenario, this would scrape a web page
        return "<html><body><h1>Welcome!</h1><p>This is the HTML content of a web page.</p></body></html>"

# --- Step 4: Inherit and Use the Concrete Method ---
pdf = PDFDocument("Annual_Report_2026.pdf")
web = WebPage("MyCompany.com")

# Both subclasses can use the print_summary() method without defining it themselves
pdf.print_summary()
web.print_summary()

# Output:
# --- Summary for: Annual_Report_2026.pdf ---
# This is the full text content extracted from a PDF file. It is typically very...
# (Total length: 111 characters)
#
# --- Summary for: MyCompany.com ---
# <html><body><h1>Welcome!</h1><p>This is the HTML content of a web page.</p>...</
# (Total length: 80 characters)

```

 [[Code - Concrete Methods in Abstract Base Classes Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **No Special Parameters**
    - Concrete methods are defined just like any other regular Python method. They don't have special 'hyperparameters' for their configuration beyond the standard arguments they accept.
- **Inheritance Behavior**
    - The key 'parameter' is the inheritance itself. A subclass automatically receives the concrete method's implementation without any extra configuration.
- **Optional Overriding**
    - Subclasses have the option to override the concrete method if a more specialized behavior is needed, effectively changing its implementation for that specific child class.

#### Core Trade-offs

- **Pro: Code Reusability (DRY)**
    - The primary benefit is centralizing common logic in one place. This avoids repeating the same code in every subclass, adhering to the [[SWE - DRY (Don't Repeat Yourself) Principle|DRY principle]].
- **Pro: Stable, Default API**
    - Provides a stable, default implementation that users of the subclasses can rely on, ensuring a baseline level of functionality and a consistent interface.
- **Con: Potential for Tight Coupling**
    - If the concrete method's logic is very complex or changes often, it can tightly couple all subclasses to the base class's implementation details, making future modifications more difficult.
- **Con: Risk of Inappropriate Behavior**
    - A subclass might inherit a concrete method that isn't a perfect fit for its specific logic. If not carefully considered or overridden, this can lead to unexpected or incorrect behavior.

## Connections

```
                          (Parent)
               Abstract Base Classes (ABCs)
                           ▲
                           │
    ┌──────────────────────┼──────────────────────┐
    │                      │                      │
(Contrasts With) ┌───────────────────────────┐ (Applies)
Abstract Methods │ Concrete Methods in ABCs  │ DRY Principle
                 └───────────────────────────┘
```

### Parent Concept

Concrete methods are a feature of [[Python - Abstract Base Classes (ABCs)|Abstract Base Classes (ABCs)]], which provide a way to define formal interfaces in Python.

### Child Concepts



### Related Concepts 

- A concrete method directly **contrasts with** an [[Python - Abstract Methods|abstract method]], which has no implementation and must be overridden by subclasses.
- Using concrete methods to provide default functionality is a practical application of the [[SWE - DRY (Don't Repeat Yourself) Principle|DRY (Don't Repeat Yourself) Principle]].
- The overall structure is defined when [[Python - Creating an Abstract Base Class|creating an Abstract Base Class]], where you decide which methods will be abstract and which will be concrete.
- If a subclass provides its own implementation of a concrete method, it is known as method overriding, a core concept in [[Python - Object-Oriented Programming (OOP)|object-oriented programming]].
## Questions

- You're designing a framework for data connectors (e.g., to databases, APIs) using an ABC. When would you make the `connect()` method a concrete method with default retry logic versus making it an abstract method? How would you explain the business impact of this choice in terms of development speed vs. connector-specific reliability?
- Imagine a concrete method in a widely-used base class needs a critical bug fix or a change in its signature. What are the cascading risks to the dozens of production systems using its subclasses, and how would you design a deployment and testing strategy to mitigate breaking them?
- What if Python's ABCs *only* allowed abstract methods and forbade concrete ones? How would you achieve the goal of providing shared, default functionality to a family of classes using other design patterns, and what would be the downsides of that approach compared to using concrete methods?