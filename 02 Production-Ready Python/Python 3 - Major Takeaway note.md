## Chapter 1: Writing your own functions

### 01 - User-defined functions

1. [[Python - User-Defined Functions]] – Custom functions let you package your own logic into reusable, named units, which is the foundation of modular, maintainable Python code 
2. [[Python - Function Definition (def keyword)]] – The `def` keyword tells Python you’re creating a function and establishes a new callable block of code rather than executing it immediately 
3. [[Python - Function Body]] – The indented function body contains the actual logic and only runs when the function is called, not when it is defined 
4. [[Python - Function Header & Body Relationship]] – The header defines *what* the function expects and is called with, while the body defines *how* the task is performed, enforcing clean separation of interface and implementation 
5. [[Python - Calling a Function]] – A function does nothing until it is called, at which point program execution jumps into the function body and returns after completion 
6. [[Python - Parameters vs Arguments]] – Parameters are placeholders defined in the function header, while arguments are the actual values supplied during a function call 
7. [[Python - Function Return Values (return keyword)]] – The `return` statement sends data back to the caller and immediately stops function execution, enabling functions to produce reusable outputs instead of just side effects 
8. [[Python - Docstrings]] – Docstrings embed structured, accessible documentation directly inside functions, making code understandable to humans and tools without reading the implementation 

---

### 02 - Multiple parameters and return values

1. [[Python - Multiple Function Parameters]] – Defining multiple parameters lets a function accept several inputs at once, increasing flexibility but requiring careful design to avoid overly complex signatures 
2. [[Python - Tuples]] – Tuples are ordered, immutable collections used to group related values safely, especially when data should not change 
3. [[Python - Tuples vs Lists]] – Tuples prioritize immutability and data integrity, while lists prioritize flexibility and mutability, making the choice dependent on whether change is expected 
4. [[Python - Tuple Immutability]] – Once created, a tuple cannot be modified, which prevents accidental data changes and enables safe use as dictionary keys 
5. [[Python - Tuple Construction]] – Tuples are created by comma-separated values (optionally wrapped in parentheses), and even single-element tuples require a trailing comma to exist 
6. [[Python - Tuple Unpacking]] – Tuple unpacking assigns tuple elements to multiple variables in one step, making multi-value returns and parallel assignment clean and readable 
7. [[Python - Tuple Indexing]] – Tuple elements are accessed by zero-based indexing using square brackets, allowing fast read-only access to specific positions 
8. [[Python - Function Multiple Return Values]] – Python functions return multiple values by implicitly packing them into a tuple, which can then be unpacked by the caller 
9. [[Python - Tuples & Multiple Return Values Relationship]] – Multiple return values are an illusion built on tuples: the function returns one tuple object that represents a fixed, structured result 

---

## Chapter 2: Default arguments, variable-length arguments and scope

### 01 - Scope and user-defined functions

1. [[Python - Scope]] – Scope defines where a name is visible in a program, controlling which variables can be accessed or modified and preventing accidental name collisions 
2. [[Python - Global Scope]] – Global scope contains variables defined at the top level of a module, making them readable everywhere in that file but risky to modify without care 
3. [[Python - Local Scope]] – Local scope is created when a function runs and holds temporary variables that exist only during that function’s execution 
4. [[Python - Built-in Scope]] – Built-in scope holds Python’s always-available functions and types, acting as the final fallback during name lookup 
5. [[Python - Name Resolution Order]] – Python resolves names using the LEGB rule, searching Local, then Enclosing, then Global, and finally Built-in scopes in that strict order 
6. [[Python - global Keyword]] – The `global` keyword explicitly allows a function to modify a variable in the global scope instead of creating a new local one 

---

### 02 - Nested functions

1. [[Python - Nested Functions]] – Nested functions allow defining functions inside other functions, enabling encapsulation and access to an enclosing scope for more controlled and localized logic 
2. [[Python - LEGB Scope Resolution Rule]] – The LEGB rule defines the exact order Python follows to resolve names: Local → Enclosing → Global → Built-in, ensuring deterministic variable lookup 
3. [[Python - Nested Functions for Code Reusability]] – Nested functions enable reusable helper logic within a single function, reducing duplication while keeping helpers hidden from the global namespace 
4. [[Python - Closures]] – Closures are nested functions that retain access to variables from their enclosing scope even after the outer function has finished executing 
5. [[Python - nonlocal Keyword]] – The `nonlocal` keyword allows a nested function to modify a variable in its enclosing scope instead of creating a new local variable 
6. [[Python - nonlocal Keyword & Enclosing Scope Relationship]] – The `nonlocal` keyword directly targets the enclosing scope in the LEGB rule, enabling stateful behavior in closures by rebinding enclosing variables 

