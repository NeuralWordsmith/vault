---
tags: 
  - core
  - cloud
  - managed_database
  - oltp
  - relational_database
  - sql
  - aws
  - concept
source: 
  - "[[Understanding Cloud Computing]]"
related: 
  - "[[Cloud - Amazon Web Services (AWS)]]"
  - "[[Cloud - AWS Simple Storage Service (S3)]]"
  - "[[Cloud - AWS Elastic Compute Cloud (EC2)]]"
  - "[[Cloud - AWS Redshift]]"
  - "[[Cloud - AWS Kinesis]]"
  - "[[Cloud - AWS SageMaker]]"
  - "[[Fundamental - Cloud Computing]]"
  - "[[Fundamental - SQL]]"
  - "[[Data Engineering - OLTP vs OLAP]]"
  - "[[Data Engineering - Relational Databases]]"
  - "[[Data Engineering - Database Normalization]]"
  - "[[Cloud - AWS Aurora]]"
  - "[[Cloud - AWS Database Migration Service (DMS)]]"
  - "[[MLOps - Data Stores for ML]]"
  - "[[Cloud - Core Service Offerings]]"
---
# Core: AWS Relational Database Service (RDS)
## Summary

>AWS Relational Database Service (RDS) is a managed cloud service that simplifies the setup, operation, and scaling of relational databases for professional applications.

_Analogy:_ _Using AWS RDS is like leasing a fully-serviced commercial kitchen for your restaurant. You, the chef (developer), focus on creating recipes and cooking (writing application code). The building management (AWS) handles all the infrastructure: they ensure the plumbing, electricity, and gas lines work (provisioning servers), maintain the ovens and refrigerators (patching and updates), and can quickly add more cooking stations if you get busy (scaling). You don't have to worry about being a plumber or electrician; you just cook._

**Where it breaks down:** Unlike a simple lease, you pay for exactly what you use (CPU, storage, data transfer), and you have less control over the specific brand of oven or the building's wiring than if you built the kitchen yourself from scratch.

```
+-------------+      API Calls      +-----------------+      Manages      +-------------------+ 
| Your App    | ------------------> |   AWS RDS API   | --------------> |  Database Instance|
| (e.g., on EC2)|      (e.g.,        |   (Control Plane) |                 |  (e.g., PostgreSQL)|
+-------------+   "Create DB")      +-----------------+                 +-------------------+
                                                                              |
                                                                              V
                                                                      [Automated Backups,
                                                                       Patching, Scaling]
```

## Details

As a core offering within the [[Cloud - Amazon Web Services (AWS)|AWS ecosystem]], RDS is designed to automate the time-consuming administrative tasks involved in managing a relational database. This allows teams to focus on application development rather than on database maintenance like provisioning, patching, backups, and recovery. It provides a structured, relational data store, which contrasts with the unstructured object storage offered by [[Cloud - AWS Simple Storage Service (S3)|S3]].

#### Primary Goal

To offload the undifferentiated heavy lifting of database administration, freeing up developers and engineers to focus on tasks that create direct business value.

#### Mechanism


- **How it Works: The Managed Service Model**
    - Instead of manually installing and configuring a database on a virtual server like [[Cloud - AWS Elastic Compute Cloud (EC2)|EC2]], a user interacts with the RDS API or AWS Console to define their database requirements. AWS then automatically handles the following:
        1. **Provisioning:** Allocates the necessary compute and storage resources.
        2. **Installation & Configuration:** Installs the chosen database engine (e.g., PostgreSQL, MySQL) with sensible defaults.
        3. **Ongoing Management:** Automates critical tasks like applying software patches, performing backups, and enabling high-availability configurations.
- **Supported Database Engines**
    - RDS is not a database itself, but a service that manages popular database engines. Users can choose the engine that best fits their application's needs.
        - *Examples: Amazon Aurora, PostgreSQL, MySQL, MariaDB, Oracle Database, and SQL Server.*
