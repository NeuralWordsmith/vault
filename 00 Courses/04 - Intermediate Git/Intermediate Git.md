---
tags:
  - "#git"
status: Started
start_date: 2025-12-30
end_date:
---
# Course: Intermediate Git

## 1. Summary & Goals

_A brief, one-paragraph description of the course. What are its main objectives? Why am I taking it, and what key skills do I expect to gain?_

## 2. Core Concepts & Notes

_This is the central index for this course. As I create new atomic notes, I will link them here under the relevant module or topic._

### Chapter 1: Working with branches

**1. Introduction to branches**

- [[Git - Branching]]
- [[Git - Benefits of Branching]]
- [[Git - The main Branch]]
- [[Git - Common Branching Workflow]]
- [[Git - Branch Management Commands Cheatsheet]]

>    This section establishes branching as the _structural safety mechanism_ that makes parallel development possible without destabilizing production, grounded in the fact that a Git branch is not a copy of code but a lightweight pointer to a commit that moves as work progresses, which is why isolation is cheap and reversible ([[Git - Branching|branching concept]]). The mental model to lock in is that all serious work deliberately happens _away_ from the stable baseline, because the [[Git - The main Branch|main branch]] exists as a continuously deployable source of truth rather than a scratchpad, and protecting it is a risk-management decision, not ceremony. Branching delivers leverage only when combined with disciplined flow: short-lived feature or bug-fix branches created from main, developed in isolation, then reintegrated through a merge or review gate ([[Git - Common Branching Workflow|branching workflow]]), which is how teams realize the [[Git - Benefits of Branching|benefits of branching]] without drowning in conflicts or stale history. The real boundary to respect is time: the longer a branch diverges, the more integration risk accumulates via merge conflicts and cognitive overhead, turning a safety mechanism into a liability. Commands, naming conventions, and hygiene practices matter only insofar as they reduce that risk surface and keep the repository navigable ([[Git - Branch Management Commands Cheatsheet|branch management cheatsheet]]). _If you leave this section knowing that branches are cheap, movable pointers meant to isolate risk,_ and _that main is protected precisely so integration happens deliberately and early,_ you are correctly calibrated for everything that follows.

- **Must-read from this section:**
	- [[Git - Branching|Branching]] – anchors the core mental model of isolation and parallel history
	- [[Git - The main Branch|main branch]] – clarifies why stability is preserved and where risk is absorbed
	- [[Git - Common Branching Workflow|workflow]] – shows how branching only works when time and discipline are managed
 - **Revisit this section when**
	- You are tempted to commit directly to main “just to move faster”
	- A feature branch has lived long enough that merging feels risky or unclear
	- Your repository has accumulated many branches and feels cognitively heavy
	- You start working with collaborators or CI/CD pipelines that enforce branch rules

**2. Modifying and comparing branches**

- [[Git - Branch Management]]
- [[Git - Comparing Branches with git diff]]
- [[Git - Renaming Branches with git branch -m]]
- [[Git - Deleting Branches]]
- [[Git - Safe Deleting Branches with git branch -d]]
- [[Git - Force Deleting Branches with git branch -D]]
- [[Git - Safe Delete (-d) vs Force Delete (-D)]]
- [[Git - Branch Management Cheatsheet]]

>    This section is about branch management as _repository hygiene_, not mechanics, and the central idea is that branches are temporary coordination tools whose value decays once their purpose is fulfilled ([[Git - Branch Management|branch management overview]]). The practical mental model is a lifecycle: after work happens on a branch, you must deliberately inspect what changed, decide whether the branch still represents useful intent, and then either integrate or retire it to prevent cognitive clutter ([[Git - Managing Branches|lifecycle framing]]). Comparing branches before any irreversible action is the safety valve; using a diff is how you reduce uncertainty about what will be kept versus discarded, and skipping this step is the most common source of accidental loss ([[Git - Comparing Branches with git diff|branch comparison]]). Renaming exists purely to preserve semantic clarity when intent shifts mid-flight, but it only remains low-risk while the branch is local; once shared, it becomes a coordination problem rather than a technical one ([[Git - Renaming Branches with git branch -m|renaming branches]]). Deletion is where judgment matters: safe deletion encodes Git’s default assumption that unmerged work is valuable and should be protected, while force deletion is an explicit override used only when you are intentionally discarding history ([[Git - Safe Deleting Branches with git branch -d|safe delete]], [[Git - Force Deleting Branches with git branch -D|force delete]]). The boundary to respect is intent: merged branches should disappear to keep the repository legible, but unmerged branches should only disappear when you are certain their ideas are dead ([[Git - Safe Delete (-d) vs Force Delete (-D)|safe vs force delete]]). If you leave this section knowing that _branch management is about preserving clarity over time rather than memorizing commands,_ and _that deletion choices encode assumptions about whether unmerged work still has value,_ you are correctly calibrated for everything that follows.

