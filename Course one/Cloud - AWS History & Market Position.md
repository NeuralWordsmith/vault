---
tags: 
  - core
  - cloud
  - aws
  - cloud_provider
  - iaas
  - first_mover_advantage
  - market_leader
  - concept
source: 
  - "[[Understanding Cloud Computing]]"
related: 
  - "[[Cloud - AWS Simple Storage Service (S3)]]"
  - "[[Cloud - AWS Elastic Compute Cloud (EC2)]]"
  - "[[Cloud - AWS Relational Database Service (RDS)]]"
  - "[[Cloud - AWS Redshift]]"
  - "[[Cloud - AWS Kinesis]]"
  - "[[Cloud - AWS SageMaker]]"
  - "[[Example - NerdWallet AWS SageMaker Implementation]]"
  - "[[Fundamental - Cloud Computing]]"
  - "[[Cloud - Cloud Service Models]]"
  - "[[Cloud - Cloud Deployment Models]]"
  - "[[Cloud - Key Advantages]]"
  - "[[Cloud - Google Cloud Platform (GCP)]]"
  - "[[Cloud - Microsoft Azure]]"
  - "[[Fundamental - MLOps]]"
  - "[[Fundamental - Containerization]]"
---
# Core: Amazon Web Services (AWS)
## Summary

>Amazon Web Services (AWS) is the world's most comprehensive and broadly adopted cloud platform, which pioneered the public cloud market in 2006 and remains the market leader, offering a wide array of services like [[Cloud - AWS Elastic Compute Cloud (EC2)|compute power]] and [[Cloud - AWS Simple Storage Service (S3)|object storage]].

_Analogy:_ _AWS is like a massive, global utility company for computing. Instead of building your own power plant (data center), you just plug your appliances (applications) into their grid (the internet) and pay for the electricity (compute, storage, etc.) you consume. 

*   **Power Plants**: AWS's global network of data centers.
*   **Electrical Grid**: The internet, connecting you to AWS.
*   **Your Appliances**: Your applications, websites, and services.
*   **Your Meter**: The AWS billing and cost management system that tracks usage._

**Where it breaks down:** Unlike electricity, which is a simple commodity, cloud services are highly differentiated. Choosing an AWS service is more like choosing from a complex catalog of specialized industrial machinery, each with unique features, performance characteristics, and intricate pricing models.

```
                 ┌──────────────────┐
                 │      User        │
                 └──────────────────┘
                        │ (Internet)
                        ▼
┌───────────────────────────────────────────────────┐
│                  AWS Cloud                        │
│                                                   │
│   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐   │
│   │  EC2    │   │   S3    │   │   RDS   │   │ SageMaker │   │
│   │(Compute)│   │(Storage)│   │(Database) │   │  (ML)   │   │
│   └─────────┘   └─────────┘   └─────────┘   └─────────┘   │
│                                                   │
└───────────────────────────────────────────────────┘
```

## Details

Launched in 2006, two years before Google Cloud and four years before Microsoft Azure, Amazon Web Services (AWS) established a significant first-mover advantage in the cloud computing industry. This early start allowed them to build a mature, feature-rich platform that has solidified their position as the dominant market leader, capturing 31% of the total market share by the end of 2023. AWS provides a vast portfolio of on-demand IT resources and services over the internet with pay-as-you-go pricing.

#### Primary Goal

To enable businesses and individuals to access scalable, reliable, and low-cost computing infrastructure and services without the need to own and operate their own physical data centers.

#### Mechanism


