# Python Functions, Scope, Arguments, Lambdas, Tuples & Error Handling — Master Cheat Sheet

---

|**Category**|**Concept**|**Key Idea / Takeaway**|
|---|---|---|
|**Functions (Core)**|User-Defined Functions|Reusable blocks of code created with `def` to encapsulate logic|
||Function Header|Defines function name and parameters; acts as the interface|
||Function Body|Indented code block executed when the function is called|
||Calling a Function|Triggers execution of the function body|
||Return Values|`return` sends data back and ends function execution|
||Docstrings|Embedded documentation describing purpose, inputs, and outputs|
|**Parameters & Arguments**|Parameters vs Arguments|Parameters are placeholders; arguments are actual values|
||Multiple Parameters|Functions can accept multiple inputs|
||Default Arguments|Provide fallback values, making parameters optional|
||Function Generalization|Converting specific logic into reusable functions via parameters|
|**Flexible Arguments**|`*args`|Collects extra positional arguments into a tuple|
||`**kwargs`|Collects extra keyword arguments into a dictionary|
||args ↔ Tuples|Positional arguments are stored as an immutable tuple|
||kwargs ↔ Dictionaries|Keyword arguments are stored as key–value pairs|
|**Tuples**|Tuples|Ordered, immutable collections of values|
||Tuple Construction|Created using parentheses `()` and commas|
||Tuple Immutability|Elements cannot be reassigned after creation|
||Tuple Indexing|Access elements via zero-based indexing|
||Tuple Unpacking|Assign multiple variables from a tuple in one step|
||Tuples vs Lists|Tuples are immutable; lists are mutable|
|**Functions + Tuples**|Multiple Return Values|Functions return multiple values by packing them into tuples|
||Tuples & Returns|Caller unpacks returned tuple into variables|
|**Scope**|Scope|Defines where a name is accessible in a program|
||Local Scope|Variables inside a function|
||Enclosing Scope|Scope of an outer function in nesting|
||Global Scope|Module-level variables|
||Built-in Scope|Python’s predefined names|
|**Name Resolution**|LEGB Rule|Lookup order: Local → Enclosing → Global → Built-in|
|**Scope Modifiers**|`global` keyword|Allows modification of global variables inside functions|
||`nonlocal` keyword|Allows modification of enclosing-scope variables|
||nonlocal & Enclosing|Targets the “E” in LEGB for closures|
|**Nested Functions**|Nested Functions|Functions defined inside other functions|
||Code Reusability|Inner helper functions reduce duplication|
||Closures|Inner functions that remember enclosing variables|
|**Lambda & Functional Tools**|Lambda Functions|Small, single-expression anonymous functions|
||Lambda Syntax|`lambda args: expression`|
||Anonymous Functions|Functions without a formal name|
||`map()` Function|Applies a function to each element of an iterable|
||map Objects|Lazy iterators; often converted to lists|
||Lambda vs `def`|Lambda for short logic; `def` for complex/reusable logic|
||map + lambda|Concise functional data transformation|
|**Error Handling**|Error Handling|Managing failures to avoid crashes|
||Errors|Interrupt execution due to invalid operations|
||Exceptions|Catchable runtime error objects|
||try–except|Safely handle risky operations|
||Specific Exceptions|Catch precise error types|
||Raising Errors|Use `raise` to enforce rules|
||ValueError vs TypeError|Value issue vs type incompatibility|
||DataFrame Column Errors|Validate column access to prevent runtime failures|

## 1. User-Defined Functions (UDFs)

* **User-Defined Function**: A reusable block of code created using `def` to perform a specific task.
* **Function Header**: Declares the function name and parameters.
* **Function Body**: Indented block that runs when the function is called.
* **Calling a Function**: Executes the function body.
* **Return Values**: `return` sends data back to the caller and ends execution.
* **Docstrings**: Triple-quoted strings documenting what a function does.

---

## 2. Parameters & Arguments

* **Parameters**: Placeholders in the function definition.
* **Arguments**: Actual values passed during a function call.
* **Multiple Parameters**: Functions can accept more than one input.
* **Default Arguments**: Parameters with predefined values if no argument is supplied.
* **Function Generalization**: Gradually converting specific functions into reusable ones by introducing parameters and defaults.

---

## 3. Flexible Function Arguments

* **`*args`**: Collects extra positional arguments into a tuple.
* **`**kwargs`**: Collects extra keyword arguments into a dictionary.
* **args ↔ Tuples**: `*args` is internally stored as a tuple.
* **kwargs ↔ Dictionaries**: `**kwargs` is internally stored as a dictionary.

---

## 4. Tuples

* **Tuple**: Ordered, immutable collection of values.
* **Tuple Construction**: Created using parentheses `()`.
* **Tuple Immutability**: Elements cannot be reassigned.
* **Tuple Indexing**: Access elements using zero-based indexing.
* **Tuple Unpacking**: Assign multiple variables from a tuple in one statement.
* **Tuples vs Lists**:
  * Tuples → immutable, safer for fixed data.
  * Lists → mutable, used when data changes.
* **Multiple Return Values**: Python functions return multiple values via tuples.
* **Tuples & Return Values**: Multiple values are automatically packed into a tuple.

---

## 5. Scope & Name Resolution

### Scope Types

* **Local Scope**: Inside a function.
* **Enclosing Scope**: Outer function in nested functions.
* **Global Scope**: Top-level of a module.
* **Built-in Scope**: Python’s predefined names.

### LEGB Rule (Name Resolution Order)

1. Local
2. Enclosing
3. Global
4. Built-in

Python stops searching once the name is found.

---

## 6. Scope Modifiers

* **`global` keyword**: Allows modification of global variables inside functions.
* **`nonlocal` keyword**: Allows modification of enclosing-scope variables inside nested functions.
* **nonlocal ↔ Enclosing Scope**: `nonlocal` specifically targets the nearest enclosing function scope.

---

## 7. Nested Functions & Closures

* **Nested Function**: Function defined inside another function.
* **Code Reusability**: Inner helper functions avoid repetition.
* **Closures**: Inner functions that remember enclosing variables even after the outer function exits.
* **Closures + nonlocal**: Enable stateful behavior without classes.

---

## 8. Lambda & Functional Tools

* **Lambda Function**: Small anonymous function written in one line.
* **Lambda Syntax**: `lambda arguments: expression`
* **Anonymous Functions**: Functions without a name.
* **`map()` Function**: Applies a function to each item in an iterable.
* **map Objects**: Lazy iterators → often converted to lists.
* **Lambda vs `def`**:

  * Lambda → short, single expression.
  * `def` → full, reusable, multi-line logic.
* **map + lambda**: Common pairing for concise transformations.

---

## 9. Error Handling

* **Errors**: Issues that break program execution.
* **Exceptions**: Runtime errors that can be caught and handled.
* **try-except**: Prevents program crashes by handling exceptions.
* **Specific Exceptions**: Catch precise error types for clarity.
* **Raising Errors**: Use `raise` to signal invalid conditions manually.
* **ValueError vs TypeError**:

  * ValueError → correct type, invalid value.
  * TypeError → invalid data type.
* **Handling DataFrame Column Errors**: Validate column names before access to avoid runtime failures.

---

## 10. Mental Model Summary

* Functions encapsulate logic.
* Parameters generalize behavior.
* Tuples safely bundle data.
* LEGB governs visibility.
* `global` and `nonlocal` control scope mutation.
* Lambdas optimize short logic.
* Exceptions protect execution flow.

---