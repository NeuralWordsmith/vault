---
tags: 
  - core
  - cloud
  - data_storage
  - sql
  - nosql
  - dbms
  - data_management
  - concept
source: 
  - "[[Understanding Cloud Computing]]"
related: 
  - "[[Data - Relational Databases (SQL)]]"
  - "[[Data - Non-Relational Databases (NoSQL)]]"
  - "[[Fundamental - SQL]]"
  - "[[Data - Database Normalization]]"
  - "[[Data - Database Indexing]]"
  - "[[CS - CAP Theorem]]"
  - "[[Data - ACID Transactions]]"
  - "[[Cloud - Storage Services]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[Data - Data Warehousing]]"
  - "[[Data - OLTP vs OLAP]]"
  - "[[Cloud - Scalability]]"
  - "[[Data - Key-Value Stores]]"
  - "[[Data - Document Stores]]"
  - "[[Fundamental - Software Engineering]]"
---
# Core: Databases
## Summary

>A database is a structured system designed to efficiently store data for easy retrieval, management, and analysis.

_Analogy:_ _A database is like a well-organized digital library. The books are the data records, the card catalog is the index for fast retrieval, the librarian is the Database Management System (DBMS) that manages access and organization, and the Dewey Decimal System is the schema that defines how everything is structured._

**Where it breaks down:** A physical library is mostly static and read-heavy, whereas modern databases handle millions of simultaneous read, write, and update operations per second with complex transactional guarantees.

```
      [Application]         [Application]         [Application]
           │                     │                     │
           └───────────┐         │         ┌───────────┘
                       ▼         ▼         ▼
                 +-----------------------------+
                 | Database Management System  |
                 |            (DBMS)           |
                 | (e.g., MySQL, PostgreSQL)   |
                 +-----------------------------+
                             │ (Manages Access & Queries)
                             ▼
                 +-----------------------------+
                 |       Physical Storage      |
                 |       (Data on Disk)        |
                 +-----------------------------+
```

## Details

At its heart, a database is an organized collection of data, electronically stored and accessed from a computer system. The primary purpose is to move beyond simple flat files (like spreadsheets) to provide a robust, efficient, and reliable way to handle large amounts of information, forming the backbone of most modern applications. This structured approach makes it possible to perform complex queries, manage concurrent user access, and ensure data integrity. The two main categories are **Relational (SQL)** and **Non-Relational (NoSQL)** databases.

#### Primary Goal

To provide a systematic and reliable method for storing, managing, and retrieving data efficiently, especially at scale.

#### Mechanism


- **How it Works:** A Database Management System (DBMS) acts as an interface between the user/application and the physical database, handling all interactions through a set of core operations:
    1. **Data Definition:** A Data Definition Language (DDL) is used to define the database's structure or 'schema'. This is like creating the blueprint for a house before building it.
    2. **Data Manipulation:** A Data Manipulation Language (DML), such as SQL, is used to perform CRUD operations: Create (add new data), Read (retrieve data), Update (modify existing data), and Delete (remove data).
    3. **Data Retrieval:** A query language allows users to ask complex questions of the data, filtering and combining information from various places.
    4. **Data Administration:** The DBMS handles security (who can access what), backups, performance optimization, and concurrency control to prevent conflicts when multiple users access data simultaneously.
- **Relational Databases (SQL):**
    - These databases, like MySQL or PostgreSQL, organize data into tables with rows and columns and enforce a predefined schema. They use Structured Query Language (SQL) and are known for their reliability and consistency (ACID compliance).
    - *Example: A university database with a 'Students' table and a 'Courses' table. An 'Enrollments' table links students to courses using Student IDs and Course IDs, ensuring data integrity.*
