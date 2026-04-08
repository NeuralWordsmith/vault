---
tags: 
  - core
  - python
  - oop
  - method_overriding
  - duck_typing
  - interface
  - abstraction
  - concept
source: 
  - "[[Introduction to Object-Oriented Programming in Python]]"
related: 
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Core Principles of OOP]]"
  - "[[Python - Inheritance]]"
  - "[[Python - Encapsulation]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Objects]]"
  - "[[Python - Class Methods]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Python - Abstract Base Classes]]"
  - "[[Python - Method Overriding]]"
  - "[[Python - Duck Typing]]"
  - "[[Python - dunder methods]]"
  - "[[SWE - SOLID Principles]]"
---
# Core: Polymorphism

## Summary

>Polymorphism, which literally means 'many forms', is a core principle of [[Python - Object-Oriented Programming (OOP)|Object-Oriented Programming]] that enables objects of different classes to be treated as objects of a common superclass. It allows us to access different types of objects through the same interface, meaning we can use a single function or method to operate on objects from various classes. This is often achieved through [[Python - Inheritance|inheritance]], where multiple subclasses can respond to the same method call in their own unique ways.

**Why This Matters:** Polymorphism allows for writing flexible and reusable code that can handle different types of objects uniformly, drastically reducing code duplication and complexity in evolving software systems.

_Analogy:_ _Think of a universal remote control. The remote is a single interface with standard buttons like 'Power', 'Volume Up', and 'Channel Down'. You can use this same remote to control a TV, a soundbar, or a Blu-ray player. When you press the 'Power' button, you don't need to know the specific electronic engineering of each device; you just trust that the device knows how to respond to that command. The TV will turn on its screen, the soundbar will activate its speakers, and the Blu-ray player will start its disc motor. The same action ('Power') results in different, type-specific behaviors._

  - **Universal Remote:** The common interface, like a function that expects an object with certain methods.
  - **Buttons (e.g., 'Power'):** The common method name (e.g., `.execute()`, `.render()`) that the interface calls.
  - **TV, Soundbar, Blu-ray Player:** The different objects (`CreditCardProcessor`, `PayPalProcessor`, `CryptoProcessor`) that each implement the `.execute()` method in their own way.
  - **Where it breaks down:** A physical remote is pre-programmed for a finite set of devices. In programming, polymorphism is far more flexible; you can create entirely new classes (a new 'smart light' device) and, as long as it implements the correct methods, it will work with the existing 'remote' (your code) without any changes to the remote itself.

```
        [ display_document(doc) ]
                 │
                 └─ doc.show() ─┐
                               │
             ┌─────────────────┴─────────────────┐
             │                                   │
    [ PdfDocument Object ]              [ WordDocument Object ]
             │                                   │
       .show() -> "Displaying PDF"         .show() -> "Displaying Word"
```

## Details

Polymorphism is one of the [[Python - Core Principles of OOP|three fundamental pillars of OOP]], alongside [[Python - Encapsulation]] and [[Python - Inheritance]]. The core idea is to decouple the code that *uses* an object from the specific *types* of objects it operates on. Instead of writing code that checks an object's type (`if type(obj) is Dog: ... elif type(obj) is Cat: ...`), you write generic code that relies on a shared interface. As long as different objects provide that same interface (e.g., they all have a `.speak()` method), the calling code can use them interchangeably, making the system far more extensible and easier to maintain.

#### Primary Goal

To allow a single interface to be used for a general class of actions, simplifying code and increasing its flexibility and extensibility.

#### Mechanism

- **Step 1: Define a Base Class with a Common Interface**
    - First, we create a parent class (e.g., `Document`) that defines the methods that all subclasses are expected to have, like a `show()` method. This establishes a 'contract' for all document types.
- **Step 2: Create Subclasses with Specific Implementations**
    - Next, we create multiple child classes (e.g., `PdfDocument`, `WordDocument`) that use [[Python - Inheritance|inheritance]] to inherit from `Document`. Each child class provides its own specific version of the `show()` method.
- **Step 3: Write a Generic Function that Uses the Interface**
    - We then write a single function (e.g., `display_document`) that takes any `Document` object and calls its `show()` method. This function is 'polymorphic' because it doesn't know or care about the specific type of document it receives.
- **Step 4: Pass Different Objects to the Same Function**
    - Finally, we create instances of `PdfDocument` and `WordDocument` and pass them to the *exact same* `display_document` function. The function works correctly for both, executing the appropriate `show()` method for each object type.

##### Code Translation