---

### 03 - Default and flexible arguments

1. [[Python - Default Function Arguments]] – Default arguments provide predefined fallback values, making parameters optional and simplifying function calls for common use cases 
2. [[Python - Flexible Function Arguments]] – Flexible arguments allow functions to accept a variable number of inputs, enabling highly reusable and adaptable function interfaces 
3. [[Python - Arbitrary Positional Arguments (args)]] – `*args` collects extra positional arguments into a tuple, allowing a function to handle any number of positional inputs 
4. [[Python - Arbitrary Keyword Arguments (kwargs)]] – `**kwargs` collects extra keyword arguments into a dictionary, enabling functions to accept extensible named options 
5. [[Python - args & Tuples Relationship]] – The `*args` mechanism is built on tuples, meaning positional arguments are stored as an ordered, immutable collection 
6. [[Python - kwargs & Dictionaries Relationship]] – The `**kwargs` mechanism is built on dictionaries, mapping keyword names to values for flexible configuration handling 

---

### 04 - Function Generalization

1. [[Python - Function Generalization Process]] – Function generalization is the step-by-step refinement of a specific function into a more reusable one by identifying varying parts and turning them into parameters or flexible inputs 
2. [[Python - Function Default Arguments]] – Default arguments generalize functions by making certain parameters optional, allowing common behavior without forcing callers to specify every detail 
3. [[Python - Flexible Arguments (args)]] – `*args` generalizes functions further by allowing them to accept an arbitrary number of positional inputs, replacing multiple similar function definitions with one adaptable function 

---

## Chapter 3: Lambda functions and error-handling

### 01 - Lambda functions

1. [[Python - Lambda Functions]] – Lambda functions are small, single-expression functions created inline for short-lived use, commonly passed to higher-order functions instead of being defined with `def` 
2. [[Python - Lambda Function Syntax]] – Lambda syntax enforces a compact structure (`lambda arguments: expression`), limiting the function to one expression that is implicitly returned 
3. [[Python - Anonymous Functions]] – Anonymous functions are functions without a name, typically implemented using `lambda` for one-off logic where reuse and documentation are unnecessary 
4. [[Python - map() Function]] – The `map()` function applies a given function to every element of an iterable and returns a lazy iterator containing the transformed results 
5. [[Python - Converting map Objects to Lists]] – Since `map()` returns an iterator, converting it to a list forces evaluation and materializes the computed results for inspection or reuse 
6. [[Python - Lambda Functions vs def Functions]] – Lambda functions favor brevity and immediacy, while `def` functions favor clarity, reusability, and support for multi-step logic and documentation 
7. [[Python - map() Function & Lambda Functions Relationship]] – Lambdas pair naturally with `map()` by providing inline transformation logic, enabling concise, declarative data processing pipelines 

---

### 02 - Introduction to error handling

1. [[Python - Error Handling]] – Error handling is the practice of anticipating failures and controlling how a program responds, so it behaves predictably instead of crashing unexpectedly 
2. [[Python - Errors]] – Errors signal that an invalid operation occurred and immediately interrupt normal program execution to prevent incorrect or unsafe behavior 
3. [[Python - Exceptions]] – Exceptions are error objects raised by Python to represent specific runtime problems that can be caught and handled programmatically 
4. [[Python - try-except Clause]] – The `try-except` clause allows risky code to be executed safely by catching exceptions and providing an alternative execution path 
5. [[Python - Catching Specific Exceptions]] – Catching specific exceptions targets known failure cases while allowing unexpected bugs to surface, improving debuggability and robustness 
6. [[Python - Raising Errors]] – Raising errors with `raise` enforces function rules explicitly by stopping execution when invalid conditions are detected 
7. [[Python - ValueError vs TypeError]] – `ValueError` indicates invalid data values of the correct type, while `TypeError` indicates fundamentally incompatible data types 
8. [[Python - Handling Invalid DataFrame Column Errors]] – Invalid DataFrame column access should be handled explicitly using checks, `try-except`, or `raise` to avoid silent failures and unclear `KeyError`s 
