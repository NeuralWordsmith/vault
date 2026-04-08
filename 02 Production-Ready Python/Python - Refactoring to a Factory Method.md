---
tags: 
  - process
  - python
  - refactoring
  - design_patterns
  - object_creation
  - decoupling
  - solid_principles
  - concept
source: 
  - "[[Intermediate Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Factory Method Design Pattern]]"
  - "[[Python - Product (Factory Method Pattern)]]"
  - "[[Python - Concrete Product (Factory Method Pattern)]]"
  - "[[Python - Benefits of Factory Methods]]"
  - "[[Python - Factory Method & Interface Relationship]]"
  - "[[Python - Factory Method Naming Convention]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[SWE - Do One Thing Principle]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Python - Class Definition]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Python - Abstract Base Classes]]"
  - "[[Python - Polymorphism]]"
  - "[[Python - Encapsulation]]"
---
# Process: Refactoring to a Factory Method

**Why This Matters:** This refactoring process transforms complex, hard-to-maintain object creation logic into a clean, scalable, and decoupled system, making it easier to add new object types without modifying existing client code.
## Goal & Analogy

> **Goal:** The process of refactoring to a [[Python - Factory Method Design Pattern|Factory Method]] is a structured approach to centralizing object creation. It involves taking a method with messy conditional logic (e.g., a large `if-elif-else` block that instantiates different classes), and moving that logic into a dedicated "factory" method. This new method returns an object that conforms to a common [[Python - Product (Factory Method Pattern)|Product interface]], allowing the original code to work with any created object in a uniform way.

_Analogy:_ _Imagine a busy restaurant kitchen. Initially, the head chef (the client code) has to know the specific recipe for every single dish. If a customer orders pasta, the chef follows the pasta recipe. If they order a steak, the chef follows the steak recipe. This is slow and inefficient. The refactoring is like reorganizing the kitchen. The head chef now just shouts an order like "Pasta!" to a specialized "station chef" (the factory method). The station chef knows all the specific recipes and prepares the correct dish (the concrete product). The head chef doesn't care *how* it was made, only that they receive a "dish" (the product interface) that they can then plate and send out._

-
- **Head Chef:** The original client code that needs an object.
- **Shouting an Order ("Pasta!"):** The input parameter to the factory method.
- **Station Chef:** The factory method itself, containing the conditional logic.
- **Specific Recipes:** The instantiation logic for each concrete class.
- **The Finished Dish (Pasta, Steak):** The [[Python - Concrete Product (Factory Method Pattern)|Concrete Product]] instance.
- **The concept of a "Plated Dish":** The common [[Python - Product (Factory Method Pattern)|Product interface]] that all dishes adhere to.
- **Where it breaks down:** The analogy implies a single "station chef" (one factory). In larger applications, you might have multiple factories or even factories that create other factories (Abstract Factory pattern), which the simple kitchen analogy doesn't fully capture.

```
BEFORE:
Client Code (generate_report)
       │
       └───> if type == 'pdf': new PdfLogic()
       │
       └───> if type == 'csv': new CsvLogic()


AFTER:
Client Code (generate_report)
       │
       └───> Calls Factory (_get_report_handler)
                   │
                   └───> if type == 'pdf': return PdfReport()
                   │
                   └───> if type == 'csv': return CsvReport()
       │
<──────┘ (Receives object via common 'Report' interface)
```

## The Step-by-Step Process

### Prerequisites / Inputs

- **Input Parameter**
    - The primary "lever" is the parameter passed to the factory method (e.g., `report_type` in the example). Its value directly determines which concrete product is instantiated and returned. This parameter acts as the key in the decision-making logic.

### The Steps

- **Step 1: Identify Complex Creation Logic**
    - Locate a method where an `if-elif-else` or `switch` statement is used to instantiate different classes based on a parameter. This is the code smell that indicates a factory might be needed.
- **Step 2: Define a Common Interface ('Product')**
    - Create an abstract base class or a protocol that defines the common methods all the created objects share. This is the [[Python - Product (Factory Method Pattern)|Product]] interface.
- **Step 3: Create Concrete Product Classes**
    - Ensure each class that was being instantiated in the conditional block now implements the common interface defined in Step 2. These are the [[Python - Concrete Product (Factory Method Pattern)|Concrete Products]].
- **Step 4: Create the Factory Method**
    - Create a new, often private, method (e.g., `_get_resource`). Move the original `if-elif-else` block into this method. Modify it to return an instance of the appropriate Concrete Product, typed as the common interface.
- **Step 5: Update the Client Code**
    - Modify the original method to call the new factory method. The client code now receives an object conforming to the interface and can use it without knowing its specific concrete type.

##### Code Translation

