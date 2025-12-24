
This set is **not new commands** so much as **control operators and stream transformers**. This is where shell stops being “file navigation” and becomes a **data-processing language**.

---

## 1. Big Picture: What Changed Here?

Up to now, you were **issuing commands**.

From this point onward, you are **wiring commands together**.

Unix assumes:

- programs should do **one thing well**
    
- the shell should **compose** them
    

Everything below exists to support **composition**.

---

## 2. Mental Models (Critical — Read Slowly)

### `*` — Wildcard (Many)

**Problem it solves:**  
You don’t want to type filenames manually.

**Mental model:**

> `*` expands **before** the command runs.

It is not magic. The shell replaces it with matching filenames.

Example expansion (conceptual):

```bash
ls *.txt
```

→ shell expands to:

```bash
ls a.txt b.txt c.txt
```

---

### `?` — Wildcard (One)

**Problem it solves:**  
You want **precision**, not greed.

**Mental model:**

> `?` matches exactly one character.

Useful when filenames follow strict patterns.

---

### `sort` — Ordering

**Problem it solves:**  
Data is rarely meaningful when unordered.

**Mental model:**

> `sort` rearranges **lines**, not files.

It reads input → outputs sorted lines.

---

### `uniq` — Deduplication (With a Trap)

**Problem it solves:**  
Duplicate data exists everywhere.

**Mental model:**

> `uniq` only removes **adjacent** duplicates.

This is intentional and forces explicit thinking.

---

### `wc` — Measurement

**Problem it solves:**  
Humans guess. Computers count.

**Mental model:**

> `wc` quantifies text streams.

It answers:

- How big?
    
- How many lines?
    
- How many words?
    

---

### `>` — Redirection (Overwrite)

**Problem it solves:**  
You need to **capture output**, not just view it.

**Mental model:**

> `>` changes _where output goes_.

Instead of screen → file.

Important:

- It **overwrites**.
    

---

### `|` — Pipe (Most Important Symbol in Unix)

**Problem it solves:**  
Programs should not know about each other.

**Mental model:**

> `|` connects stdout → stdin.

Think: **assembly line**.

Command A produces → Command B consumes.

---

### `Ctrl + C` — Interrupt

**Problem it solves:**  
Programs can hang or run forever.

**Mental model:**

> `Ctrl + C` sends an interrupt signal.

This is **not a command** — it’s a signal.

---

## 3. Exercise Setup (Reuse Your Sandbox)

```bash
cd ~/shell_lab/text_lab
```

Create a new file:

```bash
cat > fruits.txt << EOF
apple
banana
apple
orange
banana
banana
EOF
```

---

## 4. Focused Exercises

### Wildcards: `*` and `?`

Create dummy files:

```bash
touch log1.txt log2.txt logA.txt note.txt
```

Now test:

```bash
ls *.txt
ls log?.txt
```

Understand:

- `log?.txt` matches `log1.txt`, `log2.txt`
    
- `?` matches **any single character**
    

Key insight:

> Wildcards are resolved by the shell, not the command.

---

### `sort`

```bash
cat fruits.txt
sort fruits.txt
```

Observe:

- Original file unchanged
    
- Output reordered
    

Now reverse mentally:

> `sort` transforms streams, not storage.

---

### `uniq` (The Trap)

```bash
uniq fruits.txt
```

Result will surprise you.

Now do it correctly:

```bash
sort fruits.txt | uniq
```

Key insight:

> `uniq` assumes sorted input.

This is by design.

---

### `wc`

```bash
wc fruits.txt
```

Now be specific:

```bash
wc -l fruits.txt
wc -w fruits.txt
wc -c fruits.txt
```

Ask yourself:

- Which metric matters in logs?
    
- Which in datasets?
    

---

### `>` Redirection

```bash
sort fruits.txt > sorted_fruits.txt
```

Verify:

```bash
cat sorted_fruits.txt
```

Overwrite test (intentional):

```bash
echo "test" > sorted_fruits.txt
cat sorted_fruits.txt
```

Key rule:

> `>` destroys existing content.

---

### `|` Pipe (Core Exercise)

Run this **slowly**:

```bash
cat fruits.txt | sort | uniq | wc -l
```

Explain each stage in words:

1. Read file
    
2. Sort lines
    
3. Remove duplicates
    
4. Count unique entries
    

This is shell mastery.

---

### `Ctrl + C`

Run:

```bash
yes "running"
```

Stop it with:

```
Ctrl + C
```

Understand:

> You just interrupted an infinite process.

---

## 5. Final Mental Compression Table

|Item|What It Really Does|
|---|---|
|`*`|Filename expansion|
|`?`|Precise expansion|
|`sort`|Line ordering|
|`uniq`|Adjacent dedupe|
|`wc`|Measurement|
|`>`|Output capture|
|`|`|
|`Ctrl + C`|Signal interrupt|

---

## Required Reflection (Before Next Topic)

Answer **one sentence only**:

> Why does `uniq` intentionally _not_ remove non-adjacent duplicates?

---
## Explanation

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
