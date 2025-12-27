---
tags: 
  - core
  - git
  - git_log
  - date_filter
  - time_range
  - commit_history
  - until_flag
  - concept
source: 
  - "[[Introduction to Git]]"
related: 
  - "[[Fundamental - Version Control]]"
  - "[[Git - Customizing Log Output]]"
  - "[[Git - Filtering Log with --since Flag]]"
  - "[[Git - Combining Log Filters]]"
  - "[[Git - Date Formatting for Log Filters]]"
  - "[[Git - Filtering Log by Number of Commits]]"
  - "[[Git - Filtering Log by File]]"
  - "[[Git - git show Command]]"
  - "[[Git - Commit Hash Uniqueness]]"
  - "[[Git - Analyzing git show Output]]"
  - "[[Git - Filtering by Author]]"
  - "[[Git - Filtering by Message]]"
  - "[[Git - Pretty Formatting]]"
  - "[[Git - Revisions]]"
---
# Core: Filtering Log with --until Flag

## Summary

>The `--until` flag in Git is a command-line option used with `git log` to specify an end date for the commit history being displayed. It filters the log to show only commits made on or before the given date. It is the direct counterpart to `[[Git - Filtering Log with --since Flag|--since]]` and is most powerful when they are used together to define a specific time window.

**Why This Matters:** This flag is crucial for defining a precise end-point for a time-based analysis of a project's history, preventing the log from including irrelevant recent activity.

_Analogy:_ _Think of using the `--until` flag like setting a 'return by' date at a library. You might ask the librarian for a list of all books that were checked out *after* a certain date (`--since`), but you only want to see the ones that were due to be returned *before* a specific deadline (`--until`). The `--until` flag acts as that final deadline, cutting off the list and ignoring anything that happened after._

*   **Where it breaks down:** The analogy is imperfect because a library 'return by' date is often exclusive (you must return it before the end of that day), whereas Git's `--until` filter is inclusive, meaning it includes commits made *on* the specified end date. Furthermore, Git filters by precise commit timestamps, not a general daily deadline.

```
Timeline View of the Filter:

<-- March -- [ -- April 2nd -- ... Commits Shown ... -- April 11th -- ] -- April 12th -->
             ▲                                             ▲
          --since                                       --until

(Only commits within the brackets are included in the log output)
```

## Details

While the `[[Git - Filtering Log with --since Flag|--since]]` flag sets a starting point for viewing commit history, it's often necessary to also define an end point. The `--until` flag provides this capability, allowing you to create a bounded date range. As seen in the example of showing commits between the second and eleventh of April 2024, this is essential for isolating the history of specific development sprints, bug-fixing periods, or feature releases. This belongs to the field of version control history analysis and is a fundamental tool for understanding a project's evolution over a precise period.

#### Primary Goal

To exclude all commits made after a specified date from the `git log` output, effectively setting an end boundary for the historical view.

#### Mechanism

- **Step 1: Initiate the Log Command**
    - Start with the base `git log` command, which by default shows the entire commit history.
- **Step 2: Define the Starting Point (Optional but Common)**
    - Use the `[[Git - Filtering Log with --since Flag|--since]]` flag to specify the beginning of your desired time window. For example, `--since="2024-04-02"`.
- **Step 3: Define the Ending Point**
    - Append the `--until` flag, followed by the end date for your filter. This tells Git not to show any commits made after this date. For example, `--until="2024-04-11"`.
- **Step 4: Execute and Review**
    - Run the complete command. The output will only contain commits that fall within the specified date range, inclusive of the start and end dates.

##### Code Translation

```python
# This command implements the example from the context, showing commits
# from April 2nd, 2024, up to and including April 11th, 2024.

# --- Step 1: Base command is 'git log' ---
# --- Step 2: Add the '--since' flag ---
# --- Step 3: Add the '--until' flag ---
# --- Step 4: Execute the full command ---
git log --since="2024-04-02" --until="2024-04-11"
```

 [[Code - Filtering Log with --until Flag Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Date Format**
    - The value passed to `--until` can be in various formats. Git is quite flexible and can parse absolute dates like `"2024-04-11"` or relative dates like `"yesterday"` or `"2 weeks ago"`. Effective use requires familiarity with `[[Git - Date Formatting for Log Filters|Git's accepted date formats]]`.
- **Inclusivity**
    - The `--until` filter is inclusive. This means if you specify `--until="2024-04-11"`, any commits made on April 11th (up to 23:59:59) will be included in the output.

#### Core Trade-offs

- **Timezone Ambiguity**
    - Commit timestamps include timezone information. If you don't specify a timezone in your filter, Git may use the local system's timezone, which can lead to unexpected results when working in a globally distributed team. A commit made at 1 AM in Tokyo might appear on the previous day for a developer in California.
- **Relies on Committer Date**
    - Git commits have two dates: author date (when the change was originally written) and committer date (when the change was applied to the branch). Date filters like `--until` operate on the *committer date*. This can be confusing if a patch created long ago is committed today; it will appear as a recent commit.

## Connections

```
              (Parent)
       Customizing Log Output
               ▲
               │
┌──────────────┼──────────────┐
│              │              │
(Counterpart) ┌───────────────────────────┐ (Prerequisite)
--since Flag  │  Filtering with --until   │ Date Formatting
              └───────────────────────────┘
               │
               ▼
         (Used With)
    Combining Log Filters
```

### Parent Concept

This concept is a specific technique within the broader practice of [[Git - Customizing Log Output|customizing git log output]] to tailor history views.

### Child Concepts



### Related Concepts 

- It is the direct counterpart to [[Git - Filtering Log with --since Flag|filtering with the --since flag]], and they are most effective when used together to define a precise window.
- This method is a powerful component when [[Git - Combining Log Filters|combining log filters]] to create highly specific queries about project history.
- A solid understanding of [[Git - Date Formatting for Log Filters|Git's date formatting]] is a prerequisite for using this flag effectively with different time specifications.
## Questions

- A project manager wants a report of all work completed for a client invoice period that ended last Friday at 5 PM. Your team works across multiple timezones. How would you construct your `git log` command using `--until` to ensure you don't accidentally include work done over the weekend, and how would you explain the potential for timezone discrepancies to the PM?
- You're building an automated CI/CD pipeline that generates release notes based on commits since the last tag. How would you use `--since` and `--until` (or equivalent Git revisions like `HEAD` and the tag name) to robustly define this commit range, and what is a potential failure mode if a developer pushes a commit with an incorrect system clock?
- What if the `--since` and `--until` flags were removed from Git? How would you replicate the functionality of finding all commits within a specific two-week period using only commit hashes and other `git log` commands or scripting?