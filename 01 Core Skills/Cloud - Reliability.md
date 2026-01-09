---
tags: 
  - core
  - cloud
  - vpc
  - subnetting
  - cloud_networking
  - sdn
  - firewall
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
  - "[[Cloud - Speed and Performance]]"
  - "[[Cloud - Cost Efficiency]]"
  - "[[Networking - Virtual Private Cloud (VPC)]]"
  - "[[Networking - Subnet]]"
  - "[[Networking - Load Balancing]]"
  - "[[Networking - DNS]]"
  - "[[Networking - Firewall]]"
  - "[[Fundamental - Cloud Computing]]"
  - "[[Fundamental - Computer Science]]"
---
# Core: Cloud - Networking Services
## Summary

>Cloud networking services provide the virtualized infrastructure and tools to define, secure, and manage connectivity between cloud resources, on-premises systems, and the internet.

_Analogy:_ _Cloud networking is like a city's digital road system. The Virtual Private Cloud (VPC) is your private, gated community. Subnets are the individual neighborhoods (e.g., residential vs. commercial). IP addresses are the specific street addresses for each house (resource). Route tables are the GPS, directing traffic, and security groups are the gate guards, checking IDs and deciding who gets in or out._

**Where it breaks down:** Unlike a physical road system, cloud networking is software-defined, meaning you can create, destroy, and reconfigure entire networks in minutes. Its security is also far more granular and dynamic than a simple gate guard, with multiple layers of programmable rules.

```
      Internet
         ^
         |
+--------|-----------------------+
|  Internet Gateway (IGW)      |
+--------|-----------------------+
|        |                       |
|  VPC (10.0.0.0/16)             |
|                                |
|  +--------------------------+  |
|  | Public Subnet            |  |
|  | (10.0.1.0/24)            |  |
|  |                          |  |
|  |  [Web Server] <-----> IGW|  |
|  +--------------------------+  |
|                                |
|  +--------------------------+  |
|  | Private Subnet           |  |
|  | (10.0.2.0/24)            |  |
|  |                          |  |
|  |  [Database] <---- [Web]  |  |
|  +--------------------------+  |
|                                |
+--------------------------------+
```

## Details

Cloud networking forms the essential connective tissue that allows all other cloud services to function as a cohesive system. It provides a logically isolated section of the cloud where you can launch resources, enabling communication between [[Cloud - Compute Services|compute instances]], [[Cloud - Storage Services|storage buckets]], and [[Cloud - Database Services|databases]], while controlling access from the public internet.

#### Primary Goal

To provide secure, isolated, and highly configurable connectivity for all cloud resources, enabling them to communicate with each other and external networks.

#### Mechanism


- **How it Works:**
    1. **Define a Boundary:** You first create a Virtual Private Cloud (VPC), which is a logically isolated virtual network dedicated to your account. You assign it a private IP address range (a CIDR block).
    2. **Create Subdivisions:** Within the VPC, you create subnets, which are smaller IP address ranges typically spanning a single Availability Zone. You can designate subnets as public (with a route to the internet) or private (isolated from the internet).
    3. **Control Traffic Flow:** You attach route tables to subnets to define where network traffic is directed. An Internet Gateway is attached to the VPC to allow communication between resources in public subnets and the internet.
    4. **Enforce Security:** You apply stateful firewalls (Security Groups) at the instance level and stateless firewalls (Network Access Control Lists) at the subnet level to control inbound and outbound traffic based on specific rules (port, protocol, source/destination IP).
- **Virtual Private Cloud (VPC):**
    - The fundamental building block. It's your private slice of the public cloud, providing logical isolation.
    - *Example: You define a VPC with the IP range 10.0.0.0/16, giving you over 65,000 private IP addresses for your resources.*
- **Subnets:**
    - A range of IP addresses within your VPC, used to partition the network for security or organizational purposes.
    - *Example: Within your 10.0.0.0/16 VPC, you create a public subnet (10.0.1.0/24) for web servers and a private subnet (10.0.2.0/24) for databases.*
- **Security Groups & Network ACLs:**
    - Virtual firewalls that control traffic. Security Groups are stateful and operate at the instance level, while Network ACLs are stateless and operate at the subnet level.
    - *Example: A security group for a web server might allow inbound traffic on port 80 (HTTP) and 443 (HTTPS) from anywhere (0.0.0.0/0), while the database's security group only allows inbound traffic on port 3306 from the web server's security group.*
- **Load Balancers:**
    - Distributes incoming application traffic across multiple targets, such as EC2 instances, to increase application fault tolerance and [[Cloud - Scalability|scalability]].
    - *Example: An Application Load Balancer distributes HTTP requests across a fleet of web servers, ensuring no single server is overwhelmed.*

##### Code Translation

```python
nothing to fill here
```

 [[Code - Cloud - Networking Services Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **CIDR Block Size:**
    - Determines the total number of available IP addresses in your VPC. Choosing a block that is too small can prevent future expansion, while one that is too large can lead to overlapping IP ranges if you connect to other networks.
- **Subnet Allocation (Public vs. Private):**
    - The decision to place resources in public or private subnets is a core security design choice. Public subnets are for internet-facing resources (e.g., web servers), while private subnets are for backend resources (e.g., databases) that should not be directly accessible from the internet.
- **Firewall Rule Granularity:**
    - Configuring security group and NACL rules with the principle of least privilege (i.e., only allowing the specific traffic that is absolutely necessary) is critical for security but can increase management complexity.

#### Core Tradeoffs

- **Security vs. Accessibility:**
    - Highly restrictive firewall rules and private subnets enhance security but can make management and access for developers more complex, often requiring bastion hosts or VPNs.
- **Cost vs. Performance:**
    - Services like NAT Gateways (for private instances to access the internet) and dedicated interconnects for hybrid cloud setups incur additional costs. While they improve security and performance, they must be balanced against the budget, a key aspect of [[Cloud - Cost Efficiency|cost efficiency]].
- **Flexibility vs. Complexity:**
    - The software-defined nature of cloud networking offers immense flexibility to create complex topologies, but this also increases the risk of misconfiguration, which can lead to security vulnerabilities or outages.

## Connections

```
             (Parent)
      Core Service Offerings
               ▲
               |
┌──────────────┼──────────────┐
│              │              │

(Is Essential For)  ┌───────────────────────────┐  (Is a Core Component Of)
Compute Services    │    Networking Services    │  Security
                    └───────────────────────────┘
                             │
                             ▼
                       (Children)
              VPC, Load Balancing, DNS
```

### Parent Concept

Networking is a foundational component of [[Cloud - Core Service Offerings|core cloud service offerings]], providing the essential connectivity for all other services.

### Related Concepts 

- **Is Essential For:** [[Cloud - Compute Services|Compute services]] and [[Cloud - Storage Services|storage services]], which require networking to communicate with each other and the outside world.
- **Is a Core Component Of:** [[Cloud - Security|Cloud security]], as network controls like firewalls and access lists are the first line of defense against unauthorized access.
- **Directly Impacts:** [[Cloud - Speed and Performance|Speed and performance]], as network latency and throughput are critical factors in application responsiveness.
## Questions

- How would you design a network for a multi-tiered web application to balance the high security needs of the database layer with the public accessibility requirements of the web layer, all while adhering to a strict budget?
- Your application's traffic has suddenly grown 100x. What specific networking services and architectural changes would you implement to handle this load, and how would you design a monitoring system to detect new bottlenecks?
- What if you were forbidden from using a Virtual Private Cloud (VPC)? What alternative security and isolation mechanisms would you have to invent at the application and operating system levels to achieve a similar level of security?