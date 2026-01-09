---
tags: 
  - core
  - cloud
  - object_storage
  - aws
  - cloud_storage
  - data_lake
  - durability
  - concept
source: 
  - "[[Understanding Cloud Computing]]"
related: 
  - "[[Cloud - Amazon Web Services (AWS)]]"
  - "[[Cloud - AWS Elastic Compute Cloud (EC2)]]"
  - "[[Cloud - AWS Relational Database Service (RDS)]]"
  - "[[Cloud - AWS SageMaker]]"
  - "[[Cloud - AWS Redshift]]"
  - "[[Fundamental - Cloud Computing]]"
  - "[[Fundamental - Data Engineering]]"
  - "[[Data - Object Storage]]"
  - "[[Data - Block Storage]]"
  - "[[Data - File Storage]]"
  - "[[Data - Data Lake]]"
  - "[[Cloud - AWS S3 Storage Classes]]"
  - "[[Cloud - AWS Glacier]]"
  - "[[Example - NerdWallet AWS SageMaker Implementation]]"
---
# Core: Simple Storage Service (S3)
## Summary

>Amazon S3 is a highly scalable, durable, and secure object storage service designed to store and retrieve any amount of data, from anywhere on the web, serving as a foundational data layer for many applications.

_Analogy:_ _Think of AWS S3 as an infinite digital self-storage facility. The facility itself is S3. You rent a unit, which is an **S3 Bucket**, and it has a globally unique address. Inside your unit, you can store any kind of item (a photo, a document, a video), which are the **Objects**. Each item has a label, its **Key**, so you can find it easily. You are given a special key, your **AWS credentials**, to access your unit, and you can decide who else gets a copy of that key._

**Where it breaks down:** Unlike a physical storage unit, you can't 'run' anything inside S3; it's purely for storage, not computation like [[Cloud - AWS Elastic Compute Cloud (EC2)|EC2]]. Also, while a physical unit has a fixed size, an S3 bucket can effectively grow infinitely.

```
 [ User / Application ]
          |
          | API Call (e.g., boto3.upload_file)
          | using AWS Credentials
          ▼
+---------------------+
|    AWS S3 Service   |
|---------------------|
|  [ Bucket: my-bucket ]  |
|      |              |
|      ▼              |
|  [ Object ]         |
|   - Key: 'file.txt' |
|   - Data: "..."     |
|   - Metadata        |
+---------------------+
```

## Details

Simple Storage Service (S3) is one of the oldest and most fundamental services offered by [[Cloud - Amazon Web Services (AWS)|AWS]]. It addresses the universal need for scalable and reliable file storage, providing a simple web service interface to store and retrieve data. This contrasts with block storage used for operating systems on services like [[Cloud - AWS Elastic Compute Cloud (EC2)|EC2]] or the structured databases managed by [[Cloud - AWS Relational Database Service (RDS)|RDS]].

#### Primary Goal

To provide developers with a durable, highly available, and infinitely scalable object storage solution without the overhead of managing physical storage infrastructure.

#### Mechanism


- **How it Works:**
    - S3 operates on a simple key-value store paradigm for unstructured data, known as objects. The core components are:
- **Buckets:**
    - A bucket is a container for objects stored in S3. Every bucket must have a globally unique name across all of AWS.
    - Think of it as a top-level folder or a domain name.
- **Objects:**
    - Objects are the fundamental entities stored in S3. They consist of the data itself (the file) and metadata (information about the data).
    - An object can be any type of file: an image, a video, a log file, a backup, or even model artifacts from a machine learning workflow.
- **Keys:**
    - A key is the unique identifier for an object within a bucket. The combination of a bucket name, a key, and a version ID (if versioning is enabled) uniquely identifies an object.
    - For example, in `s3://my-awesome-bucket/images/profile.jpg`, 'my-awesome-bucket' is the bucket name and 'images/profile.jpg' is the key.
    - This structure is commonly used in machine learning projects, such as the [[Example - NerdWallet AWS SageMaker Implementation|NerdWallet case study]], where raw data, processed features, and trained models are stored under different keys within the same project bucket for organization.

##### Code Translation

```python
import boto3

# --- Step 1: Create an S3 client ---
# Assumes your AWS credentials are configured (e.g., via environment variables)
s3_client = boto3.client('s3')

# --- Step 2: Define bucket and file details ---
bucket_name = 'my-unique-application-bucket-12345'
file_name = 'local_file.txt'
object_key = 'uploads/remote_file.txt' # The 'path' inside the bucket

# Create a dummy local file to upload
with open(file_name, 'w') as f:
    f.write('This is the content of our file.')

# --- Step 3: Upload the file to S3 ---
try:
    response = s3_client.upload_file(file_name, bucket_name, object_key)
    print(f"Successfully uploaded {file_name} to {bucket_name}/{object_key}")
except Exception as e:
    print(f"Error uploading file: {e}")

```

 [[Code - Simple Storage Service (S3) Implementation|View Full Implementation & Analysis]]

#### Key Parameters

- **Storage Classes**
    - Control the cost and availability of your data. You choose a class based on access patterns.
    - *S3 Standard:* For frequently accessed data; highest cost, lowest latency.
    - *S3 Intelligent-Tiering:* Automatically moves data to the most cost-effective tier based on usage.
    - *S3 Glacier (Instant, Flexible, Deep Archive):* For long-term archival with retrieval times from milliseconds to hours; very low cost.
- **Versioning**
    - A bucket-level setting that keeps a full history of all versions of an object. Protects against accidental deletions or overwrites.
- **Lifecycle Policies**
    - Automated rules that transition objects between storage classes or expire them after a certain period. For example, move logs to Glacier after 90 days and delete them after 7 years.

#### Core Tradeoffs

- **Cost vs. Retrieval Time**
    - The primary tradeoff. Cheaper storage classes like Glacier Deep Archive have significantly longer data retrieval times, making them unsuitable for real-time applications but perfect for compliance archiving.
- **Consistency Model**
    - S3 offers strong read-after-write consistency for new object PUTs. However, it provides eventual consistency for overwrite PUTs and DELETEs, meaning a read immediately after a delete might still show the old object for a short period.
- **Not a File System**
    - S3 is an object store, not a POSIX-compliant file system. It doesn't support operations like file locking or in-place modifications (appending to a file requires rewriting the entire object), which makes it unsuitable for hosting a traditional database's data files.

## Connections

```
                 (Parent)
        Amazon Web Services (AWS)
                   ▲
                   │
┌──────────────────┼──────────────────┐
│                  │                  │
│         ┌────────────────┐          │
│         │      S3        │          │
│         └────────────────┘          │
│                  │                  │
│       ┌──────────┴──────────┐       │
│       │                     │       │
(Child) S3 Glacier     (Child) S3 Intelligent-Tiering

(Contrasts With) EC2 EBS     (Integrates With) SageMaker     (Contrasts With) RDS
```

### Parent Concept

S3 is a foundational storage service within the [[Cloud - Amazon Web Services (AWS)|Amazon Web Services]] ecosystem.

### Related Concepts 

- It **contrasts with** the block storage (EBS) used by [[Cloud - AWS Elastic Compute Cloud (EC2)|EC2 instances]], which is designed to act as a hard drive for a virtual server.
- It also **contrasts with** [[Cloud - AWS Relational Database Service (RDS)|RDS]], which provides managed relational databases for structured data, not unstructured files.
- S3 **integrates deeply with** [[Cloud - AWS SageMaker|AWS SageMaker]], which commonly uses S3 buckets to store training datasets, model artifacts, and configuration files.
- For large-scale analytics, data stored in S3 often serves as the source for a data warehouse like [[Cloud - AWS Redshift|AWS Redshift]].
## Questions

- You need to store user-uploaded profile pictures. They are accessed frequently for the first 60 days, then rarely. For legal reasons, they must be retained for 5 years. How would you design an S3 lifecycle policy to balance access speed and cost, and what is the business justification for your chosen storage class transitions?
- You are building a high-throughput logging system that writes millions of small files per hour to a single S3 bucket. What performance bottleneck related to S3's key prefixing structure do you anticipate, and how would you design your key naming scheme to mitigate it?
- What if S3's pricing model changed to charge per API read request, making it prohibitively expensive for frequent access? What alternative AWS services or architectural patterns would you use to build a cost-effective image hosting service?