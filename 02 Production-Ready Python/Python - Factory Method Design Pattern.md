---
tags: 
  - major_core
  - python
  - creational_pattern
  - object_creation
  - decoupling
  - polymorphism
  - gang_of_four
  - concept
source: 
  - "[[Intermediate Object-Oriented Programming in Python]]"
related: 
  - "[[SWE - Creational Design Patterns]]"
  - "[[SWE - Abstract Factory Pattern]]"
  - "[[SWE - Builder Pattern]]"
  - "[[SWE - Singleton Pattern]]"
  - "[[SWE - SOLID Principles]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Product (Factory Method Pattern)]]"
  - "[[Python - Concrete Product (Factory Method Pattern)]]"
  - "[[Python - Factory Method Naming Convention]]"
  - "[[Python - Benefits of Factory Methods]]"
  - "[[Python - Factory Method & Interface Relationship]]"
  - "[[Python - Refactoring to a Factory Method]]"
  - "[[Fundamental - Software Engineering]]"
---
# Major Core: Factory Method Design Pattern

## Summary

> The Factory Method is a creational design pattern that provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created. It decouples the client code, which requests an object, from the code that actually instantiates the specific [[Python - Concrete Product (Factory Method Pattern)|concrete product]], thereby centralizing creation logic and simplifying the addition of new product types.

**Why This Matters:** This pattern allows a system to create objects without specifying the exact class, which is critical for building flexible and extensible software that can easily accommodate new types of objects in the future.

_Analogy:_ _Imagine a logistics company that needs to transport goods. The main office (the client) doesn't care *how* the goods are transported, only that they get from point A to B. The client requests a 'transport vehicle' from a local dispatch center (the Factory). A dispatch center in a city with canals might return a 'Boat' object, while a dispatch center in a landlocked city will return a 'Truck' object. The main office interacts with both the boat and the truck through a common 'Transport' interface, using methods like `load_cargo()` and `deliver()`, without ever needing to know the specific vehicle type._

  - **Client**: The main logistics office that needs a vehicle.
  - **Creator (Factory Interface)**: The abstract concept of a 'Dispatch Center' with a `create_transport()` method.
  - **Concrete Creator (Factory Implementation)**: The 'Canal City Dispatch' or the 'Landlocked City Dispatch', each implementing `create_transport()` differently.
  - **Product Interface**: The generic 'Transport' interface with methods like `deliver()`.
  - **Concrete Product**: The actual 'Truck' or 'Boat' class.
  - **Where it breaks down:** The analogy implies the client chooses the factory (the dispatch center). In the pattern, the client is often configured to use a specific factory or receives it from another part of the system, maintaining its ignorance of the concrete implementation.

```
Client Code               Creator Interface             Product Interface
+----------+             +------------------+          +---------------+
| App      | -- uses --> | ExporterFactory  |--uses--> | Exporter      |
+----------+             | .get_exporter()  |          | .export()     |
                         +--------+---------+          +-------+-------+
                                  ▲                          ▲
                                  | (implements)             | (implements)
                       +----------+----------+      +--------+---------+
                       |                     |      |                  |
             +--------------------+ +--------------------+ +-------------+ +--------------+
             | CSVExporterFactory | | JSONExporterFactory| | CSVExporter | | JSONExporter |
             +---------+----------+ +---------+----------+ +-------------+ +--------------+
                       |                     |
                       |-- creates -->-------+ (instance of)
                       |
                       +-- creates -->------------------------+ (instance of)
```

## Details

The Factory Method design pattern is a foundational creational pattern that addresses the problem of creating objects without making the client code dependent on the specific classes of those objects. Instead of calling a constructor directly (e.g., `my_object = MyClass()`), the client calls a special 'factory method'. This method is defined in a common interface or base class, but the responsibility for actually creating the object is delegated to a subclass. This promotes loose coupling and adheres to the Open/Closed Principle, as you can introduce new types of products by simply adding new creator subclasses without modifying the client code. The pattern's structure is defined by four key participants: the **Product**, the **Concrete Product**, the **Creator**, and the **Concrete Creator**.

#### Primary Goal

To define an interface for creating an object, but let subclasses decide which class to instantiate, thereby decoupling object creation from object use.

#### Mechanism

- **Step 1: Define the Product Interface**
    - Create an abstract base class or an interface that declares the common methods for all objects the factory can create. This is the [[Python - Product (Factory Method Pattern)|Product]].
- **Step 2: Create Concrete Products**
    - Implement one or more concrete classes that inherit from the Product interface. These are the specific objects that will be instantiated.
- **Step 3: Define the Creator Class**
    - Create an abstract 'Creator' class that contains the factory method. This method's return type is the Product interface. It can also contain other business logic that relies on the Product objects.
- **Step 4: Implement Concrete Creators**
    - Create subclasses of the Creator. Each subclass overrides the factory method to return an instance of a specific [[Python - Concrete Product (Factory Method Pattern)|Concrete Product]].
- **Step 5: Client Interaction**
    - The client code works with an instance of a Concrete Creator, but typically through the abstract Creator's interface. It calls the factory method to get a Product object and then uses it, remaining completely unaware of the concrete product's class.

