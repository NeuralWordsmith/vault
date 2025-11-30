---
tags:
  - visual-analysis
---

# Example - Lush Migration to GCP

> [!info] Info
> In this case study, we analyze the infrastructure challenges faced by Lush, a cosmetics retailer, during high-demand events like Boxing Day. The scenario illustrates the limitations of rigid, on-premise infrastructure versus the elasticity provided by cloud migration.

---

## The Example


**Visual Evidence Identified:**
- The legacy system throughput cap identified as '12 transactions/second'.
- The specific high-traffic event labeled as 'Boxing Day' causing website outages.
- The target architecture components listed: Google Cloud Compute Engine and Cloud SQL.

---

## Deconstruction & Analysis
*How this example demonstrates the concept:*

### Identifying the Capacity Wall
The legacy infrastructure had a hard limit of 12 transactions per second. In a physical data center context, this represents a lack of 'Elasticity'—the hardware could not dynamically provision more resources to handle the surge in user requests during the holiday sale.

### The Business Risk (Downtime)
The inability to process more than 12 transactions/second led to website outages. In System Design, this is a failure of 'Availability' and 'Reliability' during peak load, directly translating to lost revenue.

### Migration to Infrastructure as a Service (IaaS)
By moving to Google Compute Engine, Lush shifted from fixed servers to virtual instances that can scale horizontally (adding more machines) to absorb traffic spikes beyond the previous cap.

### Managed Database Scaling
Adopting Cloud SQL allowed the database layer to handle the increased transactional volume without the retailer needing to manage physical database hardware, ensuring the backend didn't become the new bottleneck.

---

## Core Takeaway
*The general principle proved by this example:*

This example demonstrates the fundamental value of **Cloud Elasticity** over static capacity planning. While legacy systems require provisioning for peak load (which is expensive and often underestimated, leading to the 12 tx/s cap), cloud infrastructure allows businesses to scale resources up specifically during burst periods (like Boxing Day) and scale down afterward, maintaining high availability without permanent hardware investment.