- **Key Features for Scalability and Reliability**
    - **Multi-AZ Deployments:** RDS can automatically create and maintain a synchronous standby replica in a different Availability Zone (AZ). If the primary database fails, RDS automatically fails over to the standby, ensuring high availability.
    - **Read Replicas:** Users can create one or more read-only copies of their database to serve high-volume read traffic. This offloads work from the primary database, improving application performance.
    - **Automated Backups:** RDS performs daily automated backups and allows for point-in-time recovery, enabling users to restore their database to any second during the retention period.
    - *Example: In a scenario like the [[Example - NerdWallet AWS SageMaker Implementation|NerdWallet case study]], the primary application's user data would likely be stored in a highly-available RDS instance. This transactional data could then be replicated or extracted to an analytics platform like [[Cloud - AWS Redshift|Redshift]], where [[Cloud - AWS SageMaker|SageMaker]] models are trained on it without impacting the performance of the live application.*

##### Code Translation

```python
nothing to fill here
```

 [[Code - AWS Relational Database Service (RDS) Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Instance Class**
    - Determines the CPU, memory, and network capacity of the database server. Choosing the right class is critical for performance and cost management.
- **Storage Type**
    - Users can choose between General Purpose (SSD) for a balance of price and performance, or Provisioned IOPS (SSD) for high-performance, I/O-intensive workloads.
- **Multi-AZ Deployment**
    - A boolean parameter (enabled/disabled) that dictates whether RDS maintains a synchronous standby replica for high availability and automatic failover.

#### Core Tradeoffs

- **Ease of Use vs. Control**
    - RDS abstracts away the underlying operating system and infrastructure, making it incredibly easy to manage. The tradeoff is a loss of fine-grained control; you cannot SSH into the instance or install custom software, which is possible when self-managing a database on [[Cloud - AWS Elastic Compute Cloud (EC2)|EC2]].
- **Cost vs. Operational Overhead**
    - The hourly cost of an RDS instance is typically higher than the raw cost of an equivalent EC2 instance. However, this price includes the significant operational savings from not needing a dedicated database administrator for routine tasks like patching, backups, and failover management.

## Connections

```
                           (Parent)
                  Amazon Web Services (AWS)
                             ▲
                             │
┌────────────────────────────┼────────────────────────────┐
│                            │                            │
(Data Warehouse)      ┌───────────────────────────┐      (Object Storage)
   Redshift           │ AWS Relational Database   │          S3
                      │        Service (RDS)      │
                      └───────────────────────────┘
                             │
                  ┌──────────┴──────────┐
                  │                     │
          RDS for PostgreSQL     RDS for MySQL
```

### Parent Concept

RDS is a foundational managed database service within the broader [[Cloud - Amazon Web Services (AWS)|Amazon Web Services]] platform.

### Related Concepts 

- **Contrasts With:** [[Cloud - AWS Simple Storage Service (S3)|S3]], which is an object storage service for unstructured data like images and logs, whereas RDS is designed for structured, transactional data that fits into tables.
- **Contrasts With:** [[Cloud - AWS Redshift|Redshift]], which is a petabyte-scale data warehouse (OLAP) optimized for complex analytical queries, while RDS is a transactional database (OLTP) optimized for fast read/write operations.
- **Is Built Upon:** The underlying infrastructure for RDS runs on compute resources similar to [[Cloud - AWS Elastic Compute Cloud (EC2)|EC2 instances]], but AWS abstracts this layer away from the user for a simplified management experience.
- **Integrates With:** Data from RDS is often streamed using services like [[Cloud - AWS Kinesis|Kinesis]] into analytics platforms or used as a primary data source for machine learning models in [[Cloud - AWS SageMaker|SageMaker]].
## Questions

- Your startup's application is growing rapidly. When would you choose the higher cost of RDS Provisioned IOPS storage over General Purpose SSDs, and how would you justify this increased expenditure to a non-technical CEO in terms of user experience and business risk?
- You're designing a global application with users in different continents. How would you architect your RDS deployment to minimize read latency for all users, and what are the potential data consistency challenges with your proposed solution?
- What if AWS suddenly deprecated RDS? Describe the step-by-step migration plan you would create to move a production PostgreSQL database from RDS to a self-managed cluster on EC2 with minimal downtime.