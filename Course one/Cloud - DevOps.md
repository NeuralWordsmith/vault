---
tags: 
  - core
  - cloud
  - infrastructure_as_code
  - ci_cd
  - automation
  - software_delivery
  - operations
  - concept
source: 
  - "[[Understanding Cloud Computing]]"
related: 
  - "[[Cloud - DevOps Engineer Role]]"
  - "[[Cloud - Cloud Engineer Role]]"
  - "[[Cloud - Cloud Architect Role]]"
  - "[[Fundamental - MLOps]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Fundamental - Version Control]]"
  - "[[Fundamental - Containerization]]"
  - "[[DevOps - Continuous Integration]]"
  - "[[DevOps - Continuous Delivery]]"
  - "[[DevOps - Infrastructure as Code]]"
  - "[[Tools - Git]]"
  - "[[Tools - Docker]]"
  - "[[Tools - Kubernetes]]"
  - "[[Tools - Terraform]]"
  - "[[Tools - Jenkins]]"
---
# Core: DevOps
## Summary

>DevOps is a cultural and technical practice that merges software development (Dev) with IT operations (Ops) to automate and streamline the process of managing infrastructure through code.

_Analogy:_ _Imagine building a house. The traditional method is like an architect (Developer) handing over static blueprints to a construction crew (Operations). If the crew finds a problem, work stops, and they must wait for the architect to revise the plans. The DevOps approach is like the architect and crew working together using a prefabricated kit with digital, automated instructions. The 'blueprints' are code that a robot can execute to assemble the house. To make a change, you simply update the code, and the robot rebuilds the affected section quickly and precisely._

**Where it breaks down:** A house is typically built once, whereas software systems are continuously built, deployed, and maintained in a cyclical, never-ending process that the analogy doesn't fully capture.

```
Before DevOps (The Wall):
[ Developers ] ---> [ Code Thrown Over Wall ] ---> [ Operations ] ---> [ Manual Deploy ]

After DevOps (The Loop):
           ▲                                                 │
           └───────────[ Automated Pipeline ] <────────────┘
                         (Test, Build, Deploy)
                                 │
                                 ▼
[ Devs & Ops ] ---> [ Shared Code Repository ] ---> [ Production ]
 (App & Infra Code)    (Version Controlled)
```

## Details

DevOps represents a fundamental shift in how we manage technology infrastructure. It combines the disciplines of software development and IT operations, moving away from the old model where system engineers would manually configure physical hardware. Now, infrastructure is defined and managed through code, applying software engineering principles like version control and automation to operational tasks. This philosophy is embodied by the [[Cloud - DevOps Engineer Role|DevOps Engineer]], who bridges this gap.

#### Primary Goal

To eliminate the friction and silos between development and operations teams by treating infrastructure management as a software engineering problem, thereby increasing the speed and reliability of software delivery.

#### Mechanism


- **How it Works: From Silos to Loops**
    1. **Traditional Approach (The Silo):** Developers write application code and 'throw it over the wall' to the operations team. The Ops team then manually provisions servers, configures networks, and deploys the application. This process is slow, error-prone, and creates a bottleneck.
    2. **DevOps Approach (The Loop):** Operational tasks are defined in configuration files, a practice known as Infrastructure as Code (IaC). This infrastructure code is stored in a version control system (like Git) alongside the application code. An automated pipeline then tests and deploys both the application and the infrastructure together, creating a continuous, reliable loop.
- **Key Principle: Infrastructure as Code (IaC)**
    - This is the central mechanism of DevOps, where the process of managing and provisioning infrastructure is done through machine-readable definition files, rather than physical hardware configuration or interactive configuration tools.
    - *Example: Instead of a system engineer logging into a server and manually installing a web server, a developer writes a script (e.g., a Terraform or Ansible file) that declaratively defines the server's desired state, including the web server and its configuration. This script can be executed automatically to create or update the server, ensuring consistency every time.*

##### Code Translation

```python
# This is not Python, but a Dockerfile, a common example of Infrastructure as Code.
# It defines a consistent environment for an application.

# --- Step 1: Define the Base Environment ---
# Start from an official Python 3.9 image.
FROM python:3.9-slim

# --- Step 2: Set up the Working Directory ---
# Create and set the working directory inside the container.
WORKDIR /app

# --- Step 3: Copy and Install Dependencies ---
# Copy the requirements file and install the Python packages.
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# --- Step 4: Copy Application Code ---
# Copy the rest of the application's code into the container.
COPY . .

# --- Step 5: Define the Runtime Command ---
# Specify the command to run when the container starts.
CMD ["python", "app.py"]
```

 [[Code - DevOps Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Toolchain Selection**
    - The specific set of tools chosen for version control (e.g., Git), continuous integration (e.g., Jenkins, GitLab CI), configuration management (e.g., Ansible), and orchestration (e.g., Kubernetes). The choice of tools defines the capabilities and complexity of the DevOps pipeline.
- **Scope of Automation**
    - Determines how much of the software delivery lifecycle is automated. A team might start by automating only the build and test phases, later expanding to include automated deployments, security scanning, and infrastructure provisioning.

#### Core Tradeoffs

- **Increased Initial Complexity**
    - Adopting DevOps requires developers and operations staff to learn a new suite of tools and practices. Setting up the initial automated pipelines and infrastructure code can be a significant upfront investment.
- **Cultural Shift Requirement**
    - The most significant challenge is often not technical but cultural. It requires breaking down long-standing organizational silos, fostering collaboration, and changing the fundamental mindset of how teams work together.

## Connections

```
                             (Parent)
                      Software Engineering
                                ▲
                                │
                ┌───────────────┼───────────────┐
                │               │               │
(Implements)    ┌───────────────┴───────────────┐    (Implements)
Cloud Engineer  │             DevOps            │    DevOps Engineer
                └───────────────┬───────────────┘
                                │
                     ┌──────────┴──────────┐
                     │                     │
      Infrastructure as Code              CI/CD
             (Child)               (Child)
```

### Parent Concept

DevOps is a practice within the broader field of [[Fundamental - Software Engineering|software engineering]] that has become a cornerstone of modern [[Fundamental - MLOps|MLOps]].

### Related Concepts 

- **Is Implemented By:** The [[Cloud - DevOps Engineer Role|DevOps Engineer]] is the specialist role responsible for designing, building, and maintaining the automated systems that enable DevOps practices.
- **Works With:** The DevOps philosophy is often executed in collaboration with a [[Cloud - Cloud Engineer Role|Cloud Engineer]], who manages the underlying cloud platform services that the DevOps pipelines utilize.
- **Is Guided By:** The overall strategy for how DevOps fits into the larger technical ecosystem is often defined by the [[Cloud - Cloud Architect Role|Cloud Architect]].
## Questions

- A startup wants to move fast and is considering skipping the setup of a full CI/CD pipeline to ship features quicker. How would you argue for the long-term business value of investing in DevOps practices upfront, even if it slows down the first release?
- You've implemented an 'Infrastructure as Code' pipeline using Terraform. How would you design a system to manage and secure sensitive information like API keys and database passwords within this codebase, ensuring they are not exposed in your version control system?
- What if your organization banned all third-party automation tools (like Jenkins, Terraform, Ansible)? How would you attempt to implement the core principles of DevOps using only basic shell scripts and a Git repository?