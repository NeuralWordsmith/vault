

# List Mutation & Memory Model

*(Mutation, aliasing, and copying)*

This exercise covers **exactly**:

* [[Python - List Manipulation]]
* [[Python - Changing List Elements]]
* [[Python - Changing List Slices]]
* [[Python - List Concatenation]]
* [[Python - Deleting List Elements]]
* [[Python - List Memory Model (Reference vs. Value)]]
* [[Python - Implicit List Copying (Assignment)]]
* [[Python - Explicit List Copying (Cloning)]]
* [[Python - List Manipulation & Memory Model Relationship]]

Focus:

* In-place mutation
* Aliasing bugs
* Professional copying patterns

---

## **Part 0 — Environment Setup**

Script mode. Always.

### 0.1 Create a new script

```bash
touch list_mutation_memory.py
```

Open it in your editor.

---

## **A. Why this exists (the real problem)**

Lists are powerful because they are **mutable**.

Lists are dangerous because they are **mutable**.

The real problem this cluster addresses is:

> How to modify collections **without accidentally modifying other parts of your program**.

Beginners assume:

> “If I change *this* list, only *this* variable changes.”

That assumption is false in Python.

---

## **B. The mechanism (what actually happens)**

We will observe mutation at multiple levels.

---

### **B.1 Changing individual elements (in-place)**

Put this into `list_mutation_memory.py`:

```python
nums = [1, 2, 3]
nums[0] = 99

print(nums)
```

Run it.

**Observe**

* The list changed
* No new list was created
* Same object, new contents

This is **in-place mutation**.

---

### **B.2 Slice assignment (bulk mutation)**

Add:

```python
nums = [1, 2, 3, 4, 5]
nums[1:4] = [20, 30]

print(nums)
```

Run it.

**Observe**

* Length changed
* Middle replaced
* Same list object

**Critical insight**

* Slice assignment can:

  * Replace
  * Insert
  * Delete
* Without creating a new list

This is why slice assignment is powerful — and dangerous.

---

### **B.3 Deleting elements (mutation again)**

Add:

```python
items = ["a", "b", "c", "d"]
del items[1]

print(items)
```

Run it.

**Observe**

* Element removed
* Indices shifted
* Same list object

Deletion is also **mutation**.

---

### **B.4 Concatenation vs mutation**

Add:

```python
a = [1, 2]
b = [3, 4]

c = a + b
print(c)
print(a)
```

Run it.

**Observe**

* `c` is a new list
* `a` is unchanged

Now add:

```python
a += b
print(a)
```

Run again.

**Observe**

* `a` changed
* No new list created

**Critical distinction**

* `+` → creates a new list
* `+=` → mutates in place

This difference causes real bugs.

---

## **C. Failure exercise (aliasing bugs)**

### **C.1 Implicit copying (the trap)**

Add:

```python
original = [1, 2, 3]
alias = original

alias[0] = 999

print(original)
print(alias)
```

Run it.

**Observe**

* Both changed

**What went wrong**

* Assignment copied the **reference**
* Not the data
* Two names, one list

This is called **aliasing**.

---

### **C.2 Slice mutation through alias**

Add:

```python
original = [1, 2, 3, 4]
alias = original

alias[1:3] = [20, 30]

print(original)
```

Run it.

**Observe**

* `original` changed
* Even though you mutated `alias`

This bug is extremely common — and subtle.

---

## **D. Explicit copying (how professionals avoid this)**

### **D.1 Shallow copy using slicing**

Add:

```python
original = [1, 2, 3]
copy1 = original[:]

copy1[0] = 999

print(original)
print(copy1)
```

Run it.

**Observe**

* `original` unchanged
* `copy1` independent

---

### **D.2 Copy using `list()`**

Add:

```python
original = [1, 2, 3]
copy2 = list(original)

copy2.append(4)

print(original)
print(copy2)
```

Run it.

**Observe**

* Independent lists

---

### **D.3 Why this is still dangerous (nested lists)**

Add:

```python
original = [[1, 2], [3, 4]]
copy = original[:]

copy[0][0] = 999

print(original)
print(copy)
```

Run it.

**Observe**

* Both changed

**Why**

* Shallow copy copies the outer list
* Inner lists are still shared

This is where beginners usually panic — correctly.

---

## **E. Correct usage pattern (professional discipline)**

Professionals are explicit about intent:

* Mutate **only** when intended
* Copy **only** when necessary
* Never rely on assignment for copying

Mental model to lock in:

> Lists are mutable objects.
> Names point to them.
> Mutation affects *all* names pointing to the same object.

There is no exception.

---

## **F. Mental model check**

Answer **precisely**:

1. The difference between rebinding a list variable and mutating a list
2. Why `a = b` creates aliasing instead of copying
3. Why slicing copies sometimes fail with nested lists

When you respond, I’ll correct the model *surgically* if needed — then we move on to **functions**, where passing lists multiplies these effects.

---

Good — this is **almost locked**. Only the first answer needs tightening; 2 and 3 are already solid.

I’ll correct **surgically**, then we lock and move on.

---

## 1️⃣ Rebinding vs mutating a list

Your answer:

> rebinding a variable can mostly be for a copy of original list where the element is changed but the original list stays unaffected, mutating a list changes original list itself

### What’s slightly wrong

* Rebinding does **not imply copying**
* Rebinding does **not modify elements**
* Rebinding changes **which object the name points to**

This distinction is critical.

### Correct mental model

* **Rebinding**: the name is attached to a *different object*
* **Mutation**: the *same object* is modified in place

Corrected explanation:

> Rebinding a list variable changes which list object the name refers to, while mutation changes the contents of the same list object.

Example to anchor it:

```python
a = [1, 2, 3]
a = [4, 5, 6]   # rebinding → new list
```

vs

```python
a = [1, 2, 3]
a[0] = 99       # mutation → same list, changed contents
```

---

## 2️⃣ Why `a = b` creates aliasing

Your answer:

> = ties the name to the real object just like the original name, it is not copied

✅ **Correct and precise.**

Minor refinement in wording (optional but cleaner):

> Assignment binds a name to an existing object; it never copies the object itself.

Your mental model here is solid.

---

## 3️⃣ Why slicing copies fail with nested lists

Your answer:

> shallow copy copies the outer list, inner list are still shared

✅ **Exactly right.**

This is the correct, professional explanation.

---

## ✅ Locked reference-grade answers

Here is the **final version** you should internalize:

1. **Rebinding vs mutation**
   → Rebinding changes which object a variable refers to, while mutation changes the contents of the same object in place.

2. **Why `a = b` causes aliasing**
   → Because assignment copies the reference, binding both names to the same list object instead of copying its data.

3. **Why shallow copies fail with nested lists**
   → Because only the outer list is copied; inner lists remain shared references.

---

🔒 **This cluster is now LOCKED.**

You now have a correct mental model of:

* In-place mutation
* Aliasing
* Copying strategies
* Why list bugs are subtle and dangerous

You’re ready to move on.