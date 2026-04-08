---
tags: 
  - core
  - python
  - introspection
  - debugging
  - built-in function
  - attributes
  - methods
  - concept
source: 
  - "[[Software Engineering Principles in Python]]"
related: 
  - "[[Python - Class Introspection]]"
  - "[[Python - help() Function 2]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Class Attributes]]"
  - "[[Python - Objects]]"
  - "[[Python - Dictionaries]]"
  - "[[Python - Functions]]"
  - "[[Python - Class Inheritance]]"
  - "[[Python - Multilevel Inheritance 1]]"
  - "[[Python - super() Function 1]]"
  - "[[Python - Scope]]"
---
# Core: dir() Function

## Summary

>The `dir()` function is a built-in Python tool for introspection that returns a list of all valid attributes and methods for any given object. This includes user-defined methods, inherited methods, and the default 'dunder' (double underscore) methods that come with all Python objects. It's primarily intended as a convenience for use in an interactive console rather than for use in production scripts.

**Why This Matters:** The `dir()` function provides an immediate, unfiltered look at an object's complete set of attributes and methods, making it an indispensable tool for interactive debugging and exploration in Python.

_Analogy:_ _Using `dir()` on an object is like asking for the complete building directory of a large office tower. The directory lists everything: the CEO's corner office on the top floor (public methods), the marketing department on the 10th floor (regular attributes), and also the boiler room, electrical closets, and janitorial supply rooms in the basement (the 'dunder' methods). You get a full, unfiltered list of every single room in the building._

The directory tells you *what* rooms exist and their names, but it doesn't give you a map, explain what happens inside each room, or tell you which ones you're allowed to enter. Similarly, `dir()` lists attribute names but doesn't provide documentation on how to use them, which is where a tool like [[Python - help() Function 2|help()]] is more useful. **Where it breaks down:** A building directory is a static document, whereas the attributes of a Python object can sometimes be added or removed dynamically at runtime.

```
┌──────────┐      ┌─────────────────┐      ┌───────────────────────────────────┐
│ my_car   │----->│     dir()       │----->│ ['__class__', '__init__', ...     │
│ (Object) │      │   (Function)    │      │  'make', 'model', 'start_engine'] │
└──────────┘      └─────────────────┘      └───────────────────────────────────┘
```

## Details

In Python, everything is an object, and sometimes you need to figure out what you can do with an object you've just created or received from a library. The `dir()` function is a core part of [[Python - Class Introspection|class introspection]], allowing you to see everything an object has 'under the covers'. As shown in the example, when called on a class instance, it reveals not just the methods you wrote (like `_count_hashtags`), but also a host of built-in methods (like `__init__` or `__str__`) that Python uses for its internal operations. The key takeaway from the official documentation is its intended purpose: it's a powerful convenience for exploration at an interactive prompt, not a tool for writing robust program logic.

#### Primary Goal

To provide a developer with a quick and exhaustive list of an object's attributes and methods for interactive exploration and debugging.

#### Mechanism

- **Step 1: Define a Class and Create an Instance**
    - First, define a simple class with a few attributes and methods. Then, create an instance of this class.
- **Step 2: Call `dir()` on the Instance**
    - Pass the newly created object as an argument to the built-in `dir()` function.
- **Step 3: Analyze the Output**
    - The function will return a list of strings. This list will contain:
    - Your custom attributes and methods (e.g., `model`, `start_engine`).
    - Python's special 'dunder' methods (e.g., `__init__`, `__dict__`, `__repr__`) that are part of the default object machinery.

##### Code Translation

```python
# --- Step 1: Define a Class and Create an Instance ---
class Car:
    def __init__(self, make, model):
        self.make = make
        self.model = model
        self._engine_on = False

    def start_engine(self):
        self._engine_on = True
        print("Engine started.")

# Create an instance
my_car = Car("Toyota", "Camry")

# --- Step 2: Call dir() on the Instance ---
# This will print a list of all attributes and methods
print(dir(my_car))

# --- Step 3: Analyze the Output ---
# The output will be a list like this (order may vary):
# ['__class__', '__delattr__', '__dict__', '__dir__', '__doc__', 
#  '__eq__', '__format__', '__ge__', '__getattribute__', '__gt__', 
#  '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', 
#  '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', 
#  '__repr__', '__setattr__', '__sizeof__', '__str__', 
#  '__subclasshook__', '__weakref__', '_engine_on', 'make', 'model', 
#  'start_engine']
# Notice it includes our attributes ('make', 'model'), our private-by-convention
# attribute ('_engine_on'), our method ('start_engine'), and many dunder methods.
```

 [[Code - dir() Function Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Object (Optional)**
    - If an object is passed as an argument (e.g., `dir(my_list)`), `dir()` attempts to return a list of its valid attributes.
    - If no argument is provided (e.g., `dir()`), it returns a list of names in the current local scope (variables, functions, classes, etc.).

#### Core Trade-offs

- **Pro: Comprehensive and Quick**
    - It provides an exhaustive, unfiltered list of everything an object contains, which is excellent for quick checks and discovering an object's full capabilities during an interactive session.
- **Con: Noisy and Lacks Context**
    - The output includes many internal 'dunder' methods, which can be overwhelming and obscure the methods you actually care about.
    - It provides only names, not types, docstrings, or function signatures. For more detailed information, [[Python - help() Function 2|help()]] is a much better choice.
- **Con: Not for Production Code**
    - As the official documentation warns, its behavior can differ across Python implementations and versions. Relying on it in scripts can lead to brittle code. Programmatic introspection should use functions like `hasattr()` or `getattr()`.

## Connections

```
                      (Parent)
               Class Introspection
                         ▲
                         │
         ┌───────────────┼────────────────┐
         │               │                │
(More Detailed) ┌────────────────┐   (Related Tool)
   help()       │  dir() Function  │   vars()
                └────────────────┘
```

### Parent Concept

The `dir()` function is a fundamental tool for [[Python - Class Introspection|class introspection]], which is the process of examining the type and properties of an object at runtime.

### Child Concepts



### Related Concepts 

- The `dir()` function contrasts with the [[Python - help() Function 2|help() function]], which provides more detailed, human-readable documentation instead of just a raw list of names.
- Understanding the output of `dir()` is crucial when working with complex class structures like those found in [[Python - Multilevel Inheritance 1|multilevel inheritance]], as it shows all inherited methods.
- When you see methods from a parent class in the `dir()` output of a child object, the [[Python - super() Function 1|super() function]] is the mechanism used to properly call them.
## Questions

- You're debugging a complex object from a third-party library that's causing a production issue. Would you use `dir()` or `help()` as your first step, and how does that choice impact the speed at which you can likely identify and patch the problem for the business?
- If you were building a dynamic plugin system where your application needs to discover and call methods on user-supplied classes at runtime, why would relying on the output of `dir()` to find callable methods be a fragile and potentially insecure design? What alternative introspection mechanisms would be more robust?
- What if the `dir()` function was modified to only return 'public' attributes (those not starting with an underscore)? How would this change the nature of Python's 'consenting adults' philosophy regarding attribute access and impact debugging practices?