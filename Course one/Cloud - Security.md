---
tags: 
  - core
  - cloud
  - vpc
  - load_balancing
  - dns
  - cdn
  - software_defined_networking
  - concept
source: 
  - "[[Understanding Cloud Computing]]"
related: 
  - "[[Cloud - Core Service Offerings]]"
  - "[[Cloud - Virtual Private Cloud (VPC)]]"
  - "[[Cloud - Load Balancing]]"
  - "[[Cloud - DNS]]"
  - "[[Cloud - Content Delivery Network (CDN)]]"
  - "[[Cloud - Compute Services]]"
  - "[[Cloud - Storage Services]]"
  - "[[Cloud - Database Services]]"
  - "[[Cloud - Scalability]]"
  - "[[Cloud - Reliability]]"
  - "[[Cloud - Security Groups]]"
  - "[[Cloud - Virtualization]]"
  - "[[Fundamental - Cloud Computing]]"
  - "[[Fundamental - Computer Science]]"
---
# Core: Networking Services
## Summary

>Cloud networking services provide the virtualized infrastructure and tools to connect, secure, and manage communication between cloud resources, on-premises systems, and the internet.

_Analogy:_ _Think of cloud networking as a city's entire transportation grid, built on demand. **Virtual Private Clouds (VPCs)** are like private, gated neighborhoods. **Subnets** are the specific streets within that neighborhood. **IP Addresses** are the unique street addresses for each house (resource). **Load Balancers** are the traffic cops at major intersections, directing cars to less congested routes to prevent traffic jams. **Security Groups** are the gatekeepers for each house, deciding which cars (traffic) are allowed to enter or leave._

**Where it breaks down:** Unlike a physical city grid which is static and expensive to change, a cloud network is software-defined. You can create, destroy, or reconfigure entire 'neighborhoods' and 'highways' in minutes with code, a core principle enabling [[Cloud - Scalability|rapid scalability]].

```
      Internet
         │
  (Internet Gateway)
         │
┌──────────────────────────────────────────────────┐
│                  VPC (10.0.0.0/16)               │
│                                                  │
│ ┌─────────────────┐      ┌─────────────────────┐ │
│ │ Public Subnet   │      │ Private Subnet      │ │
│ │ 10.0.1.0/24     │      │ 10.0.2.0/24         │ │
│ │       │         │      │        ▲            │ │
│ │ (Load Balancer) │      │        │            │ │
│ │       ├─────────┼──────┼───►(Database)      │ │
│ │       │         │      │                     │ │
│ │  ┌────▼────┐    │      └─────────────────────┘ │
│ │  │ Web VM  │    │                              │
│ │  └─────────┘    │                              │
│ └─────────────────┘                              │
└──────────────────────────────────────────────────┘
```

## Details

Cloud networking is the foundational layer that enables all other services to communicate securely and efficiently. It replaces physical routers, switches, and firewalls with virtual, software-defined equivalents, allowing users to create isolated, high-performance networks that connect everything from [[Cloud - Compute Services|compute instances]] to [[Cloud - Database Services|databases]]. This abstraction is made possible by the underlying [[Cloud - Virtualization|virtualization]] of the data center.

#### Primary Goal

To provide secure, reliable, and scalable connectivity for all cloud resources, enabling complex application architectures that can span the globe.

#### Mechanism


- **How it Works:** Users define a logically isolated network space and then provision resources within it. This involves specifying IP address ranges, creating subnets, configuring route tables to direct traffic, and setting up security rules to control access.
- **Virtual Private Cloud (VPC):** This is the fundamental building block—a private, isolated section of the public cloud where you can launch resources in a virtual network that you define.
    - *Example: A company creates separate VPCs for its development, testing, and production environments to ensure that a bug in a development application cannot impact the live customer-facing system.*
- **Load Balancing:** This service automatically distributes incoming application traffic across multiple targets, such as virtual machines or containers. This increases fault tolerance and availability.
    - *Example: An e-commerce website uses a load balancer during a Black Friday sale to distribute millions of user requests across a fleet of web servers, preventing any single server from becoming overloaded and ensuring the site remains responsive.*