- **Non-Relational Databases (NoSQL):**
    - These databases, like MongoDB or Cassandra, provide more flexible data models, such as key-value pairs, documents, or graphs. They are often used for large-scale, unstructured data and are designed for high [[Cloud - Scalability|scalability]] and availability.
    - *Example: A social media platform storing user profiles as flexible JSON documents. Each document can have different fields; one user might have a 'website' field while another doesn't, without requiring changes to the entire database structure.*

##### Code Translation

```python
/* Simple SQL query to demonstrate data retrieval from a relational database. */

-- Select the names and email addresses of all users from the 'Users' table
-- who have signed up in the year 2023 and live in California.

SELECT 
    first_name, 
    last_name, 
    email
FROM 
    Users
WHERE 
    signup_year = 2023 AND state = 'CA'
ORDER BY
    last_name ASC;
```

 [[Code - Databases Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Schema Design:**
    - The blueprint of the database. In SQL, this is a rigid structure of tables and relationships. In NoSQL, it can be flexible or 'schema-on-read'. A well-designed schema is critical for performance and data integrity.
- **Indexing Strategy:**
    - Creating indexes on specific columns is like creating an index in the back of a book. It dramatically speeds up data retrieval (read operations) at the cost of slightly slower data insertion (write operations) and increased storage space.
- **Normalization vs. Denormalization:**
    - This is a design trade-off. Normalization reduces data redundancy and improves data integrity but can require complex queries with many joins. Denormalization intentionally adds redundant data to improve read performance by reducing the need for joins.

#### Core Tradeoffs

- **Structure vs. Flexibility:**
    - Relational (SQL) databases enforce a rigid, predefined schema, which ensures data consistency but makes changes difficult. Non-relational (NoSQL) databases offer high flexibility for evolving or unstructured data but shift the burden of data validation to the application layer.
- **Consistency vs. Availability (CAP Theorem):**
    - In distributed databases, you often have to choose between ensuring every client has the same, up-to-date view of the data (strong consistency) and ensuring the system is always available to respond to requests, even if some data is slightly stale (high availability).
- **Operational Overhead:**
    - Compared to storing data in simple files, databases introduce complexity and require resources for administration, security, backups, and performance tuning. This is a primary reason for the popularity of managed [[Cloud - Storage Services|cloud database services]].

## Connections

```
                     (Parent)
               Data Engineering
                       ▲
                       │
           ┌───────────┼───────────┐
           │           │           │
(Component Of) ┌───────────┴───────────┐ (Key Enabler Of)
Cloud Storage  │       Databases       │  Scalability
               └───────────┬───────────┘
                           │
                 ┌─────────┴─────────┐
                 │                   │
        Relational (SQL)    Non-Relational (NoSQL)
```

### Parent Concept

Databases are a fundamental component within the broader field of [[Fundamental - Data Engineering|data engineering]], which focuses on the practical applications of data collection and storage.

### Related Concepts 

- **Is a Core Part Of:** Databases are a foundational element of most [[Cloud - Storage Services|cloud storage offerings]], provided as managed services like Amazon RDS or Azure Cosmos DB.
- **Is a Prerequisite For:** The ability of a database to handle increasing load is a key aspect of achieving system-wide [[Cloud - Scalability|scalability]].
- **Impacts:** Ensuring a database remains operational through replication and backups is critical for overall system [[Cloud - Reliability|reliability]].
## Questions

- You're designing a new e-commerce platform. Would you choose a highly consistent SQL database or a highly available NoSQL database for the shopping cart service? Justify your decision to the CTO, focusing on the business impact of potentially losing a cart during checkout versus the site appearing slow or unavailable during peak sales events.
- How would you design a database sharding strategy for a social media application to handle a billion users, and what monitoring would you put in place to detect 'hot shards' (shards receiving a disproportionate amount of traffic)? What is your automated remediation plan when a hot shard is detected?
- What if storage and memory were infinitely fast and free, effectively eliminating I/O bottlenecks? Would the distinction between relational and non-relational databases still be relevant, or would a new, unified database paradigm emerge to replace them?