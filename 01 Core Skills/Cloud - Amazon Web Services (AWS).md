---
tags: 
  - major_core
  - cloud
  - aws
  - cloud_computing
  - iaas
  - paas
  - cloud_services
  - concept
source: 
  - "[[Understanding Cloud Computing]]"
related: 
  - "[[Fundamental - Cloud Computing]]"
  - "[[Cloud - Service Models]]"
  - "[[Cloud - Deployment Models]]"
  - "[[Cloud - AWS History & Market Position]]"
  - "[[Cloud - AWS Elastic Compute Cloud (EC2)]]"
  - "[[Cloud - AWS Simple Storage Service (S3)]]"
  - "[[Cloud - AWS Relational Database Service (RDS)]]"
  - "[[Cloud - AWS Redshift]]"
  - "[[Cloud - AWS Kinesis]]"
  - "[[Cloud - AWS SageMaker]]"
  - "[[Example - NerdWallet AWS SageMaker Implementation]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[Fundamental - MLOps]]"
  - "[[Cloud - Key Advantages]]"
  - "[[Cloud - Impact on Data Roles]]"
---
# Major Core: Amazon Web Services (AWS)

## Summary

> Amazon Web Services (AWS) is a comprehensive and broadly adopted cloud computing platform, launched in 2006, that offers over 175 fully featured services from data centers globally.

_Analogy:_ _Think of AWS as a massive, global utility company for digital services. Just as a power company provides electricity on demand, AWS provides fundamental resources like computing power and storage. You simply plug in, use what you need, and pay a monthly bill based on your consumption. If you need more advanced services, like a specialized industrial power grid or a home energy audit, the utility company offers those too, just as AWS provides specialized services like machine learning platforms and data warehouses._

**Where it breaks down:** Unlike a simple utility, using AWS involves a shared responsibility for security, requires significant technical expertise to configure services correctly, and can lead to 'vendor lock-in,' making it much more complex to switch providers than changing your electricity supplier.

```
      [ User ]
         |
         v
  [ AWS API/Console ]
         |
+----------------------------------------------------+
|                   AWS Global Cloud                 |
|                                                    |
|  +----------+  +----------+  +-----------+  +----------+  |
|  | Compute  |  | Storage  |  | Analytics |  |   ML     |  |
|  |  (EC2)   |  | (S3,RDS) |  | (Redshift)|  | (SageMaker)|  |
|  +----------+  +----------+  +-----------+  +----------+  |
|                                                    |
+----------------------------------------------------+
```

## Details

Launched in 2006, Amazon Web Services (AWS) is a dominant force in the cloud computing industry. Its status as the first major mover in the market provided a significant advantage, allowing it to develop an unparalleled portfolio of over 175 services that attract high-profile clients like Disney, Verizon, and Deloitte. This vast ecosystem is built around several core service categories, including **Computing**, **Storage**, **Analytics**, and **Machine Learning**.

#### Primary Goal

To provide scalable, reliable, and low-cost infrastructure services to businesses on-demand, allowing them to innovate faster by offloading the management of physical hardware and data centers.

#### Mechanism

- **How it Works:**
    1. **Provisioning:** A user selects and configures resources (like virtual servers or databases) through a web-based console, command-line interface (CLI), or programmatically using an Application Programming Interface (API).
    2. **Virtualization & Management:** AWS manages the underlying physical hardware, networking, and data center facilities. It uses virtualization technology to abstract these physical resources into the on-demand services that customers consume.
    3. **Billing:** Usage is metered, and customers are billed for the resources they consume, typically on a pay-as-you-go, hourly, or monthly basis, which aligns costs directly with usage.
- **Core Service Categories:**
    - **Computing:** Provides the processing power for applications.
        - *Example: [[Cloud - AWS Elastic Compute Cloud (EC2)|EC2]] offers resizable virtual servers, known as instances, for running virtually any software.*
    - **Storage:** Offers services to store, access, and manage data.
        - *Examples:*
        -   - *[[Cloud - AWS Simple Storage Service (S3)|S3]] is used for scalable object storage, ideal for backups, data lakes, and hosting static websites.*
        -   - *[[Cloud - AWS Relational Database Service (RDS)|RDS]] simplifies the management of relational databases like PostgreSQL or MySQL.*
    - **Analytics:** A suite of services for processing and analyzing large datasets.
        - *Examples:*
        -   - *[[Cloud - AWS Redshift|Redshift]] provides a petabyte-scale data warehouse for business intelligence.*
        -   - *[[Cloud - AWS Kinesis|Kinesis]] is used for real-time processing of streaming data.*
    - **Machine Learning:** Offers tools to build, train, and deploy machine learning models at scale.
        - *Example: [[Cloud - AWS SageMaker|SageMaker]] is a fully managed platform that covers the entire ML workflow. A real-world application can be seen in the [[Example - NerdWallet AWS SageMaker Implementation|NerdWallet case study]], where they use it to streamline model development and deployment.*

