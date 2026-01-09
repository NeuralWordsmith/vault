---
tags: 
  - major_core
  - cloud
  - iaas
  - paas
  - saas
  - distributed_systems
  - utility_computing
  - concept
source: 
  - "[[Understanding Cloud Computing]]"
related: 
  - "[[Fundamental - Cloud Computing]]"
  - "[[Cloud - Core Service Offerings]]"
  - "[[Cloud - Virtualization]]"
  - "[[Cloud - Cost Efficiency]]"
  - "[[Cloud - Scalability]]"
  - "[[Cloud - Pay-as-You-Go Pricing]]"
  - "[[Cloud - Reliability]]"
  - "[[Cloud - Security]]"
  - "[[Cloud - Speed and Performance]]"
  - "[[Cloud - Compute Services]]"
  - "[[Cloud - Storage Services]]"
  - "[[Cloud - Database Services]]"
  - "[[Cloud - Vertical vs Horizontal Scaling]]"
  - "[[Fundamental - Containerization]]"
  - "[[Fundamental - MLOps]]"
---
# Major Core: Cloud Computing

## Summary

> Cloud computing is the on-demand delivery of IT resources—from applications to data centers—over the internet, typically with [[Cloud - Pay-as-You-Go Pricing|pay-as-you-go pricing]].

_Analogy:_ _Cloud computing is like the public electricity grid. Instead of building and maintaining your own expensive power plant (on-premise servers), you simply plug into a shared grid (the cloud provider) and pay a monthly bill only for the electricity you consume. **Mapping:** Your application is the appliance you plug in, the cloud provider (AWS, Azure, GCP) is the power company, and the ability to turn on more lights or power more devices on demand is [[Cloud - Scalability|scalability]]._

**Where it breaks down:** Unlike electricity, which is a uniform commodity, cloud services are highly differentiated. Choosing a provider often involves locking into their specific tools and APIs, making it much more difficult to 'unplug' and switch to a different provider than it is to change electricity companies.

```
      [Your Laptop]  
           |         
      (Internet)     
           |         
  +------------------+ 
  |  Cloud Provider  | 
  | (AWS, Azure, GCP)| 
  +--------+---------+ 
           |         
  +--------+---------+-----------------+ 
  |        |         |                 | 
[Compute] [Storage] [Database] [Other Services]
```

## Details

Cloud computing is a game-changer because it fundamentally shifts the paradigm of how businesses access and manage technology. Instead of owning and operating their own physical servers and data centers, organizations can access a vast array of technology services, such as [[Cloud - Compute Services|computing power]], [[Cloud - Storage Services|storage]], and [[Cloud - Database Services|databases]], on an as-needed basis from a cloud provider. This model, enabled by the core technology of [[Cloud - Virtualization|virtualization]], offers serious advantages in several key areas: **Cost, Speed, Scale, Reliability, and Security**.

#### Primary Goal

To provide on-demand access to a shared pool of configurable computing resources that can be rapidly provisioned and released with minimal management effort, abstracting away the complexity of physical hardware.

#### Mechanism

- **How it Works:**
    1. **Infrastructure:** A cloud provider (like Amazon Web Services, Microsoft Azure, or Google Cloud) owns and maintains a massive global network of secure data centers filled with physical hardware.
    2. **Abstraction:** Using [[Cloud - Virtualization|virtualization]], the provider abstracts these physical resources (servers, disks, networks) into a vast pool of virtual resources.
    3. **Access:** Customers access these virtual resources on-demand via the internet using web consoles or APIs, allowing them to build and run applications without managing the underlying hardware.
    4. **Metering:** Usage is metered, and customers are billed based on their consumption, following a [[Cloud - Pay-as-You-Go Pricing|pay-as-you-go model]].
- **Key Advantage: Cost Efficiency**
    - It converts large capital expenditures (CapEx) for hardware into smaller, variable operational expenditures (OpEx), eliminating the need for upfront investment and the costs of managing a physical data center. This is the core idea behind [[Cloud - Cost Efficiency|cost efficiency]].
        - *Example: A startup can launch a global application without buying a single server, instead paying a small monthly fee that grows only as their user base grows.*
- **Key Advantage: Scalability and Elasticity**
    - The cloud provides near-instant [[Cloud - Scalability|scalability]], allowing businesses to increase or decrease their resource usage in response to demand. This can be done through [[Cloud - Vertical vs Horizontal Scaling|vertical scaling]] (increasing the power of a single server) or, more commonly, horizontal scaling (adding more servers).
        - *Example: An e-commerce site can automatically provision hundreds of additional servers to handle Black Friday traffic and then de-provision them afterward to save money.*
