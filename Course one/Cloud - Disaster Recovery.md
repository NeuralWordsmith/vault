---
tags: 
  - core
  - cloud
  - business_continuity
  - rpo
  - rto
  - failover
  - backup
  - concept
source: 
  - "[[Understanding Cloud Computing]]"
related: 
  - "[[Cloud - Azure Site Recovery]]"
  - "[[Cloud - Personal Health Information Protection Act (PHIPA)]]"
  - "[[Example - The Ottawa Hospital Azure Implementation]]"
  - "[[Cloud - Azure Blob Storage]]"
  - "[[Cloud - Azure SQL Database]]"
  - "[[Fundamental - Cloud Computing]]"
  - "[[Business Continuity Planning]]"
  - "[[High Availability]]"
  - "[[Data Backup Strategies]]"
  - "[[IT Risk Management]]"
  - "[[Cloud - Cloud Service Models]]"
  - "[[Cloud - Data Sovereignty & Cloud Computing]]"
---
# Core: Disaster Recovery
## Summary

>Disaster recovery is a set of procedures and tools that enables the continuation of critical business functions and services following a disruptive event like a natural disaster or cyber-attack.

_Analogy:_ _Disaster recovery is like having comprehensive car insurance and a rental car agreement. The car accident is the disaster, the insurance policy is the recovery plan, the claims process is the execution of recovery procedures, and the rental car is the backup system (like [[Cloud - Azure Site Recovery|Azure Site Recovery]]) that allows you to continue your daily life (business operations) with minimal disruption while your primary car is being repaired._

**Where it breaks down:** While an insurance process is relatively linear, a real IT disaster can be chaotic and complex, with cascading failures that have no direct equivalent in the car insurance scenario. The 'rental car' might not have all the custom features of your primary car, representing potential performance differences in a failover environment.

```
Disaster Event ──> Detect & Alert ──> Execute Recovery Plan ──> Restore Services ──> Post-Incident Review
```

## Details

The core idea of disaster recovery (DR) is to prepare for the unexpected. It's a crucial component of a broader business continuity strategy, focusing specifically on the IT systems and infrastructure needed to keep an organization running after a catastrophic event. By having a well-documented and tested plan, organizations can significantly reduce financial loss, reputational damage, and operational downtime.

#### Primary Goal

To minimize downtime and data loss after a disaster, ensuring business continuity and protecting an organization's assets and reputation.

#### Mechanism


- **How it Works:** A DR plan is not a single action but a cyclical process involving several key phases:
    1. **Risk Assessment & Business Impact Analysis (BIA):** Identify potential threats (e.g., fire, cyber-attack) and determine which business processes are most critical.
    2. **Strategy & Plan Development:** Define the recovery objectives (RTO/RPO, see below) and select the appropriate strategies and tools. This involves deciding on backup frequency, failover locations, and communication protocols.
    3. **Implementation:** Deploy the chosen tools and infrastructure. This could involve setting up off-site backups to services like [[Cloud - Azure Blob Storage|Azure Blob Storage]] or configuring replication services. For a concrete example, see how [[Example - The Ottawa Hospital Azure Implementation|The Ottawa Hospital's implementation]] would rely on such a plan to protect patient records.
    4. **Testing & Maintenance:** Regularly test the DR plan through drills and simulations to ensure it works as expected and update it as systems change.
- **Key Metrics:** The effectiveness of a DR plan is measured by two critical parameters:
    - **Recovery Point Objective (RPO):** This defines the maximum acceptable amount of data loss, measured in time. An RPO of 1 hour means the business can tolerate losing up to an hour's worth of data. It dictates backup frequency.
    - **Recovery Time Objective (RTO):** This defines the maximum acceptable amount of downtime for a service or system after a disaster. An RTO of 4 hours means the system must be operational again within that timeframe. It dictates the required speed of the recovery solution.
- **Defining the Recovery Point Objective ($RPO$):**
    - The RPO is the time gap between the last successful backup and the moment of disaster. It can be expressed as:     $$ T_{disaster} - T_{last\_backup} \leq RPO $$

##### Code Translation



 [[Code - Disaster Recovery Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Recovery Point Objective (RPO):** This is the primary lever for controlling data loss.
    - *Effect:* A lower (shorter) RPO means more frequent backups and less potential data loss, but it increases costs for storage and network bandwidth.
- **Recovery Time Objective (RTO):** This is the primary lever for controlling downtime.
    - *Effect:* A lower (shorter) RTO requires more sophisticated and expensive solutions, such as automated failover systems and hot standby sites, as opposed to cheaper manual recovery processes.

#### Core Tradeoffs

- **Cost vs. Resilience:** The fundamental tradeoff in disaster recovery.
    - Achieving near-zero RPO and RTO provides maximum protection but is prohibitively expensive for all but the most critical applications. Organizations must balance the cost of the DR solution against the potential cost of downtime and data loss for each specific service.
- **Complexity vs. Reliability:**
    - Fully automated, complex failover systems can reduce RTO but introduce more potential points of failure. A simpler, manual recovery plan might be slower but more reliable and easier to troubleshoot under pressure.

## Connections

```
                      (Parent)
               Business Continuity
                         ▲
                         │
           ┌─────────────┼─────────────┐
           │             │             │
(Implementation)  ┌────────────────────┐  (Driver)
Azure Site Recovery │ Disaster Recovery  │  PHIPA
                  └────────────────────┘
                         │
              ┌──────────┴──────────┐
              │                     │
      Backup & Restore            DRaaS
```

### Parent Concept

Disaster Recovery is a critical component of the broader field of Business Continuity Planning, which encompasses all strategies for keeping an organization operational during a disruption, not just the IT aspects.

### Related Concepts 

- **Is Implemented By:** Specific services like [[Cloud - Azure Site Recovery|Azure Site Recovery]] provide the tools to automate the replication and recovery of virtual machines and applications.
- **Is Driven By:** Regulatory compliance, such as the need to protect sensitive data under the [[Cloud - Personal Health Information Protection Act (PHIPA)|Personal Health Information Protection Act (PHIPA)]], often mandates robust disaster recovery plans.
- **Contrasts With:** High Availability (HA) aims to prevent downtime through redundancy and fault tolerance within a single data center, whereas Disaster Recovery focuses on recovering from a complete site failure.
## Questions

- For a hospital system governed by [[Cloud - Personal Health Information Protection Act (PHIPA)|PHIPA]], how would you justify the significant cost increase of a near-zero Recovery Point Objective (RPO) to a CFO, versus a 15-minute RPO that is cheaper but risks losing recent patient data?
- You're designing a DR plan for a multi-regional application using [[Cloud - Azure Blob Storage|Azure Blob Storage]] and [[Cloud - Azure SQL Database|Azure SQL Database]]. How would you architect the failover process to ensure data consistency between the storage and the database, and what's your strategy for handling a 'split-brain' scenario during failback?
- What if your primary and secondary data centers were both wiped out by a correlated disaster, such as a massive power grid failure? What 'Tier 3' recovery strategies, beyond traditional DR, could ensure the survival of critical patient data?