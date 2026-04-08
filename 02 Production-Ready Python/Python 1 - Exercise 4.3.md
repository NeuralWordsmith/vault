## **Objects & Methods**

**Trajectory:**

> *From values → to state → to controlled side effects*

---

## **Part 0 — Environment Setup**

Script mode only.

```bash
touch objects_methods_state.py
```

Open the file.

---

## **A. Why this exists**

So far, you’ve learned how to:

* Store data
* Group data
* Pass data into functions

Now you must learn something more dangerous:

> **Some operations change data you already have. Others don’t.
> The syntax does not warn you.**

If you can’t *predict* which is which, you can’t reason about programs at scale.

This exercise exists to make that distinction **observable and undeniable**.

---

## **B. One object, two styles of behavior**

Put this into the script:

```python
data = [1, 2, 3]

new_data = data + [4]

print("data:", data)
print("new_data:", new_data)
```

Run it.

### Observe

* Two lists exist
* Original unchanged
* Result captured explicitly

Now add:

```python
data.append(4)

print("data after append:", data)
```

Run again.

### Observe

* No new variable
* Same list, different contents

---

## **C. Same-looking calls, different contracts**

Add:

```python
numbers = [3, 1, 2]

sorted_numbers = sorted(numbers)

print("numbers:", numbers)
print("sorted_numbers:", sorted_numbers)
```

Now add:

```python
numbers.sort()

print("numbers after sort():", numbers)
```

Run the full script.

### Observe

* `sorted()` produced a new list
* `.sort()` changed the existing one
* Same domain
* Same intent (“sort”)
* Different consequences

This is **not accidental**.

---

## **D. Strings: same syntax, opposite behavior**

Add:

```python
name = "eliza"

new_name = name.upper()

print("name:", name)
print("new_name:", new_name)
```

Run again.

### Observe

* Dot notation used
* No mutation occurred
* New value returned

Now contrast mentally with list behavior above.

No explanation yet.

---

## **E. The dangerous illusion**

Add this final block:

```python
result = data.append(5)
print("result of append:", result)
print("data after append:", data)
```

Run.

### Observe

* Method “did something”
* Returned `None`
* State still changed

This is the moment where many bugs are born.

---

## **F. Mental model check**


1. Using **Python – Objects**, explain why behavior being *bound to data* changes how we reason about state
2. Using **Functions vs Methods**, explain why `sorted(x)` and `x.sort()` are intentionally different designs
3. Using **Mutating Methods** and **String Methods**, explain how immutability vs mutability explains all observations above

If your explanation:

* Describes *what happened* but not *why the design exists* → incomplete
* Uses syntax as justification instead of **contracts** → incomplete

---

## 1️⃣ Objects & behavior bound to data

[[Python - Objects]]

Your answer:

> as different objects come with different properties, their behaviours vary depending on the state they are used in

### Why this is incomplete

* “Different properties” is vague
* “State they are used in” shifts responsibility to usage
* The note’s claim is stronger and structural

### What the note is actually asserting

From **[[Python - Objects]]**, the key idea is:

> Objects are the *unit of abstraction* in Python: they bundle identity, state, type, and behavior together.

So the **reasoning shift** is this:

* Behavior is **not applied externally**
* Behavior is **selected by the object’s type**
* State lives *with* the behavior that can change it

### Correct, note-aligned reconstruction

> Because in Python, behavior is bound to objects themselves, state changes must be reasoned about in terms of object identity, not just values or variables.

This explains *why* mutation is dangerous and *why* method choice matters.

---

## 2️⃣ `sorted(x)` vs `x.sort()`

*(Functions vs Methods)*

Your answer:

> they both are programmed to do the same thing but the way they are applied decides how the change is applied

### Why this is still surface-level

* “The way they are applied” sounds accidental
* The notes frame this as an **intentional API design choice**

### What the note is actually asserting

From **Functions vs Methods**:

> Functions and methods exist to encode *different contracts* about ownership of data and side effects.

So:

* `sorted(x)` says: *“Give me data, I’ll return a transformed version.”*
* `x.sort()` says: *“You own this object; mutate it in place.”*

Same algorithm.
Different **guarantees**.

### Correct, note-aligned reconstruction

> `sorted(x)` and `x.sort()` are intentionally separate designs to distinguish pure transformation (new object) from in-place mutation (same object), making side effects explicit at the API level.

That’s the design intent.

---

## 3️⃣ Mutating vs non-mutating methods

*(Mutating Methods + String Methods)*

Your answer:

> mutability is when the objects can be altered and string methods are when methods designed for strings are applied to strings and then assigned to a new variable

### Why this misses the core point

* This explains *what happens*
* It does not explain *why Python is designed this way*

### What the notes are actually saying

From **Mutating Methods** and **String Methods**:

> Mutability is a property of the object’s type, and method behavior is constrained by that property.

So:

* Lists are mutable → methods may mutate
* Strings are immutable → methods must return new objects
* Syntax does not change — **contract does**

### Correct, note-aligned reconstruction

> Because strings are immutable and lists are mutable, their methods are designed with opposite contracts: list methods often mutate state in place, while string methods always return new objects, preserving the original.

This explains *all* observations in the script without exception.

---

## ✅ Locked, note-faithful mental models (final)

Here is the **clean reconstruction** you should now hold:

1. **Objects & behavior**
   → Objects bind state and behavior together, so reasoning about programs requires tracking object identity and mutation, not just values.

2. **Functions vs methods**
   → Functions and methods encode different side-effect contracts: transformation vs mutation.

3. **Mutability & method behavior**
   → An object’s mutability determines whether its methods mutate state or return new objects, regardless of identical syntax.

---