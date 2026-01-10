---
tags:
  - machine-learning
status: Completed
start_date: 2025-08-12
end_date: 2026-01-10
---
# Course: Understanding Machine Learning

## 1. Summary & Goals

What's behind the machine learning hype? In this non-technical course, you’ll learn everything you’ve been too afraid to ask about machine learning. There’s no coding required. Learn how this exciting technology powers everything from self-driving cars to your personal Amazon shopping suggestions.

How does machine learning work, when can you use it, and what is the difference between AI and machine learning? They’re all covered. Gain skills in this hugely in-demand and influential field, and discover why machine learning is for everyone!

## 2. Core Concepts & Notes

_This is the central index for this course. As I create new atomic notes, I will link them here under the relevant module or topic._

### Chapter 1: What is Machine Learning?

- [[ML - What is machine learning]]
- [[ML - Machine Learning Concepts]]
- [[ML - Machine Learning Workflow]]

This section establishes the mental contract of machine learning: you are not writing rules but setting up conditions under which rules can be learned from data, which is the decisive shift captured in [[ML - What is machine learning|what “learning” actually means in ML]] and reinforced by the contrast with traditional programming in that same note. Everything else here serves that contract. Data is not a passive input but the primary constraint on outcomes, and understanding the roles of [[ML - Machine Learning Concepts|features, labels, and data splits]] is mandatory because they determine what a model can even express and whether its performance claims are trustworthy. The model itself is best treated as a parameterized function whose behavior is shaped indirectly through a [[ML - Machine Learning Concepts|loss function and optimization loop]], not as an intelligent actor, which helps avoid anthropomorphic reasoning. The central risk boundary you must internalize now is the tension between [[ML - Machine Learning Concepts|overfitting, underfitting, and generalization]], because real-world value exists only on unseen data. The [[ML - Machine Learning Workflow|end-to-end workflow]] matters less for memorization and more as a diagnostic map for where failures originate. If you leave this section knowing that _ML success is measured by generalization, not training performance_, and that _data quality and representation dominate model choice in leverage_, you are correctly calibrated for everything that follows.

- **Must-read from this section:**
    - [[ML - What is machine learning|What ML actually is]] – anchors the rule-learning vs rule-writing mental shift
    - [[ML - Machine Learning Concepts|Core ML building blocks]] – defines the non-negotiable technical vocabulary that everything else composes from
    - [[ML - Machine Learning Workflow|ML workflow]] – provides a failure-localization map rather than a procedural checklist
- **Revisit this section when**
    - You are unsure whether poor results are due to data, model capacity, or evaluation setup
    - Training accuracy looks strong but real-world performance degrades
    - You begin tuning models without being clear on what “success” means
    - You are about to deploy or monitor a model and need to reason about drift and maintenance

### Chapter 2: Machine Learning Models

- [[ML - Supervised Learning Introduction]]
- [[ML - Unsupervised Learning Introduction]]
- [[ML - Evaluating Performance in Machine Learning]]
- [[ML - Improving Performance in Machine Learning]]

This section draws a practical boundary around how learning setups, evaluation, and improvement decisions fit together in real systems: supervised learning exists only where labels provide a learning signal, which constrains both what problems are solvable and where cost enters through labeling effort as outlined in [[ML - Supervised Learning Introduction|the role and limits of supervised learning]]. Unsupervised learning, by contrast, trades certainty for discovery, offering structural insight and feature compression without ground truth, which is powerful but inherently ambiguous as emphasized in [[ML - Unsupervised Learning Introduction|the exploratory nature and risks of unlabeled learning]]. Performance evaluation is the control surface that prevents self-deception; understanding why testing performance dominates training performance and why no single metric is universally correct is non-negotiable, as grounded in [[ML - Evaluating Performance in Machine Learning|evaluation purpose, metrics, and validation]]. Improvement work should be interpreted as leverage allocation rather than algorithm worship: most gains come from data quality, feature representation, and problem framing long before hyperparameters matter, a hierarchy made explicit in [[ML - Improving Performance in Machine Learning|the improvement levers and iteration loop]]. Advanced tuning, regularization variants, and metric nuance can be deferred until decisions meaningfully change outcomes. If you leave this section knowing _when a problem genuinely requires labels versus exploration_, and _that evaluation and generalization, not raw accuracy, define real performance_, you are correctly calibrated for everything that follows.


- **Must-read from this section:**
    - [[ML - Evaluating Performance in Machine Learning|Evaluation fundamentals]] – prevents misleading conclusions and false confidence      
    - [[ML - Supervised Learning Introduction|Supervised learning boundaries]] – clarifies when labels are required and why cost matters       
    - [[ML - Improving Performance in Machine Learning|Performance improvement levers]] – establishes where effort actually pays off       
- **Revisit this section when**   
    - A model performs well in training but fails after deployment     
    - You are unsure whether to gather more data, change features, or tune the model        
    - You need to choose between supervised and unsupervised approaches for a new problem        
    - Evaluation metrics appear to conflict with real-world expectations
### Chapter 3: Deep Learning

- [[ML - Deep Learning Introduction]]
- [[ML - Computer Vision Introduction]]
- [[ML - Natural Language Processing Introduction]]
- [[ML - Limits of Machine Learning]]

This section frames where modern ML meaningfully works, where it breaks, and why deep learning underpins both outcomes: deep learning matters not because it is “advanced,” but because layered neural networks can learn hierarchical representations directly from raw data, which is the enabling mechanism behind modern vision and language systems as explained in [[ML - Deep Learning Introduction|why depth and automatic feature learning change the ceiling of ML]]. That same strength defines a boundary—these models scale with data and compute, incur interpretability costs, and amplify data flaws rather than correcting them, a limitation you must internalize early per [[ML - Limits of Machine Learning|data dependence, generalization limits, and lack of common sense]]. Computer vision operationalizes deep learning on pixel grids, where invariance to lighting, scale, and occlusion becomes the core risk surface, not algorithm choice, as grounded in [[ML - Computer Vision Introduction|vision tasks and real-world challenges]]. NLP applies similar machinery to language, but with higher ambiguity and contextual fragility, making representation choices decisive and errors harder to reason about, as outlined in [[ML - Natural Language Processing Introduction|the nature of language data and NLP challenges]]. You do not need architectural detail yet; you do need clarity on capability boundaries and failure modes. If you leave this section knowing _that deep learning’s power comes from representation learning, not intelligence_, and _that vision and language systems fail predictably outside their training and context assumptions_, you are correctly calibrated for everything that follows.

- **Must-read from this section:**
    - [[ML - Limits of Machine Learning|Limits of ML]] – defines non-negotiable boundaries and failure modes    
    - [[ML - Deep Learning Introduction|Deep learning foundations]] – explains why modern ML works where classical methods stall    
    - [[ML - Natural Language Processing Introduction|NLP fundamentals]] – highlights ambiguity and representation risk unique to language    
- **Revisit this section when**
    - A model behaves confidently but fails in unfamiliar real-world conditions    
    - You are choosing between traditional ML and deep learning for a new domain    
    - Interpretability, bias, or ethical concerns start to constrain deployment    
    - Vision or language errors appear inconsistent or hard to debug

## 3. Key Takeaways & Reflections

_After completing the course, what are the 2-3 most important ideas that I will carry forward? Were there any "aha!" moments that connected this topic to others in a new way?_

## 4. Related Projects & Applications

_A list of projects where I have applied the skills from this course. This directly links my theoretical knowledge to practical, portfolio-worthy application._

- [[ ]]