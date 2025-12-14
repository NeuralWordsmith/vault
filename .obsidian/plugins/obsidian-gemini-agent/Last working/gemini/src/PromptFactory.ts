// 1. ADD THIS NEW, FOCUSED PROMPT
// This is Phase 1. Its ONLY job is to segment the text.
export function createSegmentationPrompt(rawContent: string): string {
    return `You are a text segmentation expert. Your sole task is to deconstruct the "Raw Note Content" below into its smallest logical, atomic chunks.

CRITICAL INSTRUCTIONS:
- **PROCESS THE ENTIRE TEXT:** You MUST process the text from the first word to the last word. Do NOT stop after the introduction.
- **BE ATOMIC AND THOROUGH:** Your goal is to find *every* distinct concept. A typical lesson transcript should result in **at least 8-15 distinct chunks.**
- **FILTER JUNK:** You MUST filter out and **discard** any "junk" chunks. Junk chunks are asides, jokes, or tiny, content-free phrases.
    - **EXAMPLE OF JUNK TO DISCARD:** "Not that kind of modeling."
    - **EXAMPLE OF GOOD CHUNK TO KEEP:** "Supervised learning is basically a labeling machine. It takes an observation, and assigns a label to it."
- **RETURN JSON ONLY:** Your response MUST be a single, valid JSON object with one key: "segmentation_chunks".

{
  "segmentation_chunks": [
    "string chunk 1...",
    "string chunk 2...",
    "string chunk 3..."
  ]
}

Raw Note Content:
---
${rawContent}
---`;
}


// 2. ADD THIS NEW PROMPT
// This is Phase 3. It analyzes the text *after* we've categorized the chunks.
export function createAnalysisPrompt(rawContent: string, noteTitles: string[], vaultContext: string): string {
    const titlesList = noteTitles.map(title => `- ${title}`).join('\n');

    return `You are a world-class knowledge architect. Your goal is to analyze a user's source text and a list of pre-defined note titles, and generate a high-level analysis.

---
### Source Text
${rawContent}
---
### Atomic Note Titles Generated
(These are the concepts we have already decided to create notes for)
${titlesList}
---
### EXISTING KNOWLEDGE HIERARCHY
${vaultContext ? vaultContext : 'No existing hierarchy provided.'}
---

Your task is to generate the high-level analysis *for the whole text*, based on the source AND the list of note titles.

Your response MUST be a single JSON object with the following exact structure (do NOT include "segmentation_chunks" or "checklist_notes"):

{
  "note_identity": {
    "suggested_type": "If the note's primary intent is an exception to the Standard Model, provide a PascalCase name (e.g., 'ProjectUpdate'). Otherwise, return 'StandardModel'.",
    "justification": "If this is an exception, explain why. Otherwise, state that the content fits the Standard Model."
  },
  "plan_details": {
    "main_topic": "A short, 2-3 word title for the main subject. This will be the prefix for most note titles (e.g., 'ML', 'Python').",
    "unique_phrase": "A witty and fun two-or-three-word Title Case phrase."
  },
  "source_analysis": "A high-level introductory paragraph assessing the source text. What are its main themes? What is the core argument or purpose of this lesson?",
  "key_concepts": [ { "concept": "The primary concept from the text", "suggestion": "A brief explanation of why this concept is central to the lesson." }, { "concept": "Another key concept", "suggestion": "A brief explanation of its role." } ],
  "missing_connections": [
    "Identify 3-5 crucial related concepts to build a deeper understanding. Format as a wikilink."
  ],
  "provocative_questions": [
    "Pose a deep, open-ended question that challenges the user's understanding of the main topic.",
    "Pose a second question that forces the user to connect this topic to a broader concept."
  ]
}
`;
}


