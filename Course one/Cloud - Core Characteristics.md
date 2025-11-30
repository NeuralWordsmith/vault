---
tags:
  - core
  - cloud
  - scalability
  - elasticity
  - cloud_economics
  - resource_provisioning
  - agility
  - concept
source:
  - "[[Understanding Cloud Computing]]"
related:
  - "[[Cloud - What is Cloud Computing]]"
  - "[[Cloud - On-Premise Servers]]"
  - "[[Cloud - On-Premise vs Cloud Hosting]]"
  - "[[Cloud - Pay-As-You-Go Pricing Model]]"
  - "[[Cloud - Major Cloud Providers]]"
  - "[[Cloud - Common Use Cases]]"
  - "[[Cloud - DataCamp Traffic Spike Example]]"
  - "[[Fundamental - Cloud Computing]]"
  - "[[Cloud - IaaS]]"
  - "[[Cloud - PaaS]]"
  - "[[Cloud - SaaS]]"
  - "[[Cloud - CAPEX vs OPEX]]"
  - "[[Fundamental - Containerization]]"
  - "[[Fundamental - MLOps]]"
  - "[[Cloud - Vendor Lock-in]]"
---
# Core: Characteristics of Cloud Computing
## Summary

>Cloud computing is defined by its core characteristics of flexibility, scalability, and rapid deployment, which allow users to access computing resources on demand.

_Analogy:_ _Using the cloud is like getting electricity from a power grid. Instead of buying, maintaining, and fueling your own expensive generator (on-premise servers), you just plug into the grid and pay for exactly what you use. If you need more power for a big event, you just draw more from the grid instantly; you don't need to buy a second generator._

**Where it breaks down:** Unlike electricity, which is a uniform commodity, cloud services are highly complex and varied. Choosing the wrong 'type' of electricity (e.g., the wrong server instance or database service) can lead to significant performance issues, security vulnerabilities, or cost overruns, a complexity not present in standard utility services.

```
A visual representation of scalability (elasticity):

Normal Load:
+--------------------+
| Web App            |
| [Server 1] [Idle]  |
+--------------------+

Traffic Spike (e.g., Black Friday):
+----------------------------------------------------+
| Web App                                            |
| [Server 1] [Server 2] [Server 3] [Server 4]        |
+----------------------------------------------------+
```

## Details

The primary appeal of [[Cloud - What is Cloud Computing|cloud computing]] stems from a set of powerful characteristics that differentiate it from traditional [[Cloud - On-Premise Servers|on-premise infrastructure]]. These attributes—flexibility, scalability, and speed—address common business challenges related to resource management and capital expenditure. While historical concerns like security and cost once slowed adoption, modern cloud platforms have largely mitigated these issues, making it a dominant paradigm.

#### Primary Goal

To provide on-demand access to computing resources without the overhead of managing physical hardware, enabling businesses to adapt quickly to changing demands.

#### Mechanism


- **Flexibility (Agility):**
    - Users can select, configure, and deploy a wide variety of services that meet their specific needs, from simple virtual machines to complex machine learning platforms. This avoids being locked into a single hardware or software configuration.
        - *Example: A developer can choose a managed database service to avoid server administration, a serverless function for event-driven code, and object storage for large files, all from the same provider.*
- **Scalability (Elasticity):**
    - This is the ability to dynamically increase or decrease computing resources to match demand. This prevents over-provisioning (wasting money on idle capacity) or under-provisioning (losing customers due to poor performance).
        - *Example: The [[Cloud - DataCamp Traffic Spike Example|DataCamp case study]] illustrates this perfectly, where a sudden surge in traffic can be handled by automatically adding more servers (horizontal scaling) and then removing them when the traffic subsides to save costs.*
- **Speed of Setup (Rapid Provisioning):**
    - Complex infrastructure can be provisioned and deployed in minutes through a web console or API calls, compared to the weeks or months required to procure and set up physical hardware in a data center.
        - *Example: A team can spin up a complete testing environment with servers, networks, and databases in under an hour, run their tests, and then tear it all down, paying only for the time used.*
