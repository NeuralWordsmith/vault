---
source:
  - "[[Understanding Machine Learning]]"
related:
  - "[[ML - What is machine learning]]"
  - "[[ML - Machine Learning Workflow]]"
---

### 1. Data in Machine Learning

Data is the foundation of machine learning. It consists of examples that the model uses to learn patterns. Each example is typically represented as:

* **Features**: Input variables describing the data
* **Labels**: Desired outputs (only in supervised learning)

The quality and quantity of data directly affect model performance.

---

### 2. Features and Feature Representation

Features are measurable properties of data used by the model to make decisions. Real-world data must often be:

* Cleaned
* Normalized
* Converted into numerical form

Good feature representation simplifies learning and improves accuracy.

---

### 3. Training and Testing Data

To evaluate learning properly, data is split into:

* **Training data**: Used to train the model
* **Testing data**: Used to evaluate performance on unseen data

This separation ensures the model is not simply memorizing examples.

---

### 4. Model

A model is a mathematical function that maps inputs (features) to outputs (predictions). During training, the model’s internal parameters are adjusted to better fit the data.

Different problems require different model types, ranging from simple linear models to complex neural networks.

---

### 5. Loss Function

The loss function measures how far the model’s predictions are from the actual values. It provides a numerical signal indicating:

* How well the model is performing
* How much improvement is needed

Lower loss means better model performance.

---

### 6. Optimization and Learning Process

Learning occurs through optimization:

* The model makes predictions
* The loss is calculated
* Parameters are updated to reduce the loss

This process is repeated iteratively until the model converges or performance stabilizes.

---

### 7. Overfitting and Underfitting

* **Underfitting** occurs when the model is too simple to capture patterns in data.
* **Overfitting** occurs when the model memorizes training data and fails to generalize.

The goal is to achieve a balance where the model performs well on unseen data.

---

### 8. Generalization

Generalization is the model’s ability to perform well on new, unseen data. It is the primary objective of machine learning and the key indicator of real-world usefulness.

---

### 9. Key Takeaways

* Data quality is critical for learning
* Features define how data is understood by the model
* Models learn by minimizing loss
* Proper evaluation prevents misleading results
* Generalization is the ultimate goal of machine learning