// 2. ADD this new function to PromptFactory.ts
// This prompt will be called in a loop, once for each chunk.
export function createCategorizationPrompt(chunk: string, mainTopic: string, vaultContext: string): string {
    return `You are an atomic knowledge classifier. Your job is to analyze a single chunk of text and classify it.

---
### STANDARD MODEL OF KNOWLEDGE
- **Fundamental**: The absolute cornerstones of a subject.
- **Major Core**: A broad topic that serves as a parent or mini-Map of Content (MOC).
- **Core**: An atomic, indivisible concept that stands on its own.
- **Comparison**: A side-by-side analysis of two or more concepts.
- **Process**: A step-by-step guide or workflow.
- **Cheatsheet**: A quick-reference list of commands or facts.

---
### EXISTING KNOWLEDGE HIERARCHY
${vaultContext ? vaultContext : 'No existing hierarchy provided.'}
---

Your task is to analyze the text chunk below and return a SINGLE JSON object with the exact structure for a 'checklist_notes' item:

{ 
   "title": "The full note title. Use '${mainTopic} - [Concept]' or 'Fundamental - [Concept]'", 
   "type": "The note's type from the Standard Model (e.g., 'Core', 'Major Core').", 
   "description": "A detailed description of this chunk's content for the note generation phase.",
   "parent": "(Optional) The full title of this note's direct parent note, based on the hierarchy.",
   "children": []
 }

CRITICAL INSTRUCTIONS:
- Be atomic. Your response must be about THIS CHUNK only.
- Use the EXISTING KNOWLEDGE HIERARCHY to determine the 'type' (e.g., if a parent exists, this is 'Core', not 'Fundamental') and the 'parent' field.
- The 'title' MUST follow the naming convention.

Text Chunk to Analyze:
---
${chunk}
---`;
}

