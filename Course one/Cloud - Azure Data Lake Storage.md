---
tags: 
  - core
  - cloud
  - data_lake
  - big_data
  - azure_storage
  - data_engineering
  - elt
  - concept
source: 
  - "[[Understanding Cloud Computing]]"
related: 
  - "[[Cloud - Azure Data Services]]"
  - "[[Cloud - Azure Blob Storage]]"
  - "[[Cloud - Microsoft Azure]]"
  - "[[Cloud - Azure SQL Database]]"
  - "[[Cloud - Microsoft Fabric]]"
  - "[[Cloud - Azure Machine Learning]]"
  - "[[Cloud - Azure Stream Analytics]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[Fundamental - Cloud Computing]]"
  - "[[Data - Data Lake]]"
  - "[[Data - Data Warehouse]]"
  - "[[Data - ETL vs ELT]]"
  - "[[Data - Schema on Read vs Schema on Write]]"
  - "[[Cloud - Azure Data Factory]]"
  - "[[Cloud - Azure Synapse Analytics]]"
---
# Core: Azure Data Lake Storage
## Summary

>Azure Data Lake Storage is a massively scalable and secure data lake functionality built on [[Cloud - Azure Blob Storage|Azure Blob Storage]] designed to store vast amounts of raw data in its native format before any preparation or transformation tasks.

_Analogy:_ _Think of Azure Data Lake Storage as a massive natural reservoir for a city. Raw water flows in from various sources (rivers, rain, streams) and is held in the reservoir without any filtering. This corresponds to ingesting unstructured, semi-structured, and structured data from various applications and systems into the data lake. The city's water treatment plants can then draw from this massive, centralized source as needed to purify it for specific uses (drinking, industry), just as analytics services like [[Cloud - Azure Machine Learning|Azure Machine Learning]] draw raw data from the lake to process and analyze for specific insights._

**Where it breaks down:** A physical reservoir is passive, whereas Azure Data Lake Storage is an active service with features for security, access control, and hierarchical organization. Also, without proper governance (like zoning and pollution control for a real lake), a data lake can become a 'data swamp'—a disorganized mess that's difficult to navigate, a problem a physical reservoir doesn't face in the same way.

```
[Data Sources]──> (ETL/ELT Tools) ──> [ Azure Data Lake Storage ] ──> (Analytics Engines) ──> [Insights]
(Logs, DBs,     (Azure Data Factory,      (Hierarchical Namespace)      (Spark, Synapse, ML)      (BI Reports,
 IoT, Files)      Stream Analytics)                                                                ML Models)
```

## Details

Azure Data Lake Storage (ADLS) is a core component of the [[Cloud - Azure Data Services|Azure data services]] ecosystem, providing a foundational storage layer for big data analytics. It extends the capabilities of [[Cloud - Azure Blob Storage|Azure Blob Storage]] by adding a hierarchical namespace, which allows data to be organized into a familiar directory and file structure, dramatically improving performance for analytical queries.

#### Primary Goal

To provide a single, highly scalable, and cost-effective repository for enterprises to store all of their data—regardless of size, shape, or speed—enabling large-scale analytics and machine learning workloads.

#### Mechanism


- **How it Works:** ADLS operates as a central repository where raw data is landed and stored before being consumed by other services.
    1. **Ingestion:** Data from various sources (IoT devices, application logs, transactional databases) is loaded into the data lake using tools like Azure Data Factory or [[Cloud - Azure Stream Analytics|Azure Stream Analytics]].
    2. **Storage:** The data is stored in its native format within a container. ADLS Gen2 introduces a hierarchical namespace on top of [[Cloud - Azure Blob Storage|Azure Blob Storage]], organizing data into a file system-like structure (e.g., `/raw/sales/2023/10/31/data.json`). This is crucial for efficient querying by big data engines like Apache Spark.
    3. **Processing & Consumption:** Once stored, services like Azure Databricks, Azure Synapse Analytics, or [[Cloud - Azure Machine Learning|Azure Machine Learning]] can access and process the data directly from the lake. For instance, in a healthcare context like the [[Example - The Ottawa Hospital Azure Implementation|Ottawa Hospital implementation]], anonymized patient data could be stored in ADLS before being used to train predictive models in Azure Machine Learning.