```python
from abc import ABC, abstractmethod

# --- Step 1: Define the Product Interface ---
class Exporter(ABC):
    """The Product Interface: Declares operations for all concrete products."""
    @abstractmethod
    def export(self, data: str) -> str:
        pass

# --- Step 2: Create Concrete Products ---
class CSVExporter(Exporter):
    """A Concrete Product."""
    def export(self, data: str) -> str:
        return f"Exporting data to CSV: {data}"

class JSONExporter(Exporter):
    """Another Concrete Product."""
    def export(self, data: str) -> str:
        return f"Exporting data to JSON: {data}"

# --- Step 3: Define the Creator Class ---
class ExporterFactory(ABC):
    """The Creator: Declares the factory method that returns a Product object."""
    @abstractmethod
    def get_exporter(self) -> Exporter:
        pass

    def process_data(self, data: str):
        # The Creator can also have core business logic that uses the product.
        exporter = self.get_exporter()
        result = exporter.export(data)
        print(result)

# --- Step 4: Implement Concrete Creators ---
class CSVExporterFactory(ExporterFactory):
    """A Concrete Creator: Overrides the factory method to return a Concrete Product."""
    def get_exporter(self) -> Exporter:
        return CSVExporter()

class JSONExporterFactory(ExporterFactory):
    """Another Concrete Creator."""
    def get_exporter(self) -> Exporter:
        return JSONExporter()

# --- Step 5: Client Interaction ---
def client_code(factory: ExporterFactory, some_data: str):
    """The client code works with a factory instance without knowing its concrete class."""
    factory.process_data(some_data)

# The client decides which factory to use at runtime.
print("Client: I'm configured to work with CSV exporting.")
client_code(CSVExporterFactory(), "Sample Data 1")

print("\nClient: Now I'm configured for JSON exporting.")
client_code(JSONExporterFactory(), "Sample Data 2")
```

 [[Code - Factory Method Design Pattern Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Choice of Concrete Creator**
    - The primary 'parameter' is the specific Concrete Creator class that the client code is configured to use. This choice determines the entire family of products that will be created.
- **Parameters to the Factory Method**
    - A variation of the pattern allows the factory method to accept parameters. The Creator can then use this input to decide which Concrete Product to instantiate, removing the need for multiple Concrete Creator subclasses in simpler cases.

#### Core Trade-offs

- **Pro: Decoupling and Flexibility**
    - It decouples the client from the concrete product classes. The client only needs to know about the abstract Product and Creator interfaces, making the system more flexible.
- **Pro: Adherence to SOLID Principles**
    - It supports the Single Responsibility Principle by moving creation logic into one place. It also supports the Open/Closed Principle, as you can add new products without changing existing client code. The [[Python - Benefits of Factory Methods]] are a direct result of this improved architecture.
- **Con: Increased Complexity**
    - The main drawback is that it requires introducing a new hierarchy of Creator classes parallel to the Product hierarchy. For simple cases, this can be overkill and add unnecessary complexity to the codebase.

## Connections

```
                      (Parent)
             SWE - Creational Design Patterns
                         ▲
                         │
         ┌───────────────┼────────────────────────────┐
         │               │                            │
(Alternative)   ┌───────────────────────────┐     (Related)
Abstract Factory  │ Factory Method Design Pattern │  Builder Pattern
                  └───────────────────────────┘
                         │
              ┌──────────┴──────────┐
              │                     │
        Product Interface     Creator Interface
```

### Parent Concept

This pattern is a fundamental member of [[SWE - Creational Design Patterns]], which are all concerned with providing flexible and decoupled mechanisms for object creation.

### Child Concepts

- The [[Python - Product (Factory Method Pattern)|Product]] defines the common interface for all objects the factory method can create.
- A [[Python - Concrete Product (Factory Method Pattern)|Concrete Product]] is a specific class that implements the Product interface.
- The **Creator** is an abstract class that declares the factory method, which returns an object of type Product.
- A **Concrete Creator** is a subclass that overrides the base factory method to return an instance of a specific Concrete Product.

### Related Concepts 

- The [[Python - Factory Method & Interface Relationship]] is central to its operation, as the pattern relies on programming to an interface, not an implementation.
- Following a consistent [[Python - Factory Method Naming Convention]] is important for making the pattern's use clear and maintainable in a codebase.
- The process of [[Python - Refactoring to a Factory Method]] is a common real-world application used to simplify complex conditional instantiation logic.
- This pattern is often a starting point that can evolve into the more complex [[SWE - Abstract Factory Pattern]], which deals with creating families of related objects.
- It contrasts with the [[SWE - Singleton Pattern]], which ensures a class has only one instance, whereas the Factory Method is used to create multiple instances of various types.
## Questions

- Your team is building a data export module that currently only supports CSV. A product manager says they 'might' need JSON and XML support in the future. When does the complexity of implementing a Factory Method pattern now outweigh the benefit of future extensibility? How would you justify your decision to either implement it now or wait?
- In a microservices architecture, a service needs to instantiate different client objects to communicate with other services based on configuration (e.g., a `RESTClient`, a `gRPCClient`). How would you use the Factory Method pattern to manage this, and what are the failure modes if the configuration is invalid or a requested client type doesn't exist?
- What if you were constrained to a functional programming paradigm without classes or inheritance? How could you achieve the core goal of the Factory Method pattern—decoupling a client from concrete object creation—using only functions and data structures like dictionaries?