export function createNotePlanPrompt(rawContent: string, vaultContext: string): string {
    return `You are a world-class knowledge architect and academic planner. Your goal is to analyze a user's source transcript (e.g., from a video or book) and structure it into a consistent, interconnected system of atomic notes based on a Standard Model and the user's existing knowledge base.

---
### SPECIAL INSTRUCTIONS FOR VISUAL ANALYSIS
If the content inside the Raw Note contains image wikilinks (e.g., '![[image.png]]'), you MUST treat those sections as visual analysis tasks.
0.  A visual analysis task may contain text context and one or more image wikilinks.
1.  Multiple distinct visual tasks can be separated by a "---" divider.
2.  You MUST identify EACH sequence and its context.
3.  For EACH separate sequence, you MUST generate its own unique entry in the "checklist_notes" array.
4.  Each of these entries MUST have its "type" set to 'Visual Analysis'.
5.  Each of these entries MUST have a unique "title" that follows the naming convention: 'Visual - [Descriptive Name]' (e.g., 'Visual - Model Architecture', 'Visual - Loss Curve Comparison').
6.  You MUST also add a corresponding wikilink for each title to the "note_categories" section.
7.  CRITICAL: Copy the image wikilinks (e.g., '![[image.png]]') and paste them respectively under the description of only notes titles of "Visual Analysis" notes, not in new lines but like seamless paragraph example -  "description paragraph. ![[image.png]]",  under notes plan section.

---
### THE STANDARD MODEL OF KNOWLEDGE
You MUST classify concepts into one of the following standard types whenever possible:
- **Fundamental**: The absolute cornerstones of a subject.
- **Major Core**: A broad topic that serves as a parent or mini-Map of Content (MOC). It's a concept that you will be breaking down into multiple, more specific Core notes.
- **Core**: An atomic, indivisible concept that stands on its own. It is a child concept, not a parent to other core ideas.
- **Comparison**: A side-by-side analysis of two or more concepts, focusing on their similarities and differences.
- **Relationship**: A concise note that explicitly defines the connection between two other concepts (e.g., cause-and-effect, prerequisite-for).
- **Process**: A step-by-step guide or workflow.
- **Cheatsheet**: A quick-reference list of commands or facts.

---
${vaultContext ? `
### EXISTING KNOWLEDGE HIERARCHY
Here is a map of the user's existing high-level notes. You MUST use this as ground truth for all hierarchical decisions.
${vaultContext}
---` : ''}

### GUIDING PRINCIPLES
1.  **Deconstruct the Transcript by Semantic Shifts:** The "Raw Note Content" is a flat video transcript or a section of a book with no visual slide breaks. Your most important task is to re-create the intended logical structure by identifying "semantic shifts" in the text and use standard model to break down everything into atomic notes. You MUST segment the transcript into distinct \`checklist_notes\` by looking for these cues:
        **Introduction of a New Key Term:** When a new concept is defined for the first time (e.g., "Supervised learning is...").
        **A Topic Shift:** When the narrator clearly moves from one topic to another (e.g., "...Now, what about regression?").
        **A Comparison:** When two or more concepts are contrasted (e.g., "While classification assigns a category, regression assigns a continuous variable...").
        **An Example:** When a concrete example or case study is introduced (e.g., "Let's take college admissions...").
        **A Process:** When a step-by-step process is described (e.g., "We keep 80% of our data...").
2.  **Adhere to Existing Hierarchy**: Your most important task is to place new concepts correctly within the provided EXISTING KNOWLEDGE HIERARCHY.
3.  **Establish Local Hierarchy**: For concepts within the raw note, correctly identify parent-child relationships.
4.  **Prioritize the Standard Model**: Fit every concept into the Standard Model categories based on its position in the hierarchy.
5.  **Isolate Distinct Topics**: If the raw note contains multiple, clearly distinct major topics, you MUST create a separate "note_categories" entry for each one. Do not merge unrelated concepts into a single note plan.
6.  **Handle Exceptions**: If the note's primary intent CANNOT be broken down into the Standard Model, you may identify a custom note type.

---
Your response MUST be a single JSON object with the following exact structure:

{
  "note_identity": {
    "suggested_type": "If the note's primary intent is an exception to the Standard Model, provide a PascalCase name (e.g., 'ProjectUpdate'). Otherwise, return 'StandardModel'.",
    "justification": "If this is an exception, explain why. Otherwise, state that the content fits the Standard Model."
  },
  "plan_details": {
    "main_topic": "A short, 2-3 word title for the main subject. This will be the prefix for most note titles (e.g., 'ML', 'Python').",
    "unique_phrase": "A witty and fun two-or-three-word Title Case phrase."
  },
  "source_analysis": "A high-level introductory paragraph assessing the source transcript. What are its main themes? What is the core argument or purpose of this lesson?",
  "key_concepts": [ { "concept": "The primary concept from the transcript", "suggestion": "A brief explanation of why this concept is central to the lesson." }, { "concept": "Another key concept", "suggestion": "A brief explanation of its role." } ],
  "missing_connections": [
    "Identify 3-5 crucial related concepts to build a deeper understanding. Format as a wikilink."
  ],
  "provocative_questions": [
    "Pose a deep, open-ended question that challenges the user's understanding of the main topic.",
    "Pose a second question that forces the user to connect this topic to a broader concept."
  ],
  "note_categories": [
    {
      "category_title": "Category title based on the Standard Model (e.g., 'Fundamental Concepts 🧠').",
      "category_description": "A brief one-sentence description of this category.",
      "notes": [
        { "title": "The full, final title of the note." }
      ]
    }
  ],
  "checklist_notes": [
     { 
       "title": "The note title.", 
       "type": "The note's type from the Standard Model or a custom type.", 
       "description": "The detailed description for the note generation phase.",
       "parent": "(Optional) The full title of this note's direct parent note.",
       "children": [
         "(Optional) A list of the full titles of this note's direct children notes."
       ]
     }
  ]
}

CRITICAL INSTRUCTIONS:
- You MUST place all new concepts within the provided EXISTING KNOWLEDGE HIERARCHY. Do not create a 'Fundamental' note for a topic that is clearly a sub-field of an existing one.
- The titles in 'checklist_notes' MUST follow the naming conventions:
  - 'Fundamental' type: "Fundamental - [Concept]".
  - All other types: "[Main Topic] - [Concept]".
- **Rule of Hierarchy**: If a concept in the raw note is a clear sub-topic of ANY note listed in the EXISTING KNOWLEDGE HIERARCHY, you MUST classify it as a 'Major Core' or 'Core' note. You are strictly forbidden from creating a new 'Fundamental' note if a suitable parent already exists in the hierarchy.

---
### DECONSTRUCTION TASK (MOST IMPORTANT)
You are about to receive the source text. You MUST process the *entire* text from beginning to end. Your plan must be comprehensive and include an entry in \`checklist_notes\` for *every* distinct concept, definition, example, and process mentioned, not just the introductory ones. This is the primary goal.

Raw Note Content:
---
${rawContent}
---`;
}

/*
DEPRECATED: This function is no longer needed as prompts are now built dynamically
based on the placeholders found in template files. See ToolManager.ts for the new logic.

export function generateNoteContentPrompt(title: string, type: string, context: string): string {
    // ... old code was here ...
}
*/

