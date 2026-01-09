---
tags: 
  - core
  - cloud
  - data_warehouse
  - olap
  - mpp
  - columnar_storage
  - aws
  - concept
source: 
  - "[[Understanding Cloud Computing]]"
related: 
  - "[[Cloud - Amazon Web Services (AWS)]]"
  - "[[Data Engineering - Data Warehouse]]"
  - "[[Data Engineering - OLAP vs OLTP]]"
  - "[[Cloud - AWS Simple Storage Service (S3)]]"
  - "[[Cloud - AWS Kinesis]]"
  - "[[Cloud - AWS Glue]]"
  - "[[Data Engineering - ETL]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[Fundamental - Cloud Computing]]"
  - "[[Cloud - Google BigQuery]]"
  - "[[Cloud - Snowflake]]"
  - "[[Data Engineering - Columnar Databases]]"
  - "[[Cloud - AWS Relational Database Service (RDS)]]"
  - "[[Data Engineering - Data Lake]]"
---
# Core: AWS Redshift
## Summary

>Amazon Redshift is a fully managed, petabyte-scale data warehouse service within the [[Cloud - Amazon Web Services (AWS)|AWS ecosystem]], specifically designed for running complex, large-scale analytical queries.

_Analogy:_ _Think of AWS Redshift as a massive, self-organizing public library for corporate data. The library building (Redshift Cluster) stores vast quantities of books from many different publishers (data sources). A team of invisible, hyper-efficient librarians (AWS managed service) handles all the shelving, indexing, and maintenance. You, the researcher (analyst), can instantly ask complex questions that require cross-referencing thousands of books (run analytical queries) and get an answer in minutes, without ever needing to know how the library is organized or maintained._

**Where it breaks down:** A library is primarily for retrieving and reading individual books (records). Redshift is optimized for performing complex calculations and aggregations *across* millions of books simultaneously (e.g., 'calculate the average number of pages for all non-fiction books published in the last decade'), a task that would be impossibly slow in a traditional library.

```
      [Client/BI Tool]
             │
             │ SQL Query
             ▼
      ┌──────────────┐
      │  Leader Node │ (Coordinates & Aggregates)
      └──────┬───────┘
             │
   ┌─────────┼──────────┐
   │         │          │
   ▼         ▼          ▼
┌────────┐ ┌────────┐ ┌────────┐
│Compute │ │Compute │ │Compute │ (Executes in Parallel)
│ Node 1 │ │ Node 2 │ │ Node N │
└────────┘ └────────┘ └────────┘
```

## Details

Amazon Redshift is AWS's answer to the challenge of Online Analytical Processing (OLAP). It leverages a massively parallel processing (MPP) architecture and columnar storage to execute complex queries over enormous datasets far more efficiently than traditional transactional databases like [[Cloud - AWS Relational Database Service (RDS)|RDS]], which are built for Online Transaction Processing (OLTP).

#### Primary Goal

To enable businesses to perform fast, complex analytical queries on petabyte-scale datasets, allowing them to derive insights from massive amounts of historical data without managing the underlying data warehouse infrastructure.

#### Mechanism


- **How it Works: Massively Parallel Processing (MPP)**
    - Redshift achieves its speed by distributing both data and query workload across a cluster of machines (nodes).
    1. A client application sends a SQL query to a single **Leader Node**.
    2. The Leader Node parses the query, develops an optimal execution plan, and compiles it into C++ code.
    3. This compiled code is then distributed to multiple **Compute Nodes**.
    4. Each Compute Node executes its segment of the code in parallel on its local slice of the data.
    5. The intermediate results are sent back to the Leader Node, which aggregates them and returns the final result to the client.
