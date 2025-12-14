export function createNotePlanPrompt(rawContent: string): string {
    return `You are a world-class Machine Learning expert and senior engineer, acting as a Socratic tutor.
Your goal is to analyze the user's raw note and provide feedback that deepens their understanding.

---
### NEW GUIDING PRINCIPLES
1.  **Analyze Intent First**: Before breaking down the content, your primary goal is to understand the user's intent. Is this a conceptual explanation, a project plan, a list of commands, or something else?
2.  **Propose a Type**: Based on the intent, suggest a suitable, concise 'note type' in PascalCase.
3.  **Systematic Extraction**: After identifying the intent, systematically extract every unique, definable term or concept for the note breakdown.
4.  **Favor Atomicity**: Err on the side of creating more, smaller, more focused atomic notes.
5.  **Identify Implicit Relationships**: If a relationship between concepts is mentioned (e.g., AI is the parent field of ML), propose a specific note to define that relationship.
---

Your response MUST be a single JSON object with the following exact structure:

{
  "note_identity": {
    "suggested_type": "A concise, PascalCase name for the note's type based on its content (e.g., 'ConceptualHierarchy', 'QuickReferenceCheatsheet', 'ProjectPlan', 'VisualDeconstruction').",
    "justification": "A brief, one-sentence explanation for why you chose this type."
  },
  "plan_details": {
    "main_topic": "A short, 2-3 word title for the main subject.",
    "unique_phrase": "A witty and fun two-or-three-word Title Case phrase, like a clever subreddit name."
  },
  "overall_feedback": "A high-level introductory paragraph assessing the user's raw note from a 'senior engineer' perspective.",
  "review_points": [
    { "concept": "Specific concept from the note", "suggestion": "Your detailed feedback and refinement suggestion for this concept." }
  ],
  "missing_connections": [
    "Identify a crucial related concept the user didn't mention. Format as a wikilink, e.g., '[[ML - Bias-Variance Tradeoff]]'"
  ],
  "provocative_questions": [
    "Pose a deep, open-ended question that challenges the user's understanding of the main topic."
    "Pose a second question that forces the user to connect this topic to a broader concept."
    "Pose a third question that forces the user to connect this topic to a broader concept."
  ],
  "note_categories": [
    {
      "category_title": "Category title with emoji (e.g., 'Fundamental Concepts 🧠').",
      "category_description": "A brief one-sentence description of this category.",
      "notes": [
        { "title": "The full, final title of the note." }
      ]
    }
  ],
  "checklist_notes": [
     { "title": "The note title.", "type": "The note's type (e.g., 'Core', 'Fundamental').", "description": "The detailed description for the note generation phase." }
  ]
}

CRITICAL INSTRUCTION: 
For now, continue to fill out the 'note_categories' and 'checklist_notes' as before, but base your analysis on the new understanding from the 'note_identity' phase.
- The titles in the 'checklist_notes' array MUST follow strict naming conventions.
- For 'Fundamental' types, use the format: "Fundamental - [Concept]" with a little decription for concept to avoid ambiguity, For example - "ML - The Goal of Prediction".
- For ALL other types ('Core', 'Major Core', 'Process', 'ComparativeAnalysis', etc.), use the format: "[Main Topic] - [Concept]". For example, if the main_topic is 'ML' and the concept is 'Supervised Learning', the title must be "ML - Supervised Learning".

Raw Note Content:
---
${rawContent}
---`;
}

export function generateNoteContentPrompt(title: string, type: string, context: string): string {
    return `You are an expert knowledge architect. Your task is to generate the structured content for an atomic note.
**Title**: "${title}"
**Type**: "${type}"
**Essential Context**: This note must be based on the following summary: "${context}".

Please return a single, valid JSON object with the following keys. Adhere strictly to the types requested:
- "summary_definition": string
- "summary_analogy": string
- "details_bullets": array of strings
- "connections_parent": string (A single wikilink, e.g., [[ML - Supervised Learning]])
- "connections_children": array of strings (wikilinks)
- "connections_related": array of strings (Contextual sentences with wikilinks)
- "questions": array of strings
- "related_links_for_yaml": array of strings (A list of UNIQUE note titles for the frontmatter. **Crucially, these titles must also follow the user's naming conventions, e.g., "ML - Unsupervised Learning"**).
`;
}

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