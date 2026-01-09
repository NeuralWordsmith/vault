---
tags:
  - core
  - cloud
  - hybrid_cloud
  - scalability
  - elasticity
  - cost_optimization
  - traffic_spike
  - concept
source:
  - "[[Understanding Cloud Computing]]"
related:
  - "[[Cloud - Hybrid Cloud]]"
  - "[[Cloud - Private Cloud]]"
  - "[[Cloud - Public Cloud]]"
  - "[[Cloud - Cloud Deployment Models]]"
  - "[[Cloud - Hybrid Cloud vs Multicloud]]"
  - "[[Fundamental - Cloud Computing]]"
  - "[[Cloud - Elasticity]]"
  - "[[Cloud - Scalability]]"
  - "[[Cloud - Pay-as-You-Go Pricing]]"
  - "[[Cloud - Load Balancing]]"
  - "[[Cloud - Virtual Private Cloud (VPC)]]"
  - "[[Cloud - Data Egress]]"
  - "[[Cloud - Service Level Agreement (SLA)]]"
  - "[[Cloud - Autoscaling]]"
  - "[[Cloud - Private Cloud vs On-Premise Infrastructure]]"
---
# Core: Cloud Bursting
## Summary

>A hybrid cloud strategy where an application running in a private cloud dynamically "bursts" into a public cloud to access additional resources when demand spikes, preventing service disruption.

_Analogy:_ _Cloud bursting is like a local restaurant that has its own dining room (the private cloud) but partners with a large event hall next door (the public cloud). On most nights, the main dining room is sufficient. But on a busy holiday, instead of turning customers away, they open a connecting door and start seating people in the event hall, paying the hall's owner only for the tables they use that night. The main dining room is the [[Cloud - Private Cloud|private cloud]], the event hall is the [[Cloud - Public Cloud|public cloud]], the holiday rush is the demand spike, and paying only for the extra tables is the pay-per-use pricing model._

**Where it breaks down:** Unlike simply opening a door, connecting a private and public cloud requires significant technical setup for networking, security, and data synchronization. Furthermore, the performance for 'burst' customers might differ if the kitchen (database) is still back in the main restaurant, introducing latency.

```
Private Cloud (Normal Load)      Demand Spike!      Public Cloud (Overflow)
+-----------------+             =============>      +-----------------+
|  App Instance 1 |                                 |  App Instance 3 |
|  App Instance 2 |  ---[Load Balancer]--->         |  App Instance 4 |
+-----------------+                                 +-----------------+
      (At 95% CPU)                                    (Handles excess)
```

## Details

Cloud bursting is a key capability and one of the most common use cases for a [[Cloud - Hybrid Cloud|hybrid cloud]] architecture. It acts as a safety valve, allowing an organization to maintain its primary operations in a secure [[Cloud - Private Cloud|private cloud]] while retaining the ability to leverage the massive scale of a [[Cloud - Public Cloud|public cloud]] to handle periodic or unexpected traffic surges, such as for seasonal retail sales.

#### Primary Goal

To cost-effectively handle temporary, high-demand traffic spikes without over-provisioning private infrastructure, thus avoiding service disruptions and unnecessary capital expenditure.

#### Mechanism


- **How it Works:** The process is typically automated by cloud management software that monitors resource utilization.
    1. **Steady State:** An application runs normally within the resource limits of the organization's private cloud.
    2. **Threshold Trigger:** Monitoring tools detect that a resource (e.g., CPU utilization, request queue length) has crossed a predefined threshold, indicating a demand spike that the private cloud cannot handle alone.
    3. **Bursting:** An orchestration tool automatically provisions new instances of the application or its components in the pre-configured public cloud environment.
    4. **Load Balancing:** Traffic is intelligently routed to these new public cloud instances to handle the overflow demand, ensuring a seamless user experience.
    5. **Scaling Down:** Once demand subsides and resource usage drops below the threshold, the public cloud instances are automatically de-provisioned to stop incurring pay-per-use charges.

##### Code Translation



 [[Code - Cloud Bursting Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Bursting Thresholds:**
    - These are the specific metrics and values that trigger the bursting process. They must be carefully tuned to avoid bursting too early (incurring unnecessary cost) or too late (risking service disruption).
    - *Example: Trigger burst when average CPU utilization across the cluster exceeds 85% for more than 5 minutes.*
- **Scaling Policies:**
    - These are the rules that define how many new instances are provisioned in the public cloud during a burst and the conditions under which they are scaled back down.
    - *Example: Add 2 new web server instances for every 1000 new user sessions, and remove them when session count drops below the threshold.*

#### Core Tradeoffs

- **Cost Efficiency vs. Complexity:**
    - Cloud bursting avoids the high capital expenditure of building a private cloud for peak capacity, but it introduces significant architectural and operational complexity in managing networking, security, and application consistency across two different environments.
- **Performance vs. Data Latency:**
    - While it prevents service disruption, applications that burst may experience increased latency if they need to communicate frequently with stateful components like databases that remain in the private cloud. This network hop between clouds can impact performance.

## Connections

```
                  (Parent)
               Hybrid Cloud
                     ▲
                     │
┌────────────────────┼────────────────────┐
│                    │                    │
│           ┌────────────────┐            │
│           │ Cloud Bursting │            │
│           └────────────────┘            │
│                    │                    │
│                    ▼                    │
│           (A form of...)              │
│      Elasticity & Scalability         │
│                                       │
(Relies On) ───────────────  ──────────────── (Contrasts With)
Public Cloud                                  Private Cloud
```

### Parent Concept

Cloud bursting is a primary use case and defining capability enabled by a [[Cloud - Hybrid Cloud|hybrid cloud]] deployment model.

### Related Concepts 

- **Contrasts With:** A pure [[Cloud - Private Cloud|private cloud]] model, which would require significant over-provisioning of hardware to handle peak loads, leading to higher idle costs.
- **Relies On:** The pay-per-use, on-demand resource pool of a [[Cloud - Public Cloud|public cloud]] to absorb the excess demand without prior capacity planning.
- **Differs From:** A [[Cloud - Hybrid Cloud vs Multicloud|multicloud strategy]], which focuses on using services from multiple public cloud providers for redundancy or feature optimization, whereas cloud bursting is specifically about extending a private cloud into a single public one for capacity.
## Questions

- Your e-commerce site runs on a private cloud. For the annual Black Friday sale, you could either buy 50% more servers that will sit idle 364 days a year, or implement a cloud bursting strategy. How would you justify the engineering complexity and potential data latency of cloud bursting to a CFO, focusing on the ROI?
- When designing a cloud bursting architecture for a stateful application like a database, what is the single most critical bottleneck to consider: network bandwidth between the private and public clouds, data synchronization and consistency, or the spin-up time of new public instances? How would you mitigate it?
- What if a public cloud provider offered 'Reserved Bursting Capacity' at a fixed annual fee, guaranteeing resources but removing the pay-per-use model? How would this change the economic and architectural trade-offs of implementing cloud bursting?