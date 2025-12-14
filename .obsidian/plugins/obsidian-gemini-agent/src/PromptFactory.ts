const BASE_INSTRUCTIONS = `
- **Contextual Adherence**: Your absolute primary goal is to generate content that explains and elaborates on the details provided in the source material. Prioritize a clear narrative flow that *strictly follows the curriculum* from the context. Do not provide generic information. All subsequent instructions are about how to format your explanation of THIS topic.
- **JSON Backslash Escaping**: This is the MOST CRITICAL instruction. All backslashes (\\) in your response, especially within LaTeX code, MUST be properly escaped with a double backslash (\\\\).
    - **Example**: To represent the LaTeX \`$\\theta$\`, the JSON value MUST be \`"$\\\\theta$"\`.
    - **Example**: To represent \`$\\nabla J(\\theta)$\`, the JSON value MUST be \`"$\\\\nabla J(\\\\theta)$"\`.
    - Failure to do this will result in invalid JSON. This rule is non-negotiable.
`;

const INSTRUCTION_BLOCKS = {
    naming: `\n- **Naming Convention**: All wikilinks you generate MUST strictly follow the user's established naming convention. For most topics, this is "Subject - Concept" (e.g., "ML - Logistic Regression"). For fundamental topics, it is "Fundamental - Concept" (e.g., "Fundamental - Machine Learning"). Use the exact naming convention: "Subject - Concept" (e.g., "ML - Logistic Regression"). Do NOT invent new formats. If a concept exists in the existing hierarchy, use the exact full name listed there. When creating a wikilink, if the target concept is listed in the EXISTING STRUCTURAL NOTES, you MUST use its exact full name (e.g., "Fundamental - Machine Learning").`,

    new_fields: `\n- For the "concept_name" key, provide the clean concept name without the "Subject - " prefix. (e.g., if the note title is "ML - Logistic Regression", this should be "Logistic Regression").
- For the "summary.analogy_text" key, you MUST provide a powerful, real-world analogy and then **explicitly map its components to the concept's components**.
- For the "summary.analogy_breakdown" key, you MUST provide a bullet point that starts with '**Where it breaks down:**' and explains the analogy's limitations. This is vital for preventing misconceptions.`,
    
    keywords: `\n- For the "tags_keywords" key, you MUST generate an array of 3-5 relevant lowercase, snake_case technical keywords for this specific concept. This is a mandatory field. Do not include the main topic or the note type.`,
    
    related_links: `\n- For the "related_links_for_yaml" key, you MUST generate a comprehensive list of 10-15 wikilinks to closely related concepts. Think broadly: include parent concepts, child concepts, contrasting ideas, practical applications, and foundational prerequisites.`,
    
    fundamental: `\n- **Fundamental Object Logic**: You MUST structure the justification within a JSON key called "fundamental". This key must contain an object with a single sub-key: "justification".
    - "justification": A clear, concise sentence explaining why this concept is a cornerstone of the broader subject, essential for anyone to learn.`,
    
    details: `\n- **Details Object Logic (The 'Why, How, Where' Narrative)**: Your most important task is to structure the detailed explanation as a compelling story instead of a flat, unrelated list of details, using the simplest language possible. Use the sub-keys within the "details" JSON object to build this 'Why, How, Where' narrative. You should only include math where it is essential for understanding a real-world use case.

---
### **Part 0: The 'Significance' (New Top-Level Field)**
- For "**why_this_matters**": Write a single, concise, and compelling sentence that explains the real-world or technical significance of this concept. This sentence MUST connect the concept to a critical outcome.

---
### **Part 1: The 'Why' (The Introduction)**
- For "**core_idea**": Your task is to write a clear, multi-sentence introductory hook that paraphrases and synthesizes the main idea from the provided source material. The paragraph should mirror the original tone in a natural, human-like, and conversational way—similar to how a tutor would introduce the concept after that (Important), again explain what the concept is accurately, identify the field it belongs to (based on the context), mention any important or helpful background points, you can also use same or similar examples, and if not already mentioned in provided source material, end with a sentence that introduces its main categories or types in bold, if any.
- For "**primary_goal**": Write a single string explaining the easy-to-understand main reason behind the existence of this concept.

---
### **Part 2: The 'How' (The Mechanism - CHOOSE A PATH)**
Your next task is to determine if the concept is primarily **Practical (Codeable)** or **Conceptual (Theoretical)** and follow the appropriate path for the mechanism.

#### **PATH 1: If the Concept is Practical/Codeable...**
- For "**mechanism_bullets**": Outline a standard, practical workflow in a numbered, step-by-step format. These steps MUST directly correspond to the code you will provide in "mechanism_code_snippet". Each step must start with a bolded title like '**Step 1: Prepare the Data**'.
- For "**mechanism_code_snippet**": You MUST provide a Python code block that is a direct implementation of the steps from "mechanism_bullets". Use comments to explicitly label each step (e.g., \`# --- Step 1 ---\`).

#### **PATH 2: If the Concept is primarily Conceptual...**
- For "**mechanism_bullets**": Use this array to elaborate on the details of the core process and its key components, which you introduced in the core_idea paragraph.
    - The **first item** should explain the high-level process, starting with a bolded label like '**How it Works:**' and havings numbered points labeled with 1. , 2. , 3. , and so on if relevant.
    - **Subsequent items** should detail the key components or types of the main concept. Start each with a bolded title (e.g., '**Component A:**') (Don't use the word component itself).
    - Each component item MUST have **'children' bullets** that provide simple, concrete examples to illustrate it. Examples can be italicised for beautiful rendering. if examples have multiple points, write them in sperate indented points under Example:
- For "**mechanism_code_snippet**": If any mathematical expressions in mechanism_bullets are applicable in real-world use, translate them into Python code in the same sequence and explain the translation. If no expressions are applicable, You MUST return a message **nothing to fill here**.

---
### **Part 3: The 'Where' (The Broader Context)**
- For "**parameters_bullets**": Continue the 'how' by identifying the key 'levers' or hyperparameters that control the mechanism, explaining their impact.
- For "**tradeoffs_bullets**": Conclude the story by explaining 'where' this concept fits and its consequences. What are the tradeoffs of using it? What are its limitations? This connects the concept to the broader landscape.`,

    comparison: `\n        - **Comparison Logic**:
            - For "comparison.item_a" and "comparison.item_b", explicitly state the names of the two concepts being compared (e.g., "Linear Regression" and "Logistic Regression").
            - For "comparison.side_by_side_bullets", you must generate a nested list structure:
                - The **Top-Level Bullets** must be the names of the concepts being compared (e.g., "**Concept name**").
                - The **Child Bullets** must be the specific characteristics, pros, cons, or features of that concept, distinct from the other.
            - For "comparison.key_similarities", write a paragraph identifying the shared attributes or common ground between the two concepts.
            - For "comparison.verdict", provide a pragmatic "Decision Rule". (e.g., "Use X when speed is critical; use Y when accuracy is paramount.")
            - For "comparison.comparison_table", generate a Markdown table with three columns: "Feature", "Concept A", and "Concept B". Compare them across 3-5 critical dimensions.`,

    relationship: `\n        - **Relationship Logic**:
            - For "relationship.connection_type", strictly define the nature of the link (e.g., "Causal", "Sequential", "Inverse").
            - For "relationship.mechanism_of_interaction", explain the *process* by which one concept affects the other.
            - For "relationship.impact", explain the practical upshot. Why should the user care about this link?`,

    questions: `\n        - For the "questions" key, your task is to generate questions from the perspective of a senior machine learning engineer, focusing on practical trade-offs, system-level thinking, and business impact. You MUST generate one question from each of the following categories:
             1.  **Trade-off & Business Impact Question:** A question that forces the user to analyze a difficult trade-off (e.g., accuracy vs. cost, interpretability vs. performance) and connect it to a real-world business goal. (e.g., "When would you choose a less accurate but highly interpretable model over a black box model, and how would you justify the business value of this choice to a non-technical stakeholder?").
             2.  **System & Scalability Question:** A question about how this concept would be implemented and maintained within a larger production system, focusing on potential bottlenecks, data dependencies, or failure modes. (e.g., "How would you design a monitoring system to detect data drift for this model in production, and what would be your automated response?").
             3.  **Provocative 'What If' Question:** A provocative thought-experiment that challenges a core assumption of the concept or explores its absolute limits. (e.g., "What if you were forbidden from using gradient descent? How else could you find the optimal parameters for this model?").`,

    math: `\n        - **LaTeX Formatting for Formulas**: You MUST adhere to the following strict rules for all mathematical notation:
            1.  **Mandatory LaTeX**: You MUST format ANY and ALL mathematical variables (e.g., J, θ, λ), symbols, and equations using LaTeX. There are no exceptions.
            2.  **Proper Commands**: You MUST use proper LaTeX commands (e.g., \`\\theta\`, \`\\lambda\`, \`\\cdot\`). Do NOT use raw unicode characters (like θ, λ, ·).
            3.  **CRITICAL - NO PLAIN TEXT SYMBOLS**: You MUST NEVER write the names of Greek letters or other symbols as plain text inside a math block. For example, ALWAYS write \`$\lambda$\`. This is the most common mistake and you must avoid it.
            4.  **Formatting Guideline for Delimiters**: You MUST use **double dollar signs (\`\$\$...\$\$\`)** for standalone equations (e.g., any expression containing an equals sign like \`\$\$E=mc^2\$\$ \`). You MUST use **single dollar signs (\`\$...\$\`)** for all inline variables or symbols (e.g., \`\$\\lambda\$\`, \`\$\\theta\$\`).
            5.  **No Spaces Around Delimiters**: There MUST NOT be any space between the dollar sign delimiters and the start or end of the LaTeX content. For example, write \`$E=mc^2$\` instead of \`$ E=mc^2 $\`.
            6.  **Separate Text**: Keep explanatory text (e.g., "New Loss =", "Where:") **outside** of the dollar sign delimiters.
            7.  **CRITICAL - Omit Detailed Breakdowns**: Your goal is to present the core formulas that define the process. Detailed deconstructions of each variable (e.g., using a "Where:" list) should be omitted from this section.`,

    ascii_mech: `\n        - **ASCII Mechanism Diagram**: For the "details.mechanism_ascii_diagram" key (if requested by the template), you MUST generate a very simple ASCII visual aid on what this concept is about depending on the context based on the following guide. Keep it clean and simple.
            - **Flow Diagram**: Show execution flow or sequential steps.
            - **Block Diagram**: Show ML pipelines, data flow, or system architecture.
            - **Table**: Compare groups, encodings, or trade-offs.
            - **Hierarchy Tree**: Show parent/child relationships.
            - **Numeric Example**: Make abstract equations concrete.`,

    ascii_con: `\n        - **ASCII Connections Map**: For the "connections.ascii_map" key, you MUST generate a clean, spacious, minimalist ASCII diagram with the note's concept as centered while matching the user's preferred style, as shown in the example, let the diagram use space horizontally to accomodate text with breathing room for each by using just enough ──── dashes.
            
            - **HIERARCHY:**
                - Use only subject/concept names, do not use note titles from vault in diagrams.
                - \`connections.parent\` at top, labeled \`(Parent)\`, with \`▲\`.
                - Current note ("Core") as the central node and enclose it in a box.
                - \`connections.children\` below.
                - \`connections.related\` on horizontal branches but don't connect them.

            - **EXAMPLE OF PREFERRED STYLE try to replicate the structure and it should not be with broken lines:**
            \`\`\`
                          (Parent)
                   Linear Regression
                           ▲
                           │
           ┌───────────────┼────────────────────────────┐
           │               │                            │
 (Alternative)    ┌───────────────────────────┐     (Equivalent)
Kruskal-Wallis    │   Categorical Predictor   │     T-Test
                  └───────────────────────────┘
                             │
                  ┌──────────┴──────────┐
                  │                     │
                ANOVA                 ANCOVA
                                   (Used In)
                                      │
                                     GLMs
            \`\`\``,

    markdown_fmt: `\n- **Hierarchical Bullet Points for Clarity**: To create the intelligent, nested indentation you see in the examples, you MUST use the \`children\` key for any sub-points, clarifications, or examples. The main idea should always be in the parent's \`content\` field, while supporting details or examples go into a \`children\` array. This is the primary way to break down complex topics visually.`,

    bullet_fmt: `\n        - **Bulleted List Logic**: For any JSON key that ends in '_bullets', you MUST return an array of objects. Each object must have a "content" key. For nested items, the parent object should also have a "children" key, which contains another array of these objects.
        - Example Structure:
+        \`\`\`json
+        [
+        {
+            "content": "**Step 1: Calculate the Error**",
+            "children": [
+            { "content": "First, the model calculates the error using a standard loss function like Mean Squared Error (MSE), defined as $$J(\\\\theta) = \\\\frac{1}{m} \\\\sum_{i=1}^{m} (h_\\\\theta(x^{(i)}) - y^{(i)})^2$$." }
+            ]
+        },
+        {
+            "content": "**Step 2: Add the Complexity Penalty**",
+            "children": [
+            { "content": "Next, the loss is augmented with a penalty term, scaled by the hyperparameter $\\\\lambda$, creating the regularized objective: $$J_{reg}(\\\\theta) = J(\\\\theta) + \\\\lambda \\Omega(\\\\theta)$$." }
+            ]
+        }
+        ]
+        \`\`\``,

    connections: `\n- **Connection Logic (Narrative Style)**: Your task is to weave the connections into a seamless narrative. For the "connections.related" and "connections.other_fundamentals" fields, each item in the array MUST be a complete sentence.
- **CRITICAL RULE**: Each sentence MUST naturally integrate a relationship type (like **contrasts with**, **is an example of**, **is built upon**). You are strictly forbidden from starting the sentence with a bolded label.
- **Use Aliased Wikilinks**: To ensure sentences read naturally, you MUST use aliased wikilinks like \`[[Full Note Name|display text]]\`.

- **Hierarchical Context**: 
    - For "**connections.parent**", write a sentence describing the parent concept.
    - For "**connections.children**", you MUST create a sentence for each conceptual sub-type and for each specific algorithm. **The main subject of the sentence MUST be the wikilink.**
        - **Correct Example for a Sub-Type**: "A key sub-type is [[ML - Binary Classification|binary classification]], which addresses problems with two possible outcomes and is often implemented using algorithms like logistic regression."
        - **Correct Example for an Algorithm**: "Specific algorithms include [[ML - Support Vector Machines|support vector machines]], which are powerful models that find an optimal hyperplane to separate classes."
- **YAML Links**: For the "related_links_for_yaml" key, you MUST provide a simple array of 10-15 full note titles (e.g., "ML - Logistic Regression").`
};