- **How it Works:** AWS operates on a massive scale, managing a global network of secure data centers. Customers can access services through the AWS Management Console or APIs to provision and manage resources across various categories.
- **Core Service Categories:**
    - **Compute:** Provides virtual servers and serverless computing.
        - *Example: [[Cloud - AWS Elastic Compute Cloud (EC2)|EC2]] allows you to rent virtual machines (instances) of various sizes to run applications.*
    - **Storage:** Offers scalable and secure object, block, and file storage services.
        - *Example: [[Cloud - AWS Simple Storage Service (S3)|S3]] is used for storing and retrieving any amount of data, such as images, videos, and backups.*
    - **Databases:** Includes a wide range of managed relational and NoSQL databases.
        - *Example: [[Cloud - AWS Relational Database Service (RDS)|RDS]] simplifies the setup, operation, and scaling of a relational database, while [[Cloud - AWS Redshift|Redshift]] provides a petabyte-scale data warehouse.*
    - **Machine Learning:** Offers tools and services to build, train, and deploy machine learning models at scale.
        - *Example: [[Cloud - AWS SageMaker|SageMaker]] is a fully managed service that covers the entire ML workflow. A real-world application can be seen in the [[Example - NerdWallet AWS SageMaker Implementation|NerdWallet case study]], where they use it to streamline model development and deployment.*

##### Code Translation



 [[Code - Amazon Web Services (AWS) Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Region Selection:**
    - Choosing the geographical location of data centers. This impacts latency for end-users, cost, and compliance with data sovereignty laws.
- **Service Configuration:**
    - Each service has its own parameters, such as instance size for EC2 (e.g., t2.micro, m5.large), storage class for S3 (e.g., Standard, Glacier), or database engine for RDS (e.g., PostgreSQL, MySQL).

#### Core Tradeoffs

- **First-Mover Advantage vs. Complexity:**
    - AWS's long history has resulted in the most extensive portfolio of services, but this vastness can be overwhelming for new users, creating a steep learning curve compared to newer, more focused competitors.
- **Scalability vs. Cost Management:**
    - The pay-as-you-go model allows for incredible scalability, but it can also lead to unexpectedly high bills if resources are not monitored and managed carefully. Cost optimization is a critical, ongoing task.
- **Rich Ecosystem vs. Vendor Lock-in:**
    - Deeply integrating with AWS-specific services (like Lambda, DynamoDB, or SageMaker) can accelerate development but makes it more difficult and costly to migrate to another cloud provider or an on-premises environment in the future.

## Connections

```
                          (Parent)
                 Fundamental - Cloud Computing
                           ▲
                           │
           ┌───────────────┼────────────────────────────┐
           │               │                            │
(Competitor)      ┌───────────────────────────┐     (Competitor)
Microsoft Azure   │ Amazon Web Services (AWS) │   Google Cloud
                  └───────────────────────────┘
                             │
      ┌──────────────────────┴──────────────────────┐
      │                      │                      │
Cloud - AWS EC2     Cloud - AWS S3     Cloud - AWS SageMaker
   (Compute)            (Storage)                 (ML)
```

### Parent Concept

AWS is a specific commercial implementation of the broader concept of [[Fundamental - Cloud Computing|cloud computing]].

### Related Concepts 

- **Contrasts With:** As the first mover, AWS's market position is often compared to its primary competitors, Microsoft Azure and Google Cloud, which entered the market later.
- **Is an example of:** AWS provides all three primary [[Cloud - Cloud Service Models|cloud service models]]: Infrastructure as a Service (IaaS) with EC2, Platform as a Service (PaaS) with services like Elastic Beanstalk, and Software as a a Service (SaaS) with applications like Chime.
- **Is built upon:** The platform's success relies on the fundamental [[Cloud - Key Advantages|key advantages of cloud computing]], such as elasticity, cost savings, and global scale.
## Questions

- Given AWS's market leadership and extensive service catalog, how would you advise a startup to architect their initial product to leverage AWS's power without getting locked into proprietary services that could hinder a future multi-cloud strategy?
- You are tasked with designing a highly available system on AWS that can withstand a full regional outage. Considering AWS's 31% market share makes its regions a high-impact target, what specific services and architectural patterns would you use to ensure business continuity, and how would you manage the cost implications of this redundancy?
- What if a new technology emerged that made data transfer costs between cloud providers negligible? How would this disrupt AWS's 'first-mover' advantage and the current vendor lock-in dynamic, and what services would become most vulnerable?