---
tags: 
  - core
  - cloud
  - serverless
  - event_driven_architecture
  - microservices
  - cloud_computing
  - concept
source: 
  - "[[Understanding Cloud Computing]]"
related: 
  - "[[Cloud - Cloud Service Models]]"
  - "[[Cloud - Serverless Computing]]"
  - "[[Cloud - IaaS vs PaaS vs SaaS]]"
  - "[[Cloud - Platform as a Service (PaaS)]]"
  - "[[Cloud - Infrastructure as a Service (IaaS)]]"
  - "[[Cloud - Software as a Service (SaaS)]]"
  - "[[Cloud - AWS Lambda]]"
  - "[[Cloud - Azure Functions]]"
  - "[[Cloud - Google Cloud Functions]]"
  - "[[DevOps - Cold Start]]"
  - "[[Architecture - Microservices]]"
  - "[[Architecture - Event-Driven Architecture]]"
  - "[[Fundamental - Cloud Computing]]"
  - "[[Fundamental - Containerization]]"
  - "[[Cloud - Vendor Lock-in]]"
---
# Core: Function as a Service (FaaS)
## Summary

>Function as a Service (FaaS), also known as serverless computing, is an event-driven [[Cloud - Cloud Service Models|cloud service model]] where developers execute code in response to triggers without managing or provisioning the underlying server infrastructure.

_Analogy:_ _Using FaaS is like hiring a freelance translator on-demand. You don't hire them full-time or provide them with an office and computer (managing a server). You simply send them a document (an event/trigger) when you need it translated (the function), they perform the translation, and you only pay for the pages they translated (pay for what you use)._

**Where it breaks down:** The analogy doesn't fully capture the concept of a 'cold start,' which is the initial delay when a function is invoked for the first time after a period of inactivity, similar to the freelancer needing a moment to get set up before starting the translation.

```
[Event Source]
(e.g., API Gateway, S3 Bucket)
      │
      ▼
   [Trigger]
      │
      ▼
[FaaS Platform]
(e.g., AWS Lambda)
      │
      ├─ Spins up Ephemeral Container ──> [Function Execution]
      │
      └─ Returns Result / Side Effect
```

## Details

The core idea of Function as a Service is to abstract away all infrastructure concerns, allowing developers to focus solely on writing single-purpose functions. Instead of maintaining servers that are always on, FaaS platforms automatically provision resources to run a function when it's triggered—such as processing a payment or verifying a user login—and then shut them down, ensuring you only pay for the exact compute time used.

#### Primary Goal

To eliminate server management overhead and align operational costs directly with the actual execution of code, enabling fine-grained, pay-per-use billing.

#### Mechanism


- **How it Works:** The FaaS model operates on an event-driven execution flow.
    1.  **Event Trigger:** An event occurs, such as an HTTP API request, a new file upload to cloud storage, or a message added to a queue.
    2.  **Function Invocation:** The cloud platform detects the event and invokes the corresponding function, automatically handling the provisioning of a runtime environment (an ephemeral container).
    3.  **Code Execution:** The function code runs, performs its specific task, and produces an output.
    4.  **Shutdown:** After execution, the container is shut down. Resources are released, and billing stops.
- **Stateless Nature:** Functions are typically stateless, meaning they do not retain memory or data from previous invocations. Any required state must be stored in an external service like a database or cache.
- **Cost Model:** The pricing is based on the number of invocations and the resources consumed during execution.
    - The generalized cost can be represented as:
    - $$Cost = (\text{Invocations} \cdot \text{Price}_{\text{invocation}}) + (\text{GB-Seconds} \cdot \text{Price}_{\text{GB-Second}})$$, where GB-Seconds is the memory allocated multiplied by the execution duration.

##### Code Translation



 [[Code - Function as a Service (FaaS) Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Memory Allocation:**
    - Determines the amount of RAM available to the function. Increasing memory also proportionally increases CPU power, affecting performance and cost.
- **Timeout:**
    - The maximum amount of time a function is allowed to run before being terminated. This prevents runaway processes and controls costs.
- **Concurrency Limits:**
    - The maximum number of function instances that can run simultaneously in a given region. This acts as a safety mechanism to prevent runaway costs and overwhelming downstream services.

#### Core Tradeoffs

- **Cost Efficiency vs. Cold Starts:**
    - The pay-per-use model is highly efficient for sporadic workloads, but infrequently used functions may suffer from 'cold start' latency as the platform needs to initialize a new container.
- **Developer Simplicity vs. Vendor Lock-in:**
    - FaaS simplifies deployment and scaling, but building an application heavily reliant on a specific provider's FaaS and associated event sources (e.g., AWS Lambda with S3 triggers) can lead to significant vendor lock-in.
- **Scalability vs. Architectural Constraints:**
    - Automatic scaling is a major benefit, but it comes with constraints like short execution timeouts and statelessness, which requires a shift in architectural thinking towards event-driven microservices.

## Connections

```
                               (Parent)
                          Cloud Service Models
                                   ▲
                                   │
┌──────────────────────────────────┼──────────────────────────────────┐
│                                  │                                  │
(Higher Control)        ┌──────────────────────────┐         (Lower Control)
      PaaS              │ Function as a Service    │              SaaS
                        └──────────────────────────┘
                                   │
                      ┌────────────┴────────────┐
                      │                         │
                 AWS Lambda              Azure Functions
```

### Parent Concept

Function as a Service is the most abstract type of [[Cloud - Cloud Service Models|cloud service model]], offering the highest level of convenience by managing all underlying infrastructure.

### Related Concepts 

- **Contrasts With:** FaaS provides more abstraction than [[Cloud - Platform as a Service (PaaS)|Platform as a Service]], where developers still manage the application runtime and scaling configurations.
- **Contrasts With:** It is fundamentally different from [[Cloud - Infrastructure as a Service (IaaS)|Infrastructure as a Service]], which requires users to manage virtual machines, operating systems, and networking.
- **Compares With:** The [[Cloud - IaaS vs PaaS vs SaaS|comparison of service models]] highlights how FaaS sits at the far end of the convenience spectrum, trading control for operational simplicity.
- **Is a form of:** FaaS is a key enabler of the broader trend towards [[Cloud - Anything as a Service (XaaS)|Anything as a Service (XaaS)]], where virtually any IT capability can be delivered as a service over the internet.
## Questions

- When would the operational simplicity and pay-per-use model of FaaS justify the business risk of vendor lock-in and unpredictable costs for a high-throughput, mission-critical application?
- How would you design a system to mitigate 'cold starts' for a latency-sensitive FaaS application, and what monitoring would you put in place to track their impact on user experience and downstream services?
- What if statelessness was no longer a core constraint of FaaS? How would that fundamentally change application architecture and blur the lines between FaaS and PaaS?