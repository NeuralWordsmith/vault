---
tags: 
  - core
  - python
  - methods
  - behavior
  - encapsulation
  - oop
  - class design
  - concept
source: 
  - "[[Software Engineering Principles in Python]]"
related: 
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Automating Object Initialization with __init__]]"
  - "[[Python - Objects]]"
  - "[[Python - Class Attributes]]"
  - "[[Python - Class Inheritance]]"
  - "[[Python - Tokenization]]"
  - "[[Fundamental - Natural Language Processing]]"
  - "[[SWE - Do One Thing Principle]]"
  - "[[Python - Non-Public (Internal Use) Methods]]"
  - "[[Python - Single Leading Underscore Convention]]"
  - "[[Python - Risks of Using Non-Public Methods]]"
  - "[[Python - Class Methods]]"
  - "[[Python - Operator Overloading]]"
---
# Core: Extending a Class with Methods

## Summary

>After establishing an object's initial state and attributes with `__init__`, extending a class with methods involves defining additional functions within the class to give its objects behaviors. While `__init__` answers 'What is this object?', methods answer 'What can this object do?'. For example, adding a `tokenize` method to a `Document` class allows a document object to process its own text.

**Why This Matters:** Adding methods transforms a class from a simple data container into a powerful, self-contained tool that can perform actions on its own data, which is the essence of object-oriented programming.

_Analogy:_ _Think of a class as a blueprint for a smart coffee machine. The `__init__` method is the section of the blueprint that defines its core attributes when it's built: its water capacity, its color, and whether it has a grinder. Extending the class with methods is like adding the operational instructions to the blueprint: a `brew_coffee()` method, a `grind_beans()` method, and a `clean_machine()` method. These methods use the machine's attributes (like water capacity) to perform actions._

**Where it breaks down:** A physical coffee machine has a fixed set of functions defined by its hardware. In programming, objects are far more flexible; you can add, modify, or even remove methods after the object is created (a practice known as monkey-patching), which isn't possible with the physical machine.

```
┌──────────────────────────┐
│      Document Object     │
├──────────────────────────┤
│ Attributes:              │
│   - text: "Hello world"  │
│                          │
│ Methods:                 │
│   - __init__(self, text) │
│   - tokenize(self)       │
└──────────────────────────┘
```

## Details

A class in Python isn't just for storing data; its true power comes from bundling that data (attributes) with the functions (methods) that operate on it. This principle is known as encapsulation. After [[Python - Automating Object Initialization with __init__|automating initialization]] to set up an object's state, the next logical step is to add methods that provide its functionality. As seen in the context, a `Document` class becomes much more useful when it can not only store text but also perform operations like [[Python - Tokenization|tokenization]] on that text.

#### Primary Goal

To add behaviors and functionalities to an object, allowing it to perform actions related to its own data and state.

#### Mechanism

- **Step 1: Define the Class and Initializer**
    - Begin with the `class` keyword and define the `__init__` method. This method takes `self` and any other arguments needed to set up the initial state of the object's attributes. For our `Document`, it stores the raw text.
- **Step 2: Define a New Method**
    - Inside the class, define a new function. This function becomes a method of the class. Crucially, its first parameter must be `self`, which gives the method access to the instance's attributes and other methods.
- **Step 3: Implement the Method's Logic**
    - Within the method, write the code to perform the desired action. This code can access the object's data using `self.attribute_name`. For example, `self.text` is used to get the document's content for tokenization.
- **Step 4: Instantiate and Use the Method**
    - Create an instance of the class. You can then call the newly defined method on this instance using dot notation (e.g., `my_document.tokenize()`). The result of the method's operation can be returned and stored in a variable.

##### Code Translation