// =============================================================================
// 2. THE NEW FUNCTION - ASSEMBLES THE PROMPT
// =============================================================================

export function constructDynamicPrompt(
    context: string,
    placeholders: string[],
    parent: string | null,
    children: string[],
    vaultContext: string,
    siblingNotes: string[]
): string {

    // A. Build the Schema Skeleton (Simplified view for the AI)
    const schemaSkeleton: any = {};
    const setSchema = (path: string, desc: string) => {
        const parts = path.split('.');
        let current = schemaSkeleton;
        for (let i = 0; i < parts.length - 1; i++) {
            if (!current[parts[i]]) current[parts[i]] = {};
            current = current[parts[i]];
        }
        current[parts[parts.length - 1]] = desc;
    };

    // We map placeholders to a simple string in the JSON skeleton.
    // The *detailed* formatting rules come from the INSTRUCTION_BLOCKS.
    if (placeholders.includes('concept_name')) setSchema('concept_name', "string");
    if (placeholders.includes('why_this_matters')) setSchema('why_this_matters', "string");
    
    if (placeholders.some(p => p.startsWith('summary.'))) {
        if (placeholders.includes('summary.definition')) setSchema('summary.definition', "string");
        if (placeholders.includes('summary.analogy_text')) setSchema('summary.analogy_text', "string");
        if (placeholders.includes('summary.analogy_breakdown')) setSchema('summary.analogy_breakdown', "string");
    }

    if (placeholders.some(p => p.startsWith('details.'))) {
        if (placeholders.includes('details.core_idea')) setSchema('details.core_idea', "string");
        if (placeholders.includes('details.primary_goal')) setSchema('details.primary_goal', "string");
        if (placeholders.includes('details.mechanism_bullets')) setSchema('details.mechanism_bullets', "nested bullets array");
        if (placeholders.includes('details.mechanism_code_snippet')) setSchema('details.mechanism_code_snippet', "string");
        if (placeholders.includes('details.mechanism_ascii_diagram')) setSchema('details.mechanism_ascii_diagram', "string");
        if (placeholders.includes('details.parameters_bullets')) setSchema('details.parameters_bullets', "nested bullets array");
        if (placeholders.includes('details.tradeoffs_bullets')) setSchema('details.tradeoffs_bullets', "nested bullets array");
    }

    if (placeholders.some(p => p.startsWith('connections.'))) {
        if (placeholders.includes('connections.ascii_map')) setSchema('connections.ascii_map', "string");
        if (placeholders.includes('connections.parent')) setSchema('connections.parent', "string");
        if (placeholders.includes('connections.children')) setSchema('connections.children', ["string"]);
        if (placeholders.includes('connections.related')) setSchema('connections.related', ["string"]);
        if (placeholders.includes('connections.other_fundamentals')) setSchema('connections.other_fundamentals', ["string"]);
    }

    if (placeholders.some(p => p.startsWith('comparison.'))) {
        if (placeholders.includes('comparison.item_a')) setSchema('comparison.item_a', "string");
        if (placeholders.includes('comparison.item_b')) setSchema('comparison.item_b', "string");
        if (placeholders.includes('comparison.side_by_side_bullets')) setSchema('comparison.side_by_side_bullets', "nested bullets array");
        if (placeholders.includes('comparison.key_similarities')) setSchema('comparison.key_similarities', "string");
        if (placeholders.includes('comparison.verdict')) setSchema('comparison.verdict', "string");
        if (placeholders.includes('comparison.comparison_table')) setSchema('comparison.comparison_table', "markdown string");
    }
    
    if (placeholders.some(p => p.startsWith('relationship.'))) {
        if (placeholders.includes('relationship.connection_type')) setSchema('relationship.connection_type', "string");
        if (placeholders.includes('relationship.mechanism_of_interaction')) setSchema('relationship.mechanism_of_interaction', "string");
        if (placeholders.includes('relationship.impact')) setSchema('relationship.impact', "string");
    }

    if (placeholders.includes('questions')) setSchema('questions', ["string"]);
    if (placeholders.includes('tags_keywords')) setSchema('tags_keywords', ["string"]);
    if (placeholders.includes('related_links_for_yaml')) setSchema('related_links_for_yaml', ["string"]);
    if (placeholders.includes('fundamental')) setSchema('fundamental', { "justification": "string" });


    // B. Assemble the Instructions (Selectively picking from INSTRUCTION_BLOCKS)
    const activeInstructions: string[] = [];

    // 1. Always include Base
    activeInstructions.push(BASE_INSTRUCTIONS);
    activeInstructions.push(INSTRUCTION_BLOCKS.naming);

    // 2. Siblings (Cohesion) - Only if siblings exist
    if (siblingNotes.length > 0) {
        const siblingsList = siblingNotes.map(s => `- [[${s}]]`).join('\n');
        activeInstructions.push(`
    ### COHESION & INTERCONNECTIVITY (CRITICAL)
    You are generating one note as part of a larger batch of notes. To make the knowledge graph feel cohesive, you MUST mention and link to the other notes in this batch where contextually relevant.
    **The Sibling Notes being generated alongside this one are:**
    ${siblingsList}
    **Instructions for Linking:**
    1. **Narrative Weaving:** In the 'summary.definition', 'details.core_idea', or 'details.mechanism_bullets', try to weave in comparisons or connections to the siblings.
    2. **Related Field:** You MUST include at least 2-3 relevant Sibling Notes in the "connections.related" array.
    3. **Visual Examples:** If any sibling note title starts with **'Example -'**, this is a visual case study provided by the user. Reference it in **'details.mechanism_bullets'**.`);
    }

    // 3. Conditional Blocks
    const has = (key: string) => placeholders.some(p => p.includes(key));

    if (has('concept_name') || has('summary.analogy')) activeInstructions.push(INSTRUCTION_BLOCKS.new_fields);
    if (has('tags_keywords')) activeInstructions.push(INSTRUCTION_BLOCKS.keywords);
    if (has('related_links_for_yaml')) activeInstructions.push(INSTRUCTION_BLOCKS.related_links);
    if (has('fundamental')) activeInstructions.push(INSTRUCTION_BLOCKS.fundamental);
    
    if (has('details.')) {
        activeInstructions.push(INSTRUCTION_BLOCKS.details);
        activeInstructions.push(INSTRUCTION_BLOCKS.math);
    }
    
    if (has('comparison.')) activeInstructions.push(INSTRUCTION_BLOCKS.comparison);
    if (has('relationship.')) activeInstructions.push(INSTRUCTION_BLOCKS.relationship);
    if (has('details.') || has('comparison.') || has('mechanism')) {
        activeInstructions.push(INSTRUCTION_BLOCKS.markdown_fmt);
        activeInstructions.push(INSTRUCTION_BLOCKS.bullet_fmt);
    }

    if (has('questions')) activeInstructions.push(INSTRUCTION_BLOCKS.questions);
    
    if (has('mechanism_ascii_diagram')) activeInstructions.push(INSTRUCTION_BLOCKS.ascii_mech);
    
    if (has('connections.')) {
        activeInstructions.push(INSTRUCTION_BLOCKS.connections);
        if (has('ascii_map')) activeInstructions.push(INSTRUCTION_BLOCKS.ascii_con);
    }


    // C. Final Return String
    return `You are an expert knowledge architect.
Context: "${context}"

${parent ? `Parent Note: [[${parent}]]` : ''}
${children.length ? `Child Notes: ${children.join(', ')}` : ''}

${vaultContext ? `\nExisting Hierarchy:\n${vaultContext}\n` : ''}

You MUST return a single, valid JSON object matching this EXACT schema:
\`\`\`json
${JSON.stringify(schemaSkeleton, null, 2)}
\`\`\`

INSTRUCTIONS:
${activeInstructions.join('\n')}
`;
}

