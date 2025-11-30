---
tags:
  - visual-analysis
---

# Example - The Ottawa Hospital Azure Implementation

> [!info] Info
> In this real-world case study, we examine The Ottawa Hospital's architectural decision to transition from a purely on-premises infrastructure to a Hybrid Cloud model. The scenario focuses on solving the high cost of traditional Disaster Recovery (DR) by leveraging the scalability and 'pay-as-you-go' nature of Microsoft Azure while maintaining primary operations locally.

---

## The Example


**Visual Evidence Identified:**
- The primary infrastructure located On-Premises handling active user traffic and database hosting
- The secondary infrastructure located in Azure Cloud acting as the Disaster Recovery (DR) site
- Azure Storage containers specifically allocated for heavy medical image data
- The continuous synchronization pipeline established by Azure Site Recovery between the on-prem center and the cloud

---

## Deconstruction & Analysis
*How this example demonstrates the concept:*

### Identifying the Cost Bottleneck
The hospital identified that while hosting primary data on-premises was cost-effective, building a redundant physical data center for Disaster Recovery was financially prohibitive due to high hardware (CapEx) costs.

### Adopting a Hybrid Architecture
To solve this, they implemented a Hybrid Cloud strategy. They kept the active Electronic Health Records (EHR) on-premises but moved the failover environment to Azure, utilizing Infrastructure as a Service (IaaS) to avoid buying idle hardware.

### Implementing Specialized Cloud Services
They deployed specific Azure services for specific needs: Azure Storage to handle the volume of medical images (part of the 700TB dataset) and Azure Site Recovery to automate the replication and failover logic.

### Achieving Scale and Compliance at Reduced Cost
The final architecture supports 5,300 concurrent users and adheres to Canadian data sovereignty laws, all while reducing the overall disaster recovery budget by 50%.

---

## Core Takeaway
*The general principle proved by this example:*

This example demonstrates the strategic advantage of **Hybrid Cloud** for **Disaster Recovery**. By utilizing the cloud as a standby environment, organizations can convert what would be a massive upfront capital expenditure (duplicate hardware) into a manageable operating expense, ensuring high availability and compliance without the redundancy costs of a traditional second data center.