---
tags: 
  - core
  - cloud
  - iaas
  - cloud_computing
  - virtual_machines
  - infrastructure
  - cloud_models
  - concept
source: 
  - "[[Understanding Cloud Computing]]"
related: 
  - "[[Cloud - Cloud Service Models]]"
  - "[[Cloud - Platform as a Service (PaaS)]]"
  - "[[Cloud - Software as a Service (SaaS)]]"
  - "[[Cloud - IaaS vs PaaS vs SaaS]]"
  - "[[Cloud - Cloud Service Models & Control vs Convenience Relationship]]"
  - "[[Cloud - Function as a Service (FaaS)]]"
  - "[[Cloud - Anything as a Service (XaaS)]]"
  - "[[Fundamental - Cloud Computing]]"
  - "[[Cloud - Virtualization]]"
  - "[[Cloud - AWS EC2]]"
  - "[[Cloud - Google Cloud Compute Engine]]"
  - "[[Cloud - Public Cloud]]"
  - "[[Cloud - Scalability]]"
  - "[[Cloud - Elasticity]]"
  - "[[Fundamental - Containerization]]"
---
# Core: Infrastructure as a Service (IaaS)
## Summary

>IaaS is a scalable, cloud-based infrastructure model where a provider supplies fundamental computing resources like networking, storage, and servers, which are then managed by system administrators.

_Analogy:_ _IaaS is comparable to renting a car. The rental company provides the fundamental vehicle (the infrastructure: servers, storage, networking), but you are responsible for everything else, including driving (managing the OS), refueling (handling runtime), and navigation (deploying applications)._

**Where it breaks down:** Unlike renting a car, which is a fixed asset for the rental period, IaaS resources are highly elastic and can be provisioned, scaled, or decommissioned on-demand, a core feature of cloud computing.

```
Responsibility Model:

+-------------------------+
|      Application        | } You Manage
|      Data               | }
|      Runtime            | }
|      Middleware         | }
|      Operating System   | }
+-------------------------+ ---- (Your Responsibility)
|      Virtualization     | } Provider Manages
|      Servers            | }
|      Storage            | }
|      Networking         | }
+-------------------------+ ---- (Provider's Responsibility)
```

## Details

Infrastructure as a Service (IaaS) provides the most fundamental building blocks of cloud computing, offering raw access to servers, storage, and networking. In this model, the cloud provider manages the physical hardware in their data centers, but you are responsible for managing almost everything on top of it, from the operating system to the applications. This approach offers the highest level of flexibility and management control among the main [[Cloud - Cloud Service Models|cloud service models]].

#### Primary Goal

To provide raw, on-demand computing infrastructure (servers, storage, networking) over the internet, eliminating the need for organizations to purchase and manage their own physical data centers and hardware.

#### Mechanism


- **How it Works:**
    1. A cloud provider owns and maintains massive data centers containing the physical servers, storage drives, and networking gear.
    2. They use a virtualization layer (hypervisor) to abstract these physical resources into a pool of virtual resources.
    3. As a user, you provision these virtual resources (e.g., virtual machines, storage volumes) on-demand through a web-based console or an API.
    4. You have full control over the provisioned resources, including installing the operating system, software, and applications, as well as configuring the network.
- **Core Components:**
    - **Compute:**
        - _Example: Virtual Machines (VMs) that act as servers. You choose the CPU, memory, and other specifications. Well-known examples include [[Cloud - AWS EC2|AWS EC2]] or [[Cloud - Google Cloud Compute Engine|Google Cloud Compute Engine]]._
    - **Storage:**
        - _Example: Block storage (virtual hard drives attached to VMs) and object storage (for storing large amounts of unstructured data like files and images)._
    - **Networking:**
        - _Example: Virtual Private Clouds (VPCs), load balancers, firewalls, and DNS services that allow you to build secure and scalable network architectures in the cloud._

##### Code Translation



 [[Code - Infrastructure as a Service (IaaS) Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Instance Type/Size:**
    - Refers to the specific configuration of virtual CPU (vCPU), memory (RAM), and sometimes specialized hardware (like GPUs) for a virtual server. Choosing the right size is critical for balancing performance and cost.
- **Storage Configuration:**
    - Includes selecting the type of storage (e.g., high-speed SSD for databases vs. low-cost HDD for archives) and its size. This directly impacts I/O performance and monthly costs.
- **Network Settings:**
    - Involves configuring virtual networks, subnets, firewalls, and routing rules. These parameters control security and how your resources communicate with each other and the internet.

#### Core Tradeoffs

- **Maximum Control vs. High Responsibility:**
    - IaaS offers the most granular control over the infrastructure, which is ideal for complex, custom architectures. However, this control comes with the responsibility of managing, patching, and securing the operating systems and all software on top of them.
- **Flexibility vs. Complexity:**
    - The flexibility to build anything is powerful but introduces significant complexity in design, deployment, and maintenance. This is a key point of comparison in the [[Cloud - IaaS vs PaaS vs SaaS|IaaS vs. PaaS vs. SaaS]] discussion.
- **Pay-as-you-go vs. Cost Management:**
    - You only pay for the resources you consume, which avoids large upfront capital expenditures. The downside is that poor resource management or leaving idle instances running can lead to unexpectedly high operational costs.

## Connections

```
                  (Parent)
           [[Cloud - Cloud Service Models|Cloud Service Models]]
                     ▲
                     │
┌────────────────────┼────────────────────┐
│                    │                    │
(Contrasts With) ┌──────────────────┐ (Contrasts With)
     PaaS        │       IaaS       │       SaaS
                 └──────────────────┘
                         │
                         ▼
                (Specific Examples)
             AWS EC2, Google Compute
```

### Parent Concept

IaaS is one of the three primary [[Cloud - Cloud Service Models|cloud service models]], representing the foundational layer of cloud computing.

### Related Concepts 

- **Contrasts With:** [[Cloud - Platform as a Service (PaaS)|Platform as a Service (PaaS)]], which abstracts away the operating system and middleware, offering a ready-made platform for development rather than raw infrastructure.
- **Contrasts With:** [[Cloud - Software as a Service (SaaS)|Software as a Service (SaaS)]], which provides a complete, ready-to-use application and represents the highest level of abstraction and convenience.
- **Is a component of:** The [[Cloud - IaaS vs PaaS vs SaaS|comparison between IaaS, PaaS, and SaaS]], which is a framework for understanding the different levels of management responsibility in the cloud.
- **Illustrates:** The fundamental trade-off explored in the [[Cloud - Cloud Service Models & Control vs Convenience Relationship|relationship between control and convenience]], where IaaS maximizes control at the expense of convenience.
## Questions

- Your company is migrating a legacy monolithic application to the cloud. When would you choose IaaS for this migration over a more managed service like PaaS, and how would you justify the increased operational cost and complexity to a CFO?
- You've deployed a critical application on a set of IaaS virtual machines. How would you design an automated system to handle a sudden failure of an entire availability zone, ensuring minimal downtime?
- What if networking virtualization became so advanced that the concept of a 'server' or 'instance' became entirely obsolete? What would the next evolution of IaaS look like?