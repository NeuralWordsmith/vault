---
tags: 
  - major_core
  - cloud
  - iaas
  - cloud_services
  - compute
  - storage
  - database
  - concept
source: 
  - "[[Understanding Cloud Computing]]"
related: 
  - "[[Fundamental - Cloud Computing]]"
  - "[[Cloud - Compute Services]]"
  - "[[Cloud - Storage Services]]"
  - "[[Cloud - Database Services]]"
  - "[[Cloud - Virtualization]]"
  - "[[Cloud - Key Advantages]]"
  - "[[Cloud - Scalability]]"
  - "[[Cloud - Pay-as-You-Go Pricing]]"
  - "[[Cloud - IaaS vs PaaS vs SaaS]]"
  - "[[Cloud - Vertical vs Horizontal Scaling]]"
  - "[[Cloud - Reliability]]"
  - "[[Cloud - Security]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[Cloud - AWS EC2]]"
---
# Major Core: Core Service Offerings

## Summary

> The three core service offerings of cloud computing are the foundational pillars upon which nearly all other services are built: compute, storage, and database services.

_Analogy:_ _Think of building a restaurant. The core cloud offerings are like the three essential components you'd rent in a commercial space: the kitchen is your **Compute Service** (where the work of cooking happens), the pantry and refrigerators are your **Storage Service** (where raw ingredients are kept), and the recipe book and order management system are your **Database Service** (where structured information is organized and accessed)._

**Where it breaks down:** Unlike a physical restaurant, cloud services are highly integrated, can be scaled up or down in seconds, and are managed through software APIs, offering a level of automation and flexibility that physical infrastructure cannot match.

```
    +------------------------------------+
    |        Your Cloud Application      |
    +-----------------+------------------+
                      |
    +-----------------v------------------+
    | Foundational Cloud Service Pillars |
    +------+------------+---------------+
           |            |               
      +----v----+  +----v----+  +----v----+
      | Compute |  | Storage |  | Database|
      | (VMs,   |  | (Object,|  | (SQL,   |
      | Cont.)  |  | Block)  |  | NoSQL)  |
      +---------+  +---------+  +---------+
```

## Details

While cloud providers offer a dizzying array of specialized tools, they are all fundamentally built upon a simple, powerful triad of services. This model provides the essential building blocks for running applications, handling data, and managing information, all made possible through the abstraction layer of [[Cloud - Virtualization|virtualization]]. The three core offerings are **Compute**, **Storage**, and **Database**.

#### Primary Goal

To provide the fundamental, on-demand building blocks required to build and run virtually any software application without the cost and complexity of managing physical hardware.

#### Mechanism

- **How it Works:** Cloud providers use massive data centers to maintain pools of physical hardware. They use virtualization to partition this hardware into rentable, isolated resources that can be provisioned and configured by customers via the internet. This model is typically categorized into three main types:
- **1. Compute Services:**
    - This is the 'brains' of the operation, providing the processing power (CPU), memory (RAM), and networking capabilities to run code and applications. It's the foundation for executing logic.
    - Example: *Running a web server on a virtual machine or executing a data processing job in a container. This is the focus of [[Cloud - Compute Services|compute services]].*
- **2. Storage Services:**
    - This is the 'filing cabinet,' providing a place to store and retrieve data durably and reliably. It's designed for data at rest, from small files to petabyte-scale datasets.
    - Example: *Storing user-uploaded images in an object store or attaching a persistent disk to a virtual machine. This is the domain of [[Cloud - Storage Services|storage services]].*
- **3. Database Services:**
    - This is the 'librarian,' offering managed services for storing, querying, and managing structured or semi-structured data. It provides optimized systems for efficient data retrieval and manipulation.
    - Example: *Storing user profile information in a relational database or caching session data in a key-value store. This is covered by [[Cloud - Database Services|database services]].*



 [[Code - Core Service Offerings Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Configuration Dimensions:** Instead of hyperparameters, the 'levers' for these core services involve choosing the right configuration for the job.
    - **Compute:** Instance size (vCPU, RAM), instance family (e.g., general purpose, compute-optimized, memory-optimized).
    - **Storage:** Storage type (object, block, file), performance tiers (IOPS), durability/redundancy options.
    - **Database:** Engine type (e.g., PostgreSQL, MySQL, DynamoDB), instance size, read/write capacity, replication strategy.

#### Core Tradeoffs

- **Flexibility vs. Management Overhead:**
    - Using these core Infrastructure as a Service (IaaS) components provides maximum control and flexibility. However, it also requires more effort to configure, secure, and manage the infrastructure compared to higher-level Platform as a Service (PaaS) or Software as a Service (SaaS) offerings.
- **Generality vs. Specificity:**
    - These services are powerful general-purpose building blocks. For specific tasks (e.g., machine learning training, video transcoding), providers often offer more specialized, managed services that can accelerate development but may be less customizable and potentially lead to vendor lock-in.

## Connections

```
                      (Parent)
                Fundamental - Cloud Computing
                         ▲
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                    │
(Enabler)       ┌───────────────────────────┐     (Benefit)
Cloud - Virtualization  │ Core Service Offerings    │     Cloud - Scalability
                └───────────────────────────┘
                           │
            ┌──────────────┴──────────────┐
            │              │              │
Cloud - Compute Services  Cloud - Storage Services  Cloud - Database Services
```

### Parent Concept

This concept is a fundamental component of the broader field of [[Fundamental - Cloud Computing|cloud computing]], representing the primary ways providers package and sell resources.

### Child Concepts

- The first core offering is [[Cloud - Compute Services|compute services]], which provide the processing power and memory to run applications.
- The second is [[Cloud - Storage Services|storage services]], which offer durable and scalable solutions for data persistence.
- The third is [[Cloud - Database Services|database services]], which provide managed systems for organizing, storing, and retrieving structured data.

### Related Concepts 

- The entire model of offering these distinct services is made possible by [[Cloud - Virtualization|virtualization]], which abstracts physical hardware into consumable resources.
- Understanding these core offerings is essential to grasping the [[Cloud - Key Advantages|key advantages of the cloud]], such as [[Cloud - Scalability|scalability]] and [[Cloud - Pay-as-You-Go Pricing|pay-as-you-go pricing]].
- These services form the foundation upon which higher-level abstractions, like Platform as a Service (PaaS) and Software as a Service (SaaS), are built.
## Questions

- A startup needs to launch a new application quickly. Should they build it using the core compute, storage, and database services for maximum control and future flexibility, or use a higher-level, more managed platform (PaaS) that might be faster to market but could lead to vendor lock-in? How do you justify the long-term cost implications of this choice?
- Imagine you've designed a system using these three core services. How would you architect a cross-service monitoring and alerting strategy to detect a bottleneck? For example, if high database latency is caused by an under-provisioned compute instance, how would your system trace and identify the root cause automatically?
- What if a new technology emerged that completely unified compute, storage, and database access into a single, seamless resource primitive? What would be the immediate benefits and the unforeseen dangers of abstracting away these fundamental distinctions?