export function createNotePlanPrompt(rawContent: string, vaultContext: string): string {
    return `You are a world-class knowledge architect and academic planner. Your goal is to analyze a user's source transcript (e.g., from a video or book) and structure it into a consistent, interconnected system of atomic notes based on a Standard Model and the user's existing knowledge base.

---
### SPECIAL INSTRUCTIONS: VISUALS & BOOK SCREENSHOTS
The user frequently uses **Screenshots of Book Pages** as source material. You MUST distinguish between an image that *contains* the lesson (Text/Theory) and an image that *illustrates* a specific case (Example).

If the content contains image wikilinks (e.g., '![[image.png]]'), analyze them using these two paths:

#### **PATH A: Source Material (Book Pages, Text Slides, Documentation)**
* **Criteria:** The image is a screenshot of a book page, a slide with bullet points, definitions, or standard code documentation.
* **Interpretation:** This image IS the "Raw Note Content".
* **Action:** Extract the concepts just as you would from a video transcript.
* **Type:** Classify these concepts using the Standard Model (e.g., **'Core'**, **'Major Core'**, **'Process'**, **'Fundamental'**).
* **Naming:** Use the standard convention: \`[Subject] - [Concept]\`.
* **CRITICAL:** You MUST paste the image wikilink verbatim into the \`description\` field of the note entry. This is how the generation agent will "read" the book page.

#### **PATH B: Concrete Examples (Your Original Instructions)**
If the image represents a specific case study, problem, or scenario (graphs, diagrams proving a point), you MUST follow these strict rules:
0.  A visual task is defined as an **"Example Walkthrough"**. It captures a specific case study, problem, or scenario from the lesson that uses an image to prove a point.
1.  Multiple distinct examples/images can be separated by a "---" divider.
2.  You MUST identify EACH sequence and its context.
3.  For EACH separate sequence, you MUST generate its own unique entry in the "checklist_notes" array.
4.  **CRITICAL:** Each of these entries MUST have its "type" set to **'Example Walkthrough'**.
5.  Each of these entries MUST have a unique "title" that follows the naming convention: 'Example - [Descriptive Name]' (e.g., 'Example - House Price Prediction').
6.  You MUST also add a corresponding wikilink for each title to the "note_categories" section.
7.  **CRITICAL:** Copy the image wikilinks (e.g., '![[image.png]]') and paste them respectively under the description of only notes titles of "Example Walkthrough" notes.

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
- **Example Walkthrough**: A specific **Example or Case Study** from the lesson that relies on visuals (charts, diagrams, code screenshots) to explain a concept.

---
### NOTE NAMING CONVENTIONS & EXAMPLES
You MUST strictly follow these naming conventions for note titles.

**CRITICAL:** The "[Main Topic]" (e.g., 'ML', 'Python') MUST be determined by using the "MASTER SUBJECT PREFIX MAP" provided in the context. You are strictly forbidden from inventing your own prefix if a suitable one exists in the map.

| Type | Convention | Examples |
| :--- | :--- | :--- |
| **Fundamental** | \`Fundamental - [Concept]\` | \`Fundamental - Machine Learning\` <br> \`Fundamental - Statistics\` <br> \`Fundamental - Linear Algebra\` |
| **Major Core** | \`[Topic] - [Concept]\` | \`ML - Supervised Learning\` <br> \`ML - Deep Learning\` <br> \`Python - Object-Oriented Programming\` |
| **Core** | \`[Topic] - [Concept]\` | \`ML - Logistic Regression\` <br> \`ML - Overfitting\` <br> \`ML - Fish Market Dataset Example\` <br> \`Python - Dictionaries\` |
| **Comparison** | \`[Topic] - [A] vs [B]\` | \`ML - L1 vs L2 Regularization\` <br> \`ML - Classification vs Regression\` <br> \`Python - Lists vs Tuples\` |
| **Relationship** | \`[Topic] - [A] & [B] Relationship\` | \`ML - Bias & Variance Relationship\` <br> \`ML - Model Complexity & Overfitting Relationship\` <br> \`DataEng - Throughput & Latency Relationship\` |
| **Process** | \`[Topic] - [Process Name]\` | \`ML - Data Preprocessing Workflow\` <br> \`ML - Model Validation Process\` <br> \`Git - Feature Branching Workflow\` |
| **Cheatsheet** | \`[Topic] - [Topic] Cheatsheet\` | \`Python - Pandas Common Functions Cheatsheet\` <br> \`Git - Common Commands Cheatsheet\` <br> \`SQL - JOIN Types Cheatsheet\` |
| **Example Walkthrough**| \`Example - [Scenario Name]\` | \`Example - Spam Email Classifier\` <br> \`Example - Gradient Descent Valley\` |

**CRITICAL:** Do NOT invent new formats. Stick to these patterns.
- **Good:** \`ML - Overfitting\`
- **Bad:** \`What is Overfitting in ML?\`
- **Good:** \`Fundamental - Statistics\`
- **Bad:** \`Statistics (Fundamental)\`

---

---
${vaultContext ? `
### EXISTING KNOWLEDGE HIERARCHY
Here is a map of the user's existing high-level notes. You MUST use this as ground truth for all hierarchical decisions.
${vaultContext}
---` : ''}

### GUIDING PRINCIPLES
- You MUST extract every concept.
1.  **Deconstruct the Transcript by Semantic Shifts:** The "Raw Note Content" is a flat video transcript or a section of a book with no visual slide breaks. Your most important task is to re-create the intended logical structure by identifying "semantic shifts" in the text and use standard model to break down everything into atomic notes. You MUST segment the transcript into distinct \`checklist_notes\` by looking for these cues:
        - **New Key Term**
          - “X is…”, “X refers to…”, “We define X as…”
        - **Topic Shift**
          - “Now…”, “Next…”, “Moving on…”
        - **Comparison**
          - “While X does…, Y does…”
        - **Example**
          - “For example…”, “Consider this case…”
        - **Process**
          - "Step 1/2/3", “First…”, “Then…”, “Finally…”
        - **Explicit Relationship**
          - "X leads to Y", "X depends on Y"
        - **Formula / Rule / Computation**
          - "The formula is...", "We compute..."
        - **Summary / Recap**
          - "To summarize...", "Key takeaways..."
        - **Cheatsheet Trigger**
          - "Quick way to remember...", "Shortcut...", "Common formulas..."
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
       "description": "To pass on context, find the exact sentences from the 'Raw Note Content' that this note is based on don't forget to include examples used if any, and place that verbatim quote here.",
       "parent": "(Optional) The full title of this note's direct parent note.",
       "children": [
         "(Optional) A list of the full titles of this note's direct children notes."
       ]
     }
  ]
}

CRITICAL INSTRUCTIONS:
- **Complete Extraction:** Extract all concepts from the Source text as possible but keep it relevant.
- **Consistency Check:** You MUST ensure that EVERY note listed in the "note_categories" section is ALSO included in the "checklist_notes" array. Do not drop any notes.
- **Note Category Grouping:** This is a primary rule. You MUST create a separate "note_categories" entry for EACH UNIQUE NOTE TYPE found in your plan. You MUST then group all note titles of that specific type under the corresponding category.
- **The defined note types are:** Fundamental, Major Core, Core, Comparison, Relationship, Process, Cheatsheet, and Visual Analysis.
- **CRITICAL:** Do NOT lump notes from different types (e.g., 'Core' and 'Process' notes) into one single category.
- You MUST place all new concepts within the provided EXISTING KNOWLEDGE HIERARCHY. Do not create a 'Fundamental' note for a topic that is clearly a sub-field of an existing one.
- The titles in 'checklist_notes' MUST follow the naming conventions:
  - 'Fundamental' type: "Fundamental - [Concept]".
  - All other types: "[Main Topic] - [Concept]".
- **Rule of Hierarchy**: If a concept in the raw note is a clear sub-topic of ANY note listed in the EXISTING KNOWLEDGE HIERARCHY, you MUST classify it as a 'Major Core' or 'Core' note. You are strictly forbidden from creating a new 'Fundamental' note if a suitable parent already exists in the hierarchy.

---
### Deconstruction Task
You are about to receive the source text. You MUST process the *entire* text from beginning to end. Your plan must be comprehensive and include an entry in \`checklist_notes\` for *every* distinct concept, definition, example, and process mentioned.

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
    let typeContext = "";
    let evidenceInstruction = "";

    if (imageCount === 0) {
        typeContext = "The user has provided a **Text-Based Case Study** or specific scenario from a lesson (no images included).";
        evidenceInstruction = "An array of strings. Since no images are provided, extract specific **quotes, data points, or code snippets** from the text that define the scenario.";
    } else {
        typeContext = imageCount > 1 
            ? "The user has provided a **sequence of images** representing a step-by-step example."
            : "The user has provided a **single image** representing a specific example or scenario.";
        evidenceInstruction = "An array of strings. Briefly caption what is **physically visible** in the image(s) (e.g., 'The blue dots represent the training data').";
    }

    return `You are an expert Technical Educator. ${typeContext}

Your goal is to generate a structured "Example Walkthrough Note" that explains the concept *through* this specific visual scenario.

Here is the context from the user's notes:
---
CONTEXT:
${context}
---

You MUST return a single, valid JSON object with the following exact keys.

{
  "scenario_context": "A clear, high-level paragraph setting the stage. What is this specific example about? (e.g., 'In this example, we look at a dataset of housing prices to understand Linear Regression lines...').",
  "visual_evidence_list": "An array of strings. Briefly caption what is physically visible in the image(s) (e.g., 'The blue dots represent the training data', 'The red line is the model prediction').",
  "step_by_step_breakdown": "An array of objects representing the logical flow of the example. Each object must have a 'step' (bold title) and 'details' (explanation). Break down the *reasoning* shown in the visual.",
  "core_concept_takeaway": "A powerful concluding paragraph. What general technical principle does this specific example prove? (e.g., 'This visual demonstrates that outliers can disproportionately affect the slope...').",
  "related_concepts": "An array of 3-4 wikilinks to the theoretical concepts this example illustrates (e.g., '[[ML - Linear Regression]]')."
}

CRITICAL INSTRUCTIONS:
- Do not describe the image generically (e.g., "It is a graph"). Explain the *data* (e.g., "The graph plots Price vs. Size").
- Connect the visual elements directly to the theory.
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
- "connections_ascii_map": "A minimalist ASCII connections map as a string.",
- "connections_bullets": (Array of Objects) A bulleted list of related concepts. Each object MUST have a "content" key.
- "code_snippet": (String) A concise Python snippet (using NumPy) that implements the equation. If no simple code translation exists, return an empty string.
- "ascii_diagram": "A simple ASCII diagram (e.g., flow, block, numeric example).",
- "tags_keywords": (Array of strings) 3-4 relevant, lowercase, snake_case keywords.
- "related_links_for_yaml": (Array of strings) 5-7 wikilinks to related concepts.

---
### CRITICAL INSTRUCTIONS
- **JSON Backslash Escaping**: This is the MOST CRITICAL instruction. All backslashes (\\) in your response, especially within LaTeX code, MUST be properly escaped with a double backslash (\\\\).
    - **Example**: To represent the LaTeX \`$\\theta$\`, the JSON value MUST be \`"$\\\\theta$"\`.
    - **Example**: To represent \`$\\nabla J(\\theta)$\`, the JSON value MUST be \`"$\\\\nabla J(\\\\theta)$"\`.

- **LaTeX Formatting for Formulas**: You MUST adhere to the following strict rules for all mathematical notation:
    1.  **Mandatory LaTeX**: You MUST format ANY and ALL mathematical variables (e.g., $J$, $\\theta$, $\\lambda$), symbols, and equations using LaTeX. There are no exceptions.
    2.  **Proper Commands**: You MUST use proper LaTeX commands (e.g., \`\\theta\`, \`\\lambda\`, \`\\cdot\`). Do NOT use raw unicode characters.
    3.  **CRITICAL - NO PLAIN TEXT SYMBOLS**: You MUST NEVER write the names of Greek letters or other symbols as plain text inside a math block. For example, ALWAYS write \`$\\lambda$\`.
    4.  **Formatting Guideline for Delimiters**: You MUST use **double dollar signs (\`\$\$...\$\$\`)** for standalone equations (like the main one provided). You MUST use **single dollar signs (\`\$...\$\`)** for all inline variables or symbols (e.g., \`$\\lambda$\`, \`$\\theta$\`).
    5.  **No Spaces Around Delimiters**: There MUST NOT be any space between the dollar sign delimiters and the content (e.g., write \`$E=mc^2$\` not \`$ E=mc^2 $\`).
    6.  **Separate Text**: Keep explanatory text (e.g., "Where:", "The cost is") **outside** of the dollar sign delimiters.

- **ASCII Diagram**: For the "ascii_diagram" key, you MUST generate a very simple ASCII visual aid based on the following guide:
            - **Flow Diagram**: Show execution flow or sequential steps.
            - **Block Diagram**: Show ML pipelines, data flow, or system architecture.
            - **Table**: Compare groups, encodings, or trade-offs.
            - **Hierarchy Tree**: Show parent/child relationships.
            - **Numeric Example**: Make abstract equations concrete.

- **ASCII Connections Map**: For the "connections_ascii_map" key, you MUST generate a clean, spacious, minimalist ASCII diagram with the note's concept ("${title}") as the central node.
    - **EXAMPLE OF PREFERRED STYLE:**
    \`\`\`
                  (Alternative)    ┌───────────────────────────┐     (Equivalent)
                 Kruskal-Wallis    │   Categorical Predictor   │     T-Test
                                   └───────────────────────────┘
    \`\`\`
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
  "connections_ascii_map": "                  (Parent)       ┌──────────────────┐\n                                │  Cost Function   │\n                                └──────────────────┘",
  "connections_bullets": [
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
  "goal_statement": "(String) A single, concise sentence stating the primary objective of this code implementation. Example: 'To implement a ${conceptName} to demonstrate its core functionality and typical application.'",
  "core_concepts": "(Array of Objects) A list of the 2-3 most critical theoretical concepts this code demonstrates. Each object MUST have two keys: 'concept' (a string with the concept name) and 'description' (a string explaining its role in the code).",
  "dependencies_block": "(String) The full Python import block. Include all necessary standard libraries (e.g., numpy, pandas, collections) and any specific modules required to demonstrate the concept.",
  "implementation_block": "(String) The complete, runnable Python code for the implementation. It MUST be heavily commented and structured with numbered steps appropriate for the concept (e.g., 1. Setup/Data, 2. Core Logic, 3. Execution, 4. Analysis/Output). Use the context provided about the mechanism in THEORETICAL CONTEXT to write relevant comments.",
  "essence_block": "(String) A code-block that produces one concise representation that best demonstrates the essence of this concept in practice (e.g., a simple function call, a small data transformation).",
  "analysis_observations": "(String) A Markdown-formatted bulleted list explaining the key results. State the direct outputs (e.g., 'The function returned the expected value...') and describe what any visualizations show (e.g., 'The plot clearly shows the data distribution...').",
  "analysis_theory_connection": "(String) A Markdown-formatted paragraph explaining WHY the results occurred, explicitly connecting them back to the provided theoretical context. Reference the mechanism you were given.",
  "analysis_practical_implications": "(String) A Markdown-formatted paragraph on the practical, real-world implications. When would you use this? What are its strengths in a project?",
  "experimentation_ideas": "(Array of Objects) A list of 2-3 specific, hands-on experiments a user could try. Use the 'Key Parameters' context to create these. Each object must have two keys: 'idea' (e.g., 'Modify a key parameter') and 'prompt' (e.g., 'What happens to the output if you change the [Parameter Name]? Modify the parameter and re-run the code to observe the effect.').",
  "pitfalls_preprocessing": "(String) Explain any critical data preparation, setup, or input requirements for this concept (e.g., 'This function requires normalized data...', 'Input must be a sorted list...', 'Requires database index').",
  "pitfalls_assumptions": "(String) List the key assumptions the concept makes about the data or environment, based on the provided context.",
  "pitfalls_failure_modes": "(String) Describe common situations where this concept performs poorly, fails, or returns unexpected results, referencing the 'Core Tradeoffs' context.",
  "related_concepts_yaml": "(Array of Strings) A list of 3-5 wikilinks to closely related concepts (e.g., 'Python - Data Structures', 'Stats - Hypothesis Testing', 'Git - Branching').",
  "topic_tag": "(String) A single, relevant snake_case tag for the YAML frontmatter based on the concept (e.g., 'data_structures', 'statistics', 'dev_tools')."
}

CRITICAL INSTRUCTIONS:
- The generated code MUST be fully runnable and self-contained.
- The analysis MUST go beyond describing the code and connect back to the provided theory.
- The entire response MUST be a single, valid JSON object. Double-escape all backslashes (e.g., \\n).
`;
}