```python
# --- Step 1: Define a Base Class with a Common Interface ---
class Document:
    def show(self):
        raise NotImplementedError("Subclass must implement abstract method")

# --- Step 2: Create Subclasses with Specific Implementations ---
class PdfDocument(Document):
    def show(self):
        print("Opening and displaying a PDF document.")

class WordDocument(Document):
    def show(self):
        print("Opening and displaying a Word document.")

# --- Step 3: Write a Generic Function that Uses the Interface ---
def display_document(doc):
    # This function doesn't care if 'doc' is a PDF or Word document.
    # It just trusts that it has a .show() method.
    print("--- Preparing to display document ---")
    doc.show()

# --- Step 4: Pass Different Objects to the Same Function ---
# Create instances of different classes
pdf = PdfDocument()
word = WordDocument()

# Call the same function with different objects
display_document(pdf)   # Output: --- Preparing to display document ---
                        #         Opening and displaying a PDF document.

display_document(word)  # Output: --- Preparing to display document ---
                        #         Opening and displaying a Word document.
```

 [[Code - Polymorphism Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Shared Interface (Method Signature)**
    - For polymorphism to work, the different objects must expose methods with the same name and compatible parameters. The calling code relies on this consistent 'contract' to function correctly.
- **Inheritance (Common Mechanism)**
    - Using [[Python - Inheritance|inheritance]] from a common base class is the most formal and common way to establish a shared interface. The base class defines the methods, and subclasses provide the specific implementations through method overriding.
- **Duck Typing (Python's Approach)**
    - Python's dynamic nature allows for polymorphism without formal inheritance. If an object 'walks like a duck and quacks like a duck,' Python treats it as a duck. The calling code only cares if the object has the required method at runtime, not what its parent class is.

#### Core Trade-offs

- **Pro: Extensibility and Maintainability**
    - New classes can be added that work with existing polymorphic functions without changing the function's code. This makes systems easier to maintain and extend, adhering to the Open/Closed Principle.
- **Pro: Code Simplicity and Readability**
    - Code becomes cleaner and more intuitive by eliminating long `if/elif/else` chains that check for object types. A single function call can elegantly handle many different types.
- **Con: Potential for Runtime Errors**
    - Especially with duck typing, since interfaces are not strictly enforced at compile time, you might pass an object that lacks the required method, leading to an `AttributeError` at runtime.
- **Con: Increased Abstraction**
    - While powerful, the level of abstraction can sometimes make code harder to trace. It might not be immediately obvious which specific method implementation will be called without inspecting the object's type during debugging.

## Connections

```
                      (Parent)
        Core Principles of OOP
                       ▲
                       │
        ┌──────────────┼───────────────────────────┐
        │              │                           │
(Relies On)     ┌──────────────────┐         (Enables)
Inheritance     │   Polymorphism   │         Loose Coupling
                └──────────────────┘
                       │
            ┌──────────┴──────────┐
            │                     │
      Method Overriding      Duck Typing
```

### Parent Concept

Polymorphism is one of the [[Python - Core Principles of OOP|three core pillars of Object-Oriented Programming]], alongside encapsulation and inheritance.

### Child Concepts

- A key mechanism for achieving polymorphism is **method overriding**, where a subclass provides a specific implementation for a method already defined in its superclass.
- In Python, polymorphism is often expressed through **duck typing**, a concept where the type or class of an object is less important than the methods it defines.

### Related Concepts 

- Polymorphism is often implemented using [[Python - Inheritance|inheritance]], where a base class defines a common interface that subclasses then implement.
- While [[Python - Encapsulation|encapsulation]] is about bundling data and methods together, polymorphism is about creating a single interface to interact with different types of these bundled objects.
- The concept of a common interface is central to polymorphism and is a key reason why [[Python - Class vs Instance Attributes|distinguishing between class and instance attributes]] is important for designing predictable object behavior.
## Questions

- You're designing a payment processing system that must support credit cards, PayPal, and cryptocurrency. How would you use polymorphism to structure the system, and what is the key business advantage of this approach over a non-polymorphic design when you're asked to add a new 'Buy Now, Pay Later' option next quarter with a tight deadline?
- In a large-scale application with dozens of classes implementing a polymorphic interface (e.g., a `render()` method for UI components), how would you design a system to debug a situation where one specific component's `render()` method is causing a major performance bottleneck? How do you trace the call without being able to statically determine which implementation is being used?
- What if Python were a statically-typed language without support for 'duck typing'? How would you be forced to change your approach to achieving polymorphism, and what benefits of Python's dynamic approach would you lose?