- **Must-read from this section:**
	- [[Git - Branch Management|branch management]] – anchors the lifecycle and hygiene mindset
	- [[Git - Comparing Branches with git diff|diffing branches]] – primary risk-reduction tool before merge or delete	    
	- [[Git - Safe Delete (-d) vs Force Delete (-D)|safe vs force delete]] – encodes the core judgment boundary
- **Revisit this section when**
	- You hesitate before deleting a branch because you are unsure what would be lost
	- A repository starts to feel cluttered or confusing despite “working” builds
	- You consider force-deleting a branch and want to sanity-check that decision
	- You rename or clean up branches that other people may already be using

**3. Merging branches**

- [[Git - Branch Merging]]
- [[Git - Purpose of Merging Branches]]
- [[Git - Parent Commits]]
- [[Git - Source & Destination Branches]]
- [[Git - Standard Merge Workflow]]
- [[Git - Interpreting Merge Command Output]]
- [[Git - Fast-Forward Merge]]
- [[Git - Fast-Forward Merge Output]]

>    This section frames merging as the moment where isolated intent becomes shared reality, and the key mental model is that merging is not about “finishing a branch” but about deliberately integrating histories while preserving or discarding context based on risk and audit needs ([[Git - Purpose of Merging Branches|purpose of merging]]). Every merge has a direction, and being explicit about which branch is supplying change versus which is absorbing it is the first guardrail against accidental history pollution ([[Git - Source & Destination Branches|source vs destination branches]]). When histories are linear, Git may fast-forward by simply moving a pointer, which optimizes for readability but quietly erases evidence that work happened on a separate branch, a trade-off that matters later during debugging or rollback ([[Git - Fast-Forward Merge|fast-forward merge]]). When histories diverge, Git creates a merge commit with two parents, preserving the fact that parallel work existed and converged, which increases graph complexity but improves traceability ([[Git - Parent Commits|parent commits]]). The merge output is not noise; it is a verification surface that tells you which strategy occurred, which commits were unified, and whether unexpected files were touched, but it guarantees only mechanical success, never correctness ([[Git - Interpreting Merge Command Output|merge output interpretation]], [[Git - Fast-Forward Merge Output|fast-forward output]]). The boundary to respect is intent versus clarity: choose linearity when simplicity outweighs historical context, and explicit merges when future reasoning matters ([[Git - Standard Merge Workflow|standard merge workflow]]). _If you leave this section knowing that merging is a history-shaping decision rather than a button press,_ and _that fast-forward versus merge commits encode different future debugging and audit trade-offs,_ you are correctly calibrated for everything that follows.

- **Must-read from this section:**
	- [[Git - Purpose of Merging Branches|purpose of merging]] – establishes why integration exists at all	    
	- [[Git - Source & Destination Branches|source vs destination]] – prevents directional mistakes
	- [[Git - Fast-Forward Merge|fast-forward merge]] – captures the key history trade-off	    
	- [[Git - Interpreting Merge Command Output|merge output]] – teaches post-merge verification
- **Revisit this section when**
	- You are unsure whether a merge should preserve branch context or optimize for a clean log	    
	- A merge succeeds but the resulting changes feel suspicious or broader than expected	    
	- You need to explain to someone why a feature’s history is visible—or invisible—in git log	    
	- You are debugging an issue that appeared only after multiple branches converged

### Chapter 2: ### Collaborating with Git

**1. Merge conflicts**

- [[Git - Collaboration]]
- [[Git - Merge Conflicts]]
- [[Git - Merge Conflict Resolution Process]]
- [[Git - Conflict Markers]]
- [[Git - Preventing Merge Conflicts]]

>  This section is about collaboration as a human-technical system where Git optimizes for safety over convenience, and merge conflicts are not failures but signals that parallel intent collided and now requires judgment ([[Git - Collaboration|collaboration]]). The essential mental model is that Git will never guess which change is “right”; when two branches modify the same logical area, Git halts and externalizes the ambiguity through a merge conflict rather than risking silent data loss ([[Git - Merge Conflicts|merge conflicts]]). Conflict markers are not explanatory comments but hard structural sentinels injected directly into files to force an explicit decision, and leaving even one behind guarantees breakage, not partial success ([[Git - Conflict Markers|conflict markers]]). Resolving a conflict is therefore an act of authorship, not cleanup: you must understand both sides’ intent, synthesize a correct outcome, and then explicitly record that decision as a new commit that becomes the single source of truth ([[Git - Merge Conflict Resolution Process|resolution process]]). The real leverage, however, lies upstream: conflict prevention shifts effort from stressful, error-prone merges to disciplined collaboration through short-lived branches, frequent integration, and clear ownership boundaries, accepting that some conflicts are inevitable but most are avoidable ([[Git - Preventing Merge Conflicts|conflict prevention]]). The boundary to internalize is that tools can surface conflicts, but only people can resolve meaning. If you leave this section knowing that _merge conflicts exist to protect correctness rather than convenience,_ and _that prevention strategies are workflow decisions, not Git tricks,_ you are correctly calibrated for everything that follows.

