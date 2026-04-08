---
tags:
status: Not Started
start_date: 2026-03-03
end_date:
---
# Course: Supervised Learning with scikit-learn

# 1. Summary & Goals

_A brief, one-paragraph description of the course. What are its main objectives? Why am I taking it, and what key skills do I expect to gain?_

---
# 2. Core Concepts & Notes

_This is the central index for this course. As I create new atomic notes, I will link them here under the relevant module or topic._

## Chapter 1: Classification
### 01 - Machine learning with scikit-learn

1. [[Fundamental - Machine Learning]]
2. [[ML - Unsupervised Learning]]
3. [[ML - Supervised Learning]]
4. [[ML - Classification]]
5. [[ML - Binary Classification]]
6. [[ML - Regression 1]]
7. [[ML - Classification vs Regression]]
8. [[ML - Features (Predictor Variables)]]
9. [[ML - Target Variable (Response Variable)]]
10. [[ML - Data Requirements for Supervised Learning]]
11. [[ML - scikit-learn Workflow]]
12. [[ML - k-Nearest Neighbors (KNN)]]
### 02 - The classification challenge

1. [[ML - Classification 1]]
2. [[ML - Classification Workflow]]
3. [[ML - Training Data]]
4. [[ML - k-Nearest Neighbors (KNN) 1]]
5. [[ML - KNN Intuition]]
6. [[ML - Majority Voting in KNN]]
7. [[ML - Effect of 'k' in KNN]]
8. [[ML - Decision Boundary]]
9. [[ML - KNN Implementation Workflow with Scikit-learn]]
10. [[ML - KNeighborsClassifier]]
11. [[ML - Scikit-learn Data Format (Features & Target)]]
12. [[ML - Fitting a Model with .fit()]]
13. [[ML - Making Predictions with .predict()]]
### 03 - Measuring model performance

1. [[ML - Model Performance Evaluation]]
2. [[ML - Accuracy Metric]]
3. [[ML - Train-Test Split]]
4. [[ML - train_test_split Function]]
5. [[ML - Stratified Splitting]]
6. [[ML - Model Complexity]]
7. [[ML - Overfitting]]
8. [[ML - Underfitting]]
9. [[ML - KNN Decision Boundary & K Value Relationship]]
10. [[ML - Model Complexity Curve]]
11. [[ML - Plotting a KNN Model Complexity Curve]]

## Chapter 2: Regression
### 01 - Introduction to regression

