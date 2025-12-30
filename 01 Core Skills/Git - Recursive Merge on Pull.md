---
tags: 
  - core
  - git
  - merge_strategy
  - divergent_history
  - merge_commit
  - three-way_merge
  - git_pull
  - concept
source: 
  - "[[Intermediate Git]]"
related: 
  - "[[Git - Git Pull]]"
  - "[[Git - Tip of current branch is behind Error]]"
  - "[[Git - Push/Pull Workflow]]"
  - "[[Git - Fast-Forward Merge]]"
  - "[[Git - Rebase]]"
  - "[[Git - Merge Conflicts]]"
  - "[[Fundamental - Version Control]]"
  - "[[Git - Git Push]]"
  - "[[Git - Git Push vs Git Pull]]"
  - "[[Git - Pushing a New Local Branch to Remote]]"
  - "[[Git - Commit]]"
  - "[[Git - Branch]]"
  - "[[Git - HEAD]]"
---
# Core: Recursive Merge

## Summary

>A recursive merge is a Git strategy used to combine two branches that have diverged, meaning both have unique commits since they last shared a common ancestor. When a `[[Git - Git Pull]]` is executed in this scenario, Git cannot simply move the branch pointer forward (a fast-forward merge). Instead, it creates a new, special 'merge commit' that has two parents, representing the unification of both lines of work.

**Why This Matters:** It is Git's default safety mechanism for integrating divergent histories, ensuring that no work is lost by creating a new, shared commit that explicitly ties the two different lines of development together.

_Analogy:_ _Imagine two co-authors, Alice and Bob, are writing a book. They start from the same draft. Alice writes a new 'Chapter 3' and Bob, working separately, writes a new 'Chapter 4'. When they need to combine their work, they can't just paste one chapter after the other. Instead, they create a new 'Editor's Note' page at the beginning. This note (the merge commit) explicitly states: 'This version incorporates Alice's Chapter 3 and Bob's Chapter 4.' The note itself is a new piece of history that points back to both Alice's version and Bob's version, unifying the book._

**Where it breaks down:** The analogy assumes the chapters are independent. In software, if Alice and Bob both edited 'Chapter 2' in different ways, it would create a 'merge conflict'. Git's recursive merge would pause and require a human to manually decide which edits to keep, a step not captured by the simple book analogy.

```
Before `git pull`:

      A---B---C  (local 'main')
     /
...---X          (common ancestor)
     \
      D---E---F  (remote 'origin/main')

After `git pull` (Recursive Merge):

      A---B---C---\
     /            M (Merge Commit on local 'main')
...---X            /
     \          /
      D---E---F

```

## Details

Previously, we saw that `git pull` can use a simple fast-forward merge. However, a recursive merge is required in the more common scenario where your local repository and the remote repository have different, new commits. Because the commit histories have diverged, Git can't just move a pointer; it must actively combine the two histories. This is a fundamental concept in version control, and it's the process that kicks in when you try to pull changes after seeing an error like `[[Git - Tip of current branch is behind Error]]`. Git handles this by finding a common ancestor and creating a new merge commit that synthesizes the changes from both branches.

#### Primary Goal

To safely combine two divergent branches of development into a single, unified history by creating a new commit that has two parents.

#### Mechanism

- **How it Works:**
    1. **Divergence:** Git detects that both the local branch and the remote-tracking branch have new commits that the other does not. They share a common ancestor but have since diverged.
    2. **Initiation:** A user runs `git pull`.
    3. **Three-Way Merge:** Git performs a 'three-way merge'. It looks at three commits: the tip of the local branch, the tip of the remote branch, and their most recent common ancestor.
    4. **Merge Commit Creation:** It combines the changes and creates a new 'merge commit'. This commit is unique because it has two parent commits, one pointing to the previous local head and one pointing to the fetched remote head.
    5. **Commit Message Prompt:** By default, Git opens a text editor (like nano or vim) to allow the user to edit the commit message for this new merge commit. This is the step the context refers to.

