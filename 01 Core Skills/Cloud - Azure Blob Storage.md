---
tags: 
  - core
  - cloud
  - object_storage
  - unstructured_data
  - cloud_storage
  - azure_data_services
  - blob
  - concept
source: 
  - "[[Understanding Cloud Computing]]"
related: 
  - "[[Cloud - Azure Data Services]]"
  - "[[Cloud - Azure Data Lake Storage]]"
  - "[[Cloud - Azure SQL Database]]"
  - "[[Cloud - Azure Virtual Machines]]"
  - "[[Cloud - Microsoft Azure]]"
  - "[[Fundamental - Cloud Computing]]"
  - "[[Cloud - Cloud Service Models]]"
  - "[[Cloud - Disaster Recovery]]"
  - "[[Storage - Object Storage]]"
  - "[[Storage - Block Storage]]"
  - "[[Storage - File Storage]]"
  - "[[Data Engineering - Data Lake]]"
  - "[[Cloud - Azure Key Service Offerings]]"
  - "[[Example - The Ottawa Hospital Azure Implementation]]"
  - "[[Cloud - Azure Site Recovery]]"
---
# Core: Azure Blob Storage
## Summary

>Azure Blob Storage is a massively scalable object storage service from [[Cloud - Microsoft Azure|Microsoft]] for unstructured data, serving as a foundational component of many [[Cloud - Azure Data Services|Azure data solutions]].

_Analogy:_ _Think of Azure Blob Storage as a massive, high-tech self-storage facility. The entire facility is your **Storage Account**. Each individual storage unit you rent is a **Container**. The boxes, furniture, and miscellaneous items you put inside your unit are the **Blobs** (your files). You can choose different types of units based on how often you need to access your stuff (Access Tiers), and the facility has copies in other locations for safety (Replication)._

**Where it breaks down:** Unlike a physical unit, Blob Storage is virtually infinitely scalable, can be accessed programmatically from anywhere in the world almost instantly, and offers automated data management policies that a physical facility cannot.

```
Storage Account (your-unique-name.blob.core.windows.net)
     │
     ├─ Container 1 (e.g., 'images')
     │      │
     │      ├─ blob1.jpg
     │      └─ blob2.png
     │
     └─ Container 2 (e.g., 'logs')
            │
            ├─ app_log_2023-10-26.txt (Append Blob)
            └─ video_archive.mp4 (Block Blob)
```

## Details

Azure Blob Storage is Microsoft's solution for storing enormous amounts of unstructured data in the cloud. Unlike structured storage like [[Cloud - Azure SQL Database|Azure SQL Database]] which requires a predefined schema, Blob Storage allows you to store any kind of file—from images and videos to log files and backups—in its native format, making it incredibly flexible.

#### Primary Goal

To provide a highly scalable, durable, and cost-effective storage solution for any type of unstructured data, accessible from anywhere via HTTP/HTTPS.

#### Mechanism


- **How it Works:** Storage is organized in a simple, three-level hierarchy.
    1. **Storage Account:** This is the top-level namespace for your data, providing a unique endpoint in Azure. All data is stored within an account.
    2. **Container:** Similar to a folder in a file system, a container organizes a set of blobs within a storage account.
    3. **Blob:** This is the actual object or file you are storing, along with its metadata.
- **Block Blobs:**
    - Optimized for streaming and storing large objects like documents, images, and videos. Data is managed as a collection of blocks.
    - Example: *An organization like the one in the [[Example - The Ottawa Hospital Azure Implementation|Ottawa Hospital case study]] would use Block Blobs to store unstructured patient data such as MRI scans, X-rays, or PDF clinical notes, which can be large and need to be stored securely and efficiently.*
- **Append Blobs:**
    - Similar to Block Blobs but optimized for append operations, making them ideal for logging scenarios.
    - Example: *Storing continuous log data from a web application or an [[Cloud - Azure Stream Analytics|Azure Stream Analytics]] job.*
- **Page Blobs:**
    - A collection of 512-byte pages optimized for random read and write operations. They serve as the underlying storage for [[Cloud - Azure Virtual Machines|Azure IaaS disks]].
    - Example: *The operating system disk and any data disks attached to an Azure Virtual Machine are stored as Page Blobs.*

##### Code Translation



 [[Code - Azure Blob Storage Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Access Tiers:** These control the cost and retrieval latency of your data.
    - **Hot:** Optimized for frequently accessed data. Higher storage costs, lowest access costs.
    - **Cool:** Optimized for infrequently accessed data stored for at least 30 days. Lower storage costs, higher access costs.
    - **Archive:** Optimized for rarely accessed data with flexible latency requirements (on the order of hours). Lowest storage cost, highest retrieval cost.
- **Redundancy Options:** Determines how your data is replicated for durability and availability.
    - **Locally-redundant storage (LRS):** Three copies within a single data center.
    - **Zone-redundant storage (ZRS):** Three copies across different availability zones in the same region.
    - **Geo-redundant storage (GRS):** Copies data to a secondary region hundreds of miles away.

#### Core Tradeoffs

- **Cost vs. Performance:**
    - The primary tradeoff is between storage cost and access latency, managed via Access Tiers. Storing data in the Archive tier is extremely cheap, but retrieving it is slow and more expensive, making it unsuitable for active applications.
- **Scalability vs. Queryability:**
    - Blob Storage offers virtually limitless scale but provides no native query capabilities over the content of the files. To analyze the data, it must be loaded into another service, often forming the foundation of an [[Cloud - Azure Data Lake Storage|Azure Data Lake]].

## Connections

```
                               (Parent)
                         Azure Key Service Offerings
                                     ▲
                                     │
      ┌──────────────────────────────┼──────────────────────────────┐
      │                              │                              │
(Contrasts With)        ┌───────────────────────────┐         (Builds Upon)
Azure SQL Database      │    Azure Blob Storage     │     Azure Data Lake Storage
                        └───────────────────────────┘
                                     │
                          ┌──────────┴───────────┐
                          │                      │
                     Block Blobs           Append Blobs
```

### Parent Concept

Azure Blob Storage is a fundamental component of [[Cloud - Azure Key Service Offerings|Azure's core service offerings]], providing the foundational storage layer for many other services.

### Related Concepts 

- It forms the underlying storage for [[Cloud - Azure Data Lake Storage|Azure Data Lake Storage Gen2]], which adds a hierarchical namespace and big data analytics capabilities.
- It starkly **contrasts with** [[Cloud - Azure SQL Database|Azure SQL Database]], which is designed for structured, relational data with transactional consistency.
- Blob storage, specifically Page Blobs, provides the persistent disks for [[Cloud - Azure Virtual Machines|Azure Virtual Machines]], making it critical for IaaS workloads.
- It is a common destination for output from services like [[Cloud - Azure Stream Analytics|Azure Stream Analytics]] and a source for [[Cloud - Azure Machine Learning|Azure Machine Learning]] model training data.
## Questions

- Your application stores user-uploaded images. How would you design a lifecycle management policy using Blob Storage access tiers (Hot, Cool, Archive) to balance storage costs with user experience for accessing older images, and how would you justify the potential latency for archived images to the product team?
- You're using Azure Blob Storage to store critical application logs that must comply with [[Cloud - Personal Health Information Protection Act (PHIPA)|PHIPA]]. How would you design a highly available and durable logging pipeline, what redundancy option would you choose, and what security measures would you implement to ensure compliance?
- What if Blob Storage didn't exist? How would you build a scalable, cost-effective object storage solution from scratch using only [[Cloud - Azure Virtual Machines|Azure Virtual Machines]] and managed disks?