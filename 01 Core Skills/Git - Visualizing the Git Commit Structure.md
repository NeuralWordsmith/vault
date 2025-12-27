---
tags:
  - visual-analysis
---

# Git - Visualizing the Git Commit Structure

**Why This Matters:** Understanding Git's internal object model reveals how it efficiently stores project history by only saving content that has changed, not entire file duplicates for every version.


> [!info] Info
> This example visualizes the internal structure of a Git repository over three sequential commits. It specifically breaks down how Git's three core data objects—Commits, Trees, and Blobs—work together to track changes to a data analysis project, highlighting how unchanged files are handled efficiently.


---

![[Pasted image 20251226133745.png]]

**Explanation:**
- The 'Commit' column displays three commits, each identified by a unique SHA-1 hash (e.g., '56daf65').
- The 'Tree' column lists the filenames present in each commit's snapshot.
- The 'Blob' column shows the actual file content, or a snapshot of the data, at a specific point in time.
- Arrows connect commits to their corresponding trees, and trees to the content blobs for each file.
- Crucially, colored arrows show how trees can point back to blobs from previous commits if a file's content has not changed.

---

## Deconstruction & Analysis
*How this example demonstrates the concept:*

### **Step 1: First Commit (`56daf65`)**
The initial commit introduces the project. It points to a 'tree' object that tracks two files: `report.md` and `mental_health_survey.csv`. The tree, in turn, points to two unique 'blob' objects, each containing the initial content for these files. Every object (commit, tree, and blob) has its own unique identifier.

### **Step 2: Second Commit (`3f5003f`)**
In this commit, the `mental_health_survey.csv` is modified and a new file, `summary_statistics.csv`, is added. This results in a new tree. This tree points to two new blobs: one for the updated survey data and one for the new summary statistics. However, `report.md` was not changed. To save space, Git does not create a new blob for it. Instead, the new tree simply points back to the existing blob from the first commit, as shown by the teal arrow.

### **Step 3: Last Commit (`b22eb75`)**
In the final commit, `report.md` and `mental_health_survey.csv` are modified again, creating new blobs for their updated content. This time, the `summary_statistics.csv` file remains untouched. Following the same principle of efficiency, the tree for this commit reuses the existing blob for `summary_statistics.csv` created in the second commit, as shown by the red arrow.

---

## Core Takeaway
*The general principle proved by this example:*

This visual demonstrates a core principle of Git's design: efficiency through content-addressable storage. Git doesn't store file differences or duplicate entire files for each commit. Instead, it stores a snapshot of file content (a 'blob') only once. If a file's content is unchanged between commits, the new 'tree' object simply references the pre-existing blob, making the repository compact and fast.