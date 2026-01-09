---
tags: 
  - core
  - cloud
  - vpc
  - subnet
  - load_balancing
  - firewall
  - dns
  - concept
source: 
  - "[[Understanding Cloud Computing]]"
related: 
  - "[[Cloud - Core Service Offerings]]"
  - "[[Cloud - Compute Services]]"
  - "[[Cloud - Storage Services]]"
  - "[[Cloud - Database Services]]"
  - "[[Cloud - Security]]"
  - "[[Cloud - Scalability]]"
  - "[[Cloud - Reliability]]"
  - "[[Cloud - Virtualization]]"
  - "[[Cloud - Key Advantages]]"
  - "[[Cloud - Cost Efficiency]]"
  - "[[Cloud - Vertical vs Horizontal Scaling]]"
  - "[[Fundamental - Cloud Computing]]"
  - "[[Cloud - Load Balancer]]"
  - "[[Cloud - Virtual Private Cloud (VPC)]]"
  - "[[Cloud - DNS]]"
---
# Core: Networking Services
## Summary

>Cloud networking services provide the digital connective tissue that allows various cloud resources, such as [[Cloud - Compute Services|compute instances]] and [[Cloud - Storage Services|storage buckets]], to communicate with each other, the internet, and on-premises networks securely and efficiently.

_Analogy:_ _Cloud networking is like a city's entire road and utility system, but built with software. The Virtual Private Cloud (VPC) is the city's boundary. Subnets are distinct neighborhoods (e.g., residential, commercial). Route tables and gateways are the road signs and highway on-ramps directing traffic. Load balancers are the traffic police managing congestion at busy intersections, and security groups are the gated community checkpoints, deciding which vehicles (data packets) can enter or leave a neighborhood._

**Where it breaks down:** Unlike physical roads, which are static and expensive to change, a software-defined cloud network can be reconfigured, expanded, or torn down in minutes with code, offering unparalleled flexibility.

```
 Internet User
      │
      ▼
[Load Balancer]
      │
      ├──────────────────┐
      ▼                  ▼
 [Web Server 1]     [Web Server 2]
 (Public Subnet)    (Public Subnet)
      │                  │
      └───────┬──────────┘
              ▼
       [Database]
      (Private Subnet)
```

## Details

Cloud networking is the collection of services that enables the creation of logically isolated, virtual networks to securely connect and manage cloud resources. It moves traditional hardware-based networking concepts—like routers, firewalls, and load balancers—into a highly automated, software-defined environment, making it a foundational part of the [[Cloud - Core Service Offerings|core cloud offerings]].

#### Primary Goal

To provide secure, scalable, and reliable connectivity for cloud resources, enabling them to communicate with each other and with external networks like the internet.

#### Mechanism


- **How it Works:**
    1. **Isolate:** A user first defines a logically isolated virtual network, often called a Virtual Private Cloud (VPC) or VNet, which acts as a private space within the public cloud.
    2. **Segment:** This network is then divided into smaller, manageable segments called subnets, which can be designated as public (internet-facing) or private (internal-only) to organize resources and control access.
    3. **Route & Secure:** Traffic flow between subnets and to/from the internet is controlled using route tables (like a GPS for data packets) and security rules (like a firewall), which are fundamental to [[Cloud - Security|cloud security]].
    4. **Distribute & Connect:** Services like load balancers are used to distribute incoming traffic across multiple resources to ensure [[Cloud - Reliability|reliability]] and [[Cloud - Scalability|scalability]], while DNS services translate human-readable domain names into machine-readable IP addresses.