```python
# --- Step 1: Define the Class and Initializer ---
class Document:
    """A class to represent a text document."""
    def __init__(self, text):
        """Initializes the Document with its text content."""
        self.text = text

    # --- Step 2 & 3: Define and Implement a New Method ---
    def tokenize(self):
        """Splits the document's text into a list of words (tokens)."""
        # Access the instance's data using self.text
        return self.text.split()

# --- Step 4: Instantiate and Use the Method ---
# Create an instance of the Document class
my_document = Document("This is an example document for tokenization.")

# Call the tokenize method on the instance
tokens = my_document.tokenize()

print(f"Original Text: {my_document.text}")
print(f"Tokens: {tokens}")
# Output:
# Original Text: This is an example document for tokenization.
# Tokens: ['This', 'is', 'an', 'example', 'document', 'for', 'tokenization.']
```

 [[Code - Extending a Class with Methods Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Method Parameters**
    - Methods can accept additional arguments beyond `self` to make them more flexible. For example, `tokenize(self, delimiter=' ')` could allow the user to specify how the text should be split.
- **Return Values**
    - Methods often use the `return` keyword to send back the result of their computation. If a method doesn't explicitly return a value, it implicitly returns `None`.

#### Core Trade-offs

- **Pro (Encapsulation & Reusability)**
    - Bundling data and methods together makes code more organized and intuitive. An object manages its own state and behavior, which makes it a self-contained, reusable component.
- **Con (Over-complication)**
    - Adding too many unrelated methods to a single class can lead to a 'God Object' that violates the [[SWE - Do One Thing Principle|Single Responsibility Principle]]. This makes the class difficult to understand, test, and maintain.
- **Consideration (API Design)**
    - It's important to distinguish between the public methods that form the class's interface and internal helper functions. This is often managed using the [[Python - Single Leading Underscore Convention|single leading underscore convention]] for [[Python - Non-Public (Internal Use) Methods|non-public methods]].

## Connections

```
          (Parent)
      Class Definition
             ▲
             │
┌────────────┼────────────┐
│            │            │
(Related)  ┌───────────────────────────────┐  (Related)
Tokenization │ Extending a Class with Methods  │  __init__
           └───────────────────────────────┘
                         │
              ┌──────────┴──────────┐
              │                     │
      Non-Public Methods      Class Methods
          (Child)               (Child)
```

### Parent Concept

This concept is a direct extension of [[Python - Class Definition|defining a class]], moving beyond just establishing the initial state to defining the object's interactive behaviors.

### Child Concepts

- A common practice is to define [[Python - Non-Public (Internal Use) Methods|non-public (internal use) methods]], which act as helper functions for the main public methods of the class.
- A special type of method is the [[Python - Class Methods|class method]], which operates on the class itself rather than on an individual instance of the class.

### Related Concepts 

- This process builds directly upon [[Python - Automating Object Initialization with __init__|automating object initialization]], which sets up the data that the methods will subsequently use.
- The example in the context uses [[Python - Tokenization|tokenization]] as a practical application of adding a method to a `Document` class.
- The decision of which methods to expose publicly versus keeping internal relates to the [[Python - Single Leading Underscore Convention|single leading underscore convention]].
- Careless use of non-public methods can lead to [[Python - Risks of Using Non-Public Methods|significant risks]], as it breaks the intended encapsulation of the class.
## Questions

- Imagine our `Document` class is used in a legal e-discovery platform. Adding a complex `summarize()` method could provide huge value but might be slow and expensive to run. How would you decide whether to include this feature directly in the class, and how would you explain the trade-off between performance cost and user value to the product manager?
- If our `Document` class needs to handle terabytes of text data, running `tokenize()` on every object instantiation could be a massive memory bottleneck. How would you refactor the class design to support lazy tokenization, where the tokenization only happens when the tokens are actually requested, and what are the potential downsides of this approach in a multi-threaded environment?
- What if Python's `class` syntax was removed, but you still had functions and dictionaries? How would you simulate the behavior of a `Document` object with a `tokenize` method using only closures and dictionaries to achieve a similar level of data and behavior encapsulation?