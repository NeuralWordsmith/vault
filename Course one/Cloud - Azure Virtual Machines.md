---
tags: 
  - core
  - cloud
  - iaas
  - virtualization
  - compute
  - azure_vm
  - infrastructure_as_a_service
  - concept
source: 
  - "[[Understanding Cloud Computing]]"
related: 
  - "[[Cloud - Microsoft Azure]]"
  - "[[Cloud - Azure Key Service Offerings]]"
  - "[[Cloud - Cloud Service Models]]"
  - "[[Cloud - Azure Blob Storage]]"
  - "[[Cloud - Azure SQL Database]]"
  - "[[Cloud - Azure Machine Learning]]"
  - "[[Cloud - Virtual Machine Scale Sets]]"
  - "[[Cloud - Availability Sets]]"
  - "[[Cloud - Azure Networking]]"
  - "[[Cloud - Disaster Recovery]]"
  - "[[Cloud - Azure Site Recovery]]"
  - "[[Fundamental - Cloud Computing]]"
  - "[[Fundamental - Containerization]]"
  - "[[Example - The Ottawa Hospital Azure Implementation]]"
  - "[[Cloud - Personal Health Information Protection Act (PHIPA)]]"
---
# Core: Azure Virtual Machines
## Summary

>Azure Virtual Machines (VMs) are on-demand, scalable computing resources within [[Cloud - Microsoft Azure|Microsoft Azure]] that provide the flexibility of virtualization without the need to buy and maintain the physical hardware.

_Analogy:_ _An Azure Virtual Machine is like renting a fully customizable, unfurnished apartment in a massive, secure building. The building itself is Azure's data center, the apartment is your VM, the utilities (CPU, RAM, storage) are metered and billed based on your usage, and your lease agreement is the VM configuration you choose. Microsoft, the landlord, manages the building's foundation, security, and shared infrastructure, but you have complete freedom to furnish and use your apartment (install software, configure the OS) however you see fit._

**Where it breaks down:** Unlike a physical apartment lease, you can instantly upgrade your VM to a 'penthouse suite' (more CPU/RAM) or downgrade to a 'studio' (less resources) on-demand, and you can create or destroy identical apartments in minutes, offering unparalleled flexibility.

```
+-------------------------------------------------+
|           Your Application (e.g., Web Server)           |
+-------------------------------------------------+
|         Guest Operating System (e.g., Linux)          |
+-------------------------------------------------+  <-- Your Virtual Machine (VM)
|         Virtual Hardware (vCPU, vRAM, vDisk)          |
+-------------------------------------------------+
|                 Hypervisor (e.g., Hyper-V)                |
+-------------------------------------------------+
|         Physical Server Hardware (in Azure DC)        |
+-------------------------------------------------+
```

## Details

Azure Virtual Machines are a cornerstone of Azure's Infrastructure-as-a-Service (IaaS) offering. They provide the fundamental building block for computation in the cloud, giving users the digital equivalent of a physical server with complete control over the operating system and installed applications, making them a key part of the overall [[Cloud - Azure Key Service Offerings|Azure service portfolio]].

#### Primary Goal

To provide users with total control over a computing environment—including the operating system, software installations, and network configuration—for running diverse applications without the capital expense and maintenance overhead of managing physical hardware.

#### Mechanism


- **How it Works:** The process involves abstracting physical hardware resources to create isolated, software-defined computers.
    1. **Provisioning:** A user selects a VM image (e.g., Windows Server, Ubuntu) from the Azure Marketplace and specifies the required resources like CPU cores, RAM, and storage size.
    2. **Hypervisor Allocation:** Azure's hypervisor (the software that creates and runs virtual machines) carves out the specified resources from a massive pool of physical servers in an Azure data center.
    3. **Isolation & Boot:** The hypervisor creates a logically isolated environment for the VM, making it believe it has its own dedicated hardware. The chosen operating system is then booted up within this environment.
    4. **Management & Access:** The user can then connect to the VM via remote protocols (like RDP or SSH) to install software, configure settings, and run applications. For instance, the [[Example - The Ottawa Hospital Azure Implementation|Ottawa Hospital implementation]] could use VMs to run specific legacy healthcare applications that require a controlled and isolated OS environment to comply with regulations like [[Cloud - Personal Health Information Protection Act (PHIPA)|PHIPA]].
