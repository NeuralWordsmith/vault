---
tags: 
  - process
  - swe
  - sphinx
  - docstring
  - class_documentation
  - ivar
  - restructuredtext
  - concept
source: 
  - "[[Software Engineering Principles in Python]]"
related: 
  - "[[Python 5 - Docstrings]]"
  - "[[SWE - Sphinx]]"
  - "[[Python - Package Documentation]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Attributes]]"
  - "[[Python - Docstring Formatting Styles]]"
  - "[[Python - Accessing Docstrings Programmatically]]"
  - "[[SWE - Continuous Integration (CI)]]"
  - "[[Python - Packages]]"
  - "[[Python - Objects]]"
  - "[[Python - Functions]]"
---
# Process: Class Docstrings for Sphinx

**Why This Matters:** Properly documenting classes in the docstring allows tools like Sphinx to automatically generate clear, user-friendly documentation, making your code easier for others to understand and use.
## Goal & Analogy

> **Goal:** This is a specific convention for writing Python class docstrings where documentation for the `__init__` method's parameters and the class's instance attributes are placed directly within the class-level docstring. This practice centralizes the information needed to create and understand an object, making it easily accessible to both developers using the `help()` function and automated documentation tools like [[SWE - Sphinx|Sphinx]].

_Analogy:_ _Think of a class docstring formatted this way as the 'What's in the Box & Quick Start' guide on the side of a new gadget's packaging. The main description tells you what the gadget does ('Analyze text data'). The `:param` section is the 'Quick Start' part, telling you what you need to provide to get it running (e.g., 'Requires 2 AA batteries'). The `:ivar` section is the 'What's in the Box' list, detailing all the components and features you'll have once it's set up (e.g., 'Includes power cord, remote control, user manual')._

The gadget itself is the class instance. The 'Quick Start' instructions map to the `:param` documentation for `__init__`. The 'What's in the Box' list maps to the `:ivar` documentation for instance attributes. 

**Where it breaks down:** Unlike a static paper guide, this docstring is live, introspectable code. It can be accessed programmatically, and tools can verify its accuracy, which is impossible with a printed manual.

```
Source Code (.py)                 Processing Tool                Rendered Documentation (.html)
+--------------------------+                              +------------------------------------+
| class Document:          |                              | Document Class                     |
|   """                    |                              |                                    |
|   :param text: ...       |  ───────── [[SWE - Sphinx|Sphinx]] ────────>  | Parameters:                        |
|   :ivar tokens: ...      |                              |   • text: text to analyze          |
|   """                    |                              |                                    |
|   ...                    |                              | Attributes:                        |
+--------------------------+                              |   • tokens: Parsed list of words...|
                                                          +------------------------------------+
```

## The Step-by-Step Process

### Prerequisites / Inputs

- **Docstring Keywords:** These are the 'levers' that control how the documentation is generated.
    - **:param <name>:** Used to describe a parameter required by the `__init__` method. The `<name>` must match the argument name in the `__init__` signature.
    - **:ivar <name>:** Used to describe an instance variable (attribute) that is created, typically within `__init__`. This informs the user about the state and data the object will hold.
    - **:type <name>:** (Optional but recommended) Can be used alongside `:param` and `:ivar` to specify the expected data type, e.g., `:type text: str`.

### The Steps

- **How it Works:**
    1. **Centralize:** The docstring is placed immediately after the `class ClassName:` line.
    2. **Document Parameters:** For each parameter in the `__init__` method, a line is added to the class docstring using the format `:param <name>: <description>`.
    3. **Document Attributes:** For each instance attribute (e.g., `self.attribute`), a line is added using the format `:ivar <name>: <description>`. This tells users what properties they can expect to find on an instance of the class.
    4. **Process:** An automated tool like [[SWE - Sphinx|Sphinx]] parses this specially formatted text (reStructuredText) and renders it as a clean, organized HTML documentation page.

##### Code Translation

```python
class Document:
    """Analyze text data

    :param text: text to analyze

    :ivar text: text originally passed to the instance on creation
    :ivar tokens: Parsed list of words from text
    :ivar word_counts: Counter containing counts of hashtags used in text
    """
    def __init__(self, text):
        # The docstring for __init__ can be omitted or kept very brief,
        # as the detailed documentation is now in the class docstring.
        self.text = text
        self.tokens = self._tokenize(text)
        self.word_counts = self._count_words(self.tokens)
    
    def _tokenize(self, text):
        # ... implementation ...
        return text.split()

    def _count_words(self, tokens):
        # ... implementation ...
        from collections import Counter
        return Counter(tokens)

# A user can now get all the info in one place:
# help(Document)
```

### Deliverables / Outputs

When documenting a Python class for tools like [[SWE - Sphinx|Sphinx]], a common and powerful convention is to place the documentation for initialization parameters and instance attributes directly in the class's main docstring. Instead of putting parameter descriptions in the `__init__` method's docstring, you move them up to the class level. This provides a single, consolidated view for anyone wanting to know how to create an instance of the class. Additionally, you explicitly document the attributes that an instance will have using the `:ivar` keyword, which is short for 'instance variable'.

## Context & Tradeoffs

### When to Use This Process

To centralize the documentation for a class's instantiation and its attributes, making it machine-readable for automated tools like Sphinx and human-readable via Python's built-in `help()` function.

### Common Pitfalls & Tradeoffs

- **Pros:**
    - **Machine-Readable:** The structured format is designed to be parsed by tools, enabling powerful automated documentation generation.
    - **Centralized Knowledge:** A user only needs to look in one place (`help(ClassName)`) to understand how to create and use an object.
    - **Clarity:** Explicitly listing instance variables with `:ivar` makes the class's public interface and stored state very clear, even if they are created through complex logic in `__init__`.
- **Cons:**
    - **Verbosity:** For very simple classes, this format can feel more verbose than a simple, free-form docstring.
    - **Maintenance:** If you add a new parameter to `__init__` or a new instance attribute, you must remember to update the class docstring accordingly.

## Connections

```
                      (Parent)
               Python - Docstrings
                         ▲
                         │
         ┌───────────────┼────────────────┐
         │               │                │
(Tool)          ┌───────────────────────────┐        (Foundation)
[[SWE - Sphinx|Sphinx]] ───┤ Class Docstrings for Sphinx ├─── [[Python - Class Definition|Class Definition]]
                └───────────────────────────┘
```


- This documentation style is specifically designed to be processed by [[SWE - Sphinx|Sphinx]], which is a powerful tool for generating professional-grade project documentation.
- It is a specific application of the general principles outlined in [[Python 5 - Docstrings|Python Docstrings]].
- This method provides the necessary information for understanding a [[Python - Class Definition|class definition]] and how to instantiate it.
- Maintaining this level of documentation quality is often enforced as a step in a [[SWE - Continuous Integration (CI)|Continuous Integration (CI)]] pipeline to ensure code quality and maintainability.
- This practice is a core component of creating maintainable [[Python - Package Documentation|Python package documentation]].

## Deeper Questions

- If your team doesn't use an automated documentation generator like Sphinx, what are the arguments for and against adopting this detailed class docstring convention versus a simpler, more concise style? How does this impact developer onboarding time vs. long-term maintainability?
- Imagine you're building a CI/CD pipeline. How would you integrate a step to automatically fail the build if a public class or its `__init__` method is missing this specific style of docstring, and what tools (e.g., linters, custom scripts) would you use to enforce this standard?
- What if Python's `help()` function was deprecated and all documentation was expected to be in external markdown files? How would this change the way we write and think about in-code documentation, and what new problems might arise from decoupling documentation from the source code?