export function createAnswerReviewPrompt(fullNoteContent: string): string {
    return `You are a world-class Machine Learning expert and Socratic tutor.
The user has provided a note that contains both your previously generated questions and their new answers.
Your task is to:
1.  Carefully analyze the user's answers in the "My Synthesis & Answers" section.
2.  Provide constructive, insightful feedback on their understanding.
3.  Identify any misconceptions, or areas where their understanding could be deepened.
4.  Praise what they understood correctly.
5.  Your tone should be encouraging and that of a senior mentor guiding a junior colleague.

CRITICAL INSTRUCTION: Your entire response should be formatted in Markdown, ready to be appended directly to the end of their note. Start with a timestamped level-3 heading.

Full Note Content (Questions and User's Answers):
---
${fullNoteContent}
---`;
}

export function createKeywordExtractionPrompt(textToSummarize: string): string {
    return `From the following text, extract the 5-7 most important technical concepts or keywords. The user is a machine learning engineer, so favor specific, technical terms.
Return them as a single, comma-separated string with no introduction or explanation.

Example: Generalization, Transfer Learning, Data Efficiency, Catastrophic Forgetting

Text to analyze:
---
${textToSummarize}
---`;
}

export function createTemplateMatchingPrompt(suggestedType: string, templateFileNames: string[]): string {
    const templateList = templateFileNames.map(name => `- "${name}"`).join('\n');

    return `You are a file routing assistant. Your task is to match a suggested note type to the best available template file.

A user's note has been identified with the type: "${suggestedType}".

Here is a list of available template files:
${templateList}

Review the list and return the single, full filename of the best match.

CRITICAL INSTRUCTIONS:
- If you find a clear and obvious match, return only its full filename.
- If no template in the list is a good fit for the suggested type, return the exact string "null".
- Do not add any explanation or commentary.`;
}

export function createTemplateDraftPrompt(
    suggestedType: string,
    rawContent: string,
    fewShotExamples: { fileName: string, content: string }[]
): string {
    let examplesSection = "";
    for (const example of fewShotExamples) {
        examplesSection += `
---
### Example Template: "${example.fileName}"
---
${example.content}
---
`;
    }

    return `You are an expert template architect for an Obsidian personal knowledge management system.
Your task is to create a new, well-structured template that is perfectly consistent with the provided style guide examples.

First, carefully study the style and structure of these examples:
${examplesSection}

Note their consistent use of YAML frontmatter, Markdown headings, wikilinks, and italicized instructional text.

---
### YOUR TASK
---

A new note type has been identified: "${suggestedType}".

Here is the raw content of the note that needs this new template:
\`\`\`
${rawContent}
\`\`\`

Based on the style guide examples and the content of the raw note, generate the full Markdown content for a new template file named "${suggestedType} Template.md".

CRITICAL INSTRUCTIONS:
- Your entire response must be ONLY the raw Markdown content for the new template file.
- Do not include any commentary, explanation, or code blocks like \`\`\`markdown.
- The new template must be as consistent as possible with the provided examples.`;
}


export function createMathExplanationPrompt(conceptName: string, equation: string, contextSnippet: string): string {
    return `You are an expert Machine Learning educator. Your task is to explain a mathematical formula in a clear, structured way.

The formula comes from the concept of "${conceptName}".
The formula is: ${equation}

This is the context from the original note where the formula appeared. USE THIS to understand the formula's specific role:
---
${contextSnippet}
---

You MUST return a single, valid JSON object with the following keys. Do not include any other text or markdown formatting.

{
  "why_goal": "A concise, one or two-sentence explanation of the GOAL. Why does this formula exist? What problem does it solve in this specific context?",
  "how_deconstructed": "A bulleted list explaining the components of the formula. This should be an array of strings.",
  "when_application": "A bulleted list explaining the practical application. When should this be used? When should it NOT be used? This should be an array of strings.",
  "related_concepts": "An array of 2-4 relevant concepts as wikilinks (e.g., '[[ML - Precision]]')."
}

CRITICAL INSTRUCTIONS:
- Ensure all mathematical variables and symbols in your explanations are wrapped in LaTeX dollars signs (e.g., $y_i$).
- All backslashes in the JSON response MUST be double-escaped (e.g., "$y_i - \\\\hat{y}_i$").
`;
}

