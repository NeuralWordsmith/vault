---
tags: 
  - core
  - cloud
  - virtual_machines
  - iaas
  - cloud_computing
  - compute
  - aws
  - concept
source: 
  - "[[Understanding Cloud Computing]]"
related: 
  - "[[Cloud - Amazon Web Services (AWS)]]"
  - "[[Cloud - AWS Simple Storage Service (S3)]]"
  - "[[Cloud - AWS Relational Database Service (RDS)]]"
  - "[[Cloud - AWS SageMaker]]"
  - "[[Fundamental - Cloud Computing]]"
  - "[[Cloud - Cloud Service Models]]"
  - "[[Cloud - Core Service Offerings]]"
  - "[[Fundamental - Containerization]]"
  - "[[Cloud - AWS Redshift]]"
  - "[[Cloud - AWS Kinesis]]"
  - "[[Cloud - EC2 Compute Optimized Instances]]"
  - "[[Cloud - EC2 Memory Optimized Instances]]"
  - "[[Fundamental - MLOps]]"
  - "[[Example - NerdWallet AWS SageMaker Implementation]]"
---
# Core: Elastic Compute Cloud (EC2)
## Summary

>A core service within [[Cloud - Amazon Web Services (AWS)|Amazon Web Services]] that provides secure, resizable virtual servers, known as instances, to deliver raw computation power in the cloud.

_Analogy:_ _EC2 is like renting a computer online. Instead of buying a physical machine, you choose its specifications (CPU, RAM, storage) from a catalog (Instance Types), select an operating system and pre-installed software (Amazon Machine Image), and pay by the hour for exactly what you use. When you're done, you simply 'return' it without any long-term commitment._

**Where it breaks down:** Unlike renting a single physical computer, EC2 allows you to rent thousands of virtual computers instantly, scale them up or down automatically, and benefit from a level of reliability, security, and global distribution that is impossible to achieve with a single machine.

```
 [ User ]
    │
    └─── Chooses ──────────► [ Amazon Machine Image (AMI) ] ◄── (OS + Software Blueprint)
           │
           │ Chooses
           ▼
 [ Instance Type ] ◄────── (CPU, RAM, etc.)
           │
           │ Launches
           ▼
    ┌──────────────────┐
    │   EC2 Instance   │ ◄─── (Virtual Server)
    │ (Running OS)     │
    └───────┬──────────┘
            │ Attaches
            ▼
    ┌──────────────────┐
    │ EBS Volume       │ ◄─── (Persistent Storage)
    └──────────────────┘
```

## Details

Elastic Compute Cloud (EC2) is the foundational Infrastructure as a Service (IaaS) offering from AWS, providing the virtual servers that form the backbone of most cloud-based applications. It allows users to provision and manage these 'instances' to run everything from simple websites to complex, high-performance computing tasks, serving as the compute layer that works in tandem with storage services like [[Cloud - AWS Simple Storage Service (S3)|S3]] and managed databases like [[Cloud - AWS Relational Database Service (RDS)|RDS]].

#### Primary Goal

To provide developers with scalable, on-demand compute capacity, thereby eliminating the need for upfront hardware investment and enabling applications to scale elastically with demand.

#### Mechanism


- **How it Works:** A user provisions an EC2 instance through a series of configuration choices, creating a virtual server that is ready to use within minutes.
    1. **Choose an Amazon Machine Image (AMI):** This is a template containing the operating system (e.g., Linux, Windows) and any pre-installed software, acting as the blueprint for the instance.
    2. **Select an Instance Type:** This defines the hardware profile of the instance, including the amount of CPU, memory (RAM), storage, and networking capacity.
    3. **Configure Networking and Storage:** The user defines network access rules (Security Groups) and attaches persistent block storage volumes (Elastic Block Store - EBS).
    4. **Launch and Connect:** The instance is launched in a specified AWS region, and the user can connect to it securely (e.g., via SSH) to install and run their applications.