- **Must-read from this section:**
	- [[Git - Merge Conflicts|merge conflicts]] – establishes the safety-first rationale
	- [[Git - Conflict Markers|conflict markers]] – explains the non-negotiable resolution surface
	- [[Git - Preventing Merge Conflicts|conflict prevention]] – highest leverage for real teams
- **Revisit this section when**
	- You encounter conflict markers and feel unsure which side to keep
	- Merges are slowing the team down or creating recurring bugs
	- Long-lived branches start diverging and feel risky to integrat
	- You need to justify workflow changes to reduce merge pain

**2. Introduction to remotes**

- [[Git - Remote Repositories]]
- [[Git - Local Repositories]]
- [[Git - Local vs Remote Repositories]]
- [[Git - Benefits of Remote Repositories]]
- [[Git - Local Remotes]]
- [[Git - Online Repository Hosting Services]]
- [[Git - git clone Command]]
- [[Git - git remote Command]]
- [[Git - The origin Remote]]
- [[Git - git remote add Command]]

>  This section establishes remotes as the bridge that turns Git from a fast, private workspace into a collaborative, fault-tolerant system, and the mental model to hold is that every developer works locally by default while intentionally synchronizing with one or more shared authorities ([[Git - Local Repositories|local repositories]], [[Git - Remote Repositories|remote repositories]]). The non-negotiable distinction is that local repositories optimize for speed, offline safety, and experimentation, while remotes exist to provide a shared source of truth, collaboration, and off-machine backup, with neither replacing the other ([[Git - Local vs Remote Repositories|local vs remote]]). Most real-world workflows begin by copying an existing shared history into a new local environment, after which the local repository is fully autonomous but explicitly linked back to its source through a named remote ([[Git - git clone Command|git clone]]). That link is almost always created under a conventional alias, which reduces cognitive overhead but must be understood as a pointer, not a role or authority in itself ([[Git - The origin Remote|origin remote]]). Managing remotes is therefore about clarity and correctness: knowing which URLs your repository can read from and write to, and verifying those connections before collaboration or automation depends on them ([[Git - git remote Command|git remote]], [[Git - git remote add Command|adding remotes]]). While cloud-hosted platforms dominate modern workflows by layering review, automation, and access control on top of remotes, the same model applies in constrained environments using local network remotes, trading convenience for privacy and control ([[Git - Online Repository Hosting Services|hosting services]], [[Git - Local Remotes|local remotes]]). If you leave this section knowing that *your local repository is a complete, independent system,* and *that remotes are explicit synchronization targets chosen for collaboration and backup rather than execution,* you are correctly calibrated for everything that follows.

- **Must-read from this section:**
	* [[Git - Remote Repositories|remote repositories]] – anchors the collaboration and backup model
	* [[Git - Local vs Remote Repositories|local vs remote]] – defines the core boundary and responsibilities
	* [[Git - The origin Remote|origin remote]] – prevents misinterpretation of default conventions
- **Revisit this section when**
	* You are unsure where your changes will be pushed or who can see them
	* You add multiple remotes and risk pushing to the wrong destination
	* You move between cloud-hosted workflows and restricted or offline environments
	* You automate builds or deployments that depend on correct remote configuration

**3. Pulling from remotes**

- [[Git - Synchronizing Local and Remote Repositories]]
- [[Git - Remote Repository as Source of Truth]]
- [[Git - git fetch Command]]
- [[Git - git pull Command]]
- [[Git - Requirement to Commit Local Changes Before Pulling]]
- [[Git - git pull as a Combination of fetch and merge]]
- [[Git - Synchronizing Remote Changes to a Local Repository Workflow]]