##### Code Translation

```python
```bash
# This is a simulation of the command-line workflow that triggers a recursive merge.

# --- Step 1: Simulate a remote change being pushed ---
# (Imagine this happens on a collaborator's machine)
# git clone <repo_url> remote_repo
# cd remote_repo
# echo "Change from collaborator" >> shared_file.txt
# git commit -am "Add remote feature"
# git push

# --- Step 2: Make a different change on your local repo ---
# cd local_repo
# echo "Change from me" >> shared_file.txt
# git commit -am "Add local feature"

# --- Step 3: Trigger the recursive merge ---
# Now, when you try to bring in the remote changes, Git sees the divergence.
# Your local branch has a new commit, and the remote branch also has a new commit.
git pull

# At this point, Git will open your default text editor with a pre-populated message
# like "Merge branch 'main' of https://github.com/user/repo"
# You can save and exit to complete the merge.
```
```

 [[Code - Recursive Merge Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **`--no-edit`**
    - As mentioned in the context, this flag is used with `git pull` or `git merge` to accept the auto-generated merge commit message without opening a text editor. This is useful for automation but not recommended for manual workflows as it bypasses the chance to write a more descriptive message.
- **`-m <msg>` or `--message=<msg>`**
    - Allows you to provide a merge commit message directly on the command line, avoiding the text editor prompt altogether.
- **`--ff-only`**
    - This flag tells Git to only proceed if the merge can be resolved as a fast-forward. If a recursive merge is required, the command will fail instead. This can be used as a safeguard to prevent unwanted merge commits.

#### Core Trade-offs

- **Pro: Preserves Historical Context**
    - The merge commit acts as an explicit record that two separate lines of work were combined at a specific point. This makes it easy to understand the history of the branch and see where features were integrated.
- **Con: Creates a 'Noisy' History**
    - Frequent merges can clutter the project's commit graph with many "Merge branch '...'" commits. This can make a linear, chronological reading of the project's history difficult. Workflows using `git rebase` are an alternative that aim to create a cleaner, linear history.

## Connections

```
                  (Parent)
               Git Pull
                   ▲
                   │
   ┌───────────────┼────────────────────────────┐
   │               │                            │
(Alternative) ┌──────────────────┐          (Trigger)
Fast-Forward  │ Recursive Merge  │  Tip of branch is behind
              └──────────────────┘
                   │
                   ▼
                (Part of)
           Push/Pull Workflow
```

### Parent Concept

A recursive merge is the default strategy employed by [[Git - Git Pull]] when it detects that the local and remote branches have diverged.

### Child Concepts



### Related Concepts 

- It is a core component of the standard [[Git - Push/Pull Workflow]], representing the 'integration' step.
- Understanding this merge strategy is essential for diagnosing and resolving the common `[[Git - Tip of current branch is behind Error]]` message.
- It stands in contrast to a 'fast-forward' merge, which is a simpler operation that can only occur when there are no divergent commits.
- The alternative to a merge-based workflow for integrating changes is often a rebase-based workflow, which aims to create a more linear history.
## Questions

- Your team's Git history is becoming cluttered with merge commits, making it hard to track features. A proposal is made to switch to a rebase-first workflow to maintain a linear history. What are the risks of this switch, particularly for junior developers, and how would you argue for or against it from a project stability perspective?
- In a large, automated CI/CD pipeline, a `git pull` unexpectedly triggers a recursive merge and opens an editor, causing the pipeline to hang indefinitely. How would you design your automation scripts to handle this scenario gracefully, ensuring the pipeline either fails safely or resolves the merge automatically?
- What if Git's merge commits could have more than two parents (an 'octopus merge')? Describe a realistic, complex development scenario where creating a single merge commit to unify three or more divergent feature branches simultaneously would be more beneficial than performing a series of standard two-parent merges.