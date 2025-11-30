---
tags: 
  - core
  - cloud
  - disaster_recovery
  - business_continuity
  - bcdr
  - azure
  - replication
  - concept
source: 
  - "[[Understanding Cloud Computing]]"
related: 
  - "[[Cloud - Disaster Recovery]]"
  - "[[Cloud - Microsoft Azure]]"
  - "[[Example - The Ottawa Hospital Azure Implementation]]"
  - "[[Cloud - Azure Key Service Offerings]]"
  - "[[Cloud - Azure Virtual Machines]]"
  - "[[Cloud - Azure SQL Database]]"
  - "[[Cloud - Personal Health Information Protection Act (PHIPA)]]"
  - "[[Fundamental - Cloud Computing]]"
  - "[[Cloud - Business Continuity]]"
  - "[[Cloud - Recovery Point Objective (RPO)]]"
  - "[[Cloud - Recovery Time Objective (RTO)]]"
  - "[[Cloud - High Availability]]"
  - "[[Cloud - Azure Backup]]"
  - "[[Cloud - Azure Traffic Manager]]"
  - "[[Cloud - Data Sovereignty & Cloud Computing]]"
---
# Core: Azure Site Recovery
## Summary

>Azure Site Recovery is a native [[Cloud - Disaster Recovery|disaster recovery]] service within [[Cloud - Microsoft Azure|Microsoft Azure]] that automates the replication and failover of virtual machines and physical servers to a secondary location to ensure business continuity.

_Analogy:_ _Think of Azure Site Recovery as an automated fire drill and evacuation plan for your company's data center. The primary data center is your main office building. The recovery plan is the detailed evacuation route map on the wall. The secondary Azure region is the designated safe assembly point across town. Azure Site Recovery is the automated alarm and sprinkler system that not only detects the 'fire' (disaster) but also automatically guides everyone (your applications and data) along the pre-planned routes to the safe assembly point, ensuring everyone gets there in the right order._

**Where it breaks down:** Unlike a fire drill which is a periodic test, Azure Site Recovery's data replication is continuous. Furthermore, the service doesn't just test the plan; it executes the actual 'evacuation' (failover) of live production systems during a real disaster.

```
Primary Site (Region A / On-Prem)        Secondary Site (Region B)
----------------------------------        --------------------------
[ VM 1 ]                           
[ DB 1 ]  --- Continuous Replication ---> [ Replicated VM 1 ]
[ App 1]                                  [ Replicated DB 1 ]
                                          [ Replicated App 1]
   |
   | Disaster Occurs!
   v

[ OUTAGE ]  --- Failover Triggered --->   (Applications Start in Order)
                                          1. [ DB 1 ] Online
                                          2. [ App 1] Online
                                          3. [ VM 1 ] Online
```

## Details

Azure Site Recovery is a managed service designed to orchestrate and automate protection for your critical applications, minimizing downtime during outages. By replicating workloads from a primary site to a secondary location, it provides a robust solution for business continuity and disaster recovery (BCDR), as demonstrated in the [[Example - The Ottawa Hospital Azure Implementation|case of The Ottawa Hospital]], which used it to protect their essential healthcare systems.

#### Primary Goal

To minimize downtime and data loss during planned or unplanned outages by automating the replication, failover, and recovery of virtual machines and physical servers.

#### Mechanism


- **How it Works:** The service operates through a four-stage process to ensure resilience:
    1. **Replication:** Azure Site Recovery continuously captures and sends data changes from workloads in a primary site (like on-premises servers or [[Cloud - Azure Virtual Machines|Azure VMs]] in Region A) to a secondary location (another Azure region).
    2. **Orchestration:** You define 'Recovery Plans' which act as automated runbooks. These plans specify the exact sequence for failing over applications, ensuring dependent services like a [[Cloud - Azure SQL Database|database]] are started before the corresponding web servers.
    3. **Failover:** When a disaster occurs at the primary site, you initiate a failover. Site Recovery then automatically brings up the replicated machines in the secondary site according to the predefined Recovery Plan, redirecting user traffic.
    4. **Failback:** Once the primary site is stable and operational again, the service facilitates the process of 'failing back,' returning operations from the secondary site to the original location.