export function createVisualAnalysisPrompt(context: string, imageCount: number): string {
    const sequenceInstruction = imageCount > 1 
        ? "The user has provided a sequence of images that represent an evolving visual. Your primary task is to describe the evolution and the changes between the images in your analysis."
        : "The user has provided a single image for analysis.";

    return `You are an expert technical analyst.
${sequenceInstruction}

Here is the context from the user's notes:
---
CONTEXT:
${context}
---

Your task is to analyze the image(s) using the Five-Step Visual Deconstruction Method. Your response MUST be a single, valid JSON object with the following exact keys. Populate each key with your detailed analysis.

{
  "identification": "Classify the visual (e.g., 'Scatter plot', 'Neural network architecture diagram'). If it's a sequence, describe the initial state.",
  "deconstruction": "Break down the components of the final visual. If it's a sequence, mention what new components were added or changed. Break down the visual's components (axes, labels, nodes, arrows, etc.). Format as a Markdown list.",
  "interpretation": "Explain the main story or key insights the visual is conveying. If it's a sequence, focus on what the evolution or change between the images demonstrates. Format as a paragraph.",
  "critical_questions": "Pose 2-3 deep questions about the visual's limitations, implications, or what it might not be showing. Format as a Markdown list.",
  "conclusion": "What is the single most important idea this visual (or sequence) is trying to prove or demonstrate? The 'so what?'."
}
`;
}

export function createMathContextPrompt(equation: string, context: string): string {
    return `
You are a machine learning expert tasked with creating a clear summary for a mathematical equation.

Analyze the provided LaTeX equation and the surrounding text context it was found in.

Your goal is to understand the equation's purpose and role within the text.

**Equation:**
\`\`\`latex
${equation}
\`\`\`

**Surrounding Context:**
\`\`\`
${context}
\`\`\`

You MUST return a single, valid JSON object with two keys: "title" and "description".

- "title": A clear, descriptive name for the equation (e.g., "L1 Penalty Term", "Mean Squared Error Loss").
- "description": A concise, one-sentence explanation of what the equation represents or calculates in this specific context.

Example JSON response format:
\`\`\`json
{
  "title": "Example Equation Title",
  "description": "This is a one-sentence description of the equation's purpose based on the context."
}
\`\`\`
`;
}

export function createAtomicMathNotePrompt(title: string, equation: string, description: string): string {
    return `
You are a machine learning professor creating a detailed, standalone educational note about a specific mathematical concept.

The concept is **"${title}"**.

Its core purpose is: **"${description}"**.

The equation is:
\`\`\`latex
${equation}
\`\`\`

Based on this, you MUST return a single, valid JSON object with the following keys:

- "why_goal": (String) A paragraph explaining the primary goal of this equation.
- "how_deconstructed": (Array of Objects) A bulleted list breaking down each component. Each object MUST have a "content" key.
- "when_application": (Array of Objects) A bulleted list of practical scenarios. Each object MUST have a "content" key.
- "related_concepts": (Array of Objects) A bulleted list of related concepts. Each object MUST have a "content" key.
- "code_snippet": (String) A concise Python snippet (using NumPy) that implements the equation. If no simple code translation exists, return an empty string.
- "tags_keywords": (Array of strings) 3-4 relevant, lowercase, snake_case keywords.
- "related_links_for_yaml": (Array of strings) 5-7 wikilinks to related concepts.

---
### CRITICAL INSTRUCTIONS FOR LATEX FORMATTING
You MUST adhere to the following strict rules for all mathematical notation:
1.  **Mandatory LaTeX**: Format ANY and ALL mathematical variables (e.g., J, θ, λ), symbols, and equations using LaTeX. There are no exceptions.
2.  **CRITICAL - Use Delimiters**: You MUST use **single dollar signs (\`\$...\$\`)** for all inline variables or symbols (e.g., the learning rate \`\$\\lambda\$\`). This is the most important rule.
3.  **JSON Backslash Escaping**: All backslashes (\\) in your response, especially within LaTeX code, MUST be properly escaped with a double backslash (\\\\). For example, to represent \`$\\theta$\`, the JSON value MUST be \`"$\\\\theta$"\`.
---

Example JSON response format:
\`\`\`json
{
  "why_goal": "The primary goal of this equation is to...",
  "how_deconstructed": [
    { "content": "The term '$J(\\\\theta)$' represents the cost function." },
    { "content": "The symbol '$\\\\lambda$' is the regularization hyperparameter." }
  ],
  "when_application": [
    { "content": "Used in models like Logistic Regression to measure error." }
  ],
  "related_concepts": [
    { "content": "Gradient Descent" }
  ],
  "code_snippet": "import numpy as np\\n\\ndef binary_cross_entropy(y_true, y_pred):\\n    return -np.mean(y_true * np.log(y_pred) + (1 - y_true) * np.log(1 - y_pred))",
  "tags_keywords": [
    "cost_function",
    "binary_classification"
  ],
  "tags_keywords": [
    "cost_function",
    "binary_classification"
  ],
  "related_links_for_yaml": [
    "ML - Logistic Regression",
    "ML - Gradient Descent"
  ]
}
\`\`\`
`;
}

