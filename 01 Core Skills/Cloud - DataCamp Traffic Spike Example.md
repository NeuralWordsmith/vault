---
tags:
  - core
  - cloud
  - scalability
  - elasticity
  - system_design
  - load_balancing
  - cloud_computing
  - concept
source:
  - "[[Understanding Cloud Computing]]"
related:
  - "[[Cloud - Core Characteristics]]"
  - "[[Cloud - Elasticity]]"
  - "[[Cloud - On-Premise vs Cloud Hosting]]"
  - "[[Cloud - Cloud Hosting]]"
  - "[[Cloud - Pay-As-You-Go Pricing Model]]"
  - "[[Cloud - On-Premise Servers]]"
  - "[[Cloud - What is Cloud Computing]]"
  - "[[System Design - Load Balancing]]"
  - "[[System Design - CAP Theorem]]"
  - "[[Fundamental - Software Engineering]]"
  - "[[Fundamental - Computer Science]]"
  - "[[Cloud - Common Use Cases]]"
  - "[[DevOps - High Availability]]"
  - "[[DevOps - Fault Tolerance]]"
---
# Core: Scalability
## Summary

>Scalability is the property of a system to handle a growing amount of work by adding resources, ensuring performance and availability are maintained even under increased load, a common challenge for fixed [[Cloud - On-Premise Servers|on-premise infrastructure]].

_Analogy:_ _Imagine a small restaurant with a fixed number of tables and one chef. On a normal day, it works perfectly. But if a tour bus suddenly arrives (a traffic spike), the kitchen gets overwhelmed, service slows down, and customers leave unhappy. Scalability is like having the ability to instantly add more tables, chairs, and chefs the moment the bus pulls up, ensuring every customer is served quickly. Here, the restaurant's size is the server infrastructure, the customers are user traffic, and the ability to add staff and tables is the scaling mechanism._

**Where it breaks down:** The analogy implies that adding resources is instantaneous and free. In reality, scaling out compute resources involves a slight delay (boot time) and incurs costs, which are often managed through a [[Cloud - Pay-As-You-Go Pricing Model|pay-as-you-go model]].

```
Vertical Scaling (Scaling Up)      vs.      Horizontal Scaling (Scaling Out)

      ┌────────┐                             ┌────────┐
      │ Server │                             │ Server │
      │  CPU   │                             └────────┘
      │  RAM   │                                  ▲
      └────────┘                                  │
          ↓                                 Load Balancer
      ┌──────────┐                                │
      │ Bigger   │      ┌────────┐   ┌────────┐   ┌────────┐
      │ Server   │      │ Server │   │ Server │   │ Server │
      │ ++CPU    │      └────────┘   └────────┘   └────────┘
      │ ++RAM    │
      └──────────┘
```

## Details

The challenge of handling fluctuating demand is perfectly illustrated by the DataCamp website during a 'Free Week' promotion. A sudden surge in users can overwhelm a fixed infrastructure, causing slowdowns or crashes that lead to a poor user experience and lost business opportunities. This core problem highlights the need for systems that can dynamically adapt their capacity to match demand, a foundational principle of modern [[Cloud - What is Cloud Computing|cloud computing]] and system design.

#### Primary Goal

To ensure a system remains responsive, performant, and available by dynamically adjusting its resource capacity to meet fluctuating user demand without service degradation.

#### Mechanism


- **How it Works:** Scalability is achieved through two primary strategies for adding computational resources to an application.
- **Vertical Scaling (Scaling Up):** This involves increasing the resources of an existing server, such as adding more CPU, RAM, or storage.
    - _Example: This is like replacing the restaurant's small oven with a larger, more powerful industrial oven to cook more food faster. You're improving the capacity of the single unit._
- **Horizontal Scaling (Scaling Out):** This involves adding more servers to a pool of resources to distribute the load among them.
    - _Example: Instead of getting a bigger oven, you add two more small ovens and hire two more chefs. The total cooking capacity increases by distributing the work across multiple units._

#### Key Parameters

- **Auto-Scaling Triggers:** These are the metrics used to decide when to scale up or down.
    - **CPU Utilization:** Scaling when the average CPU usage across servers exceeds a threshold (e.g., 75%).
    - **Request Latency:** Scaling when the time to respond to user requests surpasses a target (e.g., 200ms).
    - **Network I/O:** Scaling based on the amount of incoming or outgoing network traffic.

#### Core Tradeoffs

- **Vertical Scaling:**
    - **Pro:** Simpler to manage as it doesn't require changes to the application architecture.
    - **Con:** There's a physical limit to how much you can upgrade a single machine, and it can be very expensive. It also represents a single point of failure.
- **Horizontal Scaling:**
    - **Pro:** Offers virtually limitless scalability and improves fault tolerance, as the failure of one server doesn't bring down the whole system.
    - **Con:** Requires more complex architecture, including load balancers and a distributed system design, which can be harder to implement and maintain.

## Connections

```
             (Parent)
        Core Characteristics
                 ▲
                 │
┌────────────────┼────────────────┐
│                │                │
│       ┌────────┴────────┐       │
│       │   Scalability   │       │
│       └────────┬────────┘       │
│                │                │
└────────────────┼────────────────┘
                 │
                 ▼
            Elasticity
            (Child)
```

### Parent Concept

Scalability is one of the [[Cloud - Core Characteristics|core characteristics]] that define modern cloud computing platforms.

### Related Concepts 

- **Contrasts With:** The challenges of scalability are most apparent in traditional [[Cloud - On-Premise Servers|on-premise server]] environments, where capacity is fixed and difficult to change quickly.
- **Enabled By:** Modern [[Cloud - Cloud Hosting|cloud hosting]] services are built from the ground up to provide scalable infrastructure on demand.
- **Impacts:** The ability to scale resources up and down is the foundation of the [[Cloud - Pay-As-You-Go Pricing Model|pay-as-you-go pricing model]], allowing users to only pay for the resources they actually consume.
## Questions

- You're designing a new e-commerce platform. Would you architect for vertical scaling (fewer, more powerful machines) or horizontal scaling (many smaller machines)? Justify your choice to a stakeholder based on expected holiday traffic spikes, long-term cost, and system resilience.
- How would you design an auto-scaling policy for a service like DataCamp's 'Free Week'? What specific metrics (CPU, memory, request latency) would trigger a scale-up event, and what would be the cool-down period to prevent 'thrashing' (scaling up and down too rapidly)?
- What if compute resources were infinitely powerful but you could only ever have *one* server? What new architectural patterns and software limitations would emerge in a world without horizontal scalability?