- **Instance Types:** AWS offers a wide variety of instance types optimized for different workloads.
    - **General Purpose (e.g., M5, T3):** Balanced CPU, memory, and networking resources suitable for a wide range of applications like web servers and small databases.
    - **Compute Optimized (e.g., C5):** High-performance processors ideal for compute-intensive tasks like batch processing, media transcoding, and scientific modeling.
    - **Memory Optimized (e.g., R5, X1):** Large amounts of RAM for processing large datasets in-memory, suitable for high-performance databases or real-time big data analytics.
    - **Accelerated Computing (e.g., P3, G4):** Hardware accelerators (GPUs, FPGAs) for tasks like machine learning model training and graphics rendering. For instance, the model training in the [[Example - NerdWallet AWS SageMaker Implementation|NerdWallet case study]] likely runs on these powerful underlying EC2 instances, managed by the SageMaker service.
- **Pricing Models:** EC2 offers flexible pricing to optimize costs.
    - **On-Demand:** Pay a fixed rate by the hour or second with no long-term commitment. Ideal for unpredictable workloads.
    - **Reserved Instances:** A significant discount in exchange for a 1- or 3-year commitment. Best for applications with steady-state usage.
    - **Spot Instances:** Request spare EC2 capacity for up to a 90% discount, but AWS can reclaim the instance with a two-minute warning. Perfect for fault-tolerant and stateless workloads.

##### Code Translation



 [[Code - Elastic Compute Cloud (EC2) Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Instance Family & Size:**
    - Determines the fundamental hardware allocation (CPU, RAM, network). Choosing the wrong family (e.g., a general-purpose instance for a memory-intensive task) leads to performance bottlenecks or wasted cost.
- **Amazon Machine Image (AMI):**
    - Defines the base software environment. Using a custom AMI with pre-configured software can dramatically reduce instance boot and configuration time.
- **Storage Type (EBS vs. Instance Store):**
    - EBS provides persistent block storage that lives independently of the instance, while Instance Store is ephemeral storage physically attached to the host computer. Choosing EBS is critical for data that must survive instance termination.

#### Core Tradeoffs

- **Flexibility vs. Management Overhead:**
    - EC2 offers complete control over the computing environment (OS, patches, software). This flexibility comes at the cost of increased management responsibility compared to more abstract services like AWS Lambda or managed platforms like [[Cloud - AWS SageMaker|SageMaker]].
- **Cost vs. Availability (Pricing Models):**
    - Using Spot Instances can drastically reduce costs but introduces the risk of interruption. On-Demand instances provide reliability at a higher price. This requires a careful analysis of the workload's fault tolerance.
- **Performance vs. Cost (Instance Sizing):**
    - Over-provisioning an instance (choosing one that is too large) wastes money, while under-provisioning leads to poor application performance. Right-sizing instances is a continuous process of monitoring and adjustment.

## Connections

```
                               (Parent)
                         Cloud - Amazon Web Services (AWS)
                                     ▲
                                     │
                                     │
(Works With) ───────────  ┌───────────────────────────────┐  ─────────── (Contrasts With)
Cloud - AWS S3            │  Elastic Compute Cloud (EC2)  │            Cloud - AWS SageMaker
Cloud - AWS RDS           └───────────────────────────────┘
                                     │
                          ┌──────────┴──────────┐
                          │                     │
                  (Instance Family)     (Instance Family)
                  Compute Optimized     Memory Optimized
```

### Parent Concept

EC2 is a foundational compute service within the broader ecosystem of [[Cloud - Amazon Web Services (AWS)|Amazon Web Services]].

### Related Concepts 

- EC2 provides the raw, unmanaged compute power that **contrasts with** the fully managed machine learning environment of [[Cloud - AWS SageMaker|AWS SageMaker]], which often uses EC2 instances under the hood.
- Applications running on EC2 instances frequently use [[Cloud - AWS Simple Storage Service (S3)|S3]] as a durable, scalable object store for data, backups, and static assets.
- EC2 instances often connect to [[Cloud - AWS Relational Database Service (RDS)|RDS]] to interact with a managed relational database, separating the application logic from the data persistence layer.
## Questions

- When would you choose to build a custom data processing platform on raw EC2 instances versus using a managed service like AWS Glue or EMR, and how would you justify the total cost of ownership (TCO) difference to a CFO?
- How would you design a highly available and fault-tolerant architecture for a critical web application using EC2 instances across multiple Availability Zones, and what mechanisms would you use for health checks and automated failover?
- What if storage (EBS) latency dropped to near-zero and its throughput became virtually unlimited? How would this change the way you design stateful applications and databases on EC2?