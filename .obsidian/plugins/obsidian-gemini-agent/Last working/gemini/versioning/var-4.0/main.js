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
function createNotePlanPrompt(rawContent) {
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
      "category_title": "Category title with emoji (e.g., 'Fundamental Concepts \u{1F9E0}').",
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
function generateNoteContentPrompt(title, type, context) {
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
      const fileTags = fileCache?.tags?.map((t) => {
        let tagName = t.tag;
        if (tagName.startsWith("#")) {
          tagName = tagName.slice(1);
        }
        return tagName.toLowerCase();
      }) || [];
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
    const model = this.genAI.getGenerativeModel({
      model: this.settings.model,
      generationConfig: {
        temperature: 0
      }
    });
    const prompt = createNotePlanPrompt(rawContent);
    let templateDraftNotification = "";
    try {
      progressCallback("Sending content to Gemini for analysis...");
      const result = await model.generateContent(prompt);
      progressCallback("Received plan from Gemini. Parsing response...");
      const jsonText = result.response.text().replace(/```json/g, "").replace(/```/g, "").trim();
      const planData = JSON.parse(jsonText);
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
        const matchingResult = await matchingModel.generateContent(matchingPrompt);
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
            const draftResult = await draftModel.generateContent(draftPrompt);
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
      const finalPlanContent = feedbackSection + missingConnectionsSection + templateDraftNotification + proposalSection + notesPlanSection + questionsSection + synthesisSection;
      const mainTopic = planData.plan_details.main_topic.replace(/[\\/:?*\"<>|]/g, "");
      const uniquePhrase = planData.plan_details.unique_phrase;
      const planFileName = `${mainTopic} - ${uniquePhrase}.md`;
      const planFilePath = `${this.settings.plansFolderPath}/${planFileName}`;
      progressCallback("Creating the plan file in your vault...");
      await this.fileService.createFolder(this.settings.plansFolderPath);
      await this.fileService.createFile(planFilePath, finalPlanContent);
      const logMessage = `Created note plan for "[[${targetFile.path}|${targetFile.basename}]]". AI suggested type: ${suggestedType}. New plan is at "[[${planFilePath}|${planFileName}]]".`;
      await this.logActivity(logMessage);
      let successMessage = `Plan created successfully! I've created a plan for you at: [[${planFilePath}|${planFileName}]]`;
      if (templateDraftNotification) {
        successMessage += `

I also drafted a new template for the '${suggestedType}' note type. You can review it in the plan note.`;
      }
      return successMessage;
    } catch (e) {
      console.error("Error creating note plan:", e);
      await this.logActivity(`ERROR: Failed to create note plan for "[[${targetFile.path}|${targetFile.basename}]]".`);
      return "Sorry, I encountered an error while analyzing the note. Please check the console.";
    }
  }
  async generateNotesFromPlan(plan_file_path, progressCallback) {
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
    const taskRegex = /^- \*\*(.*?)\*\* \`\((.*?)\)\`\n\s+-\s*\*(.*?)\*/gm;
    const proposals = [...planContent.matchAll(taskRegex)];
    if (proposals.length === 0) return "No pending notes with descriptions found in the plan file.";
    progressCallback(`Found ${proposals.length} notes to generate...`);
    let generatedCount = 0;
    let generatedNoteLinks = [];
    let noteIndex = 0;
    for (const proposal of proposals) {
      noteIndex++;
      const title = proposal[1];
      const type = proposal[2].trim();
      const context = proposal[3];
      progressCallback(`[${noteIndex}/${proposals.length}] Generating: ${title}...`);
      let templatePath = "";
      const expectedFileName = `${type} Template.md`;
      const potentialPath = `${this.settings.templatesFolderPath}/${expectedFileName}`;
      if (this.fileService.getAbstractFileByPath(potentialPath)) {
        templatePath = potentialPath;
        console.log(`Found dynamic template for type '${type}': ${templatePath}`);
      } else {
        const lowerCaseType = type.toLowerCase();
        if (lowerCaseType.includes("major core")) templatePath = `${this.settings.templatesFolderPath}/02 Major Core Concept Template.md`;
        else if (lowerCaseType.includes("core")) templatePath = `${this.settings.templatesFolderPath}/03 Core Concept Template.md`;
        else if (lowerCaseType.includes("process")) templatePath = `${this.settings.templatesFolderPath}/03 Core Concept Template.md`;
        else if (lowerCaseType.includes("fundamental")) templatePath = `${this.settings.templatesFolderPath}/01 Fundamental Concept Template.md`;
        else if (lowerCaseType.includes("question")) templatePath = `${this.settings.templatesFolderPath}/04 Question Note Template.md`;
      }
      if (!templatePath) {
        console.warn(`No template found for type: ${type}. Skipping note: ${title}`);
        continue;
      }
      const noteGenPrompt = generateNoteContentPrompt(title, type, context);
      const model = this.genAI.getGenerativeModel({ model: this.settings.model });
      try {
        const result = await model.generateContent(noteGenPrompt);
        const jsonText = result.response.text().replace(/```json/g, "").replace(/```/g, "").trim();
        const aiJson = JSON.parse(jsonText);
        const templateContent = await this.app.vault.adapter.read(templatePath);
        const formatYamlList = (items) => {
          if (!items || items.length === 0) return "";
          return "\n" + items.map((item) => `  - "[[${item}]]"`).join("\n");
        };
        let finalContent = templateContent.replace(/{{\s*title\s*}}/gi, title).replace(/> _A simple, one-sentence summary.*_/i, `> ${aiJson.summary_definition || ""}`).replace(/_Analogy: A helpful, real-world analogy.*_/i, `_${aiJson.summary_analogy || ""}_`).replace(/_The essential facts, characteristics, or steps.*_/i, (aiJson.details_bullets || []).map((item) => `- ${item}`).join("\n")).replace(/This is a major component of.*/i, `This is a major component of ${aiJson.connections_parent || ""}`).replace(/-\s*\[\[Name of a child Core Idea note\]\]\s*-\s*\[\[Another child Core Idea note\]\]/i, (aiJson.connections_children || []).map((item) => `- ${item}`).join("\n")).replace(/-\s*\[\[\s*\]\]/i, (aiJson.connections_related || []).map((item) => `- ${item}`).join("\n")).replace(/-\s*\?\s*-\s*\?/i, (aiJson.questions || []).map((item) => `- ${item}`).join("\n")).replace(/related:/i, `related:${formatYamlList(aiJson.related_links_for_yaml)}`);
        const sanitizedTitle = title.replace(/[\\/:?*\"<>|]/g, "");
        const noteFileName = `${sanitizedTitle}.md`;
        const noteFilePath = `${this.settings.draftsFolderPath}/${noteFileName}`;
        await this.fileService.createFile(noteFilePath, finalContent);
        generatedCount++;
        generatedNoteLinks.push(`[[${noteFilePath}|${noteFileName}]]`);
      } catch (e) {
        console.error(`Failed to generate note for "${title}":`, e);
        new import_obsidian.Notice(`Error generating note: ${title}. Check console.`);
      }
    }
    progressCallback("Finalizing generation...");
    const indentedList = generatedNoteLinks.map((link) => `
	- ${link}`).join("");
    const logMessage = `Generated ${generatedCount} notes from plan "[[${planFile.path}|${planFile.basename}]]":${indentedList}`;
    await this.logActivity(logMessage);
    return `Successfully generated ${generatedCount} new notes in the drafts folder.`;
  }
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
      const questionsRegex = /#### Provocative Questions([\s\S]*?)---/m;
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
    const reviewResult = await reviewModel.generateContent(reviewPrompt);
    const feedbackText = reviewResult.response.text();
    const keywordPrompt = createKeywordExtractionPrompt(feedbackText);
    const keywordModel = this.genAI.getGenerativeModel({
      model: this.settings.model,
      generationConfig: { temperature: 0 }
    });
    const keywordResult = await keywordModel.generateContent(keywordPrompt);
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
  // In Agent.ts
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
        const result = await model.generateContent(userInput);
        view.removeThinkingMessage();
        view.addMessage("model", result.response.text());
      } else {
        let result = await this.chat.sendMessage(userInput);
        while (true) {
          const functionCalls = result.response.functionCalls();
          if (!functionCalls || functionCalls.length === 0) break;
          const tools = this.getTools(activeFilePath, progressCallback);
          const toolResults = await Promise.all(functionCalls.map(async (call) => {
            const toolFunction = tools[call.name];
            const toolResult = await toolFunction(call.args);
            return { functionResponse: { name: call.name, response: { content: toolResult } } };
          }));
          result = await this.chat.sendMessage(JSON.stringify(toolResults));
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
