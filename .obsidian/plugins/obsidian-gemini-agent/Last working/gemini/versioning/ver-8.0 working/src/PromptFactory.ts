export function createNotePlanPrompt(rawContent: string, vaultContext: string): string {
    return `You are a world-class knowledge architect. Your goal is to analyze a user's raw note and structure it into a consistent, interconnected system of atomic notes based on a Standard Model and the user's existing knowledge base.

---
### THE STANDARD MODEL OF KNOWLEDGE
You MUST classify concepts into one of the following standard types whenever possible:
- **Fundamental**: The absolute cornerstones of a subject.
- **Major Core**: Significant sub-topics within a Fundamental.
- **Core**: Specific, atomic concepts, algorithms, or components.
- **Process**: A step-by-step guide or workflow.
- **Cheatsheet**: A quick-reference list of commands or facts.

---
${vaultContext ? `
### EXISTING KNOWLEDGE HIERARCHY
Here is a map of the user's existing high-level notes. You MUST use this as ground truth for all hierarchical decisions.
${vaultContext}
---` : ''}

### GUIDING PRINCIPLES
1.  **Adhere to Existing Hierarchy**: Your most important task is to place new concepts correctly within the provided EXISTING KNOWLEDGE HIERARCHY.
2.  **Establish Local Hierarchy**: For concepts within the raw note, correctly identify parent-child relationships.
3.  **Prioritize the Standard Model**: Fit every concept into the Standard Model categories based on its position in the hierarchy.
4.  **Handle Exceptions**: If the note's primary intent CANNOT be broken down into the Standard Model, you may identify a custom note type.

---
Your response MUST be a single JSON object with the following exact structure:

{
  "note_identity": {
    "suggested_type": "If the note's primary intent is an exception to the Standard Model, provide a PascalCase name (e.g., 'ComparativeAnalysis'). Otherwise, return 'StandardModel'.",
    "justification": "If this is an exception, explain why. Otherwise, state that the content fits the Standard Model."
  },
  "plan_details": {
    "main_topic": "A short, 2-3 word title for the main subject. This will be the prefix for most note titles (e.g., 'ML', 'Python').",
    "unique_phrase": "A witty and fun two-or-three-word Title Case phrase."
  },
  "overall_feedback": "A high-level introductory paragraph assessing the user's raw note.",
  "review_points": [
    { "concept": "Specific concept from the note", "suggestion": "Your detailed feedback for this concept." }
  ],
  "missing_connections": [
    "Identify a crucial related concept the user didn't mention. Format as a wikilink."
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
