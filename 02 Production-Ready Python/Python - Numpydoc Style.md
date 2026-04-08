---
tags: 
  - core
  - python
  - numpydoc
  - docstring_format
  - scientific_python
  - code_documentation
  - sphinx
  - concept
source: 
  - "[[Writing Functions in Python]]"
related: 
  - "[[Python - Docstring Formatting Styles]]"
  - "[[Python - Google-style Docstrings]]"
  - "[[Python - Google-style vs Numpydoc Style]]"
  - "[[Python 5 - Docstrings]]"
  - "[[Python - Anatomy of a Docstring]]"
  - "[[Python - Benefits of Docstrings]]"
  - "[[Python - NumPy (Numeric Python)]]"
  - "[[Python - Accessing Docstrings Programmatically]]"
  - "[[Python - __doc__ Attribute]]"
  - "[[Python - inspect.getdoc() Function]]"
  - "[[Python - inspect Module]]"
  - "[[Python - User-Defined Functions]]"
  - "[[Fundamental - Software Engineering]]"
---
# Core: Numpydoc Style Docstrings

## Summary

>Numpydoc is a specific set of conventions for formatting Python docstrings, widely adopted as the standard in the scientific Python community (e.g., NumPy, SciPy, Pandas). It is known for being highly structured and readable, using reStructuredText syntax with specific section headers like `Parameters`, `Returns`, and `Examples` to clearly organize information.

**Why This Matters:** Adhering to the Numpydoc standard ensures your code is instantly understandable and usable within the scientific Python ecosystem, enabling seamless integration with automatic documentation tools.

_Analogy:_ _A Numpydoc docstring is like a standardized lab report template used by scientists. Before this template, every scientist might write up their experiment differently, making it hard to quickly find the hypothesis, methods, or results. The standardized template creates specific, underlined sections—'Abstract', 'Methodology', 'Results', 'Discussion'—so any other scientist can immediately understand the experiment's purpose, what was used, what happened, and what it means, regardless of who wrote it._

In this analogy, the 'Abstract' is the short summary line. 'Methodology' maps to the `Parameters` section, detailing the required inputs. 'Results' corresponds to the `Returns` section, describing the output. 'Discussion' is similar to the `Notes` or `Examples` sections. **Where it breaks down:** A lab report is designed purely for human readers. A Numpydoc docstring, while highly readable for humans, is also structured to be machine-parsable, allowing tools like Sphinx to automatically generate comprehensive project documentation.

```
Function Definition
+------------------------------------+
| def my_function(param1, param2):   |
|     """One-line summary.          |
|                                    |
|     Extended summary...            |
|                                    |
|     Parameters                     |
|     ----------                     |
|     param1 : type                  |
|         Description of param1.     |
|     param2 : type                  |
|         Description of param2.     |
|                                    |
|     Returns                        |
|     -------                        |
|     return_type                    |
|         Description of return.     |
|     """                            |
|     # ... function logic ...       |
+------------------------------------+
```

## Details

The Numpydoc format is a popular style for writing [[Python 5 - Docstrings|docstrings]], and it stands as the most common format in the scientific Python community. While very similar in purpose to [[Python - Google-style Docstrings|Google-style docstrings]], many find it more aesthetically pleasing and readable due to its use of underlined section headers. This enhanced structure, however, comes at the cost of using more vertical space, making the docstrings longer than their Google-style counterparts. Its primary characteristic is its explicit, section-based layout.

#### Primary Goal

To provide a highly readable, comprehensive, and machine-parsable documentation standard that promotes consistency and clarity across the scientific Python ecosystem.

#### Mechanism

- **How it Works:** Numpydoc achieves its clarity by dividing the docstring into distinct, clearly labeled sections. Each section is identified by a header on one line and an underline composed of hyphens (`-`) on the line below it.
    1. **Short Summary:** A one-line summary that does not exceed 79 characters.
    2. **Extended Summary (Optional):** A more detailed explanation of the function's purpose.
    3. **Parameters:** A section listing each parameter, its type, and a description.
    4. **Returns:** A section listing the returned value(s), their type(s), and a description.
    5. **Other Sections (Optional):** Can include `Yields`, `Receives`, `Raises`, `Warns`, `See Also`, `Notes`, and `Examples`.

