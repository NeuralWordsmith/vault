---
tags: 
  - core
  - python
  - documentation
  - code_style
  - readability
  - sphinx
  - pep257
  - concept
source: 
  - "[[Writing Functions in Python]]"
related: 
  - "[[Python - Docstrings]]"
  - "[[Python - Docstring Formatting Styles]]"
  - "[[Python - Numpydoc Style]]"
  - "[[Python - Google-style vs Numpydoc Style]]"
  - "[[Python - Anatomy of a Docstring]]"
  - "[[Python - Accessing Docstrings Programmatically]]"
  - "[[Python - __doc__ Attribute]]"
  - "[[Python - inspect.getdoc() Function]]"
  - "[[Python - inspect Module]]"
  - "[[Python - User-Defined Functions]]"
  - "[[Python - Functions]]"
  - "[[Python - Packages]]"
  - "[[Python - Error Handling]]"
  - "[[Fundamental - Software Engineering]]"
---
# Core: Google-style Docstrings

## Summary

>Google-style is a specific convention for formatting [[Python - Docstrings|docstrings]] that emphasizes readability and simplicity. It structures the documentation into clear sections like 'Args', 'Returns', and 'Raises', making a function's purpose, parameters, and outputs immediately understandable. This format follows the general [[Python - Anatomy of a Docstring|anatomy of a docstring]] but enforces a clean, indented layout.

**Why This Matters:** This style creates highly readable and consistent documentation that can be automatically parsed by tools like Sphinx to generate professional-grade project websites, making code easier to understand and maintain.

_Analogy:_ _A Google-style docstring is like a modern, well-designed recipe card. The function name is the dish's title. The one-line summary is the enticing description ('A quick and zesty lemon pasta'). The 'Args' section is the 'Ingredients' list, specifying each item, its quantity, and its form (e.g., 'lemon (1, whole): for juice and zest'). The 'Returns' section is the 'Serves' line, telling you what you'll end up with ('A delicious pasta dish for 2'). Finally, the 'Raises' section is the 'Allergy Warning' (e.g., 'Contains gluten: if using standard pasta')._

The recipe card's title is the function's summary. The ingredients list maps directly to the `Args` section. The final dish description maps to the `Returns` section, and allergy warnings map to the `Raises` section. **Where it breaks down:** A recipe is primarily for human interpretation and manual execution. A docstring, while also for humans, is critically designed to be machine-parsable by documentation generators and IDEs, which have no tolerance for ambiguity.

```
def function_name(arg1, arg2):
    """Concise summary in imperative mood.

    Args: ───────────────────┐
        arg1 (type): Description of arg1.
        arg2 (type): Description of arg2.

    Returns: ──────────────────┐
        type: Description of what is returned.

    Raises: ───────────────────┐
        ErrorType: When this error is raised.
    """
```

## Details

Google-style docstrings provide a standardized format for documenting Python code, making it more accessible to both humans and automated tools. It is one of the most popular [[Python - Docstring Formatting Styles|docstring formatting styles]], alongside the [[Python - Numpydoc Style|Numpydoc style]]. The structure is built around a few key, clearly-labeled sections: **Args**, **Returns**, and **Raises**.

#### Primary Goal

To provide a clean, readable, and parsable standard for documenting a function's interface, including its parameters, return values, and potential errors.

#### Mechanism

- **How it Works:** The format follows a logical progression to explain a function's contract.
    1. **Summary Line:** A single, concise line in the imperative mood (e.g., "Calculate the sum...") that ends with a period.
    2. **Extended Description (Optional):** A more detailed paragraph explaining nuances or context.
    3. **Args Section:** Begins with the header `Args:`. Each argument is listed on a new line, indented, with the format `argument_name (type): Description of the argument.`
    4. **Returns Section:** Begins with the header `Returns:`. It describes the object returned by the function, with the format `type: Description of the return value.` For functions that don't return anything, this section is omitted.
    5. **Raises Section:** Begins with the header `Raises:`. It lists any exceptions the function intentionally raises, with the format `ExceptionType: Reason why the exception is raised.`

##### Code Translation

```python
# --- Example of a Google-style Docstring ---
def calculate_velocity(distance, time):
    """Calculates the velocity given distance and time.

    This function implements the basic formula v = d/t.

    Args:
        distance (float): The total distance traveled, in meters.
        time (float): The total time elapsed, in seconds. Must be non-zero.

    Returns:
        float: The calculated velocity in meters per second.

    Raises:
        ValueError: If the provided time is zero.
    """
    if time == 0:
        raise ValueError("Time cannot be zero.")
    return distance / time

# You can then access this documentation programmatically
# using the __doc__ attribute or inspect.getdoc()
# print(calculate_velocity.__doc__)
```

 [[Code - Google-style Docstrings Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Args Section**
    - Defines the function's inputs. Each entry clarifies the parameter's name, expected data type, and its role in the function's logic.
- **Returns Section**
    - Defines the function's output. It specifies the data type of the returned value and what that value represents.
- **Raises Section**
    - Defines the function's explicit error conditions. This is crucial for robust [[Python - Error Handling|error handling]] by the function's caller.

#### Core Trade-offs

- **Pro: Readability**
    - The indented, clean style is often considered more human-readable at a glance compared to more verbose formats.
- **Pro: Simplicity**
    - It has fewer section types than [[Python - Numpydoc Style|Numpydoc]], making it quicker to write and easier for new developers to learn.
- **Con: Less Detail for Complex Types**
    - Numpydoc's format can be better for describing complex return types, like a tuple with multiple named components, as it provides a separate line for each part of the return value.

## Connections

```
                 (Parent)
        Docstring Formatting Styles
                   ▲
                   │
┌──────────────────┼──────────────────┐
│                  │                  │
(Alternative) ┌───────────────────────────┐ (Prerequisite)
Numpydoc Style  │ Google-style Docstrings │ Anatomy of a Docstring
                └───────────────────────────┘
```

### Parent Concept

This is one of the major conventions within the broader topic of [[Python - Docstring Formatting Styles|docstring formatting styles]].

### Child Concepts



### Related Concepts 

- It directly contrasts with the [[Python - Numpydoc Style|Numpydoc style]], which is often preferred in the scientific Python community for its more detailed sections.
- The choice between the two is a key topic explored in [[Python - Google-style vs Numpydoc Style]].
- Understanding the [[Python - Anatomy of a Docstring|basic anatomy of a docstring]] is a prerequisite for applying any specific formatting style.
- Regardless of style, the docstring can be accessed programmatically using the [[Python - __doc__ Attribute|__doc__ attribute]] or the [[Python - inspect.getdoc() Function|inspect.getdoc() function]].
## Questions

- Your team is starting a new project that will be maintained by both data scientists and backend software engineers. How would you decide between Google-style and Numpydoc, and how would you justify the long-term maintenance cost and developer onboarding benefits of your choice to management?
- Imagine you're building an internal tool that automatically generates a searchable API reference from the codebase. What specific parsing challenges might Google-style docstrings present compared to a more rigid format like XML, and how would you design your parser to be robust against common formatting errors made by developers?
- What if Python's type hinting system became so expressive and universally adopted that it could fully describe argument roles, return value semantics, and potential exceptions? Would structured docstring formats like Google-style become obsolete, or would they still serve a critical purpose?