>  This section is about synchronization as a deliberate alignment with a shared authority rather than a routine update, and the anchor concept is that the remote repository is treated as the canonical timeline against which all local work must periodically reconcile ([[Git - Remote Repository as Source of Truth|source of truth]]). The first boundary to internalize is separation of concerns: downloading knowledge of what changed is not the same as integrating it, which is why fetch exists as a non-destructive visibility step that updates your understanding of the remote without touching your working state ([[Git - git fetch Command|git fetch]]). Pull compresses that two-step process into one action by immediately merging fetched changes into your current branch, trading inspection and control for speed, which is acceptable only when the incoming surface area is small and predictable ([[Git - git pull Command|git pull]], [[Git - git pull as a Combination of fetch and merge|pull composition]]). Git enforces discipline here by refusing to synchronize when your local changes are not yet recorded, because merging against an unsaved state would risk silent loss of work rather than a recoverable conflict ([[Git - Requirement to Commit Local Changes Before Pulling|commit-before-pull rule]]). The practical decision point is therefore workflow choice: manual synchronization creates a review checkpoint and reduces surprise, while simplified synchronization optimizes for flow at the cost of visibility, and both exist to serve different risk profiles ([[Git - Synchronizing Local and Remote Repositories|synchronization]], [[Git - Synchronizing Remote Changes to a Local Repository Workflow|sync workflow]]). If you leave this section knowing that _fetching is about awareness while pulling is about integration,_ and _that Git’s guardrails exist to protect history rather than convenience,_ you are correctly calibrated for everything that follows.

- **Must-read from this section:**
	- [[Git - Remote Repository as Source of Truth|source of truth]] – defines the authority model
	- [[Git - git fetch Command|git fetch]] – establishes the safety boundary
	- [[Git - git pull as a Combination of fetch and merge|pull composition]] – explains the core trade-off
- **Revisit this section when**
	- A pull unexpectedly triggers a merge conflict
	- You want to inspect remote changes before touching local work
	- Automation or CI scripts need predictable synchronization behavior
	- You are unsure why Git blocks pulling with local changes present

**4. Pushing to remotes**

- [[Git - Git Pull]]
- [[Git - Git Push]]
- [[Git - Git Push vs Git Pull]]
- [[Git - Push Pull Workflow]]
- [[Git - Tip of current branch is behind Error]]
- [[Git - Recursive Merge on Pull]]
- [[Git - Pushing a New Local Branch to Remote]]

>  This section establishes push and pull as a tightly coupled control loop that governs how local intent becomes shared reality, and the first mental model to internalize is directionality: pulling moves the shared history into your workspace while pushing attempts to advance the shared history with your commits ([[Git - Git Pull|pull]], [[Git - Git Push|push]]). The workflow guarantee is safety-before-authority: Git will not let you publish changes unless your local history already contains everything the remote knows, which is why a rejected push is not an error state but a forced synchronization checkpoint ([[Git - Tip of current branch is behind Error|rejected push]]). Pulling is itself not atomic; when histories have diverged, Git performs a recursive merge that preserves both lines of work via a merge commit, favoring correctness and traceability over linear aesthetics ([[Git - Recursive Merge on Pull|recursive merge]]). The practical boundary here is predictability: pull is safest when you expect small, frequent updates, while long gaps increase merge surface area and cognitive load ([[Git - Push Pull Workflow|push/pull workflow]]). Pushing a new branch is a deliberate visibility decision rather than a technical necessity, trading early feedback and backup against remote clutter and coordination overhead ([[Git - Pushing a New Local Branch to Remote|pushing new branches]]). Conceptual comparison matters more than mechanics: pull integrates others’ work into yours, push offers your work to others, and confusing the two leads directly to broken flow and accidental overwrites ([[Git - Git Push vs Git Pull|push vs pull]]). If you leave this section knowing that _pushing is permission-seeking while pulling is alignment-seeking,_ and _that Git’s rejections and merges exist to preserve shared history rather than convenience,_ you are correctly calibrated for everything that follows.

- **Must-read from this section:**
	- [[Git - Git Push vs Git Pull|push vs pull]] – clarifies direction and responsibility
	- [[Git - Tip of current branch is behind Error|rejected push]] – encodes the core safety guarantee
	- [[Git - Push Pull Workflow|push/pull workflow]] – anchors the collaborative rhythm
- **Revisit this section when**
	- A push is rejected and you are unsure whether to pull, rebase, or stop
	- A pull creates an unexpected merge commit	    
	- You are deciding when a local branch should become visible remotely	    
	- Collaboration feels slow or conflict-heavy despite “correct” commands
## 3. Key Takeaways & Reflections

_After completing the course, what are the 2-3 most important ideas that I will carry forward? Were there any "aha!" moments that connected this topic to others in a new way?_

## 4. Related Projects & Applications

_A list of projects where I have applied the skills from this course. This directly links my theoretical knowledge to practical, portfolio-worthy application._

1. [[|123]]
2. 