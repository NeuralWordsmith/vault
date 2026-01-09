This master cheatsheet summarizes the concepts and commands for managing Git branches and remotes.

---

## 1. Working with Branches

Branches act like parallel universes, allowing you to develop features or fix bugs without affecting the live system.

|**Action**|**Command**|
|---|---|
|**List branches**|`git branch` (The current branch is marked with `*`) 3333|
|**Create new branch**|`git branch <name>` 4|
|**Switch to branch**|`git switch <name>` 5|
|**Create and switch**|`git switch -c <name>` 6|
|**Rename branch**|`git branch -m <old_name> <new_name>` 7|
|**Compare branches**|`git diff <branch1> <branch2>` 8|
|**Delete branch**|`git branch -d <name>` (Safe: only if merged) 9|
|**Force delete**|`git branch -D <name>` (Unsafe: deletes unmerged work) 10|

---

## 2. Merging and Conflicts

Merging incorporates changes from a **source** branch into a **destination** branch.

- **Switch to Destination**: Always switch to the branch you want to merge _into_ first.
- **Merge Command**: `git merge <source_branch>`.
- **Fast-Forward Merge**: Occurs when the history is linear; Git simply moves the pointer forward.
- **Merge Conflicts**: Happen when the same file is edited in two different branches.
    - **To resolve**: Open the file (e.g., `nano <file>`), remove Git's marker lines (`<<<<`, ==== , `>>>>), save, stage, and commit.

---

## 3. Remote Repositories

Remotes are cloud-based versions of your repo (e.g., GitHub) used for collaboration and backups.

- **Clone a repo**: `git clone <URL_or_path>`.
- **List remotes**: `git remote -v` (Shows URLs for fetching and pushing).
- **Add remote**: `git remote add <name> <URL>`.
- **Fetch**: `git fetch <remote>` (Downloads data but does **not** merge into your work).
- **Pull**: `git pull <remote> <branch>` (Shortcut for `fetch` + `merge`).
- **Push**: `git push <remote> <branch>` (Uploads local commits to the remote).

---

## 4. The Collaborative Workflow

A standard cycle for working with others:

1. **Pull**: Get the latest changes from the remote: `git pull origin main`.
2. **Work**: Make local changes and commit them: `git commit -m "message"`.
3. **Push**: Upload your changes to the remote: `git push origin main`.
    - _Note_: If your push is rejected, it usually means you forgot step 1 and need to pull first.