##### Code Translation

```python
import numpy as np

def calculate_vector_norm(vector, order=2):
    """Calculate the norm of a vector.

    This function computes the L-norm of a given vector, which is a measure
    of its magnitude.

    Parameters
    ----------
    vector : array_like
        Input vector. Can be a list, tuple, or NumPy array of numbers.
    order : int, optional
        The order of the norm. Default is 2 (Euclidean norm).

    Returns
    -------
    float
        The calculated norm of the vector.

    Examples
    --------
    >>> v = [3, 4]
    >>> calculate_vector_norm(v)
    5.0
    >>> calculate_vector_norm(v, order=1)
    7.0
    """
    vec = np.asarray(vector)
    norm = np.linalg.norm(vec, ord=order)
    return float(norm)

# You can access this docstring programmatically
# print(calculate_vector_norm.__doc__)
```

 [[Code - Numpydoc Style Docstrings Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Parameters Section:**
    - Format: `name : type`
    - The description is indented on the following line(s).
    - Optional parameters are marked with `, optional` after the type.
- **Returns Section:**
    - Format: `type`
    - The description is indented on the following line(s).
    - If multiple values are returned, they are listed without names, just types and descriptions.

#### Core Trade-offs

- **Pro: Superior Readability**
    - The underlined section headers make it very easy to scan and find specific information. Many developers find this style more visually organized and less cluttered than alternatives.
- **Pro: Ecosystem Standard**
    - As the standard for NumPy, SciPy, Pandas, and Matplotlib, using it ensures your code feels native to the scientific Python ecosystem and works flawlessly with tools like Sphinx for documentation generation.
- **Con: Vertical Verbosity**
    - The primary drawback is that it takes up more vertical space than [[Python - Google-style Docstrings|Google-style]]. The section header and its underline alone consume two lines before any content is even listed, which can make docstrings feel long.

## Connections

```
                      (Parent)
            Docstring Formatting Styles
                       ▲
                       │
┌──────────────────────┼──────────────────────┐
│                      │                      │
(Alternative) ┌───────────────────────────┐ (Origin)
Google Style  │ Numpydoc Style Docstrings │ NumPy
              └───────────────────────────┘
```

### Parent Concept

This is one of several common [[Python - Docstring Formatting Styles|docstring formatting styles]] used to standardize code documentation in Python.

### Child Concepts



### Related Concepts 

- It serves the same purpose but **contrasts with** the more compact [[Python - Google-style Docstrings|Google style]], which is a key point of comparison in [[Python - Google-style vs Numpydoc Style|the debate between the two formats]].
- It is the de facto standard for documenting code in libraries like [[Python - NumPy (Numeric Python)|NumPy]], from which it gets its name.
- Regardless of style, all docstrings follow the basic [[Python - Anatomy of a Docstring|anatomy of a docstring]] and can be accessed programmatically using tools from the [[Python - inspect Module|inspect module]].
## Questions

- The Numpydoc format's verbosity improves readability but increases file length. In a startup environment prioritizing rapid prototyping, how would you justify the extra time spent on this detailed documentation versus a more minimal style, and what long-term business value does it provide?
- Imagine you are tasked with enforcing Numpydoc compliance across a 100-developer organization. How would you design a CI/CD pipeline to automatically lint, validate, and build public-facing documentation from these docstrings, and what specific tools (e.g., Sphinx, pydocstyle) would you integrate to handle this at scale?
- What if Python's core syntax were extended to natively support structured documentation, making external formats like Numpydoc obsolete? What would this hypothetical syntax look like, and how would it need to handle concepts like parameter types, return values, and examples to be superior to the current library-based approaches?