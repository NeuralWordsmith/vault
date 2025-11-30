---
tags: 
  - core
  - cloud
  - business_intelligence
  - data_visualization
  - cloud_analytics
  - tableau
  - power_bi
  - concept
source: 
  - "[[Understanding Cloud Computing]]"
related: 
  - "[[Cloud - Impact on Data Roles]]"
  - "[[Cloud - Demand for Cloud Computing Skills]]"
  - "[[Cloud - Data Engineer Cloud Usage]]"
  - "[[Cloud - Data Scientist Cloud Usage]]"
  - "[[BI - Tableau]]"
  - "[[BI - Power BI]]"
  - "[[Data Engineering - Cloud Data Warehouse]]"
  - "[[Data Engineering - ETL vs ELT]]"
  - "[[Fundamental - SQL]]"
  - "[[Data Engineering - Snowflake]]"
  - "[[Data Engineering - Google BigQuery]]"
  - "[[Data Engineering - Amazon Redshift]]"
  - "[[Cloud - Collaboration Benefits]]"
  - "[[Cloud - Provider Certifications]]"
---
# Core: Data Analyst Cloud Usage
## Summary

>A modern data analyst is expected to connect to and query data from cloud data warehouses using business intelligence (BI) tools like Tableau or Power BI to create reports and visualizations.

_Analogy:_ _A data analyst using a cloud BI tool is like a chef using a modern kitchen's smart refrigerator. The chef (analyst) doesn't need to understand the refrigerator's complex cooling system (cloud infrastructure); they just need to use the intuitive touch-screen interface (BI tool) to find and retrieve specific ingredients (data) stored inside._

**Where it breaks down:** The chef only consumes ingredients, whereas a data analyst actively transforms the raw data and creates entirely new insights (the final dishes or dashboards), which are then shared with others. The process is more creative and synthetic.

```
[Data Analyst] ---uses---> [BI Tool (Tableau/Power BI)] ---sends query---> [Cloud Data Warehouse] ---returns data---> [BI Tool] ---renders---> [Dashboard]
```

## Details

The proliferation of cloud computing has fundamentally altered the skill set required for data roles, a key aspect of the broader [[Cloud - Impact on Data Roles|impact on data professions]]. Even for less infrastructure-focused roles like the data analyst, the expectation is no longer to work with local files but to directly access vast datasets stored in the cloud. This is accomplished by leveraging powerful Business Intelligence (BI) platforms as the primary interface for data exploration and reporting.

#### Primary Goal

To empower business-focused analysts to securely access, analyze, and visualize massive, centralized datasets in the cloud without requiring them to manage the underlying infrastructure.

#### Mechanism


- **How it Works:** The process involves using a BI tool as an intermediary to translate user actions into queries that run against a cloud data source.
    1. **Connect:** The analyst uses a specific connector within the BI tool (e.g., a BigQuery connector in Tableau) and provides credentials to establish a secure connection to a cloud data warehouse.
    2. **Query:** Through a graphical user interface (e.g., dragging and dropping fields onto a canvas), the analyst builds a view of the data. The BI tool translates these actions into an optimized query (like SQL) that is sent to the cloud data warehouse to execute.
    3. **Visualize:** The data warehouse returns the results of the query to the BI tool, which then renders the data as a chart, table, or other visualization.
    4. **Share:** The final dashboard or report is published, typically to a cloud-hosted service (e.g., Tableau Server, Power BI Service), allowing stakeholders to view the insights via a web browser.
- **Key Tools: Business Intelligence (BI) Platforms**
    - *Example: Tableau* - A market leader known for its highly intuitive drag-and-drop interface and powerful data visualization capabilities.
    - *Example: Power BI* - Microsoft's offering, which is tightly integrated into the Azure and Office 365 ecosystem and is strong in data modeling and preparation (Power Query).
- **Key Data Sources: Cloud Data Warehouses**
    - *Example: Google BigQuery, Amazon Redshift, Snowflake* - These are massively parallel processing (MPP) databases designed to handle petabyte-scale analytics workloads, serving as the backend data store for the analyst's queries.

##### Code Translation



 [[Code - Data Analyst Cloud Usage Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Connection Type: Live vs. Extract**
    - This is a critical configuration choice that determines how the BI tool interacts with the data source.
    - **Live Connection:** Every user interaction (e.g., filtering a dashboard) sends a new query directly to the cloud data warehouse. This ensures data is always fresh but can be slower and more costly.
    - **Extract:** The BI tool imports a snapshot of the data and stores it in its own high-performance, in-memory engine. This provides very fast performance but means the data is only as fresh as the last scheduled refresh.

#### Core Tradeoffs

- **Accessibility vs. Cost**
    - Empowering many analysts to run live queries against a cloud warehouse can democratize data access, but it can also lead to significant and unpredictable query costs if not properly governed.
- **Performance vs. Freshness**
    - The choice between a live connection and an extract is a direct tradeoff. Live connections offer real-time data at the potential expense of dashboard performance, while extracts offer high performance for stale data.

## Connections

```
                  (Parent)
          Cloud - Impact on Data Roles
                     ▲
                     │
┌────────────────────┼────────────────────┐
│                    │                    │
│           ┌───────────────────────────┐ │
│           │ Data Analyst Cloud Usage  │ │
│           └───────────────────────────┘ │
│                                         │
└────────────────────┬────────────────────┘
                     │
             (Contrasts With)
      Cloud - Data Engineer Cloud Usage
```

### Parent Concept

This skill set is a direct consequence of the broader [[Cloud - Impact on Data Roles|impact of cloud computing on data-centric professions]].

### Related Concepts 

- This role **contrasts with** that of a [[Cloud - Data Engineer Cloud Usage|data engineer]], who is responsible for building and maintaining the cloud data pipelines that the analyst consumes.
- The analyst's work often **complements** that of a [[Cloud - Data Scientist Cloud Usage|data scientist]], who might use dashboards for initial exploration before building more complex predictive models.
- This expectation is a clear example of the overall [[Cloud - Demand for Cloud Computing Skills|increasing demand for cloud skills]] across all technical and semi-technical roles.
## Questions

- Your company is deciding between a 'live' connection and a daily 'extract' for a critical sales dashboard. A live connection incurs high per-query costs on your cloud warehouse, while an extract means the sales team won't see data from the last 24 hours. How do you decide which to use, and how would you explain the business impact of your choice to the Head of Sales?
- The primary sales dashboard, which uses a live connection to your cloud data warehouse, suddenly becomes extremely slow. What are the first three potential bottlenecks you would investigate, spanning from the BI tool itself to the cloud infrastructure?
- What if BI tools like Tableau and Power BI were banned tomorrow? Describe a new, simplified workflow you would propose for business users to access and visualize cloud data without writing any code.