export function createCodeLabPrompt(
    conceptName: string, 
    primaryGoal: string, 
    mechanism: string, 
    keyParameters: string, 
    coreTradeoffs: string
): string {
    return `
You are a senior Machine Learning Engineer and expert educator at Google. Your task is to create a comprehensive, hands-on 'learning lab' note for a student. The note must be structured, pedagogical, and deeply connect theory to practice.

The concept is **"${conceptName}"**.

You will be given several pieces of context from the student's main theoretical note on this topic. You MUST use this context to inform your answers.

---
### THEORETICAL CONTEXT
---

**1. Primary Goal of the Concept:**
${primaryGoal}

**2. Core Mechanism (How it works):**
${mechanism}

**3. Key Hyperparameters:**
${keyParameters}

**4. Core Tradeoffs (e.g., Bias-Variance):**
${coreTradeoffs}

---
### YOUR TASK
---

You MUST generate a single, valid JSON object that contains all the content for the learning lab note. Adhere strictly to the following keys and instructions:

{
  "goal_statement": "(String) A single, concise sentence stating the primary objective of this code implementation. Example: 'To implement a ${conceptName} model to solve a binary classification problem and visualize its linear decision boundary.'",
  "core_concepts": "(Array of Objects) A list of the 2-3 most critical theoretical concepts this code demonstrates. Each object MUST have two keys: 'concept' (a string with the concept name) and 'description' (a string explaining its role in the code).",
  "dependencies_block": "(String) The full Python import block. Include numpy, scikit-learn, matplotlib, and seaborn. Ensure you import the right data generator (e.g., 'make_classification') and metrics for the task.",
  "implementation_block": "(String) The complete, runnable Python code for the implementation. It MUST be heavily commented and structured with numbered steps: 1. Data Generation, 2. Preprocessing (like StandardScaler), 3. Model Training, 4. Results & Evaluation. Use the context provided about the mechanism to write relevant comments.",
  "visualization_block": "(String) The Python code block for visualizing the results. This is critical. For classifiers, plot the decision boundary. For clustering, plot the clusters. For regression, plot the regression line against the data.",
  "analysis_observations": "(String) A Markdown-formatted bulleted list explaining the key results. State the direct outputs (e.g., 'The model achieved an accuracy of 98% on the test set.') and what the visualization shows (e.g., 'The plot clearly shows a linear decision boundary separating the two classes.')",
  "analysis_theory_connection": "(String) A Markdown-formatted paragraph explaining WHY the results occurred, explicitly connecting them back to the provided theoretical context. Reference the mechanism you were given.",
  "analysis_practical_implications": "(String) A Markdown-formatted paragraph on the practical, real-world implications. When would you use this? What are its strengths in a project?",
  "experimentation_ideas": "(Array of Objects) A list of 2-3 specific, hands-on experiments a user could try. Use the 'Key Hyperparameters' context to create these. Each object must have two keys: 'idea' (e.g., 'Change a key hyperparameter') and 'prompt' (e.g., 'What happens to the decision boundary if you increase the regularization strength C to 100? Modify the 'C' parameter in the model instantiation and re-run the visualization.').",
  "pitfalls_preprocessing": "(String) Explain the critical preprocessing needs for this algorithm (e.g., 'This model is sensitive to feature scales, so StandardScaler is essential...').",
  "pitfalls_assumptions": "(String) List the key assumptions the model makes about the data, based on the provided context.",
  "pitfalls_failure_modes": "(String) Describe common situations where this algorithm performs poorly, referencing the 'Core Tradeoffs' context.",
  "related_concepts_yaml": "(Array of Strings) A list of 3-5 wikilinks to closely related concepts (e.g., 'ML - Feature Scaling', 'ML - Model Validation').",
  "topic_tag": "(String) A single, relevant snake_case tag for the YAML frontmatter based on the concept (e.g., 'classification', 'regularization')."
}

CRITICAL INSTRUCTIONS:
- The generated code MUST be fully runnable and self-contained.
- The analysis MUST go beyond describing the code and connect back to the provided theory.
- The entire response MUST be a single, valid JSON object. Double-escape all backslashes (e.g., \\n).
`;
}