```python
nothing to fill here
```

 [[Code - Amazon Web Services (AWS) Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Region Selection:**
    - Choosing the geographical region where services are hosted. This impacts latency for end-users, cost, and compliance with data sovereignty laws.
- **Service Tier & Sizing:**
    - Most services offer different performance and cost tiers (e.g., S3 Standard vs. S3 Glacier for storage). Compute services like EC2 require selecting an instance size (CPU, RAM) that matches the workload.
- **Security & IAM Configuration:**
    - Configuring Identity and Access Management (IAM) roles and policies to control who can access which resources and what actions they can perform. This is a critical lever for security.

#### Core Tradeoffs

- **Breadth vs. Complexity:**
    - The vast number of services provides immense flexibility but also introduces significant complexity. Engineers must become specialists, and managing costs across dozens of services can be challenging.
- **Scalability vs. Cost Control:**
    - While AWS makes it easy to scale resources up to meet demand, this same ease can lead to runaway costs if not carefully monitored with budgets and alerts. An unoptimized query or autoscaling misconfiguration can become very expensive.
- **Managed Services vs. Vendor Lock-in:**
    - Using high-level managed services like RDS or SageMaker accelerates development, but it also increases dependency on the AWS ecosystem, making it more difficult and costly to migrate to another cloud provider or on-premises solution in the future.

## Connections

```
                 (Parent)
        Fundamental - Cloud Computing
                   ▲
                   |
┌──────────────────┼──────────────────┐
│                  │                  │
(Explores) ┌───────────────────────────┐ (Is an example of)
AWS History│  Amazon Web Services (AWS)  │ Cloud Service Models
           └───────────────────────────┘
                   │
        ┌──────────┴──────────┬───────────┐
        │                     │           │
Cloud - AWS EC2     Cloud - AWS S3    Cloud - AWS SageMaker
```

### Parent Concept

The parent concept is [[Fundamental - Cloud Computing|cloud computing]], which is the on-demand delivery of IT resources over the Internet with pay-as-you-go pricing.

### Child Concepts

- A core compute service is [[Cloud - AWS Elastic Compute Cloud (EC2)|EC2]], which provides secure and resizable virtual servers in the cloud.
- For storage, [[Cloud - AWS Simple Storage Service (S3)|S3]] offers a highly scalable and durable object storage service for data backup, archiving, and analytics.
- In the database category, [[Cloud - AWS Relational Database Service (RDS)|RDS]] makes it easy to set up, operate, and scale a relational database.
- For machine learning, [[Cloud - AWS SageMaker|SageMaker]] provides a fully managed service to build, train, and deploy ML models efficiently.

### Related Concepts 

- **Explores:** The [[Cloud - AWS History & Market Position|history and market position of AWS]] details how its 2006 launch as the first major provider created a significant and lasting first-mover advantage.
- **Is an example of:** AWS provides services that fit into all major [[Cloud - Service Models|cloud service models]], including Infrastructure as a Service (EC2), Platform as a Service (RDS), and Software as a Service (elements of SageMaker).
- **Contrasts with:** While AWS is a specific vendor's implementation, the concept of [[Cloud - Core Service Offerings|core service offerings]] describes the generic categories of services, like compute and storage, that are provided by all major cloud platforms.
## Questions

- A startup is deciding between building their infrastructure on AWS vs. a smaller, cheaper cloud provider. How would you argue for AWS, focusing on the long-term business value of its extensive service ecosystem, even if initial compute costs are higher?
- Imagine your company's AWS bill unexpectedly triples in one month. What is your systematic approach to diagnose the root cause, which specific AWS tools (e.g., Cost Explorer, CloudTrail, Trusted Advisor) would you use, and what preventative measures would you implement to avoid this in the future?
- What if a major geopolitical event caused AWS to partition its global network, isolating the US-East-1 region from all others? What would be the immediate and cascading failures in global applications, and how could a multi-cloud or multi-region architectural strategy have mitigated this disaster?
