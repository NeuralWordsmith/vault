---
tags: 
  - core
  - cloud
  - iaas
  - paas
  - cloud_services
  - compute
  - storage
  - concept
source: 
  - "[[Understanding Cloud Computing]]"
related: 
  - "[[Cloud - Microsoft Azure]]"
  - "[[Cloud - Azure Virtual Machines]]"
  - "[[Cloud - Azure Blob Storage]]"
  - "[[Cloud - Azure SQL Database]]"
  - "[[Fundamental - Cloud Computing]]"
  - "[[Cloud - Cloud Service Models]]"
  - "[[Cloud - Cloud Deployment Models]]"
  - "[[Cloud - Key Advantages]]"
  - "[[Cloud - Disaster Recovery]]"
  - "[[Cloud - Azure Site Recovery]]"
  - "[[Cloud - Data Sovereignty & Cloud Computing]]"
  - "[[Cloud - Azure Data Services]]"
  - "[[Cloud - Azure Data Lake Storage]]"
  - "[[Example - The Ottawa Hospital Azure Implementation]]"
---
# Core: Core Service Offerings
## Summary

>The foundational pillars of cloud computing that provide essential resources for building and running applications, primarily categorized as compute, storage, and databases.

_Analogy:_ _Think of core cloud services as a city's public utilities. **Compute** ([[Cloud - Azure Virtual Machines|Azure Virtual Machines]]) is the **power grid**, providing the raw energy needed to run everything. **Storage** ([[Cloud - Azure Blob Storage|Azure Blob Storage]]) is the city's **water reservoir system**, holding vast amounts of a vital resource until it's needed. **Databases** ([[Cloud - Azure SQL Database|Azure SQL Database]]) are the **postal service and address system**, organizing information so it can be found and delivered efficiently._

**Where it breaks down:** Unlike physical city utilities which require massive upfront investment and scale slowly, cloud services can be provisioned, scaled up, or scaled down in minutes, with a pay-as-you-go model.

```
      [ Cloud Application ]
             │
             ├──────────────────┬─────────────────┐
             │                  │                 │
             ▼                  ▼                 ▼
      ┌──────────┐       ┌──────────┐      ┌──────────┐
      │ Compute  │       │ Storage  │      │ Database │
      │  (VMs)   │       │ (Blobs)  │      │  (SQL)   │
      └──────────┘       └──────────┘      └──────────┘
```

## Details

Cloud platforms like [[Cloud - Microsoft Azure|Microsoft Azure]] offer a vast catalog of services, but nearly all of them are built upon a fundamental trio of offerings. These core services abstract away the complexities of physical hardware, allowing users to rent computing power, storage space, and database management capabilities on demand. The primary categories are **Compute**, **Storage**, and **Databases**.

#### Primary Goal

To provide the essential, on-demand, building-block resources for creating and running virtually any application in the cloud without the need to purchase and manage physical hardware.

#### Mechanism


- **How it Works:** Cloud providers operate massive data centers globally. They use virtualization technology to partition physical hardware (servers, disks) into rentable units that can be accessed over the internet. Users interact with these services through APIs or web portals, specifying their needs and paying only for the resources they consume.
- **Compute Services:**
    - These services provide the processing power to run applications and execute code. The most basic form is a virtual machine, which is essentially a complete computer (CPU, memory, networking) running in the cloud.
        - *Example:* [[Cloud - Azure Virtual Machines|Azure Virtual Machines]] allow you to rent servers to host a web application, run data analysis jobs, or manage backend processes. An organization like in the [[Example - The Ottawa Hospital Azure Implementation|Ottawa Hospital case study]] might use VMs to run specialized legacy medical software that requires a specific operating system environment.
- **Storage Services:**
    - These services offer durable, scalable, and secure places to store data. This is often for unstructured data like files, images, videos, and logs.
        - *Example:* [[Cloud - Azure Blob Storage|Azure Blob Storage]] is an object storage service, acting like a massive, infinitely scalable hard drive in the cloud for storing everything from application assets to large backup files.
- **Database Services:**
    - These are managed services that simplify the setup, operation, and scaling of relational or non-relational databases. They handle administrative tasks like patching, backups, and high availability.
        - *Example:* [[Cloud - Azure SQL Database|Azure SQL Database]] provides a fully managed relational database-as-a-service, allowing developers to store and query structured application data without worrying about managing the underlying server.

##### Code Translation



 [[Code - Core Service Offerings Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Service Tier / Size:**
    - Controls the performance and capacity (e.g., CPU cores and RAM for a VM, throughput units for a database). Higher tiers provide more power but at a higher cost.
- **Geographic Region:**
    - Determines the physical location of the data center where the service runs. This choice impacts latency for end-users and is critical for [[Cloud - Data Sovereignty & Cloud Computing|data sovereignty]] compliance.
- **Redundancy Level:**
    - Configures how many copies of your data are kept and where (e.g., locally redundant, geo-redundant). This parameter is key for designing a [[Cloud - Disaster Recovery|disaster recovery]] strategy.

#### Core Tradeoffs

- **Managed vs. Unmanaged (PaaS vs. IaaS):**
    - Using a managed service like Azure SQL Database reduces operational overhead but offers less control and customization compared to installing and managing your own database on an Azure VM.
- **Cost vs. Performance:**
    - Provisioning higher-performance tiers or adding more redundancy directly increases monthly costs. A key challenge is 'right-sizing' services to meet needs without overspending.
- **Vendor Lock-in:**
    - While core services like VMs are fairly standardized, relying heavily on a provider's specific database or storage APIs can make it more difficult and costly to migrate to a different cloud platform in the future.

## Connections

```
                          (Parent)
                  Fundamental - Cloud Computing
                           ▲
                           |
      ┌────────────────────┼────────────────────┐
      │                    │                    │
(Provider)       ┌───────────────────────────┐      (Categorized By)
Microsoft Azure  │  Core Service Offerings   │      Cloud Service Models
                 └───────────────────────────┘
                           │
      ┌────────────────────┴────────────────────┐
      │                    │                    │
Azure Virtual Machines Azure Blob Storage  Azure SQL Database
```

### Parent Concept

These offerings are the primary implementation of the concepts outlined in [[Fundamental - Cloud Computing|cloud computing]].

### Related Concepts 

- **Is Provided By:** [[Cloud - Microsoft Azure|Microsoft Azure]] is a leading cloud platform that provides a comprehensive suite of these core services.
- **Is The Foundation For:** More advanced platform services, such as [[Cloud - Azure Machine Learning|Azure Machine Learning]], are built upon these fundamental compute and storage offerings.
- **Contrasts With:** The traditional on-premises model, where an organization must purchase, host, and maintain all of its own physical hardware for compute, storage, and databases.
## Questions

- How would you decide between using a fully managed service like [[Cloud - Azure SQL Database|Azure SQL Database]] versus installing and managing your own SQL Server on an [[Cloud - Azure Virtual Machines|Azure VM]] for a new application, considering factors like team expertise, budget, and future scalability requirements?
- You are designing a system that relies heavily on [[Cloud - Azure Blob Storage|Azure Blob Storage]] for critical user-generated content. What monitoring and automated governance strategy would you implement to proactively handle scenarios like rapidly escalating storage costs, accidental public exposure of sensitive data, or approaching service quotas?
- What if a breakthrough in networking technology made data transfer costs negligible and latency between any two points on earth near-zero? How would this fundamentally change the way we architect applications using core compute, storage, and database services, especially concerning geographic distribution and data locality?