- **Recovery Plans:**
    - These are the core of the orchestration process, allowing for the modeling of complex, multi-tier applications.
    - They can include custom scripts and manual actions to handle complex recovery steps beyond just turning on machines.
    - _Example: For the [[Example - The Ottawa Hospital Azure Implementation|The Ottawa Hospital implementation]], a recovery plan would ensure that the patient admission database VM is fully online and validated before the electronic health record application VM is started._
- **Replication Policy:**
    - This defines the two critical metrics for disaster recovery:
    - - **Recovery Point Objective (RPO):** The maximum acceptable amount of data loss measured in time. Site Recovery enables low RPOs by replicating data frequently.
    - - **Recovery Time Objective (RTO):** The maximum acceptable downtime for an application. Site Recovery achieves low RTOs by automating the recovery process.

##### Code Translation

```python
nothing to fill here
```

 [[Code - Azure Site Recovery Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Replication Frequency (RPO Target):**
    - Determines how often data changes are sent to the secondary site. A lower RPO (e.g., 30 seconds) minimizes data loss but increases network bandwidth consumption and cost.
- **Recovery Point Retention:**
    - Specifies how long recovery points (snapshots in time) are stored. A longer retention period (e.g., 72 hours) provides more flexibility for recovery but increases storage costs.
- **Application-Consistent Snapshot Frequency:**
    - Controls how often snapshots that capture data from memory and pending I/O operations are created. This is critical for transactional applications like databases but can have a minor performance impact on the source machine.

#### Core Tradeoffs

- **Cost vs. Resilience:**
    - Achieving near-zero data loss (low RPO) and instant recovery (low RTO) requires more compute, storage, and network resources, which directly increases the monthly cost of the solution.
- **Complexity vs. Automation:**
    - While Site Recovery automates the process, setting up and testing recovery plans for complex, multi-tier applications can be intricate. It requires a deep understanding of application dependencies to avoid a failed recovery.
- **Performance Impact vs. Protection:**
    - The continuous replication process consumes a small amount of CPU, memory, and network bandwidth on the production servers. For high-transaction systems, this overhead must be monitored to ensure it doesn't impact application performance.

## Connections

```
             (Parent)
        Disaster Recovery
                 ▲
                 │
┌────────────────┼────────────────┐
│                │                │

         ┌───────────────────┐
         │Azure Site Recovery│
         └───────────────────┘

(Protects Assets)          (Exemplified By)
Azure Virtual Machines     The Ottawa Hospital
```

### Parent Concept

It is a specific implementation of the broader concept of [[Cloud - Disaster Recovery|disaster recovery]], which focuses on restoring data and IT infrastructure after a disruptive event.

### Related Concepts 

- **Is a key service within:** the [[Cloud - Microsoft Azure|Microsoft Azure]] ecosystem, forming a core part of its business continuity offerings.
- **Protects assets like:** [[Cloud - Azure Virtual Machines|Azure Virtual Machines]] and [[Cloud - Azure SQL Database|Azure SQL Databases]] by replicating them to a secondary location.
- **Is exemplified by:** its use in the [[Example - The Ottawa Hospital Azure Implementation|The Ottawa Hospital's strategy]] to ensure patient data and critical applications remain available, complying with regulations like [[Cloud - Personal Health Information Protection Act (PHIPA)|PHIPA]].
## Questions

- Your CFO wants to reduce the cost of your disaster recovery solution. How would you explain the business risk of increasing the Recovery Point Objective (RPO) from 5 minutes to 4 hours for a critical patient records system like the one at [[Example - The Ottawa Hospital Azure Implementation|The Ottawa Hospital]]?
- You're designing a DR plan for a complex, 50-VM e-commerce application. How would you use Azure Site Recovery's 'Recovery Plans' to manage dependencies during failover, and what automated scripts would you include to validate that the application is fully functional post-failover without manual intervention?
- What if a geopolitical event instantly severed all network connectivity between your primary and secondary Azure regions right after you initiated a failover? How would your recovery strategy change, and what 'split-brain' data consistency problems would you need to solve once the primary region comes back online?