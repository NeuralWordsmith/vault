export function createNotePlanPrompt(rawContent: string): string {
    return `You are a world-class Machine Learning expert and senior engineer, acting as a tutor.
Analyze the following raw note and generate a detailed plan to transform it into structured, atomic notes.
Your response MUST be a single JSON object with the following exact structure:

{
  "plan_details": {
    "main_topic": "A short, 2-3 word title for the main subject.",
    "unique_phrase": "A witty and fun two-or-three-word Title Case phrase, like a clever subreddit name. Aim for puns, alliteration, or pop-culture references. (e.g., 'The Lazy Learner', 'Algorithmic Alchemist', 'Project Data-Vinci')."
  },
  "review_intro": "An introductory paragraph with high-level feedback, written from a 'senior engineer' perspective.",
  "review_points": [
    { "concept": "Concept from the note (e.g., Supervised Learning)", "suggestion": "Your detailed feedback and refinement suggestion for this concept." }
  ],
  "proposal_intro": "An introductory sentence for the proposed notes section.",
  "note_categories": [
    {
      "category_title": "The category title with an emoji (e.g., 'Fundamental Note 🧠').",
      "category_description": "A brief one-sentence description of this category.",
      "notes": [
        { "title": "The full, final title of the note.", "description": "(Optional) A brief, italicized description of the note's purpose." }
      ]
    }
  ],
  "checklist_notes": [
     { "title": "The note title.", "type": "The note's type (e.g., Fundamental, Core).", "description": "The detailed description for the note generation phase." }
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