##### Code Translation



 [[Code - Azure Data Lake Storage Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Storage Tiers:**
    - **Hot Tier:** Optimized for frequently accessed data. Higher storage costs, lower access costs.
    - **Cool Tier:** Optimized for infrequently accessed data stored for at least 30 days. Lower storage costs, higher access costs.
    - **Archive Tier:** Optimized for rarely accessed data with flexible latency requirements (hours). The lowest storage cost but highest retrieval cost.
- **Redundancy Options:**
    - **Locally-redundant storage (LRS):** Three synchronous copies within a single physical location.
    - **Zone-redundant storage (ZRS):** Three synchronous copies across three availability zones in the primary region.
    - **Geo-redundant storage (GRS):** Copies data synchronously three times within a single physical location in the primary region, then copies data asynchronously to a single physical location in a secondary region.

#### Core Tradeoffs

- **Flexibility vs. Governance:**
    - ADLS allows storing data in any format ('schema-on-read'), which is highly flexible. However, without strong governance, this can lead to a 'data swamp' where data is undocumented, untrustworthy, and difficult to use.
- **Cost vs. Performance:**
    - Choosing the right storage tier and redundancy option is a direct trade-off. Storing everything in the Hot tier provides the best performance but is expensive. Effective data lifecycle management is required to move data to cooler, cheaper tiers.
- **ADLS vs. Blob Storage:**
    - While built on Blob Storage, enabling the hierarchical namespace for ADLS Gen2 is an irreversible decision for a storage account. It's optimized for analytics workloads but may have slightly different performance characteristics for pure object store use cases compared to a flat namespace blob container.

## Connections

```
                               (Parent)
                         Azure Data Services
                                  ▲
                                  │
        ┌─────────────────────────┼──────────────────────────┐
        │                         │                          │
(Contrasts With)      ┌───────────────────────────┐      (Integrates With)
Azure SQL Database    │ Azure Data Lake Storage   │      Azure Machine Learning
                      └───────────────────────────┘
                                  │
                                  ▼
                              (Built On)
                         Azure Blob Storage
```

### Parent Concept

It is a key offering within the broader category of [[Cloud - Azure Data Services|Azure Data Services]], which encompass all of Microsoft's cloud-based data management and analytics tools.

### Related Concepts 

- It **contrasts with** [[Cloud - Azure SQL Database|Azure SQL Database]], which is designed for structured, relational data with a predefined schema ('schema-on-write').
- While built upon it, ADLS Gen2 **enhances** [[Cloud - Azure Blob Storage|Azure Blob Storage]] by adding a hierarchical namespace optimized for big data analytics.
- It serves as a foundational storage layer for modern analytics platforms like [[Cloud - Microsoft Fabric|Microsoft Fabric]], which uses a unified data lake called OneLake, powered by ADLS Gen2.
- Data stored in the lake is often processed by compute services like [[Cloud - Azure Virtual Machines|Azure Virtual Machines]] running custom analytics scripts or managed services like [[Cloud - Azure Machine Learning|Azure Machine Learning]] for model training.
## Questions

- Your team wants to build a centralized analytics platform. How would you decide between using Azure Data Lake Storage as the core and a more traditional data warehouse like Azure Synapse Analytics, and how would you explain the long-term cost and flexibility trade-offs to the CFO?
- You've successfully implemented a data lake, but now it's growing at 10TB per month. How would you design an automated data lifecycle and governance system to prevent it from becoming a 'data swamp' while managing storage costs effectively across hot, cool, and archive tiers?
- What if storage costs became zero, but compute costs (CPU cycles for queries) increased by 1000%? How would this fundamentally change your data lake architecture and your approach to data ingestion and pre-processing?