var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  AgentChatView: () => AgentChatView,
  default: () => MyPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian2 = require("obsidian");

// src/ToolManager.ts
var import_obsidian = require("obsidian");

// src/PromptFactory.ts
function createNotePlanPrompt(rawContent, vaultContext) {
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
---` : ""}

### GUIDING PRINCIPLES
1.  **Adhere to Existing Hierarchy**: Your most important task is to place new concepts correctly within the provided EXISTING KNOWLEDGE HIERARCHY.
2.  **Establish Local Hierarchy**: For concepts within the raw note, correctly identify parent-child relationships.
3.  **Prioritize the Standard Model**: Fit every concept into the Standard Model categories based on its position in the hierarchy.
4.  **Isolate Distinct Topics**: If the raw note contains multiple, clearly distinct major topics, you MUST create a separate "note_categories" entry for each one. Do not merge unrelated concepts into a single note plan.
5.  **Handle Exceptions**: If the note's primary intent CANNOT be broken down into the Standard Model, you may identify a custom note type.

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
      "category_title": "Category title based on the Standard Model (e.g., 'Fundamental Concepts \u{1F9E0}').",
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
function createAnswerReviewPrompt(fullNoteContent) {
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
function createKeywordExtractionPrompt(textToSummarize) {
  return `From the following text, extract the 5-7 most important technical concepts or keywords. The user is a machine learning engineer, so favor specific, technical terms.
Return them as a single, comma-separated string with no introduction or explanation.

Example: Generalization, Transfer Learning, Data Efficiency, Catastrophic Forgetting

Text to analyze:
---
${textToSummarize}
---`;
}
function createTemplateMatchingPrompt(suggestedType, templateFileNames) {
  const templateList = templateFileNames.map((name) => `- "${name}"`).join("\n");
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
function createTemplateDraftPrompt(suggestedType, rawContent, fewShotExamples) {
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

// src/ToolManager.ts
var LOG_FILE_NAME = "_Gemini Logs.md";
var HIERARCHY_MAP_FILE_NAME = "_Gemini Hierarchy Map.md";
var ToolManager = class {
  constructor(app, genAI, settings, fileService) {
    this.app = app;
    this.genAI = genAI;
    this.settings = settings;
    this.fileService = fileService;
  }
  // No changes to logActivity or updateHierarchyMap
  async logActivity(message) {
    const logFilePath = `${this.settings.draftsFolderPath}/${LOG_FILE_NAME}`;
    const timestamp = (/* @__PURE__ */ new Date()).toLocaleString("en-IN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata"
    });
    const logEntry = `- ${timestamp}: ${message}
`;
    let logFile = this.fileService.getAbstractFileByPath(logFilePath);
    if (!logFile) {
      await this.fileService.createFile(logFilePath, `# Gemini Agent Logs

${logEntry}`);
    } else if (logFile instanceof import_obsidian.TFile) {
      const currentContent = await this.fileService.readFile(logFile);
      const newContent = currentContent.replace("# Gemini Agent Logs\n\n", `# Gemini Agent Logs

${logEntry}`);
      await this.fileService.modifyFile(logFile, newContent);
    }
    return `Logged: "${message}"`;
  }
  async updateHierarchyMap() {
    new import_obsidian.Notice("Scanning vault for structural notes...", 3e3);
    const structuralNotes = [];
    const files = this.app.vault.getMarkdownFiles();
    const structuralTagNames = ["fundamental", "major-core", "moc"];
    for (const file of files) {
      const fileCache = this.app.metadataCache.getFileCache(file);
      if (!fileCache) continue;
      const allTags = /* @__PURE__ */ new Set();
      const frontmatterTags = fileCache.frontmatter?.tags;
      if (frontmatterTags) {
        const tagsToAdd = Array.isArray(frontmatterTags) ? frontmatterTags : String(frontmatterTags).split(",").map((t) => t.trim());
        tagsToAdd.forEach((tag) => {
          const cleanedTag = tag.startsWith("#") ? tag.slice(1) : tag;
          allTags.add(cleanedTag.toLowerCase());
        });
      }
      if (fileCache.tags) {
        fileCache.tags.forEach((tagCache) => {
          allTags.add(tagCache.tag.slice(1).toLowerCase());
        });
      }
      const fileTags = Array.from(allTags);
      const hasStructuralTag = fileTags.some((tag) => structuralTagNames.includes(tag));
      if (hasStructuralTag) {
        const wikilink = `[[${file.path}|${file.basename}]]`;
        structuralNotes.push(wikilink);
      }
    }
    const mapFilePath = `${this.settings.draftsFolderPath}/${HIERARCHY_MAP_FILE_NAME}`;
    const header = `# Gemini Agent: Knowledge Hierarchy Map

This file is an auto-generated map of the structural notes in your vault. It is used as context by the Gemini agent to make better planning decisions.

Last updated: ${(/* @__PURE__ */ new Date()).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}

---

`;
    const mapContent = header + structuralNotes.join("\n");
    const existingMapFile = this.fileService.getAbstractFileByPath(mapFilePath);
    if (existingMapFile && existingMapFile instanceof import_obsidian.TFile) {
      await this.fileService.modifyFile(existingMapFile, mapContent);
    } else {
      await this.fileService.createFile(mapFilePath, mapContent);
    }
    await this.logActivity(`Updated the Hierarchy Map with ${structuralNotes.length} structural notes.`);
    return `Hierarchy Map updated with ${structuralNotes.length} notes!`;
  }
  // No changes to the overall structure of createNotePlan
  async createNotePlan(targetFilePath, progressCallback) {
    if (!targetFilePath) {
      return "Error: Could not determine the target file when the command was run.";
    }
    const file = this.app.vault.getAbstractFileByPath(targetFilePath);
    if (!(file instanceof import_obsidian.TFile)) {
      return `Error: Target file not found at path "${targetFilePath}".`;
    }
    const targetFile = file;
    progressCallback("Reading your note...");
    const fullContent = await this.fileService.readFile(targetFile);
    const regex = /```gemini-note\n([\s\S]*?)\n```/;
    const match = fullContent.match(regex);
    let rawContent = "";
    if (match && match[1]) {
      rawContent = match[1];
    } else {
      rawContent = fullContent;
      new import_obsidian.Notice("No 'gemini-note' block found. Processing the entire note as a fallback.");
    }
    if (!rawContent.trim()) {
      return "Error: The note or 'gemini-note' block is empty.";
    }
    const sourceRegex = /^source\s*-\s*(.*)/im;
    const sourceMatch = rawContent.match(sourceRegex);
    let extractedSource = sourceMatch ? sourceMatch[1].trim() : "";
    if (extractedSource.startsWith("- ")) {
      extractedSource = extractedSource.substring(2);
    }
    let vaultContext = "";
    const mapFilePath = `${this.settings.draftsFolderPath}/${HIERARCHY_MAP_FILE_NAME}`;
    const mapFile = this.fileService.getAbstractFileByPath(mapFilePath);
    if (mapFile && mapFile instanceof import_obsidian.TFile) {
      vaultContext = await this.fileService.readFile(mapFile);
    }
    const model = this.genAI.getGenerativeModel({
      model: this.settings.model,
      generationConfig: {
        temperature: 0
      }
    });
    const prompt = createNotePlanPrompt(rawContent, vaultContext);
    let templateDraftNotification = "";
    try {
      progressCallback("Sending content to Gemini for analysis...");
      const result = await this.makeApiCallWithRetry(() => model.generateContent(prompt));
      const rawResponse = result.response.text();
      progressCallback("Received plan from Gemini. Parsing response...");
      let jsonText = rawResponse;
      const jsonMatch = rawResponse.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch && jsonMatch[1]) {
        jsonText = jsonMatch[1];
      } else {
        jsonText = rawResponse.replace(/```/g, "").trim();
      }
      let planData;
      try {
        planData = JSON.parse(jsonText);
      } catch (parseError) {
        console.error("Failed to parse JSON from Gemini response.", parseError);
        console.error("--- Raw Response from Gemini ---");
        console.error(rawResponse);
        return `Sorry, the AI returned an invalid response that I couldn't understand. Please check the developer console (Ctrl+Shift+I) for the full error, or try again. 

**Raw AI Response:**
\`\`\`
${rawResponse}
\`\`\``;
      }
      const suggestedType = planData.note_identity?.suggested_type || "Unknown";
      const justification = planData.note_identity?.justification || "No justification provided.";
      console.log(`AI Suggested Note Type: ${suggestedType}`);
      console.log(`Justification: ${justification}`);
      let matchedTemplatePath = null;
      const templatesFolder = this.app.vault.getAbstractFileByPath(this.settings.templatesFolderPath);
      let templateFileNames = [];
      if (templatesFolder instanceof import_obsidian.TFolder) {
        templateFileNames = templatesFolder.children.filter((file2) => file2 instanceof import_obsidian.TFile && file2.extension === "md").map((file2) => file2.name);
      }
      if (templateFileNames.length > 0) {
        const matchingPrompt = createTemplateMatchingPrompt(suggestedType, templateFileNames);
        const matchingModel = this.genAI.getGenerativeModel({ model: this.settings.model });
        const matchingResult = await this.makeApiCallWithRetry(() => matchingModel.generateContent(matchingPrompt));
        const bestMatch = matchingResult.response.text().trim();
        if (bestMatch && bestMatch !== "null" && templateFileNames.includes(bestMatch)) {
          matchedTemplatePath = `${this.settings.templatesFolderPath}/${bestMatch}`;
          console.log(`AI matched to template: ${matchedTemplatePath}`);
        } else {
          console.log("AI reported no suitable template found. Initiating Phase 3.");
          const exampleFileNames = ["03 Core Concept Template.md", "Project Note Template.md"];
          const fewShotExamples = [];
          for (const fileName of exampleFileNames) {
            try {
              const examplePath = `${this.settings.templatesFolderPath}/${fileName}`;
              const exampleContent = await this.app.vault.adapter.read(examplePath);
              fewShotExamples.push({ fileName, content: exampleContent });
            } catch (e) {
              console.warn(`Could not load example template: ${fileName}`);
            }
          }
          if (fewShotExamples.length > 0) {
            const draftPrompt = createTemplateDraftPrompt(suggestedType, rawContent, fewShotExamples);
            const draftModel = this.genAI.getGenerativeModel({ model: this.settings.model });
            const draftResult = await this.makeApiCallWithRetry(() => draftModel.generateContent(draftPrompt));
            const newTemplateContent = draftResult.response.text();
            const draftsSubfolderPath = `${this.settings.templatesFolderPath}/Drafts`;
            await this.fileService.createFolder(draftsSubfolderPath);
            const newTemplateFileName = `${suggestedType} Template.md`;
            const newTemplateFilePath = `${draftsSubfolderPath}/${newTemplateFileName}`;
            await this.fileService.createFile(newTemplateFilePath, newTemplateContent);
            templateDraftNotification = `
---
### \u{1F4DD} New Template Drafted
    
I've identified a new note type: **"${suggestedType}"** and drafted a new template for it.
    
Please review the draft at [[${newTemplateFilePath}]]. Once you approve it, move it to your main templates folder before running the note generation command.
---
`;
          } else {
            return "Sorry, I couldn't find any example templates to learn from. Please add some templates to your templates folder.";
          }
        }
      }
      let feedbackSection = `## Feedback & Synthesis
---

${planData.overall_feedback}

`;
      planData.review_points.forEach((point) => {
        feedbackSection += `- **${point.concept}:** ${point.suggestion}
`;
      });
      let missingConnectionsSection = "";
      if (planData.missing_connections && planData.missing_connections.length > 0) {
        missingConnectionsSection = `

---
### Missing Connections

_To build a deeper understanding, consider exploring these related topics:_

`;
        planData.missing_connections.forEach((conn) => {
          missingConnectionsSection += `- ${conn}
`;
        });
      }
      let proposalSection = `

---
### Proposed Atomic Notes

`;
      planData.note_categories.forEach((cat) => {
        proposalSection += `**${cat.category_title}**
${cat.category_description}
`;
        cat.notes.forEach((note) => {
          proposalSection += `	- [[${note.title}]]
`;
        });
        proposalSection += `
`;
      });
      let notesPlanSection = `
---
### Notes Plan

`;
      planData.checklist_notes.forEach((note) => {
        notesPlanSection += `- **${note.title}** \`(${note.type})\`
`;
        notesPlanSection += `	- *${note.description}*
`;
      });
      let questionsSection = "";
      if (planData.provocative_questions && planData.provocative_questions.length > 0) {
        questionsSection = `

---
### Provocative Questions

_Ponder these questions to challenge your assumptions and synthesize the material:_

`;
        planData.provocative_questions.forEach((q) => {
          questionsSection += `- ? ${q}
`;
        });
      }
      const synthesisSection = `

---

## My Synthesis & Answers

1. `;
      const mainTopic = planData.plan_details.main_topic.replace(/[\\/:?*\"<>|]/g, "");
      const planFrontmatter = `---
main_topic: ${mainTopic}
source: "${extractedSource}"
---

`;
      const finalPlanContent = planFrontmatter + feedbackSection + missingConnectionsSection + templateDraftNotification + proposalSection + notesPlanSection + questionsSection + synthesisSection;
      const uniquePhrase = planData.plan_details.unique_phrase;
      const planFileName = `${mainTopic} - ${uniquePhrase}.md`;
      const planFilePath = `${this.settings.plansFolderPath}/${planFileName}`;
      progressCallback("Creating the plan file in your vault...");
      await this.fileService.createFolder(this.settings.plansFolderPath);
      await this.fileService.createFile(planFilePath, finalPlanContent);
      const logMessage = `Created note plan for "[[${targetFile.path}|${targetFile.basename}]]". AI suggested type: ${planData.note_identity?.suggested_type}. New plan is at "[[${planFilePath}|${planFileName}]]".`;
      await this.logActivity(logMessage);
      let successMessage = `Plan created successfully! I've created a plan for you at: [[${planFilePath}|${planFileName}]]`;
      if (templateDraftNotification) {
        successMessage += `

I also drafted a new template. You can review it in the plan note.`;
      }
      return successMessage;
    } catch (e) {
      console.error("Error creating note plan:", e);
      await this.logActivity(`ERROR: Failed to create note plan for "[[${targetFile.path}|${targetFile.basename}]]".`);
      return "Sorry, I encountered an error while analyzing the note. Please check the console.";
    }
  }
  // =================================================================
  // NEW: DYNAMIC NOTE GENERATION LOGIC
  // =================================================================
  /**
   * Extracts all unique placeholders from a template string.
   * e.g., "Hello {{name}}, welcome to {{location}}!" -> ['name', 'location']
   */
  extractPlaceholders(templateContent) {
    const regex = /\{\{(.*?)\}\}/g;
    const matches = /* @__PURE__ */ new Set();
    let match;
    while ((match = regex.exec(templateContent)) !== null) {
      matches.add(match[1].trim());
    }
    return Array.from(matches);
  }
  /**
   * Builds a prompt on-the-fly to ask the AI for the specific fields
   * needed by a template.
   */
  createDynamicNotePrompt(noteType, context, placeholders, parent, children) {
    const fieldsList = placeholders.map((p) => `- "${p}"`).join("\n");
    let hierarchicalContext = "";
    if (parent) {
      hierarchicalContext += `
The direct parent note for this concept is "[[${parent}]]".`;
    }
    if (children.length > 0) {
      const childrenList = children.map((c) => `"[[${c}]]"`).join(", ");
      hierarchicalContext += `
The direct children notes for this concept are: ${childrenList}.`;
    }
    const keywordInstruction = `
- For the "tags_keywords" key, you MUST generate an array of 3-5 relevant lowercase, snake_case technical keywords for this specific concept. This is a mandatory field. Do not include the main topic or the note type.`;
    const relatedFieldInstruction = placeholders.includes("related_links_for_yaml") ? `- For the "related_links_for_yaml" key, you MUST generate a comprehensive list of 10-15 wikilinks to closely related concepts. Think broadly: include parent concepts, child concepts, contrasting ideas, practical applications, and foundational prerequisites.` : "";
    const namingConventionInstruction = `
- **Naming Convention**: All wikilinks you generate MUST strictly follow the user's established naming convention. For most topics, this is "Subject - Concept" (e.g., "ML - Logistic Regression"). For fundamental topics, it is "Fundamental - Concept" (e.g., "Fundamental - Machine Learning"). Do NOT invent new formats.`;
    const newFieldInstructions = `
- For the "concept_name" key, provide the clean concept name without the "Subject - " prefix. (e.g., if the note title is "ML - Logistic Regression", this should be "Logistic Regression").
- For the "summary_analogy" key, you MUST provide two things in a single string:
    1. A concise, powerful, real-world analogy to make the concept easier to understand.
    2. Immediately after, include a bullet point labeled "**Where it breaks down:**" that briefly explains the key limitations of the analogy. This is vital for preventing misconceptions.
- For the "details_paragraph" key, provide a brief, one-or-two-sentence introductory paragraph for the 'Details' section, before the bullet points.`;
    const detailedContentInstructions = `
- **Detailed Breakdown Logic**: You MUST structure the detailed explanation of the concept using the following five JSON keys. Each key must be populated with clear, concise information.
- For the "details_core_idea" key, provide a single, powerful sentence defining the concept's fundamental mechanism.
- For the "details_primary_goal" key, explain the specific problem the concept is designed to solve (e.g., its impact on generalization error vs. training error).
- For the "details_mechanism_bullets" key, provide a bulleted list explaining *how* the concept works. Include core formulas and explain *why* the mechanism is effective.
- For the "details_parameters_bullets" key, identify the most important hyperparameters that control the concept. For each one, explain its purpose and the effect of setting it to high vs. low values.
- For the "details_tradeoffs_bullets" key, explain the direct consequences of using this concept, especially its impact on fundamental tradeoffs like the Bias-Variance Tradeoff.
`;
    const mathFormattingInstruction = `
        - **LaTeX Formatting for Formulas**: You MUST adhere to the following strict rules for all mathematical notation:
            1.  **Mandatory LaTeX**: You MUST format ANY and ALL mathematical variables (e.g., J, \u03B8, \u03BB), symbols, and equations using LaTeX. There are no exceptions.
            2.  **Proper Commands**: You MUST use proper LaTeX commands (e.g., \`\\theta\`, \`\\lambda\`, \`\\cdot\`). Do NOT use raw unicode characters (like \u03B8, \u03BB, \xB7).
            3.  **CRITICAL - NO PLAIN TEXT SYMBOLS**: You MUST NEVER write the names of Greek letters or other symbols as plain text inside a math block. For example, ALWAYS write \`$lambda$\`. This is the most common mistake and you must avoid it.
            4.  **Correct Delimiters**: ALWAYS use dollar signs for math. NEVER use backticks (\`...\`) for mathematical content.
                - For **inline math** within a sentence (e.g., mentioning a variable like $J_{reg}$), you MUST wrap it in single dollar signs (\`$...\`).
                - For **defining equations** that are central to a concept's mechanism, you MUST display them as a block on their own line using double dollar signs (\`$$...$$\`).
            5.  **No Spaces Around Delimiters**: There MUST NOT be any space between the dollar sign delimiters and the start or end of the LaTeX content. For example, write \`$E=mc^2$\` instead of \`$ E=mc^2 $\`.
            6.  **Separate Text**: Keep explanatory text (e.g., "New Loss =", "Where:") **outside** of the dollar sign delimiters.
        `;
    const markdownFormattingInstruction = `
- **Markdown Formatting**: Within the content for keys like "details_bullets", you MUST use Markdown to improve readability and structure. Use **bolding** to emphasize key terms that introduce a concept. When a bullet point has sub-points or examples, you MUST indent them to create a clear visual hierarchy.`;
    const bulletPointInstruction = `
        - **Bulleted List Logic**: For any JSON key that ends in '_bullets', you MUST return an array of objects. Each object must have a "content" key. For nested items, the parent object should also have a "children" key, which contains another array of these objects.
        - Example Structure:
        \`\`\`json
        [
            {
                "content": "The new regularized cost function, $J_{reg}(\\theta)$, is defined as:",
                "children": [
                {
                    "content": "$$J_{reg}(\\theta) = J(\\theta) + \\lambda \\sum_{j=1}^{n} |\\theta_j|$$"
                },
                {
                    "content": "Where:",
                    "children": [
                    {
                        "content": "$J(\\theta)$ is the original cost function (e.g., Mean Squared Error)."
                    },
                    {
                        "content": "$\\lambda$ is the regularization parameter that controls the strength of the penalty."
                    },
                    {
                        "content": "$\\sum_{j=1}^{n} |\\theta_j|$ is the L1 penalty, which is the sum of the absolute values of the coefficients (the L1 norm of the coefficient vector)."
                    }
                    ]
                }
                ]
            }
        ]
        \`\`\`
        `;
    const connectionInstructions = `
- **Connection Logic**: Your most important task is to create a rich, interconnected knowledge graph. For any "connection" field, do not just list the links. Instead, you MUST write a descriptive sentence that explains the relationship between the concepts, embedding the wikilink within that sentence.
    - Use bolded labels to categorize the relationship where appropriate (e.g., "**Part Of:**", "**Prerequisite For:**", "**Solves Problem:**" , "**Impacts:**", "**Example Of:**", "**Contrasts With:**", "**Built Upon:**", "**Alternative To:**").  This is the most important part of your task.
    - After the label, you MUST write a concise explanation of the relationship and embed the relevant [[wikilink]] within that explanation.
- **Use Aliased Wikilinks**: To ensure the sentences read naturally, you MUST use aliased wikilinks with the format \`[[Full Note Name|Display Text]]\`. The display text should be the simple concept name in lowercase.
    - **Example**: Instead of writing "...combats [[ML - Overfitting]]", you MUST write "...combats [[ML - Overfitting|overfitting]]".
- **Hierarchical Context**
    - If filling "connections_parent", use the parent from the Hierarchical Context.
    - If filling "connections_children", use the children from the Hierarchical Context.
    - If filling "connections_related" or "connections_other_fundamentals", you must intelligently identify and link to other relevant concepts, describing the nature of the relationship (e.g., "Contrasts With:", "Built Upon:"). This is the most important part of your task.
- For the "related_links_for_yaml" key, you MUST provide a simple array of 10-15 note titles that strictly follow the user's naming convention ("Subject - Concept" e.g., "ML - Logistic Regression", "Fundamental - Statistics")`;
    return `You are an expert knowledge architect. Your task is to generate the structured content for a note of type, Please return a single, valid JSON object with the following exact keys. 
        CRITICAL INSTRUCTIONS:
            - **All keys listed below are mandatory**. If you do not have relevant information for a key, you MUST return an empty string "" for string values or an empty array [] for array values. DO NOT omit any keys from your response."${noteType}".

Essential Context: This note must be based on the following summary: "${context}".
${hierarchicalContext ? `
Hierarchical Context: You MUST use the following information to form the connections.${hierarchicalContext}` : ""}

Please return a single, valid JSON object with the following exact keys.
CRITICAL INSTRUCTIONS:
- For any key that includes the word 'connection' (e.g., "connections_related"), each item in the array MUST be a string formatted as a [[wikilink]].
- For any key that includes the word 'bullets' (e.g., "details_bullets"), each item in the array should be a string or an object with a single key-value pair (e.g., {"point": "This is a bullet."}).
- **VALID JSON IS REQUIRED**: All backslashes (\\) in your response, especially in LaTeX, MUST be properly escaped. For example, a LaTeX string in JSON should look like this: ("$$\\\\lambda \\\\sum_{i=1}^n x_i$$").
- **All keys listed below are mandatory**...
${relatedFieldInstruction}
${namingConventionInstruction}
${newFieldInstructions}
${keywordInstruction}
${markdownFormattingInstruction}
${connectionInstructions}
${detailedContentInstructions}
${bulletPointInstruction}
${mathFormattingInstruction}

The required JSON keys are:
${fieldsList}
`;
  }
  /**
   * A universal template populator. It takes a template string and a data object,
   * and replaces any {{key}} with the corresponding data[key] value.
   */
  formatNestedList(items, level = 0) {
    let result = [];
    const indent = "  ".repeat(level);
    for (const item of items) {
      if (typeof item === "object" && item !== null && item.content) {
        result.push(`${indent}- ${item.content}`);
        if (Array.isArray(item.children) && item.children.length > 0) {
          result.push(this.formatNestedList(item.children, level + 1));
        }
      } else {
        result.push(`${indent}- ${String(item)}`);
      }
    }
    return result.join("\n");
  }
  populateTemplate(templateContent, data) {
    let populatedContent = templateContent;
    for (const key in data) {
      const placeholder = `{{${key}}}`;
      let replacement = data[key];
      if (replacement === null || replacement === void 0) {
        replacement = "";
      }
      if (Array.isArray(replacement)) {
        if (key.toLowerCase() === "tags_yaml") {
          replacement = "\n" + replacement.map((item) => `  - ${String(item)}`).join("\n");
        } else if (key.toLowerCase() === "related") {
          replacement = "\n" + replacement.map((item) => `  - "[[${String(item).replace(/\[|\]/g, "")}]]"`).join("\n");
        } else if (key.toLowerCase().includes("_bullets")) {
          replacement = this.formatNestedList(replacement);
        } else {
          replacement = replacement.map((item) => `- ${String(item)}`).join("\n");
        }
      }
      populatedContent = populatedContent.replace(new RegExp(placeholder, "gi"), String(replacement));
    }
    return populatedContent.replace(/\{\{.*?\}\}/g, "");
  }
  async generateNotesFromPlan(plan_file_path, progressCallback) {
    const startTime = Date.now();
    let planFile = null;
    if (plan_file_path) {
      const file = this.fileService.getAbstractFileByPath(plan_file_path);
      if (file instanceof import_obsidian.TFile) {
        planFile = file;
      } else {
        return `Error: Plan file not found at path "${plan_file_path}".`;
      }
    } else {
      return "Error: No plan file was specified or active when the command was run.";
    }
    const planContent = await this.fileService.readFile(planFile);
    const fileCache = this.app.metadataCache.getFileCache(planFile);
    const mainTopic = fileCache?.frontmatter?.main_topic?.toLowerCase().replace(/\s+/g, "-") || "general";
    let sourceFromPlan = [];
    const sourceFromFile = fileCache?.frontmatter?.source;
    if (Array.isArray(sourceFromFile)) {
      sourceFromPlan = sourceFromFile;
    } else if (sourceFromFile) {
      sourceFromPlan = [String(sourceFromFile)];
    }
    const taskRegex = /^- \*\*(.*?)\*\* \`\((.*?)\)\`\n\s+-\s*\*(.*?)\*/gm;
    const proposals = [...planContent.matchAll(taskRegex)];
    if (proposals.length === 0) return "No pending notes with descriptions found in the plan file.";
    progressCallback(`Found ${proposals.length} notes to generate...`);
    let generatedCount = 0;
    let generatedNoteLinks = [];
    let noteIndex = 0;
    const newStructuralNotes = [];
    const formatYamlList = (items) => {
      if (!items || items.length === 0) return "";
      return "\n" + items.map((item) => `  - "[[${String(item).replace(/\[|\]/g, "")}]]"`).join("\n");
    };
    for (const proposal of proposals) {
      noteIndex++;
      const title = proposal[1];
      const type = proposal[2].trim();
      const context = proposal[3];
      const parentMatch = planContent.match(new RegExp(`- \\*\\*${title}\\*\\*.*\\n\\s+- \\*Parent:\\*\\s+\\[\\[(.*?)\\]\\]`));
      const parent = parentMatch ? parentMatch[1] : null;
      const childrenRegex = new RegExp(`- \\*\\*${title}\\*\\*.*\\n(?:\\s+- \\*.*?\\*.*\\n)*?\\s+- \\*Children:\\*\\s+((?:\\n\\s+-\\s+\\[\\[.*?\\]\\])+)`);
      const childrenMatch = planContent.match(childrenRegex);
      const children = childrenMatch ? childrenMatch[1].match(/\[\[(.*?)\]\]/g).map((m) => m.slice(2, -2)) : [];
      progressCallback(`[${noteIndex}/${proposals.length}] Generating: ${title}...`);
      const expectedTemplateName = `${type} Template.md`;
      const templatePath = `${this.settings.templatesFolderPath}/${expectedTemplateName}`;
      const templateFile = this.fileService.getAbstractFileByPath(templatePath);
      if (!(templateFile instanceof import_obsidian.TFile)) {
        console.warn(`No template found for type: ${type} at path ${templatePath}. Skipping note: ${title}`);
        new import_obsidian.Notice(`Skipping "${title}": Template not found for type "${type}".`);
        continue;
      }
      try {
        const templateContent = await this.fileService.readFile(templateFile);
        const placeholders = this.extractPlaceholders(templateContent);
        const aiPlaceholders = placeholders.filter((p) => !["title", "source"].includes(p.toLowerCase()));
        const dynamicPrompt = this.createDynamicNotePrompt(type, context, aiPlaceholders, parent, children);
        const model = this.genAI.getGenerativeModel({ model: this.settings.model, generationConfig: { temperature: 0.1 } });
        const result = await this.makeApiCallWithRetry(() => model.generateContent(dynamicPrompt));
        const rawResponse = result.response.text();
        let jsonText = rawResponse;
        const jsonMatch = rawResponse.match(/```json\n([\s\S]*?)\n```/);
        if (jsonMatch && jsonMatch[1]) {
          jsonText = jsonMatch[1];
        } else {
          jsonText = rawResponse.replace(/```/g, "").trim();
        }
        jsonText = jsonText.replace(/(?<!\\)\\(?!["\\/bfnrt])/g, "\\\\");
        const aiJson = JSON.parse(jsonText);
        aiJson.title = title;
        const structuralTag = type.toLowerCase().replace(/\s+/g, "-");
        const keywordTags = aiJson.tags_yaml || [];
        const allTags = [
          structuralTag,
          mainTopic,
          ...keywordTags,
          "concept"
        ];
        const uniqueTags = [...new Set(allTags)];
        aiJson.tags_yaml = "\n" + uniqueTags.map((tag) => `  - ${tag}`).join("\n");
        let finalContent = this.populateTemplate(templateContent, aiJson);
        finalContent = finalContent.replace(/related:/i, `related:${formatYamlList(aiJson.related_links_for_yaml)}`);
        finalContent = finalContent.replace(/source:/i, `source:${formatYamlList(sourceFromPlan)}`);
        const sanitizedTitle = title.replace(/[\\/:?*\"<>|]/g, "");
        const noteFileName = `${sanitizedTitle}.md`;
        const noteFilePath = `${this.settings.draftsFolderPath}/${noteFileName}`;
        await this.fileService.createFile(noteFilePath, finalContent);
        generatedCount++;
        const newNoteLink = `[[${noteFilePath}|${noteFileName}]]`;
        generatedNoteLinks.push(newNoteLink);
        const lowerCaseType = type.toLowerCase();
        if (lowerCaseType === "fundamental" || lowerCaseType === "major-core") {
          newStructuralNotes.push(newNoteLink);
        }
      } catch (e) {
        console.error(`Failed to generate note for "${title}":`, e);
        new import_obsidian.Notice(`Error generating note: ${title}. Check console.`);
      }
    }
    if (newStructuralNotes.length > 0) {
      const mapFilePath = `${this.settings.draftsFolderPath}/${HIERARCHY_MAP_FILE_NAME}`;
      const mapFile = this.fileService.getAbstractFileByPath(mapFilePath);
      if (mapFile && mapFile instanceof import_obsidian.TFile) {
        const contentToAppend = "\n" + newStructuralNotes.join("\n");
        await this.app.vault.append(mapFile, contentToAppend);
        await this.logActivity(`Auto-updated Hierarchy Map with ${newStructuralNotes.length} new notes.`);
        new import_obsidian.Notice("Hierarchy Map auto-updated!");
      }
    }
    progressCallback("Finalizing generation...");
    const endTime = Date.now();
    const durationInSeconds = ((endTime - startTime) / 1e3).toFixed(1);
    const indentedList = generatedNoteLinks.map((link) => `
	- ${link}`).join("");
    const logMessage = `Generated ${generatedCount} notes in ${durationInSeconds} seconds from plan "[[${planFile.path}|${planFile.basename}]]":${indentedList}`;
    await this.logActivity(logMessage);
    return `Successfully generated ${generatedCount} new notes in ${durationInSeconds} seconds in the drafts folder.`;
  }
  // No changes to reviewAnswersInPlan
  async reviewAnswersInPlan(fileToUpdate) {
    const fullContent = await this.fileService.readFile(fileToUpdate);
    const breadcrumbRegex = /<!-- gemini-context: (.*?) -->/g;
    const matches = [...fullContent.matchAll(breadcrumbRegex)];
    let contentForReview;
    if (matches.length === 0) {
      contentForReview = fullContent;
    } else {
      const lastMatch = matches[matches.length - 1];
      const lastKeywords = lastMatch[1].trim();
      const lastMatchEndIndex = lastMatch.index + lastMatch[0].length;
      const questionsRegex = /### Provocative Questions([\s\S]*?)---/m;
      const questionsMatch = fullContent.match(questionsRegex);
      const questionsText = questionsMatch ? questionsMatch[0] : "";
      const newAnswerText = fullContent.substring(lastMatchEndIndex).trim();
      contentForReview = `This is a follow-up review. Here is a summary of your last feedback, the original questions, and the user's new answer. Focus your new feedback only on the user's new answer in light of the previous context.

    ### Summary of Your Last Feedback:
    ${lastKeywords}

    ---
    ${questionsText}

    ---
    ### User's New Answer:
    ${newAnswerText}`;
    }
    const reviewPrompt = createAnswerReviewPrompt(contentForReview);
    const reviewModel = this.genAI.getGenerativeModel({
      model: this.settings.model,
      generationConfig: { temperature: 0.4 }
    });
    const reviewResult = await this.makeApiCallWithRetry(() => reviewModel.generateContent(reviewPrompt));
    const feedbackText = reviewResult.response.text();
    const keywordPrompt = createKeywordExtractionPrompt(feedbackText);
    const keywordModel = this.genAI.getGenerativeModel({
      model: this.settings.model,
      generationConfig: { temperature: 0 }
    });
    const keywordResult = await this.makeApiCallWithRetry(() => keywordModel.generateContent(keywordPrompt));
    const keywordText = keywordResult.response.text().trim();
    const timestamp = (/* @__PURE__ */ new Date()).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const contentToAppend = `

---
### Feedback on Your Synthesis (${timestamp})

${feedbackText}
<!-- gemini-context: ${keywordText} -->`;
    await this.fileService.modifyFile(fileToUpdate, fullContent + contentToAppend);
    const logMessage = `Appended synthesis feedback to "[[${fileToUpdate.path}|${fileToUpdate.basename}]]".`;
    await this.logActivity(logMessage);
    return `Feedback has been successfully added to your note!`;
  }
  async makeApiCallWithRetry(apiCall, maxRetries = 3, initialDelay = 2e3) {
    let retries = 0;
    let delay = initialDelay;
    while (retries < maxRetries) {
      try {
        return await apiCall();
      } catch (error) {
        if (error.message && error.message.includes("[503")) {
          retries++;
          if (retries >= maxRetries) {
            throw error;
          }
          console.warn(`Gemini API overloaded. Retrying in ${delay / 1e3}s... (Attempt ${retries}/${maxRetries})`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          delay *= 2;
        } else {
          throw error;
        }
      }
    }
  }
};

// src/Agent.ts
var Agent = class {
  constructor(app, settings, genAI, fileService) {
    this.chat = null;
    this.app = app;
    this.settings = settings;
    this.genAI = genAI;
    this.toolManager = new ToolManager(app, genAI, settings, fileService);
  }
  async initialize() {
    if (this.genAI && !this.chat) {
      try {
        const genAIModule = await import("https://esm.sh/@google/generative-ai@0.14.1");
        this.HarmCategory = genAIModule.HarmCategory;
        this.HarmBlockThreshold = genAIModule.HarmBlockThreshold;
        this.startChatSession();
      } catch (e) {
        console.error("Failed to initialize Google Generative AI:", e);
      }
    }
  }
  startChatSession() {
    const model = this.genAI.getGenerativeModel({
      model: this.settings.model,
      systemInstruction: `You are an expert AI assistant for Obsidian. Your primary purpose is to help users process their raw notes into structured, atomic notes. You operate in a two-phase workflow: Plan, then Generate.
            1. **Plan Phase**: When the user asks you to 'review' or 'plan' a note, you MUST use the \`Notes_plan\` tool.
            2. **Generate Phase**: When the user asks you to 'generate' notes from a plan, you MUST use the \`generate_notes_from_plan\` tool.
            Use the \`log_activity\` tool for any other significant actions or errors.`
    });
    this.chat = model.startChat({
      tools: this.getToolDeclarations(),
      safetySettings: [
        { category: this.HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: this.HarmBlockThreshold.BLOCK_NONE }
      ]
    });
  }
  // This function returns an object of executable functions
  getTools(activeFilePath, progressCallback) {
    return {
      log_activity: (args) => this.toolManager.logActivity(args.message),
      create_note_plan: () => this.toolManager.createNotePlan(activeFilePath, progressCallback),
      // This now also passes the progress callback to the generation function
      generate_notes_from_plan: (args) => {
        const targetPlanPath = args.plan_file_path || activeFilePath;
        return this.toolManager.generateNotesFromPlan(targetPlanPath, progressCallback);
      }
    };
  }
  // This function returns the schema for the tools
  getToolDeclarations() {
    return {
      functionDeclarations: [
        {
          name: "log_activity",
          description: "Records a message with a timestamp to a central log file. Use this to report successful actions or errors.",
          parameters: { type: "OBJECT", properties: { message: { type: "STRING", description: "The message to log." } }, required: ["message"] }
        },
        {
          name: "create_note_plan",
          description: "Phase 1: Reads the user's currently active raw note, analyzes the content, and creates a new 'Plan' note containing AI feedback and a checklist for generation.",
          parameters: { type: "OBJECT", properties: {} }
        },
        {
          name: "generate_notes_from_plan",
          description: "Phase 2: Generates atomic notes from a plan file. If a file path is provided, it uses that file. If not, it uses the currently active note as the plan.",
          parameters: { type: "OBJECT", properties: { plan_file_path: { type: "STRING", description: "The optional full path to the plan note to be executed." } } }
        }
      ]
    };
  }
  // --- NEW: API Caller with Exponential Backoff ---
  async makeApiCallWithRetry(apiCall, maxRetries = 3, initialDelay = 2e3) {
    let retries = 0;
    let delay = initialDelay;
    while (retries < maxRetries) {
      try {
        return await apiCall();
      } catch (error) {
        if (error.message && error.message.includes("[503")) {
          retries++;
          if (retries >= maxRetries) {
            throw error;
          }
          console.warn(`Gemini API overloaded. Retrying in ${delay / 1e3}s... (Attempt ${retries}/${maxRetries})`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          delay *= 2;
        } else {
          throw error;
        }
      }
    }
  }
  async run(userInput, view, mode, activeFilePath) {
    if (!this.chat) {
      await this.initialize();
      if (!this.chat) {
        view.addMessage("system", "Agent not initialized. Please configure your Gemini API key in settings.");
        return;
      }
    }
    const thinkingMessage = view.addMessage("model", "Thinking...", true);
    const progressCallback = (update) => view.updateThinkingMessage(update);
    try {
      if (mode === "chat") {
        const model = this.genAI.getGenerativeModel({ model: this.settings.model });
        const result = await this.makeApiCallWithRetry(() => model.generateContent(userInput));
        view.removeThinkingMessage();
        view.addMessage("model", result.response.text());
      } else {
        let result = await this.makeApiCallWithRetry(() => this.chat.sendMessage(userInput));
        while (true) {
          const functionCalls = result.response.functionCalls();
          if (!functionCalls || functionCalls.length === 0) break;
          const tools = this.getTools(activeFilePath, progressCallback);
          const toolResults = await Promise.all(functionCalls.map(async (call) => {
            const toolFunction = tools[call.name];
            const toolResult = await toolFunction(call.args);
            return { functionResponse: { name: call.name, response: { content: toolResult } } };
          }));
          result = await this.makeApiCallWithRetry(() => this.chat.sendMessage(JSON.stringify(toolResults)));
        }
        view.removeThinkingMessage();
        view.addMessage("model", result.response.text());
      }
    } catch (error) {
      console.error("Gemini Agent Error:", error);
      view.removeThinkingMessage();
      if (userInput.toLowerCase().includes("generate")) {
        view.addMessage("system", "Success, with a small snag! All notes were created locally in your vault, but the final confirmation from the Gemini server failed. Please check your drafts folder.");
      } else {
        view.addMessage("system", `An error occurred: ${error.message}`);
      }
    }
  }
};

// src/FileService.ts
var FileService = class {
  constructor(app) {
    this.app = app;
  }
  async readFile(file) {
    return this.app.vault.read(file);
  }
  async getActiveFile() {
    return this.app.workspace.getActiveFile();
  }
  async createFile(filePath, content) {
    return this.app.vault.create(filePath, content);
  }
  async modifyFile(file, newContent) {
    await this.app.vault.modify(file, newContent);
  }
  async createFolder(folderPath) {
    if (!await this.app.vault.adapter.exists(folderPath)) {
      await this.app.vault.createFolder(folderPath);
    }
  }
  getAbstractFileByPath(path) {
    return this.app.vault.getAbstractFileByPath(path);
  }
};

// src/main.ts
var DEFAULT_SETTINGS = {
  geminiApiKey: "",
  model: "gemini-2.5-pro",
  draftsFolderPath: "Gemini Drafts",
  plansFolderPath: "Gemini Drafts/Plans",
  templatesFolderPath: "00 Inbox/00 Templates"
};
var AGENT_VIEW_TYPE = "gemini-agent-chat-view";
var AgentChatView = class extends import_obsidian2.ItemView {
  // Default to command mode
  constructor(leaf, plugin) {
    super(leaf);
    this.chatMode = "command";
    this.plugin = plugin;
  }
  getViewType() {
    return AGENT_VIEW_TYPE;
  }
  getDisplayText() {
    return "Second Brain";
  }
  // Changed the display name
  setButtonIcon() {
    if (this.chatMode === "command") {
      this.modeToggleButton.setText("\u{1F9E0}");
      this.modeToggleButton.setAttribute("aria-label", "Switch to Chat Mode");
    } else {
      this.modeToggleButton.setText("\u{1F4AC}");
      this.modeToggleButton.setAttribute("aria-label", "Switch to Command Mode");
    }
  }
  async onOpen() {
    const container = this.containerEl.children[1];
    container.empty();
    container.addClass("gemini-agent-container");
    const viewHeader = container.createEl("div", { cls: "gemini-agent-header" });
    viewHeader.createEl("h4", { text: "Second Brain" });
    this.chatContainer = container.createEl("div", { cls: "gemini-agent-messages" });
    const inputContainer = container.createEl("div", { cls: "gemini-agent-input-container" });
    this.modeToggleButton = inputContainer.createEl("button", { cls: "gemini-agent-mode-toggle" });
    this.setButtonIcon();
    this.modeToggleButton.addEventListener("click", () => {
      this.chatMode = this.chatMode === "command" ? "chat" : "command";
      this.setButtonIcon();
      this.inputEl.focus();
    });
    this.inputEl = inputContainer.createEl("input", {
      type: "text",
      placeholder: "Chat with your vault...",
      cls: "gemini-agent-input"
    });
    this.inputEl.addEventListener("keydown", async (event) => {
      if (event.key === "Enter" && this.inputEl.value.trim() !== "") {
        const userMessage = this.inputEl.value.trim();
        this.inputEl.value = "";
        this.addMessage("user", userMessage);
        if (this.plugin.agent) {
          const activeFile = this.plugin.app.workspace.getActiveFile();
          const activeFilePath = activeFile ? activeFile.path : null;
          await this.plugin.agent.run(userMessage, this, this.chatMode, activeFilePath);
        }
      }
    });
    this.addMessage("model", "Hello! I'm your Obsidian Agent. How can I help you manage your knowledge base today?");
  }
  // No changes needed for addMessage or removeThinkingMessage
  async addMessage(role, text, isThinking = false) {
    const messageEl = this.chatContainer.createEl("div", { cls: `gemini-agent-message ${role}` });
    if (role !== "model" || isThinking) {
      messageEl.setText(text);
    } else {
      await import_obsidian2.MarkdownRenderer.renderMarkdown(text, messageEl, "", this.plugin);
    }
    if (isThinking) {
      messageEl.addClass("thinking");
    }
    this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    return messageEl;
  }
  removeThinkingMessage() {
    this.chatContainer.querySelector(".thinking")?.remove();
  }
  // Add this new function below removeThinkingMessage()
  updateThinkingMessage(text) {
    const thinkingEl = this.chatContainer.querySelector(".thinking");
    if (thinkingEl) {
      thinkingEl.setText(text);
    }
  }
};
var MyPlugin = class extends import_obsidian2.Plugin {
  async onload() {
    await this.loadSettings();
    if (this.settings.geminiApiKey) {
      try {
        const genAIModule = await import("https://esm.sh/@google/generative-ai@0.14.1");
        this.genAI = new genAIModule.GoogleGenerativeAI(this.settings.geminiApiKey);
      } catch (e) {
        console.error("Failed to load Google Generative AI module", e);
      }
    }
    const fileService = new FileService(this.app);
    this.agent = new Agent(this.app, this.settings, this.genAI, fileService);
    await this.agent.initialize();
    this.registerView(
      AGENT_VIEW_TYPE,
      (leaf) => new AgentChatView(leaf, this)
    );
    this.addRibbonIcon("brain-circuit", "Open Gemini Agent", () => {
      this.activateView();
    });
    this.addCommand({
      id: "gemini-agent-review-synthesis",
      name: "Review synthesis in active note",
      editorCallback: async (editor, view) => {
        const file = view.file;
        if (this.agent && file) {
          new Notice("\u{1F916} Gemini is reviewing your synthesis...");
          const result = await this.agent.toolManager.reviewAnswersInPlan(file);
          new Notice(result);
        }
      }
    });
    this.addSettingTab(new GeminiSettingTab(this.app, this));
    this.addCommand({
      id: "gemini-agent-update-hierarchy-map",
      name: "Update knowledge hierarchy map",
      callback: async () => {
        if (this.agent) {
          const result = await this.agent.toolManager.updateHierarchyMap();
          new Notice(result);
        }
      }
    });
  }
  onunload() {
    this.app.workspace.detachLeavesOfType(AGENT_VIEW_TYPE);
  }
  async activateView() {
    this.app.workspace.detachLeavesOfType(AGENT_VIEW_TYPE);
    await this.app.workspace.getRightLeaf(false).setViewState({
      type: AGENT_VIEW_TYPE,
      active: true
    });
    this.app.workspace.revealLeaf(
      this.app.workspace.getLeavesOfType(AGENT_VIEW_TYPE)[0]
    );
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
var GeminiSettingTab = class extends import_obsidian2.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Gemini Agent Settings" });
    new import_obsidian2.Setting(containerEl).setName("Gemini API Key").setDesc("Your API key for the Google Gemini API.").addText((text) => {
      text.setPlaceholder("Enter API key").setValue(this.plugin.settings.geminiApiKey).onChange(async (value) => {
        this.plugin.settings.geminiApiKey = value;
        await this.plugin.saveSettings();
        this.plugin.onload();
      });
      text.inputEl.type = "password";
    });
    new import_obsidian2.Setting(containerEl).setName("AI Model Name").setDesc("The Gemini model to use for the agent.").addText((text) => text.setPlaceholder("e.g., gemini-1.5-pro-latest").setValue(this.plugin.settings.model).onChange(async (value) => {
      this.plugin.settings.model = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian2.Setting(containerEl).setName("Drafts Folder Path").setDesc("Folder for newly generated atomic notes and the log file.").addText((text) => text.setPlaceholder("Example: Gemini Drafts").setValue(this.plugin.settings.draftsFolderPath).onChange(async (value) => {
      this.plugin.settings.draftsFolderPath = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian2.Setting(containerEl).setName("Plans Folder Path").setDesc("Folder for the generated review and plan notes.").addText((text) => text.setPlaceholder("Example: Gemini Plans").setValue(this.plugin.settings.plansFolderPath).onChange(async (value) => {
      this.plugin.settings.plansFolderPath = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian2.Setting(containerEl).setName("Templates Folder Path").setDesc("Path to the folder containing your note templates.").addText((text) => text.setPlaceholder("Example: 00 Inbox/00 Templates").setValue(this.plugin.settings.templatesFolderPath).onChange(async (value) => {
      this.plugin.settings.templatesFolderPath = value.trim();
      await this.plugin.saveSettings();
    }));
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AgentChatView
});