export function createMyTakeReviewPrompt(sourceContent: string, myTakeContent: string): string {
    return `You are a world-class Machine Learning expert and Socratic tutor.
Your job is to evaluate the my understanding with high precision and produce feedback 
following the exact structure shown below.

Below is the source text and my explanation ("My Take").

---
### Source Text
${sourceContent}

---
### "My Take"
${myTakeContent}

---
### REQUIRED OUTPUT STRUCTURE
You MUST follow the *exact* 7-section structure below.

Here is a SHORT EXAMPLE to imitate:

---
### Sample Response Format (Imitate This Exactly)

#### 1. Understanding Accuracy
- Correct: You correctly identified X.
- Incorrect: You misinterpreted Y as Z.

#### 2. Missing Concepts
- The explanation does not mention A or B.

#### 3. Concept-by-Concept Comparison
| Source Concept | Your Version | Feedback |
|---|---|---|
| Concept A | You said… | Correction… |
| Concept B | You said… | Correction… |

#### 4. Clarity & Writing Quality
- Sentences unclear in places.
- Structure could be more linear.

#### 5. Terminology & Precision Check
- Term "foo" used incorrectly.
- Key term "bar" missing.

#### 6. Actionable Improvements
- Add definition of X.
- Clarify distinction between Y and Z.

#### 7. Perfected Version
*A polished, corrected version of the my explanation goes here.*

---
### Now Apply This Structure to the Real Input

Output ONLY using the 7-section structure above. 
No greetings. No additional commentary.`;
}