1. [[ML - Regression]]
2. [[ML - Women's Health Dataset for Regression Example]]
3. [[ML - Preparing Data for scikit-learn (X and y)]]
4. [[ML - Reshaping Single-Feature Arrays for scikit-learn]]
5. [[ML - Visualizing Feature-Target Relationship with Scatter Plots]]
6. [[ML - Linear Regression 1]]
7. [[ML - scikit-learn Regression Model Workflow (Fit/Predict)]]
8. [[ML - Visualizing the Line of Best Fit]]
### 02 - The basics of linear regression

1. [[ML - Linear Regression]]
2. [[ML - Simple Linear Regression]]
3. [[ML - Model Parameters (Coefficients)]]
4. [[ML - Loss Function]]
5. [[ML - Residuals]]
6. [[ML - Residual Sum of Squares (RSS)]]
7. [[ML - Ordinary Least Squares (OLS)]]
8. [[ML - Multiple Linear Regression]]
9. [[ML - Linear Regression with scikit-learn]]
10. [[ML - Regression Model Evaluation]]
11. [[ML - R-squared (R²)]]
12. [[ML - Mean Squared Error (MSE)]]
13. [[ML - Root Mean Squared Error (RMSE)]]
### 03 - Cross-validation

1. [[ML - Limitations of Train-Test Split]]
2. [[ML - Cross-Validation]]
3. [[ML - K-Fold Cross-Validation]]
4. [[ML - K-Fold Cross-Validation Process]]
5. [[ML - Number of Folds & Computational Cost Relationship]]
6. [[ML - K-Fold Cross-Validation with Scikit-learn]]
7. [[ML - Cross-Validation Scores]]
8. [[ML - Interpreting Cross-Validation Results]]
### 04 - Regularized regression

1. [[ML - Regularized Regression]]
2. [[ML - Regularization]]
3. [[ML - Ridge Regression (L2)]]
4. [[ML - Alpha Hyperparameter in Regularization]]
5. [[ML - Ridge Regression Implementation in scikit-learn]]
6. [[ML - Lasso Regression (L1)]]
7. [[ML - Lasso Regression Implementation in scikit-learn]]
8. [[ML - Lasso for Feature Selection]]
9. [[ML - Feature Importance Analysis with Lasso]]
10. [[ML - Ridge (L2) vs Lasso (L1) Regression]]

## Chapter 3: Fine-Tuning Your Model
### 01 - How good is your model

1. [[ML - Limitations of Accuracy]]
2. [[ML - Class Imbalance]]
3. [[ML - Confusion Matrix]]
4. [[ML - True Positives (TP)]]
5. [[ML - True Negatives (TN)]]
6. [[ML - False Negatives (FN)]]
7. [[ML - False Positives (FP)]]
8. [[ML - Precision]]
9. [[ML - Recall (Sensitivity)]]
10. [[ML - F1-Score]]
11. [[ML - Generating a Classification Report with scikit-learn]]
### 02 - Logistic regression and the ROC curve

1. [[ML - Logistic Regression]]
2. [[ML - Logistic Regression Workflow in Scikit-learn]]
3. [[ML - predict_proba Method]]
4. [[ML - Probability Threshold]]
5. [[ML - Receiver Operating Characteristic (ROC) Curve]]
6. [[ML - Plotting an ROC Curve in Scikit-learn]]
7. [[ML - Area Under the Curve (AUC)]]
8. [[ML - ROC Curve & AUC Relationship]]
9. [[ML - Calculating AUC in Scikit-learn]]
### 03 - Hyperparameter tuning

1. [[ML - Hyperparameter Tuning]]
2. [[ML - Hyperparameters]]
3. [[ML - Hyperparameter Tuning & Cross-Validation Relationship]]
4. [[ML - Grid Search]]
5. [[ML - GridSearchCV]]
6. [[ML - Randomized Search]]
7. [[ML - RandomizedSearchCV]]
8. [[ML - Grid Search vs Randomized Search]]

## Chapter 4: Preprocessing and Pipelines
### 01 - Preprocessing data

1. [[ML - Data Preprocessing]]
2. [[ML - Scikit-learn Data Requirements]]
3. [[ML - Categorical Data]]
4. [[ML - Dummy Variables]]
5. [[ML - Dropping the First Dummy Variable]]
6. [[ML - OneHotEncoder vs get_dummies]]
7. [[ML - Creating Dummy Variables with Pandas]]
8. [[ML - Data Preprocessing & Model Fitting Relationship]]
9. [[ML - Negative Mean Squared Error in Scikit-learn]]
10. [[ML - Calculating RMSE from neg_mean_squared_error]]
### 02 - Handling missing data

1. [[ML - Missing Data]]
2. [[ML - Dropping Missing Data]]
3. [[ML - Data Imputation]]
4. [[ML - Mean Imputation]]
5. [[ML - Median Imputation]]
6. [[ML - Most Frequent Imputation]]
7. [[ML - Data Leakage]]
8. [[ML - Data Imputation & Data Leakage Relationship]]
9. [[ML - Imputation Workflow with SimpleImputer]]
10. [[ML - Transformers (scikit-learn)]]
11. [[ML - scikit-learn Pipelines]]
12. [[ML - Building a scikit-learn Pipeline]]
13. [[ML - scikit-learn Pipeline Structure]]
### 03 - Centering and scaling

1. [[ML - Feature Scaling]]
2. [[ML - Standardization (Z-score Normalization)]]
3. [[ML - Normalization (Min-Max Scaling)]]
4. [[ML - Data Leakage 1]]
5. [[ML - Feature Scaling & Model Performance Relationship]]
6. [[ML - Feature Scaling with StandardScaler Workflow]]
7. [[ML - Scikit-learn Pipelines 1]]
8. [[ML - Building a Preprocessing and Model Pipeline]]
9. [[ML - Hyperparameter Tuning with Pipelines using GridSearchCV]]

---
# 3. Key Takeaways & Reflections

_After completing the course, what are the 2-3 most important ideas that I will carry forward? Were there any "aha!" moments that connected this topic to others in a new way?_

- **Everything covered in this course:** [[ - Major Takeaway note]]
- **Cheat Sheet:** [[ - Cheat sheet]]

---
# 4. Related Projects & Applications

_A list of projects where I have applied the skills from this course. This directly links my theoretical knowledge to practical, portfolio-worthy application._

- **Exercises:** [[ - Exercise plan]]

---

- **Created Plans:**
	1. [x] [[ML - Learning From Data 297]]
	2. [x] [[ML - Classify and Conquer 401]]
	3. [x] [[ML - Splitting and Scoring 673]]
	4. [x] [[ML - Continuous Predictions 897]]
	5. [x] [[ML - Finding The Best Fit 856]]
	6. [x] [[ML - Robust Model Validation 278]]
	7. [x] [[ML - Shrinking Coefficients 608]]
	8. [x] [[ML - Matrix Of Truth 385]]
	9. [x] [[ML - Probability And Performance 356]]
	10. [x] [[ML - Tuning The Knobs 295]]
	11. [x] [[ML - Categorical Cleanup 596]]
	12. [x] [[ML - Data Integrity 377]]
	13. [x] [[ML - Scaling The Heights 522]]
	14. [ ] [[ML - Model Showdown 127]]
	15. [ ] [[ML - Predictive Recap 650]]