- **Domain Name System (DNS):** A managed service that translates human-readable domain names (like www.google.com) into the machine-readable IP addresses (like 172.217.14.228) needed to locate computer services.
    - *Example: When you type a website address into your browser, a cloud DNS service looks up the corresponding IP address and directs your request to the correct web server, a key factor in overall [[Cloud - Speed and Performance|system performance]].*
- **Content Delivery Network (CDN):** A geographically distributed network of proxy servers that cache content close to end-users, reducing latency and improving content delivery speed.
    - *Example: A global video streaming service uses a CDN to store copies of popular movies in servers located in different countries. When a user in Japan hits play, the video is streamed from a local Japanese server instead of one in the US, providing a faster, smoother experience.*

##### Code Translation

```python
nothing to fill here
```

 [[Code - Networking Services Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **CIDR Block:** The Classless Inter-Domain Routing notation (e.g., 10.0.0.0/16) that defines the private IP address range for a VPC. A larger block allows for more resources.
    - Choosing a CIDR block that overlaps with an on-premises network can cause major routing conflicts if you later need to connect them.
- **Subnet Configuration:** Dividing a VPC into smaller networks (subnets).
    - **Public Subnets:** Have a direct route to the internet, suitable for web servers or load balancers.
    - **Private Subnets:** Do not have a direct internet route, suitable for sensitive resources like databases.
- **Security Rules:** Firewall rules at the instance (Security Group) or subnet (Network ACL) level that control inbound and outbound traffic.
    - Overly permissive rules (e.g., allowing all traffic from 0.0.0.0/0) are a major security risk.

#### Core Tradeoffs

- **Security vs. Accessibility:** Implementing strict firewall rules and private subnets enhances security but can add complexity for developers who need to access resources, often requiring bastion hosts or VPNs.
- **Cost vs. High Availability:** Features like managed NAT Gateways, cross-zone load balancing, and dedicated interconnects significantly improve [[Cloud - Reliability|reliability]] and performance but add to the monthly bill, impacting overall [[Cloud - Cost Efficiency|cost efficiency]].
- **Simplicity vs. Granularity:** A single, large VPC is simple to manage initially but offers poor isolation. A multi-VPC, multi-account architecture provides strong security boundaries but introduces significant management overhead and complexity.

## Connections

```
                             (Parent)
                     Core Service Offerings
                              ▲
                              │
┌─────────────────────────────┼─────────────────────────────┐
│                             │                             │
(Connects)           ┌──────────────────┐             (Connects)
Compute Services     │ Networking Services │            Storage Services
                     └──────────────────┘
                              │
                 ┌────────────┴────────────┐
                 │                         │
      Virtual Private Cloud (VPC)     Load Balancing
```

### Parent Concept

Networking services are a fundamental component of [[Cloud - Core Service Offerings|core cloud service offerings]], providing the essential connectivity fabric for all other resources.

### Related Concepts 

- These services are essential for connecting [[Cloud - Compute Services|compute instances]] with [[Cloud - Storage Services|storage buckets]] and [[Cloud - Database Services|databases]].
- Effective network design is a prerequisite for achieving high [[Cloud - Scalability|scalability]] and [[Cloud - Reliability|reliability]] in any application.
- The ability to programmatically define and manage networks is a direct result of [[Cloud - Virtualization|virtualization]], which abstracts physical hardware.
## Questions

- You're designing a network for a new fintech application that requires both high security for transactional data and low-latency access for a public-facing analytics dashboard. How would you structure your VPCs, subnets, and routing to meet these conflicting requirements without doubling your network infrastructure costs?
- Imagine your application, running behind a load balancer, experiences a sudden, massive traffic spike that exhausts the IP addresses in your public subnet. What automated monitoring and response mechanisms would you implement to detect this and scale the network layer itself, not just the compute instances?
- What if 'zero trust' security models became the mandatory default for all cloud providers, meaning no two resources could communicate by default, even within the same subnet? How would this fundamentally change the way we design and manage cloud applications, and what new services would be needed?