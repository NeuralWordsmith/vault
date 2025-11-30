---
tags: 
  - core
  - cloud
  - public_cloud
  - iaas
  - multi-tenancy
  - cloud_scalability
  - pay-as-you-go
  - concept
source: 
  - "[[Understanding Cloud Computing]]"
related: 
  - "[[Cloud - Cloud Deployment Models]]"
  - "[[Cloud - Private Cloud]]"
  - "[[Cloud - Hybrid Cloud]]"
  - "[[Cloud - Multicloud]]"
  - "[[Cloud - Community Cloud]]"
  - "[[Cloud - Cloud Bursting]]"
  - "[[Cloud - Private Cloud vs On-Premise Infrastructure]]"
  - "[[Cloud - Hybrid Cloud vs Multicloud]]"
  - "[[Fundamental - Cloud Computing]]"
  - "[[Cloud - Infrastructure as a Service (IaaS)]]"
  - "[[Cloud - Platform as a Service (PaaS)]]"
  - "[[Cloud - Software as a Service (SaaS)]]"
  - "[[Cloud - Scalability]]"
  - "[[Cloud - Elasticity]]"
  - "[[Cloud - Vendor Lock-in]]"
---
# Core: Public Cloud
## Summary

>A public cloud is a type of [[Cloud - Cloud Deployment Models|cloud deployment model]] where computing infrastructure is owned and managed by a third-party provider and shared among multiple organizations over the public internet.

_Analogy:_ _Using a public cloud is like renting an apartment in a large complex. The building owner (the cloud provider, e.g., AWS) owns and maintains the entire infrastructure (plumbing, electricity, security), and you (the organization) simply rent a specific apartment (virtual machine, storage) and pay a monthly fee based on its size and the utilities you use, without worrying about building maintenance._

**Where it breaks down:** You cannot make fundamental changes to the building's structure, like rewiring the entire electrical system, which is analogous to not having direct access to the physical data center hardware in a public cloud.

```
  User A  ───────┐                               ┌───────── User C
                 │                               │
                 ▼                               ▼
           [ Internet ] ◀─────────────────────────────── User B
                 │
                 │
                 ▼
      ┌──────────────────────────┐
      │   Cloud Provider (e.g., AWS)   │
      │ ┌────────┬────────┬────────┐ │
      │ │ Server │ Server │ Server │ │  <-- Shared Physical Hardware
      │ └────────┴────────┴────────┘ │
      │                              │
      │  [ User A's VM ]             │  <-- Logically Isolated
      │  [ User B's Storage ]        │      Virtual Resources
      │  [ User C's Database ]       │
      └──────────────────────────┘
```

## Details

The public cloud operates on a multi-tenant model where a cloud service provider, like AWS or Azure, owns and manages the physical servers, storage, and networking, making these resources available to the general public over the internet. This approach allows organizations to access powerful computing capabilities with minimal upfront investment, as they are not responsible for purchasing or maintaining the underlying hardware. It is one of the three primary [[Cloud - Cloud Deployment Models|cloud deployment models]], alongside private and hybrid clouds.

#### Primary Goal

To provide on-demand, scalable computing resources as a utility, allowing organizations to pay only for what they use and avoid the capital expenditure and operational complexity of managing their own data centers.

#### Mechanism


- **How it Works:**
    1. **Provider Ownership:** A cloud service provider (CSP) like AWS, Google Cloud, or Microsoft Azure builds and maintains massive data centers globally.
    2. **Resource Pooling & Virtualization:** The CSP uses virtualization technology to pool the physical hardware (CPU, memory, storage) and partition it into virtual resources that can be allocated to many different customers (tenants).
    3. **On-Demand Access:** Customers access these resources via the internet through a web-based console or APIs, allowing them to provision servers, databases, and other services in minutes.
    4. **Metered Billing:** Usage is tracked and billed on a pay-as-you-go basis, similar to a utility like electricity. This eliminates the need for large upfront hardware purchases.
- **Key Characteristics:**
    - **Shared Infrastructure:**
        - Resources are shared by multiple organizations, a concept known as multi-tenancy. The provider ensures logical isolation between tenants.
    - **Elastic Scalability:**
        - Organizations can instantly scale their resource capacity up or down to meet demand, paying only for the capacity they use at any given time.
    - **Low Initial Investment:**
        - Eliminates the need for capital expenditure (CapEx) on hardware and data centers, shifting costs to an operational expenditure (OpEx) model.

##### Code Translation



 [[Code - Public Cloud Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Service Model Selection:**
    - **IaaS (Infrastructure as a Service):** Provides raw computing resources like virtual machines and storage. Offers the most control.
    - **PaaS (Platform as a Service):** Provides a platform for developing and deploying applications without managing the underlying infrastructure.
    - **SaaS (Software as a Service):** Provides ready-to-use software applications over the internet (e.g., Gmail, Salesforce).
- **Resource Configuration:**
    - **Instance Size:** Choosing the amount of CPU and RAM for a virtual server.
    - **Storage Type:** Selecting between different storage options (e.g., high-speed SSD vs. low-cost archival storage).
    - **Geographic Region:** Deploying resources in specific data centers around the world to reduce latency or meet data residency requirements.

#### Core Tradeoffs

- **Advantages:**
    - **Cost-Effectiveness:** No upfront capital expenditure on hardware; benefits from economies of scale.
    - **Scalability & Elasticity:** Resources can be scaled up or down almost instantly to match demand.
    - **Speed & Agility:** Teams can provision resources in minutes, accelerating development and deployment cycles.
    - **Reduced Operational Burden:** The cloud provider handles hardware maintenance, security, and updates.
- **Disadvantages:**
    - **Limited Control:** Organizations do not have direct access to or control over the physical hardware or data center operations.
    - **Security & Compliance:** The shared nature of the infrastructure can create security and data privacy concerns for organizations with strict regulatory requirements.
    - **Vendor Lock-in:** Migrating applications and data from one public cloud provider to another can be complex and costly.
    - **Potential for Unpredictable Costs:** While pay-as-you-go is flexible, poor resource management can lead to unexpectedly high operational costs.

## Connections

```
                     (Parent)
            Cloud Deployment Models
                        ▲
                        │
        ┌───────────────┼───────────────┐
        │               │               │
(Contrasts With) ┌──────────────┐ (Combines With)
 Private Cloud   │ Public Cloud │   Hybrid Cloud
                 └──────────────┘
```

### Parent Concept

Public cloud is a primary type of [[Cloud - Cloud Deployment Models|cloud deployment model]], which defines how cloud services are provisioned and who has access to them.

### Related Concepts 

- **Contrasts with** the [[Cloud - Private Cloud|private cloud]] model, where infrastructure is exclusively dedicated to a single organization, offering greater control but higher costs.
- **Combines with** private infrastructure to form a [[Cloud - Hybrid Cloud|hybrid cloud]], allowing organizations to leverage the benefits of both models.
- **Is a core component of** a [[Cloud - Multicloud|multicloud]] strategy, where an organization utilizes services from two or more different public cloud providers to avoid vendor lock-in or optimize for specific services.
## Questions

- For a fast-growing e-commerce startup, at what point does the operational expense of a pure public cloud model justify the capital investment and complexity of moving to a [[Cloud - Hybrid Cloud|hybrid model]] to optimize costs for baseline workloads?
- How would you design a centralized governance and security framework for a large enterprise using multiple public cloud services to ensure consistent policy enforcement and prevent configuration drift across different teams and accounts?
- What if network sovereignty becomes a global standard, forcing public cloud providers to guarantee that all data and processing for a nation's citizens remain strictly within its borders? How would this fundamentally change cloud architecture and the concept of a 'global' cloud?