- **Virtual Private Cloud (VPC/VNet):**
    - A logically isolated section of the cloud where you can launch resources in a virtual network that you define.
    - *Example: A company carves out its own private office network within a massive shared office building (the cloud provider's infrastructure), ensuring no other tenants can see or access their internal network.*
- **Subnets:**
    - A range of IP addresses within a VPC, used to partition the network for better organization and security.
    - *Example: An e-commerce application places its web servers in a 'public subnet' to accept customer traffic from the internet, while its sensitive databases are placed in a 'private subnet' that cannot be reached directly from the outside.*
- **Load Balancers:**
    - A service that automatically distributes incoming application traffic across multiple targets, such as virtual machines.
    - *Example: During a Black Friday sale, a load balancer directs the surge of online shoppers to a fleet of web servers, preventing any single server from being overwhelmed, which is a key technique for [[Cloud - Vertical vs Horizontal Scaling|horizontal scaling]].*
- **Firewalls & Security Groups:**
    - A virtual firewall for your resources that controls inbound and outbound traffic at the instance or subnet level.
    - *Example: A security group rule for a web server might be configured to only allow inbound traffic on port 443 (HTTPS) from any IP address, while blocking all other ports to minimize attack surfaces.*

##### Code Translation



 [[Code - Networking Services Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **CIDR Block:**
    - The IP address range for a VPC or subnet (e.g., 10.0.0.0/16). A larger block provides more IP addresses but may be harder to integrate with other networks. A smaller block conserves address space but limits the number of resources.
- **Security Group / Firewall Rules:**
    - These rules define what traffic is allowed or denied based on protocol (TCP, UDP), port number (80, 443), and source/destination IP address. They are the primary mechanism for network-level security.
- **Load Balancer Algorithm:**
    - Determines how traffic is distributed (e.g., Round Robin, Least Connections). The choice affects how evenly load is spread and how the system responds to failing instances.

#### Core Tradeoffs

- **Security vs. Accessibility:**
    - Implementing strict, granular firewall rules (e.g., micro-segmentation) enhances security but can increase operational complexity and make it harder for developers to deploy and debug applications.
- **Cost vs. Performance:**
    - High-performance components like NAT Gateways for private subnets, dedicated interconnects to on-premises data centers, and advanced load balancers all incur costs. This creates a tradeoff between network performance/capability and overall [[Cloud - Cost Efficiency|cost efficiency]].
- **Simplicity vs. Granularity:**
    - A simple, flat network with few subnets is easy to manage but offers poor security isolation. A complex network with many subnets, route tables, and gateways provides fine-grained control but requires more expertise to design and maintain.

## Connections

```
                 (Parent)
          Core Service Offerings
                   ▲
                   │
┌──────────────────┼──────────────────┐
│                  │                  │
(Works With) ┌───────────────┐ (Enables)
Compute      │   Networking  │   Security
Storage      │   Services    │
Database     └───────────────┘
```

### Parent Concept

Networking is a fundamental component of the [[Cloud - Core Service Offerings|core service offerings]] provided by any major cloud platform, alongside compute, storage, and databases.

### Related Concepts 

- **Works With:** Networking services are essential for connecting [[Cloud - Compute Services|compute instances]] with [[Cloud - Storage Services|storage buckets]] and [[Cloud - Database Services|databases]].
- **Enables:** A well-architected network is a prerequisite for achieving both [[Cloud - Scalability|scalability]] and [[Cloud - Reliability|high availability]].
- **Is Secured By:** The principles of [[Cloud - Security|cloud security]] are heavily applied through networking components like firewalls and access control lists.
## Questions

- You're designing a network for a new fintech application that requires extreme security but also needs to serve public web traffic. How would you balance the need for strict isolation of the database layer with the accessibility requirements of the web layer, and how would you explain the associated cost trade-offs of this design to the CFO?
- Imagine your application's traffic suddenly spikes 100x. What specific networking components (load balancers, NAT gateways, etc.) are most likely to become bottlenecks, and what automated monitoring and scaling strategy would you implement to handle this scenario gracefully?
- What if you had to build a globally distributed, highly available application without using a cloud provider's managed load balancer or DNS services? What open-source tools would you use, and what new challenges and failure modes would you introduce?