export function createMathPlanFromDraftPrompt(draftContent: string): string {
    return `
You are a machine learning expert and knowledge architect. Your task is to analyze a "Mechanism Draft" file and identify every standalone LaTeX equation.

For each equation you find, you must:
1.  Analyze its surrounding text context.
2.  Extract all its key information.
3.  **CRITICALLY, you must choose the correct template ("Hybrid" or "Quick") to use for that equation by following the detailed "Rule of Thumb" below.**

---
### THE RULE OF THUMB (Simple & Perfect)
This is your guide for choosing the "template_choice".

**Use "Quick" Template when the math is:**
* a formula you already understand
* something you can use immediately
* something you will implement in code
* something that does not need intuition
* something that is basically a “tool”

**Examples of "Quick" Template choices:**
* **Linear Regression Formula:** $$\\hat{y} = \\beta_0 + \\beta_1x_1 + \\dots + \\beta_nx_n$$
    (You don’t need historical motivation or proofs here — you just need the mapping between coefficients and features.)
* **Dummy Variable Encoding Formula:** $$E[Y|Species] = \\beta_0 + \\beta_B I(B) + \\beta_C I(C)$$
    (Straightforward application; already intuitive.)
* **Negative Indexing Equation:** $$i_{pos} = len(L) + i_{neg}$$
    (This is a simple reference, a "tool".)

---
### 🧠 Use "Hybrid" (Deep) Template when the math:
1.  Defines something foundational (e.g., dot product, norm, vector space)
2.  Is needed for intuition (e.g., gradients, Jacobians)
3.  Is easy to misuse (e.g., covariance vs correlation)
4.  Has geometry behind it
5.  Has a “why” that matters
6.  Will appear again in deeper ML
7.  Needs a mental model to avoid confusion later
8.  Has proofs or theoretical behavior you must understand
9.  Connects to multiple ML fields
10. Shows up in optimization / linear algebra / probability

**Examples that ALWAYS require the "Hybrid" Template:**
* **Concept:** Dot product
    **Why Hybrid?** geometric meaning, angles, similarity
* **Concept:** Norms (L1, L2)
    **Why Hybrid?** optimization behavior, geometry
* **Concept:** Gradient
    **Why Hybrid?** core concept behind all learning
* **Concept:** Hessian
    **Why Hybrid?** curvature & second-order optimization
* **Concept:** PCA / eigenvalues
    **Why Hybrid?** deep linear algebra intuition
* **Concept:** Covariance
    **Why Hybrid?** statistical meaning
* **Concept:** KL Divergence
    **Why Hybrid?** requires motivation + meaning
* **Concept:** Softmax
    **Why Hybrid?** why exponentiate? why normalize?
* **Concept:** Cross-entropy
    **Why Hybrid?** why log? why sum? what does it represent?
* **Concept:** Backpropagation
    **Why Hybrid?** needs step-by-step reasoning
* **Concept:** Regularization
    **Why Hybrid?** is geometric + probabilistic
* **Concept:** Activation functions
    **Why Hybrid?** behavior understanding
---

**Draft Content to Analyze:**
---
${draftContent}
---

**Required JSON Output Format:**
You MUST return a single, valid JSON object. This object must contain one key, "equations", which is an array of objects.
Each object in the "equations" array MUST have the following structure:
- "equation": The full LaTeX equation string (e.g., "$$\\lambda \\sum w_j^2$$").
- "template_choice": The classification string you chose: either "Hybrid" or "Quick".
- "source_note_path": The wikilink path from the "From:" heading (e.g., "ML/Concepts/ML - Logistic Regression.md").
- "title": A clear, descriptive name for the equation (e.g., "L2 Regularization Penalty").
- "description": A concise, one-sentence explanation of what the equation represents or calculates.
- "classification": A string classifying the equation (e.g., "Loss Function", "Metric", "Update Rule", "Penalty Term").
- "key_variables": An array of objects, where each object has two keys:
    - "variable": The LaTeX variable (e.g., "$J(\\\\theta)$").
    - "meaning": A brief explanation (e.g., "The cost function for parameters \\\\theta").

CRITICAL INSTRUCTIONS:
- You MUST find every equation in the draft.
- Skip notes with no math/Latex in them.
- You MUST double-escape all backslashes (\\\\) in the JSON strings, especially in LaTeX.
- The "source_note_path" MUST be the path, not just the base name (e.g., "ML/Notes/ML - Overfitting.md").
`;
}