```python
# --- BEFORE REFACTORING ---
class ReportGenerator:
    def generate_report(self, report_type, data):
        if report_type == 'pdf':
            # Complex PDF generation logic
            print(f"Generating PDF report with data: {data}")
            return "pdf_report_content"
        elif report_type == 'csv':
            # Complex CSV generation logic
            print(f"Generating CSV report with data: {data}")
            return "csv_report_content"
        else:
            raise ValueError("Unsupported report type")

# --- AFTER REFACTORING ---
from abc import ABC, abstractmethod

# --- Step 2: Define a Common Interface ('Product') ---
class Report(ABC):
    @abstractmethod
    def generate(self, data):
        pass

# --- Step 3: Create Concrete Product Classes ---
class PdfReport(Report):
    def generate(self, data):
        print(f"Generating PDF report with data: {data}")
        return "pdf_report_content"

class CsvReport(Report):
    def generate(self, data):
        print(f"Generating CSV report with data: {data}")
        return "csv_report_content"

class RefactoredReportGenerator:
    # --- Step 4: Create the Factory Method ---
    def _get_report_handler(self, report_type: str) -> Report:
        if report_type == 'pdf':
            return PdfReport()
        elif report_type == 'csv':
            return CsvReport()
        else:
            raise ValueError("Unsupported report type")

    # --- Step 5: Update the Client Code ---
    def generate_report(self, report_type: str, data):
        report_handler = self._get_report_handler(report_type)
        return report_handler.generate(data)

# --- Usage ---
generator = RefactoredReportGenerator()
pdf = generator.generate_report('pdf', [1, 2, 3])
csv = generator.generate_report('csv', [4, 5, 6])
```

### Deliverables / Outputs

Refactoring to a Factory Method is a common software engineering practice aimed at improving code structure and maintainability. It addresses the problem of a single method becoming bloated with complex conditional logic for creating various types of objects. The core idea is to extract this creation logic and encapsulate it within a single, dedicated method—the factory. This decouples the client code, which *uses* the objects, from the concrete classes of the objects being created. The process follows a clear, five-step path to achieve this separation.

## Context & Tradeoffs

### When to Use This Process

To centralize object creation logic, decoupling the client from concrete implementations and making the system easier to extend with new object types.

### Common Pitfalls & Tradeoffs

- **Pro - Decoupling**
    - The client code is no longer tightly coupled to the concrete product classes. It only knows about the abstract interface, which aligns with the Dependency Inversion Principle.
- **Pro - Extensibility**
    - Adding a new product type (e.g., an `XmlReport`) is much easier. You simply create the new class and add one `elif` case to the factory method. The client code doesn't need to change at all, adhering to the Open/Closed Principle.
- **Con - Increased Complexity**
    - The refactoring introduces more classes and an interface, which can feel like overkill for simple cases with only two or three product types. The initial code is more verbose.
- **Con - Indirection**
    - It adds a layer of indirection. To understand which object is being created, a developer needs to trace the call to the factory method and inspect its internal logic.

## Connections

```
                           (Parent)
                 Factory Method Design Pattern
                              ▲
                              │
┌─────────────────────────────┼─────────────────────────────┐
│                             │                             │
Product Interface    ┌───────────────────────────────┐    Concrete Product
                     │ Refactoring to a Factory Method │
                     └───────────────────────────────┘
                              │
                              │
                       (Unlocks)
                  Benefits of Factory Methods
```


- This refactoring process is the practical application of the [[Python - Factory Method Design Pattern|Factory Method design pattern]].
- A critical prerequisite for this refactoring is defining a common [[Python - Product (Factory Method Pattern)|Product interface]] that all potential objects will implement.
- The outcome of the factory method is always an instance of a [[Python - Concrete Product (Factory Method Pattern)|Concrete Product]], but it is returned to the client as the abstract Product type.
- Successfully completing this refactoring unlocks the primary [[Python - Benefits of Factory Methods|benefits of using factory methods]], such as improved decoupling and extensibility.
- The relationship between the factory and the objects it creates is governed by the [[Python - Factory Method & Interface Relationship|factory method and interface relationship]], which is central to the pattern's success.

## Deeper Questions

- In a rapidly evolving startup environment, the initial complexity of refactoring to a Factory Method might slow down feature delivery. At what point (e.g., number of object types, frequency of changes) would you argue that the long-term maintainability benefits outweigh the short-term velocity cost?
- Imagine the available 'report types' are not hardcoded but are defined in external configuration files or a database, allowing non-developers to add new ones. How would you modify the factory method's implementation to dynamically register and instantiate these new `Concrete Product` classes without requiring a code deployment?
- What if the creation of a `Concrete Product` was a very expensive operation (e.g., establishing a network connection or loading a large model into memory)? How might you evolve this simple factory pattern to incorporate caching or object pooling to manage resource usage efficiently?