- **Core Component: Columnar Storage**
    - Unlike traditional row-based databases (like [[Cloud - AWS Relational Database Service (RDS)|RDS]]), Redshift stores data in columns. This is a critical optimization for analytical queries.
    - Example: An analytics query might be `SELECT SUM(sales) FROM transactions WHERE region = 'North'`. A columnar database only needs to read the `sales` and `region` columns, ignoring all others (like `transaction_id`, `customer_name`, etc.), which dramatically reduces the amount of data read from disk (I/O).
- **Core Component: Data Compression**
    - Because data in a single column is of the same type (e.g., all integers or all strings), it can be compressed much more effectively than row-based data. This further reduces storage costs and improves query performance by minimizing I/O.

##### Code Translation



 [[Code - AWS Redshift Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Node Type**
    - Determines the hardware characteristics of the nodes in the cluster. Choices include Dense Compute (DC) for performance-intensive workloads with less data, or Dense Storage (DS) for very large data volumes.
- **Cluster Size (Number of Nodes)**
    - Directly impacts performance and cost. More nodes provide more CPU, RAM, and storage, allowing for greater parallelism and faster query execution, but at a higher price.
- **Distribution Style (DISTSTYLE)**
    - Controls how table data is physically distributed across the compute nodes. Choosing the right distribution key (`DISTKEY`) to co-locate joining tables is one of the most critical performance tuning parameters.

#### Core Tradeoffs

- **Performance vs. Cost**
    - Redshift offers incredible performance for analytics but can be expensive. Costs are driven by the number and type of nodes running 24/7. It requires careful monitoring and right-sizing to be cost-effective.
- **Analytical Power vs. Transactional Inefficiency**
    - It is purpose-built for complex, read-heavy OLAP workloads. It is not suitable for OLTP workloads that involve frequent, small, indexed writes and reads (e.g., a web application backend), where a service like [[Cloud - AWS Relational Database Service (RDS)|RDS]] would be a better fit.
- **Managed Service vs. Control**
    - Being 'fully managed' abstracts away immense operational complexity like patching, backups, and provisioning. The tradeoff is less granular control over the underlying hardware and software configuration compared to building a data warehouse manually on [[Cloud - AWS Elastic Compute Cloud (EC2)|EC2 instances]].

## Connections

```
                  (Parent)
           Data Warehousing
                   ▲
                   │
┌──────────────────┼──────────────────┐
│                  │                  │
(Sources From) ┌───────────┐ (Contrasts With)
AWS S3         │AWS Redshift│         AWS RDS
               └───────────┘
                   │
                   │ (Ingests From)
                   ▼
              AWS Kinesis
```

### Parent Concept

Redshift is a specific, cloud-based implementation of a [[Data Engineering - Data Warehouse|data warehouse]], a system used for reporting and data analysis.

### Related Concepts 

- **Contrasts With:** [[Cloud - AWS Relational Database Service (RDS)|AWS RDS]], which is an OLTP database service optimized for high-throughput transactional workloads, not large-scale analytical queries.
- **Often Sources Data From:** [[Cloud - AWS Simple Storage Service (S3)|AWS S3]], which typically acts as a data lake where raw data is staged before being cleaned and loaded into Redshift for structured analysis.
- **Can Ingest Streaming Data From:** [[Cloud - AWS Kinesis|AWS Kinesis]], enabling near real-time analytics by feeding continuous data streams directly into Redshift tables.
## Questions

- Your company's BI queries on Redshift are slowing down, and costs are rising. You could provision more nodes for better performance, but it would significantly increase the budget. How would you analyze the query patterns to identify optimization opportunities (e.g., distribution keys, sort keys) and justify to leadership that architectural tuning is a better first step than simply spending more money?
- You're designing a data pipeline that loads terabytes of new data daily from S3 into Redshift. What is the role of the `COPY` command, and how would you design the process to be idempotent and recoverable to handle network failures or transient errors during the load without creating duplicate data?
- What if AWS announced that Redshift would no longer support columnar storage and would revert to a traditional row-based architecture? What specific types of analytical queries would suffer the most catastrophic performance degradation, and what alternative AWS service would you immediately propose as a replacement?