- **Evolving Concerns (Historically):**
    - **Security:** Initially, businesses were hesitant to store sensitive data on shared, third-party infrastructure. However, [[Cloud - Major Cloud Providers|major cloud providers]] now invest billions in security, often offering more robust security measures and compliance certifications than a single company could afford.
    - **Cost:** While the [[Cloud - Pay-As-You-Go Pricing Model|pay-as-you-go model]] is attractive, poor management could lead to runaway costs. This has improved with better cost management tools, reserved instance pricing, and automated policies to shut down idle resources.

##### Code Translation



 [[Code - Characteristics of Cloud Computing Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Instance Type Selection:**
    - Choosing the right virtual machine size (CPU, RAM, GPU) is a primary lever. A compute-optimized instance is ideal for processing tasks, while a memory-optimized one is better for large databases.
- **Storage Class:**
    - Data access frequency dictates storage choice. 'Hot' storage (like SSDs) is fast and expensive for frequently accessed data, while 'cold' archival storage is extremely cheap but slow to retrieve from.
- **Geographic Region:**
    - Deploying resources closer to users reduces latency. However, costs and available services can vary significantly between regions.

#### Core Tradeoffs

- **Cost vs. Control:**
    - While [[Cloud - On-Premise vs Cloud Hosting|cloud hosting]] eliminates large upfront capital expenditures (CapEx), the operational expenditures (OpEx) can become high if not managed carefully. [[Cloud - On-Premise Servers|On-premise]] provides granular control but requires significant capital and maintenance overhead.
- **Convenience vs. Vendor Lock-in:**
    - Using a provider's proprietary, high-level services (e.g., Google's BigQuery, AWS Lambda) is extremely convenient but can make it difficult and costly to migrate to another cloud provider in the future.
- **Scalability vs. Architectural Complexity:**
    - Designing an application that can truly leverage cloud scalability requires building it as a distributed system, which is inherently more complex than a traditional monolithic application.

## Connections

```
                 (Parent)
        Fundamental - Cloud Computing
                   ▲
                   │
┌──────────────────┼──────────────────┐
│                  │                  │
│         ┌────────────────┐         │
│         │ Characteristics  │         │
│         └────────────────┘         │
│                  │                  │
└─────────┬────────┴────────┬─────────┘
          │                 │
    Service Models     Deployment Models
    (IaaS, PaaS)       (Public, Private)
```

### Parent Concept

These characteristics are the defining features of the broader field of [[Fundamental - Cloud Computing|cloud computing]].

### Related Concepts 

- These attributes form the core of the debate when making a [[Cloud - On-Premise vs Cloud Hosting|decision between on-premise and cloud hosting]].
- The characteristic of scalability directly enables the [[Cloud - Pay-As-You-Go Pricing Model|pay-as-you-go pricing model]], where you only pay for resources you consume.
- This model stands in sharp **contrast with** the fixed capacity and manual procurement process of [[Cloud - On-Premise Servers|traditional on-premise servers]].
- The flexibility of the cloud is demonstrated in the wide variety of [[Cloud - Common Use Cases|common use cases]] it can support, from web hosting to big data analytics.
## Questions

- A startup needs to launch a new app. How would you weigh the trade-off between using a highly scalable but more expensive serverless architecture versus a cheaper, less flexible virtual machine setup, and how would you justify your choice based on their projected user growth?
- You've designed a system that relies on auto-scaling. What monitoring metrics are critical to prevent a 'scaling thrashing' scenario where the system rapidly scales up and down, incurring high costs, and what circuit-breaker mechanisms would you implement?
- What if network latency to all major cloud providers suddenly became unpredictable and 10x higher? Which core characteristics of the cloud would be most compromised, and what new architectural patterns might emerge to cope with this reality?