export function createHybridMathNotePrompt(conceptName: string, equation: string, description: string): string {
    // We combine the equation and description to give the AI full context.
    const contextSnippet = `
Original Equation:
${equation}

Original Description:
${description}
`;

    return `You are a world-class Machine Learning mathematics educator. Your task is to produce a complete, deeply structured explanation of a mathematical concept using the HYBRID MATH NOTES TEMPLATE.

The concept is: "${conceptName}"

This is the context from the original note or source where the concept appeared. USE THIS to correctly infer meaning, motivation, and role:
---
${contextSnippet}
---

You MUST return a single, valid JSON object with the following keys. Do NOT add any other text or markdown.

{
  "represents": "1-2 sentences describing what this concept REALLY represents — its essence.",
  "intuition": "A plain-language, intuitive explanation using analogies, geometry, or simple mental models.",
  "why_exists": "A short description of the historical or motivating problem. Why was this concept invented?",
  "examples": "A bulleted list (array of strings) showing 1–3 simple concrete examples.",
  "how_deconstructed": (Array of Objects) A bulleted list breaking down each component. Each object MUST have a "content" key.
  "formal_definition": "A precise, formal definition written cleanly. Use LaTeX for symbols.",
  "properties": "A bulleted list (array of strings) of essential properties or theorems.",
  "proof": "A step-by-step explanation (array of strings) where each item answers WHY that step is true.",
  "problem_solving": {
      "understand": "A short summary of the givens and unknowns when solving problems with this concept.",
      "plan": "A 1-3 bullet strategy outline describing how one typically approaches problems involving this concept.",
      "execute": "A short description of how the plan is carried out.",
      "look_back": "What someone should reflect on after solving such problems."
  },
  "connections": { // <-- REPLACE WITH THIS OBJECT
      "ascii_map": "A minimalist ASCII connections map as a string.",
      "bullet_list": "A bulleted list (array of strings) describing how this concept connects to other math or ML ideas."
  },
  "pitfalls": "A bulleted list (array of strings) of common misunderstandings or mistakes.",
  "memory_hooks": {
      "active_recall": "A list (array of strings) of 2-4 simple recall questions.",
      "review_schedule": "A short note like: 'Review in 1 day, 7 days, 30 days.'"
  },
  "essence_summary": "A single-sentence distilled summary of the concept.",
  "ascii_diagram": "A simple ASCII diagram (e.g., flow, block, numeric example).",
  "tags_keywords": ["An array of 3-4 relevant, lowercase, snake_case keywords."],
  "related_links_for_yaml": ["An array of 5-7 wikilinks to related concepts for YAML frontmatter."]
}

CRITICAL INSTRUCTIONS:
- **JSON Backslash Escaping**: This is the MOST CRITICAL instruction. All backslashes (\\) in your response, especially within LaTeX code, MUST be properly escaped with a double backslash (\\\\).
    - **Example**: To represent the LaTeX \`$\\theta$\`, the JSON value MUST be \`"$\\\\theta$"\`.
    - **Example**: To represent \`$\\nabla J(\\theta)$\`, the JSON value MUST be \`"$\\\\nabla J(\\\\theta)$"\`.

- **LaTeX Formatting for Formulas**: You MUST adhere to the following strict rules for all mathematical notation:
    1.  **Mandatory LaTeX**: You MUST format ANY and ALL mathematical variables (e.g., $J$, $\\theta$, $\\lambda$), symbols, and equations using LaTeX. There are no exceptions.
    2.  **Proper Commands**: You MUST use proper LaTeX commands (e.g., \`\\theta\`, \`\\lambda\`, \`\\cdot\`). Do NOT use raw unicode characters.
    3.  **CRITICAL - NO PLAIN TEXT SYMBOLS**: You MUST NEVER write the names of Greek letters or other symbols as plain text inside a math block. For example, ALWAYS write \`$\\lambda$\`.
    4.  **Formatting Guideline for Delimiters**: You MUST use **double dollar signs (\`\$\$...\$\$\`)** for standalone equations. You MUST use **single dollar signs (\`\$...\$\`)** for all inline variables or symbols (e.g., \`$\\lambda$\`, \`$\\theta$\`).
    5.  **No Spaces Around Delimiters**: There MUST NOT be any space between the dollar sign delimiters and the content (e.g., write \`$E=mc^2$\` not \`$ E=mc^2 $\`).
    6.  **Separate Text**: Keep explanatory text (e.g., "Where:", "The cost is") **outside** of the dollar sign delimiters.

- All lists MUST be valid JSON arrays (no trailing commas).
- DO NOT add commentary, markdown, or text outside the JSON object.

- **ASCII Diagram**: For the "ascii_diagram" key, you MUST generate a very simple ASCII visual aid based on the following guide:
            - **Flow Diagram**: Show execution flow or sequential steps.
            - **Block Diagram**: Show ML pipelines, data flow, or system architecture.
            - **Table**: Compare groups, encodings, or trade-offs.
            - **Hierarchy Tree**: Show parent/child relationships.
            - **Numeric Example**: Make abstract equations concrete.

- **ASCII Connections Map**: For the "connections.ascii_map" key, you MUST generate a clean, spacious, minimalist ASCII diagram with the note's concept ("${conceptName}") as the central node.
    - **EXAMPLE OF PREFERRED STYLE:**
    \`\`\`
                  (Alternative)    ┌───────────────────────────┐     (Equivalent)
                 Kruskal-Wallis    │   Categorical Predictor   │     T-Test
                                   └───────────────────────────┘
                                               │
                                    ┌──────────┴──────────┐
                                    │                     │
                                  ANOVA                 ANCOV
    \`\`\`
`;
}