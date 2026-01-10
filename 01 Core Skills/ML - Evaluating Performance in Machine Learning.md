---
source:
  - "[[Understanding Machine Learning]]"
related:
  - "[[ML - Unsupervised Learning Introduction]]"
  - "[[ML - Improving Performance in Machine Learning]]"
  - "[[ML - Supervised Learning Introduction]]"
---
### 1. Purpose of Model Evaluation

Model evaluation determines how well a machine learning model performs and how reliably it will work on new, unseen data. Evaluation is essential to:

* Measure effectiveness
* Compare different models
* Detect overfitting or underfitting

---

### 2. Training vs. Testing Performance

A model may perform well on training data but poorly on new data. Therefore:

* **Training performance** measures how well the model learned the examples it saw
* **Testing performance** measures generalization to unseen data

Good generalization is the primary goal.

---

### 3. Evaluation Metrics

Different problems require different metrics.

#### a. Classification Metrics

* **Accuracy**: Proportion of correct predictions
* **Precision**: Correct positive predictions out of all predicted positives
* **Recall**: Correct positive predictions out of all actual positives

Each metric highlights a different aspect of performance.

#### b. Regression Metrics

* **Mean Squared Error (MSE)**: Average squared prediction error
* **Mean Absolute Error (MAE)**: Average absolute prediction error

Lower error values indicate better performance.

---

### 4. Overfitting and Underfitting Revisited

Evaluation helps identify:

* **Overfitting**: High training performance, low testing performance
* **Underfitting**: Poor performance on both training and testing data

Adjusting model complexity and data quality helps address these issues.

---

### 5. Validation Techniques

To obtain reliable evaluation results:

* Data is split into training, validation, and test sets
* Cross-validation may be used for more robust assessment

These techniques reduce bias in performance estimates.

---

### 6. Interpreting Results

Evaluation metrics must be interpreted in context:

* Business objectives
* Cost of errors
* Data imbalance

No single metric is universally best.

---

### 7. Key Takeaways

* Evaluation measures model effectiveness and reliability
* Testing performance matters more than training performance
* Metrics depend on problem type
* Proper evaluation prevents misleading conclusions
