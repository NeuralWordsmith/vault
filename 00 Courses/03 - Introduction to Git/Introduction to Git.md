---
tags:
  - "#git"
status: Started
start_date: 2025-12-25
end_date:
---
# Course: Introduction to Git

## 1. Summary & Goals

_This course introduces the concept of version control and highlights its benefits for software and data projects. You'll learn about Git, the popular software for implementing version control in projects, and use it to create repositories and track files._

_Discover how Git stores data through blobs, trees, and commits. Use this information to compare the state of your project at different points in time, understanding what changes have been made, by whom, and when. Learn valuable tips and tricks to customize your view of a repository's history and how to undo changes to revert files!_

## 2. Core Concepts & Notes

_This is the central index for this course. As I create new atomic notes, I will link them here under the relevant module or topic._

### Chapter 1: Introduction to Git

*Learn the benefits and fundamentals of Git for version control in software and data projects.*
#### 1. Introduction to version control
 
- [[Git - What is git]]
- [[Git - Version Control]]
- [[Git - Benefits of Version Control]]
- [[Git - Git Version Control System]]
- [[Git - Benefits of Git]]
- [[Git - Shell (Terminal)]]

>This section is establishing your _orientation layer_ for Git, not teaching mechanics yet, and the mental model to hold onto is that [[Git - Version Control|Version Control]] is the durable memory of a project while your working files are disposable state; once you internalize that separation, most Git behavior stops feeling mysterious. You should understand now that a repository is a deliberate boundary around history, collaboration, and recovery, and that the real value comes from the guarantees described in [[Git - Benefits of Version Control|Benefits of Version Control]]—auditability, reversibility, and parallel work—rather than from any specific command. It matters early that Git is a [[Git - Git Version Control System|distributed system]], because that single design choice explains why local commits are safe, why offline work is possible, and why history is not fragile in the way centralized tools are. Treat the [[Git - Shell (Terminal)|Shell]] here as an interface contract, not a skill test: you are not optimizing speed or memorization yet, only accepting that serious control flows through a text interface. What can be deferred is command syntax, branching strategies, and version minutiae; even checking your installed version ([[Git - Git Version Control System#Git Version|Git Version]]) is contextual hygiene, not core understanding. If you leave this section knowing _what problems Git is meant to make impossible_ and _what costs it introduces in exchange_, you are correctly calibrated for everything that follows.

- **Must-read from this section:**  
	- [[Git - Version Control|Version Control]] — defines the boundary and guarantees everything else relies on  
	- [[Git - Benefits of Version Control|Why Version Control Matters]] — frames Git as risk management, not tooling  
	- [[Git - Git Version Control System|Git as a DVCS]] — explains the single design choice that changes workflows
-  **Revisit this section when**
	- You feel anxious about “breaking” a project by experimenting or refactoring
	- You start collaborating and conflicts feel conceptual rather than mechanical
	- You are unsure why Git workflows differ from Google Drive–style file sharing
	- You are deciding whether Git overhead is justified for a small or solo project

#### 2. Creating repos
 
- [[Git - Repositories]]
- [[Git - Git Repository]]
- [[Git - git Directory]]
- [[Git - Benefits of a Git Repository]]
- [[Git - git init Command]]
- [[Git - git status Command]]
- [[Git - Nested Repositories]]
- [[Git - Creating a New Repository Process]]
- [[Git - Converting an Existing Project to a Repository Process]]

>This section is about drawing a hard boundary around _where Git’s authority begins_, and the anchor is understanding that a [[Git - Git Repository|Git repository]] is not your files but the contract formed the moment a [[Git - git init Command|repository is initialized]] and a hidden [[Git - git Directory|.git directory]] comes into existence. You need to grasp now that creating a repo—whether by [[Git - Creating a New Repository Process|starting fresh]] or [[Git - Converting an Existing Project to a Repository Process|adopting an existing project]]—is a _point of no ambiguity_: Git starts observing everything under that root, and the integrity of history now depends on protecting that boundary. The repository’s value comes from the guarantees captured in [[Git - Benefits of a Git Repository|Benefits of a Git Repository]]—recoverability, traceability, and safe iteration—while the immediate risk is subtle misuse, especially accidentally creating [[Git - Nested Repositories|nested repositories]], which silently fractures history and makes Git’s behavior appear inconsistent. Treat [[Git - git status Command|git status]] here as a diagnostic lens rather than a command to memorize; its role is to continuously tell you whether Git agrees with your mental model of what is inside or outside the repository. What can be deferred is internal mechanics, commit workflows, and branching—none of those matter until the repository boundary itself is clean and intentional. If you leave this section knowing *where a repository begins, why the `.git` directory is sacred, and how to detect boundary violations early*, you are correctly calibrated for everything that follows.

 - **Must-read from this section:**  
	- [[Git - Git Repository|Git Repository]] - defines the unit of history and responsibility  
	- [[Git - git Directory|The .git Directory]] - explains the single point of truth and failure  
	- [[Git - Nested Repositories|Nested Repositories]] - highlights the most dangerous early anti-pattern
- **Revisit this section when**
	- You see Git behaving “inconsistently” across subfolders
	- You inherit a legacy project and need to bring it under version control safely
	- You suspect history is missing, duplicated, or silently ignored
	- You are structuring multi-project directories and feel unsure where repos should start or end

#### 3. Staging and committing files
- [[Git - Basic Workflow]]
- [[Git - Staging Area]]
- [[Git - Commit]]
- [[Git - Staging vs Committing]]
- [[Git - git add Command]]
- [[Git - git commit Command]]
- [[Git - Commit Hash]]
- [[Git - Commit Message Best Practices]]
	
>This section is about understanding _what a commit actually represents_ and why Git deliberately separates intent from permanence, starting with the mental model that a [[Git - Commit|commit]] is an immutable snapshot of the repository’s state, not a “save” of whatever happens to be lying around. You need to internalize now that the [[Git - Staging Area|staging area]] exists to let you curate _intentional change_, and that confusing [[Git - Staging vs Committing|staging with committing]] is the root cause of messy history and accidental work leaks. The role of [[Git - git add Command|git add]] is not mechanical but editorial—it defines the exact story you are about to tell—while [[Git - git commit Command|git commit]] is the irreversible act that fixes that story into history with a unique [[Git - Commit Hash|commit hash]] that cryptographically binds content, metadata, and ancestry. The [[Git - Basic Workflow|basic workflow]] is valuable precisely because it forces a pause between change and permanence, and that pause is where judgment lives. Commit messages matter because they are the only durable explanation of _why_ a snapshot exists, which is why [[Git - Commit Message Best Practices|commit message quality]] is a structural concern, not polish. What can be deferred is command flags, history rewriting, and optimization tricks; those only matter once judgment is consistent. If you leave this section knowing *how to intentionally shape a commit and why its hash* and *message make it permanent and accountable*, you are correctly calibrated for everything that follows.

- **Must-read from this section:**  
	- [[Git - Commit|Commit]] - defines the unit of permanence in Git  
	- [[Git - Staging Area|Staging Area]] - explains how intent is separated from history  
	- [[Git - Staging vs Committing|Staging vs Committing]] - prevents the most common workflow errors  
	- [[Git - Commit Message Best Practices|Commit Messages]] - preserves long-term meaning of history
- **Revisit this section when**
	- You find yourself unsure what exactly went into a past commit
	- Your history feels noisy, misleading, or hard to reason about
	- You need to explain or defend a change months later
	- You start working with others and commits become shared artifacts

---

### Chapter 2: Version History
*Learn how to compare files at different points in time, and restore files to their previous state.*

#### 1. Viewing the version history

- [[Git - Data Storage Model]]
- [[Git - Commit Object]]
- [[Git - Tree Object]]
- [[Git - Blob Object]]
- [[Git - Hash SHA-1]]
- [[Git - git log Command]]
- [[Git - Visualizing the Git Commit Structure]]

>This section is about internalizing _why Git can be trusted_ and _how its history is physically constructed_, and the anchor is the [[Git - Data Storage Model|data storage model]] that treats the repository as a content-addressable graph rather than a sequence of edits. You need to understand now that Git stores _snapshots_, not diffs, and that every snapshot is assembled from three immutable building blocks: raw file contents live in [[Git - Blob Object|blob objects]], directory structure and filenames are captured by [[Git - Tree Object|tree objects]], and history is formed by [[Git - Commit Object|commit objects]] that point to a root tree and to their parent commits. The glue that makes this reliable is the [[Git - Hash SHA-1|SHA-1 hash]], which means identity is derived from content itself; any change, however small, produces a different hash and therefore a different object, making tampering detectable by construction. The practical boundary to notice is that commands like [[Git - git log Command|git log]] are merely _readers_ of this object graph, not special sources of truth, and visual aids such as [[Git - Visualizing the Git Commit Structure|commit structure visualizations]] exist to help you reason about reuse and sharing of blobs across commits. What can be deferred is object inspection, plumbing commands, and storage optimizations; those only matter when debugging or scaling. If you leave this section knowing _that commits point to trees and trees point to blobs_ and _that hashes make Git’s history immutable and verifiable_, you are correctly calibrated for everything that follows.

- **Must-read from this section:**
	- [[Git - Data Storage Model|Data Storage Model]] – establishes the mental model everything else depends on
	- [[Git - Commit Object|Commit Object]] – explains how history is chained and why it is immutable    
	- [[Git - Blob Object|Blob Object]] – clarifies what Git actually stores and deduplicates
	- [[Git - Visualizing the Git Commit Structure|Commit Diagram]] - visualises the commit logic
- **Revisit this section when**
	- You wonder why unchanged files do not increase repository size
	- You need to reason about history integrity or corruption
	- Git’s behavior feels “magical” during branching or merging 
	- You want to understand what tools like `git log` are actually traversing

#### 2. Version history tips and tricks

- [[Git - Customizing Log Output]]
- [[Git - Filtering Log by Number of Commits]]
- [[Git - Filtering Log by File]]
- [[Git - Combining Log Filters]]
- [[Git - Filtering Log with --since Flag]]
- [[Git - Filtering Log with --until Flag]]
- [[Git - Date Formatting for Log Filters]]
- [[Git - git show Command]]
- [[Git - Commit Hash Uniqueness]]
- [[Git - Analyzing git show Output]]

>This section is about turning Git’s commit history from a passive scroll into an active investigation surface, with a clear boundary between _finding_ a change and _understanding_ it. The mental model to lock in is that [[Git - Customizing Log Output|customizing log output]] is a query engine over history, not a viewing preference: every flag you add narrows the question you are asking the repository, whether that is “what changed recently” via [[Git - Filtering Log by Number of Commits|limiting log output]], “what touched this artifact” via [[Git - Filtering Log by File|filtering by file]], or “what happened during this window” via [[Git - Filtering Log with --since Flag|since]] and [[Git - Filtering Log with --until Flag|until]] (whose power and risk hinge on [[Git - Date Formatting for Log Filters|date formatting choices]]). The leverage move is [[Git - Combining Log Filters|combining log filters]]: Git applies them as logical ANDs, giving you surgical precision but also the failure mode of over-filtering yourself into false emptiness. Once a candidate commit is identified, the boundary shifts: history search stops and forensic inspection begins with [[Git - git show Command|git show]], whose output only makes sense if you respect [[Git - Commit Hash Uniqueness|commit hash uniqueness]] and can read intent versus reality in [[Git - Analyzing git show Output|analyzed show output]]. What can be deferred is memorizing flag syntax and edge cases; what must be understood now is _when you are narrowing context versus when you are discarding it_. If you leave this section knowing that _git log is a query language over history and git show is the microscope for a single atomic change_, and _you can articulate when filters hide relevant context and when they save you time_, you are correctly calibrated for everything that follows.

- **Must-read from this section:**
	- [[Git - Customizing Log Output|log as a query engine]] – establishes the core mental model everything else depends on
	- [[Git - Combining Log Filters|combining filters]] – highest leverage for real debugging, with explicit over-filtering risk
	- [[Git - Analyzing git show Output|reading show output]] – teaches how to validate intent versus actual change
- **Revisit this section when**
	- You are debugging a bug introduced “sometime last week” and need to bound history without drowning in commits
	- A file’s behavior is unclear and you need to reconstruct its evolution without reading the whole repo history
	- A filtered log returns nothing and you need to reason whether that means “no change” or “query too strict”
	- You have found a suspect commit and must confirm whether the diff actually explains the observed behavior

#### 3. Comparing versions

- [[Git - Comparing Versions with Diffs]]
- [[Git - Comparing Working Directory vs Last Commit]]
- [[Git - Understanding Diff Output]]
- [[Git - Comparing Staging Area vs Last Commit]]
- [[Git - Comparing Between Commits using Hashes]]
- [[Git - HEAD Pointer]]
- [[Git - Referencing Previous Commits with HEAD~n]]
- [[Git - Diff Output Breakdown]]
- [[Git - Diff Commands Cheatsheet]]

>Under this section, the real work is learning to reason precisely about _what state you are comparing_ and _why that comparison answers a concrete question_, rather than memorizing commands; everything here hangs off the core mental model of [[Git - Comparing Versions with Diffs|diff]] as a description of how to transform one snapshot into another, not a vague “what changed” summary. Most confusion disappears once you internalize that comparisons are always between two explicit states—your live edits, what you have staged, or historical commits—and that Git is brutally literal about which two you ask for, as laid out across [[Git - Comparing Working Directory vs Last Commit|working directory vs last commit]] and [[Git - Comparing Staging Area vs Last Commit|staging area vs last commit]]. The [[Git - HEAD Pointer|HEAD pointer]] matters because it defines the default reference for “last commit,” and shortcuts like [[Git - Referencing Previous Commits with HEAD~n|HEAD~n]] are simply convenience handles over explicit hashes, not a different concept. Reading diffs is a skill in itself: the guarantees and limits of what a diff can tell you live in [[Git - Understanding Diff Output|understanding diff output]] and [[Git - Diff Output Breakdown|diff output breakdown]], especially the fact that diffs are line-based, context-dependent, and blind to semantic intent. Historical comparisons via [[Git - Comparing Between Commits using Hashes|comparing between commits]] are powerful precisely because they let you isolate evolution without caring about the present working tree. If you leave this section knowing _how to choose the correct comparison target for a real question_ and _how to sanity-check a diff’s output without over-interpreting it_, you are correctly calibrated for everything that follows.

- **Must-read from this section:**
	- [[Git - Comparing Versions with Diffs|diff]] – anchors the entire mental model of comparison
	- [[Git - HEAD Pointer|HEAD pointer]] – defines what “last commit” actually means in practice
	- [[Git - Understanding Diff Output|diff output]] – prevents misreading or over-trusting what you see
- **Revisit this section when:**
	- A code review feels confusing because “nothing changed” or “too much changed”
	- You need to explain to someone why staged vs unstaged differences matter
	- You are debugging when a regression was introduced, not just what is broken now
#### 4. Restoring and reverting files

- [[Git - Undoing Changes]]
- [[Git - git revert Command]]
- [[Git - git checkout Command for File Restoration]]
- [[Git - git restore Command for Unstaging]]
- [[Git - git revert vs git checkout for Reverting]]
- [[Git - Undoing Changes Cheatsheet]]

>The core of this section is learning to undo mistakes without lying to history, and the anchor idea is that Git offers different undo tools precisely because mistakes happen at different layers of the system, a distinction captured cleanly in [[Git - Undoing Changes|Undoing Changes]]. The first boundary to internalize is scope: undoing intent before a commit is categorically different from undoing published history, which is why [[Git - git restore Command for Unstaging|git restore --staged]] exists to safely correct staging decisions without discarding work, while [[Git - git revert Command|git revert]] deliberately creates a new commit to reverse a past one rather than rewriting it. The risk line runs through history integrity: anything that rewrites shared history is dangerous by default, so revert is favored on public branches even though it leaves “mistakes” visible, a trade-off explained directly in [[Git - Undoing Changes|Undoing Changes]]. File-level recovery sits in a narrower lane; [[Git - git checkout Command for File Restoration|git checkout for file restoration]] (and its modern replacement via restore) is a surgical tool that replaces a file’s contents from a prior snapshot but silently overwrites local changes, which is why [[Git - git revert vs git checkout for Reverting|revert vs checkout]] exists as a comparison note rather than a how-to. Cheatsheets like [[Git - Undoing Changes Cheatsheet|Undo Cheatsheet]] are lookup aids, not understanding. If you leave this section knowing _how to choose the undo tool based on scope and history safety_ and _which actions are destructive versus history-preserving_, you are correctly calibrated for everything that follows.

- **Must-read from this section:**
	- [[Git - Undoing Changes|Undoing Changes]] – establishes the scope and safety model for all undo paths
	- [[Git - git revert Command|git revert]] – defines the only safe default for undoing public history
	- [[Git - git revert vs git checkout for Reverting|revert vs checkout]] – clarifies the most common real-world confusion point
- **Revisit this section when:**
	- You need to undo something on a branch others have already pulled
	- A commit mixes good and bad changes and only one file must be corrected
	- You staged the wrong files and want to fix intent without losing work

## 3. Key Takeaways & Reflections



## 4. Related Projects & Applications

_A list of projects where I have applied the skills from this course. This directly links my theoretical knowledge to practical, portfolio-worthy application._

1. **Step one**: [[Git 1 - Exercise One|Version Control Exists to Solve State Fragility]] 
2. **Step two**: [[Git 1 - Exercise Two|Repository Boundary & Nested Repository Failure]]
3. **Step three**: [[Git 1 - Exercise Three|Staging vs Committing — Separating Intent from Permanence]]
4. **Step four**: [[Git 1 - Exercise Four|Commit Hashes & Immutability — Why Git History Can Be Trusted]]
5. **Step five**: [[Git 1 - Exercise Five|git log as a query engine]]
6. **Step Six**: [[Git 1 - Exercise Six|diffs as explicit comparisons]]
7. **Step Seven**: [[Git 1 - Exercise Seven|undoing changes safely]]