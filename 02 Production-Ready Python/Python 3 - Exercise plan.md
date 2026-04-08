# Chapter 1: Writing Your Own Functions — From Action to Abstraction

Exercise 1.1 – From Script to Function

> [[Functions - Exercise 1.1]]

Covers:

* [[Python - User-Defined Functions]]
* [[Python - Function Definition (def keyword)]]
* [[Python - Function Body]]
* [[Python - Calling a Function]]

> How do we turn a piece of working code into a reusable unit instead of something that runs only once?

Focus:

* Separating definition time from execution time
* Understanding that functions *encapsulate behavior*, not execution

Onwards:
This establishes the idea that code can be *named and deferred*, which is required before we can reason about inputs, outputs, and reuse.

---

Exercise 1.2 – Inputs, Outputs, and Intent

> [[Functions - Exercise 1.2]]

Covers:

* [[Python - Parameters vs Arguments]]
* [[Python - Function Return Values (return keyword)]]
* [[Python - Function Header & Body Relationship]]

> How does a function communicate with the outside world in a controlled, predictable way?

Focus:

* Inputs as contracts, not variables
* Return values as data flow, not side effects

Onwards:
Once inputs and outputs are clear, we can start thinking about functions as *data transformers*, which naturally leads to multiple inputs and outputs.

---

Exercise 1.3 – Trusting the Interface

> [[Functions - Exercise 1.3]]

Covers:

* [[Python - Docstrings]]

> How can a function explain itself without requiring the reader to inspect its implementation?

Focus:

* Functions as black boxes
* Documentation as part of the function’s design, not decoration

Onwards:
With clear interfaces and documentation, we are ready to design functions that return richer structured data.

---

Exercise 1.4 – Returning Structure, Not Chaos

> [[Functions - Exercise 1.4]]

Covers:

* [[Python - Multiple Function Parameters]]
* [[Python - Function Multiple Return Values]]
* [[Python - Tuples]]
* [[Python - Tuples & Multiple Return Values Relationship]]

> How can a single function return multiple related results without losing structure?

Focus:

* Grouping related values
* Understanding that “multiple returns” are actually one structured return

Onwards:
This prepares the mental model needed to treat tuples as intentional data containers rather than accidental syntax.

---

Exercise 1.5 – Working With Returned Structure

> [[Functions - Exercise 1.5]]

Covers:

* [[Python - Tuple Construction]]
* [[Python - Tuple Indexing]]
* [[Python - Tuple Unpacking]]
* [[Python - Tuple Immutability]]
* [[Python - Tuples vs Lists]]

> Once data is returned as a tuple, how should it be accessed, trusted, and preserved?

Focus:

* Choosing immutability for safety
* Readability through unpacking instead of indexing

Onwards:
With structured returns mastered, we can now move on to understanding *where* function variables live and how names behave.

---

# Chapter 2: Scope, Control, and Function Evolution

Exercise 2.1 – Where Variables Actually Live

> [[Scope - Exercise 2.1]]

Covers:

* [[Python - Scope]]
* [[Python - Local Scope]]
* [[Python - Global Scope]]
* [[Python - Built-in Scope]]

> Why do some variables exist only briefly while others seem to exist everywhere?

Focus:

* Lifetime vs visibility
* Why functions create safe, temporary worlds

Onwards:
Understanding scope is necessary before we can reason about name conflicts and controlled state changes.

---

Exercise 2.2 – How Python Decides What a Name Means

> [[Scope - Exercise 2.2]]

Covers:

* [[Python - Name Resolution Order]]

> When multiple variables share the same name, how does Python decide which one to use?

Focus:

* LEGB as a deterministic rule, not magic
* Predicting behavior instead of guessing

Onwards:
With LEGB understood, we can safely explore controlled exceptions to normal scope rules.

---

Exercise 2.3 – When Breaking Scope Rules Is Intentional

> [[Scope - Exercise 2.3]]

Covers:

* [[Python - global Keyword]]

> When is it justified to modify global state from inside a function?

Focus:

* Explicitness over convenience
* Why `global` is powerful but dangerous

Onwards:
Now that scope manipulation is understood, we can introduce nested functions as a safer alternative to globals.

---

Exercise 2.4 – Functions Inside Functions

> [[Nested Functions - Exercise 2.4]]

Covers:

* [[Python - Nested Functions]]
* [[Python - Nested Functions for Code Reusability]]

> Why would a function need its own private helper functions?

Focus:

* Encapsulation inside behavior
* Reducing namespace pollution

Onwards:
Nested functions naturally lead to the concept of enclosing scope and persistent state.

---

Exercise 2.5 – Remembering Without Globals

> [[Closures - Exercise 2.5]]

Covers:

* [[Python - Closures]]
* [[Python - LEGB Scope Resolution Rule]]
* [[Python - nonlocal Keyword]]
* [[Python - nonlocal Keyword & Enclosing Scope Relationship]]

> How can a function remember information even after its outer function has finished?

Focus:

* Enclosing scope as controlled memory
* `nonlocal` as precise state rebinding

Onwards:
With closures understood, we can now focus on making functions more flexible and general-purpose.

---

Exercise 2.6 – Making Functions Easier to Call

> [[Arguments - Exercise 2.6]]

Covers:

* [[Python - Default Function Arguments]]

> How can we reduce friction for common use cases without losing flexibility?

Focus:

* Defaults as assumptions
* Designing for the common path

Onwards:
Defaults are the first step toward generalization; variable-length arguments complete the picture.

---

Exercise 2.7 – Accepting the Unknown Number of Inputs

> [[Arguments - Exercise 2.7]]

Covers:

* [[Python - Flexible Function Arguments]]
* [[Python - Arbitrary Positional Arguments (args)]]
* [[Python - Arbitrary Keyword Arguments (kwargs)]]
* [[Python - args & Tuples Relationship]]
* [[Python - kwargs & Dictionaries Relationship]]

> How can a function stay stable even when its inputs are unpredictable?

Focus:

* `*args` as structural flexibility
* `**kwargs` as named extensibility

Onwards:
With flexibility mastered, we can now formalize the process of evolving functions deliberately.

---

Exercise 2.8 – From Specific to General

> [[Function Design - Exercise 2.8]]

Covers:

* [[Python - Function Generalization Process]]
* [[Python - Function Default Arguments]]
* [[Python - Flexible Arguments (args)]]

> How does a function evolve from “works once” to “works everywhere”?

Focus:

* Identifying variation points
* Avoiding premature generalization

Onwards:
With robust function design in place, we can explore functional shortcuts and safety mechanisms.

---

# Chapter 3: Functional Style and Defensive Programming

Exercise 3.1 – One-Off Logic Without Commitment

> [[Lambda - Exercise 3.1]]

Covers:

* [[Python - Lambda Functions]]
* [[Python - Lambda Function Syntax]]
* [[Python - Anonymous Functions]]

> When is a full function definition unnecessary?

Focus:

* Intentional brevity
* Recognizing throwaway logic

Onwards:
Lambdas become powerful when paired with higher-order functions.

---

Exercise 3.2 – Transforming Data Declaratively

> [[Functional Tools - Exercise 3.2]]

Covers:

* [[Python - map() Function]]
* [[Python - map() Function & Lambda Functions Relationship]]
* [[Python - Converting map Objects to Lists]]

> How can we express “what should happen” instead of “how to loop”?

Focus:

* Lazy evaluation
* Separating transformation from storage

Onwards:
Understanding when *not* to use lambdas is just as important.

---

Exercise 3.3 – Choosing Clarity Over Cleverness

> [[Design Tradeoffs - Exercise 3.3]]

Covers:

* [[Python - Lambda Functions vs def Functions]]

> When does conciseness start harming understanding?

Focus:

* Readability as a design constraint
* Long-term maintainability

Onwards:
With expressive power understood, we now shift to making programs resilient.

---

Exercise 3.4 – When Things Go Wrong

> [[Errors - Exercise 3.4]]

Covers:

* [[Python - Errors]]
* [[Python - Exceptions]]
* [[Python - Error Handling]]

> Why does Python prefer to fail loudly instead of continuing silently?

Focus:

* Fail-fast philosophy
* Errors as signals, not nuisances

Onwards:
Once errors are expected, they must be controlled.

---

Exercise 3.5 – Recovering Without Crashing

> [[Error Control - Exercise 3.5]]

Covers:

* [[Python - try-except Clause]]
* [[Python - Catching Specific Exceptions]]

> How can a program recover from known failures while still exposing real bugs?

Focus:

* Precision in exception handling
* Avoiding blanket `except`

Onwards:
Sometimes recovery is wrong; stopping execution is the correct move.

---

Exercise 3.6 – Enforcing Rules Explicitly

> [[Defensive Programming - Exercise 3.6]]

Covers:

* [[Python - Raising Errors]]
* [[Python - ValueError vs TypeError]]

> When should a function refuse to continue?

Focus:

* Input validation as responsibility
* Choosing the correct exception type

Onwards:
This culminates in real-world defensive design.

---

Exercise 3.7 – Defensive Functions in Data Workflows

> [[Applied Error Handling - Exercise 3.7]]

Covers:

* [[Python - Handling Invalid DataFrame Column Errors]]

> How do we prevent silent failures in real data-driven code?

Focus:

* Explicit checks vs reactive handling
* Designing failure messages for humans

Onwards:
This completes the trajectory: from writing a function, to generalizing it, to making it safe, expressive, and reliable.


---