- **Key Advantage: Speed and Performance**
    - New resources are just a click away, meaning developers can provision infrastructure in minutes instead of the weeks or months it takes to procure physical hardware. This dramatically improves agility and [[Cloud - Speed and Performance|speed]].
        - *Example: A gaming company can deploy its new online game in multiple geographic regions simultaneously to provide low-latency experiences for players worldwide.*
- **Key Advantage: Reliability and Security**
    - Major cloud providers offer extensive [[Cloud - Reliability|reliability]] through built-in redundancy and disaster recovery services. They also invest heavily in [[Cloud - Security|security]], employing teams of experts to protect the underlying infrastructure.
        - *Example: A financial institution can architect its application across multiple 'Availability Zones' to ensure that if one data center fails, its services remain online without interruption.*

```python
nothing to fill here
```

 [[Code - Cloud Computing Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Service Model Selection (IaaS, PaaS, SaaS)**
    - This determines the level of abstraction and management responsibility. The choice depends on the required level of control versus convenience. These are the [[Cloud - Core Service Offerings|core service offerings]].
        - **IaaS (Infrastructure as a Service):** Provides basic building blocks like virtual machines and storage. Offers the most control but requires the most management.
        - **PaaS (Platform as a Service):** Abstracts away the underlying infrastructure, providing a platform to deploy applications without managing servers or operating systems.
        - **SaaS (Software as a Service):** A complete, ready-to-use software product delivered over the web, requiring no management from the user.
- **Deployment Model (Public, Private, Hybrid)**
    - This defines where the infrastructure resides and who has access to it.
        - **Public Cloud:** Resources are owned and operated by a third-party provider and shared by multiple organizations over the internet.
        - **Private Cloud:** Resources are used exclusively by a single organization. It can be located on-premise or hosted by a third-party.
        - **Hybrid Cloud:** Combines public and private clouds, allowing data and applications to be shared between them.

#### Core Tradeoffs

- **Vendor Lock-in**
    - Relying on a provider's proprietary services (e.g., specific databases or machine learning APIs) can make it difficult and costly to migrate applications to another cloud provider in the future.
- **Security & Compliance (Shared Responsibility)**
    - While the provider secures the cloud infrastructure itself, the customer is responsible for securing their data and applications *within* the cloud. Misconfigurations are a common source of data breaches.
- **Cost Management Complexity**
    - The flexibility of the [[Cloud - Pay-as-You-Go Pricing|pay-as-you-go model]] can be a double-edged sword. Without careful monitoring and governance, costs can spiral out of control due to orphaned resources or inefficient usage.
- **Dependency on Internet Connectivity**
    - Access to cloud services is entirely dependent on a reliable internet connection. An outage can bring business operations to a halt.

## Connections

```
                     (Parent)
               Computer Science
                       ▲
                       |
           ┌───────────┼───────────┐
           |           |           |
(Works With)  ┌────────────────────┐  (Application)
Containerization  │  Cloud Computing   │  MLOps
                  └────────────────────┘
                       |
             ┌─────────┴─────────┐
             |                   |
      Virtualization      Core Service Offerings
       (Enabling Tech)         (Child)
```

### Parent Concept

It is a major sub-field of [[Fundamental - Computer Science|computer science]] that applies principles of distributed systems and networking to deliver computing as a utility.

### Child Concepts

- The foundational technology that enables cloud computing is [[Cloud - Virtualization|virtualization]], which abstracts physical hardware into usable virtual resources.
- The primary ways services are delivered are through [[Cloud - Core Service Offerings|core service offerings]], which are typically categorized as IaaS, PaaS, and SaaS.

### Related Concepts 

- **Complements:** The principles of cloud computing are essential for modern [[Fundamental - MLOps|MLOps]], providing the scalable infrastructure needed for training and deploying models.
- **Contrasts With:** While traditional on-premise infrastructure requires significant upfront capital investment and manual management, cloud computing offers a [[Cloud - Pay-as-You-Go Pricing|pay-as-you-go]] model with managed services.
- **Works With:** It often works in tandem with [[Fundamental - Containerization|containerization]] technologies like Docker and Kubernetes to package and orchestrate applications for deployment on cloud infrastructure.
## Questions

- Your company is considering migrating its legacy, on-premise database to the cloud. How would you frame the trade-off between the immediate migration cost and complexity versus the long-term benefits of [[Cloud - Scalability|scalability]] and [[Cloud - Reliability|reliability]] to the CFO, who is skeptical of the variable [[Cloud - Pay-as-You-Go Pricing|pricing model]]?
- You've designed a microservices architecture running on the cloud. How would you design a monitoring and alerting system to differentiate between a temporary spike in traffic that requires auto-scaling and a systemic failure in one of the services that requires intervention, ensuring high [[Cloud - Reliability|reliability]] without incurring unnecessary costs?
- What if internet latency became negligible and bandwidth was infinite and free globally? How would this fundamentally change the architecture of cloud computing and the distinction between on-premise and cloud resources?
