---
tags: 
  - relationship
  - python
  - design_patterns
  - interface
  - polymorphism
  - loose_coupling
  - contract
  - concept
source: 
  - "[[Intermediate Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Factory Method Design Pattern]]"
  - "[[Python - Product (Factory Method Pattern)]]"
  - "[[Python - Concrete Product (Factory Method Pattern)]]"
  - "[[Python - Benefits of Factory Methods]]"
  - "[[Python - Refactoring to a Factory Method]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[SWE - Do One Thing Principle]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Python - Decorators]]"
  - "[[Python - Class Methods]]"
---
# Relationship: Product Interface Rule

**Why This Matters:** This rule is the cornerstone of the factory method pattern, enabling client code to remain decoupled from concrete implementations and interact with any created object through a stable, predictable contract.
## The Relationship Defined

**Type:** Foundational

> The most critical rule of the [[Python - Factory Method Design Pattern]] is that every object created and returned by a factory method must conform to a single, shared interface. This interface, known as the 'Product', acts as a contract. It guarantees that regardless of which specific [[Python - Concrete Product (Factory Method Pattern)|Concrete Product]] is instantiated, the client code can interact with it in a consistent manner, for example, by calling the same methods like `.reference()`. This enforcement of a common contract is what allows the pattern to achieve loose coupling between the creator and the products it creates.

_Analogy:_ _Think of a universal remote control. The remote is the 'client code', and its buttons ('Power', 'Volume Up', 'Channel Down') represent the methods defined in the 'Product' interface. The remote doesn't know or care if it's currently pointed at a Sony TV, a Samsung TV, or a Vizio soundbar (the 'Concrete Products'). As long as each device implements the standard infrared codes for 'Power', 'Volume Up', etc., the remote can interact with any of them consistently. The remote is completely decoupled from the specific brand or type of electronic device._

**Where it breaks down:** A universal remote might have buttons that do nothing on a specific device (e.g., a 'Picture-in-Picture' button on a simple soundbar). In the Factory Method pattern, the interface contract is stricter. If the `[[Python - Product (Factory Method Pattern)|Product]]` interface defines a method, every single `[[Python - Concrete Product (Factory Method Pattern)|Concrete Product]]` *must* provide a meaningful implementation for it, even if it's just to raise a `NotImplementedError`.

## Mechanism of Interaction

The Product Interface Rule is the foundational principle that makes the [[Python - Factory Method Design Pattern]] functional. By mandating that all created objects share a common interface (the 'Product'), the pattern allows the client code to operate on an abstraction rather than a concrete implementation. This decouples the client from the specific classes of the objects it uses.

### Implementation Proof

```python
from abc import ABC, abstractmethod

# --- The 'Product' Interface ---
# This defines the contract that all returned objects must follow.
class Document(ABC):
    @abstractmethod
    def reference(self) -> str:
        """Returns the citation reference for the document."""
        pass

# --- Two 'Concrete Products' ---
# Both implement the same Document interface.
class JournalArticle(Document):
    def reference(self) -> str:
        return "Author, A. (Year). Title of article. Journal Title, Volume(Issue), pages."

class Book(Document):
    def reference(self) -> str:
        return "Author, A. A. (Year). Title of work. Publisher."

# --- The Factory and Client Code ---
class DocumentFactory:
    @staticmethod
    def create_document(doc_type: str) -> Document:
        if doc_type == 'article':
            return JournalArticle()
        elif doc_type == 'book':
            return Book()
        raise ValueError(f"Unknown document type: {doc_type}")

# The client code interacts with any returned object via the same interface.
# It doesn't need to know if it's a Book or a JournalArticle.
def print_reference(document_type: str):
    # The factory creates an object.
    doc = DocumentFactory.create_document(document_type)
    
    # The client calls the method defined in the 'Product' interface.
    # This line works polymorphically for any object the factory returns.
    print(f"Reference: {doc.reference()}")


print_reference('article')
print_reference('book')

# Output:
# Reference: Author, A. (Year). Title of article. Journal Title, Volume(Issue), pages.
# Reference: Author, A. A. (Year). Title of work. Publisher.
```

## Implications & Impact

Without this rule, the client would need to use `if/elif/else` blocks to check the type of object returned by the factory and call different methods accordingly. This would completely defeat the purpose of the pattern, re-introducing the tight coupling it was designed to eliminate.

## Key Connections

- The [[Python - Product (Factory Method Pattern)|Product]] is the formal definition of the common interface that this rule enforces.
- Each [[Python - Concrete Product (Factory Method Pattern)|Concrete Product]] is a specific implementation that must adhere to this rule to be valid.
- This rule is the direct mechanism that enables the primary [[Python - Benefits of Factory Methods|benefits of the factory method pattern]], such as loose coupling and improved extensibility.

## Deeper Questions

- Imagine a scenario where a new 'Concrete Product' needs a unique, powerful method not present in the shared 'Product' interface. How would you handle this? Would you break the rule and have the client perform a type check, or would you redesign the interface, potentially making it less clean for other products?
- In a large, evolving system with dozens of 'Concrete Products', how would you enforce this interface rule programmatically to prevent a developer from accidentally creating a non-compliant product, and what would be the CI/CD pipeline implications?
- What if Python didn't support abstract base classes or formal interfaces? How would you implement and enforce this 'common interface' rule using only duck typing, and what new risks or challenges would that introduce?