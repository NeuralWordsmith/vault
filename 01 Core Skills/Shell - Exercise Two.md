Below is the **next shell exercise**, structured exactly like the previous one:  
**cause of existence → mental model → safe setup → guided drills**.

This group of commands exists for **reading, filtering, and inspecting text streams**, which is the real power of Unix.

---

## 1. Big Picture: Why These Commands Exist

Unix treats **everything as text**:

- config files
    
- logs
    
- CSVs
    
- program output
    

These commands exist to answer four recurring questions:

1. _What is inside this file?_
    
2. _Which part of it matters?_
    
3. _How do I inspect it safely?_
    
4. _How do I combine or reuse information?_
    

---

## 2. Mental Models (Before Touching the Terminal)

### `cat` — _Dump everything_

**Problem it solves:**  
You need the **entire content**, immediately.

**Mental model:**

> `cat` is a firehose. No brakes.

**Important:**  
Never use `cat` on large files casually.

---

### `head` — _Peek, don’t consume_

**Problem it solves:**  
Files can be huge. You often only need the **structure**.

**Mental model:**

> `head` shows the “face” of a file.

---

### `less` — _Safe exploration_

**Problem it solves:**  
You want to **read**, scroll, search, and exit safely.

**Mental model:**

> `less` is a controlled reader, not a printer.

(You can quit anytime with `q`.)

---

### `cut` — _Extract columns_

**Problem it solves:**  
Structured text (CSV, TSV, logs) contains **fields**, not prose.

**Mental model:**

> `cut` slices vertically.

---

### `grep` — _Find meaning_

**Problem it solves:**  
You do not read files — you **search** them.

**Mental model:**

> `grep` filters lines based on patterns.

This is one of the most important Unix commands ever created.

---

### `paste` — _Merge streams_

**Problem it solves:**  
Related data is often split across files.

**Mental model:**

> `paste` joins files horizontally.

---

### `history` — _Your memory_

**Problem it solves:**  
Humans forget commands.

**Mental model:**

> `history` is your audit log.

---

### `man` — _Ground truth_

**Problem it solves:**  
Online tutorials are incomplete or wrong.

**Mental model:**

> `man` is the authoritative specification.

---

## 3. Set Up the Exercise Environment

Stay inside your existing sandbox:

```bash
cd ~/shell_lab
```

Create a new folder:

```bash
mkdir text_lab
cd text_lab
```

---

## 4. Create Sample Files (Important)

### File 1: `students.txt`

```bash
cat > students.txt << EOF
id,name,score
1,Alice,85
2,Bob,72
3,Charlie,90
4,alice,66
EOF
```

### File 2: `cities.txt`

```bash
cat > cities.txt << EOF
Delhi
Mumbai
Chennai
Bangalore
EOF
```

Verify:

```bash
ls
```

---

## 5. Command-by-Command Exercises

### `cat` Exercise

```bash
cat students.txt
```

Ask yourself:

- Was scrolling possible?
    
- Would this be usable for a 10MB file?
    

---

### `head` Exercise

```bash
head students.txt
head -n 2 students.txt
```

Understand:

- `-n` limits output
    
- Useful for CSV headers
    

---

### `less` Exercise (Very Important)

```bash
less students.txt
```

Inside `less`:

- Scroll with arrows
    
- Search with `/Alice`
    
- Quit with `q`
    

Key realization:

> `less` never floods your terminal.

---

### `cut` Exercise (Column Thinking)

Extract names only:

```bash
cut -d ',' -f 2 students.txt
```

Extract id + score:

```bash
cut -d ',' -f 1,3 students.txt
```

Understand:

- `-d` defines separator
    
- `-f` selects columns
    

---

### `grep` Exercise (Filtering)

Find all “alice” (case-insensitive):

```bash
grep -i alice students.txt
```

Count matches:

```bash
grep -ic alice students.txt
```

Exclude matches:

```bash
grep -v alice students.txt
```

Show line numbers:

```bash
grep -n Bob students.txt
```

Key insight:

> `grep` does not modify files — it **selects lines**.

---

### `paste` Exercise

Combine two files:

```bash
paste students.txt cities.txt
```

With delimiter:

```bash
paste -d '|' students.txt cities.txt
```

Understand:

- Line 1 + line 1
    
- Line 2 + line 2
    

---

### `history` Exercise

```bash
history
```

Now rerun a command using history number:

```bash
!10
```

(Use your actual number.)

Key insight:

> Power users rarely retype commands.

---

### `man` Exercise

```bash
man grep
```

Inside `man`:

- `/pattern` to search
    
- `q` to quit
    

Understand:

> If `man` doesn’t mention it, it doesn’t exist.

---

## 6. One Critical Pipeline (Putting It Together)

Run this slowly:

```bash
cut -d ',' -f 2 students.txt | grep -i alice
```

Explain it **in words**:

1. Extract names
    
2. Filter for “alice”
    

This is Unix philosophy in action.

---

## 7. Final Mental Table

|Command|What It Really Is|
|---|---|
|`cat`|Raw dump|
|`head`|Structural peek|
|`less`|Safe reader|
|`cut`|Column slicer|
|`grep`|Line filter|
|`paste`|Horizontal join|
|`history`|Command memory|
|`man`|Specification|

---

## Your Next Step (Required)

Before moving on, do **one thing**:

> Write a single sentence explaining **why `less` exists when `cat` already exists**.

## Explanation

The reason is **intentional design aligned with the Unix philosophy**, not a limitation.

---

## Why `uniq` does **not** remove non-adjacent duplicates

### Short answer

Because `uniq` is designed to operate on **streams**, not on the entire dataset at once.

---

## The real reason (step by step)

### 1. Unix commands are stream processors

Most Unix tools are built to:

- read input **line by line**
    
- produce output **immediately**
    
- use **constant memory**
    

`uniq` reads:

```
current line
previous line
```

That’s it.

It does **not**:

- store all lines
    
- build a set
    
- scan ahead or backward
    

This allows it to work efficiently on:

- huge files
    
- infinite streams
    
- piped input
    

---

### 2. Removing non-adjacent duplicates would require memory

To remove _all_ duplicates, `uniq` would have to:

- remember **every line it has ever seen**
    
- compare new lines against that history
    

That would:

- break streaming
    
- increase memory usage
    
- make it unsuitable for pipes and large data
    

Unix avoids this by **forcing the user to be explicit**.

---

### 3. This is why `sort | uniq` exists

Instead of making `uniq` complex, Unix splits responsibilities:

```bash
sort file | uniq
```

- `sort` → groups identical lines together
    
- `uniq` → removes adjacent duplicates
    

Each tool:

- does one thing
    
- does it well
    
- composes cleanly
    

This is **classic Unix design**.

---

## The deeper philosophy (this matters)

> Unix prefers **explicit pipelines** over implicit behavior.

If `uniq` silently handled non-adjacent duplicates:

- users wouldn’t understand cost or behavior
    
- performance characteristics would be hidden
    
- composition would be less predictable
    

Instead, Unix says:

> “If you want global uniqueness, **say so**.”

---

## One-sentence answer

> `uniq` only removes adjacent duplicates because it is a streaming tool that compares each line only with the previous one, avoiding the memory and complexity required to track all past lines.