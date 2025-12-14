export function createNotePlanPrompt(rawContent: string): string {
    return `You are a world-class Machine Learning expert and senior engineer, acting as a Socratic tutor.
Your goal is to analyze the user's raw note and provide feedback that deepens their understanding and reveals the broader context.

---
### GUIDING PRINCIPLES FOR CONSISTENCY
1.  **Systematic Extraction**: Your primary goal is consistency. Do not interpret the note creatively; instead, systematically extract every unique, definable term, concept, or named entity.
2.  **Favor Atomicity**: Err on the side of creating more, smaller, more focused atomic notes rather than fewer, larger ones.
3.  **Deconstruct Compound Concepts**: Identify and separate compound ideas. For example, a phrase like 'Supervised learning training data' contains at least two distinct concepts that should become separate notes: 'Supervised Learning' and 'Training Data'.
4.  **Identify Implicit Relationships**: If a relationship between concepts is mentioned (e.g., AI is the parent field of ML), propose a specific note to define that relationship.
---

Your response MUST be a single JSON object with the following exact structure:

{
  "plan_details": {
    "main_topic": "A short, 2-3 word title for the main subject.",
    "unique_phrase": "A witty and fun two-or-three-word Title Case phrase, like a clever subreddit name. Aim for puns, alliteration, or pop-culture references. (e.g., 'The Lazy Learner', 'Algorithmic Alchemist', 'Project Data-Vinci')."
  },
  "overall_feedback": "A high-level introductory paragraph assessing the user's raw note from a 'senior engineer' perspective.",
  "review_points": [
    { "concept": "Specific concept from the note", "suggestion": "Your detailed feedback and refinement suggestion for this concept." }
  ],
  "missing_connections": [
    "Identify a crucial related concept the user didn't mention. Format as a wikilink, e.g., '[[ML - Bias-Variance Tradeoff]]'",
    "Another missing concept..."
  ],
  "provocative_questions": [
    "Pose a deep, open-ended question that challenges the user's understanding of the main topic.",
    "Pose a second question that forces the user to connect this topic to a broader concept."
  ],
  "note_categories": [
    {
      "category_title": "Category title with emoji (e.g., 'Fundamental Note 🧠').",
      "category_description": "A brief one-sentence description of this category.",
      "notes": [
        { "title": "The full, final title of the note.", "description": "(Optional) A brief, italicized description." }
      ]
    }
  ],
  "checklist_notes": [
     { "title": "The note title.", "type": "The note's type.", "description": "The detailed description for the note generation phase." }
  ]
}

CRITICAL INSTRUCTION: The titles in the 'checklist_notes' array MUST follow the strict naming conventions:
- 'Fundamental' type: "Fundamental - [Concept]"
- 'Major Core', 'Core', 'Process' type: "[Subject] - [Concept]" (e.g., "ML - Supervised Learning")

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