- **Key Components:**
    - **VM Image:** A template containing an operating system and sometimes pre-installed software that is used to create the VM.
    - **VM Size:** A predefined combination of CPU, memory, and temporary storage (e.g., D-series for general purpose, F-series for compute-optimized).
    - **Virtual Network (VNet):** A logically isolated network within Azure that allows VMs to securely communicate with each other, the internet, and on-premises networks.
    - **Storage Disks:** Persistent data disks attached to the VM for the operating system and application data, which often leverage the durability of services like [[Cloud - Azure Blob Storage|Azure Blob Storage]] in the background.

##### Code Translation



 [[Code - Azure Virtual Machines Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **VM Size (Series & Size):** Determines the allocation of CPU, RAM, and temporary storage.
    - Effect: Directly impacts performance and hourly cost. Choosing a compute-optimized size is ideal for processing-intensive tasks, while a memory-optimized size is better for large databases.
- **Region:** The geographical Azure data center where the VM is deployed.
    - Effect: Affects application latency for end-users and is critical for data sovereignty and compliance requirements.
- **Disk Type (HDD, SSD, Premium SSD):** The performance tier of the attached storage disks.
    - Effect: Governs the Input/Output Operations Per Second (IOPS) and throughput, significantly impacting database and application responsiveness.

#### Core Tradeoffs

- **Control vs. Management Overhead:**
    - VMs offer maximum control over the environment (IaaS), but this comes with the responsibility of managing OS patching, security updates, and software installation. This is a key difference from PaaS offerings like [[Cloud - Azure SQL Database|Azure SQL Database]], where the underlying infrastructure is managed by Microsoft.
- **Flexibility vs. Simplicity:**
    - The ability to run any custom or legacy software is a major advantage. However, configuring, securing, and networking VMs is more complex than using higher-level services like Azure App Service or serverless functions.
- **Cost Model:**
    - Pay-as-you-go pricing is flexible but can become expensive for constantly running workloads. Techniques like using Reserved Instances or Spot VMs are necessary to optimize costs for predictable or interruptible tasks.

## Connections

```
                  (Parent)
         Azure Key Service Offerings
                   ▲
                   │
┌──────────────────┼──────────────────┐
│                  │                  │
(Contrasts With)  ┌──────────────────┐  (Uses)
Azure SQL Database│ Azure Virtual    │  Azure Blob Storage
                  │ Machines         │
                  └──────────────────┘
                       │
            ┌──────────┴──────────┐
            │                     │
  Virtual Machine      Availability Sets
  Scale Sets
```

### Parent Concept

Azure Virtual Machines are a foundational component of [[Cloud - Azure Key Service Offerings|Azure's key service offerings]], representing the core of its Infrastructure-as-a-Service (IaaS) capabilities.

### Related Concepts 

- **Contrasts With:** While VMs provide infrastructure-level control, services like [[Cloud - Azure SQL Database|Azure SQL Database]] represent a Platform-as-a-Service (PaaS) model, abstracting away the underlying operating system and its management.
- **Integrates With:** VMs often use [[Cloud - Azure Blob Storage|Azure Blob Storage]] or Azure Disk Storage for persistent data storage, separating the compute from the data layer for better durability and management.
- **Enables:** They serve as the computational backbone for more complex services, including hosting custom models developed with [[Cloud - Azure Machine Learning|Azure Machine Learning]] or running data processing jobs.
- **Protected By:** In enterprise scenarios, VMs are a critical component of a [[Cloud - Disaster Recovery|disaster recovery]] strategy, often replicated to another region using services like [[Cloud - Azure Site Recovery|Azure Site Recovery]].
## Questions

- Your finance department wants to cut cloud costs by 30%. Would you recommend moving a critical, legacy application from a high-performance Azure VM to a cheaper, container-based service? How would you justify the risks and potential downtime versus the cost savings to a non-technical executive?
- You're designing a system on Azure VMs that must handle unpredictable traffic spikes for an e-commerce site. How would you architect the VM deployment using scale sets, load balancers, and monitoring to ensure both high availability and cost-efficiency, and what's your plan for a catastrophic failure in a single Azure region?
- What if 'serverless' computing became so advanced and cheap that the cost of the management overhead for a VM (patching, security, OS management) always exceeded the cost of re-architecting an application to be serverless? Would there be any remaining use cases for Azure VMs?