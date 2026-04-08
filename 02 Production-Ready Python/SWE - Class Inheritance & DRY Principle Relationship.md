---
tags: 
  - relationship
  - python
  - inheritance
  - dry principle
  - code reuse
  - object-oriented programming
  - refactoring
  - concept
source: 
  - "[[Software Engineering Principles in Python]]"
related: 
  - "[[SWE - DRY (Don't Repeat Yourself) Principle]]"
  - "[[Python - Class Inheritance]]"
  - "[[Python - Object-Oriented Programming (OOP)]]"
  - "[[Python - Parent and Child Classes 1]]"
  - "[[Python - Implementing Class Inheritance]]"
  - "[[Python - Benefits of Class Inheritance]]"
  - "[[SWE - Benefits of the DRY Principle]]"
  - "[[Python - Class Definition]]"
  - "[[Python - Core Principles of OOP]]"
  - "[[Python - Multiple Inheritance]]"
  - "[[Python - Abstract Base Classes (ABCs)]]"
  - "[[SWE - Do One Thing Principle]]"
  - "[[Python - super()]]"
---
# Relationship: Applying Inheritance for DRY

**Why This Matters:** Using inheritance to enforce the DRY principle is fundamental to building scalable and maintainable software, as it drastically reduces redundant code and centralizes logic, making updates and bug fixes significantly easier.
## The Relationship Defined

**Type:** Implementation

> In Object-Oriented Programming, inheritance provides a direct mechanism for implementing the DRY (Don't Repeat Yourself) principle. Instead of copying code from an existing class (e.g., `Document`) to create a new, similar one (e.g., `SocialMedia`), we can create a specialized version that inherits all the attributes and methods of the original. This establishes a clear relationship between [[Python - Parent and Child Classes 1|parent and child classes]], where the child class reuses the parent's code and only adds or overrides what is necessary. This practice is a cornerstone of writing clean, efficient, and manageable code, directly realizing the [[SWE - Benefits of the DRY Principle|benefits of the DRY principle]] and the [[Python - Benefits of Class Inheritance|benefits of class inheritance]].

_Analogy:_ _Think of a master recipe for a basic cake batter. This is your `Document` class. Now, you want to make several different types of cakes: a chocolate cake, a lemon cake, and a carrot cake. Instead of rewriting the entire recipe for flour, sugar, eggs, and butter each time, you simply reference the master recipe and add the specific ingredients and instructions for each variation (e.g., 'add cocoa powder', 'add lemon zest', 'add shredded carrots'). The master recipe is the parent class, and each specific cake recipe is a child class that inherits the base and adds its own unique features._

In this analogy, the master cake batter recipe is the **parent class** (`Document`), the specific cake recipes (chocolate, lemon) are the **child classes** (`SocialMedia`), the shared ingredients (flour, sugar) are the **inherited attributes/methods**, and the unique additions (cocoa powder, lemon zest) are the **new attributes/methods** in the child class. 
*   **Where it breaks down:** Unlike physical recipes, software inheritance can involve overriding or completely changing the parent's methods, which is like a child recipe saying 'ignore the amount of sugar in the master recipe and use this amount instead.' This level of dynamic modification is unique to programming.

## Mechanism of Interaction

Inheritance implements the DRY principle by allowing a child class to automatically acquire the attributes and methods of its parent class. This prevents the developer from needing to copy and paste code from the parent into the child, thus eliminating redundancy.

### Implementation Proof

```python
# --- Step 1: Define the general 'parent' class ---
# This class has functionality common to any document.
class Document:
    def __init__(self, text, author):
        self.text = text
        self.author = author

    def get_summary(self):
        return f'Document by {self.author}: "{self.text[:20]}..."'

# --- Step 2: Define the specialized 'child' class ---
# It inherits from Document by putting 'Document' in parentheses.
# This avoids repeating the __init__ logic for text and author.
class SocialMedia(Document):
    # --- Step 3: Add new, specific functionality ---
    def __init__(self, text, author, likes=0):
        # Use super() to call the parent's __init__ method, staying DRY
        super().__init__(text, author)
        self.likes = likes

    def like_post(self):
        self.likes += 1
        print(f'Post has {self.likes} likes.')

# --- Step 4: Instantiate and use the child class ---
# It has access to both its own methods and the parent's methods.
my_post = SocialMedia("Learning about inheritance is great!", "Alex", 15)

# Call the inherited method from Document
print(my_post.get_summary())

# Call the specific method from SocialMedia
my_post.like_post()
```

## Implications & Impact

By using inheritance to stay DRY, code becomes significantly more maintainable. A bug fix or feature update in the parent class is instantly propagated to all child classes, saving time and reducing the chance of introducing inconsistencies or errors.

## Key Connections

- The [[SWE - DRY (Don't Repeat Yourself) Principle|DRY principle]] is the 'why', providing the motivation for using techniques like inheritance.
- [[Python - Class Inheritance|Class inheritance]] is the specific 'how', serving as the primary Object-Oriented tool to achieve code reuse.
- This concept is a practical application of the relationship between [[Python - Parent and Child Classes 1|parent and child classes]].
- Understanding the [[Python - Benefits of Class Inheritance|benefits of class inheritance]], such as code reuse and logical structure, explains the advantages of this approach.
- This is a core technique within the broader paradigm of [[Python - Object-Oriented Programming (OOP)|Object-Oriented Programming]].

## Deeper Questions

- When might a deep inheritance hierarchy become a liability, creating a system that is too tightly coupled and resistant to change? How would you justify the business cost of refactoring a large, non-DRY codebase to use inheritance to a project manager focused on short-term feature delivery?
- In a large microservices architecture, how does the principle of using inheritance for DRY apply, given that services are often written in different languages and are loosely coupled? Where do you draw the line between creating shared libraries (a form of DRY) and enforcing inheritance within a single service's domain?
- What if you were building a system where every object had a slightly different, unpredictable set of attributes and behaviors? How would you achieve code reuse and DRY without a rigid class inheritance structure?