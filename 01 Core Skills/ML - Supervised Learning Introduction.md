---
source:
  - "[[Understanding Machine Learning]]"
related:
  - "[[ML - Unsupervised Learning Introduction]]"
  - "[[ML - Evaluating Performance in Machine Learning]]"
  - "[[ML - Improving Performance in Machine Learning]]"
---

### 1. Definition of Supervised Learning

Supervised learning is a type of machine learning where the model is trained using **labeled data**. Each training example includes:

* An input (features)
* A known correct output (label)

The model learns a mapping from inputs to outputs by minimizing prediction errors.

---

### 2. Role of Labels

Labels provide explicit guidance during training. They act as the “teacher,” allowing the model to compare its predictions against the correct answers and adjust accordingly.

Without labels, supervised learning is not possible.

---

### 3. Common Supervised Learning Tasks

Supervised learning is primarily used for:

#### a. Classification

* Output is a discrete category
* Examples:
  * Spam vs. not spam
  * Disease vs. no disease
  * Image category prediction

#### b. Regression

* Output is a continuous numerical value
* Examples:
  * House price prediction
  * Temperature forecasting
  * Sales estimation

---

### 4. Training Process

The supervised learning process involves:

* Feeding labeled data into the model
* Generating predictions
* Calculating error using a loss function
* Updating model parameters to reduce error

This cycle repeats until performance stabilizes.

---

### 5. Generalization

The goal is not to memorize training data but to **generalize**—perform well on new, unseen examples. Proper data splitting and evaluation are critical to ensure this.

---

### 6. Advantages of Supervised Learning

* Clear learning objective due to labeled data
* Strong performance when high-quality labels are available
* Well-understood algorithms and evaluation methods

---

### 7. Limitations of Supervised Learning

* Requires large amounts of labeled data
* Labeling can be expensive and time-consuming
* Performance depends heavily on data quality

---

### 8. Key Takeaways

* Supervised learning relies on labeled datasets
* Used mainly for classification and regression
* Learning is driven by minimizing prediction error
* Generalization is the primary success criterion
