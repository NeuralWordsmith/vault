---
tags:
  - core
  - cloud
  - iaas
  - paas
  - saas
  - cloud_native
  - infrastructure
  - concept
source:
  - "[[Understanding Cloud Computing]]"
related:
  - "[[Cloud - On-Premise Servers]]"
  - "[[Cloud - Cloud Hosting]]"
  - "[[Cloud - Pay-As-You-Go Pricing Model]]"
  - "[[Cloud - On-Premise vs Cloud Hosting]]"
  - "[[Cloud - Core Characteristics]]"
  - "[[Cloud - Common Use Cases]]"
  - "[[Cloud - Major Cloud Providers]]"
  - "[[Cloud - IaaS]]"
  - "[[Cloud - PaaS]]"
  - "[[Cloud - SaaS]]"
  - "[[Cloud - Public Cloud]]"
  - "[[Cloud - Private Cloud]]"
  - "[[Cloud - Hybrid Cloud]]"
  - "[[Fundamental - Computer Science]]"
  - "[[Fundamental - MLOps]]"
---
# Core: Cloud Computing
## Summary

>The on-demand delivery of technology services—such as computing power, storage, and networking—over the internet, which is a core component of [[Cloud - Cloud Hosting|cloud hosting]] and is defined by its [[Cloud - Pay-As-You-Go Pricing Model|pay-as-you-go pricing model]].

_Analogy:_ _Cloud computing is like using a city's public power grid instead of building your own power plant. You don't own the complex infrastructure; you just plug into an outlet (the internet) and pay a utility company (the cloud provider) for the electricity (computing resources) you consume._

**Where it breaks down:** Unlike electricity, which is a simple commodity, cloud services are highly configurable. You can choose the exact type and amount of 'power' (e.g., CPU cores, RAM, storage speed), which has no parallel in a standard power grid.

```
      User               Internet                Cloud Provider's Data Center
+-------------+      <------------>      +------------------------------------+
| Your Laptop |                          |                                    |
|  (Browser)  |---(API Request)------>   |  [Control Plane]                   |
+-------------+                          |       |                            |
                                         |       v                            |
                                         | +-----------+  +-----------+       |
                                         | | Compute   |  | Storage   |       |
                                         | | (VMs)     |  | (Disks)   |       |
                                         | +-----------+  +-----------+       |
                                         | +-----------+  +-----------+       |
                                         | | Databases |  | Networking|       |
                                         | |(SQL/NoSQL)|  | (VPC)     |       |
                                         | +-----------+  +-----------+       |
                                         |                                    |
                                         +------------------------------------+
```

## Details

At its heart, cloud computing represents a fundamental shift from owning and maintaining your own physical computing infrastructure to accessing those same services on demand from a third-party provider. Instead of buying, housing, and managing [[Cloud - On-Premise Servers|on-premise servers]], you rent resources over the internet, allowing for greater flexibility and scalability. The core services offered include **Infrastructure as a Service (IaaS)**, **Platform as a Service (PaaS)**, and **Software as a Service (SaaS)**.

#### Primary Goal

To provide scalable, on-demand access to computing resources over the internet, freeing users from the cost and complexity of managing their own physical hardware.

#### Mechanism


- **How it Works:**
    1. **Request:** A user requests a resource (e.g., a virtual server or storage space) through a web-based portal or an Application Programming Interface (API).
    2. **Provisioning:** The cloud provider's management software, often called the 'control plane', receives the request. It finds available physical hardware within its massive data centers and allocates the requested resources.
    3. **Access:** The resource is made available to the user over the internet, typically within minutes. The user can then manage and use it as if it were their own hardware.
    4. **Billing:** The provider tracks the user's consumption of resources and bills them accordingly, following a [[Cloud - Pay-As-You-Go Pricing Model|pay-as-you-go model]].
- **Core Service Types:**
    - **Computing Power:** Provides virtual machines (servers) that can run applications.
        - *Example: A company can instantly provision hundreds of servers to handle a sudden surge in website traffic, as seen in the [[Cloud - DataCamp Traffic Spike Example|DataCamp traffic spike example]], and then release them when traffic subsides, paying only for the time they were used.*
    - **Storage:** Offers scalable and durable data storage services.
        - *Example: A mobile app developer uses a cloud storage service to store user-uploaded photos and videos without having to predict and purchase physical hard drives in advance.*
    - **Databases:** Provides managed database services, handling maintenance tasks like patching, backups, and scaling.
        - *Example: A financial services company uses a managed cloud database to ensure high availability and data durability for its transaction records without needing a dedicated database administration team.*
    - **Networking:** Allows users to define and manage virtual networks, firewalls, and load balancers to securely connect their cloud resources.
        - *Example: An e-commerce platform uses a cloud load balancer to distribute incoming customer traffic evenly across its web servers, ensuring a smooth user experience during sales events.*

#### Core Trade-offs

- **Flexibility vs. Cost:**
    - The pay-as-you-go model offers incredible flexibility to scale resources up or down, but unpredictable workloads can lead to unexpectedly high costs if not managed carefully.
- **Control vs. Convenience:**
    - Users trade direct control over the physical hardware and low-level infrastructure for the convenience of managed services. This can be a limitation for applications with highly specific hardware requirements.
- **Security:**
    - Cloud providers offer robust security, but it operates on a 'shared responsibility model'. The provider secures the cloud itself, but the customer is responsible for securing their data and applications within the cloud.

## Connections

```
                     (Parent)
              Computer Science
                       ▲
                       │
      ┌────────────────┼────────────────┐
      │                │                │
(Contrasts With) ┌───────────────┐ (Prerequisite For)
On-Premise Servers │ Cloud Computing │ Cloud Hosting
                 └───────────────┘
                       │
           ┌───────────┴───────────┐
           │                       │
(Service Model)         (Deployment Model)
    IaaS / PaaS / SaaS      Public / Private / Hybrid
```

### Parent Concept

Cloud computing is a core discipline within modern [[Fundamental - Computer Science|computer science]] and IT infrastructure management.

### Related Concepts 

- It fundamentally **contrasts with** the traditional approach of [[Cloud - On-Premise Servers|on-premise servers]], where an organization owns and operates its own data centers.
- The financial model that enables the cloud's flexibility is the [[Cloud - Pay-As-You-Go Pricing Model|pay-as-you-go pricing model]], a defining characteristic.
- The practical application of this concept is seen in [[Cloud - Cloud Hosting|cloud hosting]], which is the act of using cloud infrastructure to host websites and applications.
- A direct comparison of these two approaches is detailed in [[Cloud - On-Premise vs Cloud Hosting|On-Premise vs Cloud Hosting]].
## Questions

- A startup can build its service on-premise for a high upfront cost but potentially lower long-term operational expenses, or use the cloud for a low upfront cost but variable, potentially higher long-term spend. How would you advise them to decide, and what non-financial factors like speed-to-market should weigh into the decision?
- You are designing a multi-region cloud architecture for a global e-commerce site. What are the key networking and database challenges you'd face in ensuring low latency for users worldwide and maintaining data consistency for inventory, and how would you monitor for regional outages?
- What if a new technology emerged that made small, powerful, and self-managing servers nearly free? How would this disrupt the centralized cloud computing model, and what new architectural patterns might emerge?