---
tags: 
  - core
  - git
  - commit_message
  - version_control
  - documentation
  - collaboration
  - concept
source: 
  - "[[Introduction to Git]]"
related: 
  - "[[Fundamental - Version Control]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Git - Commit]]"
  - "[[Git - Basic Workflow]]"
  - "[[Git - Staging Area]]"
  - "[[Git - Staging vs Committing]]"
  - "[[Git - git add Command]]"
  - "[[Git - git commit Command]]"
  - "[[Git - Commit Hash]]"
  - "[[Git - Branch]]"
  - "[[Git - Merge]]"
  - "[[Git - Log]]"
  - "[[Git - Rebase]]"
  - "[[Git - Cherry Pick]]"
---
# Core: Commit Message

## Summary

>A commit message is a human-readable description attached to a `[[Git - Commit|commit]]`. It explains the purpose and context of the changes being saved to the project's history. The context provided states, "The log message is important, as we can refer to it later. The best practice is to keep it concise." This emphasizes its dual role as both a historical record and a piece of communication that respects the reader's time. It's the narrative that accompanies the snapshot created by a commit, which is identified by a unique `[[Git - Commit Hash|commit hash]]`.

**Why This Matters:** A well-crafted commit message is the primary form of communication between developers across time, making it possible to understand the 'why' behind a change long after it was made.

_Analogy:_ _A commit message is like a captain's log entry for a ship. Each time the captain makes a significant change to the ship's course or performs a critical action, they write a concise entry in the logbook explaining what they did and why._

  * **Ship's Course Change:** The code changes (the 'diff').
  * **The Logbook:** The Git repository history (`git log`).
  * **The Log Entry:** The commit message.
  * **Date and Time of Entry:** The commit timestamp.
  * **Captain's Signature:** The author of the commit.
  * **Where it breaks down:** Unlike a simple logbook which is a linear record, Git history can be non-linear with branches and merges. A commit message must sometimes explain not just the change itself, but how it fits into a complex, branching history.

```
┌──────────────────────────────────────────────────┐
│ Subject: A short, imperative summary (50 chars)  │
│                                                  │ <── Blank Line Separator
│ Body: A more detailed explanation of the 'why'.  │
│ Wrap lines at 72 characters for readability.     │
│ Explain the problem and the solution.            │
│                                                  │ <── Blank Line Separator
│ Footer: Reference issue trackers (e.g., Closes #42)│
└──────────────────────────────────────────────────┘
```

## Details

A commit message is a crucial piece of documentation in software development that provides context for a set of changes. As the source material highlights, its importance lies in its ability to be referenced later, and the best practice is conciseness. It answers the "why" behind a code change, not just the "what" (which the code diff already shows). This message is an integral part of a `[[Git - Commit|commit]]` object, which permanently records a snapshot of the `[[Git - Staging Area|staging area]]` at a specific point in time. A well-structured commit message typically follows a standard format, often including a **subject line**, a **detailed body**, and a **footer**.

#### Primary Goal

To clearly and concisely communicate the purpose of a code change to other developers and your future self.

#### Mechanism


- **How it Works:** A commit message is created using the `[[Git - git commit Command|git commit]]` command. It's stored as metadata alongside the code changes and author information within the commit object, which is then added to the project's history.
- **The Subject Line:** This is the first line of the message, acting as a title. It's the most important part and is often the only thing visible in condensed log views.
    - It should be a concise summary of the change, typically limited to 50 characters.
    - It should be written in the imperative mood (e.g., *"Fix bug"* not *"Fixed bug"* or *"Fixes bug"*).
    - *Example:* `Feat: Implement user login functionality`
- **The Body (Optional):** After a blank line, a more detailed explanation can be provided. This section is for explaining the context and reasoning behind the change.
    - It explains the 'why' and the 'how' of the change, contrasting the previous behavior with the new behavior.
    - *Example:* `The previous authentication endpoint was vulnerable to timing attacks. This change implements a constant-time comparison algorithm for password verification to mitigate this risk.`
- **The Footer (Optional):** Used for referencing metadata like issue tracker IDs or pull request numbers, which helps integrate Git with project management tools.
    - *Example:* `Closes: #123` or `Reviewed-by: Jane Doe`

##### Code Translation

```python
nothing to fill here
```

 [[Code - Commit Message Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Imperative Mood:** Write subject lines as if giving a command (e.g., "Add feature" instead of "Added feature"). This convention aligns with Git's own generated messages (e.g., "Merge branch 'X'") and creates a consistent, actionable log.
- **Capitalization:** Always capitalize the subject line for readability, just like a sentence.
- **No Period in Subject:** Do not end the subject line with a period. It's a title, not a sentence.
- **Line Length:** Keep the subject to ~50 characters and the body lines to ~72 characters. This ensures readability in various Git tools, from the command line to web interfaces, without awkward wrapping.

#### Core Trade-offs

- **Time vs. Clarity:** The main trade-off is the immediate time spent writing a detailed message versus the future time saved during debugging, code reviews, or onboarding. A rushed, uninformative message (e.g., `"fix bug"`) saves seconds now but can cost hours or days of investigative work later.
- **Conciseness vs. Detail:** While conciseness is a best practice, being *too* concise can omit critical context. The goal is to be as brief as possible while still fully explaining the *intent* and *reasoning* behind the change, not just what the change was.

## Connections

```
                  (Parent)
                   Commit
                     ▲
                     │
┌────────────────────┼────────────────────┐
│                    │                    │
(Component)     ┌──────────────────┐      (Describes)
Commit Hash     │  Commit Message  │      Staging Area
                └──────────────────┘
                     │
                     ▼
                (Created by)
             git commit Command
```

### Parent Concept

A commit message is a fundamental component of a `[[Git - Commit|commit]]`, serving as its human-readable documentation.

### Child Concepts



### Related Concepts 

- The message is created when using the `[[Git - git commit Command|git commit command]]` to save changes to the repository.
- It provides the narrative for the snapshot of the `[[Git - Staging Area|staging area]]` that is being permanently recorded.
- A `[[Git - Commit Hash|commit hash]]` is the unique identifier for the commit object, which contains the commit message, the author, and the code changes.
- Understanding the difference between `[[Git - Staging vs Committing|staging and committing]]` is crucial for knowing *when* to write a commit message as part of the `[[Git - Basic Workflow|basic Git workflow]]`.
## Questions

- Your team is facing a tight deadline. A senior developer argues for skipping detailed commit messages to ship faster, claiming 'the code is the documentation'. How would you argue for the long-term business value of maintaining high-quality commit messages, even under pressure?
- Imagine you are designing a CI/CD pipeline that automatically generates release notes from commit messages. What conventions would you enforce for commit messages across the organization to ensure this automation is reliable and produces human-readable, valuable documentation?
- What if commit messages were limited to exactly 140 characters, like an old tweet, with no separate body? How would this constraint change the way you structure your commits and what secondary